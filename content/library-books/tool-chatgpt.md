---
title: ChatGPT
source: _superseded/grimoire/slaiyer-handbook-chatgpt.html
words: 1689
---

*The SLAiYER Handbook · Tool entry*

*Big general assistant*

# ChatGPT

The all-rounder most people meet first. Here's what it's actually for, what it costs, and how to work with it — the universal skills live in [Chapter 1](/grimoire/slaiyer-handbook-chapter-1.html); this is the ChatGPT-specific part.

If you only ever open one AI tool, it's probably this one — and that's a reasonable place to start. ChatGPT is a **big general assistant**: it drafts, summarizes, explains, plans, and talks through almost anything. It's the generalist, not the specialist. That's its strength and its trap — it'll happily attempt a job another type would do better, and sound just as confident doing it.

## What it's genuinely good at

Think of ChatGPT as the smart, fast, widely-read assistant from Chapter 1 — the one who needs a real brief. Give it the whole assignment (deliverable, audience, constraints) and it's excellent at first drafts you then make yours: the email you're avoiding, the messy notes that need a shape, the thing you understand but can't yet phrase, the "explain this to me like I'm smart but new." It's also a strong thinking partner — talk a decision through and have it play back the trade-offs.

## Where it's the wrong tool

It's a generalist, so it'll attempt jobs that belong to a specialist and you won't always notice until it matters. For research you can cite, a research specialist with sources beats it. For a polished, print-ready graphic, a visual tool beats it. For anything where the numbers have to be right, you are still the one who checks. Remember the rule from Chapter 1: a clean sentence is not a receipt.

## What it costs

ChatGPT has a **real free tier** — genuinely usable for everyday drafting, summarizing, brainstorming, and getting unstuck, with daily limits on the smarter models. **Paid tiers** add capacity, the better "thinking" models, deep research, agent mode, and (on Business and Enterprise) keep your work data out of training by default. Prices and tiers change — [OpenAI's pricing page](https://openai.com/chatgpt/pricing/) is the one place to check before quoting a number.

## Setting it up the LAiDIES way

Five ChatGPT-specific moves worth making early. Do them in any order; once they're in place, you don't redo them.

**1. Custom Instructions.** *Settings → Personalization → Customize ChatGPT.* Fill the fields with the basics you'd tell any new assistant — your role, your context, how you want things written, what "good" looks like, and what's off-limits ("don't invent facts; ask me before drafting if something's missing"). It applies to every chat without retyping. The fields are up to 1,500 characters each — use them.

**2. Memory.** *Settings → Personalization → Memory.* Turn it on if you want ChatGPT to carry useful preferences across chats — your tone, your project codenames, who's on your team — without you reminding it every time. The summary page shows exactly what's been saved; you can edit or delete any individual memory, or clear it all. Turn Memory *off* entirely on accounts you use for sensitive work.

**3. Projects.** *Projects in the left menu.* Make one for any ongoing job — a launch, a manuscript, a client engagement. Drop the reference files in, add project-specific instructions, and every chat inside stays on-topic with that context. Projects keep their own memory of where you left off; standalone chats don't.

**4. Custom GPTs** *(Plus, Business, Enterprise).* When you have a job you do *repeatedly* the same way — same audience, same format, same tone — build a Custom GPT for it. It's a Custom Instructions block + saved reference files + a name, bundled into one assistant you can pin and reuse. Keep them private or share inside your org.

**5. Temporary Chat.** *The icon at the top-right of the chat screen.* Stays off the record — it won't appear in your history and won't be used to train the model, and it auto-deletes after 30 days. Reach for it when you're pasting something one-off you don't want kept.

*Don't re-learn this here*

How to brief any tool — deliverable + audience + constraints + check — lives in [Chapter 2](/grimoire/slaiyer-handbook-chapter-2.html). This card assumes you've read it.

## How to prompt it (the ChatGPT-specific moves)

The universal brief — deliverable, audience, constraints, check — is the foundation. These are the moves layered on top, pulled from OpenAI's *current* prompting guidance (the part that actually changed between models). Each one with a vague version, a better version, and the why — so it sticks.

**1. Skip "you are an expert" — give context instead.**

*Vague:* "You are a world-class marketing expert. Write me a launch email."  
  
*Better:* "I'm drafting a launch email to B2B SaaS buyers who've heard of us but haven't bought. Tone: confident, not breathless. Length under 150 words. Highlight one specific feature benefit. End on a soft CTA. Show me three versions."

*Why:* Old advice said start every prompt with "You are a world-class…" — and for older models, that helped. OpenAI's own current prompting guide now calls that *noise*: the model already knows how to write a marketing email. What it doesn't know is *your* situation, your audience, your taste. Treat ChatGPT like a sharp new hire — they don't need you to tell them they're smart. They need to know the job, the audience, and when they're done.

**2. Tell it what "done" actually looks like.**

*Vague:* "Help me with my landing page."  
  
*Better:* "Rewrite this landing page hero so a first-time visitor knows what we do, who it's for, and what to do next inside 5 seconds. Headline under 30 words; sub under 80. No buzzwords."

*Why:* Without explicit success criteria, ChatGPT picks one of a thousand ways to "help" — at random. It's like asking Cher for "a cute outfit." She'll absolutely pull something, but the version of cute in her head might be plaid pants with a yellow blazer. Spell out what done looks like and the right thing falls out.

**3. Specific beats vague — every time.**

*Vague:* "Write a poem about OpenAI."  
  
*Better:* "Write a short inspiring poem about OpenAI, focused on the recent DALL-E launch."

*Why:* OpenAI's own example. The first prompt produces mush; the second produces something you might actually use. The pattern is always the same: add audience, length, format, tone, and the actual job the output has to do. More context in, better output out.

**4. Iterate in the same chat. Don't restart.**

*Vague move:* first reply is too corporate → open a new chat and try a different prompt.  
  
*Better move:* stay in the same chat → "Make this less corporate." "Half the length." "Drop the bullets, rewrite as one paragraph." "Closer, but the opener still sounds like a vendor pitch."

*Why:* Every message you send becomes context the model uses for the next reply. Starting fresh throws away everything ChatGPT learned about your taste from this draft. Steering mid-chat compounds — each correction makes the next reply better. Restarting resets you to zero.

**5. Break complex jobs into steps.**

*Vague:* "Write me a launch campaign — email, landing page, three social posts, internal announcement, and press release."  
  
*Better:* The brief first. Then headlines. Then body copy. Then social cuts. Each accepted step becomes the spine of the next.

*Why:* One mega-prompt forces ChatGPT to commit to a strategy without you weighing in. By the time you see the press release, it's built on five other decisions you never approved — and pulling on one thread unravels the whole thing. Step-by-step lets you catch the wrong shape before everything else is built on top.

**6. Match the model to the task.**

The *default* model is fast and good enough for almost all everyday chat — drafting, summarizing, brainstorming. The *reasoning* / "thinking" models (the slower ones in the model picker) are worth switching to when the job needs careful logic — multi-step analysis, math, code, untangling a complex decision with trade-offs. The picker is in the chat header; switch per task. Don't waste the slow one on chitchat; don't use the fast one for a multi-step audit.

## The one safety note for ChatGPT

On a **personal free or Plus account, your conversations may be used to improve the model by default** — you can turn that off in **Settings → Data Controls → Improve the model for everyone**. For one-off sensitive things, use a **Temporary Chat** instead. Anything confidential — work data, client info — belongs in a **company-approved** Business or Enterprise account, used within policy (those don't train on your data by default). The full rule is in [Chapter 5](/grimoire/slaiyer-handbook-chapter-5.html).

### Don't be Deb

Deb pasted the whole confidential client deck into her *personal* ChatGPT to "just clean up the wording," training left on, because she was pretty sure it was fine. The wording came back lovely. That's not the part anyone remembers.

## Your first move

Open ChatGPT, go to Settings → Personalization, and paste in three lines of Custom Instructions: your role, how you like things written, and "ask me before drafting if something's missing." Then run one real task through it with a proper brief. You've just set the door to open the way *you* need it.

*Next tool entries — Claude, Gemini, Copilot — are on their way, each a complete field guide.*

Practical MAiGIC video walkthrough — still brewing. A short screen-share of the setup above is coming.

### Receipts

- [Prompt engineering best practices for ChatGPT](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt) — OpenAI's official guidance: be specific, name audience and format, iterate, break tasks into steps.
- [OpenAI's prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-2_prompting_guide) — OpenAI's current model-specific guidance, including why the old "you are a world-class expert" opener is now considered noise.
- [ChatGPT Custom Instructions](https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions) — how to set them up, what the fields are for, the 1,500-character limit.
- [Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq) — how Memory works, how to review and edit what's stored, how to turn it off.
- [Using Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt) — when to make a Project, how project memory works, how to add files and instructions.
- [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt) — Custom GPTs availability (Plus, Business, Enterprise), how they differ from Projects.
- [Data Controls FAQ](https://help.openai.com/en/articles/7730893-data-controls-faq) — how to turn off model training, how Temporary Chat behaves, what survives opt-out.
- [ChatGPT plans & pricing](https://openai.com/chatgpt/pricing/) — current free, paid, team, and enterprise tiers, straight from OpenAI.
- [Enterprise privacy](https://openai.com/enterprise-privacy/) — Business and Enterprise don't train on your data by default.
