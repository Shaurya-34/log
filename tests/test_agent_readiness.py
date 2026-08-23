import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).parents[1]


class AgentReadinessTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        subprocess.run([sys.executable, "build.py"], cwd=ROOT, check=True, capture_output=True, text=True)
        subprocess.run([sys.executable, "agent_build.py"], cwd=ROOT, check=True, capture_output=True, text=True)

    def test_homepage_has_h1_and_meaningful_raw_text(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertRegex(html, r"<h1\b")
        self.assertGreater(len(__import__("re").sub(r"<[^>]+>", " ", html)), 500)
        self.assertIn('property="og:image"', html)
        self.assertIn('type="text/markdown"', html)

    def test_trust_pages_are_substantial(self):
        for name in ("about.html", "contact.html", "privacy.html"):
            html = (ROOT / name).read_text(encoding="utf-8")
            self.assertRegex(html, r"<h1\b")
            self.assertGreater(len(__import__("re").sub(r"<[^>]+>", " ", html)), 500)

    def test_agent_files_exist(self):
        for name in ("llms.txt", "index.md", "sitemap.xml", "robots.txt"):
            self.assertTrue((ROOT / name).exists(), name)
        self.assertIn("When to use this log", (ROOT / "llms.txt").read_text(encoding="utf-8"))

    def test_404_has_recovery_links(self):
        html = (ROOT / "404.html").read_text(encoding="utf-8")
        self.assertIn("sitemap.xml", html)
        self.assertIn("llms.txt", html)
        self.assertIn("index.html", html)


if __name__ == "__main__":
    unittest.main()
