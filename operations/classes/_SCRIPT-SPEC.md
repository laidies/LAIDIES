# How to write a SUNNYVAiLE High class script

Binding for every class script. The finished example to copy the SHAPE of is
`basics-p3-what-it-keeps.script.md` (Basics Period 4). Read it before writing.

---

## Who this is for
A smart woman with no computer-science background. She learns by analogy and image. She is
busy. She is not careless and she is not a beginner at *life* — she is new to this one thing.
**Never write down to her, and never make the bad example something only an idiot would do.**

## 🔴 SURFACE = WEB APP — Ali, 2026-07-22, DECIDED
**Classes are filmed on the web app at chatgpt.com, in a browser. Computer only for now.**

Why web and not the downloaded app: the browser layout is **identical on Mac, Windows and
Linux**, so there is no "what about Windows" gap. The desktop app splinters by OS and is the
Codex-merged product — the wrong thing to teach a beginner.

⛔ The desktop app's **App / Chat bar / Work with Apps** settings sections do NOT exist on web or
mobile. Never show them in a class.
⛔ Never state which surface most people use — unknowable, no published split.
⚠ Paths confirmed on the Mac DESKTOP app do not automatically hold on web — re-verify on
chatgpt.com before capture. (Known example: on the Mac desktop app Memory is Settings → Memory;
the web path must be checked, not assumed.)
Phone is a separate, later decision — not committed.

**But the CONCEPTS carry across every surface — only the locations differ (Ali, 2026-07-22).**
Teach each part as a *thing that exists everywhere*, filmed on web, with a light one-line
acknowledgement that on a phone it sits in a slightly different spot. This is why the classes
teach concepts, not positions: "learn them as four things, not four places, and you will find
them on anything." ⛔ Do NOT film a second full phone tour to make this point — one sentence
does it.

## 🔴 101 vs 201 — Ali, 2026-07-22, LOCKED
**101 classes teach the WEB APP at chatgpt.com.** That is what the reader opens.

⛔ **Codex is 201.** So is everything on the coding side of the merged desktop app — Hooks, Git,
Worktrees, Environments, Connections, Computer use. Do not teach, mention or show any of it in a
101 class.

Why this matters and is not pedantry: **the ChatGPT desktop app merged with Codex on 2026-07-09**,
adding Chat / Work / Codex modes (four independent write-ups, all dated July 2026; plus a real
user bug report against build 26.707.31428). The desktop app and the web app are now materially
different products. **A 101 screen tour filmed on the desktop app would be wrong for the reader.**

## 🔴 WHAT A CLASS IS — Ali, 2026-07-22
**A class is a deep tutorial with visuals. It is not an essay read aloud over a screen.**

> *"we can't have an episode that tells you how to set up Claude, ChatGPT etc etc — where to
> find the things."*

That is the division of labour, and it is the reason SUNNYVAiLE High exists:

| | Teaches | Form |
|---|---|---|
| **Episodes** | The thinking — what AI is, how to ask, how to check, which tool to reach for | Story, characters, voice |
| **Classes** | The machinery — **where things are and how to set them up** | Deep tutorial, on the real screen, with visuals |
| **LIBRAiRY** | The reference — definitions, written answers | Books you look things up in |

⛔ **Never teach in a class what an episode teaches.** No prompting lessons. No "how to tell if
it is true". Those exist. A class that strays there is competing with our own show.

### Basics teaches the CONCEPT. The tool subject teaches WHERE IT LIVES.
**Ali, 2026-07-22:** *"the basic concepts apply across tools… memory, context, etc."* They do —
which is why Basics exists and why it is not a trailer for the tool classes.

| | Basics (cross-tool) | ChatGPT / Claude / Gemini |
|---|---|---|
| Answers | **What is this and why do I care?** | **Where is it on my screen and how do I set it up?** |
| Shape | The idea, why it matters, the ONE trap, and what it looks like when it bites | The full walkthrough, every menu, every click, both on phone and computer |
| Length | Shorter — it is one idea | As long as the walkthrough honestly needs |

So: Basics Period 3 says what a stored note about you IS, that the tool keeps it and not the
model, and that deleting a chat does not delete it. `ChatGPT · Memory` then walks her to
Settings → Personalization → Memory and does it on screen, slowly.
⛔ Basics must never become a shallow demo of the walkthrough. If a Basics class is mostly
clicking, its content belongs in a tool subject.

### What "deep tutorial" means, concretely
- **Every step, in order, nothing skipped.** She should be able to follow on her own screen
  without pausing. If a step is obvious to you, it is not obvious to her — show it.
- **Name every menu you pass through**, out loud, in the order she will meet them.
- **No jump cuts over the fiddly part.** The fiddly part is the class.
- **Name the traps, briefly — do not dramatise them.** The setting that is off by default, the
  button that looks like the fix and is not: say it in a sentence as you pass. ⛔ Do NOT stage a
  "watch me fail" sequence. *(Evidence: whether demonstrated errors help is genuinely unresolved
  in the research — BJEP 2025 special issue. Brief error-recognition narration is defensible;
  dramatised failure is not supported.)*
- **Say when the path differs** on phone versus computer, and show both if they differ.
- ⛔ Do not compress a setup walkthrough to hit a runtime. Depth wins over length targets.

### The visual language — required, not decoration
A raw screen recording is not enough. She is being asked to find small things in a crowded
interface, and the picture has to point at them.

- **Highlight the target before the click.** A soft box or ring around the exact menu item,
  held long enough to find it on her own screen, THEN the click.
- **Zoom in on anything small** — a settings cog, a toggle, one line of a stored note. If she
  would squint on a phone, it gets a zoom.
- **Label parts on screen the first time they appear.** Plain words, matching the narration.
- **Show the path as a trail** — a persistent breadcrumb of the menus so far
  (Settings → Personalization → Memory) so she can rejoin if she looks away.
- **Slow the cursor.** A cursor that darts is useless to someone following along.
- ⛔ No emoji, no arrows-as-clipart, no stock motion graphics. Restrained callouts on the real
  interface, in the brand accents.

## 🔴 THE TWO NOUNS — read this before you write a single line
**Ali, 2026-07-22.** The first draft of these scripts said "it" 266 times and never once said
what "it" was. Worse, "it" was quietly doing four different jobs — sometimes the thing producing
the words, sometimes the account, sometimes the product, sometimes the answer. That breaks the
one-term-per-concept rule in reverse: one word stretched over four concepts.

**There are exactly two nouns. Learn the difference and hold it.**

| Noun | What it is | Which classes it belongs to |
|---|---|---|
| **the model** | The part that produces the words. It has a cutoff. It does not know you. It produces the most likely continuation of what is in front of it. | Basics P1, P2 — and any beat about *why the words came out that way* |
| **the tool** | Everything built around the model — your account, memory, standing instructions, files, containers, connectors, modes, the buttons. | Basics P4, P5, P6, P7, P8 — and any beat about *a screen she can go and click* |

**Why it matters, not just tidiness:** memory belongs to the tool, not the model. If both are
"it", the reader ends up believing the thing that writes is also the thing that remembers her —
and then nothing in Periods 4 and 5 can land. Same with the cutoff: that belongs to the model,
so a new tool feature does not fix it, and switching tools does not either.

**Rules:**
1. **Name the noun before you use the pronoun.** Within any beat, if this is the first mention,
   say "the model" or "the tool". After that, "it" is fine — the antecedent is live.
2. **Never let one "it" span both.** If a sentence would be true of one and false of the other,
   the noun is required.
3. **"It" for the answer/output is fine and natural** — "it says here", "if it looks wrong".
   That is ordinary English, not the ambiguity we are fixing.
4. ⛔ **Do not say "the AI" as the noun.** It is vague in exactly the way we are trying to fix.
5. The no-personification rule still stands. Two nouns, still never "she".

Basics Period 1 is where both nouns are introduced. Every other class may assume the reader has
met them — but must still name the right one at first mention in a beat.

## Voice — non-negotiable
- **Plain teaching carries; the analogy garnishes.** Write the explanation exactly as plainly as
  you would say it to a smart friend. If the plain version is clearer than the scripted version,
  the script is wrong — flatten it. The analogy decorates a clear idea; it never replaces one.
- **One term per concept.** Do not cycle synonyms (model/engine/brain, prompt/ask/query). Pick
  one word and keep it for the whole script.
- **"AI" is always both capitals.** Never "Ai", never "ai". `Ai` only ever appears inside brand
  words — LAiDIES, SUNNYVAiLE, LIBRAiRY, MAiVENS.
- **Never personify.** It is "it". It does not think, want, understand, decide or remember in the
  human sense. Say what it mechanically does: stores, re-reads, produces, fills in.
- **The town is 1999.** No "nowadays", no "the future", no dating the outside world.
- ⛔ **Banned phrasing:** "the whole point", "that's the whole [anything]", revolutionary,
  game-changing, unlock, seamless, effortless, supercharge, disrupt, 10x, hot take, "let's dive in".
- ⛔ **No emoji anywhere.** ⛔ No exclamation marks in the narration.
- **The heuristic:** if a man in a quarter-zip would post it, rewrite it.
- **Humour is insider, not nostalgia-bait** — 90s/Y2K girlhood, chick-flick canon, town lore. Land
  the joke on the AI point, never on the reader.

## Structure — every script, in this order

1. **Header** — target runtime (from the register), narrator (**The Heroine**), kit line, and the
   date the facts were checked.
2. **⚠ Read this before you hit record** — only if there is a real risk (showing personal data,
   showing a real inbox, granting access on camera). Skip the section if there genuinely isn't one.
   Never invent a warning to fill the slot.
3. **The shot list** — a markdown table, three columns: `Time | On screen | The Heroine (voiceover)`.
4. **Recap, then the one thing to go and do** — the steps in order (evidence-backed), then a single instruction. Not one or the other.
5. **The one mistake, stated plainly** — with the source in brackets if it is a vendor fact.
6. **Quotable pull** — one line from the VO for the clip/social.
7. **Demo (for the register)** — a fenced JSON block, see below.
8. **Production notes** — what would ruin this specific shoot.
9. **Re-shoot triggers** — the specific changes that would invalidate this tape, and nothing else.
10. **Sources** — URL · checked date · volatility, for every vendor fact used.

## 🔴 What the evidence says about format
From `operations/research/tutorials/_how-to-teach.md`. These are research findings, not taste.

- **Chapter into sub-6-minute segments.** Engagement drops sharply past ~6 minutes
  *(Guo, Kim & Rubin 2014, ACM L@S — 6.9 million MOOC viewing sessions)*. A 9-minute class is
  fine **if it is built as two or three chapters with their own openings**, not one unbroken run.
  Mark chapter breaks in the shot list.
- **Preview the real task in plain language before any screen appears.** *(Van der Meij,
  2013/2015 — peer-reviewed and specific to software training.)* Our lesson slide does this; keep
  it doing it.
- **Signal the clickable target every single time** — highlight, cursor, or zoom. *(Mayer's
  multimedia principles and Van der Meij's software-training guidelines agree independently.)*
- **End every segment with a spoken recap of the steps, in order.** The most directly
  corroborated finding in the set, replicated across two of Van der Meij's own papers.
  ⚠ This CORRECTS an earlier rule of mine that said "end with one thing to do, not a summary."
  Do **both**: recap the steps, then give the one thing to go and do.

## The shot list — hard rules
- **Timecodes must be contiguous.** Beat 2 starts exactly when beat 1 ends. No gaps, no overlaps.
- **Total must land within ±10 seconds of the register's `runtime_target`.**
- **No beat over 145 words per minute.** Count the words in the VO cell, divide by the beat's
  seconds, multiply by 60. Aim ~90–130. The explanation beats should be the slowest.
- **The first beat (0:00–0:06) is the lesson slide** — the overhead transparency with the class
  name and the TODAY YOU WILL list — and it has **no voiceover**. Let it be read.
- **Beats with no VO are allowed and encouraged.** Write `*(no VO — …)*` and say what the silence
  is for. A screen that needs reading should not be talked over.
- ⛔ **Never pad to hit the runtime.** If the topic is honestly covered in less, end it and say so
  in the header. Runtime targets are a guide, not a quota.

## The Before & After beat — required in every class
Bad → why → fix → good. **The single most important rule: CHANGE ONE THING.** Same task, same
tool, one variable different. If your bad and good differ in five ways, you have taught nothing
causal. Name the variable in one short phrase; if you can't, the demo isn't ready.

- The **bad take** must be a reasonable thing a smart person would really type.
- The **why** is the mechanism in one plain sentence. This is the part she keeps.
- The **good take** must be visibly better without narration.
- ⛔ Do not tidy the good output. If it is still a bit off, say so on camera.

The four durable mechanisms to draw the "why" from (do not invent new ones):
1. **Nothing narrowed it, so you got the average.** Constraints change what "likely" means.
2. **It will not stop and ask.** Gaps get filled with the most plausible guess.
3. **It only sees what is in front of it.** "It ignored my instruction" is usually "that
   instruction is no longer in the room."
4. **Plausible is cheap.** A convincing-looking source costs the same as a real one.

## Demo (for the register) — the JSON block
End the script with this, filled in, so it can be merged into `content/site/high-classes.json`:

```json
{
  "variable": "the one thing that changes, in a short phrase",
  "task": "one sentence framing the identical task",
  "bad":  { "input": "", "output": "", "verdict": "" },
  "why":  "the mechanism, plainly",
  "fix":  "the one change",
  "good": { "input": "", "output": "", "verdict": "" }
}
```

## Facts
- **Every vendor claim needs a source URL and a date.** The research is in
  `operations/research/tool-machinery/` — chatgpt.md, claude-anthropic.md, gemini.md, copilot.md,
  perplexity.md. Use it. Do not write click paths from memory.
- **If it is not in the research, write `NOT VERIFIED`** and flag it in Sources. Never invent a
  menu path, a limit, a retention period or a tier.
- Basics classes are **tool-neutral** — teach the idea, and where you must show a screen, show one
  and say plainly that the other tools put it somewhere else.
- ⛔ Western majors only. Never mention Grok/xAI or Chinese models.

## Point at something we own
Where it fits naturally, end by pointing at a LAiDIES thing rather than a generic tip — the
**FAiRY Godmother Prompt Glow-Up** (paste your real prompt, watch it get rewritten and see what
was missing), the pop quiz, the LIBRAiRY, the Blend & Snap. Anyone can google a prompt template.
⛔ But do not bolt one on where it does not belong — a forced plug is worse than none.

## Analogies — READ THIS BEFORE INVENTING ONE
Analogies must be grounded in the town's own 90s/Y2K canon. Two are already canon and should be
used as written:
- **Memory / context → the Blend & Snap.** A brand-new café cannot give you "the usual"; your
  regular spot can, because you built it over a hundred Tuesdays.
- **Models, versions, cutoffs → textbook editions.** Once printed the words cannot change; the
  cutoff is the print date; web search is the teacher's photocopied handout.

If you need a new analogy: keep it to ONE per script, make it something that could plausibly
exist in a 1999 town or a 1999 classroom, and **flag it at the top of your returned summary as
needing Mall grounding.** Do not quietly invent free-floating references.
