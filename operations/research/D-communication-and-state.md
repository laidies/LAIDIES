# D — Communication and shared state

**Researched 2026-07-22.** Answers Question D: (D1) what warrants interrupting Ali, and (D2) how five
concurrent windows share state without her re-explaining herself.

Labels, per the house rules in `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/research/_BRIEF-for-research-agents.md`:
**[FACT]** = fetched from a primary source, URL + date given · **[OPINION]** = a named party's position ·
**[INFERENCE]** = my reasoning, judge it on the argument · **[NOT VERIFIED]** = could not confirm ·
**[LOCAL]** = established by direct inspection of this machine on 2026-07-22.

---

## Where the playbook was followed, and where it was not

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/research/agent-operations-playbook.md`
already covers most of the ground. This report extends it; it does not restate it.

**Followed, and I am not re-arguing it:**

- **A3 (determinism vs judgement)** — "anything that has been re-explained more than twice is a check
  that hasn't been written yet." Section 4 of this report is that test applied to communication.
- **A6 (approval fatigue, five gates G1–G5)** — the gate placement is right. Section 1 extends it from
  *episode production* to *everything else that pings her*, and adds the quota and de-escalation rules
  the playbook does not have.
- **A2 (structured note-taking, just-in-time retrieval)** — the "log the pointer, retrieve at point of
  use" principle is the backbone of the mechanism in Section 2.
- **D5a (blocking Stop hook)** and **D5b (grounding paragraph)** — still the right builds. I add one
  more Stop-hook condition (§2.4) rather than proposing a different mechanism.

**Extended, because the playbook's advice is incomplete here:**

- **D4b** says: promote `ep04-cut-decisions.md` to a standing `operations/DECISIONS.md`, "keeping the
  same machine-readable block format." **I disagree with the container.** A single hand-edited markdown
  file is a read-modify-write target. With five sessions writing it, the loser of a race silently loses
  its decision — the exact failure the file exists to prevent. Section 2 replaces it with an
  append-only line-per-decision log plus a *derived* view. The playbook never considered concurrency
  because it was written for one window.
- **D4c** says write at the moment of decision. Correct, and unenforced — it is prose in
  `inject-rules.py` rule 6, and prose is advisory. §2.4 gives it a write path a hook can enforce.
- **Anti-pattern 3** ("multi-agent parallelism on shared files") is treated as a *subagent* concern.
  It applies just as hard to Ali's five terminal windows, which the playbook does not discuss at all.
- **Nothing in the playbook addresses the filesystem this repo lives on.** It is iCloud Drive. That
  changes the answer (§2.5).

**Correction to the playbook, from the live docs (2026-07-22):** A4 states the Stop-hook deadlock valve
fires after **eight** consecutive blocks. The current hooks reference states **10**: "Claude Code allows
only **10 consecutive Stop hook blocks** before stopping anyway" **[FACT]**
(https://code.claude.com/docs/en/hooks, fetched 2026-07-22). Version drift, exactly as the playbook's
Open Question 14 predicted. Re-check after every Claude Code upgrade.

---

## 0. What is actually true on this machine today

All **[LOCAL]**, verified 2026-07-22.

| Thing | State |
|---|---|
| Claude Code version | **2.1.202** |
| Project CLAUDE.md | **Does not exist.** No `CLAUDE.md`, no `.claude/CLAUDE.md`, no `.claude/rules/` anywhere in the tree |
| Auto-memory index | `/Users/alisoneakin/.claude/projects/-Users-alisoneakin-Library-Mobile-Documents-com-apple-CloudDocs-LAIDIES/memory/MEMORY.md` — **141 lines, 19,836 bytes** |
| Memory topic files | **204 `.md` files**, 1.1 MB. 127 tagged `type: project`, **62 tagged `type: feedback`**, 11 `reference`, 1 `user` |
| Hooks (root) | 11 scripts wired in `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/.claude/settings.json` |
| Hooks (second set) | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/.claude/settings.json` — **a different, one-hook set** (`episode-shipcheck.sh` on PostToolUse) |
| Git | `LAIDIES/` is **not** a git repo. `LAIDIES/Website-homepage/` **is** — branch `homepage-redesign`, **701 uncommitted paths** |
| Filesystem | Everything lives under `~/Library/Mobile Documents/com~apple~CloudDocs/` — **iCloud Drive** |
| Agent run-log | `.../operations/ops/agent-runlog.md` — **31.6 KB**, **68 spawns logged today alone** |
| Session snapshot | `.../operations/ops/session-snapshot.md` — 21 lines, last written 07:24 today |
| Handoff | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/HANDOVER.md` — 185 lines, written today |

### Four findings that fall straight out of that table

**(a) Which window Ali opens decides which rules are enforced. [LOCAL]**
A session launched in `LAIDIES/` gets 11 hooks: rule injection, memory recall, git guard, asset guard,
cut-decisions guard, library guard, art-prompt guard, response linter, run-log, session context,
pre-compact snapshot. A session launched in `LAIDIES/Website-homepage/` gets **one** hook and none of
the guards. If two of the five windows are in the sub-directory, two of the five windows are running
without the guardrails, and nobody can tell from the outside.

**(b) The same choice silently splits the shared memory in two. [FACT + LOCAL]**
The docs: "Each project gets its own memory directory at `~/.claude/projects/<project>/memory/`. The
`<project>` path is derived from the git repository, so all worktrees and subdirectories within the same
repo share one auto memory directory. **Outside a git repo, the project root is used instead.**"
**[FACT]** (https://code.claude.com/docs/en/memory, fetched 2026-07-22). `LAIDIES/` is not a git repo,
so its memory keys on the folder path. `Website-homepage/` *is* a git repo, so it would key on the
repo — **a different directory, with a different MEMORY.md**. Today only the `LAIDIES` one exists
**[LOCAL]**, which means the memory has not yet forked. It is one launch away from forking.

**(c) The memory index is at 79% of its hard ceiling. [FACT + LOCAL]**
"The first 200 lines of `MEMORY.md`, or the first 25KB, whichever comes first, are loaded at the start
of every conversation. **Content beyond that threshold is not loaded at session start.**" **[FACT]**
(same page). The index is 19,836 bytes of 25,600 — **79%** — and 141 lines of 200 — **71%**. It is a
list of ~90 pointers and it grows every time a ruling is made. There is no room in it for live state.

**(d) Two safety nets exist in later versions and this machine is behind them. [FACT + LOCAL]**
- From **v2.1.210**: after Claude writes to `MEMORY.md`, Claude Code measures it against the limits and
  "reminds Claude to shorten it… If the file is over a limit, the write still succeeds, but Claude Code
  returns an error telling Claude to rewrite the index, because everything past the limit is dropped on
  the next load." **[FACT]**
- From **v2.1.214**: "When Claude writes a memory file that begins with YAML frontmatter, Claude Code
  records the write time in a `modified` frontmatter field… The timestamp shows how current the fact is,
  both to you and to Claude when it reads the memory back." **[FACT]**

This machine is on 2.1.202 **[LOCAL]**. Upgrading past 2.1.214 gets a self-trimming index and an
automatic staleness stamp on every ruling — both directly relevant to §2 and §3 — for zero build effort.
**This is the cheapest single item in this report.**

---

# D1 — The interrupt taxonomy

## 1.1 The evidence, and why the operations literature transfers

Four primary sources, all fetched 2026-07-22.

**[FACT] The approval-rate number, from Anthropic.** *How we contain Claude across products*, published
**2026-05-25** (https://www.anthropic.com/engineering/how-we-contain-claude): "Our telemetry showed
users approved roughly **93%** of permission prompts." And the mechanism: "The more approvals a user
sees, the less attention they pay to each, becoming over time much less diligent in their supervision."
The same page reports OS-level sandboxing produced "an **84% reduction** in permission prompts," and
that auto mode "catches roughly **83%** of overeager behaviors before they execute."

Read that carefully. A 93% approval rate does not mean the prompts were mostly fine. It means the prompt
**stopped carrying information**. A signal you grant 93 times out of 100 is not a decision point; it is
a keystroke. This is the number that should govern the entire design: *every avoidable interrupt makes
the unavoidable ones less likely to be read.*

**[FACT] The same finding, thirteen years earlier, in hospitals.** The Joint Commission's *Sentinel
Event Alert 50: Medical device alarm safety in hospitals*, **2013-04-08**, reports that **85% to 99% of
alarm signals do not require clinical intervention**, and that clinicians consequently "become
desensitized or immune to the sounds and are overwhelmed by all the information"
(https://www.jointcommission.org/en-us/knowledge-library/newsletters/sentinel-event-alert/issue-50 —
the page 403s to automated fetch; the figure is quoted in AHRQ's *Making Healthcare Safer III*, chapter
"Alarm Fatigue," https://www.ncbi.nlm.nih.gov/books/NBK555522/, fetched 2026-07-22, which independently
states "the percentage of false alarms can range from **72 percent to 99 percent**" and defines the
consequence: clinicians "are not only ignoring the nuisance alarms, but also ignoring or missing many
clinically significant and actionable alarms").

**[FACT] The three-channel model, from Google SRE.** *Monitoring Distributed Systems*, in the Site
Reliability Engineering book (https://sre.google/sre-book/monitoring-distributed-systems/, fetched
2026-07-22), classifies every monitoring output into exactly three destinations — **pages, tickets, and
logging** — and gives the test for which is which:

> "Every page should be actionable."
> "Every page response should require intelligence. **If a page merely merits a robotic response, it
> shouldn't be a page.**"
> "I can only react with a sense of urgency a few times a day before I become fatigued."

That last line is the budget. It is not a metaphor. It is the same budget Ali has.

**[FACT] Batching beats streaming, measured.** Kushlev & Dunn, *Checking email less frequently reduces
stress*, **Computers in Human Behavior, 2015**
(https://www.sciencedirect.com/science/article/abs/pii/S0747563214005810): 124 adults, within-subjects,
one week limited to checking email three times a day versus one week unlimited. Limiting checks
**reduced daily stress**, and lower daily stress predicted higher well-being. The task volume was
identical; only the arrival pattern changed.

**[FACT, partial] The cost of the interruption itself.** Mark, González & Harris, *No Task Left Behind?
Examining the Nature of Fragmented Work*, CHI 2005 (https://dl.acm.org/doi/10.1145/1054972.1055017):
24 information workers observed; **57% of working spheres were interrupted**; interrupted work was
usually resumed the same day but only after **more than two intervening activities**. Mark, Gudith &
Klocke, *The Cost of Interrupted Work: More Speed and Stress*, CHI 2008
(https://dl.acm.org/doi/10.1145/1357054.1357072): interrupted tasks were completed *faster*, but with
"more stress, higher frustration, time pressure and effort."
**[NOT VERIFIED]** The widely-quoted "23 minutes 15 seconds to refocus" figure. The ACM page for the
2005 paper 403s to automated fetch and the UCI PDF could not be text-extracted on this machine (no
`pdftotext`, no `pypdf`). The two figures I verified above are enough; do not cite the 23-minute number
as if it came from these papers.

**[INFERENCE] Why the paging literature is the right analogy and not a stretch.** On-call and clinical
alarming are the two large bodies of practice that have had to solve *exactly* this: an automated system
that can observe far more than a human can attend to, a human whose attention is the scarce resource,
and a failure mode where the human stops reading. The transfer is not "servers are like episodes." The
transfer is the **budget** and the **three-channel discipline**, and both are stated in the sources as
being about the human, not the machine.

## 1.2 The taxonomy for this operation

Three channels. Nothing has a fourth destination. If you cannot place an event in one of these, it goes
in SILENT.

### Tier 1 — INTERRUPT (the page)

**Admission test — all three must hold:**
1. **Blocking or irreversible.** Work stops until she answers, *or* the action cannot be undone
   (publish, spend, overwrite, delete, commit a binary).
2. **Only she can answer it.** A script, a check, or the record cannot. Taste, priority, money, scope.
3. **Not robotic.** Per the SRE test: if her answer is predictable, it is not an interrupt — it is a
   default that hasn't been written down yet.

**Budget: 1 per hour, hard ceiling 5 per day.** Grounded in "a few times a day before I become
fatigued" **[FACT]**. If a sixth arrives, it goes in the digest with a flag, and the fact that it was
demoted goes in the digest too, so the demotion is visible rather than silent.

**Format — every interrupt, no exceptions:**
```
BLOCKED ON YOU · <lane> · <what stops until you answer>
The question, in one sentence.
Options (≤6, or GENERATE if all are bad — memory: dont-make-ali-browse-libraries):
  A … B … C
What I've already checked so you don't have to: <the checks that passed, named>
If you don't answer by <time>: <the default I will take, and how to undo it>
```
That last line is borrowed from I-PASS's contingency element (§3) and it is the single most valuable
line in the format: it converts a blocking interrupt into a *deferrable* one, which means it can wait
for the digest if she's in a meeting.

### Tier 2 — DIGEST (the ticket)

Needs a human eventually. Does not need her now. **Two deliveries a day maximum** — one end-of-day, one
Tuesday-evening pre-Wednesday — plus one on demand when she asks "where are we."
The email-batching result **[FACT]** is the grounding: same content, fewer arrivals, measurably less
strain.

### Tier 3 — SILENT (the log)

Written, retrievable, never pushed. She can ask for any of it and get it in seconds. It is never
surfaced unprompted, and — this is the part that is currently violated — **it is never injected into a
digest either**. `agent-runlog.md` is a Tier-3 artifact. It is 31.6 KB and had 68 entries appended today
**[LOCAL]**. It is doing its job perfectly, and it must never appear in a digest.

## 1.3 The table

| Event | Tier | Why |
|---|---|---|
| Master file / weekly canon lock (playbook G1) | **INTERRUPT** | ~13–20 downstream surfaces derive from it. One approval propagates; a wrong one wastes the week. Ep5 is stopped here right now |
| Publishing to `laidies.ai` | **INTERRUPT** | Irreversible and public |
| Spending money — image/video batches over a set threshold, LoRA training, a paid tool | **INTERRUPT** | Irreversible, and it's her money |
| Committing **modified binaries she did not edit** | **INTERRUPT** | iCloud has silently reverted PNGs here and the revert was then committed over the good art (memory `portrait-sets-and-icloud-revert-incident`, 2026-07-10) |
| Deleting / overwriting / superseding an approved asset, or removing a live feature | **INTERRUPT** | Memory `dont-remove-working-features` exists because this was got wrong once |
| A taste call, with ≤6 candidates and every cheap check already passed (accent colour; frame A/B; a page's look) | **INTERRUPT** | Only she can make it — and the "only she" condition is what makes it worth her attention |
| **Two of her own rulings contradict each other** | **INTERRUPT** | Nothing can break the tie but her. Should be rare; if it isn't, the ledger is being written badly |
| A stage gate fails in a way that threatens Wednesday | **INTERRUPT** | She chooses cut-scope vs slip. That is a business decision, not a production one |
| A guardrail hook has blocked the same action **3+ times** | **INTERRUPT** | Either the rule is wrong or the plan is wrong. Both need her. This is also the honest early-warning that a rule she set is now costing more than it saves |
| Batch finished and passed QC | DIGEST | Nothing stops. She'll want to look, not now |
| Research agent returned findings | DIGEST | 68 spawns today **[LOCAL]**. Pushing these individually is the alarm-fatigue failure verbatim |
| A non-blocking failure with a workaround already applied | DIGEST | Report it plainly, don't page |
| Counts and drift: 50 pages missing the standard header; 701 uncommitted paths; 21 holds ≥25s | DIGEST | Real, but a number that moves slowly is a ticket, never a page |
| Cost for the day | DIGEST | |
| Something she asked for is now ready to look at | DIGEST | Unless it blocks the next stage |
| Every agent spawn and return | **SILENT** | `agent-runlog.md` already does this **[LOCAL]** |
| Every tool call, file read, check that passed | **SILENT** | |
| A hook blocked something and the agent then complied | **SILENT** | The guard worked. Reporting a working guard trains her to stop reading guard reports |
| Prompt iterations, intermediate drafts, rejected frames | **SILENT** | |
| Compaction events, session snapshots | **SILENT** | `pre-compact.py` already writes these **[LOCAL]** |

## 1.4 Two rules that keep the taxonomy from decaying

**The de-escalation rule.** Any interrupt that receives the **same answer twice** stops being an
interrupt. It becomes a recorded default in the ledger (§2), and the next occurrence takes that default
silently and reports it in the digest. This is the direct antidote to the 93% number **[FACT]**: an
approval that is always granted is not oversight, it is a form. Track the approval rate per interrupt
type; anything above ~90% is a default in disguise.

**The escalation rule.** Anything that gets ignored twice in the digest and then causes a problem is
promoted to interrupt, once, with the reason stated. Tiers move in both directions or the taxonomy
calcifies.

## 1.5 What this changes about background agents

**[FACT]** The `Notification` hook fires on `agent_completed`, `agent_needs_input`, `idle_prompt`, and
`permission_prompt`, receives `notification_type` and `message`, and **cannot block**: "Exit code and
stderr are ignored. It is used for side effects only" (https://code.claude.com/docs/en/hooks, fetched
2026-07-22). That is exactly the right shape: it is the place to **enqueue** digest items, never to push
them. A `Notification` hook that appends `agent_completed` events to a day file, and a digest that reads
that file once at day's end, is the whole mechanism. It is about twenty lines.

---

# D2 — The shared-state mechanism

This is the heart of the question, so the answer is stated first and argued after.

## 2.0 The recommendation, in one paragraph

**One append-only ledger, machine-local, one line per fact, never edited — plus a derived view that is
the only thing anyone ever reads.** The ledger lives at `~/.claude/laidies/ledger.jsonl` (outside
iCloud, alongside auto-memory). Every session appends; no session rewrites. A single script,
`.../operations/ops/state.py`, collapses the ledger into a ≤60-line "OPEN STATE" projection — latest
ruling per topic wins, superseded lines dropped, closed items dropped — and a `SessionStart` hook prints
that projection into every new window's context. A `UserPromptSubmit` hook prints the *scope-matched
subset* on every turn. A `Stop` hook blocks the turn if Ali made a ruling and no line was appended.
Durable rulings continue to graduate into auto-memory, which is the only store Claude Code
re-injects from disk after compaction **[FACT]**. Each window is **named for a lane** and a `PreToolUse`
hook refuses writes outside it.

The log is unbounded. The view is capped. **She never reads the log; nothing reads the log; only the
projection is ever loaded.** That is the answer to "how does it not become a 28 KB file nobody reads":
you stop trying to make the log readable and make it *derivable* instead.

Now the argument, option by option, as the question asked.

## 2.1 Option A — a single append-only decision/state log on disk

**Verdict: yes, this is the core. With three specific design choices the obvious version gets wrong.**

**Choice 1: JSON Lines, not markdown.** One JSON object per line, appended with `O_APPEND`.
**[FACT]** POSIX/Linux `open(2)`: with `O_APPEND`, "The modification of the file offset and the write
operation are performed as a single atomic step" (https://man7.org/linux/man-pages/man2/open.2.html,
fetched 2026-07-22). Two processes appending short lines to the same file do not interleave and do not
lose each other's writes. A markdown file that must be *edited* has no such property — it is
read-modify-write, and the loser of a race silently loses its decision. Since the entire purpose of this
file is that decisions never get lost, the container must not be one that loses them.

Keep every line comfortably under 4 KB so it lands in one write syscall.

**Choice 2: the schema is small and boring.**

```json
{"ts":"2026-07-22T14:03:11Z","sid":"4b4dc932","lane":"art","kind":"ruling",
 "scope":"ep05","key":"accent-colour","text":"Accent is teal #3aa8a4. Gold is retired.",
 "why":"gold reads dated next to the candy palette","supersedes":"a91f2c","refs":["/abs/path.png"]}
```

`kind` is a closed set — and the closed set is what makes the projection possible:
`ruling` (she decided) · `default` (a de-escalated interrupt, §1.4) · `question` (blocked on her) ·
`answer` · `tried-failed` (do not re-propose) · `done` (with the check that proved it) ·
`request` (one lane asking another for something) · `handoff`.

`key` is the deduplication axis. Two `ruling` lines with the same `(scope, key)` — the later one wins,
the earlier one is dead. That is the whole compaction algorithm and it is four lines of Python.

**Choice 3: the log is never read by a human or a model. Only the projection is.** `state.py --render`
walks the file, keeps the latest line per `(scope, key)`, drops anything `kind:done`/`answer`ed, sorts
by lane, and emits ≤60 lines. Ali asks "what's open?" and gets the projection. A new window gets the
projection. Nobody opens `ledger.jsonl` and nobody should. **The reason `agent-runlog.md` is 31.6 KB and
unread [LOCAL] is that it was designed to be read.** Design it not to be, and its size stops mattering.

**[INFERENCE]** This is the standard event-log-plus-materialised-view pattern. In Ali's terms: the
ledger is the till roll — every transaction, in order, never altered. The projection is the receipt she
actually looks at. You do not fix a long till roll by writing on it less.

**Would this have caught the Ep5 master file?** Partly, and honestly: **no, not on its own.** Defect 2
in the brief — the synonym pile-up — was ruled on 2026-07-10, recorded in memory
`plain-teaching-garnish-not-carry`, and the draft written afterwards ignored it. The ledger raises the
odds the ruling is *in front of* the writing agent (the `UserPromptSubmit` projection would carry
`scope:ep05, key:one-term-per-concept`), which the current keyword recall may well have missed (§2.2).
But injecting a rule and *enforcing* it are different things, and the brief is explicit that the answer
is mechanisms, not more rules. **The ledger is necessary and not sufficient. The sufficient part is
Question A's content gate.** I am not going to claim otherwise.

## 2.2 Option B — is the existing memory system the right vehicle?

**Verdict: right vehicle for durable rulings. Wrong vehicle for live state. Three concrete gaps.**

**What it already gets right, and it is a lot [FACT]:**
- Auto memory is "**Per repository, shared across worktrees**" and machine-local
  (https://code.claude.com/docs/en/memory, fetched 2026-07-22). Every window on this project already
  reads the same memory. That is genuine shared state and it already works.
- It survives compaction. The "What survives compaction" table
  (https://code.claude.com/docs/en/context-window, fetched 2026-07-22) lists **Auto memory →
  "Re-injected from disk."** Alongside project-root CLAUDE.md, it is the *only* instruction store that
  comes back after a compaction. Path-scoped rules and nested CLAUDE.md files are "Lost until a matching
  file is read again."
- The index-plus-topic-files shape is exactly the "just-in-time retrieval" pattern the playbook's A2
  recommends. It is not broken.

**Gap 1 — the index is 79% full and every ruling makes it fuller. [LOCAL + FACT]** 19,836 of 25,600
bytes; content past the limit "is not loaded at session start" **[FACT]**. Live state cannot go here,
because live state churns and every line of churn evicts a durable ruling. **Rule: memory holds things
that are true next month. The ledger holds things that are true this week.** They are different files
because they have different half-lives (§3.2).

**Gap 2 — there is no write arbitration, and five windows write it. [FACT + INFERENCE]** The docs
describe memory as a directory Claude reads and writes "throughout your session" **[FACT]** and document
no locking for it. Agent teams, by contrast, explicitly document locking for their task list: "Task
claiming uses file locking to prevent race conditions when multiple teammates try to claim the same task
simultaneously" **[FACT]** (https://code.claude.com/docs/en/agent-teams, fetched 2026-07-22). The
absence of an equivalent statement for memory is not proof there is no locking — **[NOT VERIFIED]** —
but two sessions rewriting a 141-line index concurrently is a read-modify-write on a shared file, and
you should not design as if it is safe. Practical rule: **one lane owns `MEMORY.md`.** Others append to
the ledger and the owning lane graduates entries.

**Gap 3 — retrieval is keyword-matched and the matcher has holes. [LOCAL]** `recall-record.py`
(`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/.claude/hooks/recall-record.py`)
splits Ali's message, drops every token of **length ≤ 3**, drops a stop-list, scores +3 for a filename
hit, +2 for a description hit, +1 for a body hit, and injects only entries scoring **≥ 3**. So:
- `Ep5`, `QC`, `v2`, `v3`, `art`, `mp4`, `VHS`, `Ada` — all length ≤ 3, all discarded before scoring.
- A single body-text mention scores 1 and is discarded. A memory whose only link to the message is one
  word in its body never surfaces.
- It injects **names and descriptions only**, not content. The agent still has to choose to open the
  file. The hook makes the pointer unavoidable; it does not make the rule unavoidable.

Two cheap fixes: lower the length filter to `> 2` and add an explicit alias map
(`ep5 → episode-05`, `qc → quality`, `luminairy → luminairy-rename-locked`); and for the top 1–2 matches
of `type: feedback`, inject the **first 400 characters of the body**, not just the description. Feedback
memories exist because something was already got wrong — they are the highest-value bytes in the store.

## 2.3 Option C — hooks as the sync mechanism: the right division

All hook behaviour below is **[FACT]** from https://code.claude.com/docs/en/hooks and
https://code.claude.com/docs/en/memory, fetched 2026-07-22.

| Hook | Owns | Grounding |
|---|---|---|
| **SessionStart** | Print the OPEN STATE projection + the lane assignment | stdout "is added as context that Claude can see and act on." Matchers: `startup`, `resume`, `clear`, `compact`, `fork` |
| **UserPromptSubmit** | Print the *scope-matched* subset of the projection + memory pointers | Same stdout behaviour; `additionalContext` is "wrapped in a system reminder" at the point the hook fired |
| **PreToolUse** | Refuse writes outside this window's lane | Only PreToolUse can prevent a write. PostToolUse cannot — the tool already ran |
| **Stop** | Block if a ruling was made and not appended; block if "done" is claimed without a passing check | Receives `last_assistant_message` and `stop_hook_active`; `decision:"block"` forces continuation; cap is 10 consecutive blocks |
| **SessionEnd** | Write the handoff. Append a `handoff` line. Archive the transcript | "SessionEnd **cannot block**. Exit code and stdout are ignored. It is used for side effects only, such as logging, cleanup, or generating reports." Perfect fit |
| **PreCompact** | Flush any unrecorded decisions before the summary eats them | Already exists here as `pre-compact.py` **[LOCAL]** |
| **Notification** | Enqueue digest items (`agent_completed`, `idle_prompt`) | Cannot block; side effects only |

### The one-line fix worth doing before anything else

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/.claude/settings.json` currently
registers `SessionStart` with `"matcher": "startup|resume"` **[LOCAL]**. The documented matcher set is
`startup`, `resume`, `clear`, `compact`, `fork` **[FACT]**. So today:

- After `/clear`, the session-context injection **does not run**.
- After a compaction, it **does not run** — even though compaction is precisely when the session has
  just lost everything.
- In a forked session, it **does not run**.

`pre-compact.py` writes a snapshot on the way *into* a compaction, and nothing reads it on the way out.
Change the matcher to `startup|resume|clear|compact|fork`. That is one string, and it closes the exact
amnesia hole that `pre-compact.py` was built to patch.

### What SessionStart should print (the shape matters)

Not the rules — those already arrive on every turn via `inject-rules.py` **[LOCAL]**. It should print
**state**: your lane, what's open in it, what's blocked on Ali, what the other four lanes changed since
you last ran, and the three most recent `tried-failed` lines in your scope. Under 60 lines. Derived,
never hand-written.

## 2.4 Making the write happen — the part that is currently missing

Rule 6 of `inject-rules.py` already says: "The moment a ruling/lock/canon decision is made → write it to
a memory file. Don't claim you logged/saved/captured something unless you actually wrote the file this
turn." **[LOCAL]** It is prose. Prose is advisory — Anthropic's own framing: "CLAUDE.md instructions
shape Claude's behavior but are not a hard enforcement layer" **[FACT]**
(https://code.claude.com/docs/en/memory, fetched 2026-07-22). Memory `write-decisions-down-immediately`
exists *because the prose failed*. Adding more prose is the anti-pattern the playbook names last
("Prompting harder instead of writing the script").

**The write path, in three parts:**

1. **`UserPromptSubmit` sets a flag.** Cheap classifier on Ali's message — imperative/decision shapes:
   `never`, `always`, `don't`, `stop`, `use X not Y`, `locked`, `from now on`, `i want`, `it should be`.
   On a hit, touch `~/.claude/laidies/pending/<session_id>.flag` with the message text.
2. **A tiny CLI does the append.** `python3 .../operations/ops/ledger.py add --kind ruling --scope ep05
   --key one-term-per-concept --text "…" --why "…"`. One command, one line appended, no file read. It
   clears the flag.
3. **`Stop` checks.** If the flag exists and no line with this `sid` was appended since the flag's
   mtime → `{"decision":"block","reason":"Ali made a ruling this turn and you did not record it. Append
   it to the ledger now, then answer."}` Read `stop_hook_active` and exit 0 on the second firing
   **[FACT]** so it never loops; the platform also stops after 10 consecutive blocks **[FACT]**.

That converts "write decisions down immediately" from a wish into an exit code. It is roughly 80 lines
of Python across two files and it is the single highest-value build in this report.

**False positives are the acceptable failure here.** Occasionally the hook will insist on recording
something that wasn't really a ruling, and an extra ledger line costs nothing — the projection
deduplicates by `key` and drops what's closed. Memory `write-memories-liberally` says it outright:
"Too many memories is a cheaper failure than a lost decision." Tune the classifier toward over-capture.

## 2.5 Option D — file locking and conflict. The real risk here is not the one you'd expect

**The append-only design removes the classic risk.** With `O_APPEND` and one line per write, there is no
read-modify-write, so there is no lost update **[FACT: `open(2)`]**. No lock is needed for the ledger.

**Where locking is still needed [LOCAL]:** the files that genuinely have to be rewritten in place —
`/Users/.../operations/ops/curation.json` (14 KB), `state.json` (4 KB), `notes.json` (10 KB),
`rejections.json`, `MEMORY.md`. Three mitigations, in order of preference:

1. **Assign an owner lane.** `curation.json` belongs to the art lane; nothing else writes it. Ownership
   is cheaper than locking and it is what Anthropic recommends for the analogous case: "Two teammates
   editing the same file leads to overwrites. **Break the work so each teammate owns a different set of
   files.**" **[FACT]** (agent-teams doc, fetched 2026-07-22).
2. **`flock` the rewrite** where shared writes are unavoidable: `flock` the file, read, modify, write,
   release. Advisory, cooperative, and adequate when every writer is your own script.
3. **Write-temp-then-rename.** `rename(2)` is atomic within a filesystem, so a reader sees either the
   old file or the new one, never a half file.

**And now the risk that actually bit this project. [LOCAL + FACT]** Everything is on **iCloud Drive**.
`O_APPEND` atomicity is a *local kernel* guarantee — it says nothing about what a sync daemon does
afterwards. `open(2)` documents the closely analogous failure for NFS: "O_APPEND may lead to corrupted
files on NFS filesystems if more than one process appends data to a file at once. This is because NFS
does not support appending to a file, so the client kernel has to simulate it, which can't be done
without a race condition" **[FACT]**. **[NOT VERIFIED]** whether iCloud Drive's file provider has the
same defect — Apple publishes no such guarantee either way. But this repo already has a documented
incident where **iCloud silently reverted binary files to older versions**, which were then committed
over the good art (memory `portrait-sets-and-icloud-revert-incident`, 2026-07-10), plus a second
incident where uncommitted work vanished (memory `uncommitted-work-incident`, 2026-07-04).

**[INFERENCE] So: the ledger does not live in iCloud.** Put it at `~/.claude/laidies/ledger.jsonl` —
machine-local, on the same volume Claude Code already keeps auto-memory and transcripts on, and outside
the sync boundary entirely. A *rendered* snapshot (`operations/ops/OPEN-STATE.md`) can be written into
the repo for git history and human browsing, but the authority is the machine-local file. This is a
recommendation the playbook does not make because it never looked at the path.

Second consequence of the same finding: **701 uncommitted paths [LOCAL]** in `Website-homepage` is not a
tidiness problem, it is the blast radius of the next iCloud event. Committing is how you lock. That
belongs in the digest, weekly, as a number.

## 2.6 Option E — is the answer fewer windows with clear ownership?

**Verdict: five windows is not the problem. Five *unnamed, unowned, unequally-configured* windows is.
Keep the count; add lanes. But cut the number she talks to from five to one.**

**The case for fewer, taken seriously [FACT]:** Anthropic's agent-teams guidance says start with 3–5,
that coordination overhead and diminishing returns rise with count, and — the sentence that matters —
"**Three focused teammates often outperform five scattered ones**." The multi-agent research post says
"LLM agents are not yet great at coordinating and delegating to other agents in real time" and puts
multi-agent token use at ~15× a chat. Bird, Nagappan, Murphy, Gall & Devanbu, *Don't touch my code!
Examining the effects of ownership on software quality*, ESEC/FSE 2011
(https://dl.acm.org/doi/10.1145/2025113.2025119) found across Windows Vista and Windows 7 that ownership
measures — number of low-expertise contributors, and the top owner's share — relate to both pre-release
faults and post-release failures **[FACT]**, and concluded that quality effort is best targeted at
changes made by contributors with limited prior experience of that file. Diffuse ownership is
empirically worse.

**The case against collapsing to one:** the work here genuinely is parallel and write-disjoint at the
lane level. Art writes PNGs. Site writes HTML/CSS. Episode writes canon and audio. Research writes
`.md` under `operations/research/`. Ops writes hooks and scripts. That is the case Anthropic names as
the *strongest* for parallelism: "New modules or features: teammates can each own a separate piece
without stepping on each other" **[FACT]**. And Ali cannot serialise — one window means research blocks
the episode and the episode blocks the site, on a weekly deadline.

**So the diagnosis is not "too many windows." It is "no lanes and no router."**

**[INFERENCE] The three changes:**

1. **Name every window for a lane, and launch them all from the same directory.**
   `claude -n art`, `-n site`, `-n episode`, `-n research`, `-n ops`. Naming is documented: `claude -n
   <name>`, `/rename`, and `--resume <name>` resolves "across the current repository and its worktrees"
   **[FACT]** (https://code.claude.com/docs/en/sessions, fetched 2026-07-22). **All five must launch
   from `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/`** — anything launched
   from `Website-homepage/` gets a different settings.json with one hook instead of eleven, and risks
   forking auto-memory (§0a, §0b). This costs nothing and it is the largest single source of
   inconsistency on the machine right now.

2. **Enforce the lane with a `PreToolUse` hook.** Session name → allowed write globs. The art lane
   cannot write `.html`; the site lane cannot write `assets/…`. Cross-lane needs become an explicit
   `kind:request` line in the ledger addressed to the owning lane, which the owning lane sees in its
   next `SessionStart` projection. Collisions become messages instead of overwrites. This is exactly
   Bird et al.'s finding applied **[FACT + INFERENCE]**.

3. **She talks to one window.** This is the real answer to "she is the integration layer." Make `ops`
   the front desk: it holds the projection, it answers "where are we," it routes work to the other
   lanes, and it is the only window that raises interrupts. The other four are workers she does not
   converse with. **[FACT]** Claude Code supports querying an existing session from a script:
   `claude -p --resume <session-id> --output-format json "summarize what we changed" | jq -r '.result'`
   (https://code.claude.com/docs/en/sessions, fetched 2026-07-22). So the front desk can pull state from
   the others without her retyping anything.
   **Caveat, and it is a real one [FACT]:** "If you resume the same session in two terminals without
   forking, messages from both interleave into one transcript." Do not `-p --resume` a session that is
   currently open in a window. **The safe cross-window read is the ledger, not the live session.** That
   is another reason the ledger is the mechanism.

**Why not agent teams? [FACT]** They look like the answer and are not, for this shape of work. They are
"experimental and disabled by default," require `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, and carry a
disqualifying limitation: "**One team per session**: a session has exactly one team, scoped to that
session. **You can't create additional named teams or share a team across sessions.**" Ali's five
windows are five *sessions*. A team cannot span them. Also: "**No session resumption with in-process
teammates**: `/resume` and `/rewind` do not restore in-process teammates," and "Token costs scale
linearly." **Do not build on agent teams for this.** The shared task list and mailbox are the right
*idea* — the ledger is the same idea, in a form that survives closing a terminal.

---

# D3 — The handoff artifact

## 3.1 What the evidence says a handoff should be

The best-evidenced structured handoff in any field is **I-PASS**. Starmer et al., *Changes in Medical
Errors after Implementation of a Handoff Program*, **New England Journal of Medicine, 2014**
(abstract via https://pubmed.ncbi.nlm.nih.gov/25372088/, fetched 2026-07-22): across nine pediatric
residency programs, "**The medical-error rate decreased by 23%** from the preintervention period to the
postintervention period (24.5 vs. 18.8 per 100 admissions, P<0.001)" and "**the rate of preventable
adverse events decreased by 30%** (4.7 vs. 3.3 events per 100 admissions, P<0.001)" **[FACT]**.

The mnemonic, per AHRQ's TeamSTEPPS tool page
(https://www.ahrq.gov/teamstepps-program/curriculum/communication/tools/ipass.html) and the I-PASS
Institute (https://news.ipassinstitute.com/hubfs/I-PASS-mnemonic.pdf), fetched 2026-07-22 **[FACT]**:

| | Element | The transfer to a session handoff |
|---|---|---|
| **I** | Illness severity | **How much trouble are we in?** One word: on-track / at-risk / blocked |
| **P** | Patient summary | **What this lane is and where it stands** — short |
| **A** | Action list | **What to do next, in order, with an owner** |
| **S** | Situation awareness & **contingency planning** | **"If X, then Y."** The part everyone omits |
| **S** | **Synthesis by the receiver** | **The receiver reads it back before acting** |

The two S's are where the value is, and both are missing from how handoffs are done here.

**[NOT VERIFIED]** The frequently-repeated claim that I-PASS did not lengthen handoffs or reduce bedside
time. It is plausible and I could not confirm it — NEJM and the WUSTL mirror both 403 to automated
fetch. Do not cite it.

## 3.2 Verdict on the existing `HANDOVER.md`

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/HANDOVER.md`, 185 lines,
written 2026-07-22 **[LOCAL]**. It is a genuinely good document — better than most engineering handoffs
I have read. It has severity (§1's status table), an ordered action list (§5), named failure modes (§3),
and it states its purpose in its subtitle: "Ali should not have to repeat any of this."

**The pattern is right. The packaging guarantees it goes stale.** [INFERENCE]

The file mixes content with wildly different half-lives in one artifact:

| Section | Half-life | Where it belongs |
|---|---|---|
| §1 Where Ep4 stands (7-row status table) | **Hours** | Derived — regenerate, never hand-write |
| §2 Rulings made today — do not re-open | **Months** | Ledger → graduates to memory |
| §3 What keeps going wrong | **Months** | Memory (mostly already there) |
| §4 Tools and enforcement that exist | **Weeks** | Generated from the repo |
| §5 What to do next, in order | **Hours** | Task list, with a lane owner and a date |
| §6 Open — awaiting Ali | **Hours to days** | Ledger, `kind:question` |
| §7 How Ali wants to work | **Permanent** | `CLAUDE.md` — which does not exist here (§0) |
| §8 The weekly cycle and why Ep5 stalled | **Months** | Memory + the canon spec |

The staleness mechanism is not that any one line rots. It is that **§1 and §5 rot within a day, and
once a reader hits one wrong line they discount the whole file — including §2 and §7, which are still
true.** That is how a good handoff becomes a file people skim. It is the same dynamic as the 93%
approval rate: mixed-reliability signal trains the receiver to stop attending.

**A second, structural problem: it was written by a tired model at the end of a long session, from
memory.** Its own §3 says so: "I verify the countable thing and call it verification… I rebuild what
already exists… Fail-open bugs look like success." A handoff assembled from the same context that
produced those errors inherits them.

## 3.3 What should be written, when, by whom

| Artifact | Written by | When | Source of truth |
|---|---|---|---|
| **A ledger line** | The working agent, via `ledger.py` | **The moment Ali says it**, enforced by the Stop hook (§2.4) | Her words |
| **`OPEN-STATE.md`** | `state.py --render` | On demand; on SessionStart | The ledger. **Never hand-written** |
| **Session handoff** | A **`SessionEnd` hook** | Automatically, when the session ends or is cleared | The ledger + the transcript |
| **`HANDOVER.md`** | Retire it as a hand-written file | — | Becomes the rendered concatenation of the three above |
| **Permanent preferences (§7)** | Ali, once | Now | A real `CLAUDE.md` at the repo root |

**Why `SessionEnd` specifically. [FACT]** It "cannot block. Exit code and stdout are ignored. It is used
for side effects only, such as logging, cleanup, or generating reports," and it receives a `reason`
field distinguishing `clear`, `resume`, `logout`, `prompt_input_exit`, and `other`
(https://code.claude.com/docs/en/hooks, fetched 2026-07-22). The sessions doc adds: "A `SessionEnd` hook
can archive the transcript when a session ends" **[FACT]**. It is the only lifecycle point that fires on
`/clear` — which is when handoffs are needed most and never written.

**Add the two S's, because they are the part with evidence behind them:**

- **Contingency (`S1`).** Every open item carries an "if…then." *"If the LUMINAiRY sign still renders
  `LUMiNAiRY` after the single-frame retry, do not send a third — cut the shot and note it."* This is
  what makes the handoff usable by someone who arrives while things are already going wrong, and it is
  the same line that makes an interrupt deferrable (§1.2).
- **Synthesis by the receiver (`S2`).** The receiving session must **restate the state before acting**.
  Mechanically: the `SessionStart` hook ends its injection with *"Before your first tool call, state in
  two lines: what lane you own and what is blocked. If you cannot, read the projection again."* Cheap,
  and it is the element I-PASS singles out as distinctive.

**Why handoffs go stale or get ignored, as a checklist to design against [INFERENCE, grounded in the
above]:** no timestamp, so nobody knows if it is current (fixed for free by upgrading past **v2.1.214**,
which stamps `modified` on every memory write **[FACT]**) · no owner, so nobody maintains it · mixed
half-lives, so one rotten line discredits the rest · hand-written, so it drifts from reality the moment
anything changes · no read-back, so nobody confirms it landed · and the fatal one — **it duplicates
something authoritative elsewhere**, so the two disagree and the reader must adjudicate. Fable-5's
guidance, quoted in the playbook's D4c, says it directly: "**Don't save what the repo or chat history
already records; update an existing note rather than creating a duplicate; delete notes that turn out
to be wrong**" **[FACT]**.

---

# D4 — What she should never have to say twice

**The evidence, counted [LOCAL]:** 62 of 204 memory files carry `type: feedback` — that tag means the
file exists because Ali corrected something. Roughly **30% of the project's institutional memory is
scar tissue.** Below, each class, whether it is already mechanised, and what ends it.

| # | Class | Evidence | Mechanism today | What ends it |
|---|---|---|---|---|
| 1 | **Her rulings, at all** | `write-decisions-down-immediately`, `write-memories-liberally` | Prose in `inject-rules.py` rule 6 — advisory | **Ledger + Stop-hook write gate (§2.4).** The core build |
| 2 | Self-certifying, hype, sycophancy | `no-hype-no-fake-revelations`, `no-whole-x-phrasing`, `no-meta-brand-commentary`, `no-false-exclusivity-hooks` | **Solved** — `inject-rules.py` + `response-linter.py` + `banned-phrases.txt` | Nothing. Working. Add new phrases to the list |
| 3 | Never `git checkout/restore/clean/stash` | `uncommitted-work-incident` | **Solved** — `block-dangerous-git.py` (PreToolUse) | Nothing |
| 4 | Heroine outfit / 90s hair / 1999 tech | `heroine-appearance-canon`, HANDOVER §2 | **Partly** — `enforce-art-prompt.py` refuses prompts missing the rules | Extend to a post-generation check; that is Question A/B territory |
| 5 | Never mix art generations; never wire a rejected asset | `never-mix-style-generations`, `no-old-artwork-consistency-lock` | **Partly** — `block-rejected-assets.py` is a **denylist** | Playbook **D8a**: generation-aware **allowlist** in `curation.json`. Unknown filename = block |
| 6 | Absolute paths, always | `full-absolute-paths` | Prose only | **Stop-hook regex.** Flag `operations/…` or `./…` appearing as a path in prose. ~10 lines |
| 7 | "AI" capitalised; "Ai" only in brand words | `ai-acronym-always-capital`, `ai-letters-accent-rule` | Nothing | Add to `response-linter.py` **and** a content lint over `.html`/`.md`. Purely mechanical |
| 8 | Gold + plum retired sitewide | `gold-plum-retired-sitewide` | Nothing | Playbook **D7a** — one `tokens.css` + a raw-hex lint. `--plum:` is declared 56× across 17 files |
| 9 | One term per concept (no synonym pile-up) | `plain-teaching-garnish-not-carry`, `ep5-usefulness-critique` — **ruled 2026-07-10, still present in the Ep5 draft** | Nothing | A synonym-set lint on master files + **Question A's content gate.** A hook alone won't do it |
| 10 | **Don't rebuild what already exists** | HANDOVER §3: four things rebuilt in one day | Nothing | **PreToolUse on `Write` to a new path**: grep `site-index.json` + `find -newermt "7 days ago"` for a similar basename; return `permissionDecision:"ask"` with the matches. High value, ~1 hour |
| 11 | Don't remove/hide working features | `dont-remove-working-features` | Nothing | PreToolUse block on deleting any path present in `site-index.json`; require an explicit override |
| 12 | Don't re-propose something already tried and failed | `never-guess-facts`, playbook "already tried and rejected" list | `recall-record.py`, partially — and its matcher has holes (§2.2) | `kind:tried-failed` in the ledger, **always** injected for the active scope. Not keyword-gated |
| 13 | ≤6 candidates; if all rejected, GENERATE | `dont-make-ali-browse-libraries` | Prose | Stop-hook count check: if the response enumerates >6 options, block and force a cut |
| 14 | Verify before claiming done | `inject-rules.py` rules 1–2, 7 | Prose | Playbook **D5a** — the Stop hook that blocks completion claims without a passed check. Still unbuilt |
| 15 | Which file is authoritative | HANDOVER vs `ep04-cut-decisions.md` vs memory vs `laidies-canon-index.md` vs `site-index.json` | Nothing | **One line at the top of every file naming its authority and its half-life.** Derived files carry a `GENERATED — DO NOT EDIT` marker (playbook C7) |
| 16 | How she wants to work (paths, no jargon, no bug-catching, commit to lock) | HANDOVER §7 | Nothing — **there is no `CLAUDE.md` in this project [LOCAL]** | Create `/Users/.../LAIDIES/CLAUDE.md`, under 200 lines. It is the only store besides auto-memory that is **re-injected from disk after compaction [FACT]** |

**Read row 16 twice.** This project has no CLAUDE.md at all. Everything Ali has ever explained lives in
auto-memory (which is capped at 25 KB for the index) or in hook strings (which are code) or in
`HANDOVER.md` (which nothing loads automatically). The single most standard mechanism for "never say
this twice" is not in use here. The docs are blunt about when to add to it: "Claude makes the same
mistake a second time"; "**You type the same correction or clarification into chat that you typed last
session**" **[FACT]** (https://code.claude.com/docs/en/memory, fetched 2026-07-22). That is a literal
description of this project's last three weeks.

---

# D5 — The digest

## 5.1 The rules

- **One screen.** If it needs scrolling it will be skimmed, and a skimmed digest is a Tier-3 log.
- **Outcomes, never activity.** Never "68 agents ran." Only "the batch is done and passed QC" or "it
  failed, here's the output."
- **Every "done" names the check that proved it.** Per `inject-rules.py` rule 2 **[LOCAL]**.
- **The asks come first**, with options and a default.
- **Deliberately excluded:** agent spawns, tool calls, files touched, token counts, hooks that fired
  and worked, drafts, anything already in `agent-runlog.md`, and any sentence about how the work felt.
- **Delivered in chat.** Memory `chat-is-the-one-place`: she will not open a dashboard, and a digest
  that lives at a URL is a digest that does not exist.

## 5.2 A real one — Wednesday 2026-07-22, end of day

Built only from things verified on this machine today **[LOCAL]**.

```
WEDNESDAY ENGINE · Tue 22 Jul · 6 days to Ep5

WHERE THE DEADLINE STANDS
  Ep4  at-risk — cut is watchable; the exported mp4 is stale and motion isn't applied.
  Ep5  BLOCKED at the master file. Not started since you stopped it. Nothing downstream
       can begin, so nothing downstream was attempted.

BLOCKED ON YOU — 2 things, ~6 minutes
  1 · Accent colour. Gold is retired; every retired surface is waiting on the replacement.
      Teal #3aa8a4 · sunset · periwinkle #b3abe7. Renders are at /tmp/gold-*.png.
      If you don't pick by tomorrow AM I'll proceed with teal and it stays reversible
      until the Ep5 pages are built.
  2 · Ep5 master file. The last draft failed your bar for reasons now written down
      (metaphor carrying the teaching; no product named; the payoff is a negation).
      Do you want (a) a one-page substance note from me to approve BEFORE any prose,
      or (b) a rewrite you read cold? Memory ep5-usefulness-critique says (a) — I'd
      like to confirm before spending the week on it.

DONE, AND CHECKED
  · Ep4 captions: 236 cues, VTT+SRT, wired into watch.html, rendering below the picture.
    Verified by opening the served page, not by file count.
  · 6 rulings recorded to memory today, including motion-in-capcut-not-canva and
    library-books-vs-high-classes.

FAILED, PLAINLY
  · The LUMINAiRY sign still renders "LUMiNAiRY". The single-frame retry has not been
    sent yet — it is the test of whether batching was the problem.
  · Yesterday's 18-frame art batch: ~2 usable. No further generation until the audit
    of what already exists is done.

ONE RISK
  · 701 uncommitted files in Website-homepage. iCloud has silently reverted art in this
    repo before (10 Jul) and the revert got committed over the good version. A commit
    checkpoint takes two minutes and is the only thing that locks it. Say the word.

Everything else is in the log. Ask me for any of it.
```

Six items, one screen, two asks, both with defaults, one risk with a named precedent and a two-minute
fix. Nothing about how many agents ran.

## 5.3 The bad one — and it is bad in a specific, diagnosable way

```
Daily Update — 2026-07-22

Great progress today across all workstreams! Here's a summary:

Research: 68 agent runs completed across 5 windows, covering the LIBRAiRY tool
machinery, high-school class scope, and 5 operations research questions (A–E).
Agents a11e1e9c, a88dfd02, a7017215, ad0918b5 and ada677c5 are still running.

Content: extracted 17,763–20,128 words from _superseded/grimoire into
content/library-books/. 9 of 16 shelf books now have source text.

Site: check_site.py reports 70/134 pages have the standard header; 50 real pages
are missing it. 22 additional frames identified for the Ep4 cut.

Memory: MEMORY.md updated. 6 topic files written. HANDOVER.md refreshed (185 lines).

Infrastructure: ffmpeg and Playwright installed. Preview server on port 8221.

Files modified today: 47. Tokens used: ~2.1M. Everything is on track and I'll keep
pushing on the remaining items. Let me know if you have any questions!
```

**Why it is bad, item by item:**

1. **It is the run-log with adjectives.** Every fact in it is Tier-3 (§1.3). Pushing Tier-3 content is
   the alarm-fatigue mechanism operating exactly as documented **[FACT: 85–99% non-actionable → the
   receiver stops attending]**.
2. **There is no ask.** Nothing in it can be acted on. Per the SRE test, "if a page merely merits a
   robotic response, it shouldn't be a page" **[FACT]** — and a digest with no decision in it merits no
   response at all, which teaches her that digests need no response.
3. **It reports effort, not outcome.** "68 agent runs completed" is a cost, presented as an
   achievement. It also invites the wrong follow-up question.
4. **"Everything is on track" is false, and she knows it.** Ep5 is stopped and Ep4's export is stale.
   One confidently wrong line burns the credibility of the whole artifact — the identical mechanism that
   makes `HANDOVER.md` go stale (§3.2).
5. **It makes her the integration layer again.** Five sections, organised by *workstream*, from which
   she must derive "so what do I do." That is precisely the labour Question D exists to remove.
6. **The word "Great" and the phrase "keep pushing."** Banned by `banned-phrases.txt` and
   `no-hype-no-fake-revelations` **[LOCAL]**. `response-linter.py` would block this text today if it
   were a chat response — which is a good sign the guard is calibrated, and a bad sign that a *file*
   written by the same model would pass unchecked.
7. **Agent IDs.** No human has ever needed `a11e1e9c`. If she needs it, she asks.

---

# 6. Build order — ranked by impact per unit of Ali's effort

| # | Build | Effort | Why here |
|---|---|---|---|
| 1 | **Launch all five windows from `LAIDIES/`**, and name them (`claude -n art` …) | **2 minutes** | Today, a window opened in `Website-homepage/` runs 1 hook instead of 11 and can fork auto-memory **[LOCAL]**. Free, and it makes every other item in this list actually apply to every window |
| 2 | **`SessionStart` matcher → `startup\|resume\|clear\|compact\|fork`** | **1 minute** | Currently `startup\|resume` **[LOCAL]**, so the anti-amnesia injection does not fire after `/clear` or a compaction — the two moments it exists for |
| 3 | **Upgrade Claude Code past v2.1.214** | **5 minutes** | Gets the MEMORY.md size guard (v2.1.210) and the `modified` staleness stamp on every ruling (v2.1.214) **[FACT]**. Two of §3's staleness fixes, for free |
| 4 | **Write a `CLAUDE.md`** at `/Users/.../LAIDIES/CLAUDE.md` — HANDOVER §7, under 200 lines | **30 minutes** | There isn't one **[LOCAL]**. It is re-injected from disk after compaction **[FACT]** |
| 5 | **The ledger + `state.py --render` + `SessionStart`/`UserPromptSubmit` injection** | ~3 hours | The mechanism. §2.0–2.3 |
| 6 | **The Stop-hook write gate** (§2.4) | ~2 hours | Turns "write decisions down immediately" into an exit code. Without it, item 5 is another file people forget to write to |
| 7 | **`PreToolUse` lane guard** | ~1 hour | Turns cross-window collisions into messages |
| 8 | **`SessionEnd` handoff writer** | ~1 hour | Retires hand-written `HANDOVER.md`. Fires on `/clear` **[FACT]** |
| 9 | **Digest generator** — `Notification`(`agent_completed`) enqueues; `digest.py` renders §5.2's shape | ~2 hours | She asks "what happened today" and gets §5.2, not §5.3 |
| 10 | **Fix `recall-record.py`**: length filter `>2`, alias map, inject 400 chars of the top feedback memory | ~1 hour | It silently drops `Ep5`, `QC`, `v2`, `art` today **[LOCAL]** |
| 11 | **The "does this already exist?" PreToolUse hook** (row 10 of §D4) | ~1 hour | Four rebuilds in one day, documented in HANDOVER §3 |

Items 1–4 total **under 40 minutes** and are the highest-leverage things in this report. Do them before
building anything.

---

# 7. Do not build these

1. **Agent teams for cross-window state. [FACT]** "One team per session… You can't create additional
   named teams or share a team across sessions," plus "No session resumption with in-process teammates."
   Her five windows are five sessions. It cannot span them.
2. **A dashboard, an ops-centre page, or a web digest.** Memory `chat-is-the-one-place`, and
   `ops-centre.html` (17.5 KB) already exists and is not used **[LOCAL]**. The playbook lists this under
   "already tried and rejected."
3. **A shared markdown state file that sessions edit.** Read-modify-write on a shared file, on iCloud,
   with five writers. This is the playbook's D4b as literally written, and it is the one piece of its
   advice I am arguing against (§2.1).
4. **Anything that parses session transcript JSONL as a supported interface. [FACT]** "The entry format
   is internal to Claude Code and changes between versions, so scripts that parse these files directly
   can break on any release" (https://code.claude.com/docs/en/sessions, fetched 2026-07-22).
   `pre-compact.py` already does this **[LOCAL]** — it is fine as a best-effort snapshot that fails
   silently (it is wrapped in try/except), but do not build the ledger on it.
5. **`claude -p --resume` against a window that is currently open. [FACT]** "Messages from both
   interleave into one transcript."
6. **A per-run digest.** Two deliveries a day, plus on demand. The batching evidence is explicit
   **[FACT: Kushlev & Dunn 2015]**, and 68 runs today **[LOCAL]** would have meant 68 pings.
7. **More rules in `inject-rules.py`.** It is 8 rules and ~30 lines already. HANDOVER §3 records the
   diagnosis in its own words: "I add rules instead of fixing causes… the failing frame already HAD the
   style rule and the likeness rule in front of it."

---

# 8. Open questions / could not verify

1. **Whether Claude Code locks `MEMORY.md` against concurrent writes from multiple sessions.** Locking
   is documented for the agent-teams task list but not for auto-memory. Absence of documentation is not
   evidence of absence. **Mitigation regardless: one lane owns the index.**
2. **Whether iCloud Drive's file provider preserves `O_APPEND` atomicity.** Apple publishes nothing.
   The NFS analogue is documented **[FACT]**. Mitigated by putting the ledger outside iCloud.
3. **The "23 minutes 15 seconds to refocus" figure.** Could not be traced to either Mark paper from a
   fetchable primary source on this machine. Two other figures from those papers *are* verified and are
   sufficient.
4. **Whether I-PASS lengthened handoffs.** NEJM and the WUSTL mirror both 403.
5. **The Joint Commission SEA-50 page itself 403s.** The 85–99% figure is quoted from AHRQ's *Making
   Healthcare Safer III*, which independently gives 72–99% from Sendelbach & Funk (2013). Both are real;
   they measure slightly different things. Cite the range, not a point estimate.
6. **Stop-hook block cap: 8 or 10?** The playbook says 8 (verified 2026-07-21); the live docs say 10
   (verified 2026-07-22). Version-gated. Re-check after upgrades — and note this is a live example of
   why §D4 row 15 (name the authority and the half-life) matters.
7. **Whether `MEMORY.md` at 19,836 bytes is already truncating anything.** It is under both limits, so
   probably not — but this machine is on 2.1.202, which predates the measurement that would tell you
   **[LOCAL + FACT]**.

---

# Sources

All fetched or re-verified **2026-07-22 UTC** unless stated.

| # | Source | URL | Date |
|---|---|---|---|
| 1 | Anthropic — *How we contain Claude across products* | https://www.anthropic.com/engineering/how-we-contain-claude | 2026-05-25 |
| 2 | Claude Code — *How Claude remembers your project* (memory) | https://code.claude.com/docs/en/memory | living |
| 3 | Claude Code — *Hooks reference* | https://code.claude.com/docs/en/hooks | living |
| 4 | Claude Code — *Manage sessions* | https://code.claude.com/docs/en/sessions | living |
| 5 | Claude Code — *Run parallel sessions with worktrees* | https://code.claude.com/docs/en/worktrees | living |
| 6 | Claude Code — *Orchestrate teams of Claude Code sessions* | https://code.claude.com/docs/en/agent-teams | living (v2.1.178+) |
| 7 | Claude Code — *Explore the context window* ("What survives compaction") | https://code.claude.com/docs/en/context-window | living |
| 8 | Google SRE — *Monitoring Distributed Systems* | https://sre.google/sre-book/monitoring-distributed-systems/ | 2016 (living) |
| 9 | Joint Commission — *Sentinel Event Alert 50: Medical device alarm safety* | https://www.jointcommission.org/en-us/knowledge-library/newsletters/sentinel-event-alert/issue-50 | 2013-04-08 (403; quoted via #10) |
| 10 | AHRQ — *Making Healthcare Safer III*, ch. "Alarm Fatigue" | https://www.ncbi.nlm.nih.gov/books/NBK555522/ | 2020 |
| 11 | Starmer et al. — *Changes in Medical Errors after Implementation of a Handoff Program*, NEJM | https://pubmed.ncbi.nlm.nih.gov/25372088/ | 2014 |
| 12 | AHRQ TeamSTEPPS — *Tool: I-PASS* | https://www.ahrq.gov/teamstepps-program/curriculum/communication/tools/ipass.html | living |
| 13 | I-PASS Institute — mnemonic card | https://news.ipassinstitute.com/hubfs/I-PASS-mnemonic.pdf | living |
| 14 | Kushlev & Dunn — *Checking email less frequently reduces stress*, Computers in Human Behavior | https://www.sciencedirect.com/science/article/abs/pii/S0747563214005810 | 2015 |
| 15 | Mark, González & Harris — *No Task Left Behind?*, CHI 2005 | https://dl.acm.org/doi/10.1145/1054972.1055017 | 2005 |
| 16 | Mark, Gudith & Klocke — *The Cost of Interrupted Work*, CHI 2008 | https://dl.acm.org/doi/10.1145/1357054.1357072 | 2008 |
| 17 | Bird, Nagappan, Murphy, Gall & Devanbu — *Don't touch my code!*, ESEC/FSE 2011 | https://dl.acm.org/doi/10.1145/2025113.2025119 | 2011 |
| 18 | Linux `open(2)` — `O_APPEND` atomicity and the NFS caveat | https://man7.org/linux/man-pages/man2/open.2.html | living |

**Local sources inspected 2026-07-22** (all under
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/`):
`.claude/settings.json` · `.claude/hooks/{inject-rules,recall-record,inject-session-context,pre-compact,response-linter,agent-runlog}.py` ·
`Website-homepage/.claude/settings.json` · `Website-homepage/operations/ops/{agent-runlog.md,session-snapshot.md,state.json,curation.json}` ·
`Website-homepage/operations/ep04-cut-decisions.md` · `HANDOVER.md` ·
`Website-homepage/operations/research/{_BRIEF-for-research-agents.md,agent-operations-playbook.md}` ·
and `/Users/alisoneakin/.claude/projects/-Users-alisoneakin-Library-Mobile-Documents-com-apple-CloudDocs-LAIDIES/memory/` (204 files).
