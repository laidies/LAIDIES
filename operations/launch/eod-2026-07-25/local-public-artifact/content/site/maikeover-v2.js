(function () {
  "use strict";

  var toolCopy = {
    look: "Look drawer open · make or upload your avatar.",
    backdrop: "Backdrop drawer open · choose the card and portrait setting.",
    soundtrack: "Soundtrack drawer open · choose the song that follows you home.",
    saint: "Patron Saint drawer open · pick the voice you want in your corner.",
    era: "Era Faves drawer open · put your movie and television canon on the card.",
    carrying: "Carrying drawer open · choose the one thing in your bag.",
    finish: "Finish drawer open · sign the card, save it, then claim your handle."
  };

  var toolGroups = {
    look: [0],
    backdrop: [1],
    soundtrack: [2],
    saint: [3],
    era: [4, 5],
    carrying: [6],
    finish: [7, 8, 9]
  };

  function localValue(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch (_) {
      return "";
    }
  }

  function setArrivalState() {
    var title = document.getElementById("moArrivalTitle");
    if (!title) return;
    var handle = localValue("laidies_card_username");
    title.textContent = handle
      ? "Welcome back, @" + handle + " — the chair remembers you."
      : "New here? Take the chair.";
  }

  function moveLiveObjects() {
    var mirrorMount = document.getElementById("moMirrorMount");
    var candidateMount = document.getElementById("moCandidateMount");
    var card = document.getElementById("moCard");
    var candidates = document.getElementById("moCands");
    var controls = document.querySelector(".mo-controls");
    var claimCard = document.getElementById("mo-claim-card");

    if (mirrorMount && card) mirrorMount.appendChild(card);
    if (candidateMount && candidates) candidateMount.appendChild(candidates);
    if (controls && controls.children[9] && claimCard) {
      controls.children[9].appendChild(claimCard);
    }

    if (candidateMount && candidates && window.MutationObserver) {
      var syncCandidateState = function () {
        candidateMount.classList.toggle("has-candidates", candidates.children.length > 0);
      };
      new MutationObserver(syncCandidateState).observe(candidates, { childList: true });
      syncCandidateState();
    }
  }

  function setTool(tool, shouldScroll) {
    var controls = document.querySelector(".mo-controls");
    var status = document.getElementById("moToolStatus");
    var buttons = document.querySelectorAll("[data-mo-tool]");
    var visible = toolGroups[tool] || toolGroups.look;
    var children;
    var i;

    if (!controls) return;
    children = controls.children;

    for (i = 0; i < children.length; i += 1) {
      children[i].hidden = visible.indexOf(i) === -1;
      children[i].setAttribute("data-mo-tool-panel", tool);
    }

    for (i = 0; i < buttons.length; i += 1) {
      buttons[i].setAttribute(
        "aria-pressed",
        buttons[i].getAttribute("data-mo-tool") === tool ? "true" : "false"
      );
    }

    if (status) status.textContent = toolCopy[tool] || toolCopy.look;

    if (shouldScroll) {
      document.getElementById("mo-chair").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    }
  }

  function wireToolTray() {
    var buttons = document.querySelectorAll("[data-mo-tool]");
    Array.prototype.forEach.call(buttons, function (button) {
      button.setAttribute("aria-controls", "mo-chair");
      button.addEventListener("click", function () {
        setTool(button.getAttribute("data-mo-tool"), true);
      });
    });
    setTool(window.location.hash === "#mo-claim-card" ? "finish" : "look", false);
  }

  function updateMirrorState() {
    var room = document.querySelector(".mo-room");
    if (!room) return;

    var completed = 0;
    var avatar = document.querySelector("#moAvatar img");
    var fields = [
      document.getElementById("moNameInput"),
      document.getElementById("moSongSel"),
      document.getElementById("moSaintSel"),
      document.getElementById("moMovieSel"),
      document.getElementById("moTvSel"),
      document.getElementById("moCarrySel")
    ];

    if (avatar) completed += 1;
    fields.forEach(function (field) {
      if (field && String(field.value || "").trim()) completed += 1;
    });

    room.classList.toggle("is-building", completed > 0 && completed < 7);
    room.classList.toggle("is-complete", completed >= 7);
  }

  function watchMirror() {
    var card = document.getElementById("moCard");
    var controls = document.querySelector(".mo-controls");
    if (card && window.MutationObserver) {
      new MutationObserver(updateMirrorState).observe(card, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
    if (controls) {
      controls.addEventListener("change", updateMirrorState);
      controls.addEventListener("input", updateMirrorState);
      controls.addEventListener("click", function () {
        window.setTimeout(updateMirrorState, 0);
      });
    }
    updateMirrorState();
  }

  function init() {
    moveLiveObjects();
    wireToolTray();
    setArrivalState();
    watchMirror();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
