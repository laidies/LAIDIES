# The BRONZE AiGE functionality and cross-page touchpoint map

**Status:** FUNCTIONALITY RECOVERED AT CONTRACT LEVEL — SHARED SERVICE,
SUBPRODUCT, OWNER AND PUBLIC GATES REMAIN  
**Product/building owner:** Bronze AiGE product champion  
**Functionality & Platform Director:** review required  
**Evidence ceiling:** repository, current source, dated product evidence and
2026-07-25/26 synthetic source/exact-artifact evidence; no new account,
analytics, provider, native-device or public-origin mutation was performed.

This map describes the complete current Bronze route tree plus every shared
capability it visibly consumes. It does not promote observed implementation
into owner intent or allow a source-page pass to stand in for a shared
producer/consumer result.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
| --- | --- | --- | --- | --- |
| Building arrival and boundary | Load `/bronze-aige.html` | Distinct room, adult/alcohol-optional online ritual, six named stations and service limits | Hero/orientation and room controls render; desktop/mobile evidence inspected | VERIFIED LOCALLY SYNTHETIC; OWNER VISUAL/COMPREHENSION REQUIRED |
| Global header/account CTAs | Shared header on Bronze and BWS | Navigate without implying Bronze authentication | `content/site/sv-global-header.js`; receiving identity journeys are shared | OBSERVED; SHARED IDENTITY OUTCOME UNVERIFIED |
| Room panel system | Select any of six station buttons, hash, keyboard or Escape | Exactly one named panel; focus moves and returns; direct link resolves | `content/site/bronze-aige-v2.js`; Repair 2 browser suite | VERIFIED LOCALLY SYNTHETIC |
| Device-local arrival summary | Reload with valid drink/coaster receipts | Truthful local suggestion/week count only | Strict v2 receipt readers in `bronze-aige-v2.js` and inline coaster controller | VERIFIED LOCALLY SYNTHETIC; NO IDENTITY AUTHORITY |
| Embedded BWS fortune | Select lane and deal in Bronze | Canonical cocktail/spirit-free result and verified local receipt or honest hold | Module-private `content/site/bws-data.js`; hostile preload and missing-module matrices pass | VERIFIED LOCALLY SYNTHETIC |
| Full BWS game | `/games/businesswomens-special.html`; select lane/mood/random | Equal complete result, local receipt, session-only four-corner message, return route | Source/artifact Repair 2 matrices pass | VERIFIED LOCALLY SYNTHETIC; SUBPRODUCT DOSSIER/OWNER MISSING |
| Retired Cocktail Fortune | Load `/games/cocktail-fortune.html` | Truthful retirement notice and redirect to distinct Mme CLAi-O route | Meta refresh plus `location.replace`; third-party analytics scripts also load | OBSERVED; SUBPRODUCT DOSSIER/REDIRECT/ANALYTICS REVIEW REQUIRED |
| Invite builder | Change local date/time on Bronze | Updated selectable invite text | Inline Bronze controller | VERIFIED LOCALLY SYNTHETIC |
| Clipboard copy | Press Copy | Success only after API/fallback confirmation; selectable manual fallback | Clipboard success/failure fixtures | VERIFIED LOCALLY SYNTHETIC |
| Calendar file | Press Download calendar file | Valid local `.ics` with 90-minute floating local time; honest failure; no send/add/book/reserve claim | Download and object-URL/click/revoke failure fixtures | VERIFIED LOCALLY SYNTHETIC |
| Conversation menu | Open Tonight's Specials | Three evergreen prompts plus admitted current/latest episode prompt or evergreen fallback | Explicit issue map in `bronze-aige-v2.js`; current/stale/missing/malformed/mismatch/failure fixtures | VERIFIED LOCALLY SYNTHETIC |
| Framed answers | Open Answers and change tabs | Correct short retrieval aid, selected/focus state and deeper route | Static Ep 01–04 content plus runtime panel/tab conversion | OBSERVED; CONTENT ACCURACY/FRESHNESS OWNER REVIEW REQUIRED |
| Coaster | Press local week mark | One strict device-local ISO-week receipt, duplicate state or honest save failure | `laidies_bronze_coasters`; corruption/future/duplicate/storage-denial fixtures | VERIFIED LOCALLY SYNTHETIC; HONOUR-SYSTEM ONLY |
| Recorded Bronze track | Explicit stage control on Bronze | Starting/playing/paused/blocked/error/ended truth and no false player state | Local `Audio` owner plus shared `ksvl-player.js`; synthetic states pass | VERIFIED LOCALLY SYNTHETIC; HUMAN AUDIO/ADMISSION/NATIVE/PUBLIC HELD |
| Recorded BWS track | Explicit control on full BWS | Same truthful media state | Page-local owner plus shared KSVL script | VERIFIED LOCALLY SYNTHETIC; SINGLE-AUDIO INTEGRATION/HUMAN AUDIO HELD |
| KSVL handoff | Open `/radio.html` | KSVL catalogue/continuation; no listening completion | Track `businesswomens` exists in KSVL registry | OBSERVED; KSVL OWNER ADMISSION/CONTENT REVIEW REQUIRED |
| Resident Card handoff | Open `/laidies-card.html` | Separate Card/Closet only; no Bronze write/sync/reward | Explicit copy denies authority | VERIFIED LOCAL LINK/COPY; RECEIVING JOURNEY SHARED |
| Sorority House handoff | Purpose-copy link | Open wider community product; no post/member result | Static link only | OBSERVED; RECEIVING JOURNEY SHARED |
| Wednesday Tour check-in | Shared injected Bronze stop control | Exact shared check-in receipt and only authoritative downstream grants | `content/site/sv-tour-checkin.js` writes local tour, FAiRY Play, ritual/Express stores | OBSERVED; SHARED COMPLETION/REWARD CONTRACT UNACCEPTED |
| Charm hunt | Select unlocked Bronze charm | Canonical device-local charm receipt or honest failure | `content/site/charm-hunt.js`; four Bronze charm records, shared local stores | OBSERVED; SHARED RELEASE/ENTITLEMENT/FAILURE CONTRACT UNACCEPTED |
| You Are Here/town map | Open shared fixed chip | Accessible town map and route choice | `sunnyvaile-directory.js` + `sv-you-are-here.js`; also stamps local building visit | OBSERVED; VISIT SEMANTICS/FAILURE/CONSUMER CONTRACT UNACCEPTED |
| Tour visit/check-in and building-visit consumers | Load/check in and later open Closet/wallet | No badge/reward/count unless shared producer receipt is authoritative | Mixed shared local stores and derived renderers | MISSING ACCEPTED END-TO-END CONTRACT |
| Plausible | Page load or future controlled event | Aggregate privacy-safe product evidence only | Global tag present; no Bronze event calls, ingestion or review loop | NOT WIRED AT PRODUCT OUTCOME LEVEL |
| Clarity | Page load/session | Privacy-safe, masked qualitative evidence only if approved | Global session-recording tag present on all three routes; product masking/data proof not in Bronze evidence | OWNER/PRIVACY REVIEW REQUIRED |
| Image/environment failure | Missing/failed hero/object image | Live labels, station list and core action remain usable | Alt/live controls exist; full image-failure suite not evidenced | PARTIAL / BUILD BEFORE LAUNCH |
| Global/footer/navigation enhancements | Shared scripts and static links | Working routes without false downstream completion | Shared directory, accent and footer code | OBSERVED; SHARED RELEASE CHECK REQUIRED |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| First-time visitor | No valid Bronze receipt; no Card/account assumption | Room/content defaults only | Full orientation and all independent station choices | Local invite/calendar generation; optional verified local receipt; explicit audio action | Static handoffs only | Evergreen prompts, spirit-free route and named stations remain | VERIFIED LOCALLY SYNTHETIC; HUMAN COMPREHENSION HELD |
| Returning, no Resident Card | Strict valid Bronze receipt(s) on this browser | Last canonical drink IDs and valid coaster weeks | Truthful local return summary and relevant station continuation | Same local actions; no account/service privilege | Same-device Bronze only | Invalid/corrupt/future/duplicate state ignored; storage denial honest | VERIFIED LOCALLY SYNTHETIC |
| Resident Card — device-local | Separately valid `laidies_resident_card_v1`; Bronze does not currently consume it as authority | Bronze local receipts remain separate | No approved Bronze difference | Same actions as anonymous visitor | Link to separate local Card/Closet; no write/sync | Treat absent/invalid Card as ordinary complete Bronze visit | CONTRACT BOUNDED; TRANSITION/COMPREHENSION REVIEW REQUIRED |
| Resident Card — verified account-backed | Accepted auth/profile evidence, which Bronze does not consume today | No Bronze account history | No approved difference | No account-backed Bronze write, reward or private access | No cross-device Bronze continuity | Fall back to complete device-local/anonymous path | UNAVAILABLE / UNVERIFIED |
| Storage denied/corrupt | Read/write exception or receipt rejection | No admitted local state | Complete room without persistence | Copy/calendar/audio/content may continue; local receipt success withheld | Static handoffs only | Visible failure/retry; preserve unrelated storage | VERIFIED FOR CORE RECEIPTS SYNTHETIC |

Required but still incomplete transitions are clean first visit → return;
visitor → local Card → same-device return; Card update/deletion/revoke;
signed-in → sign-out; two tabs/devices; local/account conflict; shared tour,
charm and visit updates → every consumer; and privacy change/deletion →
analytics/recording cessation.

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BWS catalogue | `bws-data.js` module load | `bronze-aige-v2.js`; BWS inline controller | None | Module-private deeply frozen API; canonical stable IDs | Bronze embed; full BWS | Public content, no identity | Repair 2 source/artifact hostile matrices pass |
| Bronze drink receipt | Successful canonical BWS reveal and verified local write | Bronze/BWS receipt writers/readers | Browser storage | `laidies_bws_drink`, exact v2 envelope | Bronze arrival; BWS return | Device-local | Strict canonical/temporal evidence passes; no Card/Closet authority |
| Bronze coaster receipt | Explicit local self-attestation and verified write | Bronze inline + v2 reader | Browser storage | `laidies_bronze_coasters`, exact v2 week receipts | Bronze local stack/arrival | Device-local | Strict week/time/duplicate evidence passes |
| Invite text | Valid date/time selection | Bronze inline controller | Clipboard API or verified fallback | DOM/selectable text only | Visitor's chosen external channel after manual action | Session/local; no delivery receipt | Copy result is bounded; nothing sent |
| Calendar file | Valid date/time and download action | Bronze inline controller | Blob/object URL/browser download | Local `.ics`; no server store | Visitor's calendar app only after separate import | Local artifact | Synthetic creation/failure passes; native file inspection held |
| Episode prompt | Published episode index + admitted matching issue | `bronze-aige-v2.js` | Static fetch | `/content/episode-index.json`; literal admitted `/content/episodes/issue-NN.json` | Bronze Specials; deeper episode route | Public content | Fresh/stale/failure exact-artifact evidence passes through issue 04 |
| Framed answers | Episode/content owner | Bronze HTML + v2 tabs | Static files/routes | Current Bronze HTML copy; deeper episode canon | Bronze; episode/Library/High destinations | Public content | No separate atomic content registry/freshness record |
| Businesswomen's track | KSVL/audio catalogue owner | Bronze/BWS local controls; shared KSVL script | Browser media | `/content/music/game-businesswomens-special.mp3`; KSVL track ID `businesswomens` | Bronze, BWS, KSVL | Public media if admitted | File/registry present; creator-confirmed status; lyrics/transcript/captions and human judgment open |
| Resident Card | MAiKEOVER | Shared Card contract and Closet | Browser storage today | `laidies_resident_card_v1` | Card/Closet and approved presentation consumers | Device-local | Bronze does not write or sync |
| Wednesday Tour stop | Explicit shared check-in control | `sv-tour-checkin.js` | Browser storage; future Supabase hook not built | `laidies_tour_<week>` and related local stores | Tour UI, Closet/reward renderers | Device-local today | Handler writes several derived reward/progression stores without accepted shared transaction contract |
| FAiRY Play/Full Ritual/Express state | Shared tour completion logic | `sv-tour-checkin.js`; downstream renderers | Browser storage | `laidies_fairy_plays`, `laidies_ritual_done`, `laidies_express_done` | FAiRY/Closet/shared reward consumers | Device-local | No authoritative ledger, atomic grant, refund, replay or cross-device proof |
| Bronze charms | Shared charm selection | `charm-hunt.js` | Browser storage | `laidies_charms_found`; signup/tour completion keys | Charm UI/Closet | Device-local | Catalogue exists; exact release/admission/consumer correction contract incomplete |
| Building visit | Page load at Bronze | `sv-you-are-here.js` | Browser storage | shared visit key in script | Town map/Closet/cards/counts | Device-local | Page load increments visit-like state; not meaningful Bronze completion |
| Product analytics event | Future controlled interaction/result | None product-specific today | Plausible; Clarity for curated qualitative evidence | Shared event dictionary; provider data | Champion evidence/Control Room | Aggregate only | Ingestion/baseline/review loop missing; Clarity product privacy proof missing |

## 4. End-to-end transaction contracts

### Invite copy

`discover → choose valid local date/time → generate visible text → explicit
copy → Clipboard API or verified fallback → smallest confirmed result →
manual external use`

- Completion is confirmed copied text, never send/delivery/booking.
- Failure leaves the exact visible text selectable and preserves user input.
- Duplicate copies are harmless; no idempotency or backend is required.
- Analytics may record `copy_success|copy_failure` only, never text/date/time.

### Calendar file

`discover → validate date/time → construct escaped floating local VEVENT →
create Blob/object URL → user-triggered download → visible result → user
chooses whether to import`

- Completion is a confirmed local download event plus inspected file in native
  evidence; it is not calendar import.
- Object URL creation, click and revoke failures remain persistent and make no
  success claim.
- No identity, attendee, analytics or private invite payload enters the file.

### BWS reveal and local receipt

`discover → import/validate private canonical API → choose lane/mood →
canonical result → exact v2 receipt → local write → read-verify → visible
saved/not-saved result → return revalidation`

- Completion is canonical reveal plus verified local receipt only when save is
  claimed.
- Canonical item/mood/lane IDs, exact keys, zero-future timestamps and module
  provenance are mandatory.
- Missing/hostile/invalid catalogue or blocked storage creates no success and
  writes nothing.
- Change overwrites the one local last-suggestion receipt; delete/export is
  not currently offered and needs an owner contract if added.

### Coaster

`discover → explicit self-attestation → derive current canonical ISO week →
reject duplicate/future/conflict → local write → read-verify → show local
stack → return revalidation`

- Completion is one verified device-local week mark, never attendance,
  identity, drinking, learning, badge or reward.
- Duplicate weeks are no-op; failed writes show nothing marked.
- Removal/export is absent; adding either requires an explicit local-data
  contract.

### Episode prompt

`open menu → fetch/check index status/schema → select latest published →
resolve literal admitted issue path → fetch/check matching issue/schema/date →
classify current/latest → render prompt or evergreen fallback → deeper route`

- Completion is a correctly classified prompt render, not conversation or
  learning completion.
- No-published, stale, malformed, mismatch, missing and network failure remain
  useful and never claim currentness.
- Content owner must define correction/removal propagation beyond issue 04.

### Audio

`discover → verify admitted source/metadata → explicit play → media promise and
playing event → visible/programmatic state → pause/end/error/retry → KSVL or
non-audio continuation`

- Browser playback state is not human audible-quality, rights or learning
  proof.
- Exactly one audio owner may play; another owner pauses/yields without
  surprise resume.
- Missing/held/blocked/decode/network media shows a persistent recovery and no
  false playing state.
- Analytics may record controlled attempt/result/error and track ID only after
  privacy approval; never position-by-person or a listening-complete claim.

### Shared tour/charm/visit/reward

`discover/load → shared authority admits action → explicit meaningful action →
idempotent shared receipt → authoritative grant if applicable → all consumers
read same result → correction/revoke/refund`

- This contract is not currently accepted for Bronze.
- Page load, station open, manual tour check-in, charm click and coaster mark
  are distinct events and cannot substitute for each other.
- Bronze must not build a parallel reward ledger. Shared implementation queues
  behind Control Room, Rewards/Economy and Functionality & Platform.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
| --- | --- | --- | --- | --- | --- | --- |
| Embedded/full BWS reveal | Bronze arrival and full BWS | Canonical local v2 receipt | `/bronze-aige.html#bronze-fortune`; full-table route | Latest verified suggestion replaces prior local receipt | No product UI today; future removal must clear both consumers | Repair 2 invalid/module/storage fixtures |
| Bronze invite/calendar | Visitor-controlled external tools only | Visible text or local `.ics` | Bronze invite panel | Date/time updates regenerate both | User controls copied/file artifact externally | Synthetic copy/download/failure; native import held |
| Episode publication/correction | Bronze Specials/Answers and deeper episode routes | Admitted issue number/date/prompt/source | Exact issue route | Index/issue update on next fetch; answer copy needs explicit freshness update | Removed/held issue must fall back and remove stale claim | Current/stale/malformed/mismatch/failure fixtures |
| Audio admission/change/hold | Bronze, BWS and KSVL | Track ID/source/status/metadata | `/radio.html` and `/bronze-aige.html` | All controls/catalogues must bind same admitted record | Hold/remove disables play and invalidates return state everywhere | Local media states pass; admission/human/public gates open |
| Card create/edit/delete | Card/Closet and approved presentation consumers | Shared bounded Card projection | Separate Card/Closet route | Bronze currently shows no Card-derived state | Bronze remains complete with no Card | Receiving product evidence; Bronze transition not human-tested |
| Wednesday Tour Bronze check-in | Shared tour, reward and Closet consumers | Stop/week/idempotency receipt | Shared tour continuation | Exact stop status updates all surfaces | Correction/revoke removes derived grants consistently | Missing accepted shared transaction evidence |
| Bronze charm collect | Charm/Closet consumers | Canonical charm/release receipt | Closet/charm route | One canonical collection state | Removed/corrected charm propagates | Missing accepted shared correction/denied-write evidence |
| Bronze page load/visit | Town map/visit-card consumers | Device-local route visit only | Town map | Visit count may update after cooldown | Reset/delete/privacy contract missing | Silent failure in shared script; semantics unaccepted |
| Plausible/Clarity event | Aggregate owner evidence only | Allowlisted event/result/failure class | None | Provider ingestion/review | Consent/privacy deletion/retention required | Product event and Clarity masking tests missing |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Businesswomen's Special subproduct dossier/state missing | Full-table product has code but no durable owner contract | Recover registry-bound dossier/state; reconcile job, content, audio, local receipt, accessibility and return path | Portfolio Control Room | BWS subchampion + Bronze | Registry paths `businesswomens-special/CHARTER.md`, `state.json`; BWS route/data/tests | Targeted subproduct preflight plus owner/parent sign-off | BUILD BEFORE LAUNCH |
| Cocktail Fortune subproduct dossier/state missing | Redirect relationship can drift or misreport product identity | Recover retirement/redirect contract, receiving owner, analytics and rollback | Control Room + Mme CLAi-O | Cocktail Fortune subchampion + Bronze | Registry paths `cocktail-fortune/CHARTER.md`, `state.json`; redirect route | Targeted preflight; source/artifact/public redirect/no-loop/analytics proof | BUILD BEFORE LAUNCH |
| Shared tour/reward authority unaccepted | A manual Bronze check-in can create reward/badge-like local state without authoritative transaction proof | Define released-week authority, semantic completion, idempotent grant ledger, failure/refund/correction and all consumers | Rewards/Economy + Functionality & Platform | Bronze consumes | `sv-tour-checkin.js`, reward/Closet/FAiRY consumers, future backend | Duplicate/replay/failure/refund/two-device/consumer suite | BUILD BEFORE LAUNCH |
| Charm/visit semantics and consumer propagation unaccepted | Page load or charm click can look like relationship/reward completion | Versioned visit/charm receipt, release manifest, meaningful semantics, failure/delete/correction and consumer contract | Rewards/Economy + Platform | Bronze consumes | `charm-hunt.js`, `sv-you-are-here.js`, directory, Closet/wallet renderers | Clean/return/duplicate/storage-denied/correction/remove/privacy suite | BUILD BEFORE LAUNCH |
| Audio admission/content/craft/public binding incomplete | Visitor may receive a playable file without reconciled lyric/caption/human-quality/public claim evidence | Bind Bronze controls to current KSVL authority; reconcile creator-confirmed policy, lyrics/transcript/captions, human listening, single-audio and public artifact | KSVL/audio + Release | Bronze/BWS | KSVL registry/spec/state; MP3; Bronze/BWS/KSVL controls | Registry/source parity, human review, native player, two-owner, artifact/public suite | BUILD BEFORE LAUNCH |
| Framed-answer/current-content authority incomplete | Static answer may become stale or lose source relationship | Atomic content inventory with source episode, freshness/correction owner, admitted status and deeper route | Episode + Learning Content | Bronze | Bronze HTML, episode canon/issues | Accuracy/instructional review; corrected/held/removed propagation | BUILD BEFORE LAUNCH |
| Product analytics and Clarity privacy proof missing | Owner cannot measure useful outcomes; session recording may capture prohibited state without a proved masking contract | Approve allowlisted Bronze events, consent/masking/retention/deletion, ingestion, baseline and review cadence | Analytics/Privacy + Platform | Bronze | Shared event dictionary, Plausible/Clarity configuration, three routes | Network payload inspection, masked-input/session proof, API/export ingestion, zero prohibited fields | BUILD BEFORE LAUNCH |
| Native accessibility and image/media failure evidence missing | Synthetic pass can hide Safari/VoiceOver/zoom/device and art-failure defects | No backend; execute native/device/AT and image/audio failure suite | Accessibility + Release | Bronze/BWS | Routes/CSS/media/art | Safari, VoiceOver, 200%, text spacing, physical devices, image/audio failure evidence | BUILD BEFORE LAUNCH |
| Cosmo/room/sitewide style decisions open | No final owner-review building candidate can be selected | Owner decision plus controlled style/structure competition and exact-use art pipeline | Brand & Experience + Control Room | Bronze | Experience brief, style championship, artwork system, Bronze assets | Incumbent + two challengers, red team, blind ≥17/20, full-res judge, Ali ruling | OWNER DECISION REQUIRED |
| Alcohol policy/activation authority open | Safe local copy cannot authorize public partnership/service/promotion | Keep conservative no-service/no-encouragement floor; obtain owner/legal/operational ruling before any expanded activation | Ali + Trust/Safety + Control Room | Bronze/BWS | Experience/spec/copy/catalogue and any future partner/service | Exact claim/provenance/policy review plus affected journey evidence | OWNER DECISION REQUIRED |
| Exact deployment/public-origin suite not run | Local pass cannot prove public routes/assets/data/media/providers | Bind exact commit/artifact, deploy only with authority, repeat bounded journeys and rollback | Release/Platform | Bronze | Build scripts, manifest, public origin | Full SHA/artifact parity, route/media/content/failure/public tests | BUILD BEFORE LAUNCH |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** Bronze has no accepted account
  behavior; shared header and Card destinations cannot lend it identity.
- **Saves/progression/Closet:** Bronze receipts are separate device-local
  state; tour/charm/visit/Closet consumers require shared reconciliation.
- **Rewards/economy/ownership/fulfilment:** Bronze grants no reward. Current
  shared tour code writes FAiRY Play/ritual-like state and must be reconciled
  rather than copied.
- **Community/moderation:** Sorority House owns wider conversation and posts;
  Bronze collects no discussion.
- **Referrals/postcards/newsletter/delivery:** Bronze copy/calendar actions are
  local only and cannot claim delivery.
- **AI service quality/safety:** No AI call exists in the bounded product.
- **Content/media admission and freshness:** Episode owners govern prompts and
  answers; KSVL governs audio; BWS needs its own dossier.
- **Analytics/customer evidence:** event dictionary exists but Bronze event
  emission/ingestion and Clarity privacy proof do not.
- **Release/build/runtime:** explicit issue map and module-private catalogue
  must remain package-visible; exact artifact is not deployment/public proof.

## 8. Verification and approval

The Bronze owner verifies the intended result and complete visible inventory
after Ali/shared decisions. The Functionality & Platform Director verifies
shared stores, services, completion events and collision handling. BWS,
Cocktail Fortune, KSVL, Episode, Resident Card, Sorority House,
Tour/Rewards/Closet, Analytics/Privacy and Release owners verify both sides of
their handoffs.

Independent verification must run source and fresh exact-artifact checks,
native accessibility/audio evidence, owner visual/comprehension review and the
bounded public-origin suite. The current 92/100 Repair 2 pass protects the
service/catalogue/receipt/calendar/episode/audio mechanics it actually tested;
it does not approve the recovered whole-building intent, shared integrations,
native experience, design or public release.
