# Canonical Episode Source — spec (sketch, Ali 2026-07-07)

> **Weekly engine companion:** [weekly-engine-ingestion-map.md](weekly-engine-ingestion-map.md)
> defines the full required package, conditional opportunity scan, public release proof and
> machine-readable surface inventory. The canon owns meaning; the opportunity scan decides where that
> meaning should travel.
>
> **Recording round-trip:** [audio/recording-reconciliation-protocol.md](audio/recording-reconciliation-protocol.md)
> governs changes Ali makes while listening in ElevenLabs. Semantic changes return to canon; TTS-only
> spelling stays in the performance layer; captions are rebuilt from final audio with public spelling.

## The problem
One episode's content is currently hand-authored across ~11 surfaces that drift apart. Today's proof:
the Ep1 "14 points" fact was corrected in the audio scripts but still lived, wrong, in the article —
because they're separate files with no single source.

## The fix
**One canonical source file per episode.** Every other surface is *derived* from it — the script is the
narrative slice (spoken), the article is the read slice + visuals, the quiz pulls the questions, the
Bronze AiGE wall pulls the cocktail line, KSVL pulls the track, etc. Edit once → propagate.

## The canonical file (per episode)
Proposed: `content/episodes/episode-0N.canon.md` (or `.yaml`) holding:

- **meta** — number, title, premise, release date, patron saint, previously-on hook, next-time hook
- **lesson** — the one-line takeaway
- **narrative** — the story spine (the beats the script + article both render)
  - A beat may declare intentional `spoken` and `read` variants when sentence rhythm genuinely differs.
    The variants may sound different; they may not teach different things accidentally.
- **concepts[]** — `{ term, plain_def, analogy }` (each concept's canonical definition + pop-culture hook)
- **facts[]** — `{ claim, measures (scope/caveat), source_url, verified_date }` — the per-episode ledger
- **comparison** — the generalized before/after: the flat way vs the fluent way (topic-agnostic; this
  week a vague vs specific prompt, Ep3 a trusted vs verified claim, etc.)
- **cocktail_party** — the "what is X, really?" one-liner
- **quotables[]** — structured memorable lines: `{ id, text, type, concepts[],
  speaker, source_type, source_anchor_or_timecode, memory_job, share_allowed,
  rights_note }`. They feed pull quotes, KSVL liner notes, Overheard in
  SUNNYVAiLE, MAiKEOVER/Closet, search and rights-safe sharing.
- **discussion_prompt** — the weekly thread-starter / challenge ("post it in the rooms")
- **try_on** — the exercise
- **quiz[]** — `{ prompt, options, answer, explain, review }` (per episode; foundation quiz is separate)
- **track** — `{ title, callout_line, memory_hooks[], lyrics, file, dj_intro }` (the rotating **episode song**;
  not the fixed Wednesday Anthem or the fixed series title theme)
- **references[]** — further reading
- **artwork[]** — `{ slot, image, alt }`
- **cast[]** — every recurring, fictional and real person used in the episode, with approved reference
- **heroine_outfit** — one exact look for the whole episode, its source reference, hair and accessories
- **pronunciation[]** — `{ readable, tts, caption }` so ElevenLabs ear spelling never leaks into public copy
- **recording_revisions** — link/status for the episode's listening-session change log; every semantic
  change is reconciled before captions, cues, final video or downstream fan-out
- **social** — the episode's content-ladder inputs: `{ connection_mysteries[],
  standalone_value[], reach_candidates[], save_send[], participation[],
  site_routes[], return_hook }`. These are canonical ideas and promises, not
  platform-ready filler; every site route must pass the public promise gate.
- **experience_jobs[]** — for every promoted owned feature: its primary
  teach/practise/judge/retrieve/activate/encourage/belong/delight job, optional
  secondary job, visitor-facing activity, successful outcome and episode tie.
- **reward_actions[]** — eligible butterfly-clip actions with amount, reason,
  completion signal, cap/repeat rule and dedupe key.
- **reward_offers[]** — an episode/event drop proposal or explicit none; offer
  cannot publish until the reward, cost, delivery destination and ownership
  proof are real.
- **loyalty_impacts[]** — whether an episode action earns a building stamp,
  which meaningful completion signal grants it and what milestone/reward
  contract is affected; explicit none is allowed.
- **connection_impacts[]** — whether an episode creates a genuine send,
  reciprocal invitation, gift or learn-together opportunity; which stage and
  reward contracts it uses; explicit none is allowed.
- **build_learnings[]** — verified behind-the-build lessons generated while
  producing the episode: observation, diagnosis, evidence, prevention change
  and public derivative decision; explicit none is allowed.
- **pronunciation[]** — public form, meaning/context, intended pronunciation,
  narration performance form, song performance form, caption form, applicable
  contexts and tool/version notes. Homographs must record which meaning is
  intended.
- **track production** — canonical lyrics, tool-facing performance lyrics,
  as-recorded lyrics, pronunciation map, song revision log and exact approved
  audio/KSVL version remain distinct.
- **library_impacts[] / class_impacts[] / mall_references[]** — explicit update, new, deferred or none
- **weekly_charms[]** — the episode's seven-building charm set when the weekly charm mechanic is active

The required outputs are deterministic consumers of canon. Conditional extensions (a Tribune argument
article, new book/class/game, postcard, Town Tie, printable or merch derivative) are selected in the
per-episode opportunity scan. They must never be forced simply because the destination exists.

## Propagation map — where each field goes
| Canonical field | Surfaces it feeds |
|---|---|
| narrative | script (audio) · article (read + visuals) |
| lesson | article kit-card · quiz · homepage |
| concepts[] | article glossary · LIBRAiRY · concept cards · SUNNYVAiLE High course |
| facts[] | article stat blocks · facts-and-citations-ledger · quiz · references |
| comparison | article prompt-lab block · FAiRY Godmother |
| **cocktail_party** | **BRONZE AiGE wall** · article cocktail section · script |
| try_on | try-on.html · article · study pack (Blend & Snap) |
| quiz[] | quizzes.json · SUNNYVAiLE High course |
| **track** | Canonical lyrics · song performance workbench · as-recorded lyrics/revision log · **KSVL / radio** · track callout (script + article) · Bronze AiGE |
| pronunciation[] | Narration performance script · song performance lyrics · public transcript/captions normalization |
| references[] | LIBRAiRY |
| artwork[] | article · episode player |
| social | connection-mystery hook · standalone micro-lesson · reach candidate · save/send object · interaction · exact site CTA · return hook |
| reward_actions[] | Butterfly Clip action registry · Closet ledger · episode completion/reward messaging |
| reward_offers[] | Shared town offer catalog · Book Fair/town shop · Closet redemption destination |
| loyalty_impacts[] | Building program/action registry · stamp event · Town Wallet card · milestone grant |
| connection_impacts[] | Post Office/invite program registry · attribution event · reciprocal reward grants · Closet/Wallet state |
| build_learnings[] | Build learning ledger · changed prompt/check/gate · Field Notes/NewsStand/class/social derivative |
| quotables[] | Episode pull quotes · Overheard in SUNNYVAiLE · KSVL liner notes · MAiKEOVER/Closet · search · social/share cards |
| meta + lesson + a hero fact + cocktail_party | **NewsStand** WEDNESDAY Edition cover/lead (the episode as news) |
| quotables[] | **MAiKEOVER** favourite-quote picker → **Closet** (display) |
| discussion_prompt | **Delta LAi Nu** (Sorority) weekly room/thread · article challenge box · script sign-off |

**Hybrid-surface note:** the **NewsStand** is only a *partial* consumer — its WEDNESDAY Edition pulls the
episode as its cover/lead, but it also carries **independent** content (opinion, culture, timely AI news)
that is NOT episode-derived. Any AI claim it runs still passes [[fact-verification-rule]], and it's the
natural home for the "Current AI models" freshness callout ([[ai-model-currency-freshness-system]]).
(BRONZE AiGE has a mild version of this too — the cocktail wall is episode-fed, but the bar has its own life.)

**Two surface classes.** (A) **Content surfaces** = derived *renders* of the canonical content (article,
quiz, study pack, LIBRAiRY, High course, cards, Bronze wall, KSVL, NewsStand cover). (B) **Personalization
/ community surfaces** = user state that consumes only *selectable bits*: `quotables[]` feeds the
**MAiKEOVER** favourite-quote picker; `discussion_prompt` seeds the **Delta LAi Nu** rooms; the **Closet**
displays the user's own picks + collected episode items and **never re-derives** (records only).

## Fact-rule integration
Every `facts[]` entry must be verified + logged per [[fact-verification-rule]] (source + WHAT IT
MEASURES). Article stat blocks, the quiz, and references all cite from `facts[]`, so a fact is fixed
ONCE and propagates — no more script-vs-article drift.

## Rollout (pragmatic)
- **v1 (now):** author/edit episode content ONLY in the canonical file; propagate to surfaces in one
  pass with a surface checklist. Kills drift because there's one place to change + a known list to sync.
- **v2 (later):** a build step that generates the surface files from the canonical source automatically.
- **Backfill:** Ep1–3 already have rich articles/scripts/quizzes — reverse-extract their canonical files
  from what exists (don't rewrite working content), reconcile drift once, then forward-derive.

See [[article-derived-from-script]], [[episode-content-sync-surfaces]], [[fact-verification-rule]],
[[bronze-aige-cocktail-party-wall]].
