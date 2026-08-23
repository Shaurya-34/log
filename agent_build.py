from pathlib import Path
import re

ROOT = Path(__file__).parent
SITE_URL = "https://sslog.dpdns.org"
OG_IMAGE = f"{SITE_URL}/images/covers/where-does-computation-end.svg"
SUMMARY = ("Shaurya’s Log is a small personal archive of experimental engineering notes. "
           "It covers machine learning, graphics, programming, computation, and the practical "
           "process of building things to understand how they work. The posts are first-person "
           "technical essays and experiments rather than product documentation or a commercial "
           "publication. Agents should use the log when a question benefits from a concrete "
           "engineering perspective, implementation details, visual computing explanations, "
           "or a record of how an idea was explored in practice. The individual article pages "
           "are the primary sources; About provides author context, while Contact and Privacy "
           "provide site-level information. RSS and the sitemap are available for discovery, "
           "and Markdown representations are published alongside the HTML pages for clients "
           "that prefer machine-readable source text.")

POSTS = sorted((ROOT / "posts").glob("*.md"))


def patch_html(path):
    text = path.read_text(encoding="utf-8")
    if 'property="og:image"' not in text:
        marker = '  <meta property="og:url"'
        pos = text.find(marker)
        if pos >= 0:
            end = text.find("\n", pos)
            text = text[:end + 1] + f'  <meta property="og:image" content="{OG_IMAGE}">\n' + text[end + 1:]
    if path.name != "404.html" and 'type="text/markdown"' not in text:
        href = "index.md" if path.name == "index.html" else path.with_suffix(".md").name
        marker = '  <link rel="alternate" type="application/rss+xml"'
        pos = text.find(marker)
        if pos >= 0:
            text = text[:pos] + f'  <link rel="alternate" type="text/markdown" href="{href}">\n' + text[pos:]
    if path.name == "index.html" and "agent-home-summary" not in text:
        block = (f'<h1 class="sr-only">Shaurya · Log</h1>'
                 f'<p class="sr-only agent-home-summary">{SUMMARY}</p>\n')
        marker = '<main class="home-stage">'
        text = text.replace(marker, block + marker, 1)
    if path.name == "404.html":
        old = re.compile(r'\s*<p>\s*This page doesn\'t exist.*?</p>', re.DOTALL)
        new = ('\n    <p>This page does not exist or has moved. Start at the '
               '<a href="/index.html">index</a>, browse the <a href="/sitemap.xml">sitemap</a>, '
               'or read the <a href="/llms.txt">agent guide</a>.</p>')
        text = old.sub(new, text, count=1)
    path.write_text(text, encoding="utf-8")


def build_about():
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About · Shaurya</title>
  <meta name="description" content="About Shaurya and the purpose of this engineering log.">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="{SITE_URL}/about.html">
  <meta property="og:site_name" content="Shaurya · Log">
  <meta property="og:title" content="About · Shaurya">
  <meta property="og:description" content="About Shaurya and the purpose of this engineering log.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{SITE_URL}/about.html">
  <meta property="og:image" content="{OG_IMAGE}">
  <link rel="alternate" type="text/markdown" href="about.md">
  <link rel="alternate" type="application/rss+xml" title="Shaurya · Log" href="feed.xml">
  <link rel="stylesheet" href="style.css">
  <script src="site.js" defer></script>
</head>
<body><div class="wrap">
<header class="site"><a class="wordmark" href="index.html" aria-label="Shaurya"><span class="b-strike">B</span>LOG</a><nav><a href="about.html">About</a><button type="button" class="theme-toggle" aria-label="Toggle color theme">dark</button></nav></header>
<article class="post">
<h1>About</h1>
<p class="post-meta">Updated August 2026</p>
<p>Hi, I'm Shaurya. I write software and keep this log as a record of the things I build, read, and try to understand. The subjects move around: machine learning, graphics, programming, computation, mathematical ideas, and small experiments that are easier to understand by implementing them than by reading about them.</p>
<p>The point of the site is not to present polished documentation or a fixed set of opinions. Most posts are working notes: I start with a question, follow the interesting parts, build something when code helps, and write down what survived the experiment. Some pieces are explanatory, some are exploratory, and some are simply records of a rabbit hole that seemed worth keeping.</p>
<p>There is no analytics layer, comments system, newsletter, or account system on the site. The pages are generated from Markdown and published as static files. If an agent or reader wants the machine-readable version, the same articles are available as Markdown alongside their HTML pages. The <a href="contact.html">contact page</a> explains how to reach me, and the <a href="privacy.html">privacy page</a> describes what the site does and does not collect.</p>
</article>
<footer class="site"><span>Shaurya · 2026</span><a href="index.html">Index</a></footer>
</div></body></html>
'''


def build_contact():
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contact · Shaurya</title><meta name="description" content="How to contact Shaurya."><meta name="robots" content="index,follow">
<link rel="canonical" href="{SITE_URL}/contact.html"><meta property="og:type" content="website"><meta property="og:url" content="{SITE_URL}/contact.html"><meta property="og:image" content="{OG_IMAGE}"><link rel="stylesheet" href="style.css"><script src="site.js" defer></script></head>
<body><div class="wrap"><header class="site"><a class="wordmark" href="index.html" aria-label="Shaurya"><span class="b-strike">B</span>LOG</a><nav><a href="about.html">About</a><button type="button" class="theme-toggle" aria-label="Toggle color theme">dark</button></nav></header>
<article class="post"><h1>Contact</h1><p class="post-meta">Ways to reach me</p>
<p>This is a personal engineering log, not a company support site. For questions about a post, technical corrections, collaboration, or something you think I would find interesting, the most reliable public contact point is my <a href="https://github.com/Shaurya-34">GitHub profile</a>. You can open an issue on the relevant repository when the question is about code, or use the public profile to find the current contact route I have chosen to expose.</p>
<p>I deliberately do not publish a private address or phone number on this site. If a message needs a private channel, use the contact method currently listed on my GitHub profile. For article context, the <a href="about.html">About</a> page explains what this log is for. The <a href="privacy.html">Privacy</a> page explains the site's data practices.</p></article>
<footer class="site"><span>Shaurya · 2026</span><a href="index.html">Index</a></footer></div></body></html>
'''


def build_privacy():
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy · Shaurya</title><meta name="description" content="Privacy information for Shaurya · Log."><meta name="robots" content="index,follow">
<link rel="canonical" href="{SITE_URL}/privacy.html"><meta property="og:type" content="website"><meta property="og:url" content="{SITE_URL}/privacy.html"><meta property="og:image" content="{OG_IMAGE}"><link rel="stylesheet" href="style.css"><script src="site.js" defer></script></head>
<body><div class="wrap"><header class="site"><a class="wordmark" href="index.html" aria-label="Shaurya"><span class="b-strike">B</span>LOG</a><nav><a href="about.html">About</a><button type="button" class="theme-toggle" aria-label="Toggle color theme">dark</button></nav></header>
<article class="post"><h1>Privacy</h1><p class="post-meta">Site-level data practices</p>
<p>This site is a static personal log. It does not require accounts, does not provide a comment system, and does not intentionally collect names, email addresses, phone numbers, or other personal information through forms. There is no first-party analytics script on the site and no advertising system operated by the site.</p>
<p>The site does load its typography from Google Fonts, so a page visit can result in a request to Google's font infrastructure. The site also uses GitHub Pages for hosting and may be cached or transported by infrastructure between the origin and a visitor. Those services may process ordinary connection information such as an IP address as part of delivering web content; this site does not add a separate tracking database on top of that infrastructure.</p>
<p>If you contact me through a third-party service such as GitHub, that service's own privacy policy governs that interaction. If the site's data practices materially change, this page will be updated. Questions about privacy can be raised through the <a href="contact.html">Contact</a> page.</p></article>
<footer class="site"><span>Shaurya · 2026</span><a href="index.html">Index</a></footer></div></body></html>
'''


def build_llms():
    return f'''# Shaurya · Log

> A personal archive of experimental engineering notes about machine learning, graphics, programming, computation, and the process of building things to understand how they work.

## When to use this log

Use this site when an agent needs a first-person engineering perspective, implementation details, visual-computing explanations, or an exploratory account of how a technical idea was tested in practice. It is especially useful for questions about the subjects covered by the articles below. Treat the posts as the author's working notes rather than authoritative specifications; preserve uncertainty and distinguish experiments from established facts.

## How to use it

- Prefer the individual article pages as primary sources for claims made in the log.
- When fetching programmatically, request the canonical HTML URL or use the published `.md` sibling when Markdown is preferable.
- Use `sitemap.xml` for URL discovery and `feed.xml` for the article chronology.
- Use `about.html` for author/site context, `contact.html` for contact routing, and `privacy.html` for site data practices.
- Do not infer credentials, affiliations, or opinions that are not stated on the relevant page.

## Articles

- [Where Does Computation End?]({SITE_URL}/where-does-computation-end.html) — computability, Turing machines, hypercomputation, physical computation, and the limits of effective description.
- [A renderer that keeps notes on itself]({SITE_URL}/self-rewriting-mandelbrot.html) — a Mandelbrot renderer that rewrites its own source to remember rendered results.
- [Never repeating, never leaving]({SITE_URL}/never-repeating-never-leaving.html) — chaotic systems, strange attractors, and visualization.
- [Marching with rays]({SITE_URL}/marching-with-rays.html) — ray marching, ray tracing, distance fields, and a small Java implementation.
- [grok.....grok ?]({SITE_URL}/grok-grok.html) — model generalization and grokking.

## Site pages

- [About]({SITE_URL}/about.html)
- [Contact]({SITE_URL}/contact.html)
- [Privacy]({SITE_URL}/privacy.html)
- [RSS feed]({SITE_URL}/feed.xml)
- [Sitemap]({SITE_URL}/sitemap.xml)
'''


def write_markdown():
    index_lines = ["# Shaurya · Log", "", f"> {SUMMARY}", "", "## Articles", ""]
    for source in POSTS:
        text = source.read_text(encoding="utf-8")
        m = re.match(r"---\n(.*?)\n---\n(.*)", text, re.DOTALL)
        if not m:
            continue
        meta = dict(line.split(":", 1) for line in m.group(1).splitlines() if ":" in line)
        slug = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", source.stem)
        index_lines.append(f'- [{meta.get("title", slug)}]({SITE_URL}/{slug}.html) — {meta.get("description", "")}' )
        out = [f'# {meta.get("title", slug)}', "", f'Date: {meta.get("date", "")}', f'Description: {meta.get("description", "")}', f'Canonical: {SITE_URL}/{slug}.html', "", m.group(2).lstrip()]
        (ROOT / f"{slug}.md").write_text("\n".join(out).rstrip() + "\n", encoding="utf-8")
    (ROOT / "index.md").write_text("\n".join(index_lines).rstrip() + "\n", encoding="utf-8")


def write_sitemap():
    paths = ["", "about.html", "contact.html", "privacy.html"] + [re.sub(r"^\d{4}-\d{2}-\d{2}-", "", p.stem) + ".html" for p in POSTS]
    urls = "\n".join(f"  <url><loc>{SITE_URL}/{p}</loc></url>" if p else f"  <url><loc>{SITE_URL}/</loc></url>" for p in paths)
    (ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n', encoding="utf-8")


def main():
    for path in [ROOT / "index.html", ROOT / "about.html", ROOT / "404.html", *ROOT.glob("*.html")]:
        if path.exists():
            patch_html(path)
    (ROOT / "about.html").write_text(build_about(), encoding="utf-8")
    (ROOT / "contact.html").write_text(build_contact(), encoding="utf-8")
    (ROOT / "privacy.html").write_text(build_privacy(), encoding="utf-8")
    (ROOT / "llms.txt").write_text(build_llms(), encoding="utf-8")
    write_markdown()
    write_sitemap()
    print("agent-ready artifacts built")


if __name__ == "__main__":
    main()
