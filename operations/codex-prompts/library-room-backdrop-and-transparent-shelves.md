# LIBRAiRY — the room backdrop + transparent shelf units

**Why.** The shelf units delivered 2026-07-21 are drawn **dead straight-on**, but every
background we have is in **perspective** (`library-aisle-backdrop-v1.png` is a receding
corridor; the Miss Jeeves hero is a desk scene). Standing flat units in a perspective room
reads as two different rooms. And the units were delivered with an **opaque near-black
surround baked in**, which is why the page is currently black — Ali has rejected that, and
it cannot be fixed in CSS.

⛔ **No cream / flat pale page background.** Ali has ruled this out more than once.
The page background must read as **the inside of the LIBRAiRY**, with the shelf units
standing in that room as real furniture.

Output → `assets/building-interiors/library-shelf/`

---

## 1 · `library-room-backdrop-straight-on-v1.png` · 1920 × 1080

**A flat library wall, seen dead straight-on**, for shelf units to stand against.

- **Straight-on, eye level, ZERO perspective skew.** The wall is parallel to camera. This must
  match the shelf units' geometry exactly — if the wall recedes, the composite breaks.
- **Bottom ~18%: the floor** — the SUNNYVAiLE geometric carpet (navy ground, pink / teal /
  orange triangles, as in `library-aisle-backdrop-v1.png`). A soft contact shadow line where
  floor meets wall, so units look like they are standing on it.
- **The wall itself**: warm painted plaster or panelling in the library's register. Quiet
  enough that books and signage read clearly on top of it. Keep the upper area plain.
- **DAYLIT.** Flat, even, daytime interior light — the register of overhead fluorescent in a
  real library. ⛔ **NO evening, NO night, NO dusk, NO sunset, NO city-at-night windows.**
- ⛔ **NO light fixtures of any kind** — no pendants, no chandeliers, no lanterns, no visible
  strip lights, no glowing lamps.
- ⛔ **NO shelving and NO books anywhere in the image.** The wall must be completely EMPTY —
  the shelf units are composited on top in HTML. Any shelving drawn into the backdrop will
  collide with them.
- ⛔ No furniture, no people, no aisle, no corridor, no receding rows, no glass block.
- Must tile/crop gracefully: the page repeats or stretches this behind three stacked units.

## 2 · Re-export the shelf units WITH TRANSPARENCY

The three units below currently ship as **RGB with no alpha** — verified, colour type 2 — so
the near-black surround is baked in and shows as a black rectangle on any background.

**Re-deliver each as RGBA (PNG-32) with a fully transparent surround**, same pixels otherwise:

| File | Size |
|---|---|
| `delivery-20260721-size-variants-v5/library-shelf-unit-2-row-full-width-v1.png` | 1920 × 1080 |
| `delivery-20260721-size-variants-v4/library-shelf-unit-2-row-full-width-v1.png` | 1920 × 540 |
| `delivery-20260721-size-variants-v4/library-shelf-unit-4-shelf-upright-v1.png` | 960 × 1080 |

- **Transparent** everywhere outside the metal frame.
- **The back panel BETWEEN the shelves must also be transparent** — real institutional stacks
  are open-backed, and it lets the room show through so the unit sits IN the space rather than
  on top of a black card.
- Keep the metal exactly as delivered: beige/warm-cream painted steel, slotted uprights both
  sides **and centre**, shelf front lips, blank fascia rail at the top.
- ⛔ Do not re-draw or re-light the units. This is an alpha fix, not a new render.

---

## Standing constraints
- **Shelves evenly spaced.** The 5-shelf upright variant has an uneven bottom gap and is
  rejected — do not use or re-deliver it.
- **Books never sit in front of the centre upright** — the site lays them out in two bays.
  This is why the centre standard must stay clearly visible after the alpha fix.
- **"AI" is always both letters capital** if any text appears. The lowercase-i belongs to
  brand words only (LAiDIES, SUNNYVAiLE, LIBRAiRY).
- Exact pixel dimensions as listed — wrong dimensions are auto-rejected.

## QC
Open each re-exported unit over a bright background: the surround and the inter-shelf back
panel must both be see-through, with clean edges on the metal and no black halo.
