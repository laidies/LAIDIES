# Mme CLAi-O functionality and cross-page touchpoint map

**Status:** SPECIFIED — PRODUCT-LOCAL CONTRACT RECOVERED; SHARED REWARD,
ANALYTICS, NATIVE ACCESSIBILITY AND PUBLIC RELEASE GATES REMAIN  
**Product/building owner:** Mme CLAi-O champion  
**Functionality & Platform Director:** review required

This map separates the reading engine's bounded local proof from the complete
building, shared reward, analytics and release result. A click, local key,
remote row or displayed badge cannot lend completion to the whole journey.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Storefront/room orientation | Enter `/games/madame-claio.html` | Recognize place, random reflection job, boundary and deck action | Current source has storefront, title, room, boundary and labelled controls | OBSERVED; owner visual/comprehension gate open |
| Weekly/town return | Header back link, optionally `from=this-week` | Correct useful return route | Inline rewrite plus shared back-nav; bounded historical evidence only | OBSERVED; exact candidate/public proof required |
| KSVL song | Play/pause labelled control | Optional audio without blocking reading | Local audio path and shared player wrapper present | OBSERVED; audio/native control/rights/public proof open |
| Shared charm | Activate a hero sparkle when current weekly data places one | Shared charm result independent of reading | `charm-hunt.js` attaches to `.sv-hero`; shared store/provider outside Mme | OBSERVED; shared product owns completion |
| Random reading | Cut deck via visual or button | One valid card rendered, announced and focused | 100-card deck, pending guard, canonical result and automated browser proof | VERIFIED LOCALLY within prior bounded suite |
| No-immediate-repeat | Draw again or return and draw | New card differs from immediately previous valid card | Selector restores canonical last-history card | VERIFIED LOCALLY |
| Art fallback | Card image missing/fails | Full text result remains | WebP→PNG→hide fallback | VERIFIED LOCALLY/proxy; exact current artifact retest required |
| Permanent safety boundary | Arrive/read/draw | Random/non-tailored and high-stakes/current-fact limits stay visible | Static focusable panel; no typed prompt or semantic router | VERIFIED LOCALLY/proxy; human comprehension open |
| Local count/history | Completed draw | Honest count, ten-record canonical maximum and last-three display | Validated `localStorage` keys; malformed/unknown content sanitized | VERIFIED LOCALLY |
| Storage failure | Denied read/write/remove | Reading works; no false saved/reward success; visible local failure | Exceptions handled; browser denial suite passed previously | VERIFIED LOCALLY; native private/quota modes open |
| Hotline Regular | Fifth valid completed locally persisted draw | Device-local keepsake reveal, not account benefit | Mme writes validated `laidiesSecretBadges['hotline-regular']` | VERIFIED LOCALLY as producer; cross-page/account meaning conflicts |
| Scoped clear | Clear Mme data | Mme count/history/keepsake removed; unrelated siblings preserved | Scoped removal plus sanitation tests passed | VERIFIED LOCALLY |
| Resident Card handoff | Select “Visit your Resident Card” | Navigate without implying delivery/sync | Link exists; no Mme-to-Card receipt on that journey | PARTIAL; copy/consumer contract must be judged |
| Legacy Cocktail Fortune recovery | Open retired route | Canonical Mme route with truthful retirement | Redirect source present; prior local pass | VERIFIED LOCALLY historically; public proof open |
| Businesswomen's Special separation | Follow/read BRONZE AiGE surface | Separate adult alcohol-optional/spirit-free game | Current source states separate game and complete spirit-free lane; Mme exact-string tests currently fail after wording drift | SOURCE TRUTH PRESENT; REGRESSION FIXTURE FAIL |
| Aggregate analytics | Page/action/outcome/error | Privacy-safe product evidence | Plausible and Clarity loaders present; no approved Mme event/delivery contract | MISSING intended learning loop |

## Visitor-state recognition and continuity — four scopes

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No valid Mme local members; no claim about person/account novelty | Empty count/history; valid unrelated badges preserved | Full orientation and first draw | Mme local keys only; no service | None required | Storage denial becomes current-page-only reading | VERIFIED LOCALLY for bounded source/browser mechanics; owner/native/public gates open |
| Returning, no Resident Card | Valid Mme count/history/badge in this browser only | Canonical last card, count, last three and valid local keepsake | Useful return copy; no immediate repeat; review/clear | Same Mme local keys only | Same browser/device | Malformed/unknown/future members discarded; valid siblings retained | VERIFIED LOCALLY; second-tab/native/private/public proof open |
| Resident Card — device-local | Separate Card envelope may exist; Mme does not read or authorize from it | Same Mme local state as above | No privilege, personalization, sync or reward upgrade | Same Mme local keys only | Link to Card only; no delivery receipt | Card loss/change must not mutate Mme data | SPECIFIED; combined transition proof required |
| Resident Card — verified account-backed | No accepted Mme auth/session consumer | Same local state only | No account-backed Mme behavior supported | No Mme account write authorized | Shared `script.js` now excludes every `scope='device-local'` keepsake before reward-event projection | Stay local; account state does not change the reading | VERIFIED LOCALLY for importer exclusion; provider/public journey remains unverified |

### Required transition verdicts

| Transition | Current truth | Launch disposition |
|---|---|---|
| First visit → draw → leave → return without Card | Prior exact local suite passed count/history/non-repeat | Preserve pass; rerun exact candidate and public scope |
| First/returning → create device-local Card → same-device return | Mme ignores Card; combined journey not evidenced | BUILD BEFORE LAUNCH |
| Device-local Card → verified account | Mme has no migration; shared importer explicitly excludes device-local keepsakes | Preserve local-only state; verify provider/public journey separately |
| Signed-in → sign out → return | Mme page remains local and no Hotline Regular account event is projected | Preserve local-only state; provider/public journey remains unverified |
| Second tab | Browser storage changes may not repaint an already-open Mme tab | BUILD BEFORE LAUNCH if same-tab freshness is intended; otherwise label refresh contract and test |
| Second device | No Mme history/count arrives by current intent | PASS only when copy remains exact and no shared importer implies history sync |
| Corrupt/migrated/storage-denied | Strict count/history/badge sanitation and denied-storage suites passed previously | Preserve pass; add schema/change trigger |
| Card/account deletion, privacy change or revoke | Mme local data remains until this browser is cleared; no Hotline Regular account row is projected | Copy and scoped local clear must remain exact |
| Local/account conflict | Mme history is not account data and device-local keepsakes are excluded from account projection | VERIFIED LOCALLY; provider/public journey remains unverified |

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Governed deck | Maintainer edits page source under owner review | Inline deck/selector/render functions | None | Exact 100-record source array | Reading result/history rehydration | Public artifact | Bounded source test locates exactly 100 cards |
| Current reading | Visitor completes draw | Inline reading engine | None | DOM/session; optional canonical local append | Mme result only | Page session plus optional device history | Completion independent of storage |
| Call count | Successful draw with successful write | Inline storage adapter | None | `localStorage['claio-call-count']`, exact integer `0..10000` | Arrival/progress/badge threshold | Browser/device | Prior adversarial pass |
| Reading history | Successful draw with successful write | Inline canonicalizer/storage adapter | None | `localStorage['claio-call-history']`, last ten canonical refs | Arrival, last-three display, non-repeat | Browser/device | Prior adversarial pass |
| Hotline Regular local producer | Fifth completed and read-back-verified persisted draw | Inline badge sanitizer/writer | None on Mme page | Plain-object member in `localStorage['laidiesSecretBadges']` with strict ISO UTC time and `scope='device-local'` | Mme reveal and local history only | Browser/device | VERIFIED LOCALLY, including threshold storage denial and failed deletion |
| Hotline Regular account row | Shared reward projection scans local badges | `script.js#getLocalRewardEvents` | Supabase path is not called for this member | None: device-local members return before event construction | No account-backed collection consumer | Explicitly withheld from account/cross-device projection | VERIFIED LOCALLY by source contract; provider/public journey remains unverified |
| Card collections | Resident Card loads remote collections | Inline Card collection loader | Supabase | `member_reward_events` | `laidies-card.html` merit sash | Account | Does not prove the Mme producer-to-consumer round trip |
| KSVL playback | Song control | inline player plus `ksvl-player.js` | Static media | `/content/music/game-mme-claio.mp3` and shared player state | Mme/mini player | Device/session | Optional dependency |
| Charm | Shared weekly charm activation | `charm-hunt.js` | None/aggregate Plausible | Shared local charm key | Closet/shared charm surfaces | Browser/device; other shared behavior outside scope | Mme only hosts placement |
| Product analytics | Reading entry/start/complete/clear/failure | MISSING approved Mme adapter | Plausible/Clarity present but delivery unverified | Approved event dictionary/aggregate provider | Product owner/Control Room | Aggregate only | MISSING |

## 4. End-to-end transaction contracts

### Reading

`orientation and permanent boundary → explicit deck activation → pending guard
→ random index excluding previous valid index → valid governed card → render
text/art fallback → focus and live announcement → attempt canonical local
count/history write → read/sanitize local state → optional local keepsake →
visible local/storage result → repeat, clear or leave`

- **Authoritative completion:** valid card text is visible and announced.
- **Validation:** deck record must be governed; stored history copy is never
  trusted as authored truth.
- **Idempotency:** activation is disabled/ignored while pending; one accepted
  activation yields at most one count/history append and one stable badge ID.
- **Failure:** no deck/input empty state; storage, image, audio, analytics and
  network failures do not block text; storage failure withholds saved/reward
  success.
- **Accessibility:** native control activation, visible focus, polite pending,
  focus-to-result, complete labels and reduced-motion zero-delay.
- **Privacy/security:** no visitor-authored text or identity; parsed local
  objects are untrusted, bounded, allow-listed and rendered as governed text.
- **Cost/rate:** no provider cost; repeated clicks are locally guarded.

### Hotline Regular

`fifth completed locally persisted reading → construct stable
hotline-regular member → exact timestamp/scope validation → preserve unrelated
valid badge siblings → write/read local store → reveal local-only result`

- **Product completion:** local object is read back and local reveal appears.
- **Duplicate:** stable key prevents a second local badge.
- **Remove:** Mme clear removes only its member and preserves unrelated valid
  siblings.
- **Account collision:** shared `script.js` later classifies the same local ID
  as `merit_badge` and may upsert it to `member_reward_events`; no accepted Mme
  grant, display, deletion/revoke, privacy or two-account/device evidence binds
  that path.
- **Required resolution:** Platform/Identity must either exclude this ID from
  account import and prove it stays local, or obtain a new owner decision and
  build the complete account-backed reward lifecycle. Current product intent
  does not authorize the second outcome.

### Clear and corrupt-state recovery

`activate labelled clear → remove Mme count/history → sanitize badge object →
delete only hotline-regular → write/read remaining valid siblings → repaint
fresh arrival/history/progress → announce exact scope`

- Remove/read/write failure must not announce success.
- Unknown/malformed badge siblings are not promoted; valid unrelated siblings
  survive.
- Account-backed rows, if already imported by shared code, are not currently
  revoked by this local clear; this is a blocking lifecycle mismatch.

### Legacy and cross-product handoffs

`Cocktail Fortune route → truthful retired notice → location.replace canonical
Mme route`; completion is the canonical pathname and correct product boundary.

`Mme → Resident Card` and `Mme/legacy → Businesswomen's Special` are navigation
handoffs only; they cannot imply reward delivery, shared history, alcohol
service, advice or safety certification.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Complete reading | Mme arrival/progress/history | Canonical card ref and count | Same route | Same document update; next load rehydrates | Clear removes | Prior source/browser suite |
| Earn local Hotline Regular | Mme reveal; potentially shared importer/Card | Stable ID/title/source/time/scope | Card link is not a receipt | Mme same document; account import occurs elsewhere if signed-in sync runs | Local clear does not prove remote revoke | Product-local pass; shared lifecycle MISSING |
| Clear Mme data | Mme UI; any shared account consumer should reconcile only if account import is approved | Mme keys/ID removal | Same route | Local repaint | Remote row currently not proved removed | Local pass; shared failure open |
| Sign in after local badge | Shared homepage importer → Supabase → Card collection | Badge converted to account event | Account/Card routes | Upsert/dedupe in shared code | Delete/revoke/account conflict unproved | Source observation only |
| Open retired Cocktail Fortune | Mme canonical route | No state migration asserted | Canonical path | Redirect | N/A | Local historical pass/public open |
| Follow Resident Card link | Card page | No Mme state receipt asserted | Card route | Card loads its own local/remote sources | Governed by Card/Platform | No Mme round-trip proof |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Local keepsake is classified as shared account merit badge | Copy says local-only while later sign-in may create a durable account row; local clear may not revoke it | Decide local exclusion versus newly authorized durable reward; implement allow/deny list, grant source, dedupe, read model, remove/revoke/delete/privacy and migration rules | Identity/Rewards + Functionality & Platform | Mme CLAi-O | `games/madame-claio.html`, `script.js`, `laidies-card.html`, Supabase `member_reward_events` policies/services | Two accounts/two devices; local earn; sign-in; duplicate/replay; clear; revoke/delete; privacy; no cross-account leak; exact copy matches outcome | BLOCKED — BUILD REMAINS REQUIRED |
| No approved Mme analytics contract | Owner cannot measure completion, repeats, storage failure or boundary comprehension safely | Add approved product-specific events to shared dictionary/adapter and production delivery health; prohibit card text, identity, full session content and sensitive inference | Analytics/Privacy + Platform | Mme CLAi-O | `event-dictionary.json`, approved adapter/provider configuration, exact page integration later | Synthetic start/complete/clear/storage failure; payload inspection; opt-out/privacy; aggregate receipt; no prohibited values | BUILD BEFORE LAUNCH |
| No current Safari/VoiceOver/native zoom evidence | Automated pass can miss real AT/reflow failures | No backend; execute human native matrix against exact candidate and record defects | Accessibility/Release | Mme CLAi-O | Exact candidate/public route and evidence folder | Safari macOS/iOS, VoiceOver, 200%/400% as applicable, reduced motion, touch/keyboard, focus and announcements | BUILD BEFORE LAUNCH |
| No exact current public-origin/release binding | Local pass can be mistaken for live product truth | Build immutable candidate manifest, exact source/artifact hash binding, bounded public suite and rollback record | Release/Platform | Mme CLAi-O | Exact page/CSS/JS/assets/redirect/BWS dependency | Same contract/visitor/failure suite on exact artifact and real origin; artifact size/identity; rollback drill | BUILD BEFORE LAUNCH |
| Controlled room/object experience not owner-approved | Working mechanics may still fail place, comprehension or visual quality | Capability-preserving isolated championship; no service | Brand/Experience + Control Room | Mme CLAi-O | Product evidence candidate area first; production paths only after owner selection | Incumbent + two challengers + red team + blind score; full-resolution review; newcomer comprehension; mobile/desktop; 17/20 floors | BUILD BEFORE LAUNCH |
| BWS cross-product regression checks require stale exact wording | Current separate/spirit-free source truth fails Mme test suite | Replace phrase matching with semantic/source contract agreed by BRONZE owner; keep product separation invariant | BRONZE AiGE + Quality Automation | Mme CLAi-O owns dependency assertion only | `games/businesswomens-special.html`, `scripts/test-mme-claio-contract.mjs`, `scripts/test-mme-claio-browser.mjs` | Current truthful wording and adversarial conflation/omission fixtures pass without pinning one sentence | BUILD BEFORE LAUNCH |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** Mme consumes none; shared account
  reward import must not be mistaken for a Mme identity contract.
- **Saves/progression/Closet:** count/history are Mme-only local convenience;
  Hotline Regular currently collides with a shared merit-sash importer.
- **Rewards/economy/ownership/fulfilment:** no currency, FAiRY Plays, access,
  membership benefit or paid reading; the local ID must not acquire these by
  shared inference.
- **Community/moderation:** none; no visitor content.
- **Referrals/postcards/newsletter/delivery:** none.
- **AI service quality/safety:** no model/provider; random authored deck only.
- **Content/media admission and freshness:** 100-card source and art mapping are
  governed; new deck/art needs owner and rights admission.
- **Analytics/customer evidence:** aggregate controlled outcomes only; Clarity
  presence is not privacy approval or product evidence delivery.
- **Release/build/runtime:** page, CSS, enhancement, optional media, legacy
  redirect, BWS boundary and shared scripts must be bound to the exact
  candidate; public route presence alone is not completion.

Shared work is queued in
`control-room-platform-handoff-2026-07-26.md`. Mme CLAi-O must not edit or
invent the shared account, ledger, analytics or release system inside its
product lane.

## 8. Verification and approval

Directly inspected during owner entry:

- governing continuity, owner-entry, visitor-state and build-completion rules;
- registry/run-queue/state/charter/spec/backlog and prior maker/judge evidence;
- current Mme HTML/CSS/enhancement, legacy redirect, BWS boundary and tests;
- shared local-badge classification/import and Resident Card collection code;
- exact targeted preflight and current source/browser regression results.

Current evidence:

- Targeted preflight failed only for the two records now recovered.
- Prior Repair 2 evidence remains a bounded historical local pass; it was not
  promoted to current public truth.
- On 2026-07-26 the current Mme source contract and browser suites both failed
  only their exact BWS wording assertions; the BWS source still visibly says
  it is a separate game and provides an equally complete spirit-free lane.

Approval handoff:

- **Mme owner:** accepts the complete element inventory, intent and product
  acceptance contract.
- **Brand & Experience:** runs/judges the controlled composition championship.
- **Functionality & Platform/Identity:** resolves the local-to-account reward
  collision and analytics/release dependencies.
- **BRONZE AiGE:** accepts the BWS semantic boundary and regression contract.
- **Independent reviewers:** rerun product, trust, accessibility, technical,
  exact-artifact and public-origin gates without maker/judge overlap.
- **Control Room:** admits the lane in portfolio order and records which shared
  dependencies were accepted before integration.
