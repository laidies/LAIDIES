# Concepts 101 first-book candidate — independent newcomer handoff

**Requested role:** independent newcomer-comprehension and admission judge; do
not reuse the maker's verdict as your own.

**Candidate authority:** local evidence only. Production remains HOLD, zero
books are admitted, and no deployment or publication is authorized.

## Exact candidate

| Artifact | SHA-256 |
| --- | --- |
| Candidate Library | f498ee4a932617a9ff872a6658395ae1e651b183339ea5c9134ad026e6fb084c |
| Candidate admission manifest | 0b921f85af7c5e90188423d3f7ac4ea2b07a7d2d6d3fda316fb3eea7ccb6026b |
| Concepts 101 body | bb25fae48b640f53112bd9191391e66dbbf5bf4a8603d6c5bd55a8cf85508f4b |
| Current-source recheck | 71f914c9bdbdd2a4b239ada885c2e99d17ad73df0d6c84035516793801c4056f |
| Targeted real-browser test | 3232e6ad4a9244dfeb8dc31d39973b3acfc8c35b4b67f13080fd2a689296b40f |

The candidate Library is a snapshot of production library.html SHA-256
7f0a4ca7b27fbc0ffde7b00773cf80dfeec443a1a8a9acbb97541b1e3f7bcb38.
Its only deltas are the real compiler's one-book admission record and three
whole-book Puffy identity attributes: book ID, empty section ID and exact
content version.

## First inspect

Run:

    PLAYWRIGHT_CORE_PATH=/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core node scripts/test-concepts-101-first-book-admission.cjs

Expected result: PASS with 48 checks and 29 external requests blocked. Treat a
different hash or result as a new candidate or a HOLD.

## Newcomer tasks

Judge the actual candidate without maker coaching:

1. Before opening, state what Concepts 101 covers, its depth and whether it is
   available. Fail if the cover/preview does not answer all three.
2. Open it and state whether it behaves like a continuous reference book or a
   class/page-flip experience. Find one subject through contents and one by
   reading continuously.
3. Explain one mechanism in your own words and name one limitation or checking
   question the book leaves you with. This tests comprehension, not recall of
   maker language.
4. With a device-local Resident Card, save the whole book with one of the
   configured 10 active stickers and the second Try this section with a
   different sticker. Verify both records in My Closet.
5. Reopen the exact saved section, remove it, and explain what is and is not
   provided by a Resident Card or a verified account. Fail any account,
   cross-device, ownership, reward or backup inference.

## Judge independently

Return one exact-candidate verdict:

- PASS — INDEPENDENT NEWCOMER/LOCAL ADMISSION CANDIDATE; or
- HOLD with the smallest visitor-visible defect and exact reproduction.

Also state separately:

- whether the before-open description was sufficient;
- whether continuous reading and six contents routes were clear;
- whether whole-book versus exact-section saving was clear;
- whether exact reopen/remove and current-admission recheck worked;
- whether the four visitor states were truthful;
- whether the current-source observations support the unchanged wording;
- what native/browser-family, Ali taste, production integration, release and
  public-origin gates remain.

This is one independent comprehension review, not a formal fixed-size cohort.
No universal cohort or external correction provider is a prerequisite under
the current minimum-sufficient admission rule.
