# Shared prose-quality prevention and ratchet

**Status:** BUILT LOCALLY — shared gate active; surface adoption open
**Owner:** Learning System & Concepts Director
**Owner task:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`
**Initial evidence time:** 2026-08-07T06:39:43-07:00
**Adversarial repair evidence time:** 2026-08-07T06:55:01-07:00

## Reader outcome

Every LAiDIES explanation must give an adult newcomer a connected, accurate and
useful mental model: what is happening, how the parts work together, how she
meets it in daily life, what she can do with that understanding and where the
claim may change. The prose should make learning engaging and enjoyable and
earn an “Oh, I get it now.” Humour and LAiDIES/Rewind Era analogies are welcome
only when they perform a precise teaching job; decorative references fail.

## Prevention before review

Before drafting, the producer binds:

1. the reader's question, prior knowledge, payoff and surface job;
2. canonical truth, source identity and freshness triggers;
3. one relevant positive LAiDIES exemplar and the useful patterns it provides;
4. every registered known-bad failure, all cleared before production;
5. the causal sequence, worked daily-life case, different transfer case and
   useful action; and
6. the mapping, limit and lesson job of any analogy or humour.

`scripts/check-content-producer-contract.mjs` checks this record before a work
order can dispatch. The producer then reads the exact checksum-bound prose in
full and records `PRODUCER_SELF_REVIEW`. Known or objective defects keep the
candidate inside production. Only then may a different reviewer record
`INDEPENDENT_SEMANTIC_ADMISSION` against the same exact bytes.

The contract binds the exact current exemplar/defect registry SHA and must
consume every registered negative exemplar. A new verified failure therefore
invalidates older unstarted contracts instead of sitting unread below the first
registry entry. Every defect disposition also records prevention evidence, not
only a prose promise.

## Exact-prose admission

`scripts/check-prose-quality-admission.mjs` requires artifact excerpts and
reader outcomes for plain clarity, reader value, connected system, daily-life
interaction, explain-back, unseen transfer, useful action, LAiDIES voice,
engagement, factual integrity, freshness reviewability and surface fit. It
rejects disconnected glossary accumulation, template repetition, decorative
analogy, reference confetti, missing mechanism, generic action, jargon before
meaning, factless confidence, stale claims, corporate sludge and joyless
instruction.

Receipt-only checks may report integrity but have no prose-quality authority.
The shared release check requires the producer contract, producer exact-prose
review and independent semantic admission in addition to each surface's own
accuracy, experience and medium-specific gates.

Identity is one chain: the content artifact manifest names the exact reviewed
prose and rendered derivative; producer and independent reviews must match each
other; and their manifest path/SHA must match the work order's release binding.
A clean decoy draft can no longer approve different release bytes. Reviewer
calibration is tied to the same reviewer principal and must predate the
candidate review. Explain-back/transfer evidence is checksum-bound, and every
material claim maps a candidate excerpt to a source excerpt with scope and
freshness.

## Durable learning loop

Every verified rejection adds the smallest reusable failure to
`content-quality-exemplars.json` and repairs the producer contract/check before
a successor is commissioned. Positive exemplars are checksum-bound and their
authority is limited: Episode 01 supplies voice/teaching patterns, Straight
Answers supplies answer/currentness/action architecture, and the admitted
NewsStand example supplies mechanism/scope/limit/action. None is proof of
current publication or a template to copy.

Ratchet targets:

- repeated known defects: 0;
- objective defects first discovered at review: 0;
- total review issues: lower than the preceding comparable candidate; and
- review cycles: lower until first-pass acceptance is normal.

## Verified calibration

- `node scripts/test-content-producer-contract.mjs` — one valid contract,
  seven rejected bypasses, including stale-registry and omitted-later-failure
  cases.
- `node scripts/test-prose-quality-admission.mjs` — one valid teaching
  artifact, one hold and thirteen rejected false passes; exact known-bad,
  manifest decoy, stale registry, unbound observation, reviewer mismatch,
  unrelated source and flat-ratchet cases are rejected.
- `node scripts/test-content-release-readiness.mjs` — strict release path
  requires both records and holds missing/mismatched evidence.
- `node scripts/check-content-work-orders.mjs` — zero current orders eligible
  to dispatch without a producer contract.
- `node scripts/check-content-release-readiness.mjs --details` — all current
  work orders remain held.
- `node scripts/check-content-release-readiness.mjs --require-id <work-order>`
  — a real release/promotion path can require its exact work order rather than
  relying on an aggregate count.

## Ownership and boundaries

Learning System owns this shared contract, exemplar/defect registry and
cross-surface calibration. Destination owners own their actual content and
medium-specific proof: Library books, Classes, Weekly Episodes, NewsStand,
Study Packs/quizzes, tools/games, FAQ, social and interface copy. This work did
not rewrite an episode, class, book or article; it did not deploy, publish,
spend or use Ali's release authority.
