# Town Hall building experience brief

**Status:** SPECIFIED — INTENT RECOVERED; BUILD REMAINS REQUIRED  
**Building owner:** Town Hall product champion  
**Subchampion:** Town Feedback & Civic Records  
**Brand & Experience Director:** review required  
**Functionality & Platform Director:** review required  
**Recovered:** 2026-07-26

This brief reconciles the approved building brief, locked portfolio decisions,
the current operating specification, current source, and the 2026-07-25
bounded local evidence. Current implementation is evidence, not permission to
narrow the approved product.

## Provenance key

Every governing row carries one of the required provenance labels:
`ALI CONFIRMED`, `LOCKED LEDGER`, `APPROVED BRIEF/ARTIFACT`,
`VERIFIED USER/PRODUCT EVIDENCE`, `CURRENT IMPLEMENTATION OBSERVED`,
`INFERENCE`, or `UNKNOWN`.

## Stable promise and intended successful result

| Governing statement | Provenance |
|---|---|
| Town Hall is SUNNYVAiLE's civic room: a visitor can see Mayor Deb, meet the Regulars, choose a device-local Town Regular, and submit a compliment, complaint, or suggestion into a private civic intake. | APPROVED BRIEF/ARTIFACT |
| The intended comment-card result includes accountable human intake: an accepted note enters a defined staff lifecycle and the visitor can understand what happens next. | APPROVED BRIEF/ARTIFACT |
| The approved phrase “actually gets read” is an uncompleted product obligation, not a claim the current page may make. The public controller must remain held until server acceptance and staff lifecycle evidence exist. | LOCKED LEDGER |
| A transport acknowledgement means only that the intake accepted the request. It does not prove reading, triage, response, resolution, publication, or a civic record. | LOCKED LEDGER |
| Town Hall is not a public message board, emergency service, guaranteed-reply channel, support hotline, or paid priority queue. | APPROVED BRIEF/ARTIFACT |
| The room remains playful and distinctly LAiDIES, but jokes never weaken privacy, safety, accessibility, moderation, retry, receipt, or accountability truth. | LOCKED LEDGER |

## Audience and visitor-state jobs — four scopes

| Visitor scope | Truthful recognition | Arrival and orientation | Primary job and action | Existing state and prompts | Success, next step, and return promise | Provenance |
|---|---|---|---|---|---|---|
| 1. First-time visitor | No valid Town Hall accepted receipt, no valid device-local Resident Card dependency, and no verified account assumption. Absence of local state does not prove absence of an account. | See the civic room, one-line verb, and three named stations without hotspot hunting. Comments explains that the inbox is private, non-emergency, and currently unavailable until released. | Explore Deb or the Regulars; when the inbox is released, write one bounded card. | Show no “last card” cue. Offer the same privacy warning before text entry. Do not force Resident Card creation or sign-in to explore or submit anonymously. | Exploration completes in place. A released anonymous intake returns a bounded accepted receipt and an honest next-step explanation; return continuity is device-only unless separately proved. | APPROVED BRIEF/ARTIFACT |
| 2. Returning visitor without a Resident Card | A valid versioned Town Hall accepted receipt and/or other product-local state on this browser; no Card or account claim. | Preserve orientation but add useful continuity: the Comments station may say this device recorded an accepted card at a valid non-future time. | Revisit Deb/Regulars or file another card only when the previous outcome is known and retry rules allow it. | Do not replay newcomer coercion. Never call the local receipt a staff status, account history, cross-device record, or proof of reading. | The visitor can distinguish prior local acceptance from current staff status. Clearing/denying storage removes only the convenience cue and never changes server truth. | LOCKED LEDGER |
| 3. Resident Card holder — device-local scope | A valid device-local Card envelope under the shared Card contract, plus Town Hall's own local keys where present. Card presence is not authorization. | Town Hall may greet or orient using only Card fields explicitly approved for shared display; the current product has no accepted Card-specific greeting or permission. | Use the same civic stations and optionally carry a declared Town Regular choice to the Closet. Anonymous intake remains available when released. | Do not infer login, membership, public identity, staff visibility, ownership, or sync. Do not send Card content with feedback. | Town Regular selection persists on this device and is consumed by the Closet only under its own device-local contract. Card update/deletion must remove or refresh any future Town Hall personalization. | LOCKED LEDGER |
| 4. Resident Card holder — verified account-backed scope | A separately verified Supabase session plus accepted account/profile/RLS evidence. Neither a local Card nor a session-shaped fixture proves this scope publicly. | The room remains usable without privileged framing. Signed-in state may support accountable intake/history only after its write/read permissions and privacy notice pass. | Submit a card with verified `user_id`; later view or receive status only if the approved staff/account lifecycle is built. | Never copy session email by convenience. Explain whether the card is private, how it can be accessed/deleted, and whether replies exist. Withhold history/status UI until authoritative reads and disposition semantics pass. | Acceptance has the same bounded meaning as anonymous acceptance. Any account-backed history, status, second-device restoration, correction, or deletion result needs its own proof and consumer propagation. | LOCKED LEDGER |

### Required transitions

| Transition | Intended result | Current truth | Provenance |
|---|---|---|---|
| First visit → leave → return without Card | Orientation remains clear; valid product-local acceptance may add only an “on this device” cue. | Versioned local accepted receipt has bounded synthetic proof. | VERIFIED USER/PRODUCT EVIDENCE |
| First/returning visitor → create Card → same-device return | Civic access does not change; any future personalization uses only approved Card fields. | No Town Hall-specific Card transition is implemented or evidenced. | CURRENT IMPLEMENTATION OBSERVED |
| Device-local Card → verified account | Local civic and Town Regular state is not silently promoted, merged, or uploaded. An explicit merge/keep/replace contract is required if sync is intended. | Shared identity/account claim and merge contract remain unproved. | LOCKED LEDGER |
| Signed-in resident → sign out → return | Private status/history disappears or clearly becomes unavailable; device-local public/civic exploration remains. | No signed-in status/history surface exists; controlled session submission is synthetic only. | CURRENT IMPLEMENTATION OBSERVED |
| Resident → second tab/device | Duplicate and stale form outcomes reconcile safely; device-local cues do not pretend to sync. | Two-device/service lifecycle is not proved. | LOCKED LEDGER |
| Corrupt, future, partial, migrated, or storage-denied state | Invalid receipt is ignored; storage failure never reverses service acceptance. | Synthetic adversarial receipt/storage cases pass locally. | VERIFIED USER/PRODUCT EVIDENCE |
| Card/account update, privacy change, deletion, or revocation | Every Town Hall personalization, feedback-read surface, and downstream consumer updates or loses access consistently. | Contract missing; shared Functionality & Platform work required. | UNKNOWN |

## Place metaphor, feeling, and ritual

| Governing statement | Provenance |
|---|---|
| The civic lobby is the interface: Deb/counter, heart-pushpin noticeboard, and comment drop-box are three obviously operable stations with always-visible labels. | ALI CONFIRMED |
| One station opens in place at a time; direct hashes remain usable; mobile restacks the same three jobs into full-width controls. | APPROVED BRIEF/ARTIFACT |
| The signature ritual is a restrained reception-bell interaction that opens Deb's office without competing with the site audio system. Shipping the sound itself remains an owner decision. | APPROVED BRIEF/ARTIFACT |
| The intended visual is a straight-on, crisp, dimensional Y2K civic lobby in the LAiDIES illustration register. The current civic-chamber art is an interim fallback and is not final visual approval. | APPROVED BRIEF/ARTIFACT |
| Civic warmth comes from visible service, real state, and funny Deb copy—not from fake bureaucracy, mystery pins, generic cards, or success-shaped jokes. | APPROVED BRIEF/ARTIFACT |

## Complete owned product tree

| Owned surface | Job | Boundary | Provenance |
|---|---|---|---|
| `town-hall.html` arrival and station stage | Orient and expose the three civic jobs. | Town Hall owner owns page experience; shared shell/charm/nav remain platform dependencies. | CURRENT IMPLEMENTATION OBSERVED |
| Mayor's Office panel | Deb archive, audio, posters, print routes, and LUMINAiRY handoff. | Media admission, player behavior, and destination products retain their own contracts. | APPROVED BRIEF/ARTIFACT |
| Noticeboard and Regulars | Show the real rendered Regular roster and route to their buildings. | Count must derive from the actual roster; no invented notices/feed. | APPROVED BRIEF/ARTIFACT |
| Town Regular picker | Make a clearly device-local choice and hand it to the Closet. | `laidies_town_regular` is not identity, membership, account ownership, or cross-device state. | LOCKED LEDGER |
| Private comment card | Collect allowed type, optional subject, and bounded body; show validation, filing, accepted, rejected, and unknown states. | Public release remains held until the complete backend/staff lifecycle passes. | LOCKED LEDGER |
| Town Feedback & Civic Records lifecycle | Validate, accept, dedupe, protect, triage, escalate, address/refer/no-action, retain/delete, and report only authorised aggregates. | Shared intake, identity, staff access, moderation, analytics, and release contracts queue through Functionality & Platform. | LOCKED LEDGER |
| `/community/comment-card.html` coordination | Provide a consistent correction/referral entry without creating a second contradictory inbox. | The owning page and Town Hall must share receipt, privacy, and lifecycle semantics. | LOCKED LEDGER |

## Component and object-to-action map

| Object/component | Discoverability → action → location | State carried | Result → next step | Provenance |
|---|---|---|---|---|
| Mayor Deb/counter | Visible labelled station → activate → in-place Mayor panel | Open station/hash only | Deb archive is usable → return to room or follow admitted media/profile links | APPROVED BRIEF/ARTIFACT |
| Heart-pushpin noticeboard | Visible labelled station with real roster count → activate → in-place Regulars panel | Rendered roster; optional device-local Town Regular key | Meet Regulars or choose one → visit character building or Closet | APPROVED BRIEF/ARTIFACT |
| Comment drop-box | Visible labelled station with truthful release/receipt state → activate → in-place form | Release state; typed local accepted receipt only | File when released → bounded receipt and next-step explanation | LOCKED LEDGER |
| Submission type chips | Fieldset/radios → choose one allowed value | `compliment`, `complaint`, or `suggestion` | Valid type enters payload; mutated values fail before transport | VERIFIED USER/PRODUCT EVIDENCE |
| Subject/body/count | Labelled inputs → edit in form | Subject ≤100; body 3–2,000 | Validation preserves content and focuses/announces recovery | LOCKED LEDGER |
| Submit control/status region | Native button → validate/authorize/write | Filing/rejected/unknown/accepted state | Exactly one honest visible/live result; retry depends on outcome class | LOCKED LEDGER |
| Accepted receipt cue | Valid versioned local receipt → rendered on return | Accepted flag plus canonical non-future timestamp | “Recorded on this device”; never staff status | VERIFIED USER/PRODUCT EVIDENCE |
| Visitors Centre handback | Visible CTA → route | No private Town Hall state | Returns visitor to orientation without implying submission outcome | CURRENT IMPLEMENTATION OBSERVED |

## Required content and inventory

| Requirement | Admission/currentness rule | Provenance |
|---|---|---|
| Mayor archive, audio, posters, printables, Regular roster, and character routes | Retain only real admitted items and working destinations; no invented archive freshness or notices. | APPROVED BRIEF/ARTIFACT |
| Comment-card warning | Always state: avoid private/sensitive information; not an emergency route; no guaranteed reply; current availability. | LOCKED LEDGER |
| Success/receipt copy | Say the intake accepted the card and identify the exact receipt scope. | LOCKED LEDGER |
| Staff/accountability explanation | Once built, describe triage owner, outcome meanings, response/status availability, retention/deletion, and escalation without exposing internal security details. | APPROVED BRIEF/ARTIFACT |
| Public civic accountability | Aggregate categories/outcomes only after consent, moderation, redaction, correction, and owner approval; never raw private notes. | LOCKED LEDGER |

## Journey contracts

### Primary journey: private civic intake

`discover Comments → read boundary → choose type → write → client validation →
server validation → abuse/rate/idempotency decision → authoritative acceptance
receipt → visible acknowledgement → staff queue → triage → addressed | no
action | referred → authorised status/accountability → retention/deletion`

The intended journey includes the staff lifecycle; the current verified scope
ends at synthetic, release-held client handling. `LOCKED LEDGER`

### Optional exploration

Mayor and Noticeboard remain independently usable when intake is unavailable,
without borrowing a release verdict from the held Comments station.
`APPROVED BRIEF/ARTIFACT`

### Failure, retry, duplicate, and offline

- Validation or definite policy rejection preserves content and permits a
  corrected retry. `LOCKED LEDGER`
- Timeout, abort, status-zero, malformed receipt, or missing receipt is
  `UNKNOWN OUTCOME`; preserve content, warn against duplicates, and suppress
  immediate retry until reconciliation. `LOCKED LEDGER`
- A stable server-issued idempotency key must make replay safe and return the
  same receipt/outcome without duplicate staff records. `LOCKED LEDGER`
- Offline/config/import/auth failures must not clear text, create a receipt,
  or emit private data to logs/analytics. `LOCKED LEDGER`
- A staff action must be auditable, least-privilege, reversible/correctable
  where appropriate, and never render untrusted note content as executable
  markup. `LOCKED LEDGER`

## Cross-building relationships and handbacks

| Relationship | Required handoff and consequence | Owner boundary | Provenance |
|---|---|---|---|
| Town Regular → Closet/Resident Card | Carry only the declared local Regular key today. Update/removal must propagate to every displaying consumer. | Town Hall produces; Closet/MAiKEOVER and Functionality & Platform validate consumption. | LOCKED LEDGER |
| Town Hall → `/community/comment-card.html` | One correction/referral taxonomy, receipt model, privacy warning, and staff owner; no duplicate hidden queue. | Town Feedback owns civic meaning; Platform owns shared intake contract; community page owner owns its UI. | LOCKED LEDGER |
| Library/LUMINAiRY/NewsStand corrections → Town Hall | Deep links may identify a public source/location, but must not prefill or expose private reading/query data. Accepted correction must propagate to every affected content consumer. | Editorial owner decides correction; Platform owns exact-location propagation; Town Hall owns intake explanation. | LOCKED LEDGER |
| Visitors Centre/Town Entry/directory → Town Hall | Discovery surfaces must show the narrowest current availability and never promote the inbox as open before release proof. | Entry/directory owners consume Town Hall release truth. | LOCKED LEDGER |
| Mayor/Regular routes → character buildings | Destination route and current status remain owned by each character product. | Town Hall owns truthful link/context only. | APPROVED BRIEF/ARTIFACT |

## Platform contracts consumed

| Contract | Town Hall requirement | Current state | Provenance |
|---|---|---|---|
| Identity/account/permissions | Anonymous acceptance plus verified-session `user_id`; staff role and two-account RLS; no convenience email. | Synthetic client scope passes; real controlled identity/staff proof missing. | VERIFIED USER/PRODUCT EVIDENCE |
| Saves/progression/Closet | Device-local Town Regular handoff; explicit merge/delete if account sync is later intended. | Device-local only. | CURRENT IMPLEMENTATION OBSERVED |
| Community/moderation | Abuse/rate limits, untrusted-content handling, escalation, appeal/correction, retention, deletion, and staff incident ownership. | Not built or not evidenced. | CURRENT IMPLEMENTATION OBSERVED |
| Analytics/customer evidence | Controlled station/start/accepted/failure-class events only; never note/subject/name/email/user ID/raw error. | Not wired. | CURRENT IMPLEMENTATION OBSERVED |
| Release reliability | Exact source→artifact→deployment→public-origin and controlled-service receipts; rollback to honest unavailable state. | Local exact-artifact preflight only; public/service proof missing. | VERIFIED USER/PRODUCT EVIDENCE |
| Rewards/economy | No reward, payment, or priority for civic voice. | No Town Hall economy is authorised. | APPROVED BRIEF/ARTIFACT |

## Brand invariants and building freedoms

| Rule | Provenance |
|---|---|
| Preserve the three civic verbs, operable-room model, labelled state-on-arrival, candy palette, correct Ai spellings, real roster count, and one-open-at-a-time behavior. | APPROVED BRIEF/ARTIFACT |
| Do not use hidden/numbered hotspots, generic gold coins, emoji chrome, invented notices, fake response status, or CSS cards detached from room objects. | ALI CONFIRMED |
| Town Hall may tune Deb humour, labels, station microcopy, restrained civic sound, and room details after truth/accessibility gates. | APPROVED BRIEF/ARTIFACT |
| Final lobby render, composite technique, retirement of the fallback art, and service-bell audio remain owner decisions already recorded in the approved brief. | UNKNOWN |

## Desktop, mobile, accessibility, motion, and audio

| Requirement | Provenance |
|---|---|
| Desktop presents the room composition and three visually distinct labelled stations; mobile restacks those same controls in DOM order with full-width targets. | APPROVED BRIEF/ARTIFACT |
| Native keyboard operation, visible focus, coherent `aria-expanded`/controlled regions, live filing/result status, preserved error context, and no core horizontal overflow are required. | LOCKED LEDGER |
| Reduced motion removes smooth scrolling and control transitions. | LOCKED LEDGER |
| Safari/VoiceOver, native zoom, 200–400% reflow, physical target quality, and real-device mobile evidence remain required before release. | CURRENT IMPLEMENTATION OBSERVED |
| Any bell sound is short, user-initiated, nonessential, and coordinated with KSVL/player state; the same action works silently. | APPROVED BRIEF/ARTIFACT |

## Launch acceptance scenes

1. First-time anonymous visitor opens all three stations, submits through an
   isolated released intake, receives one bounded receipt, and the named staff
   test identity observes one safe queued item. `APPROVED BRIEF/ARTIFACT`
2. Returning visitor without Card sees only a valid device-local accepted cue,
   survives storage denial/corruption, and safely resolves a replay after an
   ambiguous outcome without duplicating staff work. `LOCKED LEDGER`
3. Device-local Card holder uses Town Hall without identity inflation; Town
   Regular update/removal reaches the Closet and Card deletion removes any
   future personalization. `LOCKED LEDGER`
4. Verified account-backed resident submits with `user_id` but no email,
   signs out, returns on a second device, and sees only the status/history
   explicitly permitted by tested RLS and lifecycle policy. `LOCKED LEDGER`
5. Staff triages safe, abusive, privacy-sensitive, correction, referred, and
   no-action fixtures; access, notification, retention/deletion, incident, and
   output encoding pass with no private content in evidence. `LOCKED LEDGER`
6. Every discovery and correction consumer reflects the same availability and
   outcome contract in source, exact artifact, deployed candidate, and public
   origin. `LOCKED LEDGER`

Each of the four visitor scopes receives a separate verdict. A synthetic,
device-local, or staff-only pass cannot lend completion to another scope.
`LOCKED LEDGER`

## Unresolved decisions and non-goals

| Item | Disposition | Provenance |
|---|---|---|
| Final room art/composite technique, noticeboard feed beyond the four real Regulars, fallback-art retirement, and bell sound | OWNER DECISION REQUIRED; use the recorded recommendations until Ali rules. | APPROVED BRIEF/ARTIFACT |
| Exact staff owner/backup, response/status promise, lifecycle labels, urgent-safety handoff, retention/deletion period, and aggregate accountability format | BUILDING; operational owners must propose and prove, with Ali deciding only the civic/public-accountability trade-off. | LOCKED LEDGER |
| Public raw comments, unmoderated board, emergency response, guaranteed reply, paid priority, reward for submissions, and inferred sentiment/sensitive analytics | Non-goals; not authorised product intent. | APPROVED BRIEF/ARTIFACT |
| Account-backed comment history and cross-device Town Regular sync | Not implied by current source; if retained as intended capability, must be explicitly specified and proved through Functionality & Platform. | UNKNOWN |

## Reconciliation and approvals

- **Town Hall owner:** owns this recovered intent, the complete element
  inventory, product copy/UX, and product-side acceptance.
- **Town Feedback & Civic Records:** owns lifecycle semantics, correction and
  referral boundaries, minimised evidence, and the staff operating proposal.
- **Brand & Experience Director:** approves the final civic-room system fit and
  visual variation.
- **Functionality & Platform Director:** owns the shared intake boundary,
  identity/RLS, idempotency, rate/abuse controls, staff access, retention,
  cross-page propagation, analytics, and release integration.
- **Affected building owners:** verify both sides of Town Regular, correction,
  discovery, character, and comment-card handoffs.
- **Independent judges:** separately judge product/trust, privacy/security,
  staff operations, accessibility, technical reliability, and exact release.
- **Ali:** decides the recorded creative choices and the public civic
  accountability/response model; those decisions do not replace required
  implementation evidence.
