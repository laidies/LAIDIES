# Episode 5 — "The Super Models" · fresh-chat writing brief
*Paste this into a new Claude chat opened in the LAiDIES repo (working dir `Website-homepage/`). It carries everything needed to write Ep5 correctly on the first pass. Facts first, then prose.*

**2026-07-10 · supersedes the rejected candidate `operations/audio/ep5-council-rewrite-candidate.md` (good structure learnings, WRONG facts — do not reuse its claims).**

---

## 0. Read these first (source of truth — do not write from memory)
- **Verified facts:** `Website-homepage/operations/reference/ai-landscape-factsheet.md` — every landscape claim in Ep5 must trace here or be cut. This is the foundation.
- **Voice/canon law:** `Website-homepage/operations/voice/laidies-writing-lock.md` (AI-pronoun rule, plain-teaching rule, no-tells, banned phrases, saint lanes).
- **Quality benchmark (match this):** `Website-homepage/operations/audio/episode-02-elevenlabs-v3-tagged.txt` and `episode-01-elevenlabs-v3-tagged.txt`. Study their density of specific movie/show jokes, the real worked example, and how plainly they teach.
- **Canon beat sheet:** `Website-homepage/content/episodes/episode-05.canon.md` (has the MUST-MATCH strings + Cher→Samantha note).
- **Season arc:** `Website-homepage/operations/audio/season-01-bible.md`.
- **Master to update once approved:** `Website-homepage/operations/audio/episode-05-elevenlabs-v3-tagged.txt`.
- **Ship-check before "ready":** run `check-episode.sh 5` and paste the PASS receipt.

---

## 1. What LAiDIES is (context)
A Y2K-themed AI-fluency "internet town" called **SUNNYVAiLE**, for smart, busy women learning AI one Wednesday at a time. Episodes are first-person narrated (a Carrie-Bradshaw-ish "I couldn't help but wonder" voice), single host, `[tv announcer]` on the bookends only, lowercase `[dry]/[warm]` ElevenLabs delivery cues. ~15–20 min. Every analogy is grounded in 90s/Y2K pop culture that lives in the town's Mall.

## 2. The verified facts Ep5 must teach on (from the fact-sheet — reconfirm before shipping)
- **Scope the episode to the chat assistants you type to** (ChatGPT, Claude, Gemini, Copilot, the one at work). Say so, so every claim stays honest.
- **Many companies build their own models — NOT "a handful."** A dozen+ frontier labs (OpenAI, Anthropic, Google, Meta, xAI, DeepSeek, Mistral, Microsoft's own MAI, Amazon Nova) *plus* specialist labs with their own models (ElevenLabs=voice, Suno=music, Midjourney=image, Runway=video).
- **Company → model → app.** The lab trains the model; the model is the trained brain (name + version number); the app is where you meet it.
- **Copilot is NOT just GPT** — it's a multi-model router over Microsoft's own MAI, OpenAI's GPT, and Anthropic's Claude.
- **Gemini is a full frontier model family**, not "the Google-apps one."
- **Why the work AI feels familiar:** enterprise "our company's AI" is almost always the *same* model you already use, behind a company interface — verify this exact claim against the fact-sheet before leaning on it.

## 3. Ali's LOCKED metaphor rulings for Ep5 (do not re-litigate)
- **Fashion house → super model → boutique.** House = the company; super model = the model; boutique = the app. *"The store doesn't change, but the models do."*
- **Each house has its OWN models.** A rival's supermodels are different people. They *look* similar from the outside (tall, great bone structure) but are proprietary and different. **DO NOT** say "one supermodel booked by everybody across houses" — that was the rejected framing and it's backwards.
- Within ONE house, the same model shows up in more than one place (its own boutique *and* your work deployment) — that's the familiar-stranger answer: **same house's supermodel, company boutique.**
- **Model updates** = "she changed her look" (e.g. a version bump) OR "the house signed a new supermodel" (a new model).
- The models were **as famous as movie stars** — everyone obsessed over what they were doing, who they were with — which maps to how people obsess over model versions ("when's the new one, what's it good at"). You saw their faces on posters and ad campaigns for the boutiques.
- **No absolutes.** Don't say "the entire map" / "the whole landscape." We are NOT explaining all of AI — this is *the fashion map / the store floor plan.*
- **Specialists** (Suno, ElevenLabs, etc.): mention briefly as specialist boutiques built for one job (only shoes, only jewelry), then say we'll cover them in a later episode.

## 4. Ep5 vs Ep6 lane (keep them separate)
- **Ep5 "The Super Models" = the fashion map** — which houses/models/boutiques exist, why work AI feels familiar, why the models differ. Orientation. Saint: **Samantha Jones** (versatile; knows who's who and what's where — a navigator, NOT a stylist).
- **Ep6 "Groundbreaking" = the boutique floor plan** — the lines within a house (haute couture / everyday / resort = model tiers), picking the right line for the occasion ("wearing couture to the grocery store"). Saint: **Miranda Priestly** (she'd never use the wrong thing for the job). *Anything about "right thing for the occasion / outfit" belongs to Ep6, not Ep5.*

## 5. The non-negotiable rules
- **AI / a model / an app is always "it," never "her."** The supermodel simile compares a model TO a woman, but the model itself is "it." Reserve she/her for real women (the 90s supermodels, the saint).
- **Plain-teaching:** teach as plainly as you'd explain it to a smart friend. The Y2K voice + fashion metaphor are *garnish* — they decorate a clear idea, never carry it. If a plain chat explanation is clearer than the script, the script is wrong.
- **Be funny with real quotes.** Weave in movie/show quotes as punchlines (Samantha is Sex and the City — lean SATC; the narrator voice is already Carrie). Trivia ≠ jokes.
- **No self-hyping tells** ("here's the part everybody fumbles," "the thing nobody tells you"). **No "the whole/entire [x]."**
- **MUST-MATCH strings** (verbatim, from canon.md): keep the two locked sentences the ship-check enforces.

## 6. The bar
Match the **usefulness, depth, and humor of Ep1–2.** A smart woman who already knows there are different AI companies must finish Ep5 having genuinely *learned* something — name it in one sentence. Include a **worked example** (the rejected draft's 60-page-contract beat is a good shape — but re-ground it in Ep5's "which house" lane, not Ep6's "which tier"). The cocktail-party takeaway must be something the body actually taught.

## 7. Deliver
1. Write the script → run the **Review Gate** (`operations/workflows/review-content.mjs`) and fix every blocker.
2. Run `check-episode.sh 5`; paste the PASS receipt.
3. Only then apply to the master + give issue-05 the same treatment.
