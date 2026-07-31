# Episode 02 v19 welcome-ident successor

**Status:** BUILT LOCALLY — REVIEW REQUIRED / NOT ADMITTED / NOT PUBLIC

## Literal, bounded change

The frozen Episode 02 v19 review master is retained before `01:31.340` and
after `01:38.590`.  Only its picture in that canonical Episode 02 VTT/timing-map
interval is replaced by the exact title-specific motion ident:
`continuous-i-episode-02-tell-me-what-you-want-v1.mp4`.

The 6.480-second source is scaled from 960×540 to 1920×1080 with no crop, then
its final decoded frame is held for 0.770 seconds to occupy the complete
7.250-second spoken interval.  The frozen v19 AAC elementary stream is copied
unchanged.

## Exact review artifacts

- Full local review master: `assets/video/episode-02-full-v19-welcome-ident-v1-review.mp4`
  — SHA-256 `5b9c98281d292b18ef4e70edc023a4c322add94bfe3b7e82e7d8e3dab691191b`
- 88–102 second review window:
  `operations/video-qa/episode-02-v19-welcome-ident-v1/episode-02-welcome-ident-review-window-88-102.mp4`
  — SHA-256 `68508c982daa77ded6c45820e8c4895e386facc2eb0ecfff998cb64fa2a945b1`
- Frozen baseline: `assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4`
  — SHA-256 `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3`
- Exact ident: `operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-02-tell-me-what-you-want-v1.mp4`
  — SHA-256 `ea5addbad951281602373cfde8d4264326e557a57b63ea2df218d0697316f138`

## Mechanical verification

- Complete A/V decode: PASS.
- Runtime preservation: PASS.
- Candidate video: H.264, 1920×1080, 30 fps, timebase 15360.
- Frozen-v19/output AAC ADTS SHA-256 (both):
  `ef3754574b72fce8fba9bfad5545efc65c6062dcbd0c72b5590de0ee9d1a014e`.

## Independent acceptance remains required

Named evidence target:
`operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-welcome-ident-v1-independent-judge-2026-07-26.md`.

The independent EMQ reviewer must watch the full film at normal speed and
check the two insertion boundaries, ident legibility, narration/VTT alignment,
and out-of-scope continuity. This maker record is not acceptance, release,
deployment, or public availability evidence.
