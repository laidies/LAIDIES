# Learning System live executor contract

**Status:** ACTIVE — local Codex heartbeat, twice daily
**Automation:** laidies-learning-system-execution-recovery
**Owner:** Learning System & Concepts with the selected destination owner

## What counts as live

A work-order label or dispatch receipt is not activity. The executor is live only when:

1. the named Codex heartbeat automation is currently ACTIVE;
2. executor-state.json contains a heartbeat no more than 18 hours old;
3. every active content order names this automation lane and a current checkpoint;
4. the worker is producing the next exact artifact or records an honest terminal disposition; and
5. missed heartbeats become EXECUTION_STALLED instead of remaining active.

The executor may have no active content order after a terminal cycle. That is IDLE_HEALTHY, not failure, when the heartbeat is current and there is no eligible READY_TO_DISPATCH order.

## Cycle

On each 09:30 and 16:30 America/Vancouver heartbeat:

1. run the content work-order and executor checks;
2. reconcile every new AIDB and News Radar handoff since the previous cycle through `SOURCE-REGISTRY.json` and `PUBLICATION-PIPELINES.json` into one or more earned output contributions, an existing-item update/link, or an exact duplicate, quiet, watch or no-fit disposition;
   Every intake dated 2026-08-12 or later must bind a `laidies-source-reconciliation.v1` receipt. When a scout supplies no links, the receipt must preserve named references, check exact aliases and mechanism terms across official/primary, independent-reporting and named-reference tracks, and perform a final recheck before disposition. A credible report that confirms the material claim changes the result to a source-held update or stronger status; it cannot remain unresolved or disappear inside `NO_BUILD_REQUIRED`.
3. for every earned output, bind its publication format, relationship to the shared signal, distinct contribution job, exact source versions, canonical store, template and site destination in the work order;
4. reconcile the current active order against real artifacts and its checkpoint;
5. if no order is active, select at most one eligible primary order for a free destination owner;
6. create a receipt bound to codex-heartbeat:laidies-learning-system-execution-recovery;
7. execute the next production or owner step, not merely update status;
8. run the applicable calibrated tests;
9. record the heartbeat and exact result with scripts/run-learning-executor-cycle.mjs;
10. commit and push the owned changes.

Content publication and deployment still require their applicable artifact, review, release and public-verification evidence. A quiet or WATCH editorial result is a valid completed cycle when it is source-bound and terminal.
One signal may contribute to multiple outputs, including current Breaking/Daily coverage and a broader Big Question, but every output remains independently produced, reviewed, corrected and released.

This is a permanent executor, not a temporary recovery monitor. It remains active after a healthy cycle so future signals cannot accumulate as unowned handoffs.
