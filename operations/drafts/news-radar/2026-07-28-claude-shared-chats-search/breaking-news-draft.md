# The Breaking: If you shared a Claude chat, check it now

Some Claude conversations and artifacts that users deliberately shared by link
were appearing in Google and Bing results. That is a real privacy problem, but
the viral version—“Claude leaked everyone’s private chats”—is misleading.

Claude chats are private by default. The affected pages were snapshots created
after a Free, Pro or Max user clicked Share. Anyone with the resulting link
could already open the snapshot. The new problem is discoverability: a public
link intended for one friend or coworker could become findable by strangers
through search.

Think of the link as a page on an unlocked noticeboard. A long, random address
makes the hallway difficult to guess; it does not lock the board. If the
address appears somewhere a search crawler can see, the page may be added to
the catalogue.

WIRED found that sampled shared pages lacked a page-level `noindex` directive,
even though Anthropic’s `robots.txt` asked crawlers not to visit `/share/`
pages. Anthropic says it did not give search engines a directory or sitemap of
those links and that they become discoverable only when someone shares them
somewhere a crawler can see. Google said website owners control whether public
pages can be indexed.

## What to do now

Go to `Claude → Settings → Privacy → Shared chats`. Review every snapshot and
unshare anything you would not intentionally publish: personal details,
workplace information, customer material, passwords, keys, health information
or financial records.

Revoking the link stops future direct access. It cannot prove that nobody
already viewed, copied, cached or archived the page.

## What this does—and does not—mean

The evidence does not show that unshared chats or Claude’s private chat storage
were breached. It does show that “anyone with the link” should be understood as
public publishing, not a private handoff, unless the product adds real access
control.

Google results had largely disappeared by later checks, while WIRED still saw
Bing results during its reporting. The remaining questions are whether every
shared page now has stronger page-level protection, whether affected users will
be notified and how many pages were actually viewed.

Sources: [Anthropic](https://support.claude.com/en/articles/10593882-share-and-unshare-chats),
[WIRED](https://www.wired.com/story/private-claude-chats-exposed-in-google-and-bing-search-results/),
[Fast Company](https://www.fastcompany.com/91580420/claude-users-shared-conversations-were-showing-up-in-google-searches),
[Axios](https://www.axios.com/2026/07/27/anthropic-claude-public-chats-google-search).
