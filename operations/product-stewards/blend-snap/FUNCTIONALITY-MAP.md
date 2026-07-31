# Blend & Snap functionality and cross-page touchpoint map

**Status:** SPECIFIED — COMPLETE OWNER INVENTORY; PLATFORM AND AFFECTED-OWNER
SIGN-OFF REQUIRED  
**Product/building owner:** Blend & Snap champion  
**Recovered:** 2026-07-26  
**Scope:** `/blend-snap.html`, Study Pack coordination, Try-On, Trading Cards,
Quiz/episode/reference handoffs and every state they produce or consume

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Café arrival / JoJo | Enter `/blend-snap.html` | Understand “order a verified episode pack menu” within ten seconds | Current hero exists; championship found action hierarchy/mobile crop defects | BUILDING |
| Current Special | Page validates episode index + pack manifest | Exact published episode and component statuses | 90 rendered checks and deterministic validators passed on incumbent | VERIFIED LOCALLY, EXACT CANDIDATE/PUBLIC RECHECK REQUIRED |
| Usual | Drink button on café | Device-local confirmation; optional return recognition | `laidies_bs_usual`; denial tested | VERIFIED LOCALLY, DEVICE ONLY |
| ORDER | Hero/state/menu/mobile native button | In-place receipt for a validated pack | Incumbent controller evidence exists; pickup-rail candidate is isolated maker work | BUILDING |
| Pack receipt | ORDER or past receipt | Jobs, statuses and links only for `available` items | Incumbent bounded pass | VERIFIED LOCALLY, CANDIDATE RECHECK REQUIRED |
| Past packs / Regulars | Past receipt button | Reopen a validated published pack | Current page renders past packs from manifest | OBSERVED / BOUNDED TEST EVIDENCE |
| Study Sheet | Receipt component | Compact episode review | No real Study Sheet route/content | MISSING — BUILD BEFORE LAUNCH IF CURRENT-RELEASE INTENT IS CONFIRMED |
| Try-On | Available receipt link | Episode-specific applied practice, optional local reflection, return/debrief | `/try-on.html`; prior bounded local evidence | VERIFIED LOCALLY AT DEVICE SCOPE |
| Cheat Sheet / printable | Available receipt link | Open/print durable episode reference | Episode 1–4 routes admitted by manifest | OBSERVED; CONTENT/PRINT/PUBLIC OWNER PROOF REQUIRED |
| Trading Cards | Receipt component or `/games/trading-cards.html` | Honest pack opening/collection at proved scope | Episodes 1–3 held; 4 unavailable; route has local/randomized foundations | BLOCKED — BUILD REMAINS REQUIRED FOR APPROVED CARD INTENT |
| Quiz handoff | Available receipt link | Arrive at High to check understanding | Route admitted; Blend & Snap does not consume result | OBSERVED; HIGH OWNER/HANDBACK PROOF REQUIRED |
| Episode fallback | Data failure or receipt | Browse released Episodes without guessed current pack | Visible fallback and retry evidence | VERIFIED LOCALLY |
| Retry | Manifest/index failure | Re-fetch, revalidate and recover without duplicate/cached success | Atomic live status/focus evidence | VERIFIED LOCALLY |
| Noticeboard routes | Secondary café board | Named receiving page only | Eight overlay links observed; receiving outcomes not reverified here | BUILDING |
| Theme song | User presses play | Optional playback/status; no journey dependency | Local MP3 control observed | OBSERVED; MEDIA/A11Y FAILURE PROOF REQUIRED |
| Analytics | Page/order/component/failure | Aggregate product evidence without private content | Proposed only | MISSING — BUILD BEFORE RELEASE MEASUREMENT CLAIM |
| Resident Card/account behavior | Card or auth state present | No current difference or account claim | No product-specific account integration | SPECIFIED NO-OP; VERIFY ABSENCE |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | Absence/invalidity of supported local keys; this is not identity | Validated public episode/pack data only | Full concise orientation; optional usual | Optional local usual and last-opened marker after valid receipt | Routes only | Storage/data failure leaves menu access/fallback useful | BUILDING — controller bounded pass, final experience/human proof absent |
| Returning, no Resident Card | Valid `laidies_bs_usual` and/or `laidies_bs_last_pack` on this device | Same public data plus bounded local values | JoJo may recognize usual or say this browser opened the pack menu | Replace local usual; update last-opened marker | Same-device café only; downstream products own their state | Ignore corrupt/denied state; never block or imply account | BOUNDED LOCAL PASS ON INCUMBENT |
| Resident Card — device-local | A valid local Card envelope, if present; not membership/account proof | No Blend & Snap Card data | No enhanced capability | Same two café-local keys only | No Card/Closet sync | Same clean fallback | SPECIFIED / EXACT ABSENCE TEST REQUIRED |
| Resident Card — verified account-backed | Accepted shared auth/profile state, if present | No Blend & Snap account state | No enhanced current capability | No account write/service | None | Same device-local behavior | HOLD ANY ENHANCEMENT; VERIFY NO FALSE CLAIM |

Transitions to test independently:

- first → usual selection → reload → replace usual → clear/corrupt/deny storage;
- first/returning → device-local Card → same-device return;
- local Card → verified account → sign-out → second tab/device/private context;
- current pack → manifest version/episode change → return without stale
  “caught-up” copy;
- receipt → downstream route → browser back/deep link;
- any failed write must not lend success copy to another key or page.

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Published episode identity | Editorial episode release | Café inline controller | Static content delivery | `content/episode-index.json` | Café, episodes and other weekly surfaces | Public/versioned content | Exists; cross-file disagreement fails closed |
| Pack admission/status | Blend & Snap owner after affected-owner evidence | Café inline controller + validator | Static content delivery | `content/blend-snap-weekly-packs.json` schema 1.0.0; private evidence ledger in dossier | Café receipt and upstream weekly rails | Public status + private steward evidence | Bounded local validator pass; freshness expires |
| Usual | Café drink selection | Café inline controller | None | `localStorage:laidies_bs_usual` | Café only | Device/browser | Bounded local pass; no account authority |
| Last-opened pack | Valid receipt open | Café inline controller | None | `localStorage:laidies_bs_last_pack` | Café return copy | Device/browser | Navigation proxy only |
| Try-On reflection/visit | Try-On save/visit | Try-On controller | None | Try-On-specific local keys documented by its owner | Try-On/debrief where explicitly supported | Device/browser | Separate from café pack history |
| Printable reference | Content owner publishes/adopts asset | Static route/print CSS | Static content delivery | Versioned HTML/source/evidence | Receipt and episode routes | Public content | Admitted per manifest; exact public proof required |
| Quiz result/reward | High assessment completion | High quiz controller | Shared learning/reward contracts as applicable | High-owned state/ledger | High, Report Card/Closet only when proved | Device or account per High evidence | Blend & Snap neither writes nor interprets |
| Trading Card issuance/ownership | Future admitted pack open | Trading Cards frontend | Required server-authoritative issuance/ownership service | Required admitted pack/card registry + append-only ownership events | Trading Cards, Closet, pack status | Account/cross-device if approved | Missing authoritative round trip; current pack entries held |
| Noticeboard destination | Each destination owner | Native café links | None | Canonical route registry + receiving product state | Destination routes | Public navigation | Source links exist; result admission incomplete |
| Theme media | Media owner | Café audio control | Static media delivery | `/content/music/the-laidies-down-at-the-blend-and-snap.mp3` | Café only | Playback session | Observed |
| Product analytics | Café interactions | Future shared analytics adapter | Approved aggregate analytics provider | Shared event contract | Product owner/Control Room | Aggregate, privacy-safe | Not wired |

## 4. End-to-end transaction contracts

### Weekly pack order

`discover → fetch episode index + manifest → validate schemas, freshness,
duplicates and safe routes → require episode agreement → enable ORDER → open
receipt → write last-opened marker best-effort → read visible receipt → allow
only available links → downstream owner receives route → return/revalidate`

- Authoritative completion: visible validated receipt opened; navigation only.
- Duplicate/idempotency: re-opening the same receipt is harmless; local marker
  is replace-only and carries no reward.
- Timeout/offline/partial data: abort after the specified timeout, disable
  ORDER, show one atomic failure, Episodes fallback and Retry.
- Stale/conflict/two-tab: each page load/retry validates current files; no
  cached hard-coded receipt becomes authority.
- Accessibility: loading status is atomic/polite; receipt receives logical
  focus; close returns to the initiating ORDER control; Retry receives focus
  after failure.
- Analytics: `pack_menu_opened` may contain manifest version and episode
  number; no usual, identity or downstream completion.

### Usual

`discover → select native drink button → validate controlled value → best-effort
local write → read after write → announce device-local result → restore on
return → replace or ignore invalid state`

- No backend, account, expiry guarantee or cross-device promise.
- Storage denial/corruption yields a non-blocking truthful message and clean
  menu access.
- Analytics, if added, records selection occurrence only—not drink label.

### Downstream component handoff

`receipt → status is available → safe exact route → component owner validates
its own state → visible component result → component-owned return/debrief`

- Café click is not component completion.
- Held/planned/unavailable has no route or interactive target.
- Route removal or failed owner evidence changes manifest admission before
  release; stale links fail the release gate.
- Component update/correction propagates through owner evidence → private
  ledger → public manifest → café revalidation.

### Trading Card round trip

`admitted pack → authenticated/authorized open if required → server idempotency
key → authoritative card grant/duplicate rule → read-after-write collection →
Trading Cards display → Closet propagation → correction/revoke/trade/refund
propagation`

- This full transaction does not currently exist.
- Required controls: admitted pack/card registry, eligibility, entropy/audit
  policy, replay protection, duplicate behavior, ownership visibility,
  two-tab/device/account conflict, revoke/correction, privacy, abuse/rate limits
  and inaccessible-animation alternative.
- Temporary manifest hold protects visitors but remains
  **BLOCKED — BUILD REMAINS REQUIRED** for approved current intent.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Episode published/corrected/withdrawn | Manifest, café, episode rails | Episode ID/title/route/status | Exact issue route | Reconcile both files and evidence ledger | Remove/hold pack admission and stale routes | Cross-file validators + rendered failure |
| Pack component admitted/status changed | Café receipt and upstream rails | Component ID/job/status/route | Exact component route | Manifest + private evidence updated atomically in release | Route removed and status becomes held/planned/unavailable | Source/artifact/public parity |
| Usual selected/replaced | Café return state | Controlled drink label | Café only | Replace local key | Clear/ignore invalid key | Denied/corrupt storage journey |
| Receipt opened | Café return copy | Episode ID only | Café receipt | Replace marker | Clear/ignore stale marker | Storage denial must not block receipt |
| Try-On reflection saved/changed | Try-On and its explicit debrief only | Local reflection under Try-On contract | Issue-specific Try-On | Try-On owner contract | Local deletion must remove its consumer state | Try-On storage/failure suite |
| Quiz completed/corrected | High and admitted Report Card/reward consumers | High-owned result/event | High route | High/shared ledger | High/shared correction/revoke | Blend & Snap must remain unchanged |
| Trading Card granted/duplicated/revoked | Cards + Closet | Authoritative ownership event | Pack/card deep link | Server event to all consumers | Revoke/correction removes or relabels both | Missing — required controlled suite |
| Notice clicked | Receiving route | Route only | Exact destination | Route owner change triggers re-admission | Remove notice until route/result accepted | Link + receiving-outcome test |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Trading Card authoritative issuance/ownership | Local random state can be mistaken for durable ownership/trading/Closet delivery | Versioned pack/card registry; authenticated idempotent grant API/RPC; append-only ownership events; duplicate, trade, revoke/correction and consumer sync | Identity, Rewards & Connection + Functionality & Platform Director | Trading Cards + Blend & Snap | `games/trading-cards.html`, manifest, future shared schema/API, Closet consumer | Controlled two-account/two-device/replay/duplicate/revoke/Closet round trip | BLOCKED — BUILD REMAINS REQUIRED |
| First real Study Sheet | Pack has no compact-review surface | Learning intake, canonical concept reconciliation, content source/evidence, versioned route and admission record; backend not inherently required | Learning/content system | Study Pack + Blend & Snap | New owner-approved content path; manifest/evidence ledger | Content/learning ≥17/20, accessibility/print/mobile, distinct-job comprehension, source/artifact/public proof | OWNER DECISION REQUIRED, THEN BUILD BEFORE LAUNCH IF CURRENT SCOPE |
| Aggregate analytics | Owner cannot measure comprehension, failure or handoff | Shared event adapter/schema, consent/privacy rules, QA and dashboard | Analytics/platform | Blend & Snap | Future shared analytics module + event dictionary | Event payload/privacy tests; no text/identity leakage; baseline packet | BUILD BEFORE MEASUREMENT CLAIM |
| Account/cross-device café continuity | No cross-device usual or pack history | No work authorized; requires explicit product decision, identity mapping, migration/conflict/delete contract | Identity & Connection | Blend & Snap | UNKNOWN until approved | Two-device/account/sign-out/delete suite | INTENTIONAL NON-GOAL; NOT A COMPLETION GAP |
| Noticeboard receiving-outcome admission | Link may load but fail its advertised job | No generic backend; each destination owner must expose an exact accepted route/result and removal trigger | Control Room + route owners | Blend & Snap | Café links + destination paths | Link, receiving result, failure and return proof per notice | BUILDING |
| Exact release binding | Local evidence cannot prove public experience | Release manifest/hash, deploy binding, source/artifact/public test parity and rollback record | Release/platform | Blend & Snap | Candidate/live files after lock | Exact SHA/artifact/public-origin suite | BUILD BEFORE LAUNCH |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** current café is account-neutral.
  Do not infer identity from local keys or a device-local Card.
- **Saves/progression/Closet:** café markers, Try-On reflection and Trading Card
  ownership are distinct. Never merge them into one “Study Pack progress.”
- **Rewards/economy/ownership/fulfilment:** High owns assessment/reward.
  Trading Cards require the shared authoritative ledger and Closet round trip.
- **Community/moderation:** café links do not prove a community post or debrief.
- **Content/media admission and freshness:** episode index + public pack
  manifest + private evidence ledger must agree; art never owns status.
- **Analytics/customer evidence:** use only shared controlled events and
  aggregate properties.
- **Release/build/runtime:** Control Room must assign a lock before any live
  route/shared asset edit and name all affected champions.

## 8. Verification and approval

- Product owner: inventory and intended result reconciled in this dossier.
- Visitor states: each row and transition needs exact candidate evidence; a
  passing clean browser cannot lend PASS to returning/Card states.
- Functionality & Platform Director: required for Trading Cards, analytics,
  identity/Closet collisions and release architecture.
- Affected owners: Episode, Study Pack, Try-On, Trading Cards, High, printables,
  Closet and each admitted noticeboard destination.
- Independent gates: product/learning, accuracy/trust and LAiDIES brand each
  ≥17/20; separate UX/accessibility, technical/data and visual/media review.
- Release proof: source tests, exact locked artifact tests and public-origin
  tests must identify the same candidate; deployment alone is not proof.
