# Episode 04 v11 wardrobe-transition owner handoff

**Evidence time:** 2026-08-17 07:40 PDT

**Status:** BUILT LOCALLY / TECHNICAL VALIDATION PASS / INDEPENDENT REVIEW PENDING

**Release truth:** NOT INTEGRATED, DEPLOYED, PUBLISHED OR PUBLICLY VERIFIED

## Literal output

- Candidate: `assets/video/episode-04-full-v11-wardrobe-transition-review.mp4`
- Candidate SHA-256: `1b38963e482f735b9501f24b99f672c895baf7069ac0fbbdb9df3580891a40aa`
- Runtime: 1222.34 seconds; 1920x1080; 30 fps; H.264 video; AAC LC 48 kHz mono audio
- Mechanical validation: `operations/video-qa/episode-04-v11-wardrobe-transition-review/validation.json`

The candidate replaces only program frames `[5861,6107)`, or
`195.366667-203.566667`, with the admitted Canva-authored wardrobe-transition
source. The exact source is
`assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816/_rough/ep04-transformation-season-wardrobe-v11-canva-designed-title-dotted-i-source-with-handle.mp4`,
SHA-256 `e8e2323bf1f0286f2f23ddd375b9463567a0dfb21b37e725f3535a631f829094`.
It uses source frames `[0,246)` without retiming. The source includes the
front-facing Heroine, episode wardrobe rail and designed `NOW ENTERING
SUNNYVAiLE` dotted-i threshold title.

## Bound parent and retained work

- Parent: `assets/video/episode-04-full-v10-repaired-review.mp4`
- Parent SHA-256: `9fc40d965cf67e089f6e2f540405ba0b3ae833fe6532d2cbb1831a5903d57bfb`
- Parent and candidate decoded-audio payload SHA-256:
  `1d3e61c6ab7ed37e3564f3114a8b13666edf8b5f49880aef8b8a2e70d6c6cf2e`

Full decode passed. The pre-occurrence frame, replacement sequence, designed
title and first post-occurrence frame were decoded and inspected. The parent
narration audio payload is byte-identical. This is integrity and maker
inspection, not a quality verdict.

## Rejected attempt and prevention

The first CapCut export was rejected internally because CapCut 9.2.8 beta added
a visible editor watermark. Rejected file:
`assets/video/_rejected/episode-04-full-v11-wardrobe-transition-review-capcut-watermarked.mp4`,
SHA-256 `330a52c27b0d1a4ca3656b8942f41c2d47a389c01677bf9c70524c869454b0de`.
It is not a candidate. The watermark-free successor renders the exact CapCut
placement from already-approved media; code authored no image, title or motion.

## Lock, acceptance owner and next trigger

Two role-distinct judge dispatches failed at the reviewer service boundary with
`Bad Request`; neither produced a verdict. Per the two-cycle stop rule, this
approach is stopped rather than retried or self-approved.

The candidate remains HOLD until Episode Media Quality independently watches the
exact hash start-to-finish at normal speed with sound and external captions,
judging the wardrobe transition, narration-picture meaning, visual continuity,
timing, opening/closing credits and full-title defects. The next trigger is a
working independent-review channel. An ACCEPT would admit only this local review
candidate to the next release-control step; it would not authorize site changes,
deployment or publication.

No canon, narration, captions, site, live player, release state, account,
credential or public asset was changed. No spend or Ali release authority was
used.
