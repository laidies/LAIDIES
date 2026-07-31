# Claude Opus 5 — research and claim map

**Status:** PRIVATE

## Release identity and access

- Company/provider: Anthropic.
- Product/model family: Claude / Opus.
- Public label and API model ID: Claude Opus 5 / `claude-opus-5`.
- Release date: July 24, 2026.
- Access: Claude.ai, Claude Code, Cowork and the Claude API; all paid Claude
  plans, with Opus 5 the default for Max and the strongest model offered on Pro.
- Cloud access: Amazon Bedrock, Google Cloud and Microsoft Foundry.
- Region details: Anthropic says all paid plans and supported platforms; the
  launch page does not announce a new region-specific restriction.

## Confirmed

| Claim | Evidence | Confidence |
|---|---|---|
| API price is $5 per million input tokens and $25 per million output tokens, unchanged from Opus 4.8. | Anthropic launch; Reuters | High |
| The model has a one-million-token context window and up to 128,000 output tokens on the Claude Platform. | Anthropic platform release documentation | High |
| Thinking is on by default and API users can control effort. | Anthropic launch and platform documentation | High |
| Fast mode is about 2.5 times faster and costs twice the base API rate or Claude Code usage credits. | Anthropic launch | High for product terms; speed is vendor-measured |
| US-only inference is offered at a 1.1x price multiplier. | Anthropic launch and Opus product page | High |
| Flagged Claude.ai, Claude Code and Cowork requests fall back to Opus 4.8 by default; API fallback is optional. | Anthropic launch | High |
| Artificial Analysis places Opus 5 at or near the lead on its agentic knowledge-work evaluations. | Artificial Analysis | High for that evaluator, not universal performance |
| Maximum effort can enter excessive self-verification loops; lower effort can perform better on some evaluations. | Anthropic release evidence/system-card discussion | High for the documented behaviour; task prevalence unknown |
| AIDB's synthesis of practitioner reports describes early stopping, excessive permission checking and premature completion claims. | AI Daily Brief complete July 27 edition | Moderate; useful directional evidence, not a representative study |

## What the evidence shows

Opus 5 offers a materially stronger efficiency/capability package than Opus 4.8
at the same token price, with a large context window and more explicit
time-versus-quality controls. Independent testing supports strong agentic
knowledge-work performance.

## What it does not show

- It does not establish that Opus 5 is best for every task, every prompt or
  every budget.
- Vendor benchmarks do not predict a reader's exact files, tools or workplace.
- A one-million-token window does not mean every fact in a huge input will be
  recalled or weighted correctly.
- “Same price” does not mean the same bill: tool use, longer outputs, effort and
  fast mode can change total consumption.
- More effort does not guarantee a better result; it can produce repeated
  checking or hesitation.
- Practitioner reports do not establish a population-wide failure rate or
  prove that every issue comes from the model rather than old workflow setup.
- The fallback means some requests may not run on Opus 5; the visible product
  label is not always proof of the model that answered.

## Reader tests before stronger guidance

1. Run the same real work sample on Opus 4.8, Opus 5 and the cheaper current
   Claude option.
2. Compare outcome quality, elapsed time and total tokens—not benchmark rank.
3. Test long-document retrieval at the beginning, middle and end of the input.
4. Confirm which effort/fast settings were used and whether fallback occurred.
5. Revalidate old Claude Code skills and instructions, and independently
   inspect whether every requested step was actually completed.
6. Recheck plan limits and product defaults on publication day.

## Source hierarchy

1. [Anthropic launch](https://www.anthropic.com/news/claude-opus-5) — primary,
   interested party; release identity, access, price and product behaviour.
2. [Anthropic model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)
   — primary product documentation; predecessor lifecycle.
3. [Artificial Analysis evaluation](https://artificialanalysis.ai/articles/claude-opus-5-leader-agentic-knowledge-work)
   — independent evaluator; bounded benchmark evidence.
4. [Reuters report](https://www.investing.com/news/stock-market-news/anthropic-rolls-out-opus-5-ai-model-in-efficiency-upgrade-4812323)
   — independent corroboration.
5. [Axios report](https://www.axios.com/2026/07/24/anthropic-releases-new-model-opus-5)
   — independent market and lineup context.
6. [AI Daily Brief, July 27](https://aidailybrief.beehiiv.com/p/where-claude-opus-5-fits-in-your-model-rotation)
   — secondary analysis; practitioner evidence and model-rotation interpretation,
   consulted after LAiDIES' independent source read.

## Publication-day rechecks

Reopen Anthropic's launch, pricing/model documentation and status page; verify
the public model ID, plan access, API price, fast-mode multiplier, fallback and
any newly published system card or independent real-use result.
