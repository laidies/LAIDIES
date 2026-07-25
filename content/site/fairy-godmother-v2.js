(function () {
  "use strict";

  var modeSelect = document.getElementById("fairyMode");
  var saintRail = document.getElementById("fgSaintRail");
  var advice = document.getElementById("adviceScroll");
  var emptyResults = document.getElementById("fgEmptyResults");
  var arrivalStatus = document.getElementById("fgArrivalStatus");
  var arrivalNote = document.getElementById("fgArrivalNote");

  var saints = [
    {
      value: "auto",
      label: "Default tone",
      className: "fg-saint-choice--type"
    },
    {
      value: "dolly",
      label: "Dolly",
      image: "../assets/saints/dolly-parton.png"
    },
    {
      value: "miranda",
      label: "Miranda",
      image: "../assets/saints/miranda-priestly.png"
    },
    {
      value: "elle",
      label: "Elle",
      image: "../assets/saints/elle-woods.png"
    },
    {
      value: "cher",
      label: "Cher",
      image: "../assets/saints/cher-horowitz.png"
    },
    {
      value: "sophia",
      label: "Sophia says",
      className: "fg-saint-choice--type"
    },
    {
      value: "david",
      label: "David",
      image: "../assets/saints/david-rose.png"
    },
    {
      value: "buffy",
      label: "Buffy",
      image: "../assets/saints/buffy-summers.png"
    }
  ];

  function setArrivalState() {
    if (!arrivalStatus || !arrivalNote) return;

    var freeWishesUsed = 0;

    try {
      freeWishesUsed = parseInt(localStorage.getItem("laidies_free_wishes_used") || "0", 10) || 0;
    } catch (error) {
      freeWishesUsed = 0;
    }

    if (freeWishesUsed >= 1) {
      arrivalStatus.textContent = "Local preview complete.";
      arrivalNote.textContent = "This page does not verify subscriptions, member allowances, or FAiRY Plays.";
      return;
    }

    arrivalStatus.textContent = "Work-drafting preview.";
    arrivalNote.textContent = "One local preview response; no account or reward is created.";
  }

  function syncSaintSelection() {
    if (!modeSelect || !saintRail) return;
    var selectedValue = modeSelect.value || "auto";
    saintRail.querySelectorAll("[data-saint-value]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.saintValue === selectedValue));
    });
  }

  function buildSaintRail() {
    if (!modeSelect || !saintRail) return;

    saints.forEach(function (saint) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "fg-saint-choice" + (saint.className ? " " + saint.className : "");
      button.dataset.saintValue = saint.value;
      button.setAttribute("aria-label", "Use " + saint.label + " energy");

      if (saint.image) {
        var image = document.createElement("img");
        image.src = saint.image;
        image.alt = "";
        image.loading = "lazy";
        button.appendChild(image);
      }

      var label = document.createElement("span");
      label.textContent = saint.label;
      button.appendChild(label);

      button.addEventListener("click", function () {
        modeSelect.value = saint.value;
        modeSelect.dispatchEvent(new Event("change", { bubbles: true }));
        syncSaintSelection();
      });

      saintRail.appendChild(button);
    });

    modeSelect.addEventListener("change", syncSaintSelection);
    syncSaintSelection();
  }

  function syncResultsState() {
    if (!advice || !emptyResults) return;
    emptyResults.hidden = advice.classList.contains("is-visible");
  }

  buildSaintRail();
  setArrivalState();
  syncResultsState();

  if (advice) {
    new MutationObserver(syncResultsState).observe(advice, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  var randomButton = document.getElementById("randomButton");
  if (randomButton) {
    randomButton.addEventListener("click", function () {
      window.setTimeout(syncSaintSelection, 0);
    });
  }
})();
