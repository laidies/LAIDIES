# Maker evidence — Visitor's Centre readiness-projection candidate v3

**Product/system ID:** `visitors-centre`  
**Status:** `VERIFIED LOCALLY — INDEPENDENT ACCEPTANCE PENDING`  
**Evidence time:** 2026-07-26 11:37:10 PDT (America/Vancouver)

## Literal output

The admitted v2 candidate was preserved. A deterministic build verifies its
admitted SHA-256 before producing a new isolated v3 candidate with Platform's
real `visitorCentreSemanticReceiver()` output:

- admitted base:
  `functional-candidate-v2/index.html`
  — `d138d2a18e685f3f2923f00d966e2969dce14f2e2b1fb48bb38b0547266e9573`
- generated candidate:
  `functional-candidate-v3-readiness-projection/index.html`
  — `d8f16d86ea71c1f81c9d57fb4e3da1ec7cb91b02900bc9e5f7202aa6e4b17a5e`
- browser receiver adapter:
  `functional-candidate-v3-readiness-projection/receiver-integration-v1.js`
  — `1de4be4341d5d7b49ba87494cf2e3cb19fca246a38a1047225b09a01e7568828`
- generated semantic fixture:
  `functional-candidate-v3-readiness-projection/readiness-semantic-fixture-v1.json`
  — `db799159081f4db89dabb58fc03ba713d2b0812de3efb72f51c4d4f3c4187b23`
- build program:
  `build-functional-candidate-v3.mjs`
  — `16b4a6f29ac2ce725abf1aa453a24d2dce9319bc906abf654e840cef5909a56a`
- test program:
  `test-functional-candidate-v3.mjs`
  — `207588ad35b2a24ed2d66bba8036fd65677c339f16d4ba1a83159a5d66e11c04`
- maker result at 11:36:36 PDT before the independent rerun:
  `functional-candidate-v3-readiness-projection/evidence/test-result.json`
  — `27c0309c5d1cb9a59c4b32508c23ecd2bf5ad05637e268dd983782f3c90aac62`
- current independent rerun result in that same generated evidence slot:
  `functional-candidate-v3-readiness-projection/evidence/test-result.json`
  — `a79f0509daf0924804898876a9f60ced0257e64263e4643ae4e5005b0308f13f`

Paths above are relative to
`operations/design-explorations/visitors-centre-building-championship-20260726/`.

## Exact tests

```text
node operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs
READINESS PROJECTION V1 PASS destinations=17 current=3 fail_closed=12 idempotency=3 schema=draft2020

node operations/design-explorations/visitors-centre-building-championship-20260726/build-functional-candidate-v3.mjs
BUILT freshDestinations=17 failClosedDestinations=17 admittedBaseSha256=d138d2...

node operations/design-explorations/visitors-centre-building-championship-20260726/test-functional-candidate-v3.mjs
PASS checks=389 failures=0

node scripts/check-product-stewards.mjs --owner-entry visitors-centre
PRODUCT STEWARD SYSTEM PASS
owner_entry_product=visitors-centre:PASS
```

The browser suite independently reconstructs the Platform fresh and invalid
receipts in memory and requires byte-equivalent receiver semantics to the
generated fixture. It proves:

- exactly 17 canonical receiver objects in fresh and fail-closed modes;
- `completionClaim=false` for all 34 tested objects;
- generic unavailable language, canonical routes and no current-content
  representation when projection input is invalid;
- desktop 1440, mobile 390 and mobile 320;
- first-time, returning/no-Card, device-local Card and unavailable
  account-backed Card fixtures;
- map, named select and static no-JS directory parity;
- reveal focus, Escape close/return, 44px map target and reduced motion;
- projection, map, enhanced-directory and storage failures; and
- the existing five-part arrival grammar and neutral presentation.

## Truth boundary

The fixture is labelled `SYNTHETIC_PLATFORM_CONTRACT_FIXTURE`. It proves the
receiver contract and Visitor composition, not real owner readiness. Navigation
does not equal destination availability or completion. No shared source, live
route, destination status, identity, reward, analytics, deployment or public
artifact changed.

## Independent acceptance trigger

Admission is permitted only for the exact candidate + adapter + semantic-fixture
hash tuple above, after an independent rerun of the real receiver parity and
browser suite. Any changed byte requires a new receipt. Admission does not
authorize integration, deployment, publication or owner approval.

## Remaining blockers

- checksum-bound real owner receipts and exact release artifact do not exist
  without the Control Room integration lock;
- shared Welcome Tour/KSVL truth, validated Card projection and analytics
  contracts remain unresolved;
- native Safari/VoiceOver/zoom and human comprehension remain unproved; and
- Ali has not approved the functional arrival grammar or any global style.

## Evidence-backed improvement opportunity

The mobile 390 screenshot shows the synthetic fresh-receiver disclosure as a
four-line block immediately before the primary destination select. Before any
integrated composition, test whether successful fresh status can use a concise
non-interrupting announcement while the full provenance remains in review
evidence; keep the fail-closed warning visibly adjacent to the choice control.
This is a comprehension hypothesis, not an authorized UI change.
