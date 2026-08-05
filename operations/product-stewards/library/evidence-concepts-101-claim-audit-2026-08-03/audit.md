# Concepts 101 exact claim/source audit

**Status:** HOLD — bounded repair required; no content, catalogue, asset, release
or public-state admission implied.
**Audit date:** 2026-08-03
**Scope:** read-only audit of the exact rendered candidate. This is not a rewrite.

## Bound bytes

| Artifact | SHA-256 |
| --- | --- |
| `content/library-books/rendered/concepts-101.html` | `c257317c3171647632d677f99deabd85dbcb6b1086f2d87898e948cbe3e80c8c` |
| `content/library-books/handbook-ch1.md` | `d5f20a90faafca6c0771cbb0edc11f8447b83f6917d9684cd5cfa50be379d2e2` |
| `content/library-books/vocab-101.md` | `9f82325e9c939e678e5ff545b40f2889063b4794edde4365f3098fb7d023561a` |
| `operations/product-stewards/library/VOCAB-TO-CONCEPTS-CONSOLIDATION-2026-07-27.md` | `6650bff98d14896643c195297514d7b2df055ab2b67ca8b53411cadda175a928` |

## What remains sound

- Model/provider/product/tools distinction (rendered lines 4–60).
- The durable core of training, context, hallucination, generative, agentic,
  sandbox and AGI explanations.
- The fashion-house, Cher’s closet and rehearsal-studio analogies, including
  their stated limits.
- Vocab consolidation: all 17 current quick-reference terms are in Concepts;
  Vocab is not a separate listed book.

## Material repair groups

| Priority | Rendered lines | Finding | Minimum correction |
| --- | --- | --- | --- |
| P0 | 69–77 | Named products, training-corpus quantities and modality claims are not established by the cited provider pages. “Can only generate things it was shown how to generate” is too absolute. | Keep the durable distinction; use a generic description of training material/pattern learning and distinguish it from current task context. |
| P0 | 81, 90, 93, 101, 105 | Static cutoff range is stale; “every maker publishes exact date,” provider release cadence, a six-month rule and “default failure mode” overstate the evidence. | Instruct readers to identify the exact model/product and verify time-sensitive claims against current official/primary sources. |
| P0 | 121, 127–131, 172–174 | Current capacity figures are volatile. *Lost in the Middle* does not establish the book’s universal 30%/replication claim or guarantee that a reader’s middle answer will be weakest. | Remove current capacity figures; report the study as a controlled, model/task-specific finding and turn the exercise into comparison/checking rather than a promised outcome. |
| P1 | 119, 144–148, 414–416 | Context and cross-chat memory are presented as universal product behavior. | State that products can manage, summarize, retain or omit prior material differently; defer exact behavior to product documentation. |
| P0 | 230 | The KPMG/GPTZero case makes factual and causal claims without a complete primary-source packet (including retraction/pull evidence). | Remove it now; do not replace it without a complete primary receipt. The source-checking lesson still works. |
| P1 | 346–352 | OpenAI’s official incident account supports the core example but labels its account preliminary; target has no direct receipt. | Add the official receipt and qualify it as OpenAI’s preliminary account. |
| P1 | 381–384 | AGI comparison is substantively supported but has no direct receipt in the candidate. | Add the two direct primary links below. |
| P1 | 432–469 | Quick reference repeats cutoff/context/training claims. | Propagate the bounded successor wording to the relevant entries. |

## Primary-source packet consulted

- OpenAI, [Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/) — supports the bounded evaluation/abstention explanation at line 196.
- Anthropic, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) — supports the working-memory distinction and shows why static capacity claims are perishable.
- Liu et al., [Lost in the Middle](https://cs.stanford.edu/~nfliu/papers/lost-in-the-middle.tacl2023.pdf) — reports position-sensitive performance in its tested models/tasks; its reported GPT-3.5 example is a greater-than-20% drop, not the candidate’s universal “more than 30%” result.
- OpenAI, [Hugging Face model-evaluation security incident](https://openai.com/index/hugging-face-model-evaluation-security-incident/) — source for the sandbox case; its findings are preliminary.
- OpenAI, [Charter](https://openai.com/charter/) — defines AGI as highly autonomous systems that outperform humans at most economically valuable work.
- Google DeepMind, [Levels of AGI](https://deepmind.google/research/publications/66938/) — distinguishes performance/depth, generality/breadth and autonomy.

## Minimum repair cutline

1. Add one canonical `concepts-101.claims.json` ledger binding claim ID, rendered
   locator, source locator, class (`durable`, `currentness_sensitive`, `analogy`),
   direct source ID, source limitation, freshness trigger and propagated
   quick-reference entry.
2. Make only the line-group corrections above; preserve settled prose and all
   useful analogies.
3. Add a narrow validator that fails if a currentness-sensitive claim lacks a
   direct source, refresh trigger or exact candidate binding.
4. Re-run `node scripts/check-library-vocab-concepts-consolidation.mjs` and
   `node scripts/test-library-product.cjs`, then obtain independent
   accuracy/teaching and reader-accessibility judgments.

## Boundary

This receipt does not make Concepts 101 available, admit its held cover/body
assets, establish a working Library reader/save journey, authorize a release,
or alter any Control Room, registry, release or public record. No Ali decision
is needed to remove the unsupported KPMG paragraph and correct the bounded
claims; a future public case study requires its own complete primary evidence.
