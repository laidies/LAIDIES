# EP3 — "The Burn Book Problem" · authoritative animation + assembly spec

> **What this is:** every frame of Ep3, in order, checked against the REAL narration
> timing (forced-aligned `operations/captions/episode-03-timing-map.json`, 100% coverage).
> Ep3 art is **100% complete** — all 49 frames exist. So this spec is NOT about generating
> images. It is about **what gets animated on each existing frame, and when it plays.**
>
> **Pipeline (2026-07-23):** animation is **Canva image-to-video** — CapCut is RETIRED (its
> animation looked bad). Codex generates any new stills AND drives the Canva animation; Ali
> touches no editor. The motion column is tool-agnostic on purpose — it says WHAT moves and HOW
> (loop vs one-shot, background-only); Codex realizes that in Canva. Read the table top to bottom.
>
> Captions are already built + forced-aligned (`assets/captions/episode-03.vtt`, 200 Heroine /
> 11 Announcer) and wire in like Ep1/Ep2/Ep4 once the film is assembled — do NOT burn them in.

## ART REQUIREMENTS (pasted verbatim — the single source)

> Ep3 **generates no new frames**, but these rules still bind every animation pass (motion is
> background-only to protect likeness/anatomy; the transformation reveal has no wand; any moving
> lettering stays legible; "AI" stays two capitals) AND any re-render is drawn under this block.

**1 · Exactly 1920 × 1080.** Wrong dimensions are auto-rejected before review.

**2 · Style `comic-v1-locked`** — bold black ink, HARD ANGULAR shadow PLANES, flat saturated colour. ⛔ No halftone. ⛔ Not painterly, watercolour, airbrushed or blotchy.

**3 · CONTINUITY IS NOT OPTIONAL.** Each frame must read as the same room, the same moment, the same person — same hair, same clothes, same light, same period as its neighbours. ⛔ Do not restyle, re-cast or re-dress between shots.

**4 · LIKENESS.** Every named real woman has a photo reference path. Match HER face. ⛔ Do not invent a plausible person. A woman appearing in several beats uses the SAME reference in every one.

**5 · SETTING MUST BE REAL.** A real SUNNYVAiLE building or a genuine historical location. ⛔ No invented places. ⛔ No literal mashups.

**5b · SUNNYVAiLE GEOGRAPHY IS CANON.** Buildings sharing a shot must be real neighbours. The LIBRAiRY is NOT on MAiN Street and NOT beside Blend & Snap.

**6 · PHYSICAL PLAUSIBILITY (physics).** Objects obey physics. A stack of paper is separate sheets with edges, not a solid slab.

**6b · ANATOMY.** Every figure has a complete, correctly-jointed body — legs and feet that reach the ground, right finger count, no limb cropped into oblivion by a prop.

**7 · "AI" is ALWAYS both letters capital** — never "Ai". The accented i belongs to brand words only (LAiDIES, SUNNYVAiLE, MAiVENS, LUMINAiRY).

**6c · PERIOD ACCURACY.** Nothing postdates the scene's year; the location is the real place; people counts are right.

**6d · AGE.** Each woman is the age she was at that moment. Grace Hopper stays in uniform.

**6e · BACKGROUND FIGURES.** Background faces coherent — no melted or half-formed features.

**7b · EVERY WORD LEGIBLE AND CORRECT.** No garbled or invented lettering anywhere. ⛔ Do not letter a word you cannot render cleanly.

**8b · READS AT VIDEO SIZE.** Subject legible at 1/3 screen.

**8 · Populated SUNNYVAiLE scenes** = women in Y2K-era dress, diverse. Storefronts empty.

**9 · Never mix generations.** No pixel or other-generation frames scavenged. `comic-v1-locked` only.

**10 · Text rendered IN-generation.** No blank plates for text added later.

### 🔴 THE HEROINE'S OUTFIT — ONE LOOK FOR THE WHOLE EPISODE
Different outfit each week, the SAME outfit in every frame of the episode, 90s-styled hair.
**EP03 OUTFIT: Elle Woods / *Legally Blonde* (that week's iconic look).** ⛔ NEVER corporate
(no navy pantsuit, no blazer-and-blouse). *(Ep3 generates nothing — this binds only a re-render.)*

---

## MOTION RULES (surface-specific — animation, not generation)
- **Background/ambient motion ONLY** — light, glow, screen, rain, paper, dust, neon. ⛔ Never
  a face, body, hand, mouth or expression. ⛔ No camera push/pan on a frame not shot for it.
- **Text / concept / emph / fact / method / title / recap-strip / sign-off frames get NO
  motion.** They are graphic cards; motion on them reads as an accident. They HOLD, static.
- **LOOP vs ONE-SHOT:** ambient (glow, flicker, rain, shimmer) = zero net travel, so it LOOPS
  for the hold. Anything directional (a reveal, a build, a wipe, the transformation) PLAYS
  ONCE then FREEZES on its own last frame. Never loop a directional clip.
- **No captions burned into the picture.** Captions ride the player's caption bar only.
- **Verify after render (both):** `operations/tools/check-hard-cuts.py` (no clip may cut to a
  different still) and `operations/tools/measure-motion.py` (ambient frames must measure moving
  vs a still control; HOLD frames must measure still).

Runtime ≈ 17:33. 49 frames. **16 get motion** (15 ambient loops + 1 one-shot reveal); the
other 33 are graphic cards that hold static — that is correct, not laziness.

### Legend
- **HOLD** — static. No animation pass. Graphic/text card.
- **AMBIENT** — Canva image-to-video, background element only, loops for the hold.
- **ONE-SHOT** — Canva directional motion, plays once (~5s), then freezes its last frame.

---

## OPENING (0:00 – 0:35)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 0 | 0:00 | 18.7 | `open-01-previously-strip-comic` | "Previously, on LAiDIES…" | **HOLD** — recap strip, graphic |
| 1 | 0:18.7 | 12.8 | `open-02-thisweek-teaser-comic` | "She stopped typing three vague words…" | **HOLD** — teaser montage, graphic |
| 2 | 0:31.5 | 3.6 | `open-03-title-comic` | "And on this episode…" (title lands 35.1) | **HOLD** — title card |

## COLD OPEN — the lie in the draft (0:35 – 2:15)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 3 | 0:35.1 | 21.9 | `scene-01-cold-open-desk` | "This is Episode Three: The Burn Book Problem." | **AMBIENT** — desk. Monitor glow breathes 88→100% over ~5s; a soft warm desk-lamp pool flickers faintly. Screen only, her face untouched. Loops. |
| 4 | 0:57 | 21.0 | `scene-01b-the-lie-caught-a-screen` | "Nine seconds later, there it was — structure…" | **AMBIENT** — the document on screen. A text-cursor blinks; the page's white glow pulses subtly. No new text appears. Loops. |
| 5 | 1:18 | 13.1 | `scene-01b-the-lie-caught-b` | "The draft said the client had 'approved'…" | **AMBIENT** — same screen glow + slow scanline shimmer on the monitor. Loops. |
| 6 | 1:31.1 | 17.3 | `scene-02-couldnt-help-but-wonder` | "What we actually said was 'July could work…'" | **AMBIENT** — reflective beat. Rain on the window behind her, continuous downward, low opacity; lamp glow steady. Loops. |
| 7 | 1:48.4 | 26.6 | `open-04-welcome-back-comic` | "And I couldn't help but wonder…" | **HOLD** — welcome-back graphic card |

## TRANSFORMATION → this week's look (2:15)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 8 | 2:15 | 16.9 | `open-05p4-transformation-reveal` | "This week, Elle Woods teaches us what to check." | **ONE-SHOT** — the outfit reveal on the abstract 90s stage. Same corporate base, the poof passes ONCE and the Elle Woods look resolves. ⛔ No wand, FAiRY Godmother never visible. Plays once (~5s), freezes. |

## THE NEWSSTAND / what a source is (2:31 – 5:03)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 9 | 2:31.9 | 26.1 | `scene-03-newsstand` | "Before your name goes on it, you need to know…" | **AMBIENT** — newsstand. Magazine-rack neon buzzes/flickers faintly; a couple of hanging papers ruffle in place. Loops, zero net travel. |
| 10 | 2:58 | 21.0 | `emph-says-who-comic` | "No doom, no hype, no 'a source close to the…'" | **HOLD** — emph card |
| 11 | 3:19 | 23.0 | `scene-04-regina-burn-book` | "My job was to fact-check it before it ran…" | **AMBIENT** — the burn book under a desk lamp; warm lamp flicker + faint dust in the beam. Pages still. Loops. |
| 12 | 3:42 | 22.0 | `emph-same-handwriting-comic` | "It worked because it had social authority…" | **HOLD** — emph card |
| 13 | 4:04 | 17.7 | `concept-hallucination-comic` | "It'll take a real source, an old source…" | **HOLD** — concept card |
| 14 | 4:21.7 | 22.3 | `scene-05-bethany-byrd` | "That's the Burn Book Problem: an official…" | **AMBIENT** — screen/print glow on the page; subtle. Loops. |
| 15 | 4:44 | 19.9 | `emph-claires-headband-comic` | "One box of tampons, and boom — a verdict…" | **HOLD** — emph card |
| 16 | 5:03.9 | 24.1 | `emph-churn-butter-comic` | "It's a clue in a Claire's headband…" | **HOLD** — emph card |

## WRONG ROOM / fake citations (5:28 – 6:31)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 17 | 5:28 | 22.0 | `scene-07-doesnt-go-here` | "The question is: which parts is it just draft…" | **AMBIENT** — setting light; faint lamp/screen glow. Loops. |
| 18 | 5:50 | 17.0 | `emph-doesnt-go-here-comic` | "It looks exactly like a real source — cited…" | **HOLD** — emph card |
| 19 | 6:07 | 17.0 | `scene-07b-wrong-room` | "It brought the wrong ID and somehow made it…" | **AMBIENT** — setting light; subtle. Loops. |
| 20 | 6:24 | 7.8 | `emph-fake-citation-comic` | "'We talked about it' quietly promoted to…" | **HOLD** — emph card |

## ELLE / show your work (6:31 – 8:02)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 21 | 6:31.8 | 28.2 | `scene-08-elle-file` | "That's the moment you stand up in the back…" | **AMBIENT** — courtroom. Tall windows glow; slow dust in the light shafts; brass fixtures shimmer faintly. Loops. Longest scene hold — carry it. |
| 22 | 7:00 | 24.0 | `scene-08b-chutney-stand` | "Not because she makes 'being thorough' sound…" | **AMBIENT** — courtroom light continues; faint. Loops. |
| 23 | 7:24 | 16.7 | `concept-verification-comic` | "But Elle isn't checking whether Chutney can…" | **HOLD** — concept card |
| 24 | 7:40.7 | 21.3 | `emph-chutney-elle-comic` | "One tiny beauty-world rule nobody took…" | **HOLD** — emph card |

## CHER'S CLOSET / draft vs claim vs receipt (8:02 – 9:25)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 25 | 8:02 | 14.2 | `scene-09-chers-closet` | "Ask: what's the one detail that can't survive…" | **AMBIENT** — the closet software screen glows and cycles softly (the rotating-outfit UI), light only. Loops. |
| 26 | 8:16.2 | 18.8 | `concept-draft-comic` | "If it says a number went up — from what…" | **HOLD** — concept card |
| 27 | 8:35 | 18.0 | `concept-claim-comic` | "A draft is wording, structure, a brainstorm…" | **HOLD** — concept card |
| 28 | 8:53 | 17.0 | `concept-receipt-comic` | "And a receipt is the thing you can actually…" | **HOLD** — concept card |
| 29 | 9:10 | 15.0 | `emph-draft-outfit-comic` | "You're the one who stands up in that courtroom…" | **HOLD** — emph card |

## LAW CLERK / judgment stays yours (9:25 – 10:23)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 30 | 9:25 | 12.0 | `scene-10-law-clerk` | "The machine spent the weekend in the library…" | **AMBIENT** — law library; green banker's-lamp glow flickers, dust in window light. Loops. |
| 31 | 9:37 | 5.4 | `emph-judgment-stayed-yours-comic` | "You still read it, you still check…" | **HOLD** — emph card |
| 32 | 9:42.4 | 23.6 | `emph-are-you-sure-regina-burnbook` | "You still read it, you still check the citations…" | **HOLD** — emph card |
| 33 | 10:06 | 17.7 | `emph-peer-reviewed-comic` | "Sometimes it catches the mistake, corrects it…" | **HOLD** — emph card |

## THE FACTS (10:23 – 11:40)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 34 | 10:23.7 | 26.3 | `fact-nature-comic` | "And sometimes it just hands you the same wrong…" | **HOLD** — fact card |
| 35 | 10:50 | 23.0 | `fact-stanford-index-comic` | "The newer ones can search, cite, read documents…" | **HOLD** — fact card |
| 36 | 11:13 | 18.0 | `fact-kpmg-comic` | "Stanford's 2026 AI Index found something…" | **HOLD** — fact card |
| 37 | 11:31 | 9.1 | `emph-sources-attached-comic` | "And KPMG — one of the Big Four…" | **HOLD** — emph card |
| 38 | 11:40.1 | 11.1 | `scene-12-prompt-like-elle` | "Big Four." | **AMBIENT** — setting light; subtle. Loops. |

## THE METHOD — three moves (11:51 – 13:33)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 39 | 11:51.2 | 24.9 | `method-move1-comic` | "Just don't assume 'sources attached' means…" | **HOLD** — method card |
| 40 | 12:16.1 | 18.7 | `method-move2-comic` | "Don't ask the machine what it remembers…" | **HOLD** — method card |
| 41 | 12:34.8 | 24.9 | `method-move3-comic` | "She walks in with the file." | **HOLD** — method card |
| 42 | 12:59.7 | 33.7 | `method-prompt-like-elle-comicpage` | "Move three: make her show the line…" | **HOLD** — method comic page |

## CLOSE (13:33 – end)

| # | in | hold | frame | narration then | motion |
|---|----|------|-------|----------------|--------|
| 43 | 13:33.4 | 50.7 | `cocktail-comic` | "Instead of 'clean up these notes,' I pasted…" | **HOLD** — cocktail summary graphic |
| 44 | 14:24.1 | 27.9 | `tryon-rule-comic-v2-fix` | "It's your most confident friend." | **HOLD** — try-on rule graphic |
| 45 | 14:52 | 38.0 | `scene-14-receipts-pass-comic-rebalance-v2` | "That's 'LAiDIES' spelled with an i…" | **AMBIENT** — receipts scene; a soft glow across the receipt/page, faint. Loops. Long hold — keep motion barely-there so it never distracts from the sign-off spelling beat. |
| 46 | 15:30 | 30.9 | `method-rule-comic` | "This week: take one real answer from an AI…" | **HOLD** — method card |
| 47 | 16:00.9 | 62.6 | `signoff-comic` | "A corkboard and trench coat are optional…" | **HOLD** — sign-off graphic |
| 48 | 17:03.5 | 30.0 | `open-06-nextweek-comic` | "See you next Wednesday… in SUNNYVAiLE." | **HOLD** — next-week graphic |

---

## Summary for Codex
1. **Generate nothing.** All 49 frames exist in `assets/episodes/ep-03/comic/`.
2. **16 Canva animation passes** — 15 AMBIENT loops (cues 3,4,5,6,9,11,14,17,19,21,22,25,30,38,45)
   + 1 ONE-SHOT (cue 8, the transformation reveal).
3. Every AMBIENT clip is background-only, loops with zero net travel, cut to fit its hold.
4. The ONE-SHOT plays once then freezes; ⛔ no wand in the reveal.
5. Assemble in cue order at the exact in-times above; each still with no clip just holds.
6. Export **without** burned-in captions (they ride the player bar via `assets/captions/episode-03.vtt`).
7. Run `check-hard-cuts.py` and `measure-motion.py` before handing back. HOLD frames must
   measure still; AMBIENT frames must measure moving; no clip may cut to a different image.
8. When the film is delivered, it wires into `watch.html` exactly like Ep1/Ep2/Ep4
   (`EPISODE_FILMS['03']` + `EPISODE_CAPTIONS['03']`, already prepared).
