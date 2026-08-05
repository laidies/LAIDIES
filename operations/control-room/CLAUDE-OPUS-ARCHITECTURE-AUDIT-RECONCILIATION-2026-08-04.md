# Claude Opus architecture audit reconciliation — 2026-08-04

**Status:** ACTIONED IN PART / OPEN ITEMS EXPLICIT

**Authority:** local operating-system work only; no deploy, publication,
credentials or dispatcher restart

**Source audit:**
`/Users/alisoneakin/.codex/attachments/86ebd24a-aad9-4b50-a5a2-fa1be0be04ea/pasted-text.txt`

## Current verdict

The audit's central diagnosis is correct: LAiDIES had strong written standards
that were not consistently connected to runtime gates. Several exact findings
were already repaired before this reconciliation. The operation is **not** an
autonomous background dispatcher while the dispatcher remains intentionally
paused. Foreground Codex work and bounded subagents are operational; unattended
queue pulling is not.

## Reconciled findings

| Audit item | Current state | Exact truth / next action |
|---|---|---|
| A1 output-path incident | PARTIAL | The stray `--dependency-report` directory and `--help` file are absent; all four pre-commit checks pass and `test-output-path-cli-guards.mjs` rejects flag-like output paths. The builder guard remains inside a broader dirty asset-closure change and is not yet independently committed. Preserve it and commit with that exact verified builder closure; do not stage the whole dirty tree merely to make this row green. |
| A2 hooks file untracked | FIXED | `.codex/hooks.json` is tracked in commit `71e716d3`. |
| B1 rules unwired | FIXED LOCALLY / RUNTIME WITNESS OPEN | Approval forgery, voice-source admission and episode/prose ship checks are registered. `scripts/test-codex-hook-guards.mjs` proves deliberate bad payloads fail. The direct lifecycle scripts are now in CI; one actual Desktop lifecycle witness is still required before claiming the app invoked them. |
| B2 CI abandoned | FIXED AND PUSHED | `package.json` and `minimum-integrity-ci.yml` are on `homepage-redesign`. Commit `de955460` adds hook and media-defect fixture tests to CI. GitHub run `30987691692` was triggered by the push. |
| B3 config schema | PARTIAL | Current Codex reports `hooks` and `multi_agent` as stable and enabled; the repository config uses those exact keys. `codex doctor` reports its loaded TOML as `~/.codex/config.toml`, so the repository TOML alone is not proof of Desktop loading. Do not infer a lifecycle witness from config parsing. |
| C1 recurring runner | INTENTIONALLY PAUSED | The Control Room dispatcher remains paused pending its separate migration verification. No workaround or silent restart was made. |
| C2 Daily process | MANUAL PIPELINE BUILT / SCHEDULE OPEN | The dated private composer, independent admission, canonical store and Catch Me Up reader now work locally. No daily trigger exists. The retired Hot Goss workflow remains untouched. |
| C3 freshness queue | OPEN | Freshness coverage and dispatch backlog remain separate launch work; no false completion is recorded here. |
| D finish line | AUDIT PREMISE CORRECTED / ENFORCEMENT DECISION OPEN | The programme already says exact local verification **then public verification after deployment**. The actual gap is that building strict mode accepts `RELEASE_READY` or `VERIFIED_PUBLICLY`, while class/media gates explicitly require public proof. Ali must decide whether every building requires `VERIFIED_PUBLICLY` for whole-town opening; a preview may be rehearsal, not production opening. |
| E six building lanes | MANUAL LANES AVAILABLE / QUEUE PULL OPEN | Disjoint building paths and shared-file ownership are documented. `run-queue.json` has 16 next implementations but no queued or active items and no puller. Until dispatcher migration is verified, the foreground task must explicitly claim and release bounded lanes; the stored queue is not autonomous. |
| H loop learning | FIXED IN SESSION + CI / CLOSURE RULE OPEN | Session start reads the capped `LESSONS-ACTIVE.md`. Ten recurring media defects have calibrated reject fixtures. Commit `de955460` adds their negative tests to CI. A rejection-to-lesson/fixture closure validator remains open; 431 historical painpoints will not be bulk-processed without a recurrence reason. |
| I1 stuck work | FIXED FOR MANUAL CLAIMS / BACKGROUND PULL STILL PAUSED | Run-queue policy now requires a claim ID, claimed/expires timestamps, a heartbeat no older than 30 minutes, a maximum four-hour lease and exact non-overlapping write scopes. Expired, stale, ambiguous and colliding claims fail. The policy does not pull or silently requeue work. |
| I2 preview environment | EVIDENCE INCOMPLETE | Active Work mentions a launch-QA preview, but Release State has no exact preview URL, commit, artifact or receipt. Do not call it a verified staging environment until those are bound. Creating or recovering it is an external deployment action. |
| I3 integration ownership | PARTIAL | Platform/shared-header ownership exists in practice; one explicit cross-building journey owner has not been added to the registry. |
| I4 real-user signal | HELD | Analytics remains unknown/blocked. No collection was connected. |
| I5 review ceiling | ACTIVE RULE / AUTOMATION OPEN | Pilot-before-batch and two-cycle stop-loss are active lessons. An automatic per-artifact verdict ceiling is not yet encoded. |
| I6 rollback | OPEN | Release State names a rollback deployment, but no tested Pages rollback command or preview drill exists. A local runbook cannot prove a deployment rollback without an exact preview target. |

## Repairs completed in this reconciliation

1. Owner-entry is now scoped: an unrelated overdue learning follow-up appears
   as attention, while its responsible owner and strict/global gates still fail.
2. The exact scoped behavior is calibrated by
   `scripts/test-product-steward-owner-entry-scope.mjs`.
3. The decision is durable in `operations/DECISIONS.md`.
4. Hook and recurring media-defect negative tests now run in minimum CI.
5. The enforcement changes were committed as `de955460` and pushed to
   `origin/homepage-redesign`.
6. Manual lane claims now fail closed on expiry, stale heartbeat, ambiguous
   globs and cross-lane path collisions; `scripts/test-product-steward-claim-policy.mjs`
   calibrates each failure and minimum CI runs it.

## Next safe launch action

Keep the dispatcher paused. Continue the foreground whole-town cutline using
explicit non-colliding lanes. The next system repair should be the smallest
claim/expiry contract that can be proven without starting a background puller;
the next visitor-facing repair is the canonical Hot Goss → NewsStand source
migration already identified by the audit.
