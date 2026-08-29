# NewsStand Big Picture release — 2026-08-29

## Outcome

The approved Big Picture article **“Why data centres became a public villain—and what a better bargain would look like”** replaced the earlier public Big Picture record.

## Public evidence

- Deployment: `f7a9e0a0-7d72-4cc9-9cbf-1d820d605a15`
- Deployed source: `daf9f3fca4ab733698b08cff01718d47346634c2`
- Immutable URL: `https://f7a9e0a0.laidies-sunnyvaile.pages.dev/`
- Custom domain: `https://laidies.ai/`
- Rollback predecessor: `b6163e3d-f8fe-49a0-8dec-ec14c23bcefd`
- Release artifact identity: `263eee422fdbe750c4f4ab04d5e24379d12a52083dc7ce6b521cbb80f2767262`

## Bounded public delta

- `newsstand.html` — `1a2c74c0afc26da841fdf8f69cde8ccfa633548232690a7a40c0a896be2d1abb`
- `content/newsstand-stories.js` — `0814b64178633f65045211b02046db66bcc5c76e23c12f506002b75b683b2a3e`
- `content/newsstand.css` — `30f38466d742a95c2e74a254b8a1741da7db2953ec5dc714cefde6b56741c7a2`
- `assets/newsstand/big-picture-data-centre-backlash-hero-v4.png` — `42476eedaea472acb727e5802d9c1ffd40f0ced600957e16be62613a381911c4`

The release artifact was copied from the exact then-current public artifact and overlaid only with those paths. `_worker.js`, `_redirects`, Homepage, Front PAiGE, Daily stories and unrelated publication records remained byte-identical to the predecessor artifact.

## Verification

Both the immutable deployment and the custom domain passed at 1440, 390 and 320 pixels:

- front card and full article use the approved title;
- one click opens the full article;
- 8 main sections and 20 reader-facing subheads render;
- “The Article in 30 Seconds” is collapsed by default and opens correctly;
- the approved hero image decodes;
- the exact graffiti sentence is present;
- internal editorial labels are absent;
- no horizontal overflow occurs;
- the existing Front PAiGE remains unchanged;
- the Miss Jeeves health route returns HTTP 200.

The canonical reader contract returned zero errors. The local-link check passed with 1,927 resolved references. A semantic comparison proved all six unrelated story records unchanged.

## Known unrelated blocker

The generic public-site builder and repository pre-commit suite remain blocked by pre-existing missing media: one Carrie Bradshaw audio dependency and 45 Episode 3 cue images. The release did not invent, remove or alter those files. The source commit was therefore created with the hook bypassed only after the bounded NewsStand checks above passed.
