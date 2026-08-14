# Invalidated visual pass — August 12 Daily work-logs render

**Status:** REJECTED VISUAL EVIDENCE — DO NOT BIND OR RELEASE
**Inspected:** 2026-08-14 America/Vancouver
**Scope:** exact 1440, 390 and 320 pixel renders in this directory

The prior `independent-visual-judgment-v1-pass.json` is invalid. Its prompt
excluded the current decisions, original NewsStand brief, page architecture and
same-viewport incumbent. It judged basic legibility and overflow, so it could
not detect that the candidate implemented the wrong product experience.

## Visible failures

- The page is a single article reader, not the complete Daily newspaper Ali
  specified. It has no front-page lead/secondary hierarchy, recurring Daily
  departments or governed empty-state treatment.
- `Pulled from the rack`, `Put the paper back` and `Inside the paper` preserve
  the superseded rack/reader grammar instead of opening directly as The Daily.
- At 1440 pixels, the oversized `INSIDE THE PAPER` and article headline consume
  most of the first viewport. At 390 and 320 pixels, navigation, rack language,
  the generic paper masthead and a tightly stacked headline dominate before the
  reader reaches useful reporting.
- The pale pink/cream ruled sheet, heavy condensed headlines and boxed jump
  treatment are mechanically newspaper-like but do not deliver the colourful,
  vibrant LAiDIES Daily world or clear multi-element paper Ali requested.
- The render proves that the article can be read without horizontal overflow.
  It does not prove correct NewsStand information architecture, visual quality,
  complete-issue hierarchy or LAiDIES world fit.

## Prevention

`scripts/run-independent-visual-judge.mjs` now refuses the former invocation.
It requires three same-viewport incumbent images plus the current decisions,
original brief and page architecture, and a PASS is impossible with any visible
regression or locked-decision violation.

The exact prose remains a separate held story candidate. It was shortened from
1,349 to 888 Markdown words under the repaired producer-side Daily budget. The
old `independent-semantic-judgment-v2-pass.json` is therefore also stale: it is
bound to the predecessor prose bytes and predates `CQX-BAD-015`. It cannot be
used as current semantic admission. This rejected render is removed from the
current manifest and producer-review binding. No public data, deployment or
live page was changed.
