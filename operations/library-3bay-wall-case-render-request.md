# Render request — ONE 3-bay bookcase sized to the LIBRAiRY back wall

**Status:** v1 delivered + wired, but needs a **v2 fix — the three shelves are NOT evenly spaced.**

## 🔴 v2 FIX (2026-07-22) — even shelf spacing
`delivery-20260722-3bay-wall-case-v1/library-wall-case-3bay-v1.png` came back with the **middle
shelf ~2.5% too high** — measured book compartments are **28.2% / 26.1% / 28.8%** of height (the
middle one is smaller). Ali caught it. Re-render with **DEAD-EVEN spacing**: from the top rail to
the base, the three shelves split the height into **three equal compartments** (~27.7% each), i.e.
shelf boards at roughly **y357 · y634 · y911** on a 1000px-tall image (vs the v1 y362 · y623 · y910).
Even spacing also lets the covers grow uniformly (the small middle gap currently caps them).
Everything else about v1 was right — same 2180×1000, same metal, same 3 bays, same blank fascias,
transparent back. This is ONLY a shelf-spacing correction.

---

**Original request below (v1) — dimensions/placement still correct:**

## Why
The browse shelves now sit inside the real room render
`assets/building-interiors/delivery-20260722-library-interior-no-desk-v1/library-interior-no-desk-v1.png`.
Three separate fixed-aspect uprights can't fill the centre purple wall cleanly — they either
leave gaps or spill onto the side shelving. Ali's call: render **ONE solid case sized to the
wall exactly**, so it reads as the back-wall shelving of the same room (like the runs beside it).

## Exact placement it must fill (in that 1672 × 940 room image)
- **Width:** the full purple wall, **x 276 → 1376** = **1100 px** (16.5% → 82.3% of width).
- **Top:** up to where the curved ceiling meets the wall on the right, **y ≈ 180** (19%).
- **Bottom (feet on carpet):** the floor line, **y ≈ 682** (72.6%).
- So the case occupies **1100 × ~500 px → aspect ≈ 2.18 : 1** (wide, one storey tall).

## Deliver
`assets/building-interiors/library-shelf/<new-delivery-folder>/library-wall-case-3bay-v1.png`

- **Transparent PNG (RGBA)** at aspect **2.18 : 1** (e.g. **2180 × 1000**). Fully transparent
  surround AND transparent open back between shelves — composites straight onto the wall, no black.
- Same **beige / warm-cream painted 1990s institutional METAL** as the shelving already in the
  room render, same finish, same flat daylit light — it must look like the SAME furniture.
- **ONE continuous run, THREE equal bays** side by side (the 101s / TOOLS / REFERENCE sections),
  divided by slotted metal uprights (2 ends + 2 dividers). No gaps between bays.
- **THREE evenly-spaced shelves** running across, so covers sit large (Ali wants bigger books).
  ⛔ No uneven bottom gap.
- Each bay has a **blank fascia rail at the top** for its section sign (signs are composited in
  HTML from `delivery-20260721-signs-v1/` — do NOT letter the fascias).
- Feet/base sit flat along the bottom edge so they meet the carpet cleanly.

## QC
Composite over the room render at the placement above: fills the purple wall, feet on the carpet,
top-right meets the ceiling curve, metal matches the side runs, three bays + three even shelves,
transparent back, no black halo.

## Wiring (once delivered)
In `_library-v3.html`: replace the three `.unit` columns with one `.unit` using this image,
positioned `left:16.5%; right:17.7%; top:19%; bottom:27.4%` inside `.libroom`. Place the three
section signs on the three bay fascias, and lay each section's books on that bay's three shelves.
