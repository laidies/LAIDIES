# AI Fundamentals 101: full-book curriculum and textbook research

**Status:** RESEARCH SYNTHESIS / REPLACES CHAPTER-1-ONLY REDRAFTING / NOT PROSE
**Date:** 2026-08-10
**Owner:** Learning System & Concepts Director
**Public authority:** none; no chapter, visual, class, article or book is admitted

## Why this research restarted

The current Introduction and Chapter 1 candidate contains some useful passages,
but its learning architecture failed. It treats several unlike classification
dimensions as a route through one chapter, introduces technical vocabulary
before its prerequisites, repeats concepts that later chapters must teach
properly and asks the reader to reconstruct the relationship among labels.

Improving Chapter 1 alone would preserve that root problem. The whole book must
first establish a complete concept inventory and prerequisite order. Chapter 1
can then orient the reader without pretending to finish mechanisms that belong
later.

## Research question

How do strong textbooks, open courses and trusted institutional explainers
teach the breadth of AI to people without a technical background, and what
should LAiDIES borrow, reject or add so a reader can understand the complete AI
ecosystem in LAiDIES voice?

The research separates four jobs:

1. **factual and technical authority**: what the concepts mean and how they
   relate;
2. **curriculum completeness**: which durable parts of AI cannot be omitted;
3. **beginner progression**: what must be taught before what; and
4. **textbook pedagogy**: how the reader sees, applies, retrieves and checks the
   model rather than merely reading definitions.

## Sources inspected and what each contributes

| Source | Useful teaching or curriculum pattern | Boundary for LAiDIES |
| --- | --- | --- |
| University of Helsinki, *Elements of AI* | Begins with what AI is, related fields and philosophy, then builds search/problem solving, probability, machine learning, neural networks and implications. Uses ordinary cases, notes, examples, exercises and chapter outcomes. | Its sequence predates the current consumer generative/agentic wave and does not supply the complete product, hardware or governance map LAiDIES promises. |
| MIT OpenCourseWare, *AI 101* | For people with little or no background, combines a compact concept explanation with an activity in which learners train an algorithm, followed by takeaways and questions. | It is a workshop, not a complete durable textbook. |
| MIT RAISE, DAILy | Connects technical concepts to AI already shaping everyday life, real examples, harm and critical thinking. The wider curriculum distinguishes perception, training, applications and social effects. | Designed for school settings; its activities and language require adult adaptation. |
| AI4K12 / AAAI and CSTA, *Five Big Ideas in AI* | Preserves breadth that modern GenAI-only explainers lose: perception; representation and reasoning; learning; natural interaction; societal impact. | A useful completeness lens, not the chapter order for an adult book; its 2021 wording needs current qualification. |
| Cambridge Accelerate Science, *AI Core Concepts* | Separates core concepts from the practical AI lifecycle. Covers what AI is; supervised, unsupervised and reinforcement learning; generative AI; limitations; language and vision; then data, training and evaluation. Assumes no specific maths or programming knowledge. | Researcher cases are not automatically everyday cases, and multimodal systems, product layers, agents and hardware need a fuller route. |
| *Artificial Intelligence: A Modern Approach* | Demonstrates the real breadth of the field beyond machine learning: agents, search, knowledge and reasoning, uncertainty, learning, communication, perception, robotics and societal questions. | It assumes computer-science foundations and cannot supply the reader-facing sequence or language. It is a completeness challenge only. |
| OECD AI-system definition and classification framework | Shows why no single list of “AI types” is sufficient. It distinguishes context; data and input; model; and task and output, with multiple task families rather than only predictive/generative. | Policy taxonomy is not beginner prose and should not become a six-axis worksheet the reader must decode. |
| NIST Generative AI Profile and glossary | Supports precise generative-AI, risk, lifecycle and evaluation boundaries. | Formal definitions support factual review; they are not acceptable first explanations for a zero-prerequisite reader. |
| Anthropic, *Building effective agents* | Separates fixed workflows from systems in which a model dynamically directs process and tool use. It makes agentic operation a system arrangement, not a claim that the model “keeps going.” | One provider's terminology is not universal. The book must identify the common mechanism and disclose terminology variation. |
| UNESCO AI competency frameworks | Treats AI literacy as foundations and application plus human agency, accountability, ethics and citizenship. Uses progression from understanding to application and creation. | The book is not a national competency framework; the value is the requirement that technical literacy and participation remain connected. |
| DeepLearning.AI, *AI for Everyone* | Moves from what AI can and cannot do to projects, organisations and society. It is practical and designed for nontechnical people. | Business adoption is only one learner context and the course does not provide the full technical ecosystem promised here. |
| OpenStax textbook architecture | Carefully orders prerequisites, relates each new idea to previous ideas, introduces terms in narrative context, supports each objective with worked examples, follows examples with immediate `Try It`, and ends with key terms, key concepts and review exercises. | The visible headings and boxes can inform structure; LAiDIES must retain its own voice and avoid schoolbook bureaucracy. |
| Carnegie Mellon Open Learning Initiative | Uses concise exposition, worked examples, scaffolded activity, immediate detailed feedback, less-guided practice and formative assessment tied to a knowledge model. | Its current AI course is for educators. Borrow the learning loop, not its subject route or product. |
| US Institute of Education Sciences, *Organizing Instruction and Study to Improve Student Learning* | Recommends active retrieval, deep explanatory questions, worked examples alternating with problem solving, abstract-to-concrete connections and later review. It also treats a quiz as a way to discover what needs more learning, not only to assign a score. | The practice guide supplies learning principles, not LAiDIES language, product mechanics or a complete adult AI curriculum. |
| Retrieval-practice and transfer research | Supports recalling rather than merely rereading, feedback after an attempt and application/inference questions that require the idea in a different context. | A multiple-choice result alone is weak evidence of transfer; book checks must not overclaim mastery. |
| Educational gamification reviews | Find that gameful elements can support engagement and learning, but effects vary and can decline over time. Useful rewards recognise progress, feedback and goals; points or competition without additional learning value can produce anxiety, jealousy or point-chasing. | Rewards are subordinate to learning. They may not pay for page views, punish early mistakes, rank private ability or imply that a reward grant proves comprehension. |
| CAST UDL and multimedia-learning research | Connect new knowledge to prior knowledge; highlight relationships; segment difficult material; preteach the names and characteristics needed to understand a visual; remove irrelevant visual load. | This does not justify more boxes or diagrams. Every cue and visual must reduce mental work. |
| Wharton GAIL and Studio pedagogy | Treats experimentation, critique, revision and judgment as enduring skills; uses narrative, simulations and practice rather than answer delivery alone. | Current model and workplace claims remain dated evidence, not evergreen concept truth. |
| Stanford HAI history material and Computer History Museum | Show that rule systems, prediction, neural networks, robotics and agents have long histories; today's product waves and labels are newer than many underlying ideas. | A timeline must separate invention, practical breakthrough and popular label. It must not imply a clean march toward AGI. |

### Exact research sources

Checked 2026-08-10. These sources establish curriculum patterns or factual
boundaries; none is permission to copy institutional language into reader
prose.

- University of Helsinki, *Elements of AI*:
  <https://course.elementsofai.com/>
- MIT OpenCourseWare, *AI 101*:
  <https://ocw.mit.edu/courses/res-6-013-ai-101-fall-2021/>
- MIT Open Learning, *13 foundational AI courses and resources*:
  <https://openlearning.mit.edu/news/13-foundational-ai-courses-resources-mit>
- MIT RAISE, DAILy curriculum:
  <https://raise.mit.edu/resources/curricula/daily/>
- AI4K12, *Five Big Ideas in AI*:
  <https://ai4k12.org/wp-content/uploads/2022/01/AI4K12_Five_Big_Ideas_Poster_3_19_2021.pdf>
- Cambridge Accelerate Science, *AI Core Concepts*:
  <https://docs.science.ai.cam.ac.uk/ai-core-concepts/>
- Russell and Norvig, *Artificial Intelligence: A Modern Approach* contents:
  <https://aima.cs.berkeley.edu/>
- OECD.AI, AI-system classification framework:
  <https://oecd.ai/en/classification>
- NIST, Generative AI glossary and AI RMF Generative AI Profile:
  <https://csrc.nist.gov/glossary/term/generative_artificial_intelligence> and
  <https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence>
- Anthropic, *Building effective agents*:
  <https://www.anthropic.com/engineering/building-effective-agents>
- UNESCO AI competency frameworks:
  <https://www.unesco.org/en/articles/what-you-need-know-about-unescos-new-ai-competency-frameworks-students-and-teachers>
- DeepLearning.AI, *AI for Everyone*:
  <https://www.deeplearning.ai/courses/ai-for-everyone>
- OpenStax textbook architecture and reading strategies:
  <https://openstax.org/books/prealgebra/pages/preface> and
  <https://openstax.org/books/college-success/pages/5-2-effective-reading-strategies>
- Carnegie Mellon Open Learning Initiative:
  <https://www.oli.cmu.edu/courses/ai-for-learning/>
- US Institute of Education Sciences, *Organizing Instruction and Study to
  Improve Student Learning*:
  <https://ies.ed.gov/ncee/wwc/PracticeGuide/1>
- Roediger and Butler, retrieval practice and feedback review:
  <https://pubmed.ncbi.nlm.nih.gov/20951630/>
- Pan and Rickard, transfer of test-enhanced learning meta-analysis:
  <https://pubmed.ncbi.nlm.nih.gov/29733621/>
- Li, Ma and Shi, educational gamification meta-analysis:
  <https://pubmed.ncbi.nlm.nih.gov/37876838/>
- CAST Universal Design for Learning, prior knowledge:
  <https://udlguidelines.cast.org/representation/building-knowledge/prior-knowledge/>
- Wharton GAIL and Generative AI Studio pedagogy:
  <https://gail.wharton.upenn.edu/> and
  <https://gail.wharton.upenn.edu/gen-ai-studio/the-generative-ai-studio-pedagogy/>
- Stanford HAI AI-history infographic and Computer History Museum timeline:
  <https://hai.stanford.edu/sites/default/files/2020-03/moments-in-ai-infographic.pdf>
  and <https://www.computerhistory.org/timeline/ai-robotics/>

## Findings that change the book

### 1. There is no single authoritative list called “the types of AI”

`Predictive`, `generative`, `multimodal`, `agentic`, `embodied`, `specialised`,
`general-purpose`, `machine learning`, `AGI` and `ASI` do not answer one
question. Some describe a task, some a form of information, some a construction
approach, some a system arrangement, some physical interaction and some the
breadth of a capability claim.

The current chapter is wrong to present a partial pair such as predictive and
generative as the only possible result families, then move directly into
multimodal as though it were a peer species. Multimodal can describe a model,
system or product that works across multiple forms of information. It is a
cross-cutting capability, not the next item in an exhaustive job list.

**Curriculum consequence:** Chapter 1 will explain why public labels overlap,
give the reader a plain orientation to the principal families and tell her
which later chapter will fully earn each mechanism. It will not teach one flat
taxonomy or require a six-axis diagnostic worksheet.

### 2. “Mentioned” and “taught” must be different curriculum states

A beginner can meet the phrase `neural network` in a landscape chapter without
being expected to explain layers, weights and training. The current route
silently treats recognition as mastery, then introduces advanced terms such as
token, calibration, encoder, attention and orchestration inside optional depth
panels before the book has built their prerequisites.

Every concept in the new map therefore receives one state:

- `ORIENT`: the reader knows why the term appears and where it belongs;
- `TEACH`: the book supplies plain meaning, mechanism, example, relationship,
  consequence and application;
- `DEEPEN`: the book adds technical operation or evaluation after the core
  explanation is secure; or
- `INDEX`: the reader can locate the canonical teaching without receiving a
  second definition.

No assessment may test a concept above the state the chapter has earned.

### 3. History is explanatory context, not trivia

The reader needs to know that AI did not begin with ChatGPT. Predictive and
classification systems have been used for decades; expert systems were a major
commercial AI approach from the 1970s; neural-network research is older still;
robotics and software-agent research long predate the current phrase `agentic
AI`; and generative modelling predates its 2020s consumer boom.

The timeline's question is:

> What is new here: the idea, the technical capability, its scale and access,
> or the label suddenly breeding in PowerPoint?

The timeline must not draw a deterministic path from rules to prediction to
generation to agents to AGI. These are overlapping research and product
histories, not levels in a video game.

### 4. The book needs more room than the existing nine-chapter route allows

The old route overloads the training chapter with data, labels, tokens,
representations, neural networks, transformers, objectives, optimisation,
parameters, evaluation, generalisation, pretraining, fine-tuning,
post-training and inference. It similarly asks one first chapter to orient and
teach nearly every public AI label.

The book should use the number of chapters required by the prerequisite chain,
not preserve nine because an earlier audit accepted nine.

### 5. Practical application and assessment belong in the chapter design

Reading is not evidence of understanding. Each chapter needs a small textbook
learning cycle:

1. **worked example:** the narrator talks through one ordinary or workplace
   case and makes the hidden reasoning visible;
2. **check you have it:** one immediate question that exposes the most likely
   misconception;
3. **new case:** the reader applies the relationship to a different situation;
4. **Draw it / Explain it / Use it:** a chapter check of the connected model;
5. **reasoned answer:** the answer explains why, including why a tempting wrong
   answer fails; and
6. **recap and handoff:** what was added to the complete system and what the
   next chapter can now explain.

This is book-level application and retrieval, not a duplicate class or the
separate Study Pack quiz. Classes retain guided practice, feedback loops,
demonstration and assessed transfer. The book supplies enough self-checking to
make comprehension visible and recoverable.

### 6. A global Nerd-O-Meter is not helping this candidate

The current implementation makes the reader coordinate three layers while she
is still trying to understand which concept each layer belongs to. The deeper
panels often continue the lesson or introduce prerequisites from later
chapters rather than deepen the concept already taught.

**Research ruling for this candidate:** do not use the global control in the
next review proof. Use complete core prose followed, only where useful, by a
local `Go deeper` section that remains in normal reading order and assumes no
untaught term. This does not silently cancel a future sitewide adaptive-depth
idea; it removes an unproven interaction from the book proof so curriculum and
prose can stabilise first.

### 7. Knowledge checks need to diagnose, teach and reconnect

A score at the end of a chapter is too late and too shallow. The reader needs
to discover *which link* she has not yet secured and return to the exact
explanation that repairs it. The book therefore uses several small checks with
different jobs:

1. **Recognise it:** an immediate, low-stakes misconception check after the
   concept. Every answer receives a short explanation; a wrong answer routes
   back to the exact paragraph, example or visual that teaches the missing
   link.
2. **Explain it:** the reader says or writes what happened in her own words,
   without borrowing the definition. A reasoned model answer and a small
   checklist let her compare the mechanism, not the elegance of her writing.
3. **Draw it:** the reader reconstructs the relevant parts, direction or
   relationship. The answer shows a labelled model and explains which
   connections matter.
4. **Use it:** a different everyday or workplace case requires her to choose
   or apply the relationship and explain why. This is the strongest book-level
   evidence of transfer.
5. **Return to it:** a later chapter or optional return check retrieves the
   concept again after time has passed and connects it to a newly learned
   part of the system.

These are learning interactions, not traps. `I don't know yet` is a useful
answer when it reveals the next explanation. A successful second attempt after
feedback is evidence of learning, not a lesser achievement. Questions must be
answerable from what the book has actually taught, use no unexplained term and
say why tempting wrong answers are wrong.

The visible progress language must remain bounded:

- `CHECKED` can mean the reader completed a feedback-bearing check;
- `CONNECTED` can mean she reconstructed the required relationship;
- `APPLIED` can mean she used it in an admitted new case; and
- `REVIEW_AGAIN` means the book can route her to the missing link.

Do not use `MASTERED` for a book self-check or infer ability, intelligence or
durable understanding from one response.

### 8. Rewards recognise meaningful learning, not correctness theatre

LAiDIES already has a governed reward economy. Butterfly Clips are the one
spendable currency; badges, charms, stickers, cards and other collectibles
retain distinct jobs. The book may not invent a local balance or grant a
browser-authored reward.

The learning-to-reward relationship should be:

| Learning event | Learning evidence | Reward job |
| --- | --- | --- |
| Immediate concept check | Diagnostic only; not mastery | Feedback and a return route; normally no economic reward |
| First admitted chapter checkpoint | Reader completes the chapter's Explain/Draw/Use sequence and receives reasoned feedback | One bounded, idempotent Butterfly Clip event for meaningful learning participation, subject to the shared economy registry |
| Improvement after feedback | A later admitted attempt moves from a named misconception to the expected relationship or application | Optional capped improvement recognition; never repeatable answer farming |
| Connected part or book milestone | Several chapter concepts are correctly reconstructed and applied together | One named knowledge collectible or merit-style milestone, if the Closet/reward owner admits it |
| Delayed return check | The reader retrieves and applies the concept after a meaningful interval | Progress recognition; any economic bonus must be capped and must not become a streak |

The reward must never replace the feedback. A wrong first answer does not lose
currency, break a streak or shame the reader. A correct guess with no reasoning
does not earn a higher learning status than the evidence supports. Core prose,
answers and correction routes remain available without a Resident Card; a
signed-in identity is relevant only if the reader chooses to preserve admitted
progress or rewards.

Implementation requires a bounded handoff to the shared economy, Resident
Card/Closet and applicable assessment owners. It must use a server-authorised,
versioned, idempotent completion event and the existing reward ledger. Until
that vertical is built and publicly verified, the book may show the learning
checks but may not promise that Clips or collectibles have been banked.

Privacy-safe shared evidence stores outcome classes rather than raw private
answers: concept, chapter, item/version, check type, assistance/attempt band and
`CHECKED / CONNECTED / APPLIED / REVIEW_AGAIN`. A reader's free writing, drawing
or private example stays out of the shared record unless a separate explicit
consent and retention decision exists.

## Provisional full-book progression to audit before prose

This is a research result, not yet drafting authority. The next step is a
concept-by-concept prerequisite and completeness audit.

### Introduction: Why this matters to you

Preserve Ali's authored Introduction as the writing standard and governing
purpose: better use, better judgment of claims and informed participation in
workplace and public decisions.

### Part I: See the whole landscape

1. **The many things people mean when they say “AI”**
   - ordinary AI already in the reader's life;
   - no single types list;
   - orientation to task families, information forms, system arrangements,
     physical interaction, construction approaches and breadth claims;
   - short historical timeline distinguishing old ideas from new access and
     new labels;
   - specialised, general-purpose, AGI and ASI at an orientation level, with
     present/disputed/hypothetical boundaries.
2. **What happens after you ask an AI product for something**
   - person and purpose; product/interface; software; current input; model;
     device and network; server, processor, memory and data centre; output;
     possible action; human or institutional consequence;
   - model, product, provider, company, cloud and complete system are not
     synonyms.

### Part II: Learn how AI is built

3. **Rules, search, optimisation and machine learning**
   - AI is larger than machine learning;
   - explicit rules and knowledge representation;
   - search, planning and optimisation as durable AI approaches;
   - why learning from examples became important;
   - supervised, unsupervised and reinforcement learning at the job level.
4. **How training turns examples into a reusable model**
   - data, examples, labels and features;
   - objective, error/loss, adjustment and repetition;
   - parameters and checkpoints;
   - training, evaluation and inference;
   - memorisation, generalisation, shortcuts and overfitting.
5. **Neural networks, deep learning and foundation models**
   - layers and learned representations;
   - tokens and embeddings after their plain jobs are visible;
   - transformers at the mechanism level needed by the reader;
   - pretraining, fine-tuning and post-training;
   - foundation model and general-purpose model;
   - compute, accelerators, memory, networking, energy and scale reconnect to
     Chapter 2.

### Part III: Understand what AI can do

6. **Recognition, prediction, ranking, recommendation and decisions**
   - perception; classification and recognition; detection; forecasting;
     scoring; ranking; recommendation; planning, optimisation and control;
   - uncertainty and thresholds;
   - predictive AI as a broad public label, not the only non-generative AI.
7. **How generative AI creates new content**
   - text, image, audio, video and code generation;
   - generation versus retrieval;
   - language-model generation and next-token selection only after model and
     token prerequisites;
   - image-generation mechanism at an appropriate level;
   - variability, fluency and why generation is not a truth check.
8. **Multimodal and embodied AI**
   - modality as a form of information;
   - using and connecting two or more modalities;
   - input and output modalities can differ;
   - sensors, robotics and physical feedback;
   - multimodal and embodied as cross-cutting capabilities, not job families.

### Part IV: Understand the product around the model

9. **What information reaches the model this time**
   - prompt, system/developer instruction, selected history, context window,
     attachment, stored memory, retrieval and current external information;
   - visible, stored, retrievable and actually supplied are different states.
10. **Tools, workflows and agents**
   - generated suggestion versus executed action;
   - tools, APIs/connectors, permissions and returned observations;
   - fixed automation, workflow and agent;
   - goal, plan/next step, tool use, observation, state, adjustment, stopping
     condition and human checkpoint;
   - older agent research versus the current LLM-agent product wave.

### Part V: Judge AI and participate in what happens next

11. **Why AI fails and how people evaluate it**
   - error, uncertainty, hallucination, bad context, retrieval failure, tool
     failure, distribution shift and interface/workflow error;
   - accuracy, calibration, reliability, robustness, fairness and safety only
     after their ordinary meanings are established;
   - benchmarks, real use, monitoring and correction.
12. **Data, privacy, security, ownership and access**
   - data lifecycle; collection, storage, retention, sharing and possible
     training use as separate events;
   - personal and confidential information; access control; attacks;
     provenance, copyright and ownership questions;
   - open source, open weight, source available and closed.
13. **The AI ecosystem: who builds, supplies, governs and pays for it**
   - model labs, product companies, cloud providers, chip designers and
     manufacturers, data-centre operators, researchers, workers, governments
     and communities;
   - compute, concentration, access, standards and incentives;
   - why one product decision can reach many people and physical resources.
14. **Work, society and future claims**
   - practical change in work and daily life;
   - evidence versus forecasts and marketing;
   - environmental and community consequences;
   - governance, contestability, correction and participation;
   - return to AGI and ASI after the reader has the technical map needed to
     understand what those claims would require.

### Concept Index

The Concept Index provides one-line orientation and routes to the one canonical
teaching location. It does not become a second explanation or count a concept
as taught.

## Chapter component contract to test in the next proof

Each chapter uses only the components that perform a learning job, but the
following jobs must be covered:

- clear chapter promise in natural reader language;
- prerequisites recovered in one or two sentences, not an internal objective
  list;
- one human opening situation;
- connected explanation with the mechanism receiving the largest share;
- one worked example carried through the mechanism;
- a labelled diagram, timeline, comparison or flow only when it lowers mental
  effort;
- no more than two stable-purpose boxes such as `Pin it`, `This matters` or
  `Go deeper`;
- immediate misconception check;
- one different application case;
- Draw it / Explain it / Use it chapter check with feedback and an exact return
  route for every unmet link;
- reasoned answers;
- a later retrieval connection where the concept becomes a prerequisite;
- an honest progress state that never turns completion into a mastery claim;
- compact recap, whole-system reconnection and next-chapter handoff;
- `See more at LAiDIES` only for real admitted destinations; and
- compact sources, checked date, freshness trigger and correction route.

## Stop conditions before another Chapter 1 draft

Do not draft until:

1. every required concept has one canonical teaching location and state;
2. the map has no prerequisite cycle or term used before meaning;
3. an independent curriculum audit checks the whole book, not Chapter 1;
4. the timeline claims are mapped to exact history sources;
5. every chapter's worked example and application test the actual mechanism;
6. the activities together prove Draw it / Explain it / Use it without turning
   the book into a class; and
7. Chapter 1's orientation promises only what its prose and activities can
   genuinely support.

## Current disposition

`RESEARCH / REVISE FULL ROUTE / NO PROSE PRODUCTION`.

The current R6 source and render remain an internal rejected learning artifact.
No prose, visual, admission, deployment or publication follows from this
research record.
