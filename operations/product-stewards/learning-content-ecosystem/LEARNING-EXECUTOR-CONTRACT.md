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

The inactive adapter implements only two ordered states:

1. `SELECTION_PROPOSED` — a locally eligible work order was identified. No owner has
   accepted it.
2. `DISPATCH_RECEIPT_DRAFTED` — a draft receipt was prepared. It is not a dispatch receipt
   and cannot claim work began.
The checked-in state is `DISABLED_UNBOUND`. In that state the runner may prepare only the
first two states. It cannot acknowledge, dispatch, invoke an agent, alter the queue, draft
content, activate a schedule, publish or release anything.

`OWNER_ACKNOWLEDGED`, `DISPATCHED`, `TERMINAL` and `ENABLED_BOUND` are future integration
concepts, not accepted states in this version. The schema, checker and runner all reject
them wherever they appear, including earlier events hidden behind an apparently safe latest
state. A path that exists, an arbitrary file, a matching caller-written owner/lane string or
a temporary automation file cannot establish acknowledgement, performed work or public
verification.

`READY_TO_DISPATCH` in the canonical queue means eligible to assign an owner to producer
preflight. A valid current producer contract is still required before prose drafting.
Preparing a selection or draft receipt does not change either boundary.

## Live integration boundary

Live operation remains absent. Future acknowledgement, dispatch and terminal admission
need a separately designed source of authority that verifies real owner acceptance, lane
identity, performed work and public evidence rather than accepting caller-written claims.
That future activation is a separate integration change. This recovery cannot be enabled
by editing its JSON, creating a temporary automation file or supplying an arbitrary path.

## Executable checks

- `node scripts/check-learning-executor.mjs` validates the inactive checked-in state and
  exact queue binding. `learning-executor-state.schema.json` permits only
  `DISABLED_UNBOUND`; `learning-execution-metadata.schema.json` permits only the two
  preparation states.
- `node scripts/test-learning-executor.mjs` uses temporary fixtures to prove one
  selection-to-draft-receipt transition without changing queue bytes, and rejects stale or
  future events, duplicate active orders, changed queue bindings, wrong owners, missing or
  wrong automation, invalid terminal evidence and unsupported queue schemas.
- `node scripts/run-learning-executor-cycle.mjs --action propose ...` and
  `--action draft-receipt ...` are preparation operations only. The runner refuses any
  invalid pre-state and validates the post-state before replacing the metadata file.
