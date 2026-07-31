# SUNNYVAiLE High v2 QA

Date: 2026-07-24

## Source captures

- `source-desktop.png`
- `source-mobile.png`

## Desktop states

- `desktop-arrival-final.png`
- `desktop-homeroom-final.png`
- `desktop-corridors-final.png`
- `desktop-classes-final.png`

## Mobile states

- `mobile-arrival-final.png`
- `mobile-report-card-final.png`
- `mobile-yearbook-final.png`

## Required comparisons

- `before-vs-after.png`
- `style-lock-vs-implementation.png`

The approved Episode 04 Heroine face is used only as the rendering-language
comparison. The current school images remain structural sources.

## Checks

- 1440 × 900 and 390 × 844
- no page-level horizontal overflow
- zero broken loaded images
- six corridor controls
- exactly one room visible and one corridor control marked open after each
  selection
- direct `#report-card` arrival opens the Registrar
- all six rooms open and close in place
- 37 class links loaded from `content/site/high-classes.json`
- Report Card and Yearbook calculations still render
- the fixed town-map chip is suppressed because it obscured the active room;
  the page itself carries a Schoolhouse Road location band

## Visual conclusion

The page now reads as a school day rather than a narrow article followed by a
card directory: hallway arrival, homeroom/quiz desk, corridor register, AV
period ledger, Registrar document, Yearbook spread, reading register, and Book
Fair rack.
