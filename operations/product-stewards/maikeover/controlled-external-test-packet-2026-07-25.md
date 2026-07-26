# MAiKEOVER controlled account, privacy and two-device test packet

**Status:** READY FOR AUTHORIZED EXECUTION — not run
**Scope:** exact release candidate and exact public origin only
**Authority required:** release owner plus approved test identities/inboxes

This packet is the remaining real-service proof. The local browser suite and its
mock accounts do **not** prove email delivery, authentication, Supabase/RLS,
public Cards, avatar handling, durable rewards or cross-device restoration.

## Preconditions

Record before starting:

- exact commit, artifact identifier, deployment identifier and public origin;
- Supabase project/environment and migration version expected by that artifact;
- avatar Worker version and generation status;
- two authorized synthetic test accounts, `ACCOUNT_A` and `ACCOUNT_B`, with
  inboxes the tester is allowed to use;
- Device/Browser A and an isolated Device/Browser B with no shared browser
  profile;
- one synthetic, non-personal avatar test image plus malformed/oversized
  fixtures;
- current privacy notice, retention statement, analytics event dictionary and
  incident contact.
- the exact approved public projection in
  `public-card-field-contract-v1.json`; implementation and evidence must match
  that separate Identity/Privacy-owned contract.

Do not put email addresses, tokens, magic links, profile answers, avatar bytes
or raw invite content in this packet, screenshots, analytics or console logs.

## Controlled sequence

### 1. Anonymous and local truth

1. In a clean Device A context, open MAiKEOVER.
2. Confirm the page says the card is device-local and account/public/cross-device
   paths are separate.
3. Make a card, including name, background, song, saint, movie, television and
   carrying choice; save; reload; open the Closet.
4. Confirm every chosen field returns on Device A and no account/public/reward
   success appears.
5. Open the same route on Device B without signing in. Confirm the Device A card
   does not appear.
6. Repeat with storage blocked/quota exhausted. Confirm the preview remains,
   failure is announced, no success handoff appears and retry is possible.

### 2. Account A and restoration

1. With release authority explicitly enabling the account path, use a fresh
   authorized `ACCOUNT_A` inbox.
2. Exercise invalid, reserved and known-taken handles. None may become available
   after a timeout or failed lookup.
3. Request one magic link. Record request result and delivery timestamp without
   recording the address or token.
4. Exercise an expired/used link and a fresh link. Failure and retry must be
   distinct; only the fresh verified session may continue.
5. Claim a valid handle with public visibility **off**. Confirm the profile write
   succeeds and reload restores the claimed account state.
6. Sign out. Confirm local and signed-out state are explicitly distinguished.
7. Sign back in on Device A and then Device B. Confirm supported account fields
   restore correctly, while device-local-only collections remain labelled and
   do not masquerade as synced.
8. Edit one supported field on Device B and confirm the authoritative result on
   Device A after a fresh reload.

### 3. Two-account privacy and public Card

1. While `ACCOUNT_A` is private, open its handle URL signed out and as
   `ACCOUNT_B`. Both must receive the same non-revealing private/not-found state.
2. Opt `ACCOUNT_A` into public visibility. In a signed-out context and as
   `ACCOUNT_B`, confirm only the restricted public-card fields appear.
3. Verify the response and rendered DOM exclude email, account ID unless
   technically essential to the contract, age/generation, AI comfort, industry,
   goals, timestamps, tokens, raw avatar input and every owner-only field.
4. Confirm `ACCOUNT_B` cannot update `ACCOUNT_A`, read its raw profile row, or
   read private reward/profile data.
5. Turn `ACCOUNT_A` visibility off. Repeat both public lookups and confirm the
   same non-revealing state returns without stale cache exposure.
6. Try nonexistent, malformed and reserved handles. Responses must not allow
   account enumeration.
7. Confirm the public Card makes no request to raw `member_reward_events`,
   owner profile rows, invite/refund/transaction metadata or another private
   table. Collections must be absent unless a separately approved restricted
   public-collection projection exists.
8. If a restricted public-collection projection is later approved, record its
   exact selected fields, RLS policy/version, consent control, unauthenticated
   and Account-B results, visibility-off revocation and cache purge. It may not
   expose account identifiers unless essential, raw metadata, invite content,
   transaction/refund state or private reward history.

### 4. Avatar dependency

Run only if the portrait booth has separate release authority.

1. Use the synthetic image and a synthetic text description—never Ali's or a
   real resident's photo.
2. Exercise valid, malformed, unsupported, oversized, abusive and timed-out
   inputs plus a malformed upstream response.
3. Confirm no browser-held provider secret, bounded request size/time, safe
   error copy, retry, candidate selection and no success-shaped failure.
4. Verify the stated upload/retention/deletion behaviour from service evidence;
   do not infer it from UI copy.

### 5. Reward and analytics truth

1. Confirm making/saving/claiming a Card does not issue a reward merely because
   a button, local record or analytics event occurred.
2. Confirm backgrounds remain choices, not owned unlocks.
3. Confirm local Closet collections say “this device”; do not test or alter the
   shared reward ledger without its owner.
4. Inspect aggregate events and request payloads. They may include only
   version, state/result/error category, viewport class and elapsed-time bucket.
   They must exclude names, emails, handles, profile choices, avatar data,
   invite content and tokens.
5. Record configured retention and deletion evidence for authentication
   telemetry, CDN/public-card caches and any public-collection cache. Confirm a
   visibility change/revocation removes cached public data within the stated
   window; do not infer deletion from a refreshed browser alone.

## Stop conditions

Stop immediately and preserve evidence without further mutation if:

- another account's owner-only field is readable or writable;
- private/public visibility is ambiguous or cached incorrectly;
- a failed/expired auth path produces signed-in or claimed UI;
- an unverified handle becomes enabled after lookup failure;
- storage/service failure looks like success;
- sensitive data appears in analytics, logs, URLs or screenshots;
- a Card action grants/consumes a reward unexpectedly; or
- a public Card queries raw `member_reward_events` or another owner/private
  table;
- visibility-off leaves a public-card or collection cache readable beyond its
  stated revocation window; or
- the artifact, backend version or public origin changes during the run.

## Required evidence and pass rule

Capture timestamped result rows—not private content—for every step: artifact and
service versions, context (anonymous/A/B), expected result, observed result,
HTTP/error category, visible state, privacy field inventory, retry result and
verdict. Include keyboard/mobile results on the exact candidate.

All steps must pass on one unchanged release. Any repair creates a new candidate
and requires the affected sequence plus regression rerun. Only then may
account, public-card or cross-device status move from **UNVERIFIED**.
