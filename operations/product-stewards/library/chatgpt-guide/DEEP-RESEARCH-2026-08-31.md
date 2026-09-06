# ChatGPT guide — deep research

Checked 2026-08-31. INTERNAL RESEARCH, not a manuscript, product endorsement or
publication approval. Official pages and first-hand practitioner accounts were
opened; no new account was created, subscription purchased or example run in
a Free/Plus/Pro comparison. Current documentation is evidence of documented
behavior, not proof of a particular reader's enabled account.

**Operating-guidance refresh, 2026-09-01:** OpenAI's current Codex best-
practices and GPT-5.6 model guidance were reopened. The maintained cross-guide
practical synthesis is `../CURRENT-PRACTICAL-GUIDANCE-2026-09-01.md`.

The current official operating pattern is useful because it is concrete:

- brief the job with goal, relevant context, constraints and “done when”;
- plan first when the approach is uncertain or several connected changes are
  involved, but skip planning overhead for a one-step reversible correction;
- put stable repository rules and verification commands in a short `AGENTS.md`,
  adding rules from repeated observed friction rather than speculation;
- give the agent an observable way to verify its work and inspect the actual
  artifact or behaviour, not only its completion summary;
- define allowed local actions separately from external, destructive, costly or
  scope-expanding actions that need confirmation;
- turn a repeated stable workflow into a narrowly triggered Skill, and connect
  only the external systems that remove a real manual loop; and
- for GPT-5.6 API work, treat model, effort, Pro execution mode and subscription
  as separate choices. Medium is the balanced effort baseline; compare one
  level lower and raise effort only for a measured quality gain. Pro mode is
  not the ChatGPT Pro plan.

Sources: [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
and [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model),
living documentation checked 2026-09-01. These are official product methods,
not a ChatGPT-versus-Claude winner or proof of every account's controls.

## What changes the book

The legacy `content/library-books/tool-chatgpt.md` is not a current guide.
Its broad claim that a research specialist beats ChatGPT and its old product
framing cannot be carried forward as fact. The successor needs output-led
workflows, an explicit free track, real project context, and a clear distinction
between drafting, executing, reviewing and publishing.

OpenAI now describes Chat, Work and Codex as overlapping experiences, not three
intelligence levels. Chat serves questions and back-and-forth; Work is oriented
to completed deliverables; Codex exposes developer controls and implementation
details. Codex also supports knowledge work. Tool access and execution location
matter more than the label. [O1]

## Evidence key and source policy

- DOCUMENTED: current vendor page establishes a feature, boundary or price.
- FIRST-HAND: identified practitioner describes their own work; not a benchmark.
- ADAPTATION: our proposed beginner version, not an externally proven result.
- UNRESOLVED: contradictory, inaccessible or account-dependent information.

Provider marketing is not independent evaluation. A creator's successful demo
does not establish reliability across users. Our source selection favors
published original artifacts, reproducible methods and explicit limitations,
not audience size. Older advice is retained only when the mechanism still fits
current documentation; old UI instructions and prices are not reused.

## Current product and access map

| Question | Finding and book treatment | Evidence |
|---|---|---|
| Must a reader pay to try agentic work? | The current pricing page lists Work and Codex within Free, Go, Plus, Pro and organizational plans. Free is a limited entry route, not full parity. Do not repeat the February launch's temporary-access wording as today's entitlement. | O2 |
| What does paying change? | The page displays Free $0, Go $8/month, Plus $20/month and Pro from $100/month, with 5x/20x usage tiers. These are displayed prices, not a Canadian tax-inclusive quote. Recheck checkout/currency before print. | O2 |
| Is the API included? | API-key use is separately usage-billed; it does not provide every subscription/cloud feature. A paid ChatGPT subscription is not an API credit balance. | O2 |
| Is one message a fixed amount of work? | No. Task size, context, model, effort and tools affect usage. Work and Codex share usage. Budget by bounded deliverables and inspect the account meter. | O2 |
| Which model/effort? | Current docs list GPT-5.6 Sol, Terra and Luna. Their vendor positioning differs by capability/cost. Start at default effort and increase for a demonstrated need, not automatically on every task. Availability differs by surface. | O3 |
| Cloud or local? | Cloud uses hosted resources; local tasks can access permitted computer resources. Web Work cannot directly see local folders simply because the user owns them. | O4 |
| What is a project? | A project groups related sources, instructions and chats. A local project can bind folders; a web project is not automatic local filesystem access. Separate distinct deliverables into chats within the project. | O5 |
| Is memory reliable permanent storage? | ChatGPT web memory and local Codex memory are distinct. Required decisions belong in maintained source files/instructions, not memory alone. Local memory may update later and has separate controls. | O6 |
| Can it deliver real files? | Documentation covers creation and review of documents, slides, spreadsheets, PDFs and supported HTML previews. Name the output type and inspect the result in its actual viewer. | O7 |
| Can it search current information? | Yes where enabled. Current-information requests should use live sources; local Codex may use cached search by default. Search and command-network permissions are separate. | O8 |
| Are paid personal plans automatically private? | No. Individual ChatGPT/Codex content may train models unless opted out. Feedback can still share the associated conversation; Codex full-environment training has separate settings. Business/API defaults differ. | O14 |
| Can Free publish a hosted Site? | Not established. Feature-specific Sites docs list Plus/Pro/Business/Enterprise/Edu; the pricing matrix conflicts by marking Plus/Pro unavailable. Preserve this conflict; do not promise Sites eligibility until resolved. | O2, O9 |

**Free-specific documentation, checked today:** OpenAI's Free FAQ lists GPT-5.6
Luna, web search, data analysis, uploads, image generation, existing GPT use and
500 MB Library storage. It describes everyday text chats as unlimited subject
to safeguards, while tools have separate limits. Think is mobile-available and
rolling out on web. New GPT creation/publishing is unavailable on personal
Free/Go/Plus/Pro accounts; organizational creation depends on permissions. These
are documented entitlements, not account-tested observations. Exact numeric
tool quotas are not supplied; use the in-product limit/reset notice. [O13]

Temporary Chat does not create memories or train models; OpenAI's privacy
explanation states 30-day safety retention. Turning off training does not mean
zero retention or permission to upload confidential work. Connected services
have their own data boundaries. [O15]

## Experienced-user and developer techniques worth adapting

All techniques below are researched, not tested by this task. They are not
ranked as universally best.

| Practitioner/source | Concrete technique | Free adaptation / paid extension | Failure or limitation |
|---|---|---|---|
| Ethan Mollick, July 23 2026 guide, current retrieved text [E1] | Inspect existing action permissions before delegating. His similar requests produced a draft in one system and an actually sent email in another because prior permissions differed. | Free: draft from pasted non-sensitive text. Paid/connected: retain review before sending and inspect the recipient. | A prompt saying draft is not a substitute for checking standing tool permissions. His observations do not establish product-wide quality rankings. |
| Jason Liu, OpenAI-hosted long-running-work guide [E2] | Keep an ongoing workstream in a durable task and make important context inspectable outside conversational history; steer when requirements change. | Free: short project note containing accepted decisions and exact next action. Paid: longer runs and recurring work only when justified by value. | Long context costs more. A memory vault described by one creator is not automatically a universal product feature. Vendor-hosted account, not independent trial. |
| Ryan Lopopolo, OpenAI engineering case study, February 2026 [E3] | Give the agent a small map to maintained project knowledge; provide executable feedback instead of a giant instruction manual. | Free: a short brief, one good exemplar and a compact checklist. Paid: connect current project sources and automate narrow checks. | The original autonomous development environment required substantial engineering. Do not transplant auto-merge or reduced blocking review into a beginner's project. |
| Simon Willison, February 24/28 2026 [E4] | Establish the existing test baseline before changing software. | Free: ask the agent to discover and run available tests on a tiny local project if execution is enabled. Otherwise record that tests were not run. | A generated test file is not an executed test. Existing failures must not be blamed on the new change without evidence. |
| Simon Willison, March 6 2026 [E5] | Exercise the actual interface or API as well as automated tests. | Free: use a small local output and inspect add/edit/save/reopen behavior. Paid: browser-capable agent can perform and report the same journey. | Passing tests may still miss a blank page or broken button. A screenshot is not proof of saved state. |
| Addy Osmani, January 13 2026 [E6] | Have the agent help turn an idea into a short, reviewable specification; deliver in bounded pieces with acceptance conditions. | Free: produce and save one-page requirements before using scarce generation quota. Paid: same method with execution and project files. | His code-oriented specification is not a compulsory bureaucracy for a simple letter. Transfer the method, not every engineering field. |
| Addy Osmani, January 4 2026 [E7] | Keep changes small, preserve checkpoints and bring relevant examples into context. | Free: keep v1 before revising v2. Paid: use supported version/review controls. | Neither a second model nor a confident self-review proves correctness; inspect the actual change. |

The strongest converging lesson is not a secret prompt: give an exact job,
relevant sources, bounded authority and a way to observe success. OpenAI's
current prompting guidance independently supports outcome, context, format,
boundaries and targeted follow-up. It explicitly does not require a rigid
formula. [O10]

## Three paired workflows for production testing

These are research-derived trial designs, not finished example prompts.

1. **Notes to a proposal and deck.** Free: use a short, non-sensitive source
   pack; draft the proposal and slide-by-slide content; paste into an existing
   editor if file generation is unavailable. Paid: create editable files using
   supported Work tools. Both must trace names/numbers to the source and inspect
   the exported file. Upgrade only if file handling or volume removes a real
   bottleneck. No invented citations or claim that a slide outline is a deck.
2. **Budget tracker.** Free: small sample data, proposed columns and formulas,
   then check them in a free spreadsheet application. Paid: generate an editable
   workbook and run calculation checks. Test blank rows, zero income, changed
   inputs and totals. A nicely formatted screenshot is not a functioning sheet.
3. **Small interactive tool.** Free: request a bounded local HTML prototype
   without personal data, accounts or external services; execute it if the
   available environment permits, otherwise explicitly mark execution missing.
   Paid: use the same acceptance cases with richer tool access. Hosting is a
   separate decision and may add cost. Test persistence, mobile use and errors
   before saying it works; do not promise production security from a demo.

## Prompt guidance to include, reject and test

Include a starting prompt, a targeted revision prompt and a verification
request for each job. Show which part of the prompt specifies the output, which
supplies facts and which limits actions. Demonstrate how to reduce scope when
a quota is reached. Put critical facts in the current source pack, not solely
in a remembered conversation. Use ordinary language before technical syntax.

Reject: universal 'act as an expert' incantations; requests to reveal hidden
reasoning; unlimited retry loops; automatic maximum effort; agents checking
themselves as sole evidence; 'continue until perfect'; giant undifferentiated
context dumps; suggestions to evade free-tier limits or share paid accounts.
Request a concise rationale, sources and observable checks instead.

Our adaptation should not repeat Mollick's recommendation of advanced models
for high-stakes medical/legal questions as sufficient safety. Professional
review and appropriate boundaries remain necessary; this is a tool guide,
not clinical or legal advice.

## Contradictions and release holds

1. **Sites plan conflict:** current feature page and pricing table disagree.
   Use a visibly qualified research note, not a definitive entitlement chart.
2. **Free feature depth:** the Free FAQ supplies capabilities, not every numeric
   tool quota. Account observation remains necessary; no quota should be
   inferred from Plus or from launch announcements.
3. **Model defaults:** pricing mentions Sol cloud usage while the model page
   exposes surface-specific choices. Explain availability, not a universal
   default across every account.
4. **Privacy:** training defaults and Temporary Chat are sourced below; exact
   connected-app policies, regional differences and the reader's settings still
   need review. Full-environment Codex controls must not be overlooked.
5. **Expert demonstrations:** no observed beginner trials, matched Free/Plus/Pro
   outputs or cost measurements are present. No 'tested by LAiDIES' label.
6. **Latest is a date, not a promise:** reopen plan and release pages before
   manuscript admission and again before public release. Publication dates
   below are separate from today's check date; pages can change in place.

## Source register — opened 2026-08-31

### Model-specific operating recipes — scope expansion

Checked 2026-08-31. This addendum specifies trials; it does not report measured
model performance. Do not merge ChatGPT Chat, Work, Codex and API controls into
one fictional picker.

| Choice | Verified distinction | Proposed trial, not a measured winner |
|---|---|---|
| GPT-5.6 Luna | Clear, repeatable work; lowest-cost family member | Extract workshop expenses into a fixed schema, with exact source-row references |
| GPT-5.6 Terra | Balanced everyday work | Assemble the expense data and agreed policy into a practical workshop pack |
| GPT-5.6 Sol | Complex, ambiguous work and polish | Reconcile conflicting workshop requirements or build/test the interactive version |
| Light / Low | Light is the documented desktop/Work/IDE label; Low is CLI wording | Bounded extraction; explicit fields, missing-value rule and a small check |
| Medium | Balance of depth and speed | Complete pack with specified deliverables and acceptance checks |
| High / Extra High | More demanding planning/analysis | Resolve a documented conflict; explain decision evidence, not hidden reasoning |
| Max | More single-task reasoning; may need enabling | Compare only on a genuinely hard case where the lower setting fails |
| Ultra | Uses subagents; not merely more serial thinking | Independent workstreams with owned outputs and a reconciliation step; not a default for this small pilot |

Source: [Models](https://learn.chatgpt.com/docs/models). Exact selectable
model/effort combinations and entitlements still require per-account checks.
This documentation describes Work/Codex surfaces; it is not proof that ordinary
Free Chat exposes the same controls. It also announces GPT-5.4/mini retirement
from ChatGPT-authenticated Codex on August 31, 2026, while API-key access is
unaffected. Do not recommend retired choices merely because an older local
configuration still lists them. Retain a migration sidebar, not an active recipe.

The API separately documents `none`, `low`, `medium`, `high`, `xhigh`, `max`;
Pro execution mode is independent of effort, not proof of a ChatGPT Pro-plan
feature. Avoid equating API `none`, app Light, a subscription called Pro and
Ultra. Source: [GPT-5.6 guide](https://developers.openai.com/api/docs/guides/latest-model).

**Prompt adaptation:** Give Luna a narrow schema and explicit handling of
unknowns; give Terra the complete bounded outcome; give Sol the real ambiguity,
evidence and finish line. These are editorial starting hypotheses to compare,
not claims that a smaller model cannot do the larger job. Raising effort does
not require a longer prompt. OpenAI recommends removing redundant instructions,
retaining constraints and stopping conditions, and testing a familiar task at
the same effort and one level lower. Preserve essential validation. Source:
[GPT-5.6 prompting](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6.md).

**Where the context belongs:** Persistent local Codex rules go in the project's
`AGENTS.md`; reusable procedures can live in `.agents/skills/<name>/SKILL.md`.
Project sources, one-job attachments, memories, skills and external connectors
have different jobs. A skill's instructions do not themselves grant tool access
or enforce permissions. Start with relevant existing capabilities; installing
more skills is not a quality measure. Source:
[Customization](https://learn.chatgpt.com/docs/customization/overview).

A web ChatGPT project carries uploaded/connected sources and project
instructions; it does not automatically read a local folder. In a local
multi-folder project, automatic guidance discovery starts from the primary
folder, not all secondary folders. The example must show the actual destination
and confirm which files were read; merely naming a file is insufficient.
Source: [Projects](https://learn.chatgpt.com/docs/projects).

**Full-example production input:**
`../MODEL-SPECIFIC-EXAMPLE-PILOT-2026-08-31.md` holds the exact fictional inputs,
reusable rules, initial/follow-up prompts, reference calculations and comparison
method. The actual product output, elapsed usage and Free/paid runs remain open.

Official living documentation unless a date is stated. 'Undated' means no
publication/update date was established in the fetched text, not that the page
was published today.

- O1 — [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt), undated.
- O2 — [Pricing, Work/Codex access and usage](https://learn.chatgpt.com/docs/pricing), undated; historical promotions on this page are not current offers.
- O3 — [Models and effort](https://learn.chatgpt.com/docs/models), undated.
- O4 — [Work overview and execution boundaries](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview), reopened in this research pass; current Work guide below corroborates local/cloud distinction.
- O5 — [Projects and chats](https://learn.chatgpt.com/docs/projects), undated.
- O6 — [Memories](https://learn.chatgpt.com/docs/customization/memories), undated.
- O7 — [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer), undated.
- O8 — [Web search](https://learn.chatgpt.com/docs/web-search), undated.
- O9 — [Sites](https://learn.chatgpt.com/docs/sites), undated, public beta.
- O10 — [Prompting](https://learn.chatgpt.com/docs/prompting), undated.
- O11 — [Get started with Work](https://learn.chatgpt.com/docs/get-started-with-work), undated.
- O12 — [Permission profiles](https://learn.chatgpt.com/docs/permissions), undated, beta; profiles govern local commands, not all external tools.
- O13 — [ChatGPT Free Tier FAQ](https://help.openai.com/en/articles/9275245-using-chatgpts-free-tier-faq), living help page checked today; relative update label not converted into a publication date.
- O14 — [How your data is used](https://help.openai.com/en/articles/5722486-chatgpt-privacy-policies), living help page checked today; personal/business defaults, feedback and Codex environment controls.
- O15 — [ChatGPT privacy explanation](https://openai.com/index/how-chatgpt-protects-privacy/), May 6 2026, including Canadian reader note; training controls and Temporary Chat retention.
- E1 — [Ethan Mollick, An opinionated guide to which AI to use to do stuff](https://www.oneusefulthing.org/p/an-opinionated-guide-to-which-ai-b22), July 23 2026 per archive; current retrieved text may incorporate updates. First-hand educator/power-user account; no universal benchmark.
- E2 — [Jason Liu, Codex-maxxing for long-running work](https://cdn.openai.com/pdf/8a9f00cf-d379-4e20-b06f-dd7ba5196a11/OAI_WhitePaper_Codex-maxxing26.pdf), 2026 vendor-hosted white paper; exact publication day not established. Read text, not a visual/PDF design review.
- E3 — [Ryan Lopopolo, Harness engineering](https://openai.com/index/harness-engineering/), February 2026; original engineering case study, vendor affiliation explicit.
- E4 — [Simon Willison, First run the tests](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/), created February 24, modified February 28 2026.
- E5 — [Simon Willison, Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/), March 6 2026; developer-authored patterns with executable examples.
- E6 — [Addy Osmani, How to write a good spec for AI agents](https://addyosmani.com/blog/good-spec/), January 13 2026. Original practitioner method.
- E7 — [Addy Osmani, My LLM coding workflow going into 2026](https://addyosmani.com/blog/ai-coding-workflow/), January 4 2026 per author archive. Original practitioner account.

The old Codex root documentation fetch returned 404 in earlier scope research;
current `learn.chatgpt.com` pages were used instead. No claim relies on that
failed fetch or on a search snippet alone.
