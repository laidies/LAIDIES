# AIDB reference-tracing contract

**Status:** ACTIVE — applies to every new AIDB edition

## Why this exists

AIDB is valuable partly because it gathers practitioner observations from
across the AI field. Its machine-readable records may name those people while
leaving a nugget's `sources` array empty. The name is a discovery lead, not a
complete citation.

## Required chain

For each material tip or consequential claim, preserve:

1. AIDB edition, idea ID, timestamp, and exact attribution;
2. exact original post, paper, talk, repository, guide, or experiment;
3. current provider documentation or other primary authority;
4. the difference between the original claim and AIDB's interpretation;
5. a bounded LAiDIES test when the advice may alter operations or become a
   practical lesson.

If step 2 cannot be resolved, mark it `UNRESOLVED`. Do not replace it with a
different source that merely makes a similar claim.

## Source tiers

- **Authority:** current OpenAI, Anthropic, Google, government, standards body,
  original research, or applicable product documentation.
- **Original practitioner evidence:** the exact first-hand observation,
  workflow, example, or experiment AIDB cites.
- **Scout synthesis:** AIDB, Mollick, and other trustworthy explainers that
  discover, compare, or interpret.
- **LAiDIES evidence:** a dated test using a representative task and explicit
  success criteria.

All four are useful; they do different jobs.

## Model-tip record

Every candidate records provider, exact model/family, product surface
(consumer chat, API, coding agent, or other), plan/region where relevant,
release and evidence dates, prior-model comparison, task type, prompt or
interaction technique, settings/tools, observed benefit, trade-off, failure
mode, official cross-check, LAiDIES test status, and retest trigger.

Never publish “best way to use the model” when the evidence supports only one
task or surface. Use “worked for this task under these conditions.”

## Standing official roots

- OpenAI model guidance:
  `https://developers.openai.com/api/docs/guides/latest-model`
- Anthropic model overview:
  `https://platform.claude.com/docs/en/about-claude/models/overview`
- Anthropic prompting best practices:
  `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices`
- Google Gemini models:
  `https://ai.google.dev/gemini-api/docs/models`
- Google Gemini prompt design:
  `https://ai.google.dev/gemini-api/docs/prompting-strategies`

These are starting points, not proof that every tip applies. Record each
page's update/access date and the exact model section used during the run.

## Promotion to standing scout

An adjacent expert/source becomes a recurring monitored source only when it
has repeated relevance, links reliably to original evidence, adds a distinct
signal not already covered by AIDB or Mollick, and has a stable official feed
or endpoint. Otherwise keep it as an edition-specific reference.
