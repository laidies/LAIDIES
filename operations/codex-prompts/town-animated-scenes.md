# CODEX BRIEF — SUNNYVAiLE animated town scenes ("living stills")

> **SCOPE (Codex):** motion/video job. Produce short looping pixel-art scene clips per the list below.
> Save to the delivery path; never clobber originals; don't touch site code.

## The technique — the gold standard is the Grace scene
Reference: **`assets/episodes/ep-04/pixel/ep04-scene-05-grace.png`** (+ its motion versions
`ep04-scene-05-grace-motion-v3.mp4`, built from the `-a-start` / `-b-mid` / `-c-end` keyframes).

That scene works because it's a **living still**: the whole pixel painting holds *perfectly static*, and only
**one or two focal details move** — the **moth settles onto the logbook** — plus **ambient light flicker**
(the console LEDs blink, the desk lamp glows). Nothing else animates. It reads as premium and cinematic
*because* it's restrained, not busy.

**Every scene below follows that recipe:**
- A rich, fully-detailed **pixel** painting (same language as the Ep4 scenes + pixel character portraits).
- **The composition holds** (no camera move, or a *very* slow push-in) — but it should **never freeze.**
  Give it a gentle timeline that **fills the whole time the scene is on screen:**
  1. **Open** on subtle ambient motion — an arm shifting, a head tilt, lights flashing, steam curling.
  2. **The hero beat** in the middle — the one signature moment (the moth settling onto the logbook).
  3. **Settle** back into subtle ambient motion — so from the first frame to the last, something is quietly alive.
- Keep it to **ONE hero detail + ambient flicker/drift**; still restrained, just never dead-static.
- Build it the Grace way: keyframes (start → mid → end of each moving element) interpolated.
- **Loop seamlessly** so one clip can cover however long the scene holds — trailer beats run **~20–30s**, so
  make the ambient motion a clean ~**6–10s loop**; the hero beat can land once and then let the ambient carry,
  or recur gently. **1920×1080, 16:9, mp4 (H.264).**
- Palette + world = locked town style (plum #4b2148, rose #9b3f5f, pink #e982ab, teal #57b6c0, gold, cream).

## Light mode per scene (from the town canon)
- **DAY** = bright sunny 90s (blue sky, midday sun) — most Main-Street storefronts.
- **NIGHT/DUSK** = warm sunset→lavender, neon + gold twinkle (the "Dial-Up to SUNNYVAiLE" postcard look).
Each scene names its mode.

## THE SCENES (≈18 — one per location, reused across trailer + episodes + credits)
For each: **what it is · MODE · the ONE hero detail that moves (+ ambient flicker)**

1. **Whole-town establishing** (Main St, the `pc-welcome.png` view) · DUSK · the **KSVL neon heart blinks** + string lights twinkle + one tiny car rolls down Main St.
2. **The Welcome Wagon / Visitors Centre** · DAY · the **"OPEN" flag flutters**; brochure rack; door lamp.
3. **NewsStand** · DAY · a **newspaper page flutters** on the rack; the headline board; vendor light.
4. **The Library** · NIGHT · a **reading-room lamp flickers** and a page turns; Jeeves' desk lamp glows.
5. **The Mall** · DAY · the **atrium skylight shimmers**; a storefront sign blinks; faint escalator motion.
6. **The BRONZE AiGE** (bar) · NIGHT · the **neon bar sign buzzes/flickers**; warm window glow pulses.
7. **Mme CLAi-O's shop** · NIGHT · the **crystal ball glows and pulses**; candle flames flicker; "READINGS" neon.
8. **The Chick Flicks** (video store) · NIGHT · the **marquee bulbs chase**; "NOW SHOWING" flickers.
9. **The Blend & Snap** (café) · DAY · **coffee steam rises**; the neon cup sign flickers; ceiling fan turns slowly.
10. **MAiKEOVER on MAiN** · DAY · the **marquee/salon sign lights sparkle**; a little shimmer on the glass.
11. **Delta LAi Nu** (sorority house) · DUSK · **porch string-lights twinkle**; a curtain sways in a window.
12. **The FAiRY Godmother's house** · DUSK · **window glow pulses** warm; a wind-chime sways; a sparkle drifts.
13. **Town Hall** · DAY · the **flag waves**; the clock hands tick; Deb's campaign poster in a window.
14. **The Post Office** · DAY · the **mail flap swings** / a letter drops in the box; flag; lamp.
15. **SUNNYVAiLE High** · DAY · the **banner waves** ("GO CENTAURS!"); a hallway light flickers.
16. **The LUMINAiRY** (Lantern Hill) · DUSK · the **rose window glows and pulses**; lanterns sway; candle flicker.
17. **KSVL community radio** · NIGHT · the **antenna tower light pulses** (broadcasting); "ON AIR" sign; vinyl spins.
18. **The Dream Phone booth** · NIGHT · the **booth light flickers**; the phone glows as if ringing.

(Two postcards already exist as stills — `pc-welcome.png`, `pc-dial-up.webp` — a light "living still" pass on
those two is a nice-to-have, not required.)

## Output
- One clip per scene: **`assets/video/scenes/<slug>.mp4`** (e.g. `chick-flicks-day.mp4`, `mme-claio-night.mp4`).
- Report the list you made + any scene you were unsure how to animate.

## How they get used (context, not your job)
A human swaps each `type:"full"` still in `content/episodes/episode-*-cues.json` for a `type:"video"` cue
pointing at these clips — so the trailer tour, the episodes, and the credits' establishing beats all become
living stills. Start with the trailer's set; the episodes reuse the same clips.

See [[people-go-pixel]] · [[episode-pixel-art-direction]] · `trailer-opening-credits.md` · pixel-restyle-style-guide.md.
