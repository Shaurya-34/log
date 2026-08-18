---
date: 2026-08-18
title: Where Does Computation End?
description: A journey from the Halting Problem and Turing machines to hypercomputation, physical computation, and the question of whether reality can compute beyond Turing.
tags: computation, computability, hypercomputation, physics, philosophy
---
---

# Where Does Computation End?

I started with a fairly specific question: **Is the Gödel Machine actually used today?** [Jürgen Schmidhuber, "Gödel Machines"](https://arxiv.org/abs/cs/0309048). I expected the answer to lead somewhere inside AI. Instead, it led me into a much stranger question:

> **What does it actually mean for something to be computable?**

And eventually, an even stranger one:

> **Is the limit of computation a fundamental property of reality, or is it a boundary created by the way we choose to model reality?**

This is my attempt to follow that rabbit hole.

## 1. The Gödel Machine has a strange problem

A Gödel Machine is, roughly speaking, a hypothetical self-improving AI. It runs its current program, searches for a mathematical proof that changing its own program would increase its expected utility, and only then allows itself to rewrite its code.

That sounds reasonable until you ask a simple question: **What if the modification is genuinely better, but the machine can't prove that it is?** Imagine a chess-playing Gödel Machine. Its current algorithm is mediocre. It discovers a new algorithm that would play substantially better chess. But before replacing itself, it needs to prove that the new algorithm will produce greater utility than the old one.

That proof might require reasoning about every possible future game. For arbitrary programs, questions about future behavior can run directly into undecidability. While Gödel Machines did not manifest into a real system, the idea behind them still lives on in different forms like self-modifying / self-improving agents, meta-learning, AI systems that optimize their own reasoning/search, program synthesis and automated theorem proving, AI agents that evaluate and improve their own generated code, and recursive/iterative AI improvement<sup>*</sup>.

<sup>*</sup>these generally use empirical evaluation, gradient optimization, search, or heuristics, rather than the Gödel Machine's extremely strict “prove the modification is better, then execute it” mechanism

And that led me to the Halting Problem.

## 2. The Halting Problem is not about waiting long enough

At first, the Halting Problem sounded almost trivial. Surely, if I inspect a program carefully enough, I should eventually be able to determine whether it stops. And for many individual programs, I can.

The actual claim is much stronger:

> Can we create one algorithm that takes **any program and any input** and always determines whether that program will eventually halt?

Suppose we had:

``` python
def halts(program, input):
    # returns True if program eventually stops
```

Now construct a program that deliberately does the opposite of whatever `halts` predicts:

``` python
def evil(program):
    if halts(program, program):
        while True:
            pass
    else:
        return
```

Now ask:

``` python
halts(evil, evil)
```

If it says `True`, `evil` loops forever. If it says `False`, `evil` immediately terminates. Either way, the prediction is wrong.

The problem isn't that computers are too slow. The problem is that **no universal algorithm of this form can exist within ordinary computation**. That distinction is important. We can solve many individual halting questions. What we cannot have is a universal procedure that solves *all* of them.

In the 1930s, several people formalized “mechanical computation” in very different ways:

-   Turing machines — Turing
-   Lambda calculus — Church
-   Recursive functions — Kleene
-   Post machines — Post

They weren't simply copies of each other. They started from different mathematical ideas. Yet they all ended up characterizing essentially the same class of computable functions.

That was one of the major reasons the Church–Turing thesis became compelling: Maybe the Turing boundary isn't an arbitrary choice of one mathematical model. Maybe it is capturing something fundamental about what an algorithmic process is.

## 3. So what exactly is computation?

This question bothered me more than the Halting Problem itself. We casually say:

> "The computer computed it."

But what is computation? At the simplest level, it is the systematic transformation of information according to rules. Turing's great contribution was to formalize what we mean by a mechanical procedure.

A Turing machine is absurdly simple:

-   a tape
-   symbols
-   a read/write head
-   a finite set of rules
-   a current state

And yet this tiny abstraction can represent general computation. What made Turing's model especially interesting was that other researchers independently developed different formalisms --- lambda calculus, recursive functions, Post systems --- and they ended up describing essentially the same class of computable functions.

This convergence gave us the Church--Turing thesis:

> Anything that can be computed by a reasonable mechanical procedure can be computed by a Turing machine.

But notice the wording. It is a **thesis**, not a mathematical theorem. "Reasonable mechanical procedure" is not itself a mathematical definition. And this opens an uncomfortable door.

## 4. What if computation could be defined differently?

Why should the Turing machine be the final word? We can define stronger mathematical models.

An Oracle Turing Machine, for example, can be given access to a hypothetical oracle that instantly answers the Halting Problem.

Then:

``` text
ordinary computation
        ↓
Turing machine + HALT oracle
        ↓
stronger computational model
```

But something strange happens. The oracle machine gets its own Halting Problem. You can ask whether an oracle-equipped machine halts, producing a new problem that the original oracle cannot solve.

So you get a hierarchy:

``` text
ordinary computation
        ↓
HALT oracle
        ↓
oracle-level HALT problem
        ↓
stronger oracle
        ↓
another undecidable problem
        ↓
...
```

This doesn't eliminate undecidability. It moves the boundary. That made me wonder: **Could there be some physically realizable mechanism that plays the role of an oracle?**

(for the sake of this article lets define an Oracle as a hypothetical computational black box that can answer a specific question that an ordinary Turing machine cannot algorithmically solve.)

## 5. Hypercomputation

This is where I discovered the idea of **hypercomputation**. Hypercomputation studies computational models that, in some sense, go beyond ordinary Turing computation. There are several theoretical approaches.

### Oracle computation (cleanest mathematically)

Given a Turing machine that can answer an undecidable question, (Turing Machine + HALT Oracle)

Now the halting problem can be solved by the oracle, but the oracle is essentially a black box containing information that we don't know how to compute so you can construct a new halting problem for machines using that oracle (lol).

Soooo, it's powerful but does not give us a physical implementation.

### Infinite-time computation (pretty cool)

Instead of requiring:

``` text
1, 2, 3, 4, ... forever
```

to actually take infinite time, you allow the machine to perform infinitely many computational steps and then reach a limit stage.

This lets it decide certain problems ordinary Turing machines cannot. The problem is obvious: How the hell do you physically perform infinitely many operations?

As you could probably guess, we don't know how :/

### Analog computation

Now imagine a machine that is capable of storing a number with LITERALLY INFINITE precision. You could encode an enormous amount of information into the digits of one real number, including information that is not computable by the Turing machine, then you could compute on that number and extract it.

But we run into the same wall as we did before: How do you physically perform infinitely many operations?

### Relativistic and CTC-based computation

Use unusual spacetime structures, such as closed timelike curves, to alter what computation could theoretically accomplish. And there have actually been quantum experiments simulating CTC behavior. In 2026, researchers experimentally implemented a postselected CTC protocol on Quantinuum and IBM quantum processors: [arXiv](https://arxiv.org/abs/2501.16335).

(THEY SIMULATED THE BEHAVIOR OF A CTC, AND DID NOT ACTUALLY CREATE ONE)

Now a CTC is basically a path through spacetime where you can follow the curve and eventually arrive back at an earlier point in your own timeline.

``` text
Past → Future → Past
          ↑       │
          └───────┘
```

Now we ALL know that we cannot travel back in time but if we could (BIG IF), we could follow a CTC and arrive back at an earlier point in our own timeline.

But to even realise the dream of making a CTC work, we would require exotic conditions like rapidly rotating cosmic strings, special wormhole geometries and enormous gravitational fields.

And then there is quantum computing. Quantum computers are incredibly powerful for certain problems, but they aren't known to cross the boundary of Turing computability. They provide computational **speedups**, not necessarily computational **possibilities**. That distinction matters enormously.

## 6. A faster computer isn't necessarily a more powerful computer

This became one of the recurring distinctions throughout this rabbit hole. Suppose Computer A takes:

``` text
1,000,000,000 years
```

to solve a problem. And Computer B takes:

``` text
1 second
```

That's an enormous improvement. But if the problem is Turing-computable, both machines are still operating inside the same computability boundary.

Hypercomputation would mean something fundamentally different. It would mean:

> There exists a problem that Computer B can solve that **no ordinary Turing machine can solve at all**.

Not slower. Not impractical. Not astronomically expensive. **Uncomputable.** That is a much higher bar.

## 7. Maybe physics itself could provide the missing computation

This is where the question became much more interesting to me. A Turing machine is an abstraction. A physical computer is not. A real computer is made from:

-   electrons
-   photons
-   fields
-   materials
-   quantum states
-   physical interactions

So perhaps the question shouldn't be:

> "Can we design a clever enough algorithm to beat Turing?"

Maybe it should be:

> **"Does nature contain physical processes that cannot be captured by Turing computation?"**

This brings us to the **Physical Church--Turing Thesis**. Roughly:

> Is everything physically computable also Turing-computable?

Unlike the ordinary mathematical limits of Turing machines, this is not something we have proved from mathematics alone. It is a question about the relationship between computation and physical reality. And that's a much more uncomfortable question.

## 8. What about continuous physics?

Consider an analog computer. Instead of representing a value using discrete bits, it could represent it using something like voltage:

``` text
1 V     → 1
2.5 V   → 2.5
7.3 V   → 7.3
```

Mathematically, a voltage can be treated as a real number:

``` text
3.1415926535897932384626...
```

And a real number has infinitely many digits. This creates a fascinating theoretical possibility. Suppose a physical system could store and manipulate a real number with genuinely infinite precision. Then that number could, mathematically, encode information that is not Turing-computable.

For example, imagine a number:

``` text
x = 0.H₁H₂H₃H₄H₅...
```

where:

``` text
Hₙ = 1  if program n halts
Hₙ = 0  otherwise
```

That single real number would contain the entire Halting Problem. If we could physically access arbitrary digits of it, we would effectively have a Halting oracle. That would be extraordinary. But there is a catch.

**The infinite precision is doing all the work.**

## 9. The problem with infinite precision

Real physical systems have:

-   thermal noise
-   quantum fluctuations
-   finite measurement precision
-   finite energy
-   finite bandwidth
-   finite time

A mathematical real number can have infinitely many digits. A physical measurement cannot simply assume that all those digits are accessible. This creates an important distinction:

> A physical state **containing** noncomputable information is not necessarily a physical computer **using** noncomputable information.

Suppose nature somehow contains a noncomputable real. Great. Can I manipulate it? Can I measure it? Can I extract its 10,000th digit? Can I do that reliably? Can a finite observer actually obtain useful information from it? If the answer is no, then its theoretical existence doesn't give us a hypercomputer.

The real challenge is:

``` text
physical state
      ↓
controllable interaction
      ↓
measurement
      ↓
usable non-Turing information
```

That middle section is where everything becomes difficult.

## 10. What if we don't need infinite precision?

This was one of the ideas I found most interesting. Maybe demanding a single perfectly precise real number is the wrong approach. What if instead a physical system has an enormous continuous state space? Imagine it naturally produces states like:

``` text
0.384729...
0.918273...
0.101101...
0.777291...
...
```

Instead of requiring infinite precision from one state, perhaps we could explore the state space until the system reaches some state containing the structure we want. This sounds promising. But immediately another problem appears: **How do we recognize the useful state?**

Suppose the Halting Problem is encoded in some mysterious state:

``` text
0.101101001...
```

How do I know that this is the special state? If I need a computable procedure to recognize it, the difficulty may simply have moved from:

> computing the answer

to:

> recognizing the state containing the answer.

And if the search itself is Turing-computable, then perhaps I've merely hidden the computation inside the physical process. Still, I think the question is worth asking more carefully:

> **Can a physical system explore a continuous state space and expose useful structure without explicitly computing that structure step by step?**

That feels like a much more concrete research question.

## 11. What about dimensionality?

Another thought I had was whether increasing physical dimensionality could help. A Turing machine is essentially one-dimensional. Physical systems can be:

``` text
1D
2D
3D
...
```

A 3D optical system can have an enormous number of interacting degrees of freedom. But more dimensions don't automatically mean more computability. This is similar to something familiar from machine learning. Cover's theorem tells us that transforming data into a higher-dimensional representation can make a problem linearly separable. You don't necessarily create a physically new dimension. You transform the representation.

For example:

``` text
(x₁, x₂)
      ↓
(x₁, x₂, x₁x₂)
```

Suddenly a problem that wasn't linearly separable may become separable by a plane. This analogy is interesting for computation. Perhaps a physical system could perform a transformation that makes an apparently impossible computational problem accessible.

But there is a hard boundary:

> If the transformation itself is Turing-computable, you haven't escaped Turing computation.

For this idea to genuinely break the boundary, the **physical transformation itself** would need to introduce non-Turing-computable information. And that's exactly the question.

## 12. What about closed timelike curves?

Closed timelike curves, or CTCs, are another fascinating theoretical possibility. A CTC is not simply "the universe reversing time." It is a path through spacetime that, in certain solutions of general relativity, can return to an earlier spacetime event. Certain computational models involving CTCs have surprising computational consequences.

The appeal is obvious: instead of giving a computer an oracle explicitly, perhaps the structure of spacetime itself provides an additional computational resource. But there is a massive difference between:

``` text
mathematically allowed spacetime solution
```

and:

``` text
physically realizable machine
```

We have no demonstrated CTC that can be used as a computational resource. There are also serious physical questions about whether nature permits such structures to exist at all. So CTCs are better described as **theoretical routes toward hypercomputation**, not functioning time-travel computers.

## 13. So are we actually close to breaking Turing?

No. And this is where the excitement needs to be separated from the evidence. We currently have:

-   no physical Halting oracle
-   no demonstrated hypercomputer
-   no demonstrated physical process that computes a genuinely Turing-uncomputable function

We *do* have fascinating research in:

-   analog computation
-   optical computation
-   quantum computing
-   nonlinear dynamical systems
-   relativistic computation
-   computable analysis
-   physical computation

Some of these systems can produce enormous improvements in speed, energy efficiency, parallelism, or physical capability. But none has demonstrated that the universe allows us to compute something fundamentally beyond Turing computation.

## 14. The question I actually care about

After following this chain for a while, I think the original question about the Gödel Machine was almost incidental. The question I'm now interested in is:

> **Is the Turing boundary a fundamental boundary imposed by physical reality, or is it partly a boundary produced by our abstraction of physical systems?**

There is an important subtlety here. If I abstract a physical object into a finite description, then of course I can usually represent it using some finite computational model. But nature isn't obligated to hand us finite descriptions. Physical systems contain enormous numbers of interacting degrees of freedom. Continuous systems involve real-valued quantities. The universe may contain structures whose exact mathematical descriptions are inaccessible to finite observers.

That doesn't automatically imply hypercomputation. But it makes the question interesting. Perhaps computation isn't something we merely impose on physics. Perhaps computation is something that **emerges from certain physical structures**. And perhaps there are physical structures whose computational capabilities we haven't fully understood.

## 15. The research question

If I wanted to turn this rabbit hole into an actual research direction, I wouldn't start with:

> "How do I build a hypercomputer?"

That's too vague. I'd start with something much more constrained:

> **Can a finite, noisy, continuous physical dynamical system provide computationally useful information that is genuinely not Turing-computable?**

Then attack it from both directions.

### Try to prove it can't happen.

Maybe every physically meaningful, finite, noisy, measurable continuous system ultimately admits a sufficiently good Turing simulation. If so, that would tell us something deep about the relationship between physics and computation.

### Try to find a counterexample.

Find a physical system where:

``` text
finite physical resources
        ↓
continuous dynamics
        ↓
observable
        ↓
genuinely non-Turing-computable information
```

And then prove that the information cannot simply be reinterpreted as a hidden oracle or an unphysical infinite-precision assumption. That would be much more interesting than merely proposing another theoretical machine.

## 16. What I want to learn next

The rabbit hole seems to lead through several fields:

1.  **Computability theory**
    -   Turing machines
    -   reductions
    -   diagonalization
    -   undecidability
    -   Turing degrees
    -   arithmetical hierarchy
2.  **Computable analysis**
    -   computable real numbers
    -   continuous functions
    -   differential equations
    -   computability in physical systems
3.  **Analog computation**
    -   Shannon's differential analyzer
    -   GPACs
    -   Blum--Shub--Smale computation
    -   finite precision
    -   robustness
4.  **Physical computation**
    -   Physical Church--Turing Thesis
    -   what it means for a physical system to compute
5.  **Hypercomputation**
    -   oracle machines
    -   supertasks
    -   relativistic computation
    -   CTC computation
6.  **Modern physical implementations**
    -   nonlinear optical systems
    -   analog computing
    -   optical computing
    -   quantum information

One paper that particularly caught my attention is work connecting nonlinear optical resonators with Turing-completeness and undecidability. It is a concrete example of the strange boundary between physical dynamics and computation.

## 17. Maybe the question is backwards

The more I think about it, the less interesting the question

> "Can we build something faster than a Turing machine?"

becomes. We already know how to build faster computers. The deeper question is:

> **Can nature compute something that no Turing machine can compute?**

And then an even deeper question follows:

> **If it can, how would a finite observer know?**

Because if a physical system contains some infinitely precise, noncomputable object but we cannot reliably extract information from it, it hasn't given us a useful computational advantage.

The real breakthrough would have to be:

``` text
physical reality
      ↓
non-Turing information
      ↓
finite observer
      ↓
reliable extraction
```

without quietly hiding an oracle, infinite resources, infinite precision, or an infinite amount of computation somewhere in the assumptions.

That is an extraordinarily high bar. But it is also a beautiful question. Maybe the Turing machine really does describe the computational limits of every physically realizable process. Or maybe it describes something narrower: **the limits of computation after we've reduced reality to the kind of abstraction a Turing machine can represent.**

I don't know which is true. That's probably the reason I want to understand it.

## Recommended reading

If I were starting from here, these are the main references I would read next:

1.  **Pour-El & Richards, _Computability in Analysis and Physics_**  
    Probably the most relevant starting point for questions about continuous physical systems and computability.  
    [Book / Cambridge University Press](https://www.cambridge.org/core/books/computability-in-analysis-and-physics/DFC40C2556AF863C770EFEA0A4F30FD9)

2.  **Paolo Cotogno, "Hypercomputation and the Physical Church--Turing Thesis"**  
    A useful overview of analog, quantum, retrocausal, supertask, and other attempts to go beyond Turing computation.  
    [Paper](https://www.journals.uchicago.edu/doi/10.1093/bjps/54.2.181)

3.  **Li & Marandi, "Turing-Completeness and Undecidability in Coupled Nonlinear Optical Resonators"**  
    Directly relevant to the optical-computation angle: nonlinear optical resonators as a concrete setting where physical dynamics and undecidability meet.  
    [arXiv](https://arxiv.org/abs/2501.06966)

4.  **Aaronson & Watrous, "Closed Timelike Curves Make Quantum and Classical Computing Equivalent"**  
    A foundational paper on the computational consequences of closed timelike curves.  
    [arXiv](https://arxiv.org/abs/0808.2669)

5.  **Aaronson et al., "Computability Theory of Closed Timelike Curves"**  
    A deeper look at the computational hierarchy associated with CTC models.  
    [arXiv](https://arxiv.org/abs/1609.05507)

6.  **Microsoft Research, "An analog optical computer for AI inference and combinatorial optimization"**  
    A concrete modern implementation of real analog/optical computing, showing how physical continuous dynamics can be exploited for practical computation without claiming to exceed Turing computability.  
    [Nature](https://www.nature.com/articles/s41586-025-09430-z)

Suggested order: **Pour-El & Richards → Cotogno → Microsoft Research → Li & Marandi → the CTC papers**.
