"""Build the blog: posts/*.md -> HTML pages + index.html + feed.xml.

Usage:  python build.py

Post files are named YYYY-MM-DD-slug.md and start with front matter:

    ---
    title: Post title
    date: 2026-07-12
    tags: writing, habits          (optional)
    description: One-line summary. (optional, used on index + feed)
    ---

Markdown extras:
  - a blockquote whose text starts with "!pull " becomes a pull quote
  - inside code blocks, lines starting with "#" are muted (span.cm)

Set SITE_URL before deploying; it is only used in feed.xml.
"""

import hashlib
import html
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import markdown

ROOT = Path(__file__).parent
POSTS_DIR = ROOT / "posts"
ABOUT_HTML_FILE = ROOT / "about.html"


def file_version(path):
    """Short content hash, used to cache-bust style.css/site.js so a
    browser that already cached the old file always fetches the new one
    instead of needing a manual hard refresh."""
    return hashlib.md5(path.read_bytes()).hexdigest()[:8]


CSS_VERSION = file_version(ROOT / "style.css")
JS_VERSION = file_version(ROOT / "site.js")

# no trailing slash
SITE_URL = "https://sslog.dpdns.org"
SITE_NAME = "Shaurya"
SITE_TITLE = "Shaurya · Log"
SITE_DESC = "A personal activity log and curiosity journal."

MOTTO = "honest · semi informative · personal"

INTRO = (
    "I think of this less as a blog and more as a log: a running record "
    "of what I'm building, reading, and puzzling over, written for an "
    "audience of one. If it's useful to anyone else, that's a bonus."
)

FAVICON = (
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' "
    "viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23faf9f7'/%3E"
    "%3Ctext x='32' y='46' font-family='Courier%20New,monospace' font-size='44' "
    "text-anchor='middle' fill='%23161513'%3ES%3C/text%3E%3C/svg%3E"
)

FONTS = (
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2'
    '?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700'
    '&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap">'
)


def page_head(title, desc, path, og_type="website", base=""):
    """base is "" for normal pages; the 404 page gets an absolute base
    because GitHub Pages serves it at arbitrary nested paths."""
    return (
        '<!doctype html>\n<html lang="en">\n<head>\n'
        '  <meta charset="utf-8">\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'  <title>{html.escape(title)}</title>\n'
        f'  <meta name="description" content="{html.escape(desc)}">\n'
        f'  <meta property="og:title" content="{html.escape(title)}">\n'
        f'  <meta property="og:description" content="{html.escape(desc)}">\n'
        f'  <meta property="og:type" content="{og_type}">\n'
        f'  <meta property="og:url" content="{SITE_URL}/{path}">\n'
        f'  <link rel="alternate" type="application/rss+xml" '
        f'title="{html.escape(SITE_TITLE)}" href="{base}feed.xml">\n'
        f'  <link rel="icon" href="{FAVICON}">\n'
        f'{FONTS}\n'
        f'  <link rel="stylesheet" href="{base}style.css?v={CSS_VERSION}">\n'
        f'  <script src="{base}site.js?v={JS_VERSION}" defer></script>\n'
        '</head>\n<body>\n<div class="wrap">\n'
    )


WORDMARK_HTML = (
    f'<span class="b-strike">B</span>LOG'
)


def page_header(base=""):
    return (
        '\n  <header class="site">\n'
        f'    <a class="wordmark" href="{base}index.html" '
        f'aria-label="{SITE_NAME}">{WORDMARK_HTML}</a>\n'
        '    <nav>\n'
        f'      <a href="{base}about.html">About</a>\n'
        '      <button type="button" class="theme-toggle" '
        'aria-label="Toggle color theme">dark</button>\n'
        '    </nav>\n'
        '  </header>\n'
    )


def page_foot(link_html):
    year = datetime.now().year
    return (
        '\n  <footer class="site">\n'
        f'    <span>{SITE_NAME} · {year}</span>\n'
        f'    {link_html}\n'
        '  </footer>\n\n</div>\n</body>\n</html>\n'
    )


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
    return {
        "slug": slug,
        "title": meta["title"],
        "date": datetime.strptime(meta["date"], "%Y-%m-%d"),
        "tags": [t.strip() for t in meta.get("tags", "").split(",") if t.strip()],
        "description": meta.get("description", ""),
        "body_md": m.group(2),
    }


def render_body(body_md):
    out = markdown.markdown(body_md, extensions=["fenced_code"])
    # blockquote starting with "!pull " -> pull quote
    out = out.replace('<blockquote>\n<p>!pull ', '<blockquote class="pull">\n<p>')
    # mute full-line # comments inside code blocks
    def mute(block):
        lines = [
            f'<span class="cm">{ln}</span>' if ln.lstrip().startswith("#") else ln
            for ln in block.group(2).split("\n")
        ]
        return block.group(1) + "\n".join(lines) + block.group(3)
    return re.sub(r"(<pre><code[^>]*>)(.*?)(</code></pre>)", mute, out, flags=re.DOTALL)


def build_post(post, newer, older):
    tags = (
        f'\n      <span class="tags">{html.escape(", ".join(post["tags"]))}</span>'
        if post["tags"] else ""
    )
    body = (
        '\n  <article class="post entry">\n'
        f'    <h1>{html.escape(post["title"])}</h1>\n'
        '    <p class="post-meta">\n'
        f'      <time datetime="{post["date"]:%Y-%m-%d}">{post["date"]:%B %d, %Y}</time>'
        f'{tags}\n    </p>\n\n'
        f'{render_body(post["body_md"])}\n'
        '  </article>\n'
    )
    old_link = (
        f'<a class="older" href="{older["slug"]}.html">← {html.escape(older["title"])}</a>'
        if older else "<span></span>"
    )
    new_link = (
        f'<a class="newer" href="{newer["slug"]}.html">{html.escape(newer["title"])} →</a>'
        if newer else "<span></span>"
    )
    nav = f'\n  <nav class="post-nav">\n    {old_link}\n    {new_link}\n  </nav>\n'
    foot = page_foot('<a href="index.html">Index</a>')
    title = f'{post["title"]} · {SITE_NAME}'
    head = page_head(
        title, post["description"] or post["title"],
        f'{post["slug"]}.html', og_type="article",
    )
    return head + page_header() + body + nav + foot


def build_404():
    base = urlparse(SITE_URL).path.rstrip("/") + "/"
    body = (
        '\n  <article class="post">\n'
        '    <h1>404</h1>\n'
        '    <p class="post-meta">Nothing here</p>\n'
        '    <p>\n'
        "      This page doesn't exist, or it moved. Everything that does\n"
        f'      exist is on <a href="{base}index.html">the index</a>.\n'
        '    </p>\n'
        '  </article>\n'
    )
    foot = page_foot(f'<a href="{base}index.html">Index</a>')
    head = page_head(f"404 · {SITE_NAME}", "Nothing here.", "404.html", base=base)
    return head + page_header(base) + body + foot


def build_index(posts):
    sections = []
    for year in sorted({p["date"].year for p in posts}, reverse=True):
        items = []
        for p in (q for q in posts if q["date"].year == year):
            desc = (
                f'\n      <p class="post-desc">{html.escape(p["description"])}</p>'
                if p["description"] else ""
            )
            items.append(
                '    <li>\n      <div class="post-line">\n'
                f'        <a href="{p["slug"]}.html">{html.escape(p["title"])}</a>\n'
                f'        <time datetime="{p["date"]:%Y-%m-%d}">{p["date"]:%b %d}</time>\n'
                f'      </div>{desc}\n    </li>'
            )
        sections.append(
            f'\n  <p class="year">{year}</p>\n  <ul class="posts">\n'
            + "\n".join(items) + "\n  </ul>\n"
        )
    motto = f'\n  <p class="motto">{MOTTO}</p>\n'
    intro = f'\n  <p class="intro">{INTRO}</p>\n'
    foot = page_foot('<a href="feed.xml">RSS</a>')
    head = page_head(SITE_TITLE, SITE_DESC, "")
    return head + page_header() + motto + intro + "".join(sections) + foot


def build_feed(posts):
    items = []
    for p in posts:
        link = f"{SITE_URL}/{p['slug']}.html"
        pub = p["date"].replace(tzinfo=timezone.utc).strftime("%a, %d %b %Y 00:00:00 GMT")
        items.append(
            "    <item>\n"
            f"      <title>{html.escape(p['title'])}</title>\n"
            f"      <link>{link}</link>\n"
            f"      <guid>{link}</guid>\n"
            f"      <pubDate>{pub}</pubDate>\n"
            f"      <description>{html.escape(p['description'])}</description>\n"
            "    </item>"
        )
    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<rss version="2.0">\n  <channel>\n'
        f"    <title>{html.escape(SITE_TITLE)}</title>\n"
        f"    <link>{SITE_URL}</link>\n"
        f"    <description>{html.escape(SITE_DESC)}</description>\n"
        + "\n".join(items)
        + "\n  </channel>\n</rss>\n"
    )


def restamp_about_html():
    """about.html is hand-authored (not generated), but its style.css/
    site.js links still need fresh cache-busting versions on every build."""
    text = ABOUT_HTML_FILE.read_text(encoding="utf-8")
    text = re.sub(r'href="style\.css(?:\?v=[a-f0-9]+)?"',
                  f'href="style.css?v={CSS_VERSION}"', text)
    text = re.sub(r'src="site\.js(?:\?v=[a-f0-9]+)?"',
                  f'src="site.js?v={JS_VERSION}"', text)
    ABOUT_HTML_FILE.write_text(text, encoding="utf-8")


def main():
    posts = sorted(
        (parse_post(p) for p in POSTS_DIR.glob("*.md")),
        key=lambda p: p["date"],
        reverse=True,
    )
    for i, post in enumerate(posts):
        newer = posts[i - 1] if i > 0 else None
        older = posts[i + 1] if i + 1 < len(posts) else None
        (ROOT / f"{post['slug']}.html").write_text(
            build_post(post, newer, older), encoding="utf-8"
        )
    (ROOT / "index.html").write_text(build_index(posts), encoding="utf-8")
    (ROOT / "feed.xml").write_text(build_feed(posts), encoding="utf-8")
    (ROOT / "404.html").write_text(build_404(), encoding="utf-8")
    restamp_about_html()
    print(f"built {len(posts)} posts + index.html + feed.xml + 404.html")


if __name__ == "__main__":
    main()
