# Independent review — FAiRY classifier repair/harness 5

**Date:** 2026-07-25  
**Reviewer role:** independent no-credential evaluation-evidence judge  
**Candidate evidence:** `evidence-p0-phase2-classifier-repair-harness-5-2026-07-25.md`  
**Prior failed review:** `independent-review-p0-phase2-classifier-repair-harness-4-2026-07-25.md`  
**Boundary:** read-only inspection and ephemeral local probes; no credentials,
provider/network access, external accounts, staging, deployment, production,
Git operation or product/state/queue edit

## Verdict — FAIL BEFORE PROVIDER TRIAL

Repair 5 closes all five false-green mechanisms documented in review 4:

1. arbitrary retained bytes can no longer appoint a plausible URL or document
   identifier as pricing authority;
2. no-charge request and token limits are compared with measured use;
3. runner-tokenizer rows are independently recounted from the exact canonical
   inputs and outputs;
4. provider-reported counts require a separately retained, hash-bound,
   run/request/response-bound receipt artifact; and
5. a future run date is rejected using verifier-controlled UTC time.

The complete positive control remains green, all 38 local tests pass, the
79-case fixture remains frozen, and the dry run has no bindings.

One independent equivalent chronology probe still produced a fully green
report when the authority registry was approved **after** the declared run:

```json
{
  "runDate": "2026-07-24",
  "registryApprovedAt": "2026-07-25",
  "tokenAndCostCoverageComplete": true,
  "allRequiredGatesPass": true
}
```

`validateAuthorityRegistry` compares `approvedAt` only with verifier-controlled
today. It does not require `approvedAt <= runIdentity.runDate`. The evidence
and code call this registry “preregistered”, but the current gate accepts
post-run authorization. A reviewer can therefore create or amend the trust
registry after seeing the result and still certify the run as having used
pre-authorized measurement evidence.

This is a hard provenance chronology defect. Gate A architecture remains
passed, but Gate B evidence provenance is not yet independently passed. The
semantic provider remains **UNPROVEN**, and FAiRY remains **FIX BEFORE
PROMOTION**.

## Scores

These scores cover the local architecture and evidence mechanism, not an
uncalled semantic provider or rendered FAiRY experience.

| Non-compensable gate | Score | Result | Basis |
|---|---:|---|---|
| Classifier architecture | 18/20 | PASS | Fail-closed routing, quote isolation, deadline, side-effect and strict response-contract controls remain intact. |
| Evaluation evidence integrity | 16/20 | FAIL — hard chronology defect | Authority content, capacity, recount and receipts are materially repaired, but a registry approved after the run is accepted as preregistered. |
| Product/content quality and user value | 12/20 | NOT PROVEN | No authorized semantic-provider or rendered-experience trial exists. |
| Factual/technical accuracy, safety and trust | 15/20 | FAIL / NOT PROVEN | The local controls are strong, but the remaining chronology false green can misstate post-run approval as prior authorization. |
| Positive LAiDIES brand contribution | 15/20 | NOT PROVEN | Evidence-first operation fits LAiDIES; the final product and provider behavior remain untested. |

The required product, accuracy/trust and brand floors are not met.
Architecture cannot compensate for the evidence-integrity failure.

## Exact candidate identity

| Artifact | SHA-256 |
|---|---|
| `worker-fairy-godmother/src/index.js` | `386357c2f453f9cb410fd5931d56d128b6c0c0914f58176923a6c52200ca2515` |
| `worker-fairy-godmother/harness/lib.mjs` | `cfbb6fddaebd62fbcc8babbc6d10789b5adfb1cd02ee877f7a73b5ef1a0416a8` |
| `worker-fairy-godmother/harness/score-provider-run.mjs` | `7431424a4ae9db6e6ca4c348b5e065e8cb409559ff8ab2abf583ad8d944c3a83` |
| `worker-fairy-godmother/harness/verify-run-artifacts.mjs` | `cbadde026a3d3a1013d2747ababb2d7c3ba9f399af8d3c631eb0252b867bc6e9` |
| `worker-fairy-godmother/test/classifier-harness.test.mjs` | `58b44af19391283f9efb0a847a24ab648ca6e9a547fef7606e99430e111182ef` |
| frozen 79-case set | `01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da` |

## Fresh verification

- Recovery artifact: checksum
  `127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e`
  and 55,137 bytes — PASS; production mutation `false`.
- Worker, architecture and harness tests: **38/38 PASS**.
- Core evaluation fixture integrity: **45/45 PASS**.
- Frozen held-out classifier fixture: **63 semantic + 16 architecture =
  79/79 PASS**; frozen hash matches.
- Wrangler dry-run: **PASS**, 94.11 KiB / 29.38 KiB gzip, **no bindings
  found**.
- Product steward validator: **PASS**, 65 products, 3/3 active lanes.

## Adversarial matrix

| Probe | Result |
|---|---|
| Arbitrary bytes behind a plausible HTTPS “official” authority | REJECTED — retained bytes must be canonical claim evidence and match the exact registered hash and terms |
| Registered rate document reused with altered rates or scope | REJECTED — canonical retained content must equal the claimed provider/model/version/rate record |
| Registry bytes substituted while retaining the approved out-of-band hash | REJECTED — registry hash no longer matches its trust anchor |
| No-charge `maxTokens` one below measured use | CAPACITY GATE FAILS |
| No-charge `maxTokens` exactly equal to measured use | CAPACITY GATE PASSES |
| No-charge `maxTokens` one above measured use | CAPACITY GATE PASSES |
| No-charge `maxRequests` below the 63-row run | REJECTED |
| Arbitrary tokenizer implementation bytes | REJECTED — implementation must be a recognized canonical descriptor |
| Tokenizer descriptor/configuration/hash drift | REJECTED |
| One-count tokenizer total drift | REJECTED by independent recount |
| Missing or replaced provider receipt artifact | REJECTED |
| Receipt request/response binding changed | REJECTED |
| Receipt run ID changed | REJECTED |
| Future run date | REJECTED |
| Impossible or reversed pricing/entitlement dates | REJECTED |
| Authority registry approved after the run but not after verifier today | **ACCEPTED — FALSE GREEN** |

The free-capacity boundary probe measured 21,042 aggregate units:
21,041 failed capacity, while 21,042 and 21,043 passed capacity. The positive
no-charge fixture also correctly requires zero row cost before the complete
overall gate can pass.

## Request isolation, receipts and signing

The canonical export still separates the 63 label-free send records from the
private join map. Expected labels, family/case identities, pricing authority,
registry and receipt material are not included in the provider send bundle.

Receipt validation now requires exactly one unique receipt for each measured
provider-response row and binds item ID, run ID, request ID, response ID,
receipt ID and token counts. Missing, altered and wrong-run artifacts fail.

The signed manifest binds run ID/date, exact provider/model/version, frozen
set, prompt, schema, input, output, join map and report hashes. A future run,
post-dated signature, mismatched run identity, self-signed attacker manifest
or replaced report fails. These controls do not repair the separate registry
approval-order defect because `approvedAt` is not bound to a time at or before
the run.

## Exact remaining repair gate

Before a provider trial:

1. Require `authorityRegistry.approvedAt <= runIdentity.runDate` in both
   scoring and standalone verification.
2. Add negative controls for:
   - registry approval one day after the run;
   - registry approval on verifier today for an earlier run; and
   - manifest signing of a report carrying either invalid chronology.
3. Keep approval date equal to the run date valid at the present date
   granularity. If true same-day preregistration matters, replace dates with
   signed UTC timestamps and require
   `registryApprovedAt <= runStartedAt <= runCompletedAt <= createdAt`.
4. Re-run this independent no-credential review against the exact repaired
   hashes.

After that bounded repair passes, the still-open operational gates remain:

- owner-approved provider/model/version and privacy/retention terms;
- an independently anchored authority registry, receipt format or
  provider-appropriate approved tokenizer, runner key and cost ceiling;
- the unchanged 63-case semantic-provider trial with retained signed
  artifacts;
- retrieval and claim validation;
- authoritative Plays and verified entitlement;
- answer quality, personality, frontend and accessibility review;
- isolated staging, deployment and public promotion.

## Learning scan

**Qualifying non-obvious failure:** verifier-controlled “not in the future”
validation does not prove preregistration. Every artifact described as
pre-authorized must be explicitly ordered before the run, not merely before
the audit date.

**Prevention rule:** for each trust artifact, test the complete event ordering
with a harmless post-run-but-not-future sample. A valid hash, trusted reviewer
and plausible date are insufficient without chronology relative to the event
being certified.

**Possible Behind the Build angle:** “Why a signed, valid approval can still
be too late: teaching an evidence harness the difference between authorized
now and authorized before the test.”
