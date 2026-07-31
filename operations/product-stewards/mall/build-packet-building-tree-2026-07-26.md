# The Mall complete building/tree build packet

**Status:** SPECIFIED — executable packet; implementation has not begun.

**Trigger:** permanent Mall ownership initialization, targeted owner-entry
failure and D-2026-07-26-052–055.

## Outcome

- **Product:** The Mall (`mall`), including Centre Court, ten canonical
  reference departments, the CLAiRE'S compatibility redirect, Gift Shop and
  Unit 11.
- **User problem:** a coherent shell can still promote thin, stale or
  non-authoritative child experiences; device-local controls can paint
  identity/ownership-like continuity; and commerce-shaped concepts lack the
  complete order, fulfilment and return lifecycle.
- **Intended outcome:** every admitted node has a useful shop job, complete
  source/rights/state record, accessible producer-to-result journey, honest
  visitor-scope behavior and exact return; every shared dependency is
  implemented once by its platform owner and verified end to end.
- **Evidence:** `EXPERIENCE-BRIEF.md`, `FUNCTIONALITY-MAP.md`,
  `route-readiness-register.json`, the Repair 1 evidence/rejudge, current HTML
  and Mall/Gift Shop runtime modules.
- **Scope:** dossier recovery; child owner-entry recovery; content admission;
  Mall/child local mechanics; shared-contract requests; controlled provider
  proofs; independent exact-candidate and public-origin release evidence.
- **Explicit non-goals:** no parallel identity, rewards, order, inventory,
  fulfilment, refund or analytics system; no commerce activation by relabelling
  the browse-only counter; no owner visual decision by implementation default;
  no deployment/publication from this initialization packet.

## Accepted direction

Keep the Centre Court → directory → corridor → shop ritual and make admission,
local state and cross-page results fail closed. Treat each child as a product
with its own dossier, source authority and acceptance scene. Queue shared
identity, persistence, rewards, commerce, fulfilment, return/refund and
analytics vertically through Functionality & Platform and Control Room.

No external tool, plugin, vendor or service is approved by this packet.
Commerce/provider scouting starts only after the approved offer and
fulfilment/return requirements exist; any recommendation must include cost,
privacy, accessibility, lock-in and exit evidence.

## Work breakdown and write boundaries

| ID | Work item | Craft owner | Inputs | Output path/write boundary | Dependencies | Status |
|---|---|---|---|---|---|---|
| MALL-TREE-00 | Bind permanent owner entry and freeze recovered intent/map | Mall champion | Current dossier and locked decisions | `operations/product-stewards/mall/**` only | None | BUILT LOCALLY — this packet/brief/map |
| MALL-TREE-01 | Recover eleven registry-bound child dossiers; reconcile whether legacy CLAiRE'S remains a distinct child or an alias inside Pieces of FLAiR; record Gift Shop/Unit 11 ownership without changing registry unilaterally | Mall champion + eleven registered shop subchampions; Control Room for registry | Registry rows, route register, source pages | `operations/product-stewards/mall/shops/*.md`; Mall evidence only; registry change queued separately | MALL-TREE-00 | SPECIFIED |
| MALL-TREE-02 | Admit every reference/item/asset with source, rights/trademark/likeness, checked date, correction and retirement behavior | Editorial/learning + rights/legal + child owners | Inline lists/assets and child dossiers | Mall child dossiers/evidence; no public source mutation in this lane | MALL-TREE-01 | SPECIFIED |
| MALL-TREE-03 | Reconcile nine generic shop piles: deliberately session-only or versioned device-local; implement stable IDs, atomic failure truth and catalogue correction | UX + frontend + Functionality & Platform | Functionality map and MALL-TREE-02 admitted IDs | Candidate frontend/tests only after platform sign-off; dossier records here | MALL-TREE-02, shared local-persistence ruling | SPECIFIED |
| MALL-TREE-04 | Prove Pieces of FLAiR → Resident Card create/read/reload/remove/deny/corrupt/delete transaction | Pieces owner + Resident Card/Closet + identity/data + frontend | `laidies_carry`, Card consumers, admitted object registry | Shared implementation queued through Functionality & Platform; Mall evidence records receipts | MALL-TREE-02, identity/persistence contract | BLOCKED — BUILD REMAINS REQUIRED |
| MALL-TREE-05 | Complete Gift Shop → Puffy/Closet round trip for current/renamed/held/removed concepts | Gift Shop + Closet + frontend + accessibility | Existing Repair 1 local pass | Candidate shared/source paths by affected owners; Mall evidence receipts | MALL-TREE-02 | SPECIFIED |
| MALL-TREE-06 | Define approved commerce assortment and full provider-neutral order/fulfilment/return/refund contract | Mall/Gift Shop + revenue + commerce/fulfilment + privacy/legal | Approved product decision, not current concept labels | Platform/commerce build packet through Control Room; Mall requirement/evidence only | Ali/product assortment decision; platform architecture | BLOCKED — BUILD REMAINS REQUIRED if current-release commerce |
| MALL-TREE-07 | Build one accepted order vertical: price/stock/disclosure → payment → order → fulfilment → delivery → cancel/return/refund → entitlement reconciliation | Functionality & Platform + commerce/fulfilment + rewards/data + security | MALL-TREE-06 | Shared platform/services only under Control Room; no Mall-local ledger | Identity/privacy, provider authority, test data and spending approval as applicable | BLOCKED — BUILD REMAINS REQUIRED |
| MALL-TREE-08 | Prove Unit 11 provider/auth/moderation/failure/delete lifecycle with no reward/shop guarantee | Community + Hyvor owner + security/privacy + accessibility | Existing handoff copy and provider contract | Community/provider paths; Mall evidence only | Approved controlled test identities/data | BLOCKED — BUILD REMAINS REQUIRED if promoted |
| MALL-TREE-09 | Implement privacy-safe Mall outcome events and delivery health without raw queries/items/identity/community content | Analytics + Functionality & Platform + Mall owner | Shared event dictionary and exact completion semantics | Shared analytics adapter/dictionary via Control Room | Accepted product metrics/privacy review | SPECIFIED; later only if no current claim |
| MALL-TREE-10 | Complete native accessibility, real-device, slow/offline/provider and redirect tests across the entire tree | Accessibility + QA automation + affected owners | Exact candidate from prior items | Tests/evidence; source changes only through owning implementation lanes | MALL-TREE-03–09 as applicable | SPECIFIED |
| MALL-TREE-11 | Independent product/trust/brand/UX/technical/commerce judgment and exact release/public verification | Independent judges + release manager | Manifest-bound candidate and all receipts | Mall evidence plus release records | All current-release items pass | SPECIFIED |

## Executable sequence and gates

### Gate A — owner-entry and child truth

1. Run `node scripts/check-product-stewards.mjs --owner-entry mall`.
2. Create the eleven registry-bound child dossier records under
   `operations/product-stewards/mall/shops/`.
3. Reconcile the separately registered `mall-claires` compatibility child with
   canonical `mall-pieces-flair` through Control Room; do not infer that a
   redirect is a distinct product or silently delete a registered owner.
4. For each child, record purpose, admitted inventory IDs, source/currentness,
   rights/likeness/trademark state, action, local state, failure, correction,
   return, visitor-scope matrix and launch verdict.
5. Ask Control Room to decide/register distinct Gift Shop and Unit 11 ownership
   rather than modifying shared registry state from the Mall lane.
6. Gate passes only when targeted Mall entry passes and each dispatched child
   owner entry resolves to a real dossier/state.

### Gate B — complete local tree contract

1. Reconcile all ten child sources with the readiness register.
2. Make every held/retired state fail closed in directory, corridor, direct
   route and shared directory consumers.
3. Resolve generic pile intent, then implement the approved session/local
   contract with stable IDs and visible denied/corrupt/update/remove behavior.
4. Pass Pieces/Card and Gift Shop/Closet round trips at device-local scope.
5. Run:
   - `node scripts/check-mall-readiness.mjs`
   - the repository's installed Playwright command for
     `scripts/test-mall-browser.mjs`
   - `node scripts/check-inline-js.js`
   - `node scripts/check-local-links.mjs` or the current canonical local-link
     checker
   - `node scripts/check-town.mjs` or the current canonical town checker
   - `node scripts/check-product-stewards.mjs --owner-entry mall`
6. Add deterministic cases for nine shop keys, Mall wish, Pieces/Card,
   Gift Shop/Closet, held-route drift, catalogue rename/removal, denied/corrupt
   storage, legacy redirect and four visitor scopes.

### Gate C — shared platform verticals

Control Room sequences these shared packets; the Mall does not edit their
files:

1. accepted identity/profile/RLS/two-account/two-device vertical;
2. accepted local-to-account persistence/merge/revoke/delete contract for only
   the Mall objects explicitly approved for sync;
3. accepted economic entitlement ledger before any reward/ownership claim;
4. approved provider-neutral commerce/order/fulfilment/return/refund
   architecture and one exact end-to-end order;
5. controlled Hyvor lifecycle;
6. privacy-safe analytics delivery.

Every vertical returns an artifact/service identity, test-data scope,
authoritative completion receipt, retries/idempotency, cleanup, rollback and
affected-consumer proof to the Mall dossier.

### Gate D — independent acceptance and release

Maker and judge remain separate. Build a fresh exact artifact, bind hashes for
all governed Mall/child/shared-runtime files, and run desktop/mobile/native
screen-reader/zoom/reduced-motion/slow/offline/provider tests. A release
manager then proves deployment identity, all routes/redirects, public-origin
journeys, provider status and rollback. Local, deployed and publicly verified
remain separate statuses.

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Required result |
|---|---|---|---|
| Product/content quality | All nodes have a specific useful job; complete admitted inventory/source/correction records; newcomer and return comprehension | Product/UX judge | At least 17/20 and no open current-release tree debt |
| Complete tree/cross-building journey | Shell plus ten shops, redirect, Gift Shop, Unit 11; create/read/update/remove/revoke/refund/return as applicable | Independent integration judge | Every promoted current-release node passes at claimed scope |
| Accuracy, safety and trust | Rights/currentness/likeness/trademark; no false identity/reward/stock/order/fulfilment/moderation claim | Accuracy/rights/privacy judges | At least 17/20; no disclaimer contradicts point-of-action copy |
| Positive LAiDIES contribution | Object-world rituals feel specifically LAiDIES and cultural shorthand supports rather than replaces teaching | Brand judge who did not make assets | At least 17/20 plus owner taste approval where required |
| UX and accessibility | Four visitor scopes; keyboard, screen reader, 200%, 320/400%, touch, reduced motion, error/retry/return | Accessibility judge | Complete equivalent journey on desktop/mobile/native AT |
| Frontend/backend/data integrity | Stable IDs, schema/version, read-after-write, conflict, idempotency, exact consumer propagation and rollback | Technical/data judge | No success before authoritative completion |
| Commerce/fulfilment when activated | Offer, disclosure, payment, order, production/stock, delivery, support, cancel/return/refund and entitlement correction | Commerce/legal/release judges | One exact successful order and full adversarial/failure suite |
| Release/public truth | Manifest/hash → artifact → deployment → public origin → rollback | Release manager | Separate `DEPLOYED` then `VERIFIED PUBLICLY` receipts |

## Integration and release

- **Affected owners:** eleven registered shop subchampions (ten canonical
  departments plus the CLAiRE'S compatibility child pending reconciliation);
  Gift Shop; Unit 11/Community;
  Resident Card/Closet; Editorial/Rights; Brand; Functionality & Platform;
  Identity; Rewards; Commerce/Fulfilment; Analytics; Release.
- **Shared dependencies:** identity, local/account persistence, rewards,
  order/fulfilment/refund, community moderation, analytics and release.
- **Exact candidate:** not yet built; it must be a manifest-bound source/artifact
  produced after all accepted current-release work.
- **Release authority:** Portfolio Control Room/release manager under the
  applicable public approval.
- **Rollback:** preserve the independently passed browse-only Repair 1
  candidate and machine admission register as the safe local baseline; any
  commercial/provider feature must have an independent disable/rollback that
  does not misstate completion.
- **Public verification:** all exact Mall routes, CLAiRE'S redirect, held
  admission, four visitor scopes, cross-page local state, providers and any
  commerce lifecycle on the deployed origin.

## Measurement and learning

- **Baseline:** no privacy-safe Mall discovery baseline is wired.
- **Signals:** admitted-route completion, no-result recovery, correct return,
  local-state failure rate, stale/held-route drift, visitor-scope
  comprehension, broken route/provider rate, and—only if commerce is
  activated—order/fulfilment/return/refund completion.
- **Prohibited data:** raw search strings, item names tied to a visitor,
  Resident Card/account identifiers, purchase/support details beyond the
  minimum operational service, and community content.
- **Review:** before release; after any route/source/claim/provider/schema
  change; weekly only when a weekly source affects the tree; immediate on
  rights/privacy/commerce incident.
- **Decision after measurement:** repair, hold, rollback or improve the exact
  failing journey; do not broaden claims from clicks.
- **Dossier updates:** `state.json`, `backlog.md`, child dossiers, readiness
  register, dated evidence and qualifying `painpoints-log.md` learning.

## Learning scan

Reused BTB-108 and BTB-134–136: stable UI identity differs from data identity;
a registry address is not owner memory; a destination render is not a
producer/consumer round trip; and one clean/device-local state cannot prove
another visitor scope. The preflight failure and cross-page gaps are the known
condition this packet was commissioned to recover, so no new canonical
painpoint was added during initialization.
