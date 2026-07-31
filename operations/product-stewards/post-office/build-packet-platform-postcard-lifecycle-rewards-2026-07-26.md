# Post Office build packet — Platform postcard lifecycle and reciprocal rewards

**Status:** SPECIFIED — BUILD BEFORE LAUNCH; QUEUED THROUGH FUNCTIONALITY &
PLATFORM DIRECTOR  
**Product owner:** Post Office product champion  
**Platform owner:** `platform-reliability-champion`

## Outcome

- **Complete scope:** authenticated postcard issue, channel handoff,
  accepted/delivered/bounced/unknown, authorized open, recipient claim/join,
  capped sender thank-you, Post Office stamp, Resident Card background,
  reciprocal clips, matching BEST FRIENDS halves, reversal and every consumer.
- **User problem:** today's postcard can prepare a public link but cannot prove
  a private invitation, recipient, delivery/open/join or any reward.
- **Intended outcome:** one low-pressure two-person loop rewards a real
  relationship exactly once and explains every state honestly.
- **Evidence:** D-2026-07-24-006 and D-2026-07-24-008;
  `docs/product/bring-your-people-reward-loops.md`;
  `EXPERIENCE-BRIEF.md`; `FUNCTIONALITY-MAP.md`; existing local share evidence.
- **Scope:** shared identity/invite/delivery/loyalty/economy/ownership services,
  Post Office/recipient experience and complete cross-page proof.
- **Non-goals:** contact upload, address sale, public graph/leaderboard,
  rewards for clicks/page views/share volume, invented amounts, purchased
  clips, paid retries or seventeen separate ledgers.

## Proposed direction

Build one authoritative server-orchestrated vertical pilot:

`verified sender → opaque invite → provider state → authorized recipient open
→ explicit claim/join → immutable reciprocal grant bundle → read-after-write
in Post Office, Resident Card, Town Wallet and Closet → reversal/support`.

Platform owns every shared store, provider adapter and orchestration event.
Post Office owns the counter/receipt experience. Exact clip amounts, caps,
stamp threshold and reward catalogue objects remain shared economy decisions.
No external plugin is proposed; provider/vendor selection, spend and private
data authority require separate approval.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Invitation state machine/schema/RLS | Platform identity/referral/data | Functionality map; identity contract | Platform migrations/service modules | Authoritative identity foundation | QUEUED TO PLATFORM |
| Opaque issue/revoke/status API | Platform backend/security | Invite schema | Platform API/Worker | Auth/RLS, rate limits | QUEUED TO PLATFORM |
| Delivery adapter and verified callbacks | Platform backend/provider | Approved channel/provider | Platform provider adapter/event store | Provider/spend/data authority | BLOCKED — AUTHORITY REQUIRED |
| Privacy-defined authorized-open event | Platform privacy/analytics | Recipient route threat model | Platform event contract | Privacy ruling | QUEUED TO PLATFORM |
| Claim/join qualification orchestration | Platform identity/rewards | Invite + verified distinct accounts | Platform orchestration job | Identity and invite services | QUEUED TO PLATFORM |
| Loyalty/clip/ownership grant bundle | Platform rewards/data | Locked reward layers | Shared ledgers/catalog/ownership service | Platform economy packet | QUEUED TO PLATFORM |
| Reversal/refund/support workflow | Platform rewards/operations | Grant bundle | Shared compensating transaction/service paths | Prior work items | QUEUED TO PLATFORM |
| Sender counter and recipient experience | Post Office frontend/UX | Stable Platform APIs | `/post-office.html`, `/postcard.html` or approved recipient route | Platform contracts | WAITING FOR PLATFORM |
| Wallet/Closet/Card consumers | Affected product owners | Authoritative ledger APIs | `laidies-card.html`, Resident Card/Closet modules | Shared consumer contract | WAITING FOR PLATFORM |
| Controlled two-account/two-device suite | Independent judge | Approved test identities/provider | `operations/product-stewards/post-office/evidence-postcard-lifecycle-2026-07-26/` | Complete staging + cleanup authority | WAITING |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product quality | Sender understands “on its way”; recipient can view/decline/join without coercion; both see a useful next step | Product/UX judge | PENDING |
| Delivery/open/join truth | Provider acceptance, delivery/bounce/unknown, privacy-approved open and verified distinct join remain separate states | Trust/provider judge | PENDING |
| Identity/security/privacy | opaque expiry/revoke tokens, RLS/two-account isolation, no enumeration/contact upload/private analytics, self-invite denied | Security/privacy judge | PENDING |
| Idempotency/partial failure | resend, double click, callback replay, timeout and partial grant create no duplicate value; recovery resumes safely | Data integrity judge | PENDING |
| Reward fulfilment | sender grant, stamp and background appear once; reciprocal clips and matching halves appear for both; balances/ownership reconcile across consumers/devices | Rewards judge | PENDING |
| Reversal/delete | fraud/support/account deletion/revoke produces explicit compensating state everywhere without negative or ghost ownership | Data/operations judge | PENDING |
| Accessibility/native | sender and recipient flows pass mobile, keyboard, focus, announcements, VoiceOver/TalkBack and channel fallback | Accessibility judge | PENDING |
| Exact release/public | source, migrations/services, exact artifact and public origin match; provider callbacks and rollback are observed | Release judge | PENDING |

All non-compensable 17/20 floors must pass. A successful local share or
handoff cannot lend a PASS to any lifecycle/reward gate.

## Integration and release

- **Affected owners:** Platform Reliability, Post Office/Postcards,
  Resident Card/MAiKEOVER, Closet/Town Wallet, Butterfly Clip economy,
  building loyalty, analytics, safety/privacy and release.
- **Collision rule:** no product-local invite, balance, stamp or ownership
  ledger. All shared changes queue through Platform.
- **Exact candidate:** service/migration SHAs, provider config version, site
  SHA and fresh artifact tied to one evidence manifest.
- **Release authority:** Platform/release owners plus provider/spend/private
  data approvals.
- **Rollback:** stop new issues; preserve audit evidence; revoke/expire
  outstanding test invites; compensate/reverse test grants; restore prior
  clients/services; never delete ledgers to hide a failure.
- **Public verification:** two controlled identities on two devices complete
  the full loop and cleanup at the public origin before any lifecycle/reward
  claim is promoted.

## Measurement and learning

- **Baseline:** local compose/share preparation only; no lifecycle or reward.
- **Success/failure signals:** invite issuance, provider-state distribution,
  authorized open, consented claim/join, duplicate/self-invite rejection,
  complete grant-bundle latency, reversals and support; no contact/raw note.
- **Review:** staging acceptance, immediately after controlled public proof and
  24–72 hours after any authorized release.
- **Decision:** accept, repair/rejudge or remain BUILDING/BLOCKED. Additional
  two-person rituals remain parked until this pilot is publicly verified.
- **Handoff rule:** the packet is executable specification. It is not a
  Platform acceptance receipt, implementation, deployment, delivery, join or
  reward.
