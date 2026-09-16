# Design system

How this site looks and behaves, and why, taken from the code as it is now.
Update it in the same commit as any real design change. A stale design doc
is worse than none, because it gets followed.

## The idea

The site is a log, not a magazine: a running record of things built to
understand them. Pages are editorial (big Helvetica titles, a serif reading
column, small mono labels) and every post carries its own working evidence,
usually a live figure that runs the experiment.

Two tests for anything new:

- Does it do real work for the reader, or is it decoration placed near the
  content? Decoration gets cut. Motion is allowed when it explains something
  (a figure that follows the scroll, a strip you can read along), not to
  look lively.
- Is it honest? Posts report the author's own runs, say what failed, and
  usually end on an "Honest complication" section and a short "Close".
  Design should never make a result look firmer than the text says it is.

Writing voice: first person, plain, working notes rather than polished
documentation. No em dashes. Numbers come from real runs.

## Files

| File | What it is |
|---|---|
| `build.py` | The only generator. Every HTML page, the Markdown siblings, `feed.xml`, `sitemap.xml`, `robots.txt`, `llms.txt`, `index.md` and `widgets.css`. No template engine; shared markup is a function here. |
| `README.md` | The repo's landing page. Written by hand except the post list, which `build.py` rewrites between the `<!-- posts -->` markers. |
| `posts/*.md` | Post sources. Front matter: `title`, `date` (required), `tags`, `description`, `repo`, `cover`. |
| `design.css` | Tokens, page layout, the Triton scroll figure. Loaded by every page. |
| `style.css` | Styles for `site.js`'s widgets only. Never linked; `build.py` copies each section named in `WIDGET_SECTIONS` into `widgets.css`. |
| `widgets.css` | Generated. Do not edit. |
| `transitions.css` | Cross-document view transitions. |
| `chrome.js` | Page chrome on every page, loaded in `<head>` without `defer` so the saved theme applies before first paint: theme toggle, mute toggle, UI sounds, share button, widget repaint on theme change. |
| `design.js` | Shared motion: Lenis smooth scroll, GSAP/ScrollTrigger, the index strip, the archive filter. |
| `site.js` | Post widgets and their shared sound engine. Loaded on posts only. |
| `partials/<slug>.html` + `.js` | A hand-built scroll figure spliced into one post (see `SCROLLY`). |
| `vendor/` | Third-party or separately built bundles: `3Dmol-min.js`, and `flyvscnn.js` from the FlyvsCNN repo (see `POST_BUNDLES`). |
| `assets/` | Data a widget fetches (PDB files, PAE maps, CNN weights). |
| `images/<slug>/` | Post images. `images/covers/<slug>.svg` is a post's share image. |
| `fonts/` | TeX Gyre Heros, the local Helvetica. |
| `cloudflare/markdown-worker.js` | Optional edge worker for Markdown content negotiation, which static Pages files cannot do. |
| `tests/` | `python -m unittest discover -s tests`: agent-readiness checks. |
| `publish.ps1` | Builds, commits and pushes. The live branch is `redesign-circular-home`. |

`dev/` is gitignored scratch space.

## Type

Three families, each with one job:

```css
--display: "Heros", Helvetica, "Helvetica Neue", Arial, sans-serif;
--serif:   "Source Serif 4", Georgia, serif;
--mono:    "JetBrains Mono", ui-monospace, Menlo, monospace;
```

- `--display`: titles, section headings, tile titles, the pull quote, the
  wordmark. Helvetica Now Display is used if it is installed; otherwise TeX
  Gyre Heros loads from `fonts/`. "Heros" comes first in the stack because
  Windows maps the name "Helvetica" to Arial.
- `--serif`: body text, 18px, line height 1.62, on a `34rem` measure.
- `--mono`: labels, dates, captions, code, widget chrome. Labels are
  uppercase, 0.66rem, tracked 0.18em.

Optical weight: display sizes are Regular, tightly tracked (about -0.03em).
Helvetica at 6rem already reads heavy. Under about 2rem, display text is
Bold, because Regular goes limp beside the serif.

Section headings (`.prose h2`) break out to the `48rem` wide measure, sit
under a hairline, and carry a two-digit counter in the "now" ink. The count
runs through the pull quote and any scroll figure.

**Term previews.** A recurring piece of jargon gets a hover/focus card:
`<span class="term" tabindex="0">word<span class="term-preview">definition</span></span>`.
CSS only. Wrap the first occurrence, and move the inline definition into the
card rather than keeping both. Skip it where the concept is already the
subject of the prose around it. On phones the card pins to the bottom of the
screen.

**MathML** renders in a bordered `.math-scroll` block that scrolls sideways
on its own. It needs no script and follows the theme.

## Colour

Palette "lagoon", cold inks only: no orange, red, yellow or pink anywhere.
The token names are roles left over from an earlier palette, so read them as
roles, not hues:

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#f4f0e6` | `#15130f` | ground |
| `--ink` | `#13120f` | `#ebe5d8` | text, strong rules |
| `--ink-60` / `--ink-30` | `#6b675e` / `#b2ada2` | `#a29b8e` / `#5c574e` | secondary / tertiary text |
| `--line` | `#dcd6c9` | `#2d2922` | hairlines |
| `--panel` | `#ebe6da` | `#1e1b16` | code, cards |
| `--blue` | `#134e6f` petrol | `#6fb8d9` | the thing being worked on; links on hover |
| `--red` | `#5b5bd6` periwinkle | `#9a9cff` | now: the active step, the current entry |
| `--saffron` | `#a9dcd9` pale aqua | same | done: results, days with an entry |
| `--blue-deep` | `#134e6f` | `#134e6f` | blue as a surface (pull band, hovered tile) |

Dark mode is a second token set, not a filter. It follows the OS unless the
toggle stored a choice (`localStorage` key `theme`), which wins both ways.
Only tokens change between themes; rules read tokens. `--blue-deep` stays
deep in both themes so the pull band is the same object, while `--blue` as
text lightens to stay readable. Small "now" text uses `--red-text` to keep
4.5:1 contrast.

`site.js` widgets read the old token names (`--grey`, `--faint`,
`--hairline`, `--code-bg`) with `getPropertyValue`, so `design.css` points
those at the palette.

Images in posts are greyscale unless the figure is marked `.color`. In the
dark theme they are dimmed slightly, since most charts are white-backed.

## The mark

Two overlapping squares: petrol (working) and pale aqua (done), with the
overlap in periwinkle (now). It is the same three states the figures use.
`MARK_SVG` and `FAVICON` in `build.py`. Rules for any icon:

- Drawn, never typeset. A data-URI icon cannot load the site's fonts.
- No background of its own, so it sits correctly on the browser's chrome in
  both themes. The favicon switches inks under `prefers-color-scheme`.
- Check it at 16px. Fine detail turns to mush.

## Pages

Every page: masthead (mark, Index, Projects, About, mute, theme), content,
footer. `--pad` gives the side gutters.

- **Index.** The log hero shows one entry large, above a strip with one cell
  per day from the first entry to today. Days with an entry are pale aqua;
  the entry on show is periwinkle with a pointer. Pointing along the strip
  swaps the entry; `design.js` reserves the entry block's height for the
  longest title so the strip never moves under the pointer. Below it, the
  mosaic of the latest four (`LATEST`), then the archive.
- **Archive.** One row per post, grouped by year, with topic filters. A
  topic earns a filter once two posts share it (`MIN_FILTER`). This is the
  answer to "what happens at a hundred posts": the mosaic stays four tiles.
- **Article.** Hero (kicker of tags, title, standfirst, byline with date,
  source link and Share), then the prose. A post with an entry in `PULLS`
  gets the pull band in front of its second section. The article ends with
  a `∎` mark and an "Elsewhere in the log" mosaic.
- **Projects.** One ruled row per project, generated from `PROJECTS`. The
  name links to the code; a write-up, where there is one, is marked in the
  "done" ink. Nothing is numbered, because the projects have no order.
- **About, Contact, Privacy, 404.** `simple_page()`: heading and text, the
  first paragraph a size up. No pull band; that belongs to articles.

Articles read down the centre. Each child of the article centres in its own
width: text at `34rem`, code, figures and widgets at up to `48rem`.

**The pull band** is the one full-bleed block of colour on a page: deep
petrol, a sentence from the post in display type, emphasis in pale aqua with
no extra weight. It is always the post's own sentence, credited to its
section. Every article has one.

**The mosaic** is a 6-column grid repeating 4+2 / 2+4 spans, so the same
grid holds four tiles or eight. Tiles fill petrol on hover.

**Covers.** Each post gets `images/covers/<slug>.svg`, used as its
`og:image`; the index uses the newest post's. Covers are line drawings in
ink on a transparent ground: thin strokes, a few mono callouts that name the
mechanism rather than describe the picture. Draw everything statically
visible; nothing animates a cover any more.

Breakpoints: `900px` (single-column mosaic, scroll figure stacks),
`700px` (archive rows), `600px` (term cards, tables scroll), `420px`
(masthead tightens). Add another only for a layout that needs it.

## Figures and widgets

A widget has to demonstrate the post's claim, not decorate it. It earns its
place when the idea is a relationship between a parameter and a result
(weight decay on or off, a threshold, a digest length) or a process worth
watching (a ray stepping, trajectories diverging). A post with no such
relationship has no widget.

Three ways a post gets one:

1. **In `site.js`.** Markup is a raw `<figure class="{name}-demo" id="{name}-demo">`
   in the post's Markdown; the script and its `style.css` section do the
   rest. Most widgets live here.
2. **A scroll figure** in `partials/`, spliced in by `SCROLLY` between two
   anchor strings. The build fails if an anchor appears zero or two times,
   so an edit cannot silently duplicate or drop text.
3. **A separate bundle** in `vendor/`, mapped to one post in `POST_BUNDLES`
   and loaded only there as a module. Use this when a widget is too heavy
   for `site.js`: the fly-vs-CNN simulation is Three.js plus a CNN, about
   136KB gzipped. The bundle mounts into an element in the post
   (`<div data-fly-vs-cnn ...>`), brings its own scoped styles, and pauses
   whenever it is off screen or the tab is hidden.

`INTERACTIVE` in `build.py` describes each post's live figure for
`llms.txt`. Add an entry when a post gets one.

Rules for all of them:

- **Never open on nothing.** A figure with an empty starting state seeds
  itself with a real result as soon as it is ready, so the point is visible
  before the reader touches anything.
- **Read colours at draw time** from the CSS tokens, and redraw on theme
  change (`chrome.js` nudges each widget). Cache expensive redraws on the
  inputs that actually change them.
- **Hide until ready.** A widget is invisible until its script has
  initialised it, and a `<noscript>` fallback covers the no-JS case.
- **Don't block the main thread.** Scrolling is smoothed by Lenis, which
  needs the thread every frame. A widget that stalls it makes the page
  stutter; the fly simulation reads its GPU frames asynchronously for this
  reason.
- **Captions** are mono, 0.72rem, in prose voice: what the reader is
  looking at and what to try.
- **Controls** get real `aria-label`s, `aria-pressed` on toggles, and
  `aria-live="polite"` on readouts. Single-select button groups share the
  sliding indicator from `site.js`; groups of independent actions do not.
- **Phones.** Test at 375px. Nothing may widen the page.

## Motion

- Lenis smooths scrolling on every page and drives GSAP's ticker. The
  Triton scroll figure subscribes to the same instance
  (`window.lenisInstance`).
- One eased curve for interface motion: `cubic-bezier(.16,.78,.18,1)` in
  transitions, `cubic-bezier(0.22, 0.61, 0.36, 1)` for small UI moves. No
  bounce, no overshoot.
- Page changes use cross-document view transitions. The index's current
  entry title morphs into the article title.
- `prefers-reduced-motion` turns off Lenis and cuts every animation and
  transition to near zero. Any animation that starts from a hidden state
  must still land visible under reduced motion.

## Sound

On unless muted, and only ever in answer to something the reader did.
Audio cannot start before a gesture, so both engines wake on the first
press of a visit.

- `chrome.js`: a click when a tile, archive row or filter is pressed, a
  faint tick on hover, and a low knock moving along the index strip.
  Links wait 90ms so the click is heard.
- `site.js`: `siteSound`, the widgets' engine, with `tick(pace)` and
  `thunk()`. Filtered noise, never a tone.

Both read one preference, the `localStorage` key `tape-sound` (a name left
over from the old homepage, kept so visitors' choices survive). The mute
control is in the masthead. Throttle on the wall clock, not
`AudioContext.currentTime`, which stays frozen until the context runs.

## Machine readers

The site is meant to be easy for agents to use correctly:

- `llms.txt` says what the site is, when to use it, which posts have live
  figures, and lists every article. `index.md` carries `AGENT_SUMMARY`,
  which also sits on the homepage as screen-reader text.
- Every page with a Markdown version links it with
  `rel="alternate" type="text/markdown"`, written in the same build pass as
  the HTML so the two cannot drift.
- Posts carry `BlogPosting` JSON-LD; the index carries `Blog`.
- `tests/test_agent_readiness.py` checks the homepage's structure and share
  image, the trust pages, the agent files and the 404's recovery links.

## Constraints

- **CSP** is a meta tag, the only kind GitHub Pages allows:
  `default-src 'self'`, scripts from self plus Clarity, jsDelivr and cdnjs
  (Lenis, GSAP), and inline scripts and styles allowed (the index strip and
  the scroll figure need them). Anything that fetches must be same-origin,
  which is why widget data lives in `assets/`.
- **Images** in posts are `loading="lazy"`, always.
- **One generator.** If markup appears on two pages, it is a function in
  `build.py`, never copied.
