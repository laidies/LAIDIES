(function () {
  "use strict";

  const wingMeta = {
    saints: {
      label: "PATRON SAiNTS · pink wing",
      title: "Borrow the move, not the mythology.",
      description: "These are explicit LAiDIES teaching devices inspired by real people or fictional characters. They are not endorsements, biographies, or claims that the source would teach AI this way."
    },
    mavens: {
      label: "MAiVENS · dark sapphire wing",
      title: "Meet the women in the machine's lineage.",
      description: "Each card pairs one bounded, sourced contribution with a clearly labelled LAiDIES lesson. The archive is a route into the work, not a greatest-women ranking."
    },
    trailblazers: {
      label: "TRAiLBLAZERS · golden amber wing",
      title: "See how present-day AI gets built and used.",
      description: "These current profiles are dated because roles change. “Trailblazer” is LAiDIES' editorial classification, not anyone's job title or endorsement of this page."
    }
  };

  const storageKeys = {
    saints: "laidies_saint",
    mavens: "laidies_maven",
    trailblazers: "laidies_builder"
  };

  const state = {
    data: null,
    wing: "saints",
    query: "",
    picks: { saints: "", mavens: "", trailblazers: "" },
    storageAvailable: true,
    playlist: false,
    playlistIndex: -1,
    activeSongId: ""
  };

  const grid = document.getElementById("lumGrid");
  const panel = document.getElementById("lumPanel");
  const search = document.getElementById("lumSearch");
  const resultStatus = document.getElementById("lumResultStatus");
  const audio = document.getElementById("lumAudio");
  const audioStatus = document.getElementById("lumAudioStatus");
  const playlistButton = document.getElementById("lumPlaylist");

  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function profileById(wing, id) {
    return state.data && (state.data[wing] || []).find((profile) => profile.id === id);
  }

  function validWing(value) {
    return Object.prototype.hasOwnProperty.call(wingMeta, value);
  }

  function setStorageFailure(message) {
    state.storageAvailable = false;
    const status = document.getElementById("lumLocalStatus");
    status.classList.add("is-error");
    status.textContent = message || "This browser blocked local storage. Your picks cannot be saved, so the page will not pretend they persist.";
  }

  function readPicks() {
    Object.entries(storageKeys).forEach(([wing, key]) => {
      try {
        const saved = localStorage.getItem(key) || "";
        state.picks[wing] = profileById(wing, saved) ? saved : "";
        if (saved && !state.picks[wing]) localStorage.removeItem(key);
      } catch (error) {
        setStorageFailure();
      }
    });
    updatePickOutputs();
  }

  function writePick(wing, id) {
    if (!state.storageAvailable) return;
    const next = state.picks[wing] === id ? "" : id;
    try {
      if (next) localStorage.setItem(storageKeys[wing], next);
      else localStorage.removeItem(storageKeys[wing]);
      const roundTrip = localStorage.getItem(storageKeys[wing]) || "";
      if (roundTrip !== next) throw new Error("local storage round trip failed");
      state.picks[wing] = next;
      updatePickOutputs();
      render();
    } catch (error) {
      setStorageFailure("This browser could not save that local pick. Nothing was claimed as saved; the profile cards remain available.");
      render();
    }
  }

  function updatePickOutputs() {
    document.querySelectorAll("[data-pick-output]").forEach((output) => {
      const wing = output.getAttribute("data-pick-output");
      const profile = profileById(wing, state.picks[wing]);
      output.textContent = profile ? profile.name : "No candle lit";
    });
  }

  function makeLink(link) {
    const anchor = textElement("a", "lum-card__link", link.label + " ↗");
    let url;
    try { url = new URL(link.url, window.location.origin); } catch (error) { return null; }
    if (url.protocol !== "https:" && url.origin !== window.location.origin) return null;
    anchor.href = url.href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    return anchor;
  }

  function hasPlayableSong(profile) {
    return Boolean(profile && profile.song && profile.songStatus !== "deferred");
  }

  function playableSaintSongs() {
    return state.data ? state.data.saints.filter(hasPlayableSong) : [];
  }

  function updateSongButtons() {
    document.querySelectorAll("[data-song-id]").forEach((button) => {
      const playing = button.getAttribute("data-song-id") === state.activeSongId && !audio.paused;
      button.classList.toggle("is-playing", playing);
      button.setAttribute("aria-pressed", playing ? "true" : "false");
      const label = button.querySelector("span:last-child");
      if (label) label.textContent = playing ? "Pause song" : button.getAttribute("data-song-label");
    });
    playlistButton.classList.toggle("is-playing", state.playlist);
    playlistButton.setAttribute("aria-pressed", state.playlist ? "true" : "false");
    const songCount = playableSaintSongs().length;
    playlistButton.querySelector("span:last-child").textContent = state.playlist
      ? "Stop the songs"
      : "Play all " + songCount + " available songs";
  }

  function showAudioStatus(message, isError) {
    audioStatus.hidden = false;
    audioStatus.classList.toggle("is-error", Boolean(isError));
    audioStatus.textContent = message;
  }

  function hideAudioStatus() {
    audioStatus.hidden = true;
    audioStatus.textContent = "";
    audioStatus.classList.remove("is-error");
  }

  function stopAudio() {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    state.activeSongId = "";
    state.playlist = false;
    state.playlistIndex = -1;
    hideAudioStatus();
    updateSongButtons();
  }

  function playProfileSong(profile, fromPlaylist) {
    if (!hasPlayableSong(profile)) return;
    if (!fromPlaylist && state.activeSongId === profile.id && !audio.paused) {
      audio.pause();
      state.activeSongId = "";
      state.playlist = false;
      state.playlistIndex = -1;
      showAudioStatus("Paused " + profile.name + ".", false);
      updateSongButtons();
      return;
    }
    state.activeSongId = profile.id;
    audio.src = profile.song;
    audio.play().then(() => {
      showAudioStatus("Now playing: " + profile.name + " — " + profile.songLabel + ".", false);
      updateSongButtons();
    }).catch(() => {
      state.activeSongId = "";
      state.playlist = false;
      state.playlistIndex = -1;
      showAudioStatus("The song for " + profile.name + " could not play. The profile and lesson are still available.", true);
      updateSongButtons();
    });
  }

  function playPlaylistIndex(index) {
    const songs = playableSaintSongs();
    if (!state.playlist || index >= songs.length) {
      stopAudio();
      return;
    }
    state.playlistIndex = index;
    playProfileSong(songs[index], true);
  }

  function makeCard(profile) {
    const article = document.createElement("article");
    article.className = "lum-card lum-card--" + state.wing + (profile.antiSaint ? " lum-card--anti" : "");
    article.id = "profile-" + profile.id;
    article.dataset.profileId = profile.id;
    article.dataset.claimId = state.wing.slice(0, -1) + "-" + profile.id + "-card";

    const figure = document.createElement("figure");
    figure.className = "lum-card__portrait";
    const image = document.createElement("img");
    image.src = profile.image;
    image.alt = "Painterly waist-up portrait of " + profile.name;
    image.loading = "lazy";
    image.decoding = "async";
    figure.appendChild(image);
    if (profile.antiSaint) figure.appendChild(textElement("figcaption", "lum-card__warning", "ANTI-SAINT · confidence is not evidence"));
    article.appendChild(figure);

    const body = document.createElement("div");
    body.className = "lum-card__body";
    body.appendChild(textElement("p", "lum-card__role", profile.role));
    body.appendChild(textElement("h3", "lum-card__name", profile.name));
    if (profile.archetype) body.appendChild(textElement("p", "lum-card__archetype", profile.archetype));
    body.appendChild(textElement("p", "lum-card__about", profile.about));

    const lesson = textElement("p", "lum-card__lesson", profile.lesson);
    lesson.prepend(textElement("strong", "", "LAiDIES lesson: "));
    body.appendChild(lesson);
    if (profile.freshness) body.appendChild(textElement("p", "lum-card__freshness", profile.freshness));

    const actions = document.createElement("div");
    actions.className = "lum-card__actions";
    (profile.links || []).forEach((link) => {
      const anchor = makeLink(link);
      if (anchor) actions.appendChild(anchor);
    });

    if (hasPlayableSong(profile)) {
      const song = document.createElement("button");
      song.type = "button";
      song.className = "lum-card__song";
      song.dataset.songId = profile.id;
      song.dataset.songLabel = "♪ " + profile.songLabel;
      song.setAttribute("aria-pressed", "false");
      song.append(textElement("span", "", "♪"), textElement("span", "", profile.songLabel));
      song.addEventListener("click", () => playProfileSong(profile, false));
      actions.appendChild(song);
    } else if (profile.songStatus === "deferred") {
      const songStatus = textElement("p", "lum-card__song-status", "♪ Song coming later");
      songStatus.id = "song-status-" + profile.id;
      actions.appendChild(songStatus);
    }

    const pick = document.createElement("button");
    pick.type = "button";
    pick.className = "lum-card__pick";
    const picked = state.picks[state.wing] === profile.id;
    pick.setAttribute("aria-pressed", picked ? "true" : "false");
    pick.disabled = !state.storageAvailable;
    pick.textContent = picked ? "Candle lit · clear" : "Light this local candle";
    pick.addEventListener("click", () => writePick(state.wing, profile.id));
    actions.appendChild(pick);

    body.appendChild(actions);
    article.appendChild(body);
    return article;
  }

  function render() {
    if (!state.data) return;
    const meta = wingMeta[state.wing];
    document.getElementById("lumWingKicker").textContent = meta.label;
    document.getElementById("lumWingTitle").textContent = meta.title;
    document.getElementById("lumWingDescription").textContent = meta.description;
    panel.setAttribute("aria-labelledby", "tab-" + state.wing);
    document.body.dataset.lumWing = state.wing;
    playlistButton.hidden = state.wing !== "saints";

    const query = state.query.trim().toLocaleLowerCase();
    const profiles = state.data[state.wing].filter((profile) => {
      if (!query) return true;
      return [profile.name, profile.role, profile.archetype, profile.about, profile.lesson]
        .filter(Boolean).join(" ").toLocaleLowerCase().includes(query);
    });

    const fragment = document.createDocumentFragment();
    profiles.forEach((profile) => fragment.appendChild(makeCard(profile)));
    grid.replaceChildren(fragment);
    const itemNoun = state.wing === "saints" ? "cards" : "profiles";
    resultStatus.textContent = profiles.length + " of " + state.data[state.wing].length + " " + itemNoun + " shown" + (query ? " for “" + state.query.trim() + "”." : ".");
    updateSongButtons();
  }

  function setWing(wing, options) {
    if (!validWing(wing)) return;
    const shouldFocus = options && options.focus;
    const leavingSaints = state.wing === "saints" && wing !== "saints";
    state.wing = wing;
    if (leavingSaints) stopAudio();
    state.query = "";
    search.value = "";
    document.querySelectorAll("[role=tab][data-wing]").forEach((tab) => {
      const active = tab.dataset.wing === wing;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
      if (active && shouldFocus) tab.focus();
    });
    if (window.location.hash !== "#" + wing) history.replaceState(null, "", "#" + wing);
    render();
  }

  function wingForProfileId(id) {
    return Object.keys(wingMeta).find((wing) => profileById(wing, id)) || "";
  }

  function applyHash() {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (validWing(hash)) {
      setWing(hash);
      return;
    }
    const wing = wingForProfileId(hash);
    if (wing) {
      setWing(wing);
      requestAnimationFrame(() => document.getElementById("profile-" + hash)?.scrollIntoView({ block: "center" }));
    }
  }

  function showLoadFailure() {
    playlistButton.hidden = true;
    resultStatus.textContent = "We couldn’t open the LUMINAiRY just now.";
    resultStatus.classList.add("is-error");

    const retryState = document.createElement("div");
    retryState.className = "lum-retry-state";
    retryState.appendChild(textElement("p", "", "Nothing has been changed. Try again when you’re ready."));
    const retry = textElement("button", "lum-retry", "Try again");
    retry.type = "button";
    retry.addEventListener("click", () => loadProfiles(0));
    retryState.appendChild(retry);
    grid.replaceChildren(retryState);
  }

  function loadProfiles(attempt) {
    playlistButton.hidden = true;
    resultStatus.textContent = attempt ? "Trying once more…" : "Opening the LUMINAiRY…";
    resultStatus.classList.remove("is-error");
    grid.replaceChildren();

    fetch("/content/luminairy-profiles.json", { credentials: "same-origin", cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("profile request returned " + response.status);
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.saints) || !Array.isArray(data.mavens) || !Array.isArray(data.trailblazers)) throw new Error("profile file shape is invalid");
        if (!window.LAIDIES_LUMINAIRY_CLAIM_GATE?.admit) throw new Error("editorial admission gate is unavailable");
        return window.LAIDIES_LUMINAIRY_CLAIM_GATE.admit(data);
      })
      .then((data) => {
        state.data = data;
        readPicks();
        applyHash();
        render();
      })
      .catch(() => {
        if (attempt === 0) {
          window.setTimeout(() => loadProfiles(1), 250);
          return;
        }
        showLoadFailure();
      });
  }

  document.querySelectorAll("[role=tab][data-wing]").forEach((tab) => {
    tab.addEventListener("click", () => setWing(tab.dataset.wing));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const tabs = Array.from(document.querySelectorAll("[role=tab][data-wing]"));
      let index = tabs.indexOf(tab);
      if (event.key === "ArrowRight") index = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") index = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") index = 0;
      if (event.key === "End") index = tabs.length - 1;
      setWing(tabs[index].dataset.wing, { focus: true });
    });
  });

  search.addEventListener("input", () => {
    state.query = search.value;
    render();
  });

  playlistButton.setAttribute("aria-pressed", "false");
  playlistButton.addEventListener("click", () => {
    if (state.playlist) {
      stopAudio();
      return;
    }
    state.playlist = true;
    state.playlistIndex = 0;
    playPlaylistIndex(0);
    updateSongButtons();
  });

  audio.addEventListener("ended", () => {
    if (state.playlist) playPlaylistIndex(state.playlistIndex + 1);
    else {
      state.activeSongId = "";
      updateSongButtons();
    }
  });
  audio.addEventListener("error", () => {
    const profile = profileById("saints", state.activeSongId);
    state.activeSongId = "";
    state.playlist = false;
    state.playlistIndex = -1;
    showAudioStatus("The song" + (profile ? " for " + profile.name : "") + " could not load. The readable profile remains available.", true);
    updateSongButtons();
  });

  window.addEventListener("storage", (event) => {
    const wing = Object.keys(storageKeys).find((name) => storageKeys[name] === event.key);
    if (!wing || !state.data) return;
    state.picks[wing] = profileById(wing, event.newValue || "") ? (event.newValue || "") : "";
    updatePickOutputs();
    render();
  });
  window.addEventListener("hashchange", applyHash);

  loadProfiles(0);
})();
