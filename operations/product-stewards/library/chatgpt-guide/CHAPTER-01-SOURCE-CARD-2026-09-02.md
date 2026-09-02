# ChatGPT guide chapter 1 — current source card

**Checked:** 2026-09-02
**Scope:** ChatGPT consumer product and ChatGPT-authenticated Codex. API details
appear only where the reader could otherwise confuse an API setting with a
ChatGPT plan.
**Status:** Internal research source for a manuscript candidate. This is not an
account-entitlement test and does not prove that every account displays the same
controls.

## Claim decisions

### CHAT-WORK-CODEX-ROLES

- **Claim approved for the chapter:** Chat is the simplest place for a question,
  discussion or short draft. Work is for delegating a reviewable result such as
  a brief, deck, analysis, workflow or file. Codex is the developer-oriented
  surface for work on code, files, commands and tests. These are different
  working surfaces, not three rungs on an intelligence ladder.
- **Official evidence:** OpenAI's current Learn pages describe Chat as the place
  to ask a question or work something through, Work as the place to delegate a
  task with a reviewable result, and Codex as developer-focused work with more
  technical detail.
- **Sources:** [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt),
  [Get started with Work](https://learn.chatgpt.com/docs/get-started-with-work)
- **Freshness trigger:** Recheck if the product navigation, surface names or
  documented capability boundaries change.

### WORK-LOCAL-CLOUD

- **Claim approved for the chapter:** Work can use supplied files, plugins and
  approved tools. In the desktop app, local work can use files, apps and browser
  context available on the computer. Cloud work can continue away from the
  computer and later be continued from web or mobile. Availability still depends
  on the reader's account and environment.
- **Official evidence:** The current Work guide distinguishes local execution
  for tasks that need a computer's files or applications from cloud execution
  that can continue while the computer is off.
- **Source:** [Get started with Work](https://learn.chatgpt.com/docs/get-started-with-work)
- **Freshness trigger:** Recheck when local/cloud execution or plan access changes.

### PROMPTING-CONTEXT-AND-CHECKS

- **Claim approved for the chapter:** There is no required magic prompt syntax.
  For a larger task, the useful ingredients are the goal, relevant context,
  desired output and boundaries. The reader should name the source of truth,
  inspect the result and request a final check; human review remains necessary
  for consequential work.
- **Official evidence:** OpenAI's current prompting guide recommends natural
  language, adding only the context needed, specifying output and boundaries,
  and refining the request after inspecting the result.
- **Source:** [Prompting](https://learn.chatgpt.com/docs/prompting)
- **Freshness trigger:** Recheck when official prompting guidance changes.

### PERSONALITY-INSTRUCTIONS-MEMORY

- **Claim approved for the chapter:** The current personality choices include
  Friendly, Pragmatic and None. Personality changes communication style, not
  capability. Custom instructions are suitable for stable preferences across
  chats. Current project facts still belong in the prompt or maintained project
  material; memory is not a dependable substitute for required instructions.
  Codex can use a global `AGENTS.md` for personal instructions.
- **Official evidence:** The current personalization guide lists Friendly,
  Pragmatic and None and makes these distinctions explicitly.
- **Source:** [Personalize ChatGPT](https://learn.chatgpt.com/docs/personalize)
- **Freshness trigger:** Recheck when personalization, memory or Codex instruction
  behaviour changes.

### PROJECTS

- **Claim approved for the chapter:** A Project groups related chats, files,
  instructions and sources. A web Project does not automatically gain access to
  a folder on the reader's computer; the reader must upload or connect the
  material she wants it to use.
- **Official evidence:** The current Projects guide documents both the grouping
  function and the local-folder boundary.
- **Source:** [Projects](https://learn.chatgpt.com/docs/projects)
- **Freshness trigger:** Recheck when Projects or local-file access changes.

### MODEL-CHOICE

- **Claim approved for the chapter:** GPT-5.6 Luna is the economical fit for
  clear repeatable work, Terra is the pragmatic everyday all-rounder, and Sol is
  intended for more complex, open-ended work where detail and polish matter.
  Power currently defaults to Sol with medium effort. Readers with an advanced
  picker may be able to choose the model, effort and speed; readers without that
  picker should use the provided model rather than hunting for a control that is
  not present.
- **Official evidence:** The current model guide gives those roles and describes
  Power and advanced selection.
- **Source:** [Models](https://learn.chatgpt.com/docs/models)
- **Freshness trigger:** Recheck before publication and whenever models, defaults
  or picker access change.

### EFFORT-CHOICE

- **Claim approved for the chapter:** Light on desktop, Work web and IDE—or Low
  in the CLI—is for quick, well-scoped jobs. Medium balances speed and depth.
  High and Extra High are for work with several steps, sources or trade-offs.
  Max gives one especially hard task more time and may require enabling. Ultra
  coordinates separable workstreams with subagents and is unnecessary for most
  tasks. More effort is not a factual guarantee; it can add time and review
  burden, so the reader should begin with the lowest setting that reliably works.
- **Official evidence:** The current model guide defines these levels and says
  most tasks do not need Max or Ultra.
- **Source:** [Models](https://learn.chatgpt.com/docs/models)
- **Freshness trigger:** Recheck when effort names, availability or behaviour
  changes.

### FILES-AND-ARTIFACTS

- **Claim approved for the chapter:** A file-making request should specify source
  data, output type, structure and review criteria. Desktop can preview common
  documents, presentations, spreadsheets, PDFs and HTML; Work on web can create
  or attach files for review and download; Codex CLI edits its working directory
  without a visual preview. The reader must inspect or test the actual artifact,
  not accept a completion summary as proof.
- **Official evidence:** The current artifacts guide documents the supported
  review routes and recommends naming the source, output and review criteria.
- **Source:** [Artifacts and files](https://learn.chatgpt.com/docs/artifacts-viewer)
- **Freshness trigger:** Recheck when file support or previews change.

### SETTINGS

- **Claim approved for the chapter:** In the desktop app, Settings is available
  from the app menu or with Command-comma on macOS and Control-comma on Windows.
  Relevant areas include Personalization and appearance. Exact controls can vary
  by surface and account.
- **Official evidence:** The current settings reference documents these routes.
- **Source:** [Settings reference](https://learn.chatgpt.com/docs/reference/settings)
- **Freshness trigger:** Recheck when navigation changes.

### FREE-AND-PAID

- **Claim approved for the chapter:** ChatGPT currently includes access to Work
  and Codex across Free, Go, Plus, Pro, Business, Edu and Enterprise plans, but
  usage is shared and plan limits and capabilities differ. Free is a valid route
  through this lesson, not a promise of equal quotas or identical controls.
  Paying can change capacity, model choice, tools and execution options; it does
  not remove the need to supply reliable sources or inspect the result.
- **Official evidence:** The current pricing page lists Work and Codex across the
  plans and explains shared usage. It does not establish identical access.
- **Source:** [Pricing](https://learn.chatgpt.com/docs/pricing)
- **Freshness trigger:** Recheck immediately before publication and whenever
  plan names, prices, limits or included capabilities change.

### API-NOT-SUBSCRIPTION

- **Claim approved for the chapter:** In the API, GPT-5.6 exposes reasoning effort
  values from none through max. API Pro execution mode is separate from a
  ChatGPT Pro subscription. These API labels must not be presented as consumer
  subscription benefits.
- **Official evidence:** The current GPT-5.6 developer guide documents the API
  effort values and explicitly separates execution mode from subscription.
- **Source:** [GPT-5.6 developer guide](https://developers.openai.com/api/docs/guides/latest-model)
- **Freshness trigger:** Recheck when the API schema or execution modes change.

## Evidence boundary for the worked case

The Class of 2002 reunion case in chapter 1 is a **constructed teaching
demonstration**. Its people, venue, source files, contact details and outputs are
fictional. It demonstrates the documented workflow and a realistic stale-value
failure; it is not presented as a verbatim transcript of a consumer account run.
The chapter must say this beside the example.
