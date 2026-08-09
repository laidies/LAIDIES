# Control Room handoff: sitewide published-writing benchmark

Evidence time: `2026-08-09T16:58:19-07:00`

Product/system ID: `learning-content-ecosystem`

Owner task ID: `019f9f7f-9e4c-72d2-8882-447bcbe01691`

Status: `SPECIFIED / SHARED PREVENTION BUILT LOCALLY / IDLE-QUEUED`

Action: Ali ruled that her complete AI Fundamentals 101 Introduction and
canonical Episodes 1–3 jointly define the writing standard for anything
published on LAiDIES. The Writing Lock and learning standard now name the four
exact artifacts. Producer contracts must bind all four before drafting, and
producer/independent exact-prose reviews must calibrate against all four.
Promotional and microcopy classes now use proportional communication design
instead of treating it as not applicable.

Observed result:

- the four registry hashes match the exact current source files;
- omitting any one sitewide benchmark now fails producer admission;
- omitting any one benchmark from exact-prose reviewer calibration now fails
  semantic admission; and
- surface adaptation is explicit: retain the communication strengths without
  copying episode structure, jokes, references or length.

Evidence paths:

- `operations/voice/laidies-writing-lock.md`
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- `operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json`
- `scripts/check-content-producer-contract.mjs`
- `scripts/check-prose-quality-admission.mjs`
- `scripts/test-content-producer-contract.mjs`
- `scripts/test-prose-quality-admission.mjs`
- `scripts/test-content-release-readiness.mjs`
- `operations/DECISIONS.md` (`D-2026-08-09-113`)
- `operations/engine/LEDGER.md` (`D-2026-08-09-113`)
- `operations/painpoints-log.md` (`BTB-466`)

Tests:

- `npm run test:content-prose-quality` — PASS; producer valid 1/rejected
  24/sitewide writing omission rejected; semantic valid 2/hold 1/rejected
  25/sitewide writing omission rejected; release-readiness PASS;
- `node scripts/test-library-book-content-admission.mjs` — PASS;
- `node scripts/check-content-work-orders.mjs` — PASS; ready to dispatch none;
- `node scripts/check-content-release-readiness.mjs --details` — integrity
  valid, release hold 11; and
- `node scripts/check-product-stewards.mjs --owner-entry learning-content-ecosystem`
  — FAIL only on pre-existing expired public daily derivatives and overdue
  `LCR-006`.

Locks/dependencies: dedicated non-iCloud worktree
`/Users/alisoneakin/Projects/laidies-ai-fundamentals-restart`, branch
`task/ai-fundamentals-restart-20260808`. No integration lock used. Every
publishing surface owner must consume the then-current benchmark registry in
its next new or materially revised public-prose contract.

Acceptance owner: each surface's role-distinct exact-prose reviewer, followed
by its existing editorial/Brand/accessibility and release owners. Ali retains
final voice/taste authority.

Remaining proof: no existing public artifact was retrospectively admitted by
this change. Each new or materially revised artifact must bind and pass the
current standard on its own exact bytes.

Next trigger: the next public meaning-bearing prose candidate on any surface
must begin with the four-artifact benchmark contract.

Authority truth: no public prose, book, article, class, episode, route or live
artifact changed; no deploy, publication, spend or implied Ali release
authority was used.

Worktree truth: `UNCOMMITTED_OWNED` pending isolated commit and push.
