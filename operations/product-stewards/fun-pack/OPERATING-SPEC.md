# THE EXTRA CREDIT operating specification

**Status:** BOUNDED AUTHORITY PASS — independent Repair 1 rejudge 81/100;
product value remains HOLD with zero admitted activities

## Identity and purpose

- **Product:** THE EXTRA CREDIT / Fun Pack
- **Parent:** SUNNYVAiLE weekly episode ritual
- **Type:** optional curated practice-and-delight shelf
- **Audience:** a new or returning reader who finished—or deliberately chose
  to revisit—one published episode
- **User job:** find at most a few worthwhile extras that deepen, rehearse or
  delight without repeating the required lesson
- **LAiDIES contribution:** make optional follow-through feel like a charming
  object shelf while protecting product truth
- **Non-goals:** a generic game directory, a second Bag, required homework,
  proof of learning, a reward engine, a child-product approval authority, or
  an account/history service

## Experience model

- The object-world metaphor is a shelf of episode-labelled extras.
- In ten seconds, the reader should know this is optional, which episode is
  selected, whether any extras have been admitted, and how to return.
- A new reader arrives on the current published episode. A valid `issue`
  parameter selects that published archive; an invalid one falls back to the
  current episode without inventing a shelf.
- A returning reader may switch among the four published episode contexts.
  Selection is reflected in the URL and accessible pressed state.
- Anonymous and signed-in visitors receive the same product. No account
  benefit, history, completion or cross-device state exists here.
- The selector is native buttons with `aria-pressed`; changed episode context
  is a polite atomic live region. The layout reflows at 320 CSS pixels. No
  status is conveyed by colour alone.
- Loading is explicit. A missing, malformed or internally inconsistent
  candidate registry or admission authority produces an alert, Retry and
  episode exit; no fallback child opens. Retry replacement restores focus to
  the stable Retry action.

## Mechanics and rules

- **Input:** optional published episode number.
- **Core action:** select a published episode, then open an admitted activity
  or return to its episode/Bag.
- **Completion:** THE EXTRA CREDIT has no completion event. Each child owns its
  own authoritative outcome.
- **Output:** exact episode context and only activities admitted by a valid
  independently signed receipt.
- **Replay/return:** switching episode updates the URL. An admitted child URL
  must carry `from=fun-pack`, exact episode and an encoded exact return route.
- **Candidate data:** `fun-pack-registry.json` may describe the four candidate
  children and four published episodes. It contains no owner verdict,
  disposition, admission, child route, episode relationship, return approval
  or activity.
- **Admission:** the shelf renders a child only from a current Ed25519 receipt
  verified against the public key pinned in runtime. The signed payload binds
  the exact child ID, pinned owner and canonical child route, owner
  disposition `ADMITTED`, exact episode ID/number/relationship, exact return
  contract, bounded activity fields, canonical asset and complete activity
  URL.
- **Signing boundary:** the public candidate contains only the pinned public
  verification key and signed receipts. No private signer or signing endpoint
  is shipped. Production receipts are currently empty.
- **Failure:** any missing/extra field, duplicate ID/relationship, malformed
  signature, replacement key, invalid date, arbitrary local route,
  traversal/encoding/backslash/control character, fragment or extra query
  fails the complete authority closed. Candidate data cannot reinterpret
  `HOLD`, `HIDE/LABEL`, `FIX BEFORE PROMOTION`, local pass, experiment or
  release hold as admission.

## Content and learning

- The format-specific job is one optional action that retrieves, applies,
  judges, reflects or delights differently from the episode and Study Pack.
- No selection, visit, time-on-page, local marker or score proves learning.
- A learning child must name the behaviour rehearsed, consequence/feedback,
  misconception addressed and transfer evidence. A delight child must state
  its delight/ritual job without a false teaching claim.
- A child may not repeat the episode, Library reference, High class or
  NewsStand article as decorative filler.
- The right next experience is the selected episode or Bag when no admitted
  extra exists. A truthful empty shelf is an acceptable result.

## Visual, voice and media

- Preserve the current soft Y2K object-shelf language and LAiDIES voice.
- Status and information hierarchy come before decorative cards.
- An admitted card needs an owner-approved image, useful alt text, exact job,
  bounded time estimate and clear CTA.
- No new, unapproved or superseded visual enters through shelf admission.
- Motion is optional, functional and reduced-motion safe. No audio/narration
  is required.
- Ali’s taste approval remains required for a future visual redesign or paid
  extra.

## Technical and operational contract

- **Routes:** `/games/fun-pack.html`; exact episodes `/issues/issue-01.html`
  through `/issues/issue-04.html`
- **Candidate descriptions:** `games/data/fun-pack-registry.json`
- **Independent admission authority:** `games/data/fun-pack-admissions.json`
  with pinned Ed25519 public-key verification; zero production receipts
- **Frontend:** inline fail-closed loader/validator/renderer in
  `games/fun-pack.html`
- **Backend/provider:** none
- **Identity/session/persistence:** none beyond the URL selection
- **Reward/economy:** none; child products own their real persistence and
  rewards, and inclusion never grants value
- **Privacy:** do not capture child inputs, prompts, answers, identities or
  private return URLs
- **Reliability:** both public data paths are explicit artifact dependencies;
  source success without either byte-identical file is a release failure. The
  artifact-root validator uses only public admissible data and never packages
  private child dossier states.
- **Costs:** static hosting only
- **Rollback:** restore the prior page and remove the registry only as one
  scoped change; never leave a renderer pointing to absent authority

## Analytics and customer evidence

- No current custom event is wired or treated as evidence.
- Future aggregate events may cover episode context selected, admitted child
  opened, meaningful child outcome, and return to episode—only after the child
  can emit its real outcome.
- Safe properties are episode number, admitted child ID, admission version and
  bounded failure code. Never send child content or personal context.
- Success is useful optional uptake followed by a real child outcome and clean
  return; clicks and dwell time are not learning.
- Review weekly on episode/child-verdict change, monthly for links,
  accessibility and archive health, and immediately on a child incident.

## Dependencies and ownership

- **Champion:** Fun Pack champion
- **Subchampions:** every listed child retains its own owner
- **Guilds:** product integration, learning, UX, accessibility, frontend,
  identity/rewards truth, brand, analytics/customer focus and release
- **Upstream:** published episode canon and current child-owner states
- **Downstream:** Bag, episode, printable and discovery links
- **Conflict rule:** the shelf never overrules a child verdict
- **Freshness owner:** Fun Pack champion reconciles the registry whenever an
  episode or child state changes

## Acceptance and release

- Product/content quality: every admitted activity has a distinct optional job
  and exact episode relationship.
- Accuracy/trust: candidate descriptions cannot assert approval; only an
  independently signed, exactly bound receipt can admit a child. Coherent
  shelf forgery and malformed/forged receipt fixtures fail closed.
- Brand: honest curation, no filler or decorative authority.
- UX/accessibility: clean current/archive/empty/failure/return journeys,
  keyboard semantics, live status and 320px reflow.
- Backend/data/reward: no unsupported persistence or reward.
- Visual/media: owner-approved assets only for future admitted children.
- Release: independent judge builds a fresh artifact, proves candidate and
  authority inclusion/source identity, then runs the same hostile suite.
- **Current status:** Repair 1 is VERIFIED LOCALLY with four episode contexts,
  four candidate children and zero signed admissions; independent rejudgment
  and remaining product-value/owner/native/public gates are open.

## Source trail

- `operations/product-stewards/fun-pack/CHARTER.md`
- `operations/product-stewards/fun-pack/launch-deep-dive-2026-07-25.md`
- child `state.json` records for Mme CLAi-O, FAiRY Godmother, Dream Phone and
  Girl Talk
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- `operations/engine/LEDGER.md`, especially D-045 and D-049
- W3C APG Button Pattern and WCAG 2.2 Reflow / Status Messages, accessed
  2026-07-26
- Cycle 5 source and exact-artifact tests named in the evidence packet
