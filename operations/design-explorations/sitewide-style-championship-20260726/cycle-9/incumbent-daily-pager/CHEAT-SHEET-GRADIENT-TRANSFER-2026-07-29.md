# Cycle 9 Homepage — Episode 1 Cheat Sheet gradient transfer

**Status:** BUILT LOCALLY / REVIEW CANDIDATE  
**Date:** 2026-07-29  
**Source authority:** Ali's exact active Episode 1 Cheat Sheet recipes in
`operations/design-explorations/study-pack-storefront-20260728/prototype/src/styles.css`

## Change

The Cycle 9 Homepage keeps its current masthead artwork, imagery, content,
hierarchy, routes and behaviour. Softer candy/pastel section treatments now use
the already-proven Cheat Sheet gradient families:

- layered sunshine/pink/blue page gradient for long-reading surfaces;
- hot pink → purple → blue for high-energy feature panels;
- cyan → purple → pink for image-led intent cards;
- pink → yellow → cyan for warm action/handoff moments;
- cyan → periwinkle and purple → blue for weekly learning surfaces.

The Activities card family now uses the exact pink → yellow → cyan surface
already established by the “Look something up” intent card. The change is
shared across all activity cards and does not alter their image wells, controls,
copy, dimensions or filtering behaviour.

The strongest gradients are limited to major feature and action panels. Reading
surfaces retain deep-plum text and the softer layered page recipe. Plum is a
foreground colour only: it may be used for text and outlines, but not as a
solid, near-solid or translucent panel background. Longer copy sits on the
light layered sunshine/pink/blue recipe so the page remains colourful without
turning into a dark-plum surface system.

## Acceptance

- No masthead, copy, image source, IA, route or functionality change.
- No gradient colour is used as an unexplained state signal.
- No card, panel, button, image well or section uses solid plum as a background.
- The current Episode row remains distinguished by its explicit pink outline
  and status label, not a different row background.
- Desktop, intermediate and mobile review must show readable contrast, no
  overflow, no lost image subjects and no new blank fields.

## Verification

- `preview.js` syntax check: PASS.
- Town Entry Homepage owner-entry check: PASS.
- Whitespace/diff check on the four Cycle 9 files: PASS.
- Mobile governed viewport: 390px document and body widths equal the 390px
  viewport; zero off-canvas elements.
- The exact transferred recipes are active at 390px on Today, This Week,
  Activities, Reference, Town and Closet.
- All six Activity cards resolve to the same exact
  `#ef5ca6 → #f7d45c 49% → #69cce0` gradient at 390px and 1280px.
- At 390px, the first three Activity images remain equal at 312×234; at 1280px
  the first card remains 330×248. Document width equals viewport width at both
  governed checks.
- District cards use the bright pink → yellow → cyan family with deep-plum text.
- Intent, weekly and Closet reading panels use the light layered page gradient
  with deep-plum text.
- Image letterbox fill uses the light page gradient rather than dark plum.
- Computed-style audits found zero solid plum/dark-plum backgrounds at 1074px
  and 390px; both viewports have matching document and viewport widths.
- Masthead, imagery, routes and controls remain unchanged.
- The shared teal accent now uses the COMMUNITY RADIO sign's electric
  cyan-teal core (`#19d3d1`) rather than the former softened aqua (`#5fc2c2`).
