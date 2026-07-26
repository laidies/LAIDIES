# KSVL Community RAiDIO operating specification

**Status:** BOUNDED LOCAL PASS — independent Repair 2 rejudge 86.75/100; no rights, public
playback, request-delivery or learning-completion approval
**Reconciled:** 2026-07-25
**Authority:** KSVL charter, launch deep dive, episode canon, song-production
reconciliation protocol and current source. Conflicts fail closed.

## 1. Promise and format job

KSVL is the town's listening and memory-hook product. It may offer original
episode songs, station texture and activity music only when the exact public
track is admitted by a current provenance/rights registry. Its learning job is
to help a listener remember and return to a source lesson; a play is not lesson
completion, mastery or proof that the audio was heard.

It is not a streaming account, a verified listening-history service, a rights
clearing house, a request guarantee or an autoplay engagement system.

## 2. Journeys

### New listener

The station explains that sound starts only after an explicit action. The
listener sees what is available or held, chooses a track/mix, and receives a
persistent status that distinguishes loading, playing, paused, blocked,
waiting, failed and ended. A successful `play()` promise is necessary but not
sufficient: decoded metadata, advancing media time and non-muted/non-zero
volume form the bounded audible-state proxy.

### Returning listener

The browser may remember a current admitted track, position, volume, mute,
repeat and shuffle state for six hours. The UI calls this device/browser-local.
It never starts audible playback automatically on re-entry. A removed, held or
changed registry entry invalidates the saved state.

### Failure and recovery

Autoplay denial, unsupported/corrupt media, missing/network media, invalid
metadata, stalled/waiting playback, failed seek and storage denial produce
visible, persistent, polite status. A retry repeats only the current admitted
source after a user action. It does not silently skip, charge, reward, mark
listening complete or claim a rights decision.

### Song request

Unsigned-in text may be stored on this device only after an explicit save
action and an honest success result. Signed-in submission may claim only that
the service returned a receipt for review. It must not promise that DJ SunnyV
heard, selected, produced or credited the request. No live request is submitted
by this repair cycle.

## 3. Canonical track admission

`content/music/ksvl-track-registry.json` is the only public catalogue authority.
Every record requires exact ID/title/artist/source/mixes, status, rights state,
lyric state, lesson route or explicit `null`, freshness owner and visitor-safe
note. Runtime admits a record only when:

- the manifest schema is exact and not stale;
- status is `AVAILABLE`;
- rights status is `CLEARED_FOR_PUBLIC_STREAMING`;
- the local source exactly matches the runtime catalogue entry;
- the source is a safe local `/content/music/` audio path;
- the lesson route is safe/local when present; and
- no unknown/private keys appear.

`HOLD` is the default for missing rights, missing as-recorded lyrics, missing
lesson context, stale review or source mismatch. File existence is not
admission. Jingles, intros, spots and transitions require their own registry
records before a public live rotation may use them.

## 4. Player mechanics

- Explicit user action starts audio; re-entry never starts audible playback.
- Play state changes only after the media promise/event confirms it.
- Pause/resume, previous/next, seek, mute, volume, repeat off/all/one and
  shuffle have labelled native controls and persistent status.
- `ended` advances according to repeat state; error never impersonates ended.
- Exactly one KSVL/audio owner plays at a time. Detached theme, DJ Booth,
  miniplayer and pop-out owners must pause or yield without automatic surprise
  resume.
- Saved position is bounded to valid duration and discarded when the admitted
  track identity changes.
- Reduced-motion removes spinning/pulsing/equalizer motion.

## 5. Accessibility and responsive behavior

All controls are native buttons/ranges with visible focus, names and at least
44px primary targets. The persistent status exists before changes with
`role=status`, `aria-live=polite`, `aria-atomic=true`; errors remain visible and
retry focus is meaningful. No rapid `timeupdate` announcement is placed in the
live region. The player reflows at 320/390px without horizontal control loss.
Native 200% zoom, Safari, VoiceOver and physical-device evidence remain release
holds.

## 6. Rights, privacy, safety and learning

No registry state is a legal conclusion except a dated owner-approved
`CLEARED_FOR_PUBLIC_STREAMING` record. Public metadata contains no private
contracts, account data or request text. Analytics may record aggregate
attempt/result/error/control/source-open events but never raw requests,
listening position by person or a completion/mastery inference.

Episode songs must follow the song-production reconciliation protocol:
canonical lyrics, exact approved master, as-recorded transcript, captions or
lyrics where promised, lesson/hook parity and rights record. Current episode
canon explicitly leaves Episodes 1–4 as-recorded lyrics pending, so those
tracks remain held.

## 7. External standards consulted

Accessed 2026-07-25:

- MDN `HTMLMediaElement.play()`:
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
- MDN `HTMLMediaElement` events:
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
- WAI-ARIA 1.2 live-region/status semantics:
  https://www.w3.org/TR/wai-aria/
- W3C ARIA19 error/live-region technique:
  https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19

The implementation treats `play()` rejection as a state, uses media events for
truth, and keeps status/errors in an existing live region.

## 8. Acceptance and status

Local bounded acceptance requires strict registry validation; source/artifact
parity; deterministic failure fixtures; rendered tests for user-initiated
play, denial, play/pause, seek, repeat, end/advance, mute/volume, single-audio,
storage denial and failure/retry; 320/390/desktop reflow; keyboard/focus; and
reduced motion.

Even after local pass, release remains held for rights-owner admission, exact
audio/lyric/caption reconciliation, Safari, VoiceOver, native zoom,
representative physical listening, real request-service testing, exact public
artifact and public-origin verification.
