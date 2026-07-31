# Identity account/profile/cross-device local evidence

**Status:** BUILT LOCALLY — isolated vertical PASS; staging/live HOLD  
**Observed:** 2026-07-26T18:08:58Z  
**Owner:** Functionality & Platform Director  
**Authority used:** local source, migration and deterministic tests only

## Literal build

The local implementation now has one truthful identity path:

`valid device-local Card → explicit verified-session claim → private
owner-scoped mutation → read-after-write → account-backed state → second
device restore`

Profile changes use the same authenticated, exact-request replay contract.
Device-local Card bytes are not login evidence and are never silently erased
by claim, sign-out or remote revoke.

| File | Built behavior | SHA-256 |
|---|---|---|
| `supabase/migrations/20260726010000_resident_identity_v1.sql` | Private Card store, private exact-request mutation receipts, server Card validation, owner get/claim/update/revoke, profile update, optimistic revision and authenticated-only RPC grants | `f8f4cc3de1155ab78ad144795b170d8e5b44fb67cee65b51c1674e446cced358` |
| `content/site/identity-client-v1.js` | Five explicit visitor/account states, safe magic-link redirect, explicit Card claim, profile update, read-after-write, revoke and sign-out without local deletion | `688a688f96a6f4209c8ba8fa863ee882935c35cb4052a03867572df823a05f34` |
| `scripts/test-identity-account-contract.mjs` | Adapter/static migration contract | `fea0806bf64f777604b54d9c702f82545e17ee6bc60276f27647b4937e1c037b` |
| `scripts/test-identity-cross-device-vertical.mjs` | Isolated two-account/three-device state, retry, conflict and propagation proof | `fca760f5d64906be552887ade27489718992054a8702f6b484d466de33a9dfbc` |

## Executed evidence

```text
$ node scripts/test-identity-account-contract.mjs
IDENTITY ACCOUNT CONTRACT PASS

$ node scripts/test-identity-cross-device-vertical.mjs
IDENTITY CROSS-DEVICE VERTICAL PASS visitor_states=5 accounts=2 devices=3 retry=1 conflicts=2

$ node scripts/check-product-stewards.mjs --owner-entry platform-reliability
PRODUCT STEWARD SYSTEM PASS
owner_entry_product=platform-reliability:PASS

$ node --check content/site/identity-client-v1.js
[exit 0]

$ node --check scripts/test-identity-cross-device-vertical.mjs
[exit 0]

$ git diff --check -- [four implementation/test paths]
[exit 0]
```

## Proven locally

- first-time, returning-without-Card, device-local Card,
  account-without-Card and account-backed resident remain distinct;
- one account claims a local Card after an outcome-unknown network response,
  then the same key/request reconciles without a second write;
- another device with its own verified session restores the account Card;
- resident B cannot read resident A's Card/profile in the isolated service;
- a profile update propagates to resident A's second device while resident B
  stays empty;
- same key/same request replays; same key/different request rejects;
- duplicate public username ownership rejects;
- stale-revision Card update rejects instead of last-write-wins;
- sign-out returns to the truthful local state; login restores authoritative
  remote state instead of promoting stale local bytes; and
- remote revoke propagates across account devices and preserves device-local
  bytes.

## Not proved and still launch-blocking

- The migration was not applied anywhere. SQL was inspected and statically
  tested, not executed by PostgreSQL.
- Supabase magic-link delivery, expiry, used-link, rate limit, callback and
  revoked-session behavior remain untested.
- Actual staging RLS/direct-write denial with resident A, resident B,
  anonymous and privileged setup remains untested.
- Existing `maikeover.html`, `laidies-card.html`, `script.js` and built bundle
  still write `member_profiles` directly. Platform cannot make the new RPC
  exclusive until MAiKEOVER/Closet consumers coordinate and pass regression
  tests.
- Profile/account delete, export/retention, accessibility announcements,
  controlled analytics, independent security review and public-origin proof
  remain open.

## Exact next action

In an authorised isolated Supabase project:

1. apply the candidate migration after backup/order review;
2. run real magic-link and two-account/two-device RLS tests with cleanup;
3. coordinate MAiKEOVER/Closet direct profile writers onto the shared adapter;
4. revoke direct profile mutations only after those consumers pass; and
5. obtain independent security and product-owner acceptance.

The shared economic/ownership ledger remains sequenced after this Identity
gate. No economy implementation is authorised by this local PASS.
