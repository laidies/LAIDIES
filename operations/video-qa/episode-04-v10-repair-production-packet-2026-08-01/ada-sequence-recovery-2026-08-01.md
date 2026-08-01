# Episode 04 Ada sequence recovery

**Status:** `RECOVERED_PRIOR_SEQUENCE_INDEPENDENT_REVIEW_REQUIRED`
**Authority:** local review material only; no successor-master, upload, release
or publication authority.

## What Ali remembered

Ali was correct: Episode 04 already had a full animated Ada sequence. It was
not the five-second Ada loop later used by the website runtime, and it was not
the newer six-beat still/generated repair candidate.

The recovered source is:

- `assets/episodes/ep-04/pixel/ep04-scene-03-ada-narration-sync-v4-story.mp4`
- SHA-256:
  `fbeea76fe689fe48ef3cf935cfea3dd98ce944cc671f9776cb261b197280881c`
- 1920×1080, 30 fps, 2,888 frames, 96.266667 seconds, video only
- tracked builder: `assets/episodes/ep-04/pixel/.build_scene03_v4.py`
- builder SHA-256:
  `5e45280c9c08d7b144dd789baaee16c92fa63cafe1b126ea4cc4262f8a183705`

The builder uses four checksum-bound Ada/Analytical Engine source frames and
an eight-shot schedule. It moves between Ada, the machine and punched-card
mechanisms with subtle pans/zooms, candle movement and rain outside the window.

## Evidence that it existed and worked

The July production records already named this scene:

- `assets/episodes/ep-04/pixel/ep04-final-video-qc-manifest.json`
  records the v4 sequence at 96.27 seconds.
- `assets/video/quicktime-playback-qc-2026-07-15.json` records a successful
  historical 2× playback check.

Those receipts prove provenance and prior playback, not current admission. A
fresh independent normal-speed narration-picture review is still required.

## How it was dropped

Later Episode 04 full-master builders did not import or explicitly supersede
the recovered 96-second sequence:

- `build-episode-04-full-v1.py` accepted only a short Ada loop;
- `build-episode-04-full-v2-motion.py` used the b-mid loop once and froze it;
- `build-episode-04-full-v8-controlled-motion.py` used a punched-card clip and
  the b-mid loop in separate cues.

The website runtime ultimately bound cue 19 to a five-second loop and repeated
it across almost fifty seconds. The exact runtime occurrence audit found that
loop seam failed at SSIM `0.119635`.

No durable receipt said the complete v4 sequence had been rejected or
superseded. The failure was therefore assembly provenance: a finished scene
was silently orphaned when a later builder selected different inputs.

## Recovered exact-audio review

The restoration builder:

- verifies the original scene, builder and parent-master hashes;
- binds the original 2,888 frames to the exact Episode 04 parent audio from
  04:05.30 through the frame-aligned endpoint at 05:41.566667;
- produces an eight-shot and a sixteen-frame contact sheet;
- records a shot-by-shot picture description, narration job and disposition.

Review output:

- `review-sequences/p18-p20-ada-recovered-v4-review-v1.mp4`
- SHA-256:
  `b4200b1f76157ca63ff13011491d8e6a3a787c8960a3f0ed12d48edec622a5cc`
- technical verdict:
  `TECHNICAL_PASS_HUMAN_AND_INDEPENDENT_REVIEW_REQUIRED`
- AAC audio decode: pass
- 1920×1080 / 30 fps / 2,888 frames: pass
- measurable movement in all eight shots: pass

The output MP4 is ignored review media. Its tracked builder, validation
receipt, contact sheets and checksum keep the result findable and
reproducible without pretending the local file is a released master.

## Current editorial decision

Do not discard either Ada candidate:

1. The recovered v4 is the primary prior sequence and preserves the intended
   Ada/machine progression across all p18–p20 narration.
2. The newer `p19-p20-ada-narration-review-v2.mp4` is an alternate whose
   capability-limit and credit-erasure beats may be more literal.

Independent review must record one of:

- `KEEP_RECOVERED`
- `USE_V2`
- `HYBRIDIZE`

The last option means retaining the recovered motion arc while replacing only
the specific capability-limit and/or credit-erasure beats when the exact-audio
comparison demonstrates a material improvement.

## Prevention now added

The sitewide video contract now requires a successor assembler to compare its
scene/source manifest with all prior checksum-bound built, reviewed or accepted
sequences for the same narration window. A scene may disappear only through an
explicit supersession receipt naming both hashes and the evidence-based reason.
Otherwise the successor fails closed as `ORPHANED_SCENE`.
