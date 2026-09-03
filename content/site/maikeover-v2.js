(function () {
  "use strict";

  var toolCopy = {
    backdrop: "Pick the finish for your Card.",
    soundtrack: "Pick your song.",
    saint: "Pick your Patron Saint.",
    era: "Pick your movie and television favourites.",
    carrying: "Pick what you’re carrying.",
    finish: "Add your name, save, then connect your account."
  };

  var toolLabels = {
    backdrop: "Backdrop", soundtrack: "Soundtrack",
    saint: "Saint", era: "Era faves", carrying: "Carrying", finish: "Finish"
  };
  var toolHeadings = {
    backdrop: "Choose your backdrop",
    soundtrack: "Choose your soundtrack", saint: "Choose your Patron Saint",
    era: "Choose your era faves", carrying: "Choose what you're carrying",
    finish: "Finish your Resident Card"
  };
  var toolOrder = ["backdrop", "era", "soundtrack", "saint", "carrying", "finish"];
  var currentTool = "backdrop";

  var toolGroups = {
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
    var persistence = document.getElementById("moPersistenceState");
    var handle = localValue("laidies_card_username");
    if (persistence) {
      persistence.innerHTML = handle
        ? "<strong>You have started a Card for @" +
          handle +
          ".</strong> Connect your account so your Card and Closet are available across devices."
        : "<strong>You can start before signing in.</strong> Connect your account before you leave if you want your Card and Closet available on another device.";
    }
  }

  function moveLiveObjects() {
    var mirrorMount = document.getElementById("moMirrorMount");
    var card = document.getElementById("moCard");
    var controls = document.querySelector(".mo-controls");
    var claimCard = document.getElementById("mo-claim-card");

    if (mirrorMount && card) mirrorMount.appendChild(card);
    if (controls && controls.children[9] && claimCard) {
      controls.children[9].appendChild(claimCard);
    }

  }

  function setTool(tool, shouldScroll) {
    var controls = document.querySelector(".mo-controls");
    var status = document.getElementById("moToolStatus");
    var buttons = document.querySelectorAll("[data-mo-tool]");
    var heading = document.querySelector(".mo-drawer-heading");
    var previous = document.getElementById("moPreviousTool");
    var next = document.getElementById("moNextTool");
    var visible = toolGroups[tool] || toolGroups.backdrop;
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

    currentTool = tool;
    controls.setAttribute("data-active-tool", tool);
    if (heading) heading.textContent = toolHeadings[tool] || toolHeadings.backdrop;
    if (status) status.textContent = toolCopy[tool] || toolCopy.backdrop;
    var index = toolOrder.indexOf(tool);
    if (previous) {
      previous.disabled = index <= 0;
      previous.textContent = index > 0 ? "Previous: " + toolLabels[toolOrder[index - 1]] : "Previous step";
    }
    if (next) {
      next.hidden = index >= toolOrder.length - 1;
      next.textContent = index < toolOrder.length - 1 ? "Next: " + toolLabels[toolOrder[index + 1]] : "Save your Card";
    }

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
    var previous = document.getElementById("moPreviousTool");
    var next = document.getElementById("moNextTool");
    if (previous) previous.addEventListener("click", function () {
      var index = toolOrder.indexOf(currentTool);
      if (index > 0) setTool(toolOrder[index - 1], true);
    });
    if (next) next.addEventListener("click", function () {
      var index = toolOrder.indexOf(currentTool);
      if (index < toolOrder.length - 1) setTool(toolOrder[index + 1], true);
      else {
        var save = document.getElementById("moSave");
        if (save) save.focus();
      }
    });
    setTool(window.location.hash === "#mo-claim-card" ? "finish" : "backdrop", false);
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
