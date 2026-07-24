(function () {
  "use strict";

  function directChildren(main) {
    return Array.prototype.slice.call(main.children);
  }

  function buildHomeroom(main) {
    var children = directChildren(main);
    var hubs = document.getElementById("sh-hubs");
    if (!hubs || main.querySelector(".sh-v2-homeroom")) return;

    var beforeHubs = children.slice(0, children.indexOf(hubs));
    var content = beforeHubs.filter(function (node) {
      return node.tagName !== "STYLE" && node.tagName !== "SCRIPT";
    });
    if (content.length < 9) return;

    var stage = document.createElement("section");
    stage.className = "sh-v2-homeroom";

    var title = document.createElement("div");
    title.className = "sh-v2-title";
    content.slice(0, 4).forEach(function (node) { title.appendChild(node); });

    var quiz = document.createElement("div");
    quiz.className = "sh-v2-quiz";
    content.slice(4, 9).forEach(function (node) { quiz.appendChild(node); });

    stage.appendChild(title);
    stage.appendChild(quiz);
    main.insertBefore(stage, hubs);
  }

  function buildCampusBand() {
    var hubs = document.getElementById("sh-hubs");
    if (!hubs || document.querySelector(".sh-v2-campus-band")) return;

    var band = document.createElement("section");
    band.className = "sh-v2-campus-band";
    band.innerHTML =
      "<span>Six places · one school day</span>" +
      "<h2>The corridors</h2>" +
      "<p>Choose the room you actually need. The AV cart shows the tools in motion; the Registrar keeps your quiz record; the Yearbook turns it into a superlative; the 101 shelf holds the reading; and the gym changes when the Book Fair rolls in.</p>";
    hubs.parentNode.insertBefore(band, hubs);
  }

  function numberRooms() {
    var rooms = ["01", "02", "03", "04", "05", "06"];
    Array.prototype.forEach.call(document.querySelectorAll(".sh-hub"), function (hub, index) {
      hub.setAttribute("data-room", rooms[index] || String(index + 1));
    });
  }

  function openDefaultRoom() {
    if (window.location.hash) return;
    var hub = document.querySelector('.sh-hub[data-panel="hub-av"]');
    var panel = document.getElementById("hub-av");
    if (!hub || !panel || hub.classList.contains("is-open")) return;
    Array.prototype.forEach.call(document.querySelectorAll(".sh-hub"), function (other) {
      other.classList.remove("is-open");
      other.setAttribute("aria-expanded", "false");
    });
    Array.prototype.forEach.call(document.querySelectorAll(".sh-hub-panel"), function (other) {
      other.hidden = true;
    });
    hub.classList.add("is-open");
    hub.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  }

  function boot() {
    var main = document.querySelector("main");
    if (!main) return;
    buildHomeroom(main);
    buildCampusBand();
    numberRooms();
    openDefaultRoom();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
