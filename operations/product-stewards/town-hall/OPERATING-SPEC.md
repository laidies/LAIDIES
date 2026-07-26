# Town Hall Operating Specification

**Status:** BOUNDED LOCAL PASS — independent Repair 1 rejudge 87/100; feedback intake remains launch-held pending controlled service and staff-lifecycle evidence  
**Product:** Town Hall  
**Owner:** Town Hall product champion  
**Subchampion:** Town Feedback & Civic Records  
**Last reconciled:** 2026-07-25

## 1. Product job

Town Hall is SUNNYVAiLE's civic relationship room. It must let a visitor:

1. understand the three real stations on arrival;
2. explore Mayor Deb's archive;
3. meet the Town Regulars and make an explicitly device-local Town Regular choice; and
4. send a compliment, complaint or suggestion to a bounded private inbox without being told more happened than the service response proves.

The room is warm, funny and unmistakably LAiDIES, but civic jokes never weaken
submission truth, privacy, safety, accessibility or accountability.

Town Hall is not a public message board, a support hotline, a guaranteed reply
channel, an emergency route, or proof that a note was read, triaged, resolved or
published.

## 2. Experience and visual contract

- The room itself is the interface. Mayor's Office, Noticeboard and Comments are
  visibly labelled on arrival; no invisible hotspots or numbered mystery pins.
- Only one station panel is open at a time. The station button exposes
  `aria-expanded`; the corresponding panel is the controlled region.
- Direct hashes for the three stations continue to work.
- Desktop uses the civic-room composition; mobile restacks the same three
  stations into clear, full-width controls without changing their jobs.
- The current civic-chamber art is an interim fallback. The brief's crisp,
  straight-on, dimensional Y2K lobby in the locked LAiDIES illustration register
  remains `OWNER REVIEW REQUIRED`; no champion may call that art direction
  approved or complete.
- The current Regular count comes from the rendered roster. No invented town
  notices or civic records appear.
- The `sv-hero` wrapper remains intact for shared charm behavior.
- Mayor Deb humour may flavour labels and acknowledgements, but not service,
  reading, privacy, response-time or resolution claims.

## 3. Journey contract

### 3.1 First arrival

- The visitor sees one-line orientation plus three named station controls.
- Each station has a plain-language job and real current state.
- Comments says that it opens a private comment card. It does not claim Deb or
  staff will read it.

### 3.2 Mayor's Office

- Opens the existing Mayor Deb profile, archive, audio and printable routes.
- Media controls and downloads retain their truthful labels and failure behavior.
- It does not imply archive freshness beyond the material actually present.

### 3.3 Noticeboard and Town Regular

- Opens the actual rendered Regular roster.
- Choosing a Town Regular writes only the established local key
  `laidies_town_regular`.
- Copy must say the choice is on this device. It is not an account, membership,
  cross-device identity or staff-visible record.
- The Closet handoff may consume that local choice only under its own contract.

### 3.4 Comment card: anonymous

- The visitor chooses one allowed type, may add a subject of at most 100
  characters and supplies 3–2,000 characters of body text.
- The interface warns against private or sensitive information and says the
  inbox is not an emergency or guaranteed-response route.
- A successful service response means only: **the intake service accepted the
  insert request**.
- Success clears the form, announces that bounded receipt, and may save a
  versioned device-local accepted receipt with a canonical, non-future
  timestamp. It does not create a readable anonymous history.
- Definite validation/policy rejection preserves the entered content,
  re-enables submission and gives an actionable retry message.
- Transport, timeout, abort, status-zero, malformed and missing-receipt outcomes
  are unknown: preserve the entered content, warn against a duplicate and
  suppress immediate retry.

### 3.5 Comment card: signed in

- The authenticated user ID may be attached only from the verified Supabase
  session.
- The browser must not copy the session email into the feedback row unless a
  separately approved purpose, access rule, retention rule and notice exist.
- Signed-in acceptance has the same bounded meaning as anonymous acceptance.
- A future user-visible status/history view requires an independently verified
  read policy, disposition semantics and UX; it is not implied by this form.

### 3.6 Returning visitor

- If the accepted timestamp exists locally, the Comments station may say that
  this device recorded a previously accepted card.
- The timestamp is a convenience cue only. Missing/blocked storage must not
  reverse a service success or create a false failure.
- The cue never says the card is “on the pile,” read, stored across devices,
  triaged or resolved.

### 3.7 Loading, validation and failure

- Native constraints and client checks agree with server shape constraints.
- While filing, the submit button is disabled and visibly says `Filing…`.
- Dynamic validation, progress, success and failure are programmatically
  announced.
- Missing config, module-load failure, auth lookup failure and insert failure do
  not clear the form or set accepted local state.
- The browser must not log feedback body, subject, email, identity or raw
  service error payloads.
- A timeout or unknown outcome must not say “not filed” if the service may have
  accepted the write. Until an idempotent server endpoint exists, the production
  adapter must avoid response shapes that require a post-insert read to prove
  acceptance.

## 4. Data and backend contract

### Current inspected storage

`public.town_hall_feedback` accepts the three submission types, optional subject,
3–2,000-character body, optional `user_id`, optional contact/display fields and
internal disposition fields. RLS permits anonymous inserts (`user_id is null`),
authenticated own inserts and authenticated own reads.

### Browser write contract

- Production sends only `submission_type`, `subject`, `body` and, when obtained
  from a verified session, `user_id`.
- The insert call does **not** request the inserted row. Anonymous users have no
  own-read proof under the inspected policy, so `insert().select().single()`
  could turn a completed write into an apparent failure.
- The public client is an intake transport, not an abuse boundary.
- Synthetic injection is allowed only on localhost/127.0.0.1 with the exact
  preflight fixture marker and matching fixture ID. The production hostname
  cannot activate the seam; tests deny all external network.
- The public controller remains explicitly release-held and fails closed until
  the required server and staff evidence below is accepted.

### Required server-side gate before launch promotion

The direct anonymous insert remains `HOLD` until an authorised backend candidate
adds and proves:

- server-side allowlist/length validation;
- anti-automation and rate limits appropriate to anonymous and signed-in use;
- idempotency or another safe ambiguous-outcome strategy;
- bounded request/runtime behavior;
- controlled operational logging with no raw message/email in routine logs;
- staff-only triage access, notification and incident ownership;
- approved retention/deletion handling; and
- controlled anonymous/signed-in/service-failure tests against isolated staging.

Client validation or CORS alone cannot satisfy this gate.

## 5. Civic accountability and staff triage

The private intake lifecycle is:

`accepted by service → filed → triaged → addressed | no action | referred`

The current schema labels do not by themselves establish that lifecycle. Before
staff operation:

- Ali or an authorised operator must name the triage owner and backup;
- define what `reviewed_at` and every disposition mean;
- define abuse, threat, privacy, correction and urgent-safety escalation;
- define retention and deletion;
- define whether/how a submitter can receive status;
- replace joke-only internal statuses where they obscure accountable meaning;
- prove staff access and least privilege; and
- approve any aggregate public accountability report.

No private note becomes a public civic record without consent, moderation,
redaction and an approved publication/correction process.

## 6. Privacy, safety and abuse rules

- Never send body, subject, email, name, user ID or raw submission to Plausible,
  Clarity, console output, test evidence or champion reports.
- Do not collect email by convenience.
- The public warning must state: no sensitive/private information; not an
  emergency channel; no guaranteed reply.
- Malicious content is treated as untrusted text throughout staff tooling.
- Rate limiting, duplicate control, bot mitigation and incident response are
  server responsibilities and remain launch gates, not frontend claims.

## 7. Analytics and learning

Allowed future aggregate events:

- `town_hall_station_opened` with controlled station ID;
- `town_hall_feedback_started`;
- `town_hall_feedback_accepted` with controlled submission type and auth-state
  class only;
- `town_hall_feedback_failed` with a controlled failure class only.

Forbidden properties include free text, subject, email, names, identifiers,
service error text and any inferred sensitive category. Instrumentation remains
`NOT WIRED` until the shared event dictionary and privacy owner approve it.

Product learning combines aggregate completion/failure data with authorised,
minimised qualitative review. Submission volume alone is not satisfaction,
trust or accountability.

## 8. Dependencies and cross-product handoffs

- Supabase owns auth/session and the current table/RLS boundary.
- The shared identity owner governs any account/cross-device claims.
- Closet may receive only the declared device-local Town Regular choice.
- `/community/comment-card.html` and any correction/publication surface must
  share the civic-accountability definitions rather than create a second inbox.
- Global navigation, charm hunt, audio player, Plausible and Clarity retain
  their shared contracts.
- Town Hall does not inherit emergency/support obligations from FAiRY Godmother
  or other advice tools.

## 9. Acceptance evidence

### Deterministic local source checks

- false-reading and cross-device claims absent;
- status region semantics present;
- email omitted from payload;
- no inserted-row select;
- allowed fields/types/lengths enforced;
- no sensitive analytics/log payload;
- adapter injection exists only as a deliberate test seam.

### Rendered browser checks with synthetic fixtures and external network denied

- all three stations open, close and deep-link;
- keyboard focus and `aria-expanded` state are coherent;
- desktop and mobile have no core horizontal overflow;
- anonymous success and signed-in success use exact minimal payloads;
- signed-in payload derives only user ID from the synthetic verified session;
- success alone sets the local accepted cue and clears the form;
- validation/config/import/auth/insert failures preserve text, restore controls
  and set no local accepted cue;
- blocked localStorage does not reverse an accepted service response;
- no real Supabase, analytics or external request is made.

### Held integration evidence

- isolated staging anonymous/signed-in/RLS/failure/ambiguous-outcome proof;
- server abuse-control evidence;
- staff triage/retention/access proof;
- exact release-artifact rerun;
- public-origin verification only after authorised deployment.

## 10. Upkeep and revenue

- Per change: rerun source and rendered contract tests.
- Monthly once operating: aggregate delivery/failure/abuse health plus an
  authorised, minimised triage sample.
- Quarterly: access/retention/civic-promise review and visual/mobile/a11y pass.
- Immediately: respond to privacy complaint, abuse spike, missing submissions,
  false success, unauthorised access or incorrect public accountability claim.

Town Hall does not charge for voice, attention, response priority or civic
information. Optional physical/print artifacts may be reconsidered only after
the free trust path is healthy and Ali approves them.

## 11. External standards and freshness

Primary guidance reviewed 2026-07-25:

- W3C, WCAG 2.2 Understanding SC 4.1.3, status messages:
  https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
- OWASP, Input Validation Cheat Sheet:
  https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- OWASP, Denial of Service Cheat Sheet:
  https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html
- Supabase, Row Level Security:
  https://supabase.com/docs/guides/database/postgres/row-level-security

Recheck when WCAG guidance, Supabase client/RLS behavior, intake architecture or
the approved civic-accountability policy changes.
