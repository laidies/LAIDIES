# Functionality & Platform Director — first launch truth table

**Status:** REPORT READY — read-only trace; not a release approval  
**Owner:** Functionality & Platform Director (permanent shared-contract owner)  
**Scope:** all 17 canonical buildings plus shared platform contracts  
**Evidence ceiling:** repository and canonical records inspected 2026-07-26. No credential inspection, account creation, provider mutation, deployment, or public-origin interaction was performed.

## Decision rule

`OBS` means an implementation path, local deterministic/browser result, or limited historic public smoke exists. It is **not** a proof of a real provider, account, cross-device, moderated, delivered, or public-origin result. `MOCK/INFERRED` means fixtures, local handlers/state, documented design, or an untested integration. A launch class is the minimum honest disposition for the promoted experience, not a claim that a building is visually or editorially ready.

**Superseding build ruling — D-2026-07-26-055:** every `HIDE/LABEL` disposition
in the initialization snapshot below now means **BUILD BEFORE LAUNCH** when the
capability is part of Ali-approved product intent. Accurate limitation copy or
a disabled/hidden control may remain only as a temporary safety measure; it
does not close or reduce the build. The dated rows are preserved as audit
evidence of the earlier recommendation.

**Staged-release refinement — D-2026-07-26-056:** a capability that is
deliberately specified for a later named release/milestone or objective trigger
is not a current launch blocker. It remains tracked planned scope with owner,
dependencies and acceptance contract. Missed or blocked current-release work
cannot be reclassified as intentional later scope to pass launch.

Each compressed building record is ordered as: **outcome; route/discovery; trigger → authoritative completion; dependency; identity/persistence/reward; visible result/next; failure; evidence; gap + acceptance proof; launch class.** Outcome language is directory/operating-spec intent, not inferred from code.

## Building truth table

| Building | Outcome-first readiness record |
|---|---|
| Visitor’s Centre | **Orient** a newcomer to one appropriate town destination; `/visitors-centre.html` via home/global directory; map/directory choice → arrival at the chosen route (not selection); shared `SV_BUILDINGS`, navigation, optional media/Post Office handoff; anonymous, no owned persistence/reward; selected destination + enter action; missing directory/data must show named fallback, media/share failure keeps route choice; **OBS:** local route trace/room candidate, but current independent review found no-JS fallback lacks all 17 names; **gap/proof:** full static fallback plus clean newcomer/returner keyboard/mobile/public-origin arrival evidence; **FIX BEFORE LAUNCH** if promoted as the front door. |
| NewsStand | **Read a current, dated, sourced explanation or honest quiet/correction state**; `/newsstand.html` via directory/home; select publication/story → reader reaches admitted item; editorial records, story data, archive/search; anonymous/no reward or account completion; dated source/correction/next route; empty, stale, missing, correction states must be explicit; **MOCK/INFERRED:** publication lifecycle and producer-to-reader evidence unexecuted; **gap/proof:** reconcile mastheads/data, admit current inventory, run four-publication empty/current/correction/browser-public-origin suite; **HIDE/LABEL FOR LAUNCH** unadmitted/currentness claims. |
| Chick Flicks | **Choose an actually available, correctly labelled episode/listen-along**; `/chick-flicks.html`, `/episodes.html`; choose tape → exact approved episode opens (play click is not completion); catalogue/media/player/captions; favourites/last rental only device-local, no reward; availability + next learning route; unavailable/media/caption failure needs a labelled fallback; **OBS:** catalogue relationship documented; trailer/E01–E04 motion masters held; **gap/proof:** exact catalogue/discovery, caption/player/failure and independent media/public-origin proof; **HIDE/LABEL FOR LAUNCH** as illustrated listen-along only. |
| Blend & Snap | **Order an honest weekly episode pack and reach an admitted practice/reference route**; `/blend-snap.html`; menu/order → admitted child handoff (not a saved collection); episode data, Try-On/cards/quizzes; device-local café state only, no durable reward; availability/result/return; unavailable child must remain visible and non-deceptive; **OBS:** weekly-pack mechanics stronger than building evidence; Study Sheet absent, cards/quiz partial; **gap/proof:** one truthful manifest plus child-state, empty/failure/mobile test; **HIDE/LABEL FOR LAUNCH** unwired study/collection claims. |
| Mme CLAi-O's Shop | **Receive a bounded fortune/activity result with honest local history**; `/games/madame-claio.html`; draw/action → result with local record (not account entitlement); localStorage/redirects; device-local history/badge, no authoritative reward; read/message/move and return; storage, redirect, a11y/failure states must be recoverable; **OBS:** prior local activity audit; current full browser/a11y/persistence suite partial; **gap/proof:** clean/return state, keyboard/mobile, error/redirect evidence and safety ruling; **HIDE/LABEL FOR LAUNCH** durable badge/history language. |
| MAiKEOVER on MAiN | **Make and retain a Resident Card on this device; only claim an account/portrait when real service proof exists**; `/maikeover.html`, card/Closet paths; save → local card saved, authenticated claim → account outcome only after real confirmation; local storage, Supabase Auth/RPC/profile, avatar Worker; device-local known, account/cross-device/rewards unverified; saved-card/explicit service status/Closet next; unavailable service, expired link, privacy/not-found, retry must not be success-shaped; **OBS:** local save/layout, configured code paths; **MOCK/INFERRED:** avatar/auth/RLS/two-device; **gap/proof:** approved controlled email/accounts, avatar privacy/failure, two-account RLS and second-device suite; **FIX BEFORE LAUNCH** remote claim/avatar promotion; **HIDE/LABEL** device-local only is possible. |
| BRONZE AiGE | **Use a truthful social/work-learning salon without implying alcohol service, attendance, booking or durable reward**; `/bronze-aige.html`; choose special/coaster/audio → labelled local result or playable audio; episode/issue fetch, audio, clipboard/calendar, local state; local honour receipts only/no identity or currency; result + return; fetch/audio/clipboard failure must state no action happened; **OBS:** local receipt repairs; fresh browser/mobile/audio/fetch untested; **gap/proof:** owner framing decision and exact live-content/failure/a11y suite; **OWNER DECISION** alcohol/service framing, then **HIDE/LABEL** local-only claims. |
| Dream Phone Booth | **Get a scripted playful reframe or make a sourced claim judgment**; `/games/dream-phone.html` (game child route); dial/commit → caller-specific reframe or clause feedback; static bundles/evidence ledger; session-only rotation/history, no account/reward; actual result + learning/return; stale/malformed/unadmitted ledger must fail closed; **OBS:** one Mentor call/remix; game full round/scoring/a11y and source review untested; canonical live-vs-park conflict; **gap/proof:** Ali product/status ruling, source admission, clean full-game/failure/mobile suite; **OWNER DECISION** then **HIDE/LABEL FOR LAUNCH** until approved. |
| The Mall | **Find an intentional shop and complete only its separately proven action**; `/mall.html`, `/shop.html`, child shops; select shop → child-owned completion; child routes/content/possible commerce/reward/identity; shop-local choices exist, no shared purchase or ownership ledger; clear shop status/next; missing stock/route/fulfilment must not look operable; **OBS:** routes and some local closet/flair controls; child readiness largely unknown; **gap/proof:** complete child register with action/dependency/fulfilment/return proof; **HIDE/LABEL FOR LAUNCH** blanket shop/ownership claims. |
| KSVL Community RAiDIO | **Play a selected rights-admitted track with useful controls and recovery**; `/radio.html`, `/ksvl-popup.html`; play chosen track → audible playback/control state (not listening/learning completion); media catalogue/assets/player and request Supabase path; local selections/pick, request may be locally queued; audible status/source route; media/network/persistent-player/request provider errors need visible recovery; **OBS:** 29 creator-confirmed tracks and representative public playback; **MOCK/INFERRED:** all controls, requests, privacy/moderation; **gap/proof:** real control/media/mobile/conflict and approved request-service suite; **FIX BEFORE LAUNCH** if requests are promoted, otherwise **HIDE/LABEL** request/record claims. |
| SUNNYVAiLE Post Office | **Make an honest newsletter, sign-in, postcard or referral handoff—not claim delivery/lifecycle/reward**; `/post-office.html`; submit/share → provider-confirmed accepted result only; Buttondown Worker, Supabase Auth/RPC/RLS, native share/email; local postcard/referral handoff, account/reward/lifecycle unverified; clear attempted/accepted status + inbox/return; cancel, provider/CORS/error, duplicate/self/retry must be explicit; **OBS:** representative local sharing; **MOCK/INFERRED:** delivery/open/join/referral/reward; **gap/proof:** controlled test identities/addresses, cleanup, success/error/retry/idempotency/two-account proof; **FIX BEFORE LAUNCH** delivery/referral reward claims; **HIDE/LABEL** share as a handoff. |
| Town Hall | **Submit bounded civic feedback and understand the limited service acknowledgement**; `/town-hall.html`; validate/send → backend accepted receipt (not read/resolved); intake backend, staff triage, identity/abuse policy; local draft/selection may exist, no authoritative public record/reward; receipt + stated next; unknown timeout cannot say unfiled; validation/rate/abuse/privacy/retry must be handled; **OBS:** synthetic local deterministic/browser tests with external network denied; **MOCK/INFERRED:** service, triage, moderation; **gap/proof:** authorised isolated backend/staff lifecycle, rate-limit/idempotency/retention proof; **FIX BEFORE LAUNCH** feedback submission promotion. |
| SUNNYVAiLE LIBRAiRY | **Find trustworthy help, open a real source, get a direct answer, and save an exact place**; `/library.html` + book fragments/Closet; open/save/reopen → exact section available; rendered books/site index/Miss Jeeves/Puffy; `localStorage` Puffy/Closet device-only, no reward/account; reader/answer/save/reopen next; absent/stale books and failed search/storage must say so; **OBS:** Vocab and Puffy local round trips PASS; **MOCK/INFERRED:** full editorial/currentness, account, public-origin; **gap/proof:** owner lesson/availability decision, source/correction and browser/public-origin suite; **HIDE/LABEL FOR LAUNCH** unadmitted books (available local mechanics may remain labelled device-local). |
| SUNNYVAiLE High | **Learn, practise, receive an honest result—not local clicks/scores as durable mastery**; `/sunnyvaile-high.html`, classes/quiz/Book Fair; complete assessment → authoritative result only when verified; class feed, quiz, library/episode, rewards; local report/collectibles only, shared grant/spend/refund absent; result/explanation/next; unavailable class, duplicate/offline/retry/insufficient balance must be honest; **OBS:** selected question scoring local; `high-classes.json` 404 in audit; **gap/proof:** repair runtime route, learning admission, authoritative ledger with idempotency/refund and account/two-device tests; **FIX BEFORE LAUNCH** reward/mastery claims; **HIDE/LABEL** local practice. |
| FAiRY Godmother's House | **Receive safely routed, grounded help for a work communication problem**; `/games/fairy-godmother.html`; ask → typed allowed success with suitable answer, or typed safe boundary/refusal (never a shaped success); Cloudflare Worker/model, safety/retrieval, identity/allowance, Plays ledger; guest/session state only; Plays not authoritative; answer/boundary + Library/High next; invalid/rate/service/uncertain must not consume allowance and must recover; **OBS:** Worker tests/dry-run; live audit found fabricated claims, safety/routing and allowance/refund failures; **gap/proof:** 42-case API+page controlled production suite, typed routing, grounded claims, allowance/replay/grant-display-spend-refund idempotency; **FIX BEFORE LAUNCH**. |
| Delta LAi Nu Sorority House | **Enter a bounded, moderated conversation/reflection space with clear norms**; `/sorority-house.html`, `/community.html`; provider-confirmed accepted/visible moderated post → earliest post outcome (not visit/self-report); Hyvor, community policy/moderation, Girl Talk/identity; Resident Card local only, no post reward; room norms + receipt/status/return; login/provider/moderation/error/offline/retry/duplicate must be explicit; **OBS:** seven Hyvor widgets/local rooms; Girl Talk awards before post; **gap/proof:** controlled provider posting/moderation/identity/persistence and remove visit-as-post reward; **FIX BEFORE LAUNCH** post/reward language. |
| The LUMINAiRY | **Meet a sourced, dated guide with a useful next route**; `/luminairy.html`; choose portrait → admitted current profile + route; source/freshness registry, KSVL relation, local selection; browser-local selection/no reward/account; sourced profile/correction/next; held, stale, missing source/modal focus failures must remain visible; **OBS:** claim/modal local repair records; **MOCK/INFERRED:** current profile admission and public journey; **gap/proof:** source/freshness/correction registry plus keyboard/mobile/exact route proof; **HIDE/LABEL FOR LAUNCH** held profiles. |

## Permanent shared-platform contracts

| Contract owner | Consumers / real dependency | Current truth and gap | Required acceptance proof / launch class |
|---|---|---|---|
| Identity, canonical profile & permissions | MAiKEOVER, Post Office, High, FAiRY, community, referral | Supabase code/migrations/config references exist; magic link, profile/RLS, visibility/logout/second-device are not accepted real-account proof. | Approved disposable identities: fresh email → link → profile/handle → logout/login → second device; two-account private/public/not-found/RLS; errors/expiry/retry. **FIX BEFORE LAUNCH** for any account/privacy claim. |
| Rewards: FAiRY Plays, butterfly clips, stamps, Closet ownership | FAiRY, High, Blend & Snap, Mall, MAiKEOVER, Post Office | Local counters/renderers and isolated RPC design exist; no cross-product append-only entitlement ledger establishing grant/display/reserve/spend/refund or idempotency. | One completion ID/event schema and ledger replay proving duplicate/retry/non-consuming failure, balance, refund, insufficient funds, two-device display and fulfilment. **FIX BEFORE LAUNCH** reward/ownership/referral claims; otherwise **HIDE/LABEL**. |
| Saves/progression/Closet | Library, MAiKEOVER, cards, Mall | Device-local `localStorage` mechanics observed; account/cross-device restoration not proven. | Clean-device/save/reopen/remove plus storage-denied/duplicate; separately account/two-device after Identity proof. **HIDE/LABEL** as “this device” until then. |
| Community/moderation | Sorority, Girl Talk, Town Hall, KSVL requests | Hyvor embeds and local UI observed; no real accepted/visible/moderated, abuse/rate-limit or staff-queue proof. | Controlled posts/requests with success, validation, provider error, retry/idempotency, moderation disposition, privacy/retention and abuse safeguards. **FIX BEFORE LAUNCH** community/service promise. |
| Referrals/postcards | Post Office, MAiKEOVER, rewards | Local URL/share handoff and referral parameter observed; no mailed/opened/joined lifecycle or two-sided reward proof. | Controlled send/open/join across two approved accounts, self/invalid/repeat/retry, idempotent attribution and both-account result; cancellation/fallback. **HIDE/LABEL** handoff; **FIX** lifecycle/reward claims. |
| Newsletter/delivery | Post Office, home | Buttondown embed and Worker URL/code observed; no provider acceptance/inbox/duplicate/error public proof. | Approved test address + cleanup: submit, provider acceptance, mail receipt/confirm, duplicate, CORS/timeout/retry/unsubscribe; no secrets logged. **FIX BEFORE LAUNCH** delivered/subscribed wording. |
| AI service quality & safety | FAiRY, MAiKEOVER avatar, Dream Phone claims | FAiRY local Worker tests exist but live audit fails grounded/routed/allowance contract; avatar remote dependency untested; Dream Phone fact admission open. | Fixed safety/eval corpus, typed outcomes, source/currency tests, rate/timeout/retry, privacy retention and production-origin controlled proof. **FIX BEFORE LAUNCH** any live AI advice/avatar/learning claim. |
| Analytics & customer evidence | all buildings | Plausible tags embedded; runtime calls Plausible/Clarity ingestion **NOT WIRED**; no aggregate delivery/semantic/privacy evidence. | Shared privacy-safe dictionary, owner/retention rules and production delivery health test. Never log prompts, email, handles, avatars, referrals or raw community content. **FIX BEFORE LAUNCH** only if claimed as an operational learning loop; otherwise **POST-LAUNCH** instrumentation. |
| Release reliability | all | One prior source/artifact/deployment binding and limited route/browser smoke exists; static link pass does not cover runtime fetches/services/a11y/performance. | Exact candidate manifest; route/redirect/runtime media/fetch fallbacks; controlled providers; browser/a11y/CWV suite; rollback/incident drill; daily health/freshness owners. **FIX BEFORE LAUNCH** for reopening. |

## Today’s cutline

- **Actually complete:** no building has the evidence required to call its complete intended outcome publicly verified. Bounded local mechanics exist for Library saving/reopening, selected media playback, local card/fortune/receipt state, and static route integrity only.
- **Buildable without credentials:** complete static/runtime dependency manifests and fallbacks; correct the 17-name Visitor fallback; implement intended content/child routes; eliminate visit/click-as-outcome behavior; repair High’s missing runtime class feed; assemble exact local acceptance suites.
- **Build-required shared systems:** cross-device/account restoration; reward/clip/stamp/ownership/referral lifecycle; postcard delivery/open/join; admitted Library/LUMINAiRY/NewsStand content; approved motion media; Dream Phone’s ruled product; Mall commerce/stock; durable saves and authoritative activity results. Temporary safety holds do not complete these items.
- **Needs credentials, external service or owner authority:** Supabase/Auth/RLS, Buttondown delivery, Hyvor moderation, Worker/model/avatar service, native-device sharing, provider rate/CORS tests, and any public-origin verification need an approved controlled-test plan. Ali must rule on Dream Phone’s product/status and BRONZE alcohol/service framing before those can be promoted.

## Director operating rule and next trigger

The Functionality & Platform Director owns the contracts above, dependency locks, evidence classification, controlled-service protocol, and release manifest—not each building’s intended experience or visual judgement. Building owners supply outcome records and consume the contracts; shared-file/service work queues behind this owner. The next trigger is an approved isolated test plan for **Identity/Rewards + service verification**, while building owners concurrently backfill their outcome records and truthful limitation copy.

Each building owner must now maintain `FUNCTIONALITY-MAP.md` from the shared
template. The record enumerates every visible capability and its complete
producer → frontend → authoritative store/service → consumer flow, including
create/update/remove/revoke/refund propagation, identity/persistence scope,
failure/idempotency behavior, missing backend, responsible owner, exact paths
and acceptance proof. The MAiKEOVER/Closet map is the first reference
implementation; it is a gap contract, not a claim those integrations are
complete.

Each building also receives separate first-time,
returning-without-Resident-Card and Resident Card verdicts using
`VISITOR-STATE-EVALUATION-STANDARD.md`. Device-local Card recognition and
verified account-backed residency are separate scopes. The Director owns the
recognition, identity, persistence and transition contracts; a PASS in one
state cannot establish another.

## Initialization reconciliation — 2026-07-26

The platform owner-entry preflight initially failed because
`platform-reliability/OPERATING-SPEC.md` did not exist. The recovered spec now
defines the shared completion, visitor-state, identity, persistence,
correction, analytics and release contracts. This corrects an owner-entry
record; it does not implement any missing service.

The first source-level producer/consumer audit after MAiKEOVER is the Library:

- its catalogue and exact admitted-source map are private frozen page records;
- the admitted-source map is empty, so every book remains hold/preview even
  when a rendered file exists;
- Miss Jeeves is client-side curated/lexical orientation, not a model, and its
  general index still needs publication/freshness/error reconciliation;
- Puffy board/pouch records are canonicalized, read-verified `localStorage`
  consumed by the Closet on the same browser/device; and
- no Library backend, account sync, reward, ownership, correction service or
  verified analytics delivery exists.

First-time visitors, returning visitors without a Card, device-local Card
holders and verified account-backed residents therefore receive the same
Library/Puffy capability ceiling. A local Card does not prove authentication;
an accepted account session would still not prove Puffy backup, merge or
second-device restoration.

### Reconciled P0

1. Backfill every building's `FUNCTIONALITY-MAP.md`; only MAiKEOVER and Library
   currently have source-reconciled reference maps.
2. Build and pass the controlled Supabase
   identity/RLS/two-account/two-device vertical required by the intended Card,
   account and cross-device experience.
3. Build one idempotent grant/display/spend/refund/replay ledger for rewards,
   Plays, ownership, referrals and fulfilment.
4. Build and test every intended provider lifecycle with controlled
   identities/data; a local/native handoff is not the completed lifecycle.
5. Admit content only through explicit catalogue/source/correction authority;
   search, files, hashes and saves may not promote held content.
6. Bind exact source, artifact, runtime dependencies, deployment,
   public-origin journeys, service verdicts and rollback before reopening.

### Reconciled P1

1. Version local state and handle cross-tab conflicts before schema changes.
2. Establish exact-location correction/retraction propagation.
3. Prove a privacy-safe event dictionary and analytics delivery/learning loop.
4. Complete representative native accessibility/browser/device/performance
   evidence and recurring service/freshness health.
5. Add account sync only after identity proof and explicit
   merge/revoke/delete/two-device contracts.

### Recommended Control Room order

`build freeze and executable gap packets → one admitted Library read/save/Closet round trip
→ isolated Identity vertical → one economic ledger vertical → separate
provider verticals → exact combined candidate/rollback suite → deploy →
public-origin verification`

This is a recommendation, not release authorization. No live service,
deployment or public route was mutated during initialization.

## Evidence consulted

- `operations/launch/whole-site-reopening-qa-matrix.md`
- `operations/product-stewards/platform-reliability/public-promise-registry-2026-07-25.md`
- `operations/product-stewards/platform-reliability/backlog.md`
- `operations/product-stewards/building-experience-readiness-2026-07-26.md`
- `content/site/sunnyvaile-directory.js` and the cited building operating specifications/launch deep dives.

## Learning scan

Reapplied **BTB-010–012** and **BTB-069**: code, a local handler, an HTTP success, or a UI response is not the authoritative user outcome. Also reapplied **BTB-130**: this platform audit does not determine building design intent or brand direction. No new painpoint entry: the material finding is the documented, pre-existing evidence gap; this report makes its launch consequence explicit rather than discovering a new failure.

Initialization additionally reapplied **BTB-134–136** and
**D-2026-07-26-052–054**: an owner address is not an entry point; a destination
screen is not a producer/consumer round trip; and a clean-browser or
device-local Card PASS cannot establish verified account-backed residency.
The Library audit exposed specific instances—silent index failure, admission
authority bypass risk and absent correction propagation—but these are concrete
manifestations of the existing controls, not a new failure class. They are
recorded in the Library and platform backlogs; no additional painpoint entry
was warranted.
