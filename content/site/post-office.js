(function () {
  "use strict";

  var postcards = [
    { id: "welcome", label: "Welcome to SUNNYVAiLE", file: "pc-welcome.png" },
    { id: "youve-got-mail", label: "You've Got Mail", file: "pc-youve-got-mail.png" },
    { id: "dial-up", label: "Wish You Were Wired", file: "pc-dial-up.png" },
    { id: "main-street", label: "MAiN Street", file: "pc-main-street.png" },
    { id: "blend-snap", label: "The Blend & Snap", file: "pc-blend-and-snap.png" },
    { id: "mme-claio", label: "Mme CLAi-O", file: "pc-mme-claio.png" },
    { id: "bronze-aige", label: "Bronze AiGE", file: "pc-bronze-aige.png" },
    { id: "ksvl", label: "KSVL RAiDIO", file: "pc-ksvl.png" },
    { id: "library", label: "The LIBRAiRY", file: "pc-library.png" },
    { id: "park", label: "The Park", file: "pc-park.png" },
    { id: "sorority", label: "Delta LAi Nu", file: "pc-sorority-house.png" }
  ];

  var base = "/assets/postcards/from-sunnyvaile/";
  var rack = document.getElementById("poPostcardRack");
  var previewImage = document.getElementById("poPostcardPreview");
  var previewTitle = document.getElementById("poPostcardTitle");
  var writeLink = document.getElementById("poWriteLink");

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
    previewImage.src = base + card.file;
    previewImage.alt = card.label + " postcard";
    previewTitle.textContent = card.label;
    writeLink.href = "/postcard.html?pc=" + encodeURIComponent(card.id);
  }

  if (rack) {
    postcards.forEach(function (card, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "po-postcard";
      button.setAttribute("aria-label", "Choose " + card.label + " postcard");
      button.setAttribute("aria-pressed", "false");
      button.style.setProperty("--po-tilt", ((index % 5) - 2) * 1.1 + "deg");
      button.innerHTML = '<img src="' + base + card.file + '" alt="" loading="lazy"><span>' + card.label + "</span>";
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
  }

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
            typeof episode.heroImage !== "string" ||
            typeof episode.issueUrl !== "string"
          ) {
            throw new Error("archive entry invalid");
          }
          var number = String(episode.number).padStart(2, "0");
          var image = admittedArchivePath(episode.heroImage, "image");
          var url = admittedArchivePath(episode.issueUrl, "issue");
          if (!image || !url) {
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
          return { episode: episode, number: number, image: image, url: url };
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
          var img = document.createElement("img");
          img.src = entry.image;
          img.alt = "";
          img.loading = "lazy";
          var stamp = document.createElement("span");
          stamp.className = "po-delivery__stamp";
          stamp.textContent = "Published · Episode " + entry.number;
          imageLink.append(img, stamp);
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
