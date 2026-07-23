tool: Microsoft Copilot (consumer + Microsoft 365 Copilot at work)
vendor: Microsoft
tiers_as_of_2026-07-22:
  - Copilot (free) — copilot.microsoft.com, Copilot app (Windows/iOS/Android), Copilot in Edge. Sign in with a personal Microsoft Account (MSA); no cost. Source: https://www.microsoft.com/en-us/microsoft-copilot (checked 2026-07-22).
  - Microsoft 365 Personal — $9.99/mo or $99.99/yr. Copilot in Word/Excel/PowerPoint/Outlook for the owner only, "higher usage than free" for select features. Source: https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products (checked 2026-07-22).
  - Microsoft 365 Family — $12.99/mo or $129.99/yr, up to 6 people share storage/apps, but Copilot/AI features apply to the subscription owner only. Same source, checked 2026-07-22.
  - Microsoft 365 Premium — $19.99/mo or $199.99/yr. Replaces the retired Copilot Pro; adds Researcher and Analyst agents, "Browse with Copilot" agentic mode, extended usage limits, 6TB storage. Sources: https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products and https://www.microsoft.com/en-us/microsoft-365/blog/2025/10/01/meet-microsoft-365-premium-your-ai-and-productivity-powerhouse/ (published 2025-10-01, checked 2026-07-22).
  - Copilot Pro (legacy, $20/mo) — no longer sold to new customers. Existing subscribers can keep it until they cancel or "support ends" 2026-08-01. Source: https://support.microsoft.com/en-us/microsoft-365-copilot/about-microsoft-copilot-pro and the 2025-10-01 Microsoft 365 Blog post above (checked 2026-07-22).
  - Microsoft 365 Copilot Chat — free add-on for eligible work/school Microsoft 365 plans (no separate Copilot licence needed); lighter-weight chat, grounded in the open web plus files you upload, not full tenant data. Source: https://www.microsoft.com/en-us/microsoft-365-copilot/pricing (checked 2026-07-22).
  - Microsoft 365 Copilot (business add-on licence) — $21/user/mo standard (annual), promotional $18/user/mo through 2026-09-30, or $25.20/user/mo billed monthly. Requires an existing qualifying Microsoft 365 business/enterprise plan. Source: https://www.microsoft.com/en-us/microsoft-365-copilot/pricing (checked 2026-07-22).
  - Microsoft 365 Business Standard/Premium with Copilot bundled — $23.50–$32/user/mo (annual), $28.20–$38.40/mo billed monthly. Same source, checked 2026-07-22.
  - Microsoft 365 E7 Frontier Suite — $99/user/mo, launching 2026-05-01 per Microsoft's announcement; bundles E5 + Microsoft 365 Copilot + "Agent 365." Source: press coverage only (epcgroup.net, velosio.com), NOT independently confirmed on a microsoft.com page during this research — flagged NOT VERIFIED at vendor-primary level, checked 2026-07-22.
checked_utc: 2026-07-22T00:00:00Z

---

## Note on scope

"Microsoft Copilot" spans two overlapping surfaces that Microsoft documents separately:
1. **Consumer Copilot** — copilot.microsoft.com, the Copilot Windows/mobile app, Copilot in Edge. Signed in with a personal Microsoft Account. Support docs live under `support.microsoft.com/en-us/microsoft-copilot/...`.
2. **Microsoft 365 Copilot** — Copilot inside Word/Excel/PowerPoint/Outlook/Teams, signed in with a work or school (Entra ID) account, or a personal Microsoft 365 Personal/Family/Premium subscription. Support docs live under `support.microsoft.com/en-us/microsoft-365-copilot/...`.

Every section below states which surface(s) a claim applies to. Where Microsoft documents a feature for only one surface, that is stated explicitly rather than assumed to carry over.

---

## 1. Memory / personalisation

**Vendor's name for it:** "Memory and personalization" (consumer Copilot); "Copilot Memory" / "Enhanced personalization" (Microsoft 365 Copilot).

**What it IS:** Copilot automatically saves details it infers are useful from your chats — communication style, recurring topics, stated preferences — and uses them to shape later answers without you having to repeat yourself.

**How to set it up:**
- Consumer (copilot.microsoft.com / Copilot Windows or Mac app): profile icon → profile name → **Memory** → **Personalization and memory**. Toggle on/off there. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls, checked 2026-07-22, no page date shown)*
- Consumer, alternate path per Microsoft's individuals page: **Settings → Account → Privacy → Personalization and memory** toggle. *(documented, https://www.microsoft.com/en-us/microsoft-copilot/for-individuals/do-more-with-ai/general-ai/ai-that-doesnt-just-remember-it-gets-you, published 2025-05-16, checked 2026-07-22)* — two different click paths appear across Microsoft's own pages; treat both as current until confirmed which is stale.
- Microsoft 365 Copilot (work): profile icon → **Settings → Personalization**, where Saved memories, Custom instructions, and Chat history each have their own on/off toggle. *(documented, https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-personalization-memory, ms.date 2025-11-18, page updated 2026-05-22, checked 2026-07-22)*
- To view what's stored: ask Copilot directly, "What do you know about me?"
- To delete one fact: "Forget that I like science fiction movies." To wipe everything: profile → Memory → **Delete all Memory**.

**What it's genuinely for:** Skipping repeated context ("I'm vegetarian," "I write in British English") across sessions rather than a single long-lived project.

**The ONE mistake people make:** Assuming "delete all memory" also deletes conversation history, or that turning memory off stops Microsoft from using chat content for advertising/safety/compliance purposes. Neither is true — memory and conversation history are deleted separately, and conversation history is retained 18 months regardless of the memory toggle. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls, checked 2026-07-22)*

**Tier:** Free on consumer Copilot for any personal Microsoft Account. On Microsoft 365 Copilot, available to Copilot Chat users with or without a full Copilot licence, but Microsoft's own page labels the whole feature **"in preview and subject to change,"** tied to the "Frontier" early-access program. *(documented, https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-personalization-memory, checked 2026-07-22)*

**What it does NOT do:**
- Does not delete conversation history when you delete memory.
- On work accounts, memory is stored in a hidden folder in your Exchange mailbox (item class visible as `<'CopilotMemory'>` under `<IPM.Contact>`), so it inherits mailbox-level security/compliance policies (Customer Lockbox, encryption at rest) and is **discoverable via Microsoft Purview eDiscovery** — an admin can search, export, and delete it, though Purview retention-label policies (e.g., "delete after 3 months") do **not** automatically apply to memory. Custom instructions specifically are not eDiscoverable but can be manually exported by the user. *(documented, https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-personalization-memory, checked 2026-07-22)*
- No audit-log entries are generated for memory/personalization actions in Purview.
- A tenant admin cannot restrict *what kind* of information gets added to memory, only turn the whole capability off.
- Temporary chats are still discoverable by admins even though they don't affect memory.

**Sources:**
- https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls (checked 2026-07-22, no page date)
- https://www.microsoft.com/en-us/microsoft-copilot/for-individuals/do-more-with-ai/general-ai/ai-that-doesnt-just-remember-it-gets-you (published 2025-05-16, checked 2026-07-22)
- https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-personalization-memory (ms.date 2025-11-18; updated_at 2026-05-22; checked 2026-07-22)
- https://support.microsoft.com/en-us/microsoft-365-copilot/personalize-what-microsoft-365-copilot-remembers (checked 2026-07-22, no page date)

**Volatility: HIGH.** The work-account version is explicitly marked "in preview and subject to change" by Microsoft itself, and the release notes (see Section 8/Traps) show Microsoft already announced a further memory update rolling out in 2026.

---

## 2. Custom instructions / profile

**Vendor's name for it:** "Custom instructions" (both surfaces); on consumer Copilot it sits inside the Memory/Personalization panel rather than as its own menu item.

**What it IS:** A standing block of text you write once — about yourself and how you want answers formatted — that Copilot applies to every new conversation without you retyping it.

**How to set it up:**
- Microsoft 365 Copilot (work account, Copilot Chat): top right → **Settings and more → Chat settings → Personalization → Custom instructions tile → Edit instructions**. You can pick from Microsoft's suggested instructions or write your own; there's a toggle to turn the whole thing off. *(documented, https://support.microsoft.com/en-us/microsoft-365-copilot/customize-how-microsoft-365-copilot-responds-to-you, checked 2026-07-22, no page date confirmed)*
- Consumer Copilot: Microsoft's own privacy-controls page describes this as part of Memory — "Users can create custom instructions to further personalize Copilot's responses" — reached via the same profile → Memory → Personalization and memory panel rather than a separate settings tile. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls, checked 2026-07-22)*

**What it's genuinely for:** Tone and format defaults (e.g., "always answer in bullet points," "I'm a beginner, avoid jargon") — the stuff you'd otherwise paste into every prompt.

**The ONE mistake people make:** Assuming custom instructions are erased if an admin (work accounts) or the user disables the personalization control — they're not. Microsoft's own docs state that turning the control off stops Copilot from *applying* the instructions, but the instructions themselves stay stored until manually deleted. *(documented, https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-personalization-memory, checked 2026-07-22)*

**Tier:** Free on consumer Copilot (any signed-in MSA). On Microsoft 365 Copilot, available regardless of whether the account holds a full Copilot licence, subject to the tenant admin's "Enhanced personalization" setting being on (it's on by default). *(documented, same source, checked 2026-07-22)*

**What it does NOT do:** Does not sync between the consumer Copilot account and a separate work/school Copilot account — they are different Microsoft identities with separate settings panels entirely.

**Sources:**
- https://support.microsoft.com/en-us/microsoft-365-copilot/customize-how-microsoft-365-copilot-responds-to-you (checked 2026-07-22)
- https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls (checked 2026-07-22)
- https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-personalization-memory (ms.date 2025-11-18, checked 2026-07-22)

**Volatility: MEDIUM.** Stable concept, but exact menu wording/location has moved at least once (compare the two different click paths found for consumer Memory above).

---

## 3. Projects / Spaces / Gems / GPTs (the vendor's own word for a container)

**Vendor's name for it:** **Copilot Notebooks** (current name). A related but distinct construct, **Copilot Pages**, is being folded into the Notebooks experience.

**What it IS:** A saved workspace that holds a specific set of files, links, meeting notes, and chats about one task or topic, so Copilot's answers inside it are scoped to just that material instead of everything you've ever touched.

**How to set it up:**
- Go to microsoft365.com → app launcher (top-left) → **Notebooks** → **New notebook**. Add references (Word/Excel/PowerPoint files, Copilot Pages, links, meeting transcripts). *(documented, https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-with-microsoft-365-copilot-notebooks, page updated April 2026, checked 2026-07-22)*
- Also reachable inside the Microsoft 365 Copilot app and, as of 2026, the OneNote Windows app (version 2510+).

**What it's genuinely for:** Keeping one notebook per project (a report, a course, a client) so Copilot answers only from that notebook's material rather than guessing from your whole inbox/drive.

**The ONE mistake people make:** Assuming Notebooks require a full paid work licence — Microsoft explicitly extended them to **Microsoft 365 Personal, Family, and Premium** subscribers, not just Microsoft 365 Copilot licence holders. The account still needs a SharePoint or OneDrive service plan attached to create one. *(documented, same source, checked 2026-07-22)*

**Tier:**
- Work: Microsoft 365 Copilot or Copilot Chat licence.
- Personal: Microsoft 365 Personal, Family, or Premium subscription (not the free copilot.microsoft.com tier). *(documented, https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-with-microsoft-365-copilot-notebooks, checked 2026-07-22)*

**What it does NOT do:** As of this check, the **redesigned** Notebooks experience (richer references, an Overview page, faster artifact creation) is rolling out separately from the original consumer version — Microsoft's own 2026 release material notes the updated experience was "unavailable to Microsoft 365 Personal, Family, and Premium subscribers" at time of that announcement, meaning personal-tier users may be on an older Notebooks UI than work-tier users. *(documented, techcommunity.microsoft.com/Microsoft 365 Copilot blog — vendor blog, not support doc; checked 2026-07-22)*

**Sources:**
- https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-with-microsoft-365-copilot-notebooks (page updated April 2026, checked 2026-07-22)
- https://support.microsoft.com/en-us/microsoft-365-copilot/compare-microsoft-loop-copilot-pages-and-copilot-notebooks (checked via search snippet 2026-07-22; not independently fetched in full — treat the Loop/Pages/Notebooks distinctions as needing a direct re-check before filming)
- https://techcommunity.microsoft.com/blog/microsoft365copilotblog/meet-the-updated-copilot-notebooks-experience... (vendor blog, checked 2026-07-22)

**Volatility: HIGH.** This is the single most actively-changing surface found in this research — Microsoft shipped a redesign in 2026 and is still rolling it out unevenly across personal vs. work tiers.

---

## 4. File upload & knowledge

**Vendor's name for it:** "File upload" (consumer); "Files" / "file formats supported by Microsoft 365 Copilot" (work).

**What it IS:** You attach a document or image to a chat message and Copilot reads it to answer questions, instead of you pasting the text in by hand.

**How to set it up (consumer Copilot):** Press the **+ (Open)** icon in the composer → **Add images or files** → pick the file → ask your question. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/file-upload-in-microsoft-copilot, checked 2026-07-22, no page date shown)*

**What it's genuinely for:** One-off document Q&A (summarize this PDF, extract these numbers from this spreadsheet) inside a single conversation.

**The ONE mistake people make:** Assuming an uploaded file becomes part of Copilot's ongoing memory or knowledge base. It doesn't — it's scoped to that conversation, and Microsoft states files are stored "securely for up to 18 months and then automatically deleted," and are **not** used to train the underlying model. *(documented, same source, checked 2026-07-22)*

**Tier:** Free tier: supports upload, but Microsoft has documented tighter throttling on the free web version specifically (see limits below, though one of these figures came from a community source, not a support article — flagged). Documented limits from the official support page apply regardless of tier.

**What it does NOT do — limits:**
- **Documented (official support page):** up to 20 files per conversation, 50MB max file size; supported types are PDF, DOCX, XLSX, PPTX, PNG, JPEG, PJP, JFIF, TXT, TEXT, JSON, CSV, MD. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/file-upload-in-microsoft-copilot, checked 2026-07-22)*
- **NOT VERIFIED at vendor-primary level:** a commonly repeated figure that the free web version of Copilot is capped at "3 files per 24 hours" with a 512MB size ceiling — this appeared only in third-party/community sources during this research, not in a Microsoft support article fetched directly. Do not teach this number until it's confirmed on a Microsoft page.
- **NOT VERIFIED:** exact daily upload caps for Microsoft 365 Copilot Chat by tier — Microsoft's own Q&A/community answers acknowledge limits exist and can be lowered "to keep Microsoft 365 Copilot Chat accessible during peak times" but do not publish a fixed number. *(learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-file-upload-control exists as an admin-controls doc; not fetched in full this pass.)*

**Sources:**
- https://support.microsoft.com/en-us/microsoft-copilot/file-upload-in-microsoft-copilot (checked 2026-07-22, no page date)
- https://support.microsoft.com/en-us/microsoft-365-copilot/file-formats-supported-by-microsoft-365-copilot (checked via search snippet 2026-07-22, not fetched in full)

**Volatility: MEDIUM.** Microsoft has already changed the per-prompt size ceiling once (removed a 1MB cap, raised to 512MB per Microsoft's own community posts); exact numbers should be re-checked before filming.

---

## 5. Connectors / integrations

**Vendor's name for it:** **Copilot Connectors** on both surfaces — but they are two different products under one name.

**What it IS:** A permission you grant once so Copilot can look inside an external account (your email, your cloud drive) when answering, instead of you having to paste that information in every time.

**How to set it up:**
- **Consumer Copilot:** Profile → **Connectors** → **Connect** next to the service → sign in and authorize. Or just ask ("What's on my Outlook calendar tomorrow?") and Copilot will prompt for the connection. Toggle off any time from the same **Profile → Connectors** panel, or via the **+ → Use connectors** icon on copilot.microsoft.com. *(documented, https://support.microsoft.com/en-us/topic/connecting-microsoft-copilot-to-other-services-cc06f6ef-a885-4187-9380-712bb4cabac8, checked 2026-07-22, no page date shown)*
  - Supported today: OneDrive, Outlook.com (mail/calendar/contacts), Google Drive, Gmail, Google Calendar, Google Contacts.
  - Began rolling out to Windows Insiders 2025-10-09 (Copilot app v1.25095.161.0+), per Microsoft's Windows Insider blog — press/vendor-blog date, labelled as such. *(blogs.windows.com/windows-insider/2025/10/09/copilot-on-windows-connectors-and-document-creation/, checked 2026-07-22)*
- **Work (Microsoft 365 Copilot connectors):** an admin-side feature, not a personal toggle — connects line-of-business systems (SharePoint, ServiceNow, Jira, etc.) into the Microsoft Graph index so Copilot can "ground" answers in that data. Set up via Microsoft admin center / Graph connector configuration, not by an end user in chat. Microsoft describes "over 100" available connectors as of 2026, with 35 new Microsoft-built connectors reaching General Availability. *(documented, https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-copilot-connector, checked 2026-07-22)*

**What it's genuinely for:** Consumer connectors — quick personal-account lookups ("find that email," "what's on my calendar"). Work connectors — letting Copilot search a company's SharePoint/ticketing/CRM data alongside Office files, configured once by IT for everyone.

**The ONE mistake people make:** Confusing the two. A personal Microsoft Account owner cannot "connect" their employer's SharePoint from the consumer Copilot Connectors panel — the enterprise version is an admin-provisioned, tenant-wide feature, not a self-service toggle.

**Tier:** Consumer connectors: free, available on copilot.microsoft.com and Copilot Mobile with sign-in (no subscription required — not explicitly gated in the support doc). Work connectors: require Microsoft 365 Copilot licensing at the tenant/admin level; the specific connector catalog is a separate Microsoft 365/SharePoint admin licensing question not detailed on the consumer support page.

**What it does NOT do:** Copilot "does not store, modify, or expand your access" — it only surfaces what your own account already has permission to see, and requests are sent live to the connected service rather than cached inside Copilot. *(documented, https://support.microsoft.com/en-us/topic/connecting-microsoft-copilot-to-other-services-cc06f6ef-a885-4187-9380-712bb4cabac8, checked 2026-07-22)*

**Sources:**
- https://support.microsoft.com/en-us/topic/connecting-microsoft-copilot-to-other-services-cc06f6ef-a885-4187-9380-712bb4cabac8 (checked 2026-07-22, no page date)
- https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-copilot-connector (checked 2026-07-22)
- https://blogs.windows.com/windows-insider/2025/10/09/copilot-on-windows-connectors-and-document-creation/ (dated 2025-10-09, vendor blog, checked 2026-07-22)

**Volatility: HIGH** for consumer connectors (still rolling out from Windows Insider as of late 2025, service list likely to grow); **MEDIUM** for enterprise connectors (mature but catalog keeps expanding).

---

## 6. Extensions / plug-ins / skills / MCP

**Vendor's name for it:** **Agents** built with **Agent Builder**, distributed via the **Agent Store** (work/Microsoft 365 Copilot). On the developer side, **Microsoft Copilot Studio** supports the **Model Context Protocol (MCP)**. Consumer Copilot does not currently document an MCP or "plugin" feature under that name.

**What it IS:** A way to give Copilot a defined, reusable job — "summarize my team's weekly status," "answer questions using only this website" — without writing code, then let other people install and run that same job.

**How to set it up (work account):**
- **Agent Builder:** Microsoft 365 Copilot app → **Agents** (left sidebar) → **New Agent** → describe what you want in plain language or start from a template → Microsoft 365 Copilot builds it. *(documented, https://support.microsoft.com/en-us/microsoft-365-copilot/build-your-own-agent-with-microsoft-365-copilot, checked 2026-07-22, no page date shown; account-tier eligibility — i.e., whether Microsoft 365 Personal/Premium subscribers can use Agent Builder, or only work/school accounts — is **NOT VERIFIED**, the support page doesn't state it)*
- **Agent Store:** central catalog inside Microsoft 365 Copilot (Teams, Outlook, Word, Excel, PowerPoint) to browse, install, and try agents built by Microsoft, partners, or your own organization. *(documented, https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-agent-store, checked 2026-07-22, no page date shown)*
- **MCP in Copilot Studio (developer-facing):** an onboarding wizard inside Copilot Studio lets a maker connect an agent to an existing MCP server, choosing which tools/resources to expose and configuring API-key or OAuth 2.0 authentication. Microsoft announced this reached General Availability via its own Copilot Studio blog. *(documented, https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/model-context-protocol-mcp-is-now-generally-available-in-microsoft-copilot-studio/, checked 2026-07-22, no specific GA date captured in this pass — re-check before filming)*

**What it's genuinely for:** A team lead building one narrow, reusable assistant (grounded in specific SharePoint files or a public website) that colleagues can find and use without each person re-explaining the same context every time.

**The ONE mistake people make:** Assuming Copilot's "agents" work like a general-purpose plug-in store the way older Bing Chat "plugins" (Instacart, OpenTable, Kayak, circa 2023) did. Microsoft's current architecture is different — free declarative agents (grounded in instructions and public websites) sit alongside separately metered/billed agents in the Agent Store, and some agents (Researcher, Analyst) are Microsoft-built and pre-pinned rather than user-installed extensions. **NOT VERIFIED:** this research did not find a Microsoft page explicitly stating the original 2023 Bing Chat plugin system was formally retired — treat any claim that "Copilot plugins were shut down" as unconfirmed until a vendor page is found.

**Tier:** Agent Builder / Agent Store: Microsoft 365 Copilot Chat context (work/school); consumer-tier eligibility NOT VERIFIED. MCP in Copilot Studio: Copilot Studio is a separate, maker-oriented licensed product, not part of consumer or standard Microsoft 365 Copilot pricing — exact Copilot Studio pricing was out of scope for this pass and should be verified separately if needed.

**What it does NOT do:** The Agent Builder support page does not document any consumer/personal-account path — do not assume Microsoft 365 Personal/Premium subscribers can build agents until confirmed.

**Sources:**
- https://support.microsoft.com/en-us/microsoft-365-copilot/build-your-own-agent-with-microsoft-365-copilot (checked 2026-07-22, no page date)
- https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-agent-store (checked 2026-07-22, no page date)
- https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/model-context-protocol-mcp-is-now-generally-available-in-microsoft-copilot-studio/ (checked 2026-07-22)

**Volatility: HIGH.** Microsoft is reportedly merging its consumer and enterprise Copilot apps into one by August 2026 and adding paid agents — per a secondary/press source (windowsforum.com), **NOT VERIFIED** on a microsoft.com page during this pass, but worth flagging as likely to reshape this entire section.

---

## 7. Automations / scheduled tasks

**Vendor's name for it:** **Copilot Tasks** (consumer); **Actions** (Microsoft 365 Copilot, built on Power Platform).

**What it IS:** You describe a job in plain language and Copilot either does it once immediately or repeats it on a schedule you set, without you opening a new chat each time.

**How to set it up:**
- **Consumer (Copilot Tasks):** managed from the **Tasks view** inside the Copilot app; a task can be one-time or scheduled/recurring, can browse websites, generate or edit files, and use any services you've already connected. You can pause, stop, or take manual control mid-task, and it prompts for your explicit approval before money changes hands, personal information is submitted, or an account setting changes. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks, checked 2026-07-22, no page date shown)*
- **Work (Actions):** built from Power Automate flows, certified connectors, or prompts, and added to Microsoft 365 Copilot as a reusable "if this business behavior, then do this" definition (e.g., auto-generate an end-of-day summary of action items). *(documented, https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-business-applications, checked 2026-07-22, no page date shown)*
- **Work (scheduled prompts to agents):** as of Microsoft's Fall 2025 release, you can schedule a recurring prompt to declarative agents like Researcher, Analyst, or Idea Coach, and get an email notification when a scheduled run finishes. *(documented, per Microsoft's own 2025 Release Notes for Microsoft 365 Copilot, https://learn.microsoft.com/en-us/microsoft-365/copilot/previous-year-release-notes, checked 2026-07-22)*

**What it's genuinely for:** Recurring, low-judgment work — a weekly research digest, a standing "summarize what changed" prompt — where the value is in not having to remember to ask.

**The ONE mistake people make:** Treating Tasks as safe to leave fully unsupervised for anything involving money, other people's data, or account changes. Microsoft's own documentation is explicit that Tasks are unsuited to "highly sensitive/critical activities" and cannot be used for illegal activity, unauthorized account/data access, handling someone else's personal data without consent, or bypassing security — and it still requires your approval at those decision points regardless of the schedule you set. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks, checked 2026-07-22)*

**Tier:** Consumer Copilot Tasks: not explicitly gated to a paid tier in the support article reviewed — **NOT VERIFIED** whether free-tier accounts get the same task limits as Microsoft 365 Premium subscribers. Work Actions: require the relevant Microsoft 365 Copilot licensing plus Power Platform entitlements.

**What it does NOT do:** Tasks perform poorly (per Microsoft's own caveat) on advanced document design work and on websites that actively restrict automated interaction — it is not a universal browser-automation tool.

**Sources:**
- https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks (checked 2026-07-22, no page date)
- https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-business-applications (checked 2026-07-22, no page date)
- https://learn.microsoft.com/en-us/microsoft-365/copilot/previous-year-release-notes (checked 2026-07-22)

**Volatility: HIGH.** Microsoft's own support page describes this feature as actively evolving ("preview" language appears across related release notes); the underlying safety/approval rules are the part most likely to tighten.

---

## 8. Modes people miss (voice, vision, agentic browsing, reasoning modes)

**Vendor's name for it:** **Conversation modes** (Quick response, Think Deeper, Study and learn, Smart, Search), **Copilot Voice**, **Copilot Vision**, **Browse with Copilot**.

**What it IS:**
- **Conversation modes** — a switch under the prompt box that changes how Copilot answers: Quick response (instant), Think Deeper (up to ~10 seconds, shows its reasoning, uses OpenAI reasoning models), Study and learn (explains concepts, quizzes you), Smart (GPT-5, decides on its own whether to reason deeply or answer fast), Search (pulls current web results with citations). *(documented, https://support.microsoft.com/en-au/topic/conversation-modes-quick-response-think-deeper-deep-research-smart-575efe12-eb34-4437-885a-440f7623cffb, checked 2026-07-22, no page date shown)*
- **Copilot Voice** — you talk to Copilot and it talks back, using speech recognition and a spoken response, with an on-screen transcript.
- **Copilot Vision** — Copilot looks at your shared screen, browser tab, or phone camera and answers questions about what it sees; it does **not** click, type, or scroll for you (that's Tasks/Browse, not Vision).
- **Browse with Copilot** — an agentic mode inside Copilot in Edge where Copilot itself clicks, types, and navigates a browser tab on your behalf while you watch and can take back control.

**How to set it up:**
- Conversation modes: tap "Quick response" under the prompt box before submitting, and choose a different mode.
- Voice: tap the microphone icon in the composer; first use requires granting microphone access; pick a voice under profile → Voice (web) or Settings → Voice (Windows/Mac app).
- Vision: click the glasses icon in the composer (Windows/mobile) or the Voice button then screen-share arrow (Edge); stop anytime via "Stop sharing."
- Browse with Copilot: in Copilot inside Microsoft Edge, select **Browse with Copilot** in the text box, then phrase requests with action verbs ("Open," "Find," "Book," "Add"); for the page you're already on, start with "In my browser..." or "On my current page...". *(documented, https://support.microsoft.com/en-us/microsoft-copilot/browse-with-copilot, checked 2026-07-22, no page date shown)*

**What it's genuinely for:** Voice — hands-free, conversational use. Vision — getting help with something visual (a form, a setting, a photo) without typing a description of it. Think Deeper/Smart — harder questions where a fast shallow answer would be wrong. Browse with Copilot — multi-step web errands (compare listings across tabs, fill a simple booking) you'd otherwise do by hand.

**The ONE mistake people make:** Letting **Browse with Copilot** touch anything financial or identity-related. Microsoft's own support page lists this as a thing to actively avoid — banking, trading, credit cards, SSNs, government IDs, medical records, or any "highly confidential data" — and separately warns about prompt-injection risk (a malicious webpage tricking the agent into an unintended action) as a live concern, not a hypothetical. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/browse-with-copilot, checked 2026-07-22)*

**Tier:**
- Conversation modes, Voice: free, all users. Microsoft 365 Personal/Family/Premium subscribers get "priority access" to Voice/Think Deeper only when capacity is constrained, not a hard free/paid split.
- Vision: free with standard usage limits; Microsoft 365 Personal/Family/Premium subscribers get extended usage limits.
- **Browse with Copilot: Microsoft 365 Premium subscribers only, and only rolling out in the US first, with other markets "to follow."** This is a genuine paid-tier-exclusive feature as of this check. *(documented, https://support.microsoft.com/en-us/microsoft-copilot/browse-with-copilot, checked 2026-07-22)*

**What it does NOT do:**
- Vision "does not engage directly with your PC, the web, or your phone on your behalf" — it only observes and advises; it cannot analyze DRM-protected or certain harmful content; it's unavailable to commercial (Entra ID) accounts per Microsoft's own page.
- Browse with Copilot blocks sites that violate Copilot's content policies, sites on user block lists, and adult/gambling/high-risk domains; it restricts access to saved passwords, autofill data, and wallet information even when browsing.
- No images from a Vision session are retained after the session ends (only text responses are logged for safety review).

**Sources:**
- https://support.microsoft.com/en-au/topic/conversation-modes-quick-response-think-deeper-deep-research-smart-575efe12-eb34-4437-885a-440f7623cffb (checked 2026-07-22, no page date)
- https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-vision-with-microsoft-copilot (checked 2026-07-22, no page date)
- https://support.microsoft.com/en-us/topic/using-copilot-voice-with-microsoft-copilot-efad42fc-d593-49c6-98bf-5ed94c881c32 (checked 2026-07-22, no page date)
- https://support.microsoft.com/en-us/microsoft-copilot/browse-with-copilot (checked 2026-07-22, no page date)

**Volatility: HIGH** for Browse with Copilot (US-only preview-stage rollout); **MEDIUM** for Voice/Vision/conversation modes (stable concepts, usage limits move often and are described only in relative terms — "extended," "priority" — by Microsoft, not fixed numbers).

---

## Screen-recordable moments

1. **The Memory reveal** — asking Copilot "What do you know about me?" and watching it list back inferred facts. Cannot be understood from a paragraph; the surprise of what it kept (and what it didn't) is the whole lesson.
2. **Deleting one memory vs. deleting all memory vs. deleting chat history** — three different buttons in three different places with three different scopes. A viewer needs to see all three to stop conflating them.
3. **Building a Notebook and watching Copilot answer only from what's inside it** — ask a question the notebook's references don't cover and show it decline/hedge, versus asking one they do cover.
4. **Connectors: the permission screen.** Watching the actual OAuth-style "Authorize Copilot to access your Outlook.com account" consent screen — this is where people should learn to actually read what they're granting.
5. **Browse with Copilot in action** — the glowing/orange-outlined shared tab, Copilot clicking and typing on its own, and the moment it stops and asks for approval before a sensitive step. This is the single hardest-to-describe-in-text feature in this file.
6. **Conversation-mode switch, same question, two answers** — asking one factual question in Quick response vs. Think Deeper side-by-side to make the reasoning-time tradeoff visible.

## Traps and corrections

- **Name collision, flagged once as instructed:** "Copilot" is also the name of GitHub Copilot, an unrelated developer coding tool from a different Microsoft-owned product line (GitHub), with its own CLI, plugins, and pricing. Nothing in this file applies to GitHub Copilot. If a reader has heard "Copilot" from a developer, they may be thinking of the wrong product entirely.
- **Copilot Pro is gone, and most 2025-and-earlier guides are now wrong.** Microsoft retired the standalone $20/month Copilot Pro subscription; new consumer sign-ups get **Microsoft 365 Premium** ($19.99/mo) instead, and existing Copilot Pro subscribers lose support on 2026-08-01. Any guide still telling a reader to "buy Copilot Pro" is stale. Source: https://www.microsoft.com/en-us/microsoft-365/blog/2025/10/01/meet-microsoft-365-premium-your-ai-and-productivity-powerhouse/ (2025-10-01) and https://support.microsoft.com/en-us/microsoft-365-copilot/about-microsoft-copilot-pro, both checked 2026-07-22.
- **"Copilot connectors" means two unrelated things depending on which account you're signed into.** A personal-account reader who hears "connectors" from a work colleague may go looking for a SharePoint/ServiceNow connector panel that does not exist on their consumer account, and vice versa — see Section 5.
- **Deleting memory does not delete history, and turning off ad-personalization settings does not stop Microsoft from using conversations for "advertising, digital safety, security, and compliance purposes."** This is widely assumed to be one control; Microsoft's own privacy-controls page is explicit that it is not. Source: https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls, checked 2026-07-22.
- **Copilot Notebooks and Copilot Pages are being merged, not staying as two separate permanent products.** Guides written before 2026 that treat Pages as the primary "container" concept are describing a feature Microsoft is actively consolidating into Notebooks. Source: https://support.microsoft.com/en-us/microsoft-365-copilot/compare-microsoft-loop-copilot-pages-and-copilot-notebooks (checked 2026-07-22) plus 2026 Notebooks release-note coverage on Microsoft's own Community Hub blog.
- **Work-account Copilot Memory is explicitly labelled a preview feature by Microsoft itself**, not a settled, permanent capability — treat every specific mechanic described in Section 1 (Exchange-folder storage, eDiscovery behavior, retention timing) as subject to change without much notice.
