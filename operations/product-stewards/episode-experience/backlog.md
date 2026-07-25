# Weekly Episode Experience backlog

**Status:** BUILDING — ranked recommendations from the 2026-07-25 launch deep dive. Nothing below is implementation or public-release approval.

## FIX BEFORE LAUNCH

1. **EPX-001 — Preserve the truthful Screening Room boundary.**
   - Owner: Episode Product Owner + Release QA.
   - Problem: all promoted motion products are on HOLD, while review exports exist locally.
   - Required result: the exact release artifact and public origin keep `EPISODE_FILMS` empty until the media steward's SHA-bound gates pass; all entry points describe the available listen/narrated edition accurately.
   - Retest: article → Chick Flicks → Screening Room at desktop/mobile, then public-origin playback, caption and fallback checks.

2. **EPX-002 — Complete the episode route-state inventory in AW-003.**
   - Owner: Episode Experience steward, coordinated by portfolio orchestrator.
   - Required result: each published episode, trailer and Episode 5 draft has a route/status/primary promise/continuation/failure-state row in the canonical reopening matrix; stale or draft entry points are hidden or labelled.
   - Retest: exact release artifact links plus public-origin route matrix.

3. **EPX-003 — Gate every media promotion through independent full viewing.**
   - Owner: Release QA; narrow dependencies in `../episode-media-quality/cross-episode-repair-queue.md`.
   - Required result: no trailer/Episodes 1–4 film branch is publicly enabled until its exact master has complete normal-speed, full-size, narration/picture/caption, identity/style and public-player proof.
   - Retest: media steward's definition of done per title; then audience route retest.

## HIDE/LABEL FOR LAUNCH

4. **EPX-004 — Keep unreleased Episode 5 a shelf promise, not a journey.**
   - Owner: Episode Product Owner.
   - Evidence: `content/episode-index.json` lists Episode 5 as `draft`, with no issue URL or built page.
   - Required result: no discovery surface presents it as published, playable or completable.

5. **EPX-005 — Label local-only memory correctly.**
   - Owner: Chick Flicks / Identity, Rewards & Connection stewards.
   - Evidence: Chick Flicks stores last rental/favourite in browser local storage.
   - Required result: it must not imply account, cross-device or authoritative episode-completion history.

## POST-LAUNCH EXPERIMENT

6. **EPX-006 — Measure the actual episode funnel before redesigning it.**
   - Owner: Voice of Customer & Analytics guild.
   - Minimum safe evidence: aggregate discovery → article → Screening Room play → linked meaningful action → return; separately track caption fallback/errors and device category. The current `Episode watch` Plausible call fires on play, not completion or learning.
   - Decision rule: low traffic is `INSUFFICIENT EVIDENCE`, not rejection; pair aggregates with privacy-safe Clarity observations and direct feedback.

7. **EPX-007 — Championship: one clear first-session path.**
   - Owner: Portfolio orchestrator.
   - Question: does the next published episode lead with read, listen or a reader-selected fork while preserving the same canon and weekly continuation?
   - Preconditions: exact baseline, safe instrumentation, no unresolved motion-film claims, anonymized proposals and independent UX/brand/editorial review.

8. **EPX-008 — Finish the canon fan-out contract.**
   - Owner: weekly-engine implementation lane.
   - Required result: derive `issue-0N.json` and named rendered surfaces from ruled canon, or prove a deterministic reconciliation gate; do not let hand-authored consumers become a silent fourth source.

## DECLINE

9. **EPX-009 — Decline a fake watch-completion/reward metric.**
   - Reason: neither audio play nor local rental selection proves comprehension, full viewing or transfer. Do not award clips/stamps or announce completion without an explicit, observable and appropriately scoped outcome contract.

## Next review trigger

Run the first post-deep-dive review when the EOD release artifact is frozen and a public-origin candidate exists. It should verify the route inventory and bounded listen-along promise before considering any new episode-experience feature.
