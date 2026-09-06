# LAiDIES content-quality admission gate

**Status:** ACTIVE — fail-closed release gate
**Owner:** Learning System & Concepts Director with the destination owner

Implementation/adoption status is recorded in `RECOVERY.md`. ACTIVE identifies
the governing requirement, not proof that every referenced service or gate runs.
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

## Prevention-first production contract

Review is a secondary safety net. Before any public meaning-bearing prose is
drafted, its owner must pass a checksum-bound producer contract against:

- the reader's real question, prior knowledge and useful payoff;
- maintained concept truth, current sources and freshness triggers;
- a relevant positive LAiDIES exemplar and the patterns it teaches without
  copying its surface scaffold;
- every registered known-bad defect;
- one connected causal sequence, a daily-life worked case and a different
  transfer case;
- the useful action or decision the reader should gain;
- a destination-specific Hannah Fry communication design that binds applicable
  human-question, curiosity, concrete-mechanism, familiar-to-technical,
  limitation/consequence and better-next-question moves while prohibiting
  voice or persona imitation; for an episode, class or substantial explanation,
  this also binds the shared starting point and live question, link-by-link
  causal mechanism, earned click, small landing and safety boundary before
  drafting; and
- the exact teaching job and limit of every analogy, joke or Rewind Era detail.

Executable contract:

- `content-producer-contract.schema.json`;
- `content-quality-exemplars.json`;
- `scripts/check-content-producer-contract.mjs`; and
- `scripts/test-content-producer-contract.mjs`.

After drafting, the producer reads the exact prose in full and must pass a
separate `PRODUCER_SELF_REVIEW`. Only then may an independent reviewer receive
the candidate and record `INDEPENDENT_SEMANTIC_ADMISSION`. Both are checked by
`scripts/check-prose-quality-admission.mjs`; its calibration suite exercises declared rejection and evidence-binding
failures. It does not prove that a reviewer will detect disconnected, repetitive
or valueless prose; that requires inspection of the actual artifact.

If a reviewer finds a known or mechanically preventable defect, the result is
not another ordinary correction cycle. Production stops, the shared defect or
exemplar registry and producer preflight are updated, and the producer is
repaired before another candidate is commissioned. Repeated known defects and
objective defects first found by reviewers both have a target of zero; total
issues and review cycles must fall against the preceding comparable candidate.

The registry is checksum-bound and all registered negative exemplars are
mandatory. Producer and reviewer records created against an earlier registry
revision become stale when a verified learning is added. Review identity is
also end to end: manifest review-text/render bindings, producer review,
independent review and release work order must resolve to the same exact
artifact. Material factual claims require candidate-excerpt-to-source-excerpt
mapping; free-floating source files are not accuracy evidence. Reader
explain-back and transfer observations require checksum-bound evidence rather
than an unlocated assertion.

Material explanatory NEWS requires explain-back and unseen-transfer evidence,
not only dated-change and consequence prose. Every `SUCCESSOR` review binds its
predecessor identity and prior comparable metrics; omitting the comparison is a
failure, not permission to call the successor a first candidate.

A verdict cannot silently end the learning loop. PASS records no new reusable
defect. HOLD/REJECT must disposition an evidence gap, candidate-only repair or
reusable defect. A reusable defect needs an exact pending learning record bound
to the candidate and review; Learning admits it to the shared registry only
after confirming it should bind future producers. Feedback never rewrites,
retires or unpublishes content automatically.

Material learning content also requires an exact-artifact
`communicationBenchmark` outcome. The reviewer judges whether the selected
communication moves actually improved clarity and engagement without weakening
the mechanism. Full explanations also require an `explanationArc` outcome bound
to the exact artifact. Name-dropping, curiosity without explanatory payoff,
familiar examples that never reconnect to the technical idea, Hannah Fry
pastiche, a hook that crowds out the mechanism, a click revealed before its
mechanism, entertainment before understanding and an inflated ending are
explicit failure families.

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

## Images and animation — prevention before pixels

Images and animation are meaning-bearing content, not decoration or proof that
prose exists. Before generation, require the shared visual-media producer
contract to bind destination style/location, exact accompanying text or
narration, scene/teaching job, canon identity, historical likeness where
applicable, era/age/wardrobe/props, physical relationships, semantic object map,
text plan, motion class and every current visual negative exemplar.

The maker then inspects the exact rendered pixels at intended size. A
role-distinct visual reviewer independently inspects the same exact bytes and
records what is visibly present before reading maker assurances. Animation
also binds decoded frames and the final timed occurrence; source-clip integrity
cannot approve later assembly. Physical plausibility, anatomy, identity,
period accuracy and meaning fit require human visual judgment. Hashes, prompts,
filenames, cue labels, contact sheets and boolean audit fields prove none of
them.

Executable records and calibration live in:

- `visual-media-producer-contract.schema.json`;
- `visual-media-review.schema.json`;
- `visual-media-quality-exemplars.json`;
- `scripts/check-visual-media-producer-contract.mjs`;
- `scripts/check-visual-media-admission.mjs`; and
- `BUILD-PACKET-shared-visual-media-quality-ratchet-2026-08-07.md`.

## Substantial Library books — cold-reader outcome veto

A substantial Library book has two different gates. They may never be merged:

1. **Integrity** verifies source identity, deterministic rendering, hashes,
   contents targets, source coverage and evidence bindings. Its strongest
   possible verdict is `INTEGRITY_MATCH`; it carries no teaching-quality or
   admission authority.
2. **Cold-reader outcome** observes whether an unfamiliar reader can orient,
   find, explain, distinguish and transfer the teaching. Its strongest verdict
   is `ADMISSION_CANDIDATE`; final product admission and publication remain
   separate.

The exact requirements are executable in:

- `content/library-books/library-book.source.schema.json`;
- `scripts/render-library-book.mjs`;
- `scripts/check-library-book-content-admission.mjs`;
- `scripts/test-library-book-content-admission.mjs`; and
- `operations/product-stewards/learning-content-ecosystem/library-book-cold-reader-review.schema.json`.

The cold review happens before maker receipts are opened. The reviewer begins
with the continuous rendered book and records a reverse brief plus observed
reader responses. At minimum the receipt includes orientation, ordinary-
language lookup with route recovery, explain-back and an unseen transfer case.
The book's worked example cannot double as its transfer test.

Opening orientation, promise fidelity, connected progression, lookup and
recovery, unseen transfer, analogy integrity, audience-relevant examples,
misconception resistance, material accuracy, continuous rendered readability
and LAiDIES voice are non-compensable vetoes. One `HOLD` means the book is not
an admission candidate. Counts of headings, concepts, links, analogies,
examples, references or completed fields contribute zero evidence to those
vetoes.

A partial accuracy or integrity reviewer may only return its exact scoped
verdict. It may not say `ADMIT`. A textual simulation of an unfamiliar reader
is not observed learner evidence and may not produce `ADMISSION_CANDIDATE`.

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
