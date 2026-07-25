# Episode media inventory — 2026-07-25

## Authoritative review candidates

| Product | Candidate | SHA-256 | Duration / delivery metadata | Authority evidence |
|---|---|---|---|---|
| Trailer | `assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v2-repaired-review-1920.mp4` | `04dff196e77d08da48a0797013a801634372c401220b062c2c8e06fd88abf4c7` | 16:07.10; 1920×1080; H.264 + AAC; 150,014,565 B | 2026-07-24 repair QC + handover name this repaired master; explicitly review-only. |
| Episode 01 | `assets/video/episode-01-full-v21-controlled-motion-review.mp4` | `4a06aef0cb8bb500f30ae67e8e08f40af0e85fedee768256c31ea0a5673e871e` | 19:32.23; 1920×1080; H.264 + AAC; 312,410,037 B | 2026-07-24 handover supersedes v20 as current controlled review cut. |
| Episode 02 | `assets/video/episode-02-full-v17-controlled-motion-review.mp4` | `97b26ce9455f3a46d2f17130c57d96182dd55aedf77420c0cdc590e6481074b6` | 16:27.47; 1920×1080; H.264 + AAC; 341,156,369 B | 2026-07-24 handover identifies it as current controlled review cut. |
| Episode 03 | `assets/video/episode-03-full-v9-controlled-motion-review.mp4` | `7a656f43b1c207f7121e9b4ba7434321be03137f9a74551991a96156b986a474` | 17:27.97; 1920×1080; H.264 + AAC; 186,763,386 B | Release board and handover promote v9 to current review source. |
| Episode 04 | `assets/video/episode-04-full-v8.mp4` | `e5d963097cbd699a5f7ad999f29323207ce5c41c4ba5ff45422e12ea35c2bdff` | 20:22.40; 1920×1080; H.264 + AAC; 280,070,911 B | Release board promotes v8 on 2026-07-24 as current review source. |

Quick Look captures and source-intent alignment matrices are in `evidence-2026-07-25/`. Metadata came from macOS indexing; the local `ffprobe` command is unavailable.

## Current public truth

Fresh fetch: `https://laidies.ai/watch.html`, SHA-256 `fc4210adcb769fdf67169cbb847d36d66969f917e3f851c4b84aa9cf421f8caa`.

`EPISODE_FILMS = {}`. The page states that final motion films are completing continuity review and falls back to the illustrated/narrated listen-along with VTT captions. Therefore **none of these review masters is publicly playable as a motion film**. The handover's older claim that some candidates were mapped in local `watch.html` conflicts with the fetched public bytes and is not public truth.

## Evidence limits / blocking audit gate

Browser control returned “No browser is available”. A later supported Computer Use run did load the **Episode 01 v21** candidate in Chrome at `http://127.0.0.1:8220/...` and visually observed the first running frame at 00:20.31: an on-brand comic season-promo card, not a narrative source-frame test. The accessibility scrubber exposed elapsed time but rejected `set_value` (remaining at 20.31/26.22), then the runtime returned `noWindowsAvailable` on permitted coordinate seeking. Thus no full normal-speed watch, further timestamp seeking, desktop/mobile public screenshot, audio listening, visual drift clearance, caption sync, or frame-level semantic alignment may be claimed. Every unobserved alignment-matrix row remains deliberately `FAIL`.
