# NewsStand editorial production standard

**Status:** BINDING PRODUCER INPUT
**Owner:** NewsStand
**Applies before:** any public-facing NewsStand draft

This is a production standard, not a review checklist. The producer uses it to
decide what to write, in what order and at what scale before generating full
prose. A completed contract that merely describes these qualities does not
satisfy the standard.

## 1. Route the source before writing

Choose the reader job first. One source may earn more than one destination,
but each destination needs a distinct payoff.

- **The Breaking:** a rare interruption. Waiting until the next Daily would
  materially disadvantage the reader.
- **The Daily:** a concise dated account of what changed, what it actually
  means and what the reader should know or do today.
- **The Weekly:** a synthesis of at least two developments that shows what
  accumulated, conflicted or changed direction.
- **The Big Picture:** a deeper evidence-led answer to a consequential question
  or pattern. It distinguishes confirmed evidence, inference and position.
- **STRAiGHT TALK:** a durable plain-language answer to a recurring AI question.
  It is updated through linked dated follow-ups rather than silently rewritten.
- **Dear Miss Jeeves:** one common practical problem, why it keeps happening,
  and what to try next. It never pretends one prompt can enforce a system rule.
- **Paige's Practical AI Tip:** one useful work-facing AI move.
- **Career / Work-Life:** useful career or life guidance whose AI connection is
  explicit and earned; the original advice does not need to be about AI.
- **Promptoscope:** one playful, slightly funny non-work AI use or prompting
  lesson. It cannot be Paige's Tip with a horoscope eyebrow.

If the route cannot be stated in one sentence, do not draft.

### 1a. Every feature needs its own full example

A feature template is not complete when it contains only headings, target word
counts or tone adjectives. Before a lane can draft autonomously, it must bind:

1. the lane's distinct reader job, source rules, cadence, length and destination;
2. one complete, source-bound, publish-shaped positive exemplar that Ali has
   accepted for that exact lane;
3. the applicable rejected examples and a plain explanation of why they fail;
4. a producer self-check that reads the exact output and can stop publication;
5. the fields required to store, date, correct, archive and render the item; and
6. a freshness trigger and accountable owner.

The positive exemplar is a teaching reference, not fill-in-the-blanks copy. A
producer must reproduce its reasoning quality and lane distinction, not its
subject, sentence rhythm, jokes or surface wording. A short sampler, isolated
opening, outline, synthetic placeholder or maker-authored `PASS` cannot serve
as the positive exemplar.

`daily_news` requires one accepted full exemplar for each enabled story mode:
`REPORT_OR_ANNOUNCEMENT`, `HEADLINE_OR_REPORTING_CHECK` and
`UPDATE_TO_PRIOR_COVERAGE`. A mode without its own accepted exemplar remains
manual-review-only even if another Daily mode is ready. Other lanes require at
least one accepted full exemplar; materially different submodes require their
own examples rather than being inferred from the first.

Until the exact binding exists in
`NEWSSTAND-FEATURE-LANE-REGISTRY.json`, the lane may create a private candidate
for review but cannot claim autonomous production or publish it.

## 2. Select the story mode

The producer must choose one mode. Do not force every story into a media
correction.

### REPORT_OR_ANNOUNCEMENT

Use when the source reports a genuine announcement, event or research finding
without a material misleading-reporting problem.

Order:

1. what happened, in plain language;
2. the minimum background a newcomer needs;
3. how it works, cause by cause;
4. what the evidence establishes and does not establish;
5. why it matters, with one work and one non-work example where material;
6. what to do, notice, test, wait for or ignore.

### HEADLINE_OR_REPORTING_CHECK

Use only when a public headline or account materially distorts, omits or
overstates the evidence.

Order:

1. what the headline or common account says;
2. what the underlying evidence actually establishes;
3. the missing background or mechanism;
4. what the account gets wrong, with exact scope;
5. the real read and why the difference matters;
6. one useful reader action or better question.

### UPDATE_TO_PRIOR_COVERAGE

Use when new information changes or clarifies a previously published story.
Never quietly overwrite the earlier article.

Order:

1. on which date LAiDIES reported what;
2. what new information is now available;
3. what changes and what does not;
4. the updated evidence boundary and action;
5. links in both directions between old and new coverage.

## 3. Build the representative proof before drafting

The producer creates only these items first:

1. one reader question;
2. one-sentence payoff;
3. factual, non-teasing headline;
4. opening of no more than 90 words that gives the answer and audience boundary;
5. newcomer background in plain nouns and verbs;
6. a three-to-six-link causal outline;
7. what the evidence establishes and does not establish;
8. one workplace and one non-work application when the subject materially
   reaches both;
9. one useful landing;
10. every planned number with its exact unit and the first sentence that will
    introduce it;
11. exact reader-facing source labels and URLs, not “provider documentation”;
12. one planned voice move or analogy, its teaching job and where it stops;
13. the intended length and why this belongs in this publication rather than a
    longer or shorter one;
14. a short section plan in which every heading makes a useful promise and
    every section has one distinct reader job; and
15. any phrase caps needed to prevent a central instruction from becoming
    repetitive;
16. for any material statistics, one exact point-of-use attribution sentence
    naming the source and year before the figures; and
17. one exact bridge from the research method to the result when the reader
    otherwise has to infer how the method produced the finding;
18. one natural sentence explaining the relationship between statistics that
    change group, unit or filter; and
19. one human truth beyond the central analogy: an observed workplace or
    daily-life behaviour that makes the mechanism feel recognisable rather
    than merely compliant; and
20. when the mechanism depends on an invisible object, one exact sentence
    naming where that object lives, plus one exact sentence naming how the
    evidence was recovered or observed; and
21. a central-instruction plan with exactly three permitted jobs — answer-first
    opening, direct action and closing transfer question — plus prohibited
    restatements that would turn teaching into repetition; and
22. an exact incident-action sentence that assigns behaviour to the tool or
    session and carriage to the file, plus a plain gloss for any technical or
    research-filter term a newcomer would otherwise have to infer.

The proof fails when the headline withholds the point, the opening begins with
jargon or a statistic, background arrives after the mechanism, the causal
outline is labels rather than causes, the action belongs only to a technical
specialist without an explicit audience boundary, or the planned length exceeds
the reader job. A number without its unit, a source the reader cannot open or a
voice plan that merely says “make it LAiDIES” also fails. Repair the proof; do
not draft around the failure.

Generic scaffold headings such as “What happened” do not count as a section
plan. Two sections may not both explain what to share or repeat the same action
under different labels. When a statistic is a subset, its first-use sentence
must name the base as well as the subset. An analogy limit belongs in natural
reader language; phrases such as “the analogy stops here” expose production
notes instead of teaching.

The section plan names each section's job type. An `EXAMPLES_ONLY` section
shows stakes and transfer without giving the action again; one `ACTION` section
owns the imperatives. Number-plan notes such as “this next number counts” or
“the figure below uses” are internal scaffolding, not public prose. State the
relationship as an ordinary fact.

Use one stable plain term for each technical object. A single analogy pair may
clarify that object, but rotating through several metaphorical synonyms makes
the reader translate instead of learn. Every source shown to the reader must
support a claim or mechanism that actually appears in the prose; remove public
citations that no longer have a visible job. Two planned numbers may share one
first-use sentence when that is the clearest way to state a base and subset.
When a source changes groups or units without publishing the linking
denominator, say that plainly. Never invent a base merely to make two numbers
look comparable.

The source list at the end does not satisfy point-of-use attribution. A reader
must be able to see who produced a material statistic and when without leaving
the paragraph. Likewise, placing the method and the result in neighbouring
sections does not prove the causal connection; write the connecting sentence.
When several figures build one finding, the proof also fixes their reading
order. Introduce each number before explaining its relationship to another;
never make a reader hold “the detail count” or “that group” while waiting to
learn which number it means. Name the actor, the object and what the object
carries: a tool may connect to an account; a file carries the resulting detail.
Do not give a file the tool's behaviour.

An action section begins with a direct reader instruction. Avoid dangling
set-ups such as “For an AI-assisted result, copy…” when “When you share an
AI-assisted result…” names the action and actor immediately.

The evidence sequence places the recovery method before the result that depends
on it. A later phrase such as “using that attack” is invalid unless the move was
already named in plain language. When one result says most details were visible
and a subset was sealed-only, say both; do not let the headline's unusual subset
stand in for the whole sample.

Do not stack a whole, subset, changed filter, unit warning and hidden-only result
in one paragraph merely because each sentence is individually correct. Insert
the planned paragraph breaks between changed bases and before the final
comparison so the reader can reset.
State the evidence as ordinary facts. Reader coaching such as “the number to
remember,” “you do not need to remember every number,” “the useful split is,”
or similar narration of the writer's number plan is production scaffolding and
never belongs in the published story. A method sentence must also name its real
object; “that sealed part” cannot stand in for the sealed part taken from a
published work file when a newcomer has not yet met a specific object.

## 4. Daily story scale and shape

A Daily lead is normally **350–700 words**. Shorter is allowed when the useful
truth is small. Longer requires a written reason why the mechanism cannot be
explained within 700 words; otherwise route the deeper treatment to The Weekly,
The Big Picture or STRAiGHT TALK and keep the Daily concise.

The headline states the news or useful distinction. It does not tease danger,
hide the subject, ask a weak rhetorical question or promise a revelation.

The opening answers, in this order:

1. What happened?
2. Why does it matter?
3. Who is this for—or who does not need to worry?

Technical terms may appear only after their ordinary meaning is established.
An analogy must map a real mechanism and return to it. Rewind Era references
are optional and must teach; they are not evidence of LAiDIES voice.
The proof also binds at least two exact warmth lines to named, different section jobs.
They must make the reader feel seen or add a light human observation while
preserving the mechanism. A lone analogy in otherwise procedural prose does not
meet the voice requirement.

## 5. The complete Daily is the product

The NewsStand route opens on the complete dated Daily newspaper, not an arrival
hero, rack selector, article shell or dashboard. Breaking appears at the top
only when it genuinely qualifies. Daily news and admitted service desks share
one issue. Weekly and Big Picture remain obvious alternate papers. Search,
topics and the archive are easy to find but secondary to today's issue.

A story can pass editorial production and still not constitute a Daily issue.
Before page production, the issue receives one exact composition outcome:

- `MULTI_STORY` contains one ranked lead and at least one qualified secondary
  story. Every assessed candidate has an explicit qualified, hold, watch,
  duplicate or no-build disposition; a qualified story cannot silently vanish.
- `ONE_STORY_HOLD` records the one qualified development but cannot advance as
  the complete Daily. The producer waits for another qualified story rather
  than padding the issue.
- `NO_NEWS_SERVICE_EDITION` contains no qualified news story and may advance
  only when at least two admitted recurring columns carry genuinely useful
  substance in the paper. Empty slots remain honest and never count as content.

Every ready service column exposes its useful substance in the newspaper.
Opening or following a route is reserved for genuine additional depth, not for
discovering the tip itself. Breaking is either explicitly clear or separately
proves why waiting for the next Daily would disadvantage the reader. Weekly and
Big Picture remain visible alternate papers; archive and topic controls remain
visible but secondary to the current issue.

The issue does not pass until its full desktop and mobile pages visibly read as
one LAiDIES newspaper and Ali approves that exact complete artifact.

## 6. Producer stop conditions

The producer stops before full drafting when:

- the exact source/claim map is missing or stale;
- the publication route or story mode is unresolved;
- the representative proof does not pass;
- the proposed headline or opening repeats a registered Ali rejection;
- the useful point cannot be stated without unexplained technical vocabulary;
- the Daily plan is really a Weekly, Big Picture or reference treatment; or
- the page plan is not the complete Daily newspaper.

Independent review remains a release backstop. It is not the producer's first
opportunity to learn the format.

Before requesting independent review, the producer reads the exact draft from
headline through sources as if no contract existed. It must reconcile every
number to the proof's number plan, open every reader-facing source, resolve
ambiguous pronouns, cut repeated claims and locate the planned voice move in the
actual prose. Any objective defect found later means this producer preflight
failed and must be strengthened before another draft is reviewed.
