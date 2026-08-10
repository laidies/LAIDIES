# AI Fundamentals 101 Tokens proof — unfamiliar-reader session

**Status:** ready to administer; no participant outcome recorded
**Rendered artifact:** `review.html`
**Artifact SHA-256:** `ebb89a32261ca4c8e6b5ba22c34e8547db35e678714e013d233f763930cac23f`
**Minimum sessions:** three distinct people unfamiliar with this artifact

This protocol becomes stale if the rendered artifact SHA changes.

## Administrator rules

The administrator must be independent from the maker. Give each participant
the exact rendered artifact above. Do not show the producer contract, maker
notes, expected evidence or another participant's answers until the session is
finished.

Let the participant read and navigate normally. Do not teach, rephrase the
book or steer them toward a term. Record their words verbatim. Use a unique
pseudonymous participant ID; do not record their name, email or other personal
information in repository evidence.

The administrator may ask only neutral follow-ups such as “What in the book
led you to that?” or “Can you show me where you found it?” A failed task stays
failed; coaching followed by a correct answer is not a pass.

## Four required tasks

### 1. Orientation

After the participant has opened the artifact, ask:

> Before reading every word, what do you think this section will help you
> understand, and how would you use this page if you needed one definition
> quickly?

**Pass evidence:** In their own words, the participant identifies that the
section explains tokens and how text reaches a model, and finds or describes
the separate Concept Index entry without prompting.

### 2. Lookup

Ask:

> Please find the answer to this question: Is one token always one word? Show
> me where the book answers it, then tell me the answer in your own words.

**Pass evidence:** The participant reaches the relevant teaching or Concept
Index entry and explains that a token may be a word, part of a word,
punctuation, a space or a character; the split can vary by encoding.

### 3. Explain-back

Close or cover the artifact, then ask:

> Imagine a friend asks why an AI can write a polished paragraph but still
> get tripped up counting letters in “strawberry.” How would you explain it to
> her now?

**Pass evidence:** The participant explains the causal link: the model begins
with token pieces rather than the same direct letter-by-letter view a person
has; letters may sit inside those pieces. They do not claim that tokenization
forces every model to fail or that one token always equals one word.

### 4. Unseen transfer

Show no part of the artifact while asking:

> A colleague says: “This AI has a 100,000-token context window, so I can paste
> in 100,000 words and trust it to use every detail.” What would you correct,
> and what would you check before relying on the answer?

**Pass evidence:** The participant corrects both misconceptions: tokens are not
the same as words, and fitting material into a context window does not prove
that every detail will be used correctly. A useful answer proposes checking
the current product/model limit and verifying the important details in the
result. Exact wording is not required.

## Participant evidence record

Create one plain-text evidence file per participant. It must contain:

- the artifact SHA above;
- the pseudonymous participant ID;
- `OBSERVED_HUMAN` and `UNFAMILIAR_WITH_ARTIFACT`;
- observation date/time and independent administrator principal ID;
- each exact prompt;
- the participant's verbatim response;
- the administrator's task verdict and brief reason;
- any neutral follow-up and response;
- any limitation or interruption.

Hash each completed evidence file and bind it to that participant in a
`library-book-cold-reader-review.v2` receipt. Three passing sessions are
necessary but not sufficient for admission; independent semantic and visual
verdicts still remain separate.
