# GPT-5.6 price cuts — impacts and how to think

## Two-minute reverse brief

- **Reader:** a smart newcomer who may pay for ChatGPT/Codex or use an AI tool
  at work, but does not naturally separate subscription, credits and API tokens.
- **Question:** Did OpenAI just make AI 80% cheaper, and should I change models?
- **Promise:** understand exactly which meter changed and use a safe test-first
  rule for routing work.
- **Place in the system:** dated THE BREAKING choice-change explanation.
- **Canonical source:** OpenAI's July 30 announcement and current model docs.
- **Not this:** a general GPT-5.6 review or proof that Luna matches Sol/Fable.
- **Admission rule:** only operative price/access/limit changes and clearly
  labelled vendor claims enter the story.
- **Continuation:** watch for independent cost-per-task tests and provider
  responses; route durable model-routing guidance through Learning System.

## The useful mental model

Think of a coffee business with two ways to pay. A customer can buy a monthly
coffee-club membership; a café owner can buy beans wholesale by the kilogram.
OpenAI cut something closer to the wholesale rate for two model tiers. It did
not cut the monthly membership price.

The analogy stops there: API bills depend on input, output, reasoning, tools,
caching, retries and context length—not only one bag of beans. The posted token
rate is a unit price, not the total cost of a finished task.

## Reader decision rule

- **API or high-volume agent workflow:** test Luna first on well-specified,
  reversible steps; compare quality, retries, latency and total cost per
  accepted result against the current model.
- **Everyday but consequential work:** test Terra where Luna misses nuance;
  keep a stronger model for ambiguous planning, review or high-cost errors.
- **Codex or ChatGPT Work subscription:** expect Terra/Luna to consume fewer
  credits, but do not expect a lower monthly bill or larger nominal quota.
- **Ordinary ChatGPT chat user:** no price or default change was announced; the
  story may not require any action.
- **Long-context workload:** price the full request. Crossing 272K input tokens
  triggers higher rates for the entire request.

## Impact

The most important shift is not that every AI task became cheap. It is that a
model capable enough to run routine tool-using steps now sits at a price once
associated with much weaker tiers. That can change which automations are worth
building and encourages mixed-model workflows: use a stronger model to plan or
judge, and a cheaper model to execute well-bounded work.

The risk is false economy. A model that needs more retries, produces longer
answers or quietly makes more errors can cost more per accepted result even
when its token rate is lower.
