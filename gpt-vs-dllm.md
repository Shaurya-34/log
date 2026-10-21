# One transformer, two ways to write

Date: 2026-10-21
Description: I trained the same small transformer as a GPT and as a masked diffusion model on Tiny Shakespeare. The diffusion model's usual sampling trick makes it look fluent by making it repeat itself.
Canonical: https://shauryasharma.tech/gpt-vs-dllm.html

A GPT writes left to right, one character at a time. A masked diffusion language model (a dLLM) starts from a page of blanks and fills them in, in whatever order it likes, several at a time. I trained one of each on Tiny Shakespeare, using the same network for both, and watched them write.

<figure class="dllm-replay" data-src="data/gpt-vs-dllm.json">
  <div class="dllm-head">
    <div class="dllm-switch" role="group" aria-label="dLLM reveal order">
      <button type="button" data-order="confidence" aria-pressed="true">confidence order</button>
      <button type="button" data-order="random" aria-pressed="false">random order</button>
    </div>
    <label class="dllm-select">steps
      <select aria-label="dLLM sampling steps">
        <option>256</option><option>128</option><option>64</option><option>32</option>
        <option>16</option><option>8</option><option>4</option><option>2</option><option>1</option>
      </select>
    </label>
    <div class="dllm-switch" role="group" aria-label="Sample">
      <button type="button" data-sample="0" aria-pressed="true">1</button>
      <button type="button" data-sample="1" aria-pressed="false">2</button>
      <button type="button" data-sample="2" aria-pressed="false">3</button>
    </div>
  </div>
  <div class="dllm-panels">
    <div class="dllm-panel" data-model="gpt">
      <p class="dllm-name">GPT <span>left to right</span></p>
      <div class="dllm-text"><pre class="dllm-ghost" aria-hidden="true"></pre><pre class="dllm-live" aria-label="GPT sample"></pre></div>
      <p class="dllm-count"><b>0</b> forward passes</p>
    </div>
    <div class="dllm-panel" data-model="dllm">
      <p class="dllm-name">dLLM <span>fills in</span></p>
      <div class="dllm-text"><pre class="dllm-ghost" aria-hidden="true"></pre><pre class="dllm-live" aria-label="dLLM sample"></pre></div>
      <p class="dllm-count"><b>0</b> forward passes</p>
    </div>
  </div>
  <div class="dllm-transport">
    <button type="button" class="dllm-btn" data-play>play</button>
    <label class="dllm-scrub"><span class="sr-only">Forward pass</span>
      <input type="range" min="0" max="256" value="0" step="1">
    </label>
  </div>
  <figcaption>Real samples from both models, replayed on one clock counted in forward passes through the network. The GPT needs one pass per character. The dLLM needs one pass per step, however many characters it reveals in that step. Dots are characters the dLLM hasn't revealed yet. Switch the reveal order, cut the steps, or pick another of the three samples saved for each setting.</figcaption>
  <noscript>
    <p>A GPT sample and a dLLM sample (256 steps, confidence order) appear here with JavaScript on.</p>
  </noscript>
</figure>

Both texts look roughly like Shakespeare. Read the confidence-order one closely, though, and it keeps saying the same few things. That repetition is the whole post.

## One transformer, two objectives

The network is a standard character-level transformer in the style of Karpathy's [nanoGPT](https://github.com/karpathy/nanoGPT): 6 layers, 6 heads, 384-dimensional embeddings, a 256-character context and dropout 0.2. With Tiny Shakespeare's 65 characters that comes to 10,788,929 parameters for the GPT, and 384 more for the dLLM, which needs one extra embedding row for its `[MASK]` token.

The GPT is the usual one: causal attention, so each position can only see what came before it, and a next-character loss. The only line that makes it a GPT is the mask:

```python
if self.causal:
    wei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf'))
```

The dLLM is the same network with that mask switched off, so every position sees the whole sequence. Training follows the MDLM and LLaDA recipe ([Sahoo et al. 2024](https://arxiv.org/abs/2406.07524), [Nie et al. 2025](https://arxiv.org/abs/2502.09992)). For each sequence, pick a masking rate t between 0 and 1, hide each character with probability t, and score the model only on the hidden ones, weighted by 1/t:

```python
t = torch.rand(B, 1, device=DEVICE).clamp(min=1e-3)
mask_indices = torch.rand(B, T, device=DEVICE) < t

x_masked = x.clone()
x_masked[mask_indices] = MASK_ID
logits = model(x_masked)

loss_raw = F.cross_entropy(logits.view(B * T, -1), x.view(B * T), reduction='none').view(B, T)
loss = (loss_raw * mask_indices / t).sum() / (B * T)
```

I trained the GPT for 5,000 steps (best validation loss 1.47) and the dLLM for about 50,000 (best 1.67). Those two numbers aren't directly comparable. The dLLM's loss is an upper bound on its true loss, not the loss itself, so 1.67 against 1.47 doesn't tell you how far apart the models are.

<figure class="dllm-curves" data-src="data/gpt-vs-dllm.json">
  <svg class="dllm-plot" viewBox="0 0 660 240" role="img" aria-label="Training and validation loss curves for the GPT over 5,000 steps and the dLLM over about 50,000 steps"></svg>
  <figcaption>Training (dashed) and validation (solid) loss. The dLLM took ten times as many steps to get to 1.67. Footnote: its training was interrupted and resumed from the best checkpoint, so the step labels after the marked point (about 47,000) run roughly 1,000 steps too high.</figcaption>
</figure>

Sampling the dLLM starts with all 256 positions masked. Each step, the model samples a character for every position, and then k of the still-hidden positions get revealed. The other sampled characters are thrown away. Which k positions get revealed is the choice that matters:

```python
if order == 'confidence':
    conf = probs.gather(-1, preds.unsqueeze(-1)).squeeze(-1)
else:
    conf = torch.rand(n, length, device=DEVICE)
conf = conf.masked_fill(~mask, -1.0)

k = math.ceil(remaining / (num_steps - step))
idx = conf.topk(k, dim=-1).indices
```

Confidence order reveals the positions whose sampled character the model was surest about. That's the trick LLaDA uses. Random order reveals random positions, which matches how training hides characters. At one character per step, random order samples exactly from the distribution the model learned.

## The finding: fluent, because it repeats itself

To score samples I used the trained GPT as a judge: the average per-character loss of a sample under the GPT. Lower means more predictable, which isn't the same as better. Text that says "you you you" is very predictable. So I also counted two things about the words: the share of words that are distinct, and the share that repeat the word right before them.

<figure class="dllm-scatter" data-src="data/gpt-vs-dllm.json">
  <p class="dllm-legend"><span class="dllm-key dllm-key-confidence">confidence order</span><span class="dllm-key dllm-key-random">random order</span><span class="dllm-key dllm-key-ref">references</span><span class="dllm-key dllm-key-zone">predictable but repetitive</span></p>
  <svg class="dllm-plot" viewBox="0 0 660 420" role="img" aria-label="GPT loss against the share of distinct words for each reveal order and step count, with real text and GPT samples as references"></svg>
  <p class="dllm-readout" aria-live="polite"></p>
  <figcaption>One point per reveal order and step count, 100 samples each. Up is more predictable to the GPT; right is less repetitive. Real text and the GPT's own samples sit up and to the right. Confidence order reaches the GPT's predictability only by moving left, into repetition. Hover or tab to a point for its numbers.</figcaption>
</figure>

At 256 steps, confidence order scores 1.17, close to the GPT's own samples at 1.09. By that measure it's nearly as good as the GPT. But only half its words are distinct (0.50, against 0.88 in real Shakespeare), and 12.7% of its words repeat the word before them. Real text has none.

Random order looks worse by the same judge: 2.29. Its repetition, though, sits at real-text levels: 0.92 distinct words and 0.2% doubled. It gets the structure right, with speaker names and line breaks where they belong, and misspells a lot of words. That's the model's honest quality, and at this size it's clearly worse than the GPT.

This isn't new. A recent paper re-examining confidence remasking ([Frkovic et al. 2026](https://arxiv.org/abs/2606.12232)) talks about "the diversity collapse previously reported for confidence-based unmasking" in large models. What I have is a small reproduction you can watch happen.

## How many steps can you cut?

The reason to want a dLLM is speed: reveal more characters per step and you need fewer passes through the network. So how few can you get away with?

<figure class="dllm-steps" data-src="data/gpt-vs-dllm.json">
  <p class="dllm-legend"><span class="dllm-key dllm-key-confidence">confidence order</span><span class="dllm-key dllm-key-random">random order</span><span class="dllm-key dllm-key-ref">references</span></p>
  <svg class="dllm-plot" viewBox="0 0 660 360" tabindex="0" role="img" aria-label="GPT loss of dLLM samples against the number of sampling steps for both reveal orders; use the arrow keys to move between step counts"></svg>
  <p class="dllm-readout" aria-live="polite"></p>
  <figcaption>Each faint dot is one sample's GPT loss; the lines are the means with a band of one standard deviation. Hover, or focus the chart and use the arrow keys, to read a step count.</figcaption>
</figure>

Random order degrades gracefully. Going from 256 steps down to 32 costs it 0.2 in GPT loss. Confidence order loses 0.86 over the same cut.

Both fall apart below about 8 steps. At 1 step every character is sampled at once, independently of every other, and the result is worse than guessing uniformly at random from the 65 characters (ln 65 ≈ 4.17).

## In what order does a dLLM write?

With confidence order the model chooses its own writing order, so I recorded when each character got revealed, as a fraction of the run, over 500 samples at 256 steps.

<figure class="dllm-reveal" data-src="data/gpt-vs-dllm.json">
  <svg class="dllm-plot" viewBox="0 0 660 300" role="img" aria-label="Mean point in the run at which each type of character is revealed under confidence order, with spread, and the mean reveal time at each of the 256 positions"></svg>
  <div class="dllm-watch">
    <div class="dllm-transport">
      <button type="button" class="dllm-btn" data-play>play</button>
      <label class="dllm-scrub"><span class="sr-only">Step in this sample</span>
        <input type="range" min="0" max="256" value="0" step="1">
      </label>
    </div>
    <div class="dllm-text"><pre class="dllm-ghost" aria-hidden="true"></pre><pre class="dllm-live" aria-label="One confidence-order sample"></pre></div>
    <div class="dllm-tally" aria-live="polite"></div>
  </div>
  <figcaption>Top: when each type of character is revealed, as a share of the run, with one standard deviation either side. Middle: the average reveal time at each of the 256 positions, darker for earlier. Bottom: one real 256-step sample filling in, with how much of each type is revealed so far.</figcaption>
</figure>

Spaces come first, on average at 0.44 of the way through the run. Letters follow at about 0.50, then punctuation and line breaks at about 0.58. The model lays out where the words go before deciding what they are.

The spread is wide, a standard deviation of about 0.29 for every type, so this is a tendency, not a rule. And I only measured it for confidence order. Under random order, reveal time is uniform by construction.

## What this adds up to

At about 10 million parameters, the dLLM's real output is clearly worse than the GPT's. Confidence order hides that by trading variety for predictability, and a judge that only measures predictability can't see the trade.

Some caveats. Everything here is one training run with one seed. The GPT scoring its own samples is biased low, so 1.09 is a reference point, not a target. Random order's distinct-word score comes out slightly above real text partly because misspellings create new "words". And the reveal-order numbers only describe confidence order.

Others have built the same comparison: [tiny-diffusion](https://github.com/nathan-barry/tiny-diffusion) is a character-level diffusion model on Tiny Shakespeare with a small GPT alongside it.
