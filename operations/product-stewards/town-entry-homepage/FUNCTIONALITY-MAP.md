# Town Entry & Homepage functionality and cross-page touchpoint map

**Status:** CURRENT CAPABILITY PROJECTION RECORDED — VISUAL DIRECTION PENDING ALI
**Product owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Updated:** 2026-08-23
**Release boundary:** the Sunday correction is public; the admitted Homepage
direction and complete-page redesign are not deployed.

## Current Homepage promotion truth

This table controls the next Homepage build. HTTP 200, source presence and a
local route are not enough to promote a receiver as working.

| Homepage job | Current status | Safe visitor action | Prohibited implication |
|---|---|---|---|
| Current public Homepage baseline | `PUBLICLY_VERIFIED` | New in town?; Start learning; Explore the town | The admitted redesign is not deployed or owner-approved |
| Latest published episode | `PUBLICLY_VERIFIED` | Read Episode 04 · The Founding Mothers | No draft Episode 05, Wednesday-currentness or complete weekly-experience claim |
| Released NewsStand archive | `PUBLICLY_VERIFIED` | Read the NewsStand archive | Never label it latest/current without a new admitted record |
| Breaking / Daily / Paige / Career / Promptoscope | `MISSING_RECEIVER` | Honest current-news empty state plus archive | No live/fresh service claim |
| Wednesday itinerary | `SOURCE_PRESENT_UNVERIFIED` | Explore the route; each stop states availability | No complete weekly experience, progress or reward claim |
| Homepage question handoff, Miss Jeeves and LIBRAiRY | `PUBLICLY_VERIFIED` | Ask Miss Jeeves; Search or browse the shelves | No complete reference tool or readable-book claim |
| Homepage → KSVL | `PUBLICLY_VERIFIED` | Listen to KSVL | No account sync, reward or uninterrupted-navigation claim |
| LUMINAiRY / Patron Saints / MAiVENS / Trailblazers | `PUBLICLY_VERIFIED` for the route/artifact | Meet the women behind AI at the LUMINAiRY | No unadmitted individual profile or claim |
| Explore / map / named buildings | Map geometry/focus `PUBLICLY_VERIFIED`; remaining receiver journeys `SOURCE_PRESENT_UNVERIFIED` | Direct named building links; optional map | A working map does not prove every destination's complete function |
| Resident Card / Closet | Signed-out Homepage handoff `PUBLICLY_VERIFIED`; Card/Closet lifecycle `SOURCE_PRESENT_UNVERIFIED` | Sign in; Make a Resident Card; Open my Closet | No account-backed resume, cross-device state, reward or ownership claim |
| Wednesday Postcard | `MISSING_RECEIVER` | Request the Postcard at the Post Office | No subscription, confirmation, delivery, referral or reward claim |
| Businesswomen's Special | `PUBLICLY_VERIFIED` | Visit the Businesswomen's Special | Cocktail and spirit-free remain equal choices; no order, service, account or reward claim |
| FAiRY Godmother / Mme CLAi-O / Dream Phone / Delta LAi Nu Homepage handoffs | `PUBLICLY_VERIFIED` | Open the named activity from its Homepage card | Arrival proves the handoff, not every destination lifecycle or reward |
| Visitor's Centre | Orientation handoff `PUBLICLY_VERIFIED`; redesign/tour/trailer `HOLD` | Visit the Visitor's Centre; Get oriented | No complete tour, trailer, postcard or redesign claim |

The detailed recovered architecture below remains useful for transaction and
failure design. Where one of its older status labels conflicts with the table
above, the current projection above wins.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Promise/hero hierarchy | Load `/`; choose a stable visitor job | Understand practical AI value and one safe next step | Current hero routes to page sections, but its Episode action can be rewritten by latest content | CONTRACT CONFLICT — HERO MUST BE EVERGREEN |
| Desktop/mobile entry navigation | Topbar link or menu button | Same named route set; clear open/close/focus behavior | Inline homepage topbar plus shared scripts; current rendered full matrix absent | OBSERVED |
| Method/mission | `#method` | Understand story → concept → practice → music → optional town | Five-step current source; repeats several downstream entrances | OBSERVED |
| Current episode | Three Homepage Latest Episode controls | Exact latest published episode and intentional receiver | At both public origins and 1440/390/320, all three controls resolve to `/issues/issue-04.html`, expose `Latest Episode: The Founding Mothers`, land on exact Episode 04 title/heading and do not promote draft Episode 05 | PUBLICLY VERIFIED |
| Episode failure fallback | Non-OK/empty/invalid index | Previously-published evergreen route | `showEvergreenFallback()` | VERIFIED LOCALLY FOR NAMED STATE |
| The Breaking/The Daily | Homepage current-news module | Conditional Breaking and current Daily explanation | D-043 only; no module/admitted shared feed | MISSING |
| Current-content boundary | Fresh owner-admitted episode/news receipt | Render only in separate `#current` module below hero | Current receiver exists, but also mutates `.entry-episode-action` | REPAIR AFTER BRAND RULES |
| Full/Express route | Weekly route links | Optional route sequence with truthful step state | Static links plus `sv-tour-checkin.js` local visit paint/rewards | OBSERVED; AUTHORITY CONFLICT |
| Activities | Filter/button/link | Admitted tool/game route and limits | Five named Homepage actions reached their real receiving pages at both public origins and 1440/390/320 | PUBLICLY VERIFIED FOR NAMED HANDOFFS; DESTINATION LIFECYCLES PARTIAL |
| Lookup | Submit reference form | Library arrival without retaining the query in the URL or analytics | At both public origins and 1440/390/320, blank submit focuses the input; a real question transfers client-side, cleans the URL, runs the direct grounded answer and introduces no overflow | PUBLICLY VERIFIED |
| Map popup | Activate hotspot; Escape/outside click | Named destination, limitation and link; focus recovery | Current production renders real desktop/mobile hit regions, focuses the destination link and restores the trigger on Escape | PUBLICLY VERIFIED AT BOTH ORIGINS, 1440/390/320 |
| District cards/directory | Select route | Accessible alternate discovery | Six district cards route to single buildings; long directory repeats map | OBSERVED; ROLE/HIERARCHY OPEN |
| Start Here | Load `/start-here.html` | Visitor's Centre redirect or ordinary fallback link | Meta refresh, `location.replace`, ordinary link | OBSERVED |
| Card/Closet handoff | Select resident action | Exact local/account scope and route | Signed-out Homepage action now reaches the visible Resident Card email form at both origins and 1440/390/320; local Card and Closet lifecycle remains separate | PUBLICLY VERIFIED FOR SIGNED-OUT HANDOFF; LIFECYCLE PARTIAL |
| Auth/resume projection | Token or future `svShowResume` call | Only proved account/resume state | Signed-out entry is labelled `Sign in`; token/account continuation and cross-device state are not promoted without lifecycle proof | SIGNED-OUT ENTRY VERIFIED; SIGNED-IN CONTINUATION NOT PROVED |
| Tour/reward paint | Visit route/check stops | Honest local progress only unless authoritative service proves more | Shared script mints local FAiRY Play, ritual badge and express completion from route visits | OBSERVED; CONTRACT CONFLICT |
| Charm hunt | Hidden charm interaction | Truthfully local collectible state | Shared local-storage script is loaded | OBSERVED; ENTRY VALUE/ACCESSIBILITY OPEN |
| KSVL handoff | Activate any labelled Homepage KSVL route | Intentional radio-studio arrival with explicit Listen controls and no autostart | At both public origins and 1440/390/320, Homepage exposes the labelled anthem/station routes; KSVL arrives with its exact heading, at least three Listen controls, the exact 29-track statement, zero audio before action and no overflow. The release KSVL suite separately covers decoded audio, denial/retry, seek and persistence. | PUBLICLY VERIFIED |
| Newsletter | Submit homepage form | Provider request then inbox confirmation/error | Buttondown popup/embed; Post Office contract test passes, real lifecycle absent | PARTIAL |
| Analytics | Page/action | Privacy-safe aggregate entry evidence | Plausible/Clarity load; generic events in shared scripts; no approved entry schema | MISSING CONTRACT |
| Release/campaign | Approved exact site/copy/image | Public entry works and campaign points to it | No current exact clean candidate or approval triad | HOLD |

## 2. Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time | Absence of proved state; no identity inference | Static entry, episode/news data | Baseline page | Public navigation; provider handoff only after action | Route only | Evergreen links and ordinary Start Here link | PARTIAL |
| Returning, no Card | Device-local tour/charm keys may exist | Weekly stops, charms, local timestamps | Route paint/hidden objects; no authoritative resume | Local writes currently occur | Device only | Storage exceptions mostly swallowed | PARTIAL; REWARD CONTRACT OPEN |
| Resident Card — device-local | No validated homepage projection is established | Static Card/Closet copy; other shared local keys | No deliberate owned variant | Local continuation only after validation | Same device only | Show public baseline and exact limitation | MISSING DELIBERATE STATE |
| Resident Card — verified account-backed | Supabase-shaped token reader in shared auth script; no complete Card proof | Email-derived initials if target exists | Intended resident link/resume only | No new write in entry | Account/cross-device not proved here | Expiry/parser failure returns guest | NOT PROVED |

Required transition tests remain open: first→return, visitor→Card, local
Card→account, sign-out/expiry/revoke, storage denial/corruption, two tabs,
second device, conflict/migration, Card update/delete and privacy reset.

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Scope | Current truth |
|---|---|---|---|---|---|---|---|
| Published episode | Episode production/release | `homepage.js` | Static build/hosting | `content/episode-index.json` | Homepage, Chick Flicks, Watch, weekly surfaces | public artifact | Named local states pass; exact release freshness open |
| Atomic current-episode record | Weekly Episodes `EPX-HOME-CURRENT-EPISODE-v1` | Separate Homepage current-episode module | Platform checksum/public-proof validation | Immutable complete record + bound fallback | Town Entry presentation, KSVL/card routes only when non-null and admitted | exact release artifact | SPECIFIED / QUEUED; current code mixes projection card with hard-coded Episode 04 state |
| News publication state | NewsStand editorial/release | Missing homepage adapter | NewsStand pipeline | Admitted publication/correction record TBD | Homepage and NewsStand | public artifact | D-043 specified; integration missing |
| Destination readiness | Product owners + release | Missing shared adapter | Portfolio/release system | Public-promise registry is documentary, not runtime authority | Homepage, Centre, directory | release evidence | Freshness-bound projection missing |
| Town directory | Directory owner | Inline map + shared directory script elsewhere | Static hosting | `sunnyvaile-directory.js` and duplicated homepage markup | Homepage, Centre, shared headers | public artifact | Multiple copies can drift |
| Tour stops | Route visit/check-in | `sv-tour-checkin.js`, `homepage.js` | none | `laidies_tour_<week>` | Homepage and stop pages | device | Route visit is completion; product authority disputed |
| FAiRY Play/ritual/express | Completing local stop set | `sv-tour-checkin.js` | future Supabase hook only | local keys including `laidies_fairy_plays`, `laidies_ritual_done`, `laidies_express_done` | Closet/reward consumers | device | Local minting exists; not authoritative reward proof |
| Charms | Charm activation | `charm-hunt.js` | none | local charm keys | Homepage/buildings/Closet | device | Local only; entry need and admission open |
| Card/account projection | MAiKEOVER/identity provider | `sv-nav-auth.js`; future resume hook | Supabase-shaped client token | browser auth token; Card store not proved | Header/Closet/homepage | browser/account claimed | Token cannot alone prove full Resident state |
| Newsletter request | Homepage form | browser form/popup | Buttondown | provider lifecycle | Post Office/email | provider | Request/confirmation/error not tested here |
| Entry analytics | Page/shared actions | Plausible/Clarity/generic scripts | third-party analytics | provider datasets | Product owner | aggregate intended | Privacy/event/baseline contract missing |
| Campaign approval | Ali + release/social owners | none | channel + hosting | exact artifact/approval/publication receipts | public visitor | public | HOLD |

## 4. End-to-end transaction contracts

### Destination choice

`discover → read limitation → activate → route resolves → intentional arrival
→ receiving owner takes control → return`

- Authoritative entry completion: destination arrival with the expected route
  and intentional receiving content.
- Duplicate/retry: safe repeated navigation; no reward or receiving completion
  inferred.
- Failure: remain on entry or show a labelled evergreen alternative; record
  route/error category only after privacy approval.
- Accessibility: activation, popup status, focus movement/return and browser
  back must be observable.

### Current episode/news

`fetch admitted public record → validate status/freshness/correction → render
current or collapse/fallback → open exact explanation/content → return`

- Non-OK, empty, invalid, future, stale, corrected or withdrawn records must
  fail closed.
- Homepage cannot keep an independent headline/correction copy.
- Exact artifact hashes and public-origin state bind the claim.

### Local tour/reward

Current implementation is:
`route visit → local stop write → subset/all-stop check → local reward/badge
write → homepage/Closet paint`.

Required decision is whether a route visit is the intended step, what result
is authoritative, whether rewards remain local keepsakes or move to an
account ledger, and how duplicate/week/source-failure/revoke/refund/conflict
behave. Until ruled, entry must not promote these writes as verified learning
or earned entitlement.

### Newsletter

`read consent → submit to Buttondown → provider validates → request accepted
or error → inbox confirmation → subscribed/unsubscribed provider state`.

The browser form cannot report subscribed or delivered. Invalid, duplicate,
blocked popup/iframe, timeout, provider outage, confirmation expiry,
unsubscribe and retry require provider-owned evidence without copying email
addresses into this dossier.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update/removal propagation | Failure evidence |
|---|---|---|---|---|---|
| Episode publish/correct/withdraw | Homepage, Chick Flicks, Watch, weekly route | public record + artifact identity | exact issue/watch route | rebuild/cache/public verification | success/empty/stale/withdrawn fixtures |
| News publish/correct/retract/clear day | Homepage and NewsStand | exact publication/claim/correction identity | exact reader/story | same authority invalidates all consumers | quiet, corrected, retracted and stale fixtures |
| Destination status change | Homepage, Centre, directory/promotion surfaces | owner/status/limitation/freshness/artifact | exact route | projection refresh and fail-closed stale behavior | missing/stale owner record |
| Tour stop/reward state | Homepage, stop page, Closet | local or authoritative event TBD | stop/summary | update/reset/revoke contract TBD | storage denied/corrupt/duplicate |
| Card create/update/delete/revoke | Homepage, header, MAiKEOVER, Closet | validated projection | exact local/account route | every consumer invalidates old state | malformed/expired/revoked/conflict |
| Newsletter confirm/unsubscribe | Post Office/provider; homepage only as handoff | provider status | provider/desk | provider owns update/removal | duplicate/invalid/outage |

## 6. Missing backend and integration register

| Gap | User consequence | Required work | Shared owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Readiness projection | Held product can look ready | Build freshness-bound admitted route/status artifact and consumer adapter | Platform/Control Room | Town Entry + receivers | release registry/artifact, homepage/Centre/directory consumers | stale/missing/failure fixtures plus exact artifact | BUILD BEFORE LAUNCH |
| News homepage adapter | No conditional Breaking/Daily presence | Consume NewsStand admitted record with correction/clear-day behavior | NewsStand + Platform | Town Entry | NewsStand authority; homepage adapter/markup | quiet/current/corrected/retracted desktop/mobile | BUILD BEFORE LAUNCH |
| Identity/Card projection | Token/local key can imply Resident state | One validated versioned projection with expiry/revoke/delete/conflict | Identity/Platform | Town Entry consumer | shared identity adapter and pages | adversarial four-state matrix | BLOCKED — BUILD REMAINS REQUIRED |
| Tour/reward authority | Route visits mint local rewards | Rule completion event, ledger scope, idempotency and revoke/refund | Rewards/Platform | Tour + Town Entry | `sv-tour-checkin.js`, Closet consumers, future service | authoritative producer→consumer suite | BLOCKED — BUILD REMAINS REQUIRED |
| Entry analytics | No baseline; privacy risk | Approve event schema, prohibited fields, consent and review loop | Analytics/Privacy | Town Entry | event dictionary/adapters/providers | synthetic payload and production delivery proof | BUILD BEFORE LAUNCH |
| Buttondown lifecycle | Visitor cannot know request/confirmation state | Provider-owned controlled lifecycle test and recovery | Post Office | Town Entry handoff | Buttondown and Post Office | request/confirm/duplicate/invalid/outage/unsubscribe | BUILD BEFORE LAUNCH |
| Exact release binding | Local files cannot prove public state | Clean source→artifact→deploy→public receipt and rollback | Release/Control Room | Town Entry | release tooling/hosting | matching hashes and bounded public suite | BUILD BEFORE LAUNCH |
| Sitewide style | Homepage cannot admit final visual system | Brand championship, Ali ruling, exact-use assets/tokens | Brand & Experience | Town Entry consumer | isolated championship then homepage candidate | admitted A/B/C decision evidence | OWNER DECISION REQUIRED |

## 7. Shared-contract collision check

- **Identity/account/profile:** `sv-nav-auth.js`, MAiKEOVER, Resident Card,
  Closet and Platform; Town Entry consumes but cannot define.
- **Saves/progression/rewards:** tour, charms, FAiRY Plays, ritual/express
  badges and Closet; shared owner ruling required.
- **Content/media admission:** Episode, NewsStand, KSVL and release owners.
- **Navigation/discovery:** homepage inline topbar, global header, directory,
  Visitor's Centre and receiving owners; BTB-082 applies.
- **Analytics/privacy:** Plausible/Clarity and generic shared events; no entry
  payload may contain email, query, identity, prompt, local state or raw replay.
- **Tests:** `scripts/test-entry-recovery-truth.mjs` asserts an obsolete
  Visitor's Centre `hidden` attribute and must move to a semantic shared
  contract under a joint lock.
- **Release:** current dirty workspace cannot bind a clean candidate.

## 8. Verification and approval

- Town Entry owner verifies the complete element inventory, intended result
  and all four visitor scopes.
- Functionality & Platform validates the readiness, identity, reward,
  analytics and exact-release architecture.
- Visitor's Centre, NewsStand, Episode, Library, Post Office, Identity/Rewards
  and every promoted destination verify their handoff side.
- Independent product/trust/brand/accessibility/technical judges inspect the
  same exact candidate; makers do not approve their own work.
- Control Room assigns locks and release order; Ali rules hierarchy, sitewide
  style and the final website/copy/image campaign triad.
