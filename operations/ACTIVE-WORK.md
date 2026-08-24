# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-BOOK-VISUAL-PLACEMENT-20260824
- **Status:** DEPLOYED / PUBLICLY VERIFIED
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-24 America/Vancouver
- **Goal:** Move each admitted teaching image out of the book/chapter opening and into the exact section whose idea it depicts, without changing the approved image bytes or teaching prose.
- **Acceptance:** AI Fundamentals chapter 1 opens with its objectives and key terms; its automation-versus-AI image follows the explanation in section 1.1; its combined inbox-routes image follows the introduction to section 1.4; Working with AI introduces its loop before displaying the loop image; no teaching images are adjacent; all four books and persistent desktop/mobile navigation still work; the exact successor is deployed and verified at both public origins.
- **Current step:** Complete. Source/render/admission checks pass; the calibrated guard rejects the old stacked layout; all four books and persistent navigation pass locally at 1280, 390 and 320 pixels. Exact artifact `943b13e1ccf761b536ecab5a42da97f15e22998c12659b5f64363a8558303d54` is production deployment `849687b6-c36a-4c04-9533-ca53bab99d63`. Both public origins matched all 22 verification paths byte-for-byte, the two changed books passed eight live desktop/mobile placement journeys with decoded images, no adjacent figures or overflow, and Miss Jeeves health remained fully operational.
- **Next action:** Ordinary Library editorial work only. Future teaching images must name and pass an exact contextual insertion anchor before admission.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This task made no source-checkout writes.
- Production source worktree: `/tmp/laidies-library-owner-corrected-20260823`
- Deployed source commit: `ae174bb8f00388df583e33a09594dfbe5630b9f2`
- Source branch: `design/library-owner-corrected-20260823`
- No reset, clean, deletion of source work, unrelated provider mutation, or
  spend was performed. The first identical upload was tagged with a mistyped
  expanded commit hash and was immediately superseded; only deployment
  `849687b6-c36a-4c04-9533-ca53bab99d63`, bound to the actual commit, is the
  accepted release.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
