# Episode 01 v26 representative-player — independent functional verdict

**Verdict:** **PASS — PLAYER-FUNCTIONAL GATE ONLY**

**Judge scope:** exact local harness only; no maker, media, public-route, release, or deployment mutation. This verdict does not replace the assigned human full-title 1× unmuted audible watch and is not film admission.

## Frozen inputs independently matched

| Input | Required SHA-256 | Independent result |
| --- | --- | --- |
| `assets/video/episode-01-full-v26-source-admitted-review.mp4` | `f5985a39363eb75514766186817d0105beab9fa6695accf40e0972698e1d1351` | MATCH; 627,122,305 bytes |
| `assets/captions/episode-01.vtt` | `191938a9879883d9439c4ff35c319c40c54fec09855c4c72ba66bd7cdcbd9539` | MATCH; 246 ordered cues |
| maker harness seal | `SHA256SUMS.txt` | MATCH; all 11 sealed harness artifacts recomputed exactly |

The isolated binding matches the frozen media and VTT. The harness itself does not bind a public player or `watch.html`.

## Independent checks

I copied the sealed harness to a private temporary hierarchy with only read-through symlinks to the frozen `assets/` and Playwright runtime. The maker directory was not written.

- Static suite rerun: **PASS 10/10**; its regenerated result SHA is `bbefccbdca5a9177590042353b2867ef285b42919e9eee6e382951ceb08e9ca6`, matching the sealed result.
- Chromium suite rerun in that copy: **PASS 11/11**; regenerated result SHA is `27823bc522ed71988d52d6cf87d24bf6c93b425ee8708b9e61ed5894200afeff`, matching the sealed result.
- Browser observations: exact review MP4 mounted; 1172.233333-second programme metadata; user play was unmuted at 1×; external rail showed sanitized caption text with no raw voice markup; focused `ArrowRight` seeking and `C` caption toggle worked.
- Mobile/reduced-motion: 390px view had no horizontal overflow, a 56.78125px control, and zero-second transition duration.
- Failure/no-JS: intentionally missing media failed closed with disabled playback and retry; a no-JS load left media unbound and displayed the boundary explanation.
- Visual evidence inspected: desktop and 390px captures show the harness boundary, usable controls and no overflow/broken image condition in the captured states.

## Reason code

`PASS-PLAYER-FUNCTIONAL-SEALED-HARNESS-11-11` — exact frozen v26 media/caption tuple works in the isolated representative browser harness.

## Still deliberately open

1. An identified human must complete the full-title 1× unmuted audible watch of this exact review master.
2. Film-level EMQ/release, public player binding, deployment and public-origin verification are separate gates. Nothing in this verdict admits or publishes Episode 01.

**Learning scan:** no qualifying new learning; this repeats the existing prevention rule that player functionality must be checksum-bound and independently exercised without standing in for a human audible-watch or release verdict.
