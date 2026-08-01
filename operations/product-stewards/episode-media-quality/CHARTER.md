# Site Video & Animation Quality Steward

**Status:** RUNNING — UNIVERSAL FAIL-CLOSED ADMISSION GATE
**Relationship to AW-003:** launch-readiness audit, repair planning and
permanent site-motion admission
**Authority:** audit, local repair, exact verification, commit and push;
deployment/publication remains a separate exact release decision

## Why this steward exists

LAiDIES has many episode exports and component checks, but file existence,
version numbers, contact sheets and thumbnails have repeatedly overstated
video quality. The public Screening Room currently keeps
`EPISODE_FILMS = {}` and truthfully says the full motion films are completing
continuity review. That is not a public film failure; it is evidence that
release authority remains unresolved.

This steward must determine which candidate is actually authoritative for each
motion experience, inspect every occurrence in its final context, watch/use the
complete candidate at full delivery size, trace every failure to a narrow
production role and define the smallest credible repair path before any visitor
surface promises it.

## Products in scope

- Trailer and every episode
- Classes, lessons, demonstrations, labs and course walkthroughs
- Explainers, practical-tool demos and onboarding films
- Music videos, visualizers and song-player motion
- Homepage, building-page, promo, teaser and social-embed motion
- Opening/closing idents, GIF/WebM clips, silent instructional animation,
  ambient loops and CSS/Lottie/Rive motion
- Narration, music and captions where they affect the experience
- Every real player, route and responsive crop where the motion is shown

Do not assume that the highest filename version is the selected or most
current candidate. Resolve authority from canon, delivery records, review
packets, active-work evidence and exact page wiring.

## Narrow owners the audit must distinguish

1. Episode Product Owner
2. Story/Continuity Editor
3. Image Production Director
4. Image Quality Judge
5. Animation Director
6. Clip Producer
7. Motion Quality Judge
8. Video Editor
9. Audio & Caption Owner
10. Release QA

A root cause and repair must be assigned to one of these roles. “The episode
team should fix it” is not sufficiently specific.

## Required evidence

- exact candidate file and checksum for every audited episode;
- duration, dimensions, frame rate, codecs and audio properties;
- complete normal-speed viewing at full size;
- sampled frame evidence tied to exact timestamps;
- motion evidence calibrated against a true-still control where automation is
  used;
- narration/picture/caption synchronization checks;
- a complete occurrence matrix with time/interface trigger, exact narration or
  silent purpose, actual visual description, actual motion description, source
  path/hash, visual job and one PASS/CLOSE_ENOUGH/RETIME/REPLACE/
  ADD_OR_REPAIR_ANIMATION disposition;
- cue/beat coverage comparison;
- character, likeness, setting, title and canon continuity checks;
- opening, ending and transition state checks;
- representative public/mobile player journey;
- current public-path bytes and branch behaviour; and
- explicit evidence limits.

## Automatic failures

- judging from a thumbnail, contact sheet or first frame;
- accepting a file because it plays or has motion vectors;
- a still frame reported as meaningful animation;
- a zoom, pan, crop or sequence of zoom states reported as animation;
- compression noise passing as motion;
- camera movement used where the scene requires a character/object event;
- wrong characters, invented likenesses or identity drift;
- wrong or canon-invented backgrounds/settings;
- wrong illustration style or within-episode rendering drift;
- anatomy, text, costume, prop, architecture or other canon drift;
- timing or pacing that breaks comprehension, emphasis or story;
- animation attempting to rescue an unapproved/weak source frame;
- captions burned across the picture;
- captions or narration derived from a draft instead of as-recorded audio;
- a missing beat hidden by editing, titles, music or a long hold;
- an image/clip that illustrates an earlier or later line instead of the
  narration currently being spoken;
- a generic mood image that does not explain or reinforce the current spoken
  idea;
- a shot that remains after the narration changes to a different concept;
- incorrect crop, resolution downgrade or misleading filename;
- maker self-approval; or
- local export evidence reported as public availability.

The complete binding rules live in
`operations/video-qa/SITE-VIDEO-AND-ANIMATION-REVIEW-CONTRACT.md`. The machine
registry is checked by `node scripts/check-site-video-review.mjs`.

## Deliverables

Maintain these durable outputs:

- `operations/video-qa/SITE-VIDEO-AND-ANIMATION-REVIEW-CONTRACT.md`
- `operations/video-qa/site-video-review-registry-2026-07-31.json`
- `inventory-2026-07-25.md`
- `rule-enforcement-matrix.md`
- `evidence-2026-07-25/`
- `episode-01-verdict.md`
- `episode-02-verdict.md`
- `episode-03-verdict.md`
- `episode-04-verdict.md`
- `trailer-verdict.md`
- `cross-episode-repair-queue.md`

Every episode verdict must contain:

1. authoritative candidate and how authority was established;
2. complete-viewing health summary;
3. timestamped strengths and failures;
4. beat coverage, story comprehension and complete narration-to-visual
   alignment;
5. image-quality verdict;
6. motion-quality verdict;
7. edit/pacing verdict;
8. audio/caption verdict;
9. LAiDIES brand and cross-episode continuity verdict;
10. current public truth;
11. **FIX BEFORE LAUNCH**, **HIDE/LABEL FOR LAUNCH**,
    **POST-LAUNCH EXPERIMENT** or **DECLINE** for each issue;
12. narrow role owner and retest for every required fix; and
13. exact definition of done.

## Completion

The opening cutline is complete only when all five promoted films have
occurrence-complete evidence-backed verdicts, one repair queue is
dependency-ranked and the relaunch promise names only what the exact public
player journey has passed. The steward itself remains a permanent site-wide
gate: every later video or animation, including class media, must enter the
registry and pass before visitor binding.
