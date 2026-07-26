# ECO-01 re-review P0 and local rendered-browser repair

**Date:** 2026-07-25
**Status:** REPAIRED LOCALLY — HOLD / PREVIEW
**Input:** `independent-review-eco-01-verification-rulebook-repair-2026-07-25.md`
— two remaining P0s
**Maker boundary:** this evidence does not approve the candidate

## P0 1 — unassessed prose is no longer scored as correct

The renderer no longer emits `Reasoning check passed`, and no interaction
produces `data-result="correct"`.

Machine-checkable selections use bounded states:

- `keyed-match` — the selected controls match the model key; explicitly not
  independent understanding;
- `review` — a keyed choice or required field needs attention;
- `self-check-ready` — required prose exists, but is not semantically scored;
  and
- `recorded` — the learner recorded a four-dimension self-check; explicitly
  not an independent correctness score.

Chapters 4–6 now require structured verdict/evidence-action fields where
deterministic checks are possible. After submission they reveal a comparison
rubric with `claim`, `evidence`, `limitation` and `action`. The learner must
mark every dimension `Met`, `Revise` or `Unsure` before the self-check can be
recorded.

The closing transfer now separately captures:

- split claims;
- price evidence verdict;
- speed evidence verdict;
- evidence actions; and
- scope/freshness/method limitations.

It uses the same four-dimension self-check and never awards correctness.

The deterministic and rendered regressions submit length-valid
`purple toaster` nonsense with keyed choices. The result is
`self-check-ready`, the comparison rubric opens, the live region says the
writing was not semantically scored, and neither pass nor correct appears.

## P0 2 — direct C2PA evidence binding

`SRC-C2PA-2-4.url` and every reader-visible evidence link now point directly
to the full C2PA 2.4 Content Credentials specification:

`https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html`

The separate currentness monitor retains:

`https://spec.c2pa.org/specifications/specifications/2.4/index.html`

The contract asserts both objects separately. The 2.2 → 2.4 history and
future-version failure monitor remain intact.

## Local rendered Playwright matrix

The in-app browser runtime exposed no browser. A temporary Playwright 1.58.2
package was therefore installed under `/tmp` only and used with the local
installed Google Chrome executable against a local HTTP server. No repository
dependency or production service was installed or changed.

`scripts/test-eco01-browser.mjs` passed 20 rendered checks:

- 320, 390, 430 and 1440 CSS-pixel widths: one `h1`, HOLD visible and no
  horizontal page overflow;
- CSS `zoom: 2` equivalent: HOLD visible and no horizontal page overflow;
- desktop sticky-anchor destination remains below the sticky top bar;
- reduced-motion media state produces `scroll-behavior: auto`;
- keyboard submission of the Chapter 4 source comparison;
- length-valid nonsense remains `self-check-ready` and never correct/passed;
- four comparison dimensions appear and can be recorded truthfully;
- polite/atomic live-region update occurs in place without feedback focus;
- clipboard and `execCommand` failure selects the prompt and announces manual
  copy recovery; and
- keyboard focus receives a visible 3px outline.

Evidence directory:

`operations/product-stewards/learning-content-ecosystem/evidence-eco01-browser/`

It contains `matrix.json` plus viewport, zoom-equivalent and interaction
screenshots.

Visual inspection of the 320, 1440 and zoom-equivalent captures confirmed that
the HOLD notice, opening hierarchy and first scenario remained readable
without clipped content. This is a bounded local visual observation, not the
independent LAiDIES brand verdict.

## Exact candidate

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claim ledger | `f391a6357806e4992e091e2e07ba52d2b5ba818f728ad1cffba1b977c0e4623e` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered HOLD candidate | `e679a0f11c571a8774978fde57e989ce0404edc18ebc5a36137f07a0093044a3` |
| Renderer | `265ef6040b68266323e49e222b87d5577a5a0201520ee9e9bee587eca0df6e58` |
| Contract test | `36a46aae9ac4411d82401b9d0da8a764a4ae02ea02f57cacf70e5bbb80eecdd6` |
| Browser matrix test | `21d22dc8a56f131d9b4560edc72c5347320249c43fbd2f979888197633ea3614` |
| Source-version monitor | `c2aa72144b9b34234e7f1f1bcc10d8f3349e6fc511d2b35afa8ccdf8458b28bc` |
| Browser matrix JSON | `c66227c8a38abf5461b26134f107370f563ed4fe68f9f8bd1b76993468b250b9` |

## Verification

Passed:

```text
node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD

node scripts/check-eco01-source-versions.mjs
  ECO-01 SOURCE VERSION PASS: C2PA 2.4

ECO01_PLAYWRIGHT_ROOT=<temporary package root> \
  node scripts/test-eco01-browser.mjs
  ECO-01 BROWSER MATRIX PASS: 20 checks

node scripts/check-inline-js.js
  PASS — 353 scripts / 132 live pages

node scripts/check-local-links.js
  PASS — 1,943 references / 110 pages

node scripts/check-town.js
  PASS

node scripts/check-product-stewards.mjs
  PASS — 65 products; active 3/3
```

## Exact limitations

- Chrome ran headlessly. This is not current headed-Chrome visual approval.
- The 200% check used CSS `zoom: 2`; it is a reflow/overflow equivalent, not
  native Chrome page zoom or operating-system magnification.
- Playwright observed DOM focus and live-region attributes/text. It did not
  prove what a screen reader announces.
- Safari and VoiceOver were not run. No Safari, VoiceOver, assistive-technology
  or WCAG-conformance claim is made.
- The captured screenshots sample the opening/interaction viewport, not every
  chapter’s complete visual density or reading flow.
- Free text remains intentionally unscored. Only independent assessment and
  the newcomer study can establish reasoning quality or transfer.

The candidate, Library cover and Miss Jeeves remain HOLD/PREVIEW. Independent
expert re-review, complete Safari/VoiceOver evidence and the separate
eight-newcomer study remain mandatory. No deploy, publication or git action
occurred.
