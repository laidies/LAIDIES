# Episode 04 v8 welcome-ident successor

**Status:** BUILT LOCALLY — REVIEW REQUIRED / NOT ADMITTED / NOT PUBLIC

## Literal change

The exact selected LAiDIES motion ident is displayed from `01:41.500` through
`01:46.667`, beginning with the spoken words “Welcome back to LAiDIES.”

The source is the protected Episode 04 v8 master. The v9 cue 15–19 changes are
not included. The original corporate-to-SUNNYVAiLE transformation, LUMINAiRY
approach, stained-glass Hall of MAiVENS and every later v8 scene remain on the
v8 timeline.

The ident is scaled exactly from 960×540 to 1920×1080 with no crop. Its source
is silent. The complete v8 AAC packet stream is copied unchanged.

## Exact output

- Full review master:
  `assets/video/episode-04-full-v8-welcome-ident-v1-review.mp4`
- SHA-256:
  `d859d3132776f2e0218921f166660d101998385f355d691d606812d59ce8be96`
- Runtime: `1222.4` seconds
- Review window:
  `operations/video-qa/episode-04-v8-welcome-ident-v1/episode-04-welcome-ident-review-window-98-113.mp4`
- Review-window SHA-256:
  `e5a160359beab43563a19fa5ecfd18fc90b13af50c2fb27c43e1acdf8e7f544d`

## Verification

- Full decode: PASS.
- Runtime matches v8: PASS.
- V8/output AAC packet SHA-256:
  `1d3e61c6ab7ed37e3564f3114a8b13666edf8b5f49880aef8b8a2e70d6c6cf2e`
  for both.
- Selected ident SHA-256:
  `713c576b2f6468fe4df962acd2c4d48163391899f99c9a2bfc187cc795ae0ed6`.

The full picture stream was re-encoded. Compression bytes outside the insertion
window therefore differ, but the v8 picture timeline is retained and the only
semantic picture substitution is the named 5.1667-second welcome-ident window.

This maker evidence is not independent acceptance or release authority.
