# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIVE-SITE-MIXED-ARTIFACT-RECOVERY-20260828
- **Status:** BUILDING / PARTIAL PUBLIC RECOVERY
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-28 America/Vancouver
- **Goal:** Recover the intended visitor-facing site after a narrow product branch replaced production with stale whole-site snapshots.
- **Acceptance:** The four-book LIBRAiRY, KSVL playback, the newer Chick Flicks page and physical episode scrolling are publicly verified without regressing unrelated routes; LUMINAiRY and NewsStand are either restored from release-eligible exact artifacts or remain explicitly held with their literal blockers; the release process prevents another narrow-branch whole-site rollback.
- **Current step:** Deployment `cb5eed79-5df8-444f-9cb6-85a73cb46915` preserves the recovered four-book LIBRAiRY and renewed 29-track KSVL catalogue, keeps the newer Chick Flicks page, and adds direct Watch routes plus the newest recoverable Episode 01–04 videos as explicitly `available-in-progress`. All four film-host objects match their full expected hashes; the live browser binds their exact URLs and durations, attaches captions, advances Episode 04 unmuted, and shows zero 390px overflow. Quality admission remains `hold`, the Trailer remains unavailable, and the current videos are labelled as improving. The 43-profile LUMINAiRY overlay remains pushed but excluded from the exact deployment artifact; NewsStand v12 remains held because it imports private preview data and its current articles have no formal public admission.
- **Next action:** Continue the live-site recovery with the already-open LUMINAiRY decision and a separate current NewsStand publication repair; continue episode visual improvements without withdrawing the now-public current Episode 01–04 videos.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This task made no source-checkout writes.
- Production source worktree: `/Users/alisoneakin/Projects/laidies-live-site-recovery-20260828`
- Current production source binding: `2ad3aa76` (the deployed artifact is an exact four-path overlay, not the full branch tree)
- Current production deployment: `cb5eed79-5df8-444f-9cb6-85a73cb46915`
- Source branch: `codex/live-site-recovery-20260828`
- No reset, clean, deletion of source work, unrelated provider mutation, or spend was performed. The iCloud checkout remained untouched. LUMINAiRY source `8bd12a4f` is pushed but not deployed; NewsStand is not integrated. Three unrelated paths entered an unresolved merge state during this task (`index.html`, `operations/assets/active-asset-registry.json`, `scripts/test-homepage-held-assets-browser.mjs`); they were neither resolved nor included. Episode follow-up commits used an isolated Git index so those bytes remained untouched.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
