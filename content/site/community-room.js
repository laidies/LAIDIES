(function () {
  var params = new URLSearchParams(window.location.search || "");
  var fromBag = params.get("from") === "this-week";
  var issue = String(params.get("issue") || "").match(/\d+/);
  var issueValue = issue ? Number(issue[0]) : "";
  var draftParam = params.get("draft") === "1" ? "&draft=1" : "";
  var group = /^(practice|connect|realworld|fun)$/.test(params.get("group") || "") ? params.get("group") : "";
  var groupParam = group ? "&group=" + encodeURIComponent(group) : "";
  var groupLabels = {
    practice: "Back to Weekly Study Pack",
    connect: "Back to Meet & Celebrate",
    realworld: "Back to the Book of Receipts",
    fun: "Back to Weekly Fun Pack"
  };
  var bagHref = "../this-week.html" + (issueValue ? "?issue=" + encodeURIComponent(issueValue) + "&bag=open" + groupParam + draftParam : "?bag=open" + groupParam + draftParam);
  var roomHref = "../community.html" + (fromBag ? "?from=this-week" + (issueValue ? "&issue=" + encodeURIComponent(issueValue) : "") + "&bag=open" + groupParam + draftParam + "#chat-rooms" : "#chat-rooms");

  function styleBagReturn(link) {
    link.style.cssText = "position:fixed;bottom:calc(16px + env(safe-area-inset-bottom));left:clamp(14px,3vw,26px);right:auto;z-index:140;display:inline-flex;align-items:center;justify-content:center;width:fit-content;max-width:calc(100% - 28px);margin:0;padding:10px 14px;border:1px solid rgba(185,93,120,.42);border-radius:999px;background:rgba(255,253,251,.94);color:#6f263f;font-weight:850;text-decoration:none;box-shadow:0 12px 30px rgba(75,33,72,.12),0 0 0 4px rgba(185,93,120,.08);backdrop-filter:blur(10px);";
  }

  if (fromBag && !document.querySelector("[data-quiz-return], .quiz-return-link")) {
    var link = document.querySelector("[data-wednesday-return]");
    if (!link) {
      link = document.createElement("a");
      document.body.appendChild(link);
    }
    link.dataset.wednesdayReturn = "true";
    link.className = "wednesday-return";
    link.href = bagHref;
    link.textContent = "\u2190 " + (groupLabels[group] || "Back to the Bag");
    styleBagReturn(link);
  }

  document.querySelectorAll('a[href="../community.html"], a[href="../community.html#chat-rooms"]').forEach(function (roomLink) {
    roomLink.href = roomHref;
    if (roomLink.classList.contains("button")) {
      roomLink.textContent = "Back to the rooms";
    }
  });

  var isLocalPreview = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(window.location.hostname);
  if (!isLocalPreview) return;

  document.querySelectorAll(".thread-comments").forEach(function (section) {
    if (!section.querySelector("hyvor-talk-comments")) return;
    section.innerHTML = '<div class="community-local-comments-note"><span>Local preview</span><strong>The live Room comments are hidden here.</strong><p>Hyvor only trusts the public site domain, so localhost shows a warning instead of the actual thread. On the live site, this is where readers post and reply.</p><a class="button secondary" href="' + roomHref + '">Back to the rooms</a></div>';
  });
})();
