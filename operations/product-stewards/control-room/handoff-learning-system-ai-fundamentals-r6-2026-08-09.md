# Learning System owner handoff — AI Fundamentals 101 R6 layered successor

**Product/system ID:** `learning-content-ecosystem`

**Owner task ID:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

**Evidence time:** 2026-08-10T12:30:46-07:00

**Status:** BUILT AND VERIFIED LOCALLY — BLIND SEMANTIC PASS — READY FOR ALI DIRECTION REVIEW; FORMAL ADMISSION HOLD

**Worktree truth:** PUSHED

**Implementation commit:** `fc0210add89e9025ce9d2222393380200baca5ab` on `task/ai-fundamentals-restart-20260808`

## Bounded action

Rebuilt the exact Introduction and Chapter 1 candidate as a logically ordered,
layered 101 textbook experience. Standard now supplies the complete non-technical
lesson, example and practical importance for every chapter concept. Tell Me More
and Full Nerd Alert deepen the same concept where it appears instead of becoming
detached technical appendices. The chapter now uses one customer-service system
to connect AI, model, system, product, jobs, information, operation, physical
presence, capability breadth and construction method.

Ali's three numbered Introduction reason headings now lead with the concrete
reader benefit and preserve her authored comic from/to progression after a
colon. D-2026-08-10-117 binds this order and the builder rejects a candidate
that drops or reverses either half.

The render uses a white reading surface, a clear heading hierarchy, readable
measure and spacing, a page-persistent Nerd-O-Meter, and purpose-specific
1990s-textbook-style hard-shadow boxes for definitions, examples, practical
stakes and optional depth. CSS controls layout only; the sole diagram is an
external deterministic SVG.

## Exact evidence

- Candidate prose:
  `content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r6.md`
  — SHA-256 `d59672d62c21224f147951b59bb24fa597d0c5ccc2dd4cd4bcbc59e167046564`
- Render:
  `content/library-books/pilots/ai-fundamentals-101-v4/rendered/introduction-and-chapter-1-r6.html`
  — SHA-256 `790278ee8b1503558f7a976fee3fed37be28701390548e8be1aefd3aecbf7c46`
- Artifact manifest:
  `content/library-books/pilots/ai-fundamentals-101-v4/r6-artifact-manifest.json`
  — SHA-256 `e24de3101434609c63d254d0101a5ce1ee3fa6ce11913570a4701254ed6162d8`
- Fresh independent cold review:
  `operations/product-stewards/library/AI-FUNDAMENTALS-101-R6-BLIND-SEMANTIC-REVIEWS-2026-08-10.md`
  — SHA-256 `dddd288bc8f69e22a87dea4dc49ffea23b5c88ee27eb59591459e765c6fbd275`
  — Claude Opus 5 session `628de2ab-7101-4371-a2a2-36f16f9daccb`; exact-prose verdict `PASS`; `SEND_TO_ALI: YES`; no blocking defects. The reviewer specifically confirmed all three benefit-first headings are parallel, readable and earned by their sections.
- Textbook/readability research and decisions:
  `operations/product-stewards/library/AI-FUNDAMENTALS-101-LAYERED-TEXTBOOK-RESEARCH-2026-08-10.md`
- Reusable false-pass calibration:
  `operations/product-stewards/learning-content-ecosystem/quality-exemplars/ai-fundamentals-r6-ali-flow-known-bad.md`
  registered as `CQX-BAD-013`.
- Layout screenshots:
  `content/library-books/pilots/ai-fundamentals-101-v4/rendered/qa/`.
  These prove earlier layout states only and predate the final prose bytes; they
  are not claimed as current exact-render semantic or visual admission.

## Verification

- `npm run test:content-prose-quality` — PASS; producer calibration rejected 24
  bypasses, semantic calibration rejected 25, and release-readiness calibration
  passed.
- `npm run test:visual-media-quality` — PASS; producer calibration rejected 14
  and admission calibration rejected 17.
- `node scripts/check-content-work-orders.mjs` — PASS; `ready_to_dispatch=none`.
- `node scripts/check-content-release-readiness.mjs --details` — integrity valid;
  RELEASE HOLD; 11 held.
- Builder assertions — PASS for depth placement, concept-specific Standard
  examples and importance, definition tiers, sticky controls, external SVG and
  exact benefit-first Introduction headings.
- Heading-order known-bad calibration — PASS: the fixture that leads with the
  joke and omits the useful reason was rejected with exit 1.
- Exact producer-contract, self-review and manifest integrity — MATCH. Producer
  self-review carries no independent quality authority.
- Fresh artifact-first cold semantic review — PASS on exact prose SHA above.
- `jq`, `git diff --check`, staged diff inspection and push — PASS.
- `node scripts/check-product-stewards.mjs --owner-entry learning-content-ecosystem`
  did not pass because of unrelated current portfolio state: three expired
  public daily-learning derivatives and overdue `LCR-006`. No candidate-scoped
  defect was reported.

## Observed versus unproved

Observed: exact prose integrity, build structure, calibrated shared checkers,
independent semantic PASS, source/render/manifest identity, clean task-owned
commit and remote push.

Unproved: the in-app browser blocked local `file://` access during the final
exact-byte pixel check. Earlier desktop/mobile screenshots show the layout
direction but do not prove the final prose render. Formal visual admission,
unfamiliar-reader explain-back/transfer, Library admission, deployment and
public behaviour remain unproved and held.

## Dependencies, locks and downstream owners

Consumed Ali's authored Introduction as the writing standard, Episodes 1–3,
the canonical teaching map, source packet, current shared prose gate, current
negative registry, Hannah Fry communication mechanics, and primary textbook,
accessibility and AI-definition sources. No integration or release lock was
held; all writes occurred in the dedicated non-iCloud worktree.

Learning System owns the concept sequence and reusable producer/review rules.
Library retains book production, reader experience and formal admission.
NewsStand, Classes and Episodes are not changed by this candidate.

## Acceptance owner and next trigger

Ali is the acceptance owner for this exact direction: voice, teaching flow,
layered depth and textbook presentation. The requested decision is direction
only, not publication. If accepted, Library may apply the same lesson architecture
to Chapters 2–3. Any rejection must become an exact reusable defect before a
successor is drafted. Formal semantic, unfamiliar-reader and visual admission
remain later role-distinct gates.

## Authority truth

Ali's prior authorial, teaching and visual rulings were used. Claude CLI review
used provider credits already available to the task. No public content, route,
deployment, publication, purchase, new spend approval or Ali release authority
was used.
