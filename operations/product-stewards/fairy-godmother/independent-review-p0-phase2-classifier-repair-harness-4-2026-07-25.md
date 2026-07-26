# Independent review — FAiRY classifier repair/harness 4

**Date:** 2026-07-25  
**Reviewer role:** independent no-credential evaluation-evidence judge  
**Candidate evidence:** `evidence-p0-phase2-classifier-repair-harness-4-2026-07-25.md`  
**Prior failed review:** `independent-review-p0-phase2-classifier-repair-harness-3-2026-07-25.md`  
**Scope:** calendar/order validation, rate and no-charge authority, tokenizer provenance, request isolation, signing cross-binding, fixture integrity and deployment isolation  
**Boundary:** read-only inspection and ephemeral local probes; no credentials, external account, provider call, network mutation, key creation, binding, staging, deployment, production mutation, Git operation or product/state/queue edit

## Verdict — FAIL BEFORE PROVIDER TRIAL

The fourth repair rejects the three literal invalid cases from the prior
review:

- impossible date `2026-99-99`;
- vague legacy no-charge object containing `basis: "free today"`; and
- `runner_tokenizer` with missing/unknown identity.

It also correctly enforces calendar ordering, exact provider/model/version
scope, structured no-charge fields, retained-byte hashes, tokenizer
name/version/configuration/implementation hashes, signed run-identity
cross-binding, send/private separation, frozen fixture integrity and zero
production bindings.

The evidence chain nevertheless remains self-assertable in meaning-equivalent
forms. A syntactically plausible URL or approved-document ID plus arbitrary
locally authored bytes is accepted as authority. A structured no-charge
entitlement whose declared token limit is smaller than the measured run is
accepted. A plausible tokenizer identity plus arbitrary retained bytes is
accepted without using that implementation to recount any token total.
`provider_response` usage still has no per-row receipt or receipt hash.

Four independent complete 63/63 probes produced
`tokenAndCostCoverageComplete: true` and `allRequiredGatesPass: true`:

1. invented published rates bound to
   `https://attacker.example.com/pricing` and arbitrary bytes;
2. a self-labelled approved no-charge document with `maxTokens: 1` for a run
   reporting 21,042 tokens;
3. a plausible-looking `runner_tokenizer` whose “implementation bytes” were
   the sentence `not a tokenizer implementation; arbitrary retained bytes`,
   with no independent recount; and
4. a future run dated 2099 with internally ordered 2099 rate dates.

The repair proves internal consistency and post-scoring immutability. It does
not yet prove external authority, entitlement sufficiency, token-count
reproducibility or that the run date represents an actual authorized run.
Those are the exact provenance properties the repair claims.

Gate A classifier/quote architecture remains passed for this bounded
candidate. Gate B evidence provenance fails. The semantic provider remains
**UNPROVEN**, and FAiRY remains **FIX BEFORE PROMOTION**.

## Scores

These scores apply to the local architecture and evaluation-evidence
mechanism, not to an uncalled provider or the final FAiRY experience.

| Non-compensable gate | Score | Result | Basis |
|---|---:|---|---|
| Classifier architecture | 18/20 | PASS | Strict fail-closed routing, quote isolation, deadline, side-effect and response-contract controls remain intact. |
| Evaluation evidence integrity | 14/20 | FAIL — hard authority/recomputation defect | Hashes, dates, scope and signing are much stronger, but arbitrary evidence can still appoint itself authority; limits and tokenizer counts are not recomputed. |
| Product/content quality and user value | 12/20 | NOT PROVEN | No authorized semantic-provider or rendered user-experience trial exists. |
| Factual/technical accuracy, safety and trust | 14/20 | FAIL / NOT PROVEN | Local containment is strong, but a false provenance certificate can still turn self-authored evidence into a green operational claim. |
| Positive LAiDIES brand contribution | 14/20 | NOT PROVEN | The evidence-first intent fits LAiDIES; describing internally consistent but unauthoritative records as verified provenance does not. |

The required 17/20 product, accuracy/trust and brand floors are not met.
Architecture cannot compensate for a hard evidence-integrity failure.

## Exact candidate identity

| Artifact | SHA-256 |
|---|---|
| `worker-fairy-godmother/src/index.js` | `386357c2f453f9cb410fd5931d56d128b6c0c0914f58176923a6c52200ca2515` |
| `worker-fairy-godmother/harness/lib.mjs` | `e99d67e8bbb072eae9bbab02872a95700d3284aa5b31363914d089fd5112f92e` |
| `worker-fairy-godmother/harness/score-provider-run.mjs` | `14587d1f4275843e19e858ded21fe32d0d8412f8bf1295bc90311d60a61eedcf` |
| `worker-fairy-godmother/harness/verify-run-artifacts.mjs` | `7ad0679c27495066a7f83ad61b4fbe62f5d89b6d478647315186732588332197` |
| `worker-fairy-godmother/test/classifier-harness.test.mjs` | `134d5c4fa8553de8182e32f9ba82920be7f86f908d5ec2626ebeb413f1d098f5` |
| frozen 79-case set | `01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da` |

## Fresh verification

- Recovery artifact: checksum
  `127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e`
  and 55,137 bytes — PASS; production mutation `false`.
- Worker, architecture and harness tests: **36/36 PASS**.
- Core evaluation fixture integrity: **45/45 PASS**.
- Frozen held-out classifier fixture: **63 semantic + 16 architecture =
  79/79 PASS**; frozen hash matches.
- Wrangler dry-run: **PASS**, 94.11 KiB / 29.38 KiB gzip, **no bindings
  found**.
- Product steward validator: **PASS**, 65 products and 3/3 active lanes.
- Missing `--measurement-authority`: CLI rejects before scoring.
- Altered authority bytes after scoring: standalone artifact verification
  fails.
- Signed provider/model/version differing from the scored run identity:
  signing rejects.

Passing the existing suite proves its assertions. It does not override the
meaning-equivalent green probes absent from that suite.

## Prior invalid samples — independently reproduced

| Previously accepted invalid metadata | Current result |
|---|---|
| `published_rates` with `effectiveDate: "2026-99-99"` | REJECTED: not a real calendar date |
| free-text no-charge `{ effectiveDate, basis: "free today" }` | REJECTED: does not satisfy exact scope/structured entitlement schema |
| `runner_tokenizer` with name `unknown` | REJECTED: tokenizer identity missing or invalid |

Additional existing controls reject:

- effective date later than access date;
- access date later than declared run date;
- provider/model/version scope mismatch;
- missing authority object;
- HTTP/localhost authority URL;
- authority bytes that differ from the recorded hash;
- expired or wrong-scope no-charge entitlement;
- tokenizer configuration changed without a new hash;
- tokenizer implementation bytes changed after scoring; and
- runner-tokenizer use without tokenizer metadata.

These are genuine closures of the literal prior failures.

## Request isolation and signing

A fresh export emitted 63 label-free requests and only:

- `send/provider-input.jsonl`
- `send/classifier-system-prompt.txt`
- `send/send-manifest.json`

Private output remained:

- `private/join-map.json`
- `private/export-metadata.json`

The send bundle contains no expected object, family label, case ID,
measurement authority, pricing/entitlement record or tokenizer evidence.
Provider-input SHA-256 remained
`2c5c9a1159ba39e2d6a856ce27a0f673f534865b31d3d68d62a8c2663452cb7f`.

The score report binds exact run provider, model, model version and run date.
Manifest signing rejects a different provider/model/version, and the report
hash binds the run date and measurement metadata. The standalone verifier
rehashes the authority and tokenizer implementation bytes supplied to it.
These isolation and post-scoring integrity controls pass.

## Meaning-equivalent failures

### 1. Any plausible URL plus arbitrary bytes can become “official”

The probe declared:

```json
{
  "kind": "official_url",
  "identifier": "https://attacker.example.com/pricing",
  "evidenceSha256": "<hash of arbitrary locally authored bytes>"
}
```

It paired that object with invented rates of `$987,654` input and `$123,456`
output per million tokens. The scorer accepted the authority and produced a
fully green report.

`validateEvidenceAuthority` verifies URL syntax and byte/hash equality. It
does not establish that:

- the hostname is an approved official authority for the scored provider;
- the retained bytes were fetched from that URL;
- the bytes contain the provider/model/rates/dates asserted by metadata; or
- the authority was preregistered out of band before the run.

The maker’s own green fixture illustrates the same limitation: it calls
`https://provider.example.com/pricing` official and hashes synthetic text.
That is acceptable as a unit-test fixture, but it cannot prove that the
production evidence mechanism distinguishes official evidence from a
plausible self-assertion.

`approved_document` has the same gap. An arbitrary conforming identifier and
arbitrary matching bytes are accepted without an approved-document registry
or independent trust anchor.

### 2. No-charge capacity is recorded but not enforced

The no-charge probe declared:

```json
{
  "maxRequests": 63,
  "maxTokens": 1,
  "approvalReference": "invented:approval:001",
  "authority": {
    "kind": "approved_document",
    "identifier": "SELF:APPROVED:FAKE-001",
    "evidenceSha256": "<hash of arbitrary bytes>"
  }
}
```

The run reported 21,042 input-plus-output tokens. It still passed every
measurement and overall gate.

The schema checks `maxRequests >= 63` and `maxTokens > 0`; it never compares
the measured aggregate token count with `maxTokens`. It also does not prove
that the entitlement/approval identifiers occur in or are supported by the
authority bytes.

### 3. Tokenizer bytes are hash-bound but never used

The tokenizer probe used:

- plausible name `credible-tokenizer`;
- version `9.9.9`;
- a self-consistent configuration hash;
- reference `https://attacker.example.com/releases/9.9.9`; and
- arbitrary implementation bytes containing no tokenizer.

It then supplied varied invented row counts and passed every gate.

The harness proves that implementation bytes have not changed. It does not
prove that they implement the named tokenizer, that the reference is
authoritative for that tokenizer, or that running them over the canonical
system prompt/envelope/output reproduces any row count. A reproducible
tokenizer claim requires an independent recount, not only a retained hash.

### 4. Provider-response usage remains receipt-free

`usageSource: "provider_response"` passes with only the per-row numeric fields.
The neutral output contract contains no provider usage receipt or receipt hash,
and measurement metadata has no receipt manifest. Therefore the verifier
cannot distinguish provider-reported counts from runner-authored counts.

### 5. Declared run date may be in the future

A run dated 2099 with internally ordered 2099 effective/access dates passed.
The report hash binds that date, but neither scoring nor signing compares it
with an authorized runner timestamp. An internally ordered future chronology
is not evidence that a run occurred.

## Exact remaining repair gates

### Authority must be preregistered, not self-appointed

Before scoring, supply an out-of-band approved authority registry that binds:

- provider and model/version scope;
- allowed official hostname or approved-document identifier;
- expected authority object/evidence hash;
- reviewer/approval reference and approval timestamp; and
- permitted rate or entitlement claim fields.

The scorer and standalone verifier must take that registry separately and
reject an authority not already present. Do not let the measurement object
appoint its own source.

Retained bytes must be either a separately captured authorized response with
capture metadata or an approved document. The independent check must bind the
bytes to the authority and verify that the claimed provider/model/rates or
entitlement ID/scope/limits are actually supported by those bytes.

### Enforce entitlement limits against the actual run

Require:

- `outputsReceived <= maxRequests`; and
- aggregate measured input plus output tokens `<= maxTokens`.

The approved authority bytes/registry must support the exact entitlement and
approval identifiers, dates, scope and limits.

### Recompute token counts or bind provider receipts

For `runner_tokenizer`, run the independently approved exact tokenizer over the
canonical prompt/input and exact provider output for every row and compare
recomputed counts. An implementation hash alone is insufficient.

For `provider_response`, retain a redacted per-item usage receipt or signed
receipt hash/manifest and require exact item/count equality. The standalone
verifier must rehash those receipts.

### Bind chronology to the authorized runner

Reject a declared run date later than the trusted signing/runner date.
Prefer a runner-generated timestamp bound into both report and signed manifest,
with the human-entered access/effective/entitlement dates ordered against it.

### Freeze the missed controls

Add regressions for:

- plausible unapproved HTTPS hostname plus arbitrary matching bytes;
- plausible unapproved document ID plus arbitrary matching bytes;
- authority bytes that do not contain/support the claimed rate or entitlement;
- no-charge `maxTokens` below measured aggregate use;
- plausible tokenizer identity/reference plus arbitrary bytes;
- invented token totals not reproduced by the retained tokenizer;
- provider-response rows without receipt binding; and
- future run date.

Preserve all 36 currently passing controls.

## Remaining product gates

Even after a future harness pass, the following remain separate:

- owner-approved provider/model/version, privacy/retention terms, cost ceiling,
  runner and trust anchors;
- unchanged 63-case real semantic-provider trial;
- real safety/currentness/language/legitimate-use performance;
- retrieval and claim validation;
- authoritative FAiRY Plays reservation/commit/refund ledger;
- final answer quality, personality and learning-value judgment;
- frontend, accessibility and failure-state verification;
- isolated staging and exact release evidence; and
- production/public verification and promotion approval.

No semantic-provider, staging, deployment, production or public claim is
authorized by this review.

## Learning scan

BTB-098 already states that measurement provenance must be validated rather
than trusted as prose. This review adds the sharper rule inside its permitted
artifact: **a hash proves byte identity, not authority, truth or execution**.
Authority needs a prior trust anchor; limits must be compared with observed
use; and reproducibility requires rerunning the named mechanism or binding an
independent receipt. No painpoints-log edit was made because the write boundary
permits only this verdict.
