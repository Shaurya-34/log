import functools
import hashlib
import html
import json
import re
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote, urlparse

import markdown

ROOT = Path(__file__).parent
POSTS_DIR = ROOT / "posts"
SITE_URL = "https://shauryasharma.tech"
SITE_NAME = "Shaurya"
SITE_TITLE = "Shaurya · Log"
SITE_DESC = ("Hands-on experiments with live, in-browser figures: machine learning, "
             "neuroscience, structural biology, GPU kernels, cryptography, graphics and computation.")
MOTTO = "honest · semi informative · personal"
INTRO = ("I think of this less as a blog and more as a log: a running record of what I'm "
         "building, reading, and puzzling over. If it's useful to anyone else, that's a bonus.")
# The mark: two squares overlapping, working (petrol) and done (aqua), with
# the overlap in the "now" ink - query meets key, two hashes in one slot.
# The icon is drawn rather than typeset, has no background of its own so it
# sits on the browser's chrome in either theme, and takes the dark inks under
# prefers-color-scheme.
MARK_SVG = ('<svg class="mark-logo" viewBox="0 0 36 36" aria-hidden="true">'
            '<rect class="m-work" x="1" y="1" width="22" height="22"/>'
            '<rect class="m-done" x="13" y="13" width="22" height="22"/>'
            '<rect class="m-now" x="13" y="13" width="10" height="10"/></svg>')
FAVICON = "data:image/svg+xml," + quote(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-2 -2 40 40'><style>"
    ".w{fill:#134e6f}.d{fill:#a9dcd9}.n{fill:#5b5bd6}"
    "@media(prefers-color-scheme:dark){.w{fill:#6fb8d9}.n{fill:#9a9cff}}</style>"
    "<rect class='w' x='1' y='1' width='22' height='22'/>"
    "<rect class='d' x='13' y='13' width='22' height='22'/>"
    "<rect class='n' x='13' y='13' width='10' height='10'/></svg>", safe=" ='/:;.,()-")
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:'
         'opsz,wght@8..60,400;8..60,600&family=JetBrains+Mono:wght@400;700&display=swap">\n')


@functools.cache
def version(name):
    """Cache-busting hash for a local asset. widgets.css is written at the
    start of main(), before any page asks for its version."""
    return hashlib.md5((ROOT / name).read_bytes()).hexdigest()[:8]

# Meta-tag CSP: the only form GitHub Pages allows (it serves static files
# with no custom HTTP headers, so a real Content-Security-Policy response
# header isn't possible here without adding a proxy in front). This still
# blocks unauthorized script/style/connect origins; it just can't do the
# few things that specifically require a real header (frame-ancestors,
# and thus clickjacking protection, is silently ignored when delivered
# via meta - there's no way around that on this host).
# *.clarity.ms + c.bing.com are Microsoft's own documented requirement:
# https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp
# cdn.jsdelivr.net and cdnjs serve Lenis and GSAP. Inline styles are allowed
# for the index strip, whose day count and month spans are per-build style
# attributes.
CSP = ("default-src 'self'; "
       "script-src 'self' 'unsafe-inline' https://*.clarity.ms https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; "
       "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
       "font-src 'self' https://fonts.gstatic.com https://*.clarity.ms; "
       "img-src 'self' data: https://*.clarity.ms https://c.bing.com; "
       "connect-src 'self' https://*.clarity.ms https://c.bing.com; "
       "frame-src 'none'; object-src 'none'; base-uri 'self';")

CLARITY_PROJECT_ID = "yajiq3aa14"
CLARITY_SCRIPT = (
    '  <script type="text/javascript">\n'
    '    (function(c,l,a,r,i,t,y){\n'
    '        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n'
    '        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n'
    '        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n'
    f'    }})(window, document, "clarity", "script", "{CLARITY_PROJECT_ID}");\n'
    '  </script>\n'
)

# Shown to AI agents/clients via the homepage's sr-only summary and index.md.
AGENT_SUMMARY = (
    "Shaurya's Log is a personal archive of hands-on technical experiments. Each post starts "
    "from one question, builds the thing from scratch to answer it, and reports what the "
    "author's own runs showed, including what failed and what remains uncertain. Most posts "
    "carry a live figure that runs the experiment in the browser: a WebGL drone simulation "
    "comparing a fruit fly's escape circuit with a trained CNN, rotatable AlphaFold structures "
    "with their error maps, a hash-collision simulator, a ray-marching explorer, a chaotic "
    "attractor, a grokking training curve and a Triton GPU-kernel bug you can trigger. "
    "Subjects span machine learning, computational neuroscience, structural biology, GPU "
    "programming, cryptography and probability, computer graphics, dynamical systems and "
    "the theory of computation. Article pages are the primary sources and link their source "
    "code; Markdown copies, RSS, the sitemap and llms.txt are published for machine readers."
)

def absolute_url(path=""):
    return f"{SITE_URL}/" if not path else f"{SITE_URL}/{path.lstrip('/')}"


def jsonld_script(data):
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return f'  <script type="application/ld+json">{payload}</script>\n'


# One pull quote per post: always the post's own sentence, and the section
# it comes from. The <em> is the emphasis. A post without one has no band.
PULLS = {
    "grok-grok": (
        "The true physical law keeps curving. <em>The network structurally cannot.</em>",
        "The real answer"),
    "marching-with-rays": (
        "That question turns out to be almost the whole renderer. "
        "The rest is <em>walking toward the answer.</em>",
        "Opening"),
    "never-repeating-never-leaving": (
        "Same word, \"attractor\", <em>genuinely different object.</em>",
        "Then one of them refused to fit"),
    "self-rewriting-mandelbrot": (
        "It's not a quine. It doesn't need to be. <em>It just needs to remember.</em>",
        "Coda"),
    "where-does-computation-end": (
        "Not slower. Not impractical. Not astronomically expensive. <em>Uncomputable.</em>",
        "A faster computer isn't necessarily a more powerful computer"),
    "birthday-attack": (
        "Halving the exponent sounds modest. <em>It isn't.</em>",
        "From party trick to attack"),
    "programming-an-attention-kernel-in-triton": (
        "<em>Fewer memory round trips</em>, not fewer FLOPs, is often the real lever for speed on a GPU.",
        "Why bother: the thing PyTorch hides"),
    "understanding-alphafolds-plddt-pae-and-ptm": (
        "pLDDT is a self-assessment, <em>not a measurement.</em>",
        "What pLDDT actually is"),
    "fly-circuit-vs-cnn": (
        "LPLC2 and LC4 detect looming, and <em>nothing in them checks whether "
        "the looming thing is on a collision course.</em>",
        "Why the fly loses"),
}

# What each post's live figure lets a reader do, for llms.txt. A post with
# no figure has no entry. Every key must be a real post slug.
INTERACTIVE = {
    "fly-circuit-vs-cnn": "two simulated drones, one steered by a fruit fly's looming-escape "
                          "circuit and one by a CNN, flying the same corridor in WebGL from the "
                          "same 64x48 camera, with motion opponency and escape threshold controls",
    "understanding-alphafolds-plddt-pae-and-ptm": "rotatable 3D AlphaFold structures of GFP and "
                          "beta-casein coloured by pLDDT, with their predicted aligned error maps",
    "programming-an-attention-kernel-in-triton": "a scroll-driven diagram of why the kernel is not "
                          "FlashAttention, and a slider that reproduces a hardcoded BLOCK_SIZE bug",
    "birthday-attack": "a hash-bucket collision simulator with a live histogram, and a panel that "
                       "prices collision attacks on 64- to 256-bit digests against real hardware",
    "never-repeating-never-leaving": "two Lorenz trajectories a millionth apart diverging live, "
                                     "with sigma, rho and beta sliders",
    "marching-with-rays": "a 2D sphere-tracing view: click to cast a ray and watch each distance "
                          "step, with hard and smooth shape blending",
    "grok-grok": "a training curve showing grokking on modular addition, with weight decay "
                 "switchable to show the jump never arrives without it",
    "self-rewriting-mandelbrot": "a carousel of the renderer's colormaps",
}

# The sections of style.css that style site.js's widgets, copied into
# widgets.css at build time so they can never drift from site.js.
WIDGET_SECTIONS = (
    "prose tables", "grokking figure", "segmented switch indicator",
    "Lorenz divergence figure", "sphere-tracing figure",
    "birthday-collision figures", "colormap carousel",
    "in-app browser banner", "3D structure viewer",
)

# A post can swap one section for a hand-built scroll figure kept in
# partials/<slug>.html, with its script in partials/<slug>.js. The figure
# replaces the post's HTML from `start` up to, not including, `end`. Both
# must appear exactly once, so an edit that moves either anchor fails the
# build instead of silently duplicating or dropping text.
SCROLLY = {
    "programming-an-attention-kernel-in-triton": {
        "start": "<h2>The wall, named honestly</h2>",
        "end": "<p>Naming that clearly",
    },
}
PARTIALS = ROOT / "partials"

# A widget too heavy to live in site.js gets its own built bundle in vendor/, loaded only by the post that
# uses it. The bundle mounts itself into that post's own element, so the post body just carries the element.
POST_BUNDLES = {
    "fly-circuit-vs-cnn": "vendor/flyvscnn.js",
}

LATEST = 4        # the mosaic is a fixed shelf; it never grows
MIN_FILTER = 2    # a topic earns a filter button once two posts share it
ACRONYMS = {"gpu": "GPU", "ml": "ML", "ai": "AI"}


def esc(s):
    return html.escape(s, quote=False)


def tag_label(tag):
    words = [ACRONYMS.get(w, w) for w in tag.replace("-", " ").split()]
    label = " ".join(words)
    return label[:1].upper() + label[1:]


def first_tag(post):
    """The label a tile leads with: the post's first topic, if it has one."""
    return tag_label(post["tags"][0]) if post["tags"] else "Log"


def short_desc(desc):
    """Whole sentences, stopping once there's enough to say something:
    a one-line question alone reads as a teaser, not a summary."""
    out = ""
    for sentence in re.split(r"(?<=[.?!])\s+", desc):
        out = (out + " " + sentence).strip()
        if len(out) >= 60:
            break
    return out


def href(post):
    return f'{post["slug"]}.html'


def widget_css():
    css = (ROOT / "style.css").read_text(encoding="utf-8")
    parts = re.split(r"(?m)^(?=/\* ---- )", css)
    keep = [p for p in parts if any(p.startswith("/* ---- " + n) for n in WIDGET_SECTIONS)]
    found = {n for n in WIDGET_SECTIONS for p in keep if p.startswith("/* ---- " + n)}
    missing = set(WIDGET_SECTIONS) - found
    if missing:
        raise SystemExit(f"style.css sections not found: {sorted(missing)}")
    return ("/* GENERATED by build.py from style.css - do not edit.\n"
            "   Only the sections that style site.js's widgets. */\n\n" + "".join(keep))


def page_head(title, desc, path, og_type="website", base="", jsonld=None, noindex=False,
              og_image=None, md_href=None, published=None):
    """base is "" for pages at the root and "/" for the 404, which GitHub
    Pages serves at whatever depth the missing URL had."""
    robots = "noindex,follow" if noindex else "index,follow"
    url = html.escape(absolute_url(path))
    # published is the post's own parsed date (an aware datetime), passed in
    # directly by the caller rather than recovered from the output path.
    article_meta = (f'<meta property="article:published_time" content="{html.escape(published.isoformat())}">\n'
                    if og_type == "article" and published else "")
    og_image_tag = f'<meta property="og:image" content="{html.escape(og_image)}">\n' if og_image else ""
    md_link = f'<link rel="alternate" type="text/markdown" href="{base}{md_href}">\n' if md_href else ""
    head = ('<!doctype html>\n<html lang="en">\n<head>\n'
            '<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
            '<meta name="color-scheme" content="light dark">\n'
            f'<meta http-equiv="Content-Security-Policy" content="{CSP}">\n'
            '<meta name="referrer" content="strict-origin-when-cross-origin">\n'
            f'<title>{html.escape(title)}</title>\n'
            f'<meta name="description" content="{html.escape(desc)}">\n'
            f'<meta name="robots" content="{robots}">\n'
            f'<link rel="canonical" href="{url}">\n'
            f'<meta property="og:site_name" content="{html.escape(SITE_TITLE)}">\n'
            f'<meta property="og:title" content="{html.escape(title)}">\n'
            f'<meta property="og:description" content="{html.escape(desc)}">\n'
            f'<meta property="og:type" content="{og_type}">\n'
            f'<meta property="og:url" content="{url}">\n'
            f'{og_image_tag}{article_meta}{md_link}'
            f'<link rel="alternate" type="application/rss+xml" title="{html.escape(SITE_TITLE)}" href="{base}feed.xml">\n'
            f'<link rel="icon" href="{FAVICON}">\n'
            f'{FONTS}'
            f'<link rel="stylesheet" href="{base}design.css?v={version("design.css")}">\n'
            f'<link rel="stylesheet" href="{base}widgets.css?v={version("widgets.css")}">\n'
            f'<link rel="stylesheet" href="{base}transitions.css?v={version("transitions.css")}">\n'
            # not deferred: it puts the saved theme on <html> before first paint
            f'<script src="{base}chrome.js?v={version("chrome.js")}"></script>\n')
    if jsonld:
        head += jsonld_script(jsonld)
    return head + CLARITY_SCRIPT + '</head>\n<body>\n\n'


def masthead(base="", current=""):
    # Both switches stay hidden until chrome.js has wired them: sound (the
    # click on tiles, rows and filters, and the post widgets' ticks) and the
    # theme. Each label names what pressing it would do.
    buttons = ('\n    <button type="button" class="mute-toggle" hidden aria-pressed="false" '
               'aria-label="Mute sound">mute</button>'
               '\n    <button type="button" class="mode-toggle" hidden '
               'aria-label="Switch theme">dark</button>')
    here = ' aria-current="page"'
    links = "".join(
        f'    <a href="{base}{page}.html"{here if page == current else ""}>{label}</a>\n'
        for page, label in (("index", "Index"), ("projects", "Projects"), ("about", "About")))
    return ('<header class="masthead">\n'
            f'  <a class="mark" href="{base}index.html">{MARK_SVG}LOG</a>\n'
            '  <nav class="label">\n'
            f'{links.rstrip(chr(10))}{buttons}\n'
            '  </nav>\n'
            '</header>\n\n')


def tile(post, label):
    return ('    <a class="tile-post" href="' + href(post) + '">\n'
            f'      <span class="label">{esc(label)}</span>\n'
            f'      <h3>{esc(post["title"])}</h3>\n'
            f'      <p>{esc(short_desc(post["description"]))}</p>\n'
            f'      <span class="meta label">{post["date"]:%d.%m.%y}</span>\n'
            '    </a>\n')


def mosaic(title, count_html, tiles_html):
    return ('<section class="mosaic-wrap">\n'
            '  <div class="mosaic-head">\n'
            f'    <h2>{title}</h2>\n'
            f'    {count_html}\n'
            '  </div>\n\n'
            '  <div class="mosaic" id="mosaic">\n'
            f'{tiles_html}'
            '  </div>\n'
            '</section>\n\n')


def foot(base=""):
    return ('<footer class="foot">\n'
            f'  <span class="label">{SITE_NAME} · {datetime.now().year}</span>\n'
            f'  <span class="label"><a href="{GITHUB_URL}" rel="noopener">GitHub</a> · '
            f'<a href="{base}index.html">Index</a></span>\n'
            '</footer>\n\n')


def scripts(base="", site_js=False):
    """Lenis and GSAP, then the shared motion. site.js only on posts, where
    its widgets live."""
    out = ('<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"></script>\n'
           '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n'
           '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n'
           f'<script src="{base}design.js?v={version("design.js")}"></script>\n')
    if site_js:
        out += f'<script src="{base}site.js?v={version("site.js")}"></script>\n'
    return out


def simple_page(slug, h1, meta_line, paragraphs_html, description, posts=None,
                base="", noindex=False):
    """About, Contact, Privacy and the 404: a heading and the text, the first
    paragraph a size up. Only About carries the shelf of latest entries; the
    pull-quote band belongs to the writing and appears nowhere else."""
    hero = ('<section class="hero">\n'
            f'  <p class="label kicker">{esc(meta_line)}</p>\n'
            f'  <h1>{esc(h1)}</h1>\n'
            '</section>\n\n')
    paras = paragraphs_html.replace("<p>", '<p class="lead">', 1)
    body = f'<article class="prose post prose-after">\n{paras}\n</article>\n\n'
    shelf = ""
    if posts:
        tiles = "".join(tile(p, first_tag(p)) for p in posts[:LATEST])
        shelf = mosaic("Latest in the log",
                       f'<a class="label" href="index.html#archive">All {len(posts)} in the archive →</a>', tiles)
    return (page_head(f"{h1} · {SITE_NAME}", description, f"{slug}.html", base=base, noindex=noindex,
                      md_href=None if noindex else f"{slug}.md") +
            masthead(base, current=slug) + hero + body + shelf + foot(base) +
            scripts(base) + '\n</body>\n</html>\n')


def post_bundle(slug):
    src = POST_BUNDLES.get(slug)
    return f'<script type="module" src="{src}?v={version(src)}"></script>\n' if src else ""


def parse_post(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---\n(.*)", text, re.DOTALL)
    if not m:
        raise SystemExit(f"{path.name}: missing front matter")
    meta = {}
    for line in m.group(1).splitlines():
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip()
    for required in ("title", "date"):
        if required not in meta:
            raise SystemExit(f"{path.name}: front matter needs '{required}'")
    slug = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", path.stem)
    body = m.group(2)
    # a post's share-preview image, if one has been drawn for it
    default_cover = f"images/covers/{slug}.svg"
    return {
        "slug": slug,
        "title": meta["title"],
        "date": datetime.strptime(meta["date"], "%Y-%m-%d"),
        "tags": [t.strip() for t in meta.get("tags", "").split(",") if t.strip()],
        "description": meta.get("description", ""),
        "cover": meta.get("cover", default_cover if (ROOT / default_cover).exists() else ""),
        "repo": meta.get("repo", ""),
        "body_md": body,
        "read_time": max(1, round(len(re.findall(r"\b\w+\b", body)) / 220)),
    }


def render_body(body_md):
    out = markdown.markdown(body_md, extensions=["fenced_code", "tables"])
    out = out.replace('<blockquote>\n<p>!pull ', '<blockquote class="pull">\n<p>')
    def mute(block):
        lines = [f'<span class="cm">{ln}</span>' if ln.lstrip().startswith("#") else ln
                 for ln in block.group(2).split("\n")]
        return block.group(1) + "\n".join(lines) + block.group(3)
    return re.sub(r"(<pre><code[^>]*>)(.*?)(</code></pre>)", mute, out, flags=re.DOTALL)


def body_html(post):
    out = render_body(post["body_md"])
    # wheel over the 3D viewer zooms it and trackpads swipe the carousel,
    # so Lenis must leave both alone rather than scroll the page
    out = out.replace('class="structure-viewer"', 'class="structure-viewer" data-lenis-prevent')
    out = out.replace('class="colormap-track"', 'class="colormap-track" data-lenis-prevent')
    # overflow-x on <math> itself is ignored, so a wide equation pushed the
    # whole page sideways on phones; a plain wrapper can scroll instead
    return re.sub(r'(<math display="block">.*?</math>)', r'<div class="math-scroll">\1</div>',
                  out, flags=re.DOTALL)


def build_post(post, posts, i):
    newer = posts[i - 1] if i > 0 else None
    older = posts[i + 1] if i + 1 < len(posts) else None
    post_url = absolute_url(f'{post["slug"]}.html')

    tags = " · ".join(tag_label(t) for t in post["tags"])
    # An article about code says where the code is; the conceptual ones
    # show their reading time instead.
    source = (f'<a class="label" href="{GITHUB_URL}/{post["repo"]}" rel="noopener">Source ↗</a>'
              if post["repo"] else f'<span class="label">{post["read_time"]} min read</span>')
    hero = ('<section class="hero">\n'
            f'  <p class="label kicker">{esc(tags)}</p>\n'
            f'  <h1>{esc(post["title"])}</h1>\n'
            f'  <p class="standfirst">{esc(post["description"])}</p>\n'
            '  <p class="byline">\n'
            f'    <time class="label" datetime="{post["date"]:%Y-%m-%d}">{post["date"]:%B %d, %Y}</time>\n'
            f'    <span class="byline-links">{source}'
            f'<button type="button" class="share label" data-url="{html.escape(post_url)}" '
            'aria-label="Share this article">Share</button></span>\n'
            '  </p>\n'
            '</section>\n\n')

    body = body_html(post)
    figure = after = script = ""
    scrolly = SCROLLY.get(post["slug"])
    if scrolly:
        for key in ("start", "end"):
            if body.count(scrolly[key]) != 1:
                raise SystemExit(f'{post["slug"]}: scroll figure anchor {scrolly[key]!r} '
                                 f'must appear exactly once in the post')
        a, b = body.index(scrolly["start"]), body.index(scrolly["end"])
        body, after = body[:a], body[b:]
        figure = (PARTIALS / f'{post["slug"]}.html').read_text(encoding="utf-8")
        script = (PARTIALS / f'{post["slug"]}.js').read_text(encoding="utf-8")

    # the pull quote goes in front of the second section; the end mark goes
    # on whichever article is last
    fin = "" if scrolly else " fin"
    pull = ""
    if post["slug"] in PULLS:
        text, attrib = PULLS[post["slug"]]
        pull = ('<section class="pull">\n'
                f'  <blockquote id="pullquote">{text}</blockquote>\n'
                f'  <p class="attrib"><span class="label">{esc(attrib)}</span></p>\n'
                '</section>\n\n')
    h2s = [m.start() for m in re.finditer(r"<h2[ >]", body)]
    if pull and len(h2s) >= 2:
        first, rest = body[:h2s[1]], body[h2s[1]:]
        article = (f'<article class="prose post">\n{first}</article>\n\n{pull}'
                   f'<article class="prose post prose-after{fin}">\n{rest}</article>\n\n')
    else:
        article = f'{pull}<article class="prose post prose-after{fin}">\n{body}</article>\n\n'
    if scrolly:
        article += f'{figure}\n<article class="prose post prose-after fin">\n{after}</article>\n\n'

    # next, previous, then the most recent others to fill the shelf
    picks = []
    if newer:
        picks.append((newer, "Next · " + first_tag(newer)))
    if older:
        picks.append((older, "Previous · " + first_tag(older)))
    for p in posts:
        if len(picks) == LATEST:
            break
        if p is not post and all(p is not q for q, _ in picks):
            picks.append((p, first_tag(p)))
    tiles = "".join(tile(p, label) for p, label in picks)
    more = f'<a class="label" href="index.html#archive">All {len(posts)} entries →</a>'

    description = post["description"] or post["title"]
    published = post["date"].replace(tzinfo=timezone.utc)
    jsonld = {"@context":"https://schema.org","@type":"BlogPosting","headline":post["title"],
              "description":description,"url":post_url,"mainEntityOfPage":{"@type":"WebPage","@id":post_url},
              "datePublished":published.isoformat(),
              "dateModified":published.isoformat(),
              "author":{"@type":"Person","name":SITE_NAME,"url":SITE_URL},
              "publisher":{"@type":"Person","name":SITE_NAME}}
    if post["tags"]:
        jsonld["keywords"] = post["tags"]
    og_image = absolute_url(post["cover"]) if post["cover"] else None
    return (page_head(f'{post["title"]} · {SITE_NAME}', description, f'{post["slug"]}.html',
                      og_type="article", jsonld=jsonld, og_image=og_image,
                      md_href=f'{post["slug"]}.md', published=published) +
            masthead() + hero + article +
            mosaic("Elsewhere in the log", more, tiles) + foot() +
            scripts(site_js=True) + (f'<script>\n{script}</script>\n' if script else "") +
            post_bundle(post["slug"]) +
            '\n</body>\n</html>\n')


def archive(posts):
    """Every post, one row each, grouped by year. The filter buttons are
    only the topics that recur, so the row of buttons grows with the log
    rather than one button per one-off tag."""
    counts = {}
    for p in posts:
        for t in p["tags"]:
            counts[t] = counts.get(t, 0) + 1
    topics = sorted((t for t, n in counts.items() if n >= MIN_FILTER),
                    key=lambda t: (-counts[t], t))
    buttons = (f'      <button type="button" data-tag="" aria-pressed="true">All<span>{len(posts)}</span></button>\n' +
               "".join(f'      <button type="button" data-tag="{html.escape(t)}" aria-pressed="false">'
                       f'{esc(tag_label(t))}<span>{counts[t]}</span></button>\n' for t in topics))

    years = {}
    for p in posts:
        years.setdefault(p["date"].year, []).append(p)
    groups = ""
    for year in sorted(years, reverse=True):
        rows = "".join(
            f'      <li data-tags="{html.escape("|".join(p["tags"]))}"><a href="{href(p)}">'
            f'<time class="d" datetime="{p["date"]:%Y-%m-%d}">{p["date"]:%d.%m}</time>'
            f'<span class="t">{esc(p["title"])}</span>'
            f'<span class="tags label">{esc(" · ".join(tag_label(t) for t in p["tags"][:2]))}</span>'
            '</a></li>\n' for p in years[year])
        groups += (f'  <div class="year">\n    <h3 class="year-label">{year}</h3>\n'
                   f'    <ol class="rows">\n{rows}    </ol>\n  </div>\n')

    return ('<section class="archive" id="archive">\n'
            '  <div class="archive-head">\n'
            '    <h2>Archive</h2>\n'
            f'    <div class="filters" role="group" aria-label="Filter by topic">\n{buttons}    </div>\n'
            '  </div>\n'
            f'{groups}'
            '  <p class="archive-empty" hidden>Nothing under that topic yet.</p>\n'
            '</section>\n\n')


def entry_state(i, n):
    return "Latest" if i == 0 else f"{n - i:02d} of {n:02d}"


def log_hero(posts):
    """The index opens on the log itself: one entry shown large, and a
    strip underneath with a cell for every day from the first entry to the
    day the site was built. Entry days take the "done" ink, the one being
    shown the "now" ink. Everything comes from the posts' real dates, so
    the strip is the log's actual cadence, gaps included."""
    n = len(posts)
    first = min(p["date"] for p in posts).date()
    end = max(date.today(), max(p["date"] for p in posts).date())
    days = (end - first).days + 1

    newest_on = {}  # posts are newest first, so the first seen per day wins
    for i, p in enumerate(posts):
        newest_on.setdefault(p["date"].date(), i)

    months, cells = "", ""
    for k in range(days):
        day = first + timedelta(days=k)
        if k == 0 or day.day == 1:
            nxt = date(day.year + day.month // 12, day.month % 12 + 1, 1)
            span = min((nxt - day).days, days - k)
            months += f'<span class="lh-month" style="grid-column: {k + 1} / span {span}">{day:%b}</span>'
        if day in newest_on:
            i = newest_on[day]
            p = posts[i]
            cur = " is-current" if i == 0 else ""
            cells += (f'<a class="cell is-entry{cur}" href="{href(p)}" data-i="{i}" '
                      f'aria-label="{day:%d.%m.%y}: {html.escape(p["title"])}"></a>')
        else:
            today = " is-today" if day == date.today() else ""
            cells += f'<span class="cell{today}" aria-hidden="true"></span>'

    data = json.dumps([{"t": p["title"], "d": f'{p["date"]:%d.%m.%y}', "tag": first_tag(p),
                        "desc": short_desc(p["description"]), "href": href(p),
                        "state": entry_state(i, n)} for i, p in enumerate(posts)],
                      ensure_ascii=False).replace("</", "<\\/")
    top = posts[0]
    return ('<section class="hero log-hero">\n'
            '  <div class="lh-ident">\n'
            '    <span class="label">Engineering notes on ML, graphics, computation</span>\n'
            f'    <span class="label">{esc(MOTTO)}</span>\n'
            '  </div>\n\n'
            '  <div class="lh-entry" id="lh-entry" aria-live="polite">\n'
            f'    <p class="label kicker"><span data-f="state">{entry_state(0, n)}</span> · '
            f'<span data-f="date">{top["date"]:%d.%m.%y}</span> · '
            f'<span data-f="tag">{esc(first_tag(top))}</span></p>\n'
            f'    <h1><a data-f="title" href="{href(top)}">{esc(top["title"])}</a></h1>\n'
            f'    <p class="standfirst" data-f="desc">{esc(short_desc(top["description"]))}</p>\n'
            f'    <a class="lh-read label" data-f="read" href="{href(top)}">Read →</a>\n'
            '  </div>\n\n'
            f'  <div class="lh-strip" style="--days: {days}">\n'
            '    <div class="lh-scroll">\n'
            f'      <div class="lh-months" aria-hidden="true">{months}</div>\n'
            f'      <div class="lh-cells">{cells}</div>\n'
            '    </div>\n'
            '    <div class="lh-ends">\n'
            f'      <span class="label">{first:%d.%m.%y}</span>\n'
            f'      <span class="label">Today · {end:%d.%m.%y}</span>\n'
            '    </div>\n'
            '  </div>\n\n'
            '  <div class="lh-foot">\n'
            f'    <p>{esc(INTRO)}</p>\n'
            f'    <span class="label">{n} entries · {days} days · <a href="feed.xml">RSS ↗</a></span>\n'
            '  </div>\n'
            f'  <script type="application/json" id="log-data">{data}</script>\n'
            '</section>\n\n')


def build_index(posts):
    # the hero already shows the latest entry, so the shelf starts after it
    tiles = "".join(tile(p, first_tag(p)) for p in posts[1:1 + LATEST])
    to_archive = f'<a class="label" href="#archive">All {len(posts)} in the archive ↓</a>'
    jsonld = {"@context":"https://schema.org","@type":"Blog","name":SITE_TITLE,
              "description":SITE_DESC,"url":SITE_URL,"author":{"@type":"Person","name":SITE_NAME,"url":SITE_URL}}
    og_image = absolute_url(posts[0]["cover"]) if posts and posts[0]["cover"] else None
    # a plain-text summary of the whole site up front for screen readers and
    # agents, not just its newest post
    summary = f'<p class="sr-only">{esc(AGENT_SUMMARY)}</p>\n\n'
    return (page_head(SITE_TITLE, SITE_DESC, "", jsonld=jsonld, og_image=og_image, md_href="index.md") +
            masthead(current="index") + summary + log_hero(posts) +
            mosaic("Before that", to_archive, tiles) + archive(posts) + foot() +
            scripts() + '\n</body>\n</html>\n')


GITHUB_USER = "Shaurya-34"
GITHUB_URL = "https://github.com/" + GITHUB_USER

# The work worth showing, ordered by weight rather than by date and
# deliberately not numbered - a numbered list would imply a sequence that
# does not exist. Four of the seven have a log entry; that link is shown
# where there is one, because the writing is part of the work rather than
# an advert for it. One list, one source of truth: the HTML page and its
# Markdown sibling are both generated from this.
PROJECTS = [
    {"name": "Prism", "repo": "Prism", "stack": "Python", "slug": "",
     "blurb": "A terminal-native multi-agent research tool. It splits one "
              "question into parallel web-searching subagents, supervises "
              "them with Sotis, and merges what comes back into an "
              "exportable report, all inside a keyboard-driven TUI."},
    {"name": "Sotis", "repo": "Sotis", "stack": "Python", "slug": "",
     "blurb": "Watches an LLM agent while it is running and steps in when it "
              "starts to spiral, instead of reading the wreckage afterwards."},
    {"name": "catapult", "repo": "catapult", "stack": "Python, PyTorch",
     "slug": "grok-grok",
     "blurb": "Reproducing gwern's LLM-catapult hypothesis on a laptop GPU: "
              "can a high learning rate and heavy weight decay push a network "
              "through a memorisation-to-algorithm phase transition? Grokking "
              "reproduced on modular addition, with weight decay turning out "
              "to be the load-bearing knob."},
    {"name": "raymarcher", "repo": "raymarcher", "stack": "Java",
     "slug": "marching-with-rays",
     "blurb": "A signed-distance-field ray marcher in about 170 lines of "
              "plain Java. No engine, no shader language, no graphics "
              "library, plus anti-aliasing and soft shadows."},
    {"name": "strange_attractors", "repo": "strange_attractors",
     "stack": "Python", "slug": "never-repeating-never-leaving",
     "blurb": "Four continuous chaotic systems and the Clifford map, "
              "rendered from one framework, including the one that refused "
              "to fit it."},
    {"name": "self_rewriting_mandelbrot", "repo": "self_rewriting_mandelbrot",
     "stack": "Python", "slug": "self-rewriting-mandelbrot",
     "blurb": "A Mandelbrot renderer with no cache and no database. It "
              "rewrites its own source file to remember what it has already "
              "drawn."},
    {"name": "Breath-SOM", "repo": "Breath-SOM", "stack": "TypeScript",
     "slug": "",
     "blurb": "A self-organising map built to behave less like a static grid "
              "of data and more like something alive."},
]

PROJECTS_INTRO = (
    "Things I have built, mostly to understand something rather than to ship "
    "it. Four of them have an entry on the log, which is usually the more "
    "honest account: what I expected, what actually happened, and which part "
    "turned out to matter. The rest are just the code, for now."
)


def build_projects():
    """PROJECTS in its given order (by weight, not date) and unnumbered,
    as the comment on that list asks."""
    written = sum(1 for pr in PROJECTS if pr["slug"])
    hero = ('<section class="hero">\n'
            f'  <p class="label kicker">{len(PROJECTS)} projects · {written} written up</p>\n'
            '  <h1>Projects</h1>\n'
            f'  <p class="standfirst">{esc(PROJECTS_INTRO)}</p>\n'
            '</section>\n\n')
    rows = ""
    for pr in PROJECTS:
        entry = (f'\n      <a class="project-entry label" href="{pr["slug"]}.html">Read the log entry →</a>'
                 if pr["slug"] else "")
        rows += ('  <li class="project">\n'
                 f'    <a class="project-name" href="{GITHUB_URL}/{pr["repo"]}" rel="noopener">'
                 f'{esc(pr["name"])}<span aria-hidden="true"> ↗</span></a>\n'
                 '    <div class="project-body">\n'
                 f'      <p class="project-blurb">{esc(pr["blurb"])}</p>{entry}\n'
                 '    </div>\n'
                 f'    <span class="project-stack label">{esc(pr["stack"])}</span>\n'
                 '  </li>\n')
    listing = ('<section class="projects">\n'
               f'<ul class="project-list">\n{rows}</ul>\n'
               f'<p class="project-more">Everything else lives on '
               f'<a href="{GITHUB_URL}" rel="noopener">GitHub</a>.</p>\n'
               '</section>\n\n')
    return (page_head(f"Projects · {SITE_NAME}",
                      "Software Shaurya has built: research tools, renderers and experiments, "
                      "with links to the code and the write-ups.", "projects.html", md_href="projects.md") +
            masthead(current="projects") + hero + listing + foot() +
            scripts() + '\n</body>\n</html>\n')


def build_about(posts):
    paragraphs = (
        "<p>Hi, I'm Shaurya. I'm a student who writes software and keeps this log as a "
        "record of the things I build, read, and try to understand. There isn't a bigger "
        "plan behind any of it — I get bored, end up somewhere on the internet, find "
        "something that snags my attention, and if it's still interesting a few days later, "
        "I write it down. The subjects move around: machine learning, graphics, programming, "
        "computation, mathematical ideas, and small experiments that are easier to understand "
        "by implementing them than by reading about them.</p>\n"
        "<p>The point of the site is not to present polished documentation or a fixed set of "
        "opinions. Most posts are working notes: I start with a question, follow the "
        "interesting parts, build something when code helps, and write down what survived "
        "the experiment. Some pieces are explanatory, some are exploratory, and some are "
        "simply records of a rabbit hole that seemed worth keeping.</p>\n"
        '<p>There is no comments system, newsletter, or account system on the site. The '
        "pages are generated from Markdown and published as static files. If an agent or "
        "reader wants the machine-readable version, the same articles are available as "
        'Markdown alongside their HTML pages. The site does use basic analytics to see '
        "which pages and elements actually get used, described on the "
        '<a href="privacy.html">privacy page</a>. The <a href="contact.html">contact page</a> '
        "explains how to reach me.</p>"
    )
    return simple_page("about", "About", "Updated September 2026", paragraphs,
                        "About Shaurya and the purpose of this engineering log.", posts=posts)


def build_contact():
    paragraphs = (
        "<p>This is a personal engineering log, not a company support site. For questions "
        "about a post, technical corrections, collaboration, or something you think I would "
        'find interesting, the most reliable public contact point is my '
        '<a href="https://github.com/Shaurya-34">GitHub profile</a>. You can open an issue on '
        "the relevant repository when the question is about code, or use the public profile "
        "to find the current contact route I have chosen to expose.</p>\n"
        "<p>I deliberately do not publish a private address or phone number on this site. If "
        "a message needs a private channel, use the contact method currently listed on my "
        'GitHub profile. For article context, the <a href="about.html">About</a> page '
        'explains what this log is for. The <a href="privacy.html">Privacy</a> page explains '
        "the site's data practices.</p>"
    )
    return simple_page("contact", "Contact", "Ways to reach me", paragraphs, "How to contact Shaurya.")


def build_privacy():
    paragraphs = (
        "<p>This site is a static personal log. It does not require accounts, does not "
        "provide a comment system, and does not intentionally collect names, email "
        "addresses, phone numbers, or other personal information through forms. There is no "
        "advertising system operated by the site.</p>\n"
        "<p>The site uses <a href=\"https://clarity.microsoft.com\">Microsoft Clarity</a> for "
        "basic analytics: how many people visit, which pages get read, and anonymized "
        "recordings of clicks, scrolling, and mouse movement, so I can tell which parts of "
        "the site are actually useful and which aren't. Clarity may set cookies and collect "
        "device and approximate location information as part of this. I don't use it to "
        "identify individual visitors, and it is not combined with any other data I hold. "
        "See <a href=\"https://clarity.microsoft.com/privacy\">Microsoft's Clarity privacy "
        "documentation</a> for what it collects and how it's handled.</p>\n"
        "<p>The site does load its typography from Google Fonts, so a page visit can result "
        "in a request to Google's font infrastructure. The site also uses GitHub Pages for "
        "hosting and may be cached or transported by infrastructure between the origin and a "
        "visitor. Those services may process ordinary connection information such as an IP "
        "address as part of delivering web content.</p>\n"
        "<p>If you contact me through a third-party service such as GitHub, that service's "
        "own privacy policy governs that interaction. If the site's data practices "
        'materially change, this page will be updated. Questions about privacy can be '
        'raised through the <a href="contact.html">Contact</a> page.</p>'
    )
    return simple_page("privacy", "Privacy", "Site-level data practices", paragraphs,
                        "Privacy information for Shaurya · Log.")


def build_llms(posts):
    by_slug = {p["slug"]: p for p in posts}
    unknown = set(INTERACTIVE) - set(by_slug)
    if unknown:
        raise SystemExit(f"INTERACTIVE names posts that do not exist: {sorted(unknown)}")
    link = lambda p: f'[{p["title"]}]({absolute_url(f"{p["slug"]}.html")})'
    lines = [
        "# Shaurya · Log", "",
        "> Hands-on technical experiments, each built from scratch to answer one question, "
        "most with a live figure that runs the experiment in the browser.", "",
        "## What this site is", "",
        "A personal log by Shaurya, a student who builds things to understand them. A post "
        "starts from one question, implements the idea (a simulation, a kernel, a renderer, a "
        "trained model), and reports what the author's own runs showed: real numbers, the bugs "
        "found on the way, and a section on what did not work or is still uncertain. Posts link "
        "their source code where there is some.", "",
        "Subjects so far: machine learning (generalization, imitation learning, confidence "
        "metrics), computational neuroscience (insect visual circuits), structural biology "
        "(AlphaFold), GPU programming (Triton kernels, attention), cryptography and "
        "probability (the birthday bound), computer graphics (ray marching, fractals), "
        "dynamical systems (chaos) and the theory of computation (the halting problem, "
        "hypercomputation).", "",
        "## When to use this log", "",
        "Use it for questions of the form: does this idea actually work once you build it? "
        "What does this number or metric really measure? Why is this engineering constant the "
        "size it is? Where exactly does this approach break? It suits agents that need a "
        "first-person, reproducible account with implementation detail and measured results. "
        "It is not a specification, product documentation or news source. Treat posts as the "
        "author's experiments: keep their stated uncertainty, and separate what the author "
        "measured from established facts.", "",
        "## Interactive figures", "",
        "These run in the page and need JavaScript. The Markdown copies carry the prose and "
        "captions but not the running figure.", "",
    ]
    lines += [f"- {link(p)}: {INTERACTIVE[p['slug']]}" for p in posts if p["slug"] in INTERACTIVE]
    lines += [
        "",
        "## How to use it", "",
        "- Prefer the individual article pages as primary sources for claims made in the log.",
        "- When fetching programmatically, request the canonical HTML URL or use the "
        "published `.md` sibling when Markdown is preferable.",
        "- Use `sitemap.xml` for URL discovery and `feed.xml` for the article chronology.",
        "- Use `projects.html` for the software the author has built and where the code lives, "
        "`about.html` for author/site context, `contact.html` for contact routing, "
        "and `privacy.html` for site data practices.",
        "- Do not infer credentials, affiliations, or opinions that are not stated on the "
        "relevant page.", "",
        "## Articles", "",
    ]
    for p in posts:
        lines.append(f'- {link(p)} — {p["description"]}')
    lines += [
        "", "## Site pages", "",
        f"- [Projects]({absolute_url('projects.html')})",
        f"- [About]({absolute_url('about.html')})",
        f"- [Contact]({absolute_url('contact.html')})",
        f"- [Privacy]({absolute_url('privacy.html')})",
        f"- [RSS feed]({absolute_url('feed.xml')})",
        f"- [Sitemap]({absolute_url('sitemap.xml')})",
    ]
    return "\n".join(lines) + "\n"


def build_feed(posts):
    items = []
    for p in posts:
        link = absolute_url(f'{p["slug"]}.html')
        pub = p["date"].replace(tzinfo=timezone.utc).strftime("%a, %d %b %Y 00:00:00 GMT")
        item = (f'    <item>\n      <title>{html.escape(p["title"])}</title>\n'
                f'      <link>{link}</link>\n      <guid>{link}</guid>\n      <pubDate>{pub}</pubDate>\n'
                f'      <description>{html.escape(p["description"])}</description>\n')
        if p["tags"]:
            item += f'      <category>{html.escape(", ".join(p["tags"]))}</category>\n'
        items.append(item + '    </item>')
    return ('<?xml version="1.0" encoding="utf-8"?>\n<rss version="2.0">\n  <channel>\n'
            f'    <title>{html.escape(SITE_TITLE)}</title>\n    <link>{SITE_URL}</link>\n'
            f'    <description>{html.escape(SITE_DESC)}</description>\n    <language>en</language>\n'
            + '\n'.join(items) + '\n  </channel>\n</rss>\n')


def build_sitemap(posts):
    urls = ([{"loc": absolute_url("")},
             {"loc": absolute_url("projects.html")},
             {"loc": absolute_url("about.html")},
             {"loc": absolute_url("contact.html")},
             {"loc": absolute_url("privacy.html")}] +
            [{"loc": absolute_url(f'{p["slug"]}.html'), "lastmod": p["date"].strftime("%Y-%m-%d")}
             for p in posts])
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        lines += ['  <url>', f'    <loc>{html.escape(u["loc"])}</loc>']
        if "lastmod" in u:
            lines.append(f'    <lastmod>{u["lastmod"]}</lastmod>')
        lines.append('  </url>')
    return '\n'.join(lines + ['</urlset>', ''])


def build_robots():
    return f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n"


def build_404():
    base = urlparse(SITE_URL).path.rstrip("/") + "/"
    paragraphs = ('<p>This page does not exist or has moved. Start at the '
                  f'<a href="{base}index.html">index</a>, browse the '
                  f'<a href="{base}sitemap.xml">sitemap</a>, or read the '
                  f'<a href="{base}llms.txt">agent guide</a>.</p>')
    return simple_page("404", "404", "Nothing here", paragraphs, "Nothing here.",
                       base=base, noindex=True)


def markdown_sibling(slug, title, date_str, description, canonical_path, body_md):
    lines = [f'# {title}', "", f'Date: {date_str}', f'Description: {description}',
              f'Canonical: {absolute_url(canonical_path)}', "", body_md.lstrip()]
    return "\n".join(lines).rstrip() + "\n"


def write_markdown_files(posts):
    """.md siblings for every page that advertises one via md_href in its
    <head>. Written from the same parsed data as the HTML, in the same
    pass, so the promise and the file can never drift apart the way the
    old two-script version did."""
    for p in posts:
        text = markdown_sibling(p["slug"], p["title"], p["date"].strftime("%Y-%m-%d"),
                                 p["description"], f'{p["slug"]}.html', p["body_md"])
        (ROOT / f'{p["slug"]}.md').write_text(text, encoding="utf-8")

    index_lines = [f"# {SITE_TITLE}", "", f"> {AGENT_SUMMARY}", "", "## Articles", ""]
    for p in posts:
        index_lines.append(f'- [{p["title"]}]({absolute_url(f"{p["slug"]}.html")}) — {p["description"]}')
    (ROOT / "index.md").write_text("\n".join(index_lines).rstrip() + "\n", encoding="utf-8")

    static_pages = {
        "about": ("About", "2026-09", "About Shaurya and the purpose of this engineering log.",
                  "Hi, I'm Shaurya. I'm a student who writes software and keeps this log as a "
                  "record of the things I build, read, and try to understand. There isn't a "
                  "bigger plan behind any of it — I get bored, end up somewhere on the "
                  "internet, find something that snags my attention, and if it's still "
                  "interesting a few days later, I write it down. The subjects move around: "
                  "machine learning, graphics, programming, computation, mathematical ideas, "
                  "and small experiments that are easier to understand by implementing them "
                  "than by reading about them.\n\n"
                  "The point of the site is not to present polished documentation or a fixed "
                  "set of opinions. Most posts are working notes: I start with a question, "
                  "follow the interesting parts, build something when code helps, and write "
                  "down what survived the experiment. Some pieces are explanatory, some are "
                  "exploratory, and some are simply records of a rabbit hole that seemed worth "
                  "keeping.\n\n"
                  "There is no comments system, newsletter, or account system on the site. The "
                  "pages are generated from Markdown and published as static files. The site "
                  "does use basic analytics (Microsoft Clarity) to see which pages and "
                  "elements actually get used, described on the privacy page. The individual "
                  "articles are the primary technical sources; this page provides author and "
                  "site context."),
        "contact": ("Contact", "2026-08", "How to contact Shaurya.",
                    "This is a personal engineering log, not a company support site. The most "
                    "reliable public contact point is my GitHub profile: "
                    "https://github.com/Shaurya-34"),
        "privacy": ("Privacy", "2026-08", "Privacy information for Shaurya · Log.",
                    "This site is a static personal log with no comments, accounts, or "
                    "advertising. It uses Microsoft Clarity (https://clarity.microsoft.com) "
                    "for basic analytics: visit counts and anonymized recordings of clicks, "
                    "scrolling, and mouse movement, used to see which parts of the site "
                    "actually get read. Clarity may set cookies and collect device and "
                    "approximate location information; it is not used to identify individual "
                    "visitors. The site also loads fonts from Google Fonts and is hosted on "
                    "GitHub Pages; both may process ordinary connection information as part "
                    "of delivering the page."),
    }
    # Generated from the same PROJECTS list as the HTML page, in the same
    # pass, so the two can never drift apart.
    project_md = [PROJECTS_INTRO, ""]
    for pr in PROJECTS:
        project_md.append(
            f'## {pr["name"]} ({pr["stack"]})')
        project_md.append("")
        project_md.append(pr["blurb"])
        project_md.append("")
        links = [f'[Source]({GITHUB_URL}/{pr["repo"]})']
        if pr["slug"]:
            links.append(f'[Log entry]({absolute_url(pr["slug"] + ".html")})')
        project_md.append(" \u00b7 ".join(links))
        project_md.append("")
    static_pages["projects"] = (
        "Projects", "2026-09",
        "Software Shaurya has built: research tools, renderers and "
        "experiments, with links to the code and the write-ups.",
        "\n".join(project_md).strip())

    for slug, (title, date_str, desc, body) in static_pages.items():
        text = markdown_sibling(slug, title, date_str, desc, f'{slug}.html', body)
        (ROOT / f'{slug}.md').write_text(text, encoding="utf-8")


def main():
    posts = sorted((parse_post(p) for p in POSTS_DIR.glob("*.md")), key=lambda p: p["date"], reverse=True)
    (ROOT / "widgets.css").write_text(widget_css(), encoding="utf-8")
    for i, post in enumerate(posts):
        (ROOT / f'{post["slug"]}.html').write_text(build_post(post, posts, i), encoding="utf-8")
    (ROOT / "index.html").write_text(build_index(posts), encoding="utf-8")
    (ROOT / "projects.html").write_text(build_projects(), encoding="utf-8")
    (ROOT / "about.html").write_text(build_about(posts), encoding="utf-8")
    (ROOT / "contact.html").write_text(build_contact(), encoding="utf-8")
    (ROOT / "privacy.html").write_text(build_privacy(), encoding="utf-8")
    (ROOT / "feed.xml").write_text(build_feed(posts), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(build_sitemap(posts), encoding="utf-8")
    (ROOT / "robots.txt").write_text(build_robots(), encoding="utf-8")
    (ROOT / "404.html").write_text(build_404(), encoding="utf-8")
    (ROOT / "llms.txt").write_text(build_llms(posts), encoding="utf-8")
    write_markdown_files(posts)
    print(f"built {len(posts)} posts + index/about/projects/contact/privacy + feed/sitemap/robots/404 "
          f"+ llms.txt + {len(posts) + 5} markdown siblings")


if __name__ == "__main__":
    main()
