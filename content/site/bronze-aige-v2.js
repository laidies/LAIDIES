(function () {
  "use strict";

  var catalogueBoundary = document.getElementById("bronzeCatalogueBoundaryStatus");
  import("./bws-data.js")
    .then(function (module) {
  var catalogue = module && module.default;
  if (
    !catalogue ||
    !Object.isFrozen(catalogue) ||
    typeof catalogue.hasLane !== "function" ||
    typeof catalogue.getMenu !== "function" ||
    typeof catalogue.getFlaps !== "function" ||
    typeof catalogue.getItem !== "function" ||
    typeof catalogue.getMood !== "function"
  ) {
    throw new Error("private-catalogue-invalid");
  }
  if (catalogueBoundary) catalogueBoundary.hidden = true;
  var main = document.querySelector(".bronze-v2-page");
  var room = document.querySelector(".bronze-room");
  var stateLine = document.getElementById("bronzeRoomState");
  if (!main || !room || !stateLine) return;
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Explicit paths are both an admission boundary and build dependencies.
  // Add the next issue here only when its episode is actually published.
  var EPISODE_ISSUE_PATHS = {
    1: "/content/episodes/issue-01.json",
    2: "/content/episodes/issue-02.json",
    3: "/content/episodes/issue-03.json",
    4: "/content/episodes/issue-04.json"
  };

  function directRange(start, end) {
    var nodes = [];
    var node = start;
    while (node && node !== end) {
      var next = node.nextSibling;
      nodes.push(node);
      node = next;
    }
    return nodes;
  }

  function createPanel(id, className) {
    var panel = document.createElement("section");
    panel.id = id;
    panel.className = "bronze-panel " + className;
    panel.hidden = true;
    panel.setAttribute("tabindex", "-1");
    return panel;
  }

  function labelPanel(panel) {
    var heading = panel && panel.querySelector("h2");
    if (!heading) return;
    if (!heading.id) heading.id = panel.id + "-title";
    panel.setAttribute("aria-labelledby", heading.id);
  }

  var callHeading = document.getElementById("call");
  var playHeading = document.getElementById("play");
  var answersHeading = document.getElementById("answers");
  var stampHeading = document.getElementById("stamp");
  var stageHeading = document.getElementById("bzLiveH2");
  var whyHeading = Array.prototype.slice.call(main.children).find(function (node) {
    return node.tagName === "H2" && /why the bronze exists/i.test(node.textContent || "");
  });
  if (!callHeading || !playHeading || !answersHeading || !stampHeading || !stageHeading || !whyHeading) return;

  var inviteNodes = directRange(callHeading, playHeading);
  var answersNodes = directRange(answersHeading, stampHeading);
  var coasterNodes = directRange(stampHeading, stageHeading);
  var stageNodes = directRange(stageHeading, whyHeading);

  var panels = document.createElement("div");
  panels.className = "bronze-v2-panels";
  main.insertBefore(panels, whyHeading);

  var invitePanel = createPanel("bronze-invite", "bronze-panel--invite");
  inviteNodes.forEach(function (node) { invitePanel.appendChild(node); });
  invitePanel.querySelector("h2").textContent = "Call a happy hour.";
  labelPanel(invitePanel);
  panels.appendChild(invitePanel);

  var fortunePanel = createPanel("bronze-fortune", "bronze-panel--fortune");
  var playIntro = playHeading.nextElementSibling;
  fortunePanel.appendChild(playHeading);
  if (playIntro && playIntro.tagName === "P") fortunePanel.appendChild(playIntro);
  playHeading.textContent = "Let the bar pick.";

  var tableLink = main.querySelector('a[href="/games/businesswomens-special.html"]');
  var tableNote = tableLink ? tableLink.nextElementSibling : null;
  var housePour = Array.prototype.slice.call(main.querySelectorAll("aside")).find(function (node) {
    return /house cocktail/i.test(node.textContent || "");
  });

  var fortuneInterface = document.createElement("div");
  fortuneInterface.className = "bronze-fortune-interface";
  fortuneInterface.innerHTML =
    '<div class="bronze-fortune-interface__object">' +
      '<img id="bronzeFortuneFrame" src="/assets/bws-fortune-teller/frame-1-closed.webp" alt="A folded paper fortune teller on the BRONZE AiGE bar">' +
    "</div>" +
    '<div class="bronze-fortune-interface__controls">' +
      '<label for="bronzeFortuneLane">What is the table drinking?</label>' +
      '<select id="bronzeFortuneLane"><option value="cocktail">Cocktails</option><option value="spiritFree">Spirit-free</option></select>' +
      '<button type="button" class="bronze-fortune-interface__deal" id="bronzeFortuneDeal">Pinch it open</button>' +
      '<div class="bronze-fortune-result" id="bronzeFortuneResult" hidden aria-live="polite">' +
        '<p class="bronze-fortune-result__mood" id="bronzeFortuneMood"></p>' +
        '<h3 id="bronzeFortuneName"></h3>' +
        '<p id="bronzeFortuneVibe"></p>' +
        '<p><strong>Order:</strong> <span id="bronzeFortuneOrder"></span></p>' +
        '<p id="bronzeFortuneNote"></p>' +
      "</div>" +
    "</div>";
  fortunePanel.appendChild(fortuneInterface);
  var fortuneStatus = document.createElement("p");
  fortuneStatus.id = "bronzeFortuneStatus";
  fortuneStatus.className = "bronze-inline-status";
  fortuneStatus.setAttribute("role", "status");
  fortuneStatus.setAttribute("aria-live", "polite");
  fortuneStatus.setAttribute("aria-atomic", "true");
  fortuneInterface.appendChild(fortuneStatus);

  if (tableLink) {
    tableLink.removeAttribute("style");
    tableLink.removeAttribute("onmouseover");
    tableLink.removeAttribute("onmouseout");
    tableLink.className = "bronze-table-link";
    tableLink.textContent = "Play the full table version →";
    fortunePanel.appendChild(tableLink);
  }
  if (tableNote && tableNote.tagName === "P") fortunePanel.appendChild(tableNote);
  if (housePour) fortunePanel.appendChild(housePour);
  labelPanel(fortunePanel);
  panels.appendChild(fortunePanel);

  var menuPanel = createPanel("bronze-menu", "bronze-panel--menu");
  var menuHeading = document.createElement("h2");
  menuHeading.textContent = "Tonight's specials.";
  var menuLead = document.createElement("p");
  menuLead.textContent = "The conversation menu changes with the latest published episode. Order one for the table.";
  menuPanel.appendChild(menuHeading);
  menuPanel.appendChild(menuLead);
  var wedBody = document.getElementById("bzWedBody");
  var menuBoard = wedBody ? wedBody.closest("div") : null;
  if (menuBoard) {
    menuBoard.classList.add("bronze-menu-board");
    menuPanel.appendChild(menuBoard);
  }
  labelPanel(menuPanel);
  panels.appendChild(menuPanel);

  var answersPanel = createPanel("bronze-answers", "bronze-panel--answers");
  answersNodes.forEach(function (node) { answersPanel.appendChild(node); });
  answersPanel.querySelector("h2").textContent = "The framed answers.";
  var answerStack = Array.prototype.slice.call(answersPanel.children).find(function (node) {
    return node.tagName === "DIV" && node.querySelector && node.querySelector("#cocktail-ep04");
  });
  if (answerStack) {
    answerStack.classList.add("bronze-answer-stack");
    var answerFrames = Array.prototype.slice.call(answerStack.children);
    answerFrames.forEach(function (frame) { frame.classList.add("bronze-answer-frame"); });
    var answerTabs = document.createElement("div");
    answerTabs.className = "bronze-answer-tabs";
    answerTabs.setAttribute("role", "tablist");
    answerTabs.setAttribute("aria-label", "Framed answers by episode");
    answerFrames.slice().reverse().forEach(function (frame, index) {
      var sourceIndex = answerFrames.indexOf(frame);
      var button = document.createElement("button");
      var label = (frame.querySelector("p") || {}).textContent || "Episode";
      var match = label.match(/Episode\s+(\d+)/i);
      button.type = "button";
      button.textContent = match ? "EP " + match[1] : "Answer " + (index + 1);
      button.id = "bronze-answer-tab-" + sourceIndex;
      frame.id = frame.id || "bronze-answer-panel-" + sourceIndex;
      frame.setAttribute("role", "tabpanel");
      frame.setAttribute("aria-labelledby", button.id);
      button.setAttribute("aria-controls", frame.id);
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", index === 0 ? "true" : "false");
      button.setAttribute("tabindex", index === 0 ? "0" : "-1");
      button.addEventListener("click", function () {
        answerFrames.forEach(function (item, frameIndex) { item.hidden = frameIndex !== sourceIndex; });
        Array.prototype.forEach.call(answerTabs.children, function (tab) {
          tab.setAttribute("aria-selected", tab === button ? "true" : "false");
          tab.setAttribute("tabindex", tab === button ? "0" : "-1");
        });
      });
      answerTabs.appendChild(button);
    });
    answerTabs.addEventListener("keydown", function (event) {
      var tabs = Array.prototype.slice.call(answerTabs.querySelectorAll('[role="tab"]'));
      var current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      var next = current;
      if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
    answerFrames.forEach(function (frame, index) { frame.hidden = index !== answerFrames.length - 1; });
    answersPanel.insertBefore(answerTabs, answerStack);
  }
  labelPanel(answersPanel);
  panels.appendChild(answersPanel);

  var coasterPanel = createPanel("bronze-coaster", "bronze-panel--coaster");
  coasterNodes.forEach(function (node) { coasterPanel.appendChild(node); });
  coasterPanel.querySelector("h2").textContent = "Leave your mark.";
  labelPanel(coasterPanel);
  panels.appendChild(coasterPanel);

  var stagePanel = createPanel("bronze-stage", "bronze-panel--stage");
  stageNodes.forEach(function (node) { stagePanel.appendChild(node); });
  labelPanel(stagePanel);
  panels.appendChild(stagePanel);

  function exactKeys(value, allowed) {
    return (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).sort().join("|") === allowed.slice().sort().join("|")
    );
  }

  function canonicalPastIso(value, nowMs) {
    if (typeof value !== "string") return false;
    var stamp = Date.parse(value);
    return (
      Number.isFinite(stamp) &&
      new Date(stamp).toISOString() === value &&
      stamp <= nowMs
    );
  }

  function isoWeekIdFromStamp(stamp) {
    var source = new Date(stamp);
    var day = new Date(Date.UTC(
      source.getUTCFullYear(),
      source.getUTCMonth(),
      source.getUTCDate()
    ));
    var weekday = day.getUTCDay() || 7;
    day.setUTCDate(day.getUTCDate() + 4 - weekday);
    var yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
    var week = Math.ceil((((day - yearStart) / 86400000) + 1) / 7);
    return day.getUTCFullYear() + "-W" + String(week).padStart(2, "0");
  }

  function readDrink() {
    try {
      var drink = JSON.parse(localStorage.getItem("laidies_bws_drink") || "null");
      var nowMs = Date.now();
      if (
        !exactKeys(drink, ["version", "scope", "lane", "itemId", "moodId", "savedAt"]) ||
        drink.version !== 2 ||
        drink.scope !== "device-local" ||
        !catalogue ||
        !catalogue.hasLane(drink.lane) ||
        !catalogue.getItem(drink.lane, drink.itemId) ||
        !catalogue.getMood(drink.moodId) ||
        !canonicalPastIso(drink.savedAt, nowMs)
      ) {
        return null;
      }
      return {
        lane: drink.lane,
        item: catalogue.getItem(drink.lane, drink.itemId),
        mood: catalogue.getMood(drink.moodId),
        savedAt: drink.savedAt
      };
    } catch (_) {
      return null;
    }
  }

  function readCoasters() {
    try {
      var receipt = JSON.parse(
        localStorage.getItem("laidies_bronze_coasters") || "null"
      );
      if (
        !exactKeys(receipt, ["version", "scope", "items"]) ||
        receipt.version !== 2 ||
        receipt.scope !== "device-local" ||
        !Array.isArray(receipt.items) ||
        receipt.items.length > 104
      ) {
        return [];
      }
      var nowMs = Date.now();
      var currentWeek = isoWeekIdFromStamp(new Date(nowMs).toISOString());
      var seen = Object.create(null);
      var valid = receipt.items.every(function (item) {
        if (
          !exactKeys(item, ["week", "stampedAt"]) ||
          !/^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/.test(item.week) ||
          !canonicalPastIso(item.stampedAt, nowMs) ||
          isoWeekIdFromStamp(item.stampedAt) !== item.week ||
          item.week > currentWeek ||
          seen[item.week]
        ) return false;
        seen[item.week] = true;
        return true;
      });
      return valid ? receipt.items.slice() : [];
    } catch (_) {
      return [];
    }
  }

  function renderState() {
    var drink = readDrink();
    var coasters = readCoasters();
    var line = "Online room open. Choose one of six stations.";
    if (drink) {
      line +=
        " This device remembers a " +
        (drink.lane === "spiritFree" ? "spirit-free" : "cocktail") +
        " suggestion: " +
        drink.item.name +
        ".";
    }
    if (coasters.length) {
      line +=
        " This device has " +
        coasters.length +
        (coasters.length === 1
          ? " locally marked week."
          : " locally marked weeks.");
    }
    stateLine.textContent = line;
  }

  var frame = document.getElementById("bronzeFortuneFrame");
  var deal = document.getElementById("bronzeFortuneDeal");
  var lane = document.getElementById("bronzeFortuneLane");
  var result = document.getElementById("bronzeFortuneResult");
  var frameSequence = [
    "/assets/bws-fortune-teller/frame-1-closed.webp",
    "/assets/bws-fortune-teller/frame-2-open-vertical.webp",
    "/assets/bws-fortune-teller/frame-3-open-horizontal.webp",
    "/assets/bws-fortune-teller/frame-4-reveal.webp"
  ];

  function revealDrink() {
    if (!catalogue) {
      fortuneStatus.textContent =
        "The fortune menu could not load. Nothing was selected or saved.";
      return;
    }
    deal.disabled = true;
    result.hidden = true;
    fortuneStatus.textContent = "The paper fortune teller is choosing…";
    if (reduceMotion) {
      frame.src = frameSequence[frameSequence.length - 1];
    } else {
      frameSequence.forEach(function (src, index) {
        setTimeout(function () { frame.src = src; }, index * 170);
      });
    }
    setTimeout(function () {
      var selectedLane = lane.value;
      if (!["cocktail", "spiritFree"].includes(selectedLane)) {
        deal.disabled = false;
        fortuneStatus.textContent =
          "Choose cocktails or spirit-free before dealing.";
        return;
      }
      var flaps = catalogue.getFlaps();
      var flap = flaps[Math.floor(Math.random() * flaps.length)];
      var menu = catalogue.getMenu(selectedLane);
      var pool = flap.drinks[selectedLane] || flap.drinks.cocktail;
      var drink = menu[pool[Math.floor(Math.random() * pool.length)]];
      if (!drink || typeof drink.name !== "string") {
        deal.disabled = false;
        fortuneStatus.textContent =
          "The fortune could not be completed. Nothing was selected or saved.";
        return;
      }
      document.getElementById("bronzeFortuneMood").textContent = flap.label + " · " + flap.description;
      document.getElementById("bronzeFortuneName").textContent = drink.name;
      document.getElementById("bronzeFortuneVibe").textContent = drink.vibe;
      document.getElementById("bronzeFortuneOrder").textContent = drink.order;
      document.getElementById("bronzeFortuneNote").textContent = drink.note;
      result.hidden = false;
      result.setAttribute("tabindex", "-1");
      deal.textContent = "Deal another";
      deal.disabled = false;
      var saved = false;
      try {
        localStorage.setItem("laidies_bws_drink", JSON.stringify({
          version: 2,
          scope: "device-local",
          lane: selectedLane,
          itemId: drink.id,
          moodId: flap.id,
          savedAt: new Date().toISOString()
        }));
        saved = !!readDrink();
      } catch (_) {}
      fortuneStatus.textContent =
        (selectedLane === "spiritFree"
          ? "Spirit-free"
          : "Cocktail") +
        " suggestion dealt. " +
        (saved
          ? "It is remembered on this device only."
          : "This browser could not save it; the result remains on this page.");
      renderState();
      result.focus();
    }, reduceMotion ? 0 : frameSequence.length * 170 + 80);
  }

  deal.addEventListener("click", revealDrink);

  var controls = Array.prototype.slice.call(document.querySelectorAll("[data-bronze-panel]"));
  var panelById = {};
  var activeControl = null;
  Array.prototype.slice.call(panels.children).forEach(function (panel) { panelById[panel.id] = panel; });

  function closeAll(returnFocus) {
    controls.forEach(function (control) {
      control.classList.remove("is-open");
      control.setAttribute("aria-expanded", "false");
    });
    Object.keys(panelById).forEach(function (id) { panelById[id].hidden = true; });
    if (returnFocus && activeControl) activeControl.focus();
    activeControl = null;
  }

  function openPanel(id, shouldScroll) {
    var panel = panelById[id];
    var control = controls.find(function (item) { return item.getAttribute("data-bronze-panel") === id; });
    if (!panel || !control) return;
    closeAll();
    panel.hidden = false;
    control.classList.add("is-open");
    control.setAttribute("aria-expanded", "true");
    activeControl = control;
    if (shouldScroll) {
      panel.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      panel.focus({ preventScroll: true });
    }
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  }

  controls.forEach(function (control) {
    control.addEventListener("click", function () {
      var id = control.getAttribute("data-bronze-panel");
      if (control.classList.contains("is-open")) {
        closeAll(true);
        if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
      } else {
        openPanel(id, true);
      }
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !activeControl) return;
    event.preventDefault();
    closeAll(true);
    if (history.replaceState) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  });

  var hashMap = {
    "#call": "bronze-invite",
    "#play": "bronze-fortune",
    "#answers": "bronze-answers",
    "#stamp": "bronze-coaster",
    "#bronze-invite": "bronze-invite",
    "#bronze-fortune": "bronze-fortune",
    "#bronze-menu": "bronze-menu",
    "#bronze-answers": "bronze-answers",
    "#bronze-coaster": "bronze-coaster",
    "#bronze-stage": "bronze-stage"
  };
  if (hashMap[location.hash]) openPanel(hashMap[location.hash], false);

  var stampButton = document.getElementById("bzStampBtn");
  if (stampButton) stampButton.addEventListener("click", function () { setTimeout(renderState, 40); });

  function loadWednesdaySpecial() {
    var tag = document.getElementById("bzWedTag");
    var body = document.getElementById("bzWedBody");
    if (!tag || !body) return;
    var evergreen =
      "What is one AI idea you are still thinking about — and what would change your mind?";
    function fallback(reason) {
      tag.dataset.state = reason || "evergreen";
      tag.textContent = "· evergreen table prompt";
      body.textContent = evergreen;
    }
    fallback("loading");
    fetch("/content/episode-index.json", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("episode-index-" + response.status);
        }
        return response.json();
      })
      .then(function (index) {
        var published =
          index && Array.isArray(index.episodes)
            ? index.episodes.filter(function (episode) {
                return (
                  episode &&
                  episode.status === "published" &&
                  Number.isInteger(episode.number) &&
                  episode.number > 0 &&
                  typeof episode.title === "string" &&
                  episode.title.trim()
                );
              })
            : [];
        if (!published.length) throw new Error("no-published-episode");
        published.sort(function (a, b) {
          return a.number - b.number;
        });
        var latest = published[published.length - 1];
        var issuePath = EPISODE_ISSUE_PATHS[latest.number];
        if (!issuePath) throw new Error("episode-issue-not-admitted");
        return fetch(issuePath, {
          cache: "no-store"
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("episode-issue-" + response.status);
            }
            return response.json();
          })
          .then(function (issue) {
            if (
              !issue ||
              issue.status !== "published" ||
              issue.number !== latest.number ||
              typeof issue.communityPrompt !== "string" ||
              !issue.communityPrompt.trim()
            ) {
              throw new Error("episode-issue-shape");
            }
            var released = Date.parse(latest.releaseDate || issue.releaseDate || "");
            var fresh =
              Number.isFinite(released) &&
              released <= Date.now() + 86400000 &&
              Date.now() - released <= 14 * 86400000;
            tag.dataset.state = fresh ? "current" : "latest-published";
            tag.textContent =
              (fresh
                ? "· current published episode: “"
                : "· from the latest published episode: “") +
              latest.title +
              "”";
            body.textContent = issue.communityPrompt.trim();
          });
      })
      .catch(function () {
        fallback("evergreen");
      });
  }

  loadWednesdaySpecial();
  renderState();
  setInterval(renderState, 60000);
    })
    .catch(function () {
      if (catalogueBoundary) {
        catalogueBoundary.hidden = false;
        catalogueBoundary.textContent =
          "The private fortune menu could not be verified. Nothing was selected or saved.";
      }
    });
})();
