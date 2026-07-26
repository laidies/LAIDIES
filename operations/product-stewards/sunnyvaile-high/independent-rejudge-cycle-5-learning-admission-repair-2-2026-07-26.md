# Independent rejudge — SUNNYVAiLE High Cycle 5 Repair 2

**Date:** 2026-07-26  
**Role:** independent accuracy, learning, trust, accessibility and technical judge  
**Verdict:** **PASS — BOUNDED LOCAL TEMPORAL-CONTAINMENT GATE**  
**Score:** **90/100**  
**Scope:** exact Repair 2 source and a newly built exact artifact; no
implementation, state, registry, queue, Git, deployment, credential or
external-service mutation.

## Decision

Repair 2 closes the temporal-authorization defect that caused the 83/100
Repair 1 FAIL. An admitted class now requires every supporting source interval
to contain the complete class-review interval:

```text
source.checkedOn <= class.reviewedOn
class.recheckOn <= source.recheckOn
```

The comparison is correctly inclusive. Equal checked/review dates and equal
class/source recheck dates remain valid, while a one-day gap at either edge
fails closed. A single violating source in an otherwise valid six-source
record denies the entire class.

I reran the contract and rendered browser matrix against source and a newly
built exact artifact. All 29 hostile synthetic-live cases rendered the honest
unavailable state, left the TV disabled and inserted zero videos. I also ran
an independent 8-denial/2-equality temporal matrix in both environments,
including explicit UTC-Z and offset timestamp attacks. Both positive boundary
fixtures admitted only their synthetic mechanism test, enabled the TV and
inserted the expected synthetic video.

This is a PASS for the bounded temporal-containment repair, not class,
learning, media, promotion, deployment or public approval. Current source
still contains 37 class rows, zero live rows, zero videos, zero admitted
classes and zero runtime quizzes.

## Non-compensable scores

| Gate | Score | Judgment |
|---|---:|---|
| Product quality and user value | 18/20 | The classroom keeps planned previews useful while denying unreviewed playback and providing independent recovery routes. |
| Accuracy, safety and trust | 19/20 | Full source evidence now predates or equals approval and remains current through its complete admission window; no current class or quiz is promoted. |
| Positive LAiDIES brand contribution | 18/20 | The schoolhouse framing remains warm and distinctive without inventing mastery, permanent records, rewards or released tapes. |
| UX and accessibility | 17/20 | Source and artifact Chrome journeys preserve responsive, keyboard, reduced-motion, print and 200% proxy behavior; native zoom, Safari and VoiceOver remain held. |
| Technical and data integrity | 18/20 | Exact dates, temporal relationships, uniqueness and cross-file bindings fail closed with byte-identical source/artifact runtime files; artifact size and public binding remain open. |

**Overall:** 90/100. Every non-compensable category meets the required 17/20
floor.

## Independent temporal and authorization attacks

The maker's rendered 29-case source/artifact denial matrix plus my independent
8-denial/2-equality matrix cover:

- malformed top-level and record shape;
- short-width dates;
- impossible calendar dates;
- date-time/time-zone strings where an exact UTC calendar day is required;
- future, expired and reversed class-review intervals;
- future, expired and reversed source intervals;
- every source checked after the class review;
- every source expiring before the class admission;
- one late-checked source among otherwise valid sources;
- one early-expiring source among otherwise valid sources;
- duplicate record IDs, class mappings, register slugs, register learning
  bindings and source IDs;
- wrong record kind, record ID, content ID, video, quiz/class and source-ID
  bindings;
- future production evidence; and
- unknown extra records.

For the temporal cases, the operative validator returns parsed UTC day stamps
from the strict `YYYY-MM-DD` calendar parser. It compares every returned
source interval with the parsed class-review interval before playback can be
rendered. Validation throws on any violation, so the caller enters the shared
unavailable recovery branch before an admitted status, enabled TV or video is
created.

Positive boundary evidence covers:

1. every source interval exactly equal to the class interval; and
2. a mixed source set containing left-edge equality, right-edge equality and
   wider intervals.

Both pass, confirming inclusive containment rather than an accidental strict
interior rule.

## Current truth and earlier corrections

Independent source inspection and JSON counts reproduce:

```text
subjects=4
class rows=37
live rows=0
video rows=0
admitted classes=0
runtime quizzes=0
```

The earlier P1 corrections remain present:

- the official OpenAI Memory FAQ is explicitly bound to the
  new-chat/memory claim, with product/settings variability and Temporary Chat
  limits;
- the held assessment contains five selected-response practice items;
- the misleading canned explain-back recognition item remains removed;
- explain-back remains explicitly held for a human rubric and
  unfamiliar-learner study; and
- the clean `/sunnyvaile-high` route and custom-404 behavior remain
  public-origin holds rather than locally inferred facts.

The Repair 1 judge's additional caveat also remains accurate: agreement among
intercepted register, ledger and source strings is data agreement, not
cryptographic proof of immutable reviewed content or publisher authority.
Extra fields on the broader register container/class rows are not an
admission bypass in the tested gate, but should not be described as exact
schema validation.

## Independent mechanical evidence

### Source

- High contract: **PASS — 13 groups**.
- High browser: **PASS — 18 journeys**.
- Hostile synthetic-live matrix: **PASS — 29 denial cases**.
- Inclusive temporal boundaries: **PASS — 2 admission cases**.
- Independent temporal matrix: **PASS — 8 denial / 2 equality cases**.
- Inline JavaScript: **PASS — 352 scripts / 132 pages**.
- Local links: **PASS — 1,966 references / 110 pages**.
- Town consistency: **PASS**.
- Product steward system: **PASS — 65 products / 2 of 3 active lanes**.

### Newly built exact artifact

- Path: `/tmp/laidies-high-r2-rejudge.DiFEIH`
- Builder: **PASS — 1,082 files / 959.57 MiB**.
- Build report: **0 missing / 0 oversized**.
- Existing internal warning above 750 MiB remains.
- Public metadata: **PASS**.
- High contract: **PASS — 13 groups**.
- High browser: **PASS — 18 journeys**.
- Hostile synthetic-live matrix: **PASS — 29 denial cases**.
- Inclusive temporal boundaries: **PASS — 2 admission cases**.
- Independent temporal matrix: **PASS — 8 denial / 2 equality cases**.

Source/artifact SHA-256 parity:

| Runtime file | SHA-256 |
|---|---|
| `learn/class.html` | `1088df0d2c9f10f547881c7e2530f1ff1c970a8f617b8e571004000f8a832624` |
| `content/site/high-classes.json` | `c675da9f9a86b949f276f8647d43a497b589fdd98c65bb48c5997cbae41adbe3` |
| `content/site/high-learning-ledger.json` | `40e6d310aeb8d8de601b052db297f55776dee53f30f2ff6735ff6ec93719780f` |

## Preserved holds

- instructional-design, assessment-validity, factual/currentness and
  unfamiliar-learner explain-back/transfer review;
- approved narration, real-path capture, imagery, animation, transcript,
  captions, audio description, media QC and owner visual approval;
- representative class and quiz runtime/review-route admission;
- Safari, VoiceOver and native browser zoom;
- Book Fair, reward/account, duplicate/refund/two-device authority;
- privacy-approved analytics and real learning measurement;
- immutable reviewed-content/source-authority strengthening;
- the 959.57 MiB artifact-size release-owner decision;
- deployment identity, clean `/sunnyvaile-high` route, custom 404 and
  public-origin verification.

No clean-route, media, learning, mastery, reward, account, deployment or
public-live claim follows from this bounded PASS.

## Learning scan

**Reusable success:** temporal authorization is now expressed as one
containing-interval invariant and tested at both failing edges, with
single-source mixed-set attacks and equality controls.

**Prevention rule:** every approval window must fit inside every evidence
window that authorizes it; individually valid/current dates are insufficient.

**Behind the Build angle:** “The dates were all valid. This time, the evidence
also covers the whole class.”

The canonical painpoints ledger was not edited because this rejudge was
explicitly report-only.
