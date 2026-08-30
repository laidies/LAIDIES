# Working with AI 101 — claim and source packet

**Status:** RELEASE RECHECK COMPLETE FOR 15-AUGUST-TO-29-AUGUST 2026 EDITORIAL SUCCESSOR — 2026-08-29
**Extracted-claims source:** `content/library-books/pilots/working-with-ai-101/source/original-first-draft.md`
**Original SHA-256:** `9468cbe3609897358b992fcbd30dad831a1484efeb2920df22ad27dd5b1e9cbe`
**Reconciled editorial candidate:** `content/library-books/sources/working-with-ai-101.manuscript.md`
**Candidate SHA-256:** `9ccd6c7d7fcfbbf0f8735733b3ab8a64a96187f9fc8e6c7b4d2f0918e1999296`
**Rendered successor SHA-256:** `2ac1f222ceea8e555577f8970c1cd7b8f0f8f94332912f6b8a3db12070886c8c`
**Audit manuscript state:** original preserved unchanged; every UPDATE/QUALIFY disposition was rechecked against the exact candidate and render after independent review.
**Freshness:** recheck volatile product facts immediately before release.

## Method and dispositions

Every dated, numerical, research, launch, plan, capability, causal and direct-quotation claim was extracted from all 13 chapters. The audit searched the exact product, paper, quotation or named organization before broader discovery; preferred official product documentation and original papers; and recorded population, task, denominator and date. A failed search is `UNRESOLVED — PRESERVE`, never proof that a claim is invented.

- **KEEP + CITE:** supported by the linked primary source.
- **QUALIFY:** keep the teaching point but narrow an absolute or overgeneralization.
- **UPDATE:** correct the date, denominator, scope or product detail.
- **UNRESOLVED — PRESERVE:** do not delete or silently rewrite before restoring the original source.

This method corrects an earlier invalid audit that misclassified Dreaming, ChatGPT Work, Claude Cowork, GPT-5.5 and Claude Opus 5. All five are documented current products or features.

## Chapters 1–2 — output and context

| Claim family | Evidence and scope | Disposition |
|---|---|---|
| Ten variables affect output. | Current vendor guidance distinguishes model, instructions, state, memory, tools, modes, examples, effort and checks. | KEEP as this book's diagnostic model, not an exhaustive causal taxonomy. |
| AI is categorically bad at maths, current facts and being right. | Current models report strong task results but remain fallible; tools improve inspectability, not certainty. | UPDATE to task/tool-specific fallibility. |
| Most tools advertise one million tokens; all earlier material is read every turn. | Limits and context assembly vary; systems may retrieve, summarize, truncate, cache or selectively include material. | UPDATE. |
| Chroma tested 18 models and found longer-input degradation. | Chroma's original controlled research supports this. | KEEP + CITE; do not universalize each benchmark trajectory. |
| NoLiMa: 13 models; 11 below half baseline at 32K. | The accepted conference paper reports exactly 13 and 11; the mutable repository later reports 12 and 10 for its original set. | KEEP + CITE the accepted paper. |
| Models reliably use only half to two-thirds of capacity. | No universal fraction is established across tasks/models. | QUALIFY. |
| ICLR 2026: GPT-5 onward loses 33%, improved from 39%. | The located ICLR paper reports 39% average across six simulated multi-turn tasks and does not establish the GPT-5-specific comparison. | UPDATE unless the separate study is restored. |
| Breunig's four context failures came from a 2026 O'Reilly book. | The taxonomy is published in his O'Reilly Radar article; the current book listing is June 2027. | UPDATE source/date; keep taxonomy. |
| Gemini Pokémon poisoning/repetition. | Google's Gemini 2.5 report documents impossible-goal poisoning and an anecdotal >100K repetition observation in an agent/game. | KEEP + CITE with scope. |
| 46 tools failed; 19 succeeded. | Specific quantized Llama 3.1 8B GeoEngine experiment. | QUALIFY to that setup. |
| Periodic reminders mitigate degradation. | Martin/Roger 2026 says reminders throughout long monitoring transcripts partially mitigated degradation; code is public. | KEEP + CITE with scope. |
| Handover before 30% context. | Exact practitioner source not recovered; no universal threshold. | UNRESOLVED — PRESERVE or label as the book's conservative heuristic. |

Sources: [OpenAI GPT-5.5](https://openai.com/index/introducing-gpt-5-5/); [Chroma Context Rot](https://www.trychroma.com/research/context-rot); [NoLiMa paper](https://openreview.net/pdf/c6af0aaba1665ff08328e05813dc66036d6703fa.pdf); [Microsoft/ICLR multi-turn study](https://www.microsoft.com/en-us/research/publication/llms-get-lost-in-multi-turn-conversation/); [Breunig, Working with Contexts](https://www.oreilly.com/radar/working-with-contexts/); [Gemini 2.5 report](https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf); [Classifier Context Rot](https://arxiv.org/abs/2605.12366) and [code](https://github.com/samm393/classifier-context-rot).

## Chapter 3 — persistent context and memory

| Claim family | Evidence and scope | Disposition |
|---|---|---|
| Salesforce: 45 minutes/day re-establishing context. | Salesforce/YouGov supports a context gap, 76%, and an average of four toggled AI tools; no primary 45-minute figure found. | UNRESOLVED — PRESERVE pending exact report. |
| Dreaming launched June 2026. | OpenAI says Dreaming began April 2025; a more capable Dreaming-based architecture launched 2026-06-04. | UPDATE chronology; KEEP Dreaming. |
| Dreaming works in the background across chats and updates memory over time. | OpenAI explicitly documents background curation, synthesis, updating and a reviewable summary. | KEEP + CITE. |
| Dreaming V3: 41.5% to 82.8%. | Labels/values appear in OpenAI's chart; percentages are vendor internal evals read from that chart without a released replication method. | KEEP as “OpenAI internal evaluation,” with limitation. |
| 96% of memory entries were system-created. | Dash et al. analyzed 2,050 entries from 80 users; 96% had no explicit memory request. This sampled the earlier system. | KEEP + CITE with population/scope. |
| Claude imports memory from other AI providers in 60 seconds. | Anthropic officially documents import/export. “60 seconds” is secondary hands-on timing, not a vendor promise. | KEEP feature; QUALIFY timing. |
| Anthropic cut 2,686 words to about 500 with no loss. | Anthropic officially reports removing over 80% of Claude Code's system prompt with no measurable coding-eval loss; exact counts are a secondary measurement. | KEEP official result; label exact counts secondary. |
| Microsoft “instructions hygiene” quotation. | Microsoft's 2026-08-12 engineering post uses the exact smallest-high-signal-set formulation. | KEEP + CITE. |
| Three to five samples is optimal. | No universal controlled optimum found. | QUALIFY as a starting point to test. |

Sources: [OpenAI Dreaming](https://openai.com/index/chatgpt-memory-dreaming/); [Algorithmic Self-Portrait](https://arxiv.org/abs/2602.01450); [Claude memory import/export](https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude); [Anthropic context engineering](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models); [Microsoft Instructions Hygiene](https://devblogs.microsoft.com/dotnet/instructions-hygiene-what-frontier-models-still-need-you-to-say/); [Salesforce context survey](https://www.salesforce.com/news/stories/ai-tools-lack-job-context/).

## Chapters 4–6 — briefing, voice and repair

| Claim family | Evidence and scope | Disposition |
|---|---|---|
| 96–99% fact retrieval at one million tokens. | Narrow vendor needle tests can score highly; NoLiMa shows much weaker semantic retrieval. | UPDATE to distinguish literal retrieval from reasoning/semantic retrieval. |
| Irrelevant context harms performance. | Supported by Chroma, NoLiMa and Breunig. | KEEP + CITE. |
| 200K irrelevant vs 128K selected context; hallucinated joins. | Exact original comparison/quotation not recovered. | UNRESOLVED — PRESERVE; broader principle is supported. |
| Two or three examples are the universal sweet spot/single biggest gain. | Few-shot is established; no universal optimum/ranking. | QUALIFY: test one to three representative examples. |
| First uploaded document gets most attention. | Position effects do not prove a universal file-ingestion rule. | UPDATE: name the priority source explicitly. |
| Every major tool supports image/audio/video. | Varies by product, plan, model, mode and region. | UPDATE. |
| Next-word mechanism. | Pedagogically sound; technical unit is a token and output also reflects post-training/instructions/tools. | UPDATE “word” to “token.” |
| MindStudio 88% agreement/15% reversal. | Exact study/method not found after organization/number searches. | UNRESOLVED — PRESERVE. |
| MIT “delusional spiraling.” | A 2026 MIT-affiliated modelling paper supports the concept, not the separate 88%/15%. | KEEP + CITE with method. |
| GPT-5.5 better pacing. | GPT-5.5 exists; its May Instant update reports better pacing/fewer overly long responses. | UPDATE date/wording; keep product. |
| Opus 5 is generally too verbose. | Opus 5 exists; Anthropic's launch says clearer/more concise. The attributed observation was not recovered as a general fact. | UNRESOLVED — PRESERVE only as a dated reviewer's observation. |
| First 3–4 repair iterations capture most gains. | Kiecker et al. reports this for software-engineering repair/testing/translation, not universal prose editing. | KEEP + CITE with scope; use as motivation, not proof. |

Sources: [OpenAI sycophancy postmortem](https://openai.com/index/sycophancy-in-gpt-4o/); [Delusional Spiraling](https://arxiv.org/abs/2602.19141); [OpenAI model release notes](https://help.openai.com/en/articles/9624314-model-release-notes); [Claude Opus 5](https://www.anthropic.com/news/claude-opus-5); [repair-loop paper](https://arxiv.org/abs/2607.05197).

## Chapter 7 — tools, modes and plans

| Claim family | Evidence and scope | Disposition |
|---|---|---|
| Work, Cowork, GPT-5.5/5.6 and Opus 5 exist. | Official current OpenAI/Anthropic sources document all of them. | KEEP + CITE. |
| Chat/Work/Codex and Chat/Cowork/Code mapping. | Supported as a useful current mapping, not a universal taxonomy. | KEEP + CITE with qualifier. |
| Paid ChatGPT users no longer choose named models. | Controls emphasize speed/effort, but model/legacy options remain plan/workspace/rollout dependent. | UPDATE. |
| Claude effort controls. | Anthropic documents effort settings for Opus 5. | KEEP + CITE; avoid universal UI detail. |
| 14-task comparison: free/paid gap 8–15%. | Exact comparison/method not recovered. | UNRESOLVED — PRESERVE. |
| Paying typically prevents training use. | False for OpenAI personal Plus/Pro defaults. Personal users can opt out; business/API defaults differ. | UPDATE urgently; never infer privacy from payment. |
| ChatGPT Plus is US$20/month. | Current OpenAI help supports the price and plan-specific features. | KEEP + CITE with date/region caveat. |
| Platform “best at” rankings. | Vendor sources establish features, not universal rankings. | QUALIFY to task-fit observations and a reader-run comparison. |

Sources: [ChatGPT Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex); [ChatGPT release notes](https://help.openai.com/en/articles/6825453-gpt-4); [ChatGPT Plus](https://help.openai.com/en/articles/6950777); [personal-plan data use](https://help.openai.com/en/articles/8983130-how-does-chatgpt-use-my-data); [business/API data terms](https://help.openai.com/en/articles/10306912); [Claude Opus 5](https://www.anthropic.com/news/claude-opus-5).

## Chapter 8 — jagged frontier and delegation

| Claim family | Evidence and scope | Disposition |
|---|---|---|
| BCG: 12.2% more tasks, 25.1% faster, about 40% higher quality; outside frontier 19% less likely correct. | Harvard/BCG reports these results for 758 consultants and the tested tasks. | KEEP + CITE with population/task. |
| 50%-reliability task horizon doubles every seven months. | METR documents the historical trend on evaluated, well-specified, primarily software tasks and cautions about external validity. | KEEP + CITE with scope. |
| Expert baselines crossed in multiple fields. | Direction credible but sentence lacks named benchmarks/versions. | QUALIFY or source each benchmark. |
| Current tools are 85–95% right. | No universal accuracy range across heterogeneous tasks. | UPDATE to “often valuable with review.” |
| Wharton: N=1,372; 79.8% followed wrong AI advice. | Sample/concept supported. 79.8% applies to Study 1 consulted faulty-AI trials, not all participants. | KEEP + CITE; correct denominator. |

Sources: [Harvard/BCG paper](https://www.hbs.edu/ris/Publication%20Files/dell-acqua-et-al-2026-navigating-the-jagged-technological-frontier_5c589c8c-fbb5-458f-b285-c944746cd717.pdf); [METR time horizons](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/); [Wharton explanation](https://executiveeducation.wharton.upenn.edu/thought-leadership/wharton-at-work/2026/05/thinking-fast-slow-and-artificially/).

## Chapters 9–10 — grounding and agents

| Claim family | Evidence and scope | Disposition |
|---|---|---|
| Search/files/code/apps change access and action. | Current OpenAI docs support each category; permissions/availability vary. | KEEP + CITE. |
| Search makes answers grounded/correct. | Retrieval makes evidence traceable; sources may still be old, irrelevant, copied or misread. | UPDATE grounding definition. |
| CJR: >60% source-attribution errors, August 2026. | Tow Center tested eight tools/1,600 queries in March 2025 and reported >60% incorrect overall, fabricated links and attribution errors. | KEEP result; UPDATE date/task. |
| Without code execution AI is estimating. | Non-executed arithmetic may be correct but is not auditable. | UPDATE to “unverified.” |
| Citations/specificity prove grounding. | They are signals, not proof. | UPDATE. |
| Work/Cowork pursue multi-step outcomes and scheduled work. | Official docs support agentic files/apps work; OpenAI says Work can run once, repeat, trigger or monitor. | KEEP + CITE; qualify availability. |
| “AI Chief of Staff” is most popular; five hours/week saved. | Workflow plausible; no population source for “most popular”; exact anecdote not recovered. | QUALIFY; anecdote UNRESOLVED — PRESERVE. |
| Mollick delegation quotations. | Exact January/July posts not recovered from manuscript attribution. | UNRESOLVED — PRESERVE; framework may remain as book guidance without quotation. |

Sources: [CJR/Tow Center study](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php); [OpenAI data analysis](https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt); [Apps in ChatGPT](https://help.openai.com/en/articles/11487775/); [ChatGPT Work files](https://help.openai.com/en/articles/20001278-creating-and-editing-documents-spreadsheets-and-presentations-with-chatgpt-work); [Anthropic finance agents/Cowork](https://www.anthropic.com/news/finance-agents).

## Chapters 11–13 — verification and repeatability

| Claim family | Evidence and scope | Disposition |
|---|---|---|
| Fluent output can fabricate facts/citations. | CJR and vendor incident reports support the risk. | KEEP + CITE. |
| Two or three correct spot-checks imply the rest is probably accurate. | Samples are evidence, not proof; checking scales with stakes/density. | UPDATE. |
| Agents cannot ask questions. | Agents may pause, ask or request approval; do not depend on synchronous clarification. | UPDATE. |
| AI never learns between sessions unless the brief changes. | Current products may retain memory, project instructions or workflow state; a one-off correction still is not reliably durable. | UPDATE to save and verify learning in the actual persistence mechanism. |
| 3–5 workflows cover most work; weekly review takes ten minutes. | Useful starting suggestions, not population findings. | QUALIFY. |
| Final paid/free privacy distinction. | Same personal-versus-business correction as Chapter 7; employer/provider rules vary. | UPDATE. |
| User accountability for adopted output. | Sound norm; legal/disclosure duties vary by employer, client, sector and jurisdiction. | KEEP with qualifier. |

## Unresolved direct attributions — preserve pending source restoration

AI UX Dispatch (Feb 2026); DataCamp (Aug 2026); TheAIMarketer (Mar 2026); Forbes's two 2026 AI-writing lists; unnamed Aug 2026 writer; SlowAI (Mar 2026); Ethan Mollick (Jan/Jul 2026); Matt Paige (May 2026); Christie Johansen-Pinney (Aug 2026); AgentStack (Jun 2026); IdeaPlan (Jun 2026); Asian Efficiency (Aug 2026); unnamed Jun 2026 developer; unnamed 30% handover practitioner; unnamed self-correction researcher; unnamed 8–15% free/paid comparison.

## Editorial rules earned by this audit

1. Preserve verified products. Put volatile menus, plans, pricing and data controls in dated tool cards where practical.
2. Label vendor internal evaluations and their missing replication details.
3. Give studies their population, task and denominator.
4. Keep useful practical rules as LAiDIES methods, not universal research laws.
5. Never turn discovery failure into deletion. `UNRESOLVED — PRESERVE` is a valid state.
6. Re-open every official product source immediately before release.

## Final candidate reconciliation

The current candidate applies the packet's decision-changing dispositions:

- preserves and dates Dreaming, Work, Cowork, GPT-5.5 and Claude Opus 5;
- distinguishes the accepted NoLiMa paper's 13/11 result from the later mutable
  repository count;
- corrects personal-plan versus business/API data-use defaults and says payment
  alone is not a privacy test;
- constrains Wharton's 79.8% to consulted faulty-AI trials in Study 1;
- corrects the CJR study to March 2025, eight tools and 1,600 queries;
- defines tool use and citations as routes to inspectable evidence, not proof of
  grounding or correctness;
- removes the universal 85–95% accuracy range, 30% context threshold, universal
  one-million-token claim and universal free/paid/tool rankings;
- states that an agent may ask, pause or request approval, so delegation cannot
  depend on synchronous clarification;
- converts three-to-five samples/workflows and ten-minute reviews into starting
  heuristics to test; and
- retains unresolved direct attributions in this packet rather than treating a
  failed search as evidence that the underlying idea or product is false.

This reconciliation binds research disposition to the edited bytes. The
release recheck reopened the current official documentation for ChatGPT Work,
personal and business data defaults, Claude Opus 5, Claude memory transfer,
OpenAI Dreaming and Microsoft's 39% multi-turn finding. Unresolved direct
quotations remain preserved in this packet rather than being presented as
verified primary evidence.
