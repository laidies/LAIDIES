# NewsStand backfill and Big Picture public release — 2026-08-12

Status: `DEPLOYED_AND_VERIFIED_PUBLICLY`

## Exact release

- Source commit: `efb6f36f1deb1612abe48da1a371a40a086bcd1f`
- Curated public-artifact identity: `d97b150906cd49431240c08ad451ce0b245bc79717b50749760624790a4099be`
- Artifact manifest: 559 files; 435,614,818 bytes
- Cloudflare Pages project: `laidies-sunnyvaile`
- Production branch metadata: `homepage-redesign`
- Deployment ID: `fb867acf-aa57-4574-a6f3-2e1cd2e2bf20`
- Immutable deployment: `https://fb867acf.laidies-sunnyvaile.pages.dev`
- Public route: `https://laidies.ai/newsstand`
- Verified at: `2026-08-12T15:35:13Z`

## Public byte verification

The custom domain returned the exact artifact bytes:

- `newsstand.html`: `47b6ca5114db1c8660b34272f6f665bd3423443eba9060ed20d686a47ba98c8c`
- `content/newsstand-stories.js`: `dd68f9a0d5aa9229811c21c9b187695daae94886947b9acd744ab4cbff286ea2`
- `content/newsstand-reader-contract.js`: `638e21d5dba09e989494256ec3ee3859fa70bbba6f581088e414048507d268a8`
- `content/site/newsstand-catchup-v1.js`: `92627e55e46dca885e3f47cfba7dc48d6406aa5c6b8118235a1c84964182bc97`

The story and Catch Me Up scripts use the release-specific
`20260812-backfill-v1` cache key. This corrected the first deployment's stale
custom-domain JavaScript without changing the admitted content.

## Verified visitor result

The live page:

- names the four papers The Breaking, The Daily, The Weekly and The Big Picture;
- presents The Weekly as current at the verification cutoff;
- exposes five eligible archive items: four dated Daily reports and one Weekly;
- opens `AI use may be moving the handoff line at work` with The Story, The
  LAiDIES Read, What This Means For You, Class Notes and three public sources;
- keeps the held Health/Breaking item and rejected service-column drafts out;
- returns no browser console errors in the tested journey.

## Checks and calibration

- story schema/visibility validator: 4 publications, 6 visible stories, 1 held;
- reader contract: 10 deterministic state fixtures;
- rendered browser suite: 217 checks across desktop/mobile and failure states;
- deliberately restored `The Tribune`: rejected by the masthead guard;
- deliberately restored the old story cache key: rejected by the release-key guard;
- private Daily composer and canonical writer: pass, including idempotency and
  forged/tampered rejection cases.

The repository-wide `npm run ci` still fails on the pre-existing Codex hook
lesson injection and the commit hook still lists unrelated missing Episode 3/4
media. Neither was represented as fixed or included in the NewsStand release
verdict.

## What this release does not claim

- No August 12 Daily was created or implied; the latest complete Daily is August 6.
- No new Paige, Promptoscope, career/life, Mme CLAi-O or STRAiGHT TALK item was published.
- The twice-daily learning executor is not yet a complete cloud publication service.
- The protected repository production controller still targets GitHub Pages,
  while `laidies.ai` is served by Cloudflare Pages; that controller migration remains open.
