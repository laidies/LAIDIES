# The Daily

**Wednesday, August 12, 2026**

## People published records of their AI work. Some contained passwords.

A new study examined records people had published to let others inspect or
replay an AI task. Those records held more than the answer on screen, and some
included passwords and other private details. This does not mean ordinary
private chats became public. The lesson is for anyone sharing AI work: send the
checked result, not the whole work file.

### The chat is the final cut. The work file is the editing room.

Developers and researchers sometimes publish a record — a work file — so others
can check how an AI task was done.

The editing room is not public by default — the risk begins when someone
publishes the work file. The whole file may look trustworthy because it shows
every step. But publishing it is exactly when the
alternate takes and notes travel with it.

In this picture, the sealed part is a locked drawer inside the editing room; it
does not appear in the final cut. Inside an AI work file, some tools store the
answer you see plus the sealed part, which helps the tool continue earlier work.
That part is not displayed in the visible chat. In an August 2026 preprint — a
paper shared before independent academic review — Panfilov and colleagues took
the sealed part from a published work file and handed it to a less-protected
sibling model from the same provider. They called this an extraction attack.
The sibling model exposed details from the sealed part that the publisher may
never have seen. The researchers alerted the companies and say the attack then
stopped.

### Some private details never appeared on screen at all

Panfilov and colleagues examined 6,708 public AI work files from GitHub and
Hugging Face; 328 of them — about 4.9% — contained at least one password, key or
other private detail.

After removing duplicates and practice-test sessions with made-up characters,
the study counted 704 distinct private details in real people's sessions. It
does not say how many files those details came from.

The researchers made the sealed part readable with that attack, then compared
the recovered text with the visible chat. Most of those 704 private details
also appeared in the visible chat; 64 appeared only in the sealed part.

The researchers lacked the original hidden text, so they cannot prove every
recovered word was exact. That limit does not erase the credentials they report
finding.

### The answer can be tidy while the work file is not

At work, a coding assistant diagnosing a broken website may see a deployment
key — a code that can publish site changes. The work file from that session can
carry the key even when the diagnosis on screen does not. The diagnosis is what
your team wanted; the key was never invited to the meeting.

At home, a travel assistant connected to your email may make a perfect Rome
itinerary. Your friend needs the restaurant list, not the account details in the
work file.

### Before you share anything

When you share an AI-assisted result, copy only what you mean to send, check it
and remove private details. For inspection or replay, make a fresh file with
only the question, checked result and needed evidence.

If you would not deliberately paste a password into the message, do not assume
the work file politely left it behind.

If a work file you published contains a password or access key, treat it as
exposed: change it and revoke what it unlocked. Deleting the file cannot undo
copies.

Asking the AI to “show its work” does not scan the file. It writes another
answer. Providers such as Anthropic document that a readable summary is not the
sealed part itself.

Before sharing, ask: **am I sending the answer I chose, or the whole work file
that made it?**

## Sources

- Panfilov et al., [“Stealing Reasoning Traces from Proprietary LLM APIs,”
  arXiv:2608.09867](https://arxiv.org/abs/2608.09867), August 10, 2026.
- Anthropic, [“Thinking”](https://platform.claude.com/docs/en/about-claude/models/extended-thinking-models),
  checked August 12, 2026.

**Evidence note:** The study is a preprint. LAiDIES will publish a dated
follow-up if new evidence changes the finding.
