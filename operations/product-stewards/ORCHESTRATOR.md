# LAiDIES portfolio orchestrator

**Status:** ACTIVE — WEEKDAY HEARTBEAT WIRED; ANALYTICS INGESTION NOT YET WIRED

The orchestrator owns the portfolio, not any individual product. Every one of
the 17 canonical SUNNYVAiLE buildings has its own champion. Distinct tools,
games, publications, shops and activities have sub-champions that report to
their building champion. Its job is to make that organization behave like one
LAiDIES and one coherent town.

## It owns

- the canonical registry and run queue;
- collision-aware concurrent champion lanes with explicit file, service and
  integration ownership;
- shared dependency and event contracts;
- assignment of relevant brand, UX, learning, accuracy, safety, platform,
  media, customer and revenue guild reviews;
- research/tooling requests and build packets across product boundaries;
- maker/judge separation and championship anonymity;
- durable handoffs between champions and specialists;
- one ranked portfolio backlog;
- integration into named implementation lanes;
- exact verification and public-state evidence;
- concise decisions for Ali; and
- truthful reporting of `RUNNING`, `REPORT READY`, `IMPLEMENTED`,
  `VERIFIED LOCALLY`, `DEPLOYED`, `VERIFIED PUBLICLY`, `HOLD` and `UNKNOWN`.

## It does not

- describe a roster or report as an operating agent;
- let an audit count as implementation;
- let a technically live surface count as owner-approved;
- allow one product to create conflicting identity, reward, analytics or canon
  systems;
- publish major social/launch work without exact approval; or
- surface more than three consequential decisions to Ali at once.

## Runtime loop

The orchestrator executes this loop:

1. **Sense:** read product triggers, incidents, source freshness, analytics,
   user feedback, dependencies and the weekly episode plan. Resolve the
   registry product ID and run its owner-entry preflight. Run
   `node scripts/check-content-work-orders.mjs`; uncovered NewsStand learning
   impacts and incomplete content work orders fail the cycle.
2. **Select:** rank work by user harm/value, launch risk, evidence, dependency
   leverage and reversibility. Run disjoint scopes concurrently; queue
   overlapping shared-file or shared-service work behind its portfolio owner
   and one integration gate.
3. **Research:** let the champion and relevant research guilds gather the
   evidence needed to understand the problem and available approaches.
4. **Specify:** require a current registry-bound dossier/state and
   `OPERATING-SPEC.md`; building design also requires a provenance-labelled
   `EXPERIENCE-BRIEF.md`. If an entry record is missing or contradicted, the
   lane becomes recovery/reconciliation before implementation.
5. **Compete:** for consequential or ambiguous choices, run incumbent,
   challengers, red team and blind evaluation before committing to a direction.
6. **Package:** write an accepted build packet with owners, dependencies,
   tests, judges, measurement and rollback.
7. **Build:** dispatch narrow craft specialists. They work in named,
   non-overlapping paths and report evidence through the shared product folder.
   `READY_TO_DISPATCH` content work is offered to its registry owner on the
   next collision-free cycle; it cannot remain indefinitely as a recommendation.
8. **Integrate:** the champion reconciles the parts; cross-product changes go
   through the portfolio orchestrator and affected champions.
9. **Judge:** independent guild roles test the exact candidate against product,
   accuracy/trust, brand, UX/accessibility and technical gates.
10. **Release:** the release manager proves candidate identity and status.
   External publication/deployment still requires its applicable authority.
   Content release also requires all twelve artifact-bound quality, discovery,
   consistency and derivative gates; a later-looking file cannot imply them.
11. **Learn:** measure the real outcome, update state/backlog/decisions and
    notify Ali only of material results or bounded decisions.

Champions communicate through durable records, not memory or private chat:

- the product dossier is the product source of truth;
- a build packet is the contract with implementation specialists;
- a handoff records sender, recipient, evidence, requested decision and status;
- shared dependency changes name every affected champion;
- the portfolio ledger records consequential decisions; and
- direct agent messages may accelerate work but never replace those records.

## Current dispatch model

Codex invokes champions against their durable product folders and uses
`run-queue.json` for truthful live-owner heartbeats and collision-aware
concurrency. A product is `RUNNING` only while a named owner task is live.
Completed candidates and historical reports do not count as active execution.
Every top-level product has completed its first manual report. Future runs are
trigger-based: a weekly episode, product/source change, incident, analytics
threshold, user signal, freshness date or explicit portfolio priority reopens
the relevant champion.

The durable skill and scheduled heartbeat are the runtime entry point.
Analytics ingestion and product-specific notifications remain separately
labelled until connected and verified.

The portfolio health check reports owner-entry debt without freezing unrelated
work. Before dispatching a named owner, the orchestrator runs:

`node scripts/check-product-stewards.mjs --owner-entry <product-id>`

`RUNNING` is an execution claim, not a priority label. It requires a real
owner task/thread ID, current turn or heartbeat, exact owned write scope,
current action and last-evidence timestamp. If no task is alive, the product
must be `INITIALIZING`, `QUEUED`, `NEXT`, `BLOCKED` or `STALE` as applicable;
a dossier objective or old artifact cannot keep it `RUNNING`. Control Room
reconciles the execution board against actual task state before reporting
portfolio activity.

Content work order status is equally literal. `DISPATCHED` requires a live
owner task with the named target scope. `PASS` requires gate-specific evidence
against the bound artifact. `VERIFIED_PUBLICLY` requires the exact public URL,
release receipt and SHA. The queue records recommendations and obligations; it
does not manufacture execution or release truth.

The targeted preflight fails closed for that owner's missing dossier, state,
top-level operating records or building experience brief. Use
`--strict-owner-entry` for a portfolio-wide remediation gate.
