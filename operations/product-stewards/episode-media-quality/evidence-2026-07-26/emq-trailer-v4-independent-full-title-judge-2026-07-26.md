# EMQ Trailer v4 independent full-title judge

**Task:** `EMQ-TRAILER-V4-INDEPENDENT-FULL-TITLE-JUDGE-2026-07-26`  
**Judged:** 2026-07-26, America/Vancouver  
**Judge:** Episode Media Quality, independent of the maker  
**Verdict:** **HOLD**

Trailer v4 fixes the specific Trailer v3 clock defect: the four motion clips
now include their declared final-frame freezes, the complete master reaches the
mapped end card, and the 58-beat cut clock is intact. It is still not admitted.
The exact heroine-outfit authority is unresolved, and this file-only review
cannot prove a normal-speed audible/player experience.

## Exact frozen tuple

| Artifact | SHA-256 | Independent result |
| --- | --- | --- |
| `laidies-trailer-comic-v4-clock-successor-review-1920.mp4` | `760dbbc7daff1fb299074e7e8d03575635b77ab9c56ec8dece4fc99d26d68934` | exact match |
| 58-beat map | `39a9a3d0e7fe9dd646ddd7075466cfbf80249520cf082a27ca7cdb3b674d3fdb` | exact match |
| config | `7aaa92a1f95431d51c1b52843158dd08868879b4b8a2fa29cb566a8cf4cae076` | exact match |
| maker QC | `4d4c8adddb3969ea577b5b315adeb08500f5f36e8675eab073607c1bdff022b9` | exact match; not substituted for this judgment |
| builder | `d64f8eefb47944cee643f8b46124688e3950efbd3a3d2195ef71e9bd682aa89d` | exact match |
| concat manifest | `796c9a282c092f85b06419ec8a5de309ff73c6fa6073bd9e049f9d3282d53943` | exact match |

The inherited VTT and SRT also match their declared hashes. The master audio
stream hash independently matches the narration source:
`3c73d2eaf3e3bb3344543e75dd253f39ebab9109d3946fe2a83fe21c1987d1fe`.

## What passed

- Full independent FFmpeg decode: **PASS** — 29,016 video frames, H.264
  1920×1080 at 30 fps, AAC 44.1 kHz mono, 16:07.20 mapped duration.
- Map arithmetic: **PASS** — 58 beats, 57 cuts, frame 0 through exclusive
  frame 29,016 with no gap or overlap.
- Clock repair: **PASS** — all 57 mapped onset checks pass. The four repaired
  final-state holds are B05 62 frames, B13 55, B39 38 and B54 62.
- Targeted delivery-size transition checks: **PASS** at B05→B06 (frames
  1815/1816), B13→B14 (5856/5857), B39→B40 (17331/17332), and B54→B55
  (25345/25346). The earlier cumulative 7.10-second v3 drift is not present.
- Captions: **PASS mechanically** — 207 cues; every cue intersects a mapped
  picture interval; final cue ends at 16:05.14 before the 16:07.20 end card.
- Full delivery-size review of the seven 58-beat contact sheets: the colourful
  comic/town visual grammar remains broadly legible. B08, B14, B55, B57 and
  B58 retain the bounded v3 corrections. No new source art, copy, location,
  identity or motion scene was introduced by this clock-only successor.

## Holds

1. **Heroine-outfit authority — HOLD.** B05 and B14 use the later multicolour
   trailer outfit, while B01, B04, B07, B15, B31, B39 and B56 retain yellow
   plaid. The supplied authority does not say whether the later ruling is
   limited to B05/B14 or applies to each heroine appearance. This is a
   creative/identity-source conflict, not a judgment call the media reviewer
   may make.

2. **Normal-speed player/audible evidence — HOLD.** The media and external
   caption files can be structurally checked here, but the exact master is not
   bound to a representative player in this review. Therefore a human
   normal-speed audible watch, caption-toggle/external-VTT behavior, keyboard
   seeking, reduced-motion, responsive and no-JS/failure-path proof are not
   established. This review does not claim them.

## Exact next action

Weekly Episodes must first issue a bounded heroine-outfit authority receipt.
If it changes no sources, Audio & Caption/Release QA can bind this exact frozen
tuple to a representative player and obtain an independent normal-speed
audible/caption/player witness. If it changes sources, rebuild only the named
beats and return a new checksum-bound tuple to Episode Media Quality.

## Limits and public truth

This judge did not modify the master, source media, captions, maker files,
site, route, player, deployment or public state. Trailer v4 is **BUILT
LOCALLY / CLOCK REPAIR VERIFIED LOCALLY / NOT ADMITTED / NOT DEPLOYED / NOT
PUBLIC**. Maker success is not release approval.
