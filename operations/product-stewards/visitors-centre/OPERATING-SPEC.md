# Visitor’s Centre — operating specification

**Status:** ALI TOURIST-CENTRE DIRECTION SELECTED / CURRENT PUBLIC EXPERIENCE
REJECTED / SYSTEM INVENTORY AND REPLACEMENT SPEC ACTIVE / NO VISUAL CANDIDATE.
Prior interaction, state, accessibility and native evidence remains technical
characterization only. It is not a product, Brand, integration, release or
public candidate.

## Identity and purpose

- **Product:** Visitor’s Centre (`/visitors-centre.html`).
- **Parent building/product:** SUNNYVAiLE town entry; complementary to, but not a replacement for, the homepage.
- **Product type:** Orientation/discovery room and handoff service.
- **Audience:** New or returning visitors who want a clear introduction or a named town destination without memorizing the map.
- **User job:** Understand the room's purpose, discover a named building through the wall map or directory, and leave through one intentional next route.
- **Why LAiDIES offers it:** It makes orientation welcoming and legible without turning it into mandatory onboarding before practical AI learning.
- **Distinct contribution:** A colourful, vibrant and unmistakably LAiDIES 1990s tourist-information centre where a visitor can learn how the complete site works, understand every building and navigate directly to each one. The prior neutral white-page/front-desk/map/directory composition was rejected and cannot be revived by reskinning it.
- **Explicit non-goals:** The Centre does not make a downstream service ready, subscribe/mail/open/join/refer someone, issue rewards, require a tour/postcard/sign-in, or certify account persistence.

## Experience model

- **Diegetic metaphor:** The masthead places the visitor inside a tourist-information centre made specifically for SUNNYVAiLE. Its counter, complete named building information, tour/leaflet materials, environmental signs, trailer and admitted postcard display operate as meaningful room objects in one coherent usable arrival interface. The canonical map remains a separate discovery object, not the masthead. No admitted existing image performs this job; a new responsive interior scene is required and exact composition/artwork still requires the design-admission gate.
- **Ten-second comprehension:** “SUNNYVAiLE is the LAiDIES learning world. Different buildings and formats have different learning jobs. This Centre explains why, helps me choose and shows me where to go.”
- **New-user journey:** Arrive → understand what SUNNYVAiLE is → understand why LAiDIES uses a town/Rewind Era and distinct learning formats → choose a goal/content path, direct map/named-building exploration or optional guided orientation → inspect a building or admitted postcard → deliberately enter a destination or invitation handoff. The visitor need not complete the explanation, tour, trailer, postcard or account flow before navigating directly.
- **Returning-user journey:** Reopen the room → choose a destination directly; local prior selection may be used for presentation only and cannot imply a durable personal history. A returning visitor receives a useful continuation only if the destination is currently admitted by its owner.
- **Anonymous/signed-in differences:** Core room, named directory and destination handoff work anonymously. Postcard/tour/sign-in are invitations. The room never claims a selected postcard was sent/opened, that a recipient joined, or that a visit became a reward.
- **Mobile/desktop/accessibility behaviour:** At all widths, the named selector/directory is available without precise map tapping. A selection updates the `aria-live` destination reveal; keyboard users can reach selection, reveal, enter CTA and Back to map. Focus must return to the selection trigger after Back/Escape where a modal-like state exists. Test 390×844 plus representative desktop; source responsive CSS alone is not proof.
- **Empty/loading/error/offline/retry states:** If map/directory/shared data cannot load, display a plain named-destination fallback or a clear link back to homepage; never leave an empty room pretending selection worked. If trailer/tour/audio fails, retain all route choice. If postcard share/email fails, say the handoff was not confirmed and offer the Post Office route; do not retain/submit private text without the owning service's contract.

## Mechanics and rules

- **Inputs:** Map/tap or named-directory selection, destination reveal CTA, tour/trailer choice, anthem control, postcard card/note/email/share handoff.
- **Core actions:** Learn how the town/site works; select any building; inspect its name/address/job/current limitation; enter its route; return to the Centre; browse the complete town in any order or choose a short goal/content-format path from the same canonical orientation system; optionally start/pause/skip/leave/resume contextual guidance; optionally watch the current trailer; browse admitted postcards and begin a truthful invitation handoff; open a stable FAQ answer.
- **Authoritative completion event:** Correctly arriving at an intentional destination route after an explicit selection. Map selection/reveal itself is not downstream success. Tour start is not tour completion; postcard UI state is not delivery/open/join/referral/reward; audio button is not listening proof.
- **Outputs/visible result:** One live reveal with a named CTA and a clear route; shared directory/map highlights are presentational. The Centre must maintain one dominant next action at each state.
- **Replay/return loop:** Revisit/select another building or return to homepage; do not make orientation, postcard or tour a required ritual or local-reward loop.
- **Promotion admission rules:**
  1. Every visible destination must come from the canonical shared directory with a correct name, route and owning champion.
  2. Centre copy may say what the destination is for, but must surface/avoid its receiving-product limitation according to the 2026-07-25 public-promise registry. A held/broken/lifecycle-dependent product cannot be presented as a completed service.
  3. Trailer/tour/postcard labels must name only the next observable action. They cannot promise completion, mail delivery, account membership, referral credit or reward.
  4. A directory/map response and HTTP route success are navigation evidence only, not product success (BTB-069).
- **Abuse/edge/race cases:** Unknown/missing building ID, stale route, data-load failure, rapid map/directory switching, pointer-to-card hover transition, escaped/closed reveal, disabled storage, blocked share/email, network/media failure, no JS, keyboard-only and mobile Safari each require a visible recovery and recorded test result.

## Content and learning

- **Format-specific job:** Orientation and confidence to choose a useful next learning/help route; it is not an AI lesson or assessment.
- **Content-format explanation:** Current NewsStand reporting, narrative Episodes, Episode Study Packs, durable LIBRAiRY reference and future practice/feedback Classes receive distinct plain-language jobs. The Centre explains the difference and builds a short itinerary only from admitted destinations.
- **Learning/behaviour outcome:** A newcomer can explain what SUNNYVAiLE is, why LAiDIES uses the town/multiple-format system, how at least two formats differ, choose a relevant building by name and predict what its CTA will do.
- **Explanation boundary:** Rewind Era familiarity and the town metaphor are learning/retrieval mechanisms, not proof that content is accurate or sufficient. Every format retains its own teaching, source, freshness and outcome gates. Homepage consumes the short causal summary; the Centre owns the full explanation.
- **Correct mental model:** The map is a guide, not a readiness map; the directory is a direct accessible alternative; a handoff is not a service lifecycle or membership event.
- **Misconceptions addressed:** “I have to know the map/numbered pin”; “the tour is required”; “postcard means sent”; “building selection earns a reward”; “a town route means every product is fully ready.”
- **Evidence/date sensitivity:** Building labels/routes and current episode/trailer availability depend on shared directory/media records. Receiving learning claims stay with their owners and inherit D-2026-07-25-044 where applicable.
- **Analogy and limits:** A visitor centre metaphor explains welcome/orientation; it does not mean physical service fulfilment, identity verification, or a concierge who can guarantee every destination.
- **Assessment/transfer evidence:** Clean-state comprehension asks the visitor to identify the room, name a choice path, say what the CTA will do, and reach a deliberately chosen route. Selection count alone is not comprehension.
- **Relationship to other products:** Town Entry owns homepage/Start Here; shared directory/map/header/tour are Platform/Town Entry dependencies; Post Office owns postcard lifecycle; Episode Media owns trailer; destination champions own their final experiences.
- **Help/FAQ ownership:** Visitor’s Centre owns stable orientation questions and answer anchors. Identity, Privacy, Finance, Platform and destination owners supply changing factual truth and correction triggers.
- **Current FAQ truth:** The active release worktree has no structured registry.
  A protected iCloud checkout contains an 8/12 selected specification registry
  last reviewed 2026-08-03, with every ID reserved/not live and no authorized
  public answer prose. Reconciliation/freshness review is required before use;
  the legacy editable FAQ draft is rejected as authority.
- **Next useful experience:** A deliberately selected, admitted destination—not a forced tour, postcard or sign-in.

## Visual, voice and media

- **Approved product/visual direction:** A cohesive adult 1990s tourist-information centre inside the vibrant LAiDIES world. The newly produced masthead interior and live interface must read as one place: purposeful pop-art colour and information objects support orientation instead of serving as a decorative backdrop above modules. Ali rejects beige/pink neutrality, retired plum/gold, generic CSS boxes, disconnected modules and unexplained empty space. This selects the experience direction and establishes the need for a new asset, not an exact composition or artwork; those still require the building design-admission gate.
- **Shared header/type contract:** Render the canonical global header with the same wordmark, navigation/account/menu contents, typography, geometry, spacing, behavior and responsive outcomes as every public page; no Visitor-specific header skin or override. Below it, use the shared navigation/body/control/eyebrow/H1/H2/H3/caption/status role tokens. One admitted local display treatment may add character without changing hierarchy. Reject the incumbent 6–8px labels, 14/19/30/~37px heading jumps and Anton/Jost improvisation.
- **Surface/colour contract:** The Centre receives its own rich room palette, materials, environmental background and purposeful 1980s/1990s pop-art elements while remaining visibly related to the rest of town. Do not clone another building background. Plain white panels/pages, default black text and unconsidered white text are prohibited as the design language; white/near-black are reserved for intentional accessible high-contrast roles.
- **Character/location/canon rules:** The result must feel like entering the Visitor’s Centre inside SUNNYVAiLE, not opening a generic orientation website. Existing map and path-bound pre-ruling assets are optional inputs, not naming authority for the replacement composition.
- **Voice/copy rules:** Welcoming, specific and action-true: “choose,” “see,” “step inside,” “start the tour,” “prepare/share a postcard.” Do not say “sent,” “opened,” “joined,” “earned,” or “unlocked” without the owning authoritative event.
- **Required asset states:** New responsive SUNNYVAiLE tourist-information-centre interior masthead; legible canonical map plus named fallback; exact admitted postcard collection; welcome identity/title art; current trailer/media family with alt/captions/controls/failure treatment. Every earlier asset requires exact inventory and current-use authority before reuse.
- **Motion/audio/narration continuity:** Tour/trailer/anthem must be optional, pauseable, keyboard-operable and reduced-motion compatible. No media can obstruct destination choice.
- **Rejected/prohibited patterns:** The prior white-page/front-desk/map/directory grammar; a page-local header approximation or override; arbitrary fonts/type sizes and microscopic eyebrows; the current retired-plum/gold tour pop-up; beige/pink neutral or off-palette shells; plain white panels/default black text/unconsidered white text; boxed-module and generic-card composition; large blank bands; “functional base now, Brand later”; incremental restyling of the rejected candidate; numbered pins; map-memory tests; long generic destination-card rolls; dashboard-like onboarding; postcard/tour gates; and any visual PASS inferred from interaction code or technical tests.
- **Owner decision still required:** Exact responsive composition, artwork, trailer successor/currentness disposition and postcard-family admission. Ali is not asked to choose a generated direction before the design-admission gate passes.

## Technical and operational contract

- **Routes/source files:** `visitors-centre.html`; shared `content/site/sunnyvaile-directory.js`, `sv-global-header.js`, `sv-nav-auth.js`, `sv-welcome-tour.js`, `sv-trailer-player.js`, `ksvl-player.js`, `ai-accent-autowrap.js`; outgoing destination routes.
- **Frontend modules:** `#vc-directory`, map/directory building controls, `#vc-building-card` live reveal, `#vc-card-enter`, Back control, optional welcome-tour query route, trailer mount, postcard workspace. Shared directory code supplies `SV_BUILDINGS` and map/directory rendering.
- **Backend/services/providers:** Static public hosting; shared directory data in client script; trailer/audio assets; Post Office/share/email provider dependencies; Plausible tag. No Centre-owned backend or delivery ledger exists.
- **Data/authoritative stores:** Shared directory is source for building names/routes. Any selection/note/email state observed in browser is temporary/local interface state. The public-promise registry is the owner-status source to consult before promotion, not evidence of downstream completion.
- **Identity/session and persistence:** None required for core orientation. Any identity or postcard lifecycle is a Post Office/Identity handoff.
- **Reward/economy:** Never reward room entry, directory selection, tour start or postcard preparation. A verified referral may later trigger bounded sender/recipient rewards and a referral-only Resident Card background through the shared authoritative identity/reward ledger; these outcomes are currently unverified and held.
- **Privacy/security/safety:** Do not collect postcard body/email or raw session data in Centre analytics. The postcard form/handoff must follow Post Office privacy/consent/retention rules; Centre evidence records only aggregate state after approval.
- **Performance/reliability:** Map, trailer and card imagery require exact-artifact loading and interaction checks. Keep named route fallback usable under map/media/shared-script failure.
- **Fallback/rollback:** If shared directory/map breaks, fail to a clear named fallback/home route; if a destination is held, remove/relabel its promotion rather than disguise it. Roll back only owned copy/state after portfolio reconciliation; no shared script change is authorized here.

## Analytics and customer evidence

- **Meaningful events (proposed; Platform/Privacy approval required):** `visitor_centre_view`, `visitor_directory_selected`, `visitor_map_selected`, `visitor_destination_revealed`, `visitor_destination_handoff`, `visitor_tour_offer_action`, `visitor_postcard_handoff`, `visitor_centre_error`.
- **Privacy-safe properties:** Anonymous destination ID, input method (map/directory), surface, viewport bucket, result/error category and route disposition. Exclude postcard text, email, account data, raw recordings and full session content.
- **Baseline:** Not wired. Existing Plausible tag is not an approved event contract or proof of comprehension.
- **Success/guardrail/failure measures:** Success = clean user explains the room and reaches intended route; guardrails = named-directory parity, no forced handoff, no downstream-lifecycle claim; failure = inaccessible/empty selection, wrong/stale destination, map-only dead end, or unobservable postcard/tour overclaim.
- **Review cadence:** Before entry/reopening promotion; on shared directory/tour/trailer change; monthly post-instrumentation review with qualitative comprehension evidence.

## Dependencies and ownership

- **Parent champion:** Town Entry & Homepage; Visitor’s Centre champion owns room contract and records.
- **Subchampions:** None. Postcard, trailer/tour, directory, and destination owners are dependencies rather than subproducts.
- **Required specialist guilds:** Product/UX, accessibility, frontend/runtime QA, visual/brand, Platform Reliability, Analytics/Privacy; Post Office/Episode Media judges for their handoffs.
- **Upstream dependencies:** Homepage/Start Here, shared directory/map/global navigation, trailer/media, Post Office, analytics/privacy configuration, public-promise registry.
- **Downstream consumers:** Chosen building/product routes and Town Entry orientation.
- **Cross-product conflicts/handoffs:** Centre cannot override a destination's status, shared directory or global tour/reward behavior. Any destination promotion needs owner/readiness reconciliation. The homepage uses Centre as its orientation route but does not own its visual ruling.
- **Freshness/maintenance owner:** Visitor’s Centre champion checks directory/map labels and local recovery on shared dependency changes; Town Entry/Platform coordinate release evidence; destination champions own their availability.

## Acceptance and release

- **Product/content quality:** Clean anonymous new and returning users identify the room/job, choose map or directory, understand the revealed destination, and know the next action.
- **Accuracy/safety/trust:** No copy represents a handoff as send/open/join/reward/confirmed account outcome; every promoted destination matches shared directory and owner readiness.
- **Brand:** Room-first visual grammar and named fallback pass owner review; no numbered-pin/card-wall regression.
- **UX/accessibility:** Exact artifact at desktop and 390×844 covers keyboard/visible focus/focus return/Escape, live announcement, map-directory parity, touch target, zoom/reflow, reduced motion, no-JS/data/media/storage/network recovery, and real mobile Safari.
- **Backend/data/reward:** Directory route binding and unknown/missing data recovery pass; postcard/trailer outcomes remain separately owned and require their provider/product evidence.
- **Visual/media:** Map/room/asset loading, trailer controls/captions/failure and optional audio behavior reviewed on exact candidate; owner visual ruling recorded.
- **Exact candidate/release/public verification:** Local interaction evidence already covers selected map/directory/reveal/return/postcard mechanics and 390×844. A new exact artifact must pass full clean journey; public verification needs the same bounded public-origin suite and approved analytics configuration.
- **Current status/unresolved decisions:** **ALI DIRECTION CAPTURED / CURRENT PUBLIC EXPERIENCE REJECTED / INVENTORY ACTIVE / NO CANDIDATE.** Deterministic clean-state, directory/map recovery, keyboard, storage, responsive, reduced-motion, handoff and bounded native checks characterize useful capabilities in the rejected base only. They do not admit its composition. The eventual replacement must separately pass building experience, Brand/world continuity, product truth, responsive/accessibility, human comprehension, tour/trailer/postcard integration, analytics and exact release/public-origin gates.

## Source trail

- **Product records:** `CHARTER.md`, `state.json`, `backlog.md`, and `launch-deep-dive-2026-07-25.md` in this folder.
- **Shared truth:** Public-promise registry dated 2026-07-25; Town Entry operating specification; D-2026-07-24-026 and D-2026-07-25-044 where relevant.
- **Code/assets observed:** `visitors-centre.html`, named shared scripts, `assets/final_map/sunnyvaile-town-map-final-v5.webp`, `assets/postcards/from-sunnyvaile/pc-welcome.png`, and connected trailer/audio assets. Source presence is not a complete rendered/public verdict.
- **Prevention rules:** BTB-050 (design brief/visitor understanding outrank checklist), BTB-069 (click is not completion), and the 2026-07-25 reopening approval rule.
- **Inference/unknowns:** Existing local/public selection observations do not establish comprehension, a11y recovery, media/share lifecycle, exact current artifact, or owner visual approval.

## Learning scan

- **No new qualifying painpoint:** This was a records-only reconciliation; no build, public action, or newly observed failure occurred. BTB-050 and BTB-069 remain the applicable prevention rules. `operations/painpoints-log.md` remains unchanged because it is outside this cycle's write boundary.
