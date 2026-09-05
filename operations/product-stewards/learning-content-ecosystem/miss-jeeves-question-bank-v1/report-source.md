# Miss Jeeves evidence-weighted question bank

**Status:** RESEARCHED BENCHMARK CANDIDATE: NOT A CLAIM OF LITERAL SEARCH RANK
**Audience:** Miss Jeeves product, editorial and evaluation owners
**Research date:** 2026-09-04
**Primary audience assumption:** English-speaking adult women, especially non-technical professional women in the United States and Canada

## Direct answer

There is no credible public dataset that ranks the exact fifty AI questions most often asked by women. Search-volume products generally do not expose gender, while the strongest large-scale usage studies publish topic categories rather than raw questions. Calling any available list “the top 50 asked by women” would overstate the evidence.

The accompanying bank is therefore an **evidence-weighted priority list**, not a prevalence chart. It combines:

1. large-scale, privacy-preserving evidence about what people actually ask ChatGPT;
2. topic differences associated with typically feminine first names;
3. women-only survey results about AI use, uncertainty and concern;
4. workforce research on the barriers and risks women face; and
5. current beginner-search and LAiDIES failure signals.

The order is a product priority: likely usefulness, strength of women-specific evidence, consequence of a bad answer and value as a test of Miss Jeeves. Small differences between adjacent ranks are not meaningful.

## What the evidence says

The largest available study of actual ChatGPT use analyzed 1.5 million conversations. Practical guidance, seeking information and writing accounted for roughly three-quarters of use, and about half of messages were classified as asking for advice or information. Its separate name analysis found users with typically feminine first names were relatively more likely to use ChatGPT for writing and practical guidance. The study did not publish raw questions and its name method is not self-reported gender. [OpenAI research overview](https://openai.com/index/how-people-are-using-chatgpt/) and [NBER working paper](https://www.nber.org/papers/w34255).

A 2026 survey of ideologically moderate women provides the most direct public women-only signal found in this research. Among respondents who used chatbots, 91% used them to search for information, 61% for fun or entertainment, 47% for news, 47% to create or edit images or video, 46% for medical advice, 40% for work and 39% for diet or fitness. Among non-users, 68% called personal-data use a major reason not to use chatbots and 56% called lack of trust in accuracy a major reason. Only 20% of the full sample felt very or extremely confident identifying AI-generated content, while 60% were very or extremely concerned about AI spreading misinformation. The sample is useful but not representative of all women. [Galvanize Action AI and Online Communities Survey](https://www.galvanizeaction.org/ai-online-communities-survey/).

Pew’s comparison of the US public and AI experts identifies inaccurate information, data misuse, impersonation, bias, job loss and loss of human connection as major concerns. Women in the public were less likely than men to expect personal benefit from AI, and were more concerned about loss of human connection. [Pew Research Center](https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/).

Women’s adoption is not simply a matter of interest. Deloitte found lower trust among women that generative-AI providers would protect their data. Research published in PNAS found women were 16 percentage points less likely to have used ChatGPT at work than men in the same occupation, with 45% of women who saw high potential time savings reporting that they needed training. McKinsey’s 2025 workplace study found only 21% of entry-level women were encouraged by managers to use AI, compared with 33% of entry-level men. [Deloitte](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2025/women-and-generative-ai.html), [PNAS study](https://pmc.ncbi.nlm.nih.gov/articles/PMC11725873/), and [Women in the Workplace 2025](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/women-in-the-workplace/).

Gender bias and technology-facilitated abuse cannot be treated as niche extras. UNESCO has documented gender stereotypes in language-model outputs and the use of generative AI for gendered harassment, impersonation and harmful content. [UNESCO gender-bias study](https://www.unesco.org/en/articles/generative-ai-unesco-study-reveals-alarming-evidence-regressive-gender-stereotypes) and [UNESCO report on gender-based violence](https://www.unesco.org/en/articles/your-opinion-doesnt-matter-anyway?hub=370).

Broader public-use evidence supports information search, practical advice, work, writing, images, brainstorming and shopping as common jobs. Google People Also Ask data also surfaces basic capability and job-impact questions. These are used only as broader-population proxies, never as women-specific proof. [AP-NORC reporting](https://apnews.com/article/229b665d10d057441a69f56648b973e1) and [pplAsk Google PAA snapshot](https://pplask.com/trends/us/technology/artificial-intelligence).

## Composition of the Top 50

| Question family | Count | Why it is represented |
| --- | ---: | --- |
| Getting useful results | 8 | Practical guidance is a high-volume, female-skewed use; training need is a documented barrier. |
| Understanding AI | 10 | New users need a correct mental model before they can judge claims or choose tools. |
| Work and writing | 10 | Writing is the leading work use and relatively more common among users with typically feminine names. |
| Choosing tools | 5 | Tool choice, cost and capability are recurring beginner decisions with fast-changing answers. |
| Accuracy, privacy and safety | 12 | Women-specific evidence strongly supports accuracy, privacy, misinformation, bias and content-identification concerns. |
| Power, news and consequences | 5 | These questions test whether Miss Jeeves can connect current reporting to durable concepts without hype. |

## How to use the bank

- Run all fifty questions before changing the model, prompt, retrieval, source policy or answer format.
- Test a clean guest, a signed-in Resident, phone and desktop where the interface is part of the claim.
- Score the exact answer against the existing LAiDIES hard gates and 17/20 minimum.
- Require every volatile question to show a checked date, current direct sources, material unknowns and a recheck trigger.
- Preserve a failed exact output as a regression fixture. Do not merely record a prose lesson.
- Do not publish any generated answer because it passed this bank. Publication remains a separate editorial decision.

The machine-readable bank records the category, evidence basis, freshness class, intended content home and the minimum concepts an adequate answer must cover.

## Material limitations

- “Women” is not a single homogeneous audience. The available studies differ in geography, age, occupation, race and political identity; they do not support universal claims.
- The OpenAI name analysis classifies names as typically feminine or masculine. It does not establish an individual’s gender and excludes ambiguous names.
- The ranking does not represent exact query counts. It is a transparent product-priority order.
- Current-company and product questions will change. They belong in the benchmark because freshness behavior is part of the product, not because today’s example will remain permanently popular.
- Health, legal and financial questions appear only to test safe boundaries and source routing. Miss Jeeves should not provide unsafe personalized professional advice.

## Claim-to-source ledger

| Source | Publisher / author | Date | Used for |
| --- | --- | --- | --- |
| [How people are using ChatGPT](https://openai.com/index/how-people-are-using-chatgpt/) | OpenAI Economic Research | 2025-09-15 | Actual-use categories, asking/doing split, scale and privacy-preserving method. |
| [How People Use ChatGPT](https://www.nber.org/papers/w34255) | Chatterji et al., NBER Working Paper 34255 | 2025-09 | Topic distribution and name-associated topic differences. |
| [AI and Online Communities Survey](https://www.galvanizeaction.org/ai-online-communities-survey/) | Galvanize Action | 2026-08-10 | Women-only use, confidence, privacy, accuracy, misinformation and AI-content recognition. |
| [Views of risks, opportunities and regulation of AI](https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/) | Pew Research Center | 2025-04-03 | Public and gender-specific concerns and perceived personal benefit. |
| [Women and generative AI](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2025/women-and-generative-ai.html) | Deloitte Insights | 2024-11-19 | Adoption, productivity and provider-data-trust gap. |
| [The unequal adoption of ChatGPT](https://pmc.ncbi.nlm.nih.gov/articles/PMC11725873/) | Humlum and Vestergaard, PNAS | 2025-01-07 | Occupational adoption gap and training barrier. |
| [Women in the Workplace 2025](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/women-in-the-workplace/) | McKinsey and LeanIn.Org | 2025 | Manager encouragement, career concern and workplace context. |
| [How to stop women from falling behind on GenAI at work](https://www.oliverwymanforum.com/artificial-intelligence/2024/apr/women-are-falling-behind-on-generative-ai-in-the-workplace--here.html) | Oliver Wyman Forum | 2024-04-02 | Global adoption gap and employer-supported upskilling. |
| [Gender stereotypes in generative AI](https://www.unesco.org/en/articles/generative-ai-unesco-study-reveals-alarming-evidence-regressive-gender-stereotypes) | UNESCO | 2024-03-07 | Gender bias and representation. |
| [Technology-facilitated gender-based violence](https://www.unesco.org/en/articles/your-opinion-doesnt-matter-anyway?hub=370) | UNESCO | 2023-04-23, updated 2024-04-29 | Deepfakes, harassment and gendered misuse. |
| [How US adults are using AI](https://apnews.com/article/229b665d10d057441a69f56648b973e1) | AP-NORC | 2025-07-29 | Broader use-case proxy: information, work, ideas, email, images, entertainment and shopping. |
| [Google People Also Ask snapshot](https://pplask.com/trends/us/technology/artificial-intelligence) | pplAsk | 2026-03-09 | Broader search-question proxy: AI capability, jobs and investment. |

## Research stop rule

Research stopped when the principal question families were supported by at least one large actual-use study and one or more women-specific studies, the major safety and workplace gaps were covered, and further searches produced repeated generic FAQ lists rather than better gender-disaggregated query evidence. The missing literal gendered search ranking is disclosed rather than filled with weak SEO claims.
