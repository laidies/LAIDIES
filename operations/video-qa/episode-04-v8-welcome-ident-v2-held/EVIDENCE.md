# Episode 04 — LAiDIES ident held through recap transition

Status: **SUPERSEDED — WRONG GENERAL IDENT SOURCE / NOT PUBLIC**

Ali subsequently identified the Episode-04-specific source. This v2 export must
not be reviewed or integrated. Its successor is:
`assets/video/episode-04-full-v8-welcome-founding-mothers-ident-v3-held-review.mp4`.

Ali's sequence correction is implemented against the protected Episode 04 v8
master:

- `01:41.500–01:46.667`: play the exact selected LAiDIES motion ident.
- `01:46.667–01:50.000`: hold the ident's final LAiDIES frame.
- `01:50.000`: cut directly to the existing “last week” recap image.

The SUNNYVAiLE street image with stray sparkles is no longer visible anywhere
in the replaced `01:41.500–01:50.000` interval. Its source file was not edited.
The earlier v1 review is superseded because it returned to that image after the
motion ident ended.

## Literal output

- Full review master:
  `assets/video/episode-04-full-v8-welcome-ident-v2-held-review.mp4`
- SHA-256:
  `850939c368dd314bc94d42b4c0fdf9d527fc998b27fb14fe38f9aaa4fe4bce80`
- Short review window:
  `episode-04-welcome-ident-held-review-window-98-113.mp4`
- Short review SHA-256:
  `2af7a32776d148736028dd6511a4ecbc0c43bcc379fd74ab96c599d4af1ca8ef`

## Verification

- Full H.264 decode: PASS.
- Output: 1920×1080, 30 fps, 20:22.40.
- Original v8 audio packet identity: PASS,
  `1d3e61c6ab7ed37e3564f3114a8b13666edf8b5f49880aef8b8a2e70d6c6cf2e`.
- Frame at 01:46.8: final LAiDIES ident frame.
- Frame at 01:49.9: same final LAiDIES ident frame.
- Frame at 01:50.1: existing recap picture.
- Original v8 runtime, narration, transition, later Hall of MAiVENS material and
  all frames outside the bounded overlay interval are preserved by construction.

This is a local review candidate only. It is not admitted, integrated,
deployed or public.
