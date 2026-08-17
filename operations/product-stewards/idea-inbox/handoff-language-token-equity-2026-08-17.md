# IIR-20260817-019 — language, token cost and access equity

- **Captured:** 2026-08-17, from Ali during the AI Fundamentals 101 visual rebuild.
- **Source:** Ali observed that Chapter 4 explains tokenisation mainly through
  English, while some other languages can require more tokens for comparable
  meaning. That can affect cost, context use and practical access.
- **Idea preserved:** Add one source-bound Chapter 4 “why this matters” note and
  investigate one _The Big Picture_ article about how tokenizer design can make
  AI more expensive or less usable across languages.
- **Classification:** `EVIDENCE BASE IDENTIFIED / VERSIONED CLAIM MAP STILL REQUIRED`.
- **Accuracy boundary:** Do not publish “all non-English languages cost more.”
  The effect varies by language, script, tokenizer, model, pricing unit, task
  and provider. Current comparative evidence and provider-specific behaviour
  must be checked before any wording or chart is admitted.
- **Book job:** Explain that tokenisation is a design choice with consequences,
  not a neutral chopping step. A short Chapter 4 note may connect token count to
  context use, latency and price only after the exact claims are sourced.
- **Big Picture job:** Ask who bears the practical cost when systems represent
  the same meaning less efficiently across languages; distinguish measured
  tokenizer disparity from broader claims about model quality or social harm.
- **Required evidence:** Current primary or peer-reviewed multilingual
  tokenisation comparisons; exact tokenizer/model versions; comparable text
  method; provider pricing/context rules where named; limitations and changed-
  since-publication trigger.
- **Evidence scout completed 2026-08-17:**
  - Ahia et al., _Do All Languages Cost the Same? Tokenization in the Era of
    Commercial Language Models_ (EMNLP 2023) compared OpenAI API cost and
    utility across 22 languages and found large language-dependent variation
    in token counts for the same information. DOI:
    `10.18653/v1/2023.emnlp-main.614`.
  - Foroutan et al., _Parity-Aware Byte-Pair Encoding: Improving Cross-lingual
    Fairness in Tokenization_ (ACL 2026) identifies frequency-based tokenizer
    design as a mechanism that can favour languages dominant in training data
    and demonstrates that a different merge rule can materially reduce the
    measured inequality. DOI: `10.18653/v1/2026.acl-long.342`.
  - OpenAI's current official token documentation confirms that API input,
    output and cached usage are priced per token and that prompts are converted
    into token lists before processing:
    `https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-`.
- **Bounded supported claim:** Comparable meaning can require different token
  counts in different languages for a particular tokenizer. Where a service is
  billed per token, that can create a direct price difference; extra tokens can
  also consume more of a fixed context allowance. The size and even direction
  of the difference are tokenizer-, language-, script- and text-dependent.
- **Still unproved for publication:** exact 2026 differences for any named
  current commercial model; a universal latency or model-quality penalty; and
  any claim that every non-English speaker pays more. Those require a current
  reproducible same-meaning comparison against the exact tokenizer/version.
- **Accountable owners:** Library / Learning Content for the book note;
  NewsStand for the article; Accuracy/Freshness for current evidence.
- **Return trigger:** Evidence owner produces one versioned claim map showing
  which languages/tokenizers were actually compared and which cost/access
  consequences follow. Then Library and NewsStand separately decide
  `INCLUDE / REVISE / DECLINE`.
- **Foreground consequence:** None. This capture does not interrupt the active
  textbook visual proof, create prose or authorize publication.
- **Public/deploy/spend authority:** None.
