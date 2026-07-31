# Independent route acceptance — Visitor's Centre live-route readiness v1

> **SUPERSEDED / REJECTED BY ALI:** Preserve this report only as technical
> evidence. It does not admit the experience or authorize integration,
> promotion, deploy or public treatment. See
> `ALI-DECISION-reject-functional-base-2026-07-26.md`.

**Status:** VERIFIED LOCALLY — **ADMITTED** for the exact Control-Room-locked
local route integration. No deployment, publication or Ali owner-experience
approval was used.

**Acceptance owner:** `visitors_centre_independent_route_acceptance_20260726`,
independent of `visitors_centre_live_route_readiness_v1_maker`.

**Evidence time:** 2026-07-26 12:02:25 PDT (America/Vancouver), after the
independent browser rerun.

## Exact binding

| Input | SHA-256 |
| --- | --- |
| `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` |
| `scripts/test-visitors-centre-contract.mjs` | `756f82553c89b946d1763b4d8b5edafa7c3f4b53f6d7356ca557efcb5c030e14` |
| `test-live-route-readiness-v1.mjs` | `a0d2ef93603538ea6ebc23b99495b7257f3ba3cc616fb0adef659fa3b00182ad` |
| Projection artifact | `adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880` |
| Projection payload | `3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361` |
| Browser runtime | `68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e` |
| Canonical crosswalk | `c5136958e1296c71338bdcb2eb9e271a70c6b80f3760514f9f7464d230ce7f26` |
| Current independent live result | `7e13ed10cee80a4f4c45bc0c6202d16d1febaf357e955e3b7bb6e701e7907112` |

All supplied frozen hashes matched before execution and again after execution.
The maker result checksum `0c35…754e` was replaced by the independently
generated, current `7e13…7112` result receipt above.

## Independent test evidence

| Command | Result |
| --- | --- |
| `node scripts/test-visitors-centre-contract.mjs` | PASS — 17 canonical destinations; checksum-bound projection payload; arrival grammar, receiver binding, no-JS parity, identity non-inference, focus recovery and handoff truth. |
| `node operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs` | PASS — 17 destinations; current 3, fail-closed 12, idempotency 3. |
| `node operations/product-stewards/visitors-centre/test-live-route-readiness-v1.mjs` | PASS — 779 checks, 0 failures, Playwright Core 1.61.1 / headless Chrome 150.0.7871.187. |

I inspected full desktop normal and mobile runtime-fail-closed screenshots.
The desktop retains the room/map/directory/handoff arrival grammar. The mobile
failure render shows `Current status unavailable`, preserves the canonical
FAiRY route with a “check current status” action, and states that route arrival
is navigation—not completion.

## Acceptance findings

- The live route has removed the old embedded destination state, summary and
  limitation attributes; the browser receives the checksum-bound projection.
- The current all-null owner intake renders every one of the 17 destinations
  as **held pending owner receipts**. This is truthful containment, not a claim
  that an owner has admitted a destination.
- Fresh and missing/corrupt/incomplete/checksum/runtime fail-closed cases keep
  all 17 generic status-check routes and `completionClaim=false`.
- First-time, returning, device-local Card and account fixture conditions all
  retain the visible non-inference boundary: no Resident Card, account, name,
  ownership, sign-in, sync or cross-device state is inspected or inferred.
- The full suite proves no-JS parity, desktop/390/320 reflow, 44px map targets,
  reduced motion, text-spacing resilience, directory fallback, focus to the
  destination action and Escape return to the select.

| Dimension | Score / 20 |
| --- | ---: |
| Product legibility | 19 |
| Accuracy / trust | 20 |
| Positive LAiDIES brand contribution | 18 |
| UX / accessibility | 18 |
| Technical / source integrity | 20 |

## Remaining blockers and improvement

This route-level admission is neither a destination-readiness admission nor a
release approval. All 17 destinations await authoritative, admitted owner
receipts. Native Safari/VoiceOver, human comprehension and public-origin proof
also remain open.

The targeted owner-entry preflight currently reports the unrelated concurrent
blocker **“town-entry-homepage active item must say RUNNING.”** It was not
modified and does not invalidate this exact route-level result.

**Proactive improvement:** have Control Room admit receipt-backed destination
statuses in small, independently bound batches. The route already proves that
the conservative all-held state is safe; batch admission will add useful
destination differentiation without reintroducing manually duplicated,
potentially stale Centre prose.

The machine-readable receipt is
`operations/product-stewards/visitors-centre/ADMISSION-live-route-readiness-v1-2026-07-26.json`.

## Learning scan

No qualifying new learning was recorded. The applicable prevention rule held:
bind route, tests, projection, payload, runtime and crosswalk; rerun the real
failure matrix; and judge the visible fail-closed result rather than a passing
checksum alone.
