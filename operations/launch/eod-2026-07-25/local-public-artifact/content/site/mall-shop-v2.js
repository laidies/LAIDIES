(function () {
  "use strict";

  var slug = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  var configs = {
    "as-seen-on-tv": {
      interior: "/assets/mall-interiors-comic/as-seen-on-tv-interior-candidate-v1.webp",
      roomTitle: "Surf the reference channels.",
      roomNote: "The room is the remote. Choose a wall, then tune the searchable signal below.",
      action: "Queue this reference",
      carryTitle: "Tonight's watchlist",
      carryEmpty: "Nothing queued yet. Tune a title, then put it on tonight's watchlist.",
      selectionKicker: "Now playing",
      selectionCopy: "Use the reference as a story shortcut: name the moment, identify the feeling, then make the AI connection.",
      zones: [
        { label: "Film wall", hint: "The big-screen canon", match: function (item) { return item.group === "Films"; } },
        { label: "TV wall", hint: "Series and episodes", match: function (item) { return item.group === "TV shows"; } },
        { label: "Remote desk", hint: "Every channel", all: true, match: function () { return true; } }
      ],
      utility: "Next channel",
      utilityMode: "next"
    },
    "books-and-records": {
      interior: "/assets/mall-interiors-comic/books-and-records-interior-candidate-v1.webp",
      roomTitle: "Flip until something catches.",
      roomNote: "Paperbacks on the left, singles in the middle, soundtracks at the listening post.",
      action: "Put it on the pile",
      carryTitle: "The counter pile",
      carryEmpty: "Your hands are still empty. Flip the bins and make a small stack.",
      selectionKicker: "Pulled from the bin",
      selectionCopy: "Save the reference you would actually reach for when an idea needs a voice, a mood or a soundtrack.",
      zones: [
        { label: "Paperback shelf", hint: "Books and dog-eared ideas", match: function (item) { return !/soundtrack/i.test(item.name) && /Diary|Beach|Coma|White Teeth|Devil Wears Prada|Rules/i.test(item.name); } },
        { label: "Singles bin", hint: "Songs worth replaying", match: match(/Miseducation|Symphony|Genie|Wannabe|Baby One More Time|Torn|Kiss Me/i) },
        { label: "Listening post", hint: "Film soundtracks", match: match(/soundtrack/i) }
      ]
    },
    "food-court": {
      interior: "/assets/mall-interiors-comic/food-court-interior-candidate-v1.webp",
      roomTitle: "Build the tray.",
      roomNote: "Start with a drink, add the sugar aisle, then decide what counts as dinner.",
      action: "Add it to the tray",
      carryTitle: "Your food-court tray",
      carryEmpty: "Empty tray. Pick one thing from each counter—or commit to seventeen kinds of sugar.",
      selectionKicker: "At the counter",
      selectionCopy: "A useful prompt can be built the same way: choose the base, add the texture, then specify the exact craving.",
      zones: [
        { label: "Drink station", hint: "Cold, bright and suspicious", match: match(/Pepsi|Capri|Sunny D|Squeezit|Kool-Aid|Julius/i) },
        { label: "Sugar counter", hint: "The pocket-money aisle", match: match(/Dunkaroos|Fruit|Gushers|Warheads|Nerds|Push Pop|Ring Pop/i) },
        { label: "Hot counter", hint: "The actual meal, technically", match: match(/Bagel|Lunchables|Pizza|Cinnabon|Auntie/i) }
      ]
    },
    "gizmos-and-gadgets": {
      interior: "/assets/mall-interiors-comic/gizmos-and-gadgets-interior-candidate-v1.webp",
      roomTitle: "Try it before you take it home.",
      roomNote: "Personal audio on the left, communication at the demo bench, play-tech to the right.",
      action: "Leave it on the demo bench",
      carryTitle: "Your demo bench",
      carryEmpty: "No gadgets humming yet. Pick one and see what kind of behaviour it suggests.",
      selectionKicker: "Demo unit",
      selectionCopy: "Tools are useful when you can name the behaviour they unlock. Choose the object, then notice the interaction behind it.",
      zones: [
        { label: "Personal audio", hint: "Press play and disappear", match: match(/Walkman|Discman/i) },
        { label: "Communication bench", hint: "Call, type, message", match: match(/Nokia|Motorola|Sidekick|iMac|Messenger|AOL/i) },
        { label: "Play-tech shelf", hint: "Keep your hands busy", match: match(/Tamagotchi|Furby|Trapper|Lisa Frank|watch|camera|Game Boy/i) }
      ]
    },
    "hanger-management": {
      interior: "/assets/mall-interiors-comic/hanger-management-interior-candidate-v1.webp",
      roomTitle: "Pull a look. Test the energy.",
      roomNote: "Tops and dresses, denim and shoes, then the finishing rail by the fitting rooms.",
      action: "Take it to the fitting room",
      carryTitle: "Inside the fitting room",
      carryEmpty: "The hook is empty. Pull a few pieces before deciding what the idea is wearing.",
      selectionKicker: "On the hanger",
      selectionCopy: "Style is a decision system. Save the pieces that say something specific before they ever become an outfit.",
      zones: [
        { label: "Tops + dresses", hint: "The first read", match: match(/tee|dress|top|tracksuit|overalls|vest|jacket/i) },
        { label: "Denim + shoes", hint: "The silhouette", match: match(/pants|jeans|sneakers|platforms|heels|denim/i) },
        { label: "Finishing rail", hint: "The opinion at the end", match: match(/belt|boa|Butterfly/i) }
      ]
    },
    "last-summer": {
      interior: "/assets/mall-interiors-comic/last-summer-interior-candidate-v1.webp",
      roomTitle: "Pin the memory before it changes.",
      roomNote: "School-day evidence on the left, excursions in the middle, sleepover archives on the right.",
      action: "Pin it to the scrapbook",
      carryTitle: "The open scrapbook",
      carryEmpty: "Blank page. Choose the memory you would use to explain the feeling.",
      selectionKicker: "Found in the photo envelope",
      selectionCopy: "Specific memories make better analogies than generic nostalgia. Pin the scene, not just the decade.",
      zones: [
        { label: "Hallway evidence", hint: "School-day history", match: match(/AIM|notes|class|Homecoming|Prom|Field day|yearbooks/i) },
        { label: "Out all day", hint: "Mall, beach and summer", match: match(/Mall|Blockbuster|Rollerblading|camp|Beach|Pool/i) },
        { label: "Sleepover archive", hint: "Made, traded and replayed", match: match(/Sleepover|Slap|Prank|mixtape|bracelet/i) }
      ]
    },
    "maiybe": {
      interior: "/assets/mall-interiors-comic/maiybe-interior-candidate-v2.webp",
      roomTitle: "Open the Caboodles.",
      roomNote: "Hair and skin on the left, colour at the tester island, scent and tools by the mirrors.",
      action: "Put it in the Caboodles",
      carryTitle: "Inside the Caboodles",
      carryEmpty: "Every tray is empty. Choose the first product in the routine.",
      selectionKicker: "At the tester",
      selectionCopy: "A routine is a sequence, not a pile. Save only what earns a place and let the order tell the story.",
      zones: [
        { label: "Hair + skin", hint: "Wash, fix, rescue", match: match(/Herbal|Sun-In|10-0-6|Clean|Aussie|Frizz/i) },
        { label: "Colour counter", hint: "Lips, face and glitter", match: match(/Lip|CoverGirl|Wet 'n Wild|glitter|Physicians/i) },
        { label: "Scent + tools", hint: "The last layer", match: match(/Bath|Nivea|Tinkerbell/i) }
      ]
    },
    "mall-kiosk": {
      interior: "/assets/mall-interiors-comic/mall-kiosk-interior-candidate-v1.webp",
      roomTitle: "Spin the rack.",
      roomNote: "The kiosk is the delightful wildcard: games, collectables and the odd thing by the till.",
      action: "Keep this odd little thing",
      carryTitle: "The kiosk bag",
      carryEmpty: "The tiny bag is empty. Spin the rack or choose the strangest thing yourself.",
      selectionKicker: "The spinner stopped on",
      selectionCopy: "Randomness works best inside a good boundary. Let the rack surprise you, then decide whether the result earns a place.",
      zones: [
        { label: "Toy spinner", hint: "Games with instructions", match: match(/Lite-Brite|Bop It|Simon|Slinky|Yo-yo|Skip-It|Silly Putty|Koosh|Stretch/i) },
        { label: "Collectable wall", hint: "Trade, display, obsess", match: match(/Beanie|Pogs|Troll|Pokémon|Sea-Monkeys/i) },
        { label: "Till oddities", hint: "One last impulse", match: match(/Magic 8|Mood ring|Pop-A-Point/i) }
      ],
      utility: "Spin the rack",
      utilityMode: "random"
    },
    "rollin-with-my-homies": {
      interior: "/assets/mall-interiors-comic/rollin-with-my-homies-interior-candidate-v1.webp",
      roomTitle: "Call the energy, not the costume.",
      roomNote: "Scripted references, real-world references and ensemble chemistry share one casting room.",
      action: "Put this energy on the call sheet",
      carryTitle: "The call sheet",
      carryEmpty: "No one has been called. Choose the energy the idea needs, not a likeness to copy.",
      selectionKicker: "Reference energy",
      selectionCopy: "Borrow the quality, not the identity: precision, nerve, warmth, timing, authority or glorious chaos.",
      zones: [
        { label: "Scripted references", hint: "Character energy", match: match(/Cher|Elle Woods|Buffy|Regina|Bridget|Carrie|Rachel|Priestly|Miranda from|Elle from/i) },
        { label: "Real references", hint: "Public-persona energy", match: function (item) { return !/Supermodels/i.test(item.name) && /Britney|Christina|Cindy|Missy|Sarah Jessica|Reese|Alicia/i.test(item.name); } },
        { label: "Ensembles", hint: "Chemistry and contrast", match: match(/Supermodels|Destiny/i) }
      ]
    }
  };

  function match(expression) {
    return function (item) {
      return expression.test(item.name);
    };
  }

  var config = configs[slug];
  var main = document.querySelector("main");
  if (!config || !main) return;

  var hero = main.querySelector(".shop-hero");
  var titleNode = hero && hero.querySelector("h1");
  var tagNode = hero && hero.querySelector(".shop-hero-tag");
  var eyebrowNode = hero && hero.querySelector(".shop-hero-eyebrow");
  var storefrontImage = main.querySelector(".shop-storefront img");
  var titleHTML = titleNode ? titleNode.innerHTML : document.title.split("·")[0].trim();
  var titleText = titleNode ? titleNode.textContent.trim() : document.title.split("·")[0].trim();
  var tagHTML = tagNode ? tagNode.innerHTML : "";
  var eyebrowHTML = eyebrowNode ? eyebrowNode.innerHTML : "The Mall";
  var storefrontSrc = storefrontImage ? storefrontImage.getAttribute("src") : "";
  var storefrontAlt = storefrontImage ? storefrontImage.getAttribute("alt") : titleText + " storefront";
  var items = [];

  main.querySelectorAll(".item-list").forEach(function (list) {
    var previous = list.previousElementSibling;
    var group = "On the shelves";
    while (previous) {
      if (/^H[1-6]$/.test(previous.tagName)) {
        group = previous.textContent.replace(/^★\s*/, "").trim();
        break;
      }
      previous = previous.previousElementSibling;
    }
    list.querySelectorAll("li").forEach(function (li) {
      items.push({ name: li.textContent.trim(), group: group });
    });
  });

  if (!items.length) return;

  var storageKey = "laidies_mall_shop_" + slug;
  var state = {
    activeZone: 0,
    selectedIndex: 0,
    query: "",
    saved: readSaved()
  };

  document.body.classList.add("mall-shop-v2-page", "mall-shop-v2-page--" + slug);
  main.className = "mall-shop-v2 mall-shop-v2--" + slug;
  main.innerHTML = buildShell();

  var room = main.querySelector("#mallShopRoom");
  var zoneButtons = Array.prototype.slice.call(main.querySelectorAll("[data-zone]"));
  var selectionName = main.querySelector("#mallShopSelectionName");
  var actionButton = main.querySelector("#mallShopAction");
  var utilityButton = main.querySelector("#mallShopUtility");
  var carryList = main.querySelector("#mallShopCarryList");
  var carryEmpty = main.querySelector("#mallShopCarryEmpty");
  var stock = main.querySelector("#mallShopStock");
  var search = main.querySelector("#mallShopSearch");
  var count = main.querySelector("#mallShopCount");

  assignZones();
  var firstVisibleItem = visibleItems()[0];
  if (firstVisibleItem) state.selectedIndex = items.indexOf(firstVisibleItem);
  render();

  main.querySelector("#mallShopEnter").addEventListener("click", function () {
    room.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  });

  zoneButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      state.activeZone = Number(button.getAttribute("data-zone"));
      state.query = "";
      search.value = "";
      var first = visibleItems()[0];
      if (first) state.selectedIndex = items.indexOf(first);
      render();
      main.querySelector("#mallShopSelection").scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center"
      });
    });
  });

  search.addEventListener("input", function () {
    state.query = search.value.trim().toLowerCase();
    renderStock();
  });

  actionButton.addEventListener("click", function () {
    var name = items[state.selectedIndex].name;
    var existing = state.saved.indexOf(name);
    if (existing >= 0) state.saved.splice(existing, 1);
    else state.saved.push(name);
    writeSaved();
    renderAction();
    renderCarry();
  });

  if (utilityButton) {
    utilityButton.addEventListener("click", function () {
      var candidates = visibleItems();
      if (!candidates.length) return;
      if (config.utilityMode === "random") {
        state.selectedIndex = items.indexOf(candidates[Math.floor(Math.random() * candidates.length)]);
      } else {
        var current = candidates.indexOf(items[state.selectedIndex]);
        state.selectedIndex = items.indexOf(candidates[(current + 1 + candidates.length) % candidates.length]);
      }
      renderSelection();
      renderStock();
    });
  }

  stock.addEventListener("click", function (event) {
    var button = event.target.closest("[data-item-index]");
    if (!button) return;
    state.selectedIndex = Number(button.getAttribute("data-item-index"));
    renderSelection();
    renderStock();
    main.querySelector("#mallShopSelection").scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center"
    });
  });

  carryList.addEventListener("click", function (event) {
    var button = event.target.closest("[data-remove]");
    if (!button) return;
    var name = button.getAttribute("data-remove");
    state.saved = state.saved.filter(function (savedName) { return savedName !== name; });
    writeSaved();
    renderAction();
    renderCarry();
  });

  function assignZones() {
    items.forEach(function (item) {
      item.zone = config.zones.findIndex(function (zone) { return zone.match(item); });
      if (item.zone < 0) item.zone = config.zones.length - 1;
    });
  }

  function buildShell() {
    var utility = config.utility
      ? '<button class="mall-shop-v2__utility" id="mallShopUtility" type="button">' + escapeHTML(config.utility) + "</button>"
      : "";
    return '' +
      '<section class="mall-shop-v2__arrival">' +
        '<div class="mall-shop-v2__arrival-copy">' +
          '<p class="mall-shop-v2__shop-number">' + eyebrowHTML + "</p>" +
          "<h1>" + titleHTML + "</h1>" +
          '<p class="mall-shop-v2__tag">' + tagHTML + "</p>" +
          '<button class="mall-shop-v2__enter" id="mallShopEnter" type="button">Step through the doors ↓</button>' +
        "</div>" +
        '<figure class="mall-shop-v2__storefront">' +
          '<img src="' + escapeAttribute(storefrontSrc) + '" alt="' + escapeAttribute(storefrontAlt) + '">' +
          '<figcaption>Storefront · SUNNYVAiLE Mall</figcaption>' +
        "</figure>" +
      "</section>" +
      '<section class="mall-shop-v2__doorway" aria-labelledby="mallShopRoomTitle">' +
        '<div class="mall-shop-v2__doorway-heading">' +
          "<div>" +
            '<p class="mall-shop-v2__door-label">Inside the shop</p>' +
            '<h2 id="mallShopRoomTitle">' + escapeHTML(config.roomTitle) + "</h2>" +
          "</div>" +
          '<p class="mall-shop-v2__doorway-note">' + escapeHTML(config.roomNote) + "</p>" +
        "</div>" +
        '<div class="mall-shop-v2__floor-scroller">' +
          '<figure class="mall-shop-v2__floor" id="mallShopRoom">' +
            '<img src="' + config.interior + '" alt="Candidate graphic-novel interior of ' + escapeAttribute(titleText) + '">' +
            config.zones.map(function (zone, index) {
              return '<button class="mall-shop-v2__hotspot mall-shop-v2__hotspot--' + index + '" type="button" data-zone="' + index + '" aria-pressed="false">' +
                escapeHTML(zone.label) + "</button>";
            }).join("") +
          "</figure>" +
        "</div>" +
        '<p class="mall-shop-v2__slide-note">Slide the room sideways to visit every department →</p>' +
        '<div class="mall-shop-v2__counter">' +
          '<div class="mall-shop-v2__selection" id="mallShopSelection" aria-live="polite">' +
            '<p class="mall-shop-v2__selection-kicker">' + escapeHTML(config.selectionKicker) + "</p>" +
            '<h3 class="mall-shop-v2__selection-name" id="mallShopSelectionName"></h3>' +
            '<p class="mall-shop-v2__selection-copy">' + escapeHTML(config.selectionCopy) + "</p>" +
            '<div class="mall-shop-v2__action-row">' +
              '<button class="mall-shop-v2__action" id="mallShopAction" type="button"></button>' +
              utility +
            "</div>" +
          "</div>" +
          '<aside class="mall-shop-v2__carry" aria-live="polite">' +
            "<h3>" + escapeHTML(config.carryTitle) + "</h3>" +
            '<p class="mall-shop-v2__carry-empty" id="mallShopCarryEmpty">' + escapeHTML(config.carryEmpty) + "</p>" +
            '<ul class="mall-shop-v2__carry-list" id="mallShopCarryList"></ul>' +
          "</aside>" +
        "</div>" +
      "</section>" +
      '<section class="mall-shop-v2__ledger">' +
        '<div class="mall-shop-v2__ledger-wrap">' +
          '<div class="mall-shop-v2__ledger-head">' +
            '<p class="mall-shop-v2__ledger-kicker">The complete shop register</p>' +
            "<h2>Search every shelf.</h2>" +
            '<div class="mall-shop-v2__ledger-tools">' +
              '<label><span class="visually-hidden">Search this shop</span><input class="mall-shop-v2__search" id="mallShopSearch" type="search" placeholder="Type a title, product, person or memory…" autocomplete="off"></label>' +
              '<span class="mall-shop-v2__count" id="mallShopCount"></span>' +
            "</div>" +
          "</div>" +
          '<ul class="mall-shop-v2__stock" id="mallShopStock"></ul>' +
        "</div>" +
      "</section>" +
      '<section class="mall-shop-v2__exit">' +
        '<p class="mall-shop-v2__exit-copy">This shop keeps its whole source list, but the room now gives that list a job. Nothing here is pretending to be for sale.</p>' +
        '<a href="/mall.html">Back through the Mall atrium →</a>' +
      "</section>";
  }

  function render() {
    zoneButtons.forEach(function (button, index) {
      button.setAttribute("aria-pressed", String(index === state.activeZone));
      button.setAttribute("aria-label", config.zones[index].label + ": " + config.zones[index].hint);
    });
    renderSelection();
    renderAction();
    renderCarry();
    renderStock();
  }

  function renderSelection() {
    selectionName.textContent = items[state.selectedIndex].name;
  }

  function renderAction() {
    var saved = state.saved.indexOf(items[state.selectedIndex].name) >= 0;
    actionButton.textContent = saved ? "Remove from " + config.carryTitle.toLowerCase() : config.action;
    actionButton.setAttribute("aria-pressed", String(saved));
  }

  function renderCarry() {
    carryList.innerHTML = "";
    carryEmpty.hidden = state.saved.length > 0;
    state.saved.forEach(function (name) {
      var li = document.createElement("li");
      var label = document.createElement("span");
      label.textContent = name;
      var remove = document.createElement("button");
      remove.className = "mall-shop-v2__carry-remove";
      remove.type = "button";
      remove.textContent = "Remove";
      remove.setAttribute("data-remove", name);
      remove.setAttribute("aria-label", "Remove " + name);
      li.appendChild(label);
      li.appendChild(remove);
      carryList.appendChild(li);
    });
  }

  function renderStock() {
    var visible = visibleItems();
    stock.innerHTML = "";
    count.textContent = visible.length + " of " + items.length + " in view";
    if (!visible.length) {
      var empty = document.createElement("li");
      empty.className = "mall-shop-v2__stock-empty";
      empty.textContent = "Nothing on this shelf matches that search.";
      stock.appendChild(empty);
      return;
    }
    visible.forEach(function (item) {
      var itemIndex = items.indexOf(item);
      var li = document.createElement("li");
      li.className = "mall-shop-v2__stock-item";
      var button = document.createElement("button");
      button.className = "mall-shop-v2__stock-button";
      button.type = "button";
      button.setAttribute("data-item-index", itemIndex);
      button.setAttribute("aria-current", String(itemIndex === state.selectedIndex));
      button.innerHTML =
        '<span class="mall-shop-v2__stock-index">' + String(itemIndex + 1).padStart(2, "0") + "</span>" +
        '<span class="mall-shop-v2__stock-name">' + escapeHTML(item.name) + "</span>" +
        '<span class="mall-shop-v2__stock-zone">' + escapeHTML(config.zones[item.zone].label) + "</span>";
      li.appendChild(button);
      stock.appendChild(li);
    });
  }

  function visibleItems() {
    return items.filter(function (item) {
      var active = config.zones[state.activeZone];
      var zoneMatch = active.all || item.zone === state.activeZone;
      var queryMatch = !state.query || item.name.toLowerCase().indexOf(state.query) >= 0 ||
        item.group.toLowerCase().indexOf(state.query) >= 0;
      return zoneMatch && queryMatch;
    });
  }

  function readSaved() {
    try {
      var value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(value) ? value.filter(function (name) {
        return items.some(function (item) { return item.name === name; });
      }) : [];
    } catch (error) {
      return [];
    }
  }

  function writeSaved() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state.saved));
    } catch (error) {
      // The interaction remains usable for this visit if storage is unavailable.
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character];
    });
  }

  function escapeAttribute(value) {
    return escapeHTML(value);
  }
})();
