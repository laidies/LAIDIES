# Current identity and continuation authority

Evidence reconciliation date: 2026-08-02

Status: **DEPLOYED / PUBLICLY VERIFIED CORE — DO NOT REGRESS TO OLD “NOT TESTED” CLAIMS**

## Why this file exists

Searches repeatedly surfaced older pre-release audits saying Supabase account,
magic-link, Closet and cross-device behavior was untested. Those documents are
valid history, but they predate the released identity and continuation work.
They must not be summarized as current status.

## Current authoritative evidence

The release branch `resident-continuation-20260729` records:

- source commit `28f483e25c021e37e0acd2687abcae26a6d66927`;
- release-evidence commit `8f813c4b`;
- Cloudflare deployment `9f161385-7486-4207-9afe-8512ea453973`;
- deployed private Supabase identity/Card and continuation stores with RLS and
  authenticated RPC boundaries;
- anonymous and direct-table denial;
- two temporary accounts and three authenticated sessions;
- same-account cross-session Card restoration and account isolation;
- real browser Card restoration in a clean 390×844 browser;
- account-backed Closet rendering;
- cross-browser Episode 02 position restoration at `123.4` seconds;
- same-browser account switching that cleared Resident A's supported cache and
  restored Resident B's continuation;
- idempotency, stale revision, invalid-envelope, revoke/reclaim and cleanup
  checks;
- public byte-for-byte verification at the immutable Cloudflare origin and
  `laidies.ai`;
- deletion of disposable verification users and credential fixtures.

Exact historical receipts, preserved on the release branch:

- `operations/product-stewards/resident-card/resident-continuation-v1-2026-07-29.md`
- `operations/product-stewards/resident-card/live-account-cross-browser-verification-2026-07-27.md`

These can be read without switching branches:

```sh
git show resident-continuation-20260729:operations/product-stewards/resident-card/resident-continuation-v1-2026-07-29.md
git show resident-continuation-20260729:operations/product-stewards/resident-card/live-account-cross-browser-verification-2026-07-27.md
```

## Required interpretation

- Do **not** say identity, account restoration, RLS isolation, account-backed
  Closet rendering or supported cross-device continuation are generally
  untested. They have release and public evidence.
- Ali reports that account-entry and related flows have been exercised several
  times. Before claiming any narrower subflow is missing—such as email
  delivery, link recovery, UI sign-out or a specific Closet-native mutation—an
  agent must reconcile the newest exact receipt and current public behavior.
- If the exact receipt for a user-reported test is not present on the active
  branch, classify it as **EVIDENCE RECONCILIATION REQUIRED**, not “the feature
  does not work” and not “Ali needs to test it again.” Search branches and
  release history before requesting repetition.
- The supported continuation document is deliberately bounded. It includes
  episode/tour progress, charms, trading-card metadata, Puffy board/pouch and
  supported completion flags. It does not convert prompts, drafts, messages,
  discussions, Girl Talk choices or arbitrary private content into a general
  cross-device ledger.
- A new accepted-byte change, provider change or newly promoted capability may
  require focused regression evidence. That does not erase the existing pass.

## Superseded current-status claims

Pre-2026-07-29 files that say account/cross-device is `NOT TESTED`, unavailable
or device-local-only are historical baselines unless they identify a newer
accepted regression. They may explain what was fixed; they may not define the
current released status.

## Prevention rule

Every capability summary must select the newest evidence by release ancestry
and evidence date, then preserve proven scope and list only the delta still in
question. Never flatten “partially bounded” into “unproven.”
