(function () {
  "use strict";

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     1. Build the tile grid
     ============================================================ */

  var ROWS = 4, COLS = 4, T = 60, GAP = 8, X0 = 110, Y0 = 70;
  var grid = document.getElementById("grid");
  var tiles = [];

  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "tile");
      g.dataset.r = r;
      g.dataset.c = c;

      var x = X0 + c * (T + GAP), y = Y0 + r * (T + GAP);

      var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("class", "cell");
      rect.setAttribute("x", x); rect.setAttribute("y", y);
      rect.setAttribute("width", T); rect.setAttribute("height", T);

      var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("class", "cellText");
      t.setAttribute("x", x + T / 2); t.setAttribute("y", y + T / 2 + 3);
      t.setAttribute("text-anchor", "middle");
      t.textContent = "S" + (r + 1) + (c + 1);

      g.appendChild(rect); g.appendChild(t);
      grid.appendChild(g);
      tiles.push(g);
    }
  }

  /* setTiles(fn) — fn(r, c) returns a state string. This is the whole
     contract between the scroll logic and the drawing. */
  function setTiles(fn) {
    tiles.forEach(function (g) {
      var r = +g.dataset.r, c = +g.dataset.c;
      g.setAttribute("class", "tile " + (fn(r, c) || ""));
    });
  }

  /* ============================================================
     2. Step definitions
     ============================================================ */

  var panel     = document.getElementById("panel");
  var caption   = document.getElementById("caption");
  var stateEl   = document.getElementById("panelState");
  var roM       = document.getElementById("roM");
  var roL       = document.getElementById("roL");
  var roT       = document.getElementById("roT");
  var traffic   = document.getElementById("trafficBar");
  var trafficOver = document.getElementById("trafficOver");

  /* One example row of attention scores for query block Q1 against 16
     keys, four per key block. The running values below are real online
     softmax over these numbers, not decoration: the max jumps in blocks
     K2 and K4, so those are the blocks that force a rescale. */
  var SCORES = [
    [1.2, 0.4, 2.1, -0.3],
    [0.8, 3.0, 1.1, 0.2],
    [-0.5, 1.7, 0.9, 2.4],
    [3.6, 0.1, 1.3, 2.8]
  ];

  /* the one-shot answer Kernel 4 computes with everything in SRAM */
  function oneShot() {
    var all = [].concat.apply([], SCORES);
    var m = Math.max.apply(null, all), l = 0;
    all.forEach(function (s) { l += Math.exp(s - m); });
    return { m: m, l: l };
  }

  /* online softmax through key blocks 0..k: when a block raises the max,
     the sum so far is rescaled by exp(old max - new max) */
  function online(k) {
    var m = -Infinity, l = 0, prev = -Infinity;
    for (var i = 0; i <= k; i++) {
      prev = m;
      var mNew = Math.max(m, Math.max.apply(null, SCORES[i]));
      l = l * Math.exp(m - mNew);
      SCORES[i].forEach(function (s) { l += Math.exp(s - mNew); });
      m = mNew;
    }
    return { m: m, l: l, prev: prev };
  }

  var SWEEP = 3; /* the step that follows scroll continuously */

  var STEPS = {
    1: function () {
      var r = oneShot();
      setTiles(function (row) { return row === 0 ? "is-active" : ""; });
      caption.innerHTML = "Kernel 4, one program: query block <b>Q₁</b> against every key block at once. All of K and V is live in SRAM together.";
      set(roM, r.m.toFixed(3)); set(roL, r.l.toFixed(3)); set(roT, "4 / 4");
      bar(0.5);
    },
    2: function () {
      setTiles(function (row, c) {
        if (row !== 0) return "";
        return c === 0 ? "is-active" : "is-ghost";
      });
      caption.innerHTML = "The box is what fits. Kernel 4 still needs all four key blocks at once, and they grow with the sequence: double the length and the need runs past the limit.";
      set(roM, "—"); set(roL, "—"); set(roT, "4 / 4");
      bar(1);
    },
    /* continuous: p is progress through the step, 0 to 1 */
    3: function (p) {
      var k = Math.min(COLS - 1, Math.floor(p * COLS));
      setTiles(function (row, c) {
        if (row !== 0) return "";
        if (c < k) return "is-done";
        if (c === k) return "is-active";
        return "is-queued";
      });

      var r = online(k);
      if (k > 0 && r.m > r.prev) {
        caption.innerHTML = "Block <b>K" + (k + 1) + "</b> raised the max from " + r.prev.toFixed(1) + " to " + r.m.toFixed(1) +
          ", so the sum so far is rescaled by e^(" + r.prev.toFixed(1) + " − " + r.m.toFixed(1) + ") = " + Math.exp(r.prev - r.m).toFixed(3) + ".";
      } else if (k > 0) {
        caption.innerHTML = "Block <b>K" + (k + 1) + "</b> didn't raise the max, so its terms just add onto the sum. No correction needed.";
      } else {
        caption.innerHTML = "Block <b>K1</b> is the only one in SRAM. Its max and sum start the running values.";
      }
      set(roM, r.m.toFixed(3));
      set(roL, r.l.toFixed(3));
      set(roT, "1 / 4");
      bar(0.125);
    },
    4: function () {
      var r = online(COLS - 1), ref = oneShot();
      setTiles(function () { return "is-materialised"; });
      caption.innerHTML = "Running result <b>" + r.l.toFixed(3) + "</b>, one-shot result <b>" + ref.l.toFixed(3) +
        "</b>: the same denominator, with only one key block ever in SRAM. The arithmetic holds. The grid is hatched because the kernel that does it is the one I haven't written."
      set(roM, r.m.toFixed(3)); set(roL, r.l.toFixed(3)); set(roT, "1 / 4");
      bar(0.125);
    }
  };

  function set(el, v) { if (el.textContent !== v) el.textContent = v; }
  /* The track is the whole width; the capacity mark sits at a fixed
     point on it. frac is how much K/V the kernel needs, as a fraction of
     the track, so anything past CAP is overflow and is drawn in red. */
  var TRACK = 240, CAP = 150;
  function bar(frac) {
    var w = Math.max(0, frac) * TRACK;
    traffic.setAttribute("width", Math.min(w, CAP).toFixed(1));
    trafficOver.setAttribute("width", Math.max(0, w - CAP).toFixed(1));
  }

  /* ============================================================
     3. Scroll wiring
        Driven off measured scroll position, not autoplay: the active
        step is whichever step block straddles the viewport midpoint,
        and step 4 additionally reports how far through itself it is.
     ============================================================ */

  var stepEls = Array.prototype.slice.call(document.querySelectorAll(".step"));
  var rail = document.getElementById("rail");
  var scrolly = document.getElementById("scrolly");
  var railButtons = [];

  stepEls.forEach(function (el, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.innerHTML = '<span class="n">0' + (i + 1) + '</span><span class="tick"></span>';
    b.setAttribute("aria-label", "Go to step " + (i + 1));
    b.addEventListener("click", function () {
      var y = el.getBoundingClientRect().top + window.scrollY - innerHeight * 0.28;
      if (window.lenisInstance) window.lenisInstance.scrollTo(y, { duration: 1.1 });
      else scrollTo({ top: y, behavior: "smooth" });
    });
    rail.appendChild(b);
    railButtons.push(b);
  });

  var current = -1;
  var stickyCol = document.querySelector(".sticky-col");
  var narrow = matchMedia("(max-width: 900px)");

  /* The line a step has to cross to become active. On desktop that is
     the middle of the screen; on narrow screens the panel covers the top
     half, so it is the middle of the visible area under the panel. */
  function readingLine() {
    if (!narrow.matches) return innerHeight / 2;
    var b = Math.max(0, Math.min(innerHeight, stickyCol.getBoundingClientRect().bottom));
    return b + (innerHeight - b) / 2;
  }

  function update() {
    var mid = readingLine();
    var activeIndex = 0, localProgress = 0;

    for (var i = 0; i < stepEls.length; i++) {
      var rect = stepEls[i].getBoundingClientRect();
      if (rect.top <= mid && rect.bottom > mid) {
        activeIndex = i;
        localProgress = (mid - rect.top) / rect.height;
        break;
      }
      /* past the last one */
      if (rect.bottom <= mid) { activeIndex = i; localProgress = 1; }
    }

    var stepNo = activeIndex + 1;

    if (stepNo !== current) {
      current = stepNo;
      panel.dataset.step = stepNo;
      set(stateEl, "Step 0" + stepNo + " / 0" + stepEls.length);
      stepEls.forEach(function (el, i) { el.classList.toggle("is-active", i === activeIndex); });
      railButtons.forEach(function (b, i) { b.classList.toggle("is-active", i === activeIndex); });
      if (stepNo !== SWEEP) STEPS[stepNo]();
    }

    /* the sweep step keeps updating continuously while it is on screen */
    if (stepNo === SWEEP) STEPS[SWEEP](Math.max(0, Math.min(1, localProgress)));

    /* rail only while the figure is in play */
    var sr = scrolly.getBoundingClientRect();
    rail.classList.toggle("is-visible", sr.top < innerHeight * 0.5 && sr.bottom > innerHeight * 0.5);
  }

  /* follow Lenis (design.js) when it is running, as the figure always
     has; without it (reduced motion) the native scroll */
  if (window.lenisInstance) window.lenisInstance.on("scroll", update);
  else addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);

  /* first paint */
  STEPS[1]();
  update();
})();
