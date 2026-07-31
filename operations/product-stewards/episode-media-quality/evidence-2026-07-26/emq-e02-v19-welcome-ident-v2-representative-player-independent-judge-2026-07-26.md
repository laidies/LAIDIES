# E02 v19 welcome-ident v2 — representative-player independent judge

**Scope:** isolated local representative-player and codec gate only. This is
not a full-title audible-listen, release, deployment, or public-media ruling.
No harness or media bytes were changed.

## Verdict: PASS — representative-player / Chrome codec gate

**Reason codes:** `EXACT-V2-PLAYER-BINDING-PASS`,
`SEAL-AND-TUPLE-PASS`, `DETERMINISTIC-13-OF-13-PASS`,
`CHROME150-HIGH444-DECODE-PASS`, `CHROME150-1X-UNMUTED-ADVANCE-PASS`,
`EXTERNAL-VTT-RAIL-PASS`, `KEYBOARD-ERROR-RETRY-PASS`,
`REDUCED-MOTION-390-PASS`, `NOJS-SAFE-UNBOUND-PASS`,
`SCREENSHOT-PROVENANCE-PASS`.

The sealed harness binds the exact accepted MP4 and VTT. The available real
browser result is Google Chrome 150.0.7871.187, headless with a fresh temporary
profile over ephemeral localhost. It shows that the exact H.264 High 4:4:4
Predictive file reaches readyState 4, has no media error, exposes 1920×1080 and
987.466667 s, and advances `0 → 2.851457 s` over a 3-second observation with
`playbackRate=1`, `muted=false`, and `volume=1`. That clears the representative
Chrome codec gate: no named incompatibility was observed and no yuv420p
successor is required by this gate.

## Independent checks

| Check | Result |
|---|---|
| Final seal | PASS — `SHA256SUMS.txt` SHA-256 `74974ec6d9cbff062acae195ffb53753af7a63d18ec84a1a381ee485076692df`; every listed harness file verifies |
| Maker evidence seal | PASS — `fcff6e18d7a33e7b2780384a6f05d61ed0f268ac9ad7d26faf5885b71ef4f630` |
| Exact MP4 | PASS — SHA-256 `80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814` |
| Exact external VTT | PASS — SHA-256 `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f`; 194 cues, end 986.670 s |
| Deterministic suite | PASS — independently rerun at workspace root; 13 passed / 0 failed |
| Caption and controls | PASS — sealed result records one external track, 194 cues, sanitized rail; C disables/re-enables captions and K pauses playback |
| Failure/retry | PASS — missing source disables controls and exposes retry; retry returns to exact v2 source, duration 987.466667, error null, retry count 1 |
| 390px / reduced motion | PASS — no overflow, media query true, animation/transition none and scroll behavior auto |
| No-JS | PASS — no source/currentSrc is bound, telemetry says uninitialized, explicit no-JS boundary visible |
| Screenshot provenance | PASS — the three PNGs are in the final manifest and hashes verify. Visual inspection shows the exact MP4/VTT identities and Chrome localhost current source; mobile screenshot shows 390px reduced-motion state. |

## Boundary retained

`HUMAN-FULL-TITLE-1X-AUDIBLE-WITNESS-UNPROVEN` remains intentionally separate.
Headless `muted=false` / volume 1 playback proves browser decode, media state
and time advancement, not physical speaker audibility or a person’s complete
16:27.47 normal-speed listen. This PASS confers no full-title acceptance,
release, deployment, or public availability.

## Learning scan

No qualifying new learning was added. The seal demonstrates the reusable rule:
bind the exact successor checksum into both the player surface and browser
evidence before resolving a profile-compatibility hold.
