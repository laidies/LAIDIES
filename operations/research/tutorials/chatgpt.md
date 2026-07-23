tool: ChatGPT (OpenAI) — desktop app, macOS/Windows, as of 2026-07-22
checked_utc: 2026-07-22

sources_used:
  - OpenAI Developer docs — learn.chatgpt.com/docs/hooks, /docs/developer-settings, /docs/pets,
    /docs/appshots, /docs/computer-use, /docs/configuration, /docs/reference/settings,
    /docs/environments/git-worktrees, /docs/environments/local-environment,
    /docs/remote-connections · publisher: OpenAI (vendor, tier 1) · no per-page dates shown on
    any of these pages — undated vendor docs, treated as "current" only because they are the
    live product docs, not because a date confirms it
  - "I Tried ChatGPT's 'Skills' Feature. It Saved Me Hours Of Boring Work" — Forbes, Rachel
    Wells · 2026-07-20 07:31 EDT · tier 2 (major tech publication, named byline, dated)
  - "ChatGPT Skills Availability: Access & Plans (2026)" — aiagentslibrary.com · published
    2026-07-19, updated 2026-07-21 · tier 3 (named, dated, checkable, but not an established
    institution)
  - "ChatGPT 5.6 Hidden Features: Skills, Sites, Appshots, Plugins, and Safer Computer Use" —
    ai.joaoqueiros.com · dated, named author · tier 3
  - "New Hidden ChatGPT 5.6 Features You Didn't Realize Existed" — bizrescuepro.com ·
    2026-07-14 · tier 3
  - "GPT-5.6 and the New ChatGPT Desktop App: Complete Guide" — The Neuron ·
    2026-07-10 · tier 2/3 (AI-industry newsletter with editorial process)
  - OpenAI Developer Community forum bug report: "Chat mode missing in the new ChatGPT macOS
    app (26.707.31428)" · community.openai.com · dated by app build number 26.707.31428
    (≈ July 2026) · tier 3 but high value — real user, real build, real screenshot-adjacent bug
  - techtimes.com, coursiv.io, aitoolhunt.co, developersdigest.tech — four independent write-ups
    of the July 9, 2026 Codex/ChatGPT desktop-app merger (Chat/Work/Codex modes) · all dated
    July 2026 · tier 3
  - openai.com/index/memory-and-new-controls-for-chatgpt (vendor, tier 1) + academy.openai.com
    "Customizing ChatGPT" (vendor learning hub, tier 1) + inkeybit.com and mywritingtwin.com
    2026-dated guides (tier 3) — memory / custom instructions / projects
  - context-link.ai "ChatGPT Connectors: Complete Guide to Apps & Files (2026)", porteden.com
    and mindstudio.ai on scheduled tasks — all carry a 2026 date, tier 3

sources_rejected:
  - help.openai.com/en/articles/20001066-skills-in-chatgpt — returned HTTP 403 on direct fetch,
    could not read or date it firsthand. Used only where two independent tier-2/3 sources
    (Forbes, aiagentslibrary.com) quoted the same line from it consistently. Flagged, not
    treated as directly verified.
  - Generic SEO round-ups returned by search ("Complete Guide to ChatGPT 2026" listicle sites
    with no byline, no changelog, no correction history) — excluded from sources_used even
    where they appeared in results, per brief's reject list.

---

## Hooks

**What current material shows:** Hooks are an OpenAI Codex (the coding-agent side of ChatGPT)
extensibility feature — "deterministic scripts" a developer wires into points in the agent's
lifecycle (session start, before/after a tool call, when a turn stops, etc.). Examples given:
send a chat to a logging/analytics system, scan prompts to block pasted API keys, auto-summarize
chats into persistent memories, run a validation check enforcing coding standards on a turn.
They are configured in files — `~/.codex/hooks.json` / `~/.codex/config.toml`, or a
repo-level `.codex/hooks.json` — and Codex requires you to "review and trust" a hook (tracked
by hash) before it runs, as a safeguard against injected scripts.

**Who it's for:** Developers and engineering teams working in Codex mode, not general chat
users. Nothing in vendor material frames this as a consumer feature.

**Click path:** `Settings > Coding > Hooks` in the desktop app is where Ali's screenshot places
it, consistent with the "Coding" section (alongside Connections, Git, Environments, Worktrees)
that OpenAI's own developer-settings doc describes as Codex-integration settings. The vendor
docs describe hook *definitions* living in config files rather than being authored in the pane
itself — the pane most plausibly is a viewer/trust-manager for those file-defined hooks, not an
authoring UI. This reconciliation is my own inference from two vendor pages, not something a
source states outright.

**CORROBORATION: single-source, unconfirmed.** Every fact above traces back to OpenAI's own
docs (learn.chatgpt.com/docs/hooks and /docs/developer-settings) — same publisher. I found no
independent 2026 tutorial, review, or walkthrough that describes the Hooks pane, screenshots it,
or confirms the click path. The placement matches Ali's screenshot (Hooks under "Coding" next to
Connections/Git/Environments/Worktrees), which is real signal, but a screenshot from one machine
is not a second published source under this brief's rule.

**Date of newest supporting source:** undated (vendor docs carry no page date).

**What changed recently:** Hooks appears to be new-ish scaffolding tied to the July 9, 2026
Codex/ChatGPT desktop merger (see Modes section) — before the merger, Codex was a separate app,
so a unified "Coding" settings section with Hooks in it is plausibly a post-merger addition.
NOT VERIFIED — no source states an introduction date for Hooks specifically.

---

## Skills

**What current material shows:** Skills are reusable, shareable "recipes" — instructions,
examples, sometimes code — that tell ChatGPT how to do a specific repeatable task (an SOP) so it
performs it consistently instead of being re-explained every time. Two independent, dated
sources (Forbes, 2026-07-20; aiagentslibrary.com, 2026-07-19/21) agree on where to find them:
**not** in account Settings — instead, sidebar → **Plugins** → Browse Plugins → a **Skills**
tab inside the Plugin Directory. Both sources independently flag this as the thing people get
wrong ("most people incorrectly look in Settings first").

**Is Skills available for an individual (non-business) account?** Per OpenAI's own help-center
language, as quoted consistently by both Forbes and aiagentslibrary.com: Skills are
**"generally available for ChatGPT Business, Enterprise, Healthcare, and Edu users."** Free,
Plus, and Pro are conspicuously absent from that list. Both sources separately note that some
individual accounts outside that list report seeing a Skills tab anyway ("availability appears
to vary" / "hopes to extend to Plus and Pro soon") — i.e. informal, unconfirmed leakage, not
official availability. The Forbes author's own hands-on test was done from a **ChatGPT Work**
(business) account, not a personal Plus/Pro account — she did not test individual-account access
herself.

One complication: bizrescuepro.com (2026-07-14) describes Skills generically as a desktop-app
feature "for anyone performing recurring tasks" with no eligibility gate mentioned at all — this
doesn't contradict the Business/Enterprise restriction so much as omit it, which matters because
a beginner reading only that article would not know Skills might be invisible to them.

**CORROBORATION: corroborated** (two independent, dated 2026 sources agree on both the click
path and on the official eligibility being Business/Enterprise/Healthcare/Edu, not individual
Free/Plus/Pro). **Direct answer to "is Skills on an individual account": NOT officially, per
corroborated sources — with an unconfirmed, anecdotal possibility of partial/rolling access.**

**Date of newest supporting source:** 2026-07-21 (aiagentslibrary.com update date).

**What changed recently:** OpenAI reportedly plans to turn Skills on by default for Enterprise
workspaces that haven't opted out, beginning 2026-07-23 (i.e., tomorrow relative to this
check) — from an earlier search summary, NOT independently re-verified by fetching a primary
page, so treat as single-source, unconfirmed.

---

## Computer use

**What current material shows:** Lets ChatGPT see and operate a GUI — click, type, navigate
apps — for tasks command-line tools or structured integrations can't reach. Requires macOS
Screen Recording + Accessibility permissions (or Windows equivalent), reviewed under
`Settings > Computer use`, which lists an "Always-allowed apps" list.

**CORROBORATION on the pane and permissions: corroborated** — OpenAI's own docs and the
description of the permission flow are consistent with how independent write-ups describe it.

**CORROBORATION on which plans get it: CHANGED — verify in app.** OpenAI's own developer docs
describe Computer Use as living in "Work mode and Codex" (implying it's gated behind those
modes, not plain Chat). The Neuron's 2026-07-10 guide states flatly that "all three [Chat, Work,
Codex] are available in the desktop app on Free, Go, Plus, Pro, Business, Enterprise, and Edu
plans" with no tier restriction mentioned for Computer Use specifically. These two sources do
not agree on how gated the feature is. Do not state a tier claim to Ali without checking the app
directly.

**Date of newest supporting source:** 2026-07-10.

---

## Appshots

**What current material shows:** Captures the frontmost Mac (or Windows) app window — an image
of the visible window plus available text (including text outside the visible scroll area,
where the app exposes it) — and hands that to ChatGPT/Codex as working context, so you don't
have to copy/paste or describe what's on screen. Hotkey is both-Command-keys by default,
customizable in `Settings > Integrations > Appshots`. Requires Screen & System Audio Recording
and Accessibility permissions. macOS-only per the vendor doc.

**CORROBORATION: corroborated** — OpenAI's own doc and bizrescuepro.com (2026-07-14, independent
publisher) describe the same capture-and-context mechanism in matching terms.

**Date of newest supporting source:** 2026-07-14.

**What changed recently:** Appears tied to the same July 2026 desktop-app wave as Skills/Sites —
NOT VERIFIED as to exact ship date.

---

## Plugins (and Connections, under Coding)

**What current material shows:** "Plugins" (under the **Integrations** section, alongside
Appshots/Browser/Computer use) connects external tools — named examples: Stripe, vidIQ — letting
ChatGPT pull structured data from a connected tool; described elsewhere as "1,400+ integrations."
This is also where the Skills tab lives (see above), which is a meaningful, easy-to-miss overlap
a beginner would not expect.

Separately, under the **Coding** section, "Connections" is described by OpenAI's own docs as
**remote SSH connections** for coding projects — `Settings > Connections`, add/enable an SSH
host, then choose a remote project folder. This is a different feature from the Plugins pane
despite the similar name, and easy to confuse in a teaching script.

**CORROBORATION:** Plugins-as-integration-hub — corroborated (bizrescuepro.com 2026-07-14 +
The Neuron 2026-07-10, independent publishers, agree). Connections-as-SSH — single-source,
unconfirmed (OpenAI vendor docs only; no independent write-up found describing this pane).

**Date of newest supporting source:** 2026-07-14 (Plugins); undated (Connections/SSH).

---

## Configuration (Coding)

**What current material shows:** Per OpenAI's own docs, `Settings > Coding > Configuration`
governs Codex's approval policy (when it asks permission), sandbox mode (how much it can do
unsupervised when running commands), network access, and default personality/tone — essentially
an in-app front end for what `config.toml` controls on the CLI/IDE side. Positioned for
individual developers and teams.

**CORROBORATION: single-source, unconfirmed.** Only the vendor doc describes this pane; no
independent 2026 tutorial confirms the name, location, or contents.

**Date of newest supporting source:** undated.

---

## Pets

**What current material shows:** Optional animated on-screen companions that reflect chat/task
status (Running, Needs Input, Ready, Blocked), can float above other windows, and can be
custom-created by description. Found via the profile menu → Pets, or `Settings > Pets`. Purely
cosmetic — vendor doc is explicit that it doesn't change what ChatGPT does.

**CORROBORATION: single-source, unconfirmed.** Despite several targeted searches, I found no
independent 2026 tutorial, review, or screenshot of Pets — only OpenAI's own doc page. This is
one of the weakest-verified panes in this report.

**Date of newest supporting source:** undated.

---

## Environments, Worktrees, Git (Coding)

**What current material shows (vendor docs only):**
- **Environments**: local environments let you define setup steps/scripts that run
  automatically for a project, including for worktrees.
- **Worktrees**: `Settings > Worktrees` sets the "Worktree root" folder; Codex keeps the most
  recent 15 Codex-managed worktrees by default, with a setting to change the limit or disable
  auto-deletion.
- **Git**: governs branch-naming conventions, force-push behavior, and custom
  commit-message/PR-description prompting.

**CORROBORATION: single-source, unconfirmed** for all three — only OpenAI's own docs describe
these panes; no independent tutorial found that screenshots or walks through them.

**Date of newest supporting source:** undated.

---

## Modes — Chat / Work / Codex (the mode people miss)

**What current material shows:** On 2026-07-09, OpenAI merged the standalone Codex app into the
ChatGPT desktop app for macOS and Windows. The result is three modes in one app: **Chat**
(fast, conversational), **Work** (an agent for longer multi-step deliverables), and **Codex**
(software development). You switch via a "ChatGPT or Codex" selector top-left, then a
Chat/Work toggle within ChatGPT. Multiple independent 2026-dated write-ups (techtimes.com,
coursiv.io, aitoolhunt.co, developersdigest.tech) agree on this three-mode structure and state
it's available on every plan including Free.

**CORROBORATION: corroborated** on the existence and naming of the three modes and the merger
date (four independent publishers agree). **But flag a real discrepancy:** a user bug report on
OpenAI's own developer community forum, filed against desktop build 26.707.31428, states "Web
has Chat + Work, desktop only shows Work + Codex" — i.e., at least one real user on a real recent
build did not see Chat mode on desktop at all. This is exactly the kind of vendor-marketing-vs.
actual-shipped-build gap the brief warned about. **CHANGED / verify in app** — do not assume all
three modes are visible on every install without checking Ali's own app.

**Date of newest supporting source:** 2026-07-10 (write-ups); forum report dated by build number
to approximately the same window.

---

## Memory, custom instructions, projects (standing topics)

**What current material shows:** `Settings > Personalization > Memory` holds two independently
toggleable parts — explicit "saved memories" (editable list) and implicit "reference chat
history." Custom Instructions live at the same `Settings > Personalization` location. Projects
wrap a persistent task with its own files, instructions, and memory; one 2026 source states the
Pro-tier file limit per project doubled to 40 (dated to mid-2025, so treat as background, not a
2026 fact).

**CORROBORATION: corroborated** — OpenAI's own memory announcement, its Academy "Customizing
ChatGPT" resource, and two independent 2026-dated guides (inkeybit.com, mywritingtwin.com) agree
on both location and the two-part structure of Memory.

**Date of newest supporting source:** 2026 (exact day not stated on the Academy/inkeybit pages).

**What changed recently:** NOT VERIFIED — no source in this pass dated the split between "saved
memories" and "reference chat history" to a specific 2026 release.

---

## Connectors and scheduled tasks (standing topics)

**What current material shows:** Connectors (Google Drive, Gmail, Box, etc.) are added via
`Settings > Apps` or an "Add from apps" control in the composer; one source states a Plus, Pro,
Team, Enterprise, or Edu plan is required (Free excluded) — this is a **single-source** claim,
not cross-checked here. Scheduled tasks, per a June 2026 refresh described by two independent
2026 sources, became "agentic" — they can now run on a timer, search the web, and reach into
connected apps rather than just re-running a static prompt.

**CORROBORATION:** Connector plan-gating — single-source, unconfirmed. Scheduled-tasks
"agentic" upgrade — corroborated (two independent 2026 publishers).

**Date of newest supporting source:** 2026 (June 2026 refresh referenced by both).

---

## What the good tutorials do well
- The best 2026 material (Forbes, The Neuron, bizrescuepro) is explicit about **where it went
  wrong first** before landing on the right click path — Forbes and aiagentslibrary.com both
  flag "people look in Settings, it's actually under Plugins" as the single most common mistake.
  That kind of "here's the wrong turn, here's the right one" framing is exactly what a beginner
  needs and is largely absent from vendor docs.
- Independent publishers consistently date and byline their work and update it (aiagentslibrary
  shows a distinct published-vs-updated date), which is what makes corroboration possible at
  all — undated content was unusable for this report.

## What they all get wrong
- Nobody found in this pass produced a full, paced **video** walkthrough of the redesigned
  Settings sidebar (Personal / Integrations / Coding) with the exact pane names Ali's screenshot
  shows — everything usable was text/blog explainer content. A YouTube title turned up
  ("NEW Hidden ChatGPT 5.6 Features You Didn't Realize Existed") but was not fetched/verified in
  this pass — NOT VERIFIED as good or bad.
- Several otherwise-solid articles (bizrescuepro) describe a feature's *capability* while
  omitting *eligibility* (e.g., Skills' Business/Enterprise gating) — a reader could easily try
  to follow along and find the feature simply isn't there, with no article warning them why.
- The rapid July 2026 merge of Codex into the ChatGPT desktop app means several articles from
  earlier in July already describe a moving target — the community bug report of Chat mode
  missing entirely from one build is a live example of docs/marketing lagging the shipped app,
  which is the exact failure mode this brief was written to catch.

## Already covered to death
Memory, custom instructions, and Projects are thoroughly, repeatedly covered across vendor and
independent 2026 sources with consistent, corroborated detail. No need to re-research these
further before scripting; the open question is teaching approach, not facts.

## The gap
- A single, current, **corroborated** map of the whole redesigned Settings sidebar (Personal /
  Integrations / Coding) does not appear to exist anywhere published — this report is the first
  attempt found to even lay the three sections out together. That is the gap LAiDIES could fill:
  a dated, on-screen walkthrough of exactly this sidebar, filmed against the actual current
  build, with eligibility caveats stated up front (e.g., "Skills may not appear on your
  account").
- Nothing found targets non-technical women specifically for these newer panes (Hooks,
  Configuration, Connections, Worktrees) — unsurprising, since these are developer/Codex
  features; if LAiDIES teaches them at all, it should be framed as "here's what this is, you
  probably don't need it" rather than a how-to, given who it's actually for.

## 🔴 Confidence
**Would stake something on:** Skills' click path (Plugins → Skills tab, not Settings) and its
non-availability on plain individual accounts per OpenAI's own stated eligibility — two
independent, dated, recent sources agree, including a hands-on account. Also the existence and
naming of Chat/Work/Codex modes and the July 9, 2026 merger date — four independent sources
agree.

**Would NOT stake anything on:** (1) The Hooks pane's exact behavior and click path inside the
Settings UI — single-publisher (OpenAI itself) with no independent confirmation; my
reconciliation of "file-defined hooks, UI reviews them" is my own inference, not a stated fact.
(2) Pets, Configuration, Connections, Environments, Worktrees, and Git panes generally —
all single-source, vendor-only; treat every claim about them as a starting hypothesis to check
live in the app, not a filmable fact. (3) Which plan tier gates Computer Use — two sources
actively disagree (Work/Codex-only vs. all plans including Free) and this is exactly the kind
of contradiction the brief said not to smooth over. Check Ali's own account before filming.
