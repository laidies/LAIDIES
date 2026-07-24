# LAiDIES build learning ledger

**Public destination:** future **Field Notes from LAiDIES HQ: Behind the Build**
**System:** `docs/product/behind-the-build-learning-system.md`
**Editorial queue:** `operations/behind-the-build-publication-queue.md`
**Rule:** log meaningful failures, surprises, working fixes and transferable
lessons in the same task. Separate observation from diagnosis. A raw entry is
not automatically publishable.

## Canonical ID migration — 2026-07-24

This file consolidates both genuine source ledgers without overwriting either
history. The source migration occupies `BTB-001` through `BTB-040`; new entries
continue sequentially. Every migrated heading retains its original source ID
or dated heading.

Exact pre-merge copies are preserved at:

- `operations/archive/painpoints-log-legacy-premerge-2026-07-24.md`
- `operations/archive/painpoints-log-repository-premerge-2026-07-24.md`

Original SHA-256 checksums:

- legacy workspace ledger: `fb537cbda5ee34a76eb6cbacc78fd3488b751c27bbdb524242cbb7d9f6db4ca2`
- repository ledger: `8d3c0bcbb75009550de30ef3f47152c2f149173606fac59a99f3dccd5f2208ad`

The legacy ledger contained numbered entries 1–32 plus two dated entries. The
repository ledger independently contained entries 31–36, so source numbers
31/32 collided. Stable BTB IDs resolve that collision while the original labels
remain visible. Migrated legacy entries default to RAW until individually
reverified; migration does not silently certify their diagnoses.

## The two translation moves

Every tip is one or both of these moves:

- **① Speak their language** — adapt how you communicate so the system can act
  on the intended target, context and success criteria.
- **② Make them speak yours** — build prompts, templates, references, tools,
  checks or deterministic systems that translate human intent into reliable
  machine behaviour.

## Entry contract

Each new entry records: Context, Issue, What happens, Example, Evidence
observed, Diagnosis, Prevent / Fix, Why the fix works, New output, Transferable
lesson, Internal rule/check updated, Public angle, privacy/IP/reputation notes
and publication status. Historic entries remain verbatim apart from their
canonical heading and migration metadata; enrich them only from evidence.

---

## BTB-001 · Legacy #1 — Recaps get redrawn instead of reused
_Original source ID: legacy #1 · Migration state: RAW (not reverified during consolidation)_
`category: workflow · character`
- **Context:** Weekly episode that opens with a recap of last week.
- **Issue:** The AI re-generates the recap images from scratch.
- **What happens:** The recap drifts off-model — faces change, details flip between shots, and you burn iterations re-rolling something that already existed correctly.
- **Example:** Ep4's recap redrew the Ep3 "PERM ≠ SHOWER" shot *twice* — once brown-eyed, once blue-eyed — neither matching the real Ep3 frame.
- **Prevent / Fix:** Never generate a recap. Reuse the actual exported frames/clips from the previous episode — they're already on-model and consistent. Drop them straight into the timeline.
- **New output:** A recap that's identical to what viewers already saw. Zero drift, zero re-rolls.

## BTB-002 · Legacy #2 — The recurring character's face keeps changing
_Original source ID: legacy #2 · Migration state: RAW (not reverified during consolidation)_
`category: character`
- **Context:** Your host/heroine appears across dozens of generated shots.
- **Issue:** Each render makes her a slightly (or very) different person.
- **What happens:** Face shape, features, even eye color shift shot to shot. Full-screen, viewers clock it instantly.
- **Example:** Ep4's heroine looked like a different woman at the corporate desk vs. the salon — "big head," wrong eye color, wrong vibe.
- **Prevent / Fix:** Lock her with a trained model (a LoRA) on ~20 clean images of *her* across outfits, and generate through it. Also hard-code her fixed traits in every prompt (e.g. "blue eyes"). Re-prompting a general model just re-rolls the face each time.
- **New output:** The same recognizable person in every shot.

## BTB-003 · Legacy #3 — Text baked into images is ugly, wrong, or inconsistent
_Original source ID: legacy #3 · Migration state: RAW (not reverified during consolidation)_
`category: text`
- **Context:** You want a title card or caption ("I couldn't help but wonder…") on a scene.
- **Issue:** The image model *draws* the text — bad fonts, wrong words, misspellings, different every time.
- **What happens:** Text looks boring/off-brand, sometimes misspells your own brand, and never matches episode to episode.
- **Example:** Codex kept rendering the sign as "LUM*i*NAiRY," and the "couldn't help but wonder" card came out ugly and badly laid out.
- **Prevent / Fix:** Don't let the image model render important text. Add it as a real typography layer in your editor (CapCut / Figma) over the image — you control font, spelling, layout, and can save templates. For logos, overlay the actual logo file, never a drawn version.
- **New output:** Crisp, correctly-spelled, on-brand text — identical across every episode.
- **NUANCE (Ali 2026-07-17):** baked-in text is *good* when it **adds to the scene** — funny signs, book spines, notices, posters. Those rich details are wanted. The real rule is just **legible + correctly spelled, not gibberish** — and it's *tool-dependent*: **Codex/SOL renders text well** (so let it do character text), while **gpt-image-1 mangled it** (why you'd avoid *that* tool). So: right tool → welcome the funny in-scene text; still **double-check brand-critical wordmarks** (LIBRAiRY, LUMINAiRY, laidies.ai) since even Codex slips occasionally, and use a real overlay only for those must-be-perfect ones.

## BTB-004 · Legacy #4 — Timing is off and won't stay fixed
_Original source ID: legacy #4 · Migration state: RAW (not reverified during consolidation)_
`category: timing · workflow`
- **Context:** Assembling narrated scenes into a video.
- **Issue:** A caption lands too late or lingers too long — and fixing one thing breaks another.
- **What happens:** Endless iterations, because each re-roll re-times the *whole* video, so fixes never stick.
- **Example:** Ep4 — "JUST USE AI" needed to hit 2s earlier; "JUST USE INTERNET" sat on screen ~30s too long; fixing images kept un-fixing the timing.
- **Prevent / Fix:** Separate timing from images. Lock timing on the editor timeline (or a cue sheet) and assemble deterministically. To fix a scene, *replace that one clip* — don't regenerate the whole video.
- **New output:** Timing you set once that stays put; surgical one-clip fixes.

## BTB-005 · Legacy #5 — The image doesn't match what's being said
_Original source ID: legacy #5 · Migration state: RAW (not reverified during consolidation)_
`category: relevance`
- **Context:** Picking a visual for a specific narration beat.
- **Issue:** The image shows concepts you haven't taught yet, or something unrelated.
- **What happens:** It confuses viewers and undercuts the lesson.
- **Example:** At 1:56 in Ep4, the shot showed a stack of "Machine Learning / Deep Learning / Algorithms" books during a beat that hadn't introduced any of it.
- **Prevent / Fix:** Write each image prompt *from the exact sentence* being narrated there. Before placing any image, check it against "what has the viewer actually learned by this point?"
- **New output:** Every visual reinforces the precise thing being said.

## BTB-006 · Legacy #6 — A scene just sits there (no motion)
_Original source ID: legacy #6 · Migration state: RAW (not reverified during consolidation)_
`category: motion`
- **Context:** A scene that holds on screen for several seconds.
- **Issue:** It's one static still while other scenes have movement.
- **What happens:** Energy is inconsistent; the dead scene reads as unfinished.
- **Example:** Ep4's ENIAC Six scene was a single static image the whole time; every other segment moved.
- **Prevent / Fix:** Require ≥1 moving element per scene (flashing light, drifting steam, a subtle push-in). If the generator won't animate it, add a slow zoom/pan in the editor.
- **New output:** Every scene feels alive, with consistent energy.

## BTB-007 · Legacy #7 — Same "style," different looks
_Original source ID: legacy #7 · Migration state: RAW (not reverified during consolidation)_
`category: style`
- **Context:** Generating many images meant to share one art style.
- **Issue:** Some come out in a noticeably different finish than others.
- **What happens:** The video looks like two shows spliced together.
- **Example:** Ep4's office scenes rendered smooth/painterly while the town scenes were heavy pixel-dither — same episode, two styles.
- **Prevent / Fix:** Lock the style (reference/LoRA) *and* apply your signature texture as a uniform post-process to every frame, instead of hoping each generation matches.
- **New output:** One consistent look across the whole piece.

## BTB-008 · Legacy #8 — Describing a fix the way it's obvious to *you*
_Original source ID: legacy #8 · Migration state: RAW (not reverified during consolidation)_
`category: prompting`
- **Context:** You're looking at a generated image and want to fix one specific thing in it.
- **Issue:** You describe it the way it makes sense *to you looking at the picture* — but the model can't see what you see. It has no shared view, no idea what you're pointing at.
- **What happens:** The model guesses wrong — changes the wrong element, or changes everything — and you've burned a re-roll and made it worse.
- **Example:** Looking at the shot, "fix the squares on the other buildings" was crystal clear *to me*. To the model it's meaningless — which squares? which buildings? fix *how*? What actually worked: *"there are square designs on the store signs on the buildings on either side of Mme CLAi-O's — remove that decoration from the signs, it looks weird."*
- **Prevent / Fix:** Describe the fix like you're on the phone with someone who can't see the screen. Name four things: **WHAT** (the exact element — "square designs"), **WHERE** (anchored to a landmark it knows — "on the store signs, buildings on either side of Mme CLAi-O's"), **the ACTION** (remove / change to / move), and **WHY** if it helps ("it looks weird"). Ban pointing words — "the other," "those," "that one" — they have no shared referent.
- **New output:** The model changes the one thing you meant, and only that.

## BTB-009 · Legacy #9 — Texting an agent in bursts while it's already working
_Original source ID: legacy #9 · Migration state: REVERIFIED 2026-07-24_
`category: workflow · prompting`
- **Context:** You're in a chat with an AI agent and you type the way you text — several short messages back to back, one thought each.
- **Issue:** The agent starts working the instant you send message 1. Your 2nd and 3rd messages arrive *after* it's already moved on, so it reads them against the wrong thing.
- **What happens:** It assumes your later message is about whatever it's doing *now*, not what you actually meant — so it "fixes" the wrong thing or veers off in a direction you never intended.
- **Example:** Firing off "fix the sign" → "on the left one" → "actually just delete it" — by the time it reads the third message it's already re-rendered the wrong sign from the first, and now thinks "delete it" means something else entirely.
- **Prevent / Fix:** Two moves. (1) Put the whole thought in **one message** before it starts — collect your bursts, then send. (2) If you must follow up mid-task, **anchor it**: start with "re: the trailer sign —" or "still about the recap:" so it re-locates what you mean instead of guessing. You can also just say "hold on, don't start yet."
- **New output:** The agent acts on what you actually meant, in the right context — no whiplash.
- **Current verified instance (2026-07-24):** Ali sent two comments while
  reading an Episode 6 outro. They rejected the earlier title *Overdressed for
  the Job*, but Codex read them late and incorrectly applied them to the newer
  *Strike a Mode* proposal, then generated an unnecessary new shortlist.
- **Agent-side prevention rule:** When several user messages arrive around a
  changing proposal, reconstruct their chronology and explicit referents
  before acting. Do not silently attach an unanchored reaction to the newest
  object merely because it is now visible. If the likely target changes the
  decision, state the interpretation before replacing anything. Ali may use an
  anchor when convenient, but continuity remains the agent's responsibility.
- **Behind the Build angle:** “When chat messages cross in the mail”—how
  message timing changes the apparent referent, and why good agents should
  reconstruct conversational state instead of blaming the user’s texting
  style.

## BTB-010 · Legacy #10 — Taking "it's done / all wired up" at face value
_Original source ID: legacy #10 · Migration state: RAW (not reverified during consolidation)_
`category: workflow` · move ①
- **Context:** An AI agent (or a collaborator) builds something and reports it's finished — "it's all wired up," "done," "working."
- **Issue:** You accept the confident statement without probing or asking to *see* it work — partly because it sounds done and you want it to be.
- **What happens:** Later you find out it was only kind-of built, or never actually worked. By then it's buried under everything you built on top, harder to fix, and trust takes a hit.
- **Example:** "The Council" — I was told it was all wired up. In reality it was kind of built but not actually working. I accepted the statement and only found out later. (Same thing happened this week: an agent called videos "90%, one fix from launch" from thumbnails — full-screen, they weren't.)
- **Prevent / Fix:** Don't accept "done" — make it **show you**. "Walk me through it working, end to end." Ask probing questions: *What exactly did you test? What's the real output? What did you NOT do — what's stubbed or faked?* Confident wording isn't evidence; a working demo is. And make the agent state plainly what it **verified** vs. what it **assumed**.
- **New output:** You catch the gap while it's cheap to fix — and "done" actually means done.

## BTB-011 · Legacy #11 — Assuming a thing runs just because it exists
_Original source ID: legacy #11 · Migration state: RAW (not reverified during consolidation)_
`category: workflow` · move ①
- **Context:** You (or an agent) build a feature/agent/automation, and you assume it's now working.
- **Issue:** Building or *defining* something isn't the same as it being turned on. Lots of things have to be explicitly engaged / triggered / connected — they don't auto-run just because they exist.
- **What happens:** It sits there doing nothing while you think it's live. You find out much later that nothing was ever calling it.
- **Example:** Built "the Council" agent and assumed it would just work — but nothing was engaging it, so it never actually ran. (This is a mistake that trips up professional engineers too — "it compiles" ≠ "it runs" ≠ "it's wired to everything else.")
- **Prevent / Fix:** For anything built, ask one question: *"What actually triggers this — and is that trigger connected right now?"* Make the agent state the **status**, not a vibe: is this **LIVE**, or **built-but-not-engaged** (and if so, what turns it on)? Built ≠ running ≠ wired.
- **New output:** You always know what's actually running vs. sitting dormant — no false "it's handled."

## BTB-012 · Legacy #12 — "I set up agents / context files — why don't they just run on their own?"
_Original source ID: legacy #12 · Migration state: RAW (not reverified during consolidation)_
`category: workflow` · move ②
- **Context:** You hear about setting up agents, personal context files, agentic workflows with an orchestrator. You do the setup and expect to walk away and have them just run — all the time, together, without asking.
- **Issue:** Setting up an agent or writing a context file is **not** the same as building a running system. A context file is *instructions* that shape an agent **when it's invoked** — it does nothing on its own.
- **What happens:** You think you built an autonomous orchestrated crew; really you wrote the *description* of one, in chat windows. Nothing runs unless something triggers it, and you have no visibility because the chat window is the only interface — the agent can't reach out to you.
- **Example:** "The Council" *felt* built — but there was no scheduler, no always-on runner, no wiring, no way for it to ping me. It was a recipe, not a chef in the kitchen. **Contrast:** "Hot Goss Daily" is a *real* autonomous agent — a GitHub Action that runs on a daily schedule, on a server, calls the AI, updates the site, with zero input. It works *because* it's wired into infrastructure.
- **Prevent / Fix:** Learn the difference. A config/context file = a **recipe** (how to behave when called). A running agent = recipe **+ an always-on runner + a scheduler/trigger + wiring + a way to notify you.** Ask of anything you "set up": *What triggers this? On what schedule? Running where? How does it tell me it did something?* No answers = it's a recipe, not a running system. "Set it and it runs" needs infrastructure, not just setup.
- **New output:** You know whether you built a *description* or a *running system* — and you stop expecting a config file to behave like deployed infrastructure.

**2026-07-24 re-verification correction:** The Hot Goss contrast above was
only partly true. Its scheduler and repository push are genuinely live, but
the job had no `ANTHROPIC_API_KEY`, fell back to raw RSS headlines, and wrote
to a JSON file consumed by no live page. The richer public NewsStand reads a
different, manually maintained file. GitHub Pages then failed to deploy the
latest feed commit. Treat the historic wording “calls the AI, updates the
site” as superseded by BTB-045 and
`operations/diagnostics/news-system-live-status-2026-07-24.md`.

## BTB-013 · Legacy #13 — Same prompt, different model = a totally different look
_Original source ID: legacy #13 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You have a house style you love (made by one tool) and try to generate matching images with a *different* tool.
- **Issue:** Every image model has its OWN signature look baked in. The same prompt in a different model comes out in *that model's* style, not yours — no amount of prompting overrides it.
- **What happens:** You nail the prompt and it *still* looks off — flatter, more cartoon, different rendering — because the **tool** is wrong, not the words.
- **Example:** SUNNYVAiLE's look (the Fairy Godmother house) was made in Codex's model — crisp, painterly, dimensional depth. The exact same scene, exact same direction, run through **gpt-image-1** came out flat and cartoon-drawing-looking. Right prompt, wrong renderer.
- **Prevent / Fix:** Match the **model** to your established style, not just the prompt. Find out which tool made the look you love and use *that* (or one that renders the same way — e.g. a Flux/Midjourney-class model for painterly depth, not gpt-image-1's flat-graphic look). The prompt controls *content*; the model controls the *look*.
- **New output:** Images that actually match your house style, because they're made by the tool that makes that style.

## BTB-014 · Legacy #14 — The AI reaches for the complex solution — your simpler idea is often right
_Original source ID: legacy #14 · Migration state: RAW (not reverified during consolidation)_
`category: workflow` · move ①
- **Context:** You have an idea for how to solve something and you run it past the AI.
- **Issue:** The AI tends to reach for a more **complex, external, or paid** solution (a new API, a new tool, a new service) when a **simpler one you already have** would work just as well.
- **What happens:** If you don't push back, you build the complicated thing — more cost, more moving parts — when your simpler idea was as good or better.
- **Example:** The copy-paste-to-Codex problem. Claude proposed generating images through an external/paid API. The *simpler* answer — which **Ali** had — was: "Codex and Claude can both read/write the **same repo**; just set up a shared folder." Her idea was better *and* cheaper. It only surfaced because she knew enough about repos to keep pushing on it.
- **Prevent / Fix:** When the AI proposes something, ask **"is there a simpler way using what I already have?"** and *push your own idea* — you have context the AI doesn't (your tools, your setup, your budget). This is why learning the basics pays off directly: knowing what a repo is, or what your tools can do, is what lets you catch the AI over-engineering. You don't need to know a lot — you need to know enough to push.
- **New output:** The simplest thing that works, built on what you already have — not an over-engineered one.

## BTB-015 · Legacy #15 — Editing an already-generated image stacks quality loss — go back to the cleanest source each time
_Original source ID: legacy #15 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You have an image you like and want a small fix (remove one object, swap a detail). You ask the AI to edit *the edited version*, then edit *that*, building a chain.
- **Issue:** Each edit pass **re-renders the whole image**, so it re-interprets everything — not just the part you changed. Texture noise, mottling, and softness accumulate with every generation, even on the areas you wanted left alone.
- **What happens:** After two or three edits the picture looks subtly worse — grainier, more mottled, less crisp — than the first render, and you can't tell why. The *content* changed correctly but the *quality* quietly degraded.
- **Example:** The Grace comic bar-setter. v1 was the cleanest render. v2 swapped the form photo, v3 removed it — each built on the prior output. By v3 the whole frame read "a bit more mottled" than v1. Ali caught it: "first one it made looked better — it just needs to remove the image." Fix = throw away the chain, edit **v1 directly** in one pass for the one change.
- **Prevent / Fix:** Always edit from the **cleanest earlier version**, not the latest edited one — and **minimize the number of passes**. One base + one targeted edit beats a chain of three. Tell the model to keep everything else unchanged and avoid adding grain/mottling. If a frame needs several fixes, batch them into a single edit off the clean base rather than sequential re-edits.
- **New output:** The fix you wanted *and* the crispness of the original — because you edited the clean source once, not a stack of re-renders.

## BTB-016 · Legacy #16 — Generating a scene from scratch drifts on BOTH style and canon — restyle a reference instead
_Original source ID: legacy #16 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You have a locked style (from restyling one image) and you ask the tool to generate a brand-new scene from a text prompt — new setting, new character pose, everything.
- **Issue:** From a blank canvas the model invents *everything* it isn't pinned on — so it drifts off your style AND makes up world details you never asked for (fake storefronts, fake signage, wrong architecture). A text prompt can't hold a specific established look or a specific fictional place.
- **What happens:** The render comes back softer/different from your locked style, and the background is a plausible-but-wrong version of your world — named shops that don't exist, a town that isn't yours.
- **Example:** The daytime "color-setter." The Grace frame locked the comic look by *restyling an existing image* (composition + setting fixed, only rendering changed). The daytime frame was generated *from scratch* — it came back as soft glossy illustration (off the bold-ink anchor) and invented a whole SUNNYVAiLE Main Street ("Dial-Up Cafe," "Sunnyvale Video") that isn't canon. Color was the only part that landed.
- **Prevent / Fix:** Pin what must not drift. (1) **Restyle an existing correct image** rather than generate from zero whenever possible — it holds composition, setting, and style far better. (2) If you must generate new, **feed the actual reference** for anything canonical (the real building art, a character sheet) as an input image, and tell it to use that, not invent. (3) Never let it free-invent named/world details — either supply them or leave the background generic.
- **New output:** Renders that stay on-style and on-canon, because the model is *converting* a correct reference, not inventing a world from a sentence.

## BTB-017 · Legacy #17 — Describe a style DETAIL in words (and be structural) — don't feed an image ref that can steal the face
_Original source ID: legacy #17 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You want a specific small detail on your character — a hairstyle, an accessory (e.g. 90s butterfly hair clips) — and your instinct is to paste a reference photo of that detail.
- **Issue:** An image reference doesn't come with a dotted line around "just the clips." The model can also lift the **face** from that photo and overwrite your character — so your recurring heroine comes out looking like a stranger. (Ali hit exactly this last time.) Also: a vague word-description ("side clips") underspecifies and the model half-does it.
- **What happens:** Either the character's identity drifts (face stolen from the detail photo), OR the detail renders wrong/partial because the words weren't specific about the *structure*.
- **Example — the butterfly clips, actual evolution:** v1 came back with hair "only up on half her body." The fix was a **precise structural word-description**, no image ref: *"hair pulled back in sections from around the face, secured with butterfly clips — **three sections on each side, one clip per section (six clips total)**, the rest left in waves."* v2 rendered it correctly, and because it was words (not a face photo) the heroine's likeness stayed intact.
- **Prevent / Fix:** For a detail, use **words, not an image** — and make the words **structural**: how many, where, pulled-back vs. down, what's left loose. The trick (Ali's framing): **describe the look the way you'd describe it to a friend on the phone** — someone who can't see any picture. That forces the specifics ("three clips on each side, pulled back from the face, rest down in waves") instead of a vague vibe. Reserve image refs for when you want a *whole* look transferred, and even then name what to take. Better still (the teachable skill): **ask your AI to help you write that description** — describe the outcome, have it turn it into precise prompt language, iterate. (→ FAiRY Godmother Prompt Glow-Up.) NOTE most people will just throw in an image — that's the trap this avoids.
- **Best-of-both technique (Ali, 2026-07-18):** you CAN start from an image — just don't feed it to the image generator. Feed it to your **AI assistant** and ask it to **describe ONLY the one element you want (the hairstyle structure) in words — explicitly tell it to leave out hair color, facial features, skin, body, or anything else that could distort your character.** The AI becomes a filter: image in → clean, attribute-limited words out. You get the precision of a reference with none of the face/color theft. (This is the words-not-image rule + the use-your-AI skill combined.)
  - **Full workflow:** (1) point at an image of what you want; (2) ask your AI to describe just that element in words, excluding color/face/etc., AND **tell it to write the description so an image tool can understand and apply it** (prompt-ready, not prose); (3) take that description and paste it into your image prompt.
  - **The real payoff = fluency, not a hack:** by *seeing how the AI describes it* you learn the vocabulary yourself, so eventually you can describe it without the crutch (Ali: "until you get good at learning how to describe yourself"). The AI is training wheels that teach you to ride — which is exactly the LAiDIES value (build fluency) over a one-off Google answer.
- **New output:** The detail comes out right AND your character keeps her own face — because you specified the detail in structural words instead of importing a stranger's photo.

## BTB-018 · Legacy #18 — Change ONE thing at a time — a style reference gets outnumbered by stacked new instructions
_Original source ID: legacy #18 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You give the tool a style reference to match, but in the *same* prompt you also ask for a new character, a new outfit, and new lighting/setting.
- **Issue:** A single style reference can't hold the line against several simultaneous "make it new" instructions. The model spends its effort inventing all the new *content* (new person, new clothes, new bright daylight) and the style anchor gets **diluted** — it drifts off the look you were matching.
- **What happens:** You showed it the right style and it *still* came out wrong, and it's baffling — because the style ref was outnumbered, not ignored. Too many changed variables at once.
- **Example:** The heroine reference. The prompt showed Grace as the style target BUT also asked for a new character + new outfit + bright daytime (Grace is moody/night). Result drifted smooth/clean, off Grace's inked grit. Ali's diagnosis: "showing grace as target but then also telling it to make it bright and daytime plus a new character and outfit was probably the cause." Fix = isolate: restyle the existing v2 (change ONLY the rendering, hold character/outfit/lighting) — one variable.
- **Prevent / Fix:** **Change one variable at a time.** To match a style, hold everything else constant and convert an existing correct image (change only the rendering). To change an outfit, hold the style and character constant. Don't combine "match this style" with "new subject + new outfit + new lighting" in one shot — split it into steps, locking each before adding the next.
- **New output:** The style actually transfers, because it isn't competing with three other fresh demands in the same prompt.

## BTB-019 · Legacy #19 — Comic texture stamped on bare skin reads as a rash — and restyling can drop resolution
_Original source ID: legacy #19 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You ask for a gritty comic/halftone look, and/or you keep restyling the same image to refine it.
- **Issue (a):** The model applies **halftone / ben-day dots literally to bare skin** (legs, arms) as an all-over pattern, so the skin reads like a mesh or a rash instead of shading. **Issue (b):** each restyle pass can come back **lower-resolution / softer** than your target, and you don't notice until you compare side by side.
- **What happens:** The style is *right* but the details are off — dotted-looking legs, and an overall softness that looks low-res next to your reference.
- **Example:** Heroine re-grit v3 nailed the comic ink, but ben-day dots were stamped on her thighs (rash-like when zoomed) and it output at 1672×941 vs the Grace anchor's 1920×1080 — visibly softer.
- **Prevent / Fix:** (1) Tell it to keep **skin smooth** (soft/fine shading), and **reserve halftone for clothing shadows, background, and deep shadow — never an all-over dot pattern on bare skin**; point at a reference whose skin is rendered the way you want. (2) **Specify a target resolution** (e.g. ≥1920 wide) and match it to your anchor, and redo from the **cleanest source** rather than restyling a restyle (see #15).
- **New output:** Comic grit where it belongs (fabric/shadow), smooth skin, and crispness that matches your other frames.

## BTB-020 · Legacy #20 — Shadow color comes from the LIGHT, not the object — "darker skin" shadows go bronze
_Original source ID: legacy #20 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You're directing comic/graphic-novel shading and you (or the tool) shade things by darkening the object's own color.
- **Issue:** Real shading color comes from the **light source + ambient**, not "a darker version of the object." Shade a face with a darker *skin* tone and it reads like **bronze / bad makeup**. Most comic shading actually uses a **neutral cool grey** shadow tone over the flat color (plus black ink) — that's why it looks clean. And shadow *depth* should match how lit the scene is (a dark scene = little facial shadow, and that's correct).
- **What happens:** Faces come out muddy/bronze, shadows look like dirt, and it fights the clean comic look you wanted.
- **Example:** Heroine reference. Prompt said shade with "a darker shade of the local color," incl. skin — risked a bronze bad-makeup face. Ali, checking the comic reference examples: "the shading looks more grey," and from Grace: the glow on her back was bright BLUE because the light came from behind (shadow/rim color = the light's color, not "darker navy").
- **Prevent / Fix:** Default comic shadows to a **neutral/cool grey** over the base color + black ink linework; keep the **face light**, grey-shaded, never a darker-skin shadow. Let **scene light tint** shadows/rims where there's a clear source (a blue backlight → a blue rim-glow). Match shadow **depth** to the scene's brightness. Point at a reference whose shading you like and name its tone (grey, not saturated).
- **New output:** Clean comic shading that reads as light and form — not a bronze, muddy face.

## BTB-021 · Legacy #21 — Clean-from-scratch character art comes out "plasticy" — convert from a textured source instead
_Original source ID: legacy #21 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You want a hand-drawn/inked comic look, and you generate the character clean from scratch (blank background, full body) and keep re-prompting to fix the rendering.
- **Issue:** Clean generations tend to default to a **smooth, glossy, 3D-render "plasticy" look** — soft sheen skin, even gradients — and no amount of prompt wording ("flat", "inked", "matte", "angular shadows") reliably pulls it out of that. The base render is the bottleneck, not the words.
- **What happens:** Round after round of "it's still too plasticy / the shading's not hitting the mark," because you're fighting the generation's default finish.
- **Example:** The heroine character sheet went plasticy across many versions. Meanwhile the Grace frame held a proper inked/graphic-novel finish the whole time — because Grace was **converted from an already-inked, textured source image**, not generated clean.
- **Prevent / Fix:** Don't try to prompt a clean generation into looking inked. **Start from a frame that already has the texture/ink you want and convert it**, OR perfect the style on your best-textured frame first (lock it), then **transfer that treatment onto the new subject** rather than generating the new subject clean. The source's finish carries through; a blank canvas defaults to plastic.
- **New output:** Characters that actually look inked/drawn, because the render started from ink — not from a smooth blank generation you kept arguing with.

## BTB-022 · Legacy #22 — Prompting can't lock an art style across subjects — the model has a "default look" it snaps back to
_Original source ID: legacy #22 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You have one image in exactly the style you want and you try to get the *same* style on a new subject (a different character) by describing the style and pointing at the reference in the prompt.
- **Issue:** Image models have strong **default styles they fall into for certain subjects** — e.g. a "clean, smooth, pretty" look for young women. Referencing your target tells the model what to *aim* for, but the default keeps pulling the render back. So the two images end up in visibly different styles even though you referenced one from the other. No amount of prompt wording reliably overrides the default.
- **What happens:** Round after round, the new subject comes out in the model's default look, not your reference's look — and side by side they clearly don't match. (We spent ~15 rounds on this before seeing it.)
- **Example:** A gritty inked graphic-novel scene ("Grace") vs a new character in the same intended style — the character kept coming out clean/flat/webtoon no matter the prompt, because that's the model's default for a young woman. Grace only held the style because it was *converted from* an already-gritty image, not generated fresh.
- **Prevent / Fix:** For a *one-off*, convert an existing image that already has the look rather than generating clean. But to lock a style **across many images and subjects**, stop prompt-wrestling and **train a small style model (a LoRA / fine-tune) on a handful of on-style frames** — then every generation is in that style because the style is baked into the model, not the prompt. (Train it on GOOD, approved frames — a lock trained on rejected/off-style frames just reproduces the wrong thing.)
- **New output:** One consistent house style across every character and scene, one-click — because the style lives in a trained model instead of a prompt you have to win every single time.

## BTB-023 · Legacy #23 — Curate the reference set to your target register — a mixed set drags the output toward its loudest members
_Original source ID: legacy #23 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You built a set of style references and you feed the whole set into every render.
- **Issue:** A style set often spans a RANGE (e.g. bold flat pop-art posters ↔ softer painterly graphic-novel). Feed the whole range and the output drifts toward whichever members are loudest/most extreme — especially the bold, high-contrast ones. So the same set that nails one image over-styles the next.
- **What happens:** One render lands right, the next comes out "a touch too bold / poster-y" — and it's not the prompt, it's that you fed refs from the wrong end of the range for that shot.
- **Example:** Heroine expression sheet drifted bolder/pop-art vs the locked look, because a close-up leaned on the neon-poster style refs. Fix = anchor to the frames already in the *correct* register (the locked hero + turnaround) and feed ONLY the graphic-novel refs, dropping the bold pop-art ones for that shot.
- **Prevent / Fix:** Pick the sub-set of refs that matches the exact register you want for *this* output — don't dump the whole set every time. And anchor to your own already-correct frames (the locked reference) as the primary style guide, using outside refs only to reinforce it.
- **New output:** Consistent register across every image, because each render is guided by refs that all point the same direction.

## BTB-024 · Legacy #24 — Match the reference to the SCALE you're rendering — a face needs a face ref (and strip its bad bits)
_Original source ID: legacy #24 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ①
- **Context:** You have a style locked in some frames and want a *new character's face* in that style. You reason "just reference my locked full-body render / my scene — same style" and feed those.
- **Issue:** **Style references transfer best at the same SCALE as what you're making.** A full-body figure or a wide scene does NOT reliably teach the model how to render a *face* — the face is too small in them. A face render needs a **face-focused** style reference. Feed only body/scene refs and the faces come back off-style.
- **What happens:** You cite your locked frames for a portrait and get "a few images that aren't in the style at all" (Ali's words) — because none of them was a close-up face for the model to copy the face rendering from.
- **Example:** For Deb's comic face, the locked full-body v28 + the Grace scene did NOT transfer the style. What worked was a tight **face** ref (`styleref-02`) — it carried the bold ink + angular face planes. It also carried **halftone dots**, which came through on the first pass; "no dots" stripped them next pass → the clean Deb. So the face ref was essential; the dots were a strippable side-effect, not a reason to drop it.
- **Prevent / Fix:** Pick a reference at the **same crop/scale** as your output — a face for a face, a full body for a full body. Keep a good face-style ref even if it has an unwanted feature (dots); use it for the face rendering and **strip the feature with an explicit "no dots / no X"** (works, usually on a correction pass). Don't assume a broad frame substitutes for a scale-matched one, and don't discard a working ref over one removable flaw.
- **New output:** On-style faces the first time, because the model had a face to copy from — with the unwanted texture instructed away.

## BTB-025 · Legacy #25 — Generate NEW frames in the target style — don't convert old ones — for the cleanest result
_Original source ID: legacy #25 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You're moving to a new art style and you have old content in a different style. You can either *convert* the old images or *generate fresh* ones in the new style.
- **Issue:** **Converting** an existing image tends to keep dragging it toward its *original* style — the source biases the render, so it lands halfway (e.g. a pixel scene "converted" to comic stays half-painterly). **Generating fresh** in the target style, with no old image to anchor it, comes out fully and cleanly in that style.
- **What happens:** Converted frames feel "barely different" from the originals; freshly-generated ones nail the look on the first try.
- **Example:** The Grace *pixel* scene, converted to comic, stayed painterly and felt unchanged. The Ada time-jump frame — *generated fresh* in comic — came out unmistakably comic and clean ("fantastic"), better than anything we'd converted. Same style instruction; the difference was fresh-generate vs convert.
- **Prevent / Fix:** For anything you can make new, **generate it fresh in the target style** rather than converting an old asset. Reserve conversion for cases where you *must* preserve a specific existing composition — and even then, expect to push the style harder than a fresh generation needs. Bonus: the cheap connective pieces (transition cards, text frames, recap strips) are all new-generated, so they're both fast AND the easiest to get on-style.
- **New output:** Frames that fully commit to the new style, because nothing old is pulling them back.

## BTB-026 · Legacy #26 — A motion sequence needs ENOUGH in-between frames, or it's choppy — and it must hold your canon
_Original source ID: legacy #26 · Migration state: RAW (not reverified during consolidation)_
`category: style` · move ②
- **Context:** You turn a keyframe into an animated beat (a transformation, a camera move) by generating a few frames for the tool to interpolate.
- **Issue:** (a) Too FEW frames = **choppy** — a 5-frame magic transformation jumps; smooth needs ~9–11 (more wand-motion in-betweens, more effect frames, and an actual **mid-transition state**, not just start→sparkle→end). (b) The tool quietly **drifts off your canon** in the new frames — wrong building (a Gothic hall instead of your canonical rose-window dome), a signature detail wrong (butterfly clips in a vertical line, not the locked 3-per-side), a "full" location coming back half-empty.
- **What happens:** The animation stutters, OR a hero location/character comes back off-canon even though you'd locked it — because the prompt didn't re-assert the canon on every frame.
- **Example:** Ep4 transformation (5 frames = too choppy, no real mid-transform, hair wrong) + the MAiVENS hall (came back Gothic + half-empty + too painterly, when canon = the rose-window dome PACKED with the ~24 roster portraits, rendered comic).
- **Prevent / Fix:** Spec the frame COUNT to the motion (smooth transformation ≈ 9–11; name each in-between), and **re-state the canon in every animated beat** — exact building refs, the character's locked details (hair/outfit), "packed not empty," the render style. Attach the reference images. A locked thing stays locked only if the prompt says so each time.
- **New output:** Smooth motion that stays on-canon frame to frame.

## BTB-027 · Legacy dated entry — Codex delivers the same batch to TWO places at different resolutions
_Original source heading date: 2026-07-21 · Migration state: RAW (not reverified during consolidation)_
**What happened:** Codex's image batch landed in two locations with *different* files:
`~/.codex/generated_images/<session>/exec-*.png` (native, 1672×941) **and** the repo
`assets/episodes/ep-04/pixel/*.png` (upscaled to 1920×1080). The two sets share **no** md5s.
Working from the cache and copying into the repo silently **overwrote three 1920px files with
1672px ones** — filename still said `-1920`, so nothing flagged it.

**Cost:** a downgrade that would have shipped invisibly into the video master.

**Fix / rule:** before copying any Codex output into the repo, **check whether the target already
exists and compare dimensions**, not just filenames. Filenames encode intent, not reality.
`sips -g pixelWidth -g pixelHeight` on both sides takes seconds.

**Public-tip angle (BTS):** "AI tools often hand you the same asset twice at different quality —
the file *name* is a claim, not a fact. Check the actual pixels before you overwrite."

## BTB-028 · Legacy dated entry — Real historical women rendered with INVENTED faces (no likeness reference)
_Original source heading date: 2026-07-21 · Migration state: RAW (not reverified during consolidation)_
**What happened:** Ali asked "is this an accurate depiction of Grace Hopper, or did Codex just make
someone up?" Checked: the prompt that generated Grace's three Ep4 scenes described the BEAT only
("Grace at the machine building the compiler") and named **no face reference** — while FOUR Grace
Hopper portraits already exist in the repo (`assets/mavens/…/grace-hopper-y2k-stained-glass.*`).
Codex invented a plausible mid-century woman. The same omission applies to every real woman in that
batch: Ada, Hedy, Karen, Fei-Fei, the ENIAC Six, Joy, Timnit, Emily, Kate.

**Cost:** an episode that teaches the real history of real women depicts them as strangers. It is an
editorial-credibility problem, not just an art one.

**Root cause:** the batch spec carried a STYLE anchor (angular face-shading reference) and no
LIKENESS anchor. Style ≠ identity. `codex-reference-curation` already says "face ref = their existing
portrait; never guess" — the prompt simply didn't do it.

**Complication that made it non-obvious:** the canonical site portrait of Grace is the iconic ELDERLY
Rear Admiral, but the scene is 1952 when she was 45 and a civilian. So "just use the portrait" is
wrong too. The prompt must name the person, the reference portrait, AND the age/era for that scene.

**Fix / rule for every future prompt featuring a real person:**
> Name the person, cite their portrait path as the LIKENESS reference, and state their AGE AND ROLE
> in that scene's year. Add: "This is a real person — her face must be recognisably her, not a
> generic figure of the period."

**Public-tip angle (BTS):** "If you ask AI for 'a 1950s computer scientist' you get a stranger. If you
want a real person, you have to say who — and show it what she looked like at that age."

## BTB-029 · Legacy #27 — Fixing a misspelled sign by pasting the letter on top
_Original source ID: legacy #27 · Migration state: RAW (not reverified during consolidation)_
`category: style · workflow` — ① Speak their language
- **Context:** A generated storefront sign came back with one letter wrong.
- **Issue:** The obvious "cheap fix" is to repaint the bad letter in an image editor instead of re-generating the picture.
- **What happens:** It reads as applied-on. Painted text never picks up the scene's lighting, its paint texture or its soft edges, so the eye catches it instantly even when the shape and colour are copied from the same image.
- **Example:** Ep4's LUMINAiRY marquee rendered `LUMiNAiRY`. We built a capital "I" out of the sign's own "L" — its exact stem, serif, colour and glow — dropped it in, and it still looked stuck on. Ali: *"you shouldn't be applying signs on top."* Third time this workaround has been tried and rejected.
- **Prevent / Fix:** Put the exact string in the prompt and have the model render the text as part of the picture. If the text is wrong, re-render the frame — one frame, on its own — rather than patching it.
- **New output:** Lettering that sits in the scene's own light, because it was painted at the same time as everything around it.

## BTB-030 · Legacy #28 — The filename says it was fixed; the picture says otherwise
_Original source ID: legacy #28 · Migration state: RAW (not reverified during consolidation)_
`category: workflow`
- **Context:** Hunting for the corrected version of a frame among dozens of takes.
- **Issue:** Files get named for the fix they were *meant* to contain, not the fix they actually contain.
- **What happens:** You wire the "corrected" file and ship the same bug, or you commission a re-render that already exists. Either way the filename is trusted and the picture is never opened.
- **Example:** `...approach-comic-v4-correct-sign-1920.png` still reads `LUMiNAiRY`. A whole re-render was nearly skipped on the strength of its name.
- **Prevent / Fix:** Name a file for what it *is*, not what it was supposed to be — and open the picture before believing any filename that contains the words "correct", "fixed" or "final".
- **New output:** The search for a fix ends with a look, not a guess.

## BTB-031 · Legacy #29 — The same canon mistake comes back because the rule lives somewhere the prompt never sees
_Original source ID: legacy #29 · Migration state: RAW (not reverified during consolidation)_
`category: relevance · workflow` — ② Make them speak yours
- **Context:** Generating a street scene in a fictional town with a fixed layout.
- **Issue:** The layout is written down, but in a notes file the image prompt never carries — so every new prompt is written from memory.
- **What happens:** The same geography error returns every few weeks, gets caught by eye, and costs another re-render.
- **Example:** The LIBRAiRY was put on MAiN Street beside Blend & Snap. It sits on Civic Square, off MAiN. The identical error had already forced re-rolls of two street scenes three weeks earlier.
- **Prevent / Fix:** Move the canon into the single requirements block that every prompt must carry, with the actual order spelled out inline — then a checker refuses any prompt missing it. Rules that live only in notes get re-typed from memory and lose a line each time.
- **New output:** The layout travels with every prompt automatically, so it cannot be forgotten between jobs.

## BTB-032 · Legacy #30 — A quality check whose bar sits below the noise
_Original source ID: legacy #30 · Migration state: RAW (not reverified during consolidation)_
`category: motion · workflow` — ② Make them speak yours
- **Context:** Automated check confirming that "make it move" clips actually move.
- **Issue:** The pass mark was set to a number lower than the video compression's own random flicker.
- **What happens:** It prints PASS for everything, including a still image saved as a video. You believe the check and ship stills.
- **Example:** Ep4's motion check passed anything above 0.02. Four of five "ambient loops" were sitting at the still-frame noise floor and were reported as working.
- **Prevent / Fix:** Calibrate against a known-still control measured the same way, and state the result as a multiple of it. Also make sure the measurement suits the effect — a whole-frame average cannot see a few hundred flickering lamps, and two samples of a slow pulse can land at the same brightness.
- **New output:** A check that can actually fail, and a number that means something.

## BTB-033 · Legacy #31 — Teaching copy that sounds like teaching but is hollow or self-undermining
_Original source ID: legacy #31 · Migration state: RAW (not reverified during consolidation)_
`category: relevance · workflow`
- **Context:** Writing class / episode copy — worked examples, "what it can do" beats, narration.
- **Issue:** The copy is generated fast and then defended, with no adversarial check before the human reads it. It *sounds* like teaching, so it passes a skim.
- **What happens:** Empty beats ship ("What can you do?" → a useless list; a callback to a "throw pillow" from an episode the viewer hasn't seen). Example prompts model the exact bad habit the episodes teach against (vague asks), or ask the tool for something it cannot know (summarise a policy into "the five things MY TEAM does differently" — it has the policy, not your team). Each one quietly undercuts the specificity lesson elsewhere on the site. Ali ends up as the bug-catcher: *"garbage in a garbage dress."*
- **Example:** Basics Class 1's first pass. Root cause was method, not model — generating before reasoning what's actually true, then defending the draft.
- **Prevent / Fix:** Reason each element prompt-first — write down what is true and keep only what survives — then put a gate between generation and the human: (1) N independent critics whose only job is to KILL each item against the known traps (vague prompt, impossible knowledge, contradicts Episode 2, empty beat, personification), majority-kill; (2) a mechanical phrasing scan (reuse `check-class-scripts.py`'s BANNED/PERSONIFY/STALE regexes over the bare VO) as a backstop; (3) my own read against the traps. Only survivors reach Ali. Prove the gate can fail — the phrasing scan was calibrated against the known-bad old script and correctly flagged its "throw pillow" / "what can you do?" beats before trusting it.
- **New output:** Copy Ali reviews for *taste and direction*, not to catch hollow or contradictory teaching — because the traps were killed mechanically first.

## BTB-034 · Legacy #32 — A multi-phase workflow hit a usage limit mid-run — and the recoverable work almost got re-run
_Original source ID: legacy #32 · Migration state: RAW (not reverified during consolidation)_
`category: workflow`
- **Context:** A research → vet → synthesize workflow for the "what to use it for" list.
- **Issue:** The session usage limit was reached during the vet phase. 51 of 64 agents errored, synthesis never ran, the tool returned `final: null`. The reflex is to just re-run the whole workflow (and hit the same wall, and repay for the research that already succeeded).
- **What happens:** The expensive, successful early phase (5 research agents → 58 sourced candidates) is invisible in the null result and looks lost.
- **Example:** This run — research completed, vet/synth failed on "session limit · resets 10:40am." All 58 candidates were sitting in `journal.jsonl` the whole time.
- **Prevent / Fix:** On a partial workflow failure, READ the run's `journal.jsonl` and pull the completed-phase results FIRST. Finish the cheap downstream steps (vet, synthesize) in the main thread instead of re-running agents — especially when usage is already constrained. Only resume-from-runId if the remaining work genuinely needs agents. The journal is the checkpoint; treat a null final as "inspect," not "redo."
- **New output:** The 58 researched uses were recovered and vetted+synthesized in-thread; nothing was re-run or re-paid for.

---

# Repository-era entries

## BTB-035 · Repository #31 — Assembly burned captions OVER the artwork
_Original source ID: repository #31 · Migration state: RAW (not reverified during consolidation)_
`category: workflow · timing` — ① Speak their language
- **Context:** Handing the video editor an episode to assemble from clips + stills + narration.
- **Issue:** The assembly prompt said "burn OR attach captions below the picture" — the "burn" option let the editor bake captions into the video, and its default placed them huge and centered, covering the whole frame.
- **What happens:** The exported episode has giant white subtitles over every scene, hiding the art and the character's face.
- **Example:** Ep4 v3 exported with the "Previously on LAiDIES…" line as centered white text across the middle of the frame, over the heroine.
- **Prevent / Fix:** The video must be delivered CLEAN — no caption overlay at all. Captions belong to the player, which renders them in a bar BELOW the picture. Tell the assembler explicitly: no captions in the video. Never leave "burn or attach" as an option.
- **New output:** A clean full-frame episode; captions appear below the picture from the player, never over the art.

## BTB-036 · Repository #32 — Over-specified title-card prompt STEERED Codex into hallucination (2026-07-23)
_Original source ID: repository #32 · Migration state: RAW (not reverified during consolidation)_
**What happened:** Ep1 title card came back with an invented SUNNYVAiLE water tower + a hot-pink-chair
boardroom, and forced gold lettering. **Root cause:** my prompt added a forced colour ("gold", copied
from Ep4) + an invented background ("Y2K boardroom opening into SUNNYVAiLE"). Ep4's actual title prompt
is ONE line ("Comic title card: THE FOUNDING MOTHERS + 'Episode Four', on a comic ground") — Codex
themed it itself. **Fix baked into prompts:** title cards use the minimal pattern — `Comic title card:
<TITLE> (bold comic lettering) + "Episode N", on a comic ground` + style line; NO forced colour, NO
invented background. Over-specifying a title card steers it wrong. (Scene frames still need exact refs.)
See [[title-card-ep4-standard]].

## BTB-037 · Repository #33 — A new idea silently became a task switch
_Original source ID: repository #33_

`category: workflow · context · continuity` — ② Make them speak yours
`source: Ali + Codex working-system conversation, 2026-07-24`
`publication status: VERIFIED`

- **Context:** Long, productive project conversations where Ali shares new
  ideas as they occur while an implementation or analysis is already active.
- **Issue:** The conversation was being used simultaneously as the idea inbox,
  project plan, task state and completion record. A new idea could become the
  model’s new focus without the previous task being completed or checkpointed.
- **What happens:** Partially built work disappears from attention. Later, the
  discussion is remembered as completion even though only planning or part of
  the implementation happened.
- **Example:** The current conversation moved rapidly through Episode 5,
  weekly production, rewards, loyalty and postcard ideas. The concepts were
  strong, but there was no single active-task record distinguishing specified
  systems from implemented ones.
- **Evidence observed:** Project state was spread across old handoffs, a June
  idea backlog, stale task JSON, product files and conversation. No live
  active-work source or actual decision ledger existed.
- **Diagnosis:** **Verified.** The failure was not idea volume. It was the
  absence of an explicit interruption and checkpoint protocol.
- **Prevent / Fix:** Maintain one active objective in
  `operations/ACTIVE-WORK.md`; capture all other ideas durably; default to
  capture-and-continue; require a checkpoint before switching.
- **Why the fix works:** Idea generation and execution state become separate
  channels. Creativity no longer implicitly mutates the work queue.
- **New output:** Unlimited idea capture with one visible execution path and
  exact resume points.
- **Transferable lesson:** AI chat is an excellent thinking surface and a poor
  project database unless state is externalized.
- **Internal rule/check updated:** `operations/CODEX-WORKING-AGREEMENT.md`,
  `AGENTS.md`, `PROJECT-HOME.md`, `operations/engine/LEDGER.md`.
- **Public angle:** “Your AI didn’t forget because your idea was bad. It forgot
  because the conversation was doing four jobs at once.”
- **Privacy/IP/reputation:** Explain the workflow pattern without discussing
  Ali’s ADHD as a defect or publishing private project details.

**2026-07-24 refinement:** BTB-046 preserves the single visible execution path
as one **foreground decision lane**, while allowing bounded independent work to
move backstage. This does not weaken capture-and-continue or the checkpoint
rule; it separates Ali’s attention limit from safe machine concurrency.

## BTB-038 · Repository #34 — A green check certified yesterday’s Episode 5
_Original source ID: repository #34_

`category: workflow · verification · state` — ② Make them speak yours
`source: Wednesday Engine status check, 2026-07-24`
`publication status: VERIFIED`

- **Context:** Testing the new active-work system against the existing
  Wednesday Engine.
- **Issue:** `where.sh` treated the presence of `substance.stamp` as proof that
  Episode 5’s substance was complete. It did not confirm that the stamp still
  matched the current source or the latest decisions.
- **What happens:** The engine tells Ali to approve an obsolete substance sheet
  after the lesson direction has changed.
- **Example:** The engine initially printed “Finished: the one-page substance
  sheet” and “WAITING ON YOU,” even though Ali had rejected the earlier Episode
  5 approaches and supplied a materially different fashion-system direction.
- **Evidence observed:** `build/ep05/substance.stamp` and its hash were dated
  July 22; the current decisions were dated July 24. The source is now marked
  `SUPERSEDED`.
- **Diagnosis:** **Verified.** Completion was attached to a stage/file name,
  not the exact content and ruling it purported to certify.
- **Prevent / Fix:** `where.sh` now checks source hashes for substance, canon
  and scripts. The Makefile and status tool reject `SUPERSEDED`/`UNRULED`
  sources before approval or derivation.
- **Why the fix works:** A completion marker only remains valid for the exact
  content it reviewed. Meaningful changes invalidate downstream confidence.
- **New output:** Episode 5 correctly reports no completed current stage and
  identifies its substance as superseded.
- **Transferable lesson:** A green check without a version is a souvenir, not
  evidence.
- **Internal rule/check updated:** `operations/engine/where.sh`,
  `operations/engine/Makefile`, Episode 5 substance/canon status banners.
- **Public angle:** A plain-language explanation of content hashes: “How your
  computer knows the document you approved is still the document in front of
  you.”
- **Privacy/IP/reputation:** Use a simplified example or approved screenshot;
  do not expose unpublished Episode 5 copy.

## BTB-039 · Repository #35 — A draft file was mistaken for a released episode
_Original source ID: repository #35_

`category: workflow · publishing · verification` — ② Make them speak yours
`source: Wednesday Engine status check, 2026-07-24`
`publication status: VERIFIED`

- **Context:** Asking the engine for Episode 5’s current status.
- **Issue:** The status script inferred “This episode already went out” when it
  found either a draft Markdown file or a public-page HTML file.
- **What happens:** Internal file presence becomes a false publication claim.
  No deploy, public URL or smoke test is required.
- **Example:** `content/issues/issue-05.md` is explicitly a pre-publication
  draft, but its existence triggered “already went out.”
- **Evidence observed:** The file header says “pre-publication draft · not
  recorded · public page not built.”
- **Diagnosis:** **Verified.** The script used a convenient proxy that did not
  measure the state it named.
- **Prevent / Fix:** Status now says a draft exists but no current stage is
  complete. A file on disk is never treated as approval, deployment or public
  verification.
- **Why the fix works:** Each claim has its own proof: authored, approved,
  deployed and publicly verified remain separate states.
- **New output:** Honest Episode 5 status and a reusable publication-state
  vocabulary.
- **Transferable lesson:** Measure the state you mean. “The file exists” cannot
  answer “Can a reader use it?”
- **Internal rule/check updated:** `operations/engine/where.sh`,
  `operations/CODEX-WORKING-AGREEMENT.md`.
- **Public angle:** “The four different meanings of ‘done’ that AI keeps
  collapsing.”
- **Privacy/IP/reputation:** None beyond keeping unreleased content private.

## BTB-040 · Repository #36 — The learning history looked missing because there were two ledgers
_Original source ID: repository #36_

`category: workflow · context · continuity` — ② Make them speak yours
`source: Behind the Build system restoration, 2026-07-24`
`publication status: VERIFIED`

- **Context:** Restoring the standing rule that project learnings should be
  captured across chats and reused.
- **Issue:** The site repository contained
  `operations/painpoints-log.md`, while the wider LAiDIES workspace contained
  a different file at the same apparent project-relative path.
- **What happens:** Searching only the repository ledger made entries 1–30
  appear lost. A recovery note was written from incomplete scope even though
  the real entries still existed one workspace level higher.
- **Example:** The repository ledger began at entry 31. The recovered legacy
  file at `../operations/painpoints-log.md` contains entries 1–30 and two more
  entries also numbered 31/32.
- **Evidence observed:** Both files were opened and compared. Their contents
  differ and their numbering collides.
- **Diagnosis:** **Verified.** The search boundary followed the current Git
  repository rather than the full project workspace. Identical relative
  filenames concealed two independent sources.
- **Prevent / Fix:** Register both sources explicitly, preserve exact
  pre-merge copies and checksums, consolidate every record under stable
  canonical IDs, and install the learning rule in both workspace- and
  repository-level `AGENTS.md`.
- **Why the fix works:** The rule now follows the whole project scope, and the
  legacy source is visible without overwriting or guessing its history.
- **New output:** All 40 historic/current learnings are searchable in one
  canonical ledger as `BTB-001`–`BTB-040`, and future image, video, social,
  website and content tasks receive the same capture instruction.
- **Transferable lesson:** Before declaring project memory missing, verify the
  filesystem/repository boundary and search the full authorized workspace.
- **Internal rule/check updated:** Root and repository `AGENTS.md`,
  `operations/CODEX-WORKING-AGREEMENT.md`,
  `docs/product/behind-the-build-learning-system.md`.
- **Public angle:** “The notes were not gone. I was standing in the wrong
  filing cabinet.”
- **Privacy/IP/reputation:** Explain nested project folders generically; do not
  expose local usernames or private absolute paths.
- **Resolution evidence:** Consolidation completed 2026-07-24. The canonical
  header records both original SHA-256 checksums, and exact source snapshots
  are preserved in `operations/archive/`.

## BTB-041 · Image-generation rules become misleading when the conditions disappear

`category: style · prompting · workflow` — both ① and ②
`source: Ali image-learning direction + canonical-ledger review, 2026-07-24`
`publication status: RAW`

- **Context:** Planning a public “how to get good AI images” learning series
  from real SUNNYVAiLE production failures and before/after examples.
- **Issue:** Several useful observations sound like universal rules when their
  tool, source, task and preservation goal are omitted.
- **What happens:** Advice can become contradictory: “change one thing at a
  time” versus “avoid edit chains”; “restyle a reference” versus “generate
  fresh”; “use references” versus “too many references cause problems.”
- **Example:** `BTB-015` recommends applying known fixes to the cleanest source
  in as few passes as possible. `BTB-018` recommends changing one variable at
  a time. `BTB-016`/`BTB-021` favour conversion when canon/style must be held,
  while `BTB-025` found fresh generation escaped an unwanted source style.
  `BTB-023`/`BTB-024` suggest reference compatibility and scale may matter more
  than raw reference count.
- **Evidence observed:** The claims come from different production jobs and
  were migrated as RAW observations. No controlled comparison yet isolates
  edit depth, number of requested changes, reference count, reference conflict,
  crop/scale or what the result needed to preserve.
- **Diagnosis:** **Unknown; working hypothesis recorded.** “One variable” may
  be the better diagnosis method, while “one controlled pass from the clean
  source” may be the better final-production method. Fresh versus edit may
  depend on what must be preserved. Reference conflict may matter more than
  quantity.
- **Prevent / Fix:** Run the controlled matrix in
  `operations/research/image-generation-learning-validation-plan.md`. Keep
  model/version, source and settings fixed; vary one factor; retain exact
  prompts, references, dimensions and outputs; compare chained edits with
  clean-source edits.
- **Why the fix works:** It separates correlated variables and lets the public
  rule be narrowed to the conditions the evidence actually supports.
- **New output:** A planned evidence package with real before/after images,
  prompt/reference receipts and bounded, practical guidance.
- **Transferable lesson:** A memorable rule needs its conditions. A pattern
  observed in one tool and one job is a hypothesis until we test what changed.
- **Internal rule/check updated:**
  `operations/research/image-generation-learning-validation-plan.md` and the
  Behind the Build research backlog.
- **Public angle:** “Is your AI image getting worse—or are your references
  fighting in the group chat?”
- **Privacy/IP/reputation:** Use only approved project assets; disclose the
  tested model/version/date; do not imply one tool’s behaviour applies to every
  image model.

## BTB-042 · The lyric was spelled correctly and still sung wrong

`category: audio · pronunciation · workflow` — ② Make them speak yours
`source: Ali song-production direction, 2026-07-24`
`publication status: DIAGNOSED`

- **Context:** Producing AI-generated episode songs whose lyrics must also
  appear correctly in captions, lyric pages, articles, cards and search.
- **Issue:** One written lyric is being asked to serve two different jobs:
  correct public language and tool-facing pronunciation direction.
- **What happens:** A word can be spelled correctly while the music tool
  chooses the wrong pronunciation. Changing the spelling to make the singer
  understand can then leak incorrect words into public lyrics or captions.
- **Example:** `read` is spelled the same in “I read it yesterday” and “I read
  it every Wednesday,” but the past tense sounds like `red` and the present
  tense sounds like `reed`. A performance spelling may need to differ even
  though the public lyric must remain `read`.
- **Evidence observed:** The linguistic ambiguity is known and Ali identified
  it as a recurring song-production concern. The exact workaround and behaviour
  still need to be recorded per music tool/model/version and approved output.
- **Diagnosis:** **Verified mechanism; tool-specific fix not yet verified.**
  Written spelling alone does not always encode the intended pronunciation.
  Public text and performance direction therefore cannot safely share one
  editable source.
- **Prevent / Fix:** Maintain canonical lyrics, a derived performance-lyrics
  workbench and an as-recorded transcript. Map public form, meaning, intended
  sound, performance form, tool/version and heard result. Reconcile every
  omission/substitution and restore public spelling before captions or fan-out.
- **Why the fix works:** The music tool can receive the phonetic help it needs
  without becoming the authority for spelling or meaning.
- **New output:** Song reconciliation protocol, revision template, two new
  required weekly-engine surfaces and a future before/after teaching story.
- **Transferable lesson:** Correct spelling is not always complete performance
  direction. Preserve meaning separately from the temporary syntax used to
  make a tool perform it.
- **Internal rule/check updated:**
  `operations/audio/song-production-reconciliation-protocol.md`,
  `operations/audio/song-production-revisions-template.md`,
  `operations/episode-surfaces.json` and the weekly opportunity scan.
- **Public angle:** “The lyrics were right. The singer was also wrong.”
- **Privacy/IP/reputation:** Use only LAiDIES-owned or approved audio examples;
  identify the tested tool/version/date; do not publish tool-specific spelling
  tricks as universal.

## BTB-043 · The TTS script is not the public transcript

`category: audio · pronunciation · workflow` — ② Make them speak yours
`source: Ali text-to-narration direction + existing audio pipeline, 2026-07-24`
`publication status: VERIFIED`

- **Context:** Turning an approved readable episode into AI narration, then
  deriving captions, timing, visuals and public transcripts.
- **Issue:** One script is treated simultaneously as canonical prose,
  pronunciation direction, evidence of what the tool said and public
  transcript.
- **What happens:** Ear spellings and delivery tags can leak into public copy;
  a better explanation changed while listening can remain stranded in the TTS
  file; or captions can be built from the original draft rather than the exact
  approved audio.
- **Example:** LAiDIES already needs public `LAiDIES` versus performance
  `ladies`, public `SUNNYVAiLE` versus performance `Sunnyvale`, and context for
  past-tense `read` (sounds like `red`) versus present-tense `read` (sounds
  like `reed`). `operations/tools/align.py` already normalizes some performance
  spellings for public output.
- **Evidence observed:** Separate studio/TTS scripts and normalization logic
  exist in the repository, and the recording-reconciliation protocol already
  requires semantic listening edits to return to canon. The missing explicit
  artifact was a transcript made from the approved audio itself.
- **Diagnosis:** **Verified.** Canonical prose, a renderer-specific performance
  script and the rendered audio have different jobs. None can safely stand in
  for the others without comparison.
- **Prevent / Fix:** Preserve four stages: canonical readable master, TTS
  performance script, approved audio/as-recorded transcript, and normalized
  public transcript/captions. Record tool/model/voice/date and homograph
  meaning; reconcile every semantic change before timing or fan-out.
- **Why the fix works:** Pronunciation syntax can help the voice without
  rewriting public language, while the as-recorded transcript proves what the
  audience will actually hear.
- **New output:** Tool-independent narration protocol, expanded revision
  template and a required `narration-as-recorded-transcript` engine surface.
- **Transferable lesson:** The prompt submitted to a voice tool is an
  instruction, not evidence of the final output.
- **Internal rule/check updated:**
  `operations/audio/recording-reconciliation-protocol.md`,
  `operations/audio/episode-recording-revisions-template.md`,
  `operations/episode-surfaces.json` and weekly audio checks.
- **Public angle:** “One script was trying to be the writer, actress,
  teleprompter and closed-captioner.”
- **Privacy/IP/reputation:** Use only approved narration samples and disclose
  the tested tool/model/voice/date without exposing private voice settings or
  credentials.

## BTB-044 · “Revenue later” made today’s founder subsidy invisible

`category: workflow · finance · sustainability` — ② Make them speak yours
`source: Ali sustainability direction, 2026-07-24`
`publication status: INTERNAL ONLY`

- **Context:** Deliberately postponing audience monetization until LAiDIES has
  a stable experience and real demand.
- **Issue:** “Do not monetize prematurely” can accidentally become “do not
  measure cost or design for sustainability.”
- **What happens:** Recurring subscriptions and founder labour remain invisible
  while product scope grows. Revenue is treated as morally suspect or too
  distant even though the mission depends on someone continually funding and
  producing it.
- **Example:** Ali currently estimates approximately $700 per month in
  out-of-pocket subscriptions/services, with currency and exact vendor
  inventory still to be confirmed. That excludes all of her creation,
  editorial, production and operating time.
- **Evidence observed:** The project had future monetization ideas and a rule
  to wait for demand, but no current cost baseline or explicit distinction
  between immediate cost stewardship and later audience monetization.
- **Diagnosis:** **Verified process gap.** Delaying sales is a trust decision;
  delaying cost visibility is not. They were incorrectly treated as the same
  decision.
- **Prevent / Fix:** Track the private cost baseline and vendor dependencies
  now; review waste/consolidation without cancelling blindly; preserve
  evidence-led revenue paths; value founder time separately from software cost.
- **Why the fix works:** LAiDIES can protect audience trust while making its
  real sustainability requirement visible enough to manage.
- **New output:** Sustainable-growth principles, anti-MLM boundary,
  subscription/vendor inventory and populated monetization hypothesis bank.
- **Transferable lesson:** “Not selling yet” is not a business model. Mission
  work still needs a cost model before it needs a checkout page.
- **Internal rule/check updated:**
  `docs/product/sustainable-growth-and-revenue-principles.md`,
  `operations/finance/laidies-cost-and-sustainability-baseline.md` and the
  active-work order.
- **Public angle:** Potential founder Field Note about what “free” creative AI
  work actually costs—but only if Ali deliberately chooses to disclose it.
- **Privacy/IP/reputation:** Keep the amount, vendor list and founder-time
  details private by default. Do not publish or use a hardship/guilt appeal
  without explicit Ali approval.

## BTB-045 · The cron ran every day; the NewsStand still never received the paper

`category: automation · deployment · content architecture` — ② Make them speak yours
`source: verified news-system audit, 2026-07-24`
`publication status: VERIFIED`

- **Context:** LAiDIES had a scheduled “Hot Goss Daily” GitHub Action, a richer
  WEDNESDAY Edition / Tribune NewsStand and daily commits that regularly moved
  remote `main`.
- **Issue:** The producer, public consumer and deployment were treated as one
  live system even though each used a different completion signal—and the
  producer and consumer used different files.
- **What happens:** A green scheduled job creates a convincing trail of daily
  commits while visitors continue seeing manually maintained June stories.
  The latest commit can also exist on `main` without reaching the public site
  when deployment fails.
- **Example:** On 2026-07-24, run 43 successfully fetched 12 RSS candidates and
  pushed `content/hot-goss-feed.json` as commit `83da89b`. The job logged that
  `ANTHROPIC_API_KEY` was absent and used raw headlines. No live HTML consumed
  that JSON. The public NewsStand instead loaded
  `content/newsstand-stories.js`, whose three stories were dated 2026-06-28.
  Pages run 398 then failed during artifact upload with “No space left on
  device,” leaving the public feed at 2026-07-23.
- **Evidence observed:** GitHub workflow/run/job logs; remote commit history;
  `origin/main` repository search; public HTTP responses for
  `/newsstand.html`, `/hot-goss.html`, both content files and the last
  successful deployment; local/remote NewsStand source comparison.
- **Diagnosis:** **Verified.** Scheduler success proved only that the producer
  ran and pushed. It did not prove that AI rewriting ran, that the live page
  read the output, that explanatory copy passed approval, that deployment
  succeeded or that a visitor saw a current edition.
- **Prevent / Fix:** Give every automation an end-to-end contract:
  trigger → input → transformation → approval → one canonical output →
  deployment → public smoke test. Record a separate status at each boundary.
  The publisher must write the exact dataset the page renders, and success
  must include a dated public assertion.
- **Why the fix works:** A broken handoff cannot hide behind a green upstream
  job. Each completion claim is tested at the layer where the user receives
  value.
- **New output:** A verified live-status audit, corrected agent registry,
  explicit NewsStand reveal gates and a P0 repair path before the public reveal.
- **Transferable lesson:** An automation is a supply chain, not a button.
  “The factory produced a box” does not mean the store stocked it—or that the
  customer received what the label promised.
- **Internal rule/check updated:**
  `operations/diagnostics/news-system-live-status-2026-07-24.md`,
  `operations/ops/agents.json`, `operations/ACTIVE-WORK.md` and
  `operations/launch/sunnyvaile-public-reveal-readiness.md`.
- **Public angle:** “Our news robot filed a story every morning. The newspaper
  never printed it.”
- **Privacy/IP/reputation:** Do not publish raw AI/RSS output as source-checked
  LAiDIES analysis. Preserve named sources, claim-level verification,
  copyright-safe summaries and Ali’s human approval gate.

## BTB-046 · “One active task” protected continuity but left safe work waiting backstage

`category: workflow · orchestration · accessibility` — ② Make them speak yours
`source: Ali workflow direction + first bounded-parallel trial, 2026-07-24`
`publication status: DIAGNOSED — OUTCOME NOT YET VERIFIED`

- **Context:** Protecting an idea-rich project from the old pattern where a new
  conversation silently replaced unfinished work.
- **Issue:** The safeguard was phrased as “only one active execution
  objective,” collapsing two different constraints: one thing needing Ali’s
  attention and only one useful task moving anywhere.
- **What happens:** Continuity improves, but independent research, audits and
  inventories wait even when they do not compete for files or decisions.
  Trying to solve that by simply “doing everything at once” would recreate the
  original problem at a larger scale.
- **Example:** Episode 5 needs Ali’s next content decision, while a read-only
  NewsStand repair plan and private local subscription inventory can be
  developed without changing Episode 5, deploying code or touching billing.
- **Evidence observed:** The project has one foreground critical path and at
  least two independent diagnostic tasks with different inputs and no required
  shared writes. Codex can run three bounded workers in the same task, but
  those workers share the repository filesystem.
- **Diagnosis:** **Verified design distinction; efficiency outcome not yet
  verified.** Human decision load and machine execution concurrency are not
  the same thing. The shared filesystem and final reconciliation remain real
  bottlenecks.
- **Prevent / Fix:** Keep one foreground decision lane, add at most three
  bounded backstage lanes, default delegated work to read-only, name exact
  inputs/outputs and dependencies, prohibit overlapping writes, and return
  every result to one owner for integration.
- **Why the fix works:** Independent evidence-gathering can overlap while canon,
  public state and Ali’s attention remain serialized. Checkpoints prevent a
  worker report from being mistaken for an implemented result.
- **New output:** A durable parallel-work register, revised working agreement
  and three first-trial lanes covering Episode 5, NewsStand repair planning and
  the private subscription inventory.
- **Transferable lesson:** “One thing at a time” is a good rule for decisions
  and shared state—not necessarily for every backstage task.
- **Internal rule/check updated:** `operations/CODEX-WORKING-AGREEMENT.md`,
  `operations/PARALLEL-WORK.md`, `operations/ACTIVE-WORK.md` and
  `operations/engine/LEDGER.md`.
- **Public angle:** “One thing needs your brain. Three useful things can still
  be happening backstage.”
- **Privacy/IP/reputation:** Do not publish private cost findings, unpublished
  episode material, agent transcripts or claims of time saved until the first
  trial is measured and reviewed.

## BTB-047 · Three pretty choices turned one click into three metered calls

`category: cost · security · product · workflow` — ② Make them speak yours
`source: private local dependency inventory, 2026-07-24`
`publication status: INTERNAL ONLY — DEPLOYED STATE NOT YET VERIFIED`

- **Context:** Auditing recurring tool costs and the production jobs behind
  them before promoting the redesigned site.
- **Issue:** A delightful public interaction can multiply metered API work and
  expose the billing key indirectly when server-side controls are absent.
- **What happens:** One person expects one makeover but the frontend makes
  three independent image requests. A direct caller may be able to bypass the
  browser entirely; permissive-looking CORS code can create false confidence
  because it does not authenticate or reject the request itself.
- **Example:** `maikeover.html:620-665` launches three avatar candidates.
  `worker-avatar/avatar.js` sends each normal request to `gpt-image-1`, contains
  no authentication/quota/rate limit and includes GET debug routes that can
  contact Replicate when a token is configured.
- **Evidence observed:** Local frontend and Worker source plus the public
  Worker URL embedded in the page. The deployed Worker version, recent request
  volume and actual spend have not yet been checked; no endpoint was called.
- **Diagnosis:** **Local mechanism verified; live exposure and cost impact
  unknown.** CORS response headers are not an abuse-control boundary, and
  three candidates intentionally triple normal per-click generation work.
- **Prevent / Fix:** Verify the deployed version/usage read-only; remove public
  debug routes; enforce allowed origins server-side; add authenticated or
  abuse-resistant quotas, a daily budget circuit breaker and alerts; test
  whether one candidate delivers enough value.
- **Why the fix works:** Cost is bounded at the server where requests are
  actually authorized, not left to UI behaviour a direct caller can ignore.
- **New output:** Private dependency inventory, a P0 verification item and an
  explicit no-endpoint-call safety rule.
- **Transferable lesson:** CORS controls what a browser may share with a page.
  It does not decide who may spend your API budget.
- **Internal rule/check updated:**
  `operations/finance/subscription-local-dependency-inventory-2026-07-24.md`,
  `operations/PARALLEL-WORK.md` and `operations/ACTIVE-WORK.md`.
- **Public angle:** None until the live exposure is resolved. A later generic
  cost-control lesson may use a fabricated/demo endpoint.
- **Privacy/IP/reputation:** Never disclose endpoint-abuse instructions,
  account data, key names/values, request volumes or unmitigated live details.

## BTB-048 · The tidy hierarchy lied about the relationship that mattered

`category: teaching · technical accuracy · analogy design` — ② Make them speak yours
`source: Episode 5 technical/instructional red-team, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** Rebuilding Episode 5 so a non-technical reader could understand
  products, providers, model labels, releases, task modes, subscriptions and
  fresh source material.
- **Issue:** Putting seven terms into one neat stack made the diagram easy to
  remember but silently asserted that every layer nested inside the next.
- **What happens:** A product operator and model provider collapse into one
  “company,” a public label looks like proof of a fixed model version, missing
  information looks like automatic routing, and any external tool sounds like
  a source of current facts.
- **Example:** The initial model treated “store → fashion house → model →
  season → service → membership → research packet” as one hierarchy. In real
  products, an operator may carry another provider's model; a task workflow
  may route or combine models; a calculator is a tool but not a fresh source;
  and a label may reveal nothing about a pinned model ID.
- **Evidence observed:** Two independent red-team passes reached the same
  instructional risk. The revised no-brand transfer test only worked after
  the hierarchy became seven diagnostic questions with honest unknown states.
- **Diagnosis:** **Verified.** The analogy was compressing several different
  relationship types—creates, operates, offers, routes, unlocks and
  retrieves—into one false parent/child chain.
- **Prevent / Fix:** Map relationships before decorating them. Use questions
  or a small graph when the system is not truly nested; keep
  `not shown / not disclosed / unknown` as valid answers; run a strip test that
  removes every analogy word; and have technical and instructional reviewers
  test the result independently.
- **Why the fix works:** The memorable hook still reduces cognitive load, but
  it no longer deletes the exception that determines how the system actually
  works.
- **New output:** Episode 5's two-rack receipt, fictional worked example,
  no-brand transfer proof and resolved red-team report.
- **Transferable lesson:** A clean diagram is not automatically a true one.
  If several arrows mean different things, turning them into one stack may be
  teaching the wrong system beautifully.
- **Internal rule/check updated:**
  `content/episodes/episode-05.substance.md` and
  `operations/research/episode-05-red-team-review-2026-07-24.md`.
- **Public angle:** “Our prettiest diagram was also our most confidently wrong
  explanation.”
- **Privacy/IP/reputation:** Use fictional product labels in the public lesson
  unless a dated real example has current primary documentation.

## BTB-049 · We sent the couture team to inventory the stockroom

`category: cost · orchestration · configuration` — ② Make them speak yours
`source: LAiDIES Codex configuration audit, 2026-07-24`
`publication status: DIAGNOSED — SAVINGS NOT YET MEASURED`

- **Context:** Using Codex for deep editorial architecture, ordinary file
  checks and several parallel read-only reviews in the same project.
- **Issue:** The global configuration pinned every task to GPT-5.6 Sol at
  Extra High reasoning. Supporting agents had no cheaper explicit override.
- **What happens:** Routine scans receive the same expensive reasoning budget
  as ambiguous, high-stakes work. Spawned agents inherit the parent's settings
  when no subagent default or explicit override is present, multiplying the
  high-cost choice across lanes.
- **Example:** Three Episode 5 read-only reviewers were spawned from a
  Sol/Extra High parent. Their independent reviews were valuable, but the
  supporting work did not all need the most expensive model/effort
  combination.
- **Evidence observed:** `~/.codex/config.toml` pinned
  `gpt-5.6-sol`/`xhigh`; the current Codex manual documents parent-setting
  inheritance for subagents and warns that parallel agents consume additional
  tokens.
- **Diagnosis:** **Mechanism verified; savings outcome not yet measured.**
  Model quality, reasoning depth, parallelism and response speed are four
  separate cost decisions. They had been collapsed into one permanent “best”
  setting.
- **Prevent / Fix:** Use project-scoped defaults: Sol/Medium foreground,
  High planning when needed, Terra/Medium subagents and Fast mode off. Route
  bounded scans to lower effort, require a concrete reason for Extra
  High/Max/Ultra and measure whether future work still passes its quality
  checks.
- **Why the fix works:** Expensive reasoning is reserved for the steps where
  it can change the outcome. Routine evidence gathering no longer inherits a
  premium setting merely because the parent task is important.
- **New output:** Two project-root configuration layers plus one durable
  routing policy shared by the working agreement and both applicable
  `AGENTS.md` files.
- **Transferable lesson:** “Use the best model” is incomplete advice. The
  useful question is “What is the least expensive setup that still clears
  this task's quality and risk bar?”
- **Internal rule/check updated:** `.codex/config.toml`,
  `operations/CODEX-WORKING-AGREEMENT.md`, `operations/engine/LEDGER.md`,
  `operations/ACTIVE-WORK.md` and both LAiDIES `AGENTS.md` files.
- **Public angle:** “We hired the couture team to count boxes in the
  stockroom.”
- **Privacy/IP/reputation:** Publish the decision mechanism, not Ali's private
  credit balance, account limits or usage history.

## BTB-050 · The checklist passed the page the brief had already rejected

`category: design QA · orchestration · status integrity` — ③ Put them to work
`source: Visitor Centre and LIBRAiRY source audit, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** Adapting the approved LIBRAiRY whole-room interaction model to
  the rest of SUNNYVAiLE's building pages.
- **Issue:** The construction pass treated the presence of content,
  interactive handlers, responsive CSS and screenshots as proof that a page
  was structurally complete.
- **What happens:** A page can technically contain every requested function
  while still contradicting the experience brief. The Visitor Centre shipped
  a numbered overlay that hid the building signs, followed by a long stack of
  generic directory cards—the exact pattern Ali had explicitly rejected.
- **Evidence observed:** The rendered Visitor Centre at desktop width, Ali's
  first-click review, its own building brief prohibiting unexplained numbered
  hotspots and long card rolls, and the status ledger claiming desktop/mobile
  QA had passed.
- **Diagnosis:** **Verified.** The gate checked implementation existence, not
  design comprehension, fidelity to the named exemplar or whether the first
  screen made the available actions self-evident.
- **Prevent / Fix:** A building cannot become `DONE LOCAL` from DOM/features
  alone. Require the named reference and current candidate at the same viewport
  in one comparison; test the arrival state and one real interaction; record
  the visible differences; and obtain Ali's approval on the first
  representative adaptation before propagating the pattern.
- **Why the fix works:** It makes the declared design objective—not code
  volume—the acceptance criterion, and stops one mistaken template from
  multiplying across the town.
- **New output:** Corrected programme/building ledgers, rejected Visitor Centre
  status and a recovery gate for the actual LIBRAiRY whole-room benchmark.
- **Transferable lesson:** A feature checklist can prove that controls exist.
  It cannot prove that a visitor understands or wants to use the page.
- **Internal rule/check updated:** `operations/MASTER-PROGRAM-TRACKER.md` and
  `operations/building-page-construction-status-2026-07-23.md`.
- **Public angle:** “Our QA passed the page the design brief had already
  rejected.”
- **Privacy/IP/reputation:** Use recreated/generic page fragments if published;
  do not expose private repository paths, unreleased features or Ali's raw
  review language without approval.

## BTB-051 · The red team protected the labels and lost the fashion show

`category: teaching · requirements traceability · review failure` — ② Make them speak yours
`source: Episode 5 Ali Gate 1 rejection, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** Rebuilding *The Super Models* after Ali had already developed a
  complete fashion-industry teaching system: fashion house, designers,
  lines, supermodels, seasons, stores, department stores, specialist shops,
  shopping service, budget, training photoshoot/poster, September-issue race
  and the reader as shopper.
- **Issue:** The architecture audit optimized for one narrow, testable
  capability—“read the label”—and explicitly tried to prevent “the whole
  industry” from being taught in Episode 5. The replacement then promoted its
  seven-question receipt from a useful consolidation exercise into the
  episode's governing structure.
- **What happens:** The approved concept remains scattered in source files,
  but the candidate Ali is asked to approve no longer teaches it. A technical
  and instructional red-team can still pass because both reviewers evaluate
  the narrowed replacement against its own assumptions rather than checking
  fidelity to the original brief or fit with the recurring story template.
- **Evidence observed:** `D-2026-07-24-004` and AW-001's completion contract
  list the full analogy; the older canon contains the house/line/star/season
  system; the arc audit says the narrower capability prevents “the whole
  industry” from being forced into one lesson; the replacement substance
  makes the receipt table its single mapping authority and defers or previews
  much of the approved system; the red-team report scopes itself to that
  replacement and does not test the recurring episode beats.
- **Diagnosis:** **Verified.** This was not context loss. It was an
  unauthorized scope optimization followed by a self-referential review. The
  work was preserved on disk but functionally ignored because no
  requirements-traceability matrix forced the new artifact to account for
  every approved element.
- **Contributing condition:** A substantial amount of unrelated strategy,
  operations, growth, site and season work happened between the rich Episode
  5 concept discussion and the replacement review. That made compressed
  shorthand such as “read the label” more locally prominent than the full
  creative reasoning. The gap did not remove the source material and does not
  excuse the scope change; it exposed the absence of a re-entry protocol that
  restores the full locked concept after intervening work.
- **Prevent / Fix:** Before a rewritten artifact can be called ready, map each
  approved requirement to retained, technically corrected, Ali-approved
  deferment or Ali-approved removal. Reviewers must receive the original
  brief, decision ledger and real delivery template—not only the candidate
  being reviewed. Technical red-teaming repairs factual seams inside the
  creative architecture; it does not get to replace that architecture.
- **Why the fix works:** Completeness and fidelity become inspectable. A
  candidate cannot pass merely by being internally coherent after silently
  shrinking the job.
- **New output:** Episode 5 Gate 1 rejected; active status corrected; concept
  fidelity gate added to the working agreement; a reusable fidelity packet
  with blind reverse-brief and four independent vetoes; Wednesday Engine hard
  stops for rejected substance or a missing/failed fidelity packet.
- **Transferable lesson:** A reviewer can make the wrong assignment extremely
  rigorous. Trace the rewrite back to the promise before polishing its logic.
- **Tips and tricks payload:**
  1. **Lock the promise before asking for a rewrite.** Save the original
     purpose, required ideas, examples and non-negotiables outside the chat.
  2. **Require a delta before a draft.** If the AI wants to simplify, defer or
     remove something, it must show the proposed change and consequence before
     making it.
  3. **Run a blind reverse brief.** In a fresh chat or isolated review, provide
     only the candidate and ask what assignment it appears to fulfil. Compare
     that answer with the locked brief.
  4. **Separate review questions.** “Is it accurate?”, “Is it still my idea?”,
     “Is it useful?” and “Does it fit the intended format?” are four different
     tests. Passing one cannot cancel failing another.
  5. **Demand anchors, not assurances.** For every non-negotiable, require the
     exact section where it does real work. A passing mention is not faithful
     implementation.
  6. **Watch for proxy takeover.** A measurable checklist, score or exercise
     can help test the goal without becoming the goal itself.
  7. **Do not automatically strip the creative device.** When an analogy is
     the explanation, test where it bends and repair it; do not demote it to
     decoration around a different lesson.
  8. **Rehydrate after a topic gap.** Reread the locked brief, decisions,
     approved examples and last approved artifact before continuing. Do not
     resume from a task title or one-line status summary.
- **Prompt readers can steal — before the rewrite:**

  > Treat the brief below as the locked source of intent. First extract its
  > purpose, required concepts, approved examples, format requirements and
  > non-negotiables. If you recommend narrowing, removing, deferring or
  > reinterpreting anything, show that as a proposed change with the reason and
  > consequence, then wait for my approval. Do not silently optimize the brief
  > into an easier assignment.

- **Prompt readers can steal — after the draft:**

  > Reverse-brief this draft using only what is actually on the page. Tell me
  > its apparent purpose, mental model, practical payoff, required audience
  > experience and main exercise. Then compare that inferred brief with my
  > original brief requirement by requirement. Cite exact sections as
  > evidence. Report mismatches plainly; do not defend the draft using the
  > writer's intentions.

- **Suggested reader test:** If the reverse brief describes a different
  assignment, stop. Do not spend another pass improving the prose.
- **Derivative ideas:** Field Note; carousel titled “Accurate. Polished. Wrong
  assignment.”; printable Locked Brief / Reverse Brief comparison card; short
  class on preventing scope drift in long AI chats.
- **Internal rule/check updated:** `operations/CODEX-WORKING-AGREEMENT.md`,
  `operations/ACTIVE-WORK.md`,
  `operations/checklists/episode-concept-fidelity-gate-template.md`,
  `operations/engine/Makefile`, `operations/engine/where.sh` and
  `content/episodes/episode-05.substance.md`.
- **Public angle:** “We protected every label and accidentally cancelled the
  fashion show.”
- **Privacy/IP/reputation:** Publish only after Ali approves the reconstructed
  episode; use generalized process artifacts rather than private conversation
  excerpts.

## BTB-052 · The safety fix was deployed; one old edge still spent money

`category: deployment · cost safety · verification` — ② Make them speak yours
`source: MAiKEOVER Worker safety deployment, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** Pausing the public MAiKEOVER portrait generator before a larger
  site reveal because one click made three paid image calls and the Worker had
  no hard budget circuit breaker.
- **Issue:** A successful deployment response was mistaken for proof that every
  edge location was already serving the new safety code.
- **What happens:** A live POST used as a verification probe can reach an older
  edge during propagation and execute the exact paid path the deployment was
  intended to stop.
- **Evidence observed:** The new Worker version deployed successfully and its
  downloaded source contained the disabled-generation gate, removed debug
  routes and strict origin rejection. An immediate disallowed POST briefly
  reached the prior version and generated one image. Version metadata then
  showed the new version at 100%, and subsequent verification used only
  read-only metadata/source checks.
- **Diagnosis:** **Verified.** “Deployment accepted” and “all edge locations
  now enforce the safety rule” are separate states.
- **Prevent / Fix:** For a cost- or security-safety deployment, verify version
  allocation and downloaded deployed source first; allow propagation time; use
  a harmless GET/status route for edge checks; never probe the paid mutation
  path until the safe version is confirmed at 100%.
- **Why the fix works:** Verification cannot recreate the incident the fix is
  meant to prevent.
- **New output:** Metered generation is disabled at the Worker, public debug
  routes are unreachable, unapproved origins are rejected and the page labels
  the portrait booth as temporarily closed.
- **Transferable lesson:** Do not test whether the emergency brake works by
  driving at the wall while the mechanic is still installing it.
- **Internal rule/check updated:** `worker-avatar/avatar.js`,
  `maikeover.html` and this ledger.
- **Public angle:** “Our safety test spent the money we were trying to stop.”
- **Privacy/IP/reputation:** Do not publish endpoint details, keys, account
  metadata or a recipe for bypassing the frontend.

## BTB-053 · The studio is not the website, and static links are not the whole runtime

`category: deployment · release engineering · QA` — ② Make them speak yours
`source: grand-reopening release build, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** The working repository contains public pages beside production
  masters, review films, rejected art, internal operations files and many
  generated alternates. Publishing the repository directly repeatedly
  exhausted the old deployment path.
- **Issue:** Two incorrect assumptions travelled together: that the repository
  itself was the deployable product, and that following literal HTML/CSS links
  would discover everything the browser needed.
- **What happens:** Copying the studio creates a multi-gigabyte release full of
  private or irrelevant material. Copying only literal links produces a neat
  smaller build that silently omits assets selected by JavaScript, cue sheets
  constructed from URL parameters, book covers loaded from data and reward art
  revealed only after interaction.
- **Evidence observed:** The source branch was several gigabytes and the prior
  Pages job failed with “No space left on device.” The first curated build was
  about 606 MiB and passed literal-link checks, but a browser crawl exposed
  missing Library covers, episode boxes, postcards and mall assets. The
  Screening Room then exposed a second runtime boundary: its constructed cue
  filename had not entered the artifact at all.
- **Diagnosis:** **Verified.** A release artifact needs both a denylist for
  studio-only material and an explicit manifest/transform layer for runtime
  dependencies.
- **Prevent / Fix:** Build from visitor-facing entry pages; reject internal
  directories, symlinks and oversized files; follow static dependencies; add a
  small reviewed manifest for data-driven collections; transform editions that
  exceed hosting limits honestly; then crawl the built artifact in a browser
  and compare every runtime asset path with the artifact before deployment.
- **Why the fix works:** Release scope becomes intentional and testable without
  pretending JavaScript is fully discoverable by a regex.
- **New output:** A repeatable curated public-site builder, public-size
  narration audio, honest narrated editions for Episodes 3–4, a 969 MiB
  Cloudflare Pages preview and an 85-page runtime-asset crawl with zero missing
  image paths.
- **Transferable lesson:** The film studio contains sets, raw footage and
  wardrobe racks. The cinema needs the finished programme and every reel it
  actually plays—not the whole backlot.
- **Internal rule/check updated:** `scripts/build-public-site.mjs`,
  `watch.html`, `content/episodes/episode-*-cues.json` and this ledger.
- **Public angle:** “We tried to publish the whole studio instead of shipping
  the movie.”
- **Privacy/IP/reputation:** Keep studio paths, unreleased masters and rejected
  assets out of public examples; use fabricated filenames in teaching
  screenshots.

## BTB-054 · The caption file existed, but the public path never mounted it

`category: accessibility · release QA · branching UI` — ② Make them speak yours
`source: Episode 01/02 Screening Room QA, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** The Screening Room can play a large review film or fall back to
  a public illustrated audio edition. Both paths displayed “read-along
  captions available.”
- **Issue:** The VTT files and caption-bar code were valid, but the caption bar
  was mounted only inside the unpublished full-film branch.
- **What happens:** File inventory and link checks pass while the visitor sees
  no captions on the actual public playback path.
- **Evidence observed:** Episode 01 and 02 narration loaded and played locally,
  their VTT files resolved, and the page advertised captions; DOM inspection
  showed zero caption bars until the audio branch received its own VTT parser
  and time-synchronised caption renderer.
- **Diagnosis:** **Verified.** Asset existence is not feature wiring, and
  testing one rendering branch does not validate its fallback.
- **Prevent / Fix:** For every public promise, test the exact visitor path and
  each active fallback. Assert the visible feature state in the browser—not
  merely that its source file exists.
- **Why the fix works:** The same caption source now feeds both the film and
  audio editions, while each branch mounts the renderer appropriate to its
  media element.
- **New output:** Episode 01 and 02 illustrated listen-alongs now display their
  existing read-along captions, including speaker labels, at 390px mobile.
- **Transferable lesson:** Owning the subtitles is not the same as putting them
  on the television.
- **Internal rule/check updated:** `watch.html` and this ledger.
- **Public angle:** “The captions were ready. The audience still couldn’t see
  them.”
- **Privacy/IP/reputation:** Use fabricated dialogue in any public demo rather
  than unreleased narration text.

## BTB-055 · The radio opened, but its first record never made it into the box

`category: deployment · runtime assets · release QA` — ③ Make it stick
`source: KSVL launch-preview interaction QA, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** The curated public builder follows visitor pages and copies
  referenced files into a hosting-safe artifact. KSVL assembles its broadcast
  queue in JavaScript from directory constants plus filenames.
- **Issue:** The dependency scanner recognized literal media URLs but could not
  resolve expressions such as `JINGLES_DIR + "station-id.mp3"`.
- **What happens:** The radio page and player controls load, so ordinary page
  and link checks pass. “Tune in” then requests a missing opener, receives the
  site's HTML fallback with a misleading 200 status and fails as unsupported
  audio before the first song.
- **Evidence observed:** Mobile interaction opened the KSVL player, then logged
  an audio error and `NotSupportedError`. The station-ID request returned
  `text/html` rather than `audio/mpeg`. All 83 computed audio dependencies
  existed in source, while 47 were absent from the curated artifact.
- **Diagnosis:** **Verified.** A successful HTTP status is not proof of the
  right asset, and source-code concatenation creates dependencies a literal
  URL scanner cannot discover.
- **Prevent / Fix:** Give runtime media collections an explicit release
  manifest or teach the builder to resolve the reviewed path constants. Add a
  validator that compares every KSVL queue URL against the built artifact,
  checks the expected audio content type and byte signature, then performs one
  real Tune In interaction before release.
- **Why the fix works:** The release contract tests the same computed queue the
  browser will play instead of hoping static extraction found it.
- **New output:** A complete 83-item source-versus-artifact inventory, simple
  computed-path resolution in the public builder and a validator requiring
  source-identical KSVL audio in the artifact. The repaired build played the
  station opener, DJ introduction and first song in browser QA.
- **Transferable lesson:** Shipping the jukebox is not shipping the records.
- **Internal rule/check updated:** `scripts/build-public-site.mjs`,
  `scripts/validate-ksvl-artifact.mjs`, the launch promise ledger and this
  ledger.
- **Public angle:** “The radio was live. The first record was still at the
  studio.”
- **Privacy/IP/reputation:** Public examples should use fabricated filenames
  and counts if the unreleased station catalogue is still private.

## BTB-056 · The dirty studio passed a test the clean release could not

`category: git · release engineering · verification` — ② Make them speak yours
`source: grand-reopening commit-derived build, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** The LAiDIES workspace contains tracked public source beside many
  untracked renders, review frames and studio-only media. Local validators had
  passed before the release commit was assembled.
- **Issue:** Those validators were reading the whole working directory, not the
  exact Git tree that would be pushed.
- **What happens:** Untracked files silently satisfy links and cue references.
  The local workspace looks complete while a clean checkout can be missing the
  same dependencies—or can incorrectly treat an internal review page as part
  of the public release.
- **Evidence observed:** A build from `git write-tree` failed where the dirty
  workspace passed. It exposed an `issue-03.pre-titlecard.html` review page in
  the live-page set and Episode 3/4 cue checks pointed at intentionally
  unshipped studio frames instead of the transformed narrated public editions.
- **Diagnosis:** **Verified.** “Tests pass locally” was too broad a claim
  because the test input was not the release input.
- **Prevent / Fix:** Before a push/deploy, archive the staged or committed tree
  into a clean temporary directory, run the source gates there, build the
  public artifact there, then run media/cue validators against that artifact.
  Compare its file hashes with the working candidate and deploy only the
  commit-derived artifact.
- **Why the fix works:** Every pass/fail result now describes the bytes Git and
  the host will actually receive.
- **New output:** `.pre-*` review pages are excluded consistently; the cue
  validator accepts an explicit artifact root; the pushed commit rebuilt 1,052
  public files identical to the browser-tested candidate.
- **Transferable lesson:** A clean dressing room is the only way to know what
  is actually in the suitcase.
- **Internal rule/check updated:** `scripts/build-public-site.mjs`,
  `scripts/check-local-links.js`, `scripts/check-episode-cues.js` and this
  ledger.
- **Public angle:** “The test passed because the missing file was hiding under
  the bed.”
- **Privacy/IP/reputation:** Never publish real private directory names or
  unreleased asset paths in the public explanation.

## BTB-057 · The route filter mistook the sitemap for a JavaScript property

`category: deployment · metadata · recovery paths` — ② Make them speak yours
`source: grand-reopening Cloudflare production-slot QA, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** The curated release builder uses one path normalizer for links
  discovered in page code and for known public root files.
- **Issue:** A defensive rule rejected strings shaped like `object.property`
  so JavaScript expressions would not become false missing-file reports.
  Root filenames such as `robots.txt`, `sitemap.xml`, `about.html` and
  `grimoire.html` have the same shape.
- **What happens:** The build reports no missing dependencies while silently
  omitting public entry pages and search/recovery metadata. Without a top-level
  404, Cloudflare Pages treats the deployment as a single-page application, so
  a broken or retired URL can return the homepage with HTTP 200.
- **Evidence observed:** The first exact artifact had 1,052 files but no
  `robots.txt`, `sitemap.xml` or `404.html`; `/grimoire.html` and an invented
  URL both displayed the homepage. Rebuilding the same commit reproduced the
  omission. The normalizer's dotted-identifier condition rejected each root
  filename before the queue could test whether the real file existed.
- **Diagnosis:** **Verified.** A heuristic written for references discovered
  inside code was incorrectly reused as the authority for explicit release
  entries.
- **Prevent / Fix:** Treat visitor entry pages and host control files as
  explicit release inputs. Apply the dotted-identifier guard only while
  parsing references inside another file; allow reviewed extensionless host
  files deliberately. Require the built artifact to contain canonical
  robots/sitemap output, a real 404 and named migration redirects, and verify
  their HTTP behaviour on the immutable edge.
- **Why the fix works:** Known release files can no longer disappear because
  they happen to resemble source-code syntax, while the reference scanner
  still ignores genuine property expressions.
- **New output:** A 1,083-file clean-commit payload with current sitemap URLs,
  Cloudflare `_redirects`, a branded recovery page and a dedicated metadata
  validator. The immutable production deployment returns text/plain robots,
  301 for retired Grimoire routes and HTTP 404 for unknown routes.
- **Transferable lesson:** Do not ask the coat-check scanner to decide who was
  invited to the party. Discovery heuristics and explicit release manifests
  solve different problems.
- **Internal rule/check updated:** `scripts/build-public-site.mjs`,
  `scripts/validate-public-metadata.mjs`, `_redirects`, `404.html`,
  `sitemap.xml`, D-2026-07-24-024 and the launch cutover playbook.
- **Public angle:** “Our sitemap looked too much like JavaScript, so the
  website left it at home.”
- **Privacy/IP/reputation:** Public examples should use fabricated project
  names and routes; do not expose unpublished infrastructure identifiers.

## BTB-058 · The suggested question failed its own search

`category: search · UX · testing` — ② Make them speak yours
`source: LIBRAiRY production-candidate accessibility pass, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** The LIBRAiRY places suggested plain-language questions directly
  above Miss Jeeves' search results.
- **Issue:** The visible button said “what's a hallucination?” but the search
  index was tuned to “what is a hallucination?”
- **What happens:** The interface's own recommended action returns plausible
  but unrelated results, even though typing the expanded wording returns the
  correct glossary entry, episodes and activity.
- **Evidence observed:** Clicking the contraction returned *The Founding
  Mothers*, Model, Context, Agent and Visitor Centre. Entering “what is a
  hallucination?” returned Hallucination, Episode 2, Dream Phone and related
  learning paths.
- **Diagnosis:** **Verified.** Token matching treated `what's` and `what is` as
  different input; the suggested control had never been tested through the
  actual result state.
- **Prevent / Fix:** Normalize common contractions before tokenization and
  click every suggested search/question control as part of the release
  journey—not only a hand-typed ideal query.
- **Why the fix works:** The reader can phrase the question naturally while
  the index receives the stable wording its aliases expect.
- **New output:** The unchanged visible suggestion now returns Hallucination
  first, followed by relevant episodes and Dream Phone.
- **Transferable lesson:** Example prompts and suggested questions are product
  promises. Test the exact words on the button.
- **Internal rule/check updated:** `library.html`, the production-candidate
  browser checklist and this ledger.
- **Public angle:** “Our search understood hallucinations, but not apostrophes.”
- **Privacy/IP/reputation:** No user search history or private query data is
  needed for the public example.

## BTB-059 · Seven correct-looking characters hid the wrong commit ID

`category: deployment · provenance · verification` — ② Make them speak yours
`source: Cloudflare Pages accessibility release, 2026-07-24`
`publication status: VERIFIED — INTERNAL CONTROL`

- **Context:** Wrangler accepts an optional full commit hash when uploading a
  direct Pages artifact, while the deployment list displays only its first
  seven characters.
- **Issue:** The command used the correct short prefix followed by a
  hand-written, unverified suffix.
- **What happens:** The host UI looks correct because the visible prefix
  matches, but the hidden deployment provenance is inaccurate.
- **Evidence observed:** Git returned
  `59758f5be9539bed95f056855ad9d214f851876e`; the first upload had been given a
  different long value beginning with `59758f5`. The exact same 1,083-file
  artifact was immediately redeployed using the SHA returned by
  `git rev-parse`, with zero asset bytes re-uploaded.
- **Diagnosis:** **Verified.** An abbreviated identifier was treated as if its
  unseen characters could be safely reconstructed.
- **Prevent / Fix:** Resolve the full SHA inside the deployment command with
  `git rev-parse <commit>` and pass that value directly. Never type or
  hand-extend it.
- **Why the fix works:** Git, rather than human memory, supplies the provenance
  identifier attached to the immutable release.
- **New output:** Corrected production deployment
  `1cf53be9-9946-4da8-8136-3cd0136f4272`, tied to the exact full source commit.
- **Transferable lesson:** A shortened identifier is a label, not the missing
  half of a fact.
- **Internal rule/check updated:** D-2026-07-24-025 and
  `operations/launch/sunnyvaile-production-cutover-playbook.md`.
- **Public angle:** Keep internal unless generalized as “never autocomplete an
  ID by hand.”
- **Privacy/IP/reputation:** Do not publish account IDs or private repository
  details.

## BTB-060 · A finished launch package still needed a key to the front desk

`category: launch operations · integrations · social publishing` — ② Make them speak yours
`source: SUNNYVAiLE grand re-opening publication pass, 2026-07-24`
`publication status: VERIFIED — INTERNAL CONTROL`

- **Context:** The website cutover, production-origin smoke test, final copy,
  ruled assets, UTM links and publish order were all complete.
- **Issue:** Channel publication was left until the end without first proving
  that the execution environment could access an authenticated Instagram or
  LinkedIn publisher.
- **What happens:** The launch is publicly ready and the campaign is truthful,
  but the final external action cannot be completed automatically. A vague
  “announcement ready” status can be misread as “announcement published.”
- **Evidence observed:** No Instagram/LinkedIn connector was available; the
  in-app browser reached Instagram's login screen; Chrome was running but the
  ChatGPT Chrome Extension was not installed in the active profile. No social
  post was created.
- **Diagnosis:** **Verified.** Content readiness and channel readiness are
  separate dependencies. Authentication cannot be safely improvised or
  inferred from an open browser.
- **Prevent / Fix:** Add a reversible channel-access check near the start of a
  launch window: publisher/connector available, correct account visible, media
  upload supported and final publish permission explicit. Keep copy/assets
  ready independently, and record `ready_to_publish` separately from
  `published` with the resulting post URL and timestamp.
- **Why the fix works:** An access problem is discovered while other launch
  work can still proceed, and nobody mistakes a prepared campaign for an
  audience-facing result.
- **New output:** Production cutover evidence now names the exact social-access
  blocker; the campaign packet says READY TO PUBLISH and leaves channel URLs
  blank until a real post succeeds.
- **Transferable lesson:** Pack the invitation, test the venue, and make sure
  someone actually has the key before opening night.
- **Internal rule/check updated:** grand-reopening launch packet, production
  cutover evidence and this ledger.
- **Public angle:** Potential Behind the Build note: “Ready to publish is not
  published.”
- **Privacy/IP/reputation:** Never inspect saved passwords, cookies or private
  browser stores; use authenticated connectors or visible signed-in sessions.

## BTB-061 · The reference desk returned destinations instead of an answer

`category: search · UX · information architecture` — ② Make them speak yours
`source: LIBRAiRY Miss Jeeves owner review, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** Miss Jeeves invites visitors to ask plain-language questions and
  describes the LIBRAiRY promise as “come in with a question and leave with the
  one answer.”
- **Issue:** Even when a suggested question had one exact catalogue match, the
  remaining ranking rewarded high-frequency words such as “AI” across the
  entire town index.
- **What happens:** “Will AI take my job?” returned one relevant reference book
  followed by generic buildings, activities and episodes. The interface looked
  busy and plausible but never answered the question it had invited.
- **Evidence observed:** Owner review showed FAiRY Godmother, SUNNYVAiLE High
  and MAiKEOVER among the six results. The repaired journey gives a direct,
  plain-language answer first and only two job-specific sourced follow-ups.
- **Diagnosis:** **Verified.** A site-search catalogue was being presented as a
  question-answering reference desk. Exact-match ranking alone could not fulfil
  that product promise, and generic domain words amplified irrelevant results.
- **Prevent / Fix:** Treat every suggested question as a curated intent with a
  direct answer and a very small ruled set of relevant sources. Keep catalogue
  search as the fallback for open-ended lookup, remove domain-wide stopwords
  from fallback scoring, and test the usefulness—not merely the presence—of
  the returned items. For every curated answer, click every downstream route
  and verify the destination ID, section heading and editorial label; the
  integration review caught one nonexistent book ID and one mislabeled episode
  link after the answer cards themselves had passed. A fresh primary-source
  check also found that the linked Stanford evidence had moved from the book's
  older 13% figure to 16% and described employment, not hiring; the direct
  answer and both book sources were reconciled before release.
- **Why the fix works:** The direct intent layer fulfils the promise immediately;
  the catalogue remains available without being mistaken for an answer engine.
- **New output:** Four suggested questions now return direct answers, open the
  relevant in-room book section where applicable, and announce their changed
  result through a polite live region.
- **Transferable lesson:** A list of places that might contain an answer is not
  the answer.
- **Internal rule/check updated:** `library.html`, the LIBRAiRY interaction QA
  checklist and this ledger.
- **Public angle:** “Our librarian knew where every book was—and still did not
  answer the question.”
- **Privacy/IP/reputation:** The curated examples use no visitor query history;
  future analytics must not capture raw personal questions by default.

## BTB-062 · The answer opened in a different website

`category: design systems · interaction states · visual QA` — ② Make them speak yours
`source: LIBRAiRY sourced-answer owner review, 2026-07-24`
`publication status: VERIFIED — FUTURE FIELD NOTE CANDIDATE`

- **Context:** Miss Jeeves had been repaired to return one relevant,
  well-designed answer, with a link into the supporting source book.
- **Issue:** The supporting reader retained a legacy burgundy, beige and
  candy-stripe system, plus a long contents rail that buried the selected
  answer.
- **What happens:** A coherent, trustworthy interaction abruptly appears to
  leave the product. The visual discontinuity makes the source feel less
  credible and turns “go deeper” into more work.
- **Evidence observed:** Owner review compared the Miss Jeeves answer panel
  with the opened book and rejected the latter as “absolutely hideous.” The
  repaired direct-answer path now opens only the requested sourced section in
  the same midnight, white, cyan and vivid-accent grammar; shelf-selected books
  still preserve the complete reference-book path.
- **Diagnosis:** **Verified.** The modal had been treated as a self-contained
  decorative object instead of a state of the Library experience.
- **Prevent / Fix:** Every overlay, reader and detail state must inherit the
  tokens and hierarchy of the surface that launches it. QA the trigger and
  destination together at the same viewport. When the trigger promises one
  answer, do not open an unfiltered corpus.
- **Why the fix works:** The handoff preserves context, reduces irrelevant
  choice and lets the evidence—not a competing visual theme—carry the weight.
- **New output:** Focused sourced-reader mode, refreshed full-book mode, vivid
  result-type palette and paired source/build QA evidence.
- **Transferable lesson:** A component is not coherent because it is polished;
  it is coherent when it still belongs to the journey around it.
- **Internal rule/check updated:** `library.html`, `design-qa.md` and this
  ledger.
- **Public angle:** “The answer was right; the doorway made it feel wrong.”
- **Privacy/IP/reputation:** No personal visitor query data was added or
  retained.
