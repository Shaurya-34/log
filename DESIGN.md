# Design system

Reference for how this site actually looks and why — extracted from the live
code, not aspirational. Update this file whenever a real design decision is
made; a stale doc is worse than none, since it actively misleads.

## The core idea

The site is a Turing tape, not a blog. The homepage's navigator is a strip of
bordered cells, each one a tape cell holding one entry; a read head scans
across it. The tagline states the physics directly: *"A head scans a tape.
One cell at a time. The machine moves. The log remains."* Every other design
decision should trace back to this or not be made.

Practical test before adding anything new: does it extend the tape/machine
metaphor, or is it decoration placed near it? The latter gets cut. (Concrete
precedent: an orbit/radar diagram was removed from the homepage early on for
exactly this reason — well-drawn, but not part of the argument the page was
making.)

Writing voice matches: honest, curiosity-driven, no hype. The About page
states the actual method — "I get bored, end up somewhere on the internet,
find something that snags my attention, and if it's still interesting a few
days later, I write it down." Article prose should read the same way:
first-person, working notes rather than polished documentation, willing to
say when something didn't work.

## The mark

The favicon is the read head above the tape, reduced to three shapes: a
triangle and two rails. It is the homepage's own mechanism at 16 pixels,
and it follows the same test as everything else here - does it extend the
tape metaphor, or is it decoration placed near it?

Three rules came out of drawing it, and they apply to any future icon:

- **Drawn, never typeset.** A data-URI icon can't load Space Mono, so a
  letterform renders in whatever fallback the reader has. The previous
  favicon was an `S` in Courier New - a shape the site didn't control,
  and the wrong letter besides once the wordmark became LOG.
- **No background rectangle.** A transparent icon sits on the browser's
  own chrome, which is already correct in both themes. The old one
  hardcoded `#faf9f7` and rendered as a white tile on a dark tab strip,
  breaking the ink/paper swap the rest of the site obeys.
- **16px is the only test that matters.** Outlined boxes fill in, interior
  detail mushes, and sub-pixel dots blur to grey bands. Marks that need
  more room - a bordered cell, the sprocket cross-section - belong on a
  180px touch icon, not in a tab.

## Typography

Two font stacks, both monospace, no serif or humanist sans anywhere on the
site:

```css
--display: "Space Mono", "Courier Prime", "Courier New", monospace;
--mono:    "Courier Prime", ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace;
```

- `--display` — wordmark, article h1 (3.5rem), tape-cell titles. The
  "voice" font.
- `--mono` — everything else: body copy, labels, meta lines, figure
  captions, UI chrome (`ARTICLE NO. 01`, `FIG_001`).

No font size or weight decision should introduce a third family. If
something needs emphasis, use weight, letter-spacing, or uppercase — not a
different typeface.

## Color

CSS custom properties only — never a hardcoded hex outside `:root` (canvas
widgets are the one exception, discussed below, and even they read the
tokens at draw time via `getComputedStyle`).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ink` | `#161513` | `#eae5db` | primary text, borders, active state |
| `--paper` | `#faf9f7` | `#17150f` | background |
| `--grey` | `#6f6a62` | `#a29c8f` | secondary text, inactive tape borders |
| `--faint` | `#77726b` | `#8f8a82` | tertiary/meta text |
| `--hairline` | `#e7e3dc` | `#2d2a23` | dividers, thin rules |
| `--code-bg` | `#f1eee8` | `#201d17` | code block background |

Dark mode isn't a filter — it's a full second token set (`:root[data-theme=
"dark"]`), plus a `prefers-color-scheme` media query for users who haven't
made an explicit choice. **`--ink` and `--paper` swap roles between themes**
(ink is light-on-dark in dark mode) — this bit a real bug once: a component
styled with `background: var(--ink)` for "emphasis" rendered as a light bar
on a dark page, because the emphasis pattern assumed ink was always dark.
Test any inverted-contrast treatment in both themes before shipping it.

Article images: `filter: grayscale(1)` — no photo or screenshot renders in
color on this site, full stop.

## Grid and layout

- Site-wide max-width: `41rem` (`.wrap`), tightened further inside prose.
- Article pages get a **wider shell** (`56rem`) with an asymmetric split:
  prose stays centered at `34rem` (a real reading measure, ~68 characters),
  figures break out to the full width, both sharing one center axis. Code
  blocks and `<hr>` stay in the prose column — they were measured (41 of 42
  blocks across every post fit under 400px) and only look worse stretched
  to figure width.
- Interactive canvas/SVG widgets use a fixed intrinsic size — `852×420` or
  `852×480` — held responsive via `aspect-ratio` in CSS, not fixed pixels.
- Homepage tape strip: five visible cells on desktop, three on mobile
  (`--tape-visible`), each cell bordered `1px solid var(--grey)`
  (`var(--ink)` when active). The tape reads oldest → newest, left to
  right, like an actual tape being written forward in time, and the head
  starts on the oldest cell at the left-hand end - the reader arrives at
  the start of the log and moves forward through it, rather than at the
  end facing backwards. It also means the tape opens with somewhere to
  go, instead of against its own stop.
- Single mobile breakpoint: `max-width: 600px`. A second tier at `1050px`
  handles tablet-width reflow. Don't invent a third without a concrete
  layout that needs it.

## The figure system

Every diagram-bearing figure carries the same chrome, regardless of
whether it's a static SVG or a live canvas:

```
FIG_00N                              [ CAPTION IN BRACKETS ]
──────────────────────────────────────────────────────────
                  (the actual figure)
──────────────────────────────────────────────────────────
Figcaption in prose voice, explaining what the reader is
looking at and why it's drawn the way it is.
```

Line art is thin (`stroke-width` 1–2), monochrome, labeled with short
mono-font leader-line callouts (`BOUNDED`, `ESCAPES →`) rather than dense
annotation. A label should name the mechanism, not describe the picture.

## Interactive widgets

Three built so far (`grok-demo`, `chaos-demo`, `ray-demo` in `site.js`), all
following the same shape:

- A `.{name}-head` row: a control (toggle buttons or a slider) on the left,
  a live text readout on the right, `justify-content: space-between`.
- The figure itself (`<svg>` or `<canvas>`) below the head.
- Hidden (`display:none`) until JS has actually initialized it —
  `.{name}-demo.is-ready` gates visibility, so a JS failure shows nothing
  rather than a broken static frame. A `<noscript>` fallback image covers
  the no-JS case.
- Colors read from CSS custom properties **at draw time**, via
  `getComputedStyle`, never hardcoded — this is what makes a canvas widget
  survive a theme toggle. Cache expensive redraws (e.g. a ~350,000-pixel
  fill) keyed on whatever inputs actually change the output (theme, mode),
  not recomputed on every interaction — one widget shipped an 85–90ms
  regression this way before being caught.
- A widget demonstrates the article's own stated claim rather than
  illustrating it. Rule of thumb from this session: interactivity is
  earned when the concept is a parameter-to-result relationship (weight
  decay on/off, sigma/rho/beta, ray-cast toward a click) — not added
  because motion would look good. An article with no such relationship
  (e.g. a conceptual argument piece) correctly has no widget at all.

## Animation

- Global kill switch already exists — respect it, don't duplicate it:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }
  ```
  Any animation that sets a *starting* state via the animation itself
  (e.g. `width: 0` animating to full) must add an explicit reduced-motion
  override restoring the end state — otherwise disabling the animation
  freezes the element at its invisible starting point. This has bitten a
  draw-in effect and a typewriter effect both; check for it on every new
  CSS animation.
- One-shot reveals (diagram draw-ins) use a CSS `@keyframes` on
  `stroke-dashoffset`, triggered by adding a class from JS — not SMIL
  `beginElement()`, which proved unreliable when triggered from script.
- Looping decoration (a blinking cursor) should stop itself after a bounded
  number of iterations, not run `infinite` — indefinite motion in a page
  header reads as distracting, not lively. Land on a solid, legible end
  state, not mid-cycle.
- The tape has mass. It can be grabbed and thrown with a mouse, it
  coasts, and it always comes to rest with a cell under the head rather
  than parked between two - a thrown tape is aimed at a detent up front
  rather than left to run down and snapped afterwards, which is what
  keeps it reading as one movement instead of two. Travel time scales
  with distance; a constant duration makes a four-cell flick feel
  weightless and a one-cell nudge feel sluggish. Past either end the
  tape stretches on a transform and springs back - never scrollLeft,
  which would make the give depend on leftover run-out and so vary with
  the window width.
- Touch is left to the browser. Native scrolling already has momentum
  tuned to the platform; the pointer physics exists because a mouse gets
  none of that from overflow-x on its own.

## Sound

One rule: the site is silent until someone asks for it, and it remembers
the answer. A reader who came to read should never be made a noise at.

The tape ticks once per cell passing the head, like a dial going round.
It is synthesised in Web Audio rather than loaded - a sample would be
another request on a page that costs 23KB, and a generated click can
take its brightness and level from how fast the tape is actually
travelling. Filtered noise, never a tone: a tone reads as a beep, noise
reads as a mechanism.

Two things that are easy to get wrong here, both found by measuring:

- **Throttle perceptual timing on the wall clock, not `currentTime`.**
  An AudioContext that hasn't been resumed keeps `currentTime` frozen,
  so a floor measured against it makes every tick look simultaneous and
  drops all of them.
- **A fresh context starts its clock at zero**, so a "last fired at"
  counter initialised to 0 swallows the first tick of the visit,
  including the one that answers the toggle. Start it negative.

The control only appears on the page that has a tape, and stays hidden
until JS confirms the browser can actually synthesise the tick - same
gating as every widget here.
- Motion should be quiet: no bounce, no overshoot easing on anything
  chrome-level. `cubic-bezier(.16,.78,.18,1)` is the one eased curve used
  for interface motion (tape read-head, feature-card transitions); most
  animation on the site is a plain linear reveal or step function instead.

## Accessibility conventions

- `.sr-only` utility lives in `style.css` (not `home.css`) so every page
  can use it, not just the homepage.
- Every custom interactive control gets a real `aria-label`,
  `aria-pressed`/`aria-current` for toggles, and `aria-live="polite"` on
  any text readout that updates without a page reload.
- Decorative figures get `aria-hidden="true"` on the ornamental parts and
  a real, specific `aria-label` on the figure/canvas itself describing what
  it shows.

## File conventions

- `build.py` is the single source of truth for every HTML page — there is
  no template engine, no second build script. If a piece of markup
  appears on multiple pages, it's a function in `build.py`, called from
  each page builder — never copy-pasted.
- Every page that has one advertises a Markdown sibling
  (`rel="alternate" type="text/markdown"`) generated from the *same*
  parsed data as the HTML in the same build pass, so the two can't drift.
- No inline `<style>` blocks in post Markdown — the site's CSP doesn't
  allow inline styles, and one shipped this way before being caught only
  because it silently collapsed a whole widget. New CSS goes in
  `style.css` or `home.css`.
- Content images: `loading="lazy"` on every `<img>` in article bodies,
  always. This was a real, measured cause of slow mobile loads.
