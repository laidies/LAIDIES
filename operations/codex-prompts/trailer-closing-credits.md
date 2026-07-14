# CODEX BRIEF — SUNNYVAiLE closing-credits sequence (video)

> **SCOPE (Codex):** motion/video job (allowed per the loosened contract). Produce a short animated
> closing-credits video. Save to the delivery path below; never clobber originals; don't touch site code.

## What this is
The **end-credits** sequence — the warm goodnight that plays *after* an episode (and after the trailer) in
the Screening Room. Companion to the opening-credits video (see `trailer-opening-credits.md`); same show,
same pixel world, but this is the **wind-down**: the theme softens, the town settles into dusk, and it
signs off. Think the closing of a 90s sitcom — the cozy final shot, the "goodnight," the production card.

## The feel
- **Warm dusk/night**, cozier and slower than the opening. Golden-hour → string-lights → lavender sky.
- The town at rest: Main Street glowing, KSVL tower blinking, warm windows.
- Lands on the **sign-off**: *"See you next Wednesday · in SUNNYVAiLE"* (canon line), then **ladies.ai ·
  new episode every Wednesday**.
- Optional gentle credits roll (roles below) — but keep it short and legible.

## Style (locked)
- **Pixel art**, same language as the opening credits and the Ep4 scene work. Visible pixels + dither.
- **NIGHT / DUSK town palette** — match the "Dial-Up to SUNNYVAiLE" postcard
  (`assets/postcards/from-sunnyvaile/pc-dial-up.png`, Ali's pick for night): warm coral/orange sunset →
  lavender, vibrant teal + hot pink, gold twinkly lights + warm window glow, pink neon. Plum for depth.
- Y2K SUNNYVAiLE, ~1999.

## Audio
- Soundtrack = **"Wednesdays in SUNNYVAiLE"** — same song as the opening
  (`content/music/the-laidies-wednesday-in-sunnyvaile.mp3`). Use **this exact segment: 3:27.7 → the end
  (~4:03.7 / 243.7s)** — i.e. from **0:36 before the end to the end**, about **36 seconds**. Picks up right
  where the opening segment left off and rides the song's own ending. Bake it into the video's audio.
- Video length = that segment (~**36s**).
- Plays **with sound** in the `end` bumper — the music is the video's own audio.
- **Fade IN only.** The start is a mid-song cut, so ramp the audio **up over ~1s** (fade in from black).
  **Do NOT add a fade-out** — the song already resolves/ends on its own; let it ride out naturally
  (a visual fade to black on the last frame is fine).

## Technique for every shot (same as the opening + town scenes)
Grace-style **living stills** — the composition holds, never freezes: subtle ambient motion throughout, one
soft hero beat per shot. Slower, warmer, sparser than the opening — this is the wind-down. Cuts are longer
and gentler (no snappy beat-cutting).

## SHOT LIST (5 shots, ~36s — rides the song to its natural end)
| # | Time | Shot & staging | Motion (ambient + soft beat) | Text |
|---|------|----------------|------------------------------|------|
| 1 | 0:00–0:07 | **Dusk establishing** — wide SUNNYVAiLE at dusk (à la `pc-dial-up.png`): sunset→lavender sky, glowing storefronts, KSVL tower. Slow drift. **Fade in from black.** | first stars appear; tower beacon pulses; a warm window flicks on; neon hums to life | — |
| 2 | 0:07–0:14 | **The town winding down** — Blend & Snap at close: chairs up on tables, one warm light, door sign; OR Ali walking home down Main under the string lights. | a moth circles the streetlamp; string lights sway; a curtain glows | — |
| 3 | 0:14–0:21 | **KSVL, still on air** — the booth/tower at night; ON AIR still lit, the pink neon heart. *(the town sleeps, the music plays on)* | ON AIR glows; a record spins slow; EQ bars idle low; tower light pulses | — |
| 4 | 0:21–0:27 | **LUMINAiRY at night** — Lantern Hill, stained-glass windows lit from within, lanterns along the path. | stained-glass shimmers; lanterns flicker | **See you next Wednesday · in SUNNYV`Ai`LE** fades in |
| 5 | 0:27–0:36 | **End card** — calm night sky over the SUNNYVAiLE sign. Ride the song to its natural end. **Visual fade to black** on the last frame (no audio fade — the song ends itself). | soft star twinkle; sign glows | **ladies.ai** · new episode every Wednesday · L, A, i, D, I, E, S |

**Credits roll:** optional and short. **DO NOT invent names/roles** — if you include one, use placeholders
("Created by ⟨—⟩ · Music by ⟨—⟩ · Art by ⟨—⟩") for a human to fill, or skip it and keep just the sign-off.

## Output
- **mp4, 16:9, 1920×1080**, **~36s** (= the song segment), H.264.
- **Deliver to:** `assets/video/sunnyvaile-closing-credits-v1.mp4`
- Report length + whether audio is baked in + whether you included a credits roll.

## How it gets used (context, not your job)
A human wires it into `content/episodes/episode-*-cues.json` as the `end` bumper:
`"end": { "audio": "…anthem…", "dur": <video length>, "cues": [ { "t":0, "type":"video",
"src":"/assets/video/sunnyvaile-closing-credits-v1.mp4" } ] }` — one video, reused as the close-out for the
trailer AND every episode. Build it **generic to the show**, not trailer-specific.

See [[people-go-pixel]] · [[episode-pixel-art-direction]] · `trailer-opening-credits.md` · pixel-restyle-style-guide.md.
