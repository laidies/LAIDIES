# Library consolidation — SLAiYER Handbook → the 101 textbooks

**Decision (Ali, 2026-07-08).** The paginated **SLAiYER Handbook** (real content, bad UX) and the **101 textbook shelf** (7 empty stubs) are the same reference in two systems — nearly a 1:1 topic overlap. Consolidate to **one system: the 101 textbooks**, in a **scrollable** page format (the [Verification Rulebook](/grimoire/verification-rulebook.html) is the good-UX model), absorbing the Handbook's existing writing. **Retire the paginated slider.**

This is a plan to review + sign off. **Do NOT build yet** — recommend executing after Ep 3 is recorded.

---

## The mapping (source content → target 101)

| 101 textbook (target · scrollable) | Ep tie | Source content (SLAiYER Handbook, paginated) |
|---|---|---|
| **ChatGPT 101** | intro / Ep 1 | `slaiyer-handbook-chatgpt.html` — the ChatGPT field notes |
| **Vocab 101** | Ep 1 | Ch.1 *Every SLAiYER Needs a Watcher* → **The Vocabulary** (Prompt, Model/LLM, Training data…) |
| **Concepts 101** | Ep 3 | Ch.1 → the **how-it-works / why-it-hallucinates** material |
| **Tools 101** | Ep 4 | Ch.4 *The Field Guide* (+ Ch.1's **"four types"**) |
| **Briefing 101** | Ep 2 | Ch.2 *The Briefing Rules* ← cleanest 1:1 |
| **Setup 101** | Ep 5 | Ch.3 *The Skeleton Key* |
| **Accounts 101** | Ep 6 | Ch.5 *The Account Rule* |

**Note:** Ch.1 is the dense one — its content **splits across three 101s** (Vocab + Concepts + Tools). Everything else is close to 1:1.

## Loose ends to decide
- **Per-tool field notes** (Claude, Gemini, Copilot, Perplexity, NotebookLM) have no matching 101. They're the **Model Menu** shelf's job (ChatGPT-vs-Claude-vs-…). → route them there, not into a 101.
- **Episode locks:** the Handbook chapters are episode-tagged; keep the "opens with Ep N" tie on each 101 (already how the shelf stubs read).

## Format (the good-UX target)
Each 101 = **one scrollable page**, sectioned and scannable, like the Verification Rulebook. Skim the top, scan headings, read or grab. **No pagination.**

## The paginated Handbook shell → retire
Move each chapter's writing into its 101(s), then **301-redirect** the old `grimoire/slaiyer-handbook-chapter-N.html` pages to their new 101 (preserve inbound links). Keep the writing; drop the slider. The "SLAiYER Handbook" landing page becomes the index of the 101 shelf (see naming).

## Naming — **needs Ali's call**
- Individual titles stay: "Vocab 101," "Briefing 101," etc.
- **Collective name:** keep **"The SLAiYER Handbook"** as the name of the shelf-of-101s (Buffy/Watcher callback — the 101s become its chapters)? Or go pure **"the 101 shelf"** (school-textbook framing, matches "textbooks not courses")? Slight theme clash (Buffy vs school); pick one.

## Residual overlap — a SEPARATE later cleanup (flag, don't fix here)
Even after this, some thematic **shelves** still shadow the 101s: Prompt Playbook ≈ Briefing 101, Model Menu ≈ Tools 101, Consent Ledger ≈ Accounts 101. Resolve later with the rule we set: **shelves = how-to *skills* (do this); 101s = *concept* textbooks (understand this)**; one home per topic, cross-link, never re-teach. (The Verification Rulebook is the model skill-shelf.)

## Imagery — old emblems don't fit; new covers already spec'd
The old Handbook art (`assets/episodes/issue-04/ch1-cover-slayer-and-watcher.png`, the celestial section emblems) is the **ornate illuminated / tarot** look — it belongs to the paginated Grimoire shell and clashes with a clean scrollable textbook. **Retire it from the 101s.**

New imagery is **already written**: `operations/codex-prompts/library-101-textbooks.md` — a **matched series of 7 textbook covers** (one per 101, Y2K-honest, transparent PNG, 3/4 view so they line up on a shelf) **+ a shelf kit**. Just needs Codex to render + wiring.
- The 7 covers → each 101's hero/cover **and** the shelf-card thumbnails on `library.html` (currently emoji-glyph placeholders).
- The scrollable format needs **less** art than the old ornate chapters — a cover per 101 + clean sectioned type (the Verification Rulebook has *no* inline images and reads great). Drop the per-section emblems; don't re-commission them.

## Sequencing (when we build)
1. Build **Briefing 101 ← Ch.2** first as the template (cleanest 1:1) → Ali signs off on the scrollable 101 format.
2. Roll the rest on that template; split Ch.1 across Vocab / Concepts / Tools.
3. Route per-tool notes to the Model Menu.
4. Redirect the retired paginated chapters.
5. Flip the library shelf cards from "on the shelf soon" → live as each lands.

**Currency caveat:** run every migrated chapter through the [fact ledger](operations/facts-and-citations-ledger.md) — the Handbook chapters predate the Ep 3 fact corrections (Stanford = sycophancy, KPMG = 40/45, Nature framing) and may carry stale claims. Also sweep stale **"LAiDIES Grimoire"** branding → **LIBRAiRY** while in each file.
