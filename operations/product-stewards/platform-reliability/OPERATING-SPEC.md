# Shared Functionality & Platform operating specification

**Status:** SPECIFIED — INITIALIZATION RECONCILIATION; NO LIVE SERVICE
MUTATION OR PUBLIC VERIFICATION PERFORMED  
**As of:** 2026-07-26  
**Owner:** Functionality & Platform Director  
**Registry ID:** `platform-reliability`

## Stable promise

Every promoted SUNNYVAiLE capability has one truthful end-to-end contract:
producer → frontend trigger → validation/authorization → authoritative
store/service completion → read-after-write → visible result → every consumer
and return route → update/remove/revoke/refund/correction behavior. Evidence
names exactly which source, artifact, environment, identity and failure path
were tested.

A page, click handler, local count, schema, API call, HTTP 200, configured
provider, deployment or Resident Card is not by itself proof of that result.

## Scope and boundaries

### Owns

- identity, account, canonical profile and permission contracts;
- explicit first-time, returning-without-Card, device-local Card and verified
  account-backed resident state transitions;
- saves, progression and Closet producer/consumer contracts;
- rewards, economy, ownership, entitlement, fulfilment and refunds;
- community, moderation, referrals, postcards, newsletter and delivery;
- AI service quality, safety, privacy, cost and typed outcomes;
- correction/retraction propagation across content consumers;
- privacy-safe analytics and customer-evidence delivery health;
- release provenance, runtime dependencies, controlled-service verification,
  rollback, incident response and shared observability; and
- collision locks whenever more than one product reads or writes the same
  state/service.

### Does not own

- a building's intended experience, visual direction, content usefulness or
  product-specific completion judgment;
- permission to spend, install a provider, expose private data, mutate a live
  account/service, deploy or publish; or
- silent replacement of a product owner's page behavior.

Building owners own their page and every consumer-facing state. They must use
the shared contract and coordinate before introducing a new shared store,
identity meaning, reward, delivery, moderation, analytics or correction path.
Shared release truth is never public-copy authority: hashes, receipts,
freshness, route identifiers and failure codes stay backstage. A building
owner and Brand own visitor-facing headings, explanations, actions and visual
composition even when Platform supplies validated structured facts.

## Current architecture truth

| Shared contract | Current narrowest truthful state | Launch rule |
|---|---|---|
| Identity/account/profile | Supabase code, config and migrations are present; fresh magic-link, expiry, logout/login, RLS, private/public/not-found, second-device and two-account proof is absent | FIX before account/privacy/cross-device claims; a device-local Card may remain explicitly local |
| Visitor-state transitions | Product records previously conflated first-time, returning and Card-holder journeys; shared contract now requires all three and proof scope | FIX in every functionality map; Card is not login proof |
| Saves/progression/Closet | Some `localStorage` producer/consumer loops, especially Library Puffy and Resident Card, have bounded same-device proof | BUILD account/cross-device continuity where intended; accurate “this browser/device” copy is temporary truth, not completion |
| Rewards/economy/ownership | Local counters and isolated reward/RPC designs exist; no accepted append-only grant/display/reserve/spend/refund/replay contract spans products | FIX before reward, balance, ownership, referral or fulfilment claims |
| Community/moderation | Hyvor/widgets/local UI exist; provider acceptance, visibility, moderation, deletion, abuse, retention and staff lifecycle are unproved | FIX before posting/community completion claims |
| Referral/postcard/newsletter delivery | Local/native handoff and provider code exist; delivery/open/join/attribution/duplicate/unsubscribe proof is absent | BUILD and verify the intended lifecycle; any temporary handoff-only safety state leaves the build open |
| AI services | Worker/model/avatar paths exist; current shared evidence does not prove typed routing, grounded quality, privacy, rate/failure/refund or production-origin behavior | FIX before live advice/avatar/allowance claims |
| Content correction | Product-specific holds exist, but no shared exact claim/location correction, receipt, triage and cross-consumer propagation contract is proven | FIX before admitting high-trust content without an owned alternative |
| Analytics/customer evidence | Tags/config/events may exist; event semantics, prohibited data, delivery health, retention and learning loop are incomplete | Do not claim measurement; P1 unless launch depends on it |
| Release reliability | Prior source/artifact/deployment binding and limited smoke evidence exist; runtime fetches, real providers, representative AT/CWV, rollback drill and continuous health remain incomplete | FIX before grand reopening/public completion claim |

## Required building contract

Each building owns a current `EXPERIENCE-BRIEF.md`,
`FUNCTIONALITY-MAP.md`, charter, operating spec, state and backlog. The map
must enumerate every visible element and every producer/store/consumer,
including:

1. intended outcome and authoritative completion event;
2. first-time, returning-without-Card, device-local Card and verified
   account-backed resident behavior/transitions;
3. device/session/account/public/cross-device persistence scope;
4. validation, permission, privacy, security and moderation;
5. duplicate/idempotency, cancel, timeout, partial success, retry and offline;
6. update/remove/revoke/refund/delete/correction propagation;
7. two-tab, two-account and two-device conflicts where applicable;
8. accessibility announcement, focus and recovery;
9. privacy-safe analytics event and prohibited data; and
10. exact gap, shared owner, product owner, paths/services and acceptance proof.

An experience brief governs intended behavior. A functionality map proves what
must exist behind it. Current code remains evidence, not intent.

## Visitor-state identity contract

| State | Minimum evidence | Permitted claim | Prohibited inference |
|---|---|---|---|
| First-time visitor | No valid product-local record and no verified account session required | New/clean local journey | “anonymous” does not prove no prior server account |
| Returning without Resident Card | Valid product-local/device state and no verified Card/account dependency | Returned on this browser/device | Backup, ownership, login or cross-device |
| Resident Card — device-local | Valid local Card envelope on this browser/device | Card saved/restored on this device | Login, membership, public identity, synced ownership or cross-device |
| Resident Card — verified account-backed | Separately accepted auth session, profile/permission result and account store | Only the exact account-backed result and consumers tested | A clean-browser or local-Card PASS; unrelated local collections being synced |

Transitions must name which write completed them and what disappears on
logout, storage clear, another browser or another device. Products may not
branch on Card presence as though it were authorization.

## Shared transaction standards

- **Completion:** use provider/database/artifact acknowledgement appropriate to
  the promise, then read after write where state is expected to persist.
- **Idempotency:** every external or economic mutation has a stable completion
  ID/dedupe key and replay result; browser clicks are not keys.
- **Failure truth:** unknown/timeout/partial success cannot be painted as
  failure or success until reconciled. Retrying must not duplicate side
  effects.
- **Removal:** every create/claim/grant/save/share path names update, delete,
  revoke, refund/correction and downstream consumer propagation.
- **Privacy/security:** least data, explicit retention, no secrets in clients
  or evidence, RLS/permissions tested with two identities, and private content
  absent from analytics/session replay.
- **Accessibility:** status uses appropriate live announcement; errors retain
  context and focus; keyboard/native AT paths complete the same outcome.
- **Analytics:** record controlled event IDs/outcomes, never raw prompts,
  emails, handles, avatars, referral payloads, community text, saved purpose
  labels or reading text.
- **Cost/rate:** identify provider limits, abuse/rate behavior, cancellation
  and non-consuming failure before promotion.

## P0 and P1 launch capability register

### P0 — build and verify before launch

1. Complete per-building functionality maps; MAiKEOVER and Library are the
   first reference audits, not proof for the rest.
2. Build and prove the fully controlled Supabase identity suite required by
   the intended resident experience; device-local truth is not a substitute.
3. Build the append-only idempotent ledger for rewards, FAiRY Plays,
   ownership, referrals and fulfilment, proving grant/display/spend/refund/replay.
4. Build and run controlled provider suites for every intended newsletter,
   community, Town Hall, KSVL request, AI/Worker and avatar lifecycle.
5. Admit content only with exact source/currentness/correction authority; do
   not let search, saves or deep links bypass holds.
6. Bind exact source commit → artifact hash → deployment → public-origin
   journeys → service verdicts → rollback reference.
7. Repair known runtime dependency failures and prove failure fallbacks, not
   only static link success.

### P1 — required for a trustworthy measured product, sequenced after P0 truth

1. Versioned local-state migration and cross-tab conflict behavior.
2. Shared exact-location correction/retraction propagation.
3. Privacy-safe event dictionary, delivery health and product-owned learning
   questions.
4. Representative native accessibility, browser/device and performance suite.
5. Scheduled runtime/service/freshness health with named incident owner.
6. Account sync only for products that justify it, after identity proof and
   explicit merge/revoke/delete/two-device design.

## Contradictions that remain open

1. Code contains Supabase reward/profile synchronization paths while canonical
   launch truth says the cross-product ledger and controlled identity suite are
   unproved. Treat code as a candidate, not an accepted shared contract.
2. Some pages and records use “Closet,” “Card,” “saved,” “earned,” “joined” or
   “delivered” without consistently naming device-local versus provider/account
   completion. Each producer and consumer must narrow its copy to evidence.
3. Static files, indices and rendered books can exist while their catalogue or
   editorial status remains held. Availability comes from explicit admission,
   not file presence.
4. Plausible/Clarity scripts may load while the event dictionary and verified
   delivery/learning loop are absent. Presence is not measurement.
5. Existing product launch statuses compress technical foundation, complete
   user outcome and public proof. Control Room must use the fixed evidence
   ladder and the functionality-map disposition instead of a single optimistic
   label.

## Recommended Control Room launch sequence

1. **Build freeze:** finish owner-entry/functionality recovery, convert every
   intended gap into a named build packet and keep any necessary temporary
   safety control explicitly subordinate to that build.
2. **One complete device-local vertical:** Library admitted reference →
   reader → Puffy save → Closet reopen/remove, including three visitor states,
   failure, correction and exact release evidence.
3. **Identity vertical:** isolated test identities prove magic link, profile,
   RLS, logout/login, two accounts and second device. Only then may a Card
   become account-backed in copy.
4. **Economic vertical:** one completion event flows through
   grant/display/spend/refund/replay before any reward consumers are promoted.
5. **Provider verticals:** newsletter, community/Town Hall/KSVL and AI/avatar
   run separate controlled success/error/retry/idempotency/privacy suites.
6. **Combined candidate:** exact runtime dependency, browser/native
   accessibility, performance, analytics delivery and rollback/incident suite.
7. **Deploy then verify publicly:** deployment is separate from public-origin
   journey proof; reopen only the capabilities whose exact producer and every
   consumer pass.

This sequence prefers one complete round trip before several disconnected
systems and keeps reversible local value available while remote claims remain
held.

## Evidence and acceptance

Initialization consulted the working agreement, active work, decision ledger,
portfolio director/champion/owner-entry/functionality contracts, registry,
run queue, event/guild dictionaries, platform truth table, MAiKEOVER map,
Library dossier/source and relevant prevention records including BTB-010–012,
BTB-069, BTB-134 and BTB-135.

No live account, provider mutation, deployment or public-origin verification
was performed. Acceptance for this cycle is:

- targeted platform owner-entry passes after this spec exists;
- Library owner-entry passes after its map exists;
- shared checks pass or report only unrelated portfolio debt;
- Library/MAiKEOVER records preserve device-local versus account truth; and
- Control Room receives the exact remaining P0/P1 and release sequence.
