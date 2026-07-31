# Visitor’s Centre native Safari v1 — maker evidence

**Product:** `visitors-centre`  
**Status:** VERIFIED LOCALLY; independently admitted with named native limits  
**Evidence time:** 2026-07-26 12:29:34 America/Vancouver  
**Authority used:** bounded Visitor live-route integration lock; local-only evidence work  
**Public/deploy/spend/Ali authority:** none used

## Literal output

The exact frozen Visitor route was exercised in Safari 26.5 on macOS 26.5.1.
No route, shared style, Platform, KSVL, Card or analytics source changed during
the native pass. The only new executable is an owned, local-only HTTP fixture
which serves the frozen route while returning a corrupt readiness projection.

## Frozen candidate tuple

| Path / datum | SHA-256 |
|---|---|
| `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` |
| `scripts/test-visitors-centre-contract.mjs` | `756f82553c89b946d1763b4d8b5edafa7c3f4b53f6d7356ca557efcb5c030e14` |
| `operations/product-stewards/visitors-centre/test-live-route-readiness-v1.mjs` | `a0d2ef93603538ea6ebc23b99495b7257f3ba3cc616fb0adef659fa3b00182ad` |
| projection artifact | `adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880` |
| projection payload | `3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361` |
| browser runtime | `68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e` |
| canonical destinations | `c5136958e1296c71338bdcb2eb9e271a70c6b80f3760514f9f7464d230ce7f26` |

## Native Safari observations

| Check | Observed result |
|---|---|
| Desktop, actual size | PASS — five-part arrival grammar and 17 named map controls were present in Safari’s accessibility tree. |
| 390 × 844 | PASS — Safari Responsive Design Mode reported the exact viewport; no horizontal route overflow was visible. |
| 320 × 568 | PASS — Safari reported the exact viewport and 100% responsive-mode zoom; the route stayed inside the viewport. |
| Real 200% page zoom | PASS — five Safari `Zoom In` operations from `Actual Size`; console reported `devicePixelRatio=4` against the 2× baseline, and content remained available. |
| First-time | PASS — local test keys absent; visitor-safe non-inference disclosure and current status remained present after reload. |
| Returning / no Card | PASS — `laidies_welcome_seen=true`; same visitor-safe route after reload. |
| Device-local Card | PASS — `laidies_card_username=@fixture`; same visitor-safe route after reload. |
| Account-held | PASS — `laidies_account_fixture=held`; same visitor-safe route after reload. |
| Invalid projection | PASS — corrupt projection fixture produced `fail-closed`, exactly 17 destinations, `completionClaim=false` for every destination and explicit unavailable language. |
| VoiceOver | PARTIAL NATIVE PASS — System Settings proved VoiceOver `off → on → off`; Safari exposed the full semantic route tree while on. The available bridge could not reproducibly capture VoiceOver speech or cursor movement, so that claim remains unmade. |

The three local storage keys used for the bounded state matrix were removed
after the checks. VoiceOver was restored to `off`.

## Screenshot evidence

| Evidence | SHA-256 |
|---|---|
| `evidence/native-safari-2026-07-26/safari-desktop-current.jpeg` | `38e2c060e7c1d7a9338c6412c059ec90ef11b6fbe0b7beccd336ca52ff63d4d1` |
| `evidence/native-safari-2026-07-26/safari-390x844.jpeg` | `00f7941cd0a030579628b58876dae42860b03f9c6d8fc7d360b237e87a8f2a19` |
| `evidence/native-safari-2026-07-26/safari-320x568.jpeg` | `897704095f13852f6f312704056401fd683158bf3932e6688d05eee696b4ba93` |
| `evidence/native-safari-2026-07-26/safari-desktop-200-percent.jpeg` | `f2406408dce1fd0bcc795809885621bd18d9cb566c5544ce1ae444d65c6bf4a9` |
| `evidence/native-safari-2026-07-26/safari-invalid-projection-fail-closed.jpeg` | `c8b965e3b85ee7a1dd042b3e5c9c2a2de33e7ff5951deb5f2bfb231bf6fcc900` |

The invalid-projection fixture
`native-safari-invalid-projection-server.mjs` has SHA-256
`f023a494cc8f63475fd419df52ad793129b6e1a10eb899c47d04edb8ccdb2f9a`.

## Automated re-verification

- `node scripts/test-visitors-centre-contract.mjs` — PASS.
- `node operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs` — PASS: 17 destinations, current 3, fail-closed 12, idempotency 3.
- `node operations/product-stewards/visitors-centre/test-live-route-readiness-v1.mjs` — PASS: 779 checks, zero failures, frozen hashes unchanged.
- `node scripts/check-product-stewards.mjs --owner-entry visitors-centre` — PASS.

## Observed truth, blockers and next action

Observed: the local Safari route preserves arrival/orientation/destination
selection, does not inspect or infer Card/account state, fails closed with all
17 routes, and never equates navigation with completion.

Not proved: public-origin behavior, human comprehension, or reproducible
VoiceOver speech/cursor traversal. Human comprehension remains separately
blocked on approved participants. Public proof waits for deploy authority.
Destination readiness remains with destination owners; current shared intake
has no admitted owner receipts.

Proactive improvement result: Platform independently reproduced the raw shared
header at right `333.94px` / document `334px` in a 320px viewport, while the
Visitor-owned containment passed at right `312px` / document `320px`.
Preserve the containment until the Shared Header owner passes the raw gate and
Visitor independently reaccepts the exact successor. Evidence:
`operations/product-stewards/platform-reliability/evidence-shared-header-320-regression-v1-2026-07-26.md`
(`d01c2c63e2fe1137fac7025e64fc8f26fc2f0c7c9c9d35b2a0a1a804b14d18cf`).

Independent acceptance:
`independent-acceptance-native-safari-v1-2026-07-26.md` records
`PASS_LIMITED_NATIVE_SAFARI` for this exact tuple. Its fresh 779-check result
has SHA-256
`74ed811871d2761b626deaa88ee7ffb62ca76903da2db407e329b3bead5d877f`.

Next action: Control Room records the admitted local result and retains the
named VoiceOver speech/cursor, human, owner-receipt, Shared Header and public
holds. No Ali decision is ready.
