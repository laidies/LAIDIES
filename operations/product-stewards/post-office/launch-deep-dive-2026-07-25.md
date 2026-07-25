# SUNNYVAiLE Post Office — launch deep dive

**Status:** REPORT READY — evidence-limited, read-only assessment
**Date:** 2026-07-25
**Scope:** Post Office building, Buttondown newsletter path, Resident Card magic-link handoff, postcard compose/share/receive/referral implications, native-share and privacy/reward truth. No form, email, share, authentication, Supabase, Worker or public-origin mutation was performed.
**Relationship to AW-003:** MERGE. A rendered route and a local action are not delivery or account proof.

## Executive verdict

The Post Office is a strong brand-native hub: a counter can make weekly editorial delivery, a membership handoff and an act of useful sharing feel like different, understandable choices. Its delivery contracts are **PARTIAL/NOT TESTED**. The EOD release correctly narrowed misleading referral claims: native sharing now reports only share-sheet closure and no longer represents delivery, join, reward or a mutual BEST FRIENDS outcome.

The launch-safe offer is therefore: choose a newsletter signup attempt with visible third-party/privacy context; start a sign-in request; or prepare/copy/share a postcard. It must not imply that a subscription, email receipt, recipient delivery, invitation acceptance, join, Card or reward occurred unless the service proves it.

## New, returning, anonymous and signed-in journeys

| Journey | Evidence | Technical | Comprehension | Value | Honesty | Experience | Classification |
|---|---|---:|---:|---:|---:|---:|---|
| Anonymous building arrival | Building construction record says postcard rack, rent box and archive are implemented; historical desktop/mobile postcard compose/receive QA exists. | **PARTIAL** | **PARTIAL** | **PASS — product direction** | **PARTIAL** | **PARTIAL** | **FIX BEFORE LAUNCH** exact public mobile/keyboard walkthrough |
| Newsletter signup | Buttondown is the named email path; EOD closure says an opaque iframe POST reports attempt only. | **NOT TESTED** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** authorised service test |
| Magic-link start | Post Office/product inventory identifies sign-in handoff; Resident Card contains Supabase OTP/claim path. | **NOT TESTED** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** controlled fresh-email link suite |
| Postcard compose/share | Matrix records thirteen cards and URL/SMS/email/native-share mechanics passed locally in representative states. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **HIDE/LABEL FOR LAUNCH** only local preparation/share intent is truthful |
| Recipient/invite/referral | Earlier lifecycle claim failed; EOD closure removed sent/opened/joined/reward claims and referral writes. | **NOT AVAILABLE** | **NOT APPLICABLE** | **NOT APPLICABLE** | **PASS only while unavailable** | **NOT TESTED** | **HIDE/LABEL FOR LAUNCH** |
| Signed-in return | Depends on Resident Card/Supabase session; no identity test was performed. | **NOT TESTED** | **NOT TESTED** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** coordinated account test |

No historic local pass is deployment/public service proof.

## Visual, UX, mobile and accessibility assessment

The object-world direction is sound: a rack offers cards, a writing desk holds composition, and the counter should tell a visitor what will happen before she gives data. The construction status records a v2 Post Office and postcard writing-desk journey, with comic-style Penny and replaceable postcard art. The EOD release reports exact-artifact browser coverage without broken images/horizontal overflow across critical routes, but this deep dive did not run a clean-user interaction, screen reader, keyboard, iOS/Android native-share or service-failure test. Those outcomes remain **NOT TESTED**.

The essential accessibility rule is plain outcome language: selected, copied, share sheet opened/closed, signup attempted, email link requested, delivery unknown. The status must not depend on animation, colour, hidden state or an external service silently succeeding.

## Delivery, privacy and service plumbing

- **Buttondown/Worker:** a newsletter embed or Worker request is an external service boundary. If its response is opaque, the UI may state that a request was sent/attempted—not subscribed, delivered or receiving Wednesday mail.
- **Supabase magic link:** sign-in is a Resident Card account journey, with email, redirect, session, profile and privacy implications. The Post Office can only hand off and explain it; it cannot certify the account result.
- **Postcard/native share:** browser native-share, SMS/email/copy-link routes support user-controlled outward sharing. They cannot observe recipient/device/email delivery without a different, consented service contract.
- **Referral/reward:** the prior local handoff and query-style sender/note approach does not constitute a durable invitation record. Any future system needs opaque tokens, server-side lifecycle, consent, idempotency, self-invite/fraud controls and a separate reward ledger.

Do not expose email, contact data, personal postcard note, raw invite state or handles in analytics. Give direct privacy/terms/unsubscribe routes before collecting personal data.

## Analytics gap

Plausible/Clarity embedding is not a delivery monitor and no aggregated evidence packet was available. A future privacy-safe dictionary may measure anonymous counter arrival, route selection, form attempt/result category, native-share availability/fallback, copy success, error/retry and voluntary later return. It must exclude email, note text, contact/recipient data, magic-link tokens, raw URLs and personal handles. A Buttondown send/confirmation should be measured from authorised provider evidence, not a click event.

## Launch gaps and improvement direction

1. **FIX BEFORE LAUNCH:** test newsletter form/confirmation/unsubscribe/error truth with explicit authority and a test address.
2. **FIX BEFORE LAUNCH:** test magic-link request through restored/expired/retry session with the Resident Card owner.
3. **HIDE/LABEL FOR LAUNCH:** retain the no-delivery/no-referral/no-unlock boundary. The EOD repair is a correctness success, not a missing feature to conceal.
4. **FIX BEFORE LAUNCH:** check postcard query/copy/native-share output and receive/error routes for data minimization and safe failure.
5. **POST-LAUNCH:** choose one primary counter action based on useful voluntary return and consent, not signup pressure. Add a real reciprocal connection loop only after the lifecycle is durable.

## Ethical revenue opportunities

The building can later support optional stationery, printable packs or well-delivered digital keepsakes. It must never monetize email addresses, invite credit, basic learning or accessibility; sell Clips; force a subscription to share; reward message volume; or use an implied cash conversion. Revenue tests require transparent ownership, delivery, refund and privacy proof first.

## Evidence limits and next trigger

This review did not submit an external form, send/copy a postcard to a recipient, open a native share sheet, invoke the Worker, authenticate by magic link, inspect Buttondown/Supabase, or test public-origin external outcomes. It cannot claim subscription, delivery, account, reward or referral proof.

**Next trigger:** after an authorised controlled external-state suite, reconcile the observed service receipts and user-visible failure/retry states into AW-003; otherwise keep the current bounded promises.

## Learning scan

No new painpoint entry is created by this documentation-only pass. Reapplied BTB-010–012 (configured service/agent is not a running verified outcome), BTB-069 (a client event is not an authoritative completion) and the EOD Postcard correction: share-sheet closure is not delivery, opening, joining or reward.
