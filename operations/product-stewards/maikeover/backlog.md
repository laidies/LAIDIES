# MAiKEOVER on MAiN backlog

**Status:** BUILDING — recommendations only; no entry is implementation, release or public approval.

## FIX BEFORE LAUNCH

1. **MKO-001 — Prove the full Resident Card account contract.**
   - Owner: Resident Card sub-champion + Platform/Data/Reliability + Safety/Privacy guild.
   - Test: fresh email → magic link → valid/taken/invalid handle → optional profile → visibility selection → logout/login → second device → edit/revoke path.
   - Pass condition: account state, local state and visible result agree; expired/error/retry states are understandable; no sensitive profile data leak.

2. **MKO-002 — Prove public/private Card boundaries.**
   - Owner: Resident Card sub-champion.
   - Test: two accounts; public URL, private URL/not-found, visibility change, blocked/unavailable and unauthenticated path.
   - Pass condition: only consented card fields are exposed and the public experience gives a non-revealing failure state.

3. **MKO-003 — Make all progression copy match authoritative state.**
   - Owner: Closet & Progression sub-champion + Identity, Rewards & Connection.
   - Required result: the exact artifact/public origin labels card/Closet progress as device-local wherever that is the source; no “saved,” “unlocked,” “earned” or cross-device claim outruns evidence.

4. **MKO-004 — Test the avatar service as a real product dependency.**
   - Owner: Platform/Safety guild.
   - Test: anonymous input, image upload, malformed/large input, timeout/error/retry, returned candidates, retained data and privacy notice.
   - Pass condition: user-facing failure does not resemble success, image handling matches the stated contract, and abusive/unsafe inputs have a bounded response.

## HIDE/LABEL FOR LAUNCH

5. **MKO-005 — Treat card-background “unlocks” as choices until ownership exists.**
   - Owner: Resident Card + Identity/Rewards.
   - Evidence: current backgrounds are selectable; no ownership/unlock ledger is proven.

6. **MKO-006 — Do not promise Clip-funded Closet delivery.**
   - Owner: Closet & Progression + Book Fair.
   - Evidence: Clip Bank derives balances and spends from local storage; reward/economy strategy records that Book Fair redemption does not yet render the promised object into a collection.

## POST-LAUNCH EXPERIMENT

7. **MKO-007 — Championship: local-first versus claim-first onboarding.**
   - Preconditions: MKO-001–004 pass and privacy-safe aggregates exist.
   - Question: which ordering best gives a woman a useful, confidence-building card while preserving informed account/visibility consent? Compare only reversible entry framing, not data collection volume.

8. **MKO-008 — Ethical revenue research, not a paywall.**
   - Use aggregate demand for optional personalization/display objects only after durable delivery and opt-in ownership are real. Core card creation, foundational learning, accessibility and essential practice remain free; no bought Clips, money-equivalent currency, streak pressure, paid identity alteration or reward for spam.

9. **MKO-009 — Design one authoritative transaction ledger.**
   - Owner: Identity, Rewards & Connection.
   - Required fields: immutable transaction ID, resident ID, earn/spend/adjustment/refund, amount, action/offer, dedupe key, timestamp and visible delivery state. Migrate local-only state deliberately; support duplicate/retry/two-tab/new-device/refund tests.

## DECLINE

10. **MKO-010 — Decline “engagement” rewards for shares, visits, retries or raw posting.**
    - Reason: they are not meaningful outcomes, invite gaming and turn belonging into transactional pressure.

## Next trigger

Run the controlled account/privacy/two-device journey against the exact public release before promoting retention, public Card, invitation, unlock or cross-device value.
