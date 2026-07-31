# The Mall functionality and cross-page touchpoint map

**Status:** FUNCTIONALITY RECOVERED AT CONTRACT LEVEL — complete source/tree
inventory recorded; editorial admission, generic local-persistence integrity,
native accessibility, provider, shared identity/rewards/commerce/fulfilment,
deployment and public-origin proof remain open.

**Product/building owner:** Mall champion

**Functionality & Platform Director:** review required

**Evidence ceiling:** repository source, registry, operating records and the
2026-07-26 independent Mall Repair 1 rejudge were inspected. No external
provider, real commerce, account, two-device, fulfilment, return/refund,
deployment or public-origin transaction was performed.

## 1. Complete building and capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Shared building arrival/header/tour/KSVL | Open `/mall.html` | Recognize The Mall, navigate shared town controls and optionally use separately governed media/tour controls | HTML plus shared modules observed; shared outcomes are not Mall completion | OBSERVED |
| Atrium identity | Open `/mall.html` | Establish Centre Court/fountain/place before actions | Approved structural source and rendered local evidence | VERIFIED LOCALLY — visual owner/public holds |
| Mall wish | Activate `#mallWish` | Show “remembered privately on this device · no reward” | `mall-v2.js` writes `laidies_mall_wish`; write failure is swallowed and no read-after-write occurs | BUILDING — false-success risk |
| Gift Shop status/route | Read directory status on `/mall.html` | Understand browse-only/till-closed boundary and enter `/shop.html` | Visible truthful row and registered route | VERIFIED LOCALLY — commerce remains held |
| Unit 11 status/route | Read directory status on `/mall.html` | Understand external Hyvor handoff and no-guarantee boundary | Visible copy and `/community/burn-book.html` route | VERIFIED LOCALLY for handoff copy; provider outcome unverified |
| Search input/find/reset | Type/click/Enter/Escape on `/mall.html` | Deterministically filter admitted preview departments and announce count | `mall-v2.js`; source/exact-artifact browser evidence | VERIFIED LOCALLY |
| No-result state | Submit unmatched text | Explain no result, echo as text, offer optional Unit 11 | Injection/focus/announcement evidence; raw query not placed in URL | VERIFIED LOCALLY |
| Corridor previous/next/arrow keys | Use controls or keyboard | Move one storefront and announce position/name | `mall-v2.js`; rendered keyboard evidence | VERIFIED LOCALLY — native AT/device open |
| Ten department representations | Directory/corridor | Enter each admitted route once; held routes remain non-enterable with safe fallback | Register/render parity and all ten routes tested; Pieces of FLAiR held | VERIFIED LOCALLY at admission/route layer |
| Generic shop arrival/room | Enter one of nine generic-config routes | Transform inline list into interior zones, selection, explanation and return | `mall-shop-v2.js` has configs for nine routes; local route evidence | OBSERVED; full content/native review open |
| Generic shop zone/search/list selection | Hotspot, query or stock button | Filter the route's inline reference inventory and select one item | Client-only configuration and DOM rebuild | OBSERVED |
| Generic shop add/remove pile | Shop-specific action/remove | Toggle one label in the route's named pile/tray/bench/list | `laidies_mall_shop_<slug>` local array; writes swallow failure | BUILDING — persistence truth/versioning/failure gap |
| Generic shop return | Exit link | Return to `/mall.html` | Present on all ten canonical routes in deterministic evidence | VERIFIED LOCALLY |
| Pieces of FLAiR fixtures/reel | Direct route; room/previous/next/item | Browse twenty local avatar/accessory objects | `mall-flair-v2.js` and local assets | OBSERVED; route promotion held |
| Pieces of FLAiR carry/remove | Activate `#flairCarry` | Write/remove one Card presentation choice and show exact consumer result | `laidies_carry`; direct write/remove with swallowed failure; `/laidies-card.html` handoff | BUILDING — producer/consumer proof missing |
| Legacy CLAiRE'S redirect | Open `/mall/claires.html` | Preserve old inbound route and land on canonical Pieces of FLAiR | Canonical/meta refresh compatibility source observed | OBSERVED — redirect/public proof required |
| Gift Shop room/hotspots/departments/product list | Open `/shop.html`, inspect fixtures/list | Browse truthful source-art/text-only merchandise concepts | `shop-v2.js`; stable `#shopProduct` independently passed | VERIFIED LOCALLY at concept-browse scope |
| Gift Shop working prices/tags | Select concept | Present non-operative concept labels without availability inference | Prices remain working labels; unsupported Bestseller/Restock/Made-to-order removed | VERIFIED LOCALLY — real price proof absent |
| Gift Shop interest save/remove | Activate local interest/Puffy control | Atomically save/remove a private device-local interest or state “Nothing changed” | `laidies_puffies_board`, storage probe, shared Puffy event reconciliation; Repair 1 rejudge pass | VERIFIED LOCALLY on same device |
| Gift Shop held count | Save/remove interest | Count only current device records | Rendered local pass; not stock/reservation/ownership | VERIFIED LOCALLY at device scope |
| Gift Shop buy/checkout | Select product | No live buy control until a real offer lifecycle exists | All current `buyUrl` values held; till copy explicit | MISSING — BUILD BEFORE COMMERCIAL RELEASE |
| Gift Shop gifting | Select giftable product | No send/delivery promise until provider lifecycle exists | Disabled until till opens | MISSING — BUILD BEFORE COMMERCIAL RELEASE |
| Gift Shop Closet exit | Open `/laidies-card.html` | Show only exact valid device-local Puffy interest | Producer exists; complete consumer round trip needs exact Mall-specific proof | BUILDING |
| Shop source/currentness/rights/correction | View any reference/product | Display only admitted, current, correct and rights-safe inventory | Readiness register records gaps; no child dossiers/correction service | MISSING — FIX BEFORE LAUNCH |
| Privacy-safe analytics | Entry/search class/handoff/failure | Aggregate structural outcome without raw query/item/identity | Plausible/Clarity embeds exist; product event delivery not wired | MISSING/INTENTIONAL LATER only if not claimed |
| Rewards/entitlements | Any Mall action | No reward today; future grant only after authoritative completion/ledger | Explicit no-reward boundaries; no Mall reward producer | NONE CURRENT; SHARED BUILD REQUIRED before future claim |
| Real account/cross-device state | Sign in/return elsewhere | No account-backed Mall claim today; future restore obeys shared identity/sync | No accepted Mall account integration | MISSING — SHARED BUILD REQUIRED |
| Commerce/affiliate/stock/fulfilment/returns | Future buy path | Exact offer → authorized payment → production/stock → delivery → return/refund | No provider, authoritative order, inventory or policy proof | MISSING — SHARED BUILD REQUIRED |

## 2. Owned shop tree and producer inventory

| Product/node | Runtime producer | Visitor action/result | Store/service | Consumers/return | Current launch truth |
|---|---|---|---|---|---|
| Mall shell | `mall.html`; `content/site/mall-v2.js`; readiness register | Search, browse, wish, route handoff | DOM plus `laidies_mall_wish` | Ten shops, Gift Shop, Unit 11; return `/mall.html` | Shell mechanics bounded local pass; wish write truth incomplete |
| Pieces of FLAiR | `mall/pieces-of-flair.html`; `mall-flair-v2.js`; avatar assets | Browse, select, carry/remove one object | `laidies_carry` local key | `/laidies-card.html`; `/mall.html` | HOLD PROMOTION; Card producer/consumer and denied-write proof missing |
| MAiYBE | Inline item list; `mall-shop-v2.js` config | Build a beauty-routine reference pile | `laidies_mall_shop_maiybe` | Same route pile; Mall return | Labelled preview; content/rights/currentness and persistence truth open |
| As Seen on TV | Inline film/TV lists; generic config | Queue a cultural reference/watchlist | `laidies_mall_shop_as-seen-on-tv` | Same route list; Mall return | Labelled preview; content/rights/currentness and persistence truth open |
| Rollin' with my Homies | Inline people/character lists; generic config | Save “energy” to a call sheet | `laidies_mall_shop_rollin-with-my-homies` | Same route list; Mall return | Labelled preview; likeness/identity/rights and persistence truth open |
| Books and Records | Inline list; generic config | Put a book/song/soundtrack reference on counter pile | `laidies_mall_shop_books-and-records` | Same route list; Mall return | Labelled preview; citations/rights/currentness and persistence truth open |
| Gizmos and Gadgets | Inline list; generic config | Place behaviour-linked object on demo bench | `laidies_mall_shop_gizmos-and-gadgets` | Same route list; Mall return | Labelled preview; fact/trademark/currentness and persistence truth open |
| Hanger Management | Inline list; generic config | Take style pieces to fitting room | `laidies_mall_shop_hanger-management` | Same route list; Mall return | Labelled preview; rights/currentness and persistence truth open |
| Food Court | Inline list; generic config | Add food/drink reference to tray | `laidies_mall_shop_food-court` | Same route list; Mall return | Labelled preview; fact/trademark/currentness and persistence truth open |
| Last Summer | Inline list; generic config | Pin a specific memory to scrapbook | `laidies_mall_shop_last-summer` | Same route list; Mall return | Labelled preview; rights/currentness and persistence truth open |
| Mall Kiosk | Inline list; generic config | Keep/spin bounded novelty item | `laidies_mall_shop_mall-kiosk` | Same route list; Mall return | Labelled preview; fact/trademark/currentness and persistence truth open |
| Legacy CLAiRE'S | `mall/claires.html` | Redirect only | Browser navigation | Canonical Pieces of FLAiR | Compatibility, not inventory |
| Gift Shop | `shop.html`; `shop-v2.js`; source-art assets; Puffy adapter | Inspect concept; save/remove device interest | `laidies_puffies_board`; no commerce service | Closet/Card and Mall | Browse/local-interest only; all commerce/fulfilment/returns held |
| Unit 11 | Mall link; `community/burn-book.html`; Hyvor | Optional suggestion/community action | External Hyvor identity/moderation | Community outcome; Mall fallback | Handoff only; sign-in/provider/moderation/publication/reward unverified |

The nine generic shop arrays are not authoritative ownership, purchase,
reservation, reward or cross-device saves. They contain labels derived from
inline page inventory and have no schema version, item ID, timestamp,
read-after-write, conflict, migration, correction or consumer contract.

## Visitor-state recognition and continuity

This is section 3 of the functionality recovery and deliberately separates
four proof scopes.

| Visitor scope | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time | Absence of valid relevant local keys only; no identity inference | Empty wish/shop piles/Puffy/Card choice | Full status/orientation; no member copy | Search/browse; optional device-local writes; optional disclosed Hyvor handoff | Child routes return to Mall | No-result and held routes bounded; generic storage/provider failures incomplete | SPECIFIED / PARTIAL LOCAL PROOF |
| Returning, no Card | Valid Mall/shop/Puffy local records may show same-browser continuity only | Current valid keys after catalogue reconciliation | Resume useful pile/interest; changed states still explained | Same device only; no account/ownership/reward | Same shop and Closet only where exact key contract exists | Corrupt/denied/migrated generic keys must fail visibly; not implemented | BUILDING |
| Resident Card — device-local | Valid Card is separate from Mall records; `laidies_carry` is only proposed Card-linked producer | Card plus exact local Mall keys, never implicitly merged | Pieces of FLAiR may improve Card presentation; other shops unchanged | Same-device local writes after atomic proof | Exact Card/Closet consumer only | Write/remove denial, conflict and Card deletion propagation missing | HOLD for Pieces of FLAiR; no extra capability elsewhere |
| Resident Card — verified account-backed | Accepted auth/profile session only | No Mall account store currently exists | No approved difference today | No Mall account, sync, entitlement or purchase write | None proved | Sign-out, expiry, two-device, merge, revoke/delete must remain honest | BLOCKED — SHARED BUILD REMAINS REQUIRED |

Required transition suite: clean visit → return without Card; return → local
Card; Pieces carry → Card → reload → remove; local Card → account claim; sign
out; two tab/device; corrupted or denied storage; catalogue rename/removal;
account/local conflict; privacy change; Card/account deletion/revoke. Only the
clean shell and Gift Shop same-device storage-denied subset currently has
bounded evidence.

## 4. Producer → frontend → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/key | Consumers | Scope | Current truth |
|---|---|---|---|---|---|---|---|
| Mall wish | `#mallWish` click | `mall-v2.js` | None | `laidies_mall_wish` | Mall hero on reload | device | Write failure swallowed; visible success is not authoritative |
| Search result | Query input/Find/Escape/reset | `mall-v2.js` | None | DOM `data-search`; readiness admission is separate | Directory/no-result/route | session | Deterministic local pass; no raw-query analytics allowed |
| Route admission/status | Mall render/build process | `mall.html` + readiness checker | None | `route-readiness-register.json` as evidence; HTML at runtime | Directory/corridor/child route | public artifact | Exact local parity pass; public origin not proved |
| Generic shop pile | Item toggle/remove | `mall-shop-v2.js` | None | `laidies_mall_shop_<slug>` | Same shop only | device | No atomic verification, schema, stable ID, failure status or other consumer |
| Carried Card object | Pieces carry/remove | `mall-flair-v2.js` | Shared Card contract absent | `laidies_carry` | `/laidies-card.html`, MAiKEOVER/Card surfaces that read key | device | Consumer binding and failed write/remove proof unaccepted |
| Gift Shop interest | Interest/Puffy chooser | `shop-v2.js`; `puffy-bookmarks.js` | None | versioned `laidies_puffies_board` | Gift Shop held count; Closet/Puffy Board | device | Representative atomic save/remove/failure passed locally |
| Unit 11 suggestion/post | Link then provider UI | Community route/Hyvor embed | Hyvor | Hyvor account/moderation store | Community display/moderation; possible staff review unknown | external account/provider | Mall proves only disclosed handoff, not accepted/visible/moderated result |
| Future order | Buy/checkout trigger | MISSING | Provider, tax/payment, inventory, production and shipping services MISSING | Order/payment/inventory/fulfilment records MISSING | Confirmation, support, Closet entitlement if approved | account/order | No authoritative lifecycle exists |
| Future return/refund | Order support trigger | MISSING | Commerce/fulfilment provider MISSING | Return authorization/refund/order status MISSING | Customer, payment, inventory, entitlement, analytics | account/order | No policy, service or propagation exists |
| Future reward/entitlement | Approved meaningful completion | MISSING Mall producer | Shared economic ledger | Append-only grant/reserve/spend/refund projection MISSING | Closet/balance/source product | account/cross-device | Mall actions currently grant none; shared platform packet owns any future system |
| Analytics outcome | Entry/result-count bucket/handoff/failure | MISSING product event adapter | Shared privacy-safe analytics | Aggregate event pipeline MISSING | Mall champion/customer evidence | aggregate | Plausible/Clarity tags do not prove event delivery or value |

## 5. End-to-end transaction contracts

### 5.1 Mall wish

`discover → click → attempt local write → read after write → show private
same-device state → reload → remove/reset if intended`

Current code skips read-after-write, exposes no remove/reset and paints success
after caught failure. Required authoritative completion is a successful
round-trip of the timestamp, with a visible “nothing changed” failure and no
reward event. Duplicate clicks may update one record but must never create a
count or entitlement.

### 5.2 Generic shop pile

`enter admitted shop → choose zone/item → validate stable admitted item ID →
write versioned local record → read after write → announce add/remove → reload
same route → reconcile renamed/held/removed item → return to Mall`

Current implementation stores item display names and catches failures without
changing the visible result. Required local completion uses stable shop/item
IDs, schema/content versions, bounded size, atomic read verification, visible
failure, idempotent add/remove, catalogue correction/removal and cross-tab
conflict rules. Whether these piles should persist at all is an owner/platform
decision; current code is not the governing intent.

### 5.3 Pieces of FLAiR → Resident Card

`enter direct/admitted route → choose object → validate admitted object ID →
write/remove → read after write → Card consumer displays/removes exact object
→ reload → Card update/delete/revoke propagation`

Current string key has no schema, content version, failed-write truth or
accepted consumer suite. The Card handoff remains held. Account sync may not
be added locally; it queues behind the shared identity/persistence contract.

### 5.4 Gift Shop interest → Closet

`inspect concept → choose device-local interest → storage preflight →
versioned Puffy write/remove → read verification/shared event → visible
success/failure → Closet displays exact valid record → reopen/remove`

The bounded source/exact-artifact save/remove/denial behavior passed Repair 1.
Still required: exact Gift Shop → Closet → Gift Shop round trip for current,
renamed, held and removed concepts plus native accessibility and public-origin
evidence. An interest is not stock, reservation, purchase, ownership or an
account entitlement.

### 5.5 Unit 11 external handoff

`read disclosure → choose external discussion → provider availability/auth →
validate/submit → provider accepted result → moderation visibility/disposition
→ retry/duplicate/remove → Mall return`

The Mall currently proves only the disclosed navigation. Identity, accepted
submission, moderation, publication, retry, duplicate, deletion and provider
failure belong to Community/Hyvor and require a controlled provider suite.
No state in this lifecycle grants a shop or reward.

### 5.6 Future commerce, fulfilment, return and refund

`admitted offer → truthful price/stock/disclosure → identity or guest checkout
rule → authorize payment → authoritative order → reserve inventory/production
→ ship/deliver → read order status → support → cancel/return → refund →
inventory/entitlement/analytics propagation`

Every service, store and policy in this chain is missing or unproved. The
commercial surface remains `BLOCKED — BUILD REMAINS REQUIRED` if commerce is
approved for the current release, otherwise it requires an explicit named
later-release decision. A browse-only concept counter is truthful containment,
not completed commerce.

## 6. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke/refund propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Mall route verdict changes | Directory, corridor, direct route, shared town directory | destination ID/verdict/version | `/mall.html` and child route | Must fail closed everywhere in same candidate | Held/retired removes enterable links, preserves explanation | Register/render deterministic local test exists |
| Generic shop add/remove | Same shop only unless a new contract is approved | stable shop/item/content IDs required | exact shop route | Rename/hold must reconcile | Remove deletes exact local record | Missing |
| Pieces carry/remove | Resident Card/Closet | stable object/content ID required | `/laidies-card.html` and source route | Card reflects current allowed object | Source remove, Card deletion/revoke and corrupt state agree | Missing |
| Gift Shop interest save/remove | Gift Shop count, Closet/Puffy Board | versioned Puffy record | `/shop.html` and Closet exact source | Changed/held concept remains truthfully identified | Remove propagates; future revoke/correction required | Bounded local denial proof; full round trip open |
| Unit 11 submit/moderate/remove | Hyvor/community and any approved staff intake | provider post/receipt ID | community route + Mall fallback | Provider status only | Provider deletion/moderation must not leave Mall promise | Controlled provider evidence missing |
| Future order/return/refund | Checkout, order status, support, inventory, fulfilment, payment, entitlement, analytics | order/item/customer scope under approved privacy rule | order detail and Mall/Gift Shop | Status changes propagate once | Cancel/return/refund/revoke all consumers atomically | Entire lifecycle missing |
| Future reward grant/correction | Source product, ledger, Closet/balance | authoritative completion/grant ID | exact source/result | Ledger projection updates | Correction/revoke/refund updates all consumers | Shared economic vertical not accepted |

## 7. Missing backend and integration register

| Gap | User consequence | Required work | Shared contract owner | Mall owner responsibility | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Generic shop persistence has no authoritative local contract | Saved pile may lie, corrupt or disappear | Stable IDs, schema/content version, atomic read/write/remove, limits, migration, conflict and visible failure—or deliberately make state session-only | Functionality & Platform | Decide value; supply all nine producer/return scenes | `content/site/mall-shop-v2.js`; nine shop sources; tests | Clean/return/denied/corrupt/rename/remove/two-tab matrix | BUILD BEFORE LAUNCH for any persistent promise |
| Pieces/Card transaction unproved | “Carry on my Card” may not appear or remove | Versioned object contract and exact Card consumer suite | Identity + Functionality & Platform | Maintain admitted object inventory and source UX | `mall-flair-v2.js`; Card/Closet consumer paths | Create/read/reload/remove/denied/corrupt/Card delete; same-device language | BLOCKED — BUILD REMAINS REQUIRED; HOLD PROMOTION |
| No account/cross-device sync | Signed-in resident could infer restoration/ownership | Accepted identity session, per-object sync/migration/conflict/revoke/delete | Identity + Functionality & Platform | Do not add parallel account store | Shared identity packet/services | Two accounts/devices, sign-out, conflict, revoke/delete | BLOCKED — BUILD REMAINS REQUIRED before claim |
| No reward/economic ledger | A future Mall reward could duplicate or misstate ownership | Shared append-only grant/display/reserve/spend/refund/correction ledger | Rewards + Functionality & Platform | Keep all current actions no-reward | Shared economic packet/services | Duplicate/replay/failure/refund/two-device/consumer agreement | BLOCKED — BUILD REMAINS REQUIRED before claim |
| No commerce/order system | Concepts cannot be bought truthfully | Product/offer catalogue, price/stock authority, checkout/payment, tax/privacy, order store and support | Commerce/Revenue + Functionality & Platform | Supply approved assortment and honest UX requirements | Provider(s), schemas, Gift Shop frontend | Guest/account rules; payment success/failure/timeout/idempotency; order readback | BLOCKED — BUILD REMAINS REQUIRED if current-release commerce |
| No fulfilment/shipping | Payment could occur without delivery proof | Inventory/production reservation, shipment, tracking, loss/damage/support | Commerce/Fulfilment + Platform | Define exact product promise and fallback | Provider(s), order/fulfilment webhooks/jobs | Paid order → exact item delivered or compensated; retries/duplicates | BLOCKED — BUILD REMAINS REQUIRED |
| No return/refund/revoke propagation | Visitor cannot reverse purchase or entitlements may remain wrong | Return policy, authorization, refund transaction, inventory and entitlement reconciliation | Commerce/Fulfilment + Rewards + Platform | Make policy visible at offer/checkout/support | Provider(s), order/refund/entitlement records | Cancel/partial/full return, provider failure, refund and all-consumer reconciliation | BLOCKED — BUILD REMAINS REQUIRED |
| Unit 11 provider lifecycle unproved | Suggestion may fail or moderation/publication may be misunderstood | Controlled Hyvor auth/post/moderate/retry/delete/provider-failure suite and privacy copy | Community + Functionality & Platform | Preserve optional/no-guarantee Mall handoff | `community/burn-book.html`; Hyvor | Accepted/visible/held/removed/error/duplicate/sign-in plus Mall return | FIX BEFORE LAUNCH if promoted |
| Editorial/rights/correction authority incomplete | Thin, stale, inaccurate or infringing references may appear open | Child dossiers, source/rights/currentness admission and correction/retraction job | Editorial/rights + Control Room | Maintain tree/register; coordinate ten shop owners | Ten shop sources, assets, readiness register | Representative then complete source/rights/correction review | FIX BEFORE LAUNCH |
| Product analytics not wired | Owner cannot learn whether visitors find useful context | Privacy-safe event adapter/dictionary/delivery health and aggregate review | Analytics + Functionality & Platform | Define semantics; prohibit raw queries/items/Card/provider content | Shared event pipeline | Production delivery, privacy review, owner dashboard/baseline | INTENTIONAL LATER only if no current-release learning-loop claim |
| Exact public release evidence missing | Local PASS could be mistaken for public result | Manifest-bound artifact/deploy/public-origin/provider/rollback suite | Control Room/Release | Supply exact Mall tree acceptance scenes | Build/deploy pipeline and public routes | Candidate hash, public routes/redirects/runtime/native checks, rollback | FIX BEFORE REOPENING |

## 8. Shared-contract collision check

- **Identity/account/profile/permissions:** no local Mall account system may be
  invented; consume the accepted shared identity contract only.
- **Saves/progression/Closet:** Gift Shop uses the canonical Puffy board;
  `laidies_carry` and nine shop arrays must be reconciled before promotion and
  must not create competing ownership semantics.
- **Rewards/economy/ownership/fulfilment:** current Mall actions grant none.
  Future entitlements, purchases and refunds use the shared economic/order
  contracts.
- **Community/moderation:** Unit 11 consumes the Community/Hyvor contract; the
  Mall owns only the disclosed optional handoff and safe return.
- **Content/media admission and freshness:** each shop owner supplies sources,
  rights/currentness and correction behavior; Mall controls admission.
- **Analytics/customer evidence:** shared aggregate dictionary only; raw
  queries, item names, Card/account data and community content are prohibited.
- **Release/build/runtime dependencies:** Control Room binds registry, source,
  exact artifact, redirect, deployment, providers and rollback.

All shared commerce, fulfilment, return/refund, identity, reward, account-sync
and analytics work is queued—not implemented—by this dossier.

## 9. Verification and approval

The Mall owner must verify this entire element/tree inventory and the intended
result. Each shop subchampion must confirm its source, action, status,
failure/return behavior and correction trigger. Functionality & Platform must
approve shared stores, identity/persistence scope, commerce/fulfilment and
collision handling. Community, Resident Card/Closet, Editorial/Rights,
Rewards, Commerce and Analytics owners verify their side of every handoff.
Independent judges run source, exact-artifact and public-origin journeys.
Control Room owns integration order, release state and rollback.

The Mall is not functionally complete until every promoted node and visible
action has an honest disposition and every current-release producer → store or
service → consumer → update/remove/revoke/refund → return journey passes at
its claimed visitor scope.
