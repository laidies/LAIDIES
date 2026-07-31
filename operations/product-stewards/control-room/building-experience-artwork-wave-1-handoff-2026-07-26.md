# Control Room handoff — building experience + artwork Wave 1

**Status:** `SPECIFIED / QUEUED — dossier-only preparation`  
**Evidence cut:** 2026-07-26, America/Vancouver  
**Trigger:** Ali asked that, after the separate media lanes are safely closed or
paused, building pages become complete, building-specific experiences whose
features are visible and usable through appropriate new artwork—not generic
web shells or a copied page template.

## Decision and sequencing truth

The first wave remains the three buildings named by the portfolio readiness
reset, in this order: **SUNNYVAiLE LIBRAiRY → Visitor’s Centre → Blend & Snap**.
They may prepare in parallel only in separate candidate folders; they must not
share a route, `styles.css`, shared directory/tour/Puffy code, production
asset path, release artifact, deployment or public lock.

This is deliberately a *translation wave*, not a sitewide template:

| Lane | Why it is first | Distinct room mechanic |
| --- | --- | --- |
| LIBRAiRY | It has the richest complete owned product tree and is the best test of a room where useful objects are controls. It is a benchmark, not visual authority for every other building. | Shelves, books, reference desk and Puffy saving make discovery/reading/return tangible. |
| Visitor’s Centre | It tests first-arrival/orientation without copying the Library; Ali explicitly rejected its former neutral/front-desk/card-grid model. | A vivid welcome room and operable town map make orientation and a truthful handoff tangible. |
| Blend & Snap | It tests a character-led weekly product and Study Pack handoff, not another catalogue or map room. | Counter, order/menu, pickup rail, noticeboard and receipt make the café/weekly ritual tangible. |

The current public Homepage remains the protected incumbent. Cycle 5 and Cycle
6 are rejected evidence only. No selected building may inherit their copy,
white-card composition, readiness vocabulary, visual treatment or mutable
working-tree bytes.

## Common non-negotiables

All three lanes are governed by:

- [building-experience readiness reset](../building-experience-readiness-2026-07-26.md): a route/test pass is not a finished building; every candidate must be a colourful, distinct environment whose objects perform the product job.
- [artwork production system](../artwork-production-system-2026-07-26.md): inventory by placement and purpose first; classify existing material `KEEP / ADAPT / REJECT`; new art is candidate-only until full-resolution, exact-use judgment.
- [site visual lock](../../site-visual-system-lock-2026-07-23.md), [Homepage style/image gate](../town-entry-homepage/STYLE-AND-IMAGE-LOCK-GATE-2026-07-26.md), D-2026-07-26-062 through D-2026-07-26-067, and the saved-reference authority correction in BTB-179. These outrank stale palette prose and available-but-unapproved files.
- BTB-155 and BTB-156: a technically complete shell and an asset count never establish a building experience or visual-production progress.

Before any visual generation or integration, Control Room must bind a fresh
clean worktree from the exact approved/deployed baseline and a current Brand
reference receipt. Until then this handoff authorizes only provenance reading,
feature/placement inventory and build-packet refinement.

## Lane 1 — SUNNYVAiLE LIBRAiRY

**Controlling record:**
[Experience brief](../library/EXPERIENCE-BRIEF.md),
[operating spec](../library/OPERATING-SPEC.md),
[functionality map](../library/FUNCTIONALITY-MAP.md), and
[building championship packet](../library/build-packet-building-experience-championship-2026-07-26.md).

**Complete experience to demonstrate:**

`enter → orient → browse shelves or ask Miss Jeeves → open an admitted book →
understand → Puffy-save an exact place → resume/remove it from the Closet on
this device`.

The final candidate must make those actions visible through the room: shelf
and cover discovery, a reference desk, reader/open-book state, same-device
Puffy confirmation and a truthful held/failed state. It must not pretend a
held book is admitted, a local Card is an account, or Puffy saves sync across
devices.

**Placement-specific artwork deliverables (brief/inventory before production):**

1. authored wide Library arrival environment plus a separate 390px composition
   and image-failure fallback;
2. shelf/department system that can grow without replacing the room;
3. book-cover/control placement plan using only editorially admitted cover
   sources, plus live HTML status treatment;
4. Miss Jeeves/reference-desk presence only if her exact identity reference is
   supplied; otherwise a no-character desk fallback;
5. open-book/reader, Puffy/save and return-state object treatments; no UI text
   baked into art; and
6. a `KEEP / ADAPT / REJECT` register for the existing room, shelf, cover and
   librarian candidates.

**Candidate-only write boundary:**
`operations/design-explorations/building-wave-1/library/` and
`operations/product-stewards/library/**` records. Later integration targets
are `library.html`, `content/site/puffy-bookmarks.js`, `laidies-card.html` and
the exact admitted rendered-book paths, each behind its own integration lock.
`styles.css`, shared header/navigation, identity and Closet authority are
excluded.

**Acceptance owners:** Library owner; independent product/learning and
editorial judges; independent image-quality/Brand judge; Accessibility;
Functionality & Platform for Puffy/Closet boundaries; Control Room for the
clean integration/release lock. Ali sees only a complete desktop/mobile
comparison that has passed those gates.

## Lane 2 — Visitor’s Centre

**Controlling record:**
[Experience brief](../visitors-centre/EXPERIENCE-BRIEF.md),
[operating spec](../visitors-centre/OPERATING-SPEC.md),
[functionality map](../visitors-centre/FUNCTIONALITY-MAP.md),
[replacement experience brief](../visitors-centre/REPLACEMENT-EXPERIENCE-BRIEF-2026-07-26.md), and
[championship packet](../visitors-centre/build-packet-building-experience-championship-2026-07-26.md).

**Complete experience to demonstrate:**

`arrive → locate yourself → choose a named place via the map or equal
accessible directory → read its current truthful status → step into that
place`; a tour, trailer and postcard are secondary handoff objects, never
completion claims or identity/reward gates.

The rejected neutral front desk, white page, map-and-card directory and old
visible Welcome Wagon naming are not starting points. The page must be one
inhabited orientation room where the map/counter does the work; it must retain
no-JS equal access and avoid inventing a greeter or account state.

**Placement-specific artwork deliverables (brief/inventory before production):**

1. an authored welcome-room wide composition and independent mobile
   composition, with live text/control safe zones;
2. a map-counter/wall-map interaction plate, a focused selection/reveal state
   and a truthful image-failure/no-JS fallback plan;
3. physical tour, trailer and postcard handoff-object treatments—without
   generated signage or a claim that the downstream product is complete;
4. a full audit of the current map/lobby/old-name specimens, explicitly
   retaining path-bound historical evidence while marking public-use
   `KEEP / ADAPT / REJECT`; and
5. desktop/mobile first-time, local-returning, device-local Card and
   storage-denied composition evidence.

**Candidate-only write boundary:**
`operations/design-explorations/building-wave-1/visitors-centre/` and
`operations/product-stewards/visitors-centre/**` records. Later integration
targets are `visitors-centre.html`; `content/site/sunnyvaile-directory.js`,
`content/site/sv-welcome-tour.js`, `content/site/quick-rail.js`, postcard
handoff code and the final map asset each require distinct named receiver and
shared-data locks. No containment removal is implied.

**Acceptance owners:** Visitor’s Centre owner; independent product/first-visit
consumer; image-quality/Brand; Accessibility; Platform for directory/tour and
state truth; Post Office for postcard handoff; receiving building owners for
destination truth; Control Room for integration/release. No new Ali decision
is needed until a complete candidate materially clears the rejected model.

## Lane 3 — Blend & Snap

**Controlling record:**
[Experience brief](../blend-snap/EXPERIENCE-BRIEF.md),
[operating spec](../blend-snap/OPERATING-SPEC.md),
[functionality map](../blend-snap/FUNCTIONALITY-MAP.md),
[café/weekly handoff packet](../blend-snap/build-packet-cafe-study-pack-weekly-handoff-2026-07-26.md),
[Study Pack visual inventory](../blend-snap/STUDY-PACK-VISUAL-INVENTORY-EP01-04-2026-07-26.md), and
[art inventory/briefs](../../design-explorations/blend-snap-building-championship-20260726/ART-INVENTORY-AND-BRIEFS.md).

**Complete experience to demonstrate:**

`enter café → understand the current weekly learning offer → choose a useful
Study Pack/episode action → see an honest availability state → collect the
right handoff/receipt → continue to the exact learning component or return`.

JoJo, counter/menu, pickup rail, noticeboard, café receipt and optional KSVL
atmosphere must work as one café ritual. The Study Sheet, Try-On, Cheat
Sheet/printable, concept/character cards, quiz handoff and menu/receipt remain
separate visible components; no unavailable card, wrong-episode Try-On or
unaccepted weekly art may be dressed up as complete.

**Placement-specific artwork deliverables (brief/inventory before production):**

1. a JoJo/counter hero composition and distinct mobile crop governed by the
   canonical character reference—not the current unadmitted candidate;
2. an operable menu/order/pickup-rail object family with live availability and
   receipt text outside generated imagery;
3. a noticeboard/Study Pack surface with separate visual slots for each
   component and an honest unavailable state;
4. an optional small KSVL/radio object with labelled explicit playback,
   reduced-motion and no-autoplay behavior; and
5. `KEEP / ADAPT / REJECT` classification for current JoJo/counter,
   corkboard, realistic/3D spatial references and all Episode 01–04 pack art.

**Candidate-only write boundary:**
`operations/design-explorations/building-wave-1/blend-snap/` and
`operations/product-stewards/blend-snap/**` records. Later integration targets
are `blend-snap.html`, `content/blend-snap-weekly-packs.json`, the exact Study
Pack receiver paths and KSVL controls; they require separate content/media,
episode, Trading Cards and shared-audio locks. No episode source, card
catalogue, shared styles or production asset path is writable in this lane.

**Acceptance owners:** Blend & Snap owner; Learning/episode/component owners;
independent product/learning, accessibility and image-quality/Brand judges;
KSVL for audio; Trading Cards for cards; Platform for truthful state; Control
Room for any eventual integration/release. Ali sees a café candidate only
after it proves the components are correctly bound, not merely attractive.

## Backend and state corrections — implementation-ready triage

These are not deferred merely because they are less visible than room art.
`IMPLEMENT NOW` means a maker may correct the named isolated route/test path
from a clean worktree without credentials, private data, account mutation,
shared-store schema change, public release or a new Ali choice. Every result
still needs its own source/artifact judgment before integration. `AUTHORITY
BLOCKER` means implementation would otherwise invent a shared completion,
identity, delivery, reward, provider or private-data contract.

| Rank | Building and defect | Truthful completion/state boundary | Disposition and exact next implementation | Tests/evidence | Genuine blocker owner |
| --- | --- | --- | --- | --- | --- |
| 1 | **LIBRAiRY — Miss Jeeves search fails silently when `site-index.json` is missing/malformed/offline.** | A useful answer is a visible bounded answer plus a valid admitted route; it is not a search request, a raw query log or a book admission. | **IMPLEMENT NOW.** Add an accessible unavailable/retry state in `library.html`; extend `scripts/test-library-product.cjs` and `scripts/validate-library-product.mjs` with missing/malformed/offline index fixtures. Do not alter index content, admission or analytics. | Existing `library/ FUNCTIONALITY-MAP.md` rows 25–26 and missing-register row 149; verify source and exact artifact, keyboard/focus, retry and no false result. | None; Library owner judges the isolated repair. |
| 2 | **LIBRAiRY — cross-tab Puffy board does not consume the browser `storage` event.** | A Puffy save is only a read-verified anonymous same-device record in `laidies_puffies_board`; it is never ownership, reward or account sync. | **IMPLEMENT NOW only after a narrow shared-Puffy lock.** Update `content/site/puffy-bookmarks.js` and its Library/Closet consumers to refresh or request refresh in tab B; add create/update/remove two-tab tests. Do not migrate the schema or touch Resident Card/account tables. | `library/FUNCTIONALITY-MAP.md` rows 73–75, 126 and 152; repeat Library save → Closet reopen/remove, denied/corrupt storage and two-tab tests. | Functionality & Platform + Library + MAiKEOVER/Closet consumer sign-off because the file is shared. |
| 3 | **Visitor’s Centre — destination status is duplicated static copy and can become stale.** | Centre completion is a correctly bound handoff intent; selection/hash/tour/postcard is not receiving-product completion and creates no reward. | **IMPLEMENT NOW as an isolated generator/validator, not a live data service.** Build a versioned owner-status input fixture and parity validator for the 17 destination records consumed by `visitors-centre.html`; fail closed on missing/mismatch. Keep the current static fallback until all destination owners sign their data. | Extend `scripts/test-visitors-centre-contract.mjs`; include update/removal/mismatch/no-JS and exact 17-record parity fixtures. | 17 destination owners + Platform must approve a canonical source before replacing embedded production data. |
| 4 | **Visitor’s Centre — bare `laidies_card_username` prefill can imply an identity.** | Device-local or verified Resident Card state has no Centre-specific privilege; postcard use is at most a handoff, never delivery/referral/reward completion. | **IMPLEMENT NOW in the isolated Centre candidate:** remove the bare-key prefill or gate it behind the accepted Card projection with a truthful anonymous fallback. Production integration remains separately locked. | Add first/local-Card/delete/revoke/conflict and storage-denied tests to `scripts/test-visitors-centre-contract.mjs`; inspect exact candidate at 320/390/1440. | Platform Identity only if a validated shared Card projection is chosen; no Ali decision is needed for the safe removal fallback. |
| 5 | **Blend & Snap — manifest/episode failure and retry must remain atomic and cannot create a cached success.** | Café completion is a valid pack receipt with links only to `available` components; downstream Try-On, cards and quiz own their result/reward. | **IMPLEMENT NOW.** Harden `blend-snap.html` and `scripts/test-blend-snap-browser.mjs` / `scripts/validate-blend-snap-packs.mjs` against stale/malformed/index-disagreement/timeout/retry cases; prove `laidies_bs_usual` and `laidies_bs_last_pack` are ignored when corrupt and remain device-local. | Functionality-map V6–V9 plus existing `scripts/test-blend-snap-cross-entry.mjs`; assert no Card/account claim and no duplicate receipt. | None for route-local failure handling; content owners retain manifest authority. |
| 6 | **Blend & Snap — current Study Pack component truth is incomplete.** | Each component has its own result: Study Sheet review, Try-On practice, Cheat Sheet print, Cards authoritative collection, Quiz assessment. Café never borrows one component’s completion. | **IMPLEMENT NOW only for honest route/status presentation and missing-component fallbacks in the isolated candidate.** Do not create a fake Study Sheet, mark cards available, or wire a quiz result into a café receipt. | `blend-snap/ FUNCTIONALITY-MAP.md` rows 20–24 and Study Pack packet; run `validate-blend-snap-packs`, cross-entry and component-status matrix. | Learning/Episode/High/Trading Cards owners for real content, assessment and ownership. |
| 7 | **All three — privacy-safe product outcome telemetry is unwired.** | Event success is provider-delivered aggregate evidence; a tag in source is not event delivery. Names, notes, queries, titles, reading text, local save purpose and identity are prohibited. | **AUTHORITY BLOCKER.** First bind the shared event dictionary, provider configuration, consent/masking/retention/deletion and production payload inspection contract. No local page event implementation should guess those rules. | Network payload and provider/export evidence plus forbidden-field fixtures. | Analytics/Privacy + Platform; credentials/data-retention authority. |
| 8 | **LIBRAiRY correction/report lifecycle is missing.** | Correction completion requires submission receipt → triage → corrected/demoted claim/book → Library, Jeeves, index and dependent consumer propagation. | **AUTHORITY BLOCKER.** A form, `mailto:` or localStorage receipt would falsely claim a correction service. Scope an owner-approved service/ledger and privacy boundary first. | Submit/retry/idempotency/correction/demotion/removal/public propagation proof. | Editorial + Platform + Privacy; service/retention/private-data authority. |
| 9 | **Visitor tour/KSVL and postcard lifecycle are incomplete.** | A tour can only set local done/skipped state; postcard handoff is not send/open/join/referral/reward delivery. | **AUTHORITY BLOCKER.** Reconcile `content/site/sv-welcome-tour.js` KSVL wording with KSVL owner; Post Office owns provider delivery and external native-share outcome. Do not add Centre completion or reward records. | Multi-consumer tour suite; Post Office provider/receiving-owner evidence. | KSVL, Post Office, Platform/Privacy and any provider authority. |
| 10 | **Library account sync, Blend & Snap Card enhancement, and Cards issuance are absent.** | Current local records are device/browser scope; no cross-device continuation, ownership, reward, account name or entitlement exists. | **AUTHORITY BLOCKER.** Do not build a parallel backend. Require the shared identity/save schema, migration/merge/revoke/delete/RLS and authoritative card issuance contract. | Two-account/device, sign-out, conflict, replay/idempotency, direct-write denial, revoke/delete and consumer tests. | Platform Identity/Rewards/Trading Cards; staging credentials/private-data authority. |

The first five rows are the safe overnight correction queue. They are disjoint
only when each maker is given its named files: Library search; shared Puffy;
Visitor parity; Visitor prefill; Blend data failures. Rows 2–4 must be
serialized around their named shared/route locks; row 5 may run in parallel
with the others. No correction authorizes visual integration or public deploy.

## Start gate, collision control and genuine Ali decisions

**Safe now:** asset provenance/read-only audit, placement inventory,
`KEEP / ADAPT / REJECT` register, candidate-folder structure and exact
build/acceptance packet refinement.

**Not safe yet:** image generation, route implementation, shared CSS, shared
directory/tour/Puffy/audio changes, moving candidate art into production,
integration, commit/deploy or publication.

**Start trigger:** media lanes have either reached their independent terminal
verdicts or are explicitly parked; Control Room binds a clean baseline and
confirms the sitewide reference/Brand receipt for this limited wave. The three
makers then receive separate folders and one building each. They do not wait
for another building’s candidate, but they do not integrate until the
translation validation is independently accepted.

**Genuine Ali decisions:** none at preparation start. The first legitimate
decision is a visual, desktop/mobile, incumbent-versus-complete-candidate
package for a single building after independent material-better and
full-resolution exact-use PASS. It asks only whether that building’s proposed
experience is the right one; it does not silently approve a global redesign,
other buildings, account behavior, rewards, content admission or deployment.

## Learning scan

No new qualifying learning was discovered in this dossier-only reconciliation.
The handoff explicitly reuses BTB-155 (functional shell is not a building),
BTB-156 (visual production needs literal state) and BTB-179 (Ali’s current
saved visual references outrank stale prose).  
**Public truth:** no routes, shared styles, artwork, assets, media, deployment
or public surface changed.
