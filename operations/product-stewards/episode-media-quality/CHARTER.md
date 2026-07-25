# Episode Media Quality Steward

**Status:** SPECIFIED — NEXT AUTHORIZED PILOT LANE; NOT YET RUNNING
**Relationship to AW-003:** launch-readiness audit and repair planning
**Authority:** read-only audit plus reports/evidence inside this directory; no
episode, image, video, audio, caption, page, canon or deployment edits until
the findings are reconciled

## Why this steward exists

LAiDIES has many episode exports and component checks, but file existence,
version numbers, contact sheets and thumbnails have repeatedly overstated
video quality. The public Screening Room currently keeps
`EPISODE_FILMS = {}` and truthfully says the full motion films are completing
continuity review. That is not a public film failure; it is evidence that
release authority remains unresolved.

This steward must determine which candidate is actually authoritative for each
episode, watch the complete candidate at full delivery size, trace every
failure to a narrow production role and define the smallest credible repair
path before the relaunch announcement promises motion films.

## Products in scope

- Trailer
- Episode 1
- Episode 2
- Episode 3
- Episode 4
- Opening/closing ident only where it affects the complete episode
- Narration, music and captions only where they affect the viewing experience
- `watch.html` film/listen-along branching and public release truth

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
- a complete narration-to-visual alignment matrix with time window, spoken
  idea, shown asset/shot, visual job and PASS/FAIL;
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

## Deliverables

Write inside this directory only:

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

The steward lane is complete only when all five promoted motion products have
evidence-backed verdicts, one cross-episode repair queue is dependency-ranked,
the existing episode rules have been mapped to their real or missing
enforcement mechanisms,
and the relaunch promise names only what the exact public player journey has
passed.
