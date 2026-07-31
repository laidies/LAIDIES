# MAiKEOVER, Resident Card and Closet functionality map

**Status:** FUNCTIONALITY RECOVERED AT CONTRACT LEVEL — SHARED BACKEND AND
REAL-SERVICE GAPS REMAIN
**Product owner:** MAiKEOVER building champion
**Affected subproducts:** Resident Card; Closet & Progression
**Functionality & Platform Director:** review required
**Evidence ceiling:** repository, operating specs, local evidence and launch
truth table inspected 2026-07-26; no new real-account, provider, cross-device
or public-origin test was performed by this map.

## Intended system result

MAiKEOVER creates or edits the resident identity object. The Closet displays
only the profile, saves, progress, collections and entitlements that an
authoritative device or account source can prove. Other buildings produce
many of those objects; the Closet is a consumer and continuation surface, not
permission to invent missing awards or re-derive incompatible balances.

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | Intended experience difference | Current truth | Required next proof / launch disposition |
|---|---|---|---|---|
| First-time visitor | No accepted Card/account state | Understand MAiKEOVER, make a useful Card without an account, see what is saved and where it will reappear | Guest Card creation and bounded local save evidence exist | Clean-device mobile/desktop comprehension plus save/failure/Closet handoff; may launch only with same-device language |
| Returning visitor without a Resident Card | Prior local visits/saves may exist, but no valid Card envelope | Resume useful device-local objects without replaying all newcomer orientation; offer Card only where it improves continuity | Individual local records exist; no canonical “returning visitor” recognition contract | Inventory allowed signals, avoid fingerprinting/identity claims, test useful return and corrupt/storage-denied fallback |
| Resident Card holder — device-local | Valid versioned `laidies_resident_card_v1` envelope on this device | Restore Card/Closet, allow edits and show only locally proved collections | Atomic local write/restore/failure behavior passed independently | Test first/return → create/edit → Closet → reload/sign-out-like return; label **on this device** |
| Resident Card holder — verified account-backed | Supabase Auth session plus accepted profile/handle/RLS result | Restore permitted profile and owned state across devices; apply visibility/privacy accurately | Intended/code paths only; real account lifecycle not accepted | **HOLD** account/sync/public claims until controlled two-account/two-device, expiry, conflict, revoke and deletion suite passes |

Required transitions include first visit → return without Card; visitor → local
Card → same-device return; local Card → account claim when enabled; update →
all consumers; sign-out; two-tab/device; local/account conflict; privacy
change; and Card/account deletion or revocation. A local Card is not proof of
login, membership, synced ownership or public identity.

## Producer → store/service → Closet consumer map

| Capability/object | Producer(s) | Current store/service | Closet consumer/result | Current truth | Missing backend/integration |
|---|---|---|---|---|---|
| Resident Card and visible local Closet edits | MAiKEOVER and Closet editor | Versioned `laidies_resident_card_v1` browser-local envelope | Card/Closet restore on this device | Independent local Repair 2 passed atomic write, restore and failure behavior | Account migration/sync, merge/conflict and second-device restoration remain unverified |
| Account profile, handle and visibility | MAiKEOVER/Resident Card | Supabase Auth, profile/RPC/RLS paths | Own Closet identity and restricted public Card/Closet modes | Code, migrations and deterministic privacy fixtures exist; real service journey not accepted | Controlled email/auth, handle conflict, logout/login, visibility revoke, two-account RLS and second-device suite |
| Puffy book/section saves | LIBRAiRY | Canonicalized device-local Puffy records | Puffy Board reopens/removes exact valid book/section | Representative Library → Closet → exact section → remove journey verified locally | Account/cross-device save sync, merge/delete propagation and stale-content reconciliation |
| Puffy sticker pouch/preferences | Closet/Library | Browser-local Puffy preference records | Ten selected Puffy controls available on save surfaces | 10/10 selection and filtering verified locally | Account portability is not implemented/proven; all consuming save surfaces need version compatibility |
| Wednesday route/check-ins | Episode/town stops and Closet route controls | Browser-local weekly tour state | Weekly route vessel and local progress summary | Local mechanics exist | One released-week authority, semantic completion events, dedupe/reset, source-page proof and any account sync |
| Quiz progress and best score | SUNNYVAiLE High/quiz | Browser-local quiz records | Report Card/score summaries and local clip derivation | Selected local quiz behavior is verified; no mastery/account authority | Canonical assessment admission, account sync, duplicate/version handling and correction propagation |
| Butterfly Clips | Quiz/Express earn sources; Book Fair spend | Local derived earn plus `laidies_bookfair_redeemed` spend ledger | Clip jar/balance and claimed-drop status | Local foundation only | Authoritative append-only grant/reserve/spend/refund ledger; idempotency; insufficient funds; two-device balance; correction and fulfilment |
| Book Fair drops/Closet delivery | Book Fair redemption | Local redemption record | Promised item should appear in the named Closet vessel | Redemption UI/local record exists; delivery is not proven | Entitlement/item inventory, grant transaction, renderer binding, duplicate/refund and fulfilment evidence |
| Charms | Weekly building charm interactions | Browser-local charm-hunt state | Weekly bracelet and counts | Local collection rendering exists | Released-week manifest, exact source action, duplicate/reset/correction rules and optional account entitlement sync |
| Stickers and merit badges | Supported quizzes/Express/milestones | Mixed browser-local records | Sticker book and merit sash | Some local renderers exist | Canonical producer/event inventory, admission, dedupe/versioning, removal/correction and account synchronization |
| Trading cards | Blend & Snap/Study Pack candidates | Mixed or incomplete local records | Trading-card binder | Catalogue/rendering foundations only | Admitted pack/card registry, award/open/duplicate rules, concept-versus-character distinction and authoritative ownership |
| Detention slips and diary secrets | Town/game interactions | Browser-local candidate records | Detention board and locked diary | Vessels exist | Complete producer inventory, exact earning/completion events, correction/removal behavior and truthful empty/held states |
| LUMINAiRY selections | LUMINAiRY | Browser-local selected-person keys | “Your Luminaries” display/routes | Local selection sources observed | Editorial admission/freshness propagation, missing/removed-person recovery and any account sync |
| Building visits/membership cards | Shared visit tracker | `laidies_building_visits` browser-local record | Seventeen building cards/visit counts | Local visit state exists | Visit is not meaningful completion; needs route registry/versioning, honest semantics and no reward implication |
| FAiRY Plays | Reward earning sources and FAiRY consumption | Incomplete/mixed allowance and reward-event paths | FAiRY bank display; Godmother spend/refund | Shared contract not authoritative | One allowance ledger/API for grant/display/reserve/spend/release/refund, cost accounting, replay/idempotency and two-device consistency |
| BEST FRIENDS necklaces/referral result | Post Office invite/join lifecycle | Idempotent Supabase RPC design plus Closet renderer | Both residents receive/display a necklace half | Code/design evidence only; real lifecycle untested | Controlled send/open/join, self/invalid/repeat rules, two-account attribution, grant idempotency and both-account visibility |
| Backgrounds/unlocks | Card/Closet selection and proposed rewards | Currently selectable choices | Card/Closet background display | Choice works; ownership does not exist | Entitlement/availability rules or remove “unlock” language; revoke/refund/correction behavior |
| Public Closet/collections | Public card/Closet route | Restricted public profile view; collections intended private unless separately admitted | Another visitor sees only consented public data | Field-isolation fixtures exist | Real RLS/public/private/not-found test; explicit per-collection visibility contract; cache/revocation propagation |
| Episodes read/listened, Try-Ons, Girl Talk, postcards, Mix CDs and other dashboard candidates | Multiple buildings/services | Several producers absent or not authoritative | Proposed week grid/tiles | Product-spec candidates, not reliable data | Define each real completion event and store first; do not build a count whose producer does not exist |

## Cross-page transactions that must pass

1. **MAiKEOVER → Closet:** create, edit, failed write, reload and return preserve
   exactly one allowed card envelope on the same device.
2. **LIBRAiRY → Closet → LIBRAiRY:** save whole book/section, reopen exact
   valid destination, remove, handle held/renamed/deleted content and failed
   storage.
3. **High/Express → Clip ledger → Closet → Book Fair → Closet:** grant once,
   display one balance, reserve/spend once, deliver the exact item, refund on
   failed delivery and reconcile across two devices.
4. **Post Office → referral lifecycle → both Closets:** send, recipient open,
   valid join, no self/repeat farming, idempotent two-sided grant and visible
   result for both approved accounts.
5. **FAiRY earning source → Plays ledger → Godmother → Closet:** grant,
   display, reserve, spend only on typed success, release/refund on failure and
   consistent balance everywhere.
6. **Every collection producer → Closet:** create, duplicate, update,
   correction/removal and empty/failure states propagate without re-deriving
   conflicting totals.
7. **Own/private/public/account transitions:** local guest, signed-in owner,
   second device, signed-out return and another resident never leak or merge
   state incorrectly.

## Missing shared backend, ranked

| Priority | Gap | Required work | Shared owner | Acceptance proof / launch consequence |
|---|---|---|---|---|
| P0 | Canonical identity/profile/session contract unproved | Controlled Supabase Auth/profile/handle/visibility/RLS lifecycle plus local-to-account migration and conflict rules | Identity + Functionality & Platform | BUILD BEFORE LAUNCH: two accounts/two devices, private/public/not-found, logout/login, expiry/retry |
| P0 | No authoritative rewards/ownership ledger | Append-only event/entitlement schema and APIs for grant, reserve, spend, release/refund, correction and read model | Identity, Rewards & Connection + Platform | BUILD BEFORE LAUNCH: duplicate/replay, insufficient funds, failure/refund, two-device and exact delivery |
| P0 | Book Fair redemption does not guarantee Closet delivery | Transactionally bind spend to exact entitlement/inventory and renderer | Book Fair + Closet + Rewards | Item appears once or balance refunds; no success before fulfilment |
| P0 | FAiRY Plays do not share one accepted balance contract | One ledger/balance API used by earning sources, Godmother and Closet | FAiRY + Rewards + Platform | Success-only charge, failure refund, replay/idempotency, consistent two-device display |
| P0 | Referral/necklace lifecycle unproved | Controlled invite/open/join attribution and two-sided entitlement grant | Post Office + Closet + Rewards | Self/invalid/repeat/retry plus both-account result; otherwise hold necklace promise |
| P1 | Device-local collections lack versioned account synchronization | Per-object schemas, migration, merge/conflict, delete/correction and privacy rules | Closet + producer owners + Platform | Same objects reconcile across devices without duplication or leakage |
| P1 | Several dashboard vessels have no authoritative producer | Inventory every tile/vessel and define or remove its completion source | Closet + all producer owners | No visible count/empty promise without a real writer and failure state |
| P1 | Public Closet visibility is not fully specified/proven | Explicit allowlist/read model, cache invalidation and revoke behavior | Identity/Privacy + Closet | Real public/private/revoked/not-found isolation; collections private by default |
| P1 | Cross-product analytics semantics are not wired | Privacy-safe event dictionary for producer completion, Closet display/reopen and failures | Product owners + Platform | Production delivery test with no identity/content leakage |

## Honest current launch boundary

The same-device Resident Card envelope and representative Puffy round trip have
bounded local evidence. Accurate device-local copy is temporary truth, not the
intended completion. Account restoration, cross-device progression, shared
rewards, Book Fair delivery, FAiRY Plays, BEST FRIENDS referrals and several
dashboard collections remain **BUILD BEFORE LAUNCH** until their complete
producer/backend/consumer journeys pass.
