# MAiKEOVER maker packet — local P0 preflight

**Status:** REPAIR 2 READY FOR FINAL INDEPENDENT REJUDGE
**Release status:** NOT DEPLOYED · NOT PUBLICLY VERIFIED
**External-authority hold:** ACTIVE

## Outcome

The product now has one operating spec and a bounded local implementation that
fails closed around every unverified service path. It preserves anonymous card
making while distinguishing browser-local memory from account, public Card,
avatar, reward and cross-device outcomes.

## Implemented

- local saves verify each write, restore prior values after failure, announce
  failure and do not reveal the Closet success handoff;
- MAiKEOVER and every visible local Closet edit are committed in one
  authoritative envelope, with exact prior-byte restoration on failure;
- the public Card browser selection is checked against the separately owned
  Identity/Privacy field contract, not a fixture-authored allowlist;
- the carrying choice is included in the Save contract;
- returning copy says “this device remembers,” not that a local handle proves an
  account;
- MAiKEOVER and Closet state panels identify the authoritative state;
- account/handle/public-card entry is held by default; the duplicate Resident
  Card email intake is visibly held and inoperable;
- availability failure cannot become optimistic claim success;
- public visibility defaults off;
- local handle drafts do not receive public URLs/copy controls;
- portrait inputs are disabled while the safety hold is active;
- style/background controls are native keyboard buttons with pressed state;
- seven-drawer Tab order, held/error focus, deduplicated atomic live
  announcements, computed contrast, reduced motion, mobile reflow and distinct
  200%/400% proxies are covered;
- a localhost-only injected client supports deterministic account UI/privacy
  fixtures without a production call.

## Exact scoped files

- `maikeover.html`
- `resident-card.html`
- `laidies-card.html`
- `content/maikeover-v2.css`
- `content/site/maikeover-v2.js`
- `scripts/check-maikeover-contract.mjs`
- `scripts/test-maikeover-browser.mjs`
- `operations/product-stewards/maikeover/OPERATING-SPEC.md`
- `operations/product-stewards/maikeover/evidence-2026-07-25/`
- `operations/product-stewards/maikeover/controlled-external-test-packet-2026-07-25.md`
- this packet, `state.json` and `backlog.md`
- one appended prevention entry in `operations/painpoints-log.md`

## Test result

- `MAiKEOVER CONTRACT PASS`
- `MAiKEOVER BROWSER PREFLIGHT PASS`
- inline JavaScript: `353 scripts parse across 132 live pages`
- product steward system: `PASS`, 65 products, active 3/3
- rendered desktop/mobile evidence inspected; no new visual is approved by this
  automated review.

## Judge questions

1. Do the state labels prevent a reasonable new/returning user from confusing a
   browser-local card with an account or public Card?
2. Does blocked storage remain usable and clearly fail without a success claim?
3. Are held account/avatar controls inaccessible while local card work remains?
4. Are the localhost-only mocks structurally isolated from public execution and
   correctly labelled as non-service evidence?
5. Did any scoped change redefine a shared reward, identity or migration
   contract? The expected answer is no.

## Remaining hold

Do not enable, deploy or promote account claims, public Cards, cross-device
restoration, avatar generation or durable rewards from this packet. Execute
`controlled-external-test-packet-2026-07-25.md` with explicit release authority
on the exact candidate, then obtain independent acceptance.

The first independent verdict was FAIL and is preserved in
`independent-review-controlled-account-preflight-2026-07-25.md`. Its bounded P0
repairs and evidence are recorded in `repair-1-evidence-2026-07-25.md` and
`repair-2-evidence-2026-07-25.md`; this maker does not self-upgrade the judge
verdict.
