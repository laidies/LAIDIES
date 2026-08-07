# Model: the trained part that produces the answer

**Governing reader question:** What is a model, and why does it matter which part of an AI system I am looking at?

## Plain answer

An AI **model** is the trained part of a larger system that turns input into output. In a writing assistant, a language model receives the material the product sends it and generates a response. The model is not the whole app, does not control every feature around it and does not automatically have access to the internet, your files or your account.

This distinction matters because “the AI got it wrong” does not tell you what to fix. The problem might be the model, but it might also be missing instructions, old source material, a failed search tool or a product setting.

## How the answer is produced

Before you use it, training adjusts the model's internal parameters so it can reproduce useful patterns from examples. During your request, the product assembles the material available for that task—such as your prompt, its own instructions, earlier conversation, an attached file or a retrieved passage—and sends that input to the model. The model then produces an output from those learned patterns and the current input.

That gives us three different moments:

1. **Before this task:** training shaped the model.
2. **During this task:** the product selected what reached the model.
3. **After generation:** a person decides whether the output is supported and usable.

The model can produce a clear answer without proving that the answer is true. Fluent generation and factual verification are different jobs.

## Worked case: the handover email

You ask an AI product to draft a client handover email. You attach your notes and the current service policy.

- The **product** receives your request, holds the conversation and decides which files or tools are available.
- The **model** uses the input it receives to generate the draft.
- A **retrieval tool**, if enabled, may fetch the policy—but the model alone does not guarantee that the tool was used or that it found the right version.
- **You** check the new contact, date and commitments against the authoritative notes and policy before sending.

If the draft invents a twelve-month price guarantee, changing to another model might not fix it. First ask: did the current policy reach the model, did it actually support that promise, and did the product expose the right source? The repair must match the failed part.

## Model, product and tool are not synonyms

| Term | What it does | What it does not prove |
| --- | --- | --- |
| **Provider** | Develops or operates models and products. | That every product from the provider behaves the same way. |
| **Product or app** | Supplies the interface, account rules, instructions, context and available features. | That the selected model has live or complete information. |
| **Model** | Transforms the input it receives into an output. | That the output is current, supported, permitted or correct. |
| **Tool** | Lets the system fetch, calculate, inspect, run or act beyond generation alone. | That the source was good, the action was safe or the result was verified. |

## Why you care

Knowing the layer gives you a better next move:

- Wrong format or tone? Repair the brief or instruction.
- Missing or stale fact? Supply the current authoritative source.
- No search, calculation or file access? Check whether the product has the required tool and permission.
- Unsupported claim? Verify it outside the generated answer.
- Risky action? Reduce access, add a checkpoint or keep the system in draft-only mode.

## A useful analogy—and its limit

Think of an AI product as a radio. The **model** is part of the machinery producing the sound; the **product controls** choose the station, volume and available inputs; a **connected tool** adds a new signal. This helps separate the component doing the generation from the controls and connections around it.

**Where the analogy stops:** a model is not receiving one fixed broadcast. It generates an output from learned parameters and the input supplied for this request. The radio comparison explains the layers; it does not explain training, generation, truth or human judgment.

## Use it now

When an AI result disappoints you, finish this sentence before changing anything:

> “I think the failure is in the ______ layer because ______. The smallest matching repair is ______.”

If you cannot name the layer yet, check what material the product supplied, which model or mode it used, which tools ran and what evidence supports the output.

## Recap and explain-back

**In one sentence:** the model generates the answer, while the product controls what surrounds the model and tools add capabilities the model does not have on its own.

Explain this example to someone else: an AI app produces a confident answer from an obsolete policy even though web search is available. Why could the model, product, tool and human-check layers each still matter?

## Sources, currentness and limits

- OECD.AI, “What is AI? Can you make a clear distinction between AI and non-AI systems?” Used for the distinction between an AI system, its model, inputs and outputs. Checked 6 August 2026. A policy definition does not describe every product interface.
- OpenAI, “How ChatGPT and our foundation models are developed.” Used as one provider's description of training, parameters and generation. Checked 6 August 2026. It is an example, not a universal contract for every provider.

Recheck this section before public release if the definition contract changes, a product-specific claim is added, or newcomer evidence shows that model and product are still being collapsed together. To report a correction, email `hello@laidies.ai` with the subject “Concepts 101 correction”; name the section and a public source, and do not send private material.

## Continue only if it helps

- Open **Briefing 101** when the job or output shape is the problem.
- Open **How to Check AI's Work** when a consequential claim needs evidence and that book is admitted for reading.
