# LAiDIES episode media

Current authority: `standing-authorization.md` supersedes older routine Ali approval
and whole-job pause requirements below. Retain quality checks and repair failures.

Detailed requirements routed by AGENTS.md. Paths below are relative to the site
repository root (Website-homepage in the iCloud workspace). Read the complete
applicable sections; these rules remain binding within their stated scope.
The short entry map governs selective retrieval instead of blanket historical reading.

## Video pipeline — which tool does which job
- **Canva creates the animation.** Image-to-video from an approved still. CapCut's
  own animation was rejected; do not generate motion there.
- **CapCut assembles.** Import the Canva clips, cut, sequence, and export the final
  video.
- Animate **one** approved still per shot. Generating many variants produces drift.
- A loop must have zero net travel, or it plays once and jumps.

## Where things go
- Save deliverables to the delivery path the brief names — images and video clips
  land beside their source frames (e.g. `ep04-scene-NN-*.mp4`).
- Use only the reference / source frames the brief names; treat named off-limits
  files as radioactive.

## EPISODE VISUAL SYSTEM — mandatory read

Before creating or editing any episode/trailer visual, transition, recurring
ident, speech bubble, emphasis frame, comic spread, trading-card insert,
landscape, or background, read:

`operations/episode-visual-system-lock.md`

The exact master people-rendering style is:

`assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`

That image governs how every person is drawn. Character-specific references
govern identity.

**Real historical women require a bound likeness reference.** Before rendering
Ada Lovelace, Grace Hopper, Karen Sparck Jones, the ENIAC Six or any other real
person, confirm that `operations/reference/real-people/<person>/` contains at
least one actual image file. If it is empty, **stop and say so** — do not
generate a face from the name. An empty reference directory is the single
mechanical cause of likenesses that don't match, and the guidance that says
"references govern identity" is unenforceable without them. Run:

    node scripts/check-real-person-references.mjs The saved category libraries govern bubbles, lettering, page
layout, cards, and environments. Do not substitute a generic comic style, a
generated group portrait, a retired wordmark, or an old welcome-back candidate.
