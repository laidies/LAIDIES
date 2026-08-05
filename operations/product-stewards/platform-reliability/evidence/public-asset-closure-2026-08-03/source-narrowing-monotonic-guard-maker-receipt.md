# Public-asset source narrowing monotonic guard — maker receipt

**Date:** 2026-08-03 America/Vancouver  
**Verdict requested:** independent judgment of one test-only operational repair

## Exact evidence

| File | SHA-256 |
|---|---|
| `test-public-asset-source-narrowing.mjs` | `fd56bdd315d492fa98f2c6ed83a4cdc3cbd1914b7669e2cd1cc6b94ff3d06e80` |
| `public-asset-inventory.json` | `6ee1be0e545542f38eacc22968bddfd952145a17c7ebf60046d5430e4e7098be` |
| `check-builder-inventory-parity.mjs` | `d691a827fd9836815696460323fd6278878f28bc60f35bfb93c3ccc1d618a37d` |
| `scripts/build-public-site.mjs` | `8e8eebd94325bc98b8e50fc27d02be24b093800e78412612723a29a885160428` |
| `operations/assets/active-asset-registry.json` | `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927` |

## Repair and proof

The canonical narrowing test was stale: it demanded the historical exact
snapshot of 624 binaries, 173 prohibited references and 118 unique prohibited
paths, so genuine later reductions failed the test. It now fails on regression
above those accepted ceilings while its deterministic inventory replay still
requires byte-for-byte equality with the current evidence and the builder
error must report that same current count.

`node .../test-public-asset-source-narrowing.mjs` now PASSes at 621 binaries,
116 prohibited references and 85 unique prohibited paths. Builder default-DENY,
registry identity, six exact runtime families, exclusion hashes, semantic
non-admission, fail-closed build behavior and missing=0 assertions are unchanged.

## Scope

Test-only. No asset was admitted, removed, copied or published; builder,
registry and runtime-family policy are unchanged. Overall public-asset closure
remains HOLD.
