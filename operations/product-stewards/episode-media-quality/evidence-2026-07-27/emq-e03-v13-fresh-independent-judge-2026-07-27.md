# EMQ — Episode 03 v13 fresh independent full-title judgment

**Judge date:** 2026-07-27 (America/Vancouver)  
**Scope:** frozen local Episode 03 v13 tuple only. This review did not alter media, captions, the harness, `watch.html`, site routes, release state, deployment, or public media.

## Verdict

**HOLD — release admission only.** The exact v13 picture, captions, and representative-player functional gate pass this fresh reconciliation. The only remaining release boundary is the explicitly assigned **human full-title 1×, unmuted, audible watch**. That watch was not performed by this judge and cannot be inferred from decode, image sampling, or a browser control test.

This clears neither deployment nor public release. It supersedes the earlier v13 whole-title HOLD *only in the narrow respect that its former representative-player-proof blocker is now resolved by the separately independent sealed-harness verdict below.*

## Recomputed frozen tuple

| Artifact | Required SHA-256 | Independently observed | Result |
| --- | --- | --- | --- |
| Review MP4 `assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4` | `bcea0457b9b985558ace3581e4c18b4601173d8d668db4284c9e7589aca5a56f` | same | PASS |
| Build config `assets/video/episode-03-v13-cue30-law-library-repaired-config.json` | `f19dd24cb24ca1af2a1d3c0a848f947f68ad0884c747950a685e281f48ca5430` | same | PASS |
| Builder `assets/video/build-episode-03-v13-cue30-law-library-repaired.py` | `76ebdfea461dcc2b06c7282e4b1f49a21bfb605ae22eecf8e133043b7e6d1af8` | same | PASS |
| Manifest `operations/video-qa/episode-03-full-v13-cue30-law-library-repaired-manifest.json` | `515d930aa8e6e6297dfbfa99d4ee9932718626adae22a4c574d6855ebe384c40` | same | PASS |
| QC `operations/video-qa/episode-03-full-v13-cue30-law-library-repaired-qc.json` | `7b53d46928bb433e5b381f00165c719982f9c8a47001af18a7f570089059186c` | same | PASS |
| External VTT `assets/captions/episode-03.vtt` | `aed14506fe7d399f0a77c391fa1e046746a920d86b65880093b30f0fc83c66be` | same | PASS |

The MP4 is 436,491,858 bytes. Finder/AVFoundation metadata reports 1920×1080 H.264/AAC and 1047.975328798186 seconds; the bound programme clock is 1048 seconds / 31,438 frames at 30 fps. A fresh full FFmpeg decode to null completed without error.

## Fresh independent review

| Gate | Result | Finding |
| --- | --- | --- |
| Picture/audio clock and scope | PASS | The manifest binds a single 360-frame replacement at 565.000–577.000 seconds. It preserves the v12 AAC payload and total programme clock. |
| Cue 7 / Welcome ident | PASS | VTT places “Welcome back to LAiDIES” at 116.180–123.820. Sampled frames at 116, 120, and 123 seconds retain the title-specific Episode 03 LAiDIES ident within that spoken interval; no source return occurs before the semantic end. |
| Cue 30 narration-to-image repair | PASS | Sampled frames at 565, 571, and 576 seconds show the heroine working through papers in a period law library, with blank papers, unlettered law volumes, a green banker’s lamp, and a beige CRT. This supports the library/research narration and removes the earlier malformed-lettering defect. |
| Identity, period, location, and style | PASS | The repaired interval retains the blonde heroine with clips, pink cardigan, white top, R necklace, early-2000s CRT, and the required adult graphic-novel/comic treatment. No modern device, pseudo-text, camera drift, or unrelated office substitution was observed in the sampled repair. |
| Motion | PASS | The bound source-motion acceptance is `ACCEPT_SOURCE_MOTION_ONLY` for the exact replacement SHA `6a3a6e…d6bf`: 12.000 s / 360 frames, seamless first/last equality, and movement confined to banker’s-lamp/window dust masks. The assembled interval visibly remains restrained environmental motion only. |
| Whole-title visual coherence | PASS, sampled | Opening, title, Welcome ident, mid-programme, cue 30, verification, cocktail, rule, and outro samples were inspected. They are coherent with the Episode 03 Burn Book / verification programme and show no new obvious identity, period, crop, or caption-picture contradiction. Sampling is not a substitute for the required human complete watch. |
| External captions | PASS, structural | The VTT has 211 positive, ordered, non-overlapping cues. The last cue ends at 1046.950 seconds, leaving the declared 1.025-second programme tail. Voice tags sanitize cleanly in the bound player code. |
| Representative-player functional gate | PASS | The independent sealed-harness verdict `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-episode-03-v13-representative-player-independent-judge-2026-07-27.json` (SHA `fb84e8a60030df996db42b9920a269d5cec9c1e46d9f8855ca65c3a027c4bb57`) records 10/10 static and 11/11 browser passes against this exact MP4/VTT: normal 1× unmuted play, sanitized external captions, keyboard/focus, 390px/reduced motion, retry/fail-closed, and no-JS boundary. I independently rechecked the harness binding, media/VTT hashes and bytes, 211-cue count, and all declared static safety contracts without writing maker evidence. |
| Human full-title 1× unmuted audible watch | HOLD | Not performed. It remains a human release witness, separate from the player control pass and this visual/technical review. |

## Disposition and next action

- `PASS_HASH_BOUND_TUPLE`
- `PASS_FULL_DECODE_AND_CLOCK`
- `PASS_CUE07_SPOKEN_WELCOME_IDENT`
- `PASS_CUE30_LAW_LIBRARY_LETTERING_AND_SEMANTIC_REPAIR`
- `PASS_IDENTITY_PERIOD_LOCATION_STYLE_SAMPLING`
- `PASS_RESTRAINED_SOURCE_MOTION_BINDING`
- `PASS_EXTERNAL_VTT_STRUCTURE`
- `PASS_EXACT_V13_REPRESENTATIVE_PLAYER_FUNCTIONAL_GATE`
- `HOLD_HUMAN_FULL_1X_UNMUTED_AUDIBLE_WATCH_MISSING`

**Exact next action:** assign and record one human full 1× unmuted audible watch against MP4 SHA `bcea0457…a56f`, with time-coded failures if any. If it passes, reconcile this local admission with the separate release/public-origin authority; no release follows automatically.

## Authority and learning scan

No maker media, public route, release, deployment, or spend authority was used. No new qualifying systemic learning was found; this applies the standing rule that a player-functional pass and sampled visual review do not replace a full human audible watch.
