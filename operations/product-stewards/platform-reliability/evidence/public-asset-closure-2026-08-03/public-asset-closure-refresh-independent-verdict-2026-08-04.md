# Public-asset closure refresh — independent verdict

**Date:** 2026-08-04  
**Role:** independent Platform source-graph/parity judge  
**Verdict:** `PASS — EXACT SOURCE GRAPH REFRESH ONLY; ASSET ADMISSION AND RELEASE HOLD`

## Decision

The refreshed inventory is a deterministic, exact mirror of the current
builder's pre-admission binary dependency graph for the tuple below. Normal
builder/inventory parity passes, the deliberate missing-binary calibration
fails, and the real builder continues to fail closed on the first reachable
default-denied Post Office asset.

This verdict accepts only the inventory refresh and parity mechanism. It does
not admit an asset, approve the remaining bytes, produce a complete public
artifact, authorize registry or runtime mutation, authorize deployment or
publication, or prove any public-origin visitor experience.

## Exact judged tuple

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
| maker receipt | `f99d9ed88484cefe3a5636a916cac513bf6eb17fa64fe3f607c25dff78d71966` |

## Independent evidence

| Check | Result |
|---|---|
| Product-steward owner entry | PASS — `platform-reliability:PASS` |
| Fresh inventory replay 1 | exit `0`; SHA `f65b22d7...`; byte-equal to canonical |
| Fresh inventory replay 2 | exit `0`; SHA `f65b22d7...`; byte-equal to replay 1 and canonical |
| Exact builder/inventory parity | PASS — `481` binaries; exact path/SHA/bytes set; references `0`; missing `0`; fail-closed admission hold preserved |
| Deliberate parity calibration | expected FAIL, exit `1`; `builder/inventory binary set divergence`; dropped tuple was `approved-assets/brand-logos/laidies-favicon-final.svg` |
| Source-narrowing test | PASS — `481` binaries; 6 families; 244 members; 262 exclusions; references/missing `0`; builder default-DENY true |
| Active-asset admission unit | PASS — active/dynamic acceptance and retired/candidate/unregistered/checksum rejection exercised |
| Real curated builder | expected FAIL, exit `1`; `public asset is not registered ACTIVE: assets/postcards/from-sunnyvaile/pc-blend-and-snap.png` |
| Builder dependency report | present; `481` binary tuples; prohibited references `0`; missing `0` |
| Builder completion report | absent, correctly confirming no completed public artifact |

## Exact graph findings

- The inventory contains `481` reachable binaries: `318 ACTIVE` and `163
  UNREGISTERED_DEFAULT_DENY`.
- Blocked paths, restricted-source assets, semantic non-admits, prohibited
  source references and missing dependencies are all `0`.
- Both the builder and inventory explicitly enumerate
  `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png`, SHA-256
  `63fdfefdd8db6ab9f42b04b60b2178ca2f38f2a67fad43a170f98ff176180f45`.
  The obsolete inventory-only Episode 04 VHS-box row is absent.
- `assets/town-characters/scenes/paige-scene.png`, SHA-256
  `aaac97b8c8802b14f6f29a18fc0c22aed2e38f24af562ba549d91d895d6eea5a`,
  is present as checksum-matched `ACTIVE` and binds the narrow NewsStand
  arrival-pane authority recorded in the registry.
- The 163 default-denied bytes remain: Referenced route owner + Platform `94`;
  Town Entry + Brand `26`; Media / Chick Flicks `19`; Post Office `11`; Brand
  `7`; KSVL `6`.

## Evidence ceiling and hold

`PUBLIC ASSET INVENTORY PASS` proves only that the current source graph has no
prohibited or missing dependencies and is mirrored deterministically. It is
not a release PASS: 163 reachable bytes remain unadmitted and the real builder
does not complete. The first observed hold remains
`assets/postcards/from-sunnyvaile/pc-blend-and-snap.png`; its current owner
record does not authorize admission or removal. Any successor requires the
separate Post Office and Brand/canon/provenance/exact-use decision and
independent visual judgment identified by the maker receipt.

No registry entry, runtime-family member, public route, provider, deployment,
publication or dispatcher state was changed in this independent judgment.
