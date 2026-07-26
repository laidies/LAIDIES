# LIBRAiRY Cycle 5 — Repair 1 build packet

**Status:** BUILT LOCALLY — INDEPENDENT REJUDGE REQUIRED
**Trigger:** `independent-review-cycle-5-relaunch-p0-2026-07-26.md`
**Scope:** LIB-C5-J1 catalogue/source admission and LIB-C5-J2 Puffy record
admission only

## Outcome

- Keep catalogue and publication authority private, frozen and unavailable to
  client mutation.
- Bind every future available book to one exact private same-origin source.
- Reject every other source before reader state or fetch.
- Treat stored Puffy data as untrusted input on read and write.
- Recover valid sibling saves while dropping unsafe/corrupt/duplicate records
  with a visible notice.

No book is admitted, no child/source content changes, and every existing
editorial, owner, accessibility, newcomer, analytics, public and release hold
remains.

## Work breakdown

| Work | Owner | Output | Status |
|---|---|---|---|
| Private immutable catalogue and exact source binding | frontend/security maker | `library.html` | BUILT LOCALLY |
| Board/pouch schema, canonicalization and recovery | persistence/security maker | `content/site/puffy-bookmarks.js` | BUILT LOCALLY |
| Static contract | automation maker | `scripts/validate-library-product.mjs` | PASS |
| Hostile source/artifact journeys | automation maker | `scripts/test-library-product.cjs` | PASS |
| Repair evidence/dossier | Library champion | product folder | REPORT READY |

## Independent rejudge contract

The rejudge did not make this repair. It must:

1. Preserve the 72/100 FAIL report unchanged as historical evidence.
2. Confirm `window.LAIDIES_LIBRARY_CATALOGUE` is absent and the private
   catalogue, books, sections and admitted-source map are frozen.
3. Attempt runtime catalogue takeover with protocol-relative, absolute,
   backslash, encoded-origin, control-character, known-but-held and unknown
   sources. Require zero reader openings and zero publication requests.
4. Confirm a future fetch can use only the exact private admitted mapping,
   same origin, exact response URL, same-origin credentials and redirect
   failure.
5. Seed Puffy storage with valid siblings plus `javascript:`, `null`,
   duplicate, extra-field, unknown sticker, malformed date, protocol-relative,
   absolute, backslash, encoded-origin, control and unknown local route
   records.
6. Require only canonical valid siblings to render and remain in storage,
   newest duplicate to win, exact supported fields, known stickers, safe
   LAiDIES route, visible recovery and zero page errors.
7. Attempt a write-time `javascript:` route and require no stored/rendered
   record, no false save and visible recovery.
8. Run static and 21-check browser suites against source and a newly built
   exact artifact; require zero missing/oversized dependencies and governed
   byte parity.

| Gate | Floor/evidence | Independent owner |
|---|---|---|
| Product quality | 17/20; valid siblings and useful recovery remain | product judge |
| Accuracy/trust | 17/20; no client-state/source bypass | trust/security judge |
| LAiDIES contribution | 17/20; honest, humane recovery | brand judge |
| UX/accessibility | recovery status, board continuity, keyboard/mobile regression | UX/accessibility judge |
| Technical integrity | strict source/record admission and exact-artifact hostile pass | technical/release judge |

The verdict is `PASS`, `REPAIR` or `HOLD`. This maker packet has no release
authority.

