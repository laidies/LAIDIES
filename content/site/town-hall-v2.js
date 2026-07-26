(function () {
  "use strict";

  var room = document.querySelector(".town-hall-room");
  var stationHost = document.getElementById("townHallStations");
  var hubs = document.getElementById("th-hubs");
  if (!room || !stationHost || !hubs) return;

  stationHost.appendChild(hubs);

  var buttons = Array.prototype.slice.call(hubs.querySelectorAll(".th-hub"));
  var regularCount = document.querySelectorAll(".th-regular[data-town-slug]").length;

  function readFiled() {
    try {
      var raw = localStorage.getItem("laidies_town_hall_feedback_filed");
      if (!raw) return false;
      var receipt = JSON.parse(raw);
      if (
        !receipt ||
        receipt.version !== 1 ||
        receipt.outcome !== "accepted" ||
        typeof receipt.acceptedAt !== "string"
      ) {
        return false;
      }
      var acceptedAt = Date.parse(receipt.acceptedAt);
      return (
        Number.isFinite(acceptedAt) &&
        new Date(acceptedAt).toISOString() === receipt.acceptedAt &&
        acceptedAt <= Date.now() + 300000
      );
    } catch (_) {
      return false;
    }
  }

  function setStation(button, name, detail) {
    var nameEl = button.querySelector(".th-hub__name");
    var countEl = button.querySelector(".th-hub__count");
    if (nameEl) nameEl.textContent = name;
    if (countEl) countEl.textContent = detail;
  }

  function renderStations() {
    if (buttons[0]) setStation(buttons[0], "Mayor's Office", "Deb is in. She always is.");
    if (buttons[1]) setStation(buttons[1], "The Noticeboard", regularCount + " Regulars pinned this week.");
    if (buttons[2]) {
      setStation(
        buttons[2],
        "Comments",
        readFiled()
          ? "This device records one accepted card."
          : "Open a private comment card."
      );
    }
  }

  window.addEventListener("laidies:town-hall-feedback-filed", renderStations);
  renderStations();
})();
