# Chick Flicks Listen full-page design QA — 2026-09-04

## Reference and candidate

- Homepage reference at 1280 × 900: `08-homepage-reference-colours.png`
- Listen arrival at 1280 × 900: `09-listen-after-desktop-top-1280.png`
- Listen player at 1280 × 900: `10-listen-after-desktop-player-1280.png`
- Same-viewport comparison: `11-homepage-listen-comparison.jpg`
- Phone arrival at 390 × 844: `06-listen-after-phone-top.png`
- Phone player at 390 × 844: `07-listen-after-phone-player.png`

`01-listen-before-fullpage.jpg` is retained only as diagnosis of the wrong
worktree that temporarily occupied port 4174. It is not the incumbent design.
`03-correct-worktree-listen-before-fullpage.jpg` is the actual pre-correction
Listen page.

## Visible review

- The Listen page no longer inherits the black or near-black Watch auditorium.
- Homepage dark ink remains readable on the cream, coral-pink, cyan, sky,
  periwinkle, mint and gold surfaces; ordinary Listen UI does not use white.
- The approved Episode 04 VHS cover remains the dominant episode object in both
  the arrival and player.
- The full-width `Start Episode 04` action is visible without scrolling at
  1280 × 900 and 390 × 844.
- The player repeats a labelled `Play audio` action and the stage says
  `Now listening`; Watch remains a separate format choice.
- The programme shelf stays horizontally navigable on phone without page-level
  horizontal overflow.
- The six Special features links remain visible, distinct and operable.
- No cropped cover, overlapping action, unreadable text or broken responsive
  layout is visible in the reviewed states.

## Functional evidence

- Clicking `Play audio` changed the real transport label to `Pause audio`.
- Pausing changed it to `Continue audio`.
- Phone page-level horizontal overflow measured `0` CSS pixels.
- Rendered Listen auditorium: `#57b6c0 → #8bbde9 → #b3abe7`.
- Rendered Listen stage: `#c96652 → #db7581 → #e982ab`.
- Visible white text was limited to the shared header's skip link and Join
  control; no Listen-content surface used it.

final result: passed
