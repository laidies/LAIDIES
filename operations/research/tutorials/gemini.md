tool: Gemini (Google) — consumer app at gemini.google.com, mobile apps, Workspace side panel
checked_utc: 2026-07-22

sources_used:
- "NotebookLM is now Gemini Notebook" — blog.google (Google, vendor) — 2026-07-16 — tier 1
- "Google continues its renaming streak by turning NotebookLM to Gemini Notebook" — TechCrunch — 2026-07-16 — tier 2
- "NotebookLM Is Now Gemini Notebook: What Changed" — Chrome Story — 2026-07 (dated) — tier 2/3
- "NotebookLM is now Gemini Notebook, with 3.5 + Antigravity upgrade" — 9to5google — 2026-07-16 — tier 2
- "Google Rebrands NotebookLM to Gemini Notebook" — Thurrott — 2026-07 (dated) — tier 2
- "The Gemini app becomes more agentic, delivering proactive, 24/7 help" ("next-evolution-gemini-app") — blog.google (Google, vendor, I/O 2026 recap) — 2026-05-19 — tier 1
- "'Gemini Spark' is Google's upcoming AI agent in the Gemini app" (APK Insight/leak) — 9to5google — 2026-05-14 — tier 2 (leak, not official)
- "Google renames Gemini Extensions to just apps" — 9to5google — 2025-03-03 — tier 2
- "Google Renames Gemini Extensions to 'Apps'..." — MindStick — 2025-03 — tier 3
- "Gemini Extensions are now 'Apps'..." — Sammy Fans — 2025-03-04 — tier 3
- "Gemini Live redesign now works with more 'Connected Apps' on Android" — 9to5google — 2026-05-23 — tier 2
- "Google Gemini Extensions Explained: How Connected Apps Work in 2026" — Tech Nerdiness (Utpal Raj, named author) — 2026-06-03 — tier 3
- "Google Gemini AI UX Case Study — Settings" — AI UX Playground (design case study, screenshots) — captured 2025-12-29 — tier 3
- "Mastering Gemini's Preferences..." — Workalizer — 2026-03-23 — tier 3
- "The Complete Guide to Google Gemini: Every Feature Explained" — Daria Cupareanu, Substack (named author) — 2026-03-29 — tier 3
- "Google introduces Personal Intelligence..." — SiliconANGLE — 2026-01-14 — tier 2
- "Google Gemini's Personalized Intelligence Feature Taps Gmail, Searches, Photos" — Bloomberg — 2026-01-14 — tier 1/2
- "Google rolling out Personal Intelligence to free Gemini..." — 9to5google — 2026-03-17 — tier 2
- "Gemini Saved Info Not Persisting Across Sessions" — AI Tools Guidebook — 2026 (dated) — tier 3
- support.google.com "Customize Gemini's responses with your instructions" — Google (vendor help centre) — undated (current live doc) — tier 1
- Google Workspace Updates blog — "Set custom instructions for Gemini in Google Docs" — Google (vendor) — 2026-05 rollout — tier 1
- "Gemini could soon let you organize chats into 'Projects,' ChatGPT-style" — Android Authority — 2026 (dated) — tier 2
- "Schedule actions in Gemini Apps" (Computer/Android/iPhone variants) — support.google.com (vendor) — undated (current live doc) — tier 1
- "Gemini app launches scheduled actions to help you stay productive" — blog.google (Google, vendor) — dated — tier 1
- "Guided Learning in Gemini: From answers to understanding" — blog.google (Google, vendor) — dated — tier 1
- "Use learning tools in Gemini Apps" — support.google.com (vendor) — undated (current live doc) — tier 1
- Google Gemini Deep Research Agent docs — ai.google.dev (Google, vendor developer docs) — current — tier 1
- "Google Gemini: File upload limits and supported file types" — datastudios.org — 2026 (dated) — tier 3

sources_rejected:
- Multiple SEO-style "2026 Ultimate Guide to Gemini" listicle sites (glbgpt.com, promptstodollars.com, chatboq.com, letsdatascience.com, findskill.ai) — used only where a claim was already corroborated elsewhere; not relied on alone — pattern reads as content-farm/affiliate, thin on specifics, several recycle the same paragraphs.
- Undated or vaguely-dated forum threads (support.google.com community threads) — used only as confirmation that a UI complaint/behavior exists, never as sole source for a menu path.
- Gemini CLI / "Skills for coding agents" comparison articles (firecrawl.dev, codeant.ai, colombani.ai) — rejected as off-target: brief's tool is the consumer app, and these describe the separate developer CLI product, not gemini.google.com.

---

## Current interface — what recent material shows

**Settings sidebar** (persistent left-nav, not a modal): a December 2025 screenshot-based case study (AI UX Playground) shows, in order: Activity, Personal context, Connected Apps, Scheduled actions, Theme, Subscription options, Location settings. Blue notification dots appear on Personal context and Connected Apps. This is the fullest single capture of the whole sidebar found — **single-source** for the exact ordering, though each individual item name is separately corroborated below. It predates the January 2026 "Personal Intelligence" launch, so it may already be stale on that one item — flagged below.

**Mode chips under the message box**: one named-author source (Daria Cupareanu, 2026-03-29) lists quick-action chips as Create image, Write anything, Help me learn, Create a video, Boost my day. A separate, undated-but-recent tools-menu description (aggregated from ai-toolbox.co and Google's own Deep Research docs) describes a tools/plus-button menu listing Create image, Canvas, Deep Research, Create music, Guided Learning, More tools — selecting one pins a chip (e.g. "Deep Research chip") next to the input box. These are two different UI surfaces (home-screen suggestion chips vs. the tools-attach menu) — **not corroborated against each other**, could be the same feature described two ways or could reflect a redesign between dates. NOT VERIFIED as a single unified list.

## Renames — the highest-value findings

| Feature | Current name | Previous name(s) | When it changed | Corroboration |
|---|---|---|---|---|
| Research notebook tool (formerly standalone) | **Gemini Notebook** | NotebookLM | 2026-07-16 | Corroborated — blog.google (vendor), TechCrunch, 9to5google, Chrome Story, Thurrott all independently dated 2026-07-16 |
| Personal 24/7 agent | **Gemini Spark** | "Gemini Agent" (internal/beta name); codename "Remy" per one leak source | Beta name spotted 2026-05-14 (leak); official as "Gemini Spark" confirmed in Google's own I/O 2026 blog post 2026-05-19 | Corroborated for current name (vendor blog + leak agree) — but "Gemini Agent" as the immediately-prior name is **single-source** (9to5google APK teardown only; Google's own post never mentions a prior name) |
| Third-party integrations | **Connected Apps** | "Extensions" → "apps" (lowercase, briefly) → "Connected Apps" | Extensions→apps: 2025-03-03/04 (corroborated: 9to5google, MindStick, Sammy Fans all dated within days of each other). apps→Connected Apps: **NOT VERIFIED exact date** — already named "Connected Apps" in a Dec 2025 screenshot case study, still called "Connected Apps" by 9to5google (May 2026) and Tech Nerdiness (June 2026) | ⚠️ **CHANGED — verify in app**: one dated source (Workalizer, 2026-03-23) still calls the pane "Extensions" in the settings menu, contradicting three other sources from Dec 2025 through June 2026 that all say "Connected Apps." Genuine disagreement, not smoothed over — could mean Workalizer is simply stale/wrong, or the name flip-flopped, or it varies by platform (web vs Android) — not established which. |
| Personalization/context settings | **Personal Intelligence** (new, opt-in cross-app layer pulling from Gmail/Photos/YouTube/Search) vs. **Personal context** (existing settings pane holding custom instructions + saved info) | "Personalization" | Personal Intelligence launched 2026-01-14 — corroborated (SiliconANGLE, Bloomberg, 9to5google all same date) | ⚠️ Whether Personal Intelligence **replaced/renamed** the "Personal context" pane, or sits alongside it as a separate settings entry, is **single-source, unconfirmed** (only one aggregator source frames it as a rename). The pre-launch (Dec 2025) sidebar screenshot shows "Personal context" as its own item; no post-January-2026 screenshot of the full sidebar was found to confirm current state. |
| Learning mode | **Guided Learning** (desktop chip) / **"Learn"** (mobile chip, per one source) | — (new feature, built on LearnLM) | Rollout ongoing 2026, gradual by platform per Google's own community support thread | Guided Learning existing and Google-confirmed (blog.google, support.google.com) = corroborated. The desktop-vs-mobile chip-label split ("Guided Learning" vs "Learn") is **single-source, unconfirmed**. |

## Gems

**What it is**: custom, reusable AI assistants — set instructions once, reuse repeatedly. Created via Explore Gems → New Gem in the left sidebar (naming/click path consistent across storylane.io, aiproductivitycoach.com, and Google's own support article — **corroborated**, though these are step lists, not fresh screenshots).
**Click path**: gemini.google.com → left sidebar → Gems → New Gem → name it, write instructions, preview on the right, Save. Corroborated across 2+ independent tutorial sources plus vendor support doc.
**No renaming found** for "Gems" itself in this pass — treat as stable/unchanged, but note that is an absence of evidence, not confirmation of stability.

## Connected Apps

See rename table above. Current first-party roster per 9to5google (2026-05-23, Gemini Live/Android redesign): Home, Hotels, Flights, Workspace, Image generation, Shopping, Utilities, YouTube, YouTube Music, plus Spotify. New MCP-based third-party connections named in Google's own I/O 2026 post: Canva, OpenTable, Instacart. **Corroborated** that the category exists and is expanding; the specific roster is largely single-source (one 9to5google article) for the exact list.

## Deep Research

Multi-step research mode: plans → runs dozens of searches → synthesizes a cited long-form report; output can be reshaped into Web page, Infographic, Quiz, Flashcards, or Audio Overview (per Google's own ai.google.dev docs, corroborated by independent 2026 guide sites describing the same reshaping options). Can now use personal data (Gmail, Drive, Meet chat) and user-uploaded files as sources, per Daria Cupareanu's March 2026 walkthrough — **single-source** for the personal-data-as-input detail specifically, though the general Deep Research mechanism is well corroborated.
**Tier**: a meaningful free tier exists; Google AI Pro ($20/mo) unlocks Gemini 2.5 Pro-powered deeper runs — stated by one aggregator guide, not cross-checked against a second independent source — **single-source, unconfirmed** on the exact tier gating.

## Canvas

Interactive side-by-side workspace: documents, code, prototypes, dashboards; edits can target specific sections rather than full regeneration; can now build small persistent apps that save data between sessions and share data across users (per Geeky Gadgets 2026 guide and Google's own release-notes page describing similar capability) — **corroborated** at the level of "Canvas can build small stateful apps now," though exact feature name for that sub-capability wasn't independently pinned down twice.

## Gemini Spark

Google's own name for a 24/7 personal AI agent doing multi-step background tasks (inbox, bookings, summaries, purchases) — announced at I/O 2026, official per blog.google 2026-05-19. Built on an "Antigravity harness" per the same vendor post. See rename table for prior-name caveat.

## Gemini Notebook (formerly NotebookLM)

Renamed 2026-07-16, strongly corroborated (5+ independent sources same date, including the vendor's own blog). Stayed a separate app (not folded into main Gemini chat) but now syncs notebooks into the Gemini app and, per the vendor post, "soon" into Search's AI Mode. New capability: code execution against notebook data in a secure cloud sandbox, rolling out to Pro subscribers.

## Scheduled Actions

**What it is**: recurring prompts Gemini runs automatically (e.g. daily briefings, email summaries) — vendor-confirmed (blog.google + support.google.com, both current/live).
**Click path**: Settings → Scheduled Actions → New/+ → set prompt + cadence → Create. Consistent across support.google.com (vendor, per-platform variants for Computer/Android/iPhone) and two independent tutorial write-ups (Medium/Peggie Mishra, digitalcitizen.life) — **corroborated**.
**Tier**: requires Google AI Pro or AI Ultra (paid) — stated by one independent tutorial (digitalcitizen.life); not independently re-confirmed against a second source, and not explicit in the vendor support page snippet retrieved — **single-source, unconfirmed** on the paywall claim specifically, though scheduled actions being a settings-level feature at all is well corroborated.
**Limit**: up to 10 scheduled actions per account, default new action = daily 9:00am — single-source (digitalcitizen.life), NOT VERIFIED elsewhere.

## Skills / plug-ins / hooks — the modes people miss

No consumer-facing equivalent of Claude's "Skills" or "Hooks" was found for gemini.google.com. What plays that role in the consumer app is **Gems** (reusable custom instructions/personas) and **Connected Apps** (integrations) — these are conceptually closest but are not the same mechanism. "Hooks" and "Skills" as terms turned up only in coverage of the separate **Gemini CLI** developer tool (out of scope per the brief — that's a different product from the consumer app), where one source states Gemini CLI has only a partial hooks analogue via `excludeTools`, and the cross-tool "Agent Skills" open spec (agentskills.io) is described as adopted by Gemini CLI among others. This is **not applicable evidence for gemini.google.com** and should not be taught as if it exists in the consumer app — flagging so it doesn't get conflated later.

## File upload

10 files per prompt is the figure repeated across independent sources (datastudios.org, onefileapp.com comparison piece) — most document types capped ~100MB/file, PDFs specifically 50MB, images ≤24MP/10 at a time, audio ≤10 files/10 min total. **Corroborated at the "10 files" headline figure**; the per-type sub-limits are less consistently cross-checked (drawn mostly from one aggregator, datastudios.org) — treat those specific numbers as single-source.

## Projects / containers

**Gemini does not currently have a native "Projects" (chat-organizing-folders) feature.** Android Authority (2026, dated) reports Google has been building one since December (2025) and it's beginning to appear for some users but "doesn't work yet." In its absence, the ecosystem has filled the gap with third-party Chrome/Firefox extensions (Gemini Chat Folders, AI Toolbox, Fast Folders) — these are not Google's own feature and should not be taught as native functionality. **Single-source** on the in-development status; worth a re-check closer to filming since this could ship at any time.

## Memory / custom instructions

Two settings items exist and were **not cleanly disambiguated by any source found**: "Memory" (a toggle controlling whether Gemini retains facts long-term) plus "Keep Activity" (Gemini Apps Activity must also be on for anything to actually persist) sit somewhere under what one source calls "Personal Intelligence" and vendor help docs call "Personal context." Click path per vendor support doc: Menu → Settings & help → Personal context → "Your instructions for Gemini" → Add. One named-author source instead labels the same-sounding control "Instructions for Gemini" directly in the settings panel (no "Personal context" submenu named). **CHANGED or just inconsistent labeling across sources — not resolved.** Custom instructions now also exist inside Google Docs' Gemini side panel as of a 2026-05-04 rollout (Google Workspace Updates blog, vendor, dated) — this is a separate surface from the main chat app's instructions and shouldn't be conflated with it.

---

## What the good tutorials do well
- Google's own support.google.com articles are reliably split by platform (Computer / Android / iPhone & iPad) with separate URLs — good model for filming three short platform-specific segments rather than one generic one.
- Named-author, dated pieces (Daria Cupareanu's Substack, Tech Nerdiness's Utpal Raj) are noticeably more precise about exact chip/menu labels than the anonymous aggregator sites, and they say when they looked.
- The AI UX Playground case study is the only source found that treated the settings sidebar as a design object worth screenshotting and enumerating in full, in order — genuinely useful reference format.
- Vendor blog posts (blog.google) are good primary sources for "this is the official name as of the launch date" but weak on "what was it called before" — they don't document their own rename history.

## What they all get wrong
- Almost nothing found actually shows a fresh screenshot with a capture date attached — most "guides" describe the interface in prose, which is exactly the failure mode the brief warns about (a URL plus a date is not proof).
- Aggregator/SEO sites frequently blur together features that are genuinely distinct (e.g., "Personal Intelligence" and "Personal context" get used interchangeably when the underlying UI may treat them as separate settings entries).
- Several 2026-dated sites still describe pre-rename terminology (e.g., "Extensions" in a March 2026 article after other sources already show "Connected Apps" months earlier) — nobody flags their own staleness.
- No source found walks a genuinely non-technical beginner through "here is the whole settings sidebar, here is what's in each pane" in a single connected sequence — everyone assumes you already know roughly where things live.

## Already covered to death
- "How to create a Gem" — multiple tutorials, near-identical steps, well covered.
- "What is Deep Research and how do I use it" — heavily covered across 2026 guide sites.
- Basic prompting/chat usage of Gemini generally.

## The gap
- A single, current, screenshot-true walkthrough of the **entire settings sidebar** with every pane opened and explained — nobody has done this post-January-2026 (post-Personal Intelligence launch).
- Plain-language disambiguation of **Personal Intelligence vs. Personal context vs. Memory vs. Saved info vs. Custom/your instructions** — every source blurs at least two of these together; a clear teaching pass here would be new and useful, and is honestly needed just to film correctly.
- Nothing found targets non-technical women specifically for Gemini (unlike some general "beginner" framing elsewhere) — an explicit gap LAiDIES could fill.
- A clear "this is what changed and when" rename timeline (Extensions→apps→Connected Apps; Personalization→Personal Intelligence; NotebookLM→Gemini Notebook; Gemini Agent→Gemini Spark) does not exist anywhere as a single resource — this file itself may be closer to that than anything found in the wild.

## 🔴 Confidence
**Would stake something on:** Gemini Notebook is the current name for NotebookLM as of 2026-07-16 (5+ independent dated sources, including Google's own blog). Gemini Spark is the current official name for the 24/7 agent, confirmed in Google's own I/O 2026 post (2026-05-19). Connected Apps is the current name for the integrations feature in most current material (3+ sources, Dec 2025–June 2026), though see the Workalizer contradiction below. Gems and the Gems creation click path are stable and well corroborated. Scheduled Actions live under Settings and require a paid tier per at least one clear tutorial, though the exact tier and the "10 action" cap are single-source.

**Would not stake anything on:** the exact current ordering/contents of the full settings sidebar post-January-2026 (only pre-launch Dec 2025 screenshot found) — verify in app before filming. Whether "Personal Intelligence" replaced "Personal context" as a sidebar entry or sits beside it. The desktop-vs-mobile "Guided Learning"/"Learn" chip label split. Any exact mode-chip list under the message box (two sources give two different, non-overlapping lists, likely describing two different UI surfaces, not corroborated against each other).

**Three least-confident findings:**
1. Whether "Connected Apps" has fully and permanently displaced "Extensions" in Google's own UI, given one March-2026-dated source still uses "Extensions" — CHANGED / verify in app before filming.
2. Whether Personal Intelligence is a rename of Personal context or an additional adjacent feature — genuinely unresolved by the sources found.
3. Whether native "Projects" (chat folders) has shipped yet, given one report described it as visible-but-non-functional and this area moves fast — needs a same-day check right before filming, not a reused finding.
