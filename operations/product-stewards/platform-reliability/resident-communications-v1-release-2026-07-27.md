# Resident communications v1 release evidence

**Evidence time:** 2026-07-27 21:34 PDT  
**Product state:** `BUILT / BACKEND APPLIED / PREVIEW VERIFIED`  
**Source branch:** `resident-communications-20260727`  
**Source commit at first preview:** `1dce196`

## What was already real

The live Supabase project already contained the Resident Card identity layer,
the card catalogue, card inventory rows, pack status, pack opening and Bestie
invite redemption. The live catalogue contained 21 active definitions: 20
concept cards and one character card.

That work was not imaginary or disposable. The product gap was that the public
Trading Cards page still treated local browser state as the binder authority,
the Post Office could label an ordinary note as a card without transferring
inventory, and no resident direct/group chat product was connected.

## Exact completed scope

- `20260727213000_authoritative_trading_card_gifts.sql`
  - server-authoritative binder reads;
  - duplicate-only atomic card transfer;
  - last-copy protection;
  - idempotent replay;
  - block and closed-mailbox enforcement;
  - inseparable sender decrement, recipient increment and Post Office receipt;
  - direct browser writes to trading-card reward inventory denied.
- `20260727214500_resident_chat_v1.sql`
  - private direct conversations and small groups addressed by resident handle;
  - server-controlled membership and authorship;
  - message read state, unread counts, reporting, blocking and realtime delivery;
  - no email address exposed in chat.
- Public product bindings:
  - Trading Cards now reads the live binder and opens live packs;
  - Post Office exposes only duplicates that can actually be transferred;
  - Resident Chat supplies ICQ-inspired private and group conversations;
  - signed-in site navigation exposes Chat and its unread count.

## Live service evidence

Both migrations were applied transactionally to Supabase project
`swqnkxzebxdbgyrzpdne`. Post-apply inspection confirmed:

- the gift table and all four chat tables exist;
- both gifting functions and all six chat functions exist;
- `resident_messages` is in the realtime publication;
- the applied migration ledger contains `20260727213000` and
  `20260727214500`;
- authenticated browser reward policies now permit only non-card reward
  inserts and updates.

A production-database functional test used two temporary residents inside one
`BEGIN` / `ROLLBACK` transaction. The literal result was:

`PASS duplicate transfer + replay + last-copy + direct + group + read + report`

No test residents, inventory, gifts, messages, conversations or reports were
retained.

## Source and preview verification

- `node scripts/test-resident-communications-v1.mjs` — PASS
- JavaScript syntax and inline-script parsing — PASS
- duplicate DOM identifiers — PASS
- Platform owner-entry and full product-steward checks — PASS
- scoped `git diff --check` — PASS
- signed-out fail-closed browser journeys for Trading Cards, Post Office and
  Resident Chat — PASS
- Cloudflare preview:
  `https://resident-communications-2026.laidies-sunnyvaile.pages.dev`
- seven changed public files matched the built artifact byte for byte on the
  preview.

## Remaining truth

- The communications and duplicate-gifting mechanics are operational in the
  live backend.
- The current card catalogue is not a complete creative card collection:
  there are 20 concept cards and only one character card. The missing character,
  episode and town-card artwork remains a separate creative production scope.
- No claim is made here that private resident messages are end-to-end encrypted.
- Production publication and public-origin verification are recorded only
  after the exact release is deployed.

