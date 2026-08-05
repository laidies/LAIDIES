# Independent judgment — current LIBRAiRY 19-asset registry integration

**Verdict:** `PASS — EXACT 19-PATH LIBRARY-ONLY ACTIVE INTEGRATION ACCEPTED LOCALLY`  
**Judged:** 2026-08-03T16:26:19-0700  
**Scope:** the already-made registry integration only. This review did not edit the registry, `library.html`, runtime-family manifest, builder, source inventory, deployment, publication, book records, or release state.

## Exact identity

| Input | Independently recomputed SHA-256 | Result |
| --- | --- | --- |
| Current registry | `4070e24fa79e18ed6f809596c7d00c7a10e7b56efbd9813e1a7c048fdd6ee143` | exact |
| Reconstructed immediate predecessor (current registry minus every `library.*` entry) | `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927` | exact supplied predecessor |
| Current Library consumer | `7f0a4ca7b27fbc0ffde7b00773cf80dfeec443a1a8a9acbb97541b1e3f7bcb38` | exact |
| Current public-asset inventory | `c36837b59266b6debfebc38ed62e86f11dac58ba592ef1d40974c5bdd4391221` | exact |
| Current runtime-family manifest | `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7` | exact |
| Library owner reconciliation | `39046596c52cceb65cbea294e9bd97bf5fbc546a6d708e4617e4f2068fa86839` | exact |
| Asset-authority judgment | `ed4fc23fcc96c157c3557e50d4c682d7de3adb0a59504137324c3a4f5c99fe97` | exact `PASS` |

The owner reconciliation’s embedded `c812be…` inventory is its correctly bound **pre-integration** closure snapshot, not a claim about the current post-integration inventory. The integration-produced current inventory is the `c36837…` identity above.

## Independent delta and authority findings

- Exactly **19** entries were added: all are `library.*`, `ACTIVE`, exact-path, exact-checksum entries.
- The 19 path set equals the reconciliation asset set exactly: five Library environment/sign/case assets plus fourteen `library-bright-family-v2` cover assets. Direct SHA-256 recomputation matched all **19/19** reconciliation and registry values.
- The predecessor’s seven non-Library entries are byte-for-byte unchanged. `schema`, `updated`, `default_policy=DENY`, `dynamic_families=[]`, and all **13** retired paths are unchanged.
- Every new entry’s authority cites the exact reconciliation `390465…` and accepted independent asset-authority judgment `ed4fc…`; all are within the stated `library.html` consumer scope and visual-only/held-content limits.
- The current runtime manifest has exactly **14** `library-bright-family-v2` members. `textbook-vocab-101.png` is absent from the manifest, absent from the registry, and absent from the current public inventory; it remains default-denied.

## Meaningful negative calibration

1. Replacing the exact current arrival-image checksum with 64 zeroes caused `assertActiveAsset` to reject it with `public asset checksum mismatch`.
2. A temporary synthetic registry that adds the excluded `textbook-vocab-101.png` as ACTIVE compiles structurally, which proves the generic admission parser alone cannot establish a product batch boundary. The independent exact-set guard then rejects it because that path is absent from the 19-path owner reconciliation. No repository file was changed for either calibration.

## Re-run evidence

| Check | Result |
| --- | --- |
| `node scripts/test-active-asset-admission.mjs` | `PASS` |
| current inventory traversal | `HOLD` as intended: `binary=581`, `ACTIVE=21`, `UNREGISTERED_DEFAULT_DENY=560`, `prohibited_references=21`, `missing=0` |
| builder/inventory parity | `PASS`: exact prohibited-reference set, `missing=0`, fail-closed |
| source-narrowing guard | `PARTIAL PASS`: 21 source-reference holds across 12 paths; no path-policy bypass |
| eight Library product/system/consolidation suites | `PASS`: product 68 checks; correction propagation 17; correction service 22; building v4; environment v1/v2; modular reader at 1440/390/320; Vocab→Concepts consolidation |
| `git diff --check -- operations/assets/active-asset-registry.json library.html` | `PASS` |

## Remaining truth

This accepts only the exact 19 visual public-asset entries for the exact current Library candidate locally. It does **not** admit held book content or readers, clear any non-Library public assets, clear the 21 prohibited source references, make the curated public build pass, approve a release/deployment/public state, or restart the paused dispatcher. The whole-town public-asset closure remains `HOLD` until those separate source references and remaining asset authorities are resolved.
