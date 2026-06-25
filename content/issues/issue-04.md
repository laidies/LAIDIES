# Episode 04: The SLAiYER Handbook

Source metadata: `content/episodes/issue-04.json`
Public page: `issues/issue-04.html`
Release target: Wednesday June 24, 2026
Status: draft, pull-quotes added

There is a very specific kind of workplace panic that happens when someone says, "You should just use AI for that," as if "AI" is a complete instruction and not an entire mall directory of tools all wearing the same name tag. Whatever. As if. *Which* AI? ChatGPT? Claude? Copilot? Gemini? Perplexity? The thing in Teams? The thing your company announced in a town hall that nobody can actually find?

Here's the thing: **"use AI" is not an instruction.** It's like being told to "ask someone from the office" without being told whether you mean your boss, IT, Legal, or Deb. People don't get stuck because they're behind — they get stuck because the instruction is incomplete.

> But this is where the broken telephone stops.

So this week we're opening the first page of something new: the **LAiDIES Grimoire** — the growing reference shelf for this whole universe, where the tools, terms, receipts, and "wait, what does that *mean*?" answers live. Inside it is the **SLAiYER Handbook**: the practical survival guide for using AI at work and in life, without becoming the person who says "agentic workflow" in a meeting and then explains nothing.

This is its first chapter. Every Slayer needs a Watcher — the one who tells her what she's walking into before she walks in. That's the whole job here. Not "which tool is best." The far more useful: *what are these things, which one do I open for which job, and how do I work with any of them without getting burned.*

Because "just use AI" is walking into the Hellmouth with a tote bag, a vague sense of optimism, and no idea what's down there.

**IN A HURRY? THE WHOLE CHAPTER IN FIVE LINES.**

1. **Match the tool type to the job** — general assistant for drafts/plans, a specialist for research/docs/design/meetings, power tools carefully.
2. **Give it a real brief** — who it's for, the goal, the tone, the format. Not a fragment.
3. **Check the output** — it can be confidently wrong. A clean sentence is not a receipt.
4. **Mind your account** — confidential work data only goes in a **company-approved** tool, **within policy**.
5. **Do one real rep this week** — pick a task, brief it properly, fix what it gets wrong.

*The rest of this chapter is the why and the how behind those five.*

## Part 1: The words everyone says and nobody explains

Before we touch a single tool, the vocabulary — because half of feeling lost is just nodding along to words nobody defined. You're allowed to not know these. You're not required to nod. Here they are, plainly, so the next time someone says one in a meeting you can either hold your own or quietly clock that the person saying it can't.

We'll do this in two passes. First, the five foundational words for the thing itself. Then the four big *types* everyone argues about.

### The five words for the thing itself

**Prompt.** The thing you type (or say) to an AI tool. Your instruction, your question, your request. That's it. When someone says "it's all about the prompt," they mean: what you ask for, and how clearly you ask, mostly determines what you get back. The entire back half of this chapter is really about writing better prompts — so hold onto this one.

**Model / LLM.** The "brain" behind the tool. When people say "the model," they mean the underlying system actually generating the answers. *LLM* stands for "large language model" — the language core behind most AI you're using. Useful distinction: ChatGPT is the *app* you open; the *model* (with a name like GPT-something) is the engine inside it — and many apps wrap that language core with extra abilities like image generation, file reading, or web search. You don't need to track model names to use the tool — but now "which model are you on?" isn't a mystery.

**Training data.** What shaped the model. These systems were built by being fed enormous amounts of text and information, and they learned *patterns* from it — they didn't memorize it or keep a searchable copy. Two things this explains: why a tool may not know recent events (its training has a cutoff — though many tools can now *also* search the web, read files you upload, or use connected company data, depending on settings), and why what you type can matter, because on some versions your conversations can become training data too (much more in the safety section).

**Token / context window.** A token is a small chunk of text — roughly a word or part of one — and it's how these tools "count." The *context window* is how much it can hold in mind at once: the conversation so far, the files you gave it, your instructions. When a tool seems to "forget" what you said earlier in a long chat, or loses the thread of a giant document, you've hit the edge of its context window. Practical takeaway: it's not being rude, it has a memory limit — so for big jobs, keep things focused and don't be surprised when a marathon conversation starts dropping details.

**Hallucination.** When the tool states something false *with total confidence.* This is the single most important word here. AI doesn't "know" things the way you do — it produces the most plausible-sounding answer, and sometimes the most plausible-sounding answer is simply wrong: a made-up statistic, a fake citation, a confidently incorrect date. It won't sound unsure. It'll sound exactly as smooth delivering a wrong fact as a right one. This is *why* every rule later about checking the output exists. A clean sentence is not a receipt.

> A clean sentence is not a receipt.

### The four types everyone argues about

Now the big ones — and these four are best understood *together*, because the whole point is how they differ from each other. Picture the kind of show this brand was raised on: a group of friends fighting supernatural forces, each with a different role in the fight. Same idea here.

**Generative AI — the witch who conjures.** You give her words; she makes a *thing* appear from them — a paragraph, an image, a slide, some code. Input intention, output creation. This is what most people mean when they say "AI" right now: you ask, it produces. Almost every tool in this Handbook is generative at its core.

**Reasoning models — the Watcher in the library.** Before anyone fights, the Watcher works the whole problem through — reads the situation, thinks it all the way down, *gets the plan straight* — and only then says what to do. A reasoning model does the same: instead of blurting the first thing, it works through a problem step by step before it answers. Slower, and better at exactly what blurting is bad at — math, logic, multi-step plans, anything that needs its work checked. (This is your title, by the way: a Slayer needs a Watcher because the Watcher is the one who *thinks it all the way through first.*)

**Agentic AI — the Slayer sent out on patrol.** You don't tell the Slayer *how* to handle every vampire — you send her out and she *goes and does it.* Agentic AI is the leap from talking to *doing*: instead of telling you how to book the flight, it can go book the flight — clicking, filling, sending, across your actual accounts. Powerful, and exactly where the stakes change, because something that can *act* is only as safe as the permissions you handed it and the instructions it followed on the way. (Most "agents" today are partial — they still pause for your approval at the big moments, and you want them to. A tool that acts without a confirmation step is a tool you watch closely.)

**AGI — the prophesied one who hasn't arrived.** Every story like this has the foretold figure everyone waits for — the all-powerful one spoken about in the old texts. AGI ("artificial general intelligence") is that: a hypothetical system that could handle basically *any* intellectual task a person can, not just the one job it was trained for. Here's the part to hold onto: **no public product you can open today is generally considered AGI.** When someone says "AGI," they mean the thing everyone's either selling tickets to or losing sleep over — not a product you can sign into. Today's tools are specialists: dazzling in their lane, lost outside it.

**One crucial thing before you file these away: these are layers, not personality types.** A single tool can be generative, switch on reasoning for a hard problem, *and* act agentically — all at once. They're not four separate species of AI you choose between; they're capabilities that stack. The point of knowing them apart is so that when someone says a word, you know which capability they mean.

**The whole difference in one breath:** the witch *makes* things, the Watcher *thinks it through before answering*, the Slayer *goes and does*, and the prophesied one would do all of it across everything — *if she'd arrived, which she hasn't.* Most tools you'll meet are generative at the core, some can switch on reasoning, a few are inching toward agentic, and none are AGI, no matter what the keynote promised.

*(The shorter definitions of every term here live in the Potions Shelf, where the words go to get fully explained. This is the version that fits in your head.)*

## Part 2: The cast — what kinds of tools you're dealing with

You don't need to memorize forty products. You need to know the *types*, so when you meet a new tool you can place it. There are five.

**Big general assistants.** ChatGPT, Claude, Gemini, Microsoft Copilot. The all-rounders that can carry a lot of different jobs — drafting, planning, explaining, summarizing. These are where most people start, and where most everyday work happens. You pick between them by what you have access to, where your work already lives, and which one you click with.

**Specialists.** Perplexity, NotebookLM, Grammarly, meeting note-takers. They don't try to do everything — they do *one thing* well. Research with sources. Making sense of documents you already have. Polishing your writing. Catching what was said in a meeting. You call them in for the specific job, not the general one.

**Visual tools.** Canva's AI, image generators, design helpers. When the output needs to be *seen* rather than read — a graphic, a slide, an image — this is the department. They need art direction, not vibes (ask for "something cute" and brace for a glossy cursed object with six fingers).

**Power tools.** Codex, Claude Code, and the like. These work on real files, websites, and code. Genuinely powerful, genuinely not casual — a regular assistant can hand you a draft you dislike; a power tool can change your live website. Useful to know they exist; bring guardrails when you use them.

**The advanced stuff.** Agents and automations — the "AI that actually goes and does things" (remember the Slayer on patrol). This is where AI stops answering and starts *acting* in your accounts. Powerful, coming fast, and worth real caution: "powerful" and "safe to hand your inbox to" are not the same sentence. We'll come back to these properly down the line.

The point isn't to collect tools like lip glosses. It's to stop using one tool for every job and then blaming yourself when it doesn't work. Match the type to the task.

> Match the type to the task.

## Part 3: The rules that work on every tool

Here's the good news that saves you from learning sixteen tools separately: **the core skills are the same across all of them.** Learn these once and you can walk up to any AI tool and get something useful out of it. Every tool entry in the SLAiYER Handbook assumes you've read this part — so this is the foundation.

Let me show you how it works by fixing one thing, start to finish.

**Remember Romy and Michele.** Heading to their reunion with nothing to show for the last ten years, they decide to walk in as successful businesswomen — the suits, the borrowed Jaguar, and a story that they invented the Post-it note. It's all label, no substance. Which is exactly why, when Romy tries the persona out at a truck stop on the drive — *"Do you have some sort of businesswoman's special? … Well, we're businesswomen. From LA."* — and the waitress simply asks *"What kind of business you all in?"*, there's nothing behind it. A long, silent pause. The claim was a costume with no body underneath, and it collapsed the instant someone asked one real question.

> The claim was a costume with no body underneath.

**Here's the part nobody tells you: when you hand an AI tool a fragment, it gives you the businesswoman's special right back.** Something that *sounds* impressive and falls apart the second you look closely — a label with nothing underneath. The throughline of every rule below is the same: **treat the tool like a brand-new assistant who is fast, widely read, eager — and who acts as if it knows exactly what you meant, which is precisely the problem.** It fills the gaps with its best guess and says it all in the same confident voice. Your whole job is to give it the substance, so that when reality asks the follow-up question, your work holds up.

So let's take one real task and watch it go from "we're businesswomen, from LA" to the version that actually has something behind it. **The task:** you need to write a short note introducing yourself to a new senior client — the kind of message that decides whether they take you seriously.

**The fragment.** You type: *"Write an intro email to a new client."*

You get back something like: *"Dear Valued Client, I am writing to introduce myself and express my enthusiasm for working together. I bring a wealth of experience and look forward to a productive partnership. Please don't hesitate to reach out…"* — beige, generic, says nothing, could've been sent by anyone to anyone. It's the businesswoman's special: it *announces* competence and has zero substance behind it. Now let's actually brief it.

### Give it a job, not a mood

Tell it the specific outcome you want — the actual deliverable — not the general area you'd like help with.

*Apply it:* "Write a **four-sentence** intro email to a new client I'm taking over from a colleague. **Goal:** they finish it feeling confident I've got this." Already it has a shape to aim at — a length, a situation, a job to do — instead of guessing what "intro email" means.

A vague brief doesn't free the tool to be brilliant; it forces it to guess, and guessing gives you beige. Think of Miranda Priestly — she expects a level of attunement just short of mind-reading, and when someone pitches her something vague and obvious ("florals? for spring?"), the contempt is instant. She runs a magazine on exact standards because "do something nice" isn't a brief. Name the deliverable.

### Add the audience

Tell it who the output is for. The same facts become a different message depending on who's reading.

*Apply it:* "This is for a **senior, time-poor client who's slightly wary of the handover.** Warm but efficient. No fluff, no over-promising." Now the tool knows the room — it'll cut the throat-clearing and lead with reassurance, because that's what *this* reader needs.

This is the difference between Romy and Michele's lie and what would've actually worked: the lie wasn't aimed at anyone real. The version that lands is built for the specific people in front of you. Tell the tool who's reading and it dresses the message for them.

### Use constraints

Give it the limits: length, format, what to include, what to avoid.

*Apply it:* "**Under 90 words. No 'I'm excited to.' No 'don't hesitate to reach out.'** Include one concrete next step." Watch how much sharper that is than hoping it guesses your taste — you've fenced off the clichés and named what must be there.

Constraints don't slow the magic; they *are* the magic. Cher's closet computer didn't consider every garment ever made — it worked because it knew the closet, the occasion, and the rules.

### Make it ask you first

When your own thinking is still messy, don't make the tool guess — make it interview you.

*Apply it:* "Before you write it, **ask me up to three questions** that would make this email better." It might ask: *What's the one thing you most want them to feel? Is there history with this account? What's the next step you want?* Suddenly you're handing it the good context — and you've clarified your *own* thinking in the process.

This stops the tool sprinting toward an answer before it knows the plot. Often its questions surface the thing you hadn't thought through yourself.

### Use what you've got — carefully

If the tool lets you upload, it can pull from a document — the colleague's old emails, the account notes — but tell it exactly what to do with the file, because a file is information, not instructions.

*Apply it:* "Here are my colleague's last three emails to this client. **Match their warmth but make it mine — pull any names, dates, or commitments I shouldn't drop.**" That's a real assignment. "Summarize these" would just hand you a recap of what you already have.

And if you ever feed it a spreadsheet — *check the math.* AI data analysis can look extremely convincing and still be wrong about the formula or the source. A confident chart is not a verified one.

### Check the output — every time

This is the one that keeps you employed. Anything touching facts, numbers, money, law, or commitments gets verified before it goes out.

*Apply it:* your draft email confidently references "our successful Q3 project together" — except *you* never said that, the tool invented it to sound warm. That's a hallucination, and it would've gone to the client under your name. Catch it.

The tool produces the most plausible-sounding answer, with no internal alarm for when it's wrong. Regina George said things with total authority and a flawless blowout, and people believed her — right up until someone checked. Plausible isn't true, and the polish is not evidence.

### Iterate

Your first prompt doesn't have to be perfect. Read what comes back, say what worked and what didn't, refine.

*Apply it:* "Warmer in the first line, lose the second sentence, and end on the next step instead of a sign-off cliché." That's the turn most people skip — and it's where the draft stops being the tool's and starts being yours.

### The payoff

Put them side by side. **The fragment gave you:** *"Dear Valued Client, I am writing to introduce myself and express my enthusiasm…"* **The briefed version gives you:** a four-sentence note that opens with reassurance, sounds like you, names a real next step, and makes a wary senior client think *oh good, she's got this.*

Same tool. Same ninety seconds. The only thing that changed was that you stopped saying "we're businesswomen, from LA" and actually gave it the substance — the real brief. The fragment announces; the brief delivers. That's the entire skill. Everything else is practice.

## Part 4: Set yourself up once — meet The Skeleton Key

Everything above makes a *single* interaction good. This makes your *whole practice* efficient — and it's the move that separates the woman who uses AI from the woman who has it dialled in.

Most tools let you save standing context about yourself so you stop re-introducing yourself every single time — your role, how you work, your preferred tone, what good output looks like to you. Set that up well *once*, and every conversation starts closer to what you actually need.

We call your version of this **The Skeleton Key**: one short, reusable file about who you are and how you work, that unlocks *any* tool to work the way you need — and that you carry from tool to tool instead of rebuilding from scratch each time. One key, every door, always in your pocket.

A good Skeleton Key sounds like:

```text
I'm a senior professional in a corporate role. I prefer clear, warm, practical writing — no jargon, no hype, nothing bloated. For work messages: calm, competent, not defensive. If something's missing, ask me before drafting.
```

What it does *not* contain: confidential client information, private employee details, passwords, financial records, or anything under NDA — because this is *standing* context that persists, and you don't bake secrets into a permanent setting. Save *preferences*, not *secrets*. (Cher's closet computer knew the wardrobe and the occasion; it did not hold her social insurance number and the contents of Legal's shared drive.)

The three places this lives, which sound alike and aren't:

- **Custom instructions** — your standing *directions*: how you want the tool to write and behave (the heart of your Skeleton Key).
- **Memory** — *facts and preferences the tool remembers* about you across separate chats.
- **Projects** — a *dedicated workspace* for one ongoing job, holding its own instructions and files.

A reality check on "portable": not every tool has all three features, and they're named and built differently across tools. So your Skeleton Key isn't one magic file every product swallows the same way — it's a short profile *you* keep, and copy or adapt into whichever tool you're setting up. The portability is in *you having it ready*, not in the tools agreeing on a format.

*This is the short version — the flag in the ground. The full Skeleton Key how-to (building it, keeping it fresh, carrying it cleanly across ChatGPT, Claude, Gemini, and the rest) is coming as its own piece. For now: know that it exists, and that it's the upgrade that changes everything.*

## Part 5: The one that keeps you employed — personal vs. company accounts

Before you paste anything into anything, the highest-stakes thirty seconds in this whole chapter. Read the box.

**PERSONAL vs. COMPANY ACCOUNT — the rule**

**It's not whether you can put real information in. It's which version you're in and whether your workplace approved it.**

> It's not whether you can put real information in. It's which version you're in and whether your workplace approved it.

- **Personal / free account:** assume your conversations may be used to improve the model unless you've turned that off. Keep confidential company and client information *out* — anonymize, change names, summarize. "A client" beats the client's name. "A senior stakeholder" beats a real performance issue.
- **Company-approved business / enterprise account, used _within policy_:** real work data is often *exactly what it's for* — these versions are built with the protections (no training on your data by default, compliance controls) precisely so organizations can use them properly. But the operative words are **company-approved** and **within policy** — every time.
- **Not sure which you're in, or whether something's allowed?** Treat it as personal, keep it anonymized, and **ask IT, Legal, or security — or check your company's approved-tools list** before you paste.

Why it matters: the *exact same sentence* can be perfectly fine in one place and a real problem in another. "Here's a confidential client situation with names and our strategy" is normal, intended use inside an approved enterprise workspace — and a genuine risk pasted into a personal free account with training left on. Same words, same thirty seconds; the only thing that changed is *which door you walked through and whether you were allowed in.*

Fast is not the same as safe. Almost no career-limiting moment ever began with "I took the slower, approved route." AI fluency includes knowing which account you're in before you hit paste.

## Don't be Deb

A quick word about Deb. Deb is a corporate cryptid — the colleague whose habits make IT stare quietly at the ceiling. Deb forwards screenshots instead of links, keeps passwords somewhere a security audit would weep over, and says "pretty sure it's fine" right before doing something extremely not approved. Deb is not a villain and not anyone in particular — Deb is a *set of habits*, every one of them a choice she could make differently. Throughout the Handbook, Deb is how we mark the avoidable mistake:

- Deb read a confident answer, forwarded it to the whole department as fact, and was wrong. *(Didn't check the output.)*
- Deb pasted the confidential document into a personal account because she was "pretty sure it was fine." *(Wrong account, no check.)*
- Deb saved something sensitive into her settings so it'd "remember." *(Secrets where only preferences belong.)*

None of these are about who Deb is — her age, her role, how technical she is. They're about skipping the ten seconds the rules above take. Don't be Deb — and that's a thing anyone, at any level, can simply choose.

## Your first move this week

Pick one tool you already have access to. Take one real task — the email you've been avoiding, the meeting you need summarized, the topic you keep meaning to research. Instead of a fragment, give it the whole assignment once: who it's for, the goal, the tone, the format. Then read the output like a Watcher, not a believer — and fix what it got wrong.

That single rep, done on purpose, will teach you more than reading about ten more tools.

This is the first page of the LAiDIES Grimoire. It's the job of the SLAiYER Handbook. And it's why we start the way a Watcher would — not with "which tool is best," but with the far more useful questions: *what am I dealing with, who do I call for this, and how do I work with it without becoming the example in next quarter's training?*

The cast gets a lot easier to manage once you stop asking one tool to play every role.

*Next in the SLAiYER Handbook: the full per-tool entries — ChatGPT first — each one a complete field guide. And coming soon: the full Skeleton Key build.*
