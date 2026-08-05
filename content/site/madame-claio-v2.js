(function () {
  "use strict";

  var room = document.getElementById("claioRoom");
  var mainButton = document.getElementById("claioFortuneButton");
  var repeatButton = document.getElementById("fortuneRepeatButton");
  var deckHotspot = document.getElementById("claioDeckHotspot");
  var fortuneCard = document.getElementById("fortuneCard");
  var counter = document.getElementById("callCounter");
  var arrivalStatus = document.getElementById("claioArrivalStatus");
  var arrivalNote = document.getElementById("claioArrivalNote");
  var history = document.getElementById("callHistory");
  var hasDrawnThisSession = false;

  function readState() {
    if (typeof window.getClaioLocalState === "function") {
      return window.getClaioLocalState();
    }
    var count = 0;
    var items = [];
    var hasHotlineKeepsake = false;

    try {
      var rawCount = localStorage.getItem("claio-call-count") || "0";
      var parsedCount = /^(0|[1-9]\d*)$/.test(rawCount) ? Number(rawCount) : 0;
      count = Number.isSafeInteger(parsedCount) && parsedCount >= 0 && parsedCount <= 10000
        ? parsedCount : 0;
    } catch (error) {
      count = 0;
    }

    try {
      items = JSON.parse(localStorage.getItem("claio-call-history") || "[]");
      if (!Array.isArray(items)) items = [];
      items = items.filter(function (item) {
        return item && Object.getPrototypeOf(item) === Object.prototype &&
          typeof item.card === "string" && typeof item.read === "string";
      }).slice(-10);
    } catch (error) {
      items = [];
    }

    try {
      var badges = JSON.parse(localStorage.getItem("laidiesSecretBadges") || "{}");
      hasHotlineKeepsake = Boolean(
        badges && Object.getPrototypeOf(badges) === Object.prototype &&
        badges["hotline-regular"] &&
        badges["hotline-regular"].scope === "device-local"
      );
    } catch (error) {
      hasHotlineKeepsake = false;
    }

    return {
      count: count,
      history: items,
      storageAvailable: true,
      hasHotlineKeepsake: hasHotlineKeepsake
    };
  }

  function updateArrival() {
    if (!arrivalStatus || !arrivalNote) return;
    var state = readState();
    var last = state.history.length ? state.history[state.history.length - 1] : null;

    if (hasDrawnThisSession && state.storageAvailable === false) {
      arrivalStatus.textContent = "Your reading is ready.";
      arrivalNote.textContent = "Browser storage is unavailable, so this visit was not saved.";
      return;
    }

    if (state.hasHotlineKeepsake) {
      arrivalStatus.textContent = hasDrawnThisSession ? "Reading complete. Your line is open." : "Your line is open, Hotline Regular.";
      arrivalNote.textContent = "Last card on this device: " + (last && last.card ? last.card : "already written in the velvet") + ".";
      return;
    }

    if (state.count >= 5) {
      arrivalStatus.textContent = hasDrawnThisSession
        ? "Your reading: " + (last && last.card ? last.card : "a card is ready") + "."
        : "Welcome back. On this device: " + (last && last.card ? last.card : "a card is waiting") + ".";
      arrivalNote.textContent = "The local keepsake is not saved yet. Cut the deck once to try again.";
      return;
    }

    if (state.count > 0) {
      var remaining = Math.max(5 - state.count, 0);
      arrivalStatus.textContent = hasDrawnThisSession
        ? "Your reading: " + (last && last.card ? last.card : "a card is ready") + "."
        : "Welcome back. On this device: " + (last && last.card ? last.card : "a card is waiting") + ".";
      arrivalNote.textContent = remaining + " more completed " + (remaining === 1 ? "reading" : "readings") + " for the local keepsake.";
      return;
    }

    arrivalStatus.textContent = "Madame is in. The deck is ready.";
    arrivalNote.textContent = "Cut the deck when you are ready.";
  }

  function syncRoomState() {
    if (!room || !fortuneCard) return;
    var readingVisible = fortuneCard.classList.contains("is-visible");
    if (readingVisible) hasDrawnThisSession = true;
    room.classList.toggle("is-reading", readingVisible);
    if (deckHotspot) {
      var actionLabel = readingVisible ? "Pull another" : "Cut the deck";
      deckHotspot.setAttribute("aria-label", readingVisible ? "Pull another card from the deck" : "Cut the deck on the séance table");
      var visibleLabel = deckHotspot.querySelector("span");
      if (visibleLabel) visibleLabel.textContent = actionLabel;
    }
    updateArrival();
  }

  if (deckHotspot && mainButton) {
    deckHotspot.addEventListener("click", function () {
      if (!mainButton.disabled) mainButton.click();
    });
  }


  if (repeatButton && mainButton) {
    repeatButton.addEventListener("click", function () {
      if (!mainButton.disabled) mainButton.click();
    });
  }

  if (fortuneCard) {
    new MutationObserver(syncRoomState).observe(fortuneCard, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  if (counter) {
    new MutationObserver(updateArrival).observe(counter, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  if (history) history.setAttribute("aria-label", "Recent readings saved in this browser on this device");

  updateArrival();
  syncRoomState();
})();
