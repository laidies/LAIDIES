# Miss Jeeves free initial lookup repair

Baseline: copied unchanged from the current Pages control archive
`/private/tmp/laidies-newsstand-sep19-recovery-q45fo2/stage/_worker.js`, SHA-256
`ac0588d23def411c62e2936121b85a8702f01ba0d3c6f4893a3b0f281b34e230`.

This candidate changes only the `/api/miss-jeeves` initial-query path and its
local search helper. Valid initial requests always return the existing
`search_results` / `site-search` contract: `results` are current admitted
catalogue records and each retains its existing `summary` preview. The worker
makes neither `env.AI.run` nor `env.FAIRY_AI.fetch` on that path. It does not
create an answer for a question that the catalogue does not already cover.

The formerly hard-targeted broad query, `Which AI should I use?`, now maps only to the substantive Chapter 7.1 “Three Layers, Not One Choice” section. It no longer maps to the Chapter 7 slogan.

Current-index requirement: deploy with the same release's
`/content/site/miss-jeeves-index.json`, schema
`laidies-miss-jeeves-index.v1`, containing reviewed live entries. Run the
regression once with that exact staged index as its argument.

## Index source check

The immutable live `library.html` embeds the current admitted Working with AI
101 record: version `working-with-ai-101-2026-08-29.1`, artifact SHA-256
`2ac1f222ceea8e555577f8970c1cd7b8f0f8f94332912f6b8a3db12070886c8c`.
The deployed index still carried the older `working-with-ai-101-2026-08-24.2`
rows with SHA-256 `0a57a3e31622836ac990362bf30b273406f60df5b3584f37d8161d79ace72736`.

`miss-jeeves-index.json` replaces only the four admitted-book row groups with
the pre-existing, builder-verified August 29 index rows. Its nine current live
non-book entries are byte-identical to the captured live index and remain
unchanged. This preserves published non-book material while aligning Library
search previews and destinations with the current book admission.
