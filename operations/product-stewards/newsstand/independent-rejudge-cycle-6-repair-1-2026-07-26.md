# NewsStand Cycle 6 Repair 1 — Independent Rejudge

**Review date:** 2026-07-26  
**Judge boundary:** independent rejudge of a different maker's Repair 1  
**Status:** **INDEPENDENT REJUDGE COMPLETE — FAIL / RELEASE HOLD**  
**Public authority exercised:** none

This rejudge inspected the Repair 1 maker evidence, prior Cycle 6 independent
review, charter, operating specification, state, backlog, exact changed
runtime, policy, candidate schema, evaluator and tests. It reproduced the
source and a fresh exact artifact repeatedly, then added hostile candidate and
history cases not present in the maker suite.

No story, publication, feed, credential, visual, deploy or public action was
performed. This report does not approve any current content or imagery.

## Independent verdict

Repair 1 materially fixes the most dangerous prior defect: the former
auto-publish-like evaluator is now a review router whose only result values are
`REJECT` and `HOLD_FOR_INDEPENDENT_REVIEW`. Its returned publication action and
authority are hard-coded false. Candidate-supplied authority fields are
unknown fields and reject. Perfect candidate scores and checks remain held.
All 12 cross-publication job substitutions independently tested as `REJECT`,
and a literal one-item Weekly also rejects.

That repair is **accepted as a bounded fail-closed routing improvement**. It is
not publication authority.

The overall release still fails. The new observable history contract has an
adversarial but realistic non-termination defect: when the viewport becomes
taller between opening a story and returning, the saved scroll may exceed the
new maximum scroll. Chrome clamps the actual scroll, while the runtime compares
it with the unreachable old value and recursively retries forever. Paper and
search cards, query and focus reappear, but `data-ns-restoration` remains
`pending`; no settled event or settled scroll evidence is produced.

The proposed candidate format also remains a proposal shape rather than the
strict, hash-bound compiler required for a producer-to-reader transaction.
This is safe only because every structurally acceptable proposal is held.

All four publications remain **HOLD — FIX BEFORE LAUNCH**.

## Reproduced exact evidence

Fresh artifact:

`/tmp/laidies-newsstand-r1-independent.43n3hh`

- builder reported 1,087 files and 959.59 MiB;
- artifact remained over the existing 750 MiB warning threshold;
- no `/operations/` directory was packaged;
- the public artifact still packages and the runtime still references
  NewsStand candidate imagery, including the legacy Wednesday paper;
- the artifact is disposable and is not release evidence by itself.

### Runtime byte identity

| File | Independent SHA-256 | Source/artifact |
|---|---|---|
| `newsstand.html` | `0cef9bd920ba9f745a001c7b9391905d3e898b40bdaadb25f6d500624a847bcc` | identical |
| `content/newsstand-reader-contract.js` | `a0071c3c056563d721d374b7578c9915706b49ca7db419623f80035ae65f758a` | identical |
| `content/newsstand-stories.js` | `699e59389259c94143f5eeb50e1f1d4beaa0e1235a947f52c3a561e12e4400f0` | identical |
| `content/newsstand.css` | `375899e5cdcb33ecfba9c10d038473e0b43f1108ca1093ce7e0ffcf5568afebe` | identical |

### Repeated suites

| Check | Independent result |
|---|---|
| `node scripts/check-product-stewards.mjs` | PASS before rejudge |
| policy router test ×5 | PASS on all five runs |
| reader contract test ×5 | PASS on all five runs |
| story validator ×5 | PASS on all five runs |
| source browser suite ×5, serial | PASS — 89 assertions on every run |
| artifact browser suite ×5, serial | All five reached the 89-assertion PASS line; four exited cleanly and one then exited 1 during Chrome-profile cleanup |
| exact runtime hashes | PASS — all four source/artifact hashes match |
| `git diff --check` on repair allowlist | PASS |

The serial source runs establish that the normal 620/900 px cases have stopped
alternating between paper/search assertion failure. The artifact cleanup error
is a separate test-runner defect and is recorded below.

## Adversarial results

### Authority and self-grading

The following candidate inputs could not authorize publication:

- `publicationAuthority: "approved"`;
- `verdict: "PUBLISH"`;
- `publishActionTaken: true`;
- `authorityPresent: true`;
- perfect candidate-supplied scores;
- every named candidate check set to true;
- forged `sourceSha256` and `approvalSha256` fields;
- an invented check named `madeUpApproval`;
- an empty Breaking interrupt object;
- a minimal self-authored Tribune evidence/inference/position declaration.

Authority-like and hash-like top-level fields reject as unknown. The remaining
self-declarations can at most reach `HOLD_FOR_INDEPENDENT_REVIEW`, with:

```text
publishActionTaken=false
authorityPresent=false
candidateAssertionsAreEvidence=false
reviewReasons=["independent_signed_hashed_authority_required"]
```

No runtime or script consumer was found that turns the hold result into a
canonical write or publication action.

### Publication-job matrix

Every wrong pairing of declared edition and another paper's job shape rejected:

| Requested paper | Breaking shape | Daily shape | Weekly shape | Tribune shape |
|---|---|---|---|---|
| Breaking | HOLD | REJECT | REJECT | REJECT |
| Daily | REJECT | HOLD | REJECT | REJECT |
| Weekly | REJECT | REJECT | HOLD | REJECT |
| Tribune | REJECT | REJECT | REJECT | HOLD |

The literal one-development Weekly rejected with
`edition_contract_failed:weekly_requires_durable_synthesis`.

However, the handwritten evaluator does not execute the JSON Schema's full
constraints. Two identical or empty Weekly developments, two identical Daily
briefing items, an empty Breaking object and minimal self-authored Tribune
strings all route to hold. They do not publish, but they are not trustworthy
proof that the requested editorial job has actually been performed.

### Unknown fields, dates, duplicate keys and identity

- Unknown top-level fields reject.
- Unknown Boolean keys inside `checks` are accepted.
- Duplicate source URLs reject.
- `2099-01-01`, `2000-01-01` and the impossible calendar value
  `2026-02-31` all route to hold without a freshness or calendar rejection.
- Raw JSON duplicate keys are resolved by `JSON.parse` using the last value;
  an input containing duplicate `id` and `edition` keys was not detected as
  duplicate and routed according to the last values.
- The stateless evaluator cannot detect reuse of a candidate ID across
  separate invocations.
- Source receipts have no immutable source ID, accessed timestamp, retained
  byte hash or claim binding. Candidate-supplied `verifiedFullText` remains a
  declaration.
- Hash fields are not part of the accepted shape, so the router correctly
  cannot mistake a forged hash for authority—but it also cannot verify a real
  one.

These are remaining compiler and ledger requirements, not paths to publication
in the current fail-closed router.

### History and viewport stress

Normal source tests passed five consecutive runs, and the byte-identical
artifact reached all 89 assertions five times. Rapid
Back → Forward → Back also restored the final search query, card, focus and
settled state in the independent hostile harness.

The following source and artifact cases failed identically:

1. Open a Tribune paper or `verification` search at 620 px viewport height.
2. Scroll to the reachable bottom: 2,110 px.
3. Open the story.
4. Increase viewport height before Back.
5. Return and observe for 2.2 seconds.

| Returned viewport height | Reachable maximum | Paper state | Search state |
|---:|---:|---|---|
| 1,200 px | 1,530 px | `pending` indefinitely | `pending` indefinitely |
| 1,400 px | 1,330 px | `pending` indefinitely | `pending` indefinitely |
| 1,800 px | 930 px | `pending` indefinitely | `pending` indefinitely |

In all cases the saved target remained 2,110 px. Cards, query and story-link
focus were restored, but `data-ns-restored-scroll` remained absent and
`newsstand:history-restored` was never emitted. A forged history scroll of
999,999 px produced the same permanent pending state.

The defect is exact in `applyHistoryRestoration`: it calls
`scrollTo(savedScroll)`, then retries whenever `window.scrollY !==
savedScroll`. It never clamps the target to the current scroll range, places
no retry bound and has no terminal fallback. Orientation changes, zoom,
window resizing, font/layout changes and browser UI changes can all alter the
reachable range without a forged state.

### Accessibility and test operation

- The nominal keyboard focus result is improved and passed in the tested
  paper/search history cases.
- A restoration that remains permanently pending can keep scheduling animation
  frames and never exposes completion to assistive or test consumers.
- The full story container remains an `aria-live="polite"` region; native
  Safari/VoiceOver behaviour is still untested.
- 320 px, real browser 200% zoom, long correction/retraction content and
  native mobile remain held.
- On one of five serial artifact browser runs, all 89 assertions passed and
  the process then failed with `ENOTEMPTY` while deleting the Chrome profile.
  The harness kills Chrome and immediately removes its profile without waiting
  for process exit or using cleanup retries. This does not disprove the runtime
  assertions, but it makes the claimed repeated gate operationally flaky.

## Exact defects and required repairs

### NS-C6-R1-IR-01 — Unreachable saved scroll prevents observable settlement

**Severity:** P0 UX/accessibility/release.

Clamp the restoration target to the current reachable scroll range on every
attempt. Settle against that reachable target, not an obsolete saved number.
Use a bounded retry/observer contract with a terminal state. Add paper and
search tests that change viewport height, zoom/layout height and history state
between story open and Back. Assert that the event fires once, the latest
restoration ID wins, query/cards/focus are correct and no pending restoration
survives.

### NS-C6-R1-IR-02 — Candidate schema is not the evaluator's enforced contract

**Severity:** P0 accuracy/trust for any future producer transaction.

Compile raw input through the closed schema before routing. Reject duplicate
or empty job items, empty interrupt objects, impossible dates, stale/future
values outside a declared policy window, unknown check keys and malformed
nested data. Keep schema and runtime validation generated from or tested
against one authority so they cannot drift.

This does not authorize checking candidate truth. It only establishes a valid
proposal envelope.

### NS-C6-R1-IR-03 — No immutable source or independent authority transaction exists

**Severity:** P0 accuracy/operations.

Add retained lawful source receipts with immutable IDs, retrieval timestamps
and byte/content hashes; bind claims to those receipts; record independent
signed/hash-bound verdicts outside the candidate; enforce duplicate candidate,
source and publication-job identities in a ledger; and bind the approved
record to the exact canonical dataset and artifact hash. The candidate must
never supply or grade these authority fields.

Until this exists, `HOLD_FOR_INDEPENDENT_REVIEW` is the highest safe result.

### NS-C6-R1-IR-04 — Duplicate raw keys and cross-run IDs are not rejected

**Severity:** P1 compiler/integrity.

Detect duplicate JSON object keys before normal object parsing or use a parser
that preserves duplicate-key errors. Enforce candidate/source/job uniqueness
against a durable ledger, not one evaluator invocation. Keep duplicate source
URL rejection.

### NS-C6-R1-IR-05 — Repeated browser gate has flaky cleanup

**Severity:** P1 test/release operation.

Await Chrome process exit before deleting the temporary profile and use bounded
cleanup retries. A successful assertion line followed by process exit 1 must
not be reported as a fully passing release gate.

### NS-C6-R1-IR-06 — Publication, visual, native and return-value proof remains absent

**Severity:** P0 product/brand/release.

Preserve the existing holds:

- no accepted/quiet representative pair for Breaking;
- no Daily issue and previous-issue baseline;
- no admitted Weekly synthesis;
- only one visible Tribune argument;
- no private producer-to-reader transaction for any paper;
- no approved four-paper visual system;
- runtime still uses candidate room/paper imagery and legacy Wednesday art;
- no native Safari/VoiceOver or real 200% zoom evidence;
- no privacy-approved return-value measurement;
- no exact deploy or public verification.

Do not fill a quiet desk to improve a score.

## Independent scores

The non-compensable floor remains 17/20 for product/editorial quality,
accuracy/safety/trust and positive LAiDIES brand contribution. Repair credit is
awarded for the fail-closed router and stronger nominal browser evidence, not
for publication work that does not exist.

| Publication | Product/editorial | Accuracy/trust | LAiDIES brand | UX/accessibility | Technical/operations | Total | Verdict |
|---|---:|---:|---:|---:|---:|---:|---|
| The Breaking | **15/20 FAIL** | **16/20 FAIL** | **15/20 FAIL** | 15/20 | 14/20 | **75/100** | HOLD |
| The Daily | **16/20 FAIL** | **16/20 FAIL** | **15/20 FAIL** | 15/20 | 14/20 | **76/100** | HOLD |
| The Weekly | **14/20 FAIL** | **15/20 FAIL** | **12/20 FAIL** | 15/20 | 14/20 | **70/100** | HOLD |
| The Tribune | **16/20 FAIL** | **17/20 PASS** | **16/20 FAIL** | 15/20 | 15/20 | **79/100** | BOUNDED CONTENT STRENGTH; PRODUCT HOLD |

### Score movement

- **Breaking:** gains bounded technical/trust credit for exact job rejection
  and removal of auto-publish-like output; still has no qualified issue pair.
- **Daily:** gains bounded job-routing credit; still has no operating briefing,
  previous issue or return proof.
- **Weekly:** literal one-item masquerade is now rejected, but duplicate/empty
  pseudo-synthesis still reaches review and no Weekly issue is admitted.
- **Tribune:** retains the prior accuracy-floor pass for the bounded argument
  and gains safe-routing/nominal-history credit; it remains below product and
  brand floors.

## Accepted bounded repair versus remaining gate

**Accepted locally:**

- only `REJECT` and `HOLD_FOR_INDEPENDENT_REVIEW` outcomes;
- `publishActionTaken=false`;
- `authorityPresent=false`;
- `candidateAssertionsAreEvidence=false`;
- authority-like unknown fields reject;
- direct cross-job relabelling rejects;
- a literal one-item Weekly rejects;
- normal repeated 620/900 px source history assertions no longer alternate;
- source/artifact runtime byte identity.

**Not accepted:**

- release-grade history settlement under reachable-layout change;
- strict schema/compiler enforcement;
- source identity, retrieval, hashes or claim entailment;
- external independent authority;
- duplicate-key or cross-run identity safety;
- publication/editorial admission;
- approved visuals;
- native accessibility;
- measurement;
- deploy or public verification.

## Packaging guidance

This judge lane adds exactly:

`operations/product-stewards/newsstand/independent-rejudge-cycle-6-repair-1-2026-07-26.md`

Keep the report separate from maker evidence. Do not modify or restage the
maker's evidence as independent proof. Do not package the disposable `/tmp`
artifact or the adversarial harness.

For a future private release-evidence bundle, include:

- raw candidate bytes and duplicate-key validation result;
- schema/compiler version and output;
- immutable source receipts and retained-byte hashes;
- claim map;
- independent signed/hash-bound decision;
- candidate, source and publication-job ledger identities;
- exact canonical dataset and public artifact hashes;
- correction/retraction/rollback receipts;
- source and artifact browser logs including viewport-change cases;
- native accessibility evidence;
- cleanup-stable test logs.

The public artifact must exclude `/operations/`, raw candidates, review
fixtures, credentials and internal evidence. Candidate and legacy
TODAY/WEDNESDAY imagery must not ship as approved four-paper identity. Package
only independently admitted story records and owner-approved visual assets.

## Learning scan

The reusable finding is that an observable “settled” flag is not sufficient
when the target state can become physically unreachable. A restoration
contract must normalize its target against current layout constraints, bound
its retries and expose a terminal outcome. This is recorded here for product
reconciliation; the judge lane did not edit the canonical painpoints ledger.

## Final gate

**FAIL — FIX BEFORE LAUNCH.** Preserve every publication, visual, native,
deployment and public-verification hold. The next rejudge must first close the
unreachable-scroll loop and prove it in source and an exact artifact, then
provide the strict private compiler/authority transaction required before any
publication can be considered.
