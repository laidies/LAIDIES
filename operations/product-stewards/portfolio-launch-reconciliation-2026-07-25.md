# Product Stewardship pilot — portfolio launch reconciliation

**Date:** 2026-07-25
**Status:** REPORT READY — findings reconciled; fixes, persistent runner,
analytics pulls and scheduled cadence are not yet implemented
**Relationship to active work:** MERGE with AW-003 whole-site reopening QA
**Decision owner:** Ali for public-product and mission choices; portfolio
orchestrator for evidence, sequencing and verification

## Portfolio ruling

The first product-steward pilot has already justified narrow ownership. Four
different product surfaces produced different launch-critical failures that a
broad weekly agent could easily blur together:

- FAiRY Godmother has a promising branded drafting job, but its live service
  has failed factuality and safety tests, the frontend cannot distinguish a
  usable answer from a friendly failure, and the usable FAiRY Plays economy is
  not wired.
- Girl Talk has an appealing private reflection ritual, but its promoted
  community/reward chain treats a click as completed action and cannot verify
  the promised post, persistence or reward.
- Dream Phone is publicly live despite canonical records saying it was parked
  and unapproved. Its strongest utility and strongest game are different
  products, and the fact-checking game does not yet meet its own evidence
  standard.
- Trailer and Episodes 1–4 have exact review candidates, but none may be
  released as a motion film until the final rendered picture is checked
  against the narration clock, canon, captions and meaningful-motion brief.
  Public `watch.html` is currently honest: it keeps the motion-film map empty.

These are not four isolated polish lists. They reveal shared platform and
operating failures: rules exist without enforcement, click events are mistaken
for outcomes, local state is mistaken for durable state, production bytes can
contradict canonical decisions, and a successful export can be mistaken for a
reviewed experience.

No reviewed product clears the Product Championship launch floor yet. There is
therefore no champion to implement or promote from this first wave.

## Non-compensable relaunch gates

Every product must score at least 17/20 in each of these dimensions:

1. product/content quality and real user value;
2. factual/technical accuracy, safety and trust; and
3. positive contribution to the LAiDIES brand.

These dimensions carry 60/100 of the shared score. Revenue, novelty,
engagement or technical completion cannot compensate for a miss. A product
with an automatic disqualifier is ineligible regardless of its total.

## Launch-critical portfolio queue

### P0 — fix or make the public promise smaller before relaunch

| Order | Product / system | Required decision or repair | Evidence needed to close | Narrow owner |
|---:|---|---|---|---|
| 1 | Public promise registry | Reconcile canonical status, public route, homepage promotion and actual backend availability for every promoted product. Dream Phone is the proved first conflict. | Public bytes, route screenshots, canonical decision and release record agree. | Portfolio Orchestrator + Release QA |
| 2 | FAiRY Godmother | Recover/version the deployed service; add domain/risk routing, sourced-or-declined factuality, safety boundaries, typed outcomes, timeout/input limits and no-charge failure handling. | Staging and public journey tests across drafting, current facts, medical boundary, malformed response, timeout, duplicate and refund cases. | FAiRY Steward + AI Accuracy/Safety + Backend |
| 3 | Shared identity/reward economy | Create one authoritative grant/display/reserve/spend/refund ledger. Remove local email and local-storage achievements as proof of entitlement. | One completion ID survives duplicate, retry, sign-in, new device, two-tab last-balance and refund tests. | Identity, Rewards & Connection Steward |
| 4 | Girl Talk | Choose the honest primary job. Either launch as private self-report with local honour-system language, or wire a supported post-confirmation event before certifying community completion or issuing a durable reward. | New, return, skipped, blocked-popup, unauthenticated, rejected-post, duplicate and reward-retry journeys. | Girl Talk Steward + Community Safety |
| 5 | Dream Phone | Reconcile parked-versus-live status; label or remove primary promotion; choose one canonical game model; correct evidence/source standards before any learning claim. | Approved product ruling, source manifest, primary-source review and rendered desktop/mobile journey pass. | Dream Phone Steward + Learning/Accuracy |
| 6 | Trailer and Episodes 1–4 | Complete independent SHA-bound frame/sequence/audio/caption review. Replace any wrong person, background, style, semantic beat, late cut or camera-drift-as-motion failure. | Narration-to-visual verdict at every cue, full normal-speed watch, caption/audio sync, desktop/mobile public playback and final public bytes. | Episode Media Quality Crew |

### Shared infrastructure that removes repeat failures

1. **Public promise registry:** route, promise, canonical status, authoritative
   source, service dependency, release SHA and rollback owner.
2. **Completion-event contract:** intent, attempt, authoritative completion,
   visible result, persistence, reward, retry/refund and duplicate handling.
3. **Rule-enforcement registry:** canonical rule, production stage, trigger,
   deterministic check or independent judge, required artifact, failure owner
   and retest. A prose-only rule is labelled **NOT ENFORCED**.
4. **Versioned source/service registry:** public frontend, Worker/API source,
   environment, deploy record, health check and rollback.
5. **Privacy-safe product event dictionary:** one definition per event and
   product version; no prompts, workplace details, names or raw community
   content in analytics.
6. **Evidence store:** screenshots, hashes, logs, matrices, evaluation results,
   decisions and public verification—not confident summaries.

## Analytics is a specialist input, not an autonomous judge

Plausible should identify discoverability, funnels, exits, return and
conversion from privacy-safe aggregate events. Microsoft Clarity should be
used for sampled interaction evidence such as dead clicks, rage clicks,
confusing scroll and broken responsive states, subject to consent and privacy
rules. Neither should collect product prompts, private work situations,
community text or other sensitive content.

The Voice of the Customer & Analytics guild produces a weekly evidence packet;
it does not optimize products directly. Each packet must state the product
version, date range, event definitions, sample size, known instrumentation
gaps and what is observation versus inference. A product steward then forms a
hypothesis; a championship or bounded test evaluates the change. No event
dictionary or current aggregate pull was available in this pilot, so no
analytics-based conclusion is claimed.

## What the competition should do next

Competition begins only after the P0 truth/safety floors are restored. For
each eligible product:

1. the incumbent proposes the smallest high-quality improvement;
2. two challengers produce materially different approaches;
3. a red team tries to disprove them;
4. a neutral judge sees anonymized candidates and applies the shared
   scorecard;
5. the orchestrator chooses a bounded experiment or identifies the missing
   evidence; and
6. Ali rules only where mission, taste or a consequential public choice
   remains.

For episode media, competition is earlier and narrower: storyboard direction,
one hero frame and one difficult representative motion shot. Once those win,
the production crew executes consistently. Competing full episode batches
would multiply cost and continuity drift.

## Operating cadence

- **Now through relaunch:** launch-truth reconciliation, P0 repair, independent
  evidence and explicit hold/hide/label decisions.
- **Every episode week:** episode owner opens the cue manifest; specialist
  makers and independent judges run at their production gates; Release QA
  watches the complete public result.
- **Weekly per active product:** evidence packet, incident/feedback review,
  one priority decision and verified backlog update. No compulsory feature
  churn.
- **Monthly:** one bounded Product Championship for products whose evidence
  justifies change.
- **Quarterly:** portfolio fit, product retirement/merger, freshness,
  cost/revenue and brand contribution review.
- **On trigger:** safety incident, factual correction, broken integration,
  public/canon drift, user-harm signal or major dependency change immediately
  reopens the relevant gate.

## Honest system status

| Component | Status |
|---|---|
| Stewardship architecture, roles, scorecard and cadence | **SPECIFIED** |
| First-wave steward dossiers (FAiRY, Girl Talk, Dream Phone, episode media) | **REPORT READY** |
| Persistent steward state in canonical folders | **PARTIAL** — initial dossiers exist |
| Product Championship runner and anonymized judging workflow | **PLANNED / NOT WIRED** |
| Plausible and Clarity evidence pulls | **PLANNED / NOT WIRED** |
| Trigger scheduler, notifications and recurring weekly execution | **PLANNED / NOT WIRED** |
| P0 product and shared-platform repairs | **NOT STARTED by this pilot** |
| Relaunch approval for the four reviewed product groups | **NOT GRANTED** |

The pilot is therefore evidence of a useful operating design, not evidence of
an autonomous agent organization already running.
