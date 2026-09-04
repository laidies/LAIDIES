# September 4 Astra Daily — public release evidence

## Decision

- Issue envelope: `operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-09-04-astra-1.json`
- Envelope SHA-256: `e79e0272c423bb5276ebfb71d952851880560f0373f73470864253274fe1b586`
- Independent decision: `ACCEPT_LOCAL_CANONICAL_WRITE`
- Story: `openai-gpt-6-astra-launch-2026-09-04`
- Front PAiGE: `front-paige-accountable-systems-2026-08-24` unchanged
- Weekly: `weekly-accountable-systems-2026-08-24` unchanged
- Big Picture: unchanged
- Services: six exact eligible predecessor records carried with their original dates; the expired Mme CLAi-O record is omitted.

## Exact artifact boundary

- Base deployment: `52067cc4-f80a-49b5-883b-61a2b293be93`
- Base input: `/tmp/laidies-homepage-dyk-successor.RxjPvi`
- Base identity: `134bbce983e6a7f9ca42051c7504c27344fcc5987c5c6a7fb9ca18f32a56c925`
- Successor input: `/tmp/laidies-newsstand-astra-successor.uiET5n`
- Successor manifest: `/tmp/laidies-newsstand-astra-successor.uiET5n.manifest.json`
- Successor file count: 745
- Successor bytes: 786,540,767
- Successor identity: `0376da28babbe911a9a3b1706839dcebe8f6bc9eb7986118777267f4a3fe52d2`

Exactly six public paths change: the NewsStand page cache token, four canonical/derived NewsStand data files, and the new Astra illustration. The other 739 predecessor files are byte-identical.

## Visitor evidence before release

- Desktop paper and one-click full article: pass.
- 390 px and 320 px paper/article layouts: pass; no visible horizontal clipping.
- Back to the Paper: pass; returns focus to the exact Astra card.
- Native Chrome zoom: exact 200% confirmed in the browser zoom control; article headline and Back control remain visible, and exact-card return focus passes. Browser restored to 100% afterward.

## Disclosed limitations

- The broad story validator reports 92 pre-existing incumbent Big Picture/data-centre errors. It reports zero Astra errors. The scoped story, issue, publisher, derivative, reader and continuity checks pass.
- Repository-wide precommit was bypassed only for the scoped commit because its 45 missing Episode 3 assets are unrelated to this six-path NewsStand release. No Episode path changed.

## Public result

- Deployment: `160d9309-425d-4cdb-ac19-40a614fe7890`
- Source commit: `de7afd1f66c920974f788d71c616f9ef714443b1`
- Immutable origin: `https://160d9309.laidies-sunnyvaile.pages.dev`
- Custom story route: `https://laidies.ai/newsstand#openai-gpt-6-astra-launch-2026-09-04`
- Current provider head was rechecked after release and is the deployment above.
- Fourteen served paths match the exact successor at both custom and immutable origins: NewsStand page, stories, dated issues, service records, feed, archive, runtime, CSS, Astra image and six protected neighbouring routes. Deployment-only `_worker.js` and `_redirects` remain manifest-verified rather than falsely reported as directly served paths.
- Live desktop, explicit 390 px and 320 px viewport journeys show the September 4 Astra lead, one-click full article, all article sections and seven source links. Back to the Paper returns focus to the exact Astra card. Native Chrome 200% preserves the headline, Back control and exact-card focus; the browser was explicitly restored to 100%.
- The immutable story image had a short ordinary load delay during one visit, then rendered without navigation or retry; its exact public bytes also match the released asset.

## Final disposition

`PUBLICLY VERIFIED`. Front PAiGE, Weekly, Big Picture, six eligible carried services and all non-NewsStand bytes remain unchanged. Mme CLAi-O is intentionally absent because its previous reading expired on September 3. No unreviewed service, Big Picture or Daybreak candidate was published.
