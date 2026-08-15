THE DAILY • AUGUST 15, 2026

# Public AI work logs may contain more than the chat you can see

*An August 10 preprint found sensitive material in some publicly shared
technical task records. The relevant risk is publishing or reusing a raw
behind-the-scenes record—not simply having an ordinary private consumer chat.*

A research team led by Panfilov reported that some public records of AI-assisted
tasks contained information beyond the answers and messages visible on screen.
Their finding does **not** show that ordinary private consumer chats were
published or leaked by themselves.

The people directly affected are developers, researchers and organizations that
publish or reuse raw technical records for debugging, collaboration or research.
The same boundary can affect anyone offered a complete technical export by a
workplace or personal AI tool.

## What happened

The preprint's authors report examining 6,708 public records of tasks carried
out with AI systems. They say they reconstructed 315,320 behind-the-scenes
traces and found at least one real sensitive item in 328 records, or 4.9% of
those examined.

For genuine, non-benchmark user sessions, the authors report finding 62 API
keys, 33 passwords, 24 access tokens and seven private keys across 328 affected
session files. They counted 704 distinct sensitive artifacts, 64 of which did
not appear in the visible chat history.

Those are the authors' findings from an August 10 arXiv preprint. The paper has
not been peer-reviewed, and LAiDIES has not independently reproduced the
results.

## How can a clean-looking chat still carry a risk?

Picture an AI task as having two layers.

First, there is the visible result: the question, the messages and the answer a
person can read.

Second, the technical system may keep an additional package of information so
it can continue the task on the next step. A person may not be able to read that
package directly, but the system can still pass it along.

During the period tested, the authors report that some of these packages could
be handed back to related systems across different sessions, users and models
belonging to the same provider family. They say a less-protected related model
could then be prompted to reveal material represented inside the package.

In technical language, the complete behind-the-scenes export may be called a
raw API session or agent trace. Its unreadable fields may be described by
different providers as opaque, signed or encrypted reasoning state. The
reported weakness was not simply that someone could look at an unreadable
field. It was that the surrounding system allowed certain artifacts to be
replayed—reused elsewhere—across boundaries that should have limited who could
use them, where and when.

That is why deleting sensitive words from the visible chat is not the same as
proving the full technical record is safe to share.

## The same mechanism at work and at home

At work, a team may want to publish an AI task record so other developers can
understand how a job was completed. Even if the visible messages contain no
secret, publishing the raw session object may also release behind-the-scenes
fields. The safer choice is a purpose-built release file containing only fields
the team has deliberately approved.

At home, a hobbyist may post a technical export to a troubleshooting forum
because the visible exchange about a project looks harmless. The private chat
did not leak by itself; the risk comes from publicly sharing the separate raw
record. The hobbyist should copy only the selected information needed to explain
the problem.

## What the evidence does—and does not—support

The authors describe their scan as targeted and non-exhaustive, and they used an
AI model to label potential privacy violations. They lacked the original
plaintext behind-the-scenes material, so they could not prove that every
reconstructed token was exact. They also could not determine, for every
artifact, whether information came from model memory or remained after visible
text had been removed. Synthetic and benchmark records made up much of the
broader personal-information set.

The findings do not establish that every raw log contains a secret, that every
provider or model behaves the same way, or that ordinary private chats were
exposed. The authors report that the attacks they evaluated no longer worked
after disclosure, but LAiDIES did not verify that result. Current and universal
fix status remains unknown.

## The LAiDIES read

Before sharing an AI record, ask: **Is this a selected visible result, or the raw
session object?**

Prospectively, create a release file containing only approved visible fields; do
not publish the complete technical object merely because the chat looks clean.
A readable “show your work” answer is not an inventory or security scan of
hidden technical state.

Retrospectively, if a publicly shared raw record may have exposed credentials,
remove its access and rotate those credentials.

## Cocktail Party version

An AI work log can contain the conversation you see plus behind-the-scenes
material used to continue the task. A preprint's authors found sensitive items
in some public raw logs, so checking only the visible chat may not be enough.
Share a deliberately selected release file, not the whole technical session.

## Sources and correction note

Primary source: Panfilov et al., August 10, 2026 arXiv preprint, with provider
documentation used only to establish that technical systems can carry
provider-specific behind-the-scenes state. This private draft is source-held
and requires publication-day checks for paper revisions, provider
documentation, disclosure status and credible follow-up reporting.
