# P0 build packet — shared economic and ownership ledger

**Status:** SPECIFIED — queued after accepted Identity vertical  
**As of:** 2026-07-26  
**Owner:** Functionality & Platform Director  
**Decision controls:** D-2026-07-26-055 and D-2026-07-26-056

## Required outcome

One admitted completion produces an idempotent grant, the same balance appears
in Closet/Wallet and Book Fair, one real deliverable is reserved and fulfilled,
the spend commits exactly once, and timeout/failure releases or refunds the
value. Replay returns the original result without duplication.

`admitted completion_id → grant → wallet projection → reserve offer →
fulfilment → commit spend`

`failure/timeout/correction → release/refund/revocation → every consumer`

## Authoritative contract

Platform will add an append-only `economic_events` ledger with:

`event_id`, `resident_id`, `program`, `event_type`, `units`,
`currency_or_asset`, `source_completion_id`, `idempotency_key`,
`correlation_id`, `prior_event_id`, `catalog_version`, `reason`,
`actor_authority`, `occurred_at`.

Event types are `GRANT`, `RESERVE`, `SPEND`, `RELEASE`, `REFUND`,
`REVOCATION`, and `ADJUSTMENT`. A resident/idempotency key is unique. Ownership
uses immutable entitlement events and a read-only projection; balances and
owned objects are never trusted from browser storage.

Only narrow typed security-definer RPCs may mutate the ledger:
`grant_from_completion`, `reserve_offer`, `commit_fulfilment`,
`release_or_refund`, `replay_by_key`, and `wallet_snapshot`. Direct
insert/update/delete from clients is revoked. Transactions and row locks make
concurrent reserve/commit safe.

`wallet_snapshot` returns available and pending/reserved balances, lifetime
earned, lifetime spent, lifetime refunded/adjusted and paginated itemized
history. Each spend identifies the catalog offer, amount, time, destination,
fulfilment receipt/status and any linked release/refund/correction. Consumers
may not erase spent value from the resident's lifetime record.

## Existing sources that must be replaced or constrained

- `content/site/clip-bank.js`: device-local derived Clips are not account
  money and must not become ledger authority.
- `bookfair.html`: false fulfilment language must be replaced by a real
  catalog item and delivery receipt before charging.
- FAiRY paths: emit typed outcome/completion events; never mutate a balance.
- Bestie/referral migrations: do not grant from a public handle; use a private
  invite lifecycle and accepted completion.
- `member_reward_events`: revoke client self-award capability before promotion.
- Closet/Wallet: read the server projection; it does not recalculate balances.

## Ownership

- Platform: schema, RPCs, projection, correction/reversal and browser SDK.
- High/Express and other producers: emit a signed/authorized typed completion,
  once.
- Book Fair: versioned catalog, cost, reservation, fulfilment receipt and
  failure reason; cannot debit directly.
- Closet: wallet/entitlement consumer and accessible history.
- FAiRY: typed play outcome/refund reason; cannot debit directly. After the
  first vertical passes, one versioned catalog offer may atomically reserve
  Butterfly Clips, grant one extra Play and commit or release/refund. Plays do
  not convert back into Clips.
- Post Office: opaque invite lifecycle before referral grants.
- Release/security: staging RLS, concurrency, provider and rollback proof.

Ali authority is needed for reward amounts, offer prices, the first real
deliverable/catalog, payout policy and any decision to move a promised
economic capability later. Technical ledger construction does not wait on
those choices and may use clearly marked fixtures.

## Failure, privacy and correction

- Replay and timeout reconcile by idempotency/correlation ID.
- Reserve has an expiry; unfulfilled reservations release automatically.
- Fulfilment failure cannot commit spend. Correction/revocation appends a
  compensating event; history is never rewritten.
- Two devices consume the same authoritative projection; concurrent
  insufficient-funds attempts allow at most one commit.
- Logs/analytics contain controlled program/event/result IDs, not emails,
  handles, invite payloads, order content or service tokens.
- Account revoke/delete/retention and disputed adjustment paths are tested.

## Acceptance matrix

1. Database constraints, immutability, direct-write denial and A/B RLS.
2. Grant replay, mismatched replay, concurrency and producer authorization.
3. Reserve/commit/release/refund/revocation and insufficient funds.
4. One High/Express fixture completion through Closet and Book Fair.
5. Real Book Fair fulfilment success, timeout, permanent failure and retry.
6. FAiRY consume/refund only after the first vertical passes.
7. Two-tab/device/account, sign-out, correction and revoke propagation.
8. Keyboard/screen-reader wallet, pending, lifetime earned/spent/refunded,
   named itemized spend, failure, retry and history.
9. Independent security/economic review and exact release/public proof.

This is current-release work. It cannot be relabeled
`INTENTIONAL LATER RELEASE` to absorb missed implementation.
