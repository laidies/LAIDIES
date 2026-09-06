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


Boundary: Historical internal incident only. The old privacy line does not override Ali’s September 5 competitive-disclosure rule. No exact operation, four-state vocabulary, script, prompt or screenshot may enter the new public example.
