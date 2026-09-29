/* Shared motion for every page: Lenis smooth scroll, the scrubbed pull
   quote, and the mosaic's staggered entrance. A post's scroll figure
   (partials/) runs after this and subscribes to the same instance on
   window.lenisInstance. */
(function () {
  "use strict";

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  if (typeof Lenis !== "undefined" && !reduced) {
    var lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    window.lenisInstance = lenis;

    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
    }
  }

  /* ---- index hero: reading along the log ----------------------- */
  var logData = document.getElementById("log-data");
  if (logData) {
    var entries = JSON.parse(logData.textContent);
    var box = document.getElementById("lh-entry");
    var scroller = document.querySelector(".lh-scroll");
    var entryCells = Array.prototype.slice.call(document.querySelectorAll(".cell.is-entry"));
    var field = function (k) { return box.querySelector('[data-f="' + k + '"]'); };
    var current = 0, swapTimer;

    var fill = function (i) {
      var e = entries[i];
      field("state").textContent = e.state;
      field("date").textContent = e.d;
      field("tag").textContent = e.tag;
      field("title").textContent = e.t;
      field("title").setAttribute("href", e.href);
      field("desc").textContent = e.desc;
      field("read").setAttribute("href", e.href);
    };

    var select = function (i) {
      if (i === current) return;
      current = i;
      entryCells.forEach(function (c) { c.classList.toggle("is-current", +c.dataset.i === i); });
      if (reduced) { fill(i); return; }
      box.classList.add("is-swapping");
      clearTimeout(swapTimer);
      swapTimer = setTimeout(function () { fill(current); box.classList.remove("is-swapping"); }, 140);
    };

    /* Reserve the tallest entry's height, so a two-line title and a
       four-line one leave the strip in the same place. */
    var reserve = function () {
      box.style.minHeight = "";
      var tallest = 0;
      entries.forEach(function (e, i) { fill(i); tallest = Math.max(tallest, box.offsetHeight); });
      fill(current);
      box.style.minHeight = tallest + "px";
    };
    reserve();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reserve);
    var reserveTimer;
    addEventListener("resize", function () { clearTimeout(reserveTimer); reserveTimer = setTimeout(reserve, 150); });

    entryCells.forEach(function (cell, k) {
      var i = +cell.dataset.i;
      cell.addEventListener("mouseenter", function () { select(i); });
      cell.addEventListener("focus", function () { select(i); });
      /* on touch there's no hover: the first tap shows the entry, the
         second opens it */
      cell.addEventListener("click", function (e) {
        if (i !== current) { e.preventDefault(); select(i); }
      });
      /* arrows step entry to entry, skipping the empty days */
      cell.addEventListener("keydown", function (e) {
        var to = e.key === "ArrowRight" ? k + 1 : e.key === "ArrowLeft" ? k - 1 : -1;
        if (to >= 0 && to < entryCells.length) { e.preventDefault(); entryCells[to].focus(); }
      });
    });

    /* open on today, the end the log is growing from */
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }

  /* archive topic filter: a row stays if it carries the topic; a year
     with nothing left disappears with it */
  var filters = document.querySelector(".filters");
  if (filters) {
    var buttons = Array.prototype.slice.call(filters.querySelectorAll("button"));
    var rows = Array.prototype.slice.call(document.querySelectorAll(".rows li"));
    var years = Array.prototype.slice.call(document.querySelectorAll(".archive .year"));
    var empty = document.querySelector(".archive-empty");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tag = btn.dataset.tag;
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        rows.forEach(function (li) {
          li.hidden = !!tag && li.dataset.tags.split("|").indexOf(tag) === -1;
        });
        var shown = 0;
        years.forEach(function (y) {
          var any = y.querySelector(".rows li:not([hidden])");
          y.hidden = !any;
          if (any) shown++;
        });
        if (empty) empty.hidden = shown > 0;
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
  }

  if (!hasGsap || reduced) return;

  if (document.getElementById("pullquote")) {
    gsap.fromTo("#pullquote",
      { scale: 0.86, opacity: 0, yPercent: 8 },
      {
        scale: 1, opacity: 1, yPercent: 0, ease: "none",
        scrollTrigger: { trigger: ".pull", start: "top 88%", end: "center 46%", scrub: 0.6 }
      }
    );
  }

  if (document.getElementById("mosaic")) {
    gsap.from("#mosaic .tile-post", {
      opacity: 0, yPercent: 12, scale: 0.985,
      duration: 0.7, ease: "power2.out", stagger: 0.09,
      scrollTrigger: { trigger: "#mosaic", start: "top 82%", once: true }
    });
  }
})();

/* ---- index hero: Conway's Life, seeded from the log ------------------
   A torus seeded with an R-pentomino (five cells that churn for a long
   time) on every day the strip marks as an entry. One ink; cells fade in
   as they're born and out as they die, so a step reads as motion rather
   than flicker. A click drops a glider in. Paused off-screen and in a
   hidden tab; a still frame under reduced motion. */
(function () {
  var box = document.getElementById("lh-live");
  if (!box) return;
  var canvas = box.querySelector("canvas"), ctx = canvas.getContext("2d");
  var read = box.querySelector(".lh-live-read");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CELL = 7, GAP = 2, P = CELL + GAP, STEP_MS = 190;
  var W = 0, H = 0, ink = "";
  var cols, rows, cur, prev, gen, seedTurn = 0, quiet = 0, history = [];
  var lastStep = 0;

  var cells = document.querySelectorAll(".lh-cells .cell");
  var days = cells.length || 1;
  var entryDays = Array.prototype.map.call(cells, function (c, i) {
    return c.classList.contains("is-entry") ? i : -1;
  }).filter(function (i) { return i >= 0; });
  var G = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];   /* glider */
  var RP = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];  /* R-pentomino */

  function idx(c, r) { return ((r + rows) % rows) * cols + ((c + cols) % cols); }

  function seed() {
    cur = new Uint8Array(cols * rows); prev = new Uint8Array(cols * rows);
    gen = 0; quiet = 0; history = [];
    var flip = seedTurn++ % 2 ? -1 : 1;
    entryDays.forEach(function (d, k) {
      var c = Math.floor((d + 0.5) / days * cols), r = Math.floor(rows / 2) + (k % 2 ? -3 : 2);
      RP.forEach(function (q) { cur[idx(c + q[0] * flip, r + q[1])] = 1; });
    });
  }

  function step() {
    var next = new Uint8Array(cols * rows), alive = 0, h = 0;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var n = 0;
      for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) if (dr || dc) n += cur[idx(c + dc, r + dr)];
      var i = r * cols + c;
      if (cur[i] ? n === 2 || n === 3 : n === 3) { next[i] = 1; alive++; h = (h * 31 + i) | 0; }
    }
    prev = cur; cur = next; gen++;
    /* stuck in a short cycle, emptied, or down to a lone drifting glider: start over */
    var key = alive + ":" + h;
    history.push(key); if (history.length > 40) history.shift();
    quiet = alive < 16 ? quiet + 1 : 0;
    if (!alive || quiet > 90 || history.filter(function (k) { return k === key; }).length > 6) seed();
    read.textContent = "Life · seeded from " + entryDays.length + " entry days · gen " + gen;
  }

  /* t runs 0..1 across a step: births fade in, deaths fade out */
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ink;
    var ox = (W - cols * P + GAP) / 2, oy = (H - rows * P + GAP) / 2;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var i = r * cols + c, a = cur[i] ? (prev[i] ? 1 : t) : (prev[i] ? 1 - t : 0);
      if (!a) continue;
      ctx.globalAlpha = a;
      ctx.fillRect(ox + c * P, oy + r * P, CELL, CELL);
    }
    ctx.globalAlpha = 1;
  }

  function layout() {
    var dpr = Math.min(devicePixelRatio || 1, 2), b = canvas.getBoundingClientRect();
    W = b.width; H = b.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.max(8, Math.floor((W + GAP) / P)); rows = Math.max(6, Math.floor((H + GAP) / P));
    seedTurn = 0; seed();
    prev = cur.slice();  /* the first frame shows the seed as it stands */
  }
  function paintInk() { ink = getComputedStyle(document.documentElement).getPropertyValue("--blue").trim(); }

  var visible = true, running = false;
  function frame(t) {
    if (!running) return;
    if (t - lastStep >= STEP_MS) { lastStep = t; step(); }
    draw(Math.min(1, (t - lastStep) / (STEP_MS * 0.8)));
    requestAnimationFrame(frame);
  }
  function update() {
    var go = visible && !document.hidden && !reduced;
    if (go && !running) { running = true; requestAnimationFrame(frame); }
    else if (!go) running = false;
  }

  paintInk(); layout(); draw(1);
  read.textContent = "Life · seeded from " + entryDays.length + " entry days · click to add a glider";
  requestAnimationFrame(function () { box.classList.add("is-ready"); });

  canvas.addEventListener("pointerdown", function (e) {
    var b = canvas.getBoundingClientRect();
    var ox = (W - cols * P + GAP) / 2, oy = (H - rows * P + GAP) / 2;
    var c = Math.floor((e.clientX - b.left - ox) / P), r = Math.floor((e.clientY - b.top - oy) / P);
    var fx = Math.random() < 0.5 ? -1 : 1, fy = Math.random() < 0.5 ? -1 : 1;
    G.forEach(function (g) { cur[idx(c + g[0] * fx, r + g[1] * fy)] = 1; });
    quiet = 0;
    if (reduced) { prev = cur.slice(); draw(1); }
  });

  new IntersectionObserver(function (es) { visible = es[0].isIntersecting; update(); }).observe(box);
  document.addEventListener("visibilitychange", update);
  var rt;
  addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { layout(); draw(1); }, 150); });
  var repaint = function () { paintInk(); draw(1); };
  new MutationObserver(repaint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", repaint);
  update();

})();

/* ---- index strip: swells toward the cursor, like the dock -----------
   Each cell's height follows a bell curve around the pointer; entry days
   rise higher than empty ones, so the posts stand out of the wave as you
   pass. Values ease toward their targets frame by frame instead of
   snapping to the pointer, and the loop stops once everything has
   settled. Fine pointers only; off under reduced motion. */
(function () {
  var strip = document.querySelector(".lh-cells");
  if (!strip || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var cells = Array.prototype.slice.call(strip.querySelectorAll(".cell"));
  var PEAK_ENTRY = 0.7, PEAK_DAY = 0.3;   /* extra height at the pointer: 30px -> 51px / 39px */
  var SIGMA = 46;                          /* px: about four cells either side */
  var TAU = 70;                            /* ms: how quickly a cell catches up */
  var centers = [], cur = cells.map(function () { return 0; });
  var peak = cells.map(function (c) { return c.classList.contains("is-entry") ? PEAK_ENTRY : PEAK_DAY; });
  var px = null, running = false, last = 0;

  function measure() {
    var left = strip.getBoundingClientRect().left;
    centers = cells.map(function (c) { var b = c.getBoundingClientRect(); return b.left - left + b.width / 2; });
  }

  function frame(t) {
    var dt = last ? Math.min(t - last, 50) : 16;
    last = t;
    var k = 1 - Math.exp(-dt / TAU), moving = false;
    for (var i = 0; i < cells.length; i++) {
      var d = px === null ? Infinity : centers[i] - px;
      var target = px === null ? 0 : peak[i] * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
      var v = cur[i] + (target - cur[i]) * k;
      if (Math.abs(target - v) < 0.002) v = target; else moving = true;
      if (v !== cur[i]) { cur[i] = v; cells[i].style.setProperty("--s", (1 + v).toFixed(3)); }
    }
    if (moving || px !== null) requestAnimationFrame(frame);
    else { running = false; last = 0; }
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }

  strip.addEventListener("pointerenter", function (e) {
    if (e.pointerType === "touch") return;
    measure();
  });
  strip.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    px = e.clientX - strip.getBoundingClientRect().left;
    kick();
  });
  strip.addEventListener("pointerleave", function () { px = null; kick(); });
  addEventListener("resize", measure);
  measure();
})();

/* ---- headings in motion, and widget hints ----------------------------
   A post's title rises in on a fresh load (chrome.js decides that in
   <head>); section headings arrive as they scroll in; untouched widgets
   show once what they do. */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- a post's title rises in, line by line ---------------------------
     Words are measured into their lines, each line slides up out of a
     clip, then the original markup goes back so nothing is left wrapped. */
  var h1 = document.querySelector(".hero:has(.byline) h1");
  if (h1 && doc.classList.contains("title-rise")) {
    var original = h1.innerHTML;
    var esc = function (s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); };
    var words = h1.textContent.trim().split(/\s+/);
    h1.innerHTML = words.map(function (w) { return '<span class="tr-w">' + esc(w) + "</span>"; }).join(" ");
    var lines = [];
    Array.prototype.forEach.call(h1.querySelectorAll(".tr-w"), function (s) {
      var top = s.offsetTop, last = lines[lines.length - 1];
      if (!last || Math.abs(last.top - top) > 2) lines.push(last = { top: top, words: [] });
      last.words.push(s.textContent);
    });
    h1.innerHTML = lines.map(function (l, i) {
      return '<span class="tr-line"><span class="tr-in" style="animation-delay:' + i * 80 + 'ms">' +
             l.words.map(esc).join(" ") + "</span></span>";
    }).join("");
    var hero = h1.closest(".hero");
    hero.style.setProperty("--after", (lines.length - 1) * 80 + 280 + "ms");
    hero.classList.add("hero-rise");
    doc.classList.remove("title-rise");
    /* put the plain heading back when the last line lands, or after the
       time it should have taken, whichever comes first (animationend never
       arrives in a tab that was hidden throughout) */
    var restore = function () { if (h1.querySelector(".tr-line")) h1.innerHTML = original; };
    h1.querySelector(".tr-line:last-child .tr-in").addEventListener("animationend", restore);
    setTimeout(restore, (lines.length - 1) * 80 + 1200);
  }

  /* ---- section headings arrive as they scroll in ---------------------- */
  if (doc.classList.contains("motion-ok") && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll(".prose h2, .scrolly-head h2").forEach(function (h) { io.observe(h); });
  } else {
    document.querySelectorAll(".prose h2, .scrolly-head h2").forEach(function (h) { h.classList.add("is-in"); });
  }

  /* ---- widget hints ------------------------------------------------------
     The first time an untouched widget is well in view, it shows what it
     does once, with its own controls: a slider glides a fifth of its range
     and back (the figure answers every step), or a switch flips to the
     next option and back. Anything the reader does stops it at once.
     Widgets that already move by themselves get nothing. */
  var HINTS = { "grok-demo": "range", "birthday-demo": "range", "blocksize-demo": "range",
                "ray-demo": "switch", "birthday-scale-demo": "switch" };
  var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  function glide(fig, input, state) {
    var min = +input.min, max = +input.max, v0 = +input.value, step = +input.step || 1;
    var d = (max - min) * 0.2 * (max - v0 >= v0 - min ? 1 : -1);
    var T = 2000, t0 = performance.now(), lastV = v0;
    function set(v) {
      v = Math.round(v / step) * step;
      if (v === lastV) return;
      lastV = v; input.value = v;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    (function frame(now) {
      if (state.touched) return;
      var t = (now - t0) / T;
      /* out 45%, hold 15%, back 40% */
      var s = t < 0.45 ? ease(t / 0.45) : t < 0.6 ? 1 : t < 1 ? 1 - ease((t - 0.6) / 0.4) : 0;
      set(v0 + d * s);
      if (t < 1) requestAnimationFrame(frame);
      else input.dispatchEvent(new Event("change", { bubbles: true }));
    })(t0);
  }

  function flip(fig, state) {
    var group = fig.querySelector('[aria-pressed="true"]');
    if (!group) return;
    var buttons = Array.prototype.slice.call(group.parentNode.querySelectorAll("button[aria-pressed]"));
    var home = group, other = buttons[(buttons.indexOf(home) + 1) % buttons.length];
    other.click();
    setTimeout(function () { if (!state.touched) home.click(); }, 1200);
  }

  if (!reduced && "IntersectionObserver" in window) {
    Object.keys(HINTS).forEach(function (id) {
      var fig = document.getElementById(id);
      if (!fig) return;
      var state = { touched: false, done: false }, timer;
      var touch = function () { state.touched = true; };
      ["pointerdown", "keydown", "wheel"].forEach(function (ev) { fig.addEventListener(ev, touch, { passive: true }); });
      var seen = new IntersectionObserver(function (es) {
        var e = es[0];
        clearTimeout(timer);
        if (!e.isIntersecting || state.done || state.touched) return;
        timer = setTimeout(function () {
          if (state.touched || !fig.classList.contains("is-ready")) return;
          state.done = true; seen.disconnect();
          var input = fig.querySelector('input[type="range"]');
          if (HINTS[id] === "range" && input) glide(fig, input, state); else flip(fig, state);
        }, 600);
      }, { threshold: 0.6 });
      seen.observe(fig);
    });
  }
})();
