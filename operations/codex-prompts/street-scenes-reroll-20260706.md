# Street-scene re-rolls — golden · dusk · town-edge-sunset (2026-07-06)

> ⚠️ **CODEX SCOPE — IMAGES ONLY.** Generate the images and save them to the exact
> paths named below. Do **not** edit any code, HTML, JSON, or run git. Nothing but
> the PNGs. (Per the standing Codex scope contract.)

## Why these three are being re-rolled
The three scenes below are the only street shots still on the **old** street order /
garbled signage. Everything else in the batch is approved. The fixes are narrow:

- The **town map is accurate** — use it as the layout source of truth. Only the
  *street-scene signage wording* was garbled; the layout is fine.
- Two recurring sign errors to kill: **"BRONZE AGE"** (must read **"BRONZE AiGE"**)
  and **"LIBRARY on MAiN"** (the LIBRAiRY is **off Main**, on Civic Square — it must
  **not** appear on the Main Street strip at all).

## Shared references (hand Codex these exact files — do not let it pick its own)
- **Layout / building order (top-down):** the FINAL reference-style painterly town map
  (Ali confirmed 2026-07-06 — QA-verified canon: order 1–10, cross-streets behind Main,
  Post Office left / LIBRAiRY right on Civic Square, LUMINAiRY on Lantern Hill). Hand
  Codex the **final saved file: `assets/re-rolls-20260705/sunnyvaile-town-map-v2-signs-fixed.png`**
  (delivered 2026-07-06 — SUNNYVAiLE·EST.1999 banner + cleaned "SCHOOL HOUSE ROAD," canon
  order 1-10). Do NOT build from the live-wired `v9-canon` (old, superseded).
- **Correct storefront ORDER + already-correct SIGN SPELLING (elevation):**
  → `assets/sunnyvaile-main-street-walk-panorama.png` (approved 2026-07-06 — copy its
  sign wording exactly).
- **Per-building facades (Y2K-honest hero renders):**
  `assets/sunnyvaile-buildings/y2k-v3/` — match each storefront to its hero:
  `01-welcome-wagon-visitors-centre` · `02-sunnyvaile-newsstand` ·
  `07-the-chick-flicks` · `08-blend-and-snap` · `06-mme-claios-shop` ·
  `09-maikeover-on-maine` · `05-bronze-aige` · `17-dream-phone-booth` ·
  `04-the-mall` · `16-ksvl-community-raidio`. (Filenames keep their original numbers;
  ignore the number, match by name — the **map** sets street order.)

## Canonical MAiN Street order (matches the map + panorama)
1 Welcome Wagon Visitor's Center → 2 NewsStand → 3 The Chick Flicks →
4 Blend & Snap → 5 Mme CLAi-O's → 6 MAiKEOVER on MAiN → 7 BRONZE AiGE →
8 Dream Phone (booth, right outside The Mall) → 9 The Mall → 10 KSVL Community RAiDIO.
**The LIBRAiRY is NOT here** — it sits off Main on Civic Square.

## Exact sign text (spell verbatim — never Anglicize the lowercase "Ai")
`THE WELCOME WAGON / VISITOR'S CENTER` · `NEWSSTAND` · `THE CHICK FLICKS / VIDEO RENTALS`
· `BLEND & SNAP` · `Mme CLAi-O'S / PSYCHIC READINGS` · `MAiKEOVER on MAiN` ·
`BRONZE AiGE` · `DREAM PHONE` · `THE MALL` · `KSVL COMMUNITY RAiDIO / 99.9 / ON AIR`.
Never write "AGE", "RADIO", "MAKEOVER", or "LIBRARY on Main."

## Global art direction (all three)
Y2K-honest painterly storefronts (the y2k-v3 register). California-Sunnydale main
street: palms, jacaranda blossom, terrazzo sidewalk, period storefronts. Render all
sign text legibly **in-generation** — no blank panels, no post-applied text. **Ban:**
fairytale/storybook kit, and pink scattered-glam "flat-lay" borders around an empty
center. Horizontal scenic format.

---

## PROMPT 1 — `assets/sunnyvaile-streets/main-street-golden.png`
Golden-hour street-level view looking down MAiN Street, SUNNYVAiLE. Low warm sun,
long soft shadows, honey-gold light washing the storefronts. Show the canonical run of
Y2K storefronts in the exact order and with the exact signage from the reference
panorama — Chick Flicks, Blend & Snap, Mme CLAi-O's, MAiKEOVER on MAiN, BRONZE AiGE,
Dream Phone booth, The Mall, KSVL — each facade matched to its y2k-v3 hero. Palms and
jacaranda, a couple of period cars, a quiet late-afternoon sidewalk. Warm, nostalgic,
cinematic. **Sign spelling exactly:** "BRONZE AiGE" (not AGE), "MAiKEOVER on MAiN",
"KSVL COMMUNITY RAiDIO". No LIBRARY anywhere on this street.

## PROMPT 2 — `assets/sunnyvaile-streets/main-street-dusk.png`
The same MAiN Street at dusk / blue hour. Sky deepening to indigo and violet; every
storefront's **neon and marquee lit and glowing** — the KSVL "ON AIR" and 99.9 hearts,
the Chick Flicks marquee, the MAiKEOVER bulbs, the BRONZE AiGE sign — warm interior
window light spilling onto the sidewalk, streetlamps on. Same canonical storefront
order and facades as the panorama. At dusk the signs are the hero, so spelling must be
perfect: "BRONZE AiGE", "MAiKEOVER on MAiN", "Mme CLAi-O's", "KSVL COMMUNITY RAiDIO /
99.9". No LIBRARY on this street. Moody, glowing, Y2K-nostalgic.

## PROMPT 3 — `assets/sunnyvaile-streets/town-edge-sunset.png`
Wide establishing "postcard" shot of SUNNYVAiLE seen from the **edge of town**, looking
in, at sunset (orange–pink–purple sky). **Match the town map's layout exactly:** MAiN
Street as the spine running through town with its storefronts along it; Lantern Hill
rising at the far end crowned by The LUMINAiRY; the KSVL radio tower; the named cross
streets (Civic Square, Schoolhouse Road, Willow Lane, Wisteria Lane) running **behind**
Main, not cutting across it. Palms silhouetted against the sunset, warm lit windows
beginning to glow. This replaces the earlier version, which had the **wrong layout** —
anchor hard to the map. Serene, golden-hour-into-dusk, wide and cinematic.
