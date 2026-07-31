# Masthead aspect-ratio restoration — 2026-07-29

## Reported defect

The Homepage masthead had regressed to `min-height: calc(100vh - 76px)`. On a
tall desktop viewport this enlarged the masthead beyond the source artwork's
shape, cropped both sides of the MAiN Street image, and created excessive dead
space above and between the copy and action row.

## Correction

- Preserved the full-width masthead.
- Bound desktop and intermediate-width masthead geometry to the exact
  `1400 × 788` source-art ratio.
- Preserved the existing content-led mobile masthead below `821px`.
- Kept the approved image, copy, links, colour treatment and navigation
  unchanged.

## Verification contract

- Desktop: masthead ratio matches `1400 / 788`; no side crop caused by a
  viewport-height container.
- Intermediate: the same artwork ratio applies while the existing responsive
  typography and navigation rules remain active.
- Mobile: the existing compact content-led composition remains active.
- No live, shared, production or deployed file was changed.
