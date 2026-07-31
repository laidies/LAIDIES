# Town Hall functionality and cross-page touchpoint map

**Status:** SPECIFIED — FUNCTIONALITY RECOVERED; SHARED PLATFORM REVIEW QUEUED  
**Product/building owner:** Town Hall product champion  
**Subchampion:** Town Feedback & Civic Records  
**Functionality & Platform Director:** review and shared implementation required  
**Recovered:** 2026-07-26

This map binds the approved Town Hall experience to the complete
producer→service/store→consumer lifecycle. A rendered form, schema, local
receipt, HTTP response, or staff field is not the intended result by itself.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Civic-room orientation | Load `town-hall.html` | Visitor understands “see the mayor, meet the locals, leave a comment” and current availability. | Current labelled stage and local desktop/mobile evidence. Final room art unapproved. | VERIFIED LOCALLY — VISUAL HOLD |
| Three stations / hashes | Activate Mayor, Noticeboard, or Comments; direct hash | Exactly one correct panel opens with coherent focus/expanded state. | Source and exact-artifact synthetic browser checks pass. | VERIFIED LOCALLY |
| Mayor archive | Open Mayor station | Deb archive, admitted audio/poster/print routes, and profile handoffs work. | Core panel/hash locally checked; full media/destination freshness not re-proved in this cycle. | OBSERVED / PARTIAL |
| Noticeboard roster/count | Open Noticeboard | Real Regulars and actual roster count appear; routes are truthful. | Rendered roster and derived count exist. | VERIFIED LOCALLY — DESTINATIONS PARTIAL |
| Town Regular picker | Choose Regular | Visible selected state; device-local key; Closet handoff says local scope. | `laidies_town_regular` localStorage path exists and local disclosure passed. | VERIFIED LOCALLY — DEVICE ONLY |
| Comment-card availability | Open Comments | Visitor sees whether intake is open and the privacy/emergency/response boundary. | Public controller is visibly release-held and fails closed. | VERIFIED LOCALLY — BUILD REMAINS REQUIRED |
| Client form validation | Choose type; edit subject/body | Allowed type, subject ≤100, body 3–2,000; errors preserve content and announce recovery. | Contract/adversarial browser checks pass, including mutated DOM values. | VERIFIED LOCALLY |
| Anonymous intake | Submit without session | Server validates and accepts exactly once; returns bounded receipt. | Synthetic client pass only. Direct public insert is disabled; server boundary absent. | MISSING BACKEND |
| Signed-in intake | Submit with verified session | Attach verified `user_id` only; no convenience email; same bounded receipt. | Synthetic fixture pass only; real auth/RLS/service proof absent. | MISSING INTEGRATION |
| Filing state | Submit valid form | Button/status show filing; duplicate clicks blocked. | Local synthetic evidence passes. | VERIFIED LOCALLY — CLIENT |
| Definite rejection | Server returns validation/policy rejection | Preserve text, explain correction, permit safe retry. | Local synthetic evidence passes. | VERIFIED LOCALLY — CLIENT; SERVER UNPROVED |
| Ambiguous outcome | Timeout/abort/status-zero/malformed or missing receipt | Preserve text, warn against duplicates, disable immediate retry, reconcile by idempotency key. | Client unknown-state behavior passes; no authoritative reconciliation endpoint exists. | PARTIAL — MISSING BACKEND |
| Accepted device receipt | Typed accepted response | Clear form; announce bounded acceptance; store versioned non-future local cue if possible. | Synthetic accepted receipt and corrupt/storage-denied cases pass. | VERIFIED LOCALLY — DEVICE CUE ONLY |
| Staff queue/access | Accepted server receipt | One least-privilege staff item, safe notification, no routine private-content logging. | Table/admin fields exist; no staff application/access/notification evidence. | MISSING |
| Triage lifecycle | Staff action | `accepted → filed → triaged → addressed | no action | referred`, with defined timestamps/owners. | Legacy status values exist but semantics/operation are unproved and include joke-only labels. | MISSING / SCHEMA RECONCILIATION REQUIRED |
| Abuse/privacy/safety handling | Automated filter or staff classification | Rate/bot/duplicate controls; malicious text containment; threat/privacy/correction escalation. | No operational proof. | MISSING |
| Submitter status/history | Return while signed in or with receipt | Only authorised, correctly scoped status is shown; anonymous private history remains unavailable unless designed. | No status/history UX or accepted read contract. | MISSING / OWNER DECISION |
| Retention/deletion | Policy timer or authorised request | Private record is retained/deleted consistently; consumers and logs follow. | No approved policy or evidence. | MISSING |
| Correction/referral handoff | Submit from Town Hall or linked product | Exact source/location reaches responsible content owner; receipt and correction propagate to every consumer. | `/community/comment-card.html` coordination is named, not implemented as a complete shared flow. | MISSING |
| Public accountability | Approved aggregate publication | Categories/outcomes/corrections published without private submissions or identifying context. | Not built; Ali/public-accountability decision open. | OWNER DECISION + MISSING |
| Product analytics | Station/start/accepted/failure action | Privacy-safe controlled aggregate event arrives in verified learning loop. | Plausible/Clarity present globally; Town Hall event contract/delivery not wired. | MISSING |
| Visitors Centre return | Activate welcome handback | Route back to orientation without changing submission truth. | CTA exists. | OBSERVED |
| Reception bell | Activate optional bell | Short optional cue and Mayor station opens; silent equivalent works. | Approved concept, not implemented/decided. | OWNER DECISION |

## Visitor-state recognition and continuity — four scopes

| Visitor scope | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| 1. First-time visitor | No valid Town Hall receipt or Card dependency; do not infer account absence. | Public admitted content and release state only. | Full orientation; no last-card cue. | Explore; anonymous submission only after release gate. | Links only; no private state carried. | Held inbox remains disabled; exploration works. | VERIFIED LOCALLY FOR HELD CLIENT; LIVE INTAKE MISSING |
| 2. Returning, no Resident Card | Valid Town Hall local receipt/product state on this browser, without Card/account proof. | Typed accepted timestamp; selected/open UI only where valid. | Useful device-local continuity; no staff-status language. | New submission only when released and previous outcome is known/reconciled. | No cross-device promise. | Ignore corrupt/future receipt; storage denial does not change service truth. | VERIFIED LOCALLY FOR RECEIPT; RECONCILIATION MISSING |
| 3. Resident Card — device-local | Valid Card under shared local envelope plus Town Hall local keys; not authorization. | Only approved Card fields; Town Regular local key. | Same civic access; optional local personalization only if specified. | Anonymous intake or verified-session intake according to actual session, not Card. | Town Regular → Closet on same device. | Clear/deny/delete Card removes personalization; civic room remains. | TOWN REGULAR PARTIAL; CARD TRANSITIONS MISSING |
| 4. Resident Card — verified account-backed | Verified auth session, profile/RLS result, and exact shared account proof. | Only accepted account fields/status. | May support private status/history after staff lifecycle and read policy pass. | Signed-in intake with verified `user_id`; staff operations require staff role. | Account-backed history/second device only if separately accepted. | Sign-out removes private reads; auth failure preserves draft; conflicts require explicit resolution. | SYNTHETIC CLIENT ONLY; CONTROLLED ACCOUNT/LIFECYCLE MISSING |

### Transition register

| Transition | Required producer/store/consumer proof | Current truth | Disposition |
|---|---|---|---|
| First visit → return without Card | Accepted receipt write → local receipt parser → Comments station cue | Adversarial local pass | VERIFIED LOCALLY — DEVICE ONLY |
| Visitor → local Card → return | Card create/update → shared local envelope → Town Hall recognition, if any | No Town Hall-specific behavior specified or tested | BUILDING |
| Local Card → account | Auth/profile claim plus explicit local Town Regular/receipt merge-or-keep policy | Shared identity and product merge rule absent | BLOCKED — BUILD REMAINS REQUIRED |
| Sign in → submit → sign out | Auth session → intake `user_id` → staff row; sign-out removes private reads | Synthetic write payload only | BUILDING |
| Second tab/device | Same idempotency key/status reconciliation; local cue scope remains honest | Not tested against real service | BUILDING |
| Corrupt/migrated/storage-denied | Parser/migration rejects unsafe state; product remains usable | Receipt/storage cases pass; Card migration not Town Hall tested | PARTIAL |
| Profile/Card update/delete/revoke | Shared change event/store → Town Hall personalization + Closet consumer update/removal | Missing | BUILDING |
| Feedback retention/delete/correction | Staff action → authoritative row/audit → submitter/status/aggregate/content consumers | Missing | BUILDING |

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages/systems | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Open Town Hall station | Station button/hash on `town-hall.html` | `content/site/town-hall-v2.js` | None | DOM/hash | Same page; deep links | Session/navigation | Locally verified |
| Regular roster/count | Town Hall content/render | `town-hall.html`, `town-hall-v2.js` | Static release artifact | Rendered roster DOM/source | Noticeboard; character routes | Public/artifact | Count locally verified; destination completeness partial |
| Town Regular choice | Noticeboard picker | `town-hall-v2.js` | None today | `localStorage.laidies_town_regular` | Town Hall selected state; Closet/`laidies-card.html` | Device/browser | Device-local only; update/removal round trip needs proof |
| Comment draft | Visitor input | `town-hall-feedback.js` | None until submit | In-memory DOM only | Current form | Tab/session | Preserved on known local failures |
| Anonymous feedback | Comment form | `town-hall-feedback.js` plus required new adapter | Required server intake/RPC/Worker | Proposed authoritative intake record; legacy `public.town_hall_feedback` requires migration/review | Staff queue; receipt/status reconciler; authorised aggregate | Private server; anonymous receipt scope | Server adapter missing; direct public insert held |
| Signed-in feedback | Comment form + verified session | Same plus shared auth client | Supabase Auth + required intake boundary | `user_id` in intake record; no email by default | Staff queue; possible owner-only history | Account/private/cross-device only when proved | Synthetic payload only |
| Idempotency/receipt | Client submission attempt | Required versioned client adapter | Required intake endpoint | Server-issued attempt/receipt ID with unique constraint and stable result | Client success/unknown reconciler; staff dedupe | Anonymous token or account-private | Missing backend; local receipt is not server authority |
| Device acceptance cue | Typed accepted receipt | `town-hall-feedback.js` | None | Versioned local receipt under current Town Hall key | Comments station on same browser | Device/browser | Locally verified synthetic |
| Staff disposition | Named staff role | Staff UI/service missing | Supabase/service role behind server boundary | Versioned lifecycle record + audit event; legacy status fields not sufficient | Submitter status where approved; aggregate accountability; correction owners | Staff/private; account-private status | Missing |
| Abuse/safety classification | Intake middleware and staff action | Staff UI missing | Rate limiter/bot control/moderation/incident system | Minimised security event + protected case state | Staff/incident owner only | Restricted; retention-bound | Missing |
| Correction/referral | Town Hall or exact-location deep link | Town Hall/comment-card adapter | Shared correction service/workflow | Exact source/claim/location + receipt + decision/audit | Library, LUMINAiRY, NewsStand, index/search, public correction | Private intake; public corrected result | Missing shared contract |
| Analytics event | Controlled UI/lifecycle transition | Required shared analytics adapter | Plausible/approved service | Controlled event dictionary/delivery log | Town Hall owner dashboard/learning review | Aggregate only | Not wired |
| Release availability | Build/release manifest | Page/controller config | Deployment platform + service health | Exact commit/artifact/deployment/service verdict | Town Entry, Visitors Centre, directory, public page | Public/release | Exact local artifact only; public/service state missing |

## 4. End-to-end transaction contracts

### 4.1 Anonymous and signed-in comment card

1. **Discover:** Comments station exposes private, non-emergency,
   no-guaranteed-reply, and release state before entry.
2. **Trigger:** Native form submit after type/subject/body validation.
3. **Authorize:** Anonymous is allowed under the approved intake policy;
   signed-in scope derives `user_id` only from a verified session. A
   device-local Card never authorizes.
4. **Write/call:** Client sends only allowed fields plus a stable idempotency
   key to the server-side intake boundary.
5. **Authoritative completion:** Server returns a typed, versioned receipt only
   after one durable accepted record or an idempotent replay of that record.
6. **Read after write:** Receipt/status endpoint can reconcile the attempt
   without requiring anonymous access to the private row.
7. **Visible result:** Accepted, definite rejection, or unknown outcome; each
   preserves/clears content according to the operating spec.
8. **Downstream propagation:** One safe staff item, notification/queue state,
   and allowed aggregate event.
9. **Return/resume:** Local receipt is a convenience; account status/history is
   separately authorised.
10. **Change/remove/revoke:** Staff disposition, correction/referral,
    submitter deletion where allowed, retention expiry, and audit history
    propagate to authorised consumers.

Required controls:

- Server allowlist and length validation repeat client checks.
- Unique idempotency constraint binds attempt to canonical result; replay
  returns the existing receipt.
- Timeout/abort/partial responses remain unknown until receipt reconciliation.
- Rate limits distinguish anonymous, verified account, IP/network, and abuse
  patterns without creating a tracking profile.
- Routine logs exclude body, subject, email, name, user ID, auth token, and raw
  provider/database error.
- Staff rendering treats all submitted fields as untrusted text.
- Two test identities prove submitter isolation and staff-only access.
- Retention/deletion and incident policy names owner, backup, clock, and
  evidence.
- Form/status are keyboard accessible; focus and live announcements recover
  coherently.
- Analytics permits controlled station/type/auth-class/failure-class only;
  private text and identifiers are prohibited.

### 4.2 Staff lifecycle and civic accountability

The authoritative lifecycle is:

`accepted → filed → triaged → addressed | no_action | referred`

The legacy values `ignored` and `deb-flected` cannot be the only authoritative
operational meanings. A migration or versioned translation must define every
state, permitted transition, actor, timestamp, reversal/correction rule, and
submitter-visible wording.

Required cases:

- ordinary compliment/suggestion/complaint;
- duplicate/replay/spam;
- malicious markup or injection text;
- privacy-sensitive or deletion request;
- threat/urgent-safety content with an explicit non-emergency handoff;
- factual correction with exact affected owner/source/location;
- referral to another product owner;
- no-action with accountable reason;
- status correction/reopen; and
- retention expiry/deletion with audit-minimised proof.

No raw note becomes public. Aggregate accountability needs consent/rules,
redaction, minimum cohort thresholds where appropriate, correction handling,
and Ali's approval of the public model.

### 4.3 Town Regular round trip

`choose in Town Hall → validate roster ID → write device-local key → render
selected state → Closet consumes → update/replace → Closet refreshes → remove
or Card/privacy deletion → every consumer clears`

The current path is device-local. Any account-backed sync requires a shared
profile field/collection, explicit merge/replace behavior, two-account RLS,
second-device proof, and deletion/revocation propagation. Town Hall may not
invent that shared store.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Select Town Regular | Town Hall selected state; Closet/Resident Card display | Valid roster ID; device-local scope | Closet handoff | Replace selection everywhere on same device | Clear in every consumer on explicit removal/Card privacy deletion | Corrupt/missing/storage-denied fallback; no identity claim |
| Intake availability changes | Town Hall, Town Entry, Visitors Centre, directory/promotion surfaces | Exact release/service verdict | Town Hall Comments hash | All discovery copy updates in one candidate | Disable/honestly unavailable on incident rollback | Exact artifact/public-origin service-health evidence |
| Submit comment | Staff queue; local receipt; authorised status; aggregate event | Receipt ID, controlled type/auth class; private row stays private | Receipt/status route if approved | Staff state updates authorised status and aggregates | Retention/delete removes private consumers; audit is minimised | Accepted/rejected/unknown/replay/service-down cases |
| File correction/referral | Responsible content owner and all indexed/display consumers | Exact public source/claim/location, private explanation, receipt | Originating page/Town Hall | Correct/demote/retract every copy/search/index result | Remove false claim and invalidate stale cache | Owner refusal, stale consumer, partial propagation |
| Staff disposition changes | Authorised submitter status and aggregate accountability | Controlled lifecycle state, not admin notes | Account/private status route if built | Reopen/correct with audit | Revoke erroneous public aggregate/correction | Two-role/RLS, stale read, notification failure |
| Sign out/delete/revoke account | Town Hall private history/status and shared profile consumers | Verified account/session change | Public Town Hall remains usable | Remove private UI immediately; reconcile local cues separately | Account/private reads revoked; retention policy applied | Two-tab/device session expiry and offline fallback |

## 6. Missing backend and integration register

| ID | Gap and user consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| TH-FP-01 | No safe public intake; visitor cannot submit. | Add versioned server intake/RPC/Worker; allowlist/length validation; bounded runtime; typed outcomes; controlled errors. | Functionality & Platform | Town Hall | New shared server/service path; `content/site/town-hall-feedback.js`; Supabase migrations | Controlled anonymous/signed-in success/validation/service-down suite with exact receipts | BUILD BEFORE LAUNCH |
| TH-FP-02 | Ambiguous delivery can duplicate a private record. | Stable client attempt ID, unique server idempotency key, replay/read-receipt endpoint, expiry/reconciliation policy. | Functionality & Platform | Town Hall | Intake service + migration/index + client adapter | Timeout-before/after-write, replay, two-tab/device concurrency prove one record/result | BUILD BEFORE LAUNCH |
| TH-FP-03 | Bots/abuse can flood or weaponise staff queue. | Anonymous/account rate limits, bot/automation control, payload size/runtime limits, abuse signals, safe quarantine, incident owner. | Functionality & Platform / Privacy & Security | Town Feedback | Intake service, protected config/store, incident runbook | Controlled threshold/429/recovery/quarantine suite with no private content in logs | BUILD BEFORE LAUNCH |
| TH-FP-04 | No accountable staff receipt-to-outcome path. | Staff role/RLS, queue UI/API, notification, lifecycle transitions/audit, owner/backup, outage behavior. | Functionality & Platform | Town Feedback | Supabase policies/migration; new staff surface/service | Two submitters + nonstaff + staff prove isolation, one queue item, transition rules, notification failure | BUILD BEFORE LAUNCH |
| TH-FP-05 | Legacy status fields do not define safe semantics. | Versioned lifecycle enum/transition function; migrate/map `ignored`/`deb-flected`; define `reviewed_at`; reversible correction. | Functionality & Platform | Town Feedback | `public.town_hall_feedback` migration/RPC | Migration fixture matrix, illegal transition rejection, audit/reopen proof | BUILD BEFORE LAUNCH |
| TH-FP-06 | Retention/deletion/privacy obligations are unknown. | Approved periods/purposes; scheduled deletion; account/anonymous request path; backup/log handling; access review. | Privacy + Functionality & Platform | Town Feedback | Policy + database/service jobs + staff tooling | Clock-controlled expiry/deletion/access export tests and owner sign-off | OWNER DECISION REQUIRED / BUILD REMAINS REQUIRED |
| TH-FP-07 | Malicious, threat, privacy, and correction cases lack owned moderation. | Safe text rendering, classification/escalation taxonomy, urgent-safety handoff, referral/correction owner, incident/appeal/reopen. | Functionality & Platform / Privacy & Security | Town Feedback | Staff surface/service/runbook | Adversarial fixture suite; no execution/leak; named owner receives and resolves each class | BUILD BEFORE LAUNCH |
| TH-FP-08 | Account-backed status/history may leak or mislead. | Decide scope; owner-only read API/RLS; exact status wording; sign-out/delete/revoke; second-device proof. | Identity + Functionality & Platform | Town Hall | Auth/profile/intake service; future status UI | Account A/B/nonstaff/staff, second device, sign-out/revoke/delete suite | OWNER DECISION REQUIRED / BUILD REMAINS REQUIRED IF RETAINED |
| TH-FP-09 | Town Regular does not have a proven full update/remove round trip. | Validate local key consumers; add shared change/removal handling; specify merge only if account sync intended. | Functionality & Platform / Closet | Town Hall | `town-hall-v2.js`, `laidies-card.html`, shared Card/profile code if approved | Choose/replace/remove/corrupt/storage-denied and Card deletion across both pages | BUILD BEFORE LAUNCH FOR INTENDED DISPLAY |
| TH-FP-10 | Correction intake cannot update all content consumers. | Shared exact-location correction schema, receipt, owner routing, decision/audit, cache/index/search propagation. | Functionality & Platform / Editorial Accuracy | Town Feedback | Town Hall/comment-card UI; shared correction service; affected indices/content | Submit→receipt→correct/demote→all consumers→public correction, without private reading data | BUILD BEFORE ADMITTING HIGH-TRUST CORRECTION PROMISE |
| TH-FP-11 | Discovery pages can promote stale intake availability. | One release/service capability manifest consumed by Town Entry, Visitors Centre, directory, and public page. | Functionality & Platform / Release | Town Hall | Release manifest/build scripts and consumer pages | Incident toggle and recovery propagate to exact artifact/public origin | BUILD BEFORE LAUNCH |
| TH-FP-12 | No privacy-safe measurement loop. | Add approved event dictionary entries, adapter, delivery health, baseline, owner review, retention. | Functionality & Platform / Privacy | Town Hall | `event-dictionary.json`, shared analytics adapter, Town Hall controller/dashboard | Production-controlled delivery proves allowed properties only; prohibited-property negative tests | BUILD BEFORE CLAIMING MEASUREMENT |
| TH-FP-13 | Current schema permits unused email/display fields and direct inserts. | Reconcile/drop/restrict fields, policies, grants, and public direct-write path; preserve migration/rollback. | Functionality & Platform / Privacy | Town Feedback | `supabase/migrations/20260630000000_baseline_schema.sql` plus new forward migration | Schema diff, anonymous/auth/staff RLS, no-email payload, rollback and legacy-row handling | BUILD BEFORE LAUNCH |
| TH-FP-14 | No public-origin/service/rollback proof. | Bind commit→artifact→deployment→service/config→public journeys→rollback; keep held-state fallback. | Functionality & Platform / Release | Town Hall | build/metadata/service runners and release evidence | Exact public four-scope suite plus rollback drill and service verdict manifest | BUILD BEFORE LAUNCH |

These fourteen items are the durable **Functionality & Platform queue**. This
initialization does not edit shared server, schema, identity, analytics,
release, or consumer files.

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** consume the shared verified session,
  staff role, profile, sign-out, revoke, deletion, and two-account RLS
  contracts; Town Hall must not make Card presence an authorization signal.
- **Saves/progression/Closet:** `laidies_town_regular` is a producer/consumer
  collision with the Closet and any Resident Card display. Update/removal scope
  must be jointly verified.
- **Rewards/economy/ownership/fulfilment:** Town Hall grants no reward and
  cannot charge for voice, response, or priority.
- **Community/moderation:** use one staff abuse/incident pattern where possible,
  but keep private civic intake distinct from public community posting.
- **Referrals/postcards/newsletter/delivery:** no current Town Hall delivery
  promise; any future reply/notification consumes the shared delivery contract.
- **AI service quality/safety:** no AI triage/moderation is authorised. A future
  classifier cannot become the sole safety or civic-decision authority.
- **Content/media admission and freshness:** Mayor/Regulars and correction
  targets remain governed by their content owners and exact admission state.
- **Analytics/customer evidence:** shared adapter/dictionary owns delivery and
  prohibited fields; Town Hall owns event meaning and product interpretation.
- **Release/build/runtime dependencies:** intake availability and every
  discovery consumer must bind to the same exact candidate/service verdict.

## 8. Acceptance and approval

### Product-owned gates

- Complete first-time, returning-without-Card, device-local Card, and verified
  account-backed scenes with separate verdicts.
- Preserve the three-station room, hashes, Mayor/Regular content, real roster,
  device-local Town Regular truth, and held-state safety while shared work is
  built.
- Verify validation, accepted/rejected/unknown copy, focus/live status,
  reduced motion, mobile/desktop, storage corruption/denial, and no private
  analytics/log content.
- Have Brand & Experience and Ali judge the final lobby/interaction choices.

### Functionality & Platform gates

- Sign off TH-FP-01 through TH-FP-14 or record the applicable explicit owner
  decision without treating a temporary hold as completion.
- Prove isolated service success, rejection, timeout, replay, duplicate,
  abuse/rate, staff access/lifecycle, retention/deletion, and two-identity
  privacy.
- Verify every producer and consumer, including Town Regular/Closet,
  correction propagation, availability promotion, status/history, analytics,
  and release rollback.

### Exact evidence ladder

1. Deterministic source/schema/static checks.
2. Network-denied client fixture suite.
3. Isolated staging service/staff suite with approved synthetic data and
   cleanup receipts.
4. Independent product, privacy/security, staff-operations, accessibility, and
   reliability reviews.
5. Exact artifact four-scope browser/native suite.
6. Authorised deployment.
7. Public-origin service, consumer-propagation, analytics-delivery, and
   rollback verification.

Town Hall remains **BUILDING** until the intended private civic lifecycle—not
merely the safe disabled client—passes this map.
