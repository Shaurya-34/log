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
SITE_URL = "https://sslog.dpdns.org"
SITE_NAME = "Shaurya"
SITE_TITLE = "Shaurya · Log"
SITE_DESC = ("Experimental engineering notes on AI, machine learning, graphics, "
             "programming, computation, and the things I build to understand how they work.")
MOTTO = "honest · semi informative · personal"
INTRO = ("I think of this less as a blog and more as a log: a running record of what I'm "
         "building, reading, and puzzling over. If it's useful to anyone else, that's a bonus.")
FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E"
           "%3Crect width='64' height='64' fill='%23faf9f7'/%3E%3Ctext x='32' y='46' "
           "font-family='Courier%20New,monospace' font-size='44' text-anchor='middle' "
           "fill='%23161513'%3ES%3C/text%3E%3C/svg%3E")
FONTS = ('  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Courier+Prime:ital,wght@0,400;0,700&display=swap">')
CSS_VERSION = hashlib.md5((ROOT / "style.css").read_bytes()).hexdigest()[:8]
JS_VERSION = hashlib.md5((ROOT / "site.js").read_bytes()).hexdigest()[:8]
HOME_CSS_VERSION = hashlib.md5((ROOT / "home.css").read_bytes()).hexdigest()[:8]

COVER_DEFAULTS = {
    "where-does-computation-end": {"cover": "images/covers/where-does-computation-end.svg", "kicker": "A NOTE ON PHYSICAL SYSTEMS, MODELS, AND THE LIMITS OF EFFECTIVE DESCRIPTION.", "quote": "The map is not the territory.", "author": "N. Wiener"},
    "self-rewriting-mandelbrot": {"cover": "images/covers/self-rewriting-mandelbrot.svg", "kicker": "A SMALL EXPERIMENT IN SELF-MODIFICATION AND CODE THAT CHANGES ITS OWN RULES.", "quote": "A program can become part of its own memory.", "author": "sslog"},
    "never-repeating-never-leaving": {"cover": "images/covers/never-repeating-never-leaving.svg", "kicker": "ON STRANGE ATTRACTORS, DYNAMICAL SYSTEMS, AND STRUCTURES THAT NEVER SETTLE.", "quote": "Never repeating. Never leaving.", "author": "sslog"},
    "marching-with-rays": {"cover": "images/covers/marching-with-rays.svg", "kicker": "A VISUAL WALK THROUGH RAY MARCHING, DISTANCE FIELDS, AND GEOMETRY.", "quote": "The image is the end of a chain of questions.", "author": "sslog"},
    "grok-grok": {"cover": "images/covers/grok-grok.svg", "kicker": "WHAT HAPPENS WHEN A MODEL FINALLY FINDS THE RULE?", "quote": "The model looked done. Then it suddenly learned.", "author": "sslog"},
}


def absolute_url(path=""):
    return f"{SITE_URL}/" if not path else f"{SITE_URL}/{path.lstrip('/')}"


def jsonld_script(data):
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return f'  <script type="application/ld+json">{payload}</script>\n'


def path_date(path):
    m = re.search(r"\d{4}-\d{2}-\d{2}", path)
    return m.group(0) if m else ""


def page_head(title, desc, path, og_type="website", base="", jsonld=None, noindex=False, extra_css=None):
    robots = ('  <meta name="robots" content="noindex,follow">\n' if noindex
              else '  <meta name="robots" content="index,follow">\n')
    article_meta = (f'  <meta property="article:published_time" content="{html.escape(path_date(path))}">\n'
                    if og_type == "article" else "")
    head = (
        '<!doctype html>\n<html lang="en">\n<head>\n'
        '  <meta charset="utf-8">\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'  <title>{html.escape(title)}</title>\n'
        f'  <meta name="description" content="{html.escape(desc)}">\n{robots}'
        f'  <link rel="canonical" href="{html.escape(absolute_url(path))}">\n'
        f'  <meta property="og:site_name" content="{html.escape(SITE_TITLE)}">\n'
        f'  <meta property="og:title" content="{html.escape(title)}">\n'
        f'  <meta property="og:description" content="{html.escape(desc)}">\n'
        f'  <meta property="og:type" content="{og_type}">\n'
        f'  <meta property="og:url" content="{html.escape(absolute_url(path))}">\n'
        f'{article_meta}'
        f'  <link rel="alternate" type="application/rss+xml" title="{html.escape(SITE_TITLE)}" href="{base}feed.xml">\n'
        f'  <link rel="icon" href="{FAVICON}">\n{FONTS}\n'
        f'  <link rel="stylesheet" href="{base}style.css?v={CSS_VERSION}">\n'
        f'  <script src="{base}site.js?v={JS_VERSION}" defer></script>\n')
    if extra_css:
        head += f'  <link rel="stylesheet" href="{base}{extra_css}?v={HOME_CSS_VERSION}">\n'
    if jsonld:
        head += jsonld_script(jsonld)
    return head + '</head>\n<body>\n<div class="wrap">\n'


WORDMARK_HTML = '<span class="b-strike">B</span>LOG'


def page_header(base=""):
    return ('\n  <header class="site">\n'
            f'    <a class="wordmark" href="{base}index.html" aria-label="{SITE_NAME}">{WORDMARK_HTML}</a>\n'
            '    <nav>\n'
            f'      <a href="{base}about.html">About</a>\n'
            '      <button type="button" class="theme-toggle" aria-label="Toggle color theme">dark</button>\n'
            '    </nav>\n  </header>\n')


def page_foot(link_html):
    return (f'\n  <footer class="site">\n    <span>{SITE_NAME} · {datetime.now().year}</span>\n'
            f'    {link_html}\n  </footer>\n\n</div>\n</body>\n</html>\n')


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
    jsonld = {"@context":"https://schema.org","@type":"BlogPosting","headline":post["title"],
              "description":description,"url":post_url,"mainEntityOfPage":{"@type":"WebPage","@id":post_url},
              "datePublished":post["date"].replace(tzinfo=timezone.utc).isoformat(),
              "dateModified":post["date"].replace(tzinfo=timezone.utc).isoformat(),
              "author":{"@type":"Person","name":SITE_NAME,"url":SITE_URL},
              "publisher":{"@type":"Person","name":SITE_NAME}}
    if post["tags"]:
        jsonld["keywords"] = post["tags"]
    return (page_head(f'{post["title"]} · {SITE_NAME}', description, f'{post["slug"]}.html',
                      og_type="article", jsonld=jsonld) + page_header() + body + nav +
            page_foot('<a href="index.html">Index</a>'))


def cover_markup(post):
    image = (f'<img src="{html.escape(post["cover"])}" alt="" loading="lazy">'
             if post["cover"] else '<div class="cover-placeholder" aria-hidden="true"><span>SSLOG</span></div>')
    kicker = post["cover_kicker"] or ", ".join(post["tags"][:3]).upper()
    quote = post["cover_quote"]
    quote_html = (f'<div class="cover-quote"><p>{html.escape(quote)}</p>'
                  f'<small>— {html.escape(post["cover_quote_author"])}</small></div>'
                  if quote else '<div class="cover-quote"><p>NOTES FROM THE RABBIT HOLE.</p></div>')
    return (f'<div class="cover-image">{image}</div>\n'
            f'<div class="cover-kicker">{html.escape(kicker)}</div>\n{quote_html}')


def build_index(posts):
    tape_cells = []
    cards = []
    for i, p in enumerate(posts):
        code = format(i + 1, "03b")
        tape_cells.append(
            f'<button class="tape-cell{" is-active" if i == 0 else ""}" '
            f'data-index="{i}" aria-label="Open {html.escape(p["title"])}" '
            f'aria-current="{"true" if i == 0 else "false"}">'
            f'<span class="tape-code">{code}</span>'
            f'<span class="tape-box" aria-hidden="true"></span>'
            f'<span class="tape-title">{html.escape(p["title"])}</span>'
            f'<span class="tape-date">{p["date"]:%d %b %Y}</span>'
            f'</button>')
        card_class = 'feature-card is-active' if i == 0 else 'feature-card'
        tags = ', '.join(p["tags"][:4])
        cards.append(
            f'<article class="{card_class}" data-index="{i}" aria-hidden="{"false" if i == 0 else "true"}">'
            f'<a class="feature-head" href="{p["slug"]}.html"><span>ARTICLE NO. {i + 1:02d}</span><span>→</span></a>'
            f'<h1>{html.escape(p["title"])}</h1>'
            f'<div class="feature-grid">'
            f'<div class="feature-description">{html.escape(p["description"])}</div>'
            f'{cover_markup(p)}'
            f'<div class="feature-meta"><span>{p["date"]:%d %b %Y}<br>~ {p["read_time"]} min read</span>'
            f'<span>{html.escape(tags)}</span><span>∎</span></div>'
            f'</div></article>')
    jsonld = {"@context":"https://schema.org","@type":"Blog","name":SITE_TITLE,
              "description":SITE_DESC,"url":SITE_URL,"author":{"@type":"Person","name":SITE_NAME,"url":SITE_URL}}
    tape = (
        '<section class="article-orbit tape-nav" aria-label="Article navigation">'
        '<div class="tape-track" role="list">' + ''.join(tape_cells) + '</div>'
        '<button class="tape-arrow tape-prev" type="button" aria-label="Previous article">←</button>'
        '<button class="tape-arrow tape-next" type="button" aria-label="Next article">→</button>'
        '<div class="tape-note"><span>A head scans a tape. One cell at a time.<br>The machine moves. The log remains.</span></div>'
        '</section>')
    body = (page_header() + f'<p class="motto">{MOTTO}</p>\n'
            '<main class="home-stage">' + tape +
            '<section class="feature-stage" aria-live="polite">' + ''.join(cards) + '</section>'
            '</main>'
            f'<p class="intro home-intro">{INTRO}</p>')
    return (page_head(SITE_TITLE, SITE_DESC, "", jsonld=jsonld, extra_css="home.css") + body +
            page_foot('<a href="feed.xml">RSS</a>'))


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
    urls = [{"loc": absolute_url("")}, {"loc": absolute_url("about.html")}] + [
        {"loc": absolute_url(f'{p["slug"]}.html'), "lastmod": p["date"].strftime("%Y-%m-%d")}
        for p in posts]
    lines = ['<?xml version="1.0" encoding="UTF-8"', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    lines[0] += '?>'
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
            f'    <p>This page doesn\'t exist, or it moved. Everything that does exist is on <a href="{base}index.html">the index</a>.</p>\n  </article>\n')
    return page_head(f"404 · {SITE_NAME}", "Nothing here.", "404.html", base=base, noindex=True) + page_header(base) + body + page_foot(f'<a href="{base}index.html">Index</a>')


def restamp_about_html():
    text = ABOUT_HTML_FILE.read_text(encoding="utf-8")
    text = re.sub(r'href="style\.css(?:\?v=[a-f0-9]+)?"', f'href="style.css?v={CSS_VERSION}"', text)
    text = re.sub(r'src="site\.js(?:\?v=[a-f0-9]+)?"', f'src="site.js?v={JS_VERSION}"', text)
    ABOUT_HTML_FILE.write_text(text, encoding="utf-8")


def main():
    posts = sorted((parse_post(p) for p in POSTS_DIR.glob("*.md")), key=lambda p: p["date"], reverse=True)
    for i, post in enumerate(posts):
        newer = posts[i - 1] if i > 0 else None
        older = posts[i + 1] if i + 1 < len(posts) else None
        (ROOT / f'{post["slug"]}.html').write_text(build_post(post, newer, older), encoding="utf-8")
    (ROOT / "index.html").write_text(build_index(posts), encoding="utf-8")
    (ROOT / "feed.xml").write_text(build_feed(posts), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(build_sitemap(posts), encoding="utf-8")
    (ROOT / "robots.txt").write_text(build_robots(), encoding="utf-8")
    (ROOT / "404.html").write_text(build_404(), encoding="utf-8")
    restamp_about_html()
    print(f"built {len(posts)} posts + index.html + feed.xml + sitemap.xml + robots.txt + 404.html")


if __name__ == "__main__":
    main()
