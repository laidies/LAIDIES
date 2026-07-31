# The Weekly: “Anyone with the link” is not a privacy setting

The Claude search-indexing story is useful beyond one company because it
clarifies a distinction modern software often blurs: a link can be difficult to
guess and still be public.

Anthropic’s Share button created snapshots at public URLs. Its crawler rules
asked search engines not to enter the `/share/` area, but WIRED found sampled
pages lacked the page-level instruction search engines recommend for keeping a
page out of their results. Once users posted links where crawlers could see
them, some chats and artifacts entered search.

Three separate controls are often collapsed into one word—“share”:

1. **Access:** who is technically allowed to open the page?
2. **Discovery:** how can a person or crawler find its address?
3. **Indexing:** can a search catalogue list the page for strangers?

A random URL changes discovery. It does not restrict access. Crawler
instructions can reduce indexing. They do not provide access control.

That matters more for AI chats because one useful answer can carry the context
of an entire conversation: names, drafts, pasted work, health questions,
credentials or customer details. The reader habit is simple: before sharing,
ask whether you are sending a private object or publishing a public snapshot.
If the product cannot show you who may open it, assume the broader answer.

The product lesson is stricter. A Share control should explain the audience at
the moment of action, separate public publishing from recipient-only sharing,
provide a visible ledger of active links and make revocation easy. Search
exclusion should be defense in depth, not the feature’s privacy model.
