# SUNNYVAiLE High Wave 2 — independent candidate review

**Verdict:** **HOLD — bounded candidate repair required**  
**Reviewed:** 2026-07-27 (America/Vancouver)  
**Scope:** candidate-only review of `operations/design-explorations/building-wave-2/sunnyvaile-high/`. No candidate, production, shared-state, route, asset or release mutation was made by this judge.

## Exact tuple reproduced

| Input | SHA-256 |
| --- | --- |
| Maker evidence | `b23c873cee3c94e402d847f6d2bb1a2f6597cd72564a088dcf43952e80e65f14` |
| `index.html` | `166b05d5d81565e4d578f978f3b54ea111dcb3d9a3461513d670f368a0a53a60` |
| `high-candidate.css` | `3fa821f870cfc7af492a55aff26ff131df0448ea11a8e31ae8fe1745651cc6fb` |
| `high-candidate.js` | `3d0720cbc55122fe0cbd418e7e2e812d8a7d09d4908a9025e79214a953489e9f` |
| `test-candidate.mjs` | `b8a5a345514d2a0b06d520f98aa63ad0e6d97fa7e96be23279460d41355169b0` |

The maker-evidence checksum supplied to this judge matches exactly.

## Checks that pass

- The deterministic suite independently reproduces: `SUNNYVAILE HIGH CANDIDATE PASS rooms=8 actions=7 truthful-boundaries=8 responsive=3 keyboard=1`.
- Product-steward owner entry and full steward checks pass.
- At 1440×900, 390×844 and 320×900, document and body `scrollWidth` both equal viewport width. All five rendered `<img>` uses have a positive `naturalWidth`, no console/page errors occur, and the four referenced existing-art files resolve to the provenance named in the candidate README.
- The 1440, 390 and 320 scenes are an actual schoolhouse/corridor rather than a generic learning dashboard. The arrival explicitly makes Room 101 the first action; A/V, Pop Quiz, Registrar, Yearbook, LIBRAiRY 101, Book Fair, Closet and Next Season are visibly labelled.
- The candidate correctly keeps the current boundaries truthful: no tape/play/completion claim for the class previews; no mastery, account-backed, wallet, stock, reservation, fulfilment or entitlement claim; scorecard/yearbook are labelled device-local and playful; Book Fair is stocking soon.
- The forced `503` class-register state says that the register could not be loaded and leaves Pop Quiz and the 101 shelf as independent recovery routes. A deliberately denied `localStorage` getter produces the non-durable empty-record state without a script error.
- Enter on the A/V door with reduced motion opens the A/V region, sets `aria-expanded="true"`, and moves focus to `#av-room`; activating Registrar then Yearbook hides the prior revealed region and places focus on the new one.

## Blocking defect

The candidate marks four panels `hidden` in markup (`#av-room`, `#registrar-room`, `#yearbook-room`, `#fair-room`), but the authored `.room-panel { display:grid; }` rule overrides the user-agent `[hidden] { display:none; }` rule.

Consequences reproduced at 320px before any room trigger is activated:

1. all four supposedly closed panels are visibly rendered below the corridor;
2. real keyboard Tab traversal reaches the eight A/V preview links inside the visually exposed-but-semantically-hidden A/V panel; and
3. the room-door controls no longer govern whether their rooms are exposed, undermining the promised room-as-interface grammar and creating a mismatched accessibility tree/keyboard journey.

This is a P1 candidate defect. The otherwise good visual and truthful-state work cannot receive candidate acceptance until the hidden state is real.

## Exact unblock

The maker may change only the candidate CSS/related deterministic assertion so that `[hidden]` wins over the panel display rule (for example, `.room-panel[hidden] { display:none; }`). Then reseal the changed tuple and rerun:

1. 1440/390/320 initial scenes prove all four panels are absent before activation;
2. real Tab traversal proves hidden panel controls are not reachable until their owning room opens;
3. each door opens exactly its owned panel, transfers focus to it, and hides the prior panel; and
4. class-register 503, denied/corrupt local storage, reduced motion, provenance images and the no-overclaim inventory remain passing.

This is not an integration, production or release verdict. The independent candidate can return for successor re-review after the exact repair; all wider Classes, quiz-content, four-visitor-scope, economy, native accessibility and public-origin gates remain separate.

## Learning scan

**Prevention rule:** any candidate using `hidden` must browser-test both its computed display and real Tab order before an accessibility/room-interaction pass. An author display declaration can override the UA hidden rule and leave content visually exposed while still semantically hidden.
