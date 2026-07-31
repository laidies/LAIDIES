# Shared “Welcome back to LAiDIES” card — production map

Date: 2026-07-24  
Status: visual candidate ready for Ali review; not yet approved or inserted

## Candidate

`assets/episodes/shared/welcome-back-to-laidies-comic-candidate-v1-1920.png`

- 1920 × 1080
- exact title: `WELCOME BACK TO LAiDIES`
- lowercase accent `i`
- people-free five-panel comic-cover construction
- bright daytime / sunny-town / 1990s colour register
- dimensional ink, faceted shading, halftone and print texture
- no old wordmark
- no chip-heart motif
- no rejected character or building art

Generation mode: built-in image generation with three workspace reference
images: the approved Episode 04 Heroine style lock, comic-cover panel-layout
reference, and layered comic-type reference. A second targeted edit removed an
unwanted readable `VIDEO` sign without redesigning the composition or title.

## Narration-accurate insertion map

These times come from the final VTT captions, not from approximate cue labels.
The complete shared-card hold should cover the two-line LAiDIES/SUNNYVAiLE
identification and then leave cleanly before the next sentence.

| Film | Spoken beat | Exact window | Current picture at that beat | Production action after approval |
|---|---|---:|---|---|
| Episode 01 | “Welcome to LAiDIES…” | 01:33.900–01:41.920 | Steve ovation image continues until the next cue at 01:54 | insert a dedicated card cue at 93.900 and restore the existing sequence at 101.920 |
| Episode 02 | “Welcome back to LAiDIES…” | 01:31.340–01:38.590 | quote card continues; town overview does not start until 02:00 | insert a dedicated card cue at 91.340 and restore the preceding visual at 98.590 |
| Episode 03 | “Welcome back to LAiDIES…” | 01:56.180–02:03.820 | existing welcome-back comic begins early at 01:48.400 and holds until 02:15 | replace only the narration-accurate 116.180–123.820 interval, preserving the surrounding sequence |
| Episode 04 | “Welcome back to LAiDIES…” | 01:41.500–01:49.240 | SUNNYVAiLE welcome street image starts at 01:42 and ends at 01:50 | replace cue 7 after visual approval; timing already closely matches narration |

The welcome trailer says “Hi. Welcome to LAiDIES” at the start, so it keeps its
own opening rather than receiving a “Welcome back” card.

## Reusable motion language

This should be one small reusable motion package, not four manual animation
sessions:

1. Hold the five comic panels completely stable.
2. Reveal `WELCOME BACK TO` with a quick printed registration snap.
3. Illuminate the large `LAiDIES` letters left-to-right over 0.9–1.1 seconds:
   pink face, purple depth, cyan edge light, then the yellow lowercase `i`.
4. Add two or three tiny halftone glints around the title only.
5. Settle to the exact approved still for the rest of the spoken identification.
6. No whole-frame zoom, no face/body generation, no panel morphing, no generic
   fade-in/fade-out, and no persistent flashing.

One transparent title animation can be composited over the still in the local
assembly scripts for Episodes 01–04. The only episode-specific work should be
the in/out timing above.

## Approval gate

Do not modify the authoritative cue JSON or rebuild any episode master until Ali
approves this visual direction. Approval of the still does not automatically
approve the motion; the first 8-second motion proof remains a separate visual
check.
