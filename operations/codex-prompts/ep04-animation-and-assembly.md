# EP4 — FULL ANIMATION + ASSEMBLY BRIEF (runnable)

*2026-07-22. ONE document: every beat, its source image, the exact action, synced to the
narration. Do all of it, in order, then assemble and export clean.*

## THE PIPELINE (do all four)
1. **GENERATE** the 5-second Seedance clips listed below (background ambient + push-ins) from the
   named source image. Output each to the path given.
2. **REGENERATE** the 4 clips that failed the hard-cut check — each as ONE continuous shot that
   completes its motion then holds its own last frame. ⛔ Never pad a clip with a separate still.
3. **USE** the existing clips marked USE (they passed the check — do not regenerate).
4. **ASSEMBLE** on one CapCut timeline at the in-times below, synced to
   `content/music/episode-04-narration.mp3`. Every clip PLAYS ONCE then holds its last frame.
   Swirls resolve into their era card. Export **clean, NO captions in the video** to
   `assets/video/episode-04-full-v5.mp4` (1920×1080 H.264 + audio). Do NOT overwrite v2/v3/v4.

## QC BEFORE DELIVERY (must pass)
- `python3 operations/tools/check-hard-cuts.py` → all clips PASS (no unexplained cuts).
- Runtime 20:22.40. No text burned over the picture anywhere. Title lands on the words at 0:37.

⚠ **The title (cue 1) is RE-SNAPPED to 0:37.1** — it must land on *"This is Episode Four: The
Founding Mothers,"* not sit dead from 0:14. Everything 0:14–0:37 is the intro beats.

## EVERY BEAT

| # | in-time | hold | source image | action |
|---|---|---|---|---|
| 0 | 0:00.00 | 37.1s | `assets/episodes/ep-04/pixel/ep04-open-01-previously-strip-comic-v6-regina-outfit-1920.png` | HOLD still — no animation |
| 1 | 0:37.10 | 3.9s | `assets/episodes/ep-04/pixel/ep04-open-03-title-comic-v1-exact-text-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-03-title-comic-v1-exact-text-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue01-seedance-v1.mp4`. HOLD (title card — lands here on the words; letters may fade up once) |
| 2 | 0:41.00 | 17.0s | `assets/episodes/ep-04/pixel/ep04-open-04-desk-comic-v1-face-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-04-desk-comic-v1-face-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue02-seedance-v1.mp4`. 5s Seedance: RAIN runs down the noir window behind her; computer screens GLOW, chat text softly pulses. She holds — background only. |
| 3 | 0:58.00 | 14.0s | `assets/episodes/ep-04/pixel/ep04-open-05-unease-comic-v1-face-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-05-unease-comic-v1-face-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue03-seedance-v1.mp4`. 5s Seedance: slow push-in on her face as unease crosses it; rain on the window; screen glow. Camera move + ambient only, no warping. |
| 4 | 1:12.00 | 10.0s | `assets/episodes/ep-04/pixel/ep04-open-06-thinking-closeup-comic-v1-face-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-06-thinking-closeup-comic-v1-face-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue04-seedance-v1.mp4`. 5s Seedance: gentle push-in on the thinking close-up; one slow blink; rain streaks behind. Subtle. |
| 5 | 1:22.00 | 20.0s | `assets/episodes/ep-04/pixel/ep04-open-07-questions-comic-v1-exact-text-1920.png` | HOLD still — no animation |
| 6 | 1:42.00 | 8.0s | `assets/episodes/ep-04/pixel/ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue06-seedance-v1.mp4`. 5s Seedance: SUNNYVAiLE street at dusk comes alive — neon flickers on, strung lanterns sway, breeze in the jacarandas. Empty street. |
| 7 | 1:50.00 | 15.0s | `assets/episodes/ep-04/pixel/ep04-open-09-recap-3panel-comic-v1-exact-captions-1920.png` | HOLD still — no animation |
| 8 | 2:05.00 | 15.0s | `assets/episodes/ep-04/pixel/ep04-open-10-car-engine-comic-v5-comic-question-mark-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-10-car-engine-comic-v5-comic-question-mark-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue08-seedance-v1.mp4`. 5s Seedance: the car ENGINE turns over — headlights flick on, a puff of exhaust, the comic '?' pops; then settle. |
| 9 | 2:20.00 | 15.0s | `assets/episodes/ep-04/pixel/ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue09-seedance-v1.mp4`. 5s Seedance: the mall directory NEON letters buzz/flicker, panel backlights cycle. She scans it — background only. |
| 10 | 2:35.00 | 13.0s | `assets/episodes/ep-04/pixel/ep04-open-12-which-ai-comic-v2-reference-library-title-1920.png` | HOLD still — no animation |
| 11 | 2:48.00 | 10.0s | `assets/episodes/ep-04/pixel/ep04-open-13-just-use-internet-comic-v2-clean-counter-no-sign-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-13-just-use-internet-comic-v2-clean-counter-no-sign-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue11-seedance-v1.mp4`. 5s Seedance: clean counter — soft screen glow, a cursor blink. Minimal. |
| 12 | 2:58.00 | 7.0s | `assets/episodes/ep-04/pixel/ep04-open-14-question-hangs-comic-v1-face-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-14-question-hangs-comic-v1-face-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue12-seedance-v1.mp4`. 5s Seedance: slow push-in as the question hangs; rain on glass; her expression settles. |
| 13 | 3:05.00 | 17.0s | `assets/episodes/ep-04/pixel/ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-open-15p-transformation-comic-event-v1.mp4` — the ABSTRACT-STAGE corporate → magic cloud → outfit reveal. ⛔ NOT the Main-Street 15f frame (banned). |
| 14 | 3:22.00 | 18.0s | `assets/episodes/ep-04/pixel/ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue14-seedance-v1.mp4`. 5s Seedance: LUMINAiRY approach — path lanterns flicker, fireflies drift, rose window glows warmer. On-model, background only. |
| 15 | 3:40.00 | 20.0s | `assets/episodes/ep-04/pixel/ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue15-seedance-v1.mp4`. 5s Seedance: MAiVENS hall — candles flicker, stained-glass shimmers with light. Still, reverent, alive. |
| 16 | 4:00.00 | 5.3s | `assets/episodes/ep-04/pixel/ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue16-seedance-v1.mp4`. 5s Seedance: slow push-in / tilt from Grace up to Ada in the stained-glass window — leads INTO the London swirl. |
| 17 | 4:05.30 | 5.0s | `assets/episodes/ep-04/pixel/ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png` | **REGENERATE** (fails hard-cut check) → one continuous shot, hold own last frame → `assets/episodes/ep-04/pixel/ep04-timejump-01-london-1843-comic-event-v1.mp4` |
| 18 | 4:10.30 | 49.7s | `assets/episodes/ep-04/clips/ep04-scene-03-ada-loop-v1.mp4` | USE existing clip `assets/episodes/ep-04/pixel/ep04-scene-03-ada-punched-card-toward-camera-comic-event-v1.mp4` (passed check) |
| 19 | 5:00.00 | 41.6s | `assets/episodes/ep-04/pixel/ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue19-seedance-v1.mp4`. 5s Seedance: Ada at the desk — candle flames flicker, RAIN on the London window, lamp glow, tape catches light. |
| 20 | 5:41.55 | 5.0s | `assets/episodes/ep-04/pixel/ep04-tj-hedy-comic-v2-timnit-style-lock-exact-caption-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-timejump-02-hollywood-comic-event-v1.mp4` (passed check) |
| 21 | 5:46.55 | 45.4s | `assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue21-seedance-v1.mp4`. 5s Seedance: Hedy on the film set — studio lamps flicker warm, red curtain sways slightly. |
| 22 | 6:32.00 | 45.3s | `assets/episodes/ep-04/pixel/ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-scene-04-hedy-b-mid-comic-v1-locked-1920-signal-v1.mp4` (passed check) |
| 23 | 7:17.30 | 5.0s | `assets/episodes/ep-04/pixel/ep04-tj-eniac-comic-v1-exact-caption-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-timejump-03-philadelphia-comic-event-v1.mp4` (passed check) |
| 24 | 7:22.30 | 57.7s | `assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue24-seedance-v1.mp4`. 5s Seedance: ENIAC hall — panel LAMPS blink in staggered rows across the banks; the six women hold. Room still, machine alive. |
| 25 | 8:20.00 | 40.5s | `assets/episodes/ep-04/pixel/ep04-comicpage-eniac-models-comic-v2-barnes-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-comicpage-eniac-models-comic-v2-barnes-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue25-seedance-v1.mp4`. 5s Seedance: the museum placard — the men's name-plates + caption fade up; camera holds. Do not warp the photo. |
| 26 | 9:00.55 | 5.0s | `assets/episodes/ep-04/pixel/ep04-tj-grace-comic-v2-philadelphia-1952-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-timejump-04-philadelphia-1952-comic-event-v1.mp4` (passed check) |
| 27 | 9:05.55 | 29.5s | `assets/episodes/ep-04/pixel/ep04-scene-05-grace-a-start-comic-v1-locked-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-05-grace-a-start-comic-v1-locked-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue27-seedance-v1.mp4`. 5s Seedance: Grace dismissed — console lamps blink slow, RAIN on the window, desk lamp glow. |
| 28 | 9:35.00 | 40.0s | `assets/episodes/ep-04/pixel/ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue28-seedance-v1.mp4`. 5s Seedance: Grace at the compiler — indicator lamps cycle, tape reels catch light, screen glow. |
| 29 | 10:15.00 | 12.6s | `assets/episodes/ep-04/pixel/ep04-scene-05-grace-c-end-comic-v1-locked-1920.png` | **REGENERATE** (fails hard-cut check) → one continuous shot, hold own last frame → `assets/episodes/ep-04/pixel/ep04-scene-05-grace-moth-landing-comic-event-v1.mp4` |
| 30 | 10:27.62 | 5.0s | `assets/episodes/ep-04/pixel/ep04-tj-dartmouth-comic-v2-timnit-style-lock-exact-caption-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-timejump-05-dartmouth-1956-comic-event-v1.mp4` (passed check) |
| 31 | 10:32.62 | 5.4s | `assets/episodes/ep-04/pixel/ep04-scene-06-naming-comic-v1-fresh-exact-board-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-scene-06-naming-chalk-writes-comic-event-v1.mp4` (passed check) |
| 32 | 10:38.00 | 12.0s | `assets/episodes/ep-04/pixel/ep04-scene-06-naming-b-mid-comic-v1-locked-1920.png` | HOLD still — no animation |
| 33 | 10:50.00 | 11.4s | `assets/episodes/ep-04/pixel/ep04-scene-06-naming-c-end-comic-v1-locked-1920.png` | HOLD still — no animation |
| 34 | 11:01.43 | 5.6s | `assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-a-start-comic-v1-locked-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-screens-darken-comic-event-v1.mp4` (passed check) |
| 35 | 11:07.00 | 5.0s | `assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-comic-v1-fresh-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-comic-v1-fresh-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue35-seedance-v1.mp4`. 5s Seedance: one dim monitor flickers and dies; snow falls past a cold window. |
| 36 | 11:12.00 | 4.7s | `assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-c-end-comic-v1-locked-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-c-end-comic-v1-locked-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue36-seedance-v1.mp4`. 5s Seedance: dark room — the last screen-glow fades; snow out the window. |
| 37 | 11:16.70 | 5.0s | `assets/episodes/ep-04/pixel/ep04-tj-karen-comic-v2-timnit-style-lock-exact-caption-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-timejump-06-cambridge-1972-comic-event-v1.mp4` (passed check) |
| 38 | 11:21.70 | 51.3s | `assets/episodes/ep-04/pixel/ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue38-seedance-v1.mp4`. 5s Seedance: Karen at the terminal — green CRT breathes (brightness pulses), RAIN on the window, server LEDs blink. |
| 39 | 12:13.00 | 32.0s | `assets/episodes/ep-04/pixel/ep04-scene-08-karen-c-end-comic-v1-locked-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-08-karen-c-end-comic-v1-locked-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue39-seedance-v1.mp4`. 5s Seedance: Karen c-end — CRT glow pulse, rain continues. |
| 40 | 12:44.98 | 5.0s | `assets/episodes/ep-04/pixel/ep04-tj-feifei-comic-v1-exact-caption-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-timejump-07-fei-fei-comic-event-v1.mp4` (passed check) |
| 41 | 12:49.98 | 27.0s | `assets/episodes/ep-04/pixel/ep04-scene-09-fei-fei-a-start-comic-v1-locked-1920.png` | HOLD still — no animation |
| 42 | 13:17.00 | 23.0s | `assets/episodes/ep-04/pixel/ep04-scene-09-fei-fei-b-mid-comic-v1-locked-1920.png` | **REGENERATE** (fails hard-cut check) → one continuous shot, hold own last frame → `assets/episodes/ep-04/pixel/ep04-scene-09-fei-fei-wall-fills-comic-event-v1.mp4` |
| 43 | 13:40.00 | 23.8s | `assets/episodes/ep-04/pixel/ep04-scene-09-fei-fei-comic-v2-timnit-style-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-09-fei-fei-comic-v2-timnit-style-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue43-seedance-v1.mp4`. 5s Seedance: 'it sees' — the wall of images shimmers, monitor glows, Fei-Fei holds. |
| 44 | 14:03.80 | 51.9s | `assets/episodes/ep-04/pixel/ep04-open-04-desk-comic-v1-face-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-open-04-desk-comic-v1-face-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue44-seedance-v1.mp4`. 5s Seedance: back at the present-day desk — RAIN on the noir window, screens GLOW, chat pulses (same as beat 2). |
| 45 | 14:55.65 | 2.0s | `assets/episodes/ep-04/pixel/ep04-tj-modern-comic-v1-2018-2021-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-timejump-08-2018-2021-comic-event-v1.mp4` (passed check) |
| 46 | 14:57.65 | 28.1s | `assets/episodes/ep-04/pixel/ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue46-seedance-v1.mp4`. 5s Seedance: Joy at her screen — monitor glow, code scrolls faintly, cursor blinks. |
| 47 | 15:25.80 | 20.2s | `assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue47-seedance-v1.mp4`. 5s Seedance: Timnit raising the alarm — screen glow, a notification pulses, rain on glass. |
| 48 | 15:46.00 | 8.0s | `assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue48-seedance-v1.mp4`. 5s Seedance: Emily + parrot — screen glow, the parrot shifts slightly, papers flutter. |
| 49 | 15:54.00 | 17.6s | `assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue49-seedance-v1.mp4`. 5s Seedance: Timnit again — screen glow, alarm pulse. |
| 50 | 16:11.60 | 32.1s | `assets/episodes/ep-04/pixel/ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png` | GENERATE 5s Seedance from `assets/episodes/ep-04/pixel/ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png` → `assets/episodes/ep-04/pixel/ep04-cue50-seedance-v1.mp4`. 5s Seedance: Kate — server-rack LEDs blink; the supply-chain waterfall gets a slow downward shimmer. |
| 51 | 16:43.68 | 36.3s | `assets/episodes/ep-04/pixel/ep04-splash-lights-up-comic-v1-start-dim-1920.png` | USE existing clip `assets/episodes/ep-04/pixel/ep04-splash-lights-up-portraits-ignite-comic-event-v1.mp4` (passed check) |
| 52 | 17:20.00 | 42.9s | `assets/episodes/ep-04/pixel/ep04-splash-lights-up-comic-v1-end-blazing-1920.png` | HOLD still — no animation |
| 53 | 18:02.90 | 45.1s | `assets/episodes/ep-04/pixel/ep04-cocktail-comic-v1-exact-mixed-case-1920.png` | HOLD still — no animation |
| 54 | 18:48.00 | 28.0s | `assets/episodes/ep-04/pixel/ep04-around-town-comic-v2-correct-lettering-1920.png` | HOLD still — no animation |
| 55 | 19:16.00 | 28.0s | `assets/episodes/ep-04/pixel/ep04-sign-off-comic-v1-1920.png` | HOLD still — no animation |
| 56 | 19:44.00 | 38.4s | `assets/episodes/ep-04/pixel/ep04-next-week-comic-v1-1920.png` | HOLD still — no animation |

---

*Standing art-requirements (carried so the guardrail hook passes):*

## HARD REQUIREMENTS — a frame failing any of these is rejected

**1 · Exactly 1920 × 1080.** Wrong dimensions are auto-rejected before review.

**2 · Style `comic-v1-locked`** — bold black ink, HARD ANGULAR shadow PLANES, flat saturated colour. ⛔ No halftone. ⛔ Not painterly, watercolour, airbrushed or blotchy.

**3 · CONTINUITY IS NOT OPTIONAL.** Each frame below names the shot before it and/or after it *in the same scene*. The new frame must read as the same room, the same moment, the same person — same hair, same clothes, same light, same period. If the anchor shows her in a green dress at a desk by a window, she is still in that green dress at that desk. ⛔ Do not restyle, re-cast or re-dress between shots.

**4 · LIKENESS.** Every named real woman has a photo reference path. Match HER face. ⛔ Do not invent a plausible person. A woman appearing in several beats uses the SAME reference in every one.

**5 · SETTING MUST BE REAL.** A real SUNNYVAiLE building or a genuine historical location. ⛔ No invented places. ⛔ No literal mashups — do not weld a biographical detail onto a technical one (e.g. a dataset's photos pinned up inside a family's dry-cleaning shop).

**5b · SUNNYVAiLE GEOGRAPHY IS CANON.** If two or more buildings appear in one shot, they must be neighbours in the real town. ⛔ Do not invent an adjacency to fill a frame.

> **MAiN Street, in order:** 1 Visitor's Centre · 2 NewsStand · 3 Chick Flicks · 4 Blend & Snap · 5 Mme CLAi-O's · 6 MAiKEOVER on MAiN · 7 BRONZE AiGE · 8 Dream Phone booth · 9 The Mall · 10 KSVL 99.9
>
> **NOT on MAiN** — these are on cross streets that run BEHIND it: **LIBRAiRY, Town Hall, Post Office** (Civic Square — LIBRAiRY on the RIGHT, Post Office on the LEFT) · **SUNNYVAiLE High** (Schoolhouse Road) · **FAiRY Godmother's house** (Willow Lane) · **Delta LAi Nu** (Wisteria Lane) · **The LUMINAiRY** (Lantern Hill).

⛔ **The LIBRAiRY is NOT on MAiN Street and is NOT beside Blend & Snap.** This exact error has now been made three times — `main-street-golden`, `main-street-dusk` (both re-rolled 2026-07-06) and `ep04-around-town-b-comic-v1` (banned 2026-07-22). Full layout: memory `sunnyvaile-street-layout-canon`.

**6 · PHYSICAL PLAUSIBILITY.** Objects obey physics. A stack of paper is separate sheets with edges, not a solid slab with text printed on its side.

**6b · ANATOMY.** Every figure has a complete, correctly-jointed body. If a person is shown below the waist she has **legs and feet** that connect to her hips and reach the ground. ⛔ No body that simply stops behind a foreground object. ⛔ No missing or extra limbs, no hands with the wrong number of fingers, no head attached at an impossible angle. If a prop would crop the figure, crop the FRAME deliberately — do not delete the body part.

**7 · "AI" is ALWAYS both letters capital** — never "Ai". The accented i belongs to brand words only (LAiDIES, SUNNYVAiLE, MAiVENS, LUMINAiRY).

**6c · PERIOD ACCURACY.** Nothing in frame may postdate the year of the scene — no flat screens in 1952, no mobile phones in 1946, no modern typography on period signage. The LOCATION must be the real place the event happened. The NUMBER of people must be right (the ENIAC programmers are SIX).

**6d · AGE.** Each woman is the age she was AT THIS MOMENT, not her famous later portrait. Grace Hopper in 1952 is 45 and a civilian — not the white-haired Rear Admiral of decades later.

**6e · BACKGROUND FIGURES.** Faces in the background must be coherent — no melted, smeared or half-formed features. If a face cannot be drawn cleanly at that size, turn the figure away or move it further back.

**7b · EVERY WORD LEGIBLE AND CORRECT.** No garbled or invented lettering anywhere — signage, screens, book spines, papers. Check numbers: KSVL is **99.9**. Check brand spellings: LUMINAiRY has ONE accented i. ⛔ Do not letter a word you cannot render cleanly — leave the surface plain instead.

**8b · READS AT VIDEO SIZE.** The subject must be legible when this plays at 1/3 screen. ⛔ No critical detail so small it disappears — if the beat is about a face, the face is large in frame.

**8 · Populated SUNNYVAiLE scenes** = women in Y2K-era dress, diverse. Storefronts empty.

**9 · Never mix generations.** No pixel, `comic-barsetter` or `comic-v2-graphic-novel` frames scavenged or adapted. Draw fresh in `comic-v1-locked`.

**10 · Text rendered IN-generation.** No blank plates for text added later.

### 🔴 THE HEROINE'S OUTFIT — ONE LOOK FOR THE WHOLE EPISODE
She wears a **different outfit each week, and the SAME outfit in every frame of a given episode**, with 90s-styled hair.

> **EPISODE OUTFIT:** _injected per episode from `episode-0N.canon.md` → `## heroine_outfit`_

⛔ **NEVER corporate.** No navy pantsuit, no blazer-and-blouse, no office tailoring. SUNNYVAiLE is a Y2K town and she lives there — she does not commute in from a law firm. In the Ep4 batch she appeared in four different outfits, four of them corporate.
