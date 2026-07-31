# Independent Control Room review — shared-header asset/cache binding v1

**Status:** PASS at local contract scope; route version update/reacceptance and
native/public gates remain  
**Evidence time:** 2026-07-26 13:18 PDT (America/Vancouver)  
**Candidate:** `SVGH-320-2026-07-26-v1-ASSET-CACHE-v1`

## Exact reviewed tuple

| Role | Path | SHA-256 |
| --- | --- | --- |
| Runtime/validator | `operations/product-stewards/platform-reliability/shared-header/v1/release-binding/asset-cache-binding-v1.mjs` | `c5392086f6e54ac1372ec630df0c47bc6ec72a221a3fe416dd59de6eb62e01b6` |
| Sealed binding | `operations/product-stewards/platform-reliability/shared-header/v1/release-binding/svgh-320-asset-cache-binding-v1.json` | `4c0e49780c7d184aa2e930e92b4a5afecc1520c37e97939d7a480e862af0dd4e` |
| Maker test | `operations/product-stewards/platform-reliability/shared-header/v1/release-binding/test-asset-cache-binding-v1.mjs` | `efa77451ba0e6e71b0aa06d7de26364855b2f8981e0deb04ca795858cd93ef63` |
| Detached canonical payload | binding payload | `9b6536bbed0df7e808764df5b5ded525f33918e1451a3f92eeec5922ae22c361` |

## Independent verdict

**PASS — VERIFIED LOCALLY / RELEASE INTEGRATION PENDING.**

Control Room independently:

- matched the three supplied file hashes;
- recomputed the detached payload seal using an independent sorted-key
  canonicalizer;
- derived release key
  `svgh-320-2026-07-26-v1-807bbe6b17ab` from candidate ID plus accepted
  source SHA `807bbe6b…1efa`;
- read-verified exact Homepage `c437da10…72`, Start Here `a7a54e79…bc0` and
  Visitor `de8e536d…743` bytes;
- confirmed Homepage and Visitor each currently request the single old
  `/content/site/sv-global-header.js?v=20260715-1` URL while Start Here remains
  a non-consumer;
- reproduced the maker suite:
  `valid=2 invalid=12 current=3 release=3 rollback=3 mutation=false`;
- inspected fail-closed coverage for detached-seal, source/consumer checksum,
  stale version, invented consumer, duplicate role, mixed release/current
  reference, rollback record/object, release request and authority escalation;
- independently resolved Git rollback object
  `1325f6c39e21853e952aaa8d36e74d325e651657`, and matched rollback bytes
  `f5007077…1d93` / `19,496` bytes;
- recomputed the result twice with identical output; and
- confirmed every external-authority field is `false`.

## Exact evidence ceiling and next action

This PASS does **not** update `index.html` or `visitors-centre.html`, deploy,
touch a provider/public cache, remove Visitor containment, prove native Safari,
VoiceOver or true zoom, or prove public-origin/cache delivery.

The accepted routes still request the old version key. Release integration
therefore remains
`PENDING_ROUTE_VERSION_UPDATE_AND_REACCEPTANCE`.

Next: under one exact route/release lock, switch every consuming route to the
source-derived request path in one candidate artifact, rebuild it, and rerun
Homepage and Visitor acceptance. Native and public-origin/cache proof follow
separately. Roll back atomically to the recorded Git-object bytes on any
source/hash, mixed-version, native-accessibility or public-cache mismatch.

No public, deploy, spend, provider, cache-setting, route, shared-source or
Visitor-containment mutation occurred in this review.
