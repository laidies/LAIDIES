```
tool: Perplexity
vendor: Perplexity AI, Inc.
tiers_as_of_2026-07-22:
  - Free (Standard) — $0
  - Perplexity Pro — $20/mo (12-month value stated as "$200" on Perplexity's own Samsung-promo page, i.e. $200/yr)
  - Perplexity Max — $200/mo or $2,000/yr
  - Education Pro — $10/mo (SheerID-verified students/educators)
  - Enterprise Pro — $40/seat/mo or $400/seat/yr
  - Enterprise Max — $325/seat/mo or $3,250/seat/yr
  - Agent API — pay-as-you-go credits, no consumer-app features
  Pricing sources: https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you
  (page's own "last updated" 2026-07-22) · https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/12310544-what-is-enterprise-max
  (last updated 2026-05-01) · https://www.perplexity.ai/help-center/en/articles/11825615-samsung-galaxy-perplexity-pro-12-months-free-for-u-s-galaxy-owners
  (last updated 2026-07-16)
checked_utc: 2026-07-22
```

Note on scope: Perplexity has, since late 2025, grown a second product layer called **Computer** —
an agent that acts (not just answers) and that owns most of the "machinery" topics below
(Skills, Connectors, Scheduled Tasks, Brain memory). Where a topic lives partly or wholly inside
Computer, that's called out explicitly, because it changes which tier a reader needs.

---

## 1. Memory / personalisation

- **Vendor's name for it:** "Memory" (the personalization store) — distinct from "Brain" (a
  separate, more advanced context system, covered below) and from "AI Data Retention" (a model-
  training opt-out, also separate).
- **What it IS:** Perplexity automatically pulls out and stores things you've told it or asked
  about — preferences, interests, recurring topics — and reuses them on later questions, on any
  underlying model you pick.
- **How to set it up:** Click your avatar (bottom of the sidebar) → All Settings → Personalization.
  Memory has its own on/off toggle there. To review or remove what's stored, third-party
  walkthroughs describe a "Manage Memories" list with a trash icon per item and a "clear all"
  option — **NOT VERIFIED** against a Perplexity help-center page; every source found for that
  exact panel was a third-party blog, not perplexity.ai. Incognito mode disables Memory and
  search history for that session automatically (documented).
- **What it's genuinely for:** not repeating context ("I'm training for a marathon," "my kids are
  vegetarian") every single search, and keeping that context even when you switch models,
  because Memory sits underneath the model picker rather than inside one model's chat history.
- **The ONE mistake people make:** assuming turning off "AI Data Retention" (the training opt-out)
  also stops Memory from storing things, or vice versa. They are two separate switches. A related
  mistake: confusing Memory with Brain — Memory just stores preferences; Brain (below) builds an
  active working model of your projects and is a different, newer, Max-only feature.
- **Tier:** Memory/personalization itself is not stated as tier-gated in any page fetched — it
  reads as available broadly to logged-in accounts. **NOT VERIFIED** whether Free accounts get
  the identical feature set as Pro/Max. Brain is explicitly **Max-only, Research Preview**.
- **What it does NOT do:** it does not read or write anything during incognito sessions; it uses
  "AI-based filtering" to reduce (not guarantee-eliminate) the chance sensitive details like
  passwords end up stored; a claimed 30-day deleted-memory retention window before permanent
  removal could not be confirmed on any perplexity.ai page — **NOT VERIFIED**.
- **Sources:** https://www.perplexity.ai/hub/blog/introducing-ai-assistants-with-memory (dated
  2025-11-26 on the page, vendor blog) · https://www.perplexity.ai/help-center/en/articles/19700001-what-is-brain
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/10352993-account-settings
  (last updated 2026-07-16). Checked 2026-07-22.
- **Volatility:** HIGH — Memory launched Nov 2025 and Brain is an active Research Preview still
  rolling out gradually to Max users as of the July 2026 pages.

---

## 2. Custom instructions / profile

- **Vendor's name for it:** "Personalization" fields under Account Settings — includes a free-text
  **"Custom instructions"** box, plus structured fields (occupation, company name, response
  length, "Headers and Lists" formatting). Inside a Project, the equivalent is called out as
  "custom AI instructions" — effectively a project-level system prompt.
- **What it IS:** a place to tell Perplexity, once, how you want it to talk to you and what it
  should know about you — so you don't retype that in every single question.
- **How to set it up:** Avatar → All Settings → Personalization → fill in Your occupation, Company
  name, Custom instructions (free text), Response Length, Headers and Lists, Share location. For
  a Project instead: open the Project, the custom-instructions box sits at the top of its
  compose box.
- **What it's genuinely for:** durable facts about *you* (role, tone preference, standing
  formatting preference) belong in the global Personalization box; anything specific to one
  ongoing piece of work belongs in that Project's own instructions instead.
- **The ONE mistake people make:** dumping project-specific detail ("I'm writing a grant proposal
  for X, use these three sources") into the *global* Custom instructions box, so it silently
  colours every unrelated search from then on. Project-level instructions exist precisely to keep
  that contained.
- **Tier:** documented without an explicit tier gate on the Account Settings page itself;
  **NOT VERIFIED** whether the full field set (e.g. video-generation-model default) shows for
  Free accounts.
- **What it does NOT do:** global profile instructions are separate from Comet browser's own
  "Comet memory" / Personal Search system (per comet-help.perplexity.ai), so setting your profile
  in the main app does not automatically carry into Comet's browsing-history-based personalization
  — these are documented as different systems on different help centers.
- **Sources:** https://www.perplexity.ai/help-center/en/articles/10352993-account-settings (last
  updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/10354948-how-should-i-fill-out-the-profile-section-of-my-settings
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/10352961-what-are-spaces
  ("Set custom AI instructions" section; last updated 2026-07-16). Checked 2026-07-22.
- **Volatility:** MEDIUM.

---

## 3. Projects / Spaces / Gems / GPTs (Perplexity's word: **Projects**)

- **Vendor's name for it:** **Projects.** Important: this help-center article's URL slug is still
  `what-are-spaces`, but its live title and body, as of the 2026-07-16 update, say **"Projects,"**
  not "Spaces." Perplexity has renamed the feature — see Traps below.
- **What it IS:** a dedicated workspace that bundles a topic's threads, files, connectors, and
  standing instructions in one place, instead of scattering them across separate one-off chats.
- **How to set it up:** click the Projects icon in the left sidebar → **+ New Project**. Projects
  are private by default. Click Share to invite people as Viewer or Contributor, or generate a
  link (optionally open to "anyone with the link," including non-account holders).
- **What it's genuinely for:** a running topic (a class, a client, a home renovation) where you
  don't want to re-explain the situation and re-upload the same files every time you open a new
  thread.
- **The ONE mistake people make:** assuming a Project behaves like Computer does elsewhere —
  the help page explicitly states, as of this writing, that **"Project-specific connectors and
  skills are not yet available."** People expect a Project to carry its own live Gmail/Drive
  connection or its own custom Skill; today it doesn't.
- **Tier:** file-upload limits are documented per tier and imply Projects require at least Pro:
  Pro = 50 files/project; Enterprise Pro and Max (individual) = 500 files/project; Enterprise Max
  = 5,000 files/project. Individual plans cap contributors at 5; Enterprise plans have no stated
  contributor cap but require contributors to be organization members. **NOT VERIFIED** whether
  Free accounts can create a Project at all — the fetched page does not say so explicitly.
- **What it does NOT do:** no per-Project connectors or Skills (yet, as above); max file size is
  50MB per file (paid tiers); cloud-synced files via Connectors count toward the same per-Project
  cap as manually uploaded ones.
- **Sources:** https://www.perplexity.ai/help-center/en/articles/10352961-what-are-spaces (title:
  "What are Projects?"; last updated 2026-07-16). Checked 2026-07-22.
- **Volatility:** HIGH — mid-rename, with file limits and connector/skill support explicitly
  flagged by the vendor as still changing.

---

## 4. File upload & knowledge

- **Vendor's name for it:** "Files" (session attachments) and Project-level "Files" (with app
  Connectors syncing into the same pool); generated output side is called **"Create files and
  apps."**
- **What it IS:** attaching your own documents so an answer can search inside them, not just the
  open web.
- **How to set it up:** in any thread, use the attach/paperclip control in the compose box for a
  one-off upload; inside a Project, add files to the Project's file area, or connect an app
  (Google Drive, SharePoint, OneDrive, Box, Dropbox) so its files sync in automatically.
- **What it's genuinely for:** grounding an answer in a specific PDF, spreadsheet, or set of
  reports you already have, rather than whatever the open web happens to say.
- **The ONE mistake people make:** treating "how many files can I upload" as one number. It isn't
  — files uploaded to an individual session count against a separate **weekly file-upload
  allowance**, while files added to a Project count against that Project's own cap (50 / 500 /
  5,000 depending on tier). People hit the session limit and don't realize Project uploads are a
  different bucket.
- **Tier:** Free = "basic file uploads (limited)," no numeric cap stated. Pro = 50 files/Project,
  weekly session-upload allowance described only as "average use" (no fixed number given).
  Enterprise Pro / Max(individual) = 500/Project. Enterprise Max = 5,000/Project, 10,000 in the
  personal "My Files" repository. File size cap for paid tiers = 50MB/file.
- **What it does NOT do:** for Enterprise, uploaded files are retained only **7 days** by default
  (documented). For Free/Pro/Max individual accounts, no explicit retention period for uploaded
  files was found on any page fetched — **NOT VERIFIED**.
- **Sources:** https://www.perplexity.ai/help-center/en/articles/10352961-what-are-spaces (file
  FAQ section; last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/11564572-data-collection-at-perplexity
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you
  (last updated 2026-07-22). Checked 2026-07-22.
- **Volatility:** MEDIUM.

---

## 5. Connectors / integrations

- **Vendor's name for it:** **Connectors** (also "App Connectors").
- **What it IS:** a link between Perplexity and an outside app (Gmail, Google Drive, Slack,
  Notion, Salesforce, and dozens more) so it can search that app's contents, or — inside Computer
  — actually take actions in it.
- **How to set it up:** Account Settings → Connectors (or, for Computer, Computer's own
  Connectors panel) → find the app → **Enable**/**Install** → complete its sign-in flow. To add
  a connector Perplexity doesn't ship natively, use **+ Custom connector**, which opens either a
  Local (Mac-only today) or Remote (MCP server URL) setup form.
- **What it's genuinely for:** letting an answer pull from your own inbox, docs, or ticket
  tracker — or, in Computer, letting it actually create a Linear ticket, post to Slack, or send
  an email on a connector's behalf.
- **The ONE mistake people make:** assuming every connector is read-only search. Several (Gmail,
  Slack, Linear, Salesforce, Notion) are documented as being able to take actions — open tickets,
  send messages, draft emails — inside Computer, not just retrieve information.
- **Tier:** first-party connectors ride on whatever tier you're using Computer/Ask under. Custom
  remote MCP connectors sit in Perplexity's help center under an "Enterprise Features" collection,
  which points toward Enterprise as the primary documented audience; whether individual Pro/Max
  accounts get the same custom-connector UI is **NOT VERIFIED** from the pages fetched (secondary
  sources claim Pro is included, but no vendor page confirmed it directly).
- **What it does NOT do:** organization admins can disable specific connectors org-wide or require
  per-connector approval; connector data respects the source app's own permissions (e.g. a
  SharePoint file's existing sharing settings still apply once synced in). What happens to
  already-synced data after you disconnect a connector is **NOT VERIFIED** — no page fetched
  states this explicitly.
- **Sources:** https://www.perplexity.ai/help-center/en/articles/10352993-account-settings (last
  updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/13837784-what-is-computer
  (last updated 2026-07-16). Checked 2026-07-22.
- **Volatility:** HIGH — see the Remote-MCP contradiction noted under Traps.

---

## 6. Extensions / plug-ins / skills / MCP

- **Vendor's name for it:** **Skills** (inside Computer) for reusable task playbooks; **MCP**
  (Model Context Protocol) for wiring in outside tools as connectors. The older feature called
  **"Shortcuts" has been fully replaced by Skills** — stated directly in Perplexity's own Account
  Settings page.
- **What it IS:** a Skill is a saved set of instructions Computer follows to do one kind of task
  the same way every time (build a slide deck, run a structured research pass, draw a chart). MCP
  is the underlying plumbing that lets an outside tool or server plug into Perplexity as a
  connector.
- **How to set it up:** Computer → **Skills** page → **Create skill** → either "Create with
  Perplexity" (describe the task in conversation, no technical knowledge needed) or "Upload a
  skill" (a `.zip` with a `SKILL.md` at its root, or a bare `.md` file, containing YAML
  frontmatter with a lowercase-hyphenated `name` and a `description` — max file size 10MB). For
  MCP: Account Settings → Connectors → **+ Custom connector** → Local (installs a helper app,
  PerplexityXPC, macOS only) or Remote (server URL, auth method — None/API Key/OAuth 2.0 —
  transport type).
- **What it's genuinely for:** standardizing a recurring output (always build slides the same
  way) or reaching a tool Perplexity has no built-in connector for.
- **The ONE mistake people make:** trusting an open-source local MCP server the same way you'd
  trust a built-in Perplexity connector. The vendor's own docs say plainly: "local MCP servers are
  not officially recognized by Perplexity or Apple" — you are expected to vet them yourself.
- **Tier:** Skills live inside Computer, so they're gated by whichever tier grants Computer access
  (documented monthly credit differences: Max gets 10,000 credits/month plus a stated
  time-limited 35,000-credit bonus; Pro gets a stated 4,000-credit bonus, with its ongoing monthly
  allotment **NOT VERIFIED** in the pages fetched). Local MCP is "rolling out to paid subscribers
  first" per the vendor.
- **What it does NOT do:** built-in ("Perplexity Skills") cannot be deleted, only your own created
  or uploaded ones can; as of the pages checked, one Perplexity page says Remote MCP is "coming
  soon" while another, same-day-updated page walks through a fully built Remote MCP setup flow —
  see Traps below.
- **Sources:** https://www.perplexity.ai/help-center/en/articles/13914413-how-to-use-computer-skills
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/11502712-local-and-remote-mcps-for-perplexity
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/10352993-account-settings
  ("Shortcuts have moved to Skills"; last updated 2026-07-16). Checked 2026-07-22.
- **Volatility:** HIGH.

---

## 7. Automations / scheduled tasks

- **Vendor's name for it:** two separate, vendor-named systems exist side by side: **"Perplexity
  Tasks"** (also called Scheduled Searches, older, in Settings → Notifications) and **"Scheduled
  Tasks in Computer"** (newer, full agent automation, in Computer → Tasks). Perplexity published a
  dedicated article just to help people tell the two apart.
- **What it IS:** work that runs automatically on a schedule you set, without you re-asking.
  Perplexity Tasks are simple recurring searches/summaries/price alerts. Computer Scheduled Tasks
  are full agent runs that can use connectors, generate documents, browse the web, and notify you.
- **How to set it up:**
  - *Perplexity Tasks:* Settings → Notifications → **+ New schedule** → type a prompt (e.g.
    "Send me a daily summary of AI news"), pick a model, set cadence (Daily/Weekly), save.
    Price Alerts (stock/crypto) live in the same panel.
  - *Computer Scheduled Tasks:* open Computer → describe the recurring task and its cadence in
    plain language (e.g. "Every weekday at 8am, summarize new posts from X and email me") →
    Computer proposes a schedule and confirms it will use credits → approve.
- **What it's genuinely for:** recurring monitoring, inbox checks, competitive tracking, and
  briefings you'd otherwise have to remember to ask for each time; the Computer version can chain
  steps (check Gmail → draft a reply → post a Slack summary).
- **The ONE mistake people make:** expecting a "pause" option. There isn't one, and Perplexity
  says so directly: "Stopping a task removes it permanently. There is no separate paused state —
  if you want to bring a task back later, recreate it."
- **Tier:** Perplexity Tasks are not stated as tier-gated in the pages fetched — **NOT VERIFIED**
  for Free-tier access specifically. Computer Scheduled Tasks require Computer access (paid);
  Max and Enterprise Max plans get monthly complimentary Computer credits, documented; Pro's
  steady-state (non-bonus) monthly credit allotment for Computer was **NOT VERIFIED** from the
  pages fetched. Minimum cadence for a Computer Scheduled Task is hourly — sub-hourly is not
  supported. Each Computer conversation can own up to 15 scheduled tasks.
- **What it does NOT do:** if credits run out or Computer access lapses mid-cycle, a scheduled
  run is skipped (auto-retried a few times), not silently cancelled; the older Perplexity Tasks
  panel has no bulk-delete — each must be deleted one at a time.
- **Sources:** https://www.perplexity.ai/help-center/en/articles/11521526-perplexity-tasks (last
  updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/20260710-how-to-delete-scheduled-tasks-perplexity-tasks-vs-computer-scheduled-tasks
  (last updated 2026-07-10) · https://www.perplexity.ai/help-center/en/articles/10352993-account-settings
  ("Notifications" section; last updated 2026-07-16). Checked 2026-07-22.
- **Volatility:** HIGH — the vendor's own disambiguation article, published within the last two
  weeks of this check, is itself evidence this area is mid-consolidation.

---

## 8. Modes people miss

- **Vendor's name for it:** several distinct modes selected from a mode picker in the compose
  box — **Best**, **Pro Search**, **Research** (a major update called **"Advanced Deep
  Research"**), **Create files and apps**, **Model Council**, plus the separate **Comet**
  (agentic browser) and **Voice Assistant** (mobile).
- **What it IS:** Perplexity is not one mode — Best auto-picks a model for quick answers; Pro
  Search does deeper multi-source research with a model you can choose; Research/Deep Research
  runs dozens of searches and hundreds of sources autonomously and writes a full report; Create
  files and apps turns a prompt into an actual file (report, spreadsheet, dashboard, or simple web
  app); Model Council runs the same question through three models at once and merges the
  answers; Comet is a full Chromium browser with an AI assistant panel that can act on the pages
  you're viewing; the Voice Assistant is a spoken-conversation layer on iOS/Android.
- **How to set it up:** pick the mode from the selector in the search box (web, Mac app, mobile).
  Deep Research/Advanced Deep Research now asks clarifying questions first on broad topics, shows
  live progress, and streams the report into an editable, shareable file. Model Council: on web,
  click the **+** button next to the search bar → **Model Council**; click "3 models" in the
  search bar to toggle which three participate, each with its own optional "Thinking" (deeper
  reasoning) toggle. Comet: download from Comet's own site, install, and optionally set as
  default browser. Voice: tap the voice/mic icon in the mobile app's input box (microphone
  permission required).
- **What it's genuinely for:** matching effort to the question — Best for a quick fact, Research
  for something that would otherwise take you an afternoon of manual reading, Create files and
  apps for something you'd otherwise build by hand in a spreadsheet or slide tool, Model Council
  for a decision where you specifically want to catch one model's blind spot with another's.
- **The ONE mistake people make:** assuming **Perplexity Pages** (a "convert this answer into a
  shareable page" canvas feature that older guides describe) is still live. As of the page's own
  July 2026 update, "Create page" is **temporarily retired** and "Convert to Page" is stated to be
  "returning shortly with enhanced capabilities" — right now it is not available.
- **Tier:** Best = all tiers. Research: Free gets very limited access (documented as low as
  1/month on the plan-comparison table); Pro/Max get materially more, with Max and Enterprise Max
  running Research on the most capable available models (documented as the top-tier models used
  for Deep Research on Max). Create files and apps: no access on Free; monthly-limited on
  Pro/Education Pro/Enterprise Pro; near-unlimited on Max/Enterprise Max. **Model Council: Max and
  Enterprise Max only** — explicitly not available to Free, Pro, Education Pro, or Enterprise Pro,
  web only. Comet's base browser is free to install; its most capable assistant mode ("Max
  Assistant") is a Max-tier perk with the highest weekly query limit.
- **What it does NOT do:** in Research mode you cannot manually pick a model — Research always
  auto-selects its own model combination; Model Council is web-only (not mobile) as of the page
  checked; Pages/Create-page is currently off, not merely hard to find.
- **Sources:** https://www.perplexity.ai/help-center/en/articles/10738684-what-is-research-mode
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/13600190-what-s-new-in-advanced-deep-research
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/13641704-what-is-model-council
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/10352968-perplexity-pages
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/11172798-getting-started-with-comet
  (last updated 2026-07-16) · https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you
  (last updated 2026-07-22). Checked 2026-07-22.
- **Volatility:** HIGH — Deep Research was itself just rebuilt ("Advanced Deep Research"), Model
  Council is newly launched, and Pages is mid-retirement/relaunch.

---

## How a reader verifies a Perplexity answer against its sources

This is Perplexity's signature mechanic and connects directly to the Episode 3 "ask AI for its
sources" material. Every answer carries **numbered citations** inline; each number links to the
original source (article, paper, dataset) so the reader can open it directly rather than take the
summary on faith (documented on the "How does Perplexity work?" page, last updated 2026-05-01).
Pro subscribers get "10x as many citations per answer" versus the free experience (documented on
the "What is Perplexity Pro?" page, last updated 2026-07-21) — meaning citation density itself is
a paid-tier differentiator, not just a nice-to-have. For Brain/Computer specifically, every stored
memory entry "links back to its source" (session, file, or connector) so a reader can trace not
just a web answer but a piece of stored personalization or agent context back to where it came
from (documented on the Brain page, last updated 2026-07-16). The practical verification move to
teach: click the citation number, don't just trust the prose summary above it.

---

## Screen-recordable moments

1. **A Skill firing mid-conversation** — ask Computer for a presentation and watch the Slides
   Skill visibly activate and hand off to another Skill for formatting. Text can't show the
   hand-off; video can.
2. **Creating a Computer Scheduled Task in plain language** — type "every weekday at 8am, do X"
   and watch Computer propose the cadence back to you for a yes/no confirmation before it commits
   credits.
3. **Opening a stored Memory entry and tracing it to its source** — Settings → Memory → click an
   entry → see it link back to the exact session or file it came from. This is the clearest visual
   bridge to the Episode 3 "ask for receipts" lesson.
4. **Adding a Custom Remote Connector (MCP)** — filling in Name / Server URL / Auth method /
   Transport and the "I understand the risk" acknowledgement checkbox makes concrete what a
   connector actually is, instead of leaving it abstract.
5. **Model Council's three-model side-by-side view** (Max/Enterprise Max only) — visually distinct
   from every other mode, and it's the cleanest way to show "one model's blind spot, caught by
   another's" in real time.
6. **Clicking a numbered citation** to jump straight to the underlying source — the single most
   important gesture Perplexity teaches, and the one most guides skip over as "obvious."

## Traps and corrections

- **"Spaces" is now "Projects."** The help-center article at
  `perplexity.ai/help-center/en/articles/10352961-what-are-spaces` still has that URL slug, but as
  of its 2026-07-16 update its title and body both say **"Projects."** Any lesson or reference
  still saying "Spaces" is teaching a retired name.
- **Perplexity Pages is currently off.** The dedicated help page (last updated 2026-07-16) states
  the "Create page" feature is "temporarily retired" and "Convert to Page" is coming back "shortly
  with enhanced capabilities" — meaning any instruction to "turn your answer into a shareable Page"
  will not work right now, regardless of how recent the guide describing it looks.
- **"Shortcuts" no longer exists — it's "Skills."** Perplexity's own Account Settings page states
  plainly: "Shortcuts have moved to Skills." Guides describing the old Shortcuts UI are describing
  a feature that has been replaced, not just renamed cosmetically — the setup flow (SKILL.md,
  YAML frontmatter, conversational skill-building) is new.
- **There are two separate scheduling systems, not one.** "Perplexity Tasks" (Settings →
  Notifications) and "Scheduled Tasks in Computer" (Computer → Tasks) are managed in different
  places, have different deletion mechanics (one has no bulk-delete), and Perplexity had to publish
  a dedicated article (2026-07-10) explaining how to tell which one a given task belongs to —
  itself a sign this is a live source of user confusion.
- **Perplexity's own documentation currently disagrees with itself on Remote MCP.** "Local and
  Remote MCPs for Perplexity" (updated 2026-07-16) states "Remote MCP is coming soon." The
  separate "Adding Custom Remote Connectors" page (also updated 2026-07-16) gives a complete,
  detailed setup flow for Remote MCP connectors already in production, including Cloudflare Access
  integration. Both were checked on 2026-07-22 and both say what's quoted above — this reads as a
  staggered rollout (Enterprise-first) that the general overview page hasn't caught up to yet, but
  it should be verified again before filming rather than assumed resolved.
- **Memory, Brain, and AI Data Retention are three different switches**, easy to conflate because
  all three live near each other in Settings. Turning off model-training retention does not stop
  Memory from storing preferences; turning off Memory does not turn off Brain (which has its own
  toggle in Computer settings); none of the three is a single master "privacy" switch.
