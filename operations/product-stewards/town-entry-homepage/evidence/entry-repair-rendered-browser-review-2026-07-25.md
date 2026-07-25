# Town Entry repair — rendered local browser review — 2026-07-25

**Status:** VERIFIED LOCALLY for the named rendered repair states only. This is not a clean release artifact, public verification, first-user comprehension result, owner visual approval, or downstream-product completion.

## Exact local source

- `index.html` SHA-256 `287fa16784798442275a1369fbba6152e0b80ffe5deb543b82a6a7e22658299f`
- `content/site/homepage.js` SHA-256 `1c759a0f1bef231616842d99b7a84d7cf9e0d69ba20147c094ddee520cccefdf`
- `visitors-centre.html` SHA-256 `69c7af47f2a2cc4b89cb05429e372221ea260b83fc2d7cb3e547c9045149a181`
- `scripts/test-entry-recovery-truth.mjs` SHA-256 `8507c1086e1b61d55180d9924217f82a657ca48adc947960332f26a9d1ca5f0d`

The files were served from the dirty working tree at `127.0.0.1`. These hashes bind the observation, but they are not a commit or release candidate.

## Rendered results

| State | Result | Observation |
|---|---|---|
| Successful episode index at 390×844 | PASS | The current published data replaced the evergreen fallback with `This week`, `Read this week`, and `Listen this week`; no horizontal overflow (`390px` viewport and document width). |
| Missing episode index at 390×844 | PASS | A controlled local server without `content/episode-index.json` rendered `Previously published`, `Episode 04 · The Founding Mothers`, `Read Episode 04`, and `Listen to Episode 04`. It did not retain a current-week claim. |
| Centre → Library arrival | PASS | Named directory selection revealed `SUNNYVAiLE LIBRAiRY`; its exact CTA navigated to `/library.html`, whose rendered title was `SUNNYVAiLE LIBRAiRY`. This establishes arrival only. |
| Browser console | PASS WITH EXPECTED LOCAL LIMIT | No page warning/error was observed other than Plausible declining localhost (`Ignoring Event: localhost`). |

## Limits

The test does not establish clean-user comprehension, real mobile Safari, screen-reader announcement, no-JS usability, public bytes, Library completion, account, newsletter, postcard delivery, reward, or reopening readiness. Per BTB-069, route arrival is not the receiving product's outcome.
