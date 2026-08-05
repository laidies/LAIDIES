# Unused legacy style source narrowing — maker receipt

**Date:** 2026-08-03 America/Vancouver  
**Verdict requested:** independent judgment of one non-rendering asset-reference repair

## Exact candidate

| File | SHA-256 |
|---|---|
| `styles.css` | `52b8605697951a5cfab359da5b13cd63ee7a65a7eff89f25f2111de295f76217` |
| `scripts/test-unused-legacy-style-asset-references.mjs` | `b130b793f9d1612d259a796137862bc5cb4fac6fc95eebd35f5f991b19f80a51` |
| Current public-asset inventory | `bf28a4836fa13df5dd3bde342d8cdea9795e87826445615a07c39cb752ea0419` |
| Builder/inventory parity checker | `d691a827fd9836815696460323fd6278878f28bc60f35bfb93c3ccc1d618a37d` |
| Source narrowing guard | `fd56bdd315d492fa98f2c6ed83a4cdc3cbd1914b7669e2cd1cc6b94ff3d06e80` |
| Public builder | `8e8eebd94325bc98b8e50fc27d02be24b093800e78412612723a29a885160428` |
| Active registry | `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927` |

## Repair

Four CSS URL occurrences for three explicitly `CURATION_UNUSED` assets were
removed from legacy selectors that no current `index.html` or `script.js`
surface creates:

- `assets/reference-drawer-plaque.png`
- `assets/businesswomen-special-fortune-teller-v1.png` (desktop and mobile)
- `assets/dream-phone-cordless-crop.png`

The existing solid/gradient fallbacks remain, so even if an old selector is
reintroduced it does not become blank. A new guard rejects these URLs, asserts
the selectors are not current HTML/runtime UI and preserves all three
fallbacks.

## Verification and limit

- New guard PASS: four occurrences removed, zero current selectors, three fallbacks.
- Inventory/parity PASS: 621 binaries, 113 prohibited references, 82 unique paths, missing=0, exact_set=true, fail_closed=true.
- Monotonic narrowing guard PASS.
- `git diff --check` PASS.

No asset, selector, visitor feature, builder, registry or runtime-family policy
was admitted or removed. Overall public-asset closure remains HOLD.
