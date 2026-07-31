# Control Room handoff — Idea Inbox owner entry

**Date:** 2026-07-26  
**Status:** ACCEPTED — REGISTRY/RUN-QUEUE INTEGRATED; STATUS RECONCILIATION OPEN  
**Sender:** Idea Inbox & Routing Director  
**Recipient:** LAiDIES portfolio orchestrator / Control Room  
**Bound task:** `019f9f81-5da6-73a3-a1aa-0272a93ec821`

## Control Room decision

Control Room admitted `idea-inbox` as a bounded portfolio function and bound it
to task `019f9f81-5da6-73a3-a1aa-0272a93ec821`.

## Accepted registry scope

```json
{
  "id": "idea-inbox",
  "kind": "portfolio_function",
  "name": "Idea Inbox — Capture & Routing",
  "parent_id": null,
  "scope": [
    "unsorted idea capture",
    "canonical reconciliation and deduplication",
    "NOW/NEXT/PARK/MERGE/DECLINE routing receipts"
  ],
  "champion": "idea-inbox-capture-routing-director",
  "owner_task_id": "019f9f81-5da6-73a3-a1aa-0272a93ec821",
  "dossier": "idea-inbox/CHARTER.md",
  "state": "idea-inbox/state.json",
  "initial_deep_dive": "INITIALIZING",
  "launch_status": "OWNER_ENTRY_RECOVERY_ONLY",
  "next_trigger": "COMPLETE_OWNER_ENTRY_AND_CANONICAL_ROUTING_CONTRACT"
}
```

Control Room owns the remaining label reconciliation now that the owner-entry
packet and validators pass.

## Intended ownership and routes

- Owns internal unsorted capture, reconciliation, classification and routing
  receipts.
- Has no public route and creates no public product promise.
- Reads the entire product tree but writes only
  `operations/product-stewards/idea-inbox/**` until a destination owner or
  Control Room accepts a handoff.
- Proposes destination changes; it does not mutate shared canon, portfolio
  priority or product execution by itself.
- Uses `docs/growth/ali-idea-backlog.md` as the existing canonical portfolio
  parking lot rather than creating another general backlog.

## Collision boundaries

- AW-003 and the live Library lane continue unchanged.
- Control Room alone integrates registry, run-queue, active/parallel-work and
  consequential ledger changes.
- Accountable product/building/function owners accept, specify and execute
  routed work.
- Learning System owns educational concept architecture after routing.
- Brand & Experience owns sitewide identity and visual-system decisions.
- Platform & Reliability owns shared identity, economy, data, events,
  infrastructure and analytics dependencies.
- Ali retains mission, taste, public identity and consequential public
  decisions.

## Evidence

- Required dossier files exist and agree.
- The initial legacy backlog reconciliation is in `backlog.md`.
- The append-only receipt mechanism is in `routing-receipts.md`.
- The source and checksum audit is in
  `initialization-audit-2026-07-26.md`.
- Pre-initialization portfolio validation passed at 64 products and one live
  lane. During the audit, Control Room added Learning System and Audience &
  Growth registry rows; the next validator run correctly found that both still
  lacked run-queue entries.
- Targeted `idea-inbox` owner-entry failed only because the registry row does
  not yet exist, which is the requested integration.

## Remaining integration steps

1. Reconcile `INITIALIZING` / `OWNER_ENTRY_RECOVERY_ONLY` to the narrow
   post-initialization state; registration must not imply `RUNNING`.
2. Preserve the canonical backlog path and separately resolve the stale shadow
   backlog after verifying no consumer depends on it.
3. Record any consequential ownership ruling in the ledger through Control
   Room, not through this initialization lane.
