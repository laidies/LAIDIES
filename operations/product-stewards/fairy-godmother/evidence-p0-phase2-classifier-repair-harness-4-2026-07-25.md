# FAiRY Godmother Gate B provenance repair 4

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION; INDEPENDENT NO-CREDENTIAL
RE-AUDIT REQUIRED  
**Trigger:**
`independent-review-p0-phase2-classifier-repair-harness-3-2026-07-25.md`  
**Scope:** Only calendar/source-bound published pricing, structured no-charge
entitlement provenance and reproducible runner-tokenizer provenance. No
provider, key, binding, staging, deployment, production or Git operation.

## Outcome

The three reproduced self-asserted provenance paths are closed locally:

- impossible or wrongly ordered pricing dates are rejected;
- a vague free-text no-charge claim cannot enter the schema; and
- `runner_tokenizer` cannot pass without exact, hash-bound, reproducible
  tokenizer evidence.

All earlier completeness, canonical join, semantic/behavioral replay,
quote-isolation, metric plausibility, trust-anchor and artifact-verification
gates remain active. This does not establish semantic-provider accuracy or
authorize a provider trial.

## Published-rate provenance

Published pricing now requires:

- real calendar-valid effective, access and run dates;
- `effectiveDate <= accessDate <= runDate`;
- exact provider, model and model-version scope matching the scored run and
  later signed manifest;
- USD-per-million billing units plus explicit tier, cache and batch
  assumptions;
- an official HTTPS pricing URL or approved-document identifier;
- a nonzero SHA-256 for retained lawful rate evidence; and
- the actual evidence bytes supplied to both scorer and standalone verifier.

The scorer still recomputes row cost from the bound rates. Arithmetic
consistency alone is no longer accepted as source provenance.

## Structured no-charge entitlement

The former arbitrary `basis` string is removed. A no-charge run requires:

- basis enum: `evaluation_credit`, `contractual_waiver` or
  `provider_promotion`;
- exact provider/model/version scope;
- calendar-valid `validFrom`, `validThrough` and `accessDate`;
- the run date within the entitlement interval;
- structured entitlement and approval identifiers;
- integer request and token limits sufficient for the run;
- an official URL or approved-document authority; and
- retained authority bytes matching its nonzero evidence hash.

Expired, out-of-scope, vague or malformed claims are rejected before scoring.

## Reproducible runner tokenizer

`runner_tokenizer` now requires:

- non-placeholder tokenizer name;
- exact semantic version;
- explicit encoding, normalization and special-token policy;
- a SHA-256 that recomputes from that exact configuration;
- an authoritative HTTPS implementation reference containing the exact
  version;
- nonzero implementation/package-lock SHA-256; and
- actual implementation evidence bytes matching that hash.

Every row must still declare the same run-level usage source. The standalone
verifier independently checks the tokenizer implementation bytes for
runner-tokenizer runs.

## Adversarial coverage

New regressions reject:

- `2026-99-99` and effective/access date reversal;
- missing or HTTP/localhost pricing authority;
- altered authority evidence bytes;
- provider/model/version scope mismatch;
- vague `free today`-style no-charge objects;
- expired and wrong-scope no-charge entitlements;
- missing/unknown tokenizer identity;
- configuration changed without a new hash;
- implementation bytes changed after scoring; and
- runner-tokenizer status without tokenizer evidence.

A fully structured published-rate run, structured no-charge entitlement and
fully reproducible runner-tokenizer run pass locally. Altering the retained
authority bytes makes standalone artifact verification fail.

## Verification

```text
cd worker-fairy-godmother && npm test
36/36 Worker, architecture and harness tests PASS
45/45 core evaluation fixture integrity PASS
79/79 frozen classifier fixture manifest PASS
Frozen SHA-256:
01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da

cd worker-fairy-godmother && npm run dry-run
PASS — no production bindings

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
```

Final counts above are recorded after the fresh final run for this packet.

## Still open

- Independent no-credential re-audit of this exact candidate.
- Approval of a real provider/model/version, privacy/retention terms,
  authoritative pricing/entitlement evidence, usage provenance, runner,
  tokenizer if applicable, cost ceiling and trust anchor.
- The unchanged 63-case semantic-provider trial.
- Retrieval/claim validation, authoritative Plays, answer quality,
  personality, frontend, accessibility, isolated staging, deployment and
  public promotion.

Status remains **FIX BEFORE PROMOTION**.
