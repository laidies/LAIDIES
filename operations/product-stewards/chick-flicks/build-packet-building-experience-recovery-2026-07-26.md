# Chick Flicks executable building build packet

**Status:** SPECIFIED — READY FOR DIRECTOR RECONCILIATION AND CONTROL ROOM
LOCKS; NO LIVE IMPLEMENTATION AUTHORIZED BY THIS PACKET
**Trigger:** D-052 owner-entry recovery plus the registry trigger
`OWNER_MEDIA_VISUAL_ACCESSIBILITY_SCREENING_ROOM_AND_PUBLIC_GATES`
**Owner:** Chick Flicks product champion

## Outcome

- **Product:** Chick Flicks, including its owned Screening Room.
- **Complete route/subpage/subproduct scope:** `/chick-flicks.html`,
  `/episodes.html`, `/watch.html?ep=<trailer|01|02|03|04>`, exact issue
  handoffs and return routes.
- **User problem:** a visitor must be able to discover a released episode,
  understand its actual available format, use the issue/listen-along and
  return without false freshness, media, completion, identity or sync claims.
- **Intended user outcome:** one coherent video-store journey:
  `store → released tape → issue or held/cover-only listen-along →
  continuation/return`.
- **Evidence and research:** `EXPERIENCE-BRIEF.md`,
  `FUNCTIONALITY-MAP.md`, current Chick Flicks bounded-local rejudge, Screening
  Room Cycle 7 evidence/state, episode index and D-050/D-052–D-056.
- **Scope:** reconcile and then build every current-release obligation named
  below under non-overlapping locks.
- **Explicit non-goals:** deployment before Release Control, account-backed
  history, rewards/payments, inferred episode completion, new media approval
  by the building owner, Episode 05 release or any motion-film claim.

## Proposed direction

- **Decision:** preserve the approved rental-wall/real-tape mechanic, collapse
  discovery into one store surface, and integrate the owned Screening Room as
  the explicit listen-along destination and return loop.
- **Why it fits LAiDIES:** the Rewind Era metaphor makes episode discovery
  memorable while exact labels and failure paths keep the teaching/media
  truth rigorous.
- **Media direction:** do not wait for motion films to tell the truth. Keep all
  five titles, expose only the exact held/cover-only listen-along state, and
  advance a title only after its occurrence-level admission gate.
- **External capabilities:** no plugin, paid service or vendor is required to
  start. Existing `ffprobe`, a standards-based WebVTT parser, Playwright and
  native Safari/VoiceOver are the required verification capabilities.
- **Approval required:** Brand & Experience for visual direction/assets;
  Functionality & Platform for shared state/events/runtime; media/caption
  directors for exact title work; Control Room for every live/shared file lock;
  Release Control for deployment/public verification.

## Work breakdown

No row authorizes work before its named lock. Makers may not edit this dossier
while the owner reconciles returned evidence.

| ID | Work item | Craft owner | Inputs | Locked output path(s) | Dependencies | Status |
|---|---|---|---|---|---|---|
| CF-B01 | Reconcile experience brief, functionality map and existing operating spec/backlog | Chick Flicks owner | this packet and dossiers | `operations/product-stewards/chick-flicks/*` only | Director comments | READY |
| CF-B02 | Compete/approve the store composition without losing real tape mechanics | Brand & Experience Director + assigned visual maker | approved building brief, sitewide style championship, existing measured wall geometry | Control Room-assigned design evidence paths; no live route | sitewide style ruling; owner visual review | BLOCKED ON DIRECTOR/LOCK |
| CF-B03 | Implement one-wall catalogue, Becky truth, rental-card/favourite states and all degraded states | Frontend specialist | approved CF-B02, episode-index contract | `chick-flicks.html`, `content/chick-flicks.css`, page-scoped modules/tests only as locked | CF-B02; Platform review | BLOCKED ON LOCK |
| CF-B04 | Resolve manifest self-hash, append-only public-proof receipt and first-addition rollback rules; then bind the Weekly Episode Engine candidate/accept/reject/correct/revoke transaction across store, archive, issue, Screening Room and named entry surfaces | Data/integration specialist | `ownership-handoff-weekly-episode-engine-2026-07-26.md` and `episode-experience/EPISODE-RELEASE-MANIFEST-SPEC.md` | exact Control Room-assigned schemas/fixtures/manifest/index/admission/builder/consumer paths | Weekly Episode Engine + Platform Director | BLOCKED — BUILD REMAINS REQUIRED |
| CF-B05 | Complete store favourite/last-rental → return and approved Closet propagation | Frontend/data specialist | device-local schemas and Closet consumer contract | locked page modules/tests; shared consumer only under joint lock | Resident Card/Closet + Platform | DEPENDENCY HANDOFF |
| CF-B06 | Complete common Screening Room player, exact return paths and native failure recovery | Screening Room specialist | Cycle 7 state/evidence, functionality map | `watch.html` and exact player tests under lock | Platform + Accessibility | BLOCKED ON LOCK |
| CF-B07 | Complete Trailer VTT through exact audio end and final-card onset | Caption/audio specialists | exact Trailer audio, VTT, cues, hashes | exact caption/cue/admission files under Director lock | Audio/Caption Directors | BLOCKED — BUILD REMAINS REQUIRED |
| CF-B08 | Replace proportional E01/E03 timing with authoritative semantic onsets | Audio/media specialists | exact narration/VTT/cues | exact E01/E03 cue/admission evidence paths under lock | Audio/Media Directors | BLOCKED — BUILD REMAINS REQUIRED |
| CF-B09 | Execute title-by-title occurrence admission for Trailer/E01–04 | Media maker + separate media judge + owner | shot admission queue, exact assets/hashes | Screening Room/Media Quality evidence and admission record under lock | CF-B07/B08 as applicable; Ali visual decisions | BLOCKED — BUILD REMAINS REQUIRED |
| CF-B10 | Implement privacy-safe discovery/listen-along/error analytics | Analytics integration specialist | approved event dictionary and property allowlist | page adapters/tests/provider config under joint lock | Analytics/Privacy + Platform | BLOCKED ON SHARED CONTRACT |
| CF-B11 | Run four-scope comprehension/accessibility/return suite | UX/accessibility researcher, not maker | exact candidate | evidence only in product dossier | CF-B03/B06 | READY AFTER CANDIDATE |
| CF-B12 | Clean build, exact-artifact rejudge, release and public-origin verification | Release specialist + independent release judge | accepted source SHA and all gate evidence | release manifest/evidence paths assigned by Control Room | all current-release P0 gates | BLOCKED ON COMPLETE CANDIDATE |

## Exact media truth carried into every task

| Title | Runtime availability | Caption/timing truth | Visual/motion truth | Build disposition |
|---|---|---|---|---|
| Trailer | Allowlisted narrated programme | cues 1–30 aligned; final 64.356 seconds uncaptioned; final-card onset unknown | 0/33 occurrences admitted; no motion film | HOLD; CF-B07 + CF-B09 |
| Episode 01 | Allowlisted narrated programme | proportional clock | style drift; 0/55 admitted; no motion film | HOLD; CF-B08 + CF-B09 |
| Episode 02 | Allowlisted narrated programme | all 27 main starts aligned; long holds remain | style review; 0/31 admitted; no motion film | HOLD; CF-B09 |
| Episode 03 | Allowlisted narrated programme | proportional source clock | hash-bound cover-only artifact; 0/49 admitted; no motion film | HOLD; CF-B08 + CF-B09 |
| Episode 04 | Allowlisted narrated programme | exact title record remains held | hash-bound cover-only artifact, Ada loop excluded; 0/58 admitted; no motion film | HOLD; CF-B09 |

No title may borrow another title's PASS. `EPISODE_FILMS` stays empty until an
independent SHA-bound audiovisual gate and Ali approval pass.

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Required result |
|---|---|---|---|
| Product/content quality | Four visitor scopes complete store → issue/player → return; newcomer correctly explains rent/released/held/listen-along | Product judge | ≥17/20 and no critical misunderstanding |
| Complete main-page/subpage capability and cross-building journey | Every capability row and producer/consumer handoff in `FUNCTIONALITY-MAP.md` has exact source/artifact evidence | Functionality & Platform Director | PASS; no promoted MISSING/BLOCKED item |
| Accuracy, safety and trust | Index/status/destination fan-out; title allowlist; no completion/account/sync/motion claim; exact title holds | Accuracy/trust judge | ≥17/20 |
| Positive LAiDIES brand contribution | Approved store direction, real operable tapes, Becky/room continuity and no generic catalogue regression | Brand & Experience Director, separate from maker | ≥17/20 plus owner approval |
| UX and accessibility | 320/390/1280, 200% reflow, keyboard, focus return, reduced motion, Safari/VoiceOver, caption/audio/cue/image/offline/retry | Accessibility judge | ≥17/20 and every critical journey PASS |
| Frontend/backend/data integrity | Index schema/unsafe URL/timeouts; device state add/remove/corrupt/two-tab; programme allowlist; exact route/return; analytics property allowlist | Technical judge | PASS |
| Visual/media quality | Per title: complete normal-speed watch and occurrence matrix bound to audio/VTT/cue/asset hashes, identity/style/location and owner verdict | Episode Media Quality independent judge | ≥17/20 per non-compensable floor and title |
| Exact release | Clean accepted SHA build, manifest, source/artifact byte and transform checks, no untracked dependency | Release judge | PASS |
| Public result | Exact production origin repeats the four-scope critical journeys and event-delivery checks | Release Control + independent public judge | VERIFIED PUBLICLY |

### Required commands at the applicable locked revision

```sh
node scripts/check-product-stewards.mjs --owner-entry chick-flicks
node scripts/test-chick-flicks-contract.mjs
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-chick-flicks-browser.mjs
node scripts/test-screening-room-contract.mjs
node scripts/check-episode-cues.js
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-screening-room-browser.mjs
node scripts/build-public-artifact.mjs --out <controlled-candidate-path>
```

The exact build command/flag must be confirmed against the current release
tool before execution; the placeholder is not permission to invent a new
release interface.

### Required four-scope scenes

1. Clean first-time device: released/forthcoming comprehension, Episode 01
   issue, Screening Room format truth and explicit return.
2. Returning device without Card: favourite/last-rental and player
   Resume/Start over, with corrupt/stale/storage-denied recovery.
3. Device-local Card: same journey, no new entitlement/sync claim, and
   add/remove propagation only where the Closet consumer proves it.
4. Verified signed-in shell: safe fallback with no account-backed
   Chick Flicks history, cross-device resume or membership claim.

## Integration and release

- **Affected owners:** Weekly Episode Engine, Screening Room, Episode Media
  Quality, Resident Card/Closet, Blend & Snap, SUNNYVAiLE High, Post Office,
  Town Entry, Platform Reliability and Release Control.
- **Canon/identity/reward/analytics:** no canon or shared-state mutation from
  this packet. Changes queue through their owning Directors.
- **Exact candidate:** unset until Control Room binds accepted commit SHA,
  complete dependency manifest and output path.
- **Release authority:** Release Control only.
- **Rollback:** retain the last exact verified storefront/player artifact and
  title-level admission manifests; rollback cannot promote a stale title or
  erase newly applicable holds.
- **Public verification:** deployment status is separate from exact
  production-origin verification.

## Measurement and learning

- **Baseline:** no approved production discovery/player funnel baseline.
- **Success signals:** newcomer comprehension; successful first useful issue
  handoff; listen-along start/failure/return by categorical title/format;
  resume usefulness; low invalid/failure/retry abandonment.
- **Guardrails:** no raw transcript, identity, local key value, inferred
  interest/ability or completion proxy.
- **Review date:** first controlled review after approved instrumentation and
  sufficient aggregate exposure; date set by Analytics/Privacy.
- **Decision after measurement:** improve orientation/return/failure handling;
  never promote held media or introduce personalization from thin data.
- **Dossier/state/backlog:** owner updates after each locked cycle and keeps
  title/media verdicts separate.

## Coordination handoffs

| Handoff | Durable request | Blocking condition |
|---|---|---|
| Brand & Experience Director | Reconcile approved store brief with sitewide style championship; decide allowed wall/Becky/rental-card evidence lane | No visual/live build before ruling and lock |
| Functionality & Platform Director | Sign producer/store/consumer map; bind release fan-out, device records, return routes and analytics contract | No shared implementation before joint lock |
| Weekly Episode Engine (`019f9f7c-f03a-7ec1-a776-d60b57210322`) | Supply checksum-bound episode candidate/correction/hold/removal and package-level public proof; receive Chick Flicks acceptance and visitor-journey proof | Chick Flicks does not edit teaching intent; candidate existence is not admission |
| Episode Media Quality Director | Own CF-B07–B09 evidence and title admissions | All five titles remain HOLD |
| Resident Card/Closet owner | Confirm favourite consumer schema/add/remove/return or reject the promoted tie | No sync/member claim |
| Accessibility Director | Judge four-scope native suite | No accessibility PASS from DOM tests alone |
| Portfolio Control Room | Assign non-overlapping route/media/platform locks and integration order | This packet alone cannot edit live/shared paths |
| Release Control | Bind SHA, clean artifact, rollback, deploy and public proof | No deployment/public claim before all gates |
