# Control Room handoff — Brand sequence stop and header consumer hold

**Evidence time:** 2026-07-26T12:59:41-0700  
**Status:** RECOVERY

## Literal output

- Stopped Visitor-owned broader visual production under Ali's sitewide-Brand-
  first sequence ruling.
- Recorded the governing boundary in
  `ALI-SEQUENCE-sitewide-brand-first-2026-07-26.md`.
- Reconciled `state.json`, `backlog.md`, `OPERATING-SPEC.md` and
  `REPLACEMENT-EXPERIENCE-BRIEF-2026-07-26.md`.
- Labelled all pre-ruling visual work as unadmitted Brand-championship input
  only in
  `evidence/replacement-visual-program-2026-07-26/PROVENANCE-AND-SEQUENCE-HOLD.md`.
- Independently returned HOLD on shared header
  `SVGH-320-2026-07-26-v1` because its supplied immutable receipt checksum did
  not bind.

## Exact header tuple

- shared source `content/site/sv-global-header.js`:
  `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`
  — match;
- frozen Visitor route `visitors-centre.html`:
  `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743`
  — match;
- expected receipt:
  `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049`;
- observed receipt:
  `1a36e936a35558bc2297a35090fabc63825e750d7d260b641bcf18bca1c94370`
  — mismatch.

The mismatched maker receipt's behavior was not independently admitted or
rerun. The route-local containment remains in place.

## Tests and evidence

- `node scripts/check-product-stewards.mjs --owner-entry visitors-centre`:
  PASS;
- `state.json`: valid JSON;
- independent header report:
  `independent-consumer-acceptance-shared-header-svgh-320-v1-2026-07-26.md`;
- no shared/live source test rerun after the binding failure.

## Locks, dependencies and acceptance owners

- Visual continuation depends on the sitewide Brand direction and an explicit
  bounded instruction from Brand & Experience or Control Room.
- Header reacceptance depends on Platform resealing the exact receipt or
  supplying its correct immutable checksum.
- Ali owns sitewide Brand direction; Brand & Experience and Control Room own
  the bounded continuation; an independent Visitor consumer owns successor
  header acceptance.
- No shared/live integration lock was exercised.

## Next trigger

1. Brand & Experience or Control Room returns the sitewide Brand direction for
   application to the Visitor experience/functionality/spec.
2. Separately, Platform returns a resealed exact header receipt for a fresh
   consumer acceptance.

## Authority truth

No public, deploy, publication, spend, shared-system, global-style or Ali
approval authority exists for a Visitor replacement. The Ali-rejected page
model remains rejected and is not revived by the header check.
