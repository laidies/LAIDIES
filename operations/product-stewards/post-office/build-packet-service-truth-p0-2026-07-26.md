# Post Office service-truth P0 — build packet

**Status:** BUILT LOCALLY — independent rejudge required.
**Date:** 2026-07-26
**Public/provider mutations:** none authorised or performed.

## Problem and outcome

The building mixed fictional PO-box language, a global sign-in route with no target, published archive stamps that resembled delivery receipts, and a postcard source-binding bug. The bounded candidate separates four visible counters, installs a real held `#signin` target with no email intake, labels the archive as publication, hardens episode rendering, and guarantees that the selected postcard is the card whose canonical URL is copied/shared.

## Owned implementation paths

- `post-office.html`
- `postcard.html`
- `content/site/post-office.js`
- `content/site/sv-welcome-tour.js`
- `content/site/sunnyvaile-directory.js`
- `scripts/test-post-office-local-contract.mjs`
- `scripts/test-post-office-browser-local.cjs`
- `operations/product-stewards/post-office/` dossier and evidence
- one required learning entry in `operations/painpoints-log.md`

The two shared discovery files were essential because they repeated the Post Office's superseded delivery/sign-in promises. No central product registry, run queue, credentials, Git history, deployment or provider state is in scope.

## Judge acceptance contract

Accept the local P0 only when:

1. `node scripts/test-post-office-local-contract.mjs` passes against source and a fresh exact artifact.
2. `node scripts/test-post-office-browser-local.cjs` passes against source and that artifact with zero completed external requests.
3. The global inline-JS, local-link, town and product-steward checks pass.
4. `post-office.html#signin` visibly says account intake is held, collects no email and starts no magic-link request.
5. A deep-linked postcard selection produces the identical public canonical URL on copy/share.
6. Published episode data cannot inject markup and malformed archive data fails closed.
7. Owner visual, native assistive-technology and privacy reviewers accept the candidate or record exact fixes.

Do not treat this packet as Buttondown subscription/delivery, Supabase auth/session, public-origin, referral or reward proof.

## Integration and release plan

1. Independently review the bounded local candidate and evidence images.
2. If accepted, preserve the exact tested runtime files in the release candidate.
3. With an approved disposable identity and explicit service-mutation/cleanup authority, run the existing controlled Buttondown/Supabase packet and capture redacted receipts.
4. Run exact-candidate public-origin checks only after deployment authority exists.
5. Reconcile verified outcomes into AW-003; retain held wording for every unverified outcome.

## Measurement, rollback and upkeep

Any measurement is categorical and privacy safe: counter choice, local validation/failure category, share capability and provider result category only after an authoritative integration exists. Never collect email, postcard note, handle, auth material or raw share URL.

Rollback is file-level restoration of the owned runtime changes after preserving the failing fixture and evidence. Never restore PO-box, subscription, delivery, sign-in-complete or referral/reward claims without authoritative proof. Re-run the two Post Office suites after any Buttondown, Supabase, archive-data, share API, privacy, route or public-promise change.
