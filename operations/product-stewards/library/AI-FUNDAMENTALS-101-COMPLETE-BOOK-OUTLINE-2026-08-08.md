# AI Fundamentals 101 — complete book outline

**Status:** SPECIFIED FOR SUCCESSOR PRODUCTION — NOT ADMITTED OR PUBLIC
**Candidate:** `LIB-AI-FUNDAMENTALS-101-V3`
**Audience:** women with no assumed technical background who want to understand
AI well enough to use it, question it and participate in decisions about it
**Book job:** one connected, durable explanation of how the main parts of an AI
system work and fit together, plus a direct Concept Index
**Owner route decision:** Ali directed a dedicated types-first Chapter 1 on
2026-08-08, explicitly including generative, agentic, AGI and ASI. That
direction authorises the earlier combined mechanism chapter to split into
Chapter 2 system parts and Chapter 3 model training.

## The promise

By the end of the book, the reader can look at an AI product, result, workplace
proposal or public claim and locate what is actually happening: the physical
infrastructure, the model, the information supplied for this use, the tools and
workflow around it, and the people and institutions deciding what follows.

The book is not a glossary, a prompt manual, a catalogue of products or a
warning label. It explains mechanisms first, then helps the reader use the map.

## Textbook component architecture

The finished book cannot be a long column of prose. Prose carries the connected
explanation, while diagrams, illustrations, fact boxes and retrieval moments do
specific cognitive jobs that prose alone does less well.

Every chapter must contain the smallest useful combination of:

- a human opening question or scene that establishes why the mechanism matters;
- one primary visual explanation—diagram, cutaway, sequence, comparison or
  illustrated case—when spatial or causal relationships are easier to see than
  describe;
- one concrete case that travels through the mechanism rather than appearing as
  a detached anecdote;
- no more than two short boxes chosen for a real job: a distinction readers are
  likely to confuse, a dated/currentness boundary, a Rewind Era connection that
  clarifies the mechanism or a consequence worth pausing over;
- one low-stakes `Pause and place it` moment that asks the reader to classify,
  predict or explain before the answer—not a scored quiz and not class-style
  guided practice;
- an earned chapter click, a compact `You can now explain…` recap and a visible
  handoff to the next chapter; and
- source notes plus a freshness trigger wherever a claim can change.

These components are not a repeated page template. A chapter uses only the
ones that improve its particular cognitive job. The Concept Index links into
the explanation; it does not replace it. Visual text is set in deterministic,
editable layers rather than generated inside an image. Every final diagram or
illustration remains subject to exact-pixel visual-media admission for meaning,
style, period truth, anatomy, physics, legibility and agreement with the prose.

### Chapter component map

| Section | Primary visual or illustration job | Box or comparison job | Worked case and reader action |
| --- | --- | --- | --- |
| Introduction | A one-spread cutaway follows one ordinary AI request from a woman's goal through product, information, model, physical infrastructure, output and consequence. It previews the map without teaching every term. | `AI is a label, not a diagnosis` separates stable system knowledge from changing product names. | The workplace slide labelled *AI initiative* opens the book; the reader identifies why the label alone is insufficient. |
| Chapter 1 | A LAiDIES Closet classification rail shows one item carrying several valid labels, then an adjacent five-axis map classifies one meeting assistant by job, modality, method, breadth and access. The dress analogy ends at non-exclusive classification. | A three-column distinction box separates `generative`, `agentic` and `AGI`; a small dated boundary locates `specialised`, `general-purpose`, `AGI` and `ASI`. | Classify the meeting assistant across several axes, then answer: `Different in what way?` |
| Chapter 2 | A cutaway sequence shows app → product software → model → server/chip/network → result → human consequence, with local and remote-compute branches. | `The app is not the model` and `The cloud has a postcode` make the interface and physical-infrastructure distinctions visible. | Follow meeting notes into a follow-up email; locate whether a defect came from the notes, product, model, permission or human decision. |
| Chapter 3 | A training-loop diagram shows example → model output → measured miss → parameter adjustment → repeat → separate evaluation; a side-by-side strip contrasts training with inference. | `Pattern, not filing cabinet` distinguishes learned parameters from a searchable archive; the Rewind Era encyclopedia shows the time boundary of training knowledge and states its limit. | Use new expense claims to distinguish memorisation, generalisation and a bad shortcut; predict whether prompting or fine-tuning changes the model. |
| Chapter 4 | A `what reached the model this time?` layer diagram separates system instruction, user request, selected history, attachment, memory retrieval and current external retrieval. | A five-way comparison separates visible chat, current context, stored data, retrieval and training. | Diagnose why a product displayed a policy in one session but omitted it from a later answer; choose the information path that needs repair. |
| Chapter 5 | A permission-bound action diagram separates model suggestion, structured tool call, tool execution and returned observation. | `Generate is not execute` and `connection is not permission` prevent two common category errors. | Trace a leave request that needs policy search, date calculation and calendar access; mark where permission and human confirmation belong. |
| Chapter 6 | An agent-loop diagram shows goal → plan/next action → tool → observation → updated state → stop/escalate, with checkpoints and failure exits rather than an endless circle. | A comparison separates fixed automation, workflow and agent; another names stop conditions rather than implying limitless autonomy. | Follow a narrowly scoped meeting-follow-up agent through several steps and identify where one early error could compound. |
| Chapter 7 | A failure-location map routes an observed problem to model, data, context, retrieval, tool, interface, workflow or human/institutional decision; a second matrix separates accuracy, reliability, robustness, fairness and safety. | `Hallucination is not every failure` prevents model-only diagnosis; a consequence box explains why review effort should match stakes. | Diagnose three different failures that produce the same bad-looking answer, then choose a mechanism-matched response rather than `verify everything`. |
| Chapter 8 | A data-journey diagram follows collection → current use → storage → retrieval → sharing → possible training use → deletion/retention, with decision owners at each step. | A comparison separates open source, open weight, source available and closed; none receives a good/bad halo. | Follow one confidential workplace document through an assistant and identify the questions that must be answered before upload or action. |
| Chapter 9 | A ripple map connects one deployed AI system to task change, people, organisational incentives, labour, data centres/resources, access, standards and public decisions; a lifecycle strip shows deploy → monitor → update → correct → retire. | `Claim, evidence or forecast?` separates current evidence, institutional framing and inference; AGI/ASI claims route back to Chapter 1. | Take one dated public claim and locate its system layer, population, comparison, consequence, source and freshness date. |
| Concept Index | A compact concept-family map and A–Z route show where each term belongs without reproducing the chapter teaching. | `Often confused with…` appears only where a neighbouring term creates a genuine misconception. | Every entry deep-links to the mechanism, case or visual where the concept becomes understandable. |

## Visible route

### Introduction — Why is AI worth understanding if you are not a technologist?

**Reader question:** What changes for me when I understand what sits behind the
label *AI*?

**Covers:** the practical and civic payoff; the difference between learning the
stable system and memorising product names; the complete book map.

**Does not cover:** definitions in bulk, verification procedure or a catalogue
of risks.

**Handoff:** We need to identify the whole system before examining any one part.

### Chapter 1 — What are the different types of AI—and why do the lists disagree?

**Reader question:** Is a chatbot the same kind of AI as a fraud detector,
image generator, recommendation system or self-driving feature?

**Covers:** why one system can belong to several categories at once; five
different questions people mean by *type of AI*: what job it does, what kind of
input/output it handles, how it is built, how broadly it can work and how it is
accessed. The chapter distinguishes predictive/classification/ranking/
recommendation/generative/control jobs; generative versus agentic as different
axes (what is produced versus how a system acts across steps); text/image/audio/video/data and
multimodal systems; rules, machine learning and deep learning; specialised and
general-purpose systems; and the disputed proposed categories AGI and ASI. AGI
concerns proposed human-level breadth and transfer; ASI concerns a hypothetical
system exceeding human capability across most or all relevant intellectual
domains. Access labels
are introduced only as a separate axis and routed to Chapter 8.

**Must understand:** AI, model, job/task, machine learning, generative AI,
agentic AI, LLM, modality, specialised AI and general-purpose AI.

**Language boundary:** *generation* names the content-producing job;
*generative AI* names systems designed for that job. *General-purpose* means a
current system can work across many tasks; it does not mean *general
intelligence* or AGI.

**Recognise and locate:** classification, prediction, ranking, recommendation,
generation, control, deep learning, neural network, multimodal, AGI and ASI.
Neither AGI nor ASI is presented as a current product type or inevitable next
step; definitions, tests and timelines remain disputed. Agentic AI is not
treated as AGI: a narrowly scoped system can choose tools and continue through
steps without possessing general intelligence.

**Does not cover:** a claim that these categories form one exclusive list,
detailed training mechanics, product rankings, AGI/ASI timelines or an exhaustive
catalogue of every technical architecture.

**Handoff:** A type tells us one property of the AI. It does not show all the
parts that make a real product work.

### Chapter 2 — What parts make an AI system work?

**Reader question:** When I open an AI app, what am I actually interacting with?

**Covers:** AI system, product/app, provider/company and model as different
things; instructions, information, tools, controls and people around the model;
chips, servers, data centres, networks, electricity and cooling; the path from
human request to model computation, product result and consequence.

**Must understand:** AI system, product, provider/company, model, input, output
and the idea that surrounding software changes what the product can do.

**Recognise and locate:** parameters, CPU, GPU, TPU, accelerator, server, data
centre, network, electricity and cooling.

**Does not cover:** how parameters are learned, current chip-market or resource
quantities, or a claim that every AI system has identical components.

**Handoff:** Now that the model has a place in the system, we can explain how it
is shaped.

### Chapter 3 — How does a model learn from data—and produce a result?

**Reader question:** How can examples and feedback produce a model that works on
something it has not seen before?

**Covers:** data selection, cleaning and labels; representation and tokens;
architecture at recognition level; objective, loss and optimisation; training,
parameters and checkpoints; evaluation; generalisation, memorisation,
overfitting and shortcuts; pretraining, fine-tuning and post-training;
inference; why different objectives produce different model jobs.

**Must understand:** training data, representation, token, training, objective,
parameter, evaluation, generalisation, inference and the time boundary of
training knowledge.

**Recognise and locate:** dataset, label, tokenizer, architecture, loss,
optimisation, checkpoint, test set, memorisation, overfitting, shortcut,
pretraining, fine-tuning and post-training.

**Does not cover:** calculus, code, a universal training recipe, named-model
training secrets or detailed verification of a user-facing result.

**Handoff:** A trained model still needs a working input each time somebody uses
it.

### Chapter 4 — What information does an AI use when you ask it something?

**Reader question:** Why can an AI product show, store or retrieve information
and still fail to use it in the current answer?

**Covers:** prompt and instructions; context and context window; conversation
and session state; attachments; product memory; retrieval and RAG at mechanism
level; embeddings and vector search at recognition level; the distinctions
among current context, stored data, retrieval, fine-tuning and training.

**Must understand:** user prompt, system/developer instruction, context, chat
history, attachment, product memory and retrieval.

**Recognise and locate:** context window, session, grounding, RAG, embedding and
vector search.

**Does not cover:** provider-specific retention promises, permission to upload
sensitive material or the full tool/action mechanism.

**Handoff:** Once information can be supplied, surrounding software can also
give a model ways to do things.

### Chapter 5 — How does an AI product do more than answer?

**Reader question:** What lets an AI product do more than produce an answer from
the model alone?

**Covers:** tools, search, calculators, code execution, image/audio/video
generation, APIs, connectors and MCP; tool descriptions and calls; routing;
permissions; the difference between a model suggesting an action and software
executing one; multimodal input and output.

**Must understand:** tool, tool call, permission, action and the difference
between generation and execution.

**Recognise and locate:** API, connector, routing, multimodal model, sandbox and
MCP as one connection-protocol example rather than required developer
vocabulary.

**Does not cover:** a current product catalogue, an endorsement of a tool or a
claim that a connection standard makes a system safe.

**Handoff:** Permission to use one tool is not the same as a human checkpoint
over a whole workflow. One model-and-tool turn can be assembled into a longer
process.

### Chapter 6 — What is an AI agent—and how does it carry out a multi-step job?

**Reader question:** What changes when an AI system can plan, act, observe and
continue instead of answering once?

**Covers:** automation, workflow and agent as different arrangements; goals,
plans, loops, observations, state and stopping conditions; skills and
sub-agents; structured handoffs; human checkpoints, monitoring and recovery;
how small errors can compound across steps.

**Must understand:** automation, workflow, agent, goal, plan, loop, observation,
state, stop condition and human checkpoint.

**Recognise and locate:** skill, sub-agent, structured handoff, guardrail,
monitoring and recovery. A data schema may be shown as one way to structure a
handoff; the term is not required beginner vocabulary.

**Does not cover:** treating agency as consciousness, assuming autonomy means
independence from people or prescribing one agent architecture.

**Handoff:** More steps and capabilities create more ways for a useful system
to produce a bad outcome.

### Chapter 7 — Why can AI be wrong, biased or unsafe?

**Reader question:** Why does an AI result vary, fail or cause harm—and how do I
identify which part needs fixing?

**Covers:** probability and variation; hallucination; missing or poor data;
biased data and objectives; shortcuts and distribution shift; unsuitable
models; missing context; stale or irrelevant retrieval; tool and permission
failure; prompt injection; interface omission; evaluation and benchmarks;
accuracy, reliability, robustness, fairness and safety as different questions.

**Must understand:** probability/uncertainty, variability, hallucination, bias,
evaluation and failure mode.

**Recognise and locate:** fairness, robustness, reliability, distribution
shift, benchmark and prompt injection.

**Does not cover:** a demand to verify every harmless generation, a single
score that proves quality or the claim that all failures originate in the
model.

**Handoff:** Some failures concern the result; others concern what happens to
people's information and who has power over the system.

### Chapter 8 — What happens to your data—and who controls the system?

**Reader question:** When should I care about privacy, security, ownership,
access and accountability?

**Covers:** collection, storage, retention, training use and sharing as separate
data events; personal and confidential information; access control; security
threats; copyright and ownership questions at recognition level; provenance;
human authority, contestability and correction; why provider, employer and
lawful-use rules can differ.

**Must understand:** personal and confidential data; collection, storage,
retention, training use and sharing as separate events; access control,
security, accountability and correction.

**Recognise and locate:** provenance, copyright, contestability, open source,
open weight, source available and closed/proprietary access. These labels
describe different forms of access and control; none is a quality or safety
verdict.

**Does not cover:** legal advice, universal provider policies or dated rules
that belong in NewsStand and current product guidance.

**Handoff:** Individual choices sit inside larger organisational and social
systems.

### Chapter 9 — How do AI systems change work, resources and public decisions?

**Reader question:** How can I take part in decisions about AI without accepting
either hype or dismissal?

**Covers:** task change versus job claims; human-AI collaboration; adoption and
incentives; labour behind AI systems; energy, water, materials and data centres;
access and exclusion; deployment, monitoring, model or product updates and
retirement; standards, regulation and governance; how to read a dated claim by
locating its layer, population, comparison and consequence.

**Must understand:** adoption, automation versus augmentation, labour, resource
use, deployment, monitoring, lifecycle, governance and public interest.

**Recognise and locate:** version, standard and regulation. AGI and ASI claims
route back to Chapter 1's definitions and are treated here as dated,
source-bound public claims—not present capabilities or inevitable forecasts.

**Does not cover:** forecasts presented as facts, one moral for every use or a
dated policy digest. Current quantities and disputes route to NewsStand.

**Landing:** The reader can now locate an unfamiliar AI claim in the system,
identify what is known and missing, and ask a better next question without
handing over her judgement.

### Concept Index — Where can I look up one AI term?

**Reader question:** What does this term mean, and where does it belong in the
whole system?

**Job:** an A–Z lookup route. Each entry gives one-line recognition, the
chapter where the mechanism is explained and its relationship to neighbouring
concepts.

**Failure condition:** the index becomes a second book, a disconnected glossary
or the only place where an important concept is explained.

## Progression check

1. AI types before the parts of a deployed AI system.
2. Model and system before training; training before inference.
3. Inference before context, memory and retrieval.
4. Context and retrieval before tools and actions.
5. One turn before workflows and agents.
6. Mechanism before failure diagnosis.
7. Data flow before privacy, security and control.
8. Individual system understanding before organisational and public effects.

No chapter may depend on a term whose plain meaning and system location have
not already appeared.

## Source-derived completeness ruling

The institutional and practitioner source families add five important checks
to the earlier route: the AI-type map; data/objective/
optimisation/evaluation as a connected training mechanism; generalisation;
privacy/security/control as a distinct chapter job; and deployment/lifecycle/
governance as the final widening of the map.

They do **not** justify importing full technical-course topics such as search
algorithms, calculus or coding into a beginner book. Stanford CS336, Harvard
CS50 AI and MIT routes check mechanism completeness; Helsinki, OpenLearn and
Cambridge check progression; Wharton and AIDB supply dated practical and work
applications. Exact factual claims still require claim-level primary sources.

The first independent Claude curriculum audit exposed two additional omissions:
the time boundary of training knowledge and a truthful route for AGI and ASI
claims. It also required active vocabulary to be separated from
recognition-only terms. The audit accepted the chapter order and rejected
neither the then-eight chapter jobs nor the decision to keep advanced course
mechanics out of this beginner book. Ali then directed the types material to
become the opening chapter and explicitly added generative, agentic, AGI and
ASI, authorising the nine-chapter route recorded above. Claude's second audit
called the resulting system-parts/training split pedagogically sound and found
the prerequisite order correct; its remaining title and terminology findings
are resolved in this outline.

## Production boundary

The first review packet contains this complete outline plus newly written
Introduction–Chapter 3 prose and the corresponding Concept Index entries. It
must not splice in predecessor prose. Chapters 4–9 remain outlined, not
silently treated as drafted or admitted.
