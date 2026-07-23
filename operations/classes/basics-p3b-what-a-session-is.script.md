# The Basics · Period 3 — What a Session Is
## Shot-by-shot script + voiceover · SUNNYVAiLE High

**Target runtime 6:00.** Narrator: **The Heroine.** Kit: screen capture + voiceover + the
classroom title card, plus the real chalkboard in this classroom. No characters, no drawn art,
nothing to go off-model.

**Facts in this class were checked against vendor documentation on 2026-07-22.** Sources at the
foot. Re-check before filming if that date is more than 30 days old — memory is rated HIGH
volatility.

---

## The shot list

| Time | On screen | The Heroine (voiceover) |
|---|---|---|
| **0:00–0:06** | Classroom title card, then the **lesson slide** — the overhead transparency: class name, subject, and the three lines under TODAY YOU WILL — *See what the model can still read, and what has scrolled away. Understand why a long chat gets worse. Know when to start fresh instead of pushing on.* Hold it. | *(no VO — let the slide sit and be read)* |
| **0:06–0:24** | Cut to the real chalkboard in this room, already full edge to edge with writing, chalk dust on the ledge. | Everything the model is working with right now is up on a board like this one. This conversation. What you have told it before. What you have given it access to. All of it, in front of it, at once. |
| **0:24–0:42** | Cut to a real chat, scrolled near the top. Cursor highlights a rule typed early: **"Headlines under eight words. Never an exclamation mark."** | Message three. Early on, you set a rule. Headlines under eight words, never an exclamation mark. The model follows it. For now, that is the newest thing on the board. |
| **0:42–1:00** | Fast scroll through the same conversation — messages piling up, ordinary back-and-forth, timestamps ticking forward. Do not slow down for this part. | Forty more messages happen. Questions, drafts, corrections, back and forth. Nothing dramatic. The rule from message three is still true. It just is not the newest thing up there anymore. |
| **1:00–1:20** | Message 41. Type slowly, in full view: **"Give me three options for the headline."** Press enter. Let the answer stream. Do not cut away. | Message forty-one. Type the exact same kind of request you always type. Give me three options for the headline. Press enter. Watch what comes back. |
| **1:20–1:42** | Hold on the output — headlines with exclamation marks, all three. Do not cut. | There it is. Exclamation marks, all three. At message three you set the rule: under eight words, never an exclamation mark. The model held the line for a while. Now it does not. |
| **1:42–2:06** | Cut to the real chalkboard — a hand erasing the top line to make room lower down. | Nothing has broken, and the model has not decided to stop listening. It can only work from what fits in front of it at once, and this conversation stopped fitting a while ago. Your rule from message three is no longer in the room. It is not ignoring the instruction — it cannot see it. |
| **2:06–2:28** | Wide shot of the crowded chalkboard, held. | Think of the model as this board. Everything from this lesson is up on this board at once. When it fills, things get rubbed out at the top to make room — and it might rub out the bit you needed. Then the bell goes and it is wiped. |
| **2:28–2:56** | Back to a plain screen — no specific tool, just text. | This isn't only instructions. What the tool stored, what it gave you access to — all of it has to fit in front of the model at once. Tools differ on what happens when it doesn't: some drop the oldest part, at least one searches back into a larger store instead. There is a limit, and past it the earliest part stops being reliably there. |
| **2:56–3:14** | Cut to a fresh, empty chat window opening. | The fix is not saying it again, louder. Two options. Start a brand new chat with the rule at the very top. Or put the rule somewhere permanent, so it never has to compete for space again. |
| **3:14–3:36** | Fresh chat. Type the rule at the top: **"Headlines under eight words. Never an exclamation mark."** Then type the identical request: **"Give me three options for the headline."** Press enter. Let it stream. | Fresh chat. The rule goes in first, at the top, where it cannot get buried. Then the exact same request as before. Give me three options for the headline. |
| **3:36–3:56** | Two answers side by side — the exclamation-marked set, and the new clean set. Cursor traces the good one. | Same eight words. Same tool. The only thing different is that the rule was close enough this time to actually be read. |
| **3:56–4:20** | Cut to the long, forty-message chat, now closed, next to a single fresh one. | Starting fresh has a real cost. You lose the thread — every decision, every correction you made along the way in that conversation is gone with it. Anything you put somewhere permanent, memory, a saved instruction, a document, survives. Anything you only ever said out loud in the chat does not. |
| **4:20–4:46** | Back in a long conversation. The model gives an answer that quietly contradicts something settled forty messages earlier — a name, a number, a decision already made. Hold on the contradiction. | There is a tell that you have hit the edge of the board before anything obviously breaks. It starts contradicting something you settled earlier — a name, a number, a decision — as if that conversation never happened. That is not it changing its mind. That is the earlier part no longer being there to check against. |
| **4:46–5:12** | Cut to the SUNNYVAiLE High class list. Highlight **"Telling It Who You Are."** | If a rule matters enough that you never want to retype it, there is a screen for that — a standing instruction the model reads before anything else, every single time. That is next period. This one is just about knowing when the board is full. |
| **5:12–5:34** | Back to a real, long conversation. Scroll to somewhere near the bottom. | So go and check one of your own. Find a long conversation and scroll back to the start. Anything you set up early that you are still counting on — check it is still holding. |
| **5:34–6:00** | The real chalkboard, wiped clean by an eraser. Final card: **Go and check yours.** | And when it is that far gone, do not fight it. Start over, rule at the top. A clean board is not a failure. It is just the bell. |

---

## The one thing to go and do
**Open a long conversation you actually rely on and scroll back to the start.** Check that
whatever you set up early — a rule, a fact, a decision — is still true of the answers you are
getting now.

## The one mistake, stated plainly
**Assuming a dropped rule means it stopped listening on purpose.** It did not decide anything.
The rule scrolled past what fits in front of it, the same way the top of a full chalkboard gets
erased to make room lower down. *(Mechanism, not a single-vendor claim — but the specific
exception, that at least one tool retrieves from a larger store instead of simply dropping the
oldest part, is documented for Claude: Anthropic states that on paid plans, as a project
approaches its context limit, Claude "automatically enable[s] RAG mode to expand your project's
capacity" — reading retrieved snippets rather than the full text every time.)*

## Quotable pull (for the clip / social)
> "It is not ignoring the instruction — it cannot see it."

---

```json
{
  "variable": "whether your instruction is still close enough to be read",
  "task": "The same request, made twice — once early in a chat, once forty messages later. The words of the request never change.",
  "bad": {
    "input": "Message 41 — \"Give me three options for the headline.\"",
    "output": "Introducing Our Exciting New Range — Discover What Everyone Is Talking About Today!\n\nYou Won't Believe What We've Been Working On!\n\nBig News: Something Special Is Finally Here!",
    "verdict": "At message 3 you told it: under eight words, never an exclamation mark. It held the line for a while. Now it doesn't."
  },
  "why": "Nothing has broken and it has not decided to stop listening. It can only work from what fits in front of it at once, and this conversation stopped fitting a while ago. Your rule from message 3 is no longer in the room. It is not ignoring the instruction — it cannot see it.",
  "fix": "Not repeating yourself, louder. Either start a fresh chat with the rule at the top, or move the rule somewhere permanent — the standing-instruction screen — so it never has to compete for space again.",
  "good": {
    "input": "Fresh chat, rule at the top. Then: \"Give me three options for the headline.\"",
    "output": "The New Range Is Here\n\nEverything We've Been Building\n\nSix Months of Work, Out Today",
    "verdict": "Identical request. The rule was simply close enough to be read."
  }
}
```

---

## Production notes
- **This conversation has to be genuinely built before the shoot.** Forty-plus real messages,
  the rule set honestly at message 3, nothing edited in after the fact. The claim of this class
  is that the rule was really there and really stopped being reachable — faking the failure by
  deleting the rule instead of letting it scroll past would be a lie on camera.
- **Do not speed up the 0:24–0:42 or 1:00–1:20 beats.** She has to see the rule get typed and the
  identical request get typed, in full, or the "nothing changed except position" claim is not
  provable.
- **The 0:42–1:00 scroll is the one place speed is fine** — it is showing bulk, not content.
- ⛔ Do not tidy the bad output. If it is uneven in some other way beyond the exclamation marks,
  leave it uneven — the only claimed variable is the rule's position on the board.
- **Same account, same day, back to back**, exactly as with every Before & After beat in this
  curriculum. A bad-take and good-take shot on different days is not an honest comparison.
- Nothing on screen gets read aloud verbatim in the voiceover except the two typed lines
  (0:24–0:42, 3:14–3:36) — the VO carries the *why*, the screen carries the *what*.
- Captions render **below** the picture, never over it.

## Re-shoot triggers
Any of these and this tape needs re-cutting — nothing else does:
- The filmed tool starts visibly warning "approaching context limit" before dropping anything —
  this class's core claim is that there is no warning, only the tell.
- The filmed tool stops losing early instructions in a normal-length conversation (i.e. this
  specific failure can no longer be produced honestly on it) — the demo would need a different
  tool.

## Sources
- Claude Projects auto-enabling retrieval ("RAG mode") instead of reading full text once a
  project nears its context limit —
  https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects · checked
  2026-07-22 · volatility LOW. **NOT VERIFIED:** the exact token/size threshold at which this
  switches over — Anthropic does not state it on the page checked.

Canon: the chalkboard is a **new analogy, grounded in the classroom this class is filmed in**,
not yet in the canon two (Blend & Snap, textbook editions) — flagged below as needing Mall
grounding per [[laidies-visual-style-benchmark]] / the analogy rule in `_SCRIPT-SPEC.md`.
