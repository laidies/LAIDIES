# Episode 01 concept-definition research

**Date checked:** 2026-07-29
**Status:** VERIFIED LOCALLY — maintained wording and propagation map
**Owner:** Learning System & Concepts
**Applies to:** Episode 01 audio/article, Concepts 101, Vocab 101, quizzes,
Study Pack cards, and relevant classes in development

## Method

Definitions begin with current standards, government guidance, original
research and provider documentation. LAiDIES wording is an adaptation for a
beginner reader, not a quotation or a competing technical definition.

The four Episode 01 cards do different jobs:

1. **Generative AI** — what kind of AI this is.
2. **Model** — one core component in a larger AI system or product.
3. **Hallucination** — one important failure mode.
4. **Participation gap** — why women using and shaping the technology matters.

Invisible load remains part of the episode's story. It is not a term women need
defined back to them and is not a concept card.

## Maintained definitions

### Generative AI

**Technical basis.** NIST defines generative AI as a class of AI models that
emulates characteristics of input data to generate derived synthetic content,
including text, images, audio and video.

**LAiDIES definition.** Generative AI is AI that produces content from a
request and the material it is given—such as text, images, audio, video or
code. It does that using patterns learned during training plus the context
available for the current task.

**Boundary.** Generation and search can be combined in one product. Do not
teach “search finds; AI writes” as a permanent product distinction. Search can
retrieve evidence; a generative model can interpret and explain it; neither
step makes the result automatically true.

**Memory line.** **It can make the draft. It cannot make it true.**

### Model

**Technical basis.** The OECD explanatory memorandum calls an AI model a core
component of an AI system used to make inferences from inputs to produce
outputs. An AI system may combine one or more models. Current providers also
expose named models through APIs, independently of their consumer chat apps.

**LAiDIES definition.** A model is the trained component of an AI system that
turns an input into an output. It may produce words or images, interpret
material, make a prediction or choose a next action. A model can be offered
through an app, API or coding tool, while the product around it may add
instructions, memory, search, files and other models.

**Boundary.** A model is not synonymous with ChatGPT, Claude, Gemini or any
other product. It is also not always “under an app,” “the part that writes,” or
“a next-word machine.” Those shortcuts fail across APIs, multimodal models,
reasoning models, tool-using systems and products that route among models.

**Memory line.** **A model is part of the experience—not the whole thing.**

**Episode 05 reuse.** Episode 05 may use its fashion-house explanation after
the plain definition. The analogy cannot replace the mechanism and must retain
its stated limit.

### Hallucination

**Technical basis.** NIST uses *confabulation* for generated content that is
erroneous or false, diverges from the input, or contradicts earlier output in
the same context; it notes that *hallucination* is the common colloquial term.

**LAiDIES definition.** A hallucination is false or unsupported content
delivered as part of an AI-generated answer. It can be one invented citation,
wrong date or made-up detail inside otherwise useful work—not only a completely
fictional response.

**Boundary.** Hallucination is not limited to a completely invented answer.
It can be one false detail, citation, claim or step inside otherwise useful
work. Creative fictional content is not a hallucination when invention is the
requested job.

**Episode example.** Every Burn Book entry used in the Episode 01 analogy was
invented. Never describe it as a mix of true and false entries.

**Memory line.** **Polished is a style. Evidence is a standard.**

### Participation gap

**Research basis.** The May 2026 version of HBS Working Paper 25-023 synthesizes
76 sources from more than 100 countries. Among 318,924 respondents in sources
reporting use rates for women and men, the estimated adoption rate was 47.8%
for men and 39.3% for women—a 22% relative gap. The paper reports that the
relative gap narrowed over time but stabilized at roughly 16% from early 2025.

**LAiDIES definition.** A participation gap appears when one group is using a
technology less often than another. Current evidence finds women use
generative AI less often on average. That measures participation, not
potential.

**Boundary.** The HBS paper is a working paper, its estimates vary by source,
place, occupation and time, and it does not establish one universal cause.
State the date and scope with the number. Do not turn an average into a claim
about every woman or man.

**Memory line.** **Women should not wait while AI is being shaped.**

## Teaching-copy rule

The technical basis above defines the truth boundary. It is not a script.
Reader-facing treatments must also explain the smallest useful mechanism,
why the distinction matters, one episode-native example and one memorable
line. Those jobs must remain visibly separate: the analogy cannot impersonate
the definition, and the warning cannot replace the mechanism.

## Claim-level source map

| Claim | Best current evidence | Published/updated | What it establishes | Limits / recheck trigger |
|---|---|---|---|---|
| Generative AI produces derived content across multiple media | NIST CSRC definition, sourced to NIST AI 100-2e2025 / SP 800-218A | NIST glossary updated 2026-05-29 | General class and output types | Recheck if NIST taxonomy changes |
| AI models are components of systems and may be combined | OECD explanatory memorandum on the updated AI-system definition | 2024; accessed 2026-07-29 | Model/system distinction | OECD notes that “model” has multiple interpretations |
| Providers offer models outside consumer chat apps | OpenAI Models docs; Anthropic Models overview; Google Gemini API Models | accessed 2026-07-29 | Models are separately named and accessed through APIs | Product/model names and access change; recheck before current examples |
| Hallucination/confabulation can be false, erroneous, divergent or internally contradictory generated content | NIST AI 600-1, section 2.2 | 2024; NIST page updated 2026-04-08 | Failure-mode definition and limits | Use *hallucination* as reader language; retain NIST's broader scope |
| A gender participation gap persists in generative-AI use | Cranney, Delecourt and Koning, HBS Working Paper 25-023, May 2026 version | 2026-05-01 | 318,924 respondents; 47.8% men vs 39.3% women; 22% relative gap; stabilized near 16% since early 2025 | Working paper; not one universal causal estimate |
| 2026 workplace support/recognition differences | LeanIn.Org, “The Real Risk with AI? Not Using It” | 2026-07; accessed 2026-07-29 | Men 23% more likely to be encouraged, 27% more likely to be praised; women 32% more likely to fear being perceived as cheating | Survey context; keep separate from HBS adoption estimate |

## Sources

- NIST, “generative artificial intelligence”:
  <https://csrc.nist.gov/glossary/term/generative_artificial_intelligence>
- NIST, *Artificial Intelligence Risk Management Framework: Generative
  Artificial Intelligence Profile*, section 2.2:
  <https://doi.org/10.6028/NIST.AI.600-1>
- OECD, explanation of the updated definition of an AI system:
  <https://oecd.ai/en/wonk/definition->
- OpenAI, Models:
  <https://developers.openai.com/api/docs/models>
- Anthropic, Models overview:
  <https://platform.claude.com/docs/en/about-claude/models/overview>
- Google, Gemini API Models:
  <https://ai.google.dev/gemini-api/docs/models>
- Cranney, Delecourt and Koning, *Global Evidence on Gender Gaps and
  Generative AI Over Time*, HBS Working Paper 25-023:
  <https://www.hbs.edu/ris/Publication%20Files/25-023_be8fb517-3dd5-40aa-97f9-4e42e1c8e6ff.pdf>
- LeanIn.Org, “The Real Risk with AI? Not Using It”:
  <https://leanin.org/articles/findings/the-real-risk-with-ai-not-using-it/>

## Existing class material worth keeping

`operations/classes/basics-what-these-tools-are.CONTENT.md` already contains
the strongest current teaching structure: product, model, tools/retrieval and
context are separated; product features are kept apart from model capability
and account entitlement; and the learner opens a source rather than trusting a
citation-shaped answer.

Reuse that structure in the Basics class. Do not reuse the older recorded
shortcuts “the model is what writes,” “it only predicts the next words,” or
“not looking anything up, not thinking it over.” They are now explicitly
superseded.
