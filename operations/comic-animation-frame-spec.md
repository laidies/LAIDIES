# Comic ANIMATION frame spec — how many images each motion/transition needs (standard for ALL batches)

The still keyframes get animated into ~10s clips (agent opus / CapCut) synced to narration. An animation
needs a **SEQUENCE of keyframes** as targets — NOT one image. For every animated beat, a batch must state:
(1) the MOTION/effect, (2) the FRAME SEQUENCE (what each keyframe shows), (3) the IMAGE COUNT. Grounded in
`operations/reference/comic-storytelling/README.md` (camera moves across static panels + transitions).

## THE MOTION TYPES → how many frames each needs
| Motion | What it is | Frames needed | Spec each frame as |
|---|---|---|---|
| **Push-in** (zoom to a realization) | camera moves closer over the beat | **2** (min): `-start` wide → `-end` close | same subject, closer + tighter |
| **Pull-out / reveal** (show scale) | widen to reveal context | **2**: `-start` close → `-end` wide | end shows the full scale (e.g. the ImageNet wall) |
| **Pan** (eye travels a wide scene) | one long panel scanned L→R | **1** wide panel (motion = the pan itself) | a wide establishing image |
| **State change** (something happens) | an event mid-beat (moth lands, notes rise, windows light, chalk written) | **2–3**: `-start` (before) → `-mid` (mid-event) → `-end` (after) | each shows the event's progress |
| **Whip / flash-cut** (hard jump) | abrupt cut between two very different panels | **2** panels (the before + the after) | grounds a scene/time jump |
| **Montage** (compress time) | several small panels in one glance | **3–5** small panels | each a quick moment (e.g. AI-winter years, Y2K era) |
| **Static hold** (a talking/text beat) | little/no motion, subtle ambient only | **1** | the keyframe; opus adds tiny ambient life |

## SPECIAL SEQUENCES (spell these out fully in the batches)
- **✨ TRANSFORMATION (reusable, ~9–11 frames — 5 was TOO CHOPPY, Ali 2026-07-19):** full-body throughout.
  `1` heroine CORPORATE → `2`–`4` FAiRY Godmother **wand motion in-betweens** (raise → arc → contact —
  ≥3 frames so it's smooth, not choppy) → `5`–`6` **magic-effect building** (sparkle/POOF, multiple frames)
  → `7` **MID-TRANSFORMATION frame** (her form actually CHANGING mid-swap — the outfit morphing, an actual
  transition state, not just sparkle) → `8`–`9` **magic clearing** (more effect frames) → `10` heroine
  REVEALED in the week's SUNNYVAiLE outfit. **Frames 1–9 are SHARED/reused; only the final REVEAL changes
  per episode.** ⚠ Need MORE wand-motion + MORE magic-effect frames than a 5-frame cut (too choppy).
  ⚠ HAIR in the reveal = the LOCKED heroine-kit hair (3 sections each side / 6 butterfly clips, half-up in
  waves — refs `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-…` + turnaround/expression sheets);
  NOT clips in a single vertical line.
- **PAGE-TURN time-jump (comic transition, ~3 frames):** `1` current panel → `2` a comic **page mid-turn**
  (the page lifting/curling, aged wash beginning) → `3` the new era's panel (e.g. the `LONDON, 1843` card).
  = **3 images** (or 2 + the destination time-jump card we already have).
- **WINDOWS/PORTRAITS IGNITE IN SEQUENCE (LUMINAiRY, ~3 frames):** `-start` dim hall → `-mid` first
  windows lit as she passes → `-end` all lit. = **3 images.**
- **SPLASH ignite (finale):** `-start` dim → `-end` all portraits blazing = **2 images.**
- **TEXT / EMPHASIS frames:** usually **1** (static hold), unless the burst "pops in" → then `-start` (small/
  faint) → `-end` (full) = **2**.

## HOW TO WRITE IT IN A BATCH (per animated beat)
> **Beat:** [what happens] · **Motion:** [push-in / state-change / etc.] · **Frames (N):**
> `slug-a-start.png` = [state], `slug-b-mid.png` = [state], `slug-c-end.png` = [state] · **Hold** on last frame.

Reuse the `-a-start` / `-b-mid` / `-c-end` naming from `ep04-shot-direction.md`. If `-a-start` "= the
keyframe," don't re-generate it. **Only list frames that DIFFER** (a state-change needs its mid/end;
a pure push-in can be opus-driven from one keyframe if budget-tight, but 2 is safer).

## DEFAULT PACING (from shot-direction)
~0–2s establish (near `-start`) → 2–7s the move/event → 7–10s settle + **hold** on `-end`. Play once, hold
(no loops). Every beat has a directed EVENT, not just a camera drift.
