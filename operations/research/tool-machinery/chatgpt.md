tool: ChatGPT
vendor: OpenAI
tiers_as_of_2026-07-22:
  - Free — CA$0/month
  - Go — CA$11/month
  - Plus — CA$25/month
  - Pro — from CA$136/month
  - Business / Enterprise / Edu — contact sales (per-seat, monthly or annual)
  # Source: https://chatgpt.com (redirect target of openai.com/chatgpt/pricing), fetched 2026-07-22.
  # Prices displayed in CAD because the fetch was geo-located to Canada — the vendor page
  # localizes currency by IP. Press coverage (not vendor-primary, cited only for the fact
  # a launch happened) has separately reported USD list prices of $0 / $8 / $20 / $200 for
  # these same four tiers; treat the CAD figures above as the verified-on-this-date reading
  # and the USD figures as directional only. Re-check in USD before publishing any number.
checked_utc: 2026-07-22T18:45:32Z

---

## 1. Memory / personalisation

**Vendor's name for it:** Memory (current system: "memory summary"; legacy system still selectable: "saved memories")

**What it IS:** A setting that lets ChatGPT automatically notice and reuse details from your chats, uploaded files, and connected apps so you don't have to repeat them — you can see a running summary of what it has stored and edit or delete any of it.

**How to set it up:** Settings → Personalization → Memory. Toggle "Enable memory" on or off. The memory summary shows what's stored; type into the text box at the bottom of the summary to correct it, or highlight specific text in the summary to fix just that part. To revert to the older "saved memories" style, go to Settings → Memory → Saved memories, then select "Try improved memory" to switch back. (documented)

**What it's genuinely for:** Not repeating your job, preferences, or ongoing projects at the start of every chat. It is a synthesis of patterns across past chats, not a literal transcript store.

**The ONE mistake people make:** Assuming "delete the memory summary" erases everything ChatGPT knows about you. It does not — the underlying chats, archived chats, files, and any connected-app content that contain the same information are separate sources and must each be deleted individually to fully remove something. (documented — help.openai.com/en/articles/8590148)

**Tier:** Free, Go, Plus, Pro, Business, Enterprise, Edu all have memory in some form; the amount/context is explicitly rationed by tier — Free = "Limited memory and context," Go = "Longer memory," Plus = "Expanded memory and context," Pro = "Maximum memory and context" (documented, chatgpt.com pricing page).

**What it does NOT do:** It does not read connected-app content unless memory is enabled and that app is connected; it does not apply inside Temporary Chats (no read, no write); the visible "memory summary" is explicitly not a complete list of everything remembered — OpenAI's own FAQ says some details are deliberately left out of the summary view. Deleted "saved memories" (legacy system) are retained in a deletion log for up to 30 days for safety/debugging.

**Sources:** https://help.openai.com/en/articles/8590148-memory-faq — page marked "Updated: 4 days ago" (≈2026-07-18) · checked 2026-07-22.

**Volatility:** HIGH — OpenAI replaced the entire memory UX (from manual "saved memories" to an auto-synthesized "memory summary" with a visible sources panel) recently enough that the help page still carries a whole "Legacy memory system" section to explain the switch.

---

## 2. Custom instructions / profile

**Vendor's name for it:** Custom Instructions

**What it IS:** A standing text box where you write what ChatGPT should know about you and how you want it to respond — it gets applied to every new message automatically, not just the one you type it into.

**How to set it up:** Web & Desktop: Settings → Personalization → make sure "Enable customization" is toggled ON → enter text in the Custom Instructions field. iOS & Android: Settings → Customize ChatGPT → toggle "Enable customization" ON → enter text. Changes apply immediately, including to conversations already open. (documented)

**What it's genuinely for:** Standing facts and preferences (role, tone, formatting rules, things to avoid) that should hold across every conversation — the opposite of memory, which is inferred rather than declared.

**The ONE mistake people make:** Treating custom instructions as private/sandboxed from third-party tools. OpenAI's own doc warns: "If you use third party plug-ins, then the model may provide plug-in developers with relevant information from your instructions." Anything written here can surface to a connected plugin/app if one is in use.

**Tier:** Available on all plans (Free, Go, Plus, Pro, Business, Enterprise, Edu) on Web, Desktop, iOS, Android — but the character allowance is tiered: Free and Go = 1,500 characters; Plus, Pro, Enterprise, Business, and Education = 5,000 characters. (documented)

**What it does NOT do:** It is not versioned per-conversation — editing it changes only future messages; past conversations keep referencing the old wording unless you clear that chat history. It is not exported/deleted independent of your account: instructions are deleted within 30 days of account deletion, same as other account data. There is no equivalent to custom instructions available through the API — the API uses system messages instead.

**Sources:** https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions — page marked "Updated: 5 days ago" (≈2026-07-17) · checked 2026-07-22.

**Volatility:** LOW — the mechanism and menu path have been stable; the character-limit numbers are the part most likely to move.

---

## 3. Projects / Spaces / Gems / GPTs (containers)

ChatGPT has two distinct container concepts. Cover both.

### 3a. Projects

**Vendor's name for it:** Projects

**What it IS:** A workspace that groups related chats, uploaded files, and its own standing instructions together, so ChatGPT stays on-topic for a specific piece of ongoing work without you re-explaining context every time.

**How to set it up:** Click "New project" in the sidebar → name it, pick an icon/color. Add files via the project's upload area. Add project instructions via the three-dot menu (top right of the project) → Project settings — these instructions apply only inside that project and override your global custom instructions. Existing chats can be dragged into a project or moved via the chat's menu → "Move to project" (chats created with a GPT cannot be moved in). (documented)

**What it's genuinely for:** Recurring, evolving work — a study guide, a client's ongoing case, a research thread — where you want the files and prior chats available automatically instead of re-uploading each session.

**The ONE mistake people make:** Assuming a project always sees your general ChatGPT memory. Whether it does depends on a choice made at project creation ("project-only" vs "default" memory) and on plan type — Enterprise/Edu projects are contained by default and cannot reference outside chats at all; sharing a project auto-switches it to project-only memory permanently, and this cannot be reverted.

**Tier:** Free, Go, Plus, Pro, Business, Enterprise, and Edu can all use projects. Sharing a project with teammates is available to all of those tiers as of an October 22, 2025 rollout (previously Business/Enterprise/Edu only). File-count limits per project: Free = 5 files, Go/Plus = 25 files, Edu/Pro/Business/Enterprise = 40 files (max 10 uploaded simultaneously). Collaboration limits when sharing: Free = 5 files/5 collaborators, Go & Plus = 25 files/10 collaborators, Pro = 40 files/100 collaborators.

**What it does NOT do:** Project instructions do not apply outside that project (they override, not add to, your global custom instructions while inside it). The Google Drive app does not support advance-sync when added inside a project — search still works, but content isn't pre-indexed. Deleting a project is irreversible and removes all its chats/files/instructions for every collaborator.

**Sources:** https://help.openai.com/en/articles/10169521-projects-in-chatgpt — page marked "Updated: 8 days ago" (≈2026-07-14) · checked 2026-07-22.

**Volatility:** MEDIUM — the core concept is stable, but sharing/collaboration limits and the memory-scoping rules were still being actively rolled out (the doc references a "4-week early access period until October 23, 2025" for shared projects, so the surrounding controls are newer than the feature itself).

### 3b. GPTs

**Vendor's name for it:** GPTs (also called "custom GPTs")

**What it IS:** A saved, reusable configuration of ChatGPT — instructions, reference files, and selected capabilities bundled together — that behaves like a purpose-built assistant you (or others) can open and chat with.

**How to set it up:** Open "GPTs" in the ChatGPT sidebar (or chatgpt.com/gpts) → Select "Create" → build conversationally or configure directly in the editor (Instructions, Conversation starters, Knowledge files, Capabilities like web browsing/image generation, and either Apps or Actions — a GPT can use one or the other, not both) → test in preview → save. (documented)

**What it's genuinely for:** Packaging a repeatable task (a specific writing style, a specialized coach, a document-review flow) so it can be reused or handed to someone else without re-explaining the setup each time.

**The ONE mistake people make:** Assuming a GPT remembers you or benefits from your custom instructions/memory. It explicitly does not: "GPTs do not use saved memory, custom instructions, or previous conversations. Each conversation starts fresh." Every chat with a GPT is a blank slate except for what's built into the GPT itself.

**Tier:** Anyone signed in can use a GPT that's public or shared with them. Creating or editing a GPT requires a paid subscription — the chatgpt.com pricing page places "Projects, scheduled tasks, and custom GPTs" as a Plus-tier-and-up feature (i.e., not on Free or Go).

**What it does NOT do:** A GPT cannot be embedded outside ChatGPT (use the API for that). GPT builders cannot see individual users' conversations with their GPT. If you downgrade from a GPT-building plan, existing GPTs still run but can no longer be edited or duplicated. Canvas is not available for GPTs built on GPT-5.5-or-later models (see §8).

**Sources:** https://help.openai.com/en/articles/8554407-gpts-in-chatgpt — page marked "Updated: 6 days ago" (≈2026-07-16) · checked 2026-07-22.

**Volatility:** MEDIUM — the container concept is old and stable (GPTs launched 2023), but GPTs now sit alongside the new Plugins/Skills system (§6) and interact with it ("A GPT can use either apps or actions, but not both"), so the surrounding ecosystem is shifting even where GPTs themselves are not.

---

## 4. File upload & knowledge

**Vendor's name for it:** File uploads (in a chat or Project) and Knowledge (inside a GPT); saved files live in Library.

**What it IS:** Any file you upload or that ChatGPT generates is stored in a personal "Library" you can browse and reuse later, separate from your daily upload limits; a GPT builder can also attach fixed reference files ("Knowledge") that the GPT always has access to.

**How to set it up:** Attach a file via the composer's "+" (attachment) button in any chat, or drag it into a Project. To reuse a previously uploaded/generated file: composer "+" → "Add from library." To browse/search/delete everything stored: open Library from the left sidebar; a Storage button shows usage against your limit. Inside a GPT builder, add files under the Knowledge section of Configure. (documented)

**What it's genuinely for:** Giving ChatGPT a fixed, reliable reference (a handbook, a dataset, a set of guides) instead of pasting the same document into every new chat.

**The ONE mistake people make:** Assuming Temporary Chat files, or ChatGPT Health files, get saved to Library the way normal chat files do. They explicitly do not — both are excluded from Library entirely.

**Tier — storage caps:** Free = 500 MB, Go = 4 GB, Plus & Business = 20 GB, Pro = 100 GB of Library storage. Per-file hard limits (independent of plan): 512 MB per file; text/document files capped at 2M tokens per file (not applied to spreadsheets); CSV/spreadsheet files ≈50 MB max; images 20 MB max. GPT Knowledge: up to 20 files per GPT, 512 MB each (separate cap from conversation/Library limits).

**What it does NOT do:** Deleting a chat that contains files does NOT delete those files from Library — they must be deleted separately. Deleted files sit in "Recently deleted" before permanent removal from OpenAI's systems within 30 days (subject to legal/security holds). Uploading the same filename twice in a Project prompts a choice (Upload anyway / Skip) rather than silently overwriting.

**Sources:** https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt — "Updated: 7 days ago" (≈2026-07-15) · checked 2026-07-22.

**Volatility:** MEDIUM — Library itself is a relatively new consolidation of what used to be scattered per-chat attachments; storage-cap numbers by tier are the part most likely to be revised.

---

## 5. Connectors / integrations

**Vendor's name for it:** Apps (renamed from "Connectors" — the old term "connectors" is now used only informally / for the subset of apps that sync data in advance). As of **July 9, 2026**, apps are discovered through a new **Plugins Directory** rather than a standalone app directory (see §6 — the container changed again very recently).

**What it IS:** A way to let ChatGPT read from — and in some cases act inside — an outside service (Gmail, Google Drive, SharePoint, Slack, Canva, etc.) from within a normal conversation, instead of you copy-pasting content back and forth.

**How to set it up:** Open the Plugins Directory (via the sidebar or the composer's "+" → "More") → find the plugin containing the app you want → select "Connect" → complete that service's login/authorization flow. To change how much ChatGPT can do without asking first: profile menu → Settings → Apps → App Preferences → "Ask permission" (options: Always ask / Any changes / Important actions [default] / Never ask — "Never ask" may not be offered as a workspace-wide default). To remove access: Settings → Apps → disconnect (workspace admins disconnect via Workspace settings → Apps).

**What it's genuinely for:** Letting ChatGPT search or reference your own files/email/documents live, rather than uploading a static copy — and, with permission, taking a bounded action (drafting an email, updating a doc) on your behalf.

**The ONE mistake people make:** Assuming "app permission" settings control what data an app *can* reach. They don't — the vendor is explicit: "App permissions do not grant an app new access. The data and actions available to an app are determined by the app, the access granted when it was connected, and any workspace controls." Changing the permission setting only changes when ChatGPT asks before using access it already has; to actually revoke access you must disconnect the app.

**Tier:** Apps are enabled by default for Business workspaces; disabled by default for Enterprise/Edu workspaces (admins turn them on). For individual Free/Go/Plus/Pro accounts, which specific apps and capabilities are available varies by "plan, workspace, role, supported surface, region, and the capabilities of its included apps" per OpenAI's own wording — there is no single consumer-tier gate documented; check the Plugins Directory for current per-app availability. **NOT VERIFIED:** an exhaustive list of which named apps (Gmail, Drive, etc.) are available on Free vs Go vs Plus vs Pro specifically — OpenAI does not publish a static table.

**What it does NOT do:** Apps do not get special/expanded rate limits — they follow your plan's normal ChatGPT usage limits (external services may impose their own separate caps). Business/Enterprise/Edu data accessed via apps is not used for model training by default; for Free/Plus/Go/Pro, it may be used if "Improve the model for everyone" is on. Connecting an app in ChatGPT never overrides your actual permissions in the source system — if you can't see a file in Google Drive itself, an app can't surface it either.

**Sources:** https://help.openai.com/en/articles/11487775-connectors-in-chatgpt (page title now reads "Apps in ChatGPT") — "Updated: 6 days ago" (≈2026-07-16) · checked 2026-07-22.

**Volatility:** HIGH — this is the single most-renamed piece of ChatGPT's machinery: "Connectors" (2024) → "Apps" (renamed ~Dec 17, 2025 per the help article's own changelog note) → discovery moved under a new "Plugins Directory" (July 9, 2026). Any guide older than mid-2026 is describing an interface that no longer exists.

---

## 6. Extensions / plug-ins / skills / MCP

**Vendor's name for it:** Plugins (the discovery/packaging layer, since July 9, 2026), which can each bundle **Skills** and/or **Apps** (§5) and/or **app templates**. Custom integrations are built with the **Model Context Protocol (MCP)** via the **Apps SDK**.

**What it IS:** A "plugin" is a listing in the Plugins Directory that packages together the pieces needed for one workflow — written instructions ("skills"), connections to outside tools ("apps"), and/or a setup wizard for an org's own tool ("app template"). A "skill" specifically is a reusable, shareable set of instructions (and optionally example code) that tells ChatGPT how to carry out one specific task the same way every time.

**How to set it up — Plugins:** Sidebar → Plugins → browse the Plugin Directory → open a listing to see its included apps/skills/requirements → "Connect" the required app if prompted. **Skills:** Sidebar → Plugins → Skills tab → "Create" (either "Create with chat," which walks you through it conversationally using OpenAI's built-in `skill-creator` skill, or "Create with editor" for direct authoring) → or "Upload" a skill file from your computer (uploaded skills are automatically scanned; some are flagged "Needs Review" or "Blocked"). Workspace admins manage plugin rollout at Workspace settings → Plugins, and the underlying apps at Workspace settings → Apps.

**What it's genuinely for:** Turning a workflow you've had to re-explain to ChatGPT more than once (a specific report format, a QA checklist, a multi-step research process) into something it runs the same way automatically, and optionally sharing that with a team so nobody rebuilds it.

**The ONE mistake people make:** Confusing this "Plugins" with OpenAI's original 2023 ChatGPT Plugins (third-party API plugins, since retired in favor of GPT Actions). Same word, unrelated system, four years apart — see Traps section below. The second most common mistake: uploading a skill from an untrusted source without reviewing it — OpenAI's own scan "should not replace your own review... when determining whether an uploaded skill is appropriate to use."

**Tier:** The Plugin Directory itself is visible on every plan, but installing/using a given plugin depends on plan, workspace, role, region, and the plugin's included apps. Personal Skills are documented as "generally available for ChatGPT Business, Enterprise, Healthcare, and Edu users" — **NOT VERIFIED** whether individual Free/Go/Plus/Pro accounts get personal Skills; the vendor's Skills article names only the four workspace-style tiers. Skills are off by default for Enterprise/Edu (OpenAI states it plans to turn them on by default for Enterprise starting July 23, 2026, absent an opt-out).

**What it does NOT do:** Skills used inside Codex or the API are governed separately from Skills used in ChatGPT proper. Personal Skills do not sync automatically between desktop and web/mobile — they must be added on each surface. A plugin listing being visible does not mean it's usable — a required app inside it can still be disabled for your workspace/role, in which case the plugin is blocked even though you can see it.

**Sources:** https://help.openai.com/en/articles/20001256-plugins-in-chatgpt-and-codex — "Updated: 7 days ago" (≈2026-07-15); https://help.openai.com/en/articles/20001066-skills-in-chatgpt — "Updated: 3 days ago" (≈2026-07-19) · checked 2026-07-22.

**Volatility:** HIGH — this entire layer (Plugins Directory, Skills, app templates) is younger than two weeks old as of the check date and is explicitly described by OpenAI as still rolling out (Enterprise Skills default-on date is in the future: July 23, 2026).

---

## 7. Automations / scheduled tasks

**Vendor's name for it:** Scheduled Tasks (sometimes just "Tasks")

**What it IS:** A way to tell ChatGPT to do something once at a future time, repeatedly on a schedule, or to keep checking a source and only notify you when something meaningful changes ("monitoring tasks") — without you having to reopen the chat and ask again.

**How to set it up:** Open "Scheduled" from the ChatGPT sidebar (web, mobile, or desktop) → create a new task and set its timing. Or ask in a normal chat, e.g. "Let me know when my package gets delivered," and ChatGPT offers to schedule it. To manage all tasks: Settings → Notifications → "Manage tasks," or the three-dot menu on any task pill → "Manage tasks." (documented)

**What it's genuinely for:** Recurring check-ins (a Monday morning briefing, a weekly spending review) and passive monitoring (watching for a price drop or a status change) where you want to be pinged rather than remembering to ask.

**The ONE mistake people make:** Creating a task inside a Project that has files attached and expecting the task to use those files — it can't: "If you create a task in a project that has files, the task won't be able to access those project files." A second common trap: deleting the chat a task lives in, which silently pauses the task rather than deleting it outright.

**Tier:** Documented availability is internally inconsistent on the vendor's own page — the FAQ prose states tasks are available "globally to Plus, Pro, Business, and Enterprise users," but the same page's usage-limits table gives Go users an active-task cap ("Go users can have up to 3 active tasks"), implying Go does have access. Treat Go's status as **documented-but-contradictory**; Free does not appear to have tasks at all under either version of the text. Active task limits: Go up to 3, Plus up to 5, Business/Edu up to 10, Pro/Enterprise up to 15.

**What it does NOT do:** Tasks cannot run more than once per hour. They are not supported with Voice chats or with GPTs. Pro-series (reasoning) models are excluded — "supported by all ChatGPT models except Pro models." There is no webhook/event-triggered version — "Scheduled tasks don't currently support webhooks," so they suit recurring check-ins, not instant reactions to an external event. Deleting a task does not delete its associated chat.

**Sources:** https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt — "Updated: 3 days ago" (≈2026-07-19) · checked 2026-07-22.

**Volatility:** MEDIUM — the mechanism is fairly settled, but the page itself documents an active UI overhaul ("We're making scheduled tasks easier to create and manage... with a dedicated Scheduled page") and contains the tier contradiction noted above, both signs the tier/limit numbers are still moving.

---

## 8. Modes people miss

### Voice

**Vendor's name for it:** ChatGPT Voice, with three selectable options: **Live**, **Advanced**, **Standard**.

**What it IS:** A spoken back-and-forth with ChatGPT. "Live" (the current default experience, running on a model called GPT-Live-1, or GPT-Live-1 mini on Free) listens and speaks at the same time so it can be interrupted mid-sentence; "Advanced" is the prior real-time experience, kept around specifically because it still supports video/screen-sharing on mobile; "Standard" transcribes your speech to text first, then replies.

**How to set it up:** Select the Voice icon in the composer (web or mobile). To switch between the three modes: Settings → Voice → choose Live, Advanced, or Standard (options shown depend on plan/region/app version).

**What it's genuinely for:** Hands-free, conversational use (driving via Apple CarPlay, cooking, walking) where typing isn't practical — Live specifically supports web search and memory mid-conversation, not just Advanced.

**The ONE mistake people make:** Assuming "Advanced Voice Mode" (the name most guides still use) is the current experience — it's now the second-tier fallback option, kept specifically for video/screen-share on mobile; "Live" is the default people are actually served today. A second trap: Live cannot pull files from your Library — you can attach a file manually but it won't search your saved files the way text chat does.

**Tier:** All plans get some Voice. Usage is rationed on a rolling 24-hour basis: Free = limited access to GPT-Live-1 mini only; Go & Plus = up to 1 hour on Instant intelligence, 1 hour on Medium/High, 2 hours on GPT-Live-1 mini; Pro ($100/mo tier) = up to 12 hours Instant, 12 hours Medium/High, 24 hours mini; Pro ($200/mo tier) = unlimited GPT-Live-1. A single Live session caps at 2 hours regardless of plan.

**What it does NOT do:** Live does not (at launch) support video, screen-sharing, connected apps, or plugins — for those, you must switch to Advanced. Preset "personality" styles don't apply to Live. Audio/video clips are retained 30 days tied to the chat transcript; they are not used for training unless you separately opt in (and Business/Enterprise/Edu users cannot opt in at all).

**Sources:** https://help.openai.com/en/articles/8400625-voice-mode-faq (page now titled "ChatGPT Voice") — "Updated: 5 days ago" (≈2026-07-17) · checked 2026-07-22.

**Volatility:** HIGH — the vendor's own page notes two paid-Pro price points ($100 and $200/month) with different Voice allowances, and Live is described as still rolling out ("ChatGPT voice chats with search are slowly rolling out... over the coming days" — from the separate Search article). The three-way Live/Advanced/Standard split is new enough that most existing guides only know "Advanced Voice Mode."

### Canvas

**Vendor's name for it:** canvas

**What it IS:** A separate writing/coding pane that opens alongside the chat so you can directly edit a document or piece of code, rather than reading it back paragraph-by-paragraph in the chat stream.

**How to set it up:** Ask for something long-form or code-like and ChatGPT often opens canvas automatically (triggers around content longer than ~10 lines); or explicitly say "open a canvas" / "use canvas," or type "/" then select "canvas" from the composer's toolbox.

**What it's genuinely for:** Iterative editing — highlighting a specific paragraph or code block and asking for a targeted fix, using built-in shortcuts (Suggest edits, Adjust length, Change reading level, Add comments, Fix bugs, Port to another language), and stepping back through version history.

**The ONE mistake people make:** Trying to use canvas with the newest reasoning/flagship models. The vendor states plainly: "Canvas is not supported by GPT-5.5 or later models" and "Canvas is not available with pro-series models." People assume canvas is a universal feature when it's actually tied to specific, older model families.

**Tier:** Sharing a canvas is available on every plan — "Free, Plus, Pro, Team, Enterprise, and Edu." Available on Web, Windows, and macOS; not yet on mobile ("Coming soon").

**What it does NOT do:** No advanced text formatting beyond bold/italic/headers/lists. Only Python can be executed directly inside canvas today (other languages are planned but not live). React/HTML preview may fail to load external packages if a workspace's "Allow canvas code to access the network" setting is off.

**Sources:** https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it — "Updated: 8 days ago" (≈2026-07-14) · checked 2026-07-22.

**Volatility:** HIGH — canvas being incompatible with GPT-5.5+ models means its usable surface shrinks every time OpenAI ships a new default model, independent of anything canvas itself does.

### Data analysis (formerly "Code Interpreter" / "Advanced Data Analysis")

**Vendor's name for it:** Data analysis

**What it IS:** ChatGPT's ability to open a file you upload, write and run Python code against it in a private sandbox, and give back tables, charts, or calculated answers instead of guesses.

**How to set it up:** Upload a structured file (spreadsheet, CSV, PDF, or text/data file) into a chat and describe what you want to learn — no separate toggle needs to be found; ChatGPT invokes it automatically when useful. Charts can be switched between static-image and interactive views (bar/line/pie/scatter support interactive mode).

**What it's genuinely for:** Ad hoc analysis without opening a spreadsheet app — summarizing trends/outliers, running statistics, or producing a specific chart, with the underlying Python code visible for review.

**The ONE mistake people make:** Trusting the output without checking the generated code. OpenAI's own guidance: "review the generated code, outputs, and assumptions before relying on the result." A second common trap: assuming this is unavailable on the Free tier — older guides say Plus-only, but the current pricing comparison table lists "Data analysis: Limited" as present even on Free.

**Tier:** Present on every tier, degree varies — Free gets a limited version per the pricing comparison table; supported file types and limits can additionally vary "by model, plan, workspace settings, and account capabilities."

**What it does NOT do:** The Python sandbox cannot make external web requests or API calls — if analysis needs live data, you must upload it or connect a source first. It cannot reliably read values out of scanned/image-based tables — use a real spreadsheet or text file when exact numbers matter.

**Sources:** https://help.openai.com/en/articles/8437071-code-interpreter (page now titled "Data analysis with ChatGPT") — "Updated: 8 days ago" (≈2026-07-14) · checked 2026-07-22.

**Volatility:** MEDIUM — the underlying capability is old and stable; the naming ("Code Interpreter" → "Advanced Data Analysis" → "Data analysis") has changed twice, so search results and old guides use at least three different names for the same thing.

### Web search

**Vendor's name for it:** ChatGPT search

**What it IS:** ChatGPT retrieving current information from the live web (via OpenAI's own crawler, OAI-Searchbot, and via a Bing partnership) and citing sources, instead of answering purely from what it was trained on.

**How to set it up:** Composer → "View all tools" → Search icon, then type your query; or type "/" and select Search; or just ask something time-sensitive and ChatGPT triggers it automatically. Regenerate any answer "with search" via the refresh icon → "Try again." Citations appear inline (hover on desktop web) or under a "Sources" button beneath the response.

**What it's genuinely for:** Anything date-sensitive, current-events, or "near me" — the vendor's own example shows it rewrites your prompt into a targeted search query and can factor in your approximate location and (if Memory is on) your stored preferences to refine that query.

**The ONE mistake people make:** Trusting an inline-looking citation that appeared without search actually running. Citations are only real when search was actually invoked for that response; ChatGPT's normal text generation doesn't produce verifiable links.

**Tier:** Documented as available to "all ChatGPT Free, Plus, Team, Edu, Enterprise users," plus logged-out users. **NOT VERIFIED:** the article does not separately name Go or Pro, though both would be expected to include everything Plus does.

**What it does NOT do:** ChatGPT does not share your IP address or account information with third-party search partners — only a rewritten query and general location. It cannot save, modify, or cancel a restaurant reservation made through search results — you must use the confirmation email from the third-party provider for that.

**Sources:** https://help.openai.com/en/articles/9237897-chatgpt-search — "Updated: 8 days ago" (≈2026-07-14) · checked 2026-07-22.

**Volatility:** LOW-MEDIUM — the mechanism is mature, but the tier list omitting Go/Pro by name, and the "voice + search" combination being called out as still "slowly rolling out," suggest the edges are still moving.

### Agent mode → ChatGPT Work (major transition, verify before filming)

**Vendor's name for it:** Previously "agent mode" / "ChatGPT agent"; as of the check date, OpenAI's own help page for agent mode opens with: **"ChatGPT agent is no longer available. Use ChatGPT Work for longer, multi-step tasks and finished deliverables."** The current container is **ChatGPT Work** (a mode alongside "Chat" and "Codex").

**What it IS:** A mode, separate from ordinary Chat, meant for tasks that take many steps and produce a finished thing (a document, spreadsheet, slide deck, or "Site") rather than a conversational answer — it can work independently for extended periods and checks in only when it needs a decision or a login.

**How to set it up:** Desktop app: select "ChatGPT" from the top-left menu, then toggle "Chat" or "Work" at the top of the page. Web/mobile: select "Work" instead of "Chat" when starting or opening a project. Work chats sync across web/mobile/desktop when run in the cloud; in the desktop app, Work can additionally be granted access to local files/apps with permission.

**What it's genuinely for:** Handing off a research-and-produce task ("analyze three competitors and build a slide deck") and getting a finished artifact back, including recurring or triggered runs via Scheduled Tasks, rather than a single chat reply.

**The ONE mistake people make:** Looking for "agent mode" in the tools menu or typing "/agent," per older instructions — that entry point is being retired as ChatGPT Work rolls out. A second real risk (documented under the older "ChatGPT agent" article, which still describes the safety model in detail even though the feature itself is being replaced): typing a password directly into a Work/agent chat, rather than using "take over browser" mode, which is the only mode where OpenAI states screenshots are not captured.

**Tier:** ChatGPT Work is "gradually rolling out to eligible accounts" and is available on web/mobile for eligible paid plans, in the desktop app when included for your plan/workspace, and for Enterprise/Edu workspaces specifically with Enterprise Key Management (EKM) enabled. The prior "agent mode" had documented monthly message caps of Plus 40/month, Pro 400/month, Business & Enterprise 40/month — **NOT VERIFIED** whether these specific numbers carry over to Work, since Work "follows the same usage structure as Codex" per the vendor, a different accounting model than the old per-message agent cap.

**What it does NOT do:** Work on web/mobile cannot directly access files on your computer (only the desktop app can, and only with explicit permission). Work/agent cannot access data from apps that use "sync" (e.g., Google Drive) even when that app is otherwise enabled.

**Sources:** https://help.openai.com/en/articles/11752874-chatgpt-agent — "Updated: 4 days ago" (≈2026-07-18); https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex — "Updated: 2 days ago" (≈2026-07-20) · checked 2026-07-22.

**Volatility:** HIGH — this is the single most unstable finding in this file. As of the check date, one official page announces the feature it documents is retired, in the same breath as documenting it in full; the replacement (ChatGPT Work) is mid-rollout and its own page says "if you don't see ChatGPT Work in your account yet, your account may not have access." Do not film this section without re-checking both URLs on the day of filming.

---

## Screen-recordable moments

1. **The Memory sources panel** — tapping the book icon under a response to show *which* memory/instruction/file actually drove that answer. Impossible to explain in a paragraph; needs to be seen clicking through.
2. **Switching Voice modes** (Settings → Voice → Live / Advanced / Standard) and showing that Advanced, not Live, is the one with video/screen-share — this directly contradicts what most people expect from "Advanced Voice Mode" being the newest option.
3. **The Chat/Work/Codex toggle** in the desktop app top-left menu — this is a brand-new three-way switch that didn't exist before this transition and needs to be seen to be believed.
4. **Canvas refusing to open on a GPT-5.5+ model** — showing the "not supported by this model" behavior live is the only way to make the model-dependency of canvas concrete.
5. **The Plugins Directory → Skills tab → "Create with chat"** flow, showing `skill-creator` walking you through building a skill conversationally.
6. **App permission levels in action** — triggering an "Important action" approval card mid-task (e.g., asking a connected app to send something) so the reader sees the actual confirmation UI, not just the settings menu.

## Traps and corrections

- **"Connectors" is not the current word.** OpenAI renamed Connectors to **Apps** around December 17, 2025, then moved app *discovery* under a new **Plugins Directory** on **July 9, 2026**. Any material describing a "Connectors" menu, or an "App Directory" as the top-level place to browse integrations, is describing an interface that no longer exists as of the check date. (help.openai.com/en/articles/11487775, updated 6 days ago as of 2026-07-22)

- **"Plugins" is a reused, unrelated name.** OpenAI's original 2023 ChatGPT Plugins (third-party API plugins for GPT-4) were retired years ago in favor of GPT Actions. The July 2026 "Plugins Directory" is a completely different system (a packaging layer for Skills + Apps + app templates) that happens to reuse the word "plugin." Do not conflate old plugin guides with the current Plugins Directory.

- **"Agent mode" is being retired mid-check.** The vendor's own ChatGPT-agent help page opens with "ChatGPT agent is no longer available. Use ChatGPT Work for longer, multi-step tasks and finished deliverables" — yet the rest of that same page still describes agent mode's menu, limits, and safety model in the present tense. Treat this whole area as unstable; re-verify both the agent page and the new ChatGPT Work page (help.openai.com/en/articles/20001275, updated 2 days ago) before publishing or filming.

- **"Advanced Voice Mode" is no longer the current voice experience.** It is now just one of three named options ("Advanced," alongside "Live" and "Standard"), and it is the *older* one — kept specifically because it still supports video/screen-sharing on mobile, which the new "Live" mode does not support at launch. Most existing guides (including material that ranked in search results as recently as this check) still describe "Advanced Voice Mode" as if it were the current default; it is not — "Live" is.

- **"Code Interpreter" has been renamed twice** and, per current documentation, is no longer Plus-only: OpenAI's pricing comparison table lists "Data analysis: Limited" as present even on the Free tier. Guides claiming this requires a paid plan are citing outdated (2023-era) information.

- **Canvas quietly stopped working with the newest models.** The help center states plainly: "Canvas is not supported by GPT-5.5 or later models" and "Canvas is not available with pro-series models." A guide written even a few months before this check may show canvas working with a model that no longer supports it.

- **Scheduled Tasks' own documentation contradicts itself on tier.** The FAQ prose says tasks are for "Plus, Pro, Business, and Enterprise" only, but the limits table in the same article gives Go users an active-task cap, implying Go does have access. Do not resolve this from memory — re-check the live article before stating Go's status as fact.

- **Skills are not (per current documentation) a Free/Go/Plus/Pro consumer feature.** OpenAI's Skills article names only "Business, Enterprise, Healthcare, and Edu" as generally available — this is written for workspace-managed accounts. Do not assume an individual Plus or Pro subscriber automatically has the Skills tab; this could not be independently confirmed either way from the vendor's pricing comparison table (checkmarks were not extractable from the fetch used for this research) and should be checked live in-product before teaching it as a Plus feature.

---

## 🔴 CORRECTION — 2026-07-22, from the actual app (Ali's screenshot)

**My claim that hooks are not a ChatGPT feature was WRONG.** The ChatGPT **desktop app**
settings sidebar, observed directly, contains:

- **Personal** — General · Profile · Appearance · Voice · Configuration · Personalization ·
  Pets · Keyboard shortcuts · Usage & billing · Account
- **Integrations** — Appshots · **Plugins** · Browser · **Computer use**
- **Coding** — **Hooks** · Connections · Git · Environments · Worktrees
- **Archived** — Archived chats

`observed` — screenshot of the macOS desktop app, 2026-07-22. Not from documentation.

### What this changes
1. **Hooks exist in ChatGPT**, in a **Coding** section alongside Git, Environments and
   Worktrees — i.e. the Codex/agentic-coding surface, not the ordinary chat surface. The
   editorial question of whether our reader ever goes there is still open, but "ChatGPT does
   not have hooks" was false and must not be repeated.
2. **Several panes here appear in no help article I fetched** — Appshots, Pets, Configuration,
   Computer use, Worktrees, Environments. The help centre is behind the shipped app.

### 🔴 The systemic lesson — this changes how we source "where is it"
**The help centre documents the product; the app IS the product, and it is ahead.** Every
"where do I click" fact in a class must be verified **in the app**, not from documentation.
Docs remain the right source for limits, tiers, retention and policy — things the UI does not
state. But a menu path sourced only from a help page is a guess about the present.

⚠ This weakens the vendor-page fingerprint check in `check-class-currency.py`: a help page can
sit unchanged while the app is reorganised underneath it. The Monday pass should treat an
unchanged help page as **no evidence either way** about menu paths.

### Still open
**Skills** — this sidebar shows `Plugins` but the screenshot does not reveal whether a Skills
tab sits inside it. My documentation research found Skills named for Business, Enterprise,
Healthcare and Edu only, with consumer availability **NOT VERIFIED**. Resolve by opening
Plugins in this same sidebar and looking, not by reading another help page.
