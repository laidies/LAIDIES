# Claude shared chats in search — impacts and how to think

**Status:** PRIVATE

## The mechanism in plain language

A public share link is like putting a page on an unlocked noticeboard in a
hallway. The long, random URL makes the hallway hard to guess, but it does not
lock the noticeboard. If someone posts the hallway address on a public forum,
a search engine can find the page and add it to its catalogue.

`robots.txt` is a sign asking well-behaved cataloguers not to enter. A
page-level `noindex` instruction is a second sign telling the catalogue not to
list the page. Neither is a password. The safest choice for sensitive material
is not to publish the page at all, or to revoke it after the intended recipient
has finished.

## Who is affected

- Free, Pro and Max users who created public Claude share links.
- People whose information appeared inside someone else’s shared chat or
  artifact.
- Workplaces that treat an unguessable URL as equivalent to controlled access.
- Product teams designing “share” experiences for AI outputs, which often
  contain more context than a normal document.

Team and Enterprise chat sharing is organization-limited according to
Anthropic’s current help page, but administrators should still verify their
own sharing policy and artifact behaviour.

## What readers should do

1. Open Claude’s `Settings → Privacy → Shared chats`.
2. Review every listed snapshot.
3. Unshare anything containing personal, workplace, customer, security, legal,
   health or financial information.
4. Assume anything already shared may have been copied even after revocation.
5. For future handoffs, remove unnecessary context and use an access-controlled
   channel when the material is sensitive.

## What remains uncertain

The number of indexed and viewed pages, whether all relevant pages now carry
page-level exclusion, whether affected users will be notified, and whether
search engines or archives retain copies.
