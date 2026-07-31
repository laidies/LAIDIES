# Blend & Snap operating specification

**Status:** BOUNDED LOCAL PASS — REPAIR 2 INDEPENDENT RE-JUDGE 90/100; RELEASE HOLDS REMAIN

## Identity and purpose

- **Product:** The Blend & Snap.
- **Parent building/product:** SUNNYVAiLE town; Study Pack, Try-On and Trading
  Cards are owned subproducts.
- **Product type:** third-place building and weekly learning-experience
  coordinator.
- **Audience:** new and returning LAiDIES visitors following a published
  episode or looking for one useful next step.
- **User job:** order the menu for one released episode, see exactly which
  review/practice/reference components are ready, and choose the next useful
  action without mistaking navigation for completion.
- **Why LAiDIES offers it:** turn weekly learning into a hospitable,
  non-remedial ritual that supports review and practice without becoming a
  productivity demand.
- **Distinct contribution:** JoJo’s café makes context and device-local memory
  tangible; the counter coordinates related products while preserving their
  different jobs.
- **Explicit non-goals:** account-backed learning history, cross-device sync,
  reward authority, quiz assessment, a duplicate Episode 01 Study Sheet, a generic link hub, or
  a claim that every released episode has a complete pack.

## Experience model

- **Metaphor:** a café counter and menu. The locked action verb is **ORDER**.
- **Ten-second comprehension:** choose a usual if desired; order an episode’s
  pack menu; read what is ready, held, planned or unavailable; take one
  available item or leave it at the counter.
- **New user:** arrival copy explains the device-local usual → menu loads from
  the canonical weekly-pack manifest → current published episode and exact
  component statuses appear → ORDER opens an in-place receipt → only available
  components are links.
- **Returning user:** JoJo may recognize the usual and that this device opened
  the same pack menu before. Copy says opened/picked up on this device, never
  “studied,” “completed,” “all caught up,” account or cross-device.
- **Anonymous/signed-in:** no difference in the current product. Header sign-in
  is a global route, not a prerequisite or evidence of persistence.
- **Mobile/desktop/accessibility:** the same text menu and receipt are available
  at every size; native buttons/links, visible focus, status text, polite
  announcements, deterministic focus after open/close, no essential motion and
  reduced-motion-safe scrolling.
- **Empty/loading/error/offline/retry:** order controls remain unavailable
  during validation. Missing, invalid, stale or failed manifest/index data
  closes the Special, names the failure without exposing internals and offers
  a truthful direct episode/season fallback and retry. The visible status is a
  persistent atomic polite live region; failure focuses the visible retry.

## Mechanics and rules

- **Inputs:** versioned weekly-pack manifest, canonical episode index, optional
  usual selection and optional device-local opened-pack marker.
- **Core actions:** choose usual; ORDER current or past pack menu; open an
  available component; close receipt.
- **Authoritative completion event:** none. Opening a component route is
  navigation only.
- **Outputs:** episode-specific menu/receipt with each component’s job, status
  label and route only when status is `available`.
- **Replay/return:** a same-device marker may say that pack menu was previously
  opened; all component outcomes remain owned elsewhere.
- **Status contract:**
  - `available` — route exists and current source/local journey evidence named
    by the manifest supports offering it;
  - `held` — implementation exists but a named gate prevents offering it as an
    admitted pack component;
  - `planned` — intended job exists, but no route/product may be implied;
  - `unavailable` — this episode does not have that component.
- **Abuse/edge/race cases:** index/manifest disagreement, duplicate episode or
  component IDs, unsupported schema/status, stale manifest, missing route,
  unsafe path, private/unknown public fields, storage denial and late
  asynchronous responses fail closed. Data requests abort after eight seconds.

## Content and learning

- **Format-specific job:** coordinate, not duplicate, the components.
- **Outcome:** the visitor can distinguish review, practice, reference,
  collection/memory and assessment, then select the appropriate action.
- **Correct model:** Episode explains; the one-page Cheat Sheet recaps and
  provides durable reference; Try-On practises; Cards reinforce
  memory/collection; Quiz checks understanding beside—not inside—the pack.
- **Misconceptions:** an episode being published does not prove every component
  exists; ordering/opening is not studying; card collection is not learning;
  a local marker is not an account.
- **Evidence sensitivity:** component existence/status changes with routes,
  source quality and downstream admission. Manifest freshness is operational,
  not a claim that content facts are current.
- **Analogy limit:** a café order clarifies choice and memory; unlike a real
  order, it proves neither consumption nor learning.
- **Transfer evidence:** a newcomer can explain each component’s job and
  identify why the Quiz is separate.
- **Ecosystem:** Chick Flicks owns the Episode; High owns the Quiz and any
  reward; Try-On owns applied practice; the Cheat Sheet owns reference;
  Trading Cards own local collection mechanics pending authority repair.
- **Next action:** route to one available component or the episode; never route
  to a placeholder.

## Visual, voice and media

- Preserve the current JoJo counter/menu/corkboard composition and existing
  palette; this cycle creates no visual asset and grants no visual approval.
- Controls must be obvious without hotspot discovery; text menu/receipt remains
  the accessibility equivalent of the object-world interface.
- Copy is hospitable, concise and specific. “ORDER” stays; “complete pack,”
  “all caught up,” guaranteed weekly drop, account, reward and sync claims do
  not.
- Existing café images remain candidates subject to independent owner/visual
  review. The corkboard's stale embedded Study Pack promise is covered in
  source by an opaque, accessible availability note; the image itself was not
  changed or approved. No unapproved image becomes an authority for status.

## Technical and operational contract

- **Routes/source:** `/blend-snap.html`;
  `/content/blend-snap-weekly-packs.json`;
  `/content/episode-index.json`; downstream component routes named by manifest.
- **Public/private boundary:** the public manifest contains only schema,
  version/freshness, episode identity and visitor-facing component fields.
  Steward owners, verification dates and evidence live only in
  `weekly-pack-evidence-ledger-2026-07-25.json` under this dossier; the
  validator cross-checks both records.
- **Frontend:** inline café controller validates both datasets before enabling
  an order.
- **Backend/providers:** none.
- **Authority:** the weekly-pack manifest owns admission/status; episode index
  independently owns published-episode identity. Both must agree.
- **Identity/session:** none.
- **Persistence:** `laidies_bs_usual` and `laidies_bs_last_pack` are optional
  localStorage values on this device; denial cannot block browsing.
- **Rewards:** none. Quiz and future server-authoritative pack economy remain
  outside this product.
- **Privacy:** café usual/opened markers are not sent by this contract. The
  separate, explicit account-backed `Save to My Closet` action may store the
  Study Pack item’s disclosed resume fields under the Study Pack → Identity →
  Closet contract; raw user content remains private and outside analytics.
- **Reliability:** fail closed on invalid/stale/missing data; never reuse the
  hard-coded Episode 1 receipt as fallback.
- **Fallback:** season/episode discovery only when its destination is static and
  truthful; no guessed current pack.

## Analytics and customer evidence

- Proposed aggregate events remain unimplemented:
  `blend_snap_viewed`, `usual_selected`, `pack_menu_opened`,
  `pack_component_opened`, `pack_data_failed`.
- Allowed properties: manifest version, episode number, controlled component
  ID/status/failure class. Never usual label, task/prompt/reflection text,
  collection contents, account identity or raw recording.
- No baseline exists. Orders/clicks are not learning evidence.
- Review on each published episode or manifest change and monthly after an
  actual measured baseline exists.

## Dependencies and ownership

- **Parent champion:** Blend & Snap building champion.
- **Subchampions:** Study Pack, Try-On, Trading Cards.
- **Guilds for independent gate:** editorial-learning, UX/accessibility,
  frontend/data integrity, identity/reward truth, brand/creative, release.
- **Upstream:** episode index and published episode routes.
- **Downstream:** Try-On, Cheat Sheets, Trading Cards, High Quiz.
- **Handoffs:** Episode 01–04 Study Pack rails now say availability is checked
  at the café rather than advertising cards; Trading Cards must not be admitted
  until its locked server authority and local/account copy are reconciled.
- **Freshness owner:** Blend & Snap champion updates the manifest whenever an
  episode/component route or admission gate changes.

## Acceptance and release

- Deterministic schema/inventory/public-private/cross-entry validators and rendered browser
  journeys cover new/returning, storage denial, missing/invalid/stale
  index/manifest, missing components, visitor-safe status labels/routes,
  corkboard correction, Welcome Tour, directory, Episode 01–04 rails,
  keyboard/focus, live failure announcements/retry, mobile/desktop and reduced
  motion. The same suites run against source and a fresh public artifact.
- Independent product/learning, trust, brand, UX/accessibility and technical
  judges remain required. Maker evidence is not approval.
- Exact release artifact, deployment and public-origin evidence are absent.
- **Current status:** REPAIR 2 passed bounded independent re-judgment; FIX
  BEFORE LAUNCH until all owner, accessibility, content and public gates pass.

## Unresolved decisions

1. Episode 01’s pack cover must coordinate exactly the Cheat Sheet, Try-On and
   Trading Card Pack. A separate Episode 01 Study Sheet is prohibited by
   D-2026-07-27-071.
2. Episodes 1–3 Trading Cards exist but are `held` as pack components because
   browser-side randomized issuance conflicts with the locked server-authority
   economy and current trading/Closet claims are unproven.
3. The final café visual hierarchy/object treatment remains an Ali taste gate.
4. Native 200% zoom, VoiceOver, Safari, newcomer comprehension and Ali visual
   approval remain external/owner holds; automated checks do not prove them.
5. Puffy sticker placement and decorated-artifact delivery to My Closet require
   a versioned producer → authenticated account store → Closet contract with
   cross-device restore and delete propagation. A local draft may protect
   unsaved work but cannot satisfy or claim My Closet delivery.

## Source trail

- `CHARTER.md`; `launch-deep-dive-2026-07-25.md`; `backlog.md`; `state.json`.
- `operations/review-packets/season-study-sheet-and-study-pack-architecture.md`.
- `operations/try-on-design-decisions.md`.
- `operations/trading-card-economy-locked.md`.
- `weekly-pack-evidence-ledger-2026-07-25.json`.
- `content/episode-index.json`; `blend-snap.html`; `try-on.html`;
  `games/trading-cards.html`; released printable routes.
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`.
