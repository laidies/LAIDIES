# Maker evidence — High Cycle 5 learning-admission Repair 1

**Status:** BUILT AND VERIFIED LOCALLY — independent rejudge required.  
**Trigger:** `independent-review-cycle-5-learning-admission-2026-07-26.md`
returned 81/100 FAIL because malformed admission dates could unlock a
synthetic live class.

## Exact bounded repair

- Replaced top-level-only validation with an exact complete schema for every
  ledger, class, source, binding, quiz and question object.
- Dates require strict `YYYY-MM-DD`, real UTC calendar days and semantic
  ordering. Future reviews, expired reviews, stale/future sources, future
  production evidence and future ledger generation fail closed.
- Record IDs, content mappings, question IDs, source IDs, register slugs and
  register learning bindings are unique.
- Every recorded class binds exactly to its register row, content file, video,
  assessment record and complete source-ID set. The quiz binds back to the
  exact class record and source set. Unknown/extra records are rejected.
- A held record cannot carry review dates or a video binding. An admitted
  record must also have current production dates and a matching live/video
  register row.
- Added the current official OpenAI Memory FAQ to the precise new-chat/memory
  claim map, with product/settings variability and a 2026-08-25 recheck.
- Removed the canned multiple-choice “explain it to a friend” item. The five
  remaining questions are explicitly selected-response practice, not
  explain-back. Real explain-back remains held for a human rubric and
  unfamiliar-learner study.
- Did not change, infer or claim the clean public route.

## Hostile matrix

The source and fresh exact artifact each deny 25 future synthetic-live cases:

1. top-level extra field;
2. top-level missing field;
3. record extra field;
4. record missing field;
5. short lexical dates (`0` / `9`);
6. impossible calendar date;
7. future review;
8. expired review;
9. reversed review/recheck order;
10. duplicate record ID;
11. duplicate class mapping with held record first;
12. duplicate class mapping with admitted record first;
13. wrong kind;
14. wrong record ID;
15. wrong content ID;
16. wrong video binding;
17. omitted source binding;
18. duplicate source ID;
19. future source check;
20. stale source check;
21. wrong quiz/class binding;
22. duplicate register slug;
23. duplicate register learning binding;
24. future production evidence; and
25. unknown extra record.

Every case renders the unavailable recovery, disables the TV and contains no
video element.

## Deterministic evidence

- High contract: **PASS — 13 groups**.
- Source Chrome: **PASS — 17 journeys**, including the 25-case matrix.
- Fresh exact-artifact Chrome: **PASS — 17 journeys**, including the matrix.
- Inline JavaScript: **PASS — 352 scripts / 132 pages**.
- Local links: **PASS — 1,966 references / 110 pages**.
- Town consistency: **PASS**.
- Product steward checker: **PASS — 65 products / 3 of 3 active lanes**.
- Public metadata: **PASS**.
- JSON and scoped diff checks: **PASS**.

Fresh artifact:

`/tmp/laidies-high-cycle5-r1-final.XgQHpb`

Builder: **1,080 files / 959.56 MiB / 0 missing / 0 oversized**. The existing
internal warning above 750 MiB remains a release-owner hold.

| Runtime file | Matching source/artifact SHA-256 |
|---|---|
| `learn/class.html` | `c17ac4a8cf9fb4dadd8dac0ca0777e25abc96ea81f4d52e095d3c14819fe212d` |
| `content/site/high-classes.json` | `c675da9f9a86b949f276f8647d43a497b589fdd98c65bb48c5997cbae41adbe3` |
| `content/site/high-learning-ledger.json` | `40e6d310aeb8d8de601b052db297f55776dee53f30f2ff6735ff6ec93719780f` |

Current truth remains 4 subjects / 37 rows / 0 live / 0 video / 0 admitted
learning records. No runtime quiz was added.

## Maker self-score

| Gate | Score |
|---|---:|
| Product quality and user value | 18/20 |
| Accuracy, safety and trust | 19/20 |
| Positive LAiDIES brand contribution | 18/20 |
| UX and accessibility | 17/20 |
| Technical and data integrity | 19/20 |

**Total:** 91/100. These are maker scores, not acceptance.

## Rejudge contract and holds

The independent judge should mutate the exact source/artifact responses with
all 25 cases, inspect the validator rather than trusting test names, reproduce
the hashes and verify that no class or quiz was admitted.

Still held: independent Repair 1 acceptance; unfamiliar-learner
comprehension/explain-back/transfer; instructional and assessment review;
approved narration/media/captions/owner visuals; Safari/VoiceOver/native zoom;
Book Fair/reward/account authority; privacy-approved learning analytics;
artifact-size decision; deployment identity; clean route/custom 404 and public
origin.

## Learning scan

**Failure:** a top-level-valid authorization container was mistaken for a
valid authorization record.

**Prevention rule:** a fail-closed admission gate validates complete object
shape, real temporal semantics, uniqueness and every cross-file authority
binding before it reads an approving status. Test both hostile orderings.

**Behind the Build angle:** “The date looked small. The permission it opened
was not.”

The canonical painpoints ledger remains parent-owned and was not edited in
this bounded repair.
