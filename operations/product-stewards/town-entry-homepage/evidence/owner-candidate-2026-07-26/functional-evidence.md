# Town Entry isolated functional candidate — maker evidence

**Evidence time:** 2026-07-26 11:17:45 PDT (America/Vancouver)  
**Status:** VERIFIED LOCALLY — NAMED ISOLATED FUNCTIONAL STATES ONLY  
**Owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Candidate:** `operations/prototypes/homepage-editorial-v1/`  
**Public/deploy status:** not deployed, not public, no release authority used

## Literal output

The isolated React candidate now renders:

1. a homepage with three non-duplicative primary entrances;
2. first-time, returning-without-Card, device-local Card and verified-account
   held states selected through the `visitor` query parameter/control;
3. Episode 04 as **Latest published** with its June 24, 2026 date, never an
   unsupported “this week” label;
4. The Breaking as a clear-day/quiet state and The Daily as release-held;
5. fetched, versioned content and six-record readiness snapshots, each with a
   generated time, freshness deadline and source/evidence references;
6. a fail-closed readiness state that contracts to three useful evergreen
   routes and makes no receiving-product certification claim;
7. a separate `/start-here.html` candidate with ordinary Visitor's Centre
   navigation and a readiness-failure explanation; and
8. explicit prototype controls for current-content and readiness failure.

The candidate does not read/write live identity, reward, analytics, newsletter
or readiness services. It does not select or propagate a global style.

## Exact candidate identity

| File | SHA-256 |
|---|---|
| `index.html` | `0ee450abe98e6d7e8c594c0ed1964e2d461c9a07b7b479671b5206fbd711dde5` |
| `src/App.jsx` | `fb1d24bf0dfc54e1253000ee47a94f0af7b2db7321b4b74224c82cafe0eff445` |
| `src/styles.css` | `933e3c2277d776e5b12f3ae8e10e7a08e5c333bd921241e34fda12b0d1b4d16a` |
| `public/data/current-content.json` | `54c839f1904940b709f6819bd0e18dafb3df20e06b0c1ebbef5211ad4fad5831` |
| `public/data/readiness.json` | `c3c07178d182ef60d4149778d4d4c899bdbac913c4cfcd5dca0c1384f95e34f5` |
| `tests/candidate-browser.cjs` | `b019c5a2ad90174ed976fb087959e211a446b2eaec77e306dc890b91e434bacc` |
| `dist/client/index.html` | `25b1d5ba94422d1a84a3a78259bb346567d59768ca5ad735f9eff65a694aa8bb` |
| built CSS | `d77e6b6ad807dde832d608e52c9cf0f07f088ae846fd9a5db9e96ae1e27dea9a` |
| built JS | `e3b728c0f4b511a5367019d68ac03c05b0691e86731c0ac0f1f7bf9e0c48698b` |

## Tests

| Command | Result | Scope |
|---|---|---|
| `npm run build` | PASS | Vite production build and Sites artifact preparation |
| `npm run test:sites` | PASS — 4/4 | static asset, SPA fallback, API/write non-fallback and required output files |
| `NODE_PATH=<bundled-runtime> npm run test:candidate` | PASS — 8/8 | first desktop; returning/no-Card mobile; local Card mobile; verified account hold; current/readiness failure; Start Here desktop; Start Here failure mobile; 320px reflow |
| `NODE_PATH=<bundled-runtime> npm run render:candidate` | PASS — 6 scenes | full-page desktop/mobile evidence and exact route/width matrix |
| `git diff --check -- <prototype> <dossier>` | PASS | whitespace integrity at evidence time |

The browser suite records no console/page errors and no horizontal overflow in
the eight named scenes. It also verifies mobile menu open/Escape, three primary
actions, held/quiet news copy, Card/account limitation copy, fail-closed
readiness count, projection receipts, failure-mode removal of unbound “latest”
claims and Start Here ordinary route.

## Rendered evidence

- `homepage-first-desktop-1440.png`
- `homepage-returning-mobile-390.png`
- `homepage-local-card-mobile-390.png`
- `homepage-failure-mobile-390.png`
- `start-here-desktop-1440.png`
- `start-here-failure-mobile-390.png`
- `render-matrix.json`

## Observed versus unproved

**Observed:** exact React output, query-addressable states, semantic copy,
links, menu/Escape, 1440/390/320 reflow, failure-state contraction, current
labels, fetched versioned snapshot envelopes, build output and screenshot
evidence. Unsupported schema versions, invalid freshness windows and passed
freshness deadlines all fail closed.

**Not proved:** human comprehension, native Safari/VoiceOver and real 200% zoom,
actual receiving-route outcomes, automated owner-to-projection publication,
identity/reward transitions, Buttondown lifecycle,
analytics/privacy, performance budgets, exact-use visual admission, clean
repository commit, deploy or public origin.

## Maker learning

The first Card-state build duplicated the same Closet action in the hero and
state banner. The browser test caught two matching accessible links. The maker
removed the banner duplicate and retained one state-specific primary action.
This is a local example of the existing hierarchy prevention rule, not a new
canonical painpoint.
