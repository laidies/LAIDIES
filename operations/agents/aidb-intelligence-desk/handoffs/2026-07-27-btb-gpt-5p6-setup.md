# Behind the Build handoff — we upgraded the model, not the instructions

**Status:** DIAGNOSED FIELD NOTES CANDIDATE — controlled replay required before
publication  
**Source trigger:** Ali's 2026-07-27 observation about the AIDB 2026-07-20
episode  
**Receiving owner:** Field Notes from LAiDIES HQ / Behind the Build editor  
**Publication authority:** none; this is a private evidence and editorial
handoff

## The practical example

LAiDIES moved to GPT-5.6 Sol expecting stronger output, but initially treated
“the best model at the highest reasoning setting” as a complete system design.
The inherited setup also carried operating instructions written around earlier
model behaviour.

The July 20 edition of *The AI Daily Brief* made the mismatch legible:

- a more tenacious model needs clear finish lines and meaningful boundaries;
- repeated instructions and old scaffolding can make results worse while using
  more tokens;
- the model tier and reasoning effort should fit the job;
- a migration should preserve a baseline, then test one effort level lower;
  and
- broad brevity and tone labels can backfire when they do not specify which
  information or writing behaviour matters.

This is a useful LAiDIES story because it is not “we wrote one bad prompt.”
The setup itself encoded an old theory of how to get the best work from AI.

## What the evidence establishes

| Claim | Evidence | Status |
|---|---|---|
| The original LAiDIES configuration globally pinned Sol at Extra High and allowed supporting agents to inherit the premium setting. | `operations/painpoints-log.md`, BTB-049, based on the then-current global configuration and Codex inheritance rules. | VERIFIED mechanism; savings unmeasured |
| GPT-5.6 should be assigned by workload rather than used as one universal tier. | [Official GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/model-guidance?model=gpt-5.6), checked 2026-07-27. | VERIFIED current guidance |
| A 5.5/5.4 migration should start at the existing effort and compare the same setting with one lower on representative work. | Official GPT-5.6 model guidance, checked 2026-07-27. | VERIFIED current guidance |
| Repeated prompt instructions can reduce quality and increase token/cost use. | Official GPT-5.6 prompting best practices report directional internal coding-agent results and explicitly require workload-specific validation. | VERIFIED as OpenAI guidance; LAiDIES effect unmeasured |
| GPT-5.6 can infer more intent, so prompts can prescribe fewer process steps while retaining domain context, hard constraints, approval boundaries, success criteria, and ambiguity rules. | Official GPT-5.6 model guidance, checked 2026-07-27. | VERIFIED current guidance |
| These setup choices caused the specific LAiDIES outputs Ali disliked. | Temporal and mechanism match, but no controlled replay yet isolates the contribution of reasoning level, repetition, task brief, context, or review loop. | LIKELY CONTRIBUTOR — NOT YET VERIFIED |

The 10–15% quality lift and 41–66% token reduction in OpenAI's documentation
are directional results from internal coding-agent evals. They are not
LAiDIES results and must never be presented as our measured improvement.

## The stronger diagnosis

**Observation:** The most expensive configuration did not reliably produce the
output Ali wanted.

**Supported mechanism:** We collapsed model choice, reasoning effort, prompt
architecture, task boundaries, success criteria, and evaluation into one idea:
“use the strongest setting.” Current official guidance treats those as
separate design decisions.

**Causal boundary:** We have not yet proved that prompt repetition or reasoning
effort was the dominant cause of a named failed output. Other contributors may
include incomplete briefs, stale source context, conflicting product rules,
wrong task decomposition, missing visual references, or weak final evaluation.

## The internal correction already made

- Project baseline is now Sol/Medium for normal foreground work.
- Planning rises to High when justified.
- Bounded supporting work defaults to Terra/Medium and may use Low.
- Fast mode remains off.
- Extra High, Max, and Ultra require a bounded reason rather than becoming the
  ambient project setting.
- The desk now checks current official product guidance before recommending a
  configuration or prompting change.

The routing correction is real. The prompt-diet and one-level-lower comparison
remain unmeasured work.

## Publication gate — controlled replay

Select three representative LAiDIES tasks whose earlier output required
material correction. Freeze the same source material, task goal, success
criteria, and judge.

For each task compare:

1. the preserved incumbent prompt/configuration;
2. the same Sol/Medium route with one repeated instruction cluster removed;
3. the accepted lean prompt at one lower effort—or Terra for a clearly
   mechanical lane.

Measure:

- completion against the original brief;
- missing required evidence;
- unnecessary work and scope drift;
- approval stalls;
- number and severity of Ali corrections;
- tokens/credits and elapsed time; and
- whether the final artifact passes its real acceptance gate.

Remove one instruction group at a time. A wholesale rewrite would prevent the
test from identifying what helped.

## Field Notes direction

### Working title

**We Upgraded the Model. We Forgot to Upgrade the Instructions.**

### Reader promise

Buying more intelligence and turning every dial up does not design a good AI
workflow. Learn the five separate choices to revisit when a new model arrives.

### Story spine

1. **The job:** get better, more faithful LAiDIES production from GPT-5.6.
2. **The first approach:** strongest model, very high reasoning, inherited
   instruction stack.
3. **The result:** more capability and spend, but still too much correction,
   drift, or work that did not match the intended finish line.
4. **The diagnosis:** the model changed; our operating assumptions did not.
5. **The better approach:** route by task, preserve a baseline, test one level
   lower, state each rule once, and keep the boundaries and success criteria
   that actually protect the result.
6. **Why it works:** model, effort, context, constraints, and evaluation solve
   different problems.
7. **Try this:** choose one recurring task, remove one duplicated instruction
   group, rerun it at the current effort and one lower, and judge the result
   against the same finish line.
8. **Receipts:** July 20 AIDB edition, current official OpenAI guidance,
   BTB-049 configuration evidence, and the controlled replay.

### Possible LAiDIES line

> We bought the new couture and kept every alteration from the old dress.
> Then we blamed the fabric when it did not fit.

The analogy is memorable, but the public piece must still explain the
mechanism directly.

## Privacy and reputation

- Do not expose private prompts, account limits, credit balances, or
  unpublished project content.
- Use a genericized before/after prompt unless the exact original is cleared.
- Describe the setup as a system-design mistake, not a failure by Ali to know a
  newly changing product.
- Attribute AIDB as the discovery/interpretation source and OpenAI as the
  current product-guidance authority.
