# LIBRAiRY Cycle 5 relaunch P0 maker evidence

**Date:** 2026-07-26  
**Status:** **BUILT LOCALLY — INDEPENDENT JUDGE REQUIRED**  
**Authority:** maker evidence, not acceptance, publication, deployment or
public truth

## Exact repairs

### Publication truth

The 15 inline catalogue records now explicitly own `status` and
`statusLabel`. Current evidence produces 8 holds, 7 previews and no available
book. Desktop/mobile rendering, `openBook()`, direct hashes and curated Miss
Jeeves routes all use `bookIsAvailable()`.

### Reader reliability

Fragment failure renders a live error and retry. It explicitly says the shelf
description is not the full book. The reader starts on Close, traps focus,
closes by Escape/backdrop and returns to the exact opener.

### Save/retrieval truth

Puffy board and pouch writes now require exact localStorage read-back. Denial
shows a persistent alert, leaves the picker open and paints no false saved
state. My Closet now renders a link and remove button as siblings.

## Deterministic evidence

```text
node scripts/validate-library-product.mjs
LIBRAiRY CONTRACT PASS
books=15 · hold=8 · preview=7 · available=0 · Puffy write/read truth

PLAYWRIGHT_CORE_PATH=... node scripts/test-library-product.cjs
LIBRAiRY PRODUCT PASS
checks=18 · external_requests_blocked=9
```

The 18 rendered checks cover catalogue inventory, mobile/desktop
non-operability, visible status, 390px overflow, direct hash denial, two Miss
Jeeves hold routes, explicit reader failure, initial focus, two-way focus
wrap, Escape/exact-opener return, exact-section save, My Closet reopen/remove,
valid interactive structure and denied-storage truth.

ECO-01 regression:

```text
node scripts/test-eco01-verification-rulebook.mjs
PASS · chapters=7 · claims=14 · evals=18 · status=HOLD

node scripts/check-eco01-source-versions.mjs
PASS · C2PA 2.4

ECO01_PLAYWRIGHT_ROOT=.ds-sync \
  ECO01_BROWSER_EVIDENCE=/tmp/library-cycle5-eco01-evidence \
  node scripts/test-eco01-browser.mjs
PASS · 40 checks
```

Global checks:

```text
inline JavaScript: PASS · 352 scripts / 132 pages
local links: PASS · 1,975 references / 110 pages
Town consistency: PASS
```

## Fresh exact artifact

```text
/tmp/laidies-library-cycle5-final.43uLHq/public
builder: 1,082 files / 961.46 MiB
find: 1,083 files
du: 1.1G
missing dependencies: 0
assets over 25 MiB: 0
existing advisory: total exceeds 750 MiB
```

Artifact contract validation passed. After the source-only positive fixture
was made independent of held book bodies, the same 18-check rendered suite
passed against the artifact.

Governed public hashes:

| File | SHA-256 |
|---|---|
| `library.html` | `593afe8aa4b799428f62ae900141226dd597cf06fc010c11e60d833114056a32` |
| `content/site/puffy-bookmarks.js` | `eb79b834d8754f71ee38853e8c74fcd59af975217c21ffb64b20f127f35fe55a` |
| `laidies-card.html` | `8ecc27f4a92ab347964fd28747fd56deb322b2ed102f07780bfd2f46f6993875` |

All three source/artifact pairs were byte-identical. Public metadata passed.
All eight held rendered book bodies were not packaged; no held publication
record points to shipped book content.

## Maker self-score

| Dimension | Score | Reason |
|---|---:|---|
| Product/content quality | 17/20 | Coherent catalogue/reference loop; deliberately limited because no book is admitted. |
| Accuracy, safety and trust | 19/20 | One status authority across shelf/search/hash; failure and persistence truth are conservative. |
| Positive LAiDIES contribution | 18/20 | Preserves the distinctive room while refusing decorative authority. |
| UX/accessibility/reliability | 17/20 | Strong local keyboard/mobile/failure evidence; native AT and owner review remain. |
| Technical/artifact integrity | 18/20 | Deterministic source/artifact suites and byte parity; artifact-size advisory remains. |

Weighted maker score: **89/100 — candidate recommended to independent judge,
not self-accepted.**

## Preserved holds

- independent Cycle 5 judge;
- every production book’s own editorial/accuracy/currency/owner admission;
- ECO-01 owner, Safari/VoiceOver/native zoom and newcomer gates;
- Miss Jeeves claim/index freshness evaluation;
- book-specific correction workflow;
- analytics contract/baseline;
- owner visual approval;
- account/cross-device/backup claims;
- public-origin and release provenance; and
- 961.46 MiB artifact advisory.

No source facts, book bodies, original/superseded assets, central registry or
queue, Git, deployment, credential, provider, analytics service or public
surface was changed.
