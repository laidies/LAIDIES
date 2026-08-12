# NewsStand editorial radar

**Status:** ACTIVE OPERATING RULE  
**Owner:** Codex runs the radar; Ali rules on publication  
**Public contract:** The Breaking + The Daily + The Weekly + The Big Question
**Purpose:** identify consequential AI stories without waiting for Ali to spot
them, then turn only the qualified ones into evidence-backed editorial
candidates.

## The promise

Ali should not have to monitor the AI news cycle or recognize that a story
belongs in LAiDIES.

The radar runs twice each day. It:

1. gathers current signals;
2. identifies the one or two developments with real consequence;
3. builds LAiDIES' initial read from primary evidence;
4. uses the AI Daily Brief as an analytical cross-check when it has covered the
   topic;
5. decides **THE BREAKING / THE DAILY / THE WEEKLY / THE BIG QUESTION / a justified
   combination / WATCH / PASS**;
6. prepares a review-ready packet for qualified stories; and
7. brings Ali one editorial decision rather than a feed.

It never auto-publishes.

## Intake

Read the complete relevant source, not a headline or RSS snippet.

### Primary sources first

- official model-company announcements, system cards and incident disclosures;
- affected-party disclosures;
- government, regulator, court and standards-body publications;
- original research papers and evaluator reports;
- company filings or official product documentation when business/product
  claims are involved.

### Independent reporting

Use reputable reporting to uncover facts, disagreements and timelines the
participants may not volunteer. Reuters and AP are preferred for load-bearing
reported facts; strong specialist reporting such as Ars Technica, MIT
Technology Review, TechCrunch, Wired and The Verge may supply technical context.

### AIDB editorial check

After the independent LAiDIES read exists, read the complete AI Daily Brief
analysis when it has covered the topic.

Also check the AIDB Intelligence Desk handoff inbox under
`operations/agents/aidb-intelligence-desk/handoffs/newsstand/` and follow
`operations/agents/aidb-intelligence-desk/handoffs/NEWSSTAND-INTERACTION-CONTRACT.md`.
The handoff may contain resolved practitioner sources and model-use evidence,
but it is an intake signal—not a score, edition decision, or publication
instruction. Reopen material current sources before relying on them.

Record:

- where the analyses agree;
- what AIDB noticed that LAiDIES did not;
- what LAiDIES found that AIDB omitted;
- real disagreements and the evidence needed to resolve them; and
- distinctive AIDB reporting, wording or argument actually used.

AIDB is a trusted second opinion, not an automatic factual source or answer
key. Running this check does not itself require public attribution.

Record the inbound handoff disposition as `CONSUMED`, `MERGED`, `WATCH`,
`PASS`, `STALE`, or `SOURCE CONFLICT` in `aidb-comparison.md` or the radar log.
For model releases, keep the jobs distinct: NewsStand owns what changed and why
it matters now; the AIDB learning route may separately teach how to interact
with the model. Share evidence identifiers rather than producing duplicate
treatments.

## Evidence-decoding gate

A reputable publication is not publication authority for its own framing.
Reporting may expose facts, disagreements, timelines and source trails that a
company, institution or researcher omits. LAiDIES must still recover and read
the underlying study, dataset, filing, technical record, regulator document or
affected-party evidence for every load-bearing claim.

Before any NewsStand story advances, its evidence record must explain:

1. the circulating framing or headline risk;
2. what actually happened;
3. what the strongest evidence establishes;
4. what it does **not** establish;
5. the relevant mechanism rather than only the reported outcome;
6. the realistic current impact for people, work, products or policy;
7. uncertainty and what evidence would change the assessment; and
8. the editorial decision: correct, qualify, explain, watch, hold or pass.

When a study, preprint, evaluator report or dataset is involved, also record
the research question, publication/review status, design, population,
comparison, measures, actual result, limitations, causal boundary,
generalization boundary, funding/conflicts and practical meaning. An abstract,
press release, university summary, newspaper article or impressive percentage
cannot substitute for this study decode.

Then complete the AIDB cross-check described above. Record agreement, what
AIDB added, what LAiDIES added, unresolved disagreements and any distinctive
AIDB analysis actually used. If AIDB did not cover the topic or was
unavailable, record `NOT_COVERED` or `UNAVAILABLE` with the date and reason.
Never invent a comparison or treat AIDB as the underlying evidence.

Missing any required field is `HOLD`, regardless of the newspaper, university,
company or commentator's reputation.

## Headline reality check

Sensational, viral or misleading coverage can be a high-value candidate when
the correction teaches an important underlying concept. Do not reject it
merely because the circulating framing is poor.

For these candidates, record:

1. the circulating claim, paraphrased without unnecessary repetition;
2. a verdict: `SUPPORTED`, `TRUE BUT INCOMPLETE`, `MISLEADING`, `DISPUTED` or
   `UNSUPPORTED`;
3. the exact words, omitted conditions or causal leap creating the distortion;
4. what the strongest evidence actually establishes;
5. what it does not establish;
6. why the distinction matters for a reader's understanding or decisions; and
7. the important real takeaway.

The correction must be more prominent and memorable than the sensational
claim. Do not reproduce a false claim in a headline without an immediate
correction, reward virality as evidence, or manufacture false balance around a
settled fact. If repeating the claim could create material harm, route it to
`HOLD`.

## Model and feature release check

New model releases are core The Breaking candidates when they change a reader's
real choices. Feature releases begin in DAILY unless their urgency or
consequence independently warrants The Breaking. Do not cover every launch. A
release qualifies when it materially
changes capability, access, price, speed, limits, privacy, safety, workflow or
the sensible division of tasks between products.

For each release, answer:

1. What exactly launched: company, product, model family, public model label,
   version and feature?
2. Who can use it now, on which plans, platforms, regions and APIs?
3. What changed from the relevant predecessor—not merely from a weaker
   marketing comparison?
4. What does it cost, what are the limits and did any default or fallback
   behaviour change?
5. Which reader tasks are now meaningfully easier, cheaper, faster or newly
   possible?
6. Who should switch, test first, wait or ignore it?
7. Which performance claims come from the vendor, which have independent
   support and which remain unverified?
8. What should be tested in real use before LAiDIES strengthens the
   recommendation?

The practical choice change is the story. Benchmark tables, launch adjectives
and a new version number are evidence to examine, not sufficient editorial
value.

## Qualification gate

Score each candidate from 0–3 on six dimensions.

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Consequence | chatter only | minor product detail | meaningful user/industry change | safety, rights, money, work, policy or real-world harm |
| Novelty | repetition | incremental | material new evidence/capability | changes the field's working assumptions |
| LAiDIES relevance | no reader effect | specialist interest | useful workplace/personal meaning | reader needs a new decision or mental model |
| Evidence | rumours | one interested source | primary source or solid corroboration | multiple primary/independent sources with claim map |
| Durability | hours | a few days | matters through the week | opens a continuing question/thread |
| Editorial value | no useful angle | summary only | strong explanation or argument | distinct The Weekly + The Big Question jobs |

### Escalation

- **15–18 · IMMEDIATE / P0:** investigate immediately. Build the complete claim
  map and the warranted editorial draft(s). Alert Ali in the task.
- **11–14 · QUALIFIED / P1:** prepare a candidate brief and recommended edition.
  Alert Ali at the next radar run.
- **8–10 · WATCH:** log the development and its promotion trigger. Do not
  interrupt Ali.
- **0–7 · PASS:** no editorial action.

A candidate with evidence below 2 cannot become P0 regardless of total score.
A rumour may be watched; it cannot be upgraded by repetition.

The Breaking has no quota. Only P1/P0 candidates may enter it, and shadow
auto-eligibility uses the stricter machine-policy floor: at least 13/18,
evidence 3, consequence 2, LAiDIES reader relevance 2, editorial value 2,
novelty 1 and durability 1. A clear day is a successful radar result, not a
content vacancy to fill.

## Edition decision

### The Daily

Use for the edited briefing of consequential changes since the previous issue.
The Daily is a product, not merely the radar cadence. Each included item still
needs prior context, what happened, the mechanism in plain language, why it
matters, what changes for the reader, uncertainty and watch points. It has no
quota.

Feature releases normally begin here when they change a practical choice but
do not require an immediate alert. A qualifying new model release belongs in
The Breaking. Several qualified developments may share one DAILY issue; unranked
headlines and filler may not.

### The Breaking

Use only when the reader needs a concise, timely update before the next DAILY
briefing or weekly edition:

- the minimum prior context needed to understand the story;
- what changed since the previous briefing;
- how the underlying product, policy, incident or mechanism works;
- why it matters now;
- what is confirmed and still uncertain;
- what it changes—or does not yet change—for the reader; and
- what evidence would change the assessment.

The Breaking is intended to become an edited rapid-response desk, not the
retired TODAY raw feed. It is not currently live or authorized to publish.
Group related developments, omit low-value churn and link to full sources.
Concision may
remove repetition; it may not remove explanation. A headline, feature list or
press-release paraphrase fails The Breaking gate even when every fact is sourced.
A polished explanation of a low-consequence or low-relevance development also
fails; writing quality cannot promote filler into news.
A major or high-risk development may appear in The Breaking as a clearly bounded
alert while its analysis remains held for human review.

A headline reality check may qualify when the circulating framing is
sensational or misleading but the correction supplies a consequential mental
model. Its value comes from the corrected understanding, not from the
popularity of the bad claim.

A model or feature release may qualify when it changes a real reader choice.
Flag it `model-release` or `feature-release` and require
`releaseDetailsComplete`; otherwise reject it as an announcement rewrite.
For LAiDIES, a model release that passes this complete choice-change gate is
The Breaking even when it is not an emergency. “Breaking” means the model
landscape has materially changed now. A version number, vendor adjective or
benchmark table without a reader decision remains filler.

### The Weekly

Use when the reader needs:

- what happened;
- what is confirmed, disputed and unknown;
- what it means;
- what impacts it could have;
- how to think about it; and
- what to watch next.

### The Big Question

Use only when the story contains a real argument or unsettled question:

- people disagree about what the event means or what should happen;
- accountability, incentives, power or values are at stake;
- the evidence does not produce one obvious conclusion; and
- LAiDIES has a sourced position or is genuinely translating a named outside
  argument.

### Both

Use both only when their jobs remain distinct:

- The Weekly reports and explains the event.
- The Big Question investigates and follows the argument.

Never produce two paraphrases of the same story.

### Watch

Use when the development matters but the source record is incomplete. State the
exact trigger for promotion, such as a technical report, regulator filing,
affected-party update or corroborated impact.

## What a qualified packet contains

Create:

`operations/drafts/news-radar/YYYY-MM-DD-[slug]/`

with:

1. `triage.md` — score, decision and why now;
2. `research-and-claim-map.md` — confirmed/disputed/unknown, shows/does-not-show,
   source hierarchy and publication-day rechecks;
3. `aidb-comparison.md` — internal analytical comparison, if AIDB covered it;
4. `daily-brief-draft.md` — only when DAILY is warranted;
5. `breaking-news-draft.md` — only when The Breaking is warranted;
6. `weekly-deep-dive.md` — only when The Weekly is warranted;
7. `tribune-draft.md` — machine-compatible store for The Big Question, only when a distinct investigation and argument are warranted;
8. `integrity-report.md` — facts/take/freshness/capture/publication gates; and
9. `candidate.json` — the structured evidence, risk and check record consumed
   by `scripts/evaluate-newsstand-autopublish.mjs`.

Run the review router after the packet is complete and record its `REJECT` or
`HOLD_FOR_INDEPENDENT_REVIEW` verdict in `triage.md` and the radar log. A
candidate proposal is not evidence: its labels, scores, source types and
booleans do not authorize publication. Until a separately implemented
independent signed/hashed authority exists, every non-rejected proposal stays
held and cannot edit public files or deploy.

The task alert to Ali contains:

- **Why this cleared the bar**
- **Recommended treatment** — The Breaking, The Daily, The Weekly, The Big Question, a combination or Watch
- **The three facts that matter**
- **What remains unknown**
- **The impact / how to think about it**
- **The AIDB cross-check result**
- **The one decision Ali is being asked to make**

## Noise control

- Do not send Ali a list of headlines.
- Do not escalate ordinary product launches, benchmark bumps, funding rumours
  or recycled fear stories unless they change a reader decision.
- Group multiple reports about one event into one candidate.
- Do not repeat an alert unless the status changes or new evidence changes the
  recommendation.
- A clear radar run with no qualified story records `CLEAR` in the log; it does
  not manufacture a story to justify the run.

## State and continuity

`operations/newsstand-radar-log.md` is the durable queue.

Every candidate has one status:

- `WATCHING`
- `QUALIFIED`
- `PACKET READY`
- `WOULD AUTO-PUBLISH` (shadow-mode calibration only)
- `ALI REVIEW`
- `APPROVED`
- `HELD`
- `SUPERSEDED`
- `PUBLISHED`

The log records the last checked time, score, edition decision, current source
state, promotion trigger and packet path. A later run updates the existing row
instead of creating a duplicate.

Public proof remains separate: `PUBLISHED` requires the approved story in
`content/newsstand-stories.js`, validation, deployment and a verified public
NewsStand URL.

The autonomy policy and promotion conditions live in
`operations/newsstand-earned-autonomy.md`. Until that document's Level 2
conditions are met and explicitly authorized, the public gate in D-030 remains
in force.
