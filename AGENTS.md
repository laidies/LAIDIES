# LAiDIES operating contract

This file governs how work is done. It is process authority, not product or
creative authority.

## Start here

For a normal task, load only:

1. this file;
2. `operations/ACTIVE-WORK.md`;
3. `operations/DECISIONS.md`;
4. the one task-specific source routed by `operations/DECISIONS.md`; and
5. `operations/voice/laidies-canon-index.md` only when names, status language,
   voice, or retired terminology matter.

`operations/context-authority.json` is the machine-readable packet definition.
Do not broaden the startup packet because another file looks official.

## Authority order

Higher wins:

1. Ali's latest direct ruling for the current task.
2. This operating contract for process and safety.
3. `operations/DECISIONS.md` for routing to the current domain source.
4. The routed task-specific source for product, content, design, or release
   decisions.
5. `operations/voice/laidies-canon-index.md` for current names, retired terms,
   and status labels only.
6. Older briefs, archived registers, prototypes, screenshots, implementations,
   prior chat summaries, and memory are evidence only.

If current sources conflict, stop the conflicting part, report the exact files,
and continue anything independent. Never resolve a conflict by choosing the
newest-looking file or by guessing Ali's intent.

## Truth before labels

Use the narrowest verified state:

- `CAPTURED`: recorded, not approved or scoped.
- `DECIDED`: direction approved; implementation may not exist.
- `SPECIFIED`: bounded requirements and acceptance conditions exist.
- `BUILDING`: work has started and is incomplete.
- `BUILT LOCALLY`: local bytes exist; complete verification has not passed.
- `VERIFIED LOCALLY`: the named local checks passed.
- `DEPLOYED`: the intended version was published; public behavior is unproved.
- `VERIFIED PUBLICLY`: the intended public journey passed at the live URL.
- `HOLD`: preserved but not eligible for the next gate.
- `BLOCKED`: progress requires a named owner, dependency, or decision.
- `PAUSED`: intentionally interrupted with an exact resume action.
- `SUPERSEDED`: replaced by a named current source.

Code, a passing build, a commit, HTTP 200, a stored review, or an agent summary
does not prove a visitor outcome.

## Scope the work before acting

State the goal, acceptance conditions, and tier in three lines, then proceed
unless Ali corrects the scope.

- Tier 1: visitor-facing, published, or hard to undo. Use the routed production,
  admission, release, accessibility, and live-verification requirements.
- Tier 2: internal research, operations, refactors, and tools. Do the bounded
  work, verify it, and avoid release theatre.
- Tier 3: mechanical, reversible changes. Make the change and verify the result.

Do the minimum work that changes the decision, prevents a plausible failure,
satisfies a real gate, or improves the visitor outcome. Do not create receipts,
review cycles, validators, variants, or documentation with no decision value.

## Repository safety

The iCloud checkout may contain unique dirty work. Never reset, clean, delete,
stash, or bulk-checkout over uncommitted work. For material writes, use an
isolated non-iCloud worktree unless the active brief explicitly owns a clean
lane.

Stage only task-owned paths, inspect the staged diff, run proportionate checks,
and commit those paths intentionally. A changed repository task is not complete
while its owned paths are merely uncommitted. Never sweep unrelated changes into
a commit.

## Working with Ali

- Ali gives judgments; Codex operates the terminal, browser, design tools, and
  connected services.
- Put the exact decision, paths, changed text, verified result, assumptions, and
  skipped steps in the handoff. Do not make Ali search for them.
- Ask at most one decision at a time, after completing everything independent of
  it.
- A new idea is captured in its routed durable source and does not silently
  replace the current task.
- Teach the mechanism and trade-offs in plain technical language.

## Parallel work

Use a supporting agent only when the lane is genuinely independent and its
reconciliation cost is lower than the time or risk it saves. Supporting lanes
are read-only by default. Exactly one lane writes any path; shared authority
files are foreground-owned. Maximum concurrent threads: two.

## External and public actions

Routine read-only checks, local edits, tests, commits, and explicitly scoped
pushes are allowed. Deployment, publication, spend, account/provider mutation,
external messaging, and handling private credentials require exact current
authority. A local result never inherits public status.

## Product and creative work

The routed domain source governs the product. Do not recover architecture,
palette, interactions, copy, or availability from this file, the Canon Index, a
prototype, or an old evidence packet.

For current AI claims, laws, prices, product behavior, publication facts, or
other volatile material, verify with current primary sources before public use.
For real historical people, use the routed likeness-reference rule before
generating any face.

## Finish

Verify the real changed surface. State what passed, what failed, what remains
unknown, and what was not done. Record a reusable prevention lesson only when it
will change future work; do not append process history by default.

Run `npm run test:context-authority` after changing any startup authority,
Codex configuration, or nested `AGENTS.md` file.
