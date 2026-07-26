# Dream Phone Repair 2 — strict calendar trust-control evidence

**Status:** BUILT LOCALLY — READY FOR INDEPENDENT RE-JUDGMENT  
**Trigger:** the single remaining P0 in
`independent-rejudge-product-status-trust-repair-2-2026-07-25.md`  
**Launch status:** PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL  
**Owner product-model decision:** UNRESOLVED  
**Release/external authority:** NONE

## Bounded result

The normalizing `Date.parse` admission check has been removed. Dream Phone now
uses strict Gregorian calendar arithmetic for date-only `YYYY-MM-DD` values
and compares those canonical strings against a UTC current day.

The runtime now:

- rejects non-leap February 29, February 30/31, April/June/September/November
  31, month/day zero, month 13, day 32 and malformed field widths;
- accepts valid leap days, including century rules (`2000`/`2400` valid,
  `2100` invalid);
- rejects future ledger and any present round/source/claim `checkedAt` value,
  including held-source records;
- rejects impossible or future round/claim `correctionDate` values;
- accepts valid review deadlines today or later and rejects impossible or
  expired `nextReviewBy` / admitted `reviewBy` values;
- derives the normal clock from `new Date().toISOString().slice(0,10)`, so the
  boundary is UTC rather than the visitor's local calendar day; and
- keeps the entire deck unavailable when any governed date fails.

Mortal Kombat and its corrected claims now record their actual correction date,
2026-07-25. The round remains `HOLD`. No fact, product copy, visual, focus,
learning interaction, status or major product-model decision changed.

## Deterministic evidence

The contract executes the runtime's actual `dateValue` and `checkedDate`
functions rather than duplicating their logic. It proves:

- valid dates: `2000-02-29`, `2024-02-29`, `2026-02-28`, `2400-02-29`,
  `2026-04-30`, `2026-12-31`;
- impossible values: `2026-02-29`, `2026-02-30`, `2026-02-31`,
  `2100-02-29`, month/day zero, month 13, day 32, April/November 31 and
  malformed widths;
- same-day evidence is allowed;
- next-day evidence checks are rejected; and
- a valid leap-day evidence check remains allowed.

```text
node scripts/test-dream-phone-contract.mjs
DREAM PHONE CONTRACT PASS
admitted_rounds=sky-dancers
held_rounds=12
status=PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL
```

## Rendered adversarial evidence

The existing headless-Chrome suite still passes and now additionally routes
impossible/future values into each governed ledger location:

- eight impossible ledger `checkedAt` variants;
- impossible policy `nextReviewBy`;
- impossible admitted-round `reviewBy`;
- impossible admitted-source `checkedAt`;
- impossible correction date;
- future ledger, admitted-source and held-source checks;
- future round and claim correction dates; and
- a valid `2024-02-29` ledger under the `Pacific/Kiritimati` browser timezone
  with verifier-controlled UTC day `2024-02-29`.

Every invalid/future fixture rendered `Deck unavailable` with verdict controls
disabled. The valid leap-day fixture loaded exactly `sky-dancers` and enabled
the verdict controls.

```text
PLAYWRIGHT_CORE_PATH=/tmp/laidies-high-pw.8bUJ9V/node_modules/playwright-core \
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
node scripts/test-dream-phone-browser.mjs
DREAM PHONE BROWSER PASS
journeys=new,returning,keyboard-focus,result-announcement,transfer-reflection,\
reduced-motion,zoom-mobile-desktop,storage-failure,adversarial-evidence,\
strict-calendar,future-date,utc-leap-day
```

## Scoped and global regression checks

```text
node scripts/check-inline-js.js
✓ INLINE JS: 353 scripts parse across 132 live pages.

node scripts/check-local-links.js
✓ LOCAL LINKS: 1941 local references resolve across 110 pages.

node scripts/check-town.js
✓ CHECK-TOWN: canon, titles, links, index, rewards, and quizzes all agree.

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
products=65
active=3/3

git diff --check -- [Dream Phone scoped files]
PASS
```

Whole-worktree `git diff --check` remains blocked only by the unrelated,
pre-existing trailing whitespace at `docs/growth/ali-idea-backlog.md:223`.
That file was not changed by this repair.

## Preserved holds

- Dream Phone remains an unapproved public experiment that must be hidden or
  accurately labelled.
- Ali's major product-model and final visual decisions remain unresolved.
- Eleven non-Mortal-Kombat rounds plus corrected Mortal Kombat remain `HOLD`.
- Native 200% zoom, Safari, VoiceOver, contrast, representative transfer,
  analytics/privacy, account/reward, exact release artifact and public-origin
  evidence remain open.
- This packet does not deploy, publish, promote, commit, push or mutate any
  external system.
