import hashlib
import html
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import markdown

ROOT = Path(__file__).parent
POSTS_DIR = ROOT / "posts"
SITE_URL = "https://sslog.dpdns.org"
SITE_NAME = "Shaurya"
SITE_TITLE = "Shaurya · Log"
SITE_DESC = ("Experimental engineering notes on AI, machine learning, graphics, "
             "programming, computation, and the things I build to understand how they work.")
MOTTO = "honest · semi informative · personal"
# One line under the wordmark answering who/what before anything else -
# the homepage is also the landing page, so it can't stay anonymous.
IDENTITY = "Shaurya — engineering notes on ML, graphics, computation"
INTRO = ("I think of this less as a blog and more as a log: a running record of what I'm "
         "building, reading, and puzzling over. If it's useful to anyone else, that's a bonus.")
# The read head above the tape: the same mark the homepage is built
# around, cut down to three shapes that survive being 16 pixels wide.
# Deliberately drawn rather than typeset - a data-URI icon can't load
# Space Mono, so any letterform here would render in whatever fallback
# the reader happens to have.
#
# No background rectangle. A transparent icon sits on the browser's own
# chrome, which is already the right colour in either theme, and the
# fill follows prefers-color-scheme so ink and paper swap here the way
# they do everywhere else on the site. The old icon hardcoded a light
# background and showed up as a white tile on a dark tab strip.
FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E"
           "%3Cstyle%3Epath,rect%7Bfill:%23161513%7D"
           "@media(prefers-color-scheme:dark)%7Bpath,rect%7Bfill:%23eae5db%7D%7D%3C/style%3E"
           "%3Cpath d='M22 10h20l-10 14z'/%3E"
           "%3Crect x='4' y='31' width='56' height='6'/%3E"
           "%3Crect x='4' y='47' width='56' height='6'/%3E%3C/svg%3E")
FONTS = ('  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Courier+Prime:ital,wght@0,400;0,700&display=swap">')
CSS_VERSION = hashlib.md5((ROOT / "style.css").read_bytes()).hexdigest()[:8]
JS_VERSION = hashlib.md5((ROOT / "site.js").read_bytes()).hexdigest()[:8]
HOME_CSS_VERSION = hashlib.md5((ROOT / "home.css").read_bytes()).hexdigest()[:8]

# Meta-tag CSP: the only form GitHub Pages allows (it serves static files
# with no custom HTTP headers, so a real Content-Security-Policy response
# header isn't possible here without adding a proxy in front). This still
# blocks unauthorized script/style/connect origins; it just can't do the
# few things that specifically require a real header (frame-ancestors,
# and thus clickjacking protection, is silently ignored when delivered
# via meta - there's no way around that on this host).
# *.clarity.ms + c.bing.com are Microsoft's own documented requirement:
# https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp
CSP = ("default-src 'self'; "
       "script-src 'self' 'unsafe-inline' https://*.clarity.ms; "
       "style-src 'self' https://fonts.googleapis.com; "
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

# Shown to AI agents/clients via the homepage's sr-only summary and llms.txt.
AGENT_SUMMARY = (
    "Shaurya's Log is a small personal archive of experimental engineering notes. "
    "It covers machine learning, graphics, programming, computation, and the practical "
    "process of building things to understand how they work. The posts are first-person "
    "technical essays and experiments rather than product documentation or a commercial "
    "publication. Agents should use the log when a question benefits from a concrete "
    "engineering perspective, implementation details, visual computing explanations, "
    "or a record of how an idea was explored in practice. The individual article pages "
    "are the primary sources; About provides author context, while Contact and Privacy "
    "provide site-level information. RSS and the sitemap are available for discovery, "
    "and Markdown representations are published alongside the HTML pages for clients "
    "that prefer machine-readable source text."
)

COVER_DEFAULTS = {
    "where-does-computation-end": {
        "cover": "images/covers/where-does-computation-end.svg",
        "kicker": "A NOTE ON PHYSICAL SYSTEMS, MODELS, AND THE LIMITS OF EFFECTIVE DESCRIPTION.",
        "quote": "The map is not the territory.",
        "author": "N. Wiener",
        "diagram_label": "HALTING BOUNDARY",
    },
    "self-rewriting-mandelbrot": {
        "cover": "images/covers/self-rewriting-mandelbrot.svg",
        "kicker": "A SMALL EXPERIMENT IN SELF-MODIFICATION AND CODE THAT CHANGES ITS OWN RULES.",
        "quote": "A program can become part of its own memory.",
        "author": "sslog",
        "diagram_label": "SELF-SIMILARITY",
    },
    "never-repeating-never-leaving": {
        "cover": "images/covers/never-repeating-never-leaving.svg",
        "kicker": "ON STRANGE ATTRACTORS, DYNAMICAL SYSTEMS, AND STRUCTURES THAT NEVER SETTLE.",
        "quote": "Never repeating. Never leaving.",
        "author": "sslog",
        "diagram_label": "STRANGE ATTRACTOR",
    },
    "marching-with-rays": {
        "cover": "images/covers/marching-with-rays.svg",
        "kicker": "A VISUAL WALK THROUGH RAY MARCHING, DISTANCE FIELDS, AND GEOMETRY.",
        "quote": "The image is the end of a chain of questions.",
        "author": "sslog",
        "diagram_label": "DISTANCE FIELD",
    },
    "grok-grok": {
        "cover": "images/covers/grok-grok.svg",
        "kicker": "WHAT HAPPENS WHEN A MODEL FINALLY FINDS THE RULE?",
        "quote": "The model looked done. Then it suddenly learned.",
        "author": "sslog",
        "diagram_label": "GENERALIZATION",
    },
}


_SVG_CACHE = {}


def read_cover_svg(path):
    """Raw SVG markup for a cover, inlined directly into the page (rather
    than referenced via <img>) so the draw-in <animate> elements it embeds
    are reachable and triggerable from site.js."""
    if path not in _SVG_CACHE:
        _SVG_CACHE[path] = (ROOT / path).read_text(encoding="utf-8").strip()
    return _SVG_CACHE[path]


def absolute_url(path=""):
    return f"{SITE_URL}/" if not path else f"{SITE_URL}/{path.lstrip('/')}"


def jsonld_script(data):
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return f'  <script type="application/ld+json">{payload}</script>\n'


def page_head(title, desc, path, og_type="website", base="", jsonld=None, noindex=False,
              extra_css=None, og_image=None, md_href=None, published=None):
    robots = ('  <meta name="robots" content="noindex,follow">\n' if noindex
              else '  <meta name="robots" content="index,follow">\n')
    # published is the post's own parsed date (an aware datetime), passed in
    # directly by the caller. The old approach regex-searched the *output*
    # path for a date, which build.py deliberately strips from every slug,
    # so it was structurally guaranteed to always return "".
    article_meta = (f'  <meta property="article:published_time" content="{html.escape(published.isoformat())}">\n'
                    if og_type == "article" and published else "")
    og_image_tag = (f'  <meta property="og:image" content="{html.escape(og_image)}">\n'
                     if og_image else "")
    md_link = (f'  <link rel="alternate" type="text/markdown" href="{base}{md_href}">\n'
               if md_href else "")
    head = (
        '<!doctype html>\n<html lang="en">\n<head>\n'
        '  <meta charset="utf-8">\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'  <meta http-equiv="Content-Security-Policy" content="{CSP}">\n'
        '  <meta name="referrer" content="strict-origin-when-cross-origin">\n'
        f'  <title>{html.escape(title)}</title>\n'
        f'  <meta name="description" content="{html.escape(desc)}">\n{robots}'
        f'  <link rel="canonical" href="{html.escape(absolute_url(path))}">\n'
        f'  <meta property="og:site_name" content="{html.escape(SITE_TITLE)}">\n'
        f'  <meta property="og:title" content="{html.escape(title)}">\n'
        f'  <meta property="og:description" content="{html.escape(desc)}">\n'
        f'  <meta property="og:type" content="{og_type}">\n'
        f'  <meta property="og:url" content="{html.escape(absolute_url(path))}">\n'
        f'{og_image_tag}'
        f'{article_meta}'
        f'{md_link}'
        f'  <link rel="alternate" type="application/rss+xml" title="{html.escape(SITE_TITLE)}" href="{base}feed.xml">\n'
        f'  <link rel="icon" href="{FAVICON}">\n{FONTS}\n'
        f'  <link rel="stylesheet" href="{base}style.css?v={CSS_VERSION}">\n'
        f'  <script src="{base}site.js?v={JS_VERSION}" defer></script>\n')
    if extra_css:
        head += f'  <link rel="stylesheet" href="{base}{extra_css}?v={HOME_CSS_VERSION}">\n'
    if jsonld:
        head += jsonld_script(jsonld)
    head += CLARITY_SCRIPT
    return head + '</head>\n<body>\n<div class="wrap">\n'


WORDMARK_HTML = ('<span class="wordmark-text">LOG</span>'
                  '<span class="wordmark-cursor" aria-hidden="true"></span>')


def page_header(base="", sound=False):
    # The sound control only appears where there is something to hear.
    # The tape lives on the index and nowhere else, so carrying this in
    # every header would be a button that does nothing on four pages out
    # of five. Hidden until site.js has confirmed the browser can
    # actually synthesise the tick, the same as every other widget here.
    sound_button = ('      <button type="button" class="sound-toggle" hidden '
                    'aria-pressed="false" aria-label="Turn on tape sound">'
                    'sound</button>' + chr(10)) if sound else ''

    return ('\n  <header class="site">\n'
            f'    <a class="wordmark" href="{base}index.html" aria-label="{SITE_NAME}">{WORDMARK_HTML}</a>\n'
            '    <nav>\n'
            f'      <a href="{base}about.html">About</a>\n'
            f'{sound_button}'
            '      <button type="button" class="theme-toggle" aria-label="Toggle color theme">dark</button>\n'
            '    </nav>\n  </header>\n')


def page_foot(link_html):
    return (f'\n  <footer class="site">\n    <span>{SITE_NAME} · {datetime.now().year}</span>\n'
            f'    {link_html}\n  </footer>\n\n</div>\n</body>\n</html>\n')


def simple_page(slug, h1, meta_line, paragraphs_html, description):
    """A plain single-article static page (About/Contact/Privacy): same
    head/header/footer as every other page, one h1, a few paragraphs."""
    body = ('\n  <article class="post">\n'
            f'    <h1>{html.escape(h1)}</h1>\n'
            f'    <p class="post-meta">{html.escape(meta_line)}</p>\n'
            f'{paragraphs_html}\n  </article>\n')
    return (page_head(f'{h1} · {SITE_NAME}', description, f'{slug}.html', md_href=f'{slug}.md') +
            page_header() + body + page_foot('<a href="index.html">Index</a>'))


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
    defaults = COVER_DEFAULTS.get(slug, {})
    return {
        "slug": slug,
        "title": meta["title"],
        "date": datetime.strptime(meta["date"], "%Y-%m-%d"),
        "tags": [t.strip() for t in meta.get("tags", "").split(",") if t.strip()],
        "description": meta.get("description", ""),
        "cover": meta.get("cover", defaults.get("cover", "")),
        "cover_kicker": meta.get("cover_kicker", defaults.get("kicker", "")),
        "cover_quote": meta.get("cover_quote", defaults.get("quote", "")),
        "cover_quote_author": meta.get("cover_quote_author", defaults.get("author", "")),
        "diagram_label": meta.get("diagram_label", defaults.get("diagram_label", "")),
        "body_md": body,
        "read_time": max(1, round(len(re.findall(r"\b\w+\b", body)) / 220)),
    }


def render_body(body_md):
    out = markdown.markdown(body_md, extensions=["fenced_code"])
    out = out.replace('<blockquote>\n<p>!pull ', '<blockquote class="pull">\n<p>')
    def mute(block):
        lines = [f'<span class="cm">{ln}</span>' if ln.lstrip().startswith("#") else ln
                 for ln in block.group(2).split("\n")]
        return block.group(1) + "\n".join(lines) + block.group(3)
    return re.sub(r"(<pre><code[^>]*>)(.*?)(</code></pre>)", mute, out, flags=re.DOTALL)


def build_post(post, newer, older):
    tags = (f'\n      <span class="tags">{html.escape(", ".join(post["tags"]))}</span>'
            if post["tags"] else "")
    body = ('\n  <article class="post entry">\n'
            f'    <h1>{html.escape(post["title"])}</h1>\n'
            '    <p class="post-meta">\n'
            f'      <time datetime="{post["date"]:%Y-%m-%d}">{post["date"]:%B %d, %Y}</time>{tags}\n'
            '    </p>\n\n'
            f'{render_body(post["body_md"])}\n  </article>\n')
    old_link = (f'<a class="older" href="{older["slug"]}.html">← {html.escape(older["title"])}</a>'
                if older else '<span></span>')
    new_link = (f'<a class="newer" href="{newer["slug"]}.html">{html.escape(newer["title"])} →</a>'
                if newer else '<span></span>')
    nav = f'\n  <nav class="post-nav">\n    {old_link}\n    {new_link}\n  </nav>\n'
    description = post["description"] or post["title"]
    post_url = absolute_url(f'{post["slug"]}.html')
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
            page_header() + body + nav +
            page_foot('<a href="index.html">Index</a>'))


def panel_figure(post, index):
    """The article's diagram, with its FIG_ chrome, as the right-hand
    column of an entry panel. The SVG is inlined rather than referenced
    via <img> so its draw-in <animate>/CSS hooks stay reachable."""
    if not post["cover"]:
        return '<div class="entry-figure" aria-hidden="true"></div>'
    svg = read_cover_svg(post["cover"]).replace(
        '<svg ', '<svg class="cover-svg" aria-hidden="true" ', 1)
    label = post["diagram_label"] or ", ".join(post["tags"][:2]).upper()
    return ('<div class="entry-figure">'
            '<div class="cover-fig-chrome">'
            f'<span>FIG_{index + 1:03d}</span>'
            f'<span>[ {html.escape(label)} ]</span>'
            '</div>'
            f'{svg}</div>')


def build_index(posts):
    tape_cells = []
    cards = []
    # posts arrives newest-first (everywhere else - feed, sitemap, prev/next
    # nav - relies on that order). The tape itself reads left-to-right like
    # an actual tape: oldest cell first, newest last. The newest post stays
    # the one shown/active on load, it's just the rightmost cell instead of
    # the leftmost.
    tape_posts = list(reversed(posts))
    newest = len(tape_posts) - 1
    for i, p in enumerate(tape_posts):
        bit = "01011"[i % 5]
        is_active = i == newest
        # The cell carries only its bit: a tape is cells, not a labelled
        # list. Title and date live in the panel below, for whichever cell
        # is currently under the head.
        tape_cells.append(
            f'<button class="tape-cell{" is-active" if is_active else ""}" '
            f'data-index="{i}" aria-label="Open {html.escape(p["title"])}" '
            f'aria-current="{"true" if is_active else "false"}">'
            f'<span class="tape-bit" aria-hidden="true">{bit}</span>'
            f'</button>')
        tags = ', '.join(p["tags"][:4])
        # Every panel is rendered into the HTML and hidden with CSS rather
        # than injected on demand, so crawlers and agents still see all
        # five articles' text on the homepage.
        cards.append(
            f'<article class="entry-panel{" is-active" if is_active else ""}" '
            f'data-index="{i}" aria-hidden="{"false" if is_active else "true"}">'
            '<div class="entry-text">'
            f'<p class="entry-meta">ARTICLE NO. {i + 1:02d} · {p["date"]:%d %b %Y} · '
            f'{p["read_time"]} min read</p>'
            f'<h2 class="entry-title"><a href="{p["slug"]}.html">{html.escape(p["title"])}</a></h2>'
            f'<p class="entry-desc">{html.escape(p["description"])}</p>'
            f'<p class="entry-tags">{html.escape(tags)}</p>'
            '</div>'
            f'{panel_figure(p, i)}'
            '</article>')
    jsonld = {"@context":"https://schema.org","@type":"Blog","name":SITE_TITLE,
              "description":SITE_DESC,"url":SITE_URL,"author":{"@type":"Person","name":SITE_NAME,"url":SITE_URL}}
    # The head is fixed at the centre and the tape scrolls beneath it, the
    # way a real reader works: the head doesn't chase the tape.
    tape = (
        '<section class="tape-nav" aria-label="Article navigation">'
        '<div class="tape-head" aria-hidden="true"></div>'
        # The blank run-out either side is two real, empty elements with a
        # real width. Everything cleverer than this has failed on some
        # engine: percentage padding, vw padding, and pseudo-element flex
        # items all collapsed to nothing, leaving the end cells stranded
        # past the end of the scroll range. A plain box with a width is
        # the one thing every layout engine agrees on.
        '<div class="tape-viewport"><div class="tape-track" role="list">'
        '<div class="tape-runout" aria-hidden="true"></div>'
        + ''.join(tape_cells) +
        '<div class="tape-runout" aria-hidden="true"></div>'
        '</div></div>'
        '<button class="tape-arrow tape-prev" type="button" aria-label="Previous article">←</button>'
        '<button class="tape-arrow tape-next" type="button" aria-label="Next article">→</button>'
        '</section>')
    # sr-only: the tape/panel layout has no single visible page heading
    # (the panel titles are h2s), so this gives screen readers and agents
    # one real heading plus a plain-text summary of the whole site up
    # front, not just its newest post.
    agent_summary = (f'<h1 class="sr-only">{html.escape(SITE_TITLE)}</h1>\n'
                      f'<p class="sr-only agent-home-summary">{html.escape(AGENT_SUMMARY)}</p>\n')
    body = (page_header(sound=True) + agent_summary + f'<p class="identity">{IDENTITY}</p>\n'
            '<main class="home-stage">' + tape +
            '<section class="panel-stage" aria-live="polite">' + ''.join(cards) + '</section>'
            '</main>')
    og_image = absolute_url(posts[0]["cover"]) if posts and posts[0]["cover"] else None
    return (page_head(SITE_TITLE, SITE_DESC, "", jsonld=jsonld, extra_css="home.css",
                      og_image=og_image, md_href="index.md") + body +
            page_foot('<a href="feed.xml">RSS</a>'))


def build_about():
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
                        "About Shaurya and the purpose of this engineering log.")


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
    lines = [
        "# Shaurya · Log", "",
        "> A personal archive of experimental engineering notes about machine learning, "
        "graphics, programming, computation, and the process of building things to "
        "understand how they work.", "",
        "## When to use this log", "",
        "Use this site when an agent needs a first-person engineering perspective, "
        "implementation details, visual-computing explanations, or an exploratory account "
        "of how a technical idea was tested in practice. It is especially useful for "
        "questions about the subjects covered by the articles below. Treat the posts as the "
        "author's working notes rather than authoritative specifications; preserve "
        "uncertainty and distinguish experiments from established facts.", "",
        "## How to use it", "",
        "- Prefer the individual article pages as primary sources for claims made in the log.",
        "- When fetching programmatically, request the canonical HTML URL or use the "
        "published `.md` sibling when Markdown is preferable.",
        "- Use `sitemap.xml` for URL discovery and `feed.xml` for the article chronology.",
        "- Use `about.html` for author/site context, `contact.html` for contact routing, "
        "and `privacy.html` for site data practices.",
        "- Do not infer credentials, affiliations, or opinions that are not stated on the "
        "relevant page.", "",
        "## Articles", "",
    ]
    for p in posts:
        lines.append(f'- [{p["title"]}]({absolute_url(f"{p["slug"]}.html")}) — {p["description"]}')
    lines += [
        "", "## Site pages", "",
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
    body = ('\n  <article class="post">\n    <h1>404</h1>\n    <p class="post-meta">Nothing here</p>\n'
            '    <p>This page does not exist or has moved. Start at the '
            f'<a href="{base}index.html">index</a>, browse the '
            f'<a href="{base}sitemap.xml">sitemap</a>, or read the '
            f'<a href="{base}llms.txt">agent guide</a>.</p>\n  </article>\n')
    return page_head(f"404 · {SITE_NAME}", "Nothing here.", "404.html", base=base, noindex=True) + page_header(base) + body + page_foot(f'<a href="{base}index.html">Index</a>')


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
    for slug, (title, date_str, desc, body) in static_pages.items():
        text = markdown_sibling(slug, title, date_str, desc, f'{slug}.html', body)
        (ROOT / f'{slug}.md').write_text(text, encoding="utf-8")


def main():
    posts = sorted((parse_post(p) for p in POSTS_DIR.glob("*.md")), key=lambda p: p["date"], reverse=True)
    for i, post in enumerate(posts):
        newer = posts[i - 1] if i > 0 else None
        older = posts[i + 1] if i + 1 < len(posts) else None
        (ROOT / f'{post["slug"]}.html').write_text(build_post(post, newer, older), encoding="utf-8")
    (ROOT / "index.html").write_text(build_index(posts), encoding="utf-8")
    (ROOT / "about.html").write_text(build_about(), encoding="utf-8")
    (ROOT / "contact.html").write_text(build_contact(), encoding="utf-8")
    (ROOT / "privacy.html").write_text(build_privacy(), encoding="utf-8")
    (ROOT / "feed.xml").write_text(build_feed(posts), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(build_sitemap(posts), encoding="utf-8")
    (ROOT / "robots.txt").write_text(build_robots(), encoding="utf-8")
    (ROOT / "404.html").write_text(build_404(), encoding="utf-8")
    (ROOT / "llms.txt").write_text(build_llms(posts), encoding="utf-8")
    write_markdown_files(posts)
    print(f"built {len(posts)} posts + index/about/contact/privacy + feed/sitemap/robots/404 "
          f"+ llms.txt + {len(posts) + 4} markdown siblings")


if __name__ == "__main__":
    main()
