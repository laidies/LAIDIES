# SUNNYVAiLE High P0 class truth and learning-ledger evidence

**Status:** VERIFIED LOCALLY — BOUNDED MAKER EVIDENCE; INDEPENDENT REVIEW,
EXACT-ARTIFACT, PUBLIC, CONTENT, REWARD AND OWNER GATES REMAIN HOLD.

## Trigger

The product registry dispatched
`REPAIR_CLASSES_404_AND_PROVE_LEARNING_LEDGER`. Earlier evidence established
that a fresh local public artifact contains the class register, but also found
that no class row is live. The building still described available short films,
a weekly/current quiz, a permanent record and banked progress.

## Reproduced evidence

- `content/site/high-classes.json`: 4 subjects, 37 rows.
- Statuses: 16 `not-scheduled`, 12 `proposed`, 7 `researched`, 1
  `researched-verify-before-filming`, 1 `scripted`.
- Ready inventory: 0 videos, 0 `live` rows, 0 verified dates.
- Learning fields: 21/37 rows with a `learn` list, 2/37 with a mechanism,
  2/37 with a demonstration.
- Prior class route repair served the register locally but did not prove
  public deployment or learning quality.

## Scoped repairs

### Availability and product truth

- `sunnyvaile-high.html` now says that written previews are open and all tapes
  are in production; it no longer says that short films are available or that
  201 later classes exist.
- `/learn/class.html` identifies an unfilmed row as a production preview, not
  a finished class.
- Unknown slug, empty register and non-OK register now fail closed; the
  classroom no longer substitutes the first class for an invalid slug.
- Unfilmed TV opening records a production-status event, not `Class play`.

### Local learning record and privacy

- Report Card, quiz sticker and yearbook copy now state browser/device scope,
  storage-loss behavior, no cross-device proof and no mastery/ranking meaning.
- The Report Card no longer parses a Supabase auth token to derive a name from
  email; it uses only the explicit local display-name field or “Resident.”
- Plausible quiz completion no longer includes the learner's score.
- The quiz keeps its actual mechanism: incomplete attempts do not score;
  complete attempts show correct answer, meaning and review route, increment
  attempts, retain latest and best local scores, and allow retry.

### Content-evidence correction

- Two Episode 02 future-bonus review directions still said Episode 03 had not
  dropped. They now route to the existing Episode 03 hallucination/receipts
  lesson in both `quizzes.json` and `site-data.js`.
- The Episode 04 future Episode 05 bonus now has explicit
  `held-future-episode` state and says Episode 5 is not published instead of
  implying a live review route.

### Accessibility

- The class modal has an accessible label and explicit `aria-hidden` state.
- Opening moves focus to Close; Tab remains in the one-control dialog; Escape,
  backdrop and Close shut it; focus returns to the invoking television.
- This implements the W3C modal-dialog keyboard/focus pattern cited in the
  operating specification.

## Deterministic proof

`node scripts/test-sunnyvaile-high-contract.mjs`

**PASS — 10 contract groups**

- bounded register/inventory;
- no planned row admitted as a ready tape;
- selection questions for every preview;
- fail-closed register/slug handling;
- production truth and dialog focus contract;
- building/device/mastery truth;
- quiz storage/cross-device scope;
- answer/explanation/review completeness; and
- canonical/runtime quiz-dataset parity; and
- completion writes only after explanatory grading.

`HIGH_PLAYWRIGHT_ROOT=/tmp/laidies-high-pw.8bUJ9V HIGH_URL=http://127.0.0.1:8876 node scripts/test-sunnyvaile-high-browser.mjs`

**PASS — 6 local Chrome journeys**

1. unknown class fails without substituting another lesson;
2. class-register 503 shows a disabled recovery state;
3. unfilmed preview modal traps/restores focus and closes with Escape;
4. clean 320px Report Card states local scope without page overflow;
5. returning learner reads an existing local best and limitation; and
6. quiz shows every explanation, increments attempts, retains best score and
   scopes persistence.

Supporting checks:

- `node scripts/check-inline-js.js`: **PASS**, 353/132.
- `node scripts/check-local-links.js`: **PASS**, 1,943/110.
- `node scripts/check-product-stewards.mjs`: **PASS**, 65 products and 3/3
  bounded lanes.
- scoped `git diff --check`: **PASS**.

The browser dependency was installed only in a temporary `/tmp` package root;
the repository dependency set was not changed.

## Exact local public artifact

`node scripts/build-public-site.mjs /tmp/laidies-high-artifact.PxigY2`

- **PASS:** 1,071 files / 958.63 MiB.
- Existing builder warning: artifact exceeds its internal 750 MiB warning
  threshold. The build did not fail; this cycle does not approve deployment
  size or duration.
- The same six browser journeys passed against the artifact at a temporary
  local HTTP origin.
- Source and artifact SHA-256 values matched exactly:

| File | SHA-256 |
|---|---|
| `content/site/high-classes.json` | `a2070255737daeee50b55700d5f17ea76e4301ae3d1447f34ff361feefdf4309` |
| `content/site/quizzes.json` | `ff01b28a698ac949853deea1770429016ed15de1210039b3ad20125b1fc51741` |
| `content/site/site-data.js` | `b629c8c22abf68f1beb6c508e35d5cf909f26e46141d47d995398e255c4e14e0` |
| `sunnyvaile-high.html` | `eec2aa195abaf1af4c52596f98e1c79ffe26b46726abf0f69502c2bed2b0fecf` |
| `learn/class.html` | `00e36bbb965032725dd48845018fcc7de4320eae0039dc9c602b8605c9bbce5a` |
| `learn/quiz.html` | `bac1536f9c0b9141dc17630f8f8b6272e335be4cd72222c9cdd38874d79b5c79` |
| `script.js` | `4ae971a18ef2ef6c4eb08c05e34cbf24add901b9d69400394ec18e1d7bea1b59` |

This is exact local artifact evidence, not a deployment or public-origin
verification.

## Independent review request

The judge should attack:

1. any remaining filmed/current/permanent/mastery/account/reward overclaim;
2. invalid, empty and 503 class-register recovery;
3. class modal focus/keyboard behavior;
4. clean and seeded local-storage scorecard/yearbook truth;
5. quiz incomplete, complete, retry, explanation and review-link behavior;
6. duplicated `quizzes.json`/`site-data.js` consistency; and
7. whether the repair stays within the current zero-live-class boundary.

This maker evidence does not judge itself.

## Remaining gates

- independent review of the exact scoped candidate;
- exact public artifact binding and deployed-origin verification;
- one representative filmed/captioned class with current sources,
  instructional review and unfamiliar-learner transfer evidence;
- representative quiz assessment/accuracy review;
- authoritative reward/account duplicate/failure/two-device contract or
  continued local-only language;
- Safari/VoiceOver, 200% zoom, desktop and network/storage-failure evidence;
- Book Fair stock/spend/refund/fulfilment; and
- approved privacy-safe learning analytics.

## External capability review

No service, plugin or vendor is required for this repair. A future reversible
tooling packet should evaluate adding `playwright-core` and `axe-core` as
version-pinned development dependencies so High's keyboard/reflow checks do
not depend on a temporary package root. Both can run locally against
synthetic fixtures without participant or production data. Alternatives are
the current temporary Playwright runner plus manual VoiceOver/Safari review.
Installation remains a Platform-maintainer decision; it is not authorized by
this recommendation.

## Learning scan

- **Observed failure:** a valid static register and HTTP 200 can coexist with
  zero playable classes and copy that reads as released inventory.
- **Prevention rule:** admission tests must compare public availability copy
  with row-level release evidence (`status + video + filmed_on + verified_on`);
  route health alone cannot admit a learning product.
- **Observed failure:** “permanent record” decoration was driven entirely by
  local storage and even inspected an auth-token email for display.
- **Prevention rule:** every visible progress surface must name its
  authoritative store and scope beside the result; decorative personalization
  must not parse credentials or identity tokens.
- **Behind the Build angle:** the difference between a page that loads, a
  lesson that exists, and evidence that somebody learned.
- The canonical painpoints ledger was searched. It was not edited because the
  parent explicitly limited this lane's records and owns reconciliation.
