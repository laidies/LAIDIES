# Platform owner receipt — `wearelaidies.com` → `laidies.ai`

Status: `PUBLIC SAMPLE PASS / RELEASE-WIDE PROOF BLOCKED`  
Evidence reconciled: 2026-07-26 13:22:28 PDT (-0700)  
Platform mutation: none

## Bound evidence

- Audience & Growth packet:
  `operations/product-stewards/audience-growth/FIRST-VISIT-ACQUISITION-AND-DOMAIN-CONTINUITY-2026-07-26.md`
- packet SHA-256:
  `d3687caf24681eddf34e4e89fba8e02ecfd48d514ef57d2574d021b4706d5fb4`
- repository `_redirects` SHA-256:
  `e74e15d5856004e45855fb1f40582abd3a3247019d09e29175f1a7e74fcb7999`
- sitemap SHA-256:
  `accbb51c209f26c027d9bfd4ecb64886bdef515114e056c041acd7d0bfd56fa0`
- robots SHA-256:
  `ef9fff897a435dbdba6f9081182bfa0cdf58a241b2dd86ca2331a54607689793`

## Current public redirect truth

Fresh checks by Audience & Growth and Platform agree:

- HTTP and HTTPS apex and `www.wearelaidies.com` return permanent `301` to
  `https://laidies.ai/`, then `200`;
- tested legacy paths keep their path on the first `laidies.ai` hop;
- tested query strings, including UTM parameters, are preserved;
- tested Issue 01–03 routes ultimately return `200`;
- `/start-here.html?utm_source=legacy` works but takes three redirects:
  legacy-domain `301`, current-site retired-route `301`, extension-removal
  `308`, then `200`;
- no redirect loop was observed in the sampled set; and
- cached search/social copy for the old origin still exists and is not proof
  of current origin behavior.

The host transition rule is not in repository `_redirects`; that file contains
current-site path retirement only. The observed host rule is therefore
provider-managed. Its exact account object, owner, priority, full match
expression, renewal and failure behavior remain unverified without provider
authority.

## Required redirect contract

| Input | Required result |
| --- | --- |
| `http://wearelaidies.com/<path>?<query>` | one permanent `301` or `308` to `https://laidies.ai/<path>?<query>` |
| `https://wearelaidies.com/<path>?<query>` | same path/query on canonical HTTPS origin |
| HTTP/HTTPS `www` | same canonical target as apex |
| fragments | browser-preserved; server rule must not invent or remove them |
| known legacy path | first hop preserves the path; current-site retirement may then use its separately admitted redirect |
| unknown path | same-path canonical redirect, then canonical-origin `404`; never root-soft-404 |
| malformed/unsafe target | fail closed; never reflect a foreign host or create an open redirect |
| canonical-origin request | no legacy-domain bounce and no loop |

Acceptance requires an executable corpus containing every sitemap route,
known historical backlink, root, nested route, query, unknown path, encoded
path and both host/protocol variants. It must assert first-hop status/location,
query preservation, maximum hops, final status, no loop and no open redirect.

## Canonical/search/social truth

`sitemap.xml` contains 28 `https://laidies.ai` URLs and `robots.txt` names the
canonical sitemap. Every sitemap URL maps to a local file. Local executable
characterization currently reports:

- canonical missing: 26/28;
- canonical mismatch: 1/28;
- `og:url` missing: 26/28; and
- `og:url` mismatch: 1/28.

The mismatches are the retired Fun Pack canonical and Community's root
`og:url`; their intended dispositions require route-owner review. Metadata
repair is current-release work, not an optional label. Each sitemap route must
have its admitted canonical URL and matching Open Graph/social URL before the
domain transition is release-complete.

Search migration requires canonical tags, updated sitemap resubmission,
provider/search-console evidence where authorized, monitoring of old-domain
indexed URLs and a no-premature-retirement window. Search residue is expected
to decay; it is not fixed by changing redirects alone.

## Analytics and privacy

Observed redirects preserve tested UTM queries. Plausible is embedded on the
Homepage, Start Here and Visitor's Centre. No read-only provider report proves
that legacy traffic is attributed correctly, so attribution is `UNKNOWN`, not
zero and not PASS.

The measurement contract may retain only admitted coarse campaign fields such
as `utm_source`, `utm_medium`, `utm_campaign` and `utm_content`. It must not
store full referrer URLs or arbitrary query strings that can contain private
data. Acceptance requires one consent-compatible aggregate test from legacy
URL to canonical landing plus a provider-owned definition/timestamp.

## Monitoring, rollback and legacy-origin retirement

Monitor apex/`www`, HTTP/HTTPS, root, representative nested paths, query,
unknown path, TLS/certificate validity, redirect count and final canonical
status at least daily during migration and before every release. Alert on
non-permanent status, path/query loss, foreign target, loop, soft-404 or
canonical-origin failure.

Rollback means restoring the last verified redirect-rule object or disabling
only a newly defective successor rule while preserving canonical site
availability. It does not mean reviving old-domain content. Provider rule ID,
prior rule export/hash and authorized operator are required before mutation.

Legacy origins are still accepted by:

- `worker/subscribe.js`;
- `worker-fairy-godmother/src/index.js`; and
- the immutable FAiRY production-v18 recovery artifact.

The recovery artifact remains historical. Active Worker allow-lists may remove
legacy origins only after all of these are true:

1. redirects have passed the full corpus continuously for an approved
   observation window;
2. no admitted live page submits directly from the old origin;
3. aggregate logs show no required old-origin CORS use for the agreed window;
4. social/email active sources use `laidies.ai`;
5. rollback evidence exists; and
6. Security and the Worker owners accept the exact change.

No Worker or provider configuration changed in this receipt.

