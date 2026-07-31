(function () {
  "use strict";

  var pickKeys = {
    saint: "laidies_saint",
    maven: "laidies_maven",
    builder: "laidies_builder"
  };

  function localValue(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch (_) {
      return "";
    }
  }

  function titleFromSlug(value) {
    if (!value) return "No candle lit";
    return value
      .replace(/^saint-/, "")
      .split("-")
      .map(function (word) {
        return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
      })
      .join(" ");
  }

  function collectedCount() {
    try {
      var value = JSON.parse(localValue("laidies_mavens_collected") || "[]");
      return Array.isArray(value) ? value.length : 0;
    } catch (_) {
      return 0;
    }
  }

  function renderState() {
    var picks = {
      saint: localValue(pickKeys.saint),
      maven: localValue(pickKeys.maven),
      builder: localValue(pickKeys.builder)
    };
    var names = [];

    Object.keys(picks).forEach(function (kind) {
      var node = document.getElementById(
        kind === "builder"
          ? "lumBuilderPick"
          : kind === "maven"
            ? "lumMavenPick"
            : "lumSaintPick"
      );
      var holder = document.querySelector('[data-lum-votive="' + kind + '"]');
      if (node) node.textContent = titleFromSlug(picks[kind]);
      if (holder) holder.classList.toggle("is-lit", Boolean(picks[kind]));
      if (picks[kind]) names.push(titleFromSlug(picks[kind]));
    });

    var title = document.getElementById("lumStateTitle");
    var summary = document.getElementById("lumStateSummary");
    var progress = document.getElementById("lumMavenProgress");

    if (title) {
      title.textContent = names.length
        ? names.length + " of 3 Luminaries lit."
        : "No Luminaries lit yet.";
    }
    if (summary) {
      summary.textContent = names.length
        ? "Lit in your register: " + names.join(" · ") + ". Pick again inside a wing to change the light."
        : "Pick one SAiNT, one MAiVEN and one TRAiLBLAZER below. Your choices live on your Resident Card.";
    }
    if (progress) {
      progress.textContent = "MAiVENS met · " + Math.min(8, collectedCount()) + " / 8";
    }
  }

  function setMavenChamber(name, moveFocus) {
    var buttons = Array.prototype.slice.call(
      document.querySelectorAll("[data-maven-chamber-button]")
    );
    var chambers = Array.prototype.slice.call(
      document.querySelectorAll("[data-maven-chamber]")
    );
    var selectedButton = null;

    buttons.forEach(function (button) {
      var active = button.getAttribute("data-maven-chamber-button") === name;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.setAttribute("tabindex", active ? "0" : "-1");
      if (active) selectedButton = button;
    });

    chambers.forEach(function (chamber) {
      var active = chamber.getAttribute("data-maven-chamber") === name;
      chamber.hidden = !active;
      chamber.classList.toggle("is-active", active);
    });

    if (moveFocus && selectedButton) selectedButton.focus();
  }

  function initMavenIndex() {
    var index = document.querySelector(".lum-archive-index");
    if (!index) return;

    index.addEventListener("click", function (event) {
      var button = event.target.closest("[data-maven-chamber-button]");
      if (!button) return;
      setMavenChamber(button.getAttribute("data-maven-chamber-button"), false);
    });

    index.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      var buttons = Array.prototype.slice.call(
        index.querySelectorAll("[data-maven-chamber-button]")
      );
      var activeIndex = buttons.indexOf(document.activeElement);
      if (activeIndex < 0) return;
      event.preventDefault();
      var offset = event.key === "ArrowRight" ? 1 : -1;
      var next = (activeIndex + offset + buttons.length) % buttons.length;
      setMavenChamber(
        buttons[next].getAttribute("data-maven-chamber-button"),
        true
      );
    });

    setMavenChamber("keepers", false);
  }

  function init() {
    var state = document.querySelector(".lum-state");
    if (state) state.setAttribute("aria-live", "polite");
    initMavenIndex();
    renderState();
    document.addEventListener("click", function (event) {
      if (
        event.target.closest &&
        (event.target.closest(".coven-pick") || event.target.closest(".maven-meet"))
      ) {
        window.setTimeout(renderState, 0);
      }
    });
    window.addEventListener("storage", renderState);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
