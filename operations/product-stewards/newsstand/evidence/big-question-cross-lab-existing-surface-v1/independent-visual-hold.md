# Independent visual review — Big Question existing longform v1

**Reviewed:** 2026-08-12 America/Vancouver

**Reviewer runtime:** Claude Code 2.1.225, `claude-sonnet-5`, high effort

**Cost:** USD 0.5860858

**Verdict:** `HOLD`

## Exact artifacts

- Candidate prose SHA-256 `a09e93a50873b54c27e5d59c5f02581ff68422734f1c4d5bc8170501e99b4078`
- `desktop-1440.png` SHA-256 `504087a777334e17be3097447cfca7a394610e1582a9b655243c9793cbe5d257`
- `mobile-390.png` SHA-256 `6f140319b549f513ae31fb86c4da51f9bf655f69c0d04133174676e8f04ec912`
- `mobile-320.png` SHA-256 `9590e4e1668e80db0b08119e7c2a70f4a96afe23b0dca96b885d88b76cb1a488`
- `review.html` SHA-256 `e31362ecc58cf16205dcfeac234ccd6c6472db90531ae469b273de95924a8d7f`

## Blocking findings

1. The exact article renders to 10,278px at desktop, 14,766px at 390 and
   17,576px at 320 with no table of contents, jump links or persistent section
   orientation. A newcomer can reach action or sources only by linear scroll.
2. The false sentence `Give an AI any goal and it will inevitably achieve it`
   receives the same bold pink pull-quote treatment as the corrected lesson. A
   skimmer can therefore retain the article's rejected claim.
3. Desktop body copy has no readable line-length cap; the body column expands
   to roughly 95–105 characters per line across a 2,986-word article.

Minor: the work and home examples inside `Test the distinction` have no local
subheads, making transfer harder to scan.

## Exact unblock

Preserve the accepted prose. Add a compact section jump menu; cap body and list
lines near 68ch; visually label the rejected blockquote as `NOT THE LESSON`;
and add structural `At work` / `At home` labels around the existing examples.
Then render and review the unchanged article again at 1440, 390 and 320.

No integration, deploy or publication authority follows from this review.
