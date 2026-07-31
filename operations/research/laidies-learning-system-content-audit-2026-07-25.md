# LAiDIES learning-system content audit

**Status:** REPORT READY — editorial and curriculum findings; no public copy,
episode canon, game, class script or NewsStand story changed by this report  
**Date:** 2026-07-25  
**Scope:** the LIBRAiRY, SUNNYVAiLE High, interactive learning tools, games,
NewsStand and Episodes as one learning system  
**Standard applied:** `operations/CONTENT-PUBLISHING-STANDARD.md`

## Executive verdict

LAiDIES does not mainly have a content-volume problem. It has a content
architecture and authority problem.

There is already a great deal of material. The strongest parts have a clear
job: Episodes 1–4 use story to make an idea memorable; Straight Answers uses
dated receipts; Dream Phone makes the player judge a claim; the NewsStand radar
separates fact, reporting and editorial judgment; the High School script
specification requires real interfaces and one-variable demonstrations. The
problem is that these strengths do not yet operate as one curriculum.

Three defects currently prevent that:

1. **Several concepts have multiple teachers and no single owner.** Prompting,
   hallucination, memory, context, accounts, product/model distinctions and
   agentic AI recur across books, classes and episodes at similar depths.
2. **Some current explanations and practice mechanics are materially
   inaccurate or have aged into false binaries.** This is most serious in
   Concepts 101, Accounts 101 and several Basics scripts. A lesson or game can
   feel clear while teaching a model of AI that current products or real
   evidence already contradict.
3. **The catalogue is organized largely by content container, not by a learner
   progression.** A reader can consume several polished items and still not
   know what she now understands, can do, can judge, or should learn next.

The correct fix is not to merge everything into one course or make every item
longer. The six surfaces should perform different jobs using the same
canonical mental models and terminology:

| Surface | Its unique job | What depth means here | What it must not become |
|---|---|---|---|
| **Episodes** | Create the narrative need and durable mental model | Show why the idea changes a woman's work or life; make the mechanism and stakes memorable | A settings tour, glossary read-aloud or complete reference lesson |
| **LIBRAiRY** | Own the canonical, revisable explanation | Define the mechanism, boundary, nuance, examples, current/future distinction, personal and societal stakes, and routes onward | A second episode script or a pile of extracted handbook chapters |
| **SUNNYVAiLE High** | Turn understanding into observable skill | Demonstrate, practise, compare, diagnose failure and transfer the skill to a new situation | A menu tour without learning, or another conceptual essay over a screen recording |
| **Interactive learning tools** | Solve a real problem for the user while making the useful transformation visible | Diagnose, transform and explain without requiring the user to complete an exercise | A compulsory lesson, assessment or opaque utility whose teaching claim cannot be seen in the result |
| **Games** | Rehearse a judgment, behaviour or skill through choice, consequence, feedback and replay | Make the learner notice, decide, receive explanatory feedback and encounter varied rounds | A disguised content quiz or a reward loop that claims learning without requiring the named skill |
| **NewsStand** | Apply the learning system to dated reality | Report what changed, distinguish evidence from claims, show which durable concept helps interpret it, and state what remains unknown | The permanent textbook or a release-note feed |

That division makes the formats complementary. Repetition is allowed only when
it performs a new cognitive job: encounter in an episode, explanation in the
Library, guided performance in a class, repeated judgment or behaviour in a
game, assisted transformation in a tool, and application in the news.

## What was reviewed

This is a structural and representative content audit, not a claim that every
sentence in every asset has been fact-checked.

- The live Library inventory and rendered/current source material for Accounts
  101, Briefing 101, Concepts 101, Setup 101, Straight Answers, Vocab 101 and
  Who's Who.
- The existing Library decisions, extraction inventory and July 24 Library
  quality audit.
- The High School scope, locked eight-period proposal, Basics blueprint,
  class-script specification, class register and representative Basics scripts.
- The current interactive-tool and Fun & Games inventory and activity-quality
  records, with closer inspection of FAiRY Godmother and the Dream Phone
  fact-check game.
- The 24-episode arc, current Episode 1–6 authority and representative canon.
- The NewsStand editorial radar, current public story register and a Tribune
  draft.
- Current external reference points for general-purpose AI capability, AI
  literacy, product volatility, risk management and multimedia learning.

## The complementarity test

A topic is properly distributed only if a learner can answer six different
questions without receiving six conflicting lessons:

1. **Episode:** Why should I care, and what is the mental model?
2. **Library:** What is it really, where does the analogy stop, and what is
   contested or changing?
3. **Class:** Can I use or evaluate it on a real task and explain why the result
   changed?
4. **Tool:** Can I solve a real problem and see how the concept changed the
   result without being forced through an exercise?
5. **Game:** Can I recognize or perform the behaviour under pressure, receive
   feedback and improve on another attempt?
6. **NewsStand:** What happened now, what evidence supports it, and which
   durable idea helps me interpret it?

The current system does not consistently pass this test.

### Representative ownership map

| Topic | Episode's contribution | Canonical Library home | Class contribution | Interactive-tool contribution | Game contribution | NewsStand contribution |
|---|---|---|---|---|---|---|
| What an AI product contains | Story-level model/tool/company distinction in Episodes 1, 5 and 6 | One system-stack lesson: company → product/interface → model → instructions/context → retrieval/tools → action | Inspect the stack in a current product and predict which layer caused a result | Diagnose which layer may be responsible for a result | Practise assigning changing outcomes to the right layer | Apply the stack to a launch, incident or product claim |
| Prompting and briefing | Episode 2 creates the delegation/brief mental model | Briefing 101 holds the durable checklist, limits and examples | Guided practice on real briefs, with assessment and transfer; no second lecture | FAiRY Godmother turns a rough prompt into a stronger prompt and usable draft while showing what changed | No compulsory game is required; a future game must add a genuinely different behaviour | Show when a product change reduces or changes prompting work |
| Hallucination and verification | Episode 3 makes fluent error and retained judgment memorable | Verification reference owns claim types, evidence quality, uncertainty and high-stakes escalation | Source-tracing and acceptance-test labs using controlled tasks | A verification helper could decompose a real claim and surface the checks to make | Dream Phone rehearses claim decomposition, missing denominators, source quality and resisting “too strange to be true” | Show how a current incident, benchmark or provenance claim should be evaluated |
| Context, memory, projects and retrieval | Episode introduces the reason these layers matter | One canonical comparison owns what each layer does, does not do and how products differ | Set up and test each feature on current interfaces; observe one variable at a time | A diagnostic helper can explain what information a product is likely using | Sort evidence into context, memory, project knowledge or retrieval; predict what will and will not carry | Report meaningful changes to those features with dates and plan/region limits |
| Privacy, accounts and permissions | Episode supplies the human stakes | Accounts 101 owns data classification, provider/product/plan/settings/contract/retention distinctions | Permission and safe-workflow lab with realistic decisions | A decision helper can route the user's data/account question without requesting the sensitive data itself | Make realistic paste/connect/approve choices and experience proportionate consequences | Report policy, security and regulatory changes without turning them into timeless rules |
| Agents and automation | Episode shows the shift in responsibility and consequences | Canonical autonomy ladder: tools, workflows, agents, permissions, monitoring and failure recovery | Build/run a bounded workflow, inspect actions, approvals and logs, recover from failure | A setup/check tool can expose permissions, steps, cost and stop conditions | Simulate permission, monitoring, intervention and recovery decisions | Cover incidents and releases through the durable autonomy/permission model |
| AGI and future capability | Episode, if selected, helps readers imagine why the threshold matters | Concepts owns definitions, disagreements, present evidence, candidate thresholds and societal scenarios | Evaluation lab comparing breadth, reliability and long-horizon performance; not a speculative product tour | A scenario explorer can make assumptions and consequences visible without declaring a prediction | Classify evidence across breadth, reliability and autonomy without pretending one score settles AGI | Update the evidence and debate without announcing a finish line |

This pattern should be completed for every curriculum topic before more books or
classes are commissioned.

## Findings by surface

## 1. LIBRAiRY

### What is working

- The Library can become the canonical knowledge layer because it is searchable,
  linkable and more easily corrected than a finished episode.
- Vocab 101's emerging index-to-deeper-lesson pattern is the right direction:
  recognition belongs in the glossary; teaching belongs in the canonical unit.
- Straight Answers has a useful editorial form: direct questions, dated
  receipts, confidence distinctions and recheck triggers.
- Briefing 101 contains a useful, practical brief structure.

### Where it is below the required standard

#### Concepts 101 contains both a factual error and several obsolete teaching
boundaries

- The token explanation reverses the ratio: it says roughly 0.75 tokens per
  word while its own 200,000-token ≈ 150,000-word example implies roughly 0.75
  **words per token**.
- Training is described as if all useful knowledge enters during one feeding
  period and then stops. That collapses pretraining, post-training, retrieval,
  tools, memory and live information access.
- Context is repeatedly described as everything the model can “hold in mind,”
  and attached files are treated as if they are necessarily loaded in full.
  Current systems may retrieve selected passages or otherwise process material
  through product scaffolding.
- “Ask the tool its cutoff date” is taught as a useful check even though a
  generated self-report is not authoritative product documentation.
- Fast/chat versus reasoning is presented as a stable binary with categorical
  speed and quality implications. Current products route, switch or expose
  effort in different ways.
- The agentic-AI boundary is defined largely as acting outside chat. Current
  general-purpose systems can already take goals, plan, call tools and perform
  multi-step work, while agentic work may also occur inside a controlled
  environment. The meaningful dimensions are degree of autonomy, duration,
  permissions, reliability, oversight and consequence.
- The AGI comparison assigns whole-project goals and outcome delivery to future
  AGI even though current agents already demonstrate those behaviours. A
  defensible lesson must discuss breadth, performance, reliability,
  adaptability, learning efficiency and disputed thresholds rather than claim
  that AGI begins when a user can give a goal.
- “Show your reasoning step by step” is presented as a verification method.
  A fluent rationale is not independent evidence and may not expose the
  system's actual internal process.

These are not small wording issues. They change the mental model the reader
takes away.

#### Accounts 101 simplifies privacy beyond safety

The book leans on personal/free versus paid/company as if that division
determines protection. The real answer can depend on provider, product, plan,
settings, contract, retention, administrative access, connectors, region,
company policy and the data itself. A company-approved account is not
permission to paste any company information.

The replacement teaching model should begin with:

1. What kind of data is this?
2. Which product/account is receiving it?
3. What do the current settings and contract say?
4. Who else can access it, and for how long?
5. Does a connected tool create additional access?
6. What is the smallest amount of data the task requires?

#### Setup 101 promises portability and consistency it cannot guarantee

A profile or “Skeleton Key” does not automatically travel between products.
Memory, standing instructions, project knowledge and chat history are distinct
features whose behaviour varies by product, account and date. “Every new chat
is a stranger” is no longer a safe universal explanation.

#### Briefing 101 and Episode 2 are parallel lessons

The book currently retells much of Episode 2 rather than serving as its deeper
reference and working tool. Retain the checklist, examples, worksheet,
edge cases and evaluation guidance; remove repeated story-level persuasion.

#### Who's Who does not yet have a stable editorial job

It mixes companies, products and concepts, while current tool rankings and
descriptions are highly perishable. It should either become:

- a dated company/product/model map with explicit layers and recheck dates; or
- a decision guide owned by Episodes 5–6 and maintained like a current
  reference.

It should not be a timeless book of subjective provider rankings.

#### Straight Answers has the right form but not yet trustworthy receipts

Several answers use broad homepages or secondary/vendor sources where the text
promises a source the reader can check. Large adoption, failure, revenue,
profit, hallucination and productivity numbers need claim-by-claim rechecking
against the exact study, population, benchmark and date. Incomparable measures
must not be combined into one apparent consensus.

### Library ruling

Keep the seven current titles as candidates, not as an approved curriculum.
Before expansion:

1. Rebuild Concepts around an accurate AI-system stack.
2. Rebuild Accounts around data and permission decisions.
3. Reconcile Briefing with Episode 2.
4. Reverify Straight Answers receipt by receipt.
5. Decide whether Who's Who is a dated map or a decision guide.
6. Maintain Vocab as an index into those canonical owners.

## 2. SUNNYVAiLE High

### What is working

- The script specification correctly treats the learner as intelligent and new
  to the technology, not new to life.
- Real screens, highlighted targets, breadcrumbs, slow cursor movement and
  dated vendor sources are appropriate for procedural teaching.
- The one-variable before/after rule is excellent when the comparison is
  genuinely controlled.
- The intended split—Basics explains the cross-tool concept; a product subject
  shows where it lives—is useful.

### Structural conflicts

- The locked proposal specifies eight periods in the same order for each tool,
  while the current Basics catalogue has thirteen classes and separate script
  files whose numbers and names do not consistently match the register.
- Blueprint, JSON register, script specification and individual scripts do not
  form one reliable source of truth.
- The specification says Episodes own thinking and classes own machinery, but
  Basics scripts often become full conceptual lessons. Without a topic owner,
  Basics competes with Concepts and the Episodes.
- Current plans are weighted toward interface setup. That can create competent
  click-following without durable understanding, diagnosis or transfer.

### Representative content failures

- `basics-p3b-what-a-session-is.script.md` uses a fabricated 40-message failure
  to imply that an earlier instruction is simply gone. The later blueprint
  correctly replaces this with two fresh chats that isolate the variable.
- `basics-p3-what-it-keeps.script.md` makes universal memory claims across
  tools and uses a demo whose changed output may be caused by invented facts
  rather than memory.
- `basics-p5-telling-it-who-you-are.script.md` says standing instructions apply
  exactly every time. Its supposedly good output invents a delay and Thursday
  delivery from an absent client email, accidentally teaching hallucination as
  success.
- `basics-p6-giving-it-your-stuff.script.md` teaches one product's Projects
  behaviour as a cross-tool Basics concept and relies on volatile limits.
- `basics-p7-when-it-does-the-work.script.md` claims chat cannot perform
  actions, which current tool-using chat products contradict.
- `basics-p8-bolting-on-extra-powers.script.md` collapses skills, connectors,
  plugins and extensions into a shared settings architecture that products do
  not consistently share.

### How narration, images and animation should create real depth

Animation should explain invisible mechanisms, not decorate narration. Screen
recording should prove the current procedure, not carry the whole lesson. Each
class should use the smallest combination of these layers:

1. **Orient:** one plain learning outcome and the prior idea it builds on.
2. **Mechanism:** a short animation of the invisible system—what information
   enters, where it is stored or retrieved, what the model receives, what a
   tool can act on, and where the boundary sits.
3. **Worked example:** narrator models a realistic task and makes the decision
   process visible.
4. **Controlled comparison:** change one variable; show the result; explain why
   that result is evidence rather than mere variation.
5. **Real interface:** show every relevant step on the dated product surface.
6. **Boundary/failure:** show one realistic condition in which the method does
   not work, or where a user must verify rather than infer.
7. **Guided practice:** learner makes a choice or performs the task.
8. **Transfer:** change the situation or product and ask what remains true.
9. **Teach-back:** learner explains the mechanism in one or two sentences.
10. **Current appendix:** product paths, plan limits and reshoot triggers live
    separately from the durable lesson.

This follows established evidence rather than a preference for more visual
content. Multimedia-learning research supports pretraining the main concepts,
signalling relevant material and segmenting transient explanations. Worked
examples are especially useful for novices, but guidance should later fade
toward independent problem solving and transfer. Retrieval should test
relational understanding, not only recall.

### High School ruling

Do not scale all current scripts into production. First:

1. Establish one authoritative class register and archive/supersede mismatches.
2. Approve one complete class using the ten-layer learning pattern above.
3. Assess it with a real transfer task, not video completion.
4. Separate durable concept animation from volatile interface capture so a
   menu change does not invalidate the whole class.
5. Decide whether the same-eight-period tool structure remains binding after
   the competency map is complete. This is an Ali decision, not an automatic
   rewrite.

## 3. Episodes

### What is working

Episodes 1–4 currently supply the clearest narrative progression:

1. what generative AI is and why a reader might use it;
2. prompting as delegation and briefing;
3. fluent error, verification and retained judgment;
4. the history of AI and women's erased contribution.

Those episodes demonstrate the distinctive job of the series: create a felt
problem, give it a memorable frame, attach evidence and leave the reader with a
usable shift in judgment.

### What is unresolved

- Only Episodes 1–6 have current authority. Rows 7–24 remain legacy/unruled, so
  they cannot yet function as the curriculum spine.
- The current season map overlaps heavily with Library and class topics:
  context, files, memory, privacy, custom instructions, plans, agents, RAG,
  multimodality and workflows.
- Episode 5 files and decisions contain visible authority tension after the
  rejected teaching architecture. Downstream books/classes cannot safely build
  on an unresolved lesson.
- Later societal topics such as bias, labor, power, ethics and governance sit
  too late or too vaguely to support current reader decisions.

### Episode ruling

Episodes should become the **sequence spine**, not the complete syllabus. Every
approved episode substance sheet should include a complement card:

- prior knowledge required;
- the one durable mental model introduced;
- what the episode deliberately does not teach;
- canonical Library continuation;
- one class skill or lab unlocked;
- one interactive-tool opportunity or an explicit decision that assistance is
  not appropriate;
- one game behaviour unlocked or an explicit decision that play is not
  appropriate;
- NewsStand tags that can apply the concept;
- terms added or corrected in Vocab;
- facts and product claims with expiry triggers.

The remaining season should be resequenced only after the curriculum
competencies and ownership map are approved. Narrative order still matters, but
it should not quietly determine whether a safety-critical concept appears in
Episode 22 instead of when the reader first needs it.

## 4. Interactive learning tools

### Their unique job

An interactive learning tool earns its place by solving a real problem for the
user. It can teach by making its diagnosis and transformation visible, but it
must not turn useful assistance into compulsory homework.

The user should not have to revise a prompt, pass a test or complete a transfer
exercise before receiving value. A strong tool can:

1. understand the request;
2. identify material missing information;
3. produce the useful transformation or answer;
4. show what changed and why;
5. expose uncertainty, assumptions and safety limits; and
6. offer optional controls when the user wants another version.

### FAiRY Godmother: a prompt transformation and advice tool

FAiRY Godmother belongs in this category, not in Games. Its intended subject
scope is AI questions/advice, career/work advice and everyday-life advice. The
public invitation to bring a sentence, email, brief or situation should name
that boundary and exclude medical, crisis and emergency advice.

The current live product accepts a prompt and an optional character/energy,
then returns:

- an interpretation of the wish;
- a prompt-quality diagnosis;
- missing information;
- a LAiDIES note;
- a **Prompt Glow-Up**;
- a **Post-Glow-Up** draft or answer;
- a next move; and
- a receipts/privacy note.

Shorter, warmer, firmer and more-senior revisions are optional one-click tools.
They are not learner assignments.

The educational value comes from the visible before/after and the explanation
of what was missing. The user is allowed to take the improved prompt or draft
and leave.

A fresh live logic audit is recorded separately in
`operations/research/fairy-godmother-live-logic-audit-2026-07-25.md`. Its most
serious finding is that the current Worker fabricated research statistics and
citations after explicitly diagnosing that receipts were required and being
told not to invent sources. Until that is corrected, the tool must not be
presented as dependable across research or evidence-seeking questions.

### Interactive-tool ruling

Interactive tools should have:

- a precise input promise and supported task range;
- task routing that changes the response shape when the job changes;
- useful output without mandatory user labour;
- visible assumptions and transformation logic;
- a clear boundary response for medical, crisis, emergency and other excluded
  high-stakes professional advice;
- a stable success/error contract between service and interface;
- current privacy, retention, provider and cost evidence; and
- explicit limits where the tool cannot browse, verify, access the user's
  files or know missing context.

## 5. Games

### Their unique educational job

Games sit between explanation and real-world application. They can give the
learner safe repetitions of a consequential decision, make the result visible
and vary the situation across rounds.

That is different from a class or tool. A class guides performance. A tool does
useful work for the user. A game should require the learner to retrieve,
discriminate, choose or perform.

The current collection contains several jobs:

| Type | Current examples | Legitimate job |
|---|---|---|
| **Judgment simulation** | Dream Phone fact-check game | Weigh claims/evidence and make a decision |
| **Retrieval and recognition** | Pop Quiz, trading cards | Recall and distinguish concepts |
| **Behaviour/confidence nudge** | Girl Talk, Madame CLAi-O | Prompt a small action, reflection or conversation |
| **Memory and return cue** | KSVL songs, collectibles and rewards | Strengthen recall, identity and continued participation |
| **Delight/atmosphere** | DJ Booth and some bonus objects | Make the town enjoyable without claiming a learning outcome |

Delight is a valid purpose. A game should not be forced to claim instruction to
justify its existence. But whenever a game claims to teach or encourage a
skill, the mechanic—not only the surrounding copy—must require that skill.

### Dream Phone: real, inflated or made up

The Dream Phone fact-check game has the clearest learning mechanic in the
current collection:

- the AI makes a composite claim;
- the player calls sources with different roles and evidence quality;
- she must choose **For Real** or **As If**;
- the reveal separates true, inflated and made-up components;
- a receipt is provided;
- repeated rounds reward missing denominators, inconsistent details and
  resisting the instinct that an absurd claim must be false.

That complements Episode 3 well. The Episode supplies the Burn Book mental
model; the Library should explain verification; a class can teach source
tracing; Dream Phone makes the learner repeatedly make the call.

It must not be described as teaching someone to *determine whether something is
a hallucination* on its own. Its current rounds are authored so that
“scatter”—people disagreeing on specifics—and a “missing number” reveal the
designed answer. In real investigations:

- multiple sources can repeat the same false claim;
- truthful witnesses can disagree;
- a precise number can still be fabricated or stripped of context;
- a source can be real but not support the claim;
- an AI answer can be partly correct, outdated or unverifiable rather than
  simply real/fake.

The current binary verdict is softened by a much better three-part reveal, but
the learning language should name what the game actually practises:

> finding warning signals, decomposing a claim, seeking the missing denominator
> and checking a receipt before deciding what confidence is justified.

To deepen transfer, later rounds should include direct source excerpts, dates,
source provenance, a source that is credible but irrelevant, coordinated
repetition of one false claim, and an **insufficient evidence / not yet known**
verdict. Primary and exact sources should replace secondary/Wikipedia receipts
where practical. The player should sometimes explain which evidence changed
her mind, not receive points only for the final binary answer.

There is also a separate patron-saint deduction mode in Dream Phone. It may
build deduction and pattern recognition, but it should not inherit the
fact-check game's verification claim merely because both use clues.

### The games quality gate

A game with an educational claim should not ship or earn a learning reward
unless its design packet can answer:

1. **Target behaviour:** What exactly should the player notice, choose or do?
2. **Prior lesson:** Which canonical concept does the game rehearse?
3. **Mechanic alignment:** Does success actually require that behaviour, or can
   the player win through guessing, repetition or a cosmetic choice?
4. **Evidence model:** Is the game's “correct” answer defensible, sourced and
   appropriately nuanced?
5. **Explanatory feedback:** Does the player learn why the choice worked or
   failed?
6. **Replay variation:** Does another round require the same skill in a changed
   situation rather than memorizing the answer?
7. **Transfer:** Is there a bridge from the fictional mechanic to a real task?
8. **Failure safety:** Can a wrong answer teach a harmful shortcut?
9. **Reward integrity:** Is a badge tied to demonstrated behaviour rather than
   visiting, clicking or exhausting the options?
10. **Honest limits:** Does the experience state what it does not prove?

### Games ruling

Add games to the canonical concept register and complement cards, but do not
make one compulsory for every concept. Preserve and strengthen:

- Dream Phone fact-check as verification-judgment practice;
- quizzes/cards as retrieval and discrimination;
- confidence/action games as behaviour nudges with honest claims.

Audit all learning/reward claims against what the current mechanic actually
observes. Pure delight can remain pure delight.

## 6. NewsStand

### What is working

The NewsStand has the strongest explicit editorial architecture of the six
surfaces:

- primary sources first;
- independent reporting distinguished from vendor material;
- headline-reality and product-release checks;
- qualification thresholds;
- different reader jobs for DAILY, BREAKING, WEDNESDAY and Tribune;
- qualified packets, continuity and noise control.

Current stories also attempt to route readers into Episodes and Library books,
which is the correct complementary behaviour.

### Where the curriculum connection fails

- Cross-links can currently inherit inaccurate or incomplete Library teaching.
- News stories use concepts such as reward hacking, sandboxing, provenance,
  trajectory monitoring and least privilege that have no dependable canonical
  Library entry.
- Some links do not match the claimed lesson. A Tribune draft routes readers to
  Episode 4 for a shift from AI answers to AI actions, while Episode 4's
  authoritative job is history.
- Without a shared concept register, NewsStand may either reteach the full
  concept in every story or assume knowledge the curriculum never supplied.

### NewsStand ruling

Preserve its distinct sourcing and edition rules. Add a curriculum handoff,
not a common publishing template:

1. Tag the durable concepts a story uses.
2. Link only to a canonical lesson that genuinely teaches that concept.
3. If the concept has no owner, label it **CURRENT VOCAB — PROVISIONAL** in the
   reporting packet and create a Library candidate; do not silently invent a
   permanent definition inside the story.
4. Record whether the story updates, contradicts or merely exemplifies the
   canonical lesson.
5. Feed verified changes into a dated correction/recheck queue for books,
   classes and learning games.

NewsStand should keep the curriculum current; it should not be forced to carry
the curriculum itself.

## Missing curriculum

The following are either absent, too thin, too late or fragmented across
formats. They should be prioritized by prerequisite and reader risk, not by
how fashionable the term is.

### Foundation gaps

1. **The AI system stack:** company, product, model, system/developer
   instructions, user context, retrieval, memory, tools, permissions and UI.
2. **AI versus model versus product versus algorithm versus automation versus
   workflow versus agent.**
3. **How models are made and adapted:** pretraining, post-training,
   fine-tuning, retrieval and live tool use without the “one feeding period”
   story.
4. **Evaluation:** acceptance criteria, test cases, comparison, uncertainty,
   benchmark limits and when a convincing explanation is not evidence.
5. **Grounding and information access:** search, RAG, citations, attached files,
   memory and context as different mechanisms.

### Practical and safety gaps

6. **Data and permission literacy:** classification, least privilege,
   retention, connected sources, administrative visibility and high-stakes
   escalation.
7. **Agent operations:** autonomy levels, plans, tools, permissions, approvals,
   logs, monitoring, cost, stopping, recovery and accountability.
8. **When not to use AI:** task/risk selection before prompting.
9. **Model and mode selection:** performance, latency, cost, modalities,
   context, tool availability and evidence—not provider personality rankings.
10. **Durable work practices:** versioning inputs, preserving sources,
    documenting decisions and testing outputs.

### Critical and societal gaps

11. **Bias, representation and uneven performance.**
12. **Copyright, ownership, likeness and media provenance.**
13. **Labor and organizational change:** tasks versus jobs, job quality,
    surveillance and distribution of gains.
14. **Power and access:** concentration, open versus closed systems, local
    versus cloud, inequality and public-interest infrastructure.
15. **Environmental costs and trade-offs.**
16. **AGI and ASI:** contested definitions, present evidence, candidate
    thresholds, uncertainty and scenario consequences.
17. **Governance and accountability:** what the user, deployer, provider,
    employer and government each control.
18. **Learning how to keep learning:** how readers detect that a product lesson
    has expired and return to primary evidence.

UNESCO's AI competency framework is a useful coverage check because it includes
human-centred judgment, ethics, techniques/applications and system design, with
progression from understanding to applying to creating. LAiDIES currently has
substantial “understand” and introductory “apply” material but much less
assessed creation, system design and societal accountability.

## Recommended curriculum architecture

### 1. Create a canonical concept register

One row per concept:

| Field | Purpose |
|---|---|
| Canonical term and plain definition | Prevent synonym drift |
| Mechanism | State what actually happens |
| Boundaries and common confusions | Prevent the analogy becoming the lesson |
| Current evidence / disputed points | Separate fact from interpretation |
| Personal and societal stakes | Answer why it matters |
| Canonical Library owner | Give the concept one teacher |
| Episode encounter | Name where the need/mental model appears |
| Class application | Name the observable skill |
| Interactive-tool job | Name the real problem solved and visible transformation |
| Game mechanic | Name the behaviour rehearsed and evidence of success |
| NewsStand tags | Enable current examples and corrections |
| Volatility and recheck trigger | Keep product claims out of timeless prose |
| Teach-back and transfer check | Prove the learner can explain and use it |

No new concept-heavy asset should enter production without a row or an explicit
reason it is only a dated NewsStand term.

### 2. Build pathways, not shelves

Use the same progression for major strands:

1. **Encounter** — Episode
2. **Understand** — canonical Library unit
3. **Observe** — animation/worked example
4. **Practise** — guided class task
5. **Get help** — interactive tool solves a real problem and exposes the useful
   transformation, when appropriate
6. **Rehearse** — game or repeated low-stakes decision, when appropriate
7. **Transfer** — new task/tool/situation
8. **Judge** — failure, evidence and risk
9. **Apply to now** — NewsStand
10. **Teach back** — explain it to a friend

The interface can still present charming books, classes, papers and episodes.
The curriculum underneath must know where the learner is in that progression.

### 3. Separate durable and volatile layers

- Durable: mechanisms, distinctions, decision frameworks, safety principles.
- Semi-durable: provider/product comparisons, benchmark interpretations.
- Volatile: menu paths, plan limits, feature availability, prices, policy
  settings and release claims.

Episodes should contain mostly durable material. Library units can hold durable
and explicitly dated semi-durable material. Classes should combine reusable
mechanism animation with replaceable interface segments. Games should preserve
the durable decision mechanic while allowing claims, sources, scenarios and
product behaviour to be rechecked or replaced. NewsStand owns the volatile
edge and sends corrections back.

### 4. Assess the promised outcome

Completion is not evidence of learning. Each substantial unit should test:

- **Recognition:** Can she identify the concept?
- **Explanation:** Can she explain the mechanism without the analogy?
- **Discrimination:** Can she distinguish it from a nearby concept?
- **Application:** Can she use it on a realistic task?
- **Diagnosis:** Can she explain a failure without guessing?
- **Transfer:** Can she apply the idea in a changed tool or situation?
- **Judgment:** Can she identify uncertainty, evidence and risk?
- **Teach-back:** Can she explain it accurately to a friend?

This is the standard Ali articulated. It should be the curriculum's completion
contract.

## Prioritized repair order

### P0 — stop inaccurate teaching from scaling

1. Do not mark current Library books or Basics scripts editorially approved as
   a set.
2. Correct or hold the Concepts 101 token error, AGI/agentic boundary, training,
   context, memory and “show reasoning” claims.
3. Hold Accounts 101 until its privacy/account model is rebuilt and sourced.
4. Reject class demonstrations that rely on invented facts, fabricated
   behaviour or unverified cross-product claims.
5. Establish the authoritative class register and explicitly supersede
   conflicting scripts/blueprints.
6. Reverify the Dream Phone fact-check rounds and receipts.
7. Hold broad FAiRY Godmother advice/research claims until the current Worker
   passes the live logic audit; the deployed service fabricated research
   statistics and citations during the 2026-07-25 test.
8. Keep Episode 5 downstream teaching blocked until its concept authority is
   resolved.

### P1 — install the learning architecture

9. Build the canonical concept register and full topic-ownership matrix.
10. Approve the six surface roles and the complement card required for each
   episode/topic.
11. Rebuild one representative pathway end to end. Recommended first candidate:
    **hallucination and verification**, because Episode 3 and Dream Phone
    already provide a strong encounter/rehearsal pair while the canonical
    Library and class layers expose the current gaps. Follow with **context,
    memory, projects and retrieval** as the product-volatility test.
12. Produce one complete High School class using mechanism animation, a worked
    example, real interface, guided practice, transfer and teach-back.
13. Apply the interactive-tool gate to every utility that claims to teach or
    advise across multiple task types.
14. Apply the games quality gate to every activity that claims learning or
    awards a skill/progress reward.
15. Add the NewsStand curriculum handoff and correction loop.

### P2 — fill the curriculum deliberately

16. Sequence the missing curriculum by prerequisite and risk.
17. Reconcile Episodes 7–24 against that sequence without sacrificing the
    season's narrative arc.
18. Turn Briefing 101 into Episode 2's working reference, not its duplicate.
19. Rebuild Who's Who only after the company/product/model architecture is
    approved.
20. Reverify Straight Answers and keep it as a dated evidence product.

## Decisions for Ali

The audit does not silently make these product decisions:

1. Approve or change the six surface jobs.
2. Decide whether Library “books” remain the primary canonical unit or whether
   some should become shorter field guides/reference cards.
3. Decide whether the locked same-eight-period tool structure remains binding
   after the competency map, or whether tool labs can have the periods their
   actual machinery requires.
4. Confirm that interactive tools may perform the work for the user and teach
   through a visible transformation without mandatory revision or assessment.
5. Confirm that games are classified by actual job—judgment simulation,
   retrieval, behaviour nudge, memory cue or pure delight—and that pure delight
   does not need a false educational claim.
6. Select the first representative end-to-end pathway.
7. Decide when the curriculum map should govern the remaining episode order
   versus when narrative needs override it explicitly.

## Evidence and reference points

- [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026) — current general-purpose systems, capabilities, limitations and risks; scientific synthesis by more than 100 experts.
- [Google DeepMind, Levels of AGI](https://deepmind.google/research/publications/66938/) — separates breadth/generality, performance and autonomy instead of defining AGI by one missing verb.
- [Stanford AI Index 2026, Responsible AI](https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai) — useful evidence on benchmark/reporting gaps and task-specific hallucination measurement.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — govern, map, measure and manage risk; useful basis for evaluation and accountability literacy.
- [UNESCO AI competency framework for students](https://www.unesco.org/en/articles/ai-competency-framework-students) — human-centred mindset, ethics, techniques/applications and system design across understand/apply/create progression.
- [OpenAI, memory and controls](https://openai.com/index/memory-and-new-controls-for-chatgpt/) — direct evidence that “every new chat is a stranger” and memory as one stored note are not stable universal explanations.
- [Anthropic, what are Projects?](https://support.anthropic.com/en/articles/9517075-what-are-projects) and [RAG for Projects](https://support.anthropic.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects) — direct evidence that project knowledge, chat history, memory and retrieval must not be collapsed.
- [Cambridge Handbook of Multimedia Learning: managing essential processing](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning/A9E77D0172F905AC957689D1771E2888) — pretraining and segmentation principles.
- [van Gog, Paas & Sweller, cognitive load, worked examples and animation](https://link.springer.com/article/10.1007/s10648-010-9145-4) — worked examples and the transient-information problem in animation.
- [van Gog et al., example/problem order for novices](https://doi.org/10.1016/j.cedpsych.2010.10.004) — example-first learning outperformed problem-first/problem-only approaches in the studied novice tasks.
- [Education Endowment Foundation, cognitive science research agenda](https://educationendowmentfoundation.org.uk/projects-and-evaluation/research-agenda-themes-priority-areas/research-agenda-theme-cognitive-science) and [retrieval for relational understanding](https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/rich-retrieval-pilot-trial) — retrieval, schema, cognitive load and conceptual rather than merely rote recall.

## Bottom line

The goal is not for a reader to say, “I watched the AI episode, read the AI
book and took the AI class.” The goal is for her to say:

> I know what is happening, I know which part I am looking at, I can use it, I
> can tell when it fails, I know what is uncertain, and I can explain it to
> someone else.

The six surfaces should be different routes through that one promise.
