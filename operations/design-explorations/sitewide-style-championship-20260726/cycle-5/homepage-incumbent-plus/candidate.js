(function () {
  "use strict";

  function remove(selector) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.remove();
    });
  }

  /*
   * Consolidate repeated product jobs:
   * - the hero owns first-visit orientation;
   * - the method owns the teaching explanation;
   * - the weekly module owns the season route;
   * - the reference section owns lookup;
   * - the map owns town exploration;
   * - the Closet owns resident collection.
   */
  remove(".entry-visitor");
  remove(".intent");
  remove(".spotlights");
  remove(".district-cards");
  remove(".town-index");

  /* Replace Ali-rejected FAiRY Godmother scene with the approved house proof. */
  var fairyCard = document.querySelector("#help");
  if (fairyCard) {
    var fairyImage = fairyCard.querySelector("img");
    if (fairyImage) {
      fairyImage.src = "/assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/11-fairy-godmother-house-faceon-user-approved.png";
      fairyImage.alt = "The approved FAiRY Godmother house on Willow Lane at luminous dusk";
    }
  }

  /*
   * Dream Phone and NewsStand incumbent images are AUDIT / NOT APPROVED.
   * Keep their real product cards and deterministic live text, but remove the
   * unverified image bytes from this candidate.
   */
  document.querySelectorAll(".activity-grid article").forEach(function (card) {
    var heading = card.querySelector("h3");
    if (!heading) return;
    var title = heading.textContent.trim();
    if (title !== "Dream Phone" && title !== "The NewsStand") return;
    var image = card.querySelector("img");
    if (image) image.remove();
    card.classList.add("c5-object-only");
    var panel = document.createElement("div");
    panel.className = "c5-object-art";
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = title === "Dream Phone"
      ? "<span>PRIVATE LINE</span><strong>DREAM<br>PHONE</strong><i>☎</i>"
      : "<span>SOURCE DESK</span><strong>THE<br>NEWSSTAND</strong><i>→</i>";
    card.insertBefore(panel, card.firstChild);
  });

  /* Candidate-only successor of the locked canonical building name. */
  var visitorHotspot = document.querySelector(
    '.map-spot[data-href="/visitors-centre.html"]'
  );
  if (visitorHotspot) {
    visitorHotspot.dataset.name = "Visitor’s Centre";
    visitorHotspot.setAttribute("aria-label", "Visitor’s Centre");
  }

  document.documentElement.dataset.homepageCandidate = "cycle-5-incumbent-plus";
  document.documentElement.dataset.incumbentSha256 =
    "d09d2acb6f8bcb54873de5009b75fea3551c81124ff925e55a9c2eb68a671189";
})();
