# AI Fundamentals 101: connected book route

**Status:** COMPLETE CURRICULUM ROUTE + SECTION TEACHING MAP / NOT AUDITED OR ADMITTED
**Candidate:** `LIB-AI-FUNDAMENTALS-101-V4-CONNECTED-ROUTE`
**Owner:** Library production with Learning System concept coherence
**Depth:** one canonical book with cumulative Standard / Tell me more / Full
nerd alert! sections; implementation remains uncommissioned

## Book promise

Understand what AI is, how its important parts work, why different systems
behave differently and what changes when people use their outputs to make
decisions or take action. The book assumes no technical background and does
not reward memorising a vocabulary list. By the end, the reader should be able
to draw the connected system, explain it in her own words and use it to reason
about an unfamiliar AI product in everyday or working life.

## The one system the whole book builds

Every chapter adds to, revises or qualifies this same map:

`human purpose and choices`
`→ data, examples and objectives used to build or adapt a model`
`→ trained model running inside a product`
`+ current request, instructions, context, retrieved information and tools`
`→ output`
`→ optional software or physical action`
`→ human or institutional decision`
`→ real consequence, evaluation, correction and possible new data`

Computing infrastructure supports training and use. Companies, researchers,
governments and communities shape which systems exist, who can use them and
which consequences are accepted. These are part of the AI ecosystem, not
floating topics saved for a disconnected final chapter.

This is a teaching map, not a claim that every AI product contains every part.
Each worked example identifies which parts are present, absent or unknown.

## How each chapter teaches

The complete section-level syllabus is machine-readable at
`AI-FUNDAMENTALS-101-V4-SECTION-TEACHING-MAP.json`. It governs the logical
learning sequence before prose. Every chapter must contain, in a natural order
rather than a repeated template:

- one chapter teaching goal and a coherent progression of section teaching
  goals;
- the prior piece of the system map it assumes;
- one connected cause-and-effect explanation;
- an everyday or work example in which the relationship is visible;
- an analogy only if it makes that relationship easier to understand;
- one practical judgment, action or prediction;
- a return to the whole-system map showing exactly what was added; and
- explicit questions the reader can answer afterward; and
- a Draw it / Explain it / Use it check that tests relationships, not recall.

Titles do not have to be questions. They must make their coverage obvious. The
questions are outcome requirements: the section has not taught its job until a
reader can answer them in her own words.

The Nerd-O-Meter layers behave like follow-up questions:

- **Standard:** the complete core answer, connected mechanism, example,
  practical use, important limitation and system-map addition.
- **Tell me more:** “How does that work?”, “Why?”, “What connects to it?” and
  “What changes if this part changes?”
- **Full nerd alert!:** the underlying machinery, edge cases, evaluation,
  disputed definitions and evidence, still taught from first principles.

Higher settings add to the same diagram. They may never repair Standard or
become a vocabulary attic.

## The route readers will see

### Introduction: Why understanding AI changes what you can do and decide

**Chapter teaching goal:** Give the reader a compelling reason to understand AI
and the first complete map she can use immediately.

**By the end, the reader can answer:** Why does understanding AI matter in my
ordinary decisions and work? What does the label AI tell me, and what does it
leave unanswered? What first questions make an AI claim more concrete?

**Builds from:** ordinary encounters with AI claims and products; no technical
knowledge.

**Adds to the map:** the broad input → system → output → consequence path and
the fact that “uses AI” is the start of a useful question, not an explanation.

**Everyday/work case:** a workplace proposal uses the label AI without saying
whether the product drafts, searches, ranks, decides or acts.

**Reader can now:** replace the vague label with three useful questions: what
does it do, what does it use and what happens after the output?

### Chapter 1: The kinds of AI you are already meeting

**Chapter teaching goal:** Orient the reader to the major kinds and capability
claims without presenting unlike labels as one flat taxonomy.

**By the end, the reader can answer:** Why do very different products all count
as AI? What do predictive, generative, multimodal and agentic describe? What
are AGI and ASI, and do they exist today?

**Builds from:** AI is a broad category and systems turn inputs into outputs
with consequences.

**Adds to the map:** a first orientation to systems that recognise, predict,
rank, recommend or generate, plus products that continue through tools and
actions. Generative and agentic describe different characteristics and may
overlap. AGI and ASI are disputed or hypothetical breadth claims, not present
product features or inevitable upgrades.

**Everyday/work case:** compare a phone photo search, spam filter, streaming
recommendation, image generator and tool-using travel assistant by what each
actually does.

**Depth follow-ups:** Tell me more separates tasks, methods and product
behaviour without turning them into competing “types.” Full nerd alert!
examines narrow/general boundaries, multimodality, embodied systems and why
AGI definitions and tests remain disputed.

**Reader can now:** explain why several AI labels can apply without collapsing
them, and place a new product provisionally by observed behaviour rather than
marketing language.

### Chapter 2: What an AI product is made of

**Chapter teaching goal:** Separate the visible product from the model and the
surrounding technical and human components.

**By the end, the reader can answer:** What is an AI model? What else makes an
AI product work? Why can the same model behave differently in different
products?

**Builds from:** different AI products perform different tasks.

**Adds to the map:** interface, product software, model, current input,
surrounding instructions, optional retrieval, memory and tools, computing
infrastructure, output and human decision. Model, product, company and complete
system are not synonyms.

**Everyday/work case:** follow one customer-service request through the visible
chat window, product rules, model, policy retrieval and human approval.

**Analogy candidate:** a television production may help separate the visible
programme from the cast, script, editing, broadcast system and people making
decisions—but only if learner testing shows the mapping reduces confusion.

**Depth follow-ups:** Tell me more explains APIs, orchestration and product
guardrails. Full nerd alert! adds model families, inference serving, hardware
and why the same model can behave differently in different products.

**Reader can now:** draw the major parts behind a familiar product and identify
which part would need to change to alter information access, permission or
behaviour.

### Chapter 3: How an AI model learns, then produces a result

**Chapter teaching goal:** Explain how a model is built, adjusted and evaluated,
then distinguish that process from using it on a new input.

**By the end, the reader can answer:** How does machine learning differ from
ordinary programmed rules? What happens during training? What are tokens,
parameters, neural networks and transformers? How are training, post-training,
evaluation and inference different?

**Builds from:** a model is one trained component inside a product.

**Adds to the map:** training data and examples, objective, repeated parameter
adjustment, evaluation, post-training, generalisation and inference. Training
changes the model; prompting and context influence one use of the trained
model without ordinarily retraining it.

**Everyday/work case:** contrast building a spam classifier from many labelled
examples with using the finished classifier on one new email.

**Analogy candidate:** learning to recognise a song from many listens may help
separate learning a pattern from identifying one later instance, but it must
not imply human memory, intention or understanding.

**Depth follow-ups:** Tell me more makes loss, parameters, validation and
post-training concrete. Full nerd alert! introduces token prediction,
embeddings, gradient-based optimisation, overfitting and evaluation from first
principles.

**Reader can now:** explain the difference between training and inference,
show where data, objectives and evaluation affect behaviour, and diagnose why
adding a fact to a prompt is not the same as teaching the model permanently.

### Chapter 4: What information an AI product can use right now

**Chapter teaching goal:** Separate what the model learned during training from
what the product supplies or stores for a current request.

**By the end, the reader can answer:** What information can an AI product use
right now? How are context, retrieval and memory different? Why might
information visible to me still be absent from the model's current input?

**Builds from:** training creates a model; a product supplies additional
information when the model is used.

**Adds to the map:** learned parameters, current context, context window,
selected conversation history, attachments, retrieval, product memory and
information fetched through tools. Visible, stored, retrievable and supplied
to the model are different states.

**Everyday/work case:** ask a workplace assistant about an updated leave policy
and trace whether the current policy was actually retrieved and placed in the
request context.

**Rewind Era teaching candidate:** the canonical Episode 02 Spice Girls prompt
move makes the first instruction memorable: tell the system what you actually
want. The mechanism then adds context, constraints, useful output form and the
human check. This is a retrieval cue for clear delegation, not a claim that one
catchy line makes prompting reliable or changes the trained model.

**Depth follow-ups:** Tell me more covers retrieval ranking, memory choices and
context limits. Full nerd alert! covers token budgets, embeddings, vector
search, caching and the difference between parameter memory and product state.

**Reader can now:** draw which information entered one answer, explain what was
missing and choose the smallest useful correction.

### Chapter 5: How AI systems use tools and take actions

**Chapter teaching goal:** Trace the boundary between model output and an action
executed through connected software under permissions.

**By the end, the reader can answer:** How does an AI product use a tool? What
is the difference between connection, permission and execution? How can I tell
whether an action actually happened?

**Builds from:** the model receives context and produces output inside a
product.

**Adds to the map:** structured tool request, connection, permission check,
tool execution, returned observation, confirmation and action record.
Connection is not permission; suggesting an action is not executing it.

**Everyday/work case:** a travel assistant searches calendars and fares, then
requests confirmation before booking.

**Depth follow-ups:** Tell me more covers APIs, schemas, tool errors and human
checkpoints. Full nerd alert! covers execution environments, authentication,
least privilege, idempotency and auditable traces.

**Reader can now:** distinguish a drafted email from a sent email, identify the
permission boundary and predict where a tool failure will appear.

### Chapter 6: What makes agentic AI different from automation

**Chapter teaching goal:** Distinguish fixed automation, governed workflows and
agentic loops, including their control and failure implications.

**By the end, the reader can answer:** What makes an AI system agentic? How is
an agent different from automation or a workflow? Why can errors compound
across steps?

**Builds from:** models can produce tool requests and products can execute
actions under permissions.

**Adds to the map:** fixed automation, governed workflow and agent loop;
goals, routing or planning, tools, observations, state, stopping conditions,
escalation and compounding error. Agentic does not mean conscious, correct,
unrestricted or generally intelligent.

**Everyday/work case:** compare a scheduled invoice reminder, a fixed approval
workflow and a system that investigates missing invoice details across tools.

**Depth follow-ups:** Tell me more traces one complete loop and its failure
points. Full nerd alert! covers planning patterns, state machines,
multi-agent arrangements, evaluation and control research.

**Reader can now:** draw the loop, distinguish agentic behaviour from ordinary
automation and place a useful human checkpoint before consequences compound.

### Chapter 7: Why AI systems fail in different ways

**Chapter teaching goal:** Give the reader a system-level failure map so that
different problems receive different diagnoses and responses.

**By the end, the reader can answer:** What is a hallucination? How are
unreliability, brittleness, bias, manipulation and misuse different? How do I
locate the failure before choosing a safeguard?

**Builds from:** the reader now knows the model, product, current information,
tools, permissions and multi-step workflow.

**Adds to the map:** failure locations across data, objective, model, context,
retrieval, tool, interface, workflow, human decision and institution. Separate
hallucination, unreliability, brittleness, unfairness, misuse and unsafe
deployment.

**Everyday/work case:** compare an invented policy citation, an outdated policy
retrieval, a correct draft sent to the wrong person and an unfair prioritisation
rule.

**Rewind Era teaching candidate:** reuse the canonical Episode 03 Burn Book
Problem for an unsupported claim that looks as finished and authoritative as a
supported one. It can make the verification problem and social effect visible;
it does not explain the internal token-generation mechanism or imply that every
hallucination begins with a rumour or one small fact.

**Depth follow-ups:** Tell me more matches tests and mitigations to failure
locations. Full nerd alert! covers distribution shift, calibration, benchmark
limits, red teaming and socio-technical evaluation.

**Reader can now:** locate a failure before proposing a remedy and explain why
“verify everything” is not a sufficient diagnosis.

### Chapter 8: Where your data goes in an AI product

**Chapter teaching goal:** Trace personal or organisational information through
the complete product lifecycle and make product-specific privacy checks
possible.

**By the end, the reader can answer:** What can happen to information I
provide? What is the difference between current processing, storage, retrieval
and possible training use? Which product, account and workplace settings must
I check?

**Builds from:** information can enter context, storage, retrieval, tools and
institutional workflows.

**Adds to the map:** collection, immediate processing, context, storage,
retrieval, sharing, possible model-improvement use, retention and deletion.
Product policy, account type, workplace configuration and provider terms
change the path.

**Everyday/work case:** follow a confidential meeting summary through a
personal account and a governed workplace account, without assuming either
route from the interface alone.

**Depth follow-ups:** Tell me more covers retention controls, administrator
settings and data boundaries. Full nerd alert! covers telemetry, training-use
pipelines, privacy-preserving techniques and limits of deletion claims.

**Reader can now:** draw the possible data path, identify what must be checked
before sharing sensitive information and explain which answer depends on the
specific product configuration.

### Chapter 9: How AI connects to work, resources and public choices

**Chapter teaching goal:** Extend the technical system into the wider AI
ecosystem of organisations, infrastructure, work, markets, governance and
public consequences.

**By the end, the reader can answer:** Who builds, supplies, deploys, governs
and is affected by AI systems? How do chips, cloud services, data centres and
energy connect to AI products? How can I separate current evidence from
forecasts about work, society and the future?

**Builds from:** complete AI systems are built, operated and governed by people
and institutions, and their outputs can create consequences.

**Adds to the map:** tasks, professional responsibility, organisational
incentives, labour, access, physical computing infrastructure, energy and
water, standards and governance. Present evidence, company framing, credible
disagreement, forecast and speculation remain visibly distinct.

**Everyday/work case:** trace one organisation's decision to deploy an AI
assistant through changed tasks, accountability, vendor dependence, resource
use and rules—not a false analogy to the dot-com boom or collapse.

**Depth follow-ups:** Tell me more examines adoption choices and institutional
trade-offs. Full nerd alert! examines compute supply chains, measurement
uncertainty, policy instruments and competing economic evidence.

**Reader can now:** extend the technical diagram into the wider AI ecosystem,
explain who makes which choices and identify what evidence would change a
claim about impact.

### Final synthesis: Draw it, explain it, use it

This is not a memory quiz.

- **Draw it:** from a blank page, reconstruct the purpose → training/model →
  product/context/tools → output/action → decision/consequence loop, then add
  infrastructure and institutional actors. Mark optional parts as optional.
- **Explain it:** choose one familiar AI product and explain why it behaves as
  it does, where its information comes from, how an output can affect the
  world and where a human choice remains.
- **Use it:** analyse an unfamiliar everyday or workplace AI proposal, identify
  present/absent/unknown parts, predict two plausible failure points and name a
  useful next question or safeguard.

A reader need not reproduce the book's wording. She passes by preserving the
important relationships and using them well.

### Concept Index: Find the AI term you need

The A-to-Z index gives each term a one-sentence meaning, its chapter anchor,
the concept it is commonly confused with and its relationship to the complete
system. It supports lookup without turning the chapters into a glossary. Each
entry links both to the first plain explanation and to any deeper Nerd-O-Meter
section.

## Visual teaching plan

No chapter receives a diagram quota. A visual exists only when it reduces the
mental work of understanding parts, sequence, scale or relationships.

The priority candidate is one professionally illustrated, editable system map
that grows cumulatively across the book and remains available for the final
blank-page reconstruction. It is not drawn with CSS/HTML. Deterministic labels
and arrows sit in editable layers. Each chapter uses only the relevant portion
and reconnects it to the whole. Additional illustrations require a distinct
teaching job and exact alignment with the accompanying prose.

## Production order

1. Audit this complete prerequisite and relationship route plus the exact
   section teaching map before more chapter prose is produced.
2. Preserve the exact R3 Introduction as a prior proof, but re-evaluate its fit
   against this revised whole-book promise before admission.
3. Draft Chapters 1–3 as one connected representative unit with the cumulative
   system map and Standard/Tell me more/Full nerd alert! section plan.
4. Run producer probes for Draw it / Explain it / Use it before independent
   review; objective relationship defects return to production.
5. Obtain observed unfamiliar-reader reconstruction, explain-back and unseen
   application evidence on the exact prose before semantic admission.
6. Continue in prerequisite order through Chapters 4–9; every chapter must
   preserve and extend the same map.
7. Build the Concept Index only from admitted chapter anchors.
8. Commission visual production only after the prose and semantic object map
   establish a real teaching need; CSS/HTML drawings remain prohibited.
