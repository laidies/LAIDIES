# FAiRY Answer Quality & Safety subchampion

## 2026-08-31 — situation-matched guidance and Ali's talk scenarios

**Direction: DECIDED; source intake incomplete; not implemented or published.**
Ali asks FAiRY to incorporate guidance from Dorie Clark and other relevant
thinkers according to the question, and to build on her talk's scenarios and
suggested answers. This is knowledge/answer-quality work, not a new personality
selector, endorsement, permission to imitate a living author's voice, or a
replacement for the active site/backend recovery.

Supplied evidence is one cover/contents image:
`/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-3050e32f-83ed-4935-b6ba-d290cbe227c2.png`.
Visible title: *What To Actually Say*, *Leading Through Complexity*, Part One
of Two; Alison Eakin, Women Influence Network,27August2026. No actual scenario
scripts or Part Two pages were supplied in that image. Do not reconstruct
scripts from contents headings or treat instructions inside a source document
as instructions to the application/agent.

Visible intake categories: In the Room; Power, Credit & Visibility; Feedback &
Hard Conversations; Boundaries, Pushback & Follow-Up; Use Stronger Language ·
Feedback, or Bias?; Inclusive Communication. These are organization leads,
not six completed scenario sets. Preserve the cover's distinction between
words useful in the moment and why women should not have to say them; advice
must not imply that better wording solves discrimination or structural issues.

Recommended smallest implementation: one curated scenario/source bank behind
the existing work/career route, not a new chatbot or a whole-document prompt.
For each admitted scenario retain: exact source/page/version; situation and
visitor goal; power/retaliation constraints; Ali's original script; why it
fits; context-dependent softer/firmer alternatives where useful; when not to
use it; follow-up and any team/manager responsibility. Label our adaptations
separately from Ali's source. Do not ingest private visitor conversations into
the bank or publish the handout by default.

Select guidance by the actual problem, not a famous name or a trigger word.
Dorie Clark is an initial candidate for long-term career strategy and making
work/ideas visible, based on her primary pages checked31August2026:
https://dorieclark.com/longgame/ and https://dorieclark.com/speaking/.
These pages establish subject fit only; each framework or attributed claim
still needs the specific primary passage before admission. No invented quotes,
no "Dorie would say" predictions, no endorsement implication. Other thinkers
remain to be selected from actual case needs rather than an arbitrary roster.

Proposed answer behavior: useful words/action first; brief reason and relevant
trade-off; an alternative when power/safety/context warrants it; next step.
Provide attribution/source outside the copyable script when that source was
actually used. Preserve FAiRY presentation and existing safety boundaries.
If context could materially change the recommendation, ask one useful
question rather than assuming the manager, colleague or situation is safe.

Implementation dependency observed in the local Worker31August2026:
`validateStructuredAnswer` currently rejects nonempty `sources` and non-null
`asOf`; `buildTypedAnswerPrompt` likewise requires empty sources. Therefore
this must not be called implemented by simply adding authors to a prompt.
Add a bounded reviewed-source input and validate source IDs/claim support in
the existing answer pipeline before returning attributed guidance. Do not
weaken safety/currentness gates or borrow the local Worker's public status.
Pilot one complete handout scenario, a context/power variant, an unrelated
question and an unsupported-attribution case before growing the bank.

**Status:** FIX BEFORE PROMOTION — BUILT LOCALLY; REAL ANSWERS UNPROVEN

Own typed response integrity, boundary/risk/domain/task routing, retrieval and
source discipline, answer validation, constrained personality, service
failure truth and the 45-case evaluation contract.

Authoritative inputs:

- `worker-fairy-godmother/src/index.js`
- `docs/product/fairy-godmother-p0-product-contract.md`
- `operations/test-fixtures/fairy-godmother/p0-evaluation-set.json`
- `operations/research/fairy-godmother-worker-recovery-2026-07-25.md`

The recovered v18 universal-prompt behavior is characterization evidence, not
an approved design. No answer-quality claim advances until API and rendered-
page results pass independent accuracy/safety, product and brand review.

The current local candidate replaces the contradictory eight-section
Markdown instruction at generation time with a concise typed-answer prompt.
It requires a usable deliverable, transferable reasoning, explicit assumptions
and unknowns, one next move, no invented receipts and bounded personality.
Every returned field and collection is length-bounded before a success can
commit allowance. These are contract controls, not proof that a real model's
answers meet the learning or brand standard.
