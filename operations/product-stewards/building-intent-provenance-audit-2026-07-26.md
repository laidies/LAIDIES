# 17-building intent and provenance gate audit

**Status:** REPORT READY — mandatory gate not yet passed portfolio-wide  
**Date:** 2026-07-26  
**Scope:** the 17 registry items whose `kind` is `building`; no product code,
existing dossier, state, registry or launch class was changed by this audit.  
**Purpose:** establish whether an owner has recovered authoritative experience
intent before any building design direction can win.

## Governing rule and method

`EXPERIENCE-BRIEF.md` is the authority from which an operating specification
and build packets are derived. Each governing statement must carry a provenance
label, and only `ALI CONFIRMED`, `LOCKED LEDGER`, or
`APPROVED BRIEF/ARTIFACT` may govern canon. Current pages/code are observation
evidence only. See [EXPERIENCE-BRIEF-TEMPLATE.md](EXPERIENCE-BRIEF-TEMPLATE.md#L1-L68)
and [CHAMPION-CONTRACT.md](CHAMPION-CONTRACT.md#L8-L17).

I inspected the registry, each building dossier and the existing experience
briefs. A detailed `CHARTER.md` or `OPERATING-SPEC.md` without this
line-by-line provenance is **candidate material**, not recovered intent. This
is deliberately stricter than an implementation audit: the active-work record
also says a public route is only observation evidence, not whole-site proof
([ACTIVE-WORK.md](../ACTIVE-WORK.md#L73-L86)).

### Result at a glance

- **1/17 — intent recovered, conditionally usable:** LIBRAiRY. Its brief is
  provenance-labelled, but structure selection and the Brand/Platform reviews
  remain open.
- **0/17 — fully approved for a visual direction to win today.** The recovered
  Library brief itself says its owner decision and both director reviews are
  pending.
- **16/17 — required experience brief missing.** Each has useful charter/spec
  material, but it is unlabelled and therefore is mostly documented,
  inferred, and/or implementation-observed until reconciled. Design work may
  inspect these records and produce non-canonical discovery evidence; it may
  not let them select canon.

This is a provenance finding, not a claim that the 16 buildings have no
promise. The registry already assigns every one a champion, route(s) and
launch status ([registry.json](registry.json#L29-L56)); it does **not** make
their existing prose authoritative experience intent.

## Exact 17-building inventory and gate verdict

| # | Building / owner folder | Routes in registry | Gate verdict | Evidence and immediate reconciliation focus |
| --- | --- | --- | --- | --- |
| 1 | Welcome Wagon Visitor's Centre / `visitors-centre` | `/visitors-centre.html` | **MISSING BRIEF — candidate intent documented, provenance unqualified** | Its spec has a coherent front-desk/map/directory model and explicit non-goals, but no labelled experience brief ([OPERATING-SPEC.md](visitors-centre/OPERATING-SPEC.md#L7-L26)). Recover the arrival promise, directory/room object map, destination-admission rule and optional tour/postcard handoffs. |
| 2 | NewsStand / `newsstand` | `/newsstand.html` | **MISSING BRIEF — candidate intent documented, provenance unqualified** | Charter/spec and publication subproducts are substantial, but none is the provenance gate. Recover the four-publication promise, Paige/rack/reader/archive tree, clear-day ritual and editorial-owner handoffs before stand architecture. |
| 3 | Chick Flicks / `chick-flicks` | `/chick-flicks.html`, `/episodes.html` | **MISSING BRIEF — mostly documented/implementation evidence** | Recover theatre/cinema purpose, catalogue versus Screening Room responsibility, complete episode/media tree, and what remains hidden when media is held. Do not let the existing episode routes decide the building’s experience. |
| 4 | Blend & Snap / `blend-snap` | `/blend-snap.html` | **MISSING BRIEF — candidate intent documented, provenance unqualified** | The café/ORDER model is clearly specified but unlabelled ([OPERATING-SPEC.md](blend-snap/OPERATING-SPEC.md#L5-L38)). Before its active structure competition, reconcile JoJo/counter/menu/receipt actions, weekly inventory authority, and Study Pack/Try-On/Cards capability claims. |
| 5 | Mme CLAi-O's Shop / `mme-claio` | `/games/madame-claio.html` | **MISSING BRIEF — candidate intent documented, provenance unqualified** | Recover the reading-room ritual, entertainment/safety boundary, deck/reading history and result/return path; distinguish it from a prediction or advice service. |
| 6 | MAiKEOVER on MAiN / `maikeover` | `/maikeover.html` | **MISSING BRIEF — candidate intent documented plus implementation observations** | An old design brief specifies a vanity-as-interface and account handoff ([building-design-briefs/maikeover.md](../building-design-briefs/maikeover.md#L14-L29)), but it is not provenance-labelled and cannot self-approve intent. Reconcile makeover/member ritual, Resident Card/Closet ownership, visibility, identity and cross-device promise. |
| 7 | BRONZE AiGE / `bronze-aige` | `/bronze-aige.html` | **MISSING BRIEF — candidate intent documented, provenance unqualified** | Charter presents a grown-up social-practice bar and non-service boundary ([CHARTER.md](bronze-aige/CHARTER.md#L9-L29)). Recover alcohol/spirit-free policy, object map, invite/coaster completion truth, music/episode relationship and rewards boundary. |
| 8 | Dream Phone Booth / `dream-phone` | `/games/dream-phone.html` | **MISSING / OWNER DECISION REQUIRED** | Three incompatible product models coexist; the charter explicitly prohibits the champion from choosing one ([CHARTER.md](dream-phone/CHARTER.md#L40-L63)). No design competition may admit a building structure until Ali selects the launch product model or confirms hide/label. |
| 9 | The Mall / `mall` | `/mall.html`, `/shop.html` | **MISSING / OWNER AND SUBPRODUCT RECONCILIATION REQUIRED** | The concourse promise and ten shop handoffs are candidate intent, while full route/content/readiness is explicitly still open ([CHARTER.md](mall/CHARTER.md#L7-L25)). Recover the Mall-only journey first; then reconcile each shop before it may be represented as open/real/commerce-capable. |
| 10 | KSVL Community RAiDIO / `ksvl` | `/radio.html`, `/ksvl-popup.html` | **MISSING BRIEF — candidate intent documented, provenance unqualified** | Recover station/booth ritual, programme/catal­ogue/requests tree, track rights and listening result, autoplay/noise boundary, and current-versus-archive return behaviour. |
| 11 | SUNNYVAiLE Post Office / `post-office` | `/post-office.html` | **MISSING BRIEF — candidate intent documented, provider-state observed** | Recover Penny/counter ritual and separately reconcile newsletter delivery, magic-link sign-in and postcard/referral lifecycle. A UI handoff is not delivery, account creation, recipient open, join or referral credit. |
| 12 | Town Hall / `town-hall` | `/town-hall.html` | **MISSING BRIEF — candidate intent documented, service state observed** | Recover civic room/Mayor Deb relationship, Regulars, feedback stations, moderation/response promise and a truthful submission outcome. |
| 13 | SUNNYVAiLE High / `sunnyvaile-high` | `/sunnyvaile-high.html` | **MISSING BRIEF — candidate intent documented, learning/product evidence incomplete** | Recover school/classroom role relative to Library/Episodes, class/quiz/Book Fair tree, teaching and mastery boundaries, rewards and resume paths. |
| 14 | FAiRY Godmother's House / `fairy-godmother` | `/games/fairy-godmother.html` | **MISSING BRIEF — candidate intent documented, safety/service evidence incomplete** | Recover the parlour’s trustworthy advice promise, input/result/retry/escalation ritual, retrieval/identity/FAiRY Plays boundaries, and answer-quality/safety contract before a house direction wins. |
| 15 | Delta LAi Nu Sorority House / `sorority-house` | `/sorority-house.html`, `/community.html` | **MISSING BRIEF — candidate intent documented, provider/moderation state observed** | Recover room/community/Girl Talk tree, invitation and belonging ritual, moderation/abuse boundaries, post/publish/reward truth and returning-member state. |
| 16 | The LUMINAiRY / `luminairy` | `/luminairy.html` | **MISSING BRIEF — candidate intent documented, editorial claims/implementation evidence** | Recover exhibition/three-wing ritual, each object/person/story’s admission and correction boundary, KSVL/Town Hall handbacks, rights and source/freshness visibility. |
| 17 | SUNNYVAiLE LIBRAiRY / `library` | `/library.html` | **INTENT RECOVERED — NOT YET APPROVED FOR A STRUCTURE WIN** | The only provenance-labelled brief. It recovers promise, visitor jobs, ritual, component map, journeys and platform limits ([EXPERIENCE-BRIEF.md](library/EXPERIENCE-BRIEF.md#L8-L163)). But its title records pending Brand and Platform review ([lines 1–6](library/EXPERIENCE-BRIEF.md#L1-L6)); A/B/C structure is explicitly `UNKNOWN` ([lines 156–163](library/EXPERIENCE-BRIEF.md#L156-L163)). |

## What the evidence can and cannot establish

Existing operating specs are valuable for tracing outcomes, state and failure
behaviour. For example, the Visitor’s Centre names an authoritative completion
event and correctly distinguishes it from postcard/tour/account outcomes
([OPERATING-SPEC.md](visitors-centre/OPERATING-SPEC.md#L28-L38)); Blend & Snap
distinguishes its café coordination job from account/reward authority
([OPERATING-SPEC.md](blend-snap/OPERATING-SPEC.md#L10-L25)). Neither record
labels the governing product/experience statements by source, so neither may
settle intent under the new rule.

The Library demonstrates the correct distinction. Its brief labels a route as
`CURRENT IMPLEMENTATION OBSERVED` ([EXPERIENCE-BRIEF.md](library/EXPERIENCE-BRIEF.md#L40-L49)), preserves an explicit `INFERENCE` for the filter rail
([lines 51–64](library/EXPERIENCE-BRIEF.md#L51-L64)), and keeps the structure
choice `UNKNOWN`. This is the standard every backfill must meet.

## Contradictions requiring reconciliation (not silent selection)

1. **Design lanes started before the new gate exists for two of the three
   lanes.** The run queue has Library, Visitor’s Centre and Blend & Snap marked
   `RUNNING` ([run-queue.json](run-queue.json#L1-L27)). Library has an intent
   brief; Visitor’s Centre and Blend & Snap do not. Their current work can
   continue only as read-only recovery, evidence collection or isolated
   non-canonical candidate work. Neither structure may win or integrate until
   a reconciled brief is reviewed.

2. **Old “Library as the sole model” wording conflicts with the current
   separation of competitions.** An earlier MAiKEOVER design brief says
   “SOLE MODEL = the LIBRAiRY” ([building-design-briefs/maikeover.md](../building-design-briefs/maikeover.md#L1-L4)). The active record instead calls
   Library a principle, not a template to clone ([ACTIVE-WORK.md](../ACTIVE-WORK.md#L53-L59)); the sitewide championship further separates the fixed-geometry
   brand comparison from Library structure. Treat the former as superseded
   implementation-era guidance, not governing intent.

3. **The Library’s prior visual lock is historical evidence, not a current
   structure ruling.** The superseded Cycle 1 calls a straight-on three-bay
   room “locked” ([building-experience-championship-cycle-1-2026-07-26.md](library/building-experience-championship-cycle-1-2026-07-26.md#L3-L20)), while the later brief requires A/B/C-or-none owner selection. Preserve the
   former as an approved-artifact candidate; do not use it to shortcut the
   current structure competition.

4. **Operating-spec detail is being mistaken for authoritative intent.** The
   contract says the brief precedes operating specification/build packets
   ([CHAMPION-CONTRACT.md](CHAMPION-CONTRACT.md#L8-L17)), whereas the portfolio
   still has sixteen building specs with no experience brief. Each spec remains
   useful implementation evidence, but must be traced back to approved source
   or relabelled `INFERENCE`/`UNKNOWN` during backfill.

5. **“Three active lanes” is a release-coordination limit, not a ban on
   independent intent recovery or platform tracing.** The legacy queue has
   `concurrency_limit: 3`; it should not prevent read-only audits and
   isolated, non-conflicting implementation. Shared identity, economy,
   moderation, analytics and release changes must queue behind their permanent
   platform owner and integration gate, not be rebuilt per building.

## Smallest bounded Ali decisions needed today

All other source recovery can begin from the hierarchy without asking Ali to
recreate every building from memory. These are the irreducible decisions:

1. **Dream Phone launch identity:** choose one: (a) evidence-literacy practice
   game, (b) scripted “Just Call” reflection toy, or (c) hide/label both for
   launch. Its records explicitly contain all three competing models, so no
   owner may choose implicitly.
2. **Mall launch promise:** choose one: (a) cultural-reference discovery
   concourse only, with every unverified shop visibly held, or (b) defer the
   Mall from launch promotion until each shop has a reconciled brief. No
   commerce/affiliate promise may be inferred from storefronts.
3. **Library structure decision timing:** confirm that the separate
   capability-preserving A/B/C Library competition will provide the decision
   after Brand and Platform review, rather than treating the old three-bay
   candidate as already chosen. This does not decide the sitewide visual
   system, which is a separate competition.

## Recommended experience-brief backfill order

This order is for **intent recovery**, not a hidden three-lane implementation
queue. Each owner can gather source and produce a brief in parallel when their
file/service boundary is disjoint. Brand approves system fit; Functionality &
Platform validates contracts; affected subproduct owners sign their declared
capabilities; Portfolio Control Room resolves collisions.

1. **Complete the existing Library brief’s reviews**, then backfill
   **Visitor’s Centre** and **Blend & Snap** before either active design lane
   selects a structure.
2. **FAiRY Godmother, Post Office, Sorority House, Town Hall, MAiKEOVER** —
   shared identity, safety, delivery, moderation, referral and economy claims
   have the highest public harm and platform leverage.
3. **SUNNYVAiLE High, Chick Flicks, NewsStand, Mme CLAi-O, Dream Phone** —
   recover the learning/media/editorial/product model before room design or
   promotion. Dream Phone pauses at Ali decision 1.
4. **Mall, BRONZE AiGE, KSVL, LUMINAiRY** — reconcile the Mall’s shop tree;
   alcohol/spirit-free treatment; audio/rights and request boundaries; and
   exhibition/editorial admission respectively. Mall pauses at Ali decision 2
   for commerce scope.

### Per-brief acceptance gate

For each backfill, the building owner must supply every template section:
stable outcome; complete tree; object-to-action map; current/admitted/held
inventory; primary/explore/return/failure journeys; handbacks; platform
contracts; brand freedoms; responsive/accessibility/media requirements;
newcomer and returner acceptance scenes; non-goals and owner decisions. Every
governing line must have the required provenance label. The operating spec can
then be reconciled from the approved brief—not used to invent it.

The final reviewer record must explicitly contain:

- Building Owner — authored/reconciled;
- Brand & Experience Director — system fit and allowed variation approved;
- Functionality & Platform Director — platform feasibility/contracts accepted
  or gaps named;
- affected subproduct owners — capabilities confirmed; and
- Portfolio Control Room — dependencies, locks and integration gate resolved.

## Validation

`node scripts/check-product-stewards.mjs` passed on 2026-07-26:
`products=64`, `buildings=17`, `active=3/3`, with status distribution
`REPORT_READY=32`, `QUEUED=28`, `RUNNING_WITH_PARENT=4`. This validates the
registry/dossier system, not intent recovery, design approval, real service
operation or launch readiness.

## Enforcement extension — owner-entry preflight

**Status:** BUILT AND VERIFIED LOCALLY, 2026-07-26

The earlier validator accepted a non-empty dossier/state path string without
checking whether the named file existed. The registry could therefore appear
healthy while a newly opened owner task had no durable entry point.

`scripts/check-product-stewards.mjs` now reports portfolio owner-entry readiness
and supports:

```sh
node scripts/check-product-stewards.mjs --owner-entry <product-id>
node scripts/check-product-stewards.mjs --strict-owner-entry
```

The first command fails closed for the named owner's missing entry records. The
second exposes the complete remediation gate. The normal portfolio check still
reports the debt without freezing unrelated work.

Current exact inventory:

- **19/64 owner entries ready under the expanded mechanical gate;**
- **16/17 building experience briefs missing;**
- **16/17 building functionality maps missing;**
- **27 registered subproduct/function dossier files missing;**
- **7 registered subproduct state files missing;** and
- **1 top-level operating specification missing** (`platform-reliability`).

Missing subproduct dossiers are concentrated in:

- Blend & Snap: Study Pack, Try-On and Trading Cards;
- Mme CLAi-O: reading;
- MAiKEOVER: Closet/progression;
- BRONZE AiGE: Cocktail Fortune and Businesswomen's Special;
- Dream Phone: game;
- Mall: all ten registered shop owners;
- KSVL: DJ Booth and catalogue;
- Post Office: newsletter delivery and sign-in;
- Town Hall: feedback;
- SUNNYVAiLE High: Pop Quiz and Book Fair; and
- LUMINAiRY: people/editorial.

Classes now has a real dossier and passes its targeted preflight. Do not make
the other gaps appear resolved by creating content-free “owner” files. Each
backfill must recover the product's job, boundaries, authoritative inputs,
dependencies, current state, triggers and admission evidence under
`OWNER-ENTRY-CONTRACT.md`.

The expanded gate also requires a building `FUNCTIONALITY-MAP.md`. MAiKEOVER
now has the first cross-page reference map because the Closet consumes state
from identity, Library, High, weekly tours, Book Fair, Post Office referrals,
FAiRY Plays, LUMINAiRY and other producers. The map distinguishes locally
verified same-device behavior from the still-missing identity, reward,
delivery, referral, allowance and cross-device contracts. An experience brief
defines what should happen; the functionality map proves every frontend,
backend, store/service and consumer touchpoint required to make it happen.
