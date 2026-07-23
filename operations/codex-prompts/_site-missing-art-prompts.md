# Site missing NON-CARD art — audit + prompts

**Written:** 2026-07-23 (overnight audit; Ali asleep — read-only, zero code/DB/HTML changes made).
**Scope:** find NON-card images the live site is genuinely missing (file absent on disk) AND whose
subject is unambiguous from canon, then write a Codex prompt for each. Anything needing Ali's art
direction is listed as **NEEDS ALI DIRECTION** instead of a guessed prompt. Trading cards are out of
scope (handled by the `_card-*` prompt files).

**Filename is underscore-prefixed (`_`)** so it is exempt from the episode art hook — see the note in
"Why the episode rules mostly don't apply" below. The full `art-requirements.md` block is pasted
verbatim at the end regardless, so any imagery this file ever commissions carries the rules.

---

## HOW THIS WAS VERIFIED (not from memory)

1. **Static `<img>` / `url()` scan across 120 live HTML files** (all top-level pages + `issues/`,
   `games/`, `community/`, `mall/`, `grimoire/`, `content/`; excluded `_`-prototypes, `preview-*`,
   `_superseded/`, `.retired/`, `.versions/`, `operations/`). Every referenced `src`/`href`/`poster`/
   `url()` was resolved against disk. **Result: 0 broken references.** Every building page, the Closet
   renders (`assets/closet/`), the charm bracelet, mastheads, etc. all resolve.
2. **Data-driven scan of every live `.json` + `script.js`** for asset-path string literals, resolved
   against disk. Only ONE live gap surfaced (below). All other hits were historical QA review-packets
   and a curation backup — not live surfaces.
3. **Charms:** `assets/charms/` holds complete sets `w1-*` … `w4-*`. Episodes 1–4 are `published`;
   Episode 5 is `draft` (`content/episode-index.json`). So charms are **complete for every published
   episode — no gap.**
4. **Town-character portraits** cross-checked against `operations/ops/curation.json` for redo/unused
   flags before proposing anything.

---

## WHAT'S GENUINELY MISSING

### 1 gap found — and it NEEDS ALI DIRECTION (no prompt written)

**DJ SunnyV — Resident Card avatar.**
`content/data/character-cards.json` (consumed live by `laidies-card.html`) points DJ SunnyV's avatar
at `/assets/town-characters/y2k-portraits/dj-sunnyv-y2k-portrait.png`. **That file — and the entire
`assets/town-characters/y2k-portraits/` directory — does not exist on disk.** The other three
residents in that file (Mme CLAi-O, FAiRY Godmother, Mayor Deb) resolve to existing painterly
`…-portrait-v3.png` avatars, so on the live Resident Card grid DJ SunnyV is the one broken tile.

**Why this is NOT a confident commission — it is deferred to Ali:**

- The JSON path deliberately uses a **new, one-off directory + naming convention** (`y2k-portraits/`,
  `…-y2k-portrait.png`) that **no other character uses and that has zero examples anywhere.** Someone
  set up a fresh "Y2K portrait" treatment for the town characters and only wired DJ SunnyV's path —
  the style itself is undefined. I can't see what "y2k-portrait" is supposed to look like, so I won't
  invent it.
- The town-character portrait system is **mid-redo.** In `curation.json`, several sibling avatars
  (two of the three `-portrait-v3` painterly portraits, the whole `-portrait-pixel-v1` pixel set, and
  most `-scene` renders) are flagged **`redo`**. Matching the current siblings would mean matching
  assets Ali has already flagged for replacement — and the new `y2k-portraits/` path suggests the
  replacement direction is exactly what's undecided.
- Per memory (`town-character-portraits-canon`, `character-two-track-system`,
  `character-comic-treatment-status`), the portrait treatment is an open, art-direction-heavy call —
  precisely the kind of thing to surface, not guess.

**What Ali needs to decide (then this becomes a 5-minute prompt):**
1. Which treatment wins for the Resident Card avatars — the painterly `-portrait-v3` look, a new
   "Y2K portrait" look (and what that means), or something else? Whatever she picks should apply to
   **all four** residents so the card grid is consistent.
2. Once the treatment is chosen, DJ SunnyV's **subject and likeness are already locked and safe to
   reference:** `approved-assets/town-characters/scenes/dj-sunnyv-scene.png` is marked **`correct`**
   in curation and shows her face/hair/styling. Canon for her is settled: KSVL Community RAiDIO DJ,
   99.9 FM, motto *"Don't just learn from books. Learn from hooks."* (memory `dj-sunnyv-*`,
   `ksvl-*`). So the only missing input is the STYLE, not the person.

> **Fastest unblock that touches no art:** if Ali would rather not commission a new portrait tonight,
> the broken tile can later be pointed at an existing `correct` DJ SunnyV asset — but that's an
> HTML/JSON edit, which is out of scope for this read-only pass. Flagging, not doing.

---

## WHAT IS NOT MISSING (checked, so nobody re-chases these)

- **No broken static `<img>` anywhere** on 120 live pages. Building pages, Closet, mastheads, charm
  bracelet, episode heroes (incl. `assets/building-interiors/luminairy-nave.jpg` for Ep4 and the
  `ep-05.webp` VHS box for the Ep5 draft) all resolve.
- **Charms** complete for all published episodes (`w1`–`w4`).
- **Closet vessel art** present (`assets/closet/closet-room-v5-walkin.png` and siblings) and wired.
- The `town-hall.html` DJ SunnyV pixel portrait exists (it is `redo`-flagged in curation, but the file
  is on disk — that's a redo, not a broken link, and pixel-portrait redo is a separate art-direction
  track, not a missing-file gap).

---

## TALLY

- **Prompts written for confidently-missing images: 0.**
- **Genuine live gaps found: 1** (DJ SunnyV Resident Card avatar) — **listed as NEEDS ALI DIRECTION**
  because the treatment/style is undefined, even though the subject is clear.

Honest result: after full verification, the site has no non-card image that is both genuinely missing
AND fully specifiable (subject *and* style) without Ali. The one real gap is surfaced above with
everything she needs to unblock it in one decision.

---

## Why the episode rules mostly don't apply here (and the block anyway)

This file is `_`-prefixed, so the episode art hook (which bans halftone and enforces the 1920×1080
comic-frame spec) does not fire on it. That matters because the only candidate here is a **static
Resident Card portrait avatar**, not an episode video frame — so the episode-specific requirements
(**1920×1080**, `comic-v1-locked` style, the **per-episode heroine outfit**, continuity-with-adjacent-
shots) are **not** the governing spec for it. The requirements that DO still bind any town-character
portrait — **likeness to a real reference file, complete/correct anatomy, every word legible, period
accuracy (nothing post-1999), "AI" always both capitals, and no invented person** — are carried
below. The full block is pasted verbatim so it travels with the file:

---

<!-- BEGIN art-requirements.md (verbatim) -->

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

<!-- END art-requirements.md (verbatim) -->
