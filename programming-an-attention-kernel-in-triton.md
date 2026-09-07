# Programming an attention kernel in Triton

Date: 2026-09-08
Description: Building Triton GPU kernels from vector addition up to naive self-attention, finding and fixing one real correctness bug along the way, and naming honestly the wall that separates this from real FlashAttention.
Canonical: https://sslog.dpdns.org/programming-an-attention-kernel-in-triton.html

Every PyTorch operation you've ever called, `softmax`, `relu`, `matmul`, is,
underneath, someone else's compiled GPU kernel. You never see the kernel. You
call the function, the tensor comes back, and the actual work of moving
numbers in and out of GPU memory, scheduling threads, and managing on-chip
caches happens somewhere you're not invited to look.

I wanted to know what was actually happening in there. Not at the level of
"attention is a weighted sum," which I already understood from
[a previous post](grok-grok.html), but at the level of: what does the GPU
actually do, instruction by instruction, when you call `torch.softmax`?

So I wrote the kernels myself, in Triton, starting from the simplest thing
that could possibly be called a kernel and working up. This is what that
ladder looked like, including the one real bug I found and the wall I hit at
the end, named honestly, not smoothed over.

## Why bother: the thing PyTorch hides

Most of what PyTorch calls a single operation is really several.
`torch.softmax(x)` internally finds the row max, subtracts it, exponentiates,
sums, and divides, and on a naive execution model each of those steps can
mean a separate pass over the data: read from GPU memory, compute, write
back to GPU memory, repeat. For an operation that conceptually happens
"once," your data can make several unnecessary round trips between the
GPU's slow global memory and its fast on-chip compute units.

A fused kernel does all of those steps in one pass: load the data into fast
on-chip memory once, do the whole computation, write the result back once.
That's the entire premise behind Triton, and it's the same underlying idea
that motivates FlashAttention, which I'll come back to at the end: fewer
memory round trips, not fewer FLOPs, is often the real lever for speed on a
GPU.

## Kernel 1: vector add, or learning to think like a GPU

The simplest possible Triton kernel doesn't optimize anything, it just adds
two vectors, `out = x + y`. The point of writing this first wasn't the
operation, it was learning Triton's actual execution model before any
algorithm complexity got involved:

- Triton launches a grid of programs, each identified by a `pid` (program
  ID). Think of each program as one worker handling one chunk of the data.
- Each program computes its own offsets into the input arrays,
  `block_start = pid * BLOCK_SIZE`, then `tl.arange(0, BLOCK_SIZE)` for the
  positions within its chunk.
- A mask (`offsets < n_elements`) handles the case where the data size isn't
  a clean multiple of the block size. Without it, the last block would read
  and write past the end of the array.

```python
@triton.jit
def add_kernel(x_ptr, y_ptr, out_ptr, n_elements, BLOCK_SIZE: tl.constexpr):
    pid = tl.program_id(axis=0)
    block_start = pid * BLOCK_SIZE
    offsets = block_start + tl.arange(0, BLOCK_SIZE)
    mask = offsets < n_elements

    x = tl.load(x_ptr + offsets, mask=mask)
    y = tl.load(y_ptr + offsets, mask=mask)
    tl.store(out_ptr + offsets, x + y, mask=mask)
```

Checked against plain `x + y` in PyTorch: matches exactly. Nothing
interesting happens here algorithmically, that's the point. `pid`, offsets,
and masking are the three ideas every later kernel in this post reuses, so
getting them right on the simplest possible operation first meant later bugs
(and there was one, further down) were never about "do I understand
Triton," only ever about the specific algorithm.

## Kernel 2: fused ReLU and dropout, and the problem with testing randomness

The next step up: fuse two operations into one pass instead of one.
<span class="term" tabindex="0">ReLU<span class="term-preview">Zero out every negative value, leave positive values unchanged.</span></span>
and
<span class="term" tabindex="0">dropout<span class="term-preview">Randomly zero a fraction <code>p</code> of values, scaling the survivors by <code>1 / (1 - p)</code> to keep the expected sum unchanged.</span></span>
are two ops that would normally be two separate kernel calls in a naive
implementation. Fusing them means one load, one combined computation, one
store.

```python
@triton.jit
def relu_dropout_kernel(x_ptr, out_ptr, n_elements, p, seed, BLOCK_SIZE: tl.constexpr):
    pid = tl.program_id(axis=0)
    offsets = pid * BLOCK_SIZE + tl.arange(0, BLOCK_SIZE)
    mask = offsets < n_elements

    x = tl.load(x_ptr + offsets, mask=mask)
    x = tl.maximum(x, 0.0)
    randoms = tl.rand(seed, offsets)
    dropout_mask = randoms > p

    out = tl.where(dropout_mask, x / (1 - p), 0.0)
    tl.store(out_ptr + offsets, out, mask=mask)
```

Here's the part worth dwelling on: you can't validate this the way you
validate the vector-add kernel. `allclose` against a reference only works
when the output is deterministic. Dropout is stochastic by design, there is
no single "correct" output to compare against. Eyeballing five printed
values, which is what I did the first time, tells you almost nothing; it's
the same mistake as trusting a single run in the
[birthday-paradox post](birthday-attack.html) instead of the distribution.

The actual test has to be statistical: run it on enough elements that
probability becomes measurable, then check two things, does the empirical
drop rate land near `p`, and are the survivors scaled by exactly
`1 / (1 - p)`?

```
Testing with size=100000, p=0.1  -> empirical rate 0.1007 (expected 0.10 +/- 0.01)  OK
Testing with size=100000, p=0.5  -> empirical rate 0.4993 (expected 0.50 +/- 0.01)  OK
Testing with size=100000, p=0.9  -> empirical rate 0.8999 (expected 0.90 +/- 0.01)  OK
```

All three land within a hundredth of a percent of the target. That's the
right way to trust a kernel whose output is supposed to be random: proving
the distribution is correct, not any single sample.

## Kernel 3: fused softmax, and the bug that mattered

Softmax is the first kernel here with real numerical-stability
considerations: naive `exp(x)` overflows for even moderately large `x`, so
every real softmax implementation subtracts the row max before
exponentiating. The kernel does this per row, in one pass:

```python
@triton.jit
def softmax(output_ptr, input_ptr, input_row_stride, output_row_stride,
            n_cols, BLOCK_SIZE: tl.constexpr):
    row_idx = tl.program_id(0)
    row_start_ptr = input_ptr + row_idx * input_row_stride
    col_offsets = tl.arange(0, BLOCK_SIZE)
    input_ptrs = row_start_ptr + col_offsets

    mask = col_offsets < n_cols
    row = tl.load(input_ptrs, mask=mask, other=float("-inf"))
    row_max = tl.max(row, axis=0)
    numerator = tl.exp(row - row_max)
    denominator = tl.sum(numerator, axis=0)
    softmax_output = numerator / denominator

    output_ptrs = output_ptr + row_idx * output_row_stride + col_offsets
    tl.store(output_ptrs, softmax_output, mask=mask)
```

First version, tested on a small `(4, 5)` input: matched PyTorch exactly. I
moved on, satisfied.

It was wrong. Here's the actual bug, left in on purpose:

```python
def triton_softmax(x: torch.Tensor):
    n_rows, n_cols = x.shape
    BLOCK_SIZE = 1024   # hardcoded
    ...
```

`BLOCK_SIZE` was a fixed number, not tied to `n_cols` at all. For a small
input this is harmless, `col_offsets` spans more than enough room, and the
mask correctly zeroes out the unused tail. But nothing about the mask logic
checks whether `BLOCK_SIZE` is large enough, it only checks whether each
position is within `n_cols`. So the moment a real row is wider than 1024
columns, the kernel simply never loads, computes, or stores anything past
column 1024. It doesn't crash or warn you, it just returns a softmax over
the first 1024 columns and calls it done.

Before, reproduced explicitly at `n_cols=2000`:

```
Buggy Softmax Matches PyTorch (n_cols=2000)?  False
Max abs diff: 0.00978
```

After, the fix is one line: stop guessing a fixed block size and size it to
the actual input.

```python
BLOCK_SIZE = triton.next_power_of_2(n_cols)
```

```
Corrected Softmax Matches PyTorch (n_cols=2000)?  True
```

The lesson isn't "remember to make BLOCK_SIZE dynamic," it's narrower and
more useful than that: a test that only covers the shape you happen to be
thinking about will pass right over a bug that only shows up at a different
shape. The `(4, 5)` test I ran first was real, it wasn't fake, it just
wasn't the test that mattered.

## Kernel 4: bringing it together, a self-attention kernel

Everything up to here, offsets, masks, a fused numerically-stable softmax,
combines into one kernel implementing scaled dot-product attention directly:

```python
@triton.jit
def attention_kernel(
    q_ptr, k_ptr, v_ptr, out_ptr,
    row_stride, col_stride, n_rows, n_cols, scale,
    BLOCK_Q: tl.constexpr, BLOCK_K: tl.constexpr, BLOCK_V: tl.constexpr,
):
    row_pid = tl.program_id(0)
    row_offsets = row_pid * BLOCK_Q + tl.arange(0, BLOCK_Q)
    col_offsets = tl.arange(0, BLOCK_K)
    d_offsets = tl.arange(0, BLOCK_V)

    row_mask = row_offsets < n_rows
    col_mask = col_offsets < n_cols

    q_offsets = tl.expand_dims(row_offsets, 1) * row_stride + tl.expand_dims(d_offsets, 0) * col_stride
    q = tl.load(q_ptr + q_offsets, mask=tl.expand_dims(row_mask, 1), other=0.0)

    k_offsets = tl.expand_dims(d_offsets, 1) * col_stride + tl.expand_dims(col_offsets, 0) * row_stride
    k = tl.load(k_ptr + k_offsets, mask=tl.expand_dims(col_mask, 0), other=0.0)

    qk = tl.dot(q, k) * scale
    qk = tl.where(tl.expand_dims(col_mask, 0), qk, float("-inf"))

    m = tl.max(qk, axis=1)
    p = tl.exp(qk - tl.expand_dims(m, 1))
    l = tl.sum(p, axis=1)
    weights = p / tl.expand_dims(l, 1)

    v_offsets = tl.expand_dims(col_offsets, 1) * row_stride + tl.expand_dims(d_offsets, 0) * col_stride
    v = tl.load(v_ptr + v_offsets, mask=tl.expand_dims(col_mask, 1), other=0.0)

    out = tl.dot(weights.to(v.dtype), v)
    out_offsets = tl.expand_dims(row_offsets, 1) * row_stride + tl.expand_dims(d_offsets, 0) * col_stride
    tl.store(out_ptr + out_offsets, out, mask=tl.expand_dims(row_mask, 1))
```

Validated against `torch.nn.functional.scaled_dot_product_attention` across
several shapes, including deliberately mismatched Q/K sequence lengths and a
single-query edge case:

```
Q: (5, 32), K: (15, 32), V: (15, 32)   ->  matches: True
Q: (1, 64), K: (10, 64), V: (10, 64)   ->  matches: True
```

Given the softmax lesson above, testing more than one shape here wasn't
optional, it's the only reason I can trust this one.

## The wall, named honestly

Here's what this kernel is not: it is not FlashAttention, and it's worth
being precise about why, rather than letting the name imply more than the
code does.

This kernel loads the entire K and V into fast on-chip memory
(<span class="term" tabindex="0">SRAM<span class="term-preview">The GPU's small, extremely fast on-chip memory, as opposed to its much larger but far slower off-chip global memory.</span></span>)
in one shot before doing anything else. That's fine at the sequence lengths
tested here, but SRAM is small (tens of kilobytes per streaming
multiprocessor, not gigabytes), and K/V grow linearly with sequence length.
At some sequence length, "all of K and V" simply stops fitting, and this
kernel breaks, not gracefully, it just runs out of room.

The real FlashAttention trick is to never need all of K/V in SRAM at once:
process it in chunks, and keep a running max and running sum as you go,
correcting the accumulated output every time a new chunk reveals a bigger
max than anything seen so far. That's a genuinely different, harder
algorithm than anything in this post, the online-softmax rescaling has no
analogue in kernels 1 through 4, and it's the specific thing I haven't built
yet.

Naming that clearly here, instead of leaving it unsaid, is the whole point: this post
is "I climbed four rungs of a real ladder, correctly, and found a real bug
along the way," not "I built FlashAttention."

Short and unforced: the useful thing wasn't the final kernel, it was the
softmax bug. It's the one moment on this ladder where "it passed my test"
and "it's actually correct" turned out to be different claims, the same gap
that showed up when I mixed up the median and the mean in the
birthday-paradox post. Different domain, same shape of mistake, same fix:
test the case you didn't think to test.

The tiled, online-softmax version is the next rung. I haven't climbed it
yet.
