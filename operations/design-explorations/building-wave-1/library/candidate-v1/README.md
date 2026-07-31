# SUNNYVAiLE LIBRAiRY — Candidate v1

**Status:** `VERIFIED LOCALLY — candidate-only successor; independent reacceptance pending`

Run `python3 -m http.server 4179` from the Website-homepage root and open `/operations/design-explorations/building-wave-1/library/candidate-v1/`. The candidate deliberately references provenance-supported artwork from the root `assets/` tree; it does not duplicate or move production assets.

This is a standalone review candidate. It intentionally does not touch `library.html`, shared CSS/JavaScript, production assets, content admission, Closet authority, deployment, or public state.

It demonstrates the required room journey with an explicit review-fixture admitted book: room arrival → shelf discovery or Miss Jeeves → open/read → device-local Puffy save → Closet resume/remove. All other covers remain visibly `hold`/`preview`; the honest Miss Jeeves unavailable state and local-only condition are runnable.

## Art provenance

- Room: `assets/building-interiors/library-interior-from-credits-dechromed-v2.png` — existing Library interior, `ADAPT` as candidate room context only.
- Miss Jeeves desk: `assets/video/delivery-20260714-opening-v6/shots/opening-10-miss-jeeves-approved-wide.png` — approved character/reference scene, `KEEP` for candidate desk presence.
- Covers: `assets/library-101/bright-family-v2/` — applicable bright cover family, `KEEP`.

No generated art was added: the provenance-supported material provides a complete, testable candidate without pretending unapproved art is final.

## Successor repair

The first independent review remains preserved at `operations/product-stewards/library/evidence-building-wave-1-candidate-v1-independent-2026-07-27/INDEPENDENT-VERDICT.md`. Its 390/320 overflow and incomplete tab keyboard model are repaired in this successor. `node test-render-successor.mjs` reruns the exact 1440/390/320, held/Puffy/Miss Jeeves/storage-denied/no-JS flows and writes checksum-bound evidence under `evidence/`.
