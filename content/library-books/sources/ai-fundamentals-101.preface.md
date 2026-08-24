# Preface — Why This Book Matters

Alright, LAiDIES: listen—or should we say, read?—up. This book is important.

We created *AI Fundamentals 101* because there should be one place that explains the fundamental concepts of AI, how they connect and what has to happen before you can type something into an AI application and receive an answer.

That means the models and software, but also the chips, computing power, data centres, energy, infrastructure, people and decisions behind them. It means explaining the buzzwords that appear in headlines—tokens, training data, frontier models, compute, agents, guardrails and sandboxes—and, more importantly, what they mean when you use an AI tool and why you should care.

But this is not a standard textbook or a collection of definitions you could simply look up online.

No, no. LAiDIES would never do that to you.

This is not a “florals for spring” situation. We can—and we will—do better.

So why is it important for you, a woman of distinction—or a friend to womankind; everyone is welcome here—to understand this without first acquiring a PhD in computer science?

We’re so glad you asked.

## 1. From “ARGH, WTF?” to “Ah. That’s why.”

AI is already changing how people work, create, find information and make decisions. It is also unusually accessible: you can open an application, type a request and ask it to help you produce almost anything from a meeting summary to a website.

But accessible does not mean self-explanatory.

Think about electricity. You do not need to understand the electrical grid before you turn on a lamp. You flick a switch and—bam—light. For most people, most of the time, electricity is effectively plug and play.

Generative AI is different. The person using it helps shape what happens next. What you ask, what context you provide, what the system can see, which tools it can use and how you evaluate its answer can all change the result.

Without some understanding of how the system works, it is easy to receive something completely different from what you intended, become frustrated and conclude: “I don’t understand the hype. This thing sucks.”

We do not want you walking away from a useful technology because nobody explained what was happening.

This book will help you recognise why an AI tool has gone off track—and what you can do about it. The goal is to move from:

**“Why can’t this thing follow one basic instruction?”**

to:

**“Oh. I see what happened. I know what to change.”**

In other words: from **“ARGH, WTF?”** to **“Ah. That’s why.”**

## 2. From “OMG, the end is nigh!” to “Ugh, as if.”

AI is not a passing fad. It is also not magic, salvation or Skynet arriving on Tuesday.

The field moves extraordinarily quickly, and everyone wants a piece of the attention surrounding it. Every day brings new announcements, forecasts, warnings, demonstrations and supposed life-changing hacks.

Some are carefully researched. Others belong beside the celebrity psychics at the supermarket checkout.

Not every headline, content creator, company announcement or AI commentator is equally reliable. A benchmark result is not automatically proof that a profession is about to disappear. An impressive demonstration is not necessarily a dependable product. A viral “three prompts that will change your life” video may be describing something useful—or something you already know how to do wearing a new hat.

You cannot cut through that noise by memorising a list of approved opinions. You need enough of the fundamentals to ask:

- What part of the AI system is this actually about?
- What evidence supports the claim?
- What does the demonstration leave out?
- Does this affect the AI tool I use?
- What would have to be true for this prediction to happen?

LAiDIES will continue investigating important stories in the NewsStand. But eventually, you should be able to look at the latest breathless headline and decide for yourself whether it deserves your attention—or merely an **“Ugh, as if.”**

## 3. From “Whatever” to “RSVP: Yes. I have notes.”

Once you understand how AI works, you can do more than use it better or identify nonsense. You can participate meaningfully in decisions about what happens next.

AI raises real questions about work, education, public services, copyright, energy, privacy, security, competition and who gets to make consequential choices. It also presents real opportunities. Neither the benefits nor the risks should be waved away.

What guardrails do we need? Who should control powerful models? Who gets access to computing power? When should an automated decision require a human review or a right of appeal? What does a new data centre mean for the community in which it is built? How should work and the economy change if AI becomes capable of doing substantially more?

These debates are already happening—in workplaces, governments, schools, city halls and homes. You deserve the knowledge required to participate in them.

As computer scientist Karen Spärck Jones put it, “[computing is too important to be left to men](https://www.bcs.org/articles-opinion-and-research/computings-too-important-to-be-left-to-men/).”

Ditto for AI.

And it is not only a question of who is allowed into the room. The loudest voices are often the people most willing to make claims they do not understand. That includes your fictional Aunt Linda, who insists the new data centre killed her friend’s cat.

No, Aunt Linda. The cat was 20.

But, in fairness to Aunt Linda, nobody ever explained how a data centre works, what its genuine effects might be or how to distinguish those effects from a coincidence. Once you understand the system, you can move the conversation away from panic or dismissal and towards the actual benefits, costs and choices.

That matters, because refusing to engage does not stop decisions from being made. It only means they will be made without you.

## What we want this book to change

By the end of *AI Fundamentals 101*, you should be better able to:

- get useful results from the AI tools you choose to use;
- understand what AI headlines and product claims are actually describing;
- recognise where a problem, risk or limitation sits within the larger system;
- ask better questions before accepting somebody else’s prediction; and
- help shape how AI is used in your workplace, community and society.

This is a living book. The underlying concepts are relatively stable; the products, companies, examples and capabilities around them change quickly. Those details will remain under review and will be updated as the field changes.

You do not need to become an AI engineer.

You need enough of the map that nobody can wave a glossy demonstration, a terrifying headline or a billion-dollar forecast at you and call the argument finished.

So, let’s get to it.

## How This Book Works

This book teaches you the entire AI ecosystem — from “what is AI, actually?” to the chips it runs on, the buildings those chips live in, and the people who build all of it. By the end, you'll be able to read an AI headline, locate the part of the system it is describing, evaluate the claim and ask a better next question.

**Who this book is for:** You're smart and curious. You don't have a computer science background. You're tired of feeling like everyone else understands this and you missed the memo. (They don't. You didn't.)

**What you won't need:** A maths degree. Programming experience. Prior knowledge of any of this.

**What you will need:** Willingness to follow the thread. Each chapter exists because the previous one made you ask a question. If you read them in order, each answer builds on the last. If you need one answer now, the chapter-and-section index stays with you while you read.

## Three Principles This Book Follows

**1. Follow one moment deeper.** Each chapter exists because the previous one made you ask a natural question. Chapter 1 explains what AI is → you ask “but how does it learn?” → Chapter 3 (data) and Chapter 5 (training) answer that. The whole book is one continuous thread pulled through.

**2. Always locate you in the picture.** For every concept, you'll know: is this something happening behind the scenes that I'll never touch? Or is this something I interact with directly? Both matter — but for different reasons.

**3. Teach the task, not the category.** Every concept is anchored to something the system is being asked to *do.* Not “here are five types of neural networks” — instead, “the system is trying to tell cats from dogs in photos, and here's what it does.”

## What the Boxes Mean

Throughout the book, you'll see coloured callout boxes. Here's what each one signals:

📌 **Key concept pinned.** The one thing in this section you most need to retain. If you're skimming, read these.

⏸️ **Your natural question.** “Wait, but...” — we anticipated the question you're about to ask and we're answering it right here.

💡 **Insight.** An implication or connection that isn't obvious but matters.

🏆 **Landmark Moment.** A real historical moment that made this concept matter. Three parts: what happened, what concept it demonstrated, and why it mattered.

📰 **Big Picture.** A pointer to a deeper investigative piece on the social, ethical, or economic implications. The textbook teaches how things work; Big Picture pieces explore what that means.

🔍 **Concept in Practice.** Something you've already noticed in real life — AI streaming word by word, products getting worse after updates, the same model behaving differently in different apps — now explained mechanically with what you've just learned.

## Other Things You'll Find in Every Chapter

- **Learning objectives** after the opening section has established why the chapter matters (what you'll be able to do after reading)
- **Key terms table** beside those objectives (every new concept, defined in plain English)
- **“Try This”** exercises (ways to apply what you've learned without needing any technical tools)
- **“What's Next”** bridge (the question this chapter leaves you with, answered by the next)
- **System diagram** (a cumulative visual showing how the whole system is building up, chapter by chapter)
- **Quick reference glossary** at the bottom (for flipping back to later)

## A Note on Time

AI moves fast. This book is regularly updated — model names, benchmark scores, costs, and company details are checked and refreshed as things change. The concepts themselves (how training works, what tokens are, why GPUs matter, how agents loop) are stable fundamentals that won't shift underneath you. But the specifics? Those stay under review.

## Ready?

Chapter 1 starts with a spam filter. Trust the process.
