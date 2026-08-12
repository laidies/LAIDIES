# NewsStand Daily archive public release — 2026-08-11

Status: `DEPLOYED_AND_VERIFIED_PUBLICLY`

## Exact release

- Source commit: `175167e804219deab9a49d687495ba7ad0dfc4b4`
- Curated public-artifact identity: `f1b7be21e35d7bb9c1196f30dcc83b3151ba58e2569f233665d5cab03c4fa341`
- Cloudflare Pages project: `laidies-sunnyvaile`
- Production branch: `homepage-redesign`
- Deployment ID: `d02476e4-fa6b-4517-858c-0320c81d3637`
- Immutable deployment URL: `https://d02476e4.laidies-sunnyvaile.pages.dev`
- Public route: `https://laidies.ai/newsstand#eu-ai-act-transparency-starts`
- Deployed at: `2026-08-12T05:51Z`

## Public byte verification

- `newsstand.html`: `5af8beb902d4c04de853e156b72c80160eceeaa89145484b0c0c27abd3edb4d7`
- `content/newsstand-reader-contract.js`: `638e21d5dba09e989494256ec3ee3859fa70bbba6f581088e414048507d268a8`
- `content/newsstand-stories.js`: `c4516f3207d3abd735d500341d99c531a7e3799c2c18b67519d7899c8a3b6767`

The three public SHA-256 values matched the exact curated artifact after the
Cloudflare production deployment.

## Public experience verification

Headless Chrome opened the exact public story hash. The rendered result showed:

- `Inside the paper.`
- The Daily as `Latest complete edition`, not a current edition.
- The full headline `Europe’s AI transparency rules started August 2. Here’s when you should expect a label.`
- The Story, The LAiDIES Read, What This Means For You, Cocktail Party Explanation,
  Class Notes, four source links and filed-under topics.
- No `Source check overdue` or `Archived route · check overdue` denial.

## Checks

- NewsStand reader contract: PASS, 10 state fixtures.
- Deliberately bypassed story-freshness guard: FAIL as calibrated.
- NewsStand rendered browser suite: PASS, 211 checks across desktop/mobile,
  archive rollover, direct routes, focus, hold, stale, correction and retraction.
- Repository `npm run ci`: PASS.

The standalone NewsStand validator still reports the pre-existing missing
`/content/library-books/rendered/accounts-101.html` link in the held Health story.
That story remains held and was not part of this public Daily release. No PASS is
claimed for that separate validator.

## Root causes and prevention

1. Daily edition recency and archive readability were represented by one state.
   The reader now classifies a prior-date Daily as `archive` before applying the
   current-paper desk timeout, while retaining a bounded 30-day story source window.
2. The dataset-level route guard treated `no current paper` as `no usable paper`,
   blocking eligible archive hashes and search. An eligible archive now makes the
   NewsStand route usable; each story still passes its own source, hold, correction
   and retraction checks.
3. The GitHub Pages production workflow is not the origin serving `laidies.ai`.
   This release used the actual Cloudflare Pages project and production branch.
   The workflow/controller must be migrated to Cloudflare before it can be called
   the durable automated production path.
