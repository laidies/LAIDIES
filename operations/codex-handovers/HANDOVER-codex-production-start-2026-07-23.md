# Codex production start handover

Date: 2026-07-23

This file records the first implementation work completed after the takeover audit. It supplements `HANDOVER-codex-takeover-audit-2026-07-23.md`.

## Completed

### Video

- Inventoried the current picture masters, cue files, captions, and scene-level motion assets.
- Identified why earlier builds still read as slideshows: the legacy assembly script applies only a very small full-frame push and crossfade.
- Created a native CapCut project for an Episode 04 time-jump experiment.
- Exported and technically verified:
  - `assets/episodes/ep-04/clips/ep04-timejump-first-london-motion-standard-v1.mp4`
- Owner decision: the CapCut output quality and cost are rejected. The experiment must not be treated as the motion standard.
- Pivoted the production direction to a cost-controlled stack: Canva first, a short multi-model bake-off through Adobe Firefly when generative motion is needed, and automated local finishing.
- Reconnected Canva and completed the account inventory:
  - one relevant design was found: `LAiDIES Trailer — Canva Motion Passes`
  - the design contains 12 static visual clips over 55.63 seconds, hard cuts, and no audio
  - automated frozen-frame inspection confirms it is not a finished animation pass
  - a separate safe working copy was created; the original design was not changed
  - evidence and export are in `operations/video-qa/canva-20260723/`
- Confirmed that Canva AI is not currently available inside this Video design. The image-to-video choices surfaced in Canva are third-party apps.
- Identified Vimmerse as the better-documented Canva-integrated test option. It requires permission to read/change the design and upload media, plus a published US$2 trial. No permission was granted and no purchase was made.
- AppBanter is not recommended for the first proof because its public pricing and production information is materially less clear.
- Completed the first Adobe Firefly proof generation at zero cost:
  - Google Veo 3.1 Fast, 720p, 16:9, 24 fps, eight seconds, silent
  - seed `502004`
  - one free daily generation remains
  - downloaded and saved without overwriting any original as
    `assets/episodes/ep-04/pixel/ep04-scene-03-ada-veo31fast-background-motion-proof-v1.mp4`
  - full decode passed: H.264 High, exactly 8.00 seconds, 192 frames, no audio
  - face, gloves, fingers, punch card, wardrobe, composition, and comic
    art direction remain coherent
  - qualified production candidate rather than an automatic rollout: Veo adds
    a slight blink, head movement, and hand/card sway even though the prompt
    asked for background-only motion
  - materially more controlled than the existing Ada loop, which has a large
    character/camera shift and oversized invented musical notes
  - complete scorecard and QA evidence are in
    `operations/video-qa/firefly-20260723/EP04-ADA-MOTION-PROOF.md`
- Recorded the working Firefly upload sequence: select **First**, choose
  **This device** in the Firefly pop-up, then use the macOS file-selection
  window. `Command-Shift-G` does nothing before that macOS window exists.
- Locked the revised production status and assembly order in:
  - `operations/video-release-board-20260723.md`

### Website

- Generated a new Visitor's Centre lobby source that follows the approved room-as-page model:
  - `assets/building-interiors/delivery-20260723-visitors-centre-lobby-v1/visitors-centre-lobby-map-wall-v1.png`
- Rebuilt `visitors-centre.html` as a working room:
  - full-bleed lobby
  - approved final town map on the wall
  - 17 numbered building pins
  - 17-building named directory
  - in-place Welcome Cards with actual entry routes
  - guided-tour, Episode 01, anthem, trailer, Handbook, and Wednesday-postcard paths
  - responsive mobile layout
- Updated `content/site/sunnyvaile-directory.js` to the approved final-v5 town map.
- Completed design and interaction QA. Result: passed. Evidence is in `design-qa.md`.

## Current external blocker

The site does not have a dependable production video host. GitHub Pages is unsuitable for the programme files, Cloudflare R2 is not enabled on the account, and Cloudflare Stream activation may create a paid service.

An explicit owner choice is required:

1. authorize Cloudflare Stream; or
2. use YouTube.

## Next production work

1. Obtain the owner's visual approval or rejection of the saved Ada proof,
   specifically the slight blink, head movement, and hand/card sway.
2. Do not spend the remaining free generation until that decision. If approved,
   test two deliberately different Episode 04 frames before a full rollout.
3. Apply the winning motion language across Episode 04 and export the first full motion-finished master.
4. Complete the trailer next, including captions.
5. Continue the building-page sequence from the approved master plan:
   - Blend & Snap
   - NewsStand
   - Chick Flicks
   - MAiKEOVER
   - Mall
   - LUMINAiRY
4. Publish only after video playback, captions, mobile layout, and routes pass release QA.

## Safety

- No git commands were run.
- No approved original was overwritten, moved, or deleted.
- The CapCut export-sync option was turned off; nothing was published from CapCut.
- Canva is connected. Its original design was left unchanged, and no third-party Canva app permissions were granted.
