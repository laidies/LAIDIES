# Master Handover Protocol

This file is a standing project instruction for all work in the LAIDIES folder.

## When Context Is Being Impacted

If the active chat context is becoming too large, fragmented, or likely to lose important project state, stop and tell the user clearly that it is time to start a new chat.

Use this exact phrasing:

> its time to start a new chat. paste this prompt into the new chat: [give me prompt]

Replace `[give me prompt]` with a complete prompt that lets the next chat resume the work without needing hidden context.

## Required Handover File

Before telling the user to start a new chat, create or update a full handover file in `docs/handoffs/`.

Name it using the current date and topic:

`current-window-handoff-YYYY-MM-DD-topic.md`

The handover must include:

1. Current objective
2. Current state of the project
3. Files changed in the current chat
4. Important decisions made
5. Work completed
6. Work still in progress
7. Queued work
8. Known blockers, risks, or open questions
9. Verification already performed
10. Recommended next action
11. Exact prompt for the new chat

## Queue Handling After Context Switch

Queued work must not be left as vague memory. Put every queued item into the handover with:

- Priority: `High`, `Medium`, or `Low`
- Status: `Queued`, `Blocked`, `Ready`, or `Needs Decision`
- Owner: `User`, `Codex`, or named person/team
- First next step: one concrete action the next chat should take
- Dependencies: files, decisions, credentials, approvals, or upstream work needed

If queue order is unclear, recommend this default order:

1. Preserve unfinished or user-visible work first.
2. Fix blockers that prevent other queued work.
3. Complete work tied to launch, publishing, production, or external commitments.
4. Handle content and polish tasks.
5. Park exploratory ideas until the active work is stable.

## New Chat Prompt Requirements

The prompt given to the user must include:

- The workspace path: `C:\Users\alieakin\OneDrive - amazon.com\Documents\LAIDIES`
- The handover file path
- The immediate task to resume
- Any queued work that should remain visible
- Any known constraints or warnings

Template:

```text
Continue work in the LAIDIES project at:
C:\Users\alieakin\OneDrive - amazon.com\Documents\LAIDIES

Start by reading this handover file:
docs/handoffs/[handover-file-name].md

Resume with this immediate task:
[specific next task]

Keep this queued work visible:
[priority-ordered queue]

Important constraints:
[constraints, blockers, approvals, or verification notes]
```
