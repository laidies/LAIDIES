# E02 v19 welcome-ident v2 — representative-player compatibility evidence

**Scope:** read-only recheck of the exact local-review MP4, its caption bytes,
and the available representative-player material. No media, caption, site,
player, release, deployment, or public state was changed.

## Verdict: HOLD — exact player binding is absent

The accepted candidate is present and checksum-bound:

`assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4`  
SHA-256 `80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814`.

The caption bytes are present and parse as 194 cues through `00:16:26.670`:

`assets/captions/episode-02.vtt`  
SHA-256 `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f`.

However, the available witness page is **not bound to this accepted candidate**.
Its module constant and retry branch both select
`/assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4`, SHA-256
`e4b035…76c3`; its visible binding panel claims that same obsolete hash. It
therefore cannot establish normal-speed audio, external captions, keyboard,
reduced-motion/no-JS behavior, or High 4:4:4 playback for the accepted v2
bytes. Substituting a URL at runtime would be a different, unbound player
surface and would not close this gate.

## Representative-matrix result

| Surface | Exact v2 result | Ruling |
|---|---|---|
| Codex in-app Browser | No browser binding available in this task session. | `BROWSER-SURFACE-UNAVAILABLE` |
| Local headless Google Chrome / Playwright | Available, but the only supplied representative witness is bound to baseline v19, not v2. A run of its baseline-only maker test did not produce an acceptance result for v2. | `EXACT-V2-PLAYER-BINDING-MISSING` |
| No-JS | The supplied witness relies on its module/inline script for source assignment, captions, controls, status and recovery. There is no authored non-JS v2 player/fallback bound to the accepted file. | `NOJS-V2-FALLBACK-UNBOUND` |
| Normal-speed audible listen | No human 1× unmuted listen of the exact v2 bytes occurred. Headless playback, even if available, is not an audible witness. | `HUMAN-AUDIO-WITNESS-UNPROVEN` |
| External captions | The VTT bytes are exact and the supplied witness source contract names the correct VTT, but no v2-bound browser page made and rendered that request. | `VTT-REAL-RENDER-UNPROVEN` |
| Keyboard / reduced motion | The existing baseline-bound witness has source/VM coverage only; it does not prove v2-bound rendered behavior. | `V2-KEYBOARD-AND-REDUCED-MOTION-UNPROVEN` |
| High 4:4:4 Predictive | The exact v2 file declares H.264 High 4:4:4 Predictive while decoding locally as `yuv420p`. No exact-v2 browser playback outcome exists, so incompatibility is **not proven** and neither is compatibility. | `H264-HIGH444-PLAYER-MATRIX-UNPROVEN` |

## What this does and does not decide

This is not a codec incompatibility finding. It names no failing browser, so it
does **not** authorize a yuv420p successor. It preserves the existing release
HOLD because the required representative-player proof is unbound/missing, not
because a tested browser rejected the candidate.

The prior local media result remains intact: full FFmpeg decode, exact 29,602
v1 body-frame preservation, exact 22-frame frozen-v19 tail restoration,
mdhd equality and AAC elementary-stream equality all passed. Those file-level
facts do not substitute for actual-player proof.

## Required next contract

Before any player rejudge, create a new checksum-bound, non-public witness
surface whose immutable binding names exactly:

- MP4 path and SHA-256 `80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814`;
- VTT path and SHA-256 `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f`;
- complete normal, caption-failure, media-failure/retry, reduced-motion and
  no-JS fallback behavior; and
- desktop and 320px test targets.

Then test the exact binding in each actually available browser and record media
`loadedmetadata`/`canplay`, a successful normal-speed unmuted play interval,
initial VTT request/load and visible rail, keyboard focus/seek, computed
reduced-motion styles, no-JS fallback, and a human 1× listen. Only if a named
browser fails exact v2 playback should the maker produce a successor.

If that occurs, the successor must be a new checksum-bound file encoded as
H.264 **High or Main profile, 8-bit `yuv420p`**, 1920×1080, 30 fps, 15,360 video
timescale, with the original AAC elementary stream copied byte-for-byte and the
exact 29,624 decoded-frame/picture timeline preserved; it requires a new
frame/audio/container/player rejudge. This is a contingent contract, not a
current build instruction.

## Learning scan

No new qualifying learning was added. The existing prevention rule is
reconfirmed: a player test may only make claims for the exact MP4 hash it binds;
a visually identical harness or runtime URL substitution cannot silently carry
acceptance across successor bytes.
