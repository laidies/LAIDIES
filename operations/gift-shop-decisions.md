# Gift Shop construction decisions — 2026-07-24

This file records the implemented structural decisions so the shop is not
turned back into a generic product-card page.

## Spatial model

- The page does not claim a MAiN Street number or a permanent Mall unit. That
  canon question remains open.
- The room is the directory. Its four real zones are Print Bin, Tee Wall,
  Spinner, and Till.
- The base room is
  `assets/building-interiors/delivery-20260724-gift-shop-v1/gift-shop-empty-fixtures-comic-candidate-v1.png`
  at 1672 × 941.
- Desktop renders the room edge-to-edge. Mobile keeps the room at a readable
  820px width inside a native horizontal scroller rather than shrinking the
  shop into an illegible thumbnail.

## Measured operating geometry

All values below are percentages inside `.shop-room`; they scale with the room.

| Object | Position |
|---|---|
| Loop Me Out poster | `left 2.2% · top 39.6% · width 5.3% · height 21.5%` |
| Deb-flection poster | `left 8.3% · top 38.9% · width 5.4% · height 21.5%` |
| Mayor poster | `left 14.6% · top 40.2% · width 5.5% · height 21.2%` |
| 1999 campaign poster | `left 9.1% · top 56.8% · width 5.7% · height 21.8%` |
| Print Bin control | `left 3% · bottom 9%` |
| Tee Wall control | `left 42% · top 19%` |
| Spinner control | `left 63.5% · top 31%` |
| Till control | `right 7% · bottom 13%` |

The four poster objects are the real curation-`correct` print files. They are
not generated approximations or CSS drawings.

## Register model

- `PRODUCTS` remains the single catalog data source and retains every original
  item, price label, blurb, giftable flag, and `buyUrl` field.
- The old 13-card grid is removed. One ruled stock list controls one in-place
  product register.
- Products with real art show that art. Products without approved product
  imagery stay text-only and explicitly say `NO FAKE MOCKUP`.
- The retired pop-culture saint images and the curation-`redo` Ada pixel scene
  are absent. Current MAiVEN windows and a curation-`correct` Episode 04
  graphic-novel frame replace them.
- While `buyUrl` is `#`, the page states once that the till is not connected
  and does not render a fake purchase action.
- Gift remains a real future checkout option, not a fake address form.
- `Hold it behind the counter` uses the existing
  `laidies_puffies_board`/`svPuffyScan` Closet pipeline and is a working action
  now.

## Palette and typography

- Light lilac/blush/mint gradients stay light.
- Dark bands use near-black midnight blue.
- Pink, purple, cyan, cobalt, mint, coral, and orange are distributed accents;
  yellow and red are not dominant.
- Anton is the display face and Jost is the interface/body face.
