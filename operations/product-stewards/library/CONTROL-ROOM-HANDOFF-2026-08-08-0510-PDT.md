# Control Room handoff — actual Fable report reconciliation

**Product/system ID:** `library` / `WRK-20260807-fable-operating-model-implementation`
**Owner task ID:** durable Library product owner
**Evidence time:** 2026-08-08 05:10 PDT
**Status:** `IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY`

## Exact action and observed result

Reconciled the actual Fable report at `/Users/alisoneakin/Documents/LAIDIES-Fable5-Review-2026-08-07/FABLE-5-LAIDIES-OPERATING-MODEL-REVIEW.md`, SHA-256 `8110fb16789167b4cbc559a60b9baa9ed03c4a628269855540197f507988abcb`, against the local implementation.

Added and negatively calibrated the missing safe local controls:

- Review Door classes for prose, books, pages, visuals and media;
- one checksum-bound artifact handoff schema/checker;
- the report's eight task-class budgets;
- event-derived work-type WIP limits;
- the ten-metric projector with unavailable-not-zero semantics;
- a legacy/event parity gate that must pass before the two-week retirement clock starts.

All new calibration tests pass. The complete scoped regression suite passes after regenerating the derived work projection. The live parity command correctly fails because 14 active legacy work IDs do not yet exist in the event source. The current metrics projector reports nine metrics unavailable; it does not claim zero.

## Evidence paths and tests

- Exact status map: `operations/external-review/fable-5-laidies-operating-model-2026-08-07/IMPLEMENTATION-STATUS-2026-08-07.md`
- Checked handoff: `operations/product-stewards/library/FABLE-IMPLEMENTATION-HANDOFF-2026-08-08.json`
- Derived state: `operations/runtime/work-events.jsonl`, `operations/runtime/work-current-projection.json`, `operations/runtime/work-metrics.json`
- New checks: `scripts/check-artifact-handoff.mjs`, `scripts/check-task-budget.mjs`, `scripts/check-work-wip-limits.mjs`, `scripts/project-work-metrics.mjs`, `scripts/check-work-event-parity.mjs`
- Passing calibration commands: `node scripts/test-artifact-handoff.mjs`; `node scripts/test-task-budget.mjs`; `node scripts/test-work-wip-limits.mjs`; `node scripts/test-project-work-metrics.mjs`; `node scripts/test-work-event-parity.mjs`; `node scripts/test-resolve-review-url.mjs`; `node scripts/test-serve-review-door.mjs`
- Current passing runtime check: `node scripts/check-work-wip-limits.mjs`
- Current expected failing migration check: `node scripts/check-work-event-parity.mjs` — 14 active legacy IDs missing
- Current expected failing whole-system check: `node scripts/check-operational-integrity.mjs` — invalid historical `RUNNING`, four overdue records, locked Library 120px shelf defect

## Locks, dependencies and downstream owners

The Control Room Library integration/visual lock remains held. No visitor-facing Library artifact was touched.

**Control Room dependency:** migrate the 14 IDs printed by `node scripts/check-work-event-parity.mjs` from the legacy work-resolution authority into append-only events without inventing new status. A passing check begins the two-week parity window. It does not authorize deletion.

**Other remaining dependencies:** three real unfamiliar readers for one complete substantial book; scoped off-site restic destination and credentials; hosted GitHub branch-protection administration; Library visual-lock handback for the 120px cover defect; Ali's public/taste/release decisions.

## Acceptance owner, next trigger and authority truth

**Acceptance owner:** Control Room for operating-model integration; Library plus three observed unfamiliar readers for substantial-book learning; Ali for public voice, taste and release.

**Next trigger:** the 14 active legacy work IDs have event-source equivalents and `node scripts/check-work-event-parity.mjs` passes. Record the first passing timestamp, then measure two continuous weeks before retiring one consumer group.

**Authority used:** no public, deploy, publication, spend, subscription, account-authentication or Ali-approval authority.

**Important boundary:** the managed Review Door prevents raw/unadmitted managed HTTP presentation. It cannot technically prevent a person manually opening repository bytes through an OS `file://` URL.

## Control Room parity migration — 2026-08-08 05:23 PDT

Control Room migrated all 14 active legacy work IDs as append-only `WORK_ADMITTED` snapshots. Every event preserves the exact legacy value in `legacy_status_at_migration`; no `WORK_STARTED`, resolution or normalized replacement status was inferred. This is especially important for the invalid historical `RUNNING` and `STOP_LOSS_ROOT_CAUSE` values: they remain visible historical evidence rather than being silently converted into valid lifecycle truth.

`node scripts/test-work-event-parity.mjs` passes its missing-active negative calibration, and the live `node scripts/check-work-event-parity.mjs` now reports `WORK EVENT PARITY PASS active_legacy=14 projected=15`.

The first passing timestamp and exact source hashes are bound in `operations/runtime/work-event-parity-window.json`. The earliest possible retirement review is 2026-08-22 05:23 PDT. This first PASS authorizes no archive, deletion or consumer retirement; those remain contingent on fourteen continuous days of parity, repaired consumers, full-worktree restore proof and a separate Control Room decision.
