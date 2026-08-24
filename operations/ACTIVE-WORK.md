# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-EXPERIENCE-REPAIR-20260823
- **Status:** PUSHED — OWNER-CORRECTED CANDIDATE AWAITING ALI REVIEW / NOT DEPLOYED
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-23 America/Vancouver (rollback publicly verified 2026-08-24T03:48:40Z)
- **Goal:** Repair the public LIBRAiRY experience around the four opening books, use Ali's supplied wide masthead composition at a shorter height with a bright in-palette wall treatment, restore the pop-art section backgrounds, and finish the authoritative Miss Jeeves service honestly.
- **Acceptance:** The masthead preserves Miss Jeeves, the computers, staircase/shelves, desk and useful carpet detail without a black inset; the heading is exactly “Browse all books”; exactly four prominent individual covers appear in one desktop/compact row with no shelf/case/wall/category boxes; cover → information → Open works on desktop/mobile; Miss Jeeves retrieves only current governed material and its operational gaps remain visibly unclaimed; Ali directly approves the exact candidate before deployment.
- **Current step:** Candidate `487d1181ddf322b4934c33456c3e5b2405838577` was owner-rejected because its fixed-height `cover` treatment cut off Miss Jeeves's head, its generated walls were hot neon magenta, and a later title-colour override made the Library title unreadable. Pushed successor `e655b5c194b7688b5b8cf5a66e0b3145179d1e63` introduced the full-frame light-blue masthead repair; the current follow-up removes the title override and restores the exact preceding Library title treatment. The pop-art backgrounds, one-row four-book browse and governed common Miss Jeeves questions remain intact. This follow-up is uncommitted, not owner-approved and not deployed; production analytics, explicit topic intake/editorial queue, answer management, monitoring and exact public runtime proof remain open.
- **Next action:** Present the exact candidate for Ali's direct visual approval. Do not deploy before that approval. After page approval, complete or explicitly scope the remaining Miss Jeeves operational backend and reverify the exact public service.

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
