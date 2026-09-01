# Projects

Date: 2026-09
Description: Software Shaurya has built: research tools, renderers and experiments, with links to the code and the write-ups.
Canonical: https://sslog.dpdns.org/projects.html

Things I have built, mostly to understand something rather than to ship it. Four of them have an entry on the log, which is usually the more honest account: what I expected, what actually happened, and which part turned out to matter. The rest are just the code, for now.

## Prism (Python)

A terminal-native multi-agent research tool. It splits one question into parallel web-searching subagents, supervises them with Sotis, and merges what comes back into an exportable report, all inside a keyboard-driven TUI.

[Source](https://github.com/Shaurya-34/Prism)

## Sotis (Python)

Watches an LLM agent while it is running and steps in when it starts to spiral, instead of reading the wreckage afterwards.

[Source](https://github.com/Shaurya-34/Sotis)

## catapult (Python, PyTorch)

Reproducing gwern's LLM-catapult hypothesis on a laptop GPU: can a high learning rate and heavy weight decay push a network through a memorisation-to-algorithm phase transition? Grokking reproduced on modular addition, with weight decay turning out to be the load-bearing knob.

[Source](https://github.com/Shaurya-34/catapult) · [Log entry](https://sslog.dpdns.org/grok-grok.html)

## raymarcher (Java)

A signed-distance-field ray marcher in about 170 lines of plain Java. No engine, no shader language, no graphics library, plus anti-aliasing and soft shadows.

[Source](https://github.com/Shaurya-34/raymarcher) · [Log entry](https://sslog.dpdns.org/marching-with-rays.html)

## strange_attractors (Python)

Four continuous chaotic systems and the Clifford map, rendered from one framework, including the one that refused to fit it.

[Source](https://github.com/Shaurya-34/strange_attractors) · [Log entry](https://sslog.dpdns.org/never-repeating-never-leaving.html)

## self_rewriting_mandelbrot (Python)

A Mandelbrot renderer with no cache and no database. It rewrites its own source file to remember what it has already drawn.

[Source](https://github.com/Shaurya-34/self_rewriting_mandelbrot) · [Log entry](https://sslog.dpdns.org/self-rewriting-mandelbrot.html)

## Breath-SOM (TypeScript)

A self-organising map built to behave less like a static grid of data and more like something alive.

[Source](https://github.com/Shaurya-34/Breath-SOM)
