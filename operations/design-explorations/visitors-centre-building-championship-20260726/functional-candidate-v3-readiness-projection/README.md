# Visitor's Centre functional candidate v3 — readiness projection

Status: `LOCAL CANDIDATE — NOT INTEGRATED / NOT DEPLOYED / NOT PUBLIC`

This candidate is mechanically generated from the independently admitted v2 HTML
(`d138d2a18e685f3f2923f00d966e2969dce14f2e2b1fb48bb38b0547266e9573`).
The build stops if that base hash changes.

`build-functional-candidate-v3.mjs` invokes Platform's real
`visitorCentreSemanticReceiver()` and writes a labelled synthetic fresh/fail-closed
fixture. `receiver-integration-v1.js` consumes those semantics without taking
ownership of Platform validation or destination readiness. The v2 five-part
arrival grammar, map geometry, static 17-route no-JS fallback, visitor-state
fixtures, focus/Escape behavior and visually neutral presentation remain intact.

Run:

```sh
node operations/design-explorations/visitors-centre-building-championship-20260726/build-functional-candidate-v3.mjs
node operations/design-explorations/visitors-centre-building-championship-20260726/test-functional-candidate-v3.mjs
```

`?failure=projection` proves the receiver's 17-route generic fail-closed journey.
No shared file, live route, deployment or publication is changed.
