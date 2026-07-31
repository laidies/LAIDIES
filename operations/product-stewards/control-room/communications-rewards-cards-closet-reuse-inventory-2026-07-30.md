# Messaging, rewards, Trading Cards and Closet/account reuse inventory — 2026-07-30

**Status:** `REPORT READY` — repository/branch/release-receipt audit only. No production, shared visual code, deployment or publication change was made.

## Bottom line

Do **not** rebuild the account/data layer. A later, publicly verified resident vertical already implements private Card identity, allowlisted cross-device continuation, server-authoritative Trading Card inventory, atomic duplicate gifting, and direct/group resident chat. The current checkout is older (`homepage-redesign` at `c5d72fa`) and does not contain several of these files, which is why a checkout-only search would falsely report them missing.

The strongest reuse baseline is `resident-continuation-20260729`, release commit `28f483e25c021e37e0acd2687abcae26a6d66927`, Cloudflare deployment `9f161385-7486-4207-9afe-8512ea453973`, recorded `DEPLOYED / PUBLICLY VERIFIED` in its release evidence and Resident Card `state.json`. It combines the account vertical, Resident Communications v1, and continuation. This is a separate later release from the 2026-07-26 Episode 04 production baseline and must be artifact-parity checked before any unrelated branch is treated as its source.

## Reuse map

| Capability | Implemented reusable authority | State/evidence | Do not confuse with |
|---|---|---|---|
| Private Resident Card identity | `content/site/identity-client-v1.js`, `resident-account-runtime-v1.js`, `resident-account-page-v1.js`, `closet-account-bridge-v1.js`; `supabase/migrations/20260726010000_resident_identity_v1.sql` | `resident-account-vertical-20260727` (`6cb42b7`); live account/cross-browser evidence is referenced by Resident Card state and continuation release receipt. Auth/RLS/RPC ownership, claim/revoke/profile operations and cross-device Card restore are built and publicly verified as part of the combined release. | Old local-only Card envelope in the current checkout; a local handle is not a reserved identity. |
| Cross-page continuation / supported Closet state | `content/site/resident-continuation-bootstrap-v1.js`, `resident-continuation-v1.js`, `resident-card.html`, plus inclusion across 70+ page files in `5eac0b0` | `resident-continuation-20260729`; migration `20260729010000_resident_continuation_v1.sql`; public two-browser/two-account proof: Episode 02 at 123.4 seconds, account switch isolation, no 390px overflow. | A general sync system: deliberately excludes prompts, drafts, messages/discussions, Girl Talk choices and other free-form private data. |
| Closet presentation | `laidies-card.html` consumes account-backed `member_reward_events`; `closet-account-bridge-v1.js` supplies persistence status; `puffy-bookmarks.js`/continuation supply the allowlisted collections | The combined release says supported Card/Closet continuation works publicly. Existing current page already renders reward types including `trading_card`; branch implementation makes this account-backed. | A complete social/gifting inbox: current Checkout copy says notes/gifts are “in the works”; only the later branch wires authoritative gifting. |
| Server-authoritative Trading Cards | `games/trading-cards.html` on the later branch; `supabase/migrations/20260727213000_authoritative_trading_card_gifts.sql`; existing base migrations `20260722230000_server_side_pack_opening.sql`, `20260722210000_public_cards_show_only_card_fields.sql` | Resident Communications v1 static contract verifies `open_pack` and `my_trading_cards`, no local collection/reset/rarity authority. Combined release preserves server-authoritative packs. | Current checkout’s `games/trading-cards.html`, which stores `laidies_card_collection`, `laidies_last_pulls`, and metadata in `localStorage` and explicitly says it cannot establish ownership/fairness/cross-device state. |
| Duplicate-card gifting | `content/site/resident-card-gifting-v1.js`, Post Office `data-resident-card-gifting` UI, `send_duplicate_trading_card` RPC, `trading_card_gifts` table | Communications migration: duplicate-only transfer, sender idempotency uniqueness, no direct card-event writes; receives/reduces inventory atomically. Release receipt says atomic duplicate gifting is public/operational. | Generic gifts, commerce, or referral rewards. This transfers only a duplicate card to a valid resident handle. |
| Direct and group chat | `resident-chat.html`, `content/site/resident-chat-v1.js`, `resident-chat-v1.css`, global `sv-nav-auth.js`; migration `20260727214500_resident_chat_v1.sql` | Direct/group creation, send/list/report RPCs; RLS membership tables and Realtime registration. Continuation release says direct/group Resident Chat is public and operational. | The legacy/community HTML rooms (`community/*.html`) or Hyvor discussions. They do not become private resident chat just because they link to sign-in. |
| Postal messages/referral reward concept | `postcard.html`, `content/site/post-office.js`, assets in `assets/postcards/from-sunnyvaile/`; specs under `operations/product-stewards/post-office/` | Built composer has 13 stable picker IDs, native Share/SMS/email/Copy actions and bounded personalization. It is **not** delivery/open/join/reward proof. | Delivered messages, recipient activation, reward issuance, or a growth/referral system. D-2026-07-24-008 is specified direction, not proof of that lifecycle. |

## Exact migrations and data boundaries

1. `20260726010000_resident_identity_v1.sql`: private account-backed Card identity with authenticated RPCs (`get_my_resident_state_v1`, `claim_resident_card_v1`, `revoke_my_resident_card_v1`, `update_my_resident_profile_v1`), RLS, revision/idempotency protections.
2. `20260727213000_authoritative_trading_card_gifts.sql`: limits browser-written reward events to non-card types; defines `trading_card_gifts`, `my_trading_cards`, `send_duplicate_trading_card`; protects Trading Card inventory through security-definer/RPC flow and duplicate-only transfer rules.
3. `20260727214500_resident_chat_v1.sql`: `resident_conversations`, membership, messages and reports tables; authenticated membership/RLS policies; direct/group/send/list/report RPCs; adds `resident_messages` to Supabase Realtime.
4. `20260729010000_resident_continuation_v1.sql`: private `resident_continuations` and mutation receipts; authenticated RPC-only read/write; validation, per-resident lock, optimistic revision and idempotency conflict checks. The document allowlists episode state, tours, charms, card collection/meta, Puffy state and ritual flags.

Existing retained precursors should be reused rather than re-invented: `20260722214500_resident_mail.sql`, `20260722230000_server_side_pack_opening.sql`, `20260722234500_bestie_necklace.sql`, `20260723000000_resident_blocks.sql`, and `20260722193000_fix_constraint_drift.sql`.

## Tests and release proof already present

The following test assets exist on the combined release branch, rather than the current checkout:

- `scripts/test-identity-account-contract.mjs` and `scripts/test-identity-cross-device-vertical.mjs` (contract/isolation/idempotency simulation).
- `scripts/test-resident-account-live.mjs` and `scripts/test-resident-account-browser-live.mjs` (authenticated live Supabase and two-browser evidence).
- `scripts/test-resident-communications-v1.mjs` (asserts server-authoritative card pack/gifting/chat integrations and migration protections).
- `scripts/test-resident-continuation-contract.mjs`, `test-resident-continuation-sql-contract.mjs`, and `test-resident-continuation-ui.mjs` (allowlist/merge/RPC/UI and 1440/390 layout checks).
- `operations/product-stewards/resident-card/staging-harness-2026-07-30/` at `186c904` provides isolated local Supabase bootstrap/verification scripts and migration checksums; it is a test harness, not production evidence.

The release receipt `operations/product-stewards/resident-card/resident-continuation-v1-2026-07-29.md` records all above contracts as PASS, live anonymous/direct-table denial, authenticated RPC pass, idempotency and stale-revision conflicts, real browser cross-device evidence, exact artifact/public-origin byte parity, and deletion of disposable verification residents. This audit did not rerun authenticated or public tests.

## Gaps and strict status distinctions

- **Built + publicly verified on the combined resident release:** account-backed Card; supported continuation; server-authoritative card pack/binder; atomic duplicate gifts; direct/group chat and reporting.
- **Built but deliberately bounded:** messages are excluded from the continuation document; anonymous visitors remain local-only; recipients must have eligible account/handle conditions; no generic gift catalogue or commerce.
- **Built local/prototype only in the current checkout:** the old Trading Card roll/binder and local Card/Closet projections. They must not be made authoritative again.
- **Specified/planned, not end-to-end working:** Postcard sender → delivery → open → recipient Card claim → both-person reward loop. D-2026-07-24-008 requires caps and relationship-based reward logic, but existing native share/email handoff does not demonstrate delivery or activation.
- **Still open before broader promotion:** native Safari/VoiceOver/zoom, magic-link delivery/recovery UX, Card comprehension/visual approval, Card analytics/customer-evidence pull, community moderation operations, and fresh release/artifact reconciliation with the presently active source tree.

## Ranked reuse-first execution plan

1. **Reconcile release source before coding.** Start from `resident-continuation-20260729` / `28f483e`, generate a path/hash comparison to the intended artifact, and make it the account capability baseline. Do not copy isolated snippets into `homepage-redesign`.
2. **Run the existing isolated harness and named contracts before schema changes.** Use `staging-harness-2026-07-30`, then contract tests, then an authorized two-account browser suite. This protects RLS, idempotency, account-switch isolation and migration ordering.
3. **Reuse, do not replace, the existing owner model.** Keep `identity-client-v1` + Resident Card RPCs for identity, `resident-continuation-v1` only for its explicit allowlist, and `member_reward_events`/card RPCs for the Closet binder. Add a state only after assigning its authoritative owner and deciding whether it belongs in the continuation allowlist.
4. **Finish the received experience around existing chat/gifting.** Design the Post Office and resident-chat entry/empty/error/report states around the already implemented RPC boundaries; do not revive legacy community rooms as an alternative private-message store.
5. **Build the postcard referral loop as a separate vertical.** Reuse the composer, 13 stable picker IDs and message handoff, but add provider/invite/recipient-claim/reward events and failure/retry evidence. It must not piggyback on the duplicate-card transfer or claim native Share equals delivery.
6. **Make Trading Cards a product/visual workstream, not a persistence rewrite.** Retain server pack/inventory/gifting authority; use `operations/product-stewards/trading-cards/OPERATING-SPEC.md`, card matrix/catalogue evidence, and admitted assets to repair the currently incomplete/candidate card catalogue and visual system. The 2026-07-26 inventory’s localStorage model is historical prototype evidence only.
7. **Only then expand other rewards.** Follow ledger D-2026-07-24-006: Butterfly Clips are the sole spendable currency; stamps, charms, stickers, cards, badges/backgrounds and BEST FRIENDS halves are collectible/relationship states. Every new reward must have a single mutation authority, explicit persistence, visible result, reversal/failure policy and cross-device decision.

## Learning scan

No new qualifying implementation failure was discovered: the principal reusable prevention rule already exists in the release evidence—**search all relevant branches/releases before declaring an account capability missing; checkout-local files are not proof of the public capability boundary**. No painpoint-log mutation is warranted for this read-only report.
