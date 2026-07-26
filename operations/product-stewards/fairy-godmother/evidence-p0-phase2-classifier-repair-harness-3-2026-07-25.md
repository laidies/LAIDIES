# FAiRY Godmother classifier/harness bounded repair 3

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION; INDEPENDENT NO-CREDENTIAL
RE-AUDIT REQUIRED  
**Trigger:**
`independent-review-p0-phase2-classifier-repair-harness-2-2026-07-25.md`  
**Scope:** Only curly-apostrophe-safe structural extraction and truthful
measurement evidence. No provider, credential, key, binding, staging,
deployment, production or Git operation.

## Outcome

The two independently reproduced defects are repaired locally:

1. a curly single-quoted pasted passage containing curly contractions or
   possessives remains one complete `quoted_content` span; and
2. zero-filled, invariant, unsupported or rate-inconsistent metrics cannot
   satisfy the measurement or overall harness gates.

This is local architecture/evidence-mechanics proof, not provider accuracy or
authorization. FAiRY remains **FIX BEFORE PROMOTION**.

## Curly-apostrophe-safe extraction

When the extractor searches for a closing curly single quote, it now skips a
candidate `’` between two Unicode letters or numbers, matching the existing
straight-apostrophe protection.

Regression coverage now includes:

- cue-bound curly content containing `don’t`, `manager’s` and multiple
  internal apostrophes;
- the straight-quote equivalents;
- contractions inside Markdown fences and blockquotes;
- uncued curly contractions and possessives remaining instructions;
- an unbalanced cue-bound curly quote preserving all text and setting the
  uncertainty signal; and
- the actual Worker answer-model payload containing the complete passage only
  inside `UNTRUSTED QUOTED CONTENT`, with no leaked fragment in the user-task
  block.

The original 16 frozen architecture cases and fixture labels remain unchanged.

## Truthful measurement contract

Every provider-attempt row must have positive latency captured as
`runner_monotonic`. A successful measured classification must also have:

- positive integer input and output token counts;
- an explicit usage source of `provider_response` or `runner_tokenizer`; and
- a cost consistent with the signed run-level pricing basis.

Run-level measurement evidence is validated and included in the signed score
report. It declares:

- the monotonic runner clock;
- the usage source;
- pricing effective date; and
- either positive USD-per-million input/output rates, a specific no-charge
  basis, or explicit unsupported status.

For published rates, the scorer recomputes each row’s expected cost and rejects
inconsistency. Zero-dollar evidence is accepted only with a dated, specific
no-charge basis. Unsupported usage must omit token/cost fields and cannot pass
the cost gate.

The aggregate run additionally requires varied latency, input-token and
output-token evidence across the 63 deliberately varied cases. This prevents a
constant fabricated measurement template from making the run green.

## Adversarial controls

The local suite now covers:

- all-zero latency/tokens/cost marked measured;
- zero latency with positive tokens;
- zero tokens with positive latency;
- constant positive latency/tokens/cost across all 63 rows;
- unsupported usage across a complete run;
- cost inconsistent with the declared rates;
- wrong usage source;
- missing output-token usage;
- negative, fractional and non-finite token values;
- a valid recomputed published-rate run;
- a valid explicitly documented no-charge run; and
- a no-charge claim without a specific basis.

The all-zero attack fails latency coverage, token/cost coverage, metric
variation, p95, hard completion and the overall required gate.

## Verification

```text
cd worker-fairy-godmother && npm test
34/34 Worker, architecture and harness tests PASS
45/45 core evaluation fixture integrity PASS
79/79 frozen classifier fixture manifest PASS
Frozen SHA-256:
01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da

cd worker-fairy-godmother && npm run dry-run
PASS — no production bindings

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
```

The final counts above are recorded after the fresh final run for this packet.

## Still open

- Independent no-credential re-audit of this exact candidate.
- Provider/model/version, privacy/retention, authorized runner, tokenizer if
  used, pricing basis, cost ceiling and out-of-band trust-anchor approval.
- The unchanged 63-case real semantic-provider trial.
- Retrieval/claim validation, authoritative Plays, answer quality,
  personality, frontend, accessibility, isolated staging, deployment and
  public promotion.

## Learning scan

BTB-098 now includes two additional prevention rules: typographic quote tests
must contain internal contractions/possessives and verify the final model
payload; and a field called `measured` is not evidence unless values are
possible, source-bound, pricing-recomputable and non-template-like across the
run.
