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
| `internal_reusable` | Miss Jeeves and authorised LAiDIES editors | A public-safe, de-identified answer in the private LAiDIES Answer Bank. Miss Jeeves may reuse it for equivalent questions while it remains fresh, but visitors cannot browse or search it. |
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

## Private LAiDIES Answer Bank

The Answer Bank lets LAiDIES retain a strong answer for future Miss Jeeves
responses without publishing it. It stores the reusable knowledge, not the
visitor's conversation.

Each bank entry requires:

- a stable governed answer key and public-safe canonical question;
- a plain-language answer with its direct sources;
- related admitted LAiDIES concepts and destinations;
- model and source-policy versions;
- checked date, freshness window and exact recheck triggers;
- answer fingerprint and correction history; and
- `internal_reusable` visibility, which is never publicly indexed.

Equivalent future questions may use the bank entry while it is current. The
visitor still receives an answer tailored to her wording, but the factual core,
sources and LAiDIES learning links remain consistent. If the bank entry is due,
Miss Jeeves refreshes the sources before using it. If the facts materially
changed, the prior entry is superseded rather than silently overwritten.

The Answer Bank receives only public-safe, de-identified material. It excludes
raw prompts, identities, attached files, personal circumstances, confidential
workplace information and account data. A separate editorial act is required
to move an entry to `internal_candidate`, and the normal admission process is
required to make it `public_admitted`.

## Response-quality feedback

Every completed Miss Jeeves answer offers **Helpful** and **Not helpful**. After
either choice, the visitor receives one-tap reason buttons. No text field appears
unless she chooses **Something else**. Most feedback therefore takes two taps
and requires no typing.

Helpful reasons:

- answered my question;
- easy to understand;
- useful next step;
- good sources; and
- useful LAiDIES connection.

Not-helpful reasons:

- did not answer my question;
- confusing or too technical;
- inaccurate or outdated;
- missed important context;
- weak, missing or broken sources;
- too long; and
- too brief.

**Something else** reveals an optional short note field. It is an escape hatch,
not the primary feedback mechanism. The interface warns the visitor not to
include personal, confidential, workplace or account information. Notes are
restricted review material with a short retention period; the durable
measurement keeps only controlled reason categories and aggregate counts.

Feedback binds to the exact answer fingerprint, governed answer key, answer
mode, model version, source-policy version, checked date and displayed LAiDIES
results. It does not need the raw question or visitor identity. Submissions are
idempotent and rate limited, and a visitor can change her rating through a new
superseding event rather than rewriting history.

Feedback improves the service by:

1. ranking internal Answer Bank entries for review;
2. finding repeated comprehension, sourcing, currency and relevance failures;
3. adding exact failed examples to the Miss Jeeves evaluation set;
4. identifying missing Straight Answers, Dear Miss Jeeves entries, NewsStand
   coverage or LIBRAiRY concepts; and
5. comparing successor answer versions against the failure they were intended
   to fix.

A rating is a signal, not factual authority. It never automatically changes a
source, rewrites an answer, promotes a candidate, retrains a model or publishes
content. Material accuracy complaints create a review hold until checked.

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
