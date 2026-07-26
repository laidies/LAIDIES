# Independent rejudge — SUNNYVAiLE High Cycle 5 Repair 1

**Date:** 2026-07-26  
**Role:** independent accuracy, learning, trust, accessibility and technical judge  
**Verdict:** **FAIL — SOURCE/REVIEW TEMPORAL AUTHORITY REMAINS FAIL-OPEN**  
**Score:** **83/100**  
**Scope:** exact Repair 1 source and a fresh exact artifact; no implementation,
state, registry, queue, Git, deployment or external-service mutation.

## Decision

Repair 1 closes the prior malformed-date bypass. Strict date width and real
UTC calendar validity, missing/extra admission-record fields, duplicate and
ambiguous records, future/expired/reversed class review dates, production
dates, register/video/quiz/source-ID bindings and unknown records all failed
closed in the maker's 25-case matrix on source and fresh artifact.

The candidate nevertheless fails the independent accuracy/trust and technical
floors. Admission currentness is checked independently for the class review
and each source, but their intervals are not bound to one another. A class
reviewed yesterday was admitted through tomorrow when every source was first
checked today. It was also admitted through tomorrow when every source expired
today. Both fixtures rendered `Learning review: admitted`, enabled the TV and
inserted a synthetic video in source and the fresh exact artifact.

That permits an approval to predate its evidence and to outlive all evidence
that supposedly supports it. It is a semantic ordering failure in the
authorization gate, not a cosmetic metadata defect.

## Non-compensable scores

| Gate | Score | Judgment |
|---|---:|---|
| Product quality and user value | 18/20 | The repaired lesson and honest held/recovery states are useful and coherent. |
| Accuracy, safety and trust | 15/20 | Current source content is improved, but an admitted review can precede or outlive its complete source evidence. |
| Positive LAiDIES brand contribution | 18/20 | Warm, non-shaming schoolhouse framing remains appropriate and does not invent mastery or rewards. |
| UX and accessibility | 17/20 | The 17 Chrome journeys cover keyboard, reduced motion, print and responsive/zoom proxies; native Safari, VoiceOver and zoom remain held. |
| Technical and data integrity | 15/20 | The prior lexical-date bypass is fixed and parity is exact, but source/review interval binding remains fail-open. |

**Overall:** 83/100. Product, brand and browser UX meet the floor. Accuracy,
trust and technical/data integrity do not meet the required 17/20 floor.

## P0 finding

### SH-C5-R1-J1 — Admission can predate or outlive its source evidence

The independent fixture began with a structurally valid future-live candidate:

- class production dates: 2026-07-24;
- class review: 2026-07-25 through 2026-07-28;
- matching live register row, video, class, quiz and source-ID bindings.

Two mutations were independently accepted:

1. every source `checkedOn` was 2026-07-26, after the 2026-07-25 review;
2. every source `recheckOn` was 2026-07-26, before the class admission ended
   on 2026-07-28.

Observed in both source and fresh artifact:

```json
{"review":"Learning review: admitted through 2026-07-28.","disabled":false,"video":1}
```

`validateSource()` proves only `checkedOn <= source.recheckOn` and that today
falls within the source interval. The admitted class branch separately proves
only `reviewedOn <= today <= class.recheckOn`. It never proves:

```text
source.checkedOn <= class.reviewedOn
class.recheckOn <= source.recheckOn
```

Required repair: bind every source interval to the admission interval, add
both hostile orderings to the rendered source/artifact matrix, and retain the
existing UTC calendar and future/expiry checks.

## Additional boundary findings

- Strict ISO width, impossible dates, future/reversed/expired review dates,
  duplicate/extra/missing/ambiguous admission records and exact
  register-record/video/quiz/source-ID relationships failed closed in the
  existing 25-case matrix.
- The runtime accepts extra fields on the register container and class row.
  This does not bypass an otherwise held admission record, but the maker's
  broad statement that every register/class object has an exact schema is
  stronger than the implementation.
- Jointly changing both `learning_content` and the admission record's
  `contentPath`, or replacing a source URL/support statement while preserving
  its ID, also admitted the synthetic tape. The current runtime proves string
  agreement within the two JSON responses; it does not prove that the path is
  the reviewed canonical content or that a source ID still names its reviewed
  authority. At minimum, describe this as data agreement rather than
  content/source authenticity; if hostile data replacement is in scope,
  bind immutable content/source identity.

## Learning and assessment truth

- Current register: **4 subjects / 37 rows / 0 live / 0 videos**.
- Current learning ledger: **0 admitted classes / 0 runtime quizzes**.
- The held quiz has five selected-response items, `layers-01` through
  `layers-05`; the canned `layers-06` explain-back recognition item is gone.
- Explain-back is truthfully held for a human rubric and unfamiliar-learner
  study. The lesson's written explain-back prompt is practice content, not
  claimed assessment evidence.
- The Memory FAQ is now explicitly bound to the new-chat/memory claim. The
  official OpenAI page checked independently on 2026-07-26 states that enabled
  memory can draw from chats, files and connected apps and that Temporary
  Chats do not use or create memories:
  <https://help.openai.com/en/articles/8590148-memory-faq>.

No class or quiz is admitted by the current files. This FAIL concerns the
future authorization mechanism.

## Independent mechanical evidence

### Source

- High contract: **PASS — 13 groups**.
- High browser: **PASS — 17 journeys**, including the maker's 25-case matrix.
- Product steward system: **PASS — 65 products / 3 of 3 active lanes**.
- Inline JavaScript: **PASS — 352 scripts / 132 pages**.
- Local links: **PASS — 1,966 references / 110 pages**.
- Town consistency: **PASS**.
- Independent additional hostile source cases: the two source/review ordering
  cases above both **FAIL** by admitting the synthetic tape.

### Fresh exact artifact

- Path: `/tmp/laidies-high-r1-rejudge.qWfOlT`
- Builder: **PASS — 1,081 files / 959.56 MiB**; existing size warning remains.
- High contract: **PASS — 13 groups**.
- High browser: **PASS — 17 journeys**, including the 25-case matrix.
- Public metadata: **PASS**.
- Independent additional hostile artifact cases: both source/review ordering
  cases **FAIL** with an enabled TV and one video.

Source/artifact SHA-256 parity:

| Runtime file | SHA-256 |
|---|---|
| `learn/class.html` | `c17ac4a8cf9fb4dadd8dac0ca0777e25abc96ea81f4d52e095d3c14819fe212d` |
| `content/site/high-classes.json` | `c675da9f9a86b949f276f8647d43a497b589fdd98c65bb48c5997cbae41adbe3` |
| `content/site/high-learning-ledger.json` | `40e6d310aeb8d8de601b052db297f55776dee53f30f2ff6735ff6ec93719780f` |

## Preserved holds

Independent Repair 1 acceptance; instructional-design, assessment-validity,
factual/currentness and unfamiliar-learner explain-back/transfer review;
approved narration, media, transcript, captions and owner visuals;
real-interface path verification; Safari, VoiceOver and native zoom; Book
Fair/reward/account authority; privacy-approved analytics; artifact-size
decision; deployment identity; clean `/sunnyvaile-high` route, custom 404 and
public-origin verification.

No clean-route or deployment proof is inferred from local metadata or a static
server.

## Learning scan

**Failure:** individually current source and approval intervals were treated
as if they were mutually ordered.

**Prevention rule:** authorization evidence must form one containing interval:
each source is checked no later than the review and remains current through
the full admission window. Test both gaps explicitly.

**Behind the Build angle:** “Every date passed. The timeline did not.”

The canonical painpoints ledger was not edited because this rejudge was
explicitly report-only.
