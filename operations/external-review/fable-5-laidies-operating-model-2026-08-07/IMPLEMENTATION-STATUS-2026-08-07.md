# Fable 5 operating-model implementation status

**Evidence time:** 2026-08-08 22:20 PDT
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
| Make the two-week retirement condition executable | PASS CHECKER / OBSERVATION WINDOW ACTIVE | `scripts/check-work-event-parity.mjs` passes current ID coverage; `operations/runtime/work-event-parity-window.json` started the continuous observation window at 2026-08-08T09:58:12-07:00 and forbids retirement review before 2026-08-22T09:58:12-07:00 |
| Convert the dirty tree into exact recovery review packages | PASS MECHANISM / NO CLEANUP AUTHORITY | `scripts/plan-repository-recovery-packages.mjs` groups all dirty inventory rows by product or operating domain and keeps unknown, historical and generated material fail-closed; inventory calibration now also proves launch snapshots and campaign assets remain generated output rather than false source candidates |

## Deliberately not called complete

| Item | Truth | Completion trigger |
|---|---|---|
| Full encrypted off-site backup and restore | PASS FOR BOUNDED INTEGRATION | snapshot `ff1c716b`, `check --read-data`, full scratch restore and restored routes passed; write-stable snapshot `4a996ba9` and sampled drill also passed |
| Move the worktree out of iCloud | TWO STANDALONE CLONES PASS — SOURCE STILL PRESERVED | `/Users/alisoneakin/Projects/laidies` and `/Users/alisoneakin/Projects/laidies-drill-2` have separate local `.git` databases, exact recovery commit `f921e1c1`, clean tracked state and full CI PASS. The second clone reproduced the exact ten-path curated-build hold. Independent storage is proven; exact path disposition plus timed parity/consumer gates still prevent old-copy retirement. |
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
| Public release | CONTROLLER IN DRAFT PR / CURRENT SOURCE BLOCKED | automatic `main:/` deployment is contained; the manual exact-artifact controller is merged and calibrated, but draft PR #29 remains unmerged and the current source fails its curated build on ten missing/untracked dependencies. Provider variables/environment protection and any artifact-specific deployment remain separately unauthorized. |

## Current explicit whole-system hold

Full `npm run ci` passes at exact recovery commit
`2def7439a267d8b67b4a043a669a15acb5e65316`; both standalone clones repeat that
PASS at `f921e1c1f08156f6ad81fec585c7d6afcffd247a`. This is mechanical operating
integrity, not content or release approval.

The curated public builder still fails closed on ten paths: eight absent Book
Fair images, one unadmitted Closet hero and one absent DJ Sunnyv portrait.
Those are current source defects owned by the relevant product lanes. The
Library visitor-facing lock prevents this operating-model task from substituting
new or unreviewed imagery.

The 15:52 PDT clean-baseline reconciliation compared 2,651 actionable dirty
paths against `/Users/alisoneakin/Projects/laidies` by exact SHA-256 without
mutating either tree. Twenty-one tracked paths differ and 2,630 paths are absent
from the clean branch; none already match. This rules out a bulk “already
integrated” cleanup. Exact owner/package review remains the next recovery lane.

The 04:45 PDT completion audit reran every named calibrated mechanism. All 18 local enforcement/configuration checks passed, including `git diff --check`; the explicit whole-system command failed only on the five work-resolution records and the locked 120px Library regression listed above. The repository inventory was refreshed to 65,888 files / 84,333,897,353 bytes with 5,261 `UNKNOWN` paths; `UNKNOWN` remains immovable.

The 05:10 PDT actual-report reconciliation added five missing executable controls and calibrated each with a deliberately bad fixture. Legacy IDs were subsequently admitted as explicit migration snapshots without inventing lifecycle history. Current parity passes (`active_legacy=14`, `projected=16`), and the observation window now forbids retirement review before 2026-08-22T09:58:12-07:00. The metrics projector continues to report unavailable measures where event coverage cannot support a value rather than claiming false zeroes.

The 21:42 PDT storage-recovery continuation converted the 9,792-path dirty inventory into 353 bounded review packages. It did not call any path junk or safe to delete: 4,299 unknowns remain immovable, 32 historical/rejected paths remain preserved behind archive gates and 2,810 generated/ignored paths stay out of Git. The queue makes product-by-product recovery possible without bulk staging the shared tree.

The 22:20 PDT classifier correction removed a false source signal from the queue. Exactly 908 files under `operations/launch/*/local-public-artifact/` and 282 campaign asset files are generated outputs, not source candidates. The refreshed queue now keeps 4,000 generated/ignored paths out of Git, routes 1,457 paths for review and identifies four exact baseline matches. No file was moved, deleted, staged or published.

The 13:35 PDT reconciliation closed the first clean integration loop: PR #26 passed required `work-truth`, merged as `13fafe62`, and passed again from a fresh non-iCloud worktree. The merge exposed a separate release-control defect: GitHub Pages was configured to deploy `main:/` automatically to `laidies.ai`. Run `31276827817` was cancelled; live operational paths remained 404. A calibrated required-check repair now blocks further merges until Pages uses workflow-controlled releases. No root-repository auto-publication may be restored.

The 15:20 PDT recovery continuation created the first genuinely standalone
non-iCloud clone at `/Users/alisoneakin/Projects/laidies`. Unlike the earlier
linked worktrees, its Git object database is local to that clone. Exact commit
`f921e1c1f08156f6ad81fec585c7d6afcffd247a` passes the full calibrated CI suite.
At 15:38 PDT a second fresh clone at `/Users/alisoneakin/Projects/laidies-drill-2`
independently passed the same suite and reproduced the exact ten-path curated
builder hold. The original iCloud source remains preserved because exact path
dispositions and the timed parity/consumer gates are still required.

## Authority truth

No Library page, current visual candidate, book prose, reader, admission manifest, live route or public file was edited. AWS backup and local recovery authority were used. No deploy, publication, purchase, subscription, destructive cleanup, storage migration, public verification or Ali approval authority was used.
