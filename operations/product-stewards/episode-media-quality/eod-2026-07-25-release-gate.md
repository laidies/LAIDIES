# EOD episode-media release gate — 2026-07-25

**Status:** REPORT READY · ALL PROMOTED MOTION PRODUCTS HOLD
**Scope:** trailer and Episodes 1–4 media only; no `watch.html`, deployment,
hosting, commit or push changes.

## Release-control verdict

| Product | Exact strongest candidate | Verdict | Smallest remaining gate |
|---|---|---|---|
| Trailer | `assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v2-repaired-review-1920.mp4` · SHA-256 `04dff196e77d08da48a0797013a801634372c401220b062c2c8e06fd88abf4c7` | **HOLD** | Complete SHA-bound 58-beat normal-speed owner/judge watch, narration-picture/caption check and identity/location/style ruling remain absent. |
| Episode 01 | `assets/video/episode-01-full-v23-eod-style-repair-review.mp4` · SHA-256 `fecb91ede6dd5477a911544b2f76d4eca8ff71c545fd85a456a19a663ccaa41c` | **HOLD** | The three confirmed source-level style failures are replaced and the full file decodes, but the other 68 placements have not received an independent full-size style/identity/location/narration/caption judgment or a normal-speed audiovisual owner watch. |
| Episode 02 | No repaired master; v17 remains the last complete review cut, SHA-256 `97b26ce9455f3a46d2f17130c57d96182dd55aedf77420c0cdc590e6481074b6` | **HOLD** | Cue 13, 187.60–203.30, is confirmed painterly. Both semantically exact existing comic café alternatives are globally rejected; no safe non-rejected replacement spans the regular-café → new-café narration transition. |
| Episode 03 | `assets/video/episode-03-full-v9-controlled-motion-review.mp4` · SHA-256 `7a656f43b1c207f7121e9b4ba7434321be03137f9a74551991a96156b986a474` | **HOLD** | Existing July 25 evidence sampled frames only; full narration/caption/identity/location/style owner watch remains open and camera movement cannot clear semantic motion. |
| Episode 04 | `assets/video/episode-04-full-v8.mp4` · SHA-256 `e5d963097cbd699a5f7ad999f29323207ce5c41c4ba5ff45422e12ea35c2bdff` | **HOLD** | Full normal-speed owner watch, historical-person identity/era review, audio/caption check and readable motion-control evidence remain open. |

No motion film is safe to promote publicly from this lane. Retain the truthful
listen-along-only public promise.

## Episode 01 v23 maker evidence

### Exact replacements

The machine-readable authority is
`eod-2026-07-25-replacement-manifest.json`.

- cue 4, 27.50–42.20: painterly Steve meeting →
  `ep01-steve-ovation-c-end-comic-textfix.png`;
- cue 6, 56.90–74.40: painterly heroine/footnotes office →
  `ep01-steve-ovation-c-end-comic-textfix.png`;
- cue 12, 143.00–160.80: repeated failed office source →
  `ep01-cue-11.png`, the narration-matched “putting-it-off era” card.

The first v22 repair tried the ovation frame at cue 12. Rendered-sheet review
rejected that substitution because the narration had already moved to doing
nothing for six months and putting the problem on a list. v22 is therefore
**SUPERSEDED — DO NOT RELEASE**.

### Technical proof

- Original narration SHA-256:
  `3f69c2f11a479502fe29f087cc1efbe3824cddb78447989bb0a2c88096210184`.
- Cue clock: unchanged 71 placements; runtime requested 1172.24 seconds.
- Rendered runtime: 1172.23 seconds, within the assembler's 0.03-second gate.
- Full decode: passed.
- Delivery: 1920×1080, 30 fps, H.264 + AAC, no burned captions.
- Motion: zero moving placements; all legacy camera drift disabled.
- Transitions: original 0.35-second alpha blends retained without changing cue
  starts.
- All 71 rendered midpoint frames were extracted into four SHA-bound owner
  continuity sheets. Maker inspection confirmed the corrected cue 4, 6 and 12
  frames render at the intended locations.

This is **BUILT LOCALLY** with technical verification and a maker frame pass.
It is not owner approval or independent Image Quality Judge / Release QA
approval.

## Episode 02 exact repair state

The replacement manifest resolves four observed failed placements without
using rejected assets:

- cue 0 → `ep02-open-01-previously-strip-comic.png`;
- cue 4 → `ep02-open-04-cold-open-desk-comic.png`;
- cue 5 → `ep02-open-05-throw-pillow-comic.png`;
- cue 6 → `ep02-open-06-thinking-closeup-comic.png`.

The build wrapper refuses to render Episode 02 while cue 13 is unresolved.
This is intentional release control. It prevents the maker from silently
choosing either globally rejected exact café frame or a non-rejected but
narratively wrong substitute.

## Maker/judge separation

**Maker evidence completed:** source inventory, rejection check, exact overlay
manifest, clock-preserving v23 encode, full decode, no-drift verification and
71-frame rendered contact review.

**Judge evidence still required:** independent full-size identity/style/location
comparison; full normal-speed audiovisual continuity watch; every-cue
narration relevance; as-recorded narration/VTT/player caption sync; public
player proof only after a release ruling.

## Files created by this lane

- `assets/video/episode-01-production-cues-eod-20260725-style-repair.json`
- `assets/video/episode-01-full-v22-eod-style-repair-review.mp4`
  — superseded failed semantic substitution; do not release
- `assets/video/episode-01-full-v23-eod-style-repair-review.mp4`
- `operations/tools/build-eod-episode-style-repair.py`
- `operations/product-stewards/episode-media-quality/eod-2026-07-25-replacement-manifest.json`
- `operations/product-stewards/episode-media-quality/eod-2026-07-25-release-gate.md`
- `operations/product-stewards/episode-media-quality/evidence-2026-07-25/episode-01-full-v22-eod-style-repair-qc.json`
- `operations/product-stewards/episode-media-quality/evidence-2026-07-25/episode-01-full-v23-eod-style-repair-qc.json`
- `operations/product-stewards/episode-media-quality/evidence-2026-07-25/episode-01-v22-eod-style-repair-visual/`
- `operations/product-stewards/episode-media-quality/evidence-2026-07-25/episode-01-v23-eod-style-repair-visual/`

## Learning scan

BTB-094’s prevention rule was exercised and extended by the v22 rejection:
source-level style compliance is insufficient; the rendered replacement must
also be inspected against the narration at that exact clock position. BTB-095
records the reusable failure and prevention rule.

## Next action

Create one non-rejected, locked-style Episode 02 café transition frame that
visually carries both halves of 03:07.60–03:23.30 without baked text. Then run
the same no-drift, exact-clock build and independent judge/full-watch gates.
