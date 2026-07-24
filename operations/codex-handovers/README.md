# Codex handovers — central drop folder

**Purpose:** one place where every chat leaves a self-contained handover doc so Codex (or any agent) can pick that thread's work up seamlessly. If you did substantial work in a chat, drop a handover here before you finish.

## Programme source of truth

Handovers explain individual workstreams. The cross-project commitment list is:

`operations/MASTER-PROGRAM-TRACKER.md`

Update that tracker whenever a handover changes the truth of a programme item.
Do not let a handover silently close, replace, or drop work from the tracker.

## Naming
`HANDOVER-<topic>-<YYYY-MM-DD>.md` — e.g. `HANDOVER-basics-intro-2026-07-23.md`. One file per topic/chat. Don't overwrite someone else's; add your own.

## What a good handover contains
Written so a reader who never saw the chat can continue:
1. **TL;DR** — what the work is, in a few lines.
2. **Files & status** — every file touched, its path, whether it's approved/draft, and what's left to do on it.
3. **The direction / decisions** — what was decided and why.
4. **🔴 Locked rules** the next agent must not violate (voice, scope, style, currency, etc.).
5. **Done vs TODO.**
6. **Actionable next tasks** — specific enough for Codex to execute (with specs).
7. **Tried & rejected** — so nobody redoes a dead end.
8. **Pointers** — related files, checkers, memories.

Keep each handover self-contained (don't rely on the chat it came from). Mark approved content **do not rewrite**; be explicit about what is Codex's production job vs. what is locked.
