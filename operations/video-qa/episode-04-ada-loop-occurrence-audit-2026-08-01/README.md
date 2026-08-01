# Episode 04 Ada website-loop occurrence audit

**State:** `FAIL / HOLD`

This audit isolates the direct visitor-facing Ada video declared by
`content/episodes/episode-04-cues.json`. It does not assume that the separately
assembled Episode 04 review master and the website Screening Room show the same
asset.

## Finding

The five-second clip is shown from `04:10.3–05:00.0`. The Screening Room slows
it to half speed and hard-loops it, so visitors see nearly five repetitions
during a 49.7-second explanation.

The composition is relevant to Ada, the Analytical Engine, punched cards and
music, but it cannot carry the full narration. The spoken argument progresses
through arithmetic, general instructions, symbols, music, a step-by-step method
and a capability limit. The picture repeats one beat instead.

The animation also changes Ada's face, posture, scale and camera framing. Its
first/last-frame SSIM is `0.119635`, confirming a severe hard-loop jump. The
occurrence is therefore `REPLACE`, not `CLOSE_ENOUGH`.

## Evidence

- `frames/contact-sheet.png` — five one-second samples of the source
- `frames/seam-first.png` and `frames/seam-last.png` — measured loop boundary
- `review-sequences/episode-04-ada-loop-exact-website-context.mp4` — real
  narration with the runtime's half-speed looping behavior
- `operations/video-qa/firefly-20260723/EP04-ADA-MOTION-PROOF.md` — prior
  comparison confirming the existing loop's character and camera shifts

The exact-audio review sequence decodes with its audio stream intact. A human
audible 1x review and independent judgment remain required before any corrected
occurrence can pass.

## Repair boundary

Replace the single loop with a narration-timed Ada sequence. Preserve the
approved identity and period setting, use restrained background motion, and
show the spoken progression rather than repeating a decorative music-note beat.
The Episode 04 v10 repair packet supplies planning candidates; it does not grant
release approval.
