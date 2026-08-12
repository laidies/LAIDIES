# NewsStand story method — choose the honest reader sequence

**Status:** ACTIVE SIMPLIFICATION — use before adding another NewsStand rule,
format, column, schema or automation.

## The whole model

`signal → evidence check → reader-job routes → writing mode → destination shape`

The source does not choose the publication. The reader question does. One
verified signal may serve more than one publication only when each output
answers a different question and does additional work.

## 1. Evidence check — is there anything to route?

1. Identify the exact announcement, report, paper, incident, post or recurring
   reader problem and its date.
2. Recover the best available primary evidence before adopting the source's
   framing.
3. Separate what happened from a company claim, reporter interpretation,
   prediction or rumour.
4. Mark `ROUTE` only when the evidence is current enough and supports a useful
   reader question. Otherwise mark `WATCH`, `DUPLICATE`, `STALE` or `NO STORY`
   with the reason.

Nothing is held without a next trigger: name the missing source, event, answer
or date that would make the item routeable.

## 2. Route by the reader's question

| Reader's real question | Route | Output job |
|---|---|---|
| “Do I need to know or act before the next Daily?” | **The Breaking** | Only a genuinely urgent new development; waiting would materially disadvantage the reader. |
| “What happened, what does it mean and why should I care today?” | **The Daily** | One current development explained clearly inside the dated newspaper. |
| “What connected across this week that isolated headlines missed?” | **The Weekly** | Synthesis of at least two distinct developments; never a bundle of Daily summaries. |
| “What is the larger pattern, mechanism, power question or consequence?” | **The Big Picture** | Deep reported investigation or analysis that earns a distinct thesis from broader evidence. |
| “What is the durable answer to this recurring AI question?” | **STRAiGHT TALK** | A living, source-heavy reference that is updated rather than republished as news. |
| “Why does this frustrating AI problem keep happening, and what can I actually do?” | **Dear Miss Jeeves** | A practical diagnosis that includes tool limits, persistent controls and realistic recovery. |
| “What small thing can I use today?” | **Service desk** | Route only to the exact job: Paige at work, Career/Work-Life career-first, Promptoscope outside work and funny, Mme CLAi-O reflective. |

### Multi-route test

A signal may route to more than one destination only if all three are true:

1. each route has a different reader question;
2. each route needs materially different reporting, teaching or maintenance;
3. the second output would still be useful if the first were already read.

Example: a new model-safety incident may earn a Daily answering **what
happened today**, then contribute evidence to a Big Picture investigation
asking **why several systems keep failing in the same way**. The Big Picture
cannot be the Daily with extra paragraphs.

## 3. Choose the writing mode for each routed output

Use **Headline Reality Check** only when an exact piece of reporting or a
circulating headline materially overstates, omits, blurs or misreads the
underlying evidence. Use **Plain-Language Explainer** when the reporting is
fair and the reader mainly needs help understanding an announcement, research
finding or new capability. Do not manufacture a criticism angle to make
LAiDIES sound more investigative.

Record the selection and the evidence for it. If the source is accurate but
needs more background, that is an explainer—not a reality check.

## 4. Use the destination's output shape

- **Breaking:** minimum newcomer background → exact new event and time → why
  it cannot wait → what changes and does not → bounded action/watch point.
- **Daily:** clear lead → selected Reality Check or Explainer sequence → useful
  implication → sources, correction state and related learning.
- **Weekly:** week-ending thesis → dated developments → connection and causal
  mechanism → what changed/did not → affected people → practical implications
  and watch points.
- **Big Picture:** one consequential question → why now → evidence chronology
  → mechanism → affected people, responsible organizations, incentives and
  contradictions → strongest counterargument → bounded conclusion → what
  could change it.
- **STRAiGHT TALK:** direct answer first → what is solid, contested and unknown
  → mechanism and limits → what the reader can check or do → sources, reviewed
  date and update trigger.
- **Dear Miss Jeeves:** recognizable problem → honest diagnosis → why ordinary
  prompting or restarting may not solve it → practical controls and recovery
  sequence → limits and next move.
- **Service desk:** one complete, category-specific payoff. It may link to a
  substantial explanation; it may not impersonate one.

## Mode A — Headline Reality Check

1. **What you may have seen** — the exact headline, publisher and date.
2. **What the story says** — a fair, plain-language summary before LAiDIES
   comments on it.
3. **What the evidence actually found** — open the underlying study,
   announcement, incident record or data and explain it from first principles.
4. **What the story got right.**
5. **What it overstated, omitted or blurred.**
6. **The real LAiDIES read** — what it actually means, why it matters, who it
   affects and what remains uncertain.
7. **Use it now** — one practical prompt, checklist, comparison, experiment,
   decision rule or honest statement that the reader cannot control this part.

Use this mode only when the exact reporting itself gives LAiDIES something
substantive to examine. A reputable publisher may still get the framing wrong;
a dramatic headline may also be fair. Decide from the evidence, not the brand
or tone.

## Mode B — Plain-Language Explainer

1. **What happened** — the announcement, result or event in one clear answer.
2. **What that means in ordinary life** — the human situation or question
   before any product name or technical term.
3. **How it works or how the finding was reached** — make the invisible process
   visible one causal step at a time; for research, explain what was actually
   tested, compared and measured.
4. **What the evidence supports** — separate a demonstrated result from a
   company claim, prediction or interpretation.
5. **What it does not tell us yet** — relevant limits, uncertainty and open
   questions without inventing controversy.
6. **Why it matters** — the realistic consequence for work, home, money,
   privacy, power, creativity or learning.
7. **Use it now, if earned** — a practical prompt, checklist, comparison,
   experiment or decision rule only when it genuinely exercises the concept.
   Otherwise end with the better question or watch point.

## Teaching method inside every substantial story

1. Start with the human puzzle.
2. Give one ordinary complete situation the reader can picture.
3. Make the invisible process visible one causal step at a time.
4. Introduce a technical label only after its ordinary meaning is clear.
5. Use an analogy only after the reader understands the object being compared.
6. Return to what changes for the reader.

The reporting mode may change; the teaching standard does not. Explain every
unfamiliar object, action and handoff before naming it with jargon. Preserve
the source's actual finding and limitations. Never turn a company announcement
into independent proof or turn a limited study into a rule about everyone.

The practical step must exercise the concept the story just taught. A prompt is
not automatically the right choice. Do not present prompting as a technical
security control, and never say that “show your reasoning” reveals a model's
hidden reasoning.

## Stop rule

Do not build another NewsStand framework artifact until one story written with
this method is understood and accepted by Ali. The current live NewsStand
remains untouched while the August 12 successor is repaired.
