# Dream Phone Booth operating specification

**Status:** TWO-TRACK PRODUCT DIRECTION SELECTED — FULL-GAME MECHANIC OPEN

## Identity and purpose

- **Product:** Dream Phone Booth
- **Parent:** SUNNYVAiLE town
- **Type:** building containing a scripted reflection toy and an experimental
  learning game
- **Audience:** adults who enjoy 1990s/Y2K nostalgia and want a short,
  low-stakes judgment/reflection experience
- **User job:** choose between a playful scripted call and a full game that
  rehearses a useful way of working with AI
- **LAiDIES contribution:** make broader practical AI judgment memorable
  through a distinctive phone-booth object, meaningful choices and humour
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

### Retired claim-deck experiment

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

This claim deck is preserved as historical experiment and technical evidence;
it is not the selected full-game direction. The parked patron-saint deduction
engine is also not a current public product model and must not execute on the
booth page.

### Selected full-game learning territory

- **Premise:** broader practical AI judgment, not receipts or claim
  verification.
- **Candidate learner moves:** choose the kind of help needed, ask well, notice
  what the response enables or misses, improve the exchange and decide the
  human next move.
- **Required game qualities:** meaningful choice, consequence, feedback,
  replay, usefulness and comedy that belongs to the mechanic.
- **Still open:** exact fantasy, rules, caller roles, progression, payoff and
  replay structure. These may not be inferred from the retired deck or an
  older proposal.

## Content and learning

- **Format job:** short behaviour rehearsal, not reference content.
- **Outcome:** use AI more deliberately across a broader practical situation;
  the exact transferable outcome will bind to the selected new mechanic.
- **Mental model:** different AI situations call for different kinds of help,
  context, iteration and human judgment; no single prompting move or AI role
  fits every job.
- **Misconceptions to compete:** the first answer is the finished answer; more
  instructions always make a better prompt; AI should make the human decision;
  one tool or interaction style fits every task.
- **Content sensitivity:** factual situations remain current and bounded, but
  source verification is a supporting quality control rather than the game's
  premise.
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
- The exact new game mechanic and consequent visual-system expression remain
  open; the two equal entry choices do not.

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
- **Freshness owner:** Dream Phone champion; factual material still receives
  proportionate accuracy review without turning the game into verification.

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
- **Current status:** TWO-TRACK DIRECTION SELECTED; LEGACY PUBLIC EXPERIMENT
  PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL.
- **Unresolved product decision:** select the exact new full-game mechanic and
  prove it useful and funny before visual or implementation build.

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
