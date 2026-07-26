# ECO-01 prompt-panel contrast repair

**Date:** 2026-07-25
**Status:** REPAIRED LOCALLY — HOLD / PREVIEW
**Input:** `independent-review-eco-01-verification-rulebook-repair-2-2026-07-25.md`
**Maker boundary:** this evidence does not approve the candidate

## Exact repair

The rendered prompt panel was dark, but shared `styles.css` typography rules
used `!important` and overrode its intended foreground colours. The repair is
limited to direct children and claim-card descendants inside `.vr-prompt`:

- direct `h2`, `p` and `label` elements are white;
- the direct critical warning is pale yellow;
- claim-card paragraphs remain dark ink on their light card; and
- claim-card links remain blue on their light card.

The scoped direct-child rules use `!important` only where required to beat the
shared important typography declarations. No global typography rule changed,
and no broad `.vr-prompt p` important rule can whiten nested claim-card copy.

## Rendered contrast evidence

A local headless Google Chrome run inspected the actual combined stylesheets
after triggering clipboard failure so that every prompt-panel text role was
present. WCAG contrast calculations used the computed foreground and nearest
opaque computed background.

| Text role | Foreground | Background | Ratio | Threshold |
| --- | --- | --- | ---: | ---: |
| Prompt heading | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | 16.93:1 | 3:1 |
| Introductory copy | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | 16.93:1 | 4.5:1 |
| Prompt label | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | 16.93:1 | 4.5:1 |
| Prompt textarea | `rgb(33, 19, 39)` | `rgb(255, 255, 255)` | 17.69:1 | 4.5:1 |
| Copy button | `rgb(255, 255, 255)` | `rgb(123, 36, 75)` | 9.56:1 | 4.5:1 |
| Copy-failure status | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | 16.93:1 | 4.5:1 |
| Critical warning | `rgb(255, 224, 155)` | `rgb(39, 22, 46)` | 13.21:1 | 4.5:1 |
| Claim-card copy | `rgb(37, 22, 45)` | `rgb(242, 247, 255)` | 15.86:1 | 4.5:1 |
| Claim-card link | `rgb(22, 79, 145)` | `rgb(242, 247, 255)` | 7.62:1 | 4.5:1 |

The browser matrix now contains 30 passing checks: the prior 20 interaction,
responsive, zoom-equivalent, motion, focus and overflow checks; nine computed
contrast checks; and a regression proving claim-card text and links did not
become white.

Evidence directory:

`operations/product-stewards/learning-content-ecosystem/evidence-eco01-browser/`

The updated mobile interaction screenshot visibly shows the repaired heading,
intro, copy status and warning while retaining dark claim-card content.

## Exact candidate

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claim ledger | `f391a6357806e4992e091e2e07ba52d2b5ba818f728ad1cffba1b977c0e4623e` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered HOLD candidate | `b91c70caa7443dda06079ad7908e254ac0775e8c5912d32a4d55c71cd95fa439` |
| Renderer | `3889767b9e56df4ce3b86af711e158433247a4481a4bd750bc8756aba2aa1da7` |
| Contract test | `36a46aae9ac4411d82401b9d0da8a764a4ae02ea02f57cacf70e5bbb80eecdd6` |
| Browser matrix test | `9e22c6743215c20820070f7f5abce5f0b876ac5c5fd78e817b4bb07e7fcca067` |
| Source-version monitor | `c2aa72144b9b34234e7f1f1bcc10d8f3349e6fc511d2b35afa8ccdf8458b28bc` |
| Browser matrix JSON | `4b35e7677bbeeed18d5f3a09748d8a2a0b01f276516af1d768dae88bbdd1377d` |
| Mobile interaction screenshot | `31f9a43d5ff118297ed2984953dbe9c41e05c0abff1e3a51d1df17388ef5b41c` |

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
  ECO-01 BROWSER MATRIX PASS: 30 checks

node scripts/check-inline-js.js
  PASS — 353 scripts / 132 live pages

node scripts/check-local-links.js
  PASS — 1,944 references / 110 pages

node scripts/check-town.js
  PASS

node scripts/check-product-stewards.mjs
  PASS — 65 products; active 3/3
```

## Remaining gates and limitations

- Chrome ran headlessly, not as a headed visual-approval session.
- The 200% check uses CSS `zoom: 2`, not native browser zoom or operating-system
  magnification.
- DOM inspection does not prove what an assistive technology announces.
- Safari and VoiceOver were not run. No Safari, VoiceOver, screen-reader or
  full WCAG-conformance claim is made.
- The eight-newcomer study has not run.
- An independent reviewer has not yet accepted this repaired candidate.

The candidate, Library cover and Miss Jeeves remain HOLD/PREVIEW. No deploy,
publication or git action occurred.
