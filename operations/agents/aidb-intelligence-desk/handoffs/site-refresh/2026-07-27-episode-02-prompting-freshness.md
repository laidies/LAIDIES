# Episode 02 prompting freshness review

**Checked:** 2026-07-27  
**Canonical content:** `content/episodes/episode-02.canon.md`  
**Derived article:** `content/issues/issue-02.md`  
**Disposition:** `UPDATE EXISTING — CURRENT NOTE + DERIVATIVE REFRESH`  
**Public state proposed:** `CHECKED 2026-07-27` for the episode; `UPDATED
2026-07-27` only on derivatives whose reader-facing wording actually changes  
**AIDB STATUS:** HANDOFF ONLY — OWNER ACCEPTANCE REQUIRED

## Decision

Episode 02 is **not obsolete and does not need a full re-record**. Its central
beginner lesson remains useful:

> Prompting is closer to briefing or delegation than to coding. State the
> outcome, relevant context, audience, boundaries and what a usable result
> looks like; then inspect and steer the result.

Current OpenAI guidance for GPT-5.6 still supports outcome-first instructions,
important constraints, relevant evidence and explicit completion criteria. It
also adds a modern qualification: newer models often need **less** scaffolding,
not a mandatory checklist repeated in every request.

The episode should therefore keep its durable story and receive a small,
visible current-guidance layer. The learning progression becomes:

`Prompt clearly → Brief a real job → Delegate with boundaries → Supervise and verify`

## Exact freshness findings

| Episode treatment | Finding | Minimum safe treatment |
|---|---|---|
| “AI can't read your mind” | `KEEP` — it still cannot infer missing task-specific intent reliably | Preserve as the beginner hook |
| “Every new chat you're a stranger again” | `QUALIFY` — false as a universal when saved memory, chat history, custom instructions or project context are enabled; still true for custom GPT conversations and some fresh/temporary contexts | Add a current note now; revise the line in the next canonical transcript/script refresh |
| “It has your words and nothing else” | `QUALIFY` — the active surface may also have project files, instructions, prior chats, memory or connected context | Say “check what this job can already access; supply what it does not reliably have” |
| “Spell it out, every time” | `QUALIFY` — useful task context still matters, but repeated scaffolding can be wasteful and current models may perform better with leaner instructions | Teach the checklist as a diagnostic menu, not a ritual |
| “The variable that changed wasn't the tool — it was the ask” | `QUALIFY` — a demonstration cannot exclude model, settings, memory, thread context or output variability unless those are controlled | Present it as the variable the learner can deliberately control |
| “If the first answer's off, you don't start over” | `QUALIFY` — steering the same coherent task is sound; a clean chat/project is better when the job changes or the thread becomes mixed or stale | Add the boundary to the updated practice/reference |
| Goal, audience, relevant context, tone/format, constraints, success criteria and an example | `KEEP` — durable briefing ingredients | Preserve, but explain that not every task needs every field |
| Vague versus specific try-on | `REFRESH` — pedagogically strong but not a controlled experiment as written | Use two fresh chats with the same tool/model/settings and same source material; disclose that output is variable |
| BCG/Mollick study | `KEEP — HISTORICALLY BOUNDED` | Preserve its 2023 model/task scope and do not present it as a current-model benchmark |

## Proposed public current note

> **Checked July 27, 2026 — the foundation still holds.** Give AI the outcome,
> the task-specific context it needs, the important boundaries and what a
> useful finish looks like. Newer tools may already have saved instructions,
> memory, project files or earlier conversations, and newer models often need
> less scaffolding. Check what the tool actually has; add what is missing
> rather than pasting a ritual into every prompt.

Optional “Why this changed” line:

> Modern AI surfaces can carry context in different ways, so “every new chat
> starts from zero” is no longer a safe universal.

## Proposed refreshed try-on

Give one real task to the **same tool and model in two fresh chats**, using the
same source material.

1. Use a vague ask.
2. Use a short brief: outcome, audience, the context that matters, important
   boundaries and what a useful result must contain.
3. Compare usefulness, accuracy, editing time and whether either answer needs
   verification.

Label the result as an exercise, not a scientific test: model outputs vary and
account settings, memory and product context can affect both attempts.

## Episode architecture going forward

Every practical episode should have four separable layers:

1. **Evergreen spine:** the durable mental model and human skill carried by the
   story/audio/video.
2. **Current note:** a visible, dated qualification when product behavior
   changes but the lesson still holds.
3. **Living practice/reference:** the exercise, checklist, examples and source
   receipts that can be updated without re-recording the story.
4. **Progression bridge:** one sentence showing where the beginner skill leads
   next, without forcing advanced material into the introductory lesson.

A re-record is warranted only when the central mental model has become false,
harmful or impossible to correct honestly with a current note. Tactical model
manners belong in the living layer.

## Proposed “Keep Going” companion shelf

Add one compact module after the episode/current note. Each link must perform a
different reader job and show its own freshness state:

| Shelf position | Reader job | Episode 02 candidate | Readiness |
|---|---|---|---|
| **Try it now** | Apply the lesson to a real task | Refreshed Episode 02 Try-On | `UPDATE REQUIRED` — use the controlled two-fresh-chat version above |
| **Make my prompt better** | Get help with the reader's actual prompt | `/games/fairy-godmother.html` | `LIVE` — link after normal route check |
| **Keep the recipe** | Reuse the durable, tool-agnostic procedure | Briefing 101 | `HOLD LINK` — the current inventory says two Library chapters duplicate this lesson and must be reconciled first |
| **Set it up once** | Understand instructions, memory and projects | Setup 101 | `REVIEW BEFORE LINK` — current product/surface claims need freshness verification |
| **Use it in ChatGPT** | Apply the foundation to one current tool | `content/library-books/tool-chatgpt.md` | `REVIEW BEFORE LINK` — the AIDB register already flags version-pinned and changeable claims |
| **Check before you trust it** | Carry the result safely into real work | Verification Rulebook | `ADMITTED` — use as the next-step/related lesson rather than repeating Episode 3 |
| **What changed lately?** | See dated model manners and tips | Accepted AIDB/NewsStand practical cards | `CONDITIONAL` — only source-verified, owner-accepted items with visible dates |

The module should not be a generic “related content” carousel. Recommended
LAiDIES labels:

- **DO THE THING** — one practice;
- **TAKE IT TO THE FAiRY** — one interactive helper;
- **KEEP THE RECEIPT** — one durable Library reference; and
- **WHAT SHE DOES NOW** — one dated current tip, when qualified.

Store relationships in one episode-companion record rather than hard-coding
the same links into the episode, Library and activity pages. Every candidate
needs `contentId`, `readerJob`, `href`, `status`, `checkedAt`, `whyLinked` and
an optional `refreshTrigger`. Suppress held, missing, stale or unadmitted
targets automatically. The destination owns its claim and update date; the
episode page only owns the relationship.

## Current evidence

- OpenAI, **GPT-5.6 Prompting Guide**, accessed 2026-07-27:
  https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6.md
- OpenAI Help Center, **Memory FAQ**, accessed 2026-07-27:
  https://help.openai.com/en/articles/8590148-memory-faq
- OpenAI Help Center, **Projects in ChatGPT**, accessed 2026-07-27:
  https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt
- OpenAI Help Center, **Custom Instructions**, accessed 2026-07-27:
  https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt
- OpenAI Help Center, **Creating and editing GPTs**, accessed 2026-07-27:
  https://help.openai.com/en/articles/8554407-create-a-custom-gpt

These sources establish current OpenAI product behavior only. Equivalent
Anthropic and Google surfaces must be checked separately before the wording is
made cross-provider.

## Owner handoff

**Receiving owner:** Episode 02 / Learning + site content owner.

Smallest safe acceptance:

1. add the public current note without changing the recorded episode;
2. update the article, activity and other text derivatives using the canonical
   propagation checklist;
3. preserve the historical BCG evidence boundary;
4. add the prompt-to-brief-to-delegation progression bridge; and
5. record `UPDATED` only on the surfaces that actually changed.

No public file, audio, video, caption or canonical episode was edited by AIDB.
