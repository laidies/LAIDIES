# CHARACTER COMIC PORTRAITS — graphic-novel treatment (hand to Codex, 2026-07-20)

**Why:** the intro (and episodes + cards) need every town character in the **locked comic / graphic-novel
style**. DJ SunnyV, Mayor Deb, and the Heroine are already comic. These **11 are painterly-only** and need a
comic portrait. Each becomes that character's LOCKED comic look — reused in the intro split-screens, episode
scenes, and cards. Render each from her painterly portrait for **likeness only** (face, hair, wardrobe, skin
tone) — re-draw in comic, do NOT copy the painterly rendering.

**Output dir:** `assets/town-characters/comic/` · file: `{name}-comic-v1.png`.

---

## ⚠️ WHY THE FIRST JOJO FAILED + THE FIX (read this)
Text alone will NOT beat the model's default "clean pretty-girl illustration" render for young attractive
women (this is documented — it soft-shades every young face). The FIX that actually worked before =
**feed the STYLE-ONLY REFERENCE BUNDLE as image references**, used for TREATMENT ONLY (ink weight, angular
shadow planes, tonal steps), NEVER for face/identity:
- ⭐ `operations/reference/style-only-refs/heroine-angular-face-shading-ANCHOR.png` ← **THE face-shading
  target — Ali-endorsed 2026-07-20: "this is the angular shading we want; we trained the Timnit to look like
  this."** A clean heroine close-up showing the exact angular hard-edged face planes. Match THIS face shading.
- `operations/reference/style-only-refs/achieved-face-style-01-graphic-novel.webp`
- `operations/reference/style-only-refs/styleref-02.png` + `styleref-05.png` (graphic-novel end — NOT the bold pop-art ones)
- + the Timnit anchor below.
Every character prompt MUST load these as style refs. Without them, expect the soft-face failure again.

## ⭐ STYLE ANCHOR = THE TIMNIT-SET EPISODE SCENES (Ali locked 2026-07-20)
These portraits must match the **Timnit-set episode comic scenes** exactly — same hard-edged register:
- `assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png`
- `assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png`

⛔ **REJECTED as too SOFT:** the old `character-test-*-comic` renders (Deb, DJ SunnyV) and the heroine-kit
softness. Ali: *"too painterly soft shading."* Do NOT reproduce their soft gradient shading — match the
**HARD shadow planes** of the Timnit scenes above.

## GLOBAL STYLE (every portrait)
Bold **black ink outlines**, **HARD angular grey shadow PLANES** (large sculptural shapes with crisp edges —
like the Timnit scenes), **flat vibrant color blocks**. Waist-up, her in her building,
**complete face, not cropped**, three-quarter. **Vibrant 90s/Y2K color — NO pastel, push saturation**. 16:9 or 4:5.

### ⛔ BRIGHTNESS — NOT dark/muddy (Ali 2026-07-20 on JoJo v1)
Keep it **bright, clean, higher-key**. JoJo v1 came out "a bit dark and muddy" — do NOT let the render go
dim/murky. Light the scene up, keep colors clean and saturated (not muddy-mixed). Anti-muddy = the [[dusty-mauve-too-muted]] rule.

### ⛔ PALETTE VARIETY — do NOT make the whole set magenta+teal (Ali 2026-07-20)
"The images have all gone very magenta and teal" — that two-note default makes the cast look samey. **Give each
character her OWN color story** (wardrobe + setting). Magenta/teal is allowed, but VARY across the roster:
- JoJo warm café browns/plum · Paige press magenta+navy · Paulette salon pink/gold · Cosmo jewel-tone night bar
- Becky Chick-Flicks red/blue neon · June cozy amber/coral lounge · Matron Lumen candle-gold+plum robe
- Penny post-office teal+brass · Mme CLAi-O purple mystic+crystal · FG plum+sparkle · Jeeves library green+wood
Pick each character's dominant colors from HER world; don't stamp magenta+teal on everyone.

### 🎬 INTRO POSE vs EPISODE POSE (Ali 2026-07-20) — this batch is for the INTRO
JoJo looking DOWN at the espresso reads fine as an *episode* working shot but is **wrong for an intro**. For the
**intro panels, each character LOOKS UP AND SMILES at the viewer** — engaged, welcoming, TV-intro energy (and a
better base for the Canva smile-animation). Keep her doing her building's action, but head UP, warm smile, eye
contact. (A separate looking-down/candid working shot can come later for episode scenes.)

### ⛔ #1 REQUIREMENT — THE FACE SHADING (this is the thing that keeps failing — get it right)
Load `ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` as an **IMAGE style reference** and copy its
**face-shading technique** exactly. The text below describes what to copy:

> The FACE must be shaded with **BOLD, ANGULAR, HARD-EDGED shadow PLANES** — large flat geometric shapes of
> shadow with **crisp knife-edge boundaries**, cutting across the cheekbone, temple, side of the nose, jaw,
> under the brow, and the neck. **CEL-SHADED / two-value:** one flat lit tone + one flat hard-edged shadow
> shape, nothing blended in between. Bold uniform black ink contour on every form.
>
> ⛔ **FORBIDDEN on the face:** soft airbrushed blending · smooth gradient rounding · softly-rounded "pretty
> rendered" cheeks · glossy skin highlights · feathered/fuzzy shadow edges · semi-realistic painted skin.
> If the cheeks look soft, round, and smoothly blended → it is WRONG, REDO. The face must look GRAPHIC —
> angular flat planes like the Timnit reference, not a softly-lit illustration.

### ⛔ ANTI-DRIFT (body + whole image)
> Same hard-plane cel treatment across the whole figure and setting: flat color fills + hard-edged flat
> shadow shapes, limited tonal steps, **NO smooth gradients, NO airbrush, NO painterly/brush rendering.**
> NO halftone dots. NOT pixel, NOT plasticy, NOT glamour-cartoon, NOT soft. **Before delivery, put your
> render next to the Timnit reference — if your shading is softer/smoother than Timnit's, REDO.**

## ✅ LOCK-CHECK — render character #1 (JoJo) FIRST, confirm the hard register, THEN continue
Do JoJo first. If her shadows are hard flat planes (matching Timnit), proceed with the rest. If they come
out soft/painterly, fix the style before burning the other 10.

### 7-POINT GUARDRAILS (carry all)
1. **Two worlds:** these are SUNNYVAiLE natives → Y2K outfits, butterfly clips OK, town settings. No corporate-land.
2. **Style refs = treatment only**, never borrow another person's face.
3. **Complete face**, correct anatomy, her likeness from the ref.
4. This IS the building's keeper — match the ref's identity exactly.
5. Drift check + the anti-drift spec above.
6. Any text = comic lettering, not a plain box.
7. **Y2K tech only** (iBook clamshell / CRT / RAZR) if a device appears.

---

## THE 11

### 1 · JoJo — Blend & Snap barista
Likeness ref: `assets/town-characters/scenes/jojo-scene.png`. Comic portrait: JoJo mid-rush at the café,
pulling espresso, warm Main-Street window behind. Dark hair, apron, her exact face. Vibrant, not pastel.

### 2 · Paige — NewsStand reporter (POC)
Likeness ref: `assets/town-characters/scenes/paige-scene.png`. Comic portrait: Paige at her NewsStand desk,
press pass, notepad, stacked papers. Keep her **magenta blazer + POC identity** from the ref.

### 3 · Paulette — MAiKEOVER stylist
Likeness ref: `assets/town-characters/scenes/paulette-scene.png`. Comic portrait: Paulette in the salon,
blonde curls, styling energy (Legally-Blonde-Paulette warmth), mirror lights. Keep her exact face.

### 4 · Cosmo — Bronze AiGE bartender (gay, POC)
Likeness ref: `assets/town-characters/scenes/cosmo-scene.png`. Comic portrait: Cosmo behind the bar shaking a
drink, rainbow bandana, jewel-tone vest, moody club light. Keep **POC identity + rainbow** from the ref.

### 5 · Becky — Chick Flicks clerk
Likeness ref: `assets/town-characters/scenes/becky-scene.png`. Comic portrait: Becky at the video-store
counter, Empire-Records look, VHS shelves + checkerboard floor behind. Keep her exact face.

### 6 · June — Delta LAi Nu "Cool Mom"
Likeness ref: `assets/town-characters/scenes/june-scene.png`. Comic portrait: June in the sorority-house
lounge, warm hostess energy, snacks/mugs, cozy palette. Keep her exact face.

### 7 · Matron Lumen — LUMINAiRY (Asian)
Likeness ref: `assets/town-characters/scenes/matron-lumen-scene.png`. Comic portrait: Matron Lumen in the
lantern hall holding a lantern, plum robe, warm candle glow. Keep **Asian identity** from the ref.

### 8 · Penny — Post Office (young)
Likeness ref: `assets/town-characters/scenes/penny-scene.png`. Comic portrait: Penny at the sorting counter,
service bell, sliding a postcard forward, **young**, wearing **one half of a best-friends necklace**.

### 9 · Mme CLAi-O — No.6 psychic shop
Likeness ref: `assets/video/sunnyvaile-credits-v1-plates/opening-02-mme-claio.png` ⚠ (old scene retired —
confirm this is her face). Comic portrait: platinum curls, pink glasses, plum wardrobe, crystal ball,
turning a tarot card, bead curtain + warm lamps.

### 10 · FAiRY Godmother — the town's own AI (the guide)
Likeness ref: `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png`.
Comic portrait: natural dark curls, plum robe + jewelry, warm knowing energy, analog map-room / sparkle
motif. **No wand needed here.** Keep her exact face.

### 11 · Miss Jeeves — LIBRAiRY reference desk
Likeness ref: `assets/video/delivery-20260714-opening-v6/shots/_miss-jeeves-approved-reference.png`.
Comic portrait: silver-haired librarian at the glass-block reference desk, cardigan, chain glasses, warm
lamp, card catalog + CRT behind (Y2K). Keep her exact face.

---
QC on delivery: all 11 read as one graphic-novel LANGUAGE (match DJ SunnyV + Deb comic tests), vibrant not
pastel, complete faces, correct ethnicities, Y2K tech, no halftone, no painterly softness.
