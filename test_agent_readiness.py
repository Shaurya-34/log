from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent


def read(name):
    return (ROOT / name).read_text(encoding="utf-8")


def test_homepage_has_semantic_heading_hierarchy():
    html = read("index.html")
    assert re.search(r"<h1\b[^>]*>Shaurya · Log</h1>", html)
    assert re.search(r"<h2\b[^>]*>Articles</h2>", html)
    assert len(re.sub(r"<[^>]+>", " ", html)) >= 500


def test_404_has_recovery_links():
    html = read("404.html")
    for path in ("/index.html", "/sitemap.xml", "/llms.txt", "/feed.xml"):
        assert path in html


def test_markdown_worker_sets_required_vary_headers():
    worker = read("cloudflare/markdown-worker.js")
    assert 'headers.set("Content-Type", "text/markdown; charset=utf-8")' in worker
    assert 'values.add("accept")' in worker
    assert 'values.add("accept-encoding")' in worker
    assert "status: 406" in worker
    assert "markdown404" in worker


def test_agent_machine_readable_files_exist():
    for name in ("llms.txt", "index.md", "sitemap.xml", "feed.xml"):
        assert (ROOT / name).is_file()
