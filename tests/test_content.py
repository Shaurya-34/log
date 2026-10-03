import re
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).parents[1]
POSTS = sorted((ROOT / "posts").glob("*.md"))
MAX_IMAGE_KB = 500
EM_DASH_OK = {"2026-08-18-where-does-computation-end.md"}  # kept on purpose


def slug(post):
    return re.sub(r"^\d{4}-\d{2}-\d{2}-", "", post.stem)


def local_refs(html):
    # src/href values that point at files in this repo
    for url in re.findall(r'(?:src|href)="([^"]+)"', html):
        if re.match(r"(https?:|mailto:|data:|javascript:|#|//)", url) or "{" in url:
            continue
        path = url.split("#")[0].split("?")[0].lstrip("/")
        if path:
            yield path


class ContentTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        subprocess.run([sys.executable, "build.py"], cwd=ROOT, check=True, capture_output=True, text=True)

    def assertNone(self, problems):
        if problems:
            self.fail("\n" + "\n".join(dict.fromkeys(problems)))

    def test_no_em_dashes_in_posts(self):
        problems = []
        for post in (p for p in POSTS if p.name not in EM_DASH_OK):
            # code blocks are exempt
            text = re.sub(r"```.*?```", "", post.read_text(encoding="utf-8"), flags=re.S)
            problems += [f"{post.name}: {line.strip()}" for line in text.splitlines() if "—" in line]
        self.assertNone(problems)

    def test_every_post_has_a_cover(self):
        self.assertNone([p.name for p in POSTS if not (ROOT / "images" / "covers" / f"{slug(p)}.svg").exists()])

    def test_local_links_and_images_resolve(self):
        problems = []
        for page in ROOT.glob("*.html"):
            problems += [f"{page.name}: {path}" for path in local_refs(page.read_text(encoding="utf-8"))
                         if not (ROOT / path).exists()]
        self.assertNone(problems)

    def test_post_images_are_small(self):
        problems = []
        for post in POSTS:
            html = (ROOT / f"{slug(post)}.html").read_text(encoding="utf-8")
            # <noscript> fallbacks are never downloaded when JS is on
            html = re.sub(r"<noscript>.*?</noscript>", "", html, flags=re.S)
            for path in local_refs(html):
                f = ROOT / path
                if f.suffix.lower() in (".png", ".jpg", ".jpeg", ".gif", ".webp") and f.exists():
                    kb = f.stat().st_size // 1024
                    if kb > MAX_IMAGE_KB:
                        problems.append(f"{post.name}: {path} is {kb} KB (max {MAX_IMAGE_KB})")
        self.assertNone(problems)


if __name__ == "__main__":
    unittest.main()
