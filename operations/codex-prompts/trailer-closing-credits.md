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
- Soundtrack = a **specific segment of "Wednesdays in SUNNYVAiLE"** —
  `content/music/the-laidies-wednesday-in-sunnyvaile.mp3` (same song as the opening; full track ~4:04).
  **Ali names the exact segment** — likely a softer/outro-feeling part than the opening's — use ONLY that
  segment and **bake it into the video's audio track**, timed to the wind-down.
- Video length = the length of that segment (roughly **~12–18s**).
- Plays **with sound** in the Screening Room's `end` bumper — the music is the video's own audio.

## Content beats (in order)
1. Warm dusk establishing shot of SUNNYVAiLE (Main Street glowing / the whole town at golden hour).
2. **Sign-off card:** "See you next Wednesday" → "in SUNNYV**Ai**LE" (Ai in the accent color).
3. *(optional, short)* credits roll — **DO NOT invent names/roles.** Use placeholders and let a human fill:
   "Created by ⟨—⟩ · Music by ⟨—⟩ · Art by ⟨—⟩". If unsure, skip the roll and keep just the sign-off.
4. End card: **ladies.ai** · new episode every Wednesday · L, A, i, D, I, E, S.

## Output
- **mp4, 16:9, 1920×1080**, ~12–18s, H.264.
- **Deliver to:** `assets/video/sunnyvaile-closing-credits-v1.mp4`
- Report length + whether audio is baked in + whether you included a credits roll.

## How it gets used (context, not your job)
A human wires it into `content/episodes/episode-*-cues.json` as the `end` bumper:
`"end": { "audio": "…anthem…", "dur": <video length>, "cues": [ { "t":0, "type":"video",
"src":"/assets/video/sunnyvaile-closing-credits-v1.mp4" } ] }` — one video, reused as the close-out for the
trailer AND every episode. Build it **generic to the show**, not trailer-specific.

See [[people-go-pixel]] · [[episode-pixel-art-direction]] · `trailer-opening-credits.md` · pixel-restyle-style-guide.md.
