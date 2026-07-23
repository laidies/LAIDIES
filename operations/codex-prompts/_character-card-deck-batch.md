# CHARACTER TRADING CARD DECK — 13 keeper cards (POP-ART)

> Filename starts with `_` on purpose. The episode art-requirements hook enforces
> `comic-v1-locked`, whose rule 2 is **"⛔ no halftone."** Trading cards are a DIFFERENT
> locked style — **pop-art WITH Ben-Day halftone** (Ali's refs, 2026-07-18). Forcing the
> episode block onto a card prompt would tell Codex "halftone" and "no halftone" at once.
> The card rules live here instead, drawn from the reference images Ali actually sent.

**Style source — the images Ali shared, do not paraphrase, LOOK at them:**
`operations/reference/trading-cards/tradingref-01.png` (person card) · `tradingref-04.png` (frame) ·
`operations/reference/trading-cards/README.md`.

**Send ONE AT A TIME.** Batching collapses the template. 13 separate sends.

---

## THE LOOK (from tradingref-01 + tradingref-04)

A **pop-art comic portrait of the character** inside a **comic-burst frame**:

- **Portrait:** bold black outlines, **Ben-Day / dot-halftone shading**, flat vivid color, dramatic
  angle (the Debbie Gibson ref is an over-the-shoulder look). Her face large, top ~40%.
- **Name banner across the top** — her name in chunky comic lettering on a halftone strip.
- **White comic stars** scattered as accents. **White outer border**, rounded corners.
- **Frame background** = comic starburst / action-lines (tradingref-04): jagged bursts, speed lines,
  scattered dots and stars radiating out behind the portrait.
- **PALETTE:** ⛔ NOT the Debbie-Gibson primary red/blue. Use the **town candy accents** — pink
  `#e982ab`, teal `#57b6c0`, coral `#ec7a78`, periwinkle `#b3abe7` — over black ink and cream. That's
  the one change from the refs (README: "match brand-palette accents").
- ⛔ **RETIRED, do not use:** plum-and-gold frame, celestial/roses/gold-tarot saint register, halos.
- ⛔ **No glitter/foil baked in** — holo & foil are CSS finishes over the same PNG. **13 images, not 39.**

**Dimensions: 1200 × 1680 portrait** (5:7).

**"AI" is always both capitals; brand words keep the accented i** (LAiDIES, SUNNYVAiLE, LUMINAiRY,
FAiRY, Mme CLAi-O). Check the name banner spelling every time.

---

## THE 13 — face/look reference is each keeper's APPROVED asset

Pop-art stylizes her *look*, so these need her established appearance, not a photo-real face plate.
Reference paths below are all curation-approved or live-site (the rejected `*-scene.png` files are
deliberately NOT named here).

| # | slug | Character · role | Look reference |
|---|---|---|---|
| 1 | `jojo` | JoJo · barista, Blend & Snap | `assets/town-characters/comic/jojo-comic-v1.png` (already comic) |
| 2 | `paige` | Paige · reporter, NewsStand | `assets/town-characters/comic/paige-comic-v1.png` (already comic) |
| 3 | `paulette` | Paulette · beautician, MAiKEOVER | `assets/town-characters/comic/paulette-comic-v1.png` (already comic) |
| 4 | `mayor-deb` | Mayor Deb · Town Hall | ✅ approved `mayor-deb-scene` · also `town-hall-deb-desk`, `deb-80s-portrait-v1` |
| 5 | `dj-sunnyv` | DJ SunnyV · KSVL 99.9 | ✅ approved `dj-sunnyv-scene` |
| 6 | `mme-claio` | Mme CLAi-O · psychic | ✅ approved `mme-claio-reading-room` (she's in it) |
| 7 | `fairy-godmother` | FAiRY Godmother · Ask LAiDY | pull her from the LIVE FAiRY Godmother page render |
| 8 | `jeeves` | Miss Jeeves · librarian | pull her from the LIVE LIBRAiRY page (she's on the reference desk) |
| 9 | `penny` | Penny · postmistress, Post Office | pull from the LIVE Post Office page |
| 10 | `becky` | Becky · video clerk, Chick Flicks | pull from the LIVE Chick Flicks page |
| 11 | `june` | June · house mom, Delta LAi Nu | pull from the LIVE Delta LAi Nu page |
| 12 | `cosmo` | Cosmo · bartender, BRONZE AiGE | pull from the LIVE BRONZE AiGE page. ⛔ NOT "Sam" |
| 13 | `matron-lumen` | Matron Lumen · lantern-keeper, LUMINAiRY | pull from the LIVE LUMINAiRY page |

⚠ **3, 2, 1 already have comic treatment** (`assets/town-characters/comic/*-comic-v1.png`). Those are
the closest existing thing to this style — use them as the primary look reference; the card just adds
the banner + burst frame + halftone around the existing comic portrait.

Deliver to: `assets/cards/characters/<slug>-card-v1.png`

---

## PROMPT TEMPLATE — fill the {BRACKETS} per keeper, send one at a time

> Pop-art comic **trading card**, portrait **1200 × 1680**, rounded corners, white outer border.
> Match the style of `operations/reference/trading-cards/tradingref-01.png` (bold black outlines,
> Ben-Day dot-halftone shading, flat vivid color, over-the-shoulder dramatic angle) set inside the
> comic-burst frame of `tradingref-04.png` (jagged starbursts, speed lines, scattered stars and dots).
> ⛔ Recolor the primary red/blue of the refs to the LAiDIES candy palette: pink #e982ab, teal
> #57b6c0, coral #ec7a78, periwinkle #b3abe7, over black ink and cream.
>
> SUBJECT: **{NAME}**, {ROLE} of SUNNYVAiLE, 1999. Match her established look from **{LOOK REF}** —
> same face, hair, outfit. {ONE ACTION BEAT — what she's doing.}
>
> Top banner in chunky comic lettering reads **{NAME AS ON BANNER}**. White comic stars as accents.
> Her face fills the top ~40% and reads at thumbnail size. Complete, correctly-jointed body; correct
> hands. Nothing in frame postdates 1999.
> ⛔ No plum/gold, no halo, no celestial roses. ⛔ No baked-in foil or glitter.

### Per-keeper fills
1. **JoJo** — {ROLE: barista at the Blend & Snap} · {ACTION: sliding a paper cup across the counter, knowing your order} · banner **JOJO**
2. **Paige** — {reporter at the NewsStand} · {notebook up, pen mid-question} · banner **PAIGE**
3. **Paulette** — {beautician at MAiKEOVER on MAiN; Coolidge energy, not a likeness} · {mid blow-dry, talking over the dryer} · banner **PAULETTE**
4. **Mayor Deb** — {mayor, at Town Hall} · {mid-gesture behind her desk, deflecting the question} · banner **MAYOR DEB**
5. **DJ SunnyV** — {DJ at KSVL 99.9} · {one headphone cup to her ear, hand on a fader; dial reads 99.9} · banner **DJ SUNNYV**
6. **Mme CLAi-O** — {the psychic} · {hands framing a crystal ball, looking up as if you already knew} · banner **MME CLAi-O**
7. **FAiRY Godmother** — {Ask LAiDY, a woman of color} · {wand mid-flourish over a scrap of paper she's rewriting} · banner **FAiRY GODMOTHER**
8. **Miss Jeeves** — {reference librarian} · {turning a card-catalogue drawer toward you} · banner **MISS JEEVES**
9. **Penny** — {postmistress} · {stamp coming down on a parcel, half-smiling} · banner **PENNY**
10. **Becky** — {video-store clerk at Chick Flicks} · {holding out a VHS tape, recommending it} · banner **BECKY**
11. **June** — {"cool house mom" of Delta LAi Nu; ORIGINAL character, not a real actress} · {setting down a snack tray, mid-sentence} · banner **JUNE**
12. **Cosmo** — {bartender at BRONZE AiGE; Black/Latino gay man, first male keeper} · {setting down a coupe glass, reading the room} · banner **COSMO**
13. **Matron Lumen** — {lantern-keeper of the LUMINAiRY} · {touching a taper to a candle} · banner **MATRON LUMEN** (⛔ no halo — she tends the light)

---

## QC each returned file
1. 1200 × 1680 portrait, white border, rounded corners?
2. Pop-art: black outlines + **halftone dots** + flat candy color (NOT plum/gold, NOT primary red/blue)?
3. Banner spelled exactly right — accented i in FAiRY, Mme CLAi-O, LUMINAiRY?
4. Same person as her look reference — not a plausible stranger?
5. Complete body, correct hands? Nothing post-1999?
6. No baked-in foil/glitter?
