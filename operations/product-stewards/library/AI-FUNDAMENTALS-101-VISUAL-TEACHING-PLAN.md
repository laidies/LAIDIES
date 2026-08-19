# AI Fundamentals 101 — visual teaching plan

**Status:** REBUILDING — all nine CSS teaching figures and their prior PASS claims invalidated; section inventory and one Chapter 1 purpose-built proof required; not published
**Owner:** Library
**Applies to:** the complete AI Fundamentals 101 successor, not the prose-only representative pilot

## Governing rule

Visuals are part of the explanation. Each one must reduce the reader's mental
work by making a relationship, sequence, comparison or failure path visible.
No visual is admitted because a page looks empty or because every chapter is
expected to have one.

The unit is a **textbook visual learning aid**, not a diagram by default. Choose
the form that teaches the section: a worked illustration for a familiar
situation, an annotated scene or cutaway for hidden structure, a sequence for
change over time, a comparison graphic for contrasts, a map for spatial
relationships, or a diagram only when the concept is genuinely diagrammatic.
Flowcharts used where an illustration should teach are a failure, even when
their arrows are mechanically correct.

Lettering, arrows, legends, illustration and the technical relationship are
designed together as one coherent textbook composition. Do not generate source
art and then apply CSS, Figma, Slides or other editor lettering afterward.
Generated lettering may remain when every visible character is correct; one
wrong, pseudo or stray character rejects the asset rather than triggering an
overlay repair. Every visual has an equivalent text explanation and remains
understandable without colour.

CSS may position and caption an admitted visual asset, but it may not draw the
teaching visual or add its internal lettering. Python-generated visuals are also
prohibited. Each visual is produced in an appropriate illustration or diagram
tool as a real purpose-built asset, normally with a reviewed PNG or WebP
derivative.

## Reference-led production method

Before drawing each visual, inspect two to four current, authoritative educational
examples that teach the same relationship. Record what each example makes clear,
what it hides or oversimplifies and which device—containment, sequence, scale,
comparison, feedback or physical arrangement—earns reuse as a method. Do not copy
the composition, artwork or wording. Build an original LAiDIES visual from the
book's exact text and sources.

A reference diagram is evidence about communication, not technical authority.
Provider architecture diagrams may be accurate but too implementation-specific;
popular explainers may be clear but technically loose. The book visual must retain
the mechanism a beginner needs and remove detail that does not change the lesson.

## Manuscript-derived visual inventory

This inventory is derived from the current 20-chapter manuscript. It replaces the
superseded six-chapter plan, whose chapter subjects did not match the actual book.
It identifies the strongest visual job in each chapter; it is not a quota. A visual
is produced only when it beats prose for that exact job.

| Chapter | Strongest visual teaching job | Required visible relationship | Cumulative system-map contribution |
| --- | --- | --- | --- |
| 1 — What “AI” Actually Means | Separate ordinary automation from learned-pattern AI inside a familiar product | human writes a rule → software follows it, versus people supply examples → model learns a pattern → applies it to a new case | Orientation only; no permanent map component |
| 2 — The AI Family | Distinguish four jobs without treating “AI” as one mechanism | machine learning predicts; deep learning interprets complex input; generative AI creates; agentic AI acts, observes and adjusts; higher layers can use lower layers | Capability-family legend |
| 3 — Data | Show the data lifecycle and the human choices inside it | collect/select → clean → label/organise → split → train/evaluate, with provenance, omission and bias entering at named points; synthetic output looping back is visibly conditional | Data source and preparation |
| 4 — Tokens | Show how human text becomes model input and competes for finite working space | characters/words → tokenizer vocabulary chunks → token IDs → context window; comparable meaning may use different token counts across languages/tokenizers | Tokenisation and context input |
| 5 — Training | Make “guess, check, adjust” and attention concrete without a fake-brain analogy | input → prediction → measured error → distributed adjustment → repeat; separate inset shows attention changing which prior tokens matter | Training and model weights |
| 6 — Seeing, Hearing and Creating | Show how non-text media becomes processable structure | image → patches/features/tokens; text → iterative denoising → image; chained audio versus native audio as distinct paths | Modality encoders/decoders |
| 7 — Inference | Show what happens after a person presses Send | request → tokenise → prefill → one-token-at-a-time decode → product output; batching is a separate serving queue, not part of one answer's meaning | Runtime inference path |
| 8 — Context, Memory and Retrieval | Stop “the model remembers” from collapsing several systems | trained weights versus current context versus saved product memory versus retrieved sources; only supplied material enters the current step | Context, memory and retrieval branch |
| 9 — Customisation | Diagnose which method matches the thing that is actually wrong | request instructions/examples → prompt/system context; missing current/private fact → RAG context; persistent specialised behaviour → fine-tuning; broad preference/safety shaping → RLHF/DPO; new foundation model → pre-training; these are branches that can combine, not a mandatory ladder | Customisation controls around model |
| 10 — Wrappers, Harnesses and the Stack | Reveal the product surrounding a raw model | interface → product instructions/orchestration → router/retrieval/tools → model → safety/presentation → person | Product/application stack |
| 11 — Guardrails, Safety and Trust | Show that safety is layered and failures differ by layer | input checks → product policy → model behaviour → tool permissions → output checks → human judgment, with distinct bypass/failure points | Safety and approval boundaries |
| 12 — Testing and Evaluation | Show why one benchmark cannot answer “is it good?” | standard benchmark + task-specific eval + human review + live monitoring feed different evidence into release/correction decisions | Evaluation and feedback loop |
| 13 — Sandboxing | Connect autonomy to consequence and reversibility | action scope × reversibility matrix, with permissions, sandbox boundary, approval and rollback located around the tool action | Execution boundary |
| 14 — Agents | Expand the introductory loop into the operational mechanism | goal → plan/choose → tool call → observe result → update → stop/continue, with memory, permissions and human checkpoints | Agent execution loop |
| 15 — Prompt to Graph Engineering | Show four nested design frames rather than four replacement buzzwords | wording ⊂ available context ⊂ repeated loop ⊂ multi-step/multi-agent graph; each zoom-out adds a new control problem | Engineering/control overlay |
| 16 — Chips and Compute | Explain why GPUs suit AI workloads better than a general CPU | few flexible sequential workers versus many parallel numerical workers; training/inference work mapped without implying all chips are identical | Compute hardware |
| 17 — Data Centres and Energy | Show the physical system behind a model response | grid/generation → substation → data centre → servers/chips → cooling/water → network; heat and energy leave the system | Data-centre infrastructure |
| 18 — Supply Chain | Show the interdependence behind one usable AI chip | design tools/IP → chip design → fabrication equipment/materials → foundry → packaging/memory → data-centre deployment; geographic concentration visible | Hardware supply chain |
| 19 — The People | Put human responsibility over the technical lifecycle | data workers, researchers, engineers, deployers, domain owners, safety/eval teams and public institutions mapped to the decisions they make | Accountability overlay |
| 20 — AGI, ASI and the Frontier | Separate current narrow systems from debated future categories | current demonstrated capabilities → unresolved generality tests → hypothetical AGI/ASI; uncertainty increases rather than a guaranteed progress arrow | Frontier/uncertainty halo, not a current component |
| Final synthesis | Let the reader reconstruct the complete system from physical substrate to consequence | supply chain + energy/data centre + chips → data/training/model → product/context/retrieval/tools → inference/output/action → evaluation/human/public feedback, with training and use-time paths visibly distinct | Completed AI system map |

## Current bounded proof

- The nine CSS teaching figures previously rendered in Chapters 1–9 are rejected.
  Their maker and independent-review PASS claims are invalid and provide no
  production or derivative authority.
- The reader build must render zero of those figures while preserving the vetted
  manuscript, reader hierarchy, navigation, responsive behaviour and nonvisual
  teaching structure.
- The section-level inventory decides `VISUAL` or `NONE` for every numbered
  section. It is not a visual quota.
- The only permitted production proof is **Chapter 1.1**: one professionally
  illustrated and annotated email-filter scene, built as a textbook learning
  aid rather than a flowchart, that distinguishes a human-written rule from a
  learned-pattern path. Research two to four
  authoritative educational examples first; then produce one original asset,
  inspect its exact pixels in the real desktop/mobile reader and obtain a
  role-distinct artifact-first visual judgment.
- A 16:9 Chapter 1 Nano Banana composition tested at 358px wide did not retain
  readable rule-card and relationship labels. Chapter 1.1 therefore requires a
  separately composed mobile asset with the same teaching meaning; shrinking
  the desktop composition is not an acceptable mobile treatment.
- Ali rejected the 2026-08-17 pair's beige full-image background on 2026-08-18;
  it looked like a pasted vintage poster rather than part of the cool-white
  reader. That pair is superseded as visual direction even though its mechanism
  remains useful evidence. The replacement desktop and separately composed 9:16
  mobile assets use a cool-white canvas, an almost-white lavender automation
  field and an almost-white blue AI field, with warmth confined to physical
  objects. They passed maker inspection and role-distinct pixel review at 850px
  and 358px respectively, including the exact `FR33` rule-versus-pattern seam,
  character-checked labels and arrow logic. Ali approved this visual method on
  2026-08-18. Approval authorizes responsive Chapter 1.1 reader integration and
  production of the remaining admitted Chapter 1 visual need; it does not admit
  the whole book, authorize a merge or authorize publication.
- The remaining admitted Chapter 1 visual need is now built in the same approved
  method as a product cutaway: a person-written sender filter routes a matching
  store message to Promotions, while labelled `SPAM` and `KEEP` examples plus a
  new sender enter a learned-pattern gear whose output routes to Spam in the same
  inbox. The desktop asset passed maker inspection. A first portrait mobile
  asset failed role-distinct review because its essential labels became too small
  at the reader's actual 323px image width. Its sparse 9:16 successor preserves
  the mechanism, exact lettering and arrow logic and passed maker plus
  role-distinct review in the real 358px viewport. It remains pending Ali's
  acceptance; its independent pass does not authorize Chapter 2 production,
  merge, deployment or publication.
- Ali directed full completion on 2026-08-18. Produce every remaining non-`NONE`
  inventory decision chapter by chapter using the approved method. Routine
  production and responsive integration no longer pause for per-image approval;
  stop only for a genuine direction change, unresolved technical truth or a
  repeated visual failure. Full-production authority does not authorize merge,
  deployment, publication or book admission.

## Communication references used in the bounded proof

- Google Machine Learning Crash Course: reveal one causal step at a time and let
  the learner see what changes; do not inherit its assumed mathematical vocabulary.
- Microsoft Learn RAG/fine-tuning guidance: make the request-context versus
  learned-weights boundary visible; do not imply that fine-tuning is a store for
  changing private facts.
- AWS generative-AI lifecycle and inference guidance: preserve truthful sequence
  and distinguish preparation from use-time work; remove provider infrastructure
  that does not change the reader's lesson.
- IBM relationship and neural-network diagrams: use containment or connected
  layers only when the relationship itself is the lesson; replace unexplained
  node, weight and threshold jargon with the book's own staged definitions.

These references govern communication methods only. Exact manuscript text and
current primary technical sources govern the LAiDIES explanation.

## Visual acceptance

1. The maker states the question each visual answers and why prose alone is
   insufficient.
2. Every arrow, containment, sequence, loop and boundary is factually correct
   and bound to the chapter's source evidence.
3. A newcomer can explain the relationship from the visual without reading a
   hidden maker note and without inferring meaning from colour alone.
4. Labels and arrows remain legible in the actual desktop and mobile reader at
   native size and 200 percent zoom. Reuse one asset only when it passes both;
   otherwise create a separate mobile composition with the same meaning rather
   than shrinking a horizontal image into an unreadable poster.
5. Caption and equivalent prose preserve the lesson when the image is absent.
6. The exact rendered pixels receive maker inspection and role-distinct visual
   judgment under the shared visual-media gate before full-book admission.

## Non-goals

- No decorative clip art, generic circuitry, floating robot heads or stock
  “woman using AI” scenes.
- No visual quota and no repeated card template.
- No provider logos where a system role is the actual lesson.
- No incorrect, pseudo or stray generated lettering, and no lettering applied
  afterward as a repair layer.
- No animation unless motion is the only clear way to teach change over time;
  the book must still provide the static and text equivalent.
