# LAiDIES content-quality admission gate

**Status:** ACTIVE — fail-closed release gate
**Owner:** Learning System & Concepts Director with the destination owner
**Applies to:** every public teaching, editorial, reference, daily, social,
audio, video, interactive and community-derived content artifact

## What this gate guarantees—and what it does not

This gate does not declare content good because a checklist exists. It permits
an exact artifact to advance only when the applicable checks have independent,
artifact-bound evidence.

The required outcome is content that is:

- technically accurate and appropriately qualified;
- current for the product, plan, region and date it describes;
- recognizably LAiDIES: adult, smart, useful, specific and funny only where
  earned;
- substantial enough to change understanding or action;
- free of generic padding, invented synthesis and other AI-slop patterns;
- faithful to the canonical mechanism and any analogy's stated limit;
- adapted to the exact job and experience of every feature publishing it; and
- connected to the maintained concept, related learning and correction path.

No automated or human review can promise that an error will never escape. The
system instead makes unsupported confidence difficult, requires traceable
evidence and preserves a fast correction path when reality changes.

## Evidence rule

A gate verdict is valid only when it names:

1. the exact artifact manifest and SHA-256;
2. the reviewer and review date;
3. the sources, tests, rendered captures or learner evidence used;
4. the pass/hold ruling and any bounded limitations;
5. the next freshness trigger or correction owner; and
6. a local evidence receipt that exists in the repository.

Every gate uses the structured receipt contract at
`operations/product-stewards/learning-content-ecosystem/content-quality-review.schema.json`.
The receipt's artifact SHA must reproduce the bound manifest SHA. An arbitrary
existing document, screenshot or source URL is supporting material—not a gate
receipt.

The maker may prepare the packet but may not be the sole accuracy,
instructional/editorial or rendered-experience reviewer. A score, model output
or validator cannot substitute for judgment; judgment cannot substitute for
sources and tests.

## Required quality rulings

### Accuracy and technical integrity

- Map material claims to current primary or authoritative sources.
- Record model/product/version, plan, region and date boundaries where they
  matter.
- Separate fact, observation, inference, recommendation, disagreement,
  forecast and unknown.
- Test representative real behaviour when a claim concerns what a product or
  workflow does; documentation alone is insufficient for a broad behavioural
  promise.
- State evidence that would change the conclusion.

### Current best practice and freshness

- Recheck volatile claims before drafting, before recording or rendering, and
  immediately before release.
- Bind a future recheck date or event trigger and every known correction
  consumer.
- Hold guidance whose operative source changed, expired or cannot be verified.
- Keep durable mechanism teaching separate from replaceable product-navigation
  inserts so a moved button does not silently stale an entire lesson.

### LAiDIES voice

- Read the artifact in its rendered context, not as isolated copy.
- Use an experienced-best-friend voice: intelligent, warm, candid and specific.
- Reject condescension, empowerment slogans without substance, internal
  operational language, corporate sludge and jokes that obscure the lesson.
- Preserve approved names, spelling, canon and public language.
- Require Ali only when an artifact establishes or materially changes public
  voice, mission, analogy or identity—not for routine application of an
  accepted pattern.

### Anti-slop and original usefulness

Reject the artifact when it:

- could be published unchanged by any generic AI education account;
- restates the prompt, source or conclusion without a useful synthesis;
- pads a thin point with headings, lists, summary loops or motivational filler;
- gives a tip without mechanism, setup conditions, failure modes or the human
  role;
- uses citations as decoration or invents sources, certainty or examples;
- repeats adjacent LAiDIES content without a distinct learner job;
- offers abstractions where a worked example, contrast or demonstration is
  needed; or
- sounds polished but leaves the reader unable to explain, diagnose, decide or
  do anything differently.

Passing evidence includes a concrete reader problem, mechanism, worked
example or controlled contrast, important boundary, useful action, failure
diagnosis and the right next destination in proportion to the format.

### Analogy integrity and canon consistency

- Map every admitted analogy to the real mechanism and state where it stops.
- Prefer no analogy over a cute but inaccurate one.
- Compare the artifact with the canonical concept owner and every affected
  explanation; resolve, correct or explicitly version contradictions.
- Never let a derivative establish a competing source of truth.

## Feature-adaptation gate

Content must be adapted to every feature that publishes it. A canonical
concept package may feed several surfaces; one generic derivative may not.

For each destination, the evidence packet records:

| Destination | Its job | Required transformation |
|---|---|---|
| Episode | Create stakes and a memorable first encounter | Story, character choice, consequence and truthful visual/narration alignment |
| Study Pack / quiz | Retrieve, rehearse and discriminate | Compact ruled learning, fair practice, explanatory feedback and recovery link |
| LIBRAiRY | Durable lookup and mental model | Maintained definition/mechanism, distinctions, examples, limits and sources |
| Class / lesson / lab | Build transferable skill | Story-led mechanism, demonstration, comparison, practice, diagnosis and transfer |
| NewsStand | Explain what changed now | Dated evidence, consequence, uncertainty, current application and correction path |
| AI daily tip | Deliver one bounded usable move | Action, why it works, setup/boundary, human check and deeper destination |
| Promptoscope | Make one AI-work pattern funny and memorable | A complete comic horoscope observation; never disguised technical guidance |
| Career/work-life mirror | Help with a real situation and illuminate an AI parallel | Practical wording/choices, risks and a faithful—not forced—AI connection |
| KSVL song | Create a mnemonic and emotional retrieval cue | Original hook, accurate lyric, analogy limit and source/artist/album metadata |
| Tool / game / activity | Solve or rehearse a behaviour | Real interaction, visible assumptions, consequence, feedback and honest limits |
| Community | Support application, explanation and mutual help | Safe prompt, moderation route, useful continuation and no fabricated participation |
| Social | Earn attention without corrupting the claim | Platform-native hook and format, complete bounded value, source identity and honest CTA |

Every selected destination needs its own reverse brief, exact content payload,
rendered or playable proof, interaction/link test and destination-owner ruling.
The proof must show that the format uses its medium well and does not merely
shrink, excerpt or re-skin another surface's content.

The `formatFit` receipt must include `surfaceAdaptation` and match the work
order's exact surface. Its payload and rendered/playable evidence paths must
exist. If the same concept is used in another feature, that feature receives a
separate work order and receipt.

## Release admission

No order may enter `CONTENT_VERIFIED`, `EXPERIENCE_VERIFIED`, `APPROVED`,
`DEPLOYED` or `VERIFIED_PUBLICLY` unless:

- every applicable quality gate is `PASS` or explicitly justified
  `NOT_APPLICABLE`;
- every `PASS` has an existing evidence receipt;
- the exact artifact manifest is bound and checksum-valid;
- independent accuracy/editorial/instructional and destination-experience
  stages required by the artifact have passed;
- every publishing feature has passed the feature-adaptation gate;
- links, search/indexing, canon consistency and correction consumers pass;
- the configured release and rollback path exists; and
- public status is based on exact released bytes and public journey evidence.

An empty evidence field means **not reviewed**. `BUILT_LOCALLY` means only that
bytes exist. A validator PASS means the records are internally coherent; it is
not a content verdict.
