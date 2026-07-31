# GPT-5.6 price cuts — research and claim map

**Checked:** 2026-07-31, America/Vancouver  
**Story identity:** OpenAI's July 30 GPT-5.6 pricing and processing change

## Source hierarchy

1. OpenAI's complete July 30 announcement — operative price, access, credit
   and Fast-mode claims.
2. Current official Luna and Terra model documentation — live API rates,
   context/output limits, long-context surcharge, tool support and rate limits.
3. Axios — independent confirmation and market context.
4. AIDB's July 8 complete analysis — earlier analytical context on efficiency
   as the emerging model battleground; it does not verify the July 30 prices.

## Confirmed claims

| ID | Claim | Evidence | Boundary |
|---|---|---|---|
| GPT56-PRICE-01 | Starting July 30, Luna API pricing is $0.20 input and $1.20 output per million tokens. | OpenAI announcement; live Luna docs | Standard token rates; tool calls and long-context surcharges can add cost. |
| GPT56-PRICE-02 | Luna's prior launch pricing was $1 input and $6 output, making the new rates an 80% reduction. | OpenAI July 9 launch; July 30 announcement; Axios | Percentage applies to both Luna input and output API rates. |
| GPT56-PRICE-03 | Terra API pricing is now $2 input and $12 output, down from $2.50 and $15: a 20% reduction. | OpenAI launch and July 30 announcement; live Terra docs; Axios | Standard token rates. |
| GPT56-PRICE-04 | Sol's standard API price is unchanged. | OpenAI announcement; Axios | Fast mode is a separate premium processing option. |
| GPT56-PRICE-05 | ChatGPT and Codex subscription prices and quota budgets are unchanged; Terra and Luna now consume fewer credits. | OpenAI announcement | Fewer credits per use may extend a budget but is not a subscription-price cut. |
| GPT56-PRICE-06 | Fast mode replaces Priority Processing for Sol, promises up to 2.5x Standard speed at twice the price, and accepts existing `priority` tags. | OpenAI announcement | Vendor speed claim; real workloads still need latency tests. |
| GPT56-PRICE-07 | Luna and Terra remain in ChatGPT Work, Codex and the API; Free/Go users get Terra, while Plus, Pro, Business and Enterprise users can choose Terra and Luna. | OpenAI announcement | Go is a paid plan but does not receive Luna choice; ordinary ChatGPT chat defaults and plan prices did not change. |
| GPT56-PRICE-08 | Luna and Terra keep 1.05M context windows and 128K max output; prompts over 272K input tokens cost 2x input and 1.5x output for the full request. | Live official model docs | Long-context economics can differ sharply from headline rates. |

## Vendor claims that remain unproven for a reader's work

- Luna is comparable to models that were frontier-class a year ago.
- Luna beats Fable 5 on a vendor-selected professional-work benchmark at
  nearly 99% lower estimated cost per task.
- Sol Fast mode delivers up to 2.5 times Standard speed.
- Customer testimonials establish broad quality or savings outside those
  customers' own workloads.

These claims may motivate a test; they do not justify an automatic switch.

## What the evidence shows

- OpenAI made a large, immediate price change to two current GPT-5.6 tiers.
- High-volume API workloads and credit-metered Codex/Work usage may become
  materially cheaper.
- Model choice should be made per workflow step rather than by flagship rank.

## What it does not show

- ChatGPT subscriptions became cheaper.
- Luna or Terra is equally reliable for every task or risk level.
- An API bill will fall by exactly 80%; output length, retries, reasoning,
  tools, caching and long-context surcharges still matter.
- OpenAI's vendor benchmarks prove lower total cost on a reader's workflow.

## Publication-day rechecks

Reopen the announcement and both model pages immediately before any canonical
write. Recheck prices, plan access, credit language, Fast-mode terms, the
272K-input surcharge, AWS rollout status and any default/fallback change. A
material change restarts Stage 1 for a new compound identity.
