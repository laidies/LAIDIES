# MAiKEOVER controlled account-preflight independent review

**Judge verdict:** **FAIL — LOCAL CANDIDATE REQUIRES REPAIR**  
**Review date:** 2026-07-25  
**Release status:** **NOT DEPLOYED · NOT PUBLICLY VERIFIED**  
**Authority used:** local source, deterministic synthetic mocks and a fresh local
artifact only. No production endpoint, email, magic link, account, private
resident data, credential, upload, avatar generation, reward mutation, deploy or
public-origin request was exercised.

## Executive judgment

MAiKEOVER has a strong product idea and a recognizably LAiDIES execution. The
salon/vanity remains the working interface rather than becoming a generic
profile form. A visitor can make a useful card without an account, all seven
declared local fields round-trip, the carrying choice reaches the Closet, a
clean second browser context does not inherit the first card, and held account,
public-card, Resident Card email and avatar paths fail closed by default. The
new state language treats a local handle with dignity: it says what this device
remembers without pretending that a browser value establishes membership.

The candidate cannot pass independent acceptance yet:

1. **A failed save can destroy an existing card.** The implementation snapshots
   each key only as it reaches that write, but on failure attempts rollback over
   every key. A deterministic failure on the third key preserved the first
   three old values but deleted the old movie, television, display name and
   carrying choice. The UI correctly said the save failed, yet the previous
   card was silently damaged.
2. **A device-local handle can still produce a public-looking share URL.** The
   Closet share handler falls back to `laidies_card_username`. With only a
   synthetic local handle and no session/public Card, the visible Share control
   copied `/laidies-card.html?u=local_only` and announced “Link copied ✓.”
3. **The controlled MAiKEOVER harness is not actually mock-isolated.** With the
   localhost preflight flag and an injected synthetic client, MAiKEOVER ignored
   the injected client and requested the Supabase SDK from jsDelivr. Had that
   request not been blocked, it would have instantiated the configured Supabase
   project. The Closet accepts the injected client before external setup;
   MAiKEOVER does not.
4. **The claimed two-account mock is narrower than its label.** The maker suite
   uses one signed-out public fixture and one missing private handle. It does not
   model Account B's authenticated read/write boundary, visibility changes,
   stale cache, RLS denial or cross-account mutation. An independent synthetic
   Account-B public lookup did show correct UI isolation, but also showed that a
   public Card proceeds from `public_resident_cards` to a direct
   `member_reward_events` query. That public reward boundary remains unproven
   and should not be exposed through a raw owner-oriented event table.

These are local-preflight defects. They do not establish a production privacy
incident because the public default remains held and all judge traffic to
Supabase, jsDelivr, the avatar Worker and analytics was blocked.

## Mandatory championship floors

The charter requires user value, accuracy/safety/trust and positive LAiDIES
brand contribution each to score at least 17/20. Revenue cannot compensate.

| Mandatory floor | Score | Result | Evidence |
|---|---:|---|---|
| Product quality and user value | 17/20 | **PASS** | Room-first card creation is useful; seven local fields save/reload; carrying reaches the Closet; clean-context isolation works. |
| Accuracy, safety and trust | 11/20 | **FAIL** | Failed save damages prior state; local handle can create public-looking link; mock flag can reach production-configured dependency; public rewards boundary is unproven. |
| Positive LAiDIES brand contribution | 18/20 | **PASS WITH OWNER HOLD** | Salon ritual, voice, card object and local-first welcome are distinctive and respectful. Trust defects prevent launch approval; automated screenshots are not Ali's visual approval. |

**Championship result: FAIL.** One mandatory floor is below 17/20.

## Full quality score

| Dimension | Weight | Score |
|---|---:|---:|
| Product purpose and local user value | 20 | 17 |
| Accuracy, safety and state truth | 20 | 11 |
| LAiDIES brand contribution and craft | 20 | 18 |
| Identity dignity, privacy and consent | 15 | 11 |
| UX and accessibility | 10 | 8 |
| Technical integrity and reliability | 10 | 6 |
| Maintainability and evidence quality | 5 | 2 |
| **Total** | **100** | **73 / 100 — FAIL** |

The score cannot override the failed trust floor.

## Quality-floor verdicts

| Floor | Result | Independent evidence |
|---|---|---|
| Product intent | **PASS** | Card-making remains optional, local-first and room-based; the product no longer says a local save makes someone a member. |
| Identity dignity | **PASS LOCALLY** | “This device remembers” and explicit account/public/cross-device distinctions avoid treating a local handle as verified identity. |
| Full-field save and reload | **PASS, NORMAL PATH** | Background, song, saint, movie, television, display name and carrying choice all matched after reload. |
| Non-destructive storage failure | **FAIL — P0** | Mid-sequence quota failure deleted four untouched fields from the prior card. |
| Denied storage | **PASS, VISIBLE FAILURE** | Denied read/write/remove leaves preview usable, announces failure and withholds the Closet success handoff. |
| Corrupt storage | **PARTIAL / FAIL** | Unknown enum values do not execute markup, but a subsequent successful save can silently clear invalid legacy values. Existing suite does not define or verify a migration/sanitization policy. |
| Isolated second context | **PASS** | A clean browser context did not restore the first context's local card. This is a browser-isolation proxy, not real second-device account proof. |
| Local handle/account wording | **PASS ON MAiKEOVER; FAIL IN CLOSET SHARE** | Arrival and persistence panels are honest; Closet still converts a local handle into a copied public-looking URL. |
| Account/email default hold | **PASS** | Guest-book claim panels stay held; Resident Card email/profile controls are `hidden inert`; no default Supabase/CDN request occurred. |
| Avatar default hold | **PASS** | Upload, description/mode and portrait-generation controls are disabled; no avatar Worker request occurred. |
| Public visibility default | **PASS** | Visibility defaults off and unverified public lookup fails closed. |
| Public/private deterministic UI | **PARTIAL PASS** | Synthetic public A renders without a private sentinel; private A returns the same non-revealing state to synthetic Account B. This does not prove RLS or service privacy. |
| Public reward/data boundary | **FAIL / HELD** | Public mock flow queried `member_reward_events` after `public_resident_cards`. No restricted public-collection view or RLS proof is established locally. |
| Reward truth | **PASS WITH SHARED HOLD** | MAiKEOVER does not award a reward for making/saving a card and backgrounds remain choices. Durable reward, spend, refund, delivery and cross-device claims remain unavailable. |
| Keyboard and focus proxies | **PASS** | Native drawer/background buttons operate by keyboard, pressed state updates and visible focus CSS exists. |
| Live status | **PASS** | Persistence, save, avatar hold and Resident Card hold use status/live semantics; save success/failure is announced. |
| Reduced motion | **PASS — Chromium proxy** | Computed root scroll behavior becomes `auto`. |
| Reflow/mobile | **PASS — Chromium proxy** | No page-level horizontal overflow at 1280, 390 or 320 CSS pixels. The 320 test is the 400%-reflow proxy for a 1280-CSS-pixel layout. |
| Privacy-sensitive analytics | **PASS BY SOURCE; CONFIG HELD** | Scoped analytics call carries result class only. No name, email, handle, profile choice, avatar, token or private fixture was sent. Production analytics configuration was not exercised. |
| Mock isolation and maintainability | **FAIL — P0** | MAiKEOVER does not consume the injected deterministic client before CDN/production-config setup; test labels outrun their actual two-account coverage. |
| Exact artifact | **PASS LOCALLY** | Fresh artifact matches all five governed source files and the rendered suite passes against it. |

## Independent test evidence

### Standard source and fresh-artifact checks

- `node scripts/check-maikeover-contract.mjs` — **PASS**.
- Maker browser preflight rerun against source with external requests blocked and
  screenshots redirected outside the workspace — **PASS**.
- Fresh independent artifact:
  `/tmp/laidies-maikeover-independent.XlGdeG` — 1,077 files,
  961.38 MiB; builder warning above the 750 MiB advisory threshold.
- Browser preflight rerun against that exact artifact using an in-memory test
  transformation — **PASS**. The repository test was not edited.
- `node scripts/validate-public-metadata.mjs <artifact>` — **PASS**.
- `node scripts/check-inline-js.js` — **PASS**, 353 scripts / 132 pages.
- `node scripts/check-local-links.js` — **PASS**, 1,942 references / 110 pages.
- `node scripts/check-town.js` — **PASS**.
- `node scripts/check-product-stewards.mjs` — **PASS**, 65 products, 3/3 active.

| Governed file | Fresh source/artifact SHA-256 |
|---|---|
| `maikeover.html` | `d317606722baa953a441fc04d731166ee82911cfdb01e6e0282cd8b00f17ec2e` |
| `resident-card.html` | `17e9de9f23c4b7cc74abac55bc5268678b464bfa619a7d508f7975119d8c50b9` |
| `laidies-card.html` | `6911c38a71f94cf4f13181f945f3c16cd569cfb328ee5a13c20998c2c9c905ad` |
| `content/maikeover-v2.css` | `97806df047768cfa7428d626a0291f2c9e4c4e0b5b86494ad7234e85ed42bc6d` |
| `content/site/maikeover-v2.js` | `e37135280ab927df59c9d0a6bf72b69931689526066adb3534c3e3d5e0bbf8cc` |

### Full-field round trip

The independent normal-path card saved and restored:

- card background `mint`;
- song `Welcome to SUNNYVAiLE — THE LAiDIES`;
- saint `cher-horowitz`;
- movie `10 Things I Hate About You`;
- television `Absolutely Fabulous`;
- display name `Round Trip`; and
- carrying choice `Butterfly clip`.

The standard maker suite currently asserts only name, carrying and background.
All seven belong in the permanent fixture.

### Destructive partial-write reproduction

Starting with a valid prior seven-field card, the judge injected a
`QuotaExceededError` only when writing `laidies_saint`.

Observed:

- visible result: “This browser could not save your card…”;
- Closet handoff: hidden;
- old background, song and saint: preserved;
- old movie, television, display name and carrying: **deleted**.

The rollback loop treats keys it never snapshotted as though they previously did
not exist. More generally, separate localStorage keys cannot provide a
transaction if later writes and compensating rollback can both fail.

### Device-local share reproduction

With only `laidies_card_username=local_only`, no session and the Closet's visible
“Device-local view” state:

- Share control was visible;
- it copied
  `http://127.0.0.1:<port>/laidies-card.html?u=local_only`; and
- the control announced “Link copied ✓.”

The target itself fails closed, but the success-shaped share action still
implies that a public object exists.

### Deterministic privacy and harness probes

- Default held MAiKEOVER made no Supabase, jsDelivr or avatar Worker request.
- Local controlled flag plus an injected client requested
  `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm`; the injected
  client was ignored.
- All such external traffic was aborted. No Supabase project request, auth
  transaction or mutation occurred.
- A synthetic Account-B session viewing synthetic public Account A rendered the
  public card, hid self actions and did not render a private-email sentinel.
- The same Account B viewing private Account A received “No forwarding address”
  and no Account-A content.
- The public lookup called `public_resident_cards` and then
  `member_reward_events`; the private lookup called only
  `public_resident_cards`.

This proves deterministic UI behavior only. It does not prove database columns,
RLS, cache invalidation, account isolation or public reward consent.

## Controlled external packet judgment

`controlled-external-test-packet-2026-07-25.md` is a **PASS AS A TEST PLAN,
NOT AS PRODUCT EVIDENCE**. It correctly requires:

- exact commit, artifact, deployment, public origin and backend versions;
- authorized synthetic fresh email and magic-link delivery;
- invalid, reserved, taken and available handle paths;
- expired/used/fresh link, profile write, visibility, logout and sign-in;
- isolated second device and cross-device field reconciliation;
- two accounts, signed-out lookup, public/private changes, non-enumerating
  failures and owner-only write/read denial;
- RLS and restricted-field inspection;
- synthetic avatar input, malformed/oversized/abusive/timeout/upstream failure,
  retention and deletion evidence;
- reward non-grant, local-choice truth and privacy-safe analytics;
- stop conditions and one-unchanged-release pass rule.

Before authorized execution, add an explicit public-collection check: an
unauthenticated or Account-B public Card must not query/read raw
`member_reward_events`. Either omit collections or use a separately restricted,
consented public collection view whose exact fields, RLS and cache revocation
are tested. Also record deletion/retention results for authentication telemetry
and public-card caches, not only avatar bytes.

The packet remains unexecuted. None of its steps may be reported as passed.

## Exact repair packet

### P0-1 — make local card persistence atomic

Replace the seven independently authoritative keys with one versioned local-card
envelope written by a single `localStorage.setItem`, then read-verify and only
then announce success. MAiKEOVER and Closet must hydrate from that envelope.
Legacy keys may be imported through an explicit, tested migration, but must not
remain competing sources of truth.

If compatibility mirrors are temporarily required, write them only after the
authoritative envelope commits and never use mirror failure to corrupt the last
good envelope. Snapshot every legacy key before any mutation; never interpret a
missing snapshot as evidence that the old key was absent.

Required fixtures:

- failure on each write position;
- persistent quota failure during compensation;
- get/set/remove denial;
- empty optional fields;
- every seven-field round trip;
- legacy valid, missing, unknown and corrupt values;
- duplicate save, reload, two tabs and isolated second context; and
- proof that a failed save leaves the complete prior card byte-for-byte intact.

### P0-2 — gate sharing on verified public state

Remove the `localStorage` handle fallback from the Closet share path. Hide or
disable Share unless a provider-verified session/profile establishes the handle
and the authoritative profile says public visibility is on. A local handle
draft may be displayed only with “not reserved / not public” language and must
never receive copy/share success.

Test local-only handle, signed-out stale handle, private account, public account,
visibility-off-after-public, unavailable service and stale cache.

### P0-3 — isolate deterministic clients from production configuration

Use one explicit dependency-injection seam on both MAiKEOVER and Closet:

- localhost/127.0.0.1;
- explicit controlled-preflight flag;
- injected client with a declared synthetic-fixture identifier; and
- **no CDN import or configured Supabase/avatar fallback while mock mode is
  active**.

Fail the suite on any request to Supabase, jsDelivr, the avatar Worker,
authentication/email providers or analytics. Production/external execution must
use a separate explicitly authorized runner and must never share the mock
success label.

### P0-4 — build an actual deterministic A/B contract suite

Model Account A and Account B sessions, owner profile rows, restricted public
rows, visibility changes, private/not-found equivalence, denied cross-account
read/write, stale-cache revocation, malformed/reserved handles and service
failure. Record every table/RPC and selected field. Assert:

- public UI reads only the restricted public view;
- owner UI reads/writes only the current account;
- Account B cannot read or update Account A owner data;
- private/nonexistent/reserved failures do not enumerate;
- no private sentinel reaches response object, DOM, URL, console or analytics;
- account/reward/avatar failures cannot produce success-shaped UI; and
- test output says **MOCK UI PROOF ONLY**.

### P0-5 — restrict public collection data

Do not read raw `member_reward_events` from a public Card. Until a
Privacy/Identity/Rewards-owned public collection contract exists, omit those
collections. If later approved, expose a dedicated restricted projection with
only opted-in display fields, no account identifier unless essential, no raw
metadata, no transaction/refund/invite data and tested immediate revocation when
visibility changes.

### P0-6 — strengthen accessibility and exact-artifact gates

Keep the passing keyboard/live/reduced-motion/320/390/1280 checks and add:

- all seven drawers in logical Tab order;
- focus after save success, save failure and held-account disclosure;
- live announcement deduplication;
- contrast for state, failure, disabled and focus styles;
- 200% and 400% reflow/text-size proxies;
- Closet and Resident Card held/error states; and
- the same suite against a named fresh artifact without modifying test code in
  memory.

Add a supported artifact-root environment input to the browser test so source
and exact-artifact runs are first-class and recorded separately.

### P0-7 — repeat independent judgment, then run the external packet

A different judge must rerun the repaired source and exact artifact. Passing
local mocks may advance only local UI status. Real account/public/cross-device/
avatar/reward status remains **UNVERIFIED** until the authorized external packet
passes on one unchanged release.

## Preserved holds

This review preserves every current hold:

- production email submission and magic-link delivery;
- authentication, handle claim, profile write, logout/login and session restore;
- public/private Card, RLS, cache revocation and two-account proof;
- real second-device and cross-device restoration;
- avatar upload/generation, abuse controls, timeout, retention and deletion;
- durable reward grants, spending, refund, delivery and public collections;
- Plausible/Clarity production configuration and privacy review;
- Safari, VoiceOver, native zoom/text scaling and real-device touch;
- Ali's visual/creative approval;
- exact release commit/deployment/public-origin proof; and
- deployment, publication, promotion or any other external mutation.

The fresh artifact named above is evidence only and must not be deployed.
