tool: cross-cutting (ChatGPT, Claude, Gemini) — community/recency signals
checked_utc: 2026-07-22
note: Reddit itself was NOT directly reachable this pass (reddit.com blocked to the fetch/search
tools available here — both direct WebFetch and WebSearch with allowed_domains:[reddit.com]
failed). Findings below come from Hacker News (HN Algolia API, live), named practitioners
(Simon Willison), vendor "learn" docs that a prior pass missed, and tech-press pieces that
themselves cite user reports. Where a claim ultimately traces to "community report" via a
secondary write-up rather than a thread I read myself, it is labelled `community report via
secondary source — unconfirmed`. Treat everything here as leads for the tool-specific files to
verify against the app, per the brief.

sources_used:
- learn.chatgpt.com/docs/reference/settings, /docs/pets, /docs/appshots, /docs/hooks — OpenAI's
  "ChatGPT Learn" hub for the desktop app / Codex surface. No visible dates on these pages —
  flagged as undated vendor doc, used only to CONFIRM pane names Ali already saw on her own
  screen, not for recency claims. Tier 1 (vendor) but undated — use with caution.
- help.openai.com/en/articles/20001066-skills-in-chatgpt — "Skills in ChatGPT," surfaced by
  search as updated within the last ~2 days of this check (i.e. ~2026-07-20). Tier 1.
- simonwillison.net/2025/Dec/12/openai-skills/ — Simon Willison, named practitioner, dated
  2025-12-12. Tier 3. Corroborated independently on Hacker News (587 pts / 324 comments).
- news.ycombinator.com via HN Algolia API — live query, real post dates, real point/comment
  counts. Used as a proxy for "what the practitioner community is actually discussing and when."
- anthropic.com/news/skills — Claude Skills launch, dated 2025-10-16 (HN: 816 pts / 427 comments).
- finance.biggo.com "OpenAI Codex adds desktop pets..." — dated ~early May 2026 per article text.
- knightli.com/en/2026/06/20/chatgpt-google-app-data-controls-oauth-scopes/ — dated 2026-06-20,
  restates an OpenAI Help Center change; tier 2/3, corroborating not primary.
- tomsguide.com "ChatGPT memories are disappearing for some users" — dated (exact date not
  captured by the fetch tool; referenced OpenAI status-page recovery, so recent/2026). Tier 2.
- androidauthority.com / blog.google (UK) / tech.yahoo.com pieces on Gemini "Personal Context,"
  "Personal Intelligence" (dated 2026-01-14) and free-tier rollout (dated 2026-02-26). Tier 2.

sources_rejected: generic SEO "2026 guide" listicles (asksafely.ai, gptprompts.ai, qwe.edu.pl,
gend.co, techi.com, suprmind.ai) — no verifiable authorship, formulaic "complete guide" framing,
not used for any factual claim, only appeared as search noise.

---

## Top recent UI changes (dated, ranked by how load-bearing they are for us)

1. **ChatGPT Skills going default-ON for Enterprise workspaces on 2026-07-23** — i.e.
   *tomorrow* relative to this check. Source: help.openai.com Skills article, updated ~2 days
   before this check. `single-source (vendor), but the vendor is authoritative on its own
   rollout schedule` — worth a follow-up check on 7/23 to see if it actually flipped.
2. **"Personal Skills" in ChatGPT is Business/Enterprise/Healthcare/Edu only** — not listed for
   Free or Plus on help.openai.com (checked 2026-07-22). This sits alongside a DIFFERENT, older
   "Skills" surface Simon Willison described 2025-12-12 — a `/home/oai/skills` folder inside
   Code Interpreter, tier unspecified, functioning more like Claude's Skills folder pattern.
   **CHANGED — verify in app**: these look like two distinct things both called "Skills" at
   OpenAI (a low-level Code-Interpreter mechanism vs. a packaged admin-gated feature). Do not
   collapse them into one story without checking the app directly.
3. **ChatGPT desktop app grew a whole agentic-coding settings surface**: Pets, Appshots, Hooks,
   Worktrees, Environments, Computer Use, Configuration — this is exactly what Ali's screenshot
   showed. Confirmed via learn.chatgpt.com (vendor, undated) — `corroborates Ali's own
   screenshot, but note this lives under the Codex/coding-agent side of the app, not the plain
   chat side`. Pets specifically dated to ~early May 2026 (BigGo Finance). Hooks = a scripting
   extensibility point for the Codex agent loop (`/hooks` command), explicitly a developer
   feature, not a consumer chat toggle.
4. **ChatGPT Google-app connectors consolidated 2026-06-15**: standalone Google Docs/Sheets/
   Slides apps removed from the ChatGPT app directory; everything folded into one "Google Drive"
   connector, plus new BigQuery and Meet actions. `single-source blog corroborating a vendor
   change` — worth the connectors researcher checking help.openai.com directly for current
   wording.
5. **Gemini renamed "past chats" to "memories"** and reorganized it under
   Settings → Personal context → Memory. `community report via secondary source —
   unconfirmed` on the exact click path; the rename itself is stated in press coverage without
   a hard date beyond "rolling out over the next few weeks" (article itself undated in my
   extraction — flag as NOT VERIFIED for timing).
6. **Gemini "Personal Intelligence"** (connects Gemini to Gmail/Photos/YouTube/Search for
   memory) launched 2026-01-14 to AI Pro/Ultra subscribers, US only initially; the underlying
   "past-chats" personalization extended to free-tier users globally starting 2026-02-26 (EU
   later). Two separate, dated announcements — do not conflate.

## The five questions asked most often (ranked by how often the same explainer gets re-written)

1. **"Why doesn't it remember me / why did it forget?"** — memory mechanics (saved memories vs.
   chat-history reference vs. nothing at all) is the single most re-explained topic across
   ChatGPT, Claude and Gemini alike. OpenAI maintains a dedicated Memory FAQ specifically
   because this question recurs; multiple 2026 newsletter pieces (Substack: "The Monday Stack,"
   "The memory game") exist solely to re-explain it.
2. **"What's the difference between Projects and Skills?"** (Claude) / **"What's the difference
   between a Custom GPT and a Skill?"** (ChatGPT) — an unusually large number of near-identical
   "X vs Y explained" posts from different publishers on this exact question is itself a signal
   that real users keep asking it, not that any one post is authoritative.
3. **"Do I even have this feature?"** — tier confusion. Skills (ChatGPT Personal Skills, Claude
   Skills) and Hooks are gated by plan/workspace in ways that are not obvious from inside the
   product; several explainer posts exist just to state "you need Pro/Max/Team/Enterprise for
   this."
4. **"Where did [setting] go?"** — renames (Gemini's chats→memories) and consolidations (ChatGPT
   Google apps→Drive connector) generate follow-up confusion because old bookmarks/instructions
   stop matching the UI.
5. **Connector/permission errors** — after the 2026-06-15 ChatGPT Google-app consolidation,
   admin-approval and OAuth-scope errors are called out explicitly as a new confusion source in
   the vendor's own admin-setup docs, implying real support-ticket volume.

## Misconceptions surfacing repeatedly

- Believing the AI "remembers everything" by default, when in most of these products memory is
  opt-in and partial (saved facts + optional chat-history reference, not a full transcript).
  `corroborated` in the sense that multiple independent explainers exist to correct exactly this.
- Likely conflating ChatGPT "Skills" with "Custom GPTs" as the same mechanism — OpenAI's own
  framing (dig.watch headline: "ChatGPT may move beyond GPTs as OpenAI develops new Skills
  feature") suggests Skills is positioned as a successor/parallel track, not a synonym.
  `single-source, unconfirmed` as a *misconception* (i.e., I found the framing, not people
  actively getting it wrong) — flag for the ChatGPT-specific researcher to verify against
  Reddit/forum threads directly.

## "I didn't know that existed" candidates

- ChatGPT desktop app: **Pets** (floating animated Codex-status companion, community-customized
  down to jokes about an "Anthropic crab" candidate), **Appshots** (macOS screenshot-to-chat
  hotkey), **Worktrees**/**Environments** (Codex git-workflow management) — all real, all
  confirmed via vendor docs, all plausibly unknown to an ordinary chat-only user since they live
  under the coding-agent side of the desktop app.
- Gemini **Personal Intelligence** (Gmail/Photos/YouTube/Search-linked memory) — dated
  2026-01-14, Pro/Ultra only at launch.

## What's hard to set up / where people give up

- ChatGPT connector/OAuth scope approval after the June 2026 Google consolidation — vendor docs
  themselves warn admins to "coordinate" beforehand, which is a tell that this breaks for people
  who don't.
- Anything gated by plan (Skills, some connectors) — the failure mode isn't a hard setup step,
  it's discovering the toggle doesn't exist on your tier at all.

## Hooks and Skills in ChatGPT — the open question

- **Hooks**: confirmed via learn.chatgpt.com/docs/hooks as a Codex-agent extensibility
  mechanism — inject scripts into the agentic coding loop, managed via a `/hooks` command,
  with matcher/trust/disable controls. This is a **developer/coding-agent feature inside the
  desktop app**, not a setting a plain ChatGPT chat user (Free or Plus, non-coding) would
  encounter. `corroborated` (vendor doc + Ali's own screenshot independently showed the same
  pane name).
- **Skills**: as of 2026-07-22, help.openai.com lists Personal Skills as available to Business,
  Enterprise, Healthcare and Edu — **not** Free or Plus — with Enterprise workspaces going
  default-ON 2026-07-23. So an ordinary individual paying user (ChatGPT Plus) does **not**
  appear to have Skills through that surface. However, Simon Willison's Dec 2025 piece
  describes a separate, lighter Skills mechanism already living inside Code Interpreter with no
  stated tier restriction — meaning "does an ordinary paying user have Skills" may have **two
  different correct answers depending on which "Skills" is meant**. `CHANGED — verify in app`:
  this needs a hands-on check in an actual Plus account, not another search.

## 🔴 Confidence

- Would stake something on: the Skills-tier split at OpenAI (Business+/Enterprise vs. Free/Plus)
  as documented on help.openai.com on 2026-07-22, and on Hooks being a Codex/developer feature
  rather than a mainline chat setting — both are vendor-doc-confirmed and consistent with what
  Ali independently saw.
- Would NOT stake anything on: exact Gemini settings click path for the "memories" rename (no
  hard date, no second independent source read directly), on the July 23 2026 Enterprise
  default-on actually happening on schedule (single vendor source, no confirmation it shipped),
  or on any Reddit-specific quote — I could not reach reddit.com directly this pass, so nothing
  here is a verbatim Reddit report; it is all secondary.
