(function () {
  "use strict";

  var main = document.querySelector(".bronze-v2-page");
  var room = document.querySelector(".bronze-room");
  var stateLine = document.getElementById("bronzeRoomState");
  if (!main || !room || !stateLine) return;

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
    panel.setAttribute("aria-live", "polite");
    return panel;
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
    answerFrames.slice().reverse().forEach(function (frame, index) {
      var sourceIndex = answerFrames.indexOf(frame);
      var button = document.createElement("button");
      var label = (frame.querySelector("p") || {}).textContent || "Episode";
      var match = label.match(/Episode\s+(\d+)/i);
      button.type = "button";
      button.textContent = match ? "EP " + match[1] : "Answer " + (index + 1);
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", index === 0 ? "true" : "false");
      button.addEventListener("click", function () {
        answerFrames.forEach(function (item, frameIndex) { item.hidden = frameIndex !== sourceIndex; });
        Array.prototype.forEach.call(answerTabs.children, function (tab) {
          tab.setAttribute("aria-selected", tab === button ? "true" : "false");
        });
      });
      answerTabs.appendChild(button);
    });
    answerFrames.forEach(function (frame, index) { frame.hidden = index !== answerFrames.length - 1; });
    answersPanel.insertBefore(answerTabs, answerStack);
  }
  panels.appendChild(answersPanel);

  var coasterPanel = createPanel("bronze-coaster", "bronze-panel--coaster");
  coasterNodes.forEach(function (node) { coasterPanel.appendChild(node); });
  coasterPanel.querySelector("h2").textContent = "Leave your mark.";
  panels.appendChild(coasterPanel);

  var stagePanel = createPanel("bronze-stage", "bronze-panel--stage");
  stageNodes.forEach(function (node) { stagePanel.appendChild(node); });
  panels.appendChild(stagePanel);

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "") || fallback;
    } catch (_) {
      return fallback;
    }
  }

  function renderState() {
    var now = new Date();
    var hour = now.getHours();
    var drink = readJson("laidies_bws_drink", null);
    var coasters = readJson("laidies_bronze_coasters", []);
    var line;
    if (hour >= 20 || hour < 2) {
      line = "Lights are down. The Embeddings are on.";
    } else if (hour >= 16) {
      line = "Happy hour's on. The Special is pouring.";
    } else {
      line = "Doors at 8. Happy hour starts at 4.";
    }
    if (drink && drink.name) line += " Your usual is the " + drink.name + ".";
    if (coasters.length) line += " Your stack has " + coasters.length + (coasters.length === 1 ? " coaster." : " coasters.");
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
    if (!window.cocktailMenus || !window.cocktailFortuneFlaps) return;
    deal.disabled = true;
    result.hidden = true;
    frameSequence.forEach(function (src, index) {
      setTimeout(function () { frame.src = src; }, index * 170);
    });
    setTimeout(function () {
      var selectedLane = lane.value;
      var flap = window.cocktailFortuneFlaps[Math.floor(Math.random() * window.cocktailFortuneFlaps.length)];
      var menu = window.cocktailMenus[selectedLane] || window.cocktailMenus.cocktail;
      var pool = flap.drinks[selectedLane] || flap.drinks.cocktail;
      var drink = menu[pool[Math.floor(Math.random() * pool.length)]];
      document.getElementById("bronzeFortuneMood").textContent = flap.label + " · " + flap.description;
      document.getElementById("bronzeFortuneName").textContent = drink.name;
      document.getElementById("bronzeFortuneVibe").textContent = drink.vibe;
      document.getElementById("bronzeFortuneOrder").textContent = drink.order;
      document.getElementById("bronzeFortuneNote").textContent = drink.note;
      result.hidden = false;
      deal.textContent = "Deal another";
      deal.disabled = false;
      try {
        localStorage.setItem("laidies_bws_drink", JSON.stringify({
          name: drink.name,
          lane: selectedLane,
          mood: flap.label,
          savedAt: new Date().toISOString()
        }));
      } catch (_) {}
      renderState();
    }, frameSequence.length * 170 + 80);
  }

  deal.addEventListener("click", revealDrink);

  var controls = Array.prototype.slice.call(document.querySelectorAll("[data-bronze-panel]"));
  var panelById = {};
  Array.prototype.slice.call(panels.children).forEach(function (panel) { panelById[panel.id] = panel; });

  function closeAll() {
    controls.forEach(function (control) {
      control.classList.remove("is-open");
      control.setAttribute("aria-expanded", "false");
    });
    Object.keys(panelById).forEach(function (id) { panelById[id].hidden = true; });
  }

  function openPanel(id, shouldScroll) {
    var panel = panelById[id];
    var control = controls.find(function (item) { return item.getAttribute("data-bronze-panel") === id; });
    if (!panel || !control) return;
    closeAll();
    panel.hidden = false;
    control.classList.add("is-open");
    control.setAttribute("aria-expanded", "true");
    if (shouldScroll) panel.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  }

  controls.forEach(function (control) {
    control.addEventListener("click", function () {
      var id = control.getAttribute("data-bronze-panel");
      if (control.classList.contains("is-open")) {
        closeAll();
        if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
      } else {
        openPanel(id, true);
      }
    });
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
  renderState();
  setInterval(renderState, 60000);
})();
