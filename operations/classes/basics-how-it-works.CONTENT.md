# How these tools actually work
*SUNNYVAiLE High · The Basics. Teaching content. Plain teaching carries; analogy garnishes. Pairs with “What these tools are, and what they’re for.”*

**Accuracy status:** RESEARCHED REPLACEMENT — 2026-07-29
**Maintained source map:** `operations/product-stewards/learning-content-ecosystem/EPISODE-01-CONCEPT-DEFINITION-RESEARCH-2026-07-29.md`

---

Last class separated four things that are easy to blur together:

- the **product** you use;
- the **model** that processes inputs and produces outputs;
- the **context** supplied for this task; and
- any **tools** the product makes available, such as search, files or code.

This class explains the model without pretending the model is the whole
product.

## What “large language model” means

A **model** is the trained component of an AI system that turns an input into
an output. That output might be words or images, a prediction or a choice
about what to do next. Training shapes the model rather than a developer
writing a complete rule for every possible task.

A **language model** is trained to work with sequences of language. A **large
language model**, or LLM, is a language model with many learned parameters and
training at substantial scale. Some current models are also multimodal, so
they can work with combinations of text, images, audio, video or code.

“Model” and “product” are not interchangeable. A model may be offered through
an app, an API or a coding tool. A product may combine one or more models with
instructions, memory, search, files, code execution and other components.

## How training shapes a model

During training, a language model learns statistical relationships in its
training data. One important training objective is predicting a missing or
next token. Repeating that objective at scale adjusts the model’s parameters
so it can produce continuations that follow patterns in language and other
material it learned from.

That mechanism matters, but “it predicts the next word” is not a complete
explanation of the system a learner is using. Tokens are not always whole
words, current models can work across several kinds of input and output, and a
current product can call tools, route among components or make more than one
model pass before returning a response.

## What happens when you ask

Use this map:

1. You make a request in a product.
2. The product supplies instructions and the context available for that task.
3. A model processes that input and produces an output or a next action.
4. If tools are available, the system may search, inspect a file, run code or
   perform another bounded action, then place the result back into the
   context.
5. The system returns a response through the product.

This is why the same request can behave differently across products, models,
settings, tools and account plans.

## What “reasoning” changes—and what it does not

Some current models and product modes spend more computation on a task before
returning an answer. A system may generate intermediate steps, use tools,
compare candidates or apply a verifier. These approaches can improve
performance on some multi-step tasks.

Do not teach “it checks itself” as a guarantee. A reasoning mode can still
make an error, use a weak source, misunderstand the request or confidently
present unsupported content. Better task performance is not the same thing as
automatic factual verification.

## Generation, retrieval and evidence

Generative AI produces content from a request and the material supplied for
the task. Retrieval or search brings existing material into that task.
Current products can combine both.

That combination is useful: the model can explain or transform retrieved
material. It still does not turn every returned claim into a fact. The source
may be weak, stale or misread, and the model may add an unsupported statement.
For consequential claims, open the source and check whether it actually
supports the claim.

## The one thing to carry out of here

The model is one component, not the whole product. It can produce an
impressively useful response without possessing lived judgment or guaranteed
access to the truth.

Keep the map:

**request → product instructions and context → model → optional tools → response**

Then keep the habit:

**the model matters; so does everything around it. Important claims still need
evidence.**
