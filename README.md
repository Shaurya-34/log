# Shaurya · Log

The source for [shauryasharma.tech](https://shauryasharma.tech), a personal log of hands-on technical
experiments. Each post starts from one question, builds the thing from scratch to answer it, and reports
what the runs actually showed, including what didn't work. Most posts have a live figure that runs the
experiment in your browser.

## Posts

<!-- posts -->
- [A fly's escape reflex, flying a drone](https://shauryasharma.tech/fly-circuit-vs-cnn.html) · 16 Sep 2026
- [Understanding AlphaFold's pLDDT, PAE, and pTM](https://shauryasharma.tech/understanding-alphafolds-plddt-pae-and-ptm.html) · 10 Sep 2026
- [Programming an attention kernel in Triton](https://shauryasharma.tech/programming-an-attention-kernel-in-triton.html) · 08 Sep 2026
- [Twenty-three people, 256 bits](https://shauryasharma.tech/birthday-attack.html) · 02 Sep 2026
- [Where Does Computation End?](https://shauryasharma.tech/where-does-computation-end.html) · 18 Aug 2026
- [A renderer that keeps notes on itself](https://shauryasharma.tech/self-rewriting-mandelbrot.html) · 06 Aug 2026
- [Never repeating, never leaving](https://shauryasharma.tech/never-repeating-never-leaving.html) · 24 Jul 2026
- [Marching with rays](https://shauryasharma.tech/marching-with-rays.html) · 21 Jul 2026
- [grok.....grok ?](https://shauryasharma.tech/grok-grok.html) · 20 Jul 2026
<!-- /posts -->

## How it's built

A plain static site with no framework. Posts are Markdown files in `posts/`, and `build.py` turns them into
the HTML pages at the root of this repo, which GitHub Pages serves from this branch.

```bash
pip install markdown
python build.py                         # regenerate every page
python -m unittest discover -s tests    # checks for the agent-facing files
```

- `design.css`, `design.js` and `chrome.js` are the site itself; `site.js` runs the post widgets.
- `DESIGN.md` explains how the site looks and why, and how a post gets a live figure.
- `llms.txt` and the `.md` copy of every page are there for AI agents and other machine readers.

The code behind the posts lives in its own repos, linked from each post and from the
[Projects](https://shauryasharma.tech/projects.html) page.
