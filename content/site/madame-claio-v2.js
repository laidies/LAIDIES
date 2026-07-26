(function () {
  "use strict";

  var room = document.getElementById("claioRoom");
  var mainButton = document.getElementById("fortuneButton");
  var deckHotspot = document.getElementById("claioDeckHotspot");
  var fortuneCard = document.getElementById("fortuneCard");
  var counter = document.getElementById("callCounter");
  var arrivalStatus = document.getElementById("claioArrivalStatus");
  var arrivalNote = document.getElementById("claioArrivalNote");
  var history = document.getElementById("callHistory");

  function readState() {
    if (typeof window.getClaioLocalState === "function") {
      return window.getClaioLocalState();
    }
    var count = 0;
    var items = [];

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

    return { count: count, history: items };
  }

  function updateArrival() {
    if (!arrivalStatus || !arrivalNote) return;
    var state = readState();
    var last = state.history.length ? state.history[state.history.length - 1] : null;

    if (state.count >= 5) {
      arrivalStatus.textContent = "She knows your number, Hotline Regular.";
      arrivalNote.textContent = "On this device, your last card was " + (last && last.card ? last.card : "already written in the velvet") + ".";
      return;
    }

    if (state.count > 0) {
      var remaining = Math.max(5 - state.count, 0);
      arrivalStatus.textContent = "Back again. On this device, your last card was " + (last && last.card ? last.card : "waiting on the table") + ".";
      arrivalNote.textContent = remaining + " more completed " + (remaining === 1 ? "reading" : "readings") + " for the local Hotline Regular keepsake.";
      return;
    }

    arrivalStatus.textContent = "Madame is in. The deck is ready.";
    arrivalNote.textContent = "Cut the deck when you are ready.";
  }

  function syncRoomState() {
    if (!room || !fortuneCard) return;
    var readingVisible = fortuneCard.classList.contains("is-visible");
    room.classList.toggle("is-reading", readingVisible);
    if (deckHotspot) deckHotspot.setAttribute("aria-label", readingVisible ? "Pull another card from the deck" : "Cut the deck on the séance table");
    updateArrival();
  }

  if (deckHotspot && mainButton) {
    deckHotspot.addEventListener("click", function () {
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
