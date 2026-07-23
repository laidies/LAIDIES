# Codex brief — review the SUNNYVAiLE High class scripts

**Task: review, do not rewrite.** You are a second checkpoint on nine teaching scripts. Read
this brief in full before you open a script. Your output is a report, not edited files.

⛔ **Do not edit any file. Do not run git. Do not touch site code, canon, or the register.**
Write your findings to `operations/classes/_CODEX-REVIEW.md` and nothing else.

---

# PART 1 — What LAiDIES is, so you can judge whether something fits

## The thing itself
LAiDIES teaches AI to smart women who were not invited into the tech conversation. It is not a
blog and not a course. It is a **town — SUNNYVAiLE — permanently set in 1999**, with a weekly
Wednesday episode, a radio station, a high school, a library, characters, and collectibles.
The reader returns to a place; she does not read an article once.

The brand is **LAiDIES**; the town is **SUNNYVAiLE**. Tagline: *girl power meets machine power.*

## The reader
A busy, intelligent woman with **no computer-science background**. She learns by analogy and
image. She is new to this one subject, not to competence — she runs things, she manages people,
she has judgment. **Writing that talks down to her is the primary failure mode.** The second
failure mode is writing that assumes she already knows the jargon.

## The voice
- **1999, always.** The town never references "nowadays", "the future", or anything dated
  outside the fiction. Modern software is allowed to exist — it lives *inside the television*.
- **Insider, not nostalgia-bait.** Humour comes from things this reader lived: AIM away messages,
  Seventeen quizzes, Trapper Keepers, gel pens, burned mixtapes, butterfly clips, Delia*s,
  Blockbuster, the chick-flick canon. The joke lands **on the AI point**, never on the reader.
- **Two cringes to catch:** influencer-hustle ("STOP SCROLLING", "link in bio", engagement bait)
  and tech-bro ("disrupt", "10x", "ship it", "hot take", "founder mode"). The working heuristic:
  **if a man in a quarter-zip would post it, it is wrong.**
- **AI is "it".** Never "she", never "her". It does not think, want, understand, decide or
  remember in the human sense. Correct phrasing says what it mechanically does: stores, re-reads,
  produces, fills in.
- **"AI" is always both capitals.** The lowercase `Ai` appears ONLY inside brand words —
  LAiDIES, SUNNYVAiLE, LIBRAiRY, LUMINAiRY, MAiVENS.

## The teaching rule that matters most here
**Plain teaching carries; the analogy garnishes.** The explanation should read exactly as plainly
as you would say it to a smart friend. The analogy decorates a clear idea — it never carries one.

The test Ali set: *if the plain chat-style explanation is clearer than the drafted script, the
script is wrong.* Flag any beat where the metaphor is doing work the plain sentence should do.

Known past failures to watch for:
- **Synonym pile-up** — the same concept called four different things in one script
  (model/engine/brain, boutique/store/shop). One term per concept, held for the whole script.
- **A parallel metaphor vocabulary** the listener has to translate mid-sentence.
- **A metaphor that does not survive contact** — e.g. a script once said "an ex isn't a stranger"
  when it meant a *familiar* stranger. Check each analogy actually holds if you push on it.

## Analogies are governed by canon — this is the core of your review
**Locked rule:** every teaching analogy must be grounded in the town's own 90s/Y2K canon,
specifically the things that live in the **Mall** (SUNNYVAiLE's inventory of cultural/shopping
references). Free-floating analogies are not allowed. If a script needs a reference that is not
yet in the town, the correct outcome is **"add it to the Mall"** — the reader should be able to
go and visit the thing the analogy leans on.

Two analogies are **already canon and must not be redesigned**:
- **Memory and context → the Blend & Snap** (the town coffee shop). A brand-new café cannot give
  you "the usual" — it has never met you, so you spell out the whole order every time. Your
  regular spot can, because you built that over a hundred Tuesdays.
- **Models, versions and cutoffs → textbook editions.** Once printed the words cannot change. The
  knowledge cutoff is the print date. A new version is a new edition. Web search is the teacher's
  photocopied handout tucked inside the book.

## What makes LAiDIES different from a googleable guide
Anyone can google a prompt template. The reasons to come here: a **place** you return to, owned
interactive tools (above all the **FAiRY Godmother Prompt Glow-Up** — paste your real prompt,
watch it get rewritten and see what was missing), teaching through story and a real voice, and
**fluency and judgment rather than syntax**. Where a script could point at something we own
instead of a generic tip, that is better — but a forced plug is worse than none.

## What the classes are
**Each tool is a subject; each subject runs periods.** Subject 0 is **The Basics** — nine
cross-tool classes that teach each idea once so the per-tool subjects only have to show where it
lives. Classes are **5–10 minutes**, screen recording plus voiceover plus a title slide. No
characters, no drawn art. Narrator is **The Heroine** (never named).

**Every class carries a Before & After beat:** bad take → why it did that → the fix → good take.
**The rule is that exactly ONE variable changes between bad and good.** If a script's bad and
good differ in several ways, it teaches "longer is better" instead of teaching the cause — flag
it. The "why" must be the mechanism in one plain sentence, and it must come from one of four:
1. Nothing narrowed it, so you got the average.
2. It will not stop and ask — gaps get filled with the most plausible guess.
3. It only sees what is in front of it.
4. Plausible is cheap — a convincing-looking source costs the same as a real one.

---

# PART 2 — What to review

Read every `*.script.md` in `operations/classes/` (nine of them) plus
`operations/classes/_SCRIPT-SPEC.md` for the rules they were written against.

Judge each script on these, in this order of importance:

### 1. The analogies — your main job
For every analogy in every script:
- Does it **actually hold** if you push on it, or does it break down one step in?
- Is it **grounded in town/90s canon**, or is it free-floating? If free-floating, what specific
  Mall addition would ground it?
- Is it **doing work the plain sentence should do**? (Voice rule: garnish, never carry.)
- Is it the **same analogy family** as the rest of the curriculum, or does it introduce a second,
  competing metaphor vocabulary?
- Are the two canon analogies (Blend & Snap, textbook editions) used **as written**, or has
  someone quietly redesigned them?

### 2. The examples — the Before & After demos
- **Does exactly ONE variable change** between bad and good? Name the variable. If more than one
  changed, say which ones.
- Is the **bad take something a smart person would really type**, or is it a strawman set up to
  fail? A strawman teaches nothing and is condescending.
- Is the **good output visibly better without narration**?
- Is the **"why" the actual cause**, or is it a restatement of "be more specific"?
- Is the good output **suspiciously perfect**? Real output is a bit off; a demo that overclaims
  trains the reader to distrust the next one.

### 3. Teaching soundness
- Would a smart woman with no CS background follow this **without pausing**?
- Is anything **asserted that is not sourced**? Every vendor claim should carry a URL and a date;
  unknowns should say NOT VERIFIED.
- Does each class teach **one idea**, or has it drifted into two?
- Does it **end with one thing to go and do**, not a summary?

### 4. Voice
Flag any instance of: talking down to the reader · a joke at her expense · tech-bro or
influencer-hustle register · personifying the AI · "Ai" outside a brand word · emoji ·
exclamation marks in narration · synonym pile-up · banned phrasing ("the whole point", "that's
the whole [x]", revolutionary, game-changing, unlock, seamless, effortless, supercharge).

---

# PART 3 — How to report

Write **only** `operations/classes/_CODEX-REVIEW.md`, in this shape:

```
# Codex review — class scripts · <date>

## Verdict per script
| Script | Analogy holds? | One variable? | Sourced? | Voice | Overall |
(one row per script, ✓ / ⚠ / ✗ in each cell)

## Findings
For each finding:
- **Script + timecode** (e.g. basics-p2 · 2:14–2:38)
- **What is wrong**, in one sentence
- **Why it matters** to this reader
- **A suggested fix** — a concrete rewrite of the line, not "consider revising"

## Analogies needing Mall grounding
A list: the analogy, the script it is in, and what would have to be added to the Mall.

## Strongest and weakest
Name the single strongest analogy and the single weakest across all nine, with reasons.
```

## Rules for your report
- **Be specific.** "The analogy is confusing" is useless. Quote the line and say what breaks.
- **Rank by severity.** A broken metaphor in the foundation class matters more than a stray comma.
- **If a script is fine, say it is fine.** Do not manufacture findings to look thorough. An empty
  findings list for a script is a valid result.
- **Do not rewrite the scripts.** Suggest lines in your report; leave the files alone.
- **Say what you did not check** and why, if anything.
