# LAiDIES repository router

This file contains only rules that apply across the whole repository. Product,
editorial, visual and infrastructure methods belong in the nearest scoped
`AGENTS.md`, an applicable skill, or the product's current operating source.
Do not import an unrelated product's instructions into the active task.

## Start from the requested outcome

Before material work, state the goal and acceptance conditions in three short
lines, then proceed unless Ali corrects them. Use the smallest workflow that can
produce and verify the real outcome.

Search `{{OPS}}/voice/laidies-canon-index.md` and
`{{OPS}}/DECISIONS.md` for terms relevant to the exact task. Read the routed
per-area source. Do not read either file cover to cover unless the task is to
audit that file.

For ongoing work, locate the exact work ID or product entry in
`{{OPS}}/ACTIVE-WORK.md` and the latest relevant decision in
`{{OPS}}/engine/LEDGER.md`. Do not load the complete operational history.
Search `{{OPS}}/painpoints-log.md` only for the active product and defect.

Ali's latest direct ruling wins. Names and status vocabulary come from the
Canon Index; product architecture comes from the current per-area decision
source routed by `DECISIONS.md`.

## Scale the process to the risk

- **Tier 1 — visitor-facing, public or hard to undo:** verify facts and
  freshness, inspect the exact artifact a visitor will experience, use the
  applicable scoped quality method, and obtain independent judgment when it
  can change the release decision.
- **Tier 2 — internal analysis, tooling and operational records:** do the work,
  run proportionate checks and report the result. Do not create admission
  receipts or review theatre.
- **Tier 3 — mechanical transformations:** make the bounded change and verify
  it directly.

A validator proves only what it actually inspects. Calibrate a new gate with a
known-bad input before trusting it. Checksums, schema validity and file
existence prove integrity, not quality. Do not add semantic regex rules merely
to force one candidate's wording or headings.

## Keep work bounded

- Define one visitor or operator problem and the smallest complete change.
- Prove the highest-risk assumption with one representative artifact before
  producing a full set.
- Reuse verified facts and approved assets unless their bytes, freshness or
  authority changed.
- Repair the active artifact first. Add a durable rule only when the defect is
  genuinely reusable; keep the rule scoped to the affected product or format.
- Search the active surface for the same defect. Do not turn a local correction
  into a repository-wide rewrite unless the shared source itself is defective.
- Stop when the acceptance conditions are met. Do not add documents, evidence,
  variants, agents or abstractions that cannot change the decision or visitor
  result.

## Preserve work and report truthfully

The worktree may already contain Ali's or another task's changes. Never discard,
reset, clean, stash, overwrite or sweep them into the active commit. Stage only
task-owned paths and inspect the staged diff.

Commit discipline is part of completion: changed repository paths are not
`COMPLETE` while uncommitted. A path that cannot safely be committed remains
`HOLD` and names the exact reason and next trigger.

Keep these states distinct: proposed, specified, drafted, built locally,
tested, independently reviewed, committed, pushed, deployed and publicly
verified. A local test, hash, commit, HTTP 200 or agent claim is not public
verification. Verify deployed work at the real public URL.

Do not publish, deploy, spend, connect providers, expose private data or make a
consequential shared-system change without the applicable authority. Routine
read-only checks, bounded edits, tests, commits and branch pushes inside the
accepted task do not require Ali to operate a tool.

## Use scoped instructions

When a closer `AGENTS.md` exists, it supplies only that directory's additional
rules. Relevant routes include:

- NewsStand production: `{{OPS}}/product-stewards/newsstand/AGENTS.md`;
- episode assets: `{{ROOT}}assets/episodes/AGENTS.md` and
  `{{OPS}}/episode-visual-system-lock.md`;
- design explorations: `{{OPS}}/design-explorations/AGENTS.md`;
- a product's `CHARTER.md`, `OPERATING-SPEC.md` or current decision source;
- an explicitly triggered skill, which must be read before acting.

For implementation, one writer owns each file path. Use parallel work only
when lanes are genuinely independent and current higher-level instructions
permit it. Subagents return findings by default; shared canonical files remain
foreground-owned.

## Quality without process bloat

Visitor-facing work must be accurate, understandable, useful, accessible and
coherent with LAiDIES. Those outcomes are non-negotiable; a universal stack of
forms is not. The destination's actual job decides the depth, examples,
teaching sequence, review and evidence required.

For public facts, trace consequential claims to current primary or official
evidence and preserve uncertainty. For visual work, inspect the pixels at the
intended size. For interactive work, run the real journey and failure states.
For prose, read the exact words as a newcomer would; jargon, structural
checklists and internal metadata cannot substitute for understanding.

At the end, record only consequential new decisions or reusable learning in
the appropriate durable source. Do not append routine successful execution or
candidate-specific edits to the global ledger or painpoints log.
