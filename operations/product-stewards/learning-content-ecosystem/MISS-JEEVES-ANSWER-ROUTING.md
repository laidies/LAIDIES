# Miss Jeeves answer reuse and publication routing

**Status:** ACCEPTED PRODUCT RULE — IMPLEMENTATION REQUIRED
**As of:** 2026-09-04
**Decision owner:** Ali Eakin
**System owner:** Learning-content ecosystem

## The decision

Miss Jeeves may reuse a previously checked answer, but the runtime answer cache
is not a publishing surface. A saved answer must pass freshness and publication
review before it appears as an authored LAiDIES item.

Saving and publishing are separate actions. A visitor may keep a useful answer
privately without making it visible to another visitor, searchable on the public
site or eligible for a publication surface.

Each useful answer receives one primary home. Other surfaces link to that home
and add only the job that is distinct to their format.

| Primary home | Put an answer here when… | Do not use it for… |
| --- | --- | --- |
| **Straight Answers About AI** | The question is broadly useful, the core answer should be substantially the same whoever asks it, and readers will still need the explanation after the immediate news cycle. | Personal advice, troubleshooting a particular situation, or a dated news update. |
| **Dear Miss Jeeves** | The value comes from applying AI knowledge and judgment to a recognisable situation, goal, constraint or confusion. The letter and response help other readers reason through similar situations. | A dictionary definition with a decorative letter wrapped around it. |
| **NewsStand** | The reason to read is what happened, why people are discussing it now, what is confirmed, and what to watch next. The item loses material value as the event ages. | The only durable explanation of the underlying company, model or concept. |
| **LIBRAiRY lesson or book section** | A safe and useful answer requires prerequisites, a sequence, worked examples, practice, misconception resistance or substantially more depth than one answer can carry. | A brief lookup answer or a single current event. |
| **Tool or site help** | The question is about how a specific LAiDIES feature works, what it can access, or how to complete a task on the site. | General AI education or independent product advice. |
| **Do not publish** | The question is personal, confidential, identifying, duplicative, unsupported, too narrow to help another reader, or cannot be made accurate without speculation. | Public content of any kind. |

## Route the learner job, not just the wording

One question may contain several learner jobs. Split those jobs instead of
duplicating the whole answer across surfaces.

Example: **“What is Hugging Face, why is it called that, why is it worth so
much, why would NVIDIA want it, and why is it in the news?”**

- **Straight Answers About AI** owns the durable company explanation, the name,
  the business/value explanation and the strategic reasons a chip company may
  value the platform.
- **NewsStand** owns the dated incident or transaction, what is confirmed now
  and what remains unresolved.
- **LIBRAiRY** owns the underlying concepts: model hubs, open models, agents,
  permissions, sandboxing and supply-chain risk.
- **Miss Jeeves** assembles those current, admitted pieces into one plain-language
  response. It does not create four competing versions of the truth.

## Straight Answers test

Route to Straight Answers only when all are true:

1. **Same-answer test:** the factual core would be substantially the same for
   different readers.
2. **Durability test:** the explanation remains useful beyond the current news
   cycle, even if figures or examples need refreshing.
3. **Lookup test:** a reader is likely to search for the answer again.
4. **Evidence test:** the answer can carry direct sources, confidence, unknowns,
   a checked date and an explicit recheck trigger.
5. **Distinctness test:** an existing admitted answer does not already own the
   same learner job.

## Dear Miss Jeeves test

Route to Dear Miss Jeeves only when all are true:

1. **Situation test:** the reader's goal, constraints or confusion materially
   change what a helpful response should say.
2. **Transfer test:** another reader can recognise the situation and reuse the
   reasoning, not merely copy a product recommendation.
3. **Privacy test:** the letter can be safely anonymised without preserving raw
   personal, workplace or account details.
4. **Judgment test:** the response demonstrates how to decide, diagnose or ask
   the next question; it is not a disguised glossary entry.
5. **Source test:** factual claims still point to current admitted sources and
   durable concepts.

## Runtime reuse and freshness

1. Normalise a public, non-sensitive question to a governed answer key. Never
   use raw personal question text as a public cache key or publication title.
2. If an admitted answer for that key is still inside its freshness window,
   return it with **Checked [date]** and its sources.
3. If it is outside the window, if a source changed, or if its source policy
   changed, run a new sourced check before answering.
4. If the factual result is unchanged, renew the checked date and preserve the
   stable answer identity.
5. If material facts changed, create a successor version, retain correction
   history and update every linked surface.
6. A cache miss may produce a live Miss Jeeves answer, but it enters an
   editorial candidate queue rather than publishing automatically.

## Visibility states

Every retained answer has exactly one visibility state:

| State | Who can see it | What it is for |
| --- | --- | --- |
| `transient` | The person in the current answer session | An answer that has not been saved. |
| `private_saved` | Only the person who explicitly saved it | A useful personal reference in her own saved items. It is not public search material and creates no publication candidate by itself. |
| `internal_candidate` | Authorised LAiDIES editorial systems and reviewers | A public-safe, de-identified candidate being checked for possible publication. |
| `public_admitted` | Everyone | A reviewed, sourced and admitted Straight Answer, Dear Miss Jeeves entry, NewsStand item, lesson or help page. |

An answer never changes from `private_saved` to `internal_candidate` or
`public_admitted` merely because it was saved or asked repeatedly. Promotion
requires a separate public-safe governed question and editorial decision. Raw
personal wording, attached material, account details and workplace context do
not enter the shared cache or candidate queue.

A private saved answer keeps its original checked date and sources. When it is
opened outside its freshness window, the interface must label the saved version
as potentially outdated until a sourced refresh completes. A materially changed
refresh creates a new version while preserving the previous version's date; it
must not silently rewrite what the visitor originally saved.

## Promotion priority

An answer becomes a publication candidate when at least one is true:

- the same governed question is asked repeatedly;
- it exposes a common misconception or consequential safety issue;
- it fills a known gap in the concept graph;
- it is unusually useful and reusable even before demand is high; or
- Ali explicitly asks to preserve or publish it.

Frequency helps prioritise. It does not replace the evidence, freshness,
anti-slop, fit and independent publication gates.

## Required candidate record

Every promotion candidate records:

- governed answer key and public-safe question;
- proposed primary home and any secondary links;
- the learner job and routing reasons;
- source packet, checked date, confidence and recheck trigger;
- closest existing canon and duplicate check;
- privacy decision;
- draft/specified/reviewed/admitted/published state;
- exact artifact identity and correction owner when admitted.
