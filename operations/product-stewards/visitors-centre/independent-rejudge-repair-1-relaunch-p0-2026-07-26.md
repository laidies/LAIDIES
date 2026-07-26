# Independent rejudge — Visitor's Centre Repair 1

**Reviewer:** independent judge who authored the initial 69/100 FAIL; not the Repair 1 maker  
**Candidate:** current exact source plus `repair-1-evidence-relaunch-p0-2026-07-26.md`  
**Reviewed:** 2026-07-26  
**Verdict:** **PASS — Repair 1 clears the bounded local P0 gate.**  
**Weighted score:** **92/100**

This verdict closes the two implementation P0s in the initial review. It is not owner visual approval, full native-accessibility evidence, deployment, public verification or downstream-product admission.

## Scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 18/20 | Pass — the front desk now provides complete static and enhanced discovery with a clear, qualified next action. Human newcomer comprehension remains held. |
| Accuracy, safety and trust | 30 | 19/20 | Pass — every route has a fail-closed held/limited contract; hostile shared marketing prose cannot enter the reveal. Release-time owner status still needs reconciliation. |
| Positive LAiDIES contribution | 20 | 18/20 | Pass — the room-first experience remains distinctive while visibly practising LAiDIES' evidence and limitation rules. Owner taste remains open. |
| UX/accessibility/reliability | 15 | 18/20 | Pass locally — no-JS, failure, keyboard/focus, 320/390 reflow, contrast, status and reduced-motion checks pass. Safari/VoiceOver/native zoom remain held. |
| Technical/artifact integrity | 5 | 19/20 | Pass — source and fresh artifact reproduce 67 rendered assertions with byte-identical governed runtime files. Artifact size remains above its advisory. |

The three non-compensable dimensions each exceed the required 17/20 floor.

## Original P0 disposition

1. **Static/no-JS directory parity — CLOSED.** `visitors-centre.html` contains 17 static destination records with canonical name, ID, order and route parity. They are visible with JavaScript disabled and when `sunnyvaile-directory.js` is blocked. The empty enhanced selector is hidden without JavaScript.

2. **Stale/overbroad receiving-product promises — CLOSED.** The enhanced reveal no longer consumes `building.oneLiner` or `building.mechanics`. It reads the static destination contract: held/limited state, current summary, limitation and route. Held entries display `Held from promotion` and use `Open page — check status`; selection is explicitly navigation rather than completion/readiness.

No new P0 was found.

## Adversarial findings

- Static and canonical sources each contain 17 destinations. IDs, routes, names and order match, including the shared canonical `sanctuary` ID for The LUMINAiRY.
- All 17 contracts contain a substantive current summary and limitation. Six are held (`chick-flicks`, `maikeover`, `dream-phone`, `town-hall`, `sunnyvaile-high`, `fairy-godmother`); eleven are limited.
- A hostile shared-directory response replacing KSVL's `oneLiner` and `mechanics` with sentinels did not expose either sentinel. The reveal retained KSVL's rights/listening limitation.
- Removing a destination contract causes the selected destination to fail held with “details are unavailable” and the explicit navigation-not-completion rule.
- Source inspection confirms a route mismatch follows the same fail-held branch: `contractMatchesRoute` must be true before the declared summary/limitation and contract route are used.
- KSVL, FAiRY, High, MAiKEOVER, Town Hall, Dream Phone and Post Office each rendered the expected current limitation and held/limited state.
- The 320px visual shows a legible FAiRY held state, qualified CTA and intact directory; the failed-shared-script visual shows all 17 fallback routes.
- No regression was found in closed-until-selection behavior, map/directory parity, Escape/Back focus restoration, early map failure, tour storage denial, illustrated-trailer/optional-tour wording, or postcard send/delivery truth.

## Independent commands and results

```text
node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS · products=65 · active=3/3

node scripts/test-visitors-centre-contract.mjs
VISITORS CENTRE CONTRACT PASS · canonical_destinations=17

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node scripts/test-visitors-centre-browser.mjs
VISITORS CENTRE BROWSER PASS · checks=67

node scripts/check-inline-js.js
PASS · 353 scripts across 132 pages

node scripts/check-local-links.js
PASS · 1,969 references across 110 pages

git diff --check -- visitors-centre.html content/site/sv-welcome-tour.js scripts/test-visitors-centre-contract.mjs scripts/test-visitors-centre-browser.mjs
PASS
```

The browser suite covered true no-JS static parity, all 17 routes, directory/map selection, focus and Escape/Back, missing shared directory, hostile stale data, missing contract, map failure, storage failure, 390px, 320px, computed 4.5:1 status/summary contrast, polite live status and reduced motion.

## Fresh exact artifact

Fresh artifact: `/tmp/laidies-visitors-centre-repair1-independent.29We7u`  
Builder report: 1,078 files, 961.42 MiB; existing over-750 MiB advisory. `find` counted 1,079 files and `du` reported 1.1G.

The same 67-assertion browser suite passed against the fresh artifact. Governed source/artifact SHA-256 pairs match:

```text
visitors-centre.html
413da8c6237dbc17165e53921a1ef4f7c0e4a67647f62b4a4f90c839ac16d5a7

content/site/sv-welcome-tour.js
3a32744a4e4c0189dc417b60856c808db257f33dc37ee873a0b795eb296d7388
```

Independent screenshots were written only to temporary evidence path `/tmp/vc-rejudge-evidence.4EkSap`. No deployment, public request, service mutation or Git mutation occurred.

## Remaining holds

- Human clean-user comprehension: identify the room, choose a route, explain the limitation and predict the CTA outcome.
- Ali's room-first visual/experience ruling.
- Safari, VoiceOver, native browser zoom and real-device postcard/share checks.
- Approved privacy-safe analytics and meaningful comprehension evidence.
- Destination-owner status reconciliation immediately before release; the embedded contracts can become stale and do not authorize a receiving product.
- Exact deployment binding and bounded public-origin verification.
- The curated artifact's size advisory.

## Learning scan

No new canonical learning was written because the judge's only permitted mutation is this report. Repair 1 successfully operationalizes the initial review's prevention rules: test the static DOM independently from enhancement, and bind visible discovery copy to explicit fail-closed destination contracts instead of decorative shared prose. Existing BTB-050 and BTB-069 remain applicable.
