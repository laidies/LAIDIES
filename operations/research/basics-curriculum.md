# Subject 0 — The Basics · the cross-tool curriculum

**Proposed 2026-07-22.** Answers Ali's question: *"do we need a basics class too — things that
carry across the tools?"* — yes, and it is a whole subject, not one class.

## What it fixes
Without it, "what memory is" gets taught three times — once per tool subject. That is the exact
duplication already found in the old material, where personal-vs-company account was taught
**four times**. See [[stranded-grimoire-content-17k-words]].

**The Basics teach the concept ONCE. The tool subjects then only show where it lives in that
tool and what that vendor calls it.** Every tool class gets shorter, and nothing repeats.

It is also the **most durable thing we make** — no vendor feature names appear in it at all, so
nothing in it rots when a menu is renamed. That is the right place to put the teaching we most
want to survive.

## Where it sits
Subject 0, before ChatGPT / Claude / Gemini. Homeroom, not a numbered classroom.

---

## The design principles (how to teach smart people who are new)

1. **Start from what broke, not from a taxonomy.** Every class opens on a question she has
   actually had — "why did it get worse?", "what does it know about me?" — never on a definition.
2. **One idea per class.** If it needs two sentences of "and also", it is two classes.
3. **Teach the concept once, show the location many times.** Basics own the idea; tool subjects
   own the click path.
4. **Order by what changes her Tuesday**, not by conceptual dependency.
5. **Plain first, analogy as garnish.** Per [[plain-teaching-garnish-not-carry]] — if the plain
   chat explanation is clearer than the script, the script is wrong.
6. **Every class ends with one thing to go and do.** Not a summary.
7. **Name the mistake out loud.** The single most costly misunderstanding, stated plainly. This
   is the part generic guides skip and it is where the value is.
8. **Show bad, then good — and explain the cause between them.** Every class carries the Before &
   After beat: same task, ONE variable changed, and the mechanism that explains why the first one
   failed. Copying a prompt is memorising; understanding the cause means she can work out the
   next one herself. Format spec: `operations/classes/before-and-after-format.md`.

---

## The nine periods

⚠ **Nine, not eight.** Period 1 was split: "what it is actually doing" (the prediction mechanism)
and "why it doesn't know about last month" (editions and cutoffs) are two ideas, and one-idea-
per-class is the rule. Basics is not filmed three times the way the tool subjects are, so the
extra period costs nothing.

| P | Class | The question it opens on | Analogy | Canon status |
|---|---|---|---|---|
| 1 | **What It's Actually Doing** | Why does it keep giving me something that sounds fine and says nothing? | **The average chair** — ask a hundred people to describe one and you get four legs, wooden, nothing memorable | 🟡 new — needs a Mall/town home |
| 2 | **Why It Doesn't Know About Last Month** | Why is it confidently telling me something that stopped being true? | **Textbook editions** — printed words can't change; cutoff = the print date; web search = the teacher's photocopied handout | ✅ **already canon** — [[textbook-edition-analogy]] |
| 3 | **What a Session Is** | It was good this morning. Why is it stupid now? | **The chalkboard** — everything this lesson is up there at once; when it fills, things get rubbed out; the bell wipes it | 🟡 new — grounded in the classroom |
| 4 | **What It Keeps** | What has it quietly written down about me? | **The Blend & Snap** — the new café can't do "the usual"; your regular spot can | ✅ **already canon** — [[coffee-relationship-ai-memory-metaphor]] · **SCRIPTED** |
| 5 | **Telling It Who You Are** | How do I stop re-explaining myself? | The note the teacher kept vs. the note you wrote her | 🟡 extends P3/P4 |
| 6 | **Giving It Your Stuff** | What happens to my document? | A folder that holds the background so you stop re-handing it over | 🟡 needs a Mall home |
| 7 | **When It Does the Work Instead of Telling You** | Why does this one want access to my files? | **The alterations counter** — chat tells you how to take up the hem, you still sew; the doing-tools take the dress away | 🟡 **propose adding an alterations counter to the Mall** |
| 8 | **Bolting On Extra Powers** | Everyone says to turn this on. Should I? | **The recipe box** — one card for one dish; you don't hand over the card, it fetches the right one | 🟡 needs a Mall home |
| 9 | **How to Tell When It's Wrong** | How do I know any of this is true? | Receipts — asking for sources and clicking one | ✅ ties to Ep3 ([[receipts-term-reserved]]) |

**Period 1 is the foundation.** Every later class's "why the bad one was bad" refers back to it.

### ⚠ Owed before any of this is filmed
[[analogies-grounded-in-mall-canon]] is LOCKED: analogies must be grounded in the town's canon,
and anything not yet in the Mall **gets added to the Mall**. Before scripting, read
`operations/the-mall-inventory-plan.md` and `operations/voice/laidies-writing-lock.md`, then
either ground or propose Mall additions for the 🟡 rows above — the alterations counter and a
home for the recipe box are the two real proposals.

---

## What this removes from the tool subjects
Because Basics owns the concept, each tool subject's Period 2–8 becomes purely "here is where it
lives, here is what they call it, here is the one trap specific to this tool." The tool classes
get shorter and stop re-explaining.

---

## Deliberately NOT taught here

**Hooks.** A hook is a rule that fires automatically when a specific thing happens, whether or
not anyone remembered to ask — the hall monitor. Real, and LAiDIES uses them (the art-prompt
guard in this repo is one). But they are **developer-tier**: not a consumer feature a reader
meets in ChatGPT, Gemini or Copilot today. Teaching them fails the "will this change her
Tuesday" test.
→ **Hooks belong in the LIBRAiRY as reference, not in a class.** Revisit only if a consumer tool
ships a user-facing version.

Verification note: my research files document hooks only as one of the things a Claude Cowork
**plugin** can bundle. I have not deep-researched hooks as a topic — do not write teaching
material on them from this file.
