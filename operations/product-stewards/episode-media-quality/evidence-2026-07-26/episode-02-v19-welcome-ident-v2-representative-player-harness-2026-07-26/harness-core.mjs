export const BINDING = Object.freeze({
  mediaPath: '/assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4',
  mediaSha256: '80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814',
  mediaBytes: 583542700,
  videoSeconds: 987.466667,
  audioSeconds: 987.470333,
  vttPath: '/assets/captions/episode-02.vtt',
  vttSha256: '7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f',
  cueCount: 194,
  captionEnd: 986.67,
  missingMedia: '/assets/video/__missing-e02-v2.mp4',
  missingVtt: '/assets/captions/__missing-e02-v2.vtt'
});

export function stripVttMarkup(raw) {
  return String(raw).replace(/<v(?:\s+[^>]*)?>/gi, '').replace(/<\/v>/gi, '')
    .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

export function parseVtt(vtt) {
  const timing = /(?:(\d{2}):)?(\d{2}):(\d{2})\.(\d{3})\s+-->\s+(?:(\d{2}):)?(\d{2}):(\d{2})\.(\d{3})/g;
  const seconds = (h, m, s, ms) => Number(h || 0) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;
  const cues = [];
  for (const match of vtt.matchAll(timing)) cues.push({ start: seconds(match[1], match[2], match[3], match[4]), end: seconds(match[5], match[6], match[7], match[8]) });
  return cues;
}

export function keyAction({ key, currentTime, duration, paused }) {
  const bounded = (value) => Math.max(0, Math.min(duration, value));
  if (key === 'Space' || key === 'K' || key === 'k') return { handled: true, action: 'toggle-play', currentTime, paused: !paused };
  if (key === 'ArrowLeft') return { handled: true, action: 'seek-back-10', currentTime: bounded(currentTime - 10), paused };
  if (key === 'ArrowRight') return { handled: true, action: 'seek-forward-10', currentTime: bounded(currentTime + 10), paused };
  if (key === 'Home') return { handled: true, action: 'seek-home', currentTime: 0, paused };
  if (key === 'End') return { handled: true, action: 'seek-end', currentTime: duration, paused };
  if (key === 'C' || key === 'c') return { handled: true, action: 'toggle-captions', currentTime, paused };
  return { handled: false, action: 'none', currentTime, paused };
}

export function tailState(currentTime, duration) {
  return Number.isFinite(duration) && currentTime >= BINDING.captionEnd && currentTime < duration
    ? 'captions-complete-audio-continues' : 'not-tail';
}

export function railText({ enabled, state, activeText, currentTime, duration }) {
  if (!enabled) return 'Captions are off.';
  if (state === 'loading') return 'Captions loading…';
  if (state === 'error') return 'External captions failed to load. Playback remains available.';
  if (activeText) return stripVttMarkup(activeText);
  if (tailState(currentTime, duration) === 'captions-complete-audio-continues') return 'Captions complete; audio continues to the end.';
  return 'No caption at this moment.';
}

export function reducedMotionPolicy(matches) {
  return matches
    ? { animation: 'none', transition: 'none', scrollBehavior: 'auto' }
    : { animation: 'author-default', transition: 'author-default', scrollBehavior: 'author-default' };
}
