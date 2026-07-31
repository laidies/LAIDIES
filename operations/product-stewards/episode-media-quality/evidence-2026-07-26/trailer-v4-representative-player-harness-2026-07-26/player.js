const EXPECTED = Object.freeze({
  media: Object.freeze({
    url: "../../../../../assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v4-clock-successor-review-1920.mp4",
    sha256: "760dbbc7daff1fb299074e7e8d03575635b77ab9c56ec8dece4fc99d26d68934",
    mime: "video/mp4"
  }),
  captions: Object.freeze({
    url: "../../../../../assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt",
    sha256: "5bc151d7d0aa611f42aed427b61dcc9c55c5320b368d31a9285a64ab31255b8d",
    mime: "text/vtt"
  })
});

const elements = {
  video: document.querySelector("#trailer"),
  bindingStatus: document.querySelector("#binding-status"),
  lockedState: document.querySelector("#locked-state"),
  retry: document.querySelector("#retry-button"),
  play: document.querySelector("#play-toggle"),
  playLabel: document.querySelector("#play-label"),
  seekBack: document.querySelector("#seek-back"),
  seekForward: document.querySelector("#seek-forward"),
  captions: document.querySelector("#caption-toggle"),
  captionButtonState: document.querySelector("#caption-button-state"),
  captionStatus: document.querySelector("#caption-status"),
  captionRail: document.querySelector("#caption-rail"),
  currentTime: document.querySelector("#current-time"),
  duration: document.querySelector("#duration")
};

const state = {
  ready: false,
  captionsOn: true,
  cues: [],
  mediaObjectUrl: null,
  captionObjectUrl: null,
  currentCueKey: "",
  run: 0
};

function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256(buffer) {
  return bytesToHex(await crypto.subtle.digest("SHA-256", buffer));
}

function clockToSeconds(value) {
  const parts = value.trim().replace(",", ".").split(":").map(Number);
  return parts.length === 3
    ? (parts[0] * 3600) + (parts[1] * 60) + parts[2]
    : (parts[0] * 60) + parts[1];
}

export function sanitizeWebVttText(value) {
  const holder = document.createElement("div");
  holder.innerHTML = value
    .replace(/<v(?:\.[^ >]+)*(?:\s+[^>]*)?>/gi, "")
    .replace(/<\/v>/gi, "")
    .replace(/<(?!\/?(?:b|i|u|ruby|rt|c)(?:\.[^ >]+)*\s*\/?>)[^>]*>/gi, "");
  return (holder.textContent || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

export function parseWebVtt(vtt) {
  const normalized = vtt.replace(/\r\n?/g, "\n");
  const blocks = normalized.split(/\n{2,}/);
  const cues = [];
  for (const block of blocks) {
    const lines = block.split("\n");
    const timingIndex = lines.findIndex(line => line.includes("-->"));
    if (timingIndex === -1) continue;
    const timing = lines[timingIndex].match(/^\s*(\d{2}:\d{2}:\d{2}[.,]\d{3})\s+-->\s+(\d{2}:\d{2}:\d{2}[.,]\d{3})/);
    if (!timing) continue;
    const text = sanitizeWebVttText(lines.slice(timingIndex + 1).join("\n"));
    if (text) cues.push({ start: clockToSeconds(timing[1]), end: clockToSeconds(timing[2]), text });
  }
  return cues;
}

function formatTime(value) {
  if (!Number.isFinite(value)) return "—";
  const total = Math.max(0, Math.floor(value));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function setControlsEnabled(enabled) {
  [elements.play, elements.seekBack, elements.seekForward, elements.captions]
    .forEach(button => { button.disabled = !enabled; });
}

function setCaptionPresentation() {
  elements.captions.setAttribute("aria-pressed", String(state.captionsOn));
  elements.captionButtonState.textContent = state.captionsOn ? "on" : "off";
  elements.captionStatus.textContent = state.captionsOn
    ? "Captions are on. Verified external VTT is rendered below the picture."
    : "Captions are off.";
  elements.captionRail.dataset.disabled = String(!state.captionsOn);
  if (!state.captionsOn) {
    elements.captionRail.textContent = "Captions off";
    state.currentCueKey = "";
  } else {
    updateCaptionRail();
  }
}

function updateCaptionRail() {
  if (!state.captionsOn || !state.ready) return;
  const active = state.cues.filter(cue => elements.video.currentTime >= cue.start && elements.video.currentTime < cue.end);
  const key = active.map(cue => `${cue.start}:${cue.text}`).join("|");
  if (key === state.currentCueKey) return;
  state.currentCueKey = key;
  elements.captionRail.textContent = active.length ? active.map(cue => cue.text).join("\n") : "No spoken caption at this moment.";
}

function cleanupObjectUrls() {
  if (state.mediaObjectUrl) URL.revokeObjectURL(state.mediaObjectUrl);
  if (state.captionObjectUrl) URL.revokeObjectURL(state.captionObjectUrl);
  state.mediaObjectUrl = null;
  state.captionObjectUrl = null;
}

function failClosed(message) {
  state.ready = false;
  elements.video.pause();
  elements.video.removeAttribute("src");
  elements.video.querySelectorAll("track").forEach(track => track.remove());
  elements.video.load();
  cleanupObjectUrls();
  setControlsEnabled(false);
  elements.lockedState.hidden = false;
  elements.bindingStatus.dataset.state = "fail";
  elements.bindingStatus.textContent = `${message} Playback remains locked.`;
  elements.captionStatus.textContent = "Captions unavailable because the frozen-input preflight did not pass.";
  elements.captionRail.dataset.disabled = "true";
  elements.captionRail.textContent = "Verified captions unavailable. Retry the frozen-input check.";
  elements.retry.hidden = false;
}

async function fetchExact(input, label) {
  const response = await fetch(input.url, { cache: "no-store", credentials: "same-origin" });
  if (!response.ok) throw new Error(`${label} request failed with HTTP ${response.status}.`);
  const bytes = await response.arrayBuffer();
  const actual = await sha256(bytes);
  if (actual !== input.sha256) {
    throw new Error(`${label} hash mismatch: expected ${input.sha256}, received ${actual}.`);
  }
  return bytes;
}

async function preflight() {
  const run = ++state.run;
  failClosed("Verification in progress.");
  elements.retry.hidden = true;
  elements.bindingStatus.dataset.state = "";
  elements.bindingStatus.textContent = "Requesting and hashing the exact MP4 and external VTT. Playback is locked during preflight.";

  try {
    const [mediaBytes, captionBytes] = await Promise.all([
      fetchExact(EXPECTED.media, "MP4"),
      fetchExact(EXPECTED.captions, "VTT")
    ]);
    if (run !== state.run) return;

    const vttText = new TextDecoder("utf-8", { fatal: true }).decode(captionBytes);
    const cues = parseWebVtt(vttText);
    if (cues.length !== 207) throw new Error(`VTT cue-count mismatch: expected 207, parsed ${cues.length}.`);
    if (cues.some(cue => /<\s*\/?\s*v(?:\s|>)/i.test(cue.text))) {
      throw new Error("Sanitized caption text still contains WebVTT voice markup.");
    }

    state.mediaObjectUrl = URL.createObjectURL(new Blob([mediaBytes], { type: EXPECTED.media.mime }));
    state.captionObjectUrl = URL.createObjectURL(new Blob([captionBytes], { type: EXPECTED.captions.mime }));
    state.cues = cues;

    const track = document.createElement("track");
    track.kind = "captions";
    track.label = "English";
    track.srclang = "en";
    track.src = state.captionObjectUrl;
    track.default = true;
    elements.video.append(track);
    elements.video.src = state.mediaObjectUrl;
    elements.video.load();

    const failureMode = new URLSearchParams(location.search).get("simulate");
    if (failureMode === "media") throw new Error("Simulated media failure for deterministic recovery proof.");
    if (failureMode === "captions") throw new Error("Simulated caption failure for deterministic recovery proof.");

    state.ready = true;
    state.captionsOn = true;
    elements.lockedState.hidden = true;
    setControlsEnabled(true);
    elements.bindingStatus.dataset.state = "pass";
    elements.bindingStatus.textContent = `PASS — exact MP4 and VTT SHA-256 verified; ${cues.length} sanitized caption cues loaded.`;
    elements.retry.hidden = true;
    setCaptionPresentation();

    track.addEventListener("load", () => {
      if (track.track) track.track.mode = "hidden";
    }, { once: true });
    track.addEventListener("error", () => {
      elements.captionStatus.textContent = "Native track request failed; verified custom caption rail remains available.";
    });
  } catch (error) {
    if (run === state.run) failClosed(error instanceof Error ? error.message : "Unknown preflight failure.");
  }
}

function togglePlayback() {
  if (!state.ready) return;
  if (elements.video.paused) {
    elements.video.play().catch(() => {
      elements.bindingStatus.dataset.state = "fail";
      elements.bindingStatus.textContent = "Playback could not start. Use Retry verification; no autoplay was attempted.";
      elements.retry.hidden = false;
    });
  } else {
    elements.video.pause();
  }
}

function seekBy(delta) {
  if (!state.ready) return;
  const ceiling = Number.isFinite(elements.video.duration) ? elements.video.duration : Infinity;
  elements.video.currentTime = Math.min(ceiling, Math.max(0, elements.video.currentTime + delta));
  updateCaptionRail();
}

elements.play.addEventListener("click", togglePlayback);
elements.seekBack.addEventListener("click", () => seekBy(-10));
elements.seekForward.addEventListener("click", () => seekBy(10));
elements.captions.addEventListener("click", () => {
  state.captionsOn = !state.captionsOn;
  setCaptionPresentation();
});
elements.retry.addEventListener("click", () => {
  const url = new URL(location.href);
  url.searchParams.delete("simulate");
  history.replaceState(null, "", url);
  preflight();
});

elements.video.addEventListener("loadedmetadata", () => {
  elements.duration.textContent = formatTime(elements.video.duration);
});
elements.video.addEventListener("timeupdate", () => {
  elements.currentTime.textContent = formatTime(elements.video.currentTime);
  updateCaptionRail();
});
elements.video.addEventListener("play", () => {
  elements.playLabel.textContent = "Pause";
  elements.play.querySelector("[aria-hidden]").textContent = "❚❚";
});
elements.video.addEventListener("pause", () => {
  elements.playLabel.textContent = "Play";
  elements.play.querySelector("[aria-hidden]").textContent = "▶";
});
elements.video.addEventListener("error", () => {
  if (state.ready) failClosed("The verified media failed during playback.");
});

document.addEventListener("keydown", event => {
  if (!state.ready || event.altKey || event.ctrlKey || event.metaKey) return;
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
  const key = event.key.toLowerCase();
  if (key === " " || key === "k") {
    event.preventDefault();
    togglePlayback();
  } else if (key === "arrowleft" || key === "j") {
    event.preventDefault();
    seekBy(-10);
  } else if (key === "arrowright" || key === "l") {
    event.preventDefault();
    seekBy(10);
  } else if (key === "c") {
    event.preventDefault();
    elements.captions.click();
  }
});

window.addEventListener("beforeunload", cleanupObjectUrls);
preflight();
