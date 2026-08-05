(function () {
  "use strict";

  var CATALOG_URL = "/content/site/postcard-catalog.json";
  var rack = document.getElementById("poPostcardRack");
  var previewImage = document.getElementById("poPostcardPreview");
  var previewTitle = document.getElementById("poPostcardTitle");
  var writeLink = document.getElementById("poWriteLink");
  var postcardBoundary = document.getElementById("poPostcardBoundary");

  function verifiedCatalogue(payload) {
    var ids = Object.create(null);
    var files = Object.create(null);
    if (!payload || payload.schemaVersion !== "1.0.0" || payload.catalogId !== "postcard-picker-v1" ||
      typeof payload.preDispatchBoundary !== "string" || !payload.preDispatchBoundary ||
      !Array.isArray(payload.cards)) return null;
    if (payload.visualState === "HELD" && payload.cards.length === 0) {
      return { held: true, cards: [] };
    }
    if (payload.visualState !== "ACTIVE" || payload.cards.length !== 11) return null;
    if (!payload.cards.every(function (card) {
      if (!card || typeof card.id !== "string" || !/^[a-z0-9-]+$/.test(card.id) || ids[card.id] ||
        typeof card.file !== "string" || !/^pc-[a-z0-9-]+\.png$/.test(card.file) || files[card.file] ||
        typeof card.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(card.sha256) ||
        typeof card.rackLabel !== "string" || !card.rackLabel ||
        typeof card.composerLabel !== "string" || !card.composerLabel ||
        typeof card.alt !== "string" || !card.alt || typeof card.publicPath !== "string" ||
        !/^\/assets\/[A-Za-z0-9_.\/-]+\.(?:avif|jpe?g|png|webp)$/.test(card.publicPath)) return false;
      ids[card.id] = true; files[card.file] = true; return true;
    })) return null;
    return { held: false, cards: payload.cards };
  }

  function postcardHeld(boundary) {
    var message = document.createElement("p");
    message.className = "svb-honest-note";
    message.textContent = "The postcard artwork is being checked before it enters the public rack.";
    rack.replaceChildren(message);
    previewImage.removeAttribute("src"); previewImage.alt = ""; previewImage.hidden = true;
    previewTitle.textContent = "Postcard artwork held";
    postcardBoundary.textContent = boundary;
    writeLink.removeAttribute("href"); writeLink.hidden = true;
  }

  function postcardFailure() {
    var message = document.createElement("p");
    message.className = "svb-honest-note";
    message.textContent = "The postcard rack could not be verified. No postcard has been selected or loaded.";
    rack.replaceChildren(message);
    previewImage.removeAttribute("src"); previewImage.alt = ""; previewImage.hidden = true;
    previewTitle.textContent = "Postcard selection unavailable";
    postcardBoundary.textContent = "No postcard is selected. The writing desk is unavailable until the catalogue can be verified.";
    writeLink.removeAttribute("href"); writeLink.hidden = true;
  }

  function admittedArchivePath(value, kind) {
    if (typeof value !== "string" || value !== value.trim() || !value) return null;
    if (/[\u0000-\u001F\u007F\\%?#]/.test(value)) return null;
    if (value.slice(0, 2) === "//") return null;
    var canonical = value.charAt(0) === "/" ? value : "/" + value;
    if (!/^\/(?!\/)/.test(canonical)) return null;
    var segments = canonical.split("/").slice(1);
    if (!segments.length || segments.some(function (segment) {
      return !segment || segment === "." || segment === "..";
    })) return null;
    if (kind === "image") {
      return /^\/assets\/[A-Za-z0-9_.\/-]+\.(?:avif|jpe?g|png|webp)$/.test(canonical)
        ? canonical
        : null;
    }
    if (kind === "issue") {
      return /^\/issues\/issue-[0-9]{2,3}\.html$/.test(canonical)
        ? canonical
        : null;
    }
    return null;
  }

  function archiveFailure(focusRecovery) {
    var message = document.createElement("p");
    message.className = "po-archive-error";
    message.textContent = "The published-episode drawer could not be verified. No newsletter delivery is implied; use the homepage to browse the currently available site.";
    var retry = document.createElement("button");
    retry.type = "button";
    retry.className = "svb-action po-archive-retry";
    retry.textContent = "Retry the archive check";
    retry.addEventListener("click", function () {
      retry.disabled = true;
      loadArchive(true);
    });
    archive.replaceChildren(message, retry);
    if (focusRecovery) retry.focus();
  }

  function selectPostcard(card, button) {
    rack.querySelectorAll("button").forEach(function (item) {
      item.classList.toggle("is-selected", item === button);
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });
    previewImage.src = card.publicPath;
    previewImage.alt = card.alt;
    previewImage.hidden = false;
    previewTitle.textContent = card.rackLabel;
    writeLink.href = "/postcard.html?pc=" + encodeURIComponent(card.id);
  }

  function loadPostcards() {
    fetch(CATALOG_URL, { cache: "no-store" })
      .then(function (response) { if (!response.ok) throw new Error("catalogue unavailable"); return response.json(); })
      .then(function (payload) {
        var catalogue = verifiedCatalogue(payload);
        if (!catalogue) throw new Error("catalogue invalid");
        if (catalogue.held) { postcardHeld(payload.preDispatchBoundary); return; }
        var postcards = catalogue.cards;
        postcardBoundary.textContent = payload.preDispatchBoundary;
        postcards.forEach(function (card, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "po-postcard";
      button.dataset.id = card.id;
      button.setAttribute("aria-label", "Choose " + card.rackLabel + " postcard");
      button.setAttribute("aria-pressed", "false");
      button.style.setProperty("--po-tilt", ((index % 5) - 2) * 1.1 + "deg");
      button.innerHTML = '<img src="' + card.publicPath + '" alt="" loading="lazy"><span>' + card.rackLabel + "</span>";
      button.addEventListener("click", function () {
        selectPostcard(card, button);
        document.getElementById("poWritingDesk").scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "center"
        });
      });
      rack.appendChild(button);
      if (index === 0) selectPostcard(card, button);
        });
      })
      .catch(postcardFailure);
  }

  if (rack) loadPostcards();

  var archive = document.getElementById("poArchive");
  function loadArchive(focusRecovery) {
    fetch("/content/episode-index.json")
      .then(function (response) {
        if (!response.ok) throw new Error("archive unavailable");
        return response.json();
      })
      .then(function (data) {
        var episodes = (data.episodes || []).filter(function (episode) {
          return episode.status === "published";
        });

        if (!episodes.length) {
          archive.textContent = "No published episodes are admitted to this drawer yet.";
          return;
        }
        var admittedNumbers = Object.create(null);
        var admittedIssueUrls = Object.create(null);
        var admittedEpisodes = episodes.map(function (episode) {
          if (
            !episode ||
            typeof episode.number !== "number" ||
            !Number.isInteger(episode.number) ||
            episode.number < 1 ||
            typeof episode.title !== "string" ||
            typeof episode.oneLineDescription !== "string" ||
            !(
              (typeof episode.heroImage === "string" && episode.heroImage) ||
              (episode.heroImage === null && episode.heroVisualState === "HELD")
            ) ||
            typeof episode.issueUrl !== "string"
          ) {
            throw new Error("archive entry invalid");
          }
          var number = String(episode.number).padStart(2, "0");
          var heldHero = episode.heroImage === null && episode.heroVisualState === "HELD";
          var image = heldHero ? null : admittedArchivePath(episode.heroImage, "image");
          var url = admittedArchivePath(episode.issueUrl, "issue");
          if ((!heldHero && !image) || !url) {
            throw new Error("archive path invalid");
          }
          if (
            Object.prototype.hasOwnProperty.call(admittedNumbers, episode.number) ||
            Object.prototype.hasOwnProperty.call(admittedIssueUrls, url)
          ) {
            throw new Error("archive collection is duplicate or ambiguous");
          }
          admittedNumbers[episode.number] = true;
          admittedIssueUrls[url] = true;
          return { episode: episode, number: number, heldHero: heldHero, image: image, url: url };
        }).sort(function (a, b) {
          return b.episode.number - a.episode.number;
        });

        archive.replaceChildren();
        admittedEpisodes.forEach(function (entry) {
          var episode = entry.episode;
          var article = document.createElement("article");
          article.className = "po-delivery";
          var imageLink = document.createElement("a");
          imageLink.href = entry.url;
          if (entry.heldHero) {
            imageLink.style.paddingBottom = "48px";
            var held = document.createElement("span");
            held.className = "po-delivery__hero-held";
            held.textContent = "Episode artwork held · reading edition available";
            imageLink.appendChild(held);
          } else {
            var img = document.createElement("img");
            img.src = entry.image;
            img.alt = "";
            img.loading = "lazy";
            imageLink.appendChild(img);
          }
          var stamp = document.createElement("span");
          stamp.className = "po-delivery__stamp";
          stamp.textContent = "Published · Episode " + entry.number;
          imageLink.appendChild(stamp);
          var heading = document.createElement("h3");
          var titleLink = document.createElement("a");
          titleLink.href = entry.url;
          titleLink.textContent = episode.title;
          heading.appendChild(titleLink);
          var description = document.createElement("p");
          description.textContent = episode.oneLineDescription;
          article.append(imageLink, heading, description);
          archive.appendChild(article);
        });
      })
      .catch(function () {
        archiveFailure(focusRecovery === true);
      });
  }
  if (archive) loadArchive(false);
})();
