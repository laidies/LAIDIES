# FAiRY Godmother's House functionality and cross-page touchpoint map

**Status:** SPECIFIED — FUNCTIONALITY RECOVERED; P0 BUILD REQUIRED  
**Product/building owner:** FAiRY Godmother champion  
**Functionality & Platform Director:** review required  
**Recovered:** 2026-07-26

This map distinguishes immutable production-v18 compatibility truth, the
current live page, the built-local typed candidate and the intended P0 system.
No row marked observed or built locally is a launch PASS.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Parlour arrival/orientation | Open `/games/fairy-godmother.html` | Understand place, supported subjects, privacy, allowance scope and first action | Live page has room art, arrival note and desk; current public copy/service remain legacy | OBSERVED — BUILD BEFORE LAUNCH |
| Four visitor scopes | Page arrival/return/Card/account transition | First-time, returning-no-Card, local-Card and verified-account experiences differ truthfully | Local preview key exists; Card/account recognition is not integrated with FAiRY | MISSING — BUILD BEFORE LAUNCH |
| Subject/task input | Enter one meaningful sentence to 8,000 characters | Accepted request or precise invalid/too-large state; no silent truncation | Page bounds 8,000 chars; local Worker bounds body/input; v18 differs | BUILT LOCALLY — VERIFY |
| Sensitive-data warning/redaction | Input contains credential, payment, ID or confidential workplace/personal data | Warn and redact before provider/log path | Contract specified; complete redaction path not proved | MISSING — BUILD BEFORE LAUNCH |
| Energy selection | Default/Dolly/Miranda/Elle/Cher/Sophia/David/Buffy control | Presentation changes while facts, route, safety, recommendation and spend stay invariant | Page rail/select and typed prompt constraint exist; real provider invariance unproved | BUILT LOCALLY — VERIFY |
| Surprise starter | Select “Surprise me” | Insert/edit a safe example without accidental charge | Current page chooses starter + energy and auto-submits | OBSERVED — OWNER/UX RECONCILIATION REQUIRED |
| Typed request identity | Submit | UUID request, verified actor scope, client and consent contract | Local page still sends legacy-compatible `{prompt, energy}`; Worker has identity seam only | MISSING — BUILD BEFORE LAUNCH |
| Clause isolation/injection handling | Submit pasted/quoted content | Separate user instruction from untrusted content | Local semantic-classifier architecture/tests exist; real classifier unproved | BUILT LOCALLY — PROVIDER TRIAL BLOCKED |
| Domain/task/risk/currentness classifier | Submit | Strict typed classification for every clause before answer model | Local adapter, contract and frozen harness pass; no configured semantic provider | BUILT LOCALLY — PROVIDER TRIAL BLOCKED |
| Boundary response | High-stakes/dangerous/out-of-scope request | Concise safe typed response; zero provider answer call and zero charge | Local Worker contract tests; live page adds limited regex guard before v18 | BUILT LOCALLY — API/PAGE/PROVIDER VERIFY |
| Needs information | Load-bearing context absent | One proportionate question plus useful-now material; no charge | Typed contract/renderer exist; real answer quality unproved | BUILT LOCALLY — VERIFY |
| Verified current information | Current product/law/price/research request | Sourced answer with `asOf`, or `needs_verified_information` | Current routes fail closed; no retrieval provider/claim validator | MISSING — BUILD BEFORE LAUNCH |
| Task-specific generation | Eligible ordinary case | Schema-valid answer for draft/explain/advice/plan/research/troubleshoot/evaluate/brainstorm | Local typed prompt/validator exist; no approved answer provider trial | BUILT LOCALLY — PROVIDER TRIAL BLOCKED |
| Structured result rendering | Typed service outcome | Safe DOM-rendered sections, not provider HTML | Local page supports typed fields plus validated v18 legacy adapter | BUILT LOCALLY — RENDERED QA REQUIRED |
| Copy usable answer | Successful result | Clipboard gets deliverable without performance wrapper | Current page implements copy control | BUILT LOCALLY — BROWSER QA REQUIRED |
| Fittings/revisions | Successful open case | Up to three case-bound revisions without another spend | Page has legacy/typed revision rendering; authoritative case/version store absent | PARTIAL — BUILD BEFORE LAUNCH |
| Case identity/version | Initial success/fitting/retry | Opaque case ID, expected version, conflict-safe update | Typed response shape exists; authoritative case service/store absent | MISSING — BUILD BEFORE LAUNCH |
| Loading/timeout/retry | Submit under delay/failure | Warning by 10s, result/failure by 25s, one explicit same-ID retry | Worker abort and page timeout exist; same-ID lifecycle/UI not proved | PARTIAL — BUILD BEFORE LAUNCH |
| Play grant/display | Earn/open page | One authoritative available/reserved balance across Bank/House/consumers | Several local keys and claims conflict; no single ledger/API | MISSING — PLATFORM BLOCKER |
| Play reserve/commit | Eligible request/validated success | Reserve atomically; commit exactly once after `case_success` | Local temporary counter writes only after validated success, but is not atomic/shared | PARTIAL — PLATFORM BLOCKER |
| Play release/refund | Any non-success/correction | Release every reservation; refund committed failed delivery; show receipt | Typed outcomes specified; authoritative transaction service absent | MISSING — PLATFORM BLOCKER |
| Guest preview allowance | First-time/returning guest | Signed privacy-respecting token proves bounded preview scope | Plain localStorage preview key only | MISSING — PLATFORM BLOCKER |
| Subscriber entitlement | Verified subscriber path | Only server-proved entitlement affects allowance | v18 accepts browser-asserted email; local page explicitly disclaims signup allowance | MISSING — PLATFORM BLOCKER |
| Resident identity | Verified Card/account path | Opaque server identity, no browser email trust | Worker `VERIFIED_IDENTITY` seam only; no configured path | MISSING — PLATFORM BLOCKER |
| Case/Play receipt | Success/failure result | Visible case version, transition, amount and current balance | Contract specified; no authoritative balance/receipt service | MISSING — PLATFORM BLOCKER |
| Ephemeral history/count | Same page session | Convenience excerpts/count without implying saved history | Current page maintains in-memory history and local preview count | OBSERVED — LABEL/PRIVACY VERIFY |
| Explicit save/export/delete | Successful case/account privacy | User-controlled persistence and deletion | Explicit save/export beyond copy is not built; persistent correspondence deferred from P0 | INTENTIONAL LATER RELEASE |
| Ecosystem handoff | Result next move | Route to precise LIBRAiRY/High/episode/NewsStand/practice destination | General copy/handoffs exist; typed topic-aware contract not proved | PARTIAL — BUILD BEFORE LAUNCH |
| Privacy-safe analytics | Every lifecycle transition | Aggregate route/type/latency/ledger/usefulness events, no raw content | Contract specified; exact event implementation/baseline absent | MISSING — BUILD BEFORE LAUNCH |
| Accessibility | Keyboard/mobile/screen reader/reduced motion | Complete understandable case and recovery journey | Source contracts/checks only; rendered browser evidence unavailable | MISSING EVIDENCE — BUILD BEFORE LAUNCH |
| Exact release/rollback | Accepted candidate | Staging/prod versions, bindings, evidence hashes and rollback identified | v18 recovery is exact; staging candidate not deployed | MISSING — CONTROL ROOM BLOCKER |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No reliable prior state; future signed guest token only | Public orientation and provider/privacy terms | Full first-arrival explanation and one bounded preview/allowance if authoritatively available | Public read; signed guest allowance reserve/commit only after platform support | None beyond signed-token scope | If token/storage unavailable, show unavailable/no-charge; never invent allowance | BUILD BEFORE LAUNCH |
| Returning, no Resident Card | Device-local preview signal may show prior completion only | No prompt/answer; bounded preview status | Useful return status without member/account language | Same as guest; no private/account writes | “On this device” only when proved | Corrupt/denied storage falls back to first-time without charge | BUILD BEFORE LAUNCH |
| Resident Card — device-local | Shared Card producer's local proof | Local Card display fields only | Local town personalization; no balance/history unlock | Local presentation only; guest service rules | Same device only | Stale/corrupt Card ignored or repaired by Card owner | BUILD BEFORE LAUNCH |
| Resident Card — verified account-backed | Signed session → opaque resident ID from shared identity service | Authoritative balance, transaction receipts and explicitly retained case metadata | Resident allowance, fittings and cross-device return only at proved scope | Identity, Plays and case services through authenticated bindings | Account-backed only after exact store/revoke tests | Expired/revoked/offline session becomes signed-out fallback; private data removed | BLOCKED — PLATFORM BUILD REMAINS REQUIRED |

Required transition tests:

- first visit → leave → return without Card;
- first/returning → create Card → same-device return;
- local Card → verified claim/sign-in;
- verified resident → sign out → return;
- one remaining Play → two tabs/two devices;
- corrupt/stale/denied local state;
- Card/profile update and account/local conflict;
- privacy change, deletion and revoke propagation; and
- referral/deep-link arrival with honest fallback.

Each transition needs its own store setup, route sequence, visible result,
accessibility evidence and analytics receipt. Device-local evidence cannot
prove account-backed continuity.

## 3. Producer → service/store → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Request/case input | House submit | Inline page controller in `games/fairy-godmother.html` | FAiRY Worker | In-memory request until case success; future case store | House only in P0 | request/session; account only after explicit save | Page sends legacy-compatible payload; target typed request incomplete |
| Classification | Worker after validation | None/browser must not classify authoritatively | Meaning-aware classifier adapter/provider | Versioned classifier result bound to request ID; prompt-free audit fields | FAiRY answer router/QA | request | Architecture built locally; provider/model unselected |
| Current-source result | Classifier flags currentness | Typed outcome renderer | Retrieval/source provider + claim validator | Source records/URLs/as-of bound to response | House; optional NewsStand/LIBRAiRY handoff | request/case | Missing |
| Typed answer | Answer provider after gates | Safe DOM renderer | Answer model adapter | Validated response/case version; raw text not logged | House; clipboard; case store only on explicit save later | request/case | Local generator/renderer built; real provider unproved |
| Case fitting | House fitting control | Page revision handler | FAiRY Worker + case service | Case ID, expected version, fittings remaining | House | signed guest/account case scope | Renderer exists; authoritative case store missing |
| Guest preview status | First eligible guest success | `fairy-godmother-v2.js` + page controller | Future signed guest allowance service | Signed token/ledger transaction; not localStorage | House | browser token | Current key `laidies_free_wishes_used` is convenience only |
| Verified resident identity | Shared account/Card transition | Shared identity client | Identity/account service binding | Opaque resident ID/session/revocation state | House, Bank, Card and authorized consumers | account/cross-device | Missing integration; Worker seam only |
| FAiRY Play grant | Full Tour/other approved earning completion | Producer-specific modules | Shared rewards service | Append-only grant with source ID/dedupe | Bank, House, approved consumers | account | Conflicting local writes/claims; no authoritative service |
| FAiRY Play reserve/spend/release/refund | House case lifecycle | Receipt/balance renderer | Shared Plays transaction service, preferably atomic per resident | `grant|reserve|spend|release|refund|adjustment|expire` ledger | House, Bank, Closet/other approved display | account; signed guest variant if approved | Missing |
| Preview/history count | Successful page result | Inline page JS | None | In-memory count and local preview flag | House only | page/device | Observed; not an economy or account |
| Analytics lifecycle | Page/Worker/ledger transitions | Page event adapter | Analytics ingestion | Prompt-free event record with request/case IDs and enums | Product owner/Control Room aggregate reports | anonymous/account class only | Dictionary/implementation absent for full lifecycle |
| Release identity | Build/deploy/public verification | Release scripts | Cloudflare Workers/Pages | Source commit, version/deployment IDs, binding inventory, artifact hashes | Control Room/product dossier | deployment | v18 exact recovery exists; typed candidate lacks staging/public binding |

## 4. End-to-end transaction contracts

### 4.1 Normal case and allowance

`discover → orient → validate input → verify actor scope → isolate quoted
content → classify every clause → boundary/currentness/missing-information
decision → atomically reserve Play → task-specific provider call → validate
typed output → commit once → read balance/receipt after write → render safe
result → copy/fitting → return/resume`

- **Authoritative completion:** schema-valid `case_success` with matching
  request/case identity and a committed transaction read back from the ledger.
- **Authorization:** signed guest token or verified opaque resident identity;
  no browser-asserted email or Card text.
- **Idempotency:** actor + request ID for initial cases; case ID + expected
  version + request ID for fittings; ledger dedupe key for every transition.
- **Failure:** validation, clarification, boundary, classifier uncertainty,
  retrieval insufficiency, provider timeout/error, malformed output and rate
  limit release/no-reserve and return typed no-charge outcomes.
- **Concurrency:** one atomic balance owner rejects overdraw; two tabs cannot
  both spend the final Play.
- **Privacy:** no raw prompt/draft/email/name/case text in logs or analytics;
  provider payload minimized and terms disclosed.
- **Accessibility:** loading and every terminal outcome announced; focus moves
  predictably; retry/copy/fitting remain keyboard operable.
- **Cost:** provider/model/token ceilings and timeouts enforced per stage;
  missing configuration fails before charge.

### 4.2 Fitting

`discover included fitting → submit bounded operation/instruction → authorize
case → compare expected version → classify new instruction → generate →
validate revision_success → atomically advance case version/decrement fitting
count → render/copy → no additional Play spend`

Stale versions return a conflict with the latest safe case state. A materially
different problem starts a new case and requires a new allowance.

### 4.3 Refund/correction

`detect committed delivery defect → authorize correction → append refund with
original transaction/case reference and dedupe key → recompute/read balance →
show corrected receipt → propagate to Bank and every balance consumer`

DOM changes or local counter edits cannot refund a Play. Automatic release is
used before commit; refund is an auditable post-commit transaction.

### 4.4 Identity, sign-out and revoke

`shared identity event → session verify/revoke → FAiRY access decision → case
and balance service enforcement → remove private UI state → downstream
consumer propagation → prompt-free analytics`

The House consumes this event contract. Platform/Control Room owns its shared
implementation and migration behavior.

### 4.5 Provider path

`bounded/redacted request → semantic classifier → fail closed or route →
verified retrieval when required → task-specific answer provider → strict
output/claim validation → typed response`

Classifier failure never falls through to the answer provider. Retrieval
failure never produces purported current findings. Answer failure never
becomes success-shaped prose or a committed Play.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Approved earning source grants a Play | Bank, House, approved reward displays | Transaction ID, opaque resident ID, amount, source/dedupe, balance | House opens with authoritative available balance | Ledger read/event refreshes all consumers | Reversal/expire/adjustment append event refreshes all consumers | Duplicate source ID and failed grant produce no phantom balance |
| House reserves/commits a case | House receipt, Bank balance | Case/request/transaction IDs and balance | Return to open case only when retention permits | Commit/release updates balance everywhere | Refund/case revoke propagates through ledger | Two-tab race and provider failure show one authoritative outcome |
| Card/account becomes verified | House, Bank, Card and authorized consumers | Opaque resident/session scope only | Return to House with resident orientation | Profile scope update propagates without leaking private case text | Sign-out/delete/revoke removes private access and resident entitlement | Expired/corrupt conflict yields honest signed-out fallback |
| Case fitting succeeds | House case result/receipt | Case ID, version, fittings remaining | Same case deep link if permitted | New version replaces stale version | Case deletion/revoke removes access when persistence ships | Stale/two-tab version conflict does not spend |
| Current-source answer succeeds | House result; optional learning/editorial handoff | Claim, source URL, as-of, caveat; no hidden prompt | Direct source or governed LAiDIES destination | Source correction marks/updates affected case when retained | Removed/untrusted source invalidates claim display | Missing/weak source produces `needs_verified_information` |
| Privacy/account deletion | House, case store, balance/identity consumers | Revocation/deletion event without raw content | Signed-out public House | Purge/restrict according to approved retention contract | Private cases and sessions become inaccessible; financial/reward audit retains only required minimal record | Deletion job receipt and consumer read-after-revoke |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Verified identity path | Card/subscriber/email can be mistaken for entitlement; no safe cross-device resident case | Signed session verification, opaque resident ID, expiry/revoke, local→account conflict/migration and service binding | Platform/Control Room | FAiRY champion | New shared identity service/config; `worker-fairy-godmother/src/index.js` integration seam | Guest/local/account transition suite, forged email rejection, sign-out/revoke/second-device proof | BLOCKED — BUILD REMAINS REQUIRED |
| Authoritative Plays ledger | Rewards cannot be reliably earned, displayed, spent or refunded | Atomic append-only ledger/API, grant/reserve/commit/release/refund, balance read, dedupe, migration/reconciliation, consumer events | Platform/Control Room + economy owner | FAiRY Plays subchampion | New shared service/store; Worker adapter; Bank/Closet/producer consumers | Grant→Bank→House reserve→success spend; all failures release; refund/update/revoke; two-tab overdraw | BLOCKED — BUILD REMAINS REQUIRED |
| Guest signed preview | localStorage can be reset and is not entitlement | Signed privacy-respecting browser token linked to bounded ledger scope and abuse/rate controls | Platform/Control Room | FAiRY champion | Guest identity/allowance service + page/Worker adapters | New/return/storage-denied/duplicate/device-clear tests with no account claim | BUILD BEFORE LAUNCH |
| Semantic classifier provider | Real meaning accuracy and multilingual/obfuscation behavior unproved | Approve provider/model/version/terms/cost, configure isolated binding/secret, run unchanged signed 63-case trial | Provider authority + Control Room | Answer Quality subchampion | `worker-fairy-godmother/src/index.js`, staging secret/binding, frozen harness | Signed trial, exact receipts, independent slice scores and no-charge replay gates | BLOCKED — BUILD REMAINS REQUIRED |
| Retrieval/claim validation | Current questions can only fail closed; no sourced success | Provider/category policy, primary-source retrieval, URL/as-of schema, claim/source validator and corrections | Platform/Control Room + editorial accuracy | Answer Quality subchampion | New retrieval service/binding; Worker response schemas/tests | Current AI/product/law/research fixtures, source removal/correction, zero fabricated claims | BLOCKED — BUILD REMAINS REQUIRED |
| Answer provider authorization | Useful real answers and tone/energy quality unproved | Approve provider/model/version/retention/region/token/cost, stage secret and task-specific evaluation | Provider authority + Control Room | Answer Quality subchampion | Worker adapter/config and staging environment | 45-case API+page suite, energy invariance, hard-failure zero, 17/20 floors | BLOCKED — BUILD REMAINS REQUIRED |
| Authoritative case/version service | Fittings, retries and return can duplicate or lose cases | Case ID/version, expected-version writes, fitting count, explicit retention boundary and deletion/revoke | Platform/Control Room | FAiRY champion | New case store/service; Worker/page adapters | Initial+3 fittings, stale version, retry, two-tab, sign-out/delete tests | BUILD BEFORE LAUNCH |
| Sensitive-data redaction | Secrets/IDs may be sent to providers or logs | Pre-provider detector/redactor, user warning, safe refusal/re-entry and audit codes | Privacy/security owner | Answer Quality subchampion | Worker preprocessing and fixtures | Credential/card/government-ID/confidential-workplace cases; provider/log payload inspection | BUILD BEFORE LAUNCH |
| Lifecycle analytics | No trustworthy quality/refund/latency baseline | Register privacy-safe events, ingestion/dedupe, dashboards/alerts and retention | Analytics/Control Room | FAiRY champion | Event dictionary + page/Worker/ledger emitters | Exact fixture receipts, prohibited-field scan, alert simulations and dated baseline | BUILD BEFORE LAUNCH |
| Rendered accessibility/browser proof | Source plausibility can hide broken result/recovery journeys | Fixture interception harness and desktop/mobile/keyboard/screen-reader/reduced-motion testing | QA/accessibility | FAiRY champion | `games/fairy-godmother.html`, test harness/evidence folder | All typed states at 320/390/desktop, keyboard/focus/live regions, copy/fitting/retry | BUILD BEFORE LAUNCH |
| Staging/release binding | Local candidate can be confused with live v18 | Isolated resources, exact version/binding inventory, candidate hashes, deployment order, rollback/public checks | Platform/Control Room | FAiRY champion | `worker-fairy-godmother/wrangler.jsonc`, Pages config, release packet | Exact staging API/page; production v18 snapshot; Worker-first compatibility; public-origin suite | BLOCKED — BUILD REMAINS REQUIRED |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** consume the shared verified identity
  contract; do not add a FAiRY-only account, email credential or Card
  interpretation.
- **Saves/progression/Closet:** P0 correspondence is not saved by default;
  later persistence must use shared deletion/revoke semantics. Closet may not
  infer a reward from page visits or local counts.
- **Rewards/economy/ownership/fulfilment:** one shared Plays ledger owns balance
  and transaction truth. Every earning producer and balance consumer must be
  enumerated before migration.
- **Community/moderation:** no P0 public note or community sharing. Later
  publishing requires separate consent, moderation and privacy contracts.
- **Referrals/postcards/newsletter/delivery:** explicitly deferred from P0;
  newsletter signup is not identity or a grant.
- **AI service quality/safety:** FAiRY owns subject/task/tone/result behavior;
  provider credentials, regional processing, spend/data authority and shared
  bindings coordinate through Control Room.
- **Content/media admission and freshness:** current claims require verified
  sources; final room/saint assets require brand/rights admission.
- **Analytics/customer evidence:** use shared event governance and prohibited
  data rules; do not emit prompt or answer content.
- **Release/build/runtime:** immutable v18 remains rollback/compatibility
  evidence; staging and production bindings remain platform-controlled.

## 8. v18/live compatibility boundary

- Frozen baseline:
  `worker-fairy-godmother/recovery/production-v18/index.deployed.js`, version
  18, version ID `eff23927-7e4d-4677-b729-2b14ff678ac9`, deployment ID
  `49472a73-1e0d-4d9c-b4ef-4c661e0a81eb`, 55,137 bytes, SHA-256
  `127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e`.
- Live request compatibility is `{prompt, energy}` with legacy `auto`; live
  success shape is `{response: markdown}` and failures may also be
  success-shaped HTTP 200 prose.
- The local page accepts both the typed target and a strictly validated legacy
  response while the public endpoint remains v18. The legacy adapter is a
  migration seam, not an endorsement or permanent response contract.
- Production release order is Worker typed compatibility first, verify, then
  accepted page; remove the legacy adapter only in a separately verified later
  cleanup.
- The frozen artifact must never be edited. Default Wrangler target remains
  isolated `laidies-fairy-godmother-staging` with no production bindings.

## 9. Verification and approval

- Product owner verifies the complete inventory, subject/task/tone contract,
  all typed outcomes, four visitor scopes and every P0 handoff.
- Functionality & Platform Director verifies identity, ledger, case store,
  provider/data paths, analytics, service bindings, migration and collision
  handling.
- Answer Quality & Safety reviewer independently runs the frozen semantic set,
  45-case API/page set and adversarial currentness/privacy/boundary cases.
- Rewards/data reviewer proves grant/display/reserve/commit/release/refund,
  idempotency and two-tab/two-device behavior against the authoritative store.
- UX/accessibility reviewer runs the exact rendered desktop/mobile,
  keyboard/focus/screen-reader/reduced-motion and recovery scenes.
- Brand reviewer scores the final room and real answers for positive LAiDIES
  contribution and energy discipline.
- Control Room binds exact integration order, release artifact, public-origin
  checks and rollback.

The P0 page is not functionally complete until every BUILD BEFORE LAUNCH or
BLOCKED — BUILD REMAINS REQUIRED row passes at its claimed visitor scope. The
explicitly deferred persistence/public/community capabilities remain later
scope only because the approved P0 contract names them as such.

## Source trail

- `EXPERIENCE-BRIEF.md`, `CHARTER.md`, `OPERATING-SPEC.md`
- `docs/product/fairy-godmother-p0-product-contract.md`
- `operations/research/fairy-godmother-worker-recovery-2026-07-25.md`
- `operations/research/fairy-godmother-live-logic-audit-2026-07-25.md`
- `operations/research/fairy-godmother-hero-product-strategy-2026-07-25.md`
- `worker-fairy-godmother/recovery/production-v18/`
- `worker-fairy-godmother/src/index.js`
- `games/fairy-godmother.html`
- `content/site/fairy-godmother-v2.js`
- `operations/test-fixtures/fairy-godmother/`
