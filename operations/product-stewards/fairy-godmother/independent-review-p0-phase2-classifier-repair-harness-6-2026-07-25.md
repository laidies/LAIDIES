# Independent review — FAiRY classifier repair/harness 6

**Date:** 2026-07-25  
**Reviewer role:** independent no-credential evaluation-evidence judge  
**Candidate evidence:**
`evidence-p0-phase2-classifier-repair-harness-6-2026-07-25.md`  
**Prior failed review:**
`independent-review-p0-phase2-classifier-repair-harness-5-2026-07-25.md`  
**Boundary:** local source inspection, deterministic tests and ephemeral
probes only; no product/state/queue edit, credentials, external access,
staging, deployment, production or Git

## Verdict

**PASS — LOCAL GATE B HARNESS. PROVIDER TRIAL AND PROMOTION REMAIN HOLD.**

Repair 6 closes the exact post-run registry-approval false green from review 5.
The scorer and standalone verifier now require the registry approval’s
normalized UTC date to be no later than the declared run date and no later
than verifier-controlled today.

The independent replay produced:

| Registry `approvedAt` | Declared run | Result |
|---|---|---|
| `2026-07-23` | `2026-07-24` | PASS — complete positive run green |
| `2026-07-24` | `2026-07-24` | PASS — exact date boundary green |
| `2026-07-25` | `2026-07-24` | REJECT — approval after declared run |
| `2026-07-25T01:30:00+02:00` | `2026-07-24` | PASS — normalizes to 2026-07-24 UTC |
| `2026-07-24T23:30:00-07:00` | `2026-07-24` | REJECT — normalizes to 2026-07-25 UTC |
| `2026-07-24T12:00:00` | `2026-07-24` | REJECT — timestamp lacks explicit zone |
| `2026-02-30` | `2026-07-24` | REJECT — impossible calendar date |
| `2026-07-24T12:00:00+15:00` | `2026-07-24` | REJECT — invalid UTC offset |

The previously accepted post-run-but-not-future sample no longer reaches
scoring. The same chronology validation is re-run during standalone artifact
verification. No equivalent date, timestamp, offset, pricing, no-charge,
tokenizer, receipt or manifest chronology bypass was found.

This pass certifies only the local evaluation architecture and evidence
mechanism. No semantic provider was selected or called, and the final FAiRY
experience remains **UNPROVEN / FIX BEFORE PROMOTION**.

## Scores

These scores cover the exact local architecture and evidence harness, not the
uncalled provider or final rendered product.

| Non-compensable gate | Score | Result | Basis |
|---|---:|---|---|
| Classifier architecture | 18/20 | PASS | Strict routing, quote isolation, deadline, no-charge failure behavior and response contracts remain intact. |
| Evaluation evidence integrity | 18/20 | PASS LOCALLY | Authority, terms, capacity, recount, receipts, signing, standalone verification and complete UTC-date chronology now fail closed under the reviewed cases. |
| Product/content quality and user value | 12/20 | NOT PROVEN | No authorized semantic-provider or rendered user trial exists. |
| Factual/technical accuracy, safety and trust | 16/20 | LOCAL MECHANISM PASS / PRODUCT NOT PROVEN | Harness containment is strong; real answer accuracy, retrieval, boundaries and provider behavior still require live evidence. |
| Positive LAiDIES brand contribution | 15/20 | NOT PROVEN | The evidence-first method fits LAiDIES, but personality, usefulness and the complete user experience have not been judged. |

Gate B passes independently. The product, accuracy/trust and brand promotion
floors cannot be awarded from a harness-only result.

## Exact candidate identity

| Artifact | SHA-256 |
|---|---|
| `worker-fairy-godmother/src/index.js` | `386357c2f453f9cb410fd5931d56d128b6c0c0914f58176923a6c52200ca2515` |
| `worker-fairy-godmother/harness/lib.mjs` | `94399912e13d998bb510506027a9a0054ff9db473e8126b3d684462ad4143dab` |
| `worker-fairy-godmother/harness/score-provider-run.mjs` | `7431424a4ae9db6e6ca4c348b5e065e8cb409559ff8ab2abf583ad8d944c3a83` |
| `worker-fairy-godmother/harness/verify-run-artifacts.mjs` | `cbadde026a3d3a1013d2747ababb2d7c3ba9f399af8d3c631eb0252b867bc6e9` |
| `worker-fairy-godmother/test/classifier-harness.test.mjs` | `a77710d433445ee628d185f9dca58d803f9cebdf1cc387fa73f621d639a1bf16` |
| frozen 79-case set | `01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da` |

## Fresh verification

- Recovery artifact checksum
  `127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e`
  and 55,137 bytes: **PASS**.
- Production mutation recorded: `false`.
- Worker, architecture and harness tests: **39/39 PASS**.
- Core evaluation fixture integrity: **45/45 PASS**.
- Frozen held-out classifier fixture: **63 semantic + 16 architecture =
  79/79 PASS**.
- Frozen fixture SHA-256 matches.
- Wrangler dry-run: **PASS**, 94.11 KiB / 29.38 KiB gzip, **no bindings
  found**.
- Product steward validator: **PASS**, 65 products and 3/3 active lanes.

## Chronology review

### Authority registry

`approvedAt` accepts either:

- a real `YYYY-MM-DD` calendar date; or
- an RFC 3339 timestamp with explicit `Z` or numeric UTC offset.

Impossible dates, missing zones, impossible clock values and offsets outside
the accepted RFC 3339 range fail. Timestamp comparison uses the normalized UTC
date.

The exact chronology is:

`registry approval UTC date <= declared run date <= verifier UTC date`

Date equality remains deliberately valid because the run identity currently
has date—not start/completion timestamp—granularity. This is an explicit
bounded contract, not a claim that same-day event order is known.

### Published pricing

The positive exact-scope rate record remains green. The harness rejects:

- effective date after access date;
- access after the run;
- future or impossible dates;
- provider/model/version mismatch;
- changed rates unsupported by retained canonical evidence;
- substituted registry or authority bytes; and
- registry approval after the declared run.

### No-charge entitlement

The harness requires validity to cover the run and access to occur no later
than the run. It rejects post-run access or validity start, wrong scope and
insufficient request/token capacity.

The measured aggregate boundary remains:

- one unit below measured use: capacity fails;
- exactly measured use: capacity passes; and
- one unit above measured use: capacity passes.

A complete positive no-charge run also requires zero claimed row cost.

### Runner tokenizer

The recognized local recount path remains executable and independently
hash-bound. One-count drift, arbitrary implementation bytes, configuration
drift and missing tokenizer identity fail. Pairing a valid tokenizer run with
a registry approved after its declared run also fails before the report can
turn green.

### Provider usage receipts

Each measured provider-response row remains bound to an exact unique:

- item ID;
- run ID;
- receipt ID;
- request ID;
- response ID;
- input/output count; and
- receipt hash.

`receivedAt` must be a zoned RFC 3339 timestamp whose normalized UTC date
equals the declared run date and is not after verifier-controlled today.
Before/after-run dates, malformed timestamps and invalid offsets fail.
Offset examples that normalize to the run’s UTC date pass.

### Manifest and standalone verification

The Ed25519 manifest binds the report and exact run identity/artifacts.
`createdAt` must be a zoned RFC 3339 timestamp whose normalized UTC date is:

`run date <= created UTC date <= verifier UTC date`

Date-only, missing-zone, impossible, pre-run and future signing values fail.
Provider/model/version drift, an unapproved key, report replacement and
artifact replacement remain rejected.

Standalone verification independently revalidates:

- registry trust anchor and approval chronology;
- authority evidence and exact terms;
- provider receipts or tokenizer recount;
- report/manifest/run identity;
- all artifact hashes; and
- verifier-controlled run/signing dates.

A valid signed report paired with a newly supplied post-run registry returns
`valid: false`.

## Request isolation

The provider send bundle remains separate from private join/evaluation
material. It contains the 63 opaque classifier requests and canonical system
prompt, not:

- expected labels or case families;
- private case IDs/join map;
- pricing or entitlement evidence;
- authority registry;
- receipt artifacts; or
- signing keys.

Output rows are joined by opaque item ID and must be byte-bound to the supplied
provider-output artifact.

## Exact remaining provider and promotion gates

The next authorized phase requires:

1. owner-approved provider, model and exact model version;
2. approved privacy, retention and request-content handling;
3. an independently anchored real authority registry and retained pricing or
   entitlement record;
4. an approved provider receipt format or provider-appropriate tokenizer;
5. an approved runner identity/key, isolated execution environment and cost
   ceiling;
6. execution of the unchanged 63-case semantic trial with complete signed
   artifacts;
7. independent judgment of semantic accuracy, safe boundaries, currentness,
   quoted-content isolation, varied real questions and no-charge failures;
8. retrieval and claim validation for time-sensitive advice;
9. authoritative FAiRY Plays entitlement, spend and refund behavior;
10. answer quality, usefulness, sass/personality and learning-standard review;
11. frontend, keyboard, screen-reader, mobile, failure and accessibility
    journeys;
12. isolated staging verification; and
13. only then, separately authorized deployment and public promotion.

No harness pass authorizes credentials, provider spend, staging, production or
promotion.

## Learning scan

**Reusable success:** “not future-dated” and “preregistered” are different
claims. Repair 6 now expresses both sides of the required chronology instead
of relying on plausible dates and a valid hash.

**Prevention rule:** every pre-authorized evidence object must be tested before,
on and after the event it authorizes, including offsets that cross a UTC date
boundary. The standalone verifier must repeat the same ordering check.

**Possible Behind the Build angle:** “The approval was real. It was also a day
too late—how we taught an AI test harness to prove evidence existed before the
test.”

**Final status:** **GATE B LOCAL HARNESS PASS — SEMANTIC PROVIDER AND FAiRY
PROMOTION HOLD.**
