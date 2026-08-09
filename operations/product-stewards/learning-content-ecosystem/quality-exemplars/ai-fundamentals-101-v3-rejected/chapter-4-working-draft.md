# AI Fundamentals 101 — Chapter 4 working draft

**Status:** PRESERVED WORKING MATERIAL — OUTSIDE THE INTRODUCTION–CHAPTER 3 REVIEW CANDIDATE

This material was produced under the earlier route when current information was
Chapter 3. It is preserved so no work is lost, but it must be reconciled to the
final nine-chapter outline and a current producer contract before it becomes a
review candidate.

## Chapter 4 — What information does an AI use when you ask it something?

You are six messages into a conversation. The product can display every word
above the reply box. Then it asks for the project name you gave it in message
two.

Excuse me?

The natural conclusion is that the AI has forgotten. Sometimes that is a useful
description of the experience. It is not yet a diagnosis.

The project name might still be visible in the interface but absent from the
material supplied to the model for this response. The product might have
summarized earlier turns and dropped the detail. A new session may have begun.
A saved memory may exist but not apply here. A retrieval step may have searched
the wrong source. Or the name may be present and the model may still fail to use
it correctly.

To tell those apart, we need to stop treating all forms of “the system has my
information” as the same thing.

### The working desk at the LIBRAiRY

Picture Miss Jeeves at the LIBRAiRY reference desk.

The building contains shelves of books. The catalogue can help her locate more
material. Your prior conversation is in the desk log. A saved note may say that
you prefer the plain-English edition. For one question, however, only a bounded
set of pages is open on the working desk.

That scene gives us one map:

- **The working desk** is the current context: the material supplied for this
  response.
- **The size of the desk** is the context window: the bounded token space
  available to the model.
- **The desk log** is conversation or session state maintained by the
  surrounding product.
- **The saved patron note** is product memory that may be supplied again later.
- **The catalogue fetch** is retrieval: finding material elsewhere and bringing
  selected results into the current work.
- **Everything else in the building** may be stored or available without being
  on the desk for this answer.

The analogy stops before it becomes misleading. A model is not a librarian. It
does not independently understand which source has authority, and it may use
the material on its “desk” unevenly or incorrectly. The product—not the model
alone—decides how history, memory, files and retrieval are assembled.

Now let us return to the real system.

<a id="context"></a>
### Context is what the model receives for this use

**Context** is the information made available to the model while it produces a
particular output.

Depending on the product, context may include:

- system or developer instructions you do not see;
- your current prompt;
- selected earlier messages and model replies;
- text extracted from an attached file;
- saved preferences or memory supplied by the product;
- results returned by search, retrieval or another tool; and
- descriptions of tools the model may request.

Context is not the same as everything visible on screen, everything stored in
your account or everything the provider possesses. It is the working package
for this use.

That package is assembled by surrounding software. A chat interface might send
the complete recent conversation, selected turns, a summary of older material
or some combination. A file feature might extract text rather than give the
model the original document exactly as you see it. A product can change those
choices over time.

This is why “but it is right there in the chat” can be both emotionally correct
and technically inconclusive.

<a id="context-window"></a>
### The context window is a limit, not a promise

A **context window** is the bounded amount of tokenized material a model can
reference while generating a response. The exact size depends on the model and
product. Input and generated output can both consume that capacity, depending
on the implementation.

A larger window means more material can fit. It does not guarantee that every
detail will be noticed, weighted correctly or used faithfully. Research and
provider documentation describe models using some information in long contexts
less reliably than other information. More pages can help, but “attach the
entire drive and hope for emotional maturity” is not a context strategy.

When a conversation or document set grows, a product may omit older material,
summarize it, retrieve selected parts or use another form of context management.
The interface does not always show that assembly process.

For consequential work, identify the few facts the answer must use and make
them explicit near the current request. Do not rely on a crucial instruction
surviving somewhere in a very long chat.

<a id="chat-history"></a>
### A chat history is not one continuous mind

A **conversation** or **session** is the surrounding product’s way of organizing
an interaction across turns. The product may preserve messages and pass prior
state forward automatically. An API can also require software to send the
history again or link a previous response to the next request.

The smoothness of the conversation can create a powerful impression of one
continuous presence. Technically, each model response still depends on the
input assembled for that inference.

The chat can remember the scroll position and still lose the plot.

This does not make conversation state fake. It makes it a product feature with
specific behaviour, storage and limits—not proof of human-like memory inside
the model.

<a id="product-memory"></a>
### Saved memory is information the product may supply again

Some AI products offer a **memory** feature. A product may save selected facts,
preferences or summaries separately from the visible chat history and use them
in future response context.

For example, a product might retain that you prefer Canadian spelling or that
your business is called North Star Studio. On a later request, the surrounding
system can add that note to the context. The model can then use it without you
typing it again.

The useful mechanism is not “the model knows me now.” It is: **the product
stored information and supplied it for this response**.

That distinction reveals the right questions:

- What can be saved?
- Is memory on for this account and conversation?
- Can you inspect, correct or delete it?
- Is a saved item actually being supplied here?
- Is it appropriate to retain this information at all?

Answers vary by product, plan, account and date. A memory control described in
this book today could change. The durable concept is the separation among
storage, selection and current use.

<a id="retrieval"></a>
### Retrieval goes out to get something

**Retrieval** is different again. Instead of relying only on information
already in the model or current conversation, surrounding software searches a
collection and brings selected material into the current task.

The collection might be a company knowledge base, a folder, a website index or
another approved source. Retrieval-augmented generation—often shortened to
**RAG**—combines a trained language model with information retrieved after
training.

<a id="embeddings"></a>
One common retrieval method uses **embeddings**. An embedding turns a passage,
image or query into a set of numbers that represents useful features. Items
with related meanings can then sit near one another in that mathematical
space. A **vector search** compares those representations to find passages
that may be relevant even when they do not repeat the query's exact words.

That is useful when a leave policy says *birth parent* and the question asks
about *maternity leave*. But mathematical similarity is not authority. The
closest passage can still be outdated, meant for another country or outside
the user's permission. Retrieval may use keyword search, metadata, vector
search or a mixture; RAG names the larger pattern of bringing selected
material into the model's current work.

Suppose you ask about the current parental-leave policy. A general language
model may contain patterns from older or unrelated policies. A workplace
product with permission to search the official policy library can retrieve the
current document and place relevant passages into context. The model can then
answer using that material.

Better, but not automatically correct.

The search may miss the right document. The index may contain an old version.
The retrieved passage may cover employees in a different location. The model
may overstate what the passage says. Your account may not have permission to
reach the authoritative source.

Retrieval improves the information available to the answer. It does not turn a
source into the right source, or an answer into a decision.

### None of this is the same as training

Context, chat history, memory and retrieval affect what is available during
use. **Training** changed the model’s parameters before this inference.

Keeping those separate prevents several common mistakes:

- Attaching a document can give the model material for the current task without
  retraining the model.
- Saving a preference can let a product supply it later without the model
  “learning you” like a person.
- Retrieving a current source can add information the model did not have at the
  end of training.
- Deleting a chat does not necessarily answer every question about separately
  saved memory, service retention or later model improvement; those are
  product-policy questions.

If privacy or confidentiality matters, check the actual product’s current data
controls and your organization’s rules. The conceptual map helps you ask the
question. It does not grant permission.

### Diagnose the forgotten project name

Return to the product that forgot your project name.

Do not begin with “Please remember harder.” Try the layers.

1. **Current prompt:** Is the project name explicit in the request that matters
   now?
2. **Conversation state:** Are you in the same conversation or session? Is the
   relevant turn still part of the material being carried forward?
3. **File handling:** Was the name inside an attachment, and did the product
   extract the relevant text?
4. **Saved memory:** Was the name saved as a reusable fact, and is that memory
   active here?
5. **Retrieval:** Does the product need to fetch a project brief, and can it
   reach the right version?
6. **Model use:** Is the name present in context but ignored or confused in the
   output?

The smallest safe repair may be to state the name again. For a recurring
workflow, the better repair may be a maintained project source or an inspected
memory setting. For sensitive information, the correct repair may be not to
put it into that product at all.

The map does not prescribe one answer. It tells you which answer you are
choosing.

### The third click

An AI product can display information, store information, retrieve information
and supply information to a model. Those are four different states.

The question that matters for the current output is:

**What information was actually available to the model for this response, and
where did it come from?**

That question is more useful than “Does the AI know this?” It leads to actions:
state the crucial fact, inspect the source, shorten the working set, correct a
saved memory, fix retrieval, check permissions or keep the decision with a
person.

And now the conversational magic has a mechanism. The product may look as if it
remembers you because the surrounding system keeps, selects and supplies
information across turns. Sometimes it does that beautifully. Sometimes it
leaves the exact page you need on a shelf across the room.

Miss Jeeves would never.

### Source notes

- [Google for Developers — context windows, grounding and retrieval-augmented generation](https://developers.google.com/machine-learning/glossary)
- [Anthropic — Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [OpenAI — Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)
- [OpenAI — Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)

Concept boundaries checked 8 August 2026. Provider memory, retention, context
capacity, file handling and conversation-state behaviour must be rechecked
before publication.
