# Control Room handoff — domain metadata successor v1

**Evidence time:** `2026-07-26T15:32:56-0700`  
**Status:** `BUILT / VERIFIED / AUDIENCE ACCEPTED LOCALLY — PUBLIC HOLD`  
**Public/provider/deploy mutation:** none

Literal candidate:
`domain-transition/v1/domain-metadata-successor-v1.json`, SHA-256
`ad654c1168c2174fad54391165e753c303757bbe36279318cf8f31fa88935a70`,
payload
`1e7d887854f25236af3f98fabc01d64f9669631318474161e18d1c6af440659f`.

Literal changed corpus:
`domain-transition/v1/domain-metadata-successor-v1-output.json`, SHA-256
`2d6ce3cf36b65d2740a9dd154d2f8e823f76c1fdc5c10d82085c41fb78f708b5`,
corpus SHA-256
`f632f8142fdf4a5e9c51825d237d9762a1ca638c5cf1b7d5b92b92abb0fba50a`.
It lists the exact predecessor and successor SHA-256 for all 28 sitemap route
files.

Result: all 28 local source routes and all 28 curated artifacts have exactly
one canonical and one `og:url`, each byte-matching its sitemap URL. Missing and
mismatched counts moved from `26/1` to `0/0` for both fields. The 28-URL
sitemap remains byte-identical at `accbb51c…6fa0`.

Rollback: the deterministic inverse reconstructs all 28 exact predecessor
hashes. Duplicate tags and missing-head mutations fail closed. The transformer
is idempotent.

Audience & Growth **ACCEPT**:
`../audience-growth/evidence/domain-metadata-successor-v1-independent-audience-review-2026-07-26.md`,
SHA-256
`41fd0a59d738410008129036d66a94d7dbea8211568dcfacc69d4ab7a8f1eb49`.
No local result establishes public behavior.

Append-only local acceptance closure:
`domain-transition/v1/domain-metadata-successor-v1-closure.json`, SHA-256
`a3d405636d44533d27f83951c95a8fa0d458eefefc38bac60fd1847c9948db9d`,
payload
`c41d85fa23cd27cd559880b20c0d8de7d95f4b607e02e7b8feeb19daa381eff3`.

Checksum-bound local release artifact:
`domain-transition/v1/domain-metadata-release-artifact-v1.json`, SHA-256
`33045684ea070a4ba0ef6fd3d79baba276492a47eac789f6d5719fd888520d83`,
artifact corpus
`172ec193a307d4ceb30f8abb477469b768a143576737e20948efe74cabd211e0`.
It records the exact fresh curated-build SHA-256 for all 28 accepted route
artifacts; the build contained 1,088 files, 1,003,850,877 bytes, zero missing
and zero oversized dependencies.

Local release/rollback binding:
`domain-transition/v1/domain-metadata-release-binding-v1.json`, SHA-256
`44d1aeb348df6dbe8ed2f0b53061f7f5abd220a5b588986bbcdd660b8fdfccce`,
payload
`51949ae4709625902df368df81546445747a75a41f1f1605faa90559212e6296`,
version key `domain-metadata-2026-07-26-v1-ad654c1168c`. Its fresh-build test
passes 28 artifact hashes and all 28 rollback predecessors. It is not a deploy
or public release.

Remaining: provider redirect rule/export/rollback, complete public legacy and
unknown-path corpus, search/social cache migration, privacy-safe analytics
attribution, native/public metadata delivery and the observation/owner gates
for legacy Worker CORS retirement.

Exact next action: preserve the accepted local release tuple for later
provider/public/search-cache/aggregate attribution proof. Do not retire legacy
Worker CORS until its observation and owner gates pass.
