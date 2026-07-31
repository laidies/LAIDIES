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
| Desktop shelf catalogue | Focus/click a cover | Available book opens; held/preview cover gives exact status | Frozen `SECTIONS`; unavailable covers are focusable status spans; `ADMITTED_BOOK_SOURCES` is empty | VERIFIED LOCALLY for hold enforcement; no available book |
| Mobile catalogue | Browse/tap at 320/390 px | Same inventory and truth without shrunken hotspots | Generated from the same frozen `SECTIONS` | VERIFIED LOCALLY mechanically; native visual/AT proof missing |
| Publication status/live region | Attempt held/preview book | Plain explanation that the book did not open | `reportLibraryStatus()` updates `#library-status` | VERIFIED LOCALLY mechanically |
| Direct saved/hash route | Open `/library.html#book::heading` | Open exact admitted section, or preserve current hold truth | Hash calls `openBook`; `admittedBook()` fails closed unless status and exact source pass | VERIFIED LOCALLY for hold enforcement |
| Reader and contents | Open admitted book/section | Fetch exact source, open modal, navigate, close and return focus | Exact same-origin allow-list; redirects rejected; focus trap/Escape/backdrop/Close; explicit load error/retry | BUILT LOCALLY; zero admitted sources and native AT proof missing |
| Miss Jeeves curated answer | Ask one of four recognized intents | Direct bounded answer, then admitted or honest held routes | Four inline lexical intents; book links check catalogue status | BUILT LOCALLY; claim/currentness and independent review incomplete |
| Miss Jeeves lexical search | Type another query | Relevant controlled results or zero-result recovery | Fetches a versioned same-origin `site-index.json`; unavailable/malformed/stale responses show an accessible retry that preserves the query, and Library records are reconciled through admission state | VERIFIED LOCALLY for failure/retry and held-route enforcement; source/currentness review remains open |
| Whole-book/exact-section Puffy save | In an admitted reader choose a sticker | Read-verified same-device save and visible state | `puffy-bookmarks.js`; exact supported route/sticker validation | VERIFIED LOCALLY on fixtures/exact artifact; no admitted production book |
| Puffy pouch selection/purpose | Change ten stickers in Closet | Approved sticker set/private labels remain on this device | `laidies_puffy_sticker_pouch`; allow-list, limits and read-back | VERIFIED LOCALLY; native private-mode/migration proof open |
| Closet Puffy board | Open `/laidies-card.html#puffyPouch` | See saves, reopen exact place or remove independently | Shared script reads canonical records; sibling anchor/remove control | VERIFIED LOCALLY same device |
| Corrupt/unsafe save recovery | Load malformed local data | Remove invalid rows, preserve valid siblings, disclose recovery | Field/route/sticker/date allow-lists, dedupe-newest, limits and live status | VERIFIED LOCALLY deterministically |
| Storage denied/write failure | Save/remove when storage fails | No false success; alert says nothing changed | `setItem` plus exact read-back; operation aborts on failure | VERIFIED LOCALLY deterministically |
| Cross-building continuations | Follow issue/High/NewsStand/FAiRY route | Reach admitted destination and useful handback | Some issue/index links exist; no complete handback registry | PARTIAL/INFERRED; P1 gap |
| Retired Grimoire routes | Visit old AI-handbook URL | Redirect to current Library without treating legacy as current | Redirects documented; stale links remain | OBSERVED; migration incomplete |
| Correction/report route | Find an exact error | Submit location-specific correction with receipt/status | No Library correction intake, ledger or propagation | MISSING; P0 before admitting books |
| Aggregate analytics | Arrive/open/search/save/reopen/remove | Privacy-safe outcome evidence | Sitewide tags may exist; no Library event/delivery contract | MISSING; P1 |

## Visitor-state recognition and continuity

Library does not use Card presence or account state as authorization. The
Puffy producer and Closet consumer share the same device-local keys in all
states.

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No valid Puffy board/pouch; Card/account irrelevant | Frozen catalogue; default pouch may initialize | Full orientation; no prior saves | Canonical local writes only; no backend | Library → Closet on same browser/device | Storage denial/corruption disclosed | BUILD BEFORE LAUNCH; same-device copy is temporary truth, not completion |
| Returning, no Resident Card | Valid Puffy data on this browser/device; no identity inference | Saved board/pouch | Reopen/remove prior valid locations; current admission rechecked | Same local writes only | Same keys across Library/Closet | Stale/held save stays closed; invalid rows recovered | VERIFIED LOCALLY same device; no account claim |
| Resident Card — device-local | Separately valid device-local Card envelope; not login proof | Same Puffy data plus Card elsewhere | No Library privilege or sync difference | Same local writes only | Card and Puffy coexist but are separate stores | Card loss/logout-like return does not change Puffy authority | BUILD BEFORE LAUNCH for intended resident continuity; Card cannot lend identity proof |
| Resident Card — verified account-backed, if supported | Requires separately accepted auth session/profile/RLS evidence | Library still loads local Puffy data only | No supported account-backed Library behavior today | No Library account write/sync | No Puffy backup, merge or second-device restore | Fall back to exact local/device truth | BLOCKED — BUILD REMAINS REQUIRED behind Platform Identity |

Required transition verdicts:

| Transition | Current truth | Launch disposition |
|---|---|---|
| First visit → save → return without Card | Read-verified local round trip exists | VERIFIED LOCALLY; public/native proof open |
| Visitor → create local Card → same-device return | Card does not alter Puffy behavior | BUILD BEFORE LAUNCH; run and pass the combined transition |
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
| Book catalogue/status | Editorial owner changes frozen record after admission evidence | `SECTIONS`, `ALL`, `admittedBook()` in `library.html` | None | Frozen page record plus `ADMITTED_BOOK_SOURCES` | Desktop/mobile shelves, Miss Jeeves, hash opener | Public artifact | All books hold/preview; source map empty |
| Rendered admitted book | Editorial build produces exact file | `openBook()` fetch/parser/reader | Static hosting | Explicit `/content/library-books/rendered/<id>.html` pairing | Reader, contents, section saver | Public artifact | Files may exist; none is admitted |
| Miss Jeeves curated answer | Maintainer edits `JEEVES_ANSWERS` | Inline matcher/renderer | None | Frozen page source | Library visitor; issue/book routes | Session only | Four answers; independent/currentness review incomplete |
| Miss Jeeves index | Site build produces entries | `fetch(site-index.json)`, lexical scorer | Static hosting | `content/site/site-index.json` | Result cards and destination pages | Session only | Publication/freshness/error filtering incomplete |
| Reader state | Cover/hash/Miss Jeeves opens admitted ID | Inline reader modal | Static source fetch | DOM/history hash | Current page and Puffy decorator | Session/history only | Built; inaccessible via current zero-admission catalogue |
| Puffy board record | Reader save after sticker choice | `content/site/puffy-bookmarks.js` | None | `localStorage['laidies_puffies_board']` canonical record | Library saved control; Closet board; reopen route | Browser/device only, anonymous | Read-verified local round trip |
| Puffy pouch | Closet selection/purpose change | Shared Puffy script | None | `localStorage['laidies_puffy_sticker_pouch']` | Library picker; Closet pouch/board | Browser/device only, anonymous | Read-verified local round trip |
| Resident Card | MAiKEOVER/Closet, outside Library | Resident Card/Closet modules | Possible Supabase paths elsewhere are not Library proof | Device-local Card envelope; separately possible auth session | Closet shell only; Library saves do not sync | Device or separately verified account | No Library signed-in behavior |
| Library correction | Reader identifies exact error | MISSING | MISSING intake/triage service | MISSING claim/location ledger | Book, Miss Jeeves, index and dependent products | Must avoid raw private query/reading data | No path exists |
| Library analytics outcome | Controlled UI outcome | MISSING event adapter | Approved aggregate provider, unverified | Controlled IDs/categories only | Product owner/Control Room | Aggregate | Script presence is not delivery proof |

## 4. End-to-end transaction contract

### Book admission and read

`editorial evidence → independent gates → owner admission → status=available +
exact allow-listed source → cover button → exact same-origin fetch with
redirect rejected → full reader → optional section/save → close/return focus`

- **Completion:** exact admitted source renders. A file, cover, click, hash or
  teaser is not completion.
- **Permission:** only the product/editorial owner promotes status after named
  evidence. The current map is empty.
- **Failure/retry:** held/unknown/redirect fail closed; fetch failure is a
  `role=alert` with retry.
- **Correction/removal:** demotion must block shelf, Miss Jeeves, hash and save
  reopen. Exact correction intake/ledger is MISSING.
- **Stale/tabs:** no real-time artifact update; refresh/new navigation is
  required. Exact public artifact identity is part of release proof.

### Miss Jeeves

`query → local normalization → curated intent or index → bounded answer/results
→ admission/status check → destination or honest hold/zero-result`

- **Completion:** useful visible answer and every promoted destination works.
- **Privacy:** query remains in page memory; never send raw query, answer,
  reading text or inferred need to analytics/logs/session replay.
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
| Correct/demote claim | Book, Miss Jeeves, index, dependent products | Exact claim/book/section | Correction destination | MISSING | MISSING | No acceptance evidence |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Zero admitted books | Complete read/save journey cannot start | No new backend; finish editorial admission and artifact binding | Release reliability | Library | `library.html`; rendered books/evidence; `build-packet-p0-admitted-book-reader-puffy-closet-2026-07-26.md` | One admitted book passes content/trust/brand/a11y, reader, save→Closet→reopen/remove and public proof | BUILDING — BUILD REMAINS REQUIRED |
| Miss Jeeves index ignores private admission | Search can route around holds | Build-time filtered index or runtime reconciliation | Content admission/release | Library/Miss Jeeves | `library.html`; index/builder | Held/stale fixtures never operable; visible unavailable state | BUILD BEFORE LAUNCH |
| Silent index failure | Unexplained empty search | Explicit load/error/retry; no provider needed | Release reliability | Miss Jeeves | `library.html`; index route | 404/offline/malformed accessible recovery | BUILD BEFORE LAUNCH |
| No correction ledger | Exact errors cannot propagate | Claim/location schema, receipt, triage, status and consumer propagation; service TBD | Shared correction | Library/content owners | Approved route/service; books/index/page | Submit→receipt→correct/demote→all consumers/public proof | BUILD BEFORE ADMITTING BOOKS |
| No Puffy account sync | Cleared/other-device saves absent | Versioned account store, migration, merge/conflict/revoke/delete/RLS | Identity + saves/Closet | Library saves + MAiKEOVER | New schema/API; shared script; Closet | Two accounts/devices, migration/merge/logout/revoke/RLS/offline/idempotency | BUILD BEFORE LAUNCH |
| Cross-tab browser-state proof | Native/browser-family behavior is still not independently witnessed | No product backend: retain the shared `storage` adapter and add native/browser-family evidence when release-bound | Saves/Closet | Library + MAiKEOVER | `puffy-bookmarks.js` | Chromium create/update/remove and visitor-state refresh PASS; native/browser-family witness remains | VERIFIED LOCALLY; no sync/ownership claim |
| No explicit schema version | Future change risks destructive recovery | Versioned local schema/reversible migration | Saves/Closet | Library saves | Shared script; optional IndexedDB only after approval | Legacy migration, rollback and denial fixtures | P1 before schema change |
| No verified analytics | Outcomes cannot be measured safely | Controlled dictionary/adapter/delivery health | Analytics | Library | Shared dictionary; page/Closet events | No raw query/title/purpose/text; production delivery proof | BUILD BEFORE LAUNCH for current intended measured experience; no approved D-056 later-release record |
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
- **AI service quality/safety:** Miss Jeeves is deterministic orientation, not
  a model; claims still need source/currentness ownership.
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
