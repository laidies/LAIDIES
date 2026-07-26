# FAiRY Godmother phase-2 classifier architecture repair and offline harness

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION; INDEPENDENT RE-REVIEW REQUIRED  
**Trigger:** `independent-review-p0-phase2-classifier-architecture-2026-07-25.md`  
**Scope:** Exact Gate A and Gate B from the independent verdict. No provider,
credentials, bindings, production, deployment or Git operations.

## Outcome

The four reproduced architecture defects and the related strict-contract gaps
are repaired locally. A provider-neutral offline harness now supports a later
authorized trial without exposing frozen expected labels during inference.

This evidence does not claim semantic-provider accuracy. No classifier or
answer provider was called.

## Gate A — architecture repair

### Apostrophe-safe and unbalanced-quote preprocessing

The old regex treated apostrophes across contractions and possessives as
single-quoted content. Quote extraction is now a scanner with these rules:

- apostrophes and single quotation marks are never content delimiters;
- balanced straight double quotes and balanced curly double quotes can become
  `quoted_content`;
- unbalanced quote text remains inside the user instruction; and
- `containsUnbalancedQuote` explicitly raises the uncertainty signal.

The frozen apostrophe case now preserves:

`can't`, `manager's`, `don't`, and `team's`

No fragments are promoted to quoted content.

### One authoritative five-second deadline

Every classifier adapter runs inside one Worker-owned `Promise.race` deadline:

- object adapters with `classify(...)`;
- service adapters with `fetch(...)`; and
- adapters that ignore the supplied abort signal.

At five seconds, the Worker independently resolves to
`classification_uncertain` with `classifier_timeout`. A non-cooperative
provider cannot leave the user request hanging or reach the answer/spend path.

The regression runs both never-settling adapter shapes concurrently and
observed the fail-closed result at approximately 5,002–5,004 ms.

### Language-confidence and unsupported-language rule

`language.confidence` now participates in the same active confidence floor as
overall and actionable-clause confidence.

The only unsupported-language exception is:

- a `crisis_or_emergency` boundary;
- overall, language and crisis-clause confidence all at least `0.98`; and
- the route remains a no-charge boundary.

All other unsupported-language decisions return uncertainty.

### Strict decision consistency matrix

Enum validity is no longer enough. The validator now enforces:

- `allow`: supported product domain, non-boundary/non-current/non-clarify task,
  ordinary/sensitive risk, no boundary, no currentness;
- `boundary`: `out_of_scope` + task `boundary`, matching boundary/risk class,
  no currentness;
- `verify_current`: supported product domain, task
  `current_fact_or_research`, required non-`none` currentness, no boundary;
- `clarify`: task `needs_clarification`, ordinary/sensitive risk, no
  boundary/currentness;
- actionable `uncertain`: `unclear` + `needs_clarification` + sensitive,
  no boundary/currentness; and
- quoted `transform_untrusted` or quoted `uncertain`: non-actionable,
  internally consistent tuples only.

The independently reproduced contradictory `allow` +
`out_of_scope/boundary/high_stakes_boundary` result is now invalid, typed
uncertain, makes zero answer-model calls and writes zero allowance.

### Quoted uncertainty, extra fields and bounds

The explicit rule is: uncertain quoted content fails closed. Isolation does
not silently discard classifier uncertainty.

Strict object keys are enforced at the top, language, clause and currentness
levels. Unknown fields are rejected. Reason codes are limited to:

- eight per clause;
- 64 characters each; and
- lower-case alphanumeric plus `_`, `:`, `-`.

Required currentness cannot use category `none`; non-required currentness
cannot carry a volatile category.

### Reduced provider payload amplification

The local classification envelope keeps original evidence for validation, but
the provider payload no longer repeats full `original` and `normalized` text.
It sends:

- schema/mode;
- signals;
- clause text and roles; and
- the confusable-normalized full form only when confusables were actually
  detected.

This reduces routine prompt duplication without deleting the obfuscation
evidence the semantic gate needs.

## Frozen architecture regressions

`worker-fairy-godmother/test/classifier-architecture-gate.test.mjs` imports the
unchanged independent fixture and pins its SHA-256:

`01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da`

All 16 frozen architecture cases have explicit regressions:

1. missing classifier;
2. throwing classifier;
3. malformed classifier;
4. missing/duplicate/role-drift clauses;
5. low overall/actionable confidence;
6. low language confidence;
7. contradictory allowed tuple;
8. quoted uncertainty;
9. never-settling `classify`;
10. never-settling `fetch`;
11. boundary plus safe clause;
12. current fact plus stable draft;
13. invalid answer schema;
14. provider outage;
15. apostrophes/unbalanced quote; and
16. unknown enums/extra fields/oversized reason codes.

The frozen fixture expected labels were not changed.

## Gate B — offline, no-credential provider harness

Location:

`worker-fairy-godmother/harness/`

### Export without expected labels

`export-frozen-envelopes.mjs` creates:

- `provider-input.jsonl` with opaque `item-0001` IDs and minimized classifier
  inputs;
- `classifier-system-prompt.txt`;
- local-only `join-map.json`; and
- `export-metadata.json`.

The 63-record provider payload contains no `expected` field, case ID, safety
family, currentness family or allow-family taxonomy.

Verified export:

- records: 63;
- provider-input SHA-256:
  `2c5c9a1159ba39e2d6a856ce27a0f673f534865b31d3d68d62a8c2663452cb7f`;
- frozen-set SHA-256:
  `01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da`.

### Join and score only after inference

`score-provider-run.mjs` accepts neutral JSONL captured by an authorized runner.
It verifies hashes, then joins through the local map to produce:

- semantic decision confusion matrix;
- Worker response-type confusion matrix;
- per-language results;
- unsafe, volatile, legitimate, multilingual, obfuscation, mixed-intent and
  quoted-content slices;
- schema-invalid, uncertain and abstention rates;
- p50/p95/max classifier latency;
- input/output token totals and estimated cost; and
- hard-failure and minimum-gate results.

Malformed output is never repaired by guessing. It becomes typed uncertainty.

### Worker replay

Every provider result replays through the actual Worker with:

- the captured classifier result;
- a deterministic valid answer response;
- a verified opaque identity; and
- an isolated temporary allowance store.

The report records answer-model calls, allowance writes, response type and Play
outcome for every case. The gate requires every non-allow replay to have zero
answer calls and zero writes.

### Signed run manifest

The authorized runner must supply a dedicated Ed25519 private key. The harness
does not create, store or inspect one.

The signed manifest binds:

- provider;
- exact model and version/snapshot;
- UTC date/time;
- full runner commit;
- classifier prompt hash;
- classifier schema hash;
- frozen set hash;
- provider-input hash;
- local join-map hash;
- provider-output hash; and
- score-report hash.

The manifest includes the public verification key and is verified immediately
after creation. Local harness tests use only an ephemeral in-memory test key.

## Verification

```text
cd worker-fairy-godmother && npm test
PASS frozen recovery checksum and 55,137 bytes
26/26 Worker, architecture and harness tests PASS
45/45 core evaluation fixture integrity PASS
79/79 frozen classifier fixture manifest PASS

cd worker-fairy-godmother && npm run dry-run
PASS — no production bindings

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
```

Additional exporter smoke test:

```text
63 label-free provider records
PASS no expected labels or case taxonomy in provider-input.jsonl
```

## Still open

- Independent Gate A re-review has not happened.
- No provider has been selected, approved, called or scored.
- Provider privacy, retention, region, sensitive-data eligibility, exact
  model/version, cost and denial-of-wallet controls remain owner/reviewer work.
- The 63 frozen semantic cases remain untouched and unrun against a real
  provider.
- The 17/20 product, accuracy/safety/trust and LAiDIES brand floors remain
  open.
- Retrieval/claim validation, authoritative Plays, frontend rendering,
  accessibility, isolated staging, deployment and public promotion remain
  separate blockers.

Status remains **FIX BEFORE PROMOTION**.

## Learning scan

This cycle extends BTB-098: semantic classification needs two gates, not one.
First prove that the architecture cannot reinterpret, hang or spend on a
contradictory result. Then evaluate a frozen provider without exposing the
answers during inference. The durable prevention rule is now encoded in the
16-case architecture suite and the label-free/after-inference harness.
