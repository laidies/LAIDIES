# Town Entry & Homepage — operating specification

**Status:** SPECIFIED — reconciled 2026-07-25. This is the entry contract, not a release, campaign, or claim that receiving products are ready.

## Identity and purpose

- **Product:** LAiDIES Homepage & Town Entry (`/` and the legacy `/start-here.html` handoff).
- **Parent building/product:** LAiDIES public town entry; portfolio-owned shared navigation and discovery dependencies.
- **Product type:** Entry/orientation and discovery service.
- **Audience:** First-time visitors seeking practical AI help, returning visitors seeking the current or an evergreen route, and visitors arriving from a permitted direct link.
- **User job:** Understand what LAiDIES is in one glance, choose one useful route without learning the town first, and later re-enter without stale weekly direction or a false town-wide promise.
- **Why LAiDIES offers it:** Practical AI fluency is the first promise; SUNNYVAiLE and the Rewind Era are the memorable teaching world, not a prerequisite or a gate.
- **Distinct contribution:** A purpose-led, object-world front door that can connect story, reference, practical help, and optional town discovery without posing as a generic product funnel.
- **Explicit non-goals:** It does not complete learning, subscribe someone, create an account, confirm a newsletter, award a reward, validate a downstream service, or authorize reopening/social publication.

## Experience model

- **Diegetic metaphor:** The homepage is the town threshold; Start Here is a legacy sign that forwards to the Welcome Wagon Visitor's Centre.
- **Ten-second comprehension:** “LAiDIES helps women understand and use AI through stories and practical routes in SUNNYVAiLE. I can start learning, find the current episode, look up one answer, get a bounded practical-help route, or explore the town.” The first obvious safe action must be visible without requiring sign-in or map literacy.
- **New-user journey:** `/` → practical AI/value statement → one purpose choice → receiving route. “New in town?” may introduce the method and route to the Visitor's Centre; it must not require a tour, postcard, Resident Card, or membership.
- **Returning-user journey:** `/` → current episode/current-news cue only when its data and receiving route are current and admitted → direct route; otherwise an evergreen reference/orientation route. Any resume cue is presentational until authenticated, authoritative progress exists.
- **Anonymous/signed-in differences:** Anonymous visitors retain all core orientation and learning access. Sign-in links may offer a handoff only; no entry text may imply that account restoration, card, Closet, rewards, community posting, or cross-device continuation is proven. `window.svShowResume` is a future hook, not completion evidence.
- **Mobile/desktop/accessibility behaviour:** The same named primary choices and destinations must remain available at mobile and desktop widths. The mobile menu must expose and close the same navigation; keyboard focus, Escape, visible focus, landmarks, target size, image alternatives, zoom/reflow and reduced-motion behavior are release gates, not inferred from source presence.
- **Empty/loading/error/offline/retry states:** If `/content/episode-index.json` cannot supply a verified current route, retain static evergreen/previously labelled content and never call it current. If a map, audio, analytics, Buttondown, or signed-in-resume integration fails, core navigation remains usable and the UI must not report subscription, playback, sign-in, progress, or completion it cannot observe. `/start-here.html` retains a visible ordinary link when redirect is blocked.

## Mechanics and rules

- **Inputs:** Intent choice, primary/mobile navigation, current-episode data, district/map selection, optional reference query, local tour display state, optional newsletter email handoff.
- **Core actions:** Choose a labelled intent; open an admitted destination; browse the optional map/district view; submit a reference query as a route to the Library; request the weekly Postcard via Buttondown.
- **Authoritative completion event:** An intentional arrival at a correctly labelled receiving route is the only entry-level completion. It is not completion of the receiving product, a newsletter subscription, play, tour, learning task, reward, or account action.
- **Outputs/visible result:** A clear next destination, or an honest unavailable/evergreen alternative. The homepage may show local tour paint only as device-local state; it cannot turn visits into a verified ritual or durable reward.
- **Replay/return loop:** Return to a current route only after current-data validation; otherwise offer Library/Visitor's Centre evergreen re-entry. Do not use a local counter as account memory.
- **Promotion admission rules:**
  1. A promoted route needs a named owning champion, exact route, current public-promise-registry disposition, and one visible limitation where its receiving completion is not verified.
  2. `HOLD`, `HIDE/LABEL`, `FIX BEFORE PROMOTION`, broken, or unverified service/reward/account claims cannot appear as a broad ready-to-use promise; hide, label, or replace with an admitted evergreen alternative.
  3. “Current,” “latest,” “this week,” Breaking, Daily, new episode, account restoration, newsletter, community and reward wording require exact data/service evidence at the candidate. A static fallback is not current proof.
  4. The Breaking is conditional: show it prominently only for a qualified live story and collapse it completely on a clear day. The Daily may link only to its current explanation. The Weekly and The Tribune remain NewsStand ritual routes. This is a locked direction awaiting responsive composition/implementation, not a current-page claim (D-2026-07-25-043).
  5. A successful click, HTTP 200, or page load is not downstream completion (BTB-069). Entry cannot launder an unresolved child journey into a town promise.
- **Abuse/edge/race cases:** Do not send search text, email, identity, local-storage contents, raw replay, or private prompts to entry analytics. Duplicate/invalid Buttondown requests and blocked pop-up/iframe states remain service outcomes; retries must explain that confirmation occurs in the inbox. Map/modal-like focus return and rapid mobile-menu interaction require explicit test evidence.

## Content and learning

- **Format-specific job:** Route a visitor into accurate, purposeful learning or help; it does not itself certify a lesson or assessment.
- **Learning/behaviour outcome:** The visitor can name the product's practical-AI purpose, select a suitable next route, and distinguish optional town exploration from required learning.
- **Correct mental model:** LAiDIES is a learning town, not a membership gate or a promise that every building is currently operational. The Rewind Era analogy aids recall but does not replace precise AI explanation in receiving content.
- **Misconceptions addressed:** “I must do the tour first”; “a Resident Card silently subscribes me”; “a visit earned a reward”; “current means any hard-coded episode”; and “a town map proves each destination is ready.”
- **Evidence/date sensitivity:** Episode and news labels are freshness-sensitive. AI-news promotion inherits the NewsStand source/date/empty-state contract. Current AI teaching claims belong to the receiving product and require primary-source-first evidence under D-2026-07-25-044.
- **Analogy and limits:** “Town threshold” communicates orientation and choice; it does not mean a visitor has a real-world address, membership, or access to every service.
- **Assessment/transfer evidence:** A clean-user comprehension prompt—what is this, what can I do, why choose it, what happens next?—plus verified receiving-route arrival. Click-through alone is not success.
- **Relationship to other products:** Visitor's Centre owns the front-desk room. Library owns answer quality; NewsStand owns current publications; Chick Flicks/Episode Media own episode availability; FAiRY owns safe answer quality; Post Office owns email lifecycle; Platform owns artifact/route evidence. Town Entry merely admits and labels their handoffs.
- **Next useful experience:** The smallest admitted route for an unsure visitor is Visitor's Centre → named directory → an intentional destination; the final useful action remains the receiving product's contract.

## Visual, voice and media

- **Approved direction:** Practical value first; candy palette, editorial type, full-bleed town imagery and object-world cues support—not replace—labelled navigation. Preserve the live Jost/rectangular homepage topbar as the current entry reference; do not infer that an older shared header is canonical (BTB prevention rule, 2026-07-25).
- **Character/location/canon rules:** SUNNYVAiLE is an inviting learning town in the Rewind Era. Do not turn town imagery into proof of availability, membership, rewards, or a published reopening.
- **Voice/copy rules:** Warm, direct, specific and non-gatekeeping. Say “request,” “go to,” “open,” “play,” or “continue on this device” only when that is what the system can observe. Avoid filler urgency and generic lifestyle language.
- **Required asset states:** Hero `assets/sunnyvaile-streets/main-street-dusk.webp`; map `assets/final_map/sunnyvaile-town-map-final-v5.webp`; named/meaningful alt text; responsive crop and loading evidence. Weekly media needs an exact current artifact and receiving-product admission.
- **Motion/audio/narration continuity:** Anthem/audio controls require selected-track playback and recovery evidence; no autoplay or required media. Motion and tour affordances must honor reduced motion and never block a route.
- **Rejected/prohibited patterns:** Numbered town-memory tests, a long all-building chore list in the hero, decorative nostalgia without useful route labels, stale shared chrome, broad “town is open” copy, and any reopening campaign asset/copy outside the owner-approved triad.
- **Owner decisions still required:** Exact homepage primary hierarchy after clean-user evidence; responsive placement/visual direction for The Breaking/The Daily; any reopening website/copy/image approval.

## Technical and operational contract

- **Routes/source files:** `index.html`, `start-here.html`, `content/site/homepage.js`, `content/site/sv-global-header.js`, `content/site/sv-nav-auth.js`, `content/site/sv-welcome-tour.js`, `content/site/sv-tour-checkin.js`, `content/site/sunnyvaile-directory.js` and the exact receiving routes.
- **Frontend modules:** Homepage mobile-menu/filter/map/audio/weekly-current logic lives in `homepage.js`; `start-here.html` uses meta and `location.replace` to `/visitors-centre.html`; global header/nav and directory are shared dependencies.
- **Backend/services/providers:** Static public hosting; `/content/episode-index.json`; Buttondown embedded subscription endpoint; Plausible/Clarity tags. No entry-specific backend completion service is established.
- **Data/authoritative stores:** Published episode index is the source for current episode selection. Browser `localStorage` from the tour and other child products is device-local only; it is not an entry ledger. The public-promise registry governs admission evidence, not runtime routing by itself.
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
- **Subchampion/handoff:** Visitor's Centre owns front-desk interaction; Platform Reliability owns artifact/public-origin proof; NewsStand owns news validity; Post Office owns email; each destination champion owns its availability.
- **Required specialist guilds:** Product/UX, accessibility, frontend/runtime QA, analytics/privacy, brand/visual, and release reliability; no specialist is authorized to publish.
- **Upstream dependencies:** Public-promise registry, episode index, shared header/directory/tour, asset pipeline, Buttondown, analytics configuration, NewsStand/episode release states.
- **Downstream consumers:** Visitor's Centre, Library, NewsStand, Chick Flicks, FAiRY, MAiKEOVER, Post Office and town-directory destinations.
- **Conflicts/handoffs:** Entry must consume receiving-product limitations rather than overwrite their status. The Visitor's Centre room-first direction cannot be replaced with homepage card patterns. The social/reopening triad needs Ali's exact website, copy and image approval.
- **Freshness/maintenance owner:** Town Entry champion checks labels/routes each episode/release; receiving champions update their status; Platform binds evidence to exact artifact/deployment.

## Acceptance and release

- **Product/content quality:** Clean first and returning visitors accurately describe the value, choose a purpose, and know the next action; only admitted destinations are promoted.
- **Accuracy/safety/trust:** Current/news/episode labels match the exact source and receiving route; Buttondown and account language describe handoff only; no reward/lifecycle overclaim.
- **Brand:** Practical AI value leads, town world supports; no generic funnel, stale chrome or unapproved reopening creative.
- **UX/accessibility:** Desktop and representative mobile checks cover hero choice, nav/menu/Escape/focus, map/district interaction, redirect fallback, zoom/reflow, keyboard, reduced motion, image alt, error/retry and no-JS/service degradation.
- **Backend/data/reward:** Episode-index success and failure states tested; no entry reward claim; controlled Buttondown lifecycle requires authorized Post Office protocol.
- **Visual/media:** Exact candidate at desktop/390px compared with current homepage authority; real audio control and asset loading only where promoted.
- **Exact candidate/release/public verification:** Build an exact artifact, run clean browser journeys, then test the same bounded flow on the deployed origin. Per D-2026-07-24-026, content readiness, deployed readiness and channel publication are distinct. Social/reopening remains HOLD unless Ali approves exact website + copy + image and a real publication URL/timestamp exists.
- **Current status/unresolved decisions:** **SPECIFIED.** Existing source and limited artifact/public route evidence do not prove clean journeys. Primary hierarchy, live-news responsive composition, and reopening triad remain owner decisions.

## Source trail

- **Locked/standing decisions:** D-2026-07-24-026 (release versus publication); D-2026-07-25-043 (conditional The Breaking and The Daily homepage direction); D-2026-07-25-044 (teaching accuracy); public-promise registry dated 2026-07-25.
- **Product records:** `CHARTER.md`, `state.json`, `backlog.md`, `launch-deep-dive-2026-07-25.md` in this folder; Visitor's Centre dossier for front-desk handoff.
- **Code/assets observed:** `index.html`, `start-here.html`, `content/site/homepage.js`, shared scripts and named hero/map assets above. Source facts are not rendered/public verification.
- **Prevention rules:** BTB-050 (experience brief outranks feature checklist), BTB-069 (click is not completion), shared-header continuity rule (2026-07-25), and reopening publication approval failure (2026-07-25).
- **Inference/unknowns:** The entry hierarchy is plausible from source but comprehension, mobile/keyboard, live current-data recovery, newsletter lifecycle, analytics configuration and exact public-origin flow remain unverified.

## Learning scan

- **No new qualifying painpoint:** This was a records-only reconciliation; no build, public action, or newly observed failure occurred. Existing BTB-050, BTB-069, shared-header and reopening-approval prevention rules were applied to the contract. `operations/painpoints-log.md` remains unchanged because it is outside this cycle's write boundary.
