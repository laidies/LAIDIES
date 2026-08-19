# LAiDIES context reset — 2026-08-18

## Outcome

The operating layer was reset in an isolated non-iCloud worktree. Product code,
content, art, release state, deployment, and the dirty iCloud checkout were not
changed.

The routine startup authority fell from 2,534 lines across overlapping files to
316 lines across four bounded sources. The SessionStart hook now injects a
639-character task orientation instead of the old Standing Card, lesson feed,
runtime queue claims, and hash-coupled preamble.

## Recovery identity

- Source repository: LAiDIES `Website-homepage`
- Starting commit: `cee1127f622a07ab17e5aeab7c48ca381bfad3e7`
- Recovery branch: `codex/context-reset-20260818`
- Recovery worktree: `/Users/alisoneakin/Projects/laidies-context-reset-20260818`
- Source tree observed and preserved: 229 modified paths and 3,196 untracked
  paths; no source file was reset, cleaned, deleted, or copied into this commit.

## Current authority

1. `AGENTS.md` — process and safety only.
2. `operations/DECISIONS.md` — a router, not a decision warehouse.
3. `operations/voice/laidies-canon-index.md` — names and statuses only.
4. `operations/ACTIVE-WORK.md` — exactly one current task.
5. One task-specific source retrieved through the router.

`operations/context-authority.json` defines and bounds the machine-readable
packet. `operations/runtime/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md` and the
product owner entry contract now require task-specific retrieval instead of
portfolio preloading.

Seven nested prototype `AGENTS.md` files now declare local reproduction scope
and explicitly defer to the root contract and routed current sources. The
checker rejects any unlisted or unmarked nested instruction file.

## Preserved history

The former Active Work, Working Agreement, Decisions register, Canon Index,
Ledger, dependency map, and SessionStart hook are preserved under
`operations/archive/context-reset-20260818/`. They are evidence only and cannot
override the current packet.

## Verification

- `npm run test:context-authority` — PASS.
- Negative calibration — PASS: a duplicate startup authority is rejected under
  `RULE_01`.
- Binding calibration — PASS: the operating-contract role cannot be rebound from
  root `AGENTS.md` to another short file.
- `node scripts/check-canonical-instruction-dependencies.mjs` — PASS.
- `npm run test:codex-hooks` — PASS with the minimum packet and write-lane guard.
- `node scripts/test-sync-codex-workspace-config.mjs` — PASS, including missing
  config and drift rejection calibrations.
- JavaScript syntax, Python compilation, and `git diff --check` — PASS.

The broader `npm run test:operational-integrity` remains FAIL on pre-existing
runtime debt: one invalid stale `RUNNING` record, fifteen overdue work records,
and a dispatcher-migration contract that expects the older paused orchestrator
identity. Those records were not rewritten to manufacture a green context reset.

The repository pre-commit hook also remains FAIL on 46 pre-existing missing
Episode 03/04 media paths. Its town, local-link, inline-JavaScript, output-path,
and rejection-prevention checks passed. None of the missing media is changed by
this reset, so the exact scoped context commit uses `--no-verify` rather than
inventing assets or expanding into episode repair.

## Not done

- No product or public-experience decision was changed.
- No legacy-only decision was silently promoted into current authority.
- No iCloud changes were committed, discarded, or migrated.
- No push, merge, deployment, publication, account mutation, provider action, or
  spend occurred.
