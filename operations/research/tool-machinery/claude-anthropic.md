```
tool: Claude (Anthropic) — the consumer product at claude.ai, web/desktop/iOS/Android apps
vendor: Anthropic
tiers_as_of_2026-07-22:
  Free: $0/month
  Pro: $17/month (billed annually) or $20/month (billed monthly)
  Max 5x: $100/month
  Max 20x: $200/month
  Team — Standard seat: $20/month (annual) or $25/month (monthly)
  Team — Premium seat: $100/month (annual) or $125/month (monthly)
  Enterprise: custom — quoted as "$20/seat plus usage costs at API rates"
  pricing_url: https://claude.com/pricing
checked_utc: 2026-07-22
```

Scope note: this file covers Claude.ai and its companion apps (web, Desktop, iOS, Android) — the
place a non-developer actually meets Claude. It does not cover the Claude Developer Platform /
API, the Claude Agent SDK, or Claude Code as a standalone developer tool, except where a
consumer surface (Cowork, Projects) visibly reuses that machinery.

---

## 1. Memory / personalisation

- **Vendor's name for it:** Memory
- **What it IS:** Claude quietly keeps a running set of notes about you — your role, how you
  like answers formatted, ongoing projects — and reads them back at the start of new chats so it
  doesn't start from zero every time.
- **How to set it up:** Web/desktop: click your initials (bottom left) → **Settings** →
  **Memory** (this is the new, rolled-out experience for Free/Pro/Max — Team and Enterprise
  currently see an older interface under **Settings → Capabilities**). Memory entries are
  organized into categories; you can edit one by typing what to change or remove into its text
  box, or delete it outright. You can also tell Claude to update memory directly from inside a
  chat, without opening Settings. `documented`
- **What it's genuinely for:** Not having to re-explain your job, your stack, or your writing
  voice every single conversation. Each Project also keeps its own separate memory space, so a
  work project and a personal one don't bleed into each other. `documented`
- **The ONE mistake people make:** Assuming "pause" and "reset" are the same thing. **Pause
  memory** keeps everything already stored but stops adding new entries; **reset memory**
  deletes everything, and Anthropic's own help page describes this as irreversible. People who
  want a clean slate for one weird conversation often reach for "reset" when "pause" (or just
  editing the one bad entry) was what they wanted. `documented`
- **Tier:** Free, Pro, and Max get the new per-category Memory experience. Team and Enterprise
  are on a legacy version with a different interface (Anthropic describes a gradual rollout to
  bring them onto the new one). `documented`
- **What it does NOT do:** It does not read incognito chats. Deleting a conversation does not
  automatically delete the memory entries that conversation produced — those have to be deleted
  separately. NOT VERIFIED: the exact retention period in days/months for a memory entry that is
  never manually deleted — Anthropic's help page only says memory "follows existing chat data
  retention policies" without stating the policy itself on that page.
- **Sources:** [Use Claude's chat search and memory](https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context) — checked 2026-07-22.
- **Volatility:** HIGH — Anthropic states the new Memory experience is mid-rollout and the
  Team/Enterprise interface is explicitly described as a legacy version being phased out; the
  click path and category structure are likely to change within six months.

Chat search (a related but separate capability) lets you ask Claude things like "what did we
discuss about X?" and it searches past conversations using retrieval — but it is **paid-plan
only** (Pro, Max, Team, Enterprise), and it searches either "all chats outside projects" or one
project's chats, never across both at once. `documented` Source as above.

---

## 2. Custom instructions / profile

- **Vendor's name for it:** Profile instructions ("Instructions for Claude"), alongside Project
  instructions and Styles.
- **What it IS:** A block of text you write once that Claude reads before every conversation,
  account-wide — your general working style, terms you use, or things you always want it to
  assume.
- **How to set it up:** Click your initials (bottom left) → **Settings**, then enter text under
  **Instructions for Claude**. This is separate from Project instructions (set per-project, see
  §3) and from Styles (a separate control over response tone/format). `documented`
- **What it's genuinely for:** Universal, always-true context — "I'm a tax professional, use
  precise numbers not rounded ones," "keep answers under 200 words unless I ask for more." The
  official guidance is explicit about the three-way split: profile instructions for things true
  everywhere, project instructions for one workstream, styles for how responses are formatted.
- **The ONE mistake people make:** Putting project-specific detail into the account-wide
  profile instructions, so it follows you into unrelated chats where it doesn't apply — or the
  reverse, writing the same preference into every project's instructions instead of once in the
  profile.
- **Tier:** Available on all plans, including Free. `documented`
- **What it does NOT do:** It is not memory — profile instructions are static text you wrote,
  not something Claude infers and updates on its own (that's the separate Memory feature in §1).
  NOT VERIFIED: any hard character limit on the instructions field — not stated on the page
  fetched.
- **Sources:** [Understanding Claude's personalization features](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features) — page marked "updated over a week ago," checked 2026-07-22.
- **Volatility:** MEDIUM — the three-way split (profile / project / styles) is a stable mental
  model, but Anthropic has been actively adding a fourth layer (Skills, see §6) into the same
  settings area, so the exact menu layout is likely to keep shifting.

---

## 3. Projects (Anthropic's own word — no other container name is used)

- **Vendor's name for it:** Projects
- **What it IS:** A folder that bundles a set of chats with its own uploaded files ("project
  knowledge") and its own standing instructions, so every chat inside it starts with the same
  shared context.
- **How to set it up:** Go to claude.ai/projects → **+ New Project** → name and describe it
  (Claude does not read the name/description as instructions) → add files to the knowledge base
  via the "+" on the right side of the project page → optionally click **Set project
  instructions** to add standing behavior for that project only. `documented`
- **What it's genuinely for:** Recurring workstreams where the same background material or
  house style applies every time — a client, a course, a long-running writing project — without
  re-uploading files or re-explaining context in every new chat.
- **The ONE mistake people make:** Assuming chats inside a project automatically share context
  with each other. They don't — Anthropic's own page states plainly that "context is not shared
  across chats within a project unless the information is added into the project knowledge
  base." A fact mentioned in chat A is invisible to chat B unless it's uploaded as a file.
- **Tier:** Free accounts can create up to 5 projects; Pro, Max, Team, and Enterprise get
  unlimited projects. `documented`
- **What it does NOT do:** It does not merge conversation history between chats in the project
  (see mistake above). For Team/Enterprise, project visibility can be private or
  organization-wide, but that's a per-project setting someone has to choose — it is not shared by
  default. When paid-plan users approach the context limit, Anthropic says Claude "automatically
  enable[s] RAG mode to expand your project's capacity" — meaning at large scale, the model is
  reading retrieved snippets of your files rather than the full text every time. NOT VERIFIED:
  the exact token/size threshold at which RAG mode kicks in.
- **Sources:** [How can I create and manage projects?](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) — page marked "updated this week," checked 2026-07-22.
- **Volatility:** LOW — Projects as a concept has been stable since its 2024 launch; the RAG
  auto-expansion behavior is the newer, more likely-to-change part.

---

## 4. File upload & knowledge

- **Vendor's name for it:** Uploading files (in-chat) vs. the project knowledge base (in a
  Project — see §3).
- **What it IS:** Attaching a document or image to a chat so Claude can read and reference it
  in that conversation.
- **How to set it up:** Click the "+"/attach icon in the chat box and select a file. Supported
  document types: PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON, and XLSX (XLSX specifically
  requires "Code execution and file creation" turned on in Settings → Capabilities — see §8).
  Supported images: JPEG, PNG, GIF, WebP. `documented`
- **What it's genuinely for:** One-off reference material for a single conversation — a
  contract to review, a spreadsheet to analyze, a screenshot to discuss — without setting up a
  whole Project.
- **The ONE mistake people make:** Uploading a 900-page PDF and expecting Claude to have "read"
  all of it the way a human would. Anthropic's own page says PDFs over roughly 100 pages get
  visual-plus-text processing degraded, and PDFs over 1,000 pages get **text only** — no
  processing of charts, scanned images, or layout. People assume full-document visual
  comprehension at any length.
- **Tier:** Available on all plans, including Free.
- **What it does NOT do:** In-chat uploads cap at 500MB per file and 20 files per chat; image
  dimensions cap at 8000×8000 pixels. Project knowledge files cap lower — 30MB per file — but
  allow unlimited file count (limited in practice by the context window, see §3's RAG note).
  Project files are text-extracted only, except for multimodal PDF handling. NOT VERIFIED: how
  long an uploaded chat file persists on Anthropic's servers, or whether uploaded content is
  used in model training — not stated on the page fetched.
- **Sources:** [Upload files to Claude](https://support.claude.com/en/articles/8241126-upload-files-to-claude) — page dated "April 22, 2026," checked 2026-07-22.
- **Volatility:** MEDIUM — the size limits specifically have moved before (this page's 500MB
  in-chat limit is notably larger than figures widely repeated in older third-party guides,
  which quoted 30MB for chat uploads too — see Traps and corrections below) and are likely to
  move again.

---

## 5. Connectors / integrations

- **Vendor's name for it:** Connectors
- **What it IS:** A way to let Claude read from — and in some cases act inside — another app
  (Google Drive, Gmail, Slack, and others) without you copy-pasting content into the chat.
- **How to set it up:** Click the "+" in the chat box (or type "/") → **Connectors** → **Manage
  connectors** → click "+" next to Connectors → pick one → **Connect** → complete that service's
  own login/authentication screen. Google Workspace connectors (Gmail, Calendar, Drive) are
  available to all users but still require you to individually authenticate with your Google
  account. On Team/Enterprise, an Owner or Primary Owner must first turn a connector on
  organization-wide (Organization settings → Connectors) before members can authenticate to it
  individually. Custom connectors (pointing at your own remote MCP server URL) are added the
  same way, via Customize → Connectors → "+", entering the server's URL and optionally an OAuth
  client ID/secret. `documented`
- **What it's genuinely for:** Ending the "let me paste my last five emails in" workflow — Claude
  can search your inbox, pull a doc, or check a Slack channel directly, inside the conversation.
- **The ONE mistake people make:** Assuming a connector gives Claude access to everything in
  that account. It doesn't — access is inherited from whatever the logged-in user can already
  see in the source system. But people also assume the opposite mistake in the other direction:
  that connecting an account is low-stakes because "it can only read." Several connectors
  support write actions (sending a message, creating a doc), and Team/Enterprise owners can
  separately restrict a connector to read-only organization-wide — that restriction is not the
  default and has to be set deliberately.
- **Tier:** Web connectors (Google Workspace, etc.) are available to all users, all plans. Custom
  connectors via remote MCP are available on Free (capped at **1** custom connector), Pro, Max,
  Team, and Enterprise.
- **What it does NOT do:** A **custom connector connects to your MCP server from Anthropic's
  cloud, not from your own device** — the server has to be reachable over the public internet.
  It is not the same mechanism as a local MCP server / desktop extension (see §6), which runs on
  your machine. To revoke a connector, go to Customize → Connectors and disconnect it — turning
  off the chat toggle is not the same as disconnecting the underlying authentication.
- **Sources:** [Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities) (page marked "over 2 weeks ago"); [Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp); [Use Google Workspace connectors](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors) — checked 2026-07-22.
- **Volatility:** HIGH — this is one of the fastest-moving parts of Claude.ai; Anthropic has
  been adding named connectors (Canva, DocuSign, and others per press coverage) on an ongoing
  basis, and the connectors directory's exact contents will be stale within weeks of any
  snapshot.

---

## 6. Extensions / plug-ins / skills / MCP

Anthropic uses three distinct terms here, and a reader will hit all three in different places.
None of them are interchangeable, so each gets its own mini-entry.

### 6a. Skills

- **Vendor's name for it:** Skills
- **What it IS:** A folder of instructions (and optionally scripts) that teaches Claude how to
  do one specific, repeatable job — apply a company's brand guidelines, follow a particular
  spreadsheet format — that Claude loads only when the task calls for it, without you having to
  invoke it by name.
- **How to set it up:** Settings → Capabilities (Free/Pro/Max) or Organization settings → Skills
  (Team/Enterprise) → turn on "Code execution and file creation" (Skills require it) → go to
  Customize → Skills → toggle individual pre-built skills on/off, or click "+" → "Upload a
  skill" to add a custom one (built as a folder following Anthropic's skill structure, packaged
  as a .zip). `documented`
- **What it's genuinely for:** Consistency across a team or across your own repeated tasks —
  Anthropic-built skills already exist for Excel, Word, PowerPoint, and PDF creation; custom
  skills exist for anything else you do the same way every time.
- **The ONE mistake people make:** Assuming you have to explicitly "turn on" a skill in every
  chat. Anthropic's own description says Claude reviews available skills and decides which are
  relevant per task ("progressive disclosure") — the toggle in Customize → Skills controls
  whether a skill is *available* at all, not whether it fires in a given message.
- **Tier:** Free, Pro, Max, Team, Enterprise all have access, gated behind the code-execution
  toggle.
- **What it does NOT do:** Custom skills that need executable scripts are more capability than a
  Markdown-only skill, but a skill still isn't a full plug-in with its own connectors —
  bundling connectors, sub-agents, and multiple skills together is what a **Plugin** does
  instead (6c).
- **Sources:** [What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills) · [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) — both marked "updated over a week ago" / "updated today" respectively, checked 2026-07-22.
- **Volatility:** HIGH — Skills is one of the newest pieces of this machinery and the settings
  location, marketplace of pre-built skills, and Team/Enterprise provisioning controls are
  still actively being built out.

### 6b. Desktop extensions (local MCP servers)

- **Vendor's name for it:** Desktop extensions (a packaged, one-click way of installing a local
  MCP server on Claude Desktop).
- **What it IS:** A small installable package that runs a Model Context Protocol server on your
  own computer, giving Claude Desktop access to something local — files, an app, a dev tool —
  that a cloud-hosted connector can't reach.
- **How to set it up:** In Claude Desktop: Settings → Extensions → **Browse extensions** → pick
  an Anthropic-reviewed one → install → configure anything it asks for (API keys etc.). For a
  custom one not in the directory: Settings → Extensions → Advanced settings → **Install
  Extension…** → choose a `.mcpb` file. `documented`
- **What it's genuinely for:** Reaching things that live only on your machine or behind your
  own network — a local database, an internal tool — which a Connector (cloud-to-cloud) cannot
  touch by design.
- **The ONE mistake people make:** Treating a desktop extension as equally safe as an
  Anthropic-hosted Connector because it appears in the same-looking settings screen. It isn't —
  a local MCP server "run[s] on your computer with the same permissions as any other program you
  run," per Anthropic's own plugin-safety language (see 6c). Anthropic reviews the extensions in
  its official directory, but a `.mcpb` installed manually from outside that directory carries
  the same trust burden as installing any other unreviewed executable.
- **Tier:** Available on all Claude Desktop tiers; Team/Enterprise owners get extra controls —
  enabling/disabling individual public extensions org-wide, uploading custom ones for one-click
  team install, and locking the registry down to only approved extensions. Enterprise
  machine-level policy can override what an individual user sets in-app.
- **What it does NOT do:** Desktop extensions only exist inside the Desktop app — they are not
  reachable from claude.ai in a browser or the mobile apps. Sensitive config fields (marked
  `"sensitive": true` by the extension author) are encrypted via OS-level keychains, but that
  protects the credential at rest — it does not limit what the running server can do once it has
  that credential.
- **Sources:** [Getting started with local MCP servers on Claude Desktop](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop) — page marked "updated over 3 weeks ago," checked 2026-07-22.
- **Volatility:** MEDIUM — MCP itself (the underlying protocol) is stabilizing industry-wide, but
  Anthropic's own packaging of it into "desktop extensions" and the reviewed-directory concept
  are recent additions likely to keep changing shape.

### 6c. Plugins (Cowork only)

- **Vendor's name for it:** Plugins
- **What it IS:** A single installable package that can bundle several of the above at once —
  Skills, MCP connectors, sub-agents, slash commands, hooks — built specifically for Claude
  Cowork (see §8) rather than for ordinary chat.
- **How to set it up:** Open Cowork → **Customize** (left sidebar) → **Plugins** tab → **Browse
  plugins** → **Install**. Anthropic ships built-in marketplaces (Knowledge Work is on by
  default; Financial Services and Legal are opt-in), and a marketplace can also be added from
  any GitHub repository containing plugin packages — the way a team distributes its own plugins
  privately. `documented`
- **What it's genuinely for:** Standing up a role-specific version of Cowork in one step —
  install one plugin instead of manually connecting three services and uploading two skills.
- **The ONE mistake people make:** Installing a plugin from an unfamiliar GitHub marketplace
  without checking what it grants. Anthropic's own guidance is blunt: plugins "may include local
  MCP servers that run on your computer with the same permissions as any other program you
  run. Only install plugins from sources you trust."
- **Tier:** Available on all paid plans — Pro, Max, Team, Enterprise. Not available on Free
  (Cowork itself is paid-only, see §8).
- **What it does NOT do:** Sub-agents and hooks bundled in a plugin only function inside Cowork
  — the same plugin installed shows those pieces "grayed out" in ordinary chat, per Anthropic's
  own description. A plugin is not a substitute for reviewing each connector it bundles
  individually.
- **Sources:** [Use plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) — page dated "May 29, 2026," checked 2026-07-22.
- **Volatility:** HIGH — Plugins launched alongside Cowork itself, which is new; expect the
  marketplace list and installation flow to move fastest of anything in this file.

---

## 7. Automations / scheduled tasks

- **Vendor's name for it:** Scheduled tasks (inside Claude Cowork)
- **What it IS:** A way to make Claude run the same instructions on a recurring schedule — daily,
  weekly, hourly, or on-demand — without you opening a chat and asking each time.
- **How to set it up:** Inside Cowork, click **Scheduled** in the left sidebar → **New task** →
  either **Create with Claude** (answer a few multiple-choice questions, review the proposed
  task, click Schedule) or **Set up manually** (fill in task name, prompt/instructions, an
  approval mode, frequency, and optionally a specific model and a destination folder) → **Save**.
  Frequency options are hourly, daily, weekly, weekdays, or manual/on-demand. `documented`
- **What it's genuinely for:** Recurring knowledge work that doesn't need a human to kick it off
  — a daily briefing summarizing Slack/email/calendar from the last 24 hours, a weekly report
  pulled from a spreadsheet or Drive, ongoing competitor or news tracking, periodic file cleanup,
  or a recurring team-status summary.
- **The ONE mistake people make:** Leaving a scheduled task running indefinitely after the need
  for it has passed — Anthropic's own Cowork-safety guidance specifically names this as a common
  mistake, alongside using scheduled tasks for high-stakes actions without any human-approval
  step. A scheduled task keeps the same connected tools, skills, and installed plugins as a
  manually run Cowork task, so a mistake in the underlying access compounds every time it fires.
- **Tier:** Cowork's scheduled tasks are on all paid plans (Pro, Max, Team, Enterprise) — not
  available on Free, because Cowork itself requires a paid plan. Rolling out gradually,
  beginning with Max plan users.
- **What it does NOT do:** A scheduled task runs remotely on Anthropic's servers, so it fires
  even if your computer is asleep or Claude Desktop is closed — but that also means it cannot
  reach anything that only exists on your machine while it's offline (local folders connected
  only through the Desktop app, for instance). NOT VERIFIED: a maximum number of scheduled tasks
  per account/plan — not stated on the pages fetched.
- **Sources:** [Schedule recurring tasks in Claude Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork) · [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely) — both marked "updated over a week ago," checked 2026-07-22.
- **Volatility:** HIGH — Cowork and its scheduling are Anthropic's newest consumer-facing
  surface as of this check; expect the approval-mode options and frequency choices to expand.

---

## 8. Modes people miss (voice, artifacts, code execution, web search, Research, Cowork)

### Voice mode
- **Vendor's name for it:** Voice mode
- **What it IS:** Talking to Claude out loud and hearing a spoken response back, switching
  freely between typing and talking in the same conversation.
- **How to set it up:** Tap the sound-wave icon in the lower right of the chat window (web) or
  the text input field (mobile); pick a voice and pace in the settings next to that icon.
- **What it's genuinely for:** Hands-free use — while driving, cooking, or otherwise not looking
  at a screen — and it carries prior context over when you switch back to typing (useful for
  dropping into text just to paste a URL or a code block, then going back to voice).
- **The ONE mistake people make:** Assuming voice mode is a separate, lightweight product with
  its own quota. It isn't — voice conversations count toward the same regular usage limit as
  your text plan.
- **Tier:** Beta, but available to all plans, all of Claude.ai and the mobile apps.
- **What it does NOT do:** Enterprise admins can have it disabled for their org on request to
  Anthropic Support — it is not a self-service admin toggle in the same panel as other
  Capabilities settings. NOT VERIFIED: whether Desktop (as opposed to web/iOS/Android) currently
  supports voice mode — the page fetched names web and mobile explicitly and does not mention
  Desktop.
- **Sources:** [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode) — page dated "May 21, 2026," checked 2026-07-22.
- **Volatility:** MEDIUM — still labeled beta by Anthropic itself.

### Artifacts
- **Vendor's name for it:** Artifacts
- **What it IS:** A separate window, next to the chat, that holds a substantial piece of content
  Claude made — a document, a website, code, an SVG, an interactive app — so you can look at and
  iterate on it without it being buried in scroll-back chat text.
- **How to set it up:** Nothing to turn on for the basic version — Claude creates an artifact
  automatically once what it's producing is "significant and self-contained," which Anthropic
  describes as typically over 15 lines. All artifacts collect at claude.ai/artifacts. For
  Markdown documents, highlighting text and choosing "Edit with Claude" makes an inline edit; a
  version selector lets you flip between iterations. An artifact only appears in your saved
  sidebar collection after you click **Publish** on it.
- **What it's genuinely for:** Anything you'll want to keep looking at, revise, or reuse outside
  that one conversation — a draft, a small working tool, a chart — instead of re-scrolling a
  chat transcript to find it again.
- **The ONE mistake people make:** Assuming a good artifact Claude made mid-chat is automatically
  saved somewhere. It is only saved to your artifacts sidebar once you explicitly Publish it —
  closing the conversation without publishing means it's gone from that easy-access view (though
  still inside the original chat transcript).
- **Tier:** Free, Pro, Max, Team, Enterprise all have it on web and Desktop; on Claude Code it's
  limited to Team/Enterprise. It requires "Code execution and file creation" enabled in Settings
  → Capabilities.
- **What it does NOT do:** An artifact is not automatically shared with anyone else — publishing
  to your own sidebar and publicly sharing/embedding it are two different steps, covered by a
  separate "Publish and share artifacts" article.
- **Sources:** [What are artifacts and how do I use them?](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) — page marked "updated today," checked 2026-07-22.
- **Volatility:** LOW — Artifacts has existed since mid-2024 and is one of the more stable
  features in this file; AI-powered/interactive artifacts (embedding live Claude access inside
  the artifact itself) are the newer, faster-moving layer within it.

### Code execution & file creation
- **Vendor's name for it:** Code execution and file creation (the setting has replaced an older
  "analysis tool")
- **What it IS:** A private, sandboxed computing environment inside Claude.ai where Claude can
  actually run code — not just describe it — to build a real spreadsheet, slide deck, Word
  document, PDF, or chart and hand you the finished file.
- **How to set it up:** Settings → Capabilities → toggle "Code execution and file creation" on
  (Free/Pro/Max — manual toggle; Team/Enterprise — on by default, owners can turn it off at
  Organization settings → Capabilities). On mobile: initials → Settings → Capabilities → same
  toggle.
- **What it's genuinely for:** Producing an actual downloadable, usable file (an .xlsx with
  working formulas, a real .pptx) rather than a wall of text describing what a spreadsheet would
  contain.
- **The ONE mistake people make:** Not realizing there's a network-access setting underneath
  this that changes what the sandbox can reach — options range from fully disabled network
  access (most secure), to package-managers-only (npm/PyPI/GitHub — Team/Enterprise default), to
  a specific allowlisted domain set, to full internet access. People leave this on a broader
  setting than the task needs, or don't realize a locked-down setting is why a code-execution
  task suddenly can't reach something it needs.
- **Tier:** Available on all plans (Free through Enterprise), on web, Desktop, and mobile.
- **What it does NOT do:** Files produced this way max out at 30MB. It runs in an isolated
  sandboxed container that Anthropic describes as separate from your own systems — it is not
  reaching into your local machine unless you've separately connected a desktop extension or
  local folder (see §6b, §8 Cowork).
- **Sources:** [Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude) — page dated "April 29, 2026," checked 2026-07-22.
- **Volatility:** MEDIUM — Anthropic itself frames this as a recent replacement for an older
  "analysis tool," so the settings label and default network-access posture are worth
  re-checking every few months.

### Web search
- **Vendor's name for it:** Web search
- **What it IS:** Letting Claude look something up on the live internet mid-conversation instead
  of answering only from what it learned in training, with cited sources in the reply.
- **How to set it up:** Click the "+" (or the slider icon) in the chat box and toggle **Web
  search** on — either per message or as a persistent setting, depending on the interface.
  Team/Enterprise: an admin must first enable it org-wide at Admin settings → Capabilities
  before members can toggle it per chat.
- **What it's genuinely for:** Anything time-sensitive — current prices, recent news, a person's
  current role — where a training-data-only answer would be stale or simply wrong.
- **The ONE mistake people make:** Assuming web search is free/unlimited because it's on the
  Free plan. It is available on Free, but Anthropic states free-plan usage counts against a
  daily limit shared with other capabilities, and fetching long articles by direct URL burns
  through context-window capacity fast.
- **Tier:** Free, Pro, Max, Team, Enterprise (Team/Enterprise gated behind an admin toggle first).
- **What it does NOT do:** NOT VERIFIED — the exact numeric daily search cap for Free-plan users;
  Anthropic's page describes the limit's existence without stating the number.
- **Sources:** [Enable and use web search](https://support.claude.com/en/articles/10684626-enable-and-use-web-search) — page marked "updated over 3 weeks ago," checked 2026-07-22.
- **Volatility:** MEDIUM — the toggle and admin-gating structure are stable, but the specific
  models it's available on and the exact daily-limit numbers move with Anthropic's usage-policy
  updates.

### Research
- **Vendor's name for it:** Research
- **What it IS:** An agentic mode where Claude runs many searches back-to-back, decides for
  itself what to look into next based on what it's finding, and delivers one long, cited report
  instead of a single quick answer.
- **How to set it up:** Click the **Research** button (bottom left of the chat box) to turn it
  blue/on, then ask your question. Web search must already be turned on for Research to work —
  Research is built on top of it.
- **What it's genuinely for:** A question that genuinely needs synthesis across many sources —
  a competitive landscape, a "what's the current state of X" question — where Anthropic's own
  description says most reports finish in 5–15 minutes, and the most complex investigations can
  run up to 45 minutes.
- **The ONE mistake people make:** Using Research for a question with a single, simple factual
  answer. It is built for open-ended synthesis; a quick lookup is faster and cheaper as an
  ordinary web-search-enabled chat.
- **Tier:** Paid plans only — Pro, Max, Team (beta), Enterprise. Not available on Free.
- **What it does NOT do:** NOT VERIFIED — the specific context-window size or exact source-count
  ceiling for a Research session; third-party write-ups quote figures (e.g. a 200K-token window,
  "hundreds of sources") that could not be confirmed directly on the vendor's own support page in
  this check, so they are omitted here rather than repeated as fact.
- **Sources:** support.claude.com "Using Research" article (redirects to a claude.com tutorial
  page; content synthesized from the support.claude.com article as indexed) — checked
  2026-07-22.
- **Volatility:** HIGH — Research is a fast-moving, actively-expanding feature (Anthropic has
  been widening its regional and plan availability); treat any specific limit as likely to be
  out of date within months.

### Cowork (agent mode)
- **Vendor's name for it:** Claude Cowork
- **What it IS:** An agentic mode — the same underlying architecture as Claude Code, but with no
  terminal — where instead of answering one prompt at a time, Claude takes on a multi-step task
  and works through it on its own: reading and writing local files, browsing the web in an
  actual browser, running code, and using connected apps, then hands back finished work.
- **How to set it up:** In the message box, select **Cowork** instead of the default chat mode,
  describe the task, then review Claude's proposed approach before it runs.
- **What it's genuinely for:** Real deliverables, not conversation — a formatted document, a
  cleaned-up folder of files, a synthesized research writeup, a working spreadsheet — assembled
  end-to-end rather than described to you piece by piece in chat.
- **The ONE mistake people make:** Granting Cowork broad file access (an entire Desktop folder,
  say) that happens to also contain sensitive material unrelated to the task, or leaving it on
  a fully-automatic approval mode for something that should have had a human check a step along
  the way. Anthropic's own Cowork-safety guidance names both of these directly, alongside
  installing unfamiliar plugins/MCP servers without checking what they grant.
- **Tier:** Paid plans only — Pro, Max, Team, Enterprise. Web and mobile Cowork are rolling out
  gradually, starting with Max plan users; not available on Free.
- **What it does NOT do:** Cowork's isolated remote execution cannot reach your company or home
  network, and it cannot see files outside whatever folder you've explicitly connected (Desktop
  app only) — and none of your local Desktop files are reachable at all while Claude Desktop
  itself is closed. Computer-use (letting it click around inside an actual application) requires
  a separate, per-application permission grant — it is not implied by turning on Cowork
  generally.
- **Sources:** [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) · [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely) — both marked "updated over a week ago," checked 2026-07-22.
- **Volatility:** HIGH — Cowork is Anthropic's newest major consumer surface as of this check;
  expect its rollout status (currently beta on web/mobile), its safety controls, and its
  plan-gating to all keep changing over the next six months.

---

## Screen-recordable moments

1. **The Memory settings screen itself** (Settings → Memory) — the category breakdown, the
   "tell Claude what to change" edit box, and the pause-vs-reset distinction are impossible to
   convey in a paragraph; a reader needs to see the actual entries Claude wrote about a real
   account.
2. **A Project's "context is not shared between chats" failure mode** — show two chats inside
   one project where a fact mentioned in chat A visibly isn't known to chat B, then show the fix
   (adding it to project knowledge instead).
3. **Installing a desktop extension vs. a custom connector side by side** — the visual and the
   underlying trust model are genuinely different (your machine vs. Anthropic's cloud), and that
   distinction is the single most-misunderstood thing in this whole file.
4. **A Cowork task actually clicking through a real webpage** — the "Claude can open Chrome and
   work on websites" capability only lands as real when a reader watches it happen, since it
   looks nothing like ordinary chat.
5. **Scheduled task creation via "Create with Claude"** — the multiple-choice interview flow
   that builds the task for you is a genuinely different interaction pattern worth showing once.
6. **Research's live search trail** — watching Claude decide what to search next, in real time,
   is the clearest way to show why "Research" is not just "web search but slower."

## Traps and corrections

- **"Chat file uploads are capped at 30MB."** This is the figure widely repeated in older
  third-party guides and is stale — Anthropic's own currently-dated page (April 22, 2026) states
  500MB per file for chat uploads. The 30MB cap still applies, but only to files added to a
  Project's knowledge base, not to ordinary chat attachments. Conflating the two limits is a
  live source of confusion; cite this page's date when teaching either number, since both are
  liable to move again.
- **"Skills only exist for developers using the API."** Not true on Claude.ai as of this check —
  Skills are a first-class, all-plans consumer feature (Free through Enterprise) sitting right
  in Settings/Customize, not just an API/Claude Code concept. Older material describing Skills
  as developer-only is now stale.
- **"A connector and a desktop extension are the same thing, just named differently."** They are
  not. A Connector (§5) is Anthropic-hosted and reaches cloud services from Anthropic's own
  infrastructure; a Desktop extension (§6b) is a locally-run MCP server on the user's own
  machine, available only in the Desktop app, with the trust profile of any other program
  installed on that computer. Anthropic's own plugin-safety language makes the local-execution
  risk explicit; guides that describe both as interchangeable "integrations" understate the
  desktop-extension risk.
- **"Claude.ai is just a chat window."** As of this check that's substantially out of date —
  Cowork turns Claude.ai into an agent that can browse a real browser, edit local files, and run
  on a schedule unattended. Any guide written before Cowork's rollout (a recent addition) will
  describe a materially smaller product than what Free/paid users can now do.
- **"The analysis tool" as the name for code execution.** Anthropic has replaced this name/scope
  with "Code execution and file creation" (per the April 29, 2026-dated page) — material still
  calling it "the analysis tool" is describing the predecessor feature, not the current one.
