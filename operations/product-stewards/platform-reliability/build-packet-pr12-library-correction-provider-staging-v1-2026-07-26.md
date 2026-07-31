# PR-12 build packet — Library correction provider staging v1

**Status:** LOCAL CONTRACT PASS — STAGING PROVIDER/AUTHORITY REQUIRED  
**Observed:** 2026-07-26  
**Owners:** Platform service/integrity; Library editorial triage; Library,
Miss Jeeves, index and Puffy consumer owners; Privacy; independent Release  
**Release rule:** BUILD BEFORE LAUNCH. The Verification Rulebook remains HOLD,
`admitted=0`; this packet cannot admit it or set `correction_state: clear`.

## Admitted local dependency

The provider-neutral reference path already passes:

```text
node scripts/check-product-stewards.mjs --owner-entry platform-reliability
owner_entry_product=platform-reliability:PASS

node scripts/check-product-stewards.mjs --owner-entry library
owner_entry_product=library:PASS

node scripts/test-library-correction-service.mjs
LIBRARY CORRECTION CONTRACT PASS · checks=22 · ledger_events=6 · provider=none · admitted=0
```

Exact local contract:

`claim-scoped submit → privacy-safe opaque receipt → append-only triage event
→ corrected-pending-independent-readmission OR demoted → versioned propagation
to admission compiler, site index, Miss Jeeves and Puffy reopen recheck`.

Source:

- `content/library-books/corrections/library-correction-contract.v1.json`;
- `scripts/library-correction-service.mjs`;
- `scripts/test-library-correction-service.mjs`;
- `operations/test-fixtures/library-corrections/verification-rulebook-vr-c001.json`;
- `../library/evidence-library-correction-contract-v1-2026-07-26.md`.

## Smallest staging architecture

Do not select a new vendor by convenience. Control Room must name an authorized
isolated project/provider first. The adapter must implement these logical
stores without changing the v1 public contract:

1. **`correction_events` — append-only:** opaque correction/receipt IDs, exact
   book/section/claim/source/content version, safe reporter digest/origin,
   state, owner, created/updated/resolved time, record/version/predecessor.
2. **`correction_payload_vault` — restricted and expiring:** raw finding and
   optional HTTPS evidence URL, inaccessible to public/status consumers,
   purged under the approved retention job.
3. **`correction_idempotency` — private:** idempotency key plus exact normalized
   request identity; same request replays, conflicting reuse rejects.
4. **Status projection — read-only:** receipt ID, correction ID, state,
   created time and opaque status reference only.
5. **Propagation outbox — append-only/idempotent:** exact versioned projections
   for admission, index, Miss Jeeves and Puffy; consumer acknowledgement is
   separate and cannot upgrade admission.

No Resident Card, account ID, email, name, reading history/query/text, saved
title or private Puffy purpose enters these stores. A Card or account is not
required to report a correction and cannot increase editorial authority.

## Exact authority required before staging

Control Room must return one checksum-bound authorization naming:

- existing isolated provider/project ID, region and environment;
- permitted local adapter/migration paths and migration apply owner;
- secret owner and non-logging test runner;
- whether anonymous intake is permitted and its abuse/rate/CORS controls;
- Library editorial triage owner(s), coverage and target status cadence;
- Ali/delegated Privacy ruling for raw reporter retention (the local 30 days is
  a test default only), deletion/export, notice and reporter-contact policy;
- backup/restore and purge-job owner;
- exact consumer write locks for admission compiler, site index, Miss Jeeves
  and Puffy; and
- independent staging judge, test IDs and cleanup/rollback authority.

Absent that tuple, `production_provider=null` remains authoritative. No trial,
purchase, Supabase assumption, SMTP/contact collection or live mutation is
authorized.

## Staging implementation order

1. Platform ports the exact local interface to the named isolated provider and
   applies schema/RLS only under the named migration authority.
2. Independent security judge proves public submit cannot read vault/events,
   triage can access only its role, direct state/version rewriting fails, and
   service credentials never reach a browser/log.
3. Execute deterministic submit/replay/conflict, unavailable/timeout/retry,
   backwards-clock, malformed/private-field, evidence-URL and rate-limit cases.
4. Execute triage → corrected and triage → demoted chains; prove immutable
   history, exact successor IDs and no `clear` state.
5. Prove purge at the approved boundary while immutable audit events remain;
   backup/restore must not resurrect expired reporter payload.
6. Under separate consumer locks, apply the exact propagation version to all
   four consumers and record acknowledgements.
7. Independently verify correction/removal on current and stale caches, then
   run exact Library → reader → Puffy → Closet reopen behavior for all four
   visitor scopes without adding identity semantics.

## Acceptance matrix

| Gate | Required proof | Acceptance owner |
|---|---|---|
| Intake/receipt | Exact claim location; opaque safe receipt; unavailable/timeout retry; same-request replay/conflict reject | Platform + Library |
| Access/privacy | Anonymous boundary; no identity/reading data; vault isolation; logs allowlisted | Privacy + security judge |
| Triage/status | Named owner, monotonic versions, corrected/demoted terminal state, safe status lookup | Library editorial |
| Retention | Approved duration, purge, deletion/export, backup non-resurrection | Privacy + Platform |
| Propagation | Exact version reaches admission/index/Miss Jeeves/Puffy; stale version rejects; correction never self-admits | Each consumer + Platform |
| Accessibility | Claim IDs carried automatically; keyboard/status/error recovery; no email required | Library/accessibility judge |
| Analytics | Only controlled outcome/error/duration buckets; never reporter content, URL, identity or reading data | Analytics + Privacy |
| Release | Exact schema/code/artifact/migration hashes, rollback, staging receipt and later public-origin journey | Independent Release |

## Literal remaining blocker and next action

**Blocker:** no provider/project, retention authority, triage roster or consumer
integration lock is authorized.  
**Next action:** Control Room supplies the exact authorization tuple above.
Platform then builds the provider adapter and migration in the named isolated
scope. Until that happens, the local in-memory PASS remains useful contract
proof only and the Library remains HOLD.
