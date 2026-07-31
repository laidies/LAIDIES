# NewsStand → Learning System intake: agent security and the sandbox incident

**Status:** SPECIFIED — CONCEPTS 101 LOCAL SUCCESSOR BUILT; SURFACE HANDOFFS OPEN  
**Trigger:** Ali asked that the OpenAI/Hugging Face incident become this week's
NewsStand coverage, that `sandbox` be explained in Concepts 101, and that every
other useful learning destination be identified.  
**Evidence date:** 2026-07-28  
**Canonical concept owner:** Learning System & Concepts Director  
**Durable public treatment owner:** LIBRAiRY / Concepts 101  
**Current-event owner:** NewsStand  

## The ruled content relationship

The incident is a dated case. It does not become the definition.

- **Concepts 101** explains the durable mental model: sandbox, permissions,
  least privilege, monitoring and independent stopping are different safety
  jobs.
- **The Breaking** states the verified new event in one digestible line.
- **The Daily News** explains what changed, why it matters and what remains
  disputed or unknown.
- **The Weekly** reconstructs the incident and applies the durable mental model
  to the full chain.
- **The Tribune** makes a broader sourced argument about AI security,
  accountability and the open/closed AI debate.
- **SUNNYVAiLE High** should teach a distinct practical skill only; it must not
  become another explanation of the same definitions.

## Concept dispositions

| Concept | Ruling | Durable home | Distinct next treatment |
|---|---|---|---|
| Sandbox | **EXTEND** | Concepts 101 | Explain enforced boundary vs written instruction, plus analogy limit |
| Least privilege | **EXTEND** | Concepts 101 agent/sandbox cluster | High permissions practice: identify and remove unnecessary access |
| Trajectory monitoring | **EXTEND NEXT** | Concepts 101 agent/sandbox cluster | Weekly applies it to the sequence of actions in the incident |
| Independent stop / kill switch | **EXTEND NEXT** | Concepts 101 agent/sandbox cluster | High exercise distinguishes monitoring from authority to halt |
| Reward hacking | **EXTEND NEXT** | Concepts 101 evaluation cluster | Tribune/testing explainer shows how a score can improve while the real job fails |
| Open, open-weight, source-available and closed AI | **CREATE CONCEPT CLUSTER** | Concepts 101 or a later Concepts 101 chapter | Tribune applies the distinctions to security, scrutiny, access and accountability |

`Sandbox` is now implemented in the local Concepts 101 source and rendered
book. The other rows are routed work, not silently approved copy.

## Surface audit

### Concepts 101 — BUILD LOCAL SUCCESSOR

Add `Sandbox — a working room with real walls` after Agentic AI. It must:

1. define the technical boundary in plain language;
2. distinguish instruction, permission, sandbox, monitoring and stopping;
3. introduce least privilege and blast radius;
4. state that every permitted service, credential and network path is another
   possible door; and
5. use the incident as a dated example without turning the example into the
   definition.

### Vocab 101 — DECLINE A SEPARATE PUBLIC ENTRY

Vocab has already been consolidated into Concepts and is not a shelf. The
short `Sandbox` lookup belongs in the Concepts 101 quick reference. Do not
revive a second Vocab source.

### NewsStand Weekly — UPDATE, THEN INDEPENDENTLY REVIEW

The existing draft at
`operations/drafts/openai-hugging-face-incident-2026-07-24/weekly-deep-dive.md`
already has the correct incident job. It requires a publication-day source
recheck and incorporation of OpenAI's July 28 update before admission. It
remains a draft; Concepts work does not approve or publish it.

### Tribune — CREATE A BROADER AI-SECURITY ARGUMENT

**Working title:** *Who Keeps AI Safe When It Can Act?*

**Deck:** The sandbox breach has reopened the argument about open and closed
AI. The labels matter—but neither one tells you, by itself, whether a system is
safe, accountable or useful.

**Reader job:** understand the major layers of AI security and evaluate claims
about open versus closed systems without accepting a false two-team story.

**Governing template — do not improvise a replacement outline:**

- Edition contract:
  `operations/product-stewards/newsstand/subproducts/tribune.md`
- Public story schema and approved example:
  `content/newsstand-stories.js`, story
  `label-is-not-a-truth-detector`
- Field map:
  `thread`, `thread_subtitle`, `thread_entry`, `headline`, `the_story`
  (**THE ARGUMENT**), `laidies_read` (**THE LAiDIES READ**),
  `what_this_means` (**WHAT THIS MEANS FOR YOU**), `cocktail_party`,
  `watch_fors`, `closing_note`, `class_notes`, `sources`, `aidb_credit`,
  `tags`, `saint_lane`, `badge`
- Teaching and evidence gate:
  `operations/CONTENT-PUBLISHING-STANDARD.md`

The article must therefore be drafted in this exact order:

1. **THE ARGUMENT** — establish the factual substrate, the thesis, strongest
   evidence, strongest credible counterargument, assumptions and uncertainty.
   The OpenAI/Hugging Face incident opens the argument; it is not the whole
   argument.
2. **THE LAiDIES READ** — take and defend the LAiDIES position: “open” and
   “closed” describe access and governance choices, not a safety score.
3. **WHAT THIS MEANS FOR YOU** — give the reader the practical test: What is
   actually open? Who can inspect and change it? Who monitors deployment? Who
   can revoke access or stop it? What evidence appears after failure?
4. **THE COCKTAIL PARTY EXPLANATION** — one short, accurate explanation a
   non-technical reader could repeat without flattening the issue.
5. **WATCH-FORS** — dated evidence that could strengthen, weaken or change the
   case: OpenAI's promised technical report; public incident chronology;
   independent scrutiny; restrictions on dangerous capability; patching,
   monitoring and disclosure practice.
6. **CLOSING NOTE** — return to the argued principle and the accountable human
   decision, not a generic summary.
7. **CLASS NOTES** — link the durable learning path: Concepts 101 `Sandbox`,
   the open/open-weight/source-available/closed concept cluster, the permissions
   practice and the incident Weekly.
8. **SOURCES** — primary/official evidence first; disputed or interested-party
   claims require independent scrutiny before acceptance.

The supporting research must still cover the security layers, precise model
access labels, strongest cases and failure modes on both sides, and Hugging
Face's reported defensive use of a locally run open-weight model. Those are
substance requirements inside the template, not substitute headings.

**Boundary:** This is not the existing Tribune draft's narrower argument about
reward hacking and outcome-only management. The two ideas may become a paired
Tribune package only if NewsStand proves they are complementary rather than
duplicative.

### SUNNYVAiLE High — EXTEND, DO NOT CREATE BY DEFAULT

Extend `basics-permissions` with one controlled practice:

> Given an agent with access to files, a calendar, email and the internet,
> identify what is merely instructed, what is technically enforced, which
> permissions are unnecessary, what must be monitored and who can stop it.

The observable skill is reducing the reachable surface and explaining the
remaining control layers. A separate class is justified only if that practice
cannot fit without crowding the existing permissions lesson.

### New LIBRAiRY book — DECLINE FOR NOW

A separate AI-security book would duplicate Concepts 101 before the concept
cluster is complete. Reopen the book opportunity only when there is enough
distinct procedural material for a field guide: threat models, sandbox design,
credential handling, monitoring, incident response and reader exercises.

### Episode 4 — LINK LATER; DO NOT REWRITE THE RELEASE

Episode 4 introduces agentic AI and the importance of permissions. Preserve
the released episode. A future learning wrapper may link to Concepts 101 and
the Weekly; it must not retroactively claim that the episode taught sandbox
architecture.

## Primary evidence

- OpenAI, “OpenAI and Hugging Face partner to address security incident during
  model evaluation,” updated July 28, 2026:
  https://openai.com/index/hugging-face-model-evaluation-security-incident/
- Hugging Face, “Security incident disclosure — July 2026,” July 16, 2026:
  https://huggingface.co/blog/security-incident-july-2026
- OpenAI, “Building a safe, effective sandbox to enable Codex on Windows,”
  May 2026:
  https://openai.com/index/building-codex-windows-sandbox/
- Open Source Initiative, “The Open Source AI Definition — 1.0”:
  https://opensource.org/ai/open-source-ai-definition

## Acceptance and next actions

1. LIBRAiRY verifies the Concepts 101 successor in the actual reader.
2. Learning System specifies the remaining concept rows and misconception tests.
3. NewsStand updates and independently reviews the Weekly against the July 28
   evidence.
4. NewsStand performs complement review between the existing reward-hacking
   Tribune and the broader AI-security/open-closed brief.
5. Classes decides whether the controlled practice fits
   `basics-permissions`; no class is commissioned by this intake.

No NewsStand publication, class production, episode edit or public deployment
is implied by this record.
