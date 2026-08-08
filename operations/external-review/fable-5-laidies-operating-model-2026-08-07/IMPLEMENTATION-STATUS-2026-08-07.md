# Fable 5 operating-model implementation status

**Evidence time:** 2026-08-08 13:35 PDT
**Work ID:** `WRK-20260807-fable-operating-model-implementation`
**Status:** `IN_PROGRESS_RELEASE_BOUNDARY_HOLD`
**Authority:** internal operating-model implementation evidence only

This record reconciles the actual accepted report at `/Users/alisoneakin/Documents/LAIDIES-Fable5-Review-2026-08-07/FABLE-5-LAIDIES-OPERATING-MODEL-REVIEW.md` (SHA-256 `8110fb16789167b4cbc559a60b9baa9ed03c4a628269855540197f507988abcb`) with the changes implemented after it. `PASS` below means the named local mechanism was calibrated and passed. It does not mean the Library, website, backup migration or public release is complete.

## Implemented and verified locally

| Recommendation | Result | Evidence |
|---|---|---|
| Put enforcement at display, not release | PASS FOR MANAGED ENTRY / OS BYPASS EXPLICIT | `scripts/resolve-review-url.mjs`; `scripts/serve-review-door.mjs`; calibrated tests now name prose, book, page, visual and media. The managed HTTP path rejects raw URLs and stale/held candidates. It cannot prevent a person manually opening a repository `file://` URL outside the managed Door; no claim of OS-level impossibility is made. |
| Validate one exact ordered prose chain | PASS | `scripts/check-prose-quality-admission.mjs`; `scripts/check-content-release-readiness.mjs`; calibrated prose and release tests |
| Make the semantic judge structurally different | PASS LOCAL | `scripts/run-independent-content-judge.mjs` calls isolated Claude/Fable with artifact-first context; the rejected Fundamentals draft received a blind `REJECT` |
| Replace full authority dumps with a Standing Card and retrieval | PASS | `operations/runtime/STANDING-CARD.md`; `scripts/build-standing-card.mjs`; `scripts/query-laidies-context.mjs`; hook guards |
| Reserve real-reader evidence for real people | PASS ENFORCEMENT | Library independent PASS requires three distinct `OBSERVED_HUMAN` participants; no simulated reader can fill those slots |
| Derive status from append-only events | PASS PILOT | `operations/runtime/work-events.jsonl`; `scripts/project-work-events.mjs`; write guard and stale-projection calibration |
| Cap active negative calibration context without deleting learning | PASS | `scripts/build-content-calibration-set.mjs`; active cap 20; overflow remains preserved in the registry |
| Keep owner entry scoped while preserving a full audit | PASS SCOPED | targeted Library entry passes; unknown owner fails; global audit remains separately fail-closed |
| Establish independent recovery evidence before cleanup | PASS FOR BOUNDED INTEGRATION | Git bundle passed; full Restic snapshot `ff1c716b` passed all-pack read and full restore; write-stable snapshot `4a996ba9` passed stable fingerprints, sampled restored-byte comparison and three route checks |
| Protect the default branch | PASS HOSTED | `.githooks/pre-push` blocks direct pushes to `main`; hosted run `31275046939` passed on exact commit `ced956af`; `main` now requires strict `work-truth`, a PR, admin enforcement, and denies force-push/deletion |
| Pilot trusted practitioner/source intake | PASS PILOT | 13-source roster, four evidence-bound signals, three useful owner rulings; recurrence remains parked |
| Capture practical home-life AI as a distinct reader job | SPECIFIED | durable idea-inbox handoff; no premature content commission or public feature |
| Exclude retained history from routine retrieval | PASS | repository ignore boundaries preserve explicit recovery through unrestricted search |
| Cap foreground WIP at two lanes | PASS CONFIGURED | both LAiDIES config layers, the generated AGENTS source and autonomous runtime now cap concurrent lanes at two; only one shared-surface writer is allowed |
| Make task-class budgets executable | PASS | `operations/runtime/task-budgets.json`; `scripts/check-task-budget.mjs`; unknown task classes fail in calibration |
| Enforce work-type WIP, not only thread count | PASS CURRENT | `scripts/check-work-wip-limits.mjs`; one building, one content item, two read-only research lanes, one Ali decision and the stricter two-active-item cap are checked from events; duplicate-building fixture fails |
| Replace prose handoff requirements with one checked artifact shape | PASS ADDITIVE | `operations/runtime/artifact-handoff.schema.json`; `scripts/check-artifact-handoff.mjs`; stale artifact bytes fail. The prose Control Room contract remains until consumer parity. |
| Derive the ten Fable metrics without false zeroes | PASS MECHANISM / COVERAGE INCOMPLETE | `scripts/project-work-metrics.mjs`; incomplete event coverage reports unavailable, never zero; calibrated complete fixture derives first-pass acceptance and cycle time |
| Make the two-week retirement condition executable | PASS CHECKER / CURRENT PARITY FAIL | `scripts/check-work-event-parity.mjs` rejects retirement while any active legacy work ID is absent from the event projection; calibrated fixture passes complete coverage and rejects one missing item |

## Deliberately not called complete

| Item | Truth | Completion trigger |
|---|---|---|
| Full encrypted off-site backup and restore | PASS FOR BOUNDED INTEGRATION | snapshot `ff1c716b`, `check --read-data`, full scratch restore and restored routes passed; write-stable snapshot `4a996ba9` and sampled drill also passed |
| Move the worktree out of iCloud | OPERATING FOUNDATION INTEGRATED — SOURCE STILL PRESERVED | PR #26 merged as `13fafe62`; pre-merge `c096ea51` and fresh post-merge `13fafe62` clean drills passed; individual path disposition still gates old-copy retirement |
| Archive/delete old operating-model material | TIMED PARITY / CONSUMER REPAIR | replacement projection runs for two weeks, live consumers are repaired and full restore proof exists; UNKNOWN never moves |
| Collapse durable roles/dossiers | PILOT, NOT MASS MIGRATED | event projection must first cover 14 active legacy records, then prove parity for two weeks before mirrors retire one consumer group at a time |
| Retire the prose handoff/control contract after migration | TIMED PARITY | the replacement artifact schema and checker now exist; the current Control Room contract remains authoritative until all consumers use the checked shape and event projection runs beside it for two weeks |
| Compress `AGENTS.md`, Working Agreement and Parallel Work | TIMED PARITY | automatic context is already reduced to the Standing Card; source documents stay recoverable until every live consumer is repaired and parity passes |
| Correct or exempt Episode 1 exemplar contradictions | ALI/EPISODE OWNER DECISION | the positive exemplar conflicts with the current title and autocomplete rules; changing public teaching bytes is outside this internal OS task |
| Sitewide style championship and whole-town opening threshold | ALI DECISION | no operating-model implementation can substitute for the named taste and launch-scope rulings |
| Three observed unfamiliar readers | NOT DONE | one exact complete substantial-book render survives orientation, lookup, explain-back and unseen-transfer sessions with three real people |
| Hosted GitHub branch protection | PASS VERIFIED | required PR and strict `work-truth` are active with admin enforcement; force-push and deletion are disabled; the broad integrity suite remains deliberately non-required |
| Practitioner-source recurrence | PARKED | Control Room approves cadence/automation scope; existing AIDB cycle continues independently |
| Internal operating metrics | MECHANISM BUILT / COVERAGE INCOMPLETE | event metrics are derived without false zeroes; nine of ten are currently unavailable because legacy active work has not migrated |
| Plausible or equivalent public outcome analytics | NOT WIRED | after launch only when a bounded trial can change a real decision; no subscription was started |
| Langfuse | NOT ADOPTED | only if the JSONL judge log misses a measured calibration drift |
| R2 artifact/archive migration | NOT STARTED | account/configuration and spend authority, recovery proof and a 5 GB bounded reference-safe pilot |
| Library mobile shelf defect | FAIL / LOCKED | Control Room visual integration owner repairs 120px visible-cover requirement and reruns exact browser/preflight evidence |
| Public release | CONTROLLER IN REVIEW / CURRENT SOURCE BLOCKED | automatic `main:/` deployment is contained; the manual exact-artifact controller is calibrated locally, but the current source fails its curated build on 11 missing/untracked dependencies. Provider variables/environment protection and any artifact-specific deployment remain separately unauthorized |

## Current explicit whole-system failure

`node scripts/check-operational-integrity.mjs` fails on:

1. `WRK-20260802-odc-101-teaching-design` carrying invalid status `RUNNING`;
2. four overdue work-resolution records;
3. Library mobile shelf rows failing the required 120px visible-book dimension.

These are current defects, not implementation success. They remain routed to their owning lanes. The Library visitor-facing lock prevents this operating-model task from modifying the shelf candidate.

The 04:45 PDT completion audit reran every named calibrated mechanism. All 18 local enforcement/configuration checks passed, including `git diff --check`; the explicit whole-system command failed only on the five work-resolution records and the locked 120px Library regression listed above. The repository inventory was refreshed to 65,888 files / 84,333,897,353 bytes with 5,261 `UNKNOWN` paths; `UNKNOWN` remains immovable.

The 05:10 PDT actual-report reconciliation added five missing executable controls and calibrated each with a deliberately bad fixture. The live parity check correctly fails because 14 active legacy work IDs are not yet represented in the append-only event source. That failure prevents the two-week retirement clock from being falsely started. The current metrics projector consequently reports nine metrics unavailable rather than claiming zero performance.

The 13:35 PDT reconciliation closed the first clean integration loop: PR #26 passed required `work-truth`, merged as `13fafe62`, and passed again from a fresh non-iCloud worktree. The merge exposed a separate release-control defect: GitHub Pages was configured to deploy `main:/` automatically to `laidies.ai`. Run `31276827817` was cancelled; live operational paths remained 404. A calibrated required-check repair now blocks further merges until Pages uses workflow-controlled releases. No root-repository auto-publication may be restored.

## Authority truth

No Library page, current visual candidate, book prose, reader, admission manifest, live route or public file was edited. AWS backup and local recovery authority were used. No deploy, publication, purchase, subscription, destructive cleanup, storage migration, public verification or Ali approval authority was used.
