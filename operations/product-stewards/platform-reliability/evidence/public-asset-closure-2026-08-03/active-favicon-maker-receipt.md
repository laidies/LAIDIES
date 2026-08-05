# ACTIVE favicon source repair — maker receipt

**Made:** 2026-08-03  
**Verdict:** `PASS — exact local source repair; release remains HOLD`

## Visitor and release result

Nineteen public/source pages, the web-app manifest, the shared header and the
Verification Rulebook renderer now use the exact registry-`ACTIVE` LAiDIES
favicon instead of retired/default-denied PNG or ICO declarations. Unsupported
`apple-touch-icon` declarations were removed; no unadmitted PNG was substituted.
This does not admit any asset, weaken the default-DENY builder, deploy or
publicly verify a route.

## Bound authority and candidate

- ACTIVE SVG: `approved-assets/brand-logos/laidies-favicon-final.svg`
  SHA-256 `5ad6fd4c047142345038f8d6af54bc6d76836419d5339535685246a22827c404`
- Registry role/status: `brand.favicon` / `ACTIVE` with the same checksum.
- Homepage: `index.html`
  SHA-256 `4549bcb290406f8a180befffdb6b981acd790d58e893da50452b60a8bfde43bd`
- Manifest: `manifest.webmanifest`
  SHA-256 `872052aa15ac3bdf73d0ae692b763189980fe8c47a9f3a87875398311883869e`
- Shared header: `content/site/sv-global-header.js`
  SHA-256 `9403505bca7794d155cac749066cb07266c2819ee26d943f7ce1ae65c4b42c5c`
- Renderer: `scripts/render-eco01-verification-rulebook.mjs`
  SHA-256 `5647861f59c05aa308e05514e72cd07caca8d621a6ce2dcaedc1c78431fdff9c`
- Regression test: `scripts/test-active-favicon-references.mjs`
  SHA-256 `b71e6c704e60ebb8971d980a690d1d2e1da02081a4ca413c280cb31dab216cbf`
- Current inventory: `public-asset-inventory.json`
  SHA-256 `4a3d73e7778a503feab852cef76fd9041956d277d3c19dced45da55b3848128b`

The regression test contains the exact 19-page candidate list and fails if any
page returns to the retired logo-square, favicon PNG family, root ICO or an
unadmitted touch icon. The manifest is constrained to one SVG `any` member;
the shared header and renderer must use the same ACTIVE path and the asset bytes
must match the registry checksum.

## Checks

- `node scripts/test-active-favicon-references.mjs` — PASS, pages=19,
  manifest_icons=1, exact checksum matched.
- `node …/inventory-public-assets.mjs` — expected HOLD with 621 reachable
  binaries, ACTIVE=2, UNREGISTERED_DEFAULT_DENY=619, prohibited references=123,
  missing=0.
- `node …/check-builder-inventory-parity.mjs` — PASS,
  `prohibited_references=123 exact_set=true missing=0 fail_closed=true`.
- `node scripts/build-public-site.mjs` — exits without packaging a release and
  reports the same 123 prohibited references. The pre-repair count was 141;
  this bounded repair removed 18 prohibited favicon references.
- `git diff --check` on the candidate — PASS.

## Gate

A different judge must inspect the exact page set, registry/asset identity,
manifest semantics, generator non-regression and builder/inventory parity.
Overall public-asset closure remains `HOLD`; the remaining 123 references still
require product-safe removal or checksum-bound Brand/product authority.
