# What you are looking at: app, model, tools and context

**SUNNYVAiLE High · The Basics · Cycle 5 teaching candidate**

**Status:** HELD — repaired 2026-07-26; not filmed, admitted or approved.

**Learner:** someone who can open a conversational AI product but does not yet
have a dependable mental model of its parts.

**Objective:** distinguish the app from the model and optional services it can
use, trace what becomes working context, and decide what must be verified.

## The useful mental model

When you open ChatGPT, Claude or Gemini, you are using a product, not touching a
model by itself.

- **The app or assistant** is the product around the experience: interface,
  account, settings, instructions, conversation history, permissions, limits
  and any connected capabilities.
- **The model** is the trained component that turns an input into an output.
  It may produce words or images, interpret material, make a prediction or
  choose a next action; “just a text engine” is not a safe description.
- **Tools and retrieval** are optional capabilities the product may make
  available: web search, file handling, code execution, function calls or
  connected services. Availability varies by product, account and setting.
- **Context** is the information made available for this task: your request,
  relevant conversation, instructions, files or selected results from tools.
  Context is not the same as verified truth.

A compact request flow is:

`request → app instructions/context → model → optional tool call/result → response`

The product may repeat parts of that flow. It may ask the model to choose a
tool, add the result to context, and ask the model to answer. A polished answer
does not reveal which parts were generated, retrieved or checked unless the
product shows that evidence.

## Search and generation can overlap

“Search finds; AI writes” is too simple for current products. Conversational AI
apps can search the web, open connected information and cite sources. Search
adds evidence to the working context; the model still interprets and explains
it. A citation is a route to inspect, not a correctness guarantee.

Ask three questions when current or consequential facts matter:

1. Did the product use a current source?
2. Does the source actually support this specific claim?
3. Is the source responsible and recent enough for the decision?

## What changes between products

Two apps can expose similar models while offering different search, memory,
file, privacy, price or usage features. Conversely, one app can switch among
models. Keep **model capability**, **product feature** and **account
entitlement** separate.

“New chat” also does not guarantee “nothing persisted.” A product may supply
saved instructions or memory according to its controls. Do not claim that a
model can see every past chat, file or connected service; access depends on
what the product deliberately supplies and permits.

## Demonstration the tape must show

Use one current product and one harmless, checkable question.

1. Ask without search. Mark the generated answer and any uncertainty.
2. repeat with the product's visible search feature enabled.
3. Show the search state and source links at the exact moment narration names
   them.
4. Open one cited source and compare it with one claim.
5. Name what changed—retrieved evidence entered the flow—and what did not—the
   learner still had to verify support.

The screen capture must be recorded after the route is checked. Any interface
claim receives a checked date and a 30-day recheck date.

## Analogy, then its limit

Think of the product as a studio, the model as one performer, and tools as
equipment the studio may make available. The picture helps separate the cast;
it is not a technical blueprint. Return to the request-flow diagram for the
actual mechanism.

## Apply it

For a task on your own list, write down:

- what you want the model to produce;
- what context the app must supply;
- which optional tool would help;
- which claim or outcome still needs verification; and
- what private information should not be supplied.

## Explain it back

Complete this sentence without using the studio analogy:

> An AI app is more than a model because …

A good answer names the app's context and optional tools, and says that neither
fluent generation nor citations remove the need to verify important claims.

## Misleading-claim resistance

Hold or correct explanations that say:

- “today's AI only handles text”;
- “conversational AI never searches or uses tools”;
- “a new chat cannot receive saved information”;
- “the model automatically sees everything you can access”; or
- “citations prove the answer is correct.”

## Currentness and source trail

Checked 2026-07-26; recheck product-capability claims by 2026-08-25 and again
before recording.

Core definitions reconciled 2026-07-29 against NIST AI 600-1, NIST AI
100-2e2025 and the OECD AI-system explanatory memorandum. The detailed source
map is
`../product-stewards/learning-content-ecosystem/EPISODE-01-CONCEPT-DEFINITION-RESEARCH-2026-07-29.md`.

- OpenAI, *ChatGPT Search*: <https://help.openai.com/en/articles/9237897-chatgpt-search>
- OpenAI, *Apps in ChatGPT*: <https://help.openai.com/en/articles/11487775-connectors-in>
- OpenAI, *Memory FAQ*: <https://help.openai.com/en/articles/8590148-memory-faq>
- Anthropic, *Enabling and using web search*: <https://support.anthropic.com/en/articles/10684626-enabling-and-using-web-search>
- Google, *Gemini API tools*: <https://ai.google.dev/gemini-api/docs/tools>
- Google, *Image understanding*: <https://ai.google.dev/gemini-api/docs/image-understanding>

These sources establish current examples, not permanent equivalence among
products. Interface, availability, names and limits remain volatile.
