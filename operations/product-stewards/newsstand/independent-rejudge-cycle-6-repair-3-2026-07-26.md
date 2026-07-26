# NewsStand Cycle 6 Repair 3 — Final Independent Rejudge

**Review date:** 2026-07-26  
**Judge boundary:** final independent rejudge of Repair 3  
**Status:** **INDEPENDENT REJUDGE COMPLETE — BOUNDED ROUTER PASS / RELEASE HOLD**  
**Publication authority exercised:** none

This review independently inspected the Repair 3 maker evidence, Repair 2
rejudge, current charter, operating specification, state, backlog, runtime,
review router, policy, candidate schema and test suites. It reproduced source,
fresh-artifact, raw-input, date-boundary and browser-history tests with
separate hostile matrices.

No story, feed, credential, visual, candidate, publication, deployment or
public action was performed. Runtime and maker evidence were not modified.

## Independent verdict

Repair 3 **passes as a bounded fail-closed review router** against the exact
tested source and fresh artifact:

- malformed and impossible dates return `REJECT` without escaping the
  evaluator;
- the UTC calendar-day rules are stable at midnight, noon and end-of-day:
  today holds, tomorrow rejects, 30 and 31 days old hold, and 32 days old
  rejects;
- duplicate raw root keys, including escaped-equivalent names, reject before
  ordinary `JSON.parse`;
- all 12 cross-publication job-shape substitutions reject;
- malformed CLI input produces a synthetic rejection;
- every returned candidate decision is only `REJECT` or
  `HOLD_FOR_INDEPENDENT_REVIEW`; and
- publication action, authority and candidate-as-evidence remain false.

Repair 3 also preserves the Repair 2 history repair. Repeated source and
artifact runs passed viewport-clamped paper/search return at 1,200, 1,400 and
1,800 px, forged 999,999 px saved scroll and rapid Back → Forward → Back.

This is **not publication authority or a publication operation**. Nested raw
duplicate keys still use last-value-wins parsing. The JSON Schema is not
executed and differs from the evaluator. Raw parse-error results omit the
policy identity returned for parsed candidates. Policy hash canonicalization
is undocumented. Immutable source receipts, claim bindings, an independent
decision, a cross-run ledger, canonical write and rollback receipts do not
exist.

All four publications remain **HOLD — FIX BEFORE LAUNCH**.

## Fresh artifact and byte identity

Fresh disposable artifact:

`/tmp/laidies-newsstand-r3-independent.x7JTy8`

- builder reported 1,087 files and 959.59 MiB;
- independent filesystem inspection counted 1,088 regular files and
  approximately 1.1 GiB on disk;
- the existing 750 MiB warning remains;
- no `/operations/` directory was packaged;
- candidate imagery and legacy Wednesday identity remain in the artifact;
- the artifact was not deployed.

| Runtime file | Source SHA-256 | Artifact |
|---|---|---|
| `newsstand.html` | `3addb0cfd2c3d867c020601006a39d453251218aa84a23be56712c3b8a1fc1ef` | identical |
| `content/newsstand-reader-contract.js` | `a0071c3c056563d721d374b7578c9915706b49ca7db419623f80035ae65f758a` | identical |
| `content/newsstand-stories.js` | `699e59389259c94143f5eeb50e1f1d4beaa0e1235a947f52c3a561e12e4400f0` | identical |
| `content/newsstand.css` | `375899e5cdcb33ecfba9c10d038473e0b43f1108ca1093ce7e0ffcf5568afebe` | identical |

Relevant private implementation hashes:

| File | SHA-256 |
|---|---|
| raw `operations/newsstand-autopublish-policy.json` bytes | `776e62e1cceab9cd9604ff3c0c28e027e62605c463c3e9f181fea0cde88594d7` |
| evaluator-returned canonical policy object | `d75a10e4ba34fd1900a45df218ab9a45a85c51a7dd52beb7fd749df57de96f1f` |
| `operations/newsstand-candidate.schema.json` | `b2aaf305fb3177fd6d93d6b32fc174501c7c4f969e1ed9c8846c6e306f8e3513` |
| `scripts/evaluate-newsstand-autopublish.mjs` | `8b39e1c1de11bb96e80aec4f5f6786b8131160fe52fba4dc69761f3c43d7fc8c` |
| `scripts/test-newsstand-autopublish-policy.mjs` | `19bbf09a196a0a737882aa067b1f6e0ba6e2518da0a95d82a7cdae3f5cda97de` |
| `scripts/test-newsstand-reader-browser.mjs` | `16da5a3be82edf783c2eafdc86c40217f7cf4a2ef62e991ee0c7abd229ac8710` |

The policy version is now `2026-07-26.3`; the Repair 2 policy-version collision
is closed. The two policy hashes differ because the evaluator hashes
`JSON.stringify(policy)` rather than raw checked-in file bytes. That can be a
valid canonicalization, but the convention is not documented or bound to the
schema.

## Reproduced suites

| Check | Independent result |
|---|---|
| `node scripts/check-product-stewards.mjs` | PASS before rejudge |
| router policy test ×5 | PASS on all five runs |
| reader contract test ×5 | PASS on all five runs |
| story validator ×5 | PASS on all five runs |
| source browser suite ×5, serial | PASS — all 89 assertions and clean exit on every run |
| artifact browser suite ×5, serial | all 89 assertions passed on every run; runs 3 and 4 exited 1 during cleanup |
| exact NewsStand runtime hashes | PASS — source/artifact files match |
| artifact privacy boundary | PASS — no `/operations/` directory packaged |

The artifact browser cleanup failure was:

```text
ENOTEMPTY
```

while deleting the temporary Chrome profile after the assertions had passed.
It reproduced on two of five serial artifact runs. The harness still kills
Chrome and immediately deletes the profile without waiting for process exit.
This is a test-operation defect, not a failed reader assertion, and it prevents
calling the unattended browser gate reliable.

The repository was already heavily dirty. A repository-wide
`git diff --check` also reports pre-existing trailing whitespace in
`docs/growth/ali-idea-backlog.md`; this judge did not modify that file.

## Repair 2 history clamp regression

### Viewport-clamped paper and search returns

For source and artifact, the judge opened paper/search state at 620 px, scrolled
to 2,110 px, opened a story, increased viewport height, seeded spoofed
restoration state and invoked Back.

| Return height | Requested | Reachable/clamped | Source paper/search | Artifact paper/search |
|---:|---:|---:|---|---|
| 1,200 px | 2,110 | 1,530 | PASS | PASS |
| 1,400 px | 2,110 | 1,330 | PASS | PASS |
| 1,800 px | 2,110 | 930 | PASS | PASS |

Every case settled with:

- `data-ns-restoration="settled"`;
- a new restoration ID replacing the spoofed ID;
- requested, clamped, restored and actual scroll values reconciled;
- exactly one restoration event;
- one restored card and no stale article body;
- focus on the expected story link; and
- preserved `verification` search query.

A forged 999,999 px paper scroll settled at the 1,830 px maximum in source and
artifact. Rapid Back → Forward → Back settled in the final search state with
the right query, card, focus and scroll. No tested state remained pending.

The Repair 2 history clamp remains **passed locally for the exact source and
artifact**. Native Safari and assistive-technology behaviour remain separate
holds.

## Adversarial router rejudge

### Authority invariant

Across every returned candidate decision:

```text
publishActionTaken=false
authorityPresent=false
candidateAssertionsAreEvidence=false
```

Only `REJECT` and `HOLD_FOR_INDEPENDENT_REVIEW` were returned. Perfect
self-scores and all self-reported checks true still held. Unknown root
authority, publication-verdict and hash-like fields rejected. Nested
authority-like fields did not confer authority or change the false publication
flags.

No consumer was found that converts the hold into a canonical dataset write or
public action.

### Raw and direct total-function matrix

The following raw inputs all produced a controlled synthetic `REJECT` in the
CLI wrapper with exit status 0:

- empty and whitespace-only bytes;
- truncated object and missing value;
- trailing comma and JavaScript comment;
- UTF-8 BOM before JSON; and
- duplicate root key.

Valid JSON primitives, arrays and `null` also rejected. Direct evaluator calls
with `null`, primitives and empty candidates rejected. The date validator no
longer throws for invalid month/day input.

The exported raw parser itself still throws and depends on its caller to catch.
The CLI is total for the tested raw inputs; this review does not generalize that
claim to an arbitrary imported caller.

The CLI uses exit 0 for controlled rejection, so automation must inspect the
verdict rather than treating process success as candidate acceptance.

### Calendar validity and exact UTC day boundaries

With `Date.now` fixed independently at:

- `2026-07-26T00:00:00Z`;
- `2026-07-26T12:00:00Z`; and
- `2026-07-26T23:59:59Z`,

the same results held at all three instants:

| Candidate date | Result |
|---|---|
| today, `2026-07-26` | HOLD |
| tomorrow, `2026-07-27` | REJECT |
| 30 days old | HOLD |
| 31 days old | HOLD |
| 32 days old | REJECT |

Invalid month/day, impossible April 31, invalid 2026 leap day, non-padded
dates, leading whitespace, empty string and full-width digits all rejected
without an uncaught exception. A valid old leap date, year 0000 and year 9999
also rejected under freshness rules.

This closes the Repair 2 malformed-date exception, future-date allowance and
fractional-day boundary findings in the tested UTC calendar-day policy.

### Four-publication shape and array matrix

All 12 cross-job substitutions rejected:

| Requested paper | Breaking shape | Daily shape | Weekly shape | Tribune shape |
|---|---|---|---|---|
| Breaking | HOLD | REJECT | REJECT | REJECT |
| Daily | REJECT | HOLD | REJECT | REJECT |
| Weekly | REJECT | REJECT | HOLD | REJECT |
| Tribune | REJECT | REJECT | REJECT | HOLD |

Additional results:

- unknown root authority field: REJECT;
- unknown check or missing required check: REJECT;
- empty Breaking object: REJECT;
- empty, one-item or exactly duplicated Weekly developments: REJECT;
- empty or exactly duplicated Daily items: REJECT;
- exact root duplicate key: REJECT;
- escaped-equivalent root key, such as `id` and `\u0069d`: REJECT;
- `"same"` and `" same "`: HOLD because identity is not normalized;
- nested authority-like field in Breaking: HOLD, authority false;
- extra nested Tribune argument field: HOLD, authority false.

### Nested raw duplicate keys

Repair 3 scans only root-level keys before ordinary parsing. At nested depths,
`JSON.parse` still keeps the last value. Separate raw cases demonstrated:

- duplicated score `consequence`;
- duplicated required check `claimMapComplete`, false then true;
- duplicated source `url`, attacker value then legitimate value;
- duplicated Tribune `position`, `"PUBLISH"` then ordinary text; and
- duplicated Breaking `publicationAuthority`, approved then denied.

Every case still reached only HOLD with authority and publication false.
Therefore this is not a current publication bypass. It is nevertheless a
compiler ambiguity: retained evidence can differ from earlier raw bytes, and a
future authority layer must not consume such input.

The maker correctly left nested duplicate detection held. Root duplicate
rejection is accepted; recursive duplicate rejection is not.

### Schema/evaluator drift

The candidate JSON Schema remains unexecuted. It is not imported by the
evaluator, and no repository JSON Schema validator was found.

Current contract differences include:

- schema permits arbitrary Boolean check names; evaluator rejects them;
- schema permits arbitrary nested properties in `qualifiedInterrupt`;
- evaluator permits extra Tribune `argumentStructure` fields while the schema
  closes that object;
- neither path normalizes semantic identity before duplicate comparison;
- freshness is evaluator/policy logic rather than schema logic; and
- evaluator results return no schema hash.

This does not create authority while the only positive result is a hold. It
does mean the router is not yet one strict, executable, hash-bound compiler.

### Policy and result provenance

The evaluator returns:

- policy version `2026-07-26.3`; and
- canonical-object policy SHA-256
  `d75a10e4ba34fd1900a45df218ab9a45a85c51a7dd52beb7fd749df57de96f1f`.

The raw policy file SHA-256 is
`776e62e1cceab9cd9604ff3c0c28e027e62605c463c3e9f181fea0cde88594d7`.
The output field is named `policySha256` without specifying its canonical byte
representation. Parsed-candidate results include this identity, but the CLI's
synthetic parse-error rejection omits version, policy hash, mode, candidate ID
and review reasons.

Policy version advancement is accepted. Complete and unambiguous decision
provenance is not.

## Exact remaining defects

### NS-C6-R3-IR-01 — Nested duplicate keys remain last-value-wins

**Severity:** P0 integrity for any future publication authority; P1 in the
current hold-only router.

Recursively reject duplicate decoded property names at every object depth
before normalization or schema evaluation. Retain and hash the exact candidate
bytes. Include fixtures for nested scores, checks, sources, job payloads and
escaped-equivalent names.

### NS-C6-R3-IR-02 — Schema and evaluator remain separate, drifting authorities

**Severity:** P0 integrity for future publication authority.

Compile raw bytes through one closed executable schema. Close all
publication-specific nested objects, reject authority-like fields everywhere
they are not explicitly allowed, normalize semantic identity before duplicate
comparison and return the exact schema version/hash.

### NS-C6-R3-IR-03 — Rejection and policy provenance is incomplete

**Severity:** P1 auditability.

Define the exact canonical bytes represented by `policySha256` or include both
raw-file and canonical-object hashes. Use one result constructor so malformed
raw input receives a typed rejection with evaluation time, policy
version/hash, schema hash and stable reason fields.

### NS-C6-R3-IR-04 — Source truth, cross-run identity and authority remain absent

**Severity:** P0 accuracy/operations.

Candidate source declarations are not retained source receipts. Add immutable
source IDs, retrieval times, lawful retained bytes/hashes, claim bindings and
independent signed/hash-bound decisions. Enforce candidate, source, job and
decision identity in an append-only private ledger. Bind any future accepted
decision to the canonical dataset and exact artifact with correction,
retraction and rollback receipts.

Until that transaction exists, `HOLD_FOR_INDEPENDENT_REVIEW` is the highest
safe result.

### NS-C6-R3-IR-05 — Browser cleanup remains racy

**Severity:** P2 test operation.

The cleanup failure reproduced on two of five artifact runs after all 89
assertions passed. Await Chrome exit and use bounded, observable cleanup
retries before treating the harness as an unattended release gate.

### NS-C6-R3-IR-06 — Publication, visual, native and measurement holds remain

**Severity:** P0 product/brand/release.

- Breaking has no independently admitted interrupt/clear-day operation.
- Daily has no issue, previous-issue baseline or recurring briefing operation.
- Weekly has no admitted synthesis.
- Tribune has one bounded visible argument, not a recurring product operation.
- No approved four-publication visual system exists.
- Candidate Paige/rack/paper imagery and legacy Wednesday identity remain.
- Native Safari/VoiceOver, 320 px, real 200% zoom and long
  correction/retraction content remain unverified.
- No privacy-approved return-value measurement exists.
- No canonical publication write, exact release, deploy or public verification
  exists.

## Independent scores and floors

The non-compensable floor remains 17/20 for product/editorial quality,
accuracy/safety/trust and positive LAiDIES brand contribution. Repair 3 earns
bounded technical and trust credit for total date handling, exact UTC
boundaries, root duplicate rejection and explicit policy identity. It does not
earn story admission, publication operation, visual approval or authority
credit.

| Publication | Product/editorial | Accuracy/trust | LAiDIES brand | UX/accessibility | Technical/operations | Total | Verdict |
|---|---:|---:|---:|---:|---:|---:|---|
| The Breaking | **15/20 FAIL** | **16/20 FAIL** | **15/20 FAIL** | 16/20 | 16/20 | **78/100** | HOLD |
| The Daily | **16/20 FAIL** | **16/20 FAIL** | **15/20 FAIL** | 16/20 | 16/20 | **79/100** | HOLD |
| The Weekly | **14/20 FAIL** | **16/20 FAIL** | **12/20 FAIL** | 16/20 | 16/20 | **74/100** | HOLD |
| The Tribune | **16/20 FAIL** | **17/20 PASS** | **16/20 FAIL** | 16/20 | 17/20 | **82/100** | BOUNDED CONTENT STRENGTH; PRODUCT HOLD |

No publication clears all three mandatory floors.

## Accepted bounded repair

Accepted locally against the exact tested source and artifact:

- exception-free evaluator results for the tested malformed/impossible dates;
- stable UTC date-only policy at today, tomorrow and 30/31/32-day boundaries;
- root duplicate raw-key rejection, including decoded escaped equivalents;
- policy version advancement and canonical-object hash output;
- exact duplicate/empty Daily and Weekly rejection;
- empty Breaking rejection;
- unknown top-level/check rejection;
- all 12 cross-job substitutions rejected;
- only REJECT or HOLD for parsed candidate decisions;
- authority, publication action and candidate-as-evidence remain false;
- CLI synthetic rejection for the tested malformed/raw-duplicate inputs;
- Repair 2 requested/reachable/actual history restoration in repeated source
  and artifact cases; and
- source/artifact NewsStand byte identity and private-operations exclusion.

Not accepted:

- recursive raw duplicate-key rejection;
- one executable, closed, hash-bound schema;
- normalized semantic duplicate identity;
- complete policy/rejection provenance;
- cross-run identity enforcement;
- source receipts, claim binding or independent authority transaction;
- any story/publication admission;
- visual approval;
- native accessibility;
- measurement;
- clean unattended browser-test operation;
- deployment or public proof.

## Packaging guidance

This judge lane adds exactly:

`operations/product-stewards/newsstand/independent-rejudge-cycle-6-repair-3-2026-07-26.md`

Keep it separate from maker evidence. Do not modify or present maker evidence
as independent proof. Do not package the disposable `/tmp` artifact or hostile
harnesses.

Future private evidence must include exact raw candidate bytes, recursive
duplicate-key validation, executable schema identity, documented policy
canonicalization, deterministic evaluation time, immutable source receipts,
claim map, independent signed/hash-bound decision, append-only identity ledger,
canonical dataset hash, artifact hash, correction/retraction/rollback receipts,
source/artifact browser logs and native accessibility results.

The public artifact must exclude `/operations/`, candidates, fixtures,
credentials and private review records. Candidate or legacy
TODAY/WEDNESDAY imagery must not ship as approved four-publication identity.

## Learning scan

Repair 3 confirms three reusable rules:

1. a parser is not strict if duplicate detection stops at the root;
2. a policy hash must name its canonical byte representation, especially when
   it differs from the checked-in file hash; and
3. a fail-closed router can pass its bounded contract while the publication
   operation correctly remains held.

The judge lane records these findings here and does not edit the maker packet
or canonical painpoints ledger.

## Final gate

**BOUNDED ROUTER PASS / FAIL — FIX BEFORE LAUNCH.**

Repair 3 closes the Repair 2 date-totality, UTC-boundary, root-duplicate and
policy-version findings in the tested scope. The Repair 2 history clamp remains
passed. No publication has authority, an independently admitted operation or
all mandatory floors, so every publication remains held.
