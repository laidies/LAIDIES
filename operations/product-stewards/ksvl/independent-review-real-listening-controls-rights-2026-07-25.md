# KSVL independent review — real listening, controls and rights

**Reviewed:** 2026-07-25  
**Role:** independent judge; reviewer did not make the candidate  
**Candidate artifact:** `/tmp/laidies-ksvl-maker3.HfOrUB`  
**Overall verdict:** **FAIL — FIX BEFORE LAUNCH**  
**Bounded status ceiling:** the control repair demonstrates useful local work, but it does not earn `VERIFIED LOCALLY` because the public admission boundary, truthful public promise and hostile-fixture contract still fail.

## Executive judgment

Holding all 29 song records is honest and necessary. The canonical public
registry reports `29` tracks, `0` admitted and `29` held, and the rendered
player disables the held mixes.

The complete public experience is not yet honest, however. Public KSVL and
homepage copy still says the station is broadcasting, invites visitors to tune
in live, says mixes and episode songs can be played or listened to, describes
DJ SunnyV as on air, and advertises listener achievements that cannot currently
be earned. The homepage KSVL link is intercepted and leaves the visitor on the
homepage with a held status instead of taking her to the radio building.

More seriously, the exact production player accepts
`window.__KSVL_TEST_REGISTRY` without the test-hook gate. An injected in-page
fixture can therefore replace the only-public-authority registry and admit a
track in the exact artifact. The runtime also accepts impossible freshness
dates, ignores malformed `updatedAt`, and admits a record whose as-recorded
lyrics remain missing. Those are fail-closed contract failures, not merely
missing test coverage.

No explicit public statement that the files are legally rights-cleared was
found. The public copy nevertheless represents held material as playable/live,
and DJ Booth continues to expose outbound Spotify playlist promises without
registry-native playlist admission.

## Gate verdicts

| Gate | Verdict | Evidence |
|---|---|---|
| Canonical data truth | PASS, bounded | Validator rerun: `tracks=29 admitted=0 held=29`. The checked JSON makes no rights inference. |
| Runtime admission authority | **FAIL** | The production bundle consults `window.__KSVL_TEST_REGISTRY` unconditionally. The exact artifact admitted the controlled track override. |
| Strict/stale/hostile registry behavior | **FAIL** | Source mismatch, stale date, duplicate and unknown-key fixtures failed closed. `freshThrough: 9999-99-99`, malformed `updatedAt`, and a cleared/available record with missing as-recorded lyrics were admitted. |
| Public promise/catalogue truth | **FAIL** | `radio.html`, `index.html`, `radio-v2.js` and DJ Booth still promise broadcast/live/play/listen/on-air behavior while zero tracks and the live stack are admitted. |
| Playback state machine | PASS, bounded | Controlled browser suite passed denial, retry, play/pause, seek and seek failure, mute/volume, repeat/end, waiting/stalled, media error and single-audio coordination. |
| Real `HTMLAudioElement` proxy | PASS, bounded | Source and exact-artifact tests observed decoded metadata, advancing media time and non-muted/non-zero volume. This is not human listening or media-quality approval. |
| No cross-page audible autoplay | PASS, bounded | Restored admitted state created no `play()` call and announced that explicit Play was required. Live restore is cleared. |
| Device-local persistence | **FAIL** | A state older than six hours is removed, but the acceptance predicate allows future timestamps. The saved object is not exact-schema validated or bound to a registry revision. |
| Request truth | **FAIL** | Unsigned controlled save truthfully said device-only; service failure truthfully denied delivery; an ID-bearing response showed receipt `R-123`. A successful response with no ID still said “Received for station review,” contrary to the receipt-only contract. No real service was called. |
| DJ Booth isolation | PARTIAL / HOLD | Its legacy audio IIFE returns before creating audio and controls are disabled, but its hero still says “Press play” and Spotify playlists remain exposed without registry-native admission. |
| Accessibility/responsive automation | PASS, bounded | Existing rendered checks cover native controls, labels, live status, retry focus, reduced motion and 320/390/1280 reflow. Safari, VoiceOver, native zoom, contrast and physical devices remain held. |
| Exact artifact integrity/privacy | PASS, bounded | Source/artifact hashes match for registry, player, radio and DJ Booth. The private steward dossier is absent. Artifact validator reported 83 dependencies / 141.99 MiB with matching hashes. |
| Site integration checks | PASS | Inline JS `353/132`; local links `1,942/110`; town check; steward check `65 products, 3/3 active`. |
| Rights, lyrics, captions and human audio craft | **HOLD / NOT JUDGED** | No rights-owner admission or human audio-quality evidence was supplied; Episodes 1–4 as-recorded lyrics remain pending. |
| Public origin/release | **HOLD / NOT JUDGED** | No deployment or public-origin verification was authorized or performed. |

## Exact artifact parity

The independently checked source files and exact artifact files were
byte-identical:

- registry:
  `520a5dc9a4ce7581e96a6e7a0e5449821e0c3013e115fe480447760a20d2c9cd`
- player:
  `b3b72d9d38bf69e8410c2a3724be6749eb779c1e42217ab0d1fa5103cc9f6d60`
- radio page:
  `ba062101e2049395507f6b99a62ae87a70b32c71056b8aef87e0a8ff585f42df`
- DJ Booth:
  `c69c3dd77f8aa760daa0c495f21b3d03cf3ddb533ffe68b7a10b8ec19824bb60`

Parity proves what was reviewed; it does not make the failing behavior safe.

## Adversarial evidence

The independent controlled browser matrix produced:

- canonical all-HOLD registry: `0` enabled mixes;
- one otherwise valid admitted fixture: `2` enabled mixes (control);
- source mismatch: failed closed;
- stale `2026-07-24`: failed closed;
- duplicate record: failed closed;
- unknown record key: failed closed;
- impossible `freshThrough: 9999-99-99`: **admitted**;
- malformed `updatedAt: not-a-date`: **admitted**;
- `AS_RECORDED_LYRICS_MISSING` with available/cleared flags: **admitted**;
- exact artifact plus production test override: **admitted**.

The request simulation used only a locally intercepted module and made no
external mutation:

- signed out: device-only draft statement and local record;
- receipt ID: receipt-specific review statement;
- insert error: explicit not-delivered statement;
- success-shaped response without an ID: **incorrectly claimed received**.

The homepage navigation probe with the canonical held registry remained at
`index.html` after “Tune into KSVL 99.9” and announced the live hold in the
persistent player. A held station must not turn a navigation link into a dead
launch control.

## Weighted score and mandatory floors

Quality, accuracy/trust and LAiDIES brand contribution carry the dominant
weight. Each also has a mandatory `17/20` floor.

| Dimension | Raw score | Floor | Weight | Weighted contribution |
|---|---:|---:|---:|---:|
| Product quality and completeness | 10/20 | **FAIL** | 30% | 15.0 |
| Accuracy, rights and visitor trust | 7/20 | **FAIL** | 30% | 10.5 |
| LAiDIES brand contribution | 8/20 | **FAIL** | 25% | 10.0 |
| UX and bounded accessibility | 11/20 | — | 10% | 5.5 |
| Technical resilience | 10/20 | — | 5% | 2.5 |
| **Total** |  |  | **100%** | **43.5/100** |

The controls are substantially better than the previous implementation, but
the public promise and admission authority are core product behavior. Passing
mechanical playback tests cannot offset those failures.

## Required repair packet

### P0 — required before another independent judgment

1. Remove the production registry override. Test injection must exist only in a
   test build/harness or behind an explicit test gate that is absent from and
   rejected by the public artifact. Add an exact-artifact assertion that
   setting `__KSVL_TEST_REGISTRY` cannot change admission.
2. Make registry validation semantically strict:
   - parse and round-trip both `updatedAt` and `freshThrough`;
   - reject impossible, invalid and future review timestamps;
   - validate the exact `registryId` and `publicRule` contract;
   - enumerate allowed rights and lyric states;
   - require the owner-approved as-recorded lyric state for admission;
   - default every unknown or missing value to HOLD.
3. Reconcile all visitor-facing KSVL copy with the zero-admitted state.
   Broadcasting, on-air, tune-in-live, press-play, listen and earn-by-listening
   claims must be removed or replaced with an explicit soundcheck/held
   experience until exact items are admitted. Do not imply that a public file
   or Spotify link is a cleared catalogue item.
4. Stop intercepting ordinary `/radio.html` navigation while Live is held.
   A visitor must be able to enter the building and understand the current
   catalogue state.
5. Treat a signed-in submission as received only when the service returns a
   non-empty validated receipt ID. A success-shaped response without one must
   use the existing not-delivered failure path.
6. Reject future, malformed, unknown-key and wrong-context saved state. Bind
   restoration to an admitted track plus current registry revision; remove the
   record when identity/admission changes. Retain the current no-autoplay rule.
7. Extend source and exact-artifact tests with every hostile fixture above,
   misleading-copy assertions, held-link navigation, missing-receipt behavior,
   expired/future/corrupt storage and a production-test-hook isolation check.
8. Keep DJ Booth inert and change its visible promise accordingly. Remove or
   hold outbound playlists until each playlist/source has an explicit
   registry-native provenance and rights decision.

### P1 — after the P0 gate passes

1. Make “Save or send” preserve an unsigned local draft even when the remote
   client library/configuration is unavailable, while continuing to state that
   nothing was sent.
2. Remove obsolete muted-autoplay/resume code and comments so future work
   cannot accidentally reintroduce surprise sound.
3. Add real Safari, VoiceOver, native 200% zoom, contrast and representative
   physical-device evidence.
4. Test the real authenticated request service, validation, moderation,
   retention, deletion, database failure and retry without exposing request
   text to analytics.
5. After rights admission, run master/lyrics/captions/lesson-hook
   reconciliation and independent human listening before any song becomes
   available.

## Holds preserved

This review does not clear or infer:

- rights-owner approval for any of the 29 songs, or for jingles, transitions,
  intros, commercials, spots or playlists;
- Ali's visual approval of KSVL or DJ Booth;
- human audio, lyric, caption, timing, mix or learning quality;
- Safari, VoiceOver, native zoom, contrast, speaker/headphone or physical-device
  behavior;
- signed-in request-service correctness, privacy lifecycle or moderation;
- public deployment, public-origin behavior or announcement readiness;
- analytics/VOC, learning retrieval, account sync or listening rewards.

The next candidate should remain **FIX BEFORE LAUNCH** until the P0 packet is
implemented, the exact artifact is rebuilt, and a different independent judge
reruns the complete matrix.
