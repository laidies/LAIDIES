# Independent admission — Visitor's Centre readiness projection v3

**Status:** ADMITTED — bounded isolated readiness-projection candidate only.

**Acceptance owner:** `visitors_centre_independent_projection_admission_20260726`, independent of `visitors_centre_readiness_projection_v3_maker`.

**Evidence time:** 2026-07-26 11:37:40 PDT (America/Vancouver), after the independent rerun.

## Exact admitted tuple

| Item | SHA-256 |
| --- | --- |
| Admitted v2 base `functional-candidate-v2/index.html` | `d138d2a18e685f3f2923f00d966e2969dce14f2e2b1fb48bb38b0547266e9573` |
| v3 `functional-candidate-v3-readiness-projection/index.html` | `d8f16d86ea71c1f81c9d57fb4e3da1ec7cb91b02900bc9e5f7202aa6e4b17a5e` |
| `receiver-integration-v1.js` | `1de4be4341d5d7b49ba87494cf2e3cb19fca246a38a1047225b09a01e7568828` |
| `readiness-semantic-fixture-v1.json` | `db799159081f4db89dabb58fc03ba713d2b0812de3efb72f51c4d4f3c4187b23` |
| `test-functional-candidate-v3.mjs` | `207588ad35b2a24ed2d66bba8036fd65677c339f16d4ba1a83159a5d66e11c04` |
| Independent current `evidence/test-result.json` | `a79f0509daf0924804898876a9f60ced0257e64263e4643ae4e5005b0308f13f` |

I recomputed the five source receipts before running the v3 suite and again
after it completed. They remained exact. I ran:

```text
node operations/design-explorations/visitors-centre-building-championship-20260726/test-functional-candidate-v3.mjs
```

Result: **PASS — 389 checks, 0 failures** in Playwright Core 1.61.1 with
headless Google Chrome 150.0.7871.187.

## Independent findings

- The test recomputes the synthetic fixture's fresh and fail-closed values
  using the real `visitorCentreSemanticReceiver()` path. Both receipts equal
  the real receiver output.
- The exact admitted v2 base receipt is asserted. The candidate retains the
  five-part arrival grammar: room/arrival, exact map, named selector, static
  17-link fallback and truthful handoff boundary.
- Fresh semantics have 17 canonical routes and `completionClaim: false` for
  every destination. The selected held destination exposes a promotion-held
  label, qualified summary/limitation and a status-check action—not a false
  completion or readiness result.
- Fail-closed semantics keep all 17 routes, label current status unavailable,
  use a generic “check current status” action and explicitly say route arrival
  is navigation, not completion.
- First-time, returning-without-Card, device-local Card and unavailable
  account-backed Card fixtures retain their stated scope. No state invents
  identity, ownership, sync or account evidence.
- The suite proves no-JS routes and orientation at 1440/390/320, 44px targets,
  reduced motion, map/directory/storage/projection recovery, selection focus
  and Escape return. I visually inspected the full desktop fresh state, mobile
  320 account-unavailable state and mobile projection-failure selected state.
- Visual presentation remains intentionally neutral and labels the Platform
  projection as a synthetic isolated-test fixture. That disclosure is visible
  but subordinate to the map and destination-selection task.

## Scores

| Dimension | Score / 20 | Reason |
| --- | ---: | --- |
| Product legibility | 18 | The arrival and equal route choices remain clear; receiver status does not displace the orientation job. |
| Accuracy / trust | 20 | Real receiver parity, explicit synthetic provenance, fail-closed behavior and no completion/readiness conflation are all directly tested. |
| Positive LAiDIES brand contribution | 17 | Keeps the map-led SUNNYVAiLE place experience intact while refusing to overstate a technical fixture as product truth. |
| UX / accessibility | 18 | Keyboard/focus/Escape, no-JS, responsive and failure evidence pass; native AT and comprehension remain unproved. |
| Technical / source integrity | 20 | Base, candidate, adapter and semantic fixture receipts are exact; fresh and fail-closed receiver outputs are independently compared. |

## Boundaries, blockers and next trigger

This admission is evidence for an isolated projection integration only. It is
not an Ali visual/experience decision, a real destination-readiness source, a
shared Platform integration, production integration, deployment/public proof,
identity proof, analytics approval, native Safari/VoiceOver proof or human
comprehension proof. The shared KSVL-tour contradiction and the previously
recorded identity, analytics and destination-authority gaps remain open.

**Evidence-backed improvement opportunity:** before any integration, replace
the versioned synthetic JSON fixture with a Control-Room-authorized, current
receiver binding and retain the same visible provenance/fail-closed treatment.
That preserves the demonstrated safety property while preventing a static local
receipt from being mistaken for current destination readiness.

**Next trigger:** a scoped Control Room integration lock plus Platform's
authorized current receiver source. An integrated candidate must then receive
a separate independent pass for native accessibility, comprehension and
public-origin behavior.

## Learning scan

No qualifying new learning was recorded. The existing prevention rule held:
bind the base and all adapter/fixture hashes, then independently recompute the
semantic receiver output and inspect the visible fail-closed state.
