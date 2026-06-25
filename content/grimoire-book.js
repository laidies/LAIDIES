/* ============================================================
   GRIMOIRE BOOK — paginated reading model (§2b)
   Progressive enhancement: with JS, content pages through one
   page at a time (swipe / tap-edge / arrows / keyboard) with a
   progress indicator + jump-to-contents. Without JS, the shell
   stays a scroll-snap stack with page breaks (the CSS fallback).
   Reusable across every section: chapters and tool cards.
   ============================================================ */
(function () {
  "use strict";
  function seedStars(host, count, opts) {
    opts = opts || {};
    if (!host) return;
    if (host.dataset.seeded === "1") return;
    host.dataset.seeded = "1";
    for (var i = 0; i < count; i++) {
      var s = document.createElement("div");
      s.className = "gr-bg-star";
      if (opts.mixWhite && i % 3 === 0) s.classList.add("is-white");
      if (i % 5 === 0) s.classList.add("is-large");
      s.style.left = (Math.random() * 100) + "%";
      s.style.top = (Math.random() * 100) + "%";
      s.style.setProperty("--dur", (2.4 + Math.random() * 3.6) + "s");
      s.style.setProperty("--delay", (Math.random() * 3) + "s");
      host.appendChild(s);
    }
  }
  function seedGlitter(host, count) {
    if (!host) return;
    if (host.dataset.seeded === "1") return;
    host.dataset.seeded = "1";
    var colors = ["#ffd700", "#ffb6da", "#ff8fd8", "#ffe4f0", "#ffeaa7", "#fff"];
    for (var i = 0; i < count; i++) {
      var dot = document.createElement("div");
      dot.className = "gr-glitter-dot";
      var size = 2 + Math.random() * 4;
      var left = Math.random() * 100;
      var duration = 5 + Math.random() * 8;
      var delay = Math.random() * 10;
      var color = colors[Math.floor(Math.random() * colors.length)];
      dot.style.cssText =
        "left:" + left + "%;" +
        "--size:" + size + "px;" +
        "--duration:" + duration + "s;" +
        "--delay:" + delay + "s;" +
        "--color:" + color + ";";
      host.appendChild(dot);
    }
  }
  function paintPartBreadcrumbs(shell) {
    var pages = Array.prototype.slice.call(shell.querySelectorAll(".gr-page"));
    var currentPart = null;
    pages.forEach(function (pg) {
      var isPart = pg.classList.contains("gr-part-intro");
      var isCloser = pg.classList.contains("gr-closer");
      if (isPart) { currentPart = pg.getAttribute("data-title"); return; }
      if (isCloser) { currentPart = null; return; }
      if (!currentPart) return;
      if (pg.querySelector(":scope > .hb-page-part")) return;
      var bc = document.createElement("p");
      bc.className = "hb-page-part";
      bc.textContent = currentPart;
      pg.insertBefore(bc, pg.firstChild);
    });
  }
  function paintStars(shell) {
    // global twinkles on the dark Madame CLAi-O backdrop
    var bg = shell.querySelector(".gr-bg-stars");
    if (!bg) {
      bg = document.createElement("div");
      bg.className = "gr-bg-stars";
      bg.setAttribute("aria-hidden", "true");
      shell.insertBefore(bg, shell.firstChild);
    }
    seedStars(bg, 36, { mixWhite: true });
    // per-page twinkles on every Laidy-light page surface
    Array.prototype.slice.call(shell.querySelectorAll(".gr-page.gr-light")).forEach(function (page) {
      var host = page.querySelector(".gr-page-stars");
      if (!host) {
        host = document.createElement("div");
        host.className = "gr-page-stars";
        host.setAttribute("aria-hidden", "true");
        page.insertBefore(host, page.firstChild);
      }
      seedStars(host, 18);
    });
  }
  function paintGlitter(shell) {
    // Fairy-Godmother-style floating glitter, layered over the dark
    // backdrop on illuminated section pages only (so it doesn't
    // compete with the painted hub book or the chapter cover).
    if (!shell.querySelector(".gr-illuminated")) return;
    var field = shell.querySelector(".gr-glitter-field");
    if (!field) {
      field = document.createElement("div");
      field.className = "gr-glitter-field";
      field.setAttribute("aria-hidden", "true");
      shell.insertBefore(field, shell.firstChild);
    }
    seedGlitter(field, 28);
  }
  function init() {
    var shell = document.querySelector(".grimoire-shell[data-paginated]");
    if (!shell) return;
    paintPartBreadcrumbs(shell);
    paintStars(shell);
    paintGlitter(shell);
    var book = shell.querySelector(".gr-book");
    var pages = book ? Array.prototype.slice.call(book.querySelectorAll(".gr-page")) : [];
    if (pages.length < 2) return; // nothing to paginate

    var index = 0;

    // ---- build chrome (so every section gets identical furniture) ----
    var topbar = shell.querySelector(".gr-topbar");
    var contentsBtn = document.createElement("button");
    contentsBtn.className = "gr-contents-btn";
    contentsBtn.type = "button";
    contentsBtn.textContent = "Contents";
    contentsBtn.setAttribute("aria-haspopup", "dialog");
    if (topbar) topbar.appendChild(contentsBtn);

    var nav = document.createElement("nav");
    nav.className = "gr-nav";
    nav.setAttribute("aria-label", "Page navigation");
    var prev = document.createElement("button");
    prev.type = "button"; prev.className = "gr-arrow gr-prev"; prev.textContent = "← Back";
    var progress = document.createElement("div");
    progress.className = "gr-progress";
    progress.setAttribute("aria-live", "polite");
    progress.innerHTML = '<span class="gr-count"></span><span class="gr-bar"><i></i></span>';
    var next = document.createElement("button");
    next.type = "button"; next.className = "gr-arrow gr-next"; next.textContent = "Next →";
    nav.appendChild(prev); nav.appendChild(progress); nav.appendChild(next);
    shell.appendChild(nav);

    // ---- contents panel (page titles) ----
    var overlay = document.createElement("div");
    overlay.className = "gr-contents"; overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Chapter contents");
    var inner = document.createElement("div");
    inner.className = "gr-contents-inner";
    var closeBtn = document.createElement("button");
    closeBtn.className = "gr-contents-close"; closeBtn.type = "button"; closeBtn.textContent = "Close ✕";
    // Use the first page's data-title as the chapter heading shown
    // above the contents list — anchors the user inside one chapter,
    // not a whole book. The first page is intentionally skipped from
    // the list (it's the cover; its title IS the header).
    var chapterTitle = (pages[0] && pages[0].getAttribute("data-title")) || "Chapter Contents";
    var h = document.createElement("h2"); h.textContent = chapterTitle;
    var sub = document.createElement("p");
    sub.className = "gr-contents-sub";
    sub.textContent = "Contents";
    var ol = document.createElement("ol");
    var inPart = false;
    pages.forEach(function (pg, i) {
      if (i === 0) return; // chapter cover — shown as TOC header above
      var title = pg.getAttribute("data-title") || (pg.querySelector("h1,h2,h3") || {}).textContent || ("Page " + (i + 1));
      var isPart = pg.classList.contains("gr-part-intro");
      var isCloser = pg.classList.contains("gr-closer");
      if (isPart) inPart = true;
      if (isCloser) inPart = false;
      // Before the closer page, drop a small "Chapter close" eyebrow so
      // it doesn't read as an orphan list item.
      if (isCloser) {
        var closeEyebrow = document.createElement("li");
        closeEyebrow.className = "gr-contents-eyebrow";
        closeEyebrow.textContent = "Chapter close";
        ol.appendChild(closeEyebrow);
      }
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "gr-jump" + (isPart ? " is-part" : (inPart && !isCloser ? " is-sub" : ""));
      b.textContent = title.trim();
      b.addEventListener("click", function () { go(i); closeContents(); });
      li.appendChild(b); ol.appendChild(li);
    });
    // After the chapter pages, a "What's next" panel so the user can see
    // beyond this single chapter — tool cards + path back to the handbook.
    var nextSection = document.createElement("div");
    nextSection.className = "gr-contents-next";
    nextSection.innerHTML =
      '<p class="gr-contents-next-label">What’s next in the SLAiYER Handbook</p>' +
      '<p><strong>Tool cards:</strong> <a href="/grimoire/slaiyer-handbook-chatgpt.html">ChatGPT</a> is live. Claude, Gemini, Copilot, Perplexity, and NotebookLM are still brewing.</p>' +
      '<p><strong>More chapters:</strong> still brewing.</p>' +
      '<p><a href="/grimoire/slaiyer-handbook.html">← Back to the Handbook</a></p>';
    inner.appendChild(closeBtn); inner.appendChild(h); inner.appendChild(sub); inner.appendChild(ol); inner.appendChild(nextSection);
    overlay.appendChild(inner); shell.appendChild(overlay);

    var jumpButtons = Array.prototype.slice.call(ol.querySelectorAll(".gr-jump"));

    function openContents() { overlay.hidden = false; document.body.style.overflow = "hidden"; }
    function closeContents() { overlay.hidden = true; document.body.style.overflow = ""; }
    contentsBtn.addEventListener("click", openContents);
    closeBtn.addEventListener("click", closeContents);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeContents(); });

    // ---- render ----
    function render() {
      pages.forEach(function (pg, i) { pg.hidden = i !== index; });
      progress.querySelector(".gr-count").textContent = (index + 1) + " / " + pages.length;
      progress.querySelector(".gr-bar i").style.width = ((index + 1) / pages.length * 100) + "%";
      prev.disabled = index === 0;
      next.disabled = index === pages.length - 1;
      jumpButtons.forEach(function (b, i) { b.setAttribute("aria-current", i === index ? "true" : "false"); });
      try { history.replaceState(null, "", "#page-" + (index + 1)); } catch (e) {}
      // scroll the book back into view so each page starts at the top
      if (book.getBoundingClientRect().top < 0) book.scrollIntoView({ block: "start", behavior: "auto" });
    }
    function go(i) {
      index = Math.max(0, Math.min(pages.length - 1, i));
      render();
    }

    prev.addEventListener("click", function () { go(index - 1); });
    next.addEventListener("click", function () { go(index + 1); });

    // keyboard
    document.addEventListener("keydown", function (e) {
      if (overlay.hidden === false && e.key === "Escape") { closeContents(); return; }
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    });

    // swipe
    var x0 = null, y0 = null;
    book.addEventListener("touchstart", function (e) { var t = e.changedTouches[0]; x0 = t.clientX; y0 = t.clientY; }, { passive: true });
    book.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) { go(index + (dx < 0 ? 1 : -1)); }
      x0 = y0 = null;
    }, { passive: true });

    // tap-edge (only on the book's outer gutters, never over a link/button)
    book.addEventListener("click", function (e) {
      if (e.target.closest("a, button, .gr-jump, input, label, summary")) return;
      var r = book.getBoundingClientRect(), edge = r.width * 0.15;
      if (e.clientX - r.left < edge) go(index - 1);
      else if (r.right - e.clientX < edge) go(index + 1);
    });

    // honor an incoming hash:
    //   #page-N   — within-chapter jump / back button
    //   #anything — element id (e.g., #part-3); jump to the page that
    //               contains that element so cross-links from other pages
    //               (like the ChatGPT tool card) land on the right page.
    var m = (location.hash || "").match(/^#page-(\d+)$/);
    if (m) {
      index = Math.max(0, Math.min(pages.length - 1, parseInt(m[1], 10) - 1));
    } else if (location.hash && location.hash.length > 1) {
      try {
        var anchorEl = shell.querySelector(location.hash);
        if (anchorEl) {
          var anchorPage = anchorEl.closest(".gr-page");
          var anchorIdx = pages.indexOf(anchorPage);
          if (anchorIdx >= 0) index = anchorIdx;
        }
      } catch (e) { /* invalid selector */ }
    }

    shell.classList.add("gr-ready"); // flips CSS from scroll-fallback to paginated
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
