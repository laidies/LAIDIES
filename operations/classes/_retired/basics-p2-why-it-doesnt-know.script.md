# The Basics · Period 2 — Why It Doesn't Know About Last Month
## Editions, cutoffs, and the photocopied handout · SUNNYVAiLE High

**Target runtime 6:00.** Narrator: **The Heroine.** Kit: screen capture + voiceover + the
classroom title card. No characters, no drawn art, nothing to go off-model.

**Facts in this class were checked against vendor documentation on 2026-07-22.** Sources at the
foot. Re-check before filming if that date is more than 30 days old — this class touches menu
paths, which are rated LOW–MEDIUM to MEDIUM volatility (see Sources).

⚠ **Do not state an actual training-cutoff date, model name, or version number on camera as
current fact.** Those rot fastest of anything in this curriculum. Every fact this class needs is
about *how to find the cutoff yourself* and *how to spot a stale answer* — never what today's
cutoff number is. Anywhere the script needs a concrete example, it uses something date-obvious
(an exchange rate) precisely so the tape never becomes the stale fact it is warning about.

---

## The shot list

| Time | On screen | The Heroine (voiceover) |
|---|---|---|
| **0:00–0:06** | Classroom title card, then the **lesson slide** — class name, subject, and the three lines under TODAY YOU WILL. Hold it. | *(no VO — let the slide sit and be read)* |
| **0:06–0:24** | Cut to a blank chat, **search/browse switched off**. Type slowly, in full view: **"What's the exchange rate today, dollars to euros?"** Press enter. Let the answer stream. Do not cut away. | Ask the model something that only just changed — a rate, a score, whatever moved this week. Go on, ask your own, right now, in whatever you use, then come back. |
| **0:24–0:46** | Hold on the answer. No date stamped anywhere near it. No source. Slow zoom on the number. | Notice what's missing. No date on that. No source under it. The model said that number exactly the way it says everything else — like it just walked over and checked. |
| **0:46–1:16** | Cut to a plain text card, same look as the lesson slide: **TRAINING CUTOFF.** Hold three seconds, then return to the held chat screen for the rest of the beat. | Here's why. The model was built by reading an enormous stack of text, up to some date, and then it was finished — printed, in a sense. Think of it like a textbook. Once a textbook is printed, the words inside cannot change. Not because they're wrong. Because whatever happened after printing hadn't happened yet. |
| **1:16–1:50** | Same held chat screen, cursor idle near the answer. | That print date is the training cutoff. A new model, a new version number, is a new edition — printed later, further along. But it is still printed. A newer edition is not the same as an up-to-date one. People assume the newest model must know this morning's news. It doesn't. It knows up to its own print date, whatever that is — and further along is not the same as caught up. |
| **1:50–2:22** | Same held chat screen. | And here's the trap. The model will not stop and tell you which edition it's reading from unless you ask. Filling a gap with the most plausible-sounding guess costs it nothing extra — a confident wrong number is exactly as easy to produce as a confident right one. So a stale answer does not come with a warning label. It sounds exactly like every other answer it gives you. |
| **2:22–2:34** | Click the tool's search icon in the composer, toggle it on. Pause on the click so the path is followable. | So here's the fix. One toggle. Turn on web search — every major tool has some version of it — before you ask. |
| **2:34–2:56** | Same chat, or a fresh one. Type the **identical question**, word for word. Let it stream — a number, a timestamp, a citation underneath. Do not cut away. | Same question. Word for word. Watch. |
| **2:56–3:26** | Put the two answers side by side, from earlier and from now. | There's the difference. A number, a timestamp, a source underneath. Same tool, same minute. The only thing that changed was whether the tool looked outside the book or the model read straight off its own page. Whether that source actually holds up is a different class — for right now, notice only that one of these has something to check and one of them doesn't. |
| **3:26–4:12** | Blank chat. Type: **"What's your training cutoff?"** Let the model answer. Then cut to the tool's own website — an about or model-info page, if one exists — and show it side by side with the in-chat answer. | One more catch. You can ask it straight out — "what's your training cutoff" — and plenty of people do. But it's answering that from inside the same book, about the same book. Sometimes it knows its own print date. Sometimes it's guessing, same as with anything else it wasn't sure of. Don't take its word for its own edition — go find that written down somewhere outside it, on the tool's own website. |
| **4:12–4:48** | Blank chat, search off. Type a question about something genuinely recent. Let the hedging language in the answer sit on screen — highlight the phrase with the cursor. | Here's a faster tell than asking. Put something recent in front of the model with search off and watch the hedges — "as of my last update," "I don't have information after," "I can't confirm anything past." Those phrases are it telling you, in its own words, that you've walked past the edition. |
| **4:48–4:58** | Ten seconds in a second tool: its own search toggle, same idea, different menu. | Different tool, same toggle, same idea. |
| **4:58–5:26** | Back to the first tool, settled on the good answer with its timestamp and source. | So: the book didn't change. You didn't get a smarter edition mid-sentence. You reached over, borrowed the teacher's photocopy, and tucked it in the front of the book for this one question. The book goes back to being exactly what it was printed as the second you close it. |
| **5:26–5:44** | Final card, before the CTA: **POP QUIZ — spot the stale one.** | There's a pop quiz on this at the end of the period — three answers, and your only job is to spot which one is reciting the edition and which one actually checked. Take it before you leave. |
| **5:44–6:00** | Final card: **Go and try it on your own tool.** | So go try it. Ask your tool something that changed this week. If it answers without a date and without a source, you already know what edition you're reading. |

---

## The one thing to go and do
**Ask your tool something that changed this week — once with search off, once with search on —
and put the two answers side by side.**

## The one mistake, stated plainly
**A newer model is not the same as an up-to-date one.** It is a later edition — printed further
along, but still printed the day it was released. A model can be brand new and still not know
something that happened after its print date.

## Quotable pull (for the clip / social)
> "A stale answer does not come with a warning label."

## Demo (for the register)

```json
{
  "variable": "whether it looked it up or answered from the edition",
  "task": "The identical question, asked twice, one search toggle apart: today's exchange rate, dollars to euros.",
  "bad": {
    "input": "What's the exchange rate today, dollars to euros?",
    "output": "One US dollar is worth about 0.91 euros.",
    "verdict": "That number isn't nonsense — it's a real rate. It's just a rate from whenever training stopped, handed over like it's this morning's."
  },
  "why": "It cannot tell you which edition it's reading from unless you ask, and a confident wrong number costs it nothing more to produce than a confident right one — so a stale answer never arrives with a warning label. It sounds exactly like everything else it says.",
  "fix": "Turn on the web search toggle before you ask. It's a menu item in every major tool, differently named and differently placed, same idea in all of them.",
  "good": {
    "input": "What's the exchange rate today, dollars to euros?",
    "output": "As of a few minutes ago: US$1 = €0.86 (source cited beneath the answer).",
    "verdict": "Same question, same tool, one toggle. This one came from outside the book instead of off its own page."
  }
}
```

---

## Production notes
- **Do not name a real model, version, or an actual cutoff date on camera.** Whichever tool is
  used for the demo, keep the language generic ("this tool," "it") — the lesson is the mechanism,
  not today's specifics.
- **Pick a live example on shoot day.** The exchange rate is the suggested demo because its
  answer is obviously time-sensitive and nobody will fact-check the number against reality later
  — any equally obvious "this changes constantly" example works. Do not use anything that could
  read as a real claim once the tape is old.
- **Let the cold open breathe.** The first eighteen seconds are one unbroken shot of a real,
  unhedged answer arriving. That is the hook.
- **The text card at 0:46 is typography only** — same treatment as the lesson slide, not an
  illustration. Nothing gets drawn.
- **Two tools, not five.** Ten seconds in a second tool proves the toggle is universal without
  turning this into a comparison class.
- **Do not tidy the "ask its own cutoff" answer at 3:26.** If it hedges, contradicts itself, or
  flatly doesn't know, leave it in — that uncertainty is the actual point of the beat.
- Captions render **below** the picture, never over it.

## Re-shoot triggers
Any of these and this tape needs re-cutting — nothing else does:
- The search toggle stops being a visible, optional switch in the primary tool shown (i.e., search
  becomes always-on with no toggle) — this breaks the entire "one toggle" framing of the beat.
- The demonstrated tool removes citations/sourcing from search-based answers.
- The primary tool's menu path for turning search on changes.

## Sources
- ChatGPT search — toggle location, automatic triggering, and that citations are only genuine
  when search actually ran for that response —
  https://help.openai.com/en/articles/9237897-chatgpt-search · checked 2026-07-22 ·
  volatility LOW-MEDIUM
- Claude web search — toggle location (composer "+"/slider icon), and that Team/Enterprise
  requires an admin toggle first —
  https://support.claude.com/en/articles/10684626-enable-and-use-web-search · checked 2026-07-22 ·
  volatility MEDIUM

Canon: the analogy — models as textbook editions, cutoff as print date, web search as the
teacher's photocopied handout — is already-canon per `content/site/high-classes.json`
(`basics-what-this-is`) and is used as given, not reinvented.
