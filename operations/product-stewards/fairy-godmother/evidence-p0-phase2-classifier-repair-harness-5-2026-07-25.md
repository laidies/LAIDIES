# FAiRY Godmother Gate B executable provenance repair 5

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION; INDEPENDENT NO-CREDENTIAL
RE-AUDIT REQUIRED  
**Trigger:**
`independent-review-p0-phase2-classifier-repair-harness-4-2026-07-25.md`  
**Scope:** Only the five reproduced authority, entitlement-capacity,
tokenizer-recount, provider-receipt and future-chronology false greens. No
provider, credential, key, network mutation, binding, staging, deployment,
production or Git operation.

## Outcome

The harness no longer treats a matching hash as proof of authority or
execution:

1. pricing/entitlement evidence must be preregistered and its canonical parsed
   content must exactly support the claim;
2. no-charge limits are compared with actual measured run usage;
3. runner-tokenizer totals are independently recounted over the exact bound
   inputs and outputs;
4. provider-reported totals require exact retained run/request/response
   receipts; and
5. verifier-controlled time rejects future runs and future evidence access.

All prior 63-row completeness, frozen joins, semantic/behavioral replay,
quote isolation, metric plausibility, no-charge-on-failure, trust-anchor and
artifact-integrity gates remain active.

## Preregistered canonical authority

The scorer and standalone verifier now require a separate authority registry
plus its out-of-band approved SHA-256. The canonical registry binds:

- claim kind;
- exact provider/model/version;
- authority kind and identifier; and
- the exact retained evidence hash.

It also records a calendar-valid approval date and reviewer approval
reference. An authority not already in that exact registry is rejected.

Retained authority bytes must be canonical JSON in a recognized schema.
Published-rate content must exactly match the claimed provider, model,
version, effective/access dates, currency, billing unit, tier, cache/batch
assumptions and both rates. No-charge content must exactly match the basis
enum, validity dates, scope, entitlement/approval identifiers and limits.

Therefore a plausible attacker URL, self-labelled document or arbitrary bytes
cannot appoint itself authority, and a registered document cannot be reused
to support different rates or terms.

## No-charge capacity

The report adds the hard gate `entitlementCapacitySufficient`:

- received outputs must not exceed `maxRequests`; and
- aggregate measured input plus output tokens must not exceed `maxTokens`.

Tests prove the exact request/token boundary passes, one token below actual
usage fails the capacity and overall gates, and 62 allowed requests for the
63-case run is rejected.

## Executable runner-tokenizer recount

Tokenizer evidence must still bind exact name/version/configuration and
implementation bytes. Those bytes must now parse as a recognized canonical
recount descriptor. The local verifier supports only explicitly coded,
reviewed algorithms; this packet’s positive control uses
`utf8_bytes_v1`.

For every item, the scorer and standalone verifier execute that algorithm
over:

- the exact classifier system prompt plus canonical provider input; and
- the exact canonical classification output.

Reported input/output totals must equal the independent recount. Plausible
identity plus arbitrary bytes and a one-token invented difference are both
rejected.

## Provider-response receipts

Every measured `provider_response` row now binds:

- run ID;
- item ID;
- provider request ID;
- provider response ID;
- receipt ID;
- input/output counts; and
- the receipt’s SHA-256.

A separate canonical receipt artifact must contain one unique matching receipt
per measured provider-response row and is itself hash-bound in the measurement
evidence. Missing, replaced, wrong-run or request-ID-mismatched receipt
artifacts are rejected. The standalone verifier revalidates them.

## Verifier-controlled chronology

The scorer and verifier derive current UTC date from their own clock rather
than accepting a runner-supplied “now.” A declared run date later than that
date is rejected. Access/effective/approval dates remain calendar validated
and ordered against the run/verifier date. The signed manifest now directly
binds run ID and run date and rejects a run date later than its actual signing
timestamp.

## New adversarial and positive controls

The local suite now covers:

- future run date;
- plausible unregistered HTTPS authority plus matching arbitrary bytes;
- registered authority reused for different claimed rates;
- altered registry/evidence trust;
- no-charge token and request limits below actual use;
- exact no-charge capacity boundaries;
- arbitrary tokenizer bytes;
- tokenizer totals differing by one from independent recount;
- valid executable tokenizer recount;
- missing/replaced provider receipt artifacts;
- receipt request mismatch and wrong run ID; and
- a valid complete provider-receipt run.

## Verification

```text
cd worker-fairy-godmother && npm test
38/38 Worker, architecture and harness tests PASS
45/45 core evaluation fixture integrity PASS
79/79 frozen classifier fixture manifest PASS
Frozen SHA-256:
01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da

cd worker-fairy-godmother && npm run dry-run
PASS — no production bindings

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
```

Final counts above are recorded after the fresh final run.

## Still open

- Independent no-credential audit of this exact repair.
- Real owner-approved provider/model/version, privacy/retention, authority
  registry, receipt format or approved tokenizer, runner, cost ceiling and
  trust anchors.
- The unchanged 63-case semantic-provider trial.
- Retrieval/claim validation, authoritative Plays, answer quality,
  personality, frontend, accessibility, isolated staging, deployment and
  public promotion.

Status remains **FIX BEFORE PROMOTION**.
