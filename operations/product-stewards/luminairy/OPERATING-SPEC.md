# The LUMINAiRY operating specification

**Owner:** LUMINAiRY building champion  
**Research owner:** PATRON SAiNTS, MAiVENS & TRAiLBLAZERS research/editorial sub-champion  
**Status:** CARD/PROFILE SUCCESSOR BUILT, BROWSER-VERIFIED AND INDEPENDENTLY REVIEWED LOCALLY; release pending
**Last reviewed:** 2026-09-05

## Product job

The LUMINAiRY is a three-wing guide hall. It helps a visitor distinguish:

- **PATRON SAiNTS:** clearly labelled LAiDIES cultural interpretation and practical rules, never presented as quotation, biography or factual authority;
- **MAiVENS:** sourced accounts of women whose work helps explain computing and AI;
- **TRAiLBLAZERS:** sourced, current and deliberately scoped accounts of people building present-day AI organisations, research and products.

The room is not a leaderboard, canon of “the greatest”, completion course, credential, hero-worship wall or proof that a person endorses LAiDIES.

## Journey contract

1. The Matron Lumen arrival locates the building, then the complete three-wing archive appears before optional personalization.
2. Each stained-glass door is a real button. It opens one wing in place, closes the others, updates the URL hash and announces the change.
3. Every archive card is a cover, not a mini profile: approved image, canonical role line and name only. The whole cover is one native link.
4. The card link opens a complete same-page profile route with its own URL hash. The profile receives heading focus and its back link restores focus to the exact cover that opened it.
5. A source link names the exact supported claim and opens its authoritative evidence. A general biography link must not masquerade as support for an unrelated quote, “first”, current role or causal inference.
6. Description, LAiDIES lesson, dated evidence/resources, Saint song or honest deferred state, and choose/remove action belong on the complete profile—not on the archive cover.
7. A visitor may choose one person per wing. Choices save immediately in the private versioned local envelope and, when signed in, join the admitted Resident continuation for cross-device restoration in My Closet.
8. The page offers one quiet Town Hall correction route.

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

The bounded relaunch posture is intentionally conservative: existing biographies and interpretive cards remain **held** until their exact prose is decomposed and checked claim by claim. A small current-role claim may be admitted only when its exact wording is supported by a current first-party source.

## Corrections

Corrections are dated and visible in the registry and in the affected card/profile. A correction records the previous wording, corrected wording, reason, source and affected consumers. The research owner must propagate a correction to episode, KSVL, card and other surfaces that repeat it. The page links to `/town-hall.html#town-hall-feedback` while explicitly saying the private inbox is in preflight and no response is promised.

## Accessibility and resilience

- Door and archive-index controls use native buttons, visible focus and complete keyboard operation.
- Open-wing status is announced without moving focus unexpectedly.
- The complete profile gives its heading focus after navigation, exposes a native back link, restores focus to the exact opener and remains usable at 320 CSS px and 200% zoom.
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
3. keyboard tests for doors, archive tabs, whole-card links, profile initial focus and exact-cover return at desktop and 320 px;
4. mobile/reflow/reduced-motion/contrast inspection;
5. local-selection truth and corrupt-storage tests;
6. exact public artifact build with no missing referenced assets;
7. research-owner approval for each admitted claim and owner visual approval.

Deployment remains a separate, provider-head-aware release step.

### 2026-09-05 cover/profile successor

- **Card contract:** all 43 archive covers contain only the admitted image, canonical role and name; there are no nested controls or hidden mini-profile details.
- **Profile contract:** the canonical `#profile-id` route renders the full admitted record, typed external destinations, Saint song state and existing Your Luminaries action without duplicating signed data.
- **Continuity:** the 13/23/7 roster, 108 typed MAiVEN/TRAiLBLAZER destinations, 12-song playlist, deferred Carrie state, local/account persistence and My Closet restoration are preserved.
- **Current boundary:** implementation and browser suite pass locally; an independent read-only rejudge found no remaining material defect. No deployment or public verification has occurred.
