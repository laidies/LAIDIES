# Delta LAi Nu Sorority House functionality map

**Status:** SPECIFIED — COMPLETE CURRENT INVENTORY; SHARED LIVE CONTRACTS
QUEUED AND HELD  
**As of:** 2026-07-26  
**Owner:** Sorority House building champion  
**Companion authority:** `EXPERIENCE-BRIEF.md`, `OPERATING-SPEC.md` and
`build-packet-building-completion-2026-07-26.md`

Disposition words follow the build-completion policy. A local fixture, visible
frame or displayed count is not an authoritative external outcome.

## Route and component inventory

| Wing / surface | Route or component | Visitor action | Producer → authority/store → consumer | Visible completion / next step | Disposition |
|---|---|---|---|---|---|
| Arrival | `/sorority-house.html` + `#shArrival*` | Enter house | local Card read → browser localStorage only → arrival copy | Honest first-time or device-local welcome; explore wings | VERIFIED LOCALLY, bounded |
| Living Room | `#room-ask-the-room` → `/community/ask-the-room.html` | Ask a useful question | room choice → browser hash; Hyvor frame separately → Hyvor | Provider receipt must own post outcome; return to house | Local navigation PASS; live provider BLOCKED |
| Living Room | `#room-wins` → `/community/wins.html` | Share a concrete win | same boundary as above | Same | Local navigation PASS; live provider BLOCKED |
| Living Room | `#room-chat-room-digest` → `/community/chat-room-digest.html` | Read weekly digest | directory choice → browser hash → static/direct destination | Direct handoff, not a live thread | VERIFIED LOCALLY, bounded; content freshness separate |
| Kitchen | `#room-dear-laidies` → `/community/dear-laidies.html` | Ask/offer non-AI advice | room choice → hash; provider action → Hyvor | Provider receipt/visible state; safe return | Local navigation PASS; live provider BLOCKED |
| Kitchen | `#room-try-on-debrief` → `/community/try-on-debrief.html` | Debrief a Try-On | same | Same | Local navigation PASS; live provider BLOCKED |
| Kitchen | `#room-send-it-energy` → `/community/send-it-energy.html` | Request/offer pre-send encouragement | same | Same | Local navigation PASS; live provider BLOCKED |
| Rec Room | `#room-mix-cd-exchange` → `/community/mix-cd-exchange.html` | Exchange a song suggestion | same | Same; no copyrighted upload implied | Local navigation PASS; live provider BLOCKED |
| Rec Room | `#room-burn-book` → `/community/burn-book.html` | Nominate a useful Y2K reference | same | Same; editorial adoption is separate | Local navigation PASS; live provider BLOCKED |
| Rec Room | `#room-comment-card` → `/community/comment-card.html` | Give product/episode feedback | directory choice → hash → direct destination | Direct handoff and return | VERIFIED LOCALLY, bounded; delivery/triage contract separate |
| Your Room | `#room-closet` → `/laidies-card.html` | Open Closet/Resident Card | directory choice → hash → Identity/Closet consumer | Destination owns state/result | Handoff PASS; shared identity BLOCKED |
| Your Room | `#room-dare-reports` → `/games/girl-talk.html` | Draw/reflect/mark local result | card action → strict `laidies_gt_local_state_v1` → Girl Talk UI | Verified local read-back or explicit not-saved result; draw again | VERIFIED LOCALLY, bounded |
| Provider mount | `content/site/community-room.js` | Load room provider | approved hostname + page ID → Hyvor script/provider → room frame | `ready`, `signed-out`, `held`, `unavailable`, local/unsupported states; not a post receipt | Fixture boundary PASS; real lifecycle BLOCKED |
| Provider policy | `[data-community-state]` | Read privacy/terms/reporting boundary | governed copy + official routes → visitor | LAiDIES privacy, Hyvor privacy/terms/moderation links | VERIFIED LOCALLY; owner policy reconciliation BLOCKED |
| Girl Talk local history | `games/girl-talk.html` | Resume/reset malformed history | local state read/validation → browser localStorage → counts/cards | Valid canonical state or visible malformed reset | VERIFIED LOCALLY; voluntary clear-history UI BUILD BEFORE LAUNCH |
| Building return | hash, Back/Forward and direct fallback | Leave/re-enter room | browser history/hash → house selector | Exact room restored or honest default | VERIFIED LOCALLY |

`/community/laidy-spotlight.html` exists in the repository but is not named by
the Sorority House eleven-room directory or registry route tree. It is
**OUTSIDE CURRENT OWNED PROMISE — OWNER/REGISTRY RECONCILIATION REQUIRED**
before it can be presented as a twelfth room.

## Shared capability lifecycle map

### Community provider and posting

| Lifecycle | Producer | Authority/store | Consumer(s) | Required result | Current truth |
|---|---|---|---|---|---|
| Discover/open | house room control | browser URL/hash | house panel/direct room | exact room purpose and provider boundary | PASS locally |
| Sign in | Hyvor UI | Hyvor session | Hyvor frame | provider-authenticated state only | NOT PROVED |
| Draft | Hyvor UI | provider/client draft behavior | current user | no LAiDIES analytics/content capture | NOT PROVED |
| Submit post/reply | Hyvor UI | Hyvor submission API/store | author, room readers, moderators | authoritative accepted/held/rejected/unknown receipt | BLOCKED — Platform/provider suite |
| Publish/update | Hyvor | Hyvor content store | room readers | exact visibility/revision and accessible status | BLOCKED |
| Duplicate/retry | provider action + stable provider evidence | Hyvor | author/moderator | no optimistic duplicate; reconcile unknown result before retry | BLOCKED |
| Delete/request deletion | author/provider/LAiDIES policy route | Hyvor and any lawful LAiDIES operational record | room, author, moderator, privacy owner | removal/request receipt, propagation, retention truth and failure path | BLOCKED |
| Report | reader/provider flag | Hyvor moderation system + LAiDIES incident route if applicable | provider and named human moderator | visible receipt without guaranteed outcome | BLOCKED |
| Hold/reject/appeal | provider/moderator | provider moderation authority | author/moderator | reason/policy boundary, accessible recovery and appeal route if offered | BLOCKED |
| Incident/escalation | human moderator | approved incident system | on-call/privacy/security/release owners | severity, containment, evidence limits, response and correction | BLOCKED |

The executable provider lifecycle sheet and controlled synthetic test belong
to Platform with Community Moderation. The Sorority House owns room purpose,
decision-point copy, safe return and reconciliation of the real result.

### Identity and visitor state

| State/transition | Recognition authority | Product behavior | Propagation | Disposition |
|---|---|---|---|---|
| First-time | absence of proved state only | explain house and provider boundary | no identity event | PASS locally |
| Return without Card | URL/hash and valid product-local envelope | restore useful local continuity only | same browser/device | PASS locally |
| Device-local Card | validated local Card/handle | optional welcome; never unlock/sign community | no Hyvor propagation | PASS locally |
| Account-backed Resident | verified Supabase session + authoritative Card read | account continuity only after Platform adapter | affected account consumers | BLOCKED — Platform identity packet |
| Hyvor signed-out/authenticated | Hyvor provider state | provider participation state only | provider frame | BLOCKED real proof |
| Device-local → account claim | Platform identity RPC/read-after-write | preserve local bytes until remote proof | Card/Closet/account consumers | BLOCKED |
| Sign-out/revoke/delete | Platform identity and privacy contract | truthful local/account fallback | every affected consumer | BLOCKED |
| Local/account conflict | Platform conflict rule | explicit merge/choose/replace/fail-safe | every affected consumer | BLOCKED |

LAiDIES account identity and Hyvor provider identity remain orthogonal until a
separately approved, privacy-reviewed linking contract exists.

### Girl Talk completion, deletion and rewards

| Action | Producer | Store/authority | Consumer | Completion | Delete/revoke | Reward truth |
|---|---|---|---|---|---|---|
| Draw | game RNG/catalogue | in-memory current card | current page | prompt visibly rendered and focused | leave/draw again | none |
| Mark truth/dare | user honour action | strict local v1 envelope + read-back | Girl Talk counts/result | exact write/read verifies local marker; otherwise explicit not saved | no voluntary clear control yet; malformed data is removed | local collectible marker only |
| Optional room handoff | user opens sanitized-pattern link | browser navigation | selected room | room opened, not post completed | Back/close | none |
| Clear local history | user request | browser localStorage | Girl Talk | empty v1/fresh state after verified removal | authoritative local removal | BUILD BEFORE LAUNCH |
| Future building loyalty | meaningful accepted event | shared economic ownership ledger | Card/Closet/wallet | idempotent grant receipt | revoke/correct ledger event | BLOCKED; no post/visit/volume reward allowed |

## Visitor-state experience and transition matrix

| Scope | Start fixture | Primary journey | Existing state shown | Success/result | Failure and retry | Required evidence |
|---|---|---|---|---|---|---|
| First-time | clean storage, no LAiDIES session, provider not assumed | arrive → choose each wing/room → inspect boundary | none | exact room/handoff | provider unavailable/signed-out; safe return | source, artifact, mobile/keyboard; current bounded PASS |
| Returning, no Card | prior hash and valid/invalid Girl Talk envelope | direct room/Back return; resume private deck | exact local state only | restored hash or verified local marker | corrupt/blocked storage resets or says not saved | current bounded PASS; clear-history still open |
| Device-local Card | valid local Card, no account/provider proof | personalised arrival → room | local handle with explicit scope | same discovery as visitor | storage denial/corrupt Card falls back without privilege | current bounded PASS |
| Verified account Resident | verified account session/Card read; provider state separate | second-device restore/sign-out/revoke/delete → room | only authoritative account fields | account continuity plus separately proved provider interaction | expired link/session, conflict, outage, revoked/deleted state | BLOCKED — Platform identity + provider controlled suite |

Required transitions: clean return; return → create local Card; local Card →
explicit account claim; account sign-out; second tab/device; corrupt/partial/
denied storage; Card update; account deletion/revocation; deep link; and
local/remote conflict. One passing local state cannot lend completion to an
account or provider state.

## Failure and accessibility propagation

| Failure | Visible state | Safe action | Accessibility proof | Status |
|---|---|---|---|---|
| Local preview / unsupported host | provider not contacted | direct route or return | status text, keyboard link, contrast | PASS locally |
| Provider unavailable/load failure | nothing submitted | retry later or return | live status/focus and non-colour cue | fixture PASS; real provider BLOCKED |
| Signed out | sign-in required; no submission claim | provider sign-in or leave | frame-independent explanation | fixture PASS; real provider BLOCKED |
| Held/rejected | not published by implication | provider status/report/appeal if offered | announced state and keyboard recovery | fixture copy PASS; real lifecycle BLOCKED |
| Unknown after submit | unknown, never optimistic success | reconcile provider record before retry | persistent perceivable status | NOT BUILT/PROVED |
| Storage denied | local marker not saved | enable storage/retry or continue privately | atomic result + next control focus | PASS locally |
| Malformed Girl Talk data | ignored/removed, counts zero | start fresh | visible recovery | PASS locally |
| Identity expired/revoked/deleted | no resident/account authority | sign in, recover or continue visitor scope | error focus/status and no lockout from discovery | BLOCKED |
| Report/moderation incident | receipt without guaranteed outcome | safe exit/escalation | keyboard/screen-reader route | BLOCKED |
| 320px/reduced motion/reflow | no clipping; no forced smooth motion | normal navigation | automated proxy | House/prior evidence PASS; fresh 2026-07-26 Girl Talk 320px FAIL — repair/rejudge required; native/physical proof held |

## Privacy-safe analytics

Allowed candidate events use the shared event dictionary:

- `product_viewed` with product ID, route, device class and coarse
  new/returning scope;
- `meaningful_action_started` for room open or Girl Talk draw;
- `meaningful_action_completed` only for browser-restored room selection,
  verified local Girl Talk write or a future provider-supported receipt;
- `meaningful_action_failed` with a coarse failure class; and
- `next_useful_action_opened` with destination product ID.

Never record message/draft text, room content, handle, email, Resident Card
document, provider account ID, moderation details, card prompt, sensitive
context or raw session replay. No product-specific analytics is wired today.

## Dependency queue

| Queue item | Receiving owner | Required output | Product integration gate | Status |
|---|---|---|---|---|
| SH-PLAT-01 controlled Hyvor lifecycle | Platform + backend integration + Community Moderation | provider lifecycle sheet, controlled synthetic sign-in/post/reply/hold/reject/report/delete/error suite and stable outcome contract | Sorority source consumes only admitted provider states/events | QUEUED IN DOSSIER; BLOCKED authority |
| SH-PLAT-02 shared identity | Platform + identity/rewards/data | account-backed Card claim/read/update/sign-out/revoke/delete/second-device contract | arrival may use verified account state without affecting Hyvor authority | QUEUED IN DOSSIER; follows platform identity packet |
| SH-PLAT-03 moderation operations | Platform + Community Moderation + Safety/Privacy | named human owner, rules, triage, incident, escalation, appeal, retention/deletion and audit-safe receipt | decision-point copy and room recovery reviewed against real operations | QUEUED IN DOSSIER; owner/policy required |
| SH-PLAT-04 no-post-volume rewards | Platform economic ledger + Sorority champion | explicit prohibited-source rules and any future meaningful-action grant contract | no room visit/post/share/count can grant status or currency | QUEUED IN DOSSIER; future only |

The detailed handoff is
`platform-handoff-provider-identity-moderation-2026-07-26.md`.

## Verification baseline

- Sorority contract: 62 checks across seven provider rooms.
- Prior browser regression: 138 checks; zero external provider attempts.
- Repair 1 adversarial suite: 391 checks; one required approved-host provider
  attempt intercepted.
- Independent bounded local rejudge: 91/100.
- Fresh 2026-07-26 browser rerun: **FAIL** on Girl Talk 320px horizontal
  overflow; the exact completed-check count is not reported on failure.

These results prove the local boundary candidate, not real provider delivery,
human moderation, account identity, deletion, native accessibility, deployment
or public origin. The fresh 320px failure also blocks reuse of the prior
complete browser PASS for the current working source.
