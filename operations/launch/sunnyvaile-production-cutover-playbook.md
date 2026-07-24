# SUNNYVAiLE production cutover playbook

**Status:** CUTOVER COMPLETE; public-origin smoke passed; social publication
still open
**Cutover owner:** Ali approves timing/design; Codex executes and verifies
**Release candidate:** `59758f5be9539bed95f056855ad9d214f851876e`

## Current truthful state — after the 2026-07-24 cutover

- `laidies.ai` and `www.laidies.ai` now serve the named Cloudflare Pages
  release with SSL enabled.
- Cloudflare is already authoritative DNS for the zone.
- Verified pre-cutover DNS recovery values:
  - apex A: `185.199.108.153`
  - apex A: `185.199.109.153`
  - apex A: `185.199.110.153`
  - apex A: `185.199.111.153`
  - `www` CNAME: `laidies.github.io`
- The exact clean-commit artifact is deployed to the Cloudflare Pages
  production slot:
  - project alias: `https://laidies-sunnyvaile.pages.dev`
  - immutable deployment: `https://1cf53be9.laidies-sunnyvaile.pages.dev`
  - deployment ID: `1cf53be9-9946-4da8-8136-3cd0136f4272`
  - branch/source: `homepage-redesign` / `59758f5`
- The apex public response is byte-identical to the release commit's
  `index.html`; both SHA-256 values are
  `72bf54e5e6d0db80dc9be892f5b11911d5503f4508ea3501e81136a2e30adaf1`.
- The payload contains 1,083 public files / 1001.30 MiB, no missing or
  over-25-MiB file, plus its generated build report.
- The Cloudflare slot and public domain are DEPLOYED and publicly verified.
  This is not proof that the social announcement has published.

Full public-origin evidence:
`operations/review-packets/grand-reopening-production-cutover-2026-07-24.md`.

## Why GitHub Pages is not the cutover path

The pushed repository tree is several gigabytes, while GitHub Pages documents
a 1-GB published-site limit. Merging the studio tree to `main` does not create
a safe deployable site and risks repeating the prior out-of-space failure.
The curated artifact is the release product; the repository is the studio.

## Owner gate before any public switch — satisfied 2026-07-24

The domain was attached only after Ali unblocked the launch and the named
candidate had passed exact-artifact QA. The gate required:

1. reviewed the actual current LIBRAiRY and Visitor's Centre candidates;
2. approved the public-domain cutover;
3. selected the announcement channels/assets or explicitly separated the
   technical launch from the campaign; and
4. confirmed that the disclosed narrated-edition limitations are acceptable.

## Pre-cutover checks

1. Confirm `origin/homepage-redesign` contains the named release commit.
2. Resolve the full source ID with `git rev-parse <commit>`; never type or
   hand-extend an abbreviated SHA.
3. Rebuild from `git archive <full-sha>`, never from the dirty studio tree.
4. Pass:
   - local-link, inline-JS and town-canon checks;
   - NewsStand source/data validation;
   - public-artifact KSVL and episode-cue validation;
   - `validate-public-metadata.mjs`;
   - compact and desktop browser journeys in the reveal-readiness ledger.
5. Confirm the immutable Pages deployment returns:
   - `/robots.txt` as plain text;
   - `/sitemap.xml` with only current canonical routes;
   - retired Grimoire routes as intentional 301s; and
   - an unknown URL as the branded page with HTTP 404.
6. Record the current GitHub Pages DNS values immediately before switching.

## Cutover

1. In the existing `laidies-sunnyvaile` Pages project, add `laidies.ai` as the
   apex custom domain. Do not create a second project.
2. Allow Cloudflare to replace the apex GitHub Pages records with the Pages
   custom-domain record.
3. Add or update `www.laidies.ai` to resolve to the same Pages project and keep
   one canonical host.
4. Wait for the custom-domain certificate and route to become active.
5. Do not announce during propagation.

## Required public-origin smoke test

Run these against `https://laidies.ai`, not the pages.dev alias:

- homepage promise, Rewind Era language and Visitor's Centre entry;
- Visitor directory selection and LIBRAiRY question search;
- NewsStand WEDNESDAY/Tribune stories and named sources;
- KSVL Tune In through station ID, DJ introduction and first song;
- Chick Flicks plus Episode 1–4 reading pages;
- Screening Room Episode 1–4 audio, honest edition labels and captions;
- Dream Phone call and remix;
- one harmless FAiRY Godmother request from the production origin;
- Resident Card, Post Office/join/auth and community entry states;
- canonical host, HTTPS, `www`, robots, sitemap, 404 and retired redirects;
- mobile and desktop overflow/broken-image/console checks;
- analytics/error monitoring reception without recording private content.

These checks passed on 2026-07-24. The release is **VERIFIED PUBLICLY**. The
reveal campaign may publish from an authenticated channel; the current Codex
environment does not have Instagram/LinkedIn publishing access.

## Rollback

If a core public journey, certificate, origin permission or recovery route
fails:

1. stop/pause campaign publishing;
2. remove or deactivate the Pages custom-domain route;
3. restore the recorded GitHub Pages apex A records and the prior `www` CNAME;
4. verify the former site resolves on apex and `www`;
5. keep the failed Pages deployment for diagnosis rather than deleting
   evidence; and
6. record the incident and a new immutable candidate before retrying.

Cloudflare Pages deployment rollback may restore a prior Pages artifact, but
DNS rollback remains the recovery path until a Pages-hosted version has been
publicly verified.
