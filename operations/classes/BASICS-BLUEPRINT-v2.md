# The Basics — blueprint v2
## After Codex review, 2026-07-22. Magazine umbrella + tightened blocks + fixed examples.

This supersedes the structure in `PASTE-INTO-CODEX.md`. It folds in every valid Codex finding:
the umbrella is now magazines (not the mall), the blocks are recurring **jobs** not identical
parts, hooks leave beginner Basics, and both worked examples now isolate exactly one variable.

---

## THE UMBRELLA — magazines on the rack (APPROVED)
The tools are the magazines at the checkout — Seventeen, YM, CosmoGIRL, Teen. Same kinds of
sections, each in its own voice, and you have your favourite. Not every magazine runs every
section. **Basics teaches what a section is for; the tool subject shows whether that magazine
runs it and how.** (Canon home: the NewsStand — pending Ali's grounding ruling.)

⚠ One plain orientation line does the umbrella's work in each class — it is not a metaphor the
teaching leans on. The per-block analogies below carry the actual explanations.

## THE TWO-LAYER SPLIT — refined per Codex
- **Basics teaches the JOB**, not a promise of identical features: what the capability is for,
  when to use it, **what information actually reaches the model**, one controlled demonstration,
  and the main safety boundary. Each Basics class demonstrates the idea in one real tool, then
  says plainly that other tools solve the same job differently or may not offer it.
- **Tool subjects teach the PRODUCT**: whether it offers the job, what it calls it, where it
  lives, how to enable/edit/remove it, exact scope and limits, plan/device differences. Each
  tool tour opens with a one-sentence recap so a search visitor is not forced through a
  prerequisite chain.
- A small **comparison matrix** (jobs as rows; ChatGPT/Claude/Gemini as columns; cells =
  "available" / "different mechanism" / "no equivalent") is more honest than a universal parts
  list. Build it once, link it from every relevant class.

---

## THE BUILDING BLOCKS — tightened, grouped, analogies fixed

**Cut/moved per Codex:** "chat window" is orientation, not a block → renamed **Tool anatomy**,
taught plainly. **Hooks** leave beginner Basics → live under Advanced automation.

### Group 1 · Foundations
| Block | Plain job | Analogy | Note |
|---|---|---|---|
| Tool anatomy | The parts of the screen, and that they sit in different spots per tool | none — orientation, plain ("learn them as things, not positions") | Codex: this is orientation, not a metaphor |
| The model vs the product | A model is the trained component that turns an input into an output; the product also supplies interface, context, tools, controls and entitlements | **none — taught plainly.** Precision over charm | LOCKED: no analogy; model, product and tool are related but not interchangeable |
| Versions, cutoffs & search | Why it does not know recent things, and how it can look them up | **textbook editions** (LOCKED canon) | Codex flagged this was MISSING from the list |
| Current context | Everything the model is given to work with *right now, in this conversation* | **chalkboard — finite space; when it fills, older material has to be erased or condensed** | Codex fix: drop "wiped at the top" (implies strict first-out); products may omit, summarise, or select |
| History vs context vs memory | A saved old chat is not automatically in the current input | none — plain distinction | Codex: beginners conflate these three |

### Group 2 · Standing information (distinguish by AUTHORSHIP — Codex's key fix)
| Block | Plain job | Analogy | Note |
|---|---|---|---|
| Memory | A note **the tool writes and stores** about you, and supplies to the model | **Blend & Snap** (LOCKED). Boundary stated plainly: the tool stores and hands over a note; the model has not humanly "learned" you | Codex: keep café AFTER the mechanical explanation, never as the explanation |
| Custom instructions | A standing note **you write yourself**, applied to new chats | **a standing-order card the customer writes** (distinct from memory's tool-written note) | Codex: memory vs personalization must split on authorship, scope, persistence, control. ⚠ not "applies to everything after" — applied going forward; a tool can scope or override it |

### Group 3 · Sources & access
| Block | Plain job | Analogy | Note |
|---|---|---|---|
| Files / uploads | Material you hand it; **the model may get extracted text, not your original file** | tailor working from fabric you bring — but the "what actually reaches the model" point is demonstrated plainly, not forced into the metaphor | Codex: the processed-representation point is the real lesson |
| Web search | The tool goes and fetches current material into the input | none — plain (ties to versions/cutoffs) | |
| Connectors | **Scoped** access to one outside service you already have | **a visitor pass to one filing cabinet, permissions printed on it** (NOT an address book — that implies all-or-nothing) | Codex fix |
| Permissions & data controls | What is saved, what access is granted, how to remove it | none — plain, and it comes BEFORE files/memory/connectors | Codex: essential prerequisite, currently missing |

### Group 4 · Workspaces
| Block | Plain job | Analogy | Note |
|---|---|---|---|
| Projects / containers | A persistent place holding a subject's files and standing directions together | **a Trapper Keeper subject section** (NOT a fitting room — that is temporary and cleared) | Codex fix. ⚠ project items are available; they are not all forced into every model input — retrieval belongs in the tool subject |

### Group 5 · Advanced automation & add-ons
| Block | Plain job | Analogy | Note |
|---|---|---|---|
| Skills | A saved procedure so a repeatable job is done the same **way** each time | **recipe card — consistent steps, NOT an identical result** (generated output still varies) | Codex fix. Automatic selection is product-specific → tool subject |
| Extensions / plug-ins | An installed package that can add several parts at once | **a Trapper Keeper accessory pack** (dividers, calendar, pouch — installed together) | Codex: recipe card does not stretch this far. Local-vs-remote code = a direct safety line |
| Event triggers (hooks) | One event happens, so another action fires automatically | **a door chime** (NOT a hall monitor — that implies judgment/agency) | Codex: move OUT of beginner Basics; advanced |
| Scheduled tasks | The same job run on a schedule, unattended | a standing weekly order | permissions & unattended execution vary by tool |

⚠ **Canon rule (LOCKED):** none of the non-locked analogies above are canon just because they
feel period-right. Chalkboard, tailor, filing cabinet/visitor pass, Trapper Keeper (section +
accessory pack), standing-order card, recipe card, door chime each need an explicit SUNNYVAiLE
location or Mall-inventory entry before publication. Flag for Ali; do not publish ungrounded.

---

## THE TWO WORKED EXAMPLES — REBUILT to isolate one variable

### Example 1 — MEMORY (fixed)
**The one variable: whether the saved note is supplied to the model. Nothing else changes** —
same account, same model, same prompt, same facts. Only the "use saved memory" toggle flips.

- **Setup:** saved memory holds ONLY stable preferences — *"I lead a five-person tax team. I
  write short. I never apologise twice."* No incident details are in memory.
- **The prompt (identical both times, and it CONTAINS the facts):** *"Write a note to my team:
  the supplier missed Friday, so the report lands Wednesday."*
- **Before — saved memory turned OFF:** *"Dear Team, I wanted to take a moment to reach out
  regarding the delay with our supplier. The report will now be ready on Wednesday. Apologies
  for any inconvenience..."* — wordy, apologetic, generic.
- **Why:** with nothing about how you write narrowing it, the most likely output is the average
  business-email voice. *(Mechanism 1 only. No claim about "it won't ask" — Codex flagged that
  as unsafe.)*
- **The fix:** not a longer prompt. The saved note, turned on.
- **After — saved memory turned ON:** *"Team — supplier missed Friday, report lands Wednesday.
  Nothing else moves."* — short, no double apology.
- **Verdict:** Same account, same words, same facts. The only thing that changed was whether the
  tool handed the model your saved note. **The good output invents nothing** — the facts came
  from the prompt; the style came from the note.

### Example 2 — CONTEXT (fixed)
**The one variable: whether the brief is present in the current conversation.** Two fresh chats,
same account and model. No "forty messages later", no context-exhaustion claim.

- **The request (identical both times):** *"Give me three headline options."*
- **Before — a fresh chat with no brief in it:** three long headlines, exclamation marks,
  could-be-anything.
- **Why:** the model works only from what is in front of it in this conversation, and the brief
  is not in it. So it fills the gap with the average. *(Mechanism 3.)*
- **The fix:** put the brief in the conversation first.
- **After — a fresh chat where one earlier line says** *"Headlines: under eight words, no
  exclamation marks, for a business software update"* → three short, compliant headlines.
- **Verdict:** Identical request. The only difference was whether the brief was in the current
  conversation. **Teaches "it only works from what is supplied right now" — cleanly, with no
  unproven mechanism.**
- **Context-window exhaustion** (a long chat degrading) is a SEPARATE lesson, demonstrated with a
  tool that shows context usage — never anchored to an arbitrary message count.

---

## VOICE FIXES applied (Codex caught these — all corrected here and in any script that reuses them)
- ⛔ "an account that knows nothing about you" (personifies) → "a chat with no saved note about you"
- ⛔ "the thing that writes is the thing that remembers her" → "the part that writes is not the
  part that stores your details"
- ⛔ "it cannot see it / no longer in the room" → "it was not included in what the model was given"
- ⛔ "it will not stop and ask" (unsafe absolute) → cut; use mechanism 1 only
- ⛔ "you don't invoke it, it fires" → "you don't call it up by name; the tool reaches for it when
  the task matches"
- ⛔ "applies to everything after" → "applied to new chats going forward; a tool can scope or
  override it"
- ⛔ "some runs on your own computer" → "some of it runs on your own computer"
- ⛔ "bolt-on" / "containers" → translate on first use ("an add-on"; "a folder that keeps a job's
  files and instructions together")

## STILL OWED (not decided here)
- Ali's ruling grounding each new analogy in canon (NewsStand for the magazine umbrella; homes
  for chalkboard, visitor pass, Trapper Keeper, etc.).
- The comparison matrix (jobs × tools) built once.
- Menu paths remain app-verified only — unchanged by this review.
