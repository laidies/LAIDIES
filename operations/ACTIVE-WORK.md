# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-EXPERIENCE-REPAIR-20260823
- **Status:** PUSHED — OWNER-CORRECTED CANDIDATE AWAITING ALI REVIEW / NOT DEPLOYED
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-23 America/Vancouver (rollback publicly verified 2026-08-24T03:48:40Z)
- **Goal:** Repair the public LIBRAiRY experience around the four opening books without changing the approved masthead or backgrounds, and finish the authoritative Miss Jeeves service honestly.
- **Acceptance:** The masthead/background markup remains byte-identical to the restored production baseline; the heading is exactly “Browse all books”; exactly four large individual covers appear with no shelf/case/wall/category boxes; cover → information → Open works on desktop/mobile; Miss Jeeves retrieves only current governed material and its operational gaps remain visibly unclaimed; Ali directly approves the exact candidate before deployment.
- **Current step:** Pushed candidate `5d33e15abbf173462f03c7a070ff7249c4f0de90` preserves the locked masthead/Miss Jeeves markup byte-for-byte (SHA-256 `07ce0d9e4068b0ec0d31bfbeeedf6f7425be5ed124cfccd2a466bdfab4d32ade`), shows exactly the four opening covers in a 4-up desktop/2×2 mobile grid with no shelf/case DOM, and preserves cover → information → Open. `scripts/test-library-opening-books.cjs` and the 12-part current Library product suite pass. The governed Miss Jeeves compiler and worker were recovered without the rejected page: 652 bound records compile and the worker suite passes, but production analytics, explicit topic intake/editorial queue, answer management, monitoring and exact public runtime proof remain open.
- **Next action:** Present the exact rendered candidate for Ali's direct visual approval. Do not deploy before that approval. After page approval, complete or explicitly scope the remaining Miss Jeeves operational backend and reverify the exact public service.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This blueprint task made no source-checkout writes.
- Production source worktree: `/tmp/laidies-library-owner-corrected-20260823`
- Deployed source commit: `e31f6629f79403a8c1f9ed319956bdd490542c28`
- Source branch: `design/library-owner-corrected-20260823`
- No reset, clean, deletion of source work, unrelated provider mutation, or
  spend is authorized. Ali authorized incremental live deployment on 2026-08-22;
  release still requires exact-commit deployment and public-origin verification.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
