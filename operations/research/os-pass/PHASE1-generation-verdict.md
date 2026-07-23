# Phase 1 — Generation Verdict: Can AI reliably draft LAiDIES teaching at the Ep1–3 standard?

**Date:** 2026-07-22
**Question:** Can an AI reliably draft a LAiDIES episode at the Ep1–3 standard?
**Evidence base:** 3 independent full Ep5 drafts (strategies: `skeleton`, `ep2-match`, `plain-first`), each judged on 6 dimensions against the failure-anchor rubric; plus 1 control redraft of Ep2 (`control-ep2-redraft`).

**Scope caveat (read first):** What I hold is the *judge's* verdict JSON — dimension scores, evidence quotes, and rationale. I have **NOT** independently opened the three Ep5 drafts or the control and verified that the quoted lines exist in them. The analysis below trusts the judge's scoring as delivered. That is the honest boundary of this verdict.

---

## The scoreboard

| Draft | analogy | worked-example | time-to-value | humour | takeaway-capability | plain-leads | avg | overall |
|---|---|---|---|---|---|---|---|---|
| skeleton | 4 | **5** | 4 | 4 | **5** | 4 | 4.33 | PASS |
| ep2-match | 4 | **5** | 4 | 4 | 4 | 4 | 4.17 | PASS |
| plain-first | 4 | **5** | 4 | 4 | **5** | 4 | 4.33 | PASS |
| control-ep2-redraft | 4 | **3** | 4 | 4 | **3** | 4 | 3.67 | PASS* |

*Control is marked PASS overall by the judge but carries two 3s on the two spine dimensions; see Q4.

---

## (1) Did any strategy reliably hit the bar? Which, and how close?

**All three did.** This is the headline: three *independently generated* full drafts, using three different strategies, all cleared the bar — not one lucky run. That is what "reliable" means.

The strongest signal is the **worked-example** dimension, which scored **5/5 in all three drafts**. This is the hardest, most-failed dimension — the prior failed Ep5 scored **1/5** here ("I type the exact kind of thing I'd type at home," a hypothetical with no stake). All three winners instead produced a complete §3.2 worked example: a real task with a clock, a verbatim copy-pasteable prompt, an honest number, a specific payoff detail, two-sided time arithmetic, residue that stays hers, and a named principle. Evidence, `plain-first`:

> "Here's what I typed. Steal it: 'Rename every file in this folder to the format year-month-day...'" — with honest result "about ninety-five percent right" and residue "That part... was never the AI's job. It was mine."

**How close to the ceiling?** They cleared the bar *with margin* but none is a clean 5-across. Every Ep5 draft has the identical soft spots, and they are the same two every time:

- **analogy-load-bearing = 4 (never 5) in all three.** Two reasons recur: (a) the couture/occasion analogy is a strong *within-episode* handle but is **not season-generative** the way Ep1's "new hire" seeds downstream episodes; (b) **synonym sprawl** — the same tier gets called couture / ballgown / gala / flagship / the heavy one, its opposite sundress / resort / the light one / the fast one — 2–3 terms per concept, against the locked one-term rule.
- **plain-teaching-leads = 4 (never 5) in all three**, docked for the *same* synonym proliferation.

So: reliable PASS, consistent ~4.2–4.3 average, but a consistent ceiling of 4 on the two analogy-discipline dimensions. The bar is cleared; the *lock* (one-term-per-concept) is not.

---

## (2) Is the failure in the DRAFTING or in the CONDITIONING?

**The failure is in the CONDITIONING, and it has already been substantially fixed.** The drafter can execute; what it needs is the target made explicit.

The proof is in the anchors. Every winning draft's rationale is dense with references to the *prior failed Ep5's specific defects and scores* — "the failed Ep5's 1/5 hypothetical," "the failed Ep5 died at 39.8%" (time-to-value gate), "Linda Evangelista's day rate" (the 2/5 humour failure — jokes about supermodels, not about AI), "notice how alike they are" (the 1/5 takeaway with no verb phrase). The drafters were handed: the reference episodes, the **anchor library** (each failure mode, its dimension, its score, a quote), the spec's **§3.2 eight-component checklist**, the **25% time-to-value gate**, the **§4.4 humour rule**, and the **one-term lock**. Given that conditioning, three different strategies all cleared the exact traps the unconditioned draft fell into.

The *residual* soft spots are also conditioning gaps, not capability gaps:
- **Synonym sprawl** persists because the one-term-per-concept lock was *stated* but not *enforced by the critic* — it was in the rubric as a note, not a gate.
- **Not season-generative** persists because "does this analogy seed later episodes?" was not a checked criterion.
- **A factual reliability risk surfaced:** `ep2-match`'s capability rests on the premise that the priciest model "usually sits at the top, already selected" in every app — flagged **NOT VERIFIED** and false for several real products. Unconditioned-on-facts drafting invents plausible mechanics. The critic needs a fact gate.

Conclusion: this is not a "can the model write" problem. It is a "was the model told precisely what good looks like, and is a critic enforcing it" problem — and the answer to the first half is now largely yes.

---

## (3) The draft → critique → revise LOOP that makes it reliable

Because all three cleared the bar on a *single* conditioned draft, the loop can be light. The job of the loop is not to rescue a bad draft — it is to close the two known residual gaps (analogy discipline, factual claims) and to catch the occasional dropped §3.2 component.

**Passes: 1 draft + 2 critic passes + 1 targeted revise.** Concretely:

1. **Draft (1 pass).** Fully conditioned (see conditioning pack below). Pick one strategy or generate 2 and let the critic choose the stronger — parallel generation is cheap insurance and we have evidence all strategies land.

2. **Critic pass A — dimension rubric (the judge that produced these verdicts).** Scores all 6 dimensions against the anchor library, quoting evidence. Gate: every dimension ≥ 4, worked-example ≥ 4 hard-required (it is the spine). Explicitly checks the §3.2 eight components are *all present*.

3. **Critic pass B — the two known leaks the rubric under-weights:**
   - **One-term-per-concept lock:** flag every concept carrying >1 label; require collapse to a single term. (This is the fix that turns the standing 4s on analogy/plain-leads into 5s.)
   - **Fact gate:** flag every claim about how a real product behaves ("sits at top, already selected," model names, prices, positions). Each must be verifiable or cut. This is what would have caught `ep2-match`'s NOT-VERIFIED premise.

4. **Revise (1 pass), scoped to flagged items only** — collapse synonyms, cut/verify claims, backfill any missing §3.2 component. Re-run only the flagged dimensions.

5. **Human accept/reject gate (Ali).** She reads the *winner the critic already vetted* and makes the editorial call. She is the judge, not the bug-catcher — the critic does the hunting.

**What the critic checks (summary):** the 6 dimensions vs anchors; §3.2 completeness; the 25% time-to-value gate; §4.4 (jokes' subject = the machine's failure / her work, never the analogy's set dressing); the one-term lock; and factual claims about real products.

**What conditioning the drafter needs (this is load-bearing — it is what separated the winners from the control):**
- **Reference episodes Ep1–3** as full exemplars (not summaries).
- **The anchor library inline** — the failed Ep5's defects *with dimension, score, and quote*. This, more than anything, is what worked. The drafter steers by "don't be the 1/5 hypothetical," "don't die at 39.8%."
- **The spec sections inline:** §3.2 eight-component worked-example checklist, the 25% gate, §4.4, the one-term lock.
- **A worked-example bank** — a growing file of *real, verified* AI tasks with honest numbers (the 200-file rename recurs across all three; a bank stops reinvention and stops invented product claims). Each entry: the task, the verbatim prompt, the honest result number, the residue-that-stays-hers. This is the single highest-leverage addition, because worked-example is the spine and factual invention is the top remaining risk.

---

## (4) The control: is the teaching pattern GENERATIVE or POST-HOC?

**Generative — but incompletely so on a cold, lightly-conditioned redraft.** The control is the most interesting data point.

**Generative evidence:** asked to redraft Ep2 fresh, the drafter did *not* copy the gold's café analogy — it *re-derived* an equivalent one independently ("the brand-new café that just opened across town... it has never once met you"), scored 4, judged "genuinely load-bearing and independently written." Plain-teaching-leads scored 4 and was called "if anything more plain than gold." Time-to-value 4, hook by line 21. So the drafter reconstructed the Ep2 *architecture* — analogy carrying the mechanism, plain lesson stated flat before the garnish, fast in-scene hook — without pattern-matching the surface. That is generation, not mimicry.

**Where it fell short — and this is diagnostic:** the two 3s land exactly where the move requires *committing to a concrete artifact*:
- **worked-example = 3:** it diagnoses the bad ask well (Monday's good update vs Tuesday's word salad) but "stops before the crown-jewel worked example... never a full good prompt with a payoff." It shows the *before/after contrast* but not the *runnable good prompt*.
- **takeaway-capability = 3:** "Climax is a principle she now understands, not a move she can execute" — "AI can't read your mind" is a realization, not a do-this. Gold turns it into a runnable brief-it-like-a-new-hire checklist.

**Honest confound:** the judge notes both shortfalls "sit past the first third," and the control was scoped to the first third. So the control did not *fail* these — it was partly not asked to reach them.

**Reading:** the pattern is genuinely generative for the *analogy + plain-lead + fast-hook* architecture — the drafter produces those from understanding, cold. But the *worked-example* and the *executable takeaway* are **not reliably generated without the §3.2 checklist and a capability-forcing instruction.** That is precisely the conditioning the three Ep5 winners had and the control lacked — and precisely why the winners scored 5/4-5 on those two dimensions while the control scored 3/3. The delta between control and winners *is* the value of the conditioning pack.

---

## (5) Bottom line for Phase 2

**Rely on AI first-drafts — with the guardrails below. Human-drafted-then-AI-assisted is not required, and the evidence says so.**

The case for AI first-drafts: three independent, differently-strategized drafts all cleared the bar, and the hardest, most-failed dimension (worked-example) hit 5/5 in every one. That is not a fluke; it is reproducibility. A human-drafts-first model would throw away a capability we have demonstrated works.

But the guardrails are **load-bearing, not optional** — the control proves the failure mode of *under-conditioned* drafting (worked-example and executable-takeaway slip to 3, and factual claims get invented). So Phase 2's operating system must supply:

1. **The conditioning pack, every draft:** Ep1–3 exemplars + the anchor library (defects with scores + quotes) + §3.2 checklist + 25% gate + §4.4 + one-term lock, all inline.
2. **A worked-example bank** of verified real tasks with honest numbers — the highest-leverage single asset, because it feeds the spine dimension and starves the invention risk.
3. **A two-pass critic:** dimension rubric (≥4 all, worked-example the hard gate) + the leak-catcher pass (one-term lock enforcement + fact gate on product claims).
4. **A targeted revise pass** on flagged items only.
5. **Ali as the accept/reject judge** on a pre-vetted winner — she reads the best candidate, she does not hunt bugs. The critic hunts.

**One honest reservation:** every draft here is on the *same* episode topic (model-picking / match-the-tool-to-the-job), which happens to have a clean binary structure and an easy, verifiable worked example (file rename). Reliability is demonstrated *across strategies*, not yet *across topics*. Before trusting the loop unattended, run it on 2–3 structurally different episodes (a subtle/non-binary lesson, one with no obvious single worked example). Until then: AI-first-draft with the full guardrail stack, human final gate — confident, but with the next test named.

**Verdict: AI first-drafts are viable for LAiDIES teaching at the Ep1–3 standard, conditional on the conditioning pack + two-pass critic + human accept gate. Not human-first. The conditioning is the product.**
