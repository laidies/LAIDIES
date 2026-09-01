# ChatGPT and Claude — current practical guidance spine

**Checked:** 2026-09-01
**Status:** INTERNAL SOURCE SYNTHESIS. This is the maintained practical input
for the two guide manuscripts, not publication approval or a claim that every
feature is available in every account.

## How a tip earns a place in the books

A useful tip must answer seven questions:

1. When would an ordinary reader use this?
2. What exactly should she do?
3. Why does that change the result?
4. What can she copy or adapt?
5. What failure should she look for?
6. What is the honest Free route and the paid extension?
7. Is the advice a documented product fact, a named practitioner's method or
   a LAiDIES observation?

Vendor documentation establishes current features and the vendor's recommended
operating pattern. It does not establish that one vendor is better. A power
user's success establishes a useful method to test, not a universal result.
Only an exact preserved LAiDIES run may be labelled tested by LAiDIES.

## The useful core shared by both tools

### 1. Start with the job, not a theatrical role

**Use when:** beginning any task that must end in something usable.

**Do this:** state the goal, the relevant context, the constraints and what
must be true when the job is done. OpenAI's current Codex guide uses those four
elements. Anthropic's Code guide similarly recommends specific files,
constraints and example patterns. The wording can remain conversational.

```text
Goal: Turn the attached notes into a two-page client briefing.
Context: Use brief.md as the requirements and figures.csv for all numbers.
Constraints: Do not browse, invent figures, send anything or overwrite the
originals. Mark missing facts as unresolved.
Done when: the briefing answers the three questions in brief.md, every number
maps to a CSV row, and the final file opens correctly.
```

**Why it helps:** the tool does not have to guess what the output is, which
sources matter or whether a polished draft counts as finished.

**Watch for:** a beautiful answer that never produces the requested file, or a
completion summary that claims checks which were not performed.

**Free route:** paste the four-part brief and request complete text if file
creation is unavailable. **Paid/agentic extension:** let the tool create the
file and run allowed checks, but retain the same finish line.

**Evidence:** official OpenAI and Anthropic guidance; independently consistent
with Addy Osmani's January 2026 specification method. Not a comparative winner.

### 2. Make one source win before sources disagree

**Use when:** notes, policies, quotes, emails or versions may conflict.

**Do this:** name the authority order in the brief.

```text
Use the signed policy first, then the current written vendor quote, then the
meeting notes. If a lower source conflicts with a higher one, preserve the
conflict in the evidence table and follow the higher source. Do not silently
blend them.
```

**Why it helps:** more context does not resolve authority. Without a hierarchy,
the model may combine incompatible facts into a confident third version.

**Watch for:** phrases such as “therefore it was not planned” when the source
only says the information was not collected.

**Free route:** paste a small numbered source pack. **Paid/agentic extension:**
store the maintained policy in a Project or repository, then confirm the agent
actually read the named file.

**Evidence:** LAiDIES ChatGPT Free and Claude Code workshop tests, 2026-08-31.

### 3. Ask for evidence of the check, not “check your work”

**Use when:** correctness can be observed through totals, test output, source
links, saved state or a visible journey.

**Do this:** name the check and the evidence you want returned.

```text
Recalculate the subtotal, reserve, total and remaining budget. Return those
five figures in one consistency table and name the source row used for each.
Do not claim the files agree unless you inspected both final files.
```

**Why it helps:** “review carefully” is an activity request; a reconciled table,
test result or screenshot is evidence. Current OpenAI and Anthropic agent guides
both emphasize giving the agent a way to verify the result.

**Watch for:** generated tests that were never run, screenshots that do not
prove save/reopen behaviour, or a final message that is correct while the
download remains wrong.

**Free route:** request the evidence table and perform the final spot check.
**Paid/agentic extension:** allow the tool to run the test, formula check or
browser journey and return the exact result.

**Evidence:** official vendor guidance; Simon Willison's 2026 test-baseline and
actual-interface patterns; LAiDIES workshop runs.

### 4. Correct the failure, not the whole personality

**Use when:** most of the result is useful but one claim, table or behaviour is
wrong.

**Do this:** point to the exact defect, provide the correct evidence, name every
dependent place that must change and protect unaffected work.

```text
The proposal still uses 20 meals, while evidence.md correctly uses 22. Repair
the catering line, subtotal, reserve, total and remaining amount in both files.
Preserve the venue choice, agenda and invitation. Return the two complete
corrected files and the five final figures. Stop there.
```

**Why it helps:** “try again” invites a new draft and new mistakes. A bounded
repair gives the model the information it was missing and makes inspection
small enough to finish.

**Watch for:** a correct apology or summary beside an unchanged artifact.

**Free route:** ask for the corrected complete text. **Paid/agentic extension:**
apply the patch to the files, show the changes and rerun the named checks.

**Evidence:** LAiDIES ChatGPT Free and Claude Code workshop tests, 2026-08-31.

### 5. Plan only when a plan prevents a real mistake

**Use when:** the approach is uncertain, several files or outputs must stay
consistent, or a change has dependent consequences.

**Do this:** ask for a read-only plan naming inputs, actions, risks and checks.
Approve the direction before execution. Skip the ceremony for a typo or other
one-step reversible change.

```text
Inspect the supplied folder and propose a plan only. Name the files you would
change, the reason for each change, the checks you would run and anything that
needs my decision. Do not edit, delete, send or publish yet.
```

**Why it helps:** planning separates “what are we doing?” from implementation.
It is useful only when a wrong approach would create rework.

**Watch for:** a ten-page plan for a one-line correction, or ordinary Chat
language being mistaken for an enforced read-only product mode.

**Free route:** request a plan in Chat and do not provide action-capable tools.
**Paid/agentic extension:** use the product's actual Plan mode where available.

**Evidence:** official OpenAI Codex and Claude Code guidance; Addy Osmani's
first-hand 2026 method.

### 6. Give permissions by consequence

**Use when:** the tool can access files, email, browser, cloud services, money
or publication controls.

**Do this:** separate actions it may take from actions requiring approval.

```text
You may read the copied project folder, draft files in /output and run the
named local checks. Ask before contacting anyone, spending money, deleting,
overwriting originals, publishing, changing account settings or expanding the
job beyond the brief.
```

**Why it helps:** the same request can produce a draft in one setup and a real
external action in another because standing permissions differ.

**Watch for:** assuming the prompt alone overrides a connector's existing
permissions, or granting an entire account when one folder or read-only scope
would do.

**Free route:** keep the job in pasted text with no connector. **Paid/agentic
extension:** connect only the needed system at the narrowest useful scope and
inspect the action target before approval.

**Evidence:** current OpenAI and Anthropic permission guidance; Ethan Mollick's
July 2026 first-hand account. Product enforcement differs by surface.

## ChatGPT and Codex — practical operating cards

### 7. Put stable repository rules in `AGENTS.md`, not every prompt

**Use when:** Codex repeatedly needs the same project layout, commands,
constraints or definition of done.

**Do this:** keep a short, accurate `AGENTS.md`; add a rule after a repeated
observed mistake, then test whether the rule changes behaviour. Move specialised
material to a referenced file or Skill.

```markdown
# Project rules
- The approved source is docs/policy.md; meeting notes cannot override it.
- Never overwrite files in originals/.
- Run `npm test` before saying the change works.
- Done means the changed journey passes and the output opens on mobile.
```

**Why it helps:** stable instructions load with the project; the current task
prompt can stay about the current job.

**Watch for:** a giant rule file full of old incidents, duplicated directions
and vague taste words. OpenAI's current guidance explicitly prefers short,
practical guidance added from real friction.

**Free route:** keep a small project-rules note and paste the relevant portion
when no automatic project guidance is available. **Paid/agentic extension:**
use the actual repository file and confirm its scope.

**Evidence:** official OpenAI Codex best practices, checked 2026-09-01.

### 8. Turn a repeated workflow into a Skill only after it works manually

**Use when:** the same inputs, steps, checks and output recur.

**Do this:** first complete the workflow manually at least twice. Then create a
narrow Skill with a clear trigger, required inputs, output and stop condition.

```text
Use this Skill when the user asks to turn an approved event brief and vendor
quotes into a checked internal proposal. Require the approved brief and current
quotes. Produce proposal.md and evidence.md. Never book or contact vendors.
Stop after the five budget figures and source map agree.
```

**Why it helps:** a Skill saves a verified recipe. It does not make an unclear
or unstable process reliable.

**Watch for:** overlapping Skill descriptions, hidden side effects, installing
many integrations “just in case,” or assuming instructions grant permissions.

**Free route:** save the recipe as a reusable note. **Paid/agentic extension:**
install the reviewed Skill on the supported surface and test it on harmless
sample data.

**Evidence:** official OpenAI best-practice guidance, checked 2026-09-01.

### 9. Choose GPT-5.6 model and effort as separate decisions

**Use when:** the chosen OpenAI surface actually exposes model or effort
controls. Do not invent these controls for a Free chat that does not show them.

**Do this:** use Luna for narrow high-volume work, Terra as the balanced route
and Sol when the task genuinely needs the strongest capability. For the API,
OpenAI currently documents `none`, `low`, `medium`, `high`, `xhigh` and `max`.
Medium is the balanced starting point; test one level lower. Raise effort only
when the same representative task shows a meaningful quality gain. Pro mode is
an API execution mode independent of model and effort—not the ChatGPT Pro plan.

**Why it helps:** the model, effort, execution mode and subscription answer
different questions. The most expensive combination is not automatically the
best result per task.

**Watch for:** typing “use max” into a prompt and believing the control changed;
using Max because the subject feels important; or calling API Pro mode a plan.

**Free route:** use the model the account provides, narrow the task and preserve
the same checks. **Paid/API extension:** compare the same prompt, tools and
finish line across the candidate settings; record quality, time, tokens and
manual repair.

**Evidence:** official OpenAI GPT-5.6 model guidance, checked 2026-09-01.

## Claude, Cowork and Claude Code — practical operating cards

### 10. Choose the Claude surface before the model

**Use when:** deciding between Claude Chat, a Project, Cowork and Claude Code.

**Do this:** choose Chat for conversation and supplied material; a Project for
a continuing bounded source set; Cowork for supported multi-step computer work;
and Claude Code for explicit repository/file/command work. Then select model,
effort, permissions and tools.

**Why it helps:** these surfaces differ in what they can reach and do. They are
not a ladder from less intelligent to more intelligent.

**Watch for:** giving Chat instructions that assume local-folder access, calling
Claude Code a Free Chat feature, or treating Cowork and Code as interchangeable.

**Free route:** Chat/Projects with manual file handling where enabled.
**Paid/agentic extension:** Cowork or Code only when their actual execution
surface removes a real bottleneck.

**Evidence:** current Anthropic product documentation; access remains
plan/account/region dependent.

### 11. Keep Claude's context small enough to remain useful

**Use when:** a Project or Code session has accumulated many files, outputs and
old instructions.

**Do this:** begin with the smallest high-signal source set. Reference exact
files. Put always-true Code rules in `CLAUDE.md`; put on-demand workflows in
Skills; use MCP only for external systems; use a subagent when an investigation
would flood the main context. Start a fresh task or preserve a compact handoff
when the job changes. Anthropic's current rule of thumb is to keep `CLAUDE.md`
under 200 lines and move reference material to Skills or scoped rules.

**Why it helps:** current Claude Code guidance says performance degrades as its
context fills. More material can make the important material harder to use.

**Watch for:** uploading an entire drive, a long `CLAUDE.md` containing every
possible edge case, or several Skills whose descriptions overlap.

**Free route:** one short Project instruction and only the relevant files.
**Paid/agentic extension:** route specialised context on demand and isolate
large investigations.

**Evidence:** Anthropic context-engineering and Claude Code extension guidance,
checked 2026-09-01.

### 12. Use `CLAUDE.md`, Skills, MCP and hooks for different jobs

**Use when:** configuring Claude Code beyond one prompt.

| Mechanism | Put this there | Do not use it as |
|---|---|---|
| `CLAUDE.md` | short always-true project rules | a storage cupboard for every procedure |
| Skill | reusable knowledge or workflow loaded when relevant | automatic permission or enforcement |
| MCP | access to an external service or data source | a quality guarantee |
| Hook | deterministic action at a lifecycle event | a substitute for human judgment |
| Subagent | isolated investigation or independent workstream | extra ceremony for one dependent task |

**Why it helps:** every extension consumes attention or adds capability. Loading
the wrong thing at the wrong time can create noise or side effects.

**Watch for:** a side-effecting Skill that can auto-run, an unreviewed hook, or
a connector with broader access than the job needs. For a Skill with side
effects, Anthropic recommends `disable-model-invocation: true` so only the user
triggers it.

**Free route:** use a maintained recipe note where the feature is unavailable.
**Paid/agentic extension:** configure the smallest mechanism that fits the job,
then verify it on a harmless sample.

**Evidence:** official Claude Code extensions guide, checked 2026-09-01.

### 13. Treat Claude model advice as workload advice, not a personality quiz

**Use when:** the actual Claude surface exposes the model and effort controls.

**Do this:** Anthropic's current API overview says to start with Opus 5 for most
general workloads and use Fable 5.1 for demanding reasoning or long-horizon
agentic work. Its effort page says Fable 5.1, Opus 5 and Sonnet 5 each support
`low`, `medium`, `high`, `xhigh` and `max`; their API default is high. That page
says to begin Fable 5.1 at high and step down when evaluation shows quality
holds. Its separate cost guide says that for most *agent workloads*, start
Fable 5.1 at low and raise effort where it misses. Those recommendations answer
different questions; the book must retain the disagreement and its scope.
Compare candidates on cost per completed task, including retries and repair—not
price per token. Haiku 4.5 does not expose the same effort control.

**Why it helps:** model rankings can flip by workload. Anthropic's own measured
research case found nearly unchanged Fable 5.1 quality from low through high
while cost rose. Its long-horizon coding results showed a real quality/effort
trade-off. “Hard” does not tell you which curve your task follows.

**Watch for:** carrying Fable 5 guidance forward as Fable 5.1 guidance without
rechecking; treating API advice as proof of consumer-app availability; or
raising effort without comparing the same job.

**Free route:** use the enabled model, reduce the job to a bounded checkable
unit and record the actual picker. **Paid/API extension:** run the same sample
in separate sessions across two or three effort levels and compare completion,
evidence, repair, time and cost.

**Evidence:** official Anthropic model overview and cost/intelligence guide,
checked 2026-09-01. The cited measurements are Anthropic-internal and
directional, not a universal benchmark.

### 14. Use XML only when structure is actually the problem

**Use when:** a complex Claude API prompt mixes several documents,
instructions, examples and variable input.

**Do this:** use clear descriptive tags such as `<documents>`, `<instructions>`
and `<output_requirements>`. For long document work, place the documents first
and the query after them. In ordinary Chat, headings and clearly named files
may be enough.

**Why it helps:** tags separate different kinds of content. They are not magic
words that make an unsupported answer true.

**Watch for:** teaching every beginner to decorate a two-sentence request with
XML, or confusing source organization with source verification.

**Free route:** use plain headings and numbered sources. **Paid/API extension:**
use consistent tags and test them on several representative inputs.

**Evidence:** official Anthropic prompting best practices, checked 2026-09-01.

## Freshness conflict found during this pass

The 2026-08-31 Claude packet used **Fable 5**. On 2026-09-01 Anthropic's current
model overview listed **Fable 5.1** as the frontier model and supplied a new
cost/intelligence guide with August 2026 measurements. This is a substantive
freshness change, not a copyedit. Every Fable tool card now requires a
model/version and surface recheck; older support pages may still describe
Fable 5 access and must not be silently applied to Fable 5.1.

## Current source register

### OpenAI official

- [Codex best practices](https://learn.chatgpt.com/guides/best-practices),
  living documentation checked 2026-09-01 — goal/context/constraints/done,
  planning, `AGENTS.md`, permissions, verification, Skills.
- [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model),
  living documentation checked 2026-09-01 — Sol/Terra/Luna, effort, Pro mode,
  lean prompts and approval boundaries.
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app) and
  [ChatGPT Work overview](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview),
  checked 2026-09-01 — surface and execution distinctions.

### Anthropic official

- [Models overview](https://platform.claude.com/docs/en/models/overview),
  checked 2026-09-01 — Fable 5.1, Opus 5, Sonnet 5, Haiku 4.5 and general
  starting recommendation.
- [Optimizing for cost and intelligence](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence),
  checked 2026-09-01 — cost per completed task, effort sweeps, retries, task
  budgets and workload-dependent rankings.
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices),
  checked 2026-09-01 — examples, structured prompts and long context.
- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort), checked
  2026-09-01 — supported levels, defaults, model-specific recommendations and
  the distinction between effort and a hard token budget.
- [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
  and [extensions](https://code.claude.com/docs/en/features-overview), checked
  2026-09-01 — verification, planning, context, `CLAUDE.md`, Skills, MCP,
  subagents and hooks.
- [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents),
  Anthropic Engineering, 2025-09-29 — smallest high-signal context and diverse
  canonical examples.
- [Agentic coding and persistent returns to expertise](https://www.anthropic.com/research/claude-code-expertise),
  2026-06-16 — preliminary aggregate evidence that task expertise, precise
  framing, verification and correction remain important. It does not measure
  downstream real-world outcomes.

### Named practitioner methods

- [Ethan Mollick, opinionated guide](https://www.oneusefulthing.org/p/an-opinionated-guide-to-which-ai-b22),
  2026-07-23; reopened 2026-09-01 — inspect standing action permissions;
  first-hand account, not a product benchmark. His preferred model/effort
  settings are opinion and are not adopted as a safety rule.
- [Simon Willison, first run the tests](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/),
  updated 2026-02-28, and [agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/),
  2026-03-06; reopened 2026-09-01 — establish a baseline and exercise the real
  interface.
- [Addy Osmani, writing a good spec for AI agents](https://addyo.substack.com/p/how-to-write-a-good-spec-for-ai-agents),
  2026-01-19; reopened 2026-09-01 — concise specification, plan first, bounded
  implementation.

### LAiDIES observed evidence

- `operations/product-stewards/library/pilot-20260831/RESULTS.md` — preserved
  ChatGPT Free and Claude Code workshop runs, failed revisions, targeted repairs
  and narrow mechanical checks. These runs do not establish general product or
  model superiority.

## Recheck triggers

Reopen the affected official sources when any model name, effort label, default,
plan entitlement, surface, permission system, Skill location, connector, data
control or pricing page changes. Recheck every volatile card again immediately
before manuscript admission and public release. Keep durable operating methods
separate from replaceable UI and entitlement cards so one moved control does
not stale the whole chapter.
