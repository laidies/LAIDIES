# Control Room dashboard contract

**Status:** ACTIVE — internal operating surface; never part of the public site

The dashboard at `dashboard.html` is Ali's single inspectable view of the
portfolio. It is generated from `dashboard-state.json` by:

```sh
node scripts/build-control-room-dashboard.mjs
```

`review-inbox.html` is the human review surface linked from the dashboard. It
must contain every exact current artifact that genuinely needs Ali's eyes or
ears, with a direct playable/viewable artifact, the remaining decision, current
checksum identity, supporting evidence, truthful public state and a saved
PASS/HOLD receipt. A Markdown packet or internal HOLD row does not satisfy this
requirement. Superseded artifacts must be removed from the inbox in the same
cycle that a successor becomes the review source of truth.

## Portfolio idea and build inventory

`PORTFOLIO-WORK-INVENTORY.md` is the human portfolio view and
`portfolio-work-inventory.json` is its curated machine source. The complete
loss-prevention census is `portfolio-source-census.json`; it preserves the raw
idea/backlog wording and source line rather than pretending the curated list is
the whole record.

After any material idea, recommendation, routing or prioritisation change, run:

```sh
node scripts/build-portfolio-work-inventory.mjs --write
```

The ordinary product-steward validation also runs the portfolio validator. It
must fail when an Ali idea-log family or July idea cluster loses its inventory
mapping, when an owner is unknown, or when a cited source disappears. The
dashboard may group or filter this inventory, but it may not hide `LATER`,
`BLOCKED` or `HOLD` work, confuse a captured idea with a build, or promote a
recommendation without an accountable owner and exact next action.

## Update authority

The Control Room owns `dashboard-state.json`. Every scheduled audit must:

1. inspect the real pinned-task state and evidence timestamp;
2. reconcile task claims against the repository, tests, locks and public truth;
3. update every changed owner row;
4. update approvals, critical path, schedule and decision entries when their
   evidence changes;
5. preserve explicit `IDLE / QUEUED`, `BLOCKED`, `ACTIVE NOW`,
   `ACCEPTANCE REVIEW` and `COMPLETE` distinctions;
6. run the dashboard builder; and
7. open or mechanically validate the generated dashboard before reporting the
   audit receipt.

The dashboard is never allowed to look current merely because it can still be
opened. `generatedAt`, `evidenceCutoff` and `nextAudit` must be exact ISO
timestamps. The normal twice-daily runtime allows at most 18 hours of evidence
age. `scripts/control-room-freshness.mjs` checks both the dashboard and the
actual Codex automation; the rendered dashboard shows a prominent stale banner
when the embedded evidence exceeds that boundary or the next audit is invalid
or overdue.

The dashboard top line must always separate three non-interchangeable
categories:

1. `VISIBLE / WORKING OUTCOMES`: integrated visitor-usable results or a
   genuinely decision-ready artifact. Only this category counts as executive
   progress.
2. `BACKSTAGE ENABLERS`: contracts, locks, packets, local acceptance, tests and
   infrastructure work. These may be necessary but cannot inflate launch
   progress.
3. `FAILED / REJECTED WORK`: rejected, stale or held candidates, retained so
   they cannot be silently revived or reported as progress.

Every material row in those categories must answer what Ali or a visitor can
see or use now, which exact blocker changed and what the next tangible artifact
is. A document, hash, task heartbeat or populated dashboard is not itself an
executive outcome.

Audience & Growth owns
`../audience-growth/measurement-state.json`. The dashboard builder composes
that file into the Audience & Growth view. Every audience evidence cycle must:

1. pull only authorized, aggregate, privacy-safe source data;
2. show the selected period, source timestamp and metric definition;
3. report visitors, new visitors, verified new Resident Cards, returning
   behaviour, most visited pages and lowest-attention pages when supported;
4. distinguish missing access or missing instrumentation from a measured zero;
5. avoid calling a page unpopular until its exposure opportunity is known;
6. reconcile daily social planned, ready and published counts separately; and
7. rank evidence-backed engagement/new-user opportunities with owner, exact
   next action, measure and Ali decision.

Platform Reliability owns
`../platform-reliability/external-services-state.json`. The dashboard builder
composes it into the External Services view. The inventory must:

1. keep `configured`, `used`, `paid` and `worthwhile` as separate evidence
   claims;
2. never infer a current plan, charge, renewal or cancellation from repository
   code, an old export, a login screen or remembered use;
3. state the exact operation each service supports, its present value, owner,
   dependency risk and next verification action;
4. show unused, duplicated and proposed services, not only favourites;
5. bind every new-subscription recommendation to an official current source,
   build-versus-buy comparison, smallest reversible proof, value gate, data
   flow, exit path, price recheck date and required Ali approval;
6. reconcile account/invoice evidence monthly and 30 days before a known
   renewal; and
7. prohibit trial creation, account connection, purchase, upgrade, downgrade
   or cancellation unless Ali has approved that exact external change.

When billing evidence is unavailable, the dashboard must say `UNKNOWN —
ACCOUNT EVIDENCE REQUIRED`; it may not display zero cost. The initial inventory
is repository-discovered and is not complete until billing email, App Store,
card and vendor-account records have been reconciled.

The External Services view must also maintain one decision-useful monthly cost
ledger. It must:

1. show a working CAD monthly run rate and separately show how much is supported
   by invoice/account evidence;
2. label user-declared or official-price estimates rather than presenting them
   as actual charges;
3. normalize annual renewals by dividing by 12 while preserving the real annual
   cash event;
4. use the current recurring full-period price, not a trial discount, prorated
   first invoice or superseded plan;
5. exclude failed payments, refunds and one-off/superseded charges from the
   recurring run rate while retaining them as explanatory rows;
6. state the exchange-rate source/date and keep tax, card FX fees and usage
   overages explicit; and
7. count missing App Store, other-mailbox and vendor-account evidence as unknown
   cost, never zero.

An owner row must state:

- literal work now;
- visible deliverable;
- exact blocker;
- exact unblock;
- latest evidence time;
- next scheduled run; and
- next Ali decision, or `None`.

## Action-centre contract

Every summary count must have a one-to-one drill-down. The dashboard may not
show a number such as `blocked` or `queued` and require Ali to infer which
owners it represents.

The Action Centre must separate:

1. **Ali actions ready now** — evidence-ready choices with a recommendation,
   scope boundary and explicit options;
2. **blocked work** — the exact blocker, unblock owner, next check and whether
   Ali has any part;
3. **queued by plan** — intentionally sequenced work with a named start
   trigger; and
4. **other waiting/review states** — dependency waits, trigger-based owners,
   judge holds and acceptance reviews.

The decision surface is generated from `decision-packets.json`. It must present
one `NOW` packet at a time and may show later ready packets only as a queue.
Every `READY` packet must contain:

- one plain-language question;
- one explicit recommendation and the evidence-based reasons for it;
- materially distinct options with consequences and trade-offs;
- representative desktop/mobile or state-specific visual evidence;
- the exact scope the decision approves and does not approve;
- independent scores/tests and unresolved risks;
- the consequence of waiting;
- what happens after each ruling; and
- an exact bounded decision receipt.

The CEO must not have to open an agent report to understand the choice.
Evidence links are supporting detail, not a substitute for a complete decision
packet. Visual or experience decisions without representative visible evidence
are `NOT READY`.

For a building, representative evidence means the actual proposed experience,
not a neutral wireframe or functional skeleton waiting for a later styling
pass. Intended building experience, LAiDIES/SUNNYVAiLE brand-world recognition,
truthful end-to-end functionality, responsive/accessibility and
technical/release integrity are separate non-compensable floors. A PASS on one
floor cannot raise a failed or missing floor.

Functional-only evidence may characterize plumbing, but it is never `READY`,
integration-ready, a Brand PASS or a building-experience approval. Before Ali
sees a building decision, the packet must include representative
final-direction desktop and mobile visuals plus an explicit Brand & Experience
judgment against the colour, energy and world-continuity target. A rejected
functional model cannot be revived by reskinning it.

`DECISION READY` is not the same as `BLOCKED`. `QUEUED` is not a synonym for
all non-active work. A lane described as intentionally queued must still name
the event or scheduled wave that starts it; otherwise it is unowned delay.

The generated dashboard is a local static decision surface. It may help Ali
inspect and copy a prepared instruction, but it must not render an approval
control that implies an agent, provider or external system was changed unless
that routing backend exists and returns a receipt.

The review inbox may save a human ruling in local browser state so a refresh
does not erase work, but must explicitly state that this is not deployment or
public verification. Control Room must convert the ruling into a durable
checksum-bound receipt before release work consumes it.

## How an Ali decision is surfaced and resolved

Ali must not have to monitor owner backlogs, search repository files or infer
that a blocked lane needs her. The following routing contract is mandatory:

1. ordinary blockers remain with the named execution owner and explicitly say
   `requiresAli: false`;
2. a blocker may say `requiresAli: true` only when safe owner work is exhausted
   and a complete `READY` decision packet exists;
3. the daily Control Room review sends one concise notification in the active
   Codex task when a new packet becomes `READY`;
4. the notification links directly to the Action Centre or exact Review Inbox
   artifact and states the recommendation, options, consequences and response;
5. the Action Centre presents at most one decision now and provides an exact
   bounded response that Ali can copy and send without rewriting it;
6. an unresolved decision remains visible and is rechecked daily; it cannot be
   cleared by silence, an agent report or an expired heartbeat;
7. after Ali responds, Control Room writes a durable decision receipt, wakes
   the named execution owner and reports what moved, what remains held and the
   next evidence Ali will see; and
8. a broken preview, missing evidence, superseding artifact or overdue review
   demotes the packet to `NOT READY` and returns it to the owner instead of
   asking Ali to resolve an incomplete choice.

`scripts/check-ali-decision-routing.mjs` enforces the connection between owner
blockers and decision packets. A recommendation that exists only in prose is
not routed work and fails the operating contract.

The dashboard may not infer activity from a pinned task, plan, packet, file or
old queue row. It never reports a local artifact as deployed or public.

The Control Room also enforces
`../PROACTIVE-IMPROVEMENT-CONTRACT.md`. Every owner must contribute an
evidence-backed opportunity, close an existing opportunity with evidence, or
state `NO MATERIAL OPPORTUNITY`; the dashboard is the single ranked
presentation surface.

## Visual-production portfolio

The dashboard must expose `visualProductionLock` and literal
`visualProduction` rows. A generic owner status or “visual work in progress”
does not satisfy this surface.

Required rows are page/building inventory and design-system dependency;
postcards; Resident Card backgrounds; Closet rooms/items/rewards; episode
trading-card decks; the full character deck; Episodes 1, 2, 3, 4 and Trailer
as separate media rows; and the LAiDIES motion ident with separate website and
episode integration truth. The complete Study Pack system must also appear as
literal component rows rather than one Blend & Snap aggregate: Study Sheets;
Try-Ons; Cheat Sheets/printables; concept/character cards; Quiz handoff; café
menu/receipt; and the future weekly producer/receiver template. Each component
shows Episodes 01–04 truth and its next weekly trigger.

Every row requires accountable owner/task, D-057 activity state, exact
artifact/deliverable, blocker, exact unblock, next run/trigger and Ali decision.
An existing asset, packet or registration cannot imply active production.

Until Ali selects the sitewide visual direction, all site/product visual
categories are inventory/specification only. The only allowed new visual
generation is the bounded Brand comparison needed for that decision and an
already-running episode repair that cannot establish website style. Study Pack
content, inventory, source admission, geometry and handoff contracts may move
before the Brand ruling, but final art production/selection cannot. After the
ruling, the sequence is existing-asset audit → `KEEP / ADAPT / REJECT` → make
missing assets → integrate and test. A neutral or white-box candidate cannot
advance because it passes local functionality checks.

## Sequenced execution obligations

`executionObligations` is the literal build queue for admitted work that does
not require Ali. Every row names the accountable owner, exact current work,
blocker, exact unblock, next run/trigger and `Ali decision`. A locally passing
packet cannot remain idle when a safe successor lock is available. Distinct
shared locks must close and hand back checksum-bound evidence one at a time;
they may not be silently combined.

## Publication boundary

This dashboard contains internal task IDs, operational blockers and unreleased
product state. It is excluded from the public artifact and must not be deployed
or linked from the public LAiDIES site.
