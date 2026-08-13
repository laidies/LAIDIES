# Vibe coding without knowing code — durable-answer routing packet

**Idea receipt:** `IIR-20260813-019`
**Captured:** `2026-08-13` America/Vancouver
**Classification:** `MERGE → STRAIGHT ANSWERS / SPECIFICATION NEXT`
**Status:** `HANDOFF PREPARED — NO PUBLIC PROSE OR CONTENT COMMISSION`

## Ali's exact question and direction

LAiDIES should answer:

> What is vibe coding, and are there limitations to what I can make if I don't
> know any actual computer code?

The answer must be useful to a person who does not know programming syntax or
software-development jargon. It must neither gatekeep software creation nor
promise that an AI-generated application is safe, complete or maintainable
merely because it appears to work.

## Strongest misleading answer to prevent

“You can build anything now without learning code” confuses three different
outcomes:

1. making a prototype appear on a screen;
2. making a product work across ordinary and failure cases; and
3. operating something that other people can safely rely on over time.

AI has materially lowered the first barrier and can help with the second and
third. It has not erased the need to define the intended behaviour, test the
real result, protect data, control permissions, maintain dependencies, recover
from failure and know when qualified review is required.

## Proposed canonical answer job

Give a direct, durable answer that leaves the reader able to:

- explain vibe coding without knowing the term `LLM`, `IDE`, `API` or
  `repository`;
- distinguish casual full-vibe experimentation from human-led AI-assisted
  software development;
- identify what she can sensibly start building now;
- classify a project by consequence rather than by confidence or visual
  polish;
- name the additional safeguards required as accounts, personal data,
  payments, external integrations or public reliance enter the product; and
- ask the better next question: “Am I proving an idea, or operating a service
  that people will rely on?”

## Required causal explanation

The explanation should make this mechanism visible in ordinary language:

`describe intended behaviour → AI produces or changes instructions for the
computer → the computer runs those instructions → the person observes the
result → tests expose some mismatches → the person or AI repairs them`

The visible screen is only one outcome of the instructions. A button can look
correct while saving the wrong information, exposing private information,
failing on another phone, losing data after an update or becoming impossible
to repair later. Generated code is therefore closer to a draft implementation
than a proof that the product is correct.

## Risk ladder the answer must teach

### Lower consequence — reasonable place to begin

Examples include a private prototype, static information page, personal
calculator, simple quiz, throwaway experiment or local tool using
non-sensitive data. The reader still tests the result and keeps a recoverable
copy, but a failure is limited and reversible.

### More consequence — structure and review become necessary

Examples include a public website, saved user information, accounts, file
uploads, messages, external services, automations or a tool used repeatedly by
other people. Require explicit acceptance cases, failure cases, source control,
backups, permissions, logs, dependency review, accessibility checks, security
tests and a rollback route. A non-coder can direct and own this work, but
cannot safely substitute visual inspection for those controls.

### High consequence — qualified specialist involvement is part of the build

Examples include payments, medical/legal/financial decisions, children's data,
valuable private information, authorization between users, destructive
actions, regulated activity or any system whose failure could materially harm
someone. AI may assist, but independent security/domain review and accountable
operations are required. “The AI tested it” is not independent evidence.

## Minimum software literacy without a syntax course

Do not tell the reader she must first become a traditional programmer. Do tell
her that reliable ownership requires learning enough to reason about:

- the intended user, inputs, outputs and failure states;
- what information is stored, where it travels and who can access it;
- the difference between the visible page and the systems behind it;
- versions, recoverable changes and rollback;
- tests that can genuinely fail, including unfamiliar cases;
- logs, backups, costs, dependencies and service outages; and
- the point at which a specialist review is warranted.

AI can explain each concept and operate many of the tools. The owner still has
to require evidence that the complete result behaves as intended.

## Examples and LAiDIES connection

- **Non-work:** a private party-planning page is a reasonable first build. A
  public service that collects guests' addresses and dietary information adds
  privacy, access, deletion and reliability obligations even if both pages look
  equally simple.
- **Work:** a private prototype that reorganizes made-up project data is
  different from a workflow that reads real employee or client records and
  sends decisions into another system.
- **Behind the Build candidate:** LAiDIES itself can show the difference between
  an exciting early site that needed few revisions and a growing product with
  many connected pages, accounts, saved state, publications, deployments and
  owner workflows. The lesson is not that a non-coder should not build it. It
  is that complexity accumulated faster than the operating structure needed
  to verify and maintain it. Any public treatment must avoid private operational
  detail and pass Ali's exact Behind the Build review.

## Proposed product relationship

1. **Canonical content authority:** merge into the existing held
   _Straight Answers About AI_ corpus as one stable question/answer ID.
2. **Short discovery answer:** Visitor's Centre FAQ may show a compact direct
   answer and link to that exact canonical answer after the FAQ registry and
   route are admitted.
3. **Prominent presentation:** STRAiGHT TALK / the question-led NewsStand
   presentation may feature the same answer ID. It must not create a second
   answer canon or masquerade as current news.
4. **Practice:** the existing High/`Help!` route may later use a bounded
   exercise: classify a proposed build by consequence and name the evidence
   required before release.
5. **Behind the Build:** LAiDIES may supply one honest case study after its
   private/public boundary and final prose are independently admitted.

This relationship extends `IIR-20260808-017`; it does not create a new
publication, FAQ page, class or public route.

## Current source preflight — checked 2026-08-13

- Andrej Karpathy, **“Software Is Changing (Again)”**, AI Startup School,
  2025: primary practitioner context for natural-language software and the
  “everyone is now a programmer” framing.
  <https://www.youtube.com/watch?v=LCEmiRjPEtQ>
- GitHub, **“What Is Vibe Coding?”**, accessed 2026-08-13: distinguishes full
  vibe coding from human-led practice; describes rapid prototyping, review,
  testing, complexity, debugging and maintenance trade-offs. This is a vendor
  explanation, not neutral proof that its product solves those limitations.
  <https://github.com/resources/articles/what-is-vibe-coding>
- GitHub, **“Application card: GitHub Copilot Agents,”** accessed 2026-08-13:
  generated code may be inaccurate or insecure; commands may be destructive;
  outputs require review and testing; agent permissions and data flows matter.
  <https://docs.github.com/en/copilot/responsible-use/agents>
- OpenAI, **“Introducing Codex,”** accessed 2026-08-13: agent work is exposed
  through logs and tests for verification, while manual review and validation
  remain necessary before integration and execution. This is a vendor source
  and must not establish universal performance claims.
  <https://openai.com/index/introducing-codex/>

The eventual answer should add an independent software-security or standards
source when its exact claims are selected. Product capabilities, pricing,
permissions and deployment controls are volatile and require a current check;
the prototype-versus-operational-responsibility distinction is the durable
principle.

## Exact receiving-owner rulings required

- **Learning System:** accept/revise the risk ladder, causal mechanism,
  transfer examples and minimum-literacy outcome.
- **LIBRAiRY / Straight Answers:** accept/revise the canonical answer ID,
  scope, related-answer links, sources and freshness/correction triggers.
- **NewsStand:** accept/revise the STRAiGHT TALK presentation relationship;
  return `NO DATED NEWS FIT` unless a current event supplies a distinct story.
- **Visitor's Centre:** accept/revise one compact FAQ consumer after its
  question registry, deep-link and no-JS/failure contracts are admitted.
- **High / Classes:** merge or decline the proposed consequence-classification
  exercise without creating a duplicate beginner-coding course.
- **Platform / Privacy / Security:** verify the risk categories and the exact
  boundary for accounts, stored data, integrations, payments and high-impact
  uses.

## Movement trigger and authority truth

At the next collision-free Learning/Straight Answers owner cycle, reconcile
this packet with `IIR-20260808-017`, select one stable answer ID and commission
only the smallest representative Tier 1 answer. Public prose requires the
content-producer contract, current sources, real explain-back/unseen-transfer
evidence, independent semantic review and exact route/public verification.

No public answer, FAQ row, NewsStand item, class, Behind the Build story, route,
visual, deployment or publication was created. The current NewsStand Daily
recovery objective remains unchanged.
