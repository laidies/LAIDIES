# KSVL Community RAiDIO operating specification

## Request / declaration-sticker recovery — 2026-08-30

Declaration picks: DEPLOYED / PUBLICLY VERIFIED (bounded) in6b664326,
source6ce2992c. Custom and immutable real-account desktop/phone-browser pickup,
Closet restoration and removal sync pass. Exact release and cleanup are recorded
in `operations/ACTIVE-WORK.md`. Listening-earned rewards remain held.
Request service: PREPARED / HOLD, NOT DEPLOYED. Provider rehearsal rolled back;
no schema, permissions or retention scheduler was changed. Retention approval,
cold-offline draft handling, remaining provider checks and real submission/delete
verification are required before activation. Source HEAD is not a release input.

Ali authorized recovery and live narrow releases of remaining non-working
backend features. Restore the existing up-to-three declaration sticker pickup
as private choices visible in the Closet and backed by Resident continuation.
Use the existing14 declaration designs without altered pixels; the6 listening
achievement designs remain locked. A declaration is taste, never verified
listening, ownership, currency or learning completion. Preserve existing picks,
permit removing them, and preserve the one-time pickup flag. Latest deliberate
choice/removal wins across browsers; account switches clear these private keys.
Storage denial cannot claim saved, and public Card routes show no private picks.
This explicitly extends the earlier radio-only display scope for declaration
pixels to the private Closet; independent review must inspect that exact reuse.
Request recovery must first verify the actual provider permissions; protect
staff fields and private text, duplicate retries and safe own-account actions.
No automatic retention deletion or new staff/public policy is inferred.

## Current repair contract — 2026-08-30

Release outcome: this bounded continuity contract is deployed as
`931eb0dc-ab7e-4744-a0c6-7a8c846802e5`. Current evidence and remaining gaps are
recorded at the top of `FUNCTIONALITY-MAP.md` and `operations/ACTIVE-WORK.md`.

Ali authorised KSVL repair after the live continuity audit. The exact audit and
release base are recorded in `FUNCTIONALITY-MAP.md` and `operations/ACTIVE-WORK.md`.
Current catalogue authority remains the creator-confirmed 29-song registry and
the July 26 `state.json` ruling: missing captions or contextual links are follow-up
work, not a reason to disable otherwise admitted originals. The earlier blanket
rights/content holds below are historical and do not override that ruling.

The active repair changes only player mechanics and distribution, popup guidance,
and the already-tested self-only Closet restoration. No new music, visual art,
reward, request-service, account-sync, editorial content or site architecture.

- First arrival and later return stay silent; a valid saved state restores paused.
- A same-tab, ordinary town link followed during active listening carries a short,
  one-use continuation intent. Resume the admitted ID/position/preferences if the
  browser permits. Explicit Pause/Stop must survive. No muted background autoplay
  trick or arbitrary click-to-unmute behaviour.
- Full document navigation may interrupt audio briefly. Truly uninterrupted
  playback uses the existing explicit pop-out; do not claim seamless same-tab audio.
- A same-origin browser lock owns KSVL audio. Other pages expose the same bottom
  controls and send bounded commands to that owner. Heartbeat/display data cannot
  override a live lock. Popup recognition covers `.html` and pretty routes. Failed
  pop-out leaves the current sound intact. Closing the owner restores paused state.
- If browser capabilities/storage/autoplay policy prevent continuity, report that
  limitation without starting a competing owner or silently skipping the track.
- One canonical runtime per full active town document; never inject it into
  rendered book fragments or retired Grimoire readers. Preserve all unrelated
  page bytes and current NewsStand publication data. The public builder and exact
  overlay share the same distribution transform.
- The bottom deck must expose Pause/Resume, Stop, seek/volume/mute, track changes,
  shuffle/repeat and pop-out at 320/390px, with at least 44px button targets and
  content space reserved beneath it. Hidden CD faces must not accept keyboard
  input or clicks intended for the visible face.

Maker tests: existing catalogue/failure/browser suite, fail-first continuity suite
(active/cold/paused, live/mix/album/single, position/preferences, popup/remote/blocked,
stop/close, malformed state), calibrated distribution tests and exact artifact
preservation. Independent read-only review follows zero known maker failures.
Then inspect real audio and ordinary navigation on desktop/phone-sized browsers,
commit exact source, verify current production head, overlay the held exact
successor, and verify immutable/custom origins. Native Safari/physical phone and
speaker-quality evidence remain separately unverified unless actually performed.

Technical references checked 2026-08-30: MDN HTMLMediaElement.play (browser denial
must be handled) and W3C Web Locks (origin-scoped exclusive ownership). These do
not prove a device outcome; the browser journeys must do that.

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
