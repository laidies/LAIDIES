# Executable Build Packet — Complete Trading Cards Rebuild

**Status:** SPECIFIED / QUEUED  
**Visible outcome:** two truthful decks, sealed-pack opening, accessible card
flip and one private collection visible consistently in Trading Cards and
Closet.  
**Implementation authority:** none yet; Control Room must bind task and locks.

## Work packages

| ID | Action | Output | Owner / lock | Acceptance |
|---|---|---|---|---|
| TC-01 | Close Concept catalogue for Episodes 01–04 | Machine-readable version of `CARD-MATRIX.md` | Trading Cards + Episode owners; content lock | 20 exact rows, source receipts, no generic substitutions |
| TC-02 | Install Episode 05+ intake | Schema, validator and weekly handoff receipt | Episode + Blend & Snap + Trading Cards | Missing/stale/duplicate/unverified rows fail closed |
| TC-03 | Close full Character roster | Versioned roster from `CHARACTER-ROSTER.md` | LUMINAiRY editorial; Ali only for conflicts | Every family, collective, identity and correction owner resolved |
| TC-04 | Brand ruling | KEEP/ADAPT/REJECT ledger for every current ref/asset family | Ali/Brand | Explicit ruling after sitewide direction; no generation before it |
| TC-05 | Produce card visuals | One front, then back, then finish per admitted row | Asset lock | One-image-at-a-time maker receipt and independent PASS |
| TC-06 | Build authoritative Platform vertical | Grant, sealed entitlement, server open, replay, pity, ownership, correction | Platform/service lock | Concurrency, RLS, idempotency, replay and revoke PASS |
| TC-07 | Build truthful card room | Catalogue, pack state, opening, flip, duplicate, binder, failures | `/games/trading-cards.html` lock | Four visitor states; desktop/mobile/a11y/failure PASS |
| TC-08 | Wire private Closet | Concept/Character tiles consuming same projection | Closet/Resident Card lock | Exact round trip, privacy isolation and correction propagation |
| TC-09 | Independent admission | Product/learning, trust, identity, accessibility, technical, Brand, release | Independent judges | Exact hash-bound candidate PASS |
| TC-10 | Integrate/release | Shared merge, deploy and public-origin verification | Control Room/release lock | Artifact identity, rollback and public checks |

## Weekly Episodes input contract

Receiver accepts the envelope contract at
`operations/product-stewards/episode-experience/ownership-handoff-trading-cards-weekly-episode-engine-2026-07-26.md`
(SHA-256
`5279ed830eb2ce3dc5672efe3aad6e4bf1928f23cd8db2bb9e13995af8932e3d`)
as a durable dependency only.

For every later approved episode:

- preserve producer `packKey=episode-NN` and canonical-SHA `packVersion`;
- return selected/deferred/declined rows with reasons;
- map selected rows into a separate Trading Cards catalogue/pack version;
- reject unknown/held rights or likeness status;
- require correction/revoke/supersession when the canonical SHA changes.

Episode 05 has no Gate 1 envelope. No Episode 05 concept, character, copy,
source, pack or art may be invented from drafts or titles.

## Visual production protocol

Visual generation is paused until TC-04. After it clears:

1. Select one admitted card row and its exact identity/source bundle.
2. Generate only one face.
3. Verify dimensions, file type, alpha/profile, filename and hash.
4. Inspect original size, 300px display size and grayscale/high-contrast view.
5. Check identity, anatomy/hands, era/setting, correct text, no watermark,
   crop, contrast, artefacts and meaningful alt text.
6. Independent reviewer records PASS/HOLD with the exact hash.
7. On HOLD, repair only that face and rejudge; do not continue the batch.
8. After standard front PASS, build the accessible back treatment; finishes
   derive from the accepted front and never create a new identity.

## Platform transaction and dependencies

Required endpoint behavior:

- `grant_pack(source_completion_id, pack_key, idempotency_key)`
- `open_pack(pack_entitlement_id, idempotency_key)`
- `collection_snapshot(resident_id)`
- `transfer_duplicate(card_entitlement_id, recipient_id, idempotency_key)`
- `correct_or_revoke(prior_event_id, reason, idempotency_key)`

Hard tests:

- replay returns the same grant/open/transfer receipt;
- two concurrent opens produce one result;
- no repeated card key inside one pack;
- visible pity counter agrees before/after open;
- fixed odds/catalog version is recorded;
- invalid, expired, already opened, revoked and wrong-account packs fail safely;
- direct client writes and cross-account reads fail;
- duplicate transfer cannot create or destroy inventory;
- correction/revoke reaches Trading Cards and private Closet;
- public Card never exposes collection;
- local preview cannot merge silently with account ownership.

Platform may reuse the append-only event/entitlement pattern in
`platform-reliability/build-packet-economic-ownership-ledger-2026-07-26.md`,
but card entitlements are non-currency objects and need their own typed
catalogue/open/transfer receipts.

## Four-state journey tests

For first-time, returning without Card, device-local Card and verified account:

- desktop 1440 and mobile 390/320;
- direct route and Blend & Snap pack handoff;
- catalogue loading/empty/held/unavailable;
- sealed pack available, open success, open replay, duplicate and no-duplicate;
- flip by pointer and keyboard, focus return and reduced motion;
- binder filter/missing/owned/count state;
- storage denied/offline/server timeout/retry;
- corrupt/migrated local preview;
- sign in/out, second tab/device and account/local conflict;
- grant/revoke/correction propagation to private Closet;
- screen reader, 200% zoom and no horizontal overflow.

## Front/back and alt-text admission

- Concept copy source is `CARD-MATRIX.md`.
- Town Character back-copy and alt seeds are in `CHARACTER-ROSTER.md`.
- LUMINAiRY backs are not written until roster and claim receipts are admitted.
- Back copy renders as real accessible text even if a visual face also includes
  lettering.
- Final alt text is written after inspecting the exact accepted image; seeds
  cannot be promoted unchanged when the image differs.

## Release gates and rollback

No live/shared edit or deploy starts without exact locks. Integration uses a
hash-bound candidate. Rollback restores the prior route/catalogue and disables
new grant/open endpoints without deleting immutable receipts; corrections are
append-only. Public verification must prove the exact deployed catalogue,
route behavior and private/public collection boundary.

## Exact next actions

1. Control Room binds a Trading Cards implementation task and grants content,
   route/test and Platform coordination locks.
2. Episode owners accept or correct the 20-row concept matrix and return
   checksum-bound Episodes 01–04 envelopes under the accepted weekly contract.
3. LUMINAiRY editorial resolves the SAiNT conflict and signs the 56-unit
   candidate universe into an admitted roster version.
4. Platform builds the authoritative grant/open/ownership vertical using
   fixture visuals.
5. Visual work waits for Ali's sitewide Brand ruling and TC-04.
