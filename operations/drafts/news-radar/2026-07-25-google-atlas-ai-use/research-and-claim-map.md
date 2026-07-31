# AI-use studies — research and claim map

**Status:** PRIVATE

## What was examined

Google's 100-page ATLAS v1.0 report studies 14,653,926 de-identified
interactions sampled from the Gemini App, Google AI Mode and free Gemini API
usage between April 6 and April 19, 2026. Google used automated redaction,
summarization, clustering and classification to map those interactions to work,
occupation, task and non-work taxonomies.

## Confirmed findings, with boundaries

- Google reports AI use across many occupations but says a typical occupation
  shows use in about 21% of its tasks.
- It classifies less than 10% of work interactions as full task automation;
  collaboration, information retrieval, learning and ideation are more common.
- More than 86% of sampled interactions occurred outside work.

These are observations about sampled Gemini interactions—not all workers, all
AI products, productivity, job replacement or economic value.

## Method strengths

- Behavioural logs rather than self-reported survey recall.
- Large, multinational and multilingual sample.
- Full methodology, privacy pipeline and limitations are published.
- Google reports validation at multiple taxonomy levels and emphasizes broader
  categories where performance is stronger.

## Material limitations

- Paid Gemini API/enterprise use and several major Google products are excluded
  from the granular analysis.
- The sample covers two weeks and only people already using included Google
  products.
- A conversation does not prove a task was completed, time was saved or value
  was created.
- Google's models classify Google's data. The most granular synthetic-data
  accuracy is low: 22.58% for exact O*NET tasks, compared with about 71.57% for
  broad occupation groups.
- Validation uses Gemini-generated synthetic prompts; Google itself notes these
  may contain cues that make Gemini classification artificially easier.

## Shows / does not show

The study supports a picture of current conversational AI as mostly a helper
inside parts of tasks. It does not establish that AI cannot automate more, that
jobs are safe, or that Gemini use improves productivity.

## Source hierarchy

1. [Google ATLAS report](https://ai.google/static/documents/GoogleATLASv1.pdf)
   — primary research, interested party, complete report reviewed.
2. [Google overview](https://blog.google/innovation-and-ai/technology/research/understanding-the-ai-economy/)
   — primary summary, interested party.
3. [OpenAI Work at the Frontier full report](https://cdn.openai.com/pdf/work-at-the-frontier-report.pdf)
   — primary research, interested party, complete 16-page report reviewed.
4. [OpenAI overview](https://openai.com/index/how-ai-is-expanding-what-people-do-at-work/)
   — primary summary, interested party.

## July 27 development: OpenAI task crossover

OpenAI analyzed more than 800,000 work-related messages from the individual
ChatGPT accounts of U.S. users whose self-reported role information came from
ChatGPT Business. It reports that 16.8% of all work-related messages—and 43.5%
of non-generic, occupation-specific messages—concern tasks historically
associated with another occupation.

The strongest LAiDIES reading is not that AI is doing whole jobs. It is that AI
may change where a task sits: a marketer troubleshoots a website; a salesperson
explores a dataset; a small-business worker attempts work that once required a
handoff.

### OpenAI limitations

- The sample covers eight occupations and is not representative of the U.S.
  workforce.
- The unit is a message, not an hour, completed project, accepted output,
  productivity gain or job.
- OpenAI does not observe whether the result was used, was good, saved time or
  received specialist review.
- Occupation and task boundaries are model-classified against O*NET and include
  semantic thresholds plus some manual category adjustments.
- The study is descriptive and cannot show how work would have been allocated
  without AI.

## Combined shows / does not show

Together, Google ATLAS and OpenAI Work at the Frontier support a durable mental
model: AI is often entering parts of tasks and moving some tasks across role
boundaries before job titles change. They do not estimate employment effects,
prove productivity, show that outputs were used, or establish that specialist
judgment is no longer needed.

## Promotion and publication-day triggers

Seek an independent labour economist or methods specialist review; compare
sampling and classification assumptions rather than combining percentages;
look for reproducible data, code, errata or external replication; recheck both
report versions and public claims before publication.
