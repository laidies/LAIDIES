# Resident Card construction — 2026-07-24

## Approved Getting Ready background — 2026-09-06

Ali approved the exact Getting Ready v2 artwork in task
`01a0785e-1438-7161-b041-0be213b06e9b` and requested installation and release.
Canonical installed asset: `assets/resident-card/backgrounds/getting-ready-v2.png`,
SHA256 `06085887508984a498c5de4146d00e07eadeb599314f1c9db2dcb65a57f19295`.
Source artwork/approval commits: `fa4c715f` / `e31a23a3` on
`art/resident-card-backgrounds-20260906`. Keep the exact raster, not a generated substitute.

Append persisted finish `gettingready`; preserve classic, pinklilac, peach,
mint, lavender and holo. MAiKEOVER, Closet and every shared-contract consumer
must accept it. Header stays distinct from the art; live name, fields and portrait
remain editable and are not burned into the background. Account allowlist update
is required before publishing this option. This does not release unfinished OTP
onboarding or supersede existing account/Closet scope.

Implementation/release checkpoint: `operations/design-qa/getting-ready-release.md`.

## MAiKEOVER account onboarding — 2026-09-05

Ali authorizes one continuous account-to-Card journey in MAiKEOVER. New
visitors request email verification here and return here to make their Card.
Existing accounts use the same email link; authenticated residents continue
directly. Finish saves the versioned Card to the verified account and provides
the Closet doorway. Existing remote Cards require an explicit restore or
replacement choice; no background overwrite is allowed. A failed account save
must distinguish a preserved browser copy from a verified account copy.

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
> The exact allowlist admits both source-file (`/shop.html`) and Cloudflare
> pretty-route (`/shop`) forms; accepting one form does not authorize arbitrary
> same-origin routes.

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

## MAiKEOVER Resident Card page authority — 2026-09-02

- MAiKEOVER begins with its own full-width building masthead beneath the shared
  town header. The selected masthead uses the current LIBRAiRY pink-purple-blue
  dimensional title treatment and the admitted Paulette salon scene. It carries
  no explanatory copy beyond the building title.
- A distinct full-width `Get your Resident Card.` section follows. It explains
  that the Card is how LAiDIES knows the resident, the private account keeps the
  supported Card/continuation state available across devices, the Closet is the
  home for saved things and progress, and MAiKEOVER can update the Card later.
- The working vanity has six real steps in Card reading order: Backdrop, Era
  faves, Soundtrack, Saint, Carrying and Finish. Decorative or dead drawers are
  not controls. The held portrait generator does not appear as a false step.
- The live Card is a small physical wallet-shaped credential centred inside a
  straight-on mirror. Its material shell belongs to the admitted image asset,
  not a CSS rectangle. Names, handles and favourite rows remain single-line and
  ellipsize inside their zones so one long value cannot overlap the next field.
- A valid restored device-local Card keeps `See it in my Closet` visible after
  reload; the visitor does not need to save the same Card twice to regain the
  continuation doorway.
- Every changed cacheable MAiKEOVER stylesheet or script ships with a changed
  consumer URL in `maikeover.html`. Deploying changed bytes under the previous
  cache identity is a release failure.

Source: Ali's 2026-09-02 direct page corrections and deployment authorization;
production verification at deployment
`41cf460f-5ae9-4550-8303-6527e81a37b4`.

## MAiKEOVER Card surface correction — 2026-09-03

- Remove the ruled writing lines from the physical Card artwork. The Card is a
  town credential, not stationery or a whiteboard.
- The Card uses one bold periwinkle/lavender body, one saturated raspberry
  header and deep ink text. A small yellow `Ai` accent may remain, but the
  complete adjacent `Ai` pair must stay the same size as the surrounding
  `SUNNYVAiLE` lettering. White Card-header text is rejected.
- `No.` is functional account identity, not decoration. A device-only Card
  reads `No. NEW`; after account connection, MAiKEOVER renders the positive
  server-issued `resident_number`. The browser must not mint or persist a fake
  official number.

Source: Ali's direct Card corrections, 2026-09-03.

## MAiKEOVER to Closet live Card contract — 2026-09-04

- The Resident Card is one stateful town identity, not separate MAiKEOVER and
  Closet mockups.
- Every MAiKEOVER choice updates the live Card immediately: background, Era
  movie, Era TV, soundtrack, Patron Saint, carrying and name.
- Save writes one versioned Resident Card envelope. The Closet reads that same
  envelope and renders the same saved fields and selected background.
- Returning to MAiKEOVER hydrates the current saved choices. Saving later edits
  replaces the same Card; it does not create an unrelated second Card.
- A device-only Card remains `No. NEW` in both MAiKEOVER and the Closet. Only a
  positive server-issued `resident_number` renders as a padded official number.
- The Card's physical shell never contains baked visitor data. Names,
  favourites, number and portrait remain deterministic live content so the
  object can update wherever it appears.

Source: Ali's direct functionality ruling and the locally exercised
MAiKEOVER-save-Closet-return-update journey, 2026-09-04.

## MAiKEOVER portrait creator restoration — 2026-09-04

- The portrait creator is a real first step in the Resident Card journey. The
  working vanity has seven steps: Portrait, Card style, Era faves, Soundtrack,
  Saint, Carrying and Finish. This supersedes the September 2 held-generator
  rule and its six-step count.
- A signed-in resident may either describe herself or use a consented JPG, PNG
  or WebP photo, choose the portrait styling, generate one set of three
  candidates and select one for the live Card.
- The source photo is resized before upload and is not stored by LAiDIES. Only
  the chosen bounded JPEG/PNG portrait enters the versioned Card envelope.
- The same chosen portrait renders in MAiKEOVER and the Closet, restores with
  the Card, and can be replaced later. A different device-local Card is never
  silently overwritten by the account copy; the Resident Card desk presents
  explicit update or restore actions.
- Portrait generation requires a verified account and is limited to two
  three-image sets per account per UTC day and twenty sets globally. A failed,
  timed-out or unauthenticated request cannot mutate the saved Card.

Source: Ali's direct restoration request; recovered bounded portrait implementation
and current local verification, 2026-09-04.

## MAiKEOVER current-site palette alignment — 2026-09-04

- The MAiKEOVER working area uses the literal current LIBRAiRY colour
  relationship: raspberry `#ef4d9c`, lilac `#b75cc4` and blue-violet
  `#6c7cd1`, with deep ink `#07142f`.
- The control surface uses the current LIBRAiRY reading gradient from pink
  `#f2c6e5` to periwinkle `#c7d7f5`. It is a readable surface inside the bold
  building colour, not a white card or a flat washed-out blue field.
- Yellow is reserved for selected states and primary actions; cyan is a small
  state edge. Form labels and long text remain deep ink. The page may not fall
  back to the retired mauve text, muted teal controls or white-on-pink action
  treatment inherited from the old global variables.
- This is a palette alignment only. The admitted vanity artwork, live Card,
  seven-step order, portrait creator and Card/Closet state envelope are
  unchanged.

Source: Ali's direct colour correction and same-viewport comparison against the
current Homepage and LIBRAiRY, 2026-09-04.
