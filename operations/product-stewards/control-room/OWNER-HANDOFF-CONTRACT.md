# Control Room owner handoff contract

**Status:** ACTIVE  
**Authority:** Portfolio Control Room  
**Applies to:** Every permanent building, product, system and portfolio-function owner

Owners do not require Ali to inspect their tasks for routine status. Material
status is handed to the Control Room, which verifies it against repository,
test, task-heartbeat, integration-lock, deployment and public-origin evidence.

## Required material handoff

Send a handoff only when one of these changes:

- an admitted artifact, contract or acceptance result exists;
- an intended capability moved between `BUILDING`, `BLOCKED`,
  `INTENTIONAL LATER RELEASE`, deployed or publicly verified states;
- a dependency, collision, incident, false-completion risk or owner decision
  affects another owner or the launch critical path;
- a bounded Ali decision is genuinely ready;
- a recurring obligation completed, failed or became overdue.

Every handoff must include:

1. product/system ID and owner task ID;
2. exact current status using canonical status words;
3. exact bounded action just completed or in progress;
4. evidence timestamp in America/Vancouver and evidence paths/tests/receipts;
5. observed result versus inference or unproved claim;
6. files/services changed and the integration lock held;
7. dependencies consumed and downstream owners affected;
8. acceptance owner and remaining proof;
9. next trigger/action;
10. whether public, deploy, spend or Ali approval authority was used.
11. worktree truth: `NO_REPOSITORY_MUTATION`, `UNCOMMITTED_OWNED`, `COMMITTED`,
    `PUSHED`, `DEPLOYED` or `VERIFIED_PUBLICLY`, plus every changed path and the
    exact commit when applicable.

A completion-level handoff cannot bind `UNCOMMITTED_OWNED` work. Changed work
remains unfinished until its exact owned paths are intentionally committed.
Uncommitted work may be preserved under `HOLD` or `BLOCKED` only when the owner,
reason and next trigger are explicit. Never sweep unrelated dirty paths into a
commit to satisfy this rule.

`RUNNING` additionally requires a live task/turn or heartbeat, an exact current
action, bounded scope and current evidence time under D-2026-07-26-057.

## Routine silence

No-change tasks do not manufacture work. Their standing dossiers and cadence
remain valid, and the Control Room records a scheduled audit receipt. An idle
pinned task is durable ownership, not active execution.

## Admission

A maker's report is evidence, not admission. The named independent acceptance
owner and Control Room must verify the exact candidate. Shared-file or
shared-service changes wait for the relevant integration owner. Local,
committed, pushed, deployed and publicly verified are separate states.

## Executive presentation

Control Room briefs lead with visible product outcomes: pages and journeys,
episode/media production, functioning services and launch state. Incremental
schemas, manifests, validators, fixtures and integration plumbing are backstage
work, not executive progress. Suppress them unless they pass their final
independent gates, block a real visible outcome, cause an incident or require a
genuine Ali decision. Translate surfaced infrastructure into the user job it
protects.

Dossiers, packets, initialization and owner-entry PASS do not count as product
progress. Product progress requires a visible/functional candidate, independent
acceptance, integrated route or exact public proof.

Every audit includes one current table with: `OWNER | ACTIVE/IDLE | LITERAL
WORK NOW | VISIBLE DELIVERABLE | BLOCKER | NEXT ALI DECISION`. Owners without a
real implementation assignment are reported as `IDLE / QUEUED`.
