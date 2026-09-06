---
title: The Claude Guide
subtitle: From a useful conversation to finished, checked work
status: First complete manuscript draft — not published
currentness_checked: 2026-09-06
audience: Nontechnical adult readers using Claude Free, paid Claude plans, or a workplace account
---

# The Claude Guide

Claude can help you turn a messy stack of notes, documents and numbers into work you can actually use. It can also produce a perfectly composed sentence that quietly changes “we might” into “we will.” This guide is about getting the first result without missing the second problem.

You do not need to learn a secret language. You need to know five things: what job you are giving Claude, which material controls the answer, what Claude is allowed to reach, what must be true when it finishes, and what you will inspect before anyone relies on the result.

The product changes quickly. The durable method in this book should survive a moved button or a renamed model. The model and plan details are dated **September 6, 2026** and linked in the source appendix. Recheck them before paying, changing a workplace process or using sensitive material.

## The quickest useful start

If you have never used Claude, begin with one low-risk job whose answer you can judge. Do not begin with confidential performance reviews, a legal decision, a medical diagnosis, a live customer database or permission to send messages on your behalf.

Try this with a harmless paragraph you already understand:

```text
Turn the notes below into a clear update for my team.

Audience: colleagues who know the project but missed this week's meeting.
Keep: the decision, owner, date and unresolved question.
Do not invent an answer to the unresolved question.
Format: a subject line and a message under 180 words.
Done when: every date and owner matches my notes and the unresolved question is
still visibly unresolved.

[Paste the notes]
```

Read the result against the notes. Check the names, dates, commitments and anything that sounds more definite than your source. Then give one precise correction instead of asking Claude to “make it better.”

```text
The source says Priya will confirm the date; it does not say the launch is May 14.
Replace the May 14 commitment with “launch date pending Priya's confirmation.”
Preserve the rest of the message. Return the complete corrected message and stop.
```

That tiny sequence contains the whole operating method: give the job, supply the truth, define finished, inspect the consequential details, repair the exact failure and stop.

**Applies to both Free and paid plans:** the method above. **Free route or limit:** use the model Claude provides and copy the final text into your own document if file creation is unavailable or you reach a usage limit. **Paid difference or extension:** paid plans may provide more capacity, more models and surfaces that can carry out several steps or use tools on your behalf, but the same inspection still belongs to you. **No equivalent:** Free does not provide Cowork, Claude Code or paid Research. Chat with manual file handling is the honest alternative, not the same capability wearing a fake moustache.

## What this book covers

Use the contents as a route map rather than a syllabus:

1. Create an account and make the settings deliberate.
2. Choose among Chat, Projects, Artifacts, Research, Cowork, Claude Code and the API.
3. Keep privacy, memory, training and permissions separate.
4. Choose the available model and effort for the job—not for the prestige of the label.
5. Build a complete leadership-ready proposal from a brief, notes and a spreadsheet.
6. Work with files, the web and citations without confusing retrieval with truth.
7. Use Projects, Skills, MCP, hooks, subagents and persistent instructions in the place they belong.
8. Verify, repair, recover and stop.

The central proposal is a **constructed teaching example**. Its source material and outputs are complete enough to copy and adapt, but LAiDIES did not run that exact example in a Claude consumer account. A separate, clearly labelled note later in the book reports what LAiDIES actually observed in one paid Claude Code test. Do not blend the two.

# 1. Get into Claude without making the first chat carry your whole life

As of September 6, 2026, Anthropic says adults in supported locations can create a Claude account at [claude.ai](https://claude.ai) with an email address. Claude is also available through official desktop and mobile apps. The exact sign-in choices, identity checks and screen layout can vary by platform, region and organization. This guide does not claim a fresh hands-on test of account creation; it reports the current official route.

After signing in, start with the ordinary chat box. Type what you need in natural language. The plus control in a chat may expose files, web search or other enabled tools. If a control named in this guide is missing, do not assume you failed. It can depend on your plan, app version, region, workplace policy, rollout and the particular model in use.

Before uploading work, open Settings. The important settings are not cosmetic. They decide what Claude may remember, which standing instructions influence every chat, whether code execution can create files, which services are connected and whether additional usage can cost money.

## Instructions for Claude

Profile instructions are account-wide guidance. Put genuinely stable preferences here: the language you use, a standard accessibility requirement, the fact that you want unresolved items labelled, or your preferred output style. Do not paste the rules for one proposal into an account-wide field; they will follow you into unrelated work.

Useful profile instruction:

```text
Use Canadian English with -ize and -ization spellings. Distinguish confirmed
facts, assumptions and unresolved items. Do not describe a draft as sent,
approved or published unless I say that happened.
```

Bad profile instruction:

```text
Always use the June campaign brief and make every answer sound like our CEO.
```

That rule is too specific and too risky to trail behind every future conversation. Put project-specific rules inside the Project or current job instead.

## Styles

A Style changes how Claude writes. It can help with tone and presentation; it does not change which source is authoritative, grant tools or make claims true. Use a Style after you know the content is right. If “concise” removes a necessary caveat, the style has damaged the work.

When a particular voice matters, give Claude a short, approved example and explain what to preserve. “Professional” is not a useful specification. Professional for a board note, a community welcome and an incident report are three different outfits.

## Memory

Anthropic's current help says memory is on by default for Free, Pro and Max accounts on the web, desktop and mobile apps. Team and Enterprise availability can depend on an owner. The current settings route is **Settings → Memory → Generate memory from chats**, although a small number of legacy organization accounts may still see memory under Capabilities.

Memory stores topics Claude can use in later conversations. Projects have separate memory spaces and summaries. You can view, edit or delete remembered topics. Pausing memory keeps existing memories but stops using or adding to them; resetting memory permanently deletes memories, including Project memories. Check the confirmation screen carefully before a reset.

Sensitive topics are not stored by default under the current consumer memory design. There is a separate choice to include them. That is a reason to inspect the setting, not a reason to test it with information you should never have pasted.

Memory can be convenient for a recurring preference. It is not source authority. If Claude remembers that your budget is CAD 12,000 and the signed brief now says CAD 9,500, the brief wins. Put current controlling facts in the current job.

## Incognito chat

Incognito is available across the listed plans outside Projects. It keeps the conversation out of normal chat history and memory and Anthropic says it is not used for training. It is still retained for 30 days by default, and organization exports or organization retention rules can include it. Incognito is a privacy control, not a vanishing room.

Use it when you want a conversation excluded from personal memory and ordinary history. Do not use it as permission to paste secrets, regulated records or someone else's personal data. It is not available inside Projects because Projects are designed to preserve continuing context.

## Data and training controls

For Free, Pro and Max consumer use, check the current privacy or data-control choice in the exact account. Consumer users can choose whether new or resumed chats may be used to improve models. Team and Enterprise products have different organization terms and are described by Anthropic as not used for training by default. A paid consumer plan is not automatically a business privacy contract.

Training choice, retention, chat history and memory answer different questions:

- **Training choice:** may this content be used to improve models?
- **Retention:** how long may the provider keep inputs and outputs?
- **History:** does the conversation appear in your normal account list?
- **Memory:** may Claude carry selected context into later work?

Turning one off does not prove the others are off. Fable 5.1 adds a model-specific retention boundary discussed in Chapter 4: it is a Covered Model whose inputs and outputs require 30-day retention on every surface where it is offered, unless Anthropic expressly authorizes an eligible organization arrangement.

## Capabilities and connected services

Anthropic currently documents code execution and file creation for all plans on web, desktop and mobile, normally enabled by default for Free, Pro and Max and manageable under **Settings → Capabilities**. It can create documents, spreadsheets, presentations and PDFs. Availability can still be limited by the account or organization. Open the downloaded file and inspect it; a download button proves a file exists, not that the slide totals or formulas are right.

Connectors let Claude reach another service. A connector inherits real permissions from the connected account. Review the requested scope, choose the smallest useful account or folder, and disconnect it when the continuing access is not worth the exposure. One custom remote MCP connector is currently documented on Free; paid and workplace access differ. Remote MCP is cloud-to-cloud and does not magically reach an internal service hidden behind a VPN.

## Billing and usage

Paid subscriptions and API billing are separate. A Pro or Max subscription does not include ordinary Claude API use. Paid accounts may offer usage credits that continue work beyond included limits or unlock Fable on plans where it is not included. Credits are additional spending. Under the current help route, inspect **Settings → Usage**, confirm whether credits are enabled and set a monthly limit before a long job.

On Free, limits vary with message length, files, current conversation length, model, effort and tools. A long linked webpage can consume substantial capacity because its contents enter context. Save useful work outside Claude before a limit arrives. The remedy for a full context or usage window is not always a higher plan; often it is a smaller job and a cleaner source pack.

### Your five-minute settings check

Before real work, answer these in your own account:

1. What plan or workplace organization am I using?
2. Is memory on, and what is already remembered?
3. What does the current data-improvement control say?
4. Is code execution/file creation enabled?
5. Which connectors can reach external information or take actions?
6. Are usage credits enabled, and what spend limit applies?

Record the answers if the job matters. Settings move. Your screenshot or note tells you what was true for this run.

# 2. Claude is several places to work, not one taller and taller robot

Choose the surface before the model. The surface determines what Claude can reach and what kind of work it can perform.

## Claude Chat

Chat is the default for questions, writing, analysis, supplied files, web search and file creation where enabled. Use it when the job fits in a conversation and you can manually provide the source material and save the result.

It is the core Free route. A good Chat job can be substantial. “Free” does not mean toy; it means usage limits, fewer paid-only surfaces and whichever model/access the account provides.

## Projects

A Project keeps a continuing job's chats, instructions and knowledge together. Anthropic's August research documentation stated up to five Projects on Free and unlimited Projects on Pro, with workplace controls able to vary access. Current Projects can use retrieval when the knowledge set grows: Claude searches for relevant portions rather than placing every byte in every response.

Use a Project for a proposal that will be revised over several days, a recurring monthly report or a maintained source pack. Give it one job. A Project called “Everything About My Company Since 2012” is not context management; it is a storage unit with no aisle signs.

## Artifacts

An Artifact is a separate, editable output beside the conversation: a document, code, diagram or small interactive tool. Use it when seeing and revising the output separately is more useful than reading it inside chat.

Artifacts can be available on Free when the required capability is enabled. Paid-only Artifact storage or MCP features are a separate extension. If an Artifact is shared, users of that Artifact may see shared storage. Inspect its source and data boundary before putting anything private into it.

## Research

Research is a paid feature that can investigate a defined question across the web and connected sources. It requires web search. It is useful when the job needs a broader multi-source search rather than one or two current facts.

There is no documented Free Research equivalent. The Free route is a smaller search job in Chat: ask for a claim-and-source table, open the original sources yourself, and keep the question narrow enough to check. Citations are handles for inspection, not certificates of truth.

## Cowork

Cowork is a paid beta for multi-step computer work. Current official documentation says its agent loop and code execution run in Anthropic cloud sandboxes by default. The desktop app provides a granted route when a task needs local files, a browser or computer access. Pure cloud work may continue after the laptop closes; local-device reach cannot continue once that route is unavailable.

Use Cowork when the work genuinely needs several actions across files or supported services. Connect one copied folder, state what may change, name the output location and prohibit deletion unless deletion is the reviewed job. A conversational request is not a technical permission boundary; inspect the product's actual approval request.

There is no Free Cowork equivalent. Chat can prepare the plan, filenames, content and manifest, but you perform the file actions.

## Claude Code

Claude Code is for a real technical folder or repository. It can inspect files, edit code, run commands and tests, and work with version control under its permission modes. It belongs in this guide because nontechnical founders and product owners may supervise repository work, not because everyone should open a terminal.

Use it only when the job is actually in a codebase or technical workspace. A leadership proposal does not improve because it was dragged into a repository. Chapter 11 gives a separate, honest website example.

Claude Code is included with current paid individual plans and eligible workplace plans; it is not a Free Chat capability. API billing remains separate when the setup uses an API key rather than subscription authentication.

## The API and Claude Console

The API lets software send structured requests to Claude models. Claude Console is the developer environment for keys, billing and testing. Use the API when a repeated process needs integration, logging, programmatic inputs or controlled output—not because copying a prompt feels insufficiently glamorous.

API use is billed separately from a Claude subscription. It exposes model IDs, effort controls and parameters that may never appear in the consumer app. An API documentation page cannot prove that a Free or Pro app account has the same model picker.

## The surface chooser

| Your actual need | Smallest sensible place | Free route | Paid difference | No equivalent |
|---|---|---|---|---|
| Discuss, draft or analyze supplied material | Chat | Yes, within limits | More capacity/models may help | — |
| Reuse one source set and instructions | Project | Up to the current Free allowance | More Projects and capacity | — |
| Make an editable document or small interactive output | Artifact/file creation in Chat | Where enabled | Extra storage/integrations may apply | — |
| Investigate a broad current question | Web search in Chat | Smaller manual search | Research can run a wider multi-step investigation | Research itself is paid-only |
| Change a bounded set of files through several steps | Chat plan plus manual actions | Manual | Cowork can execute granted actions | No Free Cowork |
| Edit and test an existing website/app/repository | Chat can explain; human edits | Manual | Claude Code works in the repository | No Free Claude Code |
| Build Claude into a product or automated workflow | None inside ordinary Chat | No | Separately billed API | No subscription equivalent |

The useful question is not “Which is most powerful?” It is “What must this job reach, change and prove?”

# 3. Privacy and permission: four separate doors

People often ask, “Is Claude private?” That is too broad to answer. Ask four smaller questions.

## Door one: should this information enter an AI service at all?

Remove what Claude does not need. For a staffing analysis, it may need role counts and aggregate hours; it probably does not need employee names, medical details or private comments. Redaction is not a vibe. Open the file and check the cells, hidden sheets, speaker notes, comments and metadata.

If your employer has an approved AI product and policy, use those. Do not move workplace information into a personal account because the personal interface is familiar.

## Door two: what does this plan do with the data?

Check the exact consumer or workplace terms and current settings. Free/Pro/Max training choice is not the same as Team/Enterprise no-training-by-default terms. Incognito changes history, memory and training treatment but still has retention. A connector may have its own service terms as well as Claude's.

## Door three: what can Claude reach or change?

A file upload gives Claude the uploaded file. A connector can expose a wider account. Cowork or Code may have file and command access. The API key may permit paid requests. Grant the narrowest capability that finishes the job.

Write permissions by consequence:

```text
You may read the three supplied source files, draft new files in /output and
run the named checks. Ask before overwriting originals, deleting, contacting
anyone, spending money, changing account settings, publishing or expanding the
job. Never include individual staff names or comments in the outputs.
```

Then use the product's real permission controls as well. Instructions guide behavior; they do not replace enforced access limits.

## Door four: who approves the real-world decision?

Claude can draft an email. It cannot decide that the proposal is approved. It can prepare a schedule. It cannot promise an executive will attend. It can recommend a file change. It cannot assume deletion is acceptable.

Keep a visible line between **drafted**, **checked**, **approved**, **sent**, **published** and **working in the real environment**. Those states are not synonyms.

## Fable 5.1's 30-day Covered Model rule

Claude Fable 5.1 and limited-access Mythos 5.1 are Covered Models. Anthropic's current policy requires prompts and outputs to be retained for 30 days to support safety work on every platform where those models are offered. An eligible organization with a zero-data-retention or equivalent arrangement does not automatically escape that rule; Anthropic must expressly authorize the covered-model arrangement.

This matters before the model picker. If the material cannot tolerate that retention, do not choose Fable 5.1 simply because its capability sounds useful. Use an approved non-covered route or keep the material out. A consumer training toggle is not proof of zero retention.

**Applies to both Free and paid:** minimize data, remove personal details, check permissions and keep consequential approval human. **Free route or limit:** stay in Chat with pasted or uploaded redacted material and no connector where possible. **Paid difference or extension:** workplace controls and surfaces that can carry out several steps or use tools on your behalf can provide better governance or execution, but must be configured and verified. **No equivalent:** a personal Free account is not a substitute for an employer's approved contractual environment.

# 4. Choose a model for the work in front of you

Model names change faster than the method. As of September 6, 2026, the current family relevant to this guide is Sonnet 5, Haiku 4.5, Opus 5, Fable 5.1 and invitation-only Mythos 5.1. What your app shows can differ by plan, organization, region, rollout and product version.

The model is the trained component producing the response. The surface is where you work. Effort controls how much reasoning the model applies. The plan controls entitlement and capacity. Tools determine what it can retrieve or do. Keep those five labels separate in any comparison.

## The Free-enabled model: Sonnet 5

Anthropic's June 30 announcement says Sonnet 5 is the default model on Free and Pro and is available across all plans. It is the sensible starting point for the proposal in this book: the work involves several source files and connected outputs, but no evidence says it requires a specialist frontier route.

Use Sonnet 5 for everyday professional writing, analysis, file creation, coding and tool work. Anthropic says its lower-effort behavior can be literal: when revising, name every file and section that must change rather than assuming one instruction will spread everywhere.

Recipe:

```text
Use the approved brief as authority, the spreadsheet for figures and the notes
only for unapproved ideas. Create the four named deliverables. When revising,
change every named occurrence and preserve unaffected content. Report any
requirement you could not verify. Stop after the acceptance checks.
```

**Applies to both:** start here when it is the enabled model and the result is checkable. **Free route or limit:** use the default Sonnet 5 route within the account's usage limit; split long work into saved stages if needed. **Paid difference or extension:** paid capacity or other exposed models may reduce interruptions or serve a measured need. Paying does not turn draft claims into approved claims.

## Haiku 4.5

Haiku 4.5 is Anthropic's fastest current model in the official API comparison. It is suitable for narrow extraction, classification, reformatting and high-volume work when the rule and missing-value treatment are explicit.

```text
From metrics.csv, return only a table with Team, People, Weekly meeting hours
per person and Eight-week person-hours. Calculate the final column as
People × Weekly hours × 8. If a value is missing, write MISSING; do not estimate.
```

Haiku 4.5 does not support the same low-to-max effort control described for the Claude 5 models. Do not type “use high effort” into the prompt and pretend a setting changed. Use it when exposed in your surface or through the API; exact consumer entitlement is account-dependent and was not observed for this manuscript.

## Sonnet 5

Sonnet is the balance of speed and capability. It is the default Free/Pro model documented at launch and the best first comparison for most readers. Give it complete requirements. At lower effort, explicitly list connected edits and tool use you need.

If it produces a good deck but forgets to update the email, the smallest useful correction is not “be more thoughtful.” It is:

```text
Apply the corrected 216 person-hour figure to slide 3, its speaker note, the
one-page summary and the email draft. Do not change the approved pilot scope,
budget or recommendation. Return the four corrected sections and stop.
```

## Opus 5

Anthropic positions Opus 5 for complex coding that can run through several steps and for enterprise work, and its general model guide recommends it as a starting point for many workloads. That is vendor guidance, not proof that Opus will improve your ordinary memo.

Use Opus when the job has genuinely connected decisions, a long agent loop or a measured failure on Sonnet. Anthropic specifically warns that generic requests to verify again can duplicate checks Opus already performs, and that small tasks can acquire unnecessary review or subagent ceremony. State the acceptance conditions once and ask for evidence of them. Do not install an infinite hall of mirrors in which one model drafts, three model reviewers review the reviewer, and nobody opens the spreadsheet.

```text
Acceptance: all four deliverables use the same approved scope, budget and
decision request; every figure maps to metrics.csv; no brainstorm idea becomes
a commitment. Return the deliverables plus a short evidence table. Do not add a
separate reviewer or extra deliverable. Stop when these conditions are checked.
```

## Fable 5.1

Anthropic launched Fable 5.1 on September 1, 2026 for demanding reasoning and long-running work that can plan and act through several steps. It is not available on Free. On Max and premium Team or Enterprise seats, it uses the ordinary shared weekly allowance, with Fable use capped at half of that allowance. On Pro and standard Team/Enterprise seats it requires usage credits from the first use. Access can still depend on organization enablement, app version and rollout.

Fable 5.1 is not “the good model” while everything else is a compromise. It is a specialist, expensive route with a 30-day Covered Model retention rule. Use it after the work earns it.

Anthropic's current prompt guidance describes several behaviors to watch: at Low it may search less unless search is explicit; during tool loops it may provide fewer progress messages; it may add adjacent work, write densely or rewrite a whole file when a targeted edit was wanted. At xhigh or Max, long requested outputs may need enough output room and a sharp finish line.

Fable control block:

```text
Authority: approved-brief.md wins, then metrics.csv, then notes.md. Notes may
suggest options but cannot create commitments.
Autonomy: proceed through the named deliverables without asking about choices
already resolved by the brief. Ask before any external action or scope change.
Search: do not search; this job uses only supplied sources.
Edits: make targeted changes and preserve unaffected sections.
Progress: give one short update after each deliverable during a long run.
Done: the four outputs exist, figures reconcile, unapproved ideas are labelled
as options, and nothing was sent or published. Stop there.
```

That block is an editorial recipe based on Anthropic's current documented tendencies. The leadership proposal was not run on Fable 5.1, so it is not a measured result.

## Mythos 5.1

Mythos 5.1 is not a consumer upgrade to chase. Anthropic's September 1 platform release notes and model page say it is invitation-only for approved Project Glasswing participants. It shares Fable 5.1's underlying model, specifications and pricing but is offered without some Fable safeguards to a limited approved group. It is also a Covered Model subject to 30-day retention.

There is no Free, Pro or ordinary paid-plan route to reproduce that access. If your organization has not been approved, choose among the models actually offered to you. Do not contact an account team merely because a tutorial name-dropped Mythos.

## Effort: Low, Medium, High, xhigh and Max

Anthropic currently documents all five effort levels for Fable 5.1, Opus 5 and Sonnet 5 in the API. Haiku 4.5 does not expose the same control. Consumer app choices may be simplified, hidden or account-dependent; this manuscript did not inspect representative Free, Pro, Max and workplace pickers.

- **Low** asks the model to spend less reasoning. Test it for narrow extraction, transformation or an agent workload with a clear answer key. On Fable 5.1, ask explicitly for search if current facts matter.
- **Medium** is a useful baseline for connected document work when your surface exposes it. Anthropic says Medium is the current default for Fable 5.1 in Claude.ai and Cowork.
- **High** is the current API default for Fable 5.1, Opus 5 and Sonnet 5, and Anthropic says it is the Fable 5.1 default in Claude Code. Raise to High when a lower setting missed a named contradiction or dependency, or when one change must stay consistent across several outputs.
- **xhigh** is for deeper, longer reasoning after a representative lower run exposes a real quality gap. It can cost more and take longer. Emotional importance alone is not evidence.
- **Max** is the highest documented effort in this set. Reserve it for an unusually connected job whose lower setting failed a named test and whose additional cost and time are justified.

Effort is not a hard token budget and it does not directly set answer length. If you need a short answer, say so. If you need a long manuscript, provide an output requirement. High effort is a setting, not a tiara.

There is a genuine source tension worth keeping. Anthropic's effort reference says to start Fable 5.1 at High and step down when evaluations show quality holds. Its cost guide says to start Fable 5.1 at Low for most **agent workloads** and raise it when the model misses. Those are different scopes: conservative capability guidance versus measured cost-per-completed-agent-task guidance. For your own repeated job, run the same harmless sample at two settings, record completion, repair, time and cost, and choose the lowest setting that reliably passes.

### A practical effort decision

Start with the surface default or the lowest available setting likely to complete the job. Move upward only when you can finish this sentence:

> The lower setting missed ________, and that matters because ________. I will rerun the same inputs at ________ and compare ________.

Good reason: “Medium used the informal notes as authority in two of four deliverables. I will test High with the same authority block and compare unsupported commitments across all four files.”

Bad reason: “This presentation is for the CEO, so obviously Max.” Importance raises the inspection standard. It does not automatically raise the reasoning setting.

# 5. The central job: from mixed source material to a leadership-ready proposal

You have a meeting tomorrow. Leadership expects a short presentation, speaker notes, a one-page summary and an email draft. You have three inputs: an approved brief, rough brainstorm notes and a spreadsheet. The dangerous part is not the workload. It is that all three files sit side by side while carrying different authority.

This is a constructed teaching case, not a preserved Claude run. The figures and outputs below are deterministic examples designed to show the method. Nothing was sent, presented, approved or published.

## Starting source 1: `approved-brief.md`

```text
# Approved brief — Focus Friday pilot proposal

Decision requested
Approve an eight-week internal pilot for the Operations, Marketing and Support
teams.

Pilot design
- Protect Friday from 1:00–4:00 p.m. for focused work.
- Do not schedule recurring internal meetings in that block.
- Client emergencies, safety incidents and legal deadlines remain exceptions.
- Managers may move genuinely necessary work; this is not a four-day workweek.

Evidence boundary
- Use aggregate planning data only.
- The spreadsheet estimates person-hours currently occupied by recurring
  Friday meetings. It does not prove those hours will become productive output.
- Do not promise a productivity percentage, permanent policy or company-wide
  rollout.

Budget
- Training and facilitation: CAD 600.
- Setup and calendar support: CAD 300.
- End-of-pilot survey and analysis: CAD 120.
- Add a 10% reserve to those three costs once.
- Maximum total: CAD 1,200.

Measures
- Meeting hours removed from the protected block.
- Employee-reported ability to complete priority work.
- Client or operational exceptions.
- Manager assessment at the end of week eight.

Required proposal pack
- Six-slide presentation with concise speaker notes.
- One-page leadership summary.
- Email draft requesting review; mark it DRAFT.
- State unresolved implementation questions.

Boundaries
- Do not include individual staff names, comments or performance data.
- Do not contact staff, send email, change calendars, announce the pilot or
  describe it as approved.
```

## Starting source 2: `metrics.csv`

```csv
Team,People,Recurring Friday meeting hours per person per week,Eight-week person-hours
Operations,8,1.50,96
Marketing,6,1.25,60
Support,10,0.75,60
TOTAL,24,,216
```

The arithmetic is checkable:

- Operations: 8 × 1.50 × 8 = 96 person-hours.
- Marketing: 6 × 1.25 × 8 = 60 person-hours.
- Support: 10 × 0.75 × 8 = 60 person-hours.
- Total: 96 + 60 + 60 = 216 estimated person-hours currently scheduled in recurring Friday meetings.

The spreadsheet does **not** say 216 hours will be saved or converted into productivity. It describes the current scheduling estimate.

## Starting source 3: `rough-notes.md`

```text
# Rough notes — ideas, not approvals

- Maybe call it Focus Friday.
- Could say this guarantees a 20% productivity improvement? Strong headline.
- Longer-term dream: every team, permanently, maybe no Friday meetings at all.
- Ask whether Customer Success should join later.
- Need someone to own calendar exception guidance.
- Could quote individual comments from the pulse survey, but those comments
  contain names and were not approved for this proposal.
- Leadership will probably want to know what happens when a client emergency
  lands during the block.
- Maybe start October 9, but date has not been confirmed.
```

The approved brief controls the decision, scope, budget and promises. The spreadsheet controls the figures. The notes may help surface questions and naming options, but they cannot turn a maybe into a commitment.

## Remove private material before Claude sees it

The notes tell us individual survey comments contain names and are not approved. Do not upload the comments and then ask Claude not to repeat them. Exclude the file entirely. Claude cannot leak a document it never receives.

For a real spreadsheet, also inspect hidden sheets, filters, comments and metadata. Make a redacted copy containing only the fields needed for the proposal. Preserve the original in its approved location.

## Choose the route

For a Free account, use Sonnet 5 in an ordinary Chat or a Project if one is available. Upload the three redacted files. If file creation is enabled, request downloadable presentation and document files; otherwise request complete Markdown text that you can paste into your own tools. The core job remains possible either way.

For a paid account, a Project is useful because the sources and instructions will support revisions over several days. Research is unnecessary: current external facts are not part of the approved job. Cowork is unnecessary unless you need it to create or organize several files in a granted folder. Claude Code is the wrong surface; this is not a repository job.

## Exact Project instruction

```text
This Project produces the Focus Friday pilot proposal.

Authority order: approved-brief.md controls scope, promises, budget, measures
and required outputs. metrics.csv controls the numeric inputs. rough-notes.md
contains unapproved ideas and questions only; it cannot create a commitment.

Use aggregate data only. Never include names, individual comments or
performance data. Mark drafts and unresolved facts honestly. Do not send,
publish, announce, change calendars or describe the pilot as approved.
```

## Exact production prompt

```text
Create the complete Focus Friday proposal pack from the three supplied files.

First, read approved-brief.md, metrics.csv and rough-notes.md. Follow the Project
authority order. Do not browse. Do not use or request private participant data.

Produce:
1. A six-slide presentation. For each slide, give the title, on-slide text and
   concise speaker notes.
2. A one-page leadership summary with the decision requested, pilot design,
   evidence, budget, measures, risks and unresolved questions.
3. A review-request email under 180 words, clearly marked DRAFT.

Calculate the budget from the approved brief. Show subtotal, 10% reserve, total
and remaining amount under the CAD 1,200 maximum. Treat the spreadsheet's 216
person-hours as estimated current meeting time, not promised savings.

Do not turn rough-note ideas into approved facts. Do not promise a 20%
productivity improvement, permanent policy, company-wide rollout or October 9
start date. You may list them only as rejected or unresolved ideas when useful.

Acceptance:
- exactly six slides and six matching speaker-note sections;
- all four deliverables use the same scope and decision request;
- every number maps to the brief or spreadsheet;
- exceptions and unresolved questions remain visible;
- no private data, sending, publishing or claim of approval.

If file creation is available, create editable presentation and document files
and also return the complete text. If it is unavailable, return the complete
text with filenames; do not imply downloads exist. End with a short evidence
table showing the checks actually performed. Stop when those conditions pass.
```

This prompt is long because the job is connected, not because Claude demands ceremony. It gives the model what David Rose would insist on before accepting “make it nice”: the actual meaning of nice for this room, this decision and these files.

# 6. What a usable result looks like

The following is the complete target output for the constructed case. It is not a transcript of an account run. Use it to understand what to inspect, not as evidence that Claude will reproduce these exact words.

## `focus-friday-presentation.md`

### Slide 1 — Decision requested: approve an eight-week Focus Friday pilot

**On-slide text**

- Teams: Operations, Marketing and Support
- Protected block: Fridays, 1:00–4:00 p.m.
- Purpose: test whether reducing recurring internal meetings creates more room for priority work
- Decision today: approve a bounded pilot, not a permanent policy

**Speaker notes**

We are asking for approval to run an eight-week internal pilot across three teams. During the Friday afternoon block, recurring internal meetings would not be scheduled. Client emergencies, safety incidents and legal deadlines remain exceptions, and managers can move genuinely necessary work. This is not a four-day workweek or a company-wide policy. The pilot gives us a defined period in which to measure what changes before making any larger decision.

### Slide 2 — Why test this now

**On-slide text**

- 24 people across the three pilot teams
- 216 estimated person-hours currently scheduled in recurring Friday meetings over eight weeks
- Estimate describes meeting time, not guaranteed productivity

**Speaker notes**

The aggregate schedule data shows 216 person-hours currently assigned to recurring Friday meetings during an eight-week period: 96 in Operations, 60 in Marketing and 60 in Support. Removing a meeting does not guarantee that the time becomes useful output. The pilot is designed to test that question rather than claim the answer in advance.

### Slide 3 — Pilot design and exceptions

**On-slide text**

- Protect 1:00–4:00 p.m. each Friday
- No recurring internal meetings in the block
- Preserve client, safety and legal exceptions
- Managers retain judgment for genuinely necessary work

**Speaker notes**

The protected block is a scheduling rule, not a ban on necessary work. We need clear guidance so an exception remains an exception rather than swallowing the pilot. One unresolved implementation question is who owns that guidance and how teams record exceptions without creating a surveillance exercise.

### Slide 4 — What we will measure

**On-slide text**

- Recurring meeting hours removed from the block
- Employee-reported ability to complete priority work
- Client or operational exceptions
- Manager assessment after week eight

**Speaker notes**

These measures let us see both the intended change and its possible costs. We will count meeting hours, ask employees whether the block helped them complete priority work, record client or operational exceptions at an aggregate level, and collect manager assessment at the end. We will not use individual performance data or promise a productivity percentage.

### Slide 5 — Budget within the approved maximum

**On-slide text**

| Item | CAD |
|---|---:|
| Training and facilitation | 600 |
| Setup and calendar support | 300 |
| End-of-pilot survey and analysis | 120 |
| Subtotal | 1,020 |
| 10% reserve | 102 |
| Total | 1,122 |
| Remaining under CAD 1,200 maximum | 78 |

**Speaker notes**

The three listed costs total CAD 1,020. The brief requires one 10% reserve on that subtotal, or CAD 102, bringing the total to CAD 1,122. That leaves CAD 78 under the approved maximum. The reserve is included once; it is not applied separately to each line and then again to the total.

### Slide 6 — Approval, safeguards and open questions

**On-slide text**

**Approve:** an eight-week pilot for the three named teams, within CAD 1,122.

**Safeguards:** aggregate data; no permanent or company-wide promise; named operational exceptions.

**Resolve before launch:**

- Confirm start date.
- Name the owner of calendar exception guidance.
- Decide whether Customer Success should be considered only after this pilot.

**Speaker notes**

The decision is whether to approve this bounded pilot. A start date still needs confirmation. The rough notes mention October 9, a future company-wide policy and adding Customer Success, but none is approved. If leadership approves the pilot, the implementation owner should confirm the date and exception guidance before any announcement or calendar change.

## `focus-friday-speaker-notes.md`

The presentation above includes complete notes beside each slide. If your presentation software needs a separate file, copy the six note sections into a document with the slide numbers unchanged. Check that the title on every note matches the slide. A beautifully designed deck with notes attached to the wrong slide is still wrong.

## `focus-friday-one-page-summary.md`

### Focus Friday pilot — leadership decision summary

**Decision requested**

Approve an eight-week internal pilot for Operations, Marketing and Support, with Fridays from 1:00–4:00 p.m. protected from recurring internal meetings.

**What the pilot does**

The pilot creates a recurring block for priority work. Client emergencies, safety incidents and legal deadlines remain exceptions. Managers may move genuinely necessary work. It is not a four-day workweek, permanent policy or company-wide rollout.

**Why it is worth testing**

Aggregate schedule data for 24 people shows an estimated 216 person-hours currently occupied by recurring Friday meetings over eight weeks: 96 in Operations, 60 in Marketing and 60 in Support. That figure measures scheduled meeting time. It does not prove those hours will become productive work, which is why the proposal is a pilot rather than a promise.

**Budget**

Training and facilitation (CAD 600), setup and calendar support (CAD 300), and the final survey and analysis (CAD 120) produce a CAD 1,020 subtotal. A single 10% reserve adds CAD 102. The total is CAD 1,122, leaving CAD 78 under the CAD 1,200 maximum.

**How the pilot will be assessed**

The review will examine recurring meeting hours removed from the block, employee-reported ability to complete priority work, client or operational exceptions, and manager assessment after week eight. Reporting will remain aggregate and exclude names, individual comments and performance data.

**Risks and safeguards**

The protected block could be weakened by unclear exceptions or could move meetings rather than reduce them. The implementation owner should define exception guidance and monitor aggregate effects. No announcement, calendar change or claim of approval should occur until leadership approves the pilot and the start date is confirmed.

**Unresolved before launch**

- Confirm the start date; October 9 is an unapproved brainstorm note.
- Name the owner of exception guidance.
- Keep Customer Success outside the initial scope; consider it only after pilot evidence and a separate decision.

## `focus-friday-review-email.md`

```text
DRAFT — NOT SENT

Subject: Decision requested: eight-week Focus Friday pilot

Hello leadership team,

Attached is a proposal for an eight-week Focus Friday pilot in Operations,
Marketing and Support. The request is to protect Fridays from 1:00–4:00 p.m.
from recurring internal meetings, while preserving client, safety, legal and
genuinely necessary work exceptions.

The proposed budget is CAD 1,122, including the required reserve. Aggregate
schedule data identifies 216 person-hours currently assigned to recurring
Friday meetings over the pilot period; the proposal treats that as a baseline
to test, not a promised productivity gain.

Please review the scope, measures, exception approach and unresolved start
date. No announcement or calendar change will be made before approval and
implementation details are confirmed.

Thank you,
[Name]
```

## `focus-friday-evidence-table.md`

| Claim or check | Source or calculation | Result |
|---|---|---|
| Pilot teams and eight-week scope | approved-brief.md | Operations, Marketing, Support; eight weeks |
| Protected block | approved-brief.md | Friday 1:00–4:00 p.m. |
| Estimated current meeting time | metrics.csv | 96 + 60 + 60 = 216 person-hours |
| Cost subtotal | approved-brief.md | 600 + 300 + 120 = CAD 1,020 |
| Reserve | approved-brief.md | 10% × 1,020 = CAD 102 |
| Total and remaining | calculation | 1,020 + 102 = 1,122; 1,200 − 1,122 = CAD 78 |
| Six slides and notes | presentation count | Six slide sections; six note sections |
| Unsupported promises excluded | brief versus notes comparison | No 20%, permanent, company-wide or October 9 commitment |
| Private material excluded | approved-brief.md and rough-notes.md | No names, comments or performance data used |
| External actions | actual task boundary | Nothing sent, announced, presented or changed |

This table reports checks that can actually be seen in the constructed output. In a real run, Claude should not write “file opens correctly” unless it opened the file, or “email not sent” if it had a connector and never inspected the send state. Evidence must match what happened.

# 7. Inspect the proposal before the polish hypnotizes you

Do not review the deck by asking whether it feels professional. Inspect the decisions it could change.

## Check 1: authority

For every commitment, ask which source authorized it. The approved brief can authorize the pilot scope. The spreadsheet can support the 216-hour baseline. The notes can suggest a name or question. They cannot promise 20% improvement.

The file order on screen does not create authority. Think of a folder of magazine clippings: a signed announcement and a pencilled “maybe?” may sit in the same plastic sleeve, but they do not carry the same weight. The limit of the analogy is important: Claude does not see handwriting or social status unless the material and instruction make the distinction clear.

## Check 2: numbers and labels

Recalculate the budget. Check whether the reserve was applied once. Confirm the baseline is called estimated meeting time, not time saved. Search all outputs for `20%`, `permanent`, `company-wide`, `October 9`, `approved`, `will improve` and `guarantee`.

## Check 3: connected consistency

The deck, notes, summary and email should request the same decision. If the summary says three teams and the email says the whole company, the pack is not finished. A correction must cover every dependent occurrence.

## Check 4: privacy

Search for names and copied comments. Inspect slide notes, hidden sheets and document properties, not only the visible slide. Confirm only aggregate data remains.

## Check 5: state truth

The email is marked DRAFT. The proposal says approval is requested, not received. No output claims the start date is confirmed. No final message should say “The proposal has been sent” when all Claude did was create a file.

## A plausible bad output

Imagine Claude writes this on slide 1, repeats it in the summary and uses it in the email subject:

> Focus Friday will deliver a 20% productivity improvement across the company starting October 9.

The relevant context is the leadership pilot. The exact controlling source says not to promise a productivity percentage, permanent policy or company-wide rollout. The model has promoted three brainstorm ideas—20%, company-wide and October 9—into one commitment. A leader could approve, reject or communicate the proposal based on claims that were never authorized.

The smallest useful correction is specific and complete:

```text
Repair only the unsupported commitment in the presentation, speaker notes,
one-page summary and email draft.

The approved brief controls. It authorizes only an eight-week pilot for
Operations, Marketing and Support. It explicitly prohibits a promised
productivity percentage, permanent policy or company-wide rollout. The start
date is unresolved; October 9 appears only in rough-notes.md.

Replace every claim that Focus Friday “will deliver 20%,” applies company-wide,
is permanent or starts October 9. Use this supported wording where appropriate:
“an eight-week pilot for three teams to test whether reducing recurring Friday
meetings creates more room for priority work; start date to be confirmed.”

Also update any title, subject line, speaker note, summary sentence or evidence
row that depends on those claims. Preserve the verified budget, 216-hour
baseline, measures, exceptions and all unaffected wording.

Return the four corrected deliverables plus a list of every changed occurrence.
Stop after searching the final outputs for 20%, company-wide, permanent,
October 9 and guarantee. Do not redesign, send, present or add new work.
```

Inspect the corrected files themselves. A model can describe the repair accurately while leaving the old sentence inside the download.

## When the correction still misses one place

If the email subject remains “Company-wide Focus Friday starts October 9,” do not request a whole rewrite. Point to the exact residue:

```text
The email subject still contains two unsupported claims. Replace it with:
“Decision requested: eight-week Focus Friday pilot.” Preserve the corrected
email body and all other files. Return the complete email and stop.
```

This is source control in ordinary language: change the bad claim, update its dependants, protect the good work and stop.

## Free and paid routes for the complete job

**Applies to both:** use the same three redacted sources, authority order, acceptance checks and targeted repair.

**Free route or limit:** use Sonnet 5 in Chat or one of the current Free Projects. Request complete text first. If file creation is enabled, ask for a presentation and document, but save the text locally too. If you hit a limit, finish one named deliverable per fresh chat, paste the compact authority block into each and reconcile the four outputs manually.

**Paid difference or extension:** a paid Project may support more continuing work; extra models and capacity may reduce interruption. Use Cowork only if creating and organizing files across a granted folder removes a real bottleneck. Research is unnecessary here because browsing would introduce sources outside the approved pack.

**No equivalent:** Free has no Cowork or Claude Code. Neither is necessary for this proposal. The API has no subscription equivalent and should not be introduced merely to automate a job that happens once.

# 8. Projects, files and Artifacts: keep the right things together

A Project is useful when several chats need the same bounded truth. It is not a guarantee that every response used every file.

## Build a Project that can be inspected

Name it for the job: `Focus Friday proposal — eight-week pilot`. Add the approved brief, the redacted metrics file and the rough notes. Put the authority order in Project instructions. Do not add the private survey comments “for completeness.” Completeness is having everything necessary, not everything available.

At the start of a consequential chat, ask Claude to state which files it can see and what job each file performs:

```text
Before drafting, list the supplied filenames and classify each as controlling,
numeric evidence or unapproved notes under the Project authority rule. If a
named file is unavailable, stop and tell me which one is missing.
```

This does not prove perfect reading, but it exposes a missing source before a polished deliverable hides the gap.

## Retrieval is not the same as reading every page

Projects can use retrieval-augmented generation, usually shortened to **RAG**, when the knowledge set grows. That means Claude searches for relevant portions rather than loading every line at once. It can expand useful capacity, but the retrieved passage can still be incomplete or wrong for the question.

For important facts, name the file and section. Ask for the supporting excerpt. Open the original yourself. If the Project contains three policy versions, remove or label obsolete copies and state which one wins.

## A clean file rhythm

For a continuing job:

1. Preserve the original source files.
2. Make a redacted working copy if necessary.
3. Use filenames that expose role and date: `approved-brief-2026-09-04.md`, not `final-final-v7.md`.
4. Ask Claude to write new output files rather than overwrite sources.
5. Download and open every result.
6. Keep a short change note when the source or decision changes.

The habit comes from ordinary document control, not an AI ritual. Claude simply makes inconsistencies easier to multiply quickly.

## What belongs in an Artifact

An Artifact earns its place when the output needs its own editable view or interaction. For the proposal, a slide outline or one-page summary can be an Artifact. For a simple email, chat text may be clearer.

For an interactive Artifact, supply sample data and visible acceptance conditions:

```text
Create a small, local-only calculator Artifact for the Focus Friday budget.
Inputs: the three approved cost lines and reserve percentage.
Show subtotal, reserve, total and amount remaining under the maximum.
Do not connect to external services or store entered values.
Include a Reset control and an explanation when total exceeds the maximum.
Test the approved values: 600, 300, 120, 10%, maximum 1200. Expected total:
1122; expected remaining: 78.
```

Then test zero, blank, negative and over-budget values. Download the source where available. A colourful calculator that accepts `banana` as a budget and displays `NaN` in leadership plum is not finished.

**Applies to both:** bounded Project context, source labels, clean filenames and output inspection. **Free route or limit:** use up to the documented Free Project allowance and enabled Artifacts/file creation. **Paid difference or extension:** additional Project capacity and paid Artifact storage or integration may help continuing work. **No equivalent:** when shared storage or a paid integration is required, a local exported copy is an alternative deliverable, not feature parity.

# 9. Web search and Research: find the receipt, then read it

Use web search when the answer depends on what is true now: a current policy, product feature, law, price, office holder or release. Do not turn search on for a closed-source proposal whose brief forbids outside material.

## A Free search workflow

Suppose leadership asks, “Has Canadian federal guidance on meeting-free time changed?” The question is current and external. In a fresh Chat, write:

```text
Search the web for current Canadian federal government guidance that directly
addresses meeting-free focus time or workplace scheduling. Prefer official
government sources. Return a table with the exact claim, source title,
publisher, publication or update date, URL and a short supporting excerpt.
If no official source directly supports the claim, say NO DIRECT SOURCE rather
than substituting a consultancy blog. Do not revise the proposal.
```

Open every link. Check that the page is the named authority, the excerpt supports the sentence and the date fits the question. If the search finds nothing direct, that is useful. “No direct source found” is cleaner than a made-up federal blessing.

Anthropic warns that supplying a direct long URL on Free can pull the whole page into context and consume substantial capacity. Ask a narrow question, prefer the exact relevant page, and begin a fresh chat for the next task when the current one becomes bloated.

## Paid Research

Research can pursue a broader question across sources and return citations. Use it when a defined investigation needs breadth, not merely because the button exists.

Good Research brief:

```text
Research documented outcomes of meeting-free time pilots in organizations of
100–1,000 employees from 2024–2026. Separate controlled studies, organization
case reports and vendor claims. For each result, record the intervention,
sample, measured outcome, limitations and primary source. Do not generalize a
reported association into a causal claim. End with what evidence would be safe
to cite in an internal pilot rationale and what remains uncertain.
```

Bad Research brief: `Find proof that Focus Friday boosts productivity 20%.` It asks the system to shop for support rather than investigate the question.

Research remains paid-only in the current documentation. The Free alternative is a smaller, manually checked web-search sequence. It may take more human time but can still produce a reliable source card.

## Search does not settle authority

A vendor blog, government page, peer-reviewed study, personal post and news story do not become equal because Claude cited all five. State what kind of evidence the decision needs. A current primary source may control a feature claim; an independent study may be better evidence for an outcome; a practitioner may offer a method worth testing.

The useful habit comes from Elle Woods: do the reading. The reference earns its place because source inspection is the mechanism. The limit is obvious—real evidence work is not a courtroom montage, and a link can still be stale, misread or irrelevant.

# 10. Cowork: delegate a bounded file job, not your whole desktop

Cowork is helpful when the job needs several actions across a permitted set of files and the cost of manual handling is now the bottleneck. It is not simply “Chat but smarter.”

Imagine the leadership proposal has been approved by a human and you now need to assemble a review folder from **copies** of the final files. This is a different stage from drafting.

## The folder job

Starting folder:

```text
/Focus-Friday-review-copy/
  focus-friday-presentation.pptx
  focus-friday-one-page-summary.docx
  focus-friday-review-email.md
  approved-brief.md
  metrics-redacted.csv
```

Desired output:

```text
/Focus-Friday-review-output/
  01-presentation.pptx
  02-one-page-summary.docx
  03-email-draft.md
  evidence/
    approved-brief.md
    metrics-redacted.csv
  MANIFEST.md
```

Exact Cowork brief:

```text
Work only in the connected folder /Focus-Friday-review-copy and create a new
sibling folder /Focus-Friday-review-output.

Copy and rename the five listed files into the structure below. Do not alter
the contents of the presentation, summary, email, brief or CSV. Create
MANIFEST.md listing every source filename, destination filename, file size and
whether the copy completed. Do not delete, move or overwrite the originals.

Before acting, return the proposed file operations and any name collision.
Proceed only after approval. Ask before any overwrite or access outside the
connected folder. Do not email, upload, publish or connect another service.

After copying, compare the source and destination file sizes and, where the
surface supports it, file hashes. Report mismatches. Stop after returning the
manifest and exact output path.
```

Review the proposed operations before approval. Afterward, open the output folder and at least one file of each type. A manifest is evidence of what the agent reported, not independent proof that PowerPoint opens or the notes survived.

## Cloud and local reach

Current Cowork runs in cloud sandboxes by default. When it needs local files or computer control, the desktop app provides a connected route you grant. Closing the laptop can leave cloud-only work running; it removes access that depends on the local device. Treat this as a data-processing and permission decision.

## Safe autonomy

Give autonomy to reversible edges: creating a new output folder, renaming copies, generating a manifest. Keep approval for deletion, overwrite, external sending, publication, spending and broad account changes.

**Applies to both:** plan the operations, work on copies, use a manifest, inspect the result. **Free route or limit:** ask Chat to produce the exact folder plan and manifest template, then perform the operations yourself. **Paid difference or extension:** Cowork can execute the granted multi-step file work. **No equivalent:** Free Chat does not perform the Cowork agent loop or local file operations.

# 11. Claude Code: only when there is a repository

Claude Code belongs in an existing website, app or technical project. It is not the back door to better slides.

Here is a separate example. You own a small website repository. The Resources page contains a link to `/guide-old.html`; the replacement page already exists at `/claude-guide.html`. You want one bounded correction with verification.

## Starting context

```text
Repository: /projects/my-site
Known defect: the Resources page links to /guide-old.html.
Expected target: /claude-guide.html.
Allowed edit: resources.html only.
Required check: existing link checker, then search resources.html for both URLs.
Off-limits: deployment, package upgrades, unrelated formatting and all other
files.
```

## Exact Claude Code prompt

```text
In /projects/my-site, inspect resources.html and the existing link-check command.
First report the exact occurrence of /guide-old.html and confirm that
claude-guide.html exists. Do not edit until those two facts are confirmed.

Then replace only that link target in resources.html. Preserve the link text,
markup and unrelated formatting. Run the existing link check. Search the edited
file for /guide-old.html and /claude-guide.html. Return the diff and exact check
output.

Do not edit another file, install packages, commit, push or deploy. Stop after
the named checks pass or report the exact blocker.
```

## What to inspect

The expected diff changes one attribute. The link checker exits successfully. The old path has zero occurrences in `resources.html`; the new path has the expected occurrence. Open the page locally if the repository's own instructions require a browser check. Do not accept “fixed” without the diff and check output.

## `CLAUDE.md`: short rules that are always true

Claude Code loads project guidance from `CLAUDE.md` or `.claude/CLAUDE.md`; personal guidance can live in `~/.claude/CLAUDE.md`. A file called `AGENTS.md` is not automatically equivalent unless explicitly imported. Use `/context` to confirm what Code loaded.

Good project guidance is short and specific:

```markdown
# Project rules

- Public links use root-relative paths.
- Run `npm run check:links` after editing HTML links.
- Never deploy unless the user explicitly asks.
- Preserve unrelated working-tree changes.
```

Anthropic's current rule of thumb is to keep `CLAUDE.md` under 200 lines and move on-demand material elsewhere. Do not pack every historical edge case into the always-on file. Add a rule after a real repeated failure, test whether it prevents the failure, and remove it if it only adds noise.

## Skills: a reusable recipe

A Skill is a folder of instructions and resources for a recurring workflow. Project Skills live under `.claude/skills/<name>/SKILL.md`; personal Code Skills live under `~/.claude/skills/<name>/SKILL.md`. Account-enabled Skills in Claude Chat or Cowork are a different installation surface. A Skill installed in Code does not prove Chat can see it.

Create one after the manual workflow works more than once. A link-repair Skill might require the target page, allowed files, existing checker and stop condition. Inspect third-party Skills before installation because Skills can contain code or side effects. For a side-effecting Skill, Anthropic recommends disabling automatic model invocation so the user must trigger it.

## MCP: access to an outside system

MCP—Model Context Protocol—is a way for Claude to use an external data source or service through a connector. Use it when the job actually needs that system. It is access, not accuracy. A project-management connector can retrieve a ticket; it cannot guarantee the ticket is current or authorize a release.

Review credentials, requested scopes, available actions and the server you are trusting. Prefer read-only access when reading is enough. Remote MCP is not a tunnel into an internal network.

## Hooks: a deterministic event action

A hook runs an automatic command at a named point in the Claude Code lifecycle. It is useful for something that must happen mechanically, such as running a formatter after edits or blocking changes to a protected path.

A hook is stronger than writing “please remember to run the check,” but it can also be wrong or destructive. Inspect its command, test it with a deliberately failing case and keep judgment outside it. If a link-check hook has never rejected a broken link, it is theatre with an exit code.

## Subagents: isolate work that would flood the main context

A subagent can investigate an independent question while the main task retains its working context. Use one for a bounded repository search or independent review that can return a concise result. Do not spawn five reviewers for a one-link edit. State its input paths, output, off-limits areas and finish condition.

Subagents share or receive capabilities according to the product setup. They are not automatically independent, cheaper or safer. Reconcile their findings against the real files.

## Context and compaction

Context is the material available to the current response: prompts, files, instructions, tool results and conversation history. As it fills, performance can degrade and Claude Code may compact earlier work into a summary. Fable 5.1 guidance specifically notes compaction summaries and long-task behavior.

Before compaction or a handoff, preserve:

- the governing goal;
- exact acceptance conditions;
- authority order;
- files changed and files off-limits;
- checks already run and their results;
- unresolved blockers;
- the next exact action.

Do not treat a compact summary as the source of truth when the real file is available. Start a fresh task when the job changes. The large one-million-token context documented for paid Fable 5.1, Chat, Code and Cowork is capacity, not an instruction to upload the company drive.

**Applies to both:** a Free reader can use the same brief, diff, test and stop logic while making edits manually. **Paid difference or extension:** Claude Code can inspect and modify the repository and run checks under explicit permissions. **No equivalent:** there is no Free Claude Code execution surface. Chat advice plus human edits is not the same product.

# 12. The API: when the repeated process belongs inside software

Most readers do not need the API for their first useful Claude job. The API becomes sensible when a repeated process needs structured inputs, controlled model IDs, programmatic tools, logs, evaluations or integration with another system.

Suppose the Focus Friday proposal becomes a quarterly internal pilot template used by ten departments. A developer might build a tool that accepts an approved brief and aggregate CSV, validates required fields, sends a bounded request to Claude and stores the draft beside a deterministic evidence table. That is an API product decision, not a cleverer prompt.

## What changes in the API

You choose an exact model ID and supported parameters. You manage an API key and separate billing. Your software decides which tools are available, how outputs are stored and what happens on an error. You must build the permission, privacy, validation and recovery boundaries that the Claude app otherwise provides.

Current API model IDs include:

- `claude-haiku-4-5-20251001`
- `claude-sonnet-5`
- `claude-opus-5`
- `claude-fable-5-1`
- `claude-mythos-5-1` for approved Project Glasswing participants only

Model IDs, pricing and availability are volatile; copy them from the current official model page at implementation time. Do not paste an example key into source code, a public repository or a shared document. Use secure secret storage and a spend limit.

## Structured prompts are organization, not magic

For a long API prompt containing several documents, Anthropic recommends clear descriptive tags. Put long documents before the question so the model can work through the evidence before reaching the task.

```text
<documents>
  <document name="approved-brief.md" authority="controlling">
  ...
  </document>
  <document name="metrics.csv" authority="numeric-evidence">
  ...
  </document>
  <document name="rough-notes.md" authority="unapproved-ideas">
  ...
  </document>
</documents>

<instructions>
Create the four proposal deliverables. The authority labels control. Do not
promote an unapproved idea or expose personal data.
</instructions>

<output_requirements>
Return the requested structured fields and an evidence table. Mark unresolved
facts. Do not send or publish.
</output_requirements>
```

In ordinary Chat, headings and filenames are usually enough. XML tags are useful when structure is the problem; they are not a ceremonial spell.

## Evaluate cost per completed task

Token price is only one cost. Count retries, repair, tool calls, elapsed time and human inspection. A cheaper model that needs three repairs can cost more than a stronger model that passes once. A costly model that produces the same accepted result more slowly is not automatically better.

Build a small harmless evaluation set from real recurring jobs. Run identical inputs at candidate settings. Decide the acceptance checks before seeing the results. Record failures as well as wins.

## API privacy is not consumer-app privacy

API terms and retention can differ from consumer plans. Covered Models retain their 30-day requirement unless Anthropic expressly authorizes the eligible arrangement. Third-party cloud platforms add their own configuration and data path. Confirm the exact endpoint and contract rather than repeating “the API is not used for training” as though that settles every question.

**Applies to both Free and paid app users:** the source hierarchy and verification method transfer. **Paid difference or extension:** the API is separately billed developer infrastructure with exact model and parameter control. **No equivalent:** a Claude subscription is not API credit, and Free Chat is not a programmatic integration.

# 13. What the one LAiDIES Claude test did—and did not—show

LAiDIES ran one bounded workshop fixture on August 31, 2026 in Claude Code 2.1.225 using Sonnet 5 at Medium and High effort, authenticated through an existing Max subscription. Skills, memories, hooks and MCP were disabled. Only a writing tool was supplied; the complete source pack was pasted into the prompt. It was not a Free, Chat, Cowork, Fable, Opus or API test.

Both runs chose the eligible venue, calculated the correct CAD 529.10 total and created the required agenda and invitation. High used more reported output tokens—8,177 versus 6,400—and slightly more elapsed time—76.7 seconds versus 71.8—without changing the core decision.

Medium introduced an unsupported claim that dietary-needs collection was “not planned or budgeted” when the source said only that needs had not been collected. A later targeted repair improved the work but left residual attribution and causal wording. LAiDIES stopped rather than running retries until the evidence looked tidy.

That test shows three narrow things:

1. More effort did not materially improve this particular decision.
2. A correct total can sit beside an invented policy.
3. A targeted repair can improve the answer without making it perfect.

It does **not** prove Medium is generally better than High, Sonnet is better than another model, paid Claude is unreliable, or the proposal example in this book was tested. The source-policy lesson transfers, but the internal test scenario is not the reader-facing example.

# 14. Verification: make “done” observable

Claude responds well to a finish line it can check. You respond well to evidence you can inspect. Those are related but not identical.

## Four kinds of check

### Content checks

Does the result contain every required section? Are decisions, caveats and unresolved items present? For the proposal: exactly six slides, six note sections, one summary and one email.

### Source checks

Does every consequential claim map to the controlling source? Search for forbidden or stale phrases. Compare numbers to the spreadsheet and promises to the approved brief.

### Mechanical checks

Do calculations reconcile? Does the file open? Do links resolve? Does the code test pass? Mechanical success proves integrity, not quality.

### Real-use checks

Can the intended person read the slide? Does the Artifact work on a phone? Does the downloaded spreadsheet recalculate in the target software? Did the corrected website link work in the browser? Test the real surface, not only Claude's summary.

## Ask for evidence of the check

Weak:

```text
Double-check everything carefully.
```

Stronger:

```text
Recalculate each budget line and show the equation. Search all four outputs for
20%, company-wide, permanent, October 9 and guarantee. Count slide and matching
speaker-note sections. Return the results; do not say a file opens unless you
actually opened it.
```

The stronger prompt names evidence. It can still be wrong, so inspect the original and the real output.

## Establish a baseline before an agent changes anything

Simon Willison's 2026 agentic-engineering guidance recommends running the existing tests first and exercising the real interface. The practical value is simple: if a test fails before Claude edits, the agent should not claim it caused the failure. If the interface was already broken, you need that fact before judging the patch.

This is a named practitioner's method, not a universal benchmark. Adapt it where a baseline exists: open the current deck, run the current link check, calculate the current total, or capture the present state before a multi-step action.

## Inspect standing permissions

Ethan Mollick's July 2026 first-hand guide emphasizes checking the actions an agent is already allowed to take. Use that as a prompt to inspect the actual connector, browser, file and account permissions—not as proof that his preferred model or effort fits your job.

## Write the brief before the agent plan

Addy Osmani's January 2026 specification method reinforces the goal, context, constraints and done pattern. His practitioner account supports a useful process, not a product guarantee. A plan is helpful when it can expose a wrong approach; it is overhead for a one-line correction.

## Curate context

Anthropic engineering's context guidance recommends the smallest high-signal material and concrete examples, with more context added after a failure shows it is needed. That is an engineering method to test, not proof that fewer files always win. The deciding question is whether the necessary truth is present and easy to distinguish from noise.

# 15. Troubleshooting without starting over

## “Claude cannot see my file”

Confirm the filename appears in the current chat or Project. Ask Claude to list available files. Check upload completion and organization restrictions. If the file is huge, provide the exact relevant pages or a smaller redacted copy. Do not keep issuing prompts that assume access.

## “The answer ignored the approved brief”

Stop. Quote the exact controlling line, name the lower-authority conflict and identify every affected output. Use a targeted repair. If the same failure repeats, start a fresh chat with the authority order at the top and only the required sources.

## “Claude says it made a download, but I only see text”

Treat the complete text as the deliverable you have. Check whether code execution/file creation is enabled and available on this account. Ask Claude to state honestly whether a file was created. Never let a filename in a code block masquerade as a saved file.

## “The file exists but opens badly”

Open it in the target application. Check missing fonts, cropped slides, wrong page breaks, broken formulas and speaker-note placement. Give the exact visible defect and preserve unaffected content. If format fidelity matters more than generation, use the native application for the final correction.

## “I hit the Free limit halfway through”

Save the completed text and a compact handoff outside Claude:

```text
Goal: finish the Focus Friday proposal pack.
Authority: approved brief > metrics CSV > rough notes.
Completed and checked: slides 1–6 and speaker notes; budget total 1,122.
Still needed: one-page summary and DRAFT email.
Required consistency: three teams, eight weeks, 216 estimated meeting hours,
no 20% or permanent promise, start date unresolved.
Do not send, publish or claim approval.
```

Continue after the usage window resets or in a fresh chat. Reattach the necessary sources. Do not rely on the handoff as a replacement for the approved brief.

## “The conversation is too long and Claude is forgetting things”

Save the current accepted outputs. Start a fresh chat with the governing goal, authority order, exact current files, checks already performed and one next action. In Code, inspect `/context`; prune a bloated `CLAUDE.md`; move reusable procedures to Skills. Do not keep feeding reminders into a chat whose context is already full of obsolete drafts.

## “Research cites a source that does not say that”

Open the original. Quote the relevant passage. Correct the claim to the smallest supported statement or remove it. Ask Claude to inspect dependent occurrences. A citation error is a content failure, not a formatting issue.

## “Cowork wants broader access than expected”

Deny the request. Reframe the job around one copied folder or a read-only connector. If the narrower scope cannot complete the job, decide whether the extra access is worth it before proceeding. Do not click through because the task is already underway.

## “Claude Code changed unrelated files”

Stop the task. Inspect the diff. Preserve user work. Revert only with a safe, authorized recovery method and never wipe unrelated uncommitted changes. Narrow the allowed paths, restore from version control or a copy, and rerun the smallest relevant tests.

## “The model picker does not match this book”

Believe the account in front of you, then verify the current official plan and model documentation. Record the surface, plan, app version and visible options. Do not infer that a missing model should be available or that an API-only effort setting exists in Chat.

## “Fable answered as another model”

Anthropic documents that safeguards can block or route some protected cyber, biology, chemistry, life-science, distillation or frontier-development requests to another model. The picker label alone may not prove which model answered. Check the current disclosure. Do not run unsafe probes just to trigger fallback.

## “I need to undo memory”

Open Settings → Memory and inspect the relevant topic. Edit or delete a topic if that is enough. Pause stops use and new memory while retaining existing memories. Reset permanently deletes all memories, including Project memories, and cannot be undone. Choose the smallest correction.

# 16. Recovery: leave yourself a way back

Before a consequential job, preserve the original and choose an output path. After each accepted stage, save the exact result outside the chat. A conversation is not your archive.

For document work, keep:

- untouched source files;
- redacted working copies;
- accepted output files;
- a short record of source date and plan/surface/model where that matters;
- unresolved items;
- the last verified check.

For repository work, use version control, a copy or a bounded worktree. Inspect changes before commit. Tests and checkpoints make recovery possible; they do not make the change good.

For an external-action job, preserve a draft and require approval at the final boundary. “Prepare the email” and “send the email” are two different jobs. If the action target is wrong, stop before the click.

The stopping rule is part of the brief:

```text
Stop when the named deliverables exist, the acceptance checks pass and all
remaining unknowns are listed. Do not add research, redesign, reviewers,
messages, publication or adjacent improvements.
```

Stopping is not laziness. It prevents a finished proposal from becoming a surprise rebrand, a connector audit and six new folders because the model noticed spare afternoon.

# 17. Quick chooser

## I have only Claude Free

Start with Sonnet 5 in Chat. Use one bounded source pack. Use a Free Project when the job continues across chats. Use web search for current facts and inspect the links. Use file creation or Artifacts where enabled; otherwise request complete text. Save work outside Claude before limits interrupt you.

You do not have a documented Free equivalent for Research, Cowork or Claude Code. Manual handling is honest and often adequate.

## I need a polished document or presentation

Use Chat or a Project with the controlling brief, source files and exact format. Request editable files only if file creation is available, and always ask for complete text or an outline you can inspect. Open the real download. Check numbers, promises, notes, layout and export.

## I need current sources

Use web search in Chat for a narrow question. Use paid Research for a broader investigation if it removes a real bottleneck. In both, specify source types, dates and evidence. Open the originals.

## I need Claude to reorganize files

On Free, ask Chat for the plan and manifest, then perform the moves yourself. On paid, consider Cowork with one copied folder, no-delete rules, approval before overwrite and a final manifest. Inspect the folder.

## I need to change a website or app

If you have the repository, use Claude Code on an eligible paid route with exact paths, permissions, tests and a diff. If you do not, use Chat to understand the change and have the authorized owner implement it. Do not pretend a mockup is the live site.

## I need Claude inside my own product

Use the separately billed API with a developer. Protect the key, set spend limits, log model and version, validate inputs and outputs, and build permission and recovery controls. A consumer subscription is not API access.

## I am choosing effort

Use the surface default or lowest plausible setting first. Low for narrow, checkable transformations; Medium as a connected-work baseline; High after a named missed dependency or contradiction; xhigh or Max only after a lower run demonstrates the need. Haiku 4.5 does not support the same effort control.

## I am choosing a model

- **Sonnet 5:** Free/Pro default documented at launch; first choice for most readers and the central proposal.
- **Haiku 4.5:** fastest current model; narrow extraction and volume where exposed; no same effort ladder.
- **Opus 5:** complex multi-step or enterprise work when Sonnet has a measured gap; avoid redundant review rituals.
- **Fable 5.1:** paid-only demanding reasoning and long-running agents; inspect cost, retention, safeguards and access before use.
- **Mythos 5.1:** invitation-only Project Glasswing access for approved partners; not an ordinary consumer option.

## I am handling sensitive information

First ask whether it should enter the service. Use the approved workplace environment and policy. Minimize and redact. Check training, retention, memory, history and connector permissions separately. Do not use Fable 5.1 or Mythos 5.1 without accepting the current Covered Model retention boundary.

# 18. Compact index: where each thing belongs

| Thing | Meaning | Put it here | Do not confuse it with |
|---|---|---|---|
| Chat | One conversation with supplied context and tools | Questions, drafting, analysis, files, narrow search | Automatic access to your computer |
| Project | Continuing chats, instructions and knowledge for one job | Repeated proposal, monthly report, maintained source set | A guarantee every file was read |
| Artifact | Separate editable or interactive output | Document, code, diagram, calculator | Published or production-ready work |
| Research | Paid multi-step investigation | Broad current-source question | Truth or a Free feature |
| Cowork | Paid multi-step computer work | Bounded multi-file or connected action job | Claude Code or local-only execution |
| Claude Code | Repository/file/command agent | Existing website, app or technical workspace | Better general writing |
| API | Programmatic Claude access | Repeated software integration | Included subscription usage |
| Model | Trained component producing output | Task-fit selection when exposed | Surface, plan or permission |
| Effort | Reasoning intensity | Low through Max on supported Claude 5 models | Importance, length or hard spend cap |
| Memory | Topics carried across chats | Stable personal context you accept retaining | Current source authority |
| `CLAUDE.md` | Always-on Code project guidance | Short stable repository rules | Every procedure and edge case |
| Skill | Reusable workflow or knowledge | Stable repeated job | Enforcement or automatic safety |
| MCP | Connection to external service/data | Necessary external access | Accuracy or approval |
| Hook | Automatic lifecycle command in Code | Deterministic check or block | Human judgment |
| Subagent | Isolated investigation/workstream | Independent bounded lane | Ceremony or guaranteed independence |
| Context | Material available now | Only what the current job needs | Everything ever stored in the account |
| Compaction | Summary of older context | Continuity for a long task | The real source files |

# 19. Dated current-source appendix

The product facts below were checked from official sources on or before **September 6, 2026**. Practitioner methods are labelled separately. Recheck model, plan, pricing, permissions, data controls and UI labels before publication or a consequential purchase.

## Official Anthropic product and model sources

- [Get started with Claude](https://support.claude.com/en/articles/8114491-get-started-with-claude) — access surfaces, supported locations and age requirement; dated June 2, 2026.
- [Plans and pricing](https://claude.com/pricing) and [Choose a Claude plan](https://support.claude.com/en/articles/11049762-choose-a-claude-plan) — current plan structure, capacity framing and pricing. Prices can change and are not recommendations.
- [Introducing Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5) — Sonnet 5 availability across plans and Free/Pro default at launch; June 30, 2026.
- [Models overview](https://platform.claude.com/docs/en/models/overview) — Fable 5.1, Opus 5, Sonnet 5 and Haiku 4.5 roles, specifications and API availability; checked September 6, 2026.
- [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview) and [Mythos 5.1](https://platform.claude.com/docs/en/models/mythos-5-1/overview) — Mythos 5.1 Project Glasswing invitation-only boundary; September 1, 2026.
- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) — supported Low, Medium, High, xhigh and Max controls, defaults and distinction from hard budgets; checked September 6, 2026.
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), [Prompting Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1), and the current Sonnet 5 and Opus 5 prompting guides — model-specific behavior, long context, structure, targeted edits, progress and verification; checked September 6, 2026.
- [Fable models on your plan](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan) — paid-only Fable 5.1 access, weekly allowance and usage-credit rules; updated the week of September 6, 2026.
- [Covered Models](https://support.claude.com/en/articles/15425695-covered-models) and [data retention practices for Covered Models](https://support.claude.com/en/articles/15425996-data-retention-practices-for-covered-models) — Fable 5.1/Mythos 5.1 designation and 30-day retention requirement; checked September 6, 2026.
- [Fable fallback behavior](https://support.claude.com/en/articles/15363606-why-claude-switched-models-in-your-conversation-with-fable-5-or-fable-5-1) — protected-domain model routing boundary; checked September 6, 2026.
- [Memory and chat search](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context) — current memory defaults, topics, Project separation, sensitive-topic control, pause/reset and Incognito boundary; checked September 6, 2026.
- [Personalization features](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features) — profile instructions, Project instructions and Styles; dated July 10, 2026.
- [Incognito chats](https://support.claude.com/en/articles/12260368-use-incognito-chats) — history, memory, training, retention and organization-export limits; dated July 16, 2026 in the research packet.
- [Create and edit files](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude) and [Artifacts](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) — file creation, downloads, Artifact behavior and account boundaries.
- [Projects](https://support.claude.com/en/articles/9517075-what-are-projects), [manage Projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) and [Project RAG](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects) — Project access, management, memory and retrieval.
- [Web search](https://support.claude.com/en/articles/10684626-enable-and-use-web-search) and [Research](https://support.claude.com/en/articles/11088861-use-research-on-claude) — search controls, Free context cost and paid Research boundary.
- [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) and [Cowork architecture](https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview) — paid beta, cloud execution, desktop-mediated local reach and permissions.
- [Claude Code features](https://code.claude.com/docs/en/features-overview), [best practices](https://code.claude.com/docs/en/best-practices), [memory](https://code.claude.com/docs/en/memory), [Skills](https://code.claude.com/docs/en/skills) and [permission modes](https://code.claude.com/docs/en/permission-modes) — repository work, instructions, extensions, verification, context and permission boundaries.
- [Custom remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp), [connector surfaces](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors) and [Google Workspace connectors](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors) — access, plan, network, permission and privacy distinctions.
- [Usage-limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices) and [usage credits](https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans) — variable capacity, caching, separate credit spending and current Settings route.

## Named practitioner and engineering methods

- [Simon Willison, “First run the tests”](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/) and [agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/) — baseline and real-interface checks, reopened September 1, 2026. First-hand method, not a Claude benchmark.
- [Addy Osmani, “How to write a good spec for AI agents”](https://addyo.substack.com/p/how-to-write-a-good-spec-for-ai-agents) — concise specification and bounded planning; January 19, 2026. Practitioner method, not a product guarantee.
- [Ethan Mollick, opinionated guide](https://www.oneusefulthing.org/p/an-opinionated-guide-to-which-ai-b22) — inspect standing agent permissions; July 23, 2026. His model preferences are opinion, not adopted fact.
- [Anthropic Engineering, effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — high-signal context and examples; September 29, 2025. Engineering guidance, not proof that one recipe wins every job.
- [How Anthropic teams use Claude Code](https://claude.com/blog/how-anthropic-teams-use-claude-code) — internal first-hand methods for context, checkpoints, tests and reversible work; July 24, 2025. Historical team experience, not a current universal success rate.
- [Simon Willison, “Helping people write code again”](https://simonwillison.net/2026/Jan/4/coding-again/) — the human as manager who specifies, supplies context and reviews; January 4, 2026. Useful framing, not controlled evidence.

## LAiDIES evidence and its limit

The preserved August 31, 2026 Sonnet 5 workshop run supports only the bounded observations in Chapter 13. The central Focus Friday proposal is constructed teaching material. No Claude Free account, paid Chat, Research, Cowork, Fable 5.1, Opus 5, Mythos 5.1, current picker/default, connector, ordinary Artifact or API workflow was tested for this manuscript.

## Recheck triggers

Reopen the affected official source when any model name, default, effort level, plan entitlement, price, context limit, Project allowance, permission system, connector, Skill location, retention rule, fallback behavior or Settings label changes. Recheck all volatile cards immediately before this manuscript enters formal review or publication.

# A final working rule

Start with the job. Give Claude the smallest complete truth. State which source wins. Let the surface do only what you intended. Inspect the decision-changing details. Correct the exact failure everywhere it appears. Save the accepted work. Stop before a draft quietly becomes an action.

That is not cautious AI theatre. It is how you turn speed into useful work while keeping your judgment in the room.
