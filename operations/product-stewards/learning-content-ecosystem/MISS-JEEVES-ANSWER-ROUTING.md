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

## LAiDIES answer-quality gate

A successful API response is not proof that an answer meets LAiDIES standards.
Prompt instructions, citations, model confidence and a visitor's positive
rating are useful signals, but none is editorial admission.

Miss Jeeves therefore uses three truthful answer labels:

| Label | Meaning |
| --- | --- |
| **Checked live** | A newly generated answer passed the automatic runtime checks below. It has not been independently reviewed by LAiDIES. |
| **LAiDIES reviewed** | The exact answer fingerprint passed the hard gates, scored at least 17/20 with no scored dimension below 3/4, and passed a role-distinct review. It may enter the private Answer Bank while current. |
| **Published reference** | The exact reviewed artifact also passed the admission and release gates for its named public surface. |

Every answer must pass these non-compensable hard gates before it may be shown
as **Checked live** or retained for reuse:

1. **Direct answer:** it answers every material part of the question and does
   not hide the answer behind background, scene-setting or a generic summary.
2. **Claim and source fidelity:** every material factual claim is supported by
   a displayed allowed source or a current admitted LAiDIES source; names,
   dates, figures and causal claims match that evidence.
3. **Freshness:** time-sensitive questions carry a checked date, current source
   coverage, material unknowns and an explicit recheck trigger.
4. **Beginner comprehension:** technical terms are defined on first use; an AI
   newcomer can explain what the subject is, why it matters, what is known or
   uncertain and what she can do next.
5. **Useful explanation:** the answer gives the concrete mechanism or decision
   logic needed for the question, plus limitations and consequences. An
   analogy is used only when it makes the mechanism clearer and states its
   limit.
6. **LAiDIES relationship integrity:** related LAiDIES material is included
   only when it genuinely extends the learner's job, and the link, status and
   description match the current admitted destination.
7. **Privacy and safety:** the answer does not expose private material, provide
   unsafe personalised professional advice or repeat harmful instructions.
8. **No known slop:** it contains no generic filler, padded repetition,
   manufactured certainty, decorative pop-culture reference, canned
   conclusion or previously rejected LAiDIES pattern.

The scored review uses five dimensions, each scored from 0 to 4:

- clear to a non-technical reader;
- directly useful for the question asked;
- builds a correct mental model rather than merely naming things;
- sounds and teaches like LAiDIES without imitating a person or forcing the
  town language; and
- concise, specific and free of AI-slop patterns.

An average cannot rescue a weak dimension. **LAiDIES reviewed** requires at
least 17/20 and no dimension below 3/4, after every hard gate passes. The maker
and reviewer must be different roles. The receipt binds the exact answer
fingerprint, question key, sources, checked date, model version, source-policy
version, related LAiDIES records, reviewer identity, findings and recheck
trigger.

Automated checks reject malformed, stale, unsupported, unsafe or mechanically
poor responses before display. A role-distinct model grader may help find
omissions, but it cannot admit its own answer or overrule a hard-gate failure.
The calibrated evaluation set includes representative beginner questions,
multi-part current-event questions, tool-choice questions, troubleshooting
questions, ambiguous questions and exact prior failures. It runs before any
prompt, model, retrieval or source-policy change and on the recurring freshness
cycle. Feedback adds reviewed failure cases to that set; it never becomes an
automatic training or publication instruction.

The current researched baseline is
`miss-jeeves-question-bank-v1/question-bank.json`. Its fifty questions are an
evidence-weighted product priority, not a literal gendered search-volume rank.
The companion `report-source.md` records the women-specific and broader usage
evidence, limitations and claim-to-source ledger. The complete bank runs as one
suite; a passing average cannot hide a failed safety, privacy, freshness or
beginner-comprehension question.

Only the second and third labels prove the exact output has met the full
LAiDIES bar. A novel **Checked live** answer is useful current guidance with
minimum controls, not a claim of independent LAiDIES approval.

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
- seemed like AI slop;
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
   this includes a distinct AI-slop signal for generic, padded, repetitive or
   formulaic answers;
3. adding exact failed examples to the Miss Jeeves evaluation set;
4. identifying missing Straight Answers, Dear Miss Jeeves entries, NewsStand
   coverage or LIBRAiRY concepts; and
5. comparing successor answer versions against the failure they were intended
   to fix.

A rating is a signal, not factual authority. It never automatically changes a
source, rewrites an answer, promotes a candidate, retrains a model or publishes
content. Material accuracy complaints create a review hold until checked.

## Abuse and cost protection

Miss Jeeves uses layered protection. No browser-only check, IP limit or model
refusal is treated as sufficient by itself.

### Accepted launch allowance and budget

The initial operating envelope is **US$50–150 per month**, with a **US$5 hard
daily provider-cost circuit breaker**. The service warns internally at US$2 and
US$4 of provider spend in a UTC day. The ceiling is a stop, not an alert: once
reached, Miss Jeeves serves current Answer Bank entries and admitted LAiDIES
results but does not start another paid generation or web search until the next
budget window.

- An anonymous visitor receives **three successful guest answers in total**.
  The interface shows the remaining count before the third answer, then asks
  her to create or connect a free Resident account.
- A Resident receives **five successful generated answers per day** at launch.
  Reopening an answer or receiving a current Answer Bank result does not spend
  this allowance.
- A request does not spend allowance when validation, moderation, provider,
  citation, quality or timeout handling fails before a usable answer is
  delivered.
- Account connection preserves the visitor's three guest answers. The gate is
  a continuation and saving benefit, not a loss of work.
- Burst protection remains separate from product allowance: no client may
  submit more than three answer requests per minute, and signed-in identity is
  not treated as proof that traffic is legitimate.

Cost-aware routing is mandatory. Use a current exact Answer Bank entry or
admitted LAiDIES result first; use the cheapest model that has passed the
calibrated Miss Jeeves evaluation for the learner job; run web search only when
fresh external evidence is required; and reserve GPT-5.6 Sol for questions that
the approved lower-cost route cannot answer to the required standard. A budget
failure must never silently lower answer quality or present stale information
as current.

1. **Keep the provider private.** The OpenAI credential remains server-side and
   the answer Worker accepts calls only from the internal service path. The
   public browser calls the bounded LAiDIES endpoint, never OpenAI directly.
2. **Validate before spending.** Reject wrong methods and content types,
   oversized or malformed input, apparent credentials and personal data before
   retrieval or model invocation. Run the provider's current moderation check
   before the expensive answer call while preserving legitimate educational
   questions about safety, bias and cybersecurity.
3. **Layer request limits.** Enforce the accepted three-per-minute burst limit,
   guest and Resident allowances, endpoint-specific limits for answering,
   saving and feedback, and the US$5 global daily cost circuit breaker. Neither
   signed-in nor anonymous visitors receive an unlimited route.
4. **Challenge suspicious traffic, not everyone.** Ask for a Cloudflare
   Turnstile check only after suspicious volume, automation signals or repeated
   rejected requests. Validate every challenge token on the server and never
   treat a client-side widget alone as protection.
5. **Send a privacy-safe safety identifier.** Bind OpenAI requests to a stable
   HMAC-derived account or anonymous-client identifier. Never send an email,
   Resident number, IP address or other raw identity as that identifier.
6. **Bound provider work.** Preserve the execution timeout, output-token and
   response-byte ceilings; allow no automatic retry loop; limit tools to the
   required web search and governed domains; require allowed citations before
   returning current guidance.
7. **Reuse checked work.** Serve current governed Answer Bank entries for
   equivalent public questions rather than paying for identical research every
   time. Never share a private saved answer through this cache.
8. **Protect feedback integrity.** Require a valid answer receipt and exact
   answer fingerprint, allow one active rating per receipt/client, append
   superseding changes, rate limit submissions and exclude obvious automated
   floods from quality aggregates.
9. **Monitor without collecting conversations.** Record controlled outcome,
   refusal, limit, latency, cost band and abuse-reason categories. Alert on
   spend spikes, distributed request spikes, repeated moderation failures and
   sudden negative-feedback changes without logging raw questions by default.
10. **Fail usefully.** A limit or circuit breaker returns a plain explanation
    and still offers admitted LAiDIES search results when available. It does not
    expose provider errors, keys, internal prompts or security thresholds.

Thresholds begin as measured operational settings, not permanent editorial
rules. Tighten or relax them using legitimate-use, false-positive, latency and
cost evidence. A distributed attacker can rotate IP addresses; the global cost
breaker is therefore mandatory even when per-client limiting works.

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
