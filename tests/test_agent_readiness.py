from pathlib import Path

ROOT = Path(__file__).parents[1]


def read(name):
    return (ROOT / name).read_text(encoding="utf-8")


def test_homepage_has_h1_and_agent_summary():
    html = read("index.html")
    assert "<h1" in html
    assert len(" ".join(html.split())) > 500
    assert 'property="og:image"' in html
    assert 'rel="canonical"' in html
    assert 'rel="alternate" type="text/markdown"' in html


def test_agent_guidance_exists():
    text = read("llms.txt")
    assert "## When to use this log" in text
    assert "sitemap.xml" in text


def test_trust_pages_exist():
    for name in ("about.html", "contact.html", "privacy.html"):
        assert len(" ".join(read(name).split())) >= 500


def test_markdown_representations_exist():
    for name in ("index.md", "about.md", "contact.md", "privacy.md"):
        assert (ROOT / name).exists()
