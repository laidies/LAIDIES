# Claude shared chats in search — triage

**Status:** ALI REVIEW — HOLD  
**Priority:** P0 — IMMEDIATE  
**Score:** 16/18  
**Recommended treatment:** THE BREAKING now; THE WEEKLY for the durable
public-link mental model; THE TRIBUNE only as a separately sourced design-duty
argument.

## Why it qualifies

Claude chats are private by default. When a Free, Pro or Max user creates a
share link, Anthropic publishes a snapshot at a public URL that anyone with the
link can open. Independent reporting found some of those shared chats and
artifacts in Google and Bing results. Some contained apparently sensitive
personal, workplace, security and health-related material.

That gives readers a concrete action now: review `Settings → Privacy → Shared
chats` and revoke any link they would not intentionally publish.

## Score

| Dimension | Score | Reason |
|---|---:|---|
| Consequence | 3 | Search discovery can enlarge the audience for sensitive personal or workplace information. |
| Novelty | 2 | Public share links are not new; their search visibility and missing page-level indexing protection are material new evidence. |
| Reader relevance | 3 | Anyone who has used Claude’s Share button may need to review and revoke links now. |
| Evidence | 3 | Anthropic’s live sharing contract, current robots response and three independent reports were checked. |
| Durability | 2 | The immediate results may disappear, but the public-link mental model applies across AI products. |
| Editorial value | 3 | The story supports an urgent correction, a durable explanation and a distinct accountability question. |
| **Total** | **16/18** | **P0** |

## Headline Reality Check

**Circulating claim:** Claude leaked users’ private chats into Google.  
**Verdict:** **MISLEADING.**

The exposed material was not ordinary private-by-default chat history.
Users had deliberately created public share links. The consequential problem is
that a link many people may understand as “send this to one person” behaved
like a published webpage: if it was linked somewhere a crawler could see,
search engines could index it. WIRED found sampled pages lacked a `noindex`
directive, while Anthropic relied on `robots.txt` and said it did not submit a
directory or sitemap of the share pages.

The correction does not excuse the product design. “Publicly accessible” and
“easy for strangers to discover in search” are different risk levels, and the
interface has to make that difference legible.

`sensationalFramingNeutralized=true`.

## Shadow evaluator

`HOLD_FOR_INDEPENDENT_REVIEW` under policy `2026-07-26.3`. Privacy and possible
personal-data impact are hard holds, and publication authority is `none`.
No public action was taken.
