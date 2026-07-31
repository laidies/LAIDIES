# SUNNYVAiLE High functionality and cross-page touchpoint map

**Status:** SPECIFIED — FUNCTIONALITY RECOVERED; shared Platform, Classes,
Book Fair and Closet contracts await affected-owner sign-off.  
**Product owner:** SUNNYVAiLE High champion (`sunnyvaile-high`)  
**Shared-contract reviewer:** Functionality & Platform Director
(`platform-reliability`)  
**Evidence date:** 2026-07-26

This map separates intended user outcomes from the current browser-local
implementation. A visible room, route, handler, local count, admission schema
or HTTP success is not the complete High experience.

## 1. Complete capability inventory

| Capability/element | Trigger and page | Intended visible result | Current implementation/evidence | Truthful status |
|---|---|---|---|---|
| Building arrival/orientation | Open `/sunnyvaile-high.html` | Understand High = demonstration + practice and choose one useful action | Current explanatory arrival and hub observed | OBSERVED; owner visual/human-comprehension gate open |
| Room/hub navigation and deep links | Six hub controls; `#report-card`, `#superlatives`, `#book-fair` aliases | Open one named room in place; URL/deep link remains meaningful | `HASH_MAP`, `aria-expanded` and panel behavior observed | BOUNDED LOCAL MECHANIC; complete room design unapproved |
| Class schedule | Open AV/Classes panel | See registered planned/current status without implying release | Fetches `content/site/high-classes.json`; 37 planned rows | VERIFIED LOCAL DATA/RECOVERY; no admitted class |
| Class preview route | Choose row → `/learn/class.html?c=<slug>` | Exact matching preview or honest unknown/unavailable state | Fail-closed register/ledger mechanism passed Repair 2 rejudge | VERIFIED LOCALLY at bounded mechanism scope |
| Class playback/completion | Operate classroom TV | Play only independently admitted media; emit completion only after the class-defined end | Zero current live/video/admitted rows | MISSING CURRENT ADMITTED CONTENT; Classes owner |
| Pop Quiz entry | High primary link or Blend Episode receipt → `/learn/quiz.html` | Start the exact current admitted episode practice with objective/context | High link opens the chooser; all four Blend rows currently point to the same generic `#quiz-start` chooser and lose episode selection on arrival | LOCAL MECHANIC; DIRECT EPISODE HANDOFF MISSING; representative admission/validity open |
| Quiz submit/explanation/retry | Complete all radio groups and submit | No partial score; show correct answer, explanation, review route; retry safely | Local scoring/storage and explanations observed/tested | BOUNDED LOCAL PASS; learning validity item-specific |
| Report Card | Open `#report-card` | Show attempts/latest/best and playful grade at exact persistence scope | Reads `laidiesQuizProgress` and legacy `laidiesQuizBestScores`; fetches episode/quiz data | DEVICE-LOCAL ONLY |
| Report Card print | Print control | Legible record with limitation; no extra authority | Existing print rules preserved in accepted evidence | BOUNDED LOCAL; native/browser matrix still required |
| Yearbook superlative | Open `#superlatives` | Recompute one playful non-ranking title from the same valid result data | Same local source; no second store | DEVICE-LOCAL ONLY |
| 101 shelf | Open High 101 links | Reach exact Library-owned reference and understand learning payoff | Seven links point to `/library.html#the-101-shelf` | ROUTE OBSERVED; exact section/return proof affected-owner gate |
| Fair schedule/door | Open `#book-fair` | Show open/closed/countdown and truthful stock status | 28-day scheduling and hero/fair state observed | LOCAL SCHEDULE; public-clock/visual gate open |
| Free Fair puffy claims | Fair visit/daily/rare action on High | Add supported device-local collectible or show storage failure | `laidies_puffies_earned`, `laidies_bookfair_claims` observed | DEVICE-LOCAL; swallowed-storage/consumer round trip not complete |
| Book Fair catalogue | Follow `/bookfair.html` | Browse versioned admitted stock with availability/destination | Eight hard-coded drops; all `available: false` | TRUTHFULLY UNAVAILABLE; build remains required |
| Clip balance | Book Fair loads `clip-bank.js` | Show authoritative spendable Wallet balance | Derived locally from quiz/Express minus `laidies_bookfair_redeemed` | OBSERVED LOCAL PROJECTION; not account money |
| Book Fair redemption | Choose an available drop | Reserve, fulfil, commit spend and issue receipt/entitlement exactly once | Local redeem code exists, but all current buttons disabled | MISSING AUTHORITATIVE LEDGER/FULFILMENT |
| Closet result/haul | Follow `/laidies-card.html` | See the same result/entitlement, scope, status and source return | Closet reads local quiz/Book Fair keys and labels device-local view | PARTIAL DEVICE-LOCAL CONSUMER; cross-device missing |
| Account-backed resume | Sign in/return | Restore approved progress/wallet/entitlements with merge/conflict behavior | Broader identity code/migrations exist; High acceptance absent | MISSING ACCEPTED CONTRACT |
| Analytics/customer evidence | Select route, start/complete/review/retry/error | Privacy-safe aggregate evidence without answer, score, name or capability inference | Plausible present; approved event contract/evidence absent | PROPOSED; Platform/Privacy approval required |
| Failure/recovery | Fetch/storage/account/provider failure | Named unavailable/retry state and independent next route; no false success | Class failures covered substantially; full building/economy suite absent | PARTIAL |

## Visitor-state recognition and continuity — four scopes

| Visitor scope | Recognition source and proof | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time | Absence of valid local High/Card state; never inferred from analytics/cookie | Current public registers/content only | Cold orientation, not-yet-sat and honest zero-live-tape/Fair state | Anonymous content reads; local quiz write only after valid completion | Route/deep link only | Fetch failure offers Library/quiz recovery; no invented default class | PARTIAL LOCAL |
| Returning, no Card | Valid `laidiesQuizProgress`, legacy score, Fair/Express local stores on this browser | Attempts, best/latest, local Fair claims/redemptions | Resume/retry/result; no repeated “new resident” fiction | Device-local writes with explicit scope; no account mutation | High↔quiz↔local Report Card/Yearbook; partial Book Fair/Closet read | Corrupt/denied storage yields usable session and loss warning | BOUNDED LOCAL, incomplete transition suite |
| Resident Card — device-local | Valid Resident Card contract/local profile fields; not token/email inference | Authorized Card fields plus separately valid local High state | Optional greeting and supported Closet handoff only | Same device-local writes; no entitlement authority | Same-device High/Book Fair→Closet where consumer supports exact key | Card corruption/update/delete removes personalization; account prompts remain explicit | PARTIAL; affected-owner proof required |
| Resident Card — account-backed | Verified auth session, canonical profile and server projections under Platform contract | Approved completion/result, Wallet and entitlements | Synced resume/history, pending/conflict/refund/revoke states | Typed authorized completion/economy RPCs only | High→Wallet/Book Fair→Closet across two devices | Offline queue/reconciliation, sign-out, conflict, revoke/delete and RLS denial | BUILD BEFORE LAUNCH; unverified |

Required transition status:

| Transition | Current truth | Required proof |
|---|---|---|
| First visit → leave → return without Card | Local quiz/result logic exists | Clean fixture, partial attempt, completion, reload, clear/corrupt/deny storage at mobile/desktop |
| Visitor → device-local Card → same-device return | Card/Closet local mechanisms exist elsewhere | High recognition may consume only authorized Card contract; update/delete propagation |
| Local Card → account claim | Not accepted for High | Explicit merge/choose/replace, two-account RLS, failure and rollback |
| Signed-in → sign out → return | Not accepted | Server projection removed; safe local/public fallback; no stale private state |
| Resident → second tab/device | Not accepted | Read-after-write, concurrency, stale projection and conflict evidence |
| Correction/revoke/delete/privacy change | Not accepted end to end | Result/wallet/entitlement projection and every consumer update/remove evidence |

## 3. Producer → store/service → consumer map

| Capability/data | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/key | Consumers | Scope | Current truth |
|---|---|---|---|---|---|---|---|
| Class catalogue row | Classes editorial/admission workflow | High class fetch/render; class wrapper | Static release builder; future admitted media source | `content/site/high-classes.json` plus independent `high-learning-ledger.json` | High AV panel, `/learn/class.html` | Public release data | Fail-closed mechanism locally verified; zero admitted |
| Class completion | Admitted class end under Classes-defined contract | Class player (future accepted event) | Platform completion service | Typed completion ID/event, schema not yet High-integrated | High result/resume, reward grant, analytics | Account when verified; session/local otherwise cannot claim sync | MISSING |
| Quiz attempt/result | Complete submit in `/learn/quiz.html` | Quiz engine | None accepted for account authority | `laidiesQuizProgress`; legacy `laidiesQuizBestScores` | High Report Card, Yearbook, local Clip calculation, Closet | Device | Local only; score not mastery |
| Result display name | Resident Card/profile flow | High scorecard personalization | Card contract; future profile projection | `laidies_display_name` only at local scope | Report Card | Device | Observed; must not derive from token/email |
| Fair free puffy claim | Visit/daily/rare claim in High Fair panel | Inline Fair logic | None | `laidies_puffies_earned`, `laidies_bookfair_claims` | High Fair, supported Closet puffy consumer | Device | Partial; storage errors and full consumer proof open |
| Clip earned projection | Quiz/Express local state | `content/site/clip-bank.js` and Closet calculation | None authoritative | Derived from quiz + `laidies_express_done` | Book Fair balance, Closet Clip Jar | Device | Two calculators intended to mirror; not authoritative economy |
| Local Fair redemption | Book Fair click (currently no available drop) | `clip-bank.js` | None | `laidies_bookfair_redeemed` | Book Fair, Closet, local balance | Device | Code observed; cannot fulfil or sync |
| Authoritative grant/wallet | Admitted typed completion | Future Platform SDK | Typed security-definer RPCs | Append-only `economic_events` + projection | High, Book Fair, Closet, other economy consumers | Account/cross-device | Platform packet specified; not built/accepted here |
| Book Fair entitlement | Fulfilment-confirmed offer | Future Book Fair integration | Catalogue/fulfilment provider + Platform RPC | Versioned catalogue, reservation/receipt, entitlement projection | Book Fair receipt/history, Closet destination, optional download/merch | Account/cross-device | MISSING; current stock disabled |
| Learning analytics | Route/start/complete/explanation/retry/error | Page instrumentation | Plausible or approved pipeline | Aggregate event only | Product owner/customer evidence | Aggregate/public-safe | Proposed; no approved binding |

No building-owned implementation may create a second class register,
completion ledger, Wallet, Clip balance, entitlement table, account profile or
Closet schema.

## 4. Stateful transaction contracts

### 4.1 Class

`discover registered row → fetch exact row and independent admission →
validate complete record/source interval/media bindings → show preview or
enable admitted media → accessible playback/practice → authoritative
class-defined completion → result/next route → correction/expiry removes
admission`

- Unknown, missing, malformed, duplicate, future, expired or mismatched data
  fails closed; no unrelated class substitution.
- The Classes owner supplies content/media/admission evidence. The building
  owner supplies discovery, handoff, return and honest room state.
- Completion analytics or reward emission is prohibited until the Classes
  owner defines and independently validates the real completion point.

### 4.2 Quiz and results

`select current quiz → render all grouped questions → require complete answer
set → score once → show answer/explanation/review route → write valid local
attempt → Report Card/Yearbook read after write → retry/recompute`

- Incomplete submit produces no score/progress write.
- Duplicate/reload must not increment attempts incorrectly or create extra
  authoritative grants.
- Storage denial keeps the quiz usable and states that the result will not be
  retained.
- The result is device-local until a separate Platform completion contract is
  integrated and proved.
- Answers, score, name and inferred ability are prohibited analytics fields.

### 4.3 Reward, Book Fair and Closet

`admitted completion_id → authorized Platform grant → Wallet projection →
choose admitted catalogue offer → reserve funds/stock → fulfil real item →
commit spend → entitlement/receipt projection → Closet read after write`

Failure path:

`invalid/duplicate completion, insufficient funds, timeout, delivery failure,
cancel, correction or revoke → deny/replay/release/refund/revocation →
Wallet, Book Fair and Closet converge visibly`

- Idempotency binds resident + source completion + program/event.
- Only typed Platform RPCs mutate the append-only economic ledger; clients do
  not insert balances or entitlements.
- A Book Fair “success” requires fulfilment receipt, not a local redemption
  row or optimistic toast.
- Concurrent two-device reservations allow at most one committed spend.
- Refund/revocation is compensating history, not destructive rewrite.
- Account deletion/retention, RLS, disputed adjustment and provider-token
  privacy require Platform/security review.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update behavior | Remove/revoke/refund behavior | Current evidence |
|---|---|---|---|---|---|---|
| Quiz completion | Quiz result, High Report Card/Yearbook, local Closet/Clip Jar | Valid device-local result | `/sunnyvaile-high.html#report-card` and review route | Retry recomputes latest/best/superlative | Clear/corrupt store removes local projection | Bounded local mechanics; complete transition suite open |
| Blend Episode receipt → Quiz | Exact High paper only; Blend consumes no result | Episode number, slug, High quiz key, candidate learning objective and availability only | Current generic chooser; target allow-listed `?quiz=issueNN&from=blend-snap#quiz-start` plus admitted café return | Admission/correction updates manifest and High route together | Held/expired/mismatch removes CTA; no café completion/reward state | Interface specified in `QUIZ-STUDY-PACK-INTERFACE.md`; implementation/tests open |
| Class admission/correction | High schedule and exact class route | Public admitted/held status | Class slug ↔ High AV room | Freshness/source change updates both surfaces | Expiry/correction disables playback and points to current source | Repair 2 local gate pass; public binding open |
| Fair puffy claim | High Fair and Closet puffy collection | Device-local claim/object | High `#book-fair` ↔ Closet exact collection | Duplicate claim stays single | Local removal flow/propagation not fully specified | Partial |
| Authoritative reward grant | Wallet, High status, Book Fair balance, Closet history | Ledger event/projection | Source completion link | Adjustment appends event and updates all projections | Revocation/refund visible everywhere | MISSING |
| Book Fair fulfilment | Book Fair receipt, Wallet, Closet entitlement | Reservation, receipt, entitlement IDs | Offer ↔ Closet object ↔ source | Delivery/metadata correction updates projection | Release/refund/revoke removes usability, preserves history | MISSING |
| Card/profile update/delete | High personalization and Closet | Authorized profile scope | Card/Closet ↔ High | Read after write on every consumer | Sign-out/delete removes stale private fields | MISSING High-specific proof |

## 6. Missing backend and integration register

| Gap | User consequence | Required work | Shared owner | Product owner | Exact files/services | Acceptance proof | Disposition |
|---|---|---|---|---|---|---|---|
| Account-backed learning completion/result | Resume and cross-device record cannot be promised | Define typed admitted completion/result projection, identity scope, replay/correction/delete and SDK read states | Platform | High + Classes/Quiz | Platform schema/RPC/SDK; class/quiz integration paths to be named in implementation packet | Two-account/two-device, offline/retry/replay/correction/RLS | BUILD BEFORE LAUNCH for synced claims |
| Authoritative Clips/Wallet | Local earned/spent calculators can drift or be manipulated | Implement append-only `economic_events`, typed RPCs and one Wallet projection; constrain local bank to labelled preview | Platform | High producer; Book Fair consumer | Platform economic-ledger packet; `content/site/clip-bank.js`; `laidies-card.html`; High/quiz producer | Grant replay, insufficient, concurrent reserve, refund/revoke, second device | BUILD BEFORE LAUNCH |
| Book Fair catalogue/stock/fulfilment | A local redeem cannot deliver the promised item | Versioned catalogue, real first deliverable, reservation, provider fulfilment receipt, failure/retry/refund and support ownership | Platform/fulfilment | Book Fair under High | `bookfair.html`; future service/provider/RPC; Closet entitlement consumer | One real offer success + timeout/permanent failure/retry/refund and receipt | BUILD BEFORE LAUNCH; current buttons temporarily disabled |
| Closet authoritative consumer | Learner cannot prove ownership or restore it | Consume Wallet/entitlement projection; exact source/deep link; pending/refund/revoke/remove states | Platform/Closet | High verifies round trip | `laidies-card.html`; Platform SDK/projection | High completion→grant→Fair→Closet across two devices and revoke | BUILD BEFORE LAUNCH |
| Privacy-safe learning analytics | Owner cannot measure comprehension/flow truthfully | Approve event IDs/properties and delivery health; prohibit answers/scores/names/inferences | Platform/Privacy | High | Event dictionary/page integrations/analytics validation | Synthetic event receipt, no prohibited fields, opt-out/error behavior | BUILD BEFORE LAUNCH for measured launch claim |
| Full visitor-state transition suite | Clean-browser pass hides returning/resident defects | Add fixtures for local return, Card, account, conflict, sign-out, second device, deletion/revoke and storage denial | Platform + QA | High | High/browser tests plus identity/economy fixtures | Exact source/artifact/public evidence per scope | BUILD BEFORE LAUNCH |
| Native accessibility/public origin | Headless Chrome cannot prove Safari/VoiceOver/clean route | Native manual/automated matrix and exact deployed route/404 proof | Release/Accessibility | High | Exact candidate artifact and production URL | Safari/VoiceOver/zoom/keyboard/mobile/public route report | BUILD BEFORE LAUNCH |
| Episode-specific Blend→Quiz→Blend handoff | Four episode-labelled café CTAs open the same chooser and no dedicated café return; the visible identity is not carried through the route | Add allow-listed `quiz=issueNN` selection, admitted objective/status fields, mismatch fallback and an exact Blend-owned receipt return or explicit browser-Back contract; prohibit result/reward export | High + Blend owners; Brand for later visual bridge | High owns Quiz; Blend owns receipt | `learn/quiz.html`, `script.js`, `content/blend-snap-weekly-packs.json`, `blend-snap.html`, cross-entry/browser tests | Episodes 01–04 correct-paper routes, unknown/held mismatch denials, result non-propagation, return, mobile/AT and exact artifact/public proof | BUILD BEFORE LAUNCH for promoted episode-specific handoff |

Book Fair, Pop Quiz and Classes subproduct dossiers that are absent or
incomplete remain owner-entry recovery obligations for their named owners.
This building map does not manufacture those owners' specifications.

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** High consumes only the Resident
  Card/Platform contract; it does not infer identity from local progress,
  email, token or display name.
- **Saves/progression/Closet:** local quiz and Fair stores are explicitly
  device-scoped; future account projection is Platform-owned.
- **Rewards/economy/ownership/fulfilment:** `clip-bank.js` is current local
  implementation evidence, not shared authority. Platform's economic ledger
  packet is the integration dependency.
- **Content/media admission:** Classes owns class intake, sources, scripts,
  media and admission. High owns truthful discovery and handoff.
- **Assessment validity:** quiz mechanics do not approve question quality,
  transfer or mastery claims.
- **Study Pack/weekly visual family:** Blend consumes episode/objective/status/
  CTA/return fields only. It cannot embed the Quiz or consume result/reward
  state. Visual coordination waits for Brand and follows
  `QUIZ-STUDY-PACK-INTERFACE.md`.
- **Analytics/customer evidence:** Platform/Privacy approves shared events;
  High supplies only product-safe properties.
- **Release/runtime:** exact artifact parity and bounded public-origin proof
  are required; a local clean-route inference is prohibited.

## 8. Executable verification matrix

| Gate | Command/journey | Required evidence owner |
|---|---|---|
| Owner entry | `node scripts/check-product-stewards.mjs --owner-entry sunnyvaile-high` | High owner |
| Existing High contract | `node scripts/test-sunnyvaile-high-contract.mjs` | QA maker, independent rerun |
| Existing browser journey | `HIGH_PLAYWRIGHT_ROOT=<temp> HIGH_URL=<origin> node scripts/test-sunnyvaile-high-browser.mjs` | QA maker, independent rerun |
| Class admission | Existing 29 hostile denials, equality controls, source/artifact parity and fresh exact artifact | Classes/accuracy independent judge |
| Four visitor scopes | Clean, return-no-Card, local Card and verified account fixtures; test every transition separately | Platform + independent UX/accessibility |
| Quiz/result round trip | Incomplete, submit, explanation, review, retry, reload, clear/corrupt/deny storage, print | Quiz/learning judge |
| Economy round trip | Admitted completion→grant→reserve→fulfil→commit→Closet; duplicate, insufficient, concurrency, failure, refund, revoke | Platform security/economy judge |
| Cross-page propagation | Create/update/remove/revoke/refund across High, Book Fair and Closet | High owner + affected owners |
| Native accessibility | 320/390/desktop, 200% native zoom, keyboard, Safari, VoiceOver, reduced motion, print | Independent accessibility judge |
| Release/public | Fresh builder, hashes/parity, clean `/sunnyvaile-high`, child routes, custom 404 and bounded public origin | Release owner |

## 9. Approval state

- High owner: **SPECIFIED**, pending owner review of recovered intent and
  complete design candidate.
- Classes owner: handoff required for schedule/classroom boundaries; no class
  content change authorized here.
- Functionality & Platform Director: handoff required for visitor recognition,
  completion, Wallet, fulfilment and Closet contracts.
- Book Fair/Closet owners: dossier/sign-off required before their end-to-end
  capability can pass.
- Independent review: required after implementation; maker cannot approve her
  own visual, instructional, economy or release work.
