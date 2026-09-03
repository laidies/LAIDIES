# Chick Flicks Listen Homepage-colour correction — 2026-09-03

## Decision

Ali rejected the previous `Special features` successor because deep plum is no
longer in the LAiDIES palette and the component used white text where dark text
was viable. The successor therefore uses colour combinations measured on the
current local Homepage render rather than the obsolete saved palette note.

## Bound visual relationship

- Field: Homepage coral-to-pink `#c96652 → #db7581 → #e982ab`.
- Display copy, card labels, keylines and focus outline: Homepage dark ink
  `#3a1838`; small copy over the field uses deep ink `#11183b` rather than
  inaccessible white.
- Link surfaces: Homepage activity-button fills `#57b6c0`, `#e982ab`,
  `#ec7a78`, `#b3abe7`, `#f4a636` and `#8bbde9`.
- Prohibited here: deep-plum surfaces and white or cream type.

## Render review

1. The rejected screenshot is preserved as
   `rejected-deep-plum-white-text.png`.
2. `homepage-colour-reference-top.jpg` and
   `homepage-colour-reference-buttons.jpg` are current Homepage reference
   captures at 1280 by 900.
3. `homepage-colours-successor-desktop.jpg` is the corrected 1280 by 900 Listen
   render; `homepage-colours-successor-mobile.jpg` is the 390 by 844 render.
4. `rejected-vs-homepage-colours.png` is the same-height predecessor/successor
   comparison used for maker review.

The successor removes the dark dashboard effect, retains all six destinations,
and preserves a single full-width section. Card foreground/background contrast
ranges from 5.57:1 to 7.72:1; small field copy uses `#11183b`, which reaches
4.52:1 over the field's darkest stop. At 390px the destinations form two
columns by three rows with zero horizontal overflow. Computed styles confirmed
dark ink on all six link surfaces. The phone browser log contained zero errors.

Final result: passed local visual and responsive review. This is not deployed
and has not been publicly verified.
