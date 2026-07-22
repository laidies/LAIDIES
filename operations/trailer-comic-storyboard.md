# TRAILER — "Welcome to SUNNYVAiLE" · COMIC storyboard + Codex prompt doc (0:00 → 16:00)

The ~16-min host-narrated town tour, re-cut for the **locked comic / graphic-novel style** (ALL video is now
comic, decided 2026-07-18/19). This file is **both** the storyboard **and** the per-image Codex prompt doc —
each beat below is a machine-readable `## SCENE:` block (id + filename + full prompt + refs + format + motion).

- **Timings** anchored to `content/episodes/episode-trailer-cues.json` (proportional estimates vs the 967.2s
  narration master `content/music/trailer-narration.mp3`), sub-divided by narration position.
- **Script source:** `operations/audio/trailer-elevenlabs-v3-tagged.txt`.
- **Output dir (all files below):** `assets/episodes/trailer/comic/` · naming `trailer-bNN-<slug>-comic-v1-1920.png`
  (motion beats add `-a-start` / `-b-mid` / `-c-end`). All renders **16:9, ≥1920px wide**.

> **This is a SCRIPT-DRIVEN storyboard, NOT a building slideshow.** Each image illustrates what is being *said* at
> that beat — the heroine, the activity, the era gag, the concept, or a text/emphasis card. The old
> `episode-trailer-cues.json` cue sheet is a 31-shot **building slideshow** (storefront `.webp` per stop); this
> storyboard **supersedes** it — see the COVERAGE CHECKLIST, which maps each old building cue to the activity
> image that replaces it. A building appears only as the *backdrop to an activity*, comp-referenced, rendered COMIC.

---

## 🔒 GLOBAL STYLE HEADER — applies to EVERY scene below

### ⚠ HARD GUARDRAILS — apply to EVERY scene (Ali 2026-07-19, from Ep1/Ep2 failures)
1. **TWO WORLDS STAY SEPARATE — the outfit MUST match the location (Ali 2026-07-19).** Corporate look (navy suit, professional hair, NO butterfly clips) = corporate-land only (desk/office/city). SUNNYVAiLE look (90s/Y2K outfit + 6-butterfly-clip half-up hair) = in SUNNYVAiLE only (town/Main Street/buildings). ⛔ NEVER mix — no Y2K outfit/clips in a corporate setting, no corporate suit in SUNNYVAiLE. If she's in a 90s/Y2K outfit she IS in SUNNYVAiLE. The transformation is the only bridge.
2. **STYLE REFS = TREATMENT ONLY — NEVER their PEOPLE.** The style-lock refs supply LINE / INK / SHADOW-PLANES / COLOR only. ⛔ Do NOT make ANY character resemble the PEOPLE in those refs (Timnit, Joy, Emily, Kate, Hedy). Every incidental / background / crowd figure = ORIGINAL + invented.
3. **EVERY character has a COMPLETE, WELL-FORMED FACE.** No faceless / blank / smeared / missing-face figures. Clear eyes/nose/mouth + correct anatomy on every person in frame.
4. **POPULATED TOWN SCENES = the BUILDING'S CANONICAL KEEPER — never a random person.** (This is the trailer's #1 risk — a town tour full of random strangers.) If a scene is set in a SUNNYVAiLE building that has a keeper, the person shown IS that keeper (likeness from their portrait, comic-rendered) — never a random barista/clerk/bartender/host. **KEEPER → portrait:** Blend & Snap → **JoJo** `assets/town-characters/scenes/jojo-scene.png` · Town Hall → **Mayor Deb** `assets/town-characters/scenes/mayor-deb-scene.png` · KSVL → **DJ SunnyV** `assets/episodes/ep-04/pixel/ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png` · Post Office → **Penny** `assets/town-characters/scenes/penny-scene.png` · BRONZE AiGE → **Cosmo** `assets/town-characters/scenes/cosmo-scene.png` · Chick Flicks → **Becky** `assets/town-characters/scenes/becky-scene.png` · Delta LAi Nu → **June** `assets/town-characters/scenes/june-scene.png` · MAiKEOVER → **Paulette** `assets/town-characters/scenes/paulette-scene.png` · NewsStand → **Paige** `assets/town-characters/scenes/paige-scene.png` · LIBRAiRY → **Miss Jeeves** `assets/video/delivery-20260714-opening-v6/shots/_miss-jeeves-approved-reference.png` · Mme CLAi-O shop → **Mme CLAi-O** · FAiRY Godmother house → **the FG** `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` · LUMINAiRY → **Matron Lumen** `assets/town-characters/scenes/matron-lumen-scene.png`. Background crowd (not a keeper's building) = original Y2K women, no ref-lookalikes.
5. **CHECK FOR DRIFT before finalizing EVERY image — regenerate if it fails. (Drift is a problem EVERYWHERE — this check is not optional.)** (a) Every character's FACE/likeness matches their LOCKED reference and reads as THAT person (heroine, keepers) — no wrong/drifted face. (b) **⛔ NO smooth glamour-cartoon construction. The generated image MUST match the graphic-novel style examples and use REALISTIC FACIAL ANATOMY, BOLD INKED COMIC CONTOUR LINES (confident graphic-novel ink line with some weight variation — NOT smooth even vector lines, but ⛔ NOT painterly / brush-painted / watercolor either), and LARGE SCULPTURAL SHADOW SHAPES (the hard angular planes).** ⛔ NOT clean-vector / plasticy / smooth-3D / pretty-cartoon / plain-flat illustration. Check BOTH, every image.
6. **ALL on-image text = COMIC-BOOK LETTERING, never a plain text box.** Titles, emphasis, captions, any words = **bold dynamic comic lettering** (word-burst / hand-inked / banner / caption box with comic energy) — ⛔ NOT plain typed text in a plain rectangle. Ref: `operations/reference/font-and-text-emphasis/`.
7. **SUNNYVAiLE = period-Y2K TECH ONLY — no modern electronics.** Laptop = **iBook G3 clamshell**; desktop = **older CRT monitor** (not flat-screen); cell phone = **Motorola RAZR flip phone**. ⛔ No MacBooks, flat-screens, smartphones, or modern devices in town.

### LOCKED STYLE REFS (style/treatment ONLY — never copy faces from these)
Pass these five as the **style anchors** on every generation. They define the ink/shadow/color recipe. Do **not**
take any character's face or outfit from them — they are *how it's drawn*, not *who is in it*.

- ⭐ `assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` — **THE anchor** (lead ref).
- `assets/episodes/ep-04/pixel/ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png`

**Recipe (from the anchors):** bold **black ink outlines**, **HARD angular grey shadow PLANES** (faceted, not
soft), **clean flat color**. ⛔ **NO halftone / ben-day dots**, NOT pixel, NOT smooth/plasticy, NOT pop-art
poster, NOT tarot-card. 🎨 **VIBRANT + saturated Y2K/90s palette** — pinks, teals, blues, plus plum `#4b2148`,
gold, cream ([[brand-palette-and-type-lock]]) — NOT pastel, NOT muted/dusty (Ali dislikes muted grading).
Bright/town/present beats push the vibrant color hard; the few history/reverent beats (LUMINAiRY) stay moodier
but still IN palette, never washed out. 16:9, ≥1920px.

### Heroine (host / narrator) — face + look
- **Face/look ref:** `assets/episodes/ep-04/pixel/ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-suit-flat-color-only-1920.png`
  (plus the v18–v27 turnaround / expression sheets in the same folder for angles/expressions).
- **Hair (LOCKED):** half-up in waves, **3 sections each side / 6 butterfly clips** — NOT clips in a single
  vertical line ([[heroine-appearance-canon]], [[comic-animation-frame-spec]]).
- Face = Ali's likeness via that ref ONLY; never take her *style* from the ref. See FLAG 1 on the host outfit.

### The 4 formats (mix for rhythm — never stack identical full scenes) — `episode-comic-grammar.md`
1. **Full scene** — a character in her world. 2. **Full-page comic** — a big pivotal beat, used sparingly.
3. **Text-only frame** — a term/title held as a card. 4. **Emphasis burst** — a punchline word-burst.

### Transitions (comic-book grammar, NOT video dissolves) — `episode-comic-grammar.md` + `reference/comic-storytelling/README.md`
Each scene-to-scene move names a McCloud transition in its block (`TRANSITION →`). Defaults: **scene-to-scene +
caption box** between stops; **montage** (3–5 panels) to compress; **push-in** to build to a realization;
**pull-out** to reveal scale; **aspect-to-aspect** for quiet establishing; **whip/flash-cut** for a hard gag jump.

### Motion (frame counts) — `comic-animation-frame-spec.md`
Static talking/text beats = **1** keyframe. Any motion beat spells out **MOTION + FRAME SEQUENCE + COUNT** in its
block, using `-a-start` / `-b-mid` / `-c-end` naming. Only frames that DIFFER are listed. Play once, hold on `-end`.

### Recurring-segment DNA — `operations/episode-recurring-segments.md`
The trailer is its own structure (a tour) but **shares locked treatments** with the weekly show: the
**TITLE** lettering (B08), **host WELCOME** frame (B01), the **✨ TRANSFORMATION** sequence (B39 = the reusable
9–11-frame glow-up; frames 1–9 shared, only the reveal outfit changes), the **SIGN-OFF** treatment (B56), and the
**NEXT WEEK ON** teaser (B57). Render these on-model so they match Ep1–N.

### `Ai` accent rule
Wherever type appears, the **`Ai`** letters take the accent color and the **i-dot is lit** ([[ai-letters-accent-rule]],
[[logo-flashing-dot-locked]]): SUNNYVAiLE, LAiDIES, MAiN, MAiKEOVER, BRONZE AiGE, FAiRY, LUMINAiRY, CLAi-O, LAi Nu.

---

## ✅ COVERAGE CHECKLIST — every spoken beat → its image (verify: no line unillustrated, not a slideshow)

Read this to confirm each thing SAID gets appropriate, VARIED art. **"Replaces cue"** = the old building-slideshow
shot in `episode-trailer-cues.json` this activity image supersedes. Format spread is mixed by design.

| Beat | ~Time | What's SAID (spoken) | SCENE slug (image) | Format | Replaces cues.json cue |
|---|---|---|---|---|---|
| B01 | 0:00 | "Welcome to ladies… I owe you a tour." | `heroine-welcome` | full scene | t0 pc-welcome (kept as heroine, not postcard) |
| B02 | 0:06 | "…works like the TV we grew up on: 24-episode seasons, new one every Wednesday." | `era-tv-24-episodes` | full scene | t5.8 Chick Flicks bldg |
| B03 | 0:22 | "…explained the way your sharpest girlfriend would over coffee… none of the jargon." | `over-coffee` | full scene | — |
| B04 | 0:44 | "I'm your heroine. I can't say that with a straight face either…" | `fourth-wall-heroine` | full scene | t43.6 Blend&Snap bldg |
| B05 | 1:05 | "I'm not an expert — a few steps ahead… reporting back." | `reporting-back` | full scene | — |
| B06 | 1:25 | "I make the mistakes so you can skip them. I do the reading so you don't have to." | `emphasis-make-the-mistakes` | emphasis | — |
| B07 | 1:41 | "[announcer] On this season of ladies: she stops feeling behind… builds her squad… becomes the woman others come to." | `season-arc-strip` | comic strip | t101.4 Town Hall bldg |
| B08 | 1:58 | "But first, the tour. This is the trailer: Welcome to Sunnyvale." | `title-welcome-to-sunnyvaile` | text card | — |
| B09 | 2:05 | "Sunnydale, Bayside, Capeside… you have sunnyVEIL. Sunny-v-A-i-l-e." | `the-name-gag` | text-forward scene | t125.5 Welcome Wagon bldg |
| B10 | 2:20 | "…everything about AI looked like a glowing blue brain… so we built a town instead." | `brain-vs-town` | full-page comic | — |
| B11 | 2:43 | "…the entire era that raised us. Boy bands… butterfly clips… call the radio, record on cassette…" | `era-montage` | full-page (montage) | t163.3 KSVL bldg |
| B12 | 3:13 | "Sunnyvale is where Girl Power meets Machine Power." | `tagline-girl-power-machine-power` | emphasis | t193.5 Town Hall bldg |
| B13 | 3:16 | "Analogies that stick… Sunnyvale is where every episode takes place." | `town-establishing-wide` | full scene (wide) | t195.7 Library bldg |
| B14 | 3:29 | "And I live here — actually live here. I found this place at 11 p.m. on a Tuesday." | `i-live-here` | full scene | t209.1 Delta LAi Nu bldg |
| B15 | 3:52 | "My card's in my wallet, my closet's upstairs… late-night library, coffee, songs on the radio." | `life-in-these-streets-strip` | comic strip | — |
| B16 | 4:15 | "Every building is a page. Walking in is just clicking. The town remembers your visits." | `every-building-is-a-page` | full-page comic | — |
| B17 | 4:35 | "The town IS the teaching method." | `emphasis-town-is-the-method` | emphasis | — |
| B18 | 4:47 | "Episode teaches, study pack reinforces, song = earworm, quiz tests, games practice, community checks… worlds work." | `echo-wheel-worlds-work` | full-page (diagram) | — |
| B19 | 4:58 | "On Wednesdays we do AI (obviously)." | `on-wednesdays-we-do-ai` | emphasis / scene | t298.5 Chick Flicks bldg |
| B20 | 5:20 | "A new episode drops every Wednesday, and the town dresses for it…" | `town-dresses-for-wednesday` | full scene | — |
| B21 | 5:45 | "…the town is open every day, nothing expires… tapes stay on the shelf forever." | `nothing-expires` | full scene | — |
| B22 | 6:10 | "Wednesday is when the new thing arrives… do one of the weekly tours." | `lead-in-to-tours` | full scene | — |
| B23 | 6:22 | "Two types of tours in Sunnyvale, and both count." | `tour-map-reveal` | full-page (map) | t382.6 Welcome Wagon bldg |
| B24 | 6:35 | "The Express Tour is four stops: episode, study pack, quiz, song." | `express-4-stops` | text card (icons) | t387.5 Blend&Snap bldg |
| B25 | 6:50 | "The Full Tour is the loop — eight stops, tracked by your Tour Guide… bank an extra wish." | `full-8-stops-tour-guide` | full-page (map+char) | t395.0 Town Hall bldg |
| B26 | 7:03 | "Stop 1 · NewsStand… AI headlines translated into actual English." | `newsstand-plain-english` | full scene (activity) | t423.1 NewsStand bldg |
| B27 | 7:25 | "Stop 2 · Chick Flicks… every episode lives here like a tape, sorted into genre aisles." | `chick-flicks-aisles` | full scene (activity) | t444.9 Chick Flicks bldg |
| B28 | 7:40 | "…a screening room in the back where episodes play with the pictures — the premiere is screening now." | `screening-room` | full scene | — |
| B29 | 7:55 | "Stop 3 · Blend & Snap… the study pack lives here: the class notes / cheat sheet." | `blend-snap-study-pack` | full scene (activity) | t474.7 Blend&Snap bldg |
| B30 | 8:12 | "…plus this week's trading card pack. Rip it open, flip each card, learn a concept." | `trading-card-pack` | full scene (close) | — |
| B31 | 8:30 | "I write half this show from the corner table… the try-on: each week's 10-minute exercise." | `heroine-writing-try-on` | full scene | — |
| B32 | 8:45 | "If you only do one thing beyond listening, do the try-on." | `emphasis-do-the-try-on` | emphasis | — |
| B33 | 8:52 | "Stop 4 · SUNNYVAiLE High… the pop quiz… banks butterfly clips in a jar in your closet." | `high-pop-quiz` | full scene (activity) | t532.1 High bldg |
| B34 | 9:08 | "…every four weeks, the gym hosts a book fair. Yes, that kind. Yes, with posters." | `book-fair` | full scene (era detail) | — |
| B35 | 9:19 | "Stop 5 · Free time… get your cards read at Madame Cleo's… her fortunes do NOT disappoint." | `mme-claio-reading` | full scene (character) | t558.8 Mme CLAi-O bldg |
| B36 | 9:33 | "Pick up the Dream Phone and call somebody in 1999." | `dream-phone` | full scene (era detail) | t583.2 Dream Phone bldg |
| B37 | 9:48 | "Ask the Fairy Godmother anything — the town's actual AI assistant… spend that banked wish." | `fairy-godmother` | full scene (character) | t588.1 FAiRY Godmother bldg |
| B38 | 10:05 | "…seven charms hide in pictures around town. Spot one, click it, add it to your bracelet." | `charm-hunt` | full-page (I-spy) | — |
| B39 | 10:16 | "Stop 6 · MAiKEOVER on MAiN… your Sunnyvale glow up… your residence card." | `maikeover-glow-up` | full-page (transformation) | t615.7 MAiKEOVER bldg |
| B40 | 10:35 | "…free… pick a handle… without a card you're a tourist. With one, you're a resident." | `tourist-to-resident` | full scene / concept | — |
| B41 | 10:59 | "Stop 7 · BRONZE AiGE. Happy hour… the Businesswomen's Special — a paper fortune teller picks your drink." | `bronze-businesswomens-special` | full scene (activity) | t658.9 Bronze AiGE bldg |
| B42 | 11:25 | "Stop 8 · Delta LAi Nu… the rooms — our members-only chat, three wings. Common rooms, post your wins." | `delta-lai-nu-rooms` | full scene (interior) | t684.7 Delta LAi Nu bldg |
| B43 | 11:42 | "Advice rooms like Dear Ladies. Creative rooms — mix CDs traded, the Burn Book of what didn't work." | `room-types-strip` | comic strip | — |
| B44 | 11:58 | "…the feature of the house: Girl Talk, where you draw a card and take the dare." | `girl-talk` | full scene (activity) | — |
| B45 | 12:12 | "Upstairs? Your closet — your card, clips, charms, luminaries — admire the shelf you're building." | `closet-reveal` | full scene (payoff) | — |
| B46 | 12:23 | "Now, the radio… K-S-V-L, community radio, 99.9, a full functioning station." | `ksvl-dj-sunnyv-booth` | full scene (character) | t742.5 KSVL bldg |
| B47 | 12:40 | "…DJ SunnyV between tracks… weather and traffic for a town that has neither." | `weather-traffic-gag` | full scene (gag) | — |
| B48 | 13:00 | "The music is real and it's ours: ten house bands… a new anthem every episode." | `ten-house-bands` | full-page (poster wall) | — |
| B49 | 13:20 | "…mix CDs you can flip over and read… a sticker rack, and your first one's free." | `mix-cd-stickers` | full scene (era detail) | — |
| B50 | 13:35 | "Don't just learn from books. Learn from hooks." | `emphasis-learn-from-hooks` | emphasis | — |
| B51 | 13:46 | "The post office writes you one letter a week… and it ships gifts too." | `post-office-letter` | full scene (activity) | t825.7 Post Office bldg |
| B52 | 14:06 | "The mall sells flair for your card." | `mall-flair` | full scene (era detail) | t845.7 Mall bldg |
| B53 | 14:09 | "Town Hall is run by Mayor Deb… her campaign posters alone are worth the trip." | `mayor-deb` | full scene (character) | t848.8 Town Hall bldg |
| B54 | 14:40 | "Up on Lantern Hill, the Luminairy hangs portraits… saints, mavens, trailblazers." | `luminairy` | full-page comic | t880.0 LUMINAiRY bldg |
| B55 | 15:08 | "Everything lives at ladies dot A-I: L-A-i-D-I-E-S. New episode every Wednesday." | `brand-card-ladies-ai` | text card | t907.5 Welcome Wagon bldg |
| B56 | 15:30 | "You don't have to know anything yet. You just have to show up. See you next Wednesday… in Sunnyvale." | `sign-off` | full scene + emphasis | t938.7 Delta LAi Nu bldg |
| B57 | 15:52 | "[announcer] Next episode: a man named Steve is called a visionary… Episode One: On Wednesdays We Use AI." | `next-week-teaser` | text/emphasis card | t951.6 Chick Flicks bldg |
| B58 | 16:00 | (town anthem) "See you next Wednesday in Sunnyvale." | `end-card-dial-up` | text card (end) | t960 pc-dial-up |

**Slideshow check:** of 58 beats, ~30 are full scenes (heroine + activity + character), ~9 full-page comics,
~4 comic strips, ~8 text/emphasis cards, ~7 era-detail vignettes. **No two consecutive building exteriors.**
Every one of the 31 old building cues is replaced by an activity/concept/character image (right column above).

---

# SCENE BLOCKS (hand straight to Codex)

Every block: STYLE = the 5 locked anchors (header) unless noted. Only scene-specific **face/setting refs** are
listed per block. Prompts assume the global recipe (ink outlines, angular grey planes, flat vibrant Y2K color).

## CH.1 — COLD OPEN / THE SHOW (0:00 – 1:41)

## SCENE: heroine-welcome
- **File:** `trailer-b01-heroine-welcome-comic-v1-1920.png` · **Format:** full scene · **Time:** 0:00–0:06
- **Said:** *"Hi. Welcome to ladies. Before the season starts, I owe you a tour."*
- **Refs (face/setting):** heroine `…v28-suit-flat-color-only-1920.png`; setting `approved-assets/town-scenes-and-map/sunnyvaile-main-street-walk-panorama.png` + `approved-assets/street-scenes/main-street-golden.png` (comp only, render comic).
- **Prompt:** The heroine stands mid-frame on a sunny SUNNYVAiLE MAiN Street, waving hello, one arm sweeping back to present the pastel storefronts behind her. Warm golden establishing light, small hanging banner reads `WELCOME TO SUNNYVAiLE` (`Ai` lit). Locked hair (6 butterfly clips, half-up waves), friendly eye-contact to camera. Vibrant pinks/teals/blues. This is the recurring **host WELCOME** treatment — keep on-model.
- **TRANSITION →** action-to-action into B02.

## SCENE: era-tv-24-episodes
- **File:** `trailer-b02-era-tv-24-episodes-comic-v1-1920.png` · **Format:** full scene (era detail) · **Time:** 0:06–0:22
- **Said:** *"…a show about learning AI, made for women already smart, already busy… works like the TV we grew up on: twenty-four-episode seasons, a new one every Wednesday."*
- **Refs:** none needed beyond style; motif = Chick Flicks CRT/VHS world `approved-assets/building-interiors/chick-flicks-video-store-interior.png` (comp mood only).
- **Prompt:** A chunky 90s CRT television on a shelf, screen glowing with a TV-guide grid; on-screen bug reads `LAiDIES · 24 EPISODES`. A VHS cassette leans against it, a rolled TV-guide beside. No people. Cozy living-room palette (warm cream + teal), vibrant. Reads instantly as "the TV we grew up on."
- **TRANSITION →** subject-to-subject to B03 (cut from TV to the two girlfriends).

## SCENE: over-coffee
- **File:** `trailer-b03-over-coffee-comic-v1-1920.png` · **Format:** full scene · **Time:** 0:22–0:44
- **Said:** *"…shorter than your commute… explained the way your sharpest girlfriend would explain it over coffee, with the pop culture you were raised on and none of the jargon."*
- **Refs:** setting `assets/town-characters/scenes/jojo-scene.png` + `approved-assets/interiors/blend-snap-corkboard.png` (comp only).
- **Prompt:** Two Y2K-styled women at a Blend & Snap corner café table, lattes in front of them, one leaning in explaining casually with a hand gesture, the other laughing — easy, warm, "smartest girlfriend" energy. Diverse, 90s-dressed. Steam curls off the coffee. Vibrant pink/teal café interior. Not the heroine specifically — everyday residents.
- **TRANSITION →** scene-to-scene to B04 (back to heroine, direct address).

## SCENE: fourth-wall-heroine
- **File:** `trailer-b04-fourth-wall-heroine-comic-v1-1920.png` · **Format:** full scene · **Time:** 0:44–1:05
- **Said:** *"I'm your heroine. [wry] I can't say that with a straight face either, but the promo guy insists."*
- **Refs:** heroine `…v28…1920.png` + expression sheet (wry) `…v20-locked-face-hair-clean-style.png`.
- **Prompt:** Medium shot of the heroine looking straight to camera with a wry, one-eyebrow-up expression, doing air-quotes with both hands. Behind her, a cheesy promo banner reads `YOUR HEROINE` in glittery TV-promo lettering (the joke). Speech grammar: a small caption box could hold "heroine" in air-quotes. Vibrant, self-aware. Locked hair.
- **TRANSITION →** action-to-action to B05.

## SCENE: reporting-back
- **File:** `trailer-b05-reporting-back-comic-v1-1920.png` · **Format:** full scene · **Time:** 1:05–1:25
- **Said:** *"I'm not an expert — a few steps ahead of you… I put off learning AI longer than I'll admit… now I'm walking the road one Wednesday at a time and reporting back."*
- **Refs:** heroine `…v28…1920.png`; setting `approved-assets/street-scenes/main-street-dusk.png` (comp).
- **Prompt:** The heroine a few steps ahead of us down MAiN Street, half-turned to glance back over her shoulder at camera, a little reporter's spiral notebook in one hand. "Come with me / I'll report back" body language. Warm dusk light, vibrant. Locked hair.
- **TRANSITION →** push-in to B06 emphasis burst (build to the line).
- **Motion (optional):** push-in — `-a-start` wide (her ahead on the street) → `-b-end` closer on her glance. **2 frames.**

## SCENE: emphasis-make-the-mistakes
- **File:** `trailer-b06-emphasis-make-the-mistakes-comic-v1-1920.png` · **Format:** emphasis burst · **Time:** 1:25–1:41
- **Said:** *"I make the mistakes so you can skip them. I do the reading so you don't have to."*
- **Prompt:** Text-only emphasis frame: `I MAKE THE MISTAKES SO YOU CAN SKIP THEM` in bold comic word-burst lettering (POW!-energy, per `reference/font-and-text-emphasis/`), on a saturated graphic ground (plum + gold star-burst). No characters. Locked emphasis-burst treatment.
- **TRANSITION →** flash-cut to the PROMO (hard tonal shift into announcer mode).

## CH.2 — THE PROMO (1:41 – 2:05)

## SCENE: season-arc-strip
- **File:** `trailer-b07-season-arc-strip-comic-v1-1920.png` · **Format:** comic STRIP (4 panels) · **Time:** 1:41–1:58
- **Said:** *"[tv announcer] On this season of ladies: she stops feeling behind. She learns to delegate to machines — without lowering her standards. She builds her own little squad of AI helpers. And she becomes the woman other people come to when the future gets confusing."*
- **Refs:** heroine `…v28…1920.png` in all 4 panels (consistent).
- **Prompt:** One horizontal 4-panel comic strip, thin gutters, caption boxes per panel. **P1** "stops feeling behind" — heroine standing tall, confident, a crowd blurred behind. **P2** "delegates to machines" — heroine handing a task to a friendly AI helper, arms crossed, standards intact. **P3** "builds her squad" — heroine with 2–3 little AI-helper sidekicks around her. **P4** "the woman others come to" — heroine mid-frame, others turning to her for answers. Same heroine, locked hair, vibrant. This is the recurring **THIS-WEEK/season-teaser** strip DNA.
- **TRANSITION →** scene-to-scene to the TITLE card.

## SCENE: title-welcome-to-sunnyvaile
- **File:** `trailer-b08-title-welcome-to-sunnyvaile-comic-v1-1920.png` · **Format:** text card (TITLE) · **Time:** 1:58–2:05
- **Said:** *"But first… the tour. This is the trailer: Welcome to Sunnyvale."*
- **Refs:** lettering echoes the recurring **TITLE CARD** treatment (`episode-recurring-segments.md` #3).
- **Prompt:** Bold comic TITLE lettering: small kicker `THE TRAILER` above a big `WELCOME TO SUNNYVAiLE` (`Ai` lit) on a saturated comic ground (sunset pink/gold rays). Locked title lettering style. No characters.
- **TRANSITION →** whip to B09 (into the name gag).

## CH.3 — THE NAME & THE BRAIN-vs-TOWN GAG (2:05 – 2:43)

## SCENE: the-name-gag
- **File:** `trailer-b09-the-name-gag-comic-v1-1920.png` · **Format:** text-forward scene · **Time:** 2:05–2:20
- **Said:** *"So — Sunnyvale. The 90s had Sunnydale, Bayside, and Capeside… You have sunnyVEIL. That's Sunny v-A-i-l-e. See what we did there?"*
- **Prompt:** A row of three generic 90s town-welcome signs reading `SUNNYDALE`, `BAYSIDE`, `CAPESIDE` (plain, slightly dated), an arrow → resolving into the glowing SUNNYVAiLE town sign with the **`Ai` lit up** and haloed. The gag is the reveal of the `Ai`. Vibrant, wink-y. Minimal/no people.
- **TRANSITION →** push-in / whip to B10 splash.

## SCENE: brain-vs-town
- **File:** `trailer-b10-brain-vs-town-comic-v1-1920.png` · **Format:** full-page comic (splash) · **Time:** 2:20–2:43
- **Said:** *"…everything about AI looked like a stock photo of a glowing blue brain. And I refused to spend a year of Wednesdays somewhere that ugly. So we built a town instead…"*
- **Refs:** RIGHT side setting `approved-assets/town-scenes-and-map/sunnyvaile-tourism-overview-sunset.png` (comp).
- **Prompt:** A split full-page splash. **LEFT:** the cold, ugly cliché "glowing blue brain" stock image, desaturated cyan, a big red comic ✗ slapped over it. **A bold arrow crosses the gutter →** **RIGHT:** warm, sunny SUNNYVAiLE town overview, saturated pinks/golds, alive and inviting. The signature concept gag — ugly-AI vs. our-town. Splash/bleed treatment (biggest beat so far).
- **TRANSITION →** scene-to-scene into the era montage.

## CH.4 — THE ERA THAT RAISED US (2:43 – 3:16)

## SCENE: era-montage
- **File:** `trailer-b11-era-montage-comic-v1-1920.png` · **Format:** full-page comic (MONTAGE, 6 panels) · **Time:** 2:43–3:13
- **Said:** *"…furnished with the entire era that raised us. Call it 1990 to 2010. Boy bands and girl groups. Sleepover games. Hair full of butterfly clips. Calling in to the radio to request a song so you could record it on cassette. The glory days of 24-episode seasons…"*
- **Prompt:** One full comic PAGE, 6 mini-panels (montage, compress-time), caption `THE ERA THAT RAISED US`. **P1** a boy-band/girl-group wall poster + a cassette. **P2** a sleepover game — girls cross-legged on the floor with a paper cootie-catcher. **P3** extreme close-up of butterfly-clipped hair. **P4** a hand dialing a landline, finger poised on a tape-deck RECORD button. **P5** a stack of VHS tapes = "a 24-episode season." **P6** a small SUNNYVAiLE detail tying it together. Vibrant Y2K palette throughout, nostalgic. Clean Z-path grid.
- **TRANSITION →** montage settles into B12 tagline burst.

## SCENE: tagline-girl-power-machine-power
- **File:** `trailer-b12-tagline-girl-power-machine-power-comic-v1-1920.png` · **Format:** emphasis burst · **Time:** 3:13–3:16
- **Said:** *"That era wired us… Because Sunnyvale is where Girl Power meets Machine Power."*
- **Prompt:** Emphasis card: `GIRL POWER MEETS MACHINE POWER` (the official town tagline, [[girl-power-machine-power-tagline]]) in bold comic lettering, a butterfly-clip motif fused with a circuit-trace motif behind it. Saturated pink + teal + gold. No characters.
- **TRANSITION →** pull-out to the wide town establishing (B13).

## CH.5 — "I LIVE HERE" & THE TEACHING METHOD (3:16 – 4:58)

## SCENE: town-establishing-wide
- **File:** `trailer-b13-town-establishing-wide-comic-v1-1920.png` · **Format:** full scene (wide establishing) · **Time:** 3:16–3:29
- **Said:** *"Analogies that stick. In a fictional town from an era we know and love… Ladies is the show, Sunnyvale is where every episode takes place."*
- **Refs:** `approved-assets/town-scenes-and-map/sunnyvaile-tourism-overview-sunset.png` + `sunnyvaile-main-street-walk-panorama.png` (comp).
- **Prompt:** A wide establishing shot of the whole SUNNYVAiLE skyline / MAiN Street stretch, sunny, all the pastel storefronts visible, gentle low-angle so the town feels welcoming. Anchors "where every episode takes place." Aspect-to-aspect calm. Vibrant. Can be a **pan** in motion (1 wide panel).
- **TRANSITION →** scene-to-scene (day → night) to B14.

## SCENE: i-live-here
- **File:** `trailer-b14-i-live-here-comic-v1-1920.png` · **Format:** full scene · **Time:** 3:29–3:52
- **Said:** *"And I live here — actually live here. I found this place at 11 p.m. on a Tuesday, looking for something else. Most residents do."*
- **Refs:** heroine `…v28…1920.png`; setting Delta LAi Nu exterior `assets/sunnyvaile-buildings/y2k-v3/10-delta-lai-nu-sorority-house.webp` + `approved-assets/street-scenes/wisteria-lane-morning.png` (retimed to night, comp).
- **Prompt:** The heroine on the Delta LAi Nu porch at night, warm window-glow spilling out, arriving late with a bag — cozy "I found it at 11 p.m." feeling. Night palette but still saturated (deep teal sky, warm gold windows), not muted. Locked hair.
- **TRANSITION →** subject-to-subject to the life strip.

## SCENE: life-in-these-streets-strip
- **File:** `trailer-b15-life-in-these-streets-strip-comic-v1-1920.png` · **Format:** comic STRIP (3 panels) · **Time:** 3:52–4:15
- **Said:** *"My card's in my wallet, my closet's upstairs… the story happens in these streets: the late-night research at the library, the coffee at my corner table, the songs on the radio."*
- **Refs:** heroine `…v28…1920.png`; **P1** `approved-assets/residence-card-and-avatars/residence-card-background-v1.png`; **P2** `approved-assets/building-interiors/library-reading-room.png`; **P3** `assets/town-characters/scenes/jojo-scene.png` + a radio.
- **Prompt:** One 3-panel strip. **P1** a resident card tucked in a wallet (close-up, `@handle` visible). **P2** the heroine at the Town Library after midnight, lamp-lit, books open (late-night research). **P3** her corner coffee table with a latte and a little radio playing. Caption-box connective narration. Vibrant, warm-night palette.
- **TRANSITION →** scene-to-scene to B16 concept splash.

## SCENE: every-building-is-a-page
- **File:** `trailer-b16-every-building-is-a-page-comic-v1-1920.png` · **Format:** full-page comic (concept) · **Time:** 4:15–4:35
- **Said:** *"Every building is a page. Walking in is just clicking. And the town remembers your visits — hold that thought."*
- **Prompt:** Concept full-page: a SUNNYVAiLE storefront whose facade literally IS an open book page — the door is a turning page, the awning a chapter heading — with a hand/cursor clicking it open. Playful "building = page = click." Vibrant. One clean splash panel.
- **TRANSITION →** whip to B17 emphasis.

## SCENE: emphasis-town-is-the-method
- **File:** `trailer-b17-emphasis-town-is-the-method-comic-v1-1920.png` · **Format:** emphasis burst · **Time:** 4:35–4:47
- **Said:** *"But here's what I actually need you to hear… The town IS the teaching method."*
- **Prompt:** Emphasis card: `THE TOWN IS THE TEACHING METHOD` in bold comic lettering on a saturated plum/gold ground, a subtle town-silhouette behind the type. No characters.
- **TRANSITION →** pull-out to the echo-wheel diagram.

## SCENE: echo-wheel-worlds-work
- **File:** `trailer-b18-echo-wheel-worlds-work-comic-v1-1920.png` · **Format:** full-page comic (diagram) · **Time:** 4:47–4:58
- **Said:** *"Every episode teaches one concept. The study pack reinforces it. The song turns it into an earworm. The pop quiz tests it. The games make you practice it. The community pressure-checks it… We built a world because worlds work."*
- **Prompt:** A full-page "echo wheel" diagram: ONE concept glowing at the center, ripples radiating outward to six labeled town icons — `EPISODE` · `STUDY PACK` · `SONG` · `QUIZ` · `GAMES` · `COMMUNITY` — each a tiny comic building/object. Caption `WORLDS WORK`. Clean, legible, vibrant infographic-in-comic-style. No faces.
- **TRANSITION →** scene-to-scene to CH.6.

## CH.6 — WHAT WEDNESDAY MEANS (4:58 – 6:22)

## SCENE: on-wednesdays-we-do-ai
- **File:** `trailer-b19-on-wednesdays-we-do-ai-comic-v1-1920.png` · **Format:** emphasis / full scene · **Time:** 4:58–5:20
- **Said:** *"I keep saying Wednesday… on Wednesdays we do AI (obviously)…"*
- **Refs:** heroine `…v28…1920.png` + 2–3 friends.
- **Prompt:** The heroine and 2–3 friends together in coordinated pink (a knowing Mean Girls riff), grinning to camera, with a big burst `ON WEDNESDAYS WE DO AI` in comic lettering above them. Vibrant pinks. Locked hair on heroine. Fun, punchy.
- **TRANSITION →** action-to-action to B20.

## SCENE: town-dresses-for-wednesday
- **File:** `trailer-b20-town-dresses-for-wednesday-comic-v1-1920.png` · **Format:** full scene · **Time:** 5:20–5:45
- **Said:** *"A new episode drops every Wednesday, and the town dresses for it: new anthem on the radio, new study pack at the coffee shop, new charms hidden around town… (we might even wear pink!)"*
- **Refs:** setting `approved-assets/street-scenes/main-street-golden.png` (comp).
- **Prompt:** Lively MAiN Street on new-episode day: a `NEW EPISODE` banner strung across the street, a radio blasting the anthem (music notes), a fresh study pack on the café table, residents in pink milling about. Busy, celebratory, vibrant. The town "dressed up."
- **TRANSITION →** scene-to-scene to B21.

## SCENE: nothing-expires
- **File:** `trailer-b21-nothing-expires-comic-v1-1920.png` · **Format:** full scene · **Time:** 5:45–6:10
- **Said:** *"But the town is open every day, and nothing expires… the tapes stay on the shelf at the rental store forever — catch up at your own pace, binge a little, or slow down…"*
- **Refs:** `approved-assets/interiors/chick-flicks-shelf.png` + `approved-assets/building-interiors/chick-flicks-video-store-interior.png`.
- **Prompt:** A Chick Flicks video-store shelf where every episode is a tape lined up in genre aisles; a hand reaching for the `EP 1` tape. Cozy "come back anytime, nothing expires" warmth. Vibrant teal/pink store interior.
- **TRANSITION →** action-to-action to B22.

## SCENE: lead-in-to-tours
- **File:** `trailer-b22-lead-in-to-tours-comic-v1-1920.png` · **Format:** full scene · **Time:** 6:10–6:22
- **Said:** *"Wednesday is when the new thing arrives. Every other day is yours. But if you want to get the most out of Sunnyvale, do one of the weekly tours… You might even meet some new friends."*
- **Refs:** heroine `…v28…1920.png`; map `approved-assets/town-scenes-and-map/sunnyvaile-town-map-v9-canon.png` (comp).
- **Prompt:** The heroine gesturing toward a hand-drawn SUNNYVAiLE town map on an easel/wall, "let me show you around" body language, mid-turn to us. Warm, inviting. Locked hair. Sets up the two-tours section.
- **TRANSITION →** push-in to the map reveal.

## CH.7 — THE TWO TOURS (6:22 – 7:03)

## SCENE: tour-map-reveal
- **File:** `trailer-b23-tour-map-reveal-comic-v1-1920.png` · **Format:** full-page comic (map) · **Time:** 6:22–6:35
- **Said:** *"There are two types of tours in Sunnyvale and both count."*
- **Refs:** `approved-assets/town-scenes-and-map/sunnyvaile-town-map-locked.png` / `sunnyvaile-town-map-v9-canon.png` (comp — render comic).
- **Prompt:** A full illustrated SUNNYVAiLE map, top-down comic style, a dotted walking route threading through town, caption `TWO WAYS TO TOUR`. Warm parchment + vibrant building icons. No faces. Bird's-eye overview.
- **TRANSITION →** subject-to-subject to B24.

## SCENE: express-4-stops
- **File:** `trailer-b24-express-4-stops-comic-v1-1920.png` · **Format:** text card (icon set) · **Time:** 6:35–6:50
- **Said:** *"The Express Tour is four stops: the week's episode; the study pack, the quiz, and the song."*
- **Prompt:** A clean icon-set card titled `EXPRESS TOUR` with four labeled comic icons in a row: a VHS **tape** (episode), a **study pack** folder, a **quiz** sheet, a **45 record** (song). Bold, legible, vibrant. No faces.
- **TRANSITION →** scene-to-scene to B25.

## SCENE: full-8-stops-tour-guide
- **File:** `trailer-b25-full-8-stops-tour-guide-comic-v1-1920.png` · **Format:** full-page comic (map + character) · **Time:** 6:50–7:03
- **Said:** *"The Full Tour is the loop — eight stops through town, all tracked by your Tour Guide who ticks each stop the moment you show up. Finish all eight before next Wednesday and you bank an extra wish with the Fairy Godmother. [dry] It's the nineties. Just go with it."*
- **Refs:** map as B23; **Tour Guide has NO locked design — see FLAG 2.** Render as a friendly Y2K guide with a lanyard + clipboard, pending a face ruling.
- **Prompt:** The town map with the 8-stop loop highlighted (numbered 1–8), and a friendly Tour Guide character in the foreground ticking a clipboard, a banked-wish sparkle floating beside stop 8. Vibrant, cheerful. (Guide design is provisional — flag.)
- **TRANSITION →** scene-to-scene + caption box `STOP 1` into CH.8.

## CH.8 — THE FULL TOUR, 8 STOPS (7:03 – 12:23)
*Each stop opens with a `STOP N · NAME` caption box (scene-to-scene grammar) and shows the ACTIVITY, not the building.*

## SCENE: newsstand-plain-english
- **File:** `trailer-b26-newsstand-plain-english-comic-v1-1920.png` · **Format:** full scene (activity) · **Time:** 7:03–7:25
- **Said:** **Stop 1 · NewsStand** — *"first door on Main Street. The week's AI headlines, translated into actual English: what happened, why it matters to your job, no doom, no hype… five minutes and you're the informed one in the meeting."*
- **Refs:** NewsStand exterior `assets/sunnyvaile-buildings/y2k-v3/02-sunnyvaile-newsstand.webp` / `approved-assets/buildings-storefronts/02-sunnyvaile-newsstand.png` (backdrop, comp).
- **Prompt:** A resident at the NewsStand counter holding a newspaper headlined `AI, IN PLAIN ENGLISH`; a jargon-y headline in the rack is crossed out and swapped for a plain-English one. Caption box `STOP 1 · NEWSSTAND`. Vibrant morning MAiN Street backdrop. Activity-forward, not a storefront portrait.
- **TRANSITION →** scene-to-scene + caption `STOP 2`.

## SCENE: chick-flicks-aisles
- **File:** `trailer-b27-chick-flicks-aisles-comic-v1-1920.png` · **Format:** full scene (activity) · **Time:** 7:25–7:40
- **Said:** **Stop 2 · Chick Flicks** — *"our video rental store. Every episode lives here like a tape on a shelf, sorted into genre aisles you can actually browse. Grab this week's…"*
- **Refs:** `approved-assets/building-interiors/chick-flicks-video-store-interior.png` + `approved-assets/interiors/chick-flicks-shelf.png`.
- **Prompt:** Interior of Chick Flicks: genre-labeled shelves packed with episode tapes, a hand pulling this week's tape off the shelf. Caption `STOP 2 · CHICK FLICKS`. Cozy teal/pink video-store palette, vibrant.
- **TRANSITION →** aspect-to-aspect to the back room (B28).

## SCENE: screening-room
- **File:** `trailer-b28-screening-room-comic-v1-1920.png` · **Format:** full scene · **Time:** 7:40–7:55
- **Said:** *"…there's a screening room in the back where episodes play with the pictures — the premiere is screening now."*
- **Refs:** VHS/CRT mood `approved-assets/building-interiors/chick-flicks-video-store-interior.png` (comp).
- **Prompt:** A cozy back-room screening room: CRT/projector glow, a red curtain, a couple of seats, a marquee/placard reading `NOW SCREENING · THE PREMIERE`. Warm dark interior but saturated (deep red + warm glow), not muted. Little/no people.
- **TRANSITION →** scene-to-scene + caption `STOP 3`.

## SCENE: blend-snap-study-pack
- **File:** `trailer-b29-blend-snap-study-pack-comic-v1-1920.png` · **Format:** full scene (activity) · **Time:** 7:55–8:12
- **Said:** **Stop 3 · Blend & Snap** — *"the coffee shop… This is where the week's study pack lives: the class notes — a cheat sheet of what the episode taught and what to remember for the quiz…"*
- **Refs:** `assets/town-characters/scenes/jojo-scene.png` + `approved-assets/interiors/blend-snap-corkboard.png`.
- **Prompt:** A café corner table with the `STUDY PACK` spread open — cheat-sheet "class notes" pages fanned out, a latte beside them. Caption `STOP 3 · BLEND & SNAP`. Warm, studious, vibrant café palette.
- **TRANSITION →** action-to-action (close in on the pack) to B30.

## SCENE: trading-card-pack
- **File:** `trailer-b30-trading-card-pack-comic-v1-1920.png` · **Format:** full scene (close activity) · **Time:** 8:12–8:30
- **Said:** *"…plus this week's trading card pack. Rip it open, flip each card, learn a concept. Old packs stay on the back shelf…"*
- **Refs:** concept-card look `operations/codex-prompts/concept-cards-episode-04-founding-mothers.md` (style of the cards, comp).
- **Prompt:** Close-up: two hands ripping open a foil trading-card pack, concept cards fanning out mid-air, each card a little illustrated AI concept. Energetic motion-lines on the tear. Vibrant, tactile.
- **TRANSITION →** action-to-action to B31.

## SCENE: heroine-writing-try-on
- **File:** `trailer-b31-heroine-writing-try-on-comic-v1-1920.png` · **Format:** full scene · **Time:** 8:30–8:45
- **Said:** *"I write half this show from the corner table. The pack also hands you the try-on: each week's ten-minute exercise… try the lesson on one small, real task from your life."*
- **Refs:** heroine `…v28…1920.png`; setting `assets/town-characters/scenes/jojo-scene.png`.
- **Prompt:** The heroine at her Blend & Snap corner table, laptop open + notebook, a `TRY-ON` card propped beside her, mid-writing, glancing up. Warm café light. Locked hair. "I write the show here" intimacy.
- **TRANSITION →** whip to B32 emphasis.

## SCENE: emphasis-do-the-try-on
- **File:** `trailer-b32-emphasis-do-the-try-on-comic-v1-1920.png` · **Format:** emphasis burst · **Time:** 8:45–8:52
- **Said:** *"If you only do one thing beyond listening, do the try-on. It's why the pack exists."*
- **Prompt:** Emphasis card: `DO THE TRY-ON` in big bold comic lettering, saturated pink/gold burst, small "10 min" tag. No faces.
- **TRANSITION →** scene-to-scene + caption `STOP 4`.

## SCENE: high-pop-quiz
- **File:** `trailer-b33-high-pop-quiz-comic-v1-1920.png` · **Format:** full scene (activity) · **Time:** 8:52–9:08
- **Said:** **Stop 4 · SUNNYVAiLE High** — *"up Schoolhouse Road. The pop quiz — ten questions plus 2 bonus… your score banks butterfly clips in a jar in your closet. Best score counts, so you can always retake."*
- **Refs:** `approved-assets/building-interiors/sunnyvaile-high-pop-quiz.png` + `sunnyvaile-high-hallway.png`; jar motif `approved-assets/stickers-charms/w1-butterfly-clip.png`.
- **Prompt:** A pop-quiz Scantron-style sheet (10 + 2 bonus) beside a butterfly-clip jar filling up with clips, school lockers behind. Caption `STOP 4 · SUNNYVAiLE HIGH`. Bright school palette, vibrant.
- **TRANSITION →** aspect-to-aspect to the gym (B34).

## SCENE: book-fair
- **File:** `trailer-b34-book-fair-comic-v1-1920.png` · **Format:** full scene (era detail) · **Time:** 9:08–9:19
- **Said:** *"And every four weeks, the gym hosts a book fair. Yes, that kind. Yes, with posters."*
- **Refs:** `approved-assets/interiors/high-gym-book-fair.png` + `approved-assets/building-interiors/sunnyvaile-high-book-fair.png`.
- **Prompt:** A Scholastic-style gym book fair: folding tables of books, the spinny POSTER rack front-and-center, banners overhead. Pure 90s-nostalgia. Vibrant, busy. Little/no named characters.
- **TRANSITION →** scene-to-scene + caption `STOP 5`.

## SCENE: mme-claio-reading
- **File:** `trailer-b35-mme-claio-reading-comic-v1-1920.png` · **Format:** full scene (character) · **Time:** 9:19–9:33
- **Said:** **Stop 5 · Free time** — *"my favourite kind of structure… Get your cards read at Madame Cleo's; she does walk-ins… the read, the message, and the move. Her fortunes do NOT disappoint!"*
- **Refs (face):** `assets/building-interiors/mme-claio-reading-room.jpg` (curation=CORRECT — pull her face from here; ⛔ NOT `madame-claio-portrait-v3`, curation=unused) + town scene `assets/town-characters/scenes/mme-claio-scene.png`; setting = that reading room. ⚠ **Ali: confirm the locked Mme CLAi-O face.** Render in the locked comic style.
- **Prompt:** Mme CLAi-O mid card-read at her parlor table, cards + crystal on the cloth, warm cozy fortune-teller glow, welcoming expression. Caption `STOP 5 · FREE TIME`. Her face from the v3 portrait refs, comic-styled. Saturated jewel-tone parlor.
- **TRANSITION →** subject-to-subject to B36.

## SCENE: dream-phone
- **File:** `trailer-b36-dream-phone-comic-v1-1920.png` · **Format:** full scene (era detail) · **Time:** 9:33–9:48
- **Said:** *"Pick up the Dream Phone and call somebody in 1999."*
- **Refs:** `approved-assets/dream-phone/dream-phone-toy.png` + `dream-phone-cordless.png`; booth `assets/sunnyvaile-buildings/y2k-v3/17-dream-phone-booth.webp`.
- **Prompt:** A translucent 90s toy/cordless Dream Phone, someone dialing it, dreamy `1999` lettering floating in a thought-balloon halo. Y2K candy palette (translucent pink/purple), vibrant, playful.
- **TRANSITION →** subject-to-subject to B37.

## SCENE: fairy-godmother
- **File:** `trailer-b37-fairy-godmother-comic-v1-1920.png` · **Format:** full scene (character) · **Time:** 9:48–10:05
- **Said:** *"Ask the Fairy Godmother anything — she's the town's actual AI assistant, a real one: bring the question, she brings the answer. And yes, that wish you banked? Spent with her."*
- **Refs (face):** `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` (⭐ THE approved FG — dark curls, plum star-robe, silver wand; ⛔ NOT the dead tarot `laidy-fairy-godmother-portrait-v3`, curation=unused) + wand motif `approved-assets/town-characters/fairy-wand.png`; FG house setting `assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/11-fairy-godmother-house-v6.jpg` (the live/approved house). Render her FACE in the locked comic style.
- **Prompt:** The FAiRY Godmother granting an answer/wish, wand raised, a sparkle sweep arcing out, warm knowing smile — "the town's real AI assistant." Caption/label ties her to answers. Her face from the v3 portrait ref, comic-styled. Saturated magical glow (gold + teal sparkle). NOTE: personify the character, but per [[ai-is-it-not-her]] the *AI itself* is "it" — she is a town character who fronts the assistant.
- **TRANSITION →** pull-out to the I-spy town (B38).

## SCENE: charm-hunt
- **File:** `trailer-b38-charm-hunt-comic-v1-1920.png` · **Format:** full-page comic (I-spy) · **Time:** 10:05–10:16
- **Said:** *"Or go hunting: every week, seven charms hide in pictures around town. Spot one, click it, and it's added to your charm bracelet in your closet."*
- **Refs:** charms `approved-assets/stickers-charms/w1-butterfly-clip.png`, `w1-pink-gem.png`, `w1-crescent-moon.png`; bracelet `approved-assets/stickers-charms/charm-bracelet-base.png`.
- **Prompt:** A busy I-spy town illustration with ONE tiny glinting charm hidden in the scene, a cursor about to click it; an inset panel shows a charm bracelet gaining that charm. "Seven charms hide each week" energy. Vibrant, detailed, findable. Bird's-eye-ish.
- **TRANSITION →** scene-to-scene + caption `STOP 6`.

## SCENE: maikeover-glow-up
- **File:** `trailer-b39-maikeover-glow-up-comic-v1-1920.png` (+ transformation frames below) · **Format:** full-page comic (TRANSFORMATION) · **Time:** 10:16–10:35
- **Said:** **Stop 6 · MAiKEOVER on MAiN** — *"This is where you get your Sunnyvale glow up… your residence card."*
- **Refs:** heroine `…v28…1920.png`; wand `approved-assets/town-characters/fairy-wand.png`; setting `approved-assets/building-interiors/maikeover-on-main-salon-interior.png`; card `approved-assets/residence-card-and-avatars/residence-card-background-v1.png`.
- **Prompt (keyframe):** A makeover-chair before→after in the MAiKEOVER salon, a fresh shiny `RESIDENCE CARD` being minted (`@handle` slot). Caption `STOP 6 · MAiKEOVER ON MAiN`. Vibrant salon (pink/gold/mirror-lights).
- **MOTION — reusable ✨ TRANSFORMATION (9–11 frames, per `comic-animation-frame-spec.md`):** full-body throughout.
  `-a-corporate` heroine in plain corporate look → `-b-wand-raise` / `-c-wand-arc` / `-d-wand-contact` (FAiRY G. wand
  in-betweens, ≥3 so it's smooth) → `-e-sparkle` / `-f-poof` (magic building) → `-g-mid-transform` (outfit actually
  morphing mid-swap) → `-h-clearing` / `-i-clearing2` → `-j-reveal` heroine in the SUNNYVAiLE look. **Frames a–i are
  SHARED/reused across episodes; only `-j-reveal` changes per episode.** ⚠ Reveal HAIR = locked kit (6 butterfly
  clips, half-up waves), NOT a single vertical line. ~10 images.
- **TRANSITION →** action-to-action to B40 (card held up).

## SCENE: tourist-to-resident
- **File:** `trailer-b40-tourist-to-resident-comic-v1-1920.png` · **Format:** full scene / concept card · **Time:** 10:35–10:59
- **Said:** *"The town's version of a membership, the two most useful minutes on the tour. It's free. You pick a handle… everything banks. Without a card you're a tourist… With one, you're a resident."*
- **Refs:** card `approved-assets/residence-card-and-avatars/residence-card-background-v1.png` + avatars from `approved-assets/residence-card-and-avatars/claires-avatars/`.
- **Prompt:** The residence card held up to camera with an `@handle`, and a `TOURIST` rubber-stamp crossed out → re-stamped `RESIDENT ★` ([[resident-not-member]]). Clear before/after of status. Vibrant, celebratory.
- **TRANSITION →** scene-to-scene + caption `STOP 7`.

## SCENE: bronze-businesswomens-special
- **File:** `trailer-b41-bronze-businesswomens-special-comic-v1-1920.png` · **Format:** full scene (activity) · **Time:** 10:59–11:25
- **Said:** **Stop 7 · BRONZE AiGE** — *"Happy hour. The bar serves the Businesswomen's Special — a paper fortune teller, the kind you folded in fifth grade, picks your drink of the week. This is your reminder to book that overdue happy hour with the girls…"*
- **Refs:** `approved-assets/bronze-aige-bws/businesswomen-special-fortune-teller-open-v1.png` + `businesswomen-special-table.png`; interior `approved-assets/building-interiors/bronze-aige-interior.png` / `bronze-aige-crowd-lounge.png`.
- **Prompt:** A paper cootie-catcher fortune-teller hovering over the bar, mid-pick, choosing a cocktail (the "Businesswomen's Special"); girls clinking glasses in the warm-lit Bronze AiGE background. Caption `STOP 7 · BRONZE AiGE`. Saturated bronze/amber bar glow, vibrant.
- **TRANSITION →** scene-to-scene + caption `STOP 8`.

## SCENE: delta-lai-nu-rooms
- **File:** `trailer-b42-delta-lai-nu-rooms-comic-v1-1920.png` · **Format:** full scene (interior) · **Time:** 11:25–11:42
- **Said:** **Stop 8 · Delta LAi Nu** — *"the sorority house, on Wisteria Lane. The rooms live here — our members-only chat, a full hallway in three wings. Common rooms, where you post your wins and we cheer…"*
- **Refs:** exterior `assets/sunnyvaile-buildings/y2k-v3/10-delta-lai-nu-sorority-house.webp`; street `approved-assets/street-scenes/wisteria-lane-morning.png`.
- **Prompt:** Interior sorority-house hallway lined with doors (each door = a chat room), and through one open door a common room of girls cheering a posted "win" on the wall. Caption `STOP 8 · DELTA LAi Nu`. Warm cozy house palette, vibrant.
- **TRANSITION →** subject-to-subject to the room-types strip.

## SCENE: room-types-strip
- **File:** `trailer-b43-room-types-strip-comic-v1-1920.png` · **Format:** comic STRIP (3 panels) · **Time:** 11:42–11:58
- **Said:** *"Advice rooms, like Dear Ladies. Creative rooms, where mix CDs get traded and the Burn Book collects what didn't work — [dry] we keep receipts on our own mistakes."*
- **Refs:** mix CD `approved-assets/brand-logos/ksvl-cd-mini.png`; Burn Book look = the Ep3 section art `approved-assets/episode-section-art/section-burn-book-problem-v3.png` (comp).
- **Prompt:** One 3-panel strip. **P1** `DEAR LADIES` advice room — a letter/advice-column vibe. **P2** mix CDs being traded hand-to-hand. **P3** the `BURN BOOK` (of AI mistakes, per [[burn-book-not-true-canon]]) collecting what didn't work. Caption boxes label each. Vibrant.
- **TRANSITION →** scene-to-scene to B44.

## SCENE: girl-talk
- **File:** `trailer-b44-girl-talk-comic-v1-1920.png` · **Format:** full scene (activity) · **Time:** 11:58–12:12
- **Said:** *"And the feature of the house: Girl Talk, where you draw a card and take the dare. This is also where the weekly sign-off challenge lands."*
- **Refs:** board-game feel (Girl Talk / Dream Phone era); sorority interior `assets/sunnyvaile-buildings/y2k-v3/10-delta-lai-nu-sorority-house.webp` (comp).
- **Prompt:** Girls in a circle on the sorority-house floor playing a Girl-Talk-style board game, one drawing a dare card mid-reach, laughing. 90s slumber-party energy. Vibrant, warm.
- **TRANSITION →** push-in / pull-out up to the closet reveal.

## SCENE: closet-reveal
- **File:** `trailer-b45-closet-reveal-comic-v1-1920.png` · **Format:** full scene (payoff) · **Time:** 12:12–12:23
- **Said:** *"And upstairs? Your closet — where everything you've collected is on display. Your card. Your clips. Your charms. Your luminaries. End the loop there, and admire the shelf you're building."*
- **Refs:** card + avatars `approved-assets/residence-card-and-avatars/`; clips/charms `approved-assets/stickers-charms/`; bracelet `charm-bracelet-base.png`.
- **Prompt:** A lit display closet / trophy shelf showing it all: the resident card, a butterfly-clip jar, a charm bracelet, and small luminary portraits — everything the resident has collected, glowing on display. The payoff of the tour. Vibrant, proud, warm-lit.
- **TRANSITION →** scene-to-scene to CH.9.

## CH.9 — KSVL 99.9 (12:23 – 13:46)

## SCENE: ksvl-dj-sunnyv-booth
- **File:** `trailer-b46-ksvl-dj-sunnyv-booth-comic-v1-1920.png` · **Format:** full scene (character) · **Time:** 12:23–12:40
- **Said:** *"Now — the radio. I saved it because it's my favourite building in town… K-S-V-L, community radio, 99.9, at the end of Main Street — a full, functioning station."*
- **Refs (face):** comic test `assets/episodes/ep-04/pixel/ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png` (⭐ THE approved comic SunnyV — use this; ⛔ NOT `dj-sunnyv-scene`, curation=unused); booth `assets/building-interiors/ksvl-booth.jpg`.
- **Prompt:** DJ SunnyV at the KSVL mixing board, headphones on, leaning into the mic, an `ON AIR` sign lit and `99.9` on the dial. Caption ties to "my favourite building." Her face from the scene/comic-test refs, comic-styled. Saturated studio glow.
- **TRANSITION →** action-to-action to B47.

## SCENE: weather-traffic-gag
- **File:** `trailer-b47-weather-traffic-gag-comic-v1-1920.png` · **Format:** full scene (gag) · **Time:** 12:40–13:00
- **Said:** *"…DJ SunnyV between tracks, station jingles, weather and traffic reports for a town that has neither weather nor traffic, and commercials for the storefronts you just walked past."*
- **Refs (face):** DJ SunnyV as B46.
- **Prompt:** DJ SunnyV reading a "weather & traffic" report off a card, while the studio monitor behind her shows the joke: eternal cloudless sun + a totally empty street ("a town with neither"). Dry visual gag. Vibrant.
- **TRANSITION →** pull-out to the poster wall (B48).

## SCENE: ten-house-bands
- **File:** `trailer-b48-ten-house-bands-comic-v1-1920.png` · **Format:** full-page comic (poster wall) · **Time:** 13:00–13:20
- **Said:** *"The music is real and it's ours: ten house bands — every name is an AI joke you'll start catching around episode six — plus a new anthem every episode…"*
- **Refs (album art per band):** `approved-assets/albums/` — the 10 covers; band stickers `approved-assets/stickers-charms/band-*.png`.
- **Prompt:** A full-page wall of ten gig posters, one per house band, names legible ([[bands-roster-canon]] — verified): **The LAiDIES · The Bots · The Embeddings · The Overfits · The Predicts · The Recalls · The Regressions · Latent Space · Chain of Thought · Grand Ol' Query.** Comic-styled after the approved album covers. Dense, vibrant band-poster wall, Y2K palette. (Names now confirmed from the album/sticker set — render them; FLAG 4 resolved.)
- **TRANSITION →** subject-to-subject to B49.

## SCENE: mix-cd-stickers
- **File:** `trailer-b49-mix-cd-stickers-comic-v1-1920.png` · **Format:** full scene (era detail) · **Time:** 13:20–13:35
- **Said:** *"There are mix CDs you can flip over and read like it's your best friend's handwriting. There's a sticker rack, and your first one's free."*
- **Refs:** mix CD `approved-assets/brand-logos/ksvl-cd-mini.png` (+ color variants); stickers `approved-assets/stickers-charms/ksvl-*.png`.
- **Prompt:** A burned mix CD flipped to show a hand-lettered track list on the back (best-friend's-handwriting), beside a spinning sticker rack of KSVL stickers. Caption "your first one's free." Nostalgic, tactile, vibrant.
- **TRANSITION →** whip to B50 motto.

## SCENE: emphasis-learn-from-hooks
- **File:** `trailer-b50-emphasis-learn-from-hooks-comic-v1-1920.png` · **Format:** emphasis burst · **Time:** 13:35–13:46
- **Said:** *"The station has one belief… don't just learn from books. Learn from hooks."*
- **Refs:** motto oval `approved-assets/stickers-charms/ksvl-books-hooks-motto-oval.png`.
- **Prompt:** Emphasis card: `DON'T JUST LEARN FROM BOOKS. LEARN FROM HOOKS.` (the KSVL motto, [[ksvl-motto-canon]]) in bold comic lettering, a little radio/music-note motif, saturated teal/pink. No faces.
- **TRANSITION →** scene-to-scene to CH.10.

## CH.10 — STILL MORE TO FIND (13:46 – 15:08)

## SCENE: post-office-letter
- **File:** `trailer-b51-post-office-letter-comic-v1-1920.png` · **Format:** full scene (activity) · **Time:** 13:46–14:06
- **Said:** *"The post office writes you one letter a week — the episode, the pack, the quiz, the news, and the song, all in one envelope — and it ships gifts too: send a note, a charm, or a saint card to a friend."*
- **Refs:** `approved-assets/building-interiors/post-office-lobby.png` + `approved-assets/interiors/post-office-boxes.png`; gift = charm `approved-assets/stickers-charms/w1-*.png` / saint card `approved-assets/saints/`.
- **Prompt:** An open envelope spilling the week's contents (mini episode-tape, study pack, quiz, news, 45 record) on the Post Office counter, and a hand sending a wrapped gift (a charm / a saint card) off to a friend ([[gifting-mechanic-locked]]). Warm civic-90s Post Office palette, vibrant.
- **TRANSITION →** subject-to-subject to B52.

## SCENE: mall-flair
- **File:** `trailer-b52-mall-flair-comic-v1-1920.png` · **Format:** full scene (era detail) · **Time:** 14:06–14:09
- **Said:** *"The mall sells flair for your card."*
- **Refs:** `approved-assets/building-interiors/the-mall-atrium-storefronts.png`; flair = `approved-assets/residence-card-and-avatars/claires-avatars/`.
- **Prompt:** A Claire's-style mall kiosk stocked with pins, charms, and stickers — "flair" for the residence card — a hand browsing. Quick, punchy (short beat). Vibrant mall palette.
- **TRANSITION →** subject-to-subject to B53.

## SCENE: mayor-deb
- **File:** `trailer-b53-mayor-deb-comic-v1-1920.png` · **Format:** full scene (character) · **Time:** 14:09–14:40
- **Said:** *"Town Hall is run by Mayor Deb… Deb worked at the post office until 1999, when her coworkers put her name on the ballot as a joke. She won. [dry] She keeps winning… also our Patron Saint of Loop Me Out. Her campaign posters alone are worth the trip."*
- **Refs (face):** `assets/town-characters/scenes/mayor-deb-scene.png` (curation=CORRECT) + comic test `assets/episodes/ep-04/pixel/ep04-character-test-mayor-deb-comic-v3-no-halftone-1920.png` (⛔ NOT `mayor-deb-portrait-v3`); setting `assets/building-interiors/town-hall-deb-desk.jpg`; her wall poster = the real Die Hard campaign poster `assets/printables/deb-1999-campaign-poster-yippee-ki-ai-hr-redacted.png` (do not invent one).
- **Prompt:** Mayor Deb at Town Hall, delighted-and-a-little-surprised (the "won as a joke, keeps winning" energy), surrounded by her own campaign posters (`DEB FOR MAYOR`, `LOOP ME OUT`). Her face from the v3 portrait refs, comic-styled. Note canon: pre-mayor she worked the Post Office ([[deb-pre-mayor-post-office]]); posters split 1999≠2003 ([[deb-poster-canon-split]]) — use the 1999 campaign look. Vibrant civic palette.
- **TRANSITION →** page-turn / scene-to-scene up to Lantern Hill (tone shifts more reverent).

## SCENE: luminairy
- **File:** `trailer-b54-luminairy-comic-v1-1920.png` (+ ignite frames) · **Format:** full-page comic · **Time:** 14:40–15:08
- **Said:** *"And up on Lantern Hill, the Luminairy hangs portraits of the women (and one rose) in three wings: the patron saints… the real-life mavens who built and questioned this field… and the trailblazers shipping the frontier right now. Take the walk. You'll have favourites by Friday."*
- **Refs:** hall `approved-assets/building-interiors/luminairy-nave.png` + `approved-assets/town-scenes-and-map/sunnyvaile-tourism-luminairy-lantern-hill-blue-hour.png`; **wing 1 (saints)** `assets/saints-v2/` + `assets/saints/` (Cher, Elle, Buffy, Miranda, Dolly, Regina George…); **wing 2 (mavens)** `assets/mavens/y2k-stained-glass-v3-finished/` (Ada, Grace, Hedy, Fei-Fei, Timnit, Joy, Emily Bender, Kate Crawford…); **wing 3 (trailblazers)** `approved-assets/builders/` (Daniela Amodei, Mira Murati, Lila Ibrahim, Amanda Askell, Fidji Simo, Chelsea Finn).
- **Prompt:** The lantern-lit LUMINAiRY hall, three glowing wings of stained-glass-style portraits — saints · mavens · trailblazers — receding down the nave, reverent low-angle. "One rose" = David Rose among them (canon nod). This is the one moodier/reverent beat: cooler jewel-tones (deep teal/plum + gold lantern glow) but STILL saturated, never washed out. Full-page splash.
- **MOTION — WINDOWS/PORTRAITS IGNITE IN SEQUENCE (3 frames, per `comic-animation-frame-spec.md`):**
  `-a-start` dim hall → `-b-mid` first wing of portraits lit as we pass → `-c-end` all three wings blazing. **3 images.**
- **TRANSITION →** pull-out / scene-to-scene to the close.

## CH.11 — CLOSE (15:08 – 16:00)

## SCENE: brand-card-ladies-ai
- **File:** `trailer-b55-brand-card-ladies-ai-comic-v1-1920.png` · **Format:** text card · **Time:** 15:08–15:30
- **Said:** *"Everything I just described lives at ladies dot A I. That's 'ladies' spelled with an i in the middle: L, A, i, D, I, E, S. New episode every Wednesday…"*
- **Refs:** wordmark `approved-assets/brand-logos/laidies-wordmark-final-b-light.png` / `…-b-dark.png`; i-dot `approved-assets/brand-logos/laidies-i-dot-final-light.svg`.
- **Prompt:** A clean brand card: the `ladies.ai` wordmark with the `Ai` accent and the **i-dot rendered LIT/flashing** ([[logo-flashing-dot-locked]]), sub-line `NEW EPISODE EVERY WEDNESDAY`. Saturated brand ground (plum + gold). No faces.
- **TRANSITION →** scene-to-scene to the sign-off.

## SCENE: sign-off
- **File:** `trailer-b56-sign-off-comic-v1-1920.png` · **Format:** full scene + emphasis · **Time:** 15:30–15:52
- **Said:** *"So remember, ladies: you don't have to know anything yet. You just have to show up. [warm] See you next Wednesday… in Sunnyvale."*
- **Refs:** heroine `…v28…1920.png`; setting `approved-assets/street-scenes/main-street-golden.png` (golden hour).
- **Prompt:** The heroine, warm and open, waving on a golden-hour MAiN Street, with a hero word-burst `YOU DON'T HAVE TO KNOW ANYTHING YET — JUST SHOW UP` and small `See you next Wednesday… in SUNNYVAiLE`. This is the recurring **SIGN-OFF** treatment (`episode-recurring-segments.md` #11) — keep on-model. Locked hair. Vibrant golden palette.
- **TRANSITION →** flash-cut to announcer teaser (B57).

## SCENE: next-week-teaser
- **File:** `trailer-b57-next-week-teaser-comic-v1-1920.png` · **Format:** text/emphasis card · **Time:** 15:52–16:00
- **Said:** *"[tv announcer] And on the next episode of ladies: a man named Steve is called a visionary… and our heroine finally stops putting it off. Episode One: On Wednesdays We Use AI."*
- **Prompt:** A VHS/TV-promo `NEXT WEEK ON LAiDIES` card: `NEXT WEDNESDAY · EPISODE ONE — On Wednesdays We Use AI`, with a sly wink at "a man named Steve" (a small silhouetted "visionary" figure being over-praised). Recurring **NEXT WEEK ON** teaser treatment (`episode-recurring-segments.md` #12). Vibrant, tongue-in-cheek.
- **TRANSITION →** cut to end card.

## SCENE: end-card-dial-up
- **File:** `trailer-b58-end-card-dial-up-comic-v1-1920.png` · **Format:** text card (END) · **Time:** 16:00
- **Said:** *(town anthem outro)* — *"See you next Wednesday in Sunnyvale."*
- **Refs:** postcard vibe `assets/postcards/from-sunnyvaile/pc-dial-up.png`.
- **Prompt:** A dial-up-postcard end card: `DIAL UP TO SUNNYVAiLE · ladies.ai` with `SEE YOU NEXT WEDNESDAY`, a retro dial-up/modem + postcard motif. Warm, closing. Matches the cues.json end card. No faces.

---

## Notes / production
- **58 beats across ~16 min** (~1 image / 16s) — keeps the tour a *sequence*, not a storefront slideshow. Format
  spread: ~30 full scenes, ~9 full-page comics, ~4 comic strips, ~8 text/emphasis cards, ~7 era-detail vignettes.
- **Buildings appear only as ACTIVITY backdrops**, comp-referenced from `assets/sunnyvaile-buildings/y2k-v3/*.webp`
  and the approved interiors in `approved-assets/building-interiors/` + `approved-assets/interiors/`, rendered COMIC.
- **Reference discipline:** every character/place block above points at the **latest-approved** asset
  (`approved-assets/…` = the curated lookbook; the site serves the `assets/…` copies). Faces/settings from refs only —
  never restyle the ref; the *style* always comes from the 5 locked comic anchors in the header.
- **Every quote/fact preserved verbatim** from the narration (99.9 FM, "Girl Power meets Machine Power",
  "learn from hooks", ten house bands, seven charms, ten questions + 2 bonus, Deb's 1999 origin, ladies.ai spelling).
- **Motion beats** (B05 push-in, B13 pan, B39 transformation, B54 LUMINAiRY ignite) spell out frame sequences +
  counts per `comic-animation-frame-spec.md`; every other beat is a single static-hold keyframe.
- **Companion prompt file:** the storyboard previously pointed at `operations/codex-prompts/trailer-comic-image-batch.md`,
  which **does not exist**. This doc now IS the Codex-ready prompt source (SCENE blocks above). If a separate batch
  file is still wanted, generate it from these blocks — see FLAG 5.

### FLAGS / open questions
1. **Heroine's trailer host outfit.** Locked SUNNYVAiLE look = the v28 suit/plaid kit. Every heroine beat here
   defaults to v28 for host consistency, but [[heroine-appearance-canon]] says *a different outfit each week*.
   Confirm: one fixed host-signature outfit for the whole trailer (recommended), or rotate? All heroine SCENE
   blocks currently assume the fixed v28 signature.
2. **Tour Guide character (B25)** — narration names "your Tour Guide who ticks each stop"; **no locked design
   found** in assets. Rendered provisionally as a friendly Y2K guide w/ lanyard + clipboard. Needs a design ruling
   / face ref before final.
3. **Mme CLAi-O (B35)** — now has approved v3 portrait refs (`madame-claio-portrait-v3.png` +
   `…-crystal-phone-v3.png`); used those. Confirm v3 is the locked face (earlier memory flagged the portrait as pending).
4. **Ten house bands (B48)** — RESOLVED: names verified from `approved-assets/albums/` + `stickers-charms/band-*`
   (The LAiDIES, The Bots, The Embeddings, The Overfits, The Predicts, The Recalls, The Regressions, Latent Space,
   Chain of Thought, Grand Ol' Query). Block now renders the real names. Confirm spellings once more against
   [[bands-roster-canon]] if a name looks off.
5. **Mavens portrait version (B54)** — `approved-assets/README.md` notes `assets/mavens/y2k-stained-glass-v2` is
   what the site currently serves, while `y2k-stained-glass-v3-finished` is newer-but-unreferenced. Block points at
   v3-finished; confirm which maven set is canon for the LUMINAiRY wing.
6. **Supersession** — this comic storyboard overrides both the "keep the trailer painterly" note in
   `ep04-rest-image-batch.md` AND the building-slideshow `episode-trailer-cues.json` cue sheet (mapped in the
   COVERAGE CHECKLIST). Confirm the painterly note can be retired and the cue sheet re-pointed at these comic renders.
