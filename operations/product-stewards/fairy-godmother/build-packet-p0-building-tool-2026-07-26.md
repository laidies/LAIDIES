# FAiRY Godmother's House — executable P0 building/tool build packet

**Status:** SPECIFIED — READY FOR ISOLATED PRODUCT BUILD; SHARED PLATFORM AND
PROVIDER LANES BLOCKED PENDING NAMED AUTHORITY  
**Launch status:** FIX BEFORE PROMOTION  
**Production authority:** none  
**Packet owner:** FAiRY Godmother champion  
**Trigger:** permanent owner initialization and recovery of the missing
experience/functionality authority against production v18 and the local typed
candidate

## Outcome

- **Product:** FAiRY Godmother's House, including the parlour/case desk, Answer
  Quality & Safety and FAiRY Plays integration.
- **Complete route/subproduct scope:** `/games/fairy-godmother.html`;
  `worker-fairy-godmother/`; Answer Quality & Safety; FAiRY Plays; Bank,
  Resident Card/account, Closet/approved balance displays, earning producers,
  learning/editorial handoffs and release/analytics touchpoints.
- **User problem:** a visitor needs trustworthy help with an AI, work/career or
  everyday-life problem, but the live v18 system cannot safely distinguish
  task, risk, currentness, failure, identity or real reward spend.
- **Intended P0 outcome:** each of the four visitor scopes understands the desk,
  submits one bounded case, receives a validated typed result or distinct
  no-charge state, and sees a truthful allowance receipt. A verified resident
  may use up to three same-case fittings without another spend.
- **Evidence:** `EXPERIENCE-BRIEF.md`, `FUNCTIONALITY-MAP.md`,
  `OPERATING-SPEC.md`, the P0 product contract, recovered v18 manifest, local
  Worker/page evidence and versioned evaluation fixtures.
- **Scope:** complete the P0 building/tool journey in isolated staging, then
  independently judge and prepare a separate exact release packet.
- **Explicit non-goals:** persistent correspondence/memory, public Godmother
  Notes, referrals, paid membership limits, Butterfly Clip conversion, file
  upload, voice input, community sharing and unlimited conversation.

## Locked build direction

- Preserve the cottage/parlour/private-case metaphor and compete the final
  room/object interaction inside the sitewide visual system; do not reduce the
  product to a generic chat panel.
- Preserve immutable production v18 as compatibility/rollback evidence only.
  Build from `worker-fairy-godmother/src/index.js` and isolated staging.
- Use one strict typed lifecycle from request through result, case and Play
  receipt. Keep the page's validated v18 adapter only for migration.
- Route classifier → verified retrieval when needed → answer provider.
  Personality is a constrained presentation layer after route/safety/truth.
- Consume shared verified identity and Plays contracts. Do not create
  FAiRY-only browser identity, local balance or independent economy.
- Treat provider/model, data/retention/region, external resource and spend
  selection as explicit authority gates, not implementation guesses.

## Write boundaries and coordination

### Product-owned editable paths

- `operations/product-stewards/fairy-godmother/`
- `worker-fairy-godmother/src/`
- `worker-fairy-godmother/test/`
- `worker-fairy-godmother/scripts/`
- `worker-fairy-godmother/wrangler.jsonc` for isolated staging references only
- `games/fairy-godmother.html`
- `content/site/fairy-godmother-v2.js`
- `operations/test-fixtures/fairy-godmother/`
- FAiRY-specific test scripts/evidence paths

### Immutable/off-limits for this packet

- `worker-fairy-godmother/recovery/production-v18/index.deployed.js`
- production bindings, secrets, routes, KV/D1/Durable Objects and live data
- shared identity, account, Resident Card, Bank/economy, Closet, analytics
  canon or producer implementations without Platform/Control Room integration
  assignment

### Required coordination records

- Platform/Control Room: identity/session, atomic Plays service/store, case
  persistence boundary, analytics events, service bindings, staging resources,
  release order and rollback.
- Bank/economy owner: grant sources, balance API and consumer propagation.
- Resident Card/account owner: local versus verified recognition, claim,
  sign-out, conflict, deletion and revoke.
- Brand & Experience Director: final parlour/objects/energy rights and visual
  championship.
- Learning/editorial owners: precise LIBRAiRY/High/episode/NewsStand handbacks.

## Ordered work breakdown

| ID | Work item | Craft owner | Inputs | Output path/service | Dependencies | Completion evidence | Status |
|---|---|---|---|---|---|---|---|
| FG-P0-01 | Freeze and continuously verify v18 compatibility identity | Release/reliability engineer | Recovery manifest/artifact | Existing recovery verification | None | Exact bytes/hash/version/deployment PASS before/after every candidate | READY |
| FG-P0-02 | Finalize typed request/response/case schemas and honest HTTP matrix | Backend integration engineer | P0 contract, local source, 45 fixtures | `worker-fairy-godmother/src/`, tests | None | Every response type schema-valid; invalid/rate/service use honest status; no success-shaped failure | READY |
| FG-P0-03 | Complete four-scope arrival and request client | Frontend + product UX | Experience brief, visitor standard, typed schemas | Page and `fairy-godmother-v2.js` | FG-P0-02; shared recognition adapters mocked | Fixture-driven first/new/local-Card/account states with prohibited-claim assertions | READY IN ISOLATION |
| FG-P0-04 | Sensitive-data warning and redaction gate | Privacy/security + backend | Privacy contract/fixtures | Worker preprocessing/tests | FG-P0-02 | Credentials/payment/ID/confidential cases inspect provider/log payloads and prove no leak/no charge | READY |
| FG-P0-05 | Independent semantic classifier authority packet | AI safety/accuracy owner | Frozen 63-case semantic + 16 architecture set and signed harness | Provider decision/evidence packet only | Provider/model/privacy/cost authority | Exact model/version/terms/cap; unchanged signed run; receipts; independent slice verdict | BLOCKED — AUTHORITY REQUIRED |
| FG-P0-06 | Configure isolated classifier and pass semantic gate | Backend + AI safety | Accepted FG-P0-05 decision | Staging secret/binding/config | FG-P0-05, staging resource authority | Frozen trial gate plus Worker replay: zero answer calls/writes on boundary/uncertain; no label leakage | BLOCKED — BUILD REMAINS REQUIRED |
| FG-P0-07 | Build verified retrieval and claim-validation path | Research/accuracy + backend | Currentness ontology, source policy | New isolated retrieval binding/service + Worker adapter | Provider/data authority; Control Room service path | Current AI/product/law/research suite; source/as-of validation; correction/removal; no fabricated finding | BLOCKED — BUILD REMAINS REQUIRED |
| FG-P0-08 | Approve/configure answer provider and task contracts | AI product/backend | Typed schemas, classifier, retrieval, task/learning standard | Staging answer adapter/config | Provider/model/privacy/cost authority; FG-P0-06/07 | 45-case API suite, task-specific usefulness, hard-failure zero, energy invariance | BLOCKED — BUILD REMAINS REQUIRED |
| FG-P0-09 | Constrain voice and energy in real outputs | Brand/editorial + AI product | Eight presentation choices, accepted provider outputs | Prompt/presentation tests and copy rules | FG-P0-08 | Same substance/risk/recommendation/spend across energies; copied deliverable performance-free; brand ≥17/20 | BLOCKED BY FG-P0-08 |
| FG-P0-10 | Define shared verified-identity adapter contract | Platform identity owner + FAiRY owner | Four visitor scopes, account/Card contracts | Shared service interface + Worker/page adapter spec | Platform/Control Room | Forged email rejected; local Card cannot authorize; expiry/sign-out/revoke/second-device suite | BLOCKED — PLATFORM COORDINATION |
| FG-P0-11 | Build atomic shared Plays transaction service | Platform/economy/data owner | Functionality map, grant inventory, ledger schema | Shared service/store, not FAiRY dossier | Platform/Control Room architecture/resource authority; FG-P0-10 | Append-only grant/reserve/spend/release/refund; dedupe; atomic final-balance race; audit/read-after-write | BLOCKED — PLATFORM COORDINATION |
| FG-P0-12 | Integrate House with identity, cases and Plays | Backend + frontend | FG-P0-02/10/11 | Worker/page adapters and receipt UI | FG-P0-10/11; typed success | Normal success commits once; every other outcome releases/no-spend; 3 fittings no extra spend; visible balance receipt | BLOCKED BY SHARED CONTRACTS |
| FG-P0-13 | Reconcile earning producers and balance consumers | Economy owner + affected champions | Full Tour/current reward claims, Bank/Closet/House maps | Shared producer/consumer changes via Control Room | FG-P0-11; affected-owner assignments | Every promoted grant source proves completion→grant; update/revoke/refund propagates; false claims removed only by owner decision | BLOCKED — CONTROL ROOM |
| FG-P0-14 | Complete bounded retry, conflict and fitting lifecycle | Backend + frontend | Case/version and typed error contracts | Worker/page/case tests | FG-P0-02/10/11/12 | 10s warning, 25s terminal state, same-ID retry, stale version, 3 fittings, duplicate/two-tab/two-device | BLOCKED BY SHARED CONTRACTS |
| FG-P0-15 | Build prompt-free lifecycle analytics | Analytics + privacy | Event dictionary, functionality map | Shared analytics registry + emitters | Stable lifecycle; Control Room | Dedupe, prohibited-field scan, response/latency/ledger/usefulness/refund events and alerts | BLOCKED — CONTROL ROOM |
| FG-P0-16 | Compete final room/object interaction and admit assets | Environment/UI + brand | Experience brief, sitewide style/artwork system, current room evidence | Placement candidates/evidence then page assets | Brand/rights review; stable component states | Incumbent + two challengers + red team/blind review; visual/brand ≥17/20; mobile/accessibility states | OWNER VISUAL GATE |
| FG-P0-17 | Rendered page fixture matrix | Frontend QA + accessibility | All typed states and four visitor scopes | FAiRY evidence folder | FG-P0-03/12/14; browser | 320/390/desktop screenshots, keyboard/focus/live regions, zoom/reduced motion, copy/fitting/retry/offline | BLOCKED BY INTEGRATION |
| FG-P0-18 | Independent complete product judgment | Independent product, trust, brand, learning, UX and data judges | Exact staging candidate and evidence | Independent review packet | FG-P0-05–17 | Quality, accuracy/trust and brand each ≥17/20; every fixture route/type; zero hard failures | BLOCKED BY CANDIDATE |
| FG-P0-19 | Exact staging integration and release packet | Release manager + Control Room | Accepted source, resources, tests and reviews | Separate deployment/release evidence packet | FG-P0-18; staging authority | Exact source/version/bindings/hashes/cost/rollback; staging API/page PASS | BLOCKED BY GATES |
| FG-P0-20 | Production compatibility cutover and public proof | Release manager + independent public verifier | Accepted release packet | Production Worker/page under separate authority | Explicit production authority; FG-P0-19 | Snapshot v18; Worker-first typed compatibility; page deploy; real page→Worker/ledger/accessibility checks; rollback tested | NOT AUTHORIZED |

## Immediate executable product lane

The FAiRY owner may begin FG-P0-01 through FG-P0-04 and prepare fixture-driven
mock adapters for FG-P0-03 without external calls, secrets, shared-state writes
or production changes. The lane stops before claiming account, balance,
semantic accuracy, current-source success or real answer quality.

Suggested commands from `Website-homepage/`:

```sh
node scripts/check-product-stewards.mjs --owner-entry fairy-godmother
cd worker-fairy-godmother
npm test
npm run dry-run
cd ..
node scripts/test-fairy-godmother-page-contract.mjs
node scripts/check-inline-js.js
```

Before any provider trial, generate and sign the unchanged label-free input
artifact through the existing harness, record the exact model/version,
published pricing evidence, provider retention/region/training terms, maximum
tokens/requests/cost, run date and independent scorer. Do not put expected
labels, taxonomy or evaluator-only chronology into the provider payload.

## Required provider decision card

No provider call is authorized until one decision record contains:

| Field | Required value/evidence |
|---|---|
| Function | classifier / retrieval / answer |
| Provider and exact model/version | Immutable identifier where available |
| Endpoint and region | Exact processing path |
| Data sent | Minimum fields and redaction result |
| Retention/training | Official terms and configured setting |
| Secrets/service path | Secret name and staging-only binding; never the secret value |
| Input/output ceilings | Characters/tokens, timeout and retry |
| Pricing authority | Dated official price, currency and billable units |
| Trial ceiling | Exact requests/tokens/max cost |
| Failure behavior | Typed no-charge outcome |
| Evidence binding | Input/output/receipt/report hashes, timestamps and runner commit |
| Approver | Named data/spend/provider authority |

## Allowance/reward ledger acceptance matrix

| Scene | Required authoritative transitions | Expected visible result | Must not happen |
|---|---|---|---|
| Eligible success | grant available → reserve → validated `case_success` → spend | Case receipt and decreased available balance | Spend before validation or duplicate spend |
| Needs information | no reserve, or reserve → release | Question/useful-now and unchanged balance | Treat as success |
| Boundary/classification uncertain/current info unavailable | no reserve, or reserve → release | Distinct no-charge state | Answer-model call where prohibited |
| Provider timeout/malformed/error | reserve → release | Retryable typed failure and unchanged balance | HTTP-200 success prose or lost reservation |
| Duplicate same request ID | prior authoritative result returned | One case/one spend | Second provider call or spend |
| Two tabs with one Play | one atomic reserve wins; other rejected/no-charge | Both tabs show reconciled balance | Negative balance or two spends |
| Up to three fittings | case version advances; fitting allowance decrements | Revised answer and same spend receipt | New Play spend |
| Post-commit failed delivery/correction | auditable refund linked to original spend | Refunded receipt and restored balance everywhere | DOM/local counter “refund” |
| Grant reversal/expiry/account revoke | append adjustment/expire/revoke semantics | Bank/House/consumers reconcile | Stale spendable balance |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Required result |
|---|---|---|---|
| Product/content quality | 45-case real-provider answers plus four visitor journeys and task-specific scorecard | Independent product judge | ≥17/20, usefulness/task fit averages meet P0 contract, no generic filler |
| Complete main-page/subproduct/cross-building journey | Full Functionality Map rows and transition/propagation matrix | Functionality & Platform Director | Every P0 row passes or remains honestly BLOCKED; no competing shared contract |
| Accuracy, safety and trust | Frozen semantic/architecture trial, current-source suite, privacy payload/log inspection and adversarial boundary/mixed-intent tests | Independent AI safety/accuracy/privacy judges | ≥17/20, zero hard failures, zero fabricated current claims, no private leakage |
| Positive LAiDIES brand contribution | Real-output energy invariance and final room competition | Independent brand judge | ≥17/20, strong Godmother identity without weakening truth/usability |
| Learning and transfer | AI explanation/decision cases against learning standard and ecosystem handoffs | Independent learning judge | Correct mental model, adaptable reasoning, limits, no obsolete false contrast |
| UX and accessibility | Typed state matrix at desktop/390/320, keyboard, focus/live announcements, zoom, reduced motion, retry/copy/fitting | Independent UX/accessibility judge | Complete journeys pass; no untested compliance claim |
| Frontend/backend/data integrity | Schema/HTTP, identity forgery, case version, ledger atomicity/idempotency/refund, analytics prohibited-data and provider-failure suites | Independent technical/data/release judge | All deterministic tests PASS and shared stores read back authoritative truth |
| Visual/media quality | Incumbent + two challengers + red team/blind comparison in context | Independent visual/brand/accessibility judges | Accepted direction meets room/interface job and ≥17/20 brand floor |
| Exact release | Staging version/bindings/hashes/cost/rollback then public-origin suite | Release manager + public verifier | Exact candidate VERIFIED LOCALLY, then separately DEPLOYED and VERIFIED PUBLICLY |

## Stop conditions

Stop the affected lane immediately if:

- any non-success consumes or strands a Play;
- browser email, local Card or localStorage becomes authorization;
- classifier uncertainty falls through to the answer model;
- current claims succeed without verified sources and `asOf`;
- provider HTML/Markdown is injected into the page;
- duplicate/retry/two-tab behavior creates two cases or spends;
- raw prompt, answer, name, email, credential or case text reaches logs or
  analytics contrary to contract;
- provider/model/terms/cost differ from the approved decision card;
- staging reuses a production binding, secret, route or data store;
- the frozen v18 artifact changes;
- any of the three non-compensable scores is below 17/20; or
- a report/local build/deploy is described as public verification.

## Integration and release

- **Affected champions:** Platform/Control Room, identity/Resident Card,
  Bank/economy, Closet/approved balance consumers, every promoted earning
  producer, analytics, LIBRAiRY, High/classes, episodes and NewsStand.
- **Canon/identity/reward/analytics dependencies:** changes occur only through
  their shared owners and are bound to this packet by interface/evidence, not
  copied into the House.
- **Exact local candidate:** `worker-fairy-godmother/src/index.js` plus
  `games/fairy-godmother.html` and `content/site/fairy-godmother-v2.js` at the
  eventual accepted source commit.
- **Release authority:** none in this packet. Isolated provider/staging
  resources and production each require their named authority.
- **Rollback:** immutable production v18 plus the previous accepted page
  artifact; snapshot and verify before cutover.
- **Public verification:** real origin, exact deployed Worker/page, one
  authorized synthetic success, no-charge boundary/failure, authoritative
  balance/receipt, accessibility, analytics and rollback checks.

## Measurement and learning

- **Baseline:** recovered v18/live audit plus current local deterministic test
  evidence; neither is a real P0 outcome baseline.
- **Success signals:** typed route distribution, validated completion,
  usefulness, fitting use, safe handoff, no-charge correctness, refunds,
  latency and visitor-scope conversion—without raw case content.
- **Failure signals:** malformed response, current success without sources,
  boundary regression, duplicated spend, stranded reservation, privacy leak,
  provider cost/latency spike, accessibility failure and unhelpful output.
- **Review cadence:** after each provider/staging gate and at a dated aggregate
  post-release checkpoint chosen in the release packet.
- **Decision after measurement:** improve task/provider/routing/room path,
  adjust bounded allowance through the shared economy, or hold promotion; do
  not widen claims from engagement alone.
- **Dossier updates:** update `state.json`, `backlog.md`, evidence and this
  packet after each accepted gate; shared decisions enter the engine ledger
  through Control Room.

## Current truthful handoff

- Experience and functionality recovery: **SPECIFIED**.
- Typed Worker/page candidate: **BUILT LOCALLY** with deterministic evidence,
  not rendered or independently accepted.
- Semantic classifier, retrieval, real answers, identity, case store and Plays:
  **BLOCKED — BUILD REMAINS REQUIRED** at their named authority/dependency
  gates.
- Isolated staging and production: **NOT DEPLOYED**.
- Promotion: **FIX BEFORE PROMOTION**.
