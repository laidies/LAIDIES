(function () {
  "use strict";

  const wingMeta = {
    saints: {
      label: "PATRON SAiNTS · pink wing",
      title: "Borrow the move, not the mythology.",
      description: "These are explicit LAiDIES teaching devices inspired by real people or fictional characters. They are not endorsements, biographies, or claims that the source would teach AI this way.",
      searchLabel: "Search PATRON SAiNT cards"
    },
    mavens: {
      label: "MAiVENS · dark sapphire wing",
      title: "Meet the women in the machine's lineage.",
      description: "Each card pairs one bounded, sourced contribution with a clearly labelled LAiDIES lesson. The archive is a route into the work, not a greatest-women ranking.",
      searchLabel: "Search MAiVEN profiles"
    },
    trailblazers: {
      label: "TRAiLBLAZERS · golden amber wing",
      title: "See how present-day AI gets built and used.",
      description: "These current profiles are dated because roles change. “Trailblazer” is LAiDIES' editorial classification, not anyone's job title or endorsement of this page.",
      searchLabel: "Search TRAiLBLAZER profiles"
    }
  };

  const storageKeys = {
    saints: "laidies_saint",
    mavens: "laidies_maven",
    trailblazers: "laidies_builder"
  };
  const picksEnvelopeKey = "laidies_luminaries_v1";
  const pickLabels = {
    saints: "SAiNT",
    mavens: "MAiVEN",
    trailblazers: "TRAiLBLAZER"
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

  function emptyPicksEnvelope() {
    return { version: 1 };
  }

  function readPicksEnvelope() {
    try {
      const value = JSON.parse(localStorage.getItem(picksEnvelopeKey) || "null");
      return value && value.version === 1 ? value : emptyPicksEnvelope();
    } catch (error) {
      return emptyPicksEnvelope();
    }
  }

  function writePicksEnvelope(envelope) {
    const serialized = JSON.stringify(envelope);
    localStorage.setItem(picksEnvelopeKey, serialized);
    if (localStorage.getItem(picksEnvelopeKey) !== serialized) {
      throw new Error("Luminary picks did not round trip");
    }
  }

  function setPersistenceStatus(message, tone) {
    const status = document.getElementById("lumLocalStatus");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", tone === "error");
    status.classList.toggle("is-account", tone === "account");
  }

  function readPicks() {
    const envelope = readPicksEnvelope();
    let migrated = false;
    Object.entries(storageKeys).forEach(([wing, key]) => {
      try {
        const entry = envelope[wing];
        const hasEnvelopeEntry = entry && typeof entry.id === "string";
        const saved = hasEnvelopeEntry
          ? entry.id
          : localStorage.getItem(key) || "";
        state.picks[wing] = profileById(wing, saved) ? saved : "";
        if (state.picks[wing]) localStorage.setItem(key, state.picks[wing]);
        else localStorage.removeItem(key);
        if (!hasEnvelopeEntry && saved) {
          envelope[wing] = {
            id: state.picks[wing],
            updated_at: new Date().toISOString()
          };
          migrated = true;
        }
      } catch (error) {
        setStorageFailure();
      }
    });
    if (migrated) {
      try { writePicksEnvelope(envelope); } catch (error) { setStorageFailure(); }
    }
    updatePickOutputs();
  }

  async function syncAccountPicks() {
    if (!state.storageAvailable) return;
    const continuation = window.LAIDIESResidentContinuationV1;
    const runtimeProvider = window.LAIDIESResidentAccountRuntime;
    if (!continuation || !runtimeProvider) return;
    try {
      const runtime = await runtimeProvider.get();
      const result = await continuation.syncWith(runtime);
      readPicks();
      if (state.data) render();
      const hasPicks = Object.values(state.picks).some(Boolean);
      setPersistenceStatus(
        result.state === "account-backed"
          ? hasPicks
            ? "Saved to My Closet and kept with your private Resident Card account, so these picks can return on your other devices."
            : "You’re signed in. When you choose, your picks will appear in My Closet and stay with your private Resident Card account across devices."
          : hasPicks
            ? "Saved to My Closet on this device. Sign in with your Resident Card to keep these picks with your private account and restore them on other devices."
            : "Your picks save in this browser right away. Sign in with your Resident Card to keep them with your private account and restore them on your other devices.",
        result.state === "account-backed" ? "account" : "local"
      );
    } catch (error) {
      setPersistenceStatus(
        "Saved to My Closet on this device. Account sync could not be confirmed, so no cross-device claim has been made.",
        "error"
      );
    }
  }

  function writePick(wing, id) {
    if (!state.storageAvailable) return;
    const next = state.picks[wing] === id ? "" : id;
    try {
      const envelope = readPicksEnvelope();
      envelope[wing] = { id: next, updated_at: new Date().toISOString() };
      writePicksEnvelope(envelope);
      if (next) localStorage.setItem(storageKeys[wing], next);
      else localStorage.removeItem(storageKeys[wing]);
      const roundTrip = localStorage.getItem(storageKeys[wing]) || "";
      if (roundTrip !== next) throw new Error("local storage round trip failed");
      state.picks[wing] = next;
      updatePickOutputs();
      render();
      setPersistenceStatus(
        "Saved to My Closet on this device. Checking whether your Resident Card account can keep it across devices…",
        "local"
      );
      syncAccountPicks();
    } catch (error) {
      setStorageFailure("This browser could not save that local pick. Nothing was claimed as saved; the profile cards remain available.");
      render();
    }
  }

  function updatePickOutputs() {
    document.querySelectorAll("[data-pick-output]").forEach((output) => {
      const wing = output.getAttribute("data-pick-output");
      const profile = profileById(wing, state.picks[wing]);
      output.textContent = profile ? profile.name : "No personal pick yet";
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
    pick.textContent = picked ? "Chosen · remove" : "Choose this " + pickLabels[state.wing];
    pick.setAttribute("aria-label", picked
      ? "Remove " + profile.name + " from My Luminaries"
      : "Choose " + profile.name + " as my " + pickLabels[state.wing]);
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
    document.getElementById("lumSearchLabel").textContent = meta.searchLabel;
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
        window.setTimeout(syncAccountPicks, 0);
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
    if (event.key === picksEnvelopeKey && state.data) {
      readPicks();
      render();
      return;
    }
    const wing = Object.keys(storageKeys).find((name) => storageKeys[name] === event.key);
    if (!wing || !state.data) return;
    state.picks[wing] = profileById(wing, event.newValue || "") ? (event.newValue || "") : "";
    updatePickOutputs();
    render();
  });
  window.addEventListener("hashchange", applyHash);
  window.addEventListener("laidies:continuation-ready", syncAccountPicks);
  window.addEventListener("laidies:continuation-change", () => {
    readPicks();
    if (state.data) render();
  });

  loadProfiles(0);
})();
