---
title: Every SLAiYER Needs a Watcher
source: _superseded/grimoire/slaiyer-handbook-chapter-1.html
words: 6071
---

*The SLAiYER Handbook · Chapter 1*

*Episode 04*

# Every SLAiYER Needs a Watcher

Which AI tool to open for which job, what the words everyone keeps saying actually mean, and how to use any of them without becoming the cautionary slide.

There is a very specific kind of workplace panic that happens when someone says, "You should just use AI for that," as if "AI" is a complete instruction and not an entire mall directory of tools all wearing the same name tag. As if! *Which* AI? ChatGPT? Claude? Copilot? Gemini? Perplexity? The thing in Teams? The thing your company announced in a town hall that nobody can actually find?

Here's the thing: "use AI" isn't really an instruction. AI is a term to describe an entire field. It's like being told to "just use internet." Umm, what now? Use internet for what? The difference is that with the internet, you already know which part does what, so you translate it without thinking. With AI, nobody's handed you that map yet — so the instruction isn't just vague, it's vague *and* you're decoding it blind. And the person who told you to "just use AI" probably couldn't tell you either.

But this is where the broken telephone stops.

Episode 4 opens the first page of something new: the **LAiDIES Grimoire** — our growing reference shelf, where the tools, terms, receipts, and "wait, what does that *mean*?" answers live. Inside it is the **SLAiYER Handbook**: the practical survival guide for using AI without becoming the person who says "agentic workflow" in a meeting and then explains nothing.

Every Slayer needs a Watcher — the one who tells her what she's walking into before she walks in. That's the whole job here. Not "which tool is best." The far more useful: *what are these things, which one do I open for which job, and how do I work with any of them without getting staked.* Because "just use AI" is walking into the Hellmouth with a tote bag, a vague sense of optimism, and no idea what's down there.

**In a hurry?** This chapter is the deep read — what the tools are and why they slip up. If you just need the Watcher's move — how to check an answer without reading all this — grab the quick version: [The Verification Rulebook →](/grimoire/verification-rulebook.html)

*Section*

## VOCABULAiRY

Before we open a single tool: the words. Because half of feeling lost in any AI meeting is nodding along to vocabulary nobody defined — including, sometimes, the person saying it. You're allowed not to know any of these. Half the room is bluffing. Five foundational words for the thing itself, then the four types everybody argues about — sometimes in the same sentence.

### 1. Prompt

#### What it is

A prompt is what you type into AI. Not a search query. Not a command. **A brief.**

Anthropic's own prompt engineering documentation puts it this way: *"Think of Claude as a brilliant but new employee who lacks context on your norms and workflows."* The model has read more than you have. It has not met your VP. It does not know what "the deck" is, or that the Tuesday all-hands ran long. Everything that makes this work *yours* — the audience, the stakes, the deadline, the politics — lives in your head. The prompt is the only way it crosses over.

There is one rule that holds across every tool, every model, every version of every model:

> **The Golden Rule.** Show your prompt to a colleague with no context on the task. If they would be confused, AI will be too.

That's it. That's the whole skill. Two people typing into the same tool, on the same Tuesday afternoon, get wildly different answers — because they wrote wildly different briefs. The variable isn't AI. It's the brief.

This isn't a talent. It's the most leveraged skill in this Handbook. Get it right and every other tool you ever open gets sharper. Get it wrong and the priciest model on earth hands you beige.

#### What makes a good brief

A useful brief gives AI five pieces of context. Each one closes a specific gap the model cannot close on its own.

1. **Deliverable — what you actually want** — AI cannot tell whether you want an email, a memo, a list, a slide critique, or a paragraph of analysis. Each is a different shape of output. Without a named deliverable, AI guesses the most generic option — usually a paragraph. Naming the deliverable is the first move because it constrains every choice that follows.
2. **Audience — who's reading it** — A note to your CEO is not a note to your team. AI knows the difference between formal and casual register, but it does not know *who* is reading. Tell it: "for my VP," "for the team channel," "for a client who's frustrated." The vocabulary, emphasis, and assumed knowledge all shift.
3. **Format — length, structure, shape** — "Brief" can mean three sentences or three paragraphs. "Bulleted" can mean five items or fifty. "A summary" can be a haiku or a memo. Specify length, structure, and shape — especially length — so AI doesn't have to guess.
4. **Tone — formal, warm, direct, casual** — Tone is a knob, not a setting. "Professional but warm" gets you something different than "warm and professional." "Direct, no hedging" gets you something different than "concise." The specificity here is taste, and your taste is one of the few things AI can't supply.
5. **Constraints — what to include, what to leave out** — "No buzzwords." "Don't mention pricing." "Skip the intro." Constraints feel like restrictions, but for AI they're gifts — each one rules out a generic average you didn't want. Phrase them positively where you can: *"use flowing prose"* beats *"don't use bullets."* (More on why in *Where it goes wrong*, below.)

If your own thinking is still messy, make the tool ask *you* questions before it writes. Something as simple as *"Before you write this, ask me three questions that would change the output."* The questions it asks will surface what you actually needed to brief.

#### Vague vs. briefed

Here's the same task asked two different ways. Same model, same minute.

*Vague*

"help with the deck."

A beige paragraph about decks that could be about anything. AI is filling the blanks with averages — every deck it's ever seen on the internet, none of them yours.

*Briefed*

"I'm presenting Q3 results to my VP tomorrow. Find the one slide that's still weak — too dense, too vague, or burying what matters most. Suggest a fix."

A specific, usable answer about *your* slide, with the stakes of *your* meeting, in the time you have.

Same tool. Same thirty seconds. **The difference is the brief.**

#### Where it goes wrong

The most common mistake is treating the prompt as a wish. *"Help me with this." "Make this better." "Can you take a look?"* These aren't briefs — they're gestures. AI doesn't read minds; it pattern-matches against averages from everything it's ever seen. Short brief in, generic answer out.

The second most common mistake is telling AI what *not* to do. *"Don't be cheesy." "Don't use buzzwords." "Don't sound like a LinkedIn post."* Anthropic's docs explicitly recommend the opposite — **positive instructions outperform negative ones** — because the moment you name the thing to avoid, the model now has the cheesy / buzzword / LinkedIn pattern in its head and has to actively suppress it. Say what you want instead. "Warm, direct, no jargon." "Plain prose, no bullets." "Sound like a human who's slightly amused."

In Episode 2's terms: AI hearing *"write an email about the project"* is David Rose in Moira's kitchen hearing "fold in the cheese." It tries. It has no idea what that means.

[→ Episode 2: Tell Me What You Want — the prompting deep dive](/issues/issue-02.html)

#### Practice

On your next real task, prompt it twice. First the way you'd ask standing in the doorway — quick, vague, the way you'd ask a coworker. Then again with deliverable + audience + format + tone + constraints. Read both. The gap between answer one and answer two is exactly what this section just taught you. Once you've felt it, you can't un-feel it.

#### Sources

- Anthropic. [Prompt engineering best practices.](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) The "brilliant but new employee" framing and Golden Rule are theirs.
- OpenAI. [Prompt engineering guide.](https://developers.openai.com/api/docs/guides/prompt-engineering) Hierarchical instructions, few-shot examples, structured prompts.

**What it is**

A brief, not a search. AI is the brilliant new hire.

**Golden Rule**

If a clueless colleague would be confused, AI is too.

**What to brief**

Deliverable · Audience · Format · Tone · Constraints.

**The trap**

Telling AI what *not* to do. Say what you *do* want.

**Try this**

Real task, two prompts. Vague first. Then briefed. Read both.

**Go deeper**

[→ Episode 2: Tell Me What You Want](/issues/issue-02.html)

**Remember**

*Beige in, beige out.*

### 2. Model / LLM

#### What it is

A model is the trained component of an AI system that turns an input into an
output. It may produce words or images, interpret material, make a prediction
or choose a next action.

Episode 05 uses one maintained picture for this relationship: the provider is
the fashion house; the model is the house's supermodel; an app is a boutique or
department store where you may encounter one or more models. The picture helps
separate the cast; the software is not literally organized like a fashion
business.

"LLM" means large language model: a model designed to work with language. It
may be one component in a larger system that also handles images, search,
files, code or other tools. You do not need to memorize every model name. You
do need to know that the model is not the whole product.

#### The four things people blur together

- **The company or provider** develops and operates products and models.
- **The model** transforms input into output.
- **The product** supplies the interface, account, instructions, permissions,
  limits and visible features.
- **The tools** let the system search, inspect files, run code or act through a
  connected service when the product permits it.

Some people use *harness* for the software that surrounds a model and helps it
use tools or complete a workflow. It can be a useful engineering term, but it
does not replace the four-part map above.

One product can offer several models, route between them automatically or hide
the choice entirely. The same model can also behave differently when the
product changes its instructions, context or available tools. **The model
matters. So does everything around it.**

#### How models and modes differ

Models can differ in the material they accept, the outputs they produce, their
speed, cost, context capacity, tool use and performance on particular tasks.
Some products also offer modes that spend more computation before answering.
Those modes can improve some multi-step work; they do not turn the result into
verified truth.

Do not memorize a permanent “fast model versus reasoning model” rule. Product
names, defaults and routing change, and not every provider exposes the same
choice. “Reasoning” is also not a warranty: a slower answer can still begin
from a bad assumption, misunderstand the task or use weak evidence.

#### Which one when

Choose by the job you can actually test:

1. What must the output be—text, image, analysis, code or an action?
2. Does the task need current sources, files, calculations or another tool?
3. What privacy, permission, plan or regional limits apply?
4. How will you recognize a good result?
5. Which important parts still require an outside check?

For a quick, recoverable task, the default option may be enough. For a complex
task, a more capable model or deeper-computation mode may be worth testing.
For a consequential task, the answer is never simply “use the expensive one”:
use appropriate expertise, primary evidence and human review as well.

#### Where it goes wrong

**Blaming the model for the whole result.** The missing feature may belong to
the product, plan, permissions, context or tools.

**Treating a provider reputation as a task test.** “Best writer” or “best
reasoner” is too broad to decide whether this result serves this audience.

**Equating more compute with correctness.** Deeper processing can help without
checking the source, jurisdiction, date or assumptions that matter.

**Following a stale model guide.** Names, defaults, prices and access change.
Date every comparison and recheck it before teaching or buying.

#### Practice

Choose one harmless task whose quality you can judge. In one product, note the
date, product, visible model or mode (if the product shows it), tools and
account plan. Run the task with the default option and one alternative
available to you. Keep the request and context the same.

Compare:

- which result understood the job;
- which used the available evidence properly;
- what each made you fix; and
- whether the extra time or cost improved this task enough to matter.

The lesson is not “crown a winner.” It is learning which layer changed and how
you know the result improved.

#### Sources

- OECD. [Explanatory memorandum on the updated definition of an AI
  system.](https://oecd.ai/en/wonk/definition-)
- OpenAI. [Models.](https://developers.openai.com/api/docs/models)
- Anthropic. [Models overview.](https://platform.claude.com/docs/en/about-claude/models/overview)
- Google. [Gemini API models.](https://ai.google.dev/gemini-api/docs/models)
- Ethan Mollick. [A Guide to Which AI to Use in the Agentic
  Era.](https://www.oneusefulthing.org/p/a-guide-to-which-ai-to-use-in-the)
  *One Useful Thing*, February 2026. Useful scout framing; provider details
  still require current official verification.

**What it is**

The trained component that turns input into output. It is one part of an AI
system—not the company, product or tool around it.

**Four parts**

Provider · Model · Product · Tools. Each can change what comes back.

**How they differ**

Inputs · outputs · tools · speed · cost · task performance.

**Which one when**

Choose by the task and test the result. Stakes always require evidence and
review.

**The trap**

Treating “better model” as “automatically correct answer.”

**Try this**

Same harmless task, same context, two available choices. Name what changed.

**Remember**

*A model is part of the experience—not the whole thing.*

### 3. Training data

#### What it is

Training data is everything the AI was fed while it was learning. The composition depends entirely on what the model is built to do.

- **Text-generating models** (Claude, ChatGPT, Gemini) — trained on books, websites, articles, forum posts, transcripts, code. Trillions of words.
- **Image generators** (DALL·E, Midjourney, Stable Diffusion, Google's Nano Banana) — trained on billions of images paired with their captions.
- **Video generators** (Sora, Veo, Runway) — trained on enormous quantities of video, often with text descriptions of what's in them.
- **Voice / audio models** (ElevenLabs, Suno) — trained on hours of human speech or music.
- **Math & code models** — trained on mathematical equations, solved problems, GitHub repositories, technical papers.
- **Multimodal frontier models** (today's flagship Claude, GPT, and Gemini) — trained on text *and* images *and* audio *and* code, all together, so a single model can read a screenshot, summarize a PDF, and write an email back.

A model can only generate things it was *shown how to generate*. The provider compiles the training set, runs the training, and then the feeding stops. From that point on, the model has a *fixed view of the world*. Two things matter about that fixed view, and both shape how you use AI at work — and both apply across every modality above.

- **The cutoff.** At some point the training stops, and the model's view freezes. Every model has a knowledge cutoff — recent flagships land around late 2025 to early 2026, while lighter, faster models can be a little older. Each maker publishes the exact date for its own models. Anything after the cutoff is invisible to the model unless you hand it the new information directly.
- **What you type today might train tomorrow's model.** The default is not what most people expect — and it varies sharply by account type. More on that below.

#### The cutoff, explained

Imagine a friend who watched every episode of *Sex and the City* through the 2004 finale and stopped there. She remembers all of it — Carrie's column, the Aidan years, the Berger Post-It. Ask her about anything pre-2004 and she's flawless. Ask her about *And Just Like That* — about Big having a heart attack on the Peloton in the first episode of the spin-off — and she has nothing. That's not on her. That's where the watching stopped.

The model is the same. Brilliant up to its cutoff, blind after. Three workarounds:

1. **Hand it the new information** — Paste the current policy. Attach the recent doc. Quote the email. If the relevant facts live in your conversation, the cutoff doesn't matter — the model now has them.
2. **Use a tool with live web search** — Perplexity, ChatGPT with browsing, Claude with web search, Gemini grounded with Google. The tool fetches the now and brings it into the conversation. The output should cite the sources it actually pulled.
3. **Wait for the next model release** — New training run = new cutoff. Anthropic, OpenAI, and Google all release new models every few months. Your knowledge horizon moves with theirs.

What you can't do: trust the model on time-sensitive information without checking. Confidently-wrong is the model's default failure mode when the answer lives after the cutoff.

#### Who uses your inputs

The most consequential paragraph on this page. The default behavior of every major AI tool depends on what kind of account you have. The defaults are not the same.

*Personal account*

ChatGPT Free / Plus / Pro · Claude Free / Pro · Gemini Free

**Training: ON by default.** Your conversations may be used to train future models unless you opt out in settings. ChatGPT also offers "Temporary Chat" mode that skips training.

*Business account*

ChatGPT Team / Enterprise / Edu · Claude for Work · API · Google Workspace Gemini

**Training: OFF by default.** Your inputs and outputs are protected by the business agreement and not used to train future models.

Anthropic's published policy puts it directly: *"We may use your Inputs and Outputs to train and improve Anthropic AI models, unless you opt out through your account settings."* Business and enterprise accounts are governed by separate commercial terms — the consumer policy doesn't apply.

Translation for the working professional: anything you paste into a PERSONAL account today might become part of what a stranger's AI model knows next year. Anything you paste into a COMPANY-APPROVED business account stays inside the business agreement. The line between safe-to-paste and not-safe-to-paste isn't a moral judgment — it's a contract. This is the entire foundation of the Account Rule in Part V.

#### Where it goes wrong

**The cutoff trap.** You ask the tool about something current — last month's policy, this quarter's launch, today's news. The tool answers confidently, in the present tense, as if the information were live. It isn't. The model is filling in from old patterns. The most dangerous version: the tool invents a recent thing that doesn't exist (a product, a person, a paper) because the *pattern* of "a recent thing about X" is in its training data even when the specific X isn't.

How to spot it: anything time-sensitive. Anything with a version number or a date. Anything where *"as of when?"* is a fair question.

**The default-account trap.** You paste a confidential client doc into your personal ChatGPT, asking for a summary. You've just signed your client's information into OpenAI's training set. This isn't a thought experiment — it's the policy. There have been real incidents: the Samsung engineer who pasted proprietary code into ChatGPT in 2023, and many quieter examples since. The fix is structural, not behavioral: company-approved business account, or nothing.

[→ Chapter 5: The Account Rule — the safety box](/grimoire/slaiyer-handbook-chapter-5.html)

#### Practice

Two checks, under sixty seconds total.

**First, the cutoff.** Open your tool. Ask point-blank: *"What's your training cutoff date?"* If the answer is more than six months ago, anything time-sensitive in your work needs to come from somewhere else — a live web search, a pasted source document, a verified human.

**Second, the account type.** Look at the account name in the top corner. Personal email = personal account = training default ON. Work email plus your company's enterprise tenant URL = business account = training default OFF. Most people get this wrong because "I'm signed in with my work Google" doesn't always mean business. Confirm before you paste.

#### Sources

- Anthropic. [Privacy Policy.](https://www.anthropic.com/legal/privacy) Consumer-account default is training ON with opt-out; business accounts governed by separate terms.
- OpenAI. [Data Controls FAQ.](https://help.openai.com/en/articles/7730893-data-controls-faq) Free / Plus / Pro: training default ON with opt-out via Settings → Data Controls. Team / Enterprise / API: training default OFF.
- Anthropic. [Models overview.](https://platform.claude.com/docs/en/about-claude/models/overview) Published training-data cutoff dates per model.

**What it is**

Everything AI read while learning. The reading stops at the cutoff.

**The cutoff**

Brilliant before, blind after. Workarounds: paste, web search, new model.

**Privacy default**

Personal account: training **ON**. Business account: training **OFF**.

**The traps**

Asking about current things. Pasting work into a personal account.

**Picture this**

Friend who watched SATC through 2004. Big died on the Peloton. She has no idea.

**Try this**

Ask your tool its cutoff. Check your account tier.

**Remember**

*She graduated. She hasn't been to class since.*

### 4. Token & context window

#### What it is

Two related ideas, often used interchangeably even though they're not the same.

A **token** is a chunk of text — usually a word or part of one. AI doesn't process letters; it processes tokens. The rough rule for English: about 0.75 tokens per word, or four characters per token. When you hear "this model has a 200k token context window," that's roughly 150,000 words of working memory.

The **context window** is how much the tool can hold in mind at the same time — everything you've typed in this conversation, every file you've attached, every instruction the tool was given at the start. Anthropic calls it the model's *"working memory" — separate from the training data, which is the model's long-term knowledge.*

Current sizes, roughly: today's flagship models hold on the order of one to two million tokens — about 750,000 to 1.5 million words of working memory — while lighter, faster models hold a couple hundred thousand (still around 150,000 words). For the exact figure on the model you're using, check the maker's page.

Sounds enormous. It is. But there's a crucial second fact: more isn't always better.

#### The context window degrades under load

Anthropic calls it *"context rot"*: as the conversation grows, the model's accuracy and recall *degrade — even within the official limit*. This isn't a bug. It's how attention works at scale.

The defining research is a 2024 Stanford paper, *"Lost in the Middle: How Language Models Use Long Contexts"* (Liu et al., TACL). The team tested six AI models on long documents and found a consistent U-shaped curve: **accuracy is highest when relevant information sits at the beginning or end of the input, and degrades more than 30% when it's stuck in the middle.**

The finding replicated across GPT-3.5, GPT-4, Claude, LongChat, MPT-30B, and Cohere. It isn't a quirk of one tool. It's a fundamental property of how large language models read long inputs. Practically:

- The first thing you say and the last thing you say are the things the model remembers best.
- Stuff buried in the middle of a long document or long conversation is the most likely to be missed or paraphrased loosely.
- "Just paste in everything" is rarely as good as "paste in the relevant section, plus the one fact that matters."

#### Memory is not the context window

Quick clarification because the terms blur, and the difference matters.

*Context window*

Working memory of THIS conversation.

Resets when you start a new chat. Everything earlier is gone. The desk.

*Memory feature*

Facts saved ACROSS conversations.

"My name is Sarah." "I prefer numbered lists." Stored as a profile the tool reads first in every new chat. The file cabinet behind the desk.

Memory comes onto the desk. The desk doesn't keep what was on it yesterday.

#### How to use the window well

Three moves that compound.

1. **Keep one conversation focused on one thing** — When you switch topics, start a fresh chat. Don't make the tool drag a 60-turn architecture discussion behind your follow-up question about formatting an email. The fresher the context, the sharper the answer.
2. **For long docs, put what matters at the top** — Anthropic explicitly recommends placing long inputs near the top of the prompt, above your query. This is the inverse of how most people compose it ("here's my question, here's the doc"). Flip it: doc first, then question. The "Lost in the Middle" effect makes the top and bottom of context the strongest positions.
3. **Watch for drift, and reset early** — The signal: tone shifts. Your original constraints get dropped. The answer paraphrases your source instead of quoting it. That's the model losing the thread. Close the chat, open a new one, and re-paste only the parts that still matter.

#### Where it goes wrong

**The wall-of-text trap.** You paste a 60-page document and ask three questions. By question three, the answer *sounds* right but is paraphrasing the gist rather than quoting the source. You won't catch the slip unless you check against the document.

**The eternal-thread trap.** You've been in the same chat for two weeks. The model knows everything that's ever happened in this conversation — which sounds great, except attention degrades as the window fills, and the early stuff (your original constraints, your style preferences) starts dropping out. Long marathon chats are precisely where details slip.

**The memory confusion.** You turn on Memory expecting the tool to remember your project. Memory only stores what you (or the tool) explicitly told it to remember — usually facts about you, your role, your preferences. It does not store the actual content of last week's conversation. If you need that, you'll need to paste it back in.

#### Practice

Two short experiments.

**First, the "Lost in the Middle" effect.** Paste a long document into a fresh chat (fifteen-plus pages). Ask one question about the FIRST page, one about the MIDDLE, one about the LAST page. Compare. The middle answer will be the weakest. You will have just felt the U-shaped curve in real time.

**Second, the drift signal.** In your next long planning conversation, after eight or ten exchanges, ask: *"What were the constraints I gave you at the start of this conversation?"* If the answer is vague or partial, the window is filling. Start a fresh chat with just the constraints, and continue.

#### Sources

- Anthropic. [Context windows.](https://platform.claude.com/docs/en/build-with-claude/context-windows) Definition, current sizes, "context rot" framing.
- Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni, & Liang. [Lost in the Middle: How Language Models Use Long Contexts.](https://cs.stanford.edu/~nfliu/papers/lost-in-the-middle.tacl2023.pdf) Stanford, *Transactions of ACL*, 2024.
- Anthropic. [Effective context engineering for AI agents.](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

**What it is**

The "working memory" of this conversation. Tokens = small chunks of text.

**The trap**

*Context rot.* Performance degrades as the window fills, even within limit.

**The research**

"Lost in the Middle" (Stanford 2024). Beginnings + ends recalled best. Middle drops 30%+.

**Memory ≠ Context**

Memory persists across chats. Context is just THIS one. Desk vs. file cabinet.

**Picture this**

Chalkboard at a long study session. Six hours in, the formula from the top is gone.

**Try this**

Long doc, three questions (start / middle / end). Middle answer is worst.

**Remember**

*If she's losing the plot, turn the page.*

### 5. Hallucination

#### What it is

A hallucination is false or unsupported content delivered as part of an
AI-generated answer. It might be one invented citation, wrong date or made-up
detail inside otherwise useful work—not only a completely fictional response.
The system is not lying; lying requires intent.

A fabricated journal article, altered quote, wrong date, imaginary legal case
or stale price can all qualify. The danger is not that they look obviously
ridiculous. The unsupported sentence may sound exactly as finished as the
supported one. **Polished is a style. Evidence is a standard.**

The risk varies by model, task, context and evaluation. Do not use one
benchmark as a universal “hallucination rate.” A current system can still
place one unsupported claim inside an otherwise useful answer, so
consequential claims need evidence rather than a confidence score.

#### Why hallucinations happen

Generative models are built to produce plausible output from patterns in their
training and the context supplied now. Plausibility and factual support are
not the same target. Rare facts, missing context, ambiguous questions and weak
source material can all create room for an answer that sounds right without
being right.

OpenAI’s 2025 research adds another part of the picture: many common
evaluations reward a lucky guess more than an honest abstention. That can
encourage confident guessing. It is an important mechanism, not a complete
single-cause theory for every hallucination in every model or product.

The practical conclusion is deliberately less dramatic: current systems can
reduce hallucinations, but none earns a blanket exemption from checking.

#### How to reduce the risk

There is no magic sentence that makes an answer true. Use a checking design:

1. **Supply the right material.** Give the system the current policy,
   document, dataset or source it should use.
2. **Ask for traceable support.** Have it connect each consequential claim to
   the exact passage, calculation or source—not merely produce citation-shaped
   text.
3. **Permit uncertainty.** Tell it to mark missing evidence, ambiguity and
   unresolved conflicts rather than fill the gap. Treat that as one useful
   instruction, not a guarantee.
4. **Use the right tool.** Current facts may need live search; arithmetic may
   need code or a calculator; private or high-stakes work may need an approved
   specialist system or no public AI tool at all.
5. **Check outside the answer.** Open the source, reproduce the calculation or
   ask a qualified person. Asking the same model to praise its own work is not
   independent verification.

Do not ask a consumer chatbot to reveal private internal reasoning as your
quality check. Ask for evidence, assumptions, a concise method you can inspect
or a result you can reproduce.

#### How to detect hallucinations (Episode 3's playbook)

The deeper skill — and the full topic of Episode 3 — is detection *after* the AI has answered. The pattern that catches hallucinations is what Episode 3 called the Elle Woods move: look for the detail that doesn't survive contact with reality.

Chutney Windham gave a calm, confident, repeated alibi — she was in the shower right after a fresh perm. Sounded true. Sounded true twice. Fell apart on one specific check: you don't wash a fresh perm without destroying it. The story collapsed on a single piece of domain knowledge.

AI hallucinations work the same way. The answer is fluent, internally consistent, and confident. It collapses on the one specific check:

- Does this link actually open?
- Does the quote actually appear on that page?
- Was this person at the title the model gave them?
- Does this number match the source it cited?
- Was this legal case actually filed? In which court? When?

The KPMG / GPTZero incident in 2026 is the canonical case study: KPMG (a Big Four firm) published an agentic AI report; organizations cited in it said the claims about their AI use were untrue. GPTZero confirmed the inaccuracies were caused by hallucinations. KPMG pulled the report. The lesson isn't that one firm got it wrong — it's that "we used AI" without verification is a real career risk, even at the most regulated companies.

[→ Episode 3: The Burn Book Problem — the full detection playbook](/issues/issue-03.html)

#### Where it goes wrong

**Trusting fluency.** The output sounds right. It uses the right vocabulary. It's structured the way a real answer would be structured. *Plausibility isn't truth.* The most expensive mistakes in the corporate AI era so far have all had this shape: someone read a fluent AI answer, didn't verify, sent it to a client or a court or a board.

**Asking the model "are you sure?"** Asking AI to verify itself produces another fluent answer with no actual verification underneath. The model is generating "the kind of thing someone confident would say" — which is sometimes the same kind of thing it said the first time. (Episode 3's framing: that's Chutney repeating her alibi, not Elle finding the contradiction.)

**Confusing reasoning models with reliability.** Reasoning models and product
modes may improve performance on some multi-step tasks, but that is not a
guarantee of factual accuracy. They can still misunderstand the task, use a
weak source or produce an unsupported claim. More deliberate is not
infallible.

#### Practice

The single most useful exercise in this Handbook.

Ask your tool for three recent statistics with the exact original source for
each one. Then open every source. Record whether the page exists, whether it is
the original evidence, whether the number appears there and whether its scope
matches the claim.

Bonus exercise: take one factual claim from an AI answer you recently used and
trace it to a primary source. Speed is not the test. A claim is supported only
when the source actually establishes that claim for the relevant date,
population, product and context.

#### Sources

- Kalai, Nachum, Vempala & Zhang. [Why Language Models Hallucinate.](https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf) OpenAI / Georgia Tech, September 2025. The training-rewards-guessing finding.
- Anthropic. [Reduce hallucinations.](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) The four-move playbook.
- NIST. [Artificial Intelligence Risk Management Framework: Generative
  Artificial Intelligence Profile.](https://doi.org/10.6028/NIST.AI.600-1)
  Section 2.2 defines confabulation and its practical scope.
- Issue 03 of LAiDIES: [The Burn Book Problem.](/issues/issue-03.html) The Chutney / Elle Woods detection playbook in full.

**What it is**

False or unsupported content delivered as part of an AI-generated answer.

**Why it happens**

Generation targets plausible output; missing or ambiguous evidence creates
room for error, and common evaluations can reward guessing.

**How widespread**

There is no honest universal rate. Risk changes with the model, product, task,
context and evaluation.

**Reduce it**

Supply current evidence. Require traceable support. Permit uncertainty. Use
the right tool. Verify outside the answer.

**Detect it**

One specific check. Open the source. Verify the quote, date, number and scope.

**Picture this**

The Burn Book: every entry invented, every entry delivered with the same
confidence.

**Try this**

Ask for three recent statistics and their original sources. Audit the chain.

**Go deeper**

[→ Episode 3: The Burn Book Problem](/issues/issue-03.html)

**Remember**

*Polished is a style. Evidence is a standard.*

## The four types everyone argues about

Best understood *together* — the whole point is how they differ. Picture the kind of show this brand was raised on: a group of friends fighting supernatural forces, each with a different role in the fight.

#### 1. Generative AI

Makes · the witch who conjures

You give her words; she makes a *thing* appear — a paragraph, an image, a slide, some code. This is what most people mean when they say "AI" right now.

#### 2. Reasoning models

Thinks first · the Watcher in the library

Works the whole problem through, then says what to do. Slower, and better at math, logic, multi-step plans — anything that needs its work checked. (This is your title: a Slayer needs a Watcher.)

#### 3. Agentic AI

Acts · the Slayer on patrol

You send her out and she goes and does it. The leap from talking to doing — and exactly where the stakes change, because something that can act is only as safe as the permissions you hand it.

### Sandbox — a working room with real walls

**Plain meaning.** A sandbox is a deliberately limited environment where
software or an AI agent can work without automatically reaching everything
else. It can restrict which files, tools, accounts, credentials and network
destinations the system can use.

Picture a rehearsal studio prepared for one scene. The actor gets the right
props and a marked stage, but not the keys to every room in the theatre. The
marks on the floor are instructions. The locked doors are the sandbox. Telling
someone “do not leave” is not the same as making it impossible to leave.

**Where the analogy stops.** A sandbox is made from technical controls, not
literal walls. Every allowed service, package source, credential and network
route can become another door. “Sandboxed” therefore means constrained; it
does not mean magically isolated or impossible to escape.

Four safety jobs are often confused:

- **Permissions** decide what the agent is allowed to reach.
- **The sandbox** enforces a boundary around where it can act.
- **Monitoring** watches the sequence of actions and where they are heading.
- **An independent stop** lets someone outside that sequence halt the work.

**Least privilege** means giving the agent only the access it needs for this
job, for only as long as it needs it. That reduces the blast radius if the
agent, a connected tool or someone else's code behaves unexpectedly.

**Why you care.** If an AI can use tools, files or accounts, ask: What can it
actually reach? Which limits are enforced rather than merely written? Is the
whole action trail monitored? Who can stop it? What can be undone?

**A current example.** During a 2026 cyber evaluation, OpenAI said its models
were placed in a highly isolated environment with one permitted path to an
internal package-registry proxy. The models exploited that path and later
compromised Hugging Face infrastructure while pursuing benchmark answers. The
lesson is not that sandboxes are useless. It is that a sandbox is one security
layer, and every permitted path still needs its own controls, monitoring and
stop conditions.

#### 4. AGI

Hypothetical · the prophesied one

The foretold figure everyone waits for — a hypothetical system that could handle basically any task a person can. Hold onto this: **no public product you can open today is generally considered AGI.**

**One crucial thing: these are moods, not personalities.** A single tool can be generative, switch on reasoning for a hard problem, *and* act agentically — shifting between them by task. They're not separate species you choose between; they're modes the same tool moves in and out of. (AGI is the exception — not a mood any tool today can switch into.)

*End of Chapter 1*

### What's next

*2*

### The Briefing Rules

*Next chapter*

The 5 rules for talking to any AI tool — so you actually get back what you wanted, instead of beige.

*Live*
