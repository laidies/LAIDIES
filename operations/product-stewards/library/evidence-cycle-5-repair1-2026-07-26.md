# LIBRAiRY Cycle 5 — Repair 1 maker evidence

**Status:** VERIFIED LOCALLY — REPAIR CANDIDATE; INDEPENDENT REJUDGE REQUIRED
**Date:** 2026-07-26
**Repairs:** LIB-C5-J1 and LIB-C5-J2 only

## Implemented contract

### Catalogue/publication

- Catalogue construction, records, section arrays and the admitted-source map
  live inside a closure and are frozen.
- No mutable catalogue object is exported.
- `openBook` accepts only an ID and resolves its source from the private map.
- Exact source admission requires
  `/content/library-books/rendered/[a-z0-9-]+.html`, no protocol-relative,
  absolute, backslash, percent/encoded-origin, control, query, fragment,
  redirect or unknown source, and exact same-origin response binding.
- The current private source map is empty: 8 HOLD, 7 PREVIEW, 0 AVAILABLE.

### Puffy

- Board records canonicalize to exactly `id`, `title`, `summary`, `url`,
  `sticker`, `purpose`, `placedAt`.
- IDs/text are bounded; IDs use a restricted character contract.
- Sticker must be one of the approved 75.
- Routes must be exact known Puffy-capable LAiDIES pages; external,
  protocol-relative, backslash, encoded separator, control and unknown routes
  are rejected.
- Timestamps require exact valid ISO UTC millisecond form and cannot be
  materially future-dated.
- Records dedupe by ID with newest valid timestamp winning; board capacity is
  bounded.
- Board and pouch read/write paths validate. Invalid legacy rows are removed,
  valid siblings are rewritten canonically and a persistent live recovery
  message explains what happened.

## Source proof

```text
LIBRAiRY CONTRACT PASS · books=15 · hold=8 · preview=7 · available=0 · Puffy write/read truth
LIBRAiRY PRODUCT PASS · checks=21 · external_requests_blocked=13
INLINE JS PASS · 352 / 132
LOCAL LINKS PASS · 1,966 / 110
CHECK-TOWN PASS
```

Hostile fixtures cover catalogue takeover; protocol-relative, absolute,
backslash, encoded-origin, control and unknown sources; Puffy `javascript:`,
`null`, duplicate, extra field, invalid sticker/date, protocol-relative,
absolute, backslash, encoded-origin, control and unknown route; and a
write-time executable route. Publication request attempts and page errors are
both zero.

## Fresh exact artifact

```text
/tmp/laidies-library-repair1.Bq9qHM/public
builder: 1,081 files / 959.57 MiB
find: 1,082 files including build-report.json
missing dependencies: 0
oversized assets: 0
held rendered book bodies: 0
metadata: PASS
browser: LIBRAiRY PRODUCT PASS · checks=21 · external_requests_blocked=13
```

Governed source/artifact SHA-256:

| File | SHA-256 |
|---|---|
| `library.html` | `c0bb9b411c800e51b5bbd0df0b2c047387b234b2bdb09710e5c3cc3a1b1d872d` |
| `content/site/puffy-bookmarks.js` | `bedc95b54f6796fc14fd71b154c519db9c85f039a7b904d13a915b0f820196ca` |
| `laidies-card.html` | `8ecc27f4a92ab347964fd28747fd56deb322b2ed102f07780bfd2f46f6993875` |

All pairs are byte-identical.

## Maker self-score

| Dimension | Score | Reason |
|---|---:|---|
| Product/content quality | 17/20 | Recovery preserves useful valid siblings; zero admitted books remains a deliberate utility hold. |
| Accuracy, safety and trust | 19/20 | Private frozen authority and strict source/storage admission close both judge bypasses. |
| Positive LAiDIES contribution | 17/20 | Honest status and humane recovery; visual/owner gates remain. |
| UX/accessibility/reliability | 19/20 | Corrupt state cannot break the board; visible recovery and prior journeys pass. |
| Technical/artifact integrity | 19/20 | Source/artifact hostile parity, zero requests/errors and zero held bodies. |

Maker score: **91/100 — recommended to independent rejudge, not
self-accepted.**

## Preserved holds

- independent rejudge;
- every production book’s editorial/accuracy/currency/owner admission;
- ECO owner, Safari/VoiceOver/native zoom and newcomer gates;
- Miss Jeeves quality/currentness;
- correction workflow;
- analytics and owner visual approval;
- public origin/release provenance; and
- 959.57 MiB artifact advisory.

No central registry/queue, Git, deployment, credential, external service,
child source, public state, original or superseded asset changed.

