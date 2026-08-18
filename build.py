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

The build also generates:
  - sitemap.xml
  - robots.txt
  - JSON-LD structured data
  - canonical URLs
"""

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
ABOUT_HTML_FILE = ROOT / "about.html"


def file_version(path):
    """Short content hash used to cache-bust CSS and JS."""
    return hashlib.md5(path.read_bytes()).hexdigest()[:8]


CSS_VERSION = file_version(ROOT / "style.css")
JS_VERSION = file_version(ROOT / "site.js")

# no trailing slash
SITE_URL = "https://sslog.dpdns.org"
SITE_NAME = "Shaurya"
SITE_TITLE = "Shaurya · Log"

SITE_DESC = (
    "Experimental engineering notes on AI, machine learning, "
    "graphics, programming, computation, and the things I build "
    "to understand how they work."
)

MOTTO = "honest · semi informative · personal"

INTRO = (
    "I think of this less as a blog and more as a log: a running record "
    "of what I'm building, reading, and puzzling over. If it's useful to "
    "anyone else, that's a bonus."
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
    '&family=Courier+Prime:ital,wght@0,400;0,700&display=swap">'
)


def absolute_url(path=""):
    """Convert a site-relative path into an absolute URL."""
    if not path:
        return f"{SITE_URL}/"
    return f"{SITE_URL}/{path.lstrip('/')}"


def jsonld_script(data):
    """Render a JSON-LD script block."""
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return f'  <script type="application/ld+json">{payload}</script>\n'


def page_head(
    title,
    desc,
    path,
    og_type="website",
    base="",
    jsonld=None,
    noindex=False,
):
    """Generate the common HTML <head>.

    base is "" for normal pages.
    The 404 page gets an absolute base because GitHub Pages
    can serve it at arbitrary nested paths.
    """

    canonical = absolute_url(path)

    robots = (
        '  <meta name="robots" content="noindex,follow">\n'
        if noindex
        else '  <meta name="robots" content="index,follow">\n'
    )

    article_meta = ""

    if og_type == "article":
        article_meta += (
            f'  <meta property="article:published_time" '
            f'content="{html.escape(path_date(path))}">\n'
        )

    head = (
        '<!doctype html>\n<html lang="en">\n<head>\n'
        '  <meta charset="utf-8">\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'  <title>{html.escape(title)}</title>\n'
        f'  <meta name="description" content="{html.escape(desc)}">\n'
        f'{robots}'
        f'  <link rel="canonical" href="{html.escape(canonical)}">\n'
        f'  <meta property="og:site_name" content="{html.escape(SITE_TITLE)}">\n'
        f'  <meta property="og:title" content="{html.escape(title)}">\n'
        f'  <meta property="og:description" content="{html.escape(desc)}">\n'
        f'  <meta property="og:type" content="{og_type}">\n'
        f'  <meta property="og:url" content="{html.escape(canonical)}">\n'
        f'{article_meta}'
        f'  <link rel="alternate" type="application/rss+xml" '
        f'title="{html.escape(SITE_TITLE)}" href="{base}feed.xml">\n'
        f'  <link rel="icon" href="{FAVICON}">\n'
        f'{FONTS}\n'
        f'  <link rel="stylesheet" href="{base}style.css?v={CSS_VERSION}">\n'
        f'  <script src="{base}site.js?v={JS_VERSION}" defer></script>\n'
    )

    if jsonld:
        head += jsonld_script(jsonld)

    head += '</head>\n<body>\n<div class="wrap">\n'

    return head


def path_date(path):
    """Extract YYYY-MM-DD from generated post paths.

    Used only for article OpenGraph metadata.
    """
    match = re.search(r"\d{4}-\d{2}-\d{2}", path)

    if match:
        return match.group(0)

    return ""


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
            raise SystemExit(
                f"{path.name}: front matter needs '{required}'"
            )

    slug = re.sub(
        r"^\d{4}-\d{2}-\d{2}-",
        "",
        path.stem,
    )

    return {
        "slug": slug,
        "title": meta["title"],
        "date": datetime.strptime(
            meta["date"],
            "%Y-%m-%d",
        ),
        "tags": [
            t.strip()
            for t in meta.get("tags", "").split(",")
            if t.strip()
        ],
        "description": meta.get("description", ""),
        "body_md": m.group(2),
    }


def render_body(body_md):
    out = markdown.markdown(
        body_md,
        extensions=["fenced_code"],
    )

    # blockquote starting with "!pull " -> pull quote
    out = out.replace(
        '<blockquote>\n<p>!pull ',
        '<blockquote class="pull">\n<p>',
    )

    # mute full-line # comments inside code blocks
    def mute(block):
        lines = [
            f'<span class="cm">{ln}</span>'
            if ln.lstrip().startswith("#")
            else ln
            for ln in block.group(2).split("\n")
        ]

        return (
            block.group(1)
            + "\n".join(lines)
            + block.group(3)
        )

    return re.sub(
        r"(<pre><code[^>]*>)(.*?)(</code></pre>)",
        mute,
        out,
        flags=re.DOTALL,
    )


def build_post(post, newer, older):
    tags = (
        f'\n      <span class="tags">'
        f'{html.escape(", ".join(post["tags"]))}'
        f'</span>'
        if post["tags"]
        else ""
    )

    body = (
        '\n  <article class="post entry">\n'
        f'    <h1>{html.escape(post["title"])}</h1>\n'
        '    <p class="post-meta">\n'
        f'      <time datetime="{post["date"]:%Y-%m-%d}">'
        f'{post["date"]:%B %d, %Y}</time>'
        f'{tags}\n'
        '    </p>\n\n'
        f'{render_body(post["body_md"])}\n'
        '  </article>\n'
    )

    old_link = (
        f'<a class="older" href="{older["slug"]}.html">'
        f'← {html.escape(older["title"])}</a>'
        if older
        else "<span></span>"
    )

    new_link = (
        f'<a class="newer" href="{newer["slug"]}.html">'
        f'{html.escape(newer["title"])} →</a>'
        if newer
        else "<span></span>"
    )

    nav = (
        '\n  <nav class="post-nav">\n'
        f'    {old_link}\n'
        f'    {new_link}\n'
        '  </nav>\n'
    )

    foot = page_foot(
        '<a href="index.html">Index</a>'
    )

    title = f'{post["title"]} · {SITE_NAME}'

    description = (
        post["description"]
        or post["title"]
    )

    post_url = absolute_url(
        f'{post["slug"]}.html'
    )

    jsonld = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post["title"],
        "description": description,
        "url": post_url,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": post_url,
        },
        "datePublished": (
            post["date"]
            .replace(tzinfo=timezone.utc)
            .isoformat()
        ),
        "dateModified": (
            post["date"]
            .replace(tzinfo=timezone.utc)
            .isoformat()
        ),
        "author": {
            "@type": "Person",
            "name": SITE_NAME,
            "url": SITE_URL,
        },
        "publisher": {
            "@type": "Person",
            "name": SITE_NAME,
        },
    }

    if post["tags"]:
        jsonld["keywords"] = post["tags"]

    head = page_head(
        title,
        description,
        f'{post["slug"]}.html',
        og_type="article",
        jsonld=jsonld,
    )

    return (
        head
        + page_header()
        + body
        + nav
        + foot
    )


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

    foot = page_foot(
        f'<a href="{base}index.html">Index</a>'
    )

    head = page_head(
        f"404 · {SITE_NAME}",
        "Nothing here.",
        "404.html",
        base=base,
        noindex=True,
    )

    return (
        head
        + page_header(base)
        + body
        + foot
    )


def build_index(posts):
    sections = []

    for year in sorted(
        {p["date"].year for p in posts},
        reverse=True,
    ):
        items = []

        for p in (
            q
            for q in posts
            if q["date"].year == year
        ):
            desc = (
                f'\n      <p class="post-desc">'
                f'{html.escape(p["description"])}</p>'
                if p["description"]
                else ""
            )

            items.append(
                '    <li>\n'
                '      <div class="post-line">\n'
                f'        <a href="{p["slug"]}.html">'
                f'{html.escape(p["title"])}</a>\n'
                f'        <time datetime="{p["date"]:%Y-%m-%d}">'
                f'{p["date"]:%b %d}</time>\n'
                '      </div>'
                f'{desc}\n'
                '    </li>'
            )

        sections.append(
            f'\n  <p class="year">{year}</p>\n'
            '  <ul class="posts">\n'
            + "\n".join(items)
            + "\n  </ul>\n"
        )

    motto = f'\n  <p class="motto">{MOTTO}</p>\n'
    intro = f'\n  <p class="intro">{INTRO}</p>\n'

    foot = page_foot(
        '<a href="feed.xml">RSS</a>'
    )

    jsonld = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": SITE_TITLE,
        "description": SITE_DESC,
        "url": SITE_URL,
        "author": {
            "@type": "Person",
            "name": SITE_NAME,
            "url": SITE_URL,
        },
    }

    head = page_head(
        SITE_TITLE,
        SITE_DESC,
        "",
        jsonld=jsonld,
    )

    return (
        head
        + page_header()
        + motto
        + intro
        + "".join(sections)
        + foot
    )


def build_feed(posts):
    items = []

    for p in posts:
        link = absolute_url(
            f"{p['slug']}.html"
        )

        pub = (
            p["date"]
            .replace(tzinfo=timezone.utc)
            .strftime(
                "%a, %d %b %Y 00:00:00 GMT"
            )
        )

        item = (
            "    <item>\n"
            f"      <title>{html.escape(p['title'])}</title>\n"
            f"      <link>{link}</link>\n"
            f"      <guid>{link}</guid>\n"
            f"      <pubDate>{pub}</pubDate>\n"
            f"      <description>"
            f"{html.escape(p['description'])}"
            f"</description>\n"
        )

        if p["tags"]:
            item += (
                f"      <category>"
                f"{html.escape(', '.join(p['tags']))}"
                f"</category>\n"
            )

        item += "    </item>"

        items.append(item)

    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<rss version="2.0">\n'
        '  <channel>\n'
        f'    <title>{html.escape(SITE_TITLE)}</title>\n'
        f'    <link>{SITE_URL}</link>\n'
        f'    <description>{html.escape(SITE_DESC)}</description>\n'
        f'    <language>en</language>\n'
        + "\n".join(items)
        + "\n  </channel>\n"
        "</rss>\n"
    )


def build_sitemap(posts):
    """Generate sitemap.xml automatically."""

    urls = [
        {
            "loc": absolute_url(""),
        },
        {
            "loc": absolute_url("about.html"),
        },
    ]

    for p in posts:
        urls.append(
            {
                "loc": absolute_url(
                    f"{p['slug']}.html"
                ),
                "lastmod": (
                    p["date"].strftime("%Y-%m-%d")
                ),
            }
        )

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    for url in urls:
        lines.append("  <url>")
        lines.append(
            f"    <loc>{html.escape(url['loc'])}</loc>"
        )

        if "lastmod" in url:
            lines.append(
                f"    <lastmod>{url['lastmod']}</lastmod>"
            )

        lines.append("  </url>")

    lines.append("</urlset>")
    lines.append("")

    return "\n".join(lines)


def build_robots():
    """Generate robots.txt."""

    return (
        "User-agent: *\n"
        "Allow: /\n"
        "\n"
        f"Sitemap: {SITE_URL}/sitemap.xml\n"
    )


def restamp_about_html():
    """about.html is hand-authored, but its CSS/JS links
    still need fresh cache-busting versions."""

    text = ABOUT_HTML_FILE.read_text(
        encoding="utf-8"
    )

    text = re.sub(
        r'href="style\.css(?:\?v=[a-f0-9]+)?"',
        f'href="style.css?v={CSS_VERSION}"',
        text,
    )

    text = re.sub(
        r'src="site\.js(?:\?v=[a-f0-9]+)?"',
        f'src="site.js?v={JS_VERSION}"',
        text,
    )

    ABOUT_HTML_FILE.write_text(
        text,
        encoding="utf-8",
    )


def main():
    posts = sorted(
        (
            parse_post(p)
            for p in POSTS_DIR.glob("*.md")
        ),
        key=lambda p: p["date"],
        reverse=True,
    )

    for i, post in enumerate(posts):
        newer = (
            posts[i - 1]
            if i > 0
            else None
        )

        older = (
            posts[i + 1]
            if i + 1 < len(posts)
            else None
        )

        (
            ROOT / f"{post['slug']}.html"
        ).write_text(
            build_post(
                post,
                newer,
                older,
            ),
            encoding="utf-8",
        )

    # Main pages
    (
        ROOT / "index.html"
    ).write_text(
        build_index(posts),
        encoding="utf-8",
    )

    (
        ROOT / "feed.xml"
    ).write_text(
        build_feed(posts),
        encoding="utf-8",
    )

    (
        ROOT / "sitemap.xml"
    ).write_text(
        build_sitemap(posts),
        encoding="utf-8",
    )

    (
        ROOT / "robots.txt"
    ).write_text(
        build_robots(),
        encoding="utf-8",
    )

    (
        ROOT / "404.html"
    ).write_text(
        build_404(),
        encoding="utf-8",
    )

    restamp_about_html()

    print(
        f"built {len(posts)} posts + "
        "index.html + feed.xml + "
        "sitemap.xml + robots.txt + 404.html"
    )


if __name__ == "__main__":
    main()
