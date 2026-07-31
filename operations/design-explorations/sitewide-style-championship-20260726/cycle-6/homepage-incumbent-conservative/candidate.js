(function () {
  "use strict";

  function removeImage(node, className) {
    if (!node) return;
    var image = node.querySelector("img");
    if (image) image.remove();
    node.classList.add(className);
  }

  /*
   * Cycle 6 starts from the restored clean incumbent and changes no public
   * copy, information architecture, status/runtime logic or destinations.
   * Duplicate image uses become colour-bearing text objects while their exact
   * incumbent labels and links remain.
   */
  var intentCards = document.querySelectorAll(".intent-grid a");
  removeImage(intentCards[0], "c6-text-object");
  removeImage(intentCards[1], "c6-text-object");
  removeImage(intentCards[2], "c6-text-object");
  removeImage(intentCards[3], "c6-text-object");

  document.querySelectorAll(".district-cards .district").forEach(function (card) {
    var heading = card.querySelector("h3");
    if (!heading) return;
    var title = heading.textContent.trim();
    if (title === "MAiN Street" || title === "Willow Lane" || title === "Lantern Hill") {
      removeImage(card, "c6-text-object");
    }
  });

  /*
   * Use the authoritative, user-approved FAiRY house once. Remove unaudited
   * Dream Phone and NewsStand raster art without inventing replacement copy.
   */
  var fairyCard = document.querySelector("#help");
  if (fairyCard) {
    var fairyImage = fairyCard.querySelector("img");
    if (fairyImage) {
      fairyImage.src =
        "/assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/11-fairy-godmother-house-faceon-user-approved.png";
      fairyImage.alt =
        "The approved FAiRY Godmother house on Willow Lane at luminous dusk";
    }
  }

  document.querySelectorAll(".activity-grid article").forEach(function (card) {
    var heading = card.querySelector("h3");
    if (!heading) return;
    var title = heading.textContent.trim();
    if (title !== "Dream Phone" && title !== "The NewsStand") return;
    var image = card.querySelector("img");
    if (image) image.remove();
    card.classList.add("c6-no-authoritative-art");
  });

  /*
   * Explicit locked-canon exception to copy parity: correct the active public,
   * accessible and popup-producing Visitor’s Centre name without changing its
   * destination, description, structure or behavior.
   */
  var visitorHotspot = document.querySelector(
    '.map-spot[data-href="/visitors-centre.html"]'
  );
  if (visitorHotspot) {
    visitorHotspot.dataset.name = "Visitor’s Centre";
    visitorHotspot.setAttribute("aria-label", "Visitor’s Centre");
  }

  var civicSquareCopy = document.querySelector(
    '.district-cards a[href="/town-hall.html"] p'
  );
  if (civicSquareCopy) {
    civicSquareCopy.textContent = civicSquareCopy.textContent.replace(
      "Visitor Centre",
      "Visitor’s Centre"
    );
  }

  var directoryVisitor = document.querySelector(
    '.town-index a[href="/visitors-centre.html"]'
  );
  if (directoryVisitor) {
    directoryVisitor.textContent = "Visitor’s Centre";
  }

  document.documentElement.dataset.homepageCandidate =
    "cycle-6-incumbent-conservative";
  document.documentElement.dataset.incumbentSha256 =
    "8231d1290b15a0a867ee063e947f39b3cc22a8c54a4efa741eff60e0c75a1eb3";
})();
