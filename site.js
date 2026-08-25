/* Quiet site behaviors: theme, reading memory, tape navigation, sounds, scrollbar, and page transitions. */
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
     Audio
     ------------------------------------------------------------ */

  var SOUND = {
    readHead: "assets/sounds/read-head-click.wav",
    selection: "assets/sounds/selection-tick.wav",
    theme: "assets/sounds/theme-switch.wav"
  };

  function playSound(src, volume) {
    try {
      var audio = new Audio(src);
      audio.volume = volume == null ? 0.45 : volume;

      var promise = audio.play();
      if (promise && promise.catch) {
        promise.catch(function () {});
      }
    } catch (e) {}
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

      playSound(SOUND.theme, 0.5);
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

        playSound(SOUND.selection, 0.4);

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

    link.addEventListener("click", function () {
      playSound(SOUND.selection, 0.4);
    });

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
        /* Immediate selection sound. */
        playSound(
          SOUND.selection,
          0.38
        );

        /* Move the head. */
        moveReadHead(true);

        /* Mechanical click when the head arrives. */
        setTimeout(function () {
          playSound(
            SOUND.readHead,
            0.5
          );
        }, reduced ? 0 : 650);
      }

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

    /* Initial position: no sound. */
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

        playSound(
          SOUND.selection,
          0.38
        );

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
     Deliberate navigation links
     ------------------------------------------------------------ */

  run(function () {
    var selectors = [
      ".feature-head",
      ".post-nav a",
      ".post-nav .older",
      ".post-nav .newer",
      "a[href='about.html']",
      "a[href='index.html']",
      "a[href='feed.xml']"
    ];

    document
      .querySelectorAll(selectors.join(","))
      .forEach(function (link) {
        link.addEventListener("click", function () {
          playSound(
            SOUND.selection,
            0.32
          );
        });
      });
  });

})();
