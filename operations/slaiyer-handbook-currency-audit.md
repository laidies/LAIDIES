# SLAiYER Handbook — Currency / Accuracy Audit + Fix List (2026-07-06)

Read-only audit of the 7 "101 Classes" sources. Every currency verdict web-verified against live
mid-2026 reality. **Headline: the bones are fresh — it's almost entirely the proper nouns that aged.**

## Verified FRESH — do NOT touch
Every research citation checks out: OpenAI hallucination paper (Kalai et al., arXiv 2509.04664),
Stanford AI Index "22–94% across 26 models," "Lost in the Middle" (TACL 2024), KPMG/GPTZero
(pulled report June 13 2026), Samsung 2023 code leak, o1 = first reasoning model (Sept 2024),
"no public product is AGI" framing, personal-vs-business training defaults, context-window SIZES
(1M / 2M). Chapters 2, 4, 5 are evergreen. Strong teaching throughout.

## THE fix that breaks the LOCKED rule — stale model names
Ch.1 + The Decoder present the frontier as **Claude Opus 4.8 / GPT-5.2 / Gemini 3 Pro** (~8 spots).
- Clearly stale: **GPT-5.2 → GPT-5.5** (Apr 2026); **Gemini 3 Pro → Gemini 3.1 Pro** (Feb 2026).
- Agent also flags newest Claude flagship **Fable 5** (June 2026) + **Sonnet 5**, which the book doesn't name.
- ⚠️ NOTE: per Claude's own current model roster, **Opus 4.8 is still a current model** — so it's not "wrong," just an incomplete/aging peer-set. **CONFIRM exact current line-up with Ali before writing** (version-sensitive, load-bearing, and the locked rule is at stake).
- Sizes (1M/2M) stay — names only.

### Durable fix (the real answer to "always fresh"), pending Ali's OK
Don't just swap names (stale again by fall). **Quarantine volatile model names into ONE dated
callout** — "The current frontier (as of July 2026): …" — and make surrounding prose version-proof
("each lab keeps a flagship; they leapfrog every few months; today's are…"). One place to update,
visible date, lesson never rots. Same for the Decoder "Model" card (reference provider/family +
point to the dated callout instead of hardcoding "GPT-5").

## Other currency items
- **Haiku 4.5 cutoff:** book says "July 2025"; agent found Anthropic's live doc now says **Feb 2025**. VERIFY against live models page before changing. (Opus 4.8 = Jan 2026 confirmed, stays.)
- **ChatGPT card** cites the "GPT-5.2 prompting guide" — de-version ("OpenAI's current prompting guide"). Advice unchanged.
- **Temporary Chat** "won't write to memory" — a 2026 OpenAI update lets it retain personalization while staying off-record. Reframe to what's guaranteed (not in history, not trained on, 30-day retention).

## Consistency (reader-facing, not currency)
- **Broken cross-refs:** ChatGPT card (2×) + Ch.2 point readers to "Chapter 1, Part 3 / Part 5" for briefing/accounts — those are now **Chapter 2 / Chapter 5**. Links resolve correctly; visible labels lie. Cheap fix.
- Verify `/grimoire/power-map.html` exists (linked from ChatGPT card). Re-stamp Ch.5 FACT GATE.

## HUB fix — blocks finalizing the 101 Classes
Cards 4 & 5 have **swapped semantics**:
| # | Current label | → Corrected label | Name | Chapter |
|---|---|---|---|---|
| 1 | VOCAB 101 | VOCAB 101 | The Decoder | potions-shelf |
| 2 | CONCEPTS 101 | CONCEPTS 101 | Every SLAiYER Needs a Watcher | ch-1 |
| 3 | BRIEFING 101 | BRIEFING 101 | The Briefing Rules | ch-2 |
| 4 | ❌ TOOLS 101 | **SETUP 101** | The Skeleton Key | ch-3 |
| 5 | ❌ PRACTICE 101 | **TOOLS 101** | The Field Guide | ch-4 |
| 6 | ACCOUNTS 101 | ACCOUNTS 101 | The Account Rule | ch-5 |
| 7 | CHATGPT 101 | CHATGPT 101 | ChatGPT | chatgpt |
Label-only edit (order/links unchanged). Then delete the "drafts pending review" note.

## Depth / coverage (not blocking)
Decoder glossary is missing cards for **AGI, Reasoning model, Multimodal, Context window,
Training cutoff, RAG/grounding** — all taught in Ch.1. Add them (the deferred grimoire↔glossary
cross-link work) so the two surfaces don't drift.

## PRIORITIZED
1. Model-name refresh (Ch.1 + Decoder) — LOCKED-rule fix — via the dated-callout refactor. **[confirm names + approach]**
2. Haiku 4.5 cutoff — **[verify live]**
3. De-version ChatGPT prompting-guide ref.
4. Fix "Chapter 1 Part 3/5" cross-refs → Ch.2/5.
5. Hub relabel 4&5 + kill placeholder note.
6. Soften Temporary Chat memory line.
7. (later) Decoder cards for AGI/Reasoning/etc.
