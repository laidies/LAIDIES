(function () {
  "use strict";

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 58);
  }

  function initialise() {
    var body = document.body;
    var main = document.querySelector("main");
    if (!body || !main || !body.classList.contains("issue-feature")) return;

    var titleRepeat = main.querySelector("figure.film");
    if (titleRepeat) {
      titleRepeat.classList.add("issue-title-repeat");
      titleRepeat.setAttribute("aria-hidden", "true");
    }

    var chapters = Array.from(main.querySelectorAll(".mark"));
    chapters.forEach(function (chapter, index) {
      var heading = chapter.querySelector("h2");
      var kicker = chapter.querySelector(".k");
      var label = (heading || kicker);
      var text = label ? label.textContent.trim() : "Chapter " + (index + 1);
      if (!chapter.id) chapter.id = "chapter-" + (slug(text) || index + 1);
      chapter.dataset.chapter = String(index + 1).padStart(2, "0");
    });

    if (!chapters.length) return;

    var nav = document.createElement("nav");
    nav.className = "issue-chapter-line";
    nav.setAttribute("aria-label", "Episode chapter index");

    var label = document.createElement("span");
    label.className = "issue-chapter-line__label";
    label.textContent = "In this issue";

    var rail = document.createElement("div");
    rail.className = "issue-chapter-line__rail";

    chapters.forEach(function (chapter, index) {
      var heading = chapter.querySelector("h2");
      var kicker = chapter.querySelector(".k");
      var anchor = document.createElement("a");
      anchor.href = "#" + chapter.id;
      anchor.textContent = (heading || kicker).textContent.trim();
      anchor.dataset.chapterIndex = String(index);
      rail.appendChild(anchor);
    });

    var progress = document.createElement("span");
    progress.className = "issue-chapter-line__progress";
    progress.setAttribute("aria-hidden", "true");

    nav.append(label, rail, progress);
    main.before(nav);

    var links = Array.from(rail.querySelectorAll("a"));
    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })[0];
        if (!visible) return;
        links.forEach(function (link) { link.removeAttribute("aria-current"); });
        var active = links[chapters.indexOf(visible.target)];
        if (active) {
          active.setAttribute("aria-current", "location");
          active.scrollIntoView({ block: "nearest", inline: "center" });
        }
      },
      { rootMargin: "-22% 0px -66% 0px", threshold: 0 }
    );
    chapters.forEach(function (chapter) { observer.observe(chapter); });

    function updateProgress() {
      var rect = main.getBoundingClientRect();
      var total = Math.max(main.scrollHeight - window.innerHeight * .45, 1);
      var read = Math.min(Math.max(-rect.top, 0), total);
      progress.style.width = (read / total * 100).toFixed(2) + "%";
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise);
  } else {
    initialise();
  }
})();
