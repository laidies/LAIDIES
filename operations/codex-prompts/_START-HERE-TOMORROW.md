# ▶ START HERE — Wednesday paste-to-Codex queue (built 2026-07-23, overnight)

**How to use this:** paste each numbered block below to Codex, in order, ONE at a time. Each says
what Codex makes, which file has the detail, and how it gets checked. Ali opens nothing — Codex
renders the stills and drives the animation; Ali gives verdicts.

## The pipeline (current — read once)
- **Stills** = Codex image generation (the frames).
- **Animation = Canva image-to-video.** ⛔ CapCut is RETIRED — its animation looked bad (Ali,
  2026-07-23). Do not brief CapCut motion.
- **Motion is always:** background-only (light/glow/rain/screen/dust — never a face or body);
  LOOP = zero net travel; DIRECTIONAL (a reveal/build/transformation) plays ONCE then FREEZES on
  its own last frame; animate the ONE approved still, never generate-and-stitch.
- **CARD STYLE = Ep4 `comic-v1-locked`.** ⛔ NO halftone pop-art burst. Ali (2026-07-23) on the old
  Ep1/Ep2 cards: *"that is ugly and not the same as what we did for ep 4 — that was the best one."*
  Every title / quote / interstitial / recurring card is bold black ink + hard angular shadow
  planes + flat saturated colour, like Ep4. No cream-panel-and-magenta-halftone template.
- **Never burn captions into the picture** — every episode has a forced-aligned VTT that rides
  the player's own caption bar (`assets/captions/episode-0N.vtt`).
- After any render, run `operations/tools/check-hard-cuts.py` and `operations/tools/measure-motion.py`.

## What's already DONE (do NOT redo)
- **Ep4** — finished, animated, wired (`episode-04-full-v7.mp4`). This is the visual STANDARD.
- **Ep1 & Ep2** — comic films wired into the player + forced-aligned captions (correct speakers).
  Watchable now at `watch.html?ep=01` / `?ep=02`. Fixes outstanding → items 3–6 below.
- **Ep3 captions** — built + speaker-correct, ready to wire the moment its film exists.

---

## ART REQUIREMENTS (pasted verbatim — applies to EVERY still generated below)

**1 · Exactly 1920 × 1080.** Wrong dimensions are auto-rejected before review.

**2 · Style `comic-v1-locked`** — bold black ink, HARD ANGULAR shadow PLANES, flat saturated colour. ⛔ No halftone. ⛔ Not painterly, watercolour, airbrushed or blotchy.

**3 · CONTINUITY IS NOT OPTIONAL.** Each frame must read as the same room, moment, and person — same hair, clothes, light, period as its neighbours. ⛔ Do not restyle, re-cast or re-dress between shots.

**4 · LIKENESS.** Every named real woman has a photo reference. Match HER face. ⛔ Do not invent a plausible person. Same reference in every beat she appears in.

**5 · SETTING MUST BE REAL.** A real SUNNYVAiLE building or a genuine historical location. ⛔ No invented places. ⛔ No literal mashups.

**5b · SUNNYVAiLE GEOGRAPHY IS CANON.** Buildings sharing a shot must be real neighbours. The LIBRAiRY is NOT on MAiN Street and NOT beside Blend & Snap.

**6 · PHYSICAL PLAUSIBILITY (physics).** Objects obey physics. A paper stack is separate sheets with edges, not a solid slab.

**6b · ANATOMY.** Every figure has a complete, correctly-jointed body — legs and feet that reach the ground, right finger count, no limb cropped into oblivion by a prop.

**7 · "AI" is ALWAYS both letters capital** — never "Ai". The accented i belongs to brand words only (LAiDIES, SUNNYVAiLE, MAiVENS, LUMINAiRY).

**6c · PERIOD ACCURACY.** Nothing postdates the scene's year; the location is the real place; people counts are right.

**6d · AGE.** Each woman is the age she was at that moment. Grace Hopper stays in uniform.

**6e · BACKGROUND FIGURES.** Background faces coherent — no melted or half-formed features.

**7b · EVERY WORD LEGIBLE AND CORRECT.** No garbled or invented lettering anywhere. ⛔ Do not letter a word you cannot render cleanly. Numbers: KSVL is **99.9**; LUMINAiRY has ONE accented i.

**8b · READS AT VIDEO SIZE.** Subject legible at 1/3 screen.

**8 · Populated SUNNYVAiLE scenes** = women in Y2K-era dress, diverse. Storefronts empty.

**9 · Never mix generations.** No pixel or other-generation frames scavenged. `comic-v1-locked` only.

**10 · Text rendered IN-generation.** No blank plates for text added later.

### 🔴 THE HEROINE'S OUTFIT — ONE LOOK PER EPISODE, 90s-styled hair
Different outfit each week, the SAME outfit across that episode's frames. ⛔ NEVER corporate.
Per-piece outfit lives in each episode's `content/episodes/episode-0N.canon.md → ## heroine_outfit`.
Trailer = her signature SUNNYVAiLE look (post-transformation), consistent across every trailer frame.

---

# THE QUEUE  (paste ONE at a time, check each before the next)

## 1 · TRAILER — generate all frames, then animate  (biggest item; nothing rendered yet)
**Detail file:** `operations/trailer-comic-storyboard.md` (58 SCENE blocks, each with its own
File / Format / Time / Said / Refs / Prompt / Transition).
**Do:** generate every scene's still from its `Prompt` + `Refs`, applying the ART REQUIREMENTS
block above to each. Then animate the scenes whose block carries a MOTION note, in Canva, per
those notes (background-only, loop vs one-shot). Assemble in scene order at the listed times.
**Watch for:** the maikeover-glow-up scene is the **wandless** abstract-stage transformation
(p0→p4) — ⛔ no wand, FAiRY Godmother never visible. Coverage checklist at the bottom of the
storyboard maps every spoken beat to art — use it so no beat is bare.
**Hand back:** the assembled trailer, no burned captions.

## 2 · EP3 "The Burn Book Problem" — animate + assemble  (art is 100% done)
**Detail file:** `operations/codex-prompts/ep03-authoritative-spec.md` (per-frame motion table).
**Do:** generate NOTHING — all 49 frames exist in `assets/episodes/ep-03/comic/`. Run the **16
Canva animation passes** it lists (15 ambient loops + 1 one-shot transformation), then assemble
in cue order at the exact in-times. Export without burned captions.
**Hand back:** `episode-03` film. It then wires into the player like Ep1/Ep2/Ep4 (captions already
built at `assets/captions/episode-03.vtt`).

## 3 · EP2 — re-render ONE glitched card, then re-splice
**Problem:** the Spice Girls quote card at ~5:00 has **doubled/ghosted text** ("REALLY WANT"
printed twice). File: `assets/video/comic-interstitials-v1/ep02-cue-20.png`.
**Do:** re-render that ONE card in the **Ep4 comic-v1 style (NO halftone)**, header **THE SPICE
GIRLS PRINCIPLE**, body exactly:
> TELL ME WHAT YOU WANT, WHAT YOU REALLY, REALLY WANT.
— clean, single pass, no ghosting, text in-generation, 1920×1080. Swap it in and re-export Ep2
(`build-episode-02-v15-comic-sync.py` → next version). No other Ep2 frame changes.
**Hand back:** the re-exported Ep2 film; it re-wires at the same path.

## 4 · EP1 — re-render the TITLE card to "DO AI", Ep4 style
**Problem:** title card `assets/video/comic-interstitials-v1/ep01-title.png` reads "ON WEDNESDAYS
WE **USE** AI" in the old ugly halftone template. The title is **"On Wednesdays We DO AI"** (Ali).
**Do:** re-render it: header **Episode One**, title **ON WEDNESDAYS WE DO AI**, in the **Ep4
comic-v1 style (NO halftone burst)**, 1920×1080, text in-generation. Swap it in; re-export Ep1.
**Also (Ali's action, not Codex):** the announcer still SAYS "Use AI" — Ali regenerates just that
one intro sentence to "Do AI" and hands the audio to Claude, who splices it to the same duration
(no full re-render) and fixes the one caption. If instead the whole Ep1 narration is regenerated,
the v19 film must be re-timed/re-rendered to the new audio.

## 5 · "WELCOME BACK TO LAiDIES" — one reusable series card
**Why:** every episode's narration says *"Welcome back to LAiDIES."* Ali wants the **SAME branded
image every time** — a LAiDIES series / title-brand frame, in the **Ep4 comic-v1 style**, built
ONCE and reused across all episodes (replaces the per-episode `open-04-welcome-back-comic` frames).
**Do:** generate one `welcome-back-series-comic-v1-1920.png` — a series-branded "Welcome back to
LAiDIES" card (brand wordmark + the show's look), comic-v1-locked, 1920×1080, text in-generation.
**Hand back:** the one card; it drops onto the "welcome back" beat in every episode's cue sheet.

## 6 · (SCOPE FLAG — needs Ali's call) Ep1/Ep2 card restyle
The Ep1/Ep2 **title / quote / interstitial** cards all use the old halftone pop-art template Ali
called ugly. Bringing them fully to the Ep4 standard means re-rendering that whole set of cards in
comic-v1 (scene frames are fine). Items 3–5 fix the worst offenders; decide with Ali whether to
redo the rest of the card set before calling Ep1/Ep2 "done to standard."

---

## Decisions still owed FROM ALI
- **Ep1 narration re-cut** — regen just the "Do AI" intro sentence (cheap) vs whole episode (forces
  a full re-render). See item 4.
- **Item 6 scope** — restyle all Ep1/Ep2 cards, or just the fixes in 3–5?

## QC gates before anything is called done
1. `check-hard-cuts.py` — no clip cuts to a different still.
2. `measure-motion.py` — animated frames actually move; HOLD frames measure still.
3. Watch the opening and the sign-off — no frame held over the wrong narration; no burned captions.
