# Evidence — entry readiness v1 isolated consumer receipts

**Disposition:** PLATFORM RECEIPT ACCEPTED — TWO ISOLATED CONSUMERS VERIFIED
LOCALLY; SHARED/LIVE INTEGRATION NOT PERFORMED  
**Observed:** 2026-07-26T18:42:36Z  
**Owner truth:** Platform accepts receiver-contract compatibility only. Town
Entry and Visitor's Centre retain page-behavior acceptance.

## Town Entry / Homepage and Start Here

Owner evidence:
`../town-entry-homepage/evidence/platform-projection-integration-2026-07-26/`.

Direct inspection confirms:

- the generated envelope binds payload SHA-256
  `ff422f00ae68cc7b01fadaa1438771742416d14207bbf2394a5eae808734b9ec`;
- the build bridge imports Platform's exact sealer, fixture and
  `entryCurrentContentReceiver()`;
- 17 destination / three current-content set, source hash and freshness checks
  are required;
- missing, stale, same-ID conflict and tamper scenarios fail closed;
- owner maker and independent receipts report the Platform source suite PASS
  and browser suite PASS 11/11; and
- independent scores are product 18/20, trust 19/20 and brand 18/20.

The local package's default `npm run test:candidate` could not locate
Playwright in its package tree during this Platform audit. The same test was
invoked through the workspace-bundled Playwright runtime and completed without
an error status, while the durable owner/independent 11/11 receipt remains the
assertion-level record. This runner dependency does not upgrade the evidence
ceiling.

## Visitor's Centre

Owner handoff:
`../visitors-centre/control-room-handoff-readiness-projection-v3-2026-07-26.md`.

Platform independently reran:

```text
node operations/design-explorations/visitors-centre-building-championship-20260726/test-functional-candidate-v3.mjs
INDEPENDENT PASS checks=389 failures=0
```

The rerun reproduced:

| Artifact | SHA-256 |
|---|---|
| isolated v3 candidate | `d8f16d86ea71c1f81c9d57fb4e3da1ec7cb91b02900bc9e5f7202aa6e4b17a5e` |
| receiver adapter | `1de4be4341d5d7b49ba87494cf2e3cb19fca246a38a1047225b09a01e7568828` |
| synthetic fixture | `db799159081f4db89dabb58fc03ba713d2b0812de3efb72f51c4d4f3c4187b23` |

The candidate proves the real `visitorCentreSemanticReceiver()` path, 17
canonical routes in fresh and fail-closed modes, and
`completionClaim=false` on all 34 checked objects. Visitor-owned map,
directory, reveal, no-JS, focus and Escape behavior remains separately owned.

## Evidence ceiling and remaining dependency

Both consumer candidates are synthetic, isolated, noindexed and unintegrated.
They do not establish one owner-backed destination status, current episode,
Breaking/Daily item, shared artifact, deployment, cache correction or public
behavior.

The remaining producer dependency is unchanged: 17 destination owner receipts
plus three current-content receipts must be accepted into a checksum-bound
successor. Control Room must then grant an exact shared integration lock for
the two consumer candidates, followed by new exact-artifact independent,
native accessibility, release/rollback, staging and public-origin proof.
