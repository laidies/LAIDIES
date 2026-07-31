# EMQ Episode 03 v12 spoken welcome-ident — independent judge

**Task ID:** `EMQ-E03-V12-SPOKEN-WELCOME-IDENT-INDEPENDENT-JUDGE-2026-07-26`  
**Scope:** checksum-bound local review only; no media, site, release, deploy, or public mutation  
**Bounded ident-operation verdict:** **ACCEPT**  
**Full-title verdict:** **HOLD**

## Exact tuple

| Artifact | SHA-256 | Result |
|---|---|---|
| Candidate `assets/video/episode-03-full-v12-spoken-welcome-ident-review.mp4` | `4ed6057f151530c5ae760f72860718be1beda87076eb17e6cdfdfd1b7accef40` | matched |
| Manifest `operations/video-qa/episode-03-full-v12-spoken-welcome-ident-manifest.json` | `3b8a043c38fc56c7990a02011160d9fda16f2437500ace4d30c16aca2fc9766a` | matched |
| QC `operations/video-qa/episode-03-full-v12-spoken-welcome-ident-qc.json` | `4c9ce0c87b2ae9207809aa89d2e779a7873d2ab071701339111afa04ae9bd3b0` | matched |
| Frozen v10 picture/audio source | `c5dcee69c40e50d834dcc8f471eae9d621f531b37653de9eaef7bf5e362fd239` | matched to manifest |
| Exact Episode 03 ident | `748faf81d9a4c3950946a455c35b7df06a44fb267505c6839ccff0d80d66de52` | matched to manifest |

## Bounded ident-operation checks

- **[PASS_HASH_BINDING]** All named input and output hashes resolve exactly.
- **[PASS_TITLE_SPECIFIC_IDENT]** The named source visibly resolves to the Episode 03 title (`LAiDIES / EPISODE 03 / THE BURN BOOK PROBLEM`), not a series or another-episode ident.
- **[PASS_CANONICAL_SPOKEN_ONSET]** The canonical timing map and VTT bind the spoken welcome to **116.180–123.820**. v12 begins the ident at 116.180, correcting v11’s early 109.000–115.480 placement.
- **[PASS_COMPLETE_MOTION_AND_HOLD]** v12 uses the whole 6.48-second ident motion (116.180–122.660) plus the declared 1.16-second terminal hold. Decoded freeze detection finds the terminal still from 122.667 to 123.833—the exact 30-fps-grid realization—so it covers the 123.820 semantic end without an early source return.
- **[PASS_AUDIO_TIMELINE_EXACT]** Independent raw ADTS extraction is byte-identical between v12 and frozen v10: SHA-256 `2c4a60d05e7e70a185e9db523c85900661964a45561c007b15bff4bc77907ba8`, 23,315,863 bytes each. No audio retime or ident audio is present.
- **[PASS_FULL_DECODE]** Candidate A/V decode passed without errors in contiguous ranges 0–300, 300–600, 600–900, and 900–1048 seconds.
- **[PASS_BOUNDARIES_AND_SCOPE]** Visual inspection finds the v10 office picture immediately before the new onset, a clean ident/terminal hold, and the original v10 Welcome Back picture immediately after the cue. No out-of-scope semantic substitution or cut drift was observed. Whole pre-window and sampled post-window comparisons are consistent with re-encode-only variance (SSIM all: 0.997935 before; 0.997191 after).
- **[PASS_VISIBLE_INSERTION_QUALITY]** The insertion is 1920×1080, legible and undistorted; the reviewed boundaries contain no black frame, crop/aspect failure, or flash.

## Bounded ruling

**ACCEPT — the v12 spoken-welcome ident operation is corrected and may carry forward unchanged.** It remedies the v11 timing defect without changing the original audio or the out-of-scope story clock.

## Full-title HOLD reasons carried forward

This bounded acceptance is not a full-film or release admission. v12 deliberately retains the earlier title’s remaining defects:

1. **[HOLD_INHERITED_E03_CUE30_MALFORMED_LETTERING]** The unchanged cue-30 law-volume/document source with visibly malformed pseudo-lettering remains; the v10 independent judge classified this as a genuine visual-system failure.
2. **[HOLD_EXACT_FILM_PLAYER_PROOF_MISSING]** The exact checksum is not independently proven in the actual film-player journey. The v10 player findings remain: no film binding for the exact candidate, Space-key targeting the audio element rather than the dynamically created video, no film-specific load-failure fallback, and no representative desktop/mobile/reduced-motion/VTT/failure run.

## Route and learning scan

The next repair is the inherited cue-30 lettering source, followed by an exact-checksum player proof. No new painpoint entry is required: this is the direct successful application of the existing rule that a semantic welcome ident must begin on the spoken cue and that a bounded pass cannot erase unrelated full-title blockers. No release, deployment, or public claim follows.
