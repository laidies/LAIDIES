# Episode 04 — episode-specific Founding Mothers ident

Status: **BUILT LOCALLY / REVIEW REQUIRED / NOT PUBLIC**

Ali clarified that the correct animation for Episode 04 is:

`operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-04-founding-mothers-v6.mp4`

SHA-256:
`2acb3094a6148208688d3a561d18ff4575bab2cc8093b3be122d8436f2a8c986`

That exact source replaces the previously used general alternate ident. The
approved sequence remains:

- `01:41.500–01:47.980`: play the Episode 04 Founding Mothers animation.
- `01:47.980–01:50.000`: hold its final Episode 04 title frame.
- `01:50.000`: cut directly to the existing “last week” recap image.

The SUNNYVAiLE street image with stray sparkles is not visible anywhere in the
replaced interval. Its source file remains unchanged.

## Literal output

- Full review master:
  `assets/video/episode-04-full-v8-welcome-founding-mothers-ident-v3-held-review.mp4`
- SHA-256:
  `9e8eea3b019eea64cbd8eed9ac30ce1c9441428b0acd000c06ca11ea658b3d70`
- Short review window:
  `episode-04-welcome-founding-mothers-ident-review-window-98-113.mp4`
- Short review SHA-256:
  `905fc73d723e2a01c99b943c8ad7003aae5e5c99d2b6b6dde9c78b004f8ab778`

## Verification

- Full H.264 decode: PASS.
- Output: 1920×1080, 30 fps, 20:22.40.
- Original v8 audio packet identity: PASS,
  `1d3e61c6ab7ed37e3564f3114a8b13666edf8b5f49880aef8b8a2e70d6c6cf2e`.
- Frame at 01:47.9: Episode 04 / The Founding Mothers title.
- Frame at 01:49.9: the same held Episode 04 title.
- Frame at 01:50.1: existing recap picture.
- Everything outside the bounded overlay interval is preserved from v8 by
  construction.

The earlier v1 and v2 review exports are superseded because they used the
general alternate ident rather than the Episode-04-specific source.

This is a local review candidate only. It is not independently admitted,
integrated, deployed or public.
