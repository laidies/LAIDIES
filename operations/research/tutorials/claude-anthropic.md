tool: Claude (Anthropic) — claude.ai + desktop/mobile apps
checked_utc: 2026-07-22

sources_used:
  - Use skills in Claude · Claude Help Center (support.claude.com) · updated "yesterday" (~2026-07-21) · tier 1
  - Use Claude Cowork on web, desktop, and mobile · Claude Help Center · updated "over 2 weeks ago" (~early July 2026) · tier 1
  - Release notes · Claude Help Center (support.claude.com/en/articles/12138966) · entries through 2026-07-14 · tier 1
  - Understanding Claude's personalization features · Claude Help Center · updated "over a week ago" (~mid-July 2026) · tier 1
  - Use connectors to extend Claude's capabilities · Claude Help Center (support.claude.com/en/articles/11176164) · undated in snippet, help-centre-current · tier 1
  - Use voice mode · Claude Help Center (support.claude.com/en/articles/11101966) · undated in snippet · tier 1
  - Navigating the Claude desktop app · claude.com/resources/tutorials (Anthropic official) · no explicit date found · tier 1
  - Customize Claude Cowork · claude.com/resources/tutorials (Anthropic official) · no explicit date found · tier 1
  - Claude Skills: The Complete 2026 Guide — Build, Install & Use · buildfastwithai.com · dated 2026-05-13 · tier 3
  - Claude Cowork Tutorial: How to Use Anthropic's AI Desktop Agent · DataCamp · 2026, exact date not captured · tier 2
  - Claude Cowork expands to mobile and web · TechCrunch · 2026-07-07 · tier 2
  - Anthropic brings Claude Cowork to mobile and web… · VentureBeat · 2026-07-07 · tier 2
  - Anthropic expanding Claude Cowork to mobile and web · 9to5Mac · 2026-07-13 · tier 2
  - Anthropic Launches Mobile Access for Claude Cowork · PYMNTS · 2026-07, exact date not captured · tier 2
  - Settings · Claude AI UX Case Study · aiuxplayground.com · dated 2026-12-29 [sic — page reads Dec 29 2025; see note below] · tier 3
  - How to Install Claude Code Plugins (Marketplace Guide 2026) · sean-weldon.com · 2026-01-06 · tier 3
  - Claude Code Plugin Marketplace Guide (2026) · agensi.io · 2026, exact date not captured · tier 3

sources_rejected:
  - "27 Hidden Claude Features, Settings & Shortcuts…" (Medium, two near-duplicate reposts) — listicle/content-farm structure, no clear original authorship, used only as a lead to other sources, not as evidence on its own
  - Various undated SEO round-ups surfaced by search (e.g. generic "Complete Claude Tutorial 2026" posts with no visible byline or date) — excluded per brief
  - claudeprotocol.com scheduled-tasks post and apiyi.com schedule guide — used only for the Pro/Max/Team numeric limits claim, which is flagged single-source below; not used for anything else

---

## The Settings/Customize surface — overall shape

**What current material shows:** The settings model has visibly reorganised during 2026, and sources disagree on the current top-level names because they were written on either side of that reorganisation.

- The official release notes (support.claude.com/en/articles/12138966) log, under **2026-01-16**: *"New Customize section groups skills, plugins, and connectors in Claude Desktop."* This is the vendor's own record of a structural change, not a tutorial's guess.
- A December 2025 UX case study (aiuxplayground.com — page itself is dated 2025-12-29, i.e. it predates the Jan-16 change) describes the sidebar as 8 categories: **General, Account, Privacy, Billing, Capabilities, Connectors, Claude Code, Account** (Account appears twice in the source material, not a transcription error on our part) — with Skills/Plugins living inside **Capabilities**, not a section called Customize. This is the *pre-reorg* picture.
- Post-reorg sources (support.claude.com skills article, updated ~2026-07-21; buildfastwithai.com, 2026-05-13) both give the click path as **Settings → Customize → Skills**, with buildfastwithai spelling it "Settings > Customize > Skills > Upload."
- One search result also surfaced a live product URL `claude.ai/settings/capabilities?modal=memory` being used for **Memory**, and another for `claude.ai/settings/capabilities` generally — suggesting the underlying URL slug `capabilities` may still exist even where the visible label now reads "Customize" for some sub-items. We could not log in to confirm this directly.

**CORROBORATION: CHANGED — verify in app.** Two vendor-adjacent sources (release notes + Help Center skills article) agree Customize now groups Skills/Plugins/Connectors, dated 2026-01-16 and ~2026-07-21 respectively — that pairing is corroborated. But it directly contradicts the Dec-2025 case study's "Capabilities" label, and a still-live `/settings/capabilities` URL muddies whether "Capabilities" was renamed outright or just partially absorbed. **Do not film a menu path called "Capabilities" or "Customize" as the sole current answer — screen-record the live app first.**

**Newest supporting source date:** 2026-07-21 (Help Center skills article).

**Additional confirmed settings sections (from release notes, tier 1, single-source each unless noted):**
- **Settings → Reflect** — Monthly Recap feature, launched 2026-07-09, needs Memory turned on. Single-source (release notes only).
- **Settings → Time and focus** — break reminders / quiet hours, launched 2026-07-09. Single-source.
- **Settings → Cowork → Global instructions** (desktop) — per the official "Customize Claude Cowork" tutorial. Single-source (one Anthropic tutorial page; not cross-checked against a second source).
- Memory system was **redesigned** 2026-07-10 into "individual, categorized entries Claude reads and updates during your conversations" per release notes — single-source, but it is the vendor's own changelog, so treated as reliable-but-unconfirmed-elsewhere.

We did **not** find any single source that screenshots or transcribes the entire current sidebar top-to-bottom post-reorg. Per the brief's Priority 1, this is a gap: nobody we found has filmed the current full sidebar since the January reorg.

---

## Skills

**What current material shows:** A Skill is described consistently across sources as a folder of instructions (a `SKILL.md` file with YAML front matter — name + description — plus optional scripts/templates/reference files) that Claude applies automatically when relevant, without the user invoking it by name each time (though `/skill-name` invocation also works). No coding is required to write one; a user can write it directly in the UI, upload a finished folder, or ask Claude to draft it.

**Who can use them:** Free, Pro, Max, Team, and Enterprise plans, plus API users with code execution enabled — per the Help Center article (tier 1, updated ~2026-07-21). Code execution + file creation must be turned on first. Team/Enterprise owners can additionally provision skills org-wide from **Organization settings → Skills**, and members can share skills with colleagues if the owner allows it.

**Click path:** "Settings → Customize → Skills" (buildfastwithai, 2026-05-13) matches the Help Center's "Customize → Skills" (~2026-07-21). **CORROBORATION: corroborated** (two independent, recent, agreeing sources — one vendor, one named practitioner with a dated post). Older material ("Settings → Capabilities → Skills") is now suspect per the reorg finding above and should be treated as **CHANGED / pre-2026-01-16**.

**What changed recently:** Skills absorbed what used to be a separate "Styles" feature — one source states *"Styles are moving to skills as part of Anthropic's personalization migration in 2026; for now both surfaces exist side by side."* This is **single-source, unconfirmed** — we did not find a second source describing this migration, so do not teach it as settled.

**Where good tutorials disagree with vendor docs:** The vendor Help Center is silent on the exact settings-menu wording changes over time; independent tutorials (buildfastwithai, sean-weldon.com on plugins) are more precise about exact click sequences than support.claude.com itself, which tends to say "go to Skills" without spelling out the full path.

---

## Hooks

**What current material shows:** A hook is a trigger — "when X happens, do Y" — that fires deterministically at a defined point in Claude's workflow (before/after a tool runs, session start/end, etc.). This is unambiguously described, across every source we found, as part of **Claude Code** (the developer/CLI product) and, notably, **Claude Cowork** — one GitHub issue thread (anthropics/claude-code#27398) explicitly states *"hooks and sub-agents run only in Cowork, so they appear grayed out in chat,"* meaning hooks are live inside Cowork, not just Claude Code.

**Does anything called a hook exist for a non-developer?** Partially, and indirectly. Hooks themselves are still configured via a JSON file (`.claude/settings.json`, or a plugin's bundled `hooks/hooks.json`) — there is no evidence of a graphical "add a hook" toggle in claude.ai or Cowork settings for a non-technical user to hand-author one. **However**, since Cowork's plugin marketplace launched (release notes: **2026-02-24**, "Plugin marketplace launched with admin controls for Team and Enterprise organizations"), a non-technical user can install a **plugin** — reachable per one source at "Settings → Customize → Plugins" in the web app, no terminal required — and a plugin "bundles slash commands, subagents, MCP servers, hooks and skills, so you add a whole capability at once." In that sense a non-developer can be *running* hooks without ever seeing the word "hook" or writing JSON, by installing someone else's plugin.

**CORROBORATION:** "Hooks exist in Cowork" — corroborated (GitHub issue + Cowork customization tutorial both describe hooks as part of the Cowork/plugin system). "Non-technical users install plugins via Settings → Customize → Plugins without a terminal" — **single-source, unconfirmed** (one search-engine-summarized source; we could not independently verify the exact wording or click path against a second source, and could not log in to confirm the pane exists as described).

**What changed recently:** Plugin marketplace: 2026-02-24 launch (release notes, tier 1). This is the mechanism that turns "hooks" from a pure-developer concept into something a Cowork user can passively benefit from.

---

## Cowork

**What current material shows:** Cowork is Anthropic's agent for general (non-coding) knowledge work — the second/third tab in the Claude desktop app alongside Chat and Code. It reads files, connects to calendar/email/messaging/web tools, runs scheduled tasks, and can keep working in the background after the laptop is closed. Anthropic's own framing (via multiple tech-press pieces) is that it was built "primarily for nontechnical users."

**How it's reached:** From claude.ai select the "Home" tab, or open the message box and choose "Cowork" in the bottom left (Help Center, tier 1). Desktop app has it as its own tab. Mobile access (iOS/Android) is newer.

**State/rollout, with dates (all tier 1–2, broadly agreeing = corroborated):**
- GA on desktop reported by multiple outlets as of April 9, 2026, after macOS beta (January 2026) and Windows beta (February 2026) — this specific GA date is **single-source** in our search results (one search-engine summary) and should be verified against Anthropic's own announcement before it's stated on camera.
- Expansion to **web and mobile**, in **beta**, rolling out first to **Max plan** subscribers: reported independently by TechCrunch (2026-07-07), VentureBeat (2026-07-07), 9to5Mac (2026-07-13), PYMNTS (2026-07), and confirmed in the Help Center article (updated ~mid-July 2026) and the official release notes (2026-07-07 entry: "Claude Cowork expanded to web and mobile platforms"). **CORROBORATION: corroborated** — this is our best-supported finding in the whole file, four independent outlets plus the vendor's own changelog agreeing on date and mechanism.

**Customization layers** (per the official "Customize Claude Cowork" tutorial, tier 1, single-source since we found no second walkthrough matching it point for point): Connectors (Slack, Salesforce, Microsoft 365, Jira — read *and* write), Instructions at three tiers (global via Settings → Cowork → Global instructions; per-Project; org-wide for Enterprise admins), Skills, and Plugins that bundle Connectors + Skills together, with example role-based plugin sets for Sales/Product/Legal/Operations. Scheduled tasks are invoked with `/schedule` inside Cowork.

**Desktop-only capabilities even in the web/mobile Cowork beta:** live artifacts, local file access, browser use, and computer use — these still require the Claude Desktop app to be open (Help Center article, tier 1).

---

## Memory

**What current material shows:** Claude extracts details about the user (role, preferences, formatting habits) from conversations and stores them as memory, synthesizing roughly every 24 hours. Rolled out free to all plans in **March 2026** (single-source claim from a secondary blog, not independently corroborated in our search — treat as plausible but unconfirmed). Redesigned **2026-07-10** into "individual, categorized entries" per the vendor's own release notes (tier 1) — this redesign date is corroborated only by the vendor's own changelog; we found no independent tutorial describing the new entry-based UI yet, so **CORROBORATION: single-source (vendor-only)**.

**Click path:** Settings → Customize (or, per older material, Capabilities) → Memory, with a "View and manage memory" action, and Pause vs. Reset controls (Reset is destructive/irreversible). Multiple secondary sources agree on the Pause/Reset distinction — **corroborated** on that specific mechanic, though the exact menu label it sits under is subject to the same Capabilities/Customize ambiguity flagged above.

---

## Custom instructions / profile

**What current material shows:** Three layered personalization surfaces, described consistently across sources: **Instructions for Claude** (account-wide, set in Settings, applies to every new chat), **Styles** (per-chat tone/format presets — Normal, Learning, Concise, Explanatory, Formal, or custom), and **Project instructions** (per-Project, inside Projects). The official Help Center article ("Understanding Claude's personalization features," updated ~mid-July 2026) confirms "Instructions for Claude" as a named section but is notably thin on exact submenu wording — it does not itself name "Customize" or "Capabilities."

**Click path:** "Settings → Profile" or "Settings → General → Profile," reported with minor wording variation across two independent secondary sources — **corroborated on substance** (a Settings-adjacent profile/instructions area exists and is account-wide) but **single-source on the exact literal path**, since no two sources used identical wording.

---

## Projects / containers

**What current material shows:** Projects are persistent workspaces (Pro/Max/Team/Enterprise) with their own custom instructions (~8,000 characters, per one secondary source, unconfirmed elsewhere), uploaded knowledge files, and conversation history. Created via "New Project" in the left sidebar. This is broadly stable, well-documented territory with no signal of recent change — **corroborated** on the basic mechanic across several tier-2/3 tutorials, though the exact character limit is **single-source, unconfirmed**.

---

## File upload

**What current material shows:** PDFs, Word docs (.docx), plain text, CSVs, and code files can be uploaded both to Projects (as persistent knowledge) and to individual chats. No sign of recent structural change in what we found. **Corroborated** as a stable feature; no new claims worth flagging.

---

## Connectors

**What current material shows:** Connectors (built on MCP, Anthropic's open protocol) let Claude read and act inside external tools. Enabled from Settings → Connectors (per Help Center, tier 1) — though per the Customize reorg, some sources place connector *enabling* inside "the Customize panel." Anthropic ships first-party connectors for Google Drive, Gmail, Google Calendar, GitHub, Slack, Microsoft 365; consumer connectors (Uber, Spotify, Instacart, TripAdvisor, Resy, Audible, AllTrails, etc.) were added in **April 2026** and are available on all plans (single-source claim, not independently corroborated in our search). Microsoft 365 connector gained **write** capabilities (email, calendar, OneDrive, SharePoint) per release notes, **2026-07-07** — tier 1, single-source but vendor-original.

**CORROBORATION:** "Connectors are MCP-based and let Claude read+write in external tools" — corroborated across three-plus sources. Exact settings location ("Settings → Connectors" vs. "inside Customize") — **CHANGED / ambiguous**, same root cause as the Skills path above.

---

## Scheduled tasks

**What current material shows:** Scheduled tasks (a.k.a. "routines" in some material) package a prompt, connected tools, and a trigger (schedule, webhook, or GitHub event) to run on Anthropic's cloud, independent of the user's device. Reachable via `/schedule` inside Cowork/Claude Code, via "New routine → Remote" in the desktop app, or at `claude.ai/code/routines` on the web (this last claim is **single-source**, from a secondary blog, and the URL is a `/code/` path which is odd for a claimed general/Cowork feature — flag as suspect, verify in app before teaching).

**Usage limits claimed:** Pro 5/day, Max 15/day, Team/Enterprise 25/day — **single-source** (one blog, claudeprotocol.com), not found in the official release notes or Help Center in our search. **Do not teach these numbers as fact.**

---

## The modes people miss (Research, Voice, Artifacts, Plugins/Marketplace, Reflect, Time and focus)

- **Research:** A "Research" toggle (bottom-left of the chat box on claude.ai) runs a multi-step browse-and-synthesize process with citations, distinct from a single web search. Described consistently across several secondary sources — **corroborated on the basic mechanic and toggle location**, though we found no vendor Help Center article confirming the exact UI label, so treat the precise wording as single-source.
- **Voice mode:** Beta, all plans, on claude.ai and mobile — tap the sound-wave icon, bottom-right of the chat window. Confirmed by the official Help Center article (tier 1) plus a secondary source dated July 2026 describing 18-language support and a push-to-talk mode — **corroborated**.
- **Artifacts:** Stable, well-covered feature; the one 2026 development we found is **in-place draft editing**, added per release notes **2026-06-12** — single-source (vendor changelog only).
- **Plugin marketplace:** Launched **2026-02-24** per release notes (tier 1); default Anthropic marketplace plus third-party marketplaces exist, per sean-weldon.com (2026-01-06 — note this pre-dates the release-notes launch date, which is itself a small internal inconsistency worth flagging rather than smoothing over: either the marketplace had a soft-launch/beta before the Feb 24 "launch," or one of the two dates is wrong. We did not resolve which.)
- **Reflect (monthly recap)** and **Time and focus** (break reminders/quiet hours): both new **2026-07-09** per release notes — tier 1, single-source, no independent tutorial found yet covering either.

---

## What the good tutorials do well
- The Anthropic official tutorial pages (claude.com/resources/tutorials/...) are structured around a real task ("navigating the app," "customizing Cowork") rather than a feature list, and give concrete example prompts.
- Named-practitioner posts with dates (buildfastwithai, sean-weldon.com) give literal, copy-pasteable click paths and are willing to say exactly what to type — closer to what a beginner needs than the vendor Help Center, which is often vaguer about exact menu wording.
- Tech-press coverage of the Cowork mobile/web rollout (TechCrunch, VentureBeat, 9to5Mac) is well-dated and consistent across outlets — good for establishing timeline facts, weak on step-by-step "where to click."

## What they all get wrong
- Almost nothing we found screen-records or transcribes the **current, full settings sidebar** in one place. Everyone describes a piece of it, in their own wording, at their own point in time — which is exactly how the Capabilities/Customize contradiction happened.
- Several sources state menu paths with confidence and no date-awareness of the January 2026 reorg, so a beginner following an undated-feeling (even if technically dated) post could easily be sent to a "Capabilities" menu that no longer holds what it says it holds.
- Coverage conflates **Claude Code** (developer CLI) features — hooks, plugins, subagents — with consumer **claude.ai/Cowork** features, often in the same article, without flagging the audience shift. A non-technical reader following a "hooks" tutorial will land in developer JSON-config territory with no warning.
- Scheduled-tasks usage limits and Cowork GA dates are repeated across secondary sources without any of them citing the vendor directly — classic single-source-laundered-into-consensus, which is why we flagged both as unconfirmed above rather than treating repetition as corroboration.

## Already covered to death
- "What is a Skill / how do I write a SKILL.md" — many dated 2026 posts cover this well and consistently.
- "What is Claude Projects / how to set up custom instructions" — mature, stable, well-covered territory.
- Claude Code hooks for developers — saturated coverage (multiple full guides, all lifecycle events documented).

## The gap
- No current source walks a total beginner through the **post-reorg Customize/Capabilities split** on screen — this is a genuine, timely gap LAiDIES could fill, precisely because even the vendor's own Help Center and its own tutorial pages don't agree with each other on wording right now.
- Nothing explains Cowork's plugin-bundled hooks to a non-technical audience in plain terms ("a plugin can include automations you never see, and that's normal") — every hooks explainer we found assumes a developer reader.
- We found **no material specifically aimed at non-technical women** using Claude/Cowork in our searches — not good, not bad, simply absent from what we could find. This appears to be open ground rather than crowded ground.

## 🔴 Confidence
**Would stake something on:** Cowork's expansion to web/mobile in beta, gated to Max plan first, dated July 7–13 2026 (four independent outlets + vendor changelog agree). The existence and basic mechanic of Skills (folder + SKILL.md, no-code, auto-applied) — corroborated across vendor and named-practitioner sources. That "Customize" now groups Skills/Plugins/Connectors as of 2026-01-16, per the vendor's own changelog.

**Would not stake anything on:** Any single literal menu path stated as the *only* current truth — "Settings → Customize → Skills" is our best-supported answer but competes with live product URLs still reading `/settings/capabilities`, so this needs a screen-recorded confirmation in the actual app before it goes in a filmed class. Scheduled-task daily limits (5/15/25). Cowork's exact GA date (April 9, 2026). Whether Styles are actually merging into Skills. Memory's new "individual, categorized entries" redesign UI (vendor-only claim, unseen by any independent tutorial yet).

**Overall tally:** roughly 6 findings corroborated by two-plus independent sources, about a dozen single-source (mostly vendor-changelog-only or one secondary blog), one direct CHANGED/contradiction (Capabilities vs. Customize), and one internal date inconsistency noted but not resolved (plugin marketplace launch date).

