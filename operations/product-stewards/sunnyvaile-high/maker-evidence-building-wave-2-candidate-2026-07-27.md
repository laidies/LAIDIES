# SUNNYVAiLE High — Building Wave 2 candidate maker evidence

**Status:** `BUILT LOCALLY — narrow independent HOLD repaired; successor independent re-review required`  
**Scope:** `operations/design-explorations/building-wave-2/sunnyvaile-high/` only.  
**Production/shared mutation:** none.

## Literal output

- Candidate: `operations/design-explorations/building-wave-2/sunnyvaile-high/index.html`
- Candidate CSS: `operations/design-explorations/building-wave-2/sunnyvaile-high/high-candidate.css`
- Candidate behavior: `operations/design-explorations/building-wave-2/sunnyvaile-high/high-candidate.js`
- Deterministic verification: `operations/design-explorations/building-wave-2/sunnyvaile-high/test-candidate.mjs`

The candidate uses the High corridor as the interface. Eight plainly labelled room fronts expose: AV Classroom/Classes, Room 101 Pop Quiz, Registrar, Yearbook, Library 101, Book Fair Gym, Closet handoff, and closed Next Season. Room 101 is the first-visit primary action. The AV view fetches the existing class register only to show written preview status; it cannot make a tape look available. Registrar and Yearbook read only the existing device-local quiz keys and show their limitation beside the result.

## Tests

`node operations/design-explorations/building-wave-2/sunnyvaile-high/test-candidate.mjs`

Expected output: `SUNNYVAILE HIGH CANDIDATE PASS rooms=8 actions=7 truthful-boundaries=8 responsive=3 keyboard=1`.

Maker run completed 2026-07-27:

- static candidate suite: `PASS rooms=8 actions=7 truthful-boundaries=8 responsive=3 keyboard=1`;
- Chrome local-server journey: PASS at 1440px, 390px and 320px with document/body horizontal reflow `width == scrollWidth`, every referenced room image delivered with a positive natural width, and each expandable room opened in turn; a forced `503` class-register response produced the explicit independent-route recovery state; and reduced-motion keyboard Enter opened the A/V room and placed focus on its revealed region;
- syntax checks and scoped `git diff --check`: PASS.

Exact file SHA-256 at this maker run:

| File | SHA-256 |
| --- | --- |
| `index.html` | `166b05d5d81565e4d578f978f3b54ea111dcb3d9a3461513d670f368a0a53a60` |
| `high-candidate.css` | `3fa821f870cfc7af492a55aff26ff131df0448ea11a8e31ae8fe1745651cc6fb` |
| `high-candidate.js` | `3d0720cbc55122fe0cbd418e7e2e812d8a7d09d4908a9025e79214a953489e9f` |
| `test-candidate.mjs` | `b8a5a345514d2a0b06d520f98aa63ad0e6d97fa7e96be23279460d41355169b0` |

An additional reduced-motion Chrome keyboard check passed: focusing the A/V door and pressing Enter opened the room and moved focus to the revealed `#av-room` region. That focus transfer is intentional; it is a better recovery target than leaving focus on the trigger after the visual/context transition.

## Narrow HOLD successor — native hidden-state repair

The independent HOLD found that `.room-panel { display:grid }` overrode the browser's native `[hidden]` rule, so all four expandable rooms were initially painted despite carrying `hidden`. The successor changes only candidate CSS/behavior/tests:

- `.room-panel[hidden]{display:none}` now wins with equal selector specificity and later source order;
- closing a room explicitly returns focus to its trigger;
- the deterministic suite proves all four panel elements contain `hidden`, the CSS rule exists, and the close-focus behavior is present.

Successor deterministic output:

`SUNNYVAILE HIGH CANDIDATE PASS rooms=8 actions=7 truthful-boundaries=8 responsive=3 keyboard=1 initial-hidden=4 close-focus-return=1`

Real Chrome successor output at 1440, 390 and 320px:

- initial four panels: `hidden=true`, computed `display=none`, rendered height `0`;
- Tab order: first-time primary action → A/V door → Room 101 Pop Quiz, with reverse Tab returning to A/V;
- Enter on A/V: panel becomes visible and focus moves to `#av-room`;
- Enter on the A/V trigger again: panel hides and focus returns to that trigger;
- document reflow: `1440/1440`, `390/390`, `320/320`.

Successor candidate hashes:

| File | SHA-256 |
| --- | --- |
| `index.html` | `166b05d5d81565e4d578f978f3b54ea111dcb3d9a3461513d670f368a0a53a60` |
| `high-candidate.css` | `79eb6350e9989bbee8c6d716a26970c4a44dd9579df389a2762e67a741aa7dd5` |
| `high-candidate.js` | `2c0cceb0de96968aabd4c7b922070ec782ecc050e7a55178a21a4012da37cd9d` |
| `test-candidate.mjs` | `f5a37705e8034e399f0770cad3aacceda454b6dfb76910a03a2bf6bd57902e7e` |
| `README.md` | `98cc9dcf4ff235851a1e6502f592dd84eb2b1065908c55ca0669289efd5f80ca` |

## Remaining gates

Independent review must inspect actual 1440/390/320 rendering, keyboard/focus, reduced motion, class-register unavailable state, storage-denied/corrupt state, and learning/Brand truth. No candidate output is integrated, deployed, public, or an admission of classes, quiz mastery, account state, rewards, Book Fair stock, or Closet entitlement.

## Learning scan

**Non-obvious verification rules:** an expandable room's keyboard assertion must inspect the intended revealed-region focus target, not merely expect focus to remain on the trigger. Also, a nested candidate must use a browser delivery check for every provenance asset: its initial relative image URLs were one directory shallow and static/reflow checks did not reveal the resulting 404s. The repaired candidate now verifies image delivery at 1440/390/320. This is local maker evidence only; independent accessibility review must confirm the full journey.
