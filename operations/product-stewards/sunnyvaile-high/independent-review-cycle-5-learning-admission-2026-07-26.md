# Independent review — SUNNYVAiLE High Cycle 5 learning admission

**Date:** 2026-07-26  
**Role:** independent accuracy, learning, product, accessibility and technical judge  
**Verdict:** **FAIL — P0 FAIL-CLOSED ADMISSION DEFECT**  
**Score:** **81/100**  
**Scope:** exact Cycle 5 candidate; no implementation, product state, registry,
queue, Git, deployment, credential or external-service mutation.

## Decision

The candidate makes a valuable, brand-appropriate correction to the
representative Foundations lesson and keeps the current class and quiz
records held. The current source and fresh artifact contain 37 class rows,
zero live rows, zero videos and zero admitted learning records. Source and
artifact both pass the maker's 13 contract checks and 16 browser journeys.

The candidate nevertheless fails the independent gate. Its runtime calls the
learning ledger fail-closed, but admission records and dates are not schema
validated. A malformed record can promote a hostile `live` row and video.
Accuracy/trust and technical integrity therefore fall below the required
17/20 floors.

This verdict does not say a class is currently public or admitted. It says the
mechanism intended to prevent future self-promotion can be bypassed by data
that its own ledger validator accepts.

## Non-compensable scores

| Gate | Score | Judgment |
|---|---:|---|
| Product quality and user value | 17/20 | The building clearly distinguishes previews, quiz practice and local records, with useful recovery routes. |
| Accuracy, safety and trust | 15/20 | Current claims are substantially corrected, but malformed admission metadata can create false approval and one memory claim lacks explicit source binding. |
| Positive LAiDIES brand contribution | 18/20 | The schoolhouse/AV-cart language supports the lesson and avoids shame, fake mastery and fake rewards. |
| UX and accessibility | 17/20 | Chrome evidence covers mobile reflow, keyboard focus, reduced motion, print and a 200% proxy; native zoom, Safari and VoiceOver remain held. |
| Technical and data integrity | 14/20 | Exact packaging and parity pass, but record/date validation is fail-open and the artifact remains above the advisory size threshold. |

**Overall:** 81/100. Product and brand meet the floor. Accuracy/trust and
technical/data integrity do not.

## P0 finding

### SH-C5-J1 — Malformed admission dates can unlock a hostile live class

**Observed code:** `validateLearningLedger()` validates only top-level ledger
fields and that `records` is an array. `isCurrentAdmission()` then accepts any
record whose status is `admitted` when raw string comparisons make
`reviewedOn <= today <= recheckOn`.

**Independent hostile fixture:**

- changed the representative register row only in the intercepted response to
  `status: "live"` with a synthetic video and filmed/verified dates;
- supplied a top-level-valid learning ledger with one class record:
  `status: "admitted"`, `reviewedOn: "0"`, `recheckOn: "9"`;
- opened the real class route in local Chrome.

**Observed result:**

```json
{
  "learningStatus": "admitted",
  "reviewCopy": "Learning review: admitted through 9.",
  "tape": "Ready",
  "videoCount": 1
}
```

This contradicts the operating specification's statement that malformed
learning records fail closed.

**Required repair before rejudge:**

1. Validate every class admission record's kind, record ID, content ID,
   status and exact required fields.
2. Require strict `YYYY-MM-DD` dates, real calendar dates and
   `reviewedOn <= recheckOn`.
3. Reject future-reviewed and expired records using parsed UTC dates rather
   than permissive string boundaries.
4. Reject duplicate class records, duplicate record IDs and ambiguous
   class-to-record mappings rather than choosing the first match.
5. Bind the class row's declared `learning_record` to the unique ledger
   `recordId`; do not authorize only by matching `contentId`.
6. Add rendered hostile fixtures for malformed top level, malformed record,
   invalid date, impossible date, future, expired, duplicate, wrong kind,
   wrong record ID/content ID and mixed held/admitted ordering.
7. Rebuild a fresh exact artifact and rerun every fixture against source and
   artifact.

## P1 findings

### SH-C5-J2 — The memory/new-chat claim lacks explicit source binding

The lesson says a new chat may receive saved instructions or memory, and quiz
item `layers-04` assesses that distinction. The claim is reasonable and
current official OpenAI material distinguishes memory from connected-app
settings and describes memory influencing later search behavior. However, the
candidate's source records bind their `supports` fields to search, connected
services, Gemini tools and image understanding; none explicitly owns the
new-chat memory claim.

Add a current official memory/control source to the class and quiz claim map,
state product/account/settings variability, and recheck it before filming.
The present content remains correctly held.

Official pages independently checked:

- OpenAI, `ChatGPT Search`, accessed 2026-07-26:
  https://help.openai.com/en/articles/9237897-chatgpt-search
- OpenAI, `Apps in ChatGPT`, accessed 2026-07-26:
  https://help.openai.com/en/articles/11487775-connectors-in
- Anthropic, `Enable and use web search`, accessed 2026-07-26:
  https://support.claude.com/en/articles/10684626-enable-and-use-web-search
- Google, `Using Tools with Gemini API`, accessed 2026-07-26:
  https://ai.google.dev/gemini-api/docs/tools
- Google, `Image understanding`, accessed 2026-07-26:
  https://ai.google.dev/gemini-api/docs/image-understanding

The search, citation, connected-service, tool and multimodal claims are
supported by those official sources. The lesson also correctly warns that
citations require claim-level inspection.

### SH-C5-J3 — The quiz recognizes an explain-back; it does not assess one

The six held questions align with the app/model/tools/context objective, use
non-shaming explanations and target real misconceptions. Distractors are
readable but often obviously absolute. Item `layers-06` asks how the learner
would explain the idea, then measures recognition of a supplied explanation.
That is not evidence that an unfamiliar learner can independently explain the
concept.

Keep the quiz non-admitted. Add an open explain-back or structured layer-sort,
then conduct the required unfamiliar-learner think-aloud/transfer check.

### SH-C5-J4 — Clean building route remains a public-origin hold

The fresh static artifact serves `/sunnyvaile-high.html`, the registered class
route, unknown-slug recovery and the learning ledger. Its `_redirects` file
does not explicitly bind the charter's clean `/sunnyvaile-high` route.
Cloudflare clean-URL behavior may supply that mapping, but a local static
server cannot prove it. Preserve the public-origin route and custom-404 gate;
do not promote the clean route from local evidence.

## Independent mechanical evidence

### Source

- `node scripts/test-sunnyvaile-high-contract.mjs` — **PASS, 13 checks**.
- Source Chrome suite — **PASS, 16 journeys**.
- Inline JavaScript — **PASS, 352 scripts / 132 pages**.
- Local links — **PASS, 1,975 references / 110 pages**.
- Town consistency — **PASS**.
- Product steward system — **PASS, 65 products / 3 of 3 active lanes**.

### Fresh exact artifact

- Path: `/tmp/laidies-high-cycle5-judge.tYBGL4`
- Builder: **PASS, 1,087 public files / 961.53 MiB**.
- Filesystem count: 1,088 including the build report.
- Public metadata — **PASS**.
- Artifact Chrome suite — **PASS, 16 journeys**.
- Unknown class slug renders the honest disabled recovery state rather than an
  unrelated class.
- Unknown static route returns 404 under the independent local server; deployed
  custom-404 behavior remains a public-origin check.

Source/artifact SHA-256 parity:

| Runtime file | SHA-256 |
|---|---|
| `learn/class.html` | `b35fbcd9405ec9b2f615005f41dcfe286473041f2ac77d4565b216d29f2d8872` |
| `content/site/high-classes.json` | `d3f83e65895f809d02f6c17a08a6e2784e4ad6c3f5910d2fbdb4b465461f7962` |
| `content/site/high-learning-ledger.json` | `7aa0230f040f1e9b5f06b72ea167ccebc15720559e45c1459b81bf643cd11fef` |

The first independent artifact-browser invocation used the artifact as its
working directory and therefore could not locate the repository-owned test
script. The corrected invocation used the absolute test-script path and the
artifact as its served/read root; all 16 journeys then passed. This was a
review-command error, not a product failure.

## Accessibility, brand and release holds

The modal moves focus inside, traps the single focusable control, closes on
Escape and restores the TV trigger. Mobile widths, long strings, reduced
motion and the existing 200% proxy pass. The visual metaphor contributes
positively and the copy does not shame low scores or imply permanent mastery.

Still held:

- P0 admission-schema repair and independent rejudge;
- native browser zoom, Safari and VoiceOver;
- unfamiliar-learner comprehension, explain-back and transfer;
- approved narration, real-path capture, cue map, imagery, animation,
  captions, audio description, media QC and owner visual approval;
- representative quiz runtime/review-route admission;
- Book Fair, reward/account, duplicate/refund/two-device authority;
- privacy-approved analytics and real learning measurement;
- artifact-size release-owner decision;
- deployment identity, clean route/custom 404 and public-origin verification.

## Learning scan and next action

**Qualifying learning:** a top-level-valid ledger is not a valid admission
record. A fail-closed gate must validate the full authorization object and its
temporal semantics before reading an approving status.

The task permitted writing only this independent report, so the canonical
painpoints ledger was not edited. The product champion should record the
prevention rule when implementing the P0.

**Next action:** repair the record/date/uniqueness/binding validator, add the
hostile matrix above, rebuild a fresh exact artifact, and request a narrow
independent rejudge. Do not admit the class or quiz while making that repair.
