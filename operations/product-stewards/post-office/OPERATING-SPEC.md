# SUNNYVAiLE Post Office — operating specification

**Status:** BOUNDED LOCAL PASS — independent Repair 3 rejudge 91/100;
provider/public receipts remain unverified.
**Reconciliation date:** 2026-07-26
**Trigger:** AW-003 requires each promoted service to have an explicit authoritative completion, privacy boundary and failure/retry contract before the reopening.

## Identity and boundary

The Post Office is Penny's legible counter for three different jobs: continue an intended Wednesday newsletter request to Buttondown, check the held Resident Card account desk, or prepare a postcard to share. It is not a mailbox for resident-to-resident communication (that future feature is a site-wide layer), a proof of email delivery, or a referral/reward system.

Its ten-second promise is: choose what you want to do; understand what the site can know; get one honest next step if it cannot finish. The counter/rack/writing-desk interaction is the building's branded contribution. The current canonical route is `/post-office.html`; it chooses cards locally in `content/site/post-office.js`, hands a selected card to `/postcard.html?pc=<id>`, presents a real held account-status target at `#signin` with no email intake, links the Resident Card/local MAiKEOVER alternative, and continues newsletter requests to Buttondown.

### Current truth matrix

| Action | Local/frontend receipt | Authoritative completion | What may be said now |
|---|---|---|---|
| Select postcard | selected card/updated writing-desk preview | none required | “Selected”; “ready to write” |
| Start newsletter submission | browser form POST/popup initiation | provider-created subscription or provider-confirmed double opt-in, as configured | “Signup request sent/attempted” only if the request was initiated; never “subscribed” or “Wednesday mail is coming” |
| Open Resident Card | successful route handoff | none required | “Open your Resident Card” |
| Request magic link | provider API accepts request | Supabase request receipt; account is only after a valid callback session | “Link request accepted” only when API returns success; never “you’re in” before session proof |
| Prepare/copy/share postcard | rendered card, copy success, or native share resolved | none for preparation/copy; recipient delivery is unknowable here | “Copied” or “share sheet closed”; never sent/delivered/opened/joined |
| Referral/reward | none admitted | server-side accepted/joined lifecycle and idempotent reward ledger | unavailable; no reward, invitation-success or BEST FRIENDS claim |

## Journeys and required states

| Journey | New / returning / mobile / accessible states | Failure and retry contract |
|---|---|---|
| Building arrival | New visitor sees all three choices without hotspot hunting. Returning visitor may be shown only a locally-known selection, never an unverified delivery/account state. Mobile uses labelled controls and a visible writing desk; keyboard selection uses button semantics and `aria-pressed`; reduced-motion scroll must not hide selection. | Missing images/JS leave standard links and an explanation; do not replace the counter with a blank decorative room. |
| Newsletter | Anonymous or returning visitor enters one email. Before submit, disclose Buttondown, purpose/cadence, privacy and unsubscribe. A request state must be announced in `aria-live`; mobile must not trap the popup/form. | Empty/invalid email: browser validation plus readable prompt. Opaque popup, blocked popup, network/provider/duplicate/confirmation-pending: do not fabricate success; show recoverable next action and direct Buttondown route. Retry must be user initiated and cannot create a client-side “already subscribed” truth record. |
| Magic-link handoff | Post Office only routes to `/resident-card.html`; signed-in visitors get a clear “open/manage card” continuation rather than another claim. The Resident Card owns new/returning, callback, session and logout states. | At handoff failure, retain the current counter and link. At Resident Card: request accepted, no email, expired/used link, redirect/callback failure, session restore and logout all require visible states. A same-browser recommendation is usability guidance, not an account prerequisite unless provider evidence proves it. |
| Postcard | New/returning users can select a card, write locally, optionally sign it, choose native share when available or copy/SMS/email fallback. The signature stays in local preview/message text, not URL/storage/analytics. Mobile native-share availability is detected rather than presumed; keyboard/screen-reader users receive labelled card, note, button and status changes. | Cancelled share, unsupported share, clipboard denial, malformed/oversize note, offline and recipient-link failure all keep the note local and say exactly what was not completed. “Copy succeeded” is the only copy receipt. No recipient address/contact is collected or uploaded. |
| Recipient/referral | A recipient may open only a public postcard representation. Current query-string/local-storage sender/note conventions are not an authorised private-invite store. | Invalid, expired or private links disclose no sender/note/account existence. Referral is unavailable until a separate opaque-token, two-account contract exists; no retry may grant a reward.

## Technical, data, privacy and economy contract

- **Frontend:** `post-office.html`, `content/site/post-office.js`, `postcard.html`; Resident Card uses `resident-card.html` and `script.js`; MAiKEOVER contains a separate Supabase auth/handle implementation. These are related surfaces, not proof that their delivery contracts agree.
- **Providers/stores:** Buttondown owns subscription and unsubscribe truth. Supabase Auth owns magic-link request/session truth; any profile/RPC/RLS result remains its own receipt. Browser local storage can remember a draft or client attempt only. Native Share/clipboard are browser/device APIs. No provider receipt was inspected in this cycle.
- **Privacy:** never send email, postcard note, contact/recipient data, auth callback material, raw share URL, handle or invite token to analytics. Do not encode a private note or identity in a public URL. Link to privacy/terms and provider unsubscribe before/at email collection. Provider evidence is accessed only through an approved test account and aggregate/redacted receipt.
- **Idempotency:** a newsletter request must be safely repeatable at the provider; a magic-link resend is rate-limited and does not create another identity; a future invite uses an opaque single-purpose ID and server-side state machine; a reward grant uses an immutable completion ID plus one idempotency key. Client storage, share-sheet resolution and a page visit are never dedupe keys or grant evidence.
- **Rewards/revenue:** no current postcard/referral reward exists. Future reciprocal recognition is free, capped, reversible, self-invite/fraud resistant and governed by Identity, Rewards & Connection. No charge, credit, purchase, referral access, address/data sale or paid retry is permitted. Optional stationery/keepsakes may be researched only after fulfilment, ownership, refund and delivery proof; they must not gate newsletter, normal sharing, core learning or accessibility.
- **Analytics:** the generic dictionary events may be used only with `product_id=post-office` and safe categorical properties. Add product events only after implementation approval: `newsletter_attempted` (non-authoritative), `newsletter_provider_result` (authoritative provider category, no email), `magic_link_request_result` (authoritative API category), `auth_session_established` (authoritative session category), `postcard_share_capability`, `postcard_copy_result`, and future `invite_accepted`/`reward_granted` only from server ledger. Exclude all sensitive data named above. Plausible/Clarity cannot certify provider delivery.

## Ownership, upkeep and acceptance

- **Parent steward:** Post Office — building clarity, routes and public promise.
- **Separate contracts:** Newsletter Delivery, Magic-link Sign-in and Postcards/Referral are separately specified because their provider, authority, privacy, retry and release criteria differ.
- **Required owners/guilds:** backend-integration, identity-rewards-data, safety-privacy-security, UX-service, accessibility-responsive QA, analytics-voice-of-customer and release-manager. Magic-link work also hands off to the Resident Card/MAiKEOVER owner.
- **Maintenance triggers:** any Buttondown, Supabase/Auth/RPC/RLS, native-share, privacy/terms, postcard copy, public-promise, weekly-send or incident change; plus 24–72 hours after an approved release and quarterly provider/privacy review.
- **Acceptance:** Repair 1 passed independently at 87/100. Repair 2's
  collection uniqueness/atomicity passed, but its rejudge failed at 86/100
  because a repeated failed Retry dropped keyboard focus. Repair 3 restores
  focus only after user-triggered retry failure while leaving initial failure
  non-intrusive; it requires independent source/exact-artifact rejudge.
  Preserve both prior judge reports. Use
  `build-packet-controlled-service-suite-2026-07-25.md` only for a later
  authorised provider test. Product remains **VERIFIED LOCALLY / REJUDGE
  REQUIRED** and is not publicly cleared until independent
  visual/accessibility/privacy review and public-origin verification pass.
  Provider outcomes remain held until an approved test identity yields
  redacted receipts. Referral/reward remains **HIDE/LABEL** unless its future
  lifecycle independently passes.

## Source trail and reconciliation notes

Facts observed locally: the direct Buttondown handoff in `post-office.html`; direct Buttondown POST plus local submitted flag in `script.js`; Resident Card magic-link/status code in `script.js`; Supabase OTP/session/RPC code in `maikeover.html`; local compose/share code in `postcard.html`; the registry, charter, launch deep dive, public-promise registry and event dictionary dated 2026-07-25; and cycle 5 deterministic source/exact-artifact evidence dated 2026-07-26. Inference: these sources establish wiring and local states, not external delivery/account/referral outcomes. This specification supersedes no locked creative decision and does not authorize a service call.
