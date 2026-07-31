export const FROZEN = Object.freeze({
  mp4: '/assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4',
  vtt: '/assets/captions/episode-02.vtt',
  missingMp4: '/assets/video/__missing-episode-02.mp4',
  missingVtt: '/assets/captions/__missing-episode-02.vtt',
  tailStart: 986.67
});

export function initialCaptionState(failCaptions = false) {
  return Object.freeze({
    captionsEnabled: true,
    trackMode: 'showing',
    captionLoadState: 'loading',
    vttRequest: failCaptions ? FROZEN.missingVtt : FROZEN.vtt,
    buttonLabel: 'Captions on',
    ariaPressed: 'true'
  });
}

export function stripWebVttMarkup(raw) {
  return String(raw)
    .replace(/<v(?:\s+[^>]*)?>/gi, '')
    .replace(/<\/v>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function finalTailState(currentTime, duration) {
  return Number.isFinite(duration) && currentTime >= FROZEN.tailStart && currentTime < duration
    ? 'caption-complete-audio-continues' : 'not-tail';
}

export function captionRailLabel({ captionsEnabled, captionLoadState, activeText, currentTime, duration }) {
  if (!captionsEnabled) return 'Captions are off.';
  if (captionLoadState === 'loading') return 'Captions loading…';
  if (captionLoadState === 'error') return 'Read-along captions failed to load. Playback remains available.';
  if (activeText) return activeText;
  if (finalTailState(currentTime, duration) === 'caption-complete-audio-continues') return 'Captions complete; audio continues to the end of the episode.';
  return 'No caption at this moment.';
}

export function keyControl({ key, currentTime, duration, paused }) {
  const bounded = (value) => Math.max(0, Math.min(duration, value));
  if (key === 'Space') return { handled: true, currentTime, paused: !paused, action: 'toggle-play' };
  if (key === 'ArrowRight') return { handled: true, currentTime: bounded(currentTime + 5), paused, action: 'seek-forward-5' };
  if (key === 'ArrowLeft') return { handled: true, currentTime: bounded(currentTime - 5), paused, action: 'seek-back-5' };
  if (key === 'Home') return { handled: true, currentTime: 0, paused, action: 'seek-home' };
  if (key === 'End') return { handled: true, currentTime: duration, paused, action: 'seek-end' };
  return { handled: false, currentTime, paused, action: 'none' };
}

export function mobileContainment(viewportWidth) {
  const mainWidth = Math.min(1100, Math.max(0, viewportWidth - 32));
  return { viewportWidth, documentWidth: viewportWidth, mainWidth, videoWidth: mainWidth, railWidth: mainWidth, horizontalOverflow: false };
}

export function reducedMotionPolicy(matches) {
  return matches ? { animation: 'none', transition: 'none', scrollBehavior: 'auto' } : { animation: 'author-default', transition: 'author-default', scrollBehavior: 'author-default' };
}
