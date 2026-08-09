# Episode 04 public owner defect report — 2026-07-31

**Status:** OWNER REVIEW REOPENED — PUBLIC DELIVERY WORKS; EDITORIAL/MOTION CUT
IS NOT ACCEPTED AS CURRENT OR FINAL

**Public object:**
`assets/video/episode-04-full-v8-welcome-founding-mothers-ident-v3-held-review.mp4`
(`9e8eea3b019eea64cbd8eed9ac30ce1c9441428b0acd000c06ca11ea658b3d70`)

## Owner report

Ali reported timing problems, missing images and missing animations in the
public Episode 04 cut. Named examples:

- rain expected outside the window is missing rather than visibly animated;
- the early sequence uses static images at different zoom states instead of
  the animation the sequence is meant to contain;
- the moth in the Grace Hopper sequence briefly disappears behind her arm,
  which is a layer/occlusion continuity failure;
- the 2017 Google / November 2022 ChatGPT passage returns to and holds on the
  Heroine instead of showing the events being narrated;
- substantial Ada animation/coverage expected from production is absent;
- Ali questioned whether the public film is the latest cut.

## Reproduced evidence

- The public file is the v8-derived content cut with the later approved
  Episode 04 welcome ident inserted. It is not a successor to the separate v9
  content-repair branch.
- The local v9 review cut
  `assets/video/episode-04-full-v9-reference-reconciled-review.mp4`
  (`d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4`)
  changed only cues 15–19 (`202.00–300.00`) and received an independent HOLD.
  It does not repair the modern desk sequence or retained Ada cue 20.
- Public placement 43 / cue 45 holds
  `ep04-open-04-desk-comic-v1-face-lock-1920-loop-v1.mp4` from
  `843.80–895.65` while narration covers the 2017 Google language-system
  breakthrough, ChatGPT's November 2022 launch and rapid adoption.
- Public Ada placement 19 runs `250.30–300.00` as a directional punched-card
  clip that plays once and freezes; placement 20 then holds
  `ep04-scene-03-ada-b-mid-comic-v1-locked-1920-loop-v1.mp4` from
  `300.00–341.55` with measured movement confined to about 0.63% of pixels.
  The production art audit separately records missing locked-style Ada
  a-start/b-mid/c-end sequence coverage.

## Release consequence

Do not describe the currently hosted Episode 04 film as the latest or final
editorial cut. Its immutable delivery and captions were technically verified,
but owner content review is reopened. Do not promote v9 as the fix: it is held
and incomplete.

## Required next build contract

Before a successor can be proposed for release:

1. reconcile one authoritative Episode 04 base rather than branching ident and
   content repairs independently;
2. create a narration-to-picture occurrence audit for all 55 placements;
   each row must describe the actual frames and motion, quote the narration at
   that time, and resolve as PASS, CLOSE_ENOUGH, RETIME, REPLACE or
   ADD_OR_REPAIR_ANIMATION under
   `operations/video-qa/SITE-VIDEO-AND-ANIMATION-REVIEW-CONTRACT.md`;
3. replace the 52-second modern desk hold with event-specific 2017 and November
   2022 coverage, retaining a brief Heroine callback only where the narration
   explicitly returns to her desk;
4. rebuild Ada as a deliberate multi-shot sequence with truthful Analytical
   Engine representation and semantic motion rather than a short one-shot plus
   long freeze/flicker holds;
5. address the remaining independent v9 HOLD findings before owner review;
6. restore and visibly verify the missing rain, replace zoom-state stills where
   semantic animation is required, and repair the Grace/moth layer ordering so
   no subject or prop disappears incorrectly;
7. complete a normal-speed owner watch for image relevance, animation, timing,
   audio and captions before changing the public binding.
