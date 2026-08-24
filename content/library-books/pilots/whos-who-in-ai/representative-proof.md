# Who’s Who in AI

## The companies, people and power behind the technology

### Start here: the name on the screen is not the whole system

Open a chatbot and you see one product name. The operational system may depend on a model lab, cloud capacity, chips, a semiconductor foundry, memory and specialised manufacturing equipment. Around that system, investors, distribution partners and public bodies can change capacity, access, ownership, rights or rules.

That is why a conventional “top AI companies” list goes stale before the ink is dry. It also teaches the wrong mental model. The industry is not a leaderboard; it is a dependency stack.

This book includes an organisation only when it controls a material bottleneck or gateway: model development, distribution, cloud capacity, chips, fabrication, data or platform access, funding, a consequential partnership, or enforceable rules. A famous founder is not a layer. A popular product is not necessarily a company. An investor is not automatically an owner. A hosting agreement is not the same as control.

Every connection in the book therefore needs a verb:

- **owns** — a legal ownership relationship;
- **holds equity in** — a current ownership interest, whose size and rights must be checked;
- **funds** — supplies capital, which may or may not produce equity or governance rights;
- **supplies** — chips, equipment, memory, data or another input;
- **hosts** — infrastructure used to run or serve a system;
- **licenses** — rights to use specified intellectual property or technology;
- **distributes** — a route through which customers can access a product;
- **regulates** — a defined public authority over conduct or access;
- **depends on** — a material input or gateway the entity does not control itself.

The verb prevents the family tree from turning into corporate soup.

## First distinction: company, lab, model and product

**OpenAI** is an organisation. **GPT** names a model family. **ChatGPT** is a product through which people use models and tools. Those statements describe different things even when news coverage uses the names almost interchangeably.

The same sorting applies elsewhere. Google DeepMind is an AI research organisation within Alphabet; Gemini can refer to model families and products, depending on context. Anthropic is a company; Claude names its model family and products. Microsoft Copilot is a set of Microsoft products and experiences; it is not the name of a single independent model laboratory.

Before asking who is “winning,” ask what category you are comparing. User numbers for an app, benchmark results for a model, cloud revenue and semiconductor capacity do not belong on one clean scoreboard.

## Relationship case: OpenAI, Microsoft and Azure

The lazy version says, “Microsoft owns OpenAI and OpenAI runs on Microsoft.” It is memorable and misleading.

OpenAI’s 27 April 2026 statement describes Microsoft as a major shareholder and OpenAI’s primary cloud partner. It says OpenAI products are first offered on Azure unless Microsoft cannot or chooses not to support them; OpenAI may serve products across any cloud; and Microsoft’s intellectual-property licence through 2032 is non-exclusive under the updated agreement.

The map therefore reads:

`Microsoft -> holds equity in as a major shareholder -> OpenAI`

`Microsoft -> is primary cloud partner for -> OpenAI`

`OpenAI -> offers supported products first on -> Azure, subject to the stated exception`

`OpenAI -> licenses specified IP to -> Microsoft`

The same agreement permits OpenAI to serve products through other clouds. That is a condition, not evidence that a particular second cloud currently hosts a particular product.

Those arrows describe capital, infrastructure, intellectual-property rights and distribution. They do not prove that Microsoft owns OpenAI outright, controls every product decision, or is the only infrastructure provider OpenAI may use.

The larger lesson is not about memorising this one agreement. It is about refusing to compress four different relationships into one vague word such as “partner.” Whenever an announcement says two AI companies are partnering, ask: **what is actually moving—money, chips, cloud capacity, rights, customers, data or authority?**

**Source and checked date:** OpenAI, “The next phase of the Microsoft–OpenAI partnership,” 27 April 2026, checked 24 August 2026: https://openai.com/index/next-phase-of-microsoft-partnership/. Recheck on any revised agreement, ownership change, licence change or cloud announcement.

## The companies you do not see: the chip chain

A model lab can write software without owning the factories that make the most advanced chips. A chip designer can design an accelerator without fabricating it. A foundry can manufacture advanced chips while depending on highly specialised lithography equipment. Useful AI systems also depend on memory, packaging, networking, power and data-centre capacity.

That places several kinds of organisation on the map:

- **Designers and system suppliers**, including NVIDIA, AMD, Broadcom, Intel and Huawei;
- **Foundries**, including TSMC, Samsung, Intel Foundry and SMIC;
- **Memory suppliers**, including SK hynix, Samsung and Micron;
- **Lithography equipment**, where ASML occupies an unusually consequential role.

NVIDIA’s fiscal 2026 Form 10-K gives us a concrete chain. NVIDIA says it uses **TSMC in Taiwan and Samsung in South Korea to produce semiconductor wafers**, and buys memory from **SK hynix, Micron and Samsung**. The arrows are not glamorous, but they are real:

`NVIDIA -> depends on foundry services from -> TSMC and Samsung`

`TSMC and Samsung -> supply fabricated wafers to -> NVIDIA`

`SK hynix, Micron and Samsung -> supply memory to -> NVIDIA`

ASML does not make a chatbot. It supplies lithography systems used by chipmakers. The book therefore treats it as a material chokepoint—our inference from the manufacturing dependency, not ASML’s marketing label. ASML’s 2025 annual report also reports an approximately 11% fully diluted stake in Mistral AI. These are two different reasons for appearing here: equipment supply and equity. They must not be merged.

**Sources and checked date:** NVIDIA fiscal 2026 Form 10-K, https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm; ASML Annual Report 2025, https://www.asml.com/en/investors/annual-report/2025; checked 24 August 2026. Recheck after a material supply, investment, export-control or annual-report change.

## A China-based lab: DeepSeek

DeepSeek is a China-based model lab. Its official release describes DeepSeek-R1 as a reasoning-model family whose weights and code were released under the MIT License. That supports one bounded arrow:

`DeepSeek -> publishes model weights and code under a licence for -> developers`

It does not establish the lab’s market share, the truth of every reported training-cost claim, corporate independence or geopolitical significance. Those require their own evidence. This is how the global map avoids two bad habits at once: leaving China as a vague “other” and turning one model release into a complete theory of Chinese AI.

**Source and checked date:** DeepSeek official release, https://api-docs.deepseek.com/news/news250120; checked 24 August 2026. Recheck after a material licence, model, access or ownership change.

## Public power is part of the map

Regulators and public institutions are not scenery around the industry. Export controls can limit which chips reach which markets. Competition authorities can challenge conduct or transactions. Safety institutes can evaluate systems. Legislation can impose obligations on providers and deployers.

The EU AI Office supports implementation and enforcement of the EU AI Act at Union level. European Commission guidance says obligations for providers of general-purpose AI models entered into application on **2 August 2025**. A separate Commission release says the AI Office and national authorities **begin enforcing** the Act on **2 August 2026**. The distinction matters: obligations entering into application and authorities beginning enforcement are not the same event.

The US Bureau of Industry and Security occupies a different lane. BIS administers US export controls through the Export Administration Regulations. It can affect access to controlled technology; it is not a general AI safety evaluator or a competition regulator. The UK AI Security Institute occupies another lane again: technical evaluation and research do not make it the legislature or a general competition authority.

The book will use the same discipline for the US Bureau of Industry and Security, the US Federal Trade Commission, China’s Cyberspace Administration and the UK AI Security Institute: name the body, name its actual power or evaluative role, and resist the vague label “the government.”

**Sources and checked date:** European Commission AI Office, https://digital-strategy.ec.europa.eu/en/policies/ai-office; Commission GPAI provider guidance, https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers; Commission enforcement release, https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august; BIS mission, https://www.bis.gov/about-bis/mission; UK AI Security Institute, https://www.aisi.gov.uk/; checked 24 August 2026. Recheck on implementation, guidance, mandate or enforcement changes.

## How to read the next announcement

Take a headline and fill in one sentence:

> **[Entity A] [precise verb] [thing] to or from [Entity B], according to [dated source]. This changes [capacity, access, control, rights, distribution or rules]. It does not by itself establish [the common overclaim].**

Then attach confidence:

- **Certain:** directly documented and already in force or observable.
- **Likely:** supported by strong evidence but partly inferred.
- **Company-reported:** the organisation announced a commitment, forecast or future capacity that is not yet independently established as delivered.

That is how this living book will update. Not by adding every new logo, but by changing the map when control, dependence or authority materially changes.
