# Claude practical-guide research packet — 2026-08-31

**Status:** SOURCE SYNTHESIS; manuscript, account-access checks, and comparative product tests remain HOLD.

**Purpose:** current source inventory for the proposed nontechnical Claude guide. This is not a feature-comparison verdict, a tested workflow, or publishable prose. Product claims below were checked on 2026-08-31, with the model and operating-guidance refresh checked on 2026-09-01; availability, limits, regions, models, and pricing can change. The maintained cross-guide practical synthesis is `../CURRENT-PRACTICAL-GUIDANCE-2026-09-01.md`.

## Model-specific expansion — refreshed 2026-09-01

Official-source findings and proposed trials, not measured model results.
Full fixture: `../MODEL-SPECIFIC-EXAMPLE-PILOT-2026-08-31.md`.

Anthropic's current model overview lists this active comparison:

| Current API model | Documented job | Supported API effort | Default |
|---|---|---|---|
| Fable 5.1 | demanding reasoning and long-horizon agentic work | low, medium, high, xhigh, max | high |
| Opus 5 | complex agentic coding and enterprise work | low, medium, high, xhigh, max | high |
| Sonnet 5 | speed/intelligence balance | low, medium, high, xhigh, max | high |
| Haiku 4.5 | fastest current model | the same effort control is not supported | n/a |

Source: [current model overview](https://platform.claude.com/docs/en/models/overview).
Effort is not a hard spending limit. Exact effort choices and defaults are an
API/product-surface fact, not a promise about a reader's model picker. Older
support pages describing **Fable 5** consumer-plan access are not evidence of
**Fable 5.1** access. Fable 5.1 app entitlement remains HOLD until the current
plan/support source is reconciled. Do not infer Mythos consumer access from an
older prompt page or API record.

The official sources give three recommendations with different scopes. The
general model overview says to start with Opus 5 for most workloads and use
Fable 5.1 for demanding reasoning or long-horizon agents. The effort reference
says to start Fable 5.1 at high, its API default, then step down where evaluation
shows quality holds. The separate cost guide says to start Fable 5.1 at low for
most **agent workloads**, then raise effort where it misses. Preserve all three:
general model routing, conservative per-model capability guidance and a
measured agent-cost strategy answer different questions. None is a universal
consumer-app recipe.

### Different models need different corrections

- **Fable 5.1:** do not carry a Fable 5 personality claim forward as if the
  version were unchanged. Anthropic's current cost guide shows workload-
  dependent behaviour: one research benchmark was nearly flat across low,
  medium and high while cost increased, whereas long-horizon coding showed a
  real effort/quality trade-off. Test a lower effort and a clear finish line;
  retain named verification when the task actually needs it. Source:
  [cost and intelligence](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence).
- **Opus 5:** Anthropic warns that generic extra verification/re-check
  instructions can duplicate the model's own checks. Keep acceptance
  requirements but test removing redundant review rituals. Effort does not
  reliably shorten visible responses: set output length separately.
  Small tasks should not acquire unnecessary reviewer agents. Source:
  [Opus prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5).
- **Sonnet 5:** Lower-effort instructions are more literal; name all affected
  sections/files rather than expecting one instruction to generalize. Raise
  effort when a complex task is too shallow. Tool use can change with effort.
  Source: [Sonnet prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5).

### Workshop adaptations — untested editorial proposals

Fable 5.1 low: use the complete-job prompt and bounded-work rules in the
fixture; compare medium with identical inputs and count unnecessary actions
separately from required checks. If low misses a named dependency, add high to
the comparison. This is an API trial design, not a consumer-app default claim.

Opus 5 medium: replace generic repeated-check instructions, rather than adding
another rule, with: “Acceptance: correct costs; a 90-minute agenda including a
10-minute break; an invitation of at most 120 words; every brief requirement
present. Provide the outputs and evidence of these conditions. No additional
review stage or reviewer.” Compare with the original prompt at the same effort.

Sonnet 5 medium: the revision must explicitly say: “Apply the attendance revision
to both files and every section mentioning attendance; preserve unaffected
content.” Compare low only with the complete requirements retained.

Set effort through the actual control. A prompt saying “use medium” does not
prove the setting changed. Cover high/xhigh/max with genuinely harder examples;
do not sell the workshop fixture as proof of their usefulness.

### Where instructions and skills actually go

Claude Code uses project `CLAUDE.md` or `.claude/CLAUDE.md`, with personal
guidance in `~/.claude/CLAUDE.md`. It does not automatically read `AGENTS.md`
as equivalent; explicit import is supported. Confirm loaded guidance through
`/context`. Instructions are not enforced permissions. Source:
[Memory](https://code.claude.com/docs/en/memory).
Code project skills use `.claude/skills/<name>/SKILL.md`; personal skills use
`~/.claude/skills/<name>/SKILL.md`. Cowork uses account-enabled skills, not
that personal local folder. Installation on one surface is not proof of
discovery on another. Source: [Skills](https://code.claude.com/docs/en/skills).
App skills are documented for Free and paid accounts with code execution enabled
and applicable organization controls. Source:
[Use skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

Still open: Free selector/caps; paid execution; Cowork instruction placement;
older exposed models' distinct recipes; actual skill contents and install trials
for substantial document/code examples. No purchases, installations or model
trial runs were made for this addendum.

## Executive finding

The important correction to old Claude/Cowork explainers is **certain**: Cowork is not now accurately described as a local-only desktop agent. It is a paid, beta work mode whose agent loop and code execution run in Anthropic cloud sandboxes by default; the Claude Desktop app is required only when that cloud session needs a granted route to local files, browser, or computer. Work can continue after the laptop closes, but local-device reach cannot. [Cowork help, living documentation checked 2026-08-31](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) and [architecture overview, living documentation checked 2026-08-31](https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview)

The book should teach a job-routing system, not “the Claude prompt.” **Chat** is the smallest adequate place to analyse supplied material, write/revise, search the web, or make an editable artifact. A **Project** is the bounded reusable context and instruction space for a continuing job. **Cowork** is for a multi-step job needing files, extended execution, or deliberate delegation, with approval and output-location review. **Claude Code** is the developer/power-user environment for an actual repository or technical workspace, where plan-first, permissions, tests, diffs, and version control matter. The API/Console is a separately billed developer product—not an included Pro entitlement. [Pricing](https://claude.com/pricing), [Pro plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan), [Claude Code feature guide](https://code.claude.com/docs/en/features-overview)

## Feature and access matrix — checked 2026-08-31

| Capability | Free | Pro / Max | Team / Enterprise | Practical boundary |
|---|---|---|---|---|
| Claude chat, web/mobile/desktop; web search; files/code execution | Yes, usage-limited | Yes, more usage | Yes, org-managed | Search/fetch consumes usage; a direct long URL can consume a large share of Free capacity. [Web search](https://support.claude.com/en/articles/10684626-enable-and-use-web-search) |
| Projects | Yes; maximum five Projects stated for Free | Yes; unlimited projects stated for Pro | Yes; sharing for Team/Enterprise | Paid projects gain enhanced knowledge/RAG; do not promise a particular context size. [Projects](https://support.claude.com/en/articles/9517075-what-are-projects) |
| Artifacts and downloads | Yes if code execution/file creation is enabled | Yes | Yes | Artifacts are separate editable output; download or inspect source before using. Artifact MCP/storage are paid-only, and shared storage is visible to users of that artifact. [Artifacts](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) |
| Skills | Yes if capability enabled | Yes | Yes; owners can provision/disable | Treat a skill as executable/reusable workflow material: install only trusted sources. [Skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude) |
| Google Workspace and prebuilt connectors | Yes, subject to account/service availability | Yes | Yes; owner enablement | Connector access mirrors the connected account and may read or act; verify requested scopes. [Google connectors](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors) |
| Custom remote MCP connector | Yes, **one** custom connector | Yes | Owner adds it, individual authorizes | Remote MCP is cloud-to-cloud; it is not a way to reach an internal/VPN-only service. [Custom MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) |
| Research | Not documented as available | Yes | Yes | Paid only; requires web search; citations aid checking but do not make results true. [Research](https://support.claude.com/en/articles/11088861-use-research-on-claude) |
| Cowork | No | Yes | Yes, Enterprise owner enablement | Cloud-default beta; local/browser/computer access needs connected desktop app; deletion needs explicit permission. [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) |
| Claude Code | No | Included | Included | CLI/desktop/web coding environment, not synonymous with Chat or Cowork. API usage remains separately billed. [Pro](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan) |
| Capacity and overage | Limited, no fixed message promise | Pro: at least 5x Free per session; Max 5x/20x Pro | Standard exceeds Pro; Premium 5x Standard | Rolling five-hour sessions; paid plans also have weekly limits; actual use varies by model, length, files, and tools. [Pricing](https://claude.com/pricing) |

**Plans and money.** The current individual list price shown by Anthropic is Free $0; Pro US$20 monthly or US$200 annually; Max 5x US$100 monthly; Max 20x US$200 monthly. Team is distinct organisation billing (Standard US$25 monthly / $20 annual-equivalent; Premium US$125 monthly / $100 annual-equivalent on the current page). These are source facts, not reader recommendations. Never translate capacity ratios into an exact message quota: Anthropic explicitly says capacity varies with task and may impose other caps. Paid users may enable usage credits, but API Console billing is separate from a consumer subscription. [Plan guide, 2026-05-19](https://support.claude.com/en/articles/11049762-choose-a-claude-plan); [pricing](https://claude.com/pricing)

**Privacy and permission framing.** Incognito chat is available on all listed plans and is not in chat history/memory or used for training, but is retained for 30 days by default; it is not available inside Projects and organisation exports can include it. It is therefore a privacy control, not an invisible scratchpad. [Incognito, 2026-07-16](https://support.claude.com/en/articles/12260368-use-incognito-chats) Consumer Free/Pro/Max training choice differs from Team/Enterprise’s no-training-by-default claim, so the guide must have readers check their plan and settings rather than write “Claude never trains on your work.” Connector data is not trained on, but consumer users who opt into model improvement can bring copied connector content into a trainable chat. [Google connector privacy](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors)

## Three paired free-to-paid workflows

The pricing page also explicitly lists memory and extended thinking on Free,
and additional paid surfaces including Claude Design, Claude Science and
Microsoft 365 integration. These need their own product-specific source cards
if included in a chapter; this packet does not infer their full capabilities
or every model's entitlement from a pricing-page label. Model/version access
is an explicit remaining inventory item, not a settled universal picker.


1. **Source documents → checked briefing.** Free: start a Project for one live question, upload only the source set, ask Claude to extract a claim/evidence table, then check each linked primary source yourself. Use ordinary web search only when current facts matter and turn it off for revision. Paid: use Research for the same defined question, demand cited claims and still open the original links. The gain is agentic research, not permission to trust it. [Research](https://support.claude.com/en/articles/11088861-use-research-on-claude); [Anthropic’s hallucination guidance](https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on)

2. **Bounded folder → change manifest.** Free: use Chat to plan the folder structure and produce a manifest/template; the human copies and verifies each move. Paid: Cowork receives one explicitly connected folder, a file list, the allowed transformations, output folder, no-delete rule, and requested manifest; review its proposed plan, approve only needed tools, then compare original and output before using. Cowork’s cloud execution and local route mean sensitive material is still processed on Anthropic servers. [Cowork architecture](https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview)

3. **Small interactive tool → usable deliverable.** Free: ask Chat to create an Artifact with a visible acceptance checklist and test it with ordinary sample data; download the code/file and keep a copy. Paid: iterate the Artifact, optionally use paid-only artifact storage/MCP only after inspecting the data boundary and permissions. Neither route makes publication safe: manually test the actual inputs, errors, mobile behaviour, access control, and any external action. [Artifacts](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)

## First-hand methods worth adapting (all untested in this project)

1. **Curate context, do not pile it in.** *Author: Anthropic engineering; 2025-09-29; intended for agent builders, applicable to Chat/Projects/Code.* Their context-engineering guidance treats attention as finite and starts with the smallest high-signal material, adding concrete instructions/examples only after a failure. A beginner version is a one-page job brief: goal, reader, approved source files, output shape, constraints, and “do not” list—then start a fresh chat when the job changes. Caveat: this is engineering guidance, not proof that any particular project will perform better; uploaded material still needs human reading. [Source](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

2. **Plan before an agent edits.** *Author: Claude Code documentation; living documentation checked 2026-08-31; intended product: Claude Code, not Cowork.* Plan mode lets Claude inspect and propose without source edits; approval then chooses the edit mode. Beginner adaptation: ask Chat/Cowork for “plan, risks, and exact files/actions; make no changes until I approve,” then compare the plan to your intent. Caveat: a natural-language instruction is weaker than Code’s enforced plan mode; Cowork has its own permissions, and no plan proves a change is correct. [Source](https://code.claude.com/docs/en/permission-modes)

3. **Make the repeated job explicit and improve it after real use.** *Author: Anthropic Data Infrastructure team; 2025-07-24 report; Claude Code.* The team had Claude summarize finished sessions and propose updates to its `CLAUDE.md` workflow record. Beginner adaptation: after a repeated report/deck/file task, keep a short “working recipe” outside the chat—inputs, checks, failure fixes, final export steps—and revise it only after verifying the output. Caveat: do not auto-accept the agent’s self-authored rules; an accumulated instruction file can become noisy or wrong. [Source](https://claude.com/blog/how-anthropic-teams-use-claude-code)

4. **Give autonomy only to reversible edges; supervise consequential core work.** *Author: Anthropic Claude Code team; 2025-07-24; Claude Code.* Its internal practice separates prototype/peripheral work from core business logic, runs builds/tests in the loop, and retains review for the latter. Beginner adaptation: use a copied sample folder or non-live Artifact for a first pass; require a change manifest and test evidence before replacing the real file. Caveat: internal experience is not a safety guarantee; do not delegate money, publication, deletion, legal/medical judgment, or broad account actions unsupervised. [Source](https://claude.com/blog/how-anthropic-teams-use-claude-code)

5. **Treat the human role as manager: specify, supply context, split work, give feedback.** *Author: Simon Willison, 2026-01-04; commentary on Claude Code/Codex users.* This is a productive transfer framing for nontechnical readers: ask for a small, inspectable first deliverable, correct it with concrete evidence, and only then expand. Caveat: Willison’s note is an informed practitioner perspective, not an Anthropic feature guarantee or controlled study. [Source](https://simonwillison.net/2026/Jan/4/coding-again/)

6. **Use a reusable Skill only after a job has stabilised.** *Author: Anthropic; undated PDF accessed 2026-08-31; Claude Skills.* Anthropic’s guide defines Skills as folders of instructions/resources for repeatable workflows. Beginner adaptation: run a job manually twice; if the same inputs, checks, and format recur, package the verified recipe as a private Skill (or maintain a Project instruction) and test it on a harmless sample. Caveat: a Skill can include code and prompt-injection/exfiltration risks; source inspection and trust are prerequisites, and it is not a substitute for human acceptance. [Source](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)

7. **Use version control and tests as recovery, not as decoration.** *Author: Anthropic RL Engineering and Claude Code teams; 2025-07-24; Claude Code.* Their reported pattern is checkpoints/rollback plus tests, with one team noting small-to-medium implementation succeeds on the first attempt only about one-third of the time. Beginner adaptation: before a code or folder experiment, duplicate/export the starting asset; request a test checklist and inspect the final result yourself. Caveat: the figure is a team anecdote in a historical case report—not a current benchmark, general rate, or promise. [Detailed report](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)

8. **Keep persistent project context concise, then test whether it changes behaviour.** *Author: Claude Code documentation; living documentation checked 2026-08-31; Claude Code.* The current official guidance says `/init` can make a starter `CLAUDE.md`, but recommends retaining only rules whose removal would cause mistakes; it advises reviewing, pruning and testing the file after problems. Beginner/power-user adaptation: after a repeated documented failure in a real repository, add one specific rule or test command, run a harmless repeat task, and remove it if it does not improve the result. Caveat: this is a Code-only project-context mechanism, not an instruction to upload a long “master prompt” to Chat or Cowork; too much persistent context can obscure the actual task. [Source](https://code.claude.com/docs/en/best-practices)

9. **Use a deterministic guard for non-negotiable actions, not a conversational instruction.** *Author: Claude Code documentation; living documentation checked 2026-08-31; Claude Code.* The docs distinguish advisory `CLAUDE.md` instructions from hooks, which run automatically at named lifecycle events. Developer adaptation: put a required linter/test or a protected-path block in a reviewed hook, and keep judgment calls in the task brief. Caveat: hooks can be wrong, broad, or have side effects; inspect and test the hook itself. This is not available as a prompt-only safety guarantee in ordinary Chat/Cowork. [Source](https://code.claude.com/docs/en/best-practices)

## Source conflicts, gaps, and book-research next tests

* **Cowork local/cloud conflict resolved:** older launch coverage often says local/macOS/Max. Current official help says paid plans, cloud-default beta, and desktop-mediated local reach; use the current official help and date the claim. Do **not** say it runs only locally or that closing the laptop stops purely cloud work. [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)
* **Surface overlap is real:** connectors can be available across Chat, Desktop, Cowork, Code, and API, but local desktop extensions are not available in web/mobile/Cowork. The manuscript needs a “where this runs” label beside every tutorial. [Connector surfaces](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors)
* **No claims here are hands-on tests.** Before drafting worked chapters, run the same bounded report/slides job, copied-folder manifest job, and interactive tool job in Free Chat, paid Chat/Research, Cowork, and Code where access exists. Record plan, surface, model/mode, source files, permissions, time, usage/cost, exact outputs, failures, repair, export, and what a human checked.
* **Research gap:** availability may vary by region, account, rollout, organisation policy, and enabled capabilities. This packet does not verify an account’s entitlement, exact message caps, model picker, API rates, browser/computer permissions, or any third-party connector. Those must remain explicit test variables rather than textbook promises.

## Opened-source register (not a link dump)

Sources below were opened, not cited from search snippets, on 2026-08-31 unless
the row records the 2026-09-01 refresh.

| Source | Publisher / date shown | Used for |
|---|---|---|
| [Plans & Pricing](https://claude.com/pricing) | Anthropic, current page | feature/usage/plan comparison |
| [Choose a Claude plan](https://support.claude.com/en/articles/11049762-choose-a-claude-plan) | Anthropic, 2026-05-19 | individual plan prices/capacity framing |
| [What is the Pro plan?](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan) | Anthropic, 2026-06-10 | API billing separation, usage |
| [What are Projects?](https://support.claude.com/en/articles/9517075-what-are-projects) | Anthropic, 2026-07-23 | Free/paid project differences |
| [Artifacts](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) | Anthropic, 2026-07-22 | output, export, storage/MCP limits |
| [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) | Anthropic, living documentation checked 2026-08-31 | access, execution, permissions |
| [Cowork architecture](https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview) | Anthropic, living documentation checked 2026-08-31 | cloud/local reconciliation |
| [Research](https://support.claude.com/en/articles/11088861-use-research-on-claude) | Anthropic, 2026-06-02 | paid access, citations |
| [Web search](https://support.claude.com/en/articles/10684626-enable-and-use-web-search) | Anthropic, current page | Free-use boundary, source checking |
| [Skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude) | Anthropic, living documentation checked 2026-08-31 | access, capability/security |
| [Custom remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) | Anthropic, living documentation checked 2026-08-31 | plan/access/network/security |
| [Google connectors](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors) | Anthropic, living documentation checked 2026-08-31 | permissions, retention, training nuance |
| [Incognito](https://support.claude.com/en/articles/12260368-use-incognito-chats) | Anthropic, 2026-07-16 | privacy/retention limits |
| [Claude Code permissions](https://code.claude.com/docs/en/permission-modes) | Anthropic, current docs | plan vs edits/auto boundaries |
| [Claude Code extensions](https://code.claude.com/docs/en/features-overview) | Anthropic, current docs | CLAUDE.md/skills/MCP/hooks distinction |
| [Claude Code best practices](https://code.claude.com/docs/en/best-practices) | Anthropic, living documentation checked 2026-08-31 | current project-context, verification and hook methods |
| [Models overview](https://platform.claude.com/docs/en/models/overview) | Anthropic, living documentation checked 2026-09-01 | Fable 5.1 current lineup, defaults and general model route |
| [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) | Anthropic, living documentation checked 2026-09-01 | all supported levels, defaults and model-specific effort guidance |
| [Optimizing for cost and intelligence](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence) | Anthropic, living documentation checked 2026-09-01 | effort sweeps, cost per completed task and workload-dependent model selection |
| [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Anthropic, living documentation checked 2026-09-01 | examples, structured prompts and long-context placement |
| [Agentic coding and persistent returns to expertise](https://www.anthropic.com/research/claude-code-expertise) | Anthropic Research, 2026-06-16; checked 2026-09-01 | preliminary aggregate evidence on planning, execution, verification and domain expertise |
| [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Anthropic, 2025-09-29 | context method/caveat |
| [How Anthropic teams use Claude Code](https://claude.com/blog/how-anthropic-teams-use-claude-code) | Anthropic, 2025-07-24 | first-hand methods/caveats |
| [Simon Willison: Helping people write code again](https://simonwillison.net/2026/Jan/4/coding-again/) | Simon Willison, 2026-01-04 | independent practitioner framing |
| [Complete Guide to Building Skills](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf) | Anthropic, date not displayed | skills method/risk |
| [How Anthropic teams use Claude Code (detailed PDF)](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf) | Anthropic, date not displayed | detailed first-hand technique limits |
