# Which surface do consumers actually use: web, mobile app, or desktop app?

Research date: 2026-07-22. Question: what should we film for ChatGPT/Claude/Gemini tutorials, given that menu paths (e.g. Custom Instructions) differ by surface.

**Bottom line up front: no company publishes an official web-vs-mobile-app-vs-desktop-app usage split. Everything below is inference from partial, sometimes-contradicting figures. Treat percentages as estimates, not facts.**

---

## 1. Usage split by platform

**No primary source (OpenAI, Anthropic, Google) publishes a device/surface breakdown.** What exists is two different metrics that aren't directly comparable:

- **OpenAI's own disclosed figure:** ChatGPT hit **900 million weekly active users**, reported by OpenAI in a Feb 2026 report and confirmed by Reuters, June 2026. This is *all platforms combined* — not split by surface.
- **App-only estimate:** Sensor Tower's "State of AI 2026" report (published ~June 16–17, 2026) says the ChatGPT **mobile app** crossed **1 billion monthly active users** in May 2026 — the fastest app ever to do so. This is *mobile app only*.
- **Web-only estimate:** Similarweb reported chatgpt.com had **5.51–5.73 billion visits/month** in March–April 2026 (X/Similarweb post, dated ~April 2026; Similarweb chatgpt.com dashboard, June 2026 snapshot). Visits ≠ unique users, so this can't be turned into a clean percentage against the app's MAU.

Because mobile-app MAU (1B) is already close to OpenAI's own total WAU figure (900M, a different time window and cadence), it's *plausible* the mobile app carries the bulk of active use — but this is my inference from mismatched metrics, not a stated finding. **Treat "mobile > web" as a reasonable guess, not a verified split.**

**Claude:** Similarweb-sourced figures (via TechCrunch, March 6, 2026) show desktop *web* visits far exceeding mobile *web* visits (~731M vs ~93M in April 2026) — but that's browser traffic, not app-vs-web. Separately, Claude's native app hit **11.3M daily active users** on March 2, 2026 (Similarweb, via TechCrunch), while web traffic grew 43% MoM in Feb 2026. No clean same-basis comparison exists.

**Gemini:** Sources directly contradict each other — one aggregator claims 77.9% of Gemini interactions are mobile, another claims 71.27% desktop / 28.73% mobile (dated Nov 2025). Neither cites a checkable primary source. **This is unresolved — report the contradiction, don't pick a side.**

## 2. Mobile app downloads/MAU vs web traffic

- ChatGPT app: crossed 1B MAU May 2026 (Sensor Tower, pub. June 2026); ranked #2 globally by downloads with 148% YoY download growth (same report).
- Claude app: Appfigures data (via TechCrunch) says Claude briefly out-downloaded ChatGPT on March 2, 2026 (149K vs 124K daily downloads) — a single-day snapshot, not a trend.
- Cumulative "1.9 billion ChatGPT downloads since 2023" figures circulate on SEO aggregator sites (fatjoe, demandsage, etc.) without a traceable primary source — **not verified, exclude from anything we publish.**

## 3. Does the desktop app have real consumer uptake?

Mixed signal, no hard numbers either way.
- OpenAI relaunched ChatGPT's desktop app as a "superapp" (merged with Codex, 2026-07-09 per your note) adding Alt+Space quick-access, PC control, and a "Work" agent — explicitly positioned to compete with **Claude Desktop**, per PCWorld (~July 2026). This is a consumer-facing push, not just a dev tool.
- Anthropic's own usage data — cited in VentureBeat covering the Claude Cowork mobile/web launch, dated 2026-07-08 — reportedly shows **"most [Claude] users aren't coding."** That's Anthropic's characterization of their user base broadly, not desktop-app-specific, and I could not find the underlying numbers, only the paraphrase.
- No independent analytics firm publishes desktop-app MAU for any of the three products. **Honest answer: desktop consumer uptake is plausible but not measured publicly.**

## 4. Demographic skew by surface

**Not published, for any product.** OpenAI's own Q1 2026 Signals report (openai.com/signals/research/2026q1-update/, 2026) documents real demographic shifts — users with feminine-inferred names now over half of users where gender could be inferred, fastest growth among 35+, broadening into non-technical/global markets — but this report does **not** break any of that down by web vs. app vs. desktop. **Do not claim women or non-technical users skew to a particular surface — that finding does not exist in the public record.**

## 5. How much do the interfaces actually differ for what we teach?

Confirmed, not estimated: **yes, meaningfully.** For ChatGPT Custom Instructions specifically (OpenAI Help Center + cross-checked guides):
- **Web:** Settings → Personalization → Custom Instructions.
- **iOS/Android:** profile icon → Settings → Account (or "Customize ChatGPT") → toggle Custom Instructions on. Extra tap-through layer that doesn't exist on web.

This confirms the premise that triggered this research: a web-recorded walkthrough will send a phone user down a different, and at points absent, menu path. Memory, Projects, and Connectors settings are similarly reorganized per-surface in current builds (not independently re-verified path-by-path here — worth a dedicated pass per feature before filming each one).

---

## Confidence summary (for the 12-line reply)

- Platform usage split: **low confidence** — not published; only mismatched proxy metrics exist.
- Mobile beats web: **plausible, not proven** for ChatGPT; genuinely unresolved/contradictory for Gemini; Claude shows web (desktop browser) still dominant by raw visits.
- Desktop app consumer relevance: **unresolved** — real product investment (superapp merge, Alt+Space) suggests OpenAI is betting on consumer desktop use, but no user-share data exists to confirm ordinary consumers (vs. developers) are the ones adopting it.
- Interface divergence web vs. mobile: **high confidence, verified for Custom Instructions** — paths genuinely differ; assume the same for other settings until checked.
