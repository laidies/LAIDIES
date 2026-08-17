# CODEX SCOPE CONTRACT — read this before doing anything

## READ THIS FIRST — canon, then the decisions router

1. `{{OPS}}/voice/laidies-canon-index.md` — **the Canon Index.** The single
   source of truth for names, retired names, saint lanes, status labels,
   overloaded words and backlog. It has instructed for weeks that every agent brief start
   with it; nothing pointed at it until now. Read it first.
   ⚠ An **older, superseded copy** lives at `Website/operations/voice/` — never
   read or edit that one. The live copy is under `Website-homepage/`.
2. `{{OPS}}/DECISIONS.md` — the router: authority order, per-area decision
   docs, and the process/tooling decisions that post-date the Canon Index.

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

## Video pipeline — which tool does which job
- **Canva creates the animation.** Image-to-video from an approved still. CapCut's
  own animation was rejected; do not generate motion there.
- **CapCut assembles.** Import the Canva clips, cut, sequence, and export the final
  video.
- **Code never authors visible episode art or motion.** Python, CSS, HTML, SVG,
  Canvas and JavaScript may validate, inspect, catalogue or assemble already-approved
  visual media, but may not draw, simulate, generate or animate the imagery itself.
  A programmatic frame, wardrobe, room, transition, character, prop, effect or motion
  graphic is rejected before review, even when technically exported as PNG or MP4.
- Animate **one** approved still per shot. Generating many variants produces drift.
- A loop must have zero net travel, or it plays once and jumps.

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
Read the brief/task → do the work → save to the named delivery path → report what
you made and any concerns.

**Commit discipline is part of completion.** A task that changed repository
files may not report `COMPLETE`, `PASS` or a completed handoff while those exact
paths are only uncommitted. Stage only the task-owned paths, inspect the staged
diff, commit them intentionally and bind the exact commit in the handoff. If a
path must remain uncommitted, the work remains `HOLD` or `BLOCKED` and names its
owner, reason and next trigger. Read-only work records
`NO_REPOSITORY_MUTATION`. Never sweep unrelated dirty paths into a commit.

### Existing pinned tasks are not filesystem-isolated

A separate Codex chat does **not** create a separate checkout. Before an
existing pinned task begins its next new repository-writing unit, it must use a
dedicated non-iCloud worktree or clone and its own task branch. The approved
integration source is `/Users/alisoneakin/Projects/laidies`; do not share that
same writable checkout between pinned tasks. Control Room records the exact
worktree, branch, owned paths and integration owner.

If a task already has uncommitted work in the iCloud tree, preserve it in
place. Do not reset, clean, stash, delete, move or silently recreate it. Report
the exact paths and Git state, then let the integration owner form a bounded
recovery package. The iCloud tree is read-only for each task's next new unit
unless Control Room assigns that exact recovery package. Every writing task
stages only owned paths, inspects the staged diff, tests, commits and pushes;
uncommitted output is `HOLD` or `BLOCKED`, never completion.

## PARALLEL WORK — mandatory

Subagents are enabled (`features.multi_agent_v2`), capped at 2 concurrent threads.
Serial execution of genuinely independent work is a defect, not caution.

**Write safety.** Concurrent threads share one working tree with full access, so:
- Subagents are **read / analysis lanes by default**. Research, inventory, search,
  extraction, verification, review.
- **Exactly one thread writes to any given file path.** Never two.
- Writes to shared or canonical files — `{{OPS}}/ACTIVE-WORK.md`,
  `{{OPS}}/engine/LEDGER.md`, `{{OPS}}/painpoints-log.md`, canon and
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
`{{OPS}}/painpoints-log.md`. They return learnings to the foreground, which
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
3. if the fix is a rule, add it to `{{OPS}}/DECISIONS.md` so it binds
   future work instead of being rediscovered.

Ep4's motion QC was fixed in July and the same fail-open bug stayed live in
every other episode's QC because this step did not happen. That is the failure
mode this rule exists to stop.

## PROSE AND TEACHING PRODUCTION — Tier 1 only

Public meaning-bearing prose is never produced from a topic prompt plus a final
review. Before drafting, the producer must create and pass an exact
`laidies-content-producer-contract.v1` record using
`scripts/check-content-producer-contract.mjs`. The contract binds the reader's
real question and payoff, prior knowledge, canonical truth and freshness
sources, applicable positive exemplars, every registered known-bad defect, the
causal teaching sequence, daily-life connection, worked and unseen transfer
cases, useful action, and any earned analogy or humour job.

The producer reads the exact prose in full and records a separate
`PRODUCER_SELF_REVIEW` with `scripts/check-prose-quality-admission.mjs` before an
independent review is requested. A known defect, missing mechanism, decorative
analogy, generic action, disconnected glossary, jargon before meaning,
unreviewable claim or prose that leaves no useful reader change stops the work
inside production. The producer repairs its brief, examples or method before
creating another candidate; it may not spend a reviewer cycle rediscovering a
requirement the system already knew.

Only after that producer pass does an independent reviewer inspect the same
checksum-bound prose, beginning with the artifact rather than maker receipts.
The reviewer must judge plain clarity, connected mechanism, daily-life
interaction, explain-back, unseen transfer, useful action, factual integrity,
freshness reviewability, surface fit, LAiDIES voice and whether the experience
is genuinely engaging and enjoyable. LAiDIES or Rewind Era analogies and humour
belong only when they perform a named teaching job and preserve the mechanism;
otherwise use a faithful everyday example or none.

Material learning producers also bind the current Hannah Fry communication
benchmark before drafting. Adapt the communication mechanics—not her voice,
persona or a talk template—to the destination's job: human reason, useful
curiosity, concrete visibility for an invisible process, accurate movement
between familiar experience and technical abstraction, retained limitations
and consequences, and a better next question. Name-dropping the benchmark,
adding a hook without explanatory payoff or using a familiar example that
never reconnects to the mechanism fails production.

Every rejection updates the shared exemplar/defect registry and the producer
preflight before a successor is made. Targets are zero repeated known defects,
zero objective defects first found by reviewers, fewer total review issues and
no increase in review cycles. A validator that does not read the exact prose
may report integrity only and cannot admit, release or call content good.

The producer contract and both reviews bind the exact current exemplar/defect
registry SHA and consume every registered negative exemplar; adding a learned
failure invalidates stale contracts automatically. The content manifest must
name the exact reviewed prose bytes and any rendered derivative, and producer,
independent-review and work-order release bindings must all match. Factual
review maps exact candidate claims to exact source excerpts, while explain-back
and transfer observations bind their evidence files. Different display names
do not prove reviewer independence: the reviewer principal, artifact-first
attestation and calibration identity must agree. Against a preceding
comparable candidate, both review issues and review cycles must decrease; equal
counts do not satisfy the ratchet.

Every verdict must disposition the learning result. PASS records no new
reusable defect. HOLD/REJECT records an evidence gap, candidate-only repair or
a checksum-bound pending reusable learning. Learning-owner admission—not
feedback alone—adds a reusable defect to the shared registry, which then
invalidates stale producer contracts before the next draft.

Material explanatory NewsStand content includes explain-back and unseen
transfer, with the same bound observation rule as other teaching. Every
successor review names its predecessor and supplies the prior comparable;
omitting comparison cannot reset the ratchet.

## END-TO-END PRODUCTION DESIGN — Tier 1 only

LAiDIES is one cohesive learning town for professional women from the Rewind
Era. Visual/Brand craft, usefulness, function, UX, intuitiveness and accuracy
are non-compensable: failure in one cannot be scored around by strength in
another. Preserve the LAiDIES magic and world-building while making every job
obvious and easy. Boring, flat, generic, incohesive or AI-slop output fails
before review. Teaching must be current and correct; stale claims, weak or
misleading analogies/examples, decorative references that do not teach and
explanations that increase confusion all fail.

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

If Ali or a verified visitor outcome rejects something that passed internal
review, the evaluator failed. Invalidate the verdicts, reproduce the missed
defect, add the smallest fail-closed guard, update the responsible skill or
review contract, then forward-test the revised reviewer on the known-bad
artifact without telling it the expected defect. Do not call the incident
learned until that reviewer rejects the old artifact unaided. For visual work,
the reviewer sees same-viewport incumbent/candidate renders before maker
receipts, lists visible regressions and locked-decision violations first, and
cannot score around either.

For public images and animation, generation is also prevention-first. Before
rendering, bind the exact destination/location style authority, accompanying
text or narration, scene and teaching job, canon characters and places,
identity/likeness references, era, age, wardrobe/accessories, required objects,
prohibited contradictions, text plan and motion class. Consume the complete
current visual known-bad registry. Generated text is forbidden by default;
use a deterministic editable layer unless purpose-built lettering is itself
the asset and is checked character-for-character. The maker then inspects the
exact rendered pixels at intended size for identity, anatomy, physics, object
orientation, period truth, text, semantic usefulness and narration alignment.
Animation additionally requires decoded occurrence evidence, meaningful change,
timing/continuity and the correct loop/transition/one-shot classification.
Only after zero visible known/objective defects may a role-distinct visual judge
inspect the same exact artifact. A prompt, filename, cue label, checksum,
contact-sheet presence or self-authored `PASS` cannot prove what the pixels show.

Quality must ratchet upward. Before producing a candidate, search the governing
decisions, rejection register and relevant painpoints; encode every applicable
known failure in the maker preflight or an objective guard. Repeated known
defects and objective defects first discovered by reviewers both have a target
of zero. Track total review issues and review cycles against the preceding
comparable candidate; they must trend down until first-pass acceptance is the
norm. A repeated defect stops production and repairs the producer/checker before
another review is commissioned. Review is judgment of genuinely new quality,
not a recurring discovery service for requirements the system already knew.

For Tier 1 work, prove the highest-risk experience/visual/technical mechanism
with the smallest representative artifact before building the full candidate.
Then require maker inspection of the real continuous desktop/mobile result
against the incumbent. A candidate with any known defect, objective failure or
visible maker-found issue remains internal repair and may not consume an
independent review cycle. The reviewer is not the maker's QA department.

Instructions are not complete merely because they describe the desired
result. They must make bypass difficult: name required inputs and outputs,
define failure states, bind exact files/checksums where identity matters, say
which command proves compliance and prevent build/release when evidence is
missing. A self-authored `PASS`, prose assurance, file-exists check, sampled
spot check or technically valid export is never proof that the result meets
the brief.

For a building-page visual, the earliest concept is already a review artifact.
Do not display, attach, link or open a generated image, mockup, screenshot,
prototype or coded direction for Ali until its exact bytes have passed the
repository's design-review admission gate. The gate applies before visual
options are presented, not only after implementation. A failed concept remains
internal repair and must not consume Ali's review time.

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
subagents to **GPT-5.6 Terra / Medium**, 2 concurrent threads, and Fast mode off.

- Use **Luna / Low** for high-volume work with clear success criteria:
  extraction, classification, mechanical transformation, structured summaries,
  repeatable edits. It is the cheapest and should carry this whole category.
- Use **Terra / Low or Medium** for bounded reading, search, inventory,
  routine tests and monitoring that still needs judgment.
- Use **Sol / Medium** for the normal LAiDIES foreground: implementation,
  synthesis, creative/editorial development and multi-step work.
- Escalate to **Sol / High** for genuinely difficult architecture, debugging,
  source reconciliation or high-risk review.
- Use **Extra High, Max or Ultra only as a bounded exception** when the task is
  unusually ambiguous, consequential or resistant to a lower setting. State
  the reason before the expensive work.
- Start at the lowest effort that produces a satisfactory result and escalate
  only on evidence. Effort levels do not map across model generations — retest
  familiar tasks lower than you expect.
- Keep **Fast mode off** unless Ali explicitly says latency matters more than
  credit use.
- Do not make Ali route ordinary work manually. Apply this policy
  automatically. If the whole active foreground needs a different main-chat
  setting that cannot be changed from inside the task, give Ali one concise
  switch recommendation before incurring the expensive work.
- A composer/model-picker choice for the active chat can override project
  defaults. After unusually difficult work, step new tasks back down to the
  project baseline.

## CONTINUITY + IDEA INTAKE — mandatory

Before material work, read:

- `{{OPS}}/CODEX-WORKING-AGREEMENT.md`
- `{{OPS}}/ACTIVE-WORK.md`
- `{{OPS}}/engine/LEDGER.md`

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
`{{OPS}}/painpoints-log.md` in the same task and record the prevention rule
plus a possible public Behind the Build angle. Before similar work, search the
ledger and reuse its relevant rules.

## EPISODE VISUAL SYSTEM — mandatory read

Before creating or editing any episode/trailer visual, transition, recurring
ident, speech bubble, emphasis frame, comic spread, trading-card insert,
landscape, or background, read:

`{{OPS}}/episode-visual-system-lock.md`

The exact master people-rendering style is:

`{{ROOT}}assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`

That image governs how every person is drawn. Character-specific references
govern identity.

**Real historical women require a bound likeness reference.** Before rendering
Ada Lovelace, Grace Hopper, Karen Sparck Jones, the ENIAC Six or any other real
person, confirm that `{{OPS}}/reference/real-people/<person>/` contains at
least one actual image file. If it is empty, **stop and say so** — do not
generate a face from the name. An empty reference directory is the single
mechanical cause of likenesses that don't match, and the guidance that says
"references govern identity" is unenforceable without them. Run:

    node {{ROOT}}scripts/check-real-person-references.mjs The saved category libraries govern bubbles, lettering, page
layout, cards, and environments. Do not substitute a generic comic style, a
generated group portrait, a retired wordmark, or an old welcome-back candidate.
