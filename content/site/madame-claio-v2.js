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
    var count = 0;
    var items = [];

    try {
      count = parseInt(localStorage.getItem("claio-call-count") || "0", 10) || 0;
    } catch (error) {
      count = 0;
    }

    try {
      items = JSON.parse(localStorage.getItem("claio-call-history") || "[]");
      if (!Array.isArray(items)) items = [];
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
      arrivalNote.textContent = "Your last card was " + (last && last.card ? last.card : "already written in the velvet") + ".";
      return;
    }

    if (state.count > 0) {
      var remaining = Math.max(5 - state.count, 0);
      arrivalStatus.textContent = "Back again. Your last card was " + (last && last.card ? last.card : "waiting on the table") + ".";
      arrivalNote.textContent = remaining + " more " + (remaining === 1 ? "reading" : "readings") + " and she knows your number.";
      return;
    }

    arrivalStatus.textContent = "Madame is in. Your first reading is free.";
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
      deckHotspot.blur();
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

  if (history) history.setAttribute("aria-live", "polite");

  updateArrival();
  syncRoomState();
})();
