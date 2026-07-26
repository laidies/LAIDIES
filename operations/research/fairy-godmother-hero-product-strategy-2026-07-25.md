# FAiRY Godmother — hero product strategy

**Date:** 2026-07-25  
**Status:** Product recommendation; not implementation approval  
**Companion audit:** `operations/research/fairy-godmother-live-logic-audit-2026-07-25.md`

## Recommendation in one sentence

Make FAiRY Godmother the place a woman brings the AI, work, career or everyday
life question she is stuck on and leaves with **a useful answer or finished
draft, the reasoning she needs to trust or adapt it, and one clear next move**.

The character and reward economy should make that experience memorable and
repeatable. They cannot compensate for an unreliable answer.

## The personality contract

FAiRY Godmother should be **funny, sassy, warm and unmistakably on point**.
She should feel like a quick-witted woman with excellent judgment—not a
generic assistant wearing themed copy.

Her governing rule:

> The personality makes the help more enjoyable. It never makes the help
> harder to find, less accurate or less useful.

### What her voice does

- recognizes the real problem quickly;
- names awkward truths with wit rather than cruelty;
- uses one sharp line, image or observation when it clarifies the situation;
- sounds confident when the evidence supports confidence;
- makes the user feel accompanied, capable and ready to act;
- adapts its intensity to the situation;
- gets to the useful answer without a ceremonial preamble;
- remains recognizable even when Patron Saint energy changes the flavour.

### What her voice never does

- bury the answer under jokes, catchphrases or Rewind Era references;
- manufacture certainty to sound authoritative;
- make fun of the user, a vulnerable person or a serious situation;
- turn every response into the same camp template;
- use sass where tact, care or restraint is required;
- praise the user mechanically before addressing the problem;
- give generic advice followed by decorative personality;
- let a Patron Saint impression override FAiRY Godmother's own character;
- sacrifice factual accuracy, nuance or source quality for a punchline.

The ideal response feels like:

> “Here is what is actually going on. Here is what I would do. Here are the
> exact words if you need them. And yes, that meeting absolutely could have
> been an email.”

The joke works because the useful judgment is already there.

### Humour should be situational

Humour is appropriate for:

- unnecessary meetings;
- awkward workplace rituals;
- indecisive drafts;
- AI product confusion;
- overcomplicated plans;
- low-stakes everyday frustrations;
- gently exposing avoidance or wishful thinking.

Humour should reduce or disappear for:

- job loss, discrimination or serious workplace harm;
- grief, abuse, coercion or acute distress;
- financial precarity;
- safety and high-stakes boundary responses;
- situations in which the user has asked for a direct, neutral answer.

Serious does not have to become robotic. It means the Godmother shows
judgment about when the joke belongs.

### The useful-before-cute test

Every answer should pass five checks:

1. Can the user identify the answer or deliverable immediately?
2. Is the advice specific to the facts she provided?
3. Are important assumptions, uncertainty and risks visible?
4. Is any factual claim accurate and appropriately sourced?
5. If every joke were removed, would the response still be excellent?

If the fifth answer is no, the personality is disguising weak work.

## The current product truth

The public experience already has several strong ingredients:

- one useful free attempt before an email gate;
- a distinctive place and character rather than a generic chatbot;
- optional energies and one-click revisions;
- a live answer rather than a lesson the visitor must complete;
- a conceptual FAiRY Plays Bank in the Closet;
- a Full Tour mechanic that can add one Play to
  `laidies_fairy_plays`.

However, the hero loop is not currently complete:

- the Godmother reads the local free-wish and subscriber flags, but does not
  read or debit `laidies_fairy_plays`;
- the Closet displays a FAiRY Plays Bank but its visible count has no
  demonstrated writer-to-reader connection in the page;
- Girl Talk records earned wishes under a separate
  `laidies_gt_pending_wishes` key;
- the Closet lists Pop Quiz, seven charms and a five-week Sorority streak as
  earning paths, although those paths are not all evidenced as Play grants;
- public promises conflict: one free wish, five subscriber wishes a day,
  three wishes per visit and a weekly-reset bonus all appear in current
  sources;
- correspondence history and the Wisdom count are memory-only and disappear
  on reload;
- the favourite badge requires ten successful answers in one page session,
  which conflicts with the stated usage caps;
- any non-empty Worker response is treated as success, while the live audit
  found fabricated research evidence, weak routing, long waits and unsafe
  boundary behaviour.

This means the reward is presently more visible than redeemable. That must be
fixed before FAiRY Plays are promoted as a core reason to complete activities.

## The hero-product promise

### Public promise

> Bring the question you are stuck on. Leave with something you can use.

The expanded promise can be:

> Ask about AI, work, your career or an everyday decision. FAiRY Godmother
> turns the situation into a clear question, gives you a useful answer or
> finished draft, tells you what she assumed, and helps you take the next
> step.

Avoid “ask anything.” It creates an impossible quality and safety promise.

### The three non-negotiable outcomes

Every successful wish should provide the parts that fit the task:

1. **The useful thing:** the answer, draft, plan, comparison or decision aid.
2. **The judgment:** why this approach fits, what is uncertain and what would
   change the advice.
3. **The move:** the next action the visitor can actually take.

The response should not force the visitor to rewrite her prompt. Prompt
improvement can be shown after the answer as an optional “How the Godmother
read it” reveal.

## The product loop

```text
Bring a real problem
        ↓
Receive a useful, task-specific result
        ↓
Refine, copy or save it
        ↓
See what the Godmother assumed and what to do next
        ↓
Use the result in real life
        ↓
Return with the next problem
```

The LAiDIES reward loop connects to it:

```text
Learn or practise elsewhere in SUNNYVAiLE
        ↓
Earn one clearly named FAiRY Play
        ↓
See it enter the Bank immediately
        ↓
Spend it on one complete Godmother case
        ↓
Discover the next meaningful way to earn
```

## 1. Turn a “wish” into a complete case, not a single model call

One Play should open one **case**:

- the first answer;
- up to two or three included refinements or follow-up questions;
- copy, download and explicit save;
- a short end state: “I have what I need” or “This did not help.”

Shorter, warmer, firmer or more senior revisions should not each consume a
new Play. Charging for basic repair makes the user pay for the tool’s first
answer being imperfect and discourages honest exploration.

Close a case when the user starts a materially different problem. Show this
plainly before she spends.

## 2. Make FAiRY Plays a real allowance

Use the vocabulary consistently:

- **FAiRY Play** = the limited service allowance in the Bank;
- **wish** = the experience of opening a case;
- **Butterfly Clips** = the town’s general spendable currency;
- charms, cards, stickers and badges = collectibles, not money.

Recommended allowance structure:

- one guest preview so a new visitor can experience real value;
- a base weekly allowance for a newsletter subscriber/resident;
- earned bonus Plays for meaningful LAiDIES activities;
- base allowance may reset weekly;
- earned bonus Plays should roll over to a reasonable cap so a reward does
  not disappear before the user can use it.

Do not lock the exact numbers until actual model cost, successful-case rate,
return rate and abuse data exist. The current “five per day” could make
earned bonuses feel meaningless; a tiny allowance could make the product feel
punitive.

Build one authoritative balance with an append-only ledger:

```text
play_transaction_id
resident_id
kind: grant | spend | refund | adjustment
amount
source_or_case_id
dedupe_key
created_at
metadata
```

Guest preview state may remain local. Resident rewards and spending must
survive devices and browser storage changes.

### Spend and refund rules

- reserve one Play when a case starts;
- confirm the spend only on typed successful completion;
- automatically refund timeouts, service errors, empty answers, safety
  routing errors and malformed responses;
- never spend for a boundary response;
- prevent two tabs from spending the same last Play;
- show “1 Play used · 3 remain” in the successful case receipt.

## 3. Reward behaviours worth reinforcing

The earn system should deepen the LAiDIES learning relationship, not reward
page views or busywork.

Strong earning events:

- complete a Full Tour;
- complete a substantive Try-On;
- complete or improve on a Pop Quiz;
- complete a class;
- finish a useful tool flow connected to an episode skill;
- selected community contributions after moderation exists.

Do not reward:

- opening a page;
- repeated refreshes;
- copying an answer;
- giving a positive rating;
- mass invitations;
- activity that can be farmed without learning, practice or contribution.

Each event needs one authoritative writer, a dedupe key, a visible grant and
a direct route to spend it. Until an event is wired and tested, it must not
appear in “How to earn more.”

## 4. Build a real Correspondence File

The current “Past wisdom” is a three-item session display. A hero product
needs a useful, privacy-conscious object:

- save only when the user explicitly chooses;
- default to saving the answer, not silently retaining the original prompt;
- tag cases as AI, Work/Career or Everyday Life;
- reopen a case with its included follow-ups and versions;
- add personal notes such as “sent this” or “used option B”;
- search, rename, export and delete;
- explain storage and model-processing plainly;
- allow a visitor to keep everything ephemeral.

The Correspondence File gives the Resident Card practical value and creates a
reason to return that is stronger than a streak.

## 5. Personalize without becoming invasive

Let a resident optionally maintain a compact “What the Godmother should know”
card:

- role and industry;
- career stage;
- current goals;
- preferred answer length and directness;
- default energy;
- recurring constraints she chooses to save.

Show which saved details influenced an answer and let her exclude them from a
case. Do not quietly build a psychological profile from private prompts.

The selected Patron Saint energy should change tone, framing and form—not
facts, confidence or safety. “Read the room” can choose an energy, but the
result should name what it chose and allow an instant switch.

## 6. Route by the job the user needs done

The first classifier should decide both domain and task.

| Domain | Common jobs | Required product behaviour |
|---|---|---|
| AI | Explain, compare tools, choose a workflow, troubleshoot, prompt, evaluate a result | Current claims use verified retrieval and an “as of” date; distinguish product facts from judgment |
| Work/career | Draft, prepare a conversation, negotiate, decide, plan a search, handle power dynamics | Offer a usable script plus options, risks and escalation considerations |
| Everyday life | Decide, organize, communicate, plan, make a difficult task smaller | Give proportionate practical help without pretending to be a therapist or regulated adviser |

Then route to response types such as:

- finished draft;
- decision brief;
- conversation plan;
- action plan;
- AI/tool comparison;
- explanation;
- troubleshooting sequence;
- boundary response.

This is materially different from pushing every question through the same
“Prompt Glow-Up / Post Glow-Up / Receipts” template.

## 7. Make AI advice a signature strength

Because LAiDIES teaches AI, the Godmother should be unusually trustworthy on
AI questions:

- browse or retrieve when a product, model, price, policy or capability may
  have changed;
- cite the primary source beside the relevant claim;
- show the date checked;
- say when providers define terms differently;
- distinguish observed fact, informed judgment and speculation;
- link to the best matching LAiDIES episode, class, Library book or current
  NewsStand explanation when it genuinely helps;
- never invent research findings when retrieval is unavailable.

This turns the broader LAiDIES learning system into an advantage that a
generic advice chatbot does not have.

## 8. Create a memorable answer without burying the answer

Recommended answer anatomy:

1. **The Godmother’s read** — one or two sentences showing she understood the
   real situation; this is the natural home for one sharp, situational line.
2. **Your answer** — the useful deliverable first.
3. **Why this fits** — concise reasoning, risks and alternatives.
4. **What I assumed** — only material assumptions.
5. **Your next move** — one clear action.
6. **Fittings** — optional shorter, warmer, firmer, more senior, compare or
   ask a follow-up.
7. **Receipts** — only when verified factual claims were actually used.

The atmosphere can be magical; the information architecture must be calm,
scannable and mobile-first.

The interface should not label a separate “fun” section. Wit belongs naturally
inside the read, transitions and occasional annotation. The draft, plan,
instructions, factual explanation and sources should remain clean enough to
copy and use without editing out a performance.

## 9. Give new visitors a reason to share it

### A safe share object

Create a branded **Godmother Note** from an answer:

- nothing is shared by default;
- omit the original prompt, names and case details;
- let the user choose or edit a safe excerpt;
- preview exactly what will be public;
- attach a LAiDIES link that opens a fresh free wish, never the private case.

Useful answers become distribution without turning private advice into
content.

### “Dear FAiRY Godmother”

Publish an opt-in, editorially reviewed advice feature:

- accept a separately written public submission rather than assuming a
  private case can be republished;
- anonymize and fact-check it;
- label AI assistance and editorial review;
- connect the answer to a NewsStand story, episode, class or book where
  relevant;
- give the submitter a Play, not a general cash-like reward.

This can become a recurring social/newsletter franchise and an acquisition
door into the live product.

### High-intent discovery

Build useful, editorially written landing pages around situations people
already search for—asking for a raise, following up after an interview,
choosing an AI tool, explaining an AI concept—then let the visitor bring her
own version to the Godmother. Do not publish private prompts as SEO inventory.

## 10. Let the whole town feed the hero product

Every eligible completion should show:

> +1 FAiRY Play. Your next case is waiting at Willow Lane.

The deep link can preload a relevant starter without auto-spending:

- after a career class: “Help me prepare for the conversation I have been
  avoiding”;
- after an AI lesson: “Help me choose where this technique fits in my work”;
- after a Try-On: “Turn what I made into a version I can actually use.”

The Godmother should also send the visitor back into the learning system when
that is useful:

- “You can use this now.”
- “If you want to understand why it works, Episode 2 explains the mechanism.”

That makes the surfaces complementary rather than duplicative.

## 11. Make trust a product feature

Before hero promotion, add:

- a visible scope statement: AI, work/career and everyday-life help;
- clear medical, crisis, emergency, legal and other regulated boundaries;
- a truthful privacy and retention explanation;
- typed success, needs-information, safety, rate-limit and error responses;
- zero fabricated citations in an adversarial test set;
- source-grounded current claims;
- no Play consumed on failure;
- “What I assumed” and uncertainty where relevant;
- delete/export controls for saved cases;
- a direct “That was wrong or unsafe” report path.

Safety and factual quality cannot vary by membership tier.

## 12. Measure whether it helps, not how often the wand is clicked

Recommended north-star:

> **Useful cases completed per returning resident**

A “useful case” should combine a successful technical response with a signal
such as copy, save, export, voluntary “helped” feedback or a later
“I used this” confirmation. No single proxy should be treated as proof.

Supporting measures:

- guest wish completion and email conversion after value;
- case completion and failure/refund rate;
- median and 95th-percentile response time;
- save, copy, export and included-follow-up use;
- weekly return rate;
- Play earn-to-redeem conversion;
- percentage of earned Plays that expire unused;
- unsafe-boundary and fabricated-claim rate;
- user-reported usefulness by domain and task;
- Godmother Note share-to-new-wish conversion;
- cost per useful case, not merely cost per call.

Feedback should be one tap with optional reason tags: useful, too generic,
missed context, factually wrong, unsafe, too long or other. Never reward a
positive rating.

## Priority order

### P0 — make the promise true

1. Repair the live response contract, research grounding and scope routing
   identified in the companion audit.
2. Establish one authoritative Play ledger and connect grant, display, spend
   and refund.
3. Reconcile every public allowance and earning claim; remove anything not
   implemented.
4. Define one Play as one complete case with included refinements.
5. Ensure failures and boundaries never consume a Play.
6. Add evaluation fixtures for varied AI, career, work and life questions.
7. Score every fixture separately for usefulness, factuality, specificity,
   tone fit and personality; a funny inaccurate response fails, as does an
   accurate response that reads like generic enterprise software.

### P1 — make it a product people return to

1. Build the explicit-save Correspondence File.
2. Add task-specific response types and included case follow-ups.
3. Add clear balance, spend receipt and “earn more” routes.
4. Add optional resident context and controllable defaults.
5. Instrument usefulness, redemption, latency, failure and cost.
6. Connect only verified learning completions to Play grants.

### P2 — make it an acquisition engine

1. Add privacy-safe Godmother Notes.
2. Launch the editorial “Dear FAiRY Godmother” franchise.
3. Create high-intent scenario pages that lead into a free wish.
4. Add episode/class/newsletter deep links with relevant starter questions.
5. Test membership allowances and benefits from real usage economics.

### P3 — deepen delight after utility is proven

- richer correspondence stationery and saved-case organization;
- seasonal Patron Saint energies;
- collectible wand, note or desk treatments that do not alter answer quality;
- loyalty-card milestones;
- carefully capped friend invitations;
- optional Butterfly Clip redemption for a Play only if the service economics
  and currency clarity support it.

## What would make it genuinely differentiated

The defensible product is not “ChatGPT in a fairy costume.” It is the
combination of:

- a trusted answer across a deliberately bounded set of real-life needs;
- finished work plus transparent judgment and a next move;
- a memorable, grown-woman point of view;
- source-grounded AI expertise connected to LAiDIES teaching;
- a private Correspondence File that becomes more useful over time;
- a reward allowance earned through meaningful learning and practice;
- a shareable editorial franchise with explicit consent and human review.

If those elements work together, FAiRY Godmother can be both the first reason
someone visits LAiDIES and the practical reason she keeps coming back.

## Decisions needed before implementation

1. Does one Play open one complete case with included fittings? **Recommended:
   yes.**
2. Do earned bonus Plays roll over while the base allowance resets?
   **Recommended: yes, with a cap.**
3. Is the base allowance tied to newsletter subscription, Resident Card or a
   future paid tier? **Recommended: treat the Resident Card as identity and
   persistence, then price membership only after usage economics are known.**
4. Which completion events earn Plays at launch? **Recommended: begin with
   Full Tour, substantive Try-On and class/quiz completion only after each has
   an authoritative event and dedupe rule.**
5. Does the Correspondence File save prompts? **Recommended: answers only by
   default; original prompts only by explicit choice.**
6. Can private cases feed public content? **Recommended: never. Use a separate
   opt-in public submission.**
