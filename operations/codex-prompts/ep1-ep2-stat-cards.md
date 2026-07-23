# EP1 + EP2 — the 4 missing STAT cards (comic style)

*2026-07-22. These 4 beats are statistics graphic cards with no image yet. Generate each as a
comic/pop-art STAT card: big bold number/comparison + the label, in the episode style. Text
rendered in-generation, letter-exact. Deliver to `assets/episodes/ep-NN/pixel/`.*

| ep · cue | stat to show | deliver to |
|---|---|---|
| Ep1 · 12 | **"For every 100 men using generative AI, 78 women do"** — a 100-vs-78 comparison | `assets/episodes/ep-01/pixel/ep01-stat-100men-78women-comic-v1-1920.png` |
| Ep1 · 13 | **three stats** (stats3) — pull the exact three from `content/episodes/episode-01.canon.md` | `assets/episodes/ep-01/pixel/ep01-stats3-comic-v1-1920.png` |
| Ep1 · 29 | **"Senior women who push through don't catch up — they lead men by +14 percentage points"** | `assets/episodes/ep-01/pixel/ep01-stat-14points-comic-v1-1920.png` |
| Ep2 · 17 | **"~40% higher-quality work — for the consultants who briefed well"** | `assets/episodes/ep-02/pixel/ep02-stat-40pct-comic-v1-1920.png` |

## QC
1. Comic/pop-art register (bold ink, flat colour), NOT painterly. Reads at video size.
2. The number is the hero — big, legible. Label letter-exact. "AI" caps, Ai spellings correct.
3. 1920×1080.

---
*Standing art-requirements (carried so the hook passes):*

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
