# Research — from chatting to working with AI

**Date:** 2026-07-26
**Status:** SPECIFIED — research-backed recommendation only; no class is
scripted, filmed, admitted or public.
**Requested by:** Ali
**Recommended product home:** SUNNYVAiLE High masterclass pathway, supported
by later LIBRAiRY/reference checklists rather than a primary book

## The question

People naturally treat an AI chat like instant messaging with a friend:
short messages, corrections, extra details and new ideas added as they occur.
That behaviour is not inherently wrong. It is useful for exploration,
clarification and collaborative thinking.

The problem begins when the conversation is also expected to be the complete
brief, project plan, memory, source of truth, production workspace, review
record and final artifact. The important teaching question is therefore not
only:

> Should I stay in this chat or start a new one?

It is:

> How do I turn a conversation into a reliable way of working, and when does
> that work need a project containing several purposeful chats?

## Evidence summary

### 1. The 2025 multi-turn study is a historical baseline, not a July 2026 score

Microsoft Research's *LLMs Get Lost in Multi-Turn Conversation* compared
fully specified single-turn tasks with the same task information revealed
across multiple turns. Across more than 200,000 simulated conversations and
six generation tasks, the tested models averaged a 39% performance drop in the
multi-turn condition. The larger effect was unreliability rather than loss of
basic capability: models made assumptions early, attempted a solution too soon
and then over-relied on that early direction instead of recovering.

The experiments used 2025-era models and interaction harnesses, including
GPT-4.1, o3, Claude 3.7 Sonnet and Gemini 2.5 Pro. The paper was recognized at
ICLR 2026, but publication date does not make its tested products current. Do
not use 39% as a performance claim about GPT-5.5-era ChatGPT, July 2026 Claude,
Gemini 3.x or any current product wrapper.

This does **not** prove that all real conversations are 39% worse, that a
single giant prompt is always superior or that follow-up questions should be
avoided. The experiments isolate a specific risk: consequential task
requirements arriving piecemeal after the model has already committed to an
interpretation.

Newer 2026 research cuts both ways:

- *Found in Conversation* reports that a new training method recovered at
  least 92% of single-turn performance on the smaller open model families it
  tested. This is evidence that the gap can be reduced; it is not evidence that
  current commercial chat products use that method.
- June 2026 work on context arriving in pieces still reports large drops in
  some tested settings despite the full conversation being available.
- ACL 2026 multi-turn work continues to find weaknesses in failure recovery
  and fine-grained instruction following as conversations deepen.

The defensible current conclusion is therefore narrower:

> Current systems have materially better context, memory and workflow
> scaffolding than the 2025 study evaluated. Multi-turn alignment remains a
> live problem, but no current independent benchmark found in this review
> establishes one universal penalty for today's products.

Teaching implication:

- use conversation to discover and refine the assignment;
- do not let the first plausible draft silently become the governing brief;
- before consequential execution, restate the now-complete assignment,
  constraints and finish line;
- when the conversation is anchored to a wrong early interpretation, a clean
  chat with the corrected brief may be safer than another small correction.

Primary source:

- Microsoft Research, “LLMs Get Lost in Multi-Turn Conversation,” ICLR 2026
  Best Paper, accessed 2026-07-26:
  https://www.microsoft.com/en-us/research/publication/llms-get-lost-in-multi-turn-conversation/
- Chen, Wu and Leskovec, “Found in Conversation: LLMs Teach Themselves to
  Close the Multi-Turn Gap,” May 2026, accessed 2026-07-26:
  https://arxiv.org/abs/2605.24432
- Jia et al., “One Battle After Another: Probing LLMs' Limits on Multi-Turn
  Instruction Following with a Benchmark Evolving Framework,” ACL 2026,
  accessed 2026-07-26:
  https://aclanthology.org/2026.acl-long.433/

### 2. What materially changed from 2025 to July 2026

The product layer changed enough that older “one chat versus new chat” advice
is incomplete.

| Change | Current evidence | What it changes for the learner |
|---|---|---|
| Cross-chat memory and retrieval | ChatGPT can draw from past chats and show memory sources; Claude can search past chats and maintain categorized memory; Gemini can use past-chat memory on eligible accounts; Copilot has conversation-derived memory | A new chat is no longer universally a stranger. The learner must understand what crossed the boundary and how to inspect, correct or exclude it |
| Scoped project workspaces | ChatGPT Projects, Claude Projects, Gemini Notebooks and Copilot Notebooks hold related sources/instructions; ChatGPT now supports Chat and Work inside a Project | Multiple chats can sensibly share one body of work. The important question becomes whether they share the correct scope and authoritative sources |
| Better source handling | ChatGPT Projects can add sources from apps, chats and pasted text; Copilot Notebooks use selected references that update; Claude Projects use project knowledge/RAG | Re-uploading everything into one thread is less necessary, but “available to retrieval” is still not “used correctly in this answer” |
| Automatic long-chat management | Claude can summarize earlier turns automatically in eligible long conversations; ChatGPT reports infrastructure improvements for long Thinking chats and larger Thinking context | Arbitrary message-count rules are obsolete. A long chat may continue technically while still becoming organizationally confused |
| Branching and controlled follow-ups | ChatGPT/Codex supports steering versus queuing; Gemini supports branching a conversation; current agent surfaces expose progress and redirection | Users can separate an alternative, queue a later task or repair current work without treating every new thought as a hard reset |
| Persistent work agents | ChatGPT Work can perform longer tasks across apps/files while the user follows progress, answers questions, redirects and approves important actions; Claude Cowork can continue remote sessions across devices | “Chat” may now initiate ongoing work rather than only produce one response. Interruption, approval, checkpoint and external-action boundaries matter more |
| Better artifact surfaces | Current products increasingly preserve editable documents, pages, charts, files and project outputs outside the scrolling transcript | The durable output can become the work surface; the chat no longer needs to be both conversation and final document |
| Temporary/scoped privacy modes | Leading tools increasingly offer temporary/incognito chats and project-only or notebook-only boundaries | Starting a separate chat may be a privacy/scope decision, not merely a context-reset tactic |

Primary current sources:

- OpenAI, “ChatGPT — Release Notes,” entries from February–July 2026, accessed
  2026-07-26:
  https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- OpenAI, “Projects in ChatGPT,” accessed 2026-07-26:
  https://help.openai.com/en/articles/10169521-projects-in-chatgpt
- Anthropic, “Release notes,” March–July 2026 entries, accessed 2026-07-26:
  https://support.claude.com/en/articles/12138966-release-notes
- Anthropic, “How do usage and length limits work?”, updated July 2026,
  accessed 2026-07-26:
  https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work
- Google, “Gemini Drops: March 2026,” accessed 2026-07-26:
  https://blog.google/innovation-and-ai/products/gemini-app/gemini-drop-updates-march-2026/
- Microsoft, “Get started with Microsoft 365 Copilot Notebooks,” updated April
  2026, accessed 2026-07-26:
  https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-with-microsoft-365-copilot-notebooks

The updated 2026 workflow principle is:

> Do not organize chats around fear of a context limit. Organize work around
> objective, authority, sources, privacy, stage and ownership—and use the
> product's current memory, project, branch, queue and artifact controls
> deliberately.

### 3. Current vendor guidance converges on explicit, structured work

The current OpenAI and Google guidance both recommend clear, specific
instructions and iterative refinement. Google's current prompt-design guide
also recommends separating instructions, chaining sequential steps, using
clear structure to distinguish instructions/context/task, and planning,
executing and validating complex work.

This supports a distinction the class should make:

- **casual conversational turns** are a valid input style;
- **a reliable workflow** still needs explicit stages, task boundaries,
  success criteria and verification.

The lesson should not teach that every message must be a perfect giant prompt.
It should teach that a messy conversation needs periodic structure.

Primary sources:

- OpenAI, “Prompt engineering best practices for ChatGPT,” updated July 2026,
  accessed 2026-07-26:
  https://help.openai.com/en/articles/10032626-prompt-engineering-best-
- Google AI for Developers, “Prompt design strategies,” updated June 2026,
  accessed 2026-07-26:
  https://ai.google.dev/gemini-api/docs/prompting-strategies

### 4. “Project” is becoming a common product pattern, not one universal feature

The leading products increasingly provide a scoped workspace above an
individual conversation:

| Product | Current project-like pattern | What is shared/scoped | Important boundary |
|---|---|---|---|
| ChatGPT | Projects | Project chats, files and project instructions; memory behaviour depends on project setting, account and workspace | Project-only memory must be chosen for a new eligible project; default memory may reach beyond the project on some non-Enterprise plans |
| Claude | Projects | Project knowledge and project instructions are available across the project's chats; current chat search/memory can search within a specific project when available | Current documentation distinguishes shared project knowledge from conversation context; memory/search behaviour is plan- and rollout-dependent |
| Microsoft 365 Copilot | Copilot Notebooks | Curated files, pages, links, chats and notebook instructions ground the notebook | The notebook uses selected references rather than automatically accessing the user's whole OneDrive, email, Teams or the general web |
| Gemini | Notebooks, Gems, chat memory and branches | Notebooks provide a focused project space with sources, instructions and ongoing discussion; Gems hold reusable instructions; eligible accounts can also use past-chat memory | Notebook availability is currently account-dependent; Gems and personal memory remain different layers rather than one project feature |

The cross-tool concept is therefore:

> A project is a scoped home for an ongoing body of work. It can hold shared
> instructions and selected sources so several related chats do not each start
> from zero.

The class must not claim:

- that every product calls this a Project;
- that every chat inside a project automatically reads every other chat;
- that every file is always loaded in full;
- that project memory is the same as personal memory;
- that a workspace keeps itself accurate as source material changes; or
- that placing something in a project makes it the authoritative version.

Primary sources:

- OpenAI, “Projects in ChatGPT,” updated July 2026, accessed 2026-07-26:
  https://help.openai.com/en/articles/10169521-projects-in-chatgpt
- Anthropic, “What are projects?”, updated July 2026, accessed 2026-07-26:
  https://support.claude.com/en/articles/9517075-what-are-projects
- Anthropic, “How can I create and manage projects?”, accessed 2026-07-26:
  https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
- Anthropic, “Use Claude's chat search and memory to build on previous
  context,” updated 2026-07-25, accessed 2026-07-26:
  https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context
- Microsoft, “How Microsoft 365 Copilot Notebooks works,” accessed 2026-07-26:
  https://support.microsoft.com/en-us/Microsoft-365-Copilot/how-microsoft-365-copilot-notebooks-works
- Google, “Find & manage your recent chats in Gemini Apps,” accessed
  2026-07-26:
  https://support.google.com/gemini/answer/13666746
- Google, “How to use Gems,” accessed 2026-07-26:
  https://support.google.com/gemini/answer/15236405
- Google, “Create and use notebooks in Gemini Apps,” accessed 2026-07-26:
  https://support.google.com/gemini/answer/16972047

### 5. Long context is capacity, not guaranteed attention or correct process

Current products can hold or retrieve far more material than earlier chat
interfaces. Some can summarize older conversation turns automatically or use
retrieval to select relevant project knowledge. That reduces friction, but it
does not make organization irrelevant.

Anthropic's current documentation explicitly describes the context window as
working memory, notes that longer conversations use more capacity/usage and
recommends projects for recurring information. Google's file guidance warns
that large inputs can still cause missed details or connections even when they
fit within a large context window.

Teaching implication:

> “It fits” is not the same as “the model will weight every detail correctly,
> recover every old decision or know which version is authoritative.”

Primary sources:

- Anthropic, “How do usage and length limits work?”, updated July 2026,
  accessed 2026-07-26:
  https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work
- Google, “Upload and analyse files in Gemini Apps,” accessed 2026-07-26:
  https://support.google.com/gemini/answer/14903178

## The universal mental model

Teach seven layers. Product names can be mapped onto these layers afterward.

| Layer | Job | Good content | Common mistake |
|---|---|---|---|
| Workspace/account environment | The broad personal, company or school environment governing people, ownership, policies, permissions, data controls, available tools and many projects/chats | the correct identity, employer boundary, member access, admin policy, approved apps and retention/security controls | treating “workspace” as a synonym for one project or putting company work in a personal environment |
| Personal setup | Reusable preferences about the person | tone, accessibility needs, recurring preferences | storing confidential case details or treating preferences as project truth |
| Project/workspace | Scoped home for one ongoing body of work | project instructions, canonical sources, related chats, current reference files | creating one enormous “everything” project or assuming all content is always consulted |
| Working mode | How the user and AI will handle the next job: conversational Chat or longer-running Work/Cowork/agent execution | Chat for questions, discovery and tight conversational iteration; Work/Cowork for multi-step deliverables across sources, files, tools or apps | treating Work/Cowork as a fancier prompt box, or assuming it replaces the Project that supplies the job's home and context |
| Task/chat/session | One coherent objective or workstream in the chosen mode | the active task, relevant decisions, exploration, execution and corrections | using one thread for unrelated jobs or allowing two sessions to own the same final decision |
| Turn/message/control | The next conversational move or intervention | a question, correction, missing fact, decision, approval or bounded next action | drip-feeding essential requirements after final production has already begun or approving an action without checking its scope |
| Artifact/source of truth | The durable result and current state | approved brief, document, design, code, decision log, status and next step | treating the conversation's latest confident sentence as the final artifact |

The word **workspace** is especially dangerous because vendors use it for
different layers. In ChatGPT Business/Enterprise, a workspace is the broad
organizational environment with its own members, settings and resources.
Microsoft also uses “workspace” descriptively for narrower Loop and Notebook
surfaces. Teach the learner to ask what the container governs instead of
trusting the noun:

- Does it govern the account, people, policies and data ownership? Treat it as
  the broad workspace/environment.
- Does it gather sources and related conversations for one job? Treat it as a
  project-like workspace, even if the product calls it a notebook.

Current source:

- OpenAI, “Managing members, seat types, and roles in ChatGPT Business,”
  updated July 2026, accessed 2026-07-26:
  https://help.openai.com/en/articles/8542216

The class's core line should be:

> **Chat naturally. Work deliberately.**

The learner does not need to stop typing like herself. She needs to recognize
when the conversation has produced enough understanding to create or refresh
the working brief.

Chat and Work/Cowork are not competing storage systems. They are working modes.
A Project or Notebook is the scoped home that may supply instructions, sources
and continuity to either mode. Current ChatGPT, for example, lets a user start
either Chat or Work from a Project using that Project's context; current Claude
places Chat and Cowork in one home alongside shared Projects and artifacts.

Use the portable labels in the universal lesson and show the current product
names during demonstrations:

- **Chat:** fast conversational assistance for questions, search, brainstorming,
  explanation, discovery, drafting and tightly controlled revision.
- **Work/Cowork/agent mode:** longer multi-step work that may research, analyse,
  create or edit deliverables, use files/tools/apps, continue remotely or on a
  schedule, and pause for questions, direction or approval.

Work/Cowork increases the scope of execution, not the scope of permission. It
does not silently authorize sending, publishing, purchasing, deleting,
disclosing private data or accepting consequential changes.

Current sources:

- OpenAI, “ChatGPT Work and Codex,” updated 2026-07-26, accessed 2026-07-26:
  https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- Anthropic, “Release notes,” July 7, 2026 entry, accessed 2026-07-26:
  https://support.claude.com/en/articles/12138966-release-notes

## Recommended working cycle

### 1. Orient

Name the job, intended outcome and why it matters. For a one-off low-risk
question, this may be one sentence.

### 2. Discover

Use normal back-and-forth conversation. Add missing facts. Ask the AI to
interview you when your own thinking is not ready. Explore alternatives.

### 3. Brief

Before substantial execution, ask for or write a current brief containing:

- exact objective;
- audience/user;
- inputs and authoritative sources;
- decisions already made;
- constraints and exclusions;
- expected output;
- definition of done; and
- facts or choices still unknown.

Do not assume that ten scattered corrections equal one unambiguous assignment.

### 4. Execute in bounded stages

Keep the same chat while the stage depends on the same brief and artifact.
For complex work, use explicit phases such as research → synthesis → draft →
review → final verification. A new message can advance the stage without
creating a new chat.

### 5. Review

Use the same chat for ordinary revision where the accumulated decisions help.
Use a clean chat for an independent or blind review when inherited assumptions
would bias the critique. Give that reviewer the original brief and the
candidate artifact, not the writer's defence of it.

### 6. Checkpoint

Save material decisions, the current artifact, status and next action outside
the conversation or in the project's durable files/pages. The chat may explain
the work; it should not be the only place where the work exists.

### 7. Reset deliberately

Start a new chat when the work has crossed a real boundary. Bring a concise
handoff rather than asking the new chat to infer the project from fragments.

## Decision rules — stay, branch, start fresh or create a project

### Choose Chat when

- the user wants a quick answer, explanation, search, brainstorm or comparison;
- the assignment is still being discovered through conversation;
- the output is small and can be drafted or revised directly in the exchange;
- the user wants tight turn-by-turn control;
- no substantial work across files, tools or connected apps is required; or
- the user is deciding what should be delegated before starting execution.

### Choose Work/Cowork/agent mode when

- the user wants a finished multi-step deliverable rather than only advice;
- the task requires research or analysis across several sources;
- files, folders, apps, connectors or tools must be used;
- the work may take long enough to benefit from visible progress, questions,
  checkpoints or direction changes;
- the task should run remotely, repeat, follow a schedule or monitor for
  changes where the product supports it; or
- consequential actions need explicit review and approval during execution.

Do not move a task into Work/Cowork merely because it feels important. Choose
the mode based on what the AI must *do*. A thoughtful strategic conversation
may belong in Chat; a routine but multi-file production job may belong in
Work/Cowork.

### While the model is working — finish, queue, steer or stop

Some current products let a user send another message while work is still in
progress. The exact controls differ. Codex currently distinguishes **Steer**,
which adds a message to the active run, from **Queue**, which holds it for the
next run; other chat products may expose only stop/cancel followed by an
ordinary new message. Teach the decision, then demonstrate the available
button.

| Choice | Use it when | Do not use it merely because |
|---|---|---|
| Let it finish | The assignment is still correct and the new thought does not affect the current result | Waiting feels passive |
| Queue for next | The thought belongs after the result: explain a choice, create another format, make a second deliverable, explore a related idea or ask a non-blocking follow-up | The information would make the current work materially wrong |
| Steer the current run | The work is salvageable, but it needs a missing fact, corrected constraint, current source, narrower boundary or changed priority now | The new thought is an unrelated next task |
| Interrupt/stop | The premise is wrong; the model is using the wrong file/account/audience; a privacy, permission, spending or external-action boundary is at risk; continuing will create substantial throwaway work; or the requested action must not happen | The model's wording is not yet polished or it has not reached the part the user cares about |

For a **question**, use its consequence rather than its punctuation:

- “Why did you choose that source?” can usually queue until the current result.
- “Did you use the approved source or are you searching the public web?” should
  steer now because the answer may change whether the current work is valid.
- “Are you about to send this?” should interrupt if sending was not authorized.
- “Can you turn this into slides afterward?” belongs in the queue.
- “Stop—the audience is customers, not our internal team” should interrupt or
  steer immediately because the governing assignment is wrong.

After an interruption, do not resume with only the final correction. Restate
the corrected objective and the important unchanged constraints so the next run
has one coherent assignment. If the stopped run changed files, external state
or a shared artifact, inspect and checkpoint the partial state before
continuing.

Current OpenAI/Codex source:

- OpenAI, “Prompting — Steering and queuing,” current Codex manual, fetched
  2026-07-26:
  https://learn.chatgpt.com/docs/prompting#steering-and-queuing

### Keep using the same chat when

- the objective and main artifact are unchanged;
- the next step depends on decisions or examples already established;
- the user is still clarifying the same assignment;
- feedback is revising the current draft rather than creating a new job;
- the conversation is still easy to summarize accurately; and
- the current direction is sound.

### Start a new chat within the same project when

- a related but distinct deliverable or workstream begins;
- an independent, blind or adversarial review is needed;
- an alternative direction should be explored without overwriting the main
  line of work;
- the existing chat is anchored to an early misunderstanding and repeated
  corrections are not recovering it;
- the thread has accumulated unrelated material and can no longer be
  reverse-briefed cleanly;
- a different specialist role or task-specific instruction set is needed; or
- the current stage is complete and the next stage benefits from a clean
  handoff.

The new chat should receive:

- the current brief;
- relevant sources/files;
- decisions and non-negotiables;
- the exact task for this chat;
- what it may and may not change;
- the expected output; and
- where its result returns.

### Branch when

- the product supports branching;
- the user wants to explore “what if?” from a specific point;
- the original line must remain intact; and
- the branch will eventually be compared and reconciled.

A branch is an alternative line, not a second source of truth.

### Create a project/workspace when

- the work will continue across more than one sitting;
- the same instructions or sources will be reused;
- several related chats have different bounded jobs;
- the user needs one place to find current files and decisions;
- the work has a stable audience, objective or data boundary;
- a collaborator needs the same scoped source set; or
- repeated re-explanation has become a tax.

### Use or switch the broad workspace/account environment when

- moving between personal and company/school work;
- the organization, data owner, administrator or retention policy changes;
- different people, roles, billing or tool permissions apply;
- the work requires an employer-approved environment or connected company
  sources; or
- the user needs to keep personal memory, files and chats isolated from
  organization-controlled material.

Do **not** create or switch a broad workspace merely because a new deliverable
starts. That usually calls for a project or chat. Before merging a personal
environment into an organization-controlled workspace, read the exact
ownership and reversibility terms; current ChatGPT Enterprise documentation,
for example, says a required merge may be permanent.

### Create a separate project when

- the objective, audience or owner is materially different;
- standing instructions would conflict;
- sources or approved versions must not mix;
- confidentiality, client, employer or permission boundaries differ;
- collaborators should have different access; or
- results must be maintained and evaluated independently.

### Do not create a project merely because

- the user asked one disposable question;
- a topic is interesting but has no ongoing work;
- folders feel productive;
- every chat deserves a category; or
- the product offers the button.

Organization has a maintenance cost. A project should remove repeated work or
protect a real boundary.

## Recommended masterclass architecture

### The LAiDIES teaching method

The product promise is not “we mentioned the feature” or “we showed where the
button is.” Many learners do not know how to translate an AI product's settings
and surfaces into a useful way of working. Each class in this sequence should
therefore combine the durable mental model with a real, current setup and a
tested result.

Every class should:

1. **Start with the recognizable frustration.** Use the question the learner
   would actually ask, not the product's feature name.
2. **Show the real interface.** Record the current product, account/plan,
   surface and checked date. Point to the actual control rather than describing
   a fictional universal menu.
3. **Explain what the control changes.** Separate what is saved, what is
   supplied to the current model, what is merely available for retrieval and
   what remains outside the tool's view.
4. **Make one meaningful choice.** Do not click through default settings
   without judgment. Explain why this job belongs in Chat or Work/Cowork, in
   this chat or project, in memory, in an instruction field or nowhere in the
   product.
5. **Build one recognizable setup.** Use a safe, realistic ongoing job rather
   than a toy weather or recipe example.
6. **Test the setup.** Open the appropriate chat, run a controlled task and
   inspect whether the expected instruction, source or boundary actually
   affected the result.
7. **Show the common failure beside it.** Let the learner see the difference
   between scattered instant messages and a current brief, or between several
   loose chats and a scoped project.
8. **Protect the learner.** Name account, privacy, permission, retention and
   confidential-data boundaries at the exact moment they matter.
9. **Give her the portable principle.** Product buttons will change. The
   learner should still know how to recognize conversational Chat,
   Work/Cowork/agent execution, a project/workspace, personal memory, standing
   instruction, source and durable artifact in another tool.
10. **Leave a usable output.** The learner finishes with a project brief,
    project structure, handoff, decision tree or tested setup—not only notes
    about the video.

11. **Show what changed.** Separate the older chat-only mental model from the
    current product. Do not repeat advice such as “every new chat is a
    stranger,” “the model only knows this thread” or “start over after a fixed
    number of messages” when current memory, project, retrieval and automatic
    context features make those claims false or product-dependent.

The LAiDIES tone should make the learner feel accompanied, not remediated. Show
the easy mistake without portraying the user as foolish: the interfaces invite
instant-message behaviour and often hide the underlying boundaries. The class
reveals the structure the product did not make obvious.

Use narration, cursor emphasis, zoomed interface details, colour-coded context
cards and before/after task results. Keep exact interface footage modular and
dated so it can be replaced when a vendor changes a label or menu without
discarding the durable explanation.

### Masterclass promise

**Working title:** *Get the Best Out of Your AI Tool — the LAiDIES Masterclass*

The learner brings one safe, recognizable ongoing job and carries it through
the complete pathway. By the end, she has not merely watched features. She has
selected the correct environment, configured useful defaults, chosen Chat or
Work/Cowork deliberately, built a scoped project, organized purposeful
sessions, supplied trustworthy sources, controlled active work, reviewed the
output and saved a reusable working system.

The masterclass should be delivered as short visual lessons inside one
coherent pathway. This preserves the SUNNYVAiLE High single-topic teaching
standard while giving the learner one satisfying start-to-finish
transformation.

### Lesson 1 — Know Where You Are

**Question:** “Am I in my personal account, my company environment or the wrong
place entirely?”

Show account/workspace switching, ownership, plan/admin controls, available
tools and the personal-versus-company data boundary. The learner chooses the
correct environment for her project before uploading or connecting anything.

### Lesson 2 — Set It Up Once

**Question:** “What should I configure so I stop starting from zero?”

Show personal instructions, memory, privacy/data controls and safe preferences.
Distinguish what the learner writes, what the product remembers and what should
never be stored as standing personal context. Reconcile with the existing
Basics memory/custom-instruction/permission rows rather than duplicating them.

### Lesson 3 — Choose Chat or Work/Cowork

**Learner question:** “Do I need an answer, or do I want the AI to take on the
job?”

**Objective:** The learner can choose between conversational help and agentic
execution based on the work required, then place either mode inside the correct
Project when the job needs an ongoing home.

Show the same realistic assignment handled two ways. In Chat, the learner asks
questions, explores choices and tightens the brief. In Work/Cowork, the learner
supplies the resulting brief and permits a bounded multi-step task across the
needed sources or files. Keep the Project, source set and durable artifact
visible so the learner can see that the mode changed but the job's home did
not. Demonstrate progress, a clarifying question, a direction change and one
important-action approval.

**Learner leaves with:** a Chat / Work-Cowork decision card and an explicit
action-and-approval boundary for the real project.

**Misconceptions to resist:**

- “Work/Cowork is just a smarter model.”
- “Every important question should use agent mode.”
- “A Project and Work/Cowork are the same thing.”
- “If it can act, it has permission to do anything needed.”
- “Longer-running means autonomous without supervision.”

### Lesson 4 — From Chatting to Working

**Learner question:** “Why can I not just keep messaging it like a friend?”

**Objective:** The learner can use conversational discovery without allowing
piecemeal instructions, early assumptions or a sprawling thread to govern
important execution.

**Required visual sequence:**

1. A fast “then versus now” shows the 2025 chat-only mental model beside a
   current workspace with memory sources, Projects, branches, artifacts and
   Work/agent controls.
2. An instant-message-style exchange begins naturally.
3. The model produces an early draft before the whole job is known.
4. The user adds correction after correction; the early interpretation remains
   visible underneath.
5. The conversation pauses and becomes a current brief.
6. The exact same work is executed from the brief in bounded stages.
7. A checkpoint saves the decision, artifact and next step outside the chat.
8. The model begins a bounded task while four new messages appear. The learner
   chooses one to queue, one to steer, one that justifies stopping and one that
   should not be sent yet.
9. A decision screen demonstrates stay / new chat / clean review / project.

**Learner leaves with:** a one-page working brief and a tested decision rule
for letting work finish, queuing, steering, stopping, resetting or opening a
clean review chat.

**Application:** Given six scenarios, the learner chooses to stay, start fresh,
branch, open a clean review or create a project, and explains why.

**Misconceptions to resist:**

- “Natural conversation is bad.”
- “One giant perfect prompt is the only professional method.”
- “Every follow-up weakens the result.”
- “Every new thought deserves an immediate interruption.”
- “A question is automatically harmless because it is not phrased as an
  instruction.”
- “A long context window guarantees every decision remains active.”
- “Starting a new chat automatically fixes a bad brief.”

**Rewind Era analogy:** An instant-message window is where the conversation
happens; the production binder is where the assignment, approved decisions and
current version live.

**Analogy limit:** Human friends may remember shared history and understand
social implication in ways an AI product does not. Products may also supply
memory, retrieval and project context to a new chat, so “new window equals
total stranger” is not universally true.

### Lesson 5 — Give the Work a Home

**Learner question:** “When should I create a Project, and what belongs inside
it?”

**Objective:** The learner can create an appropriately scoped project,
distinguish it from a chat and personal memory, organize several purposeful
chats inside it and keep one durable source of truth.

**Required visual sequence:**

1. Three unrelated chats repeatedly receive the same background.
2. Relevant instructions and sources move into one project/workspace.
3. Separate research, drafting and review chats use the same scoped home.
4. One chat attempts an unrelated job and is moved out.
5. A source file changes; the current version is explicitly replaced and
   rechecked.
6. The project boundary is compared across ChatGPT, Claude, Gemini and
   Microsoft without pretending the interfaces are identical.

**Learner leaves with:** one safely scoped project containing shared
instructions/sources, purposeful chat lanes, a current artifact and a named
place for decisions and next actions.

**Application:** The learner organizes a realistic ongoing project into:

- project purpose;
- shared instructions;
- sources/files;
- main work chat;
- optional research/review chats;
- current artifact;
- decision/status record; and
- privacy/access boundary.

**Misconceptions to resist:**

- “Project means every chat knows everything.”
- “Every file is included in every answer.”
- “Project memory and personal memory are the same.”
- “A project automatically reconciles contradictory decisions.”
- “A project replaces backups, version control or verification.”
- “One project for my whole life is efficient.”

**Rewind Era analogy:** A Trapper Keeper subject section holds the standing
directions and relevant papers; individual notebook pages are the separate work
sessions.

**Analogy limit:** Digital project systems may retrieve, summarize or exclude
material dynamically; a physical binder's visible contents do not model those
selection rules.

### Lesson 6 — Give It the Right Stuff

**Question:** “What can it actually see, and which source is it using?”

Show files, project sources, connected apps and retrieval receipts. Test a
controlled fact with and without the intended source. Teach “available” versus
“actually used,” current versus stale, personal versus company-approved access,
and when web research is still required. Reconcile with the existing
Basics files/connectors classes.

### Lesson 7 — Finish Like a Professional

**Question:** “How do I know this is the right result—and how do I keep it?”

Move the useful result into its durable artifact, check it against the brief,
run a clean review when appropriate, record decisions/version/status and create
a handoff or next action. The learner leaves able to resume in a new chat or
another supported tool without relying on the transcript as the only record.

### Masterclass take-home kit

The completed pathway produces:

- workspace/account choice card;
- safe personal instruction/profile;
- Chat / Work-Cowork mode card with action-and-approval boundary;
- one-page project brief;
- project/notebook structure;
- main / research / review chat map;
- finish / queue / steer / stop decision card;
- source and permission checklist;
- current artifact plus decision/status record; and
- handoff prompt for continuing in a new chat or tool.

## Relationship to existing LAiDIES material

This is a missing workflow layer, not a replacement for prompting/context
content:

- Episode 2 / Briefing 101 teaches how to state a good assignment.
- `basics-current-context` teaches what information may be available in one
  conversation.
- `basics-saved-vs-in-the-room` separates history, context and memory.
- **Lesson 3** adds the missing Chat versus Work/Cowork mode decision.
- **Lesson 4** teaches how to manage the *process* across conversational
  turns and task stages.
- The existing `basics-projects` row should be reconciled and expanded into
  **Lesson 5**, rather than duplicated.
- A later one-page LIBRAiRY reference may hold the decision tree and handoff
  checklist after the classes exist.

The current `basics-current-context` class should not absorb the new workflow
lesson. Context capacity is only one reason chat practice matters. The stronger
lesson includes early commitment, task drift, competing artifacts, clean
review, handoffs, project scope and authoritative outputs.

## Freshness and verification requirements

The universal class may be durable, but its product demonstrations are
volatile.

- Recheck each vendor's project, memory, chat-search, branching and temporary
  chat documentation before scripting and again before filming.
- Verify interface paths in the actual available product/account, not only in
  help-centre copy.
- Label plan, region, account and workspace dependencies.
- Keep vendor screenshots modular so one interface change does not require a
  complete re-edit.
- Never teach the presence of a feature as proof that it retrieves all relevant
  information correctly.
- Use recreated, non-sensitive example projects and chats.

## Recommendation

Approve one **Get the Best Out of Your AI Tool** masterclass pathway made of
seven short visual lessons:

1. **Know Where You Are** — account/workspace and ownership.
2. **Set It Up Once** — personal instructions, memory and controls.
3. **Choose Chat or Work/Cowork** — conversation versus agentic execution.
4. **From Chatting to Working** — task structure and live conversation control.
5. **Give the Work a Home** — project/notebook and multiple chats or work runs.
6. **Give It the Right Stuff** — sources, files, connectors and retrieval.
7. **Finish Like a Professional** — verification, artifacts, decisions and
   handoff.

Reuse and reconcile the current Basics rows wherever they already own a
lesson's mechanism. Add the missing workflow and integration material rather
than producing seven duplicate lectures.

Do not make “one chat versus ten” the title or governing structure. It is a
recognizable example of the learner's uncertainty, not the actual decision
rule. The durable decision is:

> Use Chat to discuss the job and Work/Cowork to execute a bounded multi-step
> job. Keep one coherent objective in each session. Keep one ongoing body of
> work in a project. Use the correct workspace for the people, ownership and
> policies. Keep the approved truth in a durable artifact.
