# LCWO-002 access-labels source packet

**Status:** CURRENT PRIMARY-SOURCE PACKET / INTERNAL INPUT ONLY / NO CANDIDATE
OR PUBLIC AUTHORITY

**Evidence date:** 2026-09-06 (America/Vancouver)

**Work order:** `LCWO-002`

**Destination:** AI Fundamentals 101, Chapter 2, section 2.5

**Accepted manuscript SHA-256:**
`721522ed4ff94760c7e5d62beef64a6299286efc1d7a7b90e6262a4ca4091eb9`

This packet supplies current concept boundaries and source evidence for the
four labels in LCWO-002: `open`, `open-weight`, `source-available` and
`closed`. It does not supply reader-facing prose. It does not admit a
candidate, amend the accepted manuscript, authorize drafting or satisfy any
Library, accuracy, editorial, experience, release or public gate.

## The governing distinction

The four terms must not be taught as positions on one neat ladder. Before
applying a label, separate three questions:

1. **Technical access:** which artifacts can a person actually obtain: model
   weights, architecture, inference code, training code, training-data
   information or documentation?
2. **Permission:** what do the applicable licence and terms permit a person to
   use, study, modify and redistribute? What restrictions and obligations
   remain?
3. **Delivery:** does access arrive through a public download, a gated or
   vetted release, a provider-hosted API or interface, or no public access?

This separation is the minimum protection against the common but false
inference that “downloadable” means “open source,” or that “visible” means
“permitted to reuse.”

## Source-supported findings

### 1. Open Source AI

**Finding.** Under the Open Source Initiative's Open Source AI Definition
1.0, Open Source AI grants freedoms to use, study, modify and share the system
or component. For machine-learning systems, the preferred form for making
modifications includes sufficient training-data information, the complete
code used to train and run the system, and parameters such as weights, under
the terms specified by the definition.

**Bounded source excerpt:** “Use the system for any purpose and without having
to ask for permission.”

**Primary source:** Open Source Initiative, *The Open Source AI Definition*,
version 1.0.

URL: <https://opensource.org/ai/open-source-ai-definition>

Accessed: 2026-09-06.

Exact support: definition lines 16–22; preferred form lines 23–31; distinction
between models, weights and Open Source weights lines 33–40.

**Boundary.** This is OSI's standards definition. It is not evidence that every
company, researcher or jurisdiction uses `open source AI` identically. A later
candidate must attribute the definition rather than present the terminology as
universally settled.

### 2. Open-weight

**Finding.** The United States National Telecommunications and Information
Administration describes widely available model weights as weights released
openly to the public, including by download. Its report separately identifies
weights, code, training or fine-tuning data and documentation, which can be
made available through different channels and with different restrictions.
It also distinguishes public weights from provider-hosted access through an
API or web interface.

**Bounded source excerpt:** “whose model weights have been released openly to
the public”.

**Primary sources:** United States NTIA, *Dual-Use Foundation Models with
Widely Available Model Weights Report*, published 2024-07-30.

Glossary:
<https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/glossary>

Background:
<https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/background>

Report:
<https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report>

Accessed: 2026-09-06. Direct official HTML was retrieved for the quoted
glossary and background passages.

**Boundary.** `Open-weight` is a technical-access description: the trained
weights are publicly obtainable. It does not by itself establish access to
training data or training code, or unrestricted permission to use or
redistribute the weights. The exact licence and release terms remain separate
evidence.

### 3. Source-available

**Finding.** The Linux Foundation distinguishes source-available software from
open-source software: source may be publicly visible while the licence limits
how it may be used or distributed. It also warns that visible code without a
stated licence must not be assumed to be open source.

**Bounded source excerpt:** “just because the source code is available and you
can read it” does not make it open source.

**Authoritative source:** Linux Foundation, *Open Source License Best Practices
— Quick Reference Guide*, © 2025.

URL: <https://www.linuxfoundation.org/licensebestpractices>

Accessed: 2026-09-06.

Exact support: open-source rights and obligations lines 73–89;
source-available, use restrictions, closed source and no-licence warning lines
90–108. The guide says explicitly that it is a summary, not legal advice.

**Boundary.** This source defines a software-licensing distinction. Applying
`source-available` to AI is the LAiDIES adaptation below, not a quotation of a
universally accepted AI-model category.

### 4. Closed or closed-weight access

**Finding.** NTIA defines `limited access` as models that do not give access to
weights, source code or training data, and describes provider-controlled web
interfaces and APIs through which users submit inputs and receive outputs
without direct access to the weights. The Linux Foundation separately notes
that closed source may be unavailable in source form or viewable only under a
specific purchased licence.

**Bounded source excerpt:** “do not give access to model weights, source code,
or training data”.

**Primary and authoritative sources:** the NTIA report and Linux Foundation
guide above.

Accessed: 2026-09-06.

**Boundary.** `Closed` and `closed-weight` are useful shorthand, not one
complete legal category. They do not prove that nothing is documented, that
the model cannot be audited under controlled conditions, that the model is
safer or better, or that every component of the surrounding product is closed.

### 5. European Union legal context

**Finding.** Article 53(2) of the EU AI Act creates a limited exception from
the documentation and downstream-information obligations in Article
53(1)(a)–(b) for qualifying general-purpose AI models released under a free
and open-source licence, with public parameters including weights, architecture
information and usage information. The exception does not apply to
general-purpose AI models with systemic risk. It is not an exemption from all
AI Act obligations; the copyright-policy and training-content-summary duties
remain.

**Bounded source excerpt:** “access, usage, modification, and distribution of
the model”.

**Primary legal source:** Regulation (EU) 2024/1689, official EUR-Lex ELI.

URL: <https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en>

Accessed: 2026-09-06.

Exact support: Recitals 102–104 and Article 53(2). The official consolidated
PDF endpoint did not render consistently during this check, so the later
candidate must re-open the official current consolidation rather than infer
that the 2024 original text is the latest legal state.

**Boundary.** This is jurisdiction-specific legal context. It must not replace
the concept definition or be generalized into a claim about all countries.
It is not legal advice.

## LAiDIES AI-specific adaptation

The following is the Learning System's synthesis from the sources above. These
statements are not verbatim source definitions and must be presented as a
teaching framework, not attributed quotations.

| Label | Minimum plain distinction | What it does not establish |
| --- | --- | --- |
| `open` | Incomplete by itself. Complete it as `Open Source AI`, `open-weight`, `open access`, or name the exact available artifacts and permissions. | Which artifact is available; what the licence allows; whether access is public or gated. |
| `Open Source AI` | When explicitly attributed to OSI v1.0: use, study, modify and share freedoms plus the preferred modifiable form described above. | Universal agreement on the term; safety, quality, accuracy or zero operating cost. |
| `open-weight` | The trained weights are publicly obtainable. | Training-data or training-code access; unrestricted use or redistribution; full Open Source AI status. |
| `source-available` | Named source code is visible or obtainable, but absent or materially restrictive permission terms prevent it from qualifying as open source. | Access to model weights, training data or unrestricted permission to use, modify or distribute the code. |
| `closed` or `closed-weight` | The public does not receive named critical artifacts and generally uses provider-controlled access. | Zero transparency, zero documentation, safety, quality, or the legal status of every product component. |

### Relationships the later explanation must preserve

- A system can be both **open-weight** and **source-available** when its weights
  are downloadable and its separately named source code is visible, but the
  code's permission terms are absent or materially restrictive.
- An open-source or open-weight base model can sit inside a closed
  consumer-facing product.
- `Proprietary` describes ownership or licensing. It is not a dependable
  synonym for closed technical access.
- Openness can differ by component and stage. One label must not silently
  describe the model, training data, application code and finished product as
  though they share identical access and terms.

## Practical consequences to test, not promise

Public weights **can enable** local or private operation, independent testing,
offline use and reduced provider dependence and, where licence terms permit,
fine-tuning. They do not guarantee those outcomes: hardware, storage,
engineering skill, security work, licence compliance and other operating costs
may be substantial.

Provider-hosted closed-weight access **can enable** simpler setup and
provider-managed operation and updates. It can also create dependence on the
provider's pricing, availability, policies, data terms, permissions and model
changes. Those consequences require evidence for the exact product and
deployment; the label alone cannot establish them.

No candidate may reduce this concept to `open = good` and `closed = bad`, or
the reverse. Access and licensing are relevant to scrutiny, control and
accountability, but neither openness nor closure alone proves safety, quality,
accuracy or risk.

## Misconceptions the candidate must defeat

1. Downloadable weights automatically mean Open Source AI. **False.**
2. If source is visible, anyone may use, modify and redistribute it. **False;
   inspect the licence and terms.**
3. Open means free to run. **False; access price and operating cost are
   different questions.**
4. Closed means nothing is documented or reviewable. **False.**
5. A provider is simply `open` or `closed`. **False; classify an exact model,
   component, version and access route.**
6. Open models are automatically safer or more dangerous. **Unsupported
   without capability, safeguards, deployment and access evidence.**

## Dated provider illustrations

Provider examples are replaceable freshness examples, not durable definitions.
They must be kept outside the core definition and rechecked immediately before
candidate review and again on publication day.

### Current usable illustration: OpenAI gpt-oss

OpenAI's model card calls `gpt-oss-120b` and `gpt-oss-20b` open-weight models,
states that their weights are downloadable and identifies the Apache 2.0
licence plus a separate usage policy. OpenAI's current help page says they can
run on infrastructure controlled by the user or through hosting providers and
are not served through ChatGPT or the OpenAI API.

**Bounded source excerpt:** “open-weight reasoning models available under the
Apache 2.0 license”.

**Primary provider sources:**

OpenAI model card, published 2025-08-05:
<https://openai.com/index/gpt-oss-model-card/>

OpenAI help record:
<https://help.openai.com/en/articles/11870455-openai-open-weight-models>

Accessed: 2026-09-06.

This example demonstrates why provider-wide classification fails: one provider
can offer downloadable model weights and separate hosted products. It does not
establish that gpt-oss meets OSI's complete Open Source AI Definition; that
would require an artifact-by-artifact OSI assessment not performed here.

### Held illustration: Meta Llama

Meta's current Llama 4 materials call Scout and Maverick open-weight and bind
downloads to the Llama 4 Community License. The accepted manuscript's sentence
“When Meta releases Llama as open-weight” is too broad and undated. A later
candidate may use one exact Llama model only after accuracy review reads that
model's current licence, model card and access route on the candidate-review
date. This packet does not admit Meta/Llama as the example.

Current provider starting points, accessed 2026-09-06:

<https://ai.meta.com/blog/llama-4-multimodal-intelligence/>

<https://ai.meta.com/resources/models-and-libraries/llama-downloads/>

### Closed-weight illustration remains unselected

Do not retain the manuscript's undated statement that OpenAI offers GPT-4 as a
closed model. If the candidate needs a named closed-weight example, accuracy
review must bind an exact current model/version, current provider access
documentation and current evidence that public weights are not offered.
Otherwise use a provider-neutral worked example.

## Later candidate evidence and freshness contract

Before prose drafting, the Library producer contract must bind this packet and
the then-current content-quality registry. Before candidate review, accuracy
must produce an exact claim map that separates:

- durable definitions and their named authority;
- LAiDIES teaching synthesis;
- model/version-specific provider facts;
- practical consequences stated as possibilities rather than guarantees; and
- legal context limited to its jurisdiction and effective text.

Recheck the following **before independent candidate review and again on the
publication day**:

- the current version of the OSI Open Source AI Definition;
- the current official EU AI Act consolidation if EU legal context remains;
- every named model's licence, model card, available artifacts and access
  route; and
- every claim about local operation, fine-tuning, cost, privacy, provider
  dependence or API availability.

Re-open the packet earlier if OSI changes its definition, a cited law changes,
a provider changes a model licence/access route, or a NewsStand/source signal
identifies a material contradiction. A dated provider illustration that cannot
be freshly verified is removed or generalized; it never weakens the durable
definition.

The later independent accuracy review must begin with the exact prose and
current sources, not this packet's verdict. This packet is research input, not
proof that future wording is correct.

## Reader transfer requirement for the later candidate

Use a new model-card scenario in which weights are downloadable, source code is
visible under terms that restrict one class of use, the training dataset is not
supplied, and access is available both through local hosting and a commercial
API. Without being given the answer labels, the reader must be able to explain:

1. which labels apply and may overlap;
2. what is technically available;
3. what is legally permitted;
4. one practical benefit and one burden; and
5. which fact still needs verification.

An answer that says only “it is open source” fails the transfer check.

## Remaining Library extension binding

Library owns the actual extension. First, its producer preflight must bind this
packet, the current quality registry and the existing amendment mechanism; no
clarification entry or added prose exists before that contract passes. The
later candidate must use the existing
`rewind-amendments.json` mechanism, schema
`laidies-library-rewind-amendments.v1`; it must not create a second amendment
system.

After the producer contract passes, the candidate clarification entry must bind:

- immutable manuscript SHA-256
  `721522ed4ff94760c7e5d62beef64a6299286efc1d7a7b90e6262a4ca4091eb9`;
- Chapter 2 and the applicable reading mode or modes;
- an exact unique anchor at section 2.5's
  `**Open-weight vs closed models** — what you actually get` block;
- the exact added prose bytes; and
- a separate dated/provider-specific example treatment if a provider is used.

The builder must continue to require exactly one anchor match. Library then
binds the deterministic render, producer self-review, role-distinct semantic
and transfer review, accuracy/freshness review, Library experience review and
exact LCWO-002 release checks.

`READY_TO_DISPATCH` remains the canonical label for eligibility to assign the
work to producer preflight. It is not drafting authority. The old
`nextAction`/`nextTrigger` immediate-build prose and missing historical input
paths are stale; a valid current producer contract is still required before
any prose is drafted.

## Authority truth

This packet changes internal source readiness only. It creates no producer
contract, clarification entry, candidate prose, amendment, manuscript edit,
render, admission, release, deployment or publication. It grants no spending,
service, schedule, Ali, Library-owner, Control Room or public authority.
