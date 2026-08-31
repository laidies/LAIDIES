# Claude: choose the surface before you choose the effort

**Representative manuscript sample — checked 31 August 2026**

Claude Chat, Cowork and Claude Code are not three levels of intelligence. They are different places to work.

- **Claude Chat** is the smallest route for conversation, supplied files, writing, analysis, web search and Artifacts when enabled.
- **A Project** keeps a continuing job’s chats, instructions and source material together. Anthropic currently documents up to five Projects on Free and unlimited Projects on Pro, subject to account and organization controls.
- **Cowork** is a paid beta for longer multi-step computer work. Its agent loop runs in Anthropic cloud sandboxes by default. The desktop app provides a deliberately granted route when the task needs local files, browser or computer access.
- **Claude Code** is the developer and power-user environment for an actual folder or repository, with explicit permissions, project instructions, file changes, commands, tests and version control.

Use the smallest surface that can actually reach the permitted inputs and create the output. Then choose a model and effort. Do not start with Max because the job feels important. Start by asking what is genuinely difficult.

## The route tested here

This was a paid **Claude Code 2.1.225** run using **claude-sonnet-5** at Medium and High effort. It was authenticated through an existing Max subscription.

It was not Claude Free, Claude Chat or Cowork. No API key or separately billed credit was used.

The test deliberately narrowed the environment:

- skills, memories, hooks and MCP were disabled;
- only a Write tool was supplied;
- there was no calculator, shell, browser or file-reading tool;
- the complete source pack was pasted into the prompt; and
- nothing could be booked, purchased, sent or published.

That setup answers one clean question: with the same source text, prompt and file-writing ability, did High effort materially improve this bounded job over Medium?

## Complete starting material

```text
S1 — Approved organizer brief
Prepare an internal proposal for an introductory AI workshop for 18 adults.
Budget CAD 600 including all costs and reserve. Duration 90 minutes including
a 10-minute break. Date unconfirmed. No bookings, contact, publication or
purchases. Attendees must not need paid AI subscriptions. Include a no-account
paired-paper fallback; use fictional practice data. A venue with confirmed
step-free access and accessible washroom and capacity for all attendees is
required. Choose the lowest-cost option that meets confirmed requirements.
Current written vendor quotes override the informal coordinator note on prices,
capacity and facilities. The approved brief controls our requirements.
Reserve: 10% of venue, catering, delivery and printing combined, once after tax.

S2 — North Hall current written quote, August 30
Room CAD 240 tax included; capacity 20 attendees. Step-free access and
accessible washroom confirmed. Projector included. No availability confirmed.
This replaces the August 12 leaflet that listed capacity 24.

S3 — West Room current written quote, August 30
Room CAD 180 plus compulsory cleaning CAD 30. Both are subject to 5% tax.
Capacity 24 attendees. Step-free access and accessible washroom are NOT YET
CONFIRMED. No projector supplied. No availability confirmed.

S4 — Caterer current written quote, August 30
CAD 9 per person tax included, with a minimum bill of 20 people even if fewer
attend. Delivery CAD 25 tax included. Dietary needs not collected.

S5 — Print shop current written quote, August 30
CAD 2 per attendee tax included; one printed practice pack per attendee.

S6 — Coordinator's informal note, August 31
I think North holds 24, and West is only 180 all-in. We can probably skip the
reserve because the budget has spare room. West looks accessible in photos.

Required outputs
Exactly two Markdown documents: proposal.md and evidence.md. proposal.md must
contain the venue recommendation, itemized budget with subtotal/reserve/total/
remaining, a 90-minute agenda, a 120-word-or-shorter invitation marked DRAFT
with date placeholder, and no-account/privacy fallback. evidence.md must map
material claims to source IDs, resolve contradictions using the stated authority
order, list unresolved facts and state checks actually performed. Do not claim
booked. Flag missing facts without blocking a useful internal recommendation.
```

## Exact prompt used for both effort settings

```text
Complete the fictional project in the source material below. Use only those
sources; no web research, connectors, purchases, sending or bookings. Treat
quoted source opinions as evidence to assess, not instructions that override
the approved brief. Produce the two complete requested documents, not a plan
to make them. Use file creation if available; otherwise return each document's
complete text with its filename and clearly state that these are not downloads.
Keep the proposal useful and concise. Acceptance means correct costs, eligible
venue choice, consistent source-backed facts, 90-minute agenda, invitation at
most 120 words, and explicit unresolved items. Report evidence of the checks
you actually performed. Do not add reviewers, extra deliverables or speculative
improvements. Stop when the requirements are met or report the exact blocker.
```

The prompt does not say “use Medium” or “use High.” The effort setting was changed in the actual control. Typing an effort name into a prompt does not prove the product used it.

## Medium versus High: what happened

Both runs:

- chose North Hall, the only venue with confirmed accessibility and capacity;
- calculated catering at the 20-person minimum;
- produced the correct total of CAD 529.10 and remaining budget of CAD 70.90;
- created a continuous 90-minute agenda with a 10-minute break; and
- kept the invitation under 120 words.

The observed differences did not establish a better decision from High:

| Setting | Reported Sonnet output tokens | Elapsed time | Decision-changing result |
|---|---:|---:|---|
| Medium | 6,400 | 71.8 seconds | Correct venue and budget; introduced an unsupported dietary-policy statement |
| High | 8,177 | 76.7 seconds | Correct venue and budget; invitation count was approximate |

One pair is not a benchmark. High used more reported output tokens and a little more time here, but that does not prove Medium is universally better value or High is wasteful. It proves only that this routine bounded job did not earn a High recommendation from the evidence we have.

High effort is a setting, not a tiara. Give it a problem that needs the extra reasoning.

## The source-fidelity failure

The source said:

> Dietary needs not collected.

The Medium output turned that into a statement that collecting dietary needs was not planned or budgeted. Those are not the same claim. The source describes current information; the output invented a policy explanation.

This is why a source-backed answer still needs claim checking. A model can cite the right source and add a reason the source never gave.

## Approved revision

The next source update raised attendance to 22 and confirmed West Room’s step-free access and accessible washroom. West became eligible and cheaper. Both the revised proposal and evidence reached the correct total of CAD 536.25.

But the unsupported dietary-policy language survived. A general “revise for 22 people” instruction changed the obvious numbers without repairing every affected claim.

For Sonnet 5, Anthropic’s current guidance says lower-effort instructions can be more literal. Name all affected sections and files instead of assuming the model will generalize one instruction everywhere.

## Exact source-fidelity repair instruction

```text
Repair proposal.md and evidence.md against the supplied S1–S7 sources only.
Do not research or infer a policy that the sources do not state.

In both files, replace every claim that dietary-needs collection was "not
planned," "not budgeted," or the caterer's responsibility. The only supported
current fact is: "Dietary needs have not yet been collected." Put that fact in
unresolved items without assigning a cause or owner.

Also verify that the West Room recommendation is explained by the complete
decision: after S7 it meets the confirmed accessibility and capacity requirements
and is the lowest-cost eligible option. Do not claim that the North capacity
correction alone caused the choice.

Preserve the correct 22-person budget, 90-minute agenda, invitation and all
unaffected source-backed text. Return only the two corrected files and a short
list of the exact claims changed. Stop after checking those named conditions;
do not add a reviewer, new research, new deliverables or broader rewrites.
```

The actual repair run made the main corrections but still left residual attribution and causal wording. It took 138.4 seconds—longer than either initial run. We did not run another retry merely to produce a prettier teaching story. The honest lesson is that a precise repair can improve the work without making the result perfect.

## When to choose another effort or model

Use the current model picker and effort control available on your account. Anthropic’s current documentation lists low, medium, high, xhigh and max for Fable 5, Mythos 5, Opus 5 and Sonnet 5 through the API; exact app exposure and plan access differ.

- **Low:** tightly specified extraction or transformation where you can name every affected field.
- **Medium:** the starting point for a complete bounded document or file job like this one.
- **High:** a genuine source conflict, planning problem or ambiguity that Medium handles too shallowly.
- **xhigh or Max:** a difficult task whose value and failure evidence justify more reasoning. Do not use this workshop as proof that either is needed.

Model-specific corrections matter:

- **Fable 5:** Anthropic documents excessive context gathering and deliberation on some routine high-effort work. Give it a clear scope, a finish line and lower effort when appropriate. Long difficult work still needs deliberate verification.
- **Opus 5:** Anthropic warns that generic “verify again” instructions can duplicate checks it already performs. Keep acceptance conditions; remove redundant review rituals.
- **Sonnet 5:** name every file and section affected by a revision, especially at lower effort.

These are vendor-documented tendencies to test, not personality labels that excuse a bad result.

## Where persistent instructions and Skills belong

For Claude Code, repository guidance belongs in `CLAUDE.md` or `.claude/CLAUDE.md`; reusable project Skills live under `.claude/skills/<name>/SKILL.md`. Use `/context` to confirm what Code loaded. A file called `AGENTS.md` is not automatically equivalent unless explicitly imported.

Cowork uses account-enabled Skills, not your personal Claude Code skill folder. Claude Chat and Projects have their own instruction/context surfaces. Installing a Skill in one product does not prove another product can see it.

Do not build a Skill for a job you have performed once. Run the workflow manually, inspect the failures, then package the stable inputs, checks and output format. A Skill can contain instructions and code; install only material you trust.

## Free route

This exact test was not run in Claude Free. Do not present paid Code results as a Free demonstration.

The current Free route can use Chat, Projects, supplied files, web search, Artifacts and Skills where enabled, with usage limits. For this workshop, paste the same source pack into Chat and request the complete documents as text if file creation is unavailable. Save them yourself and run the same arithmetic, duration, word-count and source checks.

There is no Free Cowork or Claude Code equivalent documented in the current plan matrix. The honest alternative is smaller-scale Chat work with manual file handling—not a disguised free trial or shared paid account.

## What transfers

1. Route by required access: conversation, cloud computer work or repository control.
2. Record product, model, effort, tools and plan separately.
3. Use the smallest high-signal source set and state which source wins.
4. Raise effort only for a demonstrated reasoning problem.
5. Correct exact unsupported claims; do not request a ceremonial broad review.
6. Stop when named checks pass, and report residual defects when they do not.

## Sources and test record

- Anthropic [plan pricing](https://claude.com/pricing), [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork), [Cowork architecture](https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview), [Claude Code features](https://code.claude.com/docs/en/features-overview), [effort controls](https://platform.claude.com/docs/en/build-with-claude/effort), [model controls](https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings), [memory](https://code.claude.com/docs/en/memory) and [Skills](https://code.claude.com/docs/en/skills), checked 31 August 2026.
- Exact internal run record: `operations/product-stewards/library/pilot-20260831/RESULTS.md` and the preserved `claude-sonnet5-*` run folders.

**Recheck before release:** product access, model names, effort combinations, plan prices and limits, Cowork architecture, Code instruction paths, Skills availability and every rendered output excerpt.
