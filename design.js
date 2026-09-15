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
