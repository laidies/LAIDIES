# Town Entry & Homepage — operating specification

**Status:** BUILDING — exact live-route projection consumer independently
ACCEPTED / VERIFIED LOCALLY. This is not a release, campaign, or claim that
receiving products are ready.

## Identity and purpose

- **Product:** LAiDIES Homepage & Town Entry (`/` and the visible `/start-here.html` orientation route).
- **Parent building/product:** LAiDIES public town entry; portfolio-owned shared navigation and discovery dependencies.
- **Product type:** Entry/orientation and discovery service.
- **Audience:** First-time visitors seeking practical AI help, returning visitors seeking the current or an evergreen route, and visitors arriving from a permitted direct link.
- **User job:** Understand what LAiDIES is in one glance, choose one useful route without learning the town first, and later re-enter without stale weekly direction or a false town-wide promise.
- **Why LAiDIES offers it:** Practical AI fluency is the first promise; SUNNYVAiLE and the Rewind Era are the memorable teaching world, not a prerequisite or a gate.
- **Distinct contribution:** A purpose-led, object-world front door that can connect story, reference, practical help, and optional town discovery without posing as a generic product funnel.
- **Explicit non-goals:** It does not complete learning, subscribe someone, create an account, confirm a newsletter, award a reward, validate a downstream service, or authorize reopening/social publication.

## Experience model

- **Diegetic metaphor:** The homepage is the town threshold; Start Here is a visible Visitor’s Centre status doorway with an ordinary Visitor’s Centre link.
- **Ten-second comprehension:** “LAiDIES helps women understand and use AI through stories and practical routes in SUNNYVAiLE. I can start learning, find the current episode, look up one answer, get a bounded practical-help route, or explore the town.” The first obvious safe action must be visible without requiring sign-in or map literacy.
- **Evergreen masthead:** The masthead/hero carries the durable LAiDIES
  promise and stable visitor jobs. It never becomes the weekly episode/news
  billboard. Current episode and current news render only in the separate
  checksum-bound module below.
- **New-user journey:** `/` → practical AI/value statement → one purpose choice → receiving route. “New in town?” may introduce the method and route to the Visitor’s Centre; it must not require a tour, postcard, Resident Card, or membership.
- **Returning-user journey:** `/` → current episode/current-news cue only when its data and receiving route are current and admitted → direct route; otherwise an evergreen reference/orientation route. Any resume cue is presentational until authenticated, authoritative progress exists.
- **Anonymous/signed-in differences:** Anonymous visitors retain all core orientation and learning access. Sign-in links may offer a handoff only; no entry text may imply that account restoration, card, Closet, rewards, community posting, or cross-device continuation is proven. `window.svShowResume` is a future hook, not completion evidence.
- **Mobile/desktop/accessibility behaviour:** The same named primary choices and destinations must remain available at mobile and desktop widths. The mobile menu must expose and close the same navigation; keyboard focus, Escape, visible focus, landmarks, target size, image alternatives, zoom/reflow and reduced-motion behavior are release gates, not inferred from source presence. Responsive quality is continuous across desktop, intermediate and representative mobile widths: no random blank fields, equal-height stretching, destructive crops, orphaned labels/actions, overlay collisions or avoidable scroll burden. Every major visible region needs a clear job, and new/returning journeys must remain intuitive after each reflow.
- **Empty/loading/error/offline/retry states:** If the shared checksum-bound projection cannot supply a fresh owner-admitted current route, retain static evergreen/previously labelled content and never call it current. Missing, stale, conflicting, tampered or transport-failed projection states contract to zero current promotions and unavailable status-check routes. If a map, audio, analytics, Post Office, or signed-in-resume integration fails, core navigation remains usable and the UI must not report subscription, playback, sign-in, progress, or completion it cannot observe. `/start-here.html` always retains a visible ordinary Visitor’s Centre link.

## Mechanics and rules

- **Inputs:** Intent choice, primary/mobile navigation, current-episode data, district/map selection, optional reference query, local tour display state, optional newsletter email handoff.
- **Core actions:** Choose a labelled intent; open an admitted destination; browse the optional map/district view; submit a reference query as a route to the Library; request the weekly Postcard via Buttondown.
- **Authoritative completion event:** An intentional arrival at a correctly labelled receiving route is the only entry-level completion. It is not completion of the receiving product, a newsletter subscription, play, tour, learning task, reward, or account action.
- **Outputs/visible result:** A clear next destination, or an honest unavailable/evergreen alternative. The homepage may show local tour paint only as device-local state; it cannot turn visits into a verified ritual or durable reward.
- **Replay/return loop:** Return to a current route only after current-data validation; otherwise offer Library/Visitor’s Centre evergreen re-entry. Do not use a local counter as account memory.
- **Promotion admission rules:**
  0. Homepage current/readiness presentation consumes Platform
     `readiness-current-projection` v1. Missing, stale, conflicting, tampered,
     incomplete or release-mismatched receipts fail closed; the page does not
     duplicate destination-owner prose.
  1. A promoted route needs a named owning champion, exact route, current public-promise-registry disposition, and one visible limitation where its receiving completion is not verified.
  2. `HOLD`, `FIX BEFORE PROMOTION`, broken, or unverified service/reward/account claims cannot appear as a broad ready-to-use promise. A temporary hold, limitation or evergreen alternative protects the visitor while the owning product remains `BUILDING` or `BLOCKED — BUILD REMAINS REQUIRED`; it does not complete or silently remove approved intent (D-2026-07-26-055/056).
  3. “Current,” “latest,” “this week,” Breaking, Daily, new episode, account restoration, newsletter, community and reward wording require exact data/service evidence at the candidate. A static fallback is not current proof.
  4. The Breaking is conditional: show it prominently only for a qualified live story and collapse it completely on a clear day. The Daily may link only to its current explanation. The Weekly and The Tribune remain NewsStand ritual routes. This is a locked direction awaiting responsive composition/implementation, not a current-page claim (D-2026-07-25-043).
  5. A successful click, HTTP 200, or page load is not downstream completion (BTB-069). Entry cannot launder an unresolved child journey into a town promise.
- **Current-episode producer contract:** Town Entry consumes the whole
  checksum-bound `EPX-HOME-CURRENT-EPISODE-v1` record supplied by Weekly
  Episodes and validated by Platform. Number, title, summary, image/alt,
  nullable read/watch/listen links, release date, song or `null`, accepted
  card-pack key or `null`, fallback and authority/checksum swap atomically.
  Town Entry never reconstructs or independently patches weekly truth.
- **Abuse/edge/race cases:** Do not send search text, email, identity, local-storage contents, raw replay, or private prompts to entry analytics. Duplicate/invalid Buttondown requests and blocked pop-up/iframe states remain service outcomes; retries must explain that confirmation occurs in the inbox. Map/modal-like focus return and rapid mobile-menu interaction require explicit test evidence.

## Content and learning

- **Format-specific job:** Route a visitor into accurate, purposeful learning or help; it does not itself certify a lesson or assessment.
- **Learning/behaviour outcome:** The visitor can name the product's practical-AI purpose, select a suitable next route, and distinguish optional town exploration from required learning.
- **Correct mental model:** LAiDIES is a learning town, not a membership gate or a promise that every building is currently operational. The Rewind Era analogy aids recall but does not replace precise AI explanation in receiving content.
- **Misconceptions addressed:** “I must do the tour first”; “a Resident Card silently subscribes me”; “a visit earned a reward”; “current means any hard-coded episode”; and “a town map proves each destination is ready.”
- **Evidence/date sensitivity:** Episode and news labels are freshness-sensitive. AI-news promotion inherits the NewsStand source/date/empty-state contract. Current AI teaching claims belong to the receiving product and require primary-source-first evidence under D-2026-07-25-044.
- **Analogy and limits:** “Town threshold” communicates orientation and choice; it does not mean a visitor has a real-world address, membership, or access to every service.
- **Assessment/transfer evidence:** A clean-user comprehension prompt—what is this, what can I do, why choose it, what happens next?—plus verified receiving-route arrival. Click-through alone is not success.
- **Relationship to other products:** Visitor’s Centre owns the front-desk room. Library owns answer quality; NewsStand owns current publications; Chick Flicks/Episode Media own episode availability; FAiRY owns safe answer quality; Post Office owns email lifecycle; Platform owns artifact/route evidence. Town Entry merely admits and labels their handoffs.
- **Next useful experience:** The smallest admitted route for an unsure visitor is Visitor’s Centre → named directory → an intentional destination; the final useful action remains the receiving product's contract.

## Visual, voice and media

- **Approved direction:** Practical value first; editorial type, town imagery
  and object-world cues support—not replace—labelled navigation. Preserve the
  current luminous-dusk masthead as the selected baseline winner, including its
  exact image and composition; do not rebuild it. Reject white-background
  redesigns, muddy/grungy building filters, glamour-cartoon and sticker-comic
  decoration. Later improvements are conservative: stronger 90s colour in UI
  accents, clearer hierarchy, less duplication and replacement only of art
  proved stale. Brand must translate this ruling into implementation rules
  before visual changes. Preserve the live Jost/rectangular homepage
  topbar as the current entry reference; do not infer that an older shared
  header is canonical (BTB prevention rule, 2026-07-25).
- **Character/location/canon rules:** SUNNYVAiLE is an inviting learning town in the Rewind Era. Do not turn town imagery into proof of availability, membership, rewards, or a published reopening.
- **Voice/copy rules:** Warm, direct, specific and non-gatekeeping. Say “request,” “go to,” “open,” “play,” or “continue on this device” only when that is what the system can observe. Avoid filler urgency and generic lifestyle language.
- **Required asset states:** Hero
  `assets/sunnyvaile-streets/main-street-dusk.webp`, SHA
  `4efec0f4...d0b6b19d3b`, is KEEP in its exact current masthead composition;
  map `assets/final_map/sunnyvaile-town-map-final-v5.webp`; named/meaningful
  alt text; responsive crop and loading evidence. Weekly media needs an exact
  current artifact and receiving-product admission.
- **Legacy-art state:** Existing FAiRY Godmother and building/town assets are
  implementation evidence only. Brand must classify each exact Homepage use
  `KEEP / ADAPT / REJECT` after the sitewide ruling; repeated use does not
  establish approval.
- **Motion/audio/narration continuity:** Anthem/audio controls require selected-track playback and recovery evidence; no autoplay or required media. Motion and tour affordances must honor reduced motion and never block a route.
- **Rejected/prohibited patterns:** Numbered town-memory tests, a long all-building chore list in the hero, decorative nostalgia without useful route labels, stale shared chrome, broad “town is open” copy, and any reopening campaign asset/copy outside the owner-approved triad.
- **Owner decisions still required:** Exact homepage primary hierarchy after clean-user evidence; responsive placement/visual direction for The Breaking/The Daily; any reopening website/copy/image approval.

## Technical and operational contract

- **Routes/source files:** `index.html`, `start-here.html`, `content/site/homepage.js`, `content/site/sv-global-header.js`, `content/site/sv-nav-auth.js`, `content/site/sv-welcome-tour.js`, `content/site/sv-tour-checkin.js`, `content/site/sunnyvaile-directory.js` and the exact receiving routes.
- **Frontend modules:** Homepage mobile-menu/filter/map/audio and readiness/current logic live in `homepage.js`; `start-here.html` visibly consumes the same shared readiness receiver without redirecting; global header/nav and directory are shared dependencies.
- **Backend/services/providers:** Static public hosting; Platform readiness
  projection v1 compiled from owner receipts; Buttondown embedded subscription
  endpoint; Plausible/Clarity tags. No entry-specific backend completion
  service is established.
- **Data/authoritative stores:** Platform projection v1 is the entry consumer
  contract; its production authority depends on freshness-bound destination,
  Episode and NewsStand owner receipts plus exact artifact binding. The
  current shared envelope truthfully contains null receipt paths, 17 held
  destinations and zero promotable current items. Browser
  `localStorage` from the tour and other child products is device-local only;
  it is not an entry ledger.
- **Identity/session and persistence:** Sign-in is a Post Office/identity handoff. No authoritative account, two-device, reward, or completed-tour persistence is proven in entry scope.
- **Reward/economy:** None. A tour visit/check-in must not be promoted as a verified earned entitlement.
- **Privacy/security/safety:** No email/query/identity/session content in product analytics. Buttondown consent and confirmation remain Post Office-owned; Clarity/Plausible configuration needs approved privacy review before entry evidence is used.
- **Performance/reliability:** Hero and map are significant media. Test actual candidate load, responsive image behavior, header/menu and map failure; a static link test is insufficient for runtime data or interaction.
- **Fallback/rollback:** Remove a failing/held promoted card or revert it to its last truthful evergreen destination; retain plain links and redirect fallback. Roll back campaign language by keeping all reopening surfaces at HOLD; no public removal/publish action belongs to this product spec.

## Analytics and customer evidence

- **Meaningful events (proposed; Platform/Privacy approval required):** `entry_viewed`, `entry_path_selected`, `entry_nav_opened`, `entry_destination_opened`, `entry_route_failed`, and controlled newsletter outcome states. Receiving-product completion events remain owned by receivers.
- **Privacy-safe properties:** Anonymous route key, surface, viewport bucket, route disposition, and error category only. Exclude email, query text, account identifiers, raw session recordings, postcard text, prompts, and local state.
- **Baseline:** Not wired. Existing Plausible/Clarity tags are not a product event contract or baseline.
- **Success/guardrail/failure measures:** Success = clean-user comprehension plus correct admitted route arrival; guardrails = no false readiness language, accessible first route, no blocked core path; failure = exit/dead-end/error or high selection into a labelled-held destination. Click-through is insufficient.
- **Evidence inputs/review cadence:** Per episode/current-data change and before campaign; monthly route/mobile/header review after instrumentation; use a small qualitative comprehension sample alongside aggregates.

## Dependencies and ownership

- **Parent champion:** Portfolio Orchestrator; Town Entry champion owns this spec.
- **Subchampion/handoff:** Visitor’s Centre owns front-desk interaction; Platform Reliability owns artifact/public-origin proof; NewsStand owns news validity; Post Office owns email; each destination champion owns its availability.
- **Required specialist guilds:** Product/UX, accessibility, frontend/runtime QA, analytics/privacy, brand/visual, identity/rewards where local state is consumed, receiving-product owners, and release reliability; no specialist is authorized to publish.
- **Upstream dependencies:** Public-promise registry, episode index, shared header/directory/tour, asset pipeline, Buttondown, analytics configuration, NewsStand/episode release states.
- **Weekly episode interface:** Exact dependency
  `operations/product-stewards/episode-experience/ownership-handoff-town-entry-current-episode-module-2026-07-26.md`,
  SHA `53cb1c49...d2d6f2`; specified/queued, not implementation authority.
- **Downstream consumers:** Visitor’s Centre, Library, NewsStand, Chick Flicks, FAiRY, MAiKEOVER, Post Office and town-directory destinations.
- **Conflicts/handoffs:** Entry must consume receiving-product limitations rather than overwrite their status. The Visitor’s Centre room-first direction cannot be replaced with homepage card patterns. The homepage currently consumes shared tour/charm/auth hooks whose device-local rewards and token-derived “Resident” presentation exceed entry-level completion; Functionality & Platform, Identity/Rewards and each producer must rule that contract. The social/reopening triad needs Ali's exact website, copy and image approval.
- **Freshness/maintenance owner:** Town Entry champion checks labels/routes each episode/release; receiving champions update their status; Platform binds evidence to exact artifact/deployment.

## Acceptance and release

- **Product/content quality:** Clean first and returning visitors accurately describe the value, choose a purpose, and know the next action; only admitted destinations are promoted.
- **Accuracy/safety/trust:** Current/news/episode labels match the exact source and receiving route; Buttondown and account language describe handoff only; no reward/lifecycle overclaim.
- **Brand:** Practical AI value leads, town world supports; no generic funnel, stale chrome or unapproved reopening creative.
- **UX/accessibility:** Desktop, intermediate-width and representative mobile checks cover hero choice, nav/menu/Escape/focus, map/district interaction, redirect fallback, zoom/reflow, keyboard, reduced motion, image alt, error/retry and no-JS/service degradation. Continuous-page visual review must also verify section transitions, content-end positions, total page/section length, image subject and crop, peer-control geometry/state, sticky/overlay collisions and the complete first-time and returning flows. Random blank fields, manufactured height, confusing responsive recomposition, misleading interaction styling or excessive scrolling caused by avoidable duplication are blocking failures even when element counts and horizontal-overflow checks pass.
- **Backend/data/reward:** Episode-index success and failure states tested; no entry reward claim; controlled Buttondown lifecycle requires authorized Post Office protocol.
- **Visual/media:** Exact candidate at desktop/390px compared with current homepage authority; real audio control and asset loading only where promoted.
- **Exact candidate/release/public verification:** Build an exact artifact, run clean browser journeys, then test the same bounded flow on the deployed origin. Per D-2026-07-24-026, content readiness, deployed readiness and channel publication are distinct. Social/reopening remains HOLD unless Ali approves exact website + copy + image and a real publication URL/timestamp exists.
- **Current status/unresolved decisions:** **BUILDING; exact route candidate VERIFIED LOCALLY.** The three-job hierarchy, shared projection binding, negative matrix, Chromium reflow/keyboard behavior and clean artifact inclusion are proved for the frozen local hashes. Native accessibility, human comprehension, non-null owner receipts, public-origin behavior, live-news responsive composition, sitewide visual ruling and reopening triad remain open.

## Source trail

- **Locked/standing decisions:** D-2026-07-24-026 (release versus publication); D-2026-07-25-043 (conditional The Breaking and The Daily homepage direction); D-2026-07-25-044 (teaching accuracy); public-promise registry dated 2026-07-25.
- **Product records:** `CHARTER.md`, `state.json`, `backlog.md`, `launch-deep-dive-2026-07-25.md` in this folder; Visitor’s Centre dossier for front-desk handoff.
- **Code/assets observed:** `index.html`, `start-here.html`, `content/site/homepage.js`, shared scripts and named hero/map assets above. Source facts are not rendered/public verification.
- **Prevention rules:** BTB-050 (experience brief outranks feature checklist), BTB-069 (click is not completion), shared-header continuity rule (2026-07-25), and reopening publication approval failure (2026-07-25).
- **Inference/unknowns:** The entry hierarchy and failure behavior are now browser-observed locally. Real-user comprehension, native Safari/assistive technology, non-null current-data correction/cache behavior, newsletter lifecycle, analytics configuration and exact public-origin flow remain unverified.

## Learning scan

- **No new qualifying painpoint:** The live integration reused BTB-142's
  cross-system ID mapping and existing fail-closed/current-claim prevention
  rules. Removing stale weekly claims was an expected part of the receiver
  integration rather than a new non-obvious failure. The canonical painpoint
  ledger remains unchanged.
