# NewsStand Cycle 6 Repair 2 — Independent Rejudge

**Review date:** 2026-07-26  
**Judge boundary:** independent rejudge of Repair 2  
**Status:** **INDEPENDENT REJUDGE COMPLETE — FAIL / RELEASE HOLD**  
**Publication authority exercised:** none

This review independently inspected the Repair 2 maker evidence, Repair 1
rejudge, current charter, operating specification, state, backlog, runtime,
review router, policy, candidate schema and test suites. It repeatedly tested
source and a fresh exact artifact and used separate hostile browser and
candidate matrices.

No story, feed, credential, visual, publication, deployment or public action
was performed. Runtime and maker evidence were not modified.

## Independent verdict

Repair 2 **closes the Repair 1 unreachable-scroll defect in the tested
scope**. Paper and search returns now distinguish requested, reachable/clamped
and actual scroll positions. Source and byte-identical artifact settle after
620 px → 1,200/1,400/1,800 px viewport changes, a forged 999,999 px saved
scroll, rapid navigation and a pre-existing spoofed DOM restoration marker.
Query, card, focus and scroll evidence all reconcile, and no tested return
remains permanently pending.

The candidate router also improves structurally. It rejects exact duplicate or
empty Daily/Weekly arrays, an empty Breaking object, unknown top-level fields,
unknown checks, impossible normalized dates, far-future/far-stale dates and
cross-paper job shapes. Candidate declarations still cannot authorize
publication.

The router is not yet a release-grade strict compiler:

- some malformed calendar strings throw a `RangeError` instead of returning
  `REJECT`;
- tomorrow's date is accepted throughout the current day;
- the 31-day calendar boundary changes verdict during the day because it is
  compared as fractional elapsed time against a date-only input;
- the JSON Schema is not executed and disagrees with handwritten validation;
- changed policy bytes retain the same policy version used by Repair 1;
- duplicate raw JSON keys remain last-value-wins; and
- immutable source receipts, claim bindings, independent authority and a
  cross-run identity ledger still do not exist.

These defects cannot publish anything because every non-rejected result remains
`HOLD_FOR_INDEPENDENT_REVIEW` with authority false. They do prevent a claim
that the compiler/authority transaction is complete.

All four publications remain **HOLD — FIX BEFORE LAUNCH**.

## Fresh artifact and byte identity

Fresh artifact:

`/tmp/laidies-newsstand-r2-independent.RXrJnq`

- builder reported 1,087 files and 959.59 MiB;
- independent filesystem inspection counted 1,088 regular files and
  approximately 1.1 GiB on disk;
- the existing 750 MiB warning remains;
- no `/operations/` directory was packaged;
- candidate NewsStand imagery, including legacy Wednesday art, remains in the
  public artifact and runtime;
- the artifact is disposable and was not deployed.

| Runtime file | Source SHA-256 | Artifact |
|---|---|---|
| `newsstand.html` | `3addb0cfd2c3d867c020601006a39d453251218aa84a23be56712c3b8a1fc1ef` | identical |
| `content/newsstand-reader-contract.js` | `a0071c3c056563d721d374b7578c9915706b49ca7db419623f80035ae65f758a` | identical |
| `content/newsstand-stories.js` | `699e59389259c94143f5eeb50e1f1d4beaa0e1235a947f52c3a561e12e4400f0` | identical |
| `content/newsstand.css` | `375899e5cdcb33ecfba9c10d038473e0b43f1108ca1093ce7e0ffcf5568afebe` | identical |

Relevant private implementation hashes:

| File | SHA-256 |
|---|---|
| `operations/newsstand-autopublish-policy.json` | `da09ce618ab59629047cb2f4408d8dfb0c205f7b9e3431df283ba8aa4823fe3f` |
| `operations/newsstand-candidate.schema.json` | `b2aaf305fb3177fd6d93d6b32fc174501c7c4f969e1ed9c8846c6e306f8e3513` |
| `scripts/evaluate-newsstand-autopublish.mjs` | `9efc24ac310f8a4de049bd541de6364575db3a0366b6b35ed2359dd20dfa2078` |
| `scripts/test-newsstand-autopublish-policy.mjs` | `19bbf09a196a0a737882aa067b1f6e0ba6e2518da0a95d82a7cdae3f5cda97de` |
| `scripts/test-newsstand-reader-browser.mjs` | `16da5a3be82edf783c2eafdc86c40217f7cf4a2ef62e991ee0c7abd229ac8710` |

## Reproduced suites

| Check | Independent result |
|---|---|
| `node scripts/check-product-stewards.mjs` | PASS before rejudge |
| router policy test ×5 | PASS on all five runs |
| reader contract test ×5 | PASS on all five runs |
| story validator ×5 | PASS on all five runs |
| source browser suite ×5, serial | PASS — all 89 assertions and clean exit on every run |
| artifact browser suite ×5, serial | PASS — all 89 assertions and clean exit on every run |
| exact runtime hashes | PASS — all four source/artifact files match |
| scoped `git diff --check` | PASS |

The prior intermittent Chrome-profile `ENOTEMPTY` cleanup failure did not recur
in these ten serial runs. The cleanup code hash is unchanged and still kills
Chrome immediately before synchronous profile deletion, so the prior exact
failure is not proven repaired; it is retained as a lower-severity operational
hold.

## Independent history stress

### Viewport-clamped paper and search

For each source and artifact case:

1. open the Tribune paper or `verification` search at 620 px height;
2. scroll to the reachable bottom, 2,110 px;
3. open the story;
4. set a taller viewport;
5. pre-seed the DOM restoration state/ID with spoofed values;
6. invoke Back and wait on the observable state.

| Return height | Requested | Reachable/clamped | Paper | Search |
|---:|---:|---:|---|---|
| 1,200 px | 2,110 | 1,530 | PASS | PASS |
| 1,400 px | 2,110 | 1,330 | PASS | PASS |
| 1,800 px | 2,110 | 930 | PASS | PASS |

Every case produced:

- `data-ns-restoration="settled"`;
- a new runtime restoration ID rather than the spoofed marker;
- `data-ns-requested-scroll=2110`;
- `data-ns-clamped-scroll` equal to the current reachable maximum;
- `data-ns-restored-scroll` equal to `window.scrollY`;
- exactly one observed `newsstand:history-restored` event;
- event ID matching the runtime restoration ID;
- `clamped: true`;
- one restored front card and no stale article body;
- focus on `#label-is-not-a-truth-detector`; and
- preserved `verification` query in search mode.

### Forged saved scroll and rapid navigation

A forged 999,999 px paper scroll settled at the actual 1,830 px maximum in
source and artifact. Requested, clamped and restored values were separately
observable; the event reported `clamped: true`; card and focus were correct.

Rapid Back → Forward → Back settled in the final search state with one card,
no article body, the `verification` query, correct story-link focus and
requested = clamped = restored = actual scroll. No tested rapid-navigation
case retained `pending`.

The Repair 1 P0 history finding is therefore **closed locally for the exact
tested artifact**. Native Safari and assistive-technology behaviour remain
separate holds.

## Independent router and schema stress

### Authority invariant

Across every returned result:

```text
publishActionTaken=false
authorityPresent=false
candidateAssertionsAreEvidence=false
```

The only returned verdict values were `REJECT` and
`HOLD_FOR_INDEPENDENT_REVIEW`. Perfect self-scores and all candidate checks set
true remained held. Top-level self-authorization fields, publication verdicts
and forged hash fields rejected as unknown.

No script consumer was found that converts the review hold into a public
dataset write or publication.

### Four-paper job matrix

All 12 cross-job substitutions rejected:

| Requested paper | Breaking shape | Daily shape | Weekly shape | Tribune shape |
|---|---|---|---|---|
| Breaking | HOLD | REJECT | REJECT | REJECT |
| Daily | REJECT | HOLD | REJECT | REJECT |
| Weekly | REJECT | REJECT | HOLD | REJECT |
| Tribune | REJECT | REJECT | REJECT | HOLD |

Additional results:

- one-item Weekly: REJECT;
- exact-duplicate Weekly developments: REJECT;
- empty Weekly development: REJECT;
- exact-duplicate Daily items: REJECT;
- empty Daily item: REJECT;
- empty Breaking object: REJECT;
- unknown top-level key: REJECT;
- unknown check or missing required check: REJECT;
- malformed text date: REJECT;
- normalized impossible `2026-02-31`: REJECT;
- far-future and far-stale dates: REJECT;
- duplicate source URL: REJECT;
- source-level or top-level forged hash: REJECT.

### Calendar exceptions and boundary behaviour

At independent test time `2026-07-26T10:20:47Z`:

| Input | Result |
|---|---|
| `2026-13-01` | `RangeError: Invalid time value` |
| `2026-07-00` | `RangeError: Invalid time value` |
| `2026-02-31` | REJECT |
| `2026-07-27` | HOLD |
| `2026-07-28` | REJECT as future |
| `2026-06-26` | HOLD |
| `2026-06-25` | REJECT as stale |
| `2026-06-24` | REJECT as stale |

The exception occurs because `validIsoDate` calls `Number.isNaN` on the `Date`
object rather than its numeric time, then calls `toISOString()` on an invalid
date. The direct evaluator therefore has an exception state outside the
claimed two-result contract; the CLI catches it and exits without a verdict.

With `Date.now` fixed at midnight on July 26, June 25 is exactly 31 days old
and holds. At noon the same date is 31.5 days old and rejects. July 27 holds
throughout July 26 because the future check allows a value down to exactly
-1 day. This is deterministic arithmetic but an undefined editorial boundary
for date-only records.

### Schema execution and drift

The candidate JSON Schema is not imported or executed by the evaluator. No
JSON Schema validator is installed in the repository. The evaluator uses
separate handwritten checks.

The two contracts already differ:

- the schema permits arbitrary Boolean check names, while the evaluator
  rejects them;
- the schema permits arbitrary properties in `qualifiedInterrupt`;
- the evaluator permits an extra nested authority-like property in a
  non-empty Breaking object and extra fields in `argumentStructure`, while the
  schema closes Tribune's argument object;
- neither contract normalizes whitespace before duplicate comparison, so
  `"same"` and `" same "` can reach review as two work items;
- freshness is policy/evaluator logic and is absent from the schema; and
- the schema hash is unchanged from Repair 1 even though the evaluator's
  enforced envelope changed.

Nested authority-like fields did not affect the output: they still returned
HOLD with publication/authority false. They nevertheless demonstrate that the
claimed strict shape is not one executable authority.

### Policy identity collision

Repair 1 policy SHA-256 was
`d032f39b911b95da1b94641a272bd99b7dbf0bb9565bbad8beca041fbeef397d`.
Repair 2 policy SHA-256 is
`da09ce618ab59629047cb2f4408d8dfb0c205f7b9e3431df283ba8aa4823fe3f`.

Both identify themselves as policy version `2026-07-26.1`. The evaluator
returns only that version, not the policy hash. A future review record could
therefore not determine which materially different policy bytes produced its
result. This does not create authority now, but it violates exact evidence
provenance.

### Raw duplicate JSON keys

The maker correctly leaves this held. `JSON.parse` resolves duplicate object
keys using the last value. An input with duplicate `id` and `edition` keys was
observed as the final ID and Daily edition and reached
`HOLD_FOR_INDEPENDENT_REVIEW`. Authority remained false and no publication
occurred.

The cross-run candidate-ID ledger is also absent. The same candidate ID can be
routed repeatedly without collision detection.

## Exact remaining defects

### NS-C6-R2-IR-01 — Malformed calendar input can escape the two-verdict contract

**Severity:** P0 compiler/release for any future producer transaction.

Validate `parsed.getTime()` before `toISOString`, and make every raw input
produce a typed `REJECT` result rather than an exception. Add invalid month,
day zero, invalid leap-day, extreme year, non-string and Unicode/whitespace
fixtures to the direct evaluator and CLI tests.

### NS-C6-R2-IR-02 — Freshness boundaries are undefined and wall-clock dependent

**Severity:** P1 accuracy/operations.

Define whether future tolerance exists. If future calendar dates are invalid,
reject tomorrow immediately. Define a date-only cutoff in calendar days or
replace `date` with a timestamp. Inject the evaluation time into the router so
boundary tests and old fixtures are reproducible. Test exactly tomorrow,
day-after, 30/31/32 days, midnight and end-of-day.

### NS-C6-R2-IR-03 — Schema, evaluator and policy identity are not one authority

**Severity:** P0 integrity for future publication authority.

Compile candidate bytes through one closed executable schema, then apply
versioned policy rules. Close nested job objects and normalize item identity
before duplicate comparison. Bump the policy version whenever policy bytes
change and include both schema and policy hashes in every private result.

### NS-C6-R2-IR-04 — Raw duplicate keys and cross-run identities remain ungoverned

**Severity:** P1 compiler/ledger.

Reject duplicate raw keys before ordinary JSON parsing. Enforce candidate,
source, job and decision identity across runs in an append-only private ledger.
Do not infer uniqueness from one process invocation.

### NS-C6-R2-IR-05 — Source truth and independent authority remain absent

**Severity:** P0 accuracy/operations.

The accepted source shape still contains candidate declarations, not retained
source receipts. Add immutable source IDs, retrieval times, retained lawful
bytes/hashes and claim bindings. Record independent signed/hash-bound verdicts
outside candidate control and bind an accepted decision to the canonical
dataset and exact artifact.

Until that transaction exists, `HOLD_FOR_INDEPENDENT_REVIEW` remains the
highest safe result.

### NS-C6-R2-IR-06 — Publication, visual, native and measurement holds remain

**Severity:** P0 product/brand/release.

- Breaking has no representative accepted-interrupt/clear-day pair.
- Daily has no issue, previous-issue baseline or recurring briefing operation.
- Weekly has no admitted synthesis.
- Tribune has one bounded visible argument, not a recurring product operation.
- No approved four-paper visual system exists.
- Runtime and artifact still use candidate Paige/rack/paper imagery and legacy
  Wednesday identity.
- Native Safari/VoiceOver, 320 px, real 200% zoom and long
  correction/retraction content remain unverified.
- No privacy-approved return-value measurement exists.
- No exact release, deploy or public verification exists.

### NS-C6-R2-IR-07 — Prior browser cleanup race is not demonstrably repaired

**Severity:** P2 test operation.

Ten current serial runs exited cleanly, so this is not a current reproduced
failure. The harness hash and immediate kill/delete sequence are unchanged
from Repair 1, where an exact `ENOTEMPTY` failure occurred after passing all
assertions. Await Chrome exit and retain bounded cleanup retries before making
the test an unattended release gate.

## Independent scores and floors

The non-compensable floor remains 17/20 for product/editorial quality,
accuracy/safety/trust and positive LAiDIES brand contribution. Repair 2 earns
meaningful UX and technical credit for the clamped-history result. It does not
earn publication, editorial, brand or authority credit.

| Publication | Product/editorial | Accuracy/trust | LAiDIES brand | UX/accessibility | Technical/operations | Total | Verdict |
|---|---:|---:|---:|---:|---:|---:|---|
| The Breaking | **15/20 FAIL** | **16/20 FAIL** | **15/20 FAIL** | 16/20 | 15/20 | **77/100** | HOLD |
| The Daily | **16/20 FAIL** | **16/20 FAIL** | **15/20 FAIL** | 16/20 | 15/20 | **78/100** | HOLD |
| The Weekly | **14/20 FAIL** | **15/20 FAIL** | **12/20 FAIL** | 16/20 | 15/20 | **72/100** | HOLD |
| The Tribune | **16/20 FAIL** | **17/20 PASS** | **16/20 FAIL** | 16/20 | 16/20 | **81/100** | BOUNDED CONTENT STRENGTH; PRODUCT HOLD |

No publication clears all three mandatory floors.

## Accepted bounded repair

Accepted locally against the exact tested artifact:

- clamped requested/reachable/actual history restoration;
- paper and search settlement at 1,200/1,400/1,800 px;
- forged large-scroll settlement;
- rapid-navigation final-state restoration;
- observable restoration ID, requested, clamped and actual values;
- focus, query and card restoration;
- no tested permanent pending state;
- exact duplicate/empty Daily and Weekly rejection;
- empty Breaking rejection;
- unknown top-level/check rejection;
- normalized impossible and far future/stale date rejection;
- all 12 cross-job substitutions rejected;
- only `REJECT` or `HOLD_FOR_INDEPENDENT_REVIEW` when the evaluator returns;
- authority, publication action and candidate-as-evidence remain false;
- source/artifact runtime byte identity.

Not accepted:

- exception-free raw-input compilation;
- defined/reproducible freshness boundaries;
- executable schema/policy identity;
- duplicate raw-key and cross-run identity enforcement;
- source receipt, claim-map or independent authority transaction;
- any story/publication admission;
- visual approval;
- native accessibility;
- measurement;
- deployment or public proof.

## Packaging guidance

This judge lane adds exactly:

`operations/product-stewards/newsstand/independent-rejudge-cycle-6-repair-2-2026-07-26.md`

Keep it separate from the maker evidence. Do not modify or present maker
evidence as independent proof. Do not package either disposable `/tmp`
artifact or the hostile harness.

Future private evidence must include raw candidate bytes, duplicate-key
validation, executable schema and policy hashes/versions, deterministic
evaluation time, immutable source receipts, claim map, independent
signed/hash-bound decision, cross-run identity ledger, canonical dataset hash,
artifact hash, correction/retraction/rollback receipts, source/artifact browser
logs and native accessibility results.

The public artifact must exclude `/operations/`, candidates, fixtures,
credentials and private review records. Candidate or legacy
TODAY/WEDNESDAY imagery must not ship as approved four-paper identity.

## Learning scan

Repair 2 confirms the reusable clamping rule from Repair 1: requested state and
reachable state must be distinct and observable. The new finding is that a
human-readable policy version is not artifact identity; changed policy bytes
need a new version and hash binding. The judge lane records those findings
here and does not edit the maker packet or canonical painpoints ledger.

## Final gate

**FAIL — FIX BEFORE LAUNCH.** The viewport-clamped history blocker is closed
locally. The next bounded repair should make raw candidate parsing
exception-free, define time boundaries, execute one hash/version-bound strict
schema and preserve the independent authority/publication holds.
