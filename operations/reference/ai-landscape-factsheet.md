# AI Landscape Fact-Sheet (Verified & Sourced)

## Last verified: 2026-07-10

**Purpose.** Locked reference for the educational series. Every claim carries a source URL + date. Where a fact could not be verified, or sources disagree, it is listed in the "NOT VERIFIED / UNCERTAIN" section at the bottom rather than smoothed over.

**Source-type tags used below:**
- `[primary]` = the company's own docs/site.
- `[primary-marketing]` = the company's own launch/marketing page (self-reported; treat benchmark boasts skeptically).
- `[press]` = independent, reputable tech press.
- `[secondary]` = aggregator / blog / analysis site; lower confidence, used only where primary/press was unavailable. Flagged again in-line.

**One caveat that applies to the whole sheet:** the frontier moves weekly. Model names and "current flagship" claims below are true as of 2026-07-10 and will go stale fast. Re-verify before any content ships. This is exactly the failure mode the sheet exists to prevent.

---

## 1. WHO ACTUALLY BUILDS THEIR OWN MODELS

The honest headline: it is **not "just a handful."** More than a dozen organizations train their own foundation/frontier models today, plus a second tier of specialist labs that train their own single-modality models. It is a spectrum, and it is growing.

### Frontier general-purpose / chat labs (each trains its own models)

- **OpenAI** — trains the GPT family; current flagship GPT-5.6 (variants Sol/Terra/Luna), public July 9, 2026. — source: https://www.axios.com/2026/07/09/ai-openai-gpt-release (2026-07-09) `[press]`; https://en.wikipedia.org/wiki/GPT-5.6 (accessed 2026-07-10) `[secondary]`
- **Anthropic** — trains the Claude family; most capable widely released model is Claude Fable 5 (Mythos-class), GA June 9, 2026. — source: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 (accessed 2026-07-10) `[primary]`
- **Google DeepMind** — trains the Gemini family; Gemini 3 released Nov 18, 2025, with 3.1 Pro and 3.5 Flash following in 2026. — source: https://blog.google/products-and-platforms/products/gemini/gemini-3/ (2025-11-18) `[primary-marketing]`; https://gemini.google/release-notes/ (accessed 2026-07-10) `[primary]`
- **Meta** — trains the open-weight Llama family (Llama 4 generation; note its license excludes the EU). — source: https://informationmatters.net/wp-content/uploads/2026/05/foundation-model-providers-2026-landscape-v4.pdf (2026-05) `[secondary]`
- **xAI** — trains Grok; flagship Grok 4.3 (released ~Apr 30, 2026), with Grok 4.5 cited as its most intelligent; differentiator is native real-time access to X/Twitter data. — source: https://docs.x.ai/developers/models (accessed 2026-07-10) `[primary]`; https://techjacksolutions.com/ai-tools/grok/what-is-grok-4-3/ (2026) `[secondary]`
- **DeepSeek** — trains open-weight models; DeepSeek V4 (V4-Pro / V4-Flash) public preview April 24, 2026, MIT license, notably cheap. — source: https://kingy.ai/news/best-open-weight-ai-models-in-2026-glm-5-2-vs-deepseek-v4-vs-kimi-k2-6-vs-qwen-vs-mistral/ (2026) `[secondary]`
- **Mistral AI** (France/EU) — trains open-weight models; Mistral Large 3 (Dec 2, 2025, Apache 2.0), Mistral 3 family, new MoE family in July 2026 early access. — source: https://mistral.ai/news/mistral-3/ (accessed 2026-07-10) `[primary-marketing]`; https://www.techtimes.com/articles/319798/20260706/mistral-ai-targets-frontier-gap-open-weight-model-entering-july-early-access.htm (2026-07-06) `[press]`
- **Microsoft** — now trains its OWN models (MAI family), not only reselling others. Seven MAI models shown at Build 2026 (see Q6). — source: https://thenextweb.com/news/microsoft-mai-models-replace-openai-apps (2026) `[press]`
- **Amazon** — trains its own foundation models, the Amazon Nova family (e.g., Nova 2 Lite powering Nova Act), available in Amazon Bedrock. — source: https://aws.amazon.com/nova/ (accessed 2026-07-10) `[primary]`
- **Other notable trainers** cited in the 2026 landscape: Chinese labs Alibaba (Qwen), Zhipu (GLM-5.2), Moonshot (Kimi K2.6); plus Cohere and AI21 at smaller scale. — source: https://kingy.ai/news/best-open-weight-ai-models-in-2026-glm-5-2-vs-deepseek-v4-vs-kimi-k2-6-vs-qwen-vs-mistral/ (2026) `[secondary]`; https://informationmatters.net/wp-content/uploads/2026/05/foundation-model-providers-2026-landscape-v4.pdf (2026-05) `[secondary]`

### Specialist / single-modality labs that train their OWN models (NOT wrappers)

- **ElevenLabs** (voice/speech) — trains its own speech models; Eleven v3 went GA Feb 2, 2026. — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`
- **Suno** (music) — trains its own music-generation models (full songs from text). — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`
- **Midjourney** (images) — trains its own image-generation models. — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`
- **Runway** (video) — trains its own video models; Runway Gen-4 for professional AI video. — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`
- **Black Forest Labs** (images) — trains the open-weight FLUX image models (Schnell/Dev/Pro/Max tiers, plus Flux Kontext). — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`
- **Adobe** (images) — operates as a deep specialist (Firefly) training its own image models. — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`
- Framing confirmed: "Specialized models for image, video, and voice have split off from chat-first labs, with Adobe, Black Forest Labs, ElevenLabs, and Runway operating as deep specialists." — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`

### How many organizations build their own foundation/frontier models?

- Honest answer: **more than five — well over a dozen when you include specialist labs and Chinese labs — and growing.** The general-purpose frontier tier alone is often analyzed as ~9 companies (OpenAI, Anthropic, Google DeepMind, Meta in a top group; xAI, DeepSeek, Mistral, Cohere, and others below). — source: https://informationmatters.net/wp-content/uploads/2026/05/foundation-model-providers-2026-landscape-v4.pdf (2026-05) `[secondary]`
- Nuance to teach: it is a **spectrum**, not a binary. Building your own frontier model is now within reach of large clouds (Microsoft MAI, Amazon Nova) and even offered as a service — AWS "Nova Forge" lets customers build their own frontier models from Nova checkpoints. — source: https://aws.amazon.com/blogs/aws/introducing-amazon-nova-forge-build-your-own-frontier-models-using-nova/ (accessed 2026-07-10) `[primary]`

---

## 2. COMPANY vs MODEL vs APP

The three-layer distinction:
- **Company / lab** = the org that trains the model (OpenAI, Anthropic, Google DeepMind…).
- **Model** = the trained system, with a name and a version number (GPT-5.6, Claude Fable 5, Gemini 3.1 Pro).
- **App / product** = the interface you actually use (ChatGPT, the Claude app, the Gemini app, Copilot, Perplexity, Cursor).

The key teaching point: **the same model shows up inside many different apps** via API/licensing. The app is a wrapper; the intelligence underneath is often somebody else's model.

- **Perplexity** (search/answer app) is a multi-model wrapper: it routes queries to GPT-5.x, Claude, Gemini 3 Pro, Grok, and others, alongside its own "Sonar" model. — source: https://www.perplexity.ai/help-center/en/articles/10354919-what-advanced-ai-models-are-included-in-my-subscription (accessed 2026-07-10) `[primary]`; https://mcvtech.wordpress.com/2026/02/09/perplexity-pro-models-explained-when-to-use-sonar-gpt-5-claude-gemini-grok-more/ (2026-02-09) `[secondary]`
- **Cursor** (coding app) lets you pick models from OpenAI, Anthropic (incl. Claude Fable 5, Opus 4.8), Google (Gemini 3.1 Pro / 3.5 Flash), and xAI, plus Cursor's own Composer model. — source: https://techjacksolutions.com/ai-tools/cursor/cursor-models/ (2026) `[secondary]`
- **Microsoft Copilot** runs on a mix of Microsoft's own MAI models, OpenAI models, and Anthropic Claude models (see Q6). — source: https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-anthropic-apps (2026-05-06) `[primary]`
- Consequence: **one model, many front doors.** GPT models appear in ChatGPT, Copilot, Perplexity, and Cursor. Claude appears in the Claude app, Microsoft 365 Copilot, Cursor, and Perplexity. The app you like is often a UI + integrations layer over a model trained elsewhere. — source: (synthesis of the Perplexity, Cursor, and Copilot sources above)

---

## 3. ChatGPT

- **What it is:** ChatGPT is the consumer/enterprise app (chat interface, apps, Codex, and the new ChatGPT Work tool) made by **OpenAI**. — source: https://www.axios.com/2026/07/09/ai-openai-gpt-release (2026-07-09) `[press]`
- **Current flagship model behind it:** GPT-5.6, publicly released July 9, 2026 (previewed to limited partners June 26, 2026 under a government safety review). It ships in three tiers: **Sol** (most capable), **Terra** (balanced/everyday), **Luna** (fastest/cheapest). — source: https://www.axios.com/2026/07/09/ai-openai-gpt-release (2026-07-09) `[press]`; https://en.wikipedia.org/wiki/GPT-5.6 (accessed 2026-07-10) `[secondary]`
- **Prior flagship:** GPT-5.5, released April 23, 2026. — source: https://en.wikipedia.org/wiki/GPT-5.5 (accessed 2026-07-10) `[secondary]`
- **Differentiated strengths (self-reported + benchmark press):** GPT-5.6 Sol is positioned as state-of-the-art across coding, knowledge work, cybersecurity, and science, doing so with fewer tokens / lower cost than prior and competing frontier models. Sol is described as OpenAI's most capable model yet for long-horizon cyber tasks (vulnerability research/exploitation) — which is why the launch went through a government safety review. — source: https://en.wikipedia.org/wiki/GPT-5.6 (accessed 2026-07-10) `[secondary]`; https://www.axios.com/2026/07/09/ai-openai-gpt-release (2026-07-09) `[press]`
- Reach/ubiquity: ChatGPT remains OpenAI's flagship consumer product and one of the most widely used AI apps; exact current user counts not verified here (see UNCERTAIN).

---

## 4. Claude

- **What it is:** Claude is the model family and app made by **Anthropic** (Claude.ai, Claude Code, Claude Cowork, and the API). — source: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 (accessed 2026-07-10) `[primary]`
- **Current flagship model:** **Claude Fable 5** (API id `claude-fable-5`), described by Anthropic as "Anthropic's most capable widely released model, built for the most demanding reasoning and long-horizon agentic work." It sits in a new **Mythos-class** tier above the Opus class. 1M-token context; $10 / $50 per million input/output tokens. GA June 9, 2026. — source: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 (accessed 2026-07-10) `[primary]`
- **Mythos 5** (`claude-mythos-5`) = the same underlying model as Fable 5 but WITHOUT the safety classifiers; not generally available — limited release to approved cyberdefense/infrastructure customers via Project Glasswing. — source: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 (accessed 2026-07-10) `[primary]`; https://techcrunch.com/2026/06/09/anthropics-claude-fable-5-is-a-version-of-mythos-the-public-can-access-today/ (2026-06-09) `[press]`
- **Availability wrinkle (important for currency):** Fable 5 / Mythos 5 were suspended globally on ~June 12, 2026 after the US government imposed export controls, then **restored on July 1, 2026** once controls were lifted (June 30). As of 2026-07-10, Fable 5 is available again on Claude.ai, Claude Code, Claude Cowork, the API, and the major clouds. — source: https://www.anthropic.com/news/redeploying-fable-5 (accessed 2026-07-10) `[primary]`; https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html (2026-06-30) `[press]`
- **Prior premium model:** Claude Opus 4.8, released May 28, 2026 (just 41 days after Opus 4.7), $5 / $25 per million tokens. Still offered as a tier below Fable 5, alongside Sonnet and Haiku. — source: https://www.anthropic.com/news/claude-opus-4-8 (accessed 2026-07-10) `[primary]`; https://techcrunch.com/2026/05/28/anthropic-releases-opus-4-8-with-new-dynamic-workflow-tool/ (2026-05-28) `[press]`
- **Differentiated strengths:** software engineering, agentic/long-horizon work, and high-stakes professional/enterprise tasks (legal & financial document workflows); Opus 4.8 was specifically ~4× less likely than its predecessor to let coding flaws slip through unflagged, and introduced "Dynamic Workflows" (hundreds of parallel subagents in Claude Code). — source: https://www.anthropic.com/news/claude-opus-4-8 (accessed 2026-07-10) `[primary]`; https://techcrunch.com/2026/05/28/anthropic-releases-opus-4-8-with-new-dynamic-workflow-tool/ (2026-05-28) `[press]`

---

## 5. Gemini

- **What it is — and what it is NOT:** Gemini is a **full frontier model family in its own right**, trained by **Google DeepMind** — NOT merely "the AI inside Google's apps." Gemini 3 is Google's flagship reasoning/multimodal model line. — source: https://blog.google/products-and-platforms/products/gemini/gemini-3/ (2025-11-18) `[primary-marketing]`
- **Current lineup (mid-2026):**
  - Gemini 3 — released Nov 18, 2025; the flagship generation. — source: https://blog.google/products-and-platforms/products/gemini/gemini-3/ (2025-11-18) `[primary-marketing]`
  - Gemini 3.1 Pro — released ~Feb 19, 2026; the top-capability reasoning/agentic tier. — source: https://gemini.google/release-notes/ (accessed 2026-07-10) `[primary]`
  - Gemini 3.5 Flash & Gemini Omni — released May 19, 2026; Flash = fast frontier-level tier, Omni = video creation/editing. — source: https://gemini.google/release-notes/ (accessed 2026-07-10) `[primary]`
- **Genuine strengths (self-reported + leaderboard):** state-of-the-art reasoning "with unprecedented depth and nuance"; strong native multimodality (text, images, video, audio, code); topped the LMArena leaderboard (1501 Elo) at launch; positioned as Google's best coding/agentic model; long-horizon planning. — source: https://blog.google/products-and-platforms/products/gemini/gemini-3/ (2025-11-18) `[primary-marketing]`
- **Availability breadth (it is a platform, not one app):** Gemini is available across the Gemini app, AI Mode in Search, Google AI Studio, Vertex AI (developers), Google's agentic platform, AND third-party tools (Cursor, GitHub, JetBrains, Replit). — source: https://blog.google/products-and-platforms/products/gemini/gemini-3/ (2025-11-18) `[primary-marketing]`
- **Workspace integration = ONE feature, not the whole story:** Gemini being wired into Google Workspace (Docs, Gmail, etc.) is one deployment surface among many; the model itself competes head-to-head with GPT and Claude on the frontier. — source: https://blog.google/products-and-platforms/products/gemini/gemini-3/ (2025-11-18) `[primary-marketing]`

---

## 6. Microsoft Copilot — what model(s) it actually runs on

The correction to "Copilot is just GPT": **it is no longer just GPT.** Copilot is now a multi-model platform.

- Copilot runs on a **mix of three sources**: Microsoft's own in-house **MAI** models, **OpenAI** GPT models, and **Anthropic** Claude models — chosen per task. — source: https://the-decoder.com/copilot-goes-cheap-as-microsoft-phases-out-openai-and-anthropic-models-to-cut-costs/ (2026) `[press]`; https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-anthropic-apps (2026-05-06) `[primary]`
- **Microsoft's own MAI models exist and are shipping.** At Build 2026 Microsoft introduced seven MAI models: flagship **MAI-Thinking-1** (reasoning), **MAI-Code-1-Flash** (coding), **MAI-Image-2.5** (image), **MAI-Voice-2** (speech), **MAI-Transcribe-1.5** (speech-to-text), and more. — source: https://thenextweb.com/news/microsoft-mai-models-replace-openai-apps (2026) `[press]`
- **MAI is actively replacing OpenAI/Anthropic in some surfaces to cut cost.** As of July 2026 MAI models handle tens of thousands of requests/week in Excel and Outlook (still a small fraction of total), and are in GitHub Copilot; Microsoft's AI chief Mustafa Suleyman said the goal is to "reduce and ultimately eliminate" the cost paid to Anthropic. — source: https://the-decoder.com/copilot-goes-cheap-as-microsoft-phases-out-openai-and-anthropic-models-to-cut-costs/ (2026) `[press]`; https://thetechportal.com/2026/07/07/microsoft-begins-replacing-openai-anthropic-models-with-in-house-mai-ai-across-key-products-report/ (2026-07-07) `[press]`
- **Anthropic in Copilot is real and documented by Microsoft:** an admin toggle lets Microsoft 365 Copilot use Anthropic (Claude) models in Word, Excel, and PowerPoint (rolling out for EU/EFTA/UK tenants; Word support added summer 2026). — source: https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-anthropic-apps (2026-05-06) `[primary]`
- **Caveat on MAI quality:** press benchmarks put MAI-Thinking-1 roughly on par with DeepSeek V3.2 — i.e., noticeably behind the latest OpenAI/Anthropic frontier — so the shift is cost-driven, not capability-driven. — source: https://the-decoder.com/copilot-goes-cheap-as-microsoft-phases-out-openai-and-anthropic-models-to-cut-costs/ (2026) `[press]`
- **Net for teaching:** "What model is Copilot?" has no single answer anymore — it depends on the app, the region, the task, and admin settings. It is a router over MAI + GPT + Claude.

---

## 7. Enterprise "our company's own AI" tools

- **Most companies deploy/wrap existing foundation models — they do NOT train their own.** In 2026 enterprises overwhelmingly adopt existing models through managed platforms: **Azure (OpenAI / Foundry), AWS Bedrock, and Google Vertex AI.** — source: https://internative.net/insights/blog/enterprise-ai-platform-comparison-vertex-bedrock-foundry-2026 (2026) `[secondary]`
- These three hyperscaler platforms all host the top commercial + open-weight models, all support fine-tuning, and all add agentic tooling; the enterprise decision has shifted from "which model" to "which platform / how to orchestrate agents." — source: https://internative.net/insights/blog/enterprise-ai-platform-comparison-vertex-bedrock-foundry-2026 (2026) `[secondary]`
- Adoption scale: an analysis cites Gartner projecting 80%+ of enterprises will use generative-AI APIs or deploy genAI apps by 2026 (stat attributed to Gartner via secondary source — see UNCERTAIN). — source: https://internative.net/insights/blog/enterprise-ai-platform-comparison-vertex-bedrock-foundry-2026 (2026) `[secondary]`
- **So yes — it is accurate to say a typical corporate "our AI" rollout is usually the SAME underlying models a consumer uses (GPT / Claude / Gemini), behind a company-branded interface, with company data + guardrails + permissions wrapped around them.** Fine-tuning/customization happens on top of those base models; from-scratch model training is the rare exception (big clouds, or via services like Nova Forge). — source: https://internative.net/insights/blog/enterprise-ai-platform-comparison-vertex-bedrock-foundry-2026 (2026) `[secondary]`; https://aws.amazon.com/nova/ (accessed 2026-07-10) `[primary]`

---

## 8. Model version numbers as "generations"

- **The pattern is real and consistent:** each lab ships successive numbered releases, and the number is how people track "which generation." Examples across labs:
  - OpenAI: GPT-4 → GPT-5 → GPT-5.5 (Apr 23, 2026) → GPT-5.6 (Jul 9, 2026). — source: https://en.wikipedia.org/wiki/GPT-5.5 (accessed 2026-07-10) `[secondary]`; https://www.axios.com/2026/07/09/ai-openai-gpt-release (2026-07-09) `[press]`
  - Anthropic: Claude Opus 4.7 → 4.8 (May 28, 2026) → Fable 5 / Mythos 5 (Jun 9, 2026). — source: https://www.anthropic.com/news/claude-opus-4-8 (accessed 2026-07-10) `[primary]`
  - Google: Gemini 2.5 → 3 (Nov 2025) → 3.1 Pro (Feb 2026) → 3.5 Flash (May 2026). — source: https://gemini.google/release-notes/ (accessed 2026-07-10) `[primary]`
- **The cadence is fast** — e.g., Opus 4.8 landed just 41 days after Opus 4.7. That rapid, numbered drumbeat is exactly what drives the "is the new one out yet?" behavior. — source: https://www.technology.org/2026/05/29/anthropic-claude-opus-4-8-dynamic-workflows/ (2026-05-29) `[press]`
- **Nuance to teach:** version numbers are marketing/product labels, not a standardized scientific scale. A ".x" bump from one lab is not directly comparable to a ".x" bump from another, and some labs jump naming schemes entirely (Anthropic went from "Opus 4.8" to a new class name "Fable 5"/"Mythos 5"). Bigger jumps (5 → 6, or a new class name) usually signal a bigger capability step than a point release.

---

## 9. Other materially important points & common misconceptions

- **Misconception: "only a handful of companies build real AI."** False — it's well over a dozen across general-purpose + specialist + Chinese labs, and the barrier is falling (clouds now train their own; AWS even sells "build your own frontier model"). — source: https://aws.amazon.com/blogs/aws/introducing-amazon-nova-forge-build-your-own-frontier-models-using-nova/ (accessed 2026-07-10) `[primary]`
- **Misconception: "the app IS the model."** False — most apps (Perplexity, Cursor, Copilot, and many "AI" startups) are interfaces over one or more models trained elsewhere. Judge an app on its UI, integrations, data, and which model(s) it routes to — not on a single brand. — source: https://www.perplexity.ai/help-center/en/articles/10354919-what-advanced-ai-models-are-included-in-my-subscription (accessed 2026-07-10) `[primary]`
- **Misconception: "Copilot is just ChatGPT/GPT."** False as of 2026 — it's a router over Microsoft's own MAI models + OpenAI + Anthropic (see Q6). — source: https://the-decoder.com/copilot-goes-cheap-as-microsoft-phases-out-openai-and-anthropic-models-to-cut-costs/ (2026) `[press]`
- **Misconception: "Gemini is just Google's app assistant."** False — it's a frontier model family competing with GPT and Claude; Workspace integration is one surface (see Q5). — source: https://blog.google/products-and-platforms/products/gemini/gemini-3/ (2025-11-18) `[primary-marketing]`
- **Misconception: "our company built its own AI."** Usually false — it's almost always a deployment/fine-tune of GPT/Claude/Gemini behind a branded interface (see Q7). — source: https://internative.net/insights/blog/enterprise-ai-platform-comparison-vertex-bedrock-foundry-2026 (2026) `[secondary]`
- **Open-weight vs closed matters.** Some labs (Meta/Llama, DeepSeek, Mistral, Black Forest Labs/FLUX) release open-weight models anyone can download/run/fine-tune; others (OpenAI, Anthropic, Google) are API-only/closed. This changes who can deploy them and where. — source: https://kingy.ai/news/best-open-weight-ai-models-in-2026-glm-5-2-vs-deepseek-v4-vs-kimi-k2-6-vs-qwen-vs-mistral/ (2026) `[secondary]`
- **Specialist vs generalist.** For voice, music, image, and video, the best tools are often specialist labs (ElevenLabs, Suno, Midjourney, Runway, Black Forest Labs), not the chat giants — another reason "there are only a few AI companies" is wrong. — source: https://serenitiesai.com/articles/best-ai-video-image-voice-models-2026 (2026) `[secondary]`
- **"Same model, different safety envelope" is now a real distinction.** Anthropic's Fable 5 and Mythos 5 are the *same model* with different safeguards; the version/name can encode the safety configuration, not just raw capability. — source: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 (accessed 2026-07-10) `[primary]`
- **Government safety review is now part of frontier launches.** Both GPT-5.6 and Claude Fable 5/Mythos 5 had launches shaped by US-government cybersecurity review / export controls in mid-2026 — a sign the frontier is being treated as strategically sensitive. — source: https://en.wikipedia.org/wiki/GPT-5.6 (accessed 2026-07-10) `[secondary]`; https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html (2026-06-30) `[press]`

---

## NOT VERIFIED / UNCERTAIN

Do not present any of the following as locked fact without further verification.

- **Exact "current flagship" for Gemini is ambiguous.** Google's release notes list Gemini 3.5 Flash (May 2026) as newest and Gemini 3.1 Pro (Feb 2026) as top-capability, and different Google pages call different ones "most intelligent." The Flash vs Pro line naming is out of numeric sync (3.5 Flash newer than 3.1 Pro). Treat "Gemini 3 family, with 3.1 Pro as top reasoning tier and 3.5 Flash as the newest fast tier" as the safe phrasing; a distinct "Gemini 3.5 Pro" was NOT confirmed.
- **GPT-5.6 "Sol Ultra"** — Wikipedia references a higher "Sol Ultra" benchmark variant; only that single secondary source mentioned it. Not independently confirmed. The three confirmed tiers are Sol / Terra / Luna.
- **openai.com and axios.com returned HTTP 403** to the fetch tool, so GPT-5.6 primary-page text could not be pulled directly; GPT-5.6 facts rest on Axios (press) + Wikipedia (secondary) + OpenAI search snippets. The core claim (GPT-5.6, Sol/Terra/Luna, ~Jul 9 2026) is consistent across all of them, but the OpenAI primary page itself was not directly readable.
- **Specialist-lab latest version numbers are only loosely verified.** ElevenLabs "Eleven v3 GA Feb 2, 2026," Runway "Gen-4," FLUX tier names, and Midjourney/Suno current versions come from a single aggregator (serenitiesai.com), not primary sources. That each lab *trains its own model* is safe; the *specific current version numbers* should be re-verified against each company's site before publishing.
- **xAI/Grok exact current flagship** — sources disagree on whether Grok 4.3 (Apr 30, 2026) or Grok 4.5 is the current top model; Grok 5 is reportedly still in training. Primary x.ai docs were referenced but the precise "flagship as of today" was not pinned down.
- **DeepSeek V4 and Mistral July-2026 model details** rest partly on secondary sources (kingy.ai) and press; parameter counts and exact release framing not confirmed against DeepSeek's/Mistral's own pages.
- **Gartner "80%+ of enterprises by 2026" stat** is quoted via a secondary blog, not traced to the original Gartner report. Verify the primary Gartner citation before using the number.
- **"~9 general-purpose frontier companies"** is one analyst framing (informationmatters.net landscape PDF), not an official count. Use it as illustrative, not definitive.
- **ChatGPT current user counts / market-share numbers** were deliberately not asserted — no figure was verified in this pass.
- **Meta Llama 4 specifics** (exact current version, EU license terms) come from a secondary landscape PDF; confirm against Meta's own release before citing details.
- **Benchmark numbers** cited for GPT-5.6 (TerminalBench 2.1 scores) and MAI (parity with DeepSeek V3.2) are self-reported or press-reported and inherently contestable; treat all vendor benchmark claims as marketing until independently reproduced.
