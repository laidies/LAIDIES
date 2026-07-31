# LAiDIES all-comic trailer v2 — isolated replacement log

**Date:** 2026-07-24  
**Status:** review-cut preparation; nothing here is mapped to the public site yet

The later 58-beat all-comic trailer remains the structural source. This pass
does not redesign or re-time the film. It replaces five named failed/off-brand
beats at their exact existing durations and preserves the other 53 clips plus
the current narration/audio.

## Replacement decisions

| Beat | Existing problem | Replacement source | Decision |
|---|---|---|---|
| B19 | Four women in matching pink suits read as MAiVENS and were explicitly rejected | `assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-title-comic.png` | Reuse the real Episode 01 comic title art; do not generate another group portrait |
| B42 | Foreground Delta LAi Nu host looked off-putting and did not belong | `assets/episodes/trailer/comic/trailer-b42-delta-lai-nu-hall-empty-comic-candidate-v2-1920.png` | Remove the rejected host/sign and retain the useful hallway/common-room scene |
| B55 | Obsolete `Ladies.AI` wordmark | `assets/episodes/trailer/comic/trailer-b55-brand-card-approved-wordmark-candidate-v3-1920.png` | Use the real approved LAiDIES wordmark on a mature comic title-card background |
| B57 | Incorrect title `ON WEDNESDAYS WE USE AI` | `assets/episodes/trailer/comic/trailer-b57-next-week-teaser-do-ai-candidate-v2-1920.png` | Correct only the title to `ON WEDNESDAYS WE DO Ai` |
| B58 | Obsolete `.ladies.AI` wordmark | `assets/episodes/trailer/comic/trailer-b58-end-card-dial-up-no-obsolete-wordmark-candidate-v2-1920.png` | Remove the obsolete wordmark and retain the dial-up postcard close |

## Build and QA

Builder:

`operations/tools/assemble-trailer-comic-v2.py`

Planned review film:

`assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v2-repaired-review-1920.mp4`

Planned report:

`operations/video-qa/trailer-comic-v2-repaired-review-qc.json`

The builder:

- refuses to overwrite existing clips, manifests, films, or reports;
- probes and preserves each replaced clip's exact duration;
- renders all replacements at 1920×1080, 30 fps, H.264 High;
- reuses the existing 58-beat manifest order;
- copies the current all-comic trailer's audio without modification;
- performs a full video+audio decode before writing the QA report;
- marks the result as review-only and does not change `watch.html`.

## Open release decisions

- The v2 review cut still needs keyframe/transition inspection and an owner
  continuity pass before site promotion.
- The shared `Welcome back to LAiDIES` frame remains unapproved and is not part
  of this trailer replacement set.
- External large-video hosting remains unresolved; GitHub Pages is not the
  delivery surface for these files.
