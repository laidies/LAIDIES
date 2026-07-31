/* LAiDIES Homepage recomposition — preview.js
   Isolated candidate behaviour: arrival sequence, dynamic latest episode,
   mobile menu, activity filter, town-map popups, Daily Buzz song, visitor-state
   switch, directory toggle, logo tittle. No production files touched. */
(function () {
  "use strict";
  var identRoot = "/operations/design-explorations/laidies-motion-ident-20260725";
  var params = new URLSearchParams(location.search);
  var prefersReduced =
    params.get("motion") === "reduce" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- logo tittle: cycle the six accent colours ---------- */
  (function () {
    var tits = [].slice.call(document.querySelectorAll(".topbar .logo-tit"));
    if (!tits.length) return;
    var palette = ["#ef4d9c", "#19d3d1", "#f7d45c", "#6c7cd1", "#ff6b61", "#8bbde9"];
    if (prefersReduced) { tits.forEach(function (t) { t.style.color = palette[0]; }); return; }
    function frame(now) {
      var idx = Math.floor((now / 1000) / 1.8) % palette.length;
      tits.forEach(function (t) { t.style.color = palette[idx]; });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ---------- dynamic latest episode ---------- */
  (function () {
    var links = document.querySelectorAll("[data-latest-episode-link]");
    var titles = document.querySelectorAll("[data-latest-episode-title]");
    if (!links.length && !titles.length) return;
    fetch("/content/episode-index.json")
      .then(function (r) { if (!r.ok) throw new Error("index " + r.status); return r.json(); })
      .then(function (data) {
        var pub = (data.episodes || []).filter(function (e) {
          return e.status === "published" && Number.isFinite(Number(e.number)) &&
            typeof e.issueUrl === "string" && /^issues\/issue-[a-z0-9-]+\.html$/i.test(e.issueUrl);
        }).sort(function (a, b) { return Number(a.number) - Number(b.number); });
        if (!pub.length) return;
        var latest = pub[pub.length - 1];
        var num = ("0" + latest.number).slice(-2);
        links.forEach(function (l) {
          l.href = "/" + latest.issueUrl;
          l.setAttribute("aria-label", "Latest episode: " + latest.title);
        });
        titles.forEach(function (t) { t.textContent = "Episode " + num + " · " + latest.title; });
      })
      .catch(function () { /* keep the static fallback already in the HTML */ });
  })();

  /* ---------- mobile menu ---------- */
  (function () {
    var menu = document.querySelector(".menu");
    var mobile = document.querySelector("#mobile-nav");
    if (!menu || !mobile) return;
    function close() { mobile.hidden = true; menu.setAttribute("aria-expanded", "false"); }
    menu.addEventListener("click", function () {
      var open = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });
    mobile.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { close(); menu.focus(); }
    });
  })();

  /* ---------- visitor-state preview switch ---------- */
  (function () {
    var card = document.querySelector("#state-card");
    if (!card) return;
    var buttons = card.querySelectorAll(".state-switch button");
    var bodies = card.querySelectorAll("[data-state-body]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var s = btn.dataset.state;
        buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        bodies.forEach(function (body) { body.hidden = body.dataset.stateBody !== s; });
      });
    });
  })();

  /* ---------- activity filter ---------- */
  (function () {
    var buttons = document.querySelectorAll(".filter button[data-filter]");
    var cards = document.querySelectorAll(".activity-grid .act-card");
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.dataset.filter;
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", String(on));
        });
        cards.forEach(function (c) {
          var tags = c.dataset.tags || "";
          c.hidden = !(f === "all" || tags.split(" ").indexOf(f) !== -1);
        });
      });
    });
  })();

  /* ---------- town-map popups ---------- */
  (function () {
    var wrap = document.querySelector(".map-wrap");
    if (!wrap) return;
    var pop = wrap.querySelector(".map-pop");
    var spots = wrap.querySelectorAll(".map-spot");
    var link = pop.querySelector("a");
    function show(btn) {
      pop.querySelector("h5").textContent = btn.dataset.name || "";
      pop.querySelector("p").textContent = btn.dataset.desc || "";
      if (btn.dataset.href) link.setAttribute("href", btn.dataset.href);
      var r = btn.getBoundingClientRect(), wr = wrap.getBoundingClientRect();
      var left = Math.min(r.left - wr.left, wr.width - Math.min(250, wr.width * 0.64) - 10);
      pop.style.left = Math.max(8, left) + "px";
      pop.style.top = Math.min(r.bottom - wr.top + 6, wr.height - 10) + "px";
      pop.hidden = false;
    }
    spots.forEach(function (btn) {
      btn.addEventListener("click", function (e) { e.stopPropagation(); show(btn); });
      btn.addEventListener("focus", function () { show(btn); });
    });
    document.addEventListener("click", function (e) {
      if (!pop.hidden && !e.target.closest(".map-pop") && !e.target.closest(".map-spot")) pop.hidden = true;
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") pop.hidden = true; });
  })();

  /* ---------- town directory toggle ---------- */
  (function () {
    var toggle = document.querySelector(".dir-toggle");
    var dir = document.querySelector("#town-directory");
    if (!toggle || !dir) return;
    toggle.addEventListener("click", function () {
      var open = !dir.hidden;
      dir.hidden = open;
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.textContent = open ? "Open the town directory" : "Hide the town directory";
    });
  })();

  /* ---------- Daily Buzz song (no autoplay) ---------- */
  (function () {
    var buttons = document.querySelectorAll(".song-play");
    if (!buttons.length) return;
    var audio = new Audio();
    audio.preload = "none";
    var current = null;
    function setState(btn, playing, msg) {
      btn.setAttribute("aria-pressed", String(playing));
      btn.querySelector(".song-icon").innerHTML = playing ? "&#10073;&#10073;" : "&#9654;";
      btn.querySelector("[data-song-label]").textContent = playing ? "Pause" : "Listen";
      var status = btn.closest(".buzz-song") && btn.closest(".buzz-song").querySelector(".song-status");
      if (status) status.textContent = msg || "";
    }
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.dataset.audioSrc, title = btn.dataset.audioTitle || "the song";
        if (!src) return;
        if (current === btn && !audio.paused) { audio.pause(); setState(btn, false, title + " paused."); return; }
        if (current && current !== btn) setState(current, false, "");
        if (audio.src !== new URL(src, location.href).href) audio.src = src;
        current = btn;
        audio.play().then(function () { setState(btn, true, "Playing " + title + "."); })
          .catch(function () { setState(btn, false, "Could not start. Visit KSVL 99.9 to listen."); });
      });
    });
    audio.addEventListener("ended", function () { if (current) setState(current, false, "Finished."); });
    audio.addEventListener("error", function () { if (current) setState(current, false, "Could not load. Visit KSVL 99.9 to listen."); });
  })();

  /* ---------- Daily Buzz masonry: balanced columns, no gaps ---------- */
  (function () {
    var grid = document.querySelector(".buzz-grid");
    if (!grid) return;
    var items = [].slice.call(grid.querySelectorAll(".buzz-item"));
    if (!items.length) return;
    var laidN = 0;
    function layout(force) {
      var w = window.innerWidth;
      var n = w <= 640 ? 1 : (w <= 1080 ? 2 : 3);
      if (n === laidN && !force) return;
      laidN = n;
      var cols = [];
      grid.innerHTML = "";
      for (var i = 0; i < n; i++) {
        var c = document.createElement("div");
        c.className = "buzz-col";
        grid.appendChild(c);
        cols.push(c);
      }
      items.forEach(function (it) {
        var min = cols[0];
        for (var j = 1; j < cols.length; j++) {
          if (cols[j].offsetHeight < min.offsetHeight) min = cols[j];
        }
        min.appendChild(it);
      });
    }
    layout(true);
    // re-balance once images have real heights
    items.forEach(function (it) {
      it.querySelectorAll("img").forEach(function (im) {
        if (!im.complete) im.addEventListener("load", function () { layout(true); }, { once: true });
      });
    });
    window.addEventListener("load", function () { layout(true); });
    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () { layout(false); }, 160);
    }, { passive: true });
  })();

  /* ---------- arrival sequence (once per browser-tab session) ---------- */
  (function () {
    var masthead = document.querySelector(".masthead");
    if (!masthead) return;
    var KEY = "laidies-recomp-arrival-seen-v1";
    var force = params.get("intro") === "preview";
    if (force) { try { sessionStorage.removeItem(KEY); } catch (e) {} }
    var seen = false;
    try { seen = sessionStorage.getItem(KEY) === "true"; } catch (e) {}

    if (prefersReduced || (seen && !force)) {
      try { sessionStorage.setItem(KEY, "true"); } catch (e) {}
      return; /* stable masthead, no motion */
    }
    try { sessionStorage.setItem(KEY, "true"); } catch (e) {}

    var overlay = document.createElement("div");
    overlay.className = "arrival";
    overlay.setAttribute("aria-label", "LAiDIES animated introduction");
    overlay.innerHTML =
      '<span class="arrival-static" aria-hidden="true"></span>' +
      '<video class="arrival-video" muted playsinline preload="auto" poster="' + identRoot + '/continuous-i-evergreen-six-clean-electric-v10-still.png">' +
      '<source src="' + identRoot + '/continuous-i-evergreen-six-clean-electric-v10.mp4" type="video/mp4">' +
      '<img src="' + identRoot + '/continuous-i-evergreen-six-clean-electric-v10-still.png" alt="The LAiDIES logo with its Rewind Era icon sequence">' +
      '</video>' +
      '<button class="arrival-skip" type="button">Skip intro</button>' +
      '<p class="sr-only" role="status" aria-live="polite" style="position:absolute;left:-9999px">The muted LAiDIES introduction is playing.</p>';
    masthead.classList.add("arrival-lock");
    masthead.appendChild(overlay);

    var video = overlay.querySelector(".arrival-video");
    var skip = overlay.querySelector(".arrival-skip");
    video.muted = true; video.defaultMuted = true;
    var done = false, safety;

    function playVideo() {
      overlay.classList.remove("is-line-in");
      overlay.classList.add("is-video");
      var p = video.play();
      if (p && p.catch) p.catch(finish);
      safety = setTimeout(finish, force ? 15000 : 6500);
    }
    function finish() {
      if (done) return; done = true;
      clearTimeout(safety);
      try { video.pause(); } catch (e) {}
      overlay.classList.remove("is-video");
      overlay.classList.add("is-line-out");
      setTimeout(function () {
        overlay.classList.add("is-leaving");
        masthead.classList.remove("arrival-lock");
        masthead.classList.add("arrival-done");
        setTimeout(function () { overlay.remove(); }, 520);
      }, 460);
    }

    /* 1) white static line in → 2) expand → 3) video plays */
    overlay.classList.add("is-line-in");
    var startTimer = setTimeout(playVideo, 520);
    video.addEventListener("ended", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    skip.addEventListener("click", function () { clearTimeout(startTimer); finish(); });
  })();
})();
