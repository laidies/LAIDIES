# Learning System owner handoff — AI Fundamentals 101 Chapter 1 successor 15

**Product/system ID:** `learning-content-ecosystem`

**Owner task ID:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

**Evidence time:** 2026-08-10T14:30:11-07:00

**Status:** BUILT AND PRODUCER-REVIEWED LOCALLY — READY FOR ALI DIRECTION REVIEW; INDEPENDENT ADMISSION HOLD

**Worktree truth at evidence time:** implementation committed locally; handoff commit and push verification pending

**Implementation commit:** `ac59839a` on `task/ai-fundamentals-restart-20260808`

## Action and visible result

Rebuilt the Introduction and Chapter 1 direction candidate around the reader’s
actual confusion. The chapter now begins with familiar AI products and one
complete customer-service system before it introduces six organising
questions. It explicitly separates labels that overlap in one product from the
one genuine construction family: AI contains machine learning, which contains
neural networks, which contains deep learning.

The six chapter headings now predict their contents and are direct jump links.
Standard teaches every major type with plain meaning, a concrete example,
relationship and practical significance. Tell Me More and Full Nerd Alert sit
inside the same concept module and deepen its actual mechanism. Key Definitions
contains the 18 load-bearing Chapter 1 terms; the complete book Concept Index
remains a separate required route.

The rejected dress analogy is absent. The replacement is a deterministic SVG
that shows the six different questions and the genuine construction nesting.
It contains no CSS or generated lettering, is checksum-bound in the artifact
manifest and was maker-inspected at its native 1400×2180 resolution. It links
to a full-size view from the book.

## Exact evidence

- Prose: `content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r6.md` — `e7708c4fbc582e9b2469b34c1b5b2238286e9a63854395a9e7737c008034ec6f`
- Figure: `content/library-books/pilots/ai-fundamentals-101-v4/assets/chapter-1-how-ai-types-fit-together.svg` — `b0734e2e8a28a946ee71b9713b64448525db640fbf44209da4f8f4570e7a32af`
- Render: `content/library-books/pilots/ai-fundamentals-101-v4/rendered/introduction-and-chapter-1-r6.html` — `53a6164a807b8b16b4aab673d886d1affc853b9e34a9ba7cd4ecf7664ab4e5f8`
- Manifest: `content/library-books/pilots/ai-fundamentals-101-v4/r6-artifact-manifest.json` — `ce1cf97efe5b3e8cf61a48bcaa8256a216830f5bf1abac8adcfa5ae6c2ca880b`
- Producer review: `content/library-books/pilots/ai-fundamentals-101-v4/r6-producer-self-review.json` — `e8837cf4ae44b60d713c794c251c8dd4fef513e279d4ffa31ba1a3c53ac72e0e`; verdict `PASS`, quality authority `NONE`
- Teaching map: `operations/product-stewards/library/AI-FUNDAMENTALS-101-V4-SECTION-TEACHING-MAP.json` — `63ebefe0cc9ae9843d4d93de9f688a18e484701df18f35a82fbb15715c81b31f`
- Producer contract: `operations/product-stewards/library/AI-FUNDAMENTALS-101-V4-OPENING-PRODUCER-CONTRACT.json` — `49069b19c60b16322b804dedb67f359d0976bbbda59d82ac6dac4afe3ec5ae8d`

## Tests

- `npm run test:content-prose-quality` — PASS; shared producer, prose and release calibrations pass; beginner-language known bad rejected; teaching-map subset omission rejected.
- `node scripts/check-ai-fundamentals-teaching-map.mjs` — PASS; `standard_contracts=14`.
- `node scripts/test-ai-fundamentals-teaching-map.mjs` — PASS; `valid=14 rejected_subset=1`.
- Producer contract checker — integrity match, `READY_TO_DRAFT`, quality authority none.
- Exact producer review checker — integrity match, verdict PASS, quality authority none.
- Chapter-anchor check — PASS, six jump targets resolve.
- `npm run test:visual-media-quality` — PASS; producer known-bad calibration rejected 14 and visual-admission calibration rejected 17.
- `node scripts/check-content-work-orders.mjs` — PASS; `ready_to_dispatch=none`.
- `git diff --check` — PASS before implementation commit.
- `node scripts/check-product-stewards.mjs --owner-entry learning-content-ecosystem` — FAIL only on pre-existing portfolio state: three expired public daily-learning derivatives and overdue `LCR-006`; no candidate-scoped defect reported.

## Locks, dependencies and unproved work

No integration or release lock was used. Writes stayed in the dedicated
non-iCloud task worktree. The candidate consumes Ali’s authored Introduction,
Episodes 1–3, the current teaching map, primary factual sources, the Hannah Fry
communication benchmark and all registered known-bad prose families.

The in-app browser policy blocked inspection of the local `file://` page, so no
current full-page pixel PASS is claimed. Earlier screenshots and earlier blind
semantic reviews bind older bytes and do not transfer. Claude CLI itself was
available, but two bounded attempts to audit the full current chapter produced
no review text and were stopped. This is recorded as unavailable evidence, not
an independent HOLD or PASS.

## Acceptance owner and next trigger

Ali is the acceptance owner for the direction: voice, learning flow, concept
relationships, Nerd-O-Meter depth and textbook presentation. The next trigger
is Ali’s review of the exact render above. Acceptance is direction only. Formal
Library production still requires a fresh role-distinct semantic review,
observed unfamiliar-reader explain-back/transfer and exact rendered visual
admission before release.

## Authority truth

No public content, route, deployment, publication, purchase, new spend or Ali
release authority was used. Classes, NewsStand, Episodes and the existing
Library reader were not edited. Claude CLI used already-available provider
credits; it returned no audit result for the current bytes.
