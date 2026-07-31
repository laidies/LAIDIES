# Build packet — four-state Resident Card and Closet vertical slice

**Status:** SPECIFIED — FRONTEND/LOCAL WORK READY; SHARED BACKEND INTEGRATION
QUEUED THROUGH FUNCTIONALITY & PLATFORM
**Product:** MAiKEOVER → Resident Card → Closet
**Owner:** MAiKEOVER champion
**Shared backend owner:** Functionality & Platform
**Affected owners:** Resident Card; Closet & Progression; Identity, Rewards &
Connection; Safety/Privacy; producer champions for every displayed collection
**Constraint:** consume the existing identity, ownership, rewards and
cross-device packets. Do not define substitutes in MAiKEOVER code.

## Problem and evidence

The local Card envelope has bounded independent proof, but the complete
experience includes four different visitor scopes and two pages. The
returning-without-Card state lacks a canonical recognition contract; the
account-backed state lacks accepted real-account/two-device evidence; and the
Closet displays objects whose producers and shared ledgers are at different
truth levels.

Primary contract: `FUNCTIONALITY-MAP.md`.
Experience contract: `EXPERIENCE-BRIEF.md`.
Shared contracts:

- `../platform-reliability/build-packet-identity-account-profile-cross-device-2026-07-26.md`;
- `../platform-reliability/build-packet-economic-ownership-ledger-2026-07-26.md`;
- `../platform-reliability/functionality-platform-launch-truth-table-2026-07-26.md`.

## Intended outcome

One executable and testable state adapter drives MAiKEOVER arrival, Finish
receipt, reception/account availability and Closet handoff. It gives each of
the four scopes an honest path and consumes authoritative local/shared read
models without allowing one passing scope to lend evidence to another.

## Required interface, not a new backend

Functionality & Platform owns the adapter contract and implementation location.
MAiKEOVER proposes the following consumer shape for reconciliation:

```text
ResidentExperienceState
  scope:
    FIRST_TIME
    RETURNING_WITHOUT_CARD
    DEVICE_LOCAL_CARD
    VERIFIED_ACCOUNT_CARD
  recognitionEvidence:
    localCardEnvelope: absent | valid | corrupt
    allowedReturnSignals: []
    providerSession: absent | verified | expired | error
    profileResult: absent | allowed | denied | error
  persistence:
    card: device | account | both_with_resolution | unavailable
    collections: per-object authoritative source
  capabilities:
    editLocalCard
    openLocalCloset
    claimAccount
    editAccountProfile
    publishCard
    restoreCrossDevice
  heldReasons: typed codes only
```

This is an integration request, not authority to create a second identity or
ownership store. The shared owner may revise the shape while preserving every
observable product state and acceptance case.

## Workstreams and write ownership

| Lane | Owner | Allowed work | Must not do |
|---|---|---|---|
| State contract reconciliation | Functionality & Platform + MAiKEOVER champion | Map four scopes to existing session/profile/local-envelope contracts; name allowed return signals | Infer identity from visit counts, handle text or arbitrary local keys |
| Local envelope and transition adapter | Resident Card frontend maker | Read/write versioned envelope through existing atomic functions; expose typed result | Create account/sync semantics |
| MAiKEOVER page integration | MAiKEOVER frontend maker | Render arrival, capabilities, Finish receipt, held state and Closet route from adapter | Read raw reward rows or define ownership |
| Closet consumer integration | Closet maker | Select correct local/shared read model per object and render source/empty/error truth | Recalculate canonical balances or awards |
| Identity/account implementation | Functionality & Platform | Provider session, profile/handle/RLS, migration/conflict, revoke/delete and cross-device read model | Let MAiKEOVER own schema/session logic |
| Ownership/reward implementation | Functionality & Platform + Identity/Rewards | Entitlement/economic events and admitted consumer read models | Treat display, click or visit as award |
| Privacy/security judgment | Independent Safety/Privacy judge | Two-account field isolation, logs/analytics, revoke/delete/cache behavior | Approve based only on fixtures |
| Accessibility/UX judgment | Independent judge | Four scopes × desktop/mobile × failures | Collapse held/error into disabled unexplained controls |

Write boundaries must be named in the integration handoff before code work.
Shared backend migrations and services remain solely with Functionality &
Platform.

## Four-scope executable scenarios

### 1. First-time visitor

1. Start with no accepted Card envelope/session/return signal.
2. Arrival names local creation and device scope.
3. Create/edit all allowed fields; Finish writes one atomic envelope.
4. Reload MAiKEOVER and open Closet.
5. Prove the same allowed Card fields appear once and unsupported collections
   stay empty/held rather than fabricated.
6. Repeat with blocked storage, quota error and corrupt write.

**Pass:** success appears only after restore succeeds; failure preserves the
previous valid envelope and focuses/announces a recovery action.

### 2. Returning visitor without a Resident Card

1. Seed one explicitly allowed non-identity return signal and no valid Card.
2. Arrival recognizes a return without calling the visitor a resident,
   member, signed-in person or known handle.
3. Show useful continuation from that signal and a concise Card invitation.
4. Test stale, deleted, malformed and storage-denied signals.

**Pass:** the visitor avoids unnecessary first-run repetition while receiving
no unproved identity, membership, ownership or sync claim.

**Blocked contract:** Functionality & Platform must approve the exact allowlist
of return signals and their retention/privacy rules before implementation.

### 3. Device-local Card holder

1. Seed a valid `laidies_resident_card_v1` envelope.
2. Restore the Card in the mirror and explicitly label this device.
3. Edit every visible Closet-owned Card field and save once.
4. Reload both pages; test two tabs and deterministic conflict/last-write rule.
5. Remove/clear the local Card through the accepted control and verify both
   pages stop presenting it.

**Pass:** one allowed envelope is authoritative, edits are atomic, consumers
update exactly once and no account/public/cross-device capability appears.

### 4. Verified account-backed Card holder

1. Use two controlled accounts and two independent devices/contexts.
2. Exercise fresh link, expired link, retry, valid/taken/reserved handle,
   profile persistence and logout/login.
3. Claim or reconcile a pre-existing local Card using the shared conflict
   contract.
4. Verify own/private/public/not-found views and current field allowlist.
5. Change visibility; verify public/cache revocation.
6. Edit from device B; verify device A and both Closet consumers reconcile.
7. Revoke/delete/sign out; verify session, profile and consumer behavior.
8. Repeat relevant operations/replays to prove idempotency.

**Pass:** provider/session/profile/RLS evidence, not UI state, authorizes every
account capability. Private fields never cross accounts. Cross-device claims
are made only for admitted objects and proven conflict behavior.

## Cross-page and ownership scenarios

Run the seven transactions named in `FUNCTIONALITY-MAP.md`. For this packet,
the minimum current-release proof is:

1. MAiKEOVER Card create/edit/fail/reload → matching Closet result;
2. Library save/remove/correction → exact Puffy Board result;
3. admitted Clip grant → one shared balance → Book Fair reserve/spend →
   exact entitlement delivery or automatic refund;
4. Post Office valid join → idempotent two-sided necklace entitlement →
   both authorized Closets;
5. FAiRY grant → reserve/spend/release/refund → consistent Closet/Godmother
   balance;
6. every currently visible collection handles create, duplicate, update,
   correction/removal, empty and failure from its authoritative producer; and
7. local owner, signed-in owner, signed-out return, second device and another
   resident never leak or merge state.

If a producing owner cannot supply an authoritative event/read model, the
current-release item remains BUILDING or BLOCKED — BUILD REMAINS REQUIRED. A
held UI may protect users but does not close the obligation.

## Acceptance gates

- **Product:** every scope has a useful start, authoritative completion,
  visible result and next action.
- **Truth:** exact UI labels match the source/store actually used.
- **Identity/privacy:** real two-account/two-device provider suite passes; no
  name, email, handle, selections, avatar data, invite content, token or raw
  error enters analytics/logs.
- **Ownership/rewards:** grant/reserve/spend/release/refund/correction are
  append-only/idempotent and all consumers use the same admitted read model.
- **Accessibility:** keyboard, focus, announcement, reflow, zoom,
  reduced-motion and error recovery pass for all four scopes.
- **Failure:** offline, denied storage, network timeout, expired session,
  conflict, insufficient balance, failed delivery, retry and duplicate replay
  never resemble success.
- **Release:** exact source commit/artifact, migration/service versions,
  deployment record and public-origin retest are bound.

Maker and judge are separate for frontend, privacy/security, accessibility and
shared backend. Deterministic fixtures may pass the UI gate but cannot pass
real-service or public gates.

## Integration and coordination handoff

The MAiKEOVER champion requests Functionality & Platform to:

1. reconcile `ResidentExperienceState` with its existing identity packet;
2. rule on allowed returning-without-Card signals;
3. expose account/profile/public/cross-device state through one shared adapter;
4. expose entitlements/reward balances only through the economic ownership
   read model;
5. name migration/service paths and exact test fixtures;
6. return a versioned interface plus failure codes; and
7. schedule the controlled service suite under the portfolio orchestrator.

MAiKEOVER will then integrate the page and Closet labels/results without
editing shared schemas or duplicating business logic.

## Release, measurement and rollback

- Release may preserve safe local Card creation while a shared service is
  temporarily held, but the current-release shared obligation remains open.
- Privacy-safe metrics: visitor scope, capability availability, typed result,
  local restore result, Closet handoff result, account transition result and
  error category.
- Rollback must preserve the last valid local envelope and never delete,
  duplicate or downgrade an authoritative account entitlement. Schema/service
  rollback is owned by Functionality & Platform.

## Current verdict

Local/frontend work is ready to dispatch after the room-first winner is
admitted. Returning-without-Card recognition and every account, public,
ownership, reward and cross-device integration remain dependent on
Functionality & Platform. This packet is **SPECIFIED**, not implemented,
verified, deployed or public.
