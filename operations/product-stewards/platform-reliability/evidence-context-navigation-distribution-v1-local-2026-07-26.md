# Curated-build contextual navigation distribution v1 — local maker evidence

**Evidence time:** `2026-07-26T15:15:25-0700`  
**Status:** `BUILT AND VERIFIED LOCALLY — INDEPENDENT ACCEPTANCE PENDING`  
**Public/deploy/provider/cache mutation:** none

## Literal build

The exact accepted standalone behavior candidate remains
`content/site/sv-back-nav.js`, SHA-256
`4490123a7d7ea447a125244ef1453c92c3cfdea32dca7fc86b6b096e57f9dfd3`.
Its original deterministic browser test remains
`scripts/test-sitewide-context-navigation.mjs`, SHA-256
`8458b9de5c8f3e062f8b114d0b87f1182b0e395cbf61164d56a290951b927b92`.

The versioned distribution layer is
`scripts/lib/context-navigation-distribution-v1.mjs`, SHA-256
`ba99adf536deea8f6b07dfb9fac65fa6f1ba9a2e0829cec7065f2c6c99726c13`.
The curated builder changed from
`b10adb9ec919d38f0035d83794dba9f5d524876adfd4a38cf6b398bd5f49ce6f`
to
`0880b84356680adf65cb344fa51cf179e52b80af6708ae3ad73332bc7065cc8b`.
Every curated HTML artifact now receives exactly one:

`/content/site/sv-back-nav.js?v=svbn-2026-07-26-v1-4490123a7d7e`

The sealed receipt is
`context-navigation/v1/context-navigation-distribution-v1.json`, SHA-256
`a6d263d07ca15709362cb479cbc4f9e18a22f2bc9eddf6fef369bcae3c7465da`,
payload
`6018ccf30c65dab26fd7aa0095b1c2007c1b4fdd7b44d7de0e63f326c477152c`.

## Exact proof

`test-context-navigation-distribution-v1.mjs`, SHA-256
`403a62520b12af2aa03c75a7cf97ae0e786cfa812f4f0a61c5d59e8ad1e29d23`:

`PASS html=88 predecessor_loaders=18 inventory_sha256=cc99d6d5…e786c ordered_pages=4 duplicate_reject=1 idempotency=1 rollback=PASS`

The test builds the real curated artifact, binds the sorted 88-page inventory,
requires one exact mount per page, compares each artifact to its deterministic
source transformation, preserves all source HTML bytes other than the one
normalized/injected script tag, preserves the four explicit interactive
Previous/Next controls, rejects duplicate mounts and malformed pages, and
proves the inverse transform recovers the exact predecessor builder.

`test-context-navigation-consumer-matrix-v1.mjs`, SHA-256
`2c463381c03a27d4b8ec9040522e732fdcf1d9417a0cdcdeefb1fee50e8154b3`:

`PASS rendered=9 no_js=3 internal=1 candidate_sha256=4490123…fdfd3`

It renders the exact curated Homepage, Visitor’s Centre and ordered quiz
consumer at 320, 390 and 1440 pixels; proves one mount, mobile 44px minimum,
visible label, focus, no horizontal overflow, internal Visitor return and
retained ordered Next control. With JavaScript disabled, the contextual control
is absent, while all three source routes and the ordered control remain usable
and byte-equivalent.

The original candidate suite also passes four direct/internal/external/home
scenarios. The receipt test binds ten exact files and fails closed on drift.

## Limits and next action

This is a local curated-build change only. Source routes, shared header,
Visitor containment, domain/backend state, Brand/art, provider cache and public
origin were not changed. No-JavaScript users retain existing route navigation
but do not receive the contextual-return control; this is an explicit evidence
ceiling, not a claimed PASS for that behavior.

Town Entry, Visitor’s Centre and one ordered-experience independent judge must
accept or hold the exact receipt before release integration. Native Safari,
VoiceOver, true 200% zoom, deployed asset/cache delivery and public-origin
behavior remain later exact-artifact gates.

