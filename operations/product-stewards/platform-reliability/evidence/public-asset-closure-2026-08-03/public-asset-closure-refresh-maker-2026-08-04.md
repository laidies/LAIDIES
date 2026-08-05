# Public-asset closure refresh — maker receipt

**Date:** 2026-08-04  
**Status:** `SOURCE GRAPH CLOSED — ASSET ADMISSION REMAINS HOLD`  
**Authority:** local Platform evidence only; no asset admission, release, deploy
or publication authority

## Exact current tuple

| Input / evidence | SHA-256 |
|---|---|
| `scripts/build-public-site.mjs` | `5b1b0f7631462d92fb4567521c26a843a571ff0700b3018ffe5c73cba38c636d` |
| `operations/assets/active-asset-registry.json` | `9a369aef6d4e2b0ee640e30287ea08ce77c434395562a91b2b9ac195bde7acaa` |
| `content/episodes/screening-room-derived-editions.json` | `280cb8d7c051fd69c570335f56e5aeb45d6876defc7d33b6b07cd2d39039bb67` |
| `runtime-family-manifest.v1.json` | `a50a64ca55b0648317a66a5866591b486d49799872cdaa68fb1248e0e1a85136` |
| `content/site/sv-back-nav.js` | `4490123a7d7ea447a125244ef1453c92c3cfdea32dca7fc86b6b096e57f9dfd3` |
| `inventory-public-assets.mjs` | `7785e2f886b30be23af49d9177b513c79ffe87375df5a346fda2e11b6bf554b0` |
| `check-builder-inventory-parity.mjs` | `2ff159c1a0cb94fb66394ce63283de6220f321c04d8da18f4538a6c7b4c8e51f` |
| `test-public-asset-source-narrowing.mjs` | `e5724738a2e09728ba9e94a64cf151c5df1d07c46db16c94d983e1a37b30b8e8` |
| `public-asset-inventory.json` | `f65b22d702eb81886d3cd46e327f472c7050356cd067557513a85187e21c17d7` |
| ordered asset tuple (`path<TAB>sha256<LF>`) | `82010456f14c813260d1cffe79c663eafc84816a80da5a19fb59a240e2eeb31f` |

## Current literal result

- `481` builder-reachable binary assets.
- `318` are checksum-matched `ACTIVE` assets.
- `163` are `UNREGISTERED_DEFAULT_DENY`.
- prohibited source paths, restricted source assets, semantic non-admits,
  prohibited source references and missing dependencies are all `0`.
- The remaining default-denied set groups as: referenced route owner +
  Platform `94`; Town Entry + Brand `26`; Media / Chick Flicks `19`; Post
  Office `11`; Brand `7`; KSVL `6`.

The stored inventory had been stale at `481 / 317 / 164` and bound registry
SHA `132ec95c…`. The refresh adds the already-authorized Paige scene and removes
the inventory-only obsolete Episode 04 VHS-box traversal. Both the builder and
inventory now enumerate the exact admitted Episode 04 title-card byte instead.

## Parity repair and calibration

The builder now records every pre-admission binary as exact path, SHA-256 and
byte size in `dependency-report.json`. The parity checker compares that full
set to the inventory and treats default-DENY admission as a separate,
intentional hold rather than misreporting it as dependency drift.

- Normal parity: PASS, `481` exact binaries, references/missing `0`, admission
  hold at `assets/postcards/from-sunnyvaile/pc-blend-and-snap.png`, clean build
  `false`.
- Deliberate `PUBLIC_ASSET_PARITY_CALIBRATION=drop-builder-binary`: expected
  FAIL at binary-set divergence.
- Source-narrowing gate: PASS, deterministic canonical inventory, prohibited
  references `0`, missing `0`, builder default-DENY intact.
- Active-asset admission unit: PASS.
- Real curated builder: expected FAIL at the exact Post Office byte above.

## Authority ceiling and next action

No further registry mutation is supported by the current owner receipts. The
accepted KSVL 49-byte batch, Paige scene, Library, Closet and Mme CLAi-O
assets are already integrated. The remaining Post Office 11, printables and
other route/media/Brand assets retain their exact owner holds.

The first blocker is not a missing technical mechanism. The Post Office owner
explicitly prohibits admission of the current 11-card family, while removing
the picker would discard an approved visitor job. A successor requires a new
Post Office + Brand/canon/provenance/exact-use family decision and independent
visual judgment. The builder must continue failing closed until that authority
exists.

No registry entry, runtime-family member, public page, provider, credential,
deployment, publication or dispatcher state was changed by this refresh.
