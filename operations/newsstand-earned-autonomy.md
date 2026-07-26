# Newsstand earned autonomy

Status: ACTIVE  
Owner: LAiDIES / SUNNYVAiLE editorial system  
Started: 2026-07-24

## Objective

Build a news operation that can eventually publish routine, well-supported AI
news without waiting for Ali, while sending ambiguous, consequential or
high-risk stories to a human.

The target is not “no editorial control.” It is editorial control expressed as
policy, tests, audit records, monitoring and rollback instead of approval of
every story.

## Autonomy ladder

### Level 0 — manual packet

The radar identifies a story and prepares research, a claim map and drafts.
Nothing publishes without human review.

### Level 1 — review routing (current)

Every candidate is evaluated against a machine-readable policy. The evaluator
returns:

- `HOLD_FOR_INDEPENDENT_REVIEW`: a structurally complete proposal is routed to
  independent evidence/claim/edition review;
- `REJECT`: the proposal shape or proposed publication job is invalid.

Candidate scores, labels, source types and booleans are declarations, not
evidence. There is no signed/hashed independent authority at this level, so no
candidate can receive an auto-publish-like decision, change public files or
deploy the site.

### Level 2 — automatic routine The Daily and The Weekly stories

Only low-risk, time-bounded The Daily and The Weekly items may publish.
The Tribune arguments, The Breaking alerts and hard-hold topics remain
human-reviewed.

Promotion requires all of the following:

- at least 30 shadow candidates across at least eight weeks;
- at least 98% agreement between shadow verdicts and retrospective editorial
  review, with no critical factual or privacy failure;
- a tested render, deploy, public smoke check and automatic rollback path;
- an append-only audit record for every decision and publication;
- a correction and takedown procedure that has been exercised in a drill.

### Level 3 — bounded autonomy for The Tribune

Routine analysis for The Tribune may publish only inside explicitly pre-approved
editorial threads and only after Level 2 has operated reliably. New arguments,
accusations, incident analysis and material predictions remain held.

### Level 4 — monitored continuous publishing

The system may publish, update and correct eligible work continuously, with
automated source rechecks and immediate escalation when facts or source pages
change.

## Non-negotiable holds

The Daily and The Breaking are distinct reader-facing products. The radar still
runs twice daily, but cadence is not either product's definition. The Daily is
the edited briefing of consequential changes since its previous issue. The
Breaking is the defined rapid-response lane for qualifying model releases and other
developments readers should not wait to learn about. It is not currently live
or authorized to publish, and it is not limited to emergencies. Neither
publication is the retired TODAY raw-feed rack. Both are concise but
genuinely explanatory, source-checked briefings built from qualified radar
candidates. Every item must give the reader:

- enough prior context to understand the development;
- what happened and what the evidence actually establishes;
- how the product, policy, incident or change works;
- why it matters and who it could affect;
- what it changes—or does not yet change—for the reader;
- what remains uncertain; and
- what evidence or development to watch next.

Several small related developments may be grouped into one briefing, but each
must clear this explanation floor. A headline roundup, feed dump, lightly
rewritten press release or unexplained list of product features is not
eligible.

The Daily and The Breaking have no publication quota. `CLEAR — NOTHING WORTH PUBLISHING` is a
successful result. Accurate, well-explained copy is still rejected unless the
underlying development clears the consequence, novelty, reader relevance,
durability and editorial-value floors in the machine policy. Publication
frequency follows editorial value; it never manufactures value to satisfy a
calendar.

Sensational or misleading stories may still clear the editorial-value floor
when LAiDIES can demonstrate the distortion and replace it with an important,
evidence-backed takeaway. The candidate must flag
`sensational_or_misleading_claim` and pass
`sensationalFramingNeutralized`. Virality never contributes points.

Model and feature releases are eligible when the editorial value is a concrete
choice change rather than launch coverage for its own sake. Candidates tagged
`model-release` or `feature-release` must pass `releaseDetailsComplete`,
including identity, access, predecessor comparison, price/limits/defaults,
reader tasks, switch/wait guidance and vendor-versus-independent evidence.

The system must hold stories involving health or medical advice, legal or
financial guidance, cybersecurity incidents, privacy or personal data, safety,
children, elections, war, crime, employment allegations, regulatory
enforcement or named-person allegations.

It must also hold when:

- important facts are disputed or unconfirmed;
- an incident is ongoing;
- the central claim relies on one interested party;
- model identity or causation is inferred rather than established;
- a piece for The Tribune introduces a new editorial position;
- the story makes a material prediction whose consequences drive the headline.

The OpenAI/Hugging Face sandbox incident is therefore a `HOLD`, even with a
strong claim map. The security implications, disputed attribution and possible
customer-data exposure require judgment.

## Automatic rejection

A candidate is rejected when a source cannot be resolved, a claim map is
missing, copied material exceeds fair-use needs, required checks are absent,
placeholder text remains, or unsafe markup is detected.

## Required publication path

When Level 2 is authorized, an eligible The Daily or The Weekly story must pass this
complete path:

1. Save the candidate, policy version, sources and evaluator result to the
   audit log.
2. Build the public story from the evaluated candidate.
3. Run the existing Newsstand validator and a dry-run render.
4. Deploy a versioned artifact.
5. Verify the real public URL, story text, source links and page capture.
6. Roll back automatically if any public check fails.
7. Recheck changing claims after publication and route corrections visibly.

The evaluator itself never publishes. Publication is a separate, auditable
action and remains disabled during shadow mode.

## Calibration review

Review shadow results weekly. Record:

- false review-routing or edition-classification decisions;
- unnecessary holds;
- source or fact changes after evaluation;
- rendering, link or deployment failures;
- corrections a human would have made.

Policy changes require a version change and a regression fixture so a useful
lesson cannot silently disappear.
