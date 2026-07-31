# EMQ — Episode 03 Cue 30 law-library motion, independent judgment

**Date:** 2026-07-26  
**Judge role:** independent Episode Media Quality semantic-motion judge (not maker)  
**Scope:** the exact source-motion MP4 below, for Cue 30 only. This does not accept an assembly, Episode 03 v12, audio, captions, ident, master, player, release, deployment, or public availability.

## Verdict

**ACCEPT — SOURCE MOTION ONLY, checksum-bound.** The exact candidate realizes the authorised 12-second environmental loop: a restrained green banker’s-lamp flicker and sparse dust glints in the window-light shaft. It has a seamless zero-net return, and the full decoded record proves all pixels outside the authorised lamp/window masks are exactly static. There is no camera, Heroine, face, body, paper, book, CRT, keyboard, text, crop, or composition motion.

This admits only this MP4 as an independently judged source-motion candidate for Cue 30. It does not erase the Episode 03 v12 full-title **HOLD**, including the still-open exact-film player proof, and does not make any assembly or release claim.

## Exact binding

| Artifact | SHA-256 verified by this judge | Result |
| --- | --- | --- |
| Candidate `assets/episodes/ep-03/comic/delivery-20260726-cue30-law-library-repair-v1/ep03-cue30-law-library-lamp-dust-zero-net-loop-v1.mp4` | `6a3a6e936eb025820e261eed8ef147d7ae8d9097c3fb6bdc3c2a30754072d6bf` | matched |
| Maker technical QC `assets/episodes/ep-03/comic/delivery-20260726-cue30-law-library-repair-v1/ep03-cue30-law-library-lamp-dust-zero-net-loop-v1-qc.json` | `2a9210a2e2fedefce9cc3d1168f5173d981b2eb13ffcbb71f1c4fee5c5c00cf7` | matched; independently rechecked |
| Accepted source-plate judgment (MD) | `f56dc631d3ac7ee0bc1da3f07cf37e0b7ed3e04bf18135edeaad15e29a5ae52f` | matched |
| Accepted source-plate judgment (JSON) | `82b5e44aad6cbc6d513349e8c2adabf58576a8fc075b26a1bdffbb26b2169f20` | matched |
| Source plate bound by maker QC | `d0f2a078e795b052bdaaabad6aff8de51c4d66d5d53366d7bdd64e57a37c7b2a` | accepted source lineage retained |

## Independent checks

| Gate | Result | Evidence / finding |
| --- | --- | --- |
| Cue contract | **PASS** | Cue 30, 565.000–577.000 seconds: “The machine spent the weekend in the library…”. The authoritative spec calls for a looping law-library green banker’s-lamp flicker and dust in window light. |
| Stream/timing | **PASS** | Full FFmpeg decode completed without error: 1920 × 1080, progressive H.264, 30 fps, 360 video frames, 12.000 seconds, no audio stream. |
| Seamless zero-net return | **PASS** | Decoded frame 0 and frame 359 are raw-RGB identical: `76867360c259c7d927969fb123a63c0dbc0809ead958fedf45b8036162ef25a0`. Extracted PNGs for those frames were also byte-identical: `da7d7969a65be9dd06aa7548d4adc6bd8241f07448d6b1d73bc4dcaddcabcb7f`. |
| Full-record motion confinement | **PASS** | I compared every decoded frame against frame 0. Outside the authorised masks `[0,215,410,425]` (lamp) and `[1490,225,1785,375]` (window shaft): changed-pixel sum `0`, peak absolute RGB difference `0`. This rules out camera, Heroine/body/face, papers, books, CRT, keyboard, text, crop, and composition drift. |
| Authorised motion present | **PASS** | Inside the masks, the ≥2-level changed-pixel union is 60,657 pixels (2.925203% of the frame); peak difference is 30 RGB levels. Motion occurs in 357/360 frames at ≥2 levels and 256/360 at ≥16 levels. |
| Semantic motion at normal playback | **PASS** | First/mid/last frames and a seven-sample 0/2/4/6/8/10/11.967-second contact inspection show a gentle cyclical brightening/dimming confined to the lamp shade/pool and sparse glints confined to the cool window shaft. The change is visible enough to prevent a dead 12-second still, but remains subdued and environmental; it does not read as camera drift, compression shimmer, or subject/text movement. |
| First/mid/last inspection | **PASS** | Frame 0 RGB SHA-256 `76867360c259c7d927969fb123a63c0dbc0809ead958fedf45b8036162ef25a0`; frame 180 `76ad1d022a9169e7ed3032cc2639fe9a99cdfa0eed4f8ddde3c4fec05a1792c5`; frame 359 repeats frame 0 exactly. Full-size decoded views retain the admitted still’s law-library composition and static subject/property geometry. |

## Admission limits and next gate

- This ruling accepts only the exact source-motion MP4 above for the source-level Cue 30 motion contract.
- Any byte change, re-encode, crop, timing change, assembly placement, or different source requires the applicable fresh binding and review.
- It does not update the v10 placement manifest or v12 master. It does not clear `HOLD_INHERITED_E03_CUE30_MALFORMED_LETTERING` on v12 until an authorised assembly actually binds this accepted source-motion asset, and it does not clear `HOLD_EXACT_FILM_PLAYER_PROOF_MISSING`.
- The next applicable gate is an authorised assembly/replacement binding followed by independent exact-film/player proof; no release or public claim follows from this source-motion verdict.

## Learning scan

No qualifying new failure, surprise, non-obvious fix, or reusable success arose. BTB-189 remains correctly applied: an encoded motion file must be completely decoded and independently judged before it can be represented as motion-ready.
