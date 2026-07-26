(function () {
  "use strict";

  var STATION = 99.9;

  function moveStudioControls() {
    var host = document.getElementById("ksvlStudioControls");
    var hubs = document.getElementById("ksvl-hubs");
    if (host && hubs && hubs.parentNode !== host) host.appendChild(hubs);
  }

  function nowPlayingText() {
    var bar = document.querySelector(".ksvl-now-playing");
    if (!bar || !bar.classList.contains("is-visible")) return "";
    var track = bar.querySelector(".ksvl-np-track");
    var mix = bar.querySelector(".ksvl-np-mix");
    var trackText = track ? track.textContent.trim() : "";
    var mixText = mix ? mix.textContent.trim() : "";
    if (!trackText) return mixText;
    return mixText ? trackText + " · " + mixText : trackText;
  }

  function renderBroadcastState() {
    var studio = document.querySelector(".ksvl-studio");
    var state = document.getElementById("ksvlStudioState");
    if (!studio || !state) return;

    studio.classList.remove("is-live");
    state.textContent = "SOUNDCHECK HOLD · Public listening is unavailable.";
  }

  function initBroadcastObserver() {
    renderBroadcastState();
    window.setInterval(renderBroadcastState, 1200);
  }

  function initDial() {
    var dial = document.getElementById("ksvlDial");
    var readout = document.getElementById("ksvlDialReadout");
    var message = document.getElementById("ksvlDialMessage");
    if (!dial || !readout || !message) return;

    function display() {
      var value = Number(dial.value);
      readout.textContent = value.toFixed(1);
      message.textContent =
        Math.abs(value - STATION) < 0.06
          ? "99.9 is in soundcheck. No audio will start."
          : "Decorative static. KSVL listening remains held at 99.9.";
    }

    function snapHome() {
      window.setTimeout(function () {
        dial.value = String(STATION);
        display();
      }, 180);
    }

    dial.addEventListener("input", display);
    dial.addEventListener("change", snapHome);
    display();
  }

  function init() {
    moveStudioControls();
    initDial();
    initBroadcastObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
