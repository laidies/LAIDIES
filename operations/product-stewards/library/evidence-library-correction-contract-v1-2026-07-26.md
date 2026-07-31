# LIBRAiRY correction contract v1 — bounded local evidence

**Status:** VERIFIED LOCALLY — CONTRACT/DETERMINISTIC SERVICE SCOPE ONLY  
**Date:** 2026-07-26  
**Trigger:** P0 Library vertical build packet section 4 and Platform Reliability
PR-12  
**Authority ceiling:** no production provider, live service, book admission,
`correction_state: clear`, deployment, commit or push

## Outcome

A versioned, deterministic local correction ledger/service contract now proves:

`claim-scoped submit → privacy-safe receipt → triage → corrected pending
independent readmission OR demoted → propagation output`

The propagation output has bounded consumers for the admission compiler,
site index, Miss Jeeves and Puffy reopen recheck. It cannot admit a book and
never emits `correction_state: clear`.

The local service is deliberately an in-memory reference implementation. It
does not select or imply a production provider.

## Re-entry and source truth

Both required owner-entry preflights passed before implementation:

```text
node scripts/check-product-stewards.mjs --owner-entry platform-reliability
owner_entry_product=platform-reliability:PASS

node scripts/check-product-stewards.mjs --owner-entry library
owner_entry_product=library:PASS
```

The implementation reconciled:

- `operations/product-stewards/library/build-packet-p0-admitted-book-reader-puffy-closet-2026-07-26.md`, section 4;
- `operations/product-stewards/library/FUNCTIONALITY-MAP.md`, the missing
  correction-ledger and propagation rows;
- `operations/product-stewards/platform-reliability/OPERATING-SPEC.md` and
  PR-12 in its backlog;
- the canonical Verification Rulebook source and claim ledger; and
- the current generated Rulebook correction links.

Observed source truth: the Verification Rulebook remains `HOLD`. Its current
correction route is a claim-scoped `mailto:` link that carries `VR-C###`, but
does not create an authoritative correction ID, receipt, triage state,
retention boundary, resolution record or downstream propagation event.

## Files and boundaries

| File | Purpose |
| --- | --- |
| `content/library-books/corrections/library-correction-contract.v1.json` | Versioned states, fields, privacy/retention boundary, authority ceiling and propagation consumer contract. |
| `scripts/library-correction-service.mjs` | In-memory immutable-ledger reference service with idempotent submit, triage, corrected/demoted terminal states, an expiring reporter-payload vault and consumer projections. |
| `operations/test-fixtures/library-corrections/verification-rulebook-vr-c001.json` | Deterministic claim/source/location fixture plus explicit observation of the present `mailto:` limitation. |
| `scripts/test-library-correction-service.mjs` | Contract, lifecycle, privacy, idempotency, immutable history, retention and propagation regression suite. |

No changes were made to `library.html`, `content/site/puffy-bookmarks.js`,
`laidies-card.html`, the ECO renderer, the admission manifest, the site index,
live services or deployment state.

## Contract details proved

- Submission is bound to exact `book_id`, `section_id`, `claim_id`,
  `source_id` and `content_version`.
- The reporter receipt contains only opaque correction/receipt IDs, state,
  creation time and a status reference.
- Reporter finding text and full evidence URL live only in a separate
  temporary vault. The immutable ledger stores a SHA-256 digest, safe evidence
  origin, retention class and expiry.
- Raw reporter payload has a 30-day default retention boundary; purge leaves
  the audit ledger intact.
- Resident Card/account identifiers, raw queries, reading activity/text,
  private Puffy purpose and saved-title fields are rejected.
- Same idempotency key plus same request returns the original correction;
  reuse with a different request fails closed.
- Immutable versions retain exact created/updated/resolved timestamps,
  monotonic `record_version`, `version_id`, `supersedes_version`, and a
  projected `superseded_by` chain without rewriting prior ledger events.
- A corrected result emits `corrected-pending-readmission` and requires
  independent readmission.
- A demotion emits `correction-required` and `demote-to-hold`.
- Site index and Miss Jeeves are told to suppress the affected claim until
  current admission; Puffy is told to recheck admission on reopen while
  preserving an honest unavailable marker.

## Verification

```text
node scripts/test-library-correction-service.mjs
LIBRARY CORRECTION CONTRACT PASS · checks=22 · ledger_events=6 · provider=none · admitted=0

node scripts/test-library-product.cjs
LIBRAiRY PRODUCT PASS
checks=47
external_requests_blocked=34

node scripts/validate-library-product.mjs
LIBRAiRY CONTRACT PASS · books=15 · hold=8 · preview=7 · available=0 · Puffy write/read truth

node --check scripts/library-correction-service.mjs
PASS

node --check scripts/test-library-correction-service.mjs
PASS
```

These checks prove bounded local mechanisms only. They do not establish a real
intake provider, editorial staffing/SLA, integrated UI, consumer application,
admission, deployment or public outcome.

## Remaining owner/provider blockers

1. **Platform + Library/editorial:** select and approve a real intake/status
   provider or owned service, including authentication/abuse controls,
   availability, backup, deletion/export, regional/data-processing terms and
   failure recovery. No provider is proposed by this contract.
2. **Ali or delegated data authority:** approve production raw-payload
   retention, lawful basis/notice and any reporter contact/reply policy. The
   30-day value here is a testable local default, not production authority.
3. **Library/editorial:** name triage owners, coverage/SLA, evidence-handling
   rules and the authority for corrected source versus demotion.
4. **Admission/release owner:** integrate the propagation projection into the
   manifest compiler without allowing a correction record to self-admit or set
   `correction_state: clear`.
5. **Library/Miss Jeeves/index/Puffy owners:** consume and prove the exact
   propagation output in deterministic integration tests and then the
   candidate/public journey.
6. **Experience/accessibility owner:** replace or augment the current
   claim-scoped `mailto:` with an accessible submit/receipt/status journey
   after the provider and retention rulings; preserve automatically carried
   claim/source/location IDs.
7. **Independent reviewer:** run provider failure, retry, replay, retention,
   correction, demotion and all-consumer propagation gates against the exact
   integrated artifact.

## Learning scan

No new failure, surprise or prevention rule qualified for the shared
painpoints ledger. Separating expiring reporter content from immutable
correction events is the direct local application of the existing privacy,
retention and append-only transaction standards, not a new project lesson.
