(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  var registryUrl = "/content/music/ksvl-track-registry.json";
  var playerKey = "laidies_ksvl_wave3_candidate_state_v1";
  var stickerKey = "laidies_ksvl_wave3_candidate_stickers_v1";
  var requestKey = "laidies_ksvl_wave3_candidate_request_v1";
  var playerTtl = 6 * 60 * 60 * 1000;
  var requestTtl = 7 * 24 * 60 * 60 * 1000;
  var registryRequest = 0;
  var tracks = [];
  var queue = [];
  var currentIndex = -1;
  var registrySignature = "";
  var pendingSeek = null;
  var selectedStickers = [];

  var audio = document.getElementById("audio");
  var title = document.getElementById("deck-title");
  var context = document.getElementById("playerContext");
  var state = document.getElementById("playerState");
  var toggle = document.getElementById("togglePlay");
  var seek = document.getElementById("seek");
  var timeLabel = document.getElementById("timeLabel");
  var volume = document.getElementById("volume");
  var muteButton = document.getElementById("muteButton");
  var retryButton = document.getElementById("retryButton");
  var sourceLink = document.getElementById("sourceLink");
  var mixGrid = document.getElementById("mixGrid");
  var catalogFailure = document.getElementById("catalogFailure");
  var catalogRetry = document.getElementById("catalogRetry");
  var bandGrid = document.getElementById("bandGrid");
  var stickerGrid = document.getElementById("stickerGrid");
  var stickerReceipt = document.getElementById("stickerReceipt");
  var requestForm = document.getElementById("requestForm");
  var requestStyle = document.getElementById("requestStyle");
  var requestTopic = document.getElementById("requestTopic");
  var requestLyrics = document.getElementById("requestLyrics");
  var requestReceipt = document.getElementById("requestReceipt");

  var mixes = [
    { id: "all", label: "All songs" },
    { id: "anthems", label: "Anthems" },
    { id: "saints", label: "PATRON SAiNTS" },
    { id: "activities", label: "Activities & places" },
    { id: "episodes", label: "Episodes" },
    { id: "bside", label: "B-sides" }
  ];

  var bands = [
    { artist: "THE LAiDIES", cover: "/assets/albums/the-laidies-welcome-to-the-grid.png" },
    { artist: "The Embeddings", cover: "/assets/albums/the-embeddings-deep-vectors.png" },
    { artist: "Chain of Thought", cover: "/assets/albums/chain-of-thought-david-says.png" },
    { artist: "The Overfits", cover: "/assets/albums/the-overfits-memorized.png" },
    { artist: "The Recalls", cover: "/assets/albums/the-recalls-down-at-the-blend-and-snap.png" },
    { artist: "The Regressions", cover: "/assets/albums/the-regressions-please-fit-this-curve.png" },
    { artist: "The Bots", cover: "/assets/albums/the-bots-dial-up-the-dance-floor.png" },
    { artist: "Latent Space", cover: "/assets/albums/latent-space-between-layers.png" },
    { artist: "Grand Ol' Query", cover: "/assets/albums/grand-ol-query-common-sense.png" },
    { artist: "The Predicts", cover: "/assets/albums/the-predicts-told-you-so.png" }
  ];

  var stickers = [
    { id: "ksvl-community-raidio", label: "KSVL Community RAiDIO", type: "declaration", image: "/assets/stickers/ksvl/ksvl-community-raidio.png" },
    { id: "ksvl-books-hooks-motto-oval", label: "Learn from hooks", type: "declaration", image: "/assets/stickers/ksvl/ksvl-books-hooks-motto-oval.png" },
    { id: "ksvl-dont-just-learn-bumper", label: "Don’t just learn from books", type: "declaration", image: "/assets/stickers/ksvl/ksvl-dont-just-learn-bumper.png" },
    { id: "ksvl-dj-sunnyv-fanclub", label: "DJ SunnyV fan club", type: "declaration", image: "/assets/stickers/ksvl/ksvl-dj-sunnyv-fanclub.png" },
    { id: "band-the-laidies", label: "THE LAiDIES", type: "declaration", image: "/assets/stickers/ksvl/band-the-laidies.png" },
    { id: "band-chain-of-thought", label: "Chain of Thought", type: "declaration", image: "/assets/stickers/ksvl/band-chain-of-thought.png" },
    { id: "band-the-overfits", label: "The Overfits", type: "declaration", image: "/assets/stickers/ksvl/band-the-overfits.png" },
    { id: "band-the-predicts", label: "The Predicts", type: "declaration", image: "/assets/stickers/ksvl/band-the-predicts.png" },
    { id: "band-the-recalls", label: "The Recalls", type: "declaration", image: "/assets/stickers/ksvl/band-the-recalls.png" },
    { id: "band-the-regressions", label: "The Regressions", type: "declaration", image: "/assets/stickers/ksvl/band-the-regressions.png" },
    { id: "band-the-embeddings", label: "The Embeddings", type: "declaration", image: "/assets/stickers/ksvl/band-the-embeddings.png" },
    { id: "band-the-bots", label: "The Bots", type: "declaration", image: "/assets/stickers/ksvl/band-the-bots.png" },
    { id: "ksvl-mix-cd-alchemist", label: "Mix CD Alchemist", type: "declaration", image: "/assets/stickers/ksvl/ksvl-mix-cd-alchemist.png" },
    { id: "ksvl-charter-listener", label: "Charter Listener", type: "achievement", image: "/assets/stickers/ksvl/ksvl-charter-listener.png" },
    { id: "ksvl-all-wednesdays", label: "All Wednesdays", type: "achievement", image: "/assets/stickers/ksvl/ksvl-all-wednesdays.png" },
    { id: "ksvl-saints-mix-certified", label: "SAiNTS Mix Certified", type: "achievement", image: "/assets/stickers/ksvl/ksvl-saints-mix-certified.png" },
    { id: "ksvl-bronze-aige-regular", label: "BRONZE AiGE Regular", type: "achievement", image: "/assets/stickers/ksvl/ksvl-bronze-aige-regular.png" },
    { id: "ksvl-encore", label: "Encore", type: "achievement", image: "/assets/stickers/ksvl/ksvl-encore.png" }
  ];

  document.querySelectorAll("[data-js-control]").forEach(function (control) {
    control.disabled = false;
  });

  function safeStorage() {
    if (params.get("storage") === "denied") throw new Error("storage fixture");
    return localStorage;
  }

  function exactKeys(value, allowed) {
    return value && typeof value === "object" &&
      Object.keys(value).sort().join("|") === allowed.slice().sort().join("|");
  }

  function safeTrack(track) {
    return track &&
      typeof track.id === "string" &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(track.id) &&
      typeof track.title === "string" && track.title.trim() === track.title &&
      typeof track.artist === "string" && track.artist.trim() === track.artist &&
      typeof track.src === "string" &&
      /^\/content\/music\/[A-Za-z0-9_./'-]+\.mp3$/.test(track.src) &&
      Array.isArray(track.mixes) && track.mixes.length > 0 &&
      track.mixes.every(function (mix) { return ["anthems", "saints", "activities", "episodes", "bside"].includes(mix); }) &&
      track.status === "AVAILABLE" &&
      track.rightsStatus === "CREATOR_CONFIRMED_SUNO_ORIGINAL" &&
      track.sourceStatus === "FILE_PRESENT_VERIFIED" &&
      (track.sourceLesson === null || /^\/[A-Za-z0-9_./-]+\.html(?:#[A-Za-z0-9_-]+)?$/.test(track.sourceLesson));
  }

  function validateRegistry(payload) {
    if (!payload || !Array.isArray(payload.tracks) || payload.tracks.length !== 29) {
      throw new Error("registry count invalid");
    }
    var ids = Object.create(null);
    var sources = Object.create(null);
    var admitted = payload.tracks.map(function (track) {
      if (!safeTrack(track) || ids[track.id] || sources[track.src]) throw new Error("registry item invalid");
      ids[track.id] = true;
      sources[track.src] = true;
      return {
        id: track.id,
        title: track.title,
        artist: track.artist,
        src: track.src,
        mixes: track.mixes.slice(),
        sourceLesson: track.sourceLesson
      };
    });
    return admitted;
  }

  function signatureFor(items) {
    return items.map(function (track) { return track.id + ":" + track.src; }).join("|");
  }

  function formatTime(value) {
    if (!Number.isFinite(value) || value < 0) return "0:00";
    var minutes = Math.floor(value / 60);
    var seconds = Math.floor(value % 60);
    return minutes + ":" + String(seconds).padStart(2, "0");
  }

  function setPlayerState(message, kind) {
    state.textContent = message;
    state.dataset.kind = kind || "ready";
  }

  function currentTrack() {
    return currentIndex >= 0 && queue[currentIndex] ? queue[currentIndex] : null;
  }

  function setTrack(track, nextQueue, autoplay, position) {
    if (!track || !tracks.some(function (item) { return item.id === track.id; })) return false;
    retryButton.hidden = true;
    queue = Array.isArray(nextQueue) && nextQueue.length ? nextQueue.slice() : [track];
    currentIndex = queue.findIndex(function (item) { return item.id === track.id; });
    if (currentIndex < 0) {
      queue = [track];
      currentIndex = 0;
    }
    audio.pause();
    audio.src = params.get("media") === "fail" ? "/content/music/does-not-exist.mp3" : track.src;
    pendingSeek = Number.isFinite(position) && position > 0 ? position : null;
    title.textContent = track.title;
    context.textContent = track.artist + " · creator-confirmed LAiDIES original";
    sourceLink.hidden = !track.sourceLesson;
    if (track.sourceLesson) sourceLink.href = track.sourceLesson;
    toggle.textContent = "Play";
    toggle.setAttribute("aria-label", "Play " + track.title);
    setPlayerState(autoplay ? "Loading " + track.title + "." : track.title + " is selected and paused.", autoplay ? "loading" : "paused");
    savePlayerState();
    if (autoplay) {
      var result = audio.play();
      if (result && typeof result.catch === "function") {
        result.catch(function () { mediaFailure("Playback was blocked. Press Retry when you are ready."); });
      }
    }
    return true;
  }

  function playQueue(items, start) {
    if (!items.length) return;
    var index = Math.max(0, Math.min(start || 0, items.length - 1));
    setTrack(items[index], items, true, 0);
  }

  function savePlayerState() {
    var track = currentTrack();
    if (!track || !registrySignature) return;
    var record = {
      registry: registrySignature,
      trackId: track.id,
      position: Number.isFinite(audio.currentTime) ? Math.max(0, Math.min(audio.currentTime, Number.isFinite(audio.duration) ? audio.duration : audio.currentTime)) : 0,
      volume: audio.volume,
      muted: audio.muted,
      savedAt: Date.now()
    };
    try {
      safeStorage().setItem(playerKey, JSON.stringify(record));
    } catch (error) {
      setPlayerState("Playback works, but return position could not be saved on this device.", "storage");
    }
  }

  function readPlayerState() {
    var raw;
    if (params.get("state") === "corrupt") raw = "{bad";
    else if (params.get("state") === "stale") {
      raw = JSON.stringify({
        registry: registrySignature,
        trackId: tracks[0].id,
        position: 12,
        volume: 0.8,
        muted: false,
        savedAt: Date.now() - playerTtl - 1000
      });
    } else {
      try { raw = safeStorage().getItem(playerKey); }
      catch (error) { setPlayerState("Local return is unavailable; the public station still works.", "storage"); return null; }
    }
    if (!raw) return null;
    try {
      var record = JSON.parse(raw);
      if (!exactKeys(record, ["registry", "trackId", "position", "volume", "muted", "savedAt"]) ||
          record.registry !== registrySignature ||
          !tracks.some(function (track) { return track.id === record.trackId; }) ||
          !Number.isFinite(record.position) || record.position < 0 ||
          !Number.isFinite(record.volume) || record.volume < 0 || record.volume > 1 ||
          typeof record.muted !== "boolean" ||
          !Number.isFinite(record.savedAt) || Date.now() - record.savedAt > playerTtl) {
        throw new Error("state invalid");
      }
      return record;
    } catch (error) {
      try { safeStorage().removeItem(playerKey); } catch (ignore) {}
      setPlayerState("The saved station state was stale or invalid, so KSVL started fresh.", "fresh");
      return null;
    }
  }

  function restorePlayer() {
    var record = readPlayerState();
    if (!record) return;
    var track = tracks.find(function (item) { return item.id === record.trackId; });
    if (!track) return;
    audio.volume = record.volume;
    volume.value = String(record.volume);
    audio.muted = record.muted;
    muteButton.textContent = record.muted ? "Unmute" : "Mute";
    setTrack(track, [track], false, record.position);
    setPlayerState(track.title + " was restored paused from this device. Press Play to resume.", "restored");
  }

  function mediaFailure(message) {
    document.body.dataset.playing = "false";
    toggle.textContent = "Play";
    retryButton.hidden = false;
    setPlayerState(message || "This admitted track could not play. Nothing was skipped or counted.", "error");
  }

  function nextTrack(delta) {
    if (!queue.length) return;
    var next = (currentIndex + delta + queue.length) % queue.length;
    setTrack(queue[next], queue, true, 0);
  }

  function imageFallback(image, label) {
    image.src = "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">' +
      '<rect width="600" height="600" fill="#06172f"/>' +
      '<circle cx="300" cy="280" r="170" fill="#ff4f9a" stroke="#ffe15a" stroke-width="24"/>' +
      '<circle cx="300" cy="280" r="55" fill="#fff4cf"/>' +
      '<text x="300" y="510" text-anchor="middle" fill="#fff4cf" font-family="Arial" font-size="28" font-weight="700">' +
      label.replace(/[<>&]/g, "") +
      '</text></svg>'
    );
    image.alt = label + " artwork unavailable";
  }

  function renderMixes() {
    mixGrid.replaceChildren();
    mixes.forEach(function (mix) {
      var items = mix.id === "all" ? tracks.slice() : tracks.filter(function (track) { return track.mixes.includes(mix.id); });
      var card = document.createElement("article");
      card.className = "mix-card";
      var heading = document.createElement("h3");
      heading.textContent = mix.label;
      var count = document.createElement("p");
      count.className = "mix-card__count";
      count.textContent = items.length + (items.length === 1 ? " TRACK" : " TRACKS");
      var play = document.createElement("button");
      play.type = "button";
      play.textContent = "Play this mix";
      play.setAttribute("aria-label", "Play " + mix.label + " mix, " + items.length + " tracks");
      play.addEventListener("click", function () { playQueue(items, 0); });
      var list = document.createElement("ul");
      list.className = "track-list";
      items.forEach(function (track) {
        var row = document.createElement("li");
        row.className = "track-row";
        var copy = document.createElement("span");
        var strong = document.createElement("strong");
        strong.textContent = track.title;
        var small = document.createElement("small");
        small.textContent = track.artist + (track.sourceLesson ? " · source available" : " · no source route claimed");
        copy.append(strong, small);
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = "Play";
        button.setAttribute("aria-label", "Play " + track.title + " by " + track.artist);
        button.addEventListener("click", function () { setTrack(track, items, true, 0); });
        row.append(copy, button);
        list.append(row);
      });
      card.append(heading, count, play, list);
      mixGrid.append(card);
    });
    mixGrid.setAttribute("aria-busy", "false");
    catalogFailure.hidden = true;
  }

  function renderBands() {
    bandGrid.replaceChildren();
    bands.forEach(function (band) {
      var items = tracks.filter(function (track) { return track.artist === band.artist; });
      var card = document.createElement("article");
      card.className = "band-card";
      var image = document.createElement("img");
      image.src = band.cover;
      image.alt = band.artist + " album cover";
      image.loading = "lazy";
      image.addEventListener("error", function () { imageFallback(image, band.artist); });
      var copy = document.createElement("div");
      copy.className = "band-card__copy";
      var heading = document.createElement("h3");
      heading.textContent = band.artist;
      var count = document.createElement("p");
      count.textContent = items.length ? items.length + " admitted " + (items.length === 1 ? "track" : "tracks") : "No admitted track in the current registry";
      var play = document.createElement("button");
      play.type = "button";
      play.textContent = items.length ? "Play the band" : "Held";
      play.disabled = !items.length;
      if (items.length) {
        play.setAttribute("aria-label", "Play " + band.artist + ", " + items.length + " tracks");
        play.addEventListener("click", function () { playQueue(items, 0); });
      }
      copy.append(heading, count, play);
      card.append(image, copy);
      bandGrid.append(card);
    });
  }

  function failCatalog(focusRecovery) {
    tracks = [];
    queue = [];
    mixGrid.replaceChildren();
    bandGrid.replaceChildren();
    mixGrid.setAttribute("aria-busy", "false");
    catalogFailure.hidden = false;
    setPlayerState("The registry could not be verified. No track was admitted.", "error");
    if (focusRecovery) catalogRetry.focus();
  }

  function loadRegistry(focusRecovery) {
    var request = ++registryRequest;
    mixGrid.setAttribute("aria-busy", "true");
    catalogFailure.hidden = true;
    Promise.resolve()
      .then(function () {
        if (params.get("catalog") === "malformed") {
          return { tracks: [{ id: "bad", title: "Bad", artist: "Bad", src: "https://outside.example/bad.mp3", mixes: ["all"] }] };
        }
        return fetch(registryUrl, { cache: "no-store" }).then(function (response) {
          if (!response.ok) throw new Error("registry unavailable");
          return response.json();
        });
      })
      .then(function (payload) {
        if (request !== registryRequest) return;
        tracks = validateRegistry(payload);
        registrySignature = signatureFor(tracks);
        renderMixes();
        renderBands();
        restorePlayer();
      })
      .catch(function () {
        if (request !== registryRequest) return;
        failCatalog(focusRecovery === true);
      });
  }

  function renderStickers() {
    stickerGrid.replaceChildren();
    stickers.forEach(function (sticker) {
      var card = document.createElement("article");
      card.className = "sticker-card";
      card.dataset.type = sticker.type;
      card.dataset.stickerId = sticker.id;
      card.setAttribute("aria-selected", selectedStickers.includes(sticker.id) ? "true" : "false");
      var image = document.createElement("img");
      image.src = sticker.image;
      image.alt = "";
      image.loading = "lazy";
      image.addEventListener("error", function () { imageFallback(image, sticker.label); });
      var label = document.createElement("strong");
      label.textContent = sticker.label;
      var button = document.createElement("button");
      button.type = "button";
      if (sticker.type === "achievement") {
        button.textContent = "Held · no grant contract";
        button.setAttribute("aria-label", sticker.label + " is held because KSVL has no listening-achievement grant contract");
        button.disabled = true;
      } else {
        button.textContent = selectedStickers.includes(sticker.id) ? "Remove choice" : "Choose sticker";
        button.setAttribute("aria-label", (selectedStickers.includes(sticker.id) ? "Remove " : "Choose ") + sticker.label + " sticker");
        button.setAttribute("aria-pressed", selectedStickers.includes(sticker.id) ? "true" : "false");
        button.addEventListener("click", function () {
          var index = selectedStickers.indexOf(sticker.id);
          if (index >= 0) selectedStickers.splice(index, 1);
          else if (selectedStickers.length < 3) selectedStickers.push(sticker.id);
          else {
            stickerReceipt.textContent = "Choose no more than three declaration stickers.";
            return;
          }
          renderStickers();
          stickerReceipt.textContent = selectedStickers.length + " of 3 declaration stickers selected. Save to keep them on this device.";
          var next = stickerGrid.querySelector('[data-sticker-id="' + sticker.id + '"] button');
          if (next) next.focus();
        });
      }
      card.append(image, label, button);
      stickerGrid.append(card);
    });
  }

  function validStickerRecord(record) {
    var declarations = stickers.filter(function (sticker) { return sticker.type === "declaration"; }).map(function (sticker) { return sticker.id; });
    return exactKeys(record, ["ids", "savedAt"]) &&
      Array.isArray(record.ids) && record.ids.length <= 3 &&
      new Set(record.ids).size === record.ids.length &&
      record.ids.every(function (id) { return declarations.includes(id); }) &&
      Number.isFinite(record.savedAt);
  }

  function loadStickers() {
    try {
      var raw = safeStorage().getItem(stickerKey);
      if (!raw) return;
      var record = JSON.parse(raw);
      if (!validStickerRecord(record)) throw new Error("sticker record invalid");
      selectedStickers = record.ids.slice();
      stickerReceipt.textContent = selectedStickers.length + " declaration stickers restored from this device.";
    } catch (error) {
      selectedStickers = [];
      try { safeStorage().removeItem(stickerKey); } catch (ignore) {}
      stickerReceipt.textContent = params.get("storage") === "denied" ?
        "Local sticker storage is unavailable. You can still browse the station." :
        "The local sticker record was invalid and has been cleared.";
    }
  }

  function validDraft(record) {
    return exactKeys(record, ["style", "topic", "lyrics", "savedAt"]) &&
      ["anthem", "saint", "activity", "episode", "bside"].includes(record.style) &&
      typeof record.topic === "string" && record.topic.length >= 3 && record.topic.length <= 200 &&
      typeof record.lyrics === "string" && record.lyrics.length <= 1000 &&
      Number.isFinite(record.savedAt) && Date.now() - record.savedAt <= requestTtl;
  }

  function loadDraft() {
    try {
      var raw = safeStorage().getItem(requestKey);
      if (!raw) return;
      var record = JSON.parse(raw);
      if (!validDraft(record)) throw new Error("draft invalid");
      requestStyle.value = record.style;
      requestTopic.value = record.topic;
      requestLyrics.value = record.lyrics;
      requestReceipt.textContent = "A device-only request draft was restored. It has not been submitted or delivered.";
    } catch (error) {
      try { safeStorage().removeItem(requestKey); } catch (ignore) {}
      requestReceipt.textContent = params.get("storage") === "denied" ?
        "Local draft storage is unavailable. Nothing was submitted." :
        "The stale or invalid local draft was removed. Nothing was submitted.";
    }
  }

  document.addEventListener("click", function (event) {
    var control = event.target.closest("[data-action]");
    if (!control) return;
    var action = control.dataset.action;
    if (action === "play-live") {
      if (!tracks.length) { setPlayerState("The registry is not ready. Retry the record crate.", "error"); return; }
      playQueue(tracks, 0);
    } else if (action === "toggle") {
      if (!currentTrack()) {
        if (tracks.length) playQueue(tracks, 0);
        return;
      }
      if (audio.paused) {
        var result = audio.play();
        if (result && typeof result.catch === "function") result.catch(function () { mediaFailure("Playback was blocked. Press Retry when you are ready."); });
      } else {
        audio.pause();
      }
    } else if (action === "previous") nextTrack(-1);
    else if (action === "next") nextTrack(1);
    else if (action === "stop") {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      queue = [];
      currentIndex = -1;
      title.textContent = "Choose a track.";
      context.textContent = "Nothing plays until you press Play.";
      toggle.textContent = "Play";
      retryButton.hidden = true;
      sourceLink.hidden = true;
      document.body.dataset.playing = "false";
      setPlayerState("The station is stopped and its current return state is cleared.", "stopped");
      try { safeStorage().removeItem(playerKey); } catch (ignore) {}
    } else if (action === "mute") {
      audio.muted = !audio.muted;
      muteButton.textContent = audio.muted ? "Unmute" : "Mute";
      savePlayerState();
    } else if (action === "retry") {
      var track = currentTrack();
      if (track) setTrack(track, queue, true, Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    }
  });

  audio.addEventListener("loadedmetadata", function () {
    if (pendingSeek !== null && Number.isFinite(audio.duration)) {
      audio.currentTime = Math.min(pendingSeek, Math.max(0, audio.duration - 0.25));
      pendingSeek = null;
    }
    timeLabel.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
  });

  audio.addEventListener("play", function () {
    var track = currentTrack();
    document.body.dataset.playing = "true";
    toggle.textContent = "Pause";
    toggle.setAttribute("aria-label", "Pause " + (track ? track.title : "current track"));
    retryButton.hidden = true;
    setPlayerState(track ? "Playing " + track.title + "." : "Playing.", "playing");
  });

  audio.addEventListener("pause", function () {
    if (!audio.src || audio.ended || !retryButton.hidden) return;
    document.body.dataset.playing = "false";
    toggle.textContent = "Play";
    var track = currentTrack();
    if (track) {
      toggle.setAttribute("aria-label", "Play " + track.title);
      setPlayerState(track.title + " is paused.", "paused");
      savePlayerState();
    }
  });

  audio.addEventListener("timeupdate", function () {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      seek.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
      timeLabel.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
    }
  });

  audio.addEventListener("ended", function () {
    if (queue.length > 1) nextTrack(1);
    else {
      document.body.dataset.playing = "false";
      setPlayerState("The track ended. Press Play to hear it again.", "ended");
      toggle.textContent = "Play";
    }
  });

  ["error", "stalled", "abort"].forEach(function (name) {
    audio.addEventListener(name, function () { mediaFailure(); });
  });

  seek.addEventListener("input", function () {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
      savePlayerState();
    }
  });

  volume.addEventListener("input", function () {
    audio.volume = Number(volume.value);
    if (audio.volume > 0) audio.muted = false;
    muteButton.textContent = audio.muted ? "Unmute" : "Mute";
    savePlayerState();
  });

  catalogRetry.addEventListener("click", function () { loadRegistry(true); });

  document.getElementById("saveStickers").addEventListener("click", function () {
    try {
      safeStorage().setItem(stickerKey, JSON.stringify({ ids: selectedStickers.slice(), savedAt: Date.now() }));
      stickerReceipt.textContent = selectedStickers.length ?
        selectedStickers.length + " declaration stickers saved on this device. They were not sent to the Closet." :
        "The local sticker choice is empty.";
    } catch (error) {
      stickerReceipt.textContent = "The sticker choice could not be saved. Nothing was sent to an account or Closet.";
    }
  });

  document.getElementById("clearStickers").addEventListener("click", function () {
    try {
      safeStorage().removeItem(stickerKey);
      selectedStickers = [];
      renderStickers();
      stickerReceipt.textContent = "Local sticker choices were cleared from this device.";
      document.getElementById("saveStickers").focus();
    } catch (error) {
      stickerReceipt.textContent = "The local sticker record could not be cleared. No success is claimed.";
    }
  });

  requestForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var topic = requestTopic.value.trim();
    var lyrics = requestLyrics.value.trim();
    if (!requestStyle.value || topic.length < 3 || topic.length > 200 || lyrics.length > 1000) {
      requestReceipt.textContent = "Complete the style and topic limits before saving a local draft.";
      var firstInvalid = !requestStyle.value ? requestStyle : requestTopic;
      firstInvalid.setAttribute("aria-invalid", "true");
      firstInvalid.focus();
      return;
    }
    requestStyle.removeAttribute("aria-invalid");
    requestTopic.removeAttribute("aria-invalid");
    requestLyrics.removeAttribute("aria-invalid");
    try {
      var record = { style: requestStyle.value, topic: topic, lyrics: lyrics, savedAt: Date.now() };
      safeStorage().setItem(requestKey, JSON.stringify(record));
      requestReceipt.textContent = "Draft saved on this device. It was not submitted, delivered, heard, selected or produced.";
    } catch (error) {
      requestReceipt.textContent = "The draft could not be saved. Nothing was submitted or delivered.";
    }
  });

  document.getElementById("deleteDraft").addEventListener("click", function () {
    try {
      safeStorage().removeItem(requestKey);
      requestForm.reset();
      requestReceipt.textContent = "The local draft was deleted from this device.";
      requestStyle.focus();
    } catch (error) {
      requestReceipt.textContent = "The local draft could not be deleted. No success is claimed.";
    }
  });

  window.addEventListener("pagehide", savePlayerState);

  loadStickers();
  renderStickers();
  loadDraft();
  loadRegistry(false);
})();
