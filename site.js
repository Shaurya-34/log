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
     Sound

     One synthesised-noise engine, shared by every widget that wants a
     tick - the tape's read head, and any figure below it. A sample
     would be another request on a page that costs 23KB, and a
     generated click can take its brightness and level from the caller
     (how fast, how hard, how final) the way a file never could.
     Filtered noise, never a tone - a tone reads as a beep, noise reads
     as a mechanism.

     One rule for the whole site, enforced once here rather than once
     per widget: silent until asked for, remembered after that. A
     reader who came to read should never be made a noise at.
     ------------------------------------------------------------ */
  var siteSound = (function () {
    var on = safeStore.get("tape-sound") === "on";
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
      if (!on || !ensure()) {
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
      isOn: function () { return on; },
      setOn: function (v) {
        on = v;
        safeStore.set("tape-sound", v ? "on" : "off");
      },
      ensure: ensure,
      /* A light tick - the tape's read head crossing a cell, or one
         draw landing in a bucket. pace in [0,1] brightens and loudens
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
      },
      /* The click that turns sound on is also the gesture that's
         allowed to start the audio engine, so the confirmation tick has
         to answer for itself rather than use the throttled tick() -
         resume() is asynchronous, and scheduling into a context that
         hasn't actually started yet drops the sound on the floor. */
      confirm: function () {
        if (!ensure()) {
          return;
        }

        var fire = function () { burst(1980, 1.4, 0.104, 0.05, 0); };

        if (audio.state === "running" || !audio.resume) {
          fire();
        } else {
          audio.resume().then(fire, fire);
        }
      }
    };
  })();

  /* ------------------------------------------------------------
     Sound toggle

     Independent of any one widget, and wired up on whatever page
     renders a .sound-toggle button - the homepage tape and the
     birthday-collision demo both want one, and neither should have to
     know how the other works. */
  run(function () {
    var button = document.querySelector(".sound-toggle");

    if (!button || !(window.AudioContext || window.webkitAudioContext)) {
      return;
    }

    function paint() {
      button.textContent = siteSound.isOn() ? "mute" : "sound";
      button.setAttribute("aria-pressed", siteSound.isOn() ? "true" : "false");
      button.setAttribute(
        "aria-label",
        siteSound.isOn() ? "Mute sound" : "Turn on sound"
      );
    }

    button.hidden = false;

    button.addEventListener("click", function () {
      siteSound.setOn(!siteSound.isOn());
      paint();

      if (siteSound.isOn()) {
        siteSound.confirm();
      }
    });

    paint();

    /* A remembered "on" from a previous visit cannot start the engine
       by itself - browsers only allow that inside a gesture - so arm it
       on the first interaction of the visit instead. */
    if (siteSound.isOn()) {
      var arm = function () {
        siteSound.ensure();
        document.removeEventListener("pointerdown", arm);
        document.removeEventListener("keydown", arm);
      };

      document.addEventListener("pointerdown", arm);
      document.addEventListener("keydown", arm);
    }
  });

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
  /* ------------------------------------------------------------
     Turing tape navigation

     The read head is fixed at the centre of the frame and the tape is
     pulled through it, the way a real reader works. Whichever cell is
     nearest the centre is "being read": it drives the entry panel
     below. Scrolling is native (overflow-x + scroll-snap), so momentum,
     touch and keyboard come for free and behave identically on both.
     ------------------------------------------------------------ */

  run(function () {
    var tape = document.querySelector(".tape-nav");

    var cells = tape
      ? Array.prototype.slice.call(tape.querySelectorAll(".tape-cell"))
      : [];

    var panels = Array.prototype.slice.call(
      document.querySelectorAll(".entry-panel")
    );

    if (!tape || !cells.length || !panels.length) {
      return;
    }

    var viewport = tape.querySelector(".tape-viewport");

    if (!viewport) {
      return;
    }

    var active = cells.findIndex(function (cell) {
      return cell.classList.contains("is-active");
    });

    if (active < 0) {
      active = 0;
    }

    /* Diagram draw-in: fires once per panel, the first time it becomes
       active, via a CSS keyframe (see .is-drawn in home.css). Reduced
       motion is handled entirely in CSS, so this just needs the class. */
    function playDraw(panel) {
      if (!panel || panel.dataset.animated === "1") {
        return;
      }

      panel.dataset.animated = "1";
      panel.classList.add("is-drawn");
    }

    /* Scroll position that puts cell `i` under the head. Read straight
       off the live layout every time rather than derived from a stored
       measurement, so it cannot disagree with what is actually on
       screen. The run-out that makes the end cells reachable is CSS's
       job now (see .tape-track in home.css); this used to measure the
       frame and write that padding in pixels, and a single measurement
       taken while the page was still settling was enough to leave the
       newest article permanently past the end of the scroll range. */
    function targetFor(i) {
      var cell = cells[Math.max(0, Math.min(i, cells.length - 1))];
      return cell.offsetLeft + cell.offsetWidth / 2 - viewport.clientWidth / 2;
    }

    /* The run-out either side, sized in real pixels off the measured
       frame. It is what lets the first and last cells reach the centre;
       without enough of it they sit past the end of the scroll range and
       cannot be reached at all, which is a silent, permanent wall.

       Half the frame, deliberately, rather than the exact half-frame
       minus half a cell that is strictly needed. Half a frame is always
       at least enough whatever the cell turns out to measure, so there
       is one fewer measurement that can be wrong, and the surplus is the
       slack the over-pull stretches into.

       CSS carries a generous fallback for the no-JS case (see
       .tape-runout in home.css); this refines it to the real frame. */
    var track = viewport.querySelector(".tape-track");
    var runouts = Array.prototype.slice.call(
      viewport.querySelectorAll(".tape-runout")
    );

    function sizeRunout() {
      if (!runouts.length || viewport.clientWidth < 1) {
        return;
      }

      var width = viewport.clientWidth / 2;

      runouts.forEach(function (runout) {
        runout.style.width = width + "px";
      });
    }

    /* Which cell sits closest to the head - or, given a position, which
       cell would sit closest to it. The argument is what lets a throw
       be aimed at a cell before the tape has finished moving. */
    function nearestCell(pos) {
      var at = pos === undefined ? viewport.scrollLeft : pos;
      var centre = at + viewport.clientWidth / 2;
      var best = 0;
      var bestDist = Infinity;

      cells.forEach(function (cell, i) {
        var cellCentre = cell.offsetLeft + cell.offsetWidth / 2;
        var dist = Math.abs(cellCentre - centre);

        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      return best;
    }

    function paint() {
      cells.forEach(function (cell, i) {
        var on = i === active;
        cell.classList.toggle("is-active", on);
        cell.setAttribute("aria-current", on ? "true" : "false");
      });

      panels.forEach(function (panel, i) {
        var on = i === active;
        panel.classList.toggle("is-active", on);
        panel.setAttribute("aria-hidden", on ? "false" : "true");
      });

      playDraw(panels[active]);
    }

    /* Native smooth scrolling is unreliable against mandatory scroll
       snap: the snap can abort the animation mid-flight, leaving the
       tape parked between cells. That exact conflict already bit the
       colormap carousel elsewhere in this project. So drive the scroll
       ourselves - every frame is an instant assignment, which snap has
       nothing to fight, and it lets us pick the easing. */
    var anim = null;
    var animating = false;

    function animateTo(target, duration) {
      if (anim) {
        cancelAnimationFrame(anim);
      }

      var start = viewport.scrollLeft;
      var delta = target - start;

      if (Math.abs(delta) < 1) {
        viewport.scrollLeft = target;
        return;
      }

      var startedAt = null;
      /* How hard this movement is, for the tick: a four-cell flick is
         loud and bright, a one-cell nudge is quiet. */
      var pace = Math.min(1, Math.abs(delta) / duration / 1.2);

      animating = true;

      function frame(now) {
        if (startedAt === null) {
          startedAt = now;
        }

        var t = Math.min((now - startedAt) / duration, 1);
        /* easeOutCubic: moves off quickly, settles slowly, like
           something with mass coming to rest. */
        var eased = 1 - Math.pow(1 - t, 3);

        viewport.scrollLeft = start + delta * eased;
        ratchet(nearestCell(), pace);

        if (t < 1) {
          anim = requestAnimationFrame(frame);
        } else {
          anim = null;
          animating = false;
        }
      }

      anim = requestAnimationFrame(frame);
    }

    function centre(index, smooth) {
      active = Math.max(0, Math.min(index, cells.length - 1));

      var target = targetFor(active);

      if (smooth && !reduced) {
        /* Longer throws take longer to stop. A constant duration makes a
           four-cell flick feel weightless and a one-cell nudge feel
           sluggish; tying it to the distance gives the tape mass. */
        var distance = Math.abs(target - viewport.scrollLeft);

        animateTo(target, Math.min(760, 300 + distance * 0.45));
      } else {
        if (anim) {
          cancelAnimationFrame(anim);
          anim = null;
        }

        animating = false;
        viewport.scrollLeft = target;
      }

      /* A silent reposition - first paint, a resize, a font swap - must
         not leave the tick counter pointing at a cell the tape has
         already left, or the next real move starts one detent late. */
      if (!smooth) {
        soundedCell = active;
      }

      paint();
    }

    /* ----------------------------------------------------------
       Grab, throw, and the ends

       The tape is meant to read as a physical thing: you can take hold
       of it, throw it, and it comes to rest with a cell under the head
       rather than parked between two.

       Touch is deliberately left alone. Native scrolling already has
       momentum tuned to the platform and the settle-snap below catches
       it; all of this exists because a mouse gets nothing from
       overflow-x on its own, so on a desktop the tape is currently only
       reachable through the arrows.
       ---------------------------------------------------------- */

    var DRAG_SLOP = 4;      /* px of movement before a press is a drag  */
    var THROW_REACH = 220;  /* ms of coasting a flick is worth          */
    var OVERPULL = 64;      /* px the tape can stretch past either end  */

    var dragging = false;
    var dragMoved = false;
    var dragFromX = 0;
    var dragFromScroll = 0;
    var samples = [];
    var stretch = 0;

    /* The ends are the first and last cell under the head - not the
       ends of the scroll range, which sit far out in the blank run-out
       that exists only so those two cells can reach the centre. */
    function lowerBound() { return targetFor(0); }
    function upperBound() { return targetFor(cells.length - 1); }

    /* Past either end the tape stretches rather than stopping dead, so
       the limit feels like the end of a reel instead of a wall.

       The stretch is a transform on the track, not more scrolling. Using
       scrollLeft for it would make the give depend on how much blank
       run-out happened to be left over past the end cell - which varies
       with the window width, so the same pull would yield 17px on a
       laptop and 180px on a wide monitor. A transform gives the same
       travel everywhere, and it doesn't move the sprocket rails, which
       are painted on the frame: the tape stretches, the machine holds
       still. Transforms don't affect offsetLeft either, so every scroll
       target stays correct while this is applied. */
    function setStretch(px) {
      track.style.transform = px ? "translateX(" + px + "px)" : "";
    }

    /* Diminishing returns, so it never runs away: the first few pixels
       of over-pull come easily and the last ones barely move at all. */
    function damped(over) {
      var sign = over < 0 ? -1 : 1;
      var mag = Math.abs(over);

      return sign * OVERPULL * (1 - 1 / (1 + mag / OVERPULL));
    }

    /* Scroll as far as the end cell, then stretch for anything beyond.
       Returns the over-pull so the caller can render it. */
    function scrollWithStretch(pos) {
      var low = lowerBound();
      var high = upperBound();

      if (pos < low) {
        viewport.scrollLeft = low;
        return low - pos;
      }

      if (pos > high) {
        viewport.scrollLeft = high;
        return high - pos;
      }

      viewport.scrollLeft = pos;
      return 0;
    }

    /* Let go of an over-pulled tape and it snaps back to its stop. */
    function releaseStretch() {
      var from = stretch;

      stretch = 0;

      if (!from) {
        setStretch(0);
        return;
      }

      if (reduced) {
        setStretch(0);
        return;
      }

      var startedAt = null;

      function frame(now) {
        if (startedAt === null) {
          startedAt = now;
        }

        var t = Math.min((now - startedAt) / 380, 1);

        setStretch(from * (1 - (1 - Math.pow(1 - t, 3))));

        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          setStretch(0);
        }
      }

      requestAnimationFrame(frame);
    }

    /* Scroll velocity in px/ms, measured over the last few moves only.
       Sampling the whole drag would average a fast flick down to
       nothing if the visitor had paused earlier in the same gesture. */
    function throwVelocity() {
      if (samples.length < 2) {
        return 0;
      }

      var first = samples[0];
      var last = samples[samples.length - 1];
      var dt = last.t - first.t;

      return dt > 0 ? (last.x - first.x) / dt : 0;
    }

    viewport.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch" || e.button !== 0) {
        return;
      }

      dragging = true;
      dragMoved = false;
      dragFromX = e.clientX;
      dragFromScroll = viewport.scrollLeft;
      samples = [{ t: performance.now(), x: viewport.scrollLeft }];

      /* Taking hold of the tape stops whatever it was doing. */
      if (anim) {
        cancelAnimationFrame(anim);
        anim = null;
      }

      animating = false;
      stretch = 0;
      setStretch(0);

      viewport.setPointerCapture(e.pointerId);
      tape.classList.add("is-dragging");
    });

    viewport.addEventListener("pointermove", function (e) {
      if (!dragging) {
        return;
      }

      var dx = e.clientX - dragFromX;

      /* A few pixels of slop, so a click on a cell is still a click and
         not a one-pixel drag that swallows it. */
      if (!dragMoved) {
        if (Math.abs(dx) <= DRAG_SLOP) {
          return;
        }

        dragMoved = true;
      }

      e.preventDefault();

      stretch = damped(scrollWithStretch(dragFromScroll - dx));
      setStretch(stretch);

      var now = performance.now();

      samples.push({ t: now, x: viewport.scrollLeft });

      while (samples.length > 2 && now - samples[0].t > 70) {
        samples.shift();
      }
    });

    function endDrag(e) {
      if (!dragging) {
        return;
      }

      dragging = false;
      tape.classList.remove("is-dragging");
      releaseStretch();

      if (viewport.releasePointerCapture && e.pointerId !== undefined) {
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch (err) {
          /* already released */
        }
      }

      if (!dragMoved) {
        return;
      }

      /* Where the tape would coast to if left alone, then the nearest
         cell to that point. Aiming the throw at a detent rather than
         letting it run down and snapping afterwards is what keeps it
         feeling like one movement instead of two: a hard flick crosses
         several cells, a nudge crosses one, and it always arrives
         somewhere legible. Clamped to the ends, which is also what
         springs the tape back out of an over-pull. */
      var projected = viewport.scrollLeft + throwVelocity() * THROW_REACH;

      projected = Math.max(lowerBound(), Math.min(upperBound(), projected));

      centre(nearestCell(projected), true);
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    /* A drag that ends over a cell must not also open it. Capture phase,
       so this runs before the cell's own handler. */
    viewport.addEventListener("click", function (e) {
      if (dragMoved) {
        dragMoved = false;
        e.stopPropagation();
        e.preventDefault();
      }
    }, true);

    /* One tick per cell that passes the head, wherever the movement came
       from. Tracked separately from `active` because a throw deliberately
       stops the panel changing on the way past - the sound should still
       count every detent it crosses. Uses the shared siteSound engine
       (see top of file) rather than its own - the toggle button, the
       AudioContext and the noise buffer are all one instance, shared
       with any other widget on the page that wants a tick. */
    var soundedCell = active;

    function ratchet(index, pace) {
      if (index === soundedCell) {
        return;
      }

      soundedCell = index;
      siteSound.tick(pace);
    }

    /* The tape drives the panel: whatever the scroll settles on wins,
       whether it got there by drag, wheel, arrow or click. */
    var scrollTimer = null;

    viewport.addEventListener("scroll", function () {
      /* While we're driving the scroll ourselves, centre() has already
         set the destination - don't let intermediate frames flicker the
         panel through every cell we pass on the way. */
      if (animating) {
        return;
      }

      var next = nearestCell();

      if (next !== active) {
        active = next;
        paint();
      }

      /* Still holding it: the panel keeps up, but where it lands is the
         throw's decision, not a timer's. */
      if (dragging) {
        ratchet(next, Math.min(1, Math.abs(throwVelocity()) / 1.2));
        return;
      }

      ratchet(next, 0.35);

      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      /* Our own snap, replacing scroll-snap-type: once a free drag or
         wheel stops, ease the nearest cell under the head. Skipped when
         it is already centred, so this can't fight itself. */
      scrollTimer = setTimeout(function () {
        if (animating) {
          return;
        }

        var settled = nearestCell();

        if (settled !== active) {
          active = settled;
          paint();
        }

        if (Math.abs(viewport.scrollLeft - targetFor(settled)) > 1) {
          centre(settled, true);
        }
      }, 110);
    }, { passive: true });

    cells.forEach(function (cell, i) {
      cell.addEventListener("click", function () {
        /* A cell already under the head opens its article; anything
           else scrolls itself under the head first. */
        if (i === active) {
          var link = panels[active] &&
            panels[active].querySelector(".entry-title a");

          if (link) {
            window.location.href = link.getAttribute("href");
          }

          return;
        }

        centre(i, true);
      });

      cell.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          centre(active + 1, true);
          cells[active].focus();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          centre(active - 1, true);
          cells[active].focus();
        }
      });
    });

    var next = tape.querySelector(".tape-next");
    var prev = tape.querySelector(".tape-prev");

    if (next) {
      next.addEventListener("click", function () {
        centre(active + 1, true);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        centre(active - 1, true);
      });
    }

    function reflow() {
      sizeRunout();
      centre(active, false);
    }

    addEventListener("resize", reflow);

    /* Anything that changes the frame's size invalidates both the
       run-out padding and the scroll offset that parks a cell under the
       head - and those changes keep arriving after first paint: web
       fonts swapping in, the reader's own default font size, browser
       zoom. Without this the tape is positioned once against a layout
       that is then quietly replaced, leaving the head pointing at blank
       tape while the panel shows a different article. Observing the
       frame catches every one of those causes rather than guessing at
       them individually. */
    if (window.ResizeObserver) {
      /* Observes the frame and only ever writes scrollLeft, which does
         not resize it, so this cannot feed back into itself. */
      new ResizeObserver(reflow).observe(viewport);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(reflow).catch(function () {});
    }

    addEventListener("load", reflow);

    /* Left/right anywhere on the page drive the tape - the tape is the
       page's primary control, so it shouldn't require finding and
       focusing a cell first. Skipped while the visitor is typing, or
       when a modifier is held (browsers use those for history and
       word-jumps). */
    function isTyping(el) {
      if (!el) {
        return false;
      }

      var tag = el.tagName;

      return tag === "INPUT" || tag === "TEXTAREA" ||
        tag === "SELECT" || el.isContentEditable;
    }

    document.addEventListener("keydown", function (e) {
      if (
        (e.key !== "ArrowLeft" && e.key !== "ArrowRight") ||
        e.metaKey || e.ctrlKey || e.altKey ||
        isTyping(e.target)
      ) {
        return;
      }

      e.preventDefault();
      centre(active + (e.key === "ArrowRight" ? 1 : -1), true);
    });

    /* Sizes the run-out and parks the starting cell under the head. The
       scroll position has to be set explicitly even though the tape opens
       on its leftmost cell: scrollLeft 0 is the far end of the blank
       run-out, not the first article. */
    reflow();
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

    var colorInk, colorGrey, colorHairline, colorPaper;

    function readColors() {
      var cs = getComputedStyle(fig);
      colorInk = cs.getPropertyValue("--ink").trim() || "#161513";
      colorGrey = cs.getPropertyValue("--grey").trim() || "#6f6a62";
      colorHairline = cs.getPropertyValue("--hairline").trim() || "#e7e3dc";
      colorPaper = cs.getPropertyValue("--paper").trim() || "#faf9f7";
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
      var baseline = HH - 14;

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
        render(Number(btn.getAttribute("data-bits")));
      });
    });

    var initial = fig.querySelector('[aria-pressed="true"]') || buttons[0];
    render(Number(initial.getAttribute("data-bits")));
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
})();