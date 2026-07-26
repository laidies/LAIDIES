# Mall route-readiness P0 — Repair 1 maker evidence

**Date:** 2026-07-26  
**Status:** **REPAIR 1 BUILT LOCALLY — INDEPENDENT REJUDGE REQUIRED**

## Authoritative defects repaired

This packet responds only to
`independent-review-route-readiness-p0-2026-07-26.md`.

1. Gift Shop runtime labels `Bestseller`, `Restock` and `Made to order` were
   replaced with `Source-art concept`, `Source-art preview` and
   `Text-only concept`. Source checks reject the three unsupported strings in
   Gift Shop HTML/runtime, and rendered checks scan every product-row label.
2. Gift Shop now owns a persistent atomic `#shopInterestStatus`. It probes
   storage before offering save controls, disables both the product control and
   shared Puffy control when unavailable, and rechecks storage after save/reset.
   Denial says nothing changed and never renders success or interest-saved
   state. Available save and reset are exercised through the actual Puffy
   chooser and announce bounded device-local outcomes.
3. The readiness contract derives held destinations from
   `claimVerdict /^HOLD PROMOTION/`. It requires zero Mall links to each held
   route and exactly two matching rendered hold markers. Pieces of FLAiR is
   visibly held in the directory and corridor, not enterable as open, and
   offers only an in-Mall fallback. Its direct review route remains present but
   is not promoted.

## Verification

Source:

- `node scripts/check-mall-readiness.mjs` — **PASS**, 12 destinations / 10
  reference departments.
- `PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node
  scripts/test-mall-browser.mjs` — **PASS**.
- `node scripts/check-inline-js.js` — **PASS**, 353 scripts / 132 live pages.
- Scoped `git diff --check` — **PASS**.

The rendered suite preserves the earlier shell/search/corridor, ten route,
Unit 11, 200%/400% reflow and reduced-motion passes and adds:

- machine-register hold versus rendered non-entry;
- complete rendered Gift Shop label rejection;
- real device-local save and reset through the shared Puffy chooser;
- pre-seeded storage-denial fixture with persistent live failure;
- disabled product control and no secondary Puffy save control; and
- no false saved state under denial.

## Fresh exact artifact

- Path: `/tmp/laidies-mall-repair1.cHOHF6`
- Builder identity: **1,078 files / 961.42 MiB**
- Existing builder warning: over the 750 MiB advisory.
- Public metadata validation: **PASS**
- Exact-artifact readiness: **PASS**
- Exact-artifact rendered browser: **PASS**

| Governed file | Source/artifact SHA-256 |
| --- | --- |
| `mall.html` | `ab28794d9fd9da84651f8ce1f22efe43c22d3b958427f08045a352475480602c` |
| `shop.html` | `9c7885e2f738093b2f413115283b7145b8d74c9fe89113580b8a7f7b1d3a293e` |
| `content/site/shop-v2.js` | `46c9ebabfc786cd2ea397a0fad86a46be201febc49a2fccc3c67be2bc0da3480` |
| `content/mall-v2.css` | `53b773f560e1af6622672fbdafce1a4b110dd280ccc048f98b2a5bf697552a93` |
| `content/shop-v2.css` | `b9e0e26a2d34f6d1fcac559b2c5f9729275ba4a14c97b47a6bad0c38b0f5cde0` |

## Preserved holds

- Independent Repair 1 product/trust/brand/UX/technical rejudge.
- Representative editorial, source, citation, rights and currentness review.
- Hyvor provider/sign-in/moderation/report/privacy/failure testing.
- Safari, screen reader, native browser zoom and real-device evidence.
- Ali visual/taste approval.
- Approved privacy-safe analytics.
- All real price, stock, affiliate, production, checkout, fulfilment, shipping,
  return and refund evidence.
- Deployment, release provenance and public-origin verification.

No community provider, commerce service, external account, private credential,
Git state, deployment, publication or central portfolio record was touched.
