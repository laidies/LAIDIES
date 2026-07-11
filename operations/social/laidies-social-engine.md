# The LAiDIES Social Engine
*Reels + posts + stories, generated from the site, smart-viral, never cringe, fact-gated.*
**v1 · 2026-07-10**

---

## Non-negotiable: the voice (this is what keeps it off the cringe pile)

Every post is written in the LAiDIES register — **dry, smart, culturally fluent, confident**. Carrie Bradshaw / Cher Horowitz / SATC, not hustle-marketer. The value does the pulling; we never beg.

**Banned outright (the voice gate kills these before posting):**
- "STOP SCROLLING," "wait for it," "you won't believe"
- "link in bio!!!", any begging CTA, exclamation-point hustle
- "the ONE trick nobody tells you," "the move nobody makes," any false-exclusivity hook
- emoji-as-punctuation / emoji spam (🚨👀🤯🔥), "comment X and I'll DM you" engagement-bait
- "unlock," "level up," "game-changer," "in today's fast-paced world," "let's dive in," "the girlies," "here's the tea"
- **tech-bro cringe:** "disrupt," "10x," "ship it," "GM," "build in public," "founder mode," "cracked," "we're so back," "it's over," "cooked," "moat," "hot take," "unpopular opinion:," "here's what everyone gets wrong about AI," rocket/fire-emoji hype, any explaining-AI-to-the-women energy

**The CTA is quiet.** The link sits in the caption, unhyped. The wit earns the click. If a post needs a scream to work, the post is wrong.

**The reference well — jokes just for us.** The humor comes from *our* shared culture, landed on the AI point — never generic, never nostalgia-for-its-own-sake. Draw from:
- **90s/Y2K girlhood:** AIM away messages, Cosmo/Seventeen quizzes, Trapper Keepers, gel pens, burned mixtapes, dial-up, butterfly clips, Delia*s catalogs, note-passing, Girl Talk / Dream Phone, the Baby-Sitters Club, Blockbuster.
- **The chick-flick canon** (the saints' films): Clueless, Legally Blonde, Prada, Mean Girls, Sister Act, SATC, Buffy.
- **The town's own in-jokes:** Deb saying "Nope," KSVL's fictional bands, Mme CLAi-O, the Businesswomen's Special.

**Construction:** take a thing *we* all know and land the AI point on it — "a vague prompt is an AIM away message," "AI making up a source is the group-project girl who swore she did the reading." **The heuristic: if a man in a quarter-zip would post it, it's wrong.**

---

## Three formats, three jobs

| Format | Optimizes for | Made by |
|---|---|---|
| **Reels** | reach / new audience | Creatomate (template→MP4) + ElevenLabs town voice + your art + burned captions |
| **Carousels / posts** | saves / authority | Bannerbear carousel templates + Claude copy |
| **Stories** | retention / funnel | Bannerbear story templates + link stickers → site; polls/quizzes |

Ayrshare publishes all three to IG + LinkedIn.

---

## The recipe library (endless posts from your site)

Each recipe pulls real entities from `site-index.json` + the canon + the **verified fact base**:

1. **Saint × Concept** — "What does {saint} have to do with {AI idea}?" (12 saints × dozens of concepts = hundreds)
2. **Did-You-Know** — a genuinely surprising true thing (verified-only; carries a source)
3. **Maven spotlight** — a woman who built AI before it was cool
4. **Myth vs. fact** — one clean correction
5. **This week in SUNNYVAiLE** — the Wednesday episode teaser
6. **Quotable** — a funny line from an episode
7. **Relatable / POV** — the AI-at-work experience, dry ("'Just use AI' is not instructions")

**World / SUNNYVAiLE recipes** (the town itself — usually the *most* shareable, because it's novel and nobody else has it):
8. **Building spotlight** — one building, its charm + what it teaches (KSVL, the video store, the bar, the LIBRAiRY…)
9. **Character / lore** — Mayor Deb, Mme CLAi-O, the FAiRY Godmother, DJ SunnyV, Miss Jeeves — the funny backstories
10. **Episode teaser / quotable** — this Wednesday's drop, a great line, "previously on ladies"
11. **World invitation** — the big hook: "there's a whole town, and it's set in 1999"
12. **A day in SUNNYVAiLE** — the town-as-experience / the weekly tour
13. **Mechanic** — the Residence Card, the charm hunt, trading cards, Dream Phone, Girl Talk

## The hook shapes (viral, in-voice)

Curiosity earned by a *smart line*, not a scream:
- The flat reveal: *"The first computer bug was an actual bug."*
- The dry reframe: *"'Just use AI' is like 'just use the internet.' To do what?"*
- The correction: *"Your work AI isn't spying on you. It's worse — it's the same one you use at home."*
- The list promise: *"Four women built the thing your CEO thinks is new."*

Claude writes **3–5 hook variants** per idea; the feedback loop (IG Insights via Ayrshare + Plausible) surfaces the winners → the generator makes more of what actually gets saved/shared.

---

## The two gates (nothing posts without passing)

- **Fact gate** — every real-world factual claim traces to a verified source or is cut. No confident-wrong posts, ever.
- **Canon gate** (for world/lore posts) — SUNNYVAiLE content is *fiction*, so it's checked against the **canon** (writing-lock, street layout, character backstories), not the web. Right building number, right character story. And a taste line: play the 1999 bit charmingly, but never literally deceive — it's understood as a stylized town, not a real FM station.
- **Voice gate** — kills anything on the banned list above. Cringe can't publish.

---

## Tool stack + daily flow

- **Brain:** Claude on your existing **GitHub Actions** + `ANTHROPIC_API_KEY`.
- **Video:** Creatomate · **Voice:** ElevenLabs · **Graphics:** Bannerbear · **Publish:** Ayrshare · **Queue:** Airtable · **Feedback:** Plausible + UTM.
- **Flow:** overnight the Action generates the day's Reels/posts/stories from recipes → both gates → Airtable queue → **facts wait for your 2-min tap, the rest auto** → Ayrshare posts 5+/day → analytics feed back.

## The generator's brain (the Claude instruction, ready to wire)

> "You are the LAiDIES social writer. Given a recipe and the real site entity it names, plus the verified fact base, write {format} content in the LAiDIES voice (dry, smart, culturally fluent — Carrie/Cher/SATC). Produce 3–5 hook variants. Obey the banned-cringe list absolutely. Every factual claim must cite a source from the fact base or be cut. End with a quiet CTA + a UTM link to the specific page. Output structured: {format, hooks[], script/slides, caption, hashtags, visual_source, cta_url, facts[]}."

**Semi-manual by platform limit (not our design):** trending audio on Reels (added in-app ~15s for the algo boost); some interactive story stickers (polls/quizzes) tapped in-app. Everything else runs itself.
