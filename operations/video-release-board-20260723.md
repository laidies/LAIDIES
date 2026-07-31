# LAiDIES video release board

Date locked: 2026-07-23  
Purpose: one authoritative list of the current picture sources, motion status, captions, and publishing blockers.

## Current picture sources

| Release | Current source | Runtime | Captions | Motion-complete? | Release status |
|---|---|---:|---|---|---|
| Episode 01 | `assets/video/episode-01-narration-motion-v20-title-card-review.mp4` | 19:42 | SRT + VTT | No — title/card fixes sit on the earlier faint-motion build | Hold |
| Episode 02 | `assets/video/episode-02-narration-motion-v16-card-fixes.mp4` | 16:27 | SRT + VTT | No — title/card fixes sit on the earlier faint-motion build | Hold |
| Episode 03 | `assets/video/episode-03-full-v9-controlled-motion-review.mp4` | 17:28 | SRT + VTT | Controlled review cut — 29/49 placements carry restrained loops, a transformation event, or centred camera motion (58.3% of runtime) | Hold — shared welcome-card approval + final owner continuity review |
| Episode 04 | `assets/video/episode-04-full-v8.mp4` | 20:22 | SRT + VTT | Substantial — 43/55 placements carry controlled loops/events (77.5% of runtime); 12 still/title/reading-card holds are intentional | Hold — shared welcome-card approval + final owner continuity review |
| Welcome trailer | `assets/video/episode-trailer-narration-motion-v16-wardrobe-locked-review.mp4` | 16:10 | SRT + VTT | Partial — 76 scene-level motion clips exist | Hold |

Total programme runtime is approximately 90 minutes.

Trailer captions were forced-aligned on 2026-07-24 from the true tagged script
and final narration audio. Alignment coverage is 178/178 sentence units
(100%); the viewer-facing outputs contain 196 cues:

- `assets/captions/episode-trailer.vtt`
- `assets/captions/episode-trailer.srt`
- timing evidence: `operations/captions/episode-trailer-timing-map.json`

Episode 04 v8 was promoted to the current review source on 2026-07-24 after:

- full decode, duration, stream, protected-source hash, and placement checks in
  `operations/video-qa/episode-04-full-v8-qc.json`;
- known-still-relative motion measurement at eleven representative rendered
  beats in `operations/video-qa/episode-04-full-v8-motion-measure.json`;
- visual keyframe review in
  `operations/video-qa/episode-04-v8-visual/episode-04-v8-keyframes.png`.

This promotion does not call the film final. The shared “Welcome back to
LAiDIES” visual is still awaiting owner approval, and the complete v8 sequence
still needs one owner continuity watch before the Hold can clear.

Episode 03 v9 was promoted to the current review source on 2026-07-24 after:

- full decode, duration, stream, and placement checks in
  `operations/video-qa/episode-03-full-v9-qc.json`;
- known-still-relative motion measurement at representative rendered beats in
  `operations/video-qa/episode-03-full-v9-motion-measure.json`;
- visual keyframe review in
  `operations/video-qa/episode-03-v9-visual/episode-03-v9-keyframes.png`;
- transition inspection at two representative cuts in
  `operations/video-qa/episode-03-v9-visual/episode-03-v9-transition-proof.png`.

The cut preserves the authoritative 49-cue v8 content and timing. It adds
restrained 1.6% centred camera motion only to selected scenic/concept frames,
keeps emphasis/title/reading frames still, retains the approved ambient loops
and transformation event, and uses 0.35-second alpha transitions. Faces,
bodies, type, and props were not regenerated or warped.

## Rejected CapCut experiment

The following export is retained as an experiment and source of technical evidence only:

- CapCut project: `~/Movies/CapCut/User Data/Projects/com.lveditor.draft/0723`
- Export: `assets/episodes/ep-04/clips/ep04-timejump-first-london-motion-standard-v1.mp4`
- Duration: 10.30 seconds
- Format: H.264 High, 1920 × 1080, 30 fps, AAC stereo
- Audio verification: mean -24.0 dB, peak -4.8 dB
- Creative status: rejected — the output quality and generation cost are not acceptable for rollout.

Do not use this clip as the visual standard and do not scale its CapCut method across the episodes.

## Cost-controlled production direction

Canva is the first animation environment because the owner already has it and considers it the better-value tool for this work. Other tools may be used when they demonstrably improve output or reduce cost.

### Canva audit result

The connected Canva account contains one relevant design: `LAiDIES Trailer — Canva Motion Passes`. Its 55.63-second timeline contains 12 static visual clips, hard cuts, and no audio. Technical frozen-frame inspection confirms that it is not an image-animation pass and cannot be treated as a finished motion source.

A separate working copy was created before inspection. The approved original was not changed. Audit evidence is in `operations/video-qa/canva-20260723/CANVA-INVENTORY.md`.

Canva AI is not currently available inside this Video design. The image-to-video options surfaced in the editor are third-party apps. Vimmerse is the better-documented option, but opening it would authorize access to/change of the design and media upload; its lowest published test is a US$2 trial. AppBanter is not recommended because its public production and pricing information is substantially less clear. No third-party permissions were granted and no purchase was made.

### Controlled production sequence

1. Adobe Firefly proof generated on 2026-07-23 at zero cost:
   - Google Veo 3.1 Fast partner model;
   - 720p, 16:9, 24 fps, eight seconds, silent;
   - seed `502004`;
   - one free daily generation remains;
   - downloaded and saved beside the approved source frame as
     `assets/episodes/ep-04/pixel/ep04-scene-03-ada-veo31fast-background-motion-proof-v1.mp4`;
   - full decode and visual QA passed;
   - qualified production candidate pending owner visual approval because Ada
     has a slight blink, head movement, and hand/card sway despite the
     background-only instruction;
   - materially more controlled than the existing Ada loop.
2. Compare only methods that preserve approved character identity, bodies, wardrobe, and composition.
3. Preserve stable faces, bodies, wardrobe, and proportions.
4. Use scene-specific environmental motion and motivated transitions.
5. Export scene clips beside their approved source frames.
6. Use a lightweight assembly tool only for narration sync, captions, loudness, and the final master when Canva cannot do a required finishing task cleanly.
7. Approve one motion method through visual, timing, audio, commercial-use, and cost review before scaling it.
8. Do not purchase multiple direct model subscriptions during testing.

Firefly upload note: select **First**, then **This device** in Firefly's pop-up;
only then does the macOS file-selection window open. `Command-Shift-G` has no
effect before that macOS window exists.

Detailed recommendation: `operations/video-tool-stack-recommendation-20260723.md`

## Assembly order

1. Episode 04 — review the current v8 controlled-motion assembly, approve the
   shared welcome card, insert the reusable title-light sequence, then perform
   one final owner continuity watch.
2. Trailer — apply the approved motion language and create captions.
3. Episode 03 — review the current v9 controlled-motion assembly, approve the
   shared welcome card, insert the reusable title-light sequence, then perform
   one final owner continuity watch.
4. Episode 02 — replace faint full-frame movement with scene-specific motion.
5. Episode 01 — replace faint full-frame movement with scene-specific motion.

## Publishing blocker

The current GitHub Pages setup is not a dependable host for these large video files. The deployed Episode 04 route is presently broken and resolves to an Episode 01 file that displays as a black 0:00/0:00 player.

Publishing requires one of these external hosting paths:

- Cloudflare Stream: purpose-built playback and delivery, with paid stored-minute and delivered-minute usage.
- YouTube: free hosting, but with YouTube branding and platform controls.

Do not change `watch.html` to call any current source "final" until the motion, caption, playback, and hosting checks pass.
