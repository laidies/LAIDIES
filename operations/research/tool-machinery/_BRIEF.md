# Tool-machinery research — shared brief (all five tools)

**Owner:** the SUNNYVAiLE High classes window. **Started 2026-07-22.**
Scope source: `Website-homepage/operations/research/tool-machinery-scope.md`

## What this research is for
Two things, and it must serve both:
1. **SUNNYVAiLE High classes** — short video lessons showing how to actually operate the thing.
2. **The per-tool reference books** in the LIBRAiRY.

The reader: a busy woman, no computer-science background, learns by analogy and image. She has
been handed these interfaces with no map. She is not a developer.

## Non-negotiable rules
- **Every factual claim needs a source URL and a date.** No exceptions.
- **Vendor-primary sources only** for how a feature works: the vendor's own help centre,
  documentation, or release notes. Press coverage is acceptable ONLY for dating a launch, and
  must be labelled as such.
- **If the vendor does not document it, write `NOT VERIFIED`.** "Not verified" beats plausible.
  Never infer a limit, a retention period, or a tier from memory or from another product.
- **Label the claim type**: `documented` (vendor says it) · `observed` (you saw it in the UI) ·
  `inferred` (reasoning — must say so).
- **Date everything.** Note the page's own "last updated" date if it has one, plus the date you
  checked it. Features move fast; anything undated is worthless to us.
- **Free vs paid.** For every feature, say which tier it requires. Flag the features that are
  the strongest argument for paying.
- **"AI" is always both capitals.** Never "Ai", never "ai".
- **Never personify the AI.** It is "it", never "she"/"he". It does not "think", "want",
  "understand" or "remember" in the human sense — say what it mechanically does.
- **No hype.** No "revolutionary", "game-changing", "unlock". Plain declarative sentences.
- Western majors only. Do not mention Grok/xAI or Chinese models.

## Deliverable — one file per tool
Write to `Website-homepage/operations/research/tool-machinery/<tool>.md`.

Front-matter block first:

```
tool:
vendor:
tiers_as_of_<DATE>:   # the plan names and prices you actually verified, with the pricing URL
checked_utc:
```

Then **one section per topic below**, in this order. Skip nothing — if a tool has no version of
a topic, say so explicitly and cite where you looked.

1. **Memory / personalisation**
2. **Custom instructions / profile**
3. **Projects / Spaces / Gems / GPTs** (the vendor's own word for a container)
4. **File upload & knowledge**
5. **Connectors / integrations**
6. **Extensions / plug-ins / skills / MCP**
7. **Automations / scheduled tasks**
8. **Modes people miss** (voice, canvas/artifacts, code execution, web search, agent modes)

### Every section uses exactly this shape
- **Vendor's name for it:** (their exact term — we always use the vendor's word)
- **What it IS:** ONE plain sentence, no jargon, understandable by someone who has never
  written code.
- **How to set it up:** the concrete click path, as you would narrate it over a screen
  recording. Menu names in order. If the path differs on web vs desktop vs mobile, say so.
- **What it's genuinely for:** the real use, not the marketing use.
- **The ONE mistake people make:** the single most common, most costly misunderstanding.
- **Tier:** free / paid (name the plan) / enterprise-only.
- **What it does NOT do:** the limit people assume away — retention, scope, access.
- **Sources:** URL · page's own last-updated date if shown · date you checked.
- **Volatility:** HIGH / MEDIUM / LOW — how likely is this to be wrong in six months? This
  decides how we film it.

## Two extra sections at the end of every file
- **`## Screen-recordable moments`** — the 3-6 specific things in this tool that a reader must
  SEE to understand, and cannot get from a paragraph. This directly feeds the class list.
- **`## Traps and corrections`** — anything you found that is widely believed and wrong, or that
  changed recently enough that older guides are now stale. Cite both the stale claim and the
  current source.

## What NOT to do
- Do not write teaching prose or lesson scripts. This is a research file — findings only.
- Do not compare the tools against each other. One file, one tool.
- Do not pad. A short file where every line is sourced beats a long one that is half memory.
