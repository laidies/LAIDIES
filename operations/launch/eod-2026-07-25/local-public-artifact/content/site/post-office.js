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
  if (archive) {
    fetch("/content/episode-index.json")
      .then(function (response) {
        if (!response.ok) throw new Error("archive unavailable");
        return response.json();
      })
      .then(function (data) {
        var episodes = (data.episodes || []).filter(function (episode) {
          return episode.status === "published";
        }).sort(function (a, b) {
          return Number(b.number) - Number(a.number);
        });

        archive.innerHTML = episodes.map(function (episode) {
          var number = String(episode.number).padStart(2, "0");
          var image = episode.heroImage.charAt(0) === "/" ? episode.heroImage : "/" + episode.heroImage;
          var url = episode.issueUrl.charAt(0) === "/" ? episode.issueUrl : "/" + episode.issueUrl;
          return '<article class="po-delivery">' +
            '<a href="' + url + '">' +
              '<img src="' + image + '" alt="" loading="lazy">' +
              '<span class="po-delivery__stamp">Delivered · Episode ' + number + "</span>" +
            "</a>" +
            '<h3><a href="' + url + '">' + episode.title + "</a></h3>" +
            '<p>' + episode.oneLineDescription + "</p>" +
          "</article>";
        }).join("");
      })
      .catch(function () {
        archive.innerHTML = '<p class="po-archive-error">The archive drawer is temporarily stuck. Today’s episode is still waiting on the homepage.</p>';
      });
  }
})();
