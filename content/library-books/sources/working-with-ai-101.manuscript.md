# Working with AI 101

*LAiDIES LIBRAiRY | Practical companion to AI Fundamentals 101 | August 2026 edition*

---

# Introduction: From Knowing to Doing

AI Fundamentals 101 explained what is happening under the bonnet. This book is for the next, more irritating question: **how do you get useful work out of the thing on an ordinary Tuesday?**

You have probably already seen both versions of AI. One version drafts the awkward email in thirty seconds, finds the missing pattern in a spreadsheet and turns six pages of notes into something another human can use. The other version confidently invents a source, forgets the instruction you gave it twelve minutes ago and produces a strategy document with the nutritional value of packing foam.

The difference is not usually one magic prompt. It is the working system around the prompt: the task you chose, the context the AI could actually use, the model and mode doing the job, the tools and permissions available, the way you defined “done,” and the quality of your review.

This book turns those moving parts into one repeatable loop:

> **Choose the task → allowed context → brief the job → inspect → verify → revise or restart → delegate within boundaries → save what worked.**

<figure class="working-loop-visual">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/working-loop-mobile.png">
    <img src="assets/working-loop-desktop.png" alt="A human-controlled working loop: choose the task, provide allowed context, brief the job, inspect, verify, revise or restart, delegate within boundaries, and save what worked. Human judgment and authority surround every step.">
  </picture>
  <figcaption>Your judgment and authority do not disappear when the AI gains tools or autonomy; they form the boundary around the entire loop.</figcaption>
</figure>

You will practise that loop on real work: replies, summaries, comparisons, research, document production and one bounded recurring workflow. By the end, you will have a small **Working With AI Kit**, not a head full of prompt trivia.

Your kit will contain:

- one short personal baseline for how you like to work;
- three reusable task briefs or workflows;
- an allowed-information check for deciding what the AI may receive;
- a claim-and-source verification card;
- a restart rule for conversations that have stopped improving; and
- one authority line that tells an agent what it may do, what requires approval and when it must stop.

## How this relates to AI Fundamentals 101

You do not need to reread Fundamentals before starting. When this book mentions models, context, tokens, retrieval, memory or agents, it gives you the practical meaning you need. Fundamentals remains the deeper explanation of how those mechanisms work. Working with AI 101 is where you put them to work.

The books are companions, not duplicates:

| AI Fundamentals 101 helps you ask… | Working with AI 101 helps you do… |
| --- | --- |
| What is a model? | Choose an appropriate model, mode and tool for the job. |
| What is context? | Give useful context without burying the task in noise. |
| What are retrieval and tools? | Check what the AI could access and whether its sources support the answer. |
| What is an agent? | Delegate a bounded task with permissions, stopping rules and review. |
| Why can AI be wrong? | Match verification effort to the cost of being wrong. |

## Three rules before we begin

**1. Protect the information before improving the prompt.** Do not paste confidential, personal, regulated or employer-owned material into a tool until you know the applicable policy, account settings and permissions. Paying for a personal plan does not automatically settle how data may be used.

**2. Fluent is not the same as finished.** An elegant answer can still contain a wrong date, a fabricated citation or a decision no one authorised. The more consequential the output, the stronger the evidence it must earn.

**3. Keep your judgment and your authority.** AI can prepare, transform, compare and sometimes act. You remain responsible for deciding what it may receive, what it may do and whether the result is fit to use in your name.

## How to use this book

Read straight through once if you want the complete system. After that, use it like a field guide. Every chapter has predictable landmarks—objectives, key terms, a practical action and a bridge to the next skill—but the exercises build one cumulative kit.

Use your real work where it is safe to do so. If a task contains sensitive material, make a harmless stand-in that preserves the structure. “Client renewal due Friday” can become “community picnic due Friday.” The AI does not need the real secret to teach you whether the workflow works.

One last expectation: current product names, menus and plan details will change. The operating principles age more slowly. Where this edition names a live feature—such as Dreaming, Work or Cowork—it is a dated example, not a promise that every reader, plan, region or workspace has the same switch in the same place.

Now to the first problem: why an AI can make you feel like a genius at 9 a.m. and a hostage negotiator by lunch.

---

# Part I: See the System

## The problem, the context and the setup behind every result

---

# Chapter 1: The Inconsistency Problem

*You're not imagining it. The same tool gives you genius and garbage. Here's why it's not random.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Identify why your AI results feel inconsistent even when you're "doing everything right"
- Name the ten variables beyond your message that affect output quality
- Explain why the same prompt can produce genius at 9 a.m. and garbage by noon
- Describe what this book will teach you that specificity alone cannot solve
- Begin thinking diagnostically about AI results instead of just rephrasing and hoping

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Model** | The specific AI engine behind the tool you're using. Not all ChatGPTs are the same ChatGPT. |
| **Context** | Everything the AI can "see" when it generates a response: your message plus everything around it |
| **Task fit** | Whether the type of work you're asking for is something this particular tool does well |
| **Evaluation** | The skill of judging whether AI output is actually good, not just fluent-sounding |
| **Agent** | AI that doesn't just answer once but plans, acts, uses tools, and works toward a goal autonomously |

---

## 1.1 The Problem

Last month you typed three words into Claude and got back the best email you've ever sent. Three words. Something like "reply to this" after pasting a tricky message from a vendor. What came back was so perfectly calibrated that you forwarded it without changing a comma.

Yesterday you sat down and wrote a detailed brief. Role: senior project manager. Audience: executive team. Tone: authoritative but approachable. Constraints: under 300 words, no jargon, open with the bottom line. You gave it context. You gave it structure. You did the work. And what came back was so flatly generic you deleted it without reading past the second paragraph.

Same you. Same tool. Same Tuesday afternoon subscription plan.

What happened?

If you've been using AI for more than a few weeks, you've felt this. The maddening randomness of it. The sense that you're playing a slot machine where sometimes you hit the jackpot and sometimes you don't, and the correlation between effort and reward seems… loose. You put in nothing and get gold. You put in everything and get beige.

You might have concluded that AI is just unreliable. Or that you're doing something wrong but can't figure out what. Or (the most common one) that there's some secret trick you haven't learned yet, some magic phrasing that the people getting consistent results know and you don't.

Those conclusions miss something important.

The inconsistency you're experiencing is real, but it is not pure chance. There are specific, identifiable reasons why the same tool gives you genius on Monday and garbage on Wednesday, and once you can see those reasons, you can diagnose and often improve the result.

That's what this book is about.

---

## 1.2 The Advice Everyone Gives (And Why It's Not Enough)

If you've looked for advice on using AI, you've been hit from two directions.

From one side: "Be specific about what you want." Give context. Say what good looks like. Tell it who you are and who the audience is. We call this the David Rose move, after the character in Schitt's Creek who is impossibly, pathologically specific about everything. The wine has to be a very specific wine. The sweater has to drape a very specific way. The brand aesthetic must be "a general store but make it specific." That energy, applied to AI, means telling it exactly what you need: the audience, the tone, the format, the constraints, what "done" looks like. Be David Rose about it.

From the other side: "DM me for these 5 prompts that will change your life." The miracle templates. The secret formulas. The LinkedIn guy who promises you're one magic phrase away from replacing your entire team. Copy-paste this, 10x your productivity, you're welcome.

Neither is the full picture. The first one (be specific) is genuinely useful sometimes, but you've already discovered it doesn't always work. You can go full David Rose and still get garbage. The second one (magic prompts) is mostly nonsense dressed up as a product. There is no secret syntax. There is no five-prompt solution to a ten-variable problem.

The reality is simpler and harder: your message is one input among many. The output depends on the state of an entire system, not just the words you typed. Specificity helps. But it's not the only lever, and it's often not the one that needs pulling.

*(If you want a deeper dive into the David Rose move and why it helps when it helps, we explored that in Episode 2 of the podcast and in AI Fundamentals 101 in the LIBRAiRY. Neither is required to follow this book.)*

---

## 1.3 What's Actually Determining the Output

When you press "send," your message enters a system. And the result you get back depends on the state of that entire system, not just the words you typed.

There are ten things determining whether you get genius or garbage. Most of them are invisible unless you know to look. Some are about the AI. Some are about you. Some are about the setup between you and the AI that you didn't know you could control.

We're going to name all ten now. Not teach them (that's what the rest of the book is for) but name them, so you can start seeing the board.

**1. What it can see right now.** Your message is one piece of what the AI is looking at when it responds. There's also everything else in the conversation so far, any files you've attached, and instructions baked into the platform you didn't write. All of it influences the output. A perfectly clear ask can produce a terrible result if the surrounding context is polluted, contradictory, or overwhelming.

**2. What it remembers about you.** Some tools remember things across conversations. Your role, your preferences, your past requests. When this is set up well, it means the AI starts from *your* baseline instead of a generic one. When it's not set up (or it's set up badly), you're starting from scratch every time, or worse, it's remembering something that's no longer true.

**3. Which model is doing the work, and in what mode.** When you open "ChatGPT" or "Claude," you're not always talking to the same engine. These brands sit on top of multiple models with different strengths. The same underlying model can also behave very differently when a product gives it different instructions, tools and permissions. A chat mode typically answers and waits. An agentic or work mode may plan, act, pause for approval and produce a deliverable across several steps. Choosing the right mode for the task can matter as much as which model you're using.

**4. Whether the task fits the tool.** AI is excellent at some things (drafting, summarising, brainstorming, reformatting, explaining) and unreliable at others unless it has the right tools and checks (current facts, exact calculations, precise citations, being *right* rather than merely *plausible*). When you get a brilliant result, you may have asked for something it is well equipped to do. When you get garbage despite a great brief, the task may require evidence, tools or judgment the current setup does not have.

**5. What tools it has access to.** Can your AI search the web? Read your files? Run code? Connect to other apps? The same question produces completely different results depending on whether the AI can actually go look something up or is relying purely on what it already knows. Most people don't know what their AI can and can't reach.

**6. Whether it's acting once or working in a loop.** A chatbot usually answers and waits. An agent is configured to pursue a goal across multiple steps, often with tools, but it may pause, misunderstand, hit a limit or require approval. Several major platforms now offer both conversational and agentic ways of working. Knowing which one you selected matters.

**7. How you specified what you wanted.** Not just "were you specific" but *how* you structured what you gave it. The skill of writing a clear brief for an AI that will work autonomously is different from writing a good question in a chat. It's closer to delegating to a new hire than to typing a Google search.

**8. Whether you can judge what came back.** AI can sound equally fluent when it is correct, uncertain or wrong. It may hedge or state uncertainty, but you cannot treat tone as a calibrated confidence score. So evaluation—not just “does it sound good?” but “is this right, useful and fit for my purpose?”—is one of the variables.

**9. Whether any of this is repeatable.** A one-off great result is nice. A system that produces reliably good results across your recurring work is transformative. The difference between "I sometimes get lucky" and "this genuinely makes me better at my job" is whether you've built the infrastructure around these variables or you're adjusting them by accident every time.

**10. Whether you're controlling what comes back.** AI has a default voice. It's generic, agreeable, hedging, and long. It will validate your bad ideas as enthusiastically as your good ones. It will produce corporate-smooth output that sounds like everyone else's AI output. You can change all of this: control the voice, the format, the length, how it pushes back, and how you iterate without making it worse. Most people accept the defaults. The defaults are the reason so much AI output is beige.

---

## 1.4 The Tuesday Afternoon, Explained

Let's go back to your two experiences.

**The three-word email that worked perfectly.** You pasted a long, context-rich message from a vendor. The AI could see the full email chain (context: rich and focused). It was a fresh conversation with no accumulated noise (history: clean). The task was a direct reply, which is something language models are genuinely great at (task fit: strong). The model you were using happened to be a powerful one (model: appropriate). And you immediately recognised the output was good because you have deep expertise in that vendor relationship (evaluation: informed).

The variables happened to be aligned. It looked effortless. It wasn't. Everything was just set right.

**The detailed brief that produced garbage.** You asked for a strategy memo, which requires synthesis and original judgment the model doesn't have (task fit: weak). Your conversation had accumulated messages pulling the AI's attention in conflicting directions (context: polluted). The platform's built-in instructions were telling it to be concise, which contradicted the nuanced tone you asked for (invisible instructions: conflicting). The model running your request was optimised for speed, not depth (model: wrong type). The AI had no access to the actual data or documents it would need to write a real strategy (tool access: none). And the output wasn't actually *terrible*. It was a decent structure that needed your thinking layered on top. But because you expected finished work, you judged it as failure (evaluation: miscalibrated).

Variables misaligned. It looked like the tool just didn't work.

Same you. Same tool. Not the same situation at all.

---

## 1.5 What This Book Teaches

Each chapter of this book takes one of these variables and makes it visible, understandable, and controllable.

**Part II** teaches you to manage everything the AI can see: conversation history, persistent instructions, memory, and how to give it reference material without drowning it.

**Part III** teaches you to choose the right tool for the right job: which model type, which mode of use, and which tasks are worth using AI for at all.

**Part IV** teaches you what changes when AI has tools and autonomy: what it means for it to search, read files, run code, and work in a loop instead of just answering once.

**Part V** teaches the human skills that matter more now, not less: evaluating output, writing clear briefs, and delegating effectively.

**Part VI** ties it together: building a repeatable system and using AI responsibly at work.

By the end, the randomness disappears. Not because the tools become perfect, but because you can see the full board and adjust the right variable when something isn't working.

---

## 1.6 What This Book Is Not

**This is not a prompt library.** You won't find fifty templates to copy-paste. Templates go stale the moment a model updates. Understanding the system doesn't.

**This is not a product manual.** We reference ChatGPT, Claude, Gemini and others, but the core practices transfer imperfectly across them. Product names, menus, plans and behaviour change; the principles of relevant context, explicit outcomes, bounded authority and proportional checking age more slowly. Dated tool cards handle the volatile details.

**This is not a technical manual.** You don't need to understand neural networks, training data, or transformer architecture to follow along. If you want that, AI Fundamentals 101 in the LIBRAiRY covers how AI works inside. This book covers how to work *with* it.

**This book assumes one thing: you've used AI at least a few times.** You've typed something into ChatGPT, Claude, Gemini, or Copilot. You've gotten results, some good, some bad. You don't need to be a power user. You just need to have experienced the basic loop of "ask AI something, get a response, decide whether it's useful." If you've done that, you have everything you need to start here.

---

## Try This: The Fresh Start Test 🧪

Think of something you recently asked AI to do where you were disappointed by the result.

1. Open a brand new conversation. Not the old one. Don't continue where you left off.
2. Before typing anything, think: what's the minimum this tool needs to do this task well? Not everything you *could* say. Just the minimum that matters.
3. Give it that context (who you are relative to this task, what you need, what "done" looks like) and ask your question.
4. Compare the result to what you got before.

If the new conversation produces noticeably better output, the variable was likely *context*. The old conversation had accumulated noise that was dragging quality down. You just experienced Variable 1.

If the result is still disappointing, the variable is something else. Maybe task fit. Maybe model choice. Maybe the tool doesn't have access to what it needs. You've eliminated one possibility and narrowed the problem.

This is diagnostic thinking. It's the skill that makes the difference between "AI is unpredictable" and "I can identify what to adjust." Every time you change one thing and observe what happens, you learn something about how your setup works.

By the end of this book, you'll do this instinctively.

### Add to Your Working With AI Kit

Write down the disappointing task, the one variable you changed and what happened. This is your first **diagnostic test card**—evidence about your setup, not a generic prompt to worship forever.

---

## What's Next →

Chapter 2 puts you inside the system: what the AI actually "sees" when you press send, why long conversations degrade, and what it means to shape the full context instead of just the message. It's where you start taking control of Variable 1.



================================================================================

# Part II: Manage the Context

## What the AI can use, what gets lost and when to start fresh

---

# Chapter 2: What the AI Actually Sees

*Your message is one piece. Here's everything else in the room.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Describe the five layers of information the AI is reading when you press send
- Explain why long conversations produce worse results (and why it's not your fault)
- Recognise the signals that a conversation has degraded
- Use practical techniques to manage context without abandoning your work
- Prepare an effective handover when it's time for a fresh session

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Context** | Everything the AI can see when it responds: your message, the conversation history, attached files, and hidden instructions. All of it, not just your latest message. |
| **Context window** | The maximum amount of material a model can receive for one response. Think of it as working space with a size limit. Limits vary by model, product, plan and mode; some leading systems advertise up to one million tokens or more. But "can receive" and "can use well" are not the same thing. |
| **Context rot** | The measurable decline in AI output quality as a conversation gets longer. The model starts forgetting instructions, drifting, and contradicting itself. Not a bug. Not your fault. A documented property of how these systems work. |
| **Context compaction** | What happens when the AI's working memory fills up: the tool silently compresses older messages into a shorter summary to make room. Details get lost without warning. You'll notice it as the AI "forgetting" things you told it earlier. |
| **System prompt** | Instructions the platform gives the AI before you ever type anything. You didn't write them. You can't see them. They shape every response. |
| **Lost in the middle** | A documented property of AI models: they pay the most attention to the beginning and end of what they can see, and less attention to everything in between. |

---

## 2.1 Your Message Is Not What the AI Is Reading

When you type a question and press send, it feels like a direct exchange. You said something, it responded.

But what's actually happening is more like handing a stack of papers to someone and asking them to write a response based on the whole stack. Your message is only the last page. Everything else was already there before you typed a word.

The AI doesn't just read your message. It reads *everything in the conversation so far*. Every message you've sent. Every response it gave you. Every file you've attached. Plus a set of instructions from the platform that you never wrote and probably don't know exist.

All of that, taken together, is what determines what comes back.

This is why the same question, asked in two different situations, can produce completely different answers. The question is identical. Everything else in the stack is different.

---

## 2.2 What's Actually in the Stack

Think of it as five layers. Every time you press send, the AI reads all of them together:

**Layer 1: The platform's instructions.** Before you ever type anything, the tool you're using has already given the AI a set of rules. "Be helpful." "Be concise." "Don't produce harmful content." "Format responses in markdown." These are called system prompts, and every platform has them. You didn't write them. You can't see them. But they're shaping every response.

**Layer 2: Your persistent settings.** If you've set up anything like memory, preferences, or background instructions (we'll teach you how in Chapter 3), those are loaded in next. Things like "I work in marketing at a financial services firm" or "Keep responses under 200 words." These apply to every conversation, whether you remember they're there or not.

**Layer 3: The conversation so far.** Every message you've sent *in this chat* and every response the AI gave back. All of it. From message one to right now.

But only *this* conversation. When you open a new chat, it's a blank slate. The AI does not carry anything from your previous conversations unless a specific memory feature is doing that (which is Chapter 3 territory). This is why starting a fresh conversation often produces better results: clean stack, no accumulated noise.

**Layer 4: Anything you've attached.** Files, images, pasted text, links the AI has fetched. All of it enters the stack and stays there for the rest of the conversation.

**Layer 5: Your message.** The thing you just typed. The thing most people think of as "the prompt." It's real, and it matters. But it's sitting on top of four other layers that got there first.

The AI reads all five layers together and generates a response based on the *whole picture*. Not just what you said. Everything.

---

## 2.3 Why Long Conversations Go Wrong

Every message adds to the stack. Twenty messages in, the stack contains your twenty messages plus twenty AI responses. Forty exchanges deep, eighty pieces of text all sitting there. And every time you send something new, the AI re-reads the *entire stack* before responding.

This isn't a theoretical concern. In July 2025, Chroma Research tested 18 leading AI models on controlled tasks and found that every single one degraded as input length grew, even on tasks as simple as copying a repeated word. The Adobe NoLiMa benchmark found the same thing from a different angle: of 13 models claiming to support at least 128,000 tokens, 11 scored below *half* their short-input baseline once the input reached 32,000 tokens. Performance didn't cliff-edge. It eroded steadily, well before any advertised limit.

Those studies tested older models, and current models are better at several long-input tasks—especially narrow retrieval. But no single “usable percentage” applies across every model and task. In an ICLR 2026 study covering six simulated generation tasks, the tested models averaged a 39% performance drop when information arrived over multiple turns rather than in one complete prompt. That does not mean every long chat loses exactly 39%. It means **a bigger context window is capacity, not a promise that every detail will be used equally well.**

Three problems still compound as your conversations get longer:

**The stack gets noisy.** Early on, everything is relevant. But conversations drift. You brainstorm one thing, shift to another, ask an unrelated question, then come back to the original topic. All that drift is still in the stack. The AI doesn't know which parts are still relevant and which were passing tangents. It treats everything with roughly equal weight.

**The tool starts compressing without telling you.** When the conversation approaches the size limit, the tool doesn't stop or warn you. It *compacts*: silently summarising older messages in the background, replacing the full text with a shorter version. The detail is gone. One O'Reilly author described asking Gemini to check earlier notes from the same session. It said it couldn't access them, even though he could scroll up and see them in the conversation. Gemini had compacted without telling him. If you've ever had an AI just seem to "forget" something you told it earlier in a long session, this is probably what happened. It's not a bug. It's the tool managing its own space constraints, and it rarely tells you it's happening.

**Contradictions accumulate silently.** You said "keep it formal" in message three and "actually, more casual" in message fourteen. Both are still in the stack. The AI won't ask which one you meant. It just tries to accommodate both at once, producing something that's neither formal nor casual. Contradictions don't produce errors. They produce mush.

This is context rot: the measurable, reproducible decline in quality as a conversation grows. It's not a bug in your approach. It's a property of how these systems work. The exact point where quality drops depends on the model, the task, and how much noise has accumulated. Newer models handle it more gracefully than older ones, but none are immune. You'll feel it as output getting vaguer, more generic, or less aligned with what you asked for earlier in the conversation.

---

## 2.4 The Four Ways Context Fails

Drew Breunig named four useful failure modes in his O'Reilly Radar article “Working with Contexts.” His forthcoming *Context Engineering Handbook* develops the subject further. Once you can name what may be happening, you can test a repair:

**Context poisoning.** The AI gets something wrong early in the conversation. That error is now in the stack. On future messages, the AI treats its own earlier mistake as fact. The error gets built upon and reinforced. A small hallucination in message four can corrupt everything that follows. Google's own research found this happening with the Gemini agent playing Pokémon: when a wrong fact entered its context, the agent "became fixated on achieving impossible or irrelevant goals" and took "a very long time to undo."

**Context distraction.** The stack is so long and full that the AI over-focuses on it and stops reasoning freshly. Instead of thinking about your latest question on its own merits, it just pattern-matches against what's already been said. You notice this when it starts repeating itself or producing variations on earlier responses instead of generating new ideas. Google's Gemini team observed this directly: "as the context grew significantly beyond 100k tokens, the agent showed a tendency toward favoring repeating actions from its vast history rather than synthesizing novel plans."

**Context confusion.** The stack contains too much irrelevant material: old tangents, topics you've moved on from, reference documents that don't apply anymore. The AI gets steered by information that has nothing to do with your current task, simply because that information is sitting in the stack taking up space. In one tool-selection experiment using a small quantised model, a setup with 46 tools failed where a narrower 19-tool setup succeeded. That is not a universal threshold; it is a useful demonstration that irrelevant options can create selection noise.

**Context clash.** The stack contains contradictory instructions. "Be concise" from the platform. "Be thorough" from your message. "Focus on cost savings" from message three. "Actually focus on the relationship angle" from message twelve. The AI tries to satisfy everything simultaneously and satisfies none of it.

---

## 2.5 What You Can Do Right Now

None of these require any setup from later chapters. They work in any AI chat, on any platform, right now.

One principle runs through all of them: **less noise in the stack means better output for longer.** Every technique below either prevents unnecessary additions to the context or helps you recover when the conversation has degraded. (Chapter 4 covers how to give tasks well. This section is about keeping the *conversation itself* healthy.)

### Habits That Prevent Context Rot

**One task, one conversation.** The biggest source of rot is using one chat as a junk drawer. Brainstorming in the morning, drafting an email after lunch, asking a random question at 3pm. By evening, the stack is a mess of unrelated material and the AI is trying to hold all of it in focus. When the task changes, the conversation changes.

**Move good output out of the chat immediately.** When the AI produces something you're happy with, move it into the actual deliverable: the email, the doc, the slide deck. Don't keep refining it over ten more messages. You'll degrade both the output and the conversation. Take the win, put it where it belongs, then continue.

### When Quality Starts to Slip

**Restate your constraints in your latest message.** The AI pays the most attention to the very beginning of the full stack (the system prompt) and the very end (your latest message). Everything in the middle gets the least attention. This is "lost in the middle" and it's been confirmed by multiple studies through 2026: models attend strongly to the start and end, and progressively less to what sits between them. A 2026 study showed that "periodic reminders throughout the transcript" partially mitigate this degradation.

So: if you set a constraint early and the output has drifted from it, restate it now.

Example: You said "keep everything under 5 bullet points, no jargon, don't mention the restructuring" in message 1. You're now on message 13, and the AI just gave you a 10-bullet response full of corporate language.

> "Next section: same rules as the beginning. Under 5 bullets, no jargon, don't mention the restructuring."

You're putting the constraint back where the model is paying attention: the end of the stack.

**Narrow the focus explicitly.** If the conversation has drifted across multiple topics:

> "From this point, ignore everything before this message except: [restate your goal and constraints]. Focus only on [current task]."

**Ask for a fresh take.** When you notice the AI echoing its own earlier phrasing instead of thinking freshly:

> "You're repeating ideas from earlier. Approach my latest question as if you're seeing it for the first time. Ignore your previous responses and reason from scratch."

### Reading the Signals

You're experiencing context rot when the AI:
- Echoes its own earlier phrasing instead of generating fresh responses
- References something from many messages ago that's no longer relevant
- Produces a response that sounds like a summary of the conversation rather than an answer to your question
- Contradicts something it said earlier without acknowledging the change
- Gets noticeably more generic or "safe" than it was earlier in the chat
- Starts including elements you explicitly told it to avoid (it's lost track of the constraint)
- Claims it doesn't have access to something you told it earlier (compaction happened)

Any of those means the stack has gotten noisy enough to affect quality. The last one specifically means the tool compressed your earlier messages and lost the details.

### What Wastes Your Context Budget (Despite Being Widely Taught)

Some techniques that appear in older guides now make things worse on 2026 models. If you've been taught these, it's not your fault. The models changed; the advice on the internet didn't.

**"Never hallucinate" and similar prohibitions.** Telling the AI what NOT to do ("don't make things up," "never invent facts") doesn't create a constraint it can enforce. It's like telling someone "don't think about elephants." What works instead: structural constraints that give it something to do. "Use only information from the attached document. Mark anything you can't find in the source with [NOT VERIFIED]."

**Elaborate step-by-step reasoning scaffolds.** "First, identify X. Second, analyse Y. Third, evaluate Z. Fourth, write your answer." This worked in 2023 when models needed help thinking. Current models reason internally before responding. Telling them *how* to think now constrains them into following your (often suboptimal) process instead of their own. State what you want. State what matters. Let the model figure out how to get there.

**Over-detailed personas.** "You are a world-class expert with 20 years of experience at [prestigious companies] who writes with precision and insight..." This gives the model a vibe, not a target. It produces generic "expert-sounding" output calibrated to the internet's idea of what that persona sounds like. What works: specify the audience, the register, the length, and the structure directly. Those are actionable. A persona is not.

**ALL-CAPS urgency.** "You MUST do this. This is CRITICAL. ALWAYS check before responding. NEVER skip this step." On older models, this sometimes helped. On current models, it over-triggers tool use, produces unnecessarily verbose output, and can cause the AI to do things you didn't ask for because it's treating your intensity as a signal that something unusual is required. Write the way you'd write to a competent colleague. If it's important, say why, not louder.

**Rigid templates with mandatory sections.** "Your response MUST include: 1) Executive Summary 2) Key Points 3) Analysis 4) Recommendations 5) Next Steps." If your task naturally has all five of those, fine. But mandatory templates produce padding when sections don't apply. The AI will invent content to fill a required section rather than skip it. Give it permission: "Include only the sections that apply. Skip anything that would be empty or padding."

The pattern across all of these: **in 2026, you get better results by being clear and brief than by being elaborate and controlling.** Describe the destination. Trust the model to find the path. Add constraints only where you've seen the output go wrong without them.

This connects directly to context rot: every unnecessary word in your instruction takes up space in the stack. A 50-word ask that produces the right output on the first try is better for your conversation's health than a 500-word instruction that might produce marginally better output but at the cost of a much larger context footprint.

---

## 2.6 The Handover: When It's Time for a Fresh Start

Sometimes the best move is a new conversation. But never a cold one. Before you leave, ask the AI to package up the current state so you don't lose anything.

A practical rule of thumb: don't wait until quality has collapsed. Do a handover when the conversation starts losing constraints, accumulating contradictions or making each correction harder than the last. A percentage of the advertised context window cannot tell you that reliably.

### The Standard Handover Prompt

> "Before we end, write a complete handover I can paste into a new conversation. Include: our goal, current status, key decisions we've made, what to avoid, and the very next step. Be specific (use exact names, numbers, and details) rather than vague summaries. Structure it so a new session can continue immediately without needing this conversation's full history."

### For Complex, Multi-Step Work

For ongoing projects that span multiple sessions, a more structured handover works better:

> "Summarise this session for handover using this structure:
> 1. GOAL: What we're working toward
> 2. DONE: What's been completed
> 3. DECISIONS: Choices made and the reasoning behind them
> 4. CONSTRAINTS: Requirements or things to avoid that I've stated
> 5. FAILED APPROACHES: What we tried that didn't work (so we don't repeat it)
> 6. CURRENT STATE: Where exactly we left off
> 7. NEXT STEPS: What needs to happen immediately
>
> Be precise. Don't summarise away the details."

The "FAILED APPROACHES" section is arguably the most valuable part. Without it, a future session will cheerfully suggest the exact approach you already tried and abandoned. Documenting what didn't work and why prevents the new conversation from re-walking dead ends.

### When the Handover Is Wrong

Check it. If the AI's summary doesn't match what actually happened, don't paste it blindly into a new session. You'll just import the confusion.

**To get it to self-correct:**

> "That handover has errors. Here's what's wrong:
> - [Specific thing it got wrong or missed]
> - [Another correction]
>
> Rewrite the handover with those corrections integrated."

**To ask it to flag its own uncertainty:**

> "Before I use this handover, review it critically. Flag any part where you're uncertain or where your summary might not match what I actually said. Mark anything you're less confident about with [UNCERTAIN]."

This won't always catch everything. The AI can be confidently wrong about things it's already lost from context. But it catches more problems than not asking, and the [UNCERTAIN] tag gives you specific places to double-check.

**If it's too far gone to self-correct** (it can't produce an accurate summary because the conversation was already too degraded), write the handover yourself. Open a note and spend 60 seconds writing in plain language: what you're working on, what you've decided, and what you need next. Your own notes will be more reliable than a summary from a conversation that's already lost the plot.

---

## 2.7 Other Prompts for Common Situations

**Mid-conversation reset (quality slipping but you don't want to leave):**

> "Stop. Reread this conversation from the beginning and tell me: what is my goal, what constraints have I set, and what decisions have we made? I'll confirm if you've got it right before we continue."

This also works as a **diagnostic for compaction**. If the AI can't accurately recall things you said earlier, it's already lost them. Time for a handover.

**When the AI is contradicting itself:**

> "You've contradicted your earlier response. In message [X] you said [Y], but now you're saying [Z]. Which is correct, and why did you change?"

**When it's going off-topic because of old material in the conversation:**

> "From this point forward, treat everything before this message as background only. The only thing I need you to focus on is: [specific task]. The constraints that apply are: [list them]."

---

> 📖 **Want to understand WHY this happens at a mechanical level?** AI Fundamentals 101 (Chapters 4-5 in the LIBRAiRY) explains what tokens are, how the attention mechanism works, and why bigger context windows haven't solved this problem. Understanding the mechanics means you can troubleshoot on your own instead of following rules by rote. This book gives you the practical techniques. Fundamentals gives you the engine diagram.

---

## Try This: The Handover 🧪

Find a conversation you've been working in for a while. One where you've been at it for ten or more messages, or where you've drifted across multiple topics.

Try the structured handover prompt from Section 2.6. Read what it gives you.

Then ask yourself:
- Is it accurate? Does it match what actually happened?
- Did it miss anything important? (If so, that tells you it had already lost track.)
- Did it include things that are no longer relevant? (Context confusion in action.)
- Did it forget something you told it that you can still see in the chat? (Compaction in action.)

Correct anything that's wrong, then open a new conversation and paste the handover as your first message. Continue working.

Notice the difference. You didn't re-explain from scratch. You didn't lose anything that matters. And the new session doesn't have twenty messages of accumulated noise dragging quality down.

### Add to Your Working With AI Kit

Save the handover under a name you will recognise. Add one line at the top: **Start a fresh session when…** Complete that sentence with the quality signal you observed.

---

## What's Next →

Everything in this chapter is about managing context *within* individual conversations. But you've probably noticed the catch: if fresh conversations work better, you're starting from zero every time. Retyping your preferences. Re-explaining your situation. Giving the same background over and over. Chapter 3 fixes that. It teaches you how to tell the AI about yourself once, in a place it remembers, so every new conversation starts pre-loaded with who you are and how you want it to work.



================================================================================

# Part III: Set Your Baseline

## One-time setup for preferences, memory and projects

---

# Chapter 3: Your AI Doesn't Know You (Yet)

*Persistent instructions, memory, and how to stop starting from zero.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Explain the difference between persistent instructions and memory
- Build your AI profile using examples of your actual work (the fastest, most accurate method)
- Understand how modern memory systems work (including self-updating features)
- Set up projects/workspaces for different areas of your life
- Keep your setup current without constant manual maintenance

---

## Key Terms

| Term | What it means | Different tools call it... |
| --- | --- | --- |
| **Persistent instructions** | Rules you write once that load into every conversation automatically. They tell the AI who you are and how you want it to behave. | Custom Instructions (ChatGPT), Project Instructions (Claude), Personalisation (Gemini), System Prompt (general) |
| **Memory** | Facts the AI accumulates from your conversations and remembers across sessions. Some tools do this automatically; others need you to ask. | Memory (ChatGPT, Claude), Saved Info (Gemini) |
| **Project / Workspace** | A persistent space where instructions + files + conversations live together. Everything inside inherits the same context. | Projects (ChatGPT, Claude), Gems (Gemini) |
| **Voice profile** | A document that captures how you write: tone, sentence patterns, vocabulary, what you never say. Built from examples of your actual writing. | No standard term across tools. |

---

## 3.1 The Problem

Every new conversation starts empty (Chapter 2). That's good for context quality. It's terrible for everything else.

It means every time you open a new chat, the AI has no idea who you are. Not what you do, not where you live, not how you prefer to be spoken to, not what you've told it a hundred times before. So you either repeat yourself constantly, or you accept generic output calibrated for no one in particular.

Re-establishing the same context across tools is real work, even though this draft's original Salesforce-attributed time estimate could not be tied to a reviewable primary study. Treat the cost as something to measure in your own week, not a universal number.

The fix: tell it once, in a way that persists.

---

## 3.2 Two Things That Persist

**Persistent instructions** are rules you write. You decide what goes in. You control when it changes. The AI reads them at the start of every conversation. Think of it like a standing brief you give a new colleague on their first day.

**Memory** is information a product carries across conversations, either because you asked it to remember something or because its memory system inferred that the information could be useful later. OpenAI introduced the first version of ChatGPT's **Dreaming** method in April 2025, then launched a more capable Dreaming-based memory architecture on June 4, 2026. OpenAI says it synthesises relevant information across chats, updates memories over time and gives users a reviewable memory summary. Availability still depends on account, region and rollout.

Claude also offers cross-conversation memory and gives users a memory summary they can review and manage. Anthropic officially documents an import/export flow for moving relevant preferences and context from another AI provider. The categories, controls and update behaviour can change, so inspect the current summary in your own account instead of assuming it works exactly like ChatGPT's Dreaming architecture.

The distinction:
- Instructions = what you deliberately wrote. Reliable. Fully under your control.
- Memory = what the AI observed and inferred. Convenient but needs checking. Can be wrong, outdated, or based on something you said casually that it took as permanent fact.

Both are useful. Both have different maintenance needs.

---

## 3.3 Building Your Profile: Show, Don't Describe

The best way to teach the AI who you are is to show it examples of your actual work. This is faster, more accurate, and produces better results than trying to describe yourself in the abstract.

Most people struggle to articulate their own style in words. But they can easily point to "this sounds like me" and "this doesn't." Use that.

**Method 1: Give it your writing (fastest, most accurate)**

Gather three to five examples of things you've written that represent how you actually communicate. That is a practical starting range, not a proven optimum. Use sent emails, messages, reports or posts where you think "that sounds like me." Then:

> "I've pasted 5 examples of my real writing below. Analyse them and reverse-engineer my style: tone, sentence length, formality level, how I open and close, words I tend to use, patterns you notice, and anything I consistently avoid. Then draft a set of persistent instructions that would make you communicate like me in future conversations. Include both style rules and any preferences you can infer about how I like to receive information. Keep it tight — every sentence must carry signal."
>
> [paste your examples]

Real writing samples give the AI concrete patterns to match, while descriptions such as "professional yet friendly" can fit almost anyone. Start with a few representative samples, test the result and add or remove examples based on what changes. The examples are evidence of your choices; the adjectives are only a hypothesis about them.

**Method 2: Let it read your files or emails**

If your AI tool can access your documents (through projects, file uploads, or connected integrations), point it at your actual output:

> "I've uploaded [files/recent emails/documents I've produced]. Read them. Based on what you see: what's my communication style? What do I prioritise? What patterns do you notice? Then draft my persistent instructions based on what you've observed. After that, interview me about anything you couldn't figure out from the files alone."

Even 5 good examples gets you most of the way there. More is better if you have it (some people point their AI at months of sent emails for a comprehensive analysis), but don't let perfect be the enemy of good. Start with what you have.

**Method 3: Let it start from what it already knows**

If you've been using a tool for a while, it may already have information about you stored in memory. Try:

> "Based on everything you already know about me from our past conversations, draft what you think my persistent instructions should be. Include: who I am, how I want you to respond, and what you should never do. Then I'll tell you what's wrong and what's missing."

This gets you a starting draft in seconds. Then you correct and add.

**Method 4: The interview (for starting from scratch)**

If you're new to AI tools and don't have examples to share yet, the interview approach works. You can speak your answers (voice input) or type. Here's a prompt that produces good results:

```
I want you to build my persistent instructions file. This will be
loaded at the start of every future session so you know who I am
and how to produce output that matches my standards.

Interview me. Ask one question at a time. Push back on vague
answers. If I say "I like clear responses," ask me what that
specifically looks like.

Cover these areas:

1. WHAT'S NOT WORKING (3-4 questions)
   - What frustrates me about AI responses right now?
   - Where do I waste time re-explaining or re-doing?
   - What makes me delete an AI response without using it?

2. WHAT I USE AI FOR (3-4 questions)
   - What do I already use AI for? (work and personal)
   - What do I wish it could handle that it currently doesn't?
   - What recurring tasks eat my time that AI might take on?

3. HOW I WORK (3-4 questions)
   - Do I want drafts to refine, or finished output?
   - How long should responses be by default?
   - What tone fits my life (both work and personal)?

4. WHAT GOOD LOOKS LIKE (3-4 questions)
   - What's a piece of output I've been happy with recently?
   - What separates useful from useless in my world?
   - When AI gets it right, what did it get right specifically?

5. WHAT I HATE (2-3 questions)
   - Specific words, phrases, or patterns I never want to see?
   - Behaviours that annoy me? (agreeing too much, hedging,
     filler, starting with summaries, being too long, etc.)

6. MY RULES (2-3 questions)
   - Non-negotiables for how it should behave?
   - Should it push back on my ideas or just execute?
   - Anything else I want applied to every conversation?

AFTER THE INTERVIEW:
Compile my answers into a structured instructions file. Don't
save raw Q&A. Extract the patterns and write them as concise
rules and preferences. Structure:

## About me
## How I work
## What good looks like
## Rules (numbered list of do's and don'ts)

Target: under 400 words total. Every sentence must carry signal.
If a sentence can be cut without losing information, cut it.
```

A five-minute interview produces a five-minute system. Give it 15-20 minutes and you'll get something that genuinely changes every conversation.

---

## 3.4 What Good Instructions Look Like

However you create them, effective instructions share certain qualities:

**They're specific, not generic.** "I like clear communication" means nothing. "Lead with the answer, then reasoning, under 200 words" means something the AI can act on.

**They're focused.** Persistent instructions share attention with your actual task, conversation, files and tool results. In July 2026, Anthropic reported removing more than 80% of Claude Code's system prompt for its Claude 5 models with no measurable loss on its coding evaluations. Microsoft calls the same maintenance practice **instructions hygiene**: keeping “the smallest set of high-signal information that reliably changes the outcome.” That does not prove every personal profile should be a particular length. It gives you the right test: keep a line only if it changes a real result you care about.

**They include examples, not just rules.** "Three before-and-after examples beat fifty rules." If you can show the AI what good output looks like (paste a sample you're happy with) it'll pattern-match better than following abstract instructions.

Here's what a finished set looks like for someone who uses AI for both work and personal things:

```
ABOUT ME:
Based in Toronto. Marketing leadership at a fintech company.
Also use AI for personal things: meal planning, travel, kids'
school projects, learning new skills. Canadian English, metric.

HOW TO RESPOND:
- Direct. Lead with the recommendation, then reasoning.
- Under 200 words unless I specifically ask for more.
- Conversational but smart. Not corporate-speak, not dumbed down.
- If you disagree with my approach, say so. Don't just agree.
- When uncertain, say so clearly instead of hedging.

NEVER:
- Use "delve," "crucial," "landscape," "it's worth noting,"
  or "I'd be happy to help"
- Start by summarising what I just said back to me
- Agree with me to be polite. I need honest pushback.
- Produce bullet points when I ask for prose (or vice versa)
- Use em dashes or exclamation marks

MY VOICE (from examples):
- Short sentences mixed with longer explanatory ones
- Informal openings, professional substance
- Specific over vague. Names and numbers over generalities.
- Dry humour is fine. Enthusiasm is not.
```

---

## 3.5 Projects: Adding What's Different

Your account-level instructions are the base layer. They handle who you are and how you want the AI to behave everywhere.

Projects are for adding what's UNIQUE to a specific area. The reference documents. The specific audience. Any rules that differ from your default. You don't restate your general preferences inside a project. You only add or override what's different.

Every conversation inside a project inherits your account-level instructions PLUS the project's own additions. You don't re-upload. You don't repeat yourself. The shared stuff lives at the account level once.

**When to create a project:** When you have a recurring area with its own reference documents or audience. That could be a specific client, a long-running initiative, a hiring process, a home renovation with specs and quotes, studying for a certification, a creative project with its own goals.

**What goes where:**
- **Account-level:** Your tone, format preferences, banned words, communication style, location, language. The stuff that's YOU. Never repeat this inside projects.
- **Project-level:** The specific audience, reference documents, and any rules that DIFFER from your default. Only the delta.

If you find yourself copying the same instructions into multiple projects, those instructions should move up to account-level instead.

**If you want different modes for different contexts** (e.g. work vs. personal), each project overrides just the parts that need changing:

- **A work project:** "Audience is executive leadership. Professional tone. Under 200 words."
- **A personal project:** "Casual tone. Longer answers are fine. Be creative."
- **A specific client:** "Brand voice is warm and conversational. They say 'members' not 'customers.' Reference docs attached."

The base stays the same. Projects just adjust the differences.

---

## 3.6 How Memory Maintains Itself

Some memory systems now update themselves, which makes review more important, not less. In OpenAI's internal evaluation chart, factual-recall task success rose from 41.5% for its 2024 system to 82.8% for the 2026 architecture. Those are vendor results, not an independently replicated guarantee for your account. Separately, a 2026 study of 2,050 memory entries from 80 ChatGPT users found that 96% were created without an explicit user request to remember. The study examined the earlier memory system, so do not treat it as a measurement of Dreaming itself. Treat it as a reason to inspect what your assistant has inferred.

**ChatGPT's Dreaming-based memory architecture** launched in its more capable form on June 4, 2026. OpenAI says it can synthesise information from many chats, revise memories as circumstances change and expose a memory summary for review. The exact contents and update timing are product-managed, so use the review controls rather than assuming you know what was retained.

**Claude** also offers cross-conversation memory and an official **memory import** flow for bringing relevant preferences and context from another AI provider. Anthropic does not promise that every import takes a fixed number of seconds or that every detail will be retained. Review the imported result before relying on it.

**For instructions (which you wrote yourself):** The AI can help maintain those too. Instead of manually reviewing them, periodically ask:

> "Review my current persistent instructions. Based on how we've been working recently, flag anything that seems outdated, contradictory, or missing. Suggest specific updates. Don't change anything yet — tell me what you'd change and why."

The pattern is: **it proposes, you approve.** The AI identifies drift; you decide what to accept. Faster and more reliable than trying to remember what's stale on your own.

**You should still check manually when:**
- You change roles, teams, or life circumstances
- Output starts drifting for no obvious reason
- The AI references something clearly outdated
- You get annoyed by something new that keeps happening

But the heavy lifting of "what needs updating?" can be the AI's job.

---

## Try This: Build Your Profile 🧪

Pick the method that matches where you are:

**If you have writing samples:** Gather a few examples of your real writing (emails, messages, anything that sounds like you). Paste them in with the prompt from Method 1 in Section 3.3. Review the draft it produces. Edit anything that's off. Save your master copy.

**If your tool already has file access:** Upload a few recent documents you've produced and use the prompt from Method 2. Let it observe before it asks.

**If you've been using the tool for a while:** Try Method 3 first. See what it already knows. Correct and build from there.

**If you're brand new:** Use the full interview prompt (Method 4). Give it 15-20 minutes of honest answers.

Whichever path you take, the result is the same: a set of instructions under 400 words that changes what every future conversation produces. Save it somewhere you control, paste it into your tool's settings, and notice the difference immediately.

### Add to Your Working With AI Kit

Save the tested profile as **My AI Baseline**, with the date and the tool/account where you tested it. Keep the three comparison outputs until you know the change genuinely helped.

---

## What's Next →

Your instructions tell the AI who you are and how to behave. But when you sit down with a specific task (whether that's a work deliverable, planning a trip, or figuring out a tricky situation), you need to give it the right information for THAT task: files, references, examples, constraints. Chapter 4 teaches you how to provide task-specific context without overwhelming it, and introduces the principle of "just enough."



================================================================================

# Part IV: Run the Every-Time Loop

## Brief the task, shape the output and revise without wrecking it

---

# Chapter 4: Giving It What It Needs (Without Drowning It)

*More information doesn't mean better answers. Here's how to give the AI exactly what it needs and nothing else.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Explain why uploading everything "just in case" makes output worse, not better
- Use a 60-second preparation step that eliminates most bad first drafts
- Decide when to upload a file, paste a section, show a screenshot, or describe in your own words
- Provide examples that collapse a hundred possible interpretations into one clear target
- Write a brief (not a prompt) that a smart but uninformed colleague could execute without asking questions
- Calibrate your specificity: enough to guide, not so much that you constrain

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Context budget** | The AI's attention is finite. Everything you put in the conversation competes for that attention. Think of it as a budget: every token you spend on background is a token not available for your actual task. |
| **Context stuffing** | The antipattern of dumping everything into the conversation "just in case." More context often makes output worse because the AI can't tell what matters and what's noise. |
| **Few-shot examples** | Showing the AI 2-3 concrete examples of the input-output pattern you want, instead of (or in addition to) describing what you want in words. |
| **Brief** | A structured description of what you need: the outcome, the audience, the constraints, and what "done" looks like. Not a magic phrase. A specification. |
| **Multimodal input** | Giving the AI something other than text: images, screenshots, photos, audio, or video. Most major tools now handle all of these. |

---

## 4.1 The Attention Budget

You're planning a trip. You hand your phone to a friend and say "find me a hotel." They're scrolling through 47 open tabs: your banking app, three Reddit threads about sourdough, a half-written text to your ex, a news article from last week, and somewhere in there, a Google Maps search for Barcelona. They could find you a hotel. They might also get distracted by the sourdough.

That's roughly what you're doing when you dump ten documents into an AI conversation and say "help me with this." The AI reads everything you gave it. All of it. And it can't tell which parts you think are important and which are just... still open.

This chapter is about what to give the AI for a specific task, and (just as importantly) what to leave out.

The instinct most people have is: give it everything. Upload all the documents. Paste the full email chain. Attach every reference. Let the AI sort it out. It has a million-token context window, after all.

Here's what's true in August 2026: models have improved dramatically at handling large inputs, and some vendors report very high scores on narrow “needle in a haystack” retrieval tests. That does not prove equally reliable reasoning or semantic retrieval across a million tokens. A full 50-page document can be useful input when the tool supports it, but ask for page or section references and verify important details against the original.

But there's a critical difference between giving it a lot of RELEVANT context and giving it a lot of IRRELEVANT context hoping it'll find the relevant bits. That second thing still makes output worse, even on the most capable 2026 models.

Controlled long-context evaluations show that more input is not automatically more usable input: performance can decline as irrelevant material grows, even while the content still fits inside the advertised window. The model may not warn you that focus has degraded. It can simply produce a vaguer or less accurate answer, which is why selection matters more than impressive capacity numbers.

The practical framing from one 2026 researcher: "Models genuinely have gotten better at self-correction, so a lot of the fussy manual work that once mattered now buys less. But context still shapes results powerfully, and an agent handed a bad context will confidently do the wrong thing no matter how capable it is."

Andrej Karpathy (one of the researchers behind the early AI systems that led to today's tools) put it simply: the AI's context window is like working memory. Your job is to load exactly the right information for each task. Not all the information. Not the most information. The *right* information. That job has gotten easier as models have improved. But it hasn't gone away.

This chapter teaches you how to decide what "right" means for different tasks.

---

## 4.2 Think Before You Type

A useful separator between improvised and repeatable AI work is what happens before you start typing. The 60-second preparation method below is a practical routine to test, not a measured universal optimum.

Most people open a chat, describe what they want, and press send. When the output isn't right, they adjust and try again. The iteration loop becomes the substitute for thinking. Three rounds of "no, try again" later, the conversation is polluted with failed attempts (Chapter 2's context rot), and the fourth attempt is working against all the accumulated noise.

The fix takes one minute. Before you type, answer five questions:

**1. What's the actual deliverable?** Not "I need help with X" but "I need [a specific thing] for [a specific use]." The difference between "help me with this presentation" and "I need 5 slide titles with one-sentence descriptions for an internal quarterly review, audience is senior leadership, focus is what changed since last quarter" is the difference between generic output and usable output.

**2. What does the AI need to know that it can't guess?** The audience. The constraints. Why this matters. What happened before. Any context that's specific to your situation rather than general knowledge. If a smart but uninformed colleague would need to ask you a question before starting, the AI needs that information too. The difference is: the colleague would ask. The AI will just guess.

**3. What do I have that I could show it?** Files, examples, previous versions, reference material, screenshots. Anything the AI could look at directly rather than relying on your description of it.

**4. What would distract it?** Old versions of documents. Tangentially related files. Context from a different project. Information that LOOKS relevant but isn't for THIS specific task. Everything you include that doesn't directly serve the task dilutes what does.

**5. What does "good enough" look like?** Are you going to iterate on this? Is it a first draft you'll refine, or does it need to be right the first time? If it's a draft, say so. If there are specific things that would make you reject it (wrong tone, wrong length, wrong audience), say those up front.

Sixty seconds. Five questions. The output from this preparation is worth more than any amount of prompt-tweaking after the fact.

---

## 4.3 The Brief (Not the Prompt)

The word "prompt" implies a single clever sentence that unlocks the AI's potential. The reality in 2026 is closer to writing a brief: a short, structured description that gives a smart but uninformed executor everything they need to produce what you want.

An agent can sometimes pause or ask for clarification, but you should not depend on that happening at the right moment. If the brief leaves an important blank, the system may make a plausible choice and continue. Name the ambiguity before it becomes an autonomous decision.

A good brief has at most six parts:

**Outcome.** What you want to end up with, described as a result, not a process. "A one-page summary of this report for my CFO" not "read this and tell me what's important."

**Audience.** Who will read/use this output. This changes everything: vocabulary, detail level, what gets emphasised, what gets left out.

**Constraints.** What it must NOT do. Length limits. Things to avoid. Scope boundaries. "Under 300 words. No technical jargon. Don't mention the restructuring."

**Format.** What the output looks like structurally. Bullet points or prose. Sections or one block. Table or narrative. If you don't specify, it'll choose for you (often wrong).

**What good looks like.** If you have an example of the kind of output you want, show it (Section 4.5 covers this in depth). If you don't, describe the quality bar: "The tone of an internal email between peers, not a formal memo to a board."

**What you've already tried (if relevant).** If this isn't your first attempt, tell it what didn't work and why. "I already tried asking for a summary and it was too high-level. I need more operational detail, specifically around timelines and owners."

You don't always need all six. A simple task might only need outcome + constraints. A complex task might need all of them. The test: could a smart colleague you've never worked with execute this brief without asking you a single clarifying question? If yes, the AI can too. If not, what question would they ask? Answer it in the brief.

---

## 4.4 Upload, Paste, or Describe?

Before choosing a format, decide whether the AI is allowed to receive the information at all. Run this **Allowed-Information Check**:

1. **Whose information is it?** Mine, my employer's, a client's, a colleague's or the public's?
2. **What kind is it?** Public, internal, confidential, personal, regulated or contract-restricted?
3. **Which rule applies?** Check the current employer/client policy, account type, data controls, retention and connector permissions. Do not infer privacy from price.
4. **Can I reduce it?** Use a harmless stand-in, remove names, paste only the necessary passage or describe the structure instead.
5. **Who could act on it?** If tools or connectors are enabled, check read versus write access before continuing.

If you cannot answer the first three questions, stop. Do not upload the material merely to see whether the tool can help.

Once the information is allowed, you have four ways to provide it: upload, paste, describe or show a screenshot. Each is better for different situations:

### Upload the file when:

- The AI needs to work with the ACTUAL content: analyse it, summarise it, extract from it, compare it to something else. In 2026, the models handle full documents well. You don't need to pre-summarise a 50-page report before uploading it. Just upload it.
- Accuracy about specific details matters (numbers, names, dates, quotes)
- The document's structure is part of what matters (tables, formatting, sections)
- You'd say "here, read this" to a colleague

Example: "I've uploaded our Q2 earnings report. Summarise the three biggest changes from Q1 for a non-financial audience. Under 200 words."

### Paste relevant sections when:

- Only part of a long document is relevant to this task
- The full document would add noise (you need page 12 of a report but everything else is about a different topic)
- You want the AI to focus on specific passages without getting distracted by the rest

Example: "Here's the specific contract clause I need analysed: [paste clause]. What are the risks to the buyer? Is there anything ambiguous that could be interpreted against us?"

### Describe in your own words when:

- The AI needs to understand your SITUATION, not read a document
- The relevant information is in your head, spread across conversations and experience
- You're providing background context ("we're a 50-person fintech in Toronto, series B, selling to credit unions")
- The information is simple enough that describing it is faster and cleaner than finding and uploading a file

Example: "I'm preparing for a salary negotiation. I've been in this role for 2 years, got promoted 6 months ago but pay hasn't changed. My research says market rate is 15-20% above where I am. I want to ask for 18%. Help me draft talking points."

### Show a screenshot when:

- The visual layout IS the information (a UI, an error message, a design)
- Describing it in words would take 5x longer and be less precise
- You're asking "what am I looking at?" or "what's wrong here?"
- Charts, dashboards, or visual data where spatial relationships matter

Example: [screenshot of a form with an error] "I keep getting this error when I submit. What's wrong?"

**The rule of thumb: use whatever puts the most signal in the least space.** If the AI needs to read a document, give it the document (the models handle this well now). If it only needs three sentences of context from that document, paste those three sentences instead of making it search through 10 pages. If a picture is worth a thousand words, send the picture.

The question isn't "can the AI handle this much?" (in 2026, it usually can). The question is "is everything I'm giving it actually relevant to THIS task?" Relevant volume is fine. Irrelevant volume still hurts.

### Position matters

If you're uploading multiple files, do not rely on order alone. Name the priority source and what role each file plays: “Use the policy as authority; use the notes only as examples.” Position can affect attention in some long-context tests, but products assemble and retrieve files differently.

---

## 4.5 The Power of Examples

Sometimes the most efficient thing you can give the AI isn't instructions. It's one or two examples of what you want.

"Summarise this professionally" can be interpreted a hundred different ways. The AI will pick one. It probably won't be yours. But if you show it two examples of summaries you've written and liked, it collapses those hundred interpretations into one clear target.

This technique is called **few-shot prompting**: showing the model one or more examples of the result you mean. Start with one to three representative examples and test whether they improve your task. There is no universal magic count; the examples earn their place only if they reduce ambiguity.

### When examples work better than instructions:

- **Format consistency.** You want the output to look a specific way (your newsletter style, your meeting note format, your email structure). Show one.
- **Style and voice.** You want it to sound like you or your brand. Show 2-3 pieces of your real writing (Chapter 3 covered this for persistent instructions; here it's task-specific).
- **Classification or categorisation.** You need it to sort things into buckets? Show it a few already-sorted items.
- **Any time "you'll know it when you see it" but you struggle to describe it.** If you can't explain what makes a good version good, show a good version.

### How to provide examples:

> "Here are two examples of the format I want:
>
> EXAMPLE 1:
> [paste a real example]
>
> EXAMPLE 2:
> [paste a different real example]
>
> Now produce the same for [your actual task]. Match the format, length, and level of detail from my examples."

### How many examples to give:

Start with one to three representative examples and test whether they improve the task. One example can anchor the AI too strongly to a single template; a large pile can consume context without adding useful signal. Pair examples with clear instructions: the examples show the shape, while the instructions clarify what the examples do not make obvious.

### When NOT to use examples:

- When the task is complex reasoning or analysis (examples can constrain the AI's thinking instead of helping it)
- When your examples are so long that they dominate the context and crowd out the actual task
- When you only have one example and it might accidentally anchor the AI to an approach you don't want repeated for every case

---

## 4.6 The "Just Enough" Principle

The David Rose move (being pathologically specific about what you want) is powerful. But in 2026 it's one tool, not the whole toolbox.

Specificity exists on a spectrum:

**Too vague:** "Write me a summary." No audience. No length. No format. No focus. The AI produces generic output calibrated for nobody in particular.

**Just right:** "Summarise this for senior leadership. Three bullet points. Focus on what changed and what we recommend. Skip background they already know." Clear outcome, clear audience, clear constraints. The AI has a target.

**Too specific:** A 500-word instruction that prescribes every step, every section, every sentence structure, plus warnings about what not to do, formatting rules, and three paragraphs of context that doesn't affect the output. In 2026, this often produces WORSE output than "just right" because over-instructing constrains capable models rather than helping them.

Where to land on this spectrum depends on the task:

| Task type | Specificity needed | Why |
|---|---|---|
| Simple question | Low (just ask) | The AI knows how to answer a question |
| Draft (first pass) | Medium (outcome + audience + constraints) | Give it direction, not a screenplay |
| Format-sensitive output | Medium + example | Show the shape, constrain the length |
| Complex analysis | Medium (goal + constraints + what good looks like) | Let it reason; don't prescribe the process |
| Creative brainstorming | Low-medium (topic + quantity + how diverse) | Constraint kills creativity |
| Repetitive/template task | High + example | Consistency requires tight specification |

The test for whether you've given enough: would a smart colleague produce what you need from this brief alone? If they'd ask a question, you haven't given enough. If they'd skim past half your instructions because it's obviously irrelevant, you've given too much.

---

## 4.7 When to Show Instead of Tell (Multimodal Input)

Many major AI products can process images or screenshots; audio and video support varies by product, model, plan, mode and region. If your current tool supports the relevant format, typing may not be the clearest input.

**Screenshots are faster and more accurate than descriptions when:**
- You're looking at something visual (a UI, a layout, a design, a chart)
- An error message or state is hard to put into words precisely
- The spatial arrangement of information matters
- You'd normally walk over to someone's desk and point at their screen

**Text is better when:**
- The information is structured data (numbers, names, facts)
- You need the AI to process, compute, or transform the information
- You want to quote it exactly (text tokens are processed more reliably than OCR'd text from images)
- The content could be pasted directly

**Voice/audio input is efficient when:**
- You're explaining a situation and talking is faster than typing
- You're on mobile
- The nuance of HOW something was said matters (tone analysis)

The practical rule: if showing it would be faster and more precise than describing it, show it. If describing or pasting is cleaner and more accurate, do that instead.

---

## Try This: The 60-Second Brief 🧪

Pick something you were about to ask the AI. Before you type, spend 60 seconds:

1. Write down the actual deliverable (what physical thing do you want back?)
2. Write down who it's for (the audience, even if it's just you)
3. Write down one thing that would make you reject it (the key constraint)
4. Check: do you have anything you could upload, paste, or screenshot instead of describing?
5. Check: do you have an example of what "good" looks like for this task?

Now write your message using what you came up with. Compare the result to what you'd have gotten if you'd just typed your first instinct.

Compare the results against the same definition of done. Keep the routine only if it makes the work better or easier to review.

### Add to Your Working With AI Kit

Save the successful brief as **Brief 1 of 3**. Keep the outcome, audience, source material, constraints and acceptance conditions; remove the one-off details before reuse. Save the five-question **Allowed-Information Check** beside it and run that check before every future paste, upload or connected-tool task.

---

## What's Next →

You now know how to give the AI what it needs for a task without drowning it. But even with perfect context, the output might still sound wrong: too generic, too corporate, too agreeable, too hedging. That's not a context problem. That's an output behaviour problem. Chapter 5 teaches you how to control what comes back: matching your voice, eliminating filler, stopping the AI from agreeing with everything you say, and knowing when to stop iterating.



================================================================================

# Chapter 5: Controlling What Comes Back

*The AI produced something. It's wrong in a way you can feel but can't name. This chapter names it.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Identify why AI output sounds generic and what's actually causing it
- Set structural rules that eliminate filler, hedging, and sycophancy
- Control format and length without over-constraining
- Get honest pushback from a tool that's trained to agree with you
- Distinguish between surface fixes (ban lists) and real fixes (voice, opinion, specificity)

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **AI slop** | Output that's technically correct but sounds like it was written by nobody for nobody. Generic, predictable rhythm. No perspective. You can feel it instantly even if you can't articulate why. |
| **Sycophancy** | The AI's tendency to agree with everything you say, validate your framing, and avoid disagreeing even when you're wrong. A documented, measured property of how these models are trained. |
| **Hedging** | When the AI refuses to commit to an answer: "It depends," "There are many factors," "This is a complex issue." Sometimes appropriate. Usually a crutch. |
| **Structural constraint** | A rule that gives the AI something concrete to DO (or not do) rather than a vague prohibition. "Use only information from this document" works. "Don't make things up" doesn't. |

---

## 5.1 Why Everything Sounds the Same

You asked it to write a birthday message for your friend. What came back could have been written for literally anyone's friend. Warm but empty. Enthusiastic in that way nobody actually is. "Here's to an amazing year ahead!" No. Your friend just got out of a terrible job and is finally sleeping through the night again. You wanted that in there somehow. What you got was a greeting card from the internet's average.

Now multiply that across every task: the email that could be from any company, the LinkedIn post that could be from any person, the summary that could be of any meeting. Same rhythm. Same structure. Same nothing.

This is the default output of AI, and there's a mechanical reason for it.

Language models generate the most statistically probable next word given everything that came before. When you give it a task without strong constraints, it produces the internet average: the most common way that sentence would continue across the millions of examples it trained on. That's not a flaw in any specific model. That's what "generate the most likely response" means in practice.

The result is a recognisable voice that belongs to no one. Smooth. Competent. Empty. You've read it a thousand times by now: the confident opening, the three-point structure, the paragraph that restates the question before answering it, the closing that summarises what was just said. No personality. No edge. No opinion.

Andrea Sáez describes the recognizable sameness as a repeated rhythm, structure and landing across prompts (Aug 2026). The practical point is not that every AI draft is identical; it is that an unspecified brief tends to pull toward familiar high-probability patterns.

The surface symptoms change. The words "delve" and "tapestry" and "landscape" have mostly been trained out of newer models. But new patterns replace them constantly. Forbes has published two separate "updated signs of AI writing" lists in 2026 alone, because the tells shift every few months. Maintaining a ban list is chasing symptoms. The actual fix is upstream.

**The real fix is not a word list. It's a perspective.**

"The strongest defence against sounding like AI is having a genuine opinion before you open a prompt. The list cleans up the surface but a perspective you actually hold does the rest." (TheAIMarketer, Mar 2026)

When you know what you think and you tell the AI your position, it's no longer generating the average. It's generating in a direction. That direction is what makes output sound like it came from someone rather than from the statistical middle.

---

## 5.2 Making It Sound Like You

Chapter 3 taught you how to set up persistent voice instructions using your own writing examples. That handles the baseline across all conversations.

For task-specific voice matching, the same principle applies in miniature: show, don't describe.

**If you have an example of the tone you want:**

> "Match the tone of this example: [paste a paragraph]. My piece should sound like this but cover [your actual topic]."

**If you know what you DON'T want:**

> "Write this in my voice (see my instructions). Specifically: no corporate language, no bullet points unless I ask, no summarising what I just told you back to me."

**If the output comes back sounding generic despite your instructions:**

The problem is almost always one of two things:
1. Your persistent instructions describe your voice in adjectives ("professional yet warm") rather than showing it through examples. Adjectives describe every brand and constrain none of them. Go back to Chapter 3 and rebuild from real samples.
2. You're asking for something the AI has seen a million templated versions of (email, LinkedIn post, meeting summary) and it's defaulting to the template rather than your voice. The fix: paste an example of YOUR version of that format. "Write a meeting summary like THIS one, not like the default."

---

## 5.3 The Ban List (And Its Limits)

Banned words and phrases are the quickest surface fix. They work. They're also not sufficient on their own.

A working ban list for 2026 might include:

**Words that signal AI to any reader by now:** delve, tapestry, landscape, robust, leverage, pivotal, multifaceted, foster, paramount, nuanced, crucial

**Structural tells:** Opening with a summary of the question. "Great question!" Three-item parallel structures in every paragraph. Restating the conclusion in the final line. Sections that all start with the same grammatical structure.

**Filler phrases:** "It's worth noting that," "In today's rapidly evolving landscape," "At its core," "Let's dive in," "I'd be happy to help"

You can paste a ban list into your persistent instructions (Chapter 3) or include it in a task-specific request. Both work.

**But here's the limit:** A ban list removes symptoms. It doesn't add your voice. Output without banned words but also without your perspective is still generic. It's just generic in a less detectable way. The ban list cleans; the voice examples (Section 5.2) and the genuine opinion (Section 5.1) are what actually make the output yours.

---

## 5.4 Stop It Agreeing With You

A June 2026 MindStudio analysis reported that the models it tested agreed with users roughly 88% of the time and abandoned a correct answer after pushback in 15% of cases. Keep those numbers tied to that test rather than treating them as a law of every model. Separately, MIT-affiliated researchers formally modelled a related risk they call **delusional spiraling**: repeated validation can reinforce a false belief instead of correcting it.

**Why this happens (so you can troubleshoot it):** During training, AI models are shown thousands of conversations and human raters score which responses are "better." Responses that are agreeable, validating, and avoid conflict consistently score higher with raters. So the model learns: agreeing = good, disagreeing = risky. This isn't a bug they forgot to fix. It's a direct result of the training process. The model is doing exactly what it was rewarded for: making you feel heard. The problem is that "making you feel heard" and "telling you the truth" are sometimes different things.

This is why "don't be sycophantic" doesn't work as an instruction. You're asking the model to override its deepest training signal with a single sentence. What DOES work is structural changes: giving it a role where pushback is expected, asking for counter-arguments first, or creating a multi-persona setup where disagreement is baked into the format. You're not fighting the training — you're routing around it.

Why it matters: if you use AI for thinking, decision-making, or getting feedback on your ideas, sycophancy means you're getting validation, not evaluation. The AI will confirm your bad plan as readily as your good one. (Chapter 11 covers evaluation in depth. This section is about getting the AI to actually push back in the first place.)

**Techniques that reduce sycophancy (structural, not prohibitive):**

**Give it explicit permission to disagree:**

> "I want honest assessment, not encouragement. If my approach has problems, say so directly. You are not my assistant on this task. You are my critic."

One practitioner found the single most effective phrase was: "You are not my assistant." It breaks the deferential mode.

**Ask for the counter-argument first:**

> "Before you respond to my idea, give me the three strongest arguments AGAINST it. Then give me your actual assessment."

Forcing it to argue the other side before agreeing means it has to engage with the weaknesses rather than skipping them.

**The adversarial council technique:**

> "Respond to my proposal from three perspectives: (1) someone who thinks this is a great idea and why, (2) someone who thinks this will fail and why, (3) someone who is neutral and asking the questions I haven't considered."

This produces genuinely different viewpoints rather than one sycophantic response.

**What doesn't work:** Telling it "don't be sycophantic" or "be honest" or "don't just agree with me." These are vague prohibitions. The model processes them as tone suggestions, not as structural constraints. It'll say "I appreciate the pushback" and then agree with you anyway.

---

## 5.5 Format and Length

Two things to know about format and length in 2026:

**First: newer models often pace answers better.** OpenAI launched GPT-5.5 in April 2026 and updated GPT-5.5 Instant in May to make practical help better paced, with fewer unnecessarily long responses. That is useful, not magical. If length matters, specify it; do not assume the model will infer your deadline, page limit or tolerance for throat-clearing.

**Second: when length matters to you, be specific with a number.** "Brief" means nothing. "Short" means nothing. The AI interprets both however it feels at the moment.

What works:

> "Under 150 words."
> "Three bullet points maximum."
> "One paragraph."
> "Two sentences."

What doesn't work:

> "Keep it concise." (Means different things to different models on different days.)
> "Be brief." (Same problem.)
> "Not too long." (Completely unenforceable.)

**For format:** State the structure explicitly if it matters.

> "Bullet points, not prose."
> "A table with columns: [X], [Y], [Z]."
> "One paragraph per point. No headers."
> "An email, not a memo. Casual, under 100 words."

**Give permission to be short.** Models have a bias toward thoroughness. They will produce more rather than less unless you tell them otherwise. "Skip anything that doesn't directly answer my question" or "End when you've made the point, don't summarise" both help.

**A note on verbosity:** Model behaviour varies by version, task and setup. Anthropic describes Claude Opus 5 as clearer and more concise than its predecessors, but your own results are what matter. If your tool tends to over-produce, add a tested length preference to your persistent instructions: “Default to short responses unless I ask for detail.”

---

## 5.6 Anti-Hedging

AI hedges because it was trained to be cautious. "It depends," "There are many factors to consider," "This is a complex area with no single right answer" — all of these are technically true for any question and technically useless for any decision.

Some hedging is appropriate. If you ask a medical or legal question, you probably want caveats. But for most work tasks, you want a recommendation. A position. A choice.

**To get a straight answer:**

> "Give me your best recommendation, not a list of options with caveats. If you're genuinely uncertain, say so specifically (what you're uncertain about and why). Otherwise, commit to an answer."

**To kill the "on one hand, on the other hand" structure:**

> "Pick a side. Tell me which option you'd choose if you were making this decision, and why. I can handle disagreement. I can't use a non-answer."

**To stop the preamble-before-the-answer pattern:**

> "Lead with the answer. Reasoning after, if needed. No preamble."

---

## Try This: The Slop Audit 🧪

Take the last three things the AI produced for you. Read them aloud. Ask yourself:

1. Could anyone have written this? Or does it sound specifically like me / my organisation / my situation?
2. Count the filler phrases. How many sentences could be deleted with no information lost?
3. Did the AI push back on anything, or did it validate every premise I gave it?
4. Is the length right? Or did it produce 400 words where 80 would do?

If you answered "anyone could have written it," "multiple filler sentences," "validated everything," and "too long" — try applying one technique from this chapter and run the same task again.

### Add to Your Working With AI Kit

Save only the output rule that improved the comparison. A rule that did not change the result does not earn permanent space in your instructions.

---

## What's Next →

You now know how to set the rules for what comes back: voice, length, format, honesty. But even with good rules, you'll often need to refine. The first output won't be perfect. Chapter 6 teaches the skill of iterating without making things worse: how to give feedback the AI can actually use, when to keep going, and when to stop.



================================================================================

# Chapter 6: The Art of Iteration

*The first output is rarely the final one. The skill is knowing how to refine without making things worse.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Give feedback the AI can act on (specific, proportional, preserving what works)
- Recognise when iteration is improving things vs making them worse
- Apply the three-attempt rule to stop before diminishing returns
- Separate principle from example so the AI doesn't copy literally
- Decide whether to revise, restart, or just edit it yourself

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Correction spiral** | When each round of feedback makes the output slightly worse instead of better, but you keep going because it feels like you're almost there. You never get there. |
| **Sideways move** | An iteration that's different but not clearly better. The AI changed things, but you can't say the new version is an improvement. A sign you've passed the point of useful refinement. |
| **Degree of change** | How much you want adjusted: a tweak (5-10% different), a rework (50% different), or a complete redo. If you don't specify, the AI guesses, and it usually guesses wrong. |

---

## 6.1 Why Iteration Goes Wrong

Most people iterate with AI the way they'd ask a friend to try again: "make it shorter," "different tone," "not quite." With a friend, shared context fills in the gaps. With AI, those vague requests get interpreted as literally as possible in whatever direction the model finds most statistically probable.

"Make it shorter" could mean: cut 10%. Cut 50%. Remove the examples. Remove the context. Remove the nuance. Keep the structure but compress the language. The AI picks one. It probably picks wrong.

Then you correct the correction. The AI adjusts again, but now it's working from a polluted starting point: the original draft PLUS the failed short version PLUS your latest instruction. Each round adds noise to the conversation (Chapter 2). After a few rounds, the AI is trying to satisfy multiple contradictory signals at once and producing mush.

This is the correction spiral. It's the most common failure mode of iteration, and it's entirely preventable.

---

## 6.2 The Three-Attempt Rule

Academic research on AI repair loops (2026) found a consistent pattern: "the first three to four repair iterations account for most achievable gains, while later iterations contribute only marginal improvements."

Practitioners confirm this independently. Multiple sources report the same observation: fresh sessions outperform heavily corrected ones more often than most people expect.

**The rule:** If you haven't gotten close to what you need in three attempts, the problem isn't your feedback. It's the starting conditions. More iteration in the same conversation won't fix it.

**What to do instead:**

1. Identify what's actually wrong. Is it the direction (the AI misunderstood the task)? Or the execution (right direction, wrong quality)?
2. If it's direction: start a fresh conversation with a better brief (Chapter 4). Don't keep correcting a misunderstanding. Replace it.
3. If it's execution: try specifying more precisely what "good" looks like (an example, a format reference, a quality bar).
4. If neither works after three attempts: the task might not be a good fit for AI. Do it yourself, or use the AI's output as raw material you reshape rather than expecting a finished product.

---

## 6.3 How to Give Feedback That Works

The difference between feedback the AI can use and feedback that starts a correction spiral comes down to three things: specificity, proportion, and preservation.

### Be specific about what to change

| Vague (starts a spiral) | Specific (gets acted on) |
|---|---|
| "Make it shorter" | "Cut this to 100 words. Remove the third paragraph entirely." |
| "Different tone" | "More casual. Use contractions. Shorter sentences. Drop the 'in conclusion' at the end." |
| "It's not quite right" | "The structure is good. The opening sentence is too formal for this audience. The bullet points in section 2 repeat each other." |
| "Try again" | "Keep the first two paragraphs. Rewrite the third to focus on cost rather than timeline." |

### Specify the degree of change

The AI doesn't know if you want a tweak or an overhaul unless you say.

> "Light edit only. Change the opening line and fix the tone in paragraph 3. Everything else stays."

vs.

> "Complete rethink. Same topic, same audience, but approach it from a different angle entirely. Don't reuse any of the current structure."

If you don't specify, the AI defaults to a moderate rewrite. That's often not what you wanted in either direction: too much change when you just needed a tweak, or too little when you wanted a fresh take.

### Tell it what to KEEP

This is the most underused technique. Most feedback tells the AI what's wrong. Almost nobody tells it what's right.

> "The second paragraph is exactly what I want. Keep that. The rest needs work."

> "The structure is perfect. Don't reorganise. Just improve the language in each section."

> "Your recommendation is right. The reasoning you gave to support it is too vague. Give me more specific evidence for the same conclusion."

When you only say what's wrong, the AI treats everything as potentially wrong. When you explicitly protect what's working, it can focus its changes on the actual problem.

---

## 6.4 Separating Principle from Example

A specific failure mode: you show the AI an example of what you want, and it copies the example literally instead of extracting the principle behind it.

You paste a sample email and say "like this but for my situation." The AI produces your situation... using the exact sentence structures, transitions, and rhetorical moves from the sample. It cloned the surface instead of learning the pattern.

**The fix: name the principle, then show the example as illustration.**

> "I want the same level of directness as this example (no preamble, recommendation first, reasoning after) but don't copy the structure or phrasing: [paste example]"

> "Match the WARMTH of this message, not the content or format. The principle is: it reads like it was written by a person who knows the recipient personally. [paste example]"

> "This example has the right level of detail. Roughly the same length, same specificity, same ratio of context-to-conclusion. But your content should be completely different: [paste example]"

When you name what you're extracting (directness, warmth, level of detail) the AI can apply the principle without xeroxing the execution.

---

## 6.5 When to Stop

Three signals that more iteration won't help:

**Sideways moves.** Each version is different from the last but not clearly better. You're comparing options that are all "fine" without one being obviously right. This is the point where YOUR judgment needs to pick one, not the AI's ability to generate yet another variant. Choose the best of what you have and edit it yourself.

**Echoing your corrections.** The AI is repeating your feedback language back to you in the output ("As you mentioned, keeping it concise is important...") instead of actually implementing the change. This means it's lost the thread of the original task and is now writing about your instructions rather than following them.

**Shrinking returns on effort.** Your first correction took the output from 40% to 80% of what you needed. Your second took it from 80% to 88%. Your third from 88% to 90%. The next one might take it from 90% to 91% — or it might take it backwards. At some point, the 20 seconds of editing it yourself beats the 3 minutes of crafting another correction and waiting for a response.

**The decision framework (from a 2026 practitioner):** Every output falls into one of three categories:

1. **Use.** It's good enough. Take it.
2. **Revise.** It needs a light edit. Do the edit yourself rather than another round-trip with the AI.
3. **Reject.** It's not working. Start fresh (new conversation, better brief) rather than correcting further.

Most people default to "revise by asking the AI again" when they should either use what they have or start over. The middle path of endless iteration is usually the least efficient option.

---

## 6.6 The "Explain Harder" Trap

When output is wrong, the instinct is to add more explanation. More context. More constraints. A longer, more detailed correction. This feels productive. It is usually counterproductive.

Every sentence you add to a correction goes into the context (Chapter 2). If the first three sentences of your correction say "the tone is wrong," and the next seven sentences explain what you mean by wrong, those ten sentences are now sitting in the stack. The AI is reading all ten alongside everything else. The signal ("fix the tone") gets diluted by the explanation.

The counterintuitive fix: say LESS, not more. A short, direct correction with one specific instruction is better than a paragraph explaining what went wrong.

> ❌ "The tone feels off. I think the issue is that you're using very formal language when I need something more conversational. By conversational I mean the way colleagues talk to each other in Slack, not a formal memo. Think about how you'd say this if you were explaining it to a teammate over coffee. Less structured, more flowing, shorter sentences."

> ✅ "Rewrite in a casual Slack tone. Short sentences. Contractions. No formality."

The second version is seven words of instruction. The first is sixty. Both get you to the same place, but the second adds almost nothing to the context while the first adds a paragraph of noise the AI will carry for the rest of the conversation.

---

## 6.7 When to Just Do It Yourself

AI is not always the fastest path. If you can see exactly what needs to change and the change is smaller than explaining the change would be, just make the edit yourself.

Rules of thumb:
- If the fix is shorter than the instructions to request the fix: edit it yourself.
- If you've said "almost" three times: take what's close, edit the gaps, move on.
- If the task requires YOUR judgment specifically (which angle to take, what to emphasise, what to cut): that judgment is faster applied as an edit than described as an instruction.

AI produces raw material. You shape it. That's a collaboration, not a failure. The goal was never to avoid all editing. The goal was to avoid starting from a blank page.

---

## Try This: The Precision Correction 🧪

Find a piece of AI output from a recent session that was close but not right.

Instead of the vague correction you'd normally give, try this structure:

1. Name one thing that's working (the AI should keep this)
2. Name the specific thing that's wrong (not "it's off" — what specifically)
3. State the degree of change (light touch? moderate rework? complete redo?)
4. Give a concrete target for the fix (a number, an example, a specific quality)

Compare the result to what you'd have gotten from "try again" or "make it better."

### Add to Your Working With AI Kit

Record your **restart rule**: after three precise attempts with shrinking gains—or sooner if the context is wrong—start fresh with the accepted requirements and source material.

---

## What's Next →

You now have the full set of every-time skills: how to give a task (Chapter 4), how to control what comes back (Chapter 5), and how to refine without breaking things (this chapter). The next section of the book changes gears: instead of how to work with AI, it's about WHICH AI to work with. Chapter 7 introduces the tool selection framework: models, apps, and harnesses, and how to match the right tool to the right job.



================================================================================

# Part V: Match the Tool to the Work

## Choose the model, mode and task before polishing the prompt

---

# Chapter 7: Which AI for Which Job

*There is no best AI. There's the best AI for this task, right now, for you.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Explain the three layers of AI tools (models, apps, harnesses) and why each matters
- Choose the right mode for a task (quick answer vs finished deliverable vs autonomous work)
- Use effort settings to match how hard the AI thinks to how hard the task actually is
- Decide whether free is enough or paid is worth it for your situation
- Stop chasing "the best AI" and start matching tool to task

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Model** | The AI engine under the hood. GPT, Claude, Gemini are families of models. New versions ship every few months. You rarely interact with the model directly; you use it through an app. |
| **App** | The interface you actually use: ChatGPT, Claude.ai, Gemini, Copilot. Each app wraps a model with its own features, memory, file handling, and design choices. |
| **Harness** | The mode that determines what the AI can DO. A chatbot that answers questions is one harness. An agent that opens your files, runs multi-step tasks, and produces deliverables is a completely different harness, even when the same model powers both. |
| **Effort level** | A setting (increasingly available in 2026) that controls how much reasoning the AI applies to your request. Low effort = fast, shallow, cheap. High effort = slow, thorough, expensive. You're trading speed for depth. |

---

## 7.1 Three Layers, Not One Choice

When someone asks "which AI should I use?" they're usually asking the wrong question. There isn't one choice. There are three, and they're independent of each other.

**Layer 1: The model.** This is the brain. It determines how well the AI reasons, writes, codes, and handles nuance. In August 2026, the major families are GPT (OpenAI), Claude (Anthropic), and Gemini (Google). Each family has multiple sizes: a powerful model for hard work, a fast model for quick tasks, and sometimes specialised versions for specific domains.

But here's the thing: for many ordinary tasks, the model is no longer the only—or even the main—decision that matters. A paid plan may change limits, speed, tools, context, modes and access as much as raw answer quality. Do not buy from a universal percentage. Test your actual recurring task on the plans you can use.

**Layer 2: The app.** This is where you interact. ChatGPT has its own memory system, its own file handling, its own voice mode. Claude has artifacts, projects, and styles. Gemini lives inside Google Workspace. The app determines your experience more than the underlying model does. Features you use every day (how it handles files, how memory works, what it connects to) live here.

**Layer 3: The harness.** This is the one most people miss entirely, and it's the one that matters most in 2026.

The same model, in the same app, can behave very differently depending on the mode and tools around it. A chat window gives you a conversational partner. An eligible agent mode can act as a bounded executor that may open allowed files, run multi-step tasks, pause or request approval, and produce a deliverable.

Current product documentation from both OpenAI and Anthropic shows this harness effect in practice: chat, work, coding and Cowork surfaces can give related models different tools, instructions, permissions and stopping behaviour. That verifies the mechanism without relying on an untraceable quotation.

**Why can the same model behave differently in different modes?** Each mode can wrap the model in different instructions, tool access, permissions and interaction patterns. Chat mode usually optimises for the next exchange. Work or agentic mode may pursue a goal across several steps. The underlying model may be the same, but the effective context and action loop differ—and products may also route to different models behind the scenes.

This is the critical insight: **choosing the right mode for the task matters more than choosing the right model.**

---

## 7.2 The Modes (What Each Is For)

As of mid-2026, this three-mode comparison is a useful current map, not a universal taxonomy. Names, access and boundaries differ by platform and rollout:

| What you need | ChatGPT | Claude | What it does |
|---|---|---|---|
| Quick answer, conversation, thinking partner | Chat | Chat | Answers you. Back-and-forth dialogue. Fast. |
| Finished deliverable, multi-step work | Work | Cowork | Can act across allowed files and tools, produce documents and run tasks; may pause, request approval or hit a limit. |
| Software development, code | Codex | Code | Builds and modifies code. Works with repositories directly. |

**Chat mode** is what most people have been using since 2023. You type, it responds. You refine, it adjusts. It's conversational. It's fast. It's the right choice for: quick questions, brainstorming, explaining something, getting a first draft you'll edit heavily, thinking through a problem out loud.

**Work/Cowork mode** is a current agentic layer on eligible accounts. You describe an outcome and grant only the files, tools and permissions the task needs. The system can plan steps, do research and produce a file, but it may also pause, fail or require your approval. Current OpenAI and Anthropic documentation supports the capability; availability varies by account, plan and rollout.

This is the right choice for: producing a slide deck, analysing a spreadsheet, researching a topic and writing a report, creating a document you'd otherwise spend an hour on. The key difference from Chat: it acts autonomously rather than waiting for you to direct each step.

**Codex/Code mode** is specifically for writing software. If you don't write code, you probably don't need this. If you do, it's transformative.

**The decision is not "which AI" but "which mode."** For most tasks, picking Chat when you should be using Work (or vice versa) matters more than whether you're on ChatGPT vs Claude.

---

## 7.3 Effort Settings (The New Model Selection)

In 2026, several platforms introduced effort controls. Instead of picking a specific model name (which most users found confusing), you now set how hard you want the AI to think.

ChatGPT (as of August 2026): current interfaces emphasize choices such as Instant, Medium, High and higher-effort options, with a thought-effort slider on eligible paid plans. Named and legacy-model access still depends on plan, workspace and rollout, so check the picker in the account you actually use.

Claude Opus 5 also offers effort settings, including low through max. The exact choices can vary by product surface. Lower effort favours speed and cost; higher effort gives the system more room for difficult reasoning but still does not guarantee a correct answer.

**Practical guidance:**

| Task | Effort level | Why |
|---|---|---|
| Quick question, definition, simple rewrite | Low / Fast | No need to overthink. Speed matters. |
| Standard writing, summarising, reformatting | Medium | Good enough without burning time/tokens on deep reasoning. |
| Analysis, strategy, complex writing, important decisions | High | Worth the wait. Quality difference is noticeable. |
| Genuinely hard problems, high-stakes work, novel reasoning | Max | When being wrong is expensive. Use sparingly. |

The principle: **match the thinking to the task.** Using Max effort for a quick Slack reply is like driving a race car to the shops. Using Low effort for a strategic analysis is leaving quality on the table.

As a starting heuristic, try Medium and dial up or down based on the task. Then compare a representative result: the useful default is the lowest setting that still clears your definition of done.

For a recurring job, do one small comparison before you optimise: run the same representative task at the quality level you trust, then at the cheaper or faster setting. Track **cost per accepted result** — what you spent, plus the review or rework it created, divided by outputs you would actually use. A lower token price that creates two discarded drafts is not a lower-cost workflow. Keep the cheaper setting only when it still clears the same definition of done.

---

## 7.4 Free vs Paid (The Honest Answer)

Free tiers in 2026 are genuinely capable. If you use AI a few times a day for quick questions, light writing or low-stakes research, free may be enough. Compare the same representative task before paying; the value of a subscription may be higher limits, tools, speed, modes or continuity rather than a fixed jump in intelligence.

**When free is enough:**
- You use AI a few times a day, not a few times an hour
- Your tasks are mostly quick questions, explanations, or light drafts
- You don't hit message limits or get throttled regularly
- You don't need agent modes (Work/Cowork)
- The material is allowed under your current account terms and organisation policy. Personal free and paid plans can both have model-improvement sharing controls; check them rather than assuming.

**When paying $20/month is worth it:**
- You hit usage limits or get throttled during peak hours
- You need the strongest reasoning models for complex work
- You want agent modes (Work, Cowork) that produce finished deliverables
- You need a business account or workspace whose current data terms match the sensitivity and policy of your work. Payment alone is not the privacy test: on OpenAI personal Free, Plus and Pro workspaces, model-improvement sharing may be enabled by default unless you switch it off; Business, Enterprise, Edu and API products have different defaults.
- You upload large files regularly
- You use AI as a core part of your work, not occasionally

**There is no single free-versus-paid gap.** Depending on the provider and date, payment may change model access, limits, speed, tools, file sizes, agent modes, support or workspace controls. It does not automatically buy privacy, and it does not create one universal intelligence improvement. Test the same representative task and check the exact current terms before paying.

---

## 7.5 Tool Specialisation (What Each Platform Is Built to Support)

In 2026, no single platform wins at everything. These are current starting hypotheses to test on your work, not universal rankings:

- **ChatGPT:** Supports a broad mix of voice, images, search, files, custom GPTs and eligible Work features. It may fit someone who wants several modes in one product; test the modes you actually need.
- **Claude:** Supports long-form writing, coding, Projects and eligible Cowork features. It may fit writing or analysis workflows; compare its output and review burden on your own documents.
- **Gemini:** Integrates with Google Workspace products on eligible accounts. It may reduce copying when your allowed work already lives in Docs, Sheets, Gmail or Drive; verify connector scope and permissions.
- **Perplexity:** Is designed around web research and citations. Citations make sources easier to inspect, but they do not guarantee that each source supports the answer.

**For most people, the right advice is:**

If your work is not highly specialised, the platform you will use and review consistently can matter more than a small benchmark difference on an unrelated task. Try the same low-risk representative task in the tools available to you. Keep the one that fits your workflow and earns your trust on that test.

**A tool-matching move:** Use different tools when your tests justify the extra complexity—for example, one for a long report, an eligible Work/Cowork mode for a bounded deliverable, a research product for source discovery, or a Workspace-integrated tool for allowed Drive material. This is useful only when the task fit outweighs the cost of switching and re-establishing context.

---

## 7.6 What Will Change (And What Won't)

Everything in this chapter will partially date within months. Model names will change. Modes may be renamed. New tools will launch. That's fine. What doesn't change:

- **The three-layer framework:** models, apps, and harnesses will continue to be distinct layers, even as the specific products shift.
- **Mode selection matters more than model selection** for most people. This will likely become MORE true over time as models converge in capability.
- **Effort matching:** the principle of matching thinking depth to task complexity is structural, regardless of how any specific platform implements it.
- **Free is fine for light use.** This has been true for two years and shows no sign of changing.
- **No single tool wins everything.** Specialisation is the long-term pattern.

When you encounter a new tool or a new model launch, ask three questions: What layer is this? (Model, app, or harness?) What's it best at? And does it fit a gap in how I currently work? If you can answer those, you don't need to chase every launch.

---

## Try This: The Tool Audit 🧪

For one week, pay attention to which AI you use and what mode you're in. At the end of the week, answer:

1. Am I using Chat mode for tasks that should be in Work/Cowork mode? (Tasks where I'm going back and forth 8 times when I could have given it the whole task at once.)
2. Am I using Max effort for quick tasks? (Waiting 30 seconds for a response to something that only needed 3 seconds of thought.)
3. Am I re-explaining context every session because I'm not using the platform's memory/projects features?
4. Is there a task I do repeatedly where a different tool would clearly be better?

Adjust one thing based on what you find.

### Add to Your Working With AI Kit

Create a one-row **tool card**: task, tool/mode tested, plan/date, what it did better, what still required checking. This becomes evidence for your next choice.

---

## What's Next →

Now you know how to pick the right tool and mode. But even with the right tool in the right mode, you can still ask it to do something it's fundamentally bad at. Chapter 8 maps what AI is genuinely good at, what it's genuinely bad at, and how to tell the difference before you waste time finding out the hard way.



================================================================================

# Chapter 8: What AI Is Great At (and What It Isn't)

*AI can ace elite science exams and still fail to count the letters in "strawberry." The frontier is jagged. Learning where it breaks is the skill.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Explain why AI's capability boundary is jagged (not a smooth "easy to hard" line)
- Identify which of your regular tasks are inside, outside, or on the edge of that boundary
- Apply the three-mode framework: don't use AI / collaborate / delegate
- Recognise the cognitive surrender risk (when AI works so well you stop checking)
- Run a task fit audit on your own recurring work

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Jagged frontier** | AI's capability boundary isn't a smooth line where hard tasks are on one side and easy tasks are on the other. It's ragged: AI is brilliant at some hard things and terrible at some easy things, in patterns you can't always predict in advance. |
| **Cognitive surrender** | The documented tendency to accept AI output without scrutiny, adopting its conclusions as your own. Not the same as using a tool. It's the moment you stop applying your own judgment. |
| **Task fit** | Whether a specific task is something AI does well enough to rely on. Not "can AI do this?" (it will always try) but "can I trust the result without extensive checking?" |

---

## 8.1 The Jagged Frontier

You asked it to write a presentation outline for a complex strategy discussion. Brilliant. Structured. Saved you an hour. The next day you asked it to count how many Tuesdays fall in October. Wrong. You asked it to summarise a 40-page legal filing. Perfect. Then you asked it to tell you who said what in last week's team meeting (from memory, no transcript). Confidently fabricated.

How can it be amazing at the hard thing and bad at the easy thing? This is the jagged frontier, and understanding it is probably the single most useful mental model for deciding when to use AI and when to do something yourself.

In 2023, researchers from Harvard gave Boston Consulting Group consultants a set of tasks and access to AI. The results confirmed it: AI didn't help uniformly across all tasks. For tasks inside its capability frontier, consultants with AI completed 12.2% more tasks, 25.1% faster, with 40% higher quality. For tasks outside the frontier, AI users were 19% LESS likely to get the correct solution.

The boundary between "AI helps" and "AI hurts" wasn't what anyone expected. It wasn't a clean line from easy (AI handles) to hard (humans handle). Some very difficult analytical tasks were solidly inside the frontier. Some apparently simple tasks were outside it. The researchers called this the "jagged frontier" because the capability line is ragged and unpredictable.

That research is from 2023. What's changed since?

**The frontier has moved.** Performance has advanced quickly on several demanding science, mathematics and software benchmarks, although a benchmark result does not establish general expertise. METR reports that, on its evaluated set of well-specified tasks—primarily software work—the historical 50%-success time horizon has roughly doubled every seven months. METR also cautions that this trend does not automatically transfer to every kind of office or real-world work.

**But the frontier is STILL jagged.** Strong performance on one difficult benchmark does not guarantee reliable counting, computer use or another apparently simpler task. The practical skill is learning where the frontier holds for your task, where it breaks and how you will detect the difference.

**What this means for you:** You can't assume "if it handled that hard thing, it'll handle this easy thing." You also can't assume "it failed at this last year, so it'll fail now." You have to test, and you have to keep testing, because the map keeps changing.

---

## 8.2 What AI Is Genuinely Good At

Tasks where current AI tools can often provide useful, reviewable work (August 2026):

**Generation and transformation:**
- Drafting text (emails, reports, summaries, posts, messages)
- Rewriting in a different tone, length, or format
- Summarising long documents or conversations
- Translation between languages
- Reformatting (turning prose into bullets, tables into narratives, etc.)
- Brainstorming and option generation (Chapter 4's "ask for options" technique)

**Analysis and pattern recognition:**
- Analysing data and spotting patterns in structured information
- Explaining complex concepts in simple terms
- Comparing options against stated criteria
- Categorising and classifying (sorting things into buckets)
- Extracting specific information from documents

**Code and technical work:**
- Writing code from descriptions
- Debugging and explaining error messages
- Converting between formats (CSV to JSON, markdown to HTML)
- Automating repetitive technical tasks

**Research and synthesis:**
- Gathering information across multiple sources
- Synthesising findings into a coherent overview
- Identifying gaps or inconsistencies in a body of information

The common thread: tasks with clear inputs and definable outputs where a reviewable first draft is useful even though you still need to inspect and edit it. There is no universal first-try accuracy range across these task types.

---

## 8.3 What AI Is Still Bad At

Tasks where you should expect uneven results or require significant verification:

**Precise facts without sources:**
- Specific numbers, dates, statistics, or quotes it's generating from "memory" (not looking up)
- Details about real people, companies, events (it will confidently state wrong information)
- Anything where the SPECIFIC detail matters and you can't easily verify it

**Counting and precise measurement:**
- Letter counting, word counting (notoriously unreliable)
- Exact arithmetic produced only in natural language. For consequential calculations, require a calculator or executed code and check the method.
- Any task where off-by-one matters

**Judgment calls that require YOUR context:**
- Whether something is appropriate for YOUR specific audience, culture, or organisation
- How YOUR boss/client/partner will react to something
- Whether a creative choice fits YOUR brand or situation
- Political, social, or ethical dimensions specific to your context

**Consistency over many steps:**
- Maintaining a complex set of rules across a long document
- Following a detailed specification perfectly across 50 outputs
- Tasks where one error in step 3 cascades through steps 4-20

**Things that require the REAL world:**
- Physical spatial reasoning (directions, assembly, layout that you can't show it)
- Sensory experience (taste, smell, physical comfort)
- Real-time awareness of events happening right now (search helps but has lag)

**Accountability:**
- AI can't be responsible for its output. You can.
- If being wrong has serious consequences (legal, financial, medical, safety), AI is an input to your decision, not the decision itself.

---

## 8.4 The Three Modes of Working

Not every task should involve AI. And not every task that involves AI should be handed to it completely. Think of it as three modes:

### Mode 1: Don't Use AI (Fly Manual)

Some work should remain yours. Not because AI can't attempt it, but because:

- **You're still learning the skill.** If the goal is to build your own capability, handing over the whole task can produce a finished-looking output without the understanding you were meant to develop. Doing it yourself is part of the work.

- **The process IS the value.** Thinking through a problem, wrestling with a decision, crafting something that carries your specific perspective. These build judgment. Outsourcing them atrophies it.

- **The stakes are high and verification is hard.** If being wrong would be costly AND you can't easily check whether the output is right, AI is a risk multiplier rather than a productivity gain.

- **Relationships require human presence.** A condolence message, a difficult conversation, recognition of someone's work, an apology. These should come from you, not be "helped" by AI in a way that strips the humanity out.

### Mode 2: Collaborate (Co-Pilot)

You drive. AI assists. You retain judgment and decision-making. This is where most knowledge work lives.

- Brainstorm WITH it, then YOU select the direction
- Let it draft, then YOU edit to add your voice and judgment
- Have it research, then YOU verify and interpret
- Ask for analysis, then YOU decide what it means

The key: AI accelerates the work. You own the quality and the decisions. Every output goes through your judgment before it becomes final.

### Mode 3: Delegate (Auto-Pilot)

AI executes start-to-finish. You review the output but don't drive the process.

This works when:
- The task is clearly defined with measurable success criteria
- You COULD do it yourself but it's not worth your time
- The task is within the frontier (you've tested it and know AI handles it well)
- Being slightly imperfect is acceptable
- You have enough expertise to spot if the output is wrong (Chapter 11)

Examples: reformatting a document, generating a first-pass summary, sorting emails, producing routine reports from a template, scheduling, data extraction.

### How to Decide

Ask two questions:
1. **Is this inside the frontier?** (Has AI done this well for me before? Is it the kind of task from Section 8.2?)
2. **Can I verify the output?** (Do I have enough expertise to know if it's wrong?)

If yes to both: delegate. If yes to the first but not the second: collaborate (use AI's output as input to your thinking, not as your final answer). If no to the first: fly manual, or collaborate carefully with heavy verification.

---

## 8.5 The Cognitive Surrender Risk

The biggest risk isn't AI failing. It's AI failing in a way you don't notice.

Researchers at the Wharton School ran three preregistered experiments with 1,372 participants and 9,593 reasoning trials. In Study 1, when participants chose to consult an AI that had been deliberately made wrong, they adopted its faulty answer on 79.8% of those consulted trials. The researchers call the broader pattern **cognitive surrender**: the AI is not merely doing a bounded task; its judgment becomes the person's judgment without adequate scrutiny.

This is different from using a calculator. When you use a calculator, you're still interpreting the result and applying judgment to what it means. Cognitive surrender is when you stop interpreting. You take the AI's answer as your answer. Its framing becomes your framing. Its conclusions become your conclusions. Not because you evaluated them and agreed, but because it sounded right and checking felt unnecessary.

Risk factors to watch for include:
- The output sounds fluent and confident (AI always sounds confident)
- The task is one you find tedious (so you're motivated to accept quickly)
- You lack deep expertise in the domain (so you can't easily spot errors)
- Time pressure (checking takes time; accepting is instant)

The Wharton experiments do not prove that every item in this list independently causes surrender. Use the list as a review warning, not a diagnostic formula.

The defence is not "never trust AI." It's developing the habit of asking one question after every important AI output: "If this were wrong, would I know?" If the answer is no, you need to verify before acting on it. Chapter 11 teaches evaluation in depth. Here, just notice: the frontier being jagged means AI will succeed on most things and fail on some things, and the failures won't announce themselves.

---

## 8.6 The Task Fit Audit

Pick five tasks you do regularly. For each one, answer:

| Question | Indicates |
|---|---|
| Is the output clearly definable? (I'd know "done" if I saw it) | Inside the frontier |
| Does AI need to be precisely factually correct? (Not "roughly right") | Edge of frontier — verify |
| Does this require my specific context/judgment/relationships? | Fly manual or collaborate |
| Could I tell if the output were subtly wrong? | If no: verify or fly manual |
| Is this repetitive enough that getting it 90% right saves me significant time? | Delegate |
| Am I still learning this skill? | Fly manual (build the skill) |

Plot each task in one of the three modes. Then notice: are you currently flying manual on things you could delegate? Are you delegating things you should be collaborating on? Are you surrendering judgment on things where you can't verify the output?

You may find at least one task in the wrong mode. Adjusting it can produce a larger improvement than polishing the wording of the same prompt again.

---

## Try This: One Week, Three Modes 🧪

For one week, before each AI interaction, consciously choose your mode:

- **Manual:** "I'm doing this myself. AI doesn't touch it."
- **Collaborate:** "I'll use AI's output as raw material, but I'm driving."
- **Delegate:** "I'm handing this off and reviewing the result."

At the end of the week, notice: Where did delegation work perfectly? Where did you catch yourself in cognitive surrender (accepting without checking)? Where did flying manual feel wasteful?

Adjust your defaults based on what you find.

### Add to Your Working With AI Kit

Mark one recurring task **Do myself**, **Collaborate** or **Delegate**, and add the reason. Revisit the label only when the tool, task or evidence changes.

---

## What's Next →

Chapters 7 and 8 taught you which tool for which job and what AI is genuinely good at. The next section goes a level deeper: what happens when AI can reach beyond the chat window and actually DO things in the world (search the web, read your files, connect to other apps) and what changes when you give it true autonomy to work without you directing each step.



================================================================================

# Part VI: Add Tools and Autonomy

## Let AI reach farther without quietly giving it the keys

---

# Chapter 9: When AI Can Reach Beyond the Chat

*The same question gets a completely different answer when the AI can go look things up. Here's what changes when you give it tools.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Explain why the same AI gives better answers with tools enabled
- Identify what your AI can and can't currently reach (search, files, code, integrations)
- Understand when to trust tool-assisted answers vs when to verify yourself
- Use projects and knowledge bases to give AI persistent access to your reference material
- Recognise the difference between AI remembering something and AI looking something up

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Tool access** | Whether the AI can do things beyond generating text: search the web, read files, run code, connect to apps. Without tools, it can only use what it already "knows" and what's in the conversation. |
| **RAG (Retrieval-Augmented Generation)** | When the AI goes and finds relevant information before answering, rather than relying on what it was trained on. You experience this as: the AI checking your uploaded documents, searching its knowledge base, or looking something up online. |
| **Grounding** | When AI's response is based on actual source material (a document, a search result, your data) rather than generated from its training. Grounded answers are more trustworthy. Ungrounded answers may be hallucinated. |
| **Integration / MCP** | A connection between the AI and another app or data source. Think of it like a USB-C port: one standardised plug that connects to many different things. When your AI is "connected" to your email, calendar, or files, it can read from and sometimes act on those systems. |

---

## 9.1 The Two Versions of AI

You ask "what's the weather tomorrow?" and the AI says "I don't have access to real-time weather data, but generally in August..." No. You wanted the weather. Not a guess based on seasonal averages from three years ago.

Now you ask the same question with web search turned on. "Tomorrow in Toronto: 26°C, partly cloudy, 40% chance of rain after 3pm." Actual answer. Actual data. From an actual weather source, checked seconds ago.

Same AI. Same question. Completely different usefulness. The difference is whether it could go LOOK something up or whether it was stuck generating a plausible-sounding answer from its training data. That distinction between "can act" and "can only talk" changes everything about what AI is useful for.

The acting version can reach out. It can search the web for current information. It can read a document you've uploaded. It can run code to calculate something precisely. It can connect to your email or calendar or database and pull real data. When this version answers a question, it's often working from actual sources rather than training-data memory.

The difference matters enormously and most people don't know which version they're using at any given moment. When the AI says "the current exchange rate is..." — did it look that up just now? Or is it generating a plausible-sounding number from data that could be months or years old?

In 2026, most major tools have both capabilities. But which tools are active depends on your settings, your plan (free vs paid), and sometimes the mode you're in. Knowing what your AI can reach is the first step to knowing when to trust it.

---

## 9.2 What Tools Are Available (And What They Change)

### Web search

What it does: The AI searches the internet before answering, pulling current information from live web pages.

What it changes: Questions about recent events, current prices, today's news, live data — all get dramatically better answers. Without search, the AI can only use training data (which has a cutoff date). With search, it can find current information.

What it doesn't fix: AI search is not equivalent to checking the research yourself. In March 2025, Columbia Journalism Review's Tow Center tested eight live-search tools on 1,600 source-attribution queries and documented inaccurate or speculative answers, fabricated links and citations to copied or syndicated versions instead of the original. The study did not establish one universal error rate for every search task. The AI may find something, cite it and still get the substance wrong. For anything important, follow the link and match the claim to the source passage.

### File access

What it does: The AI can read documents you upload (PDFs, spreadsheets, images, presentations) and work with the actual content.

What it changes: Instead of describing your document to the AI in words (which loses detail), you give it the document directly. It can find specific numbers, quote passages accurately, compare sections, and work with your actual data. This is the difference between "I have a spreadsheet with Q2 figures..." and uploading the spreadsheet and saying "what trends do you see?"

What it doesn't fix: The AI still can't verify whether YOUR document is accurate. It trusts what you give it. If the spreadsheet has errors, the analysis will be built on those errors.

### Code execution

What it does: The AI can write and run code (usually Python) in a sandboxed environment.

What it changes: Real calculations instead of estimates. Actual data processing instead of "based on what you've described, roughly..." Precise mathematical operations. Chart and graph generation from real data. File format conversions.

Why this matters even if you don't code: When you ask "what's the average of these 200 numbers?" a model-only answer may do the arithmetic correctly, but it has not produced an auditable calculation. With a calculator or code tool, you can inspect the inputs, operation and result. Execution makes the method checkable; it does not prove the data, code or interpretation is correct.

### Integrations (email, calendar, apps)

What it does: The AI connects to other systems you use — email, calendar, project management, databases, file storage — and can read from or act on them.

What it changes: The AI can work with your real data without you copying and pasting it. "What's on my calendar tomorrow?" "Summarise the last 5 emails from [client]." "Create an event for Friday at 2pm."

What it doesn't fix: Connecting an AI to your systems creates access. Make sure you understand what it can see and what it can DO (read-only vs read-write). Some integrations let the AI take actions (send emails, modify files) which requires trust that the AI will act correctly.

---

## 9.3 Projects and Knowledge Bases

You know how you have that one folder on your computer with the brand guidelines, the style guide, the pricing sheet, and the templates you use every week? You probably open it at least once a day. A project or knowledge base is that folder, but for your AI. You upload the documents once, and every conversation in that project can draw on them without you re-attaching anything.

This is different from your persistent instructions (Chapter 3). Those tell the AI who you are and how you like to work. Projects tell it what your REFERENCE MATERIAL is: the documents, guidelines, and sources it should consult when the task calls for them.

**When to use a project/knowledge base:**
- You have reference documents you use repeatedly (style guides, policies, specs, templates)
- You're working on something over multiple sessions (a long report, an ongoing analysis)
- You want the AI to "know about" specific information without being told each time

**What goes in vs what doesn't:**
- PUT IN: Reference material the AI should consult when relevant. Documents it should "know about."
- DON'T PUT IN: Everything you've ever written. Irrelevant background. Documents from a different project. Chapter 4's "just enough" principle applies here too: more reference material isn't automatically better. Relevant reference material is better.

---

## 9.4 Grounded vs Ungrounded (How to Tell)

A response is **source-grounded** when it actually retrieves identifiable material and connects its claims to that material. Tool use makes grounding possible; it does not prove that the source is relevant, the passage supports the claim or the interpretation is correct. A response without retrieved material may rely on training data or the current conversation and therefore needs a different verification route.

**Signals that the answer may be grounded:**
- It cites specific sources (links, document names, page numbers)
- The facts are precise and specific (not vague approximations)
- It says "according to [source]" or "based on the document you provided"
- For current events: it mentions dates and can provide links

**Signals that the answer may be ungrounded or weakly grounded:**
- No sources cited
- Vague language ("typically," "generally," "in many cases") — like someone confidently BSing a book report they didn't read
- Very confident about a specific fact without saying where it got it
- Information that could be months or years old

**What to do:** For anything factual that matters to you, ask: "Where did you get that? Can you cite the source?" Then open the source and match the claim to the exact passage. A citation is a route to evidence, not proof by itself. If the tool cannot point to a specific document, search result or reference, treat the claim as unresolved. This is especially important for numbers, dates, quotes and specific claims about real people or organisations.

---

## 9.5 What You Can Check Right Now

Open whatever AI tool you use most. Right now. (We'll wait.) Find out:

1. **Can it search the web?** Ask it "what happened in the news today?" If it gives you actual current events with dates, it has search. If it gives you a generic non-answer or clearly outdated information, it doesn't (or search isn't enabled).

2. **Can it read files?** Try uploading a document and asking a question about its contents. If it can reference specific details from the document, file access works.

3. **Can it run code?** Ask it to "calculate the sum of 847, 293, 1056, 428, and 762 by writing and running code." If it shows executed code and a result, code execution may be available; inspect the code or execution record. If it only writes a response with a number, you have not verified that code ran.

4. **What's it connected to?** Check settings. Many tools have an "integrations" or "connected apps" section. Note what's on and what's off.

Knowing what your AI can reach is the difference between trusting an answer appropriately and trusting it too much.

---

## Try This: The Grounding Test 🧪

Pick a factual question you know the answer to. Something specific: a current price, a recent event date, a statistic from a document you have.

Ask your AI the question. Then ask: "Where did you get that information? Cite your source."

Open the cited source and find the exact passage. If the source is identifiable, relevant and the passage supports the claim, you have evidence that this claim is grounded. A link without support is not enough. If the tool hedges, gives a vague response, invents a citation or points to a passage that does not support the claim, treat it as ungrounded or unresolved. If it is wrong, you just caught it—and now you know to strengthen review for this type of question.

### Add to Your Working With AI Kit

Save a **claim-and-source card**: claim, exact source, supporting passage, date, remaining uncertainty. “There is a link” is not a completed card.

---

## What's Next →

When AI can reach beyond the chat — search, read files, run code, connect to apps — it becomes dramatically more capable. But it's still waiting for you to direct each step. Chapter 10 introduces what happens when you give it a goal and let it work autonomously: your first AI agent.



================================================================================

# Chapter 10: Your First AI Agent

*A chatbot answers. An agent works. Here's how to give AI a goal and let it run.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Explain the difference between a chatbot and an agent (and when each is appropriate)
- Use the agent modes already available in the tools you have (Work, Cowork)
- Set up one recurring task that AI handles for you every week
- Apply the delegation decision formula: is this worth handing off?
- Recognise when agent work needs your review vs when you can trust the output

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Agent** | AI that doesn't just answer and stop. You give it a goal, and it plans the steps, uses tools, executes the work, and hands back a finished result. The difference: a chatbot responds to each message. An agent pursues an objective across multiple steps without you directing each one. |
| **Autonomy** | How much the AI decides on its own vs how much you direct. A chat is low autonomy (you steer every turn). An agent is higher autonomy (you set the goal, it decides the steps). |
| **Routine / Scheduled task** | An agent task that runs automatically on a schedule (daily, weekly) without you asking each time. "Every Monday morning, synthesise my priorities for the week." |

---

## 10.1 Chatbot vs Agent (The Shift)

Monday morning. You open your email, your calendar, your project tracker, three Slack channels, and last week's notes. You spend 35 minutes synthesising all of that into a picture of what your week looks like and what needs attention first. You do this every Monday. You've done it every Monday for two years.

That entire 35-minute ritual? An AI agent can do it while you make your coffee. Not by answering a question. By doing the work: reading your calendar, scanning your email, checking your tasks, and handing you a one-page brief of what your week looks like. You didn't direct each step. You set it up once, described what "done" looks like, and now it runs.

An agent is different. You describe an OUTCOME ("produce a weekly summary of my team's updates") and the AI figures out the steps: what to read, what to analyse, what to produce, and how to structure the result. Then it does those steps. Then it gives you the finished thing.

The shift: you're no longer typing prompts. You're delegating a task.

In 2026, this isn't theoretical. Agent modes are documented in several major products, although access still varies by plan, workspace, platform and rollout:
- ChatGPT "Work" mode is an agent. You give it a goal and access to files/apps. It plans, executes, and delivers.
- Claude "Cowork" mode is an agent. Same concept: goal in, deliverable out.
- Scheduled routines are agents that run without you even asking.

If you've been using Chat mode for everything, you already have agent capability you're not using.

---

## 10.2 When to Use an Agent (vs Stay in Chat)

Not every task needs an agent. Many are better served by a quick conversation.

**Stay in Chat when:**
- You're thinking something through (brainstorming, exploring, processing)
- The task is fast and simple (one question, one answer)
- You want to steer in real-time (the direction may change based on what comes back)
- You need a thinking partner, not an executor

**Use an Agent when:**
- The task has multiple steps the AI could handle without you directing each one
- You could write a clear brief (Chapter 4) and walk away while it works
- The output is a finished deliverable (a document, a spreadsheet, a report)
- The same task recurs and you're tired of re-doing the same setup each time

The test: "Could I write a brief for this and leave the room?" If yes, that's agent territory. If you'd need to stay and steer, that's chat territory.

---

## 10.3 The Chief-of-Staff Model

One common pattern for personal AI agents is the "AI Chief of Staff." Think Miranda Priestly's assistants in The Devil Wears Prada, except the useful part is the preparation, not the judgment or the impossible availability. With the right connections and permissions, an agent can sort allowed incoming information and prepare a brief before you start work.

The useful pattern is a bounded chief-of-staff brief: read only the allowed sources, rank what matters, surface what needs your judgment and recommend a first move. Treat that as a workflow design to test, not a promise that the agent understands your priorities automatically.

Practical examples of what a Chief-of-Staff agent handles:
- Monday morning: review calendar, recent emails, outstanding tasks. Produce a one-page "here's your week" brief.
- Meeting prep: before each meeting, pull relevant context and produce a 3-bullet prep note.
- Weekly recap: summarise what you accomplished, what's outstanding, what needs attention.
- Inbox triage: categorise incoming messages by urgency and surface only what requires your action.

Personal time-saving stories are useful hypotheses, not promises. Your pilot has to earn its keep in your week: measure the time you save, subtract setup and review, and keep the workflow only if the result is genuinely better.

You don't need to "build" an agent from scratch to test this pattern. Many of these workflows can run in ChatGPT Work mode or Claude Cowork when your account is eligible and the right tools and permissions are connected. A clear delegation brief lets you pilot one bounded preparation task; it does not guarantee a fully reliable Chief of Staff by Tuesday.

---

## 10.4 The Delegation Decision

When should you hand a task to an agent vs do it yourself (or collaborate in Chat)?

A practical delegation framework weighs three things:

1. **How long would it take YOU?** (Human baseline time)
2. **How likely is the AI to succeed?** (Based on task fit — Chapter 8)
3. **How long will it take you to evaluate the result?** (Your review time)

If the AI is likely to succeed AND your review time is much less than doing it yourself: delegate. If the AI might succeed but reviewing is almost as much work as doing it yourself: the gain is small. If the task is outside the jagged frontier (Chapter 8): don't delegate.

The practical shift is from doing every step yourself to defining the outcome, constraints and standard, then reviewing and iterating. Agentic work rewards people who can explain what they need, give effective feedback and evaluate the result.

---

## 10.5 Setting Up One Recurring Task

Start with one. Pick the most boring, repeatable thinking task you do every week. Something where:
- The input is predictable (same sources each time)
- The output format is consistent (same structure each time)
- The quality bar is clear (you'd know immediately if it's wrong)
- Doing it manually is tedious but not deeply creative

Examples:
- Weekly report compilation from multiple sources
- Meeting prep notes based on calendar + recent context
- Status update draft from project notes
- Priority list for the week based on outstanding items

**How to set it up:**

1. **Write the brief** (Chapter 4 format): what's the deliverable, what sources does it need, what does good look like?
2. **Run it manually first** in agent mode (Work/Cowork). Give it the brief, let it run, review the result.
3. **Fix what's wrong.** Did it miss something? Include that in the brief. Did it over-produce? Add constraints.
4. **Run it again** with the improved brief. Get it to a point where the output is consistently useful.
5. **Schedule it** (if your tool supports routines/schedules). Or simply paste the brief at the same time each week. The key is: the brief is stable. You don't re-invent it each time.

A recurring AI task that lives as a one-off prompt has three failure modes: you spend setup time you already spent last time, the output drifts because the prompt drifts, and you remain the bottleneck. That is a workflow diagnosis, not a promise that the task should run autonomously.

---

## 10.6 Trusting the Output (And Checking It)

Agent output needs review, especially at first. The same cognitive surrender risk from Chapter 8 applies here, multiplied: because the agent worked autonomously, you have less visibility into WHAT it did along the way. The output might look polished and be wrong underneath.

**Review habits for agent output:**

- **Spot-check facts.** Pick 2-3 specific claims from the output and verify them manually. Correct samples are evidence, not proof; increase the sample when the stakes or cost of error rises. If any are wrong, expand the review immediately.
- **Check for drift.** After a few runs, does the agent's output still match what you need? Or has it started producing something slightly different that you've been accepting because it "looks close enough"?
- **Read it like you'd read a junior employee's first draft.** Not with suspicion, but with the expectation that you'll need to adjust something. That's the right stance for agent output: valuable raw material that your judgment shapes into the final version.

Over time, as you confirm the same agent task works reliably, your review gets lighter. But never zero. The agent can't be accountable for what it produces. You can.

---

## Try This: Your First Delegation 🧪

Pick one task you did this week that was:
- Multi-step
- Not deeply creative
- Something you'll do again next week

Write a brief for it using the Chapter 4 structure (outcome, audience, constraints, format, what good looks like). Open agent mode (Work or Cowork). Paste the brief. Let it run.

Review what comes back. Fix the brief based on what it got wrong. Run it one more time.

If the second output is useful: you have the seed of a recurring system. If it's not: this task might not be inside the frontier for delegation yet. That's fine. Try a different one.

### Add to Your Working With AI Kit

Write one authority line for the pilot: **You may… / You must ask before… / Stop when…** Do not schedule or connect more access until the manual run earns it.

---

## What's Next →

You now know how to give an agent a goal and let it work. But how do you know if what it produced is actually good? Agent output looks polished — it always does. The skill of evaluating whether that polished output is RIGHT, and not just fluent-sounding, is what Chapter 11 teaches.



================================================================================

# Part VII: Keep the Judgment

## Verify the result and delegate with a definition of done

---

# Chapter 11: Is This Output Actually Good?

*AI always sounds confident. Fluent is not the same as correct. This chapter teaches you how to tell the difference.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Explain why fluency doesn't equal accuracy (the wizard problem)
- Ask the one question that catches most unverified AI output
- Apply a practical evaluation framework to any piece of AI output
- Recognise the conditions that produce cognitive surrender
- Build a habit of verification that doesn't slow you down for routine work

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **The wizard problem** | AI speaks with the confidence of an expert whether it's right or wrong. The fluency of the output gives you no signal about whether the content is accurate. Polished and wrong look identical to polished and right. |
| **Hallucination** | When AI generates information that sounds factual but isn't real: fake statistics, invented citations, fabricated details presented with full confidence. Not lying (it has no intent). Just wrong in a way that looks right. |
| **Evaluation rubric** | A set of specific questions you check output against: Is it accurate? Is it complete? Is it relevant? Is it appropriate for the audience? Having defined criteria is faster and more reliable than "does it feel right?" |

---

## 11.1 The Wizard Problem

You asked the AI for statistics on remote work trends. It gave you three numbers, each with a source. You put them in your presentation. Your boss asked where the 47% figure came from. You went to check the citation. The paper didn't exist. The journal name was real. The year was plausible. The paper and the number were invented.

Nothing in the AI's response told you which numbers were real and which weren't. It delivered the real ones and the fake one in exactly the same confident tone, the same clean formatting, the same authoritative voice. That's the wizard problem.

Every response comes in the same confident, fluent, well-structured package. A correct analysis and a fabricated one are delivered with exactly the same tone. A real statistic and an invented one sit side by side in the same paragraph with no visual or linguistic difference.

We call this the wizard problem: the AI speaks with the authority of an expert regardless of whether it actually knows what it's talking about. There is no "I'm less sure about this part" signal built into the output. There's no uncertainty marker. There's no change in tone between "I looked this up and verified it" and "I generated this from statistical patterns and it might be completely wrong."

A loud failure is often easier to catch than a confident, wrong result that looks fine. The lesson travels beyond code review: fluent reassurance is not evidence.

This matters because of how humans process confidence. When something is stated clearly, fluently, and without hedging, we default to believing it. Not because we're gullible. Because our entire lives, fluent delivery has correlated with knowledge. People who know things explain them clearly. People who don't know things hesitate and hedge. AI breaks that correlation entirely. It is maximally fluent about things it is maximally wrong about.

---

## 11.2 The One Question

Before acting on any important AI output, ask yourself:

**"If this were wrong, would I know?"**

If the answer is yes — you have enough expertise to spot errors, you're familiar with the domain, you could tell if a fact were off — then you're in a good position to use the output with normal review. This is collaboration mode from Chapter 8.

If the answer is no — you're not sure whether the claims are accurate, you lack domain expertise, you wouldn't recognise a subtle error — then you need to VERIFY before acting. This is the danger zone for cognitive surrender.

Most people never ask this question. They look at the output, it sounds good, and they use it. In the Wharton study described in Chapter 8, participants who consulted the deliberately faulty AI in Study 1 adopted its answer on 79.8% of those trials. They did not follow it because they thought it was wrong. They followed it because it sounded usable and they did not adequately interrupt the handover of judgment.

---

## 11.3 A Practical Evaluation Framework

Not every piece of AI output needs the same level of scrutiny. A brainstorm list needs less checking than a report you're sending to your board. Match your evaluation effort to the stakes.

### For routine, low-stakes output (daily emails, meeting notes, reformatting):

Quick check:
- Does it sound like me? (Voice)
- Is the length right? (Format)
- Would I be embarrassed if someone saw this? (Appropriateness)

If yes to the first two and no to the third: use it. Move on.

### For medium-stakes output (client-facing content, analysis, recommendations):

Substantive check:
- **Accuracy:** Are the specific facts correct? (Spot-check 2-3 claims)
- **Completeness:** Did it cover what matters? Did it miss anything important?
- **Relevance:** Is everything in here actually relevant to the task? Or is there filler?
- **Appropriateness:** Right tone for the audience? Nothing that could land badly?
- **Logic:** Does the reasoning follow? Or does it just sound like it follows?

### For high-stakes output (legal, financial, medical, published, sent to senior leadership):

Full verification:
- Everything in the medium-stakes list, PLUS:
- **Source check:** Where did each factual claim come from? Can you verify independently?
- **Assumptions:** What is the AI assuming that it didn't state? Are those assumptions valid?
- **Omissions:** What did it NOT say that someone with real expertise would have included?
- **Alternative framing:** Would a different expert frame this differently? Is the AI's framing the only valid one, or just the most probable one?

The higher the stakes, the more you're treating AI output as a FIRST DRAFT to be verified, not a FINISHED product to be shipped.

---

## 11.4 Common Failure Modes (What Wrong Looks Like)

AI doesn't fail randomly. It fails in patterns. Like learning what a phishing email looks like: once you've seen the pattern three times, you catch it on instinct.

**Plausible fabrication.** The AI generates a statistic, a citation, a quote, or a historical fact that sounds completely believable but doesn't exist. It's not guessing randomly. It's producing what a real fact in that position would LOOK like. The format is perfect. The content is invented.

How to catch: Look up any specific citation. Check any quoted statistic. If it can't tell you where it got a number, it probably generated it.

**Confident extrapolation.** The AI knows something about the general category and extrapolates to your specific case as if it has direct knowledge. "Companies in your sector typically..." when it has no information about your specific company or situation.

How to catch: Notice when general statements are applied to your specific case. Ask: "Are you inferring this from general patterns, or do you have specific information about my situation?"

**False balance.** The AI presents multiple viewpoints as equally valid when one is clearly stronger. This can happen when a model avoids committing despite unequal evidence. Sometimes there IS a better answer and the AI hedges rather than committing.

How to catch: If you have domain expertise, notice when the AI is sitting on the fence about something that has a clear answer. Push it: "Which of these is actually more likely?" (Chapter 5's anti-hedging techniques apply here.)

**Stale information.** The AI states something as current fact that was true at training time but is no longer accurate. Policies change, prices change, people change roles.

How to catch: For anything time-sensitive, ask when the information is from. "Is this current? When was this accurate?" Or just verify independently for anything where recency matters.

**Structural mimicry.** The output has the STRUCTURE of a good analysis (introduction, evidence, conclusion) but the evidence doesn't actually support the conclusion. It mimics the form of rigorous thinking without the substance.

How to catch: Read the logic, not just the conclusion. Does each claim actually follow from the evidence presented? Or does it just FEEL like it follows because the structure is professional?

---

## 11.5 Building the Habit (Without Slowing Down)

Full verification of everything would defeat the purpose of using AI. The goal is calibrated trust: more scrutiny for higher stakes, lighter review for routine work.

**Daily habits that don't slow you down:**
- Before sending anything AI-drafted: read it once as if a colleague wrote it. Would you hit send?
- For factual claims: spot-check ONE specific detail per output. If that's right, move on.
- Before important decisions based on AI analysis: ask "what would I need to see to believe this?"
- When something "feels right but you're not sure": that feeling IS your sniff check working. Pause and verify rather than suppressing the doubt.

**The sniff check in practice:** You don't need a rubric for everything. What you need is the habit of NOT automatically accepting. The pause between "the AI said X" and "I'm going to act on X" is where your judgment lives. Make that pause conscious.

---

## Try This: The Verification Spot-Check 🧪

Take the last piece of AI output you used for something that mattered (sent to someone, included in a document, based a decision on).

Go back and check three specific factual claims from it:
1. Is each one actually true?
2. Where would you go to verify it?
3. Would you have caught it if one were wrong?

If all three check out: your evaluation instincts are working. If any were wrong: you just identified a gap in your review process. That's valuable information.

### Add to Your Working With AI Kit

Save the three checks and the result. Correct samples are encouraging evidence, not proof; increase the sample when the output contains more claims or the cost of error rises.

---

## What's Next →

Evaluation tells you whether output is good AFTER you receive it. But what if you could write the brief in a way that makes good output more likely in the first place? Chapter 12 teaches the delegation skill: writing briefs for autonomous work, defining "done" before the work begins, and treating AI management as the same discipline as people management.



================================================================================

# Chapter 12: The Delegation Skill

*Writing a brief the AI can execute without asking you questions is the same skill as managing a smart but new employee. Here's how.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Write a delegation brief that an AI agent can execute without mid-task clarification
- Define "done" before the work begins (not after you see the output)
- Specify failure modes in advance (what would make you reject the result)
- Apply the management-as-superpower principle: intent, constraints, evaluation criteria
- Recognise the mirror between evaluation (Ch 11) and delegation (this chapter)

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **Delegation brief** | A self-contained description of a task that gives the executor (AI or human) everything needed to produce the right output without asking questions. Not a prompt — a specification. |
| **Definition of done** | What the finished output looks like, stated BEFORE work begins. Not "I'll know it when I see it" but specific, checkable criteria. |
| **Failure mode** | A specific way the output could be wrong that you'd reject. Stating these upfront prevents the AI from going in a direction you'll discard. |

---

## 12.1 Why Delegation Is Different from Chatting

You've managed someone new before. (Or been the new person.) Think about the difference between sitting next to them explaining what to do step by step, versus handing them a brief and saying "get this done by Friday, I'll review what you produce." The first is collaboration. The second is delegation. Same person, same capability, wildly different requirements for how clearly you need to specify what you want.

When you're sitting next to them, they can ask "did you mean X or Y?" and you answer instantly. When they're working independently, every ambiguity in your brief becomes a decision THEY make without you. Some of those decisions will be right. Some won't. You find out when you see the finished thing.

The difference: in conversation, clarification is usually immediate. In delegation, an agent may ask, pause or request approval, but you cannot depend on real-time clarification. An unresolved ambiguity can become a choice it makes while you are away. If that choice is wrong, you may not discover it until review.

This means delegation briefs need to be MORE complete than conversational asks. Every ambiguity you leave in the brief becomes a decision the AI makes without you.

An agent may ask or pause, but do not rely on real-time clarification. If an important ambiguity remains, it can become a plausible autonomous choice.

---

## 12.2 The Delegation Brief (Complete Version)

Chapter 4's brief had six parts. For autonomous delegation, add three more:

**1. Outcome.** What you want to end up with.
> "A one-page weekly update for my team lead covering what I completed, what's in progress, and any blockers."

**2. Audience.** Who will see this.
> "My direct manager. She's technical, prefers concise updates, cares most about blockers."

**3. Constraints.** What it must NOT do.
> "Under 300 words. No filler. Don't include anything I didn't specifically accomplish this week."

**4. Format.** What the deliverable looks like.
> "Three sections: Done, In Progress, Blockers. Bullets under each. No prose introduction."

**5. What good looks like.** An example or quality bar.
> "Here's last week's update that my manager said was good: [paste example]"

**6. Sources.** What the AI should work from.
> "Use my project notes from this week [attached]. Don't add anything that's not in the notes."

**7. Success criteria.** How YOU will judge whether it's done well. (NEW for delegation)
> "I'd accept this if: every bullet is factually accurate based on my notes, the word count is under 300, and my manager wouldn't need to ask a follow-up question to understand the status."

**8. Failure modes.** What would make you reject it. (NEW for delegation)
> "Reject if: it includes tasks I didn't actually do, it's vague ('made progress on the project'), or it buries a blocker in the middle instead of flagging it clearly."

**9. Scope boundaries.** What it should NOT do. (NEW for delegation)
> "Don't summarise anything from last week. Don't add recommendations. Don't draft responses to the blockers. Just report status."

The last three are what make delegation different from a conversation. In a conversation, you'd catch these problems in real time. In delegation, you need to prevent them upfront.

---

## 12.3 Defining "Done" Before You Start

Most people evaluate AI output by feel: "does this seem right?" That works for low-stakes work. For delegation — especially recurring delegation — you need something more specific.

**Write your evaluation criteria BEFORE you see the output.** Not after. This prevents a common trap: the AI produces something that's different from what you imagined, and you can't tell if it's "wrong" or just "different." If you defined done upfront, you have something concrete to check against.

Good definitions of done:
- "Done = I could forward this to [person] without editing."
- "Done = all three questions from the original brief are answered with specific evidence."
- "Done = under 200 words, no jargon, one clear recommendation at the top."
- "Done = matches the structure and detail level of [this example]."

Bad definitions of done:
- "Done = it's good." (What does good mean?)
- "Done = I'm happy with it." (Too subjective to guide the AI)
- "Done = it's ready." (Ready for what? By what standard?)

If you can't define done before you start, you're not ready to delegate the task. You're still in the collaboration phase (Chapter 8) where your judgment is needed throughout.

---

## 12.4 The Mirror (Evaluation and Delegation Are the Same Skill)

Chapter 11 taught evaluation: given an output, judge whether it's good.
This chapter teaches delegation: given quality requirements, write the brief that produces good output.

They're the same skill in two directions:
- Evaluation: "Here's what I got. Is it right?" (Judging after the fact)
- Delegation: "Here's what I need. Make it right." (Specifying beforehand)

If you're good at evaluating but bad at delegating: you keep doing rework.
If you're good at delegating but bad at evaluating: you ship bad work without knowing.
Both skills together: you write clear briefs AND catch problems in what comes back.

The practical loop:
1. Write a delegation brief
2. AI produces output
3. Evaluate against your criteria
4. What fell short? Fix the BRIEF (not just the output)
5. Next time, the brief prevents that failure mode
6. Over time, the brief improves and your rework decreases

This is similar to training a new employee: each useful correction should improve the next attempt. The difference is that you cannot assume a one-off correction will persist. If the lesson matters next time, save it in the brief, project instructions, memory or workflow configuration that the product actually retains—and test it in a new session. The durable brief is the learning record.

---

## 12.5 Management as AI Superpower

Many agent-management skills resemble ordinary management skills: explain what you need, give effective feedback and design ways to evaluate the work. If you've ever trained a new hire, onboarded a contractor, or even delegated to a babysitter ("bedtime is 7:30, no screens after 7, the medicine is in the top drawer, call me if she spikes a fever"), you already have a starting point. You still need to adapt it to a system that lacks a colleague's shared context and judgment.

The parallel:

| Managing a person | Managing an AI agent |
|---|---|
| Set clear expectations | Write a clear brief |
| Define what "done" looks like | Specify success criteria |
| Give context for WHY the work matters | Provide the audience and purpose |
| Trust but verify | Review output, spot-check facts |
| Give feedback that improves future work | Update the brief based on what failed |
| Know when to delegate and when to do yourself | Task fit audit (Chapter 8) |

If you've ever managed someone well — given a clear assignment, set expectations, reviewed their work, and gave feedback that made the next piece better — you already have the AI delegation skill. You're just applying it to a different executor.

If you've never managed anyone, AI can be a low-social-risk place to practise making a brief clearer and evaluating against a definition of done. It will not take feedback personally, although it can still fail, hit limits or repeat the same mistake. Some briefing and evaluation skills transfer to managing people; empathy, motivation, accountability and human judgment do not reduce to prompt technique.

---

## Try This: The Brief Upgrade 🧪

Find a task you've been doing in Chat mode (back-and-forth conversation) that you could potentially delegate to Work/Cowork mode.

Write the full 9-part delegation brief from Section 12.2. Include success criteria and failure modes.

Run it in agent mode. Compare:
- How does the output compare to what you usually get from Chat mode with back-and-forth?
- Did the success criteria help you evaluate faster?
- Did the failure modes prevent problems you usually have to fix?

If the output is better with less effort: you've found a task to delegate permanently.

### Add to Your Working With AI Kit

Save the upgraded brief as **Brief 2 of 3** and highlight its definition of done, authority boundary and pause trigger. Those are the parts interactive chat often lets you improvise and autonomous work does not.

---

## What's Next →

You now have the full toolkit: how to give tasks (Ch 4), how to control output (Ch 5), how to iterate (Ch 6), how to choose tools (Ch 7-8), how to use agents (Ch 10), how to evaluate (Ch 11), and how to delegate (this chapter). The final chapter brings it all together into a system that sticks — repeatable workflows, habits that last, and staying current without making AI a second job.



================================================================================

# Part VIII: Make It Repeatable

## Turn isolated wins into a small system you can maintain

---

# Chapter 13: Building Your System

*The difference between "I sometimes get lucky with AI" and "AI genuinely makes me better at my job" is whether you've built a system or you're winging it every time.*

---

## Learning Objectives

By the end of this chapter, you will be able to:

- Turn one-off AI wins into repeatable workflows
- Build a minimal but effective AI system (persistent setup + recurring tasks + review habit)
- Stay current as tools evolve without making AI a second job
- Use AI responsibly in professional contexts
- Know what to do next after finishing this book

---

## Key Terms

| Term | Plain-English Definition |
| --- | --- |
| **System** | A repeatable way of working that produces consistent results without you reinventing the process each time. Not complicated automation — just a stable setup plus a few habits. |
| **Template** | A reusable brief you've refined over multiple uses. The first time you write a brief, it's a guess. After you've used it five times and fixed what didn't work, it's a template. |
| **Maintenance** | The occasional work of keeping your system current: updating instructions that have gone stale, testing new tools on your actual tasks, and adjusting what you delegate as the frontier moves. |

---

## 13.1 From One-Off to Repeatable

Six months ago, someone in our community told us she uses AI "every day" but still feels like she's starting from scratch each time. New chat. Re-explain the context. Re-state her preferences. Get a mediocre first attempt. Fix it. Paste it somewhere. Tomorrow: same thing, from zero.

She's not doing it wrong. She just doesn't have a system yet. The difference between "I use AI every day" and "AI reliably saves me time" often depends substantially on the system, not only the tool, model or a secret prompt. She needs to extract what works, save it somewhere stable and stop reinventing the setup every time she opens a new chat.

The pattern:

1. **Do it.** Use AI for a task. Apply what you've learned in Chapters 4-6 (brief, control, iterate).
2. **Notice.** What worked? What did you have to fix? What did you wish you'd specified upfront?
3. **Extract.** Pull out the reusable parts: the brief structure, the constraints that mattered, the format that worked, the examples you showed it.
4. **Save.** Put those reusable parts somewhere stable: a document, a note, a template, a project in your AI tool.
5. **Reuse and refine.** Next time you do the same type of task, start from the template. Fix what's still off. The template gets better each time.

This is how "I sometimes get good results" becomes "I reliably get good results." Not through a magic prompt. Through iteration on the SYSTEM, not just the output.

The reusable move is to stop treating every useful result as a one-off prompt. Save the context, instructions and acceptance criteria that actually helped, then test whether they improve the next run.

---

## 13.2 The Minimum Viable System

You don't need a complex setup. A working AI system has three components:

### 1. Your persistent setup (Chapter 3)

- Persistent instructions that capture your voice and preferences (Cher's closet computer, but for your AI)
- A project or workspace for each recurring area of work
- Memory that accumulates over time (check it periodically)

This is the foundation. Without it, every conversation starts from zero.

### 2. A few recurring workflows (Chapters 10, 12)

Start with one. When that works reliably, add another. Three to five recurring workflows may be a useful ceiling for a first system, but the right number is whatever remains reliable and worth reviewing:

- A weekly planning/prioritisation routine
- A meeting prep routine
- A drafting routine for a type of content you produce regularly
- A research/synthesis routine for staying current in your field
- An inbox or communications triage routine

Each is just: a stable brief + a schedule (or trigger) + a review step.

### 3. A review habit

- Weekly: did my AI workflows produce good output this week? Any drift?
- Monthly: are my persistent instructions still accurate? Has anything changed in my work?
- Quarterly: are there tasks I'm still doing manually that could now be delegated? Has the frontier moved?

Reserve a short weekly review. Ten minutes is a suggested starting block, not a guarantee; the job is to notice drift before an unreliable workflow becomes routine.

---

## 13.3 Staying Current (Without Making It a Second Job)

AI tools change every few months. New models, new features, new modes, new names for old things. It's like trying to follow every cast change on a soap opera. You'll exhaust yourself and miss the plot anyway. Don't try to keep up with everything.

**What actually works:**

**Pick ONE primary tool and learn it deeply.** You'll get more from mastering one platform than superficially knowing five. Depth beats breadth for daily productivity.

**Follow ONE trusted source.** Not ten newsletters and five YouTube channels and a Discord. One source that curates what matters. This book's publisher, a researcher you trust, a newsletter that filters signal from noise. The right one source saves you from reading everything.

**Test new things on YOUR actual tasks.** When something new launches, don't ask "is it better?" Ask "is it better FOR THE THINGS I DO?" Try it on a real task you already know the answer to. If it's clearly better: switch. If it's marginally different: stay with what you know.

**Keep a tiny personal test set.** Choose three representative tasks you genuinely repeat. For each one, save the source material, the brief and one sentence defining what you would accept as "done." When a tool, mode or model changes, run those same tasks before moving your real workflow. Compare the result against your own acceptance criteria; a launch being impressive online is not evidence that it is better for your work.

**Revisit your persistent instructions quarterly.** Your setup is not a set-and-forget. Your work changes. Your preferences refine. Every few months, ask the AI to review its own instructions and flag what seems outdated. Ten minutes. Done for another quarter.

**The frameworks in this book are structural.** Models will change. Mode names will change. The three layers (Ch 7), the jagged frontier (Ch 8), the brief structure (Ch 4/12), the evaluation framework (Ch 11) — these are thinking tools that survive any specific product update.

---

## 13.4 When Things Go Wrong (The Diagnostic)

You've finished this book. You have all the tools. But AI will still produce bad output sometimes. When it does, the value of everything you've learned is that you can diagnose WHY and fix the right thing — instead of just rephrasing and hoping.

**Bad output? Run through this:**

**Is it a context problem? (Chapter 2)**
The conversation has gone on too long. Earlier messages are polluting the stack. Old contradictions are creating mush. The AI "forgot" something you told it.
→ Fix: Start fresh. Handover. Restate constraints.

**Is it a briefing problem? (Chapter 4)**
You didn't give it enough information to work with. The brief was vague. It had to guess your audience, your format, or your constraints.
→ Fix: Apply the 60-second prep. Describe the outcome. Show an example.

**Is it an output control problem? (Chapter 5)**
The content is right but it sounds generic, too long, too hedged, or too agreeable. It validated when it should have pushed back.
→ Fix: Add voice constraints. Specify length with a number. Use anti-sycophancy techniques.

**Is it an iteration problem? (Chapter 6)**
You've been going back and forth and it's getting worse, not better. You're in a correction spiral.
→ Fix: Three-attempt rule. Start over with a better brief rather than another round of corrections.

**Is it a tool selection problem? (Chapter 7)**
You're using Chat mode for something that needs Work mode. Or you're using a fast model for something that needs deep reasoning.
→ Fix: Switch mode. Increase effort. Try a different tool.

**Is it a task fit problem? (Chapter 8)**
You're asking AI to do something it's fundamentally bad at: precise facts without sources, counting, nuanced judgment that requires YOUR specific context, or tasks outside the jagged frontier.
→ Fix: Either fly manual, or restructure: ask AI to help you THINK about the problem rather than produce the final answer.

**Is it an evaluation problem? (Chapter 11)**
The output might actually be fine and you're rejecting it because it doesn't match what you imagined. Or it might be wrong and you can't tell because it sounds fluent.
→ Fix: Check against your defined criteria (not your feelings). Spot-check specific facts.

Most bad output falls into one of these seven buckets. Once you can name what's wrong, the fix is usually one chapter away.

---

## 13.5 Using AI Responsibly

A few things this book hasn't explicitly covered that matter for professional use:

**Know your organisation's policy.** Many workplaces have AI use policies: what's allowed, what requires disclosure, what's prohibited. Find out before you paste proprietary information into a tool.

**Understand your data terms.** Never infer privacy from price. On OpenAI personal Free, Plus and Pro workspaces, model-improvement sharing may be enabled by default unless you switch it off; Business, Enterprise, Edu and API products have different defaults. Other providers make their own distinctions. If the material is sensitive, check the exact account type, current data controls, retention, connector permissions and employer policy before you upload it.

**You are accountable for AI output you use in your name.** If you send an email the AI drafted, those are your words now. If you submit a report the AI wrote, that's your report. If it contains errors, those are your errors. AI is a tool you used. The professional responsibility is yours.

**Disclose when appropriate.** Different contexts have different norms. Some organisations require disclosure of AI use. Some clients would want to know. Some contexts (academic, legal, medical) have specific rules. Know what applies to your situation.

**The cognitive surrender risk is highest when stakes are highest.** When the output matters most (financial decisions, legal positions, published content, personnel decisions) is exactly when you should be most vigilant about verifying, not least. The temptation is to trust more on important things (because you want them to be right). The discipline is to verify more on important things (because being wrong is expensive).

---

## 13.6 What to Do Next

You've finished this book. You understand:
- How the system works (context, rot, compaction)
- How to configure it for yourself (instructions, memory)
- How to give it tasks (briefs, files, examples)
- How to control what comes back (voice, format, pushback)
- How to iterate without degrading (feedback, stopping)
- How to choose the right tool and mode
- What AI is good and bad at
- How agents work and when to use them
- How to evaluate and delegate
- How to build a system that sticks

**Your immediate next steps:**

1. **If you haven't set up persistent instructions yet (Chapter 3):** Do that first. Everything else works better when the AI starts from your baseline instead of generic.

2. **If you have instructions but no recurring workflows:** Pick one low-risk task from your week and build a delegation brief for it (Chapter 12). Run it manually in an eligible agent mode. Refine it. Schedule only after the result, permissions and review burden have passed your test.

3. **If you're already using AI regularly but inconsistently:** Do the tool audit (Chapter 7) and task-fit audit (Chapter 8). You may find you are using the wrong mode—or that the task should remain collaborative rather than agentic.

4. **If you want to go deeper on any topic:** The companion books in the LIBRAiRY ecosystem cover specific areas in depth: Writing with AI 101, Data & Numbers with AI 101, Agents 101, and tool-specific practical guides.

The most important thing this book teaches is not any single technique. It's the shift from "AI is a slot machine that sometimes works" to "AI is a system I understand and can control." You now have the variables. You know the levers. The results stop being random the moment you start pulling them deliberately.

---

## Try This: Your System Blueprint 🧪

Sketch your minimum viable AI system right now:

**My persistent setup:**
- Tool(s) I use: ___
- Instructions done? Y/N
- Projects set up for my main work areas? Y/N

**My first recurring workflow:**
- Task: ___
- Frequency: ___
- Brief (in 3 sentences): ___
- How I'll know it worked: ___

**My review schedule:**
- Weekly check (2 min): Is my recurring workflow still producing good output?
- Monthly check (10 min): Are my instructions still accurate?
- Quarterly check (30 min): What's changed in my work or tools?

Fill this in. Implement the first workflow. Review in a week. That's your system.

### Complete Your Working With AI Kit

Your blueprint is **Brief 3 of 3**. Put it beside your baseline, diagnostic test, tool card, **Allowed-Information Check**, claim-and-source card, restart rule and authority line. If one piece is missing, that is your next action—not a reason to redesign the entire system.
