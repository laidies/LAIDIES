# Episode 03 v13 representative player — independent functional verdict

**Judge date:** 2026-07-27  
**Scope:** the sealed local-only harness at `episode-03-v13-representative-player-harness-2026-07-26/`.  
**Verdict:** **PASS — isolated representative player-functional gate only**  
**Overall film/release status:** **HOLD** — this result does not perform or replace the assigned human full-title 1×, unmuted, audible watch; it also does not admit, deploy, or publish Episode 03 v13.

## Frozen inputs independently recomputed

| Input | Required SHA-256 | Independently observed SHA-256 | Result |
| --- | --- | --- | --- |
| `assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4` | `bcea0457b9b985558ace3581e4c18b4601173d8d668db4284c9e7589aca5a56f` | `bcea0457b9b985558ace3581e4c18b4601173d8d668db4284c9e7589aca5a56f` (436,491,858 bytes) | PASS |
| `assets/captions/episode-03.vtt` | `aed14506fe7d399f0a77c391fa1e046746a920d86b65880093b30f0fc83c66be` | `aed14506fe7d399f0a77c391fa1e046746a920d86b65880093b30f0fc83c66be` (211 cues) | PASS |

The reviewed harness code matched its declared sealed fingerprints: `binding.json` `3408b…27d4b`, `index.html` `65e00…e296e`, `player.css` `1cfc5…13e66`, and `player.js` `52caf…47a95`.

## Independent reason-coded checks

| Code | Check | Evidence | Result |
| --- | --- | --- | --- |
| EMQ-03P-01 | Exact source binding | Static rerun recalculated both hashes and bytes; real browser mounted the declared v13 MP4 and exposed duration 1048 seconds. | PASS |
| EMQ-03P-02 | External caption safety | 211-cue external VTT loaded into the rail below picture. Real browser received caption text with no raw `<v …>` voice markup. | PASS |
| EMQ-03P-03 | User play state | On user play the browser reported `playbackRate: 1`, `muted: false`, and `paused: false`. | PASS |
| EMQ-03P-04 | Keyboard and focus paths | Static controls cover Space/K, Left/J, Right/L, Home, End, and C. Browser execution confirmed seek and caption toggle; separate probe executed all declared pathways. | PASS |
| EMQ-03P-05 | 390px and reduced motion | At 390×844 there was no horizontal overflow; the reduced-motion query was active, transition duration was 0 seconds, and the play target was 56.78px high. | PASS |
| EMQ-03P-06 | Failure and retry | Missing media failed closed with controls disabled and visible retry. Independent probe clicked Retry and verified rebind to the exact v13 source, 1048-second duration, 1×, unmuted. | PASS |
| EMQ-03P-07 | No-JS boundary | With JavaScript disabled, media had no mounted `src`/`source` while the no-JS boundary and exact identities remained visible. | PASS |

## Reproduction boundary

I ran `test-static.mjs` and `test-browser.mjs` against a temporary isolated copy of the sealed harness, with the original immutable media and captions mounted read-only. Results: **10/10 static PASS** and **11/11 browser PASS**. The maker folder, MP4, VTT, `watch.html`, public routes, and deployment were not modified.

This is a functional player result, not a complete Episode Media Quality admission. The required human full-programme 1× unmuted audible watch remains an explicit **HOLD**. No public-status claim is authorized.

## Learning scan

No new qualifying learning was found. This check reapplies the existing rule that a player-functional pass cannot substitute for a full audible human watch or public verification.
