# EPISODE 2 — "TELL ME WHAT YOU WANT" · MASTER image-prompt batch (hand to Codex, run top→bottom)

This is the single complete Ep2 image list, in **narration order**, built beat-by-beat from
`content/episodes/episode-02.canon.md` (`## narrative`) + the spoken script
`operations/audio/episode-02-script.md`. It merges the recurring show segments, every canon story beat,
and the connective cards. **Paste the GLOBAL STYLE block with EVERY prompt.** Generate FRESH in comic
(don't de-pixelate the old `ep02-scene-0N` pixel frames — fresh-gen beats convert). One image per line
unless it says **SEQUENCE**.

**Reference rule (do not skip):** the exact reference file paths named below are the ONLY references —
never let the model pick its own from the repo. Take **style/palette** from the style refs, **faces** from
the named kit/portrait (FACE only — never restyle a stained-glass portrait into the image), **architecture/
color** from the named interior. Nothing from memory.

**FOR CODEX — SCOPE:** ✅ **GENERATE every image below, top→bottom** (this doc IS the generation spec).
**Output dir:** `assets/episodes/ep-02/comic/` · filenames exactly as given (`ep02-…-comic.png`).
Images only — no HTML/CSS/git edits. *(Any "do not generate" phrasing was aimed at the prompt-WRITER, not
you — ignore it; you are the generator.)*

**Real-person likeness rule:** the ONLY real person we render as a likeness is **David Rose** (approved
stained-glass face ref). Everyone else named in narration who is a real modern person or celebrity —
**the Spice Girls, Ross (Friends), Britney, Ethan Mollick** — is rendered as **lettering / motif / silhouette
only, never a recognizable likeness.** Their beats live as emphasis bursts, text cards, or object motifs.

---

## 🎨 GLOBAL STYLE — paste with every prompt

### ⚠ HARD GUARDRAILS — apply to EVERY prompt (Ali 2026-07-19, from Ep1/Ep2 failures)
1. **TWO WORLDS STAY SEPARATE — the outfit MUST match the location (Ali 2026-07-19).** (a) **Corporate look** = navy suit / professional 90s hair / **NO butterfly clips** = **CORPORATE-LAND ONLY** (her work desk, office, city — the "before"). (b) **SUNNYVAiLE look** = the week's 90s/Y2K iconic outfit + **6-butterfly-clip half-up hair** = **IN SUNNYVAiLE ONLY** (the town / Main Street / buildings). ⛔ **NEVER MIX:** no Y2K outfit or butterfly clips in a corporate setting; no corporate suit in SUNNYVAiLE; no corporate-land inside SUNNYVAiLE. If she's in a 90s/Y2K outfit she IS in SUNNYVAiLE; if she's in the suit she is NOT. The **transformation** is the ONLY bridge between the two worlds.
2. **STYLE REFS = TREATMENT ONLY — NEVER their PEOPLE.** The style-lock refs supply LINE / INK / SHADOW-PLANES / COLOR only. ⛔ Do NOT reproduce, echo, or make ANY character resemble the PEOPLE in those refs (Timnit, Joy, Emily, Kate, Hedy, etc.). Every incidental / background / crowd figure = ORIGINAL + invented — nobody who looks like a ref person. (This bug hit Ep1 + Ep2.)
3. **EVERY character has a COMPLETE, WELL-FORMED FACE.** No faceless / blank / smeared / missing-face figures — named characters especially (a "Steve with no face" shipped in Ep1). Clear eyes/nose/mouth + correct anatomy on every person in frame.
4. **POPULATED TOWN SCENES = the BUILDING'S CANONICAL KEEPER — never a random person.** If a scene is set in a SUNNYVAiLE building that has a keeper, the person shown IS that keeper (likeness from their portrait, rendered in the episode's comic style) — do NOT invent a random barista/clerk/bartender/host for a named place. **KEEPER → portrait:** Blend & Snap → **JoJo** `assets/town-characters/scenes/jojo-scene.png` · Town Hall → **Mayor Deb** `assets/town-characters/scenes/mayor-deb-scene.png` · KSVL → **DJ SunnyV** `assets/episodes/ep-04/pixel/ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png` · Post Office → **Penny** `assets/town-characters/scenes/penny-scene.png` · BRONZE AiGE → **Cosmo** `assets/town-characters/scenes/cosmo-scene.png` · Chick Flicks → **Becky** `assets/town-characters/scenes/becky-scene.png` · Delta LAi Nu → **June** `assets/town-characters/scenes/june-scene.png` · MAiKEOVER → **Paulette** `assets/town-characters/scenes/paulette-scene.png` · NewsStand → **Paige** `assets/town-characters/scenes/paige-scene.png` · LIBRAiRY → **Miss Jeeves** `assets/video/delivery-20260714-opening-v6/shots/_miss-jeeves-approved-reference.png` · Mme CLAi-O shop → **Mme CLAi-O** `assets/building-interiors/mme-claio-reading-room.jpg` · FAiRY Godmother house → **the FG** `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` · LUMINAiRY → **Matron Lumen** `assets/town-characters/scenes/matron-lumen-scene.png`. Background CROWD (not a keeper's building) = original Y2K women (per guardrail 2, no ref-lookalikes).
5. **CHECK FOR DRIFT before finalizing EVERY image — regenerate if it fails. (Drift is a problem EVERYWHERE — this check is not optional.)** (a) Every character's FACE/likeness matches their LOCKED reference and reads as THAT person (heroine, icons, keepers) — no wrong/drifted face. (b) **⛔ NO smooth glamour-cartoon construction. The generated image MUST match the graphic-novel style examples and use REALISTIC FACIAL ANATOMY, BOLD INKED COMIC CONTOUR LINES (confident graphic-novel ink line with some weight variation — NOT smooth even vector lines, but ⛔ NOT painterly / brush-painted / watercolor either), and LARGE SCULPTURAL SHADOW SHAPES (the hard angular planes).** ⛔ NOT clean-vector / plasticy / smooth-3D / pretty-cartoon / plain-flat illustration. Faces + style drift the most — check BOTH, every image.
6. **ALL on-image text = COMIC-BOOK LETTERING, never a plain text box.** Text-only frames, emphasis bursts, concept cards, captions, and any words on a scene must be **bold dynamic comic lettering** (word-burst / hand-inked / integrated into a burst, banner, or caption box with comic energy) — ⛔ NOT plain typed text sitting in a plain rectangle. Ref: `operations/reference/font-and-text-emphasis/`.
7. **SUNNYVAiLE = period-Y2K TECH ONLY — no modern electronics.** In any SUNNYVAiLE scene: a laptop = a colorful **iBook G3 clamshell**; a desktop computer = an **older CRT monitor** (beige/bubble, NOT a flat-screen); a cell phone = a **Motorola RAZR flip phone**. ⛔ No MacBooks, flat-screen monitors, smartphones/iPhones, or any modern device in town. (Corporate-land keeps present-day tech — that contrast reinforces guardrail #1.)
Locked LAiDIES comic / graphic-novel: **bold black ink outlines, HARD angular grey shadow PLANES** (keep them
hard/geometric — that's the style), clean flat color, painterly-inked finish. ⛔ NO halftone/ben-day DOTS
anywhere (esp. skin). ⛔ NOT pixel, NOT smooth/plasticy, NOT bold-flat pop-art poster, NOT tarot.
**LOCKED STYLE REGISTER (Ali-approved 2026-07-19 — the "Timnit style lock" set; treatment ONLY, never their faces):**
`assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` (⭐ THE anchor — match this),
`assets/episodes/ep-04/pixel/ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png`,
`assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png`,
`assets/episodes/ep-04/pixel/ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png`,
`assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png`.
**LOCKED — SCENES WITHOUT PEOPLE (establishing / time-jump / environment plates), Ali-approved 2026-07-19** — register for any no-people beat (establishing shots, building/room plates); people beats → the Timnit set above:
`assets/episodes/ep-04/pixel/ep04-tj-hedy-comic-v2-timnit-style-lock-exact-caption-1920.png` (HOLLYWOOD 1942 set),
`assets/episodes/ep-04/pixel/ep04-tj-karen-comic-v2-timnit-style-lock-exact-caption-1920.png` (CAMBRIDGE 1972 study),
`assets/episodes/ep-04/pixel/ep04-tj-eniac-comic-v1-exact-caption-1920.png` (PHILADELPHIA 1945 hall).
⚠ **Take the ILLUSTRATION STYLE from these (line/ink/hard shadow-planes = the lock) — but they read DARK because they're from Ep4 (the dark-themed episode). Ep2 is BRIGHT/present-day: keep the illustration style, push the COLOR bright + vibrant per this episode's palette. Do NOT copy their darkness.**
🎨 **VIBRANT + 90s PALETTE — pinks, teals, blues** (+ plum/gold/cream); saturated Y2K color, NOT muted/dusty.
**Tone follows scene:** PRESENT/town = brightest + most saturated · the corporate cold-open desk = cooler,
tired office light · text/emphasis cards = graphic, punchy. This whole episode lives in the PRESENT (no
historical flashbacks), so keep it vibrant throughout; only the corporate desk reads cool/tired by intent.
16:9, ≥1920 wide. Render ALL on-screen text CRISP and spelled EXACTLY as written.

**LOCKED FACES / REFS (faces only, never their style):**
- **Heroine** = her comic kit `assets/episodes/ep-04/pixel/ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-suit-flat-color-only-1920.png`
  + `assets/episodes/ep-04/pixel/ep04-heroine-turnaround-sheet-clueless-v1-v28-locked-1920.png`
  + `assets/episodes/ep-04/pixel/ep04-heroine-expression-sheet-v2-graphic-novel-register-v28-locked-1920.png`
  + canonical face ref `operations/reference/style-only-refs/achieved-face-style-01-graphic-novel.webp`.
  Face = Ali's likeness, always. Two looks:
  - **CORPORATE look** (pre-transform, present-day at her work desk) = navy blazer / white top / blonde 90s hair.
  - **SUNNYVAiLE look** (post-transform, in town) = ✅ **LOCKED (Ali 2026-07-19): Ep2's iconic Y2K outfit = EMPIRE RECORDS (1995):**
    plaid pleated mini-skirt + fitted long-sleeve top, grunge record-store energy (ref
    `operations/reference/heroine-wardrobe/iconic-outfit-02.png` — pull the OUTFIT only, never the face).
    ⚠ **This is Ep2's signature look — DIFFERENT from Ep4's Clueless canary-yellow plaid.** Chosen because Ep2
    is the music-soaked episode (KSVL, HMV, Spice Girls, platform sandals) and Empire Records = record store.
  - **HAIR (both looks, styled 90s):** *hair pulled back in sections from around the face, secured with
    butterfly clips — **THREE sections on each side, one clip per section (six clips total)**, the rest left
    down in waves.* Pastel butterfly clips. Describe in WORDS only; never via an image ref (an image ref steals
    the face). NOT clips in a single vertical line.
- **FAiRY Godmother** = `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png`
  (dark curls, plum star-robe, silver wand). ⛔ NOT the winged/pink/glasses tarot portrait.
- **DAVID ROSE** (patron saint — the one deliberate male / non-90s exception) = FACE ref
  `assets/saints/y2k-stained-glass-v2/david-rose-y2k-stained-glass.png`. ⚠ Use it as a FACE ref ONLY — render
  him as a full COMIC character (bold ink, hard planes), NOT as stained glass. His look: dark hair, expressive
  brows, black-and-white designer knit / high-fashion monochrome, pathologically-put-together. Schitt's Creek
  David energy: precise, aghast, fabulous.
- Text/word-burst treatment = `operations/reference/font-and-text-emphasis/` (fontref-01..09); comic-page look
  = `operations/reference/comic-book-page-style/comicpage-01.webp`. Render all text CRISP, spelled EXACTLY.

**TOWN LOCATION REFS (architecture + color only — render COMIC, match the building/room):**
- **Blend & Snap café interior** = ✅ NEW canonical (Ali 2026-07-19) `assets/town-characters/scenes/jojo-scene.png`
  — magenta tile walls, Memphis geometric wall art, glass pastry/donut case, espresso machine + teal/magenta/cream
  heart mugs, speckled navy counter w/ magenta edge, Town Hall clock tower + jacaranda through the window.
  **Supersedes the old `blend-snap-cafe.jpg`.** JoJo (barista) is in this ref → take the ROOM; the HEROINE is the
  subject in café scenes, JoJo optional/background. Corkboard detail `assets/sunnyvaile-interiors/blend-snap-corkboard.png`.
  Exterior = **OPEN / HOLD**. The former `assets/sunnyvaile-buildings/08-blend-and-snap.png` was user-rejected and deleted as cottage-core artwork in the wrong SUNNYVAiLE colours. Do not substitute another exterior without exact positive approval.
- **LIBRAiRY (town library) reading room** = `assets/building-interiors/library-reading-room.jpg`
  (live on `library.html`). Exterior = `assets/sunnyvaile-buildings/03-town-library.png`.
- **Post Office** exterior = `assets/sunnyvaile-buildings/13-laidies-post-office.png`; lobby interior =
  `assets/building-interiors/post-office-lobby.jpg`.
- **SUNNYVAiLE main street establishing** = `assets/sunnyvaile-streets/main-street-golden.png`.

---

## ✅ COVERAGE CHECKLIST — every canon beat + every named person → its scene id

### Canon `## narrative` beats (1:1, in order)
| # | Canon beat (one line) | Scene id(s) |
|---|---|---|
| — | Recurring open: Previously / This week / Title | S01 · S02 · S03 |
| 1 | Cold open — 9:15 Tue, staring contest w/ a paragraph; word-salad vs yesterday's good update; "why does AI read my mind some days?" | S04 · S05 · S06 (the "I couldn't help but wonder") |
| — | Recurring: Welcome back to ladies + the to-town transform | S07 · S08 · **S09 (✨ TRANSFORMATION seq)** |
| 2 | To town — corner table at Blend & Snap, two outputs side by side; **it was the ask, not the tool** | S10 · S11 |
| — | ⚠ NARRATION-ONLY — "prompt" was swiped from the theater kids (AV club ← drama club) | S12 |
| 3 | Coffee-order analogy → concept **Context** (regular spot vs the new café across town) | S13 · S14 · **S15 (CONTEXT card)** |
| 4 | How long till it knows your order? Right now it doesn't — teach it to remember = a future episode | S16 |
| 5 | The Spice Girls → concept **Prompt** ("what you really, really want"); jagged-little-pill aside | S17 · **S18 (PROMPT card)** |
| 6 | David Rose / "fold in the cheese" — WHAT DOES THAT MEAN?! = your AI on a vague ask | S19 · S20 · S21 |
| 7 | The fix — brief it like a new hire (who/what/tone/length/what-not / show an example) | S22 · S23 · S24 · S25 |
| 8 | The demo — vague vs specific policy summary (comparison / the ONE full-page comic) | S26 · S27 (⚠ narration Ross "PIVOT") · **S28 (⭐ full-page comic)** · S29 (⚠ narration "It's Britney") |
| 9 | Iterate like a new hire — call the radio / buy the HMV CD, don't spin the dial | S30 |
| 10 | Soft-skills reframe — LIBRAiRY; Harvard/BCG study; Mollick quote; the skills that win | S31 · S32 · S33 · S34 |
| — | Recurring close: cocktail · postcard · try-on · sign-off · next week | S35 · S36 (⚠ narration) · S37 · S38 · S39 |

### Named people / characters → each gets HER/HIS OWN scene (never collapsed)
| Named | How rendered | Scene id(s) |
|---|---|---|
| **Heroine** (Ali likeness) | full character, corporate + Empire Records looks | S04–S11, S13–S17, S22, S25, S26, S30, S31, S38 |
| **FAiRY Godmother** | full comic character (lit-v2 ref) | S09 (transformation) |
| **David Rose** (patron saint) | full comic character, own scenes (face ref) | **S19, S20, S21** |
| **Ethan Mollick** (real, modern) | ⚠ NO likeness — attributed **quote card** (name lettered) | S33 |
| **The Spice Girls** (real) | ⚠ NO likeness — lyric lettering + Y2K CD/boombox motif | S17 |
| **Moira Rose** (referenced) | ⚠ NO likeness — the "fold in the cheese" line as lettering inside David's scene | S20 |
| **Ross / Friends "PIVOT"** (referenced) | ⚠ NO likeness — lettering + couch-on-stairs silhouette | S27 |
| **Britney "It's Britney, bitch"** (referenced) | ⚠ NO likeness — emphasis lettering only | S29 |

**⚠ NARRATION-ONLY beats** (in the audio, may be trimmed from the written article — include for the VIDEO):
S12 (theater-kids/AV-club "prompt"), S27 (Ross "PIVOT"), S29 ("It's Britney, bitch"), S36 (the postcard / Post Office).

---

# PART 1 — OPEN + COLD OPEN

### S01 — PREVIOUSLY ON → `ep02-open-01-previously-strip-comic.png`
**Format: recap comic STRIP (3 panels) + caption box `PREVIOUSLY ON LAiDIES`.** Recap Ep1 ONLY: panel 1 —
heroine (CORPORATE, navy blazer) stops feeling behind, exhale of relief at her desk · panel 2 — the one
avoided email finally sent, "nine seconds flat," a little clock/whoosh · panel 3 — caption/thought:
**"AI is just the most talented new hire she'll ever manage."** Locked recap-strip caption style. Present,
brighter. ONE image.

### S02 — THIS WEEK → `ep02-open-02-thisweek-teaser-comic.png`
**Format: teaser strip/montage + caption `THIS WEEK`.** Distinct from S01. Hook imagery: a chat box spitting
back a paragraph of grey word-salad ("Leverage synergies…") → a hard cut to the same box giving a crisp,
usable answer → a tiny "prompt = delegation" tease. NO Ep1 content. ONE image.

### S03 — TITLE CARD → `ep02-open-03-title-comic.png`
**Format: bold comic TITLE card.** Big comic lettering **TELL ME WHAT YOU WANT** + "Episode Two", on a
vibrant Y2K comic ground (pinks/teals/plum). Spell exactly. ONE image.

### S04 — COLD OPEN, corporate desk → `ep02-open-04-cold-open-desk-comic.png`  ·  *(canon beat 1)*
**Format: full scene.** 9:15 on a Tuesday. Heroine **CORPORATE** (navy blazer, blonde 90s hair) at her office
desk, **losing a staring contest with a paragraph** — chin on hand, dead-eyed at the monitor. On screen: a
block of grey corporate word-salad ("Leverage synergies. Drive alignment. Circle back to maximize stakeholder
buy-in."). Tired fluorescent office light — **cooler, most desaturated frame of the episode** (by intent).
Correct hands. Screen glow on her face.

### S05 — SAME APP, SAME ME (the throw-pillow beat) → `ep02-open-05-throw-pillow-comic.png`
**Format: emphasis / 2-up.** The maddening contrast: a small split showing YESTERDAY's clean director-update
she barely touched vs TODAY's word-salad — "Same app. Same me." Overlay the quotables as comic word-bursts:
**"It reads like a motivational poster that went to business school and came back worse."** and **"One day it
reads my mind, and the next it hands me a throw pillow."** Spell exactly. Cool office palette.

### S06 — "I COULDN'T HELP BUT WONDER" → `ep02-open-06-thinking-closeup-comic.png`  ·  *(recurring #5)*
**Format: CLOSE-UP, locked recurring frame.** Tight, reflective close-up of the heroine (CORPORATE) caught
mid-thought, screen glow on her face — the Carrie beat. Caption/thought balloon: **"Why does AI read my mind
some days, and completely ignore me on others?"** Face must read as HER. Contemplative.

### S07 — WELCOME BACK TO LADIES → `ep02-open-07-welcome-back-comic.png`  ·  *(recurring #4)*
**Format: locked welcome frame.** Bright **SUNNYVAiLE main-street establishing** (ref `main-street-golden.png`)
— the "welcome back to ladies… smart, busy women learning AI one Wednesday at a time, from a little internet
town called Sunnyvale" beat. Most vibrant Y2K palette. Heroine may be small/absent; it's the town. Branded,
warm.

### S08 — I TOOK IT TO TOWN → `ep02-open-08-to-town-comic.png`
**Format: full scene / transition-in.** "I did what I do with any problem I can't out-stubborn at my desk: I
took it to town." Heroine (still CORPORATE) stepping out of the cool office world toward the bright town — the
threshold between her two selves. Sets up the transformation. Palette shifts cool→warm across the frame.

### S09 — ✨ TRANSFORMATION SEQUENCE  ·  *(recurring #6)*
> ⚠ **REWRITTEN by Ali 2026-07-19 — IGNORE the wand/FG/Cinderella description below. Use the AUTHORITATIVE spec `operations/codex-prompts/transformation-sequence-spec.md`:** ⛔ NO wand, NO FAiRY Godmother visible, NO in-town reveal — ABSTRACT 90s geometric STAGE. Frames `15p0` corporate start → `15p1–15p3` poof → `15p4` REVEAL (Ep2 = Empire Records + 6 clips). Only the reveal is episode-specific. The lines below are superseded.
**Format: SPECIAL SEQUENCE (see `comic-animation-frame-spec.md`). Full-body throughout.** The reusable
Cinderella-homage transform: CORPORATE → FAiRY Godmother wand → sparkle/POOF → reveal in the week's SUNNYVAiLE
outfit. **Frames 09a–09i are SHARED across every episode; only 09j (the reveal) changes per episode.**
- `09a` heroine **CORPORATE** (start state), full-body.
- `09b`–`09d` **FAiRY Godmother wand-motion in-betweens** (raise → arc → contact — ≥3 frames so it's smooth,
  not choppy); FG = the `opening-05-fairy-godmother-rerender-lit-v2.png` ref, rendered comic (plum star-robe,
  dark curls, silver wand).
- `09e`–`09f` **magic-effect building** (sparkle/POOF, multiple frames, vibrant Y2K burst of pink/teal/gold).
- `09g` **MID-TRANSFORMATION** frame — her form actually CHANGING mid-swap (the navy blazer morphing into the
  Empire Records plaid — a real transition state, not just sparkle).
- `09h`–`09i` **magic clearing** (effect dissipating, more frames).
- `09j` **REVEAL** — heroine in the **SUNNYVAiLE look = EMPIRE RECORDS** (plaid pleated mini-skirt + fitted
  long-sleeve top, grunge record-store energy; outfit ref `iconic-outfit-02.png`), **hair = the locked 6-butterfly-
  clip half-up in waves** (three sections each side). Confident, arrived. **Motion:** play once → hold on `09j`.
  ⚠ Need MORE wand-motion + MORE magic frames than a 5-frame cut (Ali: 5 was too choppy).

---

# PART 2 — THE STORY (present-day, in town)

## Canon beat 2 — to town: it was the ask, not the tool

### S10 — BLEND & SNAP, CORNER TABLE → `ep02-scene-10-blend-snap-corner-comic.png`  ·  *(canon beat 2)*
**Format: full scene.** Heroine (SUNNYVAiLE / Empire Records look) at the **corner table of the Blend & Snap**,
oat latte, KSVL playing low (a little radio/speaker detail), laptop open. Warm, sunny, vibrant café.
⚠ **Architecture + color MATCH `assets/town-characters/scenes/jojo-scene.png`** (the NEW canonical Blend & Snap interior — magenta walls, Memphis art, pastry case, espresso machine, clock-tower window; render comic — same room,
same warm café palette). Relaxed, settling-in energy.

### S11 — THE TWO OUTPUTS, SIDE BY SIDE → `ep02-scene-11-side-by-side-comic.png`  ·  *(canon beat 2)*
**Format: full scene / over-the-shoulder.** She pulls both up on the laptop and sets them **side by side** —
the morning's word-salad talking points vs yesterday's director update she barely touched. Over-the-shoulder
so we read both. The realization lettering: **"It wasn't the tool that changed. It was the ask."** and
**"AI can't read your mind — what's in your head stays in your head until you type it out."** Spell exactly.
Bright café.

### S12 — ⚠ NARRATION-ONLY · THE THEATER KIDS → `ep02-scene-12-prompt-theater-kids-comic.png`
**Format: emphasis / wry aside panel (⚠ NARRATION-ONLY — likely trimmed from the article; keep for VIDEO).**
The gag that "prompt" wasn't invented by the computer nerds — the AV club **swiped it off the drama club.**
Two never-overlapping lunch tables — a stage-y "drama" table and a wires-and-monitors "AV club" table — with
the word **PROMPT** lifting off the drama side and landing on the AV side. Comic, playful. Spell **PROMPT**
crisply. NO real-person likeness.

## Canon beat 3 — the coffee-order analogy → CONTEXT

### S13 — YOUR REGULAR SPOT → `ep02-scene-13-regular-cafe-comic.png`  ·  *(canon beat 3)*
**Format: full scene.** The coffee-order analogy, half A: **your regular café knows your usual** — a friendly
barista already reaching for her cup before she speaks, a warm "hundred Tuesdays" familiarity. Cozy, warm,
vibrant. (This is a generic warm café, not the Blend & Snap interior — the contrast partner to S14.)

### S14 — THE NEW CAFÉ ACROSS TOWN → `ep02-scene-14-new-cafe-comic.png`  ·  *(canon beat 3)*
**Format: full scene, contrast.** Half B: the **brand-new café across town** — she breezes in, says "the
usual," and gets a **blank look** from an unfamiliar barista; a plain drip coffee going cold on the counter.
It "genuinely can't see what you didn't say." Cooler, unfamiliar palette vs S13's warmth — same framing so
they read as a pair. The lesson: AI = the new café; spell it out every time and the guessing stops.

### S15 — CONCEPT CARD: CONTEXT → `ep02-concept-context-comic.png`  ·  *(canon beat 3)*
**Format: text-only concept card (recurring #7).** Bold comic term lettering **CONTEXT** + one-line def:
**"Everything the AI can't see unless you say it — your job, your reader, the meeting, the goal."** Graphic
Y2K ground. Locked concept-card treatment. Spell exactly.

## Canon beat 4 — how long till it knows your order?

### S16 — A STRANGER EVERY NEW CHAT → `ep02-scene-16-stranger-again-comic.png`  ·  *(canon beat 4)*
**Format: emphasis / small scene.** "Every new chat, you walk into the café a stranger again." The heroine at
the café doorway with a fresh "New chat" blank slate; a faint ghosted note that **you can teach it to remember
you — that's a future episode.** Caption/burst: **"For today: assume it forgot, and tell it again."** Spell
exactly. Warm but with the "starting from zero" beat.

## Canon beat 5 — the Spice Girls → PROMPT

### S17 — THE SPICE GIRLS BEAT → `ep02-scene-17-spice-girls-comic.png`  ·  *(canon beat 5)*
**Format: full scene + emphasis.** ⚠ **NO real-person likeness of the Spice Girls.** Render the heroine
(SUNNYVAiLE look) with a peak-Y2K music motif — a boombox / CD single / radio — as the lyric blazes across the
frame as comic lettering: **"Tell me what you want, what you really, really want."** They wanted specifics, not
a vibe. Include the aside as a small wry burst: **"That is a jagged little pill to swallow, but here we are."**
Vibrant pinks/teals. Spell exactly.

### S18 — CONCEPT CARD: PROMPT → `ep02-concept-prompt-comic.png`  ·  *(canon beat 5)*
**Format: text-only concept card (recurring #7).** Bold comic term lettering **PROMPT** + one-line def:
**"The ask you give an AI — the instructions for the work you want back."** Sub-line: *"Specific brief →
usable work."* Graphic Y2K ground. Locked concept-card treatment. Spell exactly.

## Canon beat 6 — David Rose / fold in the cheese  (PATRON SAINT — his own scenes)

### S19 — DAVID ROSE, PATRON SAINT → `ep02-scene-19-david-rose-intro-comic.png`  ·  *(canon beat 6)*
**Format: full scene, hero intro.** **David Rose** (face ref `david-rose-y2k-stained-glass.png` — FACE ONLY,
render him as a full COMIC character, NOT stained glass): monochrome high-fashion knit, expressive brows, the
pathologically-specific energy — gesturing at exactly the right wine / the exact drape of the sweater. Caption:
**"Patron saint of this episode: David Rose."** A small halo/patron-saint flourish (comic, playful — the one
deliberate non-90s male exception). Vibrant. Fabulous.

### S20 — "WHAT DOES THAT MEAN?!" (fold in the cheese) → `ep02-scene-20-fold-in-the-cheese-comic.png`  ·  *(canon beat 6)*
**Format: emphasis / full scene — his own beat.** David Rose in a kitchen, **aghast, mid-scream** — a bowl in
front of him. ⚠ **NO likeness of Moira** — render her instruction as a floating caption/label off-panel:
**"fold in the cheese."** David's word-burst: **"WHAT DOES THAT MEAN?!"** Spell both exactly. Comic energy,
big expression (pull from the expression register of the style refs). Vibrant.

### S21 — THAT'S YOUR AI EVERY TIME → `ep02-scene-21-thats-your-ai-comic.png`  ·  *(canon beat 6)*
**Format: emphasis / analogy panel.** The payoff: split idea — on one side David's aghast "fold in the cheese"
face; on the other, a chat box with a vague human prompt **"write me an email about the project"** and the AI
trying-but-missing. Caption: **"That's your AI, every single time."** The clear-instruction contrast (the
spatula "scrape / lift / turn / repeat" version) can appear as a tidy checklist motif. Spell the vague prompt
exactly.

## Canon beat 7 — the fix: brief it like a new hire

### S22 — BRIEF IT LIKE A NEW HIRE → `ep02-scene-22-brief-new-hire-comic.png`  ·  *(canon beat 7)*
**Format: full scene.** Heroine (SUNNYVAiLE look) at the café, no longer typing "at" AI like a Google search —
now **briefing it like a smart new hire in her first week.** Warm, in-command posture; the chat on the laptop
being handed a real brief. Vibrant café. The mood: delegation, not coding.

### S23 — THE BRIEF QUESTIONS (study-pack card) → `ep02-concept-brief-questions-comic.png`  ·  *(canon beat 7)*
**Format: text-only card (study-pack style).** A tidy comic card of the briefing questions, each on its own
line: **Who is this for? · What do they care about? · What's the tone? · How long? · What should it NOT
include? · Any example to copy?** Header: **BRIEF IT LIKE A NEW HIRE.** Graphic Y2K ground. Spell exactly.

### S24 — PROMPTING ISN'T TECHNICAL → `ep02-emph-delegation-comic.png`  ·  *(canon beat 7)*
**Format: emphasis burst.** Big comic lettering: **"Prompting isn't technical. It's delegation."** Punchy,
graphic. Spell exactly.

### S25 — STEAL ONE MOVE: SHOW IT AN EXAMPLE → `ep02-scene-25-match-this-comic.png`  ·  *(canon beat 7)*
**Format: emphasis / small scene.** The one move to steal: **show it an example.** Heroine pasting a past
email/summary she loves into the chat with the line **"match this."** A "paste → match" motif. Caption:
**"Nothing gets you a better answer faster than handing it something to copy."** Spell "match this" exactly.

## Canon beat 8 — the demo: vague vs specific  (the ONE full-page comic)

### S26 — THE VAGUE ASK → `ep02-scene-26-vague-ask-comic.png`  ·  *(canon beat 8)*
**Format: full scene.** The 12-page policy change on the desk before a 2 p.m. meeting. She types the lazy ask —
the chat box shows, verbatim: **"summarize this policy change for my stakeholders."** *(⚠ MUST-MATCH — spell
EXACTLY; enforced by `operations/check-episode.sh 2`.)* Back comes a **wall of grey over-detailed text** —
accurate, thorough, useless in two minutes; everything weighted the same. Show the over-detail (a long dump),
NOT four short sentences. Cool/overwhelmed tone on the screen; heroine slightly daunted.

### S27 — ⚠ NARRATION-ONLY · "PIVOT!" → `ep02-scene-27-pivot-comic.png`
**Format: emphasis burst (⚠ NARRATION-ONLY — audio only; keep for VIDEO).** The Friends gag: a big word-burst
**"PIVOT!"** over a **silhouette of a couch stuck on a staircase** — "technically a direction, zero help getting
the couch up the stairs." ⚠ NO real-person likeness (silhouettes only). Spell **PIVOT!** exactly. Wry.

### S28 — ⭐ THE SPECIFIC BRIEF → THE ANSWER (full-page comic) → `ep02-comicpage-vague-vs-specific.png`  ·  *(canon beat 8 — the episode's ONE big beat)*
**Format: FULL-PAGE COMIC (recurring #9 — the single biggest dramatic beat, style-echo
`operations/reference/comic-book-page-style/comicpage-01.webp`).** A multi-panel PAGE that lands the whole
lesson:
- **Panel 1** — she briefs it out loud / types the specific version: *summarize for six senior managers with
  two minutes before a meeting; what's changing, when it takes effect, what teams do differently, whether it
  touches budget; cut the backstory; bullets ~150 words; "here's last quarter's summary that landed — match it."*
- **Panel 2** — the RESULT on screen, forwardable as-is: a clean exec summary, **subject line "Compliance
  Reporting — Q4 Policy Update,"** then tight complete-sentence bullets (What's changing · When it takes effect ·
  What your team does differently · Budget impact · **Who's affected** · What we need from you). Render it as a
  believable email, NOT telegraphic AI fragments.
- **Panel 3 (the "why AI" hit)** — a glow/highlight on the **"Who's affected"** bullet: *contractors/vendor
  teams exempt until Q1* — the buried carve-out she'd never have caught skimming 12 pages in 2 minutes.
  Caption: **"That one line is the whole reason you opened AI."** ⚠ Phrase it as a clean brief caveat — NEVER
  "buried on p.9" chatter in the output; the "buried" story stays in narration only.
Use **real months** (Oct 1 / Dec 31 / Sep 15 / Q1), never bare "the 1st." Vibrant, triumphant. Render ALL text
crisp and exactly. This is the splash of the episode — spend the space here.

### S29 — ⚠ NARRATION-ONLY · "IT'S BRITNEY" → `ep02-emph-britney-comic.png`
**Format: emphasis burst (⚠ NARRATION-ONLY — audio only; keep for VIDEO).** The unbothered-confidence beat:
big comic lettering **"It's Britney, bitch."** — the feeling of asking for exactly what you wanted and getting
exactly what you needed. ⚠ NO real-person likeness — lettering + a Y2K sparkle/mic motif only. Spell exactly.

## Canon beat 9 — iterate like a new hire (radio / HMV)

### S30 — REQUEST THE SONG, DON'T SPIN THE DIAL → `ep02-scene-30-request-the-song-comic.png`  ·  *(canon beat 9)*
**Format: full scene, KSVL motif.** If the first answer's off, you don't start over — you tell it what's wrong.
The analogy: **calling into the radio (KSVL 99.9) to request exactly the song** — or shelling out twenty bucks
at HMV for the CD — **not spinning the dial hoping it lands on one you like.** Heroine with a phone to the KSVL
request line / an HMV CD in hand; a radio dial that she's NOT frantically spinning. Optionally the KSVL motto
as a small burst: **"Don't just learn from books. Learn from hooks."** Vibrant, musical, fun. Spell exactly.

## Canon beat 10 — soft-skills reframe (the LIBRAiRY / the study)

### S31 — AT THE LIBRAiRY → `ep02-scene-31-libraiy-comic.png`  ·  *(canon beat 10)*
**Format: full scene.** Later that week, at the **LIBRAiRY** — the town reference desk where you go to look
things up. Heroine (SUNNYVAiLE look) pulling the study at the reading-room desk, a lamp-lit "found the proof"
beat. ⚠ **Architecture + color MATCH `assets/building-interiors/library-reading-room.jpg`** (render comic —
same room). Warm, studious, vibrant.

### S32 — THE STUDY (stat card) → `ep02-concept-bcg-study-comic.png`  ·  *(canon beat 10 — facts[])*
**Format: text/stat card.** Header: **HARVARD × BCG · 758 CONSULTANTS.** The verified numbers: **~25% faster**
· **~40% higher-quality work** — *for the ones using AI well, on the right kind of task.* Small caveat line:
*"the differentiator wasn't technical — it was knowing how to brief, hand over context, when to push back."*
Graphic card, crisp figures. Spell exactly (numbers per canon `facts[]`).

### S33 — ETHAN MOLLICK QUOTE → `ep02-quote-mollick-comic.png`  ·  *(canon beat 10 — his "scene")*
**Format: attributed quote card. ⚠ NO likeness of Mollick** (real, modern) — his beat is a quote card with his
name lettered, dignified. The verbatim quote: **"The skills that are so often dismissed as 'soft' turned out to
be the hard ones."** *(⚠ contains the MUST-MATCH substring **"turned out to be the hard ones"** — spell
EXACTLY; enforced by `check-episode.sh 2`.)* Attribution line: **— Ethan Mollick, Wharton.** Clean, quotable,
Y2K-editorial. Spell exactly.

### S34 — THE SKILLS THAT WIN → `ep02-emph-soft-skills-win-comic.png`  ·  *(canon beat 10)*
**Format: emphasis burst / reframe.** Big lettering reframe: **"The skills filed under 'soft' are the ones that
win now — not instead of the hard skills, on top of them."** Optional sub-line: *"A sharp communicator with real
judgment who also knows her stuff — that's the one that wins."* Punchy, empowering, vibrant. Spell exactly.

---

# PART 3 — CLOSE (recurring segments)

### S35 — COCKTAIL PARTY → `ep02-cocktail-comic.png`  ·  *(recurring #10)*
**Format: text card, cocktail / Bronze-AiGE motif.** The say-it-at-happy-hour line (verbatim from canon
`cocktail_party`): **"A prompt isn't code. It's a delegation. You're not programming a machine — you're
briefing an assistant. And you already know how to brief… This one is just faster, never sleeps, and will
absolutely fold the cheese wrong if you don't tell her how."** A cocktail-glass motif, cheeky. Spell exactly
(condense gracefully if the card overflows, but keep "briefing an assistant" and "fold the cheese wrong").

### S36 — ⚠ NARRATION-ONLY · THE POSTCARD → `ep02-scene-36-postcard-comic.png`
**Format: full scene (⚠ NARRATION-ONLY vs the canon narrative — from script §6; keep for VIDEO).** On her way
out of town she stops by the **Post Office** and mails a friend a postcard — "the kind you send from a place you
actually love." ⚠ **Architecture MATCH `assets/sunnyvaile-buildings/13-laidies-post-office.png` /
`assets/building-interiors/post-office-lobby.jpg`** (render comic). The postcard back reads, in handwriting:
**"because Sunnyvale is even better with your people in it."** Warm, tender, vibrant. Spell exactly.

### S37 — THE TRY-ON → `ep02-tryon-comic.png`
**Format: text card / instructional.** Header **THIS WEEK'S TRY-ON · 10 minutes, not homework.** The task
(from canon `try_on`): **"Hand one real task to an AI tool twice. First the lazy way — three vague words. Then
the David Rose way: who it's for, what they care about, the tone, the length, and what to leave out. Put the two
answers side by side."** Closing line: *"The difference isn't the tool getting smarter — it's you getting
specific."* Graphic Y2K card. Spell exactly.

### S38 — SIGN-OFF / "REMEMBER, LADIES" → `ep02-signoff-comic.png`  ·  *(recurring #11)*
**Format: big emphasis frame (locked sign-off treatment).** Heroine (SUNNYVAiLE / Empire Records look) to
camera, warm. The remember line: **"AI can't read your mind — so tell it what you want… what you really, really
want."** + the locked tag **"See you next Wednesday… in SUNNYVAiLE."** Also render the card quotable **"Be
specific. Be bold. Be David Rose about it."** as a secondary burst. Biggest, most confident lettering. Spell
exactly.

### S39 — NEXT WEEK ON → `ep02-open-next-week-comic.png`  ·  *(recurring #12)*
**Format: teaser strip + caption `NEXT WEEK ON LAiDIES`.** Ep3 tease: the machine hands the heroine a
**beautiful, confident answer — with one small detail that could blow up the whole meeting.** A glowing answer
with one wrong line flagged. Caption: **Episode Three: The Burn Book Problem.** Distinct from S02. Spell exactly.

---

## After the images land (Claude does these — NOT part of this batch)
1. Swap all into the written article `issues/issue-02.html` (replace the old `ep02-scene-0N` pixel `.jpg`
   posters). Article may omit the ⚠ NARRATION-ONLY frames (S12, S27, S29, S36) — those are for the VIDEO.
2. Video = Codex assembles keyframes + `operations/audio/episode-02-elevenlabs-v3-tagged.txt` narration master
   (CapCut), motion per `comic-animation-frame-spec.md` + transitions per `operations/episode-comic-grammar.md`
   (scene-to-scene + caption for the coffee A/B; page-turn is not needed — no historical flashbacks this ep).
3. QC each on delivery: recipe (no dots/pixel/plasticy/pop-art/tarot), correct hands where shown, text spelled
   EXACTLY (esp. the two MUST-MATCH strings: *summarize this policy change for my stakeholders* · *turned out
   to be the hard ones*), heroine SUNNYVAiLE look = Empire Records outfit + 6-clip half-up hair, David Rose
   rendered comic (not stained glass), NO real-person likenesses except David Rose.

## MUST-MATCH (verbatim — from canon; must also appear in script + article)
- **summarize this policy change for my stakeholders**  → rendered in **S26**
- **turned out to be the hard ones**  → rendered in **S33** (inside the Mollick quote)
