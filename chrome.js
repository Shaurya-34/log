/* Page chrome shared by every page in the new design, loaded in <head>
   without defer so the saved theme is on <html> before first paint.

   The theme preference uses the live site's own key ("theme"), so a
   choice made on either design carries over to the other. The toggle
   and share button use their own classes (.mode-toggle, .share) so
   site.js, which also runs on post pages, never double-binds them. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var darkQuery = matchMedia("(prefers-color-scheme: dark)");

  try {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") doc.setAttribute("data-theme", saved);
  } catch (e) {}


  function mode() {
    return doc.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light");
  }

  /* site.js's canvas widgets read their colours when they (re)draw, not
     when the theme changes, so give each one the nudge it already
     answers to. The 3D viewer and every CSS-styled widget need nothing. */
  function repaintWidgets() {
    var ray = document.querySelector('.ray-switch button[aria-pressed="true"]');
    if (ray) ray.click();                         /* re-renders the scene */
    var chaos = document.querySelector(".chaos-restart");
    if (chaos) chaos.click();                     /* restarts in the new ink */
    /* these two re-read their inks from a ResizeObserver, so a 1px nudge
       repaints them */
    ["birthday-demo", "blocksize-demo"].forEach(function (id) {
      var fig = document.getElementById(id);
      if (!fig) return;
      fig.style.paddingRight = "1px";
      requestAnimationFrame(function () { fig.style.paddingRight = ""; });
    });
    document.dispatchEvent(new CustomEvent("themechange"));
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".mode-toggle");

    function paint() {
      if (!toggle) return;
      var next = mode() === "dark" ? "light" : "dark";
      toggle.textContent = next;
      toggle.setAttribute("aria-label", "Switch to " + next + " theme");
    }

    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener("click", function () {
        var next = mode() === "dark" ? "light" : "dark";
        doc.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        paint();
        repaintWidgets();
      });
      paint();
    }

    darkQuery.addEventListener("change", function () {
      if (doc.getAttribute("data-theme")) return;   /* an explicit choice wins */
      paint();
      repaintWidgets();
    });

    /* Share: the native sheet where there is one, otherwise the link to
       the clipboard. Shares the live URL, not this preview's. */
    var share = document.querySelector(".share");
    if (share) {
      share.addEventListener("click", function () {
        var url = share.getAttribute("data-url") || location.href;
        if (navigator.share) {
          navigator.share({ title: document.title, url: url }).catch(function () {});
          return;
        }
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(url).then(function () {
          var label = share.textContent;
          share.textContent = "Copied";
          setTimeout(function () { share.textContent = label; }, 1500);
        }, function () {});
      });
    }
  });
})();
