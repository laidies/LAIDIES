# Owner handoff — daily LAiDIES app experience

**Status:** ACCEPTED — MERGE / PARKED BEHIND SOURCE-PRODUCT TRIGGERS  
**Product/system ID:** `idea-inbox`  
**Owner task ID:** `019f9f81-5da6-73a3-a1aa-0272a93ec821`  
**Evidence time:** 2026-07-26 14:06:18 PDT (America/Vancouver)  
**Recipient:** Portfolio Control Room  
**Acceptance record:** D-2026-07-26-068 and
`operations/product-stewards/control-room/DECISION-daily-app-experience-route-2026-07-26.md`  
**Authority owners:** Control Room coordinates provisionally; Mme CLAi-O and
NewsStand retain source-product rules; Town Entry retains website entry;
Platform & Reliability retains installability, state, permissions, privacy and
delivery; Audience & Growth retains admitted packaging; Brand & Experience and
Ali retain public app identity

## Exact bounded action completed

Captured Ali's proposal for “an actual app experience” combining a daily Mme
CLAi-O reading with The Daily and The Breaking alerts, plus her explicit belief
that the app has other opportunities and advantages still to discover.
Reconciled it against the existing app strategy and current source-product
contracts. Prepared a cross-product daily-companion and advantage-audit route
without deciding PWA versus native, changing a reading/news rule, starting
implementation or changing portfolio priority.

## Observed result

- `docs/product/laidies-app-strategy.md` already recommends proving an
  app-like, save-to-home-screen website/PWA before a native app.
- That strategy names notification demand and repeated return behaviour as
  evidence that could later justify native-app overhead.
- Mme CLAi-O currently offers random, authored, non-tailored reflection with
  device-local history; it has no approved once-daily, personalized, predictive
  or account-synced mechanic.
- The Daily is an edited briefing that may have a clear day. The Breaking is a
  rarer qualifying interruption. Both are locally quiet and remain on
  publication/release hold.
- Product-specific external notifications are not currently wired as a proven
  shared service.
- The only active portfolio lane observed at capture time is Town Entry, and
  its action is read-only header/name inventory—not app implementation.

## Accepted ruling

Control Room accepted `MERGE / PARK`. The idea gives the existing app strategy
line a cross-product daily-companion opportunity without approving an app
surface. Preserve the three source jobs:

1. Mme CLAi-O supplies the optional delight/reflection ritual.
2. The Daily supplies the dependable briefing when there is meaningful news.
3. The Breaking supplies the rare timely interrupt.

No cross-product daily-companion/app-shell owner is created now. A permanent
owner may be considered only after the triggered audit proves a coherent,
durable product outcome that cannot remain inside existing source boundaries.
Source products retain their own canon, correction, safety and acceptance
authority.

The existing app strategy is prior input, not a current operating
specification. The future audit must allow `WEB`, `PWA`, `NATIVE LATER`,
`NO APP ADVANTAGE YET` or a bounded combination; no surface is the incumbent
winner by implication.

## App opportunity and advantage audit

The accepted owner must test more than the three opening examples. At minimum,
compare these hypotheses:

| Opportunity | Possible app advantage | Required boundary |
|---|---|---|
| Daily home/widget or glanceable surface | Mme CLAi-O reading and current briefing without navigating the town first | Do not imply prediction, personalization or guaranteed news |
| Notifications | Timely Daily/Breaking and chosen-return cues | Explicit opt-in, quiet states, frequency controls, opt-out, delivery truth and no filler |
| Saved continuity | Readings, articles, episodes, progress and bookmarks resume cleanly | Device-local versus account/cross-device truth; merge, revoke and delete |
| Offline/cached use | Read or listen during low connectivity | Freshness, expiry, correction/retraction and storage limits |
| Background audio | KSVL and episode listening continues naturally | One audio owner, system controls, accessibility, rights and battery/data behavior |
| Quick actions and deep links | Open today's reading, briefing or newest episode directly | Source admission and honest unavailable/quiet fallback |
| Native share/camera/postcard handoffs | Create or share a useful LAiDIES object with less friction | Permission minimization, rights, privacy and no contact-upload pressure |
| System accessibility/preferences | Better fit with text size, reduced motion, contrast and notification settings | Same complete outcome; no app-only exclusion |
| Personal “what's new” return state | A coherent return path across products | No sensitive profile, surveillance language, streak anxiety or invented account continuity |

These are investigation lanes, not approved features. The owner must also ask
what the app should deliberately **not** do and which benefits a good mobile
website already delivers without native-app maintenance.

## Evidence paths and tests

- `operations/product-stewards/idea-inbox/routing-receipts.md`
  (`IIR-20260726-002`)
- `operations/product-stewards/idea-inbox/backlog.md`
- `docs/product/laidies-app-strategy.md`
- `CURRENT-PRIORITIES.md`
- `operations/product-stewards/mme-claio/CHARTER.md`
- `operations/product-stewards/mme-claio/OPERATING-SPEC.md`
- `operations/product-stewards/mme-claio/state.json`
- `operations/product-stewards/mme-claio/backlog.md`
- `operations/product-stewards/newsstand/subproducts/daily.md`
- `operations/product-stewards/newsstand/subproducts/breaking.md`
- `operations/product-stewards/audience-growth/CHARTER.md`
- `operations/product-stewards/platform-reliability/OPERATING-SPEC.md`
- `operations/painpoints-log.md` (BTB-085)

Preflight:

```text
node scripts/check-product-stewards.mjs --owner-entry idea-inbox
PASS
node scripts/check-product-stewards.mjs --owner-entry mme-claio
PASS
node scripts/check-product-stewards.mjs --owner-entry newsstand
PASS
```

## Files, locks and dependencies

- **Files changed by Idea Inbox:** only
  `operations/product-stewards/idea-inbox/**`.
- **Lock held:** Idea Inbox dossier only.
- **Read-only dependencies consumed:** app strategy/current priorities, Mme
  CLAi-O, NewsStand Daily/Breaking, Town Entry, Platform, Audience & Growth,
  registry/run queue and BTB-085.
- **Downstream owners affected:** Control Room; Town Entry; Mme CLAi-O;
  NewsStand; Platform & Reliability; Post Office; Audience & Growth; Brand &
  Experience.
- **Collision boundary:** no edits to source products, app strategy, active
  Town Entry work, shared backlog, registry, run queue, ledger, services or
  public routes.

## Remaining acceptance proof

Before an app-shell build packet:

1. Mme CLAi-O decides whether “daily reading” means one featured card per local
   date, one notification opportunity, a return ritual with optional further
   draws or another bounded rule; it must remain non-predictive and safe.
2. NewsStand admits The Daily and The Breaking producer-to-reader,
   quiet-state, correction and retraction contracts.
3. Control Room coordinates the audit provisionally. Daily companion is not a
   Town Entry mode and has no permanent owner now.
4. Platform specifies installability, update/cache/offline behavior,
   permission timing, opt-in/opt-out/revocation, timezone/cadence, duplicate
   suppression, delivery receipts, privacy, accessibility and failure.
5. Audience & Growth defines notification value and pressure limits without
   turning clear days into filler.
6. Brand & Experience and Ali rule the exact app identity and daily-arrival
   feeling.
7. Complete the app opportunity/advantage matrix: user job, browser/PWA/native
   capability, evidence, permission/privacy cost, maintenance, accessibility,
   failure/exit behavior and smallest proof.
8. Compare the smallest installable PWA/app-like web proof against native app
   cost, maintenance, app-store, privacy and release obligations.

## Exact next trigger

Return only when all three are true:

1. Mme CLAi-O has an owner-approved, non-predictive daily-reading rule;
2. The Daily and The Breaking have admitted producer-to-reader, quiet-state,
   correction and retraction contracts; and
3. Platform can specify opt-in, revocable, privacy-safe installability and
   notification proof without inventing provider, account, permission or spend
   authority.

The first eligible cycle is an opportunity/advantage audit comparing mobile
web, installable PWA, native and no-app-yet—not a build. Do not create a push
feed from held or quiet NewsStand records.

## Authority truth

- **Public/publish:** not used; nothing published or alerted.
- **Deploy:** not used; no app/PWA/service worker or public route changed.
- **Spend/subscription/tool:** not used or authorized.
- **Private data/permissions:** not accessed or changed.
- **Ali authority:** no PWA/native, daily-reading, alert-frequency, identity or
  public-creative approval inferred. Future materially distinct trade-offs
  return to Ali only after the audit.
- **Implementation:** none. Status remains `CAPTURED`.
