# Town Entry → Visitor's Centre semantic test handoff

**Status:** ACTIVE HANDOFF — JOINT TEST LOCK REQUIRED  
**Sender:** Town Entry owner task
`019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Recipient:** Visitor's Centre owner; Portfolio Control Room  
**Evidence time:** 2026-07-26 11:09:44 PDT  
**Shared files changed:** none

## Collision

`scripts/test-entry-recovery-truth.mjs` asserts the private DOM shape
`id="vc-directory-fallback" hidden`. The current Visitor's Centre preserves
the semantic fallback but intentionally removed that `hidden` attribute and
uses `.is-visible` under JavaScript failure. The stale assertion now fails
even though the receiving owner has a newer accessibility contract.

Town Entry did not modify the Centre or shared regression because no joint
integration lock exists.

## Requested semantic contract

Under a joint Town Entry + Visitor's Centre test lock, replace DOM-shape
coupling with observed behavior:

1. `/start-here.html` and the homepage expose the exact current
   `/visitors-centre.html` route;
2. the Centre fallback contains all seventeen canonical named destinations
   and exact routes;
3. each destination has a current limitation/disposition;
4. missing shared directory data reveals the named fallback rather than an
   empty room;
5. directory/map reveal closes with Escape and returns focus to the initiating
   control; and
6. route arrival is labelled navigation, not downstream completion.

The isolated Town Entry candidate currently verifies only its side:
`/start-here.html` renders an ordinary Visitor's Centre link and its orientation
contract explicitly denies downstream completion. It does not claim to test
the Centre owner's implementation.

## Acceptance owner and next trigger

- **Maker owners:** Town Entry QA + Visitor's Centre QA under one shared test
  lock.
- **Acceptance owners:** both product owners plus independent accessibility/
  runtime judge.
- **Next trigger:** Control Room assigns the joint test lock and exact Centre
  candidate identity.
- **Authority truth:** no deploy, public, spending or Ali approval authority
  was used or requested.

