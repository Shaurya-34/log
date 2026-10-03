import re
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).parents[1]
SHIPPED_JS = ["chrome.js", "design.js", "site.js", *[str(p.relative_to(ROOT)) for p in (ROOT / "partials").glob("*.js")]]


class ScriptTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        subprocess.run([sys.executable, "build.py"], cwd=ROOT, check=True, capture_output=True, text=True)
        cls.js = {name: (ROOT / name).read_text(encoding="utf-8") for name in SHIPPED_JS}

    def test_one_sound_engine(self):
        # every UI and widget sound goes through chrome.js's one AudioContext,
        # so the nav's mute control and the gesture rule cover all of them
        makers = {name: len(re.findall(r"new\s+(?:Ctx|AudioContext|webkitAudioContext)\s*\(", src))
                  for name, src in self.js.items()}
        self.assertEqual(makers["chrome.js"], 1, makers)
        self.assertEqual(sum(makers.values()), 1, makers)
        self.assertIn("window.tapeSound = function", self.js["chrome.js"])
        self.assertNotIn("siteSound", self.js["site.js"])
        self.assertGreaterEqual(self.js["site.js"].count("window.tapeSound("), 2)

    def test_no_gsap(self):
        # the pull-quote scrub and the mosaic stagger are CSS now
        for name, src in self.js.items():
            self.assertNotRegex(src, r"\bgsap\b|ScrollTrigger", name)
        for page in ROOT.glob("*.html"):
            html = page.read_text(encoding="utf-8")
            self.assertNotIn("gsap", html, page.name)
            self.assertNotIn("cdnjs.cloudflare.com", html, page.name)

    def test_css_motion_replaces_gsap(self):
        css = (ROOT / "design.css").read_text(encoding="utf-8")
        self.assertIn("animation-timeline: --pull", css)
        self.assertIn("@keyframes pull-in", css)
        self.assertIn(".motion-ok .mosaic.is-in .tile-post", css)
        self.assertIn('mosaic.classList.add("is-in")', self.js["design.js"])


if __name__ == "__main__":
    unittest.main()
