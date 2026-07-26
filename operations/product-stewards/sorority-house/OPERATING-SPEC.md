# Delta LAi Nu Sorority House Operating Specification

**Status:** BOUNDED LOCAL PASS — independent Repair 1 rejudge 91/100; live provider,
moderation, identity and public-origin evidence remain held  
**Product:** Delta LAi Nu Sorority House  
**Owner:** Sorority House product champion  
**Subchampions:** Community Rooms; Girl Talk  
**Last reconciled:** 2026-07-25

## 1. Product job and boundaries

Delta LAi Nu helps a woman choose the right kind of conversation without
having to decode a generic comment wall. The house makes every room's purpose,
participation boundary and safe return clear before she reaches the external
discussion provider.

It is not proof of membership, a private or confidential channel, a guaranteed
LAiDIES response, a moderation receipt, a reward farm or a popularity system.
The browser does not decide whether someone is a Hyvor user, whether a post was
received/published/held/moderated or whether identity persists across devices.

## 2. Users and core journeys

### Newcomer or non-resident

- All four wings and eleven destinations are discoverable without a Resident
  Card, account or JavaScript-authenticated state.
- She can understand each room's job and open its direct route.
- A local Resident Card may personalize another product, but does not unlock,
  sign or verify a community post.
- A discussion room states that Hyvor is an external service and may require
  its own sign-in before any provider UI appears.

### Returning visitor

- A room hash may reopen the selected destination; browser Back returns to the
  prior room selection without inventing participation history.
- Device-local Girl Talk state may reappear only when its exact local record is
  readable. It is not an account, cross-device history or community record.
- Missing, corrupt or blocked local storage produces an honest fresh/failure
  state rather than a false saved sticker.

### Discussion-room journey

1. Read the room purpose and safe-sharing boundary.
2. Choose the direct room or embedded room panel.
3. See the external-provider disclosure before interaction.
4. Hyvor, not LAiDIES page code, owns provider sign-in, submission,
   publication and moderation outcomes.
5. Return to the room directory at any time without penalty.

The page never infers `submitted`, `published`, `moderated`, `reported`,
`replied`, `earned` or `unlocked` from loading a frame, clicking a link,
visiting a room or entering text.

## 3. Provider, privacy, moderation and safety contract

- Hyvor is named as an external discussion provider. Its privacy and community
  rules apply in addition to LAiDIES' rules.
- Public threads are not private. Visitors are warned not to post confidential
  work, private messages, personal identifiers, health/legal/financial details
  or another person's information.
- Participation, reply, review, response and publication are never
  guaranteed. A visible provider frame is not a successful-post receipt.
- Provider unavailable, unsupported host, local preview, signed-out and
  provider-held states are distinct, announced states with a safe return.
- Local preview and synthetic fixtures never contact Hyvor.
- The production provider may load only on the approved `laidies.ai` hosts.
  Any other host fails held and does not request the provider.
- A supported provider event/API and separately approved data contract are
  required before LAiDIES records post/reply/moderation outcomes. Message text,
  handles and moderation details never enter analytics.
- Human moderation ownership, reporting, escalation, retention/deletion,
  appeal and incident response remain release gates.

## 4. Girl Talk product contract

Girl Talk is a private reflection and low-stakes behaviour-rehearsal deck:

- Truth cards help the visitor name a situation, assumption or next move.
- Dare cards suggest one optional action. Opening a related room is a resource,
  not proof the action or a post happened.
- Any instruction to share/post is optional and means a sanitized learning or
  pattern only. The user may keep it private; she never pastes confidential
  work, private messages or another person's information.
- `I answered honestly`, `mark my local sticker` and penalty choices are
  honour-system device-local state only.
- Local stickers are playful progress markers inside Girl Talk. They are not
  Closet imports, member rewards, FAiRY Plays, detention, provider outcomes or
  verified community participation.
- Storage failure withholds the saved-sticker claim and preserves a clear
  retry/fresh-state path.
- The useful completion event is: the visitor reflects or chooses an action
  and the browser either verifies the exact local state write or explicitly
  says it could not save it.

## 5. UX, accessibility and visual contract

- Wing and room controls are real buttons with visible focus and correct
  expanded/current states.
- Selection, loading, held, unavailable and local-save results use an atomic
  live status; focus moves only when it clarifies a newly opened state.
- Browser Back and direct room hashes work. No smooth scrolling occurs under
  reduced motion.
- Core journeys reflow without horizontal clipping at 320 CSS pixels and at
  200%/400% browser reflow proxies.
- Text and interactive states meet WCAG 2.2 AA contrast for their rendered
  sizes; keyboard use does not depend on hover or the third-party frame.
- Provider failure is not styled like an empty/dead community.

## 6. State, identity, rewards and analytics

| State | Authority | Meaning |
| --- | --- | --- |
| selected wing/room/hash | browser navigation | current directory selection only |
| local Resident Card/handle | browser-local profile | not Hyvor/community identity or cross-device proof |
| Hyvor session/post/moderation | external provider | unverified by this local cycle |
| Girl Talk local envelope | browser localStorage | device-local honour history only |
| Closet/rewards/FAiRY allowances | their authoritative owners | never emitted by this product |

Privacy-safe future analytics may count room selection, provider-state class
and Girl Talk draw/local-save success/failure. They must exclude thread text,
prompts containing user content, handles, identity, card text, moderation
details and sensitive context. No analytics event is wired by this cycle.

## 7. Acceptance evidence and release gates

Bounded local acceptance requires:

- source contract for room inventory, copy, provider-host gate, identity/reward
  exclusions and Girl Talk boundary;
- browser journeys for newcomer/returning discovery, room hash/Back, keyboard
  and focus, local preview, unsupported host, signed-out, held and unavailable
  provider fixtures with all external network denied;
- Girl Talk draw/reflection/action, optional sharing language, local verified
  save and blocked-storage failure;
- reduced motion, 320px and reflow/contrast checks;
- source/exact-artifact parity and independent rejudge.

Still required before live community promotion:

- controlled Hyvor sign-in/post/reply/hold/reject/report/moderation/failure
  evidence using approved synthetic content;
- approved privacy/retention/moderation/incident policy and named human owner;
- Safari, VoiceOver, native zoom and physical-device evidence;
- Ali's visual/community-experience approval;
- approved privacy-safe analytics;
- exact deployment/public-origin verification and release authority.

## 8. Upkeep and commercial posture

- Per provider/room/Girl Talk change: contract, privacy, copy and regression
  review.
- Weekly once operating: human incident/moderation and room-usefulness review.
- Monthly: stale prompts, provider health, accessibility and room
  merge/pause decision.
- Quarterly: provider terms/privacy, retention, safety and exit review.

Revenue remains deferred. Core participation and safety cannot be paid
visibility, priority, popularity or support access.
