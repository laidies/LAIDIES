# Independent receipt — SVGH asset/cache binding v1

**Reviewer:** Town Entry/Homepage consumer owner  
**Evidence time:** `2026-07-26T13:25:09-07:00`  
**Verdict:** `PASS — VERIFIED LOCALLY / RELEASE INTEGRATION PENDING`  
**Mutation:** none outside this independent evidence directory.

## Exact reviewed inputs

- module SHA-256:
  `c5392086f6e54ac1372ec630df0c47bc6ec72a221a3fe416dd59de6eb62e01b6`
- binding JSON SHA-256:
  `4c0e49780c7d184aa2e930e92b4a5afecc1520c37e97939d7a480e862af0dd4e`
- detached payload SHA-256:
  `9b6536bbed0df7e808764df5b5ded525f33918e1451a3f92eeec5922ae22c361`
- maker test SHA-256:
  `efa77451ba0e6e71b0aa06d7de26364855b2f8981e0deb04ca795858cd93ef63`
- accepted shared source:
  `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`

Accepted consumer bytes match exactly:

- Homepage `index.html`:
  `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772`
- Start Here `start-here.html`:
  `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0`
- Visitor's Centre `visitors-centre.html`:
  `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743`

The candidate receipt and both independent consumer-acceptance receipts also
match the hashes bound by the JSON.

## Independent result

Maker test:

`ASSET CACHE BINDING V1 PASS ... valid=2 invalid=12 current=3 release=3
rollback=3 mutation=false`

Independent test:

`INDEPENDENT ASSET CACHE BINDING PASS ... valid=2 adversarial=6
rollbackGitBytes=PASS idempotent=PASS mutation=false`

The independent lane verified:

- the detached payload seal covers canonical payload bytes and is
  non-circular;
- the release version key derives from candidate ID plus accepted source
  checksum and changes with source checksum;
- exact Homepage, Start Here and Visitor route hashes;
- Start Here remains a non-consumer and cannot acquire an invented header
  reference;
- the current two consuming routes both intentionally remain on
  `v=20260715-1`;
- deterministic release/rollback rewrites and mixed-version rejection;
- missing, stale, resealed-invalid, unsealed-tampered and authority-escalated
  records fail closed;
- rollback object identity, bytes, length and checksum from Git;
- repeat validation is idempotent; and
- the binding grants no deploy, public-cache, provider-settings or Visitor
  containment authority.

## Ceiling and next action

This receipt accepts only the local binding contract. It does **not** accept a
route update, cache delivery, public origin, native Safari/VoiceOver/true zoom,
deployment or rollback execution.

Next action is held with Platform/Control Room: authorize an atomic route
version update for the two real consumers, preserve Start Here non-consumption,
then reseal/reaccept the changed route hashes before any deploy or public-cache
claim.

