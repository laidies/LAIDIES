# EP4 — ASSEMBLY PROMPT FOR CODEX (build the full episode in CapCut, export MP4)

*2026-07-22. You (Codex) already delivered the animation clips and swirls into
`assets/episodes/ep-04/pixel/`. This is the ASSEMBLY step: put every beat on ONE CapCut
timeline, synced to the narration, and export the finished 20:22 episode. Do NOT regenerate
any art — every asset below already exists on disk.*

## 🔴 KNOWN FAILURE ON THE FIRST v3 EXPORT — READ FIRST
The first assembly (`episode-04-full-v3.mp4`, exported 18:27) **burned the captions as giant
white text OVER the centre of every frame, covering the artwork.** That is a hard rule break —
captions NEVER go over the art. Re-export with a **CLEAN picture and NO caption overlay at all.**
Deliver to `episode-04-full-v4.mp4` so the bad v3 is not overwritten until Ali has seen the fix.

## THE SPINE — sync everything to this audio
- **Narration track:** `content/music/episode-04-narration.mp3` (runs 20:22.40).
- Every placement below has an **exact in-time**. Place each asset so it STARTS at that time.
- **⛔ DO NOT burn or add captions to the video. Deliver a CLEAN picture, no text overlay.**
  The `watch.html` player renders captions in a bar BELOW the picture from
  `assets/captions/episode-04.vtt` — that is the only place captions appear.
  The v3 export burned them OVER the whole frame, covering the art. That is wrong. No captions in the video.

## TRANSITIONS (the rules)
- **🌀 time-jump swirls** ARE the era transitions — the swirl clip plays INTO the era, the era
  card resolves inside its bloom. Never a hard cut into a time jump.
- **🎬 animation clips** and **🌀 swirls** PLAY ONCE, then hold their last frame to the next in-time.
  ⛔ Never loop them. Never cut from a clip back to its own source still.
- Between **▪ stills**: a 0.4–0.7s editorial crossfade; straight cut on a punchline/decisive beat.
- Two clips SPAN multiple beats — let them play across the whole span, don't cut into them:
  - `ai-winter-screens-darken` covers the three AI-winter beats (11:01→11:16).
  - `splash-lights-up-portraits-ignite` covers both splash beats (16:43→18:02).

## THE FULL PLACEMENT (54 placements, in order)

| # | in-time | hold | what | asset |
|---|---|---|---|---|
| 0 | 0:00.00 | 14.0s | ▪ still | `ep04-open-01-previously-strip-comic-v6-regina-outfit-1920.png` |
| 1 | 0:14.00 | 27.0s | ▪ still | `ep04-open-03-title-comic-v1-exact-text-1920.png` |
| 2 | 0:41.00 | 17.0s | ▪ still | `ep04-open-04-desk-comic-v1-face-lock-1920.png` |
| 3 | 0:58.00 | 14.0s | ▪ still | `ep04-open-05-unease-comic-v1-face-lock-1920.png` |
| 4 | 1:12.00 | 10.0s | ▪ still | `ep04-open-06-thinking-closeup-comic-v1-face-lock-1920.png` |
| 5 | 1:22.00 | 20.0s | ▪ still | `ep04-open-07-questions-comic-v1-exact-text-1920.png` |
| 6 | 1:42.00 | 8.0s | ▪ still | `ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png` |
| 7 | 1:50.00 | 15.0s | ▪ still | `ep04-open-09-recap-3panel-comic-v1-exact-captions-1920.png` |
| 8 | 2:05.00 | 15.0s | ▪ still | `ep04-open-10-car-engine-comic-v5-comic-question-mark-1920.png` |
| 9 | 2:20.00 | 15.0s | ▪ still | `ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920.png` |
| 10 | 2:35.00 | 13.0s | ▪ still | `ep04-open-12-which-ai-comic-v2-reference-library-title-1920.png` |
| 11 | 2:48.00 | 10.0s | ▪ still | `ep04-open-13-just-use-internet-comic-v2-clean-counter-no-sign-1920.png` |
| 12 | 2:58.00 | 7.0s | ▪ still | `ep04-open-14-question-hangs-comic-v1-face-lock-1920.png` |
| 13 | 3:05.00 | 17.0s | 🎬 ANIMATION clip | `ep04-open-15p-transformation-comic-event-v1.mp4` |
| 14 | 3:22.00 | 18.0s | ▪ still | `ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png` |
| 15 | 3:40.00 | 20.0s | ▪ still | `ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png` |
| 16 | 4:00.00 | 5.3s | ▪ still | `ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png` |
| 17 | 4:05.30 | 5.0s | 🌀 time-jump swirl | `ep04-timejump-01-london-1843-comic-event-v1.mp4` |
| 18 | 4:10.30 | 49.7s | 🎬 ANIMATION clip | `ep04-scene-03-ada-punched-card-toward-camera-comic-event-v1.mp4` |
| 19 | 5:00.00 | 41.5s | ▪ still | `ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png` |
| 20 | 5:41.55 | 5.0s | 🌀 time-jump swirl | `ep04-timejump-02-hollywood-comic-event-v1.mp4` |
| 21 | 5:46.55 | 45.5s | ▪ still | `ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png` |
| 22 | 6:32.00 | 45.3s | ▪ still | `ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png` |
| 23 | 7:17.30 | 5.0s | 🌀 time-jump swirl | `ep04-timejump-03-philadelphia-comic-event-v1.mp4` |
| 24 | 7:22.30 | 57.7s | ▪ still | `ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png` |
| 25 | 8:20.00 | 40.5s | ▪ still | `ep04-comicpage-eniac-models-comic-v2-barnes-1920.png` |
| 26 | 9:00.55 | 5.0s | 🌀 time-jump swirl | `ep04-timejump-04-philadelphia-1952-comic-event-v1.mp4` |
| 27 | 9:05.55 | 29.4s | ▪ still | `ep04-scene-05-grace-a-start-comic-v1-locked-1920.png` |
| 28 | 9:35.00 | 40.0s | ▪ still | `ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png` |
| 29 | 10:15.00 | 12.6s | 🎬 ANIMATION clip | `ep04-scene-05-grace-moth-landing-comic-event-v1.mp4` |
| 30 | 10:27.62 | 5.0s | 🌀 time-jump swirl | `ep04-timejump-05-dartmouth-1956-comic-event-v1.mp4` |
| 31 | 10:32.62 | 5.4s | 🎬 ANIMATION clip | `ep04-scene-06-naming-chalk-writes-comic-event-v1.mp4` |
| 32 | 10:38.00 | 12.0s | ▪ still | `ep04-scene-06-naming-b-mid-comic-v1-locked-1920.png` |
| 33 | 10:50.00 | 11.4s | ▪ still | `ep04-scene-06-naming-c-end-comic-v1-locked-1920.png` |
| 34 | 11:01.43 | 5.6s | 🎬 ANIMATION clip | `ep04-scene-07-ai-winter-screens-darken-comic-event-v1.mp4` |
| 37 | 11:16.70 | 5.0s | 🌀 time-jump swirl | `ep04-timejump-06-cambridge-1972-comic-event-v1.mp4` |
| 38 | 11:21.70 | 51.3s | ▪ still | `ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920.png` |
| 39 | 12:13.00 | 32.0s | ▪ still | `ep04-scene-08-karen-c-end-comic-v1-locked-1920.png` |
| 40 | 12:44.98 | 5.0s | 🌀 time-jump swirl | `ep04-timejump-07-fei-fei-comic-event-v1.mp4` |
| 41 | 12:49.98 | 27.0s | ▪ still | `ep04-scene-09-fei-fei-a-start-comic-v1-locked-1920.png` |
| 42 | 13:17.00 | 23.0s | ▪ still | `ep04-scene-09-fei-fei-b-mid-comic-v1-locked-1920.png` |
| 43 | 13:40.00 | 23.8s | 🎬 ANIMATION clip | `ep04-scene-09-fei-fei-wall-fills-comic-event-v1.mp4` |
| 44 | 14:03.80 | 51.9s | ▪ still | `ep04-open-04-desk-comic-v1-face-lock-1920.png` |
| 45 | 14:55.65 | 2.0s | 🌀 time-jump swirl | `ep04-timejump-08-2018-2021-comic-event-v1.mp4` |
| 46 | 14:57.65 | 28.1s | ▪ still | `ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png` |
| 47 | 15:25.80 | 20.2s | ▪ still | `ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` |
| 48 | 15:46.00 | 8.0s | ▪ still | `ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png` |
| 49 | 15:54.00 | 17.6s | ▪ still | `ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` |
| 50 | 16:11.60 | 32.1s | ▪ still | `ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png` |
| 51 | 16:43.68 | 36.3s | 🎬 ANIMATION clip | `ep04-splash-lights-up-portraits-ignite-comic-event-v1.mp4` |
| 53 | 18:02.90 | 45.1s | ▪ still | `ep04-cocktail-comic-v1-exact-mixed-case-1920.png` |
| 54 | 18:48.00 | 28.0s | ▪ still | `ep04-around-town-comic-v2-correct-lettering-1920.png` |
| 55 | 19:16.00 | 28.0s | ▪ still | `ep04-sign-off-comic-v1-1920.png` |
| 56 | 19:44.00 | 38.4s | ▪ still | `ep04-next-week-comic-v1-1920.png` |

## DELIVER
- Export **`assets/video/episode-04-full-v4.mp4`** — 1920×1080, H.264, with the narration audio.
- ⛔ Do NOT overwrite `episode-04-full-v2.mp4` or the caption-bugged `v3` or any approved original.

## QC before you call it done
1. Runtime = 20:22.40 (matches the narration).
2. Every 🎬 and 🌀 plays ONCE and holds — no loop, no cut back to its own still.
3. Each era jump goes THROUGH its swirl, not a hard cut.
4. NO captions anywhere in the video — the picture is clean, full-frame. (The player adds captions below.)
5. The two spanning clips play across their whole span uninterrupted.
6. 1920×1080 H.264 beside the source frames; approved originals untouched.


---

*The block below is the standing art-requirements (carried so the guardrail hook passes).
Assembly generates no new art, so these apply only if you end up re-rendering a frame.*

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
