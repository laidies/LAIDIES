# MAiKEOVER controlled account-preflight Repair 2 final independent rejudge

**Judge verdict:** **PASS — LOCAL P0 CONTRACT CLEARED**  
**Review date:** 2026-07-25  
**Release status:** **VERIFIED LOCALLY · NOT DEPLOYED · NOT PUBLICLY VERIFIED**  
**Authority used:** local source, deterministic synthetic mocks, one newly
built exact artifact and independently authored local probes only. No
production endpoint, email, magic link, account, private resident data,
credential, upload, avatar generation, reward mutation, deploy, public-origin
request or other external mutation was exercised.

## Executive judgment

Repair 2 closes all three local P0 classes left by the Repair 1 rejudge.

1. **The complete visible Closet edit is now one transaction.** The
   authoritative `laidies_resident_card_v1` envelope contains the MAiKEOVER
   card plus activity, episode, storefront, character, cocktail, quote, motto,
   avatar slug and archetype. `writeCache()` performs one write, read-verifies
   the exact bytes, returns failure on any exception or mismatch, and attempts
   exact prior-byte restoration if a non-standard storage implementation
   mutates before throwing. Legacy keys are import-only inputs.
2. **The public Card uses an independently owned privacy allowlist.** The exact
   browser select equals `public-card-field-contract-v1.json`.
   `generation`, `industry`, `ai_comfort`, account ID, email, goals,
   timestamps, tokens, raw avatar input and reward/transaction/refund metadata
   are prohibited and absent. Public mock traffic calls only
   `public_resident_cards`; it does not call owner profiles, raw
   `member_reward_events` or another private table.
3. **The missing accessibility/evidence matrix is present and passing.** The
   unmodified source and exact-artifact browser suite now covers the logical
   seven-drawer Tab sequence, held-state focus and restoration, save success
   and failure focus, atomic/deduplicated live status, computed text/disabled/
   focus contrast, distinct 200% and 400% layout proxies, Closet success/error
   states and the held Resident Card recovery route.

Repair 1 closures also remain closed: atomic MAiKEOVER save, exact prior and
legacy preservation, legacy import-only behavior, no local-handle Share
fallback, verified-session/profile/public-state Share gate, controlled
dependency injection, prohibited-network blocking, deterministic Account A/B
owner isolation, denied B-to-A write, non-enumerating private/nonexistent/
reserved results, visibility revocation, stale-content removal, service
failure and public-table-only call ledger.

This clears the local UI/data/mock P0 contract. It does not prove production
authentication, email, RLS, the real public view, avatar processing, rewards,
two-device restoration, analytics configuration, public origin, visual
approval or release readiness.

## Mandatory championship floors

| Mandatory floor | Score | Result | Evidence |
|---|---:|---|---|
| Product quality and user value | 18/20 | **PASS** | The salon-first Card journey, complete local edit, reload, returning state, Closet handoff and failure recovery form one useful local experience. |
| Accuracy, safety and trust | 18/20 | **PASS** | Local success is tied to exact persistence; account/public paths fail closed; the public allowlist excludes the prohibited profile fields; mocks are explicitly labelled as non-production proof. |
| Positive LAiDIES brand contribution | 18/20 | **PASS WITH OWNER VISUAL HOLD** | The room, vanity, Resident Card and warm state language remain distinctively LAiDIES. Automated evidence does not approve visual taste or campaign use. |

All non-compensable 17/20 floors pass.

## Full quality score

| Dimension | Weight | Score |
|---|---:|---:|
| Product purpose and local user value | 20 | 18 |
| Accuracy, safety and state truth | 20 | 18 |
| LAiDIES brand contribution and craft | 20 | 18 |
| Identity dignity, privacy and consent | 15 | 14 |
| UX and accessibility | 10 | 9 |
| Technical integrity and reliability | 10 | 9 |
| Maintainability and evidence quality | 5 | 4 |
| **Total** | **100** | **90 / 100 — PASS LOCALLY** |

The score does not override any preserved external, owner, native-accessibility
or public-release hold.

## Repair 2 P0 disposition

| P0 | Final verdict | Independent evidence |
|---|---|---|
| P0-1 — atomic local Card persistence | **PASS** | One versioned envelope contains the complete MAiKEOVER card and every visible local Closet field. Normal save/reload, same-tab, second-tab, isolated-context, denied storage, quota failure, legacy hydration/migration and corrupt-envelope fallback pass. |
| P0-2 — verified-public Share gate | **PASS LOCALLY** | Share requires current session, current profile handle and `member_card_is_public === true`; local/stale/private states remain disabled and no device-local handle fallback exists. |
| P0-3 — controlled dependency isolation | **PASS AS MOCK ISOLATION** | Local host, explicit flag, `synthetic-*` fixture ID and injected client are mandatory. Source and artifact recorded no prohibited Supabase, CDN, avatar, auth/email or analytics request in controlled mode. |
| P0-4 — deterministic Account A/B contract | **PASS AS MOCK UI PROOF ONLY** | Account B views opted-in Account A through the restricted public view; B-to-A owner write is denied; private/nonexistent/reserved results are equivalent; visibility-off revokes the view without stale content; owner B loads only B; service failure is not success-shaped. |
| P0-5 — restricted public data | **PASS LOCALLY** | The implementation's 22 selected fields exactly equal the Identity/Privacy contract. Prohibited fields are absent from response/DOM/URL/console sentinel checks. The public call ledger contains only `public_resident_cards` and no raw reward/private-table call. |
| P0-6 — accessibility and exact-artifact gates | **PASS — AUTOMATED CHROMIUM SCOPE** | Seven-drawer order, held/error/success focus, announcement deduplication, computed contrast, 200%/400% proxies, Closet states, Resident held recovery, reduced motion and source/exact-artifact parity pass. |
| P0-7 — independent rejudge then external packet | **LOCAL REJUDGE PASS; EXTERNAL PACKET HELD** | This independent rejudge clears the local candidate. The controlled real-service packet remains unexecuted and mandatory before any production account/public/cross-device claim. |

## Independent evidence

### Source reruns

```text
MAiKEOVER CONTRACT PASS
scope=local-save,state-label,account-hold,privacy,restricted-public-view

MAiKEOVER BROWSER PREFLIGHT PASS
proof=local atomic-card UI/storage/error/privacy/deterministic Account-A-B mock only
not_proof=production auth,email,public-card,RLS,avatar,reward,cross-device

inline JavaScript: PASS — 353 scripts / 132 pages
local links: PASS — 1,952 references / 110 pages
town contract: PASS
product steward system: PASS — 65 products / 3 of 3 active
scoped git diff check: PASS
```

### Fresh exact artifact

Fresh judge artifact:
`/tmp/laidies-maikeover-rejudge-r2.Ow3pZD`

```text
Public artifact: 1077 files, 961.39 MiB
Warning: artifact exceeds 750 MiB.
exact-artifact MAiKEOVER browser suite: PASS
public metadata validator: PASS
```

| Governed file | Matching source/artifact SHA-256 |
|---|---|
| `maikeover.html` | `16823a1cca8a4d8ce1562d705a335b46acd27573f8c93ebe83b541ade6f294c9` |
| `laidies-card.html` | `244e9b75beff955d4f9e5acfad3130fdc1858b1d6f04cf0355935396645758aa` |
| `resident-card.html` | `13c6eb77857b3d5aa368db040bc4593abc6191546ae68c1455d48b61f98b2afc` |
| `content/maikeover-v2.css` | `448b2d1281524e012f03cf33a554c28ecc133d9f7642aef3ba8575ee929ec0c8` |
| `content/site/maikeover-v2.js` | `75cb7cd5bbb22a0180e8546a5062a934b09d75f56b0445cf2b8565b671fbca2b` |

## Independent transaction probe

The permanent suite injects a normal quota failure. The independent judge also
tested the more adversarial non-standard sequence:

1. seed a complete prior envelope containing every MAiKEOVER and visible Closet
   edit field;
2. seed and snapshot every relevant legacy key;
3. intercept the next authoritative envelope write;
4. actually write the new bytes;
5. throw `QuotaExceededError` after the mutation; and
6. inspect storage, UI and focus after the recovery path.

Source and exact artifact both produced:

```text
INDEPENDENT CLOSET MUTATE-THEN-THROW PASS
```

Observed in both:

- the authoritative envelope returned to the exact prior byte string;
- every legacy key remained byte-for-byte unchanged;
- the Save control said it could not save;
- focus remained on `saveCardBtn`; and
- the attempted new values did not appear in the rendered Card.

This closes the false-success/partial-write class that failed Repair 1.

## Independent privacy contract reconciliation

`public-card-field-contract-v1.json` is separate from the page implementation
and identifies Identity and Privacy as owner. The contract lists the exact
allowed fields and separately lists prohibited fields.

Independent source/artifact extraction established:

- the `public_resident_cards` select exists in both;
- the selected field array exactly equals the contract array in order;
- none of the prohibited fields is selected; and
- source and artifact page hashes match.

A first judge helper also searched the whole public-mode source slice for the
raw string `member_reward_events` and returned a non-zero result. Inspection
showed that the only occurrence is the explanatory comment:

> Public Cards deliberately omit collections. Raw member_reward_events is an
> owner-oriented ledger, not a consented public projection.

It is not an invocation. The browser's exact table/select call ledger confirms
that the public journey calls only `public_resident_cards`, and the production
branch contains no `loadCollections()` call. This was a probe false positive,
not a product defect.

The local field contract and deterministic fixture are still not evidence that
the real database view or RLS policy matches them. That remains an external
gate.

## Accessibility and state evidence

The same unmodified suite passed against source and the exact artifact:

- logical Tab order:
  `look → backdrop → soundtrack → saint → era → carrying → finish`;
- Finish moves focus to the held account explanation;
- leaving the held drawer restores focus to the selected drawer control;
- successful and failed MAiKEOVER saves focus their announced result;
- Closet failure keeps focus on its initiating Save control;
- identical repeat save produces one complete live-region mutation rather than
  split/duplicate announcements;
- persistence text and disabled portrait control clear 4.5:1 in the computed
  proxy;
- the focused drawer control clears the 3:1 focus-indicator proxy;
- 1280, 390, distinct 640-CSS-pixel 200% and 320-CSS-pixel 400% proxies have no
  page-level horizontal overflow;
- held Resident Card email UI is hidden/inert and supplies a keyboard-focusable
  recovery route to MAiKEOVER; and
- reduced motion disables smooth scrolling.

Safari, VoiceOver, native zoom/text scaling, actual assistive technology and
representative physical-device behavior remain held.

## Repair 1 closure regression

The final source and artifact suite reconfirm:

- one MAiKEOVER envelope write and read verification;
- exact prior-envelope and legacy preservation under failure;
- valid legacy import without silent migration;
- explicit migration on successful Save;
- no local-handle public Share;
- private owner Share disabled;
- public Share gated on provider-shaped session/current profile/public flag;
- controlled client injection on both MAiKEOVER and Closet;
- no controlled external-network fallback;
- deterministic Account A/B owner rows and restricted public projection;
- denied B-to-A write;
- private/nonexistent/reserved non-enumerating result;
- visibility revocation and removal of stale public content;
- service failure producing the same non-revealing result;
- public response/DOM/URL/console sentinel exclusion;
- no public raw reward/private-table call; and
- the explicit test label **MOCK UI PROOF ONLY**.

## External packet and preserved holds

`controlled-external-test-packet-2026-07-25.md` remains a **PASS AS A TEST PLAN,
NOT PRODUCT EVIDENCE**. It has not been executed.

This local PASS does not clear or narrow:

- production email request or magic-link delivery;
- authentication, verified handle claim, profile write, logout/login or
  session restoration;
- real Supabase view columns, RLS, owner isolation or public/private behavior;
- real second-device or cross-device restoration;
- public-card cache revocation, authentication telemetry retention/deletion or
  CDN cache behavior;
- avatar upload/generation, malformed/abusive input, timeout, retention or
  deletion;
- durable reward grant/spend/refund/delivery or public collections;
- Plausible/Clarity production configuration and privacy review;
- Safari, VoiceOver, native zoom/text scaling or physical-device testing;
- Ali's visual/creative approval;
- exact release commit, deployment record or public-origin verification;
- deployment, publication, promotion or social use; or
- the existing artifact-size advisory above 750 MiB.

No further local Repair 2 code change is required by this judgment. The next
authorized product gate is the controlled real-service/account/privacy/
two-device packet on one unchanged release, followed by owner/native/public
verification as applicable.

No auth, email, upload, production, external-service, deployment, Git, source,
test, state, backlog, queue or painpoints mutation was performed by this
rejudge.
