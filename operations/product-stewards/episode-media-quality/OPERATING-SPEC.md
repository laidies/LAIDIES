# Episode Media Quality — operating specification

**Status:** SPECIFIED — all trailer and Episodes 1–4 motion-film candidates remain on HOLD.

## Identity and purpose

- **Product:** The complete audiovisual episode experience: trailer, Episodes 1–4, recurring open/close language, narration, music, captions, and the Screening Room handoff.
- **Audience:** A first-time viewer who needs a coherent introduction and a returning learner following the weekly series.
- **User job:** Watch or listen without being confused by visual drift, timing, identity errors, inaccessible captions, or a picture that explains a different line than the one being spoken.
- **Distinct contribution:** Episodes teach through sequenced narration, illustration, animation, comparison, and story. They may connect to Library reference material, High School instruction, NewsStand evidence, tools, and games, but must not merely duplicate them.
- **Non-goals:** File existence, a high version number, a successful encode, contact sheets, motion vectors, or maker approval do not establish release quality. A listen-along is not a motion film.

## Experience and learning contract

- The viewer must understand the episode's question, build a correct mental model, see how it applies, encounter important nuance, and leave able to explain or use the idea.
- Every shot has a declared job tied to the final narration clock: establish, explain, compare, demonstrate, reinforce, complicate, transition, or provide deliberate breathing room.
- The image visible at any moment must relate to the narration being spoken then. An earlier/later concept, generic mood image, or long hold after the spoken idea changes fails.
- Analogies and pop-culture references invite or clarify; they never replace the concept or distort current AI capabilities.
- Current, contested, or forecast claims follow the shared research/accuracy standard and visibly distinguish evidence, inference, disagreement, and scenario.
- New viewers receive enough context without prior episodes. Returning viewers get purposeful continuity without repetitive filler.

## Visual, motion, audio, and accessibility contract

- Each final shot is bound to approved character/identity, master illustration style, location/background, prop/costume, and episode canon references.
- Wrong people, invented likenesses, wrong settings, off-palette/off-style rendering, anatomy/text errors, or within-episode drift require replacement before animation.
- Motion must serve the current narrative beat. Camera drift, compression noise, or a moving crop cannot substitute for required character/object action; deliberately graphic moments may remain still.
- Final narration is the master clock. Picture, transitions, captions, emphasis, music, and silence are checked against the rendered file, not merely source cues.
- Captions derive from as-recorded audio, remain optional and readable below the picture, and are tested with keyboard, screen-reader-relevant controls, zoom/reflow, reduced motion, mobile, and failure recovery.
- The experience remains understandable when optional audio, image, animation, or network elements fail; the player never reports unavailable media as playable.

## Production and decision system

1. Episode Product Owner locks the learning outcome, final canon, and approved narration.
2. Story/Continuity Editor creates the beat and narration-to-visual job map.
3. Image Production Director makes only from approved references.
4. Independent Image Quality Judge accepts/rejects each source shot before motion.
5. Animation Director declares the semantic motion event or intentional still.
6. Clip Producer and Video Editor assemble against the final clock.
7. Independent Motion Quality Judge tests semantic motion with true-still controls.
8. Audio & Caption Owner verifies as-recorded sync and player presentation.
9. Release QA watches the complete checksum-bound candidate at normal speed and full size.
10. Ali retains final visual/creative approval for promoted media. Maker self-approval is never sufficient.

## Required records and gates

- A versioned episode manifest binds narration audio, captions, cue windows, spoken idea, visual job, source asset, reference hashes, motion mode, and final candidate checksum.
- Every cue receives independent image-quality, narration-relevance, motion, timing, audio/caption, and continuity verdicts.
- Automated checks cover dimensions/codecs, duration tolerance, full decode, missing/duplicate assets, caption structure, timing boundaries, still-control calibration, and prohibited/rejected asset use.
- Human checks cover comprehension, identity/style/location fidelity, semantic alignment, meaningful motion, pacing, humour, emotional rhythm, and positive LAiDIES brand contribution.
- A representative pipeline slice must pass end to end before repairing or rendering a complete episode.
- Public status requires the exact deployed player path and bytes to pass; local approval never becomes a live claim.

## Current truth and next trigger

- The truthful public offer is illustrated, captioned listen-alongs. Full motion films for the trailer and Episodes 1–4 are not approved.
- Existing candidates remain **HOLD** under the dated release gate. Episode 1 v23 is locally built with limited maker evidence, not independent approval. Episode 2 has an unresolved café transition. Episodes 3–4 and the trailer lack complete SHA-bound owner/judge watches.
- **Next trigger:** execute `build-packet-representative-episode-pipeline-2026-07-25.md`; do not begin a full-series rebuild until its representative slice passes all gates.

## Learning scan

BTB-032, BTB-035, BTB-039, BTB-094, and BTB-095 remain binding prevention rules. The operating change is to move those rules from scattered prose and after-the-fact review into one manifest-bound production pipeline with independent acceptance.
