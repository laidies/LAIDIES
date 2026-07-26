# MAiKEOVER controlled account-preflight Repair 1 independent re-judge

**Judge verdict:** **FAIL — REPAIR 1 DOES NOT CLEAR P0**  
**Review date:** 2026-07-25  
**Release status:** **NOT DEPLOYED · NOT PUBLICLY VERIFIED**  
**Authority used:** local source, deterministic synthetic mocks and one fresh
local artifact only. No production endpoint, email, magic link, account,
private resident data, credential, upload, avatar generation, reward mutation,
deploy or public-origin request was exercised.

## Executive judgment

Repair 1 resolves several serious findings from the first independent review:

- MAiKEOVER now commits the declared Card fields to one read-verified,
  versioned `laidies_resident_card_v1` envelope;
- valid legacy values hydrate only when the envelope is absent and are not
  silently migrated until an explicit save;
- failed MAiKEOVER envelope writes preserve the exact prior envelope and
  untouched legacy bytes in the permanent quota/denial fixtures;
- Share has no local-handle fallback and requires a current session, current
  profile handle and authoritative public flag;
- controlled mode requires localhost/127.0.0.1, an explicit flag, a
  `synthetic-*` fixture ID and the injected client, while prohibited external
  requests are denied;
- the deterministic fixture now models Account A and Account B, owner rows,
  public/private/nonexistent/reserved equivalence, a denied B-to-A write,
  visibility revocation, stale-content removal and service failure; and
- the public Card path no longer reads raw `member_reward_events`.

The candidate still fails P0 for three independent reasons.

1. **Closet local edits can still report success after a partial write
   failure.** `writeCache()` commits the envelope, then attempts episode,
   activity, motto, quote, archetype, avatar, storefront, character and
   cocktail writes through a helper that swallows every storage error. It
   returns `true` regardless, and the UI announces “Saved on this device.”
   Those fields are part of the visible edit form and returned Card experience,
   so a quota/denial failure can leave the requested edit missing while
   success is announced. The repaired permanent suite injects failure into the
   MAiKEOVER envelope, not into these Closet edit writes.
2. **The public Card allowlist contradicts the controlling privacy packet.**
   The exact query and its synthetic projection include `generation`,
   `industry` and `ai_comfort`. The external packet explicitly requires all
   three to be absent from the public response and DOM. The nearby source
   comment also says profile attributes such as age bracket and industry were
   not chosen for the Card. An explicit select is not a restricted select when
   its allowlist contains prohibited fields.
3. **P0-6 accessibility/evidence coverage remains incomplete.** The permanent
   suite checks core keyboard operation, save-result focus, live status,
   reduced motion and 320/390/1280 layouts, but it does not establish the
   required logical Tab order across all seven drawers, held-disclosure focus,
   announcement deduplication, contrast of state/failure/disabled/focus styles,
   a distinct 200% text/reflow case, or the required Closet and Resident Card
   held/error-state matrix.

The source and exact-artifact suites pass because their assertions do not cover
the first two contradictions. A green suite therefore remains useful
regression evidence, but it is not acceptance evidence for the full P0
contract.

## Mandatory championship floors

| Mandatory floor | Score | Result | Evidence |
|---|---:|---|---|
| Product quality and user value | 17/20 | **PASS** | The salon-first local Card journey remains useful and distinctive; the declared MAiKEOVER fields persist atomically. |
| Accuracy, safety and trust | 13/20 | **FAIL** | Closet can announce a local edit succeeded after part of that edit failed; the public projection includes fields the privacy contract prohibits; required accessibility evidence is incomplete. |
| Positive LAiDIES brand contribution | 18/20 | **PASS WITH OWNER HOLD** | The ritual, writing and Card object remain recognizably LAiDIES. Automated renders are not Ali's visual approval, and trust defects still block launch. |

**Championship result: FAIL.** Accuracy, safety and trust remains below the
non-compensable 17/20 floor.

## Full quality score

| Dimension | Weight | Score |
|---|---:|---:|
| Product purpose and local user value | 20 | 17 |
| Accuracy, safety and state truth | 20 | 13 |
| LAiDIES brand contribution and craft | 20 | 18 |
| Identity dignity, privacy and consent | 15 | 11 |
| UX and accessibility | 10 | 8 |
| Technical integrity and reliability | 10 | 8 |
| Maintainability and evidence quality | 5 | 3 |
| **Total** | **100** | **78 / 100 — FAIL** |

The score cannot override the failed trust floor or any open P0.

## Repair 1 P0 disposition

| Original P0 | Verdict | Independent evidence |
|---|---|---|
| P0-1 — atomic local Card persistence | **PARTIAL / FAIL** | MAiKEOVER's one-write versioned envelope, legacy import-only behavior and exact prior-byte preservation pass. Closet still performs success-relevant secondary writes after the envelope and swallows their failures, so local edit truth is not atomic or honest for the full visible edit form. |
| P0-2 — verified-public Share gate | **PASS LOCALLY** | Share is disabled unless `currentSession`, `currentProfile.card_username` and `member_card_is_public === true` agree. There is no local handle or current-URL fallback. Real provider/session truth remains unverified. |
| P0-3 — controlled dependency isolation | **PASS AS MOCK ISOLATION** | Both pages require local host, explicit flag, synthetic fixture ID and injected client. The source and exact-artifact suites recorded no prohibited controlled request. This remains mock proof only. |
| P0-4 — actual deterministic A/B contract | **PARTIAL / FAIL** | A/B owner isolation, denied B-to-A write, public/private/nonexistent/reserved equivalence, visibility revocation, stale-content removal and service failure are now deterministic. However, the fixture defines the same overbroad public projection as the implementation; its assertion excludes only a subset of prohibited fields and does not prove the complete response/DOM/URL/console/analytics sentinel matrix required by the P0. |
| P0-5 — restricted public data | **PARTIAL / FAIL** | Public Card calls are restricted to `public_resident_cards`, and raw `member_reward_events` is no longer called. The exact public select still includes `generation`, `industry` and `ai_comfort`, contrary to the approved external privacy inventory. |
| P0-6 — accessibility and exact-artifact gates | **PARTIAL / FAIL** | Exact-artifact input is first-class and the same unmodified suite passes source and artifact. Core keyboard/focus/live/reduced-motion/reflow checks pass. The remaining named drawer-order, held-focus, deduplication, contrast, 200% and held/error-state checks are absent. |
| P0-7 — independent rejudge then external packet | **FAIL / EXTERNAL HOLD PRESERVED** | This independent rejudge is complete and fails. The controlled external packet is still unexecuted and must not run against a candidate with local P0 failures. |

## Exact evidence

### Source checks

- `node scripts/check-maikeover-contract.mjs` — **PASS**.
- Source browser suite with evidence redirected to
  `/tmp/maikeover-rejudge-source-evidence` — **PASS**.
- `node scripts/check-inline-js.js` — **PASS**, 353 scripts / 132 pages.
- `node scripts/check-local-links.js` — **PASS**, 1,949 references / 110 pages.
- `node scripts/check-town.js` — **PASS**.
- `node scripts/check-product-stewards.mjs` — **PASS**, 65 products / 3 of 3
  active.

The browser suite truthfully labels itself:

> local atomic-card UI/storage/error/privacy/deterministic Account-A-B mock only

and explicitly says it is not proof of production auth, email, public Card,
RLS, avatar, reward or cross-device behavior.

### Fresh exact artifact

- Artifact: `/tmp/laidies-maikeover-rejudge.1hpwCx`
- Builder result: 1,077 files, 961.39 MiB, with the existing advisory warning
  above 750 MiB.
- Unmodified browser suite against that artifact — **PASS**.
- Public metadata validator — **PASS**.

All five governed source/artifact hashes match:

| File | SHA-256 |
|---|---|
| `maikeover.html` | `dd1f50377e4807507bef93f232c6bbfe6f62dbc64e38899b2875baf21f872f49` |
| `resident-card.html` | `17e9de9f23c4b7cc74abac55bc5268678b464bfa619a7d508f7975119d8c50b9` |
| `laidies-card.html` | `1ba2aae269908902a9094254236d6c1eb5e14f379762539567f875c3265ea31e` |
| `content/maikeover-v2.css` | `97806df047768cfa7428d626a0291f2c9e4c4e0b5b86494ad7234e85ed42bc6d` |
| `content/site/maikeover-v2.js` | `75cb7cd5bbb22a0180e8546a5062a934b09d75f56b0445cf2b8565b671fbca2b` |

### Residual local-edit truth defect

In `laidies-card.html`, `writeCache()`:

1. read-verifies the Card envelope;
2. calls a secondary `write()` helper for the rest of the visible edit fields;
3. catches and discards every secondary `localStorage.setItem` error; and
4. unconditionally returns `true`.

The signed-out save handler treats that return as complete success and displays
“Saved on this device.” This is the same completion-contract class recorded in
BTB-105: success is tied to reaching the end of control flow rather than
verified persistence of the complete declared edit.

### Residual public-field defect

The public Card query selects:

`generation,industry,ai_comfort`

alongside display fields. The deterministic fixture copies those fields into
its `publicFields` allowlist, while the assertion rejects only email, goal,
timestamps and an ID pattern. The test therefore validates the implementation's
allowlist against itself rather than against the approved privacy inventory.

The controlling external packet requires public response and DOM to exclude
email, account ID unless essential, age/generation, AI comfort, industry,
goals, timestamps, tokens, raw avatar input and every owner-only field.

## Exact Repair 2 packet

### Repair 2A — make the complete local edit one honest contract

Choose one of these bounded implementations:

1. add every device-local field exposed by the Closet edit form to one
   versioned authoritative envelope and commit/read-verify it once; or
2. deliberately narrow the local edit form to the fields in the existing
   envelope and label the unavailable account-backed fields honestly.

Do not retain a success-relevant sequence of swallowed mirror writes. If
compatibility mirrors remain, they may update only after the authoritative
commit and cannot be the source used to render a claimed successful edit.

Required fixtures:

- failure at the authoritative write;
- quota/denial on every compatibility-mirror position;
- exact prior envelope and untouched legacy preservation;
- requested-value round trip for every visible local edit field;
- empty/cleared optional values;
- reload, second tab and isolated context; and
- failure text, retry, focus and no success-shaped render when the complete
  requested edit did not persist.

### Repair 2B — define one approved public Card allowlist

Create one named public-card field contract owned by Identity/Privacy and use it
for:

- the database/view migration;
- the browser select;
- the synthetic response projection;
- response/DOM/URL/console/analytics sentinel assertions; and
- the external packet's field inventory.

Remove `generation`, `industry` and `ai_comfort` from the public Card unless a
new explicit consent and product decision authorizes each field. Keep raw
reward events, owner profiles, account identifiers, goals, timestamps, tokens
and private metadata absent. The test must compare the exact selected set to
the approved allowlist; “not `*`” and a short deny regex are insufficient.

### Repair 2C — complete the named P0-6 matrix

Add deterministic checks for:

- logical Tab order through all seven MAiKEOVER drawers;
- focus after save success, save failure and held-account disclosure;
- live-announcement deduplication;
- contrast of state, failure, disabled and focus treatments;
- distinct 200% and 400% text/reflow proxies;
- Closet and Resident Card held/error states; and
- the identical source and fresh-artifact executions without test rewriting.

Then have a different independent judge rerun the complete source and exact
artifact. Only a passing candidate may advance to the authorized external
packet.

## External packet judgment and preserved holds

`controlled-external-test-packet-2026-07-25.md` remains a **PASS AS A TEST PLAN,
NOT PRODUCT EVIDENCE**. It covers real release/backend identity, two authorized
synthetic accounts, magic-link states, owner isolation, public/private and
non-enumerating lookup, visibility revocation and cache behavior, restricted
field inventory, avatar failure/privacy/retention, rewards, analytics,
authentication telemetry and CDN/public-cache retention/deletion.

It has not been executed. Production email, authentication, Supabase/RLS,
public Cards, real two-device restoration, avatar handling, rewards, analytics,
Safari/VoiceOver, Ali's visual approval, commit, deployment, publication and
promotion all remain held and unverified.

No auth, email, upload, production, external-service, deployment, Git, product
source, test, state, backlog, queue or painpoints mutation was performed by this
rejudge.
