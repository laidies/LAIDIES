# Domain canonical / Open Graph / sitemap successor v1 — local maker evidence

**Evidence time:** `2026-07-26T15:32:56-0700`  
**Status:** `BUILT AND VERIFIED LOCALLY — INDEPENDENT ACCEPTANCE PENDING`  
**Deploy/public/provider/cache/analytics/CORS mutation:** none

## Authority and exact corpus

The bounded authority is
`domain-transition-owner-receipt-v1-2026-07-26.md`, SHA-256
`93361a7a42a4fb7de63f5b1f0120e6e63557529b419b2c92583825b56409cb99`.

The exact predecessor and successor hashes for all 28 changed source routes are
listed in:

- `domain-transition/v1/domain-metadata-predecessor-v1.json`, SHA-256
  `7a24033314f00ab812e2795aa1882d2deadcaed96891ba4b8bd20896f9059ff4`;
- `domain-transition/v1/domain-metadata-successor-v1-output.json`, SHA-256
  `2d6ce3cf36b65d2740a9dd154d2f8e823f76c1fdc5c10d82085c41fb78f708b5`,
  corpus SHA-256
  `f632f8142fdf4a5e9c51825d237d9762a1ca638c5cf1b7d5b92b92abb0fba50a`.

Every route in `sitemap.xml` changed only by normalizing or adding one exact:

```html
<link rel="canonical" href="https://laidies.ai/<route>" />
<meta property="og:url" content="https://laidies.ai/<route>" />
```

The root uses `https://laidies.ai/`. The sitemap already contained the correct
28 canonical URLs and remains byte-identical at
`accbb51c209f26c027d9bfd4ecb64886bdef515114e056c041acd7d0bfd56fa0`.

## Result and proof

Before:

- canonical missing `26`, mismatch `1`;
- `og:url` missing `26`, mismatch `1`.

After:

- canonical missing `0`, mismatch `0`;
- `og:url` missing `0`, mismatch `0`.

`test-domain-metadata-successor-v1.mjs`, SHA-256
`b242558baf10f9aaefa1c7b64ace8f6311a73ad7edeaf6bb9d4da8c37e9db3d5`,
passes all 28 source files, all 28 curated artifacts, two invalid mutations,
idempotency and exact inverse rollback for all 28 predecessor hashes.

The pre-existing local readiness gate, SHA-256
`bc97ea6614b72367df822622488ffce11a3895020af2e7c9b4e984855e99774f`,
now returns:

`DOMAIN TRANSITION LOCAL READINESS PASS sitemap=28 canonical_missing=0 canonical_mismatch=0 og_missing=0 og_mismatch=0 mutation=false`

The sealed candidate receipt is
`domain-transition/v1/domain-metadata-successor-v1.json`, SHA-256
`ad654c1168c2174fad54391165e753c303757bbe36279318cf8f31fa88935a70`,
payload
`1e7d887854f25236af3f98fabc01d64f9669631318474161e18d1c6af440659f`.

## Evidence ceiling and next action

This proves the exact local source and curated metadata corpus only. It does
not prove or change the provider-managed legacy redirect rule, deployed pages,
public caches, Search Console/social preview refresh, production analytics
attribution or active Worker CORS allow-lists.

Audience & Growth is the independent acceptance owner for acquisition/search/
social semantics and has been dispatched against the exact candidate.

After its PASS/HOLD, the remaining release gates are provider redirect-rule
export plus rollback, full public legacy-route/unknown-path/no-loop corpus,
search/social cache monitoring, privacy-safe aggregate attribution and the
approved observation window plus Worker-owner acceptance before legacy CORS
retirement.

Learning scan reused BTB-161: fresh origin routing and search/social cache
residue remain separate evidence layers. No new qualifying prevention rule was
needed.

