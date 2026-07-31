# Town Hall complete civic intake lifecycle — executable build packet

**Status:** SPECIFIED — READY FOR SPECIALIST DISPATCH; SHARED PLATFORM WORK QUEUED  
**Product:** Town Hall (`town-hall`)  
**Owner:** Town Hall product champion  
**Date:** 2026-07-26  
**Release:** BUILD BEFORE LAUNCH; current disabled intake remains a temporary
safety control, not completion

## Outcome

- **Complete scope:** `town-hall.html`; Mayor/Noticeboard/Comments stations;
  anonymous and signed-in intake; authoritative acceptance/reconciliation;
  staff access/triage/moderation/retention; Town Regular→Closet; correction and
  discovery consumers; analytics; exact release/public verification.
- **User problem:** Town Hall promises a civic note that enters an accountable
  human process, but the current safe client is disabled because no controlled
  server or staff lifecycle proves that result.
- **Intended user outcome:** Each of the four visitor scopes can understand the
  room, file exactly one private card when released, receive an honest receipt,
  recover safely from failure/ambiguity, and understand any status or
  accountability result actually authorised for that scope.
- **Evidence:** `EXPERIENCE-BRIEF.md`, `FUNCTIONALITY-MAP.md`,
  `OPERATING-SPEC.md`, Repair 1 maker/rejudge records, live source/tests, the
  baseline Supabase migration, D-2026-07-26-050 through D-056, and BTB-134
  through BTB-137.
- **Initialization write scope:** this Town Hall dossier only.
- **Build write scope:** specialists receive the narrow paths below only after
  Functionality & Platform binds shared architecture and non-overlapping
  ownership.
- **Explicit non-goals:** public raw comments; emergency support; guaranteed
  reply; paid/rewarded priority; inferred sentiment/sensitive analytics;
  convenience email collection; a Town Hall-specific identity, moderation,
  analytics, or account ledger.

## Direction and locked reconciliation

Build the approved “actually gets read” intent as a real, bounded private
lifecycle:

`discover → validate → idempotent server acceptance → typed receipt →
reconcile unknown outcome → least-privilege staff queue → triage →
addressed | no action | referred → authorised status/accountability →
retention/deletion/correction propagation`

The current controller's release hold stays in place until that lifecycle
passes. Success copy remains bounded even after launch: acceptance is not
reading, and reading is not response or resolution.

No external plugin, vendor, or paid service is proposed by this packet. Reuse
the existing Supabase/Cloudflare-compatible platform only after the
Functionality & Platform Director selects the shared server boundary. Any new
provider, spend, private-data authority, or public publication requires its
normal approval.

## Write boundaries and work breakdown

| ID | Work item | Craft owner | Inputs | Output paths/services | Dependencies | Executable done condition | Status |
|---|---|---|---|---|---|---|---|
| TH-01 | Freeze lifecycle semantics and test fixtures | Town Feedback & Civic Records | Brief/map/spec; legacy schema | Town Hall evidence subdirectory; proposed lifecycle fixture manifest | Ali decides public accountability/response scope where required | Allowed transitions, owner/backup, threat/privacy/correction/referral/no-action cases, retention proposal, and cleanup-safe synthetic fixtures reviewed | READY |
| TH-02 | Design shared intake/receipt/idempotency contract | Functionality & Platform backend | TH-FP-01/02/13; shared service patterns | Shared server/service design; forward Supabase migration; typed client contract | TH-01; platform collision review | Contract names request/receipt schema, unique key, replay/reconciliation, limits, logs, rollback, and anonymous/account/staff permissions | QUEUED TO FUNCTIONALITY & PLATFORM |
| TH-03 | Implement isolated server intake | Functionality & Platform backend/security | Accepted TH-02 | Shared Worker/RPC/server path; new forward migration and policies | Approved staging/test authority | Anonymous/account validation, bounded runtime, safe errors, one-row idempotency, no direct unsafe public write | QUEUED TO FUNCTIONALITY & PLATFORM |
| TH-04 | Implement rate/abuse/privacy boundary | Platform privacy/security | TH-01/02 | Shared rate/quarantine/security store/config/runbook | TH-03; privacy/retention authority | Controlled allow/deny/429/recovery/quarantine tests; private fields absent from routine logs/evidence | QUEUED TO FUNCTIONALITY & PLATFORM |
| TH-05 | Build staff queue and lifecycle | Staff operations + Platform backend | TH-01/03/04 | Staff-only UI/API, RLS, notification, audit transitions, retention/delete job | Named staff owner/backup | Staff/nonstaff/A/B access; legal transitions; malicious text safe; notification outage; reopen/correct/delete pass | QUEUED TO FUNCTIONALITY & PLATFORM |
| TH-06 | Integrate Town Hall client | Town Hall frontend | Typed TH-02 contract and staging endpoint | `content/site/town-hall-feedback.js`, `town-hall.html`, page-scoped CSS if needed | TH-03 receipt behavior stable | Accepted/rejected/unknown/reconcile states; drafts preserved; accessible focus/live status; no email/private telemetry | PENDING PLATFORM CONTRACT |
| TH-07 | Complete four-scope continuity | Town Hall frontend + Identity owner | Visitor matrix; shared identity suite | Town Hall integration tests; shared identity adapter only if required | TH-03/05; verified identity/RLS | First-time, returning-no-Card, local Card, account-backed resident each pass separately; sign-out/second-device/conflict/revoke included | PENDING PLATFORM CONTRACT |
| TH-08 | Close Town Regular→Closet round trip | Town Hall + Closet/MAiKEOVER owners | Existing local key; shared Card rules | `content/site/town-hall-v2.js`, `laidies-card.html`, tests; shared profile only if explicitly approved | Collision review | Choose/replace/remove/corrupt/storage-denied/Card-delete propagation passes; local/account scope never conflated | QUEUED CROSS-PRODUCT |
| TH-09 | Build correction/referral propagation | Town Feedback + Editorial owners + Platform | Exact-location correction contract | Town Hall/comment-card UI; shared correction service; affected indices/consumers | Platform PR-12 | Submit→receipt→owner decision→correct/demote→all consumers→public correction passes with no private reading/query data | QUEUED TO FUNCTIONALITY & PLATFORM |
| TH-10 | Bind availability to discovery consumers | Release Platform + Town Hall | Service/release manifest | Town Entry, Visitors Centre, directory/promotion consumers; release manifest | TH-03/05 | Held/open/incident/recovered state propagates to exact artifact and public origin without stale promotion | QUEUED CROSS-PRODUCT |
| TH-11 | Add privacy-safe measurement | Analytics/Privacy + Town Hall | Approved event semantics | Shared event dictionary/adapter; Town Hall events/dashboard | TH-03/05; privacy approval | Allowed event delivery passes; prohibited free-text/identifier/raw-error properties fail closed; baseline/review owner exists | QUEUED TO FUNCTIONALITY & PLATFORM |
| TH-12 | Finish room experience and native accessibility | Town Hall frontend/design | Approved brief; Ali visual decisions | Town Hall page/CSS/assets and evidence | Ali art/composite/bell rulings; stable client states | First-glance three-verb comprehension; desktop/mobile; Safari/VoiceOver; zoom/reflow; targets/focus/motion/audio; owner visual approval | OWNER DECISIONS + PENDING |
| TH-13 | Integrate, independently judge, and release | Town Hall champion + independent judges + Release | TH-01–12 accepted candidates | Exact release artifact, evidence bundle, manifest, rollback target | All P0 gates | Championship floors ≥17/20; exact artifact and controlled service pass; authorised deploy; public four-scope/consumer/service/rollback proof | BLOCKED — BUILD REMAINS REQUIRED |

## Required server and data contract

The Functionality & Platform candidate must settle these fields before client
implementation:

| Contract area | Required decision/evidence |
|---|---|
| Request | Version, allowed type, optional subject, body, optional verified `user_id`, stable idempotency key; no email/name/Card content by default |
| Receipt | Version, opaque receipt/attempt ID, typed `accepted | rejected | unknown`, canonical server timestamp, stable replay result |
| Authoritative store | Private intake record plus unique idempotency binding and versioned lifecycle/audit; migration from legacy status fields |
| Permissions | Anonymous create through server only; owner read only if approved; staff role least privilege; two-account/nonstaff negatives |
| Limits | Body/subject/type, request bytes/runtime, anonymous/account/network rate classes, replay window, queue/notification failure |
| Logging | Controlled class/receipt correlation only; no note, subject, email, name, user ID, token, or raw error |
| Retention | Purpose, periods, staff notes, security events, receipts, deletion requests, backup/log treatment, scheduled job, owner |
| Moderation | Untrusted-text encoding, spam/quarantine, threat/privacy/correction/referral paths, appeal/reopen/correct, incident owner |
| Status | Exact lifecycle transitions and which scopes can see which safe wording |
| Rollback | Disable intake without losing accepted records; discovery consumers reflect outage; reconcile in-flight attempts |

## Executable test matrix

### A. Deterministic source/schema

- Extend `scripts/check-town-hall-contract.mjs` to reject direct unsafe public
  insert, forbidden payload fields, untyped receipts, missing idempotency,
  private logging/analytics, illegal lifecycle transitions, and stale discovery
  claims.
- Add migration/policy tests for anonymous server-only acceptance, Account A/B,
  nonstaff/staff, owner-read decision, invalid transition, unique replay,
  retention/delete, and legacy status mapping.
- Keep existing 35 client contract checks passing unless a deliberate accepted
  contract revision supersedes them.

### B. Network-denied client fixtures

- Keep the hostile-host fixture denial and existing 58 adversarial checks.
- Add reconciliation results: timeout-before-write, timeout-after-write,
  accepted replay, rejected replay, expired/unknown receipt, two-tab same key,
  two-tab different key, stale local receipt, sign-out during submit.
- Assert zero private fields in console, request diagnostic metadata,
  analytics, evidence, and screenshots.

### C. Isolated staging service/staff

Use approved synthetic text that contains no real person or private incident.
Record only hashes/IDs/outcomes needed for proof, then clean up.

1. Anonymous accepted, validation rejection, rate rejection, service failure.
2. Signed-in accepted with `user_id` and no email.
3. Account A cannot read B; nonstaff cannot read queue; staff can read only
   authorised scope.
4. Timeout before/after commit plus replay produces exactly one intake item.
5. Duplicate/spam/quarantine and recovery.
6. Safe rendering of markup/script/oversize/bidi/control-character fixtures.
7. Ordinary, privacy, threat, correction, referral, no-action, reopen, delete,
   and retention-expiry staff cases.
8. Notification failure never loses the authoritative queued record.
9. Sign-out/revoke/delete and second-device status behavior.
10. Cleanup receipts prove test data and temporary identities were removed
    according to the approved plan.

### D. Cross-page and four-scope suite

- First-time → anonymous accepted → return without Card.
- Returning with known accepted receipt → ambiguous new attempt → reconcile.
- Visitor → local Card → Town Regular choose/replace/remove → Closet return.
- Local Card → account claim/merge decision → second device → sign out/revoke.
- Correction deep link → Town Hall → content owner → all affected consumers.
- Service held/open/incident/recovered → Town Hall, Town Entry, Visitors Centre,
  directory/promotion.
- Account A/B/staff/public views each expose only authorised status.

### E. Native, artifact, public, and rollback

- Desktop and mobile Chromium plus current Safari/VoiceOver and representative
  physical mobile; keyboard, live region, focus, 200–400% zoom/reflow, reduced
  motion, target size, contrast, offline/interrupted network.
- Build exact artifact; hash Town Hall/runtime/service manifest; run all
  non-mutating and approved controlled tests against that artifact.
- After authorised deployment, repeat public-origin four-scope, service,
  discovery-consumer, analytics-delivery, and staff notification/status checks.
- Drill rollback to honest unavailable state, confirm no accepted record is
  lost, and reconcile in-flight receipts before reopening.

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Pass condition |
|---|---|---|---|
| Product/content quality | Four-scope comprehension and complete journey; Mayor/Regular/Comments usefulness | Product judge not involved in implementation | ≥17/20 and no visitor-scope borrowing |
| Complete cross-building journey | TH-08/09/10 source→consumer update/remove/failure suite | Portfolio integration judge | Every named producer and consumer passes |
| Accuracy, safety, trust | Typed receipt, ambiguous reconciliation, lifecycle wording, non-emergency/privacy boundaries | Trust/privacy judge | ≥17/20; no false read/response/public record |
| Positive LAiDIES brand contribution | Civic-room first-glance test and final owner visual ruling | Brand judge + Ali | ≥17/20; humour never obscures state |
| UX/accessibility | Keyboard, AT, zoom, mobile, focus/live status, motion/audio, failure recovery | Accessibility judge | WCAG-relevant and native scenes pass with limits disclosed |
| Frontend/backend/data integrity | Schema/RLS/idempotency/rate/staff/retention/correction/release suites | Backend/security judge | All P0 cases pass; no private evidence/log leakage |
| Staff operations | Owner/backup, queue, notification, lifecycle, incident, retention/delete | Independent operations judge | Controlled shift can operate and recover the lifecycle |
| Exact release | Commit/artifact/deploy/public/service/rollback manifest | Release judge | Exact bound candidate passes; deployment and public verification recorded separately |

## Integration and release

- **Affected products/owners:** Functionality & Platform, Identity/Privacy,
  Closet/MAiKEOVER, Library/LUMINAiRY/NewsStand/editorial accuracy,
  `/community/comment-card.html`, Town Entry, Visitors Centre, directory,
  Analytics, Release, and every linked Regular destination.
- **Collision rule:** shared changes are implemented only through the
  Functionality & Platform lane; Town Hall consumes the accepted shared
  contract and does not create parallel identity, moderation, correction,
  analytics, or release systems.
- **Exact candidate:** future commit + artifact hash + service/migration
  version + deployment ID named in the release manifest.
- **Release authority:** normal authorised release owner; Ali approval is also
  required for final room-art and public civic-accountability decisions.
- **Rollback:** return intake and all discovery consumers to honest unavailable
  state; preserve accepted records; reconcile in-flight receipts; revert only
  through a named safe forward/rollback migration and exact artifact.
- **Public verification:** separate from deploy; requires public four-scope,
  staff/service, consumer-propagation, analytics-delivery, and rollback proof.

## Measurement and learning

- **Baseline before open:** zero accepted public submissions; current evidence
  is synthetic and must not be mixed with production.
- **Delivery signals:** accepted/rejected/unknown/reconciled/duplicate/rate
  classes; queue age; notification health; disposition age; deletion/retention
  job health.
- **Product signals:** station comprehension; safe completion; understood
  receipt/status; authorised minimised qualitative trust review.
- **Forbidden interpretation:** volume is not satisfaction, trust, being read,
  response quality, or civic accountability.
- **Review cadence:** daily service/queue health at open; monthly authorised
  aggregate and minimised triage review; quarterly privacy/access/retention,
  civic promise, visual, mobile, and accessibility review; immediate incident
  review.
- **Dossier updates:** `state.json`, `backlog.md`, this packet, exact evidence,
  and applicable dependency records after every accepted gate. Shared records
  are updated by their owning Functionality & Platform task.

## Dispatch order

1. Town Feedback produces TH-01 for review.
2. Functionality & Platform binds TH-02 and opens non-overlapping backend,
   privacy/security, and staff-operation lanes.
3. Town Hall integrates only the accepted typed contract (TH-06/07).
4. Cross-product owners close TH-08–11 against the same candidate.
5. Town Hall/Brand/Accessibility finish TH-12 without changing lifecycle
   semantics.
6. Independent judges run the complete matrix.
7. Release owner integrates, deploys with authority, verifies publicly, and
   drills rollback.

