# Control Room handoff: AI Fundamentals 101 R7 direction candidate

**Status:** READY FOR ALI DIRECTION REVIEW — BUILT AND VERIFIED LOCALLY / LIBRAiRY ADMISSION HELD

**Evidence time:** 2026-08-10T15:46:55-07:00

## Action

Produced a new Introduction + Chapter 1 from the complete-book research and prerequisite route rather than revising the rejected R6 taxonomy. R7 preserves Ali's authored Introduction, removes the global Nerd-O-Meter and rejected CSS diagram, teaches the AI-label relationships through separate field, approach, job, information-form, operating-pattern, embodiment and breadth questions, and ends with Recognise / Explain / Draw / Use application plus Key Definitions and truthful continuation routes.

## Exact evidence

- Source: `content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r7.md`
  - SHA-256 `563f9419eddbbc10bf4b66a9170f5702bec8a2bde40dfb16aa93ef1940aaba86`
- Render: `content/library-books/pilots/ai-fundamentals-101-v4/rendered/introduction-and-chapter-1-r7.html`
  - SHA-256 `822857b8dd6f940883336083ddba06b2e6ce624558ff7d76b49b6da202f0b104`
- Manifest: `content/library-books/pilots/ai-fundamentals-101-v4/r7-artifact-manifest.json`
  - SHA-256 `940fa5c6eb6ff23f438293d42f64a011db2245c6232cf46a29018eb9ec39b14e`
- Producer contract: `operations/product-stewards/library/AI-FUNDAMENTALS-101-R7-PRODUCER-CONTRACT.json`
  - SHA-256 `21d4a9a7a79aab664808846a758d44dcd5cbc6918ad29e324f9c90f5c005c799`
- Producer exact-prose review: `content/library-books/pilots/ai-fundamentals-101-v4/r7-producer-self-review.json`
  - SHA-256 `45cc56337113dd7d1c85ecf64fcc12609759746d1092a32e1f1bf0bf46ef3f1e`
- Role-distinct review: `operations/product-stewards/library/AI-FUNDAMENTALS-101-R7-INDEPENDENT-SEMANTIC-DIRECTION-REVIEW-2026-08-10.md`

## Tests

- `node scripts/build-ai-fundamentals-r7-review.mjs` — PASS with exact source/render/manifest tuple above.
- `node scripts/check-content-producer-contract.mjs operations/product-stewards/library/AI-FUNDAMENTALS-101-R7-PRODUCER-CONTRACT.json` — PASS; `READY_TO_DRAFT`; no quality authority inferred.
- `node scripts/test-ai-fundamentals-beginner-language.mjs` — PASS; two deliberately bad fixtures rejected, including later-chapter jargon before local teaching.
- `node scripts/check-ai-fundamentals-beginner-language.mjs content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r7.md` — PASS.
- `node scripts/check-prose-quality-admission.mjs content/library-books/pilots/ai-fundamentals-101-v4/r7-producer-self-review.json` — integrity PASS; no independent quality authority inferred.
- Current 390 px rendered viewport — PASS for horizontal overflow (`scrollWidth=clientWidth=390`), heading order and removal of the rejected Nerd-O-Meter/car taxonomy route. This is a maker layout inspection, not independent visual or accessibility admission.
- Read-only artifact-first reviewer session `019fedd3-fcd4-7a80-8806-201658bdeb5e` — semantic direction PASS, zero material issues, explain-back and unseen transfer PASS. This is not observed unfamiliar-reader evidence.

## Locks, dependencies and authority

- R6 and successor 15 remain rejected calibration and were not edited.
- Ali owns direction acceptance.
- LIBRAiRY owns later book production, unfamiliar-reader/visual/accessibility admission and release.
- Next trigger: Ali accepts or rejects the R7 teaching direction. Later chapters do not proceed by implication.
- No merge, deploy, publication, public route, activity, reward, spend or Ali/public authority was used.
