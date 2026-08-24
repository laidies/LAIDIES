# Who’s Who in AI — claim and source packet

Status: RESEARCH COMPLETE FOR REPRESENTATIVE PROOF
Reviewed through: 2026-08-24
Owner: LAiDIES Library with independent source review

## Inclusion rule

Include an entity only when it controls at least one material bottleneck or gateway in model development, distribution, cloud/compute, semiconductor supply, data/platform access, funding/partnership, or enforceable rules. Fame alone is not inclusion evidence.

Profiles must separate:

- organisation from product;
- model developer from application maker;
- ownership from investment;
- cloud hosting from model control;
- supply from dependence;
- announced agreement from delivered capacity;
- company statement from independently observable fact.

Every relationship arrow uses a precise verb or status: `owns`, `holds equity in`, `funds`, `supplies`, `hosts`, `is primary cloud partner for`, `licenses`, `distributes`, `regulates`, `evaluates`, or `depends on`. A permission such as “may use another cloud” is a condition of an agreement, not a relationship arrow.

## Layer map

1. Model labs: OpenAI, Anthropic, Google DeepMind, Meta, xAI, Cohere, Mistral, Aleph Alpha, DeepSeek, Alibaba, Baidu, Tencent, Huawei, ByteDance, NAVER.
2. Access products: ChatGPT, Claude, Gemini, Meta AI, Microsoft Copilot, Grok and other interfaces. Products are not treated as companies.
3. Cloud and compute: Microsoft Azure, AWS, Google Cloud, Oracle, CoreWeave, Alibaba Cloud, Tencent Cloud, Huawei Cloud.
4. Chips and systems: NVIDIA, AMD, Broadcom, Intel, Huawei.
5. Fabrication, memory, and lithography: TSMC, Samsung, Intel Foundry, SMIC, SK hynix, Micron, ASML.
6. Data and distribution: Alphabet, Meta, Microsoft, ByteDance, Reddit, Stack Overflow/Prosus, Scale AI and other organisations only where a sourced control point is material.
7. Capital and partnerships: named investors and partners only when the relationship changes access, capacity, governance, or distribution.
8. Public power: EU AI Office, US BIS and FTC, China CAC, UK AI Security Institute, and other bodies tied to a specific enforceable or evaluative role.
9. People: included only when a current role explains where a consequential decision is made. Deeper biographies belong in LUMINAiRY.

This is a dependency atlas, not a ranking and not a complete directory.

## Representative relationship: OpenAI, Microsoft, and Azure

### Current official claim

OpenAI’s 27 April 2026 statement says Microsoft remains its primary cloud partner; OpenAI products are first offered on Azure unless Microsoft cannot or chooses not to support them; OpenAI may serve products across any cloud; Microsoft’s intellectual-property licence through 2032 is now non-exclusive; and Microsoft remains a major shareholder.

### Correct map

`Microsoft -> holds equity in as a major shareholder -> OpenAI`

`Microsoft -> is primary cloud partner for -> OpenAI`

`OpenAI -> offers supported products first on -> Azure, subject to the stated exception`

`OpenAI -> licenses IP to -> Microsoft (non-exclusive through 2032 under the stated agreement)`

The agreement also permits OpenAI to serve products through other clouds. That condition must be written as prose, not drawn as if it were evidence of a currently named hosting relationship.

This is not the same as “Microsoft owns OpenAI,” “OpenAI runs only on Azure,” or “Microsoft controls every OpenAI product decision.”

Primary source: https://openai.com/index/next-phase-of-microsoft-partnership/

## Representative relationship: Anthropic, Amazon, and AWS

Anthropic’s 20 April 2026 company statement says AWS remains its primary training and cloud provider for mission-critical workloads, while Claude is available on AWS, Google Cloud, and Microsoft Azure. It also announces up to 5 GW of AWS capacity, more than one million Trainium2 chips, a greater-than-$100 billion ten-year technology commitment, and additional Amazon investment. These are company-reported commitments; announced future capacity is not the same as capacity already delivered.

`Amazon -> invests in -> Anthropic`

`AWS -> primary training/cloud provider for mission-critical workloads -> Anthropic`

`Anthropic -> distributes Claude through -> AWS, Google Cloud, and Azure`

Primary source: https://www.anthropic.com/news/anthropic-amazon-compute

## Representative chokepoint: ASML

Advanced chips depend on a chain, not a single “chip company.” NVIDIA’s fiscal 2026 Form 10-K says it uses TSMC and Samsung to produce semiconductor wafers and buys memory from SK hynix, Micron and Samsung. That gives the book one concrete designer-to-foundry and designer-to-memory chain. ASML’s annual report documents the lithography systems it supplies to chipmakers. The book therefore treats ASML’s equipment role as a material chokepoint—an editorial inference from that dependency, not ASML’s own label. ASML’s 2025 annual report also reports an approximately 11% fully diluted stake in Mistral AI; that investment must be labelled separately from the equipment role.

Primary sources:

- NVIDIA fiscal 2026 Form 10-K: https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm
- ASML Annual Report 2025: https://www.asml.com/en/investors/annual-report/2025

## Representative non-US model ecosystem

DeepSeek’s official release describes DeepSeek-R1 as an open-source reasoning-model family released under the MIT License. That supports a bounded relationship: `DeepSeek -> publishes model weights and code under a licence -> developers`. It does not, by itself, establish deployment share, training-cost claims, corporate independence, or market power. This case keeps a China-based lab visible without importing unsupported geopolitical conclusions.

Primary source: https://api-docs.deepseek.com/news/news250120

## Representative public-power layer

The EU AI Office supports implementation and enforcement of the EU AI Act at Union level. Commission guidance states that obligations for providers of general-purpose AI models entered into application on 2 August 2025. A separate Commission release says the AI Office and national authorities begin enforcing the Act on 2 August 2026. Those are distinct dates and must be rechecked before publication.

The US Bureau of Industry and Security administers US export controls through the Export Administration Regulations. That makes it an export-control authority, not a general AI safety evaluator or a competition regulator.

Primary sources:

- https://digital-strategy.ec.europa.eu/en/policies/ai-office
- https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers
- https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august
- https://www.bis.gov/about-bis/mission

## Profile-card evidence rule

Each card must contain:

1. what the entity is;
2. which layer it occupies;
3. what it controls;
4. named relationships using verbs;
5. what readers commonly confuse it with;
6. source and checked date;
7. update trigger;
8. confidence: certain, likely, or company-reported.

## Freshness triggers

- Recheck ownership, leadership, investment, cloud, licensing, capacity, product availability, and regulatory status before every public edition.
- Recheck immediately after a merger, investment, leadership change, material partnership, export-control change, regulation date, major capacity announcement, or discontinued product.
- A company press release can establish what the company announced. It cannot alone establish delivered capacity, market effect, or independence.
- Add or remove an entity when its control of a material bottleneck changes; do not preserve a profile because it was once famous.
- Keep women visible in the operating map while routing full biographies and historical profiles to LUMINAiRY.
