# Control Room handoff — graph engineering research and bounded pilot

**Status:** VERIFIED LOCALLY / PUSHED — CONFIGURATION-ONLY PILOT; MANUAL RUN HELD
**Action:** accept the source-reconciled graph-engineering recommendation and
bounded work-graph validator as an integration candidate. Do not activate the
dispatcher, select a vendor runtime or commission public learning from this
handoff.
**Evidence time:** 2026-08-13T12:27:23-07:00

## Exact result

Research distinguishes workflow/agent graphs, knowledge/provenance graphs and
GraphRAG; rejects “more agents” as a default; maps the current LAiDIES system;
routes the concept through the Learning System; and provides one framework-
neutral material-learning workflow graph with a calibrated fail-closed checker.

The pilot keeps one accountable maker for connected creative work, permits at
most two read-only evidence lanes, requires a different principal and model
family for independent judgment, bounds repair cycles, detects hidden cycles
and parallel write collisions, and limits Ali gates to reserved authority.

## Paths and identities

- `operations/research/graph-engineering-for-laidies-2026-08-13.md`
  SHA-256 `eb5cc2e7c9e06af8f5b2419570562ac8f42465e5523a6bf8da4a949f958c218d`
- `operations/product-stewards/learning-content-ecosystem/INTAKE-graph-engineering-agentic-systems-2026-08-13.md`
  SHA-256 `14c7efad9445eaa3b1be02bdd96a75bb36bd06b4fda6ce79d69ccc6ad9efdc1b`
- `operations/runtime/work-graph.schema.json`
  SHA-256 `87ae4127025381d0d862145fac640b355144c9be6f4f4487ef1eb0e617374be7`
- `operations/runtime/pilots/material-learning-content.work-graph.json`
  SHA-256 `eb4489dec8dea548b55e88cf53924ce77da06ad5867a568c8397d5a293b168d2`
- `scripts/check-work-graph.mjs`
  SHA-256 `4589b86bba29c587c88e71962962f0680d400403344769f29d641823f7354b6d`
- `scripts/test-work-graph.mjs`
  SHA-256 `c59316de84dece966396852439afa991aa90449c6cafd15aa3e1796524faa69c`
- `package.json` adds `test:work-graph`.
- `operations/painpoints-log.md` records the reusable prevention rule.

## Verification

- `npm run test:work-graph` — PASS: valid `1`, rejected `9`; orphan,
  unknown target, read-only write, parallel collision, correlated judge,
  unbounded repair, hidden cycle, missing stop-loss and invalid Ali authority
  all fail.
- `node scripts/check-work-graph.mjs` — PASS: nodes `15`, edges `20`, terminals
  `2`, parallel groups `1`.
- `npm run test:work-resolution-loop` — PASS.
- `jq empty` on the schema, pilot and `package.json` — PASS.
- `git diff --check` — PASS before commit.

Quality/effectiveness is **not** yet proven. These checks prove topology
integrity and reason-specific rejection, not better content. A real manual pilot
must compare repeated defects, judge-found objective defects, missing inputs,
review cycles, reconciliation corrections, token cost and wall time against a
preceding comparable workflow.

## Locks and dependencies

- Existing dispatcher remains `PAUSED`; this handoff grants no resume
  authority.
- No current content candidate is bound to the pilot. The receiving Learning
  and destination owner must name one exact candidate before a manual dry run.
- The recovered integration base used for this isolated branch does not contain
  the latest unmerged Learning dossier/state or `check-product-stewards.mjs`.
  Those current files are present on the separate AI Fundamentals worktree and
  must be reconciled by integration; they were not copied, overwritten or
  claimed by this task.
- A fresh owner-entry run on the AI Fundamentals worktree reached the current
  steward checker but failed on unrelated expired public daily derivatives and
  overdue `LCR-006`. This task did not weaken or repair those holds.
- The exact AIDB feature recalled by Ali was not found in checked local AIDB
  cycles or indexed web search. It remains a discovery dependency, not technical
  evidence.

## Acceptance owner

- **Architecture/integration:** Control Room / Platform owner.
- **Learning concept and surface routing:** Learning System & Concepts Director.
- **Any exact content pilot:** destination product owner, followed by a role-
  distinct artifact-first teaching judge.
- **Public teaching, deploy or publication:** existing surface/release owners
  and Ali only where her reserved authority applies.

## Next trigger

Control Room reconciles this pushed branch with the latest Learning dossier and
selects one exact material-learning successor for a **manual, dispatcher-off**
pilot. The pilot may advance beyond configuration only after its predecessor,
baseline measures, exact owner, write scope and acceptance owner are bound.

## Authority and worktree truth

- Public change: **none**.
- Deploy: **none**.
- Publication/content commission: **none**.
- Spend: **none**.
- Ali approval used or implied: **none**.
- AI Fundamentals source/render change: **none**.
- Worktree: dedicated sparse non-iCloud worktree
  `/Users/alisoneakin/Projects/laidies-graph-engineering-research`.
- Branch: `task/graph-engineering-research-20260813`.
- Pushed implementation commit:
  `747ca26a3693b2478f7b748239bf7fe3aeaa7e04`.
