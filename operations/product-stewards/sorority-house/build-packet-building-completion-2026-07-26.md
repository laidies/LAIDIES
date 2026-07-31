# Executable build packet — Delta LAi Nu building completion

**Status:** SPECIFIED — EXECUTION QUEUED; BUILD REMAINS REQUIRED  
**Product:** Sorority House · Delta LAi Nu (`sorority-house`)  
**Date:** 2026-07-26  
**Trigger:** permanent-owner initialization and recovery of the building
experience/functionality entry gate  
**Execution control:** no implementation or external provider mutation was
authorized by this initialization; shared work is queued through Platform

## Outcome

- **Complete scope:** `/sorority-house.html`; four wings; eleven directory
  destinations; seven Hyvor-backed community rooms; Chat Room Digest; Comment
  Card; Closet handoff; Girl Talk; arrival/return state; provider, identity,
  moderation, deletion, reward, analytics, accessibility and public-release
  contracts.
- **User problem:** a visitor can discover a promising house locally, but live
  participation, account continuity, deletion and moderation cannot yet be
  truthfully completed or recovered end to end.
- **Intended outcome:** each of four visitor scopes can choose a room,
  understand its boundary, complete or safely abandon the intended action,
  receive an authoritative result, delete/revoke applicable state, recover
  accessibly from failure and return without a false identity or reward claim.
- **Evidence:** `EXPERIENCE-BRIEF.md`, `FUNCTIONALITY-MAP.md`, Repair 1 maker
  evidence and independent 91/100 rejudge.
- **Explicit non-goals:** invent a provider receipt; link local Card and Hyvor
  identities; ingest community text into analytics/agents; reward post volume;
  create fake room activity; deploy or publish from this packet.

## Accepted direction

Keep the approved house/door/room experience and the independently accepted
local safety boundary. Complete it with shared Platform contracts rather than
building product-local identity, moderation, provider or reward systems.

No new external plugin/service is proposed. Hyvor is the incumbent provider
under evaluation; retaining it requires the controlled lifecycle proof below.
A provider change is a separate build-versus-buy/privacy/migration decision.

## Work breakdown

| ID | Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|---|
| SH-B01 | Approve recovered intent and resolve Card-gates-provider conflict | Sorority champion + Ali product/voice owner | experience brief; 2026-07-23 design brief; Repair 1 | dated owner ruling in this dossier and, if consequential, engine ledger | none | OWNER DECISION REQUIRED |
| SH-B02 | Create executable Hyvor lifecycle sheet | Platform backend integration + Community Moderation | functionality map; Hyvor account/config/docs; privacy authority | `operations/product-stewards/sorority-house/evidence-provider/PROVIDER-LIFECYCLE.md` | approved controlled provider/test account authority | QUEUED / BLOCKED |
| SH-B03 | Run controlled provider suite using synthetic content | Platform QA maker | SH-B02 | `evidence-provider/provider-suite-<date>.md` plus scrubbed receipts | provider authority; approved synthetic fixtures; no real member content | QUEUED / BLOCKED |
| SH-B04 | Specify and exercise human moderation operations | Community Moderation + Safety/Privacy | rules, provider tools, incident standard | `evidence-moderation/MODERATION-OPERATING-RUNBOOK.md` and drill evidence | named human owner; privacy/retention/appeal ruling | QUEUED / BLOCKED |
| SH-B05 | Integrate shared account-backed identity scope | Platform Identity maker + Sorority frontend | Platform identity packet; four-scope matrix | shared adapter paths named by Platform; Sorority integration in `content/site/sorority-house-v2.js` only after contract acceptance | platform identity staging/RLS proof | QUEUED / BLOCKED |
| SH-B06 | Add Girl Talk clear-local-history control | Girl Talk subchampion + frontend engineer | strict v1 envelope | `games/girl-talk.html`; contract/browser tests | product confirmation that retained history remains intended | BUILD BEFORE LAUNCH |
| SH-B06A | Repair current Girl Talk 320px horizontal overflow | Girl Talk frontend engineer | fresh 2026-07-26 browser failure | `games/girl-talk.html` and/or owned Girl Talk styles; Sorority browser regression | preserve strict state/privacy/focus behavior | BUILD BEFORE LAUNCH |
| SH-B07 | Bind real provider states without optimistic success | Sorority frontend + Platform backend | admitted provider event contract | `content/site/community-room.js`, room/house tests | SH-B02/B03 | BLOCKED |
| SH-B08 | Reconcile privacy, deletion and reporting copy | Safety/Privacy + Sorority content owner | SH-B02/B04; LAiDIES/Hyvor policies | house and seven room decision-point copy; privacy record | retention/deletion/appeal owner decisions | BLOCKED |
| SH-B09 | Complete four-scope/browser/native accessibility suite | Accessibility QA maker | accepted candidate; fixtures | `evidence-accessibility/<date>/` | SH-B05/B07 | BLOCKED upstream |
| SH-B10 | Run human newcomer comprehension/usefulness test | UX service designer + customer evidence owner | exact candidate and privacy-safe script | `evidence-research/newcomer-comprehension-<date>.md` | owner-approved research/participant channel | QUEUED |
| SH-B11 | Wire privacy-safe product events | Analytics/VOC + Platform | shared event dictionary; functionality map | admitted analytics adapter/schema and scrubbed event evidence | authoritative completions from SH-B03/B05/B06 | BLOCKED upstream |
| SH-B12 | Owner visual/community approval | Ali + brand/community independent reviewers | exact desktop/mobile candidate | dated approval/rejection record | intended room/door assets and full states available | OWNER REVIEW REQUIRED |
| SH-B13 | Build exact release candidate and verify public origin | Release manager + independent judge | all prior PASS receipts | exact artifact manifest, deployment record, public journey evidence and rollback | release authority | BLOCKED upstream |

Future makers may edit the named implementation paths only after their
dependency gates open. This initialization itself is limited to this dossier
and evidence area.

## Provider suite — executable cases

For each of the seven discussion rooms, exercise on an approved controlled
environment:

1. anonymous read state, signed-out state and provider sign-in;
2. synthetic post and reply with authoritative provider receipt;
3. held and rejected submission;
4. visible published state, edit and delete/request deletion;
5. report/flag, moderator receipt, escalation and appeal where offered;
6. provider script blocked, offline, timeout and unknown-after-submit;
7. duplicate click/retry and reconciliation before retry;
8. expired/revoked session;
9. keyboard, screen reader, 320px/mobile and native zoom recovery; and
10. zero message text, handle, email, provider ID or moderation detail in
    analytics, logs or evidence.

Every case records environment/account aliases without secrets, starting
state, request/action identifier if supported, provider result, visible UI
state, downstream propagation, retry/delete behavior and cleanup. Successful
script load or HTTP response is not a post/moderation completion.

## Identity suite — executable cases

Use the shared Platform identity packet and test:

1. first-time → return without Card;
2. create valid device-local Card → same-device return;
3. explicit claim → verified session → authoritative remote read;
4. account sign-out → truthful local fallback;
5. second tab and second device;
6. resident A/resident B isolation;
7. expired link/session, missing/revoked Card and offline/timeout;
8. local/remote conflict with explicit merge/choose/replace/fail-safe result;
9. update propagation to every accepted consumer; and
10. revoke/delete propagation without implying deletion of an unrelated Hyvor
    account or provider content.

The Sorority House may personalize arrival from accepted state. It may not use
LAiDIES identity as a provider posting receipt or silently link accounts.

## Moderation, deletion and incident suite

The runbook must name:

- accountable human owner and coverage/escalation contacts;
- room rules and prohibited content at the posting decision point;
- provider versus LAiDIES responsibilities;
- report intake, acknowledgement, triage severity and response evidence;
- hold/remove/restore/appeal authority;
- user post/account deletion request path, retention limits and legal/privacy
  exceptions;
- incident containment, notification, correction and post-incident review;
- moderator access control, audit logging and evidence minimization;
- abuse/rate/cost controls; and
- accessible alternatives when provider controls are unavailable.

No review-time, deletion-time or outcome promise enters copy until the
responsible owner can operate and verify it.

## Reward contract

- Room discovery, visits, posts, replies, reports, shares, counts and streaks
  grant no currency, stamp or status.
- Girl Talk markers remain device-local collectibles and do not enter the
  shared economy.
- Any future Sorority loyalty progress requires an Ali-approved meaningful
  action and the shared idempotent economic ownership ledger, with correction
  and revocation. It is not part of this release packet.

## Acceptance and independent review

| Gate | Exact evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | Human newcomer can identify all four wings, choose the right room, explain provider/public/private boundaries and name the next step | UX service designer not maker | PENDING |
| Complete route/subproduct journey | All eleven routes/hashes plus seven provider lifecycles, four handoffs and return paths in source, exact artifact and public origin | Product integrator | PENDING; bounded local navigation PASS |
| Accuracy, safety and trust | Controlled provider, moderation, deletion, identity isolation and privacy-minimized receipts | Safety/privacy/security | PENDING |
| Positive LAiDIES brand | House feels specific, adult, useful and kind; no VIP fiction, popularity or pressure | Brand/community judge | PENDING |
| UX/accessibility | Keyboard, VoiceOver/screen reader, native zoom, reduced motion, 320px, focus/status/retry across success/failure/delete | Accessibility QA | FAIL — fresh Girl Talk 320px overflow; other automated local subset historically PASS |
| Frontend/backend/data | Provider authoritative outcomes; identity RLS/read-after-write; delete/revoke propagation; no false reward/analytics | Platform technical judge | PENDING |
| Visual/media | Approved door/environment assets and every state inspected at full resolution/mobile | independent visual judge + Ali | PENDING |
| Exact release/public | commit/artifact hashes, environment, provider receipts, deploy, public journeys and rollback | Release manager not maker | PENDING |

Each noncompensable product, trust, brand, UX/accessibility and technical gate
must score at least 17/20. Maker and judge remain separate.

## Integration and release

- **Affected owners:** Platform Reliability, Community Moderation,
  Safety/Privacy, Identity/Rewards/Data, Girl Talk, Closet/Resident Card,
  Analytics/VOC and Release.
- **Collision boundary:** shared identity, provider outcomes, moderation,
  deletion, analytics and economy are Platform-owned. Sorority owns experience,
  decision-point clarity and end-to-end reconciliation.
- **Exact candidate:** unset until SH-B01 through SH-B12 pass.
- **Release authority:** explicit release-manager/owner authority after all
  holds close.
- **Rollback:** last independently accepted Repair 1 governed hashes plus the
  exact future release manifest; provider or identity failure must fail held,
  not fall back to optimistic local success.
- **Public verification:** all four visitor scopes, seven provider rooms,
  report/delete/retry and native accessibility on the deployed public origin.

## Measurement and learning

- **Baseline:** historical bounded local 91/100; fresh source contract PASS 62;
  fresh browser FAIL on Girl Talk 320px overflow; prior 138 browser and 391
  adversarial checks remain historical evidence; no real
  provider/account/moderation evidence.
- **Success:** comprehension and useful completion quality, safe recovery,
  provider failure rate, moderation burden and repeat useful participation.
- **Guardrails:** no sensitive analytics, no identity conflation, no false
  post/delete/moderation receipt, no post-volume reward and no inaccessible
  recovery.
- **Review:** weekly moderation/incident review once active; monthly room
  usefulness/accessibility/provider health; quarterly provider policy,
  retention and exit review.
- **Decision after evidence:** improve, merge or pause a room based on useful
  participation and safety burden, never raw volume alone.
- **Required dossier updates:** `state.json`, `backlog.md`,
  `FUNCTIONALITY-MAP.md`, dated evidence, affected ledger decision and a
  qualifying painpoint entry.
