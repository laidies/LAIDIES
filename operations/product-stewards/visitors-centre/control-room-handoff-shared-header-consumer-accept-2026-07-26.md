# Control Room handoff — shared-header Visitor consumer ACCEPT

**Evidence time:** 2026-07-26T13:05:27-0700  
**Status:** INDEPENDENT CONSUMER ACCEPT

Platform's correction established that the original mismatch was a path
association error, not changed bytes. The earlier HOLD report remains
preserved as the truthful result of the first submitted path association.

## Corrected immutable tuple

- JSON maker receipt:
  `operations/product-stewards/platform-reliability/shared-header/v1/shared-header-320-repair-candidate-v1-2026-07-26.json`
  — `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049`;
- separate Markdown evidence:
  `operations/product-stewards/platform-reliability/evidence-shared-header-320-repair-candidate-v1-2026-07-26.md`
  — `1a36e936a35558bc2297a35090fabc63825e750d7d260b641bcf18bca1c94370`;
- shared source:
  `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`;
- frozen Visitor route:
  `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743`.

## Independent tests

- raw 320 gate: PASS, nav-right 312px, document width 320px;
- consumer matrix: PASS, 3 routes, 9 JavaScript matrices, 3 no-JS
  matrices, keyboard Menu activation, Escape close, focus retention, reduced
  motion, 390/1440 parity and 320/200%-reflow proxy;
- owner entry: PASS;
- `state.json`: valid.

The evidence-mode rerun regenerated its derived matrix result with SHA
`b71e5237104bbc2d5659390a9344c597ce19ca46ce811bceb932b25c371935fc`.
The candidate source, route, receipts and test scripts remained unchanged.

Independent report:
`independent-consumer-acceptance-shared-header-svgh-320-v1-corrected-2026-07-26.md`
— `b44091060b6ec52a3f686113b08433fbd43e9e2031aa8700986e92b6851ffaba`.

## Boundaries and next trigger

This ACCEPT covers only shared-header behavior for the frozen Visitor
consumer. It does not revive or validate Ali's rejected Visitor experience.
The route-local containment remains. Removal requires a separate Visitor route
lock and independent acceptance of the exact successor.

Control Room may reconcile this receipt with the other named consumer receipts.
No deploy, public, publication, spend, native Safari/VoiceOver, destination
readiness or Ali visual authority exists.
