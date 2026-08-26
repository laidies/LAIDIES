# EPISODE 1 — "On Wednesdays We Do AI" · MASTER COMIC IMAGE-PROMPT BATCH (Codex-ready)

> Built beat-by-beat from `content/episodes/episode-01.canon.md` (`## narrative`, 16 beats). Images only — this doc is handed straight to Codex to GENERATE. Do not edit the episode here; fix the canon first, then rebuild this.
>
> **FOR CODEX:** ✅ GENERATE every image below, top→bottom. **Output dir:** `assets/episodes/ep-01/comic/` · filenames exactly as given (`ep01-…-comic.png`). Images only — no HTML/CSS/git.
> Style/format authorities applied: `operations/episode-comic-grammar.md` (4 formats + transitions), `operations/episode-recurring-segments.md` (locked show-format shells), `operations/comic-animation-frame-spec.md` (frame sequences + counts), `operations/reference/comic-storytelling/README.md` (McCloud/Eisner grammar).
> Build date basis: canon reverse-extracted 2026-07-13; style lock "Timnit set" approved 2026-07-19.

---

## 1 · COVERAGE CHECKLIST (how the human verifies nothing was dropped)

### A. Every canon narrative beat → scene id(s)

| Beat | One-line (canon) | Scene id(s) | Format | Note |
|---|---|---|---|---|
| 1 | Steve gets the standing ovation (4:52 Tuesday; her footnoted draft still in drafts) | `S04-steve-ovation`, `S05-couldnt-help-wonder` | full scene + close-up | S05 = recurring "I couldn't help but wonder" beat |
| 2 | The on-ramp was terrible — fleece-vest men / "AI is transformative!"; Miranda Priestly / unpublished Harry Potter manuscript | `S06-fleece-vest-onramp`, `S06b-groundbreaking`, `S07-miranda-priestly`, `S07b-personal-cost` | full scene + emphasis + full scene + emphasis | S06b ⚠ NARRATION-ONLY aside ("Groundbreaking.") |
| 3 | Not a confidence problem — a physics problem; the invisible load; "usually not named Steve" | `S08-invisible-load`, `S08b-physics-problem` | full scene + emphasis | — |
| 4 | The adoption gap — for every 100 men, only 78 women | `S09-100-vs-78` | text/stat card | ⚠ stat beat (see facts[] PENDING flags) |
| 5 | The uncomfortable specifics — encouraged/praised vs "cutting corners" | `S10-encouraged-vs-corners`, `S10b-pattern-recognition` | full scene + emphasis | — |
| 6 | The gap compounds into a canyon; Dolly says it plain | `S11-canyon-montage`, `S12-dolly-parton` | montage + full scene (own icon) | — |
| 7 | Fei-Fei Li — "Godmother of AI"; tools learn from a skewed pool | `S13-fei-fei-li` | full scene (own icon) | MUST-MATCH prefix; "the world calls her" caveat |
| 8 | The flip — senior women lead male peers by 14 pts (BCG); a career's worth of judgment | `S14-the-flip-14pts` | full-page comic + stat | BCG = the verified adoption stat |
| 9 | The first tiny win — Blend & Snap, avoided email, draft in 9 sec, "Oh. I can do this." | `S15-transformation` (seq), `S16-blend-snap-arrival`, `S17-blend-snap-win`, `S17b-i-can-do-this` | transformation seq + establishing + full scene + emphasis | Transformation = corporate→SUNNYVAiLE device |
| 10 | The cocktail-party explanation — "most talented new hire you'll ever manage" | `S18-cocktail-card`, `S19-new-hire` | cocktail card + full scene | S18 = recurring COCKTAIL shell |
| 11 | Under the hood — prediction word by word; ChatGPT/Claude/Gemini | `S20-under-the-hood` | full scene + text | — |
| 12 | Limit one — context; Cher's closet computer (Clueless) | `S21-cher-closet` | full scene (own icon) | "handing context over = next week's episode" caption |
| 13 | Limit two — hallucination; the Burn Book (Mean Girls); "Made out with a hot dog"; Regina George energy | `S22-burn-book-regina`, `S22b-regina-energy` | full scene (own icon) + emphasis | 2× MUST-MATCH strings |
| 14 | Three words so you don't pull a Cher — Generative AI / Model / Hallucination; "cool mom" aside | `S23-genai-card`, `S24-model-card`, `S25-hallucination-card`, `S26-rsvp-cher`, `S27-cool-mom` | 3 concept cards + 2 emphasis | S23 also = Carrie Bradshaw icon scene; S26 & S27 ⚠ NARRATION-ONLY asides |
| 15 | The try-on — same task in all three; "the twenty percent only you can see" | `S28-try-on`, `S28b-ksvl-hooks` | full scene + emphasis | MUST-MATCH string; S28b ⚠ NARRATION-ONLY (KSVL callout) |
| 16 | Remember, ladies — "cup of ambition"; small sips; post in Rooms; trailblazers not idea thieves | `S29-sign-off`, `S30-rooms-trailblazers` | sign-off frame + card | S29 = recurring SIGN-OFF shell |

### B. Recurring show-format segments (locked shells — same every episode)

| Segment | Scene id | Present? |
|---|---|---|
| PREVIOUSLY ON | `S00-previously` | ✅ (pilot variant — "there is no previously") |
| THIS WEEK | `S01-this-week` | ✅ |
| TITLE CARD | `S02-title` | ✅ |
| WELCOME BACK TO LADIES | `S03-welcome` | ✅ |
| I COULDN'T HELP BUT WONDER | `S05-couldnt-help-wonder` | ✅ (folded into beat 1) |
| ✨ TRANSFORMATION | `S15-transformation` | ✅ (episode goes to town at beat 9) |
| CONCEPT CARDS | `S23/S24/S25` | ✅ |
| EMPHASIS BURSTS | `S06b/S08b/S10b/S17b/S22b/S26/S27/S28b` | ✅ |
| COMIC-BOOK PAGE | `S14-the-flip-14pts` | ✅ (the ep's one full page) |
| COCKTAIL PARTY | `S18-cocktail-card` | ✅ |
| SIGN-OFF / "remember, ladies" | `S29-sign-off` | ✅ |
| NEXT WEEK ON | `S31-next-week` | ✅ (Ep2 "Tell Me What You Want" / David Rose) |

### C. Every named person / pop-culture icon → her own scene (Hard Rule 2)

| Named in canon | Where in canon | Own scene | Face ref |
|---|---|---|---|
| **Steve** (the visionary who stopped doing it the hard way) | beats 1, 3 | `S04-steve-ovation` | none — generic male exec (see note) |
| **Miranda Priestly** (Devil Wears Prada) | beat 2 | `S07-miranda-priestly` | `assets/saints/y2k-stained-glass-v2/miranda-priestly-y2k-stained-glass.png` |
| **Dolly Parton** | beat 6 | `S12-dolly-parton` | `assets/saints/y2k-stained-glass-v2/dolly-parton-y2k-stained-glass.png` |
| **Fei-Fei Li** | beat 7 | `S13-fei-fei-li` | `assets/mavens/y2k-stained-glass-v2/fei-fei-li-y2k-stained-glass.png` |
| **Cher Horowitz** (Clueless) | beats 12, 14 aside | `S21-cher-closet` (+ `S26`) | `assets/saints/y2k-stained-glass-v2/cher-horowitz-y2k-stained-glass.png` |
| **Regina George** (Mean Girls / Burn Book) | beat 13 | `S22-burn-book-regina` | `assets/saints/y2k-stained-glass-v2/regina-george-cautionary-red-y2k-stained-glass.png` |
| **Carrie Bradshaw** (Sex and the City) | beat 14 (Generative AI analogy) | `S23-genai-card` | ⚠ NO approved asset — see PENDING below |
| **David Rose** (Ep2 patron saint) | next-time hook | `S31-next-week` | `assets/saints/y2k-stained-glass-v2/david-rose-y2k-stained-glass.png` |
| ~~Samantha Jones~~ | **meta patron-saint ensemble ONLY (line 21); NOT in any narrative beat** | — no scene (correct) | n/a |
| ~~Elle Woods~~ | **meta patron-saint ensemble ONLY (line 21); NOT in any narrative beat** | — no scene (correct) | n/a |

**⚠ PENDING — Carrie Bradshaw face ref:** no approved `carrie-bradshaw-*` asset exists in `assets/saints/` (grep confirmed 2026-07-19; only her *name* appears in `assets/video/episode-01-production-cues*`). For `S23` render Carrie generically (a late-'90s NYC newspaper columnist at a laptop, tulle skirt + heels, apartment window) and DO NOT invent a likeness. Flag to Ali to commission a `carrie-bradshaw-y2k-stained-glass` face ref, then re-render `S23` with it.

**Note — Steve:** deliberately a generic, faceless-energy male exec (fleece-vest/quarter-zip, the "not-smarter-just-stopped-doing-it-the-hard-way" archetype). No approved asset; he is a type, not a likeness. Keep him consistent across `S04` and the "usually not named Steve" caption in `S08`.

---

## 2 · GLOBAL STYLE HEADER (paste the intent of this into every prompt)

### ⚠ HARD GUARDRAILS — apply to EVERY prompt (Ali 2026-07-19, from Ep1/Ep2 failures)
1. **TWO WORLDS STAY SEPARATE — the outfit MUST match the location (Ali 2026-07-19).** (a) **Corporate look** = navy suit / professional 90s hair / **NO butterfly clips** = **CORPORATE-LAND ONLY** (her work desk, office, city — the "before"). (b) **SUNNYVAiLE look** = the week's 90s/Y2K iconic outfit + **6-butterfly-clip half-up hair** = **IN SUNNYVAiLE ONLY** (the town / Main Street / buildings). ⛔ **NEVER MIX:** no Y2K outfit or butterfly clips in a corporate setting; no corporate suit in SUNNYVAiLE; no corporate-land inside SUNNYVAiLE. If she's in a 90s/Y2K outfit she IS in SUNNYVAiLE; if she's in the suit she is NOT. The **transformation** is the ONLY bridge between the two worlds.
2. **STYLE REFS = TREATMENT ONLY — NEVER their PEOPLE.** The style-lock refs supply LINE / INK / SHADOW-PLANES / COLOR only. ⛔ Do NOT reproduce, echo, or make ANY character resemble the PEOPLE in those refs (Timnit, Joy, Emily, Kate, Hedy, etc.). Every incidental / background / crowd figure = ORIGINAL + invented — nobody who looks like a ref person.
3. **EVERY character has a COMPLETE, WELL-FORMED FACE.** No faceless / blank / smeared / missing-face figures — named characters especially (a "Steve with no face" shipped in Ep1). Clear eyes/nose/mouth + correct anatomy on every person in frame.
4. **POPULATED TOWN SCENES = the BUILDING'S CANONICAL KEEPER — never a random person.** If a scene is set in a SUNNYVAiLE building that has a keeper, the person shown IS that keeper (likeness from their portrait, rendered in the episode's comic style) — do NOT invent a random barista/clerk/bartender/host for a named place. **KEEPER → portrait:** Blend & Snap → **JoJo** `assets/town-characters/scenes/jojo-scene.png` · Town Hall → **Mayor Deb** `assets/town-characters/scenes/mayor-deb-scene.png` · KSVL → **DJ SunnyV** `assets/episodes/ep-04/pixel/ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png` · Post Office → **Penny** `assets/town-characters/scenes/penny-scene.png` · BRONZE AiGE → **Cosmo** `assets/town-characters/scenes/cosmo-scene.png` · Chick Flicks → **Becky** `assets/town-characters/scenes/becky-scene.png` · Delta LAi Nu → **June** `assets/town-characters/scenes/june-scene.png` · MAiKEOVER → **Paulette** `assets/town-characters/scenes/paulette-scene.png` · NewsStand → **Paige** `assets/town-characters/scenes/paige-scene.png` · LIBRAiRY → **Miss Jeeves** `assets/video/delivery-20260714-opening-v6/shots/_miss-jeeves-approved-reference.png` · Mme CLAi-O shop → **Mme CLAi-O** `assets/building-interiors/mme-claio-reading-room.jpg` · FAiRY Godmother house → **the FG** `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` · LUMINAiRY → **Matron Lumen** `assets/town-characters/scenes/matron-lumen-scene.png`. Background CROWD (not a keeper's building) = original Y2K women (per guardrail 2, no ref-lookalikes).
5. **CHECK FOR DRIFT before finalizing EVERY image — regenerate if it fails. (Drift is a problem EVERYWHERE — this check is not optional.)** (a) Every character's FACE/likeness matches their LOCKED reference and reads as THAT person (heroine, icons, keepers) — no wrong/drifted face. (b) **⛔ NO smooth glamour-cartoon construction. The generated image MUST match the graphic-novel style examples and use REALISTIC FACIAL ANATOMY, BOLD INKED COMIC CONTOUR LINES (confident graphic-novel ink line with some weight variation — NOT smooth even vector lines, but ⛔ NOT painterly / brush-painted / watercolor either), and LARGE SCULPTURAL SHADOW SHAPES (the hard angular planes).** ⛔ NOT clean-vector / plasticy / smooth-3D / pretty-cartoon / plain-flat illustration. Faces + style drift the most — check BOTH, every image.
6. **ALL on-image text = COMIC-BOOK LETTERING, never a plain text box.** Text-only frames, emphasis bursts, concept cards, captions, and any words on a scene must be **bold dynamic comic lettering** (word-burst / hand-inked / integrated into a burst, banner, or caption box with comic energy) — ⛔ NOT plain typed text sitting in a plain rectangle. Ref: `operations/reference/font-and-text-emphasis/`.
7. **SUNNYVAiLE = period-Y2K TECH ONLY — no modern electronics.** In any SUNNYVAiLE scene: a laptop = a colorful **iBook G3 clamshell**; a desktop computer = an **older CRT monitor** (beige/bubble, NOT a flat-screen); a cell phone = a **Motorola RAZR flip phone**. ⛔ No MacBooks, flat-screen monitors, smartphones/iPhones, or any modern device in town. (Corporate-land keeps present-day tech — that contrast reinforces guardrail #1.)

**LOCKED COMIC REGISTER = the "Timnit style lock" set (Ali-approved 2026-07-19).** Use these as STYLE / treatment refs ONLY — never their faces:
- ⭐ `assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` (THE anchor)
- `assets/episodes/ep-04/pixel/ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png`

**LOCKED — SCENES WITHOUT PEOPLE (establishing / time-jump / environment plates), Ali-approved 2026-07-19** — use for any no-people beat (establishing shots, building/room plates); people beats → the Timnit set above:
- `assets/episodes/ep-04/pixel/ep04-tj-hedy-comic-v2-timnit-style-lock-exact-caption-1920.png` (HOLLYWOOD 1942 set)
- `assets/episodes/ep-04/pixel/ep04-tj-karen-comic-v2-timnit-style-lock-exact-caption-1920.png` (CAMBRIDGE 1972 study)
- `assets/episodes/ep-04/pixel/ep04-tj-eniac-comic-v1-exact-caption-1920.png` (PHILADELPHIA 1945 hall)
- ⚠ **Take the ILLUSTRATION STYLE from these (line/ink/hard shadow-planes = the lock) — but they read DARK because they're from Ep4 (the dark-themed episode). Ep1 is BRIGHT/present-day: keep the illustration style, push the COLOR bright + vibrant per this episode's palette above. Do NOT copy their darkness.**

**Recipe:** bold black ink outlines, HARD angular grey shadow PLANES, clean flat color. ⛔ NO halftone dots, NOT pixel, NOT plasticy, NOT pop-art poster, NOT tarot. 🎨 VIBRANT + 90s/Y2K palette (pinks/teals/blues + plum #4b2148 / gold / cream), saturated — NOT pastel, NOT muted/dusty. **16:9, ≥1920px wide.** Present/town beats = brightest & most saturated; any flashback/history/"serious-stat" beat = moodier & cooler by intent (palette still in-family, never washed out).

**HEROINE kit (face/look ref — match, never restyle):**
- `assets/episodes/ep-04/pixel/ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-suit-flat-color-only-1920.png`
- `assets/episodes/ep-04/pixel/ep04-heroine-turnaround-sheet-clueless-v1-v28-locked-1920.png`
- `assets/episodes/ep-04/pixel/ep04-heroine-expression-sheet-v2-graphic-novel-register-v28-locked-1920.png`
- **CORPORATE look** (pre-transformation, beats 1–8): navy blazer / office register.
- **SUNNYVAiLE look** (beats 9–16, post-transformation): Ep1's iconic Y2K weekly outfit — see LOCKED below.
- **HAIR (all looks):** the locked heroine hair — half-up in waves, 3 sections each side / 6 butterfly clips (NOT clips in a single vertical line).

**✅ EP1 SUNNYVAiLE OUTFIT — LOCKED (Ali 2026-07-19): CARRIE BRADSHAW / Sex and the City — her iconic opening-titles TUTU look** — a white/cream tulle **ballerina tutu skirt** + a fitted tank/bodysuit (pale pink or nude) + a delicate gold necklace. ⛔ **NO "Carrie" nameplate necklace — she is the HEROINE, not Carrie; the outfit is a homage, never a name-label.** Playful, peak-Y2K, instantly recognizable. Fits Ep1 (Generative AI = "a Carrie Bradshaw in your laptop"). Heroine wears the OUTFIT only — Ali's face + the locked 90s hair, never Carrie's face. No wardrobe-ref file exists yet → render from this description; add a wardrobe ref later. This is the ONE per-episode variable in the transformation reveal; keep it identical across all beat 9–16 heroine scenes.

**TRANSFORMATION device (corporate → SUNNYVAiLE):** ⚠ **REWRITTEN by Ali 2026-07-19 — the AUTHORITATIVE spec is `operations/codex-prompts/transformation-sequence-spec.md`. ⛔ NO wand, NO FAiRY Godmother visible, NO in-town reveal.** It's a reusable ~5-frame POOF sequence on an ABSTRACT 90s geometric STAGE (teal/cyan spotlight + magenta/plum panels + gold trim + glossy floor): `15p0` corporate start → `15p1–15p3` poof builds/covers/clears → `15p4` reveal. Frames 15p0–15p3 SHARED across episodes; only the REVEAL (`15p4` = Ep1 Carrie-tutu, no nameplate) is episode-specific. This SUPERSEDES any wand / FG / in-town description in the transformation beat below.

**ICON face-ref rule:** for every named icon, pull the FACE from her stained-glass PNG (listed in Coverage §C) but render her in the Timnit comic register above — translate the likeness into flat-color comic ink; do NOT reproduce the stained-glass texture.

**SETTING refs (composition only — re-render in comic register, do not copy the old art style):**
- Corporate office / conference room: `assets/video/episode-01-full-scene-replacements-v1/ep01-miranda-office-full-scene-v1.png`
- Blend & Snap exterior: **OPEN — do not use** the deleted cottage-core `assets/sunnyvaile-buildings/y2k-v3/08-blend-and-snap.png`; it had the wrong SUNNYVAiLE colours and no longer has visual authority.
- Blend & Snap interior (✅ NEW canonical, Ali 2026-07-19): `assets/town-characters/scenes/jojo-scene.png` — magenta tile walls, Memphis geometric wall art, glass pastry/donut case, espresso machine + rows of teal/magenta/cream heart mugs, speckled navy counter with magenta edge, Town Hall clock tower + jacaranda blooms through the window. **Supersedes the old `blend-snap-cafe.jpg`.** JoJo (barista) is in this ref → take the ROOM; render the HEROINE as the subject, JoJo optional/background. Corkboard detail `assets/sunnyvaile-interiors/blend-snap-corkboard.png`.
- SUNNYVAiLE Main Street establishing: `assets/sunnyvaile-streets/main-street-golden.png`

**MUST-MATCH strings (verbatim, canon lines 174–177 — render these exactly where flagged):**
- `If we don't get women involved in AI, we're going to have a future` (S13)
- `Made out with a hot dog` (S22)
- `Regina George energy` (S22b)
- `twenty percent only you can see` (S28)

---

## 3 · THE IMAGES (narration order)

> Per beat: **who/what · setting · mood · face ref · style ref · FORMAT · (motion + frame sequence + image count if animated).** All inherit the GLOBAL STYLE header. Filenames: `ep01-<slug>-comic.png`; frame sequences use `-a-start / -b-mid / -c-end`.

---

### RECURRING OPEN

## SCENE: S00-previously
**File:** `ep01-previously-comic.png`
**Format:** TEXT-ONLY card (recurring PREVIOUSLY ON shell — pilot variant). **Static hold, 1 image.**
**Prompt:** Locked "PREVIOUSLY ON LAiDIES" caption box across the top in bold comic lettering. Because this is the pilot, the panel underneath is a single quiet aspect-to-aspect frame of the heroine (CORPORATE navy blazer, heroine kit face/hair) at her desk at dusk, laptop closed, a "ready to send?" draft glowing — and a hand-lettered caption reading **"There is no previously. This is the part where she stops waiting for a free weekend."** Cream/plum caption boxes, saturated Y2K palette. Face ref: heroine kit. Style ref: Timnit anchor set.

## SCENE: S01-this-week
**File:** `ep01-this-week-comic.png`
**Format:** Teaser STRIP — 3-panel horizontal montage (recurring THIS WEEK shell). **Static hold, 1 image.**
**Prompt:** `THIS WEEK` caption. Three small panels compressing the episode's hooks: (1) a man getting a standing ovation while a woman at the back watches; (2) Cher's Clueless closet-computer screen; (3) the heroine at the Blend & Snap café laptop mid-"oh." Bold gutters, vibrant Y2K color, comic caption boxes. Face refs: heroine kit + generic Steve type. Style ref: Timnit set.

## SCENE: S02-title
**File:** `ep01-title-comic.png`
**Format:** TITLE CARD (recurring shell). **Static hold, 1 image.**
**Prompt:** Big bold comic title lettering **`EPISODE 1 · ON WEDNESDAYS WE DO AI`** (`Ai` in the accent color per house style). Bubblegum-pink + plum + gold, Y2K sparkle energy, hard-ink lettering with angular drop-shadow planes. Small subtitle ribbon: *"Get in loser, we're learning AI."* Style ref: Timnit set.

## SCENE: S03-welcome
**File:** `ep01-welcome-comic.png`
**Format:** WELCOME-BACK host frame (recurring shell). **Static hold, 1 image.**
**Prompt:** Medium shot, heroine (CORPORATE navy blazer, heroine kit face/hair) addressing camera warmly, SUNNYVAiLE Main Street softly behind her (setting ref: main-street-golden). Caption/speech: *"Welcome back, ladies — smart, busy women learning AI one Wednesday at a time, here in SUNNYVAiLE."* Bright, saturated, inviting. Face ref: heroine kit. Style ref: Timnit set.

---

### BEAT 1 — Steve gets the standing ovation

## SCENE: S04-steve-ovation
**File:** `ep01-steve-ovation-comic.png`
**Format:** FULL SCENE (corporate). **Motion: push-in · Frames (2):** `ep01-steve-ovation-a-start-comic.png` = wide establishing of the whole conference room, Steve standing to applause; `ep01-steve-ovation-c-end-comic.png` = closer on the heroine at the back of the room, unclapping, dawning realization. **Hold on end.**
**Prompt:** 4:52 on a Tuesday. A glass corporate conference room; a generic male exec ("Steve" — quarter-zip/fleece energy, faceless-archetype, confident) receiving a standing ovation for a clean one-hour slide. At the back, the heroine (CORPORATE navy blazer, heroine kit face/hair) holds her own thicker footnoted deck, not clapping — the person who did it the hard way. High angle can shrink her slightly. Caption: *"He isn't smarter. He just stopped doing it the hard way."* Mood: bright office but a cool undercurrent. Setting ref: ep01-miranda-office composition. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S05-couldnt-help-wonder
**File:** `ep01-couldnt-help-wonder-comic.png`
**Format:** CLOSE-UP (recurring "I COULDN'T HELP BUT WONDER" shell). **Static hold, 1 image** (opus adds subtle screen-glow flicker).
**Prompt:** Tight reflective close-up of the heroine (CORPORATE navy blazer, heroine kit face/hair), laptop glow on her face, contemplative. Thought-balloon lettering: *"When did everyone learn to do that? And when, exactly, was I supposed to?"* Moody-but-warm, plum shadows, teal screen light. Face ref: heroine kit. Style ref: Timnit set.

---

### BEAT 2 — The on-ramp was terrible

## SCENE: S06-fleece-vest-onramp
**File:** `ep01-fleece-vest-onramp-comic.png`
**Format:** FULL SCENE. **Static hold, 1 image.**
**Prompt:** The heroine scrolling a laptop full of useless "how to be AI-literate" content — every author a smug man in a fleece vest / patagonia quarter-zip, thumbnail after thumbnail, one banner blaring **"AI IS TRANSFORMATIVE!"** She looks unimpressed. Slight satirical energy, vibrant palette. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S06b-groundbreaking
**File:** `ep01-groundbreaking-comic.png`
**Format:** EMPHASIS burst. **⚠ NARRATION-ONLY** (deadpan aside; may be cut from the written article). **Motion: pop-in · Frames (2):** `-a-start` faint/small → `-c-end` full. **Hold on end.**
**Prompt:** Single deadpan word-burst on a flat graphic ground: **`GROUNDBREAKING.`** — dry, Miranda-Priestly-flat delivery energy (not an excited POW). Hard ink, angular shadow, plum/gold. Style ref: Timnit set.

## SCENE: S07-miranda-priestly
**File:** `ep01-miranda-priestly-comic.png`
**Format:** FULL SCENE (own icon). **Static hold, 1 image.**
**Prompt:** Miranda Priestly at her Runway office desk, icy and unbothered, coolly demanding the impossible — a caption frames it as *"add 'become AI-literate' to a full calendar = Miranda asking for the unpublished Harry Potter manuscript."* A nervous assistant mid-frame. Cool, low-key lighting (a moodier beat), still saturated. **Face ref: `assets/saints/y2k-stained-glass-v2/miranda-priestly-y2k-stained-glass.png` (face only — render in comic ink).** Setting ref: ep01-miranda-office. Style ref: Timnit set.

## SCENE: S07b-personal-cost
**File:** `ep01-personal-cost-comic.png`
**Format:** EMPHASIS burst / text card. **Static hold, 1 image.**
**Prompt:** Bold lettered card: **`Technically possible — but at what personal cost?`** Deadpan Runway-flat register, plum ground, gold accent. Style ref: Timnit set.

---

### BEAT 3 — Not a confidence problem, a physics problem

## SCENE: S08-invisible-load
**File:** `ep01-invisible-load-comic.png`
**Format:** FULL SCENE. **Static hold, 1 image** (opus: gentle sway).
**Prompt:** The heroine (CORPORATE, heroine kit) mid-juggle of the invisible load — visually holding/balancing "prep the deck," "track the action items," "deliver my own work on time," plus a faint new floating layer labeled "…and now AI." A clock reads a day already over-subscribed. Caption: *"The person who does all this is usually not named Steve."* Warm but stretched-thin mood. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S08b-physics-problem
**File:** `ep01-physics-problem-comic.png`
**Format:** EMPHASIS burst (the reframe). **Motion: pop-in · Frames (2):** `-a-start` → `-c-end`. **Hold.**
**Prompt:** Big two-line word-burst: **`IT'S NOT A CONFIDENCE PROBLEM.`** / **`IT'S A PHYSICS PROBLEM.`** Hard ink, angular shadow planes, teal + plum, saturated. Style ref: Timnit set.

---

### BEAT 4 — The adoption gap

## SCENE: S09-100-vs-78
**File:** `ep01-100-vs-78-comic.png`
**Format:** TEXT/STAT card. **⚠ stat beat** — figure is article-sourced but NOT yet in the facts ledger (canon facts[] PENDING: Harvard "78 per 100"); render the number but flag for verification before publish. **Static hold, 1 image.**
**Prompt:** A clean stat card: two rows of identical office desks — **100** on top, only **78** lit/occupied below — with big lettering **`FOR EVERY 100 MEN USING GENERATIVE AI, ONLY 78 WOMEN DO.`** and small print *"same tools, same desks — even controlling for job type, age, education, access."* Cooler, data-serious palette (still in-family, not washed out). Style ref: Timnit set.

---

### BEAT 5 — The uncomfortable specifics

## SCENE: S10-encouraged-vs-corners
**File:** `ep01-encouraged-vs-corners-comic.png`
**Format:** FULL SCENE (subject-to-subject). **Static hold, 1 image.**
**Prompt:** Split-energy office panel: on one side a manager warmly encouraging/praising the male exec for using AI; on the other the heroine (CORPORATE, heroine kit) hesitating, a worried thought-balloon *"does this look like cutting corners?"* Cooler tone, saturated. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S10b-pattern-recognition
**File:** `ep01-pattern-recognition-comic.png`
**Format:** EMPHASIS burst. **Static hold, 1 image.**
**Prompt:** Two-line burst: **`THAT'S NOT IMPOSTER SYNDROME.`** / **`THAT'S PATTERN RECOGNITION.`** Hard ink, plum/teal, saturated. Style ref: Timnit set.

---

### BEAT 6 — The gap compounds into a canyon; Dolly

## SCENE: S11-canyon-montage
**File:** `ep01-canyon-montage-comic.png`
**Format:** MONTAGE (compress time). **Motion: montage · Frames (as ONE composited strip of 4 small panels):** week 1 hairline gap → week 4 crack → week 12 gulf → a full canyon between two cliffs (Steve's side vs hers). **1 image** (4 panels). **Hold.**
**Prompt:** Four-panel montage compressing "week over week" — a gap between two figures widening from a hairline to a literal canyon, tiny heroine on one rim. High angle to convey scale. Cool-to-dramatic palette. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S12-dolly-parton
**File:** `ep01-dolly-parton-comic.png`
**Format:** FULL SCENE (own icon). **Static hold, 1 image.**
**Prompt:** Dolly Parton, warm and plain-spoken, standing at the canyon's edge gesturing to a bridge she's building herself, speech balloon: *"You'd better get to building your own bridge, honey — because ain't nobody building it for you."* Golden warm light against the cool canyon — she's the hope note. **Face ref: `assets/saints/y2k-stained-glass-v2/dolly-parton-y2k-stained-glass.png` (face only — comic ink).** Style ref: Timnit set.

---

### BEAT 7 — Fei-Fei Li

## SCENE: S13-fei-fei-li
**File:** `ep01-fei-fei-li-comic.png`
**Format:** FULL SCENE (own icon). **Static hold, 1 image.**
**Prompt:** Fei-Fei Li in a research/lab setting, composed and authoritative. Caption box (use "the world calls her," NOT a claimed title): *"The world calls her the Godmother of AI."* Speech/caption with the MUST-MATCH prefix rendered verbatim: **`If we don't get women involved in AI, we're going to have a future`** built by half the population — for all of the population. A small secondary panel or inset: a training-data pool visibly skewed, "the tools learn from a skewed pool and get worse for women." Cooler serious palette, saturated. **Face ref: `assets/mavens/y2k-stained-glass-v2/fei-fei-li-y2k-stained-glass.png` (face only — comic ink).** Style ref: Timnit set. **⚠ facts[] PENDING:** exact quote not yet ledger-verified — lock only the confirmed prefix; do not extend beyond it in lettering without verification.

---

### BEAT 8 — The flip (the ep's ONE full comic page)

## SCENE: S14-the-flip-14pts
**File:** `ep01-the-flip-14pts-comic.png`
**Format:** FULL-PAGE COMIC (recurring "one big page" — the pivot/reveal beat). **Motion: pull-out to reveal scale, or static hold · Frames (2):** `-a-start` = tight on one senior woman leading a room → `-c-end` = pull out to a podium/leaderboard showing her ahead of male peers by a bar labeled **`+14 POINTS`**. **Hold on end.**
**Prompt:** A dramatic full-page composition: senior women in technical roles who pushed past the awkward phase now LEADING — a clear "+14 percentage points (BCG)" bar/leaderboard, the gap reframed as a starting line not a finish line. Big caption: *"The one thing AI can't replicate — a career's worth of judgment."* Brightest, most triumphant panel so far (the flip = the turn toward hope). **Scope note (verified stat):** this is ADOPTION share among *senior women in technical functions* — NOT "better at AI"/outperformance; keep any lettering framed as adoption. Face ref: heroine kit + generic senior women (diverse Y2K-styled). Style ref: Timnit set.

---

### BEAT 9 — The first tiny win (TRANSFORMATION + town payoff)

## SCENE: S15-transformation
**Files:** shared shell frames `recurring-transformation-f01..f09-comic.png` (REUSE — do not re-render) + episode reveal `ep01-transformation-reveal-comic.png`
**Format:** ✨ TRANSFORMATION SEQUENCE (recurring shell; corporate → SUNNYVAiLE). **Motion: full-body throughout · Frames (10–11):**
- `f01` = heroine CORPORATE (navy blazer, heroine kit face/hair), full body. *(SHARED)*
- `f02`–`f04` = FAiRY Godmother wand motion in-betweens: raise → arc → contact (≥3 frames, smooth not choppy). FG ref: `opening-05-fairy-godmother-rerender-lit-v2.png`. *(SHARED)*
- `f05`–`f06` = magic effect building (sparkle/POOF, multiple frames). *(SHARED)*
- `f07` = MID-TRANSFORMATION — her form/outfit actually morphing mid-swap (a real transition state, not just sparkle). *(SHARED)*
- `f08`–`f09` = magic clearing (more effect frames). *(SHARED)*
- **`ep01-transformation-reveal-comic.png`** = heroine REVEALED in the **Ep1 SUNNYVAiLE outfit (LOCKED: Carrie Bradshaw opening-titles TUTU — white/cream tulle tutu skirt + fitted pale-pink/nude tank + a delicate gold necklace (NO "Carrie" nameplate — she is the heroine, not Carrie))**; HAIR = locked heroine kit (half-up waves, 6 butterfly clips, 3 sections each side — NOT a single vertical line). *(EPISODE-SPECIFIC — the only frame re-rendered per episode.)*
**Image count: 10** (9 shared + 1 new reveal). **Hold on reveal.** Style ref: Timnit set. Bright, saturated, joyful.

## SCENE: S16-blend-snap-arrival
**File:** `ep01-blend-snap-arrival-comic.png`
**Format:** ESTABLISHING / aspect-to-aspect (arrival in SUNNYVAiLE). **Static hold, 1 image** (opus: gentle ambient).
**SOURCE HOLD:** The former `08-blend-and-snap.png` exterior is deleted, rejected cottage-core artwork in the wrong SUNNYVAiLE colours. Do not render or animate this scene until an exact current-town exterior receives positive approval. The narrative job remains a sunny Sunday arrival with the Episode 1 SUNNYVAiLE heroine outfit.

## SCENE: S17-blend-snap-win
**File:** `ep01-blend-snap-win-comic.png`
**Format:** FULL SCENE (present/town). **Motion: push-in to realization · Frames (2):** `-a-start` = medium, heroine typing the truth into AI at the café table (draft appearing) → `-c-end` = close on her face as the 9-second draft lands, "80% right." **Hold on end.**
**Prompt:** Interior Blend & Snap café, cozy Y2K coffee-shop warmth, corkboard behind. Heroine (SUNNYVAiLE Carrie-tutu look, heroine kit face/hair) at a table, laptop open — she's told AI the truth about the avoided email (who it's for, what she needs, what she can't say out loud). A draft appears in seconds. Small caption: *"A draft in nine seconds — 80% right; the other 20% wrong in ways only she could see."* Warm, hopeful. Setting refs: `assets/town-characters/scenes/jojo-scene.png` (the NEW canonical Blend & Snap interior — take the room: magenta walls, Memphis art, pastry case, clock-tower window; heroine is the subject, JoJo optional/background) + `blend-snap-corkboard.png`. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S17b-i-can-do-this
**File:** `ep01-i-can-do-this-comic.png`
**Format:** EMPHASIS burst (the emotional beat). **Motion: pop-in · Frames (2):** `-a-start` → `-c-end`. **Hold.**
**Prompt:** Warm word-burst: **`OH. I CAN DO THIS.`** with a small ribbon underneath: *"Four days of dread → eleven minutes of work."* Bright pink/gold/cream, joyful, the private-embarrassment-becomes-permission beat. Style ref: Timnit set.

---

### BEAT 10 — The cocktail-party explanation

## SCENE: S18-cocktail-card
**File:** `ep01-cocktail-card-comic.png`
**Format:** COCKTAIL card (recurring COCKTAIL shell — Bronze AiGE motif). **Static hold, 1 image.**
**Prompt:** Locked cocktail-party card: a cocktail glass / Bronze AiGE happy-hour motif, and the three-beat line lettered clean: **`It read everything. It's lived nothing. And it never says "I don't know."`** Plum + gold + a spritz of teal, evening-lounge warmth. Style ref: Timnit set.

## SCENE: S19-new-hire
**File:** `ep01-new-hire-comic.png`
**Format:** FULL SCENE. **Static hold, 1 image.**
**Prompt:** The metaphor made visual: the heroine (SUNNYVAiLE Carrie-tutu look) calmly onboarding/managing a dazzling new hire — superhuman range, astonishing speed, a stack of scary-good first drafts, but zero lived judgment (depicted as an eager, brilliant, slightly clueless assistant). Caption: *"The most talented new hire you'll ever manage. And you've done this all before."* Warm, confident. Face ref: heroine kit. Style ref: Timnit set.

---

### BEAT 11 — Under the hood

## SCENE: S20-under-the-hood
**File:** `ep01-under-the-hood-comic.png`
**Format:** FULL SCENE + text. **Static hold, 1 image** (opus: words appear one at a time).
**Prompt:** A friendly "under the hood" panel: three app windows side by side labeled **ChatGPT · Claude · Gemini**, each visibly predicting a sentence word-by-word (next-word tiles lighting up). Caption: *"Type into any of them and it's doing prediction — word by word. Experts can't even agree what to call what grew out of it. But two limits aren't up for debate."* Clean, bright, techy-but-cute Y2K palette. Style ref: Timnit set. *(Currency note: keep tool names generic ChatGPT/Claude/Gemini per canon concepts[]; no model version numbers on screen.)*

---

### BEAT 12 — Limit one: context (Cher's closet)

## SCENE: S21-cher-closet
**File:** `ep01-cher-closet-comic.png`
**Format:** FULL SCENE (own icon). **Static hold, 1 image.**
**Prompt:** Cher Horowitz at her Clueless closet computer — the iconic outfit-matching software showing endless combinations — cheerful but oblivious. Caption: *"Endless combinations, no idea the meeting is with a hostile client — unless you tell it. That's limit one: context."* Small caption tag: *"Handing context over well is a skill — literally next week's episode."* Bright, saturated Y2K bedroom palette. **Face ref: `assets/saints/y2k-stained-glass-v2/cher-horowitz-y2k-stained-glass.png` (face only — comic ink).** Style ref: Timnit set.

---

### BEAT 13 — Limit two: hallucination (Burn Book / Regina)

## SCENE: S22-burn-book-regina
**File:** `ep01-burn-book-regina-comic.png`
**Format:** FULL SCENE (own icon). **Static hold, 1 image.**
**Prompt:** Regina George holding the Mean Girls Burn Book, unbothered and confident. An open spread shows entries delivered with identical certainty — one true, one fabricated — including a visible entry lettered verbatim: **`Made out with a hot dog`** sitting next to a plausible-looking "fact," both stated with the same authority. Caption: *"Out of the box AI checks only whether an answer is plausible — not true. Same unbothered confidence for both."* Cautionary-red accent energy. **Face ref: `assets/saints/y2k-stained-glass-v2/regina-george-cautionary-red-y2k-stained-glass.png` (face only — comic ink).** Style ref: Timnit set.

## SCENE: S22b-regina-energy
**File:** `ep01-regina-energy-comic.png`
**Format:** EMPHASIS burst. **Static hold, 1 image.**
**Prompt:** Word-burst rendered verbatim: **`Regina George energy`** — but make it AI. Cautionary-red + plum, hard ink, confident-mean-girl attitude. Style ref: Timnit set.

---

### BEAT 14 — Three words so you don't pull a Cher (concept cards + asides)

## SCENE: S23-genai-card
**File:** `ep01-genai-card-comic.png`
**Format:** CONCEPT text-card (recurring concept-card treatment). **⚠ Carrie Bradshaw icon scene — NO approved face asset (see PENDING).** **Static hold, 1 image.**
**Prompt:** Concept card: big term **`GENERATIVE AI`** + one-line def *"creates new content — first drafts, text, images — instead of just searching what already exists."* Analogy vignette: a Carrie-Bradshaw-type NYC newspaper columnist (late-'90s, tulle skirt, laptop at an apartment window) — *"a Carrie Bradshaw in your laptop: it writes the column, it doesn't just find you articles to read."* **Render Carrie GENERICALLY — no real-person likeness; DO NOT invent one.** Bright, saturated. Style ref: Timnit set.

## SCENE: S24-model-card
**File:** `ep01-model-card-comic.png`
**Format:** CONCEPT text-card. **Static hold, 1 image.**
**Prompt:** Concept card: big term **`MODEL`** + def *"the trained brain powering the app."* Analogy vignette: three glossy magazines (Vogue / Elle / Harper's Bazaar) = the apps (ChatGPT / Claude / Gemini), and three distinct editors-in-chief behind them = the models — *"same brief, wildly different results."* Small print: *ChatGPT runs on GPT/OpenAI · Claude on Anthropic · Gemini is Google.* Fashion-glossy Y2K palette. Style ref: Timnit set. *(No model version numbers — de-versioned per house currency rule.)*

## SCENE: S25-hallucination-card
**File:** `ep01-hallucination-card-comic.png`
**Format:** CONCEPT text-card. **Static hold, 1 image.**
**Prompt:** Concept card: big term **`HALLUCINATION`** + def *"confident, polished — and factually wrong. Not lying (that needs intent); it just has no built-in 'do we have receipts?' check."* Analogy vignette: your most confident friend answering any question with total authority whether she knows or not (echo the Burn Book). Plum/red accent. Style ref: Timnit set.

## SCENE: S26-rsvp-cher
**File:** `ep01-rsvp-cher-comic.png`
**Format:** EMPHASIS / aside card. **⚠ NARRATION-ONLY** (Clueless aside; likely cut from article). **Static hold, 1 image.**
**Prompt:** Small comic aside: Cher confidently, wrongly insisting *"it says R.S.V.P. on the Statue of Liberty!"* — captioned *"Don't pull a Cher: confident, and completely wrong."* Cher face ref: `cher-horowitz-y2k-stained-glass.png` (face only). Style ref: Timnit set.

## SCENE: S27-cool-mom
**File:** `ep01-cool-mom-comic.png`
**Format:** EMPHASIS / aside card. **⚠ NARRATION-ONLY** (Mean Girls aside; likely cut from article). **Static hold, 1 image.**
**Prompt:** Small comic aside lettered **`"I'm not a regular mom — I'm a cool mom"`** captioned *"= AI misreading the room."* Playful Y2K palette, hard ink. (Render the "cool mom" figure generically — no real-person likeness.) Style ref: Timnit set.

---

### BEAT 15 — The try-on

## SCENE: S28-try-on
**File:** `ep01-try-on-comic.png`
**Format:** FULL SCENE (present/town). **Static hold, 1 image** (opus: three drafts fade in).
**Prompt:** The heroine (SUNNYVAiLE Carrie-tutu look, heroine kit) with three browser tabs open — ChatGPT, Claude, Gemini — handing all three the SAME small real task (the avoided email). Three different drafts come back. In each draft, a highlighted portion is lettered verbatim: **`twenty percent only you can see`**. Caption: *"One wins today's task; a different one might win next week's."* Bright, hopeful, hands-on. Setting: Blend & Snap or her desk. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S28b-ksvl-hooks
**File:** `ep01-ksvl-hooks-comic.png`
**Format:** EMPHASIS / KSVL callout card. **⚠ NARRATION-ONLY** (spoken try-on send-off). **Static hold, 1 image.**
**Prompt:** Radio-dial / KSVL motif card lettered **`Turn on K-S-V-L, 99.9 — don't just learn from books, learn from hooks.`** Retro-radio Y2K neon, teal + pink + gold. Style ref: Timnit set.

---

### BEAT 16 — Remember, ladies (sign-off + Rooms)

## SCENE: S29-sign-off
**File:** `ep01-sign-off-comic.png`
**Format:** SIGN-OFF frame (recurring "remember, ladies" shell). **Static hold, 1 image.**
**Prompt:** Big locked sign-off frame: the heroine (SUNNYVAiLE Carrie-tutu look) raising a coffee cup, lettering **`You'll need more than a cup of ambition to keep up in the male-dominated world of AI — lucky for you, this series comes in small sips.`** + the locked tag **`See you next Wednesday… in SUNNYVAiLE.`** Small ribbon: *"Small sips. Big moves."* Brightest triumphant palette, Dolly "cup of ambition" wink. Face ref: heroine kit. Style ref: Timnit set.

## SCENE: S30-rooms-trailblazers
**File:** `ep01-rooms-trailblazers-comic.png`
**Format:** TEXT card (discussion / Delta LAi Nu Rooms invite). **Static hold, 1 image.**
**Prompt:** Invitation card to the members-only Rooms at the SUNNYVAiLE sorority house (Delta LAi Nu): *"Got a sharper 'Remember, ladies:' line that would make Dolly proud? Post it in the Rooms — your Resident Card gets you in. Favourites get featured, with credit."* + big lettering **`We're trailblazers here. Not idea thieves.`** Sorority-house Y2K warmth, plum/gold/pink. Style ref: Timnit set.

---

### RECURRING CLOSE

## SCENE: S31-next-week
**File:** `ep01-next-week-comic.png`
**Format:** NEXT WEEK ON teaser strip (recurring shell). **Static hold, 1 image.**
**Prompt:** `NEXT WEEK ON LAiDIES` caption. Teaser montage for Episode 2 **"Tell Me What You Want"**: the heroine learning to actually talk to AI so it gives her something useful back — *"prompting is just delegation."* Include a nod to Ep2's patron saint of specificity, **David Rose**. **David Rose face ref: `assets/saints/y2k-stained-glass-v2/david-rose-y2k-stained-glass.png` (face only — comic ink).** Bright, hooky. Style ref: Timnit set.

---

## 4 · PRODUCTION NOTES / FLAGS FOR ALI
- **Total images:** 33 distinct scene ids → ~41 rendered files once frame sequences are counted (push-in/pop-in/pull-out beats = 2 frames each; transformation = 1 new reveal + 9 shared shell frames reused).
- **Format rhythm check (per grammar doc):** full scenes (S04,S06,S07,S08,S10,S12,S13,S16,S17,S19,S20,S21,S22,S23-25 vignettes,S28) are broken up by emphasis bursts (S06b,S08b,S10b,S17b,S22b,S26,S27), text/stat cards (S00,S09,S18,S30), concept cards (S23/24/25), one full-page (S14), a montage (S11), and the transformation. No long run of identical full scenes.
- **⚠ NARRATION-ONLY beats** (make the video even if the article cut them): S06b, S26, S27, S28b.
- **⚠ facts/PENDING (verify before publish, do NOT invent URLs/figures):** S09 (78-per-100, Harvard — not in ledger), S13 (Fei-Fei quote wording + "Godmother" caveat — lock only confirmed prefix), and the Lean In 23/27/32 figures if any get lettered. Per [[fact-verification-rule]], lettering a stat = treating it as verified; keep un-ledgered numbers out of on-image text until logged, or render them as clearly-attributed.
- **⚠ Carrie Bradshaw (S23):** no approved face asset — render generically, commission `carrie-bradshaw-y2k-stained-glass`, then re-render.
- **✅ Ep1 SUNNYVAiLE outfit (LOCKED, Ali 2026-07-19):** Carrie Bradshaw opening-titles TUTU (white/cream tulle tutu + fitted pale-pink/nude tank + a delicate gold necklace (NO "Carrie" nameplate — she is the heroine, not Carrie)). Outfit only — heroine keeps her own face + locked 90s hair. Keep identical across S15 reveal + all beat 9–16 heroine scenes.
- **Not-drops (intentional):** Samantha Jones and Elle Woods appear ONLY in the meta patron-saint ensemble (canon line 21), NOT in any narrative beat — so they correctly get no scene. If Ali wants them worked into a beat, that's a canon edit first.
- **De-versioning:** per house currency rule, keep tool names generic (ChatGPT/Claude/Gemini) with NO model version numbers on any screen (S20, S24).
