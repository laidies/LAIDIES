# Agent Operations Playbook — LAiDIES / SUNNYVAiLE

**Compiled:** 2026-07-21 (all sources fetched or re-verified 2026-07-21 UTC)
**Scope:** weekly episode production + the ~188-page static site, both executed mainly by AI agents
**Machine-readable source list:** `agent-research-sources.json` (same directory)

## How to read this document

Every claim carries one of three labels. There is no fourth, unlabelled tier.

| Label | Meaning |
|---|---|
| **[FACT]** | Stated in an official/primary document that was fetched. Quoted or closely paraphrased. |
| **[OPINION]** | A named practitioner's or vendor's position. Real, attributable, but not a spec. |
| **[INFERENCE]** | My reasoning applied to this operation. Not sourced. Judge it on the argument, not authority. |
| **[NOT VERIFIED]** | Could not confirm against a primary source. Do not build on it without checking. |

Where a widely-repeated number could not be confirmed, it is listed in **Open questions** rather than softened into the body.

Local facts about this operation (file counts, existing hooks, existing scripts) were established by direct inspection of the repo on 2026-07-21 and are marked **[LOCAL]**.

---

# Executive summary — the ten changes, ranked by impact per unit of effort

Ranked for **one person**. "Effort" is the founder's own time, not an engineer-week. Each maps to the failure modes in Section D.

| # | Change | Fixes | Effort | Why it ranks here |
|---|---|---|---|---|
| 1 | **Coverage gate: reconcile the cue manifest against delivered files before assembly** — a script that reads `episode-0N-cues.json`, asserts every cue has a file that exists on disk, and fails loudly. | FM3, FM1 | ~1 hour | The manifest already exists **[LOCAL]**. Anthropic's own eval guidance names "coverage checks" as a distinct grader class **[FACT]**. This converts the single most expensive silent failure (a missing beat found at assembly) into a 2-second script. |
| 2 | **Make "ready to ship" un-claimable without a passing check** — a `Stop` hook that blocks the turn from ending until `check-episode.sh` and the coverage gate exit 0. | FM5 | ~1 hour | Claude Code's own docs name this exact mechanism: "a Stop hook runs your check as a script and blocks the turn from ending until it passes" **[FACT]**, and name "the trust-then-verify gap" as a failure pattern **[FACT]**. A `Stop` hook already exists here (`response-linter.py`) **[LOCAL]** — this is an extension, not a build. |
| 3 | **Paste the two grounding paragraphs into the project instructions** — the "audit each claim against a tool result" snippet and the "report every issue, filter downstream" snippet. | FM5, FM3 | 10 minutes | Verbatim Anthropic-published prompt text. Anthropic states the first "nearly eliminated fabricated status reports even on tasks designed to elicit them" **[FACT]**. Highest ratio in the document. |
| 4 | **Generate image prompts *from* the cue manifest, one file per beat** — never hand-write "scene by scene" prose. | FM3, FM2 | ~2 hours | Root-causes the coverage gap instead of catching it. The ep04 decisions file already records the diagnosis: "Cause: prompts asked scene-by-scene instead of beat-by-beat" **[LOCAL]**. |
| 5 | **One `tokens.css`, and a lint rule that rejects raw hex/px outside it.** | FM7 | ~3 hours | `--plum:` is currently *declared* 56 times across 17 CSS files **[LOCAL]** — the styling drift is measurable. A conventions doc alone does not stop it; CLAUDE.md is advisory, hooks and lint rules are not **[FACT]**. |
| 6 | **Finish the canon→surfaces generator and stamp every derived file with a provenance + hash marker.** | FM7, FM6 | ~1 day | The spec is already written (`episode-canonical-source-spec.md`, 2026-07-07) and the cues→shot-list derivation already works **[LOCAL]**. This is completion, not design. |
| 7 | **Promote `curation.json` to a full asset manifest with a generation tag, and extend the existing PreToolUse block to reject anything not `approved` in the current generation.** | FM8 | ~3 hours | The hook already exists **[LOCAL]**. Today it blocks a denylist; a denylist can only block what someone remembered to add. An allowlist keyed on generation fails safe. |
| 8 | **Effort tiering + a cheap-model tier for mechanical passes.** | FM1, cost | ~1 hour | Documented: effort affects *all* tokens including tool calls **[FACT]**; subagents "control costs by routing tasks to faster, cheaper models like Haiku" **[FACT]**; Batch API is a documented 50% discount **[FACT]**. |
| 9 | **Enumeration discipline: every sweep produces a counted list first, and the count is asserted.** | FM6 | ~1 hour | Cheap, and it converts "the agent greped narrowly and reasoned as if complete" from an invisible error into an arithmetic one. |
| 10 | **Move the deadline left: pre-generate a one-episode buffer, and animate approved stills rather than generating new ones.** | FM1, FM2 | ongoing | The animate-one-still rule is already locked here **[LOCAL]** and is the only deadline lever in this report with hard vendor documentation behind it — Veo 3.1 first+last-frame and Luma Ray 3.2 keyframe anchoring are both documented **[FACT]**. |

Two things deliberately **not** in the top ten, with reasons in Section D: full-site visual regression (a maintenance trap at 188 pages) and multi-agent parallelism on the website (write-conflict territory; Anthropic explicitly flags this class).

---

# A. Agent & workflow engineering

## A1. Orchestration patterns — and when the pattern is "don't"

Anthropic's *Building effective agents* (2024-12-19) defines the vocabulary and, more usefully, the restraint **[FACT]**:

- **Prompt chaining** — "Decomposes a task into a sequence of steps, where each LLM call processes the output of the previous one," with programmatic checks between steps.
- **Routing** — "Classifies an input and directs it to a specialized followup task."
- **Parallelization** — two variants: *sectioning* (independent subtasks in parallel) and *voting* (same task run repeatedly for confidence).
- **Orchestrator–workers** — "A central LLM dynamically breaks down tasks, delegates them to worker LLMs, and synthesizes their results."
- **Evaluator–optimizer** — "One LLM call generates a response while another provides evaluation and feedback in a loop."
- **Autonomous agents** — for open-ended problems where steps cannot be hardcoded.

The restraint, quoted **[FACT]**:

> "For many applications, however, optimizing single LLM calls with retrieval and in-context examples is usually enough."
> "Agentic systems often trade latency and cost for better task performance, and you should consider when this tradeoff makes sense."
> "Success in the LLM space isn't about building the most sophisticated system. It's about building the right system for your needs."

**[INFERENCE] Applied here.** The weekly episode is a **prompt chain with deterministic checkpoints**, not an autonomous agent: canon → script → audio → cue sheet → image batch → assembly → article → surfaces. Each arrow should have a script that can fail. The two stages that genuinely warrant fan-out are the ~50-image batch (independent, no shared write target) and fact-verification (independent claims). Everything else is sequential because the output of each stage is the input to the next.

### When multi-agent actively hurts

From *How we built our multi-agent research system* (2025-06-13) **[FACT]**:

- "agents typically use about 4× more tokens than chat interactions" and "multi-agent systems use about 15× more tokens than chats."
- An Opus-lead/Sonnet-subagent system "outperformed single-agent Claude Opus 4 by 90.2%" on research tasks; "token usage by itself explains 80% of the variance."
- Parallelization "cut research time by up to 90% for complex queries."
- The limit, verbatim: "most coding tasks involve fewer truly parallelizable tasks than research, and LLM agents are not yet great at coordinating and delegating to other agents in real time."
- Multi-agent is worth its cost only for "tasks that involve heavy parallelization, information that exceeds single context windows, and interfacing with numerous complex tools."

**[INFERENCE]** The 15× token multiple is the decision rule. Editing the site is a **shared mutable state** task: several agents editing `styles.css`, `curation.json`, or a cue sheet concurrently is precisely the coordination failure that quote describes. Research, audits, and image-batch generation are read-heavy or write-disjoint and parallelize safely. If you do need parallel site edits, isolate them in git worktrees so the merge is explicit rather than racy.

## A2. Context engineering

From *Effective context engineering for AI agents* (2025-09-29) **[FACT]**:

- The governing principle: "find the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome."
- **Compaction** — "taking a conversation nearing the context window limit, summarizing its contents, and reinitiating a new context window."
- **Just-in-time retrieval** — keep "lightweight identifiers (file paths, stored queries, web links, etc.)" and load data at runtime rather than pre-loading.
- **Structured note-taking** — "The agent regularly writes notes persisted to memory outside of the context window."
- **Sub-agent isolation** — "each subagent might explore extensively... but returns only a condensed, distilled summary of its work."
- System prompts should sit at "the right altitude."

Claude Code mechanics that implement this **[FACT]**:

- `MEMORY.md`: "The first 200 lines... or the first 25KB, whichever comes first, are loaded at the start of every conversation." Topic files load on demand.
- CLAUDE.md: "target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence."
- Project-root CLAUDE.md "survives compaction: after `/compact`, Claude re-reads it from disk and re-injects it"; nested CLAUDE.md files do not.
- Subagents do not inherit the parent's auto memory (except when forked).
- Skills: "a skill's body loads only when it's used, so long reference material costs almost nothing until you need it."

**Context rot.** Anthropic frames context as a finite "attention budget" **[FACT]**; the underlying degradation of recall as in-context token count rises is documented in independent research across frontier models **[FACT, phenomenon]**, with the specific mitigation set being Anthropic's synthesis **[OPINION]**.

**[INFERENCE] Applied here.** The memory index is already doing the right thing structurally — a short index plus on-demand topic files. The two gaps are: (a) long production runs accumulate the entire image-prompt iteration history in the main context, which is exactly the case for a subagent that returns only a manifest; (b) the canonical episode file should be *retrieved* at the point of use, not pasted into the session at the start.

## A3. Determinism vs. model judgement — the single most load-bearing idea in this report

This is the axis on which this operation is losing the most time, so it gets the clearest statement. Claude Code's own documentation draws the line explicitly **[FACT]**:

> "Hooks are user-defined shell commands that execute at specific points in Claude Code's lifecycle. They provide **deterministic control** over Claude Code's behavior, ensuring certain actions always happen rather than relying on the LLM to choose to run them."

and:

> "Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens." … "Use hooks for actions that must happen every time with zero exceptions."

and, on memory specifically **[FACT]**:

> "settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer."

From *Writing tools for agents* (2025-09-11) **[FACT]**:

- "Tools can consolidate functionality, handling potentially multiple discrete operations (or API calls) under the hood."
- "More tools don't always lead to better outcomes. A common error we've observed is tools that merely wrap existing software functionality or API endpoints."
- "Tool implementations should take care to return only high signal information back to agents."
- Precision pays: "Claude Sonnet 3.5 achieved state-of-the-art performance on the SWE-bench Verified evaluation after we made precise refinements to tool descriptions."

**[INFERENCE] The test to apply.** For every recurring instruction in this operation, ask: *is this a rule, or a check?* A rule is prose an agent may or may not follow. A check is a script that exits non-zero. Anything that has been re-explained to an agent more than twice is, by definition, a check that hasn't been written yet. Concretely, these are checks masquerading as rules right now:

- "every cue must have a delivered file" → arithmetic
- "never wire an old-generation asset" → a set-membership test against a manifest
- "the article and the script must agree on the facts" → a diff against `canon.md`
- "don't say it's ready unless it passes" → a `Stop` hook
- "use the palette" → a lint rule on raw hex values

## A4. Guardrails and hard gates

Claude Code hooks, verified against the live reference on 2026-07-21 **[FACT]**.

**Events available** (the current set is substantially larger than the "core nine" in older tutorials): `Setup`, `SessionStart`, `UserPromptSubmit`, `UserPromptExpansion`, `PreToolUse`, `PermissionRequest`, `PermissionDenied`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `Notification`, `MessageDisplay`, `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `Stop`, `StopFailure`, `TeammateIdle`, `InstructionsLoaded`, `ConfigChange`, `CwdChanged`, `FileChanged`, `WorktreeCreate`, `WorktreeRemove`, `PreCompact`, `PostCompact`, `Elicitation`, `ElicitationResult`, `SessionEnd`.

**Exit-code semantics** **[FACT]**:
- **0** — "the hook reports no objection and the action proceeds normally." For `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, stdout is added to Claude's context.
- **2** — "the action is blocked. Write a reason to stderr, and Claude receives it as feedback."
- **Anything else** — action proceeds; the transcript shows a hook-error notice.
- "Don't mix them: Claude Code ignores JSON when you exit 2."

**JSON output fields** **[FACT]**: universal `continue`, `stopReason`, `suppressOutput`, `systemMessage`, `terminalSequence`; `decision: "block"` + `reason` for `UserPromptSubmit`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `Stop`, `SubagentStop`, `ConfigChange`, `PreCompact`; and `hookSpecificOutput.hookEventName` wrapping event-specific fields — `PreToolUse` takes `permissionDecision` (`allow|deny|ask|defer`), `permissionDecisionReason`, `updatedInput`, `additionalContext`; `PostToolUse` takes `updatedToolOutput`, `additionalContext`; `UserPromptSubmit` takes `additionalContext` (which is **silently ignored** if not nested under `hookSpecificOutput`).

**Which hooks can block** **[FACT]**:
- **Blocking:** `PreToolUse`, `PermissionRequest`, `UserPromptSubmit`, `UserPromptExpansion`, `Stop`, `SubagentStop`, `PostToolBatch`, `TaskCreated`, `TaskCompleted`, `TeammateIdle`, `PreCompact`, `ConfigChange`, `WorktreeCreate`, `Elicitation`, `ElicitationResult`.
- **Advisory only:** `PostToolUse`, `PostToolUseFailure`, `PermissionDenied`, `Notification`, `SubagentStart`, `SessionStart`, `Setup`, `SessionEnd`, `PostCompact`, `InstructionsLoaded`, `CwdChanged`, `FileChanged`, `MessageDisplay`, `StopFailure`, `WorktreeRemove`.

**Deadlock valve** **[FACT]**: "Claude Code overrides a Stop hook after it blocks eight times in a row without progress." Scripts should read `stop_hook_active` from the JSON input and exit 0 on the second firing. Cap is configurable via `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`.

**Non-shell hook types** **[FACT]**: `"type": "http"`, `"type": "mcp_tool"`, `"type": "prompt"` (single-turn LLM judgment, Haiku by default), `"type": "agent"` (multi-turn, up to 50 tool-turns, experimental).

**[LOCAL]** Eight hooks already run here: `response-linter.py` (Stop), `inject-rules.py` + `recall-record.py` (UserPromptSubmit), `block-dangerous-git.py` + `block-rejected-assets.py` + `enforce-cut-decisions.py` (PreToolUse), `agent-runlog.py` (PostToolUse on Agent/Task), `inject-session-context.py` (SessionStart), `pre-compact.py` (PreCompact). The architecture is right. What is missing is a **blocking** gate on the two claims that matter — "the batch is complete" and "this is ready to ship."

**[INFERENCE] One correction worth making.** `PostToolUse` cannot block — the tool has already run. Any check that must *prevent* something (a stale asset being written, a rejected filename being wired) belongs on `PreToolUse`. Checks that only need to *report* (lint results, coverage counts) are fine on `PostToolUse` or `Stop`.

## A5. Evals and QC for creative/generative pipelines

From *Demystifying evals for AI agents* (2026-01-09) **[FACT]**:

- Three grader categories: **code-based** (string match, outcome verification), **model-based** (rubric scoring, natural-language assertions), **human** (SME review, spot-check sampling).
- For research-style agents: "**Groundedness checks** verify that claims are supported by retrieved sources, **coverage checks** define key facts a good answer must include, and **source quality checks** confirm the consulted sources are authoritative."
- "LLM-based rubrics should be frequently calibrated against expert human judgment."
- "It can also help to create clear, structured rubrics to grade each dimension of a task, and then grade each dimension with an **isolated LLM-as-judge** rather than using one to grade all dimensions."
- On creative/open-ended work specifically: "We've found this approach too rigid and results in overly brittle tests, as agents regularly find valid approaches that eval designers didn't anticipate" — i.e. **do not grade generative output by exact-match; grade by rubric**.

Verification mechanisms, from Claude Code best practices **[FACT]**:

> "Claude stops when the work looks done. Without a check it can run, 'looks done' is the only signal available, and you become the verification loop... Give Claude something that produces a pass or fail, and the loop closes on its own."

Four escalating gates, in the docs' own framing **[FACT]**: (1) an in-prompt check; (2) a `/goal` condition re-checked by "a separate evaluator... after every turn"; (3) "a Stop hook runs your check as a script and blocks the turn from ending until it passes"; (4) "a verification subagent... has a fresh model try to refute the result, so the agent doing the work isn't the one grading it."

And the named failure pattern **[FACT]**:

> "**The trust-then-verify gap.** Claude produces a plausible-looking implementation that doesn't handle edge cases. Fix: Always provide verification (tests, scripts, screenshots). If you can't verify it, don't ship it."

With a counter-warning against over-eager reviewers **[FACT]**: "A reviewer prompted to find gaps will usually report some, even when the work is sound... Tell the reviewer to flag only gaps that affect correctness or the stated requirements, and treat the rest as optional."

### Automated QC for generated images specifically

| Technique | Tool | What it actually catches | Honest reliability |
|---|---|---|---|
| Perceptual hashing | `imagehash` (pHash/dHash/aHash), `imagededup` | "The model returned one frame N times for a multi-beat sequence" — your exact FM3 symptom | **[FACT]** Robust to resize/recompression; **[FACT]** breaks under crop, rotation, heavy grading. Cheap first-pass filter, not a sole gate. |
| Prompt–image alignment | CLIPScore (Hessel et al., arXiv:2104.08718, EMNLP 2021) | "Did it draw the prompt at all" | **[FACT]** Validated for *captioning* correlation, not scene-completeness. Coarse relevance gate; will not catch identity drift. |
| Face-embedding similarity | InsightFace / ArcFace | Character face drift across a batch — your FM2 symptom | **[FACT]** mechanism is sound: cosine-similarity of 512-d embeddings against a canon reference. **[OPINION, grounded]** ArcFace is trained on photographic faces; comic/painterly faces are out of distribution — expect lower absolute scores and outright detector misses. Usable as a *relative* signal against your own baseline; do not import thresholds from face-verification literature. |
| Multimodal LLM-as-judge | Claude/GPT vision, rubric-scored | "Is this on-model / on-style, and does it depict the beat" | **[FACT]** The *MLLM-as-a-Judge* benchmark reports GPT-4V consistency of 0.675 on pairwise comparison, dropping to 0.611 on scoring and 0.418 on batch ranking. Best used as **triage feeding human review**, and as **pairwise A/B** rather than absolute scoring — that is the task the benchmark shows it is least bad at. |

**[INFERENCE] The composite that fits this pipeline:** pHash for the duplicate/missing-beat check (mechanical, near-free), expected-count assertion against the cue manifest (arithmetic, free), face-embedding similarity baselined on your own approved frames as a drift alarm, and an MLLM pairwise judge only for the frames the cheap checks flag as ambiguous. Note this ordering deliberately puts the cheapest and most reliable check first.

## A6. Human-in-the-loop: where the founder's approval should sit

**[FACT]** Anthropic's containment research reports that "users approved roughly 93% of permission prompts" — approval fatigue degrades oversight into rubber-stamping. It also reports that an auto-mode classifier caught "~83% of overeager behaviors before execution," and OS-level sandboxing reduced prompt volume by 84%.

**[FACT]** Auto-mode's classifier "runs on Claude Sonnet 5 by default rather than on your `/model` selection... Classifier calls count toward your token usage."

**[INFERENCE] Applied here.** The founder should not be the bug-catcher; she should be the *taste* gate. That means approval concentrated at a small number of irreversible, judgement-dense points, with everything mechanical delegated to scripts:

| Gate | What she approves | Why here |
|---|---|---|
| **G1 — canon lock** (start of week) | The episode's canon file: premise, facts, lesson, quotables, the beat list. | Everything downstream is derived. One approval propagates. |
| **G2 — style/character reference lock** | The reference frames the batch will condition on. | Consistency is decided here or not at all. |
| **G3 — batch triage** | Only the frames the automated checks flagged, presented as A/B pairs. | Converts "review 50 images" into "adjudicate 6." |
| **G4 — cut approval** | The assembled cut, once and only once the coverage gate is green. | She should never be the one who discovers a beat is missing. |
| **G5 — publish** | The site diff summary + link/asset check results. | One irreversible action, one look. |

Everything else — did the file land, does the link resolve, is the palette right, does the article match canon — is a script's job. The single structural change is that **G4 must be unreachable until the coverage gate passes**, so her attention is never spent on completeness.

## A7. Cost and latency control

**[FACT]** Prompt caching multipliers, relative to base input price: 5-minute cache write **1.25×**, 1-hour cache write **2×**, cache read **0.1×**. Anthropic's pricing page states caching "pays off after just one cache read for the 5-minute duration... or after two cache reads for the 1-hour duration."

**[FACT]** Caching is a prefix match with up to 4 breakpoints per request, a 20-content-block lookback, and a model-dependent minimum cacheable prefix (1,024–4,096 tokens depending on family) — below the minimum it silently does not cache. Verify with `cache_read_input_tokens`; if it is zero across repeated identical-prefix requests, something in the prefix is varying.

**[FACT]** Batch API: "reducing costs by 50%" on both input and output, "most batches finishing in less than 1 hour." Batch and caching discounts stack.

**[FACT]** Subagent cost control: subagents "control costs by routing tasks to faster, cheaper models like Haiku."

**[FACT]** Effort affects *all* tokens, not just thinking: "lower effort would mean Claude makes fewer tool calls."

**[INFERENCE]** For this operation the three levers in order of payoff are: (1) a stable, cached prefix for the repeated passes — canon file + style rules + palette — since the weekly pipeline runs the same prefix dozens of times; (2) Batch API for the non-interactive verification passes (fact-checking, alt-text, quiz generation) where an hour of latency is free; (3) effort tiering, covered in Section B.

## A8. Documented failure modes and their named mitigations

| Failure mode | Source | Named mitigation |
|---|---|---|
| Compounding errors from autonomy | *Building effective agents* **[FACT]** | Prefer a fixed workflow over an open-ended agent when the task is well-defined |
| Multi-agent write conflicts | *Multi-agent research system* **[FACT]** | Single agent, or worktree-isolated agents, for shared-file tasks |
| Context rot | Anthropic context-engineering + independent research **[FACT]** | Compaction, just-in-time retrieval, note-taking, subagent isolation |
| **Trust-then-verify gap** (agent claims success) | Claude Code best practices **[FACT]** | Stop-hook gate; adversarial reviewer in fresh context; require evidence not assertion |
| Reviewer over-flagging → over-engineering | Claude Code best practices **[FACT]** | Scope the reviewer to correctness/requirements only |
| Approval fatigue (93% approval rate) | *How we contain Claude* **[FACT]** | Fewer, higher-stakes gates; automated pre-screening |
| Stop-hook infinite loop | Hooks guide **[FACT]** | `stop_hook_active` check; 8-block override cap |
| Bloated CLAUDE.md → rules ignored | Claude Code best practices **[FACT]** | Under ~200 lines; procedures → skills; domain rules → path-scoped rules |
| Cluttered session context | Claude Code best practices **[FACT]** | `/clear` between unrelated tasks, and after two failed correction attempts |
| Prompt injection via tool results | *How we contain Claude* **[FACT]** | Layered containment; "protection in the model layer will never be 100% effective" |

---

# B. Model selection per task

**Verification note.** The table below was taken from the local `claude-api` skill (the authoritative bundled reference, cached 2026-06-24) and then **re-verified line by line against the live Anthropic documentation on 2026-07-21** — models overview, pricing, and effort pages. Every figure is **[FACT]**. Where the two disagreed, the live docs win; no disagreements were found.

## B1. The current Claude lineup

| | **Claude Fable 5** | **Claude Opus 4.8** | **Claude Sonnet 5** | **Claude Haiku 4.5** |
|---|---|---|---|---|
| API ID | `claude-fable-5` | `claude-opus-4-8` | `claude-sonnet-5` | `claude-haiku-4-5-20251001` (alias `claude-haiku-4-5`) |
| Docs description | "Next-generation intelligence for long-running agents" | "For complex agentic coding and enterprise work" | "The best combination of speed and intelligence" | "The fastest model with near-frontier intelligence" |
| Input $/MTok | $10 | $5 | $3 — **intro $2 through 2026-08-31** | $1 |
| Output $/MTok | $50 | $25 | $15 — **intro $10 through 2026-08-31** | $5 |
| Cache write 5m / 1h | $12.50 / $20 | $6.25 / $10 | $2.50 / $4 (intro) | $1.25 / $2 |
| Cache read | $1 | $0.50 | $0.20 (intro) | $0.10 |
| Batch in / out | $5 / $25 | $2.50 / $12.50 | $1 / $5 (intro) | $0.50 / $2.50 |
| Context window | 1M | 1M | 1M | 200K |
| Max output | 128K | 128K | 128K | 64K |
| Reliable knowledge cutoff | Jan 2026 | Jan 2026 | Jan 2026 | **Feb 2025** |
| Adaptive thinking | Yes — **always on** | Yes (set `thinking:{type:"adaptive"}`) | Yes — on by default | **No** |
| Extended thinking (`budget_tokens`) | No (400) | No (400) | No (400) | **Yes** |
| `effort` parameter | Yes | Yes | Yes | **Not supported** |
| Effort levels | low/medium/high/xhigh/max | low/medium/high/xhigh/max | low/medium/high/xhigh/max | — |
| Effort default | high | high | high | — |
| Latency (docs' own word) | Slower | Moderate | Fast | Fastest |

Two traps worth flagging explicitly, because they will bite this operation:

- **Haiku 4.5 does not support `effort` and does not support adaptive thinking.** It uses the older `thinking: {type:"enabled", budget_tokens:N}` form. Code written for the other three will 400 on Haiku and vice versa **[FACT]**.
- **Haiku 4.5's reliable knowledge cutoff is Feb 2025** — a year older than the other three **[FACT]**. Given the locked "never teach stale AI" rule, Haiku must never be the model that writes or checks a claim about the current AI landscape. It is a mechanical worker, not a source.

Further verified numbers:

- **1M context at standard pricing** on Fable 5, Opus 4.8/4.7/4.6, Sonnet 5, Sonnet 4.6. "A 900k-token request is billed at the same per-token rate as a 9k-token request." **[FACT]**
- **Tool-use system-prompt overhead** added to any request declaring tools: Opus 4.8 = 290 tokens (`auto`/`none`) / 410 (`any`/`tool`); Sonnet 5 = 354 / 474; Haiku 4.5 = 496 / 588 **[FACT]**.
- **Web search** server tool = **$10 per 1,000 searches** + token costs. **Web fetch = no additional charge** **[FACT]**.
- **Code execution**: free when used alongside `web_search_20260209`+ / `web_fetch_20260209`+; otherwise **1,550 free container-hours/month per org**, then $0.05/hour per container **[FACT]**.
- **Batch API extended output**: Opus 4.8/4.7/4.6, Sonnet 5, Sonnet 4.6 support up to **300K output tokens** on the Message Batches API with beta header `output-300k-2026-03-24` **[FACT]**.
- **Fast mode** (research preview, Opus 4.8 and 4.7 only): Opus 4.8 fast = $10 in / $50 out per MTok. **Opus 4.7 fast mode is removed 2026-07-24** — three days from this report's date. Not available with the Batch API **[FACT]**.
- **Tokenizer change**: Opus 4.7+, Fable 5, and Sonnet 5 use a newer tokenizer producing "approximately 30% more tokens for the same text" than Sonnet 4.6 and earlier **[FACT]**. Any token budget calibrated on an older model does not transfer.

## B2. Effort levels — documented guidance

**[FACT]**, from the effort documentation:

- `high` is the default and is "exactly the same behavior as omitting the `effort` parameter entirely."
- `xhigh` — "Extended capability for long-horizon work... Long-running agentic and coding tasks (over 30 minutes) with token budgets in the millions." Fable 5, Opus 4.8, Opus 4.7, Sonnet 5 only.
- `low` — "Most efficient. Significant token savings with some capability reduction... Simpler tasks that need the best speed and lowest costs, **such as subagents**."
- Effort is "a behavioral signal, not a strict token budget."
- **Opus 4.8:** "Start with `xhigh` for coding and agentic use cases, use `high` for most other intelligence-sensitive workloads, and step down to `medium` or `low` only when you've measured that the lower level holds quality on your evals." At `xhigh`/`max`, "set a large `max_tokens`... Starting at 64k tokens and tuning from there is a reasonable default."
- **Fable 5:** "Start with `high`, the default, for most tasks, use `xhigh` for the most capability-sensitive workloads, and step down to `medium` or `low` for routine work. Lower effort settings on Claude Fable 5 still perform well and often exceed `xhigh` performance on prior models."
- **Sonnet 5:** high default; `xhigh` "for the hardest coding and agentic tasks"; `medium` is "Comparable to Claude Sonnet 4.6 at high effort."

## B3. Which model for which job — this operation's tasks

**[INFERENCE]** built on the **[FACT]** table above. Rationale given for each so it can be re-derived when models change.

| Task in this operation | Model | Effort | Why |
|---|---|---|---|
| **Long-horizon orchestration** — the whole weekly run, unattended, multi-hour | **Opus 4.8** at `xhigh`, or **Fable 5** at `high` if a week is genuinely stuck | `xhigh` / `high` | `xhigh` is documented as the setting for "long-running agentic and coding tasks (over 30 minutes)". Fable 5 is 2× Opus 4.8's price and its docs warn turns "can run for many minutes"; reserve it for the hardest week, not the default week. |
| **Code and wiring** — HTML/CSS/JS, hooks, build scripts | **Opus 4.8** | `xhigh` | Documented as the recommended start for coding and agentic use. |
| **Bulk mechanical edits** — rename 400 asset refs, add `loading="lazy"` to every `<img>` | **Haiku 4.5** (or Sonnet 5 `low` if the edit needs judgement) | n/a (Haiku has no effort) | Deterministic transformations. **[INFERENCE]** If the edit is truly mechanical it should be `sed`/a script, not a model at all — see A3. |
| **QC / verification passes** — coverage gate reporting, link checks, diff review | **Sonnet 5** at `medium`, in a **fresh context** | `medium` | Documented as "comparable to Claude Sonnet 4.6 at high effort" — good quality at Sonnet price. The fresh context matters more than the model: the docs' verification pattern is "a fresh model try to refute the result, so the agent doing the work isn't the one grading it" **[FACT]**. |
| **Creative copywriting in a strict brand voice** | **Opus 4.8** at `high` | `high` | Its documented default voice is "direct, opinionated... minimal validation-forward phrasing" and it "interprets prompts literally" **[FACT]** — which means an explicit, quoted voice spec is respected rather than diluted. |
| **Fact-checking** | **Opus 4.8** at `high` or `xhigh`, with web search | `high`/`xhigh` | `high`/`xhigh` "show substantially more tool usage in agentic search" **[FACT]**. Never Haiku here (Feb 2025 cutoff). Budget $10/1,000 searches. |
| **Image-prompt authoring** | **Opus 4.8** at `high` | `high` | Needs canon adherence + literal instruction following. **[INFERENCE]** Prompts should be *generated from the manifest*, so the model is filling a template, not inventing scope. |
| **Cheap high-volume classification** — tagging assets, sorting frames, alt-text drafts | **Haiku 4.5**, via **Batch API** | n/a | $0.50/$2.50 per MTok batched — the cheapest verified option, and latency is irrelevant for these. |
| **Hook-embedded judgement calls** | `"type": "prompt"` hooks — **Haiku by default** **[FACT]** | n/a | Sub-second, per-tool-call. Keep the rubric to one binary question. |

**Non-Claude models where genuinely better.** Claude does not generate images or video. From the media research **[FACT unless marked]**:

| Job | Option | Verified capability |
|---|---|---|
| Image generation / edit with **character reference** | Gemini image models `gemini-3.1-flash-image-preview` ("Nano Banana 2") and `gemini-3-pro-image-preview` ("Nano Banana Pro") | 2K/4K output, multi-turn conversational editing **[FACT]**. Exact reference-image ceilings **[NOT VERIFIED]** — see Open questions. |
| Image edit preserving a character across scenes | **FLUX.1 Kontext** [pro/max/dev] | Official claim: preserves "a reference character or object in a picture, across multiple scenes and environments" **[FACT]**. Max reference count **[NOT VERIFIED]**. |
| Character reference, hard limit known | **Ideogram Character** | "Currently only 1 [reference] image is supported, rest will be ignored" **[FACT]** — the only model in the survey with a confirmed, documented ceiling. |
| Locked character/style via **LoRA** | Replicate `fast-flux-trainer` | ~20 images / 1000 steps ≈ 20 minutes ≈ **$1.85** on H100 at $0.001528/sec **[FACT]**. fal.ai equivalents ≈$2–2.40 **[FACT, secondary]**. No official minimum dataset size is published **[NOT VERIFIED]**; 15–30 images is community norm **[OPINION]**. |
| **Image → video** with first/last-frame control | **Veo 3.1** (`veo-3.1-generate-preview`) | 4/6/8s; 8s required for extend/reference features; 720p default, 1080p/4K at 8s only; image-to-video **and explicit first+last-frame interpolation** **[FACT]**. |
| Image → video with **multi-keyframe** control | **Luma Ray 3.2** (`ray-3.2`) | 5s default / 10s optional; 360p–1080p; `start_frame`/`end_frame` anchors **plus up to 64 guide frames** via `keyframe_indexes` **[FACT]** — the most granular frame conditioning found. |
| Longer clips | **Sora 2 / Sora 2 Pro** | "16- and 20-second generations"; 1280×720 / 1920×1080 / 1080×1920; input reference image becomes the first frame **[FACT]**. ⚠ **human-face input images are currently rejected** **[FACT]** — a real constraint for drawn human characters. |

**[INFERENCE]** Given the locked "animate one approved still" rule, **Veo 3.1 and Luma Ray 3.2 are the two options with documented support for exactly that workflow.** Luma's 64-keyframe mode is the closest match to a comic pipeline where you have several approved stills for one beat and want motion between them rather than new generations.

---

# C. Website design & maintenance with agents

## C1. Design consistency without a component framework

**[FACT]** CSS custom properties are the native token mechanism for a no-build-step site: `--name: value` declared on an element, scoped by the cascade, read via `var()` with fallback support. They cannot be used in selectors or media/container queries (MDN).

**[FACT]** The Design Tokens Community Group published **Design Tokens Format Module 2025.10** on 2025-10-28 as its first stable version. It is explicitly **not a W3C Standard** and not on the W3C Standards Track — a Community Group deliverable. 10+ tools support or are implementing it (Figma, Sketch, Penpot, Style Dictionary).

**[INFERENCE]** For 188 static pages with no build step, DTCG JSON is overkill — it requires Style Dictionary to compile down to the CSS custom properties you would otherwise hand-author. Author the custom properties directly, in **one** file, linked from every page.

**[LOCAL] The measurable problem.** Across 17 CSS files, `--plum:` is *declared* 56 times, `--gold:` 47, `--ink:` 37, `--cream:` 36. These are not usages — they are re-declarations. That is the styling-drift failure mode as a number: there is no single token source, so each new page or agent pass re-declares its own.

**[NOT VERIFIED]** No official Anthropic document was found that specifically addresses constraining an agent to an existing design system. The context-engineering and building-effective-agents posts cover general prompt/context design but not visual-system adherence.

**[OPINION]** A named practitioner pattern (atomize.tools) is: export tokens → compile to CSS variables → point the agent's conventions file at the compiled artifact before it edits code.

**[INFERENCE] — and this is the part that matters.** "Agents reinvent styling per page" is the predictable outcome of a rules-only conventions doc. Anthropic's own docs say CLAUDE.md "is not a hard enforcement layer" **[FACT]**. Three things close the loop, in ascending order of teeth:

1. **A concrete artifact, not prose.** Point the agent at `assets/css/tokens.css` by path and require it to read the file before writing any color, spacing, or font value. Agents follow a greppable file far more reliably than a narrative rule.
2. **A lint rule.** Reject any raw hex, `rgb()`, or non-token font-family in any CSS/HTML file other than `tokens.css`. This is ~15 lines of Python and can run on `PreToolUse` (blocking) or as a pre-commit check.
3. **A page template.** The homepage is already the stated quality bar. Make it a literal template file with named slots, so "build a new building page" starts from the bar rather than from a blank file.

## C2. Site integrity checks a single person can run

All of the following run offline/locally. Verified 2026-07-21 **[FACT]** unless noted.

| Tool | Maintainer | URL | Note |
|---|---|---|---|
| **lychee** | lycheeverse (NGI0/NLnet-funded) | github.com/lycheeverse/lychee | Rust static binary; checks HTML, Markdown, local files; has a GitHub Action |
| **linkinator** | Justin Beckwith (Google) | github.com/JustinBeckwith/linkinator | Crawls local files or live sites; checks CSS refs, fragments, redirects |
| **W3C Link Checker** | W3C | validator.w3.org/checklink · github.com/w3c/link-checker | Official; installable Perl script, not only hosted |
| **Nu Html Checker (vnu)** | validator/validator | github.com/validator/validator | `java -jar vnu.jar FILE.html`, fully offline, Java 17+. The engine behind validator.w3.org/nu |
| **html-validate** | html-validate.org | html-validate.org | v11.5.6 current at check time; "all validation performed locally, no markup leaves your machine"; includes WCAG-2.2-relevant structural rules |
| **hyperlink** | untitaker | github.com/untitaker/hyperlink | Fast local link checker, CI-oriented |
| **pre-commit** | pre-commit.com | pre-commit.com | Framework to run any of the above as a git hook |

**Orphan-page detection: [NOT VERIFIED]** — no actively-maintained free tool specific to "orphan page in a static site" was found. **[INFERENCE]** This is a ten-line script, not a tool gap: union every `href` across `**/*.html`, subtract from `find . -name '*.html'`, print the difference. For 188 pages that runs instantly and is more trustworthy than a crawler.

**[LOCAL]** GitHub Actions already run here (`ai-model-freshness.yml`, `hot-goss-daily.yml`), and the repo is a git worktree of `github.com/laidies/LAIDIES`. So CI exists — the integrity checks can be a workflow, and do not need to depend on the founder remembering to run them.

## C3. Asset governance

**[LOCAL] What exists:** `operations/ops/curation.json` maps asset slugs to verdicts (`"correct"`, `"unused"`, `"re…"`), 433 files sit under `approved-assets/`, and `block-rejected-assets.py` runs on `PreToolUse` for Bash/Edit/Write. `ep04-cut-decisions.md` carries a machine-readable ` ```banned ` block that the hook reads — a genuinely good design, because adding a line to the markdown enforces it immediately.

**[INFERENCE] The structural weakness.** Today's mechanism is a **denylist**: it blocks filenames someone remembered to ban. The stale-asset failure mode is the opposite shape — an agent picks a plausible-looking file from a 433-file library that nobody thought to ban, because it is from a superseded generation. A denylist cannot catch an unknown.

The fix is to invert it. Give every asset a record with `{slug, generation, verdict, supersedes, approved_date}`, and have the PreToolUse hook **allow only** assets whose verdict is `approved` **and** whose `generation` equals the episode's declared current generation. This maps directly onto a rule already locked in this operation — "never mix style generations" — and turns it from prose into a set-membership test. Failing closed on an unknown filename is the entire point: an unrecognised asset should be a block, not a pass.

## C4. Regression safety without a test suite

| Option | Cost | Honest assessment |
|---|---|---|
| **Playwright `toHaveScreenshot()`** | Free, local; diffs via `pixelmatch` on your own machine | **[FACT]** Baselines committed to the repo; `maxDiffPixels`/`maxDiffPixelRatio` thresholds; regions maskable. **[OPINION, consistent across practitioner sources]** Font rendering and OS differences between local and CI are a well-known false-positive source — generate and check baselines in the *same* environment (e.g. a Docker image matching CI). Best fit here. |
| **BackstopJS** | Free, MIT | Older; pure pixel diff. **[NOT VERIFIED]** current version — conflicting signals between a 2019 release tag and changelog mentions of a Node-20-compatible 6.3.2. Check `npm view backstopjs version` before adopting. |
| **Lost Pixel** | MIT, self-hostable | ⚠ **[FACT] The repository was archived 2026-04-22** (team joined Figma); last release v3.22.0, 2024-11-14. **Do not adopt** — it still appears in 2024–25 "best visual regression tools" listicles. |
| **Percy** (BrowserStack) | Free ~5,000 screenshots/mo, then usage-billed (~$0.036/screenshot list) | SaaS + billing. Cost risk at 188 pages. |
| **Chromatic** | Free 5,000 snapshots/mo; paid from ~$149/mo | Built around Storybook component stories — fights the core assumption of a framework-less HTML site. |

**[INFERENCE] Scope, not tooling, is the decision.** Full visual regression across 188 pages maintained by one person is a maintenance trap regardless of tool: every intentional design change requires a human to re-approve every affected baseline. The workable version is **Playwright `toHaveScreenshot()` on 8–12 template-representative pages** — homepage, one building page, one episode page, the Closet, one library page — run in a fixed environment. That catches "an agent broke the global header" without creating a second job.

## C5. Accessibility and performance an agent should enforce automatically

**[FACT]** Deque's *Automated Accessibility Coverage Report* — analysing 2,000+ audits, 13,000+ pages, ~300,000 issues with the axe suite — found **57.38% of accessibility issues by volume** are caught by automated testing. Deque explicitly frames this as a revision of the older "20–30% of WCAG can be automated" figure, which counted WCAG *success criteria* rather than *issues found*. **Both figures circulate; they measure different things.** Cite the methodology when citing either.

**[FACT]** Tooling:
- **axe-core** (Deque Labs, MIT), v4.12.1 at check time. Designed for **zero false positives**, which means it under-reports — a clean run is not proof of accessibility, only absence of the specific violations it checks.
- **Lighthouse CI** (Google Chrome team), v0.15.1 (2025-06-26), actively maintained. Runs offline against local files; asserts thresholds and can fail a commit.
- **pa11y-ci** (pa11y org), v4.1.1 (~May 2026), actively maintained.

**[FACT]** Core Web Vitals "good" thresholds, measured at the **75th percentile** of page loads (web.dev/articles/vitals, content last updated 2024-10-31; INP replaced FID in March 2024): **LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1**. A page passes only when all three clear simultaneously at p75.

**[INFERENCE]** Given ~2,000 local asset references, the highest-value automatic enforcement is not an a11y suite — it is a two-rule lint on `<img>`: **explicit `width`/`height`** (prevents layout shift → CLS) and **`loading="lazy"` below the fold**. That is a grep, it is deterministic, and it addresses the metric this site is most likely to fail.

## C6. AI-assisted design critique — as experience, not mechanics

**[FACT]** Nielsen's 10 Usability Heuristics (NN/g, originally published 1994-04-24, article last updated 2024-01-30): visibility of system status; match between system and real world; user control and freedom; consistency and standards; error prevention; recognition rather than recall; flexibility and efficiency of use; aesthetic and minimalist design; help users recognise/diagnose/recover from errors; help and documentation. Decades-stable and directly usable as a structured critique checklist.

**On whether an LLM can judge a page as an experience, the honest answer is: weakly, and the evidence is thin.**

- **[FACT]** *MLLM as a UI Judge* (arXiv:2510.08783, 2025-10-09) benchmarked GPT-4o, Claude and Llama against crowdsourced human preference on **only 30 interfaces**, and concluded models "approximate human preferences on some dimensions but diverge on others." The authors frame this as potential *and* limitations.
- **[FACT]** The broader *MLLM-as-a-Judge* benchmark reports GPT-4V consistency of 0.675 on pairwise comparison, 0.611 on scoring, 0.418 on batch ranking.
- **[FACT]** Adjacent work — UICrit (ACM DIS 2024) — builds a UI critique dataset; these are research prototypes, not production-validated tools.

**[INFERENCE] What this means for the page-experience standard.** There is **no validated, production-grade LLM-as-judge protocol for visual/UX quality** to adopt off the shelf. But two things are still worth doing, because they are cheap and because the alternative is nothing:

1. **Structured heuristic critique.** Point an agent at Nielsen's 10 heuristics plus your own house criteria — *does this page feel like this building? could a visitor tell what to do in three seconds? is there anything here that only exists because a template had a slot?* — and require one paragraph per criterion, with a screenshot. This is a repeatable prompt, not a validated metric.
2. **Pairwise against the homepage.** The benchmark data says pairwise comparison is the task MLLM judges do least badly (0.675 vs 0.418 for ranking). So the question should be *"compared with the homepage, where does this page fall short?"* — never *"score this page 1–10."* That aligns the method with the evidence, and it also happens to encode the existing standard, which is that the homepage **is** the bar.

The critique output is a **candidate list for a human look**, not a verdict. Do not automate accept/reject on it.

## C7. Single-source-of-truth content patterns

**[LOCAL]** The design already exists and is good. `operations/episode-canonical-source-spec.md` (2026-07-07) names the problem in its own words — "One episode's content is currently hand-authored across ~11 surfaces that drift apart" — and specifies `content/episodes/episode-0N.canon.md` with a field-to-surface propagation map. The cue-sheet → shot-list derivation already works and the shot list carries the right warning: "⚠ Regenerate this file after ANY cue-sheet change — it is derived, never hand-edited."

**[INFERENCE]** So the pattern is proven here. What is missing is (a) generation rather than hand-authoring for the remaining surfaces, and (b) *detectability* — a way for a script to know a derived file is stale. Three mechanisms, all cheap:

1. **Provenance marker on every derived file.** `<!-- GENERATED from content/episodes/episode-04.canon.md — do not edit -->`. Universal engineering convention (protobuf, OpenAPI, GraphQL codegen all do this) though **[NOT VERIFIED]** as any single citable standard. Its function here is to redirect an agent that opens a derived file mid-task.
2. **Content hash in the marker.** `<!-- GENERATED from …canon.md sha256:abc123… -->`. A pre-commit check recomputes the canonical file's hash and fails if any derived surface's stored hash does not match. This is standard build-system dependency tracking, implementable in ~20 lines, and consistent with the existing `check-episode.sh` pattern.
3. **Expiring facts.** For claims that go stale — model names, capabilities, cutoffs — the rule is: never hardcode them in prose on any surface; interpolate from `content/site/current-models.js` **[LOCAL — this file and its weekly freshness workflow already exist]**. Then add a grep-based lint that flags any HTML containing a bare model name, or a four-digit year adjacent to "latest"/"newest"/"current", that did not come from that file. **[NOT VERIFIED]** — no off-the-shelf tool does this; it is a bespoke check, but a short one.

---

# D. Recommendations, by failure mode

Each recommendation names a mechanism, cites its grounding, and states the effort.

## FM1 — Never hits the Wednesday deadline

**Recommendation: convert the pipeline from a push to a pull, with a one-episode buffer and hard stage gates.**

- **D1a. Deterministic stage gates.** Each arrow in canon → script → audio → cues → images → cut → article → surfaces gets a script that exits non-zero. Anthropic's own framing for prompt chaining is "programmatic checks on intermediate steps" **[FACT]**. Today failures surface at assembly, which is the most expensive possible place. *Effort: builds on `check-episode.sh`, ~half a day total.*
- **D1b. Animate approved stills instead of generating new ones.** This is already the locked rule here **[LOCAL]** and it is the only deadline lever in this report with vendor documentation behind it: Veo 3.1 supports image-to-video with explicit first+last-frame interpolation, and Luma Ray 3.2 supports `start_frame`/`end_frame` anchors plus up to 64 guide frames **[FACT]**. Generating a fresh still per beat and hoping for consistency is not supported by any documented consistency guarantee from any vendor surveyed.
- **D1c. One-episode buffer.** **[INFERENCE, flagged honestly]** — no peer-reviewed or vendor source exists for AI-content production scheduling; the search returned only generic content-calendar marketing advice **[OPINION, low relevance]**. The argument stands on its own: with zero buffer, every generation failure is a deadline failure. With one episode banked, a bad batch costs quality-of-life, not the ship date.
- **D1d. Effort and batching.** `xhigh` for the orchestration run **[FACT: documented for >30-minute agentic tasks]**; Batch API at 50% off for the non-interactive passes **[FACT]**; a stable cached prefix for the repeated passes **[FACT: cache reads are 0.1×]**.
- **D1e. Task budgets.** For the long unattended run, Anthropic documents `output_config.task_budget` (beta `task-budgets-2026-03-13`, minimum 20,000 tokens) which surfaces a countdown to the model so it paces itself and finishes gracefully rather than being cut off — distinct from `max_tokens`, which is an enforced ceiling the model cannot see **[FACT]**.

## FM2 — Generation quality inconsistent (off-model, mistimed, drifting)

**Recommendation: make consistency a conditioning problem, not a prompting problem — then measure the drift.**

- **D2a. Train a character/style LoRA and stop re-describing.** Replicate's `fast-flux-trainer`: ~20 images, 1000 steps, ~20 minutes, **≈$1.85** **[FACT]**. That is the cheapest structural fix in this document. **[LOCAL]** Two LoRAs were trained here on 2026-07-17 but the training set was off-canon and the result unusable — that is a *dataset* failure, not a method failure, and it is fixable by training on the approved, locked frames rather than a mixed set.
- **D2b. Condition on references, not adjectives.** FLUX.1 Kontext officially claims preservation of "a reference character or object... across multiple scenes and environments" **[FACT]**; Gemini's Nano Banana family supports multi-turn conversational editing at 2K/4K **[FACT]**; Ideogram Character accepts exactly **1** reference image, documented **[FACT]**. Note that reference-image *ceilings* are undocumented for most of these — see Open questions.
- **D2c. Measure drift instead of eyeballing it.** Face-embedding cosine similarity (InsightFace/ArcFace) against a canon reference, baselined on your own art style **[FACT: mechanism]**, with the honest caveat that ArcFace is trained on photographic faces and comic faces are out of distribution **[OPINION, grounded]** — use it as a relative alarm, never an absolute threshold.
- **D2d. Seeds are secondary.** No image model surveyed documents bit-for-bit reproducibility once a reference image is in the prompt **[FACT/NOT VERIFIED mix]**. Seed pinning reduces variance; LoRA and reference conditioning are what actually hold identity. Do not let seed discipline substitute for either.
- **Anti-pattern:** treating style drift as a prompt-wording problem. More adjectives is the intervention that feels productive and is not.

## FM3 — Coverage gaps (multi-beat sequences silently return one frame)

**This is the highest-ranked recommendation in the report, because it is cheap, mechanical, and currently unguarded.**

- **D3a. Expected-count reconciliation (the coverage gate).** A script reads `content/episodes/episode-0N-cues.json`, extracts every `src`, and asserts the file exists on disk at the expected path and resolution. Fails with the list of missing beats. **[LOCAL]** The manifest already exists and already drives the shot list; nothing new needs designing. Anthropic's eval taxonomy names "**coverage checks** define key facts a good answer must include" as a distinct grader class **[FACT]**. Neither Replicate nor fal.ai provides expected-vs-received reconciliation as a product feature — both give you the completion signal, and the roster is yours to keep **[FACT]**. *Effort: ~1 hour.*
- **D3b. Generate prompts from the manifest, one file per beat.** The ep04 decisions file already records the root cause in its own words: "**Cause: prompts asked scene-by-scene instead of beat-by-beat**" **[LOCAL]**. A prompt-generator that iterates the cue list cannot silently collapse three beats into one, because it emits one prompt file per cue. *Effort: ~2 hours.*
- **D3c. pHash the delivered batch.** Near-duplicate detection catches "the same frame came back for beats 12, 13 and 14" even when the file count is right **[FACT: `imagehash`/`imagededup`]**, with the documented caveat that pHash breaks under crop/rotation **[FACT]**.
- **D3d. Prompt for coverage, filter later.** Anthropic's published language for exactly this, verbatim **[FACT]**:
  > "Report every issue you find, including ones you are uncertain about or consider low-severity. Do not filter for importance or confidence at this stage — a separate verification step will do that. Your goal here is coverage: it is better to surface a finding that later gets filtered out than to silently drop a real bug."

## FM4 — Decisions evaporate

**Recommendation: keep the mechanism you have; fix its scope and its write path.**

- **D4a. What is already right.** `ep04-cut-decisions.md` with a machine-readable ` ```banned ` block read by `enforce-cut-decisions.py` on `PreToolUse` is a genuinely good pattern **[LOCAL]** — the decision, the reason, and the enforcement live in one human-readable file, and adding a line enforces immediately. It also fires as `additionalContext` on tool use, so the agent sees the reasoning, not just a refusal. Keep it.
- **D4b. Make it durable across episodes.** A per-episode file means every new episode starts with an empty decision memory, and cross-cutting rulings (art direction, voice, naming) have nowhere to live. **[INFERENCE]** Promote to `operations/DECISIONS.md` with per-episode sections plus a standing section, keeping the same machine-readable block format.
- **D4c. Write at the moment of decision, not at the end.** **[FACT]** Anthropic's context-engineering guidance describes structured note-taking as writing notes "persisted to memory outside of the context window" that "get pulled back into the context window at later times." **[FACT]** Fable-5 guidance gives usable format rules directly: "Store one lesson per file with a one-line summary at the top. Record corrections and confirmed approaches alike, including why they mattered. Don't save what the repo or chat history already records; update an existing note rather than creating a duplicate; delete notes that turn out to be wrong."
- **D4d. Why the hook is doing the real work.** CLAUDE.md "is not a hard enforcement layer" **[FACT]**; the `PreToolUse` block is. A decision recorded only in prose is a decision that will be re-litigated after the next context turnover.

## FM5 — Agents over-report and under-verify

**Recommendation: make "done" a state a script grants, not a sentence a model writes.**

- **D5a. A blocking `Stop` hook.** Claude Code's own docs describe the mechanism: "a Stop hook runs your check as a script and blocks the turn from ending until it passes" **[FACT]**, and name the failure it prevents — "**The trust-then-verify gap.** Claude produces a plausible-looking implementation that doesn't handle edge cases. Fix: Always provide verification (tests, scripts, screenshots). **If you can't verify it, don't ship it.**" **[FACT]** **[LOCAL]** A `Stop` hook already exists (`response-linter.py`); extend it to exit 2 when the response asserts completion but the relevant check has not passed. Read `stop_hook_active` and exit 0 on the second firing to avoid the documented deadlock; the platform also overrides after 8 consecutive blocks **[FACT]**.
- **D5b. Paste the grounding paragraph.** Anthropic-published, verbatim, and reported by Anthropic to have "nearly eliminated fabricated status reports even on tasks designed to elicit them" **[FACT]**:
  > "Before reporting progress, audit each claim against a tool result from this session. Only report work you can point to evidence for; if something is not yet verified, say so explicitly. Report outcomes faithfully: if tests fail, say so with the output; if a step was skipped, say that; when something is done and verified, state it plainly without hedging."
  *Effort: 10 minutes. This is the single best ratio in the document.*
- **D5c. A verifier in a fresh context.** "a verification subagent... has a fresh model try to refute the result, so the agent doing the work isn't the one grading it" **[FACT]**. Sonnet 5 at `medium` is the right tier (Section B3). Scope it: "flag only gaps that affect correctness or the stated requirements" — an unscoped reviewer "will usually report some, even when the work is sound" **[FACT]**.
- **D5d. Bound the autonomy prompt.** For unattended runs, Anthropic's published autonomous-operation reminder is directly applicable **[FACT]**: "Before ending your turn, check your last paragraph. If it is a plan, an analysis, a question, a list of next steps, or a promise about work you have not done ('I'll…', 'let me know when…'), do that work now with tool calls."

## FM6 — Partial enumeration

**Recommendation: make the denominator explicit and assert on it.**

- **D6a. Enumerate, count, then act.** **[INFERENCE]** Every sweep should produce a written file list with a count *before* any edit, and assert that count afterwards. `find … | tee /tmp/targets.txt | wc -l`, then operate from `targets.txt`, then verify. A narrow grep that returns 12 of 40 files is invisible; `12 ≠ 40` is not.
- **D6b. Manifest-driven, not discovery-driven.** Where a canonical list exists (cues JSON, curation.json, site-index.json **[LOCAL]**), iterate the manifest rather than searching the filesystem. Search finds what matches a pattern; a manifest defines what must exist. This is the same mechanism as D3a applied to site work.
- **D6c. Don't over-narrow the filter.** **[FACT]** Anthropic's tool-writing guidance notes agents "grapple with natural language names, terms, or identifiers significantly more successfully than they do with cryptic identifiers" — the corollary for greps is to widen the alternation and filter afterwards, rather than writing a precise pattern that silently excludes variants (`*.html` misses `.htm`; `img src=` misses `img\n  src=`).
- **Anti-pattern:** accepting "I searched the codebase and found X" without the command that produced it. If the command isn't in the transcript, the enumeration isn't verifiable.

## FM7 — Page quality drift ("header then boxes")

**Recommendation: constrain the inputs mechanically, and critique the output as an experience.**

- **D7a. One token file + a lint rule.** Detailed in C1. The measurable justification is local: `--plum:` declared 56 times across 17 CSS files **[LOCAL]**. *Effort: ~3 hours.*
- **D7b. Template, not blank page.** **[INFERENCE]** The homepage is the stated bar; make it a literal starting artifact with named slots. An agent starting from a blank file will produce the median of its training distribution — which is header-then-boxes. Note that Opus 4.8 has a *documented* default house style ("warm cream/off-white backgrounds ~#F4F1EA, serif display type, terracotta/amber accent") that is described as **persistent**, and that generic instructions ("don't use cream," "make it minimal") "tend to shift the model to a different fixed palette rather than producing variety" **[FACT]**. The two documented interventions that work are (i) specify a concrete palette/typeface spec, or (ii) "Before building, propose 4 distinct visual directions tailored to this brief... Ask the user to pick one, then implement only that direction" **[FACT]**.
- **D7c. Critique as experience, pairwise against the homepage.** Detailed in C6. Use Nielsen's heuristics plus house criteria; ask "where does this fall short of the homepage" rather than "score this page." Treat output as a candidate list for a human look — the validity evidence for LLM-as-UI-judge is thin (n=30, author-acknowledged partial agreement) **[FACT]**.
- **D7d. Two mechanical rules with real user impact.** Explicit `width`/`height` on every `<img>` (CLS) and `loading="lazy"` below the fold. Grep-enforceable, and the most likely Core Web Vitals failure given ~2,000 asset references **[INFERENCE built on FACT thresholds]**.

## FM8 — Stale/rejected assets wired into live pages

**Recommendation: invert the denylist into a generation-aware allowlist.**

- **D8a. Allowlist, not denylist.** Detailed in C3. Extend `curation.json` to `{slug, generation, verdict, supersedes, approved_date}`; the existing `PreToolUse` hook allows only `verdict == approved && generation == current`. An unrecognised filename becomes a **block**, not a pass. This turns the locked "never mix style generations" rule into a set-membership test. *Effort: ~3 hours, mostly backfilling records for the 433 approved assets.* **[LOCAL + INFERENCE]**
- **D8b. Declare the generation per episode.** One field in the cue sheet — `"generation": "comic-v1"` — gives the hook something to compare against, and makes a generation switch a single deliberate edit.
- **D8c. Post-write audit.** A `PostToolUse` (advisory) or pre-commit check that resolves every asset reference in changed HTML against the manifest and reports any that are unapproved, superseded, or missing from disk. `PostToolUse` cannot block **[FACT]** — so this is the reporting layer, and `PreToolUse` remains the enforcement layer.

## Ranked overall list (impact per effort)

1. **D3a** coverage gate (~1h) — kills the most expensive silent failure
2. **D5b** grounding paragraph in project instructions (10 min) — best ratio in the document
3. **D5a** blocking `Stop` hook on completion claims (~1h)
4. **D3b** beat-by-beat prompt generation from the manifest (~2h)
5. **D6a/b** enumeration discipline: count, assert, manifest-driven (~1h)
6. **D8a** generation-aware asset allowlist (~3h)
7. **D7a** one token file + raw-value lint (~3h)
8. **D2a** retrain the character/style LoRA on approved frames (~$2 + a morning)
9. **D1d** effort tiering + Batch API + cached prefix (~1h)
10. **C7 (2)** hash-stamped provenance markers on derived surfaces (~2h)
11. **D4b** promote decisions to a standing `DECISIONS.md` (~1h)
12. **C2** link + HTML validation in the existing CI workflow (~2h)
13. **D5c** fresh-context verifier subagent, scoped (~1h)
14. **D7d** `<img>` dimension + lazy-load lint (~1h)
15. **C4** Playwright screenshots on 8–12 template pages (~half a day, plus ongoing baseline upkeep)
16. **D2c** face-embedding drift alarm (~half a day; experimental on comic art)
17. **D1c** one-episode buffer (ongoing discipline, not a build)

## Anti-patterns to avoid

1. **Adopting Lost Pixel.** **[FACT]** Archived 2026-04-22; last release 2024-11-14. It still appears in "best visual regression tools" listicles.
2. **Full-site visual regression across 188 pages.** A one-person maintenance trap. Scope to template representatives.
3. **Multi-agent parallelism on shared files.** "LLM agents are not yet great at coordinating and delegating to other agents in real time" **[FACT]**, and multi-agent runs cost ~15× the tokens of chat **[FACT]**. Parallelise image generation and research; serialise site edits, or isolate them in worktrees.
4. **Treating CLAUDE.md as enforcement.** It "is not a hard enforcement layer" **[FACT]**. Also: keep it under ~200 lines — "If your CLAUDE.md is too long, Claude ignores half of it" **[FACT]**.
5. **Putting a blocking check on `PostToolUse`.** It cannot block; the tool has already run **[FACT]**.
6. **Grading creative output by exact match.** "too rigid and results in overly brittle tests" **[FACT]**. Rubrics, per-dimension, isolated judges.
7. **Auto-approving on an LLM visual judge.** Consistency 0.418 on batch ranking, 0.611 on scoring **[FACT]**. Triage only, pairwise where possible.
8. **Citing the accessibility automation figure without its methodology.** 57.38% (by issue volume, Deque) and ~20–30% (by WCAG criteria) are both real and measure different things **[FACT]**.
9. **Using Haiku 4.5 for anything about the current AI landscape.** Reliable knowledge cutoff Feb 2025 **[FACT]** — a year behind the other three, against a locked "never teach stale AI" rule.
10. **Reusing token budgets across the tokenizer boundary.** Opus 4.7+/Fable 5/Sonnet 5 produce "approximately 30% more tokens for the same text" than Sonnet 4.6 and earlier **[FACT]**.
11. **Prompting harder instead of writing the script.** The recurring shape of every failure mode above.

---

# Sources

All URLs fetched or re-verified 2026-07-21 UTC. "Date" is the publication or last-updated date shown on the page; "—" where the page carries no date (living documentation).

| # | Title | Publisher | URL | Date | Topic |
|---|---|---|---|---|---|
| 1 | Models overview | Anthropic | https://platform.claude.com/docs/en/about-claude/models/overview | — (living) | model-facts |
| 2 | Pricing | Anthropic | https://platform.claude.com/docs/en/about-claude/pricing | — (living) | pricing |
| 3 | Effort | Anthropic | https://platform.claude.com/docs/en/build-with-claude/effort | — (living) | model-config |
| 4 | Prompting Claude Opus 4.8 | Anthropic | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8 | — (living) | prompting |
| 5 | Prompting Claude Fable 5 | Anthropic | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5 | — (living) | prompting |
| 6 | Building effective agents | Anthropic Engineering | https://www.anthropic.com/engineering/building-effective-agents | 2024-12-19 | orchestration |
| 7 | How we built our multi-agent research system | Anthropic Engineering | https://www.anthropic.com/engineering/multi-agent-research-system | 2025-06-13 | orchestration |
| 8 | Effective context engineering for AI agents | Anthropic Engineering | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 2025-09-29 | context |
| 9 | Writing tools for agents | Anthropic Engineering | https://www.anthropic.com/engineering/writing-tools-for-agents | 2025-09-11 | tools |
| 10 | Demystifying evals for AI agents | Anthropic Engineering | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 | evals |
| 11 | How we contain Claude | Anthropic Engineering | https://www.anthropic.com/engineering/how-we-contain-claude | 2026-05-25 | safety/HITL |
| 12 | Hooks reference | Anthropic (Claude Code) | https://code.claude.com/docs/en/hooks | — (living) | guardrails |
| 13 | Automate actions with hooks | Anthropic (Claude Code) | https://code.claude.com/docs/en/hooks-guide | — (living) | guardrails |
| 14 | Best practices | Anthropic (Claude Code) | https://code.claude.com/docs/en/best-practices | — (living) | verification |
| 15 | Subagents | Anthropic (Claude Code) | https://code.claude.com/docs/en/sub-agents | — (living) | orchestration |
| 16 | Skills | Anthropic (Claude Code) | https://code.claude.com/docs/en/skills | — (living) | context |
| 17 | Memory | Anthropic (Claude Code) | https://code.claude.com/docs/en/memory | — (living) | context |
| 18 | Permission modes | Anthropic (Claude Code) | https://code.claude.com/docs/en/permission-modes | — (living) | HITL |
| 19 | Prompt caching | Anthropic | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | — (living) | cost |
| 20 | Batch processing | Anthropic | https://platform.claude.com/docs/en/build-with-claude/batch-processing | — (living) | cost |
| 21 | Task budgets | Anthropic | https://platform.claude.com/docs/en/build-with-claude/task-budgets | — (living) | cost |
| 22 | A practical guide to building agents | OpenAI | https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf | 2025 | orchestration |
| 23 | Design Tokens Format Module 2025.10 (announcement) | W3C Design Tokens Community Group | https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/ | 2025-10-28 | design-tokens |
| 24 | Design Tokens Format Module (draft) | DTCG | https://www.designtokens.org/tr/drafts/format/ | — (living) | design-tokens |
| 25 | Using CSS custom properties | MDN | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties | — (living) | design-tokens |
| 26 | lychee link checker | lycheeverse | https://github.com/lycheeverse/lychee | — (living) | link-integrity |
| 27 | linkinator | Justin Beckwith | https://github.com/JustinBeckwith/linkinator | — (living) | link-integrity |
| 28 | W3C Link Checker | W3C | https://validator.w3.org/checklink | — (living) | link-integrity |
| 29 | Nu Html Checker (vnu) | validator/validator | https://github.com/validator/validator | — (living) | html-validation |
| 30 | html-validate | html-validate.org | https://html-validate.org/ | v11.5.6 @ 2026-07 | html-validation |
| 31 | hyperlink | untitaker | https://github.com/untitaker/hyperlink | — (living) | link-integrity |
| 32 | pre-commit | pre-commit.com | https://pre-commit.com | — (living) | gates |
| 33 | Playwright (visual comparisons) | Microsoft | https://playwright.dev | — (living) | visual-regression |
| 34 | BackstopJS | garris | https://github.com/garris/BackstopJS | version NOT VERIFIED | visual-regression |
| 35 | Lost Pixel (ARCHIVED 2026-04-22) | lost-pixel | https://github.com/lost-pixel/lost-pixel | archived 2026-04-22 | visual-regression |
| 36 | Percy | BrowserStack | https://percy.io | — (living) | visual-regression |
| 37 | Chromatic | Chromatic | https://www.chromatic.com | — (living) | visual-regression |
| 38 | Automated Accessibility Coverage Report | Deque Systems | https://www.deque.com/automated-accessibility-coverage-report/ | study 2021-03-10, page refreshed 2026 | accessibility |
| 39 | Automated testing study identifies 57% of issues | Deque Systems | https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/ | 2021-03-10 | accessibility |
| 40 | axe-core | Deque Labs | https://github.com/dequelabs/axe-core | v4.12.1 @ 2026-07 | accessibility |
| 41 | Lighthouse CI | Google Chrome | https://github.com/GoogleChrome/lighthouse-ci | v0.15.1, 2025-06-26 | performance |
| 42 | pa11y-ci | pa11y | https://github.com/pa11y/pa11y-ci | v4.1.1, ~2026-05 | accessibility |
| 43 | Web Vitals | web.dev (Google) | https://web.dev/articles/vitals | 2024-10-31 | performance |
| 44 | 10 Usability Heuristics for User Interface Design | Nielsen Norman Group | https://www.nngroup.com/articles/ten-usability-heuristics/ | 1994-04-24, updated 2024-01-30 | design-critique |
| 45 | MLLM as a UI Judge | arXiv (Luera et al.) | https://arxiv.org/abs/2510.08783 | 2025-10-09 | design-critique |
| 46 | MLLM-as-a-Judge benchmark | mllm-judge.github.io / ACM DL | https://mllm-judge.github.io/ | 2024 | llm-judge |
| 47 | Judge Anything: MLLM as a Judge Across Any Modality | arXiv | https://arxiv.org/abs/2503.17489 | 2025-03 | llm-judge |
| 48 | UICrit | ACM DIS 2024 | https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381 | 2024 | design-critique |
| 49 | Gemini API — image generation | Google | https://ai.google.dev/gemini-api/docs/image-generation | — (living) | image-gen |
| 50 | Gemini 3 models | Google | https://ai.google.dev/gemini-api/docs/gemini-3 | — (living) | image-gen |
| 51 | Veo video generation | Google | https://ai.google.dev/gemini-api/docs/veo | — (living) | video-gen |
| 52 | Images and vision | OpenAI | https://developers.openai.com/api/docs/guides/images-vision | — (living) | image-gen |
| 53 | Video generation (Sora 2) | OpenAI | https://developers.openai.com/api/docs/guides/video-generation | — (living) | video-gen |
| 54 | FLUX.1 Kontext | Black Forest Labs | https://bfl.ai/models/flux-kontext | — (living) | image-gen |
| 55 | FLUX.1-Kontext-dev weights | Black Forest Labs / Hugging Face | https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev | — (living) | image-gen |
| 56 | Ideogram Character API | fal.ai | https://fal.ai/docs/model-api-reference/image-generation-api/ideogram-character | — (living) | image-gen |
| 57 | Fine-tune FLUX | Replicate | https://replicate.com/blog/fine-tune-flux | — (living) | lora-training |
| 58 | Webhooks | Replicate | https://replicate.com/docs/topics/webhooks | — (living) | pipeline |
| 59 | Webhooks | fal.ai | https://docs.fal.ai/model-apis/model-endpoints/webhooks | — (living) | pipeline |
| 60 | Luma Ray video generation | Luma Labs | https://docs.agents.lumalabs.ai/guides/videos/generation | — (living) | video-gen |
| 61 | Kling image-to-video API | Kuaishou / Kling | https://kling.ai/document-api/apiReference/model/imageToVideo | — (living) | video-gen |
| 62 | Runway Gen-4 Video | Runway | https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video | fetch blocked (403) | video-gen |
| 63 | CLIPScore: A Reference-free Evaluation Metric | arXiv (Hessel et al., EMNLP 2021) | https://arxiv.org/abs/2104.08718 | 2021-04 | image-qc |
| 64 | imagehash | Johannes Buchner | https://github.com/JohannesBuchner/imagehash | — (living) | image-qc |
| 65 | imagededup | idealo | https://github.com/idealo/imagededup | — (living) | image-qc |
| 66 | InsightFace | deepinsight | https://github.com/deepinsight/insightface | — (living) | image-qc |
| 67 | ArcFace research | InsightFace | https://www.insightface.ai/research/arcface | — (living) | image-qc |
| 68 | Diagnosing and Mitigating Context Rot | arXiv | https://arxiv.org/html/2606.29718 | 2026-06 | context |
| 69 | Introducing gpt-image-2 | OpenAI Community | https://community.openai.com/t/introducing-gpt-image-2-available-today-in-the-api-and-codex/1379479 | 2026 | image-gen |
| 70 | Reproducible outputs with the seed parameter | OpenAI Cookbook | https://cookbook.openai.com/examples/reproducible_outputs_with_the_seed_parameter | — (living) | determinism |

---

# Open questions / could not verify

Listed rather than softened into the body. Each is a thing to check before building on it.

**Model & media capabilities**
1. **Reference-image ceilings for the Gemini image models.** A comparison table (Nano Banana 2 ≈10 object / 4 character / 3 style references; Nano Banana Pro ≈6 object / 5 character) appeared on one fetch of the image-generation docs and could not be reproduced on a second fetch of the Gemini-3 page. **Model IDs and resolution/editing claims are solid; the counts are not.** Test empirically before designing a workflow around multi-character reference.
2. **Max reference images for FLUX.1 Kontext and for OpenAI gpt-image-1 / gpt-image-2.** Not stated on any primary page fetched.
3. **gpt-image-2 specifications.** Announced via an OpenAI community post; no primary spec page with limits or pricing was retrieved. Treat the name and capability claims as provisional.
4. **Runway Gen-4 clip length, resolution and first/last-frame support.** The official help page returned 403. Secondary sources say 5/10s at 24fps, 720p upscalable — unconfirmed.
5. **Kling first/last-frame conditioning.** Image-to-video is documented; frame conditioning is not confirmed.
6. **Sora 2 short-duration options.** The official guide states "16- and 20-second generations"; a secondary source claimed 4/8/12/16/20s. The primary figure is the one to trust.
7. **Midjourney `--cref` / `--sref` exact behaviour.** Both official docs pages returned 403 (bot-blocked). Everything reported about `--cw`, `--sv`, and reference counts is secondary.
8. **Ideogram style-reference limit of 3 images.** From a search snippet, not a fetched page. (The Character limit of 1 *is* confirmed, via fal.ai's API reference.)
9. **Official minimum LoRA dataset size.** Neither Replicate nor fal.ai publishes one. The 15–30 image figure is community norm, not documentation. Replicate's ~$1.85 / ~20 images / 1000 steps example *is* documented.
10. **Seed determinism with image inputs.** OpenAI documents `seed` + `system_fingerprint` for "mostly deterministic" text output. The report that determinism breaks once an image is in the prompt is a credible community finding, not a spec.

**Agent engineering**
11. **"Six grading methods" and a "75–90% human-agreement calibration target"** attributed in secondary write-ups to Anthropic's evals post. A direct fetch of the primary page did **not** contain either. Do not cite these as Anthropic doctrine.
12. **OpenAI's *A practical guide to building agents*.** The PDF could not be text-extracted (returned as image data). The manager/decentralised pattern descriptions in Section A are a secondary reconstruction. Verify with a local PDF text extraction before quoting.
13. **The "let Claude verify its work" quote** attributed to Boris Cherny in secondary sources — not independently verified against a primary Anthropic publication.
14. **Claude Code docs have no visible "last updated" date** — they are version-gated inline (e.g. "min-version: 2.1.198"). All hook facts here reflect the live pages as of 2026-07-21 and should be re-checked after any Claude Code upgrade, since the event list has demonstrably grown beyond the "core nine" of older tutorials.

**Website tooling**
15. **BackstopJS current version.** Conflicting signals between a 2019 release tag and changelog mentions of a Node-20-compatible 6.3.2. Run `npm view backstopjs version`.
16. **Orphan-page detection tooling.** No actively-maintained free tool found for static sites. Treated as a script, not a gap.
17. **A canonical spec for "GENERATED — DO NOT EDIT" markers.** Universal convention across codegen ecosystems; no single citable standard located.
18. **Tooling for detecting expiring factual claims** (model names, cutoffs) in prose. None found. The proposed grep-based lint is bespoke.
19. **PerceptUI (arXiv 2606.05697)** was reported as adjacent work on LLM agents as synthetic users but was not independently fetched. Lower confidence than the other design-critique citations.
20. **Anthropic guidance on constraining agents to an existing design system.** No official document found. The recommendations in C1 are inference plus one named practitioner pattern.

**Scheduling**
21. **Production scheduling for AI-generated content.** No peer-reviewed or vendor-published guidance exists. Searches returned generic content-calendar marketing advice only. The buffer recommendation (D1c) rests on its own logic, not on evidence, and is labelled accordingly.
