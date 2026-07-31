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
      return !!localStorage.getItem("laidies_town_hall_feedback_filed");
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
        readFiled() ? "Your last card is on the pile." : "Drop a card. Deb reads them, then Deb-flects."
      );
    }
  }

  window.addEventListener("laidies:town-hall-feedback-filed", renderStations);
  renderStations();
})();
