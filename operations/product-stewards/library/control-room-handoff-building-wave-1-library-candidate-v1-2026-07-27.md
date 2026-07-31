# Control Room handoff — LIBRAiRY building wave 1 candidate v1

**Status:** `BUILT LOCALLY — candidate-only; review pending`  
**Scope:** `operations/design-explorations/building-wave-1/library/candidate-v1/` only.

## Visible result

A runnable room-first Library candidate demonstrates the full intended loop without a production claim: enter the dimensional room → orient → select a shelf or ask Miss Jeeves → open an explicitly labelled review-fixture admitted-book state → save an exact section in a device-local Puffy → resume/remove it from the local Closet. Held and preview covers do not open; Miss Jeeves has an explicit unavailable state.

## Governing sources followed

- `EXPERIENCE-BRIEF.md`, `OPERATING-SPEC.md`, `FUNCTIONALITY-MAP.md` and Library championship packet.
- Building Wave 1 handoff and the recovered rejection boundary: no card grid, white/pink over-art header, individual book spotlight or fake account/sync/admission.

## Art/provenance

Existing Library interior (`ADAPT`), approved Miss Jeeves desk (`KEEP`) and `bright-family-v2` covers (`KEEP`) are reused as candidate-only visual support. Rejected/unknown championship art is not referenced. Full register: `candidate-v1/KEEP-ADAPT-REJECT.md`.

## Verification

- `node --check candidate-v1/library-candidate.js` — PASS.
- `node candidate-v1/test-candidate.mjs` — PASS.
- Candidate-folder `git diff --check` — PASS.
- In-app browser was unavailable in this maker environment, so desktop/mobile screenshots are not claimed; exact rendered acceptance remains open.

## Frozen candidate files

- `candidate-v1/index.html` — `c9b8e44a58575ffb26032744feb079602a0b6d7c2f4bb44fa27964411ee6e566`
- `candidate-v1/library-candidate.css` — `47a73a7ef67182c5407924b74f397ccd975e90a372ac884ad894aa7da28c24fc`
- `candidate-v1/library-candidate.js` — `52a9f7936513a01522fb970b4283c580ca5e98d742477fbbcbd3da4b5a6b131a`
- `candidate-v1/KEEP-ADAPT-REJECT.md` — `65c5a7159a6f3173c3bbdc858c19925de230ca0209ae1efaad99c1d8c325ab32`

## Blockers and next action

No production integration is proposed. Dispatch an independent browser/product/accessibility judge to run 1440/390/320, keyboard/focus/Escape, no-JS, held/failure and storage-denied journeys. If accepted, compare this complete candidate against the incumbent in a separate clean candidate/review lane; do not merge it into `library.html` without named locks and editorial admission authority.
