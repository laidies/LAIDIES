# CHARACTER TRADING CARD DECK — 10 keeper cards (3 blocked)

**Why:** the Character deck is the only thing blocking the locked trading-card economy
(`operations/trading-card-economy-locked.md`). The machinery is built and tested — server-side
pack opening, visible pity counter, duplicates. It has no Character cards to deal.

**Send these ONE AT A TIME.** Batching causes template collapse (locked art direction).
Ten separate sends. Do not paste the whole file into one request.

---

## 🔴 THREE CHARACTERS ARE BLOCKED — do not generate these yet

`operations/ops/curation.json` marks every existing portrait of these three `unused` or `redo`,
so there is no approved face to match. A card made now would invent a person, which is the
top failure class in `episode-art-four-failure-classes`.

| Character | What exists | What's needed first |
|---|---|---|
| **Miss Jeeves** | `jeeves-desk` + `jeeves-scene` — both `unused` | an approved face, then her card |
| **Mme CLAi-O** | only `mme-claio-reading-room` + `06-mme-claios-shop-landscape-v1` are `correct` — those are her ROOM and her SHOP, not her | an approved face, then her card |
| **FAiRY Godmother** | only `11-fairy-godmother-house-v6` is `correct` — that's her HOUSE | an approved face, then her card |

That's a portrait pass, and it comes before this one. Ali decides whether the existing `unused`
portraits are actually fine (in which case flip them to `correct` in curation.json and they
unblock immediately) or whether new ones are needed.

---

## WHAT I NEED BACK

**10 PNGs, portrait, named exactly:** `assets/cards/characters/<slug>-card-v1.png`

| # | slug | Character | Building | Match her face AND outfit to |
|---|---|---|---|---|
| 1 | `jojo` | JoJo | Blend & Snap · No.4 MAiN | `assets/town-characters/scenes/jojo-scene.png` |
| 2 | `paige` | Paige | NewsStand · No.2 MAiN | `assets/town-characters/scenes/paige-scene.png` |
| 3 | `penny` | Penny | Post Office · Civic Square | `assets/town-characters/scenes/penny-scene.png` |
| 4 | `becky` | Becky | Chick Flicks · No.3 MAiN | `assets/town-characters/scenes/becky-scene.png` |
| 5 | `june` | June | Delta LAi Nu · Wisteria Ln | `assets/town-characters/scenes/june-scene.png` |
| 6 | `cosmo` | Cosmo | BRONZE AiGE · No.7 MAiN | `assets/town-characters/scenes/cosmo-scene.png` |
| 7 | `matron-lumen` | Matron Lumen | The LUMINAiRY · Lantern Hill | `assets/town-characters/scenes/matron-lumen-scene.png` |
| 8 | `paulette` | Paulette | MAiKEOVER · No.6 MAiN | `assets/town-characters/scenes/paulette-scene.png` |
| 9 | `mayor-deb` | Mayor Deb | Town Hall · Civic Square | `assets/town-characters/scenes/mayor-deb-scene.png` ✅ curated correct |
| 10 | `dj-sunnyv` | DJ SunnyV | KSVL 99.9 · No.10 MAiN | `assets/town-characters/scenes/dj-sunnyv-scene.png` ✅ curated correct |

⛔ **`sam-scene.png` is DEAD.** "Sam" was the working name for the BRONZE AiGE bartender before
Ali renamed him **Cosmo**. Do not use that file or that name.

### ONE artwork per character — not three
Rarity in this deck is the **FINISH** (common · holo · foil), not the character. Holo and foil are
CSS treatments over the same PNG in the browser. So 10 generations, not 30. Leave the art clean —
no glitter, no rainbow sheen, no foil baked in. The shine is added later.

---

## PASTE THIS BLOCK VERBATIM INTO EVERY SEND

<!-- BEGIN art-requirements block — generated from operations/art-requirements.md, do not hand-edit -->

## HARD REQUIREMENTS — a frame failing any of these is rejected

**1 · Exactly 1920 × 1080.** Wrong dimensions are auto-rejected before review.

**2 · Style `comic-v1-locked`** — bold black ink, HARD ANGULAR shadow PLANES, flat saturated colour. ⛔ No halftone. ⛔ Not painterly, watercolour, airbrushed or blotchy.

**3 · CONTINUITY IS NOT OPTIONAL.** Each frame below names the shot before it and/or after it *in the same scene*. The new frame must read as the same room, the same moment, the same person — same hair, same clothes, same light, same period. If the anchor shows her in a green dress at a desk by a window, she is still in that green dress at that desk. ⛔ Do not restyle, re-cast or re-dress between shots.

**4 · LIKENESS.** Every named real woman has a photo reference path. Match HER face. ⛔ Do not invent a plausible person. A woman appearing in several beats uses the SAME reference in every one.

**5 · SETTING MUST BE REAL.** A real SUNNYVAiLE building or a genuine historical location. ⛔ No invented places. ⛔ No literal mashups — do not weld a biographical detail onto a technical one (e.g. a dataset's photos pinned up inside a family's dry-cleaning shop).

**5b · SUNNYVAiLE GEOGRAPHY IS CANON.** If two or more buildings appear in one shot, they must be neighbours in the real town. ⛔ Do not invent an adjacency to fill a frame.

> **MAiN Street, in order:** 1 Visitor's Centre · 2 NewsStand · 3 Chick Flicks · 4 Blend & Snap · 5 Mme CLAi-O's · 6 MAiKEOVER on MAiN · 7 BRONZE AiGE · 8 Dream Phone booth · 9 The Mall · 10 KSVL 99.9
>
> **NOT on MAiN** — these are on cross streets that run BEHIND it: **LIBRAiRY, Town Hall, Post Office** (Civic Square — LIBRAiRY on the RIGHT, Post Office on the LEFT) · **SUNNYVAiLE High** (Schoolhouse Road) · **FAiRY Godmother's house** (Willow Lane) · **Delta LAi Nu** (Wisteria Lane) · **The LUMINAiRY** (Lantern Hill).

⛔ **The LIBRAiRY is NOT on MAiN Street and is NOT beside Blend & Snap.** This exact error has now been made three times — `main-street-golden`, `main-street-dusk` (both re-rolled 2026-07-06) and `ep04-around-town-b-comic-v1` (banned 2026-07-22). Full layout: memory `sunnyvaile-street-layout-canon`.

**6 · PHYSICAL PLAUSIBILITY.** Objects obey physics. A stack of paper is separate sheets with edges, not a solid slab with text printed on its side.

**6b · ANATOMY.** Every figure has a complete, correctly-jointed body. If a person is shown below the waist she has **legs and feet** that connect to her hips and reach the ground. ⛔ No body that simply stops behind a foreground object. ⛔ No missing or extra limbs, no hands with the wrong number of fingers, no head attached at an impossible angle. If a prop would crop the figure, crop the FRAME deliberately — do not delete the body part.

**7 · "AI" is ALWAYS both letters capital** — never "Ai". The accented i belongs to brand words only (LAiDIES, SUNNYVAiLE, MAiVENS, LUMINAiRY).

**6c · PERIOD ACCURACY.** Nothing in frame may postdate the year of the scene — no flat screens in 1952, no mobile phones in 1946, no modern typography on period signage. The LOCATION must be the real place the event happened. The NUMBER of people must be right (the ENIAC programmers are SIX).

**6d · AGE.** Each woman is the age she was AT THIS MOMENT, not her famous later portrait. Grace Hopper in 1952 is 45 and a civilian — not the white-haired Rear Admiral of decades later.

**6e · BACKGROUND FIGURES.** Faces in the background must be coherent — no melted, smeared or half-formed features. If a face cannot be drawn cleanly at that size, turn the figure away or move it further back.

**7b · EVERY WORD LEGIBLE AND CORRECT.** No garbled or invented lettering anywhere — signage, screens, book spines, papers. Check numbers: KSVL is **99.9**. Check brand spellings: LUMINAiRY has ONE accented i. ⛔ Do not letter a word you cannot render cleanly — leave the surface plain instead.

**8b · READS AT VIDEO SIZE.** The subject must be legible when this plays at 1/3 screen. ⛔ No critical detail so small it disappears — if the beat is about a face, the face is large in frame.

**8 · Populated SUNNYVAiLE scenes** = women in Y2K-era dress, diverse. Storefronts empty.

**9 · Never mix generations.** No pixel, `comic-barsetter` or `comic-v2-graphic-novel` frames scavenged or adapted. Draw fresh in `comic-v1-locked`.

**10 · Text rendered IN-generation.** No blank plates for text added later.

### 🔴 THE HEROINE'S OUTFIT — ONE LOOK FOR THE WHOLE EPISODE
She wears a **different outfit each week, and the SAME outfit in every frame of a given episode**, with 90s-styled hair.

> **EPISODE OUTFIT:** _injected per episode from `episode-0N.canon.md` → `## heroine_outfit`_

⛔ **NEVER corporate.** No navy pantsuit, no blazer-and-blouse, no office tailoring. SUNNYVAiLE is a Y2K town and she lives there — she does not commute in from a law firm. In the Ep4 batch she appeared in four different outfits, four of them corporate.


<!-- END art-requirements block -->

> **CARD OVERRIDE — dimensions.** Rule 1 above governs episode frames. These are CARDS:
> **1200 × 1680 PORTRAIT** (5:7, true trading-card proportion).

> **CARD-DECK NOTE ON OUTFIT.** The heroine does NOT appear in this deck — these are the town
> keepers. The outfit rule binds as **costume continuity**: each keeper wears exactly what she
> wears in her reference scene. Same clothes, same hair, same jewellery. Do not redesign her
> outfit for the card. NEVER corporate — they work in a 1999 town.

---

## CARD FORMAT

**Composition**
- **Full-bleed environmental portrait.** She is mid-activity in HER OWN building — pouring, filing,
  stamping, spinning a record. Not posed, not a headshot on a plain ground.
- **Face occupies roughly the top third** and must read at 300px tall.
- **Bottom ~15% is a solid ink NAME BAR** carrying her name, rendered in-generation.
- No halo, no roses, no baroque frame, no hearts — that lock was reversed, they are dead.
- No plum-and-gold card frame. That palette is RETIRED.
- No glitter / foil / rainbow. Finishes are added in the browser.

**Palette:** the town's candy accents — pink `#e982ab`, teal `#57b6c0`, coral `#ec7a78`,
periwinkle `#b3abe7` — over bold black ink. Saturated, not muted.

**Name bar:** her name EXACTLY as in the table, plus her role in smaller caps.
Example: **PENNY** / *POSTMISTRESS*. Check the accented i's — they are canon.

---

## THE 10 PROMPTS — one per request

### 1 · JoJo — Blend & Snap
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **JoJo**, the barista at the Blend & Snap, No.4 MAiN, SUNNYVAiLE, 1999. Match her face, hair and
> outfit to `assets/town-characters/scenes/jojo-scene.png`.
> Mid-activity: sliding a paper cup across the counter, already knowing how you take it. Espresso
> machine, chalk menu board, stacked cups. Warm café light.
> Bottom ink bar reads **JOJO**, with *BARISTA* beneath in smaller caps.

### 2 · Paige — NewsStand
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **Paige**, the town reporter who runs the editions at the NewsStand, No.2 MAiN, 1999. Match her
> face, hair and outfit to `assets/town-characters/scenes/paige-scene.png`.
> Mid-activity: notebook up, pen mid-question, papers fanned behind her. Asking, not posing.
> Racks of newspapers and magazines.
> Bottom ink bar reads **PAIGE**, with *REPORTER* beneath.

### 3 · Penny — Post Office
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **Penny**, postmistress at the Post Office on Civic Square (NOT on MAiN), 1999. Match her face,
> hair and outfit to `assets/town-characters/scenes/penny-scene.png`.
> Mid-activity: bringing a rubber stamp down on a parcel, half-smiling. Brass PO-box wall,
> pigeonholes of mail, a string-tied parcel on the counter.
> Bottom ink bar reads **PENNY**, with *POSTMISTRESS* beneath.

### 4 · Becky — Chick Flicks
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **Becky**, the video-store clerk at Chick Flicks, No.3 MAiN, 1999. Match her face, hair and outfit
> to `assets/town-characters/scenes/becky-scene.png`.
> Mid-activity: holding out a VHS tape in a clamshell case — recommending it, not shelving it.
> Walls of rental tapes, a cleanly rendered BE KIND REWIND sign.
> Bottom ink bar reads **BECKY**, with *VIDEO CLERK* beneath.

### 5 · June — Delta LAi Nu
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **June**, the Cool House Mom of Delta LAi Nu on Wisteria Lane (NOT on MAiN), 1999. Match her face,
> hair and outfit to `assets/town-characters/scenes/june-scene.png`.
> ORIGINAL character — do NOT draw a likeness of any real actress.
> Mid-activity: setting down a tray of snacks in the sorority-house living room, mid-sentence, warm
> and unbothered. Sorority letters on the wall behind her.
> Bottom ink bar reads **JUNE**, with *HOUSE MOM* beneath.

### 6 · Cosmo — BRONZE AiGE
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **Cosmo**, the bartender at the BRONZE AiGE, No.7 MAiN, 1999 — a Black/Latino gay man, the town's
> first male keeper. Match his face, hair and outfit to
> `assets/town-characters/scenes/cosmo-scene.png`. Do NOT use `sam-scene.png`.
> Mid-activity: setting down a coupe glass, reading the room. Backlit bottles, brass rail, low
> jewel-toned bar light.
> Bottom ink bar reads **COSMO**, with *BARTENDER* beneath.

### 7 · Matron Lumen — The LUMINAiRY
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **Matron Lumen**, lantern-keeper of the LUMINAiRY on Lantern Hill (NOT on MAiN), 1999. Match her
> face, hair and outfit to `assets/town-characters/scenes/matron-lumen-scene.png`.
> Mid-activity: touching a taper to a candle, turning toward the viewer. Stained-glass wings behind
> her, warm candlelight. No halo — she tends the light, she does not emit it. Reverent, not religious.
> Bottom ink bar reads **MATRON LUMEN**, with *LANTERN-KEEPER* beneath. LUMINAiRY has ONE accented i.

### 8 · Paulette — MAiKEOVER on MAiN
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **Paulette**, the beautician at MAiKEOVER on MAiN, No.6 MAiN, 1999. Match her face, hair and
> outfit to `assets/town-characters/scenes/paulette-scene.png`.
> She is a *Legally Blonde* resident cameo — evoke Jennifer Coolidge's warm, chatty ENERGY, NOT a
> photo-exact likeness of the actress.
> Mid-activity: mid-blow-dry with a round brush, talking over the noise. Salon mirrors, colour
> swatches, dryer chairs.
> Bottom ink bar reads **PAULETTE**, with *BEAUTICIAN* beneath.

### 9 · Mayor Deb — Town Hall
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **Mayor Deb**, mayor of SUNNYVAiLE, at Town Hall on Civic Square (NOT on MAiN), 1999. Match her
> face, hair and outfit to `assets/town-characters/scenes/mayor-deb-scene.png`.
> Mid-activity: mid-gesture behind her desk, as though deflecting a question she will not answer.
> Civic seal, filing cabinets, a nameplate.
> Bottom ink bar reads **MAYOR DEB**, with *MAYOR* beneath.

### 10 · DJ SunnyV — KSVL 99.9 FM
> Character trading card, portrait 1200 × 1680, style `comic-v1-locked`.
> **DJ SunnyV**, the DJ at KSVL 99.9 FM, No.10 MAiN, 1999. Match her face, hair and outfit to
> `assets/town-characters/scenes/dj-sunnyv-scene.png`.
> Mid-activity: one headphone cup held to her ear, other hand on a fader. Mixing desk, ON AIR light,
> record wall. The dial reads **99.9** — check the number.
> Bottom ink bar reads **DJ SUNNYV**, with *RADIO* beneath.

---

## QC BEFORE ALI SEES ANY OF IT
Run `operations/tools/qc-frames.py` on the returned files, then check by eye:
1. 1200 × 1680 portrait?
2. Name bar spelled exactly right, accented i's included?
3. Same woman as her reference — not a plausible stranger?
4. Same outfit as the reference, and never corporate?
5. Complete body, correct number of fingers?
6. Any building visible — right building, right place in town?
7. Anything post-1999 in frame?
8. Any baked-in foil or glitter? There must be none.
