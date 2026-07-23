# The brief — a real operating system for LAiDIES

*Written 2026-07-22 from Ali, after a day where the way of working itself broke down. This file is
the scope. If something here is wrong or missing, it gets corrected HERE — not re-explained in chat.*

---

## Why this exists — the meta-problem, in Ali's words

- *"the way I'm working with you is not working and not sustainable."*
- *"nothing you have built so far for the last month does [work]."*
- *"there is no way you built something that fast that needs to do what we need it to do."*
- I keep pulling her into decisions that are mine, asking questions the brief already answered, and
  handing her half-built things to react to. That makes her my QA and my project manager. It is
  exhausting and it does not scale. (Recorded already: `write-decisions-down-immediately` —
  *"acts like a smart new hire who doesn't listen, write things down, or remember."*)

**So the deliverable is not "an episode engine." It is a way of running the whole operation that
does not depend on Ali catching my mistakes.** The test of the design is: does it remove her from
the bug-catcher seat, across the whole business, not just episode production.

---

## What the design must cover — the WHOLE business, not just episodes

1. **Episode production** — the weekly cycle, all ~11 downstream surfaces, hitting Wednesday.
2. **The teaching quality itself** — reliably drafting at the Ep1–3 standard (Ep4 departed, Ep5
   failed). This is the unproven core.
3. **The website** — ~97 live pages, every building/mechanic, live-vs-promised, the experience bar.
4. **Social media** — Instagram (@laidies.ai), YouTube (@LAiDIES). Strategy + content bank + the
   growth operating system already exist and must be read and judged.
5. **Revenue generation** — POD merch, membership (Supabase Part C), KSVL Mix CD, real-product ads,
   the collectibles economy. What actually makes money, in what order.
6. **Third-party tools** — explicitly: where are we missing tooling, what should we adopt, what
   should we drop. (This was in the original brief and I let it slip. It is back in.)
7. **The vision** — everything in IDEAS.md and floated across ~200 memories that isn't built.

## What the design must FIX — the repeated gaps (Ali: "fix these repeated gaps we keep having")

These recur. The design is judged on whether it ends them, not documents them.

- Codex/art output is often bad — invented likenesses, off-model heroine, nonsense backgrounds,
  corporate clothes, mistimed. (`episode-art-four-failure-classes`)
- Canon drifts; a rule locked after a canon file was written never travels back; surfaces derive
  the old error. (`rules-need-a-canon-backsweep`)
- Surfaces get forgotten because they're authored, not derived. (`episode-content-sync-surfaces`)
- Wednesday is never hit. (`weekly-production-machine`)
- Good gates get built and never run. (`quality-gate-exists-but-unwired`)
- I rebuild what exists and re-litigate settled decisions. (`HANDOVER §3`)
- I self-certify and report unverified things as done. (`fail-open` incidents)

## What the design must JUDGE — things built to fix this that are NOT working

The answer is often "stop doing this," not "add more." Read each, say plainly why it didn't hold,
decide keep / fix / kill:

- **`operations/laidies-operating-model.md`** — the existing operating model. Not working.
- **`operations/agents/`** — 29 files of agent charters, scorecards, an "agent council operating
  system." All prose, wired to nothing.
- **`operations/workflows/review-content.mjs`** — the 5-reviewer gate. Built 2026-07-10, never run.
- **The command centres** — `weekly-command-center.html`, `ops/ops-centre.html`, `ops/workspace.py`.
  All abandoned.
- **`scripts/run-weekly-production.js`** — 1,365 lines, Windows PowerShell, a dashboard nobody opens.
- **The engine I built today** (`operations/engine/`) — plumbing only; the generative core is
  unproven. Treat it as suspect like everything else.

## The reading list — read ALL of it before designing (Ali: "read all the research")

- `operations/research/` — 00-SYNTHESIS, A–F, the playbook (83KB), the memory digest, site inventory
- `operations/voice/laidies-teaching-pattern.md` + `laidies-writing-lock.md`
- `operations/laidies-operating-model.md`
- Social: `social/*.md`, `INSTAGRAM-STRATEGY.md`, `INSTAGRAM-CONTENT-BANK.md`,
  `docs/growth/laidies-growth-operating-system.md`, `docs/handoffs/{social,newsletter}-handoff.md`
- Revenue: `monetization-priority` memory + wherever merch/membership/economy live
- `IDEAS.md` + the ~200 memories (digest exists at `research/_learn-memory-digest.md`)
- The live site itself

## The two phases Ali chose

- **Phase 1 — generation.** Can an AI reliably draft Ep1–3 quality? Prove it or find why not, tested
  on the real episodes. Don't build plumbing around a core that doesn't work.
- **Phase 2 — architecture.** Given that answer, what operating system actually fits — across all of
  the above.

## How to work from here (the sustainable way)

- **One long autonomous pass. No check-ins.** Ali does not touch anything until there is something
  whole to react to.
- **Decisions that are mine, I make.** Only genuine forks that are hers get raised — batched into
  one short list at the end, never mid-stream.
- **Everything gets written down as it's decided**, here or in a decisions file — never re-explained
  in chat.
- **Nothing is "done" or "working" on my say-so** — only on a re-runnable check, or Ali's verdict.

## Open forks for Ali (the ONLY things to raise — batched, at the end)

*(to be filled in as the pass finds real forks; empty for now)*
