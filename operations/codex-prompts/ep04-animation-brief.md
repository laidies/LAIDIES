# EP4 — ANIMATION BRIEF FOR CODEX (finish the motion)

*2026-07-22. Every animated beat below, in the format from `comic-animation-frame-spec.md`.
The keyframe stills ALL EXIST — this is the ANIMATE-BETWEEN-KEYFRAMES pass, not new art.
Rules obeyed: `comic-animation-frame-spec.md` (motion→frames) + `episode-pixel-motion-style-locked.md`
(pacing, ambient, QC — its MOTION rules only; see STYLE conflict below).*

---

## ⚠ TWO CONFLICTS IN THE RULE FILES — Ali decides, do NOT guess

1. **STYLE.** `episode-pixel-motion-style-locked.md` says "videogame pixel art" and points at a
   PIXEL master (`grace-narration-sync-v10`). But the current locked visual direction is
   **COMIC / POP-ART** (`episode-style-comic-popart-direction`, pixel reversed 2026-07-16), and
   every Ep4 keyframe on disk is comic/graphic-novel, not pixel. **→ Match the comic keyframes.
   Use the pixel file only for its MOTION/pacing/QC rules, never its pixel look.**
2. **TRANSFORMATION frame count.** `comic-animation-frame-spec.md` says ~9–11 frames WITH a wand.
   `heroine-appearance-canon` (2026-07-19, newer) says **NO wand, abstract stage, and only the
   5-frame `15p0–p4` set exists.** **→ Use the 5 approved `15p` frames.** If 5 reads choppy,
   that is Ali's call to add in-betweens, not Codex's to invent a wand.

---

## THE RULES, RESTATED (from the two files)
- **1–2 FULL animations per scene**, not per beat. Every other shot holds as a still or gets only
  subtle **source-native ambient** (lights blink only at bulbs that exist; no invented glow).
- **Play ONCE, hold on the last frame. NO loops** (except true zero-net-travel ambient).
- Every camera move is **motivated by a subject** — a face, a document, a machine panel — eased
  start/stop, single direction, constant magnification. Never drift toward empty space.
- **Never warp/stretch/optical-flow limbs or faces.** A new pose = its own keyframe (all exist here).
- Deliver **1920×1080 H.264 beside the source frames; never overwrite an approved original.**

---

## THE ANIMATED BEATS  (keyframes exist — animate between them)

### 1 · TRANSFORMATION — 3:05 (cue 13), hold 17s
- **ONE fixed background, reused every episode.** Three states on that same background:
  **(1) corporate outfit → (2) magic cloud (poof covers her) → (3) outfit reveal.**
- **The ONLY thing that changes per episode is the reveal outfit.** Background, corporate start,
  and magic cloud are SHARED and identical every week. This week's reveal = the Ep4 outfit
  (yellow tartan, 6 butterfly clips, 90s waves).
- **Frames (all exist):** `open-15p0-…-corporate` (state 1) → `open-15p1/15p2/15p3-…-poof-*`
  (state 2, the cloud building/covering/clearing) → `open-15p4-…-reveal` (state 3, the outfit).
- **Motion:** play once. Corporate holds ~2s → the cloud poofs up and covers → clears to the
  reveal → **hold the reveal** to the end of the beat.
- ⛔ NO wand. NO FAiRY Godmother visible. NO town / Main Street / storefronts. Just the Heroine
  on the one background, the cloud, and the new outfit. The `15f` Main-Street version is RETIRED.

### 2 · ADA — the punched card — 4:10 (cue 18), hold 49.7s
- ⚠ **The existing `ada-loop-v1` is what Ali flagged: wrong place + looped poorly.** Redo it.
- **Motion:** directional — the punched-card / note motion travels **toward camera ONCE, then FREEZES**.
- **Frames:** animate on `scene-03-ada-b-mid` (the punched card). Play once over ~8–10s, hold the rest.
- ⛔ Do not loop. Do not cut to the source still (it will not match).

### 3 · GRACE — the moth — 10:15 (cue 29), hold 12.6s  ·  EXACT NARRATION CUE
- **Motion:** STATE-CHANGE — the moth flies in and **lands on the relay** exactly as the line says it.
- **Frames (2 exist; the flight is the animation):**
  `scene-05-grace-b-mid` (before) → `scene-05-grace-c-end` (moth landed). Codex animates the moth's
  flight+landing between them. Play once, settle, hold.
- The pixel-motion file names this exact beat as a sanctioned one-time action — follow it.

### 4 · FEI-FEI — the wall fills — 13:17 (cue 43), hold 23s  ·  REVEAL
- **Motion:** PULL-OUT / REVEAL of scale — the wall **fills with millions of images** as she says it.
- **Frames (2 exist):** `scene-09-fei-fei-a-start` (empty wall) → `scene-09-fei-fei-b-mid`
  (wall full — "millions upon millions"). Animate empty→full, ending wide on the full scale. Hold.

### 5 · NAMING — chalk on the board — 10:32 (cue 31), hold ~5s  ·  STATE-CHANGE
- **Motion:** the naming/definition **writes onto the chalkboard**.
- **Frames:** `scene-06-naming-comic-v1-fresh` (board) → `scene-06-naming-b-mid`. Animate the writing
  appearing. Short beat — keep it tight, hold on the written board.

### 6 · AI-WINTER — the screens go dark — 11:01 (cues 34–36), ~15s total  ·  STATE-CHANGE / MONTAGE
- **Motion:** across the three winter shots the **monitors go dark** — funding drying up.
- **Frames (3 exist):** `scene-07-ai-winter-a-start` (two lit monitors) → `…-comic-v1-fresh` (one) →
  `…-c-end` (dark). Cut/dim between them on the beats; the darkening IS the motion.

### 7 · LUMINAiRY finale — portraits blaze — 16:43 (cues 51–52), ~79s  ·  SPLASH IGNITE
- **Motion:** dim hall → all MAiVEN portraits **blazing**. (A 14s cross-dissolve version is already in
  the cut; if Codex can do a truer portrait-by-portrait ignite in comic style, that supersedes it.)
- **Frames (2 exist):** `splash-lights-up-…-start-dim` → `…-end-blazing`.

### 8 · TIME-JUMP SWIRLS — 8 era cards  ·  TRANSITION DEVICE
- **Motion:** the reusable swirl → era card, at each jump (LONDON 1843 · HOLLYWOOD · PHILADELPHIA ·
  PHILADELPHIA 1952 · DARTMOUTH 1956 · CAMBRIDGE 1972 · FEI-FEI · 2018–2021).
- **Asset exists:** `assets/video/fx/timejump-swirl-v1.mov` (alpha). Composite it into each jump;
  the era card resolves **inside** the swirl's bloom — never a hard cut.
- Spec: `codex-prompts/ep04-motion-spec.md` Part 1.

---

## WHAT IS ALREADY DONE (do not redo)
Background light loops built into the render: title shine, desk/monitor glow, mall directory neon,
LUMINAiRY approach lanterns, MAiVENS hall candles, ENIAC/Grace/Karen/Kate panel lamps. The
LUMINAiRY dim→blazing cross-dissolve. Hedy's signal hop. These are ambient/light only — the beats
above are the CHARACTER/EVENT animations that are still owed.

## QC GATE (from `episode-pixel-motion-style-locked.md` — run before showing Ali)
1. Contact sheet of every animated shot + transition.
2. Watch every move at playback speed — no shake, no shimmer, no warped faces/hands/limbs.
3. Characters + backgrounds stable within each shot; ambient alters only existing objects.
4. Every directional clip PLAYS ONCE and HOLDS — no loop, no cut back to its own source still.
5. 1920×1080 H.264 beside the source frames; approved originals untouched.

---

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

> **EP4: yellow tartan/plaid shirt-jacket worn open over a white tee, butterfly hair clips,
> loose 90s waves, small gold hoops, shoulder bag.**

⛔ **NEVER corporate.** No navy pantsuit, no blazer-and-blouse, no office tailoring. SUNNYVAiLE is a Y2K town and she lives there — she does not commute in from a law firm. In the Ep4 batch she appeared in four different outfits, four of them corporate.
