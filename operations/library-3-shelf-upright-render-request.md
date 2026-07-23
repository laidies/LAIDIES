# Render request — 3-shelf upright bookcase (LIBRAiRY)

**Status:** needed. The page currently uses the clean **4-shelf** upright; swap to this when it lands.

## Why
The reference collection only has 4–6 books per section. On the 4-shelf upright the covers come
out small and the shelves look bare. Ali's fix (2026-07-22): **same bookcase, THREE shelves
instead of four** — taller gaps, so the covers standing on them read bigger and a section fills
the case. We move back to the 4-shelf (or a wider case) once there are more books.

⚠ A hand-edit of the 4-shelf (erase a board, re-stamp the others) was tried and **rejected** —
it left ragged metal and leftover shelf clips down the left rail. Must be **rendered fresh**, not
pixel-surgery.

## Deliver
`assets/building-interiors/library-shelf/<new-delivery-folder>/library-shelf-unit-3-shelf-upright-v1.png`

**Identical** to `delivery-20260722-transparent-v1/size-variants-v4/library-shelf-unit-4-shelf-upright-v1.png`
in every respect — **except one fewer shelf**:

- **960 × 1080, RGBA.** Fully transparent surround AND transparent open back between shelves
  (composites straight onto the lilac wall — no black rectangle, no halo).
- Same **beige / warm-cream painted 1990s institutional METAL**, same finish, same flat daylit
  lighting, same slotted uprights both sides, same shelf front lips.
- Same **blank fascia rail at the top (~7%)** for the section sign.
- **THREE shelf boards, evenly spaced** between fascia and base — books stand on boards at
  roughly **40% · 67% · 94%** of height, equal gaps. ⛔ No uneven bottom gap (that is why the
  5-shelf variant is banned).
- Every shelf attached with the **same clips** as the 4-shelf — no floating clips, no leftover
  hardware, clean edges on both rails.
- ⛔ Do not re-style, re-light or re-colour. Same product, one fewer shelf.

## QC
Composite over a bright (lilac) background: surround + inter-shelf back panel see-through, metal
edges clean, no black halo, three boards evenly spaced, no stray clips on either rail.

## Wiring (once delivered)
One-line swap in `_library-v3.html`: the `.unit` background URL → the new file, and the four
`.brow` shelf positions (`bottom: 69/48.5/28/7.5%`) → three, at the new board heights.
