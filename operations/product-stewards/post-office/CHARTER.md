# SUNNYVAiLE Post Office steward

**Status:** BUILDING — manual deep dive completed; persistent runner, analytics pull and delivery monitor are NOT WIRED
**Owner:** Codex building/product steward · Ali (public voice, trust and consequential growth/revenue decisions) · Portfolio orchestrator (priority, lanes and release reconciliation)
**Relationship to AW-003:** MERGE — a delivery-looking interaction is not a delivery outcome without a service receipt.

## Product promise

The Post Office makes LAiDIES' weekly relationship tangible: a visitor can choose a useful Wednesday Postcard/newsletter, make a Resident Card through an honest sign-in handoff, or compose a shareable SUNNYVAiLE postcard. It should feel like Penny's useful counter—clear consent, a real next step and a graceful failure—not a decorative mail room or a growth funnel disguised as friendship.

## Scope and sub-champions

- **Building steward:** arrival, room/desk/rack clarity, route choice, visual/brand quality, explicit delivery truth and return route.
- **Newsletter Delivery:** Buttondown form, consent, attempted/succeeded/confirmed state, weekly editorial delivery and unsubscribe/privacy path.
- **Magic-link Sign-in:** email handoff to Resident Card/Supabase, session recovery and account privacy; implementation remains owned by the Resident Card sub-champion.
- **Postcards/Referral:** compose, native-share/SMS/email/copy-link/receive routes, invite attribution and any future reciprocal reward; authoritative referral/reward work remains with Identity, Rewards & Connection.

The steward does not send email, submit forms, inspect subscriber records, access Supabase, alter Worker/API code, publish, deploy or create incentives. It records the visible user contract and routes faults to their narrow owner.

## Journey contract

| Journey | Trigger | Honest completion | Current permissible claim | Failure/retry boundary |
|---|---|---|---|---|
| Newsletter signup | Valid email submitted to Buttondown embed/Worker path | Service confirms subscription or a verified double-opt-in confirmation occurs | An iframe submission is only an **attempt** when response cannot be observed | Invalid/network/duplicate/consent/unsubscribe paths must be intelligible |
| Magic-link start | Visitor requests sign-in | Auth provider reports link request; account is complete only after downstream verified claim | Requesting a link is not a Resident Card or signed-in result | Expired/missing email/redirect/retry are owned by Magic-link sub-champion |
| Compose postcard | Visitor selects card, writes a note and chooses delivery channel | Share intent is prepared | Composing/copying is local; no recipient, delivery or join outcome is inferred | Cancel, unsupported native share and channel fallback must remain clear |
| Native share/email/SMS/copy | Browser/native share action returns | At most share sheet closed/copy succeeded | Share-sheet closure cannot prove sent, opened, delivered, joined or rewarded | Preserve a safe fallback without leaking recipient data |
| Receive/invite | Recipient opens a shared link | Recipient sees sender/card/note only as safely encoded or durably authorised | No durable invite lifecycle or reward is currently claimed | Invalid/expired/private link must fail safely without disclosure |

## Non-negotiable gates

- Newsletter consent, data use, unsubscribe and third-party boundary are clear; never treat a form post as subscription confirmation when it is opaque.
- Native sharing does not upload contacts or prove recipient behaviour.
- A referral/reward requires an opaque invite, authoritative accepted/joined event, idempotency, fraud/self-invite controls, visible result and refund/reversal semantics.
- No email address, private postcard note, handle, contact or raw message goes into analytics or a public URL unnecessarily.
- The room must remain a real counter/rack/writing-desk experience, with obvious action and return states; it must not use vague VIP, adult-membership or coercive referral language.

## Cadence

Invoke on changes to Post Office/postcard UI, Buttondown/Worker/Supabase/native-share dependency, privacy/terms, weekly send, delivery incident, public claim or Ali/orchestrator request. No trigger means no idle model call. Every run records exact service version, route, outcome evidence/limits, privacy review, classification, narrow owner and retest; accepted implementation is a separate authorised lane.
