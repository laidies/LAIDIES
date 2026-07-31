
# LAiDIES build learning ledger

**Public destination:** future **Field Notes from LAiDIES HQ: Behind the Build**
**System:** `docs/product/behind-the-build-learning-system.md`
**Rule:** log meaningful failures, surprises, working fixes and transferable
lessons in the same task. Separate observation from diagnosis. A raw entry is
not automatically publishable.

## Recovery note — 2026-07-24

The earlier ledger was located at `../operations/painpoints-log.md`. It
contains actual entries 1–30 plus two later entries numbered 31 and 32. This
repository ledger also began at 31, creating an ID collision.

Until the records are migrated and assigned stable IDs, search both ledgers
before similar work. Do not overwrite, silently renumber or recreate their
details from memory. Consolidate from the actual source while preserving each
entry’s evidence path.

## 31. Assembly burned captions OVER the artwork
`category: workflow · timing` — ① Speak their language
- **Context:** Handing the video editor an episode to assemble from clips + stills + narration.
- **Issue:** The assembly prompt said "burn OR attach captions below the picture" — the "burn" option let the editor bake captions into the video, and its default placed them huge and centered, covering the whole frame.
- **What happens:** The exported episode has giant white subtitles over every scene, hiding the art and the character's face.
- **Example:** Ep4 v3 exported with the "Previously on LAiDIES…" line as centered white text across the middle of the frame, over the heroine.
- **Prevent / Fix:** The video must be delivered CLEAN — no caption overlay at all. Captions belong to the player, which renders them in a bar BELOW the picture. Tell the assembler explicitly: no captions in the video. Never leave "burn or attach" as an option.
- **New output:** A clean full-frame episode; captions appear below the picture from the player, never over the art.

## #32 — Over-specified title-card prompt STEERED Codex into hallucination (2026-07-23)
**What happened:** Ep1 title card came back with an invented SUNNYVAiLE water tower + a hot-pink-chair
boardroom, and forced gold lettering. **Root cause:** my prompt added a forced colour ("gold", copied
from Ep4) + an invented background ("Y2K boardroom opening into SUNNYVAiLE"). Ep4's actual title prompt
is ONE line ("Comic title card: THE FOUNDING MOTHERS + 'Episode Four', on a comic ground") — Codex
themed it itself. **Fix baked into prompts:** title cards use the minimal pattern — `Comic title card:
<TITLE> (bold comic lettering) + "Episode N", on a comic ground` + style line; NO forced colour, NO
invented background. Over-specifying a title card steers it wrong. (Scene frames still need exact refs.)
See [[title-card-ep4-standard]].

## 33. A new idea silently became a task switch

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

## 34. A green check certified yesterday’s Episode 5

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

## 35. A draft file was mistaken for a released episode

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

## 36. The learning history looked missing because there were two ledgers

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
- **Prevent / Fix:** Register both sources explicitly; install the learning
  rule in both workspace- and repository-level `AGENTS.md`; require searches
  across both until an evidence-preserving migration assigns stable IDs.
- **Why the fix works:** The rule now follows the whole project scope, and the
  legacy source is visible without overwriting or guessing its history.
- **New output:** Historic learnings are recoverable and future image, video,
  social, website and content tasks receive the same capture instruction.
- **Transferable lesson:** Before declaring project memory missing, verify the
  filesystem/repository boundary and search the full authorized workspace.
- **Internal rule/check updated:** Root and repository `AGENTS.md`,
  `operations/CODEX-WORKING-AGREEMENT.md`,
  `docs/product/behind-the-build-learning-system.md`.
- **Public angle:** “The notes were not gone. I was standing in the wrong
  filing cabinet.”
- **Privacy/IP/reputation:** Explain nested project folders generically; do not
  expose local usernames or private absolute paths.
