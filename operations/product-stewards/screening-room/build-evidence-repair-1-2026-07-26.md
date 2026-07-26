# Screening Room Cycle 6 Repair 1 — maker evidence

**Status:** BUILT LOCALLY — INDEPENDENT REJUDGE REQUIRED  
**Scope:** common-player truth/accessibility, one exact Episode 02 semantic
anchor, explicit derived-edition authority and fail-closed occurrence admission  
**Preserved holds:** every visual, style/identity/background, narration
alignment, owner, native-device, public, motion-film and title admission hold

## Bounded outcome

This repair does not admit a title or create/approve media.

- Episode 02's “Next time” cue now begins at 971.49 seconds, the exact start of
  “Next time on LAiDIES” in its existing VTT. It no longer appears 61.49
  seconds early. The resulting preceding 83.49-second card hold is explicitly
  still a timing defect; no unverified intermediate cues were invented.
- Trailer captions are labelled partial. The contract records 967.116 seconds
  of audio, a 902.760-second caption end and 64.356 seconds uncaptioned. The
  missing text and final visual timing remain held.
- Audio, cue, caption, visual and rejected-play failures now pause, disable
  transport, identify the failed component and offer reload retry. Silent
  simulated rough-cut playback was removed.
- The seek rail is a keyboard-focusable slider with Arrow, Home and End
  operation plus current/max/value text.
- Unknown episode routes fail coherently against the exact trailer/01–04
  allowlist. Tune mode is restricted to localhost/loopback.
- Playback emits `Listen-along start`, not `Episode watch`, and makes no
  completion claim.
- Episodes 03–04 are generated from a machine-readable derived-edition
  manifest. The builder verifies exact source and generated hashes and labels
  the result as a held cover-only audio edition with one static cover.
- The occurrence admission schema requires exact timing, asset hash,
  narration meaning, identity/location/background/era/style verdicts,
  independent judge and owner decision. Current records contain zero approved
  occurrences and therefore keep every title fail-closed on HOLD.

## Exact artifact

Fresh artifact: `/tmp/laidies-screening-repair1-final.pJTJge`

- 1,087 files
- 959.59 MiB
- zero reported missing or individually oversized dependencies
- existing greater-than-750-MiB release warning remains

Derived cue identity:

| Episode | Source cue SHA-256 | Artifact cue SHA-256 |
|---|---|---|
| 03 | `aa770874293609ec41676839880471effce2a12f906d198cbf7230db31ed09a9` | `5e9bcdbaeef6e7a9696a9a83d7e8b627b8f901b57cbaac1dde71f168000102de` |
| 04 | `8cd20dc34aeada067262fdde797308e370749194a560cc9d8878d092cc60baf6` | `8c33dd0ad85eea1c64e22fc467474f6a7573865fd7555b749217cf442e28f980` |

The builder aborts if either source or generated hash differs.

## Verification

| Check | Result |
|---|---|
| Source `test-screening-room-contract.mjs` | PASS — five programmes present; all explicitly HOLD; exact media hashes/coverage/semantic anchor and missing occurrence evidence reported |
| Exact-artifact contract | PASS — same title holds; derived identity, static-cover rule, generated hashes and unsupported-copy absence verified |
| `check-episode-cues.js` | PASS structural validity; warnings preserve long holds, including Episode 02's newly exposed 83.5-second preceding hold |
| Inline JavaScript | PASS — 351 scripts across 132 pages |
| JSON parse and scoped diff check | PASS |

Native Safari/VoiceOver, real mobile, rendered network-failure recovery and
owner/independent normal-speed watches remain open. Static/source tests are not
reported as substitutes.

## Maker score for rejudge

| Category | Repair 1 maker score | Reason |
|---|---:|---|
| Product quality | 13/20 | Early Episode 02 semantic reveal fixed; no title has complete aligned occurrence evidence. |
| Accuracy/trust | 15/20 | Caption and cover-only truth plus hash-bound derivation improved; trailer remains incomplete. |
| LAiDIES brand/continuity | 11/20 | No visual was approved or replaced; continuity holds remain. |
| UX/accessibility | 14/20 | Keyboard seek and honest stopped failures exist; native proof and Episode 04 chapters remain open. |
| Technical/data integrity | 16/20 | Exact hashes, source/artifact manifest and fail-closed schema pass; artifact size and rendered/native gates remain. |
| **Total** | **69/100 — HOLD** | Every non-compensable floor is not yet met. |

## Packaging allowlist

- `watch.html`
- `content/episodes/episode-02-cues.json`
- `content/episodes/screening-room-admission.schema.json`
- `content/episodes/screening-room-admission.json`
- `content/episodes/screening-room-derived-editions.json`
- `scripts/build-public-site.mjs`
- `scripts/test-screening-room-contract.mjs`
- this maker evidence plus steward spec/state/backlog

The public artifact additionally admits only the existing five narration
files, five VTTs, five cue sheets, exact statically referenced runtime modules
and exact cue assets. For the derived Episode 03–04 editions, only the
corresponding static VHS cover is admitted from their visual cue path.

Studio/review exports, broad episode trees, raw/rejected/superseded media,
contact sheets and motion-film bindings remain denied. The disposable `/tmp`
artifact is evidence, not a packaging source.
