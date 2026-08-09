---
title: AI Fundamentals 101
subtitle: Understand what AI is, how it works and what changes when people use it
candidate: LIB-AI-FUNDAMENTALS-101-V4-OPENING-PROOF-R3
status: INTERNAL REPRESENTATIVE PROOF
---

# Introduction

## Why understanding AI changes what you can do and decide

The slide says **AI-powered transformation**.

That could be brilliant. A good system might find the right policy in seconds,
help an exhausted customer-service agent untangle a messy case, or notice a
pattern no one had time to see. It could also make a confident mistake at
impressive speed. The phrase on the slide tells you none of that.

You are eleven minutes into a meeting that was supposed to explain a new
customer-service plan. So far, AI has been called a strategy, a platform, an
assistant, a productivity opportunity and, somehow, a journey. A journey to
where remains unclear. Nobody has said what the system will actually do.

Will it generate draft replies for a person to review? Decide which customer gets help
first? Search the policy manual? Offer refunds? Send them? Learn from old
complaints? Record new ones? All of those choices would produce a different
system, a different risk and a very different Tuesday for the woman expected to
run it.

Then someone asks, “Any questions?”

There are questions. There are *several* questions. The room is interested,
slightly lost and already moving to the next slide.

This book is for that moment.

It is also for the moment an AI tool produces a genuinely excellent first
draft and you feel that little electric jolt: *wait, how did it do that?* Some
results are not merely useful. They are astonishing. Your phone finds every
photo of your dog without being told what each picture contains. A tool helps
you see a pattern that was buried across thousands of rows.

Other moments produce a very different jolt. A fraud alert blocks your actual
purchase but waves through something that is very much not yours. A headline
declares that AI can reason, replace an industry, cure a disease or become
smarter than humanity before you have finished your coffee. Wonder and worry
both create the same useful question: what is actually happening here?

These things are related. They are not the same.

That distinction matters because **AI is a broad name, not a complete
explanation**. Hearing that a product “uses AI” tells you about as much as
hearing that a business “uses software.” Fine. Which software? Doing what?
Using which information? Making which decision? And who gets the call when it
goes magnificently sideways?

You do not need an engineering degree to ask those questions. You need a clear
map of what belongs inside the system, what happens between your request and
the result, and where people still make the choices that matter.

That is what we are building here.

### The shortest true answer

Artificial intelligence is the broad name for machine-based systems that take
inputs, process them and produce outputs such as classifications, predictions,
ranked lists, recommendations or new content. Some systems stop there. Others
can pass an output to software or a machine that takes an action.

That is the sturdy version. It leaves room for very different systems without
pretending they all work the same way.

Here is the part I love: a process that looks invisible starts becoming
visible. We can follow what goes in, what the system does with it, what comes
out and what the output is allowed to change. Suddenly a spam filter, an image
generator and a tool-using assistant are not a mysterious electronic soup.
They are different systems we can explore, compare and question.

A system receives something. It processes what it received. It produces
something. Then a person, another piece of software or a machine may use that
output.

Consider five ordinary examples:

- Your phone receives image data and recognises which photos probably contain
  your dog.
- Your email service receives a message and predicts whether it belongs in
  spam.
- A streaming service receives information about viewing, ranks possible next
  choices and recommends the options at the top.
- An image generator receives a request and produces a new image.
- A travel assistant receives a goal, searches available options, compares
  them and, if it has permission, may use connected tools to take actions
  across several steps.

They all fit under AI because they use machine-based processes to turn inputs
into outputs that influence what happens next. But they do not perform the same
kind of work, use the same components or deserve the same level of trust.

The photo feature recognises a pattern. The spam filter predicts a category.
The streaming service ranks options and recommends the top choices. The image
generator generates content. The travel assistant searches, compares and, if
it has permission, may use tools to take actions across several steps. Calling
all of them “AI” is not wrong. Stopping there is the problem.

### What the label does not tell you

The label does not tell you whether the system is accurate.

It does not tell you whether it is useful for this particular job. It does not
tell you what data it received, whether the information is current, whether it
can use a tool or whether a person reviews the result.

And the stakes are not equal. A poor film recommendation is irritating. A
system that works less reliably for people who were poorly represented in its
data can affect who gets flagged for fraud, considered for a job or offered a
service. When an AI output can change somebody's opportunity, money, health or
safety, the questions deserve more evidence and much less haste.

It definitely does not tell you who is responsible for the result. A machine
can produce an output. A company still decides to use it, where to put it, what
authority to give it and what happens when it fails.

This is why two conversations about AI can sound as though they are taking
place in different buildings. One person is talking about a model that produces
language. Another is talking about the product wrapped around that model.
Someone else means a multi-step system using tools. A fourth has skipped past
current products entirely and is debating AGI or ASI, ideas about much broader
forms of capability that do not have universally agreed definitions or tests.

Everybody keeps saying AI. They are not answering the same question.

We are going to make those questions visible, one at a time. First, the kinds
of AI you are already meeting. Then the parts inside a product. Then how a
model learns, what information a system can use right now, how tools turn an
answer into an action, what agentic systems add, why failures happen in
different places, where data can go and what changes beyond the screen.

There is also a Concept Index. If somebody drops *token*, *context window*,
*RAG* or *fine-tuning* into a conversation as though these were household pets
you had somehow forgotten to feed, you can look up the term directly. The index
will take you to the chapter where the idea actually makes sense. No vocabulary
wall. No memorising words before anybody has explained the thing they name.

### Three questions that make “AI” useful

For now, you need three questions.

**What result does this system produce?**

Ask to see the input and the output. In the customer-service plan, does the
system produce a draft reply, a priority score, a passage from the policy
manual or a proposed refund? “It uses AI” is not an answer. Neither is “it
improves efficiency.” Efficiency is a hoped-for result, not a description of
what the system produces.

**What does it use?**

What information goes in? Which model, rules, instructions, search results,
files, sensors or connected tools are involved? What can the system access for
this request, and what is merely stored somewhere else?

**What happens after the output?**

Does a person review it? Does software act on it automatically? Can it affect a
payment, application, schedule, diagnosis, employee or customer? Who can stop
it, correct it and answer for the result?

Return to the meeting.

The slide still says **AI-powered transformation**. The room is still nodding.
But now the label is no longer doing all the work.

You can ask whether the proposed system produces a draft reply, a priority
score, a policy passage or a proposed refund.
You can ask what customer information and policies it will use. You can ask
whether it can issue the refund or only suggest one, where a person checks the
decision and how a customer corrects a mistake.

Those questions do not make you the difficult person in the meeting. They make
you the person discussing the actual system.

And once you can see the system, AI gets far more interesting. The language
becomes manageable. The claims become testable. The useful possibilities get
easier to spot. Best of all, the remarkable results become *more* interesting,
not less, because you can begin to see the human choices, learned patterns and
connected machinery that made them possible.

Next, we will meet the kinds of AI already showing up in your work, your phone
and your headlines. Not as one neat row of competing labels. As different
answers to different questions about what a system can do.
