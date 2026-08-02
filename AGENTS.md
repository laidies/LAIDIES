# CODEX SCOPE CONTRACT — read this before doing anything

You do **production work** for LAiDIES / SUNNYVAiLE: generate images, produce and
export video (build **CapCut projects**, assemble and export clips), and create
the working and output files that work needs. **Do what the active brief or task
asks for** — you don't need a special allowance for each new output type.

## Where things go
- Save deliverables to the delivery path the brief names — images and video clips
  land beside their source frames (e.g. `ep04-scene-NN-*.mp4`).
- Use only the reference / source frames the brief names; treat named off-limits
  files as radioactive.

## FULL ACCESS — updated 2026-07-24 (Ali: "full access to everything, remove all controls")
The earlier hard prohibitions are **removed**. You have **full access**: run git (commit, push,
branch, etc.), edit the site's HTML/CSS/JS/canon/docs, and create/move/manage files as the task
needs. You do not need a special allowance for any of it.

⚠ **One caution — advice, NOT a prohibition — kept only because it cost a real day of work:**
On 2026-07-04 a `git reset` destroyed a full day of **uncommitted** work and needed forensic
recovery. So: **commit before any destructive git** (`reset --hard`, `checkout -- .`, `clean`,
`stash`). Commit and push freely (those are safe); just don't run a history-/tree-wiping command
over uncommitted work. That's the only git caution — everything else is fair game.

## Workflow
Read the brief/task → do the work (image, or CapCut project + video export) → save
to the named delivery path → report what you made and any concerns.

## END-TO-END PRODUCTION DESIGN — mandatory for every task

Before producing anything, design the whole path from source inputs to the
visitor-visible result. Work in dependency order so downstream polish is not
built on unapproved or incomplete foundations. At minimum:

1. identify the real user goal and the final acceptance conditions;
2. inventory the governing canon, approved references, retired/off-limits
   material, required inputs and unresolved decisions;
3. order the work by dependency and identify the cheapest representative
   proof that can expose a wrong approach before full production;
4. convert every objective requirement that can be checked mechanically into
   a validator or build guard at the earliest stage where it can fail;
5. require subjective review only for genuinely qualitative judgment, after
   objective failures have already been removed;
6. make the producer record artifact-bound evidence for each requirement, and
   make the reviewer independently inspect the real output against the
   original brief and references—not the producer's checklist language;
7. stop before expensive downstream work when an upstream gate fails; and
8. preserve approved work and prove any successor retained it unless an exact
   supersession was approved.

Instructions are not complete merely because they describe the desired
result. They must make bypass difficult: name required inputs and outputs,
define failure states, bind exact files/checksums where identity matters, say
which command proves compliance and prevent build/release when evidence is
missing. A self-authored `PASS`, prose assurance, file-exists check, sampled
spot check or technically valid export is never proof that the result meets
the brief.

This rule applies to the entire LAiDIES operation: product and UX design,
writing, research, teaching, images, animation, video, audio, code, data,
content pipelines, social assets, releases and operational systems. Do not
defer a preventable failure to Ali or to a final release review.

## MINIMUM SUFFICIENT WORK — mandatory

Meet the LAiDIES quality bar with the smallest complete workflow that reliably
achieves the user outcome. Do not add audits, proofs, artifacts, abstractions,
documentation, tools, variants or review loops merely because they are
possible. Before each material step, ask whether it changes a decision,
prevents a plausible failure, satisfies a release requirement or improves the
real visitor result. If not, omit it.

Reuse durable verified facts and approved assets. Do not re-prove settled
authorship, ownership, identity, canon or technical facts unless the relevant
bytes changed, the evidence expired, a contradiction appeared or the next
action genuinely depends on renewed proof. Scope regression testing to the
changed surface plus its real downstream dependencies. Prefer one
representative pilot over many speculative variants, one authoritative record
over duplicate reports, and one bounded correction over a full rebuild.

Quality and efficiency are joint acceptance criteria. Never save time by
skipping accuracy, freshness, LAiDIES voice, teaching quality, accessibility,
canon, privacy, security or visible-output review. Never protect those
standards with work that cannot affect the outcome. Record why any unusually
expensive or broad step is necessary before doing it, and stop when the
acceptance conditions are met.

## ADAPTIVE MODEL + CREDIT ROUTING — mandatory

Use the least expensive model/reasoning configuration that can reliably meet
the task's quality and risk bar. The project `.codex/config.toml` sets the
normal foreground baseline to **GPT-5.6 Sol / Medium**, planning to **High**,
background agents to **GPT-5.6 Terra / Medium**, and Fast mode off.

- Use **Terra / Low or Medium** for bounded reading, search, inventory,
  extraction, mechanical transformation, routine tests and monitoring.
- Use **Sol / Medium** for the normal LAiDIES foreground: implementation,
  synthesis, creative/editorial development and multi-step work.
- Escalate to **Sol / High** for genuinely difficult architecture, debugging,
  source reconciliation or high-risk review.
- Use **Extra High, Max or Ultra only as a bounded exception** when the task is
  unusually ambiguous, consequential or resistant to a lower setting. State
  the reason before the expensive work.
- Keep **Fast mode off** unless Ali explicitly says latency matters more than
  credit use.
- Subagents consume additional credits. Open them only when independent work
  materially improves speed or quality; prefer Terra and the lowest adequate
  effort for read-only/supporting lanes. Never let spawned agents inherit an
  expensive parent setting accidentally.
- Do not make Ali route ordinary work manually. Apply this policy
  automatically. If the whole active foreground needs a different main-chat
  setting that cannot be changed from inside the task, give Ali one concise
  switch recommendation before incurring the expensive work.
- A composer/model-picker choice for the active chat can override project
  defaults. After unusually difficult work, step new tasks back down to the
  project baseline.

## CONTINUITY + IDEA INTAKE — mandatory

Before material work, read:

- `operations/CODEX-WORKING-AGREEMENT.md`
- `operations/ACTIVE-WORK.md`
- `operations/engine/LEDGER.md`

Ali may share new ideas while work is underway. Capture them in the appropriate
durable source and continue the active task by default. Do not silently switch
or abandon BUILDING work. A switch requires a checkpoint with completed work,
open work, verification and the exact resume action.

Use the fixed status meanings in the working agreement. Never treat
CAPTURED/DECIDED/SPECIFIED as built, or local code as publicly verified.
Update the active-work record and decision/idea sources before ending material
work or handing it to another task.

Teach while building: explain the mechanism, evidence, trade-offs and reusable
AI/product skill in plain technical language. Do not dumb concepts down or
assume Ali wants only a summary.

LAiDIES must practise what it teaches. Verify facts/current product claims,
separate evidence from inference, use good briefs, label intentionally bad
prompts, test the real result, protect private information and report
limitations honestly.

At the end of every material task, scan for meaningful failures, surprises,
non-obvious fixes or reusable successes. Append qualifying learnings to
`operations/painpoints-log.md` in the same task and record the prevention rule
plus a possible public Behind the Build angle. Before similar work, search the
ledger and reuse its relevant rules.

## EPISODE VISUAL SYSTEM — mandatory read

Before creating or editing any episode/trailer visual, transition, recurring
ident, speech bubble, emphasis frame, comic spread, trading-card insert,
landscape, or background, read:

`operations/episode-visual-system-lock.md`

The exact master people-rendering style is:

`assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`

That image governs how every person is drawn. Character-specific references
govern identity. The saved category libraries govern bubbles, lettering, page
layout, cards, and environments. Do not substitute a generic comic style, a
generated group portrait, a retired wordmark, or an old welcome-back candidate.
