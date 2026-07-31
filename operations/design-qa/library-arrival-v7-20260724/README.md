# LIBRAiRY arrival v7 — implementation QA

**Date:** 2026-07-24  
**Result:** PASSED — WORKING DIRECTION  
**Open owner gate:** inherited LIBRAiRY book-cover palette

## Scope

The accepted v7 environment plate is integrated into `library.html` as one
responsive arrival scene. Exact `LIBRAiRY` branding, all three department
labels, fifteen book targets and the functional Miss Jeeves reference desk are
HTML layers. The bitmap is not being used as a sign writer or fake interface.

## Comparison result

`08-source-vs-implementation.jpg` compares the source plate (left) with the
desktop implementation (right) in one image.

- The room crop, three-bay shelves, Miss Jeeves, daylight atrium and carpet are
  preserved.
- The implementation intentionally adds the exact all-caps `LIBRAiRY` wordmark
  in Jost, with the complete adjacent `Ai` pair in raspberry.
- Department labels remain aligned to their physical bays.
- Miss Jeeves is a real form over the foreground carpet, not generated UI.
- No poster, fake banner, generated control or generated wordmark was restored.

## Responsive and functional checks

- Desktop 1458×872: arrival scene, book targets, Miss Jeeves, direct-answer
  result, focused sourced reader and full shelf reader passed.
- Tablet 768×1024: no horizontal overflow, no broken images, and the reference
  desk remains usable.
- Mobile 390×844: no horizontal overflow; real cover cards replace the tiny
  image-map targets; direct answer, sourced reader and full-book reader passed.
- All four shipped Miss Jeeves examples returned one direct answer followed by
  relevant learning paths.
- “will AI take my job?” no longer returns generic town-directory matches.
- “Read the sourced Jobs & Work answer” opens *Straight Answers About AI*
  directly at “Is AI replacing jobs right now?”
- One `h1`, one `main`, zero broken images and zero browser warnings/errors.
- `node scripts/check-inline-js.js`: PASS.
- `node scripts/check-town.js`: PASS.
- `node scripts/check-local-links.js`: PASS.
- `git diff --check -- library.html`: PASS.

## Evidence

- `01-desktop-arrival.jpg`
- `02-desktop-miss-jeeves.jpg`
- `03-desktop-focused-reader.jpg`
- `04-mobile-arrival.jpg`
- `05-mobile-direct-answer.jpg`
- `06-mobile-focused-reader.jpg`
- `07-mobile-full-book-reader.jpg`
- `08-source-vs-implementation.jpg`
- `09-tablet-arrival.jpg`

## Remaining visual gate

The environment and layered interaction pass. The book covers embedded in the
plate and used by the mobile catalogue still carry the inherited faded
schoolbook palette. The one-cover experiment in
`operations/design-explorations/library-book-palette-20260724/` is a palette
proof only and contains a baked checkerboard. It must not be bulk-propagated or
used as a production asset until Ali rules on the direction.
