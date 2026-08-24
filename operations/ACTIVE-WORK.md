# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-EXPERIENCE-REPAIR-20260823
- **Status:** HOLD — OWNER REJECTED / ROLLED BACK
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-23 America/Vancouver (rollback publicly verified 2026-08-24T03:48:40Z)
- **Goal:** Repair the public LIBRAiRY experience around the four opening books: a shorter stronger arrival, one grounded All Books shelf, discreet correct reader controls, and the full authoritative Miss Jeeves search journey shared with the Homepage.
- **Acceptance:** The four current public books and routes remain intact; one All Books shelf shows all four at launch with no empty category rooms; the masthead is materially shorter and preserves the approved carpet; Miss Jeeves understands ordinary-language questions, gives a bounded evidence-backed answer and grouped exact routes from one governed source; Homepage and Library converge on that service; desktop/mobile, keyboard, failure/retry and exact live-origin checks pass.
- **Current step:** Ali rejected successor deployment `d564e993-76f7-44b0-845a-ca4ae74bbc33` because it removed locked backgrounds, changed/cropped the locked masthead and added a black inset, used another bookshelf instead of four large individual covers, and changed the required heading to “Browse all four books.” The internal visual `ADMIT` was invalidated because it failed to enforce owner decisions and did not constitute Ali approval. The exact prior artifact `68e7b2a1ecd821ed5268ca8f90b38e279ac6132bb77e868e3d64890893e8e6d7` was redeployed as `739b7fef-52ab-4301-bcb5-1263c4a5fa8b`; controller and independent checksum verification confirm `https://laidies.ai/library.html` is byte-identical to that rollback artifact. The restored baseline is safe but incomplete: it still says “Browse the shelves.”
- **Next action:** Build an internal successor from the restored `e31f6629…` baseline. Preserve the exact masthead/background composition; change the browse heading to exactly “Browse all books”; show four large individual covers with no bookshelf; retain cover → information → Open; and produce an exact owner-review candidate. Do not deploy without Ali's direct visual approval. Separately publish a truthful Miss Jeeves backend built/missing map; a search endpoint/index is not the complete operational backend.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This blueprint task made no source-checkout writes.
- Production source worktree: `/tmp/laidies-library-page-20260823`
- Deployed source commit: `e31f6629f79403a8c1f9ed319956bdd490542c28`
- Source branch: `design/library-page-structural-20260823`
- No reset, clean, deletion of source work, unrelated provider mutation, or
  spend is authorized. Ali authorized incremental live deployment on 2026-08-22;
  release still requires exact-commit deployment and public-origin verification.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
