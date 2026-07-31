(() => {
  "use strict";

  const canonicalIds = [
    "visitors-centre", "newsstand", "chick-flicks", "blend-snap", "mme-claio",
    "maikeover", "bronze-aige", "dream-phone", "mall", "ksvl-radio",
    "post-office", "town-hall", "library", "sunnyvaile-high", "fairy-godmother",
    "sorority-house", "sanctuary"
  ];
  const params = new URLSearchParams(location.search);
  const requestedFailure = params.get("failure");
  const baseContracts = Array.isArray(window.VC_FUNCTIONAL_DESTINATIONS)
    ? structuredClone(window.VC_FUNCTIONAL_DESTINATIONS)
    : [];
  window.VC_ADMITTED_BASE_CONTRACTS = baseContracts;

  let select = document.querySelector("#destinationSelect");
  const detail = document.querySelector("#destinationDetail");
  let spots = document.querySelector("#mapSpots");
  const state = document.querySelector("#destinationState");
  const name = document.querySelector("#destinationName");
  const summary = document.querySelector("#destinationSummary");
  const limitation = document.querySelector("#destinationLimit");
  const enter = document.querySelector("#destinationEnter");
  let initiatingControl = select;
  let semanticById = new Map();

  function receiverShapeValid(receiver) {
    return receiver &&
      ["fresh", "fail-closed"].includes(receiver.mode) &&
      Array.isArray(receiver.destinations) &&
      receiver.destinations.length === 17 &&
      receiver.destinations.every((item, index) =>
        item.destinationId === canonicalIds[index] &&
        typeof item.name === "string" &&
        typeof item.route === "string" &&
        typeof item.state === "string" &&
        typeof item.label === "string" &&
        typeof item.summary === "string" &&
        typeof item.limitation === "string" &&
        typeof item.actionLabel === "string" &&
        item.completionClaim === false
      );
  }

  function localFailClosed() {
    const links = [...document.querySelectorAll("[data-static-id]")];
    return {
      mode: "fail-closed",
      errorCode: "BROWSER_FIXTURE_UNAVAILABLE",
      announcement: "Current destination status is unavailable. All named routes remain available for status checking.",
      destinations: links.map((link) => ({
        destinationId: link.dataset.staticId,
        name: link.textContent.trim(),
        route: link.getAttribute("href"),
        state: "unavailable",
        label: "Current status unavailable",
        summary: "Open the named route only to check its current page.",
        limitation: "Current readiness could not be verified. Route arrival is navigation, not completion.",
        actionLabel: "Open page — check current status",
        completionClaim: false
      }))
    };
  }

  function closeDetail() {
    detail.hidden = true;
    select.value = "";
    document.querySelectorAll(".map-spot").forEach((spot) => spot.setAttribute("aria-pressed", "false"));
    if (initiatingControl && document.contains(initiatingControl)) initiatingControl.focus();
  }

  function reveal(destinationId, trigger) {
    const destination = semanticById.get(destinationId);
    if (!destination) return;
    initiatingControl = trigger || select;
    select.value = destination.destinationId;
    document.querySelectorAll(".map-spot").forEach((spot) => {
      spot.setAttribute("aria-pressed", String(spot.dataset.destination === destinationId));
    });
    detail.dataset.state = destination.state;
    detail.dataset.completionClaim = String(destination.completionClaim);
    state.dataset.state = destination.state;
    state.textContent = destination.label;
    name.textContent = destination.name;
    summary.textContent = destination.summary;
    limitation.textContent = destination.limitation;
    enter.textContent = destination.actionLabel;
    enter.href = destination.route;
    detail.hidden = false;
    enter.focus({ preventScroll: true });
  }

  function applyReceiver(receiver, provenance) {
    const cleanSelect = select.cloneNode(true);
    select.replaceWith(cleanSelect);
    select = cleanSelect;
    const cleanSpots = spots.cloneNode(true);
    spots.replaceWith(cleanSpots);
    spots = cleanSpots;

    semanticById = new Map(receiver.destinations.map((item) => [item.destinationId, item]));
    window.VC_READINESS_SEMANTICS = structuredClone(receiver);
    window.VC_READINESS_PROVENANCE = structuredClone(provenance || {
      label: "LOCAL_FAIL_CLOSED",
      purpose: "Browser recovery only; not owner readiness or public truth."
    });
    document.documentElement.dataset.receiverReady = "true";
    document.documentElement.dataset.receiverMode = receiver.mode;

    const notice = document.createElement("p");
    notice.id = "projectionStatus";
    notice.className = "limit";
    notice.dataset.receiverMode = receiver.mode;
    notice.dataset.provenance = window.VC_READINESS_PROVENANCE.label;
    notice.textContent = receiver.mode === "fresh"
      ? "Synthetic Platform receiver fixture loaded: 17 route semantics for isolated testing only. Destination pages retain readiness and completion authority."
      : "Readiness projection unavailable: 17 named routes remain for status checking. No destination is represented as complete.";
    document.querySelector(".counter-head > div").append(notice);

    select.replaceChildren(new Option("Select one of 17 destinations", ""));
    for (const destination of receiver.destinations) {
      const base = baseContracts.find((item) => item.id === destination.destinationId);
      select.append(new Option(
        `${destination.name}${base?.address ? ` · ${base.address}` : ""}`,
        destination.destinationId
      ));
      const spot = document.querySelector(`.map-spot[data-destination="${destination.destinationId}"]`);
      if (spot) {
        spot.setAttribute("aria-label", `${destination.name}${base?.address ? `, ${base.address}` : ""}. ${destination.label}`);
        const spotLabel = spot.querySelector("span");
        if (spotLabel) spotLabel.textContent = destination.name;
      }
    }

    select.addEventListener("change", (event) => {
      event.stopImmediatePropagation();
      if (select.value) reveal(select.value, select);
      else closeDetail();
    }, true);
    spots.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-destination]");
      if (!trigger) return;
      event.stopImmediatePropagation();
      reveal(trigger.dataset.destination, trigger);
    }, true);
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || detail.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeDetail();
    }, true);
  }

  fetch("readiness-semantic-fixture-v1.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP_${response.status}`);
      return response.json();
    })
    .then((fixture) => {
      const preferred = requestedFailure === "projection" || requestedFailure === "missing-contract"
        ? fixture.failClosed
        : fixture.fresh;
      const receiver = receiverShapeValid(preferred)
        ? preferred
        : receiverShapeValid(fixture.failClosed)
          ? fixture.failClosed
          : localFailClosed();
      applyReceiver(receiver, fixture.provenance);
    })
    .catch(() => applyReceiver(localFailClosed()));
})();
