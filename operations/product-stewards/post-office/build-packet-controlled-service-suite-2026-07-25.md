# Post Office — controlled service build/test packet

**Status:** SPECIFIED — preparation only; no external mutation is authorised by this packet.
**Outcome sought:** one redacted evidence packet that distinguishes local action, provider acceptance, authenticated session and unavailable referral/reward outcomes for the exact release candidate.

## Scope and preconditions

| Work item | Owner | Output / evidence | Gate |
|---|---|---|---|
| Freeze candidate and route hashes | release-manager | exact local/public candidate, commit/deploy identifier if available, timestamp | no test against an unnamed version |
| Authorise isolated test identity | Ali/designated privacy owner | written authority, disposable inbox, ownership, retention/deletion date; no real subscriber/customer data | required before Buttondown or Supabase mutation |
| Newsletter suite | backend-integration + safety/privacy | redacted valid/invalid/duplicate/confirmation/unsubscribe/popup-block/network/provider-failure receipts | Buttondown only; no subscriber inventory access |
| Magic-link suite | Resident Card/MAiKEOVER + identity/rewards | redacted request, inbox receipt, callback session, expiry/used/resend/logout/restore and second-device results | Supabase only through approved test identity |
| Postcard suite | frontend + accessibility | mobile/desktop keyboard/screen-reader/native-share availability/cancel/copy-denied/mail/SMS fallback observations | no recipient send; no contacts |
| Referral disposition | identity/rewards + safety/privacy | explicit unavailable verdict or, only after separate approval, two-account lifecycle design | no existing RPC/query/local flag is treated as referral proof |
| Independent review | UX/accessibility, safety/privacy, release manager | pass/fail matrix with exact evidence and limitations | maker cannot self-clear |

## Test protocol

1. Use a fresh profile/incognito browser and named device class; record no email, token, note, recipient or screenshot containing them.
2. Record frontend receipt separately from provider/session receipt. Provider acceptance is not delivery; magic-link request is not session; share-sheet closure is not send/open/join.
3. Run failure before retry: invalid input, offline/blocked popup or provider error, duplicate/resend, expired/used callback, native-share cancellation/unavailability, clipboard denial.
4. Verify every status is visible without colour/motion, announced accessibly, keyboard reachable and mobile legible. Confirm no automatic charge, reward, account claim or non-consensual re-submit occurs.
5. Cleanup: unsubscribe/delete test identity according to approved policy; retain only redacted categorical receipts and candidate binding.

## Acceptance matrix

| Gate | Pass evidence | Independent owner |
|---|---|---|
| Product/trust | each visible claim maps to the correct receipt; unverified lifecycle/reward remains hidden/labelled | product steward |
| Privacy/safety | no sensitive value in analytics, URLs, logs, screenshots or retention packet; provider only sees the approved test email | safety-privacy-security |
| Accessibility | keyboard, labels, live status, errors/retry, reduced motion and mobile controls pass | accessibility-responsive-qa |
| Backend/identity | provider/request/session result, dedupe/resend and logout/restore outcomes are distinct; no reward ledger inferred | backend-integration + identity-rewards-data |
| Release | exact candidate/public origin is bound; rollback means restore prior truthful copy or disable the affected handoff | release-manager |

**No-charge/retry rule:** all journeys remain free; retries are user initiated and provider-safe. A failure cannot mint/refund/revoke a reward because none exists.
**Measurement:** only aggregate action/result/failure categories from the event dictionary; review 24–72 hours after a permitted release, and trigger an incident immediately on a false-success, privacy or authentication defect.

## Blockers and approval request

This packet cannot run until an approved test identity and written authority name: (1) the disposable mailbox and its owner, (2) allowed Buttondown/Supabase mutations, (3) confirmation/unsubscribe/delete cleanup, (4) whether an exact public candidate may be used, and (5) permitted redacted evidence retention. Native-share/copy local checks need no external recipient; all recipient delivery and referral work remains out of scope.
