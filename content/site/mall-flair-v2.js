(function () {
  "use strict";

  if (!/\/mall\/pieces-of-flair\.html$/.test(location.pathname)) return;

  var main = document.querySelector("main");
  var hero = main && main.querySelector(".claires-hero");
  if (!main || !hero) return;

  var AVATARS = [
    { slug: "butterfly-clip", name: "Butterfly clip", zone: 0 },
    { slug: "butterfly-stretch-ring", name: "Butterfly stretch ring", zone: 1 },
    { slug: "mood-ring", name: "Mood ring", zone: 1 },
    { slug: "charm-bracelet", name: "Charm bracelet", zone: 1 },
    { slug: "friendship-bracelet", name: "Friendship bracelet", zone: 1 },
    { slug: "class-ring", name: "Class ring", zone: 1 },
    { slug: "choker-necklace", name: "Choker", zone: 1 },
    { slug: "friendship-necklace", name: "BEST FRIENDS necklace", zone: 1 },
    { slug: "velvet-scrunchie", name: "Velvet scrunchie", zone: 0 },
    { slug: "claw-clip", name: "Claw clip", zone: 0 },
    { slug: "snap-barrette", name: "Snap barrettes", zone: 0 },
    { slug: "slap-bracelet", name: "Slap bracelet", zone: 1 },
    { slug: "temporary-tattoo", name: "Temp tattoo", zone: 2 },
    { slug: "butterfly-hair-tinsel", name: "Butterfly hair tinsel", zone: 0 },
    { slug: "fuzzy-pen-topper", name: "Fuzzy pen topper", zone: 2 },
    { slug: "milky-pen", name: "Milky pen", zone: 2 },
    { slug: "glitter-gel-pen", name: "Glitter gel pen", zone: 2 },
    { slug: "caboodles-case", name: "Caboodles case", zone: 2 },
    { slug: "butterfly-stamp", name: "Butterfly stamp", zone: 2 },
    { slug: "claires-receipt", name: "Mall receipt", zone: 2 }
  ];
  var ZONES = [
    { label: "Hair wall", hint: "Clips, scrunchies and tinsel" },
    { label: "Jewelry counter", hint: "Rings, bracelets and necklaces" },
    { label: "Pens + oddities", hint: "The delightful miscellaneous tray" }
  ];
  var STORAGE_KEY = "laidies_carry";
  var selected = 0;
  var activeZone = 0;
  var worn = readWorn();
  var titleHTML = hero.querySelector("h1").innerHTML;
  var tagHTML = hero.querySelector(".claires-hero-tag").innerHTML;
  var eyebrowHTML = hero.querySelector(".claires-hero-eyebrow").innerHTML;

  document.body.classList.add("mall-shop-v2-page", "mall-shop-v2-page--pieces-of-flair");
  main.className = "mall-shop-v2 mall-shop-v2--pieces-of-flair";
  main.innerHTML = buildShell();

  var selectedObject = main.querySelector("#flairSelectedObject");
  var selectedName = main.querySelector("#flairSelectedName");
  var carryButton = main.querySelector("#flairCarry");
  var carryStatus = main.querySelector("#flairCarryStatus");
  var reel = main.querySelector("#flairReel");
  var hotspotButtons = Array.prototype.slice.call(main.querySelectorAll("[data-flair-zone]"));

  render();

  main.querySelector("#flairEnter").addEventListener("click", function () {
    main.querySelector("#flairRoom").scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
  });

  hotspotButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeZone = Number(button.getAttribute("data-flair-zone"));
      selected = AVATARS.findIndex(function (avatar) { return avatar.zone === activeZone; });
      render();
      main.querySelector("#flairBench").scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
    });
  });

  main.querySelector("#flairPrevious").addEventListener("click", function () {
    move(-1);
  });
  main.querySelector("#flairNext").addEventListener("click", function () {
    move(1);
  });
  carryButton.addEventListener("click", function () {
    if (worn === AVATARS[selected].name) {
      worn = null;
      try { localStorage.removeItem(STORAGE_KEY); } catch (error) {}
    } else {
      worn = AVATARS[selected].name;
      try { localStorage.setItem(STORAGE_KEY, worn); } catch (error) {}
    }
    render();
  });
  reel.addEventListener("click", function (event) {
    var button = event.target.closest("[data-avatar-index]");
    if (!button) return;
    selected = Number(button.getAttribute("data-avatar-index"));
    activeZone = AVATARS[selected].zone;
    render();
    main.querySelector("#flairBench").scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
  });

  function buildShell() {
    return '' +
      '<section class="mall-shop-v2__arrival">' +
        '<div class="mall-shop-v2__arrival-copy">' +
          '<p class="mall-shop-v2__shop-number">' + eyebrowHTML + "</p>" +
          "<h1>" + titleHTML + "</h1>" +
          '<p class="mall-shop-v2__tag">' + tagHTML + "</p>" +
          '<button class="mall-shop-v2__enter" id="flairEnter" type="button">Step through the doors ↓</button>' +
        "</div>" +
        '<figure class="mall-shop-v2__storefront">' +
          '<div class="mall-storefront-held" data-asset-status="held" role="img" aria-label="Pieces of Flair storefront artwork is being prepared">Visual held</div>' +
          '<figcaption>Storefront · SUNNYVAiLE Mall</figcaption>' +
        "</figure>" +
      "</section>" +
      '<section class="mall-shop-v2__doorway">' +
        '<div class="mall-shop-v2__doorway-heading">' +
          "<div>" +
            '<p class="mall-shop-v2__door-label">Inside the shop</p>' +
            "<h2>Find the thing that feels like you.</h2>" +
          "</div>" +
          '<p class="mall-shop-v2__doorway-note">The avatar picker now lives in the store: browse a fixture, place one real object on the glass counter, then carry it onto your Resident Card.</p>' +
        "</div>" +
        '<div class="mall-shop-v2__floor-scroller">' +
          '<figure class="mall-shop-v2__floor" id="flairRoom">' +
            '<div class="mall-shop-v2__room-held" role="img" aria-label="Pieces of FLAiR room visual held">Pieces of FLAiR room visual held</div>' +
            ZONES.map(function (zone, index) {
              return '<button class="mall-shop-v2__hotspot mall-shop-v2__hotspot--' + index + '" type="button" data-flair-zone="' + index + '">' + zone.label + "</button>";
            }).join("") +
          "</figure>" +
        "</div>" +
        '<p class="mall-shop-v2__slide-note">Slide the room sideways to visit every department →</p>' +
        '<div class="mall-flair-v2__bench" id="flairBench">' +
          '<figure class="mall-flair-v2__object"><div id="flairSelectedObject" class="mall-flair-v2__object-held" data-asset-status="held" role="img"></div></figure>' +
          '<div class="mall-flair-v2__selection" aria-live="polite">' +
            '<p class="mall-shop-v2__selection-kicker">On the styling counter</p>' +
            '<h3 id="flairSelectedName"></h3>' +
            "<p>One object becomes the thing your Resident Card says you are carrying this week. The choice is saved to the same Resident Card state the original shelf used.</p>" +
            '<div class="mall-flair-v2__controls">' +
              '<button class="mall-shop-v2__utility" id="flairPrevious" type="button">← Previous</button>' +
              '<button class="mall-shop-v2__action" id="flairCarry" type="button"></button>' +
              '<button class="mall-shop-v2__utility" id="flairNext" type="button">Next →</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="mall-flair-v2__reel">' +
          '<div class="mall-flair-v2__reel-head">' +
            "<div><p class=\"mall-shop-v2__ledger-kicker\">The rotating fixture</p><h2>Slide through the real pieces.</h2></div>" +
            '<span class="mall-shop-v2__count" id="flairCount"></span>' +
          "</div>" +
          '<ul class="mall-flair-v2__reel-list" id="flairReel"></ul>' +
        "</div>" +
        '<div class="mall-flair-v2__carry-status">' +
          '<p id="flairCarryStatus"></p>' +
          '<a href="/laidies-card.html">See it on your Resident Card →</a>' +
        "</div>" +
      "</section>" +
      '<section class="mall-shop-v2__exit">' +
        '<p class="mall-shop-v2__exit-copy">All twenty original avatar objects are still here. The change is the experience: one room, one counter and one deliberate choice.</p>' +
        '<a href="/mall.html">Back through the Mall atrium →</a>' +
      "</section>";
  }

  function move(direction) {
    var zoneIndexes = AVATARS.map(function (avatar, index) { return avatar.zone === activeZone ? index : -1; }).filter(function (index) { return index >= 0; });
    var current = zoneIndexes.indexOf(selected);
    selected = zoneIndexes[(current + direction + zoneIndexes.length) % zoneIndexes.length];
    render();
  }

  function render() {
    var avatar = AVATARS[selected];
    selectedObject.textContent = avatar.name;
    selectedObject.setAttribute("aria-label", avatar.name + " visual held");
    selectedName.textContent = avatar.name;
    carryButton.textContent = worn === avatar.name ? "Remove from my card" : "Carry this on my card";
    carryButton.setAttribute("aria-pressed", String(worn === avatar.name));
    carryStatus.textContent = worn ? "★ Your Resident Card is carrying " + worn + "." : "Nothing is on your Resident Card yet.";
    hotspotButtons.forEach(function (button, index) {
      button.setAttribute("aria-pressed", String(index === activeZone));
      button.setAttribute("aria-label", ZONES[index].label + ": " + ZONES[index].hint);
    });
    renderReel();
  }

  function renderReel() {
    var visible = AVATARS.map(function (avatar, index) { return { avatar: avatar, index: index }; })
      .filter(function (entry) { return entry.avatar.zone === activeZone; });
    reel.innerHTML = "";
    visible.forEach(function (entry) {
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.className = "mall-flair-v2__reel-button";
      button.type = "button";
      button.setAttribute("data-avatar-index", entry.index);
      button.setAttribute("aria-current", String(entry.index === selected));
      button.innerHTML = '<span class="mall-flair-v2__reel-art-held" aria-hidden="true">Visual held</span><span>' + entry.avatar.name + "</span>";
      li.appendChild(button);
      reel.appendChild(li);
    });
    main.querySelector("#flairCount").textContent = visible.length + " pieces on this fixture";
  }

  function readWorn() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (error) { return null; }
  }

  function reduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
})();
