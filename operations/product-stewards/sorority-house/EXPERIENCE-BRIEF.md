# Delta LAi Nu Sorority House experience brief

**Status:** SPECIFIED — INTENT RECOVERED; SHARED IDENTITY, PROVIDER AND
MODERATION CONTRACTS REMAIN BLOCKED BUILD OBLIGATIONS  
**Product ID:** `sorority-house`  
**Owner:** Sorority House building champion  
**Recovered:** 2026-07-26  
**Trigger:** permanent-owner initialization and targeted owner-entry failure for
missing `EXPERIENCE-BRIEF.md` and `FUNCTIONALITY-MAP.md`

This record separates intended experience from current implementation. Each
governing statement carries the provenance label required by the champion
contract. Current code is evidence, not self-promoting intent.

## Recovered promise

- **APPROVED BRIEF/ARTIFACT:** The product verb is: **go into a room and
  talk**. The building should feel like a house whose doors are the interface,
  not a generic card grid or comment wall.
- **APPROVED BRIEF/ARTIFACT:** The four wings are Living Room, Kitchen, Rec
  Room and Your Room. Opening a wing reveals its rooms in place; opening a
  discussion room should keep the visitor in the house when the provider can
  be mounted safely, with a direct room route retained as fallback.
- **APPROVED BRIEF/ARTIFACT:** The intended room-first visual grammar follows
  the approved LIBRAiRY precedent: obviously operable objects composited into
  an environment, clear labels, no hotspot hunting and no decorative fake
  activity counts.
- **LOCKED LEDGER:** LAiDIES voice is funny, clear and useful; nostalgic
  references support the job and never replace it.
- **VERIFIED USER/PRODUCT EVIDENCE:** The repaired local candidate makes all
  four wings and eleven destinations keyboard discoverable, preserves exact
  room hashes and browser history, and truthfully separates local state from
  external discussion outcomes.
- **INFERENCE:** The emotional job is to make asking, reflecting and sharing a
  useful pattern feel more specific and less exposed than entering an
  undifferentiated public feed. This needs human newcomer/usefulness evidence
  before it becomes a verified claim.

## Audience and desired result

- **APPROVED BRIEF/ARTIFACT:** Delta LAi Nu is a women-centred house for useful
  conversation, advice, reflection and creative exchange.
- **CURRENT IMPLEMENTATION OBSERVED:** A visitor can understand the purpose of
  each room, choose one, see whether it is a discussion room or a specific
  handoff, and always retain a route back.
- **VERIFIED USER/PRODUCT EVIDENCE:** A visitor does not need a Resident Card
  merely to discover the house, its wings or its rooms.
- **CURRENT IMPLEMENTATION OBSERVED:** Hyvor Talk is the external provider for
  seven discussion rooms. Hyvor controls its own sign-in, submission,
  publication and provider moderation.
- **UNKNOWN:** Whether Ali intends public reading, invited reading or
  provider-authenticated reading as the long-term live-community boundary.
  Current local tests cannot select this policy.
- **UNKNOWN:** Whether an account-backed LAiDIES Resident Card should ever be
  linked to a Hyvor identity. Device-local Resident Card state must not be
  treated as that link.

The intended successful result is:

1. the visitor understands where she is and what each wing is for;
2. she chooses an appropriate room or owned handoff without hunting;
3. before public participation she understands provider, privacy and
   safe-sharing boundaries;
4. the authoritative system—not page inference—reports whether a post/reply
   was accepted, held, rejected, published, removed or remains unknown;
5. she can report, appeal where applicable, delete/request deletion and return
   safely; and
6. quiet reading, leaving and private reflection remain valid outcomes without
   penalty or reduced status.

## Complete experience tree

### Building shell and four wings

- **APPROVED BRIEF/ARTIFACT:** `/sorority-house.html` owns arrival,
  orientation, four-wing discovery, eleven room choices, in-house discussion
  mounts, safe fallback and the Girl Talk object/handoff.
- **APPROVED BRIEF/ARTIFACT:** Living Room: Ask the Room, Wins of the Week,
  Chat Room Digest.
- **APPROVED BRIEF/ARTIFACT:** Kitchen: Dear LAiDIES, The Try-On Debrief,
  Send It Energy.
- **APPROVED BRIEF/ARTIFACT:** Rec Room: Mix CD Exchange, The Burn Book,
  Comment Card.
- **APPROVED BRIEF/ARTIFACT:** Your Room: Your Closet, Dare Reports / Girl
  Talk.

### Discussion rooms

- **CURRENT IMPLEMENTATION OBSERVED:** Seven provider-backed direct routes are
  `/community/ask-the-room.html`, `/community/wins.html`,
  `/community/dear-laidies.html`, `/community/try-on-debrief.html`,
  `/community/send-it-energy.html`, `/community/mix-cd-exchange.html` and
  `/community/burn-book.html`.
- **CURRENT IMPLEMENTATION OBSERVED:** Each governed provider surface exposes
  LAiDIES privacy plus official Hyvor privacy, terms and
  moderation/reporting routes.
- **CURRENT IMPLEMENTATION OBSERVED:** Local preview, unsupported host,
  unavailable, signed-out and held are distinct bounded states and do not
  claim provider success.
- **UNKNOWN:** The real production lifecycle for post, reply, edit, delete,
  hold, reject, report, appeal, restoration and provider outage has not been
  exercised with controlled provider authority.

### Non-discussion destinations

- **CURRENT IMPLEMENTATION OBSERVED:** Chat Room Digest routes to
  `/community/chat-room-digest.html`.
- **CURRENT IMPLEMENTATION OBSERVED:** Comment Card routes to
  `/community/comment-card.html`.
- **CURRENT IMPLEMENTATION OBSERVED:** Your Closet routes to
  `/laidies-card.html`; the Sorority House does not own Closet state.
- **CURRENT IMPLEMENTATION OBSERVED:** Dare Reports routes to
  `/games/girl-talk.html`.

### Girl Talk

- **VERIFIED USER/PRODUCT EVIDENCE:** Girl Talk is a private
  reflection/behaviour-rehearsal deck with a strict versioned device-local
  envelope and an honour-system sticker marker.
- **VERIFIED USER/PRODUCT EVIDENCE:** Its local marker is not proof of a room
  post, task completion, membership, Closet import, building stamp,
  Butterfly Clip or FAiRY allowance.
- **VERIFIED USER/PRODUCT EVIDENCE:** Optional room sharing means a sanitized
  pattern written from scratch; private work, real messages, personal data and
  another person's information remain private.
- **UNKNOWN:** Representative visitors have not yet shown that they understand
  or benefit from the intended reflection/rehearsal job.

## Visitor-state scopes and orthogonal provider state

LAiDIES identity scope and Hyvor provider state are separate axes. No scope
below implies a provider session.

| Visitor scope | Truthful recognition | Arrival and useful continuity | Allowed result | Return promise |
|---|---|---|---|---|
| First-time visitor | No valid local Card, account session or prior product state proved | Plain welcome; all four wings and eleven destinations explained | Discover/open rooms; private Girl Talk; provider participation only if Hyvor itself establishes it | Return may restore URL/hash only if the browser retains it; no membership promise |
| Returning without Resident Card | Prior hash and/or valid Girl Talk local envelope; no Card proof | Restore exact room selection and valid local Girl Talk state; do not replay a fake newcomer gate | Same discovery; verified local marker only after read-back | **On this device** only; corrupt/blocked state falls back honestly |
| Resident Card holder — device-local | Valid local Card envelope/handle on this device | Personalised welcome may use the local handle while stating it is not community sign-in | Same room access as other visitors; no post authority, private room or cross-device claim | Card continuity is device-local until Platform proves an account claim/read |
| Resident Card holder — verified account scope | Verified LAiDIES session plus authoritative account-backed Card read; currently unproved for this building | May restore accepted account state after Platform integration | Still no Hyvor participation claim without an independent provider-authenticated state | Sign-out, revoke, delete, conflict and second-device outcomes must be explicit |

For every row, provider state may independently be `not contacted`,
`signed-out`, `authenticated/interactive`, `held/rejected`, `unavailable` or
`unknown after action`. Only provider-supported evidence can promote those
states. Moderator/admin is an operational role, not a fifth consumer identity
shortcut.

## Safety, moderation, deletion and dignity

- **CURRENT IMPLEMENTATION OBSERVED:** Provider and safe-sharing disclosures
  appear before the discussion surface; public rooms are never described as
  private or confidential.
- **VERIFIED USER/PRODUCT EVIDENCE:** No room visit, link click, typed text or
  frame load is treated as a post, reply, moderation or reward outcome.
- **LOCKED LEDGER:** Butterfly Clips are the only universal spendable
  currency; building stamps and collectibles are distinct. Meaningful actions,
  not visits or volume, govern any future loyalty progress.
- **LOCKED LEDGER:** Connection mechanics must never become recruiting,
  downline, popularity or obligation pressure.
- **UNKNOWN:** LAiDIES human moderation owner, triage hours, escalation,
  incident response, appeal, evidence retention, user-content retention and
  deletion-response commitments remain unapproved/unproved.
- **BLOCKED — BUILD REMAINS REQUIRED:** Platform and Community Moderation must
  specify and prove provider post/reply/edit/delete/report/moderate lifecycle,
  timeout reconciliation, safe retry, abuse controls and accessible recovery.
- **BLOCKED — BUILD REMAINS REQUIRED:** Platform Identity must prove
  account-backed Card claim/update/revoke/delete/sign-out/second-device
  transitions before the building may use them.
- **BUILD BEFORE LAUNCH:** Girl Talk needs a visible clear-local-history action
  with verified remove/read-back and storage-denied recovery if its retained
  local history remains part of the intended product.

## Experience and accessibility contract

- **APPROVED BRIEF/ARTIFACT:** The environment and doors do the navigation
  work. Labels remain crisp and readable; decorative activity indicators may
  not invent live data.
- **VERIFIED USER/PRODUCT EVIDENCE:** The accepted Repair 1 evidence covers all
  eleven hashes/history paths, keyboard discovery, deliberate Girl Talk focus,
  live result announcements, reduced motion, reflow proxies and provider-state
  contrast.
- **CURRENT IMPLEMENTATION OBSERVED:** A fresh 2026-07-26 browser rerun failed
  `Girl Talk has no 320px horizontal overflow`. The earlier 320px PASS cannot
  govern the current working source until the cause is repaired and
  independently rejudged.
- **BLOCKED — BUILD REMAINS REQUIRED:** Safari, VoiceOver, native browser zoom,
  representative physical devices and the real third-party frame's keyboard/
  screen-reader behaviour remain unproved.
- **BUILD BEFORE LAUNCH:** Loading, signed-out, held/rejected, unavailable,
  deletion, report, appeal and unknown-after-submit recovery must each have a
  perceivable status, focus strategy, safe retry/exit and non-colour-only cue.
- **BUILD BEFORE LAUNCH:** Repair the fresh Girl Talk 320px overflow and rerun
  the complete Sorority browser suite in source and exact artifact.
- **OWNER DECISION REQUIRED:** Ali's current visual/community approval is
  required before the recovered door/room direction can be promoted as the
  final public experience.

## Reconciled source conflicts

1. **APPROVED BRIEF/ARTIFACT versus VERIFIED USER/PRODUCT EVIDENCE:** the
   2026-07-23 design brief says a local Resident Card gates posting. Later
   independent evidence proves local Card and Hyvor identity are separate.
   The door/environment direction remains admitted; the gating assumption does
   not govern until Platform and Ali approve an identity/provider contract.
2. **APPROVED BRIEF/ARTIFACT versus VERIFIED USER/PRODUCT EVIDENCE:** the older
   brief says Girl Talk dares post to rooms and earn a sticker. Repair 1 makes
   room sharing optional and the marker device-local. The repaired safety and
   completion boundary governs the current candidate.
3. **APPROVED BRIEF/ARTIFACT versus CURRENT IMPLEMENTATION OBSERVED:** the
   brief names June and fully rendered dorm doors; the current page uses the
   four-wing interaction but those final operable visual assets are not proven
   admitted. They remain an owner-reviewed build obligation, not assumed
   complete art.

## Acceptance and evidence required

The building reaches `VERIFIED LOCALLY` for the complete intended experience
only when the attached functionality map is current and every accepted
capability has source and exact-artifact proof across the four visitor scopes,
provider states, update/delete paths and accessibility failures. Live
community promotion additionally requires controlled real-provider receipts,
named human moderation operations, native accessibility, owner approval,
privacy-safe analytics, exact deployment binding and public-origin
verification.

## Source trail

- **LOCKED LEDGER:** `operations/engine/LEDGER.md`, especially
  D-2026-07-24-003, D-2026-07-24-006, D-2026-07-24-007 and
  D-2026-07-24-015.
- **APPROVED BRIEF/ARTIFACT:** `operations/building-design-briefs/sorority-house.md`.
- **CURRENT IMPLEMENTATION OBSERVED:** `sorority-house.html`,
  `content/site/sorority-house-v2.js`, `content/site/community-room.js`,
  `content/sorority-house-v2.css`, `content/community-room-v2.css` and
  `games/girl-talk.html`.
- **VERIFIED USER/PRODUCT EVIDENCE:**
  `independent-rejudge-community-provider-girl-talk-repair1-2026-07-26.md`.
- **VERIFIED USER/PRODUCT EVIDENCE:**
  `maker-evidence-community-provider-girl-talk-repair1-2026-07-25.md`.
- **INFERENCE/UNKNOWN CONTROL:** `OPERATING-SPEC.md`, `CHARTER.md`,
  `launch-deep-dive-2026-07-25.md`, the visitor-state standard and the
  build-completion policy.
