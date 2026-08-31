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

      range.max = String(data.epochs.length - 1);
      range.value = range.max;

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