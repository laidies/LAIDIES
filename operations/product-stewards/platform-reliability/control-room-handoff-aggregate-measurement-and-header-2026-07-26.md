# Control Room handoff — aggregate measurement v1 + shared-header 320 gate

**Product/system:** Platform Reliability  
**Owner task:** `019f9f59-6f59-7500-af47-455f39d1c0c5`  
**Evidence time:** 2026-07-26 12:24 PDT (America/Vancouver)  
**Status:** MEASUREMENT BUILT AND VERIFIED LOCALLY — PROVIDER DELIVERY BLOCKED;
SHARED-HEADER REGRESSION CHECK BUILT — SHARED HEADER HOLD / VISITOR CONTAINMENT
PASS  
**Lock used:** Platform-owned contract/test/evidence scope only

## Bounded work completed

1. Reconciled Audience `measurement-state.json`, the shared event dictionary,
   External Services, Plausible/Clarity evidence, Resident Card state and social
   repository counts.
2. Built `laidies.aggregate-measurement.v1`: JSON Schema, runtime validator,
   compiler, checksum-bound current snapshot, fail-closed consumer and
   adversarial/schema-mutation suite.
3. Preserved all four unavailable audience metrics as `null`, not zero; kept
   35 planned/built social objects separate from 0 ready/0 published.
4. Verified the exact Visitor live-route admission hashes and reran its current
   779-check browser suite with zero failures.
5. Built a provider-neutral 320px shared-header harness without editing shared
   visual production files. It reproduces the raw shared failure at 333.94px
   and proves the current Visitor containment at 312px.
6. Updated Platform backlog/state and recorded BTB-151/BTB-152 prevention rules.

## Evidence versus unproved claims

**Observed locally**

```text
AGGREGATE MEASUREMENT V1 PASS metrics=4 null_unknown=4 sources=3 invalid=10 stale=1 schema_mutations=3 privacy=aggregate-only provider=none
AUDIENCE MEASUREMENT SNAPSHOT V1 BUILT metrics=4 known_values=0 payload_sha256=2760c3aff93f139b386af831b1f2f61d825792995771f21064e9243e97774c87
Visitor live route: checks=779 failures=[]
SHARED HEADER 320 CHARACTERIZATION PASS shared_status=HOLD raw_nav_right=333.94 visitor_nav_right=312
SHARED HEADER 320 GATE FAIL navRight=333.94 scrollWidth=334 viewport=320
PRODUCT STEWARD SYSTEM PASS / owner_entry_product=platform-reliability:PASS
```

**Not proved**

- no Plausible aggregate was read and no Stats API/shared report is connected;
- no production Resident Card creation count, Auth/RLS or cross-device behavior;
- no social provider publication/outcome receipt;
- no Clarity privacy/settings or insight review;
- no shared-header visual repair;
- no deploy, public-origin verification, provider mutation or release.

## Literal files

- `build-packet-aggregate-measurement-v1-2026-07-26.md`
- `evidence-aggregate-measurement-v1-local-2026-07-26.md`
- `aggregate-measurement/v1/`
- `../../../scripts/build-audience-measurement-snapshot-v1.mjs`
- `evidence-shared-header-320-regression-v1-2026-07-26.md`
- `shared-header/v1/test-shared-header-320.mjs`
- `backlog.md`
- `state.json`
- `../../../painpoints-log.md`

No Homepage, Visitor, shared-header production source, live route, provider,
credential, account, migration or public artifact was changed by this bounded
turn. The already-edited Visitor route was read and tested only.

## Dependencies and acceptance owners

| Dependency | Affected owner | Required acceptance |
|---|---|---|
| Existing Plausible reporting path, exact window/methodology, read-only scope and secret owner | Audience + Platform + provider account owner | Platform delivery/error/retry proof; Audience definition/interpretation; Privacy log/retention review; Control Room admission |
| Authorized Identity staging/RLS and aggregate query | Identity + Platform + Privacy | Count only first verified account-backed canonical Card creation; minimum cohort suppression; independent staging review |
| Social provider receipts | Audience/channel publisher | URL/time/account-bound aggregate receipts; production/admission/publication remain separate |
| Shared `sv-global-header.js` repair lock | Shared Header owner + affected page owners | Raw `--gate` PASS plus 320/390/1440 semantic/accessibility regression and owner route reacceptance |
| 17 destination owner receipts | each building owner + projection compiler | checksum-bound successor sealing and new Visitor/Homepage acceptance |

## Exact next actions

1. Control Room names the existing Plausible read-only access path, exact
   reporting period/methodology, secret owner and non-public staging consumer
   lock. Platform then implements the smallest provider adapter and runs
   timeout/retry/rate/tamper/privacy proof.
2. Identity aggregation waits for the already-required authorized Identity
   staging gate; it cannot be inferred from device-local Card behavior.
3. Control Room grants a separate shared-file lock to the Shared Header owner.
   That owner repairs `content/site/sv-global-header.js`, runs the Platform
   `--gate`, and routes exact hashes to affected page owners. Platform does not
   make the visual repair under the current lock.
4. Owner-receipt intake continues separately; Visitor remains locally admitted
   with all 17 destinations held, not promoted.

## Authority accounting

Public authority: **not used**.  
Deploy authority: **not used**.  
Provider/account/credential authority: **not used**.  
Spend authority: **not used**.  
Ali approval: **not requested or used**.  
External blocker: authorized provider/staging inputs named above.  
Shared-file blocker: checksum-bound Shared Header integration lock.
