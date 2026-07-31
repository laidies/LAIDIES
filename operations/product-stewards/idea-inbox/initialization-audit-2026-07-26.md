# Idea Inbox initialization audit

**Date:** 2026-07-26  
**Status:** REPORT READY — NO BACKLOG IDEAS IMPLEMENTED  
**Bound task:** `019f9f81-5da6-73a3-a1aa-0272a93ec821`

## Objective

Audit the existing idea backlog and routing controls, create the bounded inbox
operating record, identify duplicate/stale/ownerless ideas without deleting
them, and prepare the Control Room integration that prevents capture from
silently replacing launch work.

## Sources reconciled

- root and repository `AGENTS.md`;
- `operations/CODEX-WORKING-AGREEMENT.md`;
- `operations/ACTIVE-WORK.md`;
- `operations/PARALLEL-WORK.md`;
- `operations/engine/LEDGER.md`;
- `docs/growth/ali-idea-backlog.md`;
- `operations/product-stewards/CHAMPION-CONTRACT.md`;
- `operations/product-stewards/ORCHESTRATOR.md`;
- `operations/product-stewards/OWNER-ENTRY-CONTRACT.md`;
- `operations/product-stewards/registry.json`;
- `operations/product-stewards/run-queue.json`;
- `operations/product-stewards/BUILDING-EXECUTION-BOARD.md`; and
- prevention rules in BTB-037, BTB-046, BTB-133, BTB-138 and related
  reconciliation records.

## Observed portfolio truth

- `ACTIVE-WORK.md` has one foreground program: AW-003 public-experience proof.
- The run queue reports one live product lane: Library.
- The execution board bound Idea Inbox to this task and initially withheld
  registry admission until a complete owner-entry packet existed.
- At the first preflight the product registry had 64 products and no
  `idea-inbox` row. Control Room accepted the packet during this cycle; the
  final registry has 67 products and a bound `idea-inbox` row.
- The canonical backlog has 14 top-level idea sections after its capture
  protocol and moved-cluster table; 10 July 24 clusters already point to
  durable decisions/specifications.
- The canonical backlog is much richer and newer than the historical shadow at
  `../Website/docs/growth/ali-idea-backlog.md`.

## Canonical versus shadow backlog

| Path | Role | SHA-256 on 2026-07-26 |
|---|---|---|
| `Website-homepage/docs/growth/ali-idea-backlog.md` | Canonical shared idea backlog named by the working agreement | `51d672e42b8bdb6a1141ec5aaa0b0f30818b7b8eace728cf0b273d6335a8f5e8` |
| `Website/docs/growth/ali-idea-backlog.md` | Historical shadow copy; not current authority | `64677cde9edc424b0c55553709801afb4887e31620902e1060878df2b2ac3933` |

The shadow was not deleted or edited. Control Room should first verify that no
workflow consumes it, then mark it historical or archive it recoverably.

## Findings

### Duplicate risk

1. Product Stewardship League is now an active portfolio system, not a new
   backlog initiative.
2. House DJ naturally belongs to the registered `dj-booth` subproduct.
3. Masterclass chapter/class concepts must reconcile the existing Classes
   inventory, especially `basics-projects`.
4. A separate Tour Guide chatbot would duplicate existing tour, Visitor's
   Centre, navigation and Miss Jeeves authority.
5. July 24 clusters already have durable homes.

### Stale/conflicting risk

1. The poll's Issue 2/3 timing is stale.
2. The LinkedIn-heart suggestion predates the open sitewide style ruling and
   later correction that the heart/old wordmark is not assumed authority.
3. Hot Goss/TLDR language cannot replace the four locked NewsStand mastheads.
4. Product Stewardship League automation wording predates the current wired
   weekday heartbeat; analytics pulls remain unwired.
5. The older shadow backlog can reintroduce outdated wording and omit newer
   decisions.

### Owner gaps

1. Pop-culture canon candidates have no exact registry-bound canon owner.
2. Idea Inbox, Learning System and Audience & Growth were concurrently admitted
   as portfolio functions; their registry/run-queue state required a second
   reconciliation check.

## Controls installed in this dossier

- faithful capture before compression;
- mandatory reconciliation against product/decision truth;
- one primary routing recommendation with reasons and triggers;
- owner and dependency mapping;
- append-only routing receipts;
- explicit capture-and-continue default;
- no implementation, priority change or shared-authority mutation by default;
- proposed Control Room registry integration; and
- a bounded legacy backlog reconciliation queue.

## Validation evidence

Before initialization:

```text
PRODUCT STEWARD SYSTEM PASS
products=64
active=1
owner_entry_ready=37/64
```

Targeted preflight correctly failed with `unknown owner-entry product id:
idea-inbox`, proving registry admission had not yet occurred.

During initialization, Control Room concurrently added
`learning-content-ecosystem` and `audience-growth`, increasing the registry to
66 products. The after-check therefore returned:

```text
PRODUCT STEWARD SYSTEM FAIL
- top-level product missing from run queue: learning-content-ecosystem
- top-level product missing from run queue: audience-growth
```

This lane did not repair or overwrite either shared file. Control Room then
completed all three run-queue integrations and admitted Idea Inbox. The final
checks returned:

```text
PRODUCT STEWARD SYSTEM PASS
products=67
active=1
owner_entry_ready=40/67
owner_entry_product=idea-inbox:PASS
```

The sole active product lane remains Library; Idea Inbox is an initializing
portfolio function, not an implementation lane.

## Truth boundary

This cycle created local operating records and recommendations only. Control
Room—not this lane—integrated the registry and run queue. This lane did not
edit the canonical shared backlog, decision ledger, active/parallel work,
product dossiers or public site. It did not implement, publish, research or
promote any backlog idea.
