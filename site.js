/* Quiet site behaviors: theme, reading memory, scrollbar, and homepage carousel. */
(function () {
  var doc = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var safeStore = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    remove: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  function run(fn) { try { fn(); } catch (e) {} }

  run(function () {
    var stored = safeStore.get("theme");
    if (stored === "dark" || stored === "light") doc.setAttribute("data-theme", stored);
    var button = document.querySelector(".theme-toggle");
    if (!button) return;
    function current() {
      return doc.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    function paint() { button.textContent = current() === "dark" ? "light" : "dark"; }
    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      safeStore.set("theme", next);
      paint();
    });
    paint();
  });

  run(function () {
    var hideTimer;
    addEventListener("scroll", function () {
      doc.classList.add("scrolling");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { doc.classList.remove("scrolling"); }, 900);
    }, { passive: true });
  });

  function readLast() {
    try { return JSON.parse(safeStore.get("log:last") || "null"); } catch (e) { return null; }
  }

  run(function () {
    var slug = location.pathname.split("/").pop() || "index.html";
    var key = "log:progress:" + slug;
    var article = document.querySelector("article.post.entry");
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
          if (last && last.slug === slug) safeStore.remove("log:last");
        } else if (scrollY > 300) {
          safeStore.set(key, String(Math.round(scrollY)));
          safeStore.set("log:last", JSON.stringify({ slug: slug, title: document.querySelector("h1").textContent }));
        }
      }, 200);
    }, { passive: true });
    var saved = parseInt(safeStore.get(key) || "0", 10);
    if (saved > 300) {
      var p = document.createElement("p");
      p.className = "resume";
      var a = document.createElement("a");
      a.href = "#";
      a.textContent = "Pick up where you left off ↓";
      a.addEventListener("click", function (e) { e.preventDefault(); scrollTo({ top: saved, behavior: reduced ? "auto" : "smooth" }); });
      p.appendChild(a);
      document.querySelector(".post-meta").after(p);
    }
  });

  run(function () {
    var contact = document.querySelector("a.contact");
    if (!contact) return;
    contact.href = "mailto:sshaurya595@" + ["gmail", "com"].join(".");
  });

  run(function () {
    var list = document.querySelector("ul.posts");
    if (!list) return;
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

  run(function () {
    var orbit = document.querySelector(".article-orbit");
    var items = orbit && Array.prototype.slice.call(document.querySelectorAll(".orbit-item"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".feature-card"));
    if (!orbit || !items.length || !cards.length) return;

    var active = 0;
    var radius = 0;
    var step = items.length > 1 ? (Math.PI * 2) / (items.length - 1) : 0;

    function layout() {
      var rect = orbit.getBoundingClientRect();
      radius = Math.min(rect.width, rect.height) * 0.34;
      var cx = rect.width / 2, cy = rect.height / 2;
      items.forEach(function (item, i) {
        var isActive = i === active;
        var offset = (i - active + items.length) % items.length;
        var angle = (offset - 1) * step - Math.PI / 2;
        var x = cx + Math.cos(angle) * radius;
        var y = cy + Math.sin(angle) * radius;
        item.classList.toggle("is-active", isActive);
        item.style.setProperty("--x", (isActive ? 0 : x - cx) + "px");
        item.style.setProperty("--y", (isActive ? 0 : y - cy) + "px");
        item.style.setProperty("--depth", String(isActive ? 1 : 1 - Math.abs(Math.sin(angle)) * 0.35));
        item.style.setProperty("--opacity", isActive ? "0" : "0.72");
      });
      cards.forEach(function (card, i) {
        var on = i === active;
        card.classList.toggle("is-active", on);
        card.setAttribute("aria-hidden", on ? "false" : "true");
      });
      var center = orbit.querySelector(".orbit-center");
      if (center) {
        center.querySelector("span").textContent = String(active + 1).padStart(2, "0");
        center.querySelector("strong").textContent = cards[active].querySelector("h1").textContent;
        center.querySelector("small").textContent = items[active].querySelector(".orbit-date").textContent;
        center.href = cards[active].querySelector(".feature-head").href;
      }
    }

    function select(index) {
      active = (index + items.length) % items.length;
      layout();
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function () { select(i); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(i + 1); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(i - 1); }
      });
    });
    orbit.querySelector(".orbit-next").addEventListener("click", function () { select(active + 1); });
    orbit.querySelector(".orbit-prev").addEventListener("click", function () { select(active - 1); });
    addEventListener("resize", layout);
    layout();
  });
})();
