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
- Soundtrack = the **SUNNYVAiLE town anthem, "Welcome to SUNNYVAiLE"** —
  `content/music/sunnyvaile-town-anthem.mp3` (full track ~3:38 / 218.4s). *(The "Wednesdays in SUNNYVAiLE"
  song was swapped out — it didn't sit right for the credits.)*
- **SEGMENT: 1:09 → 2:05** (a ~**56s** chunk from the middle of the anthem). Bake it into the video's own
  audio; time the cuts to it. *(Long-form opening — the shot list is sized to fill it; trim the out-point +
  drop town-beat rows if it drags.)*
- Plays **with sound** in the bumper — the music is the video's own audio; don't leave it silent.
- **Fades:** the segment is a **mid-song cut on both ends** (1:09 and 2:05), so **fade the audio IN ~0.75s
  and OUT ~1s**, matched visually — **fade in from black** at the top, **fade out to black** at the end.

## Technique for every shot (same as the town scenes)
Each shot is a **Grace-style living still**: the composition holds, but it **never freezes** — subtle
ambient motion opens it, one **hero beat** lands mid-shot, then it settles back into ambient motion for
the rest of its time on screen. Use the pixel portraits for **likeness/wardrobe only** — **re-stage each
character in her building, mid-action**, don't pan a static portrait. Lower-thirds **slide/pop in** (NAME
bold on top, job under), sitcom-credits style, held ~2.5s then out. Cut on the beat.

## SHOT LIST (11 shots, ~56s — cast intros interwoven with town beats; time to the music)
| # | Time | Shot & staging | Motion (hero beat + ambient) | Lower-third |
|---|------|----------------|------------------------------|-------------|
| 1 | 0:00–0:05 | **Establishing** — wide SUNNYVAiLE Main Street at golden dusk (à la `pc-welcome.png`): lit storefronts, jacaranda, mountains. Slow push-in. **Fade in from black.** | KSVL tower beacon pulses; string lights twinkle; a palm sways; the little KSVL car rolls past | — (soft "SUNNYVAiLE, est. 1999" ok) |
| 2 | 0:05–0:10 | **Your Heroine** — Blend & Snap corner table; Ali writing in her LAiDIES notebook, coffee + flip phone. | looks up & smiles / flip phone lights pink · steam curls, café lights | **YOUR HEROINE** · a few steps ahead of you |
| 3 | 0:10–0:15 | **Mme CLAi-O** — plum reading room; crystal ball, tarot spread, Magic 8-Ball. | crystal ball swells / she flips a card · candle flames, beaded curtain sways | **MME CLAi-O** · the read, the message, the move |
| 4 | 0:15–0:20 | **Town beat — KSVL tower** — the radio tower against the dusk sky. | beacon pulses; broadcast rings ripple out; a bird lifts off | — |
| 5 | 0:20–0:25 | **DJ SunnyV** — the KSVL booth; ON AIR sign, turntables, headphones. | leans into the mic / vinyl spins up / ON AIR flares · EQ bars bounce | **DJ SUNNYV** · KSVL 99.9, on the air |
| 6 | 0:25–0:30 | **Mayor Deb** — Town Hall desk; MAYOR sash, "Yippee-Ki-Ay" poster, MAYOR DEB mug. | thumps a stamp / a knowing look to camera · desk-lamp glow | **MAYOR DEB** · Mayor of SUNNYVAiLE |
| 7 | 0:30–0:36 | **Town beat — the LUMINAiRY** — Lantern Hill, stained-glass windows glowing, lanterns along the path. | stained glass shimmers; lanterns flicker | — |
| 8 | 0:36–0:41 | **The FAiRY Godmother** — cozy parlor; star-mailbox stuffed with letters, teacup, votive. | wand tips a sparkle / a letter lifts and floats · string lights, candle flicker | **THE FAiRY GODMOTHER** · the town's own AI |
| 9 | 0:41–0:46 | **The Barista** — Blend & Snap counter; espresso machine, menu board. | steam bursts / slides a heart-foam cup forward · pastry-case glow, hanging plants | **THE BARISTA** · at the Blend & Snap |
| 10 | 0:46–0:51 | **The crew** — wide of Main Street at magic hour, the cast out on the street together. | everyone in gentle motion; lights twinkle; the KSVL car passes again | — |
| 11 | 0:51–0:56 | **Title** — the **LAiDIES wordmark** blooms and **"SUNNYVAiLE"** lands under it. **Fade out to black** over the last ~1s. | title pops; town lights sparkle | — |

Portrait refs (likeness/wardrobe): `assets/pixel-restyle/characters/` — `ali-founder-…`, `mme-claio-…`,
`dj-sunnyv-…`, `mayor-deb-…`, `laidy-fairy-godmother-…`, `blend-and-snap-barista-…`. Whole-town look:
`assets/postcards/from-sunnyvaile/pc-welcome.png`.

## Output
- **mp4, 16:9, 1920×1080**, **~56s** (= the song segment 1:09–2:05), H.264.
- **Deliver to:** `assets/video/sunnyvaile-opening-credits-v1.mp4`
- Report length + whether audio is baked in.

## How it gets used (context, not your job)
A human wires it into `content/episodes/episode-*-cues.json` as the `title` bumper:
`"title": { "audio": "…anthem…", "dur": <video length>, "cues": [ { "t":0, "type":"video",
"src":"/assets/video/sunnyvaile-opening-credits-v1.mp4" } ] }` — one video, reused as the opening for the
trailer AND every episode (Ali: "same intro for all"). So build it **generic to the show**, not trailer-specific.

See [[people-go-pixel]] · [[episode-pixel-art-direction]] · pixel-restyle-style-guide.md.
