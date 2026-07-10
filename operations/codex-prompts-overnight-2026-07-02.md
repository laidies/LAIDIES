# Codex prompts — overnight audit follow-ups · 2026-07-02

## Overview

The overnight image audit found **no broken image references** and **all 17 building storefronts present**. So there's no *required* image work — nothing is missing on disk.

The prompts below are **optional enhancements** — assets that would let us upgrade specific pages if you want them, but aren't blocking anything. Skip whichever aren't priorities.

Save any generated images to `Website-homepage/assets/` following the existing naming conventions.

---

## OPTIONAL · Per-saint portraits for the SANCTUAiRY

The SANCTUAiRY currently lists 8 PATRON SAiNTS as text-only cards. Existing saint portraits already exist elsewhere on the homepage (in the "PATRON SAiNTS strip" band). If you want per-saint art on the SANCTUAiRY cards themselves, we can either reuse the homepage portraits or generate fresh ones sized for the card grid.

Skip if the current text-only cards + song-play buttons feel enough.

**Prompt template (if generating):**
> Y2K stained-glass portrait of [saint name], surrounded by a golden halo, framed by dusty pink roses and lit candles. Cathedral-window register, editorial illustration, soft magenta / plum / cream palette (#4b2148, #f9e6ee, #fffdfb, #c9a227). Standing composition, waist-up, quiet gaze, canon-accurate outfit for the character. Not photorealistic — closer to a Renaissance devotional card meets Y2K teen-magazine illustration.

**Per-saint iteration prompts** (append the canon-accurate character detail):
- Cher Horowitz — yellow plaid Clueless-Ep-1 outfit, backpack over shoulder, glossy hair, holding a bottle of Evian
- Dolly Parton — 9 to 5 secretary outfit updated to modern office-chic, hair teased, holding a coffee mug that says "COMMON SENSE"
- Elle Woods — hot-pink Legally Blonde look, Bruiser dog under one arm, receipts tucked in the other
- Miranda Priestly — cerulean Devil Wears Prada silk blouse, glacial expression, gloved hand holding a Runway magazine
- Buffy Summers — leather jacket, stake in hand, sunset behind her, quiet resolve
- Regina George — pink Mean Girls-Wednesday outfit, arms folded, subtle smirk
- David Rose — black-and-white Schitt's Creek sweater, coffee in hand, one raised eyebrow
- Deb — muted 90s office wear, glasses on a beaded chain, a keyboard emerging from her cardigan (Dream Phone canon nod)

---

## OPTIONAL · MAiN Street tour banner strip

The homepage Wednesday-drop section describes the multi-stop weekly tour but currently uses individual cards for each stop. A single hero-strip illustration showing the walk (Post Office → Chick Flicks → Blend & Snap → SUNNYVAiLE High → NewsStand → KSVL Radio → back to Post Office) would be a stronger visual for the section.

**Prompt:**
> Panoramic Y2K illustration of MAiN Street in SUNNYVAiLE, showing (left to right) the Post Office, The Chick Flicks (Blockbuster-era video store), The Blend & Snap Café, SUNNYVAiLE High, The NewsStand kiosk, KSVL Community Radio tower, and back to Post Office. Golden-hour pink sunset. Aspect ratio: 2400 × 800 (wide panoramic banner). Same palette as the existing homepage masthead — plum #4b2148, rose #9b3f5f, gold #c9a227, cream #fffdfb, pearl #f8eef2. Small figures walking between stops. Editorial illustration, not photorealistic. Consistent with existing building storefronts in `assets/sunnyvaile-buildings/`.

Save as: `assets/sunnyvaile-main-street-walk-panorama.png`

---

## FLAGGED · No other image work needed

All other pages have their canonical hero imagery. Retiring pages (`clubhouse.html`, `grimoire.html`, `reference-closet.html`, `receipts.html`, `learn.html`, `try-on.html`, `index-magazine-backup-2026-06-29.html`) don't need new images — they need retirement decisions.

The following DO exist and are correctly wired:
- `assets/sunnyvaile-masthead.png` — homepage
- `assets/sunnyvaile-buildings/01-17-*.png` — all 17 buildings
- `assets/portal/` — game art (Ask LAiDY, Dream Phone, etc.)
- `assets/deb-*.png`, `assets/printables/deb-*.png` — Deb portraits + posters
- `assets/brand/laidies-logo-*.png` — full brand pack
- CLAiRE'S 20 avatars in `assets/`

If you want anything specific NOT listed here, tell me at breakfast.
