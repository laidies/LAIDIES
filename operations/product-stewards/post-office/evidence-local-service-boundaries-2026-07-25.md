# Post Office — local service-boundary suite

**Status:** VERIFIED LOCALLY — bounded frontend/service-boundary slice only. This is not a Buttondown delivery receipt, a Supabase session test, a public-origin verification, or a release clearance.
**Date:** 2026-07-25
**Base commit:** `a5b3c513cfe13f1484095db23ce746d9b1b67a31` plus the exact local files below (uncommitted at time of test).
**External-state policy:** no email, authentication, provider, native share, clipboard, analytics, deployment or publication call was allowed. The browser test aborted every non-local request.

## Exact candidate binding

| File | SHA-256 |
|---|---|
| `post-office.html` | `b9a5b0bed27d9cb48420a2033627d8f51686d0c7337d273f9bd200fee9e02deb` |
| `postcard.html` | `ddc1d255fd5240ed3d4d06a1f19fb78cc3f613f312cb37d677e89f52fc4757f3` |
| `content/site/post-office.js` | `a77825c8773ffcd0b6ac3c9750180264abc048892657cd5db0b7123905d76d22` |
| `scripts/test-post-office-local-contract.mjs` | `e956cf3253df32df5c6731770899556d8abe5a7bf6203f9aa5aa236713ac99e6` |
| `scripts/test-post-office-browser-local.cjs` | `2945d9c955235c16e66839667643016d0a0979f98d66d3121915aa10ea04899f` |

## Results

| Contract | Result | Evidence |
|---|---|---|
| Rack → composer binding | **PASS** | 11 Post Office rack identifiers each exist in the 13-card composer set; every named rack asset exists; `?pc=<id>` is the sole handoff. |
| Desktop and 390×844 postcard journey | **PASS** | Playwright loaded a legacy `from`/`note` URL with all external requests aborted. It became `/postcard.html?pc=library`, selected Library, rendered 13 picker buttons and had no horizontal overflow at either viewport. |
| Keyboard/accessibility mechanics | **PASS — bounded** | A 390×844 Playwright pass focused a picker and used Space to select Library; picker buttons expose `aria-pressed`, selection updates it and announces the selected card through the existing `role=status` region. The copy fallback has a visible label and readonly input. This is not a screen-reader/assistive-technology audit. |
| Native-share cancellation | **PASS** | Forced `AbortError` reports that no send occurred and offers Copy/Text/Email recovery. |
| Native-share unavailable/error and clipboard denied | **PASS** | Forced rejection exposes a selectable public postcard-only link; it does not say copied. |
| Newsletter popup-blocked failure | **PASS** | Forced `window.open` null leaves the visitor on Post Office, announces that no signup request was sent, and exposes a direct Buttondown continuation. |
| Newsletter valid/invalid/duplicate/confirmation/unsubscribe/provider/network results | **NOT TESTED** | Requires the approved disposable identity and explicit Buttondown authority in the controlled-service packet. No submission occurred. |
| Magic-link request/callback/session/expiry/logout | **NOT TESTED** | The Post Office handoff copy now says opening Resident Card does not create an account, but no Supabase request or session occurred. |
| Privacy static scan | **PARTIAL** | Generator no longer places handle or note in generated share URLs; old `from`/`note` URLs are scrubbed before analytics scripts initialise; no custom Plausible payload contains postcard/handle/note/email/token data. Provider-side Clarity masking, CDN request logs, and actual analytics payloads were not inspected. A pre-existing legacy URL can already exist in browser/CDN history, so it cannot be retroactively erased. |
| Referral/reward | **UNAVAILABLE BY DESIGN** | No invite token, recipient lifecycle, reward write or claim was introduced or exercised. |

## Local repairs made from evidence

1. Replaced generated `from`/`note` URL payloads with a public `?pc=<id>` selection only; notes remain in the user-controlled SMS/email/native-share message.
2. Retired the legacy receive renderer that reflected private query fields; a legacy URL is immediately reduced to the selected public card before analytics libraries run.
3. Added explicit status and selectable fallback for native-share cancellation/error and clipboard denial; changed the primary action from “Send” to “Share.”
4. Added Buttondown/provider/privacy disclosure, a live blocked-popup state, direct provider recovery link, and an explicit Resident Card handoff boundary.

## Commands and observed output

```text
node scripts/test-post-office-local-contract.mjs
PASS: Post Office local contract (privacy, truthful failures, source binding)

node scripts/test-post-office-browser-local.cjs http://127.0.0.1:41817
desktop: legacy URL → ?pc=library; selected=library; cardCount=13; overflow=false
mobile: legacy URL → ?pc=library; selected=library; cardCount=13; overflow=false
forced cancellation: truthful no-send recovery
native-share unavailable: truthful Copy/Text/Email fallback
forced clipboard denial: selectable ?pc=library fallback
blocked newsletter popup: no request sent here; direct Buttondown fallback visible

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
```

## Still blocked / next approved action

The controlled external-state suite remains blocked pending Ali/designated privacy owner’s written approval of one disposable mailbox, permitted Buttondown/Supabase mutations, cleanup/retention procedure, and exact candidate/public origin. Run `build-packet-controlled-service-suite-2026-07-25.md` only then. Do not infer subscription, confirmation, email delivery, sign-in, account, recipient delivery, invite acceptance, or reward from this local evidence.
