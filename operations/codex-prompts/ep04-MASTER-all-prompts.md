# EPISODE 4 — "THE FOUNDING MOTHERS" · MASTER image-prompt batch (hand to Codex, run top→bottom)

> **FOR CODEX:** ✅ GENERATE every image below, top→bottom. **Output dir:** `assets/episodes/ep-04/pixel/` (where the Ep4 comic renders already live). Images only — no HTML/CSS/git.

This is the single complete Ep4 image list, in narration order. Merges the opening beats, the 13 scene
keyframes, and all connective cards. **Paste the GLOBAL STYLE block with EVERY prompt.** Generate FRESH in
comic (don't de-pixelate old frames — fresh-gen beats convert). One image per line unless it says SEQUENCE.

**Reference rule:** the exact reference file paths named below are the ONLY references — never let the model
pick its own from the repo. Take **style/palette** from the style refs, **faces** from the named kit/portrait,
**architecture/color** from the named interior. Nothing from memory.

---

## 🎨 GLOBAL STYLE — paste with every prompt

### ⚠ HARD GUARDRAILS — apply to EVERY prompt (Ali 2026-07-19, from Ep1/Ep2 failures)
1. **TWO WORLDS STAY SEPARATE — the outfit MUST match the location (Ali 2026-07-19).** (a) **Corporate look** = navy suit / professional 90s hair / **NO butterfly clips** = **CORPORATE-LAND ONLY** (her work desk, office, city — the "before"). (b) **SUNNYVAiLE look** = the week's 90s/Y2K iconic outfit + **6-butterfly-clip half-up hair** = **IN SUNNYVAiLE ONLY** (the town / Main Street / buildings). ⛔ **NEVER MIX:** no Y2K outfit or butterfly clips in a corporate setting; no corporate suit in SUNNYVAiLE; no corporate-land inside SUNNYVAiLE. If she's in a 90s/Y2K outfit she IS in SUNNYVAiLE; if she's in the suit she is NOT. The **transformation** is the ONLY bridge between the two worlds.
2. **STYLE REFS = TREATMENT ONLY — NEVER their PEOPLE.** The style-lock refs supply LINE / INK / SHADOW-PLANES / COLOR only. ⛔ Do NOT reproduce, echo, or make ANY character resemble the PEOPLE in those refs (Timnit, Joy, Emily, Kate, Hedy, etc.). Every incidental / background / crowd figure = ORIGINAL + invented — nobody who looks like a ref person. (This bug hit Ep1 + Ep2.)
3. **EVERY character has a COMPLETE, WELL-FORMED FACE.** No faceless / blank / smeared / missing-face figures — named characters especially (a "Steve with no face" shipped in Ep1). Clear eyes/nose/mouth + correct anatomy on every person in frame.
4. **POPULATED TOWN SCENES = the BUILDING'S CANONICAL KEEPER — never a random person.** If a scene is set in a SUNNYVAiLE building that has a keeper, the person shown IS that keeper (likeness from their portrait, rendered in the episode's comic style) — do NOT invent a random barista/clerk/bartender/host for a named place. **KEEPER → portrait:** Blend & Snap → **JoJo** `assets/town-characters/scenes/jojo-scene.png` · Town Hall → **Mayor Deb** `assets/town-characters/scenes/mayor-deb-scene.png` · KSVL → **DJ SunnyV** `assets/episodes/ep-04/pixel/ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png` · Post Office → **Penny** `assets/town-characters/scenes/penny-scene.png` · BRONZE AiGE → **Cosmo** `assets/town-characters/scenes/cosmo-scene.png` · Chick Flicks → **Becky** `assets/town-characters/scenes/becky-scene.png` · Delta LAi Nu → **June** `assets/town-characters/scenes/june-scene.png` · MAiKEOVER → **Paulette** `assets/town-characters/scenes/paulette-scene.png` · NewsStand → **Paige** `assets/town-characters/scenes/paige-scene.png` · LIBRAiRY → **Miss Jeeves** `assets/video/delivery-20260714-opening-v6/shots/_miss-jeeves-approved-reference.png` · Mme CLAi-O shop → **Mme CLAi-O** `assets/building-interiors/mme-claio-reading-room.jpg` · FAiRY Godmother house → **the FG** `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` · LUMINAiRY → **Matron Lumen** `assets/town-characters/scenes/matron-lumen-scene.png`. Background CROWD (not a keeper's building) = original Y2K women (per guardrail 2, no ref-lookalikes).
5. **CHECK FOR DRIFT before finalizing EVERY image — regenerate if it fails. (Drift is a problem EVERYWHERE — this check is not optional.)** (a) Every character's FACE/likeness matches their LOCKED reference and reads as THAT person (heroine, icons, keepers) — no wrong/drifted face. (b) **⛔ NO smooth glamour-cartoon construction. The generated image MUST match the graphic-novel style examples and use REALISTIC FACIAL ANATOMY, BOLD INKED COMIC CONTOUR LINES (confident graphic-novel ink line with some weight variation — NOT smooth even vector lines, but ⛔ NOT painterly / brush-painted / watercolor either), and LARGE SCULPTURAL SHADOW SHAPES (the hard angular planes).** ⛔ NOT clean-vector / plasticy / smooth-3D / pretty-cartoon / plain-flat illustration. Faces + style drift the most — check BOTH, every image.
6. **ALL on-image text = COMIC-BOOK LETTERING, never a plain text box.** Text-only frames, emphasis bursts, concept cards, captions, and any words on a scene must be **bold dynamic comic lettering** (word-burst / hand-inked / integrated into a burst, banner, or caption box with comic energy) — ⛔ NOT plain typed text sitting in a plain rectangle. Ref: `operations/reference/font-and-text-emphasis/`.
7. **SUNNYVAiLE = period-Y2K TECH ONLY — no modern electronics.** In any SUNNYVAiLE scene: a laptop = a colorful **iBook G3 clamshell**; a desktop computer = an **older CRT monitor** (beige/bubble, NOT a flat-screen); a cell phone = a **Motorola RAZR flip phone**. ⛔ No MacBooks, flat-screen monitors, smartphones/iPhones, or any modern device in town. (Corporate-land keeps present-day tech — that contrast reinforces guardrail #1. NOTE: Ep4's HISTORY scenes use their own PERIOD tech — punch cards, ENIAC, 1970s terminals, etc. — not Y2K; this rule is for present-day SUNNYVAiLE.)
Locked LAiDIES comic / graphic-novel: **bold black ink outlines, HARD angular grey shadow PLANES** (keep them
hard/geometric — that's the style), clean flat color, painterly-inked finish. ⛔ NO halftone/ben-day DOTS
anywhere (esp. skin). ⛔ NOT pixel, NOT smooth/plasticy, NOT bold-flat pop-art poster, NOT tarot.
**LOCKED STYLE REGISTER (Ali-approved 2026-07-19 — the "Timnit style lock" set; treatment ONLY, never their faces):**
`assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` (⭐ THE anchor — match this),
`assets/episodes/ep-04/pixel/ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png`,
`assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png`,
`assets/episodes/ep-04/pixel/ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png`,
`assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png`.
(Older refs — Ada timejump / Deb / SunnyV tests — superseded by these richer, approved anchors.)
**LOCKED — SCENES WITHOUT PEOPLE (establishing / time-jump / environment plates), Ali-approved 2026-07-19:**
`assets/episodes/ep-04/pixel/ep04-tj-hedy-comic-v2-timnit-style-lock-exact-caption-1920.png` (HOLLYWOOD 1942 set),
`assets/episodes/ep-04/pixel/ep04-tj-karen-comic-v2-timnit-style-lock-exact-caption-1920.png` (CAMBRIDGE 1972 study),
`assets/episodes/ep-04/pixel/ep04-tj-eniac-comic-v1-exact-caption-1920.png` (PHILADELPHIA 1945 hall).
Use THIS set as the register for any beat with **no people** — establishing shots, time-jump cards, building/room/environment plates. (People beats → the Timnit set above.)
🎨 **VIBRANT + 90s PALETTE — pinks, teals, blues** (+ plum/gold/cream); saturated Y2K color, NOT muted/dusty.
**Tone follows scene:** PRESENT/town = brightest + most saturated · PAST/history = aged, candle-warm, moodier.
16:9, ≥1920 wide.

**LOCKED FACES / REFS (faces only, never their style):**
- **Heroine** = her comic kit `assets/episodes/ep-04/pixel/ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-suit-flat-color-only-1920.png` + turnaround/expression sheets. CORPORATE look = navy blazer / white top / blonde 90s hair. SUNNYVAiLE look (post-transform) = Clueless canary-yellow plaid, hair = **3 sections each side / 6 butterfly clips, half-up in waves** (NOT clips in a vertical line).
- **FAiRY Godmother** = `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` (dark curls, plum star-robe, silver wand). ⛔ NOT the winged/pink/glasses tarot portrait.
- **MAiVEN portraits** (Ada, Hedy, Grace, Karen, Fei-Fei, Joy, Timnit, Kate) = `assets/mavens/y2k-stained-glass-v2/` (`ada-lovelace-…`, `hedy-lamarr-…`, `grace-hopper-…`, `karen-sparck-jones-…`, `fei-fei-li-…`, `joy-buolamwini-…`, `timnit-gebru-…`, `kate-crawford-…`).
- **MAiVENS wing interior** = `assets/sunnyvaile-interiors/luminairy-maivens-wing.png` — a **cathedral-like** hall (gothic pointed arches, vaulted, tall stained-glass windows, gold tracery with woven GEARS, candles, blue forget-me-nots, gold star-compass floor). **COLOR = deep BLUE / cobalt + teal accents + GOLD.** (SAiNTS wing = pink/purple = `luminairy-saints-wing.png` — do not use for MAiVENS.)
- Text/word-burst treatment = `operations/reference/font-and-text-emphasis/`; comic-page look = `operations/reference/comic-book-page-style/comicpage-01.webp`. Render all text CRISP, spelled EXACTLY as given.

---

# PART 1 — OPENING (0:00 → history)

### B01 — PREVIOUSLY → `ep04-open-01-previously-strip.png`
Horizontal **comic STRIP**, 3 panels, caption box `PREVIOUSLY ON LAiDIES`: heroine gets a confident AI answer → she spots the one wrong line → she fact-checks it "like Elle Woods." Ep3 recap ONLY.

### B02 — THIS WEEK → `ep04-open-02-thisweek-teaser.png`
Separate teaser strip/montage (NOT Ep3): silhouettes/portraits of the MAiVENS across eras + a hint of "it was women all along." Caption `THIS WEEK`. Distinct from B01.

### B03 — TITLE → `ep04-open-03-title.png`
Comic **title card**: **THE FOUNDING MOTHERS** (bold comic lettering) + "Episode Four", on a comic ground.

### B04 — COLD OPEN, desk (corporate) → `ep04-open-04-desk.png`  ·  *(= scene S01)*
Heroine CORPORATE at her night desk, rain on the city glass, mid-argument with the chat glowing on the monitor; her hand freezes over the keyboard as it hits her. Screen-glow key light. **Correct hands. Present → brighter.**

### B05 — DAWNING UNEASE (corporate) → `ep04-open-05-unease.png`
Tighter push-in: her + the glowing chat, the "I've caught it lying and I don't know where it came from" unease on her face.

### B06 — THINKING CLOSE-UP → `ep04-open-06-thinking-closeup.png`
**CLOSE-UP of her face, thinking** (the "I couldn't help but wonder" beat) — caught mid-thought, screen glow, contemplative. Face must read as HER.

### B07 — THE QUESTIONS → `ep04-open-07-questions.png`
**Text/emphasis frame**, comic caption boxes: **IS IT NEW?** and **WHO BUILT IT?** — bold comic lettering, minimal graphic ground.

### B08 — SUNNYVAiLE WELCOME → `ep04-open-08-sunnyvaile-welcome.png`
Bright **SUNNYVAiLE town establishing** shot — sunny Y2K main street — the "welcome back… from a little internet town called Sunnyvale" beat. (Heroine may be small/absent; it's the town.) Comic, most vibrant.

### B09 — 3-PANEL RECAP → `ep04-open-09-recap-3panel.png`
**Comic strip, 3 panels:** Ep1 "stopped feeling behind" · Ep2 "brief it like a new hire" · Ep3 "fact-check it like a lawyer." Quick callbacks, caption per panel.

### B10 — CAR / ENGINE → `ep04-open-10-car-engine.png`
The analogy: "you can drive the car without asking who built the engine" — heroine (corporate) confidently at the wheel, the engine a mystery. Comic.

### B11 — MALL DIRECTORY → ~~`ep04-open-11-mall-directory.png`~~ ⛔ **DROPPED (Ali 2026-07-19)** — not needed, redundant with B12 (Which AI?). Do NOT generate or wire.

### B12 — WHICH AI? → `ep04-open-12-which-ai.png`
**Emphasis frame:** `WHICH AI?` — a row of tool doors/logos, the "company one nobody can find" buried/lost. Bold comic.

### B13 — JUST USE INTERNET → `ep04-open-13-just-use-internet.png`
The "'just use AI' is like being told to 'just use internet' — use internet for WHAT?" analogy panel. Comic, a bit wry.

### B14 — THE QUESTION HANGS (corporate) → `ep04-open-14-question-hangs.png`
Heroine CORPORATE, the "what is this thing, really — and how did it get to my desk?" question sitting on her. Beat before the transform.

### B15 — ✨ TRANSFORMATION SEQUENCE
> ⚠ **REWRITTEN by Ali 2026-07-19 — IGNORE the wand/FG description below. Use the AUTHORITATIVE spec `operations/codex-prompts/transformation-sequence-spec.md`:** ⛔ NO wand, NO FAiRY Godmother visible, NO in-town reveal — it plays on an ABSTRACT 90s geometric STAGE. Frames `15p0` corporate start → `15p1–15p3` poof builds/covers/clears → `15p4` REVEAL (Ep4 = Clueless yellow + 6 clips). Only 15p4 is episode-specific. The lines below are superseded.
On "I went up the hill, to the LUMINAiRY." Build the FULL reusable sequence (5 frames was too choppy):
- `15a` heroine CORPORATE (start state)
- `15b`–`15d` **FAiRY Godmother wand-motion in-betweens** (raise → arc → contact — ≥3 for smoothness); FG = the rerender-lit-v2 ref, comic-rendered
- `15e`–`15f` **magic-effect building** (sparkle/POOF, multiple, vibrant Y2K burst)
- `15g` **MID-TRANSFORMATION** frame (her form actually changing / outfit morphing — a real transition state)
- `15h`–`15i` **magic clearing** (more effect dissipating)
- `15j` **REVEAL** in the SUNNYVAiLE outfit (this episode = Clueless canary-yellow plaid), hair = the locked 6-butterfly-clip half-up.
Frames 15a–15i are SHARED across episodes; only 15j (the reveal) changes per episode. Lots of wand-motion + magic frames — Ali flagged v1 had too few.

### B16 — UP THE HILL + FRONT ROOM → `ep04-open-16-luminairy-approach.png`  ·  *(≈ scene S02)*
Heroine now in SUNNYVAiLE look, approaching the **LUMINAiRY** up the hill; a glimpse of the bright **front room** (the patron saints — Chers, Elles). Warm, grand. Cathedral architecture (match `luminairy-maivens-wing.png` exterior/interior feel).

### B17 — THE MAiVENS HALL (full interior, PACKED) → `ep04-open-17-maivens-hall.png`
She steps INTO the wing — a **full interior hall**, NOT a half-in/half-out doorway shot. The wing is **PACKED with MAiVEN stained-glass portraits — the whole roster, no empty panels.** Reference the actual portraits: `assets/mavens/y2k-stained-glass-v2/` (Ada, Hedy, ENIAC Six, Grace Hopper, Karen Spärck Jones, Fei-Fei, Joy, Timnit, Kate, Margaret Hamilton, Barbara Liskov, etc.) — fill the walls. ⚠ **Architecture + color MATCH `assets/sunnyvaile-interiors/luminairy-maivens-wing.png`:** cathedral hall, gothic pointed arches, vaulted ceiling, tall stained-glass, gold tracery + woven GEARS, candles, blue forget-me-nots, gold star-compass floor. **WING COLOR = deep BLUE / cobalt + teal accents + GOLD.** Render COMIC (bold ink, hard planes) — same building + same blue-gold color. Heroine (SUNNYVAiLE look) walking in. Reverent.

### B17b — LOOKING UP AT ADA → `ep04-open-17b-looking-up-at-ada.png`
She stops and **looks UP at Ada Lovelace's stained-glass portrait** — the first MAiVEN. Her (SUNNYVAiLE look, back/3-4 to us) gazing up at Ada's lit window. Comic, **deep-blue cathedral MAiVENS wing** (match `luminairy-maivens-wing.png`). Cues the Ada time-jump.

### B18 — WE'RE GOING BACK → page-turn transition into the Ada `LONDON, 1843` frame (already made).
Lights soft, a **comic page-turn** into history → the existing Ada time-jump frame.

---

# PART 2 — HISTORY (each beat: time-jump card → scene → concept/emphasis)

## ADA · 1843 (245–341s)
- **TJ card = DONE** → `ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png`
- **SCENE** → `ep04-scene-03-ada-comic.png` — comp ref `ep04-scene-03-ada.png`. ⛔⛔ **CORRECT HANDS/ARMS** (five fingers, natural wrists — she holds a **punched card**; zoom hands on QC). Ada Lovelace: Victorian, dark hair up, period gown, holding a punched card; brass Analytical Engine gears behind; a faint thread of glowing musical notes lifting from the card; candlelit study, rain on window. **Past → aged, candle-warm.**
- **CONCEPT** → `ep04-concept-algorithm.png` — text-card: **ALGORITHM** + "a precise set of steps a machine follows."
- **EMPHASIS** → `ep04-emph-remember-that-part.png` — burst: **"Remember that part. Everyone forgets that part."**

## HEDY · 1942 (341–437s)
- **TJ card** → `ep04-tj-hedy.png` — 1940s Hollywood/wartime, film lights + drafting board; caption `HOLLYWOOD, 1942`; aged warm.
- **SCENE** → `ep04-scene-04-hedy-comic.png` — comp ref `ep04-scene-04-hedy.png`. Hedy Lamarr: glamorous 1940s star at a drafting desk, vanity/film lights; a frequency-hopping diagram lit (a bright dot leaping across bands, a red jamming wave missing it); composed knowing glance up. **Past → warm Hollywood-noir, moody.**
- **EMPHASIS** → `ep04-emph-jam.png` — burst: **"You cannot jam a signal you cannot find."** *(MUST-MATCH — spell exactly.)*
- **EMPHASIS** → `ep04-emph-nobody-heard.png` — burst: **"The most beautiful woman in the world — and nobody heard a single word she said."**

## THE ENIAC SIX · 1945 (437–540s)
- **TJ card** → `ep04-tj-eniac.png` — WWII Philadelphia, the 30-ton ENIAC wall; caption `PHILADELPHIA, 1945`; cool machine glow.
- **SCENE** → `ep04-scene-04b-eniac-comic.png` — comp ref `ep04-scene-04b-eniac.png`. Six women (1940s dress) working the vast 30-ton ENIAC — a wall of dials/cables/switches, plugging cables + flipping switches, panel lights blinking; settle wide, the six dwarfed by the machine. **Past → cool machine-room + warm panel glow.**
- ⭐ **FULL-PAGE COMIC** → `ep04-comicpage-eniac-models.png` — the injustice as a multi-panel comic PAGE (style-echo `comicpage-01.webp`): panel 1 the six women wiring it; panel 2 the press photo, men named; panel 3 the women "assumed to be models," uncaptioned; caption box "It took forty years to learn who they were." Six names: **Jean · Betty · Kay · Marlyn · Ruth · Frances.**
- **EMPHASIS** → `ep04-emph-first-programmers.png` — burst: **"THE FIRST PROGRAMMERS."**

## GRACE · 1952 (540–627s)
- **TJ card** → `ep04-tj-grace.png` — 1950s Navy computer lab, room-sized mainframe + reels; caption `1952`; dim moody.
- **SCENE** → `ep04-scene-05-grace-comic.png` — comp ref `ep04-scene-05-grace-b-mid-comic-v1-no-halftone-1920.png` (push comic HARDER than that de-pixel). Older Grace Hopper, naval dress uniform + cap + ribbons, at the room-sized mainframe (reels, blinking panels); a moth landed on the open logbook. **Past → moody, dim, warm lamp key.**
- **CONCEPT** → `ep04-concept-compiler.png` — text-card: **COMPILER** + "a translator: near-plain English → code."
- **EMPHASIS** → `ep04-emph-bug.png` — burst: **"The first actual BUG."** (moth motif → where "debugging" comes from.)

## THE NAMING / DARTMOUTH · 1956 (627–661s)
- **TJ card** → `ep04-tj-dartmouth.png` — summer 1956 academic room, chalkboard; caption `DARTMOUTH, 1956`; warm/smug.
- **SCENE** → `ep04-scene-06-naming-comic.png` — comp ref `ep04-scene-06-naming.png`. A summer room of shirtsleeved 1950s men; chalkboard reads **ARTIFICIAL INTELLIGENCE** double-underlined, chalk dust in a golden sunbeam; the men shaking hands, smug. Render chalkboard text crisply. **Past → warm, dusty, smug.**
- **EMPHASIS** → `ep04-emph-not-solved.png` — burst: **"It was NOT solved by the end of the summer."**

## THE AI WINTER (661–676s — short)
- **SCENE** → `ep04-scene-07-ai-winter-comic.png` — comp ref `ep04-scene-07-ai-winter.png`. A cold half-abandoned lab, dust motes, covered machines; one surviving monitor flickering to black; frost on the window. **Desaturated, still, lonely, cold — darkest scene.** Empty of people (or one small figure).
- **CONCEPT** → `ep04-concept-ai-winter.png` — text-card: **AI WINTER** + "when the promises outran the results and the money froze."

## KAREN · 1972 (676–765s)
- **TJ card** → `ep04-tj-karen.png` — 1970s Cambridge, gothic window + a terminal; caption `CAMBRIDGE, 1972`; cool night.
- **SCENE** → `ep04-scene-08-karen-comic.png` — comp ref `ep04-scene-08-karen.png`. Karen Spärck Jones at a terminal, green CRT glow on her face; on screen a search where common words dim and rare words flare; gothic Cambridge window behind. **Past → green-CRT + cool night.**
- **EMPHASIS** → `ep04-emph-left-to-men.png` — burst: **"Computing is too important to be left to men."** *(MUST-MATCH; spell **Spärck** if named.)*

---

# PART 3 — THE MODERN ERA (2012 → now)
> ⚠ **Fei-Fei is NOT the ending — she's the THAW that OPENS the modern act.** After her: the desk (transformer→ChatGPT), the FOUR checkers, the lights-come-up + the agentic-AI edge-of-the-map line, then the close. This is a full present-day act, not a coda.

## FEI-FEI · 2012 (765–843s) — the thaw
- **TJ card** → `ep04-tj-feifei.png` — 2000s Stanford lab; caption `STANFORD, 2012`; brighter than the winter.
- **SCENE** → `ep04-scene-09-fei-fei-comic.png` — comp ref `ep04-scene-09-fei-fei.png`. Fei-Fei Li in a lab, walls tiled with millions of tiny labeled images (ImageNet), a soft recognition glow rippling; she looks up at the full glowing wall. **Brighter — the thaw. Cool lab + warm recognition glow.**
- **CONCEPT** → `ep04-concept-training-data.png` — text-card: **TRAINING DATA** + "the examples a model learns from."
- **EMPHASIS** → `ep04-emph-godmother.png` — burst: **"Godmother. Not godfather."**

## IT LANDS ON YOUR DESK (843–895s) — present, heroine
- **SCENE** → `ep04-scene-10-desk-comic.png` — comp ref `ep04-scene-10-desk-v2.png`. Present-day/corporate desk payoff (bookends B04/S01): same heroine, same desk, a full rich answer blooming on screen, glow rising in her eyes, faintest almost-smile. **Present → brighter, warm screen glow.**
- **EMPHASIS** → `ep04-emph-landed-on-your-desk.png` — burst: **"The day it landed on your desk."** (optional tiny timeline strip: `2017` → `NOV 2022 · ChatGPT`.)

## THE CHECKERS — FOUR modern MAiVENS, EACH HER OWN SHORT SCENE (895–1003s) — present
⚠ **FOUR women, not three — and NOT one group static.** Each gets her **own short scene** (own keyframe + ~10s beat), the same individual treatment the historical women got (Ada/Hedy/Grace/Karen/Fei-Fei each had one). Each **already has a stained-glass portrait** — use it as the **face ref only** and render a fresh comic scene. **Present → cool, serious, contemporary, backlit.**

- **JOY BUOLAMWINI** → `ep04-scene-11a-joy-comic.png` (face ref `assets/mavens/y2k-stained-glass-v2/joy-buolamwini-y2k-stained-glass.png`). MIT / Algorithmic Justice League: at a webcam, the face-detection box **fails to find her dark skin** until she lifts a **plain white mask** to the camera and it suddenly locks on — the "coded gaze." Her looking back at us, mask half-raised.
- **TIMNIT GEBRU** → `ep04-scene-11b-timnit-comic.png` (face ref `…/timnit-gebru-y2k-stained-glass.png`). DAIR / ex-Google: mid-stand, raising the alarm inside the machine — a warning she won't take back; a sense of a door closing behind her (abruptly cut off, 2020; thousands protested). Resolute, not victimized.
- **EMILY BENDER** → `ep04-scene-11c-emily-comic.png` (face ref `…/emily-bender-y2k-stained-glass.png`). UW linguist: at her desk beside a chat window spilling **fluent, confident nonsense**, a faint **parrot** motif over the machine — she coined **"stochastic parrot"**: sounds brilliant, understands nothing. Wry, sharp.
- **KATE CRAWFORD** → `ep04-scene-11d-kate-comic.png` (face ref `…/kate-crawford-y2k-stained-glass.png`). *Atlas of AI*: she pulls back the "magic" to reveal what's behind it — **mines, water, power lines, underpaid hands** feeding the glowing machine. She stands in front of the real supply chain.
- **EMPHASIS** → `ep04-emph-neither.png` — burst: **"AI is neither artificial nor intelligent."** *(MUST-MATCH; Kate Crawford.)*
- **EMPHASIS** → `ep04-emph-check-the-machine.png` — burst: **"These are the women who check the whole machine."**

## THE LIGHTS COME UP (1003–1082s) — the finale
- ⭐ **SPLASH** → `ep04-splash-lights-up.png` — comp ref `ep04-scene-12-lights-up-v2.png`. A full **SPLASH page**: the heroine (SUNNYVAiLE look) small in the LUMINAiRY back wing, every MAiVEN portrait igniting bright around her — the whole story rising into light. ⚠ **MAiVENS wing = deep BLUE/cobalt cathedral + gold + teal** (match `luminairy-maivens-wing.png`; NOT pink/purple). Same cathedral + packed roster as B17. Reverent, glowing — **LIGHT AS THE PAYOFF.** (Ignite sequence for video: `-start` dim → `-end` all blazing.)
- **EMPHASIS** → `ep04-emph-not-magic.png` — burst: **"Not magic. Not born last Tuesday."**
- **AGENTIC AI TEASE** (⚠ NARRATION-ONLY — in the audio, not the v4 article; include for the VIDEO) → `ep04-emph-agentic-edge.png` — the newest chapter still being written: **agentic AI** — "the kind that doesn't just answer you, it goes and does the thing" — **the edge of the map right now.** A frame of the map with one corner still being drawn / a path leading off past the known.

---

# PART 4 — CLOSE (1082–1222s)
- **COCKTAIL text-card** → `ep04-cocktail.png` — **"Almost two hundred years old and about three years old at the same time."**
- **SIGN-OFF EMPHASIS** → `ep04-emph-never-told-it-was-yours.png` — the remember line: **"You were never behind on AI. You were just never told it was yours."** *(hero emphasis — biggest lettering.)*
- **TURING TRIBUTE** → `ep04-turing-memoriam.png` — quiet closing panel: **ALAN TURING · 1912–1954**, dignified, muted, "the architect so many of them built on" (in-memoriam tone; not a MAiVEN, not celebratory).

---

## After the images land (Claude does these)
1. Swap all into the written article `issues/issue-04.html` (replace pixel `-v2`/scene posters).
2. Video = Codex assembles keyframes + `operations/audio/episode-04-elevenlabs-v3-tagged.txt` narration master (CapCut), motion per `ep04-shot-direction.md` + transitions per `operations/episode-comic-grammar.md`.
3. QC each on delivery: recipe (no dots/pixel), hands where shown, text spelled EXACTLY (esp. MUST-MATCH lines), MAiVENS wing = blue-gold cathedral, heroine hair = 6-clip half-up.
