# Post Office build packet — Platform provider and identity contracts

**Status:** SPECIFIED — QUEUED THROUGH FUNCTIONALITY & PLATFORM DIRECTOR  
**Product owner:** Post Office product champion  
**Platform owner:** `platform-reliability-champion`

## Outcome

- **Complete scope:** Buttondown newsletter request → confirmation → delivery
  → unsubscribe and Supabase magic-link request → callback/session → Card/
  profile → restore/logout/revoke across the four visitor scopes.
- **User problem:** local handoffs exist, but no provider/account-backed
  evidence can support subscription, delivery, sign-in or cross-device claims.
- **Intended outcome:** provider and identity results are authoritative,
  privacy-safe, observable, recoverable and consistent across Post Office,
  Resident Card and MAiKEOVER.
- **Evidence:** Post Office operating spec/subproduct contracts; Platform
  identity packet/truth table; current bounded local evidence.
- **Scope:** shared adapters/stores, affected clients, controlled tests and
  redacted evidence.
- **Non-goals:** postcard invitation/rewards; real visitor data; unapproved
  production mutation; local attempted flags as truth.

## Proposed direction

Platform first selects one authoritative identity client/route and one
observable Buttondown integration contract. Product owners then consume those
contracts and map every provider result to exact UI wording. No new plugin is
proposed. Approved disposable inboxes, test accounts and provider access are
required before external calls.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Reconcile current Buttondown entry paths/config | Platform backend-integration + Newsletter Delivery | `/post-office.html`, historic `script.js`, Buttondown config | Platform-owned adapter/config paths named after audit; Post Office evidence packet | Read-only provider/config access | QUEUED TO PLATFORM |
| Implement observable request/result contract | Platform backend-integration | Provider API/embed constraints | Platform service/Worker + Post Office client adapter | Provider decision | QUEUED TO PLATFORM |
| Reconcile Resident Card/MAiKEOVER auth clients | Platform identity + Resident Card | `resident-card.html`, `maikeover.html`, identity migrations/RLS | Shared identity modules and affected routes | Existing Platform identity packet | QUEUED TO PLATFORM |
| Define local Card → account migration/conflict | Platform identity/data | Four visitor scopes | Shared schema/RPC/client contract | Owner privacy ruling if trade-off remains | QUEUED TO PLATFORM |
| Update Post Office provider/account UI | Post Office frontend owner | Accepted shared contracts | `/post-office.html`, approved shared copy dependencies | Platform APIs stable | WAITING FOR PLATFORM |
| Controlled Buttondown matrix | Independent provider judge | Disposable inbox/config | `operations/product-stewards/post-office/evidence-provider-identity-2026-07-26/buttondown-results.md` | Explicit test authority and cleanup | BLOCKED — AUTHORITY REQUIRED |
| Controlled identity/two-device matrix | Independent identity/security judge | Two disposable accounts/devices | `.../identity-results.md` | Platform implementation and test authority | WAITING |
| Exact artifact/public rejudge | Release judge | Accepted source/artifact | `.../exact-public-results.md` | Release authority | WAITING |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Newsletter quality/trust | valid, invalid, duplicate, confirmation-required, confirmed, send/delivery evidence, bounce/error, unsubscribe and retry; every word maps to redacted provider state | Provider/trust judge | PENDING |
| Identity completeness | request, no-email, receive/click, callback, used/expired, rate limit, session restore, profile/RLS, logout/revoke/delete | Identity/security judge | PENDING |
| Four visitor scopes | newcomer, returner/no Card, device-local Card and verified account each receive separate evidence/verdict | Product/UX judge | PENDING |
| Privacy/security | no enumeration; no email/token/session/raw response in analytics/evidence; RLS/two-account isolation passes | Safety/privacy judge | PENDING |
| Accessibility/failure | form/status/focus/retry work on mobile, keyboard and native AT | Accessibility judge | PENDING |
| Cross-page integrity | Post Office, Resident Card and MAiKEOVER show one current source of account/provider truth across two devices | Technical judge | PENDING |

## Integration and release

- **Affected owners:** Platform Reliability, Newsletter Delivery, Sign-in,
  Resident Card/MAiKEOVER, Post Office, analytics and release.
- **Collision rule:** Platform owns shared provider/identity schema, adapters,
  migrations, RLS and events. Post Office owns only its experience/client.
- **Exact candidate:** platform and site SHAs, migrations/config version and
  fresh artifact recorded together.
- **Release authority:** Platform release owner plus any provider/data
  approvals.
- **Rollback:** provider/config rollback, migration rollback/compensation,
  previous client artifact and cleanup of disposable test identities.
- **Public verification:** repeat bounded provider/account scenes at the public
  origin without exposing addresses or tokens.

## Measurement and learning

- **Baseline:** provider and account lifecycle unverified.
- **Signals:** request/provider-result categories, confirmation latency,
  delivery/failure categories, session restoration, retry/error rates; no raw
  identities.
- **Review:** immediately after controlled suite and 24–72 hours after release.
- **Decision:** integrate only independently accepted contracts; otherwise
  remain BUILDING/BLOCKED with exact owner and retest.
- **Handoff rule:** this packet is a durable execution contract, not proof
  that Platform accepted, built, deployed or delivered anything.
