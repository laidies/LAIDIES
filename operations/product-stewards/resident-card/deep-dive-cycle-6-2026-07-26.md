# Resident Card Cycle 6 deep dive

**Date:** 2026-07-26  
**Scope:** Resident Card plus directly coupled MAiKEOVER/Closet/community
identity boundary  
**Verdict:** **71/100 — FIX BEFORE PROMOTION**

## Executive finding

The real product was split: MAiKEOVER created a usable local Card, the Closet
read it, and `/resident-card.html` was a held account route containing hidden
email/profile machinery and stale claims. That route could not tell a
newcomer from a returning user and overstated the Card’s relationship to
quizzes, stickers, charms and trading cards.

Cycle 6 makes the status route useful and honest without enabling accounts:
it recognizes one valid v1 envelope, fails closed on corrupt/unsupported data,
handles storage denial, renders a bounded field projection safely, labels the
local handle as a draft and offers the Closet only for a valid Card. The hidden
email/profile/account DOM, account config and resend observer were removed.

## Scorecard

| Dimension | Weight | Score | Evidence / gap |
|---|---:|---:|---|
| Product intent and utility | 15 | 12 | Clear status/doorway; Card creation remains at MAiKEOVER |
| Accuracy, identity and reward truth | 20 | 17 | Local/account/public/reward boundaries explicit; independent rejudge open |
| Newcomer, return and recovery UX | 15 | 13 | Four states pass; no coordinated export/reset yet |
| Visual and LAiDIES brand | 15 | 8 | Coherent candidate but owner visual/taste and comprehension gates open |
| Accessibility | 10 | 7 | Semantics, keyboard and reflow pass in Chromium; native AT/zoom open |
| Backend, privacy and reliability | 15 | 11 | No backend on route; account/public/two-device system intentionally unavailable |
| Analytics and customer evidence | 5 | 1 | Global tools load; no approved product event or VOC baseline |
| Responsible revenue readiness | 5 | 2 | Safe options identified; no demand, rights or fulfillment evidence |
| **Total** | **100** | **71** | **Threshold 85; weighted trust/quality floor remains open** |

## Journey findings

- **New user:** previously saw only a closed desk; now receives an exact local
  explanation and make action.
- **Returning user:** previously was not recognized; now a valid envelope
  produces edit and supported Closet continuation.
- **Corrupt state:** previously invisible; now preserved and labelled for
  recovery.
- **Storage blocked:** previously indistinguishable from empty; now explicit.
- **Another device/private browser/site-data clear:** loss risk is visible.
- **Account expectation:** no form, email, SDK or magic-link behavior ships on
  this route.

## Contract findings

- MAiKEOVER owns one versioned atomic local write.
- The Card is presentation state, not authorization.
- The Closet owns separate progression ledgers.
- A local handle cannot reserve identity, sign community posts, unlock rooms,
  publish a Card or prove rewards.
- Controlled Supabase code in the Closet is localhost-preflight-only. It is
  neither exercised nor approved here.

## Visual and content findings

The current bright comic vanity image and high-energy status composition are
more distinctive than the old form, but they remain candidates. No evidence
proves that Ali approves the image, colour balance or hierarchy, or that users
understand “local keepsake” on first viewing. This is an owner hold, not a
reason to revert the identity repair.

The shared header still presents `Account status` plus a `Join` action on the
same route. That global navigation wording can imply an account journey even
when the page denies one. It is a direct dependency for the MAiKEOVER parent
and shared-navigation owner; it was not changed in this bounded packet.

## Analytics findings

Plausible and Clarity are globally loaded, but there is no Resident Card event
contract or current evidence pull. Future measurement should distinguish
empty/saved/invalid/unavailable and make/edit/Closet continuation without
names, handles or profile fields. Session-recording privacy/masking requires
the portfolio privacy owner’s verification.

## Revenue findings

The plausible fit is optional physical or downloadable keepsakes and cosmetic
packs after owner design, rights, fulfillment and demand evidence. Identity,
recovery, accessibility, progression and account portability must not become
paid leverage.

## Holds

- **Owner visual/public:** open
- **Representative-user comprehension:** open
- **Native accessibility:** open
- **Artifact/public origin/release provenance:** open
- **Analytics/VOC:** open
- **Account/public/cross-device backend:** unavailable and unverified
- **Shared `Account status` / `Join` navigation contract:** parent/shared-nav
  reconciliation open
- **Deployment:** not performed
