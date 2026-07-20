/* The only JS on the site. Four quiet behaviors:
   1. ghost scrollbar: thumb visible only while scrolling
   2. reading memory: posts remember your place; the homepage offers
      to continue the last unfinished post
   3. theme toggle: dark mode, remembered across visits
   4. link preview: hover/focus an external link to see a card built
      from data baked in at build time (build.py); nothing fetched here
   Everything works without this file; it only adds.

   Each behavior is isolated in its own try/catch and all storage access
   goes through safeStore, so one feature failing (e.g. localStorage
   throwing under strict privacy settings) can never take down the rest. */
(function () {
  var doc = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* localStorage can throw just on access under some privacy settings;
     never let that halt the script. */
  var safeStore = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    remove: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  function run(fn) { try { fn(); } catch (e) {} }

  /* ---- link preview cards ----
     delegated on the document so it works no matter which line fragment
     of a wrapped link you're actually over. Set up first so nothing else
     can prevent it. */
  run(function () {
    var previewLinks = document.querySelectorAll("a[data-preview-title]");
    if (!previewLinks.length) return;

    var card = document.createElement("div");
    card.className = "link-preview";
    card.setAttribute("role", "tooltip");
    document.body.appendChild(card);

    var showTimer, hideTimer, activeLink = null;
    var SEL = "a[data-preview-title]";

    var positionCard = function (link) {
      var r = link.getClientRects()[0] || link.getBoundingClientRect();
      var top = r.bottom + 8;
      if (top + card.offsetHeight > innerHeight - 8) {
        top = r.top - card.offsetHeight - 8;
      }
      var left = Math.min(r.left, innerWidth - card.offsetWidth - 12);
      card.style.top = Math.max(8, top) + "px";
      card.style.left = Math.max(12, left) + "px";
    };

    var showCard = function (link) {
      card.textContent = "";
      var site = document.createElement("span");
      site.className = "site";
      site.textContent = link.getAttribute("data-preview-site") || "";
      var title = document.createElement("span");
      title.className = "title";
      title.textContent = link.getAttribute("data-preview-title") || "";
      card.appendChild(site);
      card.appendChild(title);
      var descText = link.getAttribute("data-preview-desc");
      if (descText) {
        var desc = document.createElement("span");
        desc.className = "desc";
        desc.textContent = descText;
        card.appendChild(desc);
      }
      positionCard(link);
      card.classList.add("visible");
    };

    var hideCard = function () {
      activeLink = null;
      card.classList.remove("visible");
    };

    var closestLink = function (el) {
      while (el && el !== document) {
        if (el.nodeType === 1 && el.hasAttribute("data-preview-title")) return el;
        el = el.parentNode;
      }
      return null;
    };

    document.addEventListener("mouseover", function (e) {
      var link = closestLink(e.target);
      if (!link || link === activeLink) return;
      activeLink = link;
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
      showTimer = setTimeout(function () { showCard(link); }, 120);
    });

    document.addEventListener("mouseout", function (e) {
      if (!closestLink(e.target)) return;
      if (closestLink(e.relatedTarget) === activeLink && activeLink) return;
      clearTimeout(showTimer);
      hideTimer = setTimeout(hideCard, 100);
    });

    for (var i = 0; i < previewLinks.length; i++) {
      (function (link) {
        link.addEventListener("focus", function () { showCard(link); });
        link.addEventListener("blur", hideCard);
      })(previewLinks[i]);
    }
  });

  /* ---- theme toggle ----
     defaults to the OS preference (handled entirely in CSS); an
     explicit click is remembered and always wins. */
  run(function () {
    var storedTheme = safeStore.get("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      doc.setAttribute("data-theme", storedTheme);
    }

    var themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) return;

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
      safeStore.set("theme", next);
      paintToggle();
    });
    paintToggle();
  });

  /* ---- ghost scrollbar ---- */
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
    try { return JSON.parse(safeStore.get("log:last") || "null"); }
    catch (e) { return null; }
  }

  /* ---- reading memory ---- */
  run(function () {
    var slug = location.pathname.split("/").pop() || "index.html";
    var KEY = "log:progress:" + slug;
    var article = document.querySelector("article.post.entry");
    if (!article) return;

    var saveTimer;
    addEventListener("scroll", function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        var max = doc.scrollHeight - innerHeight;
        if (max <= 0) return;
        if (scrollY > max - 80) {
          safeStore.remove(KEY);
          var last = readLast();
          if (last && last.slug === slug) safeStore.remove("log:last");
        } else if (scrollY > 300) {
          safeStore.set(KEY, String(Math.round(scrollY)));
          safeStore.set("log:last", JSON.stringify({
            slug: slug,
            title: document.querySelector("h1").textContent
          }));
        }
      }, 200);
    }, { passive: true });

    var saved = parseInt(safeStore.get(KEY) || "0", 10);
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
  });

  /* ---- contact link ----
     assembled at runtime so the address never appears in the HTML. */
  run(function () {
    var contact = document.querySelector("a.contact");
    if (!contact) return;
    var user = "sshaurya595";
    var host = ["gmail", "com"].join(".");
    contact.href = "mailto:" + user + "@" + host;
  });

  /* ---- continue-reading line on the homepage ---- */
  run(function () {
    var listEl = document.querySelector("ul.posts");
    if (!listEl) return;
    var last = readLast();
    if (!last || !safeStore.get("log:progress:" + last.slug)) return;

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
    var intro = document.querySelector(".intro");
    if (intro) intro.after(line);
  });
})();
