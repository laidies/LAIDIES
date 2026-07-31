# SUNNYVAiLE High Wave 2 — independent successor rejudge

**Verdict:** **ACCEPT — exact bounded local candidate successor only**  
**Reviewed:** 2026-07-27 (America/Vancouver)  
**Predecessor HOLD:** `independent-review-building-wave-2-candidate-2026-07-27.md`  
**Scope:** exact successor under `operations/design-explorations/building-wave-2/sunnyvaile-high/`. Judge-only; no candidate, production, shared-state, route, asset or release mutation.

## Exact accepted tuple

| Input | SHA-256 |
| --- | --- |
| Maker evidence | `4fb7da3e186f19e3449c9d5f700833be4289531862c960e677382ce799897023` |
| `index.html` | `166b05d5d81565e4d578f978f3b54ea111dcb3d9a3461513d670f368a0a53a60` |
| `high-candidate.css` | `79eb6350e9989bbee8c6d716a26970c4a44dd9579df389a2762e67a741aa7dd5` |
| `high-candidate.js` | `2c0cceb0de96968aabd4c7b922070ec782ecc050e7a55178a21a4012da37cd9d` |
| `test-candidate.mjs` | `f5a37705e8034e399f0770cad3aacceda454b6dfb76910a03a2bf6bd57902e7e` |

The predecessor `index.html` is byte-identical. The successor changes only the candidate CSS/behavior/test/README needed to make room closure and focus return real.

## Independent successor checks

- Deterministic suite reproduces: `SUNNYVAILE HIGH CANDIDATE PASS rooms=8 actions=7 truthful-boundaries=8 responsive=3 keyboard=1 initial-hidden=4 close-focus-return=1`.
- Product-steward owner entry and full steward checks pass.
- At initial load at 1440×900, 390×844 and 320×900, all four room panels have `hidden=true`, computed `display:none`, and zero-size rectangles.
- Real Tab traversal at all three widths visits only the ten intended visible controls, then returns to the document/skip link. It never enters A/V, Registrar, Yearbook or Book Fair panel links while those panels are closed.
- With reduced motion, Enter on `Take a seat` opens only `#av-room`, computes it as `display:grid`, sets `aria-expanded=true`, leaves the other three panels hidden, and transfers focus to `#av-room`.
- Activating `Take a seat` again closes the room, restores `display:none`, sets `aria-expanded=false`, and returns focus to the `Take a seat` trigger.
- At all three widths, body/document `scrollWidth` equals viewport width; all five image uses resolve with positive natural width; and no page or console error occurs.
- The 390px initial scene now ends after the eight-door corridor and footer, proving the previously leaked room panels are absent.
- Forced class-register `503` retains the exact independent-route recovery copy. Corrupt local quiz stores fail to the usable no-attempt state without script error.

## Preserved product/trust verdict

- The building is a schoolhouse/corridor interface rather than a generic learning dashboard.
- Room 101 remains the single clear first action. A/V, Pop Quiz, Registrar, Yearbook, LIBRAiRY 101, Book Fair, Closet and Next Season remain plainly visible and labelled.
- Classes remain written previews with no tape/play/completion claim. Report Card and Yearbook remain explicitly device-local and non-mastery. Book Fair remains stocking soon with no Wallet, stock, reservation, fulfilment, entitlement or cross-device promise.
- All referenced art is existing workspace art with working delivery and accurate provenance in the candidate README.

## Acceptance boundary

This ACCEPT closes only the exact Wave 2 isolated-candidate visual/interaction/truth gate. It does not approve production integration, a public route, class or quiz content, four-visitor-scope continuity, account/reward/economy behavior, native Safari/VoiceOver/200% proof, or release/public-origin evidence. Those remain separately owned gates in the governing build packet.

No new prevention rule is required: the predecessor's hidden-state browser/Tab-order rule is now demonstrated by the successor and should remain in every expandable-room test.
