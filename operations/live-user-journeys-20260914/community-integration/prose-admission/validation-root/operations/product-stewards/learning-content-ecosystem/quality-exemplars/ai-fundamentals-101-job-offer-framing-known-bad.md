# AI Fundamentals 101

## Introduction — What you are actually using

You ask an AI product to compare two job offers. It gives you a neat recommendation in seconds. Before one polished paragraph influences the next two years of your life, you need to know what happened between your question and that answer.

You did not consult one all-knowing thing. You used an **AI system**: the whole working arrangement that received your request and produced the result. That arrangement includes the product you opened, the instructions and material available for this task, at least one trained model, and the software that presents the answer. Some systems can also search, calculate, retrieve documents or take actions. The exact arrangement varies from product to product.

The **model** is an important part of that system, but it is not the whole system. It is the trained component that processes input and produces an output. The product and surrounding software shape what reaches it, which other capabilities are available and what you eventually see.

That distinction matters because an answer can fail in different places. The model may generate a false claim. The right document may never reach the model. A search may return an old policy. A tool may not have permission to open the file. The product may hide which source supported a sentence. Or the answer may be accurate while still being wrong for *your* priorities.

This book will help you find the weak part instead of blaming “AI” as though it were one indivisible object. Read the chapters in order to build the complete picture. Use the separate Concept Index when you need to look up one term—such as token, context, memory, routing or agent—and then jump to the chapter where that term does real work.

We will begin with one decision and follow it all the way through. Nothing floats around as a loose definition. Every part earns its name by changing what happens next.

## Chapter 1 — One request, from question to decision

### The real question is bigger than the prompt

Imagine that you have two job offers.

Northstar pays $12,000 more per year and expects three days a week in the office. Juniper pays less, is remote-first and promises more flexibility. You also help your father get to physiotherapy on Tuesday evenings, you want enough income to stop worrying about every surprise bill, and you do not want your working week to swallow the rest of your life.

You open an AI chat, attach both offer letters and write:

> Compare these two offers and tell me which one is better.

The product replies that Northstar is the stronger choice because it pays more and has a more senior title.

That answer is tidy. It is also answering a smaller question than the one you actually have.

Your real question is not “Which offer has the largest salary number?” It is “Which offer gives me the better life over the next two years, given my money needs, family responsibilities and appetite for risk?” The system cannot weigh those priorities unless you make them available for this task.

This is the first lesson of the whole book: the quality of an AI result depends on more than the wording of one prompt. It depends on what the system is trying to help you do, what information reached it, what operations ran, what the model produced and what you checked before acting.

### What the product actually received

Start with the product—the app or service you opened.

The product received your sentence and the two files you attached. It did not automatically receive every fact that matters to you. It did not know about Tuesday physiotherapy. It did not know how much commuting you can tolerate. It did not know that Juniper’s pension and health benefits are explained in a separate benefits guide that you forgot to attach.

The information available to the system for this run is its **context**. Context can include your current message, parts of the conversation, attached material, instructions supplied by the product and information returned by a search or another tool. What enters context depends on the product and the task. “It was somewhere in my account” does not prove it reached this answer.

In this case, the missing benefits guide is not a small technical detail. It contains five additional vacation days, an employer-paid health plan and the date pension contributions begin. Those facts could change the comparison. The system cannot read the benefits PDF by osmosis.

So the first recommendation did not come from the complete decision. It came from the smaller package of information that actually reached the system.

### What the model did

Inside the wider system, a trained model processed the available input and produced the comparison.

The model had been trained before you arrived. Training shaped the patterns and parameters it uses to produce outputs. Your two offer letters did not retrain it. They supplied current material for this particular run.

When you sent the request, the model used that current material during **inference**—the stage when a trained model produces an output from new input. For a language model, that output is generated text. Other kinds of models can classify, predict, rank, detect or recommend instead.

The model could organise the salary, title and office requirements it received. It could infer a comparison that sounded reasonable. But it could not faithfully compare a benefits guide that was absent. It could not know a private priority you had not expressed. A confident sentence does not repair missing evidence.

Notice what did *not* happen: the model did not independently wander through your computer looking for the rest of the paperwork. It worked with what the surrounding system made available.

### What changes when the system can fetch something

Some AI systems can use capabilities beyond the model itself. Surrounding software may retrieve a document, search an approved source, calculate a figure or ask another service for current information. People often call these capabilities **tools**.

Suppose the product can request a current commute estimate from a mapping service. The model can indicate that the estimate would help. The surrounding software makes the request, receives the result and adds it to the working material. Depending on the product and the operation, that step may run automatically or wait for your confirmation. The model can then produce a revised comparison using the result.

This matters for two reasons.

First, the model and the tool are different parts of the system. The model produces language and may request an operation; the surrounding software performs the operation under whatever permissions and limits the product allows.

Second, a tool result is new input, not automatic truth. A commute estimate depends on the route, time of day and source. A retrieved policy may be current, old or unrelated. The reader still needs to inspect the consequential evidence.

Not every AI product has the same tools, and not every available tool runs on every request. The useful question is not “Does this AI have tools?” It is “What operation actually ran for this answer, and can I inspect what came back?”

### Repair the missing part, not the confidence

You now revise the task.

You attach Juniper’s benefits guide. You state that Tuesday evenings are non-negotiable, that you can accept the lower salary if the total package is strong, and that time lost to commuting matters. You ask the product to show the evidence behind each comparison instead of giving you one unexplained winner.

The system retrieves a current commute estimate for Northstar’s required office days. The revised answer now shows the trade-off:

- Northstar pays more, but the commute takes roughly six hours from your week and its health coverage starts later.
- Juniper pays less, but returns more time, includes the additional vacation days and better matches your Tuesday commitment.
- The pension details still need confirmation because the benefits guide describes eligibility generally, not your individual start date.

The answer changed because the working material changed. It is not proof that Juniper is objectively “the better job.” It is a better comparison of the decision *you* are making.

This is the repair pattern to remember. When an AI answer is weak, do not begin by asking it to sound more certain. Find the weak part of the system.

If the goal is vague, define the decision. If essential material is absent, add it. If a claim depends on a current fact, retrieve and inspect that fact. If the model’s output is unsupported, ask for evidence or use a more suitable method. If an action carries consequences, check the permission and keep the decision with the responsible person.

Several parts can be weak at once. The method is a diagnostic, not a promise that every failure has one tidy cause.

### The output is not the decision

The product has now returned a more useful output. It has organised the offers, exposed important differences and marked one unresolved point.

It still cannot decide what six hours of weekly commuting are worth to you. It cannot know whether Juniper’s manager will honour the flexibility described in an interview. It cannot accept legal or financial responsibility for the choice. And it cannot verify your individual pension eligibility unless you obtain the relevant terms from an authoritative source.

Those are not defects that a more eloquent paragraph can solve. They are evidence, authority and judgment boundaries.

Before you rely on the result, ask four questions:

1. **What decision am I actually trying to make?** If the system solved a narrower problem, restate the real one.
2. **What information did this answer actually use?** Check the messages, files, dates and missing facts that mattered.
3. **What current source or operation supports the consequential claims?** Inspect the returned evidence; do not treat fluency as a citation.
4. **What must remain my decision or another person’s responsibility?** Name the value judgment, permission or professional check that cannot be delegated.

That is the map we will use throughout this book:

**your goal → the product and available context → the trained model → any retrieval or tools → the output → evidence checking and human decision**

It is a practical map, not a claim that every AI system is built identically. Its purpose is to help you locate what changed, what failed and what to do next.

Later chapters will open each part carefully: how models are trained and run; how tokens and context windows affect what fits; how session and memory differ; what retrieval, tools, permissions, routing and wrappers add; how agents and multi-step loops work; and why convincing answers can still fail. The Concept Index will let you find any one term without turning the book itself into a dictionary.

For now, hold on to the most important distinction: the model is one component, the product is what you use, and the result comes from the whole system plus the evidence and judgment you bring to it.
