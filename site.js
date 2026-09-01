/* Quiet site behaviors: theme, reading memory, tape navigation, scrollbar, and page transitions. */
(function () {
  var doc = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var safeStore = {
    get: function (k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, v); } catch (e) {}
    },
    remove: function (k) {
      try { localStorage.removeItem(k); } catch (e) {}
    }
  };

  function run(fn) {
    try { fn(); } catch (e) {}
  }

  /* ------------------------------------------------------------
     Transitions
     ------------------------------------------------------------ */

  run(function () {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "transitions.css";
    link.setAttribute("blocking", "render");
    document.head.appendChild(link);
  });

  /* ------------------------------------------------------------
     Theme
     ------------------------------------------------------------ */

  run(function () {
    var stored = safeStore.get("theme");

    if (stored === "dark" || stored === "light") {
      doc.setAttribute("data-theme", stored);
    }

    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    function current() {
      return doc.getAttribute("data-theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
    }

    function paint() {
      button.textContent = current() === "dark"
        ? "light"
        : "dark";
    }

    button.addEventListener("click", function () {
      var next = current() === "dark"
        ? "light"
        : "dark";

      doc.setAttribute("data-theme", next);
      safeStore.set("theme", next);
      paint();
    });

    paint();
  });

  /* ------------------------------------------------------------
     Scrollbar
     ------------------------------------------------------------ */

  run(function () {
    var hideTimer;

    addEventListener("scroll", function () {
      doc.classList.add("scrolling");

      clearTimeout(hideTimer);

      hideTimer = setTimeout(function () {
        doc.classList.remove("scrolling");
      }, 900);
    }, { passive: true });
  });

  function readLast() {
    try {
      return JSON.parse(
        safeStore.get("log:last") || "null"
      );
    } catch (e) {
      return null;
    }
  }

  /* ------------------------------------------------------------
     Reading progress
     ------------------------------------------------------------ */

  run(function () {
    var slug =
      location.pathname.split("/").pop() || "index.html";

    var key = "log:progress:" + slug;
    var article =
      document.querySelector("article.post.entry");

    if (!article) return;

    var saveTimer;

    addEventListener("scroll", function () {
      clearTimeout(saveTimer);

      saveTimer = setTimeout(function () {
        var max = doc.scrollHeight - innerHeight;

        if (max <= 0) return;

        if (scrollY > max - 80) {
          safeStore.remove(key);

          var last = readLast();

          if (last && last.slug === slug) {
            safeStore.remove("log:last");
          }
        } else if (scrollY > 300) {
          safeStore.set(
            key,
            String(Math.round(scrollY))
          );

          safeStore.set(
            "log:last",
            JSON.stringify({
              slug: slug,
              title: document.querySelector("h1").textContent
            })
          );
        }
      }, 200);
    }, { passive: true });

    var saved = parseInt(
      safeStore.get(key) || "0",
      10
    );

    if (saved > 300) {
      var p = document.createElement("p");
      p.className = "resume";

      var a = document.createElement("a");
      a.href = "#";
      a.textContent = "Pick up where you left off ↓";

      a.addEventListener("click", function (e) {
        e.preventDefault();

        scrollTo({
          top: saved,
          behavior: reduced ? "auto" : "smooth"
        });
      });

      p.appendChild(a);

      document
        .querySelector(".post-meta")
        .after(p);
    }
  });

  /* ------------------------------------------------------------
     Contact
     ------------------------------------------------------------ */

  run(function () {
    var contact =
      document.querySelector("a.contact");

    if (contact) {
      contact.href =
        "mailto:sshaurya595@" +
        ["gmail", "com"].join(".");
    }
  });

  /* ------------------------------------------------------------
     Continue reading
     ------------------------------------------------------------ */

  run(function () {
    var list = document.querySelector("ul.posts");
    if (!list) return;

    var last = readLast();

    if (
      !last ||
      !safeStore.get("log:progress:" + last.slug)
    ) {
      return;
    }

    var line = document.createElement("p");
    line.className = "continue";

    var label = document.createElement("span");
    label.className = "label";
    label.textContent = "Continue";

    var link = document.createElement("a");
    link.href = last.slug;
    link.textContent = last.title;

    line.appendChild(label);
    line.appendChild(link);

    list.parentNode.insertBefore(line, list);
  });

  /* ------------------------------------------------------------
     Turing tape navigation
     ------------------------------------------------------------ */

  run(function () {
    var tape =
      document.querySelector(".article-orbit.tape-nav");

    var cells = tape
      ? Array.prototype.slice.call(
          tape.querySelectorAll(".tape-cell")
        )
      : [];

    var cards =
      Array.prototype.slice.call(
        document.querySelectorAll(".feature-card")
      );

    if (!tape || !cells.length || !cards.length) {
      return;
    }

    var viewport =
      tape.querySelector(".tape-viewport");

    var head =
      tape.querySelector(".tape-read-head");

    /* Create the head automatically if necessary. */
    if (!head && viewport) {
      head = document.createElement("div");
      head.className = "tape-read-head";
      head.setAttribute("aria-hidden", "true");
      viewport.appendChild(head);
    }

    var active = cells.findIndex(function (cell) {
      return cell.classList.contains("is-active");
    });

    if (active < 0) {
      active = 0;
    }

    /* Diagram draw-in: fires once per card, the first time it becomes
       active, via a CSS keyframe (see .is-drawn in home.css). Reduced
       motion is handled entirely in CSS, so this just needs the class. */
    function playDraw(card) {
      if (!card || card.dataset.animated === "1") {
        return;
      }

      card.dataset.animated = "1";
      card.classList.add("is-drawn");
    }

    playDraw(cards[active]);

    function moveReadHead(animate) {
      if (!head || !viewport || !cells[active]) {
        return;
      }

      var cell = cells[active];

      var x =
        cell.offsetLeft +
        cell.offsetWidth / 2 -
        viewport.offsetLeft;

      if (!animate || reduced) {
        head.style.transition = "none";

        head.style.transform =
          "translateX(" + x + "px)";

        void head.offsetWidth;

        head.style.transition =
          "transform 650ms cubic-bezier(.16,.78,.18,1)";
      } else {
        head.style.transform =
          "translateX(" + x + "px)";
      }
    }

    function select(index, focus) {
      var previous = active;

      active =
        (index + cells.length) %
        cells.length;

      var moved = previous !== active;

      cells.forEach(function (cell, i) {
        var on = i === active;

        cell.classList.toggle(
          "is-active",
          on
        );

        cell.setAttribute(
          "aria-current",
          on ? "true" : "false"
        );

        if (on && focus) {
          cell.focus();
        }
      });

      cards.forEach(function (card, i) {
        var on = i === active;

        card.classList.toggle(
          "is-active",
          on
        );

        card.setAttribute(
          "aria-hidden",
          on ? "false" : "true"
        );
      });

      if (moved) {
        moveReadHead(true);
      }

      playDraw(cards[active]);

      cells[active].scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "nearest",
        inline: "center"
      });
    }

    /* Cell clicks */
    cells.forEach(function (cell, i) {
      cell.addEventListener(
        "click",
        function () {
          select(i, false);
        }
      );

      cell.addEventListener(
        "keydown",
        function (e) {
          if (
            e.key === "ArrowRight" ||
            e.key === "ArrowDown"
          ) {
            e.preventDefault();
            select(i + 1, true);
          }

          if (
            e.key === "ArrowLeft" ||
            e.key === "ArrowUp"
          ) {
            e.preventDefault();
            select(i - 1, true);
          }
        }
      );
    });

    /* Previous / next arrows */
    var next =
      tape.querySelector(".tape-next");

    var prev =
      tape.querySelector(".tape-prev");

    if (next) {
      next.addEventListener(
        "click",
        function () {
          select(active + 1, false);
        }
      );
    }

    if (prev) {
      prev.addEventListener(
        "click",
        function () {
          select(active - 1, false);
        }
      );
    }

    addEventListener(
      "resize",
      function () {
        moveReadHead(false);
      }
    );

    /* Initial position — no animation. */
    moveReadHead(false);
  });

  /* ------------------------------------------------------------
     About-the-log discovery
     ------------------------------------------------------------ */

  run(function () {
    var intro =
      document.querySelector(".home-intro");

    if (
      !intro ||
      document.querySelector(".log-discovery")
    ) {
      return;
    }

    var discovery =
      document.createElement("section");

    discovery.className = "log-discovery";
    discovery.setAttribute(
      "aria-label",
      "About the log"
    );

    discovery.innerHTML =
      '<button class="log-discovery-trigger" ' +
      'type="button" aria-expanded="false" ' +
      'aria-controls="log-discovery-panel">' +
      '<span aria-hidden="true">◇</span>' +
      '<span class="sr-only">About this log</span>' +
      '</button>' +
      '<div class="log-discovery-panel" ' +
      'id="log-discovery-panel">' +
      '<span class="log-discovery-label">' +
      'ABOUT THE LOG' +
      '</span>' +
      '<p></p>' +
      '</div>';

    discovery
      .querySelector(
        ".log-discovery-panel p"
      )
      .textContent =
      intro.textContent.trim();

    intro.replaceWith(discovery);

    var trigger =
      discovery.querySelector(
        ".log-discovery-trigger"
      );

    function setOpen(open) {
      discovery.classList.toggle(
        "is-open",
        open
      );

      trigger.setAttribute(
        "aria-expanded",
        String(open)
      );
    }

    trigger.addEventListener(
      "click",
      function (e) {
        e.stopPropagation();

        setOpen(
          !discovery.classList.contains(
            "is-open"
          )
        );
      }
    );

    document.addEventListener(
      "click",
      function (e) {
        if (!discovery.contains(e.target)) {
          setOpen(false);
        }
      }
    );

    discovery.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Escape") {
          setOpen(false);
          trigger.focus();
        }
      }
    );
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

          render();
        });
      });

      fig.classList.add("is-ready");
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
})();