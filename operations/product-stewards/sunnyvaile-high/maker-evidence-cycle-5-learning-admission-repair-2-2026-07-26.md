# Maker evidence — High Cycle 5 learning-admission Repair 2

**Date:** 2026-07-26  
**Status:** **BUILT AND VERIFIED LOCALLY — independent Repair 2 rejudge required**  
**Trigger:** `independent-rejudge-cycle-5-learning-admission-repair-1-2026-07-26.md`
returned 83/100 FAIL because independently current source and class intervals
were not ordered relative to one another.

## Exact bounded repair

`learn/class.html` now returns each source's timestamps from the same strict
UTC `isoDay()` parser already used for class review dates. Every source bound
to an admitted class must satisfy:

```text
source.checkedOn <= class.reviewedOn
class.recheckOn <= source.recheckOn
```

If any one source was first checked after the class review or expires before
the class admission, validation throws before the classroom can render an
admitted review, enable the TV or insert a video.

The comparison is deliberately inclusive. Exact equality at the checked/review
boundary and at the class/source recheck boundary is valid. A one-day gap in
either direction is not.

No class, source, register, quiz, product-state, central registry, queue,
deployment or external service was changed by this repair.

## Expanded hostile and boundary matrix

The prior 25 denial cases remain. Repair 2 adds four relationship attacks:

1. all sources checked after the class review;
2. all sources expiring before the class admission;
3. one violating checked date inside an otherwise valid mixed-source set; and
4. one violating recheck date inside an otherwise valid mixed-source set.

Each attack is individually current and structurally valid. Each now renders
the unavailable recovery, leaves the TV disabled and inserts no video in both
source and the fresh exact artifact.

Two positive semantic boundaries also run in source and artifact:

1. every source interval exactly equals the class interval; and
2. a mixed set exercises left equality, right equality and wider containing
   intervals.

Both remain admitted in the synthetic mechanism-only fixture, proving that the
implementation enforces `<=` rather than accidentally requiring a strict
interior interval.

Malformed, impossible-calendar, future, expired and reversed dates remain in
the denial matrix and continue to fail closed through the same parser.

## Current truth preserved

```text
subjects=4
class rows=37
live rows=0
video rows=0
admitted classes=0
runtime quizzes=0
```

The synthetic admitted fixtures exist only inside the network-denied local
browser tests. No production registry or ledger row was promoted.

## Source verification

```text
SUNNYVAiLE HIGH CONTRACT PASS (13 checks)
SUNNYVAiLE HIGH BROWSER PASS (18 journeys)
29-case hostile admission matrix: PASS
2 inclusive temporal-boundary fixtures: PASS
INLINE JS PASS · 352 scripts / 132 pages
LOCAL LINKS PASS · 1,966 references / 110 pages
CHECK-TOWN PASS
PRODUCT STEWARD SYSTEM PASS · 65 products / 3 active lanes
```

## Fresh exact artifact

```text
Path: /tmp/laidies-high-r2-maker.QRt5nt
Builder: 1,081 files / 959.57 MiB
Builder warning: artifact exceeds 750 MiB
Public metadata validator: PASS
SUNNYVAiLE HIGH BROWSER PASS (18 journeys)
29-case hostile admission matrix: PASS
2 inclusive temporal-boundary fixtures: PASS
Runtime source/artifact byte parity: PASS
```

Matching source/artifact SHA-256:

| Runtime file | SHA-256 |
|---|---|
| `learn/class.html` | `1088df0d2c9f10f547881c7e2530f1ff1c970a8f617b8e571004000f8a832624` |
| `content/site/high-classes.json` | `c675da9f9a86b949f276f8647d43a497b589fdd98c65bb48c5997cbae41adbe3` |
| `content/site/high-learning-ledger.json` | `40e6d310aeb8d8de601b052db297f55776dee53f30f2ff6735ff6ec93719780f` |

## Independent Repair 2 rejudge contract

The independent judge should:

1. inspect the exact source rather than relying on this report;
2. rerun the 13-check contract and 18-journey browser suite against source and
   a newly built exact artifact;
3. recreate both Repair 1 judge fixtures;
4. attack one source inside an otherwise valid multi-source record;
5. verify exact equality at each boundary is admitted;
6. retain malformed, impossible, future, expired and reversed-date attacks;
7. confirm every rejected case has a disabled TV and zero video elements;
8. reproduce the 37/0/0/0 register truth and zero admitted/runtime-quiz truth;
9. preserve the prior judge reports; and
10. make no inference about deployment, public origin or product promotion.

## Preserved holds

- independent Repair 2 acceptance;
- instructional-design, assessment-validity, factual/currentness and
  unfamiliar-learner explain-back/transfer review;
- approved narration, media, transcript, captions and owner visuals;
- real-interface path verification;
- Safari, VoiceOver and native zoom;
- Book Fair, reward and account authority;
- privacy-approved learning analytics;
- the 959.57 MiB artifact-size decision;
- deployment identity, clean `/sunnyvaile-high` route, custom 404 and
  public-origin verification.

No clean-route, media, learning, mastery, reward, account or public-live claim
is accepted by this maker evidence.

## Learning scan

**Failure:** current class and source dates were validated as separate facts,
not as one evidence interval.

**Prevention rule:** approval must be fully contained by every evidence
interval. Test all-sources and single-source violations plus equality at both
boundaries.

**Behind the Build angle:** “The dates were valid. The evidence still ended
too soon.”

The parent release owner should reconcile this rule into the canonical
pain-points ledger. This bounded repair did not edit it.
