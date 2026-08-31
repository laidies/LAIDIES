# Who’s Who in AI — expanded industry research

Checked 2026-08-31. INTERNAL SOURCE SYNTHESIS, not a finished textbook or a
claim that every important company has been covered. The existing nine-chapter
source and rendered book are preserved. This packet expands the August 24
claim packet; it does not retrospectively approve that manuscript.

## Finding that changes the book

The book must distinguish several kinds of power: building models, financing
and hosting them, designing processors, manufacturing and packaging chips,
supplying memory and equipment, distributing products, and scrutinising their
effects. A company can occupy several roles. An investment, a supply contract,
a model licence and outright ownership are different relationships.

The strongest objection to a company directory is rapid obsolescence: even a
correct list of names does not explain why one company's decision changes
another company's service. The proposed teaching unit is therefore a short
relationship case, followed by dated company/person cards. This is an editorial
inference from the evidence below, not a claim of reader-tested effectiveness.

## Current relationships: evidence and reader consequence

| Relationship | Source-supported finding | What the reader can understand from it |
|---|---|---|
| OpenAI Foundation → OpenAI Group PBC | OpenAI’s structure page says the Foundation controls the Group and appoints its board. Its equity percentages are explicitly as of the October 2025 recapitalisation, not an August 2026 cap table. [S1] | A shareholder's percentage and control are not the same thing. Do not say Microsoft owns OpenAI outright. |
| Microsoft ↔ OpenAI | The April 27 amended agreement keeps Microsoft the primary cloud partner and a major shareholder, permits OpenAI products across cloud providers, and makes Microsoft's IP licence nonexclusive through 2032. [S2] | Hosting, investment and model licensing can overlap without being identical. “Azure exclusive” is an unsafe current simplification. |
| Amazon/AWS ↔ Anthropic | The April 20 announcement names AWS the primary provider for mission-critical training/cloud and commits to up to 5GW of additional capacity. It also describes Claude distribution through AWS, Google Cloud and Azure. [S3] | A lab can have a preferred infrastructure partner while selling through competing clouds. A future capacity commitment is not already delivered compute. |
| SpaceX → Cursor; OpenAI → Cursor model access | Cursor announced completed acquisition on August 14. OpenAI announced on August 28 an intended wind-down of its Cursor contract, with November 12 proposed for shutoff. [S4–S5] | An app's ownership can change which model it offers. Neither “already unavailable” nor “will always include OpenAI” is supported. Attribute each party's statements; do not turn contractual accusations into adjudicated facts. |
| NVIDIA → foundries, memory suppliers and assemblers | NVIDIA’s FY2026 filing identifies TSMC and Samsung for wafers; SK hynix, Micron and Samsung for memory; and subcontractors for assembly/testing/packaging. [S6] | A chip designer depends on specialist suppliers. NVIDIA is not the factory for every component carrying its brand. |
| Meta ↔ Broadcom and Arm | Meta describes co-development of MTIA chip generations with Broadcom. Arm names Meta lead partner/co-developer of its new data-centre CPU. [S7–S8] | An application/platform company can also commission its own processors. GPUs are not the entire infrastructure story. |
| Arm: IP licensing plus silicon products | Arm's March 24 announcement expands beyond IP and compute subsystems into its own designed silicon products. [S8] | “Arm only licences designs and never sells chips” is now an outdated description. Keep the stable distinction between design and fabrication. |
| Open-model creators ↔ community distribution | Hugging Face's August 14 analysis reports strong Qwen-derived activity and separates likes, downloads and derivatives. It explicitly limits conclusions to Hub activity. [S9] | Popular discussion is not deployment; downloads are not global market share; large model size does not equal usefulness. |

The older Anthropic announcement calls Claude the only frontier model on all
three major clouds. Do not repeat that exclusivity as current: SpaceXAI's
August news index lists Grok releases on those clouds too. [S3, S18] Retain the
specific distribution fact, discard the expired superlative.

## Company coverage with a concrete job for each entry

This is a source-backed coverage map, not a ranking or investment recommendation.
Product names below identify model families/surfaces, not a promise that every
reader can access the newest version for free.

| Actor or group | Role to explain | Current source and boundary |
|---|---|---|
| OpenAI | Models plus ChatGPT, Work and Codex; nonprofit control and commercial operation | S1–S2; practical access belongs in the separate ChatGPT packet. |
| Anthropic | Claude, applied safety research, commercial products and infrastructure partnerships | S3, S10; self-described safety goals are not proof it is the safest provider. |
| Google DeepMind / Google Cloud | Model/scientific research and cloud AI infrastructure | S11, S12; distinguish the lab from the parent company, consumer app and cloud service. |
| Microsoft | Cloud, model distribution, investment and workplace distribution | S2; a partnership source does not prove every Microsoft product's model or price. |
| Amazon / AWS | Cloud compute, Trainium chips and model distribution | S3, S13; Trainium supports training and inference, despite its name. |
| Meta | AI models and applications plus owned infrastructure/custom silicon | S7; do not reduce its current AI work to Llama alone. |
| SpaceXAI / xAI and Cursor | Grok models/agents and acquired developer distribution | S4–S5, S18; preserve dated naming and completed-vs-proposed distinctions. |
| Mistral AI | European models, Le Chat, developer tools and compute | S14; its company timeline includes Mistral Compute and later tools, not just one chatbot. |
| Cohere | Enterprise models, retrieval, North and private deployment options | S15; not simply another consumer chatbot subscription. |
| IBM | Granite models and enterprise-oriented deployment | S16; the page states Apache 2.0; check the exact model's licence before a deployment. |
| Alibaba Cloud / Qwen | Model family plus cloud and community distribution | S17; official organisation card explicitly identifies Alibaba Cloud. Family branding is not a single licence for every release. |
| DeepSeek | Released reasoning/language models and hosted services | S19; current official repository lists V4 releases, so R1 is historical context, not today's whole catalogue. |
| Moonshot AI | Kimi family | S20; official repository lists K3. Do not infer hardware needs, price or licence from its name. |
| Z.ai | GLM models and related language/vision/speech work | S21; current organisation lists GLM-5.3. A model listing is not an account test. |
| MiniMax | Language and video model families | S22; official collection includes M3 and H3, illustrating that labs extend beyond chat. |
| Baidu | ERNIE models and adjacent OCR/image research | S23; published benchmark superiority is vendor-reported, not an independent verdict. |
| Huawei / Huawei Cloud | Pangu, ModelArts Studio, Ascend processors and Atlas systems | S24, S38; separate roadmap promises from independently verified deployment. |
| ByteDance Seed | Seed models distributed through Doubao and Volcano Engine | S35, June release; vendor benchmark rankings not adopted. |
| Tencent | Hy, called Hunyuan in China, integrated into its applications and cloud | S36; these are not two separate companies. Do not reuse expired launch promotions. |
| NAVER Cloud | South Korean HyperCLOVA X model/application/infrastructure ecosystem | S39; its corporate PDF establishes positioning, not an independent national ranking. |
| NVIDIA | Accelerators, CPUs, networking and system software | S6, S25; current Rubin material describes a rack-scale system, not one interchangeable chip. Performance claims remain vendor claims. |
| AMD | Instinct accelerators, EPYC CPUs and ROCm software | S26; include the software ecosystem alongside hardware rather than comparing chip names alone. |
| Intel | CPUs, Gaudi-related software and AI PC/server ecosystem | S27; foundry strategy and current individual chips need specific additional sources. |
| Arm | Processor IP, subsystems and now own designed silicon | S8; CPU coordination/data movement deserves a place beside accelerator arithmetic. |
| Broadcom | Custom silicon partnership in Meta's infrastructure | S7; source supports this relationship, not every rumoured custom-chip customer. |
| TSMC | Contract manufacturing and advanced packaging | S6, S28; wafer fabrication and packaging are distinct steps. |
| Samsung, SK hynix, Micron | Samsung spans foundry and memory; all three appear in NVIDIA's memory supply disclosure | S6; do not claim these are exclusive suppliers or identical businesses. |
| ASML | Equipment enabling semiconductor manufacturing | S29; distinguish equipment supplier from chip designer and foundry. |
| CoreWeave | Cloud platform focused on AI workloads | S30; a specialist cloud is neither a model lab nor a semiconductor manufacturer. |
| Oracle | Cloud AI infrastructure and enterprise AI services | S31; no cloud cost or performance ranking inferred from marketing. |
| Hugging Face | Model/dataset distribution and evaluation infrastructure | S9, S32; it hosts many developers' work rather than owning every hosted model. |
| World Labs | Spatial intelligence and 3D world models | S33; a useful counterexample to equating all AI with chat. |
| LawZero | Research on safer AI system designs | S34; an independent research role, not a consumer assistant alternative. |
| Algorithmic Justice League | AI auditing, public understanding and accountability | S40; independent scrutiny belongs in the map, not only companies selling AI. |

## People: verified role first, contribution second

Each card must eventually answer: What did this person actually contribute or
decide? What organisation can they speak for? What claim should a reader not
infer from that prominence? A CEO is not the sole inventor of a model, and a
researcher’s historical contribution does not imply a current corporate role.

| Person | Supported role / contribution to pursue | Evidence and freshness boundary |
|---|---|---|
| Sam Altman | OpenAI CEO; member of Foundation board | S1, living page checked today. Governance, not sole model authorship. |
| Bret Taylor | OpenAI Foundation board chair | S1; explains a governance role distinct from CEO. |
| Dario Amodei | Anthropic co-founder and CEO | S3, April announcement checked today; recheck role before publication. |
| Daniela Amodei | Anthropic board member; fuller operating-role card needs an exact current biography | S10 establishes board membership only; do not silently infer a current title. |
| Demis Hassabis | Google DeepMind co-founder and CEO | S11; scientific/project contributions require the associated research sources. |
| Arthur Mensch; Guillaume Lample | Mistral co-founders; CEO and Chief Science Officer respectively | S14; separates company direction from scientific role. |
| Aidan Gomez | Cohere co-founder and CEO | S15; Transformer co-authorship requires the original paper in the historical contribution card. |
| Joelle Pineau | Cohere Chief AI Officer | S15; do not carry an old Meta affiliation forward as current. |
| Jensen / Jen-Hsun Huang | NVIDIA President and CEO in its February 25 filing | S6; exact spelling/signature and source date retained. Refresh current biography before print. |
| Lisa Su | AMD Chair and CEO | S26; role checked from current leadership page. |
| Lip-Bu Tan | Intel CEO | S37, current leadership page; no old CEO carried forward. |
| C. C. Wei | TSMC Chairman and CEO | S28; helps distinguish manufacturing leadership from chip design. |
| Christophe Fouquet | ASML President and CEO | S29; manufacturing equipment role, not a model developer. |
| Rene Haas | Arm CEO | S8; date-bound role and authored company strategy. |
| Mike Intrator | CoreWeave CEO and co-founder | S30; cloud infrastructure role. |
| Fei-Fei Li | World Labs co-founder with Justin Johnson, Ben Mildenhall and Christoph Lassner | S33; credit the team. ImageNet/scientific history needs its original research source, not this company biography alone. |
| Yoshua Bengio | LawZero Co-President and Scientific Director; Université de Montréal professor and Mila founder/scientific adviser | S34; current role differs from a generic historical “AI godfather” label. |
| Joy Buolamwini | Algorithmic Justice League founder; AI auditing/accountability research | S40; current organisation affiliation distinct from historical MIT graduate work. |
| Timnit Gebru | Gender Shades co-author with Buolamwini | S40 supports the historical contribution; DAIR current title remains unverified here because its pages could not be read. |

This is not a finished people roster. The next source pass must include
independent researchers, labour/data perspectives and public-interest
leadership, not fill all remaining spaces with executives. Current titles for
other prominent founders must be sourced rather than recalled.

## Chip chapter: the explanatory chain to develop

Proposed mechanism, not manuscript prose:

1. A model needs numerical work to be trained and to answer a user. Training
   and inference are different workloads, not two separate universes of chips.
2. Accelerators perform much of the repeated arithmetic; CPUs coordinate work;
   memory feeds parameters/data; interconnects move information between parts.
   Faster arithmetic alone does not eliminate memory or network bottlenecks.
3. Designers and software stacks determine how the work maps to hardware.
   NVIDIA/AMD and Google's TPU/AWS Trainium demonstrate different routes.
4. Foundries manufacture wafers; packaging connects components into useful
   assemblies; memory and equipment have their own specialist suppliers.
5. Data centres add power, cooling, networking and operation. A purchased chip
   is not an operating service, and announced gigawatts are not delivered ones.
6. The reader encounters these constraints as access limits, latency, costs,
   geographic availability and dependence on providers—not a need to buy a GPU.

Primary anchors: S6–S8, S12–S13, S25, S28–S31. Avoid a rigid “factory line”
analogy that suggests every model follows a single supplier chain. The
representative teaching proof should trace one response through roles, then
ask the reader to explain why a memory shortage is not fixed merely by choosing
a different chatbot. This is an intended learning test, not an observation.

## Researcher/developer methods for interpreting the industry

- **Read measures by what they actually count.** Adina Yakefu, Apolinário and
  Irene Solaiman's August Hub analysis distinguishes attention, downloads and
  derivatives, and disclaims whole-market inference. Beginner adaptation:
  beside any “largest” claim, write largest by what, over which dates, in which
  dataset. This is their first-hand platform analysis, not neutral market-wide
  measurement. [S9]
- **Inspect evaluation provenance.** Hugging Face's Community Evals developers
  expose score sources, specifications and histories. Beginner adaptation:
  ask what task a leaderboard tested, who ran it, with which model and tools,
  and whether the result reproduces. A reproducible score still does not prove
  success on a different everyday task. [S32]
- **Read system costs, not chip slogans.** Arm, NVIDIA, AWS and Google engineers
  describe processors with memory/network/software around them. Adaptation:
  distinguish raw advertised performance from the cost and reliability of a
  finished task. These are vendor accounts; do not adopt “best economics” or
  competitor speed ratios without matched independent measurements.
  [S8, S12–S13, S25]

## Free-only and paid readers

This book does not require buying a subscription or hardware. Its practical
exercise can be performed with public company pages, model cards, filings and
official documentation. A free chatbot can help organise those materials, but
the reader must check the underlying evidence.

Keep four meanings separate: a free consumer account; downloadable model
weights; open-source code/licensing; and paid hosting/API capacity. A download
can still need substantial hardware. A model-family name does not guarantee
the same commercial licence across releases. Free and paid accounts can both
depend on the same upstream cloud/chip supplier. Access and quota details belong
in dated cards in the other three books, not permanent industry prose.

## Explicit remaining research and publication boundaries

- Broader regional coverage remains necessary: Indian and Middle Eastern
  ecosystems, plus additional European actors. ByteDance/Tencent and NAVER
  source entries above are initial coverage, not complete regional profiles.
  Sparse or empty landing-page extraction is not evidence of no activity.
- Data/rights/evaluation institutions need a fuller pass: publishers, data
  workers, Scale AI, rights holders, EU AI Office, BIS and national regulators.
  Any legal/export-control dates require current government texts, not an old
  company risk paragraph. No legal compliance advice is established here.
- Funding totals, ownership percentages, rankings, energy forecasts and
  current executive appointments require source-specific dates. No present
  market-cap ranking or investment advice has been produced.
- The Stanford 2026 report landing page was found, but its full quantitative
  report was not reviewed in this pass; no numerical result is imported from
  a snippet. DAIR's homepage/team and some product landing pages failed or
  returned no usable text; no role claim relies on those failed reads.
- No account, model, chip, benchmark or reader-comprehension test was run.
  No existing book source/render, public catalogue or website was changed.

## Opened source register

All checked 2026-08-31. Living pages have no invented publication date. A dated
announcement establishes what was announced then; it does not prove unchanged
status today. Claims above intentionally avoid unsupported exclusivity and
performance superlatives.

- S1 — [OpenAI structure](https://openai.com/our-structure/), living page; recapitalisation dated October 28 2025.
- S2 — [Microsoft/OpenAI agreement](https://openai.com/index/next-phase-of-microsoft-partnership/), April 27 2026.
- S3 — [Anthropic/Amazon compute](https://www.anthropic.com/news/anthropic-amazon-compute), April 20, clarified April 21 2026.
- S4 — [Cursor joins SpaceX](https://cursor.com/blog/joining-spacex), August 14 2026.
- S5 — [OpenAI Cursor contract announcement](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/), August 28 2026; future proposed shutoff distinct from present access.
- S6 — [NVIDIA FY2026 Form 10-K](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm), fiscal year ended January 25; signed February 25 2026; Manufacturing and Signatures sections.
- S7 — [Meta infrastructure explanation](https://about.fb.com/news/2026/06/what-is-compute-power-meta-ai-infrastructure/), June 2026; MTIA/Broadcom relationship.
- S8 — [Arm silicon expansion](https://newsroom.arm.com/news/arm-agi-cpu-launch), March 24 2026; direct company account.
- S9 — [Hugging Face summer observations](https://huggingface.co/blog/state-of-open-models-summer-2026), August 14 2026, first seven months of Hub activity; edited for early-August releases.
- S10 — [Anthropic company/governance](https://www.anthropic.com/company), living page.
- S11 — [Google DeepMind](https://deepmind.google/about/), living page.
- S12 — [Google TPUs](https://cloud.google.com/tpu), living product page; not independent performance evidence.
- S13 — [AWS Trainium](https://aws.amazon.com/ai/machine-learning/trainium/), living product page.
- S14 — [Mistral company and founders](https://mistral.ai/about/), living page.
- S15 — [Cohere company and team](https://cohere.com/about), living page.
- S16 — [IBM Granite](https://www.ibm.com/granite), living page.
- S17 — [Official Qwen organisation](https://huggingface.co/Qwen), living repository inventory.
- S18 — [SpaceXAI news](https://x.ai/news), dated August 2026 cloud-release entries.
- S19 — [Official DeepSeek organisation](https://huggingface.co/deepseek-ai), living repository inventory.
- S20 — [Official Moonshot organisation](https://huggingface.co/moonshotai), living repository inventory.
- S21 — [Official Z.ai organisation](https://huggingface.co/zai-org), living repository inventory.
- S22 — [Official MiniMax organisation](https://huggingface.co/MiniMaxAI), living repository inventory.
- S23 — [Baidu ERNIE blog](https://ernie.baidu.com/), dated model entries; vendor benchmarks not adopted.
- S24 — [Huawei Pangu](https://www.huaweicloud.com/intl/en-us/product/pangu.html), living product page.
- S25 — [NVIDIA Vera Rubin systems](https://blogs.nvidia.com/blog/vera-rubin/), July 21 2026; vendor performance claims.
- S26 — [AMD products and leadership](https://www.amd.com/en/corporate/leadership.html), living page.
- S27 — [Intel AI overview](https://www.intel.com/content/www/us/en/artificial-intelligence/overview.html), living page.
- S28 — [TSMC profile](https://www.tsmc.com/english/aboutTSMC/company_profile) and [executives](https://www.tsmc.com/english/aboutTSMC/executives), living pages.
- S29 — [ASML annual report overview](https://www.asml.com/en/investors/annual-report/2025) and [management](https://www.asml.com/en/company/governance/board-of-management), 2025 report and living leadership page.
- S30 — [CoreWeave company](https://www.coreweave.com/about-us), living page.
- S31 — [Oracle AI](https://www.oracle.com/ai/), living product page.
- S32 — [Community Evals](https://huggingface.co/blog/community-evals), February 4 2026, original developer explanation.
- S33 — [World Labs company](https://www.worldlabs.ai/about), living page.
- S34 — [Yoshua Bengio at LawZero](https://lawzero.org/en/team/yoshua-bengio), living biography.
- S35 — [ByteDance Seed2.1](https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity), June 23 2026; product/distribution relationship.
- S36 — [Tencent Hy3 preview](https://www.tencent.com/index.php/en-us/articles/2202320.html), April 24 2026; regional naming and application integration.
- S37 — [Intel leadership](https://www.intel.com/content/www/us/en/corporate/executive-leadership.html), living page.
- S38 — [Huawei research and development](https://www.huawei.com/en/corporate-information/research-development), living page; Ascend/Atlas roadmap and software.
- S39 — [NAVER Cloud company profile](https://www.navercloudcorp.com/NAVER_Cloud_251114_EN.pdf), no displayed publication date established; model/ecosystem text, not visual-design review.
- S40 — [Algorithmic Justice League](https://www.ajl.org/about), living page; Buolamwini and historical Gender Shades contribution. Broader numerical/social claims on this page not imported.
