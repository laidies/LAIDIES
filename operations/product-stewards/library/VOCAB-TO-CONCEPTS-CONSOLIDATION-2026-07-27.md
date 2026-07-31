# Vocab 101 → Concepts 101 consolidation

**Status:** **MERGED LOCALLY — CONCEPTS REMAINS HOLD**  
**Date:** 2026-07-27  
**Scope:** content ownership and catalogue truth only; no visual candidate,
admission, deployment or public claim

## Product structure

- **The 101s** is the shelf.
- **Vocab 101** was one book on that shelf, never a shelf.
- The standalone Vocab book is no longer listed.
- **Concepts 101** remains a book on The 101s shelf.
- The former Vocab source is retained only as fail-closed migration evidence.

## Content parity

The Concepts lessons already taught Model/LLM, Training data, Knowledge cutoff,
Token, Context window, Hallucination, Generative AI, Reasoning models, Agentic
AI and AGI in depth. The consolidation adds a 16-term **Concepts quick
reference** so the useful recognition layer is not lost.

| Retained term | Concepts owner |
| --- | --- |
| Agentic AI | Deep lesson + quick reference |
| AGI | Deep lesson + quick reference |
| AI winter | Quick reference; Episode 4 owns the historical narrative |
| Context | Quick reference; Episode 2 owns the applied teaching story |
| Context window | Deep lesson + quick reference |
| Generative AI | Deep lesson + quick reference |
| Grounding | Hallucination lesson + quick reference |
| Hallucination | Deep lesson + quick reference |
| Knowledge cutoff | Training-data lesson + quick reference |
| Model / large language model (LLM) | Deep lesson + quick reference |
| Multimodal | Training-data lesson + quick reference |
| Prompt | Quick reference; Briefing 101 and Episode 2 own applied prompting |
| Reasoning model | Deep lesson + quick reference |
| Retrieval | Quick reference; Episode 3 owns verification practice |
| Token | Deep lesson + quick reference |
| Training data | Deep lesson + quick reference |

## Acceptance evidence

- `node scripts/check-library-vocab-concepts-consolidation.mjs`:
  **PASS**, 16/16 terms, canonical shelf `THE 101s`, Vocab unlisted.
- `node scripts/test-library-product.cjs`:
  **PASS**, 49 checks, 34 external requests blocked.
- `node scripts/validate-library-product.mjs`:
  **PASS**, catalogue contract remains 15 backend records, 8 hold, 7 preview,
  0 available; the visible catalogue excludes the retired legacy record.
- JSON parse and scoped diff check: **PASS**.

The broader owner-entry validator is currently blocked by the unrelated missing
`operations/product-stewards/library/VISUAL-ASSET-INVENTORY.md`. That missing
dossier file is not treated as a failure of this content consolidation and is
not silently recreated here.

## Remaining gate

Concepts 101 is still **HOLD**. This merge does not admit or publish the book.
It still needs its full editorial, source/currency, reader, accessibility and
release scorecard before the catalogue may make it available.
