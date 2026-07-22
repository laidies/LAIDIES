# EP4 — MOTION BRIEF (CapCut)

**Done in CapCut, not Canva** — the cut is already there, so motion stays on one timeline with
no re-import and no reframing drift.

**Everything below uses art ALREADY WIRED in the cut.** Nothing here needs new art.

## The rules, restated
- **Background motion only** — light, glow, rain, dust, panel lamps. ⛔ Never faces, bodies,
  hands or expressions.
- ⛔ No camera push/pan on a still that wasn't framed for it.

### The loop test — decide the category BEFORE briefing anything
| ✅ LOOPABLE — motion IN PLACE, zero net travel | ⛔ NOT loopable — DIRECTIONAL travel |
|---|---|
| flicker · pulse · glow breathing · shimmer | anything drifting across frame or toward camera |
| candle flames, panel lamps, screen glow | notes/particles flowing outward |
| rain on glass (continuous, no start) | smoke rising, a build, a wipe, a reveal |

**Loopable** → loops for the length of the hold. Last frame is indistinguishable from the
first, so there is no visible jump. Cap at ~2 visible cycles.

**Directional** → **PLAYS ONCE, then FREEZES on its own final frame.** Never twice. Never
looped. A directional clip that repeats jumps backwards and reads as broken.

---

## 🥇 DO THIS ONE FIRST — the LUMINAiRY comes up (16:43 → 18:02, 79s)

Two frames of **the same hall**, one dim and one blazing:
- `ep04-splash-lights-up-comic-v1-start-dim-1920.png` — in at 16:43.68, holds 36.3s
- `ep04-splash-lights-up-comic-v1-end-blazing-1920.png` — in at 17:20.00, holds 42.9s

Right now it's a **cut** between them. It should be a **slow cross-dissolve** so the hall
visibly comes up while she talks.

**CapCut:** stack blazing on the track above dim. Keyframe the blazing clip's **opacity 0 → 100
across ~14s**, starting around 17:06 and completing near 17:20. Ease in-out, not linear.
Everything else holds.

This is the single biggest improvement available and it costs no new art — it turns the
episode's emotional peak from a static hold into the lights actually coming up. It also
directly answers *"it says lights go soft and nothing happens."*

---

## Ambient loops — safe, in-place, zero net travel

| In | Hold | Frame | Motion |
|---|---|---|---|
| 7:22.30 | **57.7s** | `eniac-comic-v4-strong-face-shadows-six-women` | **Panel lamps blink.** Mask the indicator lights on the machine banks; loop opacity 60–100% at staggered offsets, 2–3s cycle. The room is still, the machine is alive. Longest hold in the episode. |
| 11:21.70 | 51.3s | `karen-comic-v3-clean-nose-timnit-style-lock` | **CRT breathes + rain on the window.** Mask the green screen, loop brightness ±8% over 4s. Rain: a soft overlay at low opacity, downward — continuous, so it has no start or end. |
| 14:03.80 | 51.9s | `open-04-desk-comic-v1-face-lock` | **Monitor glow pulse.** Mask the screen only, opacity 85–100% over 5s. |
| 5:00.00 | 41.6s | `ada-b-mid-comic-v1-locked` | **Candle flicker + rain.** Two small masks on the candle flames, irregular 0.4–0.9s brightness jitter. Rain on the window as above. |
| 9:35.00 | 40.0s | `grace-b-mid-comic-v1-locked` | **Console lamps.** Same treatment as ENIAC, slower. |
| 16:11.60 | 32.1s | `kate-comic-v2-timnit-style-lock-supply-chain` | **Server rack LEDs** blink in the racks; the waterfall gets a very slight continuous downward shimmer. |

All six are **true loops** — nothing travels, so the last frame equals the first.

---

## One-shots — PLAY ONCE, then FREEZE

| In | Hold | Frame | Motion |
|---|---|---|---|
| 6:32.00 | 45.3s | `hedy-b-mid-comic-v1-locked` | **The signal hops.** Reveal the blue dotted arc left→right over ~6s (mask wipe), then **freeze**. It draws the idea as she explains it. ⛔ Do not loop — it travels. |
| 8:20.00 | 40.5s | `eniac-c-end-comic-v1-locked` | Slow **opacity reveal of the MODELS→PROGRAMMERS caption** over 3s, then freeze. |

---

## ⚠ Fix the existing Ada clip (4:10.30, 49.7s)
`ep04-scene-03-ada-loop-v1.mp4` currently repeats ~5 times across the hold — Ali:
*"the animation just loops a bunch and looks bad."*

The notes travel toward camera — that is **directional motion**, so it is a **ONE-SHOT**.

**Fix in CapCut:** play it through **ONCE**, then **freeze its own final frame** for the rest
of the hold. ⛔ Not twice. ⛔ Not looped. ⛔ Do not cut to `ada-c-end` or any still — a clip's
source still is NOT a frame of that clip, and the mismatch reads as a broken cut.

---

## Leave alone
The four-panel `around-town`, `sign-off`, `next-time`, `cocktail` and the title card are
graphic/text frames. Motion on them reads as an accident, not a choice.
