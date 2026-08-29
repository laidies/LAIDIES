# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIVE-SITE-MIXED-ARTIFACT-RECOVERY-20260828
- **Status:** BUILDING / PARTIAL PUBLIC RECOVERY
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-28 America/Vancouver
- **Goal:** Recover the intended visitor-facing site after a narrow product branch replaced production with stale whole-site snapshots.
- **Acceptance:** The four-book LIBRAiRY, KSVL playback, the newer Chick Flicks page and physical episode scrolling are publicly verified without regressing unrelated routes; LUMINAiRY and NewsStand are either restored from release-eligible exact artifacts or remain explicitly held with their literal blockers; the release process prevents another narrow-branch whole-site rollback.
- **Current step:** Deployment `4d53f0a6-9385-4d7f-805e-5cfe27e67c7c` publicly restores the four-book LIBRAiRY, renewed 29-track KSVL catalogue and newer direct-entry Chick Flicks page. Mobile physical scrolling passes on the shelf and inside Episode 01. The 43-profile LUMINAiRY overlay is committed and pushed at `8bd12a4f`; its browser suite passes, but its full validator intentionally fails because Carrie Bradshaw's deferred song is absent. The newer NewsStand v12 page still imports private preview data and its current articles have no formal public admission.
- **Next action:** Obtain Ali's exact ruling on whether the honest 43-profile LUMINAiRY may deploy with Carrie labelled `Song coming later`; keep the NewsStand preview and unadmitted August 23-24 copy out of production pending a separate exact release decision.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This task made no source-checkout writes.
- Production source worktree: `/Users/alisoneakin/Projects/laidies-live-site-recovery-20260828`
- Current production source: `23ef029ffdd388034d4a9f1d71173d6bc50631bd`
- Current production deployment: `4d53f0a6-9385-4d7f-805e-5cfe27e67c7c`
- Source branch: `codex/live-site-recovery-20260828`
- No reset, clean, deletion of source work, unrelated provider mutation, or spend was performed. The iCloud checkout remained untouched. LUMINAiRY source `8bd12a4f` is pushed but not deployed; NewsStand is not integrated.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
