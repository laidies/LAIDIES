# LIBRAiRY Cycle 2 rough handoff

**State:** stopped under `D-2026-07-26-053`. Maker-only `_rough` files; not reviewed, scored, recommended, admitted or presented.

## Completed files

- `candidate-a-hall-catalogue/`
  - `index.html`
  - `environment-plate.png` — 1487 × 1058
  - `PROMPT.md` — exact Image Gen prompt, source receipt, hashes and reference roles
  - `MANIFEST.json` — rough status, structure facts, invariants and source-level self-check facts
- `candidate-b-rotunda-loop/`
  - `index.html`
  - `environment-plate.png` — 1505 × 1045
  - `PROMPT.md` — exact base prompt, exact floor-only correction prompt, source receipt, hashes and reference roles
  - `MANIFEST.json`
- `candidate-c-gallery-rooms/`
  - `index.html`
  - `environment-plate.png` — 1487 × 1058
  - `PROMPT.md` — exact Image Gen prompt, source receipt, hashes and reference roles
  - `MANIFEST.json`

## Incomplete or unverified

- No desktop or mobile browser captures were made; manifest capture fields are `null`.
- The HTML files were not visually inspected in a browser after writing.
- Responsive layout, focus order, reader-dialog behavior, interactions, asset loading and current header injection were not runtime-verified.
- No independent visual review, same-viewport comparison, accessibility review, admission manifest or mechanical admission check exists.
- No live page or shared production asset was edited. No commit or push was made.

## Functionality/state assumptions requiring the Library map and platform review

- `OPEN BOOK` labels and modal readers are composition mocks. Current `library.html` states that no production book is admitted today; authoritative publication/hold/preview state and its update/removal propagation remain unresolved.
- The rough reader does not use the production rendered-book source contract. Content producer, canonical source, fetch/error/retry behavior, focus return and unavailable-state behavior require mapping.
- Miss Jeeves uses a local demonstration result only. Its authoritative catalogue/index producer, answer/source contract, publication filtering, failure/retry behavior, privacy treatment and analytics boundaries require mapping.
- Puffy controls and saved-finds copy are illustrative. Whole-book versus exact-section record shape, canonical URL/anchor, device-local persistence, write failure, idempotency, remove/update behavior and Closet consumer synchronization require mapping.
- Cross-building links are navigation copy only. Exact handback state from High, episodes, NewsStand and FAiRY to a Library source is not implemented or proven.
- Collection filters and shelf-room changes are local DOM demonstrations. Inventory producer, growing-inventory behavior, deep links, return state and unavailable-book alternatives require mapping.

The required next authority is `operations/product-stewards/library/FUNCTIONALITY-MAP.md`; these rough files must not be treated as functionality evidence.
