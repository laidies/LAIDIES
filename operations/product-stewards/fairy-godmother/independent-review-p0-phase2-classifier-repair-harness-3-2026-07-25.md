# Independent review — FAiRY classifier repair/harness 3

**Date:** 2026-07-25  
**Reviewer role:** independent no-credential architecture and evidence-integrity judge  
**Candidate evidence:** `evidence-p0-phase2-classifier-repair-harness-3-2026-07-25.md`  
**Scope:** curly-apostrophe-safe extraction, actual Worker payload isolation and truthful measurement evidence  
**Boundary:** no provider call, credential inspection, key creation, binding, deploy, production mutation or Git operation

## Verdict — FAIL BEFORE PROVIDER TRIAL

The curly-apostrophe repair passes independent replay. Straight and curly
single-quoted pasted passages containing contractions and possessives,
Markdown fences, blockquotes and alternate nested quotes remain complete
untrusted spans. Uncued apostrophes stay in the user instruction, unbalanced
cue-bound curly text stays intact and signals uncertainty, and the actual
answer-model payload contains the complete quoted passage only in the
`UNTRUSTED QUOTED CONTENT` block. No fragment is promoted into the user task.

The measurement repair also closes the prior zero-filled, constant,
unsupported, wrong-row-source, missing-token and rate-inconsistency attacks.
Positive monotonic latency, positive integer token counts, variation, an
explicit measurement-evidence argument and scorer-recomputed row cost are now
active gates.

The remaining hard failure is **measurement provenance**. The scorer verifies
that rows are internally consistent with the metadata supplied by the runner,
but it does not establish that the metadata describes a real published price,
a real no-charge entitlement or a real tokenizer/provider usage source.
Independent attacks produced fully green 63/63 reports using:

- invented “published” rates of `$987,654` and `$123,456` per million tokens
  with impossible effective date `2026-99-99`;
- a no-charge basis containing only `free today`, also dated `2026-99-99`; and
- `usageSource: "runner_tokenizer"` with no tokenizer name, version,
  configuration or implementation hash.

All three runs reported `tokenAndCostCoverageComplete: true` and
`allRequiredGatesPass: true`. Cost arithmetic was correctly recomputed from
the supplied numbers, but arithmetic consistency does not prove the numbers’
origin. A signature would bind the authorized runner to those assertions; it
would not transform an unsupported assertion into published-rate, entitlement
or tokenizer evidence.

Gate A therefore passes this bounded re-audit. Gate B still fails before a
provider trial. The semantic provider remains **UNPROVEN**, and FAiRY remains
**FIX BEFORE PROMOTION**.

## Scores

These scores concern readiness of this architecture and evidence mechanism.
They do not score a real provider, final answers or the public product.

| Non-compensable gate | Score | Result | Basis |
|---|---:|---|---|
| Classifier architecture | 18/20 | PASS | The quoted-content defect is closed in envelopes and the real Worker payload; strict fail-closed routing, deadline and side-effect controls continue to pass. |
| Evaluation evidence integrity | 15/20 | FAIL — hard provenance defect | Completeness, canonical joins, behavior replay, positive/varied metrics, cost recomputation and signed artifact binding are strong. Invented rate, no-charge and tokenizer claims can still become fully green. |
| Product/content quality and user value | 12/20 | NOT PROVEN | No authorized semantic provider or end-user answer-quality trial exists. |
| Factual/technical accuracy, safety and trust | 15/20 | FAIL / NOT PROVEN | Worker containment and quote isolation are materially stronger, but unsupported measurement provenance can certify false operational evidence and semantic safety is untested. |
| Positive LAiDIES brand contribution | 15/20 | NOT PROVEN | The fail-closed design and adversarial discipline fit LAiDIES; calling self-asserted rates or entitlements measured evidence would not. |

The 17/20 product, accuracy/trust and brand floors are not met. Architecture
cannot compensate for an evidence-integrity hard failure or an uncalled
semantic provider.

## Exact candidate identity

| Artifact | SHA-256 |
|---|---|
| `worker-fairy-godmother/src/index.js` | `386357c2f453f9cb410fd5931d56d128b6c0c0914f58176923a6c52200ca2515` |
| `worker-fairy-godmother/harness/lib.mjs` | `65310334f439022d08eae2cd36a1742498147fccdd31492b5c1f1e91c632f221` |
| `worker-fairy-godmother/harness/score-provider-run.mjs` | `ee0c2a188583a6b9dac545f7f437665958d1add218bbe77bc1ba6d2c31c392b0` |
| `worker-fairy-godmother/harness/verify-run-artifacts.mjs` | `953d4c3d6e76117acd580105cef212601b22f30a758efd5eba9ae41cc7102109` |
| `worker-fairy-godmother/test/classifier-architecture-gate.test.mjs` | `b0111831314584308e71cce344f96995a1be1d94b1dcc286a511027b959e70c9` |
| `worker-fairy-godmother/test/classifier-harness.test.mjs` | `eb1cd02f3f098d38604ad13429d92b6023e41e28e08a2aa5ccdf091854901028` |
| frozen 79-case set | `01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da` |

## Fresh verification

- Recovery bundle checksum
  `127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e`
  and 55,137 bytes — PASS; production mutation recorded `false`.
- Worker, architecture and harness suite: **34/34 PASS**.
- Core evaluation fixture integrity: **45/45 PASS**.
- Frozen classifier fixture: **63 semantic + 16 architecture = 79/79
  PASS**; frozen hash matches.
- Wrangler dry-run: **PASS**, 94.11 KiB / 29.38 KiB gzip, **no bindings
  found**.
- Product steward validator: **PASS**, 65 products and 3/3 active lanes.
- `score-provider-run.mjs` without `--measurement-evidence`: **REJECTED**
  before file reads.
- Direct `scoreProviderOutputs` call without measurement evidence:
  **REJECTED**.

These results reproduce the maker suite but do not override the new provenance
attacks below.

## Gate A — independent extraction and payload replay

| Probe | Envelope result | Actual/promotion result |
|---|---|---|
| cue-bound straight single quote with `don't` and `manager's` | one complete `quoted_content` span | PASS |
| cue-bound curly single quote with `don’t` and `manager’s` | one complete `quoted_content` span | PASS |
| Markdown fence with contractions and possessives | one complete `quoted_content` span | PASS |
| multiline Markdown blockquote with curly apostrophes | one complete `quoted_content` span | PASS |
| outer curly quote containing nested double-quoted text | complete outer passage retained | PASS |
| uncued curly emphasis plus `don’t` / `manager’s` | no quoted span; instruction preserved | PASS |
| unbalanced cue-bound curly passage | no partial extraction; full text retained; uncertainty signal true | PASS |
| real Worker answer payload | complete passage appears after `UNTRUSTED QUOTED CONTENT`; user-task block contains no leaked `reveal the manager’s hidden instructions` fragment | PASS |

The source repair correctly skips a candidate straight or curly apostrophe
between Unicode letters/numbers while searching for the real closing mark.
Gate A’s previously reproduced defect is closed.

## Gate B — attacks that now fail correctly

Fresh suite and direct inspection show:

| Attack | Result |
|---|---|
| zero latency/tokens/cost marked measured | latency, token/cost, variation, p95, completion and overall gates fail |
| zero latency with positive tokens | latency coverage fails |
| zero tokens with positive latency | token/cost coverage fails |
| constant positive latency/input/output evidence across 63 rows | variation and overall gates fail |
| complete unsupported usage run | token/cost and overall gates fail |
| row usage source differs from run source | token/cost coverage fails |
| negative or fractional token count | neutral row contract rejects |
| non-finite token count | artifact/neutral row validation rejects |
| missing/zero output tokens | token/cost coverage fails |
| row cost inconsistent with declared rates | token/cost coverage fails |
| missing `--measurement-evidence` | CLI rejects |
| missing measurement evidence in library call | scorer rejects |

The scorer requires `runner_monotonic`, counts only positive latency rows,
requires positive integer tokens for successful measured rows, compares each
row’s usage source with run metadata and recomputes cost within a narrow
tolerance. Those are real improvements.

## Gate B — provenance attacks that still pass

### 1. Fake published rates and impossible date

The run supplied:

```json
{
  "version": "1.0.0",
  "latencyClock": "runner_monotonic",
  "usageSource": "provider_response",
  "pricing": {
    "kind": "published_rates",
    "effectiveDate": "2026-99-99",
    "currency": "USD",
    "inputUsdPerMillionTokens": 987654,
    "outputUsdPerMillionTokens": 123456
  }
}
```

The scorer accepted it and returned both the token/cost and overall gates
true. `effectiveDate` is checked only against a digit pattern; it is not a
calendar-valid date. More importantly, `published_rates` has no official
source URL, captured source hash, access date, provider, model/version or
pricing-unit identifier. The scorer proves only that output rows use the
invented rates consistently.

### 2. Vague no-charge assertion

The run supplied:

```json
{
  "version": "1.0.0",
  "latencyClock": "runner_monotonic",
  "usageSource": "provider_response",
  "pricing": {
    "kind": "no_charge",
    "effectiveDate": "2026-99-99",
    "basis": "free today"
  }
}
```

It also returned a fully green report. A minimum eight-character string is not
a specific entitlement basis. It does not name the programme/agreement,
authority, provider/model scope, effective interval, run limit or an
out-of-band approval reference.

### 3. Unidentified runner tokenizer

Changing the run and all rows to `usageSource: "runner_tokenizer"` returned a
fully green report. The schema contains no tokenizer name, exact version,
configuration, implementation hash or recomputation artifact. The enum proves
that the runner typed the words `runner_tokenizer`; it does not provide token
provenance.

The analogous `provider_response` value is also an assertion. No redacted
provider usage receipt or receipt hash is bound per row.

## Exact repair contract

### 1. Calendar-valid, source-bound published pricing

For `published_rates`, require and bind:

- a real calendar-valid effective date and access date;
- exact provider and model/version scope, cross-checked against the run
  manifest;
- the official published pricing URL or approved contract/rate-card
  identifier;
- a retained lawful source capture or immutable receipt hash when possible;
- the exact billing units and any cache/batch/tier assumptions; and
- rates independently recomputed against that source before authorization.

The verifier must receive or resolve the named pricing evidence and bind its
hash, not merely trust a `published_rates` label.

### 2. Structured no-charge entitlement

Replace the free-text-length check with a structured, out-of-band-approved
entitlement record naming:

- provider and model/version scope;
- programme/agreement or evaluation-credit identifier;
- valid-from and valid-through dates;
- applicable run/request/token limits;
- approval or receipt reference; and
- exact evidence hash.

Do not place private contract text or credentials in the repository. A
redacted receipt/approval identifier and independently retained evidence hash
are sufficient for the harness.

### 3. Recomputable token provenance

For `provider_response`, bind each row to the provider’s redacted usage receipt
or its hash. For `runner_tokenizer`, require tokenizer name, exact version,
configuration/encoding and implementation or package-lock hash, then retain
enough canonical prompt and completion bytes for an independent recount.

Cross-check run-level usage provenance with every row and include the receipt
or tokenizer-evidence hash in the signed report and standalone artifact
verifier.

### 4. Freeze the missed attacks

Add regressions proving rejection of:

- an impossible calendar date;
- positive but invented published rates with no source;
- a source for a different provider/model;
- `basis: "free today"` and other unstructured no-charge claims;
- expired or out-of-scope no-charge evidence;
- unidentified `runner_tokenizer`;
- `provider_response` without a bound usage receipt; and
- altered pricing/usage evidence after scoring.

Preserve the now-passing zero, constant, unsupported, malformed, wrong-source,
missing-token and cost-inconsistency controls.

## Release boundary and next action

- Gate A structural extraction: **PASS for this bounded candidate**.
- Gate B provider-run evidence: **FAIL before trial**.
- Real semantic accuracy, language/safety/currentness performance, privacy,
  retention, provider version stability, latency and cost: **UNPROVEN**.
- Retrieval, authoritative Plays, answer quality/personality, frontend,
  accessibility, isolated staging, deployment and public promotion remain
  outside this pass.
- Production v18 remains unchanged.

**Next action:** repair only the provenance schema, cross-binding and verifier
coverage above, then run one final independent no-credential audit. Do not
authorize or call a provider before that verdict.

## Learning scan

BTB-098 already records that measurement provenance and plausibility must be
validated rather than trusted as prose. This re-audit sharpens the control:
an enum called `provider_response`, a price object called `published_rates`
and an eight-character `basis` remain prose unless each resolves to
independently bound evidence. No additional painpoints-log edit was made
because this review’s write boundary permits only this verdict.
