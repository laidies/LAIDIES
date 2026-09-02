# The LUMINAiRY operating specification

**Owner:** LUMINAiRY building champion  
**Research owner:** PATRON SAiNTS, MAiVENS & TRAiLBLAZERS research/editorial sub-champion  
**Status:** SIGNED 30-PROFILE RESOURCE SET VALIDATED LOCALLY — coordinated release awaiting exact production artifact
**Last reviewed:** 2026-09-02

## Product job

The LUMINAiRY is a three-wing hall of cultural teaching devices, historical MAiVENS and present-day Trailblazers. It helps a visitor distinguish:

- **PATRON SAiNTS:** clearly labelled LAiDIES cultural interpretation and practical rules, never presented as quotation, biography or factual authority;
- **MAiVENS:** sourced accounts of women whose work helps explain computing and AI;
- **TRAiLBLAZERS:** sourced, current and deliberately scoped accounts of people building present-day AI organisations, research and products.

The room is not a leaderboard, canon of “the greatest”, completion course, credential, hero-worship wall or proof that a person endorses LAiDIES.

## Journey contract

1. The arrival states what each wing does and that research may be held while it is rechecked.
2. Each stained-glass door is a real button. It opens one wing in place, closes the others, updates the URL hash and announces the change.
3. A person card may show only material admitted by the claim registry. Held or stale material is replaced with a plain editorial-review message; the artwork and name do not launder the held claims.
4. A MAiVEN profile opens as a keyboard-operable modal, receives focus, traps focus, closes with Escape/backdrop/close control, and returns focus to the control that opened it.
5. A source link names the exact supported claim and opens its authoritative evidence. A general biography link must not masquerade as support for an unrelated quote, “first”, current role or causal inference.
6. A visitor may choose one guide per wing. The choice and “met” list are private browser storage on this device only. Opening a profile means “opened on this device”; it is not learning, completion, endorsement, membership, reward or account state.
7. The page offers a correction route that does not imply a guaranteed response. While Town Hall intake is held, the route is a transparent status page, not a working submission promise.
8. When NewsStand coverage relates to a woman with a LUMINAiRY profile, the article links to that exact profile. The profile gives readers verified destinations to **Read**, **Watch**, **Listen** and **Follow** her work where applicable. Content-free landers are excluded. Changing a destination, action label or review date changes the profile bytes and therefore requires independent review plus a renewed signed receipt before publication.

## Claim admission contract

Admission is a two-part boundary:

- `content/luminairy-claims.json` records candidate claims and their exact
  identity/context/content/evidence envelope; and
- `content/luminairy-editorial-receipts.json` contains independently reviewed,
  offline-signed admission receipts.

The public candidate contains only the pinned P-256 verification key. It does
not contain the private signing authority. A candidate claim cannot admit
itself by changing prose, evidence or hashes in both public files.

Every rendered person-content block has a stable record with:

- `product`, `claimId`, `personId`, `wing`, `claimKind`, `status` and `scope`;
- exact `claimText` or the exact selector-bound content hash;
- `status`: `admitted`, `held`, `corrected` or `retired`;
- one or more claim-specific sources for admitted factual material;
- strict Gregorian `verifiedOn` and `recheckOn`;
- scope/caveat and correction owner.

Admission fails closed. Every admitted claim requires exactly one valid signed
receipt matching every admission-affecting field and the complete envelope
hash. Missing/orphan/duplicate/invalid receipts, identity or context mutation,
invalid dates, future verification dates, expired recheck dates, unsupported
quotes, unknown statuses, duplicate IDs, hash drift, unavailable authority
data, disabled JavaScript or a missing gate script all leave the affected
material natively held. Current roles recheck at least quarterly and
immediately on a credible news trigger. Historical priority/“first” claims
require an authoritative specialist source and explicit scope. LAiDIES
interpretation is labelled as interpretation.

The current profile set contains 43 admitted, exact-profile records: 13 Saints, 23 MAiVENS and 7 Trailblazers. Each admission remains valid only while its complete profile bytes match an independently reviewed offline-signed receipt. Current-role and destination claims require current first-party or authoritative sources and a dated recheck boundary.

## Corrections

Corrections are dated and visible in the registry and in the affected card/profile. A correction records the previous wording, corrected wording, reason, source and affected consumers. The research owner must propagate a correction to episode, KSVL, card and other surfaces that repeat it. The page links to `/town-hall.html#town-hall-feedback` while explicitly saying the private inbox is in preflight and no response is promised.

## Accessibility and resilience

- Door and archive-index controls use native buttons, visible focus and complete keyboard operation.
- Open-wing status is announced without moving focus unexpectedly.
- The modal establishes focus synchronously, exposes an explicit
  `closed`/`opening`/`ready`/`failed` focus state, traps and wraps focus in both
  directions, prevents background scrolling, restores focus to the exact
  opener and remains usable at 320 CSS px and 200% zoom. No deferred focus may
  compete with the user's first keyboard action.
- The experience reflows to one column; no essential text depends on hover, animation, colour or imagery.
- Reduced-motion preference removes smooth scrolling, card transforms and modal animation.
- Registry/network/script/storage/audio failure preserves navigation and explains the limitation.

## Acceptance evidence

Release remains `BUILDING` until all are fresh:

1. deterministic registry schema/date/source/hash validation;
2. rendered tests proving held claims are suppressed without JavaScript,
   admitted claims bind to their exact independently signed receipts and
   sources, and rehashed evidence, identity mutations, missing authority,
   unknown and stale records fail closed;
3. keyboard tests for doors, archive tabs and modal ready-state, initial
   focus, forward/backward wrap and Escape/close/return at desktop and 320 px,
   including five consecutive source and exact-artifact passes without retry;
4. mobile/reflow/reduced-motion/contrast inspection;
5. local-selection truth and corrupt-storage tests;
6. exact public artifact build with no missing referenced assets;
7. research-owner approval for each admitted claim and owner visual approval.

This specification authorizes no blind deployment. A release owner must reconcile the scoped successor against the current production head, preserve unrelated bytes, publish through the normal release path and verify the resulting public origins before describing it as live.
