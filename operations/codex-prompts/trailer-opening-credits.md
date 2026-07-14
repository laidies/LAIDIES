# CODEX BRIEF — SUNNYVAiLE opening-credits sequence (video)

> **SCOPE (Codex):** motion/video job (allowed per the loosened contract). Produce a short animated
> opening-credits video. Save to the delivery path below; never clobber originals; don't touch site code.

## What this is
A proper **TV-show opening-credits sequence** for LAiDIES / SUNNYVAiLE — the thing that plays before an
episode (and before the trailer) in the Screening Room. NOT isolated portrait flashcards (we tried that,
it's wrong). Think **Friends / Fresh Prince / Full House**: the theme plays, the cast appears *in their
world doing their thing*, names + jobs come up as lower-thirds, and it lands on the title. It should feel
like a real show is starting.

## The feel (reference these)
- Cast montage over the theme song — characters mid-action in their own buildings, not staring at camera.
- **Lower-third name cards** slide/pop in (NAME on top, job under it), the way a sitcom credits each cast member.
- Quick, rhythmic cuts on the beat; gentle push-ins / pans (Ken Burns) so every shot has motion.
- Warm, celebratory, Y2K. Ends on the **LAiDIES wordmark → "SUNNYVAiLE"** title.

## Style (locked)
- **Pixel art**, same language as the Ep4 scene work (`assets/episodes/ep-04/pixel/`) and the pixel
  character portraits (`assets/pixel-restyle/characters/`). Visible pixels + dither, real adult
  proportions, town palette (plum #4b2148, rose #9b3f5f, pink #e982ab, teal #57b6c0, gold #c9a227, cream).
- Y2K SUNNYVAiLE, ~1999. No AI-cliché imagery.

## Audio
- Soundtrack = **"Wednesdays in SUNNYVAiLE"** — `content/music/the-laidies-wednesday-in-sunnyvaile.mp3`
  (full track ~4:04 / 243.7s). Use **this exact segment: 2:50.7 → 3:27.7** — i.e. from **1:13 before the end
  to 0:36 before the end**, about **37 seconds**. Bake it into the video's own audio; time the cuts/motion to it.
- Video length = that segment (~**37s**).
- Plays **with sound** in the bumper — the music is the video's own audio; don't leave it silent.
- **This is a mid-song cut on BOTH ends, so it needs a fade IN and a fade OUT** or both edges are abrupt:
  ramp the audio **up over ~0.75s** at the start and **down over ~1s** at the end, matched visually
  (**fade in from black** at the top, **fade out to black** at the end — the tour begins right after).

## Cast to feature (name · job — for the lower-thirds)
- **Your Heroine** · a few steps ahead of you  (ref `ali-founder-portrait-pixel-v1.png`)
- **Mme CLAi-O** · the read, the message, the move  (`mme-claio-portrait-pixel-v1.png`, her shop)
- **DJ SunnyV** · KSVL 99.9, on the air  (`dj-sunnyv-portrait-pixel-v1.png`, the booth)
- **Mayor Deb** · Mayor of SUNNYVAiLE  (`mayor-deb-portrait-pixel-v1.png`, Town Hall)
- **The FAiRY Godmother** · the town's own AI  (`laidy-fairy-godmother-portrait-pixel-v1.png`)
- **The Barista** · at the Blend & Snap  (`blend-and-snap-barista-portrait-pixel-v1.png`)
- Optional wide establishing beats: Main Street, the LUMINAiRY on Lantern Hill, the KSVL tower
  (see `assets/postcards/from-sunnyvaile/pc-welcome.png` for the whole-town look).

Use the portraits for likeness/wardrobe, but **re-stage each character in a moving shot** (in her building,
doing her thing) — don't just pan a static portrait.

## Output
- **mp4, 16:9, 1920×1080**, ~15–20s, H.264.
- **Deliver to:** `assets/video/sunnyvaile-opening-credits-v1.mp4`
- Report length + whether audio is baked in.

## How it gets used (context, not your job)
A human wires it into `content/episodes/episode-*-cues.json` as the `title` bumper:
`"title": { "audio": "…anthem…", "dur": <video length>, "cues": [ { "t":0, "type":"video",
"src":"/assets/video/sunnyvaile-opening-credits-v1.mp4" } ] }` — one video, reused as the opening for the
trailer AND every episode (Ali: "same intro for all"). So build it **generic to the show**, not trailer-specific.

See [[people-go-pixel]] · [[episode-pixel-art-direction]] · pixel-restyle-style-guide.md.
