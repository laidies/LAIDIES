# EMQ-E02-V19-WELCOME-IDENT-V1-INDEPENDENT-JUDGE-2026-07-26

**Judge role:** Independent Episode Media Quality  
**Verdict:** **HOLD — V-TAIL-TIMELINE-DRIFT**  
**Scope:** checksum-bound local review tuple only. No maker-media, site, public
media, release, deployment, or acceptance-state mutation was made.

## Frozen tuple verification

| Role | Path | Independently recomputed SHA-256 | Result |
|---|---|---|---|
| Candidate | `assets/video/episode-02-full-v19-welcome-ident-v1-review.mp4` | `5b9c98281d292b18ef4e70edc023a4c322add94bfe3b7e82e7d8e3dab691191b` | MATCH |
| Review window | `operations/video-qa/episode-02-v19-welcome-ident-v1/episode-02-welcome-ident-review-window-88-102.mp4` | `68508c982daa77ded6c45820e8c4895e386facc2eb0ecfff998cb64fa2a945b1` | MATCH |
| Frozen v19 baseline | `assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4` | `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3` | MATCH to maker manifest |
| Exact Episode 02 ident | `operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-02-tell-me-what-you-want-v1.mp4` | `ea5addbad951281602373cfde8d4264326e557a57b63ea2df218d0697316f138` | MATCH to maker manifest |
| Config | `operations/video-qa/episode-02-v19-welcome-ident-v1/config.json` | `ab68c26c357d3eec990a8ce8708cc5dcb223ec55e7181fd9cb39545d161d544a` | MATCH to manifest |
| Manifest | `operations/video-qa/episode-02-v19-welcome-ident-v1/manifest.json` | `4987d90404564097d006b28ba3d07d0daa50e49e7b5a9746eae59924c02960d2` | MATCH to QC binding |

## What independently passes

- Full candidate A/V decode completed with exit code 0.
- Both baseline and candidate inspect as H.264 High, 1920×1080, 30 fps, with
  a 15,360 video-track timebase; audio is AAC-LC mono, 48 kHz.
- Independently extracted ADTS elementary streams are byte-identical:
  `ef3754574b72fce8fba9bfad5545efc65c6062dcbd0c72b5590de0ee9d1a014e`.
- The canonical Episode 02 VTT/timing-map welcome interval is
  **91.340–98.590 s**. The declared picture replacement has that same 7.250 s
  interval: 6.480 s of the checksum-bound, title-specific `Episode 02 / Tell
  Me What You Want` ident plus a 0.770 s final-frame hold.
- Boundary/window inspection shows the original pre-ident picture, a hard cut
  into a legible correct Episode 02 title ident, readable motion formation and
  final hold, then a clean cut to the original post-ident picture. The visible
  title is specific to Episode 02, not a general-series substitute.

## Gate failure — final out-of-scope picture timeline

This is a **genuine delivery/timeline defect**, not a taste judgment.

Independent MP4 atom inspection gives these exact media durations:

| Track | Frozen v19 baseline | Candidate | Difference |
|---|---:|---:|---:|
| Video (`mdhd`) | 15,167,488 / 15,360 = **987.466667 s** | 15,156,224 / 15,360 = **986.733333 s** | **−0.733334 s** |
| Audio (`mdhd`) | 47,398,576 / 48,000 = **987.470333 s** | 47,398,576 / 48,000 = **987.470333 s** | 0 s |

The candidate therefore preserves the AAC payload but not the complete frozen
picture timeline: its video ends about 22 frames early while audio continues.
That missing final 0.733333 seconds is outside the permitted
91.340–98.590-second replacement window, so out-of-scope picture semantics and
timeline equality are not preserved. A 30 fps / 15,360 tbn stream is necessary
but does not cure a shortened video track.

## Smallest compliant repair and retest

Do not overwrite this checksum-bound review tuple. Render a new successor that
retains the baseline video through its exact final frame while replacing only
91.340–98.590. Before any EMQ re-review, prove baseline/candidate video-track
duration and frame count equal, alongside the existing full decode, 30 fps /
15,360 tbn, AAC elementary-stream identity, title/hold/boundary inspection,
and out-of-scope continuity checks.

**Acceptance boundary:** This HOLD grants no admission, release, deployment,
public availability, or maker self-acceptance authority.
