# Independent acceptance — Town Entry contextual-navigation distribution v1

**Verdict:** **ACCEPT — exact 88-page curated-distribution successor, Town
Entry consumer scope only.**

## Exact bound candidate

- Receipt:
  `../platform-reliability/context-navigation/v1/context-navigation-distribution-v1.json`,
  SHA-256 `a6d263d07ca15709362cb479cbc4f9e18a22f2bc9eddf6fef369bcae3c7465da`,
  payload `6018ccf30c65dab26fd7aa0095b1c2007c1b4fdd7b44d7de0e63f326c477152c`.
- Shared behavior candidate: `content/site/sv-back-nav.js`, SHA-256
  `4490123a7d7ea447a125244ef1453c92c3cfdea32dca7fc86b6b096e57f9dfd3`.
- Distribution module: `scripts/lib/context-navigation-distribution-v1.mjs`,
  SHA-256 `ba99adf536deea8f6b07dfb9fac65fa6f1ba9a2e0829cec7065f2c6c99726c13`.
- Curated builder: `scripts/build-public-site.mjs`, SHA-256
  `0880b84356680adf65cb344fa51cf179e52b80af6708ae3ad73332bc7065cc8b`.
- Exact public mount on every artifact:
  `/content/site/sv-back-nav.js?v=svbn-2026-07-26-v1-4490123a7d7e`.

## Independent evidence rerun

1. **DIST-001 PASS — complete, version-bound coverage.** I reran the sealed
   receipt and distribution suites. The builder emits exactly one mount in all
   88 curated HTML artifacts; the sorted inventory SHA-256 is
   `cc99d6d5f9b497d69244dd6dbc35f6ebdf8926a5214e27b85f81bbdf998e786c`.
   The prior source-loader baseline remains 18.
2. **DIST-002 PASS — deterministic failure and rollback.** Candidate-hash
   drift, duplicate source mounts and missing `</body>` fail closed. Repeated
   transformation is idempotent. The inverse builder reconstructs the exact
   predecessor SHA-256 `b10adb9ec919d38f0035d83794dba9f5d524876adfd4a38cf6b398bd5f49ce6f`.
3. **ENTRY-003 PASS — Town Entry consumer behavior.** The independently rerun
   browser matrix passes at 320, 390 and 1440 px: the direct Homepage has no
   redundant return; deep direct/external entry receives a visible labelled
   home fallback; same-origin Visitor’s Centre → Library receives a `previous`
   return with the exact query path; controls are keyboard-focusable and meet
   the mobile 44px floor with no horizontal overflow.
4. **ENTRY-004 PASS — honest fallback/no-JS.** Direct and external entries
   never call history back: they link deterministically to `/`. With JavaScript
   disabled the contextual control is absent, while the existing Town Entry,
   Visitor and ordered source routes remain present and usable.
5. **ORDER-005 PRESERVED / INDEPENDENT.** The distribution suite proves the
   four explicit Previous/Next source controls byte-equivalent; the browser
   matrix confirms `#quizNextQuestion` survives rendered and no-JS states.
   This is preservation evidence only, not SUNNYVAiLE High’s independent
   ordered-flow product acceptance.

Commands rerun locally:

```text
node operations/product-stewards/platform-reliability/context-navigation/v1/test-context-navigation-distribution-receipt-v1.mjs
node operations/product-stewards/platform-reliability/context-navigation/v1/test-context-navigation-distribution-v1.mjs
node operations/product-stewards/platform-reliability/context-navigation/v1/test-context-navigation-consumer-matrix-v1.mjs
node scripts/test-sitewide-context-navigation.mjs
```

All passed against the bound bytes. No maker candidate, live route, shared
global source, Brand candidate, deployment, public origin, cache or provider
state was changed.

## Limits and next action

This closes only the Town Entry independent-consumer receipt. It does not
close the separate SUNNYVAiLE High ordered-flow acceptance, native Safari,
VoiceOver, true 200% zoom, deploy, cache or public-origin gates. Control Room
may record Town Entry as ACCEPT and retain those remaining gates explicitly.

## Learning scan

No new reusable issue arose. Existing BTB-163 and BTB-175 prevention rules
remain satisfied: assess direct/internal/external mobile behavior separately
from deterministic all-artifact distribution and ordered-control preservation.
