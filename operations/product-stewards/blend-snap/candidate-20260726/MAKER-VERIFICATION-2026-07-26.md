# Blend & Snap isolated candidate maker verification

**Status:** VERIFIED LOCALLY — MAKER EVIDENCE; INDEPENDENT ADMISSION REQUIRED  
**Evidence time:** 2026-07-26 11:12:09 PDT  
**Scope lock:** `operations/product-stewards/blend-snap/candidate-20260726/**`  
**Live/shared changes:** none

## Literal output

A self-contained functional café candidate now implements:

- room arrival → current Special → ORDER → in-place modal receipt;
- five exact Episode 04 dispositions with links only for available routes;
- first-time, returning without Card, device-local Card and verified-account
  state previews with identical honest capability;
- candidate-only optional usual and last-opened-receipt persistence;
- loading, offline, stale, episode/index disagreement and storage-denied
  fixtures with fail-closed ordering and retry;
- a functional Study Sheet review interaction clearly outside current
  inventory;
- functional non-collectible card flips with no pack opening, ownership,
  reward, trading, Closet or persistence;
- four-episode discovery rack and exact Try-On, printable, Quiz and Episode
  handoffs; and
- neutral responsive presentation without global-style selection or shared
  asset use.

## Automated proof

Command:

```sh
node operations/product-stewards/blend-snap/candidate-20260726/test-candidate.mjs
```

Result:

```text
✓ BLEND & SNAP ISOLATED CANDIDATE: 69 checks · desktop/mobile/four visitor states/inventory/study/cards/failures/focus/storage/handoffs
```

Named coverage:

- complete five-component menu and receipt inventory;
- exact Study Sheet `planned` and Episode 04 Cards `unavailable` states;
- exact available Try-On/reference/Quiz routes and no unavailable links;
- dialog open/focus/close-return behavior;
- candidate-only keys and explicit proof that live café keys remain untouched;
- all four visitor-state fixtures and unchanged available capability;
- Study Sheet sample expand/answer/feedback and admission limitation;
- card flip with zero added storage/ownership;
- offline/stale/disagreement/loading fail-closed states, focused Retry and
  recovery;
- storage-denied order/receipt with no false save;
- 390px no-overflow/full-inventory/order/return-state checks; and
- reduced-motion recognition with removed transition.

Unchanged canonical dependencies also passed:

```text
✓ BLEND & SNAP PACKS: schema 1.0.0 · 4 published episode menus · 12 available · 3 held · 4 planned · 1 unavailable · fresh through 2026-08-01
✓ BLEND & SNAP CROSS-ENTRY: 54 deterministic checks · café/welcome/directory/episodes/manifest
✓ BLEND & SNAP BROWSER: 90 rendered checks · new/return/storage/index/stale/missing/mobile/keyboard/focus/motion/cross-entry
```

## Visible evidence

- `evidence/desktop-1440-full.png` — complete desktop candidate.
- `evidence/mobile-390-full.png` — complete compact candidate.
- `evidence/desktop-1440-receipt.png` — ordered receipt and all five
  dispositions.
- `evidence/desktop-1440-offline.png` — turned-around Special in the
  returning-without-Card state.

Maker visual inspection found:

- no clipped primary content or horizontal overflow at the tested viewports;
- the room, menu, usual, ORDER and pickup sequence reads without image
  hotspots;
- dynamic status and operational truth remain HTML text;
- unadmitted samples remain visibly separated from current inventory; and
- no global illustration style is selected.

This is maker evidence, not independent product, learning, accessibility,
brand or release admission. Native VoiceOver/Safari and 200% human inspection
remain unproved.

## Learning scan

The first 390px run failed because the two-column scenario-control grid honored
the selects' min-content width and expanded the page to 468px. The repair used
`repeat(2,minmax(0,1fr))`, `min-width:0` on grid children and `width:100%` on
the selects; the next full suite passed with `scrollWidth=390`.

Reusable prevention rule: responsive grids containing native selects must test
min-content pressure, not only content cards. Use zero-minimum grid tracks and
assert both document width and the exact overflow offenders.

This is a qualifying local learning, but the active lock excludes the shared
`operations/painpoints-log.md`. Control Room should append it when assigning an
integration lock; possible Behind the Build angle: “The café fit on mobile
until the test menu ordered forty-eight extra pixels.”

## Exact candidate identity

```text
13e233be52b325fa4604c573cb93c8445aff2be4610f1df330f69208f0b94c3f  index.html
7f3258bf8a53aaecc23f4153b1a18f4d5f9d7a40a9b297f3da86b5313d9c879a  candidate.css
f36ced411a3d552c73e1aeb7e95486cb152c581affaa573b02089a37056a6771  candidate.js
6e7b17334af0ce5f43abcb0ef86abe79892cfcf5f88339375eea662f2e6541ae  test-candidate.mjs
9a88cf963cc05bd143a40e0c181faa55ab9f6326c1db8c77ed630bb6ff748613  evidence/desktop-1440-full.png
a446c02a4dc211bd70373b3a03d2e1ef0da3895c7e7980eb27687c6e6b4a8e78  evidence/desktop-1440-offline.png
74242caacaa01ef62dddf55012a9440e1eec14d8216396121364c071b5d7ef64  evidence/desktop-1440-receipt.png
2d85093c6c5d0cf146191aa00eec24514c9e41e9783460222f8d766a729acc20  evidence/mobile-390-full.png
```
