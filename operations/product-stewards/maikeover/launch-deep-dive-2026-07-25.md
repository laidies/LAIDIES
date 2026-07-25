# MAiKEOVER on MAiN — launch deep dive

**Status:** REPORT READY — evidence-limited, read-only assessment
**Date:** 2026-07-25
**Scope:** `/maikeover`, `/resident-card`, `/laidies-card` (Closet/progression), local storage, configured Supabase claim path, avatar-service dependency, reward/visibility implications and existing launch evidence. No account, avatar, deployment, source, database or public change was made.
**Relationship to AW-003:** MERGE. This report is not an authentication, privacy, reward or public-origin pass.

## Executive verdict

MAiKEOVER has a distinctive and valuable member-making job: the salon/vanity metaphor makes identity and setup more emotionally legible than a conventional profile form. Its local card-building and Closet foundations are meaningful. The complete account-and-progression product is **PARTIAL**, not verified: local state, authenticated profile state and durable rewards do not yet have end-to-end evidence as one coherent promise.

The safest bounded launch promise is: make and keep a Resident Card on this device; optionally begin a handle/sign-in flow; use the Closet for clearly device-local supported collections. Do not promise cross-device restoration, public-card visibility, invitation rewards, background unlocks, durable clip balance or delivered redemption until the named contract passes.

## Intent, visual system and audience comprehension

`operations/building-design-briefs/maikeover.md` locks the building verb: sit in the chair, get made over, walk out a member. The vanity mirror should hold the live card, counter tools should change it, candidate mirrors should show avatar choices and the reception desk should house the guest-book claim. This is the correct object-world standard; the room must operate as a salon, not a decorative header above a long form.

The current implementation preserves working local preview, avatar candidates, curated style/soundtrack/saint/era choices, local save and the Supabase claim flow. `content/site/maikeover-v2.js` adds tool-tray grouping, live completion state and an arrival message based on `laidies_card_username`. Historical design QA shows a room-first candidate with 390×844/1440×900 construction evidence; that does not by itself approve remote services or public user outcomes.

## Journey verdicts

| Journey | Current evidence | Technical | Comprehension | Value | Honesty | Experience | Classification |
|---|---|---:|---:|---:|---:|---:|---|
| New anonymous arrival | Building brief + local code show a vanity/card flow and local greeting. | **PARTIAL** | **PARTIAL** | **PASS — product concept** | **PARTIAL** | **PARTIAL** | **FIX BEFORE LAUNCH** clean-browser/mobile walkthrough and honest local-state text |
| Make/save local card | `maikeover.html` persists selected card fields/avatar to local storage; live mirror reflects choices. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **FIX BEFORE LAUNCH** clean-device/save/reload/storage-failure/return test |
| Avatar generation | Configured remote Worker receives image or trait input and returns candidates in code. | **NOT TESTED** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **NOT TESTED** | **FIX BEFORE LAUNCH** real dependency, privacy, malformed/error/retry and candidate-selection test |
| Claim/sign in | Code imports Supabase client, uses availability RPC, magic-link OTP and `member_profiles` upsert; migrations seek owner-only profile fields. | **NOT TESTED** | **NOT TESTED** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** fresh-email end-to-end journey |
| Returning signed-in resident | Arrival can read a local handle and query a profile from a session. | **NOT TESTED** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** logout/login/second-device distinction |
| Public/private Card | RLS/view migrations and public-card paths exist; no two-account proof was available. | **NOT TESTED** | **NOT TESTED** | **PARTIAL** | **NOT TESTED** | **NOT TESTED** | **FIX BEFORE LAUNCH** two-account privacy test |
| Closet/Puffy progression | Reopening matrix records a locally verified Vocab → Puffy → Closet → exact-section return/removal journey and device-local 10-sticker pouch. | **PASS locally** | **PASS locally** | **PASS locally** | **PASS locally** | **PASS locally** | **HIDE/LABEL FOR LAUNCH** account/cross-device claims remain unavailable |
| Clip/reward/redemption progression | `clip-bank.js` derives clips and Book Fair spends from local storage; strategy records no durable cross-device ledger and incomplete delivery. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **HIDE/LABEL FOR LAUNCH** |

No “PASS locally” cell establishes deployment or public verification.

## Persistence, privacy and reward plumbing

The system currently has three different state classes that must never be blurred:

1. **Device-local working state:** card selections, avatar data URL, handle hint, Puffy choices/bookmarks, quiz/Express-Tour-derived Clip balance and Book Fair redemption records use browser local storage.
2. **Account state:** the claim code uses Supabase session/auth, handle availability RPC and `member_profiles`; profile fields are designed to be owner-only, and a visibility toggle is stored at claim. The exercised outcome is still unverified.
3. **Selected durable rewards:** Closet code can read `member_reward_events`, but the shared economy has no established authoritative earn/spend/refund ledger spanning every source. Existing strategy explicitly says background selections are choices, not owned unlocks; invitation/postcard lifecycle and Clip grants are not complete.

The public state must therefore say “this device” where appropriate, preserve optional profile choice, avoid collecting/telemetrying personal card or avatar details, and never use an auth-looking screen as proof that a magic link, profile write or public Card succeeded.

## Accessibility and mobile

Resident Card QA records 390×844 and 1440×900 local construction checks, no page-level horizontal overflow, present email/magic-link control, present profile groups and correctly behaving single-choice/accordion interactions. The later EOD closure says all 31 generated profile controls received contextual accessible names and the scoped regression passed. These are valuable evidence but do not cover screen-reader operation, keyboard lifecycle, auth-error focus, the MAiKEOVER avatar controls, network failure, public pages or account outcomes. Those remain **NOT TESTED**.

## Analytics and evidence gap

Plausible is embedded but no dated aggregate packet, funnel definition or privacy-safe event dictionary was available. Do not treat page views or a generated avatar as identity completion. When wired, record only aggregate steps such as room arrival, local card save attempt/result, avatar dependency failure, auth-link attempt/result, claim result, visibility selection, Closet return and device-vs-account restoration outcome. Exclude names, email addresses, avatar images, profile answers, public handles and raw relationship/invite content. Clarity use must be sampled, consent-aware and never a source of private profile data.

## Launch gaps and improvement direction

1. **FIX BEFORE LAUNCH:** run the controlled anonymous/local/authenticated/two-device and two-account privacy suites. They are the required proof, not optional QA.
2. **FIX BEFORE LAUNCH:** test the avatar Worker as a visible dependency, including image/trait input, failure and privacy retention boundary.
3. **HIDE/LABEL FOR LAUNCH:** retain device-local progress wording; do not promote cross-device restoration, public profile, a delivered reward, paid-in Clip balance, invitation outcome or background unlock.
4. **POST-LAUNCH EXPERIMENT:** after trust gates pass, compare local-first and claim-first timing—not more profile questions—to find the clearest low-pressure membership ritual.
5. **POST-LAUNCH FOUNDATION:** create one append-only entitlement ledger before adding new shops, referral incentives or personalization offers.

## Ethical revenue

There is a credible later value exchange in optional, genuinely delivered personalization/display objects or physical/digital keepsakes, informed by aggregate demand rather than by coercive rewards. It is not launch work. Do not sell Clips, create cash-equivalent currency, gate foundational learning/accessibility, make identity-changing imagery a paid shortcut, reward spam, or impose streak/expiry pressure. Any paid offer needs ownership, delivery, refund, privacy and public QA proof first.

## Evidence limits and next trigger

This deep dive inspected code, design/QA records and current launch documentation. It did not submit an email, authenticate, create an account, upload an avatar, test Supabase RLS with two identities, inspect private data, redeem a reward, use a second device, or operate a public-origin interaction. It cannot upgrade account, privacy, avatar, reward or cross-device status.

**Next trigger:** execute the controlled identity/privacy/two-device suite on the exact public release; then reconcile result, limitations and any accepted repair lane into AW-003.

## Learning scan

No new painpoint entry is created by this documentation-only pass. Reapplied: BTB-010–012 (a documented mechanism is not a running/verified product), BTB-069 (a UI event/local record is not an authoritative outcome), and the standing privacy rule that profile/avatar/reward data must not be exposed or inferred from analytics.
