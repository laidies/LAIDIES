# Episode 03 v9 visual QA

Date: 2026-07-24

## Review source

`assets/video/episode-03-full-v9-controlled-motion-review.mp4`

This is the current controlled-motion **review cut**, not a final release
master.

## Technical evidence

- QC: `operations/video-qa/episode-03-full-v9-qc.json`
- motion measurement:
  `operations/video-qa/episode-03-full-v9-motion-measure.json`
- 1920 × 1080 H.264/AAC, 30 fps
- 17:28 runtime
- full decode passed
- 49 placements
- 29 motion placements
- 610.9 motion seconds, or 58.3% of runtime

## Visual evidence

- `episode-03-v9-keyframes.png` compares representative title, character,
  concept, transformation, and next-week frames.
- `episode-03-v9-transition-proof.png` shows before/blend/after samples at
  177.95–178.36 seconds and 443.95–444.36 seconds.
- Both sampled 0.35-second alpha transitions read as intentional blends with
  no black flash, edge reveal, or composition jump.

## Motion evidence

Known-still controls remain at or below the measured noise floor:

- welcome card: peak difference 4, 0% changed pixels
- cocktail card: peak difference 0, 0% changed pixels
- next-week card: peak difference 1, 0% changed pixels

All representative intended-motion samples clear that floor, including the
cold-open screen, transformation event, Bethany ambient loop, verification
camera move, Move One camera move, and receipts-pass ambient loop.

## Creative boundary

- authoritative v8 content and timing are preserved;
- faces, bodies, type, and props were not regenerated or warped;
- the added camera move is a restrained centred 1.6% move on selected
  non-emphasis scenic/concept frames;
- emphasis, title, reading, and welcome frames remain still by design;
- the shared “Welcome back to LAiDIES” visual is still awaiting owner approval
  and is not yet inserted.
