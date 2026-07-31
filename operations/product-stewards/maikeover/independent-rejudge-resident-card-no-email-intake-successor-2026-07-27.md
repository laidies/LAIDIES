# Independent rejudge — Resident Card no-email-intake successor

**Date:** 2026-07-27 (America/Vancouver)  
**Scope:** Independent successor review for the exact tuple in `maker-evidence-resident-card-no-email-intake-successor-2026-07-27.md`. The earlier held-panel acceptance is historical evidence only and is superseded for this admission. This review changed no maker, test, state, painpoint, provider, route, deployment or public file.

## Verdict

**ACCEPT — local Resident Card no-email-intake successor.**

The held Resident Card route now ships no email input, no submit control, and no dormant member-pass panel. It retains clear visible closed-intake wording, a keyboard-reachable MAiKEOVER recovery route, and the already governed device-local Card/Closet/privacy behavior.

## Recomputed frozen tuple

| File | SHA-256 | Result |
|---|---|---|
| `resident-card.html` | `b0efc8f71086f80d499ad73165bef480218363b11da1559b607c5e66d1f86622` | Matches maker evidence |
| `scripts/check-maikeover-contract.mjs` | `a8a469642ebf86e235792b8da2ab09581365f4bcb2177804fbca8b031b32cc2a` | Matches maker evidence |
| `scripts/test-maikeover-browser.mjs` | `0d2e986556dc51182f41ea09f74c9f85ca9fb63042d6b7e24931254c553284bb` | Matches maker evidence |
| `scripts/test-resident-card-contract.mjs` | `34197622af52f5adf4aed16c49cd8258fbe794cbfedfa8a1dac6df27cbda4c99` | Matches maker evidence |
| `scripts/test-resident-card-browser.mjs` | `c5f089ae793ba77cb7d848668561cac9b34ff2729a78838461623f534fb127f4` | Matches maker evidence |

## Test evidence

- `node scripts/check-maikeover-contract.mjs` — **PASS**.
- `MAIKEOVER_EVIDENCE_DIR=/tmp/maikeover-successor-independent-20260727 PLAYWRIGHT_CORE_PATH=/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core node scripts/test-maikeover-browser.mjs` — **PASS**.
- `node scripts/test-resident-card-contract.mjs` — **31/31 PASS**.
- `node scripts/test-resident-card-shared-contract.mjs` — **34/34 PASS**.
- `RESIDENT_CARD_EVIDENCE_DIR=/tmp/resident-card-successor-independent-20260727 PLAYWRIGHT_CORE_PATH=/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core node scripts/test-resident-card-browser.mjs` — **127/127 PASS**.
- MAiKEOVER targeted owner-entry, state JSON parse and scoped `git diff --check` — **PASS**.

Both browser suites wrote their independent screenshots only under `/tmp`, not to maker evidence files.

## Direct 1440 / 390 / 320 browser inspection

At 1440×900, 390×844 and 320×820, the rendered route has:

- the exact visible explanation: **“The account desk is not taking email addresses yet.”** followed by **“Nothing has been submitted and no account or public Card has been created.”**;
- a visible route-local recovery link: `Make and save your device-local card at the parlor →` to `/maikeover.html`;
- zero matching email inputs, zero matching email-submit controls, and no `.member-pass-panel` in the DOM;
- no horizontal overflow and no broken images.

The source scan independently confirms no `type="email"`, `memberPassEmail`, or `saveMemberPassButton` token remains in `resident-card.html`.

## Preserved local and privacy contract

- Newcomer, returning, invalid, legacy, storage-denied and hostile-envelope states pass and remain fail-closed.
- The shared Card parser rejects malformed/extra/private/XSS-shaped data; only canonical packaged avatar paths render through the safe DOM helper.
- MAiKEOVER local save/reload and device-local Closet handoff remain intact; a local Card cannot grant community authority, reward state or public sharing.
- The controlled Resident Card browser suite reports no account/profile backend request. The MAiKEOVER Account A/B fixtures are deterministic UI/privacy tests, not production account evidence.

## Limits and next action

This accepts only the closed-intake and device-local local-contract state. It does **not** establish email delivery, authentication, verified account identity, profile/RLS, public Card visibility, avatar service, rewards, cross-device restoration, analytics, deployment or public-origin behavior.

Keep all account/public Card claims held. The next eligible stage remains a separately authorized exact-release account lifecycle suite: fresh email, valid/invalid/taken handle, expiry, logout/login, two-account/two-device, public/private/revoke/delete, provider evidence and public-origin verification.

## Learning scan

The predecessor demonstrates the reusable prevention rule: a held route must be tested for **absence from the shipped DOM**, not merely invisibility/inertness. This successor and 31/31 Resident Card contract now enforce that rule; no further distinct learning entry was created because this review was restricted to the requested dossier-local receipt.
