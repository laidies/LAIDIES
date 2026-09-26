# Legacy NewsStand validator diagnosis — 2026-09-13

**Decision:** Do not waive or weaken `scripts/validate-newsstand-stories.mjs`.  It is a stale, unmigrated secondary audit rather than a required current release gate.  Its 239 failures expose a migration task; they do not overturn the separately passing candidate, issue-admission, publication, derivative, and reader-contract evidence.

**Scope:** Tier 2 internal diagnosis.  This record does not alter public data, the legacy validator, the canonical issue, or a release.

## Measured baseline

| Dataset exercised | Validator source | Result |
| --- | --- | --- |
| `dd8a5fb4:content/newsstand-stories.js` | byte-identical current `scripts/validate-newsstand-stories.mjs` | 236 errors, exit 1 |
| current `content/newsstand-stories.js` | current validator | 239 errors, exit 1 |

The historical baseline was a controlled local harness: the stories file came exactly from `dd8a5fb4`; the unchanged validator was mounted with the current non-story dependencies and asset paths solely to isolate the stories-dataset difference.  It is a comparison baseline, not a claim that the old checkout itself was a passing release.

The entire increase is the newly projected `chatgpt-pets-20260913`:

1. its `newsstand:source-approval:chatgpt-pets-20260913` record does not exist under the obsolete `evidence/stories/` path;
2. source 1 has `primary-product-documentation`, outside the legacy publisher-type list;
3. source 2 has `primary-product-changelog`, outside the legacy publisher-type list.

The current 239 errors group as follows: 37 unresolved legacy source-approval records, 118 publisher-type rejections, 36 source-review rejections, 6 Big Picture generic-text failures, 2 legacy manifest/source mismatches, and 40 other legacy-schema failures.  The validator reported no `reader contract:` errors.

## Why this is a schema migration defect

The script validates every record as the older generic story shape.  It requires the old public `evidence/stories/<id>.json` source-approval manifest, a fixed older publisher taxonomy, and generic daily prose fields for Big Picture records.  The current ordinary-story workflow uses a bound private candidate, independent issue-envelope admission, promotion, and projection into the schema-2 canonical dataset.  It therefore has different evidence locations and an expanded, explicit primary-product source taxonomy.  Big Picture has its own history fields and should be tested as that edition rather than as a daily story missing daily copy fields.

## Governing current checks actually run

`DAILY-MANUAL-RUNBOOK.md` requires the compose, promotion, publish, ordinary-publication, derivative, and reader-contract suites at its required-check list (lines 824–831).  It requires the direct bound ordinary-candidate validator for current candidates (lines 1454–1456).  It does not list `validate-newsstand-stories.mjs` as a release gate.

The following current checks were run against the Pets release inputs:

```text
validate-newsstand-ordinary-story-candidate.mjs ... --date 2026-09-13
PASS candidateId=chatgpt-pets-20260913

test-newsstand-reader-contract.mjs
PASS: 10 state fixtures; canonical editions; focus/ARIA/failure-state contracts

build-newsstand-derivatives.mjs --check
PASS current=4 archive=76 source_sha256=e40258a2cb2a122a75283717c3383cc38c4eab50a26694801b1bf181ed0a76a4
```

At diagnosis time, `test-build-newsstand-derivatives.mjs` separately failed only because its line 68 golden assertion still expected the prior Sep 12 lead `amodei-ai-pacing-20260912`; actual was the canonical Sep 13 lead `chatgpt-pets-20260913`:

```text
AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
+ actual - expected
+ 'chatgpt-pets-20260913'
- 'amodei-ai-pacing-20260912'
at scripts/test-build-newsstand-derivatives.mjs:68:8
```

The later bounded test repair replaces that stale literal with the currently canonical Daily issue's date-first reviewed selection, while retaining the unranked-story rejection.  The repaired suite, derivative `--check`, and reader-contract suite pass.  This is independent of the legacy-validator migration.

## Safe repair, as a separate bounded migration

1. Add an explicit schema/edition dispatch to the legacy audit.  Preserve its existing validation for legacy records, while schema-2 daily and weekly records must trace to their bound ordinary candidate, independent issue admission, and projected public record instead of requiring the obsolete `evidence/stories/` manifest.
2. Replace no taxonomy with an explicit closed list that includes the actually used `primary-product-documentation` and `primary-product-changelog` values.  Each must still require a unique source ID, HTTP(S) URL, access date, reviewed source data, candidate claim binding, and independent admission.  Unknown types must fail.
3. Validate Big Picture through its specific history, source, and watch-for requirements; do not omit text, source, correction/retraction, or safety checks merely to make the audit pass.
4. Retain the reader-contract invocation, correction/retraction drill, held/published eligibility checks, and all historical fixtures.
5. Add calibrated negative fixtures for a missing or hash-mismatched candidate/admission, unknown publisher type, missing source ID/URL/review, incomplete Big Picture history, invalid public status, and a tampered legacy evidence record.

Unsafe non-fixes are allowing unresolved approval records, accepting arbitrary publisher types, treating absent source review as reviewed, or skipping Big Picture requirements.  No such waiver is supported by this diagnosis.

## Follow-up ownership boundary

The legacy validator needs its own migration proposal, implementation, calibrated tests, and independent review before it can be restored as an authoritative release gate.  This record makes no claim that it currently passes.
