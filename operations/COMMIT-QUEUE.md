# LAiDIES commit queue

**Status:** standing operational register
**Last reconciled:** 2026-08-08 06:59 PDT
**Branch:** `homepage-redesign`
**Remote relationship at reconciliation:** local and
`origin/homepage-redesign` both resolve to
`4c66f1103ed4e27b7dc0a5e0d23f89cd29e5b124`; nothing in this queue is public
by implication.

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
| Dirty-worktree classification and recovery truth | **VERIFIED LOCALLY / PRESERVED** | `.gitignore`; `scripts/{inventory-repository-storage,test-inventory-repository-storage}.mjs`; `operations/storage/{RECOVERY-STATUS-2026-08-07.md,clutter-migration-manifest.json}` | **COMMITTED / PUSHED — `e6cfeaf4`** | Calibrated inventory schema 2 records file purpose, Git state and action; an intentionally ambiguous asset fails closed to `HOLD_UNKNOWN`. Runtime `.wrangler/state/`, `.artifacts/` and dated backups are excluded without deletion. | Use the machine inventory to form exact owner packages. Do not move `UNKNOWN`, archive anything or leave iCloud until the full restore proof passes. |
| Known-bad AI Fundamentals independent rejection | **REJECTED / PRESERVED / DERIVATIVE USE PROHIBITED** | `operations/external-review/fable-5-laidies-operating-model-2026-08-07/AI-FUNDAMENTALS-KNOWN-BAD-BLIND-JUDGMENT.json`; `operations/product-stewards/library/CONTROL-ROOM-HANDOFF-2026-08-07-2254-PDT.md` | **COMMITTED / PUSHED — `4c66f110`** | Artifact, voice exemplar and positive exemplar hashes match; the Fable-family artifact-first judgment is `REJECT`; the independent-judge calibration rejects a missing artifact. | Consume this exact rejection in the successor producer contract. Do not display, release or source the rejected prose except bounded source mining. |
| Content recommendation-to-result enforcement and daily derivative intake | **BUILT LOCALLY**; owner reviews and relationship-graph build remain open | `operations/product-stewards/learning-content-ecosystem/{OPERATING-SPEC.md,backlog.md,content-work-orders.json,content-work-orders.schema.json}`; `operations/product-stewards/newsstand/{DAILY-NEWSPAPER-EXPERIENCE-BRIEF.md,PUBLICATION-VALIDATION-AND-DISCOVERY-CONTRACT.md}`; `content/daily-learning-derivatives.{json,schema.json}`; `scripts/check-{content-work-orders,daily-learning-derivatives,product-stewards}.mjs`; scoped orchestrator/painpoint updates | **COMMITTED / PUSHED** — principally `36840b7f`, `cdea8452`, `4efe8312`, with accumulated supporting source/evidence checkpointed in `c8029168` | Eleven owned work orders cover all eight current NewsStand learning-impact records. Ali-decision routing and product-steward validators PASS. The two representative daily derivatives remain correctly `HOLD` / publicly ineligible. | Dispatch the ready owner orders and close their independent content/relation gates. Do not publish a daily derivative until its named reviews and exact release gates pass. |
| Resident account-entry staging harness | **BUILT LOCALLY**; real account-entry matrix remains **BLOCKED** | `operations/product-stewards/resident-card/staging-harness-2026-07-30/` | **COMMITTED / PUSHED** — `186c9041` | Static harness validator PASS; production guard present. No isolated Supabase staging project or controlled mail sink is configured, so the real magic-link and Closet-native cross-context matrix did not run. | Provision the isolated runtime and non-personal mail sink, then run the bounded matrix; do not rebuild the already released continuation backend. |
| Shared rewards plus take-it-with-me media contracts | **SPECIFIED / CONTRACT PRESERVED**; transaction ledger, media manifests, RSS/player/channel/distributor adapters remain BUILD REQUIRED | `docs/product/{butterfly-clip-economy.md,take-it-with-me-media.md}`; `content/data/{media-release.schema.json,media-releases/README.md}`; `scripts/check-media-release-manifests.mjs`; `operations/audio/podcast-distribution.md`; `operations/episode-surfaces.json`; `operations/product-stewards/platform-reliability/{REWARD-EARNING-AND-REDEMPTION-SPEC-2026-07-31.md,build-packet-economic-ownership-ledger-2026-07-26.md}`; `operations/product-stewards/fairy-godmother/subproducts/plays.md`; scoped Active Work, freshness, ledger and learning-log updates | **COMMITTED / PUSHED — `2df6a689`** | One shared ledger now owns lifetime clip earned/spent/refunded history and the bounded one-way FAiRY Play offer. One versioned release manifest owns episode/song masters, approved episode-cover derivatives, music artist/band/album metadata and correction fan-out across the site, RSS/podcasts, YouTube and music services. JSON parse, script syntax, product-steward checks and diff checks passed before preservation. | Reconcile Trailer and Episodes 01–04 into manifests without inventing cover/metadata authority; build and prove one end-to-end episode fixture before channel activation. |
| Cycle 9 Homepage candidate | **BUILDING** | `operations/design-explorations/sitewide-style-championship-20260726/cycle-9/incumbent-daily-pager/` | **CHECKPOINTED / PUSHED — NOT RELEASE READY** — source checkpoint `f6223f83`; supporting source/evidence `c8029168`; current candidate assets `df53f530` | Ali is still making visual, IA, language and interaction corrections. Rejected layouts and obsolete captures remain evidence, not approval. A checkpoint protects the bytes but does not freeze an accepted tuple or authorize deployment. | Continue from the last Ali-approved direction; remove/supersede obsolete evidence; run named desktop/intermediate/mobile, link, responsive, reduced-motion, language and journey checks; obtain independent Brand/UX verdicts; then freeze one exact release tuple. |
| Sitewide page-improvement inventory | **BUILT LOCALLY** | `operations/product-stewards/control-room/sitewide-page-improvement-inventory-2026-07-30.md` | **NOT READY** | The report correctly warns about stale branches, but at least one capability row still conflicts with newer current-tree/release evidence. | Reconcile every “broken/missing” claim against current tree, all release branches, durable release receipts, deployed identity and live bytes; then commit the corrected report alone. |
| Parallel-work reconciliation | **BUILDING** | `operations/PARALLEL-WORK.md` | **NOT READY** | The working diff adds several historical lane rows plus PW-013/PW-014. It spans multiple packages and must not hitchhike with one of them. | Reconcile the older rows, then commit the traffic-control register as a separate operations commit. |
| Remaining dirty shared tree | **CAPTURED LOCALLY / CLASSIFIED AT FIRST PASS** | 235 tracked modifications and 9,620 untracked files at 06:59 PDT | **NOT BULK-COMMIT READY** — 2,684 require exact-package review; 2,810 stay out of Git; 4,300 are held unknown; 34 are archive candidates blocked on restore proof; 27 tracked generated files require explicit disposition | The untracked bytes include many superseded episode renders and files above GitHub's 100 MB object limit. The machine inventory is `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/repository-inventory.json`; counts change as packages are committed and must be regenerated before each cleanup batch. | Reconcile one owner/package at a time. First preserve small current source packages whose exact tests are known; then resolve unknown assets by live-reference and owner evidence. Never `git add .`, bulk-delete or infer approval from a filename. |

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
