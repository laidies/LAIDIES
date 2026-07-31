# Mall shop design decisions — 2026-07-24

Status: page construction implemented; visual candidates await Ali's review.

## What was wrong

Nine Mall subpages were the same unfinished page:

- painterly storefront;
- “Still brewing” notice;
- long multi-column text list;
- one back-to-Mall CTA.

Pieces of Flair had real Resident Card functionality, but presented all twenty
objects as an undifferentiated card grid. The physical Mall stopped at the shop
door.

## Construction decision

The Mall shops share one structural grammar, not one generic layout:

1. storefront arrival;
2. full-width interior whose three fixtures are the department controls;
3. one in-place selected reference/product/memory;
4. one mechanic unique to the shop;
5. one searchable ruled register preserving the complete source list;
6. one explicit return through the Mall atrium.

The register is not a product-card grid. Its purpose is completeness and
retrieval. The room and selected-object area carry the experience.

## Shop mechanics

| Shop | Room mechanic | Saved object |
|---|---|---|
| As Seen on TV | tune the film wall, TV wall or every channel; next-channel remote | watchlist |
| Books and Records | browse paperback shelf, singles bin or soundtrack listening post | counter pile |
| Food Court | move between drinks, sugar and hot counters | food-court tray |
| Gizmos and Gadgets | try personal audio, communication or play-tech departments | demo bench |
| Hanger Management | pull tops/dresses, denim/shoes or finishing pieces | fitting-room hook |
| Last (x30) Summer | browse hallway, excursion and sleepover memory zones | open scrapbook |
| MAiYBE | browse hair/skin, colour and scent/tools fixtures | Caboodles |
| Mall Kiosk | browse or use the working random spinner | kiosk bag |
| Rollin' With My Homies | separate scripted, real and ensemble reference energy | call sheet |
| Pieces of Flair | browse three physical fixtures, examine one real object, carry it | existing Resident Card `laidies_carry` state |

Each of the first nine shops saves its own list under
`laidies_mall_shop_<shop-slug>`. Pieces of Flair deliberately keeps the existing
`laidies_carry` key so the Resident Card integration survives unchanged.

## Art decision

Ten people-free 16:9 interiors were generated against the approved Episode 04
Heroine rendering lock and each shop's current storefront context. They are
installed as candidates in `assets/mall-interiors-comic/`.

The visual QA comparison shows that the rooms are bright, dimensional and
structurally effective, but still less heavily inked/halftoned than the approved
Heroine face. Therefore:

- no room is called approved;
- no room becomes a future style reference;
- every room can be replaced without changing page construction;
- Rollin' contains only abstract silhouettes, not generated celebrity or
  copyrighted-character likenesses;
- Pieces of Flair uses the real existing twenty object images in the live
  interface rather than asking ImageGen to invent substitutes.

## Protected truth

- All original source lists remain in the HTML and are read progressively by
  the new interaction layer.
- No item is presented as being for sale.
- No fake checkout, fake search result, dead “coming soon” control or invented
  product mockup was added.
- `claires.html` remains the existing redirect to Pieces of Flair.
- Mall, Resident Card, analytics, directory and global audio scripts remain.

