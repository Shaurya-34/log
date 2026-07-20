/* The only JS on the site. Three quiet behaviors:
   1. ghost scrollbar: thumb visible only while scrolling
   2. reading memory: posts remember your place; the homepage offers
      to continue the last unfinished post
   3. theme toggle: dark mode, remembered across visits
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
