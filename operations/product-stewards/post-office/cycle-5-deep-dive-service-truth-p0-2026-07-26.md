# Post Office cycle 5 deep dive — service truth P0

**Status:** BUILT LOCALLY — independent rejudge required; provider and public-origin outcomes remain held.
**Date:** 2026-07-26
**Scope:** Post Office building, Newsletter Delivery, Magic-link Sign-in, and Postcards/Referral.

## Current Repair 2 archive gate

The independent Repair 1 rejudge remains preserved as a bounded 87/100 PASS.
Its one P1 finding is now repaired locally: the entire published archive
collection is validated before any archive DOM replacement. Every published
row must have a positive integer `episode.number`, every number must be unique,
and every admitted canonical issue URL must be unique. Slash-normalized
duplicates, string/number ambiguity, case variants, malformed rows and a valid
row mixed with an invalid row fail the complete drawer closed.

Failure renders no partial or repeated cards, creates no archive image/link or
attacker-origin attempt, and exposes a visible Retry action. Source and fresh
exact-artifact suites pass 90 checks. This Repair 2 is maker-verified only and
awaits independent rejudge. It does not clear Buttondown, Supabase, Clarity,
native accessibility/share, owner visual, reward, artifact-size, deployment or
public-origin holds.

## Product job and selected direction

The building has three current jobs, not one blended promise:

1. continue an email request to Buttondown with consent and cadence context;
2. explain that Resident Card account intake is held and route to truthful status/local-card alternatives;
3. select, compose, copy, or hand a public-card link to the device share sheet without claiming delivery.

Three directions competed:

- **PO-box theatre:** strongest fictional metaphor, rejected because it converts an opaque provider handoff into a delivery promise.
- **Static directory:** lowest risk, rejected because it removes the useful postcard selection/compose interaction and gives returning visitors no product.
- **Truthful four-counter hall:** selected. It preserves the comic Post Office identity while separating request, held account status, postcard making, and published-episode archive into visible counters.

The intended ten-second read is now: choose a counter; learn which system owns the result; receive an honest next step.

## Journey review

| Journey | Current locally proved behaviour | Authoritative hold |
|---|---|---|
| New arrival | Four labelled actions orient newsletter, account status, postcard and archive. Newsletter copy names Buttondown and the intended cadence. | Buttondown acceptance, confirmation and delivery are unverified. |
| Returning arrival | No browser flag is promoted into subscription or account truth. The account counter remains explicitly held. | No Supabase session or provider account was exercised. |
| Postcard deep link | `?pc=<valid-id>` selects the matching card, keeps the URL public and note-free, and produces the same canonical URL when copied/shared. | Recipient delivery, opening, joining and rewards are unknowable and unavailable. |
| Failure/retry | Invalid email stays local; blocked popup, share cancellation and clipboard denial state exactly what did not complete and retain a retry path. | Network/provider rejection, duplicate subscription and auth callback failures need approved external fixtures. |
| Keyboard/mobile/reduced motion | Keyboard card selection, 320 px reflow, minimum action height and reduced-motion state are deterministically checked. | Native assistive-technology and owner visual acceptance remain independent holds. |

A real source-binding defect was found: the postcard page rendered the query-selected card and then reset the internal `picked` value to the first card. The screen could show one card while Copy produced another. Initialization now occurs before first render, and the browser suite asserts the exact deep-linked canonical URL.

## Backend, service and receipt truth

| Surface | Owner | Local receipt | Authoritative receipt |
|---|---|---|---|
| Newsletter | Buttondown | Valid form can open/submit a Buttondown handoff; blocked popup is detected. | Provider-accepted subscription, configured confirmation, unsubscribe and delivery evidence. |
| Account/sign-in | Supabase via Resident Card | Post Office presents a held counter with no email field or magic-link request. | Accepted OTP request, callback session, expiry/reuse, logout and recovery evidence. |
| Postcard | Browser/device | Selected card, locally composed text, resolved native-share call or successful clipboard write. | None for preparation; recipient delivery/open/join is not observable here. |
| Referral/reward | Future server-side lifecycle | None. | Opaque invite, accepted relationship, idempotent reward ledger and anti-abuse evidence. |
| Episode archive | Published local episode data | Safely rendered published issue links or an explicit empty/failure state. | It is publication evidence, never newsletter-delivery evidence. |

No external service was called in this cycle. Buttondown and Supabase remain the intended providers; adding another vendor would increase privacy and operational surface without closing the existing evidence gap. The next service scout is therefore a controlled test of the existing integrations using an approved disposable identity and explicit cleanup authority.

## Safety, privacy and accessibility

- The Post Office account counter collects no email while the flow is held.
- Generated postcard URLs carry only the public card identifier; note and handle remain in user-controlled share text.
- Legacy private-looking query fields are removed before analytics scripts initialise.
- Episode data is rendered with DOM text nodes, not data-built HTML, and malformed data fails closed.
- Newsletter copy distinguishes an initiated handoff from provider acceptance, subscription, confirmation or delivery.
- Card controls use button semantics and selected state; the suite covers keyboard use, reduced motion, 320 px overflow and minimum action sizing.
- Native VoiceOver/TalkBack and owner visual review were not simulated and remain release holds.

## Visual and brand assessment

The repaired page keeps the red/cream/navy comic-counter language, Penny framing, stamps, pigeon sorting-room motif and handwritten accents. The navy orientation band supplies the missing hierarchy: one building, four bounded counters. At desktop and 320 px, primary actions remain legible and the held account state is visible rather than hidden behind a dead sign-in link. Evidence images are in `evidence-2026-07-26/`.

## Learning, retention and ethical economy

The useful return loop is the Wednesday editorial rhythm plus a reusable postcard maker, not a fabricated mailbox state. Near-term learning should measure privacy-safe categorical failures and whether visitors understand the provider boundary; it must not log emails, notes, handles or raw URLs.

Revenue remains downstream of trust. Optional stationery or keepsakes may be researched only after ownership, fulfilment, refunds and accessibility are specified. Newsletter access, ordinary sharing and core learning stay free. Referral rewards remain declined until a two-account, consented, idempotent lifecycle exists.

## Release judgment

The local P0 candidate is ready for independent product rejudge, not public release. Acceptance requires the source and exact-artifact suites to pass, visual/privacy/accessibility review to accept the bounded wording, and all external claims to remain held. Buttondown/Supabase verification still requires an approved disposable identity, explicit mutation/cleanup authority, and redacted receipts.
