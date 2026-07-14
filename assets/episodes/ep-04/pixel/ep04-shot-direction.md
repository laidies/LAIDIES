# Episode 04 · Shot direction for agent opus (inline scene clips)

Turn each keyframe still into a **silent ~10-second directed clip** that plays inline in the written article when the reader scrolls to that scene.

## GLOBAL SPEC (applies to every scene)
- **Length:** target **~10 seconds** each (Ali 2026-07-13 — dropped from 15s; 10s generates cleaner on today's image-to-video tools and still holds a full beat).
- **Format:** 16:9, silent (no audio, no narration).
- **Style:** stay EXACTLY in the keyframe's videogame-pixel-art look — visible pixels, dither, same palette/lighting. The clip is that still, brought to life. Do NOT restyle, re-color, or add detail that isn't in the frame.
- **Motion is subtle + cinematic:** slow camera moves + small ambient life. **No lip-sync. No big character locomotion** beyond what the beat names (a walk, a hand lift). These are living illustrations, not full animation.
- **Source of truth:** the keyframe = `ep04-scene-NN-*.png`. Where a shot moves meaningfully, Codex renders **example frames** (`-a-start` / `-b-mid` / `-c-end`) in the SAME style so opus has real motion targets — listed per scene below.
- **⚠ Heroine scenes 01, 02, 10, 12 use the REDONE `-v2` keyframes** (`ep04-scene-01-cold-open-v2.png`, `-02-luminairy-v2`, `-10-desk-v2`, `-12-lights-up-v2` — the less-anime heroine). Build those clips + example frames from the `-v2` stills, and name the outputs with the `-v2` stem.
- **Pacing shape (default):** ~0–2s establish (near the keyframe) → ~2–7s the move + beats → ~7–10s settle and **hold** on the final frame.
- **Play behavior:** unless marked LOOP, each clip **plays through once and holds** on its last frame (the article slot replays it when scrolled back).

---

## SCENE 01 — Cold open · the desk  [PRO]
- **Keyframe:** `ep04-scene-01-cold-open.png`
- **Shot (~10s, play-through → hold):** Hold on the Heroine mid-thought, hand paused over the keyboard, rain running down the night-city glass behind her. **Beat:** on the monitor, the chat answers her — a reply **streams in line by line**, its glow **swelling and washing brighter across her face** — and she **lifts her hand off the keys and sits back an inch**, caught by it. Slow **push-in** through the beat; settle close on her face in the screen-light, cursor blinking under the finished reply.
- **The beat that carries it:** the machine *answering on its own* — text arriving, light rising on her face, her small lean back.
- **Ambient life:** rain on glass, the reply's glow-flicker, faint breath in her shoulders.
- **Example frames:** `-a-start` (wide, hand on keys, screen mid-thought) → `-c-end` (closer, full reply on screen, glow brighter on her face, she's leaned back).

## SCENE 02 — Into the LUMiNAiRY  [Y2K]
- **Keyframe:** `ep04-scene-02-luminairy.png`
- **Shot (~10s, play-through → hold):** Slow **forward tracking drift** down the candlelit stone hall behind the Heroine (Look 4) as she walks in. **Beat:** the blue **stained-glass MAiVEN windows light up one after another** as she passes — each **pulsing bright** the moment she draws level with it, the whole wing waking up around her. Settle as she slows and **looks up at Ada's window**.
- **The beat that carries it:** the windows igniting in sequence as she walks the line — the hall coming alive.
- **Ambient life:** candle flicker, dust in the light beams, glass shimmer.
- **Example frames:** `-a-start` (hall entrance, dim, = keyframe) → `-b-mid` (mid-hall, first windows lit behind her) → `-c-end` (stopped, looking up at Ada's lit window).

## SCENE 03 — 1843 · Ada  [The Idea]
- **Keyframe:** `ep04-scene-03-ada.png`
- **Shot (~10s, play-through → hold):** Hold on Ada with the punch card, brass **Analytical Engine gears turning** behind her, candle flickering. **Beat:** a punched card **feeds through the engine**, and from its holes a **faint thread of glowing musical notes lifts into the air** and threads toward the machine — her insight made visible, *seeing music where everyone else saw arithmetic*. Slow **push-in** as she lifts her eyes from the card to follow the glow up. Settle on her face lit by it.
- **The beat that carries it:** the glowing notes rising off the punch card — the "idea" you can actually see.
- **Ambient life:** gear rotation, candle flame, rain on the study window, lace veil barely stirring.
- **Example frames:** `-a-start` (= keyframe) → `-b-mid` (card feeding through, gears turning, first glow at the holes) → `-c-end` (thread of notes risen into the air, her eyes up to the machine).

## SCENE 04 — 1942 · Hedy  [The Signal]
- **Keyframe:** `ep04-scene-04-hedy.png`
- **Shot (~10s, play-through → hold):** Hold on Hedy at the drafting desk, vanity lights shimmering. **Beat:** the **frequency-hopping diagram lights up** — a bright **dot leaps band to band across the frequencies**, quick and rhythmic — and a **red "jamming" wave sweeps in and can't catch it** (you can't jam a signal you can't find). Slow **push-in** as she glances up from the sketch, composed and knowing. Settle on her look.
- **The beat that carries it:** the hopping dot outrunning the jam — the whole invention, animated.
- **Ambient life:** light shimmer, pearl highlight, film-strip advancing at the edge, the hopping signal.
- **Example frames:** `-a-start` (= keyframe) → `-b-mid` (dot mid-hop across the bands) → `-c-end` (jam wave misses, diagram lit, her glance up).

## SCENE 04B — 1945 · The ENIAC Six   ·  ⚠ KEYFRAME NOT YET RENDERED (Codex must make it + example frames)
- **Keyframe:** `ep04-scene-04b-eniac.png` (Codex still needs to generate this still, in the same pixel style — see brief §5.)
- **Shot (~10s, play-through → hold):** Slow **drift** across the vast **30-ton ENIAC** — a wall of dials, cables, and switches glowing in the machine room. **Beat:** the **six women work the machine by hand** — moving along it, **plugging cables and flipping switches in sequence**, panel lights **blinking on down the wall** as they set the program into it. Settle wide on the six of them, dwarfed by the machine they command. Cool machine-room light + warm panel glow.
- **The beat that carries it:** the six of them physically wiring the program into the wall — the first programmers, at work.
- **Ambient life:** panel lights blinking in sequence, cables swaying, the women's hands on the switches, faint dust.
- **Example frames:** `-a-start` (wide machine + women mid-work) → `-c-end` (settle on the six, dwarfed by the ENIAC).

## SCENE 05 — 1952 · Grace  [The Language]
- **Keyframe:** `ep04-scene-05-grace.png`
- **Shot (~10s, play-through → hold):** Hold on Grace at the room-sized machine, its **reels turning** and panel **lights blinking in sequence**. **Beat:** a **moth flutters into frame** and **lands on the open logbook** — the literal "first actual bug." Small settle on the moth and Grace's steady, amused look.
- **The beat that carries it:** the moth arriving and landing on the logbook — the birth of "debugging," on screen.
- **Ambient life:** reel rotation, blinking panel lights, the moth's wings.
- **Example frames:** `-a-start` (= keyframe, no moth) → `-b-mid` (moth in flight toward the logbook) → `-c-end` (moth landed on the open logbook).

## SCENE 06 — 1956 · The naming  [Dartmouth]
- **Keyframe:** `ep04-scene-06-naming.png`
- **Shot (~10s, play-through → hold):** Slow **push-in** across the summer room of shirtsleeved men. **Beat:** at the chalkboard, a hand **finishes writing "ARTIFICIAL INTELLIGENCE" and double-underlines it with a confident flourish** — a puff of **chalk dust** in the golden sunbeam — and the men **shake hands**, self-congratulatory. Settle on the full board and the handshake. (Dusty, warm, a little smug — the promise that did not age well.)
- **The beat that carries it:** the words getting written and underlined, then the handshake — the naming, as an act.
- **Ambient life:** chalk dust in sunbeams, subtle body shifts, warm light drift.
- **Example frames:** `-a-start` (wide room, = keyframe) → `-b-mid` (hand underlining the words, chalk dust rising) → `-c-end` (board full, the handshake).

## SCENE 07 — The AI winter   ·  play-through → hold
- **Keyframe:** `ep04-scene-07-ai-winter.png`
- **Shot (~10s, play-through → hold):** Very slow **drift** across the cold, half-abandoned lab, dust motes hanging in the dim light. **Beat:** the one surviving **monitor flickers, struggles, and blinks out to black** — the funding going dark — while **frost creeps a little further** across the window. Settle on the dead, silent room. Desaturated, still, lonely.
- **The beat that carries it:** the last screen dying — "the lights went out on AI," literally.
- **Ambient life:** dust drift, the failing flicker → dark, barely-there cold shimmer.
- **Example frames:** `-a-start` (= keyframe, monitor weakly lit) → `-c-end` (monitor dead/dark, frost crept further, the room colder).
- **⚠ Note:** the dying-monitor beat means this scene **no longer loops** — play once and hold on the dark. (So **no scene loops** anymore; author every article `<video>` without the `loop` attribute.)

## SCENE 08 — 1972 · Karen  [The Finding]
- **Keyframe:** `ep04-scene-08-karen.png`
- **Shot (~10s, play-through → hold):** Hold on Karen at the terminal, green CRT glow on her face. **Beat:** on the screen a **search runs** — the common words dim to almost nothing while the **rare, meaning-carrying words flare bright** (her whole insight: it's the rare words that matter). Slow **push-in** on the glowing screen, then a beat on her face in the green light.
- **The beat that carries it:** the common words fading and the rare words lighting up — the idea under every search box.
- **Ambient life:** CRT scanline shimmer, the words dimming/flaring, green glow.
- **Example frames:** `-a-start` (= keyframe) → `-b-mid` (search running, words sorting) → `-c-end` (rare words flared brightest, common words dimmed).

## SCENE 09 — 2012 · Fei-Fei  [The Sight]
- **Keyframe:** `ep04-scene-09-fei-fei.png`
- **Shot (~10s, play-through → hold):** Start on near-empty walls/screens. **Beat:** a **flood of tiny labeled images cascades in, row by row**, tiling every surface until the space is **packed full** — and on the last row a soft **"recognition" glow ripples outward**, the machine finally *seeing*. Settle on Fei-Fei amid the full, glowing wall of images.
- **The beat that carries it:** the empty wall filling with millions of pictures, then the recognition glow — data becoming sight.
- **Ambient life:** images tiling in, label flickers, the recognition ripple.
- **Example frames:** `-a-start` (sparse, near-empty) → `-b-mid` (half full) → `-c-end` (full wall + recognition glow, = keyframe).

## SCENE 10 — It lands on your desk  [PRO]
- **Keyframe:** `ep04-scene-10-desk.png`
- **Shot (~10s, play-through → hold):** Present-day Heroine (professional) at the **same desk as Scene 01**. **Beat:** on screen a **full, rich answer blooms — text streaming in and filling the chat** — and its **glow lifts and brightens in her eyes**; she **sits back, a slow breath, the faintest almost-smile** — the awe of realizing what she has been holding this whole time. Slow **push-in** through the beat; settle on her face in the screen-light.
- **The beat that carries it:** the full answer arriving + her quiet recognition — the payoff of the episode. (Bookends Scene 01: there the machine *starts* answering and she's uncertain; here it *delivers* and she knows.)
- **Ambient life:** screen glow rising, text streaming in, her breath and lean-back.
- **Example frames:** `-a-start` (= keyframe) → `-c-end` (push-in, full answer filling the screen, glow in her eyes, her lean-back).

## SCENE 11 — The checkers
- **Keyframe:** `ep04-scene-11-checkers.png`
- **Shot (~10s, play-through → hold):** Slow **drift** across the three women — Joy, Timnit, Kate — standing, examining the machine critically, cool and backlit. **Beat:** **Joy lifts a plain white mask up toward the camera** — the face-detection that couldn't see her dark skin until she held up white. Settle, serious, on the three of them.
- **The beat that carries it:** the white mask raised to the lens — the bias, shown not told.
- **Ambient life:** backlight shift, the mask raise, three steady presences.
- **Example frames:** `-a-start` (three of them, = keyframe) → `-c-end` (Joy's white mask raised to camera).

## SCENE 12 — The lights come up  [Y2K]
- **Keyframe:** `ep04-scene-12-lights-up.png`
- **Shot (~10s, play-through → hold):** The Heroine (Look 4) alone in the LUMiNAiRY back wing. **Beat:** a slow **pull-back / lift** as **every stained-glass MAiVEN portrait glows brighter, one by one**, igniting around her until the whole wing is lit — the entire story rising into light. Settle wide on her, small in the glow, holding all of it. (Bookends Scene 02.)
- **The beat that carries it:** the portraits lighting up in sequence around her as the camera lifts away — the reverent finale.
- **Ambient life:** portraits pulsing brighter in sequence, candle warmth, glass shimmer.
- **Example frames:** `-a-start` (= keyframe, dim) → `-b-mid` (half the portraits lit) → `-c-end` (all glowing, pulled back wide).

---

## FRAMES CODEX STILL NEEDS TO RENDER — checklist
Only frames that DIFFER from the existing keyframe are listed (an `-a-start` that "= keyframe" just reuses the existing still). **★ = content/state change (essential — opus needs the target); ☆ = camera-move end (nice-to-have — opus can push-in/drift from the keyframe alone).**
- **Scene 01** ★ `-c-end` — 🔁 RE-RENDER: reply now on screen, glow brighter on her face, leaned back *(from v2)*
- **Scene 02** ★ `-b-mid` · ★ `-c-end` *(from v2)* — exists
- **Scene 03** ★ `-b-mid` (card feeding, first glow) 🆕 · ★ `-c-end` (notes risen, eyes up) 🔁 RE-RENDER
- **Scene 04** ★ `-b-mid` (dot mid-hop across bands) 🆕 · ★ `-c-end` (jam wave misses, her glance up) 🔁 RE-RENDER
- **Scene 04B** ✅ done (a-start + c-end exist)
- **Scene 05** ★ `-b-mid` (moth in flight) · ★ `-c-end` (moth landed) — exists
- **Scene 06** ★ `-b-mid` (hand underlining the words, chalk dust) 🆕 · ★ `-c-end` (board full, handshake) — exists
- **Scene 07** ★ `-c-end` (monitor dead/dark, frost crept) 🔁 RE-RENDER — no longer a loop frame
- **Scene 08** ★ `-b-mid` (query typed) · ★ `-c-end` (rare words glowing) — exists
- **Scene 09** ★ `-a-start` (sparse) · ★ `-b-mid` (half full) — end = keyframe — exists
- **Scene 10** ★ `-c-end` — 🔁 RE-RENDER: full answer filling the screen, glow in her eyes, leaned back *(from v2)*
- **Scene 11** ★ `-c-end` (Joy's mask raised to camera) — exists
- **Scene 12** ★ `-b-mid` (half lit) · ★ `-c-end` (all glowing, pulled back) *(from v2)* — exists

**🆕 NEW frames the punch-up adds (3):** `ep04-scene-03-ada-b-mid`, `ep04-scene-04-hedy-b-mid`, `ep04-scene-06-naming-b-mid`.
**🔁 RE-RENDER — existing end frames whose content changed with the new beat (4):** `01-cold-open-v2-c-end` (reply on screen), `03-ada-c-end` (glowing notes), `04-hedy-c-end` (jam misses), `07-ai-winter-c-end` (monitor dead), `10-desk-v2-c-end` (full answer). *(Scene 07 has no `-c-end` on disk yet, so it's a make, not a re-render.)*
Everything else already exists. Net Codex image work to enable the punched-up clips: **~3 new + ~5 make/re-render.**

**All 13 scenes now have an explicit `**Beat:**` line** (a directed event, not just a camera move). The 6 that already had a strong event (02, 04B, 05, 08, 09, 11, 12) were rewritten into the same beat format but **need NO new frames** — their example frames already exist. So the frame work above is the *complete* outstanding image list.

## OUTPUT (for agent opus + Codex)
- **agent opus** makes the clips → save as `ep04-scene-NN-*.mp4` (same stem as the keyframe) beside the PNGs. The template auto-plays the `.mp4` if present, else shows the `.png` poster.
- **Codex** still needs to render the **example frames** named above (`ep04-scene-NN-a-start.png` etc.) in the same pixel style — that's the only image work left; the shot scripts here are done.
- Loop vs play-once: only **Scene 07** is marked LOOP-friendly; all others play through once and hold (author the article `<video>` accordingly — `loop` present only on Scene 07).
