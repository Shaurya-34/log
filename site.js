/* The post widgets and their shared sound engine. Page chrome (theme, share, mute) lives in chrome.js. */
(function () {
  var doc = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var safeStore = {
    get: function (k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    }
  };

  function run(fn) {
    try { fn(); } catch (e) {}
  }

  /* ------------------------------------------------------------
     Segmented switch indicator

     One sliding block behind whichever button in a real single-select
     group (weight decay, ray mode, hash-digest length) is currently
     pressed, instead of each button flipping its own background on its
     own - shared across every widget that mounts one instead of
     reimplemented per widget. Deliberately never mounted on the
     birthday-demo run controls (step / auto-run / reset): those three
     are independent actions, not alternatives in a choice, so a
     "currently selected" indicator would misrepresent them.
     ------------------------------------------------------------ */

  function mountSwitchIndicator(container) {
    if (!container) {
      return function () {};
    }

    var indicator = document.createElement("span");
    indicator.className = "switch-indicator";
    indicator.setAttribute("aria-hidden", "true");
    container.insertBefore(indicator, container.firstChild);

    function place() {
      var pressed = container.querySelector('button[aria-pressed="true"]');

      if (!pressed) {
        indicator.style.opacity = "0";
        return;
      }

      indicator.style.opacity = "1";
      indicator.style.width = pressed.offsetWidth + "px";
      indicator.style.height = pressed.offsetHeight + "px";
      indicator.style.transform =
        "translate(" + pressed.offsetLeft + "px, " + pressed.offsetTop + "px)";
    }

    addEventListener("resize", place);

    /* The mono faces load over the network, so the first place() (run
       right at is-ready, before a webfont necessarily arrived) can
       measure fallback-font widths a couple of pixels off the real
       ones. Re-measuring once the real faces are in fixes that without
       guessing at a timeout. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(place, function () {});
    }

    return place;
  }

  /* ------------------------------------------------------------
     Sound

     One synthesised-noise engine, shared by every widget that wants a
     tick. The "tape-sound" storage key is a leftover name from the old
     homepage, kept because chrome.js's mute control shares it. A sample
     would be another request on a page that costs 23KB, and a
     generated click can take its brightness and level from the caller
     (how fast, how hard, how final) the way a file never could.
     Filtered noise, never a tone - a tone reads as a beep, noise reads
     as a mechanism.

     One rule for the whole site, enforced once here rather than once
     per widget: on unless muted from the nav (chrome.js owns that
     control), and only ever in answer to something the reader did.
     ------------------------------------------------------------ */
  var siteSound = (function () {
    /* read live, so muting in the nav applies at once */
    function on() { return safeStore.get("tape-sound") !== "off"; }
    var audio = null;
    var noise = null;
    /* Wall clock, in ms, deliberately negative to start - see burst().
       A fresh AudioContext's own clock starts at zero, which would make
       a floor measured against it swallow the very first sound of the
       visit; measuring real time instead avoids that, and also survives
       a context that hasn't been resumed yet (whose own clock stays
       frozen at zero until it has). */
    var lastAt = -1000;

    function ensure() {
      var Ctx = window.AudioContext || window.webkitAudioContext;

      if (!Ctx) {
        return false;
      }

      if (!audio) {
        audio = new Ctx();

        var length = Math.floor(audio.sampleRate * 0.06);
        noise = audio.createBuffer(1, length, audio.sampleRate);

        var data = noise.getChannelData(0);
        for (var i = 0; i < length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      }

      if (audio.state === "suspended") {
        audio.resume();
      }

      return true;
    }

    /* freq/q shape the timbre, peak/dur shape the envelope. floorMs is
       the minimum gap between two bursts - 30ms or so for a rapid tick
       that would otherwise smear into a buzz, 0 for a one-off event
       (a collision) that only ever fires once per run and must never be
       swallowed by something that ticked a moment earlier. */
    function burst(freq, q, peak, dur, floorMs) {
      if (!on() || !ensure()) {
        return;
      }

      var wall = performance.now();

      if (floorMs && wall - lastAt < floorMs) {
        return;
      }

      lastAt = wall;

      var now = audio.currentTime;
      var source = audio.createBufferSource();
      var band = audio.createBiquadFilter();
      var gain = audio.createGain();

      source.buffer = noise;
      band.type = "bandpass";
      band.frequency.value = freq;
      band.Q.value = q;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(peak, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      source.connect(band);
      band.connect(gain);
      gain.connect(audio.destination);
      source.start(now);
      source.stop(now + dur + 0.01);
    }

    return {
      isOn: on,
      ensure: ensure,
      /* A light tick - one draw landing in a bucket. pace in [0,1] brightens and loudens
         it, for callers where "how hard" means something. */
      tick: function (pace) {
        var hard = Math.max(0, Math.min(1, pace || 0));
        burst(1500 + hard * 900, 1.4, 0.05 + hard * 0.09, 0.05, 30);
      },
      /* A lower, longer hit for the moment something actually lands -
         currently just a collision. No floor: it is rare enough by
         construction that it can never need one. */
      thunk: function () {
        burst(650, 2.2, 0.17, 0.16, 0);
      }
    };
  })();

  /* Audio may only start inside a gesture, so wake the engine on the
     first press of the visit; a widget that ticks from a timer after
     that (the birthday demo's auto-run) can then be heard. */
  run(function () {
    if (!(window.AudioContext || window.webkitAudioContext)) return;
    var arm = function () {
      if (siteSound.isOn()) siteSound.ensure();
      document.removeEventListener("pointerdown", arm);
      document.removeEventListener("keydown", arm);
    };
    document.addEventListener("pointerdown", arm);
    document.addEventListener("keydown", arm);
  });

  /* ------------------------------------------------------------
     Lorenz divergence figure

     Two copies of the same deterministic system, integrated live,
     starting a millionth apart in x. Demonstrates the article's own
     claim rather than illustrating it: nothing here is pre-rendered.
     ------------------------------------------------------------ */
  run(function () {
    var fig = document.getElementById("chaos-demo");

    if (!fig) {
      return;
    }

    var canvas = fig.querySelector(".chaos-canvas");
    var ctx = canvas.getContext("2d");
    var restartBtn = fig.querySelector(".chaos-restart");
    var defaultsBtn = fig.querySelector(".chaos-defaults");
    var sepOut = fig.querySelector('[data-out="sep"]');
    var paramInputs = Array.prototype.slice.call(
      fig.querySelectorAll(".chaos-params input[data-param]")
    );

    var DEFAULTS = { sigma: 10, rho: 28, beta: 8 / 3 };

    /* sigma/rho/beta are mutable and read from the sliders on every
       reset, rather than fixed constants, so the reader can explore the
       shape's dependence on the equation's own constants and not just
       on where the two trajectories start. */
    var SIGMA = DEFAULTS.sigma, RHO = DEFAULTS.rho, BETA = DEFAULTS.beta;
    var DT = 0.006;
    var EPSILON = 0.000001;
    var SUBSTEPS_PER_FRAME = 6;
    var MAX_STEPS = 9000;

    /* Phase space to canvas: Lorenz wanders roughly x,y in [-25,25],
       z in [0,50]. Project onto x-z, the classic two-lobe silhouette. */
    var W = canvas.width, H = canvas.height;
    var PAD = 24;

    function px(x) {
      return PAD + ((x + 26) / 52) * (W - PAD * 2);
    }

    function py(z) {
      return H - PAD - (z / 50) * (H - PAD * 2);
    }

    function deriv(s) {
      return [
        SIGMA * (s[1] - s[0]),
        s[0] * (RHO - s[2]) - s[1],
        s[0] * s[1] - BETA * s[2]
      ];
    }

    function rk4Step(s, dt) {
      var k1 = deriv(s);
      var s2 = [s[0] + k1[0] * dt / 2, s[1] + k1[1] * dt / 2, s[2] + k1[2] * dt / 2];
      var k2 = deriv(s2);
      var s3 = [s[0] + k2[0] * dt / 2, s[1] + k2[1] * dt / 2, s[2] + k2[2] * dt / 2];
      var k3 = deriv(s3);
      var s4 = [s[0] + k3[0] * dt, s[1] + k3[1] * dt, s[2] + k3[2] * dt];
      var k4 = deriv(s4);

      return [
        s[0] + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
        s[1] + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
        s[2] + (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2])
      ];
    }

    function separation(a, b) {
      var dx = a[0] - b[0], dy = a[1] - b[1], dz = a[2] - b[2];
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    function formatSep(v) {
      if (v < 0.001) {
        return v.toExponential(1);
      }

      return v.toFixed(v < 10 ? 3 : 1);
    }

    var colorInk, colorGrey;
    var a, b, step, raf, prevA, prevB;

    /* The starting point itself, jittered a little on each explicit
       restart so repeat runs actually look different (see below) - held
       fixed across slider drags so comparing sigma/rho/beta at a fixed
       starting point is apples to apples. */
    var base = [0.1, 0, 0];

    function readColors() {
      var cs = getComputedStyle(fig);
      colorInk = cs.getPropertyValue("--ink").trim() || "#161513";
      colorGrey = cs.getPropertyValue("--grey").trim() || "#6f6a62";
    }

    function rerollBase() {
      /* Small jitter around the usual [0.1, 0, 0] start: big enough that
         two restarts trace visibly different paths before settling onto
         the attractor, small enough to still land in its basin for any
         of the slider's parameter combinations. */
      base = [
        0.1 + (Math.random() * 4 - 2),
        Math.random() * 4 - 2,
        Math.random() * 4 - 2
      ];
    }

    function reset() {
      if (raf) {
        cancelAnimationFrame(raf);
      }

      readColors();
      ctx.clearRect(0, 0, W, H);

      a = base.slice();
      b = [base[0] + EPSILON, base[1], base[2]];
      prevA = a.slice();
      prevB = b.slice();
      step = 0;

      sepOut.textContent = formatSep(EPSILON);
    }

    function drawSegment(from, to, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px(from[0]), py(from[2]));
      ctx.lineTo(px(to[0]), py(to[2]));
      ctx.stroke();
    }

    function tick() {
      for (var i = 0; i < SUBSTEPS_PER_FRAME && step < MAX_STEPS; i++) {
        prevA = a;
        prevB = b;
        a = rk4Step(a, DT);
        b = rk4Step(b, DT);
        drawSegment(prevA, a, colorGrey);
        drawSegment(prevB, b, colorInk);
        step++;
      }

      sepOut.textContent = formatSep(separation(a, b));

      if (step < MAX_STEPS) {
        raf = requestAnimationFrame(tick);
      }
    }

    function drawStatic() {
      /* Reduced motion: compute the full run synchronously and draw
         both complete paths at once instead of animating them in. */
      readColors();
      ctx.clearRect(0, 0, W, H);

      var s1 = base.slice();
      var s2 = [base[0] + EPSILON, base[1], base[2]];
      var p1 = s1.slice();
      var p2 = s2.slice();

      for (var i = 0; i < MAX_STEPS; i++) {
        s1 = rk4Step(s1, DT);
        s2 = rk4Step(s2, DT);
        drawSegment(p1, s1, colorGrey);
        drawSegment(p2, s2, colorInk);
        p1 = s1;
        p2 = s2;
      }

      sepOut.textContent = formatSep(separation(s1, s2));
    }

    function run_() {
      if (reduced) {
        drawStatic();
      } else {
        reset();
        raf = requestAnimationFrame(tick);
      }
    }

    function formatParam(v) {
      return v.toFixed(v < 10 ? 2 : 1);
    }

    /* Sets the actual simulation value and its label from an exact
       number - NOT from reading the slider back. A range input's value
       setter silently snaps to the nearest step even when set from JS
       (e.g. beta's true default 8/3 = 2.667 lands on 2.7, one whole step
       off), so "reset to default" must carry the exact constant through
       rather than round-trip it through the slider's own value. */
    function setParam(name, v) {
      if (name === "sigma") { SIGMA = v; }
      if (name === "rho") { RHO = v; }
      if (name === "beta") { BETA = v; }

      var out = fig.querySelector('[data-val="' + name + '"]');

      if (out) {
        out.textContent = formatParam(v);
      }
    }

    paramInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        /* User-dragged values are already step-quantized by the browser,
           so reading .value back here is exact - no snapping loss. */
        setParam(input.getAttribute("data-param"), parseFloat(input.value));
        /* Deliberately does not reroll the starting point: changing one
           slider while the run stays comparable to the last one is the
           point, versus restart, which is about the nudge instead. */
        run_();
      });
    });

    restartBtn.addEventListener("click", function () {
      rerollBase();
      run_();
    });

    if (defaultsBtn) {
      defaultsBtn.addEventListener("click", function () {
        paramInputs.forEach(function (input) {
          var name = input.getAttribute("data-param");

          input.value = DEFAULTS[name];
          setParam(name, DEFAULTS[name]);
        });

        rerollBase();
        run_();
      });
    }

    fig.classList.add("is-ready");
    rerollBase();
    run_();
  });

  /* ------------------------------------------------------------
     Grokking figure

     Interactive version of the phase1 accuracy plot. Two real runs
     (weight decay 1.0 and 0.0, identical otherwise) exported from
     catapult; the toggle lets the reader check the article's claim
     that removing weight decay removes the jump entirely, and the
     slider reveals training one logged epoch at a time.
     ------------------------------------------------------------ */
  run(function () {
    var fig = document.getElementById("grok-demo");

    if (!fig) {
      return;
    }

    var NS = "http://www.w3.org/2000/svg";
    /* Y1 leaves headroom above the 1.0 gridline so the legend sits in the
       top margin instead of colliding with a curve that reaches 100%. */
    var NS_LEGEND_Y = 18;
    var X0 = 64, X1 = 644, Y0 = 248, Y1 = 44;

    var svg = fig.querySelector(".grok-plot");
    var range = fig.querySelector(".grok-scrub input");
    var buttons = Array.prototype.slice.call(
      fig.querySelectorAll(".grok-switch button")
    );
    var placeSwitch = mountSwitchIndicator(fig.querySelector(".grok-switch"));

    var out = {
      epoch: fig.querySelector('[data-out="epoch"]'),
      train: fig.querySelector('[data-out="train"]'),
      val: fig.querySelector('[data-out="val"]')
    };

    var data = null;
    var mode = "on";
    var layer = null;

    function el(name, attrs) {
      var node = document.createElementNS(NS, name);

      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) {
          node.setAttribute(k, attrs[k]);
        }
      }

      return node;
    }

    function sx(epoch) {
      var last = data.epochs[data.epochs.length - 1];
      return X0 + (epoch / last) * (X1 - X0);
    }

    function sy(acc) {
      return Y0 + acc * (Y1 - Y0);
    }

    /* Axes, grid and legend: drawn once, never change. */
    function drawFrame() {
      var g = el("g", { class: "grok-frame" });
      var i;

      for (i = 0; i <= 4; i++) {
        var acc = i / 4;
        var y = sy(acc);

        g.appendChild(el("line", {
          class: "grok-grid", x1: X0, y1: y, x2: X1, y2: y
        }));

        var yl = el("text", {
          class: "grok-label grok-label-y", x: X0 - 10, y: y + 4
        });
        yl.textContent = acc.toFixed(2);
        g.appendChild(yl);
      }

      var last = data.epochs[data.epochs.length - 1];

      for (i = 0; i <= 4; i++) {
        var ep = (last / 4) * i;
        var x = sx(ep);

        g.appendChild(el("line", {
          class: "grok-tick", x1: x, y1: Y0, x2: x, y2: Y0 + 6
        }));

        var xl = el("text", {
          class: "grok-label grok-label-x", x: x, y: Y0 + 22
        });
        /* The final logged epoch is 39,999 rather than a round 40,000,
           so label the ticks at the nearest thousand instead of printing
           values like "9.99975k". */
        xl.textContent = ep === 0 ? "0" : Math.round(ep / 1000) + "k";
        g.appendChild(xl);
      }

      g.appendChild(el("line", {
        class: "grok-axis", x1: X0, y1: Y0, x2: X1, y2: Y0
      }));

      /* Distinct classes from the data polylines: sharing them makes
         '.grok-line-train' ambiguous in the DOM and matches the legend
         swatch first. */
      var legend = [
        { label: "train", cls: "grok-swatch grok-swatch-train", x: X0 + 8 },
        { label: "val", cls: "grok-swatch grok-swatch-val", x: X0 + 96 }
      ];

      legend.forEach(function (item) {
        g.appendChild(el("line", {
          class: item.cls,
          x1: item.x, y1: NS_LEGEND_Y, x2: item.x + 24, y2: NS_LEGEND_Y
        }));

        var t = el("text", {
          class: "grok-label", x: item.x + 30, y: NS_LEGEND_Y + 4
        });
        t.textContent = item.label;
        g.appendChild(t);
      });

      svg.appendChild(g);
    }

    function points(series, upto) {
      var pts = [];

      for (var i = 0; i <= upto; i++) {
        pts.push(sx(data.epochs[i]).toFixed(1) + "," + sy(series[i]).toFixed(1));
      }

      return pts.join(" ");
    }

    function render() {
      var run_ = data.runs[mode];
      var i = parseInt(range.value, 10);

      layer.train.setAttribute("points", points(run_.train, i));
      layer.val.setAttribute("points", points(run_.val, i));

      var x = sx(data.epochs[i]);
      layer.head.setAttribute("x1", x);
      layer.head.setAttribute("x2", x);
      layer.dotTrain.setAttribute("cx", x);
      layer.dotTrain.setAttribute("cy", sy(run_.train[i]));
      layer.dotVal.setAttribute("cx", x);
      layer.dotVal.setAttribute("cy", sy(run_.val[i]));

      /* The grok epoch marker only means anything for the run that
         actually groks, so hide it entirely for weight decay off. */
      if (run_.grokEpoch) {
        var gx = sx(run_.grokEpoch);
        layer.grok.setAttribute("x1", gx);
        layer.grok.setAttribute("x2", gx);
        layer.grok.removeAttribute("hidden");
      } else {
        layer.grok.setAttribute("hidden", "hidden");
      }

      out.epoch.textContent = data.epochs[i].toLocaleString();
      out.train.textContent = Math.round(run_.train[i] * 100) + "%";
      out.val.textContent = Math.round(run_.val[i] * 100) + "%";
    }

    function build() {
      drawFrame();

      var g = el("g", { class: "grok-series" });

      layer = {
        grok: el("line", { class: "grok-grokline", y1: Y1, y2: Y0 }),
        train: el("polyline", { class: "grok-line-train", points: "" }),
        val: el("polyline", { class: "grok-line-val", points: "" }),
        head: el("line", { class: "grok-head-line", y1: Y1, y2: Y0 }),
        dotTrain: el("circle", { class: "grok-dot grok-dot-train", r: 3 }),
        dotVal: el("circle", { class: "grok-dot grok-dot-val", r: 3.5 })
      };

      g.appendChild(layer.grok);
      g.appendChild(layer.train);
      g.appendChild(layer.val);
      g.appendChild(layer.head);
      g.appendChild(layer.dotTrain);
      g.appendChild(layer.dotVal);
      svg.appendChild(g);

      /* Start at epoch 0 so the reader drags forward through training
         and watches the jump arrive, rather than starting on the
         finished curve and scrubbing backwards. */
      range.max = String(data.epochs.length - 1);
      range.value = "0";

      range.addEventListener("input", render);

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          mode = btn.getAttribute("data-wd");

          buttons.forEach(function (b) {
            b.setAttribute(
              "aria-pressed",
              b === btn ? "true" : "false"
            );
          });

          placeSwitch();
          render();
        });
      });

      fig.classList.add("is-ready");
      placeSwitch();
      render();
    }

    fetch(fig.getAttribute("data-src"))
      .then(function (r) { return r.json(); })
      .then(function (json) {
        data = json;
        build();
      })
      .catch(function () {
        /* Leave the figure in its un-ready state; CSS keeps it
           collapsed so a failed fetch shows nothing rather than an
           empty set of axes. */
      });
  });

  /* ------------------------------------------------------------
     Sphere-tracing figure

     The article's own scene() - a sphere and a box, combined with min()
     or smin() - rendered live as a 2D cross-section, plus a ray the
     reader casts by clicking: sphere tracing, one safe-radius circle per
     step, exactly the pseudocode a few paragraphs up.
     ------------------------------------------------------------ */
  run(function () {
    var fig = document.getElementById("ray-demo");

    if (!fig) {
      return;
    }

    var canvas = fig.querySelector(".ray-canvas");
    var ctx = canvas.getContext("2d");
    var modeButtons = Array.prototype.slice.call(
      fig.querySelectorAll(".ray-switch button")
    );
    var placeSwitch = mountSwitchIndicator(fig.querySelector(".ray-switch"));
    var stepsOut = fig.querySelector('[data-out="steps"]');
    var statusOut = fig.querySelector('[data-out="status"]');

    var W = canvas.width, H = canvas.height;

    var SPHERE = { x: 560, y: 190, r: 95 };
    var BOX = { x: 430, y: 250, hx: 90, hy: 70 };
    var K = 70;
    var ORIGIN = { x: 70, y: 380 };
    var HIT_EPS = 1;
    var MAX_DIST = 1000;
    var MAX_STEPS = 80;
    var STEPS_PER_TICK = 1;
    var FRAME_SKIP = 3;

    var mode = "smin";
    var colorInk, colorGrey;
    var bg = null;
    var raf = null;

    function sdCircle(px, py, c) {
      var dx = px - c.x, dy = py - c.y;
      return Math.sqrt(dx * dx + dy * dy) - c.r;
    }

    function sdBox(px, py, b) {
      var dx = Math.abs(px - b.x) - b.hx;
      var dy = Math.abs(py - b.y) - b.hy;
      var ax = Math.max(dx, 0), ay = Math.max(dy, 0);

      return Math.sqrt(ax * ax + ay * ay) + Math.min(Math.max(dx, dy), 0);
    }

    function smin(a, b, k) {
      var h = Math.max(k - Math.abs(a - b), 0) / k;
      return Math.min(a, b) - (h * h * k) / 4;
    }

    function scene(px, py) {
      var ds = sdCircle(px, py, SPHERE);
      var db = sdBox(px, py, BOX);

      return mode === "smin" ? smin(ds, db, K) : Math.min(ds, db);
    }

    function readColors() {
      var cs = getComputedStyle(fig);
      colorInk = cs.getPropertyValue("--ink").trim() || "#161513";
      colorGrey = cs.getPropertyValue("--grey").trim() || "#6f6a62";
    }

    function hexToRgb(hex) {
      hex = hex.replace("#", "");

      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      var n = parseInt(hex, 16);

      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    /* Silhouette of the current scene(), filled pixel by pixel from the
       exact same distance function the ray uses - not an approximation
       of it. A soft alpha falloff near the zero level set gives the
       outline a slight anti-alias, which felt right for an article whose
       last section is exactly that. Costs ~350,000 scene() evaluations
       (~80-90ms on desktop, likely several times that on a phone), so the
       caller only invokes this when the pixels it would produce have
       actually changed - see resetCanvas(). */
    function renderBackground() {
      var rgb = hexToRgb(colorInk);
      var img = ctx.createImageData(W, H);
      var data = img.data;
      var band = 1.4;

      for (var y = 0; y < H; y++) {
        for (var x = 0; x < W; x++) {
          var d = Math.abs(scene(x, y));
          var i = (y * W + x) * 4;

          if (d < band) {
            var a = 1 - d / band;
            data[i] = rgb[0];
            data[i + 1] = rgb[1];
            data[i + 2] = rgb[2];
            data[i + 3] = Math.round(a * 255);
          }
        }
      }

      bg = img;
    }

    function drawOrigin() {
      ctx.fillStyle = colorGrey;
      ctx.beginPath();
      ctx.arc(ORIGIN.x, ORIGIN.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    /* Cache key for the last background render: mode changes the shape
       (min vs smin), colorInk changes the theme. resetCanvas() runs on
       every click including every ray cast, so only actually re-running
       the ~350,000-pixel fill when one of these has changed matters on a
       phone - reusing the same bitmap the rest of the time keeps a click
       to sub-millisecond instead of ~90ms+. */
    var bgKey = null;

    function resetCanvas() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }

      readColors();

      var key = mode + colorInk;

      if (!bg || bgKey !== key) {
        renderBackground();
        bgKey = key;
      }

      ctx.clearRect(0, 0, W, H);
      ctx.putImageData(bg, 0, 0);
      drawOrigin();
    }

    function setMode(next) {
      mode = next;

      modeButtons.forEach(function (btn) {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("data-mode") === mode ? "true" : "false"
        );
      });

      placeSwitch();
      resetCanvas();
      stepsOut.textContent = "-";
      statusOut.textContent = "";
    }

    function castRay(targetX, targetY) {
      var dx = targetX - ORIGIN.x, dy = targetY - ORIGIN.y;
      var len = Math.sqrt(dx * dx + dy * dy);

      if (len < 1) {
        return;
      }

      dx /= len;
      dy /= len;

      resetCanvas();

      var travelled = 0;
      var step = 0;
      var px = ORIGIN.x, py = ORIGIN.y;
      var skip = 0;

      ctx.strokeStyle = colorInk;
      ctx.lineWidth = 1.2;

      function drawStepMarker(x, y, d) {
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.strokeStyle = colorGrey;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(d, 0), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colorInk;
      }

      function finish(label) {
        stepsOut.textContent = String(step);
        statusOut.textContent = label;
      }

      function tick() {
        skip++;

        if (skip < FRAME_SKIP) {
          raf = requestAnimationFrame(tick);
          return;
        }

        skip = 0;

        for (var i = 0; i < STEPS_PER_TICK; i++) {
          var d = scene(px, py);
          var nx = px + dx * d, ny = py + dy * d;

          drawStepMarker(nx, ny, d);

          px = nx;
          py = ny;
          travelled += d;
          step++;

          stepsOut.textContent = String(step);
          statusOut.textContent = "marching…";

          if (d < HIT_EPS) {
            ctx.fillStyle = colorInk;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
            finish("hit");
            return;
          }

          if (travelled > MAX_DIST || step >= MAX_STEPS) {
            finish("missed");
            return;
          }
        }

        raf = requestAnimationFrame(tick);
      }

      tick();
    }

    function castRayStatic(targetX, targetY) {
      /* Reduced motion: no per-step animation, just the final ray and
         where it landed. */
      var dx = targetX - ORIGIN.x, dy = targetY - ORIGIN.y;
      var len = Math.sqrt(dx * dx + dy * dy);

      if (len < 1) {
        return;
      }

      dx /= len;
      dy /= len;

      resetCanvas();

      var travelled = 0, step = 0, px = ORIGIN.x, py = ORIGIN.y;
      var hit = false;

      for (; step < MAX_STEPS; step++) {
        var d = scene(px, py);

        px += dx * d;
        py += dy * d;
        travelled += d;

        if (d < HIT_EPS) {
          hit = true;
          step++;
          break;
        }

        if (travelled > MAX_DIST) {
          break;
        }
      }

      ctx.strokeStyle = colorInk;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(ORIGIN.x, ORIGIN.y);
      ctx.lineTo(px, py);
      ctx.stroke();

      ctx.fillStyle = colorInk;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();

      stepsOut.textContent = String(step);
      statusOut.textContent = hit ? "hit" : "missed";
    }

    canvas.addEventListener("click", function (e) {
      var r = canvas.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * W;
      var y = ((e.clientY - r.top) / r.height) * H;

      if (reduced) {
        castRayStatic(x, y);
      } else {
        castRay(x, y);
      }
    });

    modeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setMode(btn.getAttribute("data-mode"));
      });
    });

    resetCanvas();
    fig.classList.add("is-ready");
    placeSwitch();
  });

  /* ------------------------------------------------------------
     Birthday-collision demo (toy scale)

     Draws random integers into N buckets, one at a time, until two
     land in the same bucket. The article's own two constants -
     1.177*sqrt(N) (the point collision becomes more likely than not)
     and 1.2533*sqrt(N) (the actual expected number of draws) - are
     shown live against the same run the reader is watching, rather
     than asserted in prose. Auto-run keeps going after each collision,
     building a histogram across repeated runs so the skewed shape of
     the distribution - the reason the two constants differ at all -
     is something the reader watches accumulate, not a claim to take on
     faith.

     Seeded with a batch of instant runs the moment it's ready, rather
     than opening on an empty grid and an empty histogram - a figure
     that shows nothing until someone finds the right button is not
     demonstrating anything yet. The seeding itself is silent even with
     sound on: thirty ticks fired at once on page load is a burst of
     noise, not the small satisfying click a single draw earns.
     ------------------------------------------------------------ */
  run(function () {
    var fig = document.getElementById("birthday-demo");

    if (!fig) {
      return;
    }

    var MEDIAN_CONST = Math.sqrt(2 * Math.log(2)); // ≈ 1.1774
    var MEAN_CONST = Math.sqrt(Math.PI / 2);       // ≈ 1.2533
    var N_MIN = 50, N_MAX = 10000;
    var HIST_MAX_RUNS = 300;
    var HIST_BINS = 30;
    var SEED_RUNS = 30;

    var nRange = fig.querySelector('[data-param="n"]');
    var nOut = fig.querySelector('.birthday-n output');
    var buttons = {
      step: fig.querySelector('[data-action="step"]'),
      auto: fig.querySelector('[data-action="auto"]'),
      reset: fig.querySelector('[data-action="reset"]')
    };
    var out = {
      draws: fig.querySelector('[data-out="draws"]'),
      median: fig.querySelector('[data-out="median"]'),
      mean: fig.querySelector('[data-out="mean"]'),
      status: fig.querySelector('[data-out="status"]'),
      runs: fig.querySelector('[data-out="runs"]')
    };
    var gridCanvas = fig.querySelector(".birthday-grid");
    var gridCtx = gridCanvas.getContext("2d");
    var histCanvas = fig.querySelector(".birthday-hist");
    var histCtx = histCanvas.getContext("2d");

    var GW = gridCanvas.width, GH = gridCanvas.height;
    var HW = histCanvas.width, HH = histCanvas.height;

    var colorInk, colorGrey, colorHairline, colorPaper, colorFaint;

    function readColors() {
      var cs = getComputedStyle(fig);
      colorInk = cs.getPropertyValue("--ink").trim() || "#161513";
      colorGrey = cs.getPropertyValue("--grey").trim() || "#6f6a62";
      colorHairline = cs.getPropertyValue("--hairline").trim() || "#e7e3dc";
      colorPaper = cs.getPropertyValue("--paper").trim() || "#faf9f7";
      colorFaint = cs.getPropertyValue("--faint").trim() || "#77726b";
    }

    var N = 1000;
    var cols, rows, cellW, cellH;
    var filled;        // Uint8Array, one flag per bucket
    var order;          // buckets in draw order, for redraw after resize
    var draws = 0;
    var collisionAt = -1;
    var running = false;
    var raf = null;
    var histogram = []; // completed run lengths, oldest first

    /* N moves on a log scale - the difference between 50 and 500 buckets
       matters a lot more to how the grid looks than 9500 vs 10000 does,
       so a linear slider would waste most of its travel at the crowded
       end. */
    function posToN(pos) {
      var t = pos / 100;
      return Math.round(N_MIN * Math.pow(N_MAX / N_MIN, t));
    }

    function layoutGrid() {
      cols = Math.max(1, Math.round(Math.sqrt((N * GW) / GH)));
      rows = Math.ceil(N / cols);
      cellW = GW / cols;
      cellH = GH / rows;
    }

    function newRun() {
      layoutGrid();
      filled = new Uint8Array(N);
      order = [];
      draws = 0;
      collisionAt = -1;
      paintGrid();
      paintReadout();
    }

    function paintGrid() {
      gridCtx.fillStyle = colorPaper;
      gridCtx.fillRect(0, 0, GW, GH);

      gridCtx.fillStyle = colorGrey;
      for (var i = 0; i < order.length; i++) {
        var b = order[i];
        var cx = b % cols, cy = Math.floor(b / cols);
        gridCtx.fillRect(cx * cellW + 0.5, cy * cellH + 0.5,
          Math.max(1, cellW - 1), Math.max(1, cellH - 1));
      }

      if (collisionAt >= 0) {
        /* Both draws that collided are this same bucket - there is only
           one cell to point at, so a plain fill would look identical to
           any other filled cell. A ring around it, wider than the cell
           itself, is what actually says "look here, twice" rather than
           just "this one's a slightly different grey." */
        var b2 = order[order.length - 1];
        var cx2 = b2 % cols, cy2 = Math.floor(b2 / cols);
        var rx = cx2 * cellW + cellW / 2, ry = cy2 * cellH + cellH / 2;
        var ring = Math.max(cellW, cellH) * 1.6 + 4;

        gridCtx.fillStyle = colorInk;
        gridCtx.fillRect(cx2 * cellW + 0.5, cy2 * cellH + 0.5,
          Math.max(1, cellW - 1), Math.max(1, cellH - 1));

        gridCtx.strokeStyle = colorInk;
        gridCtx.lineWidth = 1.5;
        gridCtx.beginPath();
        gridCtx.arc(rx, ry, ring / 2, 0, Math.PI * 2);
        gridCtx.stroke();
      }
    }

    function paintReadout() {
      nOut.textContent = String(N);
      out.draws.textContent = String(draws);
      out.median.textContent = (MEDIAN_CONST * Math.sqrt(N)).toFixed(1);
      out.mean.textContent = (MEAN_CONST * Math.sqrt(N)).toFixed(1);

      if (collisionAt >= 0) {
        out.status.textContent = "collision at draw " + collisionAt;
        out.status.className = "is-hit";
      } else {
        out.status.textContent = "";
        out.status.className = "";
      }

      out.runs.textContent = String(histogram.length);
    }

    function paintHist() {
      histCtx.fillStyle = colorPaper;
      histCtx.fillRect(0, 0, HW, HH);

      if (!histogram.length) {
        return;
      }

      var max = 0;
      for (var i = 0; i < histogram.length; i++) {
        if (histogram[i] > max) max = histogram[i];
      }

      var binW = Math.max(1, Math.ceil((max + 1) / HIST_BINS));
      var bins = new Array(Math.ceil((max + 1) / binW)).fill(0);

      for (i = 0; i < histogram.length; i++) {
        bins[Math.floor(histogram[i] / binW)]++;
      }

      var bestBin = 0;
      for (i = 0; i < bins.length; i++) {
        if (bins[i] > bestBin) bestBin = bins[i];
      }

      var pad = 4;
      var barW = (HW - pad * 2) / bins.length;
      var baseline = HH - 18;

      histCtx.fillStyle = colorGrey;
      for (i = 0; i < bins.length; i++) {
        var h = bestBin ? (bins[i] / bestBin) * (baseline - 6) : 0;
        histCtx.fillRect(pad + i * barW + 0.5, baseline - h,
          Math.max(1, barW - 1), h);
      }

      histCtx.strokeStyle = colorHairline;
      histCtx.beginPath();
      histCtx.moveTo(0, baseline + 0.5);
      histCtx.lineTo(HW, baseline + 0.5);
      histCtx.stroke();

      /* Draw-count labels along the bottom, at five evenly spaced points
         across whatever range is currently on screen - the range itself
         moves every time N changes or the tail stretches out, so a fixed
         set of labels baked into the markup could never be right. Five,
         to match the tick count everywhere else on the site that draws
         its own axis (see grok-demo's drawFrame). */
      histCtx.fillStyle = colorFaint;
      histCtx.font = "11px " + getComputedStyle(fig).getPropertyValue("--mono");
      histCtx.textBaseline = "top";

      for (i = 0; i <= 4; i++) {
        var tickX = (bins.length * barW) * (i / 4);
        var tickValue = Math.round(bins.length * binW * (i / 4));

        histCtx.textAlign = i === 0 ? "left" : i === 4 ? "right" : "center";
        histCtx.fillText(String(tickValue), pad + tickX, baseline + 4);
      }

      /* The mean, marked against the same axis the bars are drawn on -
         it should sit noticeably right of the tallest bar once enough
         runs have accumulated, which is the whole point being shown:
         the typical (modal) run is shorter than the average one. */
      var meanX = pad + ((MEAN_CONST * Math.sqrt(N)) / binW) * barW;
      if (meanX > 0 && meanX < HW) {
        histCtx.strokeStyle = colorInk;
        histCtx.beginPath();
        histCtx.moveTo(meanX, 4);
        histCtx.lineTo(meanX, baseline);
        histCtx.stroke();

        /* Named rather than numbered - the exact figure is already in
           the readout above the grid, so repeating it here would just
           be the same number twice. What this label needs to say is
           which line it is. */
        histCtx.fillStyle = colorInk;
        histCtx.textAlign = meanX > HW - 40 ? "right" : "left";
        histCtx.fillText("avg", meanX + (meanX > HW - 40 ? -4 : 4), 4);
      }
    }

    function draw(silent) {
      var value = Math.floor(Math.random() * N);
      draws++;

      if (filled[value]) {
        collisionAt = draws;
        if (!silent) {
          siteSound.thunk();
        }
      } else {
        filled[value] = 1;
        if (!silent) {
          siteSound.tick(0.4);
        }
      }

      order.push(value);
      paintGrid();
      paintReadout();

      return collisionAt >= 0;
    }

    function finishRun() {
      histogram.push(draws);
      if (histogram.length > HIST_MAX_RUNS) {
        histogram.shift();
      }
      paintHist();
      /* The readout's "completed runs" count is only correct once this
         run has actually been added to the histogram - painting it
         inside draw() alone left it one run behind every time. */
      paintReadout();
    }

    /* A batch of complete runs, computed instantly with no animation and
       no sound - this is what the widget opens with, and what re-fills
       the histogram after N changes or a reset, so none of those ever
       leave the figure blank. The very last run is left on the grid
       rather than cleared, so there's something to look at as well as
       something to read. */
    function seed(count) {
      for (var i = 0; i < count; i++) {
        while (!draw(true)) {
          /* keep drawing silently until this run collides */
        }

        finishRun();

        if (i < count - 1) {
          newRun();
        }
      }
    }

    function stopAuto() {
      running = false;
      buttons.auto.setAttribute("aria-pressed", "false");
      buttons.auto.textContent = "auto-run";
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    function autoTick() {
      /* However big N is, an auto-run takes roughly the same time to
         watch: more draws per frame for a bigger, more crowded grid,
         one draw per frame for a small one that would otherwise blink
         past in an instant. */
      var expected = MEAN_CONST * Math.sqrt(N);
      var perFrame = reduced ? Infinity : Math.max(1, Math.round(expected / 90));
      var i = 0;
      var hit = false;

      while (i < perFrame && !hit) {
        hit = draw();
        i++;
      }

      if (hit) {
        finishRun();

        /* HIST_MAX_RUNS was only ever a cap on the histogram array - once
           reached, finishRun() keeps trimming the oldest run as it adds
           the newest, so the count in the readout sits frozen at 300
           forever while auto-run just kept churning underneath it,
           silently. To a reader that reads as stuck, not capped - the
           number says "done," the grid keeps moving. Auto-run stopping
           here is what actually makes the cap a cap. */
        if (running && histogram.length >= HIST_MAX_RUNS) {
          stopAuto();
          return;
        }

        if (running) {
          newRun();
          raf = requestAnimationFrame(autoTick);
        }

        return;
      }

      if (running) {
        raf = requestAnimationFrame(autoTick);
      }
    }

    buttons.step.addEventListener("click", function () {
      stopAuto();

      if (collisionAt >= 0) {
        newRun();
        return;
      }

      if (draw()) {
        finishRun();
      }
    });

    buttons.auto.addEventListener("click", function () {
      if (running) {
        stopAuto();
        return;
      }

      running = true;
      buttons.auto.setAttribute("aria-pressed", "true");
      buttons.auto.textContent = "pause";

      if (collisionAt >= 0) {
        newRun();
      }

      autoTick();
    });

    buttons.reset.addEventListener("click", function () {
      stopAuto();
      histogram = [];
      newRun();
      seed(SEED_RUNS);
    });

    nRange.addEventListener("input", function () {
      stopAuto();
      N = posToN(Number(nRange.value));
      histogram = [];
      newRun();
      seed(SEED_RUNS);
    });

    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        readColors();
        paintGrid();
        paintHist();
      }).observe(fig);
    }

    readColors();
    N = posToN(Number(nRange.value));
    newRun();
    seed(SEED_RUNS);
    fig.classList.add("is-ready");
  });

  /* ------------------------------------------------------------
     Birthday-collision demo (realistic scale)

     Same 1.2533*sqrt(N) figure as the toy demo above, just applied to
     an actual digest length instead of a bucket grid a reader can
     watch fill up - the panel that connects "here's a bucket grid you
     just watched collide" to "here's why a hash needs to be 256 bits."
     No brute-force draws at this scale; N itself is already too large
     to represent exactly as a JS number, so everything is computed in
     log space and only converted to a plain number for display.
     ------------------------------------------------------------ */
  run(function () {
    var fig = document.getElementById("birthday-scale-demo");

    if (!fig) {
      return;
    }

    var MEAN_CONST_LOG10 = Math.log10(Math.sqrt(Math.PI / 2)); // log10(1.2533)
    var SECONDS_PER_YEAR = 365.25 * 24 * 3600;
    var AGE_OF_UNIVERSE_YEARS = 1.38e10;

    /* Illustrative order-of-magnitude throughput figures, not
       measurements of any specific device - the point is the relative
       scale between them and against the draw counts, not the third
       significant digit. */
    var ATTACKERS = [
      { name: "Laptop GPU, raw hashing", rateLog10: 9 },
      { name: "High-end GPU rig (8 cards)", rateLog10: 11 },
      { name: "Bitcoin network, all ASICs combined", rateLog10: 21 }
    ];

    var buttons = Array.prototype.slice.call(
      fig.querySelectorAll(".birthday-switch button")
    );
    var placeSwitch = mountSwitchIndicator(fig.querySelector(".birthday-switch"));
    var spaceOut = fig.querySelector('[data-out="space"]');
    var drawsOut = fig.querySelector('[data-out="draws"]');
    var rows = fig.querySelector('[data-out="rows"]');

    /* log10(x) for x given as its own log10 already - keeps every
       number in this panel in log space until the moment it's
       formatted, so a 2^256 space never has to exist as a float. */
    function fmtPow(log10Value, base) {
      base = base || 10;
      var exp = log10Value / Math.log10(base);
      return "≈" + (base === 2 ? "2^" : "10^") + exp.toFixed(1);
    }

    function fmtSci(log10Value) {
      var exp = Math.floor(log10Value);
      var mantissa = Math.pow(10, log10Value - exp);
      return mantissa.toFixed(2) + "×10^" + exp;
    }

    function fmtDuration(log10Seconds) {
      var years = log10Seconds - Math.log10(SECONDS_PER_YEAR);

      if (log10Seconds < 0) {
        return "< 1 second";
      }
      if (log10Seconds < Math.log10(60)) {
        return fmtSci(log10Seconds) + " s";
      }
      if (log10Seconds < Math.log10(3600)) {
        return fmtSci(log10Seconds - Math.log10(60)) + " min";
      }
      if (log10Seconds < Math.log10(SECONDS_PER_YEAR)) {
        return fmtSci(log10Seconds - Math.log10(3600)) + " hr";
      }
      if (years < Math.log10(AGE_OF_UNIVERSE_YEARS)) {
        return fmtSci(years) + " years";
      }

      var universes = years - Math.log10(AGE_OF_UNIVERSE_YEARS);
      return fmtSci(universes) + "× the age of the universe";
    }

    function render(bits) {
      var spaceLog10 = bits * Math.log10(2);
      var drawsLog10 = MEAN_CONST_LOG10 + spaceLog10 / 2;

      spaceOut.textContent = "2^" + bits;
      drawsOut.textContent = fmtPow(drawsLog10, 2) +
        " (" + fmtSci(drawsLog10) + " draws)";

      rows.innerHTML = "";

      ATTACKERS.forEach(function (a) {
        var tr = document.createElement("tr");

        var name = document.createElement("td");
        name.textContent = a.name;

        var rate = document.createElement("td");
        rate.textContent = "~10^" + a.rateLog10 + " H/s";

        var time = document.createElement("td");
        time.textContent = fmtDuration(drawsLog10 - a.rateLog10);

        tr.appendChild(name);
        tr.appendChild(rate);
        tr.appendChild(time);
        rows.appendChild(tr);
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        placeSwitch();
        render(Number(btn.getAttribute("data-bits")));
      });
    });

    var initial = fig.querySelector('[aria-pressed="true"]') || buttons[0];
    render(Number(initial.getAttribute("data-bits")));
    fig.classList.add("is-ready");
    placeSwitch();
  });

  /* ------------------------------------------------------------
     BLOCK_SIZE boundary demo

     The softmax bug from the post, made draggable: the bar represents
     one row, scaled to n_cols, and shows exactly how much of it the
     kernel actually touches. In "hardcoded" mode BLOCK_SIZE is pinned
     at 1024, so dragging n_cols past that reproduces the bug live; in
     "dynamic" mode BLOCK_SIZE tracks n_cols and the bar always fills.
     ------------------------------------------------------------ */
  run(function () {
    var fig = document.getElementById("blocksize-demo");

    if (!fig) {
      return;
    }

    var range = fig.querySelector(".blocksize-n input[type=\"range\"]");
    var ncolsOut = fig.querySelector(".blocksize-n output");
    var buttons = Array.prototype.slice.call(
      fig.querySelectorAll(".blocksize-switch button")
    );
    var placeSwitch = mountSwitchIndicator(fig.querySelector(".blocksize-switch"));
    var blockOut = fig.querySelector('[data-out="block"]');
    var droppedOut = fig.querySelector('[data-out="dropped"]');
    var matchOut = fig.querySelector('[data-out="match"]');
    var canvas = fig.querySelector(".blocksize-grid");
    var ctx = canvas.getContext("2d");

    var W = canvas.width, H = canvas.height;
    var mode = "fixed";

    var colorInk, colorFaint, colorHairline;

    function readColors() {
      var cs = getComputedStyle(fig);
      colorInk = cs.getPropertyValue("--ink").trim() || "#161513";
      colorFaint = cs.getPropertyValue("--faint").trim() || "#77726b";
      colorHairline = cs.getPropertyValue("--hairline").trim() || "#e7e3dc";
    }

    /* Mirrors triton.next_power_of_2: the smallest power of two that is
       >= n, so a row that already is one stays put. */
    function nextPow2(n) {
      var p = 1;
      while (p < n) {
        p *= 2;
      }
      return p;
    }

    function computeBlock(ncols) {
      return mode === "dynamic" ? nextPow2(ncols) : 1024;
    }

    function draw(ncols, block, dropped) {
      ctx.clearRect(0, 0, W, H);

      var marginX = 40, barY = 55, barH = 40;
      var x0 = marginX, usableW = W - marginX * 2;
      var filledW = (Math.min(block, ncols) / ncols) * usableW;

      ctx.strokeStyle = colorHairline;
      ctx.lineWidth = 1;
      ctx.strokeRect(x0 + 0.5, barY + 0.5, usableW - 1, barH - 1);

      ctx.fillStyle = colorInk;
      ctx.fillRect(x0, barY, filledW, barH);

      if (dropped > 0) {
        var dropX = x0 + filledW, dropW = usableW - filledW;

        ctx.save();
        ctx.beginPath();
        ctx.rect(dropX, barY, dropW, barH);
        ctx.clip();
        ctx.strokeStyle = colorFaint;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var hx = dropX - barH; hx < dropX + dropW; hx += 10) {
          ctx.moveTo(hx, barY + barH);
          ctx.lineTo(hx + barH, barY);
        }
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = colorInk;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(dropX, barY - 14);
        ctx.lineTo(dropX, barY + barH + 14);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = colorInk;
        ctx.font = "11px " + getComputedStyle(fig).getPropertyValue("--mono");
        ctx.textAlign = "center";
        ctx.fillText("BLOCK_SIZE", dropX, barY - 20);
      }

      ctx.fillStyle = colorFaint;
      ctx.font = "11px " + getComputedStyle(fig).getPropertyValue("--mono");
      ctx.textAlign = "left";
      ctx.fillText("0", x0, barY + barH + 24);
      ctx.textAlign = "right";
      ctx.fillText(String(ncols), x0 + usableW, barY + barH + 24);
    }

    function render() {
      var ncols = Number(range.value);
      var block = computeBlock(ncols);
      var dropped = Math.max(0, ncols - block);
      var matches = dropped === 0;

      ncolsOut.textContent = ncols;
      blockOut.textContent = block;
      droppedOut.textContent = dropped;
      matchOut.textContent = matches ? "True" : "False";
      matchOut.classList.toggle("is-broken", !matches);

      draw(ncols, block, dropped);
    }

    range.addEventListener("input", render);

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-mode");

        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });

        placeSwitch();
        render();
      });
    });

    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        readColors();
        render();
      }).observe(fig);
    }

    readColors();
    fig.classList.add("is-ready");
    placeSwitch();
    render();
  });

  /* ------------------------------------------------------------
     Colormap carousel dots

     Plain anchor navigation loses to the track's mandatory scroll
     snapping: the browser scrolls the *page* down to the slide
     instead of scrolling the track sideways to it. Drive the
     horizontal scroll directly instead, and keep the page still.
     ------------------------------------------------------------ */
  run(function () {
    var dots = Array.prototype.slice.call(
      document.querySelectorAll(".colormap-dots a")
    );

    if (!dots.length) {
      return;
    }

    dots.forEach(function (dot) {
      dot.addEventListener(
        "click",
        function (e) {
          var id = dot.getAttribute("href");

          var slide =
            id && id.charAt(0) === "#"
              ? document.getElementById(id.slice(1))
              : null;

          if (!slide) {
            return;
          }

          e.preventDefault();

          slide.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "nearest",
            inline: "center"
          });
        }
      );
    });
  });

  /* ------------------------------------------------------------
     In-app browser escape hatch

     Instagram (and Facebook, same WebView family) open bio/profile
     links in their own embedded browser rather than the visitor's real
     one - noticeably slower, since it re-fetches everything with no
     shared cache and Instagram injects its own scripts into the page.
     There's no header or meta tag that opts out of this; the only lever
     available from the page itself is offering a way out once the
     visitor is already there.
     ------------------------------------------------------------ */
  run(function () {
    var ua = navigator.userAgent || "";

    if (!/Instagram|FBAN|FBAV/i.test(ua)) {
      return;
    }

    try {
      if (sessionStorage.getItem("dismissedIabBanner") === "1") {
        return;
      }
    } catch (e) {}

    var isAndroid = /Android/i.test(ua);
    var isIOS = /iPhone|iPad|iPod/i.test(ua);

    var banner = document.createElement("div");
    banner.className = "iab-banner";

    var msg = document.createElement("span");

    if (isAndroid) {
      msg.appendChild(
        document.createTextNode("This browser can run slower than your own. ")
      );

      var link = document.createElement("a");

      /* A generic VIEW intent with no package attached hands the URL to
         whatever the visitor already has set as their default browser -
         Chrome, Brave, Firefox, Opera, whichever - or a chooser if they
         have none set. Works from inside Instagram's WebView because
         Android resolves the intent at the OS level, not inside the app
         that's currently displaying the page. */
      link.href =
        "intent://" +
        location.host +
        location.pathname +
        location.search +
        "#Intent;scheme=https;action=android.intent.action.VIEW;end";
      link.textContent = "Open in your browser";
      msg.appendChild(link);
    } else if (isIOS) {
      /* iOS gives a page no way to hand itself to Safari or any other
         browser from script - the only route out is Instagram's own
         menu, which already has this built in. */
      msg.appendChild(
        document.createTextNode(
          'This browser can run slower than your own. Tap the ⋯ menu above and choose "Open in Safari" (or your browser) for the full experience.'
        )
      );
    } else {
      msg.appendChild(
        document.createTextNode(
          "You're viewing this inside Instagram's built-in browser, which can run slower than your own."
        )
      );
    }

    banner.appendChild(msg);

    var close = document.createElement("button");
    close.type = "button";
    close.className = "iab-close";
    close.setAttribute("aria-label", "Dismiss");
    close.textContent = "×";

    close.addEventListener("click", function () {
      banner.remove();

      try {
        sessionStorage.setItem("dismissedIabBanner", "1");
      } catch (e) {}
    });

    banner.appendChild(close);
    document.body.insertBefore(banner, document.body.firstChild);
  });

  /* ------------------------------------------------------------
     3D structure viewer (3Dmol.js)

     Two AlphaFold predictions, side by side, colored by pLDDT using
     AlphaFold Server's own four-band scheme - read straight out of
     the PDB's B-factor column, where AlphaFold/ColabFold write
     per-residue confidence. 3Dmol is self-hosted (vendor/3Dmol-min.js)
     rather than pulled from a CDN, so it sits inside the site's
     existing script-src 'self' CSP with no exception needed, and it's
     injected here rather than added as a permanent <script> tag,
     because at ~525KB it's the one page-weight-heavy dependency on
     the whole site - no reason to pay for it on pages that don't use
     it. */
  run(function () {
    var fig = document.getElementById("structure-demo");

    if (!fig) {
      return;
    }

    var panels = Array.prototype.slice.call(
      fig.querySelectorAll(".structure-viewer")
    );

    if (!panels.length) {
      return;
    }

    /* AlphaFold's own thresholds, applied to the B-factor 3Dmol
       exposes as atom.b - not a gradient, four fixed bands. */
    function plddtColor(atom) {
      var b = atom.b;
      if (b > 90) return "#0053D6";
      if (b > 70) return "#65CBF3";
      if (b > 50) return "#FFDB13";
      return "#FF7D45";
    }

    function paperColor() {
      return getComputedStyle(fig).getPropertyValue("--paper").trim() ||
        "#faf9f7";
    }

    var viewers = [];

    function repaintBackground() {
      var bg = paperColor();
      viewers.forEach(function (v) {
        v.setBackgroundColor(bg);
        v.render();
      });
    }

    function resizeAll() {
      viewers.forEach(function (v) { v.resize(); });
    }

    /* PAE (predicted aligned error): AlphaFold Server's own green
       scale, 0 Angstrom at white up to the fixed 31 Angstrom cutoff at
       its darkest - not a gradient chosen for looks, the actual
       documented range. */
    function paeColor(v) {
      /* Low error (0) is the confident case and reads as dark green;
         high error (31, the documented cutoff) fades toward white. */
      var t = Math.min(Math.max(v, 0), 31) / 31;
      return [
        Math.round(0 + t * (255 - 0)),
        Math.round(68 + t * (255 - 68)),
        Math.round(27 + t * (255 - 27))
      ];
    }

    function drawPae(canvas, matrix) {
      var n = matrix.length;
      canvas.width = n;
      canvas.height = n;

      var ctx = canvas.getContext("2d");
      var img = ctx.createImageData(n, n);

      for (var y = 0; y < n; y++) {
        var row = matrix[y];

        for (var x = 0; x < n; x++) {
          var rgb = paeColor(row[x]);
          var idx = (y * n + x) * 4;

          img.data[idx] = rgb[0];
          img.data[idx + 1] = rgb[1];
          img.data[idx + 2] = rgb[2];
          img.data[idx + 3] = 255;
        }
      }

      ctx.putImageData(img, 0, 0);
    }

    function fmtScore(v) {
      return typeof v === "number" ? v.toFixed(2) : null;
    }

    /* ipTM only exists for the interface between chains, so it's null
       for every single-chain job - said outright rather than just
       hidden, so it reads as "doesn't apply here" and not "missing". */
    function setScores(el, ptm, iptm) {
      var ptmText = fmtScore(ptm);
      var iptmText = fmtScore(iptm);

      el.innerHTML = "pTM <b>" + (ptmText || "n/a") + "</b> &middot; ipTM <b>" +
        (iptmText || "n/a") + "</b>" + (iptmText ? "" : " (single chain)");
    }

    function boot() {
      var loads = panels.map(function (el) {
        var panel = el.closest(".structure-panel");
        var paeCanvas = panel && panel.querySelector(".structure-pae");
        var scoresEl = panel && panel.querySelector(".structure-scores");
        var pdbSrc = el.getAttribute("data-src");

        var pdbLoad = fetch(pdbSrc).then(function (r) {
          if (!r.ok) {
            throw new Error("fetch failed: " + pdbSrc);
          }
          return r.text();
        });

        var paeLoad = paeCanvas
          ? fetch(paeCanvas.getAttribute("data-pae-src")).then(function (r) {
              if (!r.ok) {
                throw new Error("fetch failed: " + paeCanvas.getAttribute("data-pae-src"));
              }
              return r.json();
            })
          : Promise.resolve(null);

        return Promise.all([pdbLoad, paeLoad]).then(function (loaded) {
          return {
            el: el,
            paeCanvas: paeCanvas,
            scoresEl: scoresEl,
            pdbText: loaded[0],
            paeData: loaded[1]
          };
        });
      });

      Promise.all(loads).then(function (results) {
        /* The panels are display:none until is-ready, so they have no
           real size to measure before this point - create the 3Dmol
           viewers only once the layout is real, matching the same
           reasoning as every other canvas widget on this site. */
        fig.classList.add("is-ready");

        results.forEach(function (r) {
          var viewer = window.$3Dmol.createViewer(r.el, {
            backgroundColor: paperColor()
          });

          viewer.addModel(r.pdbText, "pdb");
          viewer.setStyle({}, { cartoon: { colorfunc: plddtColor } });
          viewer.zoomTo();
          viewer.render();
          viewers.push(viewer);

          if (r.paeData) {
            if (r.scoresEl) {
              setScores(r.scoresEl, r.paeData.ptm, r.paeData.iptm);
            }

            if (r.paeCanvas) {
              drawPae(r.paeCanvas, r.paeData.pae);
            }
          }
        });

        addEventListener("resize", resizeAll);

        var mo = new MutationObserver(repaintBackground);
        mo.observe(doc, { attributes: true, attributeFilter: ["data-theme"] });
      }).catch(function () {
        /* Matches the rest of the site: a failed fetch leaves the
           widget exactly as authored - nothing rendered - rather than
           showing a broken viewer. */
      });
    }

    var script = document.createElement("script");
    script.src = "vendor/3Dmol-min.js";
    script.onload = boot;
    document.head.appendChild(script);
  });
})();