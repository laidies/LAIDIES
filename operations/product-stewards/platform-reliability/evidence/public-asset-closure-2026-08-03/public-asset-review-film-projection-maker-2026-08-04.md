# Public build review-film projection — maker receipt

**Date:** 2026-08-04  
**Status:** `SOURCE REPAIR VERIFIED LOCALLY — INDEPENDENT JUDGMENT REQUIRED`  
**Scope:** exclude five internal Screening Room `reviewFilm` evidence fields
from the public dependency graph without changing the internal admission
record, title holds, visitor routes, media bytes or registry.

## Exact candidate

| Artifact | SHA-256 |
|---|---|
| `scripts/build-public-site.mjs` | `47882c3413bb85a1367f023365fb537eede04bae1fe9421259d443fd0f208ef7` |
| `scripts/lib/public-screening-room-admission.mjs` | `c46678e35639b68ec47398c1a973c537ec92dabf796bfe4111966cbf02e52a82` |
| `scripts/test-public-screening-room-admission.mjs` | `eb8c3411a4cd478f16e2278628bb2b1410af90a28a74d08657ab968146920b88` |
| `inventory-public-assets.mjs` | `65bf90ccf42dca86c111f6475513392f4c4dcb2ceeee862b6849cd22fa13ca65` |
| `public-asset-inventory.json` | `434cd8b209259e3edcd64fca5777d659aa5811055b4c40e04f86e46bba14a883` |
| ordered asset tuple (`path<TAB>sha256<LF>`) | `4622e80805f63ab4c6bcb2a185eaf5da3d82fbaf72001202deb1eb399b127632` |
| `screening-room-admission.json` | `3049f29641b1d946276c6175df6dc6d22cd8a960fd91b9da09578f94477c0017` |
| active registry | `9a369aef6d4e2b0ee640e30287ea08ce77c434395562a91b2b9ac195bde7acaa` |

## Verified result

- The source admission file still retains five exact internal review films and
  their hashes/durations for private review integrity.
- The public projection removes only `reviewFilm`, `reviewFilmSha256` and
  `reviewFilmDurationSeconds` from each of the five programme records.
- The projection unit passes; its deliberate retained-review-film calibration
  fails on `trailer` as required.
- The existing Screening Room contract passes with five programmes, four
  published reading issues, zero motion films and every title still `HOLD`.
- Two fresh inventories are byte-identical at SHA-256
  `434cd8b209259e3edcd64fca5777d659aa5811055b4c40e04f86e46bba14a883`.
- The exact source graph is now 476 binaries: 318 `ACTIVE`, 158
  `UNREGISTERED_DEFAULT_DENY`, zero prohibited references and zero missing.
- The real builder dependency report contains 476 binary tuples and no review
  film. The builder still fails closed on the unchanged first Post Office hold,
  `assets/postcards/from-sunnyvaile/pc-blend-and-snap.png`.
- Exact builder/inventory parity and source narrowing pass. The parity gate's
  deliberate dropped-favicon calibration fails.

## Evidence ceiling

This repair removes five false public dependency edges. It does not admit or
delete a film, change a programme from `HOLD`, approve narration or imagery,
complete the public build, mutate the registry, deploy, publish or prove a
public-origin experience. The remaining 158 default-denied bytes require their
own exact authority or source decisions.
