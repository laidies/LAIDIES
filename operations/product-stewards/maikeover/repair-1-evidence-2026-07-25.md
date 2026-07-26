# MAiKEOVER independent-review Repair 1 evidence

**Status:** REPAIR 1 READY FOR INDEPENDENT REJUDGE
**Release status:** NOT DEPLOYED · NOT PUBLICLY VERIFIED
**Authority:** local source and deterministic synthetic fixtures only

## Judge findings repaired

1. **Atomic local Card:** `laidies_resident_card_v1` is one versioned,
   authoritative seven-field envelope. MAiKEOVER commits it with one
   read-verified `setItem`; Closet hydrates and locally edits the same envelope.
   Legacy per-field keys are import-only and are not partially rewritten.
2. **Share truth:** Closet Share has no local-handle fallback. It remains
   disabled unless a provider-shaped injected session, current profile handle
   and `member_card_is_public === true` agree.
3. **Mock isolation:** both pages require localhost/127.0.0.1, the explicit
   controlled flag, a `synthetic-*` fixture identifier and an injected client.
   Controlled mode has no CDN/configured-service fallback and suppresses
   Plausible/Clarity loading.
4. **Actual A/B contract:** deterministic Account B views Account A public,
   private, revoked, nonexistent and reserved states; denied cross-account write,
   owner-B state and service failure are asserted with a call ledger.
5. **Public reward boundary:** public Card selects explicit fields from
   `public_resident_cards` only and does not query raw `member_reward_events`.
   Public collections are omitted pending a separately owned restricted
   projection.

## Adversarial evidence

- all seven fields round-trip through the envelope;
- duplicate save produces the same bytes;
- reload and a second same-context tab restore it;
- an isolated context receives no first-context Card;
- empty optional fields create a valid envelope;
- valid legacy fields hydrate without a silent write and migrate only on
  explicit Save;
- corrupt envelope falls back safely and remains untouched until explicit Save;
- denied get/set/remove announces failure and withholds the Closet handoff;
- authoritative quota failure leaves the prior envelope and all untouched
  legacy movie/TV/name/carrying values byte-for-byte unchanged;
- a local-only handle cannot enable or copy Share;
- Account B cannot write Account A;
- visibility-off removes Account A content after reload;
- private, nonexistent, reserved and service-failure states share the
  non-revealing result;
- the public flow records only an explicit `public_resident_cards` select and no
  owner/reward-table query; and
- controlled fixtures make no request to Supabase, jsDelivr, the avatar Worker,
  auth/email providers, Plausible or Clarity.

## Test commands

```text
node scripts/check-maikeover-contract.mjs
PLAYWRIGHT_CORE_PATH=/tmp/laidies-high-pw.8bUJ9V/node_modules/playwright-core node scripts/test-maikeover-browser.mjs
node scripts/check-inline-js.js
node scripts/check-local-links.js
node scripts/check-town.js
node scripts/check-product-stewards.mjs
```

The browser runner accepts `MAIKEOVER_ROOT` and
`MAIKEOVER_EVIDENCE_DIR`, so the same unmodified suite can run against a named
fresh artifact.

## Completed verification

- source browser suite: **PASS**;
- fresh artifact: `/tmp/laidies-maikeover-repair1.eGHBUk`, 1,077 files,
  961.39 MiB, advisory warning above 750 MiB;
- the unmodified browser suite against that exact artifact: **PASS**;
- public metadata validator against the artifact: **PASS**;
- inline JavaScript: **PASS**, 353 scripts / 132 pages;
- local links: **PASS**, 1,949 references / 110 pages;
- town contract: **PASS**;
- product steward system: **PASS**, 65 products / 3 of 3 active;
- scoped diff check and state JSON: **PASS**.

Governed source/artifact hashes match:

| File | SHA-256 |
|---|---|
| `maikeover.html` | `dd1f50377e4807507bef93f232c6bbfe6f62dbc64e38899b2875baf21f872f49` |
| `resident-card.html` | `17e9de9f23c4b7cc74abac55bc5268678b464bfa619a7d508f7975119d8c50b9` |
| `laidies-card.html` | `1ba2aae269908902a9094254236d6c1eb5e14f379762539567f875c3265ea31e` |
| `content/maikeover-v2.css` | `97806df047768cfa7428d626a0291f2c9e4c4e0b5b86494ad7234e85ed42bc6d` |
| `content/site/maikeover-v2.js` | `75cb7cd5bbb22a0180e8546a5062a934b09d75f56b0445cf2b8565b671fbca2b` |

## Holds preserved

This is **MOCK UI PROOF ONLY**. It does not approve production email, auth,
Supabase/RLS, real public Cards, cache retention/deletion, second-device
restoration, avatar generation, rewards, analytics configuration, Ali's visual
approval, commit, deployment, publication or promotion. The controlled external
packet and an independent rejudge remain mandatory.
