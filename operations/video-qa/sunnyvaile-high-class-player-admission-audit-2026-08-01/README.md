# SUNNYVAiLE High class-player admission audit

**Status:** FAIL_CLOSED — no class video admitted

**Evidence time:** 2026-08-01T10:51:52Z

**Surface:** `/learn/class.html?c=<registered-class-slug>`

## Outcome

The class player is not an opening-day video yet. It is a correctly guarded
capability with **zero playable class-tape occurrences**:

- 37 registered class rows;
- zero `live` rows;
- zero video paths;
- one class has a held learning-review record;
- zero admitted class learning records; and
- every current row opens an explicit production-status dialog instead of a
  video.

The runtime requires all three visitor-playback conditions at once:

1. the class-register row is `live` and contains an exact video path;
2. the matching independent learning record is currently `admitted`; and
3. the register, learning record, source interval and video binding agree.

Missing, held, stale, future-dated or mismatched data fails closed. A video
path cannot promote itself.

## What this does not prove

This is not a PASS for a future class video. When a tape exists, the universal
site-video contract still requires its exact transcript or silent purpose,
complete occurrence-by-occurrence visual description, relevance judgment,
continuity/occlusion/motion review, captions, normal-speed final-player watch,
responsive and accessibility proof, independent review and owner approval.

The `tvpulse` and `crton` CSS animations are still separately held for purpose
classification in the deterministic sitewide motion inventory.

## Reproduce

```sh
node scripts/test-sunnyvaile-high-contract.mjs
node scripts/build-sitewide-motion-inventory.mjs --check
node scripts/check-site-video-review.mjs
```

Machine evidence: `class-player-admission-audit.json`.
