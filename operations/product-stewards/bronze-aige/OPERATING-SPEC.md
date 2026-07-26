# BRONZE AiGE operating specification

**Status:** BOUNDED LOCAL PASS — independent Repair 2 rejudge 92/100; owner visual, native accessibility and
public-origin approval remain held  
**Product:** The BRONZE AiGE  
**Parent:** SUNNYVAiLE building portfolio  
**Subproducts:** Businesswomen's Special; Cocktail Fortune route handoff  
**Last reconciled:** 2026-07-25

## 1. Identity and purpose

BRONZE AiGE is a bar-shaped social-practice room for adults. It helps a visitor
turn “we should talk about AI sometime” into a self-organised conversation:
make a local invite, choose an equally prominent cocktail or spirit-free
fortune, use a current or honestly evergreen conversation prompt, and play a
recorded LAiDIES track.

LAiDIES provides the ritual and prompts. It does **not** sell or serve alcohol,
book a bar, send invitations, verify age or attendance, recommend drinking,
provide health advice, operate a live venue, or create account-backed rewards.
Not drinking is a complete first-class path.

## 2. Experience model

### Ten-second comprehension

On arrival, a visitor must understand:

- this is a playful online room for planning a conversation with her own
  people, not a real venue;
- every activity can be used without alcohol;
- six labelled room objects open six in-place panels; and
- copied/downloaded/local state remains on her browser or device unless the
  destination explicitly says otherwise.

### New visitor

1. Read one concise orientation and safety boundary.
2. Choose a visible station using pointer or keyboard.
3. Open exactly one associated panel; the station exposes `aria-expanded` and
   the panel is named by its heading.
4. Use any station independently. The suggested ritual is invite → fortune or
   conversation prompt → optional local coaster, never a required funnel.
5. Receive a visible and programmatic result, failure state and next action.

### Returning visitor

The room may report only valid device-local drink and coaster receipts.
Corrupt, arbitrary or future state is ignored. A drink is a playful saved
suggestion; a coaster is an honour-system local reminder. Neither is a visit,
purchase, consumption event, account field, badge or Resident Card reward.

### Responsive and accessible behavior

- Six stations remain named and at least 44 CSS pixels in their actionable
  dimension.
- At 320 CSS pixels and at 200% zoom, content reflows without two-dimensional
  scrolling or clipped controls.
- Opening a panel may move focus to its heading; closing it returns focus to
  the initiating station.
- `Escape` closes an open panel and returns focus.
- All dynamic copy, calendar, clipboard, fortune, coaster, episode and audio
  outcomes use programmatic status messaging.
- Reduced motion removes animation, transitions and smooth scrolling.
- Text and meaningful control states meet WCAG AA contrast.

## 3. Station and mechanic contracts

### Call a happy hour

- Date and time are local to the visitor's device and must be valid.
- **Copy invite** copies text only after a user action. Success is reported only
  after Clipboard API or a verified fallback succeeds; failure leaves a
  selectable on-page invite.
- **Download calendar file** creates a local `.ics`. It does not add an event,
  send an invitation, reserve a venue or verify attendance.
- The `.ics` contains an explicit floating local date/time, 90-minute duration,
  a local-only description and no user identity or analytics payload.

### Fortune Teller / Businesswomen's Special

- Embedded mode is a quick single-device draw inside the bar.
- The standalone Businesswomen's Special is the full pass-the-phone table
  version with four moods and both lanes.
- Cocktail and spirit-free lanes use the same interaction depth, result fields
  and return path. Spirit-free is never hidden behind refusal copy or treated
  as a lesser substitute.
- Results are fictional suggestions, not availability, service, purchase,
  recipe safety, compatibility, consumption or health advice.
- Cocktail content is for adults of legal drinking age where they are. People
  who do not drink, are underage, are driving, are pregnant, take interacting
  medication or are otherwise avoiding alcohol use the spirit-free lane and
  should rely on qualified local guidance where needed.
- The product does not quantify “safe” consumption. Current official evidence
  says alcohol is not risk-free; the lowest-risk product behavior is not to
  encourage starting or additional consumption.
- Cocktail Fortune remains a distinct legacy route to Mme CLAi-O. It must not
  be represented as the Businesswomen's Special or as a bar activity.

### Tonight's Specials / Wednesday Special

- The evergreen prompts always remain usable.
- “Latest published episode” is shown only after a successful, schema-valid
  episode-index response and matching issue response.
- Response status must be checked; missing/malformed/no-published data or issue
  failure returns an explicit evergreen state.
- If the latest published episode lacks a canonical release date or is more
  than 14 days old, label it **From the latest published episode**, not
  “this week,” “tonight” or “current.”
- A resolved current episode may provide its `communityPrompt`; the room does
  not collect the resulting conversation.

### Framed answers

These are short retrieval aids tied to episodes, not substitutes for the
episode, Library or class. Each must preserve a correct mental model, avoid
analogy-led overclaiming and route to the deeper source before independent
learning/accuracy release. Tab semantics require associated tab panels,
roving keyboard focus and visible selected/focus states.

### Coaster

- One versioned, canonical device-local receipt may be saved per ISO week.
- The visitor explicitly self-attests only that she wants to mark the week.
- The interface must say it cannot verify attendance, drinking, identity or
  completion.
- Storage denial reports that no local coaster was saved and must not show
  success.

### Stage and audio

- The stage offers a **recorded track**. Clock-based atmosphere may change the
  room copy but cannot claim a live performance, crowd or real doors/show.
- Playback starts only from the named user control.
- One page-level owner controls the detached audio; starting another LAiDIES
  player must stop or pause the current one under the shared KSVL contract.
- Play, pause, ended, blocked and load/decode failure states are visible and
  programmatically announced. Failure never leaves a false playing state.

## 4. State, identity, reward and privacy

| State | Authority | Allowed meaning |
| --- | --- | --- |
| `laidies_bws_drink` | Valid device-local JSON receipt | Last playful suggestion on this browser |
| `laidies_bronze_coasters` | Valid device-local weekly receipt collection | Weeks this browser's user chose to mark |
| all-four-corners badge | Current page session only | All four mood controls opened in this session |
| Resident Card | Separate identity product | No Bronze drink/coaster write or sync is claimed |

No Bronze state is authoritative proof of age, service, purchase, attendance,
consumption, identity, learning, membership or reward. Signed-in and anonymous
visitors receive the same local experience in this bounded version.

Invite text, drink/mood, coaster history, free conversation, identity and raw
audio behavior must not enter Plausible, Clarity, console logs or evidence.
Product-specific analytics remain `NOT WIRED`.

## 5. Visual, voice and media

- The room itself is the interface: visible objects, in-place panels, no
  invisible hotspots, generic dashboard or worksheet sequence.
- Current chamber art is an interim bridge. The requested crisp, straight-on,
  Cosmo-led room remains **OWNER REVIEW REQUIRED** and must not be described as
  rendered, final or approved.
- Voice may be funny, glamorous and bar-literate, but jokes cannot create
  service, attendance, alcohol-safety, live-performance or reward claims.
- “Order,” “pour,” “happy hour,” “stage” and “coaster” may operate as clearly
  fictional interface language only when nearby plain language establishes
  the real boundary.
- Approved audio provenance/rights remain governed by the KSVL owner. This
  cycle proves player mechanics only, not rights or public release.

## 6. Technical and operational contract

- Routes:
  `/bronze-aige.html`, `/games/businesswomens-special.html`,
  `/games/cocktail-fortune.html`.
- Runtime:
  `content/site/bronze-aige-v2.js`, `content/site/bws-data.js`,
  `content/site/ksvl-player.js`.
- Style:
  `content/bronze-aige-v2.css` and the standalone BWS page styles.
- Episode source:
  `/content/episode-index.json` plus matching
  `/content/episodes/issue-NN.json`.
- Backend: none in the bounded product.
- Fallback: room orientation, evergreen prompts, spirit-free path and local
  activity remain usable when episode, clipboard, storage or audio fails.
- External network must be denied in synthetic browser evidence. No test may
  contact a real analytics, media, booking, alcohol, identity or service
  provider.

## 7. Analytics, upkeep and dependencies

Future aggregate events may include controlled station ID, copy/download
success/failure class, lane class, fortune revealed, local coaster save result,
episode prompt state and audio result. They require shared event-dictionary and
privacy approval first; never include the content values listed above.

- Per episode: verify index/issue binding, release date and framed-answer link.
- Monthly: routes, menu parity, source/credit, local receipt and audio checks.
- Quarterly: alcohol framing, 320px/zoom/keyboard/reduced-motion/contrast,
  owner visual and rights review.
- Immediate trigger: false live/service/reward claim, unsafe alcohol framing,
  broken spirit-free path, corrupt local state, stale episode labelled current,
  overlapping audio or private data in telemetry.

Upstream owners: episode experience, KSVL, shared identity/reward and shared
analytics/privacy. Downstream: Resident Card link and weekly episode ritual.
Cross-product contract changes go through the portfolio orchestrator.

## 8. Acceptance and release

The bounded candidate requires:

- deterministic source checks for copy, routes, typed local state, currentness,
  status semantics, audio ownership and reduced-motion rules;
- rendered desktop, 390px and 320px journeys with keyboard, focus return,
  direct hash, failure fixtures, contrast and reflow evidence;
- embedded and standalone cocktail/spirit-free parity;
- clipboard success/failure and `.ics` content verification;
- episode current, stale, missing-index, no-published and failed-issue fixtures;
- local-storage denial/corruption and valid returning-state fixtures;
- audio play/pause/ended/error and single-owner fixtures;
- exact public-artifact identity and repeat of the local suite; and
- independent product, trust/safety, brand, accessibility and technical review
  at the shared 17/20 floors.

Even after local evidence, these remain held: Ali's Cosmo/room visual approval,
audio rights/public admission, Safari/VoiceOver/native zoom/physical-device
proof, analytics/privacy approval, exact deployed-origin proof and any
alcohol-related partnership, promotion, commerce or real-world activation.

## 9. Source trail

Product sources inspected 2026-07-25:

- Bronze charter, launch deep dive, state, backlog and building brief;
- current Bronze, Businesswomen's Special, Cocktail Fortune, episode, KSVL,
  Resident Card and local reward source/contracts;
- LAiDIES learning-content standard and champion contract.

Primary guidance accessed 2026-07-25:

- WHO alcohol fact sheet:
  https://www.who.int/news-room/fact-sheets/detail/alcohol
- Government of Canada alcohol guidance and harm-reduction statement:
  https://www.canada.ca/en/health-canada/services/substance-use/alcohol.html
  and
  https://www.canada.ca/en/public-health/news/2023/01/statement-from-the-council-of-chief-medical-officers-of-health-ccmoh-on-alcohol-consumption.html
- W3C WCAG 2.2 and ARIA Authoring Practices tabs pattern:
  https://www.w3.org/TR/WCAG22/ and
  https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

Sourced fact: alcohol use is not risk-free, and lower consumption lowers risk.
Product inference: BRONZE AiGE should not calculate personal limits; it should
offer equal spirit-free participation, avoid encouraging consumption and
leave individual health/legal decisions to qualified local guidance.
