/* The only JS on the site. Four quiet behaviors:
   1. ghost scrollbar: thumb visible only while scrolling
   2. reading memory: posts remember your place; the homepage offers
      to continue the last unfinished post
   3. theme toggle: dark mode, remembered across visits
   4. link preview: hover/focus an external link to see a card built
      from data baked in at build time (build.py); nothing fetched here
   Everything works without this file; it only adds. */
(function () {
  var doc = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- theme toggle ----
     defaults to the OS preference (handled entirely in CSS); an
     explicit click is remembered in localStorage and always wins. */
  var storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    doc.setAttribute("data-theme", storedTheme);
  }

  var themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    var currentTheme = function () {
      var explicit = doc.getAttribute("data-theme");
      if (explicit) return explicit;
      return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };
    var paintToggle = function () {
      themeToggle.textContent = currentTheme() === "dark" ? "light" : "dark";
    };
    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      paintToggle();
    });
    paintToggle();
  }

  /* ---- link preview cards ----
     delegated on the document so it works no matter which line fragment
     of a wrapped link you're actually over (per-link mouseenter can miss
     the gap between lines on a two-line link). */
  var previewLinks = document.querySelectorAll("a[data-preview-title]");
  if (previewLinks.length) {
    var card = document.createElement("div");
    card.className = "link-preview";
    card.setAttribute("role", "tooltip");
    document.body.appendChild(card);

    var showTimer, hideTimer, activeLink = null;
    var SEL = "a[data-preview-title]";

    var positionCard = function (link, anchorRect) {
      var r = anchorRect || link.getClientRects()[0] || link.getBoundingClientRect();
      var top = r.bottom + 8;
      if (top + card.offsetHeight > innerHeight - 8) {
        top = r.top - card.offsetHeight - 8;
      }
      var left = Math.min(r.left, innerWidth - card.offsetWidth - 12);
      card.style.top = Math.max(8, top) + "px";
      card.style.left = Math.max(12, left) + "px";
    };

    var showCard = function (link, anchorRect) {
      card.textContent = "";
      var site = document.createElement("span");
      site.className = "site";
      site.textContent = link.dataset.previewSite || "";
      var title = document.createElement("span");
      title.className = "title";
      title.textContent = link.dataset.previewTitle || "";
      card.appendChild(site);
      card.appendChild(title);
      if (link.dataset.previewDesc) {
        var desc = document.createElement("span");
        desc.className = "desc";
        desc.textContent = link.dataset.previewDesc;
        card.appendChild(desc);
      }
      positionCard(link, anchorRect);
      card.classList.add("visible");
    };

    var hideCard = function () {
      activeLink = null;
      card.classList.remove("visible");
    };

    document.addEventListener("mouseover", function (e) {
      var link = e.target.closest && e.target.closest(SEL);
      if (!link || link === activeLink) return;
      activeLink = link;
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
      showTimer = setTimeout(function () { showCard(link); }, 120);
    });

    document.addEventListener("mouseout", function (e) {
      var link = e.target.closest && e.target.closest(SEL);
      if (!link) return;
      var to = e.relatedTarget;
      if (to && to.closest && to.closest(SEL) === link) return; // still on it
      clearTimeout(showTimer);
      hideTimer = setTimeout(hideCard, 100);
    });

    previewLinks.forEach(function (link) {
      link.addEventListener("focus", function () { showCard(link); });
      link.addEventListener("blur", hideCard);
    });
  }

  /* ---- ghost scrollbar ---- */
  var hideTimer;
  addEventListener("scroll", function () {
    doc.classList.add("scrolling");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      doc.classList.remove("scrolling");
    }, 900);
  }, { passive: true });

  /* ---- reading memory ---- */
  var slug = location.pathname.split("/").pop() || "index.html";
  var KEY = "log:progress:" + slug;
  var LAST = "log:last";
  var article = document.querySelector("article.post.entry");

  function readLast() {
    try { return JSON.parse(localStorage.getItem(LAST) || "null"); }
    catch (e) { return null; }
  }

  if (article) {
    var saveTimer;
    addEventListener("scroll", function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        var max = doc.scrollHeight - innerHeight;
        if (max <= 0) return;
        if (scrollY > max - 80) {
          /* reached the end: nothing to resume */
          localStorage.removeItem(KEY);
          var last = readLast();
          if (last && last.slug === slug) localStorage.removeItem(LAST);
        } else if (scrollY > 300) {
          localStorage.setItem(KEY, String(Math.round(scrollY)));
          localStorage.setItem(LAST, JSON.stringify({
            slug: slug,
            title: document.querySelector("h1").textContent
          }));
        }
      }, 200);
    }, { passive: true });

    var saved = parseInt(localStorage.getItem(KEY) || "0", 10);
    if (saved > 300) {
      var p = document.createElement("p");
      p.className = "resume";
      var a = document.createElement("a");
      a.href = "#";
      a.textContent = "Pick up where you left off ↓";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        scrollTo({ top: saved, behavior: reduced ? "auto" : "smooth" });
      });
      p.appendChild(a);
      document.querySelector(".post-meta").after(p);
    }
  }

  /* ---- contact link ----
     assembled at runtime so the address never appears in the HTML,
     which defeats scrapers that read source without executing JS */
  var contact = document.querySelector("a.contact");
  if (contact) {
    var user = "sshaurya595";
    var host = ["gmail", "com"].join(".");
    contact.href = "mailto:" + user + "@" + host;
  }

  var list = document.querySelector("ul.posts");
  if (list) {
    var last = readLast();
    if (last && localStorage.getItem("log:progress:" + last.slug)) {
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
      document.querySelector(".intro").after(line);
    }
  }
})();
