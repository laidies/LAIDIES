# Current wordmark source narrowing — maker receipt

**Date:** 2026-08-03 America/Vancouver  
**Authority:** D-2026-07-27-073 and current Brand wordmark authority  
**Scope:** remove retired image forcing from the global stylesheet; retain the live Jost wordmark

## Exact candidate

| File | SHA-256 |
|---|---|
| `styles.css` | `2f8ef610c25e0ee7adb1c3c55ad2c270354e22ab2da9891ddc51aefb7f924031` |
| `content/site/sv-global-header.js` | `9403505bca7794d155cac749066cb07266c2819ee26d943f7ce1ae65c4b42c5c` |
| `scripts/test-current-wordmark-authority.mjs` | `3613c2fa6b39877b1d8457adb8c7a12de4e43946e49e03a4df9db6d2b16ff960` |
| `operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/public-asset-inventory.json` | `2940439211523b980ec775998b166d054ab093daf1cf3c637e94eeec5c238dfa` |
| `operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/check-builder-inventory-parity.mjs` | `d691a827fd9836815696460323fd6278878f28bc60f35bfb93c3ccc1d618a37d` |

## Repair

Three `content: url(...)` declarations in `styles.css` no longer override
page/header imagery with the retired `laidies-logo-header-approved-v6.png` or
`laidies-logo-masthead-approved-v3.png` files. The shared global header remains
the authoritative deterministic live Jost wordmark with accented `A`, dotless
`ı` and separate i-dot.

## Verification

- `node scripts/test-current-wordmark-authority.mjs` — PASS.
- `node scripts/test-nav-auth-state.mjs` — PASS.
- deterministic public-asset inventory — expected HOLD, 621 reachable,
  ACTIVE=2, UNREGISTERED=619, missing=0; the current cumulative prohibited
  source-reference count is 119. Direct inventory inspection confirms that
  neither retired wordmark path remains in the global stylesheet traversal.
- builder/inventory parity — PASS, `exact_set=true`, `missing=0`,
  `fail_closed=true`.
- `git diff --check` — PASS.

## Boundary

No image or logo is admitted, generated or deleted. The default-DENY builder
and registry are unchanged. This does not accept every page masthead, repair
unreachable historical magazine files, create a release candidate, deploy or
prove public rendering. Overall public-asset closure remains HOLD.

The shared inventory was regenerated after a separate canonical-town-map
source repair, so its cumulative 119 count is not attributed solely to this
wordmark change. The wordmark delta is established by the exact three-line
stylesheet deletion and the two retired paths' absence from the inventory.

## Independent judge request

Verify the exact hashes and three-line stylesheet deletion, independently
confirm D-073's current wordmark authority, rerun both targeted tests and
inventory parity, and reject if the source falls back to either retired image
or if the default-DENY boundary weakens.
