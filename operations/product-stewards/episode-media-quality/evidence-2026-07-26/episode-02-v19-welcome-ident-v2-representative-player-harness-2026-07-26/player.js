import { BINDING, keyAction, railText, reducedMotionPolicy, stripVttMarkup, tailState } from './harness-core.mjs';

const film = document.querySelector('#film');
const bindingState = document.querySelector('#binding-state');
const retry = document.querySelector('#retry');
const play = document.querySelector('#play');
const back = document.querySelector('#back');
const forward = document.querySelector('#forward');
const captions = document.querySelector('#captions');
const captionStatus = document.querySelector('#caption-status');
const rail = document.querySelector('#caption-rail');
const telemetry = document.querySelector('#telemetry');
const params = new URLSearchParams(location.search);
let trackNode;
let track;
let captionState = 'loading';
let captionsEnabled = true;
let retryCount = 0;
let mediaState = 'unbound';

function activeCaption() {
  if (!track?.activeCues) return '';
  return Array.from(track.activeCues).map((cue) => {
    if (typeof cue.getCueAsHTML === 'function') return (cue.getCueAsHTML().textContent || '').replace(/\s+/g, ' ').trim();
    return stripVttMarkup(cue.text);
  }).filter(Boolean).join(' ');
}

function updateRail() {
  rail.textContent = railText({ enabled: captionsEnabled, state: captionState, activeText: activeCaption(), currentTime: film.currentTime, duration: film.duration });
}

function snapshot(event) {
  telemetry.value = [
    `event=${event}`,
    `expectedMedia=${BINDING.mediaPath}`,
    `currentMedia=${film.currentSrc || 'unbound'}`,
    `expectedMediaSha256=${BINDING.mediaSha256}`,
    `expectedVtt=${BINDING.vttPath}`,
    `currentVtt=${trackNode?.src || 'unbound'}`,
    `expectedVttSha256=${BINDING.vttSha256}`,
    `retryCount=${retryCount}`,
    `mediaState=${mediaState}`,
    `captionState=${captionState}`,
    `captionMode=${track?.mode || 'missing'}`,
    `currentTime=${Number.isFinite(film.currentTime) ? film.currentTime.toFixed(3) : '0.000'}`,
    `duration=${Number.isFinite(film.duration) ? film.duration.toFixed(6) : 'loading'}`,
    `playbackRate=${film.playbackRate}`,
    `paused=${film.paused}`,
    `muted=${film.muted}`,
    `volume=${film.volume}`,
    `readyState=${film.readyState}`,
    `reducedMotion=${matchMedia('(prefers-reduced-motion: reduce)').matches}`,
    `reducedMotionPolicy=${JSON.stringify(reducedMotionPolicy(matchMedia('(prefers-reduced-motion: reduce)').matches))}`,
    `tailState=${tailState(film.currentTime, film.duration)}`
  ].join('\n');
}

function enableControls(enabled) {
  for (const control of [play, back, forward, captions]) control.disabled = !enabled;
}

function showMediaError() {
  mediaState = 'error';
  bindingState.textContent = 'Media failed. Playback remains unavailable until exact-source retry.';
  retry.hidden = false;
  enableControls(false);
  snapshot('media-error');
}

function setCaptionMode(enabled) {
  captionsEnabled = enabled;
  if (track) track.mode = enabled ? 'hidden' : 'disabled';
  captions.setAttribute('aria-pressed', String(enabled));
  captions.textContent = enabled ? 'Captions on' : 'Captions off';
  captionStatus.textContent = enabled ? `External captions ${captionState}.` : 'External captions off.';
  updateRail();
  snapshot('caption-mode');
}

function bindExactSource(useFailure = false, failCaptions = false) {
  mediaState = 'loading';
  captionState = 'loading';
  film.replaceChildren();
  const source = document.createElement('source');
  source.type = 'video/mp4';
  source.src = useFailure ? BINDING.missingMedia : BINDING.mediaPath;
  source.addEventListener('error', showMediaError, { once: true });
  trackNode = document.createElement('track');
  trackNode.kind = 'captions';
  trackNode.srclang = 'en';
  trackNode.label = 'English';
  trackNode.src = failCaptions ? BINDING.missingVtt : BINDING.vttPath;
  film.append(source, trackNode);
  film.load();
  track = film.textTracks[0];
  track.mode = 'hidden';
  track.addEventListener('cuechange', () => { updateRail(); snapshot('cuechange'); });
  trackNode.addEventListener('load', () => { captionState = 'loaded'; setCaptionMode(captionsEnabled); snapshot('caption-load'); });
  trackNode.addEventListener('error', () => { captionState = 'error'; updateRail(); snapshot('caption-error'); });
  bindingState.textContent = `Bound locally to exact declared source identity. Retry count ${retryCount}.`;
  snapshot('source-bound');
}

async function togglePlay() {
  film.playbackRate = 1;
  film.muted = false;
  film.volume = 1;
  if (film.paused) {
    await film.play();
    play.textContent = 'Pause';
  } else {
    film.pause();
    play.textContent = 'Play at normal speed';
  }
  snapshot('play-toggle');
}

function seekBy(delta) {
  if (!Number.isFinite(film.duration)) return;
  film.currentTime = Math.max(0, Math.min(film.duration, film.currentTime + delta));
  snapshot('seek');
}

film.addEventListener('loadedmetadata', () => {
  mediaState = 'ready';
  enableControls(true);
  retry.hidden = true;
  snapshot('loadedmetadata');
});
film.addEventListener('error', showMediaError);
film.addEventListener('timeupdate', () => { updateRail(); snapshot('timeupdate'); });
film.addEventListener('ended', () => { play.textContent = 'Play at normal speed'; updateRail(); snapshot('ended'); });
play.addEventListener('click', () => togglePlay().catch(() => snapshot('play-error')));
back.addEventListener('click', () => seekBy(-10));
forward.addEventListener('click', () => seekBy(10));
captions.addEventListener('click', () => setCaptionMode(!captionsEnabled));
retry.addEventListener('click', () => {
  retryCount += 1;
  retry.hidden = true;
  bindExactSource(false, params.get('failCaptions') === '1');
});
document.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement) return;
  const action = keyAction({ key: event.code === 'Space' ? 'Space' : event.key, currentTime: film.currentTime, duration: film.duration, paused: film.paused });
  if (!action.handled) return;
  event.preventDefault();
  if (action.action === 'toggle-play') togglePlay().catch(() => snapshot('play-error'));
  else if (action.action === 'toggle-captions') setCaptionMode(!captionsEnabled);
  else { film.currentTime = action.currentTime; snapshot(action.action); }
});

updateRail();
snapshot('initialized');
bindExactSource(params.get('failMedia') === '1', params.get('failCaptions') === '1');
