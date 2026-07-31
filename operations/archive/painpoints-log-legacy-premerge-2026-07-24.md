# Behind the Scenes — painpoints log

**What this is:** a running log of real problems hit while making AI content (episodes, images, video) + how to actually fix them. Source material for the site's **Behind the Scenes** tips & tricks — teaching from lived experience, not theory. On-brand: *"I make the mistakes so you can skip them."*

**The big idea (the spine of the whole feature):** working with AI is a two-way translation problem, and every tip here is one of two moves —
- **① Speak their language** — adapt how *you* communicate: explain what you mean so a thing that can't see what you see (and can't read your timing) actually gets it. Be specific, anchor your references, send one clear message.
- **② Make them speak yours** — build the tools that translate human intent into machine terms: text templates, a trained character lock, a deterministic assembler. The original version of this move is **Grace Hopper's compiler** — she refused to write raw machine code and built the thing that let people program in plain words. *She made the machine understand us.* (And she's one of our Founding Mothers — Ep4.)

Tag each entry with which move it is (① or ②) alongside its category.

**Entry template (Ali's format — keep every entry in this shape):**
- **Context** — what you're doing / the setup
- **Issue** — the problem, one line
- **What happens** — the symptom you actually see
- **Example** — a concrete instance (real, from our work)
- **Prevent / Fix** — the actual move: what to type, how to use it, a different tool
- **New output** — the better result you get

Tag each with a `category` so the site can filter (character · text · timing · relevance · style · motion · workflow).

---

## 1. Recaps get redrawn instead of reused
`category: workflow · character`
- **Context:** Weekly episode that opens with a recap of last week.
- **Issue:** The AI re-generates the recap images from scratch.
- **What happens:** The recap drifts off-model — faces change, details flip between shots, and you burn iterations re-rolling something that already existed correctly.
- **Example:** Ep4's recap redrew the Ep3 "PERM ≠ SHOWER" shot *twice* — once brown-eyed, once blue-eyed — neither matching the real Ep3 frame.
- **Prevent / Fix:** Never generate a recap. Reuse the actual exported frames/clips from the previous episode — they're already on-model and consistent. Drop them straight into the timeline.
- **New output:** A recap that's identical to what viewers already saw. Zero drift, zero re-rolls.

## 2. The recurring character's face keeps changing
`category: character`
- **Context:** Your host/heroine appears across dozens of generated shots.
- **Issue:** Each render makes her a slightly (or very) different person.
- **What happens:** Face shape, features, even eye color shift shot to shot. Full-screen, viewers clock it instantly.
- **Example:** Ep4's heroine looked like a different woman at the corporate desk vs. the salon — "big head," wrong eye color, wrong vibe.
- **Prevent / Fix:** Lock her with a trained model (a LoRA) on ~20 clean images of *her* across outfits, and generate through it. Also hard-code her fixed traits in every prompt (e.g. "blue eyes"). Re-prompting a general model just re-rolls the face each time.
- **New output:** The same recognizable person in every shot.

## 3. Text baked into images is ugly, wrong, or inconsistent
`category: text`
- **Context:** You want a title card or caption ("I couldn't help but wonder…") on a scene.
- **Issue:** The image model *draws* the text — bad fonts, wrong words, misspellings, different every time.
- **What happens:** Text looks boring/off-brand, sometimes misspells your own brand, and never matches episode to episode.
- **Example:** Codex kept rendering the sign as "LUM*i*NAiRY," and the "couldn't help but wonder" card came out ugly and badly laid out.
- **Prevent / Fix:** Don't let the image model render important text. Add it as a real typography layer in your editor (CapCut / Figma) over the image — you control font, spelling, layout, and can save templates. For logos, overlay the actual logo file, never a drawn version.
- **New output:** Crisp, correctly-spelled, on-brand text — identical across every episode.
- **NUANCE (Ali 2026-07-17):** baked-in text is *good* when it **adds to the scene** — funny signs, book spines, notices, posters. Those rich details are wanted. The real rule is just **legible + correctly spelled, not gibberish** — and it's *tool-dependent*: **Codex/SOL renders text well** (so let it do character text), while **gpt-image-1 mangled it** (why you'd avoid *that* tool). So: right tool → welcome the funny in-scene text; still **double-check brand-critical wordmarks** (LIBRAiRY, LUMINAiRY, laidies.ai) since even Codex slips occasionally, and use a real overlay only for those must-be-perfect ones.

## 4. Timing is off and won't stay fixed
`category: timing · workflow`
- **Context:** Assembling narrated scenes into a video.
- **Issue:** A caption lands too late or lingers too long — and fixing one thing breaks another.
- **What happens:** Endless iterations, because each re-roll re-times the *whole* video, so fixes never stick.
- **Example:** Ep4 — "JUST USE AI" needed to hit 2s earlier; "JUST USE INTERNET" sat on screen ~30s too long; fixing images kept un-fixing the timing.
- **Prevent / Fix:** Separate timing from images. Lock timing on the editor timeline (or a cue sheet) and assemble deterministically. To fix a scene, *replace that one clip* — don't regenerate the whole video.
- **New output:** Timing you set once that stays put; surgical one-clip fixes.

## 5. The image doesn't match what's being said
`category: relevance`
- **Context:** Picking a visual for a specific narration beat.
- **Issue:** The image shows concepts you haven't taught yet, or something unrelated.
- **What happens:** It confuses viewers and undercuts the lesson.
- **Example:** At 1:56 in Ep4, the shot showed a stack of "Machine Learning / Deep Learning / Algorithms" books during a beat that hadn't introduced any of it.
- **Prevent / Fix:** Write each image prompt *from the exact sentence* being narrated there. Before placing any image, check it against "what has the viewer actually learned by this point?"
- **New output:** Every visual reinforces the precise thing being said.

## 6. A scene just sits there (no motion)
`category: motion`
- **Context:** A scene that holds on screen for several seconds.
- **Issue:** It's one static still while other scenes have movement.
- **What happens:** Energy is inconsistent; the dead scene reads as unfinished.
- **Example:** Ep4's ENIAC Six scene was a single static image the whole time; every other segment moved.
- **Prevent / Fix:** Require ≥1 moving element per scene (flashing light, drifting steam, a subtle push-in). If the generator won't animate it, add a slow zoom/pan in the editor.
- **New output:** Every scene feels alive, with consistent energy.

## 7. Same "style," different looks
`category: style`
- **Context:** Generating many images meant to share one art style.
- **Issue:** Some come out in a noticeably different finish than others.
- **What happens:** The video looks like two shows spliced together.
- **Example:** Ep4's office scenes rendered smooth/painterly while the town scenes were heavy pixel-dither — same episode, two styles.
- **Prevent / Fix:** Lock the style (reference/LoRA) *and* apply your signature texture as a uniform post-process to every frame, instead of hoping each generation matches.
- **New output:** One consistent look across the whole piece.

## 8. Describing a fix the way it's obvious to *you*
`category: prompting`
- **Context:** You're looking at a generated image and want to fix one specific thing in it.
- **Issue:** You describe it the way it makes sense *to you looking at the picture* — but the model can't see what you see. It has no shared view, no idea what you're pointing at.
- **What happens:** The model guesses wrong — changes the wrong element, or changes everything — and you've burned a re-roll and made it worse.
- **Example:** Looking at the shot, "fix the squares on the other buildings" was crystal clear *to me*. To the model it's meaningless — which squares? which buildings? fix *how*? What actually worked: *"there are square designs on the store signs on the buildings on either side of Mme CLAi-O's — remove that decoration from the signs, it looks weird."*
- **Prevent / Fix:** Describe the fix like you're on the phone with someone who can't see the screen. Name four things: **WHAT** (the exact element — "square designs"), **WHERE** (anchored to a landmark it knows — "on the store signs, buildings on either side of Mme CLAi-O's"), **the ACTION** (remove / change to / move), and **WHY** if it helps ("it looks weird"). Ban pointing words — "the other," "those," "that one" — they have no shared referent.
- **New output:** The model changes the one thing you meant, and only that.

## 9. Texting an agent in bursts while it's already working
`category: workflow · prompting`
- **Context:** You're in a chat with an AI agent and you type the way you text — several short messages back to back, one thought each.
- **Issue:** The agent starts working the instant you send message 1. Your 2nd and 3rd messages arrive *after* it's already moved on, so it reads them against the wrong thing.
- **What happens:** It assumes your later message is about whatever it's doing *now*, not what you actually meant — so it "fixes" the wrong thing or veers off in a direction you never intended.
- **Example:** Firing off "fix the sign" → "on the left one" → "actually just delete it" — by the time it reads the third message it's already re-rendered the wrong sign from the first, and now thinks "delete it" means something else entirely.
- **Prevent / Fix:** Two moves. (1) Put the whole thought in **one message** before it starts — collect your bursts, then send. (2) If you must follow up mid-task, **anchor it**: start with "re: the trailer sign —" or "still about the recap:" so it re-locates what you mean instead of guessing. You can also just say "hold on, don't start yet."
- **New output:** The agent acts on what you actually meant, in the right context — no whiplash.

## 10. Taking "it's done / all wired up" at face value
`category: workflow` · move ①
- **Context:** An AI agent (or a collaborator) builds something and reports it's finished — "it's all wired up," "done," "working."
- **Issue:** You accept the confident statement without probing or asking to *see* it work — partly because it sounds done and you want it to be.
- **What happens:** Later you find out it was only kind-of built, or never actually worked. By then it's buried under everything you built on top, harder to fix, and trust takes a hit.
- **Example:** "The Council" — I was told it was all wired up. In reality it was kind of built but not actually working. I accepted the statement and only found out later. (Same thing happened this week: an agent called videos "90%, one fix from launch" from thumbnails — full-screen, they weren't.)
- **Prevent / Fix:** Don't accept "done" — make it **show you**. "Walk me through it working, end to end." Ask probing questions: *What exactly did you test? What's the real output? What did you NOT do — what's stubbed or faked?* Confident wording isn't evidence; a working demo is. And make the agent state plainly what it **verified** vs. what it **assumed**.
- **New output:** You catch the gap while it's cheap to fix — and "done" actually means done.

## 11. Assuming a thing runs just because it exists
`category: workflow` · move ①
- **Context:** You (or an agent) build a feature/agent/automation, and you assume it's now working.
- **Issue:** Building or *defining* something isn't the same as it being turned on. Lots of things have to be explicitly engaged / triggered / connected — they don't auto-run just because they exist.
- **What happens:** It sits there doing nothing while you think it's live. You find out much later that nothing was ever calling it.
- **Example:** Built "the Council" agent and assumed it would just work — but nothing was engaging it, so it never actually ran. (This is a mistake that trips up professional engineers too — "it compiles" ≠ "it runs" ≠ "it's wired to everything else.")
- **Prevent / Fix:** For anything built, ask one question: *"What actually triggers this — and is that trigger connected right now?"* Make the agent state the **status**, not a vibe: is this **LIVE**, or **built-but-not-engaged** (and if so, what turns it on)? Built ≠ running ≠ wired.
- **New output:** You always know what's actually running vs. sitting dormant — no false "it's handled."

## 12. "I set up agents / context files — why don't they just run on their own?"
`category: workflow` · move ②
- **Context:** You hear about setting up agents, personal context files, agentic workflows with an orchestrator. You do the setup and expect to walk away and have them just run — all the time, together, without asking.
- **Issue:** Setting up an agent or writing a context file is **not** the same as building a running system. A context file is *instructions* that shape an agent **when it's invoked** — it does nothing on its own.
- **What happens:** You think you built an autonomous orchestrated crew; really you wrote the *description* of one, in chat windows. Nothing runs unless something triggers it, and you have no visibility because the chat window is the only interface — the agent can't reach out to you.
- **Example:** "The Council" *felt* built — but there was no scheduler, no always-on runner, no wiring, no way for it to ping me. It was a recipe, not a chef in the kitchen. **Contrast:** "Hot Goss Daily" is a *real* autonomous agent — a GitHub Action that runs on a daily schedule, on a server, calls the AI, updates the site, with zero input. It works *because* it's wired into infrastructure.
- **Prevent / Fix:** Learn the difference. A config/context file = a **recipe** (how to behave when called). A running agent = recipe **+ an always-on runner + a scheduler/trigger + wiring + a way to notify you.** Ask of anything you "set up": *What triggers this? On what schedule? Running where? How does it tell me it did something?* No answers = it's a recipe, not a running system. "Set it and it runs" needs infrastructure, not just setup.
- **New output:** You know whether you built a *description* or a *running system* — and you stop expecting a config file to behave like deployed infrastructure.

## 13. Same prompt, different model = a totally different look
`category: style` · move ②
- **Context:** You have a house style you love (made by one tool) and try to generate matching images with a *different* tool.
- **Issue:** Every image model has its OWN signature look baked in. The same prompt in a different model comes out in *that model's* style, not yours — no amount of prompting overrides it.
- **What happens:** You nail the prompt and it *still* looks off — flatter, more cartoon, different rendering — because the **tool** is wrong, not the words.
- **Example:** SUNNYVAiLE's look (the Fairy Godmother house) was made in Codex's model — crisp, painterly, dimensional depth. The exact same scene, exact same direction, run through **gpt-image-1** came out flat and cartoon-drawing-looking. Right prompt, wrong renderer.
- **Prevent / Fix:** Match the **model** to your established style, not just the prompt. Find out which tool made the look you love and use *that* (or one that renders the same way — e.g. a Flux/Midjourney-class model for painterly depth, not gpt-image-1's flat-graphic look). The prompt controls *content*; the model controls the *look*.
- **New output:** Images that actually match your house style, because they're made by the tool that makes that style.

## 14. The AI reaches for the complex solution — your simpler idea is often right
`category: workflow` · move ①
- **Context:** You have an idea for how to solve something and you run it past the AI.
- **Issue:** The AI tends to reach for a more **complex, external, or paid** solution (a new API, a new tool, a new service) when a **simpler one you already have** would work just as well.
- **What happens:** If you don't push back, you build the complicated thing — more cost, more moving parts — when your simpler idea was as good or better.
- **Example:** The copy-paste-to-Codex problem. Claude proposed generating images through an external/paid API. The *simpler* answer — which **Ali** had — was: "Codex and Claude can both read/write the **same repo**; just set up a shared folder." Her idea was better *and* cheaper. It only surfaced because she knew enough about repos to keep pushing on it.
- **Prevent / Fix:** When the AI proposes something, ask **"is there a simpler way using what I already have?"** and *push your own idea* — you have context the AI doesn't (your tools, your setup, your budget). This is why learning the basics pays off directly: knowing what a repo is, or what your tools can do, is what lets you catch the AI over-engineering. You don't need to know a lot — you need to know enough to push.
- **New output:** The simplest thing that works, built on what you already have — not an over-engineered one.

## 15. Editing an already-generated image stacks quality loss — go back to the cleanest source each time
`category: style` · move ②
- **Context:** You have an image you like and want a small fix (remove one object, swap a detail). You ask the AI to edit *the edited version*, then edit *that*, building a chain.
- **Issue:** Each edit pass **re-renders the whole image**, so it re-interprets everything — not just the part you changed. Texture noise, mottling, and softness accumulate with every generation, even on the areas you wanted left alone.
- **What happens:** After two or three edits the picture looks subtly worse — grainier, more mottled, less crisp — than the first render, and you can't tell why. The *content* changed correctly but the *quality* quietly degraded.
- **Example:** The Grace comic bar-setter. v1 was the cleanest render. v2 swapped the form photo, v3 removed it — each built on the prior output. By v3 the whole frame read "a bit more mottled" than v1. Ali caught it: "first one it made looked better — it just needs to remove the image." Fix = throw away the chain, edit **v1 directly** in one pass for the one change.
- **Prevent / Fix:** Always edit from the **cleanest earlier version**, not the latest edited one — and **minimize the number of passes**. One base + one targeted edit beats a chain of three. Tell the model to keep everything else unchanged and avoid adding grain/mottling. If a frame needs several fixes, batch them into a single edit off the clean base rather than sequential re-edits.
- **New output:** The fix you wanted *and* the crispness of the original — because you edited the clean source once, not a stack of re-renders.

## 16. Generating a scene from scratch drifts on BOTH style and canon — restyle a reference instead
`category: style` · move ②
- **Context:** You have a locked style (from restyling one image) and you ask the tool to generate a brand-new scene from a text prompt — new setting, new character pose, everything.
- **Issue:** From a blank canvas the model invents *everything* it isn't pinned on — so it drifts off your style AND makes up world details you never asked for (fake storefronts, fake signage, wrong architecture). A text prompt can't hold a specific established look or a specific fictional place.
- **What happens:** The render comes back softer/different from your locked style, and the background is a plausible-but-wrong version of your world — named shops that don't exist, a town that isn't yours.
- **Example:** The daytime "color-setter." The Grace frame locked the comic look by *restyling an existing image* (composition + setting fixed, only rendering changed). The daytime frame was generated *from scratch* — it came back as soft glossy illustration (off the bold-ink anchor) and invented a whole SUNNYVAiLE Main Street ("Dial-Up Cafe," "Sunnyvale Video") that isn't canon. Color was the only part that landed.
- **Prevent / Fix:** Pin what must not drift. (1) **Restyle an existing correct image** rather than generate from zero whenever possible — it holds composition, setting, and style far better. (2) If you must generate new, **feed the actual reference** for anything canonical (the real building art, a character sheet) as an input image, and tell it to use that, not invent. (3) Never let it free-invent named/world details — either supply them or leave the background generic.
- **New output:** Renders that stay on-style and on-canon, because the model is *converting* a correct reference, not inventing a world from a sentence.

## 17. Describe a style DETAIL in words (and be structural) — don't feed an image ref that can steal the face
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

## 18. Change ONE thing at a time — a style reference gets outnumbered by stacked new instructions
`category: style` · move ②
- **Context:** You give the tool a style reference to match, but in the *same* prompt you also ask for a new character, a new outfit, and new lighting/setting.
- **Issue:** A single style reference can't hold the line against several simultaneous "make it new" instructions. The model spends its effort inventing all the new *content* (new person, new clothes, new bright daylight) and the style anchor gets **diluted** — it drifts off the look you were matching.
- **What happens:** You showed it the right style and it *still* came out wrong, and it's baffling — because the style ref was outnumbered, not ignored. Too many changed variables at once.
- **Example:** The heroine reference. The prompt showed Grace as the style target BUT also asked for a new character + new outfit + bright daytime (Grace is moody/night). Result drifted smooth/clean, off Grace's inked grit. Ali's diagnosis: "showing grace as target but then also telling it to make it bright and daytime plus a new character and outfit was probably the cause." Fix = isolate: restyle the existing v2 (change ONLY the rendering, hold character/outfit/lighting) — one variable.
- **Prevent / Fix:** **Change one variable at a time.** To match a style, hold everything else constant and convert an existing correct image (change only the rendering). To change an outfit, hold the style and character constant. Don't combine "match this style" with "new subject + new outfit + new lighting" in one shot — split it into steps, locking each before adding the next.
- **New output:** The style actually transfers, because it isn't competing with three other fresh demands in the same prompt.

## 19. Comic texture stamped on bare skin reads as a rash — and restyling can drop resolution
`category: style` · move ②
- **Context:** You ask for a gritty comic/halftone look, and/or you keep restyling the same image to refine it.
- **Issue (a):** The model applies **halftone / ben-day dots literally to bare skin** (legs, arms) as an all-over pattern, so the skin reads like a mesh or a rash instead of shading. **Issue (b):** each restyle pass can come back **lower-resolution / softer** than your target, and you don't notice until you compare side by side.
- **What happens:** The style is *right* but the details are off — dotted-looking legs, and an overall softness that looks low-res next to your reference.
- **Example:** Heroine re-grit v3 nailed the comic ink, but ben-day dots were stamped on her thighs (rash-like when zoomed) and it output at 1672×941 vs the Grace anchor's 1920×1080 — visibly softer.
- **Prevent / Fix:** (1) Tell it to keep **skin smooth** (soft/fine shading), and **reserve halftone for clothing shadows, background, and deep shadow — never an all-over dot pattern on bare skin**; point at a reference whose skin is rendered the way you want. (2) **Specify a target resolution** (e.g. ≥1920 wide) and match it to your anchor, and redo from the **cleanest source** rather than restyling a restyle (see #15).
- **New output:** Comic grit where it belongs (fabric/shadow), smooth skin, and crispness that matches your other frames.

## 20. Shadow color comes from the LIGHT, not the object — "darker skin" shadows go bronze
`category: style` · move ②
- **Context:** You're directing comic/graphic-novel shading and you (or the tool) shade things by darkening the object's own color.
- **Issue:** Real shading color comes from the **light source + ambient**, not "a darker version of the object." Shade a face with a darker *skin* tone and it reads like **bronze / bad makeup**. Most comic shading actually uses a **neutral cool grey** shadow tone over the flat color (plus black ink) — that's why it looks clean. And shadow *depth* should match how lit the scene is (a dark scene = little facial shadow, and that's correct).
- **What happens:** Faces come out muddy/bronze, shadows look like dirt, and it fights the clean comic look you wanted.
- **Example:** Heroine reference. Prompt said shade with "a darker shade of the local color," incl. skin — risked a bronze bad-makeup face. Ali, checking the comic reference examples: "the shading looks more grey," and from Grace: the glow on her back was bright BLUE because the light came from behind (shadow/rim color = the light's color, not "darker navy").
- **Prevent / Fix:** Default comic shadows to a **neutral/cool grey** over the base color + black ink linework; keep the **face light**, grey-shaded, never a darker-skin shadow. Let **scene light tint** shadows/rims where there's a clear source (a blue backlight → a blue rim-glow). Match shadow **depth** to the scene's brightness. Point at a reference whose shading you like and name its tone (grey, not saturated).
- **New output:** Clean comic shading that reads as light and form — not a bronze, muddy face.

## 21. Clean-from-scratch character art comes out "plasticy" — convert from a textured source instead
`category: style` · move ②
- **Context:** You want a hand-drawn/inked comic look, and you generate the character clean from scratch (blank background, full body) and keep re-prompting to fix the rendering.
- **Issue:** Clean generations tend to default to a **smooth, glossy, 3D-render "plasticy" look** — soft sheen skin, even gradients — and no amount of prompt wording ("flat", "inked", "matte", "angular shadows") reliably pulls it out of that. The base render is the bottleneck, not the words.
- **What happens:** Round after round of "it's still too plasticy / the shading's not hitting the mark," because you're fighting the generation's default finish.
- **Example:** The heroine character sheet went plasticy across many versions. Meanwhile the Grace frame held a proper inked/graphic-novel finish the whole time — because Grace was **converted from an already-inked, textured source image**, not generated clean.
- **Prevent / Fix:** Don't try to prompt a clean generation into looking inked. **Start from a frame that already has the texture/ink you want and convert it**, OR perfect the style on your best-textured frame first (lock it), then **transfer that treatment onto the new subject** rather than generating the new subject clean. The source's finish carries through; a blank canvas defaults to plastic.
- **New output:** Characters that actually look inked/drawn, because the render started from ink — not from a smooth blank generation you kept arguing with.

## 22. Prompting can't lock an art style across subjects — the model has a "default look" it snaps back to
`category: style` · move ②
- **Context:** You have one image in exactly the style you want and you try to get the *same* style on a new subject (a different character) by describing the style and pointing at the reference in the prompt.
- **Issue:** Image models have strong **default styles they fall into for certain subjects** — e.g. a "clean, smooth, pretty" look for young women. Referencing your target tells the model what to *aim* for, but the default keeps pulling the render back. So the two images end up in visibly different styles even though you referenced one from the other. No amount of prompt wording reliably overrides the default.
- **What happens:** Round after round, the new subject comes out in the model's default look, not your reference's look — and side by side they clearly don't match. (We spent ~15 rounds on this before seeing it.)
- **Example:** A gritty inked graphic-novel scene ("Grace") vs a new character in the same intended style — the character kept coming out clean/flat/webtoon no matter the prompt, because that's the model's default for a young woman. Grace only held the style because it was *converted from* an already-gritty image, not generated fresh.
- **Prevent / Fix:** For a *one-off*, convert an existing image that already has the look rather than generating clean. But to lock a style **across many images and subjects**, stop prompt-wrestling and **train a small style model (a LoRA / fine-tune) on a handful of on-style frames** — then every generation is in that style because the style is baked into the model, not the prompt. (Train it on GOOD, approved frames — a lock trained on rejected/off-style frames just reproduces the wrong thing.)
- **New output:** One consistent house style across every character and scene, one-click — because the style lives in a trained model instead of a prompt you have to win every single time.

## 23. Curate the reference set to your target register — a mixed set drags the output toward its loudest members
`category: style` · move ②
- **Context:** You built a set of style references and you feed the whole set into every render.
- **Issue:** A style set often spans a RANGE (e.g. bold flat pop-art posters ↔ softer painterly graphic-novel). Feed the whole range and the output drifts toward whichever members are loudest/most extreme — especially the bold, high-contrast ones. So the same set that nails one image over-styles the next.
- **What happens:** One render lands right, the next comes out "a touch too bold / poster-y" — and it's not the prompt, it's that you fed refs from the wrong end of the range for that shot.
- **Example:** Heroine expression sheet drifted bolder/pop-art vs the locked look, because a close-up leaned on the neon-poster style refs. Fix = anchor to the frames already in the *correct* register (the locked hero + turnaround) and feed ONLY the graphic-novel refs, dropping the bold pop-art ones for that shot.
- **Prevent / Fix:** Pick the sub-set of refs that matches the exact register you want for *this* output — don't dump the whole set every time. And anchor to your own already-correct frames (the locked reference) as the primary style guide, using outside refs only to reinforce it.
- **New output:** Consistent register across every image, because each render is guided by refs that all point the same direction.

## 24. Match the reference to the SCALE you're rendering — a face needs a face ref (and strip its bad bits)
`category: style` · move ①
- **Context:** You have a style locked in some frames and want a *new character's face* in that style. You reason "just reference my locked full-body render / my scene — same style" and feed those.
- **Issue:** **Style references transfer best at the same SCALE as what you're making.** A full-body figure or a wide scene does NOT reliably teach the model how to render a *face* — the face is too small in them. A face render needs a **face-focused** style reference. Feed only body/scene refs and the faces come back off-style.
- **What happens:** You cite your locked frames for a portrait and get "a few images that aren't in the style at all" (Ali's words) — because none of them was a close-up face for the model to copy the face rendering from.
- **Example:** For Deb's comic face, the locked full-body v28 + the Grace scene did NOT transfer the style. What worked was a tight **face** ref (`styleref-02`) — it carried the bold ink + angular face planes. It also carried **halftone dots**, which came through on the first pass; "no dots" stripped them next pass → the clean Deb. So the face ref was essential; the dots were a strippable side-effect, not a reason to drop it.
- **Prevent / Fix:** Pick a reference at the **same crop/scale** as your output — a face for a face, a full body for a full body. Keep a good face-style ref even if it has an unwanted feature (dots); use it for the face rendering and **strip the feature with an explicit "no dots / no X"** (works, usually on a correction pass). Don't assume a broad frame substitutes for a scale-matched one, and don't discard a working ref over one removable flaw.
- **New output:** On-style faces the first time, because the model had a face to copy from — with the unwanted texture instructed away.

## 25. Generate NEW frames in the target style — don't convert old ones — for the cleanest result
`category: style` · move ②
- **Context:** You're moving to a new art style and you have old content in a different style. You can either *convert* the old images or *generate fresh* ones in the new style.
- **Issue:** **Converting** an existing image tends to keep dragging it toward its *original* style — the source biases the render, so it lands halfway (e.g. a pixel scene "converted" to comic stays half-painterly). **Generating fresh** in the target style, with no old image to anchor it, comes out fully and cleanly in that style.
- **What happens:** Converted frames feel "barely different" from the originals; freshly-generated ones nail the look on the first try.
- **Example:** The Grace *pixel* scene, converted to comic, stayed painterly and felt unchanged. The Ada time-jump frame — *generated fresh* in comic — came out unmistakably comic and clean ("fantastic"), better than anything we'd converted. Same style instruction; the difference was fresh-generate vs convert.
- **Prevent / Fix:** For anything you can make new, **generate it fresh in the target style** rather than converting an old asset. Reserve conversion for cases where you *must* preserve a specific existing composition — and even then, expect to push the style harder than a fresh generation needs. Bonus: the cheap connective pieces (transition cards, text frames, recap strips) are all new-generated, so they're both fast AND the easiest to get on-style.
- **New output:** Frames that fully commit to the new style, because nothing old is pulling them back.

## 26. A motion sequence needs ENOUGH in-between frames, or it's choppy — and it must hold your canon
`category: style` · move ②
- **Context:** You turn a keyframe into an animated beat (a transformation, a camera move) by generating a few frames for the tool to interpolate.
- **Issue:** (a) Too FEW frames = **choppy** — a 5-frame magic transformation jumps; smooth needs ~9–11 (more wand-motion in-betweens, more effect frames, and an actual **mid-transition state**, not just start→sparkle→end). (b) The tool quietly **drifts off your canon** in the new frames — wrong building (a Gothic hall instead of your canonical rose-window dome), a signature detail wrong (butterfly clips in a vertical line, not the locked 3-per-side), a "full" location coming back half-empty.
- **What happens:** The animation stutters, OR a hero location/character comes back off-canon even though you'd locked it — because the prompt didn't re-assert the canon on every frame.
- **Example:** Ep4 transformation (5 frames = too choppy, no real mid-transform, hair wrong) + the MAiVENS hall (came back Gothic + half-empty + too painterly, when canon = the rose-window dome PACKED with the ~24 roster portraits, rendered comic).
- **Prevent / Fix:** Spec the frame COUNT to the motion (smooth transformation ≈ 9–11; name each in-between), and **re-state the canon in every animated beat** — exact building refs, the character's locked details (hair/outfit), "packed not empty," the render style. Attach the reference images. A locked thing stays locked only if the prompt says so each time.
- **New output:** Smooth motion that stays on-canon frame to frame.

## 2026-07-21 — Codex delivers the same batch to TWO places at different resolutions
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

## 2026-07-21 — Real historical women rendered with INVENTED faces (no likeness reference)
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

## 27. Fixing a misspelled sign by pasting the letter on top
`category: style · workflow` — ① Speak their language
- **Context:** A generated storefront sign came back with one letter wrong.
- **Issue:** The obvious "cheap fix" is to repaint the bad letter in an image editor instead of re-generating the picture.
- **What happens:** It reads as applied-on. Painted text never picks up the scene's lighting, its paint texture or its soft edges, so the eye catches it instantly even when the shape and colour are copied from the same image.
- **Example:** Ep4's LUMINAiRY marquee rendered `LUMiNAiRY`. We built a capital "I" out of the sign's own "L" — its exact stem, serif, colour and glow — dropped it in, and it still looked stuck on. Ali: *"you shouldn't be applying signs on top."* Third time this workaround has been tried and rejected.
- **Prevent / Fix:** Put the exact string in the prompt and have the model render the text as part of the picture. If the text is wrong, re-render the frame — one frame, on its own — rather than patching it.
- **New output:** Lettering that sits in the scene's own light, because it was painted at the same time as everything around it.

## 28. The filename says it was fixed; the picture says otherwise
`category: workflow`
- **Context:** Hunting for the corrected version of a frame among dozens of takes.
- **Issue:** Files get named for the fix they were *meant* to contain, not the fix they actually contain.
- **What happens:** You wire the "corrected" file and ship the same bug, or you commission a re-render that already exists. Either way the filename is trusted and the picture is never opened.
- **Example:** `...approach-comic-v4-correct-sign-1920.png` still reads `LUMiNAiRY`. A whole re-render was nearly skipped on the strength of its name.
- **Prevent / Fix:** Name a file for what it *is*, not what it was supposed to be — and open the picture before believing any filename that contains the words "correct", "fixed" or "final".
- **New output:** The search for a fix ends with a look, not a guess.

## 29. The same canon mistake comes back because the rule lives somewhere the prompt never sees
`category: relevance · workflow` — ② Make them speak yours
- **Context:** Generating a street scene in a fictional town with a fixed layout.
- **Issue:** The layout is written down, but in a notes file the image prompt never carries — so every new prompt is written from memory.
- **What happens:** The same geography error returns every few weeks, gets caught by eye, and costs another re-render.
- **Example:** The LIBRAiRY was put on MAiN Street beside Blend & Snap. It sits on Civic Square, off MAiN. The identical error had already forced re-rolls of two street scenes three weeks earlier.
- **Prevent / Fix:** Move the canon into the single requirements block that every prompt must carry, with the actual order spelled out inline — then a checker refuses any prompt missing it. Rules that live only in notes get re-typed from memory and lose a line each time.
- **New output:** The layout travels with every prompt automatically, so it cannot be forgotten between jobs.

## 30. A quality check whose bar sits below the noise
`category: motion · workflow` — ② Make them speak yours
- **Context:** Automated check confirming that "make it move" clips actually move.
- **Issue:** The pass mark was set to a number lower than the video compression's own random flicker.
- **What happens:** It prints PASS for everything, including a still image saved as a video. You believe the check and ship stills.
- **Example:** Ep4's motion check passed anything above 0.02. Four of five "ambient loops" were sitting at the still-frame noise floor and were reported as working.
- **Prevent / Fix:** Calibrate against a known-still control measured the same way, and state the result as a multiple of it. Also make sure the measurement suits the effect — a whole-frame average cannot see a few hundred flickering lamps, and two samples of a slow pulse can land at the same brightness.
- **New output:** A check that can actually fail, and a number that means something.

## 31. Teaching copy that sounds like teaching but is hollow or self-undermining
`category: relevance · workflow`
- **Context:** Writing class / episode copy — worked examples, "what it can do" beats, narration.
- **Issue:** The copy is generated fast and then defended, with no adversarial check before the human reads it. It *sounds* like teaching, so it passes a skim.
- **What happens:** Empty beats ship ("What can you do?" → a useless list; a callback to a "throw pillow" from an episode the viewer hasn't seen). Example prompts model the exact bad habit the episodes teach against (vague asks), or ask the tool for something it cannot know (summarise a policy into "the five things MY TEAM does differently" — it has the policy, not your team). Each one quietly undercuts the specificity lesson elsewhere on the site. Ali ends up as the bug-catcher: *"garbage in a garbage dress."*
- **Example:** Basics Class 1's first pass. Root cause was method, not model — generating before reasoning what's actually true, then defending the draft.
- **Prevent / Fix:** Reason each element prompt-first — write down what is true and keep only what survives — then put a gate between generation and the human: (1) N independent critics whose only job is to KILL each item against the known traps (vague prompt, impossible knowledge, contradicts Episode 2, empty beat, personification), majority-kill; (2) a mechanical phrasing scan (reuse `check-class-scripts.py`'s BANNED/PERSONIFY/STALE regexes over the bare VO) as a backstop; (3) my own read against the traps. Only survivors reach Ali. Prove the gate can fail — the phrasing scan was calibrated against the known-bad old script and correctly flagged its "throw pillow" / "what can you do?" beats before trusting it.
- **New output:** Copy Ali reviews for *taste and direction*, not to catch hollow or contradictory teaching — because the traps were killed mechanically first.

## 32. A multi-phase workflow hit a usage limit mid-run — and the recoverable work almost got re-run
`category: workflow`
- **Context:** A research → vet → synthesize workflow for the "what to use it for" list.
- **Issue:** The session usage limit was reached during the vet phase. 51 of 64 agents errored, synthesis never ran, the tool returned `final: null`. The reflex is to just re-run the whole workflow (and hit the same wall, and repay for the research that already succeeded).
- **What happens:** The expensive, successful early phase (5 research agents → 58 sourced candidates) is invisible in the null result and looks lost.
- **Example:** This run — research completed, vet/synth failed on "session limit · resets 10:40am." All 58 candidates were sitting in `journal.jsonl` the whole time.
- **Prevent / Fix:** On a partial workflow failure, READ the run's `journal.jsonl` and pull the completed-phase results FIRST. Finish the cheap downstream steps (vet, synthesize) in the main thread instead of re-running agents — especially when usage is already constrained. Only resume-from-runId if the remaining work genuinely needs agents. The journal is the checkpoint; treat a null final as "inspect," not "redo."
- **New output:** The 58 researched uses were recovered and vetted+synthesized in-thread; nothing was re-run or re-paid for.
