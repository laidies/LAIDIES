# Resident Card construction — 2026-07-24

> **CURRENT ACCOUNT BOUNDARY — 2026-08-29.** The August 23 hold below was a
> stale regression and is superseded. Account-backed Card claiming,
> restoration and bounded cross-device continuation were deployed and
> publicly verified on July 29 from source `28f483e25c021e37e0acd2687abcae26a6d66927`
> (deployment `9f161385-7486-4207-9afe-8512ea453973`). The shared header must
> mount the continuation bootstrap. Resident Card must expose claim, restore
> and pick-up controls while keeping prompts, drafts, messages, discussions,
> Girl Talk choices and private free-form activity out of the continuation
> document.

> **PROVIDER-FAILURE BOUNDARY — 2026-08-29.** Account controls are conditional
> on one bounded `GET /auth/v1/health` response from the configured provider.
> An unresolved hostname, timeout or non-success response hides both signed-out
> and signed-in account controls and reports that the account service is
> unavailable; it must not convert an SDK-loaded/no-session result into a
> usable sign-in claim. Device-local Card state and routes remain untouched.
> This is a failure-state guard, not a replacement backend or a demotion of the
> previously verified account architecture. Restoring the provider still
> requires the real account lifecycle and two-device verification.

> **CLOSET DISPLAY BOUNDARY — 2026-08-29.** The August 23 blanket hiding of
> Closet progression was broader than the verified July continuation contract.
> The Wednesday Tour and supported collection shelves are visible for
> device-local Cards and remain the account-restoration destinations for the
> bounded continuation document. FAiRY balances and leaderboards remain hidden:
> the July release explicitly excluded public balances and ownership. A provider
> outage changes persistence status, not whether supported local Closet records
> are visible.

> **PUFFY CONSUMER BOUNDARY — 2026-08-29.** Every public page that loads
> `puffy-bookmarks.js` must load `resident-card-contract-v1.js` first. Puffy
> placement may recognize only a valid device-local Card read through that
> contract; a missing contract is an integration failure, not evidence that the
> visitor has no Card. The Gift Shop, Handbook, LIBRAiRY and Closet are covered
> by the Resident contract guard. A Card enables only the device-local Puffy
> picker and does not imply account, backup, sync, stock, reservation or reward.

> **SUPERSEDED ACCOUNT BOUNDARY — 2026-08-23.** This update previously superseded the
> preserved-behaviour statements below where they imply a publicly verified
> account lifecycle. Resident Card owns the sole private sign-in-link request
> desk. A request proves neither message delivery nor account creation.
> Account-backed Card claiming, restoration and cross-device continuation
> remain held until their complete public lifecycle is verified. MAiKEOVER and
> the Closet continue to use the device-local Card without escalating it into
> account, public-profile, reward or ownership truth. The shared header,
> NewsStand and other ordinary town pages must not automatically mount or run
> account-backed continuation while that lifecycle remains held.

## Decision

Resident Card is the MAiKEOVER intake experience, not a generic account form.
The page now moves through one salon arrival, one Post Office intake sheet, and
one optional consultation. Existing authentication and profile code remains in
place.

## Construction grammar

- The dimensional-comic MAiKEOVER vanity establishes the room.
- The email/magic-link surface is one ruled Post Office intake sheet with one
  primary action, not a rounded membership card.
- Confirmation, pending-mail help, privacy, and status states stay on that same
  sheet.
- The four optional profile groups form one open consultation. Each group is a
  ruled accordion row and its values behave like underlined swatches rather
  than pill cards.
- Parlor and homepage exits form one open two-column route strip.

## Preserved behaviour

- Supabase configuration, magic-link sending, resend, pending-mail state,
  newsletter opt-in, sign-out, and reset wiring are unchanged.
- The original `laidiesMemberPass` and `laidiesMemberAuthPending` storage keys
  remain.
- All 31 optional profile choices and four profile groups remain.
- Existing auto-advance between consultation groups remains.
- Existing privacy, terms, MAiKEOVER, and homepage routes remain.

## QA result

Desktop and 390 × 844 mobile pass with no horizontal overflow and no broken
images. The email field, primary action, four profile groups, and 31 profile
buttons remain present. Accordion and single-choice state were exercised; the
temporary QA selection was removed with the page's own reset action.

## Art boundary

The vanity is the same installed structural candidate used by MAiKEOVER and
Try-On. It supports the mechanic but remains lighter and peachier than the
approved Episode 04 Heroine style lock.
