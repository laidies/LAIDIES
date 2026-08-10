# Learning System owner handoff — AI Fundamentals 101 R6

**Product/system ID:** `learning-content-ecosystem`

**Owner task ID:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

**Evidence time:** 2026-08-09T18:43:52-07:00

**Status:** BUILT AND VERIFIED LOCALLY — READY FOR ALI DIRECTION REVIEW; NOT ADMITTED

**Worktree truth:** PUSHED

**Task commit:** `508f988e30e0b7074a03792b3b9fe89c1f90b2b6` on `task/ai-fundamentals-restart-20260808`

## Bounded action

Produced and rendered one exact AI Fundamentals 101 direction candidate:
Ali’s author-preserving Introduction plus Chapter 1, `So… what kind of AI are
we talking about?` Two independent artifact-first Claude passes rejected and
repaired the candidate before Ali review. The final exact-byte verdict is
`READY_FOR_ALI_DIRECTION_REVIEW` with no blocking issue.

The rendered page has a white background, readable type and a working sticky
Nerd-O-Meter. Standard hides both optional depth sections; Tell Me More! shows
its section only; Full Nerd Alert! shows both. No CSS-generated image or
diagram exists.

## Exact evidence

- Candidate prose:
  `content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r6.md`
  at SHA-256
  `6525d20e6013ecc4d7bcd6c65b8da15bdc22012e7b4779d6f80fd84871017537`
- Render:
  `content/library-books/pilots/ai-fundamentals-101-v4/rendered/introduction-and-chapter-1-r6.html`
  at SHA-256
  `bc78d37a19dfb6459eb14364040fbd56bfe12895ae7f8d88690d0b0f8599d727`
- Independent review:
  `operations/product-stewards/library/AI-FUNDAMENTALS-101-R6-CLAUDE-RED-TEAM-2026-08-09.md`
- Fresh source packet:
  `operations/product-stewards/library/AI-FUNDAMENTALS-101-INTRO-CH1-R6-SOURCE-PACKET-2026-08-09.json`
- Reusable false-pass calibration:
  `operations/product-stewards/learning-content-ecosystem/quality-exemplars/ai-fundamentals-101-r6-pre-ali-review-known-bad.md`
  registered as `CQX-BAD-012`.

## Verification

- `npm run test:content-prose-quality` — PASS; producer calibration rejected
  24 bypasses, semantic calibration rejected 25, release-readiness calibration
  passed.
- `node scripts/test-library-book-content-admission.mjs` — PASS; one valid and
  six rejected, including the exact Ali-rejected false pass.
- Exact producer-contract and producer self-review integrity — PASS; self-review
  carries no independent quality authority.
- Playwright actual-render test — PASS at 1440px; all three Nerd-O-Meter states
  changed the correct sections and no horizontal overflow occurred.
- Desktop and representative print-page pixel inspection — legible on white;
  no clipping, beige background, CSS diagram or generated image found.
- `jq` and `git diff --check` — PASS.
- Targeted product-steward check did not pass because of pre-existing unrelated
  portfolio state: three expired public daily-learning derivatives and overdue
  `LCR-006`. No R6-scoped defect was reported.

## Dependencies, locks and owners

Consumed Ali’s locked Introduction, canonical Episodes 1–3, the current
section teaching map, source roster/packet, shared prose gate and current
negative registry. The old Stanford HAI AGI visitor page returned a branded
not-found page and was excluded; the packet uses the current 2026 International
AI Safety Report and accessible primary/technical sources.

No integration or release lock was held. Library retains production and reader
experience ownership. Ali is the acceptance owner for voice and teaching
direction only. Formal semantic admission still requires role-distinct review
bound to observed unfamiliar-reader explain-back, transfer and system
reconstruction; Library acceptance and release ownership remain later gates.

## Next trigger

Ali reviews the exact rendered Introduction and Chapter 1. Acceptance permits
Library to continue the same direction into Chapters 2–3; rejection must be
preserved as an exact reusable defect before another successor is produced.

## Authority truth

Ali’s prior authorial, teaching and visual rulings were used. Claude CLI review
used provider credits. No public content, route, deployment, publication,
purchase, spend approval or Ali release authority was used.
