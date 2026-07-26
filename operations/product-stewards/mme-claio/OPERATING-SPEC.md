# Mme CLAi-O product operating specification

**Status:** BOUNDED LOCAL PASS — independent Repair 2 rejudge 93/100; reconciled 2026-07-25 from owner direction,
the steward charter, current source and the launch deep dive. Unresolved deck,
shared-reward, public-release and owner-creative decisions remain unresolved.

## Identity and purpose

- **Product:** Mme CLAi-O's Shop / Mme CLAi-O Reading
- **Parent building/product:** Building No. 5; the reading is the building's
  primary activity.
- **Product type:** Playful reflection activity, not a prediction or
  professional-advice tool.
- **Audience:** Adult LAiDIES visitors seeking a warm, dramatic card for a
  low-stakes career or everyday-life reflection.
- **User job:** Pause, draw one random authored card, receive one memorable
  reflection and choose whether a small suggested move is useful.
- **Why LAiDIES offers it:** It turns a familiar Y2K hotline/fortune-teller
  object into honest emotional utility without manufacturing certainty.
- **Distinct contribution:** A brief behaviour/confidence nudge; it does not
  duplicate FAiRY Godmother's tailored advice or a learning product.
- **Explicit non-goals:** Predicting outcomes; diagnosing people; deciding
  emergencies, health, safety, abuse, legal, financial or factual questions;
  collecting private questions; providing crisis support; account-wide
  history; or promising a durable reward.

## Experience model

- **Metaphor:** Enter the reading room, cut the deck, read one random authored
  card, then keep, adapt or ignore its small move.
- **Ten-second comprehension:** This is playful reflection, the deck is the
  action, the card is not a prediction, and sensitive/high-stakes questions
  belong with real people and reliable sources.
- **New-user journey:** Read the random/non-tailored truth and permanent
  high-stakes boundary → cut the deck → receive a card and announced result →
  understand that any history and keepsake are stored only in this browser on
  this device.
- **Returning-user journey:** Arrival truthfully summarizes device-local count
  and last card → the next draw cannot immediately repeat the last stored draw
  → the visitor can review the last three readings or clear Mme CLAi-O's local
  history and keepsake.
- **Anonymous/signed-in differences:** None. The activity does not read identity
  or claim signed-in synchronization.
- **Mobile/desktop/accessibility:** Native controls work by keyboard and touch;
  focus is visible; dynamic states are announced; the revealed card receives
  focus; 320 CSS-pixel reflow does not require page-level horizontal scrolling;
  and reduced-motion preference removes the timed reveal and smooth scrolling.
- **Empty/loading/error/offline/retry:** There is no prompt or empty-input
  state. A draw has a short “cards turning” status unless reduced motion is requested.
  Missing card art does not block the text reading. If local storage is
  unavailable or malformed, the reading still works for the current page and
  clearly says it will not be saved. There is no network dependency for the
  reading engine.

## Mechanics and rules

- **Inputs:** Activation of either visible “Cut the deck” control. Mme CLAi-O
  collects no arbitrary question or other visitor-authored text.
- **Core actions:** Draw one random card from the existing authored deck after
  an explicit visitor action.
- **Authoritative completion event:** A valid deck card is visibly rendered and
  announced. Starting the animation or writing storage is not completion.
- **Outputs:** Card name, “Sign,” “Message,” and optional small “Move”; a
  device-local recent-reading list; device-local call count; and, after five
  completed local draws, a device-local Hotline Regular keepsake.
- **Replay/return loop:** Pull another card. The new index must differ from the
  immediately previous card, including the last valid card restored from local
  history after returning.
- **Game rules/tool contract:** The existing deck, card copy, art-slug rules,
  aliases, ten-reading stored-history limit, three-reading display and
  five-completed-draw threshold remain unchanged. No card is tailored to or
  interpreted from visitor input.
- **Abuse/edge/race cases:** Repeated activation while a draw is pending is
  ignored. Count must be an exact safe integer from zero through 10,000;
  history is capped at ten and rehydrated only from governed deck records;
  unknown current/last cards, corrupt structures and invalid/future badge
  values are discarded. Failed storage reads/writes/removes do not block the
  draw or create an account claim.

## Content and learning

- **Format-specific job:** A low-stakes reflection prompt, not instruction,
  factual retrieval or tailored professional advice.
- **Behaviour outcome:** The visitor can consider one safe, concrete move and
  decide for herself whether it fits.
- **Correct mental model:** The card is randomized authored copy. It does not
  know the visitor, analyze or answer a question, predict the future or verify
  facts.
- **Misconceptions addressed:** “Fortune” is not foresight; confident character
  voice is not authority; a local keepsake is not an account reward.
- **Evidence/date sensitivity:** Card copy should avoid time-sensitive claims.
  The permanent boundary directs current-fact decisions to reliable current
  primary sources; the product does not accept or route typed questions.
- **Analogy and limits:** The hotline/seance language creates drama only. The
  permanent boundary copy states the limit.
- **Assessment/transfer evidence:** Not a formal learning assessment. Product
  evidence is comprehension of the boundary and voluntary usefulness of the
  suggested move.
- **Ecosystem relationship:** FAiRY Godmother owns tailored in-scope advice;
  the Library, High, episodes and NewsStand own teaching and sourced
  information; Businesswomen's Special owns its separate bar/drink randomizer.
- **Next useful experience:** Return to SUNNYVAiLE or, where appropriate, use a
  purpose-built learning/advice experience. No automatic diversion is required.

## Visual, voice and media

- **Approved direction:** Preserve the current approved reading-room render and
  existing blue/pink/cyan/mint visual system. This packet contains no new
  visual-generation authority.
- **Canon:** Use “Mme CLAi-O” for the shop/activity and “Madame” naturally in
  character copy; preserve LAiDIES casing.
- **Voice:** Warm, funny, dramatic and direct. Never shame vulnerability,
  manufacture certainty, or use jokes in the safety boundary.
- **Required states:** Arrival, random/non-tailored truth, permanent humane
  boundary, drawing, result, storage unavailable, returning history, local
  keepsake and cleared state.
- **Motion/audio:** Song playback remains optional. The draw is understandable
  without motion or audio; reduced-motion preference removes delay and smooth
  scrolling.
- **Prohibited patterns:** Unapproved replacement art; predictive/psychic
  authority claims; professional-advice claims; fake hotline numbers; and
  cross-device/account reward language.
- **Owner decisions still required:** Any new/revised deck, major visual change,
  promotion creative, monetization or physical deck.

## Technical and operational contract

- **Routes/source:** `/games/madame-claio.html` →
  `games/madame-claio.html`; `content/madame-claio-v2.css`;
  `content/site/madame-claio-v2.js`.
- **Legacy route:** `/games/cocktail-fortune.html` is a recovery redirect to the
  canonical Mme CLAi-O route and must not claim that the retired cocktail
  product still exists.
- **Separate product:** `/games/businesswomens-special.html` remains a BRONZE
  AiGE drink-selection game, with a spirit-free lane; it does not share Mme
  CLAi-O history, safety scope or keepsakes.
- **Backend/services:** None for core reading. Existing aggregate analytics
  scripts are outside this packet; card text must never be sent as an analytics
  property.
- **Data model/stores:** `claio-call-count` (exact integer `0..10000`);
  `claio-call-history` (last ten canonical deck references, with displayed
  `read` copy rehydrated from the governed deck); and valid plain-object
  members of `laidiesSecretBadges`, including device-local
  `hotline-regular`. These are browser localStorage only. Unknown cards,
  malformed shapes and invalid/future timestamps are discarded. Badge
  `unlockedAt` values must be exact `YYYY-MM-DDTHH:mm:ss.sssZ` UTC strings,
  pass arithmetic Gregorian component validation and exact ISO round-trip, and
  be no later than `Date.now()` with zero future tolerance.
- **Identity/session:** None.
- **Persistence truth:** Same-browser/device convenience only; unavailable in
  private/restricted storage and not guaranteed to survive browser clearing.
- **Reward contract:** “Hotline Regular” is a device-local keepsake. This
  specification does not authorize account sync, currency or member benefit.
- **Privacy/security/safety:** The reading collects no visitor-authored text.
  A concise boundary is always visible before and after a draw: random cards
  are not for emergencies, personal safety/abuse, health, legal, financial or
  current-fact decisions; it names appropriate real-world support classes
  without inventing local contact details.
- **Performance/reliability:** Text completion does not depend on art, storage,
  analytics, audio or a backend. The interaction remains usable when those
  optional dependencies fail.
- **Costs/limits:** No per-reading provider cost. Existing deck and assets only.
- **Fallback/rollback:** Revert the scoped page/CSS/enhancement changes; the
  legacy redirect and frozen authored deck remain independently recoverable.

## Analytics and customer evidence

- **Meaningful future events:** `claio_reading_started`,
  `claio_reading_completed`, `claio_history_cleared`,
  `claio_storage_unavailable`.
- **Privacy-safe properties:** Returning-device boolean and technical outcome
  only. Never fortune text, identity or sensitive inference.
- **Baseline:** No product-specific validated baseline in this packet.
- **Measures:** Completion and voluntary repeat; boundary display; storage/art
  failure rate; boundary comprehension; reported usefulness; and no sensitive
  payload collection.
- **Inputs/cadence:** Aggregate Plausible/Clarity and opt-in qualitative
  feedback only after Platform/Privacy approval; monthly and after deck,
  safety, storage or route changes.

## Dependencies and ownership

- **Parent champion:** Mme CLAi-O building champion.
- **Subchampion:** Mme CLAi-O Reading.
- **Guilds:** Safety/Trust, UX/Accessibility, Brand/Canon,
  Platform/Reliability and Customer Evidence.
- **Upstream:** Existing authored deck/art, browser storage, shared header and
  return navigation.
- **Downstream:** Any future Closet/Resident Card presentation of the local
  keepsake; no such sync is asserted here.
- **Cross-product handoffs:** Cocktail Fortune recovery wording with portfolio
  routing; Businesswomen's Special scope with BRONZE AiGE; any durable reward
  with Identity/Rewards.
- **Maintenance:** Re-run the suite after source, deck, safety vocabulary,
  storage contract, route, shared CSS or browser-support changes.

## Acceptance and release

- **Quality:** New, returning, repeated, cleared and storage-failure journeys
  pass against exact source and built artifact without changing the deck.
- **Safety/trust:** Crisis/emergency, medical, legal, financial, abuse and
  factual/current-decision limits are permanently visible; no arbitrary prompt
  control, classifier or obsolete prompt side-effect path exists. The random,
  non-tailored, non-predictive mechanic is explicit.
- **Brand:** Existing approved visual direction and authored voice remain;
  safety copy is humane and non-performative.
- **UX/accessibility:** Keyboard activation, visible focus, programmatic
  announcements, reduced motion, 320px reflow/mobile, text scaling and contrast
  proxies pass; Safari/VoiceOver/native zoom remain explicit human gates.
- **Backend/data/reward:** No backend claim; local-only scope is visible; reset,
  denied storage, count extremes, malformed structures, oversized history,
  unknown cards and exact timestamp admission pass. Timestamp evidence includes
  +1 millisecond and +60 seconds, impossible/non-leap/short-month dates,
  malformed widths and non-UTC variants, valid current/past/leap values,
  unrelated sibling preservation and scoped reset after sanitation.
- **Visual/media:** Existing assets render; any missing card art falls back to
  text. Owner visual approval remains required for launch promotion.
- **Release evidence:** Local source and exact public-artifact identities and
  test results are recorded. Deployment and real-origin verification are not
  authorized by this packet.
- **Current status:** The exact local candidate is independently verified within
  the automated/proxy scope. `VERIFIED PUBLICLY`, Safari/VoiceOver/native zoom,
  analytics/privacy configuration and owner creative approval remain holds.

## Source trail

- Owner direction carried in the active product-champion assignment,
  2026-07-25.
- `CHARTER.md`, `launch-deep-dive-2026-07-25.md`, `backlog.md`, `state.json`.
- `operations/building-design-briefs/madame-claio.md` and current page/CSS/JS.
- W3C WCAG 2.2, Status Messages 4.1.3, Reflow 1.4.10, Focus Visible 2.4.7
  and Animation from Interactions 2.3.3, accessed 2026-07-25:
  <https://www.w3.org/TR/WCAG22/>,
  <https://www.w3.org/WAI/WCAG22/Understanding/reflow>,
  <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible>,
  <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions>.
- Existing local activity/mobile audits are supporting evidence, not current
  public or assistive-technology verification.
