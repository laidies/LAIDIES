# ACTIVE canonical town-map source repair — maker receipt

**Date:** 2026-08-03 America/Vancouver  
**Scope:** two exact source substitutions to the already ACTIVE canonical map

## Exact candidate

| File | SHA-256 |
|---|---|
| `content/episodes/episode-01-cues.json` | `73b308d3f9f628557147706daeb804eba21e29de4ace74fbc18101f177bacc95` |
| `content/site/sv-you-are-here.js` | `e799c643122a03279eff4e6c843c1cf1cdad40567c69f0b0bb9eca9484f7711b` |
| `scripts/test-active-town-map-references.mjs` | `90e11007de5c2c8ebfea9a7239b966b428374e3a29cfcbfc87a2b3c62b90697f` |
| `operations/assets/active-asset-registry.json` | `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927` |
| `operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/public-asset-inventory.json` | `2940439211523b980ec775998b166d054ab093daf1cf3c637e94eeec5c238dfa` |
| `operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/check-builder-inventory-parity.mjs` | `d691a827fd9836815696460323fd6278878f28bc60f35bfb93c3ccc1d618a37d` |

The ACTIVE asset itself is
`assets/final_map/sunnyvaile-town-map-final-v5.webp`, SHA-256
`d9b3404df907fddef31b6092f14cd9fba55e48115aeaa5ec564a60b691a917b0`.

## Repair

- Episode 01's Welcome cue now uses the ACTIVE `town.canonical-map` instead of
  the registry-retired v9 map.
- The shared You Are Here modal's defensive fallback now uses that same ACTIVE
  map instead of the unregistered legacy `sunnyvaile-town-map.png`.

## Verification

- `node scripts/test-active-town-map-references.mjs` — PASS and exact ACTIVE
  bytes match the registry checksum.
- `node scripts/check-media-defect-fixtures.mjs` — PASS, including the
  false/old-map fail-closed fixture.
- Episode 01 cue JSON parse and shared map JS syntax — PASS.
- public-asset inventory — expected HOLD, current cumulative 621 reachable,
  ACTIVE=2, UNREGISTERED=619, missing=0 and 119 prohibited references.
- builder/inventory parity — PASS, `exact_set=true`, `missing=0`,
  `fail_closed=true`.
- `git diff --check` — PASS.

## Boundary

This does not accept Episode 01's film, change cue timing/copy, regenerate the
map, admit a new asset, weaken the registry/builder, create a release candidate,
deploy or prove public playback. The shared inventory also includes the
separate current-wordmark narrowing; its cumulative count is not attributed
solely to this repair. Opening-day media remains HOLD.

## Independent judge request

Verify exact hashes and direct two-path substitution, registry role/status and
asset checksum, rerun all targeted checks and reject any change beyond the two
source paths or any weakening of the retired-map/default-DENY rules.
