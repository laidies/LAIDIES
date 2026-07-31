# P0 build packet — identity, account, profile and cross-device migration

**Status:** BUILDING — local account/profile/cross-device vertical passes
isolated tests; no database, real-auth or live proof  
**As of:** 2026-07-26  
**Owner:** Functionality & Platform Director  
**Decision controls:** D-2026-07-26-054 through D-2026-07-26-056

## Required outcome

A resident can consciously claim a valid device-local Resident Card into a
verified account, restore the accepted account state on another device,
update or revoke it, and sign out without the product confusing local
recognition, Card possession and authenticated authority.

The authoritative path is:

`valid local envelope → explicit claim → verified Supabase session →
security-definer RPC → RLS-protected resident_cards row → read-after-write →
account-backed consumer → second-device restore`

The local envelope remains untouched until the remote read proves the exact
revision. Shared consumers must use this contract rather than inventing auth,
profile or sync state.

## Architecture and exact paths

- New migration:
  `supabase/migrations/20260726010000_resident_identity_v1.sql`
  - `resident_cards`: one private versioned Card document per `auth.users.id`;
  - `resident_identity_mutations`: private owner-scoped exact-request
    idempotency/replay receipts shared by Card and profile operations;
  - strict v1 server validation mirroring
    `content/site/resident-card-contract-v1.js`;
  - direct client mutations revoked;
  - authenticated RPCs for get/claim-update/revoke with fixed `search_path`,
    `auth.uid()` authorization, optimistic revision and replay protection.
- New browser adapter: `content/site/identity-client-v1.js`
  - one auth lifecycle, state taxonomy and safe same-origin magic-link
    redirect;
  - get session/account state, claim/update, read-after-write, revoke/signout;
  - never deletes local bytes and never treats Card presence as authentication.
- Contract tests: `scripts/test-identity-account-contract.mjs` and
  `scripts/test-identity-cross-device-vertical.mjs`.
- Consumers to integrate after the foundation passes:
  `maikeover.html`, `laidies-card.html`, `resident-card.html` and
  `content/site/maikeover-v2.js`.
- Existing `content/site/supabase-schema.sql` is not migration authority.
  Migration prefix collisions must be resolved before ordered staging apply.

## State machine

`FIRST_TIME ↔ RETURNING_LOCAL_NO_CARD ↔ DEVICE_LOCAL_CARD`

`DEVICE_LOCAL_CARD --explicit claim + verified session + remote read→
ACCOUNT_BACKED_RESIDENT`

Sign-out returns to the truthful local state. A second device is account-backed
only after its own verified session and RLS read. Expired/used links, missing
profiles, revoked Cards, local/remote conflicts and network-unknown outcomes
are explicit states, never optimistic success.

## Failure and security contract

- Mutations require stable UUID idempotency keys. Same key/same request replays
  the original response; same key/different request returns conflict.
- Updates require the expected current revision. No implicit last-write-wins.
- Unknown timeout is reconciled by replay/get; users do not double-submit.
- RLS is tested with resident A, resident B, anonymous and privileged setup.
- No service-role key, token, email or private Card document enters client
  logs, analytics, screenshots or public evidence.
- Public profile projection remains a separate, deliberately allow-listed
  contract; a private Card row does not make a resident public.
- Delete/revoke and export/retention behaviors require product/privacy
  acceptance before public promotion.

## Acceptance proof

1. Fresh, expired, used and rate-limited magic-link flows; callback, retry,
   logout/login and revoked session.
2. Four visitor states plus local→account, sign-out, two-tab, two-account,
   second-device and conflict transitions.
3. Actual staging database RLS isolation and direct-write denial—not a mock
   labeled as RLS proof.
4. Claim/update/revoke replay, mismatched idempotency, stale revision,
   timeout/reconciliation and local-byte preservation.
5. Profile private/public/not-found, visibility/update/delete and no PII leak.
6. Keyboard/screen-reader status, error focus and recovery.
7. Aggregate controlled analytics only.
8. Independent security review, exact candidate binding and public-origin
   proof after deployment authority is granted.

## Current local evidence

At `2026-07-26T18:08:58Z`, the isolated vertical produced:

```text
IDENTITY ACCOUNT CONTRACT PASS
IDENTITY CROSS-DEVICE VERTICAL PASS visitor_states=5 accounts=2 devices=3 retry=1 conflicts=2
PRODUCT STEWARD SYSTEM PASS ... owner_entry_product=platform-reliability:PASS
```

The test proves the browser adapter's five explicit visitor/account states,
explicit local Card claim, second-device restore, two-account isolation,
profile propagation, username collision, same-request replay,
different-request idempotency conflict, stale revision rejection,
unknown-outcome reconciliation, sign-out/login and remote revoke while local
bytes remain untouched.

This is executable local proof against an isolated in-memory service model and
static migration contract. It is not staging RLS, Supabase Auth, email,
cross-device network or public behavior proof. The migration has not been
applied.

## Ownership and integration order

- Platform: migration, RPCs, browser adapter, identity state model and staging
  security suite.
- MAiKEOVER: explicit claim/merge choice and local Card presentation.
- Closet/Resident Card: account-backed rendering, sign-out/revoke/delete copy
  and consumer tests.
- Independent security reviewer: RLS, grants, SECURITY DEFINER, tokens/PII and
  two-account evidence.
- Release: migration order, staging apply, candidate provenance and rollback.

Build after the admitted Library local round trip. Account-backed Library
Puffy migration and the shared economic ledger consume this accepted identity
contract. No safety label can close the build.
