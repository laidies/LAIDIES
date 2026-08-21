# AI Fundamentals 101 v3 — tokens claim/source packet

**Status:** CURRENT PRIMARY-SOURCE INPUT — NOT PUBLIC PROSE
**Evidence date:** 2026-08-09 PDT
**Owner:** Library, with factual admission still required
**Representative proof:** Chapter 2 section `Tokens: why AI can write a paragraph and still trip over a word`

## Reader-safe claims this packet supports

1. Text-generation models do not take in a sentence as the same visible row of
   letters a person sees. Software first segments the text into tokens, and the
   model processes the resulting token sequence.
2. A token can be a whole word, part of a word, punctuation, a space or a
   single character. Tokens are therefore not the same thing as words, letters
   or meanings.
3. The exact split varies with the model and encoding. A diagram must name its
   encoding and may not imply that one split is universal.
4. OpenAI's `tiktoken` documentation says its byte-pair encoding is reversible,
   works on arbitrary text and tends to preserve common subword pieces. The
   main reader explanation does not need the terms `UTF-8`, `byte-pair merge`
   or raw token IDs to teach the mechanism.
5. Token counts matter because model limits and API metering are expressed in
   tokens. Current limits and prices are volatile and belong in product
   documentation, not in this evergreen lesson.
6. Character-level tasks can be awkward for subword-token models because the
   model must recover character structure from pieces that do not necessarily
   line up with individual letters. This is a contributor, not a claim that
   every current model always fails every spelling or counting task.

## Current primary and research evidence

### OpenAI Help Center — What are tokens and how to count them?

- URL: <https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them>
- Checked: 2026-08-09; page reported updated 11 days earlier.
- Relevant page lines at check time: 9–26, 36–57, 58–71 and 72–103.
- Supports: token forms; the text → tokens → model → tokens → text sequence;
  variation by model/encoding; token limits; API metering; the interactive
  tokenizer.
- Use boundary: the English `about four characters` heuristic is an estimate,
  not a definition and not a universal language rule. The book should not
  publish a current model limit or price from this page as evergreen fact.

### OpenAI `tiktoken` repository — README

- URL: <https://github.com/openai/tiktoken/blob/main/README.md>
- Checked: 2026-08-09.
- Relevant README lines at check time: 191–208 and 220–236.
- Supports: OpenAI models use a tokenizer; tokenization turns text into a
  sequence of numbers; the encoding is reversible; common subwords are useful
  pieces; different encodings can be inspected programmatically.
- Use boundary: the internal BPE implementation is optional depth. It must not
  become the main route for a nontechnical reader.

### Cosma et al. — The Strawberry Problem

- Proceedings source: <https://aclanthology.org/2025.emnlp-main.1434/>
- DOI: <https://doi.org/10.18653/v1/2025.emnlp-main.1434>
- Checked: 2026-08-09.
- Supports: character-level capabilities in tokenized language models are not
  automatic; the paper tests 19 controlled tasks and connects letter-level
  difficulty to information obscured by tokenization.
- Use boundary: the paper does not justify saying that every modern model will
  answer the strawberry question incorrectly. The lesson uses the example to
  reveal the mismatch between human-visible letters and model input pieces.

## Reproducible strawberry split used by the teaching visual

Command method: Python 3 with official `tiktoken` package version `0.13.0`,
`encode("strawberry")`, followed by `decode_tokens_bytes`.

```text
cl100k_base  count=3  pieces=['str', 'aw', 'berry']
o200k_base   count=3  pieces=['st', 'raw', 'berry']
```

The representative visual may show the `o200k_base` example only if it labels
the encoding beside the pieces and immediately says another encoding may split
the same word differently. Raw token IDs add no useful reader understanding
and are intentionally omitted.

## Exact claim guard for the draft

Admit this wording family:

> Tokenization is one reason letter-by-letter jobs can be unexpectedly awkward
> for a language model: the model begins from reusable text pieces, not the
> neat row of letters you see. It can still learn or use other methods to work
> with letters, so the pieces do not determine every answer by themselves.

Reject these wording families:

- `Tokenization is why ChatGPT cannot count the r's in strawberry.`
- `Every AI model uses BPE tokens.`
- `One token equals one word.`
- `A token is a token.`
- Any main-route explanation that requires the reader to understand UTF-8,
  byte-pair merge rankings, embeddings or integer token IDs first.

## Freshness trigger

Recheck the OpenAI Help Center and `tiktoken` repository before factual
admission if the representative prose, named encoding, current limit, cost or
provider-specific claim changes. A future model improvement does not invalidate
the durable mechanism, but it may invalidate a claim about what a named model
can or cannot do today.
