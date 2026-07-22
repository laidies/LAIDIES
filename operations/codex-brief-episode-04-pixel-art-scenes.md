# CODEX BRIEF — Episode 04 "The Founding Mothers" · pixel-art scene stills

> **SCOPE — images only.** Codex generates image files only. No file edits, no HTML, no CSS, no git, no template work. Output PNGs to the path in §7 and stop. The written-page template is handled separately.

Ali locked this 2026-07-13: episode scene art = **videogame pixel art**, matching the style the *watchable* episodes will eventually use. This brief is for the **written** Ep 04 page, which goes art-led (an illustration per scene, woven through the prose — not text-on-white).

---

## 1. THE STYLE — "videogame pixel art" (non-negotiable)
Match Ali's 5 reference frames (the lofi city / CRT / sunset-profile set — save them to `approved-assets/style-refs/pixel-art/` and pass every one as a reference on every generation; never let Codex invent its own style).

- **Rendering:** true pixel art — visible pixels, **halftone / ordered-dither** shading in skies, glows, and gradients (that dotted texture in the refs). 16-bit-cutscene / lofi-radio look. NOT smooth vector, NOT painterly, NOT 3D, NOT photoreal.
- **Light is the whole mood:** one strong warm source (a CRT/monitor glow, a lamp, candlelight, a neon sign) throwing colored light across the subject and casting long shadow; cool ambient fill (rainy-blue night, teal shadow). Rim light on the figure. Screen-glow spill.
- **Palette per scene is limited and cinematic** — pick one of: warm sunset (amber/orange → dusty purple), cool night (deep blue/teal + one warm window), or neon (magenta/purple + amber). Rich but restrained; heavy dither between tones.
- **Detail in the environment:** brick, fire escapes, CRT monitors, cabling, candlelight, stained glass, period machines — textured and lived-in, like the refs.
- **Mood:** contemplative, quiet, a little cinematic-lonely — the lofi vibe. Figures often 3/4, profile, or from behind.

## 2. THE SUBJECTS — our women, not the ref's guy
The references are a man in a city; **ignore the character, keep the style.** LAiDIES subjects:
- **The Heroine** (recurring protagonist): a **cute blonde with medium-length hair**, ~30s, warm and relatable. **Keep her LESS anime** — grounded/illustrated like the pixel-art refs, NOT anime-styled (the first pass skewed too anime). Re-render her 4 scenes (01/02/10/12) to match once she's re-approved. **Two looks, switched by world:**
  - **Real world / before she enters SUNNYVAiLE** (the desk / present-day scenes) → **professional** (smart modern workwear).
  - **Inside SUNNYVAiLE** (the LUMiNAiRY / town scenes) → **Y2K clothing.** APPROVED wardrobe = `ep04-heroine-y2k-wardrobe-sheet.png` (4 grown-woman looks; NOT teen-crop). **Ep 04 uses LOOK 4** (black cardigan + plum plaid pleated mini + black tank + choker/heart necklace + tights + chunky loafers). Keep her in **that same look across ALL Ep 04 SUNNYVAiLE scenes** (02 + 12) for continuity.
  Same face/hair/build throughout; only the wardrobe changes by world. Reuse her exactly across every scene she's in. (Professional look = `ep04-heroine-sheet.png`.)
- **The MAiVENS** (historical figures — render each recognizably as herself, in the pixel style): Ada Lovelace, Hedy Lamarr, Grace Hopper, Karen Spärck Jones, Fei-Fei Li, Joy Buolamwini, Timnit Gebru, Kate Crawford. Diverse, period-accurate, dignified — revered, never caricatured.
  - **LUMiNAiRY windows (Scenes 02 + 12) MUST match the canonical BLUE stained-glass MAiVEN portraits** at `assets/mavens/y2k-stained-glass-v2/<slug>-y2k-stained-glass.png` (e.g. `ada-lovelace-…`, `grace-hopper-…`). Pass those as references so the windows are the SAME portraits used everywhere else on the site — do NOT invent new window art. (Slugs: ada-lovelace, hedy-lamarr, grace-hopper, karen-sparck-jones, fei-fei-li, joy-buolamwini, timnit-gebru, kate-crawford.)
- Per canon: scenes with people = Y2K/period women; keep them the focus.

## 3. GLOBAL CONSISTENCY (read before generating)
- Same pixel resolution / dither density / line-weight across ALL scenes so they read as one set.
- Same aspect ratio across all (see §4).
- Warm-vs-cool logic is consistent: interiors/tech = warm glow; night exteriors = cool.
- Establish the Heroine first (Scene 01), then feed her frame back as a reference for her other scenes so she stays the same person.

## 4. FORMAT — LOCKED
**16:9 landscape** for every still. These clips live **inline in the article** (they play as you scroll to that scene), so they sit in the reading column and scale down responsively on mobile — one asset serves desktop + phone. Do **not** also make 9:16: inline vertical is awkwardly tall on desktop, and doubling the set doubles both the Codex stills and the agent-opus renders on art we're still validating.
**9:16 is deferred** to the future *full-screen watchable episode* (the reels / Screening Room cut) — generate vertical then, not now. Inline-article ≠ full-screen-episode; different formats on purpose.

## 0. STEP ZERO — DESIGN THE HEROINE FIRST
Before any scene, Codex generates a **Heroine character sheet**: the same woman (cute blonde, medium-length hair) shown in **both wardrobes side by side — professional (real world) and Y2K (SUNNYVAiLE)** — in the pixel-art style, neutral pose, clear face. **Ali signs off on the Heroine before anything else.** Once approved, that sheet is passed as a reference on every scene she appears in (Scenes 01, 02, 10, 12) so she's the same person every time.

## 5. THE SHOT LIST (in episode order)
Each = one pixel-art still reflecting that beat. **[PRO] = professional look · [Y2K] = SUNNYVAiLE look.**

1. **Cold open — the desk. [PRO]** The Heroine (professional) at her desk, mid-thought, hand paused over the keyboard, lit by the glow of her monitor (a chat window on screen). Rainy city window behind, warm lamp + cool blue night. (Closest to the ref frame — but our blonde Heroine.)
2. **Into the LUMiNAiRY. [Y2K]** The Heroine (now in Y2K clothing — she's entered SUNNYVAiLE) walking into a candlelit stone hall of glowing **stained-glass portraits** down a quiet back wing. Warm candle amber vs cool stone shadow. Reverent, hushed.
3. **1843 · Ada.** Ada Lovelace at a giant brass **mechanical calculating machine**, candlelit Victorian study, looking at it like she sees music in it. Warm brass/amber.
4. **1942 · Hedy.** Hedy Lamarr, glamorous, at a drafting desk **inventing between takes** — a film set / vanity lights behind her, sketches of hopping signals on the paper. Warm stage light.
4B. **1945 · The ENIAC Six.** The vast **30-ton ENIAC** machine-room — a wall of dials, cables, switches — and the **six women (Jean, Betty, Kay, Marlyn, Ruth, Frances) programming it by hand**, dwarfed by the machine they command. The first programmers. Cool machine-room glow + warm panels. Save as `ep04-scene-04b-eniac.png`. (Portrait ref for the women's look: `assets/mavens/y2k-stained-glass-v2/eniac-six-y2k-stained-glass.png`.)
5. **1952 · Grace.** Grace Hopper in Navy uniform at a room-sized early computer, a **moth** by the open logbook. Cool machine-room green/teal glow.
6. **1956 · The naming.** A summer room of **men in shirtsleeves** at Dartmouth, chalkboard reading "artificial intelligence," shaking hands — self-congratulatory. Warm dusty afternoon. (No women here — this is the beat where the men take the credit.)
7. **The AI winter.** A cold, half-abandoned lab, dust sheets, frost on the window, one dim monitor — the work paused. Desaturated cold blue.
8. **1972 · Karen.** Karen Spärck Jones at a terminal, Cambridge, a search query on the green screen with the **rare words glowing** brighter than the common ones. Cool CRT green.
9. **2012 · Fei-Fei.** Fei-Fei Li surrounded by a **flood of tiny labeled images** tiling the walls/screens — the machine finally *seeing*. Cool blue with warm image-glow.
10. **It lands on your desk. [PRO]** Present-day Heroine (professional, same as Scene 01) at the same desk, the chat box open — the moment it arrived. Warm monitor glow, sense of quiet awe.
11. **The checkers.** Three women — Joy Buolamwini (holding a **white mask** to a camera), Timnit Gebru, Kate Crawford — standing, examining the machine critically. Cool, serious, backlit.
12. **The lights come up. [Y2K]** The Heroine (Y2K, in SUNNYVAiLE) alone in the LUMiNAiRY back wing, all the stained-glass MAiVEN portraits glowing around her — holding the whole story. Warm reverent glow. (Bookends Scene 02.)

## 5b. SHOT DIRECTION PER SCENE (for agent opus → inline clips)
Each still is a **keyframe** for a **silent video clip** that **plays inline in the article when the reader scrolls to that scene** — no narration, no audio yet. **agent opus generates the clip; Codex writes the shot direction + supplies the example frames** (Codex makes images + text only — it does NOT make the video).

**Length:** target **~15 seconds** each (Ali 2026-07-13) — a longer, directed shot, not an ambient wobble.

**✅ The per-scene shot scripts are already written** — see `assets/episodes/ep-04/pixel/ep04-shot-direction.md` (all 12 scenes, ~15s each, with camera move / beats / loop-vs-play / which example frames to render). **Codex's remaining job = render the example frames** (`ep04-scene-NN-a-start.png` / `-b-mid` / `-c-end`) listed there. agent opus then makes the clips from keyframe + shot script + example frames.

For every scene, Codex delivers, alongside the keyframe:
- **A short shot script (2–4 lines):** the camera move (push-in / slow pan / drift / hold), the action beats *in order* with rough timing, and the ending state. Keep it grounded in what's in the frame — no new characters or locations.
- **Example frames:** where the shot changes meaningfully, render **start / mid / end keyframes** (same scene, same style) so agent opus has a clear target for the motion, not a guess.
- **Loop vs play-through:** note which. Ambient scenes (candle flicker, rain) can **loop**; a directed shot with a clear arc **plays through once and holds** on the last frame. (Template honors this per scene — `loop` attribute present = loop, absent = play-once.)

Examples (now as directed shots):
- **Scene 01 (desk):** hold on the Heroine mid-thought → slow push-in as her hand lifts from the keys → the monitor glow swells and rain runs down the window behind. Play-through, ~10s. *(frames: wide → push-in → close)*
- **Scene 02 (LUMiNAiRY):** slow forward drift down the candlelit hall, portraits sliding past and pulsing brighter as she passes → settle on the far wing. Play-through, ~12s.
- **Scene 05 (Grace):** the machine's reels turn and lights blink in sequence → the moth flutters into frame and lands on the logbook. Play-through, ~8s.
- **Scene 09 (Fei-Fei):** the tiled labeled images cascade in row by row until the wall is full and the machine "sees." Play-through, ~10s.

Still no lip-sync and no big character locomotion beyond what the beat needs — these are cinematic moments, not full animation.

**Full narrated watchable episode = later.** This step is the silent directed clips in the written article.

## 6. WHAT NOT TO DO
No smooth/vector/painterly rendering. No text baked into the images (labels handled in the page). No modern smartphones in period scenes. No caricature of the real women. No male protagonist. No neon-cyberpunk excess where the beat is quiet.

## 7. OUTPUT
- PNG, **16:9**, high-res (at least 1920px on the long edge) — this is the keyframe AND the article poster/fallback.
- Save to `assets/episodes/ep-04/pixel/` with names: `ep04-scene-01-cold-open.png`, `ep04-scene-02-luminairy.png`, `ep04-scene-03-ada.png` … `ep04-scene-12-lights-up.png`.
- **Plus, per scene, a shot direction** (§5b) — collect all of them in `assets/episodes/ep-04/pixel/ep04-shot-direction.md` (one entry per scene: shot script + which frames + loop/play-once), to hand to agent opus.
- **Example frames** for scenes with a real move: render `ep04-scene-NN-a-start.png` / `-b-mid.png` / `-c-end.png` beside the main keyframe, so agent opus has clear targets.
- Final clips (agent opus, later) land as `ep04-scene-NN-*.mp4` beside the PNGs. The template plays the `.mp4` if present, else shows the `.png` — and honors loop vs play-once per scene.
- **Order: (1) the Heroine character sheet (§0) → Ali signs off. (2) Scene 01 in the chosen ratio → Ali signs off on style + ratio. (3) only then generate the rest.** Do not batch the whole set before those two sign-offs.
- Heroine sheet saves to `assets/episodes/ep-04/pixel/ep04-heroine-sheet.png`.
