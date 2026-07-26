# NewsStand canonical reader repair — local build evidence

**Date:** 2026-07-25  
**Trigger:** independent review defects NS-IR-01 through NS-IR-05  
**Status:** BUILT LOCALLY — RELEASE HOLD  
**Authority:** local source, fixtures and evidence records only; no deploy,
publication, credentials, service mutation or visual approval

## Built

- Added the versioned public dataset schema and fail-closed shared reader
  contract.
- Migrated public source data, validator and reader from legacy `wednesday` to
  canonical `weekly`; the already-existing candidate schema/policy also uses
  `weekly`.
- Added explicit current/quiet/stale/hold/unavailable/no-data/load-failure,
  correction and retraction logic.
- Added publication/story timestamps, source approval, correction/retraction
  fields and story evidence-manifest bindings.
- Held the Health-in-ChatGPT Weekly item instead of allowing it to remain
  visible on interested-party evidence. Added OpenAI Help, U.S. HHS and U.S.
  FTC context, a claim map, correction owner and recheck date. It still needs
  independent approval.
- Added programmatic selector state and open/search/return focus handling.
- Truthfully labelled the existing Wednesday cover as legacy archive art; no
  visual was generated, replaced or approved.
- Reconciled only the named homepage, shared directory/welcome-tour and tour
  teaser language to the four jobs and a current-or-honestly-quiet promise.

## Deterministic evidence

- `node scripts/validate-newsstand-stories.mjs`
- `node scripts/test-newsstand-reader-contract.mjs`
- candidate inline-script compilation
- `git diff --check` on the owned repair paths

The state suite uses eight explicit fixtures covering ready/current, no data,
load failure, stale, dataset hold, story hold, correction and retraction.

Local static HTTP checks returned `200` for the reader, dataset, contract,
schema and CSS. The in-app browser runtime reported no available browser during
this cycle, so desktop/390 visual inspection, real keyboard focus observation,
200% zoom, reduced-motion rendering and screen-reader evidence remain
**NOT VERIFIED**. Static assertions and source inspection do not replace those
rendered checks.

## Research evidence

Accessed 2026-07-25:

- OpenAI, “Launching Health in ChatGPT”:
  `https://openai.com/index/health-in-chatgpt/`
- OpenAI Help, “Health in ChatGPT”:
  `https://help.openai.com/en/articles/20001036-health-in-chatgpt`
- U.S. HHS, “The access right, health apps, & APIs”:
  `https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/access-right-health-apps-apis/index.html`
- U.S. FTC, “Complying with FTC’s Health Breach Notification Rule”:
  `https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0`

The HHS/FTC material supplies authoritative privacy context; it does not
establish a legal conclusion about the exact OpenAI product. The copy remains
held for independent review.

## Still open

- independent editorial/accuracy approval of the revised Health story;
- independent product/brand/accessibility/technical re-review;
- real screen-reader and 200% zoom evidence;
- controlled producer-to-reader and correction/rollback drill;
- approved replacement Weekly cover, or retirement of the legacy paper image;
- fresh artifact binding and authorized public verification.

The reviewed launch artifact was not edited and remains non-authoritative.
