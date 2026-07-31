# Shared header asset/cache binding v1 — local evidence

Status: `VERIFIED LOCALLY / RELEASE INTEGRATION PENDING`  
Evidence time: 2026-07-26 13:22:28 PDT (-0700)  
Binding ID: `SVGH-320-2026-07-26-v1-ASSET-CACHE-v1`

## Exact files

| File | SHA-256 |
| --- | --- |
| `shared-header/v1/release-binding/asset-cache-binding-v1.mjs` | `c5392086f6e54ac1372ec630df0c47bc6ec72a221a3fe416dd59de6eb62e01b6` |
| `shared-header/v1/release-binding/svgh-320-asset-cache-binding-v1.json` | `4c0e49780c7d184aa2e930e92b4a5afecc1520c37e97939d7a480e862af0dd4e` |
| `shared-header/v1/release-binding/test-asset-cache-binding-v1.mjs` | `efa77451ba0e6e71b0aa06d7de26364855b2f8981e0deb04ca795858cd93ef63` |

Detached payload SHA-256:
`9b6536bbed0df7e808764df5b5ded525f33918e1451a3f92eeec5922ae22c361`.

## Current and rollback versions

- accepted source:
  `content/site/sv-global-header.js` →
  `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`
- source-derived release key:
  `svgh-320-2026-07-26-v1-807bbe6b17ab`
- release request:
  `/content/site/sv-global-header.js?v=svgh-320-2026-07-26-v1-807bbe6b17ab`
- rollback Git commit:
  `c5d72fadc0cc873d1d1bfdabdb79a3aea9c773fb`
- rollback Git object:
  `1325f6c39e21853e952aaa8d36e74d325e651657`
- rollback source SHA-256:
  `f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93`
- rollback request:
  `/content/site/sv-global-header.js?v=rollback-c5d72fad-f500707712e1`

The validator reads the rollback bytes from the exact Git commit/object and
verifies their hash and length. A prior hash without recoverable bytes would
not pass.

## Bound accepted inputs

- Homepage:
  `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772`
- Start Here:
  `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0`
- Visitor's Centre:
  `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743`
- maker receipt:
  `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049`
- Town Entry acceptance:
  `d27ffac2229d251a1d4dc98d2921575d386ffec1f92670c3336147c960b15eb9`
- Visitor acceptance:
  `b44091060b6ec52a3f686113b08433fbd43e9e2031aa8700986e92b6851ffaba`

## Executable proof

Command:

```text
node operations/product-stewards/platform-reliability/shared-header/v1/release-binding/test-asset-cache-binding-v1.mjs
```

Result:

```text
ASSET CACHE BINDING V1 PASS binding=SVGH-320-2026-07-26-v1-ASSET-CACHE-v1 version=svgh-320-2026-07-26-v1-807bbe6b17ab rollback=rollback-c5d72fad-f500707712e1 valid=2 invalid=12 current=3 release=3 rollback=3 mutation=false
```

The suite proves deterministic/idempotent validation, detached canonical
payload sealing, exact file hashes, a source-derived version key, recoverable
rollback bytes, complete release/rollback route simulation and fail-closed
rejection of tampered seals, source/consumer hashes, stale keys, mixed route
versions, duplicate roles, half rollback state, invented Start Here
consumption and external-authority escalation.

The raw 320 gate also remains PASS with nav-right `312` and document width
`320`.

Independent Town Entry verification passed at 2026-07-26 13:25:09 PDT:

- receipt:
  `operations/product-stewards/town-entry-homepage/evidence/shared-header-asset-cache-binding-v1-independent-2026-07-26/independent-receipt.md`
- receipt SHA-256:
  `27d38ffa26eea8e0d51b10a465a5570862181750c176fe551327de754728d37a`
- independent test SHA-256:
  `6d2b73bfa7e1233508b3ffdbfea68fb81c1343fb6f0b3748b59ec96ecf3de22d`
- result:
  `PASS valid=2 adversarial=6 rollbackGitBytes=PASS idempotent=PASS mutation=false`

## Evidence-backed improvement closed

The accepted Homepage and Visitor files still request
`?v=20260715-1` even though the shared source hash changed. A date-only key can
therefore name different bytes across caches. This binding closes the contract
gap by deriving the new key from candidate ID plus source hash and rejecting
release integration until every consuming route switches atomically.

No route was changed because doing so would invalidate its existing owner
acceptance. The release owner must update Homepage and Visitor together under
an exact lock and obtain fresh affected-consumer acceptance. Start Here remains
a bound non-consumer.

## Evidence ceiling

No route, shared source, Visitor containment, provider/cache setting,
deployment or public state changed. Native Safari, VoiceOver, true zoom,
public-origin bytes and actual browser/CDN cache behavior remain unproved.
