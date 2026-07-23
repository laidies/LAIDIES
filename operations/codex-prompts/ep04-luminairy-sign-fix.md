# Ep4 — LUMINAiRY APPROACH, corrected sign

*Rewritten 2026-07-22. **ONE frame. Send it by itself.** Do not batch it with anything —
batching is what caused template collapse in the last run.*

---

## WHY THIS FRAME IS BEING REDONE

The marquee renders **`LUMiNAiRY`** — two lowercase i's. It must read **`LUMINAiRY`**:
capital **L-U-M-I-N-A**, then lowercase **`i`**, then **R-Y**. Only the `Ai` carries the
lowercase i; it is a brand device and appears nowhere else in the word.

This is the ONLY fault. Everything else about the wired frame is right — composition,
lighting, the heroine, the jacaranda, the lanterns — and must survive unchanged.

⛔ **This cannot be fixed by editing the existing image.** Compositing a corrected letter on
top was tried on 2026-07-22 and rejected: two-stage text never inherits the paint register
and reads as applied-on. The sign text must be rendered as part of the image.

### Two traps in the existing files
- `ep04-open-16-luminairy-approach-comic-v4-correct-sign-1920.png` **is misnamed.** It still
  reads `LUMiNAiRY`. Do not use it as a reference and do not treat it as the fix.
- The `v3` render drifted soft and watercolour-blotchy. **`v1` is the quality bar**, not v3.

---

## REFERENCES — use exactly these two, choose no others

**1 · Composition, lighting, style, quality bar — MATCH THIS:**
`assets/episodes/ep-04/pixel/ep04-open-16-luminairy-approach-comic-v1-1920.png`

**2 · Proof of the CORRECT SPELLING — for the sign lettering ONLY:**
`assets/episodes/ep-04/pixel/ep04-scene-02a-luminairy-wide-v6-LUMINAiRY-review.png`
⚠ This is a **pixel-generation** frame. Verified 2026-07-22 to spell `LUMINAiRY` correctly.
Take the LETTERING from it and nothing else — ⛔ never its style, softness or palette.

---

## THE SHOT

Lantern Hill at sunset. The heroine seen **from behind**, walking the brick path toward the
LUMINAiRY. Jacaranda in bloom, strung lanterns overhead, path lanterns along the wall, the
rose window and lit arched windows ahead. `LANTERN HILL` street sign at left.

The building marquee reads, letter-exact: **LUMINAiRY**

**Register:** bold black ink, hard angular shadow planes, flat vibrant colour, crisp edges.
⛔ No halftone. ⛔ Not soft, blended or watercolour — that is exactly what went wrong in v3.

**Deliver to:** `assets/episodes/ep-04/pixel/ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png`
**1920 × 1080.**

---

## QC — answer each one before this frame is shown to Ali

1. **Read the marquee aloud, letter by letter: L-U-M-I-N-A-i-R-Y.** Exactly one lowercase
   letter, the `i` in `Ai`. If there are two lowercase i's, it has failed.
2. `LANTERN HILL` spelled correctly, no gibberish lettering anywhere else in frame.
3. Side by side with `v1`: is it at least as crisp? No halftone, no blotching?
4. She is in the Ep4 outfit, seen from behind, hair 90s-styled.
5. Exactly 1920 × 1080.

Then run `python3 Website-homepage/operations/tools/qc-frames.py` before review.

---

## HARD REQUIREMENTS — a frame failing any of these is rejected

**1 · Exactly 1920 × 1080.** Wrong dimensions are auto-rejected before review.

**2 · Style `comic-v1-locked`** — bold black ink, HARD ANGULAR shadow PLANES, flat saturated colour. ⛔ No halftone. ⛔ Not painterly, watercolour, airbrushed or blotchy.

**3 · CONTINUITY IS NOT OPTIONAL.** Each frame below names the shot before it and/or after it *in the same scene*. The new frame must read as the same room, the same moment, the same person — same hair, same clothes, same light, same period. If the anchor shows her in a green dress at a desk by a window, she is still in that green dress at that desk. ⛔ Do not restyle, re-cast or re-dress between shots.

**4 · LIKENESS.** Every named real woman has a photo reference path. Match HER face. ⛔ Do not invent a plausible person. A woman appearing in several beats uses the SAME reference in every one.

**5 · SETTING MUST BE REAL.** A real SUNNYVAiLE building or a genuine historical location. ⛔ No invented places. ⛔ No literal mashups — do not weld a biographical detail onto a technical one (e.g. a dataset's photos pinned up inside a family's dry-cleaning shop).

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

> **EP4: yellow tartan/plaid shirt-jacket worn open over a white tee, butterfly hair clips,
> loose 90s waves, small gold hoops, shoulder bag.**

⛔ **NEVER corporate.** No navy pantsuit, no blazer-and-blouse, no office tailoring. SUNNYVAiLE is a Y2K town and she lives there — she does not commute in from a law firm. In the Ep4 batch she appeared in four different outfits, four of them corporate.
