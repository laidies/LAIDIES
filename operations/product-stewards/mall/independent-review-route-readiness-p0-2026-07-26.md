# Independent acceptance review — Mall route-readiness P0

**Reviewer:** independent judge; not the maker  
**Reviewed:** 2026-07-26  
**Verdict:** **FAIL — bounded local candidate does not clear the non-compensable trust gate.**  
**Weighted score:** **75/100**

## Scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 16/20 | Fail — the discovery shell is useful, but one explicitly held destination remains promoted and the advertised local-save failure journey is incomplete. |
| Accuracy, safety and trust | 30 | 13/20 | Fail — commerce-shaped badges imply unsupported sales, stock and fulfilment states; blocked persistence fails silently. |
| Positive LAiDIES contribution | 20 | 16/20 | Fail — the Centre Court/corridor metaphor is strong, but false retail shorthand undermines the deliberately honest browse-only experience. |
| UX/accessibility/reliability | 15 | 15/20 | Partial — search, focus, keyboard corridor, reduced motion and reflow proxies pass; storage failure, native assistive technology and provider failure remain incomplete. |
| Technical/artifact integrity | 5 | 18/20 | Pass locally — exact source/artifact hashes and bounded source/browser suites pass; artifact size remains above the advisory. |

Quality, trust and LAiDIES contribution each require at least 17/20. They are non-compensable, so the total score cannot produce a PASS.

## P0 blockers

1. **Gift Shop displays unsupported commerce and availability badges at the point of interaction.** The browse-only page correctly says prices are concepts and there is no stock, checkout, affiliate sale or fulfilment, but every product row pairs a dollar price with tags that include `Bestseller`, `Restock`, and `Made to order`. Those words assert sales history, prior/current stock, or production/fulfilment availability that the register explicitly says is unproved. A general disclaimer does not make a contradictory item badge truthful.

2. **Storage denial has no visible failure state.** The Gift Shop's persistence helper catches `localStorage` write failures and discards them. With storage denied, the “Save this interest on this device” control remains available and the save workflow provides no status explaining that nothing was saved or how to continue. This conflicts with the operating specification's requirement that blocked/corrupt storage be distinct and honest.

3. **The runtime promotes a destination the readiness register says to hold.** `pieces-of-flair` has `claimVerdict: HOLD PROMOTION — device-local persistence wording requires representative review`, yet `mall.html` exposes it in both the directory and corridor as `UNIT 01 · LOCAL PREVIEW` with an active entrance. The external register is evidence, not a user-visible limitation. Runtime admission and the machine verdict must agree.

## Independent evidence

The source suites were rerun successfully:

```text
node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS · products=65 · active=3/3

node scripts/check-mall-readiness.mjs
MALL READINESS PASS · destinations=12 · reference_departments=10

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node scripts/test-mall-browser.mjs
MALL BROWSER PASS

node scripts/check-inline-js.js
352 scripts parse across 132 live pages

node scripts/check-local-links.js
1,956 local references resolve across 110 pages

node scripts/check-town.js
CHECK-TOWN PASS
```

Rendered tests independently reproduced deterministic search, malicious-query text safety, reset/no-result focus, ten directory destinations, eleven corridor storefronts, all ten department routes and Mall return links, Gift Shop held state/stable `#shopProduct`, Unit 11 fallback copy, 640px/200% and 320px/400% reflow proxies, and reduced-motion behavior. A separate desktop corridor test confirmed ArrowRight moves to and announces storefront 2 while focus remains on `#mallCorridor`.

Adversarial Gift Shop inspection rendered these visible product-row labels:

```text
BESTSELLER · $28
RESTOCK · $8
BESTSELLER · $34
BESTSELLER · $12
MADE TO ORDER · $24
```

With `localStorage` denied, the rendered page raised no JavaScript error, but the interest control remained “SAVE THIS INTEREST ON THIS DEVICE” and no unavailable/could-not-save status appeared. Silent failure is the defect.

## Fresh exact artifact

Fresh build: `/tmp/laidies-mall-independent.XIlMsW`  
Builder identity: 1,078 files, 961.4 MiB; `find` counted 1,079 files and `du` reported 1.1G. The existing over-750 MiB advisory remains.

The readiness and rendered suites passed against this artifact. Governed source/artifact SHA-256 pairs match:

```text
mall.html                  0a91806ba9140e995c623736809e04e5423df46f6842dfcafbac057b9f325318
shop.html                  3caa6b6f6a38643a846aaa286120951ddfa82f614d08d6aae2b25769c5e00bae
community/burn-book.html   1cfe5cfd1a83164f58586feefb95177694bd07e74995dae7c63c33258680c83d
content/mall-v2.css        3c6b4093544659e704c87e0865c5faa4989151ab92a6f64ea6610ae04e6bade9
content/site/mall-v2.js    f1362565582eec48d2bd314991e5966899465d4eaab669e35f80236cfa2a4ccc
content/site/shop-v2.js    8eea93d9e4b9a10c4507cd5674f3af9dffdc8cc276f370ca0a14ae1529b4c555
```

This artifact was not deployed or publicly tested.

## What passed

- Twelve register entries are unique and contain route, purpose, source, currentness, CTA, availability, commerce, fallback and claim fields.
- Ten canonical reference routes exist in source and artifact, appear once in directory and once in corridor, render one H1 and retain Mall returns.
- Search normalization, Enter/button/Escape/reset, no-result text injection safety, atomic status and focus behavior pass.
- Corridor buttons and desktop Arrow keys retain focus, announce state and honor reduced motion.
- Gift Shop renders no checkout link and repeatedly identifies source art, dollar amounts and device-local interests as concepts rather than product/stock/purchase proof.
- Unit 11 identifies Hyvor as external, warns that sign-in may be required, makes no review/moderation/publication/shop/reward guarantee, describes provider failure truthfully and retains Mall/privacy links.
- Dynamic Gift Shop redraw preserves stable `#shopProduct` and carries changing persistence identity in `data-puffy-id`.

## Remaining holds after P0 repair

- Representative editorial, source, citation, rights and currentness review for the ten reference departments.
- Controlled Hyvor provider/sign-in/moderation/report/privacy/failure testing; no post or external mutation was attempted here.
- Native screen-reader, Safari, browser zoom and real-device evidence beyond the automated reflow proxies.
- Owner visual/taste approval for candidate art and the complete Mall experience.
- Approved privacy-safe analytics; raw search terms remain prohibited.
- Real price, stock, affiliate disclosure, production, checkout, fulfilment, shipping, return and refund evidence before any commercial activation.
- Public-origin verification and release provenance.

## Learning scan

No central painpoint entry was written because this judge may create only this Mall-scoped report. Existing BTB-108 was reused and its stable-DOM prevention rule passed. Proposed reusable prevention: commerce hold tests must reject sales-history, replenishment and fulfilment badges—not only live checkout URLs—and local persistence controls must prove denied-write messaging, not merely the absence of an exception.
