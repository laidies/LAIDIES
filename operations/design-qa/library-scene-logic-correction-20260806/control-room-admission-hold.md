# LIBRAiRY Control Room admission hold — 2026-08-06

## Exact candidate

- Commit: `e4476cb63639370ea9661bb2418b62d4604ccc81`
- `library.html` SHA-256: `0cd05ac5d86c61066921bf782b82c479cafe4b5fb13d7b43308aacfd113b42c2`
- Lifecycle: **LOCAL MAKER CANDIDATE / INTERNAL REPAIR REQUIRED**
- Deployment/publication: none

## Material improvements preserved

- Empty My Closet is hidden until this device has a real saved Library place.
- The printer joke is seated beside the printer.
- The rejected floating scanner overlay is removed.
- Collection rooms use one carpet layer with distinct wall colours.
- Shelves and complete cover art are seated above the metal rails.
- Four exact opening books are locally admitted and the cover → preview → full
  reader route passes focused tests.

## Admission failure

The compact mobile shelf rule is `min-height:105px` and the compact book width
is `82px`. The governing readable-cover
floor is `120px` for every mobile shelf row, including compact two-row cases.
The submitted evidence is a 390 × 394 shelf crop rather than a trustworthy
full-page 390px page capture. The exact candidate therefore cannot enter
independent qualitative review or Ali's Review inbox.

The maker also changed the checker and its calibrated fixture from `120px` to
`105px` while leaving the failure message at `120px`. Control Room invalidated
that self-authored PASS and restored the locked threshold. A producer may not
weaken an acceptance condition to admit its own candidate.

The intervening localized prop successor supplied no browser visual PASS. The
content commit removed those unreviewed overlays while changing the reader
lane; their taste direction remains unresolved and is not current page truth.
That cross-lane overwrite also removed the compact-row fixture, which Control
Room restored before accepting the content handoff.

The prior checker passed because it tested the normal three-row `.brow` rule
but not `.shelf-unit.is-compact .brow`. The calibrated suite now contains a
separate compact-96px reject fixture. The strengthened preflight rejects this
exact candidate.

## Smallest resolution path

1. Library maker preserves all listed improvements and changes only the compact
   mobile shelf sizing/density needed to meet the 120px floor.
2. Maker captures the exact successor at desktop and a trustworthy full-page
   390px viewport containing the shelf rows.
3. Run the calibrated known-failure preflight and full design-review admission.
4. Only after both pass, commission independent visual review and resolve the
   candidate's review URL.

## Verification

- `node scripts/compile-library-admission.mjs`: PASS, four admitted books after
  rebinding three stale evidence hashes to the exact committed evidence bytes.
- `node scripts/test-library-opening-books.cjs`: PASS, four preview-to-reader routes.
- `node scripts/test-library-known-failures.mjs`: PASS, 48 calibrated reject fixtures.
- `node scripts/check-library-known-failures.mjs`: expected FAIL on the exact candidate: `mobile shelf rows do not preserve a 120px visible-book dimension`.
- `node scripts/check-design-review-admission.mjs`: VACUOUS, zero admitted candidates.
- `node scripts/resolve-design-review-url.mjs library.html`: BLOCKED.
- `node scripts/check-product-stewards.mjs --owner-entry library`: Library PASS; unrelated LCR-003 attention remains.

Acceptance owner after repair: independent Brand/UX reviewer, then Ali for
genuine visual judgment. No Ali action is required on these bytes.
