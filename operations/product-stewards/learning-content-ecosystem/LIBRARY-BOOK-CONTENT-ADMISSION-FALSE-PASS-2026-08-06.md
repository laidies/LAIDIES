# LIBRAiRY substantial-book content admission — false-pass correction

**Evidence time:** 2026-08-06 17:02 PDT
**Status:** INCIDENT CONFIRMED / PASS VERDICTS INVALID / SHARED CONTRACT IMPLEMENTED
**Owner boundary:** Learning System defines the cross-book learning contract;
LIBRAiRY owns book repair, renderer/admission implementation and exact book
readmission. This record does not edit, admit, deploy or publish a book.

## Decision

The current opening-book admission can verify identities, hashes, fixed phrases
and self-recorded `PASS` values while failing the active book architecture.
Concepts 101 is the clearest failure, but Briefing 101, Setup 101 and Accounts
101 show the same blind spot. Their current local content verdicts cannot be
used as evidence of compliance with the book standard.

The smallest safe correction is not another Concepts-specific phrase list. It
is one proportional substantial-book contract with:

1. a complete, renderable canonical source;
2. deterministic source-to-artifact derivation;
3. a mechanically valid reader route and evidence/correction bindings; and
4. independent artifact-first judgment of comprehension and heading quality.

## Verified incident evidence

| Book | Observed rendered SHA-256 | False-pass family |
|---|---|---|
| Concepts 101 | `74f08314fb98672ce5f247eaf7db16fb6beeffa3f08f0572ed562818d92b602c` | Canonical source is a six-section outline, not the full book body; rendered prose is not reproducibly derived from it; the checker protects fixed counts, phrases and term order instead of the reader architecture. |
| Briefing 101 | `4a22f431b60902d249827395c69bb11fa3aaf18a4352d18cb1c4765c0c7904d9` | Opens with a definition/procedure rather than the reader's human job and has no labelled contents/anchor route. |
| Setup 101 | `44a287ff32d3e041870bd477da99e0edda55a36d04b7a1725656552e89db348b` | Has no contents route; headings such as “What stays true” do not predict the concept family or answer; promised continuations are labels, not actionable destinations. |
| Accounts 101 | `9b2bf286ea8dbb560ba3154aee41ab12848a913fd4b8708eba1dc4c35e4bd1d6` | Has no contents route; “maintained tool cards may route you there” is not an actionable continuation. |

At the evidence time, `node scripts/check-concepts-101-claims.mjs` returned
`PASS`. Its calibration removes only the exact causal-map sentence. It does not
calibrate missing reader job, source/body derivation, contents, answer-predictive
headings, section-level mechanism/distinction/action, or actionable
continuation.

A temporary negative fixture then removed the complete “Start with the question
you actually have” route, replaced it with `Internal route placeholder`, and
updated only the integrity hash in the claims ledger. The unchanged checker
still returned:

```text
CONCEPTS 101 CONTENT PASS · sections=6 terms=17 claims=6 sha256=f03a27863978387d3493be33519e890e0d66bceecde31ba0e4bfd9f8bcdb09e4
```

This is a calibrated false pass: the exact reader route disappeared and the
gate remained green.

`scripts/compile-library-admission.mjs` verifies receipt hashes and requires
literal `PASS` values. It does not prove that the receipt's claims are true. Its
canonical-source metadata check is optional and it does not rerender a book
from the declared source.

## Minimum fail-capable contract

### 1. Canonical source is the complete production source

For a substantial explanatory book, the canonical source must contain the full
reader-facing body or complete structured content blocks from which the full
body is generated. A synopsis, section outline, architecture memo, claims
ledger or rendered HTML edited separately is not the canonical production
source.

The source declares:

- stable book/content version and reader job;
- early plain answer and mechanism;
- ordered, stable section IDs with reader-visible titles and jump labels;
- the distinctions/failure points, concrete explanatory device and useful
  action applicable to this book;
- analogy and limit when an analogy is used;
- claim/source/currentness/correction bindings; and
- a genuinely useful exact continuation, or an explicit reason continuation is
  not applicable.

This is proportional. It does **not** impose a universal word count, section
count, recurring case, analogy, quick-reference term list, class exercise or
continuation link.

### 2. Rendered book must be mechanically derived

Every substantial book has one declared render command. A clean render in a
temporary directory must reproduce the candidate artifact bytes, or a declared
normalized semantic-body digest when a separately governed wrapper adds
non-content bytes.

The rendered artifact must always carry:

- canonical source path and SHA-256;
- content version;
- renderer version;
- stable section IDs; and
- a source-block-to-rendered-locator map.

Admission fails on manual rendered prose, an outline-only source, absent
metadata, source/hash drift, orphan rendered sections or source blocks that do
not reach the artifact.

### 3. Reader route must work as a route

Every substantial book requires a visible labelled contents route before the
main body. Mechanically:

- every contents link targets one unique existing section ID;
- every governed source section appears exactly once in the contents and body;
- jump labels and headings are drawn from the source, not maintained separately;
- no required section is unreachable; and
- a promised continuation resolves to one exact current destination/action
  with owner and availability state.

An independent unfamiliar-reader judge—not a keyword validator—decides whether
the reader job is clear before definitions begin and whether each contents
label/heading lets a newcomer predict the concept family or answer behind it.

### 4. Architecture evidence must contain locators, not verdict words

Each applicable book-standard criterion records:

- `PASS`, `HOLD` or justified `NOT_APPLICABLE`;
- canonical source block IDs;
- rendered section/element locators;
- the exact evidence or reviewer observation; and
- the artifact/source hashes reviewed.

A bare `PASS`, score, nonempty path or shared four-book prose verdict is not
admission evidence. Any changed source, renderer, claims record or artifact
invalidates the affected evidence.

### 5. Independent artifact-first judgment remains required

After mechanical failures are removed, an unfamiliar-reader reviewer receives
the exact rendered book and the governing standard before maker receipts. The
review must be able to hold the book when a newcomer cannot:

1. state why she would open it;
2. find the relevant concept or answer from the contents alone;
3. explain the plain mechanism rather than repeat labels;
4. distinguish the named adjacent ideas and failure points;
5. follow the concrete case/evidence where abstraction needs it;
6. choose the useful action;
7. find currentness, sources and correction information; and
8. follow an exact continuation when the book promises one.

## Required calibration before this gate may be trusted

The replacement test must first reject, as immutable known-bad fixtures, the
four hashes listed above for their named failures. It must also reject a
synthetic candidate whose hashes and fixed phrases are updated after:

1. removing the full canonical body while preserving a six-section outline;
2. removing the labelled contents route;
3. replacing answer-predictive headings with internal drafting labels;
4. deleting one section's mechanism/distinction/action while preserving its
   heading and global phrases; and
5. replacing an exact continuation with “a resource may route you there.”

One valid proportional fixture must pass without relying on a fixed section,
word, analogy, example or vocabulary count. Only then may the gate be wired
into production admission.

## Implemented paths and commands

LIBRAiRY implemented the shared boundary before another Concepts rewrite:

- `content/library-books/library-book.source.schema.json` — proportional
  renderable-source contract;
- `scripts/render-library-book.mjs` — deterministic renderer;
- `scripts/check-library-book-content-admission.mjs` — shared mechanical gate;
- `scripts/test-library-book-content-admission.mjs` — calibrated bad/good
  fixtures;
- `content/library-books/rejected-artifacts.json` — immutable exact rejected
  artifacts, including Ali's rejected `.5` successor;
- `operations/product-stewards/learning-content-ecosystem/library-book-cold-reader-review.schema.json`
  — required observed-outcome receipt;
- `scripts/compile-library-admission.mjs` — require the shared gate result and
  mandatory source/render binding before `available` enters the compiled map.

Commands:

```text
node scripts/test-library-book-content-admission.mjs
node scripts/check-library-book-content-admission.mjs --book concepts-101
node scripts/check-library-book-content-admission.mjs --book briefing-101
node scripts/check-library-book-content-admission.mjs --book setup-101
node scripts/check-library-book-content-admission.mjs --book accounts-101
node scripts/compile-library-admission.mjs --check
node scripts/test-library-opening-books.cjs
```

The shared checker owns structural and derivation invariants. Per-book claim
validators may retain claim-specific safety/currentness assertions, but must
not impersonate learning-quality review through fixed phrases, counts or one
book's exact architecture.

## Acceptance boundary and next trigger

The compiler now requires the v2 learning-admission contract, complete canonical
source binding and observed cold-reader outcome before any book can become
available. Concepts 101 `.5` is quarantined. Setup 101 and Accounts 101 were
demoted to HOLD because their earlier shared receipts did not contain observed
learner outcomes. Briefing 101 and How to Check remain HOLD. No book source,
reader fragment, Library visual, deployment or public route was changed by this
system correction.

Readmission requires the calibrated shared gate, new artifact bytes, fresh
artifact-first cold-reader evidence and the existing exact reader journey.
Deploy/public verification remains separate.
