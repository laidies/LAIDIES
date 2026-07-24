# Parallel work

**Last reconciled:** 2026-07-24
**Owner:** Codex (traffic control, reconciliation and truthful status)
**Purpose:** let independent backstage work advance without giving Ali several
simultaneous decisions or losing unfinished work in separate chats.

The foreground objective remains in `operations/ACTIVE-WORK.md`. This file
tracks bounded supporting lanes. A lane report is evidence or a candidate
input—not automatic authorization to edit canon, deploy, publish, cancel a
service or change external state.

## Lane contract

Every lane must record:

- one bounded objective and named owner;
- stable inputs and known dependencies;
- read/write authority, including exact disjoint paths if edits are allowed;
- a definition of done and evidence expected;
- a hand-back/integration gate;
- current status and exact next action.

The default for delegated lanes is **read-only**. Agents in the same Codex task
share a filesystem, so two agents editing overlapping files can overwrite or
invalidate each other even when their conversations are separate.

## Safe to parallelize

- read-only research, audits and inventories;
- verification/tests against stable inputs;
- isolated drafts or assets with disjoint output paths;
- independent analysis that returns to one owner for reconciliation.

## Keep sequenced

- overlapping file or canonical-copy edits;
- downstream work built on an unapproved lesson/product decision;
- deploys, merges, migrations, billing/cancellation or authentication changes;
- simultaneous Git/history operations;
- anything whose results cannot be reconciled into one source of truth.

## Current lanes

| Lane | Objective | Authority | Dependency / integration gate | Status | Exact next action |
|---|---|---|---|---|---|
| PW-001 | Audit Episode 5 and the 24-episode arc; propose the lesson boundary, sequence, analogy limits and useful worked example | Read-only; no Episode 5 source edits | Findings must be presented to Ali before substance/canon/script changes | REJECTED AS GATE 1 AUTHORITY | Preserve technical cautions, but do not reuse its unauthorized scope narrowing or “whole industry” exclusion |
| PW-002 | Design the smallest safe NewsStand/deployment repair path from the verified live-status audit | Read-only; no workflow run, deploy, merge or page edit | Implementation waits for foreground integration and an explicit WEDNESDAY + Tribune versus TODAY ruling | REPORT READY | Review `operations/diagnostics/news-repair-plan-2026-07-24.md`; schedule the approved contract + curated deploy repair |
| PW-003 | Inventory locally evidenced subscription/tool dependencies and gaps in the private cost baseline | Read-only/private; no secret values, billing access, cancellation or endpoint calls | Any billing confirmation/change requires Ali; avatar deployment controls require read-only verification before repair | REPORT READY — P0 RISK FOUND | Review `operations/finance/subscription-local-dependency-inventory-2026-07-24.md`; verify deployed avatar source/usage controls without invoking generation |
| PW-004 | Red-team the replacement Episode 5 substance for technical accuracy and analogy boundaries | Read-only; no episode edits | Root must verify and reconcile findings before presenting Gate 1 | REJECTED AS SUFFICIENT GATE | Technical cautions remain useful; the review did not test fidelity to Ali's complete concept or the episode template |
| PW-005 | Red-team the replacement Episode 5 substance for instructional depth, usefulness and sequence | Read-only; no episode edits | Root must verify and reconcile findings before presenting Gate 1 | REJECTED AS SUFFICIENT GATE | The review validated the narrowed receipt assignment instead of the approved fashion-system episode |
| PW-006 | Identify the smallest safe season-map/audio-bible corrections after the Episode 5 ruling | Read-only; no season-source edits | Only approved/verified rows may change; unresolved 24-episode resequencing remains a separate Ali decision | INTEGRATED — SAFE SPINE ONLY | Episode 1/4/5/6 authority warnings corrected; Episode 6 is **Strike a Mode**; rows 7–24 remain unruled |
| PW-007 | Rehydrate the complete Episode 5 fashion-system intent and map it into the locked LAiDIES episode format | May write only `operations/research/episode-05-concept-recovery-2026-07-24.md`; no canon, substance, site, season, art or audio edits | Report returns to AW-001 when the current LIBRAiRY/Visitor's Centre foreground reaches its design ruling; it cannot become Gate 1 or canon by implication | REPORT READY | Integrate the recovered intent, concept map, technical seams and episode beat map when AW-001 returns; then run the blind fidelity gate before Ali sees Gate 1 |

## Reconciliation rule

When a lane returns, Codex records one of:

- **INTEGRATED** — accepted into named foreground/source files and verified;
- **REPORT READY** — useful findings exist, but no implementation is implied;
- **DEFERRED** — preserved with a return trigger;
- **REJECTED** — not adopted, with a reason; or
- **BLOCKED** — missing dependency, owner and next action are explicit.

Only the foreground owner closes the loop. Ali may continue adding ideas at
any time; Codex decides whether each is captured, merged, sequenced or assigned
to a safe lane.
