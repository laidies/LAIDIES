# EMQ E02 v19 welcome-ident v2 — independent judge

**Candidate:** `assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4`  
**Scope:** the checksum-bound, local-review-only ident/tail successor. No media,
site, release, deployment, or public-state mutation was made.

## Verdict

**ACCEPT — V-TAIL-TIMELINE-DRIFT REPAIRED (BOUNDED OPERATION).** The held v1
tail defect is fully repaired. The candidate preserves every decoded v1 picture
frame through frame 29,601 (including the 91.340–98.590 s Episode 02 ident),
then appends the exact frozen-v19 frames 29,602–29,623. It has the complete
frozen picture and audio clocks and a clean, coherent ending.

**RELEASE / PUBLIC ADMISSION: HOLD.** This scoped acceptance is not a full-title
acceptance or a release approval. The inherited full-title audible normal-speed
and actual-player external-caption witnesses remain unproven. Separately, the
candidate declares H.264 **High 4:4:4 Predictive** despite decoding as
`yuv420p`; that uncommon profile is a compatibility risk for browser/mobile
release targets. It is not a local-review decode failure, but it is a
release-compatibility HOLD until the intended player matrix is witnessed or a
separately checksum-bound broadly compatible encode is admitted.

## Independent evidence

| Check | Result |
|---|---|
| Candidate SHA-256 | PASS — `80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814` |
| Frozen v19 SHA-256 | PASS — `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3` |
| Held v1 SHA-256 | PASS — `5b9c98281d292b18ef4e70edc023a4c322add94bfe3b7e82e7d8e3dab691191b` |
| Bound config / manifest | PASS — recomputed hashes match the supplied binding: `c386…97d9` / `499e…1921` |
| Complete A/V decode | PASS — local FFmpeg 7.1, `-xerror`, exit 0 |
| Video stream | H.264 High 4:4:4 Predictive, 1920×1080, 30 fps, 15,360 tbn; decoded format `yuv420p` |
| Frames 0–29,601 | PASS — 29,602 decoded `yuv420p` frame-MD5 values exactly equal held v1, in order |
| Ident interval | PASS — included in that exact v1-preserved body: 91.340–98.590 s |
| Frames 29,602–29,623 | PASS — 22 decoded `yuv420p` frame-MD5 values exactly equal frozen v19, in order |
| Candidate frame count | PASS — 29,624 |
| Video `mdhd` | PASS — `15,167,488 / 15,360 = 987.466667 s`, equal frozen v19 |
| Audio `mdhd` | PASS — `47,398,576 / 48,000 = 987.470333 s`, equal frozen v19 |
| AAC elementary stream | PASS — extracted ADTS bytes equal frozen v19; SHA-256 `ef3754574b72fce8fba9bfad5545efc65c6062dcbd0c72b5590de0ee9d1a014e` |
| Visible boundaries | PASS — deliberate hard cuts into/out of the legible title-specific ident; no flash, black gap, or malformed transition seen |
| Visible final tail | PASS — the 22-frame source strip is a stable, complete “Next Week” end-card sequence, not a synthetic hold or truncation |

The recomputed frame comparison used the candidate and held-v1 full decoded
sequences, plus an accurate source seek at frozen frame 29,602; sequence counts
were 29,624 / 29,602 / 22 and both ordered comparisons passed.

## Reason codes and boundary

- **ACCEPT:** `V-TAIL-TIMELINE-DRIFT-REPAIRED`, `V1-BODY-FRAMES-EXACT`,
  `FROZEN-TAIL-FRAMES-EXACT`, `TRACK-CLOCKS-EXACT`, `AAC-ES-EXACT`,
  `FULL-DECODE-PASS`, `IDENT-BOUNDARY-VISUAL-PASS`.
- **HOLD — inherited full-title gate:** `AUDIO-CAPTION-PLAYER-WITNESS-UNPROVEN`.
  This is the unchanged blocker recorded by the independent v19 full-A/V judge;
  it is not a failure of this 22-frame repair.
- **HOLD — release compatibility:** `H264-HIGH444-PREDICTIVE-PLAYER-MATRIX-UNPROVEN`.
  `yuv420p` decoded pixels do not by themselves establish support for the
  signalled High 4:4:4 Predictive profile in release browsers/devices.

## Next gate

Keep this exact tuple local and checksum-bound. For full-title admission,
perform the inherited normal-speed listen and real player/VTT journey, including
tail behavior. Resolve the codec hold by witnessed intended-player coverage or
by producing a new, separately reviewed compatible successor; do not relabel
this accepted bounded repair as release acceptance.

## Learning scan

No qualifying new learning was added. BTB-185's prevention rule was confirmed:
tail repair must prove decoded final-source-frame lineage, complete picture
clock, and audio equality rather than trusting a visibly plausible ending.
