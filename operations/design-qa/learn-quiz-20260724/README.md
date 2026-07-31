# Pop Quiz v2 QA

Date: 2026-07-24

## Source capture

- `source-desktop.png`

## Implementation captures

- `desktop-arrival.png`
- `desktop-register.png`
- `desktop-paper.png`
- `mobile-arrival.png`
- `mobile-register.png`
- `mobile-paper.png`

## Required comparisons

- `before-vs-after.png`
- `style-lock-vs-implementation.png`

The approved Episode 04 Heroine face is used only as the rendering-language
comparison. The current classroom remains a structural source.

## Checks

- 1440 × 900 and 390 × 844
- no page-level horizontal overflow
- zero broken loaded images
- five available quiz controls
- Episode 02 and Episode 04 papers opened successfully
- twelve questions loaded for each tested paper
- exactly one current and visible question after a paper is opened
- Next is disabled until the current question is answered
- answering enables Next
- Next advances the progress from question 1 to question 2
- Change paper returns to the room and five-paper register
- no score or reward was submitted during QA
- browser console contains no page errors

## Visual conclusion

The page now reads as a Wednesday exam ritual: classroom arrival, ruled paper
register, and a focused one-question-at-a-time scantron. It no longer reads as
a cream article followed by repeated quiz cards and twelve expanded forms.
