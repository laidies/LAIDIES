# EMQ-E03-V11-TITLE-IDENT-INDEPENDENT-JUDGE-2026-07-26

**Judge role:** Independent Episode Media Quality  
**Verdict:** **HOLD**  
**Scope:** immutable local review tuple only; no maker, site, public-media,
release, or deployment mutation.

## Frozen tuple verification

| Role | Path | Recomputed SHA-256 | Result |
|---|---|---|---|
| Candidate MP4 | assets/video/episode-03-full-v11-title-ident-inserted-review.mp4 | 2f20bede29bb4d86b15718b23198626adfde50fe5885dc0baf72b04073fdf66c | MATCH |
| Maker manifest | operations/video-qa/episode-03-full-v11-title-ident-inserted-manifest.json | e1389339fc98b2bb2afa2c377e72fcc01cff71de591e457488bf16b1481f02a7 | MATCH |
| Maker QC | operations/video-qa/episode-03-full-v11-title-ident-inserted-qc.json | 43e921472f649b2240b8d2017906b3251bd2af2cc48531fbd258ef214f099cfb | MATCH |
| Frozen v10 source | assets/video/episode-03-full-v10-source-reconciled-review.mp4 | c5dcee69c40e50d834dcc8f471eae9d621f531b37653de9eaef7bf5e362fd239 | MATCH to v11 manifest |
| Exact title ident | operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-03-the-burn-book-problem-v1.mp4 | 748faf81d9a4c3950946a455c35b7df06a44fb267505c6839ccff0d80d66de52 | MATCH to v11 manifest |

## Mechanical verification

- Full independent A/V decode: **PASS**.
- Both v10 and v11: H.264 High, 1920×1080, 30 fps, 15,360 tbn; AAC-LC mono,
  44.1 kHz; runtime 1048.00 seconds.
- Independently extracted AAC ADTS elementary streams are identical:
  2c4a60d05e7e70a185e9db523c85900661964a45561c007b15bff4bc77907ba8.
- The maker-declared replacement interval is exactly 109.000–115.480 seconds
  (6.480 seconds); the builder structurally trims the v10 picture before and
  after that interval, scales the named ident, and maps the original audio.
- Boundary inspection found a visible hard transition into the ident at the
  declared start and a visible hard transition out at the declared end. The
  ident end frame visibly reads LAiDIES / EPISODE 03 / THE BURN BOOK PROBLEM;
  it is the correct title-specific source, not a general series ident.

## Gate failure — canonical spoken timing

This is a **genuine timing/semantic defect**, not a taste decision.

The canonical Episode 03 timing map and VTT bind the spoken line “Welcome back
to LAiDIES …” to **116.180–123.820 seconds**. The candidate instead shows the
title-specific ident from **109.000–115.480**, ending 0.700 seconds *before*
the spoken welcome begins. The underlying v10 welcome picture then reappears.

The interval is internally exact to the maker’s 109.000–115.480 declaration,
but it is not the narration-accurate welcome-ident interval. Consequently this
candidate cannot be ACCEPTED as an Episode Media Quality successor.

## Preservation boundary

Audio and total runtime are independently preserved. The source/candidate
build graph confines the intended picture substitution to the declared 6.480
seconds, and boundary samples are consistent with the source picture resuming
after 115.480. Because the picture stream was re-encoded and this review did
not establish a complete normal-speed, full-film semantic watch, that limited
structural/boundary evidence is **not** an independent acceptance of every
out-of-scope semantic frame or cut.

## Smallest compliant repair and retest

Do not overwrite v11. Create a new review tuple that binds the title-specific
ident to the canonical spoken interval beginning at 116.180 and declares how
the full 116.180–123.820 interval is filled (the incoming 6.480-second ident
is shorter than the 7.640-second spoken interval). Then independently retest
the two boundaries, full decode, runtime, AAC elementary-stream identity,
caption/narration alignment, and out-of-scope continuity.

**Acceptance boundary:** this report is a HOLD only. It grants no release,
deployment, public availability, or maker self-acceptance authority.
