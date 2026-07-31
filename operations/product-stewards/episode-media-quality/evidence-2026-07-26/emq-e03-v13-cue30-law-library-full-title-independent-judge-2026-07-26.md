# EMQ — Episode 03 v13 cue-30 law-library repair, independent full-title judgment

**Judged:** 2026-07-26 America/Vancouver
**Judge role:** independent Episode Media Quality; not the maker
**Scope:** exact local review only. No media, player, site, release, deployment, or public mutation.

## Verdict

**Bounded cue-30 repair: ACCEPT.** The exact 565.000–577.000-second replacement fixes the previously held malformed law-library lettering without changing any other decoded v12 picture frame, the accepted spoken-welcome ident, the programme clock, or AAC payload.

**Whole-title: HOLD.** The repaired picture itself introduces no observed new identity, style, location, lettering, or motion failure. The remaining whole-title gate is the same real delivery gate: this exact v13 file is not mounted in a representative film player, so normal-speed playback, external-VTT behavior, keyboard controls, reduced motion, no-JS/failure behavior, and a human full 1× audible watch have not been independently witnessed. This is not a release or public admission.

## Exact tuple

| Artifact | SHA-256 recomputed | Result |
| --- | --- | --- |
| `assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4` | `bcea0457b9b985558ace3581e4c18b4601173d8d668db4284c9e7589aca5a56f` | MATCH |
| `assets/video/episode-03-v13-cue30-law-library-repaired-config.json` | `f19dd24cb24ca1af2a1d3c0a848f947f68ad0884c747950a685e281f48ca5430` | MATCH |
| `assets/video/build-episode-03-v13-cue30-law-library-repaired.py` | `76ebdfea461dcc2b06c7282e4b1f49a21bfb605ae22eecf8e133043b7e6d1af8` | MATCH |
| `operations/video-qa/episode-03-full-v13-cue30-law-library-repaired-manifest.json` | `515d930aa8e6e6297dfbfa99d4ee9932718626adae22a4c574d6855ebe384c40` | MATCH |
| `operations/video-qa/episode-03-full-v13-cue30-law-library-repaired-qc.json` | `7b53d46928bb433e5b381f00165c719982f9c8a47001af18a7f570089059186c` | MATCH |

## Independent checks

| Gate | Result | Finding |
| --- | --- | --- |
| Full A/V decode | **PASS** | Native AVFoundation decoded all 31,438 video frames and 10,211 audio sample buffers; last video PTS 1047.900s, last audio PTS 1047.847s, container duration 1047.975s. No decode error. |
| Clock and frame count | **PASS** | 1920×1080 H.264/AAC source, 30 fps, 31,438 frames; container duration is the expected 1048.000-second programme clock rounded to the native container precision. |
| AAC lineage | **PASS** | Manifest/QC bind v13 to the v12 ADTS SHA `2c4a60d05e7e70a185e9db523c85900661964a45561c007b15bff4bc77907ba8` as byte-equal. The preserved source and new tuple bindings were recomputed. |
| Scope / cue boundary | **PASS** | Config binds exactly frames 16,950–17,309 (565.000–577.000 seconds) to the independently accepted 360-frame law-library loop. Prefix and suffix are declared v12-preserved; the reviewed pre/post boundaries remain coherent. |
| Cue-30 narration relevance | **PASS** | At 565–577 seconds, the law-library setting, CRT, papers, file-check posture, law volumes, and restrained banker-lamp/window motion correctly support “The machine spent the weekend in the library…” rather than introducing a generic office or unrelated scene. |
| Lettering cleanup | **PASS** | The previous malformed generated law-volume/document filler is absent from the replacement. The visible library carries ordinary readable volume treatment and no new pseudo-lettering is foregrounded. |
| Identity, style, location, motion | **PASS** | The heroine’s face, blonde hair with clips, pink cardigan, white top, R necklace, period CRT, law library, and preserved comic treatment are consistent. Start/mid/end inspection shows only subdued environmental lamp/window movement; no camera, body, text, or crop drift was observed. |
| Spoken-welcome ident retained | **PASS** | v13’s unchanged prefix carries the independently accepted v12 Episode 03 ident at the canonical 116.180–123.820-second spoken-welcome window. |
| External VTT static integrity | **PASS_STATIC_ONLY** | `assets/captions/episode-03.vtt` SHA `aed14506fe7d399f0a77c391fa1e046746a920d86b65880093b30f0fc83c66be`: 211 ordered, positive, non-overlapping cues; 0.000–1046.950 seconds, leaving a 1.025-second programme tail. |
| Exact player / audible witness | **HOLD** | `watch.html` still defines `EPISODE_FILMS = {}`. v13 is not bound to any representative film player, so its actual video/VTT interaction, keyboard, reduced motion, no-JS/failure state, and normal-speed unmuted full-title watch cannot be claimed. |

## Reason-coded disposition

- `PASS_HASH_BOUND_TUPLE`
- `PASS_FULL_AVFOUNDATION_DECODE`
- `PASS_CLOCK_AND_AAC_LINEAGE`
- `PASS_CUE30_SEMANTIC_REPAIR`
- `PASS_CUE30_LETTERING_CLEANUP`
- `PASS_ACCEPTED_SPOKEN_WELCOME_IDENT_RETAINED`
- `PASS_EXTERNAL_VTT_STATIC_STRUCTURE`
- `HOLD_EXACT_V13_REPRESENTATIVE_PLAYER_PROOF_MISSING`
- `HOLD_HUMAN_FULL_1X_UNMUTED_AUDIBLE_WATCH_MISSING`

## Next action

Build an **isolated, non-public representative-player harness** bound to this exact v13 MP4 and the existing external VTT. Then independently test normal playback, captions, keyboard, reduced motion, no-JS/failure behavior, and obtain the assigned human full-title 1× unmuted audible-watch witness. Do not change public `watch.html`, promote media, or treat this cue-level acceptance as a release approval.

## Authority and learning scan

No site, media, public-player, deployment, release, or spend authority was used. No new qualifying learning item: this applies the existing rule that a successful bounded visual repair cannot erase an unproven film-player/audible-delivery gate.
