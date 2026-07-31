# SUNNYVAiLE Post Office experience brief

**Status:** INTENT RECOVERED — OWNER ENTRY READY; OWNER VISUAL AND PLATFORM
REVIEWS PENDING  
**Building owner:** Post Office product champion  
**Brand & Experience Director:** review required  
**Functionality & Platform Director:** review required  
**Recovery trigger:** permanent-owner initialization on 2026-07-26 required
the missing experience authority to cover newsletter, sign-in, postcard,
native share, referral, delivery/open/join, rewards and four visitor scopes.
`ALI CONFIRMED`

This brief governs intended experience. Current pages, code and local tests are
evidence, not proof of external delivery, identity, reward or public behavior.
`LOCKED LEDGER`

## Stable promise and user outcome

The Post Office makes LAiDIES' weekly relationship tangible. At Penny's
counter a visitor can request the Wednesday newsletter, understand the
Resident Card sign-in state, make a personal SUNNYVAiLE postcard and—when the
shared services are complete—follow a private, consent-respecting
send → delivery → open → join → reciprocal-recognition journey.
`APPROVED BRIEF/ARTIFACT` `LOCKED LEDGER`

The successful result is not “a button fired.” The visitor knows which outcome
was prepared locally, which provider or account event completed, what remains
unknown, what she can do next and how to recover without losing her work.
`LOCKED LEDGER`

The building is a useful post office, not a decorative mail room and not a
growth funnel disguised as friendship. It rewards a real relationship, never
share volume, contact upload, page views or pressure. `APPROVED BRIEF/ARTIFACT`
`LOCKED LEDGER`

## Audience and visitor-state jobs

The four required visitor scopes are evaluated separately. A device-local
Resident Card is not sign-in, membership, synced ownership or cross-device
identity. `LOCKED LEDGER`

| Visitor scope | Recognition and arrival | Useful job and primary action | Existing state and prompts | Success, next step and return promise | Current disposition |
|---|---|---|---|---|---|
| First-time visitor | No reliable Post Office, Card or account state; direct, directory or postcard deep-link arrival | Understand the counter's choices, request the newsletter, inspect account status, or choose/write/share a postcard | Show no invented subscription, delivery, account, invite or reward history; explain Buttondown and local/native boundaries before action | Local actions receive exact receipts; provider/account outcomes wait for authoritative evidence; return via the same public routes | Building promise from `APPROVED BRIEF/ARTIFACT`; provider/account claims `BUILD BEFORE LAUNCH` |
| Returning visitor without a Resident Card | Only safe device-local draft/selection or prior route state may be recognized; no identity inference | Resume a local postcard choice/draft where explicitly retained, check a current provider-independent status, or start a fresh request without replaying every newcomer explanation | Never turn a local attempted flag into “subscribed,” “signed in,” “sent” or “joined”; offer correction/retry and direct status routes | Return continuity is “on this device” only; provider state must be refreshed from its authority | `LOCKED LEDGER`; exact retention behavior requires implementation proof |
| Resident Card holder — device-local | A separately valid local Card envelope on this device; not proof of an account | Use the same Post Office jobs with clearer Card/status routing and no repeated account pressure | The local Card may support a useful personalized handback, but cannot unlock account-only invite, reward or cross-device claims | Same-device Post Office and Card continuity only; platform-backed actions remain unavailable until verified | `LOCKED LEDGER`; combined transition proof `BUILD BEFORE LAUNCH` |
| Resident Card holder — verified account-backed | A current accepted auth session plus profile/RLS evidence; never a local Card alone | Manage sign-in state; send or claim an opaque invite; see authoritative delivery/join/reward receipts when those services exist | Withhold duplicate sign-in prompts; show only account-scoped state authorized for this resident; never expose another person's address, note or relationship | Restore on a second device, revoke/delete safely and reconcile invite/reward state from authoritative ledgers | Intended shared outcome `LOCKED LEDGER`; current implementation `BLOCKED — BUILD REMAINS REQUIRED` behind Platform |

Additional material scope: an invited recipient may arrive anonymously,
signed in without a Card, with a device-local Card or as an account-backed
resident. The invite route must reveal only the public card and the minimum
authorized relationship context, then offer a warm, optional join path.
`LOCKED LEDGER`

Required transitions are first visit → return without Card; visitor → create
device-local Card → same-device return; local Card → verified account;
signed-in → signed-out → return; second tab/device; corrupt, expired, revoked
or storage-denied state; newsletter unsubscribe; invite issue → delivery/open
→ accepted/joined → rewarded/reversed; and account deletion/privacy change
propagating to every consumer. `LOCKED LEDGER`

## Place metaphor, feeling and ritual

The visitor enters Penny's legible civic counter with three physical jobs:
newsletter/request window, account-status window and postcard
rack → writing desk → outgoing-mail counter. Published issues may sit in a
clearly labelled archive drawer but must never impersonate newsletter
delivery. `APPROVED BRIEF/ARTIFACT`

The feeling is warm, capable and personal: “Penny can help me send the right
thing and tell me exactly what happened.” It is never bureaucratic, coercive,
VIP-coded or success-shaped when the service is unknown. `APPROVED BRIEF/ARTIFACT`

The primary ritual is
`arrive → choose a counter job → prepare → verify → hand off or complete →
receive an exact receipt → continue/return`. `APPROVED BRIEF/ARTIFACT`

The postcard relationship ritual, once the shared platform exists, is
`choose → write → privately issue → send → recipient opens → recipient
optionally claims/joins → both receive an idempotent reciprocal result`.
`LOCKED LEDGER`

## Complete owned product tree

- `/post-office.html`: building arrival, orientation, three counter choices,
  postcard rack/writing-desk handoff, provider disclosure, held account status
  and published-issue drawer. `CURRENT IMPLEMENTATION OBSERVED`
- `/postcard.html`: postcard catalogue, local note/signature preview, native
  share, text/email handoffs, canonical copy link and truthful local receipts.
  `CURRENT IMPLEMENTATION OBSERVED`
- Newsletter Delivery: Buttondown request, consent, provider result,
  confirmation, unsubscribe, weekly delivery and failure recovery.
  `APPROVED BRIEF/ARTIFACT`
- Magic-link Sign-in: Post Office status/handoff plus Resident Card-owned
  request, callback, session, logout, privacy and two-device lifecycle.
  `APPROVED BRIEF/ARTIFACT`
- Postcards & Referral: local compose/share plus future opaque invitation,
  delivery/open/claim/join and reversal lifecycle. `LOCKED LEDGER`
- Post Office stamp, capped sender thank-you, Resident Card background and
  reciprocal clips/BEST FRIENDS halves: intended rewards owned by the shared
  loyalty, clip, ownership and invitation ledgers. `LOCKED LEDGER`

Shared provider, identity, referral, loyalty, clip and ownership machinery is
consumed by this building but owned and sequenced by the Functionality &
Platform Director. The Post Office may not create competing local ledgers or
account truth. `LOCKED LEDGER`

## Component and object-to-action map

| Object/component | Discoverability and action | State carried | Result and next step | Provenance |
|---|---|---|---|---|
| Penny/counter arrival | Live heading and concise counter explanation | No private state required | Visitor chooses newsletter, account status, postcard or archive | `APPROVED BRIEF/ARTIFACT` |
| Newsletter/request window | Labelled email form with cadence, Buttondown, privacy and unsubscribe disclosure | Email goes only to Buttondown request; local UI may hold an ephemeral attempt | Exact attempted/accepted/confirmation-needed/error receipt; inbox or provider next step | `APPROVED BRIEF/ARTIFACT` |
| Account-status window | Labelled status route, not a decorative “Sign in” promise | Device-local Card and verified session remain distinct | Open/manage Card, request/retry sign-in at the identity-owned surface, or receive honest hold | `LOCKED LEDGER` |
| Postcard rack | Labelled card buttons with selected state | Public admitted postcard ID only | Selected card follows to writing desk | `CURRENT IMPLEMENTATION OBSERVED` |
| Writing desk/proof | Note and optional bounded signature update local preview | Private note/signature remain local/user-controlled | Visitor verifies both sides before choosing a channel | `CURRENT IMPLEMENTATION OBSERVED` |
| Outgoing-mail controls | Native Share, Text, Email and Copy are separately labelled | Public card URL plus user-controlled message text | Prepared/copied/share-sheet status only; provider/app outcome remains unknown | `CURRENT IMPLEMENTATION OBSERVED` `LOCKED LEDGER` |
| Recipient/invite route | Opaque invite deep link when Platform builds it | Minimum authorized card/invite state; never raw email/note/token in analytics | View, decline, continue anonymously or claim/join with explicit consent | `LOCKED LEDGER` |
| Postmark/stamp receipt | Appears only after authoritative qualifying event | Immutable completion ID and loyalty event | One Post Office stamp and next milestone status | `LOCKED LEDGER` |
| Reward receipt | Appears only after authoritative grant/ownership transactions | Invite ID, resident IDs, dedupe and grant IDs | Clips/background/BEST FRIENDS halves delivered to authoritative consumers | `LOCKED LEDGER` |
| Published-issue drawer | Clearly labelled as published web archive | Admitted public episode records only | Open a published issue; no newsletter delivery inference | `CURRENT IMPLEMENTATION OBSERVED` |

No legible control, status, disclosure or instruction is baked into room art;
live HTML owns all meaningful text and states. `LOCKED LEDGER`

## Required content and inventory

The postcard catalogue must contain only admitted public card IDs and existing
approved assets. A selected card, preview, copied URL and recipient route must
all bind to the same canonical ID on the first action. `VERIFIED USER/PRODUCT EVIDENCE`

Newsletter copy must state cadence, Buttondown ownership, privacy and
unsubscribe; account copy must distinguish local Card, request and verified
session; share copy must distinguish prepare/copy/share-sheet closure from
send/delivery/open/join. `LOCKED LEDGER`

Reward copy and objects must remain absent from operable claims until the
authoritative invite, loyalty, clip and ownership ledgers can grant, display,
reverse and reconcile them. The build obligation remains open; temporary
absence is not completion. `LOCKED LEDGER`

## Journeys

- **Newsletter:** orient → consent/disclosure → validate → request →
  provider receipt → confirm if required → Wednesday send/delivery evidence →
  unsubscribe/correction. `APPROVED BRIEF/ARTIFACT`
- **Sign-in:** inspect status → request at identity-owned surface → receive/click
  magic link → callback/session → Card/profile continuation → restore/logout/
  revoke/delete. `APPROVED BRIEF/ARTIFACT`
- **Postcard local:** select → write/sign locally → proof → native share,
  text, email or copy → exact local/browser receipt → retry without loss.
  `CURRENT IMPLEMENTATION OBSERVED`
- **Invitation:** authenticated sender → issue opaque invite → channel handoff
  → provider delivery state → authorized open → recipient consent/claim/join
  → reciprocal ledger grants → visible results → reversal/support.
  `LOCKED LEDGER`
- **Return/resume:** revalidate all provider/account/invite/reward state at its
  authority; use local state only for explicitly device-local continuity.
  `LOCKED LEDGER`
- **Failure:** empty, invalid, blocked, cancelled, offline, timeout,
  duplicate, self-invite, expired, revoked, partial success and provider
  ambiguity produce exact recovery without false completion or lost draft.
  `LOCKED LEDGER`

## Cross-building relationships and handbacks

Resident Card/MAiKEOVER owns account creation, verified profile and session
continuity; the Post Office returns there for identity management and receives
only the minimum status needed for its job. `LOCKED LEDGER`

The Visitor's Centre and homepage may hand visitors to the Post Office but
must describe current newsletter, account and postcard truth. The recipient
journey returns to the Visitor's Centre or an exact invited destination
without forcing account creation. `APPROVED BRIEF/ARTIFACT`

The Closet/Town Wallet consumes only authoritative Post Office stamps,
Butterfly Clip transactions, Resident Card background ownership and BEST
FRIENDS collectibles. A local share action or page visit may not write any of
those outcomes. `LOCKED LEDGER`

## Platform contracts consumed

- Identity/account/profile/permissions: verified Supabase session/profile/RLS
  contract and local-to-account migration. `LOCKED LEDGER`
- Newsletter/provider: Buttondown request, confirmation, subscription,
  unsubscribe, send/delivery and failure receipts. `APPROVED BRIEF/ARTIFACT`
- Referral/postcard/delivery: opaque invite state machine, provider channel
  evidence and privacy-safe recipient route. `LOCKED LEDGER`
- Rewards/economy/ownership: shared append-only clip, loyalty, grant and
  collectible ownership records with idempotency and reversal. `LOCKED LEDGER`
- Analytics/customer evidence: privacy-safe categorical attempt, provider,
  native capability, invite lifecycle and reward events; no email, note,
  handle, contact, token or raw URL. `APPROVED BRIEF/ARTIFACT`
- Release reliability: source, exact-artifact and public-origin binding plus
  rollback and provider cleanup. `LOCKED LEDGER`

## Functionality and cross-page touchpoint map

`FUNCTIONALITY-MAP.md` is the complete transaction/gap authority for this
brief. The experience brief defines what should happen; the map prevents a
source page, provider handoff or consumer count from standing in for the whole
result. `LOCKED LEDGER`

## Brand invariants and building freedoms

Invariants are Penny's warm competence, explicit consent, truthful receipts,
private-by-default sharing, low-pressure friendship, live readable controls,
accessible recovery and no fake account/delivery/reward state.
`APPROVED BRIEF/ARTIFACT` `LOCKED LEDGER`

Building freedoms include counter layout, mail-slot/rack/desk geometry,
postmark/stationery language, celebratory receipts and archive treatment,
subject to the unresolved sitewide visual system and owner review. `INFERENCE`

## Desktop, mobile, accessibility, motion and audio

Desktop and mobile must expose all primary jobs without hotspot hunting.
Card selection, form status, share outcomes, archive recovery and future
invite/reward receipts require native semantics, keyboard operation,
announced status, visible focus, 320/390 px reflow, 200% zoom and reduced
motion. `APPROVED BRIEF/ARTIFACT`

Real Safari/native share, VoiceOver, TalkBack, popup/provider behavior and
mobile email/SMS handoff require device evidence; deterministic browser
substitution cannot grant their PASS. `LOCKED LEDGER`

No ambient audio is required for the core experience. `INFERENCE`

## Launch acceptance scenes

1. A first-time visitor names the counter's choices and completes one local
   postcard path with an exact non-delivery receipt on desktop and mobile.
   `APPROVED BRIEF/ARTIFACT`
2. A returning visitor without a Card resumes only explicitly device-local
   state and is never labelled subscribed, signed in, sent or joined from it.
   `LOCKED LEDGER`
3. A device-local Card holder gets a useful same-device handback without an
   account, membership or sync implication. `LOCKED LEDGER`
4. A verified account-backed resident restores valid Post Office state on a
   second device, signs out/revokes safely and sees only authorized state.
   `LOCKED LEDGER`
5. Buttondown valid, invalid, duplicate, confirmation, unsubscribe, delivery
   and failure states map visible wording to redacted provider evidence.
   `APPROVED BRIEF/ARTIFACT`
6. Magic-link request, receive, callback, expiry, retry, session restoration
   and logout pass with approved disposable identities. `APPROVED BRIEF/ARTIFACT`
7. Safari/native share open, cancel, success ambiguity and fallback paths keep
   the note local and announce the exact result. `LOCKED LEDGER`
8. Two approved accounts complete issue → send → delivery/open → claim/join →
   capped reciprocal grants once, then prove duplicate, self-invite,
   expiry/revoke and reversal behavior across consumers. `LOCKED LEDGER`
9. The exact candidate passes source, fresh artifact and public-origin privacy,
   accessibility, analytics and rollback checks; owner visual review approves
   the real loaded experience. `LOCKED LEDGER`

## Unresolved decisions and non-goals

- Owner visual direction remains unresolved; current Penny/counter imagery is
  implementation evidence, not final visual approval. `UNKNOWN`
- Buttondown configuration, delivery observability and approved test identity
  are not evidenced in this dossier. `UNKNOWN`
- The public recipient route, delivery provider and precise meaning of
  “opened” require Platform specification and privacy review. `UNKNOWN`
- Exact clip quantities, stamp threshold, background and BEST FRIENDS
  fulfilment details require the shared economy/reward contract; no building
  packet may invent them. `LOCKED LEDGER`
- Non-goals are contact upload, inbox scraping, address sale, public
  relationship graphs, rewards for clicks/page views/share volume, paid
  retries, core-learning gates and a Post Office-local account or reward
  ledger. `LOCKED LEDGER`

## Reconciliation and approvals

- Post Office owner authors the complete room, visitor experience, local
  postcard surface and provider-facing copy. `ALI CONFIRMED`
- Brand & Experience Director approves system fit, Penny/counter expression
  and allowed visual variation. `LOCKED LEDGER`
- Functionality & Platform Director owns shared provider, identity,
  invitation, delivery, analytics, reward, ownership and release contracts.
  `ALI CONFIRMED`
- Newsletter Delivery, Resident Card/MAiKEOVER and Postcards/Referral owners
  verify both sides of their handoffs. `APPROVED BRIEF/ARTIFACT`
- Independent judges and Portfolio Control Room bind exact evidence to release;
  a packet or handoff is never delivery. `LOCKED LEDGER`
