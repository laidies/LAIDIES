# Dream Phone Booth operating specification

**Status:** WORKING TWO-TRACK PREVIEW — READY FOR ALI DIRECTION REVIEW

## Identity and purpose

- **Product:** Dream Phone Booth
- **Parent:** SUNNYVAiLE town
- **Type:** building containing a scripted reflection toy and an experimental
  learning game
- **Audience:** adults who enjoy 1990s/Y2K nostalgia and want a short,
  low-stakes judgment/reflection experience
- **User job:** choose between a playful scripted call and a full game that
  rehearses a useful way of working with AI
- **LAiDIES contribution:** make one bounded practical AI judgment memorable:
  a confident answer is not evidence, so split the claim, call more than one
  limited perspective, hold when support is missing and set preventive rules
- **Non-goals:** personalized, professional, medical, legal, financial,
  therapeutic or live fact-checking advice; authoritative current-news
  verification; durable account rewards without proof

## Experience model

- **Metaphor:** a SUNNYVAiLE glass phone booth and town phone directory.
- **Ten-second comprehension:** choose one of two equal doors—Just Call or Play
  the Full Game—and understand the different promise of each before entering.
- **New user:** receives status and boundary before relying on output, chooses
  a track, performs one meaningful action, receives an honest result and can
  return without a trap.
- **Returning user:** is not promised saved callers, history, mastery or
  rewards. A fresh page may reset the session and must say so.
- **Anonymous/signed-in:** no supported difference in this candidate.
- **Accessibility:** complete operation by keyboard, visible focus, sensible
  focus restoration, reduced-motion compliance, no horizontal overflow at
  mobile or 200% zoom, programmatic result announcements and useful link
  names.
- **Failure:** unavailable or malformed content fails honestly with a
  retry/exit path and no invented result.

## Mechanics and rules

### Just Call

- **Input:** caller choice, phone-number Easter egg or remix selection.
- **Core action:** select one of a finite set of prewritten caller bundles.
- **Completion:** a complete scripted reframe appears with its actual caller
  and mode.
- **Output:** playful reflection only; not personalized or professional.
- **Replay:** another caller/remix in the current session.
- **Persistence:** call history and bundle rotation are session memory only.
- **Rewards:** any discovery is session/local-only and has no account,
  cross-device or entitlement value in this candidate.

### Restored multi-caller full-game candidate

- **Input:** select contacts to reveal scripted clues, then commit to a
  verdict.
- **Core action:** compare claim clauses with evidence signals before deciding.
- **Completion:** a committed verdict followed by clause-level feedback,
  evidence source and transfer lesson.
- **Replay:** another admitted deck round; the score is not mastery proof.
- **Admission:** a round is playable only when every adjudicated clause is
  `ADMITTED` in the versioned claim ledger with a primary/official source,
  checked date, recheck rule and correction state. Every ledger date is a real
  `YYYY-MM-DD` Gregorian calendar date interpreted as a UTC date-only value:
  evidence-check and correction dates cannot be later than the verifier's UTC
  day, while review deadlines may be today or later.
- **Failure:** missing, stale, malformed or unadmitted evidence cannot silently
  become playable. Impossible dates, future evidence/correction dates and
  expired review deadlines fail the complete deck closed.

The local working preview restores this model with exactly three normal callers
per case, distributed clause coverage, purposeful phone-code powers, an honest
Hold path, history/Speaker comparison and tailored preventive guidance. Held
source candidates record but do not score the player's choice. The parked
patron-saint deduction engine is not a current public product model and must
not execute on the booth page.

## Content and learning

- **Format job:** short behaviour rehearsal, not reference content.
- **Outcome:** identify which clause lacks support, choose commit versus hold
  and carry one tailored rule/prompt into the next unfamiliar AI claim.
- **Mental model:** fluent confidence is not evidence; one source or caller may
  cover only part of a claim; scope, denominator, date and source can change the
  verdict.
- **Misconceptions to compete:** one confident answer proves the whole claim;
  plausibility equals truth; every unsupported claim must be false; a generic
  “check your work” prompt is enough prevention.
- **Content sensitivity:** every scored factual round and displayed rule remains
  current, bounded and fail-closed under the same freshness system.
- **Analogy:** phone calls make choosing and directing different kinds of help
  memorable; callers do not become authorities merely because they answer.
- **Transfer evidence:** a representative player can apply the selected move
  to an unfamiliar everyday or work situation and explain the human next step.
- **Ecosystem:** durable concepts belong in LIBRAiRY; sequenced teaching in
  High/episodes; timely developments in NewsStand; immediate guidance in
  FAiRY.

## Visual, voice and media

- Current visual direction is the existing booth/phone world only; no new
  asset direction is approved in this packet.
- Voice may be sharp, funny and nostalgic, but comedy must strengthen the
  choice and consequence rather than decorate instructions.
- No unapproved visual, character, background, palette or illustration-style
  substitution is permitted.
- Motion must be functional, stable and disabled/reduced when the user requests
  reduced motion.
- The local preview uses the exact booth as arrival and active frame plus the
  documented 90s colour pops; Ali has not approved completion or release.

## Technical and operational contract

- **Routes:** `/games/dream-phone.html`,
  `/games/dream-phone-game.html`
- **Source:** `games/dream-phone.html`,
  `games/dream-phone-game.html`, `games/dream-phone-bundles.js`
- **Parked source:** `games/dream-phone-game.js`; retained as evidence/source,
  not loaded by the booth.
- **Evidence data:** `games/data/dream-phone-claim-ledger.json`
- **Backend:** none required for the current bounded experiment.
- **Identity:** none.
- **Storage:** current session memory only; storage failure cannot break the
  core journey.
- **Privacy:** do not collect caller text, personal context or claim answers.
- **Reliability:** evidence load fails closed; no success-shaped fallback
  content.
- **Release:** local candidate only unless separately authorized and verified.

## Analytics and customer evidence

- No analytics event is authoritative merely because code emits it.
- Future minimum events: entry shown, track selected, first meaningful action,
  choice committed, consequence viewed, revision/replay, exit and failure
  reason.
- Properties must exclude free text and personal context.
- Success is a useful transferable AI move plus genuine enjoyment, not clicks,
  time or reward collection.
- Plausible/Clarity and customer evidence remain **NOT PULLED** for this
  candidate.
- Weekly freshness/correction triage; monthly journey/accessibility review;
  owner decision before major redesign.

## Dependencies and ownership

- **Parent champion:** Dream Phone champion
- **Subchampion:** Dream Phone Game
- **Guilds:** Learning, Editorial/Accuracy, Safety, Brand, UX, Accessibility,
  Platform Reliability, Analytics/Customer Focus, Release
- **Downstream:** homepage, welcome tour, town directory, Extra Credit/Fun Pack
- **Conflict:** none of those entry points may overrule Dream Phone's status.
- **Freshness owner:** Dream Phone champion with Learning/source admission for
  scored claims, end rules and provider-specific guidance.

## Acceptance and release

- Product quality: useful first action and coherent track purpose.
- Accuracy/trust: every factual statement is supportable and bounded; no broad
  “every fact” promise and no claim that verification is the whole AI skill.
- Brand: independent score at least 17/20 and no generic AI/game wrapper.
- UX/accessibility: new/returning, keyboard/focus, reduced motion, 200% zoom,
  mobile/desktop, storage-failure and unavailable-content tests pass.
- Backend/rewards: no account or cross-device implication.
- Visual/media: existing approved-enough source only; no new visual approval is
  inferred.
- Candidate/release/public verification are separately recorded and never
  conflated.
- **Current status:** WORKING TWO-TRACK PREVIEW; INDEPENDENT VISUAL/UX PASS;
  READY FOR ALI DIRECTION REVIEW; LEGACY PUBLIC EXPERIMENT PRESENT, NOT
  LAUNCH-APPROVED / HIDE OR LABEL.
- **Unresolved product decision:** Ali chooses finish versus park after
  operating the exact working preview.

## Source trail

- `deep-dive-2026-07-25.md`
- `dream-phone-product-model.md`
- `dream-phone-recommendation.md`
- `dream-phone-council-gate.md`
- `dream-phone-content-model.md`
- `dream-phone-product-concepts.md`
- `dream-phone-ux-research.md`
- `dream-phone-asset-direction.md`
- `dream-phone-redesign-plan.md`
- `../LEARNING-CONTENT-STANDARD.md`
- `../../engine/LEDGER.md`, decision D-2026-07-25-045
