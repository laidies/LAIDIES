# Episode 04 perceptible rain and Grace moth repair evidence

Status: `BUILT_LOCALLY_REVIEW_REQUIRED`
Release authority: `NONE`

This package preserves three local successor candidates for defects Ali found
while watching Episode 04 at normal speed:

- cue 04: visible rain outside the desk/window scene;
- cue 05: prominent rain outside the window without obscuring the heroine; and
- cue 30: Grace Hopper's moth remains visible in the foreground and does not
  disappear behind her arm.

The candidates are not admitted episode media. They remain held until an
independent reviewer watches the exact-audio context clips at normal speed and
records an occurrence-level verdict.

## Exact master under review

`assets/video/episode-04-full-v9-reference-reconciled-review.mp4`
SHA-256: `d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4`

## Candidate components

| Purpose | File | SHA-256 |
| --- | --- | --- |
| cue 04 rain | `assets/episodes/ep-04/pixel/ep04-cue04-local-motion-v2-rain-visible.mp4` | `3d1d2314412c5b25eafa87a2586a6905c034f1c65e10647d44db62e6b5627510` |
| cue 05 rain | `assets/episodes/ep-04/pixel/ep04-cue05-local-motion-v3-rain-prominent.mp4` | `3cc81e5b0b62a32e9cb89eba3ba0587e68175ad25f549c1977595fc7bcc99db3` |
| Grace moth | `assets/episodes/ep-04/pixel/ep04-scene-05-grace-moth-landing-comic-event-v3.mp4` | `ec171ff100363db616f7295842e3ad8a430ffd7f755c68a2eb9b7e479560ae43` |

## Exact-audio review clips

| Review window | File | SHA-256 |
| --- | --- | --- |
| rain, Episode 04 v9 seconds 54–86 | `episode-04-rain-context-review.mp4` | `a88dd245868498eca9eecbb063b24891e39d2e70add5bb9fe2a98902bb66abbc` |
| Grace moth, Episode 04 v9 seconds 611–631 | `episode-04-grace-moth-context-review.mp4` | `c1491c3825010d8952a1e10656feb2dbc982e4e6b7654147e73f04ba2ba9d187` |

## Validation already completed

- all three candidate components and both context clips fully decode;
- both context clips preserve the Episode 04 narration as AAC mono, 48 kHz;
- contact strips show visible rain in both repaired windows; and
- the Grace moth remains visible across the sampled repaired sequence.

These mechanical and sampled visual checks do not replace the required
independent, normal-speed semantic review.

## Builders and manifests

- `assets/video/fx/build-ep04-perceptible-rain-and-grace-moth-v3.py`
- `scripts/build-episode-04-rain-grace-context-review.py`
- `manifest.json`
- `context-review-manifest.json`

The separate occurrence package records the complete 55-occurrence picture
audit and the remaining repair queue:
`operations/video-qa/episode-04-occurrence-audit-2026-07-31/`.
