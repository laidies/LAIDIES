# Learning execution metadata adapter

**Status:** RECOVERED INACTIVE — disabled and unbound
**Owner:** Learning System & Concepts task `019f9f7f-9e4c-72d2-8882-447bcbe01691`
**Canonical queue:** existing v1.1 `content-work-orders.json`; never rewritten by this adapter

## Purpose

This is the bounded current-main successor to the historical v1.2 executor package. It
adds versioned execution metadata beside the canonical 17-order queue so a future live
executor can be integrated without inventing activity or replacing present queue truth.

The historical scheduled worker contract described reconciliation, owner selection,
receipt creation and execution. Its checked-in `run-learning-executor-cycle.mjs` only
recorded a heartbeat and reflected an already-active queue item. That script alone neither
proved nor disproved what the external worker performed. This successor makes the local
adapter's narrower authority explicit and testable.

## States and truth boundary

The adapter uses five ordered states:

1. `SELECTION_PROPOSED` — a locally eligible work order was identified. No owner has
   accepted it.
2. `DISPATCH_RECEIPT_DRAFTED` — a draft receipt was prepared. It is not a dispatch receipt
   and cannot claim work began.
3. `OWNER_ACKNOWLEDGED` — a destination owner supplied separate, path-bound evidence.
4. `DISPATCHED` — a verified live lane accepted the acknowledged scope.
5. `TERMINAL` — a governed terminal disposition has exact evidence.

The checked-in state is `DISABLED_UNBOUND`. In that state the runner may prepare only the
first two states. It cannot acknowledge, dispatch, invoke an agent, alter the queue, draft
content, activate a schedule, publish or release anything.

`READY_TO_DISPATCH` in the canonical queue means eligible to assign an owner to producer
preflight. A valid current producer contract is still required before prose drafting.
Preparing a selection or draft receipt does not change either boundary.

## Live integration boundary

Live operation remains absent. Before `OWNER_ACKNOWLEDGED` or `DISPATCHED` can validate,
the state must be deliberately changed to `ENABLED_BOUND` by the responsible integration
owner and must name a real current automation, lane and target task. The checker then
requires the exact automation file to be an active heartbeat with the same target task and
requires acknowledgement evidence, queue identity and one-active-order discipline.

That future activation is a separate integration change. This recovery does not create an
automation, bind a lane, schedule a heartbeat or claim autonomous execution.

## Executable checks

- `node scripts/check-learning-executor.mjs` validates the inactive checked-in state and
  exact queue binding.
- `node scripts/test-learning-executor.mjs` uses temporary fixtures to prove one
  selection-to-draft-receipt transition without changing queue bytes, and rejects stale or
  future events, duplicate active orders, changed queue bindings, wrong owners, missing or
  wrong automation, invalid terminal evidence and unsupported queue schemas.
- `node scripts/run-learning-executor-cycle.mjs --action propose ...` and
  `--action draft-receipt ...` are preparation operations only. The runner refuses any
  invalid pre-state and validates the post-state before replacing the metadata file.
