# QUESTION A — How do you test "is this explained well?" mechanically enough to BLOCK, without it becoming a rubber stamp?

**Compiled:** 2026-07-22. All web sources fetched or re-verified 2026-07-22 UTC.
**Extends (does not redo):** `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/research/agent-operations-playbook.md` §A5, §A6, §C6, §D5.
**Calibration pair used throughout:**
PASS — `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/content/episodes/episode-01.canon.md` + `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/audio/episode-01-elevenlabs-v3-tagged.txt`
FAIL — `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/audio/episode-05-elevenlabs-v3-tagged.txt`

Labels: **[FACT]** primary source, fetched · **[OPINION]** named practitioner · **[INFERENCE]** my reasoning · **[NOT VERIFIED]** could not confirm · **[MEASURED]** I ran it on your own files today and this is the output.

---

## 0. The answer in one page

The Ep5 file is not badly *written*. It is badly *proportioned*, and proportion is arithmetic.

I ran three measurements on your calibration pair today. All three separate Ep1 from Ep5 cleanly, and none of them requires an LLM:

| Measure | Ep1 (PASS) | Ep4 | Ep5 (FAIL) | Separation |
|---|---|---|---|---|
| **Metaphor-carry ratio** — share of teaching sentences that vanish when you delete the declared metaphor words | **10%** | 4% | **52%** | 5× |
| **Synonym pile-up** — most surface labels used ≥2× for one concept | **3** | — | **8** | 2.7× |
| **Named products inside the passage that answers the episode's question** | **3** | — | **0** | absolute |

[MEASURED] Script and method in §1. These are your files, today.

And for contrast, the gate you have now:

> `bash operations/check-episode.sh 5` → **`0 fail · 2 warn`, exit 0.**
> `bash operations/check-episode.sh 1` → **`0 fail · 2 warn`, exit 0.**

[MEASURED] The existing gate returns a byte-identical verdict for the gold standard and for the file that stopped production. That is not a gate that's slightly miscalibrated. On this pair it carries **zero information**.

So the design is:

1. **Seven mechanical checks** that block, all deterministic scripts, all of which fail Ep5 today and pass Ep1. Cost: ~2 seconds, $0.
2. **Three judged checks**, each a single binary question, each forced to quote the offending text, each run against a 20–50 item golden set weekly to prove it hasn't gone soft. Cost: pennies.
3. **One human gate, moved upstream** — Ali approves a one-page *Substance Sheet* before a word of prose exists. ~6 minutes of her time, once a week, and it is the only place her taste is spent.

The gate never tries to decide whether the episode is *good*. It decides whether the episode is **eligible to be shown to Ali** — and it makes her yes/no cost six minutes instead of twenty.

---

# 1. What is actually mechanically checkable about explanation quality

## 1.1 Readability metrics — largely folklore for this purpose. Do not build.

**Verdict: [FACT] they do not measure what you need, and [MEASURED] they do not separate your pair.**

- **[FACT]** Redish, J. (2000), *Readability formulas have even more limitations than Klare discusses*, ACM Journal of Computer Documentation 24(3):132–137 — https://dl.acm.org/doi/10.1145/344599.344637 · PDF https://redish.net/wp-content/uploads/Redish_on_Readability_Formulas.pdf. The formulas were developed for children's school books, not adult prose; they ignore between-reader differences; they are compared unfavourably to direct usability testing with real readers.
- **[FACT]** AHRQ (US Agency for Healthcare Research and Quality), *Tip 6: Use Caution With Readability Formulas for Quality Reports* — https://www.ahrq.gov/talkingquality/resources/writing/tip6.html (living page, fetched 2026-07-22; the page body did not return on fetch — the title and agency position are confirmed from the search index, so treat the specific wording as **[NOT VERIFIED]** and the general position as [FACT] via Redish).
- **[FACT]** The construct-validity problem, stated plainly in the readability-corpus literature (Behavior Research Methods, https://link.springer.com/article/10.3758/s13428-022-01802-x, 2022): Flesch-Kincaid uses *characters per word* as a proxy for word sophistication and *words per sentence* as a proxy for syntactic complexity. Neither proxy has any relationship to whether an idea was explained.

**Why it fails you specifically.** Every defect in Ep5 is invisible to a syllable counter. "There's the careful one — the one you reach for when it's code" is short, plain, low-grade-level prose. It is also the exact sentence that fails, because it refuses to say *Claude*. A readability formula would score that passage as your **best** writing.

**[INFERENCE]** The one adjacent thing worth keeping is **sentence-length variance**, not sentence length — a script that flags a paragraph where every sentence is within ±3 words of the mean catches the "perfectly symmetrical sections that feel generated" pattern the writing lock already bans (`operations/voice/laidies-writing-lock.md` line 58). That is a rhythm check, not a readability check, and it is a WARN not a FAIL.

## 1.2 Term consistency / synonym pile-up — REAL, fully automatable, and there is a 40-year-old industrial standard for it

**Verdict: build this. It is the cheapest real check in the document.**

This is not a novel idea. It is the founding principle of controlled language:

- **[FACT]** **ASD-STE100 Simplified Technical English** — the aerospace/defence controlled-language standard, current edition January 2025, "53 writing rules and a dictionary of approximately 900 approved words," where the approved vocabulary has **one meaning per word**. https://www.asd-ste100.org/ · https://www.asd-europe.org/standards-specifications/simplified-technical-english/
- **[FACT]** Compliance checkers exist and are boring, mature technology: the **Boeing Simplified English Checker** ("a powerful syntactic parser with a robust grammar of over 400 English-syntax rules") https://www.boeing.com/company/simplified-english-checker; and a **LanguageTool-based term checker** for STE issue 9 https://www.simplified-english.co.uk/.
- **[FACT]** For prose in a repo, **Vale** implements exactly this as its `substitution` extension point — "ensure correct usage of some technical and brand-specific terminology" — configurable at `error` severity so a CI build fails. https://docs.vale.sh/ · https://github.com/vale-cli/vale · practitioner writeups: Datadog https://www.datadoghq.com/blog/engineering/how-we-use-vale-to-improve-our-documentation-editing-process/, PostHog https://posthog.com/handbook/docs-and-wizard/vale.

**How it works here.** The canon file declares a `terms` block: one canonical surface term per concept, plus the banned alternates. The script counts distinct surface labels used ≥2× per concept and fails above a threshold.

**[MEASURED] Verdict on the calibration pair** (script run 2026-07-22 against the two narration masters, delivery tags stripped):

| Concept | Ep1 distinct labels used ≥2× | Ep5 distinct labels used ≥2× |
|---|---|---|
| the model | **3** (`models` 2, `editors-in-chief` 2, `brain` 2) | **6** (`model` 11, `face` 9, `star` 6, `supermodel` 4, `models` 4, `poster` 2) |
| the app | **0** | **8** (`store` 19, `app` 12, `shop` 7, `boutique` 6, `stores` 3, `boutiques` 2, `storefront` 2, `magazine` 2) |
| the company | **0** | **2** (`house` 15, `company` 10) |

Threshold **≤2 per concept (canonical + at most one declared analogy alias)** → **Ep5 FAILS on all three concepts. Ep1 passes.**

**This is the defect Ali logged on 2026-07-10 and it was still in the file on 2026-07-21.** A twelve-line script would have blocked it every single day in between. That gap — ruling recorded, draft unchanged — is the whole problem, and this is the check that closes it.

## 1.3 The "delete the metaphor" test — no named prior art, but I built it and it is the strongest signal I found

**Verdict: [NOT VERIFIED] as a named technique in the literature. [MEASURED] it works better than anything else I tested. Build it.**

**Prior art, honestly:** I searched for a named method that strips a declared figurative vocabulary from a draft and measures the residue. I did not find one. The nearest relatives are:

- **[FACT]** **Input-level ablation** in NLP — "isolating the contributions of different system components by removing them, one by one, and evaluating the modified system," applied at the input level to determine which parts of the input are necessary. https://en.wikipedia.org/wiki/Ablation_(artificial_intelligence) · overview of interpretation-analysis ablation https://arxiv.org/pdf/1811.04028. This is the same shape — remove a component, see whether the thing still works — but it has never, as far as I can find, been pointed at prose.
- **[FACT]** Controlled-language checking (§1.2) is the closest *practical* relative: both operate on a declared vocabulary list rather than on meaning.

So: label it a **bespoke check**, like the expiring-facts lint in the playbook §C7(3). It is not blessed by a paper. It is, however, the only measure I tested that reproduces Ali's own written rule — "the analogy is **garnish**; it decorates a clear idea; it never carries it" (`operations/voice/laidies-writing-lock.md` line 191).

**The method that works.** My first attempt was paragraph-level and it failed: strip metaphor sentences, count paragraphs that still contain a domain term. Result — Ep1 88%, Ep5 87%. **No separation.** [MEASURED] I am reporting the failed version because a check that looks sensible and doesn't discriminate is exactly the rubber stamp this report exists to prevent.

The version that works is **sentence-level and inverted**:

> **Metaphor-carry ratio** = (teaching sentences that contain a declared metaphor word) ÷ (all teaching sentences)
> where a *teaching sentence* is one containing a domain term (AI, model, app, tool, prompt, context, hallucination, draft, document, code, email, source, or a named product).

[MEASURED] 2026-07-22:

| File | teaching sentences | of which metaphor-carried | **ratio** |
|---|---|---|---|
| Ep1 (PASS) | 50 | 5 | **10%** |
| Ep4 | 26 | 1 | **4%** |
| **Ep5 (FAIL)** | 50 | 26 | **52%** |

Raw metaphor-token density separates too — Ep1 **1.4%** of all words, Ep4 **0.2%**, Ep5 **5.8%** — but the ratio is the better measure because it is scale-free and it maps directly onto the rule as written.

**Threshold: FAIL above 25%.** That sits 2.5× above your gold standard and 2× below the failing draft — wide enough that a legitimately metaphor-forward episode won't trip it, tight enough that Ep5 fails by a mile.

**Verdict on Ep5: FAILS (52% vs threshold 25%).**

**Input required:** the canon file must declare the episode's metaphor vocabulary — `metaphor_vocabulary: [house, boutique, supermodel, star, face, poster, window, counter, runway, floor plan, rack, couture, catwalk, season, ...]`. That declaration is itself useful: the writing lock already says "introduce a metaphor **once**, lightly; never build a parallel vocabulary." Writing the list down is the moment you notice you built one.

## 1.4 Concreteness and specificity — validated instruments exist; they are the wrong grain for you

**Verdict: real science, weak fit. Do not build the general version. Build the scoped version, which is trivial.**

The validated instruments are real:

- **[FACT]** **Brysbaert, Warriner & Kuperman (2014)**, *Concreteness ratings for 40 thousand generally known English word lemmas*, Behavior Research Methods 46:904–911 — 37,058 words + 2,896 two-word expressions, rated by 4,000+ participants, restricted to lemmas known by ≥85% of raters. https://link.springer.com/article/10.3758/s13428-013-0403-5 · https://pubmed.ncbi.nlm.nih.gov/24142837/ · free list https://github.com/ArtsEngine/concreteness · R package `doc2concrete` https://cran.r-project.org/web/packages/doc2concrete/doc2concrete.pdf
- **[FACT]** **Speciteller** (Li & Nenkova, *Fast and Accurate Prediction of Sentence Specificity*, AAAI 2015) — outputs a 0–1 specificity score per sentence, no POS tagging or parsing needed. https://github.com/jjessyli/speciteller · https://www.cis.upenn.edu/~nlp/software/speciteller.html · paper https://ojs.aaai.org/index.php/AAAI/article/view/9517 · domain-agnostic successor https://arxiv.org/pdf/1811.05085

**Why the general version fails you.** Ep5's failing passage is *lexically concrete*: "a fifty-page document you paste in whole," "your email and your calendar," "the Office apps you already live in." Concreteness norms would score it well. What's missing is not concrete nouns — it's **the proper noun that makes the sentence actionable**. Brysbaert's list doesn't contain "Claude."

**[MEASURED] The trap, demonstrated.** A naive whole-file named-product count would have **passed** Ep5:

| | Ep1 | Ep5 |
|---|---|---|
| ChatGPT / Claude / Gemini / Copilot mentions, whole file | 3 / 3 / 3 / 0 | **6 / 4 / 2 / 1** |

Ep5 names *more* products than Ep1 does. The check only works when it is **scoped to the passage that answers the question**:

> [MEASURED] The Ep5 "so — the floor, quickly" roster paragraph, which is the episode's entire practical payload: **0 named products.** "the big all-rounder… the careful one… the one wired into your day… the one from work."
> The Ep1 equivalent block (the three-words-before-you-go concept definitions): **3 named products.**

**The buildable check: `answer_passage` must name ≥1 product per option it offers.** Requires the canon file to declare which passage is the answer — one line, and one that Ali should be declaring anyway.

**Verdict on Ep5: FAILS (0 named products in a 4-option roster).**

## 1.5 Ratio measures — one is real and cheap, two are not

**Real: actionable-content ratio, scoped.** [MEASURED] Ep5 is 2,188 spoken words; the roster paragraph — the answer — is ~130 of them, **6%**. The brief's diagnosis said ~120 of ~1,400; measuring the narration master directly gives 130 of 2,188, so the diagnosis was right and if anything generous. A script that computes `len(answer_passage) / len(script)` and warns below a floor is ten lines. **[INFERENCE]** Set the floor at 12% as a WARN, not a FAIL — the right ratio for a story-led episode is a taste call and I have no evidence for a hard number.

**Not real: "question asked vs question answered."** [INFERENCE] Detecting that the opening question ("which one should I use?") was answered by a side-metaphor rather than by the core teaching requires understanding what answers what. There is no mechanical version. This becomes **JUDGED check J1** in §5, and it is the single question the judge is best suited to.

**Not real: "framing vs content."** [NOT VERIFIED] No validated instrument separates framing from payload in prose. Any script doing this is really just counting the metaphor vocabulary again (§1.3), so build that one and skip this.

## 1.6 Claim extraction and ledger matching — real, well-supported, and you already have the ledger

**Verdict: build it, but as a separate lane from teaching quality.**

- **[FACT]** Anthropic names this grader class directly: "**Groundedness checks** verify that claims are supported by retrieved sources, **coverage checks** define key facts a good answer must include, and **source quality checks** confirm the consulted sources are authoritative, rather than simply the first retrieved." — *Demystifying evals for AI agents*, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents (2026-01-09).
- **[FACT]** **Claimify** (Microsoft Research, 2025) is the current best-documented extraction method: three stages — **Selection** (which sentences are verifiable), **Disambiguation** (resolve ambiguity, and *decline to extract* when confidence is low), **Decomposition** (into checkable claims). Reported: 99% entailment rate between extracted claims and source, 87.6% of verifiable content captured at 96.7% precision. https://www.microsoft.com/en-us/research/blog/claimify-extracting-high-quality-claims-from-language-model-outputs/ · paper https://arxiv.org/pdf/2502.10855

**[INFERENCE] Applied here.** You already have `operations/facts-and-citations-ledger.md` (28KB) and a locked fact-verification rule. The missing mechanism is: extract every number, date, proper noun and capability claim from the master file; set-difference against the ledger; **block on any claim not in the ledger**. Ep1's own canon file has four ⏳ PENDING claims sitting in shipped prose right now — the Harvard 78:100 figure, the Lean In 23/27/32 figures, and the Fei-Fei Li quote. Those would all be caught.

Keep this in its own lane. It is a *truth* gate, not a *teaching* gate, and mixing them makes both harder to reason about.

---

# 2. LLM-as-judge, done properly

## 2.1 What Anthropic actually says — and one correction to the brief

Fetched verbatim from *Demystifying evals for AI agents*, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents (2026-01-09) **[FACT]**:

- Three grader families. **Code-based**: "Fast Cheap Objective Reproducible Easy to debug," but "Brittle to valid variations… Lacking in nuance." **Model-based**: "Rubric-based scoring / Natural language assertions / Pairwise comparison / Reference-based evaluation / Multi-judge consensus," which are "Flexible Scalable Captures nuance," but "Non-deterministic More expensive than code **Requires calibration with human graders for accuracy**." **Human**: "Gold standard quality Matches expert user judgment **Used to calibrate model-based graders**."
- Per-dimension isolation: "It can also help to create clear, structured rubrics to grade each dimension of a task, and then grade each dimension with an **isolated LLM-as-judge** rather than using one to grade all dimensions."
- Calibration: "LLM-as-judge graders should be **closely calibrated with human experts** to gain confidence that there is little divergence between the human grading and model grading."
- Anti-brittleness: "There is a common instinct to check that agents followed very specific steps… We've found this approach **too rigid and results in overly brittle tests**, as agents regularly find valid approaches that eval designers didn't anticipate."
- Golden set size: "Teams often delay building evals because they think they need hundreds of tasks. In reality, **20-50 simple tasks drawn from real failures is a great start**."

**⚠ Correction to the research brief.** The brief states that Anthropic's guidance says "**pairwise beats absolute scoring**." **It does not.** Anthropic lists pairwise comparison as *one of five* model-based grader techniques and makes no superiority claim. The pairwise-beats-absolute evidence is real but comes from elsewhere (§2.3) — and the playbook §C6 already attributes it correctly, to the MLLM-as-a-Judge benchmark. Worth fixing in the brief so nobody cites Anthropic for it.

**[FACT]** Claude Code's own verification ladder, re-fetched today from https://code.claude.com/docs/en/best-practices:

> "Claude stops when the work looks done. Without a check it can run, 'looks done' is the only signal available, and you become the verification loop… Give Claude something that produces a pass or fail, and the loop closes on its own."

Four escalating gates, verbatim: an in-prompt check; a `/goal` condition where "A separate evaluator re-checks it after every turn"; "**As a deterministic gate**: a Stop hook runs your check as a script and blocks the turn from ending until it passes. Claude Code overrides the hook and ends the turn after 8 consecutive blocks"; and "**By a second opinion**: a verification subagent… has a fresh model try to refute the result, so the agent doing the work isn't the one grading it."

And, new since the playbook was written — the page now has a dedicated **"Add an adversarial review step"** section, with this constraint verbatim **[FACT]**:

> "A reviewer prompted to find gaps will usually report some, even when the work is sound, because that is what it was asked to do. Chasing every finding leads to over-engineering… Tell the reviewer to flag only gaps that affect correctness or the stated requirements, and treat the rest as optional."

## 2.2 Judge reliability — the numbers, including the bad ones

**Agreement, best case.** **[FACT]** Zheng et al. (2023), *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena*, arXiv:2306.05685 — https://arxiv.org/abs/2306.05685: "strong LLM judges like GPT-4 can match both controlled and crowdsourced human preferences well, achieving **over 80% agreement, the same level of agreement between humans**." Eugene Yan's survey puts the specific figures at 85% GPT-4 vs human experts against 81% human-human, and 83–87% on Chatbot Arena **[OPINION, well-sourced]** — https://eugeneyan.com/writing/llm-evaluators/.

**Position bias.** **[FACT]** Wang et al. (2023/ACL 2024), *Large Language Models are not Fair Evaluators*, arXiv:2305.17926 / https://aclanthology.org/2024.acl-long.511/: "The quality ranking of candidate responses can be easily hacked by simply altering their order of appearance in the context" — **Vicuna-13B beat ChatGPT on 66 of 80 queries** purely by reordering. Per-model rates from MT-Bench **[OPINION via Yan]**: GPT-3.5 preferred the first position 50% of the time; Claude-v1, **70%**.

**Verbosity bias.** **[FACT]** Dubois, Galambosi, Liang & Hashimoto (2024), *Length-Controlled AlpacaEval*, arXiv:2404.04475 — https://arxiv.org/abs/2404.04475: AlpacaEval "is known to favor models that generate longer outputs"; the fix is a regression that asks the counterfactual "what would the preference be if the model's and baseline's output had the same length?" Magnitude **[OPINION via Yan]**: Claude-v1 and GPT-3.5 preferred longer responses **>90% of the time** at equivalent information content.

**Self-preference bias.** **[FACT]** Panickssery, Bowman & Feng (2024), *LLM Evaluators Recognize and Favor Their Own Generations*, arXiv:2404.13076 — https://arxiv.org/abs/2404.13076: models have "non-trivial accuracy at distinguishing themselves from other LLMs and humans out of the box," and there is "**a linear correlation between self-recognition capability and the strength of self-preference bias**." Magnitude **[OPINION via Yan]**: GPT-4 +10% win rate for its own output; Claude-v1 **+25%**.

**Reasoning-vs-rating gap.** **[FACT]** *The Comparative Trap* (arXiv:2406.12319, 2024) reports that even when a pairwise judge reaches the *wrong verdict*, **64 of 100 of its written explanations accurately described real weaknesses** matching manual annotation. **[INFERENCE] This is the single most design-relevant number in the section:** the judge's *prose* is more trustworthy than its *verdict*. Build the gate to harvest the prose and hand the verdict to Ali.

## 2.3 On WRITING QUALITY specifically — not code

This is where the evidence gets thinner and more honest.

**Pairwise > absolute, for subjective tasks — modestly.** **[FACT]** *Aligning with Human Judgement: The Role of Pairwise Preference in Large Language Model Evaluators* (arXiv:2403.16950, 2024): "pairwise comparisons lead to more stable results and smaller differences between LLM judgments and human annotations relative to direct scoring." But the effect is task-dependent — on the *objective* task (factual consistency) the difference was 0.47 pairwise vs 0.46 direct, i.e. nothing **[OPINION via Yan, tracing to 2403.16950]**. And the caveat is sharp **[FACT]**, *The Comparative Trap*, arXiv:2406.12319: pairwise "benefits turn into drawbacks when handling adversarial samples, as it makes evaluators more easily susceptible to intrinsic biases."

**Creative writing specifically.** **[FACT]** *LitBench: A Benchmark and Dataset for Reliable Evaluation of Creative Writing* (arXiv:2507.00769, 2025): "small and open-source LLM-judges fail to evaluate creative writing accurately," while "some leading proprietary models are competitive with trained verifiers." Translation: this only works at frontier scale, which for you means Opus or Sonnet 5, never Haiku.

**Teaching quality specifically — the discouraging finding.** **[FACT/partial]** Petukhova, Nguyen & Kochmar (2026), *Towards Pedagogically Aligned LLM Tutors for Math Mistake Remediation*, arXiv:2606.21502 — reported finding: Prometheus2's pedagogical annotations "correlate poorly (often negatively) with human labels, suggesting that LLM-as-judge evaluation is **unreliable for fine-grained tutoring dimensions**." ⚠ I could not extract the correlation table from the PDF; the finding is confirmed from the abstract-level summary but the **numbers are [NOT VERIFIED]**. Corroborating: the BEA 2025 Shared Task on pedagogical dimensions reports best 3-class macro-F1 ≈ 0.58–0.72 against human inter-annotator Fleiss' κ ≈ 0.65 — i.e. automatic scoring of *teaching* dimensions is roughly at the level of a mediocre human annotator, not a good one.

**[INFERENCE] What this means for your design.** A judge asked "is this well taught?" is operating in exactly the regime where the evidence says it is unreliable. A judge asked "**does the sentence answering the episode's opening question name a specific product, quote it**" is operating in the regime where the evidence says it is fine. **Every judged check in §5 is written as the second kind.** That is the whole trick.

## 2.4 The best available real-world protocol — Netflix, and it is almost exactly your problem

**[OPINION, named practitioner, unusually detailed]** Netflix Technology Blog, *Evaluating Netflix Show Synopses with LLM-as-a-Judge* — https://netflixtechblog.com/evaluating-netflix-show-synopses-with-llm-as-a-judge-6269251e6f28. Subjective creative-writing quality, house voice, expert writers as the standard. What they did:

- **~1,000 synopses labelled, three expert writers scoring each.** "Early instance-level agreement was low due to the subjectivity of the task."
- **Eight calibration rounds**, ~50 items per round, surfacing disagreements and evolving the guidelines each time. After eight rounds, **writer agreement reached ~80%**.
- They **switched from 1–4 Likert to binary scores.**
- Golden set: **~600 synopses with binary, criteria-level scores *and explanations*.**
- **A dedicated judge per criterion**, not one judge for everything. Output = "an explanation **before** its final score," plus a binary decision.
- Consensus scoring: 5× sampling with aggregation. Automatic prompt optimisation over ~300 samples.
- Result: **85%+ agreement with the creative writers.**

**[INFERENCE]** Note the order of operations. The humans calibrated *with each other first*, for eight rounds, before the judge existed. You have an advantage they didn't: **there is only one expert.** Ali cannot disagree with herself. So you skip the eight rounds of inter-annotator alignment and go straight to judge-vs-Ali alignment — but you inherit the rest of the recipe: binary, per-criterion, explanation-before-verdict, golden set of labelled examples.

---

# 3. The anti-rubber-stamp problem — the crux

## 3.1 First, the number that defines the whole problem

**[FACT]** Jain, Ahmed, Sahai & Leong, *Beyond Consensus: Mitigating the Agreeableness Bias in LLM Judge Evaluations*, arXiv:2510.11822 — https://arxiv.org/html/2510.11822v2. Across **14 LLMs** judging **366 high-school Python assignments**:

> "LLMs achieve high True Positive Rates (TPR) in classifying correct outputs (**often >96%**)… their True Negative Rates (TNR) for identifying invalid outputs remain low (**typically <25%**)."

Even the best model tested (Gemini 2.5-Pro) reached only **53.5% TNR**.

Corroborated independently: **[OPINION via Yan, tracing to *ChatGPT as a Factual Inconsistency Evaluator*, 2023]** GPT-3.5-turbo identified **>95% of consistent summaries but only 30–60% of inconsistent ones.** And **[FACT]** the leniency literature reports judge error distributions like "**29 false positives versus 2 false negatives**."

**Read that plainly: an LLM judge is nearly perfect at saying yes and nearly useless at saying no.** "Rubber stamp" is not a risk you might drift into. It is the **measured default behaviour** of an uncalibrated judge. Any design that does not attack this specific asymmetry is decoration.

**[INFERENCE] The three structural consequences, and they drive every choice in §5:**

1. **The mechanical checks must carry the blocking load.** A script has a TNR of 100% by construction. The judge is a supplement, never the floor.
2. **Every judged check must be phrased so that "fail" is the low-effort answer.** Not "is this well explained?" (yes is easy) but "**quote the sentence that answers the opening question**" (if there isn't one, the judge has nothing to paste, and empty is a fail).
3. **Judge performance must be measured as TNR on known-bad artifacts**, never as accuracy. Accuracy on a 90%-pass corpus is 90% for a judge that says yes to everything.

## 3.2 Calibration sets / golden sets — the discipline, and how big

**Size.** **[FACT]** Anthropic: "**20-50 simple tasks drawn from real failures is a great start**… In early agent development, each change to the system often has a clear, noticeable impact, and this large effect size means small sample sizes suffice." https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

**[OPINION]** Hamel Husain, *Using LLM-as-a-Judge For Evaluation* https://hamel.dev/blog/posts/llm-judge/ and *LLM Evals FAQ* https://hamel.dev/blog/posts/evals-faq/: "I start with around **30 examples** and keep going until I do not see any new failure modes," rising to "**100+ labeled examples**" for a judge you intend to trust. Netflix used ~600 **[OPINION]** — but they were judging thousands of synopses a week; you ship one episode.

**[INFERENCE] For LAiDIES: 24 items.** Twelve known-PASS, twelve known-FAIL. You can build it *today* without writing a single new sentence, because the failures already exist in your repo:

| Source | Label |
|---|---|
| Ep1 narration master, 6 excerpted passages | PASS ×6 |
| Ep4 narration master, 3 passages | PASS ×3 |
| Ep1 canon `cocktail_party`, `try_on`, `comparison` blocks | PASS ×3 |
| **Ep5 v3-tagged master** — the roster paragraph, the fashion-house paragraph, the payoff paragraph | **FAIL ×3** |
| `operations/audio/ep5-super-models-rewrite-candidate.md` (17KB, superseded) | FAIL ×2 |
| `operations/audio/ep5-council-rewrite-candidate.md` (12KB, superseded) | FAIL ×2 |
| Synthetic near-misses: Ep1 passages rewritten to introduce one defect each (synonym pile-up / anonymised payload / metaphor-carry) | FAIL ×5 |

The synthetic near-misses matter most. **[INFERENCE]** A golden set of obviously-good and obviously-terrible items proves nothing — any judge passes that. The items that detect rot are the ones that are *90% Ep1 with one defect inserted*, because that is what a drifting judge starts letting through first.

**The discipline.** Netflix's loop, generalised **[OPINION]** + **[FACT]** Anthropic's calibration requirement:

1. Ali labels each golden item PASS/FAIL **once**, with one sentence of why. (~40 minutes, one time.)
2. The judge is run over all 24 items. Report **TPR and TNR separately, never accuracy** — Hamel: "using raw agreement is generally not recommended and can be misleading when classes are imbalanced… measure precision and recall separately."
3. Ship the judge only when **TNR ≥ 0.83 (10 of 12 known-fails caught)**. TPR can be lower; a false alarm costs Ali ten seconds, a miss costs nine hours.
4. Re-run the golden set **on every episode**, as part of the same command that gates the episode. It costs pennies and ~30 seconds. If TNR drops below threshold, the *gate itself* fails and the episode does not get judged until the judge is fixed.
5. **Every time Ali rejects something the gate passed, that artifact is appended to the golden set as a FAIL.** This is the only mechanism that keeps the set alive.

Step 4 is the one people skip and it is the one that matters. **[OPINION]** Practitioner consensus is blunt about the consequence: "LLM judges may agree closely with human reviewers at launch, then drift significantly over time without anyone catching it until a routine SME audit… The judge can quietly stop measuring what it was supposed to measure, and every downstream decision built on those scores carries compounding error." (Galileo, https://galileo.ai/blog/calibrate-llm-judge-human-annotations — vendor content, treat as opinion, but it matches the mechanism.)

## 3.3 Criteria drift — the failure mode nobody plans for

**[FACT]** Shankar, Zamfirescu-Pereira, Hartmann, Parameswaran & Arawjo (2024), *Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences*, UIST '24 — https://dl.acm.org/doi/10.1145/3654777.3676450 · https://arxiv.org/pdf/2404.12272 · Berkeley PDF https://people.eecs.berkeley.edu/~bjoern/papers/shankar-validators-uist2024.pdf

The finding, in their words: **"criteria drift"** — "users need criteria to grade outputs, but grading outputs helps users define criteria." And: "Some criteria appear dependent on the specific LLM outputs observed (rather than independent and definable a priori), **raising serious questions for approaches that assume the independence of evaluation from observation of model outputs**."

**[INFERENCE] This is exactly what happened to LAiDIES, and it is worth naming precisely.** The rule "one term per concept" did not exist a priori. It exists because Ali read a draft on 2026-07-10 that called the model four things and *then* was able to name the rule. The 499-line writing lock is a fossil record of criteria drift — every line is a defect somebody saw first.

The design implication is not "write better criteria up front." It is: **the gate must be architected so that adding a criterion is cheap.** Concretely — every rule lives in one machine-readable file, the way `enforce-cut-decisions.py` already reads a ` ```banned ` block (playbook §D4a). Adding "one term per concept" should be adding a line to a YAML block, not editing a bash script. And the rubric file and the golden set must be versioned together, so you can always ask "which rule caught this, and when did we add it?"

## 3.4 Adversarial / refute-framing vs neutral scoring

**Evidence for:** **[FACT]** Anthropic's own escalation ladder: "a verification subagent… has a **fresh model try to refute the result**, so the agent doing the work isn't the one grading it." And the whole *Add an adversarial review step* section, new on the best-practices page. The rationale given is context-based, not bias-based: "A reviewer running in a fresh subagent context **sees only the diff and the criteria you give it, not the reasoning that produced the change**, so it evaluates the result on its own terms."

**Evidence against overdoing it:** **[FACT]** same page — "A reviewer prompted to find gaps will usually report some, even when the work is sound… Tell the reviewer to flag only gaps that affect correctness or the stated requirements."

**[INFERENCE] The resolution, and it is not a compromise.** Given §3.1 — TPR >96%, TNR <25% — over-flagging is *the cheap error* and under-flagging is *the expensive one*. Ali's cost of a false alarm is reading one quoted sentence and saying "that's fine." Her cost of a miss is what happened to Ep5. So: **frame adversarially, and control the over-flagging by narrowing the question, not by softening the framing.** "Find what's wrong with this" invites noise. "Quote the sentence that answers the opening question; if none exists, say NONE" is adversarial *and* scoped, and produces exactly one line of output.

Anthropic's own anti-over-flagging language, quoted verbatim in the playbook (§D3d), is the right prompt text and I'd reuse it unchanged for the coverage-style checks.

## 3.5 Requiring the judge to QUOTE the offending text — yes, and there is now direct evidence

This is the best-supported single intervention in this whole section.

- **[FACT]** Wang et al. (ACL 2024, arXiv:2305.17926) propose **Multiple Evidence Calibration**, which "requires the evaluator model to **generate multiple evaluation evidence before assigning ratings**," as one of three fixes for the position-bias failure. Evidence-before-verdict is the *first* thing the people who broke LLM judging reached for.
- **[FACT]** Hong, Yao, Shen, Xu, Wei & Dong (submitted 2026-01-13, revised 2026-05-27), *From Rubrics to Reliable Scores: Evidence-Grounded Text Evaluation with LLM Judges* (**Rulers**), arXiv:2601.08654 — https://arxiv.org/abs/2601.08654. Three stages: (1) convert human rubrics into **locked task-level specifications**; (2) execute with **checklist decisions, typed evidence grounding, and extractive quote verification**; (3) post-hoc calibration to human score boundaries. Result: "stronger human-score agreement in most evaluated settings across multiple frozen backbone models," with "improved stability under rubric variations." Benchmarks include essay scoring and EFL writing evaluation — i.e. *writing quality*, which is your case. The paper's own conclusion is the design principle: reliable judging "requires fixed criteria, traceable evidence, and calibrated score interpretation **rather than prompt phrasing alone**."
- **[FACT]** Netflix ship it in production: judge output is "an explanation **before** its final score."
- **[FACT]** CoT-before-verdict is the one debiasing strategy that held up universally in the 2026 systematic study (§3.7): S5 (chain-of-thought) was "universally positive across benchmarks; best performer on adversarial LLMBar data."

**[INFERENCE] The extractive part is what does the work, not the reasoning.** A judge asked to *reason* can reason its way to a compliment. A judge required to **paste a verbatim span that exists in the file** either finds one or does not — and "does not" is mechanically detectable, because you can check the quote against the source with `str.find()`. **A judged check whose output is a quote is a judged check with a mechanical backstop.** If the judge returns a quote that isn't in the file, the gate fails on hallucination, not on taste. That converts an unfalsifiable verdict into a falsifiable one, and it is the single most important structural idea in this report after §3.1.

## 3.6 Forced-choice and forced-failure designs

**[FACT]** Kiritchenko & Mohammad (ACL 2017), *Best-Worst Scaling More Reliable than Rating Scales* — https://aclanthology.org/P17-2074/ · https://arxiv.org/abs/1712.01765: with the same total number of annotations, **best-worst scaling produces significantly more reliable results than rating scales**, and "BWS with 3N annotations matches the reliability of rating scales with 10N." This is human-annotation research, but the mechanism — forcing a choice among items rather than assigning a number to one item — transfers, and is the theoretical basis for why pairwise LLM judging outperforms absolute scoring on subjective tasks (§2.3).

**[FACT]** Binary over Likert is the consistent practitioner finding: Hamel — "If your evaluations consist of a bunch of metrics that LLMs score on a 1-5 scale (or any other scale), **you're doing it wrong**… People don't know what to do with a 3 or 4"; "Binary evaluations force clearer thinking and more consistent labeling. Likert scales introduce significant challenges" because "middle values hide uncertainty." Netflix independently made the same switch mid-project.

**[INFERENCE] The forced-failure design that fits LAiDIES.** Three shapes, in descending order of how much I trust them:

1. **Extractive forced-choice (best).** "Quote the single weakest teaching sentence in this file, verbatim. You must return exactly one sentence and it must appear in the file." The judge cannot decline. The output is checkable. And it is *directly useful* — it's a rewrite target, not a score. This is the design I'd build.
2. **Pairwise against the gold standard.** "Here is the Ep1 narration master and here is this week's. On the dimension *plain teaching leads and the analogy garnishes*, which one does it better? You must pick one." Rooted in [FACT] pairwise > absolute for subjective tasks, and it encodes your standing rule that Ep1 *is* the bar (writing lock line 14: "If a draft does not feel like it belongs beside Episode 1, it is not done"). Caveat [FACT]: pairwise degrades on adversarial inputs, and position must be swapped — run both orders, disagreement = FAIL.
3. **Absolute scoring (do not build).** No 1–5s. No "quality score." Every source above says don't.

## 3.7 Multiple independent judges + agreement thresholds — mostly not worth it, with one exception

The optimistic result: **[FACT/secondary]** Verga et al. (2024), **PoLL — Panel of LLM Evaluators**: three small models from different providers beat a single large judge across six datasets, at lower cost, by reducing intra-model bias.

The 2026 correction, and it is severe: **[FACT]** Kohli (Apple), *Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels*, arXiv:2605.29800 — https://arxiv.org/html/2605.29800 (2026-05). A **9-judge panel across 7 model families** behaves as though it has "**only about 2 independent votes' worth of information**": Kish effective sample size **n_eff ≈ 2.18** (95% CI 2.07–2.31), mean pairwise error correlation **φ̄ = 0.391**, independence ratio **24.2%**. Against the single best judge the panel scored +0.2pp on MNLI, **−6.5pp on SNLI, −2.5pp on AlphaNLI**. Even with oracle access, sophisticated aggregation closed at most 11% of the gap — "**the bottleneck is correlated inputs, not the algorithm**." First five judges capture 90% of achievable independence; judges 6–9 add +0.22 effective votes.

And: **[FACT/secondary]** panels "incur unbounded bias under any positive contamination… whenever a single judge fails in a biased, LLM-typical way (mode collapse, sycophancy, safety refusal)" — which is precisely the agreeableness failure of §3.1, i.e. the exact failure a panel is powerless against because every member shares it.

**The exception.** **[FACT]** *Beyond Consensus* (arXiv:2510.11822) tested a **minority veto** — "requiring just **4 of 14** validators to mark output as 'invalid'" — and got TNR **30.9% vs majority voting's 19.2%**, with 2.8% maximum error. Better still, their regression framework calibrated on human-labelled data hit **1.2% maximum error with five calibration sets** versus 15.8% with zero — a 2× improvement over the best ensemble.

**[INFERENCE] For LAiDIES:** do not build a panel. Build **one judge, per criterion, with a minority-veto disposition** — i.e. sample the same judge 3× (Netflix use 5×) and treat **any single FAIL as a FAIL**. That captures the veto benefit at 3× the cost of one call (still under a cent) without the coordination and without pretending three correlated models are three opinions. And note what the *Beyond Consensus* result actually says: **calibration data beat ensembling by 2×.** Your effort belongs in the golden set, not in the judge count.

## 3.8 How judge gates rot, and what to do — summary table

| Rot mechanism | Evidence | Countermeasure in the §5 design |
|---|---|---|
| **Agreeableness / leniency** — judge says yes to everything | [FACT] TPR >96% / TNR <25% across 14 models, arXiv:2510.11822 | Mechanical checks carry the block; judged checks are extractive; 3× sample with any-FAIL veto |
| **Criteria drift** — the standard changes as Ali reads drafts | [FACT] Shankar et al., UIST 2024 | Rules in one machine-readable file; adding a rule = one line; rubric versioned with golden set |
| **Golden-set staleness** — the set stops representing current failures | [OPINION] practitioner consensus; [FACT] Anthropic "drawn from real failures" | Every Ali rejection is appended to the set as a FAIL, same week |
| **Silent judge regression** — model update or prompt edit quietly changes behaviour | [FACT] Rulers: "stability under rubric variations" is a measured property, arXiv:2601.08654 | Golden set re-run on every episode; TNR < 0.83 fails the *gate*, not the episode |
| **Position / verbosity / self-preference bias** | [FACT] arXiv:2305.17926, 2404.04475, 2404.13076 | No pairwise without order-swap; no absolute scores; judge model ≠ writer model |
| **Approval fatigue on the human side** | [FACT] Anthropic: "users approved roughly **93%** of permission prompts," https://www.anthropic.com/engineering/how-we-contain-claude | Exactly ONE human gate per episode, on a one-page artifact (§4) |
| **Over-flagging → the human starts ignoring the gate** | [FACT] Claude Code best practices, adversarial-review caveat | Every judged check returns ≤1 quoted sentence; hard cap of 5 findings per run |

---

# 4. Where the human approval belongs, and on what artifact

## 4.1 The pattern, honestly sourced

Ali's own prescribed-but-unbuilt fix — "write the plain, correct, genuinely-useful notes; **Ali confirms it's useful**; only THEN write prose" (memory `ep5-usefulness-critique-2026-07-10`) — is a specific instance of a general pattern: **approve the cheap upstream artifact, not the expensive downstream one.**

**What supports it:**

- **[FACT]** Anthropic ships this as a recommended workflow. From https://code.claude.com/docs/en/best-practices, verbatim: *"I want to build [brief description]. Interview me in detail using the AskUserQuestion tool… Keep interviewing until we've covered everything, then **write a complete spec to SPEC.md**." … "Once the spec is complete, start a fresh session to execute it… **Time spent making the spec precise pays off more than time spent watching the implementation.**"* And: "The most useful specs are self-contained: they name the files and interfaces involved, **state what is out of scope**, and end with an end-to-end verification step."
- **[FACT]** Anthropic's approval-fatigue data (§3.8) is the negative case for the alternative: 93% of prompts approved means a human asked to approve many things approves them all. One gate beats five.
- **[FACT]** Playbook §A6 already reached this conclusion: "The founder should not be the bug-catcher; she should be the *taste* gate… approval concentrated at a small number of irreversible, judgement-dense points."

**What does NOT support it, and I want to be straight about this:** the classic justification — Boehm's cost-of-defect curve, "10× more expensive to fix at each later stage" — **is contested**. **[FACT]** Laurent Bossavit, *The Leprechauns of Software Engineering* (https://leanpub.com/leprechauns/read), traces the curve to sources he finds methodologically inadequate; and Menzies et al., *Are Delayed Issues Harder to Resolve? Revisiting Cost-to-Fix of Defects throughout the Lifecycle* (arXiv:1609.04886) reports NASA Johnson data where cost to fix non-critical defects was roughly flat across phases (1.2 hours early vs 1.5 hours late). **Do not build the case on the 1:10:100 curve.**

**[INFERENCE] The case that does hold, and it's simpler.** It isn't about defect economics. It's about **which artifact Ali can judge accurately in six minutes.** She can read a one-page substance sheet and know instantly whether it's useful, because usefulness is all that's on the page. She cannot read a 2,200-word script and isolate usefulness from voice, rhythm, jokes, and pacing — she has to *feel* it, which takes twenty minutes and, on Ep5, took nine hours and still produced a rejection. The upstream artifact isn't cheaper to fix. It's **cheaper to judge**, and Ali's judgement is the scarce resource.

## 4.2 The artifact: the SUBSTANCE SHEET

One page. Plain sentences. **No voice, no jokes, no analogy, no LAiDIES vocabulary.** Written the way you'd explain it in chat — which is Ali's own stated test (`plain-teaching-garnish-not-carry`: "the way we laid it out during our chats is much clearer than what's coming out in the article").

Lives at `content/episodes/episode-0N.substance.md`. Format:

```
# Ep N — SUBSTANCE SHEET            status: AWAITING ALI

## 1. The question she walks in with        (one sentence, her words)
## 2. The answer                            (one sentence, plain, no metaphor,
                                             must contain a decision she can act on)
## 3. What she can DO differently on Thursday  (2–4 lines, each: TRIGGER → ACTION → WHY)
     — every line names a real product
## 4. The mechanic                          (≤5 plain sentences; how it actually works.
                                             Zero metaphor words.)
## 5. Why she'd get this wrong               (the mistake this episode prevents)
## 6. Facts used                             (each: claim · source · ledger line no.)
## 7. Out of scope                           (what this episode deliberately does NOT cover)

## 8. Metaphor declaration                   ← the gate's input, not Ali's decision
     concept → canonical term → allowed alias (max 1)
     metaphor_vocabulary: [ ... ]
     answer_passage_id: §2 + §3
```

Sections 1–7 are for Ali. Section 8 is the machine contract: it is what §1.2 and §1.3 check the finished script against. **[INFERENCE]** Putting the metaphor declaration on the same page as the substance is deliberate — writing out "here are the 40 words I'm going to use as decoration" immediately next to "here are the 5 plain sentences that do the teaching" makes the proportion visible before a word of prose exists.

**Ali's action: two buttons. "Useful" / "Not yet — here's what's missing."** Nothing else. No line edits, no voice notes. Voice is downstream and gated by scripts.

## 4.3 What the Ep5 Substance Sheet would have said

Built from the Ali-endorsed shape recorded verbatim in `ep5-usefulness-critique-2026-07-10`.

**What she would have been shown:**

```
# Ep 5 — SUBSTANCE SHEET

## 1. The question she walks in with
   "There are five of these things. Which one am I supposed to use — and why does
   the one at work feel exactly like the one at home?"

## 2. The answer
   Pick by job, not by brand: ChatGPT for speed and volume, Claude for anything where
   being wrong is expensive. The one at work feels familiar because it is often
   literally the same model, sold through a different shop.

## 3. What she can DO differently on Thursday
   - Two-line email, a first draft, thinking out loud   → ChatGPT.  Fast, confident,
     hands you a lot.
   - The contract where one missed clause costs you     → Claude.  It actually reads
     the whole sixty pages instead of skimming, and it tells you the part that's
     wrong instead of just pleasing you.
   - Something that needs her calendar or her inbox     → Gemini.  It already lives
     where her mail and calendar are.
   - Anything inside Word, Excel, Outlook               → Copilot.  Same models she
     already knows, wearing the company badge.

## 4. The mechanic
   A company builds a model. The model is the thing that does the work.
   The app is just the shop where you buy access to it.
   ChatGPT is OpenAI's shop. Claude is Anthropic's shop.
   Microsoft doesn't only sell its own — Copilot resells OpenAI's and Anthropic's models too.
   That's why work feels familiar: same model, different shop.

## 5. Why she'd get this wrong
   She assumes the app name is the product, so when the app changes behaviour
   overnight she thinks she's doing something wrong. She isn't — they swapped the model.

## 6. Facts used
   - Copilot can route to Microsoft, OpenAI and Anthropic models · source · ledger #__
   - [each remaining claim, with ledger line]

## 7. Out of scope
   Which model tier inside a shop (that's Ep6). Specialist tools (a later episode).

## 8. Metaphor declaration
   the company → "company"   (alias: "house")
   the model   → "model"     (alias: "supermodel")
   the app     → "app"       (alias: "store")
   metaphor_vocabulary: [house, boutique, supermodel, star, face, poster, window,
     counter, runway, floor plan, rack, couture, catwalk, campaign, season, coat]
   answer_passage_id: §2 + §3
```

**Ali reads that in about four minutes and knows.** Compare with what actually happened: nine hours of work, a 2,200-word script, and a rejection.

And note what Section 8 would have done for free. Declaring three concepts with one alias each makes the §1.2 check trivially enforceable, and it makes the eventual 6-labels-for-the-model / 8-labels-for-the-app script **impossible to ship** rather than merely disapproved-of.

**[INFERENCE] One warning about this artifact.** It only works if Ali is allowed to say "not yet" *without* being handed a rewritten one-pager thirty seconds later. The failure mode is a loop where the sheet is regenerated faster than she can think about it. Rule: **one substance sheet per episode per day.** If it's rejected, the week's episode slips or the buffer episode ships. That is the point of the buffer (playbook §D1c).

---

# 5. The concrete gate

## 5.1 Design principles, in one line each

1. **Deterministic first, judged second, human last** — and the human never sees anything a script could have caught. ([FACT] Anthropic grader taxonomy; playbook §A3.)
2. **Every judged check outputs a verbatim quote**, and the quote is verified to exist in the file. ([FACT] Rulers, arXiv:2601.08654.)
3. **Binary. Never a score.** ([FACT] Hamel; [OPINION] Netflix; [FACT] BWS reliability.)
4. **One isolated judge per dimension.** ([FACT] Anthropic evals post.)
5. **Judge model ≠ writer model context.** Fresh subagent context. ([FACT] Claude Code best practices.)
6. **The judge is itself gated** by a 24-item golden set, measured on TNR. ([FACT] Anthropic calibration requirement + [FACT] TNR <25% baseline.)

## 5.2 The gate, in order

Runs at **Stage 1 on the master file only** — `operations/audio/episode-0N-elevenlabs-v3-tagged.txt` + `content/episodes/episode-0N.canon.md` + `content/episodes/episode-0N.substance.md`. Nothing downstream is produced until it exits 0.

### GATE 0 — HUMAN · Substance Sheet approval
| | |
|---|---|
| **Type** | HUMAN (Ali) |
| **Blocks** | Everything. No prose may be written until `status: APPROVED`. |
| **Mechanism** | `PreToolUse` hook: any Write/Edit to `operations/audio/episode-0N-*.txt` is **denied** unless the matching `.substance.md` contains `status: APPROVED`. Deny, not ask — [FACT] `PreToolUse` exit 2 "Blocks the tool call". |
| **Ali's cost** | ~6 min/episode |
| **Ep5 verdict** | **WOULD HAVE BLOCKED.** No substance sheet existed; nine hours of prose were written before Ali saw the substance. |

---

### GATE 1 — MECHANICAL · Term consistency (synonym pile-up)
| | |
|---|---|
| **Blocks** | >2 distinct surface labels used ≥2× for any declared concept |
| **Input** | `substance.md` §8 concept table |
| **Implementation** | ~40 lines of Python, or a generated Vale `substitution` rule set. Runs in <1s. |
| **Ep5 verdict** | **FAILS.** [MEASURED] model=6 labels, app=8 labels, company=2. Ep1 passes (max 3, and those are the declared analogy). |

### GATE 2 — MECHANICAL · Metaphor-carry ratio
| | |
|---|---|
| **Blocks** | >25% of teaching sentences contain a declared metaphor word |
| **Input** | `substance.md` §8 `metaphor_vocabulary` |
| **Implementation** | ~30 lines. Method and thresholds in §1.3. |
| **Ep5 verdict** | **FAILS at 52%.** Ep1 = 10%, Ep4 = 4%. |

### GATE 3 — MECHANICAL · Answer-passage specificity
| | |
|---|---|
| **Blocks** | The passage declared as the answer contains fewer named products than it offers options |
| **Input** | `substance.md` §8 `answer_passage_id` + `content/site/current-models.js` (the existing product list) |
| **Implementation** | ~20 lines |
| **Ep5 verdict** | **FAILS.** [MEASURED] 4 options offered, **0 products named**. Note: a naive whole-file count would have PASSED it (6× ChatGPT, 4× Claude) — the scoping is what makes this check work. |

### GATE 4 — MECHANICAL · Claim/ledger reconciliation
| | |
|---|---|
| **Blocks** | Any number, date, or capability claim in the master file that is not in `operations/facts-and-citations-ledger.md` |
| **Grounding** | [FACT] Anthropic "groundedness checks"; [FACT] Claimify three-stage selection/disambiguation/decomposition |
| **Implementation** | Regex extraction for numbers/dates (deterministic) + a Haiku pass for capability claims. **Never Haiku for the *content* of an AI claim** — [FACT] Feb 2025 cutoff; use it only to *locate* claims, and verify against the ledger, not against the model. |
| **Ep5 verdict** | **UNKNOWN — likely FAILS on the Copilot routing claim.** "its counters can include models from Microsoft, OpenAI, and Anthropic" is a capability claim about a live product with no ledger entry visible. Flag, don't assert. |

### GATE 5 — MECHANICAL · Existing check-episode.sh
| | |
|---|---|
| **Blocks** | Banned phrases, self-hyping tells, spelling, MUST-MATCH drift |
| **Ep5 verdict** | **PASSES (0 fail · 2 warn).** [MEASURED] Identical output to Ep1. **Keep it — it catches real things — but understand it contributes nothing on this axis.** |

### GATE 6 — MECHANICAL · Rhythm (WARN only)
| | |
|---|---|
| **Warns** | A paragraph where sentence-length variance is under a floor (the "generated symmetry" tell, writing lock line 58); actionable-content ratio below 12% |
| **Ep5 verdict** | **WARNS** — actionable ratio [MEASURED] ~6% (130 of 2,188 words). |

---

### GATE 7 — JUDGED · J1: "Does the core teaching answer the opening question?"
| | |
|---|---|
| **Prompt shape** | *"Here is the episode's opening question, verbatim: `<Q>`. Here is the script. **Quote, verbatim, the single sentence that answers it.** If no sentence answers it, output `NONE`. Then answer one binary question: does that sentence explain the mechanic in plain words, or does it restate the metaphor? Output `PLAIN` or `METAPHOR`."* |
| **Backstop** | The returned quote is checked with `str.find()` against the file. Not found → **hallucination → FAIL**. |
| **Blocks** | `NONE`, or `METAPHOR`, or an unverifiable quote |
| **Model** | Sonnet 5 at `medium`, fresh subagent context, 3× sampled, **any FAIL = FAIL** (minority veto, §3.7) |
| **Grounding** | [FACT] Rulers extractive-quote verification; [FACT] Multiple Evidence Calibration; [FACT] Anthropic isolated-judge-per-dimension |
| **Ep5 verdict** | **FAILS.** The opening question is "which one am I supposed to use — and why does the one at work feel like the one I already use at home?" The answering sentence is *"The store is the address. The model is whoever's in the window this season."* → `METAPHOR`. This is the exact failure mode named in `plain-teaching-garnish-not-carry`. |

### GATE 8 — JUDGED · J2: "Is the payoff a decision or a negation?"
| | |
|---|---|
| **Prompt shape** | *"Quote, verbatim, the sentence in the final two paragraphs that tells the reader what to do. Then: does it name an action, or does it tell her to stop doing something / that there was no answer? Output `ACTION` or `NEGATION`."* |
| **Blocks** | `NEGATION` |
| **Ep5 verdict** | **FAILS.** *"Stop hunting for the best one."* / *"there was never one best AI"* → `NEGATION`. Brief diagnosis #4, caught. |

### GATE 9 — JUDGED · J3: Pairwise against Ep1
| | |
|---|---|
| **Prompt shape** | *"Two scripts, A and B. On this dimension only — **the plain mechanic leads and the analogy decorates** — which one does it better? You must pick one. Then quote the weakest teaching sentence in the loser."* Run **both orders**; disagreement = FAIL. |
| **Blocks** | This week's script losing to Ep1, or the two orderings disagreeing |
| **Grounding** | [FACT] pairwise > direct for subjective tasks (arXiv:2403.16950); [FACT] position swap mandatory (arXiv:2305.17926, Vicuna 66/80); [FACT] BWS reliability (ACL 2017). Encodes writing-lock line 18. |
| **Ep5 verdict** | **FAILS** — near-certain given 52% vs 10% metaphor-carry, but this is a prediction, not a measurement. **[NOT VERIFIED]** — run it before trusting it. |

---

### GATE 10 — MECHANICAL · Judge self-check (the anti-rubber-stamp gate)
| | |
|---|---|
| **What it does** | Re-runs J1/J2/J3 over the 24-item golden set. Computes **TNR** (known-fails correctly failed) and TPR separately. |
| **Blocks** | **The gate itself**, not the episode. TNR < 0.83 → the judged checks are declared untrustworthy and their verdicts are discarded; the episode escalates to Ali with a note saying so. |
| **Grounding** | [FACT] TPR>96%/TNR<25% baseline (arXiv:2510.11822); [FACT] Anthropic "closely calibrated with human experts"; [OPINION] Netflix 8-round calibration; [FACT] "20-50 tasks drawn from real failures". |
| **Cost** | ~24 × 3 judged calls ≈ 72 short calls ≈ **under $0.20**, ~30s. |
| **Ep5 verdict** | n/a — this gate protects the other gates. **It is the single check that makes the difference between a gate and a rubber stamp.** |

### GATE 11 — HUMAN · Ali sees the finished script
| | |
|---|---|
| **Precondition** | Gates 0–10 all green. **Unreachable otherwise.** |
| **What she sees** | The script, plus a ≤5-line findings block: each finding is one quoted sentence + which gate flagged it. |
| **Her cost** | Voice and taste only. Never completeness, never terminology, never facts. |

## 5.3 Implementation sketch

| Piece | Where | Effort |
|---|---|---|
| `operations/tools/check-teaching.py` — Gates 1,2,3,6 | new script, ~150 lines | ~3 h |
| `operations/tools/check-claims.py` — Gate 4 | new script + Haiku call | ~3 h |
| Substance-sheet template + `PreToolUse` deny hook — Gate 0 | `.claude/hooks/require-substance-approval.py`, wired in `.claude/settings.json` alongside the existing `enforce-cut-decisions.py` | ~2 h |
| `operations/tools/judge-episode.py` — Gates 7,8,9 | Sonnet 5, `medium`, 3× sample, quote-verified | ~4 h |
| `operations/eval/golden/` — 24 labelled items + `run-golden.py` — Gate 10 | build from existing repo files (§3.2) | ~2 h + **40 min of Ali** |
| `Stop` hook extension | extend the existing `response-linter.py` to exit 2 when the turn claims episode-ready and `check-teaching.py` has not exited 0. Read `stop_hook_active`; [FACT] the platform overrides after 8 consecutive blocks | ~1 h |

**Model choices.** Gates 7–9: **Sonnet 5 at `medium`** ([FACT] "Comparable to Claude Sonnet 4.6 at high effort"), fresh subagent context ([FACT] "the agent doing the work isn't the one grading it"). **Not Haiku** — [FACT] LitBench: small models "fail to evaluate creative writing accurately"; and [FACT] Haiku's Feb 2025 cutoff violates the locked currency rule. **Not Opus** — the extractive-quote task is not intelligence-limited, and Opus is 2.5× the input price. Gate 4's claim-*location* pass can be Haiku.

**Cost per run.** Script gates: **$0**. Judged gates: master file ≈ 3k tokens; J1+J2+J3 at 3× sampling ≈ 9 calls ≈ ~30k input / ~3k output. At Sonnet 5 intro pricing ($2/$10 per MTok) that is **≈ $0.09 per episode**. Gate 10's golden-set sweep ≈ **$0.20**, weekly. **Under $0.30 per episode, all in.** Prompt-cache the rubric prefix and it drops further ([FACT] cache read 0.1×).

**Ali's minutes per episode:** **6** at Gate 0, plus whatever the finished script deserves at Gate 11 — and Gate 11 is now a taste read, not a defect hunt. One-time setup: **~40 minutes** to label the golden set.

## 5.4 Would this have caught Ep5? Summary

| Gate | Ep5 | Ep1 | Basis |
|---|---|---|---|
| 0 · Substance sheet | **BLOCK** | pass | structural |
| 1 · Term consistency | **FAIL** (6/8/2 labels) | pass (max 3) | [MEASURED] |
| 2 · Metaphor-carry | **FAIL** (52%) | pass (10%) | [MEASURED] |
| 3 · Answer specificity | **FAIL** (0 products) | pass (3) | [MEASURED] |
| 4 · Claim/ledger | likely FAIL | flags 4 pending | [INFERENCE] |
| 5 · check-episode.sh | **pass** ← the current gate | pass | [MEASURED] |
| 6 · Rhythm | WARN (6% actionable) | — | [MEASURED] |
| 7 · J1 answers question | **FAIL** (METAPHOR) | pass | [INFERENCE from text] |
| 8 · J2 payoff | **FAIL** (NEGATION) | pass | [INFERENCE from text] |
| 9 · J3 pairwise vs Ep1 | predicted FAIL | n/a | **[NOT VERIFIED]** |

**Six independent blocks before an LLM is consulted at all.** Three of them are [MEASURED] on your real files today, not predicted.

---

# 6. What I would NOT build, and why

1. **Readability scoring of any kind.** [FACT] no construct validity for this purpose (Redish 2000); [MEASURED] the failing passage would score as your *cleanest* writing.
2. **A single "teaching quality score" (1–5 or 1–10).** [FACT] Hamel: "you're doing it wrong"; [OPINION] Netflix abandoned Likert mid-project; [FACT] BWS reliability. Scores make drift invisible — a judge sliding from 4.2 to 3.9 looks like noise.
3. **A multi-model judge panel.** [FACT] 9 judges ≈ 2.18 effective votes, φ̄=0.391, and the panel *lost* to the best single judge on 2 of 3 datasets (arXiv:2605.29800). Use 3× sampling of one judge with any-FAIL veto instead. [FACT] calibration data beat ensembling 2× in the one study that compared them directly.
4. **A general concreteness or specificity score over the whole script.** [FACT] the instruments are real (Brysbaert; Speciteller) but [MEASURED] Ep5's failing passage is lexically concrete. Scope the check to the answer passage instead; that's Gate 3 and it's twenty lines.
5. **An unscoped "review this and find problems" agent.** [FACT] Anthropic: "A reviewer prompted to find gaps will usually report some, even when the work is sound." The output is noise, and noise trains Ali to skip the report — which is how you get a rubber stamp from the *human* side.
6. **A dashboard.** Memory `chat-is-the-one-place` is explicit and this report doesn't override it. Gate output is ≤5 quoted lines in chat.
7. **Fine-tuning a judge on LAiDIES voice.** [FACT] fine-tuned evaluators show a "catastrophic performance drop" outside the exact scheme they were trained on (Limitations of Fine-Tuned Judge Models, 2024, via Yan). You will change the rubric roughly every episode — see criteria drift, §3.3.
8. **Automating the accept decision.** Ali's own ruling stands and nothing in this research contradicts it. The gate produces *eligibility*, not approval.

---

# 7. Where the playbook was followed, and where it was not

**Followed:**
- §A3 "is this a rule, or a check?" — this whole report is that question applied to the writing lock. Six of the lock's rules turned out to be checks nobody had written.
- §A5 rubrics-not-exact-match, isolated per-dimension judges, calibration against human judgement — all adopted.
- §A5 cheapest-and-most-reliable-check-first ordering — Gates 1–6 before 7–9, deliberately.
- §A6 fewer, higher-stakes human gates — reduced to exactly one (Gate 0), with Gate 11 as a taste read rather than a defect hunt.
- §D5a blocking `Stop` hook; §D5c fresh-context verifier scoped to correctness — both used.
- §B3 Sonnet 5 @ `medium` in fresh context for QC; Haiku barred from anything about the AI landscape.

**Not followed, deliberately:**
- **§C6's "pairwise beats absolute" is downgraded from a general principle to a task-specific one.** New evidence: pairwise's advantage is real for subjective tasks but ~zero on objective ones (0.47 vs 0.46, arXiv:2403.16950), and it *reverses* on adversarial inputs (arXiv:2406.12319). So pairwise is Gate 9 only, and it is the least-trusted gate in the design.
- **§A5's implicit "multi-judge consensus" is rejected.** The playbook lists it as an Anthropic-named technique, which it is — but the 2026 correlated-errors result (arXiv:2605.29800) post-dates the playbook and largely guts it for same-generation models.
- **The playbook's ranked list has no teaching-quality item at all.** Its #1 is the coverage gate. **[INFERENCE] Gate 2 (metaphor-carry) should sit alongside it**: comparable effort (~30 lines), and it is the only measure I found that reproduces Ali's own rejection on real data.

**Contradictions / corrections to the existing record:**
1. **The research brief mis-attributes "pairwise beats absolute scoring" to Anthropic.** Anthropic lists pairwise as one of five model-based techniques and makes no superiority claim. Source is elsewhere. Worth correcting in `_BRIEF-for-research-agents.md`.
2. **`check-episode.sh` is not "a gate that isn't enough" — on this axis it is a gate with zero signal.** [MEASURED] byte-identical verdict (`0 fail · 2 warn`, exit 0) on the gold standard and the rejected draft. That is stronger than the brief's framing and it changes the priority: this is not a tuning job, it's a new instrument.
3. **Playbook Open Question #11** ("six grading methods" and a "75–90% human-agreement calibration target" attributed to Anthropic's evals post — not found on the primary page). **Partially resolved:** the *sample-size* guidance IS on the page — "**20-50 simple tasks drawn from real failures is a great start**" — and Anthropic does require calibration "closely… with human experts." But there is still **no published numeric agreement target**, and no "six grading methods." The 80–85% figures come from MT-Bench and Netflix, not Anthropic. Close #11 as: sample size confirmed, agreement target still [NOT VERIFIED].
4. **Playbook §A4's hook inventory is confirmed and one item is now documented differently:** the hooks reference I fetched today makes no mention of `stop_hook_active`. The 8-block override IS documented (on the best-practices page: "Claude Code overrides the hook and ends the turn after 8 consecutive blocks"). **[NOT VERIFIED]** whether `stop_hook_active` is still a field. Check before relying on it in the Stop-hook extension.
5. **New since the playbook:** the Claude Code best-practices page now carries an explicit **"Add an adversarial review step"** section and a **spec-first interview workflow** ("write a complete spec to SPEC.md… Time spent making the spec precise pays off more than time spent watching the implementation"). Both are direct Anthropic support for §4 of this report and were not in the playbook.

---

# 8. Sources

All fetched or verified 2026-07-22 UTC unless noted.

| # | Title | Publisher / author | URL | Date |
|---|---|---|---|---|
| 1 | Demystifying evals for AI agents | Anthropic Engineering | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 2026-01-09 |
| 2 | Best practices for Claude Code | Anthropic (Claude Code) | https://code.claude.com/docs/en/best-practices | living |
| 3 | Hooks reference | Anthropic (Claude Code) | https://code.claude.com/docs/en/hooks | living |
| 4 | How we contain Claude across products | Anthropic Engineering | https://www.anthropic.com/engineering/how-we-contain-claude | 2026-05-25 |
| 5 | Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena | Zheng et al. | https://arxiv.org/abs/2306.05685 | 2023-06 |
| 6 | Large Language Models are not Fair Evaluators | Wang et al. | https://arxiv.org/abs/2305.17926 · https://aclanthology.org/2024.acl-long.511/ | 2023-05 / ACL 2024 |
| 7 | Length-Controlled AlpacaEval | Dubois, Galambosi, Liang, Hashimoto | https://arxiv.org/abs/2404.04475 | 2024-04 |
| 8 | LLM Evaluators Recognize and Favor Their Own Generations | Panickssery, Bowman, Feng | https://arxiv.org/abs/2404.13076 | 2024-04 |
| 9 | Who Validates the Validators? (criteria drift, EvalGen) | Shankar et al., UIST '24 | https://dl.acm.org/doi/10.1145/3654777.3676450 · https://arxiv.org/pdf/2404.12272 | 2024-10 |
| 10 | Beyond Consensus: Mitigating the Agreeableness Bias in LLM Judge Evaluations | Jain, Ahmed, Sahai, Leong | https://arxiv.org/html/2510.11822v2 | 2024/2025 |
| 11 | Nine Judges, Two Effective Votes | Kohli (Apple) | https://arxiv.org/html/2605.29800 | 2026-05 |
| 12 | From Rubrics to Reliable Scores: Evidence-Grounded Text Evaluation (Rulers) | Hong, Yao, Shen, Xu, Wei, Dong | https://arxiv.org/abs/2601.08654 | 2026-01-13, rev. 2026-05-27 |
| 13 | Judging the Judges: Bias Mitigation Strategies in LLM-as-a-Judge Pipelines | Soumik | https://arxiv.org/html/2604.23178v2 | 2026-06-24 |
| 14 | Judging the Judges: Evaluating Alignment and Vulnerabilities in LLMs-as-Judges | Thakur, Choudhary, Ramayapally, Vaidyanathan, Hupkes | https://arxiv.org/pdf/2406.12624 | 2024-06 |
| 15 | Aligning with Human Judgement: The Role of Pairwise Preference | — | https://arxiv.org/pdf/2403.16950 | 2024-03 |
| 16 | The Comparative Trap: Pairwise Comparisons Amplifies Biased Preferences | — | https://arxiv.org/pdf/2406.12319 | 2024-06 |
| 17 | Best-Worst Scaling More Reliable than Rating Scales | Kiritchenko & Mohammad, ACL 2017 | https://aclanthology.org/P17-2074/ · https://arxiv.org/abs/1712.01765 | 2017 |
| 18 | LitBench: Reliable Evaluation of Creative Writing | — | https://arxiv.org/pdf/2507.00769 | 2025-07 |
| 19 | Towards Pedagogically Aligned LLM Tutors for Math Mistake Remediation | Petukhova, Nguyen, Kochmar | https://arxiv.org/pdf/2606.21502 | 2026 |
| 20 | Evaluating Netflix Show Synopses with LLM-as-a-Judge | Netflix Technology Blog | https://netflixtechblog.com/evaluating-netflix-show-synopses-with-llm-as-a-judge-6269251e6f28 | — |
| 21 | Using LLM-as-a-Judge For Evaluation: A Complete Guide | Hamel Husain | https://hamel.dev/blog/posts/llm-judge/ | living |
| 22 | LLM Evals: Everything You Need to Know (FAQ) | Hamel Husain | https://hamel.dev/blog/posts/evals-faq/ | living |
| 23 | Evaluating the Effectiveness of LLM-Evaluators | Eugene Yan | https://eugeneyan.com/writing/llm-evaluators/ | 2024 |
| 24 | Readability formulas have even more limitations than Klare discusses | Redish, ACM JCD 24(3) | https://dl.acm.org/doi/10.1145/344599.344637 · https://redish.net/wp-content/uploads/Redish_on_Readability_Formulas.pdf | 2000-08 |
| 25 | Tip 6: Use Caution With Readability Formulas | AHRQ | https://www.ahrq.gov/talkingquality/resources/writing/tip6.html | living (body not retrieved) |
| 26 | A large-scaled corpus for assessing text readability | Behavior Research Methods | https://link.springer.com/article/10.3758/s13428-022-01802-x | 2022 |
| 27 | Concreteness ratings for 40 thousand English word lemmas | Brysbaert, Warriner, Kuperman, BRM 46:904–911 | https://link.springer.com/article/10.3758/s13428-013-0403-5 | 2014 |
| 28 | Speciteller / Fast and Accurate Prediction of Sentence Specificity | Li & Nenkova, AAAI 2015 | https://github.com/jjessyli/speciteller · https://ojs.aaai.org/index.php/AAAI/article/view/9517 | 2015 |
| 29 | Domain Agnostic Real-Valued Specificity Prediction | Ko et al. | https://arxiv.org/pdf/1811.05085 | 2018 |
| 30 | Claimify: Extracting high-quality claims from LM outputs | Microsoft Research | https://www.microsoft.com/en-us/research/blog/claimify-extracting-high-quality-claims-from-language-model-outputs/ · https://arxiv.org/pdf/2502.10855 | 2025-03 |
| 31 | ASD-STE100 Simplified Technical English | ASD | https://www.asd-ste100.org/ · https://www.asd-europe.org/standards-specifications/simplified-technical-english/ | issue Jan 2025 |
| 32 | Simplified English Checker | Boeing | https://www.boeing.com/company/simplified-english-checker | living |
| 33 | Term checker for ASD-STE100 (LanguageTool-based) | simplified-english.co.uk | https://www.simplified-english.co.uk/ | living |
| 34 | Vale (substitution / terminology rules) | vale.sh | https://docs.vale.sh/ · https://github.com/vale-cli/vale | living |
| 35 | How we use Vale to improve our documentation editing process | Datadog Engineering | https://www.datadoghq.com/blog/engineering/how-we-use-vale-to-improve-our-documentation-editing-process/ | living |
| 36 | HealthBench (physician-written per-criterion rubrics) | OpenAI | https://openai.com/index/healthbench/ · https://cdn.openai.com/pdf/bd7a39d5-9e9f-47b3-903c-8b847ca650c7/healthbench_paper.pdf | 2025 |
| 37 | The Leprechauns of Software Engineering | Bossavit | https://leanpub.com/leprechauns/read | 2015 |
| 38 | Are Delayed Issues Harder to Resolve? | Menzies et al. | https://arxiv.org/pdf/1609.04886 | 2016 |
| 39 | Ablation (artificial intelligence) | Wikipedia | https://en.wikipedia.org/wiki/Ablation_(artificial_intelligence) | living |
| 40 | How to Calibrate Your LLM Judge With Human Annotations | Galileo (vendor) | https://galileo.ai/blog/calibrate-llm-judge-human-annotations | living |

---

# 9. Not verified / open

1. **Gate 9 (pairwise vs Ep1) has never been run.** Its Ep5 verdict is a prediction. Run it against the golden set before trusting it; if it disagrees with Gates 1–3, believe Gates 1–3.
2. **Petukhova et al. (arXiv:2606.21502) correlation numbers** for LLM-judge unreliability on pedagogical dimensions — the finding is confirmed at abstract level; the PDF would not text-extract. **Numbers unverified.**
3. **AHRQ Tip 6 body text** — the page returned empty on fetch. The Redish citation carries the same point and is solid.
4. **`stop_hook_active`** — not present in the hooks reference as fetched 2026-07-22. The 8-block override is documented. Verify before writing the Stop-hook extension.
5. **Thresholds are calibrated on n=3 files** (Ep1, Ep4, Ep5). 25% metaphor-carry and ≤2 surface labels separate this pair with margin, but three files is three files. Re-check after Ep6 and Ep7 and expect to move them once.
6. **No named prior art for the delete-the-metaphor test.** It is bespoke. It also outperformed every published measure I tested on your data, which is either a good sign or a sign it is overfit to n=3. Treat #5 as the live risk.
7. **Anthropic publishes no numeric human-agreement target for LLM judges.** The 0.83 TNR floor in Gate 10 is **[INFERENCE]** — derived from "10 of 12 known-fails caught" being the point where a miss becomes likelier than not across an episode. It is a starting number, not a validated one.
8. **Gate 4's Ep5 verdict is a flag, not a finding.** I did not diff the Copilot routing claim against the ledger.
9. **The Substance Sheet has never been used.** Everything in §4.3 is a reconstruction of what it *would* have contained, built from Ali's own recorded endorsement. The first real one will reveal what the format is missing.
# SUPERSEDED SUBSTANCE-SHEET ASSUMPTION — 2026-07-24

> The rule below that a substance sheet contains “no voice, no jokes, no
> analogy” and treats metaphor vocabulary as decoration is **not valid for
> LAiDIES episode approval**. LAiDIES analogies and references often perform
> the teaching; they must be tested for technical accuracy and concept
> fidelity, not stripped out of the governing artifact. Current authority is
> `operations/checklists/episode-concept-fidelity-gate-template.md` plus
> `operations/CODEX-WORKING-AGREEMENT.md`. This research remains preserved as
> historical reasoning; do not derive the Gate 1 format from it.
