(function () {
  "use strict";

  var FIXTURE_ID = "sorority-community-p0-1";
  var LOCAL_HOST = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i;
  var APPROVED_HOST = /^(www\.)?laidies\.ai$/i;
  var PROVIDER_SRC = "https://talk.hyvor.com/embed/embed.js";
  var providerPromise = null;

  function fixtureState() {
    if (
      LOCAL_HOST.test(window.location.hostname) &&
      window.__LAIDIES_COMMUNITY_PREFLIGHT__ === FIXTURE_ID &&
      window.__LAIDIES_COMMUNITY_PREFLIGHT_STATE__
    ) {
      return String(window.__LAIDIES_COMMUNITY_PREFLIGHT_STATE__);
    }
    return "";
  }

  function stateCopy(state) {
    var copies = {
      "local-preview": {
        title: "Local preview — no discussion was loaded.",
        body: "Hyvor trusts the approved public site. This preview keeps the room purpose and return route available without contacting the provider."
      },
      unavailable: {
        title: "The external discussion is unavailable.",
        body: "Nothing was submitted. Keep the prompt privately or return to the house and try another room later."
      },
      "unsupported-host": {
        title: "Discussion held on this host.",
        body: "This copy of the page is not an approved LAiDIES community host, so the external provider was not contacted."
      },
      "signed-out": {
        title: "Hyvor sign-in is required to participate.",
        body: "Reading availability and sign-in are controlled by Hyvor. Opening or signing in does not prove a comment was submitted, published or moderated."
      },
      held: {
        title: "A contribution may be held by the provider.",
        body: "A held contribution is not published or moderated by implication. Follow the provider status and reporting controls; LAiDIES does not guarantee review or reply."
      },
      loading: {
        title: "Loading the external discussion…",
        body: "Hyvor controls sign-in, submission, publication and moderation. A visible frame is not a receipt that any contribution was accepted."
      },
      ready: {
        title: "External discussion frame available.",
        body: "Hyvor controls sign-in, submission, publication and moderation. LAiDIES cannot confirm a post, review, reply or moderation outcome from this page."
      }
    };
    return copies[state] || copies.unavailable;
  }

  function boundaryMarkup(state, roomHref) {
    var copy = stateCopy(state);
    return (
      '<div class="community-provider-state" data-community-state="' +
      state +
      '" role="status" aria-live="polite" aria-atomic="true">' +
      '<span class="community-provider-state__label">External discussion · Hyvor</span>' +
      "<strong>" +
      copy.title +
      "</strong><p>" +
      copy.body +
      "</p>" +
      '<p class="community-provider-state__safety">Public room: do not post confidential work, private messages, personal identifiers, high-stakes personal details, or another person’s information. Participation, publication, moderation and reply are not guaranteed.</p>' +
      '<p class="community-provider-state__boundary">LAiDIES privacy covers this site. Hyvor’s policies cover its external discussion, account, comment and provider data. Use Hyvor’s in-frame flag or reporting controls when available; neither provider nor LAiDIES review or outcome is guaranteed.</p>' +
      '<div class="community-provider-state__links">' +
      '<a href="/sorority-house.html">Back to the house</a>' +
      '<a href="/privacy.html">LAiDIES privacy</a>' +
      '<a href="https://talk.hyvor.com/privacy" target="_blank" rel="noopener noreferrer">Hyvor Talk privacy</a>' +
      '<a href="https://talk.hyvor.com/terms" target="_blank" rel="noopener noreferrer">Hyvor Talk terms</a>' +
      '<a href="https://talk.hyvor.com/docs/moderation" target="_blank" rel="noopener noreferrer">Hyvor moderation and reporting guide</a>' +
      (roomHref ? '<a href="' + roomHref + '">Open the direct room</a>' : "") +
      "</div></div>"
    );
  }

  function removeProviderNodes(root) {
    root.querySelectorAll("hyvor-talk-comments").forEach(function (node) {
      node.remove();
    });
    document
      .querySelectorAll('script[src*="talk.hyvor.com/embed/embed.js"]')
      .forEach(function (node) {
        node.remove();
      });
  }

  function loadProviderScript() {
    if (providerPromise) return providerPromise;
    providerPromise = new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-community-hyvor="true"]');
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      var script = document.createElement("script");
      script.type = "module";
      script.async = true;
      script.src = PROVIDER_SRC;
      script.dataset.communityHyvor = "true";
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
    return providerPromise;
  }

  function mount(options) {
    var mountNode = options && options.mount;
    var pageId = options && options.pageId;
    var roomHref = (options && options.roomHref) || "";
    if (!mountNode || !pageId) return;

    removeProviderNodes(mountNode);
    var state = fixtureState();
    if (!state && LOCAL_HOST.test(window.location.hostname)) state = "local-preview";
    if (!state && !APPROVED_HOST.test(window.location.hostname)) {
      state = "unsupported-host";
    }
    if (state) {
      mountNode.innerHTML = boundaryMarkup(state, roomHref);
      return;
    }

    mountNode.innerHTML = boundaryMarkup("loading", roomHref);
    var comments = document.createElement("hyvor-talk-comments");
    comments.setAttribute("website-id", "15519");
    comments.setAttribute("page-id", pageId);
    mountNode.appendChild(comments);

    var settled = false;
    var unavailableTimer = window.setTimeout(function () {
      if (settled) return;
      settled = true;
      removeProviderNodes(mountNode);
      mountNode.innerHTML = boundaryMarkup("unavailable", roomHref);
    }, 10000);

    loadProviderScript()
      .then(function () {
        return window.customElements
          ? window.customElements.whenDefined("hyvor-talk-comments")
          : Promise.resolve();
      })
      .then(function () {
        if (settled) return;
        settled = true;
        window.clearTimeout(unavailableTimer);
        var status = mountNode.querySelector("[data-community-state]");
        if (status) status.outerHTML = boundaryMarkup("ready", roomHref);
      })
      .catch(function () {
        if (settled) return;
        settled = true;
        window.clearTimeout(unavailableTimer);
        removeProviderNodes(mountNode);
        mountNode.innerHTML = boundaryMarkup("unavailable", roomHref);
      });
  }

  function bindReturnNavigation() {
    var params = new URLSearchParams(window.location.search || "");
    var fromBag = params.get("from") === "this-week";
    var issue = String(params.get("issue") || "").match(/\d+/);
    var issueValue = issue ? Number(issue[0]) : "";
    var draftParam = params.get("draft") === "1" ? "&draft=1" : "";
    var group = /^(practice|connect|realworld|fun)$/.test(
      params.get("group") || ""
    )
      ? params.get("group")
      : "";
    var groupParam = group ? "&group=" + encodeURIComponent(group) : "";
    var groupLabels = {
      practice: "Back to Weekly Study Pack",
      connect: "Back to Meet & Celebrate",
      realworld: "Back to the Book of Receipts",
      fun: "Back to LAiDIES activities"
    };
    // Keep the runtime route explicit without making the static dependency
    // crawler resolve this script-relative. The actual link already exists in
    // each room page and is therefore packaged from its correct page context.
    var communityPath = ["..", "community" + ".html"].join("/");
    var bagHref =
      "../this-week.html" +
      (issueValue
        ? "?issue=" +
          encodeURIComponent(issueValue) +
          "&bag=open" +
          groupParam +
          draftParam
        : "?bag=open" + groupParam + draftParam);
    var roomsHref =
      communityPath +
      (fromBag
        ? "?from=this-week" +
          (issueValue ? "&issue=" + encodeURIComponent(issueValue) : "") +
          "&bag=open" +
          groupParam +
          draftParam +
          "#chat-rooms"
        : "#chat-rooms");

    if (
      fromBag &&
      !document.querySelector(
        "[data-quiz-return], .quiz-return-link, [data-wednesday-return]"
      )
    ) {
      var link = document.createElement("a");
      link.dataset.wednesdayReturn = "true";
      link.className = "wednesday-return";
      link.href = bagHref;
      link.textContent = "\u2190 " + (groupLabels[group] || "Back to the Bag");
      link.style.cssText =
        "position:fixed;bottom:calc(16px + env(safe-area-inset-bottom));left:clamp(14px,3vw,26px);z-index:140;display:inline-flex;max-width:calc(100% - 28px);padding:10px 14px;border:1px solid rgba(185,93,120,.42);border-radius:999px;background:rgba(255,253,251,.94);color:#6f263f;font-weight:850;text-decoration:none;";
      document.body.appendChild(link);
    }

    Array.from(document.querySelectorAll("a[href]"))
      .filter(function (roomLink) {
        var href = roomLink.getAttribute("href");
        return href === communityPath || href === communityPath + "#chat-rooms";
      })
      .forEach(function (roomLink) {
        roomLink.href = roomsHref;
        if (roomLink.classList.contains("button")) {
          roomLink.textContent = "Back to the rooms";
        }
      });
  }

  function bindDirectRooms() {
    bindReturnNavigation();
    document.querySelectorAll(".thread-comments").forEach(function (section) {
      var comments = section.querySelector("hyvor-talk-comments");
      if (!comments) return;
      mount({
        mount: section,
        pageId: comments.getAttribute("page-id")
      });
    });
  }

  window.LAIDIES_COMMUNITY_ROOM = { mount: mount };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindDirectRooms);
  } else {
    bindDirectRooms();
  }
})();
