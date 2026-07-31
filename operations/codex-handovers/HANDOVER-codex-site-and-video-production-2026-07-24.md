# LAiDIES Codex handover — site construction + video production

Cross-project commitments from the initial takeover audit and all later work
are reconciled in:

`operations/MASTER-PROGRAM-TRACKER.md`

That tracker is the durable programme list; this handover is the detailed
execution record for the current site/video run.

**Date:** 2026-07-24  
**Repository:** `Website-homepage`  
**Branch:** `homepage-redesign`  
**Status:** active production; this is not a “project complete” declaration

## The brief being executed

Ali's same-day priorities are:

1. Finish the trailer and Episodes 01–04 with useful animation and transitions,
   then make them available through the site.
2. Turn every building and subpage into a designed destination rather than a
   page of generic cards and text boxes.
3. Keep the production sustainable: repeatable pipelines, explicit QA, real
   source assets, and fewer one-off manual interventions.

The fixed visual target for episode people and scenes is:

`assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`

The desired system is mature dimensional graphic novel, bright
daytime/SUNNYVAiLE/1990s energy, light background gradients, near-black
midnight blue, and a broad vivid accent palette. Yellow and red can appear but
must not dominate pink, purple, cyan, teal, cobalt, mint, coral, and orange.
`Ai` remains accented in brand words and the `i` stays lowercase.

## Page construction completed in this run

The source-of-truth ledger is:

`operations/building-page-construction-status-2026-07-23.md`

It currently records completed v2 construction for:

- all main building destinations;
- all ten Mall shop subpages;
- all nine community-room subpages;
- Postcard, Resident Card, Closet/Town Wallet, Try-On, and Weekly Printable;
- Screening Room and Handbook;
- Episode issue features 01–04;
- SUNNYVAiLE High, Book Fair, Pop Quiz, and class pages.

The page rule used throughout is “the room/object/document is the interface.”
The newer school pages are concrete examples:

- **Book Fair:** gym arrival, live clip jar, horizontal merchandise rack,
  redemption logic, and departure rail.
- **Pop Quiz:** classroom arrival, ruled paper register, one-question-at-a-time
  scantron, and live score/reward flow.
- **Classes:** classroom, AV cart, overhead transparency, class tape, ruled
  lesson notes, and continuous timetable.

### Small functionality closeouts added after construction

- Town Hall's Mayor Deb wall entry now routes into her actual office counter;
  hash changes open the correct in-place room.
- The LIBRAiRY fallback reader no longer creates dead `href="#"` contents
  links. It creates real section links when headings exist and honest text
  labels when they do not.
- DJ SunnyV's Resident Card avatar no longer references a nonexistent
  `y2k-portraits` folder; it resolves to her real scene asset.

All three were checked in the in-app browser.

## Video state

### Episode 04

- Current controlled review cut:
  `assets/video/episode-04-full-v8.mp4`
- 43 of 55 placements carry controlled motion; 77.5% of runtime.
- Full decode passed.
- QA:
  - `operations/video-qa/episode-04-full-v8-qc.json`
  - `operations/video-qa/episode-04-full-v8-motion-measure.json`
  - `operations/video-qa/episode-04-v8-visual/`
- `watch.html` currently maps Episode 04 to v8.

### Episode 03

- Current controlled review cut:
  `assets/video/episode-03-full-v9-controlled-motion-review.mp4`
- 29 of 49 placements carry an approved loop, transformation event, or
  restrained camera move; 58.3% of runtime.
- Full decode passed.
- QA:
  - `operations/video-qa/episode-03-full-v9-qc.json`
  - `operations/video-qa/episode-03-full-v9-motion-measure.json`
  - `operations/video-qa/episode-03-v9-visual/`
- `watch.html` currently maps Episode 03 to v9.

### Episode 02

- Authoritative cue sheet:
  `assets/video/episode-02-production-cues-v5-card-fixes.json`
- Previous cut:
  `assets/video/episode-02-narration-motion-v16-card-fixes.mp4`
- New reusable assembler:
  `operations/tools/assemble-controlled-cue-film.py`
- Current controlled review cut:
  `assets/video/episode-02-full-v17-controlled-motion-review.mp4`
- 31 of 61 placements carry restrained controlled motion; 49.49% of runtime.
- Full decode passed. Eight of eight sampled motion placements measured as moving.
- QA:
  `operations/video-qa/episode-02-full-v17-qc.json`
  `operations/video-qa/episode-02-full-v17-motion-measure.json`
  `operations/video-qa/episode-02-v17-visual/`
- The build gives 31 of 61 scenic/concept placements restrained 1.6% centred
  motion (49.5% of runtime), keeps type/reading frames still, adds 0.35-second
  alpha transitions, preserves narration timing, and removes the obsolete
  corner wordmark by assembling from the authoritative raw sources.
- Keyframes and transition-contact sheets were visually inspected. The film
  changes cleanly through the intended alpha blends, with no black-padding
  frames or obvious title damage.
- `watch.html` now maps Episode 02 to v17.
- `check-hard-cuts.py` is a single-event-clip validator and is not applicable
  to a deliberate multi-shot master; its detection of the film's authored
  transition at 20.17 seconds is not a master failure.

### Episode 01

- Authoritative cue sheet:
  `assets/video/episode-01-production-cues-v7-title-card.json`
- Previous cut:
  `assets/video/episode-01-narration-motion-v20-title-card-review.mp4`
- Current controlled review cut:
  `assets/video/episode-01-full-v21-controlled-motion-review.mp4`
- 24 of 71 placements carry restrained controlled motion; 35.96% of runtime.
- Full decode passed. Eight of eight sampled motion placements measured as
  moving.
- QA:
  - `operations/video-qa/episode-01-full-v21-qc.json`
  - `operations/video-qa/episode-01-full-v21-motion-measure.json`
  - `operations/video-qa/episode-01-v21-visual/`
- The corrected Episode One title card is preserved and the obsolete corner
  wordmark is not added.
- Keyframes and transitions pass technically. The retained source set still
  mixes comic text frames with earlier scenic rendering, so final locked-style
  and owner-continuity exceptions remain an explicit review gate.
- `watch.html` now maps Episode 01 to v21.

### Welcome trailer

Two separate generations exist:

1. Painterly v16:
   `assets/video/episode-trailer-narration-motion-v16-wardrobe-locked-review.mp4`
2. A later 58-beat all-comic film:
   `assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v1-1920.mp4`

The 58-beat film is the correct structural foundation and contains real
scene-level motion, but it must not be silently promoted. Direct visual audit
found named replacement beats:

- rejected/off-putting Delta LAi Nu host image;
- obsolete `Ladies.AI` end/brand wordmark;
- final owner continuity check still required across named keepers and rooms.

Use `operations/trailer-comic-storyboard.md` as the authoritative scene
structure. Replace only failed/off-brand beats, preserve the rest of the
animation, then reassemble and QA. Do not fall back to the painterly v16
because it is explicitly a superseded visual generation.

Repaired review master now built:

`assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v2-repaired-review-1920.mp4`

- 58 original beat durations and original audio preserved.
- B19, B42, B55, B57 and B58 replaced.
- Full decode passed.
- Replacement keyframes and all eight replacement boundaries visually passed:
  `operations/video-qa/trailer-comic-v2-visual/`
- Review report:
  `operations/video-qa/trailer-comic-v2-repaired-review-qc.json`
- Keep review-only until Ali's full continuity watch.

### Shared “Welcome back to LAiDIES” frame

Candidate:

`assets/episodes/shared/welcome-back-to-laidies-comic-candidate-v1-1920.png`

It is not approved. Do not wire it into all four episodes merely to clear a
checklist. Production map:

`operations/welcome-back-card-production-map-20260724.md`

## Release blockers that remain real

- Shared welcome-card visual approval.
- Final owner continuity review on each film.
- Large-video hosting. GitHub Pages is the wrong delivery surface for these
  100–270 MB files. Choose an external video host (Cloudflare Stream or
  YouTube) before public release. No production deployment was authorized or
  attempted in this run.

## Operating-model improvements now in use

- One authoritative cue sheet per film.
- One reusable controlled-motion assembler for still-led episodes instead of
  per-episode ad hoc render scripts.
- Separate review versions; existing cuts are never overwritten.
- Full decode, measured motion, keyframe/transition evidence, and SHA-256
  source records before a cut is promoted.
- Page construction and replaceable art are separate tracks: new art can land
  later without rebuilding the mechanic.
- Rejected assets are not used as temporary bridges.
- Work status is recorded in ledgers rather than relying on chat memory.

## Immediate continuation order

1. Run the owner continuity/locked-style exception pass across all five
   review films.
2. Keep the repaired all-comic trailer review-only until its owner continuity
   pass.
3. Keep Episodes 03–04 on their controlled review cuts.
4. When Ali approves the shared welcome frame, splice it into Episodes 01–04
   at the mapped narration beats.
5. Decide and configure external video hosting; then publish the verified cuts.
