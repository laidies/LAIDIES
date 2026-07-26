# Build packet — Cycle 5 High learning admission

## Bounded repair

1. Keep class production and learning approval as separate records.
2. Fail closed when the learning ledger is missing, malformed, unlisted, held,
   future-dated or expired.
3. Prevent a register row with `live` and a video from self-promoting.
4. Repair one representative Foundations lesson and aligned assessment
   candidate under the LAiDIES learning standard.
5. Package the ledger in the public artifact, but admit no class or quiz.

## Implemented files

- `content/site/high-learning-ledger.json`: held class and quiz review packet.
- `content/site/high-classes.json`: accurate representative objectives and
  honest candidate status.
- `operations/classes/basics-what-these-tools-are.CONTENT.md`: repaired lesson.
- `learn/class.html`: two-record admission and visible review status.
- `scripts/build-public-site.mjs`: explicit runtime-ledger packaging.
- High contract/browser tests: packet shape, service failure and hostile
  self-promotion.
- Product-local operating spec, state, backlog, deep dive and evidence.

## Acceptance for an independent judge

The judge must independently:

- verify 37 register rows, zero live videos, zero admitted learning records;
- mutate the representative row to `live` with a video and prove it still
  renders a non-playable held test card;
- remove or corrupt the learning ledger and prove the class route disables;
- compare every current capability claim with the cited official source and
  check its date/recheck window;
- review the lesson for mechanism, distinctions, analogy limit, uncertainty,
  misleading-claim resistance, transfer and explain-back;
- review all five selected-response items for alignment, plausible distractors,
  explanation, readability and absence of trick/shame;
- separately evaluate an open explain-back with a human rubric; do not treat
  selected-response recognition as proof that the learner can explain;
- require real-path captures, approved narration/cue map, image/style
  approval, animation purpose, captions and unfamiliar-learner evidence;
- reproduce source/exact-artifact hashes and the 13 contract / 17 browser
  checks; and
- confirm no runtime quiz, reward, mastery, account or promotion claim was
  introduced.

Only after those gates may an independent reviewer change the class record to
`admitted` with current `reviewedOn` and `recheckOn`; production still requires
the real video, filmed and verified fields. No maker self-score admits it.

## Explicit holds

Independent accuracy, instructional, assessment, media and owner review;
unfamiliar-learner transfer; real app-path proof; Safari/VoiceOver/native zoom;
Book Fair/reward authority; privacy-approved analytics; exact deployment and
public-origin proof; artifact-size release decision.
