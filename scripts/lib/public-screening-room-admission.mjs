const INTERNAL_REVIEW_FIELDS = [
  'reviewFilm',
  'reviewFilmSha256',
  'reviewFilmDurationSeconds',
];

const HELD_PUBLIC_PLAYBACK_FIELDS = [
  'cueSheet',
  'cueSheetSha256',
  'audio',
  'audioSha256',
  'audioDurationSeconds',
  'captions',
  'captionsSha256',
  'captionEndSeconds',
  'captionCoverage',
];

export function projectScreeningRoomAdmissionForPublic(source) {
  const admission = typeof source === 'string' ? JSON.parse(source) : structuredClone(source);
  for (const [id, programme] of Object.entries(admission.programmes || {})) {
    for (const field of INTERNAL_REVIEW_FIELDS) delete programme[field];
    if (id === 'trailer') {
      for (const field of HELD_PUBLIC_PLAYBACK_FIELDS) delete programme[field];
      programme.publicPlaybackStatus = 'unavailable';
    }
  }
  return `${JSON.stringify(admission, null, 2)}\n`;
}

export function assertNoInternalReviewFilmFields(source) {
  const admission = typeof source === 'string' ? JSON.parse(source) : source;
  for (const [id, programme] of Object.entries(admission.programmes || {})) {
    for (const field of INTERNAL_REVIEW_FIELDS) {
      if (Object.hasOwn(programme, field)) {
        throw new Error(`public Screening Room admission retains internal ${field}: ${id}`);
      }
    }
  }
}
