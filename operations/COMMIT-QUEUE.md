# LAiDIES commit queue

**Status:** standing operational register
**Last reconciled:** 2026-07-30
**Branch:** `homepage-redesign`
**Remote relationship at reconciliation:** one local commit ahead of
`origin/homepage-redesign`; nothing in this queue is public by implication.

## Purpose

This register separates work that merely exists in the shared tree from work
that is safe to preserve, review, push, integrate and release. Conversation
history and a dirty working tree are not storage systems.

The fixed project status words remain authoritative. The Git columns below
describe preservation state only:

- **COMMIT READY** — the exact package boundary is known, its required checks
  pass, and it can be committed without absorbing unrelated work.
- **COMMITTED** — the exact package is durably preserved in a named commit.
- **PUSH READY** — the commit is safe to send to its named remote branch. This
  does not mean approved, integrated, deployed or public.
- **NOT READY** — the package is still changing, has failed a gate, or has not
  been reconciled against newer source/release evidence.

## Current packages

| Package | Product status | Exact scope | Git state | Evidence / blocker | Next action |
|---|---|---|---|---|---|
| Resident account-entry staging harness | **BUILT LOCALLY**; real account-entry matrix remains **BLOCKED** | `operations/product-stewards/resident-card/staging-harness-2026-07-30/` | **COMMITTED / PUSH READY** — `186c904` | Static harness validator PASS; shell syntax PASS; production guard present. Supabase CLI and Docker are absent, so no runtime or email journey ran. | Push with this branch when the branch’s intended review scope is approved. Separately install/provision the isolated runtime and run the bounded matrix; do not rebuild the already released continuation backend. |
| Cycle 9 Homepage candidate | **BUILDING** | `operations/design-explorations/sitewide-style-championship-20260726/cycle-9/incumbent-daily-pager/` | **NOT READY** — untracked active package, approximately 107 files / 50 MB | Ali is still making visual, IA and interaction corrections. An earlier Brand tuple was invalidated by later changes. Committing now would falsely freeze a moving candidate and include obsolete evidence. | Finish the active Homepage ruling; remove/supersede obsolete captures; run named desktop/intermediate/mobile, link, responsive, reduced-motion and journey checks; freeze one exact tuple; then commit this root as its own package. |
| Sitewide page-improvement inventory | **BUILT LOCALLY** | `operations/product-stewards/control-room/sitewide-page-improvement-inventory-2026-07-30.md` | **NOT READY** | The report correctly warns about stale branches, but at least one capability row still conflicts with newer current-tree/release evidence. | Reconcile every “broken/missing” claim against current tree, all release branches, durable release receipts, deployed identity and live bytes; then commit the corrected report alone. |
| Parallel-work reconciliation | **BUILDING** | `operations/PARALLEL-WORK.md` | **NOT READY** | The working diff adds several historical lane rows plus PW-013/PW-014. It spans multiple packages and must not hitchhike with one of them. | Reconcile the older rows, then commit the traffic-control register as a separate operations commit. |
| Pre-existing shared dirty tree | **CAPTURED**; classification incomplete | Remaining modified/untracked paths outside the packages above | **NOT READY** — approximately 2,050 status records after the first preservation commit | The tree spans product steward records, media, site pages, scripts, evidence and unrelated product work. A catch-all commit would make review, rollback and release identity unreliable. | Classify by product/owner and exact path; reconcile against all release branches before calling anything missing; commit only independently testable packages. |

## Required commit procedure

For every package:

1. Reconcile the checked-out tree, recent branches, durable release receipt,
   deployed artifact identity and live bytes before deciding work is missing.
2. Name the exact package paths and exclude obsolete evidence, generated
   runtime data, secrets and unrelated user changes.
3. Run the package’s named validators and `git diff --check`.
4. Stage only explicit paths. Never use a catch-all stage operation in this
   shared tree.
5. Review `git diff --cached --stat` and `git diff --cached --name-only`.
6. Commit one coherent package with a message that states what was preserved.
7. Record the commit SHA and whether it is merely committed or actually push
   ready.
8. Push only to the named branch. Integration, deployment and public
   verification remain separate gates with separate receipts.

## Preservation rule

Active creative work should be checkpointed when interruption or data-loss risk
is real, but a checkpoint must be labelled as such and kept separate from an
accepted review tuple. A commit proves that bytes were preserved. It does not
prove that Ali approved them, that Brand passed them, that they were integrated
or that visitors can see them.
