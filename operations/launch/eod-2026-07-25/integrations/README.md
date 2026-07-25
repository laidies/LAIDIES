# EOD 2026-07-25 — integration readiness audit

**Status:** REPORT READY — integration slice is **NO-GO** for claims that a
community action, invitation, or subscription has a verified downstream result.

**Scope:** exact curated candidate at `local-public-artifact/`, source-only
inspection of the Worker, and harmless public `GET`/`OPTIONS` requests on
2026-07-25. No form was submitted; no account, comment, reward, API record, or
paid call was created. Therefore provider dashboards, Supabase RLS, actual
email delivery, Hyvor moderation/authentication/error UI, and real native-share
completion remain **NOT TESTED**.

## Verdicts and EOD containment

| Surface | Verdict | Evidence | Smallest EOD containment |
|---|---|---|---|
| Community reward / Hyvor completion contract | **FAIL** | `script.js:4077-4107` creates a “post” reward solely in local storage. `script.js:6459-6470` invokes that function on a room **visit**. The preview board says it is not public/moderated but awards the same badge at `5845-5872`. Girl Talk awards before a room can be observed at `games/girl-talk.html:1221-1237`. | Hide post-to-earn / “posted” badges and Girl Talk community-completion rewards. Keep rooms as optional discussion only; say rewards are local, honour-system souvenirs until a supported provider event/API/webhook bridge is built and tested. |
| Hyvor embed availability | **PARTIAL** | Seven room pages carry a configured widget, e.g. `community/wins.html:48-50`; `https://talk.hyvor.com/embed/embed.js` returned HTTP 200. The inline host has no load/error/timeout fallback (`community/wins.html:48-50`); the Sorority House handles only its **local preview** (`content/site/sorority-house-v2.js:195-220`). | Keep a visible pre-embed sentence: “Comments may require Hyvor sign-in; if the panel fails, try again later or use [contact route].” Do not describe posting/moderation as verified. |
| Buttondown newsletter: endpoint and form affordance | **PARTIAL** | Public/candidate homepage has a real Buttondown form (`index.html:736-739`); Post Office has the same (`post-office.html:402-408`). Candidate Worker URL is wired at `script.js:5932-5934`; its public preflight returned HTTP 204 with only `https://laidies.ai` allowed. | Permit subscription CTA, but label confirmation as pending until the user receives it. Do not claim a list addition from client UI alone. |
| Buttondown failure truthfulness | **HIDE-LABEL** | On Worker/network failure, `script.js:6033-6046` submits a hidden iframe then unconditionally renders `created`; the fallback cannot observe Buttondown’s result. | Change fallback copy to “We opened/attempted the Buttondown signup—check your inbox or retry from the Post Office,” or hide the inline success state until a real response is available. |
| Cloudflare subscribe Worker source / CORS / safe health | **PASS** (bounded) | Worker permits only the four configured origins and `POST, OPTIONS` (`worker/subscribe.js:9-29,42-53`), does not expose upstream bodies (`1-7,88-107`), and sources Buttondown credentials from an environment secret (`67-83`; `worker/wrangler.toml:6-20`). Harmless public checks: `OPTIONS` from laidies.ai → 204 with exact origin; `GET` → 405; `OPTIONS` from evil.example → 403. | Keep as-is. Before broad launch, run one controlled real signup plus retry/rate-limit test and record the result; this audit did not use POST. |
| Supabase auth boundary and reward sync | **PARTIAL** | Candidate exposes only a publishable config (`content/site/supabase-config.js:1-4`). It uses passwordless/new-account flow (`script.js:3092-3121`) and syncs with `user_id,dedupe_key` upserts (`2920-2966`). Code deliberately avoids duplicating email in a potentially public profile (`2902-2918`). But no RLS/schema/auth-email/provider test was authorized. | Preserve the privacy language but label cross-device sync as in-progress. Do not claim authentication, profile privacy, idempotency, or recovery as verified until an owner runs the account/RLS test matrix. |
| Resident Card / rewards promise | **HIDE-LABEL** | Resident Card promises cross-device saving (`resident-card.html:321-323`) while its own privacy note says sync is still being polished (`358`) and the signed-in path says rewards remain “mostly local” (`script.js:3022-3031`). | Replace launch-facing “saves … across every device” with “keeps local progress; signed-in sync is being tested,” or remove the promise pending two-device verification. |
| Town Hall submission boundary | **PARTIAL** | `town-hall.html:631-710` inserts user input directly into `town_hall_feedback`; it includes authenticated `user_id` and email when present (`673-689`). There is a clear offline/error state (`665-670,704-708`), but no RLS/abuse/rate-limit test was run. | Do not promote it as private or moderated. Label it “feedback form; delivery not yet verified” or temporarily hide submission until RLS/abuse and privacy ownership are checked. |
| Plausible / Clarity presence and privacy disclosure | **PARTIAL** | Artifact has 91 HTML files; Plausible appears in 84 and Clarity in 75. Homepage injects both (`index.html:487-500`), and both script URLs returned HTTP 200. Privacy copy describes Clarity masking/session playback (`privacy.html:47-48`), but this audit cannot verify provider configuration, masking, retention, consent obligations, or whether analytics cover the remaining pages. | Keep the disclosure, but do not call masking/no-cookie claims “verified.” Add a release checklist item for vendor settings and a deliberate page-coverage decision. |
| Native share / copy / text / mail fallback | **PASS** mechanically; **HIDE-LABEL** for send/reward claim | Postcard exposes share, SMS, mail, and copy controls (`postcard.html:171-179`); copy falls back to a prompt (`372-377`), and mail/SMS build encoded links (`352-358`). `navigator.share` resolution says “Sent!” and repeats an unverified reward lifecycle (`362-370`); invitation attribution is only local storage (`270-296`). | Keep the four controls. Replace “Sent!” with “Share sheet opened” and remove BEST FRIENDS/join-unlock language (`155-159,181-184,214-226`) until a durable sender/recipient lifecycle exists. |

## Public-origin observations

`https://laidies.ai/` returned HTTP 200 with `x-content-type-options: nosniff`
and `referrer-policy: strict-origin-when-cross-origin`. Its retrieved HTML
contains the same Buttondown form plus Plausible and Clarity loaders. This is
reachability evidence only, not a public browser, transaction, cookie, or
provider-account test.

## Retest order

1. Contain all local-action-as-external-outcome claims (community and postcard).
2. Run an approved two-account, two-device Supabase lifecycle: new/returning
   magic link, profile privacy/RLS, idempotent reward sync, sign-out/recovery.
3. Run one controlled Buttondown signup through each promoted form and Worker
   path; verify confirmation, duplicate, outage, and rate-limit copy.
4. Exercise Hyvor signed-out/signed-in, rejected/moderated, offline and
   blocked-script states without granting local rewards.
5. Inspect vendor dashboards/settings for Plausible and Clarity against the
   privacy notice, then decide explicit coverage/consent treatment.

## Learning scan

Qualifying reusable finding: a local event named `community_room_post` is not
evidence of a provider-side post; this exact substitution appears both in a
preview board and on page visit. Prevention rule: reward writers must name an
authoritative external event, provider ID, idempotency key, and retry/failure
state before any UI says “posted,” “sent,” “unlocked,” or awards a reward.
Possible Behind the Build angle: “Why a visit is not a post: we stopped giving
out receipts before the action happened.” This is recorded here because the
task write boundary forbids changes outside `operations/launch/eod-2026-07-25/integrations/`.
