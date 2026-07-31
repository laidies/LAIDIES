# SUNNYVAiLE Post Office functionality and cross-page touchpoint map

**Status:** FUNCTIONALITY RECOVERED — SOURCE-RECONCILED; BOUNDED LOCAL
POSTCARD/ARCHIVE PROOF ONLY  
**Product/building owner:** Post Office product champion  
**Functionality & Platform Director:** review required  
**Trigger:** D-2026-07-26-053 and permanent-owner initialization require every
visible capability to be traced through producer, authoritative service/store
and all consumers.

This is a contract and gap register. It does not prove Buttondown delivery,
Supabase identity, a recipient lifecycle, rewards, public deployment, native
assistive technology or owner visual approval. `EXPERIENCE-BRIEF.md` and
`OPERATING-SPEC.md` govern the intended result.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Building arrival and counter orientation | Enter `/post-office.html` | Recognize Penny's Post Office and understand newsletter, account status, postcard and archive choices | Four local sections and loaded desktop/mobile evidence; no owner visual verdict | OBSERVED; owner/comprehension proof missing |
| Newsletter request | Submit `#po-newsletter-form` | Exact attempted/provider result, confirmation and recovery | Browser opens Buttondown embed target; invalid and blocked-popup states pass locally | BUILT LOCALLY; provider lifecycle MISSING |
| Newsletter confirmation/delivery/unsubscribe | Complete provider flow or receive Wednesday mail | Provider-backed confirmation, delivery and unsubscribe result | No approved test identity or provider receipts inspected | MISSING |
| Account-status handoff | Activate `#signin`/Resident Card route | Understand local Card versus account status; reach correct identity-owned next step | Post Office holds account intake and links `/resident-card.html`; held route intentionally ships no auth machinery | VERIFIED LOCALLY for hold truth; intended identity journey MISSING |
| Magic-link request/callback/session | Use Resident Card/MAiKEOVER identity flow | Accepted request, callback/session, restoration, logout and privacy controls | Related Supabase code exists in `maikeover.html`; Post Office/Resident Card public paths are not reconciled end to end | OBSERVED/INFERRED; controlled proof MISSING |
| Postcard rack selection | Choose card on `/post-office.html` | Same card ID appears at writing desk | `content/site/post-office.js` passes admitted `?pc=<id>` | VERIFIED LOCALLY |
| Postcard catalogue/deep link | Open `/postcard.html?pc=<id>` | Exact selected card renders; unknown ID safely falls back | Source and artifact first-action binding fixtures pass | VERIFIED LOCALLY |
| Local note/signature proof | Type note/handle | Back preview updates; private text remains out of URL/storage/analytics | Bounded local preview/share-text behavior passes deterministic suite | VERIFIED LOCALLY |
| Native Share | Activate Share on supported device | Share sheet opens/closes; exact ambiguity/cancel result announced | Browser fixtures cover available/cancel/error; real Safari/mobile share not run | VERIFIED LOCALLY in substitution; native proof MISSING |
| SMS/email handoff | Activate Text/Email | User agent receives prepared user-controlled message | `sms:`/`mailto:` links exist with non-delivery copy | BUILT LOCALLY; app/provider send unknown by design |
| Copy canonical postcard link | Activate Copy | Clipboard contains public card URL only; denial exposes selectable fallback | Source/artifact fixtures pass | VERIFIED LOCALLY |
| Public recipient postcard | Recipient opens shared canonical URL | Public selected postcard opens without sender/note/recipient disclosure | Current URL opens composer, not a recipient-specific card or invite | PARTIAL; public postcard only |
| Opaque invite issue | Signed-in sender chooses eligible invite | Server creates private single-purpose invite and visible “on its way” state | No service, schema or UI exists | MISSING |
| Delivery/open lifecycle | Provider accepts/delivers; authorized recipient opens | Distinct accepted/delivered/opened states with uncertainty and privacy limits | No provider or event contract exists | MISSING |
| Claim/join lifecycle | Distinct recipient consents and establishes eligible Card/account | Authoritative accepted/qualified/joined state | BEST FRIENDS code foundation exists elsewhere; no complete two-account transaction proof | MISSING |
| Immediate sender recognition | Eligible invite issued | Capped clips, one Post Office stamp and background ownership delivered once | Canonical direction only; no authoritative ledgers wired | MISSING |
| Reciprocal join reward | Distinct invited friend qualifies | Both receive clips and matching BEST FRIENDS halves once | Canonical direction only; no authoritative ledgers/consumers wired | MISSING |
| Reward reversal/support | Invite invalidated, fraud/self-invite, deletion or grant error | Grants reverse/refund consistently across balances, ownership and UI | No lifecycle exists | MISSING |
| Published-issue archive | Load admitted published episode register | Complete safe collection renders; failure is atomic and retryable | Repair 3 source/fresh-artifact suites pass 101 checks and repeated focus recovery | VERIFIED LOCALLY; public/native proof open |
| Privacy-safe analytics | Perform a meaningful action/result | Safe categorical attempt/result evidence without private payload | Sitewide Plausible/Clarity tags exist; actual payload/masking/provider config not inspected | PARTIAL/INFERRED |
| Owner-approved visual experience | Use loaded desktop/mobile counter/rack/desk | Coherent, legible, specific Post Office experience | Loaded screenshots exist; owner visual ruling absent | MISSING |

## Visitor-state recognition and continuity

No local history, attempted flag or device-local Resident Card authorizes
provider, account, recipient or reward truth.

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No reliable Post Office/Card/account state | Public catalogue/archive and empty local composer | Full orientation; no invented history | Local selection/note; user-initiated Buttondown/native/app handoff | Public routes only | Local/provider/native errors keep work and state exact limits | Local postcard/archive VERIFIED LOCALLY; provider/account `BUILD BEFORE LAUNCH` |
| Returning, no Resident Card | Only valid explicitly device-local Post Office state; no identity inference | Current public content plus admitted local draft/selection if implemented | Resume without replaying full orientation; never show subscribed/sent/joined from local markers | Same local/user-initiated calls only | Same browser/device only | Invalid/stale local state resets with explanation | `BUILD BEFORE LAUNCH`; current durable draft contract not proved |
| Resident Card — device-local | Separately valid local Card envelope; not login | Same local Post Office state plus safe Card route label | Clear same-device Card handback; no account/reward privilege | Local writes only; shared protected calls denied/unavailable | Same device; Card and Post Office stores remain separate | Card absence/corruption falls back without data disclosure | `BUILD BEFORE LAUNCH` combined transition; no account claim |
| Resident Card — verified account-backed | Current accepted auth session plus profile/RLS evidence | Authorized account, invite and ledger state only | Manage status; issue/claim invite; inspect authoritative results | Provider/account/invite/reward calls under shared permissions | Cross-page and second-device via authoritative stores | Expiry/logout/revoke/conflict/deletion fail safe and propagate | `BLOCKED — BUILD REMAINS REQUIRED` behind Platform |

Additional invited-recipient state must distinguish anonymous public viewer,
device-local Card holder, signed-in account without a completed Card, eligible
distinct resident, self-invite, expired/revoked invite and already-qualified
recipient.

| Transition | Current truth | Launch disposition |
|---|---|---|
| First visit → leave → return without Card | Public page reloads; no accepted resume/draft contract | BUILD BEFORE LAUNCH |
| Visitor → create local Card → same-device return | Resident Card is separate and device-local; combined Post Office journey untested | BUILD BEFORE LAUNCH |
| Local Card → verified account | Shared identity migration/reconciliation absent | BLOCKED — BUILD REMAINS REQUIRED behind Platform |
| Signed-in resident → sign out → return | No accepted Post Office account-state suite | BUILD BEFORE LAUNCH after Platform identity |
| Second tab/device | Local selection is page-scoped; account-backed state unproved | BUILD BEFORE LAUNCH |
| Corrupt/storage-denied local state | Postcard does not persist note/handle; broader return state unspecified | BUILD BEFORE LAUNCH for any new persistence |
| Newsletter request → confirm → deliver → unsubscribe | Provider receipts untested | BLOCKED — BUILD REMAINS REQUIRED pending approved provider suite |
| Invite issue → deliver/open → claim/join → reward/reverse | No authoritative lifecycle | BLOCKED — BUILD REMAINS REQUIRED behind Platform |
| Account/Card deletion or privacy change | No invite/reward propagation contract | BLOCKED — BUILD REMAINS REQUIRED behind Platform |

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Newsletter request | `/post-office.html` form submit | Inline Post Office form logic | Buttondown embed/provider | Buttondown subscriber/request record | Post Office status, inbox, Buttondown management | Provider/email identity | Local attempt only; provider unverified |
| Newsletter selection from Resident Card | Historic checkbox/form path | `script.js` | Buttondown | Buttondown record; local `newsletterSubmitted` is non-authoritative | Resident Card/Post Office/provider | Device attempt + provider | Existing path must be reconciled; held Resident Card currently ships no form |
| Auth request/session/profile | Resident Card/MAiKEOVER actions | `script.js`, `maikeover.html` | Supabase Auth/RPC/RLS | Auth session plus authoritative profile rows | Resident Card, MAiKEOVER, future Post Office account status | Account/cross-device | Configured code paths observed; public two-device result unproved |
| Postcard selection | Rack click or `?pc=` | `content/site/post-office.js`, inline postcard script | None | Admitted in-memory public card ID | Post Office rack, postcard composer, copied/shared URL | Page/public URL | VERIFIED LOCALLY |
| Note/signature | Composer input | Inline postcard script | Native Share/user agent only on action | In-memory user-controlled message | Preview and chosen share target | Page/user-controlled | VERIFIED LOCALLY; intentionally not stored |
| Canonical public postcard URL | Copy/share action | Inline postcard script | Clipboard/native/app handoff | Public URL with `pc` only | Recipient browser/composer | Public | VERIFIED LOCALLY for generation |
| Invite record | Future authenticated send event | Platform-owned client adapter | Shared invitation service | `invite_id`, sender/recipient relation, state, expiry, dedupe | Sender status, recipient route, support, analytics | Account/cross-device/private | MISSING |
| Channel delivery event | Provider callback/status | Platform integration | Approved email/SMS/link delivery provider | Provider message ID mapped to invite, accepted/delivered/bounced | Sender status/support/analytics | Private/provider | MISSING |
| Authorized open | Recipient route loads authorized invite | Platform invite client | Invitation service | Privacy-defined open event with invite ID; not raw fingerprint | Recipient route, sender status if policy permits | Private/account or token scope | MISSING |
| Claim/join | Recipient consents and establishes eligible account/Card | Identity + invite integration | Supabase identity/invitation service | Accepted/qualified/joined timestamps and resident IDs | Both residents, Post Office, Wallet/Closet | Account/cross-device | MISSING |
| Post Office stamp | Qualified issue/send event | Shared loyalty adapter | Loyalty ledger | Immutable stamp event/dedupe | Post Office, Town Wallet/Closet | Account/cross-device | MISSING |
| Butterfly Clip grants | Eligible issue and distinct join | Shared economy adapter | Clip transaction ledger | Immutable earn/refund transactions | Post Office receipt, Closet jar, all balances | Account/cross-device | MISSING |
| Background ownership | Eligible initial event | Shared ownership adapter | Reward catalogue/ownership ledger | Offer/grant/ownership IDs | Resident Card/MAiKEOVER/Closet | Account/cross-device | MISSING |
| BEST FRIENDS halves | Distinct qualified join | Shared ownership adapter | Relationship + ownership ledgers | Matching collectible IDs linked to invite/relationship | Both Closets/Cards | Two accounts/cross-device | MISSING |
| Published archive | Page load | `content/site/post-office.js` | Static episode register | `/content/episode-index.json` admitted records | Post Office archive/issue routes | Public | VERIFIED LOCALLY |
| Product analytics | Safe frontend/provider/server events | Shared analytics adapter | Plausible/Clarity plus server event pipeline | Categorical event records without sensitive payload | Champion/Platform evidence | Aggregate/private ops | PARTIAL/MISSING |

## 4. End-to-end transaction contracts

### Newsletter

`discover → disclose cadence/provider/privacy/unsubscribe → validate →
user-initiated request → Buttondown accepts/rejects → confirmation if required
→ subscription active → Wednesday send/delivery result → unsubscribe →
visible recovery/correction`

- Authoritative completion: Buttondown provider state for request,
  confirmation, subscription, send/delivery and unsubscribe, each separately.
- Duplicate/idempotency: provider-controlled for the normalized address;
  browser local markers cannot dedupe or prove state.
- Failure: invalid, popup blocked, provider error, timeout, duplicate,
  confirmation pending, bounced and unsubscribe error retain exact wording and
  a user-initiated retry.
- Privacy: no email/raw response/subscriber state in analytics or local durable
  storage.

### Magic-link identity

`status → request → provider accepts → inbox receives → link callback →
session established → profile/Card continuation → restore/logout/revoke/delete`

- Authoritative completion: Supabase request receipt, then valid auth session;
  profile/RLS completion is a separate receipt.
- Duplicate/rate limit: provider/server controlled; non-enumerating copy.
- Conflict: local Card/account data requires explicit merge/choose/replace
  policy; never silent overwrite.
- Privacy: no email, token, callback hash, session or profile payload in
  analytics/log evidence.

### Local/native postcard

`select admitted card → write/sign locally → preview → choose channel →
prepare public URL + private message → clipboard/native/app handoff →
exact local/browser receipt → cancel/error fallback`

- Authoritative completion: selected state, clipboard success or share-sheet
  resolution only; no recipient outcome.
- Duplicate/idempotency: none needed because no authoritative delivery or
  reward is written.
- Failure: cancel is neutral; clipboard/share/app error exposes safe fallback
  without losing the local message.
- Privacy: `pc` is the only public URL state; no note, handle, contact or raw
  share URL in analytics/storage.

### Invitation, delivery/open/join and rewards

`authenticate sender → authorize eligibility → issue opaque invite →
provider handoff → accepted/delivered/bounced → authorized recipient open →
consent/claim → distinct eligible resident joined → immutable grant bundle →
read-after-write in all consumers → support/revoke/reverse/refund`

- Authoritative completions: invitation service states are
  `issued → accepted_by_provider → delivered|bounced|unknown →
  opened_authorized → claimed → qualified → rewarded|reversed`.
  “Open” requires a privacy-approved definition and cannot mean a generic page
  view.
- Identity/permissions: sender and recipient are distinct verified accounts;
  anonymous viewing cannot grant account rewards.
- Dedupe: one immutable invite completion ID plus ledger-specific idempotency
  keys; self-invite, repeated click, resend and callback replay grant nothing
  twice.
- Partial success: orchestration records each downstream grant and retries
  safely; UI says which results are pending without manufacturing a bundle
  success.
- Reversal: fraud, account deletion, consent withdrawal where applicable and
  support correction propagate compensating/reversal transactions, never
  silent balance edits.
- Privacy/security: opaque tokens, minimum route disclosure, expiry, rotation,
  rate limits, enumeration resistance, RLS, audit trail and no contact upload.
- Accessibility: every lifecycle result has status/focus/recovery semantics.
- Analytics: server-origin lifecycle categories and safe reason codes only;
  no token, address, note, handle, relationship text or raw URL.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Choose postcard | Post Office desk, composer, public URL | Public card ID | `/postcard.html?pc=<id>` | Selection changes all visible/action state immediately | Unknown ID safely falls back | First-action parity fixture |
| Newsletter provider result | Post Office/provider management/inbox | Safe result category and provider timestamp/ID server-side | Provider confirmation/manage route | Confirmation/delivery/unsubscribe refreshes status | Unsubscribe removes active claim | Redacted provider matrix |
| Auth session established | Resident Card/MAiKEOVER/Post Office status | Minimum session/profile status | Approved callback/return route | Restore/logout/profile changes propagate | Revoke/delete clears protected state | Two-browser/device suite |
| Invite issued | Sender Post Office status, recipient route | Opaque invite ID/state | Private opaque route | Delivery/open/claim state advances monotonically | Expiry/revoke makes route fail safely | Two-account lifecycle trace |
| Recipient joins | Both residents, Post Office, Wallet/Closet | Relationship and immutable completion IDs | Exact result/consumer routes | Reward bundle status updates read-after-write | Reversal propagates compensating state | Duplicate/self/retry/reversal suite |
| Clip grant | Post Office receipt, Closet jar, all balances | Transaction/grant ID and amount | Ledger/detail route | Same authoritative balance everywhere | Refund/reversal transaction | Ledger reconciliation |
| Stamp grant | Post Office, Town Wallet | Stamp event/dedupe | Exact Post Office card | Count/milestone updates | Reversal policy explicit | Loyalty ledger trace |
| Background/BEST FRIENDS ownership | Resident Card/Closet for authorized owner(s) | Ownership/grant IDs | Exact collection object | Display metadata can update without changing ownership | Revoke removes/labels across all consumers | Ownership reconciliation |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Buttondown lifecycle evidence | Request may look complete without subscription/delivery truth | Confirm configuration; controlled valid/invalid/duplicate/confirmation/send/delivery/unsubscribe/failure suite; cleanup | Functionality & Platform Director | Newsletter Delivery + Post Office | Buttondown account/config, `/post-office.html`, any approved Worker/adapter, evidence packet | Redacted provider receipts tied to visible wording and exact candidate | BLOCKED — BUILD REMAINS REQUIRED pending approved identity/provider access |
| Reconciled magic-link/account route | Visitor cannot complete/restore verified account from Post Office promise | One identity client/route; request/callback/session/profile/RLS/logout/revoke/local migration | Functionality & Platform Director + Resident Card | Sign-in + Post Office | `resident-card.html`, `maikeover.html`, shared identity modules, Supabase migrations/RLS | Two approved identities, two devices, expiry/retry/conflict/delete suite | BUILD BEFORE LAUNCH |
| Native mobile share/AT proof | Browser fixtures cannot prove actual device behavior | Safari/iOS and representative Android Share, cancel, fallback, VoiceOver/TalkBack, zoom/reflow suite | Platform QA/release | Postcards + Post Office | `/postcard.html`, native browsers/devices, evidence directory | Video/screenshot/log matrix with exact result/focus/privacy | BUILD BEFORE LAUNCH |
| Opaque invitation service | No private sender/recipient relationship or durable lifecycle | Invite schema/API/RLS/token issue/expiry/revoke/status and recipient route | Functionality & Platform Director | Postcards/Referral + Post Office | New Platform service/migration/client adapter; `/postcard.html` or approved recipient route | Two-account issue/open/claim plus hostile/expired/revoke matrix | BUILD BEFORE LAUNCH |
| Delivery/open evidence | “Sent/delivered/opened” cannot be known | Approved delivery provider integration, callback verification, privacy-defined open, bounce/unknown states | Functionality & Platform Director | Postcards/Referral | Provider adapter/webhook/event store | Provider sandbox/controlled receipts with no private payload in dossier | BUILD BEFORE LAUNCH |
| Join qualification orchestration | Page visit or Card creation could be mistaken for a real joined relationship | Bind verified distinct account, invite acceptance and qualification transaction | Functionality & Platform Director + Identity | Postcards/Referral | Identity/invite service, RLS, orchestration job | Duplicate/self/two-account/two-device/rollback proof | BUILD BEFORE LAUNCH |
| Post Office loyalty stamp | No authoritative relationship progress | Shared loyalty programme/action/stamp/milestone records and adapter | Functionality & Platform Director | Post Office | Platform loyalty ledger and Town Wallet consumer | One immutable event appears once in building and Wallet; reversal tested | BUILD BEFORE LAUNCH |
| Clip grants/refunds | No authoritative capped sender or reciprocal balance | Append-only clip transactions, caps, dedupe, grant/refund orchestration | Functionality & Platform Director | Post Office | Platform economy ledger, Closet jar consumers | Same balance/grant history across pages/devices; retry/refund proof | BUILD BEFORE LAUNCH |
| Background/BEST FRIENDS fulfilment | Reward claim could celebrate an object not delivered | Catalogue/ownership/grant records and exact consumer rendering for one/two owners | Functionality & Platform Director | Post Office + Resident Card/Closet | Shared reward catalogue/ownership service and consumer pages | Read-after-write, two-owner match, update/revoke/second-device proof | BUILD BEFORE LAUNCH |
| Product analytics contract | No trustworthy funnel or failure learning; privacy config unknown | Event schema/source authority, provider/server mapping, Clarity masking, payload audit, retention | Functionality & Platform Director | Post Office | Analytics adapter/config/dashboards | Synthetic payload capture proves safe properties and authoritative source labels | BUILD BEFORE LAUNCH |
| Owner visual/comprehension gate | Locally functional page may still be confusing or visually weak | Three evidence-backed directions or focused owner pass; newcomer comprehension; loaded responsive captures | Brand & Experience Director | Post Office | Post Office pages/assets and dossier evidence | Owner ruling plus blind newcomer/mobile/keyboard evidence | BUILD BEFORE LAUNCH |
| Exact public release binding | Local artifact cannot prove `laidies.ai` | Build provenance, scoped commit/artifact, deploy authority, rollback, public-origin rerun | Platform release owner | Post Office | Builder/release manifest/public origin | Same bounded suites plus provider/native/public checks on exact release | BUILD BEFORE LAUNCH |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** consume the Platform/Resident Card
  identity contract; do not revive Post Office-local auth or infer account
  from a local Card.
- **Saves/progression/Closet:** only authoritative owned collectibles,
  stamps and clip transactions propagate; no share attempt writes Closet
  success.
- **Rewards/economy/ownership/fulfilment:** consume shared append-only
  transaction, loyalty and ownership ledgers; exact amounts/catalog objects
  remain Platform-owned.
- **Community/moderation:** no contact upload or public relationship graph;
  abuse/self-invite/support rules belong to shared safety/Platform contracts.
- **Referrals/postcards/newsletter/delivery:** Post Office owns experience and
  copy; Platform owns provider adapters, invite lifecycle and authoritative
  events.
- **Analytics/customer evidence:** frontend attempts and server/provider
  results are source-labelled; sensitive payloads are prohibited.
- **Release/build/runtime:** a build packet, local pass or handoff is not
  deployment or public/provider delivery.

All shared provider, identity, referral, loyalty, clip, ownership, analytics
and release changes queue behind the Functionality & Platform Director.

## 8. Verification and approval

- Post Office owner verifies the complete visible inventory, four visitor
  scopes and intended result.
- Newsletter, Sign-in and Postcards/Referral owners verify their producer and
  consumer edges.
- Functionality & Platform Director verifies shared architecture,
  authoritative stores, provider boundaries, collisions and integration order.
- Independent maker/judge pairs run source and fresh-artifact suites, then
  approved provider/two-account/native/public-origin suites.
- Brand & Experience Director rules the loaded visual experience and blind
  newcomer comprehension.
- Portfolio Control Room binds exact candidate, rollback and public truth.

The Post Office is not functionally complete until every intended capability
is built and every cross-page result passes at its claimed scope. Temporary
held controls prevent false claims but do not close the build obligation.
