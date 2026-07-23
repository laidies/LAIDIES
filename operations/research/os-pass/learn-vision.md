# LEARN pass — The Vision + The Unbuilt

Sources read in full: `LAIDIES/IDEAS.md` and `Website-homepage/operations/research/_learn-memory-digest.md` (the 716-line digest of all 204 memory files). Every claim below is traceable to one of those two files. Where the two disagree, I flag it.

---

## PART 1 — THE VISION, IN PLAIN LANGUAGE

**What LAiDIES is trying to become:** a weekly SHOW you return to inside a place you can walk around — not an article you read once. It teaches AI, from zero, to smart senior professional women who don't have time for a 40-hour course. SUNNYVAiLE is the fictional 1999 town it all lives in. LAiDIES = the brand/who; SUNNYVAiLE = the setting/where. Tagline: "Where girl power meets machine power."

Six things it is reaching for, in Ali's own emphasis:

1. **A returning ritual, not a listicle.** The differentiator vs. googling "how to write prompts" is that this is *a place you come back to every Wednesday*, with owned interactive tools you can't google (above all the FAiRY Godmother "Prompt Glow-Up" — paste your REAL prompt, watch it get rewritten AND learn what was missing). It teaches fluency + judgment through story, pop culture, and a real woman's voice "so it sticks."

2. **A real weekly TV-style show.** Every episode reads as an episode of the same show. A Season = one story (serialized arc, standalone episodes). Podcast-native: audio-complete, nothing requires eyes. Locked recurring beats, locked sign-offs, the heroine (Jessica, internally) as a resident who solves work problems out in town.

3. **A production MACHINE that actually ships weekly** — the "Wednesday Engine." This is Ali's #1 pain: the weekly workflow takes ages and she has *never once hit a Wednesday deadline*. The dream is a closed loop: PRODUCE → SYNC/SHIP-CHECK → MEASURE → ADVISE, one command fanning out ~13 surfaces from a single canon file, grounded in hard image/voice/fact rules, gated by adversarial review, with Ali approving at ~3 gates and NEVER being the bug-catcher.

4. **Retention-first teaching.** The point is helping women LEARN + REMEMBER. Dual-coding (always SHOW the analogy), key-term def-cards on screen, one takeaway per episode, the SONG as the mnemonic, humor/emotion as glue, concept→character anchors. Analogies grounded in the town's Mall inventory.

5. **Real revenue.** Monetization is an explicit priority "not a someday" — the subscriptions and her time cost a lot. The cake = recurring membership + digital products; merch is the cherry that flips on later once there's an audience. Sequence: great content → traffic → Plausible analytics → community + membership tier → merch. Ali connects payment keys; the build scaffolds checkout.

6. **A world that feels like a place, plus a community.** A coherent town (one design system, homepage is the visual bar), rewards that reflect Y2K girlhood (gifting not trading, packs not deterministic cards, charms hidden in images), and eventually a Behind-the-Scenes community knowledge base where other women share AI-production learnings.

**The operating spine (locked):** everything is produced FROM a verified source of truth (canon.md), GATED by adversarial source-checking review, then ships. Ali sets direction and approves; she is never QA of last resort. Nothing teaches stale AI ("the #1 critique of AI communicators"); no fact ships unverified ("not verified beats plausible").

---

## PART 2 — THE UNBUILT, RANKED

Ranking is by Ali's stated urgency + how load-bearing it is to the vision. LOCKED = decided, just not built. OPEN = idea/proposal still needing a call.

### TIER 1 — the things the whole vision waits on

1. **The Wednesday Engine / weekly production machine** — LOCKED as the priority, mostly unbuilt. 5 parts: (1) kickoff orchestrator (one command → all surfaces), (2) **the per-scene image-prompt generator — "the big one,"** prompt reflects the narration playing during that scene, gold standard = Grace scene Ep4, (3) auto social kit, (4) dashboard/control program, (5) analytics (part 5 DONE — Plausible on 106 pages + Clarity). Storyboard-first, human approval gate, reuse on-model frames, master reference sheet. Clean output owed to `operations/wednesday-engine-bible.md`. *This is Ali's #1 pain — "really really really need."*

2. **Videos / animation** — LOCKED direction (comic style, CapCut, animate ONE approved still), "the real gap — none up yet." Image-to-video for episode frames + credits motion. Everything else (the show, the machine) resolves into this.

3. **Monetization surfaces** — LOCKED priority. Membership tier + digital products first. Concrete pieces: membership architecture (Supabase pass, magic-link "letter from the Post Office," auto-merge of localStorage state) is spec'd/Part-C-pending; server-side pack-opening (client-side is a security hole); Mix CD "Burn this CD" paywall UX; KSVL real-product ads. Merch scaffolds (Gift Shop, Book Fair) are DONE and dormant — do NOT push pre-audience.

### TIER 2 — big content/experience gaps

4. **Ep5 "Super Models"** — parked ON PURPOSE to be the engine's first real run. Prior Ep5 failed Ali's usefulness bar ("20 min of dribble"). Must teach which-model-for-what + why, plainly, substance-notes-approved-first. ⚠ Title unresolved: "The Super Models" (memory index) vs "The Model Menu" (resequence memo) — verify `episode-05.canon.md`.

5. **SUNNYVAiLE High CLASSES** — not researched, not built (3 research agents stopped mid-task 2026-07-22). The class template IS locked (classroom wrapper → hit play on the 90s TV → full-screen recording). "Cheapest thing we make" (no characters = no likeness/continuity/style drift). This is the strongest "why here" — the tool-machinery material nobody else teaches (what a Project/session/artifact/routine is). Decide the class-vs-book boundary ONCE.

6. **Grimoire content restoration** — the Grimoire is DISMANTLED (it does not exist), but the move was HALF-DONE: `grimoire/*.html` became redirect stubs and **17,763 words never landed in the LIBRAiRY** (restore from `_superseded/grimoire/`, 20,128 words). Creates a redirect loop today. The LIBRAiRY build itself (`_library-v3.html`, metal shelves/two bays) is blocked on a room backdrop + transparent-alpha shelf units, and Ali rates the current library 5/10.

7. **Page redesigns to the homepage standard** — LOCKED: gold+plum retired sitewide (a redesign, not a recolour — "the layouts themselves are the problem"). Most pages are "mid" until Ali rates them; homepage is the only exemplar. Zombie pages still on legacy Clubhouse headers (dream-phone, fairy-godmother, dj-booth, community/*, learn/quiz).

8. **Intro/outro credits redo** — LOCKED that both need redoing (reason TBD — ask Ali before rebuilding); dedicated intro (~29s) + outro (~25s) songs are done, but the credit videos are reopened and NOT final.

### TIER 3 — features floated / spec'd, not built

9. **Dream Phone rework (again)** — the corroboration/receipts fact-check version "didn't work"; NEW DIRECTION TBD. Locked lesson to preserve: spot when AI is hallucinating; an answer is a bundle of claims. Do NOT build on the corroboration model.
10. **Coverage gate / scene manifest** — spec'd; Ali said "don't build yet." Would catch semantic omission (dropped MAiVENS) that hooks can't.
11. **The ADVISOR module + dashboard** — reads Plausible/Clarity, suggests concrete changes; "what makes it a LOOP." Plus custom analytics events (downloads, charm found, quiz done, tour check-in).
12. **Behind-the-Scenes → community knowledge base** — women share AI-production learnings, AI compiles them; "one of the most useful parts eventually." (Painpoints log already started.)
13. **Butterfly clips as spendable currency** — floated; needs earned−spent ledger + server-side. Spec the economy before code.
14. **Gifting UX** ("Send a gift" → Post Office inbox → `gift_transfers` table w/ RLS) + **two-way trades** at the Blend & Snap Bulletin Board (L2).
15. **Smaller floated features:** Ask Jeeves LIBRAiRY-desk persona (pending yes); Cocktail Party Wall at Bronze; Puffy sticker placement UX + Closet Puffy Board; Tardy Award welcome-back UX; postcard reward wiring (Phase 2); "Did You Know?" tour-sign tips (live features only); pixel-portrait Resident Card (membership phase, consent non-negotiable); "What's in your purse today?" daily-carry vessel; DJ SunnyV as 9th saint; Season-end Final Exam / Study-Hall flashcards / pep rally; monthly model-freshness agent (pending yes).

### TIER 4 — future content (do NOT promise as existing)

16. **Future episodes:** "The Specialists" (Perplexity, image tools, NotebookLM, notetakers, ~after Ep7); the agentic-AI episode (absorbs AlphaGo/AlphaFold lineage). Season 1 24-episode map is a PROPOSAL awaiting Ali.
17. **Unwritten model books — do NOT promise:** Claude · Gemini · Copilot · Perplexity · The Lineup · The Prompt Cookbook · What Not to Paste. Plus a rigorous accuracy/currency vet owed on the 7 existing 101 chapters + Decoder.
18. **Owed art:** ENIAC Six scene frame + ~12 historical-women comic shots; MAiVEN portraits (deferred to Ali's batch); owed heroine outfits (jelly-sandals, Never Been Kissed/Josie, Mean Girls pink — confirm first); a bright daytime scene to set the vibrant-color ceiling; Cher+Dionne duo song, Golden Girls DJ intro + group portrait.
19. **Merch/POD ideas (cherry, post-audience):** Y2K split-heart friendship necklaces with LAiDIES slogans; gas-station collectible book series (Little People Big Dreams template); Book Fair merch tier.
20. **Teaching content floated:** tokenization "a layer deeper" (the strawberry/2-r's paradox); the crowdsourced BTS-tips community version.

---

## PART 3 — LOCKED vs OPEN (quick separator)

**LOCKED (decided — build/execute, don't re-litigate):** the show/season/podcast-native format · the Wednesday Engine as the priority machine · comic-for-videos / painterly-for-town · homepage as the design target · gold+plum retired sitewide · heroine face = Ali · canon-as-single-source + adversarial gate + fact/currency rules · monetization sequence (membership/digital first, merch later) · Grimoire dismantled · packs-not-cards, gifting-not-trading, charms-hidden-in-images.

**OPEN (needs Ali's call or a spec):** Ep5 title · the class-vs-book boundary · Dream Phone new direction · coverage gate (told "don't build yet") · butterfly-clips currency economy · Ask Jeeves persona · the intro/outro redo reason · card-art-comic-vs-frame-only (⚠ flagged unresolved) · Vocab 101 home (⚠) · monthly model-freshness agent · Season 1 topic map.

---

## PART 4 — WATCH-OUTS (the anti-rework list, condensed)

Things repeatedly rebuilt or reopened — do not re-propose as new: pixel art (superseded by comic), the transformation wand / Main-Street reveal (dropped), the trained LoRAs (rejected — trained on rejected frames), two-stage / composited text (banned — "terrible"), the BWS 40-drink deck (cancelled), the cue-synced stills player (superseded by CapCut MP4s), plum+gold card frame (retired), the second homepage music player (banned — one player only), a separate ops dashboard she'd have to toggle to ("don't build her destinations" — chat is the one place). And: never run destructive git in this repo; never delete `Website/` (the stranded 17k words); always give full absolute paths; cap image reviews at ~6 candidates; never self-certify quality — Ali rates.
