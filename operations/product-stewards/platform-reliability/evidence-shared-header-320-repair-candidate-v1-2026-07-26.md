# Evidence — shared header 320px repair candidate v1

**Candidate:** `SVGH-320-2026-07-26-v1`  
**Status:** VERIFIED LOCALLY — HOMEPAGE AND VISITOR INDEPENDENT ACCEPTANCE REQUIRED  
**Evidence time:** 2026-07-26 12:42:57 PDT  
**Maker lock:** `content/site/sv-global-header.js`, Platform-owned tests and
Platform dossier evidence only  
**Deploy/public authority:** not used

## Literal repair

The candidate moves the already-proven Visitor compact geometry into the
shared component under one `@media (max-width: 340px)` boundary:

- shared header gap `10px → 6px`;
- left/right padding `14px → 8px`;
- shared nav gap `9px → 4px`;
- Account status, Join and Menu padding `6px 12px → 5px 7px`;
- those three control font sizes `12px → 10px`.

No navigation label, route content, font family, sitewide token, Brand
candidate, desktop rule or 390px rule changed. The source diff is nine added
CSS-string lines inside the existing shared header runtime.

## Exact candidate binding

```text
PRE   f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93  content/site/sv-global-header.js
POST  807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa  content/site/sv-global-header.js

faec28899a0477d0039c9cc4cdc62641ea7671be9da4dbe27558e5125db1f047  test-shared-header-320.mjs
4aec9082fa1beb640ce40b1ec545c2658e426824a2a119bdc1550e7f55a5ddff  test-shared-header-consumer-matrix.mjs
1bf8f531985515201d8927b42747d12492bb018cd7f16b96f8e15794006e4c7c  evidence-candidate/matrix-result.json
```

Frozen consumer inputs:

```text
c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772  index.html
de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743  visitors-centre.html
350be1c0f055a61fed0db9299e57a4408b6883ab6651e0838f25a4b3fcfdde79  sorority-house.html
```

Machine receipt:
`shared-header/v1/shared-header-320-repair-candidate-v1-2026-07-26.json`.

## Before → after

| Raw shared geometry at 320px | Before | Candidate |
|---|---:|---:|
| `.svgh-nav` right edge | 333.94px | 312px |
| document width | 334px | 320px |
| gate | HOLD / exit 1 | PASS / exit 0 |

The candidate raw geometry now matches the existing Visitor-contained geometry
exactly: nav left 132.16px, right 312px, width 179.84px, document 320px.
The Visitor route was not edited.

## Deterministic proof

```text
node operations/product-stewards/platform-reliability/shared-header/v1/test-shared-header-320.mjs --gate
SHARED HEADER 320 CHARACTERIZATION PASS shared_status=PASS raw_nav_right=312 visitor_nav_right=312

node operations/product-stewards/platform-reliability/shared-header/v1/test-shared-header-consumer-matrix.mjs --gate --evidence
SHARED HEADER CONSUMER MATRIX PASS routes=3 js=9 no_js=3 keyboard=3 zoom200_proxy=3

node scripts/test-visitors-centre-contract.mjs
VISITORS CENTRE CONTRACT PASS

PLAYWRIGHT_CORE_PATH=.ds-sync/node_modules/playwright-core node scripts/test-sorority-house-browser.mjs
SORORITY HOUSE BROWSER PASS
checks=138
external_provider_attempts=0

node scripts/test-post-office-local-contract.mjs
PASS: Post Office local contract (privacy, truthful failures, source binding)

node scripts/test-sunnyvaile-high-contract.mjs
SUNNYVAiLE HIGH CONTRACT PASS (13 checks)
```

The owned consumer matrix covers Homepage, Visitor's Centre and Sorority House
at 1440, 390 and 320 CSS pixels; 320 is the stated local reflow proxy for a
640px layout viewport at 200% browser zoom. It also covers the three current
no-JS fallbacks, reduced motion, unchanged navigation labels, keyboard
activation, Menu open, Escape close and focus retention.

The 1440 and 390 computed geometry/style signatures are byte-for-byte equal to
the pre-change run. This is expected because the new rule cannot match above
340px. The 12 rendered screenshots and their individual hashes are bound
inside `shared-header/v1/evidence-candidate/matrix-result.json`.

Maker visual inspection confirmed:

- Visitor 320 retains LAiDIES, Account status, Join and Menu in one row with no
  clipping;
- Homepage 390 is visually unchanged and continues using its own topbar;
- Sorority House desktop is visually unchanged.

This is maker evidence, not independent visual admission.

## No-JS and accessibility boundary

The candidate changes only CSS injected by JavaScript. With JavaScript
disabled, the current source fallbacks are unchanged:

- Homepage: 9 links and Menu button remain in source;
- Visitor: the LAiDIES home link remains;
- Sorority House: its existing empty header fallback remains empty.

That last state is preserved evidence, not a claim that Sorority House's no-JS
fallback is product-complete. It belongs to its owner and was not widened under
this lock.

Native browser zoom, Safari, VoiceOver and human comprehension remain outside
this local Chromium maker proof. The two named page owners remain independent
acceptance gates.

## Aggregate measurement non-collision

Provider delivery stays **BLOCKED** and the aggregate measurement files are
unchanged:

```text
c11b059fec8d6955c30786bbbf315f14a7cbff0a29d3ab00192353c93e57ffa7  aggregate-measurement-v1.mjs
0d1592ff3179a6d501583a011d4e2428d5a8bf67e9c65788f642de69df893a33  current-measurement-snapshot.v1.json
ddcffa3a78e5c8b5653f3b21801f47682f54acda330e5b0f10d4b942124ca5e8  test-aggregate-measurement-v1.mjs
```

## Independent acceptance required

Town Entry / Homepage and Visitor's Centre must each review the exact shared
candidate hash `807bbe6…` against their frozen route hash, native page
semantics and visual/accessibility evidence. A changed source or route hash
requires resealing and rerunning the affected matrix.

Until both receipts exist, the status is **VERIFIED LOCALLY — INDEPENDENT
ACCEPTANCE REQUIRED**, not integrated, deployed or publicly verified.
