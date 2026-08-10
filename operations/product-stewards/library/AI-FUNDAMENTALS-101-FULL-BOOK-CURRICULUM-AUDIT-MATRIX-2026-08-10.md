# AI Fundamentals 101: full-book curriculum audit matrix

**Status:** RESEARCH CANDIDATE / READY FOR WHOLE-BOOK CURRICULUM AUDIT / NOT
DRAFTING AUTHORITY
**Date:** 2026-08-10
**Governing research:**
`AI-FUNDAMENTALS-101-FULL-BOOK-RESEARCH-2026-08-10.md`

## How to read this matrix

- `ORIENT` means the reader gets enough plain context to recognise a term and
  know where it belongs. It is not tested as a mechanism.
- `TEACH` means meaning, mechanism, example, relationship, consequence and
  application are complete enough to assess.
- `DEEPEN` adds technical operation only after the core explanation exists.
- `RETRIEVE` names a later chapter that must make the reader use the idea
  again rather than merely mention it.

No activity may assess a term above the state this route has earned.

## Complete route

| Unit | Prerequisites available before the unit | ORIENT here | TEACH here | DEEPEN here | Reader proof and later retrieval |
| --- | --- | --- | --- | --- | --- |
| Introduction: Why this matters to you | none | the book's full technical, practical and civic journey | why AI understanding improves use, judgment and participation | none | Reader names one personal reason to continue. Not reward-eligible: this is purpose, not concept evidence. |
| 1. The many things people mean when they say “AI” | Introduction only | recognition, prediction, recommendation, generation, multimodal, agentic, embodied, rule-based, machine learning, specialised, general-purpose, AGI and ASI; old research idea versus new product wave | AI as a broad field; why unlike labels answer different questions; evidence status `current / disputed / hypothetical`; timeline distinction `idea / breakthrough / scale and access / popular label` | none | **Explain:** why generative and multimodal are not competing boxes. **Draw:** a simple landscape with later chapter destinations, not a taxonomy. **Use:** sort familiar claims by the question they answer. **Retrieve:** Chapters 3, 6–8, 10 and 14. |
| 2. What happens after you ask an AI product for something | AI landscape orientation | provider, cloud, accelerator, model serving | person/purpose; product/interface; input; surrounding software; model as one reusable component; device; network; server; processor; working memory/storage; data centre; output; possible action; human/institutional consequence; model/product/provider/company distinctions | CPU versus GPU/accelerator job; local versus remote processing; storage versus working memory | **Draw:** current request from person to hardware/software/model and back. **Explain:** why product and model are not synonyms. **Use:** trace a familiar AI interaction. **Retrieve:** every later chapter; especially 5, 9, 10 and 13. |
| 3. Rules, search, optimisation and machine learning | AI field; complete product/system path | symbolic AI, expert systems, reinforcement learning | explicit rules; knowledge representation; search; planning; optimisation; machine learning; supervised and unsupervised learning; why AI is larger than ML | reinforcement-learning agent, action, state and reward at a bounded mechanism level | **Compare:** fixed rule versus learned pattern on two cases. **Draw:** where each approach sits inside the broader field. **Use:** choose an approach for an unfamiliar bounded task and justify it. **Retrieve:** Chapters 4–6 and 10. |
| 4. How training turns examples into a reusable model | model; ML; supervised/unsupervised orientation | checkpoint, validation set, distribution shift | data/example; label/target; feature; objective; error/loss; parameter/weight; adjustment loop; training versus evaluation versus inference; generalisation; memorisation; overfitting; shortcut | optimisation/update step; train/validation/test separation; uncertainty about what training data can support | **Sequence:** examples → result → error → adjustment → repeat. **Explain:** training versus using the trained model now. **Use:** diagnose overfitting or a shortcut in a new case. **Retrieve:** Chapters 5–7, 11 and 12. |
| 5. Neural networks, deep learning and foundation models | model; parameters; training loop; generalisation; hardware path | architecture, pretraining, fine-tuning, post-training | neuron/unit as a simplified computational part; layer; learned representation; neural network; deep learning; token; embedding; transformer; foundation model; general-purpose model | attention; architecture versus learned parameters; pretraining, fine-tuning and post-training; compute/memory/network scaling | **Draw:** input representations moving through layers to an output. **Explain:** architecture versus parameters. **Use:** explain why one foundation model can support several products without becoming the complete product. **Retrieve:** Chapters 6–10, 13 and 14. |
| 6. Recognition, prediction, ranking, recommendation and decisions | data; model; training/inference; representations | NLP and computer vision as fields/application areas | perception; classification; recognition; detection; forecasting; scoring; ranking; recommendation; decision support; planning/optimisation/control; predictive AI as a loose broad label; probability/uncertainty; threshold | calibration; precision/recall at an intuitive level; false positive/negative trade-off | **Compare:** score, rank, recommend and decide in one ordinary service. **Explain:** uncertainty and threshold. **Use:** choose the consequence of a false positive/negative in a new case. **Retrieve:** Chapters 8, 10, 11 and 14. |
| 7. How generative AI creates new content | model; neural network; training/inference; token/representation; probability | generative text, image, audio, video and code families | derived/new synthetic content; generation versus retrieval; language model; next-token selection; probability distribution in plain terms; decoding as choice from possibilities; variability; fluency without truth guarantee | temperature and sampling with product-specific caveat; image generation/diffusion at a bounded conceptual level | **Sequence:** current text → possible next pieces → selection → changed next step. **Explain:** new content versus looked-up content. **Use:** diagnose why a polished generated answer can be novel and wrong. **Retrieve:** Chapters 8–12 and 14. |
| 8. Multimodal and embodied AI | task families; representations; generative and predictive mechanisms; complete product path | encoder/fusion; robot-learning detail | modality as a form of information; input versus output modality; multimodal model/system/product; connecting modalities; sensor; actuator; embodied AI; physical feedback; why multimodal/embodied are cross-cutting capabilities | representation alignment/fusion; perception-action loop; latency and physical safety consequence | **Draw:** multiple information forms entering one system and a separate physical feedback loop. **Explain:** why a text-in/image-out product is not necessarily the only meaning of multimodal. **Use:** classify an unfamiliar product without treating modality as its job. **Retrieve:** Chapters 9–11 and 13. |
| 9. What information reaches the model this time | product/model distinction; inference; tokens/representations | grounding; external knowledge source | user prompt/input; system/developer instruction; selected conversation history; attachment; context; context window; retrieval; RAG; product memory; parameter knowledge; visible/stored/retrievable/actually supplied distinctions | chunking/selection; retrieval quality; context limits; memory write/read governance | **Trace:** what was visible, stored, retrieved and actually supplied. **Explain:** training knowledge versus current context versus memory. **Use:** diagnose a missing-context failure. **Retrieve:** Chapters 10–12. |
| 10. Tools, workflows and agents | model output; context; product software; permissions; planning | orchestration; autonomy as a contested degree rather than a magic switch | tool; API/connector; permission/authentication; request versus execution; observation/result; automation; workflow; agentic system; goal; plan/next step; state; agent loop; stopping condition; human checkpoint; action record | dynamic model-directed control versus fixed code path; compounding error; least privilege and bounded autonomy | **Draw:** goal → next step → tool → observation → adjustment → stop/escalate. **Explain:** why an agent can stop and still be agentic. **Use:** place permissions and human checkpoints in a new workflow. **Retrieve:** Chapters 11–14. |
| 11. Why AI fails and how people evaluate it | all model/product/context/tool mechanisms | benchmark limits; red teaming | error; uncertainty; hallucination; bad or shifted data; context, retrieval, tool, workflow, interface and deployment failure; accuracy; reliability; robustness; calibration in ordinary meaning; fairness; safety; evaluation; monitoring; correction | benchmark construction; distribution shift; subgroup analysis; adversarial testing; confidence versus calibration | **Locate:** same visible problem arising from different layers. **Explain:** accuracy versus reliability and why one benchmark is not real-life proof. **Use:** choose evidence and correction for an unfamiliar failure. **Retrieve:** Chapters 12–14. |
| 12. Data, privacy, security, ownership and access | complete data/context path; failure/evaluation; permissions | provenance standards and jurisdiction-specific rights as dated treatments | collection; processing; storage; retention; deletion; sharing; possible training use; personal/confidential information; privacy; security; access control; prompt injection at user level; provenance; copyright/ownership questions; open source/open weight/source available/closed distinctions | threat boundaries; data poisoning; model extraction; licence and policy variability | **Draw:** one piece of information across current use, storage, retrieval, sharing and possible training. **Explain:** why those are separate events. **Use:** identify product-specific facts to check before sharing. **Retrieve:** Chapters 13–14. |
| 13. The AI ecosystem: who builds, supplies, governs and pays for it | full technical system; data/rights; evaluation | supply-chain detail that changes quickly | model labs; product companies; cloud providers; chip designers; manufacturers/foundries; data-centre operators; researchers; data/content workers; deployers; governments/standards bodies; affected communities; compute; energy/water; concentration; access; incentives | training versus inference resource demand; bottlenecks; market and institutional feedback | **Draw:** organisations and physical infrastructure around the technical system. **Explain:** who controls which decision. **Use:** trace one product choice to workers, resources and affected people. **Retrieve:** Chapter 14. |
| 14. Work, society and future claims | complete technical and institutional map | current forecasts, laws and product claims only as dated evidence | task versus job; automation versus augmentation; adoption/deployment decision; accountability; contestability; governance; participation; confirmed evidence versus forecast/marketing; AGI definitions and disagreement; transfer/breadth/reliability/autonomy dimensions; ASI as hypothetical superintelligence; why current breadth is not proof of AGI | competing AGI evaluation proposals; future-claim uncertainty; environmental/social trade-offs | **Explain:** AGI to a friend using the complete map, one example and the live disagreement. **Draw:** what a broad-capability claim would need to establish. **Use:** evaluate an unfamiliar workplace or public proposal and name the evidence still needed. No prediction is rewarded as certainty. |
| Concept Index | chapter teaching exists | synonyms, adjacent terms and direct routes | one-line orientation plus canonical chapter/anchor; common confusion only where useful | none | Lookup never counts as teaching. Every entry routes to the chapter mechanism, application and freshness record. |

## Cross-book understanding proof

At the end, a reader should be able to reconstruct this connected journey
without copying the book:

1. a person or organisation has a purpose and uses a product;
2. the product gathers current information and calls software, models and
   physical computing infrastructure;
3. models may have been built with different AI approaches and training
   methods;
4. the system performs one or more task families and may generate, retrieve,
   use tools or act physically;
5. context, memory, permissions, workflow and people shape what happens;
6. failures can arise at different links and require different evidence and
   corrections; and
7. organisations, markets, resources, rules and affected communities shape
   the consequences and future decisions.

The final application gives the reader an unfamiliar AI product or proposal
and asks her to mark what is present, what is absent, what is unknown, what can
change, who controls each part and what evidence she would request.

## Audit questions

1. Does any `TEACH` or `DEEPEN` item depend on a concept not secured earlier?
2. Does Chapter 1 orient the language people encounter without becoming a
   flat taxonomy or pretending orientation is mastery?
3. Are all durable AI approaches represented, rather than treating AI as only
   machine learning or only predictive/generative systems?
4. Do hardware, product software, organisations and human consequences remain
   connected to the model rather than becoming optional appendices?
5. Does every chapter add one part to the same reconstructable system?
6. Does every activity test the mechanism actually taught, provide reasoned
   feedback and route an unmet link back to its explanation?
7. Does later retrieval revisit every foundational concept that future
   chapters depend on?
8. Are AGI and ASI explained first for orientation, then revisited only after
   the reader can understand the technical and evidentiary dispute?
9. Is any concept missing, duplicated as a second truth or placed mainly
   because a source happened to introduce it there?
10. Can the reader Draw it, Explain it and Use it without the answer being a
    memorised definition?

## Current hold

This matrix is ready for an independent whole-book curriculum audit. It does
not authorise prose. Any audit finding changes this matrix and the research
route before a Chapter 1 producer contract is created.
