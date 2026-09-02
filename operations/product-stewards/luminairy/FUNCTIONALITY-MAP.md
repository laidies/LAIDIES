# The LUMINAiRY functionality and cross-page touchpoint map

**Status:** SPECIFIED — RECOVERED MAP; FUNCTIONALITY & PLATFORM DIRECTOR REVIEW REQUIRED  
**Product owner:** LUMINAiRY champion  
**Evidence date:** 2026-07-26  
**Scope boundary:** This file maps the complete intended result and current
evidence. It does not authorize shared-file edits, editorial admission,
account sync, analytics publication, deployment or public completion.

## Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Arrival/promise/status | Load `/luminairy.html` | Three wing jobs, held/admitted status and local-state boundary are immediately clear | Hero, no-script hold, research status and local-copy present | VERIFIED LOCALLY — public/comprehension proof missing |
| Wing doors | Activate Saints/MAiVENS/Trailblazers door or hash | Exactly one wing opens; state/name/hash/back behavior remains clear | Native buttons, `aria-expanded`, hidden panels and hash listener observed; deterministic suite covers bounded route behavior | VERIFIED LOCALLY — native/manual/public proof missing |
| PATRON SAiNT cards/rules | Browse/flip/select a Saint | Only admitted cultural interpretation, analogy limit and rights-safe attribution appears | Static fail-closed gate covers production blocks; all production claims held | BUILDING — editorial/rights admission required |
| SAiNT anthem control/playlist | Explicit play/pause | Exact rights-cleared admitted track plays with accessible status and readable fallback | LUMINAiRY calls KSVL player/local files; KSVL has separate admission/player evidence | BUILDING — KSVL owner/right/native/public proof required |
| MAiVENS archive tabs | Click/arrow between alcoves | Correct tab/panel selected and announced | Native tab semantics and arrow handling observed | VERIFIED LOCALLY — manual SR/mobile/public proof missing |
| MAiVEN profile card | Activate admitted profile resource | Exact sourced account and verified Read/Watch/Listen/Follow routes remain confined to admitted evidence | 23 exact MAiVEN profiles, images, resource evidence and r5 signed receipts pass locally | VERIFIED LOCAL CANDIDATE — public-origin proof pending |
| TRAiLBLAZER cards | Browse/select | Current, scoped role/account plus why it matters and verified next routes | 7 exact Trailblazer profiles, images, resource evidence and r5 signed receipts pass locally | VERIFIED LOCAL CANDIDATE — public-origin proof pending |
| Claim admission/fail-closed rendering | Page loads claim registry/receipts | Only exact independently admitted envelopes render; mutation/stale/missing authority holds | 43/43 exact profiles validate; all 30 non-Saint receipts bind per-person resource evidence; mutated text/evidence calibration rejects | VERIFIED LOCALLY — exact artifact/public-origin proof pending |
| Source/freshness/correction status | Open admitted/corrected profile | Exact sources, checked dates and correction/retirement status remain reviewable | Six dated evidence batches cover all 30 MAiVENS/Trailblazers; signed recheck dates are enforced; no automated monitor | VERIFIED LOCAL CANDIDATE — recurring monitor remains future work |
| Local guide picks | Choose/change/clear one per wing | Read-verified same-device result in LUMINAiRY and consumer | Keys `laidies_saint`, `laidies_maven`, `laidies_builder`; storage-denial suite passed | VERIFIED LOCALLY at device scope; cross-page removal/public proof missing |
| Local profile-open register | Open admitted MAiVEN | Private same-device opened-here count; never mastery/reward | `laidies_mavens_collected`; corrupt/denied storage behavior covered locally | VERIFIED LOCALLY at device scope; semantics should be rejudged with admitted profiles |
| Resident Card/Closet “Your Luminaries” | Visit `laidies-card.html#covenSection` | Same valid device-local picks, honest empty/removed state, route back to producer | Consumer reads same keys; MAiKEOVER map identifies incomplete propagation contract | BUILD BEFORE LAUNCH — cross-page suite/owner approval |
| Town Hall correction handoff | Activate correction route | Honest service status or verified submission path with affected claim context | Current copy links to preflight route and promises no reply | BUILDING — Town Hall native intake/propagation proof required |
| Learning continuation | Activate exact episode/Library/High/source route | Visitor continues the concept without duplicated or stale teaching | Some page/home/Mall routes exist; no admitted-profile continuation inventory | BUILD BEFORE LAUNCH |
| Analytics/customer evidence | Interact with wing/profile/source/route/failure | Approved privacy-safe event and comprehension evidence | Plausible loads; no LUMINAiRY event contract/pull found | BUILD BEFORE LAUNCH |
| No-JS/network/storage failure | Disable/break dependencies | Navigation and honest held/error state remain usable | No-JS/missing-gate/storage fixtures passed locally | VERIFIED LOCALLY — native/public-origin proof missing |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | Absence of valid LUMINAiRY keys; do not infer person/account | Claim/receipt status and requested hash only | Full three-wing orientation; no prior picks/progress | Open doors/sources; explicit audio; create device-local pick only after action | None assumed | Held/no-JS/source/audio errors preserve route and explanation | PARTIAL LOCAL PASS; newcomer comprehension/native/public missing |
| Returning, no Resident Card | Valid LUMINAiRY keys or same-device route history; no Card/account inference | Three picks, opened-profile register, current claim status | Resume valid local state; surface corrected/removed content; avoid redundant onboarding | Change/clear local picks; open admitted content/audio | Same browser/device and two-tab storage event only | Corrupt/stale/missing values clear or fail visibly; never substitute | BUILDING — transition/removal/two-tab suite incomplete |
| Resident Card — device-local | Shared Resident Card contract proves a valid local envelope only | Same LUMINAiRY keys plus local Card display | “Your Luminaries” consumer can reflect producer state | Same device-local writes only; no ownership/reward | LUMINAiRY ↔ `laidies-card.html` on same origin/device | Storage denial, Card deletion and retired pick must reconcile both surfaces | BUILDING — producer/consumer round trip incomplete |
| Resident Card — verified account-backed | Requires authenticated shared session plus authoritative server profile; not currently proved for LUMINAiRY | None accepted | No special synced experience may be claimed | No account upload/write authorized | None proved across sign-out/device/account | Fall back to truthful device-local state | BLOCKED — BUILD REMAINS REQUIRED if current-release intent is confirmed |

Required transition evidence: clean first visit → return; first/returning →
device-local Card → return; choose → change → clear; valid → corrupt/storage
denied; admitted → corrected/held/retired; same tab → second tab; LUMINAiRY →
Closet → LUMINAiRY; deep link/hash/back; and, only under an approved shared
contract, local Card → account, sign-out, second device, conflict, deletion and
revoke.

## Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Claim candidate | Editorial research cycle | `scripts/validate-luminairy-claims.mjs`; claim-gate loader | None at runtime; offline research process | `content/luminairy-claims.json` exact envelope plus six per-person resource-evidence batches | LUMINAiRY card/profile; affected copied surfaces via correction manifest | Public content state | 43/43 local claims admitted; 30 non-Saint resource bindings complete |
| Editorial admission | Independent editorial review/signing | `content/site/luminairy-claim-gate.js` verifier | Offline P-256 signing authority; no private key in candidate | `content/luminairy-editorial-receipts.json` + pinned public keys | Exact selector-bound LUMINAiRY block | Public content state | 43/43 receipts pass locally; 30 non-Saint r5 receipts renewed; public release pending |
| Freshness/correction/retirement | Editorial owner review or correction trigger | Validator/gate plus future monitor | Missing scheduled source-link/freshness job | Claim record dates/status/receipt invalidation; correction log/manifest missing | LUMINAiRY, episodes, KSVL, homepage/directory, Library/High where repeated | Public content state | Contract specified; recurring job/propagation missing |
| Open wing | Door/hash | Inline wing script | None | URL hash and DOM state; no durable authoritative store | Same route | Session/navigation | Observed; no last-wing persistence contract |
| Selected Saint | Eligible card choose/change/clear | Inline coven picker + `luminairy-v2.js` | None | localStorage `laidies_saint` | LUMINAiRY votive; Resident Card/Closet | Device-local | Locally read-verified; account sync absent |
| Selected MAiVEN | Eligible admitted card choose/change/clear | Same | None | localStorage `laidies_maven` | LUMINAiRY votive; Resident Card/Closet | Device-local | 23 admitted local-candidate profiles; public successor pending |
| Selected Trailblazer | Eligible admitted card choose/change/clear | Same | None | localStorage `laidies_builder` | LUMINAiRY votive; Resident Card/Closet | Device-local | 7 admitted local-candidate profiles; public successor pending |
| Opened MAiVEN register | Admitted modal ready | Inline collect/modal script + `luminairy-v2.js` | None | localStorage `laidies_mavens_collected` array | LUMINAiRY counters only | Device-local | Local behavior exists; not learning/reward/ownership |
| Resident Card validity | MAiKEOVER/Card producer | `resident-card-contract-v1.js`, `resident-card-v2.js` | Shared identity/profile platform | Device-local Card envelope today; server account contract separate | Card/Closet and building consumers | Device-local; account scope unproved | LUMINAiRY does not currently consume Card identity to change rights |
| Anthem track/admission | KSVL catalogue/editorial owner | `content/site/ksvl-player.js`; LUMINAiRY explicit controls | Browser audio + KSVL admission/rights process | KSVL track registry and device-local `laidies_ksvl_player_state_v1` | LUMINAiRY, radio, popup/mini player as approved | Public catalogue + device-local playback | KSVL owns truth; LUMINAiRY-specific handoff not independently complete |
| Correction request/status | Visitor from affected claim | Town Hall feedback modules | Town Hall provider/intake | Town Hall authoritative submission/status record, when verified | Affected LUMINAiRY claim and repeated consumers | Private submission; public content status | Link/status exists; native verified intake/response not proved |
| Analytics event | Visitor interaction | Proposed LUMINAiRY instrumentation | Plausible/shared analytics | Aggregate event store under shared dictionary | Owner dashboard/Control Room only | Aggregate; no profile identity | Base script observed; product events/pull absent |

## End-to-end transaction contracts

### Atomic claim admission

`research trigger → decompose exact claim → select primary/authoritative
evidence → rights/scope/freshness review → independent approval → offline sign
complete envelope → validator → exact artifact → runtime verify → render exact
content/source/status → measure → recheck/correct/retire`

- Authoritative completion: one valid independent receipt matching the entire
  claim/evidence/identity/context/date/correction envelope.
- Idempotency: `claimId` plus envelope hash; duplicate/orphan/ambiguous
  receipts fail closed.
- Mutation/retry: any text, identity, wing, kind, scope, evidence, URL, date or
  status change invalidates admission and requires re-review/signing.
- Failure: missing/unknown/stale/future-dated/mutated records, missing key or
  unavailable gate remain natively held with usable navigation.
- Correction/removal: old receipt invalidated; corrected/retired state shown;
  propagation manifest queues every consumer through Control Room.
- Privacy/security: private signing authority never ships; sources contain no
  visitor data; public content only.
- Accessibility: held state must be exposed in visible and accessible text and
  must not leak hidden prose through names, metadata or no-script.
- Analytics: status/reason class only; never claim prose.

### Device-local guide selection

`discover eligible admitted guide → activate choose/change/clear → validate
current admitted identity → write/remove one wing key → read after write →
render votive/button state → storage event → Card/Closet reads same key →
return/resume → correction/retirement clears or explains`

- Completion: exact read-after-write value matches on LUMINAiRY and
  Card/Closet at same-device scope.
- Duplicate/idempotency: setting the same valid slug is a no-op; each wing has
  one value.
- Failure: denied set/get/remove keeps the smallest proven prior state,
  announces failure and disables unsafe selection/clear controls.
- Conflict: two-tab storage event rerenders; corrupt/unknown/retired slugs must
  not display a false valid person.
- Delete/revoke: local clear removes the matching consumer display; future
  account deletion/revoke requires shared identity handling.
- Privacy: choices stay on device and are not sent in analytics by default.

### KSVL anthem playback

`discover admitted guide anthem → verify KSVL-admitted track and rights state →
explicit play → load/decode → audible/announced status → pause/resume/end →
return to guide → removal/correction invalidates control`

- Completion: exact admitted track begins only after user action and exposes
  textual state; no playback start or ended event is inferred from a click.
- Failure/retry: held, missing, blocked, timeout, decode and network failure do
  not skip/count/auto-advance and preserve the readable guide.
- Ownership: KSVL owns registry, rights, playback and removal; LUMINAiRY owns
  guide context and fallback.
- Privacy/cost: no selected guide identity in analytics by default; browser
  media/network cost only unless a future provider is approved.

### Correction request and propagation

`see affected claim/status → open Town Hall route with safe claim reference →
read service status → consent/submit if available → authoritative receipt or
failure → editorial triage → correct/hold/retire → invalidate receipt →
propagate affected consumers → verify public result`

- Completion: Town Hall authoritative receipt, not button success.
- Duplicate/abuse: provider-owned idempotency, moderation, rate limits,
  privacy/retention and safe error copy are required.
- Response promise: no guaranteed reply.
- Analytics: route open/status only; complaint text is prohibited.

## Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Choose/change/clear Saint | LUMINAiRY votive; Card/Closet Saint slot | `laidies_saint` valid slug | Closet routes to `/luminairy.html#saints` or equivalent admitted route | Same-device storage event/read on navigation | Clear or invalid/retired slug removes authoritative display | Storage denied/corrupt/unknown slug fixture on both pages |
| Choose/change/clear MAiVEN | LUMINAiRY votive; Card/Closet MAiVEN slot | `laidies_maven` valid slug | Exact admitted profile/deep link where supported | Same as above | Held/corrected/retired person cannot retain stale profile authority | Same plus claim-status transition |
| Choose/change/clear Trailblazer | LUMINAiRY votive; Card/Closet Trailblazer slot | `laidies_builder` valid slug | Exact admitted wing/profile route | Same as above | Same | Same |
| Admit/correct/hold/retire claim | LUMINAiRY exact block; homepage/directory, episode, KSVL, Library/High only if they repeat it | claim ID, envelope/status, correction manifest | Exact claim/source/status route | New signed envelope and consumer owner review | Old receipt invalidated; stale copies held/removed | Validator, exact artifact and consumer manifest tests |
| Admit/remove anthem | LUMINAiRY track control; KSVL radio/player | track registry ID, rights/admission status | Guide ↔ KSVL track context | KSVL registry update invalidates cached player state safely | Control held/removed; no stale autoplay | Missing/decode/network/rights-state tests |
| Submit correction | Town Hall; LUMINAiRY editorial queue; affected consumers after decision | safe claim ID + authoritative receipt/status | Return to exact affected claim/status | Editorial decision triggers envelope/manifest update | Privacy deletion removes submission per Town Hall policy, not public correction history | Provider failure/duplicate/moderation evidence |

## Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Atomic production research/admission | Local candidate can drift from evidence or omit a person | Preserve 30-person evidence coverage, renew changed profile/evidence receipts and fail closed | Editorial/Curriculum + AI Accuracy/Trust | LUMINAiRY editorial sub-champion | `content/luminairy-profiles.json`, claims, receipts and six resource-evidence batches | 30/30 evidence, independent semantic/visual review, calibrated validator/browser suite | LOCAL CANDIDATE COMPLETE — exact artifact/public origin pending |
| Freshness/link monitor and correction ledger | Current roles/sources can silently age | Scheduled recheck job, source-link check, correction/consumer manifest and fail-closed expiry | Editorial Systems / Control Room | LUMINAiRY editorial sub-champion | New shared runner/automation and dossier evidence; exact path chosen by Control Room | Synthetic stale/source-down/corrected/retired fixtures plus observed run | BUILD BEFORE LAUNCH |
| Closet producer/consumer reconciliation | Card can display stale/missing/local-only selections as if complete | Versioned selection contract, admitted-roster validation, update/clear/retire propagation; account sync only if approved | Functionality & Platform / Identity / MAiKEOVER | LUMINAiRY champion | `luminairy.html`, `content/site/luminairy-v2.js`, `laidies-card.html`, shared Card contract | First/return/local Card/two-tab/corrupt/retire round-trip suite | BUILD BEFORE LAUNCH |
| Account-backed continuity | No cross-device/sign-out/delete semantics | Shared profile schema/API/RPC, auth rules, local migration/conflict, delete/revoke and two-device reconciliation | Identity & Account owner | LUMINAiRY + MAiKEOVER | Shared identity service/migrations chosen by Control Room; no dossier-local substitute | Two-account/two-device/sign-out/delete/revoke/privacy suite | BLOCKED — BUILD REMAINS REQUIRED if confirmed for current release |
| KSVL LUMINAiRY handoff | Track paths may look playable without exact rights/public proof | Bind guide to admitted KSVL track registry; propagate hold/removal; accessible error/status | KSVL champion | LUMINAiRY champion | KSVL registry/player plus LUMINAiRY controls; shared edits queued | Exact guide→track→return, rights hold, network/decode, keyboard/SR/public-origin proof | BUILD BEFORE LAUNCH |
| Town Hall correction lifecycle | Route exists but submission/receipt/response is not proved | Native intake/provider lifecycle, claim reference, moderation/privacy/retention, editorial queue and status handback | Town Hall champion | LUMINAiRY editorial sub-champion | Town Hall service/modules plus claim/correction dossier; shared edits queued | Submit/duplicate/failure/privacy/triage/propagation/public correction drill | BUILD BEFORE LAUNCH |
| Product analytics and comprehension evidence | Owner cannot measure whether the hall teaches | Approved event dictionary entries, instrumentation, aggregate dashboard/pull, consent/privacy review and newcomer study | Analytics/Customer Evidence guild | LUMINAiRY champion | `event-dictionary.json`, route scripts, analytics service/dashboard; shared edits queued | Event allow-list/once-only/blocker/privacy tests plus representative comprehension rubric | BUILD BEFORE LAUNCH |
| Manual/native/public accessibility | Automated browser pass cannot prove assistive-tech journey | VoiceOver/Safari/native zoom/physical-device and audio-control evidence on exact release | UX/Accessibility + Release | LUMINAiRY champion | Exact release artifact and dated dossier evidence | Named device/browser/AT scenes and public-origin replay | BUILD BEFORE LAUNCH |
| Exact release/public proof | Local candidate may differ from production | Bind commit/artifact hashes, deploy through release authority, verify public route and rollback | Release manager / Control Room | LUMINAiRY champion | Builder manifest, governed hashes, deployment/version record | Source→artifact equality, public hashes, all journeys, rollback drill | BUILD BEFORE LAUNCH |

No “needs backend” row authorizes a local competing ledger. Each shared change
must be queued through Control Room with all affected owners and exact
integration paths resolved there.

## Shared-contract collision check

- **Identity/account/profile/permissions:** current LUMINAiRY preferences are
  localStorage only. Do not write a new account table or infer session identity.
- **Saves/progression/Closet:** “Your Luminaries” is a consumer of three local
  preferences, not proof of ownership, collection, progress or learning.
- **Rewards/economy/ownership/fulfilment:** no current reward producer. Any
  future reward must use the shared authoritative event/economy ledger.
- **Community/moderation:** correction intake belongs to Town Hall; no
  dossier-local form/provider.
- **Content/media admission and freshness:** signed claim envelopes and KSVL
  track admission are separate authorities; neither can approve the other.
- **Analytics/customer evidence:** shared taxonomy and aggregate store only;
  person choice, Card handle, profile-open history and complaint text are
  prohibited by default.
- **Release/build/runtime:** current local tests and rejudges do not prove the
  exact public artifact; total artifact size advisory remains open.

## Verification and approval

The executable acceptance suite is specified in
`build-packet-building-completion-2026-07-26.md`.

- LUMINAiRY owner verifies the complete element inventory, intended result and
  all four visitor scopes.
- Functionality & Platform Director verifies stores/services, shared
  architecture, collisions and producer/consumer round trips.
- Editorial/Curriculum, AI Accuracy/Trust and rights reviewers independently
  admit exact content.
- KSVL, MAiKEOVER/Closet, Town Hall, Identity, Analytics and affected content
  owners verify both sides of their handoffs.
- UX/Accessibility runs manual/native evidence; Release binds source, exact
  artifact, public origin and rollback.
- Portfolio Control Room authorizes and sequences every shared mutation.
