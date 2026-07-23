# EP4 — ANIMATION TABLE (what Codex animates, per image, via Seedance)

*2026-07-22. THE per-image animation spec. For each beat: the image, its motion type
(from `comic-animation-frame-spec.md`), and the exact 5-second Seedance prompt Codex runs in
CapCut. This is the reusable weekly template — fill this table per episode and hand it to Codex.*

**Two layers of motion:**
- **background** = the ambient Seedance clip on a held image — rain on the window, screens glowing,
  candle/lamp flicker, neon buzz. Keeps the heroine ON-MODEL (no face/body warping).
- **push-in / state-change / reveal / swirl** = the bigger motion where the beat earns it.
- **HOLD** = clean text/graphic card, no animation.
- **ALREADY MADE** = Codex already delivered this clip (from the first animation brief); it just
  needs to be USED in the assembly.

🔴 **HARD-CUT RULE (learned 2026-07-22):** every event clip must be ONE continuous shot that
completes its own motion, then HOLDS its own last frame. ⛔ Never append a separate still to pad
the hold — the still won't match and it cuts. `operations/tools/check-hard-cuts.py` must pass
(zero unexplained cuts) before any clip is assembled. Moth, Fei-Fei wall, transformation all
failed this on the first pass.

⛔ Every clip: 5s (unless noted), PLAYS ONCE then holds its last frame. No loops except pure
ambient (rain/flicker/glow) which is seamless. Never warp faces, hands, bodies, or clothing.

| # | time | hold | image | motion | 5-second Seedance prompt |
|---|---|---|---|---|---|
| 0 | 0:00.00 | 14.0s | `ep04-open-01-previously-strip-comi` | HOLD | Recap strip — clean graphic card. No animation. |
| 1 | 0:14.00 | 27.0s | `ep04-open-03-title-comic-v1-exact-` | background | 5s: gold title lettering shimmers; fine dust motes drift slowly upward. Text unchanged. |
| 2 | 0:41.00 | 17.0s | `ep04-open-04-desk-comic-v1-face-lo` | background | 5s: RAIN runs down the noir city window behind her; the computer screens GLOW and the chat text softly pulses. She holds still — background only. |
| 3 | 0:58.00 | 14.0s | `ep04-open-05-unease-comic-v1-face-` | push-in | 5s: slow push-in on her face as unease crosses it; rain on the window behind; screen glow. No warping — camera move + ambient only. |
| 4 | 1:12.00 | 10.0s | `ep04-open-06-thinking-closeup-comi` | push-in | 5s: gentle push-in on the thinking close-up; a slow blink; rain streaks on glass behind. Subtle. |
| 5 | 1:22.00 | 20.0s | `ep04-open-07-questions-comic-v1-ex` | HOLD | 'The questions' emphasis text card — hold. Optional: the words fade up once. |
| 6 | 1:42.00 | 8.0s | `ep04-open-08-sunnyvaile-welcome-co` | background | 5s: SUNNYVAiLE street at dusk comes alive — storefront neon flickers on, strung lanterns sway, a soft breeze in the jacarandas. Street empty. |
| 7 | 1:50.00 | 15.0s | `ep04-open-09-recap-3panel-comic-v1` | HOLD | Recap 3-panel strip — clean card, hold. |
| 8 | 2:05.00 | 15.0s | `ep04-open-10-car-engine-comic-v5-c` | state-change | 5s: the car's ENGINE turns over — headlights flick on, a puff of exhaust, the comic '?' pops. Then settle. |
| 9 | 2:20.00 | 15.0s | `ep04-open-11-mall-directory-comic-` | background | 5s: the mall directory board's NEON letters buzz and flicker; the panel backlights cycle. She scans it — background only. |
| 10 | 2:35.00 | 13.0s | `ep04-open-12-which-ai-comic-v2-ref` | HOLD | 'Which AI?' emphasis / reference-library title card — hold. |
| 11 | 2:48.00 | 10.0s | `ep04-open-13-just-use-internet-com` | background | 5s: the clean counter scene — soft screen glow, a cursor blink. Minimal. |
| 12 | 2:58.00 | 7.0s | `ep04-open-14-question-hangs-comic-` | push-in | 5s: slow push-in as the question hangs; rain on glass; her expression settles. Ambient + camera only. |
| 13 | 3:05.00 | 17.0s | `ep04-open-15f-transformation-main-` | STATE-CHANGE — REGENERATE | Transformation: corporate → magic cloud → outfit reveal in ONE continuous shot; hold own last frame. ⚠ has a hard cut at 4.5s — check it's the cloud→reveal, not a jump. |
| 14 | 3:22.00 | 18.0s | `ep04-open-16-luminairy-approach-co` | background | 5s: LUMINAiRY approach — path lanterns flicker, fireflies drift, the rose window glows warmer as she walks up. She stays on-model, background only. |
| 15 | 3:40.00 | 20.0s | `ep04-open-17-maivens-hall-comic-v3` | background | 5s: MAiVENS hall — dozens of candles flicker, stained-glass windows shimmer with light. Still, reverent, alive. |
| 16 | 4:00.00 | 5.3s | `ep04-open-18-grace-looks-up-at-ada` | push-in | 5s: slow push-in / tilt up from Grace to Ada in the stained-glass window — leads INTO the first time-jump. |
| 17 | 4:05.30 | 5.0s | `ep04-transition-ada-timejump-londo` | SWIRL — REGENERATE | 🔴 3 scattered cut regions (flicker). The London 1843 first-transition swirl must be ONE clean move: hall dims → window wakes → swirl → bloom → LONDON 1843 card resolves inside the bloom, ONCE. No mid-clip flicker. |
| 18 | 4:10.30 | 49.7s | `ep04-scene-03-ada-loop-v1` | ONE-SHOT — EXISTS | Ada notes travel to camera, plays once. Clip: ep04-scene-03-ada-loop-v1.mp4 (Ali flagged — may want redo) |
| 19 | 5:00.00 | 41.6s | `ep04-scene-03-ada-b-mid-comic-v1-l` | background | 5s: Ada at the desk — candle flames flicker, RAIN on the London window, lamp glow. Punched-card tape catches light. |
| 20 | 5:41.55 | 5.0s | `ep04-tj-hedy-comic-v2-timnit-style` | SWIRL — ALREADY MADE | Hedy time-jump swirl. Clip: ep04-timejump-02-hollywood-comic-event-v1.mp4 |
| 21 | 5:46.55 | 45.4s | `ep04-scene-04-hedy-comic-v2-timnit` | background | 5s: Hedy on the film set — studio lamps flicker warm, the red curtain sways slightly, a background bulb hums. |
| 22 | 6:32.00 | 45.3s | `ep04-scene-04-hedy-b-mid-comic-v1-` | STATE-CHANGE — ALREADY MADE | The signal hops the blue arc, once then freezes. Clip: ep04-scene-04-hedy-b-mid-...-signal-v1.mp4 |
| 23 | 7:17.30 | 5.0s | `ep04-tj-eniac-comic-v1-exact-capti` | SWIRL — ALREADY MADE | ENIAC time-jump swirl. Clip: ep04-timejump-03-philadelphia-comic-event-v1.mp4 |
| 24 | 7:22.30 | 57.7s | `ep04-scene-04b-eniac-comic-v4-stro` | background | 5s: ENIAC hall — the machine's PANEL LAMPS blink in staggered rows across the banks; the six women hold. The room is still, the machine is alive. |
| 25 | 8:20.00 | 40.5s | `ep04-comicpage-eniac-models-comic-` | background | 5s: the comic-page museum placard — subtle: the men's name-plates and the caption fade up; camera holds. (No warping the photo.) |
| 26 | 9:00.55 | 5.0s | `ep04-tj-grace-comic-v2-philadelphi` | SWIRL — ALREADY MADE | Grace time-jump swirl. Clip: ep04-timejump-04-philadelphia-1952-comic-event-v1.mp4 |
| 27 | 9:05.55 | 29.5s | `ep04-scene-05-grace-a-start-comic-` | background | 5s: Grace dismissed — console lamps blink slow, RAIN on the office window, a desk lamp glows. |
| 28 | 9:35.00 | 40.0s | `ep04-scene-05-grace-b-mid-comic-v1` | background | 5s: Grace at the compiler — console indicator lamps cycle, the tape reels catch light, screen glow. Background only. |
| 29 | 10:15.00 | 12.6s | `ep04-scene-05-grace-c-end-comic-v1` | STATE-CHANGE — REGENERATE | 🔴 HARD CUT at 5.17s. Moth must fly in AND land in ONE continuous shot, ending on the landed moth; then hold THAT frame. ⛔ Never cut to a separate still. |
| 30 | 10:27.62 | 5.0s | `ep04-tj-dartmouth-comic-v2-timnit-` | SWIRL — ALREADY MADE | Dartmouth time-jump swirl. Clip: ep04-timejump-05-dartmouth-1956-comic-event-v1.mp4 |
| 31 | 10:32.62 | 5.4s | `ep04-scene-06-naming-comic-v1-fres` | STATE-CHANGE — ALREADY MADE | The naming writes onto the chalkboard. Clip: ep04-scene-06-naming-chalk-writes-comic-event-v1.mp4 |
| 32 | 10:38.00 | 12.0s | `ep04-scene-06-naming-b-mid-comic-v` | HOLD | Naming b-mid — short beat, hold (or tiny chalk-dust drift). |
| 33 | 10:50.00 | 11.4s | `ep04-scene-06-naming-c-end-comic-v` | HOLD | Naming c-end — short beat, hold. |
| 34 | 11:01.43 | 5.6s | `ep04-scene-07-ai-winter-a-start-co` | STATE-CHANGE — ALREADY MADE | AI-winter: the monitors go dark across the beats. Clip: ep04-scene-07-ai-winter-screens-darken-comic-event-v1.mp4 |
| 35 | 11:07.00 | 5.0s | `ep04-scene-07-ai-winter-comic-v1-f` | background | 5s: one dim monitor — screen flickers and dies; snow falling past a cold window. |
| 36 | 11:12.00 | 4.7s | `ep04-scene-07-ai-winter-c-end-comi` | background | 5s: dark room — the last screen-glow fades; snow out the window. |
| 37 | 11:16.70 | 5.0s | `ep04-tj-karen-comic-v2-timnit-styl` | SWIRL — ALREADY MADE | Karen time-jump swirl. Clip: ep04-timejump-06-cambridge-1972-comic-event-v1.mp4 |
| 38 | 11:21.70 | 51.3s | `ep04-scene-08-karen-comic-v3-clean` | background | 5s: Karen at the terminal — the green CRT breathes (brightness pulses), RAIN on the window, server LEDs blink behind. |
| 39 | 12:13.00 | 32.0s | `ep04-scene-08-karen-c-end-comic-v1` | background | 5s: Karen c-end — CRT glow pulse, rain continues. Background only. |
| 40 | 12:44.98 | 5.0s | `ep04-tj-feifei-comic-v1-exact-capt` | SWIRL — ALREADY MADE | Fei-Fei time-jump swirl. Clip: ep04-timejump-07-fei-fei-comic-event-v1.mp4 |
| 41 | 12:49.98 | 27.0s | `ep04-scene-09-fei-fei-a-start-comi` | HOLD | Fei-Fei empty wall — hold (or a faint monitor glow). This is the 'before' of the reveal. |
| 42 | 13:17.00 | 23.0s | `ep04-scene-09-fei-fei-b-mid-comic-` | REVEAL — REGENERATE | 🔴 HARD CUT at 1.5s. Wall must fill from empty to full in ONE continuous shot; then hold the full-wall frame. ⛔ Never cut to a separate still. |
| 43 | 13:40.00 | 23.8s | `ep04-scene-09-fei-fei-comic-v2-tim` | background | 5s: 'it sees' — the wall of images shimmers, the monitor glows, Fei-Fei holds. Background only. |
| 44 | 14:03.80 | 51.9s | `ep04-open-04-desk-comic-v1-face-lo` | background | 5s: back at the desk (present day) — RAIN on the noir window, computer SCREENS GLOW and chat pulses. Same treatment as beat 2. |
| 45 | 14:55.65 | 2.0s | `ep04-tj-modern-comic-v1-2018-2021-` | SWIRL — ALREADY MADE | Modern 2018–2021 time-jump swirl. Clip: ep04-timejump-08-2018-2021-comic-event-v1.mp4 |
| 46 | 14:57.65 | 28.1s | `ep04-scene-11a-joy-comic-v2-timnit` | background | 5s: Joy at her screen — monitor glow, code scrolls faintly, a cursor blinks. On-model, background only. |
| 47 | 15:25.80 | 20.2s | `ep04-scene-11b-timnit-comic-v1-rai` | background | 5s: Timnit raising the alarm — screen glow, a notification pulses, rain on glass. |
| 48 | 15:46.00 | 8.0s | `ep04-scene-11c-emily-comic-v2-timn` | background | 5s: Emily + the parrot — screen glow, the parrot shifts slightly on its perch (subtle), papers flutter. |
| 49 | 15:54.00 | 17.6s | `ep04-scene-11b-timnit-comic-v1-rai` | background | 5s: Timnit again — screen glow, alarm pulse. Background only. |
| 50 | 16:11.60 | 32.1s | `ep04-scene-11d-kate-comic-v2-timni` | background | 5s: Kate — server-rack LEDs blink in the racks; the supply-chain waterfall gets a slow downward shimmer. Background only. |
| 51 | 16:43.68 | 36.3s | `ep04-splash-lights-up-comic-v1-sta` | DISSOLVE start — ALREADY MADE | Splash dim → blazing is one clip: ep04-splash-lights-up-portraits-ignite-comic-event-v1.mp4 (covers 51+52). |
| 52 | 17:20.00 | 42.9s | `ep04-splash-lights-up-comic-v1-end` | (covered by 51) | Part of the splash ignite clip above. |
| 53 | 18:02.90 | 45.1s | `ep04-cocktail-comic-v1-exact-mixed` | HOLD | Cocktail text card — hold (or letters fade up once). |
| 54 | 18:48.00 | 28.0s | `ep04-around-town-comic-v2-correct-` | HOLD | Around-town 4-panel — hold. (Graphic card.) |
| 55 | 19:16.00 | 28.0s | `ep04-sign-off-comic-v1-1920` | HOLD | Sign-off card — hold. |
| 56 | 19:44.00 | 38.4s | `ep04-next-week-comic-v1-1920` | HOLD | Next-week card — hold (or the trio fades up once). |

## Counts
- **15 clips ALREADY MADE** by Codex — transformation, moth, chalk, ai-winter, wall, splash, 8 swirls, Ada, Hedy signal. Assembly just needs to USE them (that's the bug in v4 — it used stills).
- **24 background ambient clips to generate** — rain/glow/flicker/lamps. The bulk of the opening + talking beats.
- **4 push-ins to generate** — unease, thinking, question-hangs, Grace-looks-up.
- **11 HOLDs** — text/graphic cards, no animation.

## What Codex does with this
1. For every **background** and **push-in** row: run the image through **Seedance** to make the
   5-second clip described, in CapCut.
2. For **ALREADY MADE** rows: drop the existing clip in — do NOT regenerate.
3. Place each at its in-time; HOLDs stay as stills. Export clean (no burned captions).

⚠ THE v4 BUG: the assembly used flat stills for the whole opening + the ambient beats, so there
is ZERO motion until 3:05. Every `background` row below is currently a dead still in v4 and needs
its Seedance clip.
