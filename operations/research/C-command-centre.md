# C — The command centre

*Research answer for QUESTION C. Written 2026-07-22. Sources and dates on every external claim.
Labels: `[FACT]` verified against a primary source · `[LOCAL]` verified by direct inspection of this
machine · `[INFERENCE]` my reasoning from evidence · `[OPINION]` judgement · `[NOT VERIFIED]`.*

Read the shared brief first:
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/research/_BRIEF-for-research-agents.md`

---

## Where the playbook was followed and where it was not

The playbook is
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/research/agent-operations-playbook.md`.

**Followed.**
- **A2 (context engineering), just-in-time retrieval.** The core of my recommendation is that status is
  *retrieved at the moment she asks*, never pre-built. That is A2's "keep lightweight identifiers and
  load data at runtime" applied to a human instead of a model.
- **A2, structured note-taking.** The state files stay. They are my memory, not her destination —
  which is exactly what memory `chat-is-the-one-place` says
  (`/Users/alisoneakin/.claude/projects/-Users-alisoneakin-Library-Mobile-Documents-com-apple-CloudDocs-LAIDIES/memory/chat-is-the-one-place.md`).
- **A4 (hooks).** I extend the existing eight hooks rather than proposing a parallel system, and I
  respect the playbook's own correction that `PostToolUse` cannot block.
- **A6 (human-in-the-loop).** The five gates G1–G5 are the right *shape* and I keep them.

**Not followed / corrected.**
1. **A6 assumes the problem is too many approvals. Here it is the opposite.** The playbook leads with
   the 93% approval-rate finding and concludes "fewer, higher-stakes gates." **[LOCAL]**
   `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/ops/tasks.json`
   has **three of seven tasks marked blocked-on-Ali since 2026-07-17** — the palette A/B call, the
   LIBRAiRY keystone, the launch announcement — and there is no record that any of them was ever
   *put to her as a question*. That is not approval fatigue. That is **approval starvation**: the
   decision was recorded as pending and then nobody asked. Section 3 below rewrites the gate design
   around that.
2. **A4 lists `agent-runlog.py` as evidence the hook architecture is right. It is, but the runlog
   itself is broken in a way the playbook did not notice.** 61 of its 62 entries record only that an
   agent *launched*. Section 4.
3. **The playbook does not answer this question at all.** It has no section on how status reaches the
   human. That gap is why this report exists, and it is why three dashboards got built instead.

---

# 1. Diagnosis — why the three dashboards didn't stick

This is the most important part of the answer, so I did it from file evidence rather than from theory.

## The evidence

| Artifact | Absolute path | Last written | What it says today |
|---|---|---|---|
| Weekly Command Center | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/weekly-command-center.html` | **2026-07-07** | "Issue 02", release date **2026-06-10**, and instructs: run `.\scripts\start-weekly-workflow.ps1 3` — a **PowerShell** script |
| Operations Centre | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/ops/ops-centre.html` | **2026-07-17** | "**21** real pages missing it" |
| the truth it was built from | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/ops/state.json` | **2026-07-22** | "**50** real pages missing it" |
| Workspace (live app) | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/ops/workspace.py` | **2026-07-17** | never edited again; its own to-do file `workspace-plan.md` lists "CONFIRMED next changes, from Ali" that were never executed |

**[LOCAL, all four rows verified by direct inspection 2026-07-22.]**

Three more details that matter:

- `state.json` carries `"generated": null`. In `check_site.py` line 77 the field is commented
  `# stamped by caller`. **Nothing ever stamps it.** So the dashboard built from it cannot display how
  old it is, even in principle. **[LOCAL]**
- `ops-centre.html` contains no `<script>` block. It is a frozen render, not a live page. **[LOCAL]**
- The Operations Centre honestly badges eleven "elements" as WIRED / PARTIAL / PLANNED. Five of the
  eleven are PARTIAL or PLANNED. **[LOCAL]** It is, in large part, a picture of things that don't exist.

## What that adds up to

The brief offered three hypotheses. The honest answer is **(b), sharpened by (c), and (a) is a
distraction.**

**(a) "wrong shape" is not sufficient.** `workspace.py` was a *live* app — it reads state at request
time, so it can never be stale, and it was built directly to a need she had stated ("I have no
visualization"). It was still abandoned on the day it was written. Freshness and fitness were not the
binding constraint. **[INFERENCE from the mtimes above]**

**But it is not quite true that everything she must open is dead on arrival.** `curation.json` (2026-07-20),
`notes.json` and `rejections.json` (2026-07-21) contain her real per-image verdicts, entered through
that app. **[LOCAL]** So the app *was* used — hard, once — for one bounded job with an obvious finish
line, and then it stopped. That is the precise rule:

> **A destination survives exactly one bounded task with an end state. It never survives as a habit.**

Curating 375 images has a last image. "Check the command centre" does not. There is no moment at which
you are done with it, so there is no moment at which opening it feels like progress, so it never
becomes a habit — and with ADHD and 15-hour days
(`/Users/alisoneakin/.claude/projects/.../memory/chat-is-the-one-place.md`), a thing that is never
urgent is a thing that is never opened.

**(c) is the constructive half, but "opens vs appears" is the wrong axis.** The real axis is **who
does the fetching, and whether the artifact has to be maintained to stay true.**

A dashboard is a **second copy** of state that already lives in files. Being a copy, it must be
rebuilt to stay honest, and the rebuild is a chore nobody owns. Within five days `ops-centre.html` was
off by more than a factor of two on its headline number, and had no mechanism to admit it. A chat
answer is not a copy — it is *computed from the source at the moment of asking*, so it is structurally
incapable of going stale.

**And the deepest reason, which no amount of design fixes.** The dashboards answered *"what is the
state of the site?"* She has never asked that. Her recorded questions are *"what's left?"*,
*"what haven't I built?"*, *"is this any good?"*, *"what am I waiting on?"*. A dashboard is an answer
with no question attached to it. **[OPINION, grounded in the memory record]**

There is a fourth artifact that proves the point by working. `pre-compact.py` writes
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/ops/session-snapshot.md`
— last written **2026-07-22 07:24**, i.e. today. **[LOCAL]** It is a status artifact that is current,
because a machine writes it and a machine reads it, and she never has to know it exists.

> **The mistake was never "a file." The mistake was "a file addressed to Ali."**

---

# 2. What "status in chat" can actually be

Everything in this section is either verified against Anthropic docs or verified against the tools
actually present in this session. I separate **available today** from **would need building**.

## 2.1 Available today, no build

| Mechanism | What it does | Source |
|---|---|---|
| **Skill / slash command with shell pre-substitution** | A `SKILL.md` may contain `` !`command` `` or a ` ```! ` fenced block. "Each `` !`<command>` `` executes immediately (before Claude sees anything)… Claude receives the fully-rendered prompt with actual data." This is **preprocessing, not something Claude executes.** | [FACT] https://code.claude.com/docs/en/skills — fetched 2026-07-22 |
| Skills *are* slash commands | "A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way." | [FACT] same page |
| **`SessionStart` hook context injection** | stdout / `additionalContext` is added "at the start of the conversation, before the first prompt, as a system reminder." Crucially: "**`SessionStart` hooks run again on resume**… so they can refresh their context." | [FACT] https://code.claude.com/docs/en/hooks.md — fetched 2026-07-22 |
| **`UserPromptSubmit` injection** | Can add context on every prompt. `additionalContext` is **silently ignored** unless nested under `hookSpecificOutput`. | [FACT] hooks reference, via playbook A4 (verified 2026-07-21) |
| **`Monitor` tool** | "Each stdout line is an event — you keep working and **notifications arrive in the chat**." Supports `persistent: true` for session-length watches. | [FACT] Monitor tool definition, this session, 2026-07-22 |
| **Background Bash** | One completion notification when the command exits. | [FACT] Bash tool definition, this session |
| **`asyncRewake` hooks** | A background hook that "**wakes Claude on exit code 2**… stderr is shown to Claude as a system reminder so it can react to a long-running background failure." | [FACT] https://code.claude.com/docs/en/hooks.md |
| **`SubagentStop` hook** | Receives `agent_type`, `agent_id`, and **`last_assistant_message` — "the final assistant message text from the subagent."** | [FACT] same |
| **`TaskCompleted` hook** | Fires when a task is marked complete and **can block it** (exit 2). | [FACT] same |
| **`Notification` hook** | Matchers include `agent_needs_input` and `agent_completed`. | [FACT] same |
| **`/goal`** | "After each turn, a small fast model checks whether the condition holds. If not, Claude starts another turn." "The evaluator returns a short reason… The most recent reason appears in the status view and in the transcript." It is "a wrapper around a session-scoped prompt-based Stop hook", Haiku by default, condition up to 4,000 chars. | [FACT] https://code.claude.com/docs/en/goal — fetched 2026-07-22 |
| **`/loop` + cron** | "A scheduled prompt fires between your turns, not while Claude is mid-response." Session-scoped, **7-day expiry**. Durable alternatives: Desktop scheduled tasks (local files, 1-min minimum) and cloud Routines (1-hour minimum). | [FACT] https://code.claude.com/docs/en/scheduled-tasks — fetched 2026-07-22 |
| **`AskUserQuestion`** | "1–4 questions with 2–4 options each", plus an "Other" choice accepting free text. Anthropic explicitly recommends "have Claude interview you… using the AskUserQuestion tool." | [FACT] https://code.claude.com/docs/en/agent-sdk/user-input and https://code.claude.com/docs/en/best-practices.md — fetched 2026-07-22 |
| **Plan mode + `Ctrl+G`** | Plan opens in a text editor for direct editing before execution. | [FACT] best-practices, same fetch |
| **`/rewind` checkpoints** | Every prompt is a checkpoint; restore conversation, code, or both. Warning: "Checkpoints only track changes made through Claude's file editing tools. Changes made through Bash commands or external processes are not captured." | [FACT] best-practices |
| **Inline widget rendered in the conversation** | `mcp__visualize__show_widget` — "renders inline alongside your text response… A global `sendPrompt(text)` function is available — it sends a message to chat as if the user typed it." | [FACT] tool definition present in this session, 2026-07-22 |
| **Background-task chips** | `mcp__ccd_session__spawn_task` puts a one-click chip in her UI for out-of-scope work. `mark_chapter` adds transcript dividers + a floating table of contents. | [FACT] tool definitions, this session |
| **statusline** | Multi-line, ANSI colour, OSC-8 clickable links. Fields include `context_window.used_percentage`, `cost.total_cost_usd`, `rate_limits.*`, `effort.level`. "The status line runs locally and does not consume API tokens." Re-runs on new assistant message, `/compact`, permission-mode change, or a `refreshInterval` timer. | [FACT] https://code.claude.com/docs/en/statusline — fetched 2026-07-22 |
| **Agent view** (`claude agents`) | "one screen for all your background sessions: what's running, what needs your input, and what's done." Row headline written by a Haiku-class model; `Space` peeks; you can reply inside the peek panel. Requires v2.1.139+. | [FACT] https://code.claude.com/docs/en/agent-view — fetched 2026-07-22 |

**Two things I could not confirm.**
- The `Monitor` tool documentation refers to sending "a PushNotification". **[NOT VERIFIED]** — no
  `PushNotification` tool schema was retrievable in this session, so I cannot say phone push is
  available to Ali.
- Whether the terminal statusline renders in her desktop-app sessions. **[NOT VERIFIED]**

## 2.2 What would need building

Nothing exotic. Three small scripts, all mine, none of them a page:

1. A **`/where` skill** whose body is mostly `` !`…` `` blocks that run the existing checks fresh, plus
   a rendering contract (Section 3).
2. A **`SubagentStop` hook** that appends the actual agent result to the run-log (Section 4).
3. A rewrite of `inject-session-context.py` so its "CURRENT STATE" paragraph is **generated**, not
   typed. Today it is hard-coded prose written 2026-07-17 that still tells me the visual Workspace at
   `localhost:8790` is the current tool. **[LOCAL]** A session-start injection that lies is worse than
   none.

---

# 3. The "one command"

## 3.1 Yes — and it should not require her to remember a slash

The single question **"where are we?"** is the right primitive, and it is what a real practitioner
already does. Peter Steinberger, running 3–8 agents in parallel solo: *"If something takes longer than
I anticipated, I just hit escape and ask 'what's the status'."*
[FACT] https://steipete.me/posts/just-talk-to-it — 2025-10-14.

But there is a warning in the record that applies directly to my own recommendation. Armin Ronacher
built and abandoned five slash commands: `/commit` ("they never matched my style"), `/fix-nits`
("never became muscle memory"), `/next-todo` ("used far less than expected"). He also reports: *"I
tried hard to make hooks work, but I haven't seen any efficiency gains from them yet."*
[FACT] https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/ — 2025-07-30.

**[INFERENCE] So a slash command alone would repeat the dashboard mistake in cheaper clothing** — it is
still a thing she has to remember to invoke. Three mitigations, all cheap:

- The skill answers to plain English too. "where are we", "what's left", "what am I waiting on",
  "status" all route to it. Skills load when Claude judges them relevant, not only on `/`
  [FACT, skills doc] — so she never has to learn a command.
- The same digest is **injected at every session start** by the existing `SessionStart` hook, so the
  first thing she sees when she opens the project is the answer without asking.
- The same digest is **pushed on a schedule** — Monday 08:00 and Wednesday 07:00 — via a Desktop
  scheduled task (durable; `/loop` expires after 7 days [FACT, scheduled-tasks doc]).

Ask, arrive-on-open, arrive-on-schedule. Three doors, one answer, no habit required.

## 3.2 The rendering contract

The whole value is in what gets *left out*. Rules, in priority order:

1. **The first line is the clock**, and it is allowed to be bad news.
2. **Blocked-on-you comes second, before anything else**, capped at three, each stated as an actual
   choice with what happens on each branch.
3. **Numbers only where a number changes a decision.** "50 pages missing the header" earns its place
   because it decides whether to spend an hour. "134 pages total, 70 have it" does not.
4. **Every stuck item carries an age in days.** Age is the drift signal a human can read at a glance.
5. **No lists of filenames. Ever.** Memory `dont-make-ali-browse-libraries`: *"I'm not looking through
   367 images."* The same rule applies to 50 paths.
6. **No status badges, no percent-complete, no WIRED/PARTIAL/PLANNED taxonomy.** That was the
   Operations Centre's whole vocabulary and it communicated nothing actionable.
7. **It ends with what I will do next unless redirected** — so silence is a valid, safe answer.
8. **Everything omitted is available by asking "more".** The detail is not deleted; it is one word away.

## 3.3 The GOOD version — drafted for the real week of Wed 22 Jul 2026

*(Numbers marked ✓ are real, verified from
`/Users/alisoneakin/.../operations/ops/state.json`, `tasks.json`, `redo-plan.md`, `agent-runlog.md`
on 2026-07-22. Items marked ~ are illustrative of the shape.)*

---

> **Wed 22 Jul — ship day. Nothing ships today.**
> Ep5 has been stopped **12 days** at the script ✓. Ep4 isn't finished ✓. Realistic next ship:
> **Wed 29 Jul**, and only if the Ep5 substance gets a yes from you this week.
>
> **Waiting on you — 3 things, about ten minutes**
>
> 1. **Ep5 substance.** ~ I've got the plain "which model for what, and why" as nine bullets that
>    actually name products and give a trigger for each. Yes → I write the prose tonight. No → tell me
>    which bullet is wrong and I redo just that one. *(This is the step we agreed on 10 Jul and never
>    did ✓.)*
> 2. **Accent colour.** ~ You said the cold accents fight the purple. Two candidates, shown on real
>    page crops. Pick one, or say "neither" and I'll generate three more.
> 3. **LIBRAiRY keystone.** ~ Codex came back with v6. It's the only thing standing between us and
>    **23 restyle jobs** ✓ that are otherwise ready.
>
> If I hear nothing by Friday I'll default to: hold Ep5, take the warmer accent, re-queue the keystone.
>
> **Running now — 6** ✓
> Research A–D (teaching gate · weekly cycle · command centre · comms), started 12:10 · memory digest
> across ~200 files, 12:07 · site inventory, 12:07. First results expected within the hour.
>
> **Not moving**
> - **Ep4 inline clips** — 3 to make, 5 to re-render. Stuck **2 days** ✓ because Codex v11 failed and
>   I never re-queued it. My miss. Re-queuing now, no decision needed from you.
> - **89 image redo notes** ✓ → 39 doable today, 49 waiting on the two style calls above ✓. So
>   question 2 and 3 unblock more than half the backlog.
>
> **Site, for information only**
> 50 pages are still on the old header ✓ — it was 21 five days ago ✓, so we're losing ground and I
> don't yet know why; say "diff the headers" and I'll find out. 698 files uncommitted on
> `homepage-redesign`, 397 commits ahead of main ✓. Nothing here needs you; say "fix headers" and I'll
> do the pass.
>
> **Next, unless you redirect me:** re-queue the Ep4 clips, then hold for your answer on Ep5.
> Say **"more"** for the full detail on any line.

---

That is ~260 words, reads in under a minute, contains three decisions, one confession, one age-marked
stall, and an explicit default so silence is safe.

## 3.4 The BAD version — and it is not a straw man

This is the actual content of `ops-centre.html` rendered as text. **[LOCAL]**

---

> **SUNNYVAiLE — Operations Centre.** The whole system in one place. Verified state, not claims.
> Re-run: `python3 operations/ops/check_site.py && python3 operations/ops/build_dashboard.py`
>
> **The system — all 11 parts.** 1 Everything in one place — WIRED. 2 Tools, quick access — WIRED.
> 3 This week's episode — PARTIAL. 4 Agentic OS — PARTIAL. 5 Analytics → insights — PLANNED.
> 6 Social engine — PLANNED. 7 Two-way inbox — WIRED. 8 One task at a time — WIRED. 9 News +
> explanation — PARTIAL. 10 Trusted sources — PARTIAL. 11 Unified chat — PLANNED.
>
> **1 · State of the site.** NO — Standard header on every page: 21 real pages missing it. missing:
> about.html, clubhouse-pass.html, clubhouse.html, community/laidy-spotlight.html,
> content/printables/issue-01-on-wednesdays-we-do-ai.html, content/printables/issue-01-open-the-tab.html,
> content/printables/issue-03-elle-woods-receipts-pass.html, … *(21 filenames)*
> NO — Dead Grimoire pages removed: 13 zombie pages still exist. grimoire.html,
> grimoire/chamber-of-receipts.html, grimoire/lore-closet.html, … *(13 filenames)*
> NO — Pages off the broken old-layout CSS: 17 pages. blend-snap.html, bronze-aige.html, … *(17 more)*

---

Why it fails, precisely:
- **The number is wrong** (21; the truth today is 50) and the page cannot know.
- **51 filenames** are printed. Not one of them changes what she does next.
- **Five of eleven headline items describe things that do not exist.** Reading it is mostly reading
  about absence.
- **There is no decision anywhere in it**, and no age on anything, so nothing can be seen to be rotting.
- It opens by telling her to **run two shell commands**.

---

# 4. Catching drift

## 4.1 The run-log already exists and is broken in one specific way

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/ops/agent-runlog.md`
— 30,567 bytes, 62 entries, spanning 2026-07-17 → 2026-07-22. **[LOCAL]**

**61 of those 62 entries have `returned:` = `{"isAsync": true, "status": "async_launched", …}`.**
**[LOCAL, counted]**

The hook is `.claude/hooks/agent-runlog.py`, wired on `PostToolUse` matching `Agent|Task`. **[LOCAL]**
`PostToolUse` fires when the *launch call* returns. For a background agent, the launch call returns an
acknowledgement, not a result. So:

> **The run-log records that agents were started. It has never once recorded what an agent did.**
> It is a launch manifest wearing the name of a run log.

Two consequences:
- The exact incident this hook was written to prevent — `agents.json` records it as *"a proof agent
  died silently — the real problem"* **[LOCAL]** — is still completely undetectable, because a launch
  line with no landing line looks identical to a launch line with a landing line.
- The file is 30KB for 62 entries because each entry stores the prompt twice: once in `prompt:` and
  again inside the JSON acknowledgement. It is large and it is empty.

**So: the raw material is NOT already being captured. Half of it is missing, and it's the half that matters.**

## 4.2 The fix is about twenty lines

A **`SubagentStop`** hook appending a landing line keyed by `agent_id`. That event carries
`agent_type`, `agent_id`, and **`last_assistant_message` — "the final assistant message text from the
subagent (for use cases requiring the complete turn output, as the transcript file may lag)."**
[FACT] https://code.claude.com/docs/en/hooks.md — fetched 2026-07-22.

That single change converts the log from a manifest into a **ledger with two sides**, and every drift
signal below falls out of it for free.

## 4.3 Drift detection is a reconciliation, not a watch

Four signals, all computable, none requiring her to look at anything:

1. **Launched-but-never-landed.** Any `agent_id` with a launch line and no landing line older than N
   minutes. This is the silently-dead-agent detector and it does not exist today.
2. **What changed on disk**, not what the agent said. `git status` / `git diff --stat` since the last
   digest, filtered to meaningful paths. Anthropic: *"Have Claude show evidence rather than asserting
   success… Reviewing evidence is faster than re-running the verification yourself, and it works for
   sessions you weren't watching."* [FACT] https://code.claude.com/docs/en/best-practices.md, fetched
   2026-07-22. Ronacher independently: *"I am not only printing the output to my terminal, I'm also
   always logging it to a file."* [FACT] https://lucumr.pocoo.org/2025/6/12/agentic-coding/ — 2025-06-12.
3. **Blocked-write count.** The five `PreToolUse` hooks already block rule violations **[LOCAL]**; none
   of them *counts*. A spike in blocks is an agent grinding against a rule — the earliest available
   drift signal, and free.
4. **A per-turn evaluator on production runs.** `/goal` sets a condition that a fresh Haiku-class model
   re-checks after every turn and returns a reason for, visible in the transcript. [FACT]
   https://code.claude.com/docs/en/goal. This is the only mechanism in the stack that catches drift
   *while it happens* without a human present. Anthropic's own framing: the Stop-hook and `/goal`
   versions "are what let an unattended run finish correctly without you." [FACT] best-practices.

Plus the recovery mechanism, which is not drift detection but is what makes tolerating drift cheap:
`/rewind` checkpoints, with the documented caveat that **Bash-made changes are not captured**, so git
commits still matter. [FACT] best-practices.

## 4.4 What NOT to do

Do not stream agent output to her. Do not build a live activity feed. Steinberger, who actually runs
3–8 agents at once, tried the orchestration tools — *"Conductor, Terragon, and Sculptor"* — and none
stuck. [FACT] steipete.me, 2025-10-14. Anthropic's own guidance for agent view is *"Most of the time
the peek panel is enough and you don't need to open the full transcript."* [FACT] agent-view doc.

---

# 5. What the field actually does

Named practitioners, primary sources, including what they say fails.

**Peter Steinberger** — solo, ~300k LOC, 3–8 Claude Code agents in a 3×3 terminal grid.
[FACT] https://steipete.me/posts/just-talk-to-it — 2025-10-14.
- Monitors by **asking, not watching**: *"If something takes longer than I anticipated, I just hit
  escape and ask 'what's the status'."*
- **Does not work:** orchestration UIs (Conductor, Terragon, Sculptor) — tried, none stuck. Subagents —
  *"it's far harder to view and steer or control what is sent back."* Worktrees — reverted. RAG and
  most MCPs — dismissed as context waste.

**Simon Willison** — fires off *"2-3 code research projects a day"* asynchronously.
[FACT] https://simonw.substack.com/p/code-research-projects-with-async — 2025-11-11.
- *"Come up with a clear goal, turn it into a few paragraphs of prompt, set them loose and check back
  ten minutes later to see what they've come up with."* — **no monitoring at all between dispatch and
  result.**
- His trust model is *verification, not observation*: *"the code itself doesn't lie: if they write code
  and execute it and it does the right things then they've demonstrated… that something really does work."*
- **Does not work:** taking the report at face value — *"I've not been reviewing these reports in great
  detail myself, and I wouldn't usually publish them online without some serious editing and verification."*

**Armin Ronacher.**
[FACT] https://lucumr.pocoo.org/2025/6/12/agentic-coding/ — 2025-06-12, and
https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/ — 2025-07-30.
- *"My general workflow involves assigning a job to an agent… and then waiting for it to complete the
  task. I rarely interrupt it."*
- Observability = **log to a file**, always.
- **Does not work:** hooks (*"I tried hard to make hooks work, but I haven't seen any efficiency gains
  from them yet"*), and five custom slash commands he built and abandoned — the most relevant being
  `/fix-nits`, which *"never became muscle memory."*

**Kieran Klaassen** (Cora / Every) — reported running dozens of agents solo; *"My monitor looks like
mission control: multiple Claude Code tabs."* Reviews at fixed points in the day ("10 a.m. … while all
five instances are working, I review the PR that tab 2 just created"; "11:30 a.m.: Time for human
review. I check business logic, ensure the user experience makes sense").
[FACT] https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa — 2026-01-26.
**[INFERENCE]** The article contains no mention of a dashboard, a monitoring tool, or notifications.
Someone running that many agents solo apparently uses *scheduled human review windows* and *terminal
tabs*, not instrumentation.

**Anthropic's internal teams** — the reported practice is *"starting from a clean git state and
committing checkpoints regularly so they can easily revert any incorrect changes if Claude goes off
track,"* plus autonomous loops reviewed at roughly 80% complete.
[FACT] https://www.anthropic.com/news/how-anthropic-teams-use-claude-code — accessed 2026-07-22.

**The pattern across all five.** Nobody watches. Everybody *asks on demand*, *reviews at checkpoints*,
and *relies on a mechanical check rather than observation*. Purpose-built monitoring UIs are the single
most commonly abandoned category. That is the field's verdict on dashboards, and it matches this
project's own file timestamps exactly.

---

# 6. Approval in chat

## 6.1 The number

Anthropic: *"Our telemetry showed users approved roughly 93% of permission prompts"* and *"The more
approvals a user sees, the less attention they pay to each, becoming over time much less diligent in
their supervision."* [FACT] https://www.anthropic.com/engineering/how-we-contain-claude — 2026-05-25.

That is the ceiling. The floor, in this operation, is the opposite problem: **three decisions sat
unasked for five days** (Section 0). So the target is a narrow band.

**The right number is three real decisions per surfacing, five per week, and never zero.**

Reasoning: the playbook's G1–G5 (canon lock, style/reference lock, batch triage, cut approval, publish)
is five per episode and one episode per week. That is already the right count. What is missing is that
each must be *asked*, with options, at the moment it becomes live.

## 6.2 The protocol

1. **A decision does not exist until it has been posed.** Rule: nothing may carry
   `"status":"blocked"` with `Ali` as owner unless a question with rendered options was asked in chat.
   The `/where` skill enforces this by checking `tasks.json` for blocked-on-Ali items that have no
   matching asked-question record, and asking them on the spot.
2. **Use `AskUserQuestion`, not prose.** 1–4 questions, 2–4 options each, plus a free-text "Other".
   [FACT] agent-sdk/user-input doc. Options are tappable; prose questions require composing a reply.
3. **Every question carries four things:** the actual choice; what happens on each branch; **how many
   things it unblocks** (this is what makes a boring choice feel worth ten seconds — "23 restyle jobs"
   is the difference between a chore and a lever); and **a default that fires on silence**.
4. **Default-on-silence is mandatory.** Nothing waits forever. If she does not answer by a stated day,
   I take the stated default and say so next time. This is the direct fix for the five-day stall.
5. **Cap at three per surfacing.** A fourth displaces the lowest-value one and I name what got bumped.
6. **The cheapness test — do not ask what a script can decide.** If her answer would be the same nine
   times out of ten, do it and report it in one line. Anthropic's own framing of the fatigue mechanism
   applies: *"After the tenth approval you're not really reviewing anymore, you're just clicking
   through."* [FACT] https://code.claude.com/docs/en/best-practices.md.
7. **Never ask her to be the bug-catcher.** Memory `ali-background-learning-style` is explicit:
   *"Automate the tedium… never her judgment."* Mechanical defects go to hooks; taste comes to her.
8. **Redirect is free and always available.** Nothing in the digest requires a reply. `Esc` stops a
   run, `/rewind` undoes it, and the digest always ends with "next unless you redirect me."

## 6.3 The one place a GUI survives — and why it isn't a dashboard

Some decisions genuinely cannot be posed in text. "Which of these two accent colours" and "is this
keystone image right" are Ali-only, image-based judgements
(`ali-background-learning-style`: high-stakes image taste cannot be delegated).

For exactly those, use `mcp__visualize__show_widget`: it "renders inline alongside your text response"
and exposes `sendPrompt(text)`, which "sends a message to chat as if the user typed it." [FACT] tool
definition, this session, 2026-07-22.

That is not a dashboard, on every axis that killed the last three:
- No URL, no bookmark, no localhost, no "open the thing."
- It cannot go stale — it is generated at the moment of the question and then scrolls away.
- It has an end state: you tap, it's answered, it's over. (Section 1: bounded tasks survive.)
- It requires no habit and no navigation.
- Her tap becomes a chat message, so the decision lands in the same transcript as everything else.

Hard constraint on it: **≤6 candidates, always** (memory `dont-make-ali-browse-libraries`), each shown
with what the scene actually is, and a "none of these" button that means *generate*, not *show more*.

---

# 7. The recommendation — one design

## In three sentences

**Delete the idea of a place to look. Build one question — "where are we?" — that runs the checks
live at the moment it is asked and answers in about 250 words of plain text, with at most three
tappable decisions attached and a stated default if she says nothing; the same answer arrives
unasked at session start and on a Monday/Wednesday schedule, so she never has to remember it exists.
The only pixels anywhere in it are inline image-choice widgets that appear in the conversation,
answer one bounded question, and scroll away.**

## What that is, concretely

Five build items. All of them are mine; **Ali's build effort is zero.**

| # | Build | Where | Effort | Why it ranks here |
|---|---|---|---|---|
| **1** | **`SubagentStop` landing-line hook** — append `last_assistant_message` keyed by `agent_id` | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/.claude/hooks/agent-landed.py` + `settings.json` | ~20 min | Without it, drift is *undetectable in principle*. Everything else in this report reads from the ledger this creates. **[LOCAL: 61/62 entries currently have no result]** |
| **2** | **The `/where` skill** — `` !`…` `` blocks running `check_site.py`, the launch/land reconciliation, `git diff --stat`, `tasks.json`, `redo-plan.md`; body = the rendering contract in §3.2 | `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/.claude/skills/where/SKILL.md` | ~1 hr | The one command. Shell runs *before* I see anything, so the answer cannot be stale or invented. **[FACT, skills doc]** |
| **3** | **Regenerate the session-start injection** — replace the hard-coded "CURRENT STATE" prose with the §2 top block from the same script | `/Users/alisoneakin/.../.claude/hooks/inject-session-context.py` | ~30 min | It is 5 days stale today and points me at the dead Workspace app. `SessionStart` re-runs on resume, so it self-refreshes. **[FACT, hooks doc]** |
| **4** | **The decision protocol** — no blocked-on-Ali item without a posed `AskUserQuestion`; ≤3 per surfacing; default-on-silence | enforced inside the `/where` skill | ~30 min | Fixes the actual observed failure: 3 decisions, 5 days, never asked. **[LOCAL]** |
| **5** | **Durable schedule** — Monday 08:00 and Wednesday 07:00 digest | Desktop scheduled task (not `/loop` — 7-day expiry) | ~15 min | Removes the "remember to ask" dependency that killed Ronacher's slash commands. **[FACT]** |

Optional, later, low value here: a statusline. It is real and free, but she works in the desktop app
and a statusline mostly reports context/cost, which are my problems, not hers. **Rank it last.**

## Does any GUI survive? Yes — exactly one, and it has no address

**Survives:** the inline `show_widget` image-choice card, for image and colour decisions only.

**Dies (stop maintaining, stop referencing — do not delete):**
- `/Users/alisoneakin/.../Website-homepage/operations/weekly-command-center.html` — 6 weeks stale,
  instructs a PowerShell command
- `/Users/alisoneakin/.../Website-homepage/operations/ops/ops-centre.html` and `build_dashboard.py`
- `/Users/alisoneakin/.../Website-homepage/operations/ops/workspace.py` as a *standing* destination

Memory `dont-remove-working-features` applies: **do not delete any of them.** `workspace.py` holds
Ali's real curation verdicts behind it and is a perfectly good tool for the next bounded sorting job —
that is what it is *for*. What must stop is treating any of them as the place where status lives. The
one required edit is removing the pointer to `workspace.py` from `inject-session-context.py`, because
that line makes me tell Ali about a dead app at the start of every session.

**Terminal/CLI artifacts:** agent view (`claude agents`) is genuinely excellent, and it is **my**
instrument, not hers. If she ever wants it, it costs nothing — but nothing in this design assumes she
will ever type it.

## Why a file-based artifact isn't the same mistake as the last three

The `/where` skill is a Markdown file. That is not a contradiction, because the failure was never the
format.

|  | The three dashboards | The `/where` skill |
|---|---|---|
| Who opens it | Ali | nobody — I read it |
| Is it a copy of state? | yes — must be rebuilt to stay true | no — it *runs* the source at ask time |
| Can it be stale? | yes, and silently (`"generated": null`) | structurally impossible |
| Does it need a habit? | yes | no — three delivery doors, none requiring memory |
| Does it have an end state? | no | yes — you read 250 words, you're done |
| What it answers | "what is the state of the site" | "what's left, what's stuck, what do you need from me" |

**The dashboards were files addressed to Ali. This is a file addressed to me.** That is the whole
difference, and it is the same difference that makes `state.json`, `curation.json` and
`session-snapshot.md` alive today while the HTML is frozen.

---

# 8. Would this have caught the Ep5 master file?

**Honest answer: no, and it was never going to.** Judging whether an explanation is any good is
Question A's job, and memory `ep5-usefulness-critique-2026-07-10` is explicit that usefulness *"is
ONLY Ali's call."*

**What it would have caught is the thing that actually went wrong**, which is different and arguably
worse. On 2026-07-10 the fix was decided and written down — *"substance-first: write the plain,
correct, genuinely-useful 'which model for what + why' as notes; Ali confirms it's useful; only THEN
write prose."* It was never executed. Twelve days later the draft still has the same six defects, and
the brief names that gap — *"ruling recorded, draft unchanged"* — as the enforcement problem in one
example.

A digest with **age on every stuck item** and **a decision that must be posed, not merely recorded**
would have said, on every single one of the twelve days:

> Ep5 — stopped 12 days. The agreed next step (substance notes for you to confirm) has never been
> produced. Want them tonight? [Yes / Not this week / Change the plan]

It cannot make the writing good. It can make an un-started fix impossible to forget, and it can stop a
decision from silently aging out. **[OPINION]** For this operation that is the larger of the two
problems, because the standard is not missing — the brief establishes that — it is just never reached.

---

# 9. Not worth building

- **Another HTML dashboard, in any form.** Three data points, one of them a live app.
- **A real-time agent activity feed for Ali.** Every practitioner who tried the equivalent abandoned it.
- **A web approval UI.** `AskUserQuestion` already does this in the conversation.
- **A statusline as the primary answer.** It is real and free but reports my metrics, not hers.
- **`/loop` for the recurring digest.** It expires after 7 days and dies when the session ends
  [FACT, scheduled-tasks doc]. Use a Desktop scheduled task.
- **Publishing the digest as an Artifact / hosted page.** That is a URL she must open. It is the exact
  mistake, in the newest available clothing.
- **A second run-log format.** Fix the one that exists; do not start a third file.

---

# 10. Open questions / could not verify

1. Whether a `PushNotification` capability is available in Ali's sessions — referenced in the Monitor
   tool documentation, no schema retrievable here. **[NOT VERIFIED]**
2. Whether the terminal statusline renders in Claude Code desktop sessions. **[NOT VERIFIED]**
3. Whether `mcp__visualize__show_widget` and `mcp__ccd_session__spawn_task` are enabled in her own
   main sessions, or only in this subagent harness. They are present here, inside her project, which
   strongly suggests yes — but I did not confirm it from her side. **[INFERENCE, needs a 10-second check]**
4. Why the missing-header count grew from 21 to 50 between 2026-07-17 and 2026-07-22. The numbers are
   verified; the cause is not. **[NOT VERIFIED]**
5. Whether Ali ever actually opened `ops-centre.html` or `weekly-command-center.html` at all. I inferred
   abandonment from mtimes and from staleness she would certainly have flagged; I have no access log.
   **[INFERENCE]**

---

## Sources

- Anthropic, *How we contain Claude* — https://www.anthropic.com/engineering/how-we-contain-claude (2026-05-25)
- Claude Code, *Best practices* — https://code.claude.com/docs/en/best-practices.md (fetched 2026-07-22)
- Claude Code, *Hooks reference* — https://code.claude.com/docs/en/hooks.md (fetched 2026-07-22)
- Claude Code, *Extend Claude with skills* — https://code.claude.com/docs/en/skills (fetched 2026-07-22)
- Claude Code, *Customize your status line* — https://code.claude.com/docs/en/statusline (fetched 2026-07-22)
- Claude Code, *Keep Claude working toward a goal* — https://code.claude.com/docs/en/goal (fetched 2026-07-22)
- Claude Code, *Run prompts on a schedule* — https://code.claude.com/docs/en/scheduled-tasks (fetched 2026-07-22)
- Claude Code, *Manage multiple agents with agent view* — https://code.claude.com/docs/en/agent-view (fetched 2026-07-22)
- Claude Code, *Handle approvals and user input* — https://code.claude.com/docs/en/agent-sdk/user-input (fetched 2026-07-22)
- Anthropic, *How Anthropic teams use Claude Code* — https://www.anthropic.com/news/how-anthropic-teams-use-claude-code (accessed 2026-07-22)
- Anthropic, *Enabling Claude Code to work more autonomously* — https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously (2025-09-29)
- Peter Steinberger, *Just Talk To It* — https://steipete.me/posts/just-talk-to-it (2025-10-14)
- Simon Willison, *Code research projects with async coding agents* — https://simonw.substack.com/p/code-research-projects-with-async (2025-11-11)
- Simon Willison, *Agentic Engineering Patterns* — https://simonwillison.net/guides/agentic-engineering-patterns/ (2026-02/03)
- Armin Ronacher, *Agentic Coding Recommendations* — https://lucumr.pocoo.org/2025/6/12/agentic-coding/ (2025-06-12)
- Armin Ronacher, *Agentic Coding Things That Didn't Work* — https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/ (2025-07-30)
- Kieran Klaassen, *How I Use Claude Code to Ship Like a Team of Five*, Every — https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa (2026-01-26)

Local evidence, all inspected 2026-07-22, under
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/`:
`Website-homepage/operations/weekly-command-center.html` · `Website-homepage/operations/ops/ops-centre.html` ·
`Website-homepage/operations/ops/build_dashboard.py` · `Website-homepage/operations/ops/check_site.py` ·
`Website-homepage/operations/ops/workspace.py` · `Website-homepage/operations/ops/workspace-plan.md` ·
`Website-homepage/operations/ops/state.json` · `tasks.json` · `agents.json` · `redo-plan.md` ·
`session-snapshot.md` · `agent-runlog.md` · `.claude/settings.json` · `.claude/hooks/agent-runlog.py` ·
`.claude/hooks/inject-session-context.py`
