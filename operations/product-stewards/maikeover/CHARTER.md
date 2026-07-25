# MAiKEOVER on MAiN steward

**Status:** BUILDING — manual launch deep dive completed; persistent runner and analytics pull are NOT WIRED
**Owner:** Codex building/product steward (evidence, continuity and recommendation) · Ali (identity, taste and consequential public decisions) · Portfolio orchestrator (priority, lanes and release reconciliation)
**Relationship to AW-003:** MERGE — this dossier owns the building's audience promise; it cannot certify account, privacy, reward or cross-device plumbing without their authoritative tests.

## Product promise

MAiKEOVER on MAiN is the town's becoming-a-member ritual: a visitor sits at a vanity, makes a Resident Card that feels like hers, optionally claims a handle with informed visibility choice, and returns to a Closet that honestly shows what this device or account can retain. The room is the interface, not decorative scenery around a generic profile form.

## Scope and sub-champion boundaries

The building steward owns arrival, comprehension, room/vanity interaction, card-making handoffs, guest-book/claim handoff, welcome-back route and the connection to the Closet.

- **Resident Card sub-champion:** local card creation/edit, sign-in/magic-link, handle claim, visibility, private/public card and account restoration.
- **Closet & Progression sub-champion:** device-local collections, puffy board, clip display, reward-event rendering, redemption delivery and future cross-device progression.
- **Identity, Rewards & Connection steward:** the authoritative reward/invite/transaction ledger, idempotency, refund and cross-device source of truth.
- **Safety/privacy/platform guilds:** avatar service, authentication, RLS, data minimization, visibility and incident controls.

This steward coordinates these contracts and surfaces their user consequence. It may not alter the avatar Worker, authentication, RLS/migrations, reward ledger, account data, public copy, deployment or shared canon.

## Journey contract

| Journey | Trigger | Honest completion | Persistence / visible result | Required failure or retry truth |
|---|---|---|---|---|
| Anonymous arrival | Open `/maikeover` | Visitor understands she may make a local card before sign-in | Browser-local draft/card only | Explain that local state is device-specific; no account or public-card implication |
| Make card | Configure avatar/card fields and save | Preview updates and local card is saved | Local storage; live mirror/card preview | Avatar failure, storage failure and retry must remain visible and safe |
| Claim/sign in | Email magic link + valid available handle + profile upsert | Authenticated account claim completes | Supabase session/profile; visibility choice recorded | Fresh-email, invalid/taken handle, expired link, retry, logout and restore outcomes must be tested |
| Return | Existing local handle or authenticated session returns | Arrival says which state is remembered and offers Closet | Local or signed-in profile, explicitly distinguished | No false cross-device restoration claim |
| Public/private card | Member selects visibility and shares a card URL | Only opted-in public fields resolve | RLS/view-backed public card | Two-account, private/not-found, change-visibility and block tests required |
| Closet/progression | Open `/laidies-card.html` | Resident sees only the collection/reward state that source can prove | Presently mixed device-local plus selected server events | Failed/retry/refund/duplicate and another-device behaviour must not be inferred |

## Non-negotiable product and brand gates

- The salon/vanity must make the resident card the object worked in the room; no card-grid or generic SaaS-form substitution.
- Card art/personalization must preserve a member's identity. Any future AI imagery is background-only, previewed and explicitly approved; no browser-held image API secret.
- Email/profile data are used only for stated sign-in/personalization purposes. Profile fields are optional and public visibility is a genuine choice.
- Device-local state, server profile state and durable entitlement must be visibly distinguished.
- A click, visit, local handle, local storage record or share-sheet close is not a verified account, delivery, reward or cross-device event.
- The shared championship floors apply: quality/user value, factual/technical accuracy/safety/trust and positive LAiDIES brand contribution each need ≥17/20; revenue cannot compensate.

## Invocation cadence

Invoke on changes to the building, Resident Card, Closet, avatar service, Supabase schema/auth/RLS, rewards/invites, privacy policy, public URL or a related incident; before release; 24–72 hours after deployment; once aggregated privacy-safe evidence exists; and on Ali/orchestrator request. No trigger means no idle model call.

Each run records exact page/service versions, anonymous/local/signed-in/cross-device evidence, privacy limits, verdicts, named dependencies, classification (**FIX BEFORE LAUNCH**, **HIDE/LABEL FOR LAUNCH**, **POST-LAUNCH EXPERIMENT**, **DECLINE**) and retest. Accepted implementation must move to a separately authorised lane.
