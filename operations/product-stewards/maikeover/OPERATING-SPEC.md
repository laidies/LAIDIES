# MAiKEOVER on MAiN operating specification

**Status:** BOUNDED LOCAL PASS — independent Repair 2 rejudge 90/100; account,
public-card, avatar-service, durable reward and cross-device outcomes remain
**UNVERIFIED** until the controlled external suite passes on the exact release.

## Identity and purpose

- **Product:** MAiKEOVER on MAiN, including the Resident Card intake and the
  resident-facing Closet handoff.
- **Product type:** building and identity/personalization tool.
- **Audience:** a new or returning LAiDIES visitor who wants to make, keep or
  revisit a Resident Card without being forced into an account.
- **User job:** personalize a card, understand exactly where it is retained,
  optionally begin an account/handle flow, and reach the appropriate Closet.
- **Why LAiDIES offers it:** membership should feel like a playful Y2K salon
  ritual, not an administrative profile form.
- **Distinct contribution:** it is the town's becoming-a-resident moment and the
  identity handoff into the Closet.
- **Non-goals:** proving identity from a local handle; making private profile
  answers public; treating card backgrounds as earned inventory; implying a
  durable reward, public Card or cross-device restore from a click or local save;
  presenting avatar generation as available while its safety release is held.

## Experience model

- **Metaphor:** sit at the salon vanity, work the drawers, see the Resident Card
  change in the mirror, save it, then optionally sign the guest book.
- **Ten-second comprehension:** “Make your Resident Card here. Saving keeps it
  on this device. Account and sharing features are separate and must say when
  they are unavailable or unverified.”
- **New user:** arrives to an explicit local-state message; can customize and
  save without sign-in; receives a success or storage-failure result; may open
  the local Closet.
- **Returning user:** sees whether the chair remembers a card on this device.
  A remembered local handle is not described as a signed-in account.
- **Anonymous versus signed in:** anonymous work is browser-local. A signed-in
  state is valid only when supplied by the verified identity provider. The UI
  must visibly name which state it is showing.
- **Mobile/accessibility:** usable at 320 CSS px and 400% zoom without loss,
  keyboard-operable in logical order, visible focus, correctly named controls,
  status changes announced, and non-essential motion removed under
  `prefers-reduced-motion`.
- **Empty/loading/error/offline/retry:** empty card, storage unavailable,
  service loading, service unavailable, expired link, private/not-found and
  retry states are distinct. Failure must never use success-shaped copy.

## Mechanics and rules

- **Inputs:** optional display/card choices; local background and curated
  favourites; optional authenticated handle/visibility choice when that service
  path is released; optional avatar input only when the portrait service passes
  its separate safety/privacy gate.
- **Core actions:** preview, customize, save locally, inspect local state, and
  follow an explicitly available account or Closet handoff.
- **Authoritative local completion:** every required local write succeeds and a
  subsequent reload restores the same allowed fields in the same browser
  context.
- **Authoritative account completion:** verified Supabase session plus successful
  profile persistence and reload. A submitted email, magic-link request, local
  username or mocked response is not completion.
- **Authoritative public-card completion:** an opted-in card resolves through the
  restricted public-card view for an unauthenticated second context while a
  private card exposes no private row or fields.
- **Outputs:** live card preview, explicit retention/state label, save result,
  and a truthful next route.
- **Replay/return loop:** reopen and edit the card; return through the Closet.
- **Edge cases:** blocked storage, quota failure, corrupt local values, duplicate
  saves, two tabs, invalid/taken/reserved handles, network loss, expired links,
  signed-out returns, visibility changes, private/not-found accounts, malformed
  avatar results and another-device isolation.

## Content and learning

- **Format-specific job:** guided self-expression and identity setup, not a
  lesson or knowledge assessment.
- **Behaviour outcome:** a visitor can create a useful card while understanding
  the difference among “on this device,” “in my account,” and “public.”
- **Correct mental model:** personalization and persistence are separate;
  visibility is opt-in; a local card is not an account.
- **Misconceptions addressed:** “saved” does not automatically mean cross-device;
  choosing a background is not earning it; sharing UI does not prove a public
  record exists.
- **Evidence sensitivity:** authentication, privacy, service availability,
  persistence and rewards require current end-to-end evidence.
- **Assessment/transfer:** after saving, a user can correctly identify where the
  card lives and what must happen before it can be restored or viewed elsewhere.
- **Ecosystem relationship:** MAiKEOVER creates the identity object; the Closet
  displays proven local/account collections; shared identity and reward stewards
  own durable ledgers. It must not duplicate Library, High, episode or NewsStand
  teaching.
- **Next useful experience:** the local Closet; authenticated/public routes only
  after their own acceptance gates pass.

## Visual, voice and media

- **Direction:** the approved room-first Y2K beauty-parlor system in
  `operations/building-design-briefs/maikeover.md`; the vanity mirror is the
  working card, controls are salon objects, and the page must not collapse into
  a generic SaaS form.
- **Canon:** MAiKEOVER on MAiN, No. 6. Do not revive the dropped Maine “(e)” pun
  or stale No. 9.
- **Voice:** warm, playful and exact about state. Never use magical language to
  blur storage, identity, privacy or reward truth.
- **Assets:** only approved salon/card assets; avatar candidates are unavailable
  while the portrait booth safety hold remains.
- **Motion:** decorative motion must not obscure control state and must honor
  reduced-motion preference.
- **Prohibited:** unapproved generated portraits, heavy gold/old generic
  card-grid treatment, false “the chair remembers you” account implication,
  or any background “unlock” styling without ownership evidence.
- **Owner decision still required:** final approval of any new salon or social
  visual and whether a visible keeper appears in the room.

## Technical and operational contract

- **Routes/source:** `/maikeover.html`,
  `/content/site/maikeover-v2.js`, `/resident-card.html`,
  `/laidies-card.html`, `/content/site/supabase-config.js`.
- **Backend/services:** Supabase Auth/database/RPC and the avatar Worker are
  dependencies, not locally proven outcomes.
- **Stores:** the versioned `laidies_resident_card_v1` envelope is authoritative
  for the complete MAiKEOVER card plus every visible local Closet edit field;
  legacy per-field keys are import-only compatibility inputs. Supabase is
  authoritative only after a verified authenticated
  transaction. `member_reward_events` does not establish a complete
  earn/spend/refund economy.
- **Identity/session:** only provider-verified session data establishes sign-in;
  never infer it from storage-key shape, email text or a handle.
- **Persistence:** device-local is locally testable. Account and cross-device
  restoration are **UNVERIFIED**.
- **Rewards:** supported local Closet collections may render with “this device”
  language. Backgrounds are choices. Durable Clips, delivery, invitation
  outcomes and cross-device rewards remain held by the shared reward contract.
  Public Cards omit collections and may not read raw `member_reward_events`.
- **Privacy/security:** public cards must use the restricted public view and
  the independently owned allowlist in `public-card-field-contract-v1.json`; raw
  profile rows are owner-only; no name, email, handle, profile answer, avatar
  image, invite content or authentication token may enter analytics or logs.
- **Reliability:** storage and service failures stay visible, retryable and
  non-destructive. No silent fallback may turn a failed account operation into
  a local success that looks durable.
- **Costs/limits:** remote generation remains disabled until service limits,
  abuse controls, privacy and failure behaviour pass.
- **Fallback/rollback:** preserve local card-making when safe; fail closed on
  account, visibility, avatar and reward paths; revert a candidate through the
  normal release-control process without deleting resident state.

## Analytics and customer evidence

- **Events:** aggregate room arrival, local save attempt/result, storage failure,
  account-flow availability, auth-link attempt/result, claim result, visibility
  choice, Closet handoff and explicit local/account restore result.
- **Privacy-safe properties:** product/version, anonymous state class,
  viewport class, result class, error category and elapsed-time bucket only.
- **Prohibited properties:** names, emails, handles, profile selections, avatar
  data/URLs, invite content, tokens and raw error bodies.
- **Baseline:** **NOT WIRED**; no dated Plausible/Clarity funnel establishes
  current success.
- **Measures:** save-and-reload success, truthful-state comprehension, keyboard
  completion, auth/profile/public-card contract success, privacy isolation,
  error recovery and return-to-Closet rate.
- **Review cadence:** before release; 24–72 hours after a verified deployment;
  weekly once aggregate evidence exists; immediately after a privacy, auth,
  reward or avatar incident.

## Dependencies and ownership

- **Parent champion:** MAiKEOVER on MAiN building steward.
- **Subchampions:** Resident Card; Closet & Progression.
- **Guilds:** Platform/Data/Reliability, Safety/Privacy, Accessibility/UX,
  Brand/Visual and Identity/Rewards & Connection.
- **Upstream:** approved canon/assets, Supabase configuration/migrations, avatar
  Worker release and shared reward definitions.
- **Downstream:** Closet, public Resident Card, invitation/connection features
  and future personalization offers.
- **Conflict rule:** this product may label or hide shared reward/account
  promises, but may not redefine their ledgers or migrations without the owning
  steward and orchestrator.
- **Freshness owner:** product steward reconciles this spec, evidence, state and
  backlog after every accepted product/service change.

## Acceptance and release

- **Product quality:** clean and returning local journeys complete with useful,
  understandable results.
- **Accuracy/safety/trust:** state labels match the actual store; account/public/
  reward/avatar failures fail closed; no sensitive disclosure.
- **Brand:** ≥17/20 for user value, accuracy/safety/trust and positive LAiDIES
  contribution; revenue cannot compensate.
- **UX/accessibility:** keyboard, focus, status announcement, reduced motion,
  320px/reflow and storage/error tests pass.
- **Backend/data/reward:** controlled fresh-email, expired-link, logout/login,
  second-device and two-account public/private tests pass on the exact release.
- **Visual/media:** approved salon/card assets only; no new visual is approved by
  code presence or automated judgement.
- **Release proof:** exact commit/artifact, deployment record and public-origin
  retest. Local mocks prove UI determinism only.
- **Current decision:** local preflight may proceed. Production calls, account
  creation, email submission, avatar upload/generation, deploy and public claims
  remain on an explicit external-authority hold.

## Source trail

- Owner direction in the active task: dedicated product ownership, local P0
  repairs/tests now, no credentials/private data/production mutation, and an
  exact later controlled test packet.
- `CHARTER.md`, `launch-deep-dive-2026-07-25.md`, `state.json`, `backlog.md`.
- `operations/building-design-briefs/maikeover.md`,
  `operations/resident-card-design-decisions.md`,
  `operations/closet-design-decisions.md`,
  `operations/closet-dashboard-spec.md`.
- `docs/product/bring-your-people-reward-loops.md`.
- Current routes/modules and Supabase migrations listed above.
- Prevention rules BTB-010–012 and BTB-069 in
  `operations/painpoints-log.md`.
