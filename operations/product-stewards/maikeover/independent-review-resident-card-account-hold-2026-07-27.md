# Independent review — Resident Card held-account/email boundary

**Date:** 2026-07-27 (America/Vancouver)  
**Scope:** Judge-only verification of the local Resident Card held-account boundary named in `maker-evidence-resident-card-account-hold-2026-07-27.md`. No source, test, screenshot, state, painpoint, service, provider, account, route, deployment or public-state file was changed by this review.

## Verdict

**ACCEPT — isolated closed-intake / device-local Resident Card boundary.**

The duplicate account-email entry is now visibly closed and physically inoperable, while the useful MAiKEOVER device-local recovery path remains present and keyboard reachable. The change does not represent account creation, email delivery, public Card creation, authentication, rewards or cross-device restoration.

## Frozen maker tuple

| Input | Recomputed SHA-256 | Result |
|---|---|---|
| `resident-card.html` | `a8f520484f9db6ca88f97a6c1865fb09a8f09bd796df20fb2bd80227c199bd75` | Matches maker evidence |
| `scripts/check-maikeover-contract.mjs` | `84995e0ed983c316233a1a224cb070cbc5cf9230304ae00ac44c456ddd6b0299` | Matches maker evidence |
| `scripts/test-maikeover-browser.mjs` | `8cfe17875f80f8ec7abd8584dc829943aef07100c81febbfdd6dc4ad74bfa0b4` | Matches maker evidence |
| Maker mobile evidence | `ad53492dfa5575135ff4e06d9723dcdb92ed05246b0ec3ac3832f93f34391fa7` | Matches maker evidence; not modified by this review |
| Maker local-return desktop evidence | `88cf66955a01f7de91388bf9069f0c1b0643c72eb22883ab98d0a11424e5918e` | Matches maker evidence; not modified by this review |

## Literal independent checks

1. `node scripts/check-maikeover-contract.mjs` → **`MAiKEOVER CONTRACT PASS`**.
2. `MAIKEOVER_EVIDENCE_DIR=/tmp/maikeover-independent-evidence-20260727-third PLAYWRIGHT_CORE_PATH=/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core node scripts/test-maikeover-browser.mjs` → **`MAiKEOVER BROWSER PREFLIGHT PASS`**.
   - The test's deterministic Account A/B mocks are UI/privacy fixtures only; its literal output correctly says it is *not proof* of production auth, email, public-card, RLS, avatar, reward or cross-device behavior.
   - Independent screenshots were directed to `/tmp`, not the maker evidence paths.
3. Targeted MAiKEOVER owner-entry, `jq` state parse and scoped `git diff --check` → **PASS**.

## Direct rendered boundary inspection

Local Chromium inspection of `resident-card.html` at 1440×900, 390×844 and 320×820 found the same result at every width:

- The visitor can see the exact closed-intake copy: **“The account desk is not taking email addresses yet.”**
- The explanation explicitly says: **“Nothing has been submitted and no account or public Card has been created.”**
- The recovery link points to `/maikeover.html` and has normal keyboard tab access (`tabIndex=0`).
- `.member-pass-panel` has `hidden=true` and `inert=true`; `#memberPassEmail` and `#saveMemberPassButton` are neither visible nor operable.
- No horizontal overflow or broken image was observed at any tested viewport.
- The full preflight additionally reconfirmed device-local save/reload, storage-error, local Closet handoff, no accidental public sharing, focus/live-region behavior, reduced-motion and privacy boundaries.

## Boundary / regression review

- **No false account/public Card claim:** PASS. The wording says no email submission, account or public Card occurred; account lifecycle remains held.
- **No regression of device-local Card truth:** PASS. New/returning state, save/reload and Closet handoff retain “this browser / this device” scope.
- **No external/provider mutation:** PASS within this isolated test. External Supabase/auth/avatar/analytics/magic-link-like requests are blocked in the controlled test, and none is needed for the held surface to render.
- **No public mutation:** This review neither deployed nor tested a public origin. The current route also includes separate canonical/`og:url` metadata lines, but those do not create an account, submit email, publish a Card or establish public-origin proof.

## Limits and exact next action

This accepts the local closed-intake safety repair only. It does not accept production authentication, email sending, a magic-link flow, verified identity, RLS, public-card visibility, rewards, avatar services, analytics, account-backed persistence, cross-device restoration, release artifact, deployment or public-origin behavior.

Keep account/public Card claims held. The next eligible work is the separately authorized controlled external account lifecycle suite—fresh email, expiry, logout/login, two-account/two-device, private/public/revoke/delete—against an exact release candidate and verified provider authority.
