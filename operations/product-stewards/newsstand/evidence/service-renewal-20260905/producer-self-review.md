# Private exact-prose self-review — 5 September 2026

Principal: /root/source_selector_review
Scope: unchanged service-bank content only. This is not an eligibility, bank, public-column, source-date or publication update.

## paige-02-fix-one-thing

Complete reviewed prose: Fix the paragraph without rewriting the whole thing. Tell the tool what to change—and what to leave alone. You like the draft, apart from the opening paragraph. Asking for “a better version” gives the tool permission to change far more than you wanted. Try: “Revise only the first paragraph. Make the request clear in the first sentence and remove the apology. Keep the rest exactly as it is. Do not change names, dates, figures or commitments.” Keep a copy of the original and compare the two. The instruction narrows the job; it does not guarantee that every other word stays put. If the tool still changes unrelated text, ask for the replacement paragraph by itself and insert it into your saved draft.

Result: PASS for private producer review. The opening-paragraph request is specific, names what must remain, and gives a replacement-only recovery path if unrelated text changes.
Bound current support: The difference between feedback the AI can use and feedback that starts a correction spiral comes down to three things: specificity, proportion, and preservation. / Keep the first two paragraphs. Rewrite the third to focus on cost rather than timeline. / Light edit only.

## concept-02-token

Complete reviewed prose: Tokens: the pieces a language model processes. A token is not reliably one word, so word counts and token limits differ. Before a language model works with text, a tokeniser breaks it into reusable pieces and represents them as numbers. A piece might be a whole word, part of a word, punctuation or a single character. The exact split depends on the tokeniser. That is why a limit of 10,000 tokens does not mean 10,000 words. The document, instructions and conversation can all take up space, and the system also needs room to produce its answer. If a document is too large for a task, shorten irrelevant material or work on clearly labelled sections. Keep the passages needed to interpret each section together. Cutting a policy into pieces is not helpful if the exception ends up separated from the rule.

Result: PASS for private producer review. The entry distinguishes tokens from words, identifies the context/output constraint without a numerical conversion claim, and applies it to keeping a rule with its exception.
Bound current support: A tokeniser first divides the text into reusable pieces and maps those pieces to numbers. / A token is a <strong>chunk</strong> — sometimes a whole word, sometimes part of a word, sometimes just a single character or a punctuation mark. / <strong>Input tokens</strong></td><td>The tokens in what you send (your question, your document, the conversation history)</td></tr><tr><td><strong>Output tokens</strong></td><td>The tokens the system generates in response</td>

## jeeves-02-citation

Complete reviewed prose: Why does the link work but the claim doesn’t? A citation is somewhere to check—not proof that the sentence is right. Dear Footnote Detective, You have found a particularly irritating kind of mistake: the source exists, but the answer misrepresents it. The model may have mixed up two studies, misunderstood a result or attached a plausible link to a claim it generated. Open the original source and look for the exact finding. Check who was studied, when, and what was actually measured. A survey about whether people use AI cannot prove that AI made them better at their jobs. If the tool can read the source, try: “For each factual claim in this paragraph, show the short passage in the source that supports it and its location. Mark anything you cannot support.” Then compare those passages with the original yourself. The tool can also invent quotations, so its list is a checking aid, not the final check. If you cannot access the source, do not present the claim as verified. Find an accessible original source or leave the claim out. A footnote can look very scholarly while doing absolutely no useful work.

Result: PASS for private producer review. The letter answers the exact source-versus-statistic problem, tells the reader to check population, date and measure, and gives an accessible-source fallback.
Bound current support: <strong>Hallucination</strong> is when the model generates text that sounds confident and factual but isn't true — fake citations, invented statistics, wrong dates, fabricated quotes. / Requests for specific details (names, dates, citations, statistics) / Citation/source linking (models trained to cite their sources, so outputs can be verified)

No human sampling is claimed. The independent Claude provider is HOLD because its OAuth session was expired; no independent semantic receipt has been created.
