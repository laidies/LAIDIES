# Claude shared chats in search — source hierarchy and claim map

**Status:** PRIVATE  
**Evidence identity:** `CLAUDE-SHARE-SEARCH-2026-07-28`

## Source hierarchy

1. [Anthropic sharing help](https://support.claude.com/en/articles/10593882-share-and-unshare-chats)
   — primary, interested party; what Share creates, snapshot scope, plan
   differences and revocation path.
2. [WIRED](https://www.wired.com/story/private-claude-chats-exposed-in-google-and-bing-search-results/)
   — independent technical reporting; observed search results, page-level
   indexing controls and statements from Anthropic and Google.
3. [Fast Company](https://www.fastcompany.com/91580420/claude-users-shared-conversations-were-showing-up-in-google-searches)
   — independent reporting; apparently sensitive examples and user-experience
   analysis. The sensitive links themselves were not opened or retained.
4. [Axios](https://www.axios.com/2026/07/27/anthropic-claude-public-chats-google-search)
   — independent corroboration; distinction between indexed conversations and
   artifacts and Anthropic’s explanation of how a crawler could discover them.
5. `https://claude.ai/robots.txt` and an unresolvable dummy `/share/` response
   — current technical checks at 2026-07-28 16:17 PDT; no personal content was
   accessed.

## Claim map

| Evidence ID | Claim | Evidence | Confidence |
|---|---|---|---|
| `CS-01` | Claude chats are private by default; Free, Pro and Max users can create public snapshots. | Anthropic help | High |
| `CS-02` | Anyone with a share link can see the snapshot of messages sent before sharing; attached files and raw MCP tool data are excluded. | Anthropic help | High |
| `CS-03` | Team and Enterprise chat sharing is organization-only rather than public. | Anthropic help | High |
| `CS-04` | Some shared chats and artifacts appeared in Google and Bing results. | WIRED, Fast Company, Axios | High |
| `CS-05` | WIRED’s sampled pages lacked the `noindex` tag recommended by Google and Bing for page-level exclusion. | WIRED | High for the sample; not proof about every page |
| `CS-06` | Anthropic’s current `robots.txt` disallows `/share/*`; Anthropic says it did not provide share directories or sitemaps to search engines. | Live robots file; Anthropic statements reported by WIRED/Axios/Fast Company | High |
| `CS-07` | Google results had largely disappeared by the reports’ later checks, while Bing still returned results during WIRED’s check. | WIRED, Fast Company | High for those check times; changing state |
| `CS-08` | Revoking a shared chat disables its direct link. | Anthropic help | High |

## What the evidence shows

The product created public, unguessable links only after a user chose Share.
Some links became discoverable because they appeared somewhere search crawlers
could find them, and page-level exclusion was missing from the pages WIRED
inspected. Search visibility expanded the practical audience beyond the people
to whom a user deliberately sent the URL.

## What it does not show

- It does not show that Anthropic exposed every Claude chat or breached
  private-by-default chat storage.
- It does not show that unshared chats were indexed.
- It does not establish that every apparently sensitive item was authentic.
- It does not establish how many unique chats were indexed or viewed.
- Disappearance from Google does not prove that every search engine, cache,
  archive or recipient copy is gone.
- `robots.txt` is not an access-control mechanism. It guides compliant
  crawlers; it does not make a public URL private.

## Publication-day rechecks

1. Reopen Anthropic’s sharing help and inspect whether its warning or workflow
   changed.
2. Recheck `robots.txt`, page headers and page-level `noindex` using only a
   consented or synthetic share page.
3. Seek an explicit Anthropic statement on remediation, notification and the
   status of existing indexed pages.
4. Recheck Google and Bing only at aggregate query level; never open or quote
   exposed personal chats.
5. Confirm the exact Settings path and whether bulk revocation exists.
