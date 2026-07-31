# Maker evidence — Visitor's Centre live-route readiness integration

> **SUPERSEDED / REJECTED BY ALI:** Technical evidence only. The
> white-page/boxed-module front-desk/map/directory functional base is not an
> accepted Visitor’s Centre experience. See
> `ALI-DECISION-reject-functional-base-2026-07-26.md`.

**Product/system ID:** `visitors-centre`  
**Status:** `VERIFIED LOCALLY — INDEPENDENT ROUTE ACCEPTANCE RUNNING`  
**Evidence time:** 2026-07-26 12:00:04 PDT (America/Vancouver)

## Literal output

Under the bounded Control Room live-route lock, only
`visitors-centre.html`, its route contract test and building dossier/evidence
were edited.

The route now:

- loads the shared browser runtime and checksum-bound current projection;
- passes exact payload SHA-256
  `3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361`
  as `expectedPayloadSha256`;
- consumes `visitorCentreSemanticReceiver()`;
- exposes the current all-null owner intake as 17 owner-receipt-pending held
  routes, never as completed destinations;
- falls closed to 17 generic named routes on missing, corrupt, incomplete,
  checksum-mismatched or unavailable runtime input;
- removes all manually embedded destination states, summaries and limitations;
- preserves arrival room, exact map/equal names, Card/account non-inference,
  one status-first reveal and optional bounded tour/trailer/postcard handoffs;
- removes the copied postcard composer, first-15 route, explainer and founder
  stack; and
- keeps `completionClaim=false`, focus/Escape and no-JS parity.

## Frozen maker tuple

| Item | SHA-256 |
| --- | --- |
| `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` |
| `scripts/test-visitors-centre-contract.mjs` | `756f82553c89b946d1763b4d8b5edafa7c3f4b53f6d7356ca557efcb5c030e14` |
| `test-live-route-readiness-v1.mjs` | `a0d2ef93603538ea6ebc23b99495b7257f3ba3cc616fb0adef659fa3b00182ad` |
| maker result snapshot | `0c35cd0dd4498b196eefbf3d497306bb61deebd3f43bd5620cf8b3197f21754e` |
| shared projection artifact | `adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880` |
| shared browser runtime | `68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e` |
| shared canonical crosswalk | `c5136958e1296c71338bdcb2eb9e271a70c6b80f3760514f9f7464d230ce7f26` |

The maker snapshot is
`evidence/live-route-readiness-v1/maker-test-result.json`.

## Tests

```text
node scripts/test-visitors-centre-contract.mjs
PASS canonical_destinations=17 projection_id=readiness-shared-fail-closed-v1

node operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs
PASS destinations=17 current=3 fail_closed=12 idempotency=3 schema=draft2020

node operations/product-stewards/visitors-centre/test-live-route-readiness-v1.mjs
PASS checks=779 failures=0
```

Rendered evidence covers 1440, 390 and 320 widths; four first/returning/Card
storage conditions with one invariant non-inference state; all 17 reveal
semantics; no-JS; missing/corrupt/incomplete/checksum/runtime/directory
failures; 44px desktop map targets; reduced motion; text spacing; focus and
Escape return; responsive overflow; and normal/fail-closed screenshots.

## Observed versus unproved

Observed: exact receiver binding, 17 current held routes, 17-route failure
recovery, no embedded owner prose, route-only completion boundary and local
desktop/mobile runtime behavior.

Unproved: owner-backed receipts (the current intake is all-null), native
Safari/VoiceOver/zoom, human comprehension, deployment, rollback or public
origin.

## Collision truth

At 12:00 PDT the targeted steward preflight briefly observed an unrelated
concurrent shared-state inconsistency:
`town-entry-homepage active item must say RUNNING`. It was not edited here.
The final rerun at 12:07:28 PDT passed:
`owner_entry_product=visitors-centre:PASS`.

## Proactive improvement

At 320px, the route composition fit but the injected shared header extended to
333.94px. A route-local containment rule now passes. Functionality & Platform
should apply the same 320px header test to the shared header itself so every
route does not need a local repair. No shared header file changed here.
