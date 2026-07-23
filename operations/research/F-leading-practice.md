# F — Leading practice: how teams and solo operators actually run Claude for sustained production

**Compiled:** 2026-07-22. All URLs fetched or re-verified 2026-07-22 UTC unless a fetch failure is noted.
**Extends:** `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/research/agent-operations-playbook.md` (2026-07-21).
**Does not repeat it.** Where the playbook was right, this report says so in one line and moves on.

Labels, same four as the playbook: **[FACT]** = stated in a primary document I fetched · **[OPINION]** = a named person's or vendor's position · **[INFERENCE]** = my reasoning · **[NOT VERIFIED]** = could not confirm against a primary source · **[LOCAL]** = established by direct inspection of this repo on 2026-07-22.

---

## The headline, before anything else

The playbook was compiled one day before this report, so almost nothing has *changed* since 2026-07-21. But the playbook **missed an entire published body of Anthropic work that is specifically about the question this report asks**. Its source list contains six Anthropic engineering posts. The engineering blog index carries **twenty-five**, and the four most directly relevant to running an agent through a recurring, deadline-bound production job were all absent:

| Post | Date | Why it matters here |
|---|---|---|
| **Effective harnesses for long-running agents** | 2025-11-26 | Names the four failure modes of multi-session agent work, and the initializer/coder split |
| **Building a C compiler with a team of parallel Claudes** | 2026-02-05 | The most detailed public account anywhere of a two-week unattended agent run, with costs and failures |
| **Harness design for long-running application development** | 2026-03-24 | Planner/generator/evaluator; **and the only Anthropic document that shows how to grade *subjective* quality** |
| **Scaling Managed Agents: decoupling the brain from the hands** | 2026-04-08 | Resumability architecture: stateless loop, durable event log |

Plus a working code artifact — **`github.com/anthropics/cwc-long-running-agents`** — that ships the three primitives as readable hook scripts.

Source: <https://www.anthropic.com/engineering> (index fetched 2026-07-22).

**[INFERENCE] The single most important finding in this report:** Anthropic has published, in the harness-design post of 2026-03-24, a worked method for making *subjective creative quality* into something an automated gate can act on. The playbook concluded (correctly, from the sources it had) that no such thing existed and that the founder's taste could not be delegated. The harness-design post does not claim to replace taste either — but it shows how to convert taste into a **calibrated rubric with few-shot examples**, graded by a **fresh-context evaluator that never saw the draft being written**. This operation already owns the two artifacts that method requires: a labelled PASS example and a labelled FAIL example. That is the calibration pair in the brief.

---

# 1. Anthropic's own current guidance

## 1.1 The harness lineage — four posts, one argument

Anthropic's published position on sustained agent work is not in the "building effective agents" post the playbook leans on. It is in a four-post sequence that builds one argument: **the model is not the system; the harness is the system, and the harness is where your deadline lives.**

### (a) *Effective harnesses for long-running agents*, 2025-11-26
<https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>

The framing problem, verbatim **[FACT]**: agents working across multiple context windows face the fact that "each new session begins with no memory of what came before."

Four observed failure modes, verbatim **[FACT]**:

1. **Premature completion** — "After some features had already been built, a later agent instance would look around, see that progress had been made, and declare the job done."
2. **Over-ambition** — "the agent tended to try to do too much at once—essentially to attempt to one-shot the app."
3. **Inadequate testing** — "Claude tended to make code changes, and even do testing with unit tests or `curl` commands against a development server, but would fail recognize that the feature didn't work end-to-end."
4. **Environmental neglect** — the agent leaves the project "with bugs or undocumented progress."

And the load-bearing sentence **[FACT]**: "Even a frontier coding model like Opus 4.5 running on the Claude Agent SDK in a loop across multiple context windows will fall short of building a production-quality web app if it's only given a high-level prompt."

The prescribed structure **[FACT]**: an **initializer agent** that runs once and produces a feature list (200+ requirements, every one marked failing), an `init.sh`, a `claude-progress.txt`, and an initial git commit; then a **coding agent** that on every subsequent session reads the progress file and git log, works on **"only one feature at a time,"** verifies through browser automation, and commits with descriptive messages.

The post provides **no quantified results** — only qualitative observation from internal experimentation. Noted honestly.

**[INFERENCE] Direct read-across to LAiDIES.** Failure mode 1 is the Ep5 problem restated. The draft "looked like a script," so the loop stopped. Failure mode 3 is `check-episode.sh` exactly: it runs the equivalent of a unit test (grep for banned phrases) and does not notice the feature doesn't work end-to-end (is the explanation any good).

### (b) *Harness design for long-running application development*, 2026-03-24
<https://anthropic.com/engineering/harness-design-long-running-apps> — note the URL is `harness-design-long-running-apps`, not the longer slug.

This is the most useful single document for this operation. The architecture is **three agents** **[FACT]**:

- **Planner** — takes a 1–4 sentence prompt and expands it into a full product specification. It is "instructed to be ambitious about scope" and deliberately *not* to over-specify technical detail, because early over-specification cascades errors downstream.
- **Generator** — implements, and self-evaluates before handoff.
- **Evaluator** — tests the running product **like a user would** (via Playwright MCP), and grades against both the bugs it found and an explicit criteria set.

The stated reason the evaluator exists, verbatim **[FACT]**: "A second issue, which we haven't previously addressed, is self-evaluation." And: **"Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue."**

Measured costs and durations **[FACT]**:

| Run | Duration | Cost |
|---|---|---|
| Retro game maker, solo agent | 20 min | $9 |
| Retro game maker, full harness | 6 hours | $200 |
| DAW, updated harness on Opus 4.6 | 3 h 50 m | $124.70 |
| — planner phase | 4.7 min | $0.46 |
| — build phases | 3 h 20 m | $113.85 |
| — QA phases | 25.2 min | $10.39 |

What the solo run produced, verbatim **[FACT]**: layout that "wasted space, with fixed-height panels leaving most of the viewport empty"; a game where "entities appeared on screen but nothing responded to input"; and wiring that was "broken, with no surface indication of where."

**The part that matters most to LAiDIES — grading subjective quality.** Verbatim **[FACT]**:

> "while aesthetics can't be fully reduced to a score—and individual tastes will always vary—they can be improved with grading criteria that encode design principles and preferences."

The four rubric dimensions used, verbatim **[FACT]**:

- **Design quality:** "Does the design feel like a coherent whole rather than a collection of parts?"
- **Originality:** "Is there evidence of custom decisions, or is this template layouts, library defaults, and AI-generated patterns?"
- **Craft:** "Technical execution: typography hierarchy, spacing consistency, color harmony, contrast ratios."
- **Functionality:** "Usability independent of aesthetics."

And the calibration method, verbatim **[FACT]**: **"I calibrated the evaluator using few-shot examples with detailed score breakdowns."**

Also **[FACT]**: "The practical implication is that the evaluator is not a fixed yes-or-no decision." It is a score with findings.

And on context, verbatim **[FACT]**: the Opus 4.5 harness needed context resets between sessions because "Claude Sonnet 4.5 exhibited context anxiety strongly enough that compaction alone wasn't sufficient to enable strong long task performance." On Opus 4.6 the same system ran "coherently for over two hours without the sprint decomposition that Opus 4.5 had needed," with automatic compaction handling context growth.

Closing claim, verbatim **[FACT]**: "the space of interesting harness combinations doesn't shrink as models improve. Instead, it moves."

### (c) *Scaling Managed Agents: decoupling the brain from the hands*, 2026-04-08
<https://www.anthropic.com/engineering/managed-agents>

Anthropic's production architecture for hosted long-horizon agents **[FACT]**:

- The first design put session, harness and sandbox in one container — they describe it as adopting "a 'pet' rather than 'cattle'," and the consequence: **"if a container failed, the session was lost."**
- The fix: separate **brain** (model + harness), **hands** (sandbox/tools), and **session** (an append-only event log outside Claude's context window).
- The harness becomes stateless: **"Nothing in the harness needs to survive a crash."** A crashed harness calls `wake(sessionId)` / `getSession(id)` and resumes from the last recorded event.
- Lazy container provisioning: **"p50 TTFT dropped roughly 60% and p95 dropped over 90%."**
- Credentials are never present in the sandbox where Claude's generated code runs.

**[INFERENCE]** The transferable idea for a one-person operation is not the infrastructure — it is the principle that **the durable record of a production run must live on disk in an append-only artifact, not in a conversation.** A weekly episode run whose state lives in a chat transcript is a "pet."

### (d) *Building a C compiler with a team of parallel Claudes*, 2026-02-05, by Nicholas Carlini
<https://www.anthropic.com/engineering/building-c-compiler>

The most detailed public account of unattended multi-day agent operation **[FACT]**:

- 16 parallel agents, **"nearly 2,000 Claude Code sessions"** over two weeks, on Opus 4.6, producing a 100,000-line Rust C compiler that builds Linux 6.9 on x86, ARM and RISC-V.
- **"2 billion input tokens and generated 140 million output tokens, a total cost just under $20,000."**
- The harness is a bash loop: "When it finishes one task, it immediately picks up the next."
- Task locking via git: **"Claude takes a 'lock' on a task by writing a text file to `current_tasks/`."**

Two named LLM limitations the environment had to be designed around **[FACT]**:

- **Context-window pollution** — "The test harness should not print thousands of useless bytes. At most, it should print a few lines of output and log all important information to a file." And errors must be greppable: "Claude should write ERROR and put the reason on the same line so grep will find it."
- **Time blindness** — **"Claude can't tell time and, left alone, will happily spend hours running tests instead of making progress."** Mitigated with a `--fast` mode taking a deterministic 1% or 10% random sample, seeded differently per agent.

The supervision principle, verbatim **[FACT]**: **"Claude will work autonomously to solve whatever problem I give it. So it's important that the task verifier is nearly perfect."**

Documented failures **[FACT]**: 16-bit x86 code generation failed outright and required falling back to GCC; the assembler and linker remained "somewhat buggy"; generated code is markedly less efficient than GCC with optimisations off; and **"New features and bugfixes frequently broke existing functionality"** — which forced adding CI and stricter regression enforcement late in the project.

One more practical note **[FACT]**: READMEs and progress files needed constant updating because "each agent is dropped into a fresh container with no context and will spend significant time orienting itself."

## 1.2 The code artifact: `anthropics/cwc-long-running-agents`

<https://github.com/anthropics/cwc-long-running-agents> — created 2026-05-06, last pushed 2026-05-13, 588 stars as of 2026-07-22 (GitHub API). Built as the take-home for the Long-Running Agents station at Code with Claude 2026. Its own README says **[FACT]**: "These are example ingredients, not a turnkey harness. Event demo; not maintained and not accepting contributions."

It reduces the two harness posts to **three primitives** **[FACT]**:

**1. Default-FAIL contract.** Every criterion starts `false` in a `test-results.json`. A `PreToolUse` hook **denies any write to the results file unless the agent has first opened an evidence file with the Read tool.** The README's justification, verbatim: **"Agents will mark a feature 'passing' after a unit test or a curl when the UI is visibly broken. Asking nicely in the prompt doesn't reliably stop this. The harness makes 'done' structural."**

**2. Fresh-context evaluator.** A subagent with **no Write/Edit tools** that reviews the diff and screenshots "from a context window that never saw the build," returning `PASS` or `NEEDS_WORK` with specific findings. On `NEEDS_WORK` the findings become the next builder session's opening prompt.

**3. Agent-maintained handoff.** Verbatim: "A fresh session has no memory of what the previous one did, and when a long session fills its context window Claude Code summarizes the history, which loses detail. So the agent maintains the handoff itself" — one feature per session, a structured `PROGRESS.md` re-read first thing on restart, and git commits at checkpoints, with a `commit-on-stop.sh` Stop hook as backstop.

A fourth piece is named but deliberately not shipped, verbatim **[FACT]**: **"A fourth core piece, a *rubric for subjective work*, isn't shipped here because it's project-specific."** That is exactly the piece LAiDIES needs and exactly the piece nobody can ship for it.

Two operator controls worth stealing wholesale **[FACT]**:

- `kill-switch.sh` — halts every tool call while an `AGENT_STOP` file exists at the project root.
- `steer.sh` — surfaces the contents of `STEER.md` to the agent once, then clears it, "so you can redirect mid-run without restarting."

And the observation pattern, verbatim **[FACT]** — no dashboard, just `watch` on files:

```
watch -n 2 'tail -20 PROGRESS.md'
watch -n 5 'git log --oneline -8'
watch -n 5 'find screenshots -name "*.png" | tail -5'
```

**[INFERENCE]** This directly satisfies the locked `chat-is-the-one-place` rule: it is monitoring that requires no dashboard and no screen-toggling.

Related official artifacts, all fetched 2026-07-22:
- `anthropics/claude-quickstarts/autonomous-coding` — a runnable two-agent (initializer + coder) SDK harness. Its README states plainly **[FACT]**: "**Warning: This demo takes a long time to run!**… Each coding iteration can take **5-15 minutes**… Building all 200 features typically requires **many hours**."
- `anthropics/claude-plugins-official/plugins/ralph-loop` — Anthropic's official packaging of Geoffrey Huntley's Ralph technique, implemented as a **Stop hook that blocks exit and re-feeds the same prompt**, with `--max-iterations` and a `--completion-promise` string.
- `anthropics/claude-plugins-official/plugins/frontend-design` — the design-quality skill behind the harness post's rubric work.

## 1.3 Claude Code product mechanics the playbook did not cover

All from <https://code.claude.com/docs/> fetched 2026-07-22.

**`/goal`** (`/docs/en/goal`, requires v2.1.139+) **[FACT]**. Sets a completion condition; after every turn "a small fast model checks whether the condition holds. If not, Claude starts another turn instead of returning control to you." It is explicitly **"a wrapper around a session-scoped prompt-based Stop hook."** Key constraints:
- The evaluator **"does not call tools, so it can only judge what Claude has already surfaced in the conversation."** Conditions must be provable from the transcript.
- Condition limit 4,000 characters. One goal per session. Bound it with a clause like `or stop after 20 turns`.
- Works in headless mode: `claude -p "/goal CHANGELOG.md has an entry for every PR merged this week"`. With default text output "nothing prints until the condition is met"; add `--output-format stream-json --verbose`.
- Survives resume: the condition carries over on `--resume`, but turn count, timer and token baseline reset.
- Evaluator runs on the configured small fast model (Haiku by default); "typically negligible" cost.
- Unavailable if `disableAllHooks` is set at any level.

**The three-way scheduling comparison** (`/docs/en/scheduled-tasks`) **[FACT]** — this is the piece a weekly deadline actually needs:

| | Cloud (Routines) | Desktop scheduled task | `/loop` |
|---|---|---|---|
| Runs on | Anthropic cloud | Your machine | Your machine |
| Requires machine on | No | Yes | Yes |
| Requires open session | No | No | Yes |
| Persistent across restarts | Yes | Yes | Restored on `--resume` if unexpired |
| Access to local files | **No (fresh clone)** | **Yes** | Yes |
| Permission prompts | No (runs autonomously) | Configurable | Inherits |
| Minimum interval | 1 hour | 1 minute | 1 minute |

Session-scoped `/loop` tasks **expire after 7 days** — "The task fires one final time, then deletes itself. This bounds how long a forgotten loop can run" **[FACT]**. A session can hold up to 50 scheduled tasks. The scheduler adds deterministic jitter of up to 30 minutes to recurring fires, so "if exact timing matters, pick a minute that is not `:00` or `:30`."

**Routines** (`/docs/en/routines`, research preview) **[FACT]**: a saved prompt + repos + connectors, triggered on a schedule / by HTTP POST / by GitHub event, running on Anthropic infrastructure "so they keep working when your laptop is closed." Available on Pro, Max, Team, Enterprise with Claude Code on the web. Created at claude.ai/code/routines or with `/schedule` in the CLI. Two warnings that matter:
- **"The prompt is the most important part: the routine runs autonomously, so the prompt must be self-contained and explicit about what to do and what success looks like."**
- **"A green status in the run list means the session started and exited without an infrastructure error. It does not mean the task in your prompt succeeded."**
- Routines get **no local file access** — each run is a fresh clone of a GitHub repo. **[INFERENCE]** That is disqualifying for LAiDIES' art/audio pipeline, which lives on an iCloud-backed local tree with large binaries. Desktop scheduled tasks are the applicable option, not cloud routines.

**Checkpointing** (`/docs/en/checkpointing`) **[FACT]** — and the limitations are the important half:
- Every user prompt creates a checkpoint; snapshots kept for the **100 most recent** per session; cleaned up with sessions after 30 days.
- `/rewind` (or double-`Esc` on an empty prompt) offers restore-code, restore-conversation, restore-both, **"Summarize from here"** and **"Summarize up to here"**.
- **Bash-modified files are not tracked.** "if Claude Code runs `rm file.txt` / `mv` / `cp`… These file modifications cannot be undone through rewind."
- External and concurrent-session changes not captured. Symlinked and hard-linked paths are skipped on restore.
- **"Checkpoints complement but don't replace proper version control."**

**[INFERENCE] This is a live risk in this operation.** LAiDIES pipelines move media with `ffmpeg`, `mv` and Python scripts. None of that is checkpointed. Git is the only real undo for the asset tree.

**What survives compaction** (`/docs/en/context-window`) **[FACT]**:

| Mechanism | After compaction |
|---|---|
| System prompt and output style | Unchanged; not part of message history |
| Project-root CLAUDE.md and unscoped rules | Re-injected from disk |
| Auto memory | Re-injected from disk |
| Rules with `paths:` frontmatter | **Lost until a matching file is read again** |
| Nested CLAUDE.md in subdirectories | **Lost until a file in that subdirectory is read again** |
| Invoked skill bodies | Re-injected, capped at **5,000 tokens per skill and 25,000 total**; oldest dropped first |
| Hooks | N/A — hooks run as code, not context |

Also **[FACT]**: skill bodies are truncated from the end, so "put the most important instructions near the top of `SKILL.md`." And a documented long-session failure: "If a single file or tool output is so large that context refills immediately after each summary, Claude Code stops auto-compacting after a few attempts and shows an error instead of looping."

**Advisor tool** (`/docs/en/advisor`, experimental, Anthropic API only) **[FACT]**. Claude consults a stronger model "before committing to an approach, when stuck on a recurring error, or before declaring a task complete." The advisor receives the full conversation. Enabled with `/advisor opus`, `advisorModel` in settings, or `--advisor`. Toggling it **does not invalidate the main model's prompt cache**. Subagents inherit it. Not available on Bedrock/Vertex/Foundry.

**Output styles** (`/docs/en/output-styles`) **[FACT]**. "Output styles change how Claude responds, not what Claude knows. They modify the system prompt to set role, tone, and output format." `keep-coding-instructions: false` (the default) **removes Claude Code's built-in software-engineering instructions**, including "how to scope changes, write comments, and verify work." Styles apply to the main conversation only — **subagents run their own system prompt and are unaffected**. Note the standalone `/output-style` command was removed in v2.1.91; use `/config` or the `outputStyle` setting.

**Agent teams** (`/docs/en/agent-teams`, experimental, off by default behind `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) **[FACT]**. Read the limitations section before considering it: no session resumption with in-process teammates; "task status can lag — teammates sometimes fail to mark tasks as completed, which blocks dependent tasks"; shutdown is slow; one team per session; no nested teams; lead is fixed. And the explicit scoping advice: **"For sequential tasks, same-file edits, or work with many dependencies, a single session or subagents are more effective."** Recommended size 3–5 teammates, 5–6 tasks each. **"Two teammates editing the same file leads to overwrites."** **"Letting a team run unattended for too long increases the risk of wasted effort."**

**Recent hard caps** (changelog, `/docs/en/changelog`, fetched 2026-07-22) **[FACT]** — these are new since the playbook's model-per-task section was written and they bound any fan-out design:
- v2.1.212 (2026-07-17): per-session subagent cap default **200** (`CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`); session-wide **WebSearch limit default 200** (`CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`); MCP calls over 2 minutes auto-background.
- v2.1.217 (2026-07-21): subagent **concurrency cap default 20** (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`); **nested subagent spawning disabled by default**.
- v2.1.215 (2026-07-19): **breaking** — "Claude no longer auto-runs `/verify` and `/code-review` skills — invoke them explicitly."
- v2.1.216 (2026-07-20): "Fixed quadratic slowdown in long sessions from message normalization." **[INFERENCE]** If long LAiDIES sessions have felt like they get sluggish over hours, that had a real cause and it is fixed as of 2026-07-20.

## 1.4 Anthropic's own internal-use account

*How Anthropic teams use Claude Code*, <https://claude.com/blog/how-anthropic-teams-use-claude-code>, **published 2025-07-24** **[FACT]**. It is a year old and should be read as such.

The parts relevant to sustained non-engineering production **[FACT]**:
- **Product Design:** "give Claude abstract problems, let it work autonomously, then review solutions" — with periodic human review during the autonomous iteration.
- **Growth Marketing:** an agentic workflow that ingests CSVs of hundreds of ads with performance metrics, identifies underperformers, and generates variations within character limits; plus a Figma plugin generating 100 ad variants by headline/description swapping. This is the closest thing in the document to a recurring creative production job.
- **Security Engineering:** design doc → pseudocode → Claude guides through tests, replacing a prior pattern of "design doc → janky code → refactor → give up on tests."
- The recurring cross-team lessons: write a detailed CLAUDE.md; **commit checkpoints often so you can revert**; paste screenshots instead of describing; and **learn which tasks can run on their own versus which need you watching**.

**[NOT VERIFIED]** A widely circulated "80% of Anthropic's new production code is authored by Claude" figure appears in VentureBeat (<https://venturebeat.com/technology/anthropic-says-80-of-its-new-production-code-is-now-authored-by-claude>). I did not locate a primary Anthropic page stating it. Do not cite it.

## 1.5 A postmortem worth reading for operational reasons

*An update on recent Claude Code quality reports*, <https://www.anthropic.com/engineering/april-23-postmortem>, 2026-04-23 **[FACT]**. Three overlapping changes degraded Claude Code (not the API) for roughly six weeks:

1. **2026-03-04 → 2026-04-07:** default reasoning effort changed from `high` to `medium` to cut latency. Reverted.
2. **2026-03-26 → 2026-04-10:** a caching change meant to clear old thinking from sessions idle over an hour instead **dropped reasoning every turn for the rest of the session**, making Claude "forgetful and repetitive."
3. **2026-04-16 → 2026-04-20:** a system-prompt instruction to "keep text between tool calls to ≤25 words" "hurt coding quality." Reverted.

Anthropic's own account of why it took six weeks: the reports were "challenging to distinguish from normal variation in user feedback," internal evals did not reproduce them, and each issue hit different segments on different timelines, producing an appearance of "broad, inconsistent degradation."

**[INFERENCE] The operational lesson for LAiDIES is not about Anthropic — it is about attribution.** If output quality drops, "the model got worse" and "my prompt/harness drifted" are indistinguishable without a fixed reference. The calibration pair in the brief (`episode-01.canon.md` = PASS, `episode-05-elevenlabs-v3-tagged.txt` = FAIL) is exactly such a fixed reference. Running the grader against those two files on a schedule is a *regression test on the grader itself*, and it is the only way to tell a bad week from a broken gate.

---

# 2. Long-horizon and unattended operation: what actually breaks

Grouped by what fails, with the evidence, not just the feature that claims to fix it.

## 2.1 What fails at hour 3 that didn't at minute 10

| Failure | Evidence | Source |
|---|---|---|
| **The agent declares victory on partial work** | "a later agent instance would look around, see that progress had been made, and declare the job done" | Anthropic, 2025-11-26 **[FACT]** |
| **The agent grades its own work generously** | "Agents will mark a feature 'passing' after a unit test or a curl when the UI is visibly broken. **Asking nicely in the prompt doesn't reliably stop this.**" | `cwc-long-running-agents` README **[FACT]** |
| **New work breaks old work, invisibly** | "New features and bugfixes frequently broke existing functionality" — required adding CI and stricter regression enforcement | Carlini, 2026-02-05 **[FACT]** |
| **The agent burns hours on the wrong activity because it can't feel time** | "Claude can't tell time and, left alone, will happily spend hours running tests instead of making progress." | Carlini, 2026-02-05 **[FACT]** |
| **Verbose tool output poisons the context** | "The test harness should not print thousands of useless bytes." | Carlini, 2026-02-05 **[FACT]** |
| **Compaction silently drops your rules** | Path-scoped rules and nested CLAUDE.md are "Lost until a matching file is read again"; skill bodies capped at 5k/25k tokens with oldest dropped | Claude Code context-window docs **[FACT]** |
| **Compaction alone is insufficient at the model's coherence limit** | "context anxiety strongly enough that compaction alone wasn't sufficient" (Sonnet 4.5); resolved on Opus 4.6, which ran "coherently for over two hours" | Anthropic, 2026-03-24 **[FACT]** |
| **Auto-compaction can thrash** | "If a single file or tool output is so large that context refills immediately after each summary, Claude Code stops auto-compacting after a few attempts and shows an error" | Claude Code docs **[FACT]** |
| **Checkpoints don't cover shell-moved files** | "if Claude Code runs `rm file.txt`… These file modifications cannot be undone through rewind." | Claude Code checkpointing docs **[FACT]** |
| **A crashed process loses the session if state lives in the process** | "if a container failed, the session was lost" — fixed by externalising state to an append-only log | Anthropic, 2026-04-08 **[FACT]** |
| **A "green" scheduled run does not mean the work succeeded** | "A green status… does not mean the task in your prompt succeeded." | Claude Code routines docs **[FACT]** |
| **Unattended teams waste effort** | "Letting a team run unattended for too long increases the risk of wasted effort." | Claude Code agent-teams docs **[FACT]** |

## 2.2 The countermeasures, ranked by how much evidence stands behind them

1. **A fresh-context evaluator that never saw the work.** Strongest support of anything in this report: named as "a strong lever" in the harness-design post **[FACT]**, shipped as a primitive in `cwc-long-running-agents` **[FACT]**, built into the product as `/goal` **[FACT]**, and independently arrived at by Cognition, who measure it catching "an average of 2 bugs per pull request, with 58% being severe" **[FACT]**, see §4.
2. **A structural default-FAIL contract with an evidence precondition.** A `PreToolUse` hook that denies the "mark it done" write until an evidence file has been read **[FACT]**. This is the mechanism that survives "asking nicely."
3. **State on disk, not in the conversation.** `PROGRESS.md` re-read at every session start, plus git commits at checkpoints, plus a `commit-on-stop` Stop hook **[FACT]**. Carlini's version: keep READMEs and progress files current because "each agent is dropped into a fresh container with no context."
4. **One unit of work per session.** "only one feature at a time" **[FACT]** — the direct countermeasure to over-ambition.
5. **Quiet, greppable tool output.** Log to files; print a few lines; `ERROR` and the reason on one line **[FACT]**.
6. **Bounded runs.** `--max-iterations` (ralph-loop), an `or stop after N turns` clause in a `/goal` condition, the 7-day `/loop` expiry, `task_budget` on the API (documented in the playbook at D1e) **[FACT]**.
7. **A kill switch and a steering file.** `AGENT_STOP` and `STEER.md` **[FACT]** — intervention without restart.
8. **Re-simplify after every model upgrade.** From *Harnessing Claude's Intelligence*, Lance Martin, Anthropic Claude Platform team, <https://claude.com/blog/harnessing-claudes-intelligence>, 2026-04-02 **[FACT]**: "An agent harness is the software scaffolding around a model: the loop, tools, context management, and guardrails that turn raw intelligence into a working agent," and harnesses "encode assumptions about Claude's limitations" that should be re-tested as models improve. The recommended habit is to keep asking **"what can I stop doing?"** — the harness-design post's illustration is that Opus 4.5 removed the need for the context-reset code and Opus 4.6 removed the need for sprint decomposition **[FACT]**.

---

# 3. Named practitioners

Only attributable people with dated, fetchable primary writing. Marked **demonstrated** (they show the artifact or the numbers) or **asserted** (they describe a practice without evidence).

### Nicholas Carlini — Anthropic Safeguards. **Demonstrated.**
*Building a C compiler with a team of parallel Claudes*, 2026-02-05, <https://www.anthropic.com/engineering/building-c-compiler>. Covered in §1.1(d). Token counts, dollar cost, session count, working compiler, and an explicit list of what didn't work. This is the highest-evidence practitioner account in the field.

### Simon Willison — independent, Datasette/sqlite-utils. **Demonstrated, partially.**
*Agentic Engineering Patterns*, 2026-02-23, <https://simonw.substack.com/p/agentic-engineering-patterns> **[FACT]**. Claims:
- **Red/green TDD** as the primary control on agent output; writing tests first produces "more succinct and reliable code with minimal extra prompting."
- **"First run the tests"** — automated tests are "vital for ensuring AI-generated code does what it claims to do," and the cost objection is dead because agents write tests cheaply.
- **Linear walkthroughs** — asking the model to narrate an entire codebase, which he used on a Swift app he had vibe-coded.
- The failure he names: **"parallel agent psychosis"** — features disappearing across multiple agent sessions.
He also live-blogged Code with Claude 2026 (<https://simonwillison.net/2026/May/6/code-w-claude-2026/>) and posted on the Claude Code quality postmortem (<https://simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports/>). His artifacts (Datasette, sqlite-utils releases) are public, so the practice is checkable; the productivity claims themselves are not measured.

### Armin Ronacher — creator of Flask. **Demonstrated (as a negative report).**
This is the most useful *negative* practitioner source in the field, because he publishes what he abandoned.
- *Agentic Coding Things That Didn't Work*, 2025-07-30, <https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/> — see §5.1.
- *Agentic Coding Recommendations*, 2025-06-12, <https://lucumr.pocoo.org/2025/6/12/agentic-coding/> — his working practice: give the agent a job with full permissions and let it run; "Tools need to be protected against an LLM chaos monkey using them completely wrong"; prefer simple descriptive functions, plain SQL, locally-visible permission checks.
- *The Coming Loop*, 2026-06-23, <https://lucumr.pocoo.org/2026/6/23/the-coming-loop/> **[FACT]**. He describes the loop-driven future and then declines to endorse it for work he cares about: generated code "tends toward defensiveness and complexity, avoids strong invariants, and adds redundant safeguards," and models are "mortally terrified of exceptions," adding local defences instead of making bad states impossible.

### Walden Yan — Cognition (Devin). **Demonstrated (measured, in the 2026 post).**
- *Don't Build Multi-Agents*, 2025-06-12, <https://cognition.com/blog/dont-build-multi-agents> **[FACT]**. Two principles: **"Share context, and share full agent traces, not just individual messages"** and **"Actions carry implicit decisions, and conflicting decisions carry bad results."** The Flappy Bird example: parallel subagents produce a Mario-style background and a mismatched bird; the assembling agent cannot reconcile them. Recommended alternative: single-threaded linear agents, with a purpose-trained compressor for long tasks.
- *Multi-Agents: What's Actually Working*, 2026-04-22, <https://cognition.com/blog/multi-agents-working> **[FACT]**. The revised position, and it is narrow: **"setups where multiple agents contribute intelligence to a task while writes stay single-threaded."** Three that work: (1) a separate **review agent without the coding agent's context**, which catches "an average of 2 bugs per pull request, with 58% being severe issues"; (2) frontier-model pairing; (3) manager/delegate. Remaining problems are "all communication problems."

### Geoffrey Huntley — independent. **Demonstrated (technique adopted by Anthropic).**
*Ralph Wiggum as a "software engineer"*, 2025-07-14, <https://ghuntley.com/ralph/> **[FACT]**. `while :; do cat PROMPT.md | claude-code ; done`. **"one thing per loop. Only one thing."** His honest framing: "the technique is deterministically bad in an undeterministic world." What he says does **not** work: multi-agent systems with agent-to-agent communication ("premature complexity"); **"no way would I use Ralph in an existing code base"**; placeholder implementations without enforcement. Required: senior engineering judgement, meticulous prompt iteration, continuous observation. Anthropic subsequently shipped this as the official `ralph-loop` plugin — implemented as a **Stop hook that blocks exit and re-feeds the prompt**, with `--max-iterations` and a completion-promise string.

### Addy Osmani — formerly Google (Chrome, Gemini). **Asserted.**
*Loop Engineering*, 2026-06-07, <https://addyosmani.com/blog/loop-engineering/> **[FACT]**. Definition: "Loop engineering is replacing yourself as the person who prompts the agent. You design the system that does it instead." Five components: automations, worktrees, skills, plugins/connectors, sub-agents (ideation vs verification), plus external state in markdown or a tracker. What fails: verification stays human — "unattended loops make unattended mistakes"; comprehension decays if you don't review; and "cognitive surrender," designing loops to avoid thinking. **Honest caveat: the piece contains no case studies or measured examples. It cites Peter Steinberger and Boris Cherny as authority. Treat as a framework, not evidence.**

### Kate Lee, Katie Parrott, Eleanor Warnock — Every (media company). **Demonstrated.** See §5 — this is the editorial section's primary source.

### Boris Cherny — Anthropic, Claude Code. **[NOT VERIFIED] as a primary source.**
The quote "I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops" circulates widely (Ronacher quotes it in *The Coming Loop*; Osmani quotes it; it is all over X). I could not locate a primary Anthropic publication or an official transcript containing it. It appears to originate in a talk clip, June 2026. **Attributable in the sense that everyone attributes it to him and nobody disputes it; not primary-sourced. Do not build an argument on it.** This also updates the playbook's Open Question 13, which asked about a different alleged Cherny quote ("let Claude verify its work") — I found no primary source for that one either.

### Deliberately excluded
Every "10 tips for Claude Code" post, every unattributed Medium write-up of an Anthropic blog, `mindstudio.ai`, `teamday.ai`, `aiforautomation.io`, and the podcast-automation content farms. Searching for "AI-assisted podcast production workflow weekly deadline" returns essentially nothing but these. That absence is itself a finding — see §5.

---

# 4. What the field says does **not** work

## 4.1 Documented negative results, with sources

**1. Multi-agent parallelism on shared writes.** Cognition, 2025-06-12 **[FACT]**, and still partially true in their 2026-04-22 revision: what works is multiple agents contributing *intelligence* "while writes stay single-threaded." Anthropic's own agent-teams docs say the same in product form: "Two teammates editing the same file leads to overwrites," and "For sequential tasks, same-file edits, or work with many dependencies, a single session or subagents are more effective" **[FACT]**. The playbook already said this; it is now doubly sourced.

**2. Slash commands as a workflow layer.** Ronacher, 2025-07-30 **[FACT]**, item by item:
- Slash commands generally: "many of the ones that I added I ended up never using."
- `/fix-bug`: "I saw no meaningful improvement over simply mentioning the GitHub issue URL."
- `/commit`: "they never matched my style. I stopped using this command."
- `/add-tests`: "this approach wasn't consistently better than automatic test generation."
- `/fix-nits`: "it never became muscle memory, and Claude already knows how to do this."
- `/next-todo`: "I use this command far less than expected."

**3. Hooks — for *efficiency*.** Ronacher, same post **[FACT]**: "I haven't seen any efficiency gains from them yet." **[INFERENCE] This is not a contradiction of the playbook's hook advice, and the distinction matters.** Hooks do not make an agent faster or smarter. They make specific outcomes *unconditional*. Adopt hooks only where the value is "this can never happen again," never where the value is "this would be handier."

**4. Print/headless mode as a scripting substrate.** Ronacher **[FACT]**: "Print mode is slow and difficult to debug."

**5. Sub-agents for mixed read-write work.** Ronacher **[FACT]**: "I don't get good results" outside investigative tasks; "tasks that mix reads and writes create chaos." Consistent with Anthropic's own guidance that subagents suit "focused tasks where only the result matters."

**6. Ralph on an existing codebase.** Huntley, 2025-07-14 **[FACT]**: "no way would I use Ralph in an existing code base."

**7. Loops for work you care about the internals of.** Ronacher, 2026-06-23 **[FACT]**: generated code under loops is defensive, complex, avoids strong invariants.

**8. Assuming AI assistance is a speed-up without measuring.** METR, *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*, 2025-07-10, <https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/> and arXiv:2507.09089 **[FACT]**. 16 experienced developers, 246 tasks, mature repos (avg 22k+ stars, 1M+ LOC), Feb–Jun 2025, mostly Cursor Pro with Claude 3.5/3.7 Sonnet. **Result: 19% *slower* with AI tools. The same developers estimated afterwards that AI had made them 20% faster.** The gap between felt and actual is the finding.
 METR's own follow-up work complicates rather than overturns this **[FACT]**: they published *We are Changing our Developer Productivity Experiment Design* (2026-02-24, <https://metr.org/blog/2026-02-24-uplift-update/>) reporting that their newer experiment gives "an unreliable signal," because 30–50% of developers declined to submit tasks they didn't want to do without AI — biasing results downward. And *Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity* (2026-05-11, <https://metr.org/blog/2026-05-11-ai-usage-survey/>) is a **survey of 349 workers reporting a median 1.4–2× self-reported change**, with METR themselves flagging "reasons to be skeptical of the magnitude."
 **[NOT VERIFIED]** A widely repeated "METR now estimates ~18% speedup by early 2026" figure appears in secondary write-ups. I did not find it on a METR primary page. Do not cite it.
 **[INFERENCE] The defensible reading:** the only rigorous RCT in this space found a *slowdown* among experts on mature codebases; the follow-ups are self-report, and the research organisation that ran the original says its newer measurement is unreliable. Anyone who tells you the productivity multiplier is a known number is guessing.

**9. Self-evaluation.** Anthropic, 2026-03-24 **[FACT]**: "A second issue, which we haven't previously addressed, is self-evaluation." The fix is structural separation, not better prompting.

**10. Asking nicely.** `cwc-long-running-agents` README **[FACT]**: "Asking nicely in the prompt doesn't reliably stop this."

## 4.2 Two things I looked for and could not find

- **A rolled-back multi-agent deployment written up by the team that rolled it back.** Cognition's two posts are the closest, and the second is a partial *re*-adoption, not a rollback. **[NOT VERIFIED]** — I searched specifically and found only vendor comparison content.
- **Any measured claim that automating an editorial pipeline created more work.** Nothing rigorous exists. The nearest thing is anecdotal: the Chicago Sun-Times incident (§5.3), where the automation cost far more work than it saved, but no one has published a cost accounting.

---

# 5. Creative and editorial production

The playbook's Open Question 21 said no guidance exists on production scheduling for AI-generated content. **That remains true and I will not pad it.** Searching the adjacent space returns content farms. What *does* exist is a small number of named editorial operations that have published their actual process, and industry-level survey data. Both are useful. Neither is a methodology.

## 5.1 Every — the closest real analogue to LAiDIES, and the most directly useful source in this report

Every is a ~30-person media company publishing a daily AI newsletter plus products. They publish their editorial process.

**Primary source: *This Is How the Every Editorial Team Uses AI*, Kate Lee (Editor in Chief), 2026-02-23, <https://every.to/p/this-is-how-the-every-editorial-team-uses-ai>** **[FACT]**.

Mechanisms worth copying, verbatim where possible:

- **A style guide as a machine-checkable artifact.** Kate Lee built a **400-rule style guide fed into a Claude project** so writers and editors check drafts *before* they reach her — freeing her, in her framing, "to focus on whether a piece is the best it can be rather than catching mechanical errors."
- **A "top-edit skill"** that screens for **vague pronouns, unsourced quotes, "AI tells like correlative constructions," hedging phrases, and marketing speak.**
- **AI-tell detection that produces a checklist for manual editing**, scanning for "generic phrasing, stock openers, formal transitions, correlative constructions, vague authority claims."
- **A staged edit that predates AI and is preserved:** "a draft goes through several rounds before reaching the editor-in-chief: a developmental edit to work out the thesis, structure, and argument, and a line edit for prose."
- **The taste gate is explicit and human.** Their social manager Anthony Scarpulla describes his role as "a DJ": "If it feels like brand broadcasting instead of a friend reporting from the frontier, I kill it." Kate reviews all social content before publication.
- **Named limitation, from the managing editor:** "we've only scratched the surface in terms of AI permeating the messy work of editing."
- **The interview pattern for extracting substance before prose.** Katie Parrott opens a Claude project and asks: "Can you interview me one question at a time to draw out what I think?"

**Second primary source: *AI Style Guides: How to Help AI Write Like You*, Katie Parrott, <https://every.to/guides/ai-style-guide>** (no explicit date on page) **[FACT]**. The recommended structure of a machine-usable style guide, eight sections: voice and tone with concrete boundaries · structure · sentence-level preferences · signature moves · **anti-patterns/blacklist, formatted as tables** · positive examples with explanation · negative examples with analysis · **revision checklist**. Their assessment: **"a blacklist is one of the most useful sections."** Build it by having the model interview you rather than writing it cold, "since people often articulate preferences better through reactions than self-description."

Also published: *Every's Editorial Guidelines*, <https://every.to/guides/editorial-guidelines> **[FACT]** — every piece has a human author who shaped it and stands behind it; final sign-off rests with the editor in chief and the CEO.

**[INFERENCE] Why this matters more than anything else in §5 for LAiDIES.** Every has independently arrived at the same architecture Anthropic's harness posts describe, in prose rather than code: a **rules artifact the machine can check** (400 rules), a **negative-example blacklist**, a **structural developmental edit *before* the prose edit**, and a **human taste gate that is explicitly not automated**. LAiDIES already has the 499-line writing lock — the missing pieces are that it is not machine-applied at draft time, there is no developmental-edit stage before prose, and there are no worked negative examples attached to the rules.

## 5.2 Industry-level data

*Journalism, Media and Technology Trends and Predictions 2026*, Reuters Institute, **2026-01-12**, <https://reutersinstitute.politics.ox.ac.uk/journalism-media-and-technology-trends-and-predictions-2026> **[FACT]**:

- Publishers rating AI "important": **97% back-end automation** (transcription, copyediting, metadata) · **82% newsgathering** · **81% coding/product** · **33% commercial**.
- Self-assessed results: only **13% "transformational"** · **44% "promising"** · **42% "limited."**
- Jobs: **67% no reductions** · 16% slight cuts · 9% added roles.

**[INFERENCE]** Read the 13%/42% split honestly. Most organisations with more staff and budget than this one report *limited* results. The realistic ceiling for AI in editorial production is faster mechanical passes plus better first drafts, not a shipped-quality pipeline.

Volume case, secondary but from a credible trade outlet: Press Gazette, <https://pressgazette.co.uk/publishers/regional-newspapers/newsquest-36-ai-assisted-reporters-non-canon-news-disintermediation/> reports Newsquest employing **36 "AI-assisted reporters"** (up from seven at the end of 2023), using an AI-powered CMS to rewrite press releases, with the reporters "tasked with checking the facts and quotes are correct in the output" **[FACT, secondary]**. **[INFERENCE]** Note the shape: the human's job was redefined to *verification of a specific claim class*, not "review the whole thing." That is a design worth borrowing.

## 5.3 The documented editorial failure

Chicago Sun-Times, **2025-05-18** print edition. A syndicated "Summer reading list" named 15 books; **10 did not exist**, attributed to real authors (Andy Weir, Brit Bennett, Taylor Jenkins Reid, Min Jin Lee, Percival Everett, Delia Owens and others). It also ran in The Philadelphia Inquirer. The freelance author, Marco Buscaglia, told 404 Media he normally checks AI-assisted background material but "this time, I did not and I can't believe I missed it because it's so obvious." Reported by NBC News, <https://www.nbcnews.com/tech/tech-news/chicago-sun-admits-summer-book-guide-included-fake-ai-generated-titles-rcna208325>, and CBS Chicago, <https://www.cbsnews.com/chicago/news/summer-reading-ai-generated-titles-chicago-sun-times/> **[FACT, secondary reporting]**. The paper's own statement page returned 404 on 2026-07-22 **[NOT VERIFIED as primary]**.

**[INFERENCE]** The failure was not the model. It was that the verification step was **a habit rather than a gate** — it depended on a person remembering, on one particular day, to do something they usually do. This is precisely the "checks masquerading as rules" pattern the playbook named in A3, and it is the exact shape of the LAiDIES Ep5 failure: the ruling existed, was recorded, and the draft did not change.

## 5.4 Honest statement of the gap

There is **no published methodology** for scheduling, buffering, or gating AI-assisted creative production against a fixed recurring slot. No peer-reviewed work, no vendor guidance, no serious practitioner write-up. Every's posts are the closest, and they describe a *process*, not a schedule. **[NOT VERIFIED]** — and the playbook's D1c one-episode-buffer recommendation still rests on its own logic and nothing else. It is still the right call; it is still unevidenced.

---

# 6. Gap analysis

Against the current state established in the shared brief and confirmed by inspection of the repo on 2026-07-22 **[LOCAL]**: 12 hook scripts in `.claude/hooks/`, all wired in `.claude/settings.json`; `response-linter.py` on `Stop` (it does emit `{"decision":"block"}`, so it genuinely blocks); five `PreToolUse` blockers; `check-episode.sh` as the ship gate. **No `.claude/agents/` directory. No `.claude/skills/`. No `.claude/output-styles/`. No `loop.md`. No use of `/goal`, routines, or scheduled tasks anywhere in `operations/` or `.claude/`.**

## 6.1 What this operation already does better than common practice

Stated plainly, and it is more than most:

1. **Hooks as enforcement, at real scale.** Twelve hooks across six events, including five `PreToolUse` blockers. Ronacher — a far more experienced engineer than most people writing about this — abandoned hooks entirely **[FACT]**. This operation runs a hook architecture most professional teams do not have.
2. **A blocking `Stop` hook already exists.** `response-linter.py` returns `decision: block`. The playbook recommended building one (its rank-3 item); the mechanism is already there. What is missing is only *what* it checks.
3. **Machine-readable decisions embedded in human-readable files.** The ```banned block in `ep04-cut-decisions.md`, read by `enforce-cut-decisions.py` at `PreToolUse`, is a genuinely unusual design. Every's equivalent (a 400-rule guide in a Claude project) is *advisory*; this one is *enforcing*. **This operation is ahead of Every on that specific axis.**
4. **A single canonical source with a derivation spec.** `episode-canonical-source-spec.md` plus `episode-0N.canon.md` matches Anthropic's initializer pattern in intent — one authored artifact, many derived surfaces — and predates this research.
5. **A labelled calibration pair.** One PASS file and one FAIL file, both judged by the person whose taste is the standard. Anthropic's harness-design post says the evaluator was calibrated "using few-shot examples with detailed score breakdowns" **[FACT]**. Most teams building an LLM judge have no labelled examples at all. **This operation has the scarce input and has not used it.**
6. **A written failure catalogue.** The four art failure classes, the six Ep5 defects, `ep04-cut-decisions.md`. Carlini's account makes clear that a maintained catalogue of failure modes is what turns a loop from a toy into a system.
7. **No dashboards.** The `chat-is-the-one-place` rule matches how the `cwc-long-running-agents` README says to watch a long run: `watch` on files, no UI **[FACT]**.
8. **Refusal to let a gate stand in for taste.** Recorded in `ep5-usefulness-critique-2026-07-10`. Anthropic's own position is the same: "the evaluator is not a fixed yes-or-no decision" **[FACT]**, and "aesthetics can't be fully reduced to a score" **[FACT]**.

## 6.2 The five practices most conspicuously missing

Ranked by impact per unit of **Ali's** effort. Each is tested against: *would this have caught the Ep5 master file?*

---

### **M1. A fresh-context evaluator subagent — an agent that grades the script and has never seen it written.**

**Evidence:** the single best-supported practice in this report. Anthropic: "Separating the agent doing the work from the agent judging it proves to be a strong lever" **[FACT]**. `cwc-long-running-agents` ships it as `agents/evaluator.md`, **a subagent with no Write/Edit tools** **[FACT]**. Cognition measures a context-free reviewer catching 2 bugs/PR, 58% severe **[FACT]**. Claude Code has no `.claude/agents/` directory at all right now **[LOCAL]**.

**What it looks like here:** `.claude/agents/episode-evaluator.md` — tools restricted to Read/Grep/Glob, no Write, no Edit. Its prompt: read the writing lock, read `episode-01.canon.md` as the PASS exemplar, read the draft, and return a score per dimension with findings. Invoked as `claude --agent episode-evaluator -p "..."`.

**Would it have caught Ep5?** **Yes, and this is the one that would have caught it most completely.** The six Ep5 defects are all detectable by reading — synonym pile-up, metaphor carrying the teaching, anonymised payload, negation payoff, ratio, opening answered by side-metaphor. The writer could not see them because the writer had spent an hour building the metaphor. A grader that never saw it being built has no such investment.

**Effort:** ~1 hour to write the agent file. Zero ongoing Ali effort — it runs in the loop.

---

### **M2. A rubric with dimensions and few-shot calibration, using the PASS/FAIL pair you already own.**

**Evidence:** Anthropic, 2026-03-24 **[FACT]**: four named dimensions plus **"I calibrated the evaluator using few-shot examples with detailed score breakdowns."** The `cwc-long-running-agents` README explicitly names "a rubric for subjective work" as the fourth core primitive and says it can't be shipped because it's project-specific **[FACT]**. Every's equivalent is a blacklist plus positive and negative examples with analysis **[FACT]**. And the playbook's own C6 finding stands: MLLM judges are least bad at **pairwise comparison** — so the question is "compared with episode-01, where does this fall short," never "score this 1–10."

**What it looks like here:** four dimensions adapted from Anthropic's set to teaching prose —
- **Usefulness:** does a reader leave able to make the decision she arrived with? (Ep5 defect 4)
- **Plainness:** delete the metaphor vocabulary — does the teaching survive? (Ep5 defects 1 and 6)
- **Specificity:** are the products, numbers, and triggers named? (Ep5 defect 3)
- **Discipline:** one term per concept; actionable-to-total word ratio. (Ep5 defects 2 and 5)

Each dimension carries **two worked examples**: the passage from `episode-01.canon.md` that passes, and the passage from `episode-05-elevenlabs-v3-tagged.txt` that fails, **with the score breakdown written out**. That is what "few-shot with detailed score breakdowns" means. The brief already contains most of the FAIL analysis in prose — it needs restructuring into the rubric, not re-deriving.

**Would it have caught Ep5?** **Yes by construction — and this is testable.** Run the rubric against the FAIL file. If it does not fail, the rubric is broken. That is a regression test on the gate itself, and it is the only thing in this report that can be validated before it is trusted.

**Effort:** ~2 hours, mostly extracting the examples. This is the single highest-value use of Ali's existing written judgement.

---

### **M3. A default-FAIL contract: "ready to ship" becomes a write that a hook refuses without evidence.**

**Evidence:** `cwc-long-running-agents` **[FACT]**: a `PreToolUse` hook denies any write to the results file "unless the agent has first opened one with the Read tool," because **"Asking nicely in the prompt doesn't reliably stop this."** Anthropic's named failure mode: agents "declare the job done" **[FACT]**. Claude Code product analogue: `/goal`, "a separate fast model checks whether the condition holds" after every turn **[FACT]**.

**What it looks like here:** an `episode-0N-gate.json` where every criterion starts `false` — canon locked, facts verified against the ledger, coverage gate green, evaluator verdict PASS, Ali's substance approval recorded. A `PreToolUse` hook refuses to flip any field to `true` unless the corresponding evidence artifact was read in this session. `check-episode.sh` becomes one row in the contract rather than the whole gate.

**Would it have caught Ep5?** **Partially, and importantly.** It would not have judged the prose — that's M1/M2. But it would have made it *impossible to reach the prose stage* with the "substance approved" row still `false`. The brief records that the substance-first process fix was prescribed on 2026-07-10 and never built. This is the mechanism that builds it.

**Effort:** ~2 hours. Extends an existing hook pattern; the repo already has five `PreToolUse` blockers.

---

### **M4. A planner stage that produces a one-page substance artifact, and a hard stop before prose.**

**Evidence:** Anthropic's harness architecture puts a **planner** first, which "takes a brief 1–4 sentence prompt and expands it into a comprehensive product specification," is "instructed to be ambitious about scope," and deliberately avoids over-specifying detail that "could cascade errors downstream" **[FACT]**. The initializer post: a feature list where every item starts marked failing **[FACT]**. Every: "a developmental edit to work out the thesis, structure, and argument" happens **before** "a line edit for prose" **[FACT]**. And Ali's own recorded ruling (`ep5-usefulness-critique-2026-07-10`) prescribes exactly this: "write the plain, correct, genuinely-useful 'which model for what + why' as notes; **Ali confirms it's useful**; only THEN write prose."

**What it looks like here:** the week starts with a planner run that emits one page — the question the episode answers, the plain-English answer with products named and triggers given, the three things a reader can do differently, and the beat list. **That page, and only that page, is what Ali approves at gate G1.** The M3 contract makes the prose stage unreachable until she has.

**Would it have caught Ep5?** **Yes, and earliest and cheapest of all four.** The Ep5 substance defect — anonymised, no products named, payoff is a negation — is visible on a one-page artifact in about ninety seconds. It cost 1,400 words of prose and a stalled production to discover it at the end. This converts a 20-minute read of a finished script into a 2-minute read of a page, which is the stated design target in the brief.

**Effort:** ~2 hours to write the planner prompt and wire the stage. Reduces Ali's per-episode effort permanently.

---

### **M5. Durable on-disk handoff state, and a bounded, resumable run.**

**Evidence:** the agent-maintained handoff primitive **[FACT]**; Carlini on fresh containers with no context **[FACT]**; Managed Agents on externalising state so "Nothing in the harness needs to survive a crash" **[FACT]**; the compaction table showing that **path-scoped rules and nested CLAUDE.md are lost after compaction** and skill bodies are capped at 5k/25k tokens **[FACT]**; checkpointing's blind spot for bash-moved files **[FACT]**.

**What it looks like here:** a per-episode `PROGRESS.md`, written as the agent works and re-read first thing every session — not a summary written at the end. Plus `AGENT_STOP` and `STEER.md` for intervention without restart. Plus git commits at stage boundaries, since checkpoints do not cover `ffmpeg`/`mv`/script-moved media. Plus, once M1–M4 exist, a bounded loop: `/goal` with a condition provable from the transcript and an explicit `or stop after N turns` clause.

**Would it have caught Ep5?** **No — and it should not be sold as if it would.** This is the practice that makes the other four survive a multi-hour, multi-session week. It prevents the *next* class of failure: the ruling recorded in session 1 that is gone by session 4 because compaction dropped a path-scoped rule.

**Effort:** ~2 hours for the files and the Stop-hook commit backstop. The `/goal` layer should wait until M1–M4 exist and the rubric has been validated against the FAIL file.

---

## 6.3 What to ignore, and why

Each of these is a real capability that would cost time and return little **here**.

- **Cloud routines for the weekly run.** Documented: routines have **no local file access — each run is a fresh clone of a GitHub repo** **[FACT]**. LAiDIES production is local media on an iCloud-backed tree. If a scheduled trigger is ever wanted, it is a **Desktop scheduled task** (local files, configurable permissions, 1-minute minimum) **[FACT]**. Routines could suit one narrow job — a weekly link/model-freshness check against the repo — and nothing else.
- **Agent teams.** Experimental, off by default, and the documented limitations are disqualifying for a one-person operation: no session resumption with in-process teammates, task status lags and blocks dependents, slow shutdown, permission prompts all bubble to the lead **[FACT]**. Plus Cognition's finding that what works is intelligence-in-parallel with **writes single-threaded** **[FACT]**. The evaluator subagent (M1) gets the benefit without the coordination cost.
- **A general-purpose Ralph loop over the whole episode.** Huntley's own constraint: "no way would I use Ralph in an existing code base" **[FACT]**, and "one thing per loop. Only one thing." An episode is not one thing. If a loop is ever used here it belongs around a *single* stage — e.g. iterate one image beat until the QC script passes — not around the week.
- **Custom output styles for episode writing.** The default `keep-coding-instructions: false` **removes Claude Code's built-in verification instructions** **[FACT]**, and styles **don't apply to subagents** **[FACT]** — so a voice style would silently not reach the evaluator. Voice belongs in the writing lock and the rubric, which are read as files.
- **The advisor tool, for now.** Genuinely interesting (stronger model consulted "before declaring a task complete", and it doesn't invalidate the prompt cache) **[FACT]**, but it is experimental, Anthropic-API-only, and duplicates what M1 does with more control and less cost. Revisit after M1 is running.
- **Building any new dashboard.** `watch` on `PROGRESS.md` and `git log` is Anthropic's own recommended monitoring for a long run **[FACT]** and matches the locked `chat-is-the-one-place` rule.

## 6.4 Where the playbook's advice was followed, and where it was not

Required by the brief. Established by inspection 2026-07-22 **[LOCAL]**:

| Playbook item | Status |
|---|---|
| D3a coverage gate (its rank 1) | **Not built.** No script reconciles `episode-0N-cues.json` against files on disk. |
| D5b grounding paragraph in project instructions (its rank 2, "10 minutes") | **Not verified as done.** No `CLAUDE.md` at the repo root; `.claude/settings.json` contains only a `hooks` key. The paragraph may live inside `inject-rules.py`; if not, this remains the cheapest item in either report. |
| D5a blocking `Stop` hook (its rank 3) | **Half done.** `response-linter.py` blocks, but on response-text lint, not on "a completion claim without a passing check." |
| D3b beat-by-beat prompt generation | Not verified either way from `.claude`; `enforce-art-prompt.py` exists, which is the guardrail, not the generator. |
| D4b promote decisions to a standing `DECISIONS.md` | **Not done** — still per-episode (`ep04-cut-decisions.md`), plus a separate `enforce-library-decisions.py`, which is drift in the same direction. |
| D5c fresh-context verifier subagent | **Not done.** No `.claude/agents/` directory. This report re-ranks it from 13th to **1st**. |
| Hooks architecture generally (A4) | **Followed, and well.** 12 hooks, 6 events. |

**[INFERENCE]** The pattern in that table is the same one the brief identifies in the Ep5 draft: **the guardrails that block bad things got built; the gates that grant "done" did not.** Five `PreToolUse` blockers exist. Zero evaluators exist. The operation is well defended against known-bad actions and undefended against a plausible-looking draft — which is exactly the failure that stopped Ep5.

---

# 7. Recommended order

Ranked by impact per unit of Ali's effort, not engineer-hours.

1. **M2 — the rubric with the calibration pair.** ~2h. Validate it by running it against `episode-05-elevenlabs-v3-tagged.txt`. **If it passes that file, stop and fix the rubric.** Nothing else is worth building until this fails correctly.
2. **M1 — the evaluator subagent.** ~1h. Reads the rubric. No Write/Edit tools.
3. **M4 — the planner stage and the one-page substance artifact.** ~2h. This is the change that most reduces Ali's own time.
4. **M3 — the default-FAIL contract with an evidence precondition.** ~2h. Makes the prose stage structurally unreachable before substance approval.
5. **D5b from the playbook — paste the grounding paragraph** if it isn't already in the injected rules. 10 minutes.
6. **D3a from the playbook — the coverage gate.** ~1h. Still the cheapest mechanical win available.
7. **M5 — `PROGRESS.md`, `AGENT_STOP`, `STEER.md`, commit-on-stop.** ~2h.
8. **Only then:** a `/goal` condition to hold a bounded run together, and only with an `or stop after N turns` clause.

**One standing habit, free:** after every Claude Code model upgrade, re-run the rubric against both calibration files and comment out one harness piece at a time to see what is still load-bearing. Anthropic's own framing: keep asking **"what can I stop doing?"** — harnesses "encode assumptions about Claude's limitations" that should be re-tested (Lance Martin, 2026-04-02) **[FACT]**. Given the April 2026 postmortem, this doubles as the only reliable way to tell "the model changed" from "my harness drifted."

---

# 8. Sources

All fetched or verified 2026-07-22 UTC. Items marked ✚ are additions to `agent-research-sources.json`.

## Anthropic primary

| # | Title | URL | Date |
|---|---|---|---|
| ✚1 | Engineering blog index (25 posts) | https://www.anthropic.com/engineering | index, 2026-07-22 |
| ✚2 | Effective harnesses for long-running agents | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | 2025-11-26 |
| ✚3 | Building a C compiler with a team of parallel Claudes (N. Carlini) | https://www.anthropic.com/engineering/building-c-compiler | 2026-02-05 |
| ✚4 | Harness design for long-running application development | https://anthropic.com/engineering/harness-design-long-running-apps | 2026-03-24 |
| ✚5 | Scaling Managed Agents: decoupling the brain from the hands | https://www.anthropic.com/engineering/managed-agents | 2026-04-08 |
| ✚6 | An update on recent Claude Code quality reports | https://www.anthropic.com/engineering/april-23-postmortem | 2026-04-23 |
| ✚7 | Harnessing Claude's Intelligence (Lance Martin) | https://claude.com/blog/harnessing-claudes-intelligence | 2026-04-02 |
| ✚8 | How Anthropic teams use Claude Code | https://claude.com/blog/how-anthropic-teams-use-claude-code | 2025-07-24 |
| ✚9 | anthropics/cwc-long-running-agents | https://github.com/anthropics/cwc-long-running-agents | created 2026-05-06 |
| ✚10 | claude-quickstarts / autonomous-coding | https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding | living |
| ✚11 | claude-plugins-official / ralph-loop | https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop | living |
| ✚12 | claude-plugins-official / frontend-design | https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design | living |
| 13 | Demystifying evals for AI agents (re-checked for Open Q11) | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 |

## Claude Code documentation (all living; `/docs/llms.txt` used as the index)

| # | Page | URL |
|---|---|---|
| ✚14 | Keep Claude working toward a goal (`/goal`) | https://code.claude.com/docs/en/goal |
| ✚15 | Run prompts on a schedule (`/loop`, comparison table) | https://code.claude.com/docs/en/scheduled-tasks |
| ✚16 | Automate work with routines | https://code.claude.com/docs/en/routines |
| ✚17 | Checkpointing | https://code.claude.com/docs/en/checkpointing |
| ✚18 | Explore the context window (compaction survival table) | https://code.claude.com/docs/en/context-window |
| ✚19 | How Claude Code works | https://code.claude.com/docs/en/how-claude-code-works |
| ✚20 | Orchestrate teams of Claude Code sessions | https://code.claude.com/docs/en/agent-teams |
| ✚21 | Escalate hard decisions with the advisor tool | https://code.claude.com/docs/en/advisor |
| ✚22 | Output styles | https://code.claude.com/docs/en/output-styles |
| ✚23 | What's new (weekly digests, w13–w29 2026) | https://code.claude.com/docs/en/whats-new |
| ✚24 | Claude Code changelog (to v2.1.217, 2026-07-21) | https://code.claude.com/docs/en/changelog |
| ✚25 | Documentation index | https://code.claude.com/docs/llms.txt |

## Named practitioners

| # | Author | Title | URL | Date |
|---|---|---|---|---|
| ✚26 | Simon Willison | Agentic Engineering Patterns | https://simonw.substack.com/p/agentic-engineering-patterns | 2026-02-23 |
| ✚27 | Simon Willison | Live blog: Code w/ Claude 2026 | https://simonwillison.net/2026/May/6/code-w-claude-2026/ | 2026-05-06 |
| ✚28 | Simon Willison | An update on recent Claude Code quality reports | https://simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports/ | 2026-04-24 |
| ✚29 | Armin Ronacher | Agentic Coding Recommendations | https://lucumr.pocoo.org/2025/6/12/agentic-coding/ | 2025-06-12 |
| ✚30 | Armin Ronacher | Agentic Coding Things That Didn't Work | https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/ | 2025-07-30 |
| ✚31 | Armin Ronacher | The Coming Loop | https://lucumr.pocoo.org/2026/6/23/the-coming-loop/ | 2026-06-23 |
| ✚32 | Walden Yan (Cognition) | Don't Build Multi-Agents | https://cognition.com/blog/dont-build-multi-agents | 2025-06-12 |
| ✚33 | Walden Yan (Cognition) | Multi-Agents: What's Actually Working | https://cognition.com/blog/multi-agents-working | 2026-04-22 |
| ✚34 | Geoffrey Huntley | Ralph Wiggum as a "software engineer" | https://ghuntley.com/ralph/ | 2025-07-14 |
| ✚35 | Addy Osmani | Loop Engineering | https://addyosmani.com/blog/loop-engineering/ | 2026-06-07 |

## Editorial / creative production

| # | Source | URL | Date |
|---|---|---|---|
| ✚36 | Kate Lee, *This Is How the Every Editorial Team Uses AI* | https://every.to/p/this-is-how-the-every-editorial-team-uses-ai | 2026-02-23 |
| ✚37 | Katie Parrott, *AI Style Guides: How to Help AI Write Like You* | https://every.to/guides/ai-style-guide | undated |
| ✚38 | Every's Editorial Guidelines | https://every.to/guides/editorial-guidelines | undated |
| ✚39 | Reuters Institute, *Journalism, Media and Technology Trends and Predictions 2026* | https://reutersinstitute.politics.ox.ac.uk/journalism-media-and-technology-trends-and-predictions-2026 | 2026-01-12 |
| ✚40 | Press Gazette, Newsquest 36 AI-assisted reporters | https://pressgazette.co.uk/publishers/regional-newspapers/newsquest-36-ai-assisted-reporters-non-canon-news-disintermediation/ | 2025 (secondary) |
| ✚41 | NBC News, Sun-Times AI reading list | https://www.nbcnews.com/tech/tech-news/chicago-sun-admits-summer-book-guide-included-fake-ai-generated-titles-rcna208325 | 2025-05-20 |
| ✚42 | CBS Chicago, same incident | https://www.cbsnews.com/chicago/news/summer-reading-ai-generated-titles-chicago-sun-times/ | 2025-05-20 |

## Measurement / negative results

| # | Source | URL | Date |
|---|---|---|---|
| ✚43 | METR, Early-2025 AI & experienced OS developer productivity | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · https://arxiv.org/abs/2507.09089 | 2025-07-10 |
| ✚44 | METR, We are Changing our Developer Productivity Experiment Design | https://metr.org/blog/2026-02-24-uplift-update/ | 2026-02-24 |
| ✚45 | METR, Self-Reported Impact of Early-2026 AI | https://metr.org/blog/2026-05-11-ai-usage-survey/ | 2026-05-11 |
| 46 | OpenAI, A practical guide to building agents (PDF, now text-extracted) | https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf | 2025 |

---

# 9. Open questions and NOT VERIFIED

## Resolved from the playbook's list

- **Open Q11 — "six grading methods" and a "75–90% human-agreement calibration target" attributed to Anthropic's evals post. RESOLVED: NOT SUPPORTED.** Direct re-fetch of <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents> on 2026-07-22 confirms **three** grader types, verbatim: "Agent evaluations typically combine three types of graders: code-based, model-based, and human." No numerical agreement target appears anywhere. The calibration language is qualitative: "LLM-as-judge graders should be closely calibrated with human experts." **Do not cite either figure as Anthropic doctrine.**
- **Open Q12 — OpenAI's *A practical guide to building agents* could not be text-extracted. RESOLVED.** Extracted 2026-07-22 (34 pages, ~30k chars, via `pypdf`). The playbook's reconstruction was accurate. Verbatim confirmations: **"Our general recommendation is to maximize a single agent's capabilities first. More agents can provide intuitive separation of concepts, but can introduce additional complexity and overhead, so often a single agent with tools is sufficient."** Manager pattern = "A central 'manager' agent coordinates multiple specialized agents via tool calls." Decentralised = "Multiple agents operate as peers, handing off tasks." On tools: "The issue isn't solely the number of tools, but their similarity or overlap. Some implementations successfully manage more than 15 well-defined, distinct tools while others struggle with fewer than 10 overlapping tools." On human intervention, two triggers: **"Exceeding failure thresholds"** and **"High-risk actions."**
- **Open Q13 — the Boris Cherny quote. STILL NOT VERIFIED, and now with a second unverified quote attached.** Neither "let Claude verify its work" nor "I don't prompt Claude anymore… My job is to write loops" traces to a primary Anthropic publication. The second is universally attributed to a June 2026 talk clip and quoted by Ronacher and Osmani, but I found no transcript or Anthropic page. Usable as "widely attributed"; not as a citation.
- **Open Q14 — Claude Code docs have no visible "last updated" date. RESOLVED, and superseded.** There is now a dated **changelog** (`/docs/en/changelog`, entries through **v2.1.217, 2026-07-21**) and dated **weekly digests** (`/docs/en/whats-new`, w13 through **w29, July 13–17 2026**). Version gates still appear inline as `min-version:` markers. The playbook's advice to re-check hook facts after upgrades stands, and there is now a dated feed to check against.
- **Open Q21 — production scheduling for AI-generated content. STILL NOT VERIFIED as a field.** Nothing methodological exists. What was found is documented in §5: Every's process (primary, real, but a process not a schedule), Reuters Institute survey data, and one documented editorial failure. The one-episode-buffer recommendation still rests on its own logic.

## New, unresolved

1. **[NOT VERIFIED]** The "80% of Anthropic's new production code is authored by Claude" figure (VentureBeat). No Anthropic primary page located.
2. **[NOT VERIFIED]** "METR estimates ~18% speedup by early 2026." Appears in secondary write-ups; not on a METR primary page. METR's own 2026 posts describe their newer experiment as giving "an unreliable signal."
3. **[NOT VERIFIED]** The Chicago Sun-Times' own statement page (`chicago.suntimes.com/about-us/2025/05/20/statement-from-chicago-sun-times`) returned **404** on 2026-07-22. The incident is well-corroborated by NBC and CBS reporting; the paper's primary wording is not directly verified here.
4. **[NOT VERIFIED]** *Effective harnesses for long-running agents* (2025-11-26) reports **no quantified results** — only qualitative observation. Every number I have for long-run agent work comes from the 2026-03-24 harness-design post and the 2026-02-05 compiler post.
5. **[NOT VERIFIED]** Whether the LLM-judge rubric approach transfers from **frontend design** (Anthropic's tested domain, where an evaluator can *look at the running artifact*) to **teaching prose**. The mechanism is the same — dimensions plus few-shot calibration — but Anthropic tested it on a domain with a visual artifact. This is why M2 must be validated against the FAIL file before it is trusted, and why the playbook's C6 finding (pairwise beats absolute scoring, MLLM judge consistency 0.418 on batch ranking) still governs.
6. **[NOT VERIFIED]** Whether `episode-05-elevenlabs-v3-tagged.txt` is still the current Ep5 master. The brief dates the diagnosis 2026-07-22; I did not re-read the file. If it has been revised, the calibration pair needs the *original* rejected version preserved — a rubric calibrated against a fixed draft is worthless.
7. **[NOT VERIFIED]** Whether the D5b grounding paragraph is already present in `inject-rules.py`. `.claude/settings.json` contains only a `hooks` key and there is no repo-root `CLAUDE.md` **[LOCAL]**; I did not read the hook's body. Worth ten minutes to check before rebuilding it.
