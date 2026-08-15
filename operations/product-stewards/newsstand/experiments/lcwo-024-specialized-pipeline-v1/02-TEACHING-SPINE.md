# Teaching spine — LCWO-024

**Stage:** explanation architecture only. This is not article prose or a
publication candidate.

## Live reader question

If I remove the visible chat before sharing an AI work log, have I made it
safe?

The reader should care because a workplace or personal tool may offer a raw
technical export that looks like a record of the visible conversation but can
contain more than that.

## Reader payoff

The reader can:

- distinguish an ordinary private consumer chat from a publicly shared raw
  technical AI-session record;
- explain why “the chat looks clean” is not a sufficient release check; and
- choose a safer sharing method.

## Teaching sequence

1. A person wants to share an AI task record for debugging, research,
   collaboration or a public example.
2. Separate two objects. An ordinary private consumer chat is not the
   demonstrated exposure route. A raw technical session record is a
   behind-the-scenes export from an API or agent system; publishing or replaying
   it is the relevant risk.
3. A technical session can contain the answer and messages a person sees plus
   provider-specific state used behind the scenes to continue the task. A person
   cannot readily read an opaque field, but opacity alone is not a complete
   security boundary.
4. During the tested period, the preprint's authors report that some raw
   artifacts could be replayed across sessions, users and models inside the
   same provider family.
5. In the reported tests, a less-protected related model could be prompted to
   reveal material represented in the trace. The risk depended on who could
   reuse the artifact, where and when—not simply on somebody reading a hidden
   field.
6. Therefore, reviewing or deleting only the visible chat may not make a raw
   technical export suitable for sharing. The export can contain more than the
   visible chat.
7. Preserve the evidence boundary: this is an August 10, 2026 author-reported
   preprint, not peer-reviewed or independently reproduced by LAiDIES. Its scan
   was targeted, some labelling used an LLM judge, exact reconstructed tokens
   were not all provable, and the authors could not determine every artifact's
   origin. It does not establish that ordinary private chats were published,
   every provider behaves alike or every raw log contains a secret.
8. Share an intentionally made release file containing approved visible fields,
   not the raw session object. A readable “show your work” response is neither
   an inventory nor a security scan of opaque technical state.

## Workplace example

A team wants to publish an agent-run record so other developers can understand
how it completed a task. The visible messages contain no secret, so the team
assumes the export is safe. If it publishes the raw session object, however, it
may also publish provider-specific state beyond those messages. The team should
make a release file containing only fields it has deliberately approved.

## Non-work example

A hobbyist asks an AI tool for help with a home project and posts its raw
technical export to a troubleshooting forum because the visible exchange looks
harmless. This is not a private chat leaking by itself; it is the separate act
of publicly sharing a raw technical record. The same rule applies: share the
selected visible information needed for troubleshooting, not the full session
object.

## Explain-back

Why is “I checked the visible chat and removed anything sensitive” not the same
as “this raw technical session record is safe to publish”? Name the additional
kind of material that may be present and the system boundary that mattered in
the reported tests.

## Unseen transfer

A vendor support form asks a user to attach a complete agent trace to diagnose a
problem. The user is not making a public post, but still has to decide whether
the recipient needs the raw session object or a selected diagnostic file. First
identify whether the file is a raw technical record containing more than visible
messages; then minimize it to the approved fields actually needed. This does not
claim the support form creates the reported exploit.

## Useful landing

Before sharing an AI record, ask: **Is this a selected visible result, or the raw
session object?** If it is raw, create a release file with only approved visible
fields. If a publicly shared raw log may have exposed credentials, remove access
and rotate them.

## Analogy ruling

No Rewind Era analogy. Here it is more likely to imply that every raw log
contains sensitive material than to clarify the conditional mechanism.

## Evidence guardrails

- Attribute findings and counts to the preprint's authors; LAiDIES did not
  reproduce them.
- Do not describe the finding as a leak from ordinary private consumer chats.
- Do not generalize across every provider, model or raw log.
- Do not call provider-specific opaque state uniformly sealed, encrypted or
  secure.
- Name the tested boundary precisely: replay across sessions, users and models
  within the same provider family.
- Do not claim a permanent fix. The authors reported that the evaluated attacks
  no longer worked after disclosure; publication-day status requires recheck.
- Do not turn author-reported personal-information totals into a claim that all
  artifacts were credentials.
