# Town rendered-card consumer v1 — maker evidence

**Status:** `BUILT LOCALLY — INDEPENDENT RENDERED-CONSUMER REVIEW PENDING`  
**Date:** 2026-07-27  
**Scope:** isolated Town catalogue presentation only

## Literal output

The local candidate at
`operations/design-explorations/building-wave-4/trading-cards-town/index.html`
renders all 13 independently content-accepted Town records as real character
fronts with readable rendered-copy backs.

Each card uses one native button with a deterministic `aria-pressed` flip
state. The interface includes visible focus, reduced-motion handling, a 320px
single-column fallback, broken-image fallback, failed-catalogue containment and
an explicit preview boundary. It does not create a pack, grant ownership, write
storage, call a platform service or change a public route.

## Exact bindings

- Catalogue candidate SHA-256:
  `45b17e19c44e3c6d1ad424bfd83c86519df03a35d9aa692313b77c793c65fefa`
- Independent record-content verdict SHA-256:
  `da1cbe8d2bdbee775be973625fad4591f49e966ff825bfbbcb29638c035f3dee`
- HTML SHA-256:
  `433c28d6b3a0a83c2fef3ad6b8a3f5b154688603a8b6079105bf2631cb4d8c5f`
- CSS SHA-256:
  `e333b1a77936a9c5812442a85713675caf19494f39f9fc04cee2ed8d2d4369a7`
- JavaScript SHA-256:
  `1260d094a1749e579a6b69d79af846a4213b8fd3b35a00e5965f04430665ba40`
- Test SHA-256:
  `830fe0d7ec40c1384490adf7d758135a28c48c594495b31c67ba8ce850401186`

## Tests and rendered inspection

Static/record test:

`TOWN TRADING CARD RENDERED CONSUMER PASS records=13 fronts=13 backs=13 flip=keyboard-button 320=reflow reduced-motion=pass pack=held release=held`

Browser-visible inspection:

- 1440px: 13 cards, zero horizontal overflow, zero broken images and zero
  error-level console messages.
- 320px: 13 cards, exact 320px document width, zero broken images, native
  Enter activation, `aria-pressed=true`, updated accessible name and readable
  back copy with no internal vertical clipping.
- All 13 buttons were activated and returned by keyboard at 320px. All 13
  pressed states and accessible names updated, and all 13 backs had
  `scrollHeight <= clientHeight` with zero maximum overflow.
- Reduced-motion emulation reduced the flip transition to `1e-06s`.
- Aborting the catalogue request produced the contained message “The Town roll
  call is unavailable” and explicitly confirmed that nothing was added to a
  pack or collection.
- Target/back view: the first card back measured `scrollHeight=450` and
  `clientHeight=450`.
- Desktop render:
  `operations/design-explorations/building-wave-4/trading-cards-town/evidence-desktop-1440.png`
  (1440 × 2013; SHA-256
  `95405e88aeb85b7641a5d1aca41f5591d19990ccb1187e03f8218f29f9365460`)
- 320px turned-card render:
  `operations/design-explorations/building-wave-4/trading-cards-town/evidence-mobile-320-back.png`
  (320 × 6841; SHA-256
  `08cf5d471a666f61c7fe9fe87211b47bfcdfe6bb058a4a674df0d7725f8c7885`)

`node scripts/check-product-stewards.mjs --owner-entry trading-cards` passes.
JSON parsing and scoped diff checking pass.

## Remaining gates

This is maker evidence, not acceptance. An independent judge must inspect the
exact tuple at target size, 320px and a 200%-zoom/reflow proxy, including
keyboard/focus, screen-reader semantics, reduced motion, failure states and
front/back readability. Technical catalogue admission, packs, ownership,
Closet projection, release and public use remain separate and held.

## Proactive-improvement result

Opportunity advanced: the Town cards previously existed only as art files and
record copy. This isolated consumer makes the actual flip/read experience
inspectable without inventing a pack, collection or ownership system.
