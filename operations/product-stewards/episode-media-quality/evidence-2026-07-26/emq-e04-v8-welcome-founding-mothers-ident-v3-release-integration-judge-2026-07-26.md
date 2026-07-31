# EMQ Episode 04 v8 + Founding Mothers ident — release-integration judge

**Task:** `EMQ-E04-V8-WELCOME-FOUNDING-MOTHERS-IDENT-V3-RELEASE-INTEGRATION-2026-07-26`  
**Judge:** Episode Media Quality — independent, read-only  
**Judged at:** `2026-07-26T16:30:00-07:00`  
**Verdict:** **ACCEPT — RELEASE INTEGRATION CANDIDATE**

Ali has accepted the protected Episode 04 v8 flow and its title-specific
Founding Mothers welcome sequence for publication. This verdict judges that
exact local master only. It does not revive the superseded v9 review candidate
or add any content change beyond the approved `01:41.500–01:50.000` picture
operation.

## Exact candidate

| Input | SHA-256 | Result |
|---|---|---|
| `assets/video/episode-04-full-v8-welcome-founding-mothers-ident-v3-held-review.mp4` | `9e8eea3b019eea64cbd8eed9ac30ce1c9441428b0acd000c06ca11ea658b3d70` | matched; ACCEPT |
| Protected baseline `assets/video/episode-04-full-v8.mp4` | `e5d963097cbd699a5f7ad999f29323207ce5c41c4ba5ff45422e12ea35c2bdff` | matched |
| Episode-specific ident `operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-04-founding-mothers-v6.mp4` | `2acb3094a6148208688d3a561d18ff4575bab2cc8093b3be122d8436f2a8c986` | matched |
| External captions `assets/captions/episode-04.vtt` | `1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4` | matched; structurally PASS |
| Maker manifest | `operations/video-qa/episode-04-v8-welcome-founding-mothers-ident-v3-held/manifest.json` | parsed; bindings matched |

The candidate is H.264, 1920×1080, 30 fps, with mono 48 kHz AAC and a
`20:22.400` runtime.

## Independent checks

- Full H.264/AAC decode: **PASS** (exit 0).
- Exact audio packet identity to v8: **PASS**. Extracted ADTS bytes are
  byte-identical (`28b7d174fd61d1d41bc97e7ff1711daf381941605531ae9084886fc0869bd9f3`).
- Exact candidate duration: **PASS** (`1222.400s`, equal to protected v8).
- Changed picture scope: **PASS**. The candidate is necessarily re-encoded, so
  decoded hashes outside the insertion differ at compression level; its
  independent baseline comparison remains visually transparent (pre-window
  average PSNR `53.3058 dB`, post-window average PSNR `52.5468 dB`). No audio,
  clock, scene order, or intended picture operation outside the approved
  interval changes.
- Approved welcome sequence: **PASS**. At `01:41.6` the exact Episode 04
  Founding Mothers ident is in progress; at `01:47.9` and `01:49.9` the
  `Episode 04 / The Founding Mothers` title is correctly held; at `01:50.1`
  the existing recap is restored directly. The rejected stray-sparkle
  SUNNYVAiLE image is absent from `01:41.500–01:50.000`.
- Captions: **PASS**. The external VTT contains 236 positive, monotonic,
  non-overlapping cues. Its two Welcome-back cues cover `01:41.500–01:49.240`;
  the final cue ends at `20:21.240`, leaving a normal `1.160s` title/outro tail.
- Full-title audio/caption timing is preserved by the exact v8 AAC packet and
  unchanged VTT; no caption is burned into the video.

## Player and public boundary

The current public `watch.html` correctly has `EPISODE_FILMS = {}` and still
offers Episode 04 as a cover-only audio edition. That is not a defect in this
candidate; it means the exact MP4 has not yet been bound to a representative
player or deployed. A player/browser run against this checksum was therefore
not possible without editing the public route, which this judge did not do.

This does **not** hold release integration. It is the next separate,
post-binding public-origin gate:

1. bind this exact MP4 plus the matched external VTT through the release owner;
2. deploy the checksum-bound release artifact; and
3. verify public-origin video, captions, keyboard, mobile/reflow,
   reduced-motion, fallback and cache behavior.

## Decision

**ACCEPT — RELEASE INTEGRATION CANDIDATE.** The release owner may use only the
exact candidate checksum above for Episode 04. The local candidate is not yet
`DEPLOYED` or `VERIFIED PUBLICLY`; those words require the separate public
artifact and public-origin checks.

No media, route, player, deployment or public state was changed by this judge.

## Learning scan

No new prevention rule. This pass applies the existing control: title-specific
identity insertions preserve the approved master audio, clock, and all
out-of-scope picture intent, then are independently judged before release
binding.
