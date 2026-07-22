# REUSABLE TRANSFORMATION SEQUENCE - corporate -> episode outfit

The Heroine's weekly transformation. Reusable across every episode: keep the same abstract transformation stage and magic-cloud beats, then change only the final outfit reveal for that episode.

Updated 2026-07-19: drop the wand and drop the Sunnyvaile street reveal. The street-background version caused too much face/style/background drift. The transition now happens on a reusable 90s geometric stage so the only weekly variable is the final outfit.

## ⚠⚠ STANDARDIZED — ALL EPISODES USE THE SAME 5-FRAME SEQUENCE (Ali 2026-07-19)
Standard = **5 frames** (the `p0–p4` stage set). NOTE: the Ep2 "10-frame" `09a–j` set turned out to be **5
distinct images padded with EXACT duplicates** (09b=09c, 09d=09e=09f, 09g=09h=09i — verified by md5) — there
was never a real 10-frame version. So 5-frame is correct and matches what Ep3/Ep4 already use.
- Frames (per episode, one self-consistent batch): `Np0` corporate start → `Np1` poof build → `Np2` poof cover
  → `Np3` poof clear → `Np4` REVEAL (that week's outfit). Ep2 = `09p0–09p4`, Ep3 = `05p0–05p4`, Ep4 = `15p0–15p4`.
- Frames 0–3 are the reusable core; only the REVEAL (`Np4`) is episode-specific.
- No re-gen needed for frame-count — all three episodes already have their 5-frame `p` set.

## ⚠ FACE-CONSISTENCY RULE for assembling the animation (Ali 2026-07-19)
The transformation is a multi-frame animation cut from generated stills. **Every frame in the final sequence
MUST share the SAME face** — or it flickers between two different people. The reliable way: assemble from **ONE
generated batch** (frames made together share the face); ⛔ do NOT blend frames from two separately-generated
sets (e.g. Ep2's `09a–j` batch vs the `09p` batch) — that's exactly where faces mismatch. If one frame in the
chosen batch is weak, re-gen only that frame referencing its neighbors, never swap in a frame from the other batch.
Ep2 = use the self-consistent `09a–j` 10-frame batch (verified: 09a start face = 09j reveal face).

## Hard Rules

1. The FAiRY Godmother is never visible.
2. No wand is needed in this version.
3. The Heroine is the Heroine. Do not call her Grace.
4. Corporate look = navy suit / white top / professional blonde hair / no butterfly clips / no backpack.
5. Episode reveal look = weekly 90s/Y2K outfit + six butterfly clips, three sections per side, plus any episode-specific accessories.
6. Use the same abstract stage for every frame: teal/cyan central spotlight, magenta/plum angled side panels, dark teal upper panels, thin gold trim, simple glossy floor.
7. No Sunnyvaile street, no mall, no Luminairy, no storefronts, no architecture, no signs, no props, no extra people in the transformation frames.
8. Style stays graphic novel: clean ink, hard-edged dimensional shadows, vibrant 90s color, no painterly blending, no mottling, no blotchy clothing, no watercolor texture, no horizontal hair bands, no halftone dots.

## Current Ep4 No-Wand Cloud Sequence

All frames are saved in `assets/episodes/ep-04/pixel/`.

| # | stage | file |
|---|---|---|
| 1 | corporate start | `ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png` |
| 2 | poof builds | `ep04-open-15p1-transformation-poof-build-no-wand-v1-1920.png` |
| 3 | poof covers full body | `ep04-open-15p2-transformation-poof-cover-no-wand-v1-1920.png` |
| 4 | poof clears / outfit appears | `ep04-open-15p3-transformation-poof-clearing-no-wand-v1-1920.png` |
| 5 | clean reveal, Ep4 outfit | `ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png` |

Frames 1-4 can be reused or lightly adapted across episodes. Frame 5 is the episode-specific reveal.

## Ep4 Reveal Outfit

Clueless-inspired Sunnyvaile look:
- bright yellow plaid blazer
- matching yellow plaid pleated skirt
- white fitted top
- white knee socks
- black chunky loafers
- white backpack, with only one visible front strap when the pose calls for it
- six small differently colored butterfly clips total, three pulled-back sections on each side

## Do Not Use

Do not use the rejected Main Street/Sunnyvaile transformation reveal attempts as approved frames:
- `ep04-open-15f-transformation-main-street-clueless-v3-1920.png`
- `ep04-open-15f-transformation-main-street-clueless-v4-clean-outfit-one-strap-1920.png`
- `ep04-open-15f-transformation-main-street-clueless-v5-face-style-lock-1920.png`
- `ep04-open-15f-transformation-main-street-clueless-v6-canonical-sunnyvaile-1920.png`
- `ep04-open-15f-transformation-main-street-clueless-v7-full-graphic-novel-canonical-sunnyvaile-1920.png`

Do not revive the old "lands in town" transformation rule unless Ali explicitly reopens it.
