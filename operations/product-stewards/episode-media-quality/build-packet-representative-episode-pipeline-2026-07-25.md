# Representative episode pipeline — build and test packet

**Status:** SPECIFIED — no release, deployment, social promotion, or full-series render is authorized.

## Outcome

Prove one short, representative episode segment can travel from final narration and learning intent through approved imagery, meaningful motion, edit, captions, and independent review without identity, style, setting, timing, or visual-narration drift.

The pilot segment must include:

- at least one character/identity shot;
- one concept explanation or comparison;
- one location/background;
- one purposeful motion event and one intentional still;
- a narration transition where the visual must change;
- captions and the actual Screening Room presentation.

The Episode Product Owner selects the segment from the current highest-priority repair only after confirming final narration and canon. No candidate is selected merely because assets already exist.

## Build sequence

| Stage | Owner | Required artifact | Blocking acceptance |
|---|---|---|---|
| Lock | Episode Product Owner + Story Editor | Final narration excerpt, learning outcome, beat windows, spoken idea and visual job | Canon and final audio are named and checksum-bound |
| References | Image Production Director | Identity/style/location/prop reference bundle per shot | No missing or conflicting reference |
| Images | Image Maker | Source frames beside references | Independent Image Quality Judge passes identity, style, setting, anatomy, text, colour and narration relevance |
| Motion | Animation Director + Clip Producer | Motion plan and clips | Each motion has a named semantic event; true-still control distinguishes movement from noise/drift |
| Assembly | Video Editor | Timestamped segment with captions/audio | Render matches final clock; visual changes when spoken concept changes |
| Independent review | Learning, accuracy, brand, image, motion, accessibility judges | Signed cue-level verdict matrix | No maker judges their own output; every blocker has a narrow owner |
| Player test | Release QA | Exact local player journey at desktop and mobile | Captions, controls, fallback, reduced motion and failure states pass |

## Deterministic manifest

Create one machine-readable pilot manifest containing candidate checksum; narration and caption checksums; cue start/end; transcript excerpt; learning/visual job; source asset; approved-reference IDs/checksums; rejected-asset check; motion mode/event; and each independent verdict. The build must fail closed when a required field or PASS verdict is absent.

Required automated checks:

- source and reference files exist and match recorded hashes;
- no rejected or superseded asset appears;
- cue windows are ordered, within final audio, and cover the pilot without unintended gaps;
- render dimensions, codecs, frame rate, duration tolerance, and full decode pass;
- captions match the as-recorded excerpt and do not burn into the image;
- still-control and motion measurements are stored without treating measurement alone as semantic approval.

## Human acceptance

- A viewer can explain the segment's idea and why the example matters.
- Every image is relevant to the words being spoken at that exact time.
- Correct people, environment, illustration system, palette, props, text, and continuity persist across the segment.
- Motion adds meaning or focus; it does not manufacture activity from a weak image.
- Timing supports comprehension and humour without visual lag or premature reveals.
- Captions, audio, and picture agree.
- The segment feels unmistakably LAiDIES and meets Ali's final visual standard.

Any failure returns to its narrow production owner. The pilot is rerendered and re-reviewed from the affected gate forward; approvals do not carry across changed source hashes.

## Boundaries and next decision

- Do not use unapproved social visuals or publish footage from the pilot.
- Do not populate `EPISODE_FILMS` or describe motion films as approved.
- Do not mass-generate replacement images or full episodes before the pilot passes.
- External tools, plugins, models, animation services, caption tools, and render infrastructure may be researched and recommended. Adoption requires a comparison on quality, reference control, reproducibility, privacy, cost, licensing, accessibility, and integration—not novelty.
- After a complete independent PASS, turn the manifest and gates into the standard pipeline, then repair products in dependency/risk order: unresolved source-image failures first, full assembly second, public player verification last.

## Evidence required for closure

One exact candidate checksum; complete manifest; automated test output; cue-level before/after evidence; normal-speed full-size review log; desktop/mobile player captures; independent judge identities/verdicts; Ali's visual ruling; and a record of what was learned and changed in the reusable pipeline.
