# Visitor’s Centre — operating specification

**Status:** RECOVERY — PRIOR FUNCTIONAL BASE REJECTED BY ALI; INTENDED
EXPERIENCE/FUNCTIONALITY/SPEC WORK ACTIVE; REPLACEMENT VISUAL PRODUCTION HELD
FOR THE SITEWIDE BRAND DIRECTION. Prior interaction, state, accessibility and
native evidence remains technical characterization only. It is not a product,
Brand, integration, release or public candidate.

## Identity and purpose

- **Product:** Visitor’s Centre (`/visitors-centre.html`).
- **Parent building/product:** SUNNYVAiLE town entry; complementary to, but not a replacement for, the homepage.
- **Product type:** Orientation/discovery room and handoff service.
- **Audience:** New or returning visitors who want a clear introduction or a named town destination without memorizing the map.
- **User job:** Understand the room's purpose, discover a named building through the wall map or directory, and leave through one intentional next route.
- **Why LAiDIES offers it:** It makes orientation welcoming and legible without turning it into mandatory onboarding before practical AI learning.
- **Distinct contribution:** A colourful, vibrant and unmistakably LAiDIES arrival place in which the environment itself performs orientation. The prior neutral white-page/front-desk/map/directory composition was rejected and cannot be revived by reskinning it.
- **Explicit non-goals:** The Centre does not make a downstream service ready, subscribe/mail/open/join/refer someone, issue rewards, require a tour/postcard/sign-in, or certify account persistence.

## Experience model

- **Diegetic metaphor:** Not yet selected. The sitewide Brand direction must arrive before the Visitor owner may resume visual selection. Map, named directory and destination-reveal capabilities remain requirements, but they do not authorize the rejected front-desk composition, a boxed web layout or an independently selected replacement style.
- **Ten-second comprehension:** “This is the front desk. I can choose a building by its name or map, see what happens there, and step inside. The tour and postcard are optional.”
- **New-user journey:** Arrive → read orientation/starter route → choose map or directory → receive live destination reveal → choose “Step inside” or return to map. The visitor need not complete the tour, trailer, postcard or account flow.
- **Returning-user journey:** Reopen the room → choose a destination directly; local prior selection may be used for presentation only and cannot imply a durable personal history. A returning visitor receives a useful continuation only if the destination is currently admitted by its owner.
- **Anonymous/signed-in differences:** Core room, named directory and destination handoff work anonymously. Postcard/tour/sign-in are invitations. The room never claims a selected postcard was sent/opened, that a recipient joined, or that a visit became a reward.
- **Mobile/desktop/accessibility behaviour:** At all widths, the named selector/directory is available without precise map tapping. A selection updates the `aria-live` destination reveal; keyboard users can reach selection, reveal, enter CTA and Back to map. Focus must return to the selection trigger after Back/Escape where a modal-like state exists. Test 390×844 plus representative desktop; source responsive CSS alone is not proof.
- **Empty/loading/error/offline/retry states:** If map/directory/shared data cannot load, display a plain named-destination fallback or a clear link back to homepage; never leave an empty room pretending selection worked. If trailer/tour/audio fails, retain all route choice. If postcard share/email fails, say the handoff was not confirmed and offer the Post Office route; do not retain/submit private text without the owning service's contract.

## Mechanics and rules

- **Inputs:** Map/tap or named-directory selection, destination reveal CTA, tour/trailer choice, anthem control, postcard card/note/email/share handoff.
- **Core actions:** Select a building; inspect its name/address/one-liner/mechanics; enter its route; return to map; optionally start/decline/defer tour; optionally begin a postcard handoff.
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
- **Learning/behaviour outcome:** A newcomer can say what the Centre is, choose a building by name, and explain what will happen after the CTA.
- **Correct mental model:** The map is a guide, not a readiness map; the directory is a direct accessible alternative; a handoff is not a service lifecycle or membership event.
- **Misconceptions addressed:** “I have to know the map/numbered pin”; “the tour is required”; “postcard means sent”; “building selection earns a reward”; “a town route means every product is fully ready.”
- **Evidence/date sensitivity:** Building labels/routes and current episode/trailer availability depend on shared directory/media records. Receiving learning claims stay with their owners and inherit D-2026-07-25-044 where applicable.
- **Analogy and limits:** A visitor centre metaphor explains welcome/orientation; it does not mean physical service fulfilment, identity verification, or a concierge who can guarantee every destination.
- **Assessment/transfer evidence:** Clean-state comprehension asks the visitor to identify the room, name a choice path, say what the CTA will do, and reach a deliberately chosen route. Selection count alone is not comprehension.
- **Relationship to other products:** Town Entry owns homepage/Start Here; shared directory/map/header/tour are Platform/Town Entry dependencies; Post Office owns postcard lifecycle; Episode Media owns trailer; destination champions own their final experiences.
- **Next useful experience:** A deliberately selected, admitted destination—not a forced tour, postcard or sign-in.

## Visual, voice and media

- **Approved direction:** NONE. Ali rejected the prior neutral room-first/boxed composition and then ruled that broader Visitor visual production must wait for the sitewide Brand direction. Pre-ruling exploratory specimens are unadmitted Brand-championship inputs only; they are not an owner selection or implementation target.
- **Character/location/canon rules:** The result must feel like entering the Visitor’s Centre inside SUNNYVAiLE, not opening a generic orientation website. Existing map and path-bound pre-ruling assets are optional inputs, not naming authority for the replacement composition.
- **Voice/copy rules:** Welcoming, specific and action-true: “choose,” “see,” “step inside,” “start the tour,” “prepare/share a postcard.” Do not say “sent,” “opened,” “joined,” “earned,” or “unlocked” without the owning authoritative event.
- **Required asset states:** Legible map plus named fallback; welcome postcard `assets/postcards/from-sunnyvaile/pc-welcome.png`; welcome title art; optional trailer/audio state with alt/caption/control/failure treatment.
- **Motion/audio/narration continuity:** Tour/trailer/anthem must be optional, pauseable, keyboard-operable and reduced-motion compatible. No media can obstruct destination choice.
- **Rejected/prohibited patterns:** The prior white-page/front-desk/map/directory grammar; neutral or off-palette shells; boxed-module and generic-card composition; “functional base now, Brand later”; incremental restyling of the rejected candidate; numbered pins; map-memory tests; long generic destination-card rolls; dashboard-like onboarding; postcard/tour gates; and any visual PASS inferred from interaction code or technical tests.
- **Owner decision still required:** Sitewide Brand direction, through the controlled championship. Ali is not asked to choose among independently generated Visitor directions. A later Visitor-specific gate requires an explicit bounded continuation after the sitewide direction.

## Technical and operational contract

- **Routes/source files:** `visitors-centre.html`; shared `content/site/sunnyvaile-directory.js`, `sv-global-header.js`, `sv-nav-auth.js`, `sv-welcome-tour.js`, `sv-trailer-player.js`, `ksvl-player.js`, `ai-accent-autowrap.js`; outgoing destination routes.
- **Frontend modules:** `#vc-directory`, map/directory building controls, `#vc-building-card` live reveal, `#vc-card-enter`, Back control, optional welcome-tour query route, trailer mount, postcard workspace. Shared directory code supplies `SV_BUILDINGS` and map/directory rendering.
- **Backend/services/providers:** Static public hosting; shared directory data in client script; trailer/audio assets; Post Office/share/email provider dependencies; Plausible tag. No Centre-owned backend or delivery ledger exists.
- **Data/authoritative stores:** Shared directory is source for building names/routes. Any selection/note/email state observed in browser is temporary/local interface state. The public-promise registry is the owner-status source to consult before promotion, not evidence of downstream completion.
- **Identity/session and persistence:** None required for core orientation. Any identity or postcard lifecycle is a Post Office/Identity handoff.
- **Reward/economy:** None. Never grant/claim a reward for room entry, directory selection, tour start or postcard preparation.
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
- **Current status/unresolved decisions:** **RECOVERY / VISUAL PRODUCTION HELD.** Deterministic clean-state, directory/map recovery, keyboard, storage, responsive, reduced-motion, handoff and bounded native checks characterize useful capabilities in the rejected base only. They do not admit its composition. Intended-experience/functionality/spec recovery may continue. Visual selection and implementation wait for the sitewide Brand direction and a bounded continuation. The eventual replacement must separately pass building experience, Brand/world continuity, product truth, responsive/accessibility, human comprehension, technical integration, analytics and exact release/public-origin gates.

## Source trail

- **Product records:** `CHARTER.md`, `state.json`, `backlog.md`, and `launch-deep-dive-2026-07-25.md` in this folder.
- **Shared truth:** Public-promise registry dated 2026-07-25; Town Entry operating specification; D-2026-07-24-026 and D-2026-07-25-044 where relevant.
- **Code/assets observed:** `visitors-centre.html`, named shared scripts, `assets/final_map/sunnyvaile-town-map-final-v5.webp`, `assets/postcards/from-sunnyvaile/pc-welcome.png`, and connected trailer/audio assets. Source presence is not a complete rendered/public verdict.
- **Prevention rules:** BTB-050 (design brief/visitor understanding outrank checklist), BTB-069 (click is not completion), and the 2026-07-25 reopening approval rule.
- **Inference/unknowns:** Existing local/public selection observations do not establish comprehension, a11y recovery, media/share lifecycle, exact current artifact, or owner visual approval.

## Learning scan

- **No new qualifying painpoint:** This was a records-only reconciliation; no build, public action, or newly observed failure occurred. BTB-050 and BTB-069 remain the applicable prevention rules. `operations/painpoints-log.md` remains unchanged because it is outside this cycle's write boundary.
