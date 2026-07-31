# Visitor’s Centre — functionality and touchpoint map

> **OWNER RECONCILIATION — 2026-07-26:** Preserve this map as the required
> capability/truth inventory. Ali rejected the neutral front-desk/map/directory
> experience base. No current implementation/evidence row is visual authority;
> the replacement must recover the functions inside the environment described
> in `REPLACEMENT-EXPERIENCE-BRIEF-2026-07-26.md`.

**Status:** RECOVERY COMPLETE — OWNER REJECTED PRIOR BASE; REPLACEMENT
EXPERIENCE REQUIRED; shared-platform and owner gates remain open.

**Product owner:** `visitors-centre-champion`

**Functionality & Platform Director:** review required before any integration.

**Evidence cut:** 2026-07-26. Current production source and the isolated
Fold-Out Map Counter candidate are separate artifacts throughout this map.

## 1. Complete capability and visible-element inventory

| Capability/element | Trigger/page | Intended visible result | Current implementation/evidence | Build-policy status |
|---|---|---|---|---|
| Front-desk arrival/orientation | Open `/visitors-centre.html` | Understand place, map/name choice and optional handoffs within ten seconds | Production copy at `visitors-centre.html:988-995`; human comprehension unproved | BUILDING |
| Exact town map | Load/select map | Exact final-v5 map; selection reveals one truthful destination | Production map at `:981-985`; 17 hotspots are created from `SV_BUILDINGS` at `:1288-1307`; bounded local pass | BUILDING — preserve in intended integration |
| Named select | Choose `#vc-directory` | Same 17 destinations and same reveal as map | Enhanced from shared directory at `:1303-1307`; local/browser pass | BUILDING — shared parity dependency |
| Static/no-JS full directory | JS absent or shared directory fails | All 17 names/routes remain usable | Static contracts at `:1026-1047`; Repair 1 independent pass | BUILDING — release-time parity required |
| Destination truth reveal | Map/select choice | Name, address, held/limited state, current summary, limitation and qualified route action | Contract extracted from static DOM at `:1211-1218`; mismatch fails held at `:1257-1285`; Repair 1 independent pass | BUILDING — authoritative freshness service missing |
| Reveal close/focus return | Escape/Back | Reveal closes and focus returns to initiating control | `:1230-1248`, `:1324-1337`; local Chrome pass | BUILDING — native AT proof open |
| Map failure recovery | Map asset error | Named directory remains and polite failure appears | `:1316-1322`; local Chrome pass | BUILDING — public/native proof open |
| Shared-directory failure recovery | `SV_BUILDINGS` absent | Enhanced select disabled; full static directory shown | `:1309-1314`; local Chrome pass | BUILDING — public proof open |
| Optional Welcome Tour offer/start | `?welcome-tour=start` or offer | Explicit start only; local step is restored; storage denial keeps directory usable | Shared `sv-welcome-tour.js:231-280`; local evidence exists | BLOCKED — BUILD REMAINS REQUIRED: shared KSVL truth conflict |
| Welcome Tour completion | Follow 17 stops/finish | Shared tour may record local completion only | `sv-welcome-tour.js:121-190`; no Centre reward/account result | BUILDING — complete transition/native/public proof open |
| Illustrated trailer handoff | Open `/watch.html?ep=trailer` | Handoff only; receiving surface owns playback | Production link at `visitors-centre.html:1050-1062` | BUILD BEFORE LAUNCH — receiving-owner admission/public proof |
| First-fifteen-minutes route | Open episode/handbook/MAiKEOVER/Post Office links | Optional orientation links with truthful receiving status | Production at `:1065-1078`; absent from isolated candidate | OWNER DECISION REQUIRED — retain/remove/relocate with visual ruling |
| Postcard art chooser/form | Choose card, handle/note | Prepare transient share payload without claiming delivery | Production at `:1081-1114`, script `:1353-1474`; absent from isolated candidate | OWNER DECISION REQUIRED — intended candidate uses handoff ticket |
| Native share handoff | “Open share sheet” | Report only returned/cancelled handoff | `:1443-1455`; real-device proof open | BUILDING if retained; Post Office owns lifecycle |
| SMS/email handoff | “Open text/email” | Open native URI; state sending is unconfirmed | `:1393-1399`, `:1436-1441` | BUILDING if retained; real-device proof open |
| Copy-link handoff | “Copy link” | Copy or show manual dialog; no delivery claim | `:1458-1470` | BUILDING if retained; clipboard/privacy review open |
| Local handle prefill | Page loads postcard composer | At most a validated device-local display value | Reads bare `laidies_card_username` at `:1414-1418`; this does not prove Card identity | BLOCKED — BUILD REMAINS REQUIRED: shared identity contract or remove with approved composition |
| “What is SUNNYVAiLE” explainer | Expand current details | Editorial context | Production at `:1118-1142`; absent from isolated candidate | OWNER DECISION REQUIRED |
| Founder note | Expand current details | Founder context | Production at `:1144-1183`; absent from isolated candidate | OWNER DECISION REQUIRED; Town Hall/canonical owner handoff required |
| Plausible bootstrap | Page load | Privacy-safe approved events only | Generic script/init at `:966-972`; no approved Centre event calls | BUILD BEFORE LAUNCH |
| Global header/footer/navigation | Page load | Shared consistent navigation/recovery | Consumed shared scripts and markup; not Centre-owned | BUILDING — shared release dependency |
| Fold-Out Map Counter environment | Open isolated candidate | One room/counter owns map, reveal and optional tickets across desktop/mobile | Isolated candidate passes 79 headless-Chrome checks; no independent visual/owner approval | OWNER DECISION REQUIRED; integration prohibited |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No reliable state | None | Neutral front-desk arrival and optional first-time tour offer | Destination selection/hash; explicit tour start only | Chosen route only | Full directory under JS/data/map failure | BUILDING — automated candidate pass; human/native/public open |
| Returning, no Resident Card | Valid `laidies_welcome_tour` proves local tour state only | `step`, `done`, `skipped`, timestamps from localStorage | Active tour resumes/pauses; skipped/done suppresses new offer; otherwise neutral arrival | Local tour write only | Same device only | Storage denial shows focused truthful recovery | BUILDING — corrupt/migration/two-tab proof open |
| Resident Card — device-local | No accepted Centre-specific Card validator; bare username string is insufficient | Current production composer may read `laidies_card_username` | No accepted resident-specific arrival; core must remain identical | No reward/account writes; local prefill is under review | None proved beyond device | Withhold personalization if invalid/deleted/revoked | BLOCKED — BUILD REMAINS REQUIRED: identity validation or approved removal |
| Resident Card — verified account-backed | No current Centre implementation/evidence | None | No accepted difference | None | None | Anonymous core remains available | BLOCKED — no contract; must not imply account/sync |

Required transition dispositions:

| Transition | Current evidence | Required proof | Status |
|---|---|---|---|
| First visit → leave → return without Card/tour | Neutral page exists; no human evidence | Same device, no false first/resident inference | BUILDING |
| Start tour → leave → return | Local write/read code and active-tour candidate state pass | Corrupt/migrated/two-tab/native/public proof | BUILDING |
| Start tour with storage denied | Focused recovery locally tested | Native AT and public exact-artifact proof | BUILDING |
| Visitor → device-local Card | External MAiKEOVER/identity path | Shared Card validation and Centre behavior | BLOCKED — BUILD REMAINS REQUIRED |
| Local Card → account | No Centre contract | Functionality & Platform contract and separate evidence | BLOCKED — BUILD REMAINS REQUIRED |
| Sign out/second device/conflict | No Centre contract | No stale resident presentation; anonymous fallback | BLOCKED — BUILD REMAINS REQUIRED |
| Card update/delete/revoke | Bare username may become stale | Propagation/removal proof or no prefill | BLOCKED — BUILD REMAINS REQUIRED |

## 3. Producer → service/store → consumer map

| Capability/data | Producer page/event | Frontend module | Service/provider | Authoritative store/key | Consumers | Scope | Current truth |
|---|---|---|---|---|---|---|---|
| Building names/IDs/routes/coordinates | Shared platform directory change | `content/site/sunnyvaile-directory.js` → Centre enhancement | Static release artifact | Shared directory source | Centre map/select; other town surfaces | Public/build-time | Current 17-route local parity passed; release-time reconciliation missing |
| Destination admission summary/limitation | Destination champion/Control Room decision | Static `data-vc-*` records in `visitors-centre.html` | None | Duplicated embedded Centre contract; true canonical owner source is external to page | Centre reveal/static list | Public/build-time | Fail-closed locally, but can become stale; authoritative generation/sync missing |
| Selected destination | Map/select interaction | Inline Centre controller | None | URL hash/presentation state only | Centre reveal; browser history | Session/URL | Selection is not completion or readiness |
| Destination handoff | Explicit CTA | Anchor navigation | Static host/receiving route | Receiving product owns completion | Receiving product | Public | Route opening only |
| Tour state | Explicit start/advance/skip/finish | `sv-welcome-tour.js` | Browser localStorage | `laidies_welcome_tour` | All pages loading shared tour | Device-local | Exists; KSVL copy contradicts Centre contract |
| Trailer intent/playback | Centre link | Anchor → trailer player on receiving route | Static media/player | Episode Experience source | Watch surface | Public/device player state | Centre proves intent only |
| Postcard handle/note/card | Centre form if retained | Inline postcard controller | Native share/SMS/mailto/clipboard | Transient DOM and generated URL; no delivery store | Native app; `/postcard.html`; Post Office | Session/device handoff | No send/open/join/reward proof |
| Local username prefill | MAiKEOVER/legacy Card writer | `readLocal("laidies_card_username")` | Browser localStorage | Bare key, validation unknown | Centre postcard From field | Device-local | Cannot establish Card/resident identity |
| Analytics | Centre event after approval | Plausible client | Plausible | Aggregate analytics | Champion/Control Room | Aggregate/public | Generic tag only; event contract not wired |
| Candidate room art | Approved visual maker after ruling | Future Centre production HTML/CSS | Static asset host | Versioned approved asset path | Centre desktop/mobile | Public artifact | Candidate files isolated; not approved or production |

## 4. End-to-end transaction contracts

### Destination orientation and handoff

`discover room → choose map/select/list → validate ID and exact route against
embedded contract → fail held on missing/mismatch → render name/status/summary/
limitation → focus qualified CTA → explicit navigation → receiving route owns
completion`

- Authoritative Centre completion: a correctly bound explicit handoff intent
  and navigation to the selected route; it never stands for receiving-product
  success.
- Duplicate/idempotency: repeated selection rewrites presentational state/hash;
  no authoritative transaction or reward occurs.
- Cancel/retry: Back/Escape closes and restores focus; a new selection is safe.
- Update/removal: shared directory or destination admission change requires
  regeneration/reconciliation of all 17 embedded contracts and tests before
  release.
- Privacy/security: destination ID and input method may be aggregate event
  properties; no identity or content is required.
- Accessibility: live result, visible held state, qualified CTA, focus entry
  and focus return are mandatory.

### Welcome Tour

`explicit offer/start → localStorage authorization/write → render current stop
→ advance/skip/finish → read after navigation → resume or suppress offer`

- Authoritative completion: local `done: true` after explicit finish; this is
  not learning, account, reward or cross-device completion.
- Duplicate/idempotency: explicit start currently rewrites step 1; desired
  restart/confirm semantics require shared-owner review.
- Failure: storage denial must preserve full directory and announce local
  limitation; corrupt state currently falls back to `null` and needs explicit
  transition evidence.
- Delete/revoke: local storage deletion returns a neutral/first-offer state;
  privacy deletion and account linkage are not defined.
- Trust blocker: KSVL stop copy at `sv-welcome-tour.js:50` promises listening
  while the Centre contract requires held-playback language.

### Postcard handoff if retained

`choose card → enter transient handle/note → construct URL/message → invoke
native share/SMS/mailto/clipboard → observe returned/cancelled/copy result →
route to Post Office for the real lifecycle`

- Authoritative Centre completion: handoff invocation/returned result only.
- No Centre authorization exists to claim sent, delivered, opened, joined,
  subscribed, referred, rewarded or refunded.
- Duplicate/retry: repeated native invocations are outside Centre observation;
  no reward/idempotency ledger may be written.
- Privacy: note/handle/email must not enter analytics or persistent Centre
  storage; URL disclosure implications require Post Office/Privacy review.
- Removal: candidate replaces composer with a ticket, but production removal
  requires owner ruling and Control Room integration lock.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke | Failure evidence |
|---|---|---|---|---|---|---|
| Directory change | Centre map/select/static list and all shared directory consumers | Name/ID/route/coordinates | Destination hash/route | Build-time parity test required | Removed destination must disappear or fail held everywhere | Current static/shared mismatch tests exist locally |
| Destination admission change | Centre reveal/static copy; destination route | Held/limited status, summary, limitation | Qualified route | No authoritative automatic propagation exists | Missing record fails held locally | Shared owner freshness path missing |
| Tour start/advance | Every page loading shared tour | Local step/status | Current/next stop route | Same-device storage | Clear/delete returns neutral | Storage-denied local pass; other transitions open |
| Trailer open | Watch surface | Trailer query only | `/watch.html?ep=trailer` | Receiving owner | Receiving owner | Centre has no playback evidence |
| Postcard handoff | Native app, `/postcard.html`, Post Office | Card ID, optional handle/note URL/message | Postcard route | Provider/lifecycle owner | Provider/lifecycle owner | Centre reports handoff only |
| Card username update/delete | Centre composer if retained | Bare local username today | None | No validated propagation proof | Stale value risk | BLOCKED pending identity contract |
| Centre event | Plausible aggregate | Product/destination/input/result category only | None | Analytics pipeline | Retention/deletion per shared policy | Not wired |

## 6. Missing backend/integration register

| Gap | User consequence | Required work | Shared owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| No authoritative destination-admission feed/generator | Embedded held/limited copy can become stale | Define canonical owner-status input, build-time generator/check and fail-closed release reconciliation | Control Room + Functionality & Platform + 17 destination owners | Visitor’s Centre | `visitors-centre.html`, registry/status source, build/validation scripts | All 17 exact records match owners immediately before release; update/removal test passes | BUILD BEFORE LAUNCH |
| Shared Welcome Tour KSVL contradiction | Front desk and escort make incompatible playback claims | Reconcile KSVL current admission once in shared tour and receiving owner; rerun all consumers | Functionality & Platform + KSVL | Visitor’s Centre consumes | `content/site/sv-welcome-tour.js:50`, `scripts/test-visitors-centre-contract.mjs:94`, KSVL dossier/source | Contract suite PASS plus KSVL owner confirmation | BLOCKED — BUILD REMAINS REQUIRED |
| Unvalidated local username prefill | A bare string may imply resident identity or remain after deletion | Consume validated shared Card projection or remove prefill as part of approved composition | Identity/Functionality & Platform | Visitor’s Centre | `visitors-centre.html:1414-1418`, shared Card store/adapter | First/local-Card/delete/revoke/conflict tests; no false resident claim | BLOCKED — BUILD REMAINS REQUIRED |
| No approved Centre analytics events | No evidence of choice friction/comprehension; generic tag can be overread | Approve privacy-safe event dictionary, implement exact calls, validate production payload and prohibited data | Functionality & Platform + Analytics/Privacy | Visitor’s Centre | Plausible client/config, Centre event module | Event schema/payload tests; no handle/note/email/raw session data | BUILD BEFORE LAUNCH |
| No integrated approved arrival composition | Current page remains detached stack; candidate is isolated | Independent visual gate → Ali ruling → locked narrow integration → exact QA | Control Room + Brand/Experience | Visitor’s Centre | Candidate folder, future versioned production assets, `visitors-centre.html` | Approved desktop/mobile scenes; full source/artifact/native/human/public gates | OWNER DECISION REQUIRED, then BUILD BEFORE LAUNCH |
| Native accessibility/comprehension/public proof absent | Automated Chrome pass cannot prove real arrival quality | Run five-person newcomer/returning protocol, Safari/VoiceOver/zoom/text-spacing/real-device share and public-origin suite | Accessibility + Control Room/Release | Visitor’s Centre | Exact integrated artifact | Named evidence for every state/transition | BUILD BEFORE LAUNCH |
| Postcard lifecycle is external | Centre cannot prove send/open/join/reward | Keep handoff-only or consume Post Office contract; never invent Centre ledger | Post Office + Functionality & Platform | Visitor’s Centre | `/postcard.html`, `/post-office.html`, native APIs | Provider and receiving-owner evidence if promised | BUILD BEFORE LAUNCH for any retained promise |

## 7. Shared-contract collision check

- Identity/account/profile/permissions: current bare username prefill is not an
  accepted Card projection; no Centre-specific identity system may be created.
- Saves/progression/Closet: the Centre owns none and must not write a visit,
  save, membership or completion into the Closet.
- Rewards/economy/ownership/fulfilment: none; no Clips, Plays, stamps,
  collectibles or referral rewards for map/tour/postcard intent.
- Community/moderation: none in core orientation; receiving community routes
  own access and moderation.
- Referrals/postcards/newsletter/delivery: Post Office owns lifecycle and
  authoritative outcomes; Centre handoff copy stays bounded.
- AI service quality/safety: no Centre AI call.
- Content/media admission: exact map and current destination statuses require
  canonical admission; trailer/KSVL claims remain receiving-owner contracts.
- Analytics/customer evidence: proposed Centre events require shared privacy
  approval and must exclude form content/identity.
- Release/build/runtime: Control Room must assign a lock because the intended
  integration touches the live Centre route and consumes shared tour,
  directory, identity, analytics and destination-owner truth.

## 8. Verification and approval

- Product owner has reconciled the complete visible inventory, intended
  arrival result and current source/candidate split.
- Current production source SHA-256:
  `413da8c6237dbc17165e53921a1ef4f7c0e4a67647f62b4a4f90c839ac16d5a7`.
- Current shared tour SHA-256:
  `61ccc9ca1db993420ee5c3cb5d5e823a43a07bcd161e2d9b60a3f3f29ac0bb88`.
- Current contract suite: FAIL only on the shared KSVL tour claim.
- Current isolated candidate suite: PASS, 79 checks; this is bounded local
  evidence, not owner, native, comprehension, downstream or public proof.
- Functionality & Platform review: REQUIRED for every row in Section 6.
- Affected owners: Town Entry/Homepage, KSVL, Post Office, Episode Experience,
  Identity, Analytics/Privacy and all 17 destination champions at release-time
  reconciliation.
- Control Room owns the integration lock, candidate binding, release order and
  rollback. No live integration is authorized by this map.
