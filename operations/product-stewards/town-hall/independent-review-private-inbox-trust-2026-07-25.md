# Town Hall private-inbox trust — independent review

**Date:** 2026-07-25  
**Role:** Independent judge; the judge did not make this candidate  
**Verdict:** **REPAIR REQUIRED — 73/100 — RELEASE HOLD**  
**Candidate status:** The bounded synthetic maker suite passes, but accuracy/safety/trust is below the non-compensable 17/20 floor and the direct public intake remains explicitly launch-held.

## Score

| Dimension | Score | Judgment |
| --- | ---: | --- |
| Product quality | 18/20 | The three-station room, private-inbox framing, minimal signed-in payload and accepted/rejected UI are coherent. |
| Accuracy, safety and trust | 12/20 | A shipped synthetic seam can manufacture acceptance, and a production-shaped network error is labelled as a definite rejection with a retry CTA. |
| Positive LAiDIES brand contribution | 17/20 | The civic voice is distinct and the receipt copy is restrained; false acceptance would seriously damage that contribution. |
| UX and accessibility | 14/20 | Core keyboard/mobile/live-status flows pass, but reduced-motion and control contrast do not. |
| Technical reliability | 12/20 | Exact artifact and baseline fixtures are reproducible, but the fixtures bypass the production error-classification path and the controller does not independently enforce every typed boundary. |
| **Total** | **73/100** | **Accuracy/safety/trust floor fails; candidate cannot pass.** |

## Exact P0 findings

### P0-1 — The public runtime can be switched to a synthetic adapter that manufactures acceptance

`content/site/town-hall-feedback.js:111-121` trusts any pre-existing
`window.LAIDIES_TOWN_HALL_FEEDBACK_ADAPTER` whose object self-asserts
`__testOnly: true`. There is no build-time removal, test-server token, trusted
origin/module boundary or other non-self-asserted admission check.

On the fresh exact artifact, the judge injected that global before the shipped
controller loaded, denied every external request, submitted a synthetic card
and observed:

- “Accepted by the Town Hall inbox”;
- a `laidies_town_hall_feedback_filed` timestamp; and
- the minimal payload captured only by the injected adapter.

No intake service was contacted. This means any earlier compromised or
mistakenly shipped page script can create a false civic receipt and local filed
state. A property named `__testOnly` is a label, not isolation.

**Required repair:** remove the runtime-global seam from the public artifact.
Inject fixtures at the local test server/module boundary or use a separately
built test controller that cannot ship. Add a negative exact-artifact test
proving an in-page global cannot replace the production adapter.

### P0-2 — A production-shaped network error is presented as a definite rejection and invites a duplicate

`content/site/town-hall-feedback.js:95-105` treats every resolved
`result.error` from Supabase as `code = "rejected"`. Only a thrown exception is
classified `unknown`. Supabase/PostgREST transports can represent fetch,
timeout or lost-response failures through the returned error shape rather than
throwing.

The judge served an isolated local Supabase module that returned:

`{ error: { message: "Failed to fetch", code: "", status: 0 } }`

The exact candidate displayed:

> The inbox did not accept this card. Your note is still here; check it and try again.

and changed the button to `TRY AGAIN`. It did not show the unknown-outcome
warning. A write whose response is lost may therefore be repeated—the same
duplicate failure this cycle was intended to prevent. The maker’s `unknown`
fixture throws directly from the synthetic adapter, so it does not exercise
the production classification branch.

**Required repair:** only classify an authoritative validation/policy response
as rejected. Treat transport, timeout, status-zero, malformed/missing receipt
and lost-response states as outcome unknown, preserve the note and suppress an
immediate retry. The durable solution remains an idempotent bounded server
intake with a typed receipt. Add production-adapter fixtures for both returned
and thrown error shapes.

### P0-3 — The direct anonymous intake still lacks the required server abuse and lifecycle boundary

The candidate’s own operating specification correctly holds launch until a
server-side allowlist/length gate, anti-automation/rate limits, idempotency or
safe ambiguity strategy, bounded runtime, private logging rules, staff-only
triage, retention/deletion and incident ownership are implemented and proven
in isolated staging.

The current browser still targets the public table through the anonymous
Supabase client. Client validation and RLS permit the insert but are not an
abuse, duplicate or operating boundary. The feedback form must not be promoted
or released as an operating civic inbox before this gate passes.

## Additional repair findings

1. **Typed client constraints are incomplete.** The controller validates body
   length but trusts the selected radio’s current value and subject length.
   In an adversarial DOM fixture it submitted `submission_type:
   "mutated-type"` and a 101-character subject. The database should reject
   these, but the operating spec says native and client checks agree. Enforce
   the explicit type allowlist and subject `<= 100` in the controller and
   server intake.
2. **The local accepted cue trusts any string.**
   `content/site/town-hall-v2.js:14-18` treats `"banana"` as a previously
   accepted card. Validate an exact, non-future timestamp or a versioned
   structured record before displaying “This device records one accepted
   card.”
3. **Reduced motion is incomplete.** With
   `prefers-reduced-motion: reduce`, station opening still called
   `scrollIntoView({ behavior: "smooth" })`; radio chips retained `0.16s`
   transitions and the submit button retained `0.2s`. Honor the preference in
   runtime scrolling and all feedback controls.
4. **Control contrast fails.** White text on the `#f74f9d` submit background is
   approximately **3.20:1**, below 4.5:1 for the rendered 14px text. The
   selected radio chip’s white on `#8557f4` is approximately 4.50:1 but falls
   fractionally below the threshold using exact sRGB arithmetic. Darken the
   fills or use the dark ink color, then retest computed states. The status
   text itself measured approximately 8.35:1 and passes.

## Evidence that passed

- Baseline source contract: `TOWN HALL CONTRACT PASS`, 20 checks.
- Baseline source browser: `TOWN HALL BROWSER PASS`, 33 checks, zero
  Supabase/jsDelivr attempts.
- Fresh artifact browser: 33 checks pass, zero external service attempts.
- Three stations open one at a time; direct Mayor hash and `aria-expanded`
  synchronize.
- Keyboard station activation, radio keyboard selection, polite atomic
  progress/success status, failure preservation and mobile 390px reflow pass.
- Anonymous accepted fixture sends only `submission_type`, `subject`, `body`.
- Signed-in accepted fixture adds verified `user_id` and does not copy session
  email.
- Accepted localStorage failure does not reverse the service receipt.
- Rejected/auth-failure fixtures preserve content and do not set the local cue.
- Town Regular copy explicitly says the choice is on this device and is not an
  account or cross-device record.
- Schema/RLS reconciliation confirms anonymous insert with `user_id is null`
  and authenticated own-read only; the controller no longer chains a
  post-insert select.
- Public metadata validation passes.

## Fresh exact artifact

- Path: `/tmp/laidies-town-hall-judge.qJ6Nja/public`
- Builder identity: **1,078 files / 961.4 MiB**
- Existing builder warning: exceeds the 750 MiB advisory.

| Governed file | Source/artifact SHA-256 |
| --- | --- |
| `town-hall.html` | `d61d9eaba5793df2c32708425381b446f856a2fbe057f2a4e2e0d0c7012abe4d` |
| `content/site/town-hall-feedback.js` | `468b4a148d7219284cde1e9bf4c510078043bc636c6d08bdbc6ddbe3aefb6787` |
| `content/site/town-hall-v2.js` | `53e622c0fd085f050fded31c2e85aa410ac5e5cbcd41c4e049c6cbbfa9709e` |
| `content/town-hall-v2.css` | `f17c1e6d9110daa69d219deb3e01fdf97e11283c7a5b7f566a5fda3aaa11fd74` |

## Commands and independent probes

- `node scripts/check-town-hall-contract.mjs`
- `PLAYWRIGHT_CORE_PATH=... TOWN_HALL_EVIDENCE_DIR=/tmp/town-hall-judge-source-evidence node scripts/test-town-hall-browser.mjs`
- `node scripts/build-public-site.mjs /tmp/laidies-town-hall-judge.qJ6Nja/public`
- `node scripts/validate-public-metadata.mjs /tmp/laidies-town-hall-judge.qJ6Nja/public`
- Exact-artifact rerun with `TOWN_HALL_ROOT` set to the fresh artifact.
- Isolated Playwright adversarial probes with all non-local requests denied or
  a locally fulfilled synthetic Supabase module: public synthetic override,
  returned network-error classification, mutated type/subject, corrupt local
  flag, reduced motion and computed contrast.

No real feedback, private identity, credential, production Supabase mutation,
analytics request, deployment, publication or Git operation was used.

## Remaining owner/external holds after repair

- Controlled isolated-staging anonymous/signed-in/RLS and ambiguous-outcome
  evidence.
- Server validation, rate limiting/anti-automation, idempotency, safe logs and
  incident ownership.
- Staff triage, access, retention/deletion and correction/referral operation.
- Ali’s civic-accountability and room-art approval.
- Safari, VoiceOver, native zoom and physical-device verification.
- Approved privacy-safe analytics and public-origin verification after an
  authorised deployment.
