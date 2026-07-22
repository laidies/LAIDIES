# EPISODE 3 — "THE BURN BOOK PROBLEM" · MASTER image-prompt batch (hand to Codex, run top→bottom)

> **FOR CODEX:** ✅ GENERATE every image below, top→bottom. **Output dir:** `assets/episodes/ep-03/comic/` · filenames exactly as given (`ep03-…-comic.png`). Images only — no HTML/CSS/git.

Single complete Ep3 image list, in **narration order**, built **beat-by-beat straight from**
`content/episodes/episode-03.canon.md` (`## narrative` = the beat list, 15 beats). Every named person gets
her **own** scene (never collapsed into a group). Recurring show-segments are included in their locked
formats. **Paste the GLOBAL STYLE block with EVERY prompt.** Generate FRESH comic (do NOT de-pixelate the
old `assets/episodes/ep-03/pixel/*` frames — those are the superseded pixel pass; fresh-gen beats convert).
One image per `→` line unless it says **SEQUENCE / MONTAGE**.

**Reference rule (grep, never guess):** the exact reference paths named below are the ONLY references — never
let the model pick its own from the repo. **Style/palette** from the style-lock set · **faces** from the named
saint portrait / heroine kit · **architecture/color** from the named building. Nothing from memory. Where a
named person has **no approved face ref**, the line says so and tells Codex to render fresh (don't borrow another
character's face).

**Canon guardrails baked in (from memory + canon):**
- ⛔ **Do NOT personify AI as "her"/"she" who "spots" or "decides."** The Burn Book is *written by* someone; AI
  *guesses*. Keep AI an "it" in any rendered text. (`[[ai-is-it-not-her]]`, `[[burn-book-not-true-canon]]`.)
- ⛔ **Nothing in the Burn Book is "true."** The point is true + false come out in the *same handwriting*.
- 🎨 Ep3's world palette (from `content/issues/issue-03.md`): **icy blue + silver, cream receipts, translucent
  plastic tabs, one tiny butterfly clip; pink as accent only.** No readable fake body-text, no robots, no
  circuit-board wallpaper, no Halloween, no childish diary clutter.

---

## ✅ COVERAGE CHECKLIST — every canon beat + every named person is mapped

**Canon `## narrative` beats → scene id(s):**

| Canon beat | Scene id(s) |
|---|---|
| 1 · Cold open — the office miracle that lies | S01, S01b, EMPH-lanyard, COMPARE-01/02/03 |
| 2 · I couldn't help but wonder… | S02 *(recurring seg 5)* |
| 3 · To town — NewsStand on Main ⚠ SCRIPT-PRIMARY | S03, EMPH-says-who |
| 4 · The Burn Book Problem → concept Hallucination | S04-REGINA, EMPH-same-handwriting, CONCEPT-hallucination, EMPH-burn-book-problem |
| 5 · Bethany Byrd — the tiny sourcing disaster | S05-BETHANY, EMPH-claires-headband |
| 6 · Can I use AI? Yes | EMPH-churn-butter |
| 7 · She doesn't even go here → concept Assumption | S07, EMPH-doesnt-go-here, CONCEPT-assumption, S07b-wrong-room, EMPH-fake-citation |
| 8 · Elle Woods would like to see the file → concept Verification | S08-ELLE, S08b-CHUTNEY, CONCEPT-verification, EMPH-chutney-elle |
| 9 · Cher's closet — sort into three piles → Draft/Claim/Receipt | S09-CHER, CONCEPT-draft, CONCEPT-claim, CONCEPT-receipt, EMPH-draft-outfit |
| 10 · You're Elle, the machine is the law clerk ⚠ SCRIPT-ONLY | S10, EMPH-judgment-stayed-yours |
| 11 · Chutney can say it thrice → facts | EMPH-peer-reviewed, S11-thrice (MONTAGE), FACT-kpmg, FACT-nature, FACT-stanford-index, FACT-legal-rag, EMPH-sources-attached |
| 12 · David, meet Elle — Prompt Like Elle → try_on | S12, METHOD-move1, METHOD-move2, METHOD-move3, METHOD-rule |
| 13 · The cocktail-party explanation | COCKTAIL *(recurring seg 10)* |
| 14 · The try-on / Receipts Pass | S14, TRYON-rule |
| 15 · Sign-off | SIGNOFF *(recurring seg 11)* |

**Recurring show-segments (locked formats):** PREVIOUSLY ON (P01) · THIS WEEK (P02) · TITLE CARD (P03) ·
WELCOME BACK (P04) · I-couldn't-help-but-wonder (S02) · ✨ TRANSFORMATION (T-SEQ) · CONCEPT cards (7×) ·
EMPHASIS bursts (many) · COMIC PAGE (the Burn-Book two-hand splash, EMPH-same-handwriting) · COCKTAIL
(COCKTAIL) · SIGN-OFF (SIGNOFF) · NEXT WEEK ON (P-NEXT).

**Every named person → HER OWN scene (never grouped):**

| Named person (canon) | Her scene | Face ref |
|---|---|---|
| **Regina George** (Burn Book / social authority; beats 4, 11) | S04-REGINA | `assets/saints/y2k-stained-glass-v2/regina-george-y2k-stained-glass.png` |
| **Bethany Byrd** (sourcing disaster; beat 5) | S05-BETHANY | ⚠ NO approved ref — render fresh (see scene) |
| **Elle Woods** (verification / patron saint; beats 8, 15) | S08-ELLE | `assets/saints/y2k-stained-glass-v2/elle-woods-y2k-stained-glass.png` |
| **Chutney Windham** (the repeated alibi; beats 8, 11) | S08b-CHUTNEY + S11-thrice | ⚠ NO approved ref — render fresh, distinct from Elle (see scene) |
| **Cher Horowitz** (the closet / three piles; beat 9) | S09-CHER | `assets/saints/cher-horowitz.png` |
| **Heroine** (present-day lead; throughout) | S01, S01b, S02, S03, S07, S10, S12, S14 | heroine kit (below) |

⚠ **NARRATION-ONLY / SURFACE-SPECIFIC beats flagged inline:** beat 3 (script-primary), beat 10 (script-only).

---

## 🎨 GLOBAL STYLE — paste with EVERY prompt

### ⚠ HARD GUARDRAILS — apply to EVERY prompt (Ali 2026-07-19, from Ep1/Ep2 failures)
1. **TWO WORLDS STAY SEPARATE — the outfit MUST match the location (Ali 2026-07-19).** (a) **Corporate look** = navy suit / professional 90s hair / **NO butterfly clips** = **CORPORATE-LAND ONLY** (her work desk, office, city — the "before"). (b) **SUNNYVAiLE look** = the week's 90s/Y2K iconic outfit + **6-butterfly-clip half-up hair** = **IN SUNNYVAiLE ONLY** (the town / Main Street / buildings). ⛔ **NEVER MIX:** no Y2K outfit or butterfly clips in a corporate setting; no corporate suit in SUNNYVAiLE; no corporate-land inside SUNNYVAiLE. If she's in a 90s/Y2K outfit she IS in SUNNYVAiLE; if she's in the suit she is NOT. The **transformation** is the ONLY bridge between the two worlds.
2. **STYLE REFS = TREATMENT ONLY — NEVER their PEOPLE.** The style-lock refs supply LINE / INK / SHADOW-PLANES / COLOR only. ⛔ Do NOT reproduce, echo, or make ANY character resemble the PEOPLE in those refs (Timnit, Joy, Emily, Kate, Hedy, etc.). Every incidental / background / crowd figure = ORIGINAL + invented — nobody who looks like a ref person. (This bug hit Ep1 + Ep2.)
3. **EVERY character has a COMPLETE, WELL-FORMED FACE.** No faceless / blank / smeared / missing-face figures — named characters especially (a "Steve with no face" shipped in Ep1). Clear eyes/nose/mouth + correct anatomy on every person in frame.
4. **POPULATED TOWN SCENES = the BUILDING'S CANONICAL KEEPER — never a random person.** If a scene is set in a SUNNYVAiLE building that has a keeper, the person shown IS that keeper (likeness from their portrait, rendered in the episode's comic style) — do NOT invent a random barista/clerk/bartender/host for a named place. **KEEPER → portrait:** Blend & Snap → **JoJo** `assets/town-characters/scenes/jojo-scene.png` · Town Hall → **Mayor Deb** `assets/town-characters/scenes/mayor-deb-scene.png` · KSVL → **DJ SunnyV** `assets/episodes/ep-04/pixel/ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png` · Post Office → **Penny** `assets/town-characters/scenes/penny-scene.png` · BRONZE AiGE → **Cosmo** `assets/town-characters/scenes/cosmo-scene.png` · Chick Flicks → **Becky** `assets/town-characters/scenes/becky-scene.png` · Delta LAi Nu → **June** `assets/town-characters/scenes/june-scene.png` · MAiKEOVER → **Paulette** `assets/town-characters/scenes/paulette-scene.png` · NewsStand → **Paige** `assets/town-characters/scenes/paige-scene.png` · LIBRAiRY → **Miss Jeeves** `assets/video/delivery-20260714-opening-v6/shots/_miss-jeeves-approved-reference.png` · Mme CLAi-O shop → **Mme CLAi-O** `assets/building-interiors/mme-claio-reading-room.jpg` · FAiRY Godmother house → **the FG** `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` · LUMINAiRY → **Matron Lumen** `assets/town-characters/scenes/matron-lumen-scene.png`. Background CROWD (not a keeper's building) = original Y2K women (per guardrail 2, no ref-lookalikes).
5. **CHECK FOR DRIFT before finalizing EVERY image — regenerate if it fails. (Drift is a problem EVERYWHERE — this check is not optional.)** (a) Every character's FACE/likeness matches their LOCKED reference and reads as THAT person (heroine, icons, keepers) — no wrong/drifted face. (b) **⛔ NO smooth glamour-cartoon construction. The generated image MUST match the graphic-novel style examples and use REALISTIC FACIAL ANATOMY, BOLD INKED COMIC CONTOUR LINES (confident graphic-novel ink line with some weight variation — NOT smooth even vector lines, but ⛔ NOT painterly / brush-painted / watercolor either), and LARGE SCULPTURAL SHADOW SHAPES (the hard angular planes).** ⛔ NOT clean-vector / plasticy / smooth-3D / pretty-cartoon / plain-flat illustration. Faces + style drift the most — check BOTH, every image.
6. **ALL on-image text = COMIC-BOOK LETTERING, never a plain text box.** Text-only frames, emphasis bursts, concept cards, captions, and any words on a scene must be **bold dynamic comic lettering** (word-burst / hand-inked / integrated into a burst, banner, or caption box with comic energy) — ⛔ NOT plain typed text sitting in a plain rectangle. Ref: `operations/reference/font-and-text-emphasis/`.
7. **SUNNYVAiLE = period-Y2K TECH ONLY — no modern electronics.** In any SUNNYVAiLE scene: a laptop = a colorful **iBook G3 clamshell**; a desktop computer = an **older CRT monitor** (beige/bubble, NOT a flat-screen); a cell phone = a **Motorola RAZR flip phone**. ⛔ No MacBooks, flat-screen monitors, smartphones/iPhones, or any modern device in town. (Corporate-land keeps present-day tech — that contrast reinforces guardrail #1.)

Locked LAiDIES comic / graphic-novel: **bold black ink outlines, HARD angular grey shadow PLANES** (keep them
hard/geometric — that IS the style), clean flat color, painterly-inked finish. ⛔ NO halftone/ben-day DOTS
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
⚠ **Take the ILLUSTRATION STYLE from these (line/ink/hard shadow-planes = the lock) — but they read DARK because they're from Ep4 (the dark-themed episode). Ep3 is present-day (icy-blue/silver world, but bright): keep the illustration style, push the COLOR per this episode's palette. Do NOT copy their darkness.**

🎨 **VIBRANT + 90s PALETTE — pinks, teals, blues** (+ plum/gold/cream); saturated Y2K color, NOT muted/dusty.
Ep3's own accent world = **icy blue + silver + cream, one butterfly clip, pink as accent only.**
**Tone follows scene:** PRESENT / SUNNYVAiLE town = brightest + most saturated · any flashback / courtroom /
Burn-Book memory = moodier *by intent* but still in-palette (NOT washed out). 16:9, **≥1920 wide.**

**LOCKED FACES / REFS (faces only, never their style):**
- **Heroine** = her comic kit `assets/episodes/ep-04/pixel/ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-suit-flat-color-only-1920.png`
  + `…/ep04-heroine-turnaround-sheet-clueless-v1-v28-locked-1920.png` + `…/ep04-heroine-expression-sheet-v2-graphic-novel-register-v28-locked-1920.png`.
  **CORPORATE look** (pre-transform: S01, S01b, S02) = **navy blazer / white top / blonde 90s hair.**
  **SUNNYVAiLE look** (post-transform: S03 onward) = ✅ **LOCKED (Ali 2026-07-19): the REGINA GEORGE / Mean
  Girls outfit** — specifically her **"A Little Bit Dramatic" look (the white cut-out tank)**, on the HEROINE
  (Ali's face + 90s hair, NOT Regina's face). Thematic: Ep3 = the Mean Girls episode.
  OUTFIT reference (the LOOK only, never the face) = `operations/reference/heroine-wardrobe/iconic-outfit-06.png`
  (the existing Regina "A Little Bit Dramatic" wardrobe ref). Distinct from Ep1's hot-pink ("on Wednesdays we
  wear pink" is a different Regina look — Ep1 owns pink; Ep3 = the white "A Little Bit Dramatic" tank).
  Hair = **3 sections each side / 6 butterfly clips, half-up in waves** (NOT a vertical line).
  ⚠ **PALETTE NOTE:** the crisp white look reads clean against Ep3's cool icy-blue/silver world — she's the
  bright focal point. Keep the episode's icy-blue grading for settings/cards.
  ⚠ Beat 7 is the ONE exception: heroine pulls on a **blue hoodie + oversized sunglasses** (Damian homage) over
  the look for the "she doesn't even go here" gag.
- **FAiRY Godmother** (transformation only) = `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png`
  (dark curls, plum star-robe, silver wand). ⛔ NOT the winged/pink/glasses tarot portrait.
- **Regina George** = `assets/saints/y2k-stained-glass-v2/regina-george-y2k-stained-glass.png` (face only).
- **Elle Woods** = `assets/saints/y2k-stained-glass-v2/elle-woods-y2k-stained-glass.png` (face only).
- **Cher Horowitz** = `assets/saints/cher-horowitz.png` (face only — no stained-glass v2 exists for Cher).
- **Chutney Windham** = ⚠ **no approved face ref in repo.** Render fresh: a 2001 *Legally Blonde* witness, ~20s,
  **fresh tight blonde perm**, courtroom-nervous — **visibly a different woman from Elle** (do not reuse Elle's face).
- **Bethany Byrd** = ⚠ **no approved face ref in repo.** Render fresh: a 2004 *Mean Girls* high-schooler in a gym,
  ordinary, not a named saint likeness.
- **NewsStand on Main** (building) = `assets/sunnyvaile-buildings/y2k-v3/02-sunnyvaile-newsstand.webp`
  (the live served facade — match architecture + color).
- **BRONZE AiGE interior** (cocktail beat) = `assets/building-interiors/bronze-aige-interior.jpg`.
- **Verification Rulebook shelf** = ⚠ the page `grimoire/verification-rulebook.html` has **no bespoke art** (logo
  only) — render a fresh comic "rulebook" book/shelf inside the LIBRAiRY; do not invent a specific existing cover.
- Text/word-burst treatment = `operations/reference/font-and-text-emphasis/`; comic-page look =
  `operations/reference/comic-book-page-style/comicpage-01.webp`. Render all text **CRISP, spelled EXACTLY** as given.

**MUST-MATCH verbatim strings** (spell EXACTLY; enforce with `operations/check-episode.sh 3`):
1. `Do not be Chutney on the stand. Be Elle with the timeline.` → EMPH-chutney-elle
2. `A draft is an outfit. A claim is an alibi. Dress accordingly.` → EMPH-draft-outfit
3. `she doesn't even go here` → EMPH-doesnt-go-here — ⚠ narration **SHOUTS IT IN CAPS**
   (`SHE DOESN'T EVEN GO HERE!`); render the burst in CAPS (article uses lowercase — intentional).

---

# PART 1 — COLD OPEN (recurring front-matter + beats 1–3)

### P01 — PREVIOUSLY ON → `ep03-open-01-previously-strip-comic.png`
Horizontal **comic STRIP, 3 panels**, caption box `PREVIOUSLY ON LAiDIES`. Recap **Ep2 only** (verbatim
previously-hook: *"talking to AI isn't coding — it's delegation… briefing the machine like a smart new hire —
David Rose specific… got back something she'd actually send"*): panel 1 heroine typing three vague words and
hoping · panel 2 she briefs the machine like a smart new hire (David-Rose-specific) · panel 3 she gets back a
polished draft she'd actually send. Heroine CORPORATE (navy blazer). Locked caption-box style.

### P02 — THIS WEEK → `ep03-open-02-thisweek-teaser-comic.png`
Separate teaser strip/montage, caption `THIS WEEK` (verbatim on-this-episode hook: *"she gets an answer with
full Regina George confidence, almost uses it… then notices one tiny detail tugging at the corner of the
story"*): a glossy, over-confident AI paragraph — and one tiny thread pulling loose at its corner. Distinct
from P01. Icy-blue/silver Ep3 palette. Do NOT show Regina's face here (this is the *tone*, not her scene).

### P03 — TITLE CARD → `ep03-open-03-title-comic.png`
Comic **title card**: **THE BURN BOOK PROBLEM** (bold comic lettering) + "Episode Three", on a Y2K comic
ground — a shut pink Burn-Book notebook with translucent plastic tabs and cream receipts peeking out, icy-blue
+ silver. Title text CRISP. (Burn Book present but not carrying the whole frame.)

### P04 — WELCOME BACK → `ep03-open-04-welcome-back-comic.png`
Locked **welcome-back** frame — the host/heroine welcome ("smart, busy women… one Wednesday at a time…
SUNNYVAiLE"). Heroine CORPORATE here (pre-transform), branded composition. Nothing changes but her outfit-of-
the-week vibe.

---

## BEAT 1 · COLD OPEN — the tiny office miracle that lies *(canon beat 1)*

### S01 — THE MIRACLE → `ep03-scene-01-cold-open-desk-comic.png`
Heroine **CORPORATE** (navy blazer), Thursday afternoon at her desk; four days of messy meeting notes on one
side, and on the glowing monitor a clean, calm client update that appeared **nine seconds later** — structured,
"per our discussion," two clicks from Send. Her cursor hovers over the Send button. Screen-glow key light.
**Present → bright + saturated.** Correct hands (five fingers).
> **Motion:** push-in (build to the catch). **Frames (2):** `…-a-start` = wide desk, calm/pleased ·
> `…-b-end` = closer on her + the screen as her eye snags. **Hold** on `-b-end`.

### S01b — THE LIE, CAUGHT → `ep03-scene-01b-the-lie-caught-comic.png`
**Extreme close-up:** on the screen, one sentence highlighted — *"the client approved a July rollout"* — and her
eye catching it. She was IN that meeting; nobody approved anything. What was actually said: *"July could work,
if procurement clears by Friday."* Dutch/canted angle for the "something's wrong" jolt. Render the highlighted
line CRISP.
> **Motion:** state-change (the wrong line "lights up"). **Frames (2):** `…-a-start` = line plain in the
> paragraph · `…-b-end` = the line flagged/highlighted, her eyes narrowing.

### EMPH-lanyard → `ep03-emph-maybe-lanyard-comic.png`
**Emphasis burst** (cold-open quotable): **"The machine took a maybe… and gave it a lanyard."** Bold comic
lettering; a tiny conference lanyard clipped onto the word "maybe." Icy-blue/silver.

### The COMPARISON block *(canon `## comparison` — script renders it AS the cold open; three text cards)*

### COMPARE-01 — THE NOTES (input) → `ep03-compare-01-notes-input-comic.png`
**Text-only comic card**, a cream note/receipt pinned by a translucent plastic tab, header `THE NOTES`:
```
July could work if procurement clears by Friday.
Training might move to phase two.
Final approval: account owner to confirm.
```
Spell VERBATIM. Handwritten-memo feel, crisp.

### COMPARE-02 — THE FLAT WAY → `ep03-compare-02-flat-way-comic.png`
**Text card**, header `THE FLAT WAY` (tidy and wrong), a tiny lanyard on it:
```
The client approved a July rollout and asked us to remove the training module from scope.
```
Sub-burst: **"Tempting. Tidy. Wearing a lanyard."** Spell VERBATIM.

### COMPARE-03 — THE FLUENT WAY → `ep03-compare-03-fluent-way-comic.png`
**Text card**, header `THE FLUENT WAY` (the usable version):
```
We discussed a possible July rollout and a phased training approach. Approval is still pending. Confirm timeline and training scope with the account owner before updating the deck.
```
Sub-burst: **"Same useful structure. Less Chutney on the stand."** Spell VERBATIM. Warmer/clean vs COMPARE-02.

---

## BEAT 2 · I COULDN'T HELP BUT WONDER… *(canon beat 2 · recurring segment 5)*

### S02 — THE WONDER (close-up) → `ep03-scene-02-couldnt-help-but-wonder-comic.png`
Locked **CLOSE-UP of the heroine thinking** (the Carrie/contemplative beat). Heroine CORPORATE, screen-glow on
her face, tight reflective framing. The question hanging: *if a paragraph can sound that sure of itself —
"hair done, makeup done, 'per our discussion' and everything" — how do you catch the one line that's quietly,
completely wrong?* **Chutney-before-the-perm energy: confident, composed, one tiny detail from collapse.** Face
must read as HER.

---

## ✨ TRANSFORMATION — corporate → SUNNYVAiLE *(recurring segment 6; the bridge into town for beat 3)*

### T-SEQ — TRANSFORMATION SEQUENCE
> ⚠ **REWRITTEN by Ali 2026-07-19 — IGNORE the wand/FG description below. Use the AUTHORITATIVE spec `operations/codex-prompts/transformation-sequence-spec.md`:** ⛔ NO wand, NO FAiRY Godmother visible, NO in-town reveal — ABSTRACT 90s geometric STAGE. Frames `15p0` corporate start → `15p1–15p3` poof → `15p4` REVEAL (Ep3 = Regina "A Little Bit Dramatic" + 6 clips). Only the reveal is episode-specific. The lines below are superseded.
Reusable FAiRY-Godmother wand sequence (5 frames was too choppy — build it full):
- `05a` heroine **CORPORATE** (navy blazer) — start state
- `05b`–`05d` **FAiRY Godmother wand-motion in-betweens** (raise → arc → contact — ≥3 for smoothness); FG =
  `opening-05-fairy-godmother-rerender-lit-v2.png`, comic-rendered
- `05e`–`05f` **magic-effect building** (sparkle/POOF, multiple frames, vibrant Y2K icy-blue burst)
- `05g` **MID-TRANSFORMATION** frame (her form actually changing / outfit morphing — a real transition state)
- `05h`–`05i` **magic clearing** (effect dissipating)
- `05j` **REVEAL** — heroine in the **Ep3 SUNNYVAiLE look** (icy-blue Y2K outfit, one butterfly clip), hair =
  the locked **6-butterfly-clip half-up in waves**.
**Frames 05a–05i are SHARED across episodes (reuse the shell); only `05j` (the reveal) changes per episode.**
⚠ Lots of wand-motion + magic frames (Ali flagged too-few = choppy). ⚠ Reveal HAIR = locked heroine-kit hair,
NOT clips in a single vertical line.

---

## BEAT 3 · TO TOWN — the NewsStand on Main *(canon beat 3 · ⚠ SCRIPT-PRIMARY — the article reworks this framing)*

### S03 — THE NEWSSTAND → `ep03-scene-03-newsstand-comic.png`
Heroine (**SUNNYVAiLE look**) arriving at the **NewsStand on Main** on SUNNYVAiLE's Main Street, where the news
desk's whole job is *separating what happened from what just sounds like it did.* She holds up her too-confident
AI draft to the light of the news desk; the clerk/press energy interrogates every line. ⚠ **Architecture + color
MATCH the live facade `assets/sunnyvaile-buildings/y2k-v3/02-sunnyvaile-newsstand.webp`.** Brightest, most
saturated Y2K palette (present/town). Comic.

### EMPH-says-who → `ep03-emph-says-who-comic.png`
**Emphasis burst** over a mock front page held to the light: **"Says who? Based on what?"** + smaller line
**"Fact-check the front page before it runs under your byline."** Bold comic lettering, crisp.

---

# PART 2 — THE BURN BOOK & THE METHOD (beats 4–10)

## BEAT 4 · THE BURN BOOK PROBLEM → concept **Hallucination** *(canon beat 4)*

### S04-REGINA — REGINA & THE BURN BOOK → `ep03-scene-04-regina-burn-book-comic.png`
**Regina George**, full Burn-Book social authority — holding the pink Burn Book like a scepter, devastating
certainty, a rumor / a grudge / a wild guess / something fully unhinged all in the **same handwriting**. Face ref
`regina-george-y2k-stained-glass.png` (face only; comic-render the body/scene). ⚠ **The Burn Book is written BY
Regina — do NOT render AI as a person "spotting" or "deciding"; nothing in it is true.** Moodier lighting (memory
register) but in-palette. Low angle to make her socially towering.

### EMPH-same-handwriting → `ep03-emph-same-handwriting-comic.png` *(the episode's ONE full-page comic beat)*
**COMIC-PAGE / two-panel splash** (style-echo `comicpage-01.webp`): LEFT panel an **official court record**,
RIGHT panel a **Burn Book entry** — rendered in the **exact same handwriting**, indistinguishable. Caption box:
**"You can't tell which is which until you check."** The one big dramatic beat of the episode — spend the page here.

### CONCEPT-hallucination → `ep03-concept-hallucination-comic.png`
**Concept text-card:** **HALLUCINATION** + one line: *"when AI fills a gap with plausible-sounding language
instead of admitting it doesn't know."* Sub-note (cocktail framing): *"not lying — guessing."* Locked concept-card
treatment, crisp.

### EMPH-burn-book-problem → `ep03-emph-burn-book-problem-comic.png`
**Emphasis burst — the thesis:** **"Unsupported information can look just as finished as supported information."**
Biggest lettering in this section. Icy-blue/silver.

---

## BEAT 5 · BETHANY BYRD — the tiny sourcing disaster *(canon beat 5)*

### S05-BETHANY — ONE BOX, ONE VERDICT → `ep03-scene-05-bethany-byrd-comic.png`
**Bethany Byrd** (2004 *Mean Girls* high-schooler) in the school gym: the Burn Book claims she "must be lying"
based on **one box of super-jumbo tampons** → an enormous verdict; then the real, less-scandalous explanation
walks in (heavy flow). One data point → no context → enormous conclusion. ⚠ **No approved face ref — render fresh,
ordinary high-schooler**, NOT a named-saint likeness. Moodier-memory register, in-palette.

### EMPH-claires-headband → `ep03-emph-claires-headband-comic.png`
**Emphasis burst** (quotable): **"A clue in a Claire's headband, sprinting directly to a conclusion."** A little
plastic Claire's-style butterfly-clip/headband motif mid-sprint. Bold comic lettering.

---

## BEAT 6 · CAN I USE AI? YES *(canon beat 6)*

### EMPH-churn-butter → `ep03-emph-churn-butter-comic.png`
**Emphasis text-card:** **"We are not here to churn butter by candlelight."** Sub-line: *"The real question:
which parts is it just drafting — and which parts are claims that need receipts before they borrow your name?"*
A tiny wink to an abandoned butter churn. Confident, bright (present/permission beat).

---

## BEAT 7 · SHE DOESN'T EVEN GO HERE → concept **Assumption / relevance** *(canon beat 7)*

### S07 — SHE DOESN'T EVEN GO HERE → `ep03-scene-07-doesnt-go-here-comic.png`
Heroine has pulled a **blue hoodie + oversized sunglasses** on over her SUNNYVAiLE look (Damian homage), standing
up in the back row of a gym assembly, mouth open mid-shout — the quality-control interrupt. ⚠ Keep it the HEROINE
doing Damian's move (canon: *"you stand up in the back… and yell"*), not a separate Damian portrait. Comic,
energetic, present-bright.

### EMPH-doesnt-go-here → `ep03-emph-doesnt-go-here-comic.png` *(MUST-MATCH #3)*
**Emphasis burst, ALL CAPS:** **SHE DOESN'T EVEN GO HERE!** — jagged shout balloon. ⚠ Narration shouts it in caps;
render CAPS. Spell EXACTLY.

### CONCEPT-assumption → `ep03-concept-assumption-comic.png`
**Concept text-card:** **ASSUMPTION** + one line: *"what AI quietly infers and states as fact — 'we discussed it'
→ 'approved'; 'phase two' → 'remove from scope.'"* Sub-note: *"the relevance check: right-sounding info that
doesn't match your actual company / customer / date / decision."* Crisp.

### S07b — THE WRONG ROOM (examples) → `ep03-scene-07b-wrong-room-comic.png`
**Montage, 3–4 small panels** — "real information in the wrong place": a **U.S. HR answer in a Canadian
workplace** · **last year's pricing page "wearing this year's lip gloss"** · **"we talked about it" promoted to
"we decided"** · **a policy answer technically true except the exception is the part that matters.** Each a quick
in-world panel, crisp labels. Present palette.
> **Motion:** montage (compress). **Frames (4):** one per example above.

### EMPH-fake-citation → `ep03-emph-fake-citation-comic.png`
**Emphasis burst:** **"Cited with the confidence of 'my boyfriend goes to another school.'"** A citation link that
**goes nowhere** (a dead link dressed up to pass). Bold comic lettering, crisp.

---

## BEAT 8 · ELLE WOODS WOULD LIKE TO SEE THE FILE → concept **Verification** *(canon beat 8)*
> ⚠ TWO named people here — **Elle** and **Chutney** — so they get **two separate scenes** (never one group image).

### S08-ELLE — ELLE WITH THE FILE → `ep03-scene-08-elle-file-comic.png`
**Elle Woods**, courtroom, **low-angle / powerful**, holding the case file and the timeline — not asking whether
the witness can repeat herself, but *waiting for the detail that doesn't fit.* Poised, sharp, in charge. Face ref
`elle-woods-y2k-stained-glass.png` (face only; comic-render body/scene). Courtroom = moodier register, in-palette,
warm key on Elle.

### S08b-CHUTNEY — CHUTNEY ON THE STAND → `ep03-scene-08b-chutney-stand-comic.png`
**Chutney Windham** on the witness stand, **fresh tight blonde perm**, repeating her alibi (*"in the shower right
after getting a perm"*) while the room rolls its eyes — one tiny detail (you don't wash a fresh perm) from
collapse. ⚠ **No approved face ref — render fresh, visibly a DIFFERENT woman from Elle** (younger, nervous, perm).
High angle on Chutney (small/vulnerable). Moodier, in-palette.

### CONCEPT-verification → `ep03-concept-verification-comic.png`
**Concept text-card:** **VERIFICATION** + one line: *"checking a claim against something outside the same chat —
a source, date, quote, number, domain rule, or human owner."* Below it the **pattern strip**:
`CLAIM (in the shower) · TIMELINE (right after a perm) · DOMAIN KNOWLEDGE (you don't wash a fresh perm) ·
CONTRADICTION (story collapses) · RECEIPTS (Elle has the file + the timing).` Crisp.

### EMPH-chutney-elle → `ep03-emph-chutney-elle-comic.png` *(MUST-MATCH #1)*
**Emphasis burst:** **"Do not be Chutney on the stand. Be Elle with the timeline."** Biggest lettering. Spell EXACTLY.

---

## BEAT 9 · CHER'S CLOSET — sort into three piles → **Draft / Claim / Receipt** *(canon beat 9)*

### S09-CHER — THE CLOSET COMPUTER → `ep03-scene-09-chers-closet-comic.png`
**Cher Horowitz** at the Clueless rotating-closet computer, matching pieces — *the closet knows the pieces; it
doesn't know the situation you're walking into.* Face ref `assets/saints/cher-horowitz.png` (face only; comic
scene). Bright Y2K present palette, plaid/pastel wardrobe energy.

### CONCEPT-draft → `ep03-concept-draft-comic.png`
**Concept card:** **DRAFT** + *"wording, structure, brainstorm, summary, checklist — can be fast."* Tagline
**"A draft is an outfit."** A hanging outfit motif. Crisp.

### CONCEPT-claim → `ep03-concept-claim-comic.png`
**Concept card:** **CLAIM** + *"names, dates, numbers, quotes, sources, legal/HR/privacy/security/finance,
customer commitments, policy interpretation — needs checking."* Tagline **"A claim is an alibi."** Crisp.

### CONCEPT-receipt → `ep03-concept-receipt-comic.png`
**Concept card:** **RECEIPT** + *"the thing you can open, name, date, quote, or point to."* Tagline **"Receipts
are what keep you off the stand."** A cream paper receipt motif. Crisp.

### EMPH-draft-outfit → `ep03-emph-draft-outfit-comic.png` *(MUST-MATCH #2)*
**Emphasis burst:** **"A draft is an outfit. A claim is an alibi. Dress accordingly."** Spell EXACTLY. Big lettering.

---

## BEAT 10 · YOU'RE ELLE, THE MACHINE IS THE LAW CLERK *(canon beat 10 · ⚠ SCRIPT-ONLY warm beat)*

### S10 — THE LAW CLERK → `ep03-scene-10-law-clerk-comic.png`
Heroine as the **Elle-style attorney** at a law-library desk; **the machine = the law clerk** that spent the
weekend in the library and drafted the brief — she still reads it, still checks the citations, still walks in and
owns it. ⚠ Render the machine as a *tool/terminal handing over a brief*, NOT a personified woman. Warm, collegial.
⚠ **SCRIPT-ONLY** beat (in the audio, not necessarily the article) — include for the video.

### EMPH-judgment-stayed-yours → `ep03-emph-judgment-stayed-yours-comic.png`
**Emphasis burst:** **"The grunt work got done for you. The judgment stayed yours."** Bold comic lettering.

---

# PART 3 — RECEIPTS, THE METHOD & CLOSE (beats 11–15)

## BEAT 11 · CHUTNEY CAN SAY IT THRICE → **facts** *(canon beat 11)*

### EMPH-peer-reviewed → `ep03-emph-peer-reviewed-comic.png`
**Emphasis text-card** (quotable): **"Asking AI 'are you sure?' is like asking Regina George whether the Burn Book
is peer reviewed. Bold choice. Limited value."** (Regina motif — the closed Burn Book stamped, absurdly, "PEER
REVIEWED"; do NOT re-show Regina's full face-scene here, this is the line.) Spell EXACTLY.

### S11-thrice — CHUTNEY ×3 (montage) → `ep03-scene-11-chutney-thrice-montage-comic.png`
**MONTAGE, 3 panels:** Chutney on the stand giving the **same alibi three times**, identical each panel — re-asking
and getting the same answer back isn't verification, it's the witness repeating herself. Same Chutney face as
S08b (fresh perm). ⚠ still a DIFFERENT woman from Elle.
> **Motion:** montage (repetition). **Frames (3):** near-identical panels — same pose, same words, room wearier
> each time.

### FACT-kpmg → `ep03-fact-kpmg-comic.png`
**Fact / receipts-drawer text-card** + emphasis: **"Big Four. Tiny receipt drawer."** Body: *KPMG pulled an AI
report after a source check found **40 of its 45 citations fabricated.*** ⚠ NOT a general KPMG-failure stat — one
specific report (the Oct-2025 "Total Experience" study, pulled ~June 2026). Crisp; a fat report with a tiny
receipt drawer motif.

### FACT-nature → `ep03-fact-nature-comic.png`
**Fact text-card:** *A 2026 **Nature** paper names WHY models hallucinate — accuracy-based grading rewards a
confident guess over an honest "I don't know," so they guess.* Framing: an **evaluation-incentive** problem, not a
raw error rate. Crisp.

### FACT-stanford-index → `ep03-fact-stanford-index-comic.png`
**Fact text-card:** *Stanford's **2026 AI Index**: tell a top model something false you seem to believe, and it
will often just agree with you.* ⚠ This is **sycophancy** (belief-framing), **NOT** a generic "how often it makes
things up" rate. Crisp — a model nodding along to a user's false statement.

### FACT-legal-rag → `ep03-fact-legal-rag-comic.png`
**Fact text-card:** *Source-connected legal AI (retrieval/RAG) was **less** prone to hallucination than GPT-4 in a
Stanford test — but **still produced misleading or false information.** "Grounded ≠ perfect."* Crisp.

### EMPH-sources-attached → `ep03-emph-sources-attached-comic.png`
**Emphasis burst:** **"'Sources attached' is not 'sources checked.'"** Bold comic lettering; a paperclip of
"sources" next to an unopened receipt drawer.

---

## BEAT 12 · DAVID, MEET ELLE — PROMPT LIKE ELLE → **try_on** *(canon beat 12)*

### S12 — THE VERIFICATION RULEBOOK SHELF → `ep03-scene-12-prompt-like-elle-comic.png`
Heroine (SUNNYVAiLE look) at the **LIBRAiRY**, pulling the **Verification Rulebook** off the shelf — the serious
guidance (OpenAI, Anthropic, Google, Stanford) all points the same way: **three moves + one rule.** ⚠ No bespoke
rulebook cover exists — render a fresh comic book/shelf; don't invent a real cover. Warm LIBRAiRY, in-palette.

### METHOD-move1 → `ep03-method-move1-comic.png`
**Method text-card:** **MOVE ONE · GIVE HER THE SOURCE** — *"paste the document / policy / this year's pricing;
turn on search when freshness matters; then: answer only from what I gave you."* Crisp.

### METHOD-move2 → `ep03-method-move2-comic.png`
**Method text-card:** **MOVE TWO · LET IT SAY "I DON'T KNOW"** — *"if it's not in there, say so; don't guess to be
helpful; mark anything you inferred."* Crisp. (⚠ "let it say," keep AI an "it.")

### METHOD-move3 → `ep03-method-move3-comic.png`
**Method text-card:** **MOVE THREE · MAKE IT SHOW THE LINE** — *"quote the exact sentence you relied on."* Crisp.

### METHOD-rule → `ep03-method-rule-comic.png`
**Method text-card — the rule over all three:** **NO INVENTED RECEIPTS** — *"no made-up links, dates, quotes,
numbers, policies, or certainty; mark a missing one `[needs receipt]`."* Below, smaller: *"ask for a claim table ·
make the second check independent · then still check."* Crisp.

---

## BEAT 13 · THE COCKTAIL-PARTY EXPLANATION *(canon beat 13 · recurring segment 10)*

### COCKTAIL → `ep03-cocktail-comic.png`
Locked **cocktail text-card**, BRONZE AiGE motif (interior ref `assets/building-interiors/bronze-aige-interior.jpg`):
the say-it-at-happy-hour line — **"It's not lying. Lying takes intent. It's guessing. When it doesn't know, it
reaches for the most plausible-sounding thing and says it with its whole chest — your most confident friend. The
fix was never to catch her in a lie; it's to ask for the receipt before you repeat her in a meeting."** Warm
cocktail-bar glow, a martini + a receipt. Render the line crisp (condense onto the card if long; keep the "most
confident friend" + "ask for the receipt before you repeat her" beats).

---

## BEAT 14 · THE TRY-ON / RECEIPTS PASS *(canon beat 14)*

### S14 — THE RECEIPTS PASS → `ep03-scene-14-receipts-pass-comic.png`
Heroine (SUNNYVAiLE look) at her desk running the **10-minute Receipts Pass** (not homework): one real AI answer
(a meeting recap / a summary of a public page / a draft reply), verifying **three claims** before it borrows her
name — three cream receipts pinned with translucent tabs, a magnifying glass. Bright present palette, capable and
calm.

### TRYON-rule → `ep03-tryon-rule-comic.png`
**"This Week's Rule" text-card:** **I can use the draft. I still check the alibi.** Locked rule-block treatment,
crisp. (Also the main-character-energy line.)

---

## BEAT 15 · SIGN-OFF *(canon beat 15 · recurring segment 11)*

### SIGNOFF → `ep03-signoff-comic.png`
Locked **sign-off emphasis frame** (biggest lettering): **"AI can write like Regina George. You still need to
check like Elle Woods."** + the locked tag **"See you next Wednesday… in SUNNYVAiLE."** Heroine (SUNNYVAiLE look)
in-frame or small; icy-blue/silver + gold. Spell the remember line EXACTLY.

---

## NEXT WEEK ON *(recurring segment 12)*

### P-NEXT → `ep03-open-06-nextweek-comic.png`
Teaser strip + caption `NEXT WEEK ON LAiDIES` — Ep4 **The Founding Mothers** (verbatim next-time hook: *"she's
been using this thing every day and never once asked where it came from… goes looking for the origin story… and
finds out it was women all along. Episode Four: The Founding Mothers."*): silhouettes of the founding women across
eras + a hint of Ada Lovelace / "it was women all along." (Bonus-quiz tie-in: the science is *almost two hundred
years old* — math started 1843.) Distinct from P01/P02.

---

## After the images land (Claude does these — NOT part of this image batch)
1. Swap fresh comic frames into the written article (`issues/issue-03-reskin.html` — the reskin, NOT the stale
   served `issues/issue-03.html`) + `content/issues/issue-03.md`, replacing the pixel/old section posters.
2. Video = Codex assembles keyframes + `operations/audio/episode-03-elevenlabs-v3-tagged.txt` narration master
   (CapCut); motion per `operations/comic-animation-frame-spec.md`, transitions per
   `operations/episode-comic-grammar.md` (scene-to-scene + caption for the town/courtroom jumps; page-turn for the
   Burn-Book memory; montage for S07b/S11-thrice; push-in for S01/S01b).
3. **QC each on delivery:** recipe (no halftone dots, not pixel/plasticy), hands where shown, **text spelled
   EXACTLY** (esp. the 3 MUST-MATCH lines + the fact cards' scope caveats), heroine hair = 6-clip half-up,
   Chutney ≠ Elle, Bethany = fresh ordinary face, AI never personified as a woman who "spots/decides,"
   NewsStand facade matches the y2k-v3 ref. Then run `operations/check-episode.sh 3`.
