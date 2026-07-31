# MAiKEOVER maker evidence — Resident Card account hold

**Evidence time:** 2026-07-27 (America/Vancouver)  
**Status:** `BUILT LOCALLY — MAKER PASS / INDEPENDENT REVIEW PENDING`

## Literal visitor-visible repair

`resident-card.html` now states:

> The account desk is not taking email addresses yet.

It also states that nothing was submitted and no account or public Card was
created, and provides a keyboard-focusable route back to MAiKEOVER’s
device-local Card maker.

The obsolete account-email intake remains in the document only as a dormant
successor boundary. Its exact panel is `hidden` and `inert`; its email field and
submit control are therefore neither visible nor operable.

## Frozen maker tuple

- `resident-card.html`  
  SHA-256 `a8f520484f9db6ca88f97a6c1865fb09a8f09bd796df20fb2bd80227c199bd75`
- `scripts/check-maikeover-contract.mjs`  
  SHA-256 `84995e0ed983c316233a1a224cb070cbc5cf9230304ae00ac44c456ddd6b0299`
- `scripts/test-maikeover-browser.mjs`  
  SHA-256 `8cfe17875f80f8ec7abd8584dc829943aef07100c81febbfdd6dc4ad74bfa0b4`
- mobile evidence `operations/product-stewards/maikeover/evidence-2026-07-25/maikeover-held-mobile.png`  
  SHA-256 `ad53492dfa5575135ff4e06d9723dcdb92ed05246b0ec3ac3832f93f34391fa7`
- local-return evidence `operations/product-stewards/maikeover/evidence-2026-07-25/maikeover-local-return-desktop.png`  
  SHA-256 `88cf66955a01f7de91388bf9069f0c1b0643c72eb22883ab98d0a11424e5918e`

## Verification

- `node scripts/check-maikeover-contract.mjs` — PASS
- `node scripts/test-maikeover-browser.mjs` with the bundled Playwright runtime
  — PASS
- `node scripts/check-product-stewards.mjs --owner-entry maikeover` — PASS
- scoped `git diff --check` — PASS

The browser suite verifies the visible closed-intake explanation, hidden email
panel, inoperable submit control, keyboard-focusable recovery link, local Card
save/return/error behavior, privacy boundaries, responsive layouts, reduced
motion and deterministic Account A/B mocks.

## Honest boundary

This is not proof of production authentication, email delivery, a public
Resident Card, handle reservation, RLS, avatar service, rewards, cross-device
restoration, deployment or public-origin behavior. Visual-system production
also remains separately gated. No provider, account, public route or deployment
was changed.

