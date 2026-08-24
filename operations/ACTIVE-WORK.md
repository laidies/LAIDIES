# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-BOOK-VISUAL-PLACEMENT-20260824
- **Status:** BUILDING
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-24 America/Vancouver
- **Goal:** Move each admitted teaching image out of the book/chapter opening and into the exact section whose idea it depicts, without changing the approved image bytes or teaching prose.
- **Acceptance:** AI Fundamentals chapter 1 opens with its objectives and key terms; its automation-versus-AI image follows the explanation in section 1.1; its combined inbox-routes image follows the introduction to section 1.4; Working with AI introduces its loop before displaying the loop image; no teaching images are adjacent; all four books and persistent desktop/mobile navigation still work; the exact successor is deployed and verified at both public origins.
- **Current step:** Source/render/admission checks pass. The known-bad stacked placement is rejected by the calibrated guard, and the four-book browser suite passes at 1280, 390 and 320 pixels. Release-scope assembly and exact public verification remain.
- **Next action:** Build the public artifact from the committed successor, compare it to the exact current production artifact, deploy only the allowed delta, then verify image order and reader navigation at the immutable deployment and laidies.ai.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This blueprint task made no source-checkout writes.
- Production source worktree: `/tmp/laidies-library-owner-corrected-20260823`
- Deployed source commit: `3359a4b89c44d5b51387210f13e04bb43fc24e36`
- Source branch: `design/library-owner-corrected-20260823`
- No reset, clean, deletion of source work, unrelated provider mutation, or
  spend was performed. Ali authorized the live Library and Miss Jeeves release;
  exact-commit deployment and public-origin verification are complete.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
