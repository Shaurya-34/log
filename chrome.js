/* Page chrome shared by every page in the new design, loaded in <head>
   without defer so the saved theme is on <html> before first paint.

   The theme preference uses the live site's own key ("theme"), so a
   choice made on either design carries over to the other. The toggle
   and share button use their own classes (.mode-toggle, .share) so
   site.js, which also runs on post pages, never double-binds them. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var darkQuery = matchMedia("(prefers-color-scheme: dark)");

  try {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") doc.setAttribute("data-theme", saved);
  } catch (e) {}


  function mode() {
    return doc.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light");
  }

  /* site.js's canvas widgets read their colours when they (re)draw, not
     when the theme changes, so give each one the nudge it already
     answers to. The 3D viewer and every CSS-styled widget need nothing. */
  function repaintWidgets() {
    var ray = document.querySelector('.ray-switch button[aria-pressed="true"]');
    if (ray) ray.click();                         /* re-renders the scene */
    var chaos = document.querySelector(".chaos-restart");
    if (chaos) chaos.click();                     /* restarts in the new ink */
    /* these two re-read their inks from a ResizeObserver, so a 1px nudge
       repaints them */
    ["birthday-demo", "blocksize-demo"].forEach(function (id) {
      var fig = document.getElementById(id);
      if (!fig) return;
      fig.style.paddingRight = "1px";
      requestAnimationFrame(function () { fig.style.paddingRight = ""; });
    });
    document.dispatchEvent(new CustomEvent("themechange"));
  }

  /* ---- sound -----------------------------------------------------
     A chunky menu click when a tile, an archive row or a topic filter is
     pressed, and a faint tick as the pointer moves onto one. Synthesised
     here, a pitched blip falling fast over a crack of noise, rather than
     sampled. On unless muted; the choice lives in site.js's "tape-sound"
     key, so the one control silences the post widgets too. Browsers only
     allow audio after a gesture, so the hover tick starts once the
     visitor has clicked or pressed a key. */
  var SOUND_TARGETS = ".tile-post, .rows a, .filters button";
  var audio = null, crack = null, lastTick = 0;

  function soundOn() {
    try { return localStorage.getItem("tape-sound") !== "off"; } catch (e) { return true; }
  }

  function engine() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audio) {
      audio = new Ctx();
      crack = audio.createBuffer(1, Math.floor(audio.sampleRate * 0.04), audio.sampleRate);
      var d = crack.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    return audio;
  }

  function envelope(node, t, peak, dur) {
    var g = audio.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    node.connect(g);
    g.connect(audio.destination);
  }

  function noiseBurst(t, freq, q, peak, dur) {
    var src = audio.createBufferSource(), band = audio.createBiquadFilter();
    src.buffer = crack;
    band.type = "bandpass";
    band.frequency.value = freq;
    band.Q.value = q;
    src.connect(band);
    envelope(band, t, peak, dur);
    src.start(t);
    src.stop(t + dur + 0.01);
  }

  function press() {
    if (!soundOn() || !engine()) return;
    var play = function () {
      var t = audio.currentTime;
      var osc = audio.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1300, t);
      osc.frequency.exponentialRampToValueAtTime(560, t + 0.045);
      envelope(osc, t, 0.22, 0.07);
      osc.start(t);
      osc.stop(t + 0.08);
      noiseBurst(t, 2600, 1.1, 0.14, 0.022);
    };
    /* the first press of a visit is also what starts the engine, and
       sound scheduled before it is running is dropped */
    if (audio.state === "running") play();
    else audio.resume().then(play, play);
  }

  function hover() {
    /* never the thing that starts the engine: that needs a gesture */
    if (!soundOn() || !audio || audio.state !== "running") return;
    var now = performance.now();
    if (now - lastTick < 45) return;  /* skimming the archive patters, not buzzes */
    lastTick = now;
    noiseBurst(audio.currentTime, 3400, 1.8, 0.035, 0.018);
  }

  var wake = function () {
    if (soundOn() && engine() && audio.state === "suspended") audio.resume();
  };
  addEventListener("pointerdown", wake, true);
  addEventListener("keydown", wake, true);

  document.addEventListener("pointerover", function (e) {
    if (e.pointerType === "touch" || !e.target.closest) return;
    var el = e.target.closest(SOUND_TARGETS);
    if (el && !(e.relatedTarget && el.contains(e.relatedTarget))) hover();
  });

  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest(SOUND_TARGETS);
    if (!el) return;
    press();
    /* let the click be heard before the page changes: a plain click on a
       same-tab link waits a beat, anything else behaves as usual */
    if (!soundOn() || e.defaultPrevented || el.tagName !== "A" || e.button !== 0 ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || el.target === "_blank" ||
        (el.getAttribute("href") || "").charAt(0) === "#") return;
    e.preventDefault();
    var to = el.href;
    setTimeout(function () { location.href = to; }, 90);
  });

  document.addEventListener("DOMContentLoaded", function () {
    var mute = document.querySelector(".mute-toggle");
    if (mute && (window.AudioContext || window.webkitAudioContext)) {
      var paintMute = function () {
        var on = soundOn();
        mute.textContent = on ? "mute" : "sound";
        mute.setAttribute("aria-pressed", on ? "false" : "true");
        mute.setAttribute("aria-label", on ? "Mute sound" : "Turn sound on");
      };
      mute.hidden = false;
      mute.addEventListener("click", function () {
        try { localStorage.setItem("tape-sound", soundOn() ? "off" : "on"); } catch (e) {}
        paintMute();
        press();  /* turning sound on answers with the click itself */
      });
      paintMute();
    }

    var toggle = document.querySelector(".mode-toggle");

    function paint() {
      if (!toggle) return;
      var next = mode() === "dark" ? "light" : "dark";
      toggle.textContent = next;
      toggle.setAttribute("aria-label", "Switch to " + next + " theme");
    }

    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener("click", function () {
        var next = mode() === "dark" ? "light" : "dark";
        doc.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        paint();
        repaintWidgets();
      });
      paint();
    }

    darkQuery.addEventListener("change", function () {
      if (doc.getAttribute("data-theme")) return;   /* an explicit choice wins */
      paint();
      repaintWidgets();
    });

    /* Share: the native sheet where there is one, otherwise the link to
       the clipboard. Shares the live URL, not this preview's. */
    var share = document.querySelector(".share");
    if (share) {
      share.addEventListener("click", function () {
        var url = share.getAttribute("data-url") || location.href;
        if (navigator.share) {
          navigator.share({ title: document.title, url: url }).catch(function () {});
          return;
        }
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(url).then(function () {
          var label = share.textContent;
          share.textContent = "Copied";
          setTimeout(function () { share.textContent = label; }, 1500);
        }, function () {});
      });
    }
  });
})();
