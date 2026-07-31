(() => {
  "use strict";

  const COMPONENTS = [
    {
      id: "study_sheet",
      label: "Study Sheet",
      job: "Compact review",
      status: "planned",
      statusLabel: "Planned · no Study Sheet yet",
      route: null
    },
    {
      id: "try_on",
      label: "Episode 04 Try-On",
      job: "Apply the episode through one field trip",
      status: "available",
      statusLabel: "Ready on this device",
      route: "/try-on.html?issue=4&from=blend-snap"
    },
    {
      id: "cheat_sheet",
      label: "Founding Mothers Timeline",
      job: "Save or print the practical reference",
      status: "available",
      statusLabel: "Ready",
      route: "/content/printables/issue-04-founding-mothers-timeline.html"
    },
    {
      id: "trading_cards",
      label: "Episode 04 Concept Cards",
      job: "Collect and remember concepts",
      status: "unavailable",
      statusLabel: "Not made for Episode 04",
      route: null
    },
    {
      id: "quiz",
      label: "Episode 04 Pop Quiz",
      job: "Check understanding beside the Study Pack",
      status: "available",
      statusLabel: "Ready next door",
      route: "/learn/quiz.html#quiz-start",
      separate: true
    }
  ];

  const EPISODES = [
    { number: 1, title: "On Wednesdays We Do AI", study: "planned", tryOn: "ready", cards: "held", quiz: "ready" },
    { number: 2, title: "Tell Me What You Want", study: "planned", tryOn: "ready", cards: "held", quiz: "ready" },
    { number: 3, title: "The Burn Book Problem", study: "planned", tryOn: "ready", cards: "held", quiz: "ready" },
    { number: 4, title: "The Founding Mothers", study: "planned", tryOn: "ready", cards: "unavailable", quiz: "ready" }
  ];

  const VISITORS = {
    first: {
      arrival: "First time in? The Special is an episode menu: review, practise, reference, remember, then check understanding next door.",
      truth: "Clean visit · no identity or progress is assumed."
    },
    returning: {
      arrival: "Welcome back. JoJo may recognize this prototype browser’s usual or last-opened receipt, but rechecks the current inventory.",
      truth: "Returning without a Resident Card · device-local continuity only."
    },
    "local-card": {
      arrival: "Your device-local Resident Card changes nothing here. The same verified menu and optional local usual remain available.",
      truth: "Device-local Card · not verified identity, membership, ownership or sync."
    },
    "account-card": {
      arrival: "A verified account does not unlock a different café in this candidate. No account state is read or written.",
      truth: "Verified account present · Blend & Snap remains account-neutral."
    }
  };

  const DATA_FAILURES = new Set(["loading", "offline", "stale", "disagreement"]);
  const candidateUsualKey = "laidies_bs_candidate_usual_v1";
  const candidatePackKey = "laidies_bs_candidate_last_pack_v1";
  let triggerBeforeDialog = null;
  let activeStorageDenied = false;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function safeGet(key) {
    if (activeStorageDenied) return null;
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeSet(key, value) {
    if (activeStorageDenied) return false;
    try {
      localStorage.setItem(key, value);
      return localStorage.getItem(key) === value;
    } catch {
      return false;
    }
  }

  function renderVisitor(state) {
    const visitor = VISITORS[state] || VISITORS.first;
    $("#arrivalCopy").textContent = visitor.arrival;
    $("#visitorTruth").textContent = visitor.truth;
    document.body.dataset.visitor = state;
  }

  function componentStateText(component) {
    if (component.separate) return "Separate · ready next door";
    if (component.status === "available") return "Available";
    return component.statusLabel;
  }

  function renderInventory() {
    $("#menuMini").replaceChildren(...COMPONENTS.map((component) => {
      const item = document.createElement("li");
      const label = document.createElement("span");
      const status = document.createElement("span");
      label.textContent = component.label;
      status.textContent = componentStateText(component);
      item.append(label, status);
      return item;
    }));

    $("#ticketRail").replaceChildren(...COMPONENTS.map((component) => {
      const ticket = document.createElement("article");
      ticket.className = "component-ticket";
      ticket.dataset.component = component.id;
      ticket.dataset.status = component.status;
      const status = document.createElement("span");
      status.className = "status-pill";
      status.textContent = componentStateText(component);
      const title = document.createElement("h3");
      title.textContent = component.label;
      const job = document.createElement("p");
      job.textContent = component.job;
      ticket.append(status, title, job);
      if (component.status === "available" && component.route) {
        const link = document.createElement("a");
        link.href = component.route;
        link.textContent = component.separate ? "Go next door" : "Open handoff";
        ticket.append(link);
      } else {
        const truth = document.createElement("p");
        truth.className = "ticket-truth";
        truth.textContent = component.id === "study_sheet"
          ? "The interaction sample below does not change this planned status."
          : "No activity or ownership is offered from this receipt.";
        ticket.append(truth);
      }
      return ticket;
    }));
  }

  function renderFailureInventory(message) {
    const menuItem = document.createElement("li");
    const menuCopy = document.createElement("span");
    menuCopy.textContent = "Current pack inventory";
    const menuStatus = document.createElement("span");
    menuStatus.textContent = "Withheld until validation passes";
    menuItem.append(menuCopy, menuStatus);
    $("#menuMini").replaceChildren(menuItem);

    const notice = document.createElement("article");
    notice.className = "inventory-failure";
    notice.setAttribute("role", "status");
    const title = document.createElement("h3");
    title.textContent = "Current pack actions are off the rail";
    const copy = document.createElement("p");
    copy.textContent = message;
    const limit = document.createElement("p");
    limit.className = "ticket-truth";
    limit.textContent = "No current Study Pack status, route or keyboard target is reused while validation is incomplete.";
    notice.append(title, copy, limit);
    $("#ticketRail").replaceChildren(notice);

    const rackNotice = document.createElement("article");
    rackNotice.className = "inventory-failure";
    const rackTitle = document.createElement("h3");
    rackTitle.textContent = "The receipt archive is temporarily closed";
    const rackCopy = document.createElement("p");
    rackCopy.textContent = "Released Episodes remain available through the fallback above; JoJo will not reuse unvalidated pack receipts.";
    rackNotice.append(rackTitle, rackCopy);
    $("#episodeRack").replaceChildren(rackNotice);
    $(".handoff-board").hidden = true;
  }

  function renderReceiptItems() {
    $("#receiptItems").replaceChildren(...COMPONENTS.map((component) => {
      const item = document.createElement("li");
      const copy = document.createElement("span");
      const title = document.createElement("strong");
      const job = document.createElement("small");
      title.textContent = component.label;
      job.textContent = `${component.job} · ${componentStateText(component)}`;
      copy.append(title, job);
      item.append(copy);
      if (component.status === "available" && component.route) {
        const link = document.createElement("a");
        link.href = component.route;
        link.textContent = component.separate ? "Go next door" : "Open";
        item.append(link);
      } else {
        const status = document.createElement("span");
        status.className = "status-pill";
        status.textContent = component.statusLabel;
        item.append(status);
      }
      return item;
    }));
  }

  function renderEpisodeRack() {
    $("#episodeRack").replaceChildren(...EPISODES.map((episode) => {
      const receipt = document.createElement("article");
      receipt.className = "episode-receipt";
      receipt.dataset.episode = String(episode.number);
      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = `Episode ${String(episode.number).padStart(2, "0")}`;
      const title = document.createElement("h3");
      title.textContent = episode.title;
      const list = document.createElement("ul");
      [
        `Study Sheet · ${episode.study}`,
        `Try-On · ${episode.tryOn}`,
        `Cards · ${episode.cards}`,
        `Quiz · ${episode.quiz} next door`
      ].forEach((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        list.append(item);
      });
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = episode.number === 4 ? "Order current receipt" : "Inspect past inventory";
      button.addEventListener("click", () => {
        if (episode.number === 4) openReceipt(button);
        else {
          $("#inventoryStatus").textContent =
            `Episode ${String(episode.number).padStart(2, "0")} remains discoverable; its Study Sheet is planned and its Cards are held.`;
          $("#inventoryStatus").scrollIntoView({ block: "center", behavior: "smooth" });
        }
      });
      receipt.append(eyebrow, title, list, button);
      return receipt;
    }));
  }

  function applyFailure(failure) {
    activeStorageDenied = failure === "storage-denied";
    const order = $("#orderButton");
    const actions = $("#failureActions");
    const status = $("#inventoryStatus");
    actions.hidden = true;
    order.disabled = false;
    order.textContent = "Order Episode 04";
    $("#specialTitle").textContent = "Episode 04 · The Founding Mothers";
    $("#specialSummary").textContent = "Two pack pieces are ready. The Quiz is separate and ready next door.";

    if (failure === "none" || failure === "storage-denied") {
      renderInventory();
      renderEpisodeRack();
      $(".handoff-board").hidden = false;
      status.textContent = activeStorageDenied
        ? "Inventory is healthy. This browser blocked candidate-only memory; ordering still works."
        : "Inventory checked against the candidate’s read-only manifest fixture.";
      return;
    }

    order.disabled = true;
    if (failure === "loading") {
      order.textContent = "Checking the menu";
      status.textContent = "JoJo is checking the episode and pack inventory. Nothing is presented as ready yet.";
      renderFailureInventory("JoJo is still validating the episode and component inventory.");
      return;
    }

    const failureCopy = {
      offline: "The inventory could not be reached. The Special is turned around; nothing is presented as ready.",
      stale: "The inventory is past its freshness date. The Special is turned around; nothing is presented as ready.",
      disagreement: "The episode list and pack inventory disagree. The Special is turned around; nothing is presented as ready."
    };
    order.textContent = "Pack menu unavailable";
    $("#specialTitle").textContent = "The Special is turned around";
    $("#specialSummary").textContent = "JoJo will not guess which weekly pieces exist.";
    status.textContent = failureCopy[failure];
    renderFailureInventory(failureCopy[failure]);
    actions.hidden = false;
    requestAnimationFrame(() => $("#retryButton").focus());
  }

  function openReceipt(trigger) {
    if ($("#orderButton").disabled) return;
    triggerBeforeDialog = trigger || document.activeElement;
    const saved = safeSet(candidatePackKey, "episode-04");
    $("#receiptSummary").textContent = saved
      ? "Two of four pack pieces are ready. This prototype browser now remembers only that the receipt opened."
      : "Two of four pack pieces are ready. Device memory is unavailable; the receipt still works.";
    const dialog = $("#receiptDialog");
    dialog.showModal();
    requestAnimationFrame(() => $("#receiptTitle").focus());
  }

  function restoreUsual() {
    const usual = safeGet(candidateUsualKey);
    $$(".drink-buttons button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.drink === usual));
    });
    $("#usualCopy").textContent = usual
      ? `${usual} is the usual in this prototype browser only.`
      : activeStorageDenied
        ? "Device memory is blocked. A drink can be chosen for this visit without blocking the menu."
        : "Choose a drink if you want. It changes no learning, reward or account state.";
  }

  function applyScenario() {
    const visitor = $("#visitorState").value;
    const failure = $("#failureState").value;
    renderVisitor(visitor);
    applyFailure(failure);
    restoreUsual();
    document.body.dataset.fixture = failure;
    $("#ticketRail").toggleAttribute("data-validation-failed", DATA_FAILURES.has(failure));
  }

  $("#scenarioForm").addEventListener("submit", (event) => {
    event.preventDefault();
    applyScenario();
  });

  $("#retryButton").addEventListener("click", () => {
    $("#failureState").value = "none";
    applyScenario();
    $("#orderButton").focus();
  });

  $("#orderButton").addEventListener("click", (event) => openReceipt(event.currentTarget));
  $("#receiptDialog").addEventListener("close", () => {
    if (triggerBeforeDialog && typeof triggerBeforeDialog.focus === "function") triggerBeforeDialog.focus();
  });

  $$(".drink-buttons button").forEach((button) => {
    button.addEventListener("click", () => {
      const saved = safeSet(candidateUsualKey, button.dataset.drink);
      $$(".drink-buttons button").forEach((peer) => peer.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      $("#usualCopy").textContent = saved
        ? `${button.dataset.drink} is the usual in this prototype browser only.`
        : `${button.dataset.drink} is selected for this visit. Device memory is unavailable.`;
    });
  });

  $("#openStudySample").addEventListener("click", (event) => {
    const body = $("#studySampleBody");
    const willOpen = body.hidden;
    body.hidden = !willOpen;
    event.currentTarget.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) body.querySelector("input").focus();
  });

  $("#checkStudyAnswer").addEventListener("click", () => {
    const chosen = $('input[name="study-check"]:checked');
    $("#studyFeedback").textContent = !chosen
      ? "Choose one next step first."
      : chosen.value === "try-on"
        ? "Yes. The Try-On owns real-task practice. The Quiz checks understanding; the Study Sheet reviews."
        : "Not this time. The Try-On is the surface that owns practice on a real task.";
  });

  $$(".practice-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.setAttribute("aria-pressed", String(card.getAttribute("aria-pressed") !== "true"));
    });
  });

  const params = new URLSearchParams(location.search);
  if (VISITORS[params.get("visitor")]) $("#visitorState").value = params.get("visitor");
  if (["none", "loading", "offline", "stale", "disagreement", "storage-denied"].includes(params.get("failure"))) {
    $("#failureState").value = params.get("failure");
  }

  renderInventory();
  renderReceiptItems();
  renderEpisodeRack();
  applyScenario();
})();
