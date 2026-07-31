(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  var catalogUrl = "postcard-catalog-candidate.json";
  var catalogRequest = 0;
  var archiveRequest = 0;
  var cards = [];
  var selected = null;

  var rack = document.getElementById("postcardRack");
  var rackFailure = document.getElementById("rackFailure");
  var rackRetry = document.getElementById("rackRetry");
  var selectedImage = document.getElementById("selectedPostcard");
  var selectedTitle = document.getElementById("writing-title");
  var selectedCopy = document.getElementById("writingCopy");
  var selectedReceipt = document.getElementById("selectionReceipt");
  var writeLink = document.getElementById("writePostcard");
  var writingDesk = document.getElementById("writingDesk");
  var archiveGrid = document.getElementById("archiveGrid");
  var archiveFailure = document.getElementById("archiveFailure");
  var archiveRetry = document.getElementById("archiveRetry");
  var newsletterForm = document.getElementById("newsletterForm");
  var newsletterEmail = document.getElementById("newsletterEmail");
  var newsletterReceipt = document.getElementById("newsletterReceipt");

  function safeCard(card) {
    return card &&
      typeof card.id === "string" &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(card.id) &&
      typeof card.label === "string" &&
      card.label === card.label.trim() &&
      card.label.length > 1 &&
      card.label.length < 80 &&
      typeof card.image === "string" &&
      /^\/assets\/postcards\/from-sunnyvaile\/[a-z0-9-]+\.(?:png|webp)$/.test(card.image);
  }

  function validateCatalog(payload) {
    if (!payload || payload.schema !== "laidies.post-office.postcard-catalog.candidate.v1" || !Array.isArray(payload.cards)) {
      throw new Error("catalog schema invalid");
    }
    var ids = Object.create(null);
    var images = Object.create(null);
    var admitted = payload.cards.map(function (card) {
      if (!safeCard(card) || ids[card.id] || images[card.image]) {
        throw new Error("catalog entry invalid or duplicate");
      }
      ids[card.id] = true;
      images[card.image] = true;
      return { id: card.id, label: card.label, image: card.image };
    });
    if (admitted.length !== 11) throw new Error("catalog count invalid");
    return admitted;
  }

  function fallbackImage(label) {
    return "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">' +
      '<rect width="900" height="600" fill="#071b35"/>' +
      '<path d="M0 90h900M0 510h900" stroke="#39d5ff" stroke-width="18"/>' +
      '<rect x="70" y="100" width="760" height="400" rx="20" fill="#fff7dc" stroke="#17113a" stroke-width="12"/>' +
      '<text x="450" y="285" text-anchor="middle" fill="#17113a" font-family="Arial" font-size="42" font-weight="700">POSTCARD ART UNAVAILABLE</text>' +
      '<text x="450" y="350" text-anchor="middle" fill="#087b7b" font-family="Arial" font-size="30">' +
      label.replace(/[<>&]/g, "") +
      '</text></svg>'
    );
  }

  function imageFailure(image, label) {
    image.src = fallbackImage(label);
    image.alt = label + " postcard artwork unavailable";
  }

  function desiredId() {
    var value = params.get("pc");
    return value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? value : "";
  }

  function selectCard(card, button, announce) {
    selected = card;
    rack.querySelectorAll("button[data-card-id]").forEach(function (candidate) {
      var active = candidate === button;
      candidate.setAttribute("aria-pressed", active ? "true" : "false");
    });
    selectedImage.src = card.image;
    selectedImage.alt = card.label + " postcard";
    selectedImage.onerror = function () { imageFailure(selectedImage, card.label); };
    if (params.get("image") === "fail") imageFailure(selectedImage, card.label);
    selectedTitle.textContent = card.label;
    selectedCopy.textContent = "Selected here. Your private note and signature belong in the writing room and are never put in this public link.";
    writeLink.href = "/postcard.html?pc=" + encodeURIComponent(card.id);
    selectedReceipt.textContent = card.label + " is ready at Penny’s desk.";
    var next = new URL(location.href);
    next.searchParams.set("pc", card.id);
    if (params.has("catalog")) next.searchParams.set("catalog", params.get("catalog"));
    if (params.has("archive")) next.searchParams.set("archive", params.get("archive"));
    if (params.has("image")) next.searchParams.set("image", params.get("image"));
    history.replaceState(null, "", next.pathname + next.search + next.hash);
    if (announce) {
      writingDesk.focus({ preventScroll: true });
      writingDesk.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center"
      });
    }
  }

  function renderRack(admitted) {
    rack.replaceChildren();
    cards = admitted;
    var desired = desiredId();
    var selectedButton = null;
    var selectedCard = null;
    admitted.forEach(function (card, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "postcard-card";
      button.dataset.cardId = card.id;
      button.setAttribute("aria-label", "Choose " + card.label + " postcard");
      button.setAttribute("aria-pressed", "false");
      button.style.setProperty("--tilt", ((index % 5) - 2) * 0.8 + "deg");
      var image = document.createElement("img");
      image.src = card.image;
      image.alt = "";
      image.loading = "lazy";
      image.addEventListener("error", function () { imageFailure(image, card.label); });
      var label = document.createElement("span");
      label.textContent = card.label;
      button.append(image, label);
      button.addEventListener("click", function () { selectCard(card, button, true); });
      rack.append(button);
      if ((!selectedCard && card.id === desired) || (!desired && index === 0)) {
        selectedCard = card;
        selectedButton = button;
      }
    });
    if (!selectedCard) {
      selectedCard = admitted[0];
      selectedButton = rack.querySelector("button[data-card-id]");
    }
    selectCard(selectedCard, selectedButton, false);
    rack.setAttribute("aria-busy", "false");
    rackFailure.hidden = true;
  }

  function failRack(focusRecovery) {
    rack.replaceChildren();
    rack.setAttribute("aria-busy", "false");
    rackFailure.hidden = false;
    selected = null;
    selectedImage.src = fallbackImage("Postcard rack");
    selectedImage.alt = "Postcard artwork unavailable because Penny could not verify the rack";
    selectedTitle.textContent = "Postcard rack unavailable";
    selectedCopy.textContent = "Retry the governed rack before carrying a postcard ID to the writing room.";
    selectedReceipt.textContent = "No postcard is selected because Penny could not verify the rack.";
    writeLink.href = "/postcard.html";
    if (focusRecovery) rackRetry.focus();
  }

  function loadCatalog(focusRecovery) {
    var request = ++catalogRequest;
    rack.setAttribute("aria-busy", "true");
    rackFailure.hidden = true;
    Promise.resolve()
      .then(function () {
        if (params.get("catalog") === "malformed") {
          return { schema: "wrong", cards: [{ id: "bad", label: "Bad", image: "https://outside.example/bad.png" }] };
        }
        return fetch(catalogUrl, { cache: "no-store" }).then(function (response) {
          if (!response.ok) throw new Error("catalog unavailable");
          return response.json();
        });
      })
      .then(function (payload) {
        if (request !== catalogRequest) return;
        renderRack(validateCatalog(payload));
      })
      .catch(function () {
        if (request !== catalogRequest) return;
        failRack(focusRecovery === true);
      });
  }

  function safeIssue(entry) {
    return entry &&
      Number.isInteger(entry.number) &&
      entry.number >= 1 &&
      entry.status === "published" &&
      typeof entry.title === "string" &&
      typeof entry.oneLineDescription === "string" &&
      /^\/?issues\/issue-[0-9]{2,3}\.html$/.test(entry.issueUrl) &&
      /^\/?assets\/[A-Za-z0-9_./-]+\.(?:avif|jpe?g|png|webp)$/.test(entry.heroImage);
  }

  function rootPath(value) {
    return value.charAt(0) === "/" ? value : "/" + value;
  }

  function renderArchive(entries) {
    var numbers = Object.create(null);
    var urls = Object.create(null);
    var admitted = entries.filter(safeIssue).map(function (entry) {
      if (numbers[entry.number] || urls[entry.issueUrl]) throw new Error("duplicate archive");
      numbers[entry.number] = true;
      urls[entry.issueUrl] = true;
      return {
        number: entry.number,
        title: entry.title,
        oneLineDescription: entry.oneLineDescription,
        issueUrl: rootPath(entry.issueUrl),
        heroImage: rootPath(entry.heroImage)
      };
    }).sort(function (a, b) { return b.number - a.number; });
    if (!admitted.length) throw new Error("archive empty");
    archiveGrid.replaceChildren();
    admitted.forEach(function (episode) {
      var article = document.createElement("article");
      article.className = "archive-card";
      var link = document.createElement("a");
      link.href = episode.issueUrl;
      link.setAttribute("aria-label", "Open Episode " + String(episode.number).padStart(2, "0") + " — " + episode.title);
      var image = document.createElement("img");
      image.src = episode.heroImage;
      image.alt = "";
      image.loading = "lazy";
      image.addEventListener("error", function () { imageFailure(image, episode.title); });
      var copy = document.createElement("div");
      copy.className = "archive-card__copy";
      var stamp = document.createElement("p");
      stamp.className = "published";
      stamp.textContent = "PUBLISHED · EP " + String(episode.number).padStart(2, "0");
      var heading = document.createElement("h3");
      heading.textContent = episode.title;
      var description = document.createElement("p");
      description.textContent = episode.oneLineDescription;
      copy.append(stamp, heading, description);
      link.append(image, copy);
      article.append(link);
      archiveGrid.append(article);
    });
    archiveGrid.setAttribute("aria-busy", "false");
    archiveFailure.hidden = true;
  }

  function failArchive(focusRecovery) {
    archiveGrid.replaceChildren();
    archiveGrid.setAttribute("aria-busy", "false");
    archiveFailure.hidden = false;
    if (focusRecovery) archiveRetry.focus();
  }

  function loadArchive(focusRecovery) {
    var request = ++archiveRequest;
    archiveGrid.setAttribute("aria-busy", "true");
    archiveFailure.hidden = true;
    Promise.resolve()
      .then(function () {
        if (params.get("archive") === "fail") throw new Error("fixture");
        return fetch("/content/episode-index.json", { cache: "no-store" }).then(function (response) {
          if (!response.ok) throw new Error("archive unavailable");
          return response.json();
        });
      })
      .then(function (payload) {
        if (request !== archiveRequest) return;
        if (!payload || !Array.isArray(payload.episodes)) throw new Error("archive malformed");
        renderArchive(payload.episodes);
      })
      .catch(function () {
        if (request !== archiveRequest) return;
        failArchive(focusRecovery === true);
      });
  }

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!newsletterEmail.value || !newsletterEmail.checkValidity()) {
      newsletterEmail.setAttribute("aria-invalid", "true");
      newsletterReceipt.textContent = "Enter a valid email before Penny prepares the Buttondown handoff.";
      newsletterEmail.focus();
      return;
    }
    newsletterEmail.removeAttribute("aria-invalid");
    if (params.get("newsletter") === "blocked") {
      newsletterReceipt.textContent = "The Buttondown handoff could not be prepared. Your address stays in this form so you can correct it or try again.";
      return;
    }
    newsletterReceipt.textContent = "Ready to continue at Buttondown. Nothing has been subscribed or delivered yet.";
  });

  rackRetry.addEventListener("click", function () { loadCatalog(true); });
  archiveRetry.addEventListener("click", function () { loadArchive(true); });
  loadCatalog(false);
  loadArchive(false);
})();
