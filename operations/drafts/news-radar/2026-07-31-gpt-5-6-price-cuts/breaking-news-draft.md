# The Breaking: OpenAI cut GPT-5.6 Luna's API price by 80%—but your ChatGPT bill did not change

OpenAI has cut the price of two GPT-5.6 models only three weeks after their
launch. The biggest change is Luna: its API rate fell from $1 to $0.20 per
million input tokens and from $6 to $1.20 per million output tokens—an 80%
drop. Terra fell 20%, to $2 for input and $12 for output.

That makes this a real model-choice change. It does not mean ChatGPT
subscriptions are 80% cheaper.

## Which price actually changed

AI products can have several meters. Think of a coffee business: a customer
might pay for a monthly coffee-club membership, while a café buys beans
wholesale by the kilogram. OpenAI cut something closer to the wholesale rate
for developers using Luna and Terra. It did not cut the monthly membership
price.

The analogy has a limit. An API bill also depends on how much text goes in and
comes out, reasoning, tool calls, caching, retries and context length. A lower
token rate does not guarantee the same reduction in the cost of a completed,
correct task.

OpenAI says ChatGPT and Codex subscription prices and quota budgets remain
unchanged. Terra and Luna now consume fewer credits in Codex and ChatGPT Work,
so some subscribers may get more work from the same budget. That is useful,
but it is not an 80% subscription discount.

## What else changed

- Luna's standard API rate is now $0.20 input and $1.20 output per million
  tokens.
- Terra's is $2 input and $12 output.
- Sol's standard price did not change.
- A new Sol Fast mode replaces Priority Processing, promising up to 2.5 times
  Standard speed at twice the price. Existing `priority` requests still work.
- Free and Go users can use Terra in ChatGPT Work and Codex. Plus, Pro,
  Business and Enterprise users can choose Terra or Luna there. API access
  remains available to developers.
- Prompts over 272,000 input tokens cost more for the full request, so the
  headline rate is not the whole long-context bill.

## Why it matters

The practical shift is that OpenAI's cheapest GPT-5.6 tier is now priced like
an older “nano” model while retaining the current family's tool and reasoning
features. That can make large document batches, classification and routine
agent steps economical at a scale that did not make sense last week.

OpenAI also makes much stronger performance claims, including that Luna can
beat a frontier Anthropic model on a professional-work benchmark at a tiny
fraction of the estimated cost. Those are vendor comparisons, not proof that
Luna will match a stronger model on your work.

## What changes for you

If you use the API or run repeated agent workflows, this is worth a test now.
Start Luna on a well-specified, reversible step. Compare it with your current
model on quality, retries, latency and total cost per accepted result—not only
the posted token price. Move to Terra when the task needs more judgment, and
keep a stronger model for ambiguous planning, review or errors that would be
expensive.

If you use ordinary ChatGPT chat and do not use Codex, ChatGPT Work or the API,
nothing in this announcement requires a switch. Your subscription price did
not change.

Watch next for independent real-work tests, competitor price responses and
whether cheaper token rates actually lower complete task costs after reasoning,
tools and retries.

Sources: [OpenAI's announcement](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/),
[Luna model documentation](https://developers.openai.com/api/docs/models/gpt-5.6-luna),
[Terra model documentation](https://developers.openai.com/api/docs/models/gpt-5.6-terra),
[Axios](https://www.axios.com/2026/07/30/openai-cuts-prices-gpt-terra-luna5).
