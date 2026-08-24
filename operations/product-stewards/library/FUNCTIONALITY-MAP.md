# LIBRAiRY functionality and cross-page touchpoint map

**Status:** FUNCTIONALITY RECOVERED — SOURCE-RECONCILED; BOUNDED DEVICE-LOCAL
PROOF ONLY  
**Product/building owner:** LIBRAiRY product champion  
**Functionality & Platform Director:** reviewed 2026-07-26  
**Trigger:** D-2026-07-26-053 blocked Cycle 2 design work until the Library's
visible elements and Puffy/Closet round trip had an authoritative contract.

This is a contract and gap register. It does not admit a book, approve a visual
direction, prove a public deployment, or turn a Resident Card into an account.
Current source is implementation evidence; `EXPERIENCE-BRIEF.md` and
`OPERATING-SPEC.md` govern the intended result.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Room arrival and capability explanation | Enter `/library.html` | Recognize a Library and understand shelves, status, Miss Jeeves, reader and Puffy/Closet | Live HTML room, instructions, catalogue and device-local save copy | OBSERVED; comprehension proof missing |
| Desktop four-book browse | Choose one materially large individual cover in the single four-book row | One click opens one pre-open information panel; Back restores the cover and Open enters the admitted reader | Frozen `SECTIONS`; four admitted cover objects; no shelf/category boxes | DEPLOYED / PUBLICLY VERIFIED |
| Mobile four-book browse | Choose one readable cover at 320/390 px | Same cover → information → Open sequence with compact reflow and no clipped covers or horizontal overflow | Generated from the same frozen `SECTIONS` | DEPLOYED / PUBLICLY VERIFIED |
| Publication status/live region | Attempt unavailable content or encounter a service error | Plain explanation that the item did not open | `reportLibraryStatus()` updates `#library-status` | DEPLOYED / VERIFIED for current opening set and failure fixtures |
| Direct saved/hash route | Open `/library.html#book::heading` | Open exact admitted section, or preserve current hold truth | Hash calls `openBook`; `admittedBook()` fails closed unless status and exact source pass | VERIFIED LOCALLY for hold enforcement |
| Reader and contents | Open admitted book/section | Fetch exact source, open modal, navigate, close and return focus | Exact same-origin allow-list; redirects rejected; focus trap/Escape/backdrop/Close; explicit load error/retry | VERIFIED LOCALLY for the four exact opening-book sources; native AT proof remains open |
| Miss Jeeves answer service | Ask in ordinary language from Homepage or Library | Direct bounded answer, then exact admitted places across town; Library prioritizes books/sections | Same-origin `/api/miss-jeeves` retrieves live safe index rows; bound Workers AI performs catalogue-only structured synthesis; deterministic retrieval remains the failure fallback; four published common questions preserve their designed first route | DEPLOYED / PUBLICLY VERIFIED at immutable and custom origins; exact four-question grounded suite PASS |
| Whole-book/exact-section Puffy save | In an admitted reader choose a sticker | Read-verified same-device save and visible state | `puffy-bookmarks.js`; exact supported route/sticker validation | VERIFIED LOCALLY on the exact opening-set artifacts; public proof remains open |
| Puffy pouch selection/purpose | Change ten stickers in Closet | Approved sticker set/private labels remain on this device | `laidies_puffy_sticker_pouch`; allow-list, limits and read-back | VERIFIED LOCALLY; native private-mode/migration proof open |
| Closet Puffy board | Open `/laidies-card.html#puffyPouch` | See saves, reopen exact place or remove independently | Shared script reads canonical records; sibling anchor/remove control | VERIFIED LOCALLY same device |
| Corrupt/unsafe save recovery | Load malformed local data | Remove invalid rows, preserve valid siblings, disclose recovery | Field/route/sticker/date allow-lists, dedupe-newest, limits and live status | VERIFIED LOCALLY deterministically |
| Storage denied/write failure | Save/remove when storage fails | No false success; alert says nothing changed | `setItem` plus exact read-back; operation aborts on failure | VERIFIED LOCALLY deterministically |
| Cross-building continuations | Follow issue/High/NewsStand/FAiRY route | Reach admitted destination and useful handback | Some issue/index links exist; no complete handback registry | PARTIAL/INFERRED; P1 gap |
| Retired Grimoire routes | Visit old AI-handbook URL | Redirect to current Library without treating legacy as current | Redirects documented; stale links remain | OBSERVED; migration incomplete |
| Correction/report route | Find an exact error | Submit location-specific correction with receipt/status | Same-origin correction endpoint and D1 receipt/status ledger are deployed; full downstream correction propagation remains editorial work | DEPLOYED backend; propagation lifecycle not fully proved |
| Aggregate analytics | Ask or open a Miss Jeeves result | Privacy-safe outcome evidence | Miss Jeeves worker and result-open endpoint send controlled IDs/counts through the production Analytics Engine binding | DEPLOYED / PUBLICLY VERIFIED; delivery query PASS |

## Visitor-state recognition and continuity

Library browsing, search and reading do not use Card presence or account state
as authorization. Creating or changing a Puffy save does require a valid
device-local Resident Card, because the visitor's active pouch of 10 belongs
to My Closet. The Card does not unlock books, prove login, add ownership or
make Puffy records sync beyond this browser/device.

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No valid Resident Card or Puffy state | Frozen catalogue; no pouch editing | Full orientation and unrestricted browsing/search/reading; saving explains that a Card is required | No new Puffy write | Library → Card creation in the Sorority House/Closet | Storage denial disclosed; visitor can keep reading | VERIFIED LOCALLY; public/native proof open |
| Returning, no Resident Card | Older valid Puffy data may remain on this browser/device; no identity inference | Existing board records only; active pouch and new placement remain locked | Reopen prior valid locations; make a Card before placing/changing a Puffy | No new Library Puffy write | Same local records remain truthful without implying a current Closet identity | Stale/held saves stay closed; invalid rows recovered | VERIFIED LOCALLY same device; no account claim |
| Resident Card — device-local | Valid device-local Card envelope; not login proof | One active pouch of 10 total stickers, each with an optional personal purpose | Browse/read normally; every whole-book and exact-section save offers the same active 10 | Canonical local write/read-back only | Library saves return to the Puffy Board in My Closet on this device | Card loss blocks new/change actions without deleting older valid records | VERIFIED LOCALLY; no login, ownership or sync claim |
| Resident Card — verified account-backed, if supported | Requires separately accepted auth session/profile/RLS evidence | Library still loads local Puffy data only | No supported account-backed Library behavior today | No Library account write/sync | No Puffy backup, merge or second-device restore | Fall back to exact local/device truth | BLOCKED — BUILD REMAINS REQUIRED behind Platform Identity |

Required transition verdicts:

| Transition | Current truth | Launch disposition |
|---|---|---|
| First visit without Card → save attempt | Card-required recovery appears; no Puffy write | VERIFIED LOCALLY |
| Device-local Card → choose active 10 → save whole book or exact section → return | Both save contexts offer the same 10; read-verified local round trip exists | VERIFIED LOCALLY; public/native proof open |
| Local Card → account claim | Outside Library and does not migrate Puffy records | BLOCKED — BUILD REMAINS REQUIRED behind Platform Identity |
| Signed-in resident → sign out → return | Puffy remains browser-local; no accepted combined suite | BUILD BEFORE LAUNCH |
| Second tab | Browser `storage` events repaint the Board and visitor-state copy after create/update/remove in another same-origin tab | VERIFIED LOCALLY in Chromium; native/browser-family proof remains open |
| Second device | No Library/Puffy state arrives | BUILD BEFORE LAUNCH for intended account sync |
| Corrupt/migrated/storage-denied | Corrupt/denied paths have deterministic local evidence; explicit schema version is absent | P1 schema fix |
| Card/profile update or deletion/revoke | Must not change Library state by inference | HOLD combined proof |
| Local/account conflict | No merge/choose/replace contract exists | BUILD BEFORE LAUNCH |

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Book catalogue/status | Editorial owner changes frozen record after admission evidence | `SECTIONS`, `ALL`, `admittedBook()` in `library.html` | None | Frozen page record plus `ADMITTED_BOOK_SOURCES` | Desktop/mobile browse, Miss Jeeves, hash opener | Public artifact | Four opening books are admitted, deployed and publicly verified |
| Rendered admitted book | Editorial build produces exact file | `openBook()` fetch/parser/reader | Static hosting | Explicit `/content/library-books/rendered/<id>.html` pairing | Reader, contents, section saver | Public artifact | AI Fundamentals 101, Working with AI 101, Straight Answers About AI and The AI Dictionary open publicly with exact source pairing |
| Miss Jeeves answer | Visitor asks from Homepage or Library | Common questions or typed input plus `/api/miss-jeeves` client | Pages `_worker.js`; Workers AI binding | Current admitted catalogue plus published Daily/Study Pack records; no raw-query store | Library/Homepage visitor; exact town routes | Request only; passive signal excludes raw wording | Grounded AI, fallback and exact four-question route suite publicly verified at both origins |
| Miss Jeeves learning signal | Completed answer outcome or result open | Same request placement/outcome | Analytics Engine binding | Controlled placement/outcome/topic/source IDs | Product owner/Control Room | Aggregate only | Boundary/no-raw-query tests and production delivery query pass; fixed provider retention is three months |
| Reader state | Cover/hash/Miss Jeeves opens admitted ID | Inline reader modal | Static source fetch | DOM/history hash | Current page and Puffy decorator | Session/history only | Four opening books and exact-section routes are deployed and publicly verified |
| Puffy board record | Reader save after sticker choice | `content/site/puffy-bookmarks.js` | None | `localStorage['laidies_puffies_board']` canonical record | Library saved control; Closet board; reopen route | Browser/device only, anonymous | Read-verified local round trip |
| Puffy pouch | Closet selection/purpose change | Shared Puffy script | None | `localStorage['laidies_puffy_sticker_pouch']` | Library picker; Closet pouch/board | Browser/device only, anonymous | Read-verified local round trip |
| Resident Card | MAiKEOVER/Closet, outside Library | Resident Card/Closet modules | Possible Supabase paths elsewhere are not Library proof | Device-local Card envelope; separately possible auth session | Closet shell only; Library saves do not sync | Device or separately verified account | No Library signed-in behavior |
| Library correction | Reader identifies exact error | Compact contextual Report issue control | Pages `_worker.js` correction endpoint | D1 correction event/payload/status tables | Editorial correction workflow; downstream consumers still require adjudication | Explicit submitted correction only | Intake, receipt/status, idempotency and private-field denial implemented; full propagation remains open |
| Miss Jeeves topic request | Visitor explicitly consents after inadequate coverage | Topic-request panel and public receipt/status | Pages `_worker.js`; D1 | Event, 30-day payload vault, HMAC aggregate, status-event and rate-window tables | Editorial CLI and public status endpoint | Explicit submitted text only; no identity | Public submit, cross-origin replay, status and editorial decline verified with one labelled fixture |
| Library analytics outcome | Controlled Miss Jeeves outcome | Worker adapter; other Library events missing | Analytics Engine dataset and Pages binding | Controlled IDs/categories only | Product owner/Control Room | Aggregate | Miss Jeeves answer/result-open delivery is publicly verified; broader Library measurement remains outside this backend |

## 4. End-to-end transaction contract

### Book admission and read

`editorial evidence → independent gates → owner admission → status=available +
exact allow-listed source → cover button → exact same-origin fetch with
redirect rejected → full reader → optional section/save → close/return focus`

- **Completion:** exact admitted source renders. A file, cover, click, hash or
  teaser is not completion.
- **Permission:** only the product/editorial owner promotes status after named
  evidence. The current map contains the four publicly verified opening books.
- **Failure/retry:** held/unknown/redirect fail closed; fetch failure is a
  `role=alert` with retry.
- **Correction/removal:** demotion must block browse, Miss Jeeves, hash and save
  reopen. Exact correction intake/receipt/status is deployed; adjudicated
  correction propagation across every consumer remains open.
- **Stale/tabs:** no real-time artifact update; refresh/new navigation is
  required. Exact public artifact identity is part of release proof.

### Miss Jeeves

`query → local normalization → curated intent or same-origin service → admitted
retrieval → optional grounded synthesis or deterministic fallback → bounded answer/results
→ admission/status check → destination or honest hold/zero-result`

- **Completion:** useful visible answer and every promoted destination works.
- **Privacy:** the same-origin service may process the question to answer it;
  analytics receives only controlled topic, outcome, placement and source IDs.
  Never persist raw query, answer, reading text or inferred personal need to
  analytics/logs/session replay.
- **Measurement contract:** `MISS-JEEVES-MEASUREMENT-CONTRACT.md` defines the
  decision jobs, controlled taxonomy, event denominator, prohibited data,
  retention/access limits and fail-closed production prerequisites. The
  production binding and controlled delivery query are verified.
- **Failure:** unavailable, malformed or stale index input now fails closed with
  an accessible retry that preserves the in-page query. Native AT/browser-family
  proof remains open.
- **Freshness:** curated claims and index rows need owner/source/date/correction
  propagation.

### Puffy save → Closet → reopen/remove

`admitted book/section → approved sticker → canonical record → local write →
exact read-back → local repaint → Closet canonical read → reopen exact route →
Library rechecks admission → remove → local write/read-back → repaint`

- **Completion:** exact read-back equals canonical serialized list.
- **Identity:** anonymous device state in every visitor state. Card/account
  presence neither authorizes nor syncs it.
- **Idempotency:** stable record ID; duplicate IDs retain newest valid record.
- **Failure:** denied/corrupt storage is disclosed; failed save/remove never
  paints success.
- **Update/remove:** sticker update replaces stable ID; either page removes by
  filtered write/read-back. There is no remote revoke/erase.
- **Conflicts:** same-document custom events and same-origin browser `storage`
  events repaint consumers. Last whole-array write still wins; account-backed
  merge/conflict resolution is not implemented or claimed.
- **Security:** stored input is untrusted; fields, sizes, date, sticker and
  exact same-origin routes are allow-listed; text renders with `textContent`.
- **Accessibility:** live statuses and separate reopen/remove controls exist;
  native picker/modal AT proof remains open.
- **Cost/rate:** no provider cost; browser quota/storage denial is failure.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Admit/demote book | Shelves, Miss Jeeves, hashes, saves, index | ID/status/source | Exact Library hash | Artifact deploy/refresh | Demotion blocks all openers but preserves honest saved marker | Hold suite + exact artifact/public checks |
| Save book/section | Library control, Closet board | Canonical Puffy record | `/library.html#id::heading` | Same-document event plus same-origin `storage` repaint in another tab | Reader or Closet filtered write | Read-back, denial, corruption and create/update/remove two-tab tests |
| Change pouch/purpose | Library picker, Closet pouch/board | Sticker list/private purpose | Closet hash | Same-document event | Pouch removal does not delete board record | Limit/denial/recovery tests |
| Reopen save | Library reader/status | Supported URL/hash | Saved URL | Current catalogue re-evaluated | N/A | Held stays closed; fetch error retries |
| Correct/demote claim | Book, Miss Jeeves, index, dependent products | Exact claim/book/section | Correction receipt/status | Intake is durable; editorial propagation is not yet automated | Same | Backend tests pass; full correct/demote/public successor proof remains open |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Opening books | Complete read/save journey needed a valid admitted set | Four exact source/render/admission bindings | Release depth | Library | `library.html`; rendered books/evidence | Four-cover → information → reader journeys and exact public bytes | COMPLETE FOR OPENING SET |
| Miss Jeeves admission filtering | Search must never route around holds | Build-time filtered index plus runtime reconciliation | Content admission/release | Library/Miss Jeeves | `library.html`; index/builder | Held/stale fixtures never operable; visible unavailable state | COMPLETE FOR CURRENT CATALOGUE |
| Index/provider failure | Search must not silently empty or break | Explicit unavailable state plus deterministic retrieval fallback | Release reliability | Miss Jeeves | `_worker.js`; index route | Malformed index and model failure fixtures plus public grounded/fallback proof | COMPLETE FOR CURRENT SERVICE |
| Correction propagation | Intake exists but adjudicated changes still need all consumers updated | Bind correction outcome to content source, index, rendered book and release successor | Shared correction | Library/content owners | D1 correction ledger; books/index/page | Submit→receipt→correct/demote→all consumers/public proof | BACKEND BUILT / PROPAGATION OPEN |
| No Puffy account sync | Cleared/other-device saves absent | Versioned account store, migration, merge/conflict/revoke/delete/RLS | Identity + saves/Closet | Library saves + MAiKEOVER | New schema/API; shared script; Closet | Two accounts/devices, migration/merge/logout/revoke/RLS/offline/idempotency | BUILD BEFORE LAUNCH |
| Cross-tab browser-state proof | Native/browser-family behavior is still not independently witnessed | No product backend: retain the shared `storage` adapter and add native/browser-family evidence when release-bound | Saves/Closet | Library + MAiKEOVER | `puffy-bookmarks.js` | Chromium create/update/remove and visitor-state refresh PASS; native/browser-family witness remains | VERIFIED LOCALLY; no sync/ownership claim |
| No explicit schema version | Future change risks destructive recovery | Versioned local schema/reversible migration | Saves/Closet | Library saves | Shared script; optional IndexedDB only after approval | Legacy migration, rollback and denial fixtures | P1 before schema change |
| Aggregate interpretation/reporting | Controlled events exist but do not explain motives or prove unique people | Produce a bounded aggregate report only when volume is meaningful; retain no raw wording or identity | Analytics | Library | `MISS_JEEVES_SIGNALS`; `laidies_miss_jeeves_signals_v1` | Counts/outcomes/source health with no prohibited data or automatic content decision | P1; collection is live, interpretation remains owner work |
| Incomplete handbacks | Dependent journeys may not return | Shared deep-link/return registry | Cross-page navigation | Library + consumers | Hashes and affected specs/routes | Complete dependent journey returns to valid exact reference | P1 |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** Library consumes none today.
  Device-local Card and verified account resident are separate, and neither
  changes Puffy truth without a new accepted shared contract.
- **Saves/progression/Closet:** only the two named device-local keys and shared
  script. Do not copy Puffy records into reward/profile tables or invent a
  Library account ledger.
- **Rewards/economy/ownership/fulfilment:** Puffy is retrieval, not reward,
  entitlement, owned book, mastery or FAiRY Play.
- **Community/moderation:** no public query, annotation or save sharing.
- **Referrals/postcards/newsletter/delivery:** none.
- **AI service quality/safety:** Miss Jeeves is a retrieval product. Optional AI
  may summarize only supplied current results; deterministic retrieval remains
  the fallback. Claims still need source/currentness ownership.
- **Content admission/freshness:** frozen catalogue plus exact source allow-list
  is authority; files/index rows do not admit themselves.
- **Analytics/customer evidence:** controlled aggregate outcomes only; raw
  queries, titles, labels and reading text are prohibited.
- **Release/runtime:** page, sources, index, redirects and Puffy assets belong
  in the exact candidate manifest and public-origin suite.

## 8. Verification and approval

Directly inspected:

- Library experience brief, charter, operating spec, state, backlog and four
  subproduct dossiers.
- `library.html`, including catalogue/admission, Miss Jeeves,
  reader/failure/focus and hash behavior.
- `content/site/puffy-bookmarks.js` and the Closet board in
  `laidies-card.html`.
- Existing Cycle 5 evidence claims. This recovery did not rerun a browser or
  public suite, so it does not promote those statuses.

Handoff:

- **Library owner:** verify the element inventory and visitor-state experience;
  resolve P0 admission, Miss Jeeves and correction gaps.
- **MAiKEOVER/Closet owner:** verify consumer copy and same-device
  reopen/remove; do not infer sync from a Card.
- **Functionality & Platform Director:** owns future identity/sync, cross-tab,
  schema, analytics, correction and release-contract changes.
- **Affected content owners:** verify both ends of High, NewsStand, episode and
  FAiRY routes before promotion.
- **Control Room:** Cycle 2 design may resume against this **SPECIFIED** map,
  but the Library promise remains BUILDING until the named P0 proof clears.
