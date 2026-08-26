# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-BOOK-READER-POP-ZINE-REDESIGN-20260824
- **Status:** READY FOR OWNER REVIEW
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-26 America/Vancouver
- **Goal:** Implement Ali's selected pop-zine textbook reader direction across all four opening Library books without changing admitted prose, semantic meaning or book functions.
- **Acceptance:** The white long-form reading surface, editorial hierarchy and approved Rewind/computer motif frame match the selected visual; semantic boxes retain their actual manuscript jobs; desktop and mobile Contents collapse to one compact toolbar control and open an overlay drawer; Save uses the teal floppy Puffy and opens the visitor's ten selected stickers; all four books remain navigable, readable and overflow-free at 1280, 390 and 320px; the exact successor is visually compared to the approved target before any public release.
- **Current step:** Ali rejected commit `0e8ac115` after six repeated reviews because it still loaded `approved-pop-zine-reader-v1.css` and therefore presented the same rejected visual surface despite the discrete-spread behaviour underneath. That commit is not a visual successor. The current internal candidate removes that stylesheet from the page, uses the new `book--reference-zine` surface and `assets/library-reader/ai-fundamentals-reference-reader-v2.css`, and rebuilds the measured desktop and mobile compositions directly from the approved 1487 × 1058 reference. It retains only the useful behaviour: one active authored section, Previous/Next, direct chapter/subtitle Contents navigation, Top and scoped Puffy saves. Same-size comparison evidence is under `operations/product-stewards/library/evidence-reader-reference-v2-20260826/`; owner approval remains pending.
- **Next action:** Ali reviews this exact local successor. Public release remains separate and is not authorized by the local implementation or automated passes.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This task made no source-checkout writes.
- Production source worktree: `/tmp/laidies-library-owner-corrected-20260823`
- Current production baseline: `e7fc827018aa937c5ae06bc72be0ba56a6616213`
- Source branch: `design/library-owner-corrected-20260823`
- No reset, clean, deletion of source work, unrelated provider mutation, or
  spend was performed. The first identical upload was tagged with a mistyped
  expanded commit hash and was immediately superseded; only deployment
  `849687b6-c36a-4c04-9533-ca53bab99d63`, bound to the actual commit, is the
  historical superseded release. Deployment `c3cde9a0-b530-4e9f-bfd2-7dcc3c48a6d2`, bound to the exact corrected preface commit, is the accepted release; `d0db552e-2d41-46ca-a214-da1a1f7a6961` is its clean pre-preface rollback target. The intervening `248081a9-f694-4c04-b074-7dbe1ba65c26` deployment carried the wrong third transformation and was immediately superseded.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
