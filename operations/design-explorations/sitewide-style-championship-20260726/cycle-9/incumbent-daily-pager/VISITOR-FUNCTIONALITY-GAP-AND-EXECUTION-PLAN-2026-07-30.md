# Visitor functionality gap and execution plan

**Status:** SUPERSEDED — DO NOT EXECUTE  
**Evidence date:** 2026-07-30  
**Scope:** Homepage visitor promises and their account, persistence, discovery,
learning, community, messaging, rewards and release dependencies  
**Public authority:** None. This plan does not deploy, publish or admit the
Cycle 9 Homepage candidate.

> **Correction recorded 2026-07-30:** This plan was produced from the stale
> `homepage-redesign` worktree and stale Control Room/product-state records.
> It failed to reconcile the separate, pushed and publicly deployed
> `resident-continuation-20260729` branch. Identity, account-backed
> continuation, private Card/Closet restoration, authoritative Trading Card
> gifting and direct/group Resident Chat were already deployed and publicly
> verified. Do not execute the duplicate identity, gifting or chat builds
> below. The corrected current-state assessment and remaining work are in
> `VISITOR-FUNCTIONALITY-RECONCILIATION-2026-07-30.md`.

## Outcome

The main gap is not a lack of ideas or even a total lack of backend work. It is
the absence of a verified end-to-end path between several existing pieces.
Database migrations, local interfaces and visitor-facing copy have sometimes
been treated as though they formed an operational feature. They do not.

The completion unit is the whole visitor promise:

> visible entry point → correct identity state → working action → authoritative
> storage/service → every consuming page → failure/retry behavior → second
> browser/device restoration → independent staging proof → released public
> proof

Nothing should be presented as available merely because a table, button,
prototype or destination page exists.

## Current capability truth

| Capability | Current state | What genuinely exists | Gap before it is visitor-ready |
| --- | --- | --- | --- |
| Town directory and building navigation | **OPERATIONAL SOURCE / RETEST ON INTEGRATION** | Homepage town section, named district/building routes and shared directory data exist. | Consolidate the repeated Homepage explanations; verify every final link, mobile directory behavior and return route after the IA change. |
| Latest released episode link | **BUILT / RELEASE-TRUTH DEPENDENT** | The frontend can resolve the current episode dynamically. Episode 04 is publicly verified. | Bind the control to the release ledger, not a hard-coded number. Clearly distinguish readable issue pages from released films. Trailer and Episodes 01–03 films remain HOLD. |
| Adaptive account label | **FRONTEND BUILT / IDENTITY UNPROVEN** | The global navigation code supports `Sign in` when signed out and `My Closet` or resident identity when signed in. | Prove the real Supabase session, expiry, sign-out, refresh and cross-device restoration in an authorized staging project before relying on this behavior publicly. |
| Resident Card and cross-device Closet | **BUILT IN PART / EXTERNAL STAGING BLOCKER** | Supabase auth/profile/reward migrations, a magic-link client and local sync adapters exist. Same-device behavior has bounded evidence. | Apply and verify the exact migrations in staging; pass two-account/three-browser-or-device tests; prove RLS, restoration, conflict handling and every producer-to-Closet round trip. Remove “mostly local” behavior only after proof. |
| Resident Card plus Wednesday Postcard | **PRODUCT RULE SET / END-TO-END UNPROVEN** | The intended rule is one signup with the Postcard selected by default and a clear opt-out; separate Postcard signup remains possible. | Wire the form, Supabase identity/profile state and email provider as one idempotent transaction. Prove opt-out, no duplicate contact, confirmation, unsubscribe and second-device state. |
| “What’s new since your last visit” | **NOT BUILT** | A discovery contract and old visual concepts exist. No released visitor implementation exists. | Build a released-content ledger, first-visit fallback, device-local visit cursor, signed-in account cursor, prioritization/cap rules, read/dismiss state and stale/held suppression. |
| Daily Buzz / daily newspaper | **LOCAL HOMEPAGE PROTOTYPE** | Cycle 9 contains the side-column design and current-information concepts. | Feed it only exact published NewsStand/current-content records; implement freshness, empty/stale states, source links, mobile placement and public verification. Do not use held stories as daily news. |
| Resident mail and gifts | **BACKEND SCHEMA BUILT / NO VISITOR UI** | `resident_mail`, RLS, blocking support, `send_resident_mail()` and `my_resident_mail()` exist in local migrations. Supported item shapes anticipate trading cards, hall passes, charms and FAiRY Plays. | Confirm migration state; build inbox, unread badge, sender/recipient lookup, compose, send, read, archive/delete, block/report and gift-redeem interfaces. Define the inventory/economy rule before transferring or copying any collectible. |
| Trading-card rewards | **PARTLY BUILT / ROUND TRIP UNPROVEN** | Card definitions, server-side pack-opening work and local reward-event synchronization exist. | Prove server-authoritative ownership, idempotent pack opening, Closet delivery, duplicate policy, gifting semantics, revoke/refund behavior and cross-device restoration. |
| Direct messages | **NOT BUILT** | No operational direct-message interface or conversation service was found. Resident mail is asynchronous Post Office mail, not chat. | Design and build conversations, membership, messages, unread state, presence policy, history, block/report, moderation, rate limits, retention and privacy controls. |
| Group/ICQ-style chat | **PROTOTYPE ONLY** | Community pages and a device-local preview board exist. The code explicitly says the public-room version awaits approval and moderation. No conversation/realtime schema was found. | Build the real-time service and room/member model; add moderation and safety; prove reconnect, ordering, duplicate prevention, accessibility, mobile behavior and multi-account privacy. |
| User-visible message centre | **NOT BUILT** | No global unread indicator or unified message destination exists. | After mail and chat contracts are settled, add one visible account-aware inbox entry in the global header/Closet, with truthful unread counts and separate Mail versus Live Chat views. |
| Classes | **CONTENT PIPELINE, NOT A LIVE COURSE PRODUCT** | SUNNYVAiLE High has 37 class records: 1 scripted, 12 proposed, 8 researched/verify-before-filming and 16 not scheduled. None has a video and none is live. | Complete one representative class end to end: real-app verification, lesson asset, exercise, accessibility, progress storage, completion receipt, related Library/News links, mobile QA and public release. Do not promote “Take a class” as available until at least one admitted class exists. |
| Support for different AI experience levels | **CURRICULUM DIRECTION / NOT BUILT** | Learning-system work recommends pathways and commitment-sized routes rather than simplistic beginner/advanced shelves. | Add an optional starting-point check and routes such as quick practical help, guided lesson and deeper project. Each item needs prerequisites, difficulty/commitment metadata and a useful advanced outcome—not merely harder vocabulary. |

## The actual dependency order

### Phase 0 — Lock the visitor promise and Homepage information architecture

**Owners:** Homepage/Town Entry, Functionality & Platform, Brand  
**Purpose:** Stop the interface from promising unfinished functionality while
the underlying work proceeds.

1. Preserve Daily Buzz as the right-side current-information column.
2. Use four clear masthead destinations:
   - What’s happening in town
   - Go directly to an activity
   - Learn how LAiDIES works
   - Move to SUNNYVAiLE
3. Keep `Sign in` / `My Closet` highly visible and separate from `Join the
   town`.
4. Organize the body into:
   - What’s happening around town
   - Activities & destinations
   - How LAiDIES works & why it matters
   - Move to SUNNYVAiLE
5. Consolidate repeated LUMINAiRY, orientation and town-map explanations.
6. For every control, maintain a promise map with:
   visitor wording, destination, identity requirement, operational state,
   owner, and test receipt.
7. Omit an unavailable action from the live interface or show a genuinely
   useful preview without implying the service works. A temporary label does
   not complete the build.

**Acceptance:** A first-time visitor can identify what the site is, what is
available now, where to start, how to join and how to sign in without meeting
an unavailable feature or an internal status phrase.

### Phase 1 — Prove identity and cross-device continuity

**Owners:** Identity/Rewards/Data, Functionality & Platform, MAiKEOVER, Closet  
**Why first:** Every personalized feature depends on a trustworthy resident
identity and authoritative state.

1. Create or name the isolated Supabase staging target and inventory applied
   migrations against the repository.
2. Apply missing migrations in dependency order.
3. Exercise magic-link signup/sign-in, session refresh, sign-out and expired
   link handling.
4. Run the existing two-account/three-browser-or-device vertical test.
5. Prove RLS:
   - a resident can read and change only her own permitted records;
   - cross-user direct reads/writes fail;
   - privileged functions enforce their own rules;
   - anonymous access fails where required.
6. Bind one complete object round trip:
   create Resident Card → save progress/reward → see it in Closet → open a
   second device → change/remove it → see the change everywhere.
7. Reconcile duplicate local and server records without silently losing user
   state.
8. Replace temporary “mostly local” behavior only after the staging receipt
   passes.

**Acceptance evidence:** exact migration hashes, staging project identity,
test-account matrix, RLS denial logs, consumer screenshots, database receipts
and a fresh independent functionality verdict.

### Phase 2 — Make the account-aware Homepage genuinely useful

**Owners:** Homepage/Town Entry, Platform, NewsStand, Release Control  

1. Wire the header state:
   - signed out: `Sign in`;
   - signed in: `My Closet` or the resident’s name/avatar;
   - `Join the town` remains the separate new-resident action.
2. Build “What’s new since your last visit” from the released-content ledger:
   - first visit: a small curated “Start here / New in town” set;
   - returning anonymous visitor: device-local cursor;
   - signed-in resident: account-backed cursor across devices;
   - long absence: a capped, ranked digest rather than an exhaustive list.
3. Cap the visible set (recommended: three primary items plus “See all”).
4. Rank by visitor value and freshness across news, released episodes,
   admitted classes, features and town changes.
5. Suppress held, stale, corrected-away and retracted items.
6. Keep the dynamic latest-episode control bound to the release ledger.

**Acceptance:** new, returning-anonymous and signed-in journeys each show
correct, bounded and recoverable state on desktop and mobile.

### Phase 3 — Complete Resident Card plus Postcard as one signup

**Owners:** Post Office, MAiKEOVER, Platform, email provider owner  

1. Put `Send me the Wednesday Postcard` in Resident Card creation, selected by
   default with a plain-language opt-out.
2. Send one idempotent request that creates/updates the resident and the chosen
   subscription state.
3. Support a separate Postcard-only request at the Post Office.
4. Prove duplicate submission, changed email, unsubscribe, provider failure,
   retry and deletion/revocation behavior.
5. Display the resulting state in the Closet/account area.

**Acceptance:** one person never has to sign up twice, an opt-out is honored,
no duplicate provider contact is created, and confirmation matches the real
stored/provider state.

### Phase 4 — Complete Post Office mail and gifting

**Owners:** Post Office, Identity/Rewards/Data, Closet, Safety/Privacy  

1. Verify `resident_mail`, blocking and pack/reward migrations in staging.
2. Decide the collectible rule per item type:
   - gift creates a copy;
   - gift transfers ownership; or
   - gift issues a new bounded reward.
   This cannot be inferred from the existing schema.
3. Build:
   - inbox and sent views;
   - unread count;
   - handle lookup with privacy protection;
   - message composer;
   - optional eligible gift selector;
   - read, redeem, archive/delete;
   - block and report.
4. Add the global account-aware message entry only after counts are
   authoritative.
5. Prove two-user send/receive, blocked-user denial, invalid recipient, repeat
   submission, gift redemption and second-device state.

**Acceptance:** the recipient sees exactly one message/gift, the sender cannot
read another resident’s inbox, block/report works, and Closet ownership
matches the chosen gift rule.

### Phase 5 — Build instant and group chat as a distinct service

**Owners:** Community/Delta LAi Nu, Platform, Safety/Privacy, Moderation  
**Important:** Resident mail does not satisfy this requirement.

1. Approve a bounded chat contract:
   one-to-one chats, private groups, discoverability/invite rules, history,
   retention, presence, blocking, reporting and moderation.
2. Implement conversation, membership, message, receipt and moderation
   records with RLS.
3. Use a realtime transport with reconnect and ordered history.
4. Build an ICQ-inspired visual layer without copying protected assets:
   buddy list, online/away language if presence is enabled, chat window,
   group participants, unread indicators and a clear exit/block route.
5. Test:
   - two accounts and one group;
   - unauthorized-room denial;
   - order and duplicate behavior during reconnect;
   - unread/read receipts;
   - block/report/moderation;
   - keyboard/screen-reader/mobile behavior;
   - rate limits and abuse controls.
6. Integrate a single `Messages` destination into My Closet/global account
   navigation, separating live chat from Post Office mail.

**Acceptance:** a fresh independent privacy/security review and a complete
two-user/group staging recording. No Homepage promise before this gate.

### Phase 6 — Release one real class and add useful learning routes

**Owners:** Learning System, SUNNYVAiLE High/Classes, Library, Platform  

1. Select one representative class with a verifiable practical outcome.
2. Verify every tool/menu instruction in the current product.
3. Build the complete class:
   explanation, controlled example, exercise, artifact/output, verification,
   accessibility, related Concepts 101 entries and source record.
4. Store progress and completion through the proven identity layer, with a
   useful signed-out fallback.
5. Add commitment and starting-point metadata:
   quick practical help, guided lesson, deeper project; foundational,
   experienced or advanced prerequisites where genuinely relevant.
6. Connect related NewsStand articles, Library entries, episodes and tools
   without duplicating the lesson.
7. Only then enable the Homepage `Take a class` action.

**Acceptance:** a learner can start, complete, verify and resume the class on
another device; the result is useful beyond a quiz and all changing product
instructions are current.

### Phase 7 — Integrate, review and release the Homepage

**Owners:** Homepage/Town Entry, Brand, Functionality & Platform, Release
Control

1. Integrate only capabilities that have passed their own gates.
2. Verify every masthead, section, Daily Buzz, account and town-directory link.
3. Test first-time, returning-anonymous and signed-in-resident journeys.
4. Test representative widths from narrow mobile through intermediate and
   wide desktop:
   no random blank fields, clipped imagery, excessive scrolling, hidden
   actions, ambiguous selected states or inconsistent control grammar.
5. Run accessibility, performance, interaction, image-authority, content and
   public-release checks.
6. Obtain independent Town Entry and Brand verdicts against one immutable
   tuple.
7. Deploy only the accepted tuple, then verify the real public journeys and
   rollback target.

## Build queue and gates

| Priority | Build | Depends on | “Done” means |
| --- | --- | --- | --- |
| P0 | Identity and cross-device vertical slice | Staging Supabase target | Two accounts/three clients, RLS and full Closet round trip pass |
| P0 | Resident Card + Postcard transaction | Identity; provider staging | One signup, default opt-in, opt-out, no duplicates, real receipts |
| P0 | Homepage promise map and IA | Capability truth | Every visible action is operational or explicitly withheld |
| P1 | Released-content ledger + “What’s new” | Identity for cross-device; Release Control | First/returning/long-absence states pass and held content is suppressed |
| P1 | Post Office mail and gifts | Identity; reward ownership rule | Inbox, unread, block/report and gift round trip pass |
| P1 | Daily Buzz production feed | NewsStand public release identity | Current cards come only from exact published content |
| P2 | Direct/group chat | Identity; moderation/privacy contract | Real two-user/group staging service passes security and UX review |
| P2 | First live class and pathway model | Identity progress; content verification | One resumable, useful, publicly admitted class exists |
| P3 | Full Homepage integration/release | All features actually shown | Immutable candidate passes Brand, Town Entry and public verification |

## Decisions that cannot be silently invented

These require an exact product decision before their implementation can be
completed:

1. Whether a gifted collectible is copied, transferred or newly issued.
2. Chat room discovery/invite rules, history retention and presence behavior.
3. Moderation ownership and escalation service levels.
4. The exact first class selected for public release.

Everything else above is routine build, test and integration work and should
continue without asking for repeated permission.

## Homepage rule while builds are incomplete

The Homepage may explain the world, link to released content and offer working
local activities. It must not imply that cross-device restoration, mail,
gifting, chat, personalized “what’s new” or classes are operational until the
corresponding acceptance evidence exists.

This is a sequencing rule, not permission to abandon those features. They
remain **BUILD REQUIRED**.

## Evidence basis

- `content/site/sv-nav-auth.js`
- `content/site/sv-global-header.js`
- `content/site/homepage.js`
- `script.js`
- `supabase/migrations/20260722214500_resident_mail.sql`
- `supabase/migrations/20260722230000_server_side_pack_opening.sql`
- `supabase/migrations/20260723000000_resident_blocks.sql`
- `content/site/high-classes.json`
- `operations/product-stewards/maikeover/FUNCTIONALITY-MAP.md`
- `operations/product-stewards/post-office/FUNCTIONALITY-MAP.md`
- `operations/product-stewards/sunnyvaile-high/FUNCTIONALITY-MAP.md`
- `operations/product-stewards/newsstand/PUBLICATION-VALIDATION-AND-DISCOVERY-CONTRACT.md`
- `operations/release-control/RELEASE-STATE.md`
- `operations/painpoints-log.md` controls BTB-135, BTB-136, BTB-137 and the
  existing account-continuity end-to-end completion finding.
