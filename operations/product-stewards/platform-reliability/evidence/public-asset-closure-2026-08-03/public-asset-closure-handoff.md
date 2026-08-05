# Curated public-asset closure — maker handoff

> **Current successor status — 2026-08-03:** the machine manifest now hashes
> `ecd195fee11f0f6575ee53638233b1e7247cf08b45903c361138231ac22606a5`
> and records 582 builder-reachable binaries, ACTIVE=2,
> UNREGISTERED_DEFAULT_DENY=580, 31 prohibited references across 19 paths and
> missing=0. The real builder remains fail-closed. The exact bounded change is
> recorded in `held-media-derived-source-narrowing-maker-receipt.md` and passes
> the exact independent judgment in
> `held-media-derived-source-narrowing-independent-judge-2026-08-03.md`. The
> 891/867 figures below are the original historical
> closure snapshot, not current truth; retain them only as predecessor evidence.

**Recorded:** 2026-08-02 America/Vancouver  
**Status:** **BLOCKED — BUILD REMAINS REQUIRED**  
**Scope:** evidence-only inventory of the current curated public-build source set  
**Maker:** Functionality & Platform Director  
**Acceptance owner:** independent Platform/release judge (not the maker)

## Decision

The independent judge was right: `favicon.ico` is only the first failing byte.
The current builder would attempt **891 binary assets**. Only **2** are exact
`ACTIVE` entries with matching checksums; **867** are unregistered under the
default-deny registry, **21** are candidate-path assets the builder must reject,
and **1** is a registry-retired town map. There are no missing dependencies.

Do not add a favicon-only registry entry. No asset is admitted by this record.
The default-deny guard stays in place.

## Exact evidence

| Artifact | SHA-256 | Purpose |
| --- | --- | --- |
| [Machine manifest](public-asset-inventory.json) | `5c9d8d789390ed43398ba34f77df68c20755e88728282f4ee9628dceec603e79` | All 891 builder-reachable binaries: path, hash, bytes, source/build reason, owner, registry status and path flags. |
| [Deterministic inventory](inventory-public-assets.mjs) | `74be491b6a59f79a8a58827851d15bbba96e592a9de1d9eb9e04bdaf09359da6` | Evidence-only mirror of the builder traversal; does not copy, admit or alter an asset. |
| Current builder input | `70ced8b8d93e6d52fbaf97f126ee1f6aee4a55592b98ad25b7b8c54694a05220` | `scripts/build-public-site.mjs` — already dirty; untouched. |
| Current registry input | `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927` | `operations/assets/active-asset-registry.json` — already dirty; untouched. |

The manifest is deterministic: two runs, including a separate temporary output,
were byte-identical.

## What the source set currently contains

| Status | Count | Meaning |
| --- | ---: | --- |
| `ACTIVE` | 2 | `assets/final_map/sunnyvaile-town-map-final-v5.webp` and `assets/sunnyvaile-streets/main-street-dusk.webp`; both checksums match. |
| `UNREGISTERED_DEFAULT_DENY` | 867 | Exact bytes need named admission or must be removed from the curated source set. |
| `BLOCKED_PATH_RETIRED_REJECTED_OR_CANDIDATE` | 21 | Candidate visual paths currently referenced by building/Mall sources; they must be replaced or the reference removed, never admitted as-is. |
| `RETIRED` | 1 | `assets/sunnyvaile-town-map-v9-canon.png`, referenced from `content/episodes/episode-01-cues.json`; remove/replace it. |
| historical naming warning | 1 | `assets/postcards/from-sunnyvaile/_superseded-20260708/pc-welcome-sign.png` is reached by the runtime-tree rule. It is presently default-denied, but the selector must not be treated as an admission candidate. |

The full exact candidate/retired/superseded list, with hashes and source routes,
is `restricted_source_assets` in the machine manifest. It proves the current
source set contains **21 candidate**, **1 retired**, and **1 superseded** path.
There is no path flagged `REJECTED` in this traversal.

## Smallest authority batches before any registry integration

First close the **do-not-admit batch**: the 21 candidate references, the retired
Episode 01 town-map reference, and the superseded Post Office runtime-tree
member. Their exact source reasons are in the manifest. This is correction or
replacement work by the relevant building/Media owner; Platform must not turn
these paths into `ACTIVE` registry entries.

Then request checksum-bound owner admissions only for exact retained bytes:

| Authority batch | Exact binaries currently needing a decision | Current allowed bytes |
| --- | ---: | ---: |
| Brand | 15 | 0 |
| Town Entry + Brand | 40 | 1 |
| KSVL | 111 | 0 |
| LIBRAiRY | 15 | 0 |
| LIBRAiRY + Closet | 219 | 0 |
| MAiKEOVER + Closet | 38 | 0 |
| Mme CLAi-O’s Shop | 100 | 0 |
| Post Office | 19 plus one superseded removal | 0 |
| Media / Chick Flicks | 92 | 0 |
| Route owners coordinated by Platform | 217 plus 21 candidate removals | 0 |

The manifest is the batch payload: each owner receives only its entries,
identified by `authority_owner`, with path, SHA-256, source reason and byte
size. A batch must return role ID, exact checksum, approval source/date,
replacement/supersession relation and an explicit `ACTIVE`/non-admit decision.

## Integration and independent-judge gate

1. A clean integration worktree binds the unchanged builder and the exact
   inventory hashes above.
2. Route/build owners remove or replace every restricted source path; Platform
   proves none remains in a successor inventory.
3. Asset owners provide exact admissions for retained bytes only. Brand reviews
   brand/town imagery; Media reviews episode/media inputs; each building owner
   reviews its own visible assets; Platform compiles but does not substitute
   their judgment.
4. Under a separate checksum-bound integration lock, update the registry only
   from those owner receipts, then rerun the real curated build, asset-admission
   unit test, full inventory and dependent whole-town artifact/crawl tests.
5. An independent judge reruns this inventory into a temporary file, compares
   it to the submitted manifest, verifies all registry checksum/status claims,
   confirms restricted paths are absent, and runs the rebuilt artifact gates.

No deployment, publication, credential/provider access, registry admission or
builder mutation occurred in this maker lane.

## Checks run

| Command | Result |
| --- | --- |
| `node …/inventory-public-assets.mjs` | PASS: `binary=891 ACTIVE=2 BLOCKED_PATH_RETIRED_REJECTED_OR_CANDIDATE=21 RETIRED=1 UNREGISTERED_DEFAULT_DENY=867 prohibited=21 missing=0` |
| Same command to a temporary output + `cmp` | PASS: byte-identical machine manifest. |
| `node --check …/inventory-public-assets.mjs` | PASS |
| `node scripts/test-active-asset-admission.mjs` | PASS; default-deny guard remains intact. |
| `node scripts/check-product-stewards.mjs --owner-entry platform-reliability` | PASS |

## Learning applied

BTB-346 requires complete required-set closure, not a first-error fix. This
record uses the builder's dependency rules to expose every reachable binary,
while preserving the default-deny guard and owner authority.
