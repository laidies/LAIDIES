# Episode 01 — "On Wednesdays We Do AI" · CANONICAL SOURCE

> **This is the single source of truth for Episode 1.** Edit the episode *here*. Every other
> surface — the article, the quiz, the study pack, the LIBRAiRY, the cocktail wall, KSVL, the
> Closet quote picker — is *derived* from this file. Fix a fact or a line once, here, then run the
> **Propagation checklist** at the bottom to push it out. This kills the script-vs-article drift.
>
> Spec: [operations/episode-canonical-source-spec.md](../../operations/episode-canonical-source-spec.md).
> Reverse-extracted 2026-07-13 from the shipped (verified) script, article, quiz, and facts ledger —
> not rewriting working content. Where a source disagreed with another, the divergence is flagged, not smoothed over.

---

## meta
- **number:** 1
- **slug:** `on-wednesdays-we-use-ai` *(as stored in `content/episodes/issue-01.json`; note the slug says "use" while the published title says "Do" — see extraction notes)*
- **title:** On Wednesdays We Do AI *(published/reader title — article H1 + quiz + `issue-01.json`. The audio script says the spoken title "On Wednesdays We **Use** AI"; discrepancy flagged in extraction notes.)*
- **premise:** AI fluency starts with one useful, low-risk task — what AI is, and how to have a first safe interaction with the major tools without disappearing into a 40-hour course.
- **act:** Act 1: The Awakening
- **release date:** June 3, 2026 *(from the article header)*
- **patron saint:** ⏳ **PENDING — no single patron saint is declared for Ep1 in the sources.** The episode invokes an ensemble of icons (Cher / Clueless, Regina George / Mean Girls, Dolly Parton, Samantha Jones, Elle Woods, Carrie Bradshaw, Miranda Priestly, Fei-Fei Li) rather than naming one. Do not invent one; if a patron saint is later assigned, add it here.
- **previously hook:** *"This is the beginning. No previous episode, just the part where she stops waiting for a free weekend."* *(from `issue-01.json`)*
- **next-time hook:** *"Next time on ladies: our heroine learns how to actually talk to AI, so it gives her something useful back. And it turns out… prompting is just delegation. Which — let's be honest — she already knows how to do. Tune in next week for Episode 2: Tell Me What You Want."* *(verbatim, script §12 announcer)*
- **emotional beat:** private embarrassment becomes permission to start — *"oh. I can do this."*
- **main-character-energy line:** *"I do not need to understand everything to try one useful thing."* *(from `issue-01.json`)*

## lesson
AI fluency starts with one useful, low-risk task. The gap is not confidence — it's time, context, and tools that were never explained for women already carrying too much.
**One-liner:** It's not a confidence problem. It's a physics problem.

## narrative
The beats the script (spoken) and the article (read) both render, in order. *(The script opens on the Steve cold open; the article surfaces Steve later — same character, same argument. Beats below are the shared arc.)*

1. **Steve gets the standing ovation.** 4:52 on a Tuesday, a man named Steve is called a visionary for a clean, confident analysis everyone knows took him about an hour. Her version had footnotes and two weekends — and is still in her drafts, waiting to feel "ready." He isn't smarter. He just stopped doing it the hard way. *"When did everyone learn to do that? And when, exactly, was I supposed to?"*
2. **The on-ramp was terrible.** Everything she found was written by men in fleece vests, or so shallow it amounted to *"AI is transformative!"* — *Groundbreaking.* Adding "become AI-literate" to a full calendar felt as realistic as Miranda Priestly asking for the unpublished Harry Potter manuscript. *Technically possible — but at what personal cost?*
3. **Not a confidence problem — a physics problem.** You can't add hours to a day that's already over-subscribed. The invisible load already has an AI layer. The person who preps the deck, tracks the action items, and still delivers her own work on time is *usually not named Steve.*
4. **The adoption gap.** For every 100 men using generative AI tools, only 78 women do — even controlling for job type, age, education, and access. Same tools, same desks, different adoption rates. *(→ facts.)*
5. **The uncomfortable specifics.** Men are more likely to be encouraged by managers to use AI, and more likely to be praised for it; women are more likely to worry that using AI looks like cutting corners. *That's not imposter syndrome. That's pattern recognition.* *(→ facts.)*
6. **The gap compounds into a canyon** — week over week — and Dolly says it plain: *"You'd better get to building your own bridge, honey — because ain't nobody building it for you."*
7. **Fei-Fei Li — the "Godmother of AI."** *"If we don't get women involved in AI, we're going to have a future built by half the population — for all of the population."* And when women don't use the tools, the tools learn from a skewed pool and literally get worse for women. *(→ facts.)*
8. **The flip.** Zoom in on senior women who pushed past the first awkward phase and it reverses — they lead their male peers by 14 percentage points (BCG). The gap is a starting line, not a finish line; what they bring is the one thing AI can't replicate — *a career's worth of judgment.* *(→ facts.)*
9. **The first tiny win.** A Sunday at the Blend & Snap, an email avoided for four days. She told AI the truth — who it was for, what she needed, what she couldn't say out loud. A draft in nine seconds, 80% right; the other 20% wrong in ways only she could see. She fixed it with her own judgment and hit send. Four days of dread, eleven minutes of work. *Oh. I can do this.*
10. **The cocktail-party explanation** *(→ cocktail_party).* *"It read everything. It's lived nothing. And it never says 'I don't know.'"* → the most talented new hire you'll ever manage: superhuman range, astonishing speed, first drafts that'll scare you — and zero lived judgment. You onboard it, manage it, review its work. *And you've done this all before.*
11. **Under the hood.** Type into ChatGPT, Claude, or Gemini and it's doing prediction — word by word. Experts can't even agree what to call what grew out of it. But two limits aren't up for debate.
12. **Limit one — context.** It doesn't know your context until you hand it over. It's Cher's closet computer from Clueless: endless combinations, no idea the meeting is with a hostile client — unless you tell it. Handing context over well is a skill — *literally next week's episode.*
13. **Limit two — hallucination.** Out of the box it checks only whether an answer is *plausible*, not *true*. It's the Burn Book from Mean Girls: some entries accurate, some fabricated, all delivered with the same unbothered confidence. *"Made out with a hot dog"* lands with the same certainty as a fact. *Regina George energy.*
14. **Three words so you don't pull a Cher** (confidently arguing it doesn't say R.S.V.P. on the Statue of Liberty) *(→ concepts).* **Generative AI** (a Carrie Bradshaw in your laptop), **Model** (the magazines vs the editors-in-chief), **Hallucination** (your most confident friend). Aside: *"I'm not a regular mom — I'm a cool mom"* = AI misreading the room.
15. **The try-on** *(→ try_on).* Open ChatGPT, Claude, and Gemini; give all three the same small, real task; compare the drafts; and in every one, notice *the twenty percent only you can see.*
16. **Remember, ladies.** *You'll need more than a cup of ambition to keep up in the male-dominated world of AI — lucky for you, this series comes in small sips.* Post your sharper "Remember, ladies" line in the Rooms; favourites get featured, with credit. *We're trailblazers here. Not idea thieves.*

## concepts[]
*(→ article glossary · learn/glossary.html · LIBRAiRY · concept cards · SUNNYVAiLE High course. Ep1 defines these in the "So You Don't Pull a Cher" block; `issue-01.json` glossaryTerms also list ChatGPT / Claude / Gemini as the three tools.)*

- **Generative AI** — creates *new* content (text, images, code, summaries, first drafts) instead of just searching, sorting, or analyzing what already exists. **Analogy (canon):** a Carrie Bradshaw in your laptop — not one that finds you articles to read (that's Google), one that writes the column for you. In most 2026 office conversations, "AI" means this.
- **Model** — the trained brain powering the app. **Analogy (canon):** ChatGPT, Claude, and Gemini are the magazines; the models are the editors-in-chief (Vogue / Elle / Harper's Bazaar) — different taste, judgment, style; same brief, wildly different results. *(ChatGPT runs on GPT / OpenAI; Claude on Anthropic; Gemini is Google.)*
- **Hallucination** — when AI produces something confident and polished but factually wrong or made up. It's not lying — lying takes intent; it has no built-in *"do we have receipts for this?"* check. **Analogy (canon):** your most confident friend who answers any question with total authority whether she knows or not; the Burn Book from Mean Girls.
- **ChatGPT · Claude · Gemini** — the three major tools the episode has the reader open and compare (products/apps, each running a different model).

## facts[]
*(→ article stat blocks · quiz · references · [facts-and-citations-ledger.md](../../operations/facts-and-citations-ledger.md). Per the [[fact-verification-rule]], only ledger-logged claims are treated as **Verified**; the rest are flagged.)*

- **Claim:** senior women in *technical* functions lead their male peers in GenAI **adoption** by ~14 percentage points. **Measures/scope:** ADOPTION (share who use it), senior women in technical functions only — junior women *lag* men by ~21 pts; drivers are awareness + confidence + risk tolerance. **NOT** performance / "better at AI." **Source:** BCG, *Women Leaders Are Paving the Way in GenAI* (May 2024), 6,500+ tech employees, 5 countries — https://www.bcg.com/publications/2024/women-leaders-in-tech-are-paving-the-way-in-genai · **Verified** 2026-07-07 (ledger). *(This is the stat Ep1 previously mis-stated as outperformance; the fix is why the ledger exists — keep it framed as adoption.)*
- **Claim:** women adopt GenAI less overall (adoption gap ~25%). **Measures/scope:** ~½ of men vs ~⅓ of women. **Source:** HBS / NY Fed — https://www.library.hbs.edu/working-knowledge/women-are-avoiding-using-artificial-intelligence-can-that-hurt-their-careers · **Verified** 2026-07-07 (ledger) · Used in Ep1.
- **Claim (in article, NOT in ledger):** for every 100 men using generative AI tools, only 78 women do — holds controlling for job type, age, education, access. **Article attribution:** "Harvard Digital Data Design Institute, 2024 · 140,000 participants globally"; Receipts list *Otis, N. et al. (2024), "The Gender Divide in Generative AI: A Global Challenge," Harvard Business School.* ⏳ **PENDING — not logged in the facts ledger; verify against primary source and log per [[fact-verification-rule]] before treating as Verified. Do not invent a URL.**
- **Claim (in article, NOT in ledger):** men ~23% more likely to be encouraged by managers to use AI; ~27% more likely to be praised for it; women ~32% more likely to worry AI use looks like cutting corners. **Article attribution:** "Lean In's 2026 survey" / Receipts: *Lean In (2026), "AI and the Gender Gap."* ⏳ **PENDING — not in the facts ledger; verify + log before treating as Verified. Do not invent figures or a URL.**
- **Quote (attributed, NOT in ledger):** *"If we don't get women involved in AI, we're going to have a future built by half the population — for all of the population."* — **Fei-Fei Li.** ⚠️ **Caveat (ledger, line ~157):** "Godmother of AI" is a **media nickname she distances from** — say "the world calls her," not a title she claims. ⏳ **PENDING — this exact quote is not logged/verified in the facts ledger; verify wording + source and log before treating as Verified. Note the script and article render the quote with slightly different wording (see MUST-MATCH / extraction notes).**

## comparison
*(The generalized **flat way vs fluent way** block. Ep1 has **no vague-vs-specific output demo** — that pattern debuts in Ep2. Ep1's version is behavioral: do-it-the-hard-way vs open-the-tab. → article prompt-lab block · FAiRY Godmother.)*

- **The task:** a real, low-risk work object — the classic case in the episode is the delicate email to a stakeholder who "reads tone into line breaks," avoided for four days.
- **The flat way (without ladies):** sit on the better work and wait to feel "ready" / wait for a free weekend or a 40-hour course; do it the hard way while Steve gets the standing ovation. Result: the footnoted version stays in drafts; the gap compounds week over week into a canyon.
- **The fluent way:** open the tab and hand AI the truth about one real task — who it's for, what you need from them, what you can't say out loud — then keep your judgment on the output.
- **The result (as told in-episode):** a draft in nine seconds, ~80% right; the wrong 20% visible only to her; fixed with her own judgment and sent. *Four days of dread → eleven minutes of work.* The behavioral lesson: the thing stopping her was never ability — it was that nobody had explained it in a way that made her want to start.
- ⏳ **PENDING (optional):** if a downstream surface wants a same-input/before-after *output* demo for Ep1, note that the sources don't contain one; do not fabricate a vague-vs-specific pair here (that's Ep2's block).

## cocktail_party
*(The say-it-at-happy-hour line. → **BRONZE AiGE** cocktail wall · article cocktail section · script §9. The three-beat form below is verbatim in the article and the plain-text ElevenLabs script; the v3-tagged master paraphrases it — see extraction notes.)*

> It read everything. It's lived nothing. And it never says "I don't know."
>
> That's the line — three beats, it fits in the lull before the drinks arrive. Read everything: books, articles, forums, manuals, billions of documents — it's absorbed how language works. Lived nothing: no job, no relationships, no consequences. So the honest picture isn't a robot genius and it isn't a toy — it's *the most talented new hire you'll ever manage.* You onboard it, you manage it, you review its work. And you've done this all before.

## quotables[]
*(The funny lines + best lines a resident would want on her card — NEVER stats. → **MAiKEOVER** favourite-quote picker → **Closet** display. See [[quotables-are-funny-and-lyrics]].)*

- "Get in loser, we're learning AI." — *the tagline*
- "It's not a confidence problem. It's a physics problem." — *the reframe*
- "That's not imposter syndrome. That's pattern recognition." — *the adoption-gap beat* (article: "It's not imposter syndrome. It's pattern recognition.")
- "Regina George energy. But make it AI." — *the Burn Book / hallucination beat* (article variant: "Regina George energy, but make it software.")
- "You'd better get to building your own bridge, honey — because ain't nobody building it for you." — *Dolly*
- "Technically possible — but at what personal cost?" — *the Miranda Priestly bit*
- "It read everything. It's lived nothing. And it never says 'I don't know.'" — *cocktail party*
- "Small sips. Big moves." — *final sip*
- "You'll need more than a cup of ambition to keep up in the male-dominated world of AI." — *the remember line*
- "We're trailblazers here. Not idea thieves." — *the challenge sign-off*
- "Don't just learn from books, learn from hooks." — *KSVL motto (site canon; spoken in the try-on send-off)*
- ⏳ **PENDING:** the best two lines from the Ep1 anthem — add once the Suno lyrics are written down (not transcribed in the repo; don't invent them).

## discussion_prompt
*(→ **Delta LAi Nu** weekly room/thread · article challenge box · script sign-off.)*
> Got a sharper *"Remember, ladies:"* line that would make Dolly proud? Post your version in the Rooms — our members-only chat at the sorority house in SUNNYVAiLE. Your Resident Card gets you in the door. Favourites may be featured, with credit, in a future Episode. We're trailblazers here, not idea thieves.

## try_on
*(→ try-on.html · article · study pack at the Blend & Snap. ~10 minutes, not homework.)*
Open ChatGPT, Claude, and Gemini and give all three the same small, real task — the avoided email, or your version of it. Tell them the truth about who it's for and what you need, then compare the drafts that come back. They won't match (that's the editors-in-chief thing). One will win today's task; a different one might win next week's. And in every draft, notice the twenty percent only you can see.

## quiz[]
*(Canonical Q/A lives here; the machine copy is [content/site/quizzes.json → `issue01`](../site/quizzes.json) and SUNNYVAiLE High. 10 scored + 2 bonus.)*

1. **What is the actual first move in Episode 1?** → *Open the tab and try one small thing.*
2. **Why does AI feel urgent for busy corporate women?** → *Because it is being added to the invisible load.*
3. **lAIdies is not asking you to become:** → *The IT department in better shoes.*
4. **What makes generative AI different from regular search?** → *It can create a new first pass from your instructions.*
5. **What does Cher's closet computer prove?** → *Useful technology can feel fun and practical.*
6. **What does "small sips, big moves" mean here?** → *Try one manageable move instead of waiting to feel ready.*
7. **Why does Episode 1 ask you to try the same prompt in ChatGPT, Claude, and Gemini?** → *To see which tool feels most useful for the same low-risk task.*
8. **What should you keep even when AI helps?** → *Your judgment.*
9. **What kind of first task belongs in the Episode 1 try-on?** → *A low-risk work explanation or draft you can judge.*
10. **Why does the room matter?** → *Because learning is easier when women trade questions, receipts, and shortcuts.*
- **Bonus 1:** next week, prompting gets compared to what? → *Delegating with context.*
- **Bonus 2:** who becomes the patron saint of specificity in Episode 2? → *David Rose.*

## track
*(→ **KSVL / radio** · track callout in script + article · BRONZE AiGE.)*
- **title:** "On Wednesday We Do AI" *(the Ep1 Wednesday Anthem; title inferred from the audio filename)*
- **file:** `content/music/dj-jaidy-week-01-on-wednesday-we-do-ai.mp3`
- **callout line (verified, script try-on send-off):** *"Turn on K-S-V-L, ninety-nine point nine, for this week's anthem — don't just learn from books, learn from hooks."*
- **lyrics:** ⏳ **PENDING** — the anthem exists as audio but its lyrics aren't transcribed anywhere in the repo. Do not invent them. When the Suno lyric sheet is saved, paste it here and add the best two lines to `quotables[]` above.

## references[]
*(→ **LIBRAiRY** further-reading shelf. From the article's "The Receipts" section + the facts ledger. Items marked ⏳ are cited in the article but not yet logged/verified in the facts ledger.)*
- BCG (2024), *Women Leaders in Tech Are Paving the Way in GenAI* — https://www.bcg.com/publications/2024/women-leaders-in-tech-are-paving-the-way-in-genai *(ledger-verified)*
- HBS / NY Fed — women avoiding AI / adoption gap — https://www.library.hbs.edu/working-knowledge/women-are-avoiding-using-artificial-intelligence-can-that-hurt-their-careers *(ledger-verified)*
- ⏳ Otis, N. et al. (2024), *The Gender Divide in Generative AI: A Global Challenge*, Harvard Business School *(article Receipts; not in ledger — verify + add URL)*
- ⏳ Lean In (2026), *AI and the Gender Gap* *(article Receipts; not in ledger — verify + add URL)*
- ⏳ Elsesser, K. (2026), *The Gender Gap In AI Use And What's Driving It*, Forbes *(article Receipts; not in ledger)*
- ⏳ Soni, L. (2026), *AI And The Gender Gap: The New Broken Rung*, Forbes *(article Receipts; not in ledger)*
- Ethan Mollick — *One Useful Thing* (newsletter) — listed in the article's "Gimme, Gimme More" further-reading block *(no URL given in-source)*

## artwork[]
*(→ article · episode player.)*
- **hero:** `assets/ugh-as-if.png` *(from `issue-01.json` heroImage)*
- **screening-room / section shot brief:** [operations/codex-prompts/episode-01-screening-room-shots.md](../../operations/codex-prompts/episode-01-screening-room-shots.md)
- ⏳ **PENDING:** an object-world masthead for Ep1 (Ep2 has one at `assets/brand/…issue-02-objects…`); none located for Ep1 in sources — add path if/when it exists, don't invent.

---

## Propagation checklist (v1 — sync by hand from this file)
When you edit anything above, walk this list. ✅ = already true to canon · 🔧 = needs a sync pass.

| Surface | File / location | Status |
|---|---|---|
| Script (audio) | `operations/audio/episode-01-elevenlabs-v3-tagged.txt` (+ `…-elevenlabs.txt`, `…-casting.md`) | ✅ canon source (master = v3-tagged) |
| Article (read + visuals) | `issues/issue-01.html` | ✅ shipped · 🔧 reconcile title ("Do" vs script "Use") + log the 3 unverified stats in the facts ledger |
| Article stub | `content/issues/issue-01.md` | 🔧 stub only (points to the HTML); body generator not yet wired |
| Quiz | `content/site/quizzes.json → issue01` | ✅ matches (10 + 2 bonus) |
| Episode data | `content/episodes/issue-01.json` | ✅ matches (machine copy) · note slug "use" vs title "Do" |
| Study pack | Blend & Snap (`blend-and-snap.html`) | 🔧 confirm concepts / try-on / cards match |
| Glossary | `learn/glossary.html` (Generative AI · Model · Hallucination · ChatGPT · Claude · Gemini) | 🔧 confirm defs match `concepts[]` |
| LIBRAiRY | technical-reference shelves | 🔧 add `references[]` + concept defs |
| Concept / character cards | `games/trading-cards.html` (Ep1 pack) | 🔧 confirm against `concepts[]` |
| SUNNYVAiLE High course | Ep1 101 class | 🔧 confirm against `concepts[]` + `quiz[]` |
| BRONZE AiGE cocktail wall | `bronze-aige.html` | 🔧 add `cocktail_party` line to the archive wall |
| KSVL track | `radio.html` / `ksvl-player.js` | 🔧 confirm week-01 anthem wired (⏳ lyrics pending) |
| Facts ledger | `operations/facts-and-citations-ledger.md` | 🔧 **log the Harvard 78:100, Lean In 23/27/32, and Fei-Fei Li quote** (currently in article, not ledger) |
| MAiKEOVER quote picker | quote field on the Resident Card | 🔧 feed `quotables[]` into the pickable pool |
| Delta LAi Nu rooms | `delta-lai-nu.html` (sorority) | 🔧 seed the week's thread with `discussion_prompt` |

---

## MUST-MATCH (verbatim in script + article — enforced by `operations/check-episode.sh 1`)
These exact strings must appear in BOTH the audio script (`episode-01-elevenlabs-v3-tagged.txt`) and the article (`issues/issue-01.html`), so the expert quote + core teaching examples can't drift between surfaces. Edit them here first, then propagate. *(Each confirmed verbatim in both files 2026-07-13; the full Fei-Fei Li quote diverges after this substring — lock only the confirmed prefix.)*
- If we don't get women involved in AI, we're going to have a future
- Made out with a hot dog
- Regina George energy
- twenty percent only you can see

See [[episode-canonical-source-spec.md]], [[article-derived-from-script]], [[episode-content-sync-surfaces]], [[quotables-are-funny-and-lyrics]], [[fact-verification-rule]], [[ai-gender-stats-verified]].
