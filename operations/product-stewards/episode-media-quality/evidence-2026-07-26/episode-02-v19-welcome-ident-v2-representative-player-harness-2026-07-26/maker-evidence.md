# Episode 02 v2 representative-player maker evidence

Status: **VERIFIED LOCALLY**

This is the smallest isolated binding used to test the checksum-sealed Episode 02 v2 review MP4 with the checksum-sealed external caption file. It does not change `watch.html`, a route, a public media binding, or either frozen media asset.

## Frozen identity

- MP4: `/assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4`
- MP4 SHA-256: `80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814`
- MP4 bytes: `583542700`
- VTT: `/assets/captions/episode-02.vtt`
- VTT SHA-256: `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f`
- VTT contract: `194` ordered cues; final cue ends `986.670s`

## Deterministic result

`node test-harness.mjs` passes all 13 checks. The suite re-hashes the exact MP4 and VTT, verifies caption order and endpoint, and tests the source/retry binding, 1× unmuted playback contract, external-caption rail, keyboard mapping, reduced-motion policy, responsive CSS, and no-JS fail-safe.

## Literal browser result

The Codex in-app browser was unavailable in this session (empty browser list), so the real playback probe used installed Google Chrome `150.0.7871.187` with a fresh temporary profile over localhost.

The exact High 4:4:4 MP4 reached `readyState=4`, reported no media error, exposed `1920×1080` video with duration `987.466667s`, and advanced from `0` to `2.851457s` during a three-second observation at `playbackRate=1`, `muted=false`, and `volume=1`. Therefore no compatibility transcode was created.

Chrome loaded one external text track with exactly 194 cues. The final cue ends at `986.670s`; the custom below-picture rail rendered sanitized cue text without raw `<v>` markup. With focus on the player, `C` disabled and re-enabled captions and `K` paused playback.

The missing-media fixture exposed the retry button and disabled playback controls. Retry rebound the exact MP4, incremented the visible retry identity to `1`, restored metadata and duration, and left `error=null`.

At `390×844` with reduced motion emulated, the media query matched, animation and transition policy became `none`, scroll behavior became `auto`, and there was no horizontal overflow. With JavaScript disabled, the player had no source children or current source, telemetry remained `Player not initialized.`, and the explicit `<noscript>` boundary was visible.

## Evidence files

- `browser-results.json` — literal observations and limitations
- `test-results.json` — deterministic 13/13 result
- `screenshots/chrome-150-exact-binding.png`
- `screenshots/chrome-150-mobile-reduced-motion.png`
- `screenshots/chrome-150-no-js-boundary.png`

Boundary: headless playback proves real browser decode, time advancement, and an unmuted 1× media state. It does not prove physical speaker audibility, a full human listen, independent acceptance, release, deployment, or public availability.
