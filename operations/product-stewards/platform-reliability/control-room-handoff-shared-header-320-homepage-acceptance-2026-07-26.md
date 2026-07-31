# Control Room handoff — shared header Homepage acceptance

Status: `HOMEPAGE + VISITOR ACCEPT LOCALLY; RELEASE INTEGRATION INCOMPLETE`  
Verified: 2026-07-26 12:59:09 PDT (-0700)  
Candidate: `SVGH-320-2026-07-26-v1`

Town Entry independently accepted the exact frozen Homepage/Start Here consumer pair. Platform independently rechecked the supplied hashes against the working tree and durable evidence; all match.

Canonical acceptance state:
`shared-header/v1/shared-header-320-consumer-acceptance-state-v1-2026-07-26.json`

Platform evidence:
`evidence-shared-header-320-homepage-acceptance-receipt-2026-07-26.md`

The shared source SHA remains `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`. No source, route, deploy or public mutation occurred in this receipt turn.

Visitor's 12:59:41 PDT HOLD compared the checksum for the JSON maker receipt to the separate Markdown evidence path. Direct verification shows:

- `shared-header/v1/shared-header-320-repair-candidate-v1-2026-07-26.json` → `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049`
- `evidence-shared-header-320-repair-candidate-v1-2026-07-26.md` → `1a36e936a35558bc2297a35090fabc63825e750d7d260b641bcf18bca1c94370`

Both are unchanged and already separately listed in the maker handoff. The HOLD remains recorded. A corrected fresh Visitor review then ACCEPTED at 13:05:27 PDT:

- acceptance evidence SHA-256: `b44091060b6ec52a3f686113b08433fbd43e9e2031aa8700986e92b6851ffaba`
- raw gate: PASS, nav-right `312`, document `320`
- consumer matrix: PASS across 3 routes, JS/no-JS, keyboard/Menu/Escape/focus, reduced motion, 390/1440 and 320/200%-proxy

The evidence rerun regenerated the derived `matrix-result.json`, changing it from maker hash `1bf8f531…e4c7c` to fresh-run hash `b71e5237…35fc`. Candidate source, routes, receipts and test scripts did not change. Platform records both values and does not describe the derived evidence as immutable.

Remaining gates:

1. A separately authorized asset/cache version binding for the source and accepted consumer artifacts.
2. Native Safari/VoiceOver/true-zoom proof.
3. Public-origin and cache-delivery verification.
4. A separate Visitor route lock and successor acceptance before removing route-local containment.

Any source or bound consumer hash change requires resealing. Aggregate measurement provider delivery remains `BLOCKED` and was not touched.

Next action: Control Room defines the checksum-bound asset/cache release tuple. Do not call the shared integration complete or remove Visitor containment until the remaining gates pass.
