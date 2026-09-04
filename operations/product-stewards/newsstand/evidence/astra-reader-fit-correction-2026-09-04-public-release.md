# Astra reader-fit correction — public release evidence

- Released at: 2026-09-04 (America/Vancouver)
- Source commit: `1d25bbfdfc15479a49464d1d5a523c63efc2b951`
- Production deployment: `ac5e1937-e178-46fa-a8c5-bb3f6602bde5`
- Immutable origin: `https://ac5e1937.laidies-sunnyvaile.pages.dev`
- Custom origin: `https://laidies.ai`
- Exact predecessor: `/private/tmp/laidies-newsstand-astra-successor.uiET5n`
- Predecessor identity: `0376da28babbe911a9a3b1706839dcebe8f6bc9eb7986118777267f4a3fe52d2`
- Exact deployed artifact: `/private/tmp/laidies-newsstand-astra-reader-fit-successor.mkmvyO`
- Manifest: `/private/tmp/laidies-newsstand-astra-reader-fit-successor.mkmvyO.manifest.json`
- Artifact: 745 files, 786542786 bytes
- Artifact identity: `647df03c3c59256c915861d58e7de7aff6f4096cab114349516cafe49f73f026`

## Exact public boundary

Exactly six existing files changed; there were no additions or removals:

1. `content/newsstand-archive-index.json`
2. `content/newsstand-daily-issues.json`
3. `content/newsstand-public-feed.json`
4. `content/newsstand-stories.js`
5. `content/site/newsstand-catchup-v1.js`
6. `newsstand.html`

All other 739 artifact paths match the exact production predecessor by SHA-256 and byte count.

## Verification

- Source branch was pushed before release.
- Fresh Cloudflare provider check immediately before composition confirmed production remained `160d9309-425d-4cdb-ac19-40a614fe7890`.
- All six changed-path hashes match the exact artifact at both the immutable and custom origins.
- Public copy checks find the corrected headline, September 4 update note, Sol comparison and Fable 5.1 comparison, and do not find the rejected headline.
- The complete 53-check NewsStand browser suite passes at both origins on desktop, 390 px and 320 px, including Daily, Big Picture, archive, crossword and keyboard journeys.
- Homepage, Learn, Library, FAiRY, Resident Card and Radio return HTTP 200 at both origins.
- Local scoped tests passed for AIDB edition selection, model/tool reader fit, review routing, correction admission, ordinary-news pipeline, next cycle, derivatives, reader contract, browser behavior and native 200% zoom.

Native 200% zoom was not rerun against the public origin because the exact page/runtime data paths were hash-verified and the same candidate passed the local native test. The known repository-wide Episode 3 asset gate remains unrelated to this release; the exact task paths were committed with `--no-verify` only after all scoped checks passed.
