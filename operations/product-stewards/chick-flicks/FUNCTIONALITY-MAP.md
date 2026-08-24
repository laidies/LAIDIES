# Chick Flicks functionality and cross-page touchpoint map

**Status:** FUNCTIONALITY RECOVERED AT CONTRACT LEVEL — DIRECTOR REVIEW AND
BUILD LOCK REQUIRED
**Product/building owner:** Chick Flicks product champion
**Owned subproduct:** Screening Room
**Functionality & Platform Director:** review required
**Evidence ceiling:** repository, dossier and exact local evidence inspected
2026-07-26; no live route, shared service, media, deployment or public state
was changed.

**Current Trailer entrance truth — 2026-08-23:** the illustrated Trailer issue
is readable. Trailer listening remains held, so public discovery may open the
issue or a held Screening Room status but may not advertise immediate audio.
This does not change the valid cover-only audio editions for Episodes 01–04.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Store orientation/current truth | Arrive at `/chick-flicks.html` | Explain available inventory, Episode 01 starting point and any valid local return | Latest released derives from validated index; human comprehension open | VERIFIED LOCALLY — BOUNDED |
| Rental wall | Select VHS box | Released tape exposes exact issue; held/draft tape explains state | Source/exact-artifact catalogue suites passed | VERIFIED LOCALLY — BOUNDED |
| Aisle catalogue | Select All/topic/Unfiled | Same inventory wall filters without hiding valid index growth | All/Unfiled and aisle fixtures passed | VERIFIED LOCALLY — BOUNDED |
| Rental handoff | Activate verified released tape | Navigate to existing safe local `issueUrl` | Destination checks and handoff suite passed | VERIFIED LOCALLY — BOUNDED |
| Favourite tape | Add/remove on store | Truthful same-device saved/removed confirmation | `laidies_favorite_episode`; storage failure suite passed | VERIFIED LOCALLY — DEVICE ONLY |
| Last rental/due-date response | Take home a verified tape | Playful card/stamp and same-device return hint | `laidies_cf_last_rental` exists; no account semantics | OBSERVED / BOUNDED LOCAL |
| Broken/held catalogue state | Index, cover, route or storage failure | Fail closed, retain useful retry/alternative | Deterministic degraded-state suite passed; native/public open | VERIFIED LOCALLY — BOUNDED |
| Canonical discovery redirect | Open `/episodes.html` | Reach Chick Flicks, not a second catalogue | Redirect present in exact artifact | VERIFIED LOCALLY — BOUNDED |
| Screening Room programme selection | Open `/watch.html?ep=…` or choose shelf | Select trailer/01/02/03/04 only; reject unknown ID coherently | Exact allowlist browser/contract tests pass | VERIFIED LOCALLY — ALL TITLES HOLD |
| Listen-along transport | Play/pause/seek/keyboard slider | Operate narration without simulated silent playback | Player/failure browser suite passes | VERIFIED LOCALLY — TITLE ADMISSION HOLD |
| Visual/cue display | Programme clock advances | Show only runtime-admitted visual edition | Admission authority has zero approved occurrences; deployable runtime uses programme cover | VERIFIED LOCALLY — COVER-ONLY HOLD |
| Caption/read-along | Narration plays | Show exact synchronized text or explicit gap/unavailable state | Five VTT masters; Trailer has 64.356-second gap | PARTIAL / TITLE HOLD |
| Player failure/retry | Cue/caption/audio/image/play rejects | Stop and disable transport, name failure, retry/exit | Deterministic browser journeys pass | VERIFIED LOCALLY — NATIVE/PUBLIC OPEN |
| Device-local resume | Return to same programme | Offer Resume/Start over for one validated programme/time record | Versioned record and browser tests pass | VERIFIED LOCALLY — DEVICE ONLY |
| Article continuation | Use departure rail | Open exact full issue for selected released programme | Routes exist; receiving-owner/public proof open | OBSERVED |
| Return to Chick Flicks | Use player departure/back route | Restore coherent store arrival and focus/history behavior | Contract specified; complete source/artifact/native journey open | MISSING ACCEPTANCE EVIDENCE |
| Cross-building next routes | Choose Study Pack/quiz/Post Office/Closet | Reach exact available receiving product with honest label | Some routes observed; consumer-owner sign-off incomplete | PARTIAL |
| Analytics | View/select/handoff/play/fail | Privacy-safe categorical product evidence | Store events proposed; listen-along start partial; no approved full contract | MISSING SHARED CONTRACT |
| Motion-film edition | Future title-specific selection | Play only independently admitted, owner-approved film | `EPISODE_FILMS` empty | HOLD — BUILD REMAINS REQUIRED IF CURRENT-RELEASE INTENT IS APPROVED |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No valid Chick Flicks device record required | Public episode index, title admission and static route data | Full orientation; Episode 01 start; no history/resume prompt | Optional device favourite/last-rental/player record after explicit action | Issue and Screening Room routes only | Catalogue/player fail closed with retry/exit | BOUNDED LOCAL PASS; comprehension/native/public open |
| Returning, no Resident Card | Valid versioned favourite, last-rental or same-programme resume record; no identity inference | Only validated local keys plus current public index/admission | Offer useful same-device continuation; keep full browse | Update/remove local record only | Store ↔ issue/player; Closet only where receiver proves support | Invalid/stale/corrupt/denied state is ignored or explained; never paints success | BOUNDED LOCAL PASS |
| Resident Card — device-local | Separately valid local Card envelope plus separately valid Chick Flicks record | Same catalogue/player records; Card creates no access grant | Optional on-this-device association only | Same local writes; no account/service write | Any Closet favourite display requires shared consumer proof | Fall back to anonymous/device experience | CONTRACT RECOVERED; cross-page proof open |
| Resident Card — verified account-backed, if supported | Accepted auth/profile/session evidence; no Chick Flicks account schema currently exists | No account-backed Chick Flicks history/resume | No approved difference | No account Chick Flicks write | No cross-device restore/sync claim | Use anonymous/device-local path; sign-out cannot destroy unrelated local data | HOLD / NOT IMPLEMENTED |

Required transition suite:

1. clean first visit → released issue handoff → same-device store return;
2. clean first visit → Screening Room → pause → same-programme return →
   Resume/Start over → issue/Chick Flicks return;
3. favourite add → reload → remove → any proved Closet consumer update;
4. no Card → local Card → same-device return with no new entitlement;
5. local Card → signed-in shell → sign-out, with no invented merge or history;
6. denied/corrupt/stale storage, two tabs, second device and programme/status
   change; and
7. future account claim/merge/delete/revoke only after a shared schema and
   lifecycle are approved.

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Episode release catalogue | Weekly Episode Engine checksum-bound release transaction | Chick Flicks inline catalogue controller | Static build/package pipeline | immutable Engine candidate manifest + `content/episode-index.json` + exact destination presence | Chick Flicks, archive, issue routes, Screening Room and shared entry surfaces | public release artifact | 01–04 published, 05 draft; cross-owner transaction now specified |
| Aisle mapping | Chick Flicks curation | Catalogue controller | none | configured mapping plus derived All/Unfiled | Chick Flicks wall/detail | public artifact/session UI | Bounded local pass |
| Favourite episode | Explicit add/remove | Chick Flicks controller | none today | `laidies_favorite_episode` | Chick Flicks; proposed/observed Closet consumer | device only | Local behavior passes; consumer propagation needs owner proof |
| Last rental | Verified handoff gesture | Chick Flicks controller | none | `laidies_cf_last_rental` | Chick Flicks return marquee/card | device only | Local only; no history/completion semantics |
| Programme allowlist | Screening Room release process | `watch.html` player | build/package pipeline | exact `trailer`, `01`–`04` allowlist | programme shelf/player/issue departure | public artifact/session | Contract/browser pass |
| Programme admission | Media Quality + owner + independent judge | player admission reader | release process | `content/episodes/screening-room-admission.json` and schema | Screening Room runtime/builder | public exact artifact | Five HOLD, zero admitted occurrences |
| Derived cover-only edition | Exact builder | player/runtime | build pipeline | `screening-room-derived-editions.json`, source/generated hashes | Screening Room artifact | public artifact | Hash-bound cover-only 03/04; runtime cover-only for all held programmes |
| Cue timeline | Episode media production | player cue loader | static delivery | `content/episodes/episode-*-cues.json` | Screening Room image/chapter/clock | public artifact/session | Trailer/E02 repairs pass; E01/E03 clocks remain proportional |
| Narration audio | Episode audio production | native audio/player | static delivery | five exact narration files and admission hashes | Screening Room | public artifact/session | Present; title release still HOLD |
| Captions | Caption producer | VTT loader/caption renderer | static delivery | five `assets/captions/episode-*.vtt` files and admission coverage | Screening Room caption region | public artifact/session | Trailer partial by 64.356 seconds; title holds |
| Player resume | Explicit play/seek/pause lifecycle | Screening Room player | none | closed versioned device-local programme/time record | same programme in Screening Room | device only | Local browser pass; no account/progress meaning |
| Issue continuation | Selected programme departure | link/router | static route/package | programme-to-existing issue map | `/issues/issue-01..04.html` | public route | Receiving verification incomplete |
| Store return | Player departure/history | link/router/focus management | none | canonical `/chick-flicks.html` route and optional valid device state | Chick Flicks | public route + device-local optional | Complete return acceptance open |
| Discovery/player analytics | Page/action/player/failure event | page modules/shared analytics adapter | Plausible/approved provider TBD | event dictionary contract TBD | aggregate product review | anonymous aggregate only | Not approved end to end |

## 4. End-to-end transaction contracts

### Released tape handoff

`discover → select → validate index row/status/safe local URL/destination →
render detail → activate → record optional device-local last rental → navigate
→ receive exact issue → return`

- Authoritative completion is successful navigation to the verified issue
  destination, not the local click or localStorage write.
- Validation rejects duplicate/invalid episode numbers, missing title,
  non-published state, unsafe/external/data/JavaScript URL and absent artifact
  destination.
- The navigation is naturally idempotent. Repeated activation must not create
  reward, payment, ownership or completion entries.
- A failed localStorage write cannot block the free route and cannot paint a
  saved/history result.
- A removed/held episode invalidates the rental action on the next authoritative
  index read and every consumer must stop promoting it.

### Favourite add/remove

`discover → explicit toggle → validate released episode → local write/remove →
read after write → announce result → receiving consumer re-reads → return`

- The local key is non-authoritative device convenience.
- Add/remove must be reversible; storage denial/corruption is visible and does
  not simulate success.
- Two-tab changes use a storage/update policy before launch; second-device and
  account propagation do not exist.
- No refund applies because no value is spent.

### Screening Room listen-along

`discover → choose exact programme → load admission/cue/audio/VTT →
validate title/edition/hashes/coverage → start → update image/caption/clock →
pause/seek/resume → issue or store return`

- Authoritative playable state requires the exact allowlisted programme and
  packaged runtime dependencies; visual admission remains separate per
  occurrence.
- Unknown programme, hash mismatch, missing cue/caption/audio/image or rejected
  playback stops transport, names the component and exposes retry/exit.
- The player never substitutes silent simulated playback.
- Play/start/progress is not completion, mastery or a reward event.
- A completion event must not exist until an approved semantic threshold and
  shared analytics contract define it.

### Caption path

`programme selection → exact VTT load → parse/validate → clock lookup → visible
caption → gap/unavailable state → retry/continue/exit`

- Caption text and times come only from the title-bound VTT/admission record.
- Trailer explicitly switches to transcript-unavailable after 902.760 rather
  than inventing text.
- Caption failure may not imply audio failure; the interface explains which
  component failed and applies the approved safe behavior.
- Native assistive-technology behavior must be judged before release.

### Return/resume path

`explicit playback → throttled local write → return → exact same-programme
validation → Resume or Start over → clear near completion/start-over →
continue → issue/store handback`

- The closed record contains only version, programme and bounded time.
- It is device-local, not an account, history, recommendation profile or
  completion record.
- Invalid shape, range, programme mismatch, stale title or denied storage
  fails to normal programme start.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Engine release/correct/hold/remove candidate | Chick Flicks, archive, entry surfaces, issue handoff, player allowlist where applicable | checksum-bound episode identity, status, route and format manifest | store, archive, exact issue and admitted player | Accept/reject transaction bound to candidate checksum; rebuild/re-read all named consumers | Held/removed stops promotion; media revoke blocks only affected format; local hint becomes stale-safe | Cross-owner fixture, exact-artifact and public suite required |
| Favourite add/remove | Chick Flicks and approved Closet consumer | episode ID only, device-local | Closet → exact store/tape if supported | same-device storage event/reload | Remove everywhere on same device | denied/corrupt/two-tab suite |
| Last-rental write | Chick Flicks only | episode ID, device-local | store arrival | replace only after explicit valid handoff | clear/ignore stale or removed target | storage denied/stale row |
| Programme/title admission change | builder and Screening Room | immutable title media verdict/hashes | exact `watch.html?ep=` | build must bind new exact manifest | revoke/hold prevents promoted edition | contract, artifact and public-origin tests |
| Caption correction | admission, player, artifact | VTT hash/coverage/timing | same programme | exact build invalidates stale hash | revoke prior completeness claim | parser, duration, semantic onset, gap/browser/native tests |
| Player resume write/clear | same Screening Room programme | version/programme/time, device-local | exact programme deep link | throttled write and same-programme read | Start over/near-end clear | corrupt/range/mismatch/denial/two-tab |
| Issue continuation | exact issue page | programme/episode route only | issue returns to store/player as designed | route changes require source fan-out | removed issue disables handoff | exact artifact and receiving-owner proof |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Checksum-bound Engine → Chick Flicks release/freshness transaction | Store, archive, issue and player can disagree on availability or use mixed candidates | Implement `EPISODE-RELEASE-MANIFEST-SPEC.md` after resolving self-hash canonicalization, append-only public-proof receipts and first-addition rollback nullability; then bind accept/reject, correction/revoke propagation and all consumers | Weekly Episode Engine + Platform Director | Chick Flicks | Engine release manifest spec, transaction/admission/proof schemas, `content/episode-index.json`, admission manifests, builder and named consumers | schema fixtures plus new/correct/hold/remove/media-revoke source→artifact→public matrix | BLOCKED — BUILD REMAINS REQUIRED |
| Favourite → Closet propagation proof | Card holder may see stale or false favourite | Confirm canonical local key/version, consumer read/remove/update and truthful scope | Resident Card/Closet + Platform Director | Chick Flicks | Chick Flicks controller, Closet consumer | add/reload/remove/corrupt/two-tab and exact return | BUILD BEFORE LAUNCH if promoted |
| Account-backed favourite/history/resume | Visitor could be promised sync that does not exist | Product decision first; if approved, schema/RLS/migration/merge/revoke/delete lifecycle | Identity + Platform Director | Chick Flicks | no accepted service/schema today | two-account/two-device/privacy lifecycle | INTENTIONAL LATER RELEASE only after approval; not implied now |
| Complete title media admission | Player cannot truthfully promote illustrated or motion editions | Occurrence-level immutable admission with owner and independent verdict | Episode Media Quality Director | Screening Room/Chick Flicks | admission JSON/schema, cue/audio/VTT/assets | complete normal-speed watches and exact artifact per title | BLOCKED — BUILD REMAINS REQUIRED |
| Trailer caption completion | Final 64.356 seconds lack transcript | Author authoritative transcript/timing, update VTT/hash/cues/admission | Audio/Caption Directors | Screening Room/Chick Flicks | Trailer audio/VTT/cues/admission | exact duration/coverage/semantic/native review | BLOCKED — BUILD REMAINS REQUIRED |
| Episode 01/03 authoritative clocks | Resume/visual onset can be misleading | Derive clocks from authoritative narration/caption onset, never proportionally infer | Audio/Media Directors | Screening Room | E01/E03 VTT/cues/admission | semantic onset matrix + normal-speed judge | BLOCKED — BUILD REMAINS REQUIRED |
| Native accessibility evidence | Browser DOM pass may fail real users | No backend; execute Safari/VoiceOver/mobile/zoom/reduced-motion/caption-failure suite | Accessibility Director | Chick Flicks | exact candidate routes | recorded task outcomes for four visitor scopes | BUILD BEFORE LAUNCH |
| Complete store ↔ player ↔ issue return contract | Visitor may lose place/focus or hit stale route | Canonical routes, focus/history behavior and receiving-owner handback tests | Platform + affected owners | Chick Flicks | store/player/issues/shared nav | deep-link, back, explicit return, stale state and mobile/native evidence | BUILD BEFORE LAUNCH |
| Privacy-safe analytics delivery | Owner cannot measure discovery/player failure | Approve event names/properties, adapter, provider delivery, dedupe and retention | Analytics/Privacy + Platform | Chick Flicks | event dictionary/page modules/provider | production delivery without identity/transcript/storage leakage | BUILD BEFORE LAUNCH |
| Public artifact provenance | Local PASS may not equal released product | Controlled lock, clean build, manifest, immutable hash, deploy and exact public checks | Release Control | Chick Flicks | builder/release manifest/public URLs | clean worktree build, byte/parity checks, public journeys, rollback drill | BUILD BEFORE LAUNCH |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** consume anonymous access; do not
  create a Chick Flicks account history or treat local Card as identity.
- **Saves/progression/Closet:** favourite/last-rental/resume are distinct
  device conveniences, not one generic progress object.
- **Rewards/economy/ownership/fulfilment:** no reward or rental ledger; any
  future stamp/reward queues behind Identity, Rewards & Connection.
- **Community/moderation:** no owned write path.
- **Referrals/postcards/newsletter/delivery:** links only; receiving services
  own outcome and failure.
- **Content/media admission and freshness:** Weekly Episode Engine produces the
  checksum-bound episode/editorial release candidate; Media Quality admits
  media title by title; Platform packages it; Chick Flicks admits and presents
  discovery/archive/listen/watch availability and fails closed.
- **Analytics/customer evidence:** shared categorical events only; never
  transcript, local record values, identity or inferred interest/ability.
- **Release/build/runtime dependencies:** live routes and shared builder remain
  under Control Room locks. A title can release only at its own evidence scope.

## 8. Verification and approval

- Chick Flicks owner verifies the complete store + Screening Room + issue +
  return outcome and every promoted element.
- Four visitor scopes and their transitions receive separate source,
  exact-artifact and public verdicts.
- Functionality & Platform Director verifies the release producer, device
  stores, player/caption/runtime architecture, shared consumers and gaps.
- Episode Experience, Screening Room, Episode Media Quality, Resident
  Card/Closet, Blend & Snap, High, Post Office, Platform and Release owners
  sign their respective handoffs.
- Independent product/accessibility/media/release judges remain separate from
  makers and bind verdicts to the exact artifact.
- Portfolio Control Room assigns file locks, integration order, release
  authority, rollback and public verification.
