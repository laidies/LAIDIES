# LAiDIES working rules

Current authority: `standing-authorization.md` supersedes older routine Ali approval
and whole-job pause requirements below. Retain quality checks and repair failures.

Detailed requirements routed by AGENTS.md. Paths below are relative to the site
repository root (Website-homepage in the iCloud workspace). Read the complete
applicable sections; these rules remain binding within their stated scope.
The short entry map governs selective retrieval instead of blanket historical reading.

## READ THIS FIRST — canon, then the decisions router

1. `operations/voice/laidies-canon-index.md` — **the Canon Index.** The single
   source of truth for names, retired names, saint lanes, status labels,
   overloaded words and backlog. It has instructed for weeks that every agent brief start
   with it; nothing pointed at it until now. Read it first.
   ⚠ An **older, superseded copy** lives at `Website/operations/voice/` — never
   read or edit that one. The live copy is under `Website-homepage/`.
2. `operations/DECISIONS.md` — the router: authority order, per-area decision
   docs, and the process/tooling decisions that post-date the Canon Index.

For art or visual work, next open `operations/reference/README.md` and only the
relevant current view. Choose matching-new-art versus exact-image reuse; check
its bound source and destination scope before selecting any image. Do not
choose by filename, folder age or an old approval label.

The Canon Index is not product-architecture authority. For LIBRAiRY architecture,
read the current Library source routed by `DECISIONS.md`; never recover a layout,
palette or interaction from the Canon Index or an older evidence packet.

**Read both before any material task and search them before asking her
anything.** If you are about to ask a question, propose a direction,
or pick a name, colour, format or tool — check the register first. Ali having
to repeat a decision she already made is the single most expensive failure in
this operation, and it is the one this file exists to prevent.

When she makes a new decision, add it to the register **in the same task**,
before you do anything else with it. A decision that lives only in a chat
transcript will be lost and she will have to make it again.

You do **production work** for LAiDIES / SUNNYVAiLE: generate images, produce and
export video, and create the working and output files that work needs. **Do what
the active brief or task asks for** — you don't need a special allowance for each
new output type.

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
Read the brief/task → do the work → save to the named delivery path → report what
you made and any concerns.

**Commit discipline is part of completion.** A task that changed repository
files may not report `COMPLETE`, `PASS` or a completed handoff while those exact
paths are only uncommitted. Stage only the task-owned paths, inspect the staged
diff, commit them intentionally and bind the exact commit in the handoff. If a
path must remain uncommitted, the work remains `HOLD` or `BLOCKED` and names its
owner, reason and next trigger. Read-only work records
`NO_REPOSITORY_MUTATION`. Never sweep unrelated dirty paths into a commit.

## PARALLEL WORK — mandatory

Subagents are enabled (`features.multi_agent_v2`), capped at 2 concurrent threads.
Serial execution of genuinely independent work is a defect, not caution.

**Write safety.** Concurrent threads share one working tree with full access, so:
- Subagents are **read / analysis lanes by default**. Research, inventory, search,
  extraction, verification, review.
- **Exactly one thread writes to any given file path.** Never two.
- Writes to shared or canonical files — `operations/ACTIVE-WORK.md`,
  `operations/engine/LEDGER.md`, `operations/painpoints-log.md`, canon and
  index files — happen in the **foreground thread only**.
- If a lane must write, name the exact paths it owns in its brief, and give no
  other lane those paths.

**Every spawn needs a brief.** A subagent inherits none of this conversation. It
starts blind. A brief that omits any of these produces unusable output that the
foreground then redoes — which looks like parallelism not helping, when the real
fault is the handoff:

1. the goal, in one line;
2. the exact input paths it may read;
3. the delivery path, or "return findings only, write nothing";
4. the acceptance conditions — how it knows it is done;
5. what is off-limits;
6. the model and reasoning effort it should run at;
7. the return format.

**Merge is a step, not an assumption.** After lanes return, the foreground thread
reconciles: check the lanes against each other for contradictions, check each
against the **original brief and the real artifact** — never against the lane's own
summary of itself — and resolve conflicts before anything is shown to Ali.

**One painpoints entry per task.** Subagents never append to
`operations/painpoints-log.md`. They return learnings to the foreground, which
writes a single consolidated entry at the end. Parallel appends to one file
interleave and lose content.

## HOW MUCH PROCESS — decide this before you start

The gates below are expensive. Applying them to everything is why work takes
too long and produces internal reviews nobody reads. Scale them to what a
mistake would actually cost:

- **Tier 1 — visitor-facing, published, or hard to undo.** Episode video and
  art, building pages, published copy and teaching content, deploys, anything
  carrying Ali's name in public. **Full gates below apply.**
- **Tier 2 — internal work products.** Research, inventory, audits, refactors,
  ops docs, scripts, tooling. Do the work, verify it runs, report what you
  found. **No receipts, no admission gate, no evidence artifacts.**
- **Tier 3 — mechanical.** Renames, path fixes, data transforms, formatting.
  **Just do it and say what changed.**

State the tier in one word when you start. If you can't tell, it's Tier 2.
Generating a Tier 1 evidence trail for Tier 2 work is not caution — it is
waste, and it buries the signal Ali actually needs to see.

## A GATE THAT CANNOT FAIL IS NOT A GATE

Before trusting any validator, QC script or review step, **prove it can fail**:
feed it a deliberately bad input and confirm it reports failure. Record that
the calibration was done.

- If a check has never once failed, it is not evidence. Either calibrate it or
  delete it. Do not keep generating its output.
- **Integrity receipts are not reviews.** Checksums, durations, codecs,
  geometry, "no state was changed" — these prove a file is intact, not that it
  is good. Never label mechanical verification as review, approval, or PASS on
  quality. Call it an integrity receipt and say what it does not cover.
- The only checks worth building are ones that could plausibly reject the thing
  in front of you.

## FIX IT EVERYWHERE, NOT JUST HERE

A fix applied to the one instance in front of you is **not done**. Before
closing any task that corrects a defect, rule or standard:

1. search the repository for every other place the same pattern occurs;
2. fix them in the same task, or list them explicitly as remaining;
3. if the fix is a rule, add it to `operations/DECISIONS.md` so it binds
   future work instead of being rediscovered.

Ep4's motion QC was fixed in July and the same fail-open bug stayed live in
every other episode's QC because this step did not happen. That is the failure
mode this rule exists to stop.

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
