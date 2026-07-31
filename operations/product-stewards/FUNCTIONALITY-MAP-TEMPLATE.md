# Functionality and cross-page touchpoint map

**Status:** FUNCTIONALITY RECOVERY REQUIRED
**Product/building owner:** TBD
**Functionality & Platform Director:** review required

This map proves what must exist behind every visible element and across every
page that produces, changes, displays or consumes its state. A rendered
control, local click handler, schema, API call or successful status code is not
the intended user outcome by itself.

## 1. Complete capability inventory

Include every visible action, status, count, collection, result, link,
personalization, content feed, media object, form, account state, reward and
cross-building handoff.

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
|  |  |  |  | OBSERVED / VERIFIED LOCALLY / INFERRED / MISSING |

## 2. Visitor-state recognition and continuity

Use `VISITOR-STATE-EVALUATION-STANDARD.md`. Do not infer identity from a
cookie, local history or the presence of a device-local Resident Card.

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor |  |  |  |  |  |  |  |
| Returning, no Resident Card |  |  |  |  |  |  |  |
| Resident Card — device-local |  |  |  |  |  |  |  |
| Resident Card — verified account-backed, if supported |  |  |  |  |  |  |  |

Record and test first → return, visitor → Card, local Card → account, sign-out,
second-tab/device, conflict/migration, update, deletion/revoke and privacy
transitions. Each state and transition receives its own launch disposition.

## 3. Producer → store/service → consumer map

One capability may have several producers and consumers. Record every one.

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  | session / device / account / public / cross-device |  |

## 4. End-to-end transaction contract

For every stateful or external capability:

`discover → trigger → validate → authorize → write/call → authoritative
completion → read after write → visible result → downstream propagation →
return/resume → change/remove/revoke/refund`

Record:

- authoritative completion event;
- validation and permission rules;
- duplicate/idempotency key;
- cancel, timeout, partial-success, retry and offline behavior;
- rollback/refund/delete/revoke behavior;
- stale/conflict/two-tab/two-account/two-device behavior;
- privacy, security, retention, moderation and abuse controls;
- accessibility announcements/focus/recovery;
- analytics event and prohibited data; and
- cost/rate/limit implications.

## 5. Cross-page propagation matrix

Test creation, update, removal and failure—not only the happy-path first write.

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  | BUILD BEFORE LAUNCH / BUILDING / BLOCKED — BUILD REMAINS REQUIRED / INTENTIONAL LATER RELEASE / OWNER DECISION |

Do not write “needs backend.” Name the missing store, schema/table/RPC/Worker,
provider lifecycle, identity rule, event, migration, reconciliation job,
failure path and consumer update where known. Mark unknowns explicitly.
Follow `BUILD-COMPLETION-POLICY.md`: a temporary safety hold may prevent harm
but cannot close or downgrade an intended build obligation.

## 7. Shared-contract collision check

- identity/account/profile/permissions:
- saves/progression/Closet:
- rewards/economy/ownership/fulfilment:
- community/moderation:
- referrals/postcards/newsletter/delivery:
- AI service quality/safety:
- content/media admission and freshness:
- analytics/customer evidence:
- release/build/runtime dependencies:

Shared changes queue behind the Functionality & Platform Director and name
every affected product. A building owner may consume or truthfully limit a
shared contract; it may not invent its own competing ledger or account system.

## 8. Verification and approval

- Product owner verifies intended result and complete element inventory.
- Product owner separately verifies first-time, returning-without-Card and
  Resident Card experiences and their transitions.
- Functionality & Platform Director verifies shared architecture, backend
  feasibility, authoritative stores and dependency/collision handling.
- Affected producer and consumer owners verify both sides of every handoff.
- Independent reviewer runs source, exact-artifact and public-origin journeys
  appropriate to the claim.
- Portfolio Control Room binds integration order, release evidence and
  rollback.

The page is not functionally complete until every promoted element has an
honest disposition and every required cross-page journey passes at its claimed
scope.
