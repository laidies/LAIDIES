# LIBRAiRY bookcase reorganization — build spec

Locked with Ali 2026-07-09. **Vision:** Codex made a real BOOKCASE asset. Give the LIBRAiRY a
*different bookcase per section* so entering the page = walking into an actual library. Books grouped
logically; every title clearly signals what's inside (puns were hiding the content — see corrections).

## Wayfinding principle — title FORM signals book TYPE
- **101s** → `___ 101` — a textbook, *learn the basics.*
- **Reference** → `How to ___` / `What ___` / `Straight Answers` / `The ___ Cookbook` — a practical guide, *look it up.*
- **The Tools** → the app's own name — a guide to *that one tool.*
The reader learns the grammar: 101 = learn · how-to/straight-answers = look up · tool name = a specific app.

## The three bookcases (each = its own Codex bookcase visual)

### 1. The 101s — "the basics" (read to learn)
Tool-agnostic concept/skill textbooks. Covers ALREADY delivered → `assets/library-101/` (opaque + on-shelf, done). Books:
- Vocab 101 · Concepts 101 · Briefing 101 · Setup 101 · Accounts 101 · **The Cast 101**
  *(The Cast 101 = renamed "Tools 101" to avoid clash with The Tools case; content = Ep4's cast — generative/reasoning/agentic/AGI types.)*

### 2. The Tools — "the apps you open" (pick + use) · fashion-house framing
One book per app + a compare. Books:
- **Who's Who in AI** — directory of companies + their tools (this is the OLD "Power Map" content, reframed + moved here from Reference).
- ChatGPT · Claude · Gemini · Copilot · Perplexity (per-tool guides).
- **The Lineup** — the side-by-side compare (= Ep 5 "The Model Menu" content, as a live reference).

**Fashion-house analogy (accurate — use here + in Ep 5):** company = fashion HOUSE/designer (OpenAI, Anthropic, Google); its MODELS = its lineup (a house walks several — you pick one per job); the TOOL = the boutique you shop it in (ChatGPT, Claude app). **Copilot + Perplexity = DEPARTMENT STORES** carrying other houses' lines (Copilot ≈ OpenAI's models — that's *why* it feels like ChatGPT). Some models only ever walk for their own house; department stores borrow.
⚠️ **"models" ≠ "tools."** Never name the tools shelf "Models" (that's the model layer → Ep 5). Verify exact current model names + who-runs-on-what per [[fact-verification-rule]] before shipping The Lineup.

### 3. Reference — "look it up" (pull when a question shows up)
Renamed for clarity (old puns hid the content). Old → new:
- The Chamber of Receipts → **Straight Answers About AI** — sourced Q&A on the big questions (Jobs, Environment, Privacy, Economy). ⚠️ ACTUAL page = a *sourced fact-file*, NOT a how-to-cite guide; the old shelf-card description was wrong — fix it.
- The Verification Rulebook → **How to Check AI's Work** — content already matches (Prompt Like Elle); retitle only.
- The Consent Ledger → **What Not to Paste** — privacy / what's unsafe to put in the box (ties to Ep 7).
- The Prompt Playbook → **The Prompt Cookbook** — ready-to-use prompts (recipes you copy).

## Rename mechanics (at build)
Live pages: `/grimoire/power-map.html`, `chamber-of-receipts.html`, `verification-rulebook.html`.
Retitle in-page (title/h1/dek) + update `library.html` shelf cards + fix the wrong descriptions. If any
URL changes, add a redirect (don't break links). Power Map moves conceptually into The Tools case.

## Build order
1. **The 101s case** (covers exist) — set the 7 books on the Codex bookcase → proves the "walk in" effect.
2. **The Tools case** — needs per-tool + Who's Who + The Lineup covers (Codex, matched to 101 textbook style).
3. **Reference case** — retitle pages + covers.

## Blocked on
- The **Codex BOOKCASE asset** (Ali made it — need the file path).
- Per-tool + reference **book-cover art** (Codex, matched to the delivered 101 textbook style).

## Cross-refs
Ep 5 = The Model Menu / fashion runway → [[ep5-model-menu-resequence]] + `content/episodes/episode-05.canon.md`.
Icons = gold, no emoji ([[no-emoji-ui-icons]]). 101/Handbook consolidation still pending ([[handbook-101-consolidation]]).
