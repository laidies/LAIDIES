# Independent consumer acceptance — shared header SVGH-320-2026-07-26-v1 (corrected binding)

**Verdict:** **ACCEPT — checksum-bound shared-header behavior against the frozen Visitor route.**

This is a fresh review. The earlier HOLD report remains accurate for its
mistaken Markdown-path association and is not modified.

**Acceptance owner:** `visitors_centre_independent_shared_header_consumer_acceptance_20260726`.

## Corrected exact tuple

| Artifact | SHA-256 | Result |
| --- | --- | --- |
| Machine receipt `shared-header/v1/shared-header-320-repair-candidate-v1-2026-07-26.json` | `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049` | PASS |
| Separate Markdown evidence | `1a36e936a35558bc2297a35090fabc63825e750d7d260b641bcf18bca1c94370` | PASS |
| Shared source `content/site/sv-global-header.js` | `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa` | PASS |
| Frozen Visitor route `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` | PASS |
| Raw 320 gate test | `faec28899a0477d0039c9cc4cdc62641ea7671be9da4dbe27558e5125db1f047` | PASS |
| Consumer matrix test | `4aec9082fa1beb640ce40b1ec545c2658e426824a2a119bdc1550e7f55a5ddff` | PASS |

## Independent result

- `test-shared-header-320.mjs --gate` passed. Raw shared-header and frozen
  Visitor geometry both measure nav-right **312px** with document width
  **320px** at a 320px viewport.
- `test-shared-header-consumer-matrix.mjs --gate --evidence` passed:
  3 routes; 9 JavaScript matrices; 3 no-JS matrices; keyboard Menu activation,
  Escape close and focus retention; reduced motion; unchanged labels; and the
  320px/200%-reflow proxy.
- Visitor 390 and 1440 parity passed in the matrix. I inspected the fresh
  Visitor 390 capture: LAiDIES, Account status, Join and Menu are visible,
  contained and legible; the arrival content is unchanged.
- The matrix rerun regenerated its derived result receipt at
  `shared-header/v1/evidence-candidate/matrix-result.json` with current SHA-256
  `b71e5237104bbc2d5659390a9344c597ce19ca46ce811bceb932b25c371935fc`.
  The fixed candidate inputs above remained unchanged.

## Boundaries

This ACCEPT concerns only the shared-header candidate's consumer behavior for
the frozen Visitor route. It does **not** revive, validate or reconsider the
Ali-rejected Visitor page model. It does not authorize deployment, public
verification, route-content approval, native Safari/VoiceOver claims, or any
destination/readiness claim.

The Visitor route-local containment must remain. Its removal requires a
separate route lock and a new independent route acceptance of the exact
successor, even though the shared component now passes its raw 320px gate.

## Next trigger

Control Room may reconcile this consumer receipt with the other named consumer
owner receipts. A separately locked Visitor route change is required before
any local-containment deletion; afterward, rerun the route's complete
acceptance and remaining native/human/public gates.
