# Trading Cards Owner-Entry and Inventory Evidence

**Observed:** 2026-07-26 12:58 PDT  
**Status:** VERIFIED REPOSITORY INVENTORY — no product admission

## Owner-entry failure reproduced

Command:

```text
node scripts/check-product-stewards.mjs --owner-entry trading-cards
```

Before recovery:

```text
PRODUCT STEWARD SYSTEM FAIL
- trading-cards owner entry missing_dossier: trading-cards/CHARTER.md
- trading-cards owner entry missing_state: trading-cards/state.json
```

Registry row:

```text
id=trading-cards
parent_id=blend-snap
champion=trading-cards-subchampion
dossier=trading-cards/CHARTER.md
state=trading-cards/state.json
initial_deep_dive=QUEUED
launch_status=UNKNOWN
next_trigger=BLEND_SNAP_CHAMPION_DISPATCH
```

No Trading Cards record was found in `run-queue.json`.

## Concept inventory

`content/site/card-packs.json` contains 15 rows:

- Issue 01: 5
- Issue 02: 5
- Issue 03: 5
- Issue 04: 0

The rows mix generic motivation/practice cards and repeat images across issues;
they are not a complete canonical concept matrix. Five Episode 04 files exist
under `assets/cards/concept/`:

`ep04-algorithm.png`, `ep04-the-signal.png`, `ep04-the-compiler.png`,
`ep04-ai-winter.png`, `ep04-training-data.png`.

Existence is not wiring or admission.

## Character inventory

`assets/cards/characters/` contains four files, all JoJo:

- `jojo-card-front-v1.png`
- `jojo-card-back-v1.png`
- `jojo-card-front-foil-v1.png`
- `jojo-card-front-foil-v2.png`

Unique character count: 1. The 13-keeper prompt is a subset. Current product
copy promises SAiNTS, MAiVENS and town regulars; the Closet spec also names
TRAiLBLAZERS.

## Runtime authority

`games/trading-cards.html` uses:

- `laidies_card_collection`
- `laidies_last_pulls`
- `laidies_cards_meta`

in `localStorage`. The route performs client-side pack selection. This is
useful prototype behavior but cannot establish fair opening, transferable
duplicates, account ownership or cross-device persistence.

## One-at-a-time visual observations

Inspected individually at original resolution:

1. `tradingref-01.png`: person-led portrait, large top banner, white border,
   black outline, red/blue halftone and sparse stars.
2. `tradingref-02.png`: three poster layouts, high-contrast pop-art panels,
   sticker motifs and significant stock watermark/placeholder text; reference
   only.
3. `tradingref-03.png`: word-burst/sticker/pattern alternatives with very
   different density; not one coherent card template.
4. `tradingref-04.png`: central red panel, heavy black frame, radial action
   lines and starbursts; Dreamstime watermark means it cannot ship.
5. `jojo-card-front-v1.png`: 5:7 portrait object, JoJo/environment dominant,
   large name, short speech bubble, white rounded frame, candy palette and
   halftone.
6. `jojo-card-back-v1.png`: large rendered copy in a comic panel; legible at
   original size, but text-in-image accessibility requires real text
   equivalent in the product.

Per Ali's sequence ruling, these observations are candidate constraints only.
No reference or existing asset is promoted to final style.

## Working-tree collision boundary

`operations/product-stewards/registry.json` and `run-queue.json` were already
modified before this dossier edit. They were read but not changed in this
recovery. No shared/live route, asset, service, deployment or public origin was
changed.

