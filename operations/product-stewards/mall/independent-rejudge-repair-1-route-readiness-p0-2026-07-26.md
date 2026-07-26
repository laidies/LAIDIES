# Independent rejudge — Mall Repair 1

**Reviewer:** independent judge who authored the initial 75/100 FAIL; not the Repair 1 maker  
**Candidate:** current exact source plus `repair-1-evidence-route-readiness-p0-2026-07-26.md`  
**Reviewed:** 2026-07-26  
**Verdict:** **PASS — Repair 1 clears the bounded local P0 gate.**  
**Weighted score:** **92/100**

This verdict closes all three implementation P0s in the initial review. It is not owner visual approval, representative editorial/source review, native assistive-technology evidence, commercial activation, deployment or public verification.

## Scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 18/20 | Pass — discovery, all admitted previews, honest held states, Gift Shop interest handling and Unit 11 fallback form a useful bounded local experience. Representative editorial review remains held. |
| Accuracy, safety and trust | 30 | 19/20 | Pass — unsupported commerce labels are gone, persistence failure is explicit and fail-closed, and the register now governs route admission. Commercial and external-provider evidence remains held. |
| Positive LAiDIES contribution | 20 | 18/20 | Pass — the Centre Court/corridor metaphor remains distinctive while the runtime visibly practises evidence, limitation and fallback rules. Owner taste remains open. |
| UX/accessibility/reliability | 15 | 18/20 | Pass locally — search, keyboard, focus, storage success/failure, reflow proxies, status output and reduced motion pass. Safari, screen-reader, native zoom and real-device evidence remain held. |
| Technical/artifact integrity | 5 | 19/20 | Pass — source and fresh artifact pass deterministic readiness/render suites with byte-identical governed files. Artifact size remains above the advisory. |

The three non-compensable dimensions each exceed the required 17/20 floor.

## Original P0 disposition

1. **Unsupported Gift Shop commerce and availability badges — CLOSED.** `Bestseller`, `Restock` and `Made to order` are absent from the governed Gift Shop HTML and runtime. Rendered product tags now say `Source-art concept`, `Source-art preview` or `Text-only concept`. No equivalent sales-history, replenishment, stock, production or fulfilment claim was found in visible text, accessible labels, metadata or structured data. The page still says prices are concepts and that checkout, stock, affiliate sale, fulfilment and reservations are unavailable.

2. **Silent storage denial — CLOSED.** A real Puffy save and peel/reset succeeds and produces accurate live status. Initial denied storage, preseeded denied storage, dynamic denial before save and dynamic denial after a successful save all produce the persistent atomic live error: “This browser could not save or remove that interest. Nothing changed. You can still browse every concept here.” The product control becomes disabled with `aria-pressed="false"` and the label `Device interest saving unavailable`; the shared Puffy control is absent. No false saved state is shown.

3. **Promotion of a register-held destination — CLOSED.** `pieces-of-flair` is the only destination whose register verdict begins `HOLD PROMOTION`. It has zero Mall route links and exactly two governed held representations: one in the directory and one in the corridor. Both say it is held/not open from the Mall; the corridor offers an in-Mall fallback to admitted previews. A synthetic second hold produced route-link and missing-held-marker violations, proving register/render drift fails the admission contract.

No new P0 was found.

## Adversarial findings

- The Gift Shop source and rendered surfaces contain none of the three rejected labels. The document has no JSON-LD commerce object, and its description remains explicitly browse-only.
- A normal browser journey opened the Puffy chooser, saved an interest, verified the private-device success state, then peeled/reset it and verified removal and a zero count.
- The standard denied-storage fixture begins with preseeded Puffy data while `setItem` and `removeItem` throw. It retained the live failure, disabled the product control, removed the shared reset control and never claimed success.
- Two independent dynamic probes changed `Storage.prototype.setItem` and `removeItem` to throw after initialization. One did so before a new save; the other did so after a successful save and before removal. Both failed closed with the same persistent status, disabled control, no shared control and no visible `saved privately` claim.
- The route-readiness checker derives held reference destinations from `/^HOLD PROMOTION\b/`, rejects any held Mall route link and requires exactly two held markers. The current register/markup baseline passed. Mutating admitted `maiybe` to a synthetic hold in memory was rejected because two route links remained and zero held markers existed.
- Search injection safety, reset/no-result focus, atomic status, directory and corridor keyboard behavior, all ten reference routes and Mall returns, stable Gift Shop redraw identity, Unit 11 external-provider qualifications, 640px/200% and 320px/400% reflow proxies, and reduced motion all remain passing.

## Independent commands and results

```text
node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS · products=65 · active=3/3

node scripts/check-mall-readiness.mjs
MALL READINESS PASS · destinations=12 · reference_departments=10 · commerce=held · community=external

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node scripts/test-mall-browser.mjs
MALL BROWSER PASS

node scripts/check-inline-js.js
PASS · 353 scripts across 132 pages

node scripts/check-local-links.js
PASS · 1,967 references across 110 pages

node scripts/check-town.js
CHECK-TOWN PASS
```

The browser suite exercised the Mall shell, search and corridor; all ten reference routes; Gift Shop; Unit 11; denied storage; 200%; 400%; and reduced motion. The readiness and browser suites also passed against the fresh exact artifact.

## Fresh exact artifact

Fresh artifact: `/tmp/laidies-mall-repair1-independent.CrN3Cw`  
Builder report: 1,078 files, 961.42 MiB; existing over-750 MiB advisory. `find` counted 1,079 files and `du` reported 1.1G.

Governed source/artifact SHA-256 pairs match:

```text
mall.html
ab28794d9fd9da84651f8ce1f22efe43c22d3b958427f08045a352475480602c

shop.html
9c7885e2f738093b2f413115283b7145b8d74c9fe89113580b8a7f7b1d3a293e

community/burn-book.html
1cfe5cfd1a83164f58586feefb95177694bd07e74995dae7c63c33258680c83d

content/mall-v2.css
53b773f560e1af6622672fbdafce1a4b110dd280ccc048f98b2a5bf697552a93

content/shop-v2.css
b9e0e26a2d34f6d1fcac559b2c5f9729275ba4a14c97b47a6bad0c38b0f5cde0

content/site/mall-v2.js
f1362565582eec48d2bd314991e5966899465d4eaab669e35f80236cfa2a4ccc

content/site/shop-v2.js
46c9ebabfc786cd2ea397a0fad86a46be201febc49a2fccc3c67be2bc0da3480
```

No deployment, public request, external-provider mutation or Git mutation occurred.

## Remaining holds

- Representative editorial, source, citation, rights and currentness review for the ten reference departments.
- Controlled Hyvor provider/sign-in/moderation/report/privacy/failure testing; no post or external mutation was attempted here.
- Safari, screen-reader, native browser zoom and real-device evidence beyond automated reflow proxies.
- Ali's visual/taste ruling for candidate art and the complete Mall experience.
- Approved privacy-safe analytics; raw search terms remain prohibited.
- Real price, stock, affiliate disclosure, production, checkout, fulfilment, shipping, return and refund evidence before commercial activation.
- Exact deployment binding, release provenance and bounded public-origin verification.
- The curated artifact's size advisory.

## Learning scan

No canonical learning was written because the judge's only permitted mutation is this report. Existing BTB-108 was reused and its stable-DOM prevention rule passed. Repair 1 operationalizes two additional reusable checks from the initial review: commerce-shaped language must be audited across visible, metadata, structured and accessible surfaces; persistence controls must prove both initially denied and dynamically lost write/remove capability without ever presenting a false saved state.
