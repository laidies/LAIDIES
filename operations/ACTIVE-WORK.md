# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-PAGE-WALKTHROUGH-20260823
- **Status:** BUILDING — LOCAL CANDIDATE / OWNER REVIEW NOT YET REQUESTED
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-23 America/Vancouver
- **Goal:** Implement Ali's complete 2026-08-22 Library-page walkthrough without regressing the four publicly available books.
- **Acceptance:** The page keeps the physical Library interior and four admitted books; elevates the masthead; separates Ask Miss Jeeves from browsing; uses distinct role-based teaching colours with no yellow or dark-on-dark text; keeps grounded readable shelves and generous search; mounts visible town navigation; and provides compact Report an issue plus floppy-disk Save Book/Chapter/Section controls that open the visitor's ten Puffy choices. Desktop and 390/320 responsive journeys must pass before owner review. Deployment requires Ali's exact-candidate approval and separate release verification.
- **Current step:** Local candidate on branch `design/library-page-walkthrough-20260823` from production-docs base `5d36c52d46dbfa5eb03379976d82aa8ec93383f7`. The current 14-check four-book product suite passes, including 1280/390/320 reader navigation and overflow checks; the new calibrated presentation guard passes 11 reject fixtures. Maker browser inspection passed the 1440 masthead, Reference Desk, browse/search and grounded 101s shelf. The in-app browser's security service then stopped granting access to the local origin, so a fresh 390/320 visual screenshot remains unverified even though the automated responsive journeys passed. Existing product-steward validation remains red on four pre-existing learning-inventory/work-order items outside this page change.
- **Next action:** Complete the fresh 390/320 maker visual check when the browser security service accepts the local origin, bind the exact commit and screenshots, then present that exact candidate to Ali. Do not deploy before her ruling.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This blueprint task made no source-checkout writes.
- Recovery lane: `/tmp/laidies-library-release.AEjqSu`
- Deployed starting commit: `e044ca899dfea867ba10f770cc99a0b8e32c100a`
- Branch: `release/library-four-books-20260823`
- No reset, clean, deletion of source work, unrelated provider mutation, or
  spend is authorized. Ali authorized incremental live deployment on 2026-08-22;
  release still requires exact-commit deployment and public-origin verification.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
