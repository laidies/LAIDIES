# Evidence — shared entry readiness projection v1

**Disposition:** PLATFORM PASS — BUILT AND VERIFIED LOCALLY  
**Observed:** 2026-07-26T18:36:14Z  
**Scope:** shared projection source, compiler, generated artifact, browser
receiver and curated-build inclusion  
**Live/provider changes:** none

## Literal producer → artifact → consumer contract

`17 destination owner receipts + Episode/NewsStand current-content receipts`
→ `owner-receipt-intake.v1.json`
→ `scripts/build-entry-readiness-projection-v1.mjs`
→ `content/site/readiness/v1/entry-readiness-projection.v1.json`
→ `readiness-runtime-v1.js`
→ consumer-owned Homepage/Start Here and Visitor's Centre adapters.

Missing receipts do not become inferred status. The admitted intake has 17
destination slots and three current-content slots, all with
`receiptPath: null`. The generated envelope therefore has:

- 17 destinations in `held`;
- three current slots (`latest-episode`, `breaking`, `daily`);
- zero promotable current items;
- one mandatory limitation per destination/item;
- `completionClaim: false` at every receiver output; and
- a 24-hour bounded candidate window.

The compiler currently rejects every non-null receipt path. That is an
intentional integration boundary: owner receipt ingestion cannot be invented
before its exact evidence shape and owner acceptance are locked.

## Exact shared artifacts and hashes

| Path | SHA-256 |
|---|---|
| `content/site/readiness/v1/canonical-destinations.v1.json` | `c5136958e1296c71338bdcb2eb9e271a70c6b80f3760514f9f7464d230ce7f26` |
| `content/site/readiness/v1/entry-readiness-projection.v1.json` | `adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880` |
| `content/site/readiness/v1/readiness-current-projection-v1.schema.json` | `a0085ec4cd70ce23384313ac59f0f16dd77a65843beaf5c548df5211239b119f` |
| `content/site/readiness/v1/readiness-runtime-v1.js` | `68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e` |

Envelope payload SHA-256:
`3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361`.

## Exact source/build hashes

| Path | SHA-256 |
|---|---|
| `readiness-projection/v1/owner-receipt-intake.v1.json` | `68e1af8b0bffec95d4158657867db79ccf03e669111c7f55f1ae2865177eccb5` |
| `readiness-projection/v1/readiness-projection-v1.mjs` | `5d7175c44c42571152f20c69fdba0a5c4e2674fb4715cc1886d72f75ac37c6e4` |
| `scripts/build-entry-readiness-projection-v1.mjs` | `d4fb21f38016cfa24e5de613cf521b300b3c83de544727f5ad9b6a8df60671ea` |
| `scripts/test-entry-readiness-shared-build-v1.mjs` | `73a62322be4b6039190493cf5668d343cd561b8f8d6baeb0bb452c76241d380e` |
| `scripts/build-public-site.mjs` | `b10adb9ec919d38f0035d83794dba9f5d524876adfd4a38cf6b398bd5f49ce6f` |

## Tests observed

```text
$ node operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs
READINESS PROJECTION V1 PASS destinations=17 current=3 fail_closed=12 idempotency=3 schema=draft2020

$ node scripts/test-entry-readiness-shared-build-v1.mjs
SHARED ENTRY READINESS V1 PASS destinations=17 missing_owner_receipts=17 current_promotions=0 runtime=browser-compatible artifact=curated

$ node scripts/build-public-site.mjs /tmp/laidies-readiness-public-check.rPnV4t
Public artifact: 1089 files, 959.61 MiB
Warning: artifact exceeds 750 MiB.

PUBLIC BUILD READINESS PASS files=1089 missing=0 oversized=0
```

The shared test executes the real Draft 2020-12 schema, verifies byte-identical
source/output schema/runtime/crosswalk copies, receives the exact envelope in
both Node and browser-compatible runtimes, and rejects tamper, stale data and
release-binding mismatch. The curated artifact contains all four readiness
files with the hashes above.

## Acceptance ownership and evidence ceiling

- Platform accepts schema, compiler, canonical mapping, integrity,
  fail-closed semantics and browser runtime.
- Each of 17 destination owners accepts only her receipt and public status.
- Weekly Episodes and NewsStand accept their current-content receipts.
- Homepage and Visitor's Centre owners accept their own integrated page
  behavior; no route file was edited here.
- Independent accessibility/runtime accepts rendered keyboard, announcement,
  no-JS, stale/corrupt and correction behavior.
- Control Room/Release accepts exact integration identity, rollback and
  staging/public proof.

This PASS does not prove a single owner-backed status, consumer integration,
provider delivery, deployment, cache correction or public behavior. The
literal unresolved count is 17 missing destination receipts plus three
missing current-content receipts.

## Evidence-backed improvement opportunity

PR-02's artifact-size warning reproduced: the curated build is 959.61 MiB,
above its 750 MiB warning threshold. The four readiness files total only a
small contract payload and introduced no missing/oversized dependency, but
the release builder still lacks a per-change dependency-size diff. Add a
budget report that identifies size deltas by newly admitted path so future
shared contracts can prove their marginal cost instead of inheriting only a
whole-artifact warning.
