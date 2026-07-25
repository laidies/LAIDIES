# Magic-link Sign-in — subproduct contract

**Status:** SPECIFIED — owned operationally by Resident Card/MAiKEOVER; the Post Office is only a handoff. Real request/callback/session evidence is NOT TESTED.

**Job:** give a visitor a low-friction way to establish a Resident Card account without turning a requested email into an account claim. Supabase Auth is authoritative for request and session; the profile/handle/RLS layer is authoritative for any later card claim. The Post Office must link to `/resident-card.html`, where `script.js` contains the older request flow and `maikeover.html` contains the current direct OTP/session/handle flow; release work must reconcile these two client paths before a single public promise is made.

| State | Completion / visible result | Failure and retry |
|---|---|---|
| anonymous/new | explain email purpose, privacy and next step | valid-email validation; no account claim |
| request accepted | API response receipt; “sign-in link requested” | email delay/no-email, provider error and rate limit give a non-enumerating retry path |
| returning | same request language; never reveal whether address exists | safe resend/cooldown, no account enumeration |
| callback/session | `getSession`/provider callback establishes session | expired/used/malformed redirect returns a calm “link no longer works; request another” state |
| signed in | authenticated session plus clear Card continuation | logout/session-expiry/offline restores anonymous state without destroying local draft |
| profile/handle | separate authenticated profile/RPC/RLS receipt | taken/invalid/reserved/visibility error is distinct from auth result |

**Privacy/idempotency:** never log email, token, callback URL/hash, profile answers or session material. Request/resend idempotency and throttling must be provider/server controlled; client pending flags only drive UI and cannot prove send or login. No sign-in/referral action grants a reward or changes a balance. **Analytics:** request result and session-established category only, source-marked; no sensitive properties. **Required test identity:** an approved fresh/disposable inbox and a second browser/device; test request, receive, click, callback, expired/used link, resend/rate limit, logout, session restore, profile/handle, privacy and two-device boundary.
