# The LAiDIES Teaching Pattern

**Derived from Ali's own work, 2026-07-22. Evidence-only: every rule below is
backed by a quoted passage from Episodes 1–5.**

Ali's ruling, verbatim, 2026-07-22:

> "episodes 1 to 3 [teach helpful content and provide funny and useful analogies
> and examples] — episode 4 was a departure from norm."

So the corpus splits:

| | status | what it is |
|---|---|---|
| **Ep 1 · On Wednesdays We Use AI** | **STANDARD** | the voice benchmark (already locked in the writing-lock) |
| **Ep 2 · Tell Me What You Want** | **STANDARD** | the tightest teaching structure in the corpus |
| **Ep 3 · The Burn Book Problem** | **STANDARD** | the tightest problem→method→re-run loop |
| **Ep 4 · The Founding Mothers** | **DEPARTED** | history lecture; no worked example, no try-on, no new capability |
| **Ep 5 · The Super Models** | **FAILED** | Ali stopped it. "20 minutes of dribble with 1 mildly amusing line." |

Sources read in full: `operations/audio/episode-0{1,2,3,4,5}-elevenlabs-v3-tagged.txt`,
`issues/issue-0{1,2,3,4}.html`, `operations/voice/laidies-writing-lock.md`.

This document is downstream of the writing-lock and does not replace it. The
writing-lock governs **voice**. This governs **teaching structure**.

---

## 0. The one-sentence finding

**Eps 1–3 hand the reader a move she can make at her own desk on Wednesday.
Eps 4–5 hand her a fact she now knows.**

Everything below is the mechanism behind that sentence.

The single hardest piece of evidence for it: **Episode 1 already taught
model-vs-app, in 26 words, better than the whole of Episode 5.**

> **Ep 1:** "*Model: the trained brain behind the app. ChatGPT, Claude, and Gemini
> are the magazines; the models are their editors-in-chief — different taste,
> different judgment, different style. Same brief, wildly different results.*"

Ep 1's version ends on a **prediction the reader can go and test** — "same brief,
wildly different results" — and the Ep 1 try-on is exactly that test ("*open the
three big tools... give all three the same small, real task*"). Ep 5 spent 2,205
words on the same concept and ended on "*there was never one best AI*", which the
reader cannot test, use, or act on.

---

## 1. THE ANALOGY ENGINE

### 1.1 The standard (already in the writing-lock, now with evidence)

> "*A good LAiDIES reference does at least two jobs: 1. It is funny or familiar.
> 2. It makes the AI/work concept easier to understand. If it only does one,
> revise it.*" — laidies-writing-lock.md

Eps 1–3 clear that bar. But the corpus shows a **third, harder property** that
separates Ep 1's best analogy from every analogy in Eps 4–5, and it is the thing
that actually makes the pattern reproducible:

> **THE THIRD JOB (the real gate): you can reason *from* it and derive true,
> new facts about AI that were never stated.**
>
> A mental model is generative. A decoration is not. Test it by asking a question
> the script never answered and seeing whether the analogy answers it correctly.

### 1.2 The two-jobs table — Eps 1–3 (PASS)

| Ep | Concept taught | Analogy (quoted) | Job 1 — funny / familiar | Job 2 — makes it clearer | Job 3 — can you reason from it? |
|---|---|---|---|---|---|
| 1 | **What an LLM is** | "*It's the most talented new hire you'll ever manage.*" | Every woman in the audience has managed a brilliant, useless-on-day-one hire | Names both halves of the real thing at once: "*A brilliant new hire has read everything… And it has lived nothing*" | **YES — the whole season is deduced from it.** Onboarding→context (Ep2), reviewing its work→verification (Ep3), "no stake in what happens if it's wrong"→why it hallucinates. See §1.4 |
| 1 | **Model vs. app** | "*ChatGPT, Claude, and Gemini are the magazines; the models are their editors-in-chief*" | Instant, and flattering to the reader's world | "*different taste, different judgment, different style*" = why outputs differ without implying a ranking | **YES** — predicts "*Same brief, wildly different results*", which the try-on then verifies |
| 1 | **No context until you give it** | "*It's Cher's closet computer from Clueless: endless outfit combinations, all day long — but it has no idea the meeting is with a conservative client who is already looking for reasons to dismiss you... unless you tell it.*" | Canon saint, exact scene | Separates *generative range* from *situational knowledge* — the exact distinction | **YES** — "what does the closet not know? the room." Generates Ep 2 wholesale |
| 1 & 3 | **Hallucination** | "*It's the Burn Book from Mean Girls: some entries accurate, some completely fabricated, all delivered with the same unbothered confidence.*" | The most-quoted artefact in the reference era | Teaches the *mechanism*, not the vibe: truth and falsehood arrive **in the same handwriting**, so tone carries no signal | **YES** — "you can't sort by confidence, so you must sort by receipt" → generates Ep 3's draft/claim/receipt piles |
| 1 | **Confidence ≠ correctness** | "*so you don't pull a Cher, confidently arguing it doesn't say R.S.V.P. on the Statue of Liberty*" | One line, universally known | The failure isn't stupidity, it's *fluent* wrongness | Partial — a warning, not a model. Correctly used as a **garnish beat**, not the spine |
| 1 | **AI misreading register** | "*[sweet, bubbly, sincere] I'm not a regular mom — I'm a cool mom.* … *That's AI trying to be helpful and completely misreading the room.*" | Perfect delivery joke | Names tone-misfire as a distinct failure from factual error | Partial — and that is fine; it is 10 words |
| 2 | **Context / why the same tool differs day to day** | "*AI is not your regular spot. It's the brand-new café across town, and if you breeze in and say 'the usual,' you get a blank look*" | Everyone has a usual | Explains that "the usual" only works where a *history* exists — so a new chat has none | **YES** — and the script *uses* it to predict a real feature: "*So how long until it knows your order by heart… Right now — it doesn't. Every new chat, you walk into the café a stranger again.*" |
| 2 | **Specificity / underspecified prompts** | "*you handed it 'fold in the cheese' — when what it needed was 'scrape the spatula along the bottom of the bowl, lift, turn it over, turn the bowl, and repeat.'*" | David Rose screaming "WHAT DOES THAT MEAN?!" | **Teaches by supplying the fixed version in the same breath.** The contrast IS the lesson | **YES** — gives the reader a rewrite operation, not a mood |
| 2 | **What a vague ask returns** | "*It's Ross, screaming 'PIVOT' — technically a direction, zero help getting the couch up the stairs.*" | 12 words | Names precisely why the bad output feels maddening: it's not wrong, it's *unusable* | Partial, and deliberately light |
| 2 | **Iterating vs. re-rolling** | "*It's calling into the radio and asking for exactly the song you want to hear (or finally shelling out twenty bucks at H-M-V for the CD), not spinning the dial, hoping it lands on one you like.*" | 1999 canon, KSVL-adjacent | Distinguishes *steering* from *re-generating* — a real skill most guides never name | **YES** — tells you what to do when the first answer is off |
| 2 | **Prompting = delegation** | "*a prompt isn't code. It's a delegation. You're not programming a machine — you're briefing an assistant.*" | The relief is the joke | Removes the technical framing that was the actual blocker | **YES** — the six briefing questions are *derived* from it |
| 3 | **Confident unearned authority** | "*The machine took a maybe... and gave it a lanyard.*" | Seven words, funniest line in the corpus | The lanyard = credentialing. The joke **is** the mechanism: unsupported content gets the same badge as supported content | **YES** — tells you what to look for: promotions in status, not errors in fact |
| 3 | **One data point → huge conclusion** | "*That was never evidence. It's a clue in a Claire's headband, sprinting straight to a conclusion. One data point. No context. Enormous conclusion.*" | Bethany Byrd, exact scene | Teaches inferential overreach, which is otherwise a dry statistics word | **YES** |
| 3 | **True-but-misplaced information** | "*It's real information in the wrong place. It brought the wrong ID and somehow made it past the door. A U.S. HR answer in a Canadian workplace. Last year's pricing page wearing this year's lip gloss.*" | "SHE DOESN'T EVEN GO HERE!" | Names the **hardest** failure mode in AI use — one most explainers cannot articulate at all | **YES** — converts into a literal checklist: whose country, whose year, whose client |
| 3 | **Verification method** | "*Elle isn't checking whether Chutney can repeat herself. She's waiting for the detail that doesn't fit.*" | The perm timeline | Distinguishes *corroboration* from *repetition* — the exact reason "are you sure?" fails | **YES** — generates all three moves, verbatim |
| 3 | **Why "are you sure?" fails** | "*asking AI 'are you sure?' is like asking Regina George whether the Burn Book is peer reviewed. Bold choice. Limited value.*" | Anti-saint, on canon | Explains that the checker and the checked are the same system | **YES** |
| 3 | **Draft vs. claim** | "*A draft is an outfit. A claim is an alibi. Dress accordingly.*" | Eight words | Two categories, two standards of proof, in one image | **YES** — is literally the sorting rule |

**Note the pattern:** in Eps 1–3, the analogy and the teaching sentence are
frequently *the same words*. "The machine took a maybe and gave it a lanyard" is
simultaneously the joke, the image, and the diagnosis. That is the target.

### 1.3 The failures — Ep 4 / Ep 5

| Ep | Analogy (quoted) | Job 1 | Job 2 | Verdict |
|---|---|---|---|---|
| 4 | "*I'd learned to drive the car without ever once asking who built the engine.*" | mild | **none** — knowing the engine's history does not change how you drive | **Job 1 only.** It justifies the episode's existence; it teaches nothing about AI |
| 4 | "*It's like I moved in with someone and realized I'd never once asked to meet their family.*" | charming | **none** | **Job 1 only** |
| 4 | "*'AI' is the name of a whole field. It's like being told to 'just use internet.' …Use internet for what?*" | yes | **yes** — genuinely excellent | **PASSES both jobs — and is then abandoned.** The episode promises "*nobody has handed you that map yet*" and then never hands over the map; it defers it to Ep 5. A two-job analogy that writes a cheque the episode doesn't cash is still a structural failure |
| 5 | "*Like it went home and read my diary.*" | yes | none | Job 1 only |
| 5 | "*Every AI company is a fashion house… what each house actually makes… is a supermodel.*" | yes | **thin** — carries exactly one true distinction (company ≠ app) | See §1.5 |
| 5 | "*She's the girl who always knows exactly which room she's standing in.*" (Samantha) | yes | none — it describes the saint, not the concept | Job 1 only |
| 5 | "*There's the couture it saves for the big occasions, and there's something breezier you'd actually wear on a Tuesday.*" | yes | **would pass both** — then: "*It is also its own episode, and it isn't this one.*" | **Deployed and withheld.** Do not raise a two-job analogy in order to decline to use it |
| 5 | "*before you go collecting logins like lip glosses*" | yes | slight | Job 1 + a shrug |
| 5 | The 254-word 90s supermodel flashback ("*Linda Evangelista tells a magazine… she doesn't get out of bed for less than ten thousand dollars a day… George Michael stacks a lineup of them into a single music video*") | **delightful** | **zero** — nothing in it is about AI | **11.5% of the episode's words, teaching nothing.** Ep 1 has no equivalent passage. Even "men in fleece vests" is doing work (it explains why the on-ramp failed) |

### 1.4 Hypothesis test — **CONFIRMED**

**The hypothesis:** Ep 1's "most talented new hire you'll ever manage" *is* the
mental model — you can reason with it — whereas Ep 5's fashion house is
decorative, and stripping it leaves nothing.

**Confirmed on the "new hire", with one refinement on the fashion house.**

**Evidence 1 — the new hire is generative across episodes.** The analogy is
introduced in Ep 1 and then *derived from* in Ep 2 and Ep 3 without being
re-explained:

- Ep 1 states it: "*You don't hand it the keys — you onboard it. You give it
  guidance and guardrails, the lay of the land around the office. You manage it,
  and you review its work.*"
- Ep 2 deduces the method: "*I stopped typing at AI like a Google search… and I
  started briefing it like a smart new hire in her first week.*" and "*if the
  first answer isn't quite right? You don't start from scratch — you tell it
  what's off, exactly like you would with a real new hire.*"
- Ep 3 deduces the duty: "*You still read it, you still check the citations, you
  still walk in and own it.*"

Two whole episodes of method are downstream of one Ep 1 image. That is a mental
model, by definition.

**Evidence 2 — the new hire survives being stripped.** Ep 1's own happy-hour box
compresses it and it still teaches:

> "*It read everything. It's lived nothing. And it never says 'I don't know.'*"

Three clauses, no analogy, and every clause is a true, load-bearing fact about
LLMs (training corpus; no experiential grounding; no calibrated abstention). The
analogy was a **handle on a true structure**, not a costume over a thin one.

**Evidence 3 — the new hire answers questions the script never asked.** Ask it
"why did it invent that source?" → *a day-one hire with no stake in the outcome
guesses to look useful.* Ask "why did it get my tone wrong?" → *it has no read on
your office politics.* Correct answers, both, and neither is in the script.

**Now the fashion house.** Strip it:

> Plain version: *"OpenAI makes the models; ChatGPT is the app you open them in.
> Your work Copilot often runs the same models — that's why it feels familiar."*

That is the whole of Ep 5's teaching, in 30 words. The metaphor was wrapped
around **one sentence**, not around a structure. And it fails Job 3 — you cannot
reason from it:

- Ask "which one should I open for a fifty-page contract?" → the supermodel
  metaphor is silent. (Ep 5 knows this, which is why it substitutes a four-line
  roster with the names removed — see §7.)
- Ask "why does it make things up?" → silent.
- Ask "what does the house's next season tell me about behaviour?" → "*same house
  look, different woman*" — a restatement, not an implication.

**Refinement, for honesty:** the fashion house is not *purely* decorative. It
carries one real, true, useful distinction — company ≠ app — and "*The company
makes the model; the app is just where you shop it*" is a genuinely good line.
The failure is one of **load and proportion**, not of falsity:

- it labels rather than explains;
- it generates a parallel vocabulary the listener must translate mid-sentence —
  *house / line / star / face / poster / boutique / store / shop / storefront /
  counter / rack / window / couture / resort* — against Ali's own locked rule
  ("*One term per concept*", writing-lock Plain-Teaching Rule);
- and it consumes the word budget the capability needed. Ali's own audit:
  "*The proportion is backwards — ~15 min of metaphor, a 4-line roster for the
  thing that actually matters.*"

**Ruling: the hypothesis stands.** The test to apply going forward is §1.1's
Job 3 plus the strip test:

> **STRIP TEST.** Delete the analogy and write the teaching plainly.
> If what's left is a *structure* you can keep reasoning about → the analogy was
> a handle, keep it.
> If what's left is *one sentence* → the analogy was a costume. Keep the sentence,
> cut the costume down to one line, and spend the reclaimed words on the
> capability.

### 1.5 Grounding rule (non-negotiable, from `analogies-grounded-in-mall-canon`)

Every teaching analogy must live somewhere the reader can **go visit** —
the Mall, Main Street, the LIBRAiRY, the Blend & Snap, KSVL, the NewsStand, the
Bronze AiGE, the LUMINAiRY. If a reference isn't in the Mall inventory yet, it
gets **added** to the Mall. Do not invent free-floating analogies.

Eps 1–3 comply: the closet computer, the Burn Book, HMV, the radio request line,
Claire's, the café, the courtroom. Ep 5's supermodel runway was flagged in that
same memory as "*an ungrounded supermodel reference*" added by writing the script
"cold" without reading the canon first.

---

## 2. THE EPISODE SKELETON

Measured word counts, delivery tags stripped, from the recording masters.
Percentages are cumulative position in the script.

### 2.1 The shared skeleton of Eps 1–3

| # | Beat | Ep 1 | Ep 2 | Ep 3 | Spec |
|---|---|---|---|---|---|
| 0 | **Announcer bookend** — "Previously / And on this episode" | 0–2.3% | 0–3.3% | 0–3.4% | **≤ 3.5%**, ~60–100 w. Names last week's capability, then this week's *failure* |
| 1 | **Cold open — a timestamped scene at her desk** | 2.3–7.7% | 4.2–8.1% | 3.4–8.7% | **starts by 4%, ends by 9%.** Always a clock: "*It's 4:52 on a Tuesday afternoon*" / "*It's nine-fifteen on a Tuesday*" / "*It's a Thursday afternoon*" |
| 2 | **"And I couldn't help but wonder…" — the question** | 7.7% | 8.9% | 8.7–14.6% | **by 9%.** One sentence. Must be answerable by the core teaching (see §2.3) |
| 3 | **Welcome / premise / last-week bridge** | 12.2% | 12.2% | 14.6% | **≤ 120 w.** Ep 2 does it in 76 |
| 4 | **Take it to town — location #1** | library, 21% | Blend & Snap, 17% | NewsStand, 19% | **17–21%.** The location does a *job* (see §2.4) |
| 5 | **FIRST TEACHING SENTENCE lands** | 27.8% (physics, not confidence) | **17.2%** ("*It wasn't the tool that changed… It was me: what I'd typed*") | **25.1%** (the Burn Book Problem) | **by 25%.** Ep 1 is the pilot and runs later by design; for all non-pilots, **≤ 25%** |
| 6 | **The analogy that carries it** | closet / Burn Book, 73% | café, 25.5%; fold-in-the-cheese, 40% | Burn Book, 25%; Bethany, 29% | Immediately after the plain sentence, never before it |
| 7 | **THE WORKED EXAMPLE** | 38.8–44.7% (158 w) | **47.5–65.6% (424 w — the largest block in the corpus)** | opens at 3.4–8.7%, **closed at 77.7%** | **The single largest block. 150–425 w.** See §3 |
| 8 | **The evidence / the receipts** | Harvard 21%, BCG 51% | Harvard×BCG + Mollick, 72–73% | Nature / AI Index / KPMG, 66.9% | Stats carry year + source in-prose. Placed *after* the reader already believes it, as confirmation |
| 9 | **The method — the copyable moves** | "*hand it your real context, keep your own judgment on the 20%*", 82.5% | the six briefing questions, 47.5% | the three moves, 72.6–77.7% | **Must be quotable and copy-pasteable** |
| 10 | **Cocktail party explanation** | 56.4–63% | 84.3% | 82.6% | The compressed mental model. One line, then "*so let me show you why*" |
| 11 | **Vocab — the three words** | 79.8% | (article) | (article) | 3 terms, each with a canon image |
| 12 | **"And… that's the episode." → the try-on** | 85–94% | 93% | 91.9% | **Always ten minutes, always "not homework", always on a real task at her desk** |
| 13 | **Town extras** (quiz, KSVL, residence card) | 94% | 97% | 97.7% | Fixed furniture |
| 14 | **"So remember, ladies…"** | 95.2% | 98.3% | 97.7% | An **instruction**, not a feeling. See §5 |
| 15 | **"Next time on ladies"** | 98% | 100% | 100% | Teases next week's *failure*, not next week's topic |

**Total length: 2,350–2,700 words.** Ep 2 (2,350) is the tightest and the
best-taught. Length is not the variable; **what occupies the middle third is.**

### 2.2 The middle third is the tell

Take words 33%–67% of each script and ask what is in there:

- **Ep 1:** the avoided email, the +14pt flip, the new-hire model. → *worked example + mental model*
- **Ep 2:** the six briefing questions + the entire 424-word policy demonstration. → *method + worked example*
- **Ep 3:** Elle/Chutney, the three piles, the currency check. → *method*
- **Ep 4:** Hedy Lamarr, the ENIAC Six, Grace Hopper, the Dartmouth naming, Spärck Jones. → *chronology*
- **Ep 5:** supermodel nostalgia, "every AI company is a fashion house", "the wall of logos". → *metaphor construction*

**Rule: the middle third belongs to the reader's work, not to the show's world.**

### 2.3 The opening question must be answered by the core teaching

Locked in the writing-lock's Plain-Teaching Rule; the corpus shows why.

- **Ep 2 — perfect.** Q: "*why does AI read my mind some days, and completely
  ignore me on others?*" → A, at 17.2%, is the core teaching itself: "*It wasn't
  the tool that changed between the two. It was me: what I'd typed to get each
  one.*" Question and thesis are the same sentence, inverted.
- **Ep 3 — perfect, and closed.** Q: "*how am I supposed to catch the one line in
  it that's quietly, completely wrong*" → A: the three moves, then the *same
  Thursday disaster re-run* at 77.7%: "*Same nine seconds — no phantom July
  approval, because I never left a gap for the machine to fill.*"
- **Ep 1 — good.** Q: "*when did everyone learn to do that? And when, exactly,
  was I supposed to?*" → A: "*this was never a confidence problem. It's a physics
  problem*" + the email + "*The thing stopping me was never ability.*"
- **Ep 5 — fails.** Q: "*how is a total stranger already this specifically
  familiar?*" → not answered by the core teaching (house vs. boutique) at all;
  answered at 67.1% by a **bolted-on department-store extension**. Ali flagged
  this exact defect: "*The opening mystery… was answered only by a bolted-on
  department-store beat at the end.*"

### 2.4 Town locations carry the act turns (Eps 1–3) — Eps 4–5 use one as a set

| Ep | Locations | Each one's job |
|---|---|---|
| 1 | library (19%) → Blend & Snap (38.8%) → Bronze AiGE happy hour (56.4%) | *find out it isn't just me* → *the first win* → *the cocktail question gets asked out loud* |
| 2 | Blend & Snap (17%) → LIBRAiRY (72.6%) → Post Office (87.5%) | *diagnose it* → *go get the proof* → *tell a friend* |
| 3 | NewsStand (19.1%) → library shelf (92%) | *separate true from plausible* → *where the rulebook lives* |
| 4 | LUMINAiRY, and only the LUMINAiRY (20.8% → 85%) | a **stage** for a monologue |
| 5 | LIBRAiRY, and only the LIBRAiRY (28.3% → end) | a **stage** for a monologue |

**Rule: 2–3 town locations per episode, each mapped to a function, each marking
an act turn.** A single location held for sixty percent of the runtime is a set,
not a town.

### 2.5 Precisely where Ep 4 deviates

1. **No problem from her desk.** The cold open is a *realisation about the show's
   subject* ("*I could not tell you the first thing about where it came from*"),
   not a task that failed. Contrast Ep 3's "*The draft said the client had
   'approved' a July rollout… Nobody approved anything.*"
2. **The premise is announced and then withdrawn.** "*So this week, no new trick.
   This week's a flashback.*" — the episode tells the reader up front that no
   capability is coming.
3. **A 244-word welcome (17%) that sets up a different episode.** It builds the
   "just use internet" directory promise — "*With AI, nobody has handed you that
   map yet*" — and then hands over no map. The map is deferred to Ep 5.
4. **Structure is a chronology, not an argument.** 1843 → 1942 → 1945 → 1952 →
   1956 → 1972 → 2012 → 2017 → 2022. The order is the calendar's, so nothing
   *builds*; any vignette could be removed without breaking the next.
5. **Zero worked example.** No task, no prompt, no output, no before/after.
6. **The try-on is deleted.** "*No try-on task this week — a field trip.*"
   The assignment — "*meet one Maven I didn't even name today, and text one friend
   a single sentence about her*" — is a lovely act of citizenship and not a skill.
7. **The cocktail line is a fact, not a model.** "*It's almost two hundred years
   old and about three years old at the same time.*" True, memorable, and nothing
   follows from it on Wednesday.
8. **Format change mid-season:** four extra character voices. Not wrong in itself;
   worth noting it arrived in the same episode as every other departure.

**What Ep 4 got right and must be preserved:** the emotional payoff is real and
earned — "*it's very hard to feel behind on something the moment you find out it
took almost two hundred years and a hundred brilliant women to hand it to you*" —
and the facts are sourced and dated. Ep 4's problem is that it is a **good
history episode in a slot that owed a capability.** If it recurs, it recurs as a
declared special, once, and it still owes a ten-minute try-on.

### 2.6 Precisely where Ep 5 deviates

1. **First teaching sentence at 39.8%** vs. Ep 2's 17.2%. Everything before it is
   set-up, saint introduction, and nostalgia.
2. **254 words (11.5%) of pure flashback with zero teaching load** — the
   supermodel digression, §1.3.
3. **The plain teaching sentence arrives at 51.7%** — "*The company makes the
   model; the app is just where you shop it.*" Past halfway.
4. **The useful thing is named and refused.** "*Knowing which line to pull down is
   a genuine skill. It is also its own episode, and it isn't this one.*"
5. **The capability slot is filled with a beige comparison table read aloud.**
   See §7 — this is the most important single failure and the one the spec exists
   to prevent.
6. **No worked example.** Nearest attempt: "*I type the exact kind of thing I'd
   type at home*" — the task is never stated, the prompt is never quoted, the
   output is never shown, no time is measured, nothing is judged.
7. **The try-on produces an observation, not a win:** "*hand them the exact same
   task and read the two answers side by side. Notice how alike they are.*"
   Compare Ep 2: "*Put the two answers side by side. The difference isn't the tool
   getting smarter between tries. It's you getting specific.*" — same shape, but
   Ep 2's ends with the reader having *done something better*.
8. **Synonym pile-up** violating the locked one-term rule (§1.4).
9. **Ends on a realisation.** See §5.

---

## 3. THE WORKED EXAMPLE

Every one of Eps 1–3 contains exactly one, and it is the largest single block.

### 3.1 The three, anatomised

**Ep 1 — the avoided email** (158 w, at 38.8–44.7%):

> "*There was an email I'd been avoiding for four days. You know the kind — the
> delicate one, to the stakeholder who reads tone into line breaks. I opened one
> of the AI tools, and instead of asking it something grand, I just told it the
> truth: who the email was for, what I needed from them, and what I couldn't say
> out loud. It gave me a draft in nine seconds. And it was... eighty percent
> right. The other twenty percent was wrong in ways only I could see — which, it
> turns out, is the good news. I fixed it with my own judgment. I hit send. And
> then I looked at the clock. Four days of dread. Eleven minutes of work.*"

**Ep 2 — the twelve-page policy** (424 w, at 47.5–65.6%). The lazy ask, quoted:

> "*'summarize this policy change for my stakeholders.' And back comes…
> everything. A wall of text — accurate, thorough, and completely useless in the
> two minutes you've got… all weighted exactly the same, because it can't tell
> what matters to you from what doesn't.*"

The good brief, quoted **verbatim and copyable**:

> "*'Summarize this for six senior managers who have two minutes before a
> meeting. Tell them what's changing, when it takes effect, what their teams
> actually do differently, and whether it touches budget. Cut the backstory.
> Bullets — about a hundred and fifty words. And here's last quarter's summary
> that landed — match it.'*"

And the payoff detail, which is the entire point of the episode:

> "*buried in one of them — a line you would never have caught skimming twelve
> pages in two minutes: contractors are exempt until the new year, so your vendor
> team is on a different clock. That one line is the whole reason you opened AI…
> That's not a writing job; it's a reading job.*"

**Ep 3 — the phantom approval** (opened at 3.4%, closed at 77.7%). The failure:

> "*The draft said the client had 'approved' a July rollout… What we actually
> said was 'July could work, if procurement clears by Friday.' The machine took a
> maybe... and gave it a lanyard.*"

The re-run, with the fixed prompt:

> "*Instead of 'clean up these notes,' I pasted the notes and said: summarize only
> what's here, mark anything we didn't actually decide as 'pending,' and show me
> the line behind every claim. Same nine seconds — no phantom July approval,
> because I never left a gap for the machine to fill.*"

### 3.2 What a good one MUST contain

A worked example is not an anecdote. It is a demonstration with receipts. Eight
required components — Eps 1–3 hit all eight between them:

1. **ONE real task with a stake the reader already feels.** A dreaded email, a
   meeting in two hours, a client update going out under her name. Not "a task."
2. **A place and a clock.** "*a Sunday morning at the Blend and Snap — my corner
   table, an oat latte going cold, the radio on low — fifteen quiet minutes.*"
3. **The ask, quoted.** Actual words, in quotation marks, copy-pasteable. Both
   the bad version and the good version where the lesson is a contrast.
4. **The output, judged honestly, with a number.** "*eighty percent right.*"
   Never "it was amazing." The honesty is the credibility.
5. **A specific payoff detail that generic writing could not have produced.**
   The contractor carve-out. The phantom "approved." The 20% only she can see.
   **This is the load-bearing component and the one most often missing.**
6. **The time arithmetic, both sides.** "*Four days of dread. Eleven minutes of
   work.*" / "*Ninety seconds to write, forty-five to check.*"
7. **The residue that stays hers.** "*I fixed it with my own judgment.*" The
   reader must finish the example still holding the professional authority.
8. **The named principle it proves, in plain words.** "*That's not a writing job;
   it's a reading job.*" / "*The thing stopping me was never ability.*"

### 3.3 The forbidden substitutes

- **A hypothetical with no content.** Ep 5: "*I type the exact kind of thing I'd
  type at home.*" What kind of thing? Unanswered.
- **A tour of a category.** Ep 5's four-line roster.
- **A biography.** Ep 4's vignettes are excellent history and are not
  demonstrations; nothing in them is something the reader does.
- **A perfect result.** If the AI got it 100% right, the example is a lie and the
  reader loses her role in the loop.

---

## 4. THE HUMOUR

### 4.1 Where the jokes sit (structurally)

Seven positions, all evidenced. This is a placement map, not a quota.

**Position 1 — In the cold open, as the *evidence* for the thesis.**
> "*Steve works in revenue operations. Steve has never once refilled the printer.
> And Steve has just presented a competitive analysis — clean, confident,
> suspiciously well-formatted — that everyone in that room knows took him about an
> hour, because at lunch he was playing pickleball. [dry] I know because he told
> us. Twice.*"

The printer and the pickleball *are* the argument: he did less and got more. Cut
the jokes and you cut the premise.

**Position 2 — Clearing the ground: dismissing the wrong alternative.**
> "*Everything I found was either written by men in fleece vests — [dry] say no
> more — or so surface-level it basically amounted to 'AI is transformative!' AI
> is transformative? [dry, sarcasm, deadpan] Groundbreaking.*"

Establishes shared taste in nineteen words. The reader now trusts the narrator's
standards, which is what buys the next 2,500 words.

**Position 3 — Riding *on* the teaching sentence. The best ones. The image and
the diagnosis are the same words.**
> "*The machine took a maybe... and gave it a lanyard.*"
> "*It reads like a motivational poster that went to business school and came back
> worse.*"
> "*Last year's pricing page wearing this year's lip gloss.*"
> "*A draft is an outfit. A claim is an alibi. Dress accordingly.*"

**Position 4 — The deflating aside immediately after a statistic or a serious
beat**, so the receipt lands without going solemn.
> "*And KPMG — [dry] one of the Big Four accounting firms, the serious-suit
> people — had to pull an AI report after someone checked its sources and found
> forty of the forty-five were made up. Forty of forty-five. Big Four. Tiny
> receipt drawer.*"

**Position 5 — Self-deprecation that protects the narrator's peer status.**
> "*Now — I want to be clear. I am no AI slayer. [wry] There's no Watcher guiding
> me through some prophecy, no training montage that happened off-screen. I'm
> still learning, still getting things wrong, still googling things mid-
> conversation.*"
> "*And yes, full confession: I had AI write that cooking description for me,
> because I do not cook.*"

**Position 6 — The pre-emptive strike on the reader's objection**, one line,
before she can raise it.
> "*So the question is never 'can I use AI?' [dry] Yes. Use it. We are not here
> to churn butter by candlelight.*"
> "*Now — before someone in the back adjusts a butterfly clip and says, 'but the
> tools are getting better' — [warm] yes. They are.*"

**Position 7 — The register break / callback**, one to three words.
> "*Regina George energy. But make it AI.*" · "*get in loser.*" · "*Godmother.
> Not godfather.*" · "*...Write that one down.*"

### 4.2 What they are made of

1. **A specific workplace object where an abstraction was expected** — the
   printer, the pickleball, the drafts folder, the lanyard, the Claire's headband,
   the butterfly clip, the twenty bucks at HMV.
2. **A corporate phrase quoted exactly, then killed** — "*'Leverage synergies.'
   'Drive alignment.' 'Circle back to maximize stakeholder buy-in.'*"
3. **A pop reference pinned to a *plot beat*, never to a character in general** —
   not "Elle Woods energy" but the perm timeline; not "Mean Girls vibes" but the
   super-jumbo tampons.
4. **A hard concrete noun where a soft one belonged** — a maybe gets *a lanyard*;
   a claim without support *showed up at Spring Fling with no student ID*.
5. **A true thing said flatly** — "*It was not solved by the end of the summer.*"
6. **Timing acknowledged as a wound** — "*(Wait... Decades? Ooff. That is a
   jagged little pill to swallow, isn't it...)*"

### 4.3 Why the best ones land

- **"The machine took a maybe... and gave it a lanyard."** A lanyard is
  *credentialing*. The joke names the actual mechanism — unearned status conferred
  on unsupported content — so remembering the joke is remembering the lesson.
- **"That's not imposter syndrome. That's pattern recognition. Which is ironic,
  given what AI actually is — but we'll get there."** The punchline is a
  *definition*, and it plants the episode's own subject. Two jobs, one clause.
- **"It reads like a motivational poster that went to business school and came
  back worse."** Diagnoses the exact signature of an underspecified prompt —
  generic, inflated, confident — in one image.
- **"A clue in a Claire's headband, sprinting straight to a conclusion. One data
  point. No context. Enormous conclusion."** The joke and the QC rule are the
  same sentence; the second half is a checklist.
- **"We are not here to churn butter by candlelight."** Kills the reader's
  suspicion that this is an anti-AI lecture, in nine words, so the caution that
  follows is trusted.
- **"Steve has never once refilled the printer."** The most efficient piece of
  characterisation in the corpus, and it is the whole thesis.

### 4.4 The rule the failures break

**The joke's subject must be her work, the machine's failure, or the corporate
absurdity around them — never the analogy's own set dressing.**

Ep 5's jokes are almost all *about the metaphor*: Linda Evangelista's day rate,
George Michael's video, Samantha working every room, "*Familiar face. Different
runway.*" They are jokes about supermodels, not jokes about AI or about Tuesday.
That is why the funniest-sounding episode in the corpus produced Ali's verdict:
"*20 minutes of dribble with 1 mildly amusing line.*"

Ep 4's jokes are mostly about history's injustice — "*Godmother. Not godfather.*",
"*The most beautiful woman in the world — and nobody heard a single word she
said.*" These are excellent and they serve the episode's actual point. They just
don't serve a *lesson*, because the episode has none.

And from the writing-lock, applied here:

> "*Do not add a joke just to make a beige paragraph seem branded. Fix the
> paragraph.*"

---

## 5. THE TAKEAWAY SHAPE

### 5.1 What Eps 1–3 leave her able to DO

| | "So remember, ladies…" | The try-on | Capability acquired |
|---|---|---|---|
| **Ep 1** | "*you'll need more than a cup of ambition… this series comes in small sips*" — and the operative instruction sits just above: "*use AI for its superhuman range and speed, hand it your real context, and keep your own judgment on the 20% only you can see*" | "*open the three big tools… give all three the same small, real task… And in every draft, notice the twenty percent only you can see.*" | **She can start, on a real task, and she knows what her job in the loop is.** |
| **Ep 2** | "*AI can't read your mind — so tell it what you want... what you really, really want.*" | "*hand one real task to an AI tool twice. First the lazy way… Then the David Rose way: who it's for, what they care about, the tone, the length, and what to leave out.*" | **She can write a brief.** |
| **Ep 3** | "*AI can write like Regina George. You still need to check like Elle Woods.*" (article: "*Do not be Chutney on the stand. Be Elle with the timeline.*") | "*take one real answer from an AI tool… and verify three claims before it borrows your name.*" | **She can verify.** |

Three properties, all three times:

1. **The closing line is an imperative or a rule of thumb** — something you can
   obey. "*Tell it what you want.*" "*Be Elle with the timeline.*"
2. **The try-on is bounded, timed, and pointed at a real thing** — "*Ten minutes,
   not homework*", and always on work she actually has.
3. **The reader ends holding a move she did not have at 0:00.**

### 5.2 Ep 4 and Ep 5

- **Ep 4:** "*you were never behind on AI. You were just never told it was
  yours.*" A **feeling** — a good one, honestly earned by the episode — plus a
  field trip. Nothing to obey, nothing to do at her desk.
- **Ep 5:** "*there was never one best AI, and you were never behind.*" A
  **realisation.** It resolves a misconception she may not have had, and it hands
  her nothing. Its try-on asks her to *notice a similarity*.

The diagnostic question, applied to any draft:

> **After the last line, what can she DO on Wednesday that she couldn't do on
> Tuesday? Write it as a verb phrase. If you can only write a noun phrase
> ("she understands that…", "she knows there's no…"), the episode has not
> landed.**

Ep 1: *brief it with real context and keep the 20%.* Ep 2: *write a brief.*
Ep 3: *sort draft from claim, and demand the line.* Ep 4: *— nothing.*
Ep 5: *— nothing.*

---

## 6. THE DRAFTING SPEC

*This is the deliverable. It is written to be pasted into an agent prompt.*

---

### YOU ARE DRAFTING A LAiDIES EPISODE

Read first, every time, no exceptions:
`content/episodes/episode-NN.canon.md` (source of truth) ·
`operations/voice/laidies-writing-lock.md` (voice) ·
`operations/the-mall-inventory-plan.md` (what analogies may be grounded in) ·
this file. Drafting "cold" from memory is how Ep 5 broke.

**Setting: permanently 1999. Canadian English. The AI is always "it" — never
"she", "her", or "a woman."** Only real humans get she/her: the saints, the
MAiVENS, the heroine, the listener. The narrator is **the heroine**, never named
on-mic.

---

#### STEP 0 — SUBSTANCE BEFORE PROSE (gate; do not skip)

Before writing a single line of script, write these five items as plain notes
and get them approved:

1. **The capability.** One verb phrase: what she can DO after this episode that
   she couldn't before.
2. **The plain teaching sentence.** The shortest true sentence that carries it,
   written exactly as you'd say it to a smart friend in chat. Ep 2's:
   *"It wasn't the tool that changed. It was me: what I'd typed."*
3. **The worked example**, in note form: the task, the ask, what came back, the
   payoff detail, the time arithmetic.
4. **The decision rule** — if the episode involves choosing between things, the
   *if X then Y* line. Ali's own model of the right shape:
   > *"Two-line email → ChatGPT. The contract where one missed clause costs you → Claude."*
5. **The analogy**, and its **strip test result** (§1.4).

Ali's locked process note: "*substance-first — write the plain, correct,
genuinely-useful … as notes; Ali confirms it's useful; only THEN write prose.
The failure has always been prose before the useful substance was nailed.*"

---

#### STEP 1 — THE SKELETON (word budget, 2,350–2,700 total)

```
  0–  3.5%   ANNOUNCER: "Previously, on ladies…" (last week's capability, one clause)
             + "And on this episode:" (THIS week's FAILURE, not this week's topic)

  4 –  9%    COLD OPEN. A timestamped scene at her desk where something went wrong.
             Open with a clock. "It's nine-fifteen on a Tuesday, and I am losing a
             staring contest with a paragraph."

  ~9%        "And I couldn't help but wonder…" — ONE sentence. The question the
             core teaching will answer. Write the answer first; invert it.

 12 – 15%    Welcome + last-week bridge. ≤120 words. Ep 2 does it in 76.

 17 – 21%    TOWN LOCATION #1. The location does a job: café = think it through;
             LIBRAiRY = get the proof; NewsStand = true vs. plausible;
             Bronze AiGE = the question gets asked out loud.

 ≤ 25%       FIRST TEACHING SENTENCE, PLAIN. Then, and only then, the analogy.

 25 – 45%    Build the model. Analogy carries; one term per concept; plain first.

 40 – 66%    THE WORKED EXAMPLE. Largest block in the episode (150–425 words).
             All eight components (§3.2).

 66 – 78%    THE METHOD (copy-pasteable) + THE EVIDENCE (stat with source + year,
             placed as confirmation of what she already believes) + TOWN #2.

 78 – 86%    COCKTAIL PARTY EXPLANATION. The compressed model, one line,
             then "so let me show you why."

 86 – 95%    "And… that's the episode." → THE TRY-ON: ten minutes, not homework,
             a real task at her desk. → town extras (quiz, KSVL 99.9, Blend &
             Snap study pack, MAiKEOVER residence card).

 95 – 98%    "So remember, ladies…" — AN INSTRUCTION.

 98 – 100%   "Next time on ladies…" — tease next week's FAILURE.
```

---

#### STEP 2 — THE ANALOGY GATE

An analogy ships only if it clears all four:

1. **Funny or familiar.**
2. **Makes the concept clearer** — and specifically enough that a reader who
   half-remembers the reference still learns the thing.
3. **JOB 3: you can reason FROM it.** Ask it a question the script never asked.
   If it answers correctly, it's a model. If it goes silent, it's a costume.
4. **STRIP TEST.** Delete it, write the teaching plainly. Structure left →
   keep the analogy. One sentence left → keep the sentence, cut the analogy to
   one line, spend the reclaimed words on the capability.

Plus: **grounded in the Mall / town canon** — the reader can go visit it. If it
isn't in the Mall, add it to the Mall.
Plus: **one term per concept.** Not supermodel *and* face *and* star *and* poster.
Plus: **the saint must match her locked theme.** Cher = make it yours. David =
specificity. Elle = receipts. Samantha = orientation. Miranda = standards.
Do not blur them.

---

#### STEP 3 — WRITE THE JOKES INTO THE ARGUMENT

Place jokes at the seven positions in §4.1. Build them from the six materials in
§4.2. Then check every one:

- Is its subject **her work, the machine's failure, or corporate absurdity**?
  If its subject is the analogy's own set dressing, cut it.
- If you deleted it, would the paragraph lose an *argument* or just some
  *sparkle*? If sparkle only, the paragraph is beige. **Fix the paragraph.**
- Best case: the joke and the diagnosis are the same words. Aim there.

---

#### STEP 4 — THE FORBIDDEN THINGS (with counter-examples)

**① NEVER: a product-comparison table, in prose or otherwise.** This is the
single most important prohibition. See §7 — it has already happened once.

> ❌ Ep 5: "*There's the big all-rounder, the store most people start in, great
> for drafting and thinking out loud. There's the careful one — the one you reach
> for when it's code, or delicate writing that has to land exactly right… There's
> the one wired into your day… And there's the one from work.*"

That is a four-column table read aloud with the names deleted. Ali: "*The 4-line
roster is a list, not teaching — it describes a floor plan instead of telling her
what to reach for and why.*"

> ✅ The shape that is allowed — a named decision rule with a trigger:
> "*Two-line email → ChatGPT. The contract where one missed clause costs you →
> Claude.*"

**② NEVER promise a map and not hand it over.**

> ❌ Ep 4: "*With AI, nobody has handed you that map yet.*" — then no map.

**③ NEVER raise a two-job analogy in order to decline to use it.**

> ❌ Ep 5: "*Knowing which line to pull down is a genuine skill. It is also its
> own episode, and it isn't this one.*"

**④ NEVER spend more than ~40 words of nostalgia that teaches nothing.**

> ❌ Ep 5's 254-word supermodel flashback. Delightful, and it taught nothing
> about AI.

**⑤ NEVER end on a realisation.**

> ❌ Ep 5: "*there was never one best AI.*" ❌ Ep 4: "*you were never behind.*"
> ✅ Ep 2: "*tell it what you want... what you really, really want.*"
> ✅ Ep 3: "*Be Elle with the timeline.*"

**⑥ NEVER let the metaphor build a second vocabulary.**

> ❌ Ep 5: house / line / star / face / poster / boutique / store / shop /
> storefront / counter / rack / window.

**⑦ NEVER cut the try-on.**

> ❌ Ep 4: "*No try-on task this week — a field trip.*"

**⑧ NEVER use a hypothetical where a worked example belongs.**

> ❌ Ep 5: "*I type the exact kind of thing I'd type at home.*"
> ✅ Ep 1: "*I just told it the truth: who the email was for, what I needed from
> them, and what I couldn't say out loud… eighty percent right.*"

**⑨ Inherited hard bans** (from the writing-lock and memory, still live):
no "the whole X" · no hype or fake revelations · no false-exclusivity hooks
("the thing nobody tells you") · no deficit framing about women · no
meta-brand commentary · **AI is "it"** · **"AI" is capitalised, never "Ai"**
(the accented i is brand words only) · every stat carries source + year and gets
re-verified · **Gmail is not work email — offices run Outlook** · never say
people "argue about the version number"; they argue about which model is better.

---

#### STEP 5 — SELF-CHECK BEFORE HANDING OVER

1. **Verb-phrase test.** What can she DO on Wednesday that she couldn't Tuesday?
   Write it as a verb phrase. Noun phrase only → not shipped.
2. **Question-answer test.** Does the *core teaching* answer the "*I couldn't
   help but wonder*" question — or does a bolted-on side-metaphor answer it?
3. **Middle-third test.** Read words 33–67%. Are they about the reader's work, or
   about the show's world?
4. **Plain-chat test.** Write the lesson as you'd say it in chat. Is the chat
   version clearer than the script? Then **the script is wrong** — flatten it.
5. **Strip test** on the analogy (§1.4).
6. **Beige-table test** (§7).
7. **Joke-subject test** (§4.4).
8. **Worked-example test:** all eight components of §3.2 present?
9. **Time-to-first-teaching:** is the first plain teaching sentence at or before
   25% of total words?
10. **Grounding:** is every analogy visitable in town?

Ali's standing warning, and the reason step 0 exists:

> "*the review gate can catch tells/facts/structure but cannot judge 'is this
> genuinely useful to our reader' — that is ONLY Ali's call. Do NOT treat
> gate-SHIP as the usefulness bar.*"

---

## 7. THE BEIGE-TABLE TEST

**Ali is allergic to generic AI-explainer output. If this spec would permit a
beige product-comparison table, the spec is wrong. So here is the test, stated
so it cannot be wriggled out of.**

The failure has already happened once, in prose, disguised as voice. Ep 5's
capability slot contains this:

> "*There's the big all-rounder, the store most people start in, great for
> drafting and thinking out loud. There's the careful one — the one you reach for
> when it's code, or delicate writing that has to land exactly right, or a
> fifty-page document you paste in whole and need actually read. There's the one
> wired into your day — it lives where your email and your calendar already are…
> And there's the one from work, sitting right inside the Office apps you already
> live in. [dry] Same four names everyone argues about. Different lanes. [knowing]
> Not a fight. A floor plan.*"

Strip the "[dry]" and the "[knowing]" and that is a comparison table: four rows,
one "best for" column, names withheld. It has voice. It has a nice closing
epigram. It teaches nothing, because a reader cannot act on "*the careful one*"
without knowing which one that is.

**THE TEST.** Take any passage that describes two or more tools, models, methods,
or options. Ask:

1. **Could it be rendered as a table with no loss?** If yes → beige. Rewrite.
2. **Is there an if/then with a named trigger and a named answer?** If no →
   beige. Rewrite.
3. **Does it name names?** Vague-by-design ("the careful one") is worse than a
   table, not better — it is a table that also withholds the data.
4. **Is there a worked example downstream of the comparison** in which the choice
   is actually made, on a real task, with a consequence? If no → beige.

**The allowed form**, from Ali's own correction:

> "*ChatGPT is the eager one — fast, confident, hands you a lot; your default.
> Claude is the careful one — it actually reads the whole sixty pages instead of
> skimming, and tells you the part that's wrong instead of just pleasing you.
> Two-line email → ChatGPT. The contract where one missed clause costs you →
> Claude.*"

Named. Characterised by behaviour she'll recognise when she sees it. And it ends
in a **decision rule with a trigger** — the thing a table can never contain.

**And the proof this is achievable in-voice, from Ep 1, 26 words:**

> "*ChatGPT, Claude, and Gemini are the magazines; the models are their
> editors-in-chief — different taste, different judgment, different style. Same
> brief, wildly different results.*"

Followed immediately by a try-on that makes her go and *observe* the difference
herself. That is a comparison that is not a table: it names the axis (taste,
judgment, style), makes a testable prediction, and hands her the test.

---

## 8. CALIBRATION ANCHORS

Few-shot calibration set for an automated reviewer. Six dimensions. For each: a
PASS quoted from Eps 1–3 and a FAIL quoted from Ep 4/5, with the reasoning that
puts each where it is. Score each dimension 1–5; **any dimension at ≤2 blocks the
draft.**

---

### D1 · ANALOGY IS LOAD-BEARING

**PASS — Ep 1 (5/5)**
> "*It's the most talented new hire you'll ever manage. [beat] That's it… A
> brilliant new hire has read everything: books, articles, forums, manuals,
> billions of documents… And it has lived nothing: no job, no relationships, no
> consequences, not one awkward moment at a holiday party that taught it
> something about people… That's where you come in. You don't hand it the keys —
> you onboard it. You give it guidance and guardrails, the lay of the land around
> the office. You manage it, and you review its work. [knowing] And you've done
> this all before.*"

*Why 5:* clears all three jobs. Job 3 decisively — two subsequent episodes are
*deduced* from it without re-explaining it ("*briefing it like a smart new hire in
her first week*", Ep 2; "*You still read it, you still check the citations*",
Ep 3). It survives the strip test: "*It read everything. It's lived nothing. And
it never says 'I don't know.'*" is still a complete teaching. It also does
something rare — it converts the reader's existing seniority into AI competence,
which is the show's whole thesis in one image.

**FAIL — Ep 5 (2/5)**
> "*Every AI company is a fashion house. OpenAI is a house. Anthropic is a house.
> Google is a house. And what each house actually makes — the thing everyone means
> when they say 'a model' — is a supermodel. A specific, named, trained-up star.
> She's got a name and a number, she's got a look, and every season the house
> debuts a newer one.*"

*Why 2 and not 1:* it is funny, it is on-canon-era, and it carries one true and
useful distinction (company ≠ app). *Why it fails:* it cannot be reasoned from —
ask it "which one for the fifty-page contract?" or "why does it make things up?"
and it is silent. It fails the strip test: what remains is one sentence
("*OpenAI makes the models; ChatGPT is the app you open them in*"), not a
structure. And it spawns a translation vocabulary — *house / line / star / face /
poster / boutique / store / storefront / counter* — violating the locked
one-term-per-concept rule. **Also note "she's got a name" — the AI-is-"it" rule,
broken by the metaphor itself.** An analogy that forces a canon violation is
disqualified regardless of score.

---

### D2 · WORKED EXAMPLE

**PASS — Ep 2 (5/5)**
> "*'Summarize this for six senior managers who have two minutes before a meeting.
> Tell them what's changing, when it takes effect, what their teams actually do
> differently, and whether it touches budget. Cut the backstory. Bullets — about a
> hundred and fifty words. And here's last quarter's summary that landed — match
> it.' … And buried in one of them — a line you would never have caught skimming
> twelve pages in two minutes: contractors are exempt until the new year, so your
> vendor team is on a different clock. [pointed] That one line is the whole reason
> you opened AI… That's not a writing job; it's a reading job… Ninety seconds to
> write, forty-five to check.*"

*Why 5:* all eight components of §3.2. The ask is verbatim and copyable. The
payoff detail is specific enough to be checkable and could not have come from
generic writing. The time arithmetic is on both sides. And it lands a principle
the reader can carry to unrelated tasks — *reading job, not writing job.*

**FAIL — Ep 5 (1/5)**
> "*So I open it, first time in my life, and I type the exact kind of thing I'd
> type at home. And it answers me... [beat] like it already knows me. Same rhythm.
> Same tidy little bullet points.*"

*Why 1:* no task, no prompt, no output, no judgment, no number, no time, no
payoff detail. "*the exact kind of thing*" is the exact opposite of exact. Zero
of eight components. This is the entire concrete content of a 2,205-word episode.

---

### D3 · TIME-TO-VALUE / STRUCTURE

**PASS — Ep 2 (5/5)** — first teaching sentence at **17.2%**:
> "*I pulled them both back up — the word-salad talking points from that morning,
> and the director update I'd barely had to touch the day before — and set them
> side by side. [pointed] It wasn't the tool that changed between the two. It was
> me: what I'd typed to get each one. Because here's the punchline, and it took me
> an embarrassingly long time to see it: AI can't read your mind.*"

*Why 5:* 400 words in, the reader already has the thesis, and it is stated in
plain words *before* any analogy arrives (the café follows at 25.5%). The
sentence is a direct inversion of the cold-open question asked 300 words earlier.
Setup did not exceed a fifth of the episode.

**FAIL — Ep 5 (2/5)** — first teaching at **39.8%**, preceded by:
> "*But before Samantha walks us the page — close your eyes and come back with me
> a second. [measured] It's the nineties. And there's this thing happening that
> had genuinely never happened before… You didn't know who designed the dress. You
> knew her. Cindy. Naomi. Linda. Christy. Claudia. Kate.*"

*Why 2:* 254 words of set dressing sit between the reader and her first useful
sentence, and the plain version of the teaching ("*The company makes the model;
the app is just where you shop it*") does not arrive until 51.7% — past the
midpoint. A busy reader who quits at ten minutes has learned nothing. Not a 1,
because the prose is good and the episode does eventually teach.

---

### D4 · HUMOUR SERVES THE LESSON

**PASS — Ep 3 (5/5)**
> "*And the sneakiest one isn't fake at all. It's real information in the wrong
> place. It brought the wrong ID and somehow made it past the door. A U.S. HR
> answer in a Canadian workplace. Last year's pricing page wearing this year's lip
> gloss. 'We talked about it' quietly promoted to 'we decided.' … [knowing] That's
> the moment you stand up in the back, in your blue hoodie, strings pulled tight,
> and your oversized sunglasses, and you shout: 'SHE DOESN'T EVEN GO HERE!'*"

*Why 5:* the jokes *are* the taxonomy. "Wrong ID past the door", "wearing this
year's lip gloss", "quietly promoted" each name a distinct failure mode that has
no good plain-English name, and the punchline converts into a literal check:
*whose country, whose year, whose client?* Delete the humour and you delete the
content.

**FAIL — Ep 5 (2/5)**
> "*Linda Evangelista tells a magazine, out loud, that she doesn't get out of bed
> for less than ten thousand dollars a day — and somehow that makes her more
> beloved, not less. George Michael stacks a lineup of them into a single music
> video, lip-syncing 'Freedom,' and it out-icons most actual bands.*"

*Why 2:* genuinely charming, genuinely on-era, and its subject is **the analogy's
own set dressing**. Nothing about AI, her work, or corporate absurdity. Deleting
it costs the episode zero argument. This is the writing-lock's "*Do not add a joke
just to make a beige paragraph seem branded*" in its most seductive form — the
jokes are good, which is exactly why they got kept.

---

### D5 · TAKEAWAY IS A CAPABILITY

**PASS — Ep 3 (5/5)**
> "*[dry] That's Prompt Like Elle: hand her the file, let her say 'I don't know,'
> make her show the line.*" … "*This week: take one real answer from an AI tool —
> a meeting recap, a summary of a public page, a draft reply — and verify three
> claims before it borrows your name.*" … "*So remember, ladies: AI can write like
> Regina George. [smirk] You still need to check like Elle Woods.*"

*Why 5:* three named, ordered, copy-pasteable moves; a bounded ten-minute task on
real work with a stated count (three claims); and a closing line that is an
instruction. Verb phrase: **she can verify a claim.**

**FAIL — Ep 5 (1/5)**
> "*So remember, ladies: there was never one best AI, and you were never behind.
> [smirk] The company makes the model; you just have to know which store you
> walked into.*" … try-on: "*hand them the exact same task and read the two
> answers side by side. [smile] Notice how alike they are.*"

*Why 1:* the closing line is a realisation about a misconception, and the
assignment asks her to *notice a similarity*. No verb phrase exists. Ali's audit:
"*The reader finishes still not knowing why she'd use Claude over ChatGPT.*"

---

### D6 · PLAIN TEACHING LEADS; ANALOGY GARNISHES

**PASS — Ep 1 (5/5)**
> "*Limit one: it does not know your context until you hand it over. It's Cher's
> closet computer from Clueless: endless outfit combinations, all day long — but
> it has no idea the meeting is with a conservative client who is already looking
> for reasons to dismiss you... unless you tell it. Remember my email? I told it
> the truth about who it was for, and it used every word of that. The context
> lives with you.*"

*Why 5:* exact order — **plain mechanic first** ("*it does not know your context
until you hand it over*"), analogy second, **worked example third**, plain
restatement fourth ("*The context lives with you*"). One term for the concept:
*context*. The analogy carries specific detail (the hostile client) rather than
gesturing, satisfying the Analogy Depth Rule. A reader who has never seen
*Clueless* loses nothing.

**FAIL — Ep 5 (2/5)**
> "*The wall of logos gets easier the moment Samantha separates the face from the
> storefront: The company makes the model; the app is just where you shop it. The
> supermodel is the model. The app is the boutique. ChatGPT is OpenAI's flagship
> store — the boutique where you shop their stars, and pick the one the occasion
> calls for.*"

*Why 2:* the plain sentence is in there and it is good — but it is buried at
51.7%, framed by the metaphor on both sides, and immediately re-encoded into
*face / storefront / supermodel / boutique / store / stars*, so the listener must
translate mid-sentence. This is the passage Ali was describing when she said "*the
way we laid it out in chat is much clearer than what's coming out in the
article.*" By the locked rule, when that is true, **the script is wrong.**

---

## 9. QUICK REFERENCE CARD

```
CAPABILITY, not realisation.        Verb phrase or it didn't ship.
PLAIN FIRST, analogy second,        Chat-clear beats script-clever.
  worked example third.
FIRST TEACHING BY 25%.              Ep2 did it at 17%. Ep5 at 40% and died.
ONE WORKED EXAMPLE, BIGGEST BLOCK.  Task · quoted ask · honest % · payoff
                                      detail · time both sides · her 20%.
ANALOGY MUST SURVIVE THE STRIP TEST.  Structure left = handle. One sentence
                                      left = costume.
JOKES ABOUT HER WORK.               Not about the metaphor's set dressing.
2–3 TOWN LOCATIONS, EACH A JOB.     Not one stage for a monologue.
NO TABLES, NAMED OR UNNAMED.        Decision rule with a trigger, or nothing.
THE OPENING QUESTION IS ANSWERED    Not by a side-metaphor at 67%.
  BY THE CORE TEACHING.
TRY-ON ALWAYS. TEN MINUTES.         Real task at her desk. Never a field trip.
AI IS "IT". "AI" IS CAPITALISED.    1999. Canadian English.
```
