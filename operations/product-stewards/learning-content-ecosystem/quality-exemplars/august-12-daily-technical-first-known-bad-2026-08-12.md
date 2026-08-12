# REJECTED — August 12 Daily technical-first explanation

## Exact rejected passage

> Some developer tools use reasoning models that generate working text before
> the final answer. The full working trace is not normally shown to the person
> using the tool. To let an application continue the same task later, an AI
> provider may return that trace as an opaque encrypted block. The application
> holds the block and sends it back on the next request.
>
> The paper's authors found that, in the API versions they tested, those blocks
> travelled too freely: a block created in one context could be handed to
> another compatible model from the same provider family. A weaker model could
> sometimes be prompted to reproduce the hidden text.
>
> The important distinction is not “encryption failed.” The researchers did not
> report stealing an encryption key. The system accepted a valid sealed block
> in a context where it should not have been useful. A sealed hotel keycard can
> be unreadable to you and still be dangerous if it opens more rooms than
> intended.

## Ali's rejection

The passage does not explain the story to nontechnical readers. It assumes that
the reader knows what an API and an encrypted reasoning block are. It also does
not perform the agreed Hannah Fry communication mechanics or Feynman-style
first-principles reconstruction.

## Missed defect

The article began with the system's vocabulary rather than the reader's human
question and ordinary experience. It named an invisible object before making
that object concrete, then used the hotel-keycard analogy to explain the
security failure before the reader understood what the “keycard” represented.
The contract named the communication benchmarks, but the exact prose did not
perform them.

## Required successor sequence

1. Begin with the human puzzle: how can hidden material leak when nobody can
   read it?
2. Use an ordinary complete situation in which a person asks an AI helper to do
   a task and the helper needs continuity across turns.
3. Make the invisible object concrete: the system may create intermediate text
   while producing an answer, seal that text and return the sealed package to
   the software so it can continue later.
4. Explain the software-to-software handoff in ordinary language before naming
   the technical term `API`.
5. Explain the sealed package before naming it an `encrypted reasoning block`.
6. Reconstruct the failure causally: the package remained unreadable, but the
   receiving system accepted it in a different compatible context and produced
   readable text from it.
7. State what this does and does not establish, then give the action.

This artifact is calibration-only. Never reuse its rejected wording as a
positive exemplar.
