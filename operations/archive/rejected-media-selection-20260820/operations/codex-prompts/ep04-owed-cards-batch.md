# Ep4 — OWED TIME-JUMP CARDS (hand to Codex, 2026-07-20)

> **PATH ROOT:** every `assets/...` path below is relative to the **`Website-homepage/`** folder.
> If you're running from the LAIDIES parent folder, prefix them with `Website-homepage/`
> (e.g. `Website-homepage/assets/episodes/ep-04/pixel/…`). Output goes to the same folder.
> **⚠ READ THE ADDENDUM AT THE END OF THIS FILE FIRST** — it supersedes cards 2–5 with ONE shared `2018–2021` card.

5 establishing "PLACE, YEAR" cards for the Ep4 video: 1 fix (Grace) + 4 new (the modern MAiVENs, so the
timeline keeps captioning itself to present day). **Captions verified 2026-07-20** (facts-and-citations-ledger).

## ⭐ MATCH THE EXISTING TIME-JUMP CARD STYLE EXACTLY
Reference the locked cards (same look): `assets/episodes/ep-04/pixel/ep04-tj-hedy-comic-v2-timnit-style-lock-exact-caption-1920.png`
(HOLLYWOOD, 1942), `ep04-tj-eniac-comic-v1-exact-caption-1920.png` (PHILADELPHIA, 1945),
`ep04-tj-karen-comic-v2-timnit-style-lock-exact-caption-1920.png` (CAMBRIDGE, 1972),
`ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png` (LONDON, 1843).
- **Establishing SHOT of the PLACE — NO person in frame** (the character appears in the scene that follows).
- **Caption box top-left:** `PLACE, YEAR` in a cream label box, bold caps — exact same treatment as the refs.
- **Black comic panel border** around the whole frame.
- Locked comic register: bold black ink, HARD angular shadow planes, flat vibrant color, NO halftone, NOT soft/painterly.
- Period-accurate setting + tech. 16:9, 1920w. Caption text rendered IN-generation (never post-applied).
- ⛔ NO gibberish text; the caption must read EXACTLY as written below.

**Output dir:** `assets/episodes/ep-04/pixel/` · filenames noted per card.

---

## 1 · GRACE — FIX the caption (add the location)
Current `ep04-tj-grace-comic-v1-exact-caption` reads only **"1952"** (no place) — inconsistent. Re-gen the SAME
composition (dim 1950s mainframe hall, UNIVAC tape reels, drafting table, desk lamp) but caption =
**`PHILADELPHIA, 1952`**. (Grace's A-0 compiler at Remington Rand, Philadelphia — accurate; the year sets it
apart from the ENIAC 1945 card.) Out: `ep04-tj-grace-comic-v2-philadelphia-1952-1920.png`.

## 2 · JOY — new card · caption `MIT, 2018`
Establishing: an MIT Media Lab lab/office, night — whiteboards with face-mesh diagrams, an "MIT" mark, a webcam
on a monitor, an Algorithmic Justice League poster on the wall, the white mask resting on the desk. **No person.**
Out: `ep04-tj-joy-comic-v1-mit-2018-1920.png`.

## 3 · TIMNIT — new card · caption `GOOGLE, 2020`
Establishing: a Google-style open-plan tech office, 2020 — colorful campus furniture, a cleared/empty desk with
a badge left behind (the departure), monitors dark. Somber, not celebratory. **No person.**
Out: `ep04-tj-timnit-comic-v1-google-2020-1920.png`.

## 4 · EMILY — new card · caption `UNIVERSITY OF WASHINGTON, 2021`
Establishing: a University of Washington computational-linguistics office, 2021 — linguistics books, a laptop with
a paper titled "On the Dangers of Stochastic Parrots," a small parrot motif (figurine/sticker), campus (rainy
Seattle / Suzzallo library gothic) through the window. **No person.**
Out: `ep04-tj-emily-comic-v1-uw-2021-1920.png`.

## 5 · KATE — new card · caption `USC ANNENBERG, 2021`
Establishing: a research study, 2021 — a large wall MAP/atlas tracing AI's supply chain (mines, water,
electricity, shipping routes), the "Atlas of AI" book on the desk, warm lamp. **No person.**
Caption LOCKED `USC ANNENBERG, 2021` (Ali 2026-07-20). Out: `ep04-tj-kate-comic-v1-usc-2021-1920.png`.

---
QC on delivery: caption reads EXACTLY `PLACE, YEAR` as above; no person in any card; matches the locked
time-jump card style (border + top-left cream label + comic register); no gibberish text.

---

# ADDENDUM (Ali 2026-07-20) — ONE shared year card replaces ALL 4 modern place cards

**Change:** the four modern MAiVENs (Joy, Timnit, Emily, Kate) span 2018→2021 at four different institutions.
Instead of four place cards chopping up the montage, they share **ONE year card** covering the whole modern
stretch, then all four portraits flow uninterrupted.
⛔ All four just-made cards (`tj-joy…mit-2018`, `tj-timnit…google-2020`, `tj-emily…uw-2021`, `tj-kate…usc-2021`)
come OUT of the video cut once this lands. (Keep the files — they may still earn a spot as article/still art.)

## NEW CARD · caption `2018–2021`
Same card style as the rest (see the style block above): comic establishing shot, **cream caption box top-left**,
black comic panel border, locked comic register, **NO person in frame**, caption rendered in-generation.

**Scene:** a contemporary research workspace — an open laptop on a desk, a printed academic paper and loose
pages, sticky notes, a coffee cup, a phone face-up, a modern city or campus visible through a window at night.
Deliberately **NON-institutional** (it stands in for four different places at once) — no logos, no university
marks, no company branding. Quiet, serious, a little charged.

**Caption must read EXACTLY:** `2018–2021`
Out: `ep04-tj-modern-comic-v1-2018-2021-1920.png`.

## Wiring once it renders (Claude does this)
- REMOVE all 4 place cards from `episode-04-cues.json`.
- INSERT this card at **t=895.65** (2s hold) — the top of the modern montage — then Joy → Timnit → Emily →
  Timnit(firing) → Kate all flow with no further cards.
