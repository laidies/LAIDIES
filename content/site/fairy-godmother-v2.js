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
      label: "Read the room",
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

    var subscriber = null;
    var freeWishesUsed = 0;

    try {
      var rawSubscriber = localStorage.getItem("laidies_subscriber");
      subscriber = rawSubscriber ? JSON.parse(rawSubscriber) : null;
    } catch (error) {
      subscriber = null;
    }

    try {
      freeWishesUsed = parseInt(localStorage.getItem("laidies_free_wishes_used") || "0", 10) || 0;
    } catch (error) {
      freeWishesUsed = 0;
    }

    if (subscriber && subscriber.email) {
      arrivalStatus.textContent = "You are on the list.";
      arrivalNote.textContent = "Your subscriber allowance is checked when you wave the wand.";
      return;
    }

    if (freeWishesUsed >= 1) {
      arrivalStatus.textContent = "Your free wish has been used.";
      arrivalNote.textContent = "The next answer opens through the LAiDIES newsletter gate.";
      return;
    }

    arrivalStatus.textContent = "One free wish is waiting.";
    arrivalNote.textContent = "Try the full prompt repair before the newsletter gate appears.";
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
