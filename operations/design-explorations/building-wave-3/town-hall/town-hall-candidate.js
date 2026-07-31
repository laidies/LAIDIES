(function () {
  "use strict";

  var STORAGE_REGULAR = "laidies_town_regular";
  var STORAGE_DRAFT = "laidies_town_hall_draft_v1";
  var DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  var ALLOWED_REGULARS = new Set(["mme-claio", "fairy-godmother", "dj-sunnyv", "mayor-deb"]);
  var ALLOWED_TYPES = new Set(["compliment", "complaint", "suggestion"]);
  var params = new URLSearchParams(window.location.search);
  var storageDenied = params.get("storage") === "denied";
  var mediaFail = params.get("media") === "fail";
  var malformedRoster = params.get("roster") === "malformed";
  var stateFixture = params.get("state") || "";

  var stationButtons = Array.from(document.querySelectorAll("[data-station]"));
  var panels = Array.from(document.querySelectorAll("[data-panel]"));
  var roomStatus = document.getElementById("room-status");
  var regularsGrid = document.getElementById("regulars-grid");
  var rosterCount = document.getElementById("roster-count");
  var regularStatus = document.getElementById("regular-choice-status");
  var regularClear = document.getElementById("regular-clear");
  var draftForm = document.getElementById("comment-draft-form");
  var draftBody = document.getElementById("comment-body");
  var draftSubject = document.getElementById("comment-subject");
  var draftCount = document.getElementById("comment-count");
  var draftDelete = document.getElementById("draft-delete");
  var draftStatus = document.getElementById("draft-status");
  var audio = document.getElementById("deb-audio");
  var audioStatus = document.getElementById("audio-status");
  var audioStop = document.getElementById("audio-stop");
  var audioRetry = document.getElementById("audio-retry");
  var activeAudioButton = null;
  var currentRoster = [];
  var lastAudioSource = "";
  var lastAudioTitle = "";

  document.querySelectorAll("[data-js-control], [data-js-field]").forEach(function (control) {
    control.disabled = false;
  });

  function safeGet(key) {
    if (storageDenied) throw new Error("storage denied fixture");
    return window.localStorage.getItem(key);
  }

  function safeSet(key, value) {
    if (storageDenied) throw new Error("storage denied fixture");
    window.localStorage.setItem(key, value);
  }

  function safeRemove(key) {
    if (storageDenied) throw new Error("storage denied fixture");
    window.localStorage.removeItem(key);
  }

  function closeStations() {
    if (audio && !audio.paused) stopAudio("Playback stopped when Mayor Deb’s counter closed.");
    stationButtons.forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
    });
    panels.forEach(function (panel) {
      panel.hidden = true;
    });
  }

  function openStation(id, focusPanel, updateHash) {
    var button = stationButtons.find(function (item) { return item.dataset.station === id; });
    var panel = panels.find(function (item) { return item.dataset.panel === id; });
    if (!button || !panel) return;
    closeStations();
    button.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    roomStatus.textContent = id === "deb"
      ? "Mayor Deb’s counter is open."
      : id === "regulars"
        ? "The Regulars noticeboard is open."
        : "The comment drop-box is open in device-draft mode only.";
    if (updateHash) history.replaceState(null, "", "#" + id);
    if (focusPanel) panel.focus({ preventScroll: true });
    panel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  }

  stationButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var id = button.dataset.station;
      var isOpen = button.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeStations();
        roomStatus.textContent = "Choose a station.";
        history.replaceState(null, "", window.location.pathname + window.location.search);
      } else {
        openStation(id, true, true);
      }
    });
  });

  function openFromHash() {
    var id = window.location.hash.replace(/^#/, "");
    if (["deb", "regulars", "comments"].includes(id)) openStation(id, false, false);
  }
  window.addEventListener("hashchange", openFromHash);

  async function loadRoster() {
    try {
      if (malformedRoster) throw new Error("malformed roster fixture");
      var response = await fetch("town-hall-data.json", { cache: "no-store" });
      if (!response.ok) throw new Error("roster unavailable");
      var data = await response.json();
      if (!data || data.version !== 1 || !Array.isArray(data.regulars) || data.regulars.length !== 4) {
        throw new Error("roster shape rejected");
      }
      var ids = new Set();
      data.regulars.forEach(function (regular) {
        if (!regular || !ALLOWED_REGULARS.has(regular.id) || ids.has(regular.id)) throw new Error("roster identity rejected");
        if (![regular.name, regular.role, regular.description, regular.image, regular.href, regular.cta].every(function (value) {
          return typeof value === "string" && value.trim();
        })) throw new Error("roster field rejected");
        if (!regular.image.startsWith("/assets/") || (!regular.href.startsWith("/") && regular.href !== "#deb")) {
          throw new Error("roster path rejected");
        }
        ids.add(regular.id);
      });
      currentRoster = data.regulars;
      renderRoster();
      paintRegularChoice();
    } catch (error) {
      currentRoster = [];
      rosterCount.textContent = "Roster unavailable";
      regularsGrid.innerHTML = '<p class="roster-error" role="alert">The governed Regulars roster could not be opened. No partial or invented roster has been shown. Try the current Town Hall instead.</p>';
      regularStatus.textContent = "Town Regular selection is unavailable until the exact roster returns.";
      regularClear.disabled = true;
    }
  }

  function renderRoster() {
    rosterCount.textContent = String(currentRoster.length);
    regularsGrid.replaceChildren();
    currentRoster.forEach(function (regular) {
      var article = document.createElement("article");
      article.className = "regular";
      article.dataset.regularId = regular.id;

      var image = document.createElement("img");
      image.src = regular.image;
      image.alt = regular.name;
      image.loading = "lazy";
      image.addEventListener("error", function () {
        image.hidden = true;
        article.classList.add("image-failed");
      }, { once: true });

      var copy = document.createElement("div");
      copy.className = "regular__copy";
      var role = document.createElement("span");
      role.className = "eyebrow";
      role.textContent = regular.role;
      var title = document.createElement("h3");
      title.textContent = regular.name;
      var description = document.createElement("p");
      description.textContent = regular.description;
      var link = document.createElement("a");
      link.href = regular.href;
      link.textContent = regular.cta + " →";
      if (regular.href === "#deb") {
        link.addEventListener("click", function () { openStation("deb", true, true); });
      }
      var choose = document.createElement("button");
      choose.type = "button";
      choose.textContent = "Choose " + regular.name + " on this device";
      choose.addEventListener("click", function () { selectRegular(regular.id); });

      copy.append(role, title, description, link, choose);
      article.append(image, copy);
      regularsGrid.append(article);
    });
  }

  function readRegular() {
    try {
      var value = safeGet(STORAGE_REGULAR) || "";
      if (!ALLOWED_REGULARS.has(value)) {
        if (value) safeRemove(STORAGE_REGULAR);
        return "";
      }
      return value;
    } catch (error) {
      return "";
    }
  }

  function paintRegularChoice(message) {
    var selected = readRegular();
    document.querySelectorAll("[data-regular-id]").forEach(function (article) {
      article.classList.toggle("is-selected", article.dataset.regularId === selected);
      var button = article.querySelector("button");
      if (button) button.setAttribute("aria-pressed", article.dataset.regularId === selected ? "true" : "false");
    });
    var regular = currentRoster.find(function (item) { return item.id === selected; });
    regularClear.disabled = !selected || storageDenied;
    if (message) regularStatus.textContent = message;
    else if (storageDenied) regularStatus.textContent = "Device storage is unavailable. No Town Regular choice was claimed.";
    else if (regular) regularStatus.textContent = regular.name + " is selected on this device only.";
    else regularStatus.textContent = "No Town Regular is selected on this device.";
  }

  function selectRegular(id) {
    if (!ALLOWED_REGULARS.has(id) || !currentRoster.some(function (item) { return item.id === id; })) return;
    try {
      safeSet(STORAGE_REGULAR, id);
      var regular = currentRoster.find(function (item) { return item.id === id; });
      paintRegularChoice(regular.name + " is selected on this device only. Nothing was added to an account.");
    } catch (error) {
      paintRegularChoice("The device choice could not be saved. No account or cross-device state was created.");
    }
  }

  regularClear.addEventListener("click", function () {
    try {
      safeRemove(STORAGE_REGULAR);
      paintRegularChoice("The device-only Town Regular choice was cleared.");
      var first = regularsGrid.querySelector("button");
      if (first) first.focus();
    } catch (error) {
      paintRegularChoice("The device choice could not be cleared. No server or account state was changed.");
    }
  });

  function stopAudio(message) {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    if (activeAudioButton) activeAudioButton.setAttribute("aria-pressed", "false");
    activeAudioButton = null;
    audioStop.disabled = true;
    audioRetry.disabled = true;
    if (message) audioStatus.textContent = message;
  }

  function playAudio(button) {
    var source = button.dataset.audio;
    var title = button.dataset.title;
    lastAudioSource = source;
    lastAudioTitle = title;
    audioRetry.hidden = true;
    audioRetry.disabled = true;
    if (activeAudioButton === button && !audio.paused) {
      audio.pause();
      button.setAttribute("aria-pressed", "false");
      audioStatus.textContent = title + " is paused.";
      return;
    }
    if (activeAudioButton) activeAudioButton.setAttribute("aria-pressed", "false");
    activeAudioButton = button;
    button.setAttribute("aria-pressed", "true");
    audio.src = mediaFail ? "/missing-town-hall-audio.mp3" : source;
    audioStop.disabled = false;
    audio.play().then(function () {
      audioStatus.textContent = "Playing " + title + ".";
    }).catch(function () {
      audioStatus.textContent = "Playback was blocked. Press Retry when you are ready.";
      audioRetry.hidden = false;
      audioRetry.disabled = false;
    });
  }

  document.querySelectorAll("[data-audio]").forEach(function (button) {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", function () { playAudio(button); });
  });
  audioStop.addEventListener("click", function () { stopAudio("Playback stopped."); });
  audioRetry.addEventListener("click", function () {
    var button = Array.from(document.querySelectorAll("[data-audio]")).find(function (item) {
      return item.dataset.audio === lastAudioSource && item.dataset.title === lastAudioTitle;
    });
    if (button) playAudio(button);
  });
  audio.addEventListener("ended", function () { stopAudio("Playback finished."); });
  audio.addEventListener("error", function () {
    audio.pause();
    audioStatus.textContent = "Playback was blocked. Press Retry when you are ready.";
    audioRetry.hidden = false;
    audioRetry.disabled = false;
  });
  audio.addEventListener("pause", function () {
    if (!audioRetry.hidden || !activeAudioButton || audio.ended) return;
    activeAudioButton.setAttribute("aria-pressed", "false");
  });

  function validDraft(value) {
    if (!value || value.version !== 1 || !ALLOWED_TYPES.has(value.type)) return null;
    if (typeof value.subject !== "string" || value.subject.length > 100) return null;
    if (typeof value.body !== "string" || value.body.trim().length < 3 || value.body.length > 2000) return null;
    if (!Number.isFinite(value.savedAt) || value.savedAt > Date.now() + 60 * 1000 || Date.now() - value.savedAt > DRAFT_TTL_MS) return null;
    return value;
  }

  function loadDraft() {
    try {
      if (stateFixture === "corrupt") safeSet(STORAGE_DRAFT, "{not json");
      if (stateFixture === "stale") safeSet(STORAGE_DRAFT, JSON.stringify({
        version: 1,
        type: "suggestion",
        subject: "Old draft",
        body: "This should be discarded.",
        savedAt: Date.now() - DRAFT_TTL_MS - 1000
      }));
      var raw = safeGet(STORAGE_DRAFT);
      if (!raw) {
        if (storageDenied) draftStatus.textContent = "Device storage is unavailable. You can write, but no draft will be claimed as saved.";
        return;
      }
      var parsed = validDraft(JSON.parse(raw));
      if (!parsed) {
        safeRemove(STORAGE_DRAFT);
        draftStatus.textContent = "An invalid or expired device draft was discarded.";
        return;
      }
      var radio = draftForm.querySelector('input[name="type"][value="' + parsed.type + '"]');
      if (radio) radio.checked = true;
      draftSubject.value = parsed.subject;
      draftBody.value = parsed.body;
      updateCount();
      draftDelete.disabled = false;
      draftStatus.textContent = "A valid device-only draft was restored. It was not filed or accepted.";
    } catch (error) {
      draftStatus.textContent = storageDenied
        ? "Device storage is unavailable. You can write, but no draft will be claimed as saved."
        : "A corrupt device draft was discarded. Nothing was sent.";
    }
  }

  function updateCount() {
    draftCount.textContent = String(draftBody.value.length) + " / 2000";
  }
  draftBody.addEventListener("input", updateCount);

  draftForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var typeInput = draftForm.querySelector('input[name="type"]:checked');
    if (!typeInput) {
      draftStatus.textContent = "Choose compliment, complaint or suggestion before saving.";
      draftForm.querySelector('input[name="type"]').focus();
      return;
    }
    var body = draftBody.value.trim();
    if (body.length < 3) {
      draftStatus.textContent = "Write at least three characters before saving.";
      draftBody.focus();
      return;
    }
    var value = {
      version: 1,
      type: typeInput.value,
      subject: draftSubject.value.trim(),
      body: draftBody.value,
      savedAt: Date.now()
    };
    try {
      safeSet(STORAGE_DRAFT, JSON.stringify(value));
      draftDelete.disabled = false;
      draftStatus.textContent = "Draft saved on this device for up to seven days. It was not filed, accepted or read.";
    } catch (error) {
      draftStatus.textContent = "The draft could not be saved on this device. Nothing was sent.";
    }
  });

  draftDelete.addEventListener("click", function () {
    try {
      safeRemove(STORAGE_DRAFT);
      draftForm.reset();
      draftBody.value = "";
      draftSubject.value = "";
      updateCount();
      draftDelete.disabled = true;
      draftStatus.textContent = "The device-only draft was deleted. No server or staff record was changed.";
      draftForm.querySelector('input[name="type"]').focus();
    } catch (error) {
      draftStatus.textContent = "The device draft could not be deleted. No server or staff record was changed.";
    }
  });

  openFromHash();
  loadRoster();
  loadDraft();
})();
