# Stage 2 receipt — AI Research & Accuracy — GPT-5.6 price cuts

**Status:** COMPLETE — private compound-identity validation receipt; no
publication, deployment, canonical-data edit or later-stage approval is
implied.

**Stage owner:** independent AI Research & Accuracy judge  
**Reviewed:** 2026-07-31, America/Vancouver  
**Stage 2 outcome:** **HOLD — MATERIAL ACCESS-PLAN IMPLICATION**

## Exact compound packet reviewed

| Artifact | SHA-256 |
|---|---|
| `candidate.json` | `76d28d358cb60b191acbb806333fc53291d364f52623a97f77d0c2e2c1fd1843` |
| `breaking-news-draft.md` | `3e7d8dac5844b440b6bd6a47d2e5c916261c811223568ef029f791b745b172bc` |
| `research-and-claim-map.md` | `6d081810dd5c28a1f0cedd1aeca162b93f21adc8f8f441c0785074d443e37f09` |
| `article-render.html` | `d532f79222eb444da76f16d1d40b196020aa097b8234b574d1e5c3852be76761` |
| `article-render-desktop.png` | `857926c7e68c6ef345e4604d15c859e4531542e863515aa6537c5dbe72d4058c` |
| `article-render-mobile.png` | `aa7a540a57b45ff286f54bddabe3690dbf32941e7716df7c31ff3e5ac492a8d0` |

These six hashes are one review identity. A change to any member invalidates
this receipt and restarts the chain at Stage 1.

## Sources reopened on the review date

1. [OpenAI, “Advancing the price-performance frontier with GPT-5.6”](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/) — July 30 announcement. It is the operative authority for the new prices, reduced credit consumption, unchanged subscription prices/quota budgets, access grouping, Fast mode, compatibility of `priority`, and AWS rollout statement.
2. [OpenAI, “GPT-5.6: Frontier intelligence that scales with your ambition”](https://openai.com/index/gpt-5-6/) — July 9 launch record. It establishes the predecessor Luna $1/$6 and Terra $2.50/$15 API rates and names the exact ChatGPT Work/Codex plan groups.
3. [OpenAI GPT-5.6 Luna model page](https://developers.openai.com/api/docs/models/gpt-5.6-luna) and [Terra model page](https://developers.openai.com/api/docs/models/gpt-5.6-terra) — live standard input/output rates, 1,050,000-token context window, 128,000 maximum output, tool support, cache-write pricing and the >272K-input full-request surcharge (2× input and 1.5× output).
4. [Axios, “OpenAI cuts GPT-5.6 prices”](https://www.axios.com/2026/07/30/openai-cuts-prices-gpt-terra-luna5) — independent reporting corroborates the timing, Luna and Terra new rates and no Sol cut. Its wider competitive framing is reporting/context, not proof of a reader result.

No reopened source announces a later material revision to the price, credit,
Fast-mode, context-surcharge or AWS-rollout language represented in this
compound. The official announcement says AWS changes **will begin rolling out
later that day**; the packet correctly treats actual AWS completion as open
evidence rather than claiming it has completed.

## Claim and implication audit

| Load-bearing claim or boundary | Ruling |
|---|---|
| Luna $1/$6 to $0.20/$1.20 per million input/output tokens; 80% reduction | **SUPPORTED.** Each new rate is one fifth of its predecessor: `(1 - .20/1) × 100 = 80%` and `(1 - 1.20/6) × 100 = 80%`. This is a standard API token-rate statement, not a completed-task-cost promise. |
| Terra $2.50/$15 to $2/$12; 20% reduction | **SUPPORTED.** `(1 - 2/2.50) × 100 = 20%` and `(1 - 12/15) × 100 = 20%`. |
| Sol standard API price unchanged | **SUPPORTED.** The announcement and Axios agree; Fast is a distinct premium processing option. |
| Subscription price/quota versus API price versus credits | **SUPPORTED AND WELL SEPARATED.** OpenAI says ChatGPT and Codex subscription prices and quota budgets remain unchanged while Terra/Luna consume fewer credits in ChatGPT Work and Codex. The draft's no-80%-subscription-discount conclusion follows. It also properly warns that tools, reasoning, cache writes/reads, retries, output volume and the long-context surcharge mean an API task bill is not mechanically 80% lower. |
| Fast mode / `priority` compatibility | **SUPPORTED WITH VENDOR BOUNDARY.** Sol Fast replaces Priority Processing, says up to 2.5× Standard speed at twice the price, and maps existing `priority` requests to Fast. The draft correctly calls the speed promise a vendor claim and recommends workload latency tests. |
| Long-context detail | **SUPPORTED.** The live Luna and Terra pages specify 1.05M context, 128K maximum output and the >272K input threshold: 2× input and 1.5× output for the whole request. The draft’s plainer “cost more for the full request” is accurate. |
| Tools and model-routing guidance | **SUPPORTED AS LIMITED GUIDANCE.** The model pages show relevant tool support; OpenAI’s examples support the described workflow categories. The reader rule is explicitly a reversible, evaluated test, not a performance guarantee. |
| Vendor comparison / independent boundary | **SUPPORTED AND PROPERLY BOUNDED.** OpenAI’s “frontier-class,” Agents’ Last Exam/Fable 5, customer-testimonial and Fast-speed assertions remain vendor claims. Axios corroborates the price news but does not independently validate quality, speed or a reader’s total cost. The compound does not convert them into such proof. |
| AWS/platform timing | **NO FALSE CLAIM.** The candidate says API access remains available to developers and leaves AWS completion as a recheck. It does not claim that AWS price propagation is complete or that third-party platforms have passed through the change. |

## Material blocker: overlapping plan categories

The exact draft’s “Free and Go users can use Terra … **Paid plans can choose
Terra or Luna**” and claim-map GPT56-PRICE-07 use a broad category that
includes **Go**. But OpenAI’s named access boundary is narrower: **Free and Go
access Terra**; **Plus, Pro, Business and Enterprise can choose Terra and
Luna**. Go is a paid subscription and therefore makes the compound’s “paid
plans” wording imply Luna access that the cited announcement does not grant.

This is material product/access guidance, not a copy-only quibble. It appears
in the bound draft and claim map (even though the abbreviated HTML render
omits the plan list). The current packet cannot receive Stage 2 PASS.

## Exact next trigger

**Next owner:** NewsStand edition/template editor and packet maker.

**Trigger:** Replace the overlapping plan shorthand everywhere it appears with
the named official boundary — “Free and Go: Terra; Plus, Pro, Business and
Enterprise: Terra or Luna” — or remove plan-specific access entirely. Regenerate
the claim map and affected render evidence, bind a new six-artifact compound,
and rerun **Stage 1**. Stage 3 is not required by this price/access story; only
after a repaired compound receives Stage 2 PASS may it proceed to **Stage 4 —
Learning System & Concepts**. No Stage 3, Stage 4, Stage 5, Stage 6 or Stage 7
work is authorized for this held identity.

## Learning scan

A qualifying reusable access-taxonomy failure was recorded in
`operations/painpoints-log.md` as BTB-289. No candidate packet, source record,
public data or public artifact was edited by this review.
