# EMQ Episode 01 v25 welcome-ident — independent judge

**Task ID:** `EMQ-E01-V25-WELCOME-IDENT-INDEPENDENT-JUDGE-2026-07-26`  
**Judged:** `2026-07-26`  
**Scope:** exact local review successor only; no release, deploy, or public conclusion  
**Verdict:** **HOLD**

## Exact tuple

| Artifact | SHA-256 | Result |
|---|---|---|
| Candidate `assets/video/episode-01-full-v25-welcome-ident-review.mp4` | `486bb908a2faa26efee61d0689a7e97180b1f12aa628a04a6b4ad76edf43b633` | matched |
| Frozen v24 `assets/video/episode-01-full-v24-source-reconciled-review.mp4` | `272d370ee741d777bc355ea869e63bf4541e0765d3be7bcca286ad79c4c7a53e` | matched |
| v25 manifest | `3f10301e1fbe44b92ad9ef15ffb86570e21ae724302c2516addc9151930bdd2e` | matched |
| Maker QC | `7efbfeba41167f7e5c069b8b2194290728424e8d59e30367cc653ce5d4d41ed4` | matched |
| Exact Episode 01 ident | `8f48e020025d34e041e1170a96801d4852c1abf204162398e3f41faf50452f85` | matched |

## Independent checks

- **[PASS_HASH_BINDING]** The requested candidate, frozen baseline, manifest, maker QC, and named exact Episode 01 ident all resolve to their supplied hashes.
- **[PASS_IDENT_TITLE_SPECIFIC]** The named source is the Episode 01 ident and visibly resolves to `LAiDIES / EPISODE 01 / ON WEDNESDAYS WE DO AI`; it is not a trailer or another episode's card.
- **[PASS_SEMANTIC_WINDOW]** The authoritative external VTT and timing map bind the entire spoken welcome cue to **93.900–101.920**. The candidate contains the ident across that window. The declared motion interval is 93.900–100.380 (6.48 s), followed by the declared 1.54 s terminal-frame hold.
- **[PASS_TERMINAL_HOLD]** Decoded `freezedetect` finds the held terminal state at 100.400–101.900. At the 30-fps output grid those are the realizable first/last held frames; the next frame is after the 101.920 semantic end. Thus the terminal image covers the required cue without an early v24-picture return.
- **[PASS_AUDIO_EXACT]** Independent raw ADTS stream-copy extraction produced identical candidate/baseline payloads: SHA-256 `0572c2c9f1d568004155684ecf155f702af4d9b31a7eac57a12eca88d385db24`, 27,438,977 bytes each; byte comparison passed.
- **[PASS_FULL_DECODE]** Candidate audio/video decode passed without errors in four contiguous independent ranges: 0–300, 300–600, 600–900, and 900–1172.23 seconds.
- **[PASS_BOUNDARY_AND_SCOPE]** Visual inspection confirms a clean incoming ident, a terminal held card, and the original Blend & Snap picture immediately after the cue (102.000 s), matching the corresponding frozen-v24 image semantically. Out-of-scope comparison is consistent with the declared unavoidable H.264 re-encode variance (pre-window SSIM 0.999223; post-window full-tail SSIM 0.992861); no additional picture substitution was observed.
- **[PASS_VISIBLE_INSERTION_QUALITY]** The ident is full-frame 1920×1080 in the successor, legible, undistorted, and free of black frames, crop/aspect failure, or boundary flash in the reviewed 90–105 second window.

## HOLD reasons

The welcome-ident operation passes its bounded successor checks. It does **not** erase the frozen-v24 full-film ruling, which is carried forward because the candidate deliberately preserves every other picture and the original audio.

1. **[HOLD_INHERITED_V24_MODERN_LAPTOP]** The unchanged Blend & Snap source remains in v25 at the three previously confirmed occurrences (v24 placements 29, 30, 61). Its slim modern laptop conflicts with the 1999 SUNNYVAiLE technology rule.
2. **[HOLD_INHERITED_V24_MASTER_PEOPLE_STYLE_DRIFT]** The unchanged scenic sources previously confirmed off-register against the locked people/graphic-novel system remain in the successor.
3. **[HOLD_EXACT_PLAYER_PROOF_MISSING]** The exact candidate checksum is still not bound to the public/review player for the previously required representative keyboard, mobile, reduced-motion, caption, and failure-recovery runs. This judge did not mutate that binding.

## Ruling

**HOLD — successor operation accepted locally, whole-film admission withheld.** The exact welcome-ident insertion is eligible to carry forward unchanged into the next clock- and audio-preserving Episode 01 repair cut. The next work remains image production/admission for the inherited v24 blockers, followed by exact-player proof. This report makes no release, deploy, or public claim.

## Learning scan

No new painpoint entry is required. This is a controlled successor check, and its HOLD is the direct carry-forward of existing prevention rules BTB-094/BTB-095: an accepted bounded insertion cannot silently reclassify unchanged full-film defects as fixed.
