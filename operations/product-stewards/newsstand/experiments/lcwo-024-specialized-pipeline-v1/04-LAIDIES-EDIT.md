THE DAILY • AUGUST 15, 2026

# Public AI work logs can contain more than the chat you see

*An August 10 preprint found sensitive material in some publicly shared
technical AI-task records. A clean-looking chat is not the same thing as a clean
raw file: share a purpose-built release file, not the complete session.*

The people most directly affected are developers, researchers and organizations
that publish or reuse raw records. The same issue can reach anyone offered a
complete technical export by a workplace or personal AI tool. It does **not**
mean an ordinary private consumer chat was published or leaked by itself.

## First: what the researchers actually found

Panfilov and colleagues report examining 6,708 public records of AI-assisted
tasks and reconstructing 315,320 behind-the-scenes traces. They found at least
one real sensitive item in 328 records, or 4.9% of those examined.

In genuine user sessions, excluding benchmarks, the authors report 62 API keys,
33 passwords, 24 access tokens and seven private keys across 328 affected files.
They counted 704 sensitive artifacts; 64 did not appear in the visible chat.

These are findings from an August 10 arXiv preprint. The paper has not been
peer-reviewed, and LAiDIES has not independently reproduced the results.

## Why a clean-looking chat may not be the whole record

An AI task can have two layers. One is the visible result: the messages and
answer a person can read. The other is a technical package the system may keep
and pass along so the task can continue.

A complete export may be called a raw API session or agent trace. Providers call
its unreadable fields opaque, signed or encrypted reasoning state. Those labels
do not make the record safe to release.

During the period tested, the authors report that some artifacts could be
replayed—reused across sessions, users and models within the same provider
family. They say a less-protected related model could then be prompted to reveal
material represented in the trace.

The important boundary was therefore not just whether a field looked
unreadable. The surrounding system also needed to restrict who could reuse it,
where and when. Removing sensitive words from the visible chat does not prove
the full technical record is safe to share.

## The same boundary at work and at home

At work, a team might publish an AI task record to show how a job was completed.
Even when the visible messages contain no secret, the raw session object may
include additional fields. The safer move is a release file containing only
deliberately approved information.

At home, a hobbyist might post a technical export because the visible exchange
looks harmless. The study did not show that a private chat leaked by itself; it
examined risk from sharing the separate raw record. Copy only the details needed
to explain the problem.

## What this evidence does not prove

The scan was targeted and non-exhaustive, and an AI model labelled potential
privacy violations. Without the original plaintext, the authors could not prove
every reconstructed token was exact or determine every artifact's origin.
Synthetic and benchmark records made up much of the broader
personal-information set.

The findings do not show that every raw log contains a secret, every provider or
model behaves the same way, or ordinary private chats were exposed. The authors
report that the attacks they evaluated no longer worked after disclosure, but
LAiDIES did not verify that result. Current and universal fix status remains
unknown.

## Send the finished result, not the backstage file

Before sharing an AI record, ask: **Is this a selected visible result, or the raw
session object?**

Going forward, publish only approved visible fields. A readable “show your work”
answer is not an inventory or security scan of hidden technical state.

This is a file-sharing lesson, not an every-chat emergency. Share the finished
result, not the backstage file.

Looking back, if a public raw record may have exposed credentials, remove its
access and rotate those credentials.

## Cocktail Party version

Some AI work logs contain the chat you see plus material used behind the scenes.
Researchers found sensitive items in some public raw logs. Share a selected
release file, not the whole technical session.

## Sources and correction note

- Panfilov et al., “Stealing Reasoning Traces from Proprietary LLM APIs,”
  arXiv:2608.09867: https://arxiv.org/abs/2608.09867
- Provider background: [Anthropic](https://platform.claude.com/docs/en/about-claude/models/extended-thinking-models),
  [Google](https://ai.google.dev/gemini-api/docs/thinking) and
  [OpenAI](https://developers.openai.com/api/docs/guides/reasoning).

If the paper, provider records or reproduction evidence changes materially,
LAiDIES will publish a dated follow-up and link both stories.
