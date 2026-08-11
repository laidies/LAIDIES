# Learning System live executor contract

**Status:** ACTIVE — local Codex heartbeat
**Automation:** laidies-learning-system-execution-recovery
**Owner:** Learning System & Concepts with the selected destination owner

## What counts as live

A work-order label or dispatch receipt is not activity. The executor is live only when:

1. the named Codex heartbeat automation is currently ACTIVE;
2. executor-state.json contains a heartbeat no more than 90 minutes old;
3. every active content order names this automation lane and a current checkpoint;
4. the worker is producing the next exact artifact or records an honest terminal disposition; and
5. missed heartbeats become EXECUTION_STALLED instead of remaining active.

The executor may have no active content order after a terminal cycle. That is IDLE_HEALTHY, not failure, when the heartbeat is current and there is no eligible READY_TO_DISPATCH order.

## Cycle

On each hourly heartbeat:

1. run the content work-order and executor checks;
2. reconcile every new AIDB and News Radar handoff since the previous cycle into a content work order or an exact duplicate, quiet, watch or no-build disposition;
3. reconcile the current active order against real artifacts and its checkpoint;
4. if no order is active, select at most one eligible primary order for a free destination owner;
5. create a receipt bound to codex-heartbeat:laidies-learning-system-execution-recovery;
6. execute the next production or owner step, not merely update status;
7. run the applicable calibrated tests;
8. record the heartbeat and exact result with scripts/run-learning-executor-cycle.mjs;
9. commit and push the owned changes.

Content publication and deployment still require their applicable artifact, review, release and public-verification evidence. A quiet or WATCH editorial result is a valid completed cycle when it is source-bound and terminal.

This is a permanent executor, not a temporary recovery monitor. It remains active after a healthy cycle so future signals cannot accumulate as unowned handoffs.
