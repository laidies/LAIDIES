# LAiDIES model routing

Current authority: `standing-authorization.md` supersedes older routine Ali approval
and whole-job pause requirements below. Retain quality checks and repair failures.

Detailed requirements routed by AGENTS.md. Paths below are relative to the site
repository root (Website-homepage in the iCloud workspace). Read the complete
applicable sections; these rules remain binding within their stated scope.
The short entry map governs selective retrieval instead of blanket historical reading.

## ADAPTIVE MODEL + CREDIT ROUTING — mandatory

Use the least expensive model/reasoning configuration that can reliably meet
the task's quality and risk bar. The project `.codex/config.toml` sets the
foreground starting model to **GPT-6 Astra / Medium**, planning to **High**,
subagents to **GPT-5.6 Terra / Medium**, 2 concurrent threads, and Fast mode off.

- Use **Luna / Low** for high-volume work with clear success criteria:
  extraction, classification, mechanical transformation, structured summaries,
  repeatable edits. It is the cheapest and should carry this whole category.
- Use **Terra / Low or Medium** for bounded reading, search, inventory,
  reporting, routine implementation, tests and monitoring that still need
  judgment.
- Use **Sol / Medium or High** for demanding professional work where Astra is
  unlikely to change the decision or reduce rework enough to justify its higher
  usage. Sol remains an active value route, not a deprecated fallback.
- Use **Astra / Medium** for the hardest cross-domain, end-to-end work where
  stronger reasoning, computer use, long-context instruction handling or
  multi-surface synthesis can materially improve the outcome.
- Use **Astra / High, Extra High, Max or Ultra only as a bounded exception**
  when the task is unusually ambiguous, consequential or resistant to a lower
  setting. State the reason before the expensive work.
- Start at the lowest effort that produces a satisfactory result and escalate
  only on evidence. Effort levels do not map across model generations — retest
  familiar tasks lower than you expect.
- Keep **Fast mode off** unless Ali explicitly says latency matters more than
  credit use.
- Do not make Ali route ordinary work manually. Apply this policy
  automatically. If the whole active foreground needs a different main-chat
  setting that cannot be changed from inside the task, give Ali one concise
  switch recommendation before incurring the expensive work.
- A composer/model-picker choice for the active chat can override project
  defaults. After unusually difficult work, step new tasks back down to the
  project baseline.

The project default is a starting point, not a universal assignment. Before
material work, classify the task by ambiguity, consequence, modalities, context
load, tool depth and cost of a wrong answer. Use the cheapest model likely to
clear the actual acceptance conditions. Prefer a bounded Luna or Terra lane
when the foreground model is more capable than the work requires. Escalate only
when the lower route fails, the task crosses several systems, or stronger
judgment could plausibly prevent a costly review cycle. Do not make Ali manage
routine routing.

## ASTRA-SPECIFIC CONTROL — mandatory when Astra is active

Astra follows long instruction stacks closely and can be more sensitive to
conflicts. Apply the authority order in `operations/DECISIONS.md` and Ali's latest
direct instruction. If a conflict forces a pause, leaves work unfinished or
changes course, name the exact file and rule; do not silently invent a narrower
scope.

Inspect the existing architecture, tools and approved assets before proposing a
new mechanism. Do not implement novel infrastructure merely because Astra can
devise it. First show why the current mechanism cannot meet the goal. If the new
approach materially changes scope, cost, reversibility or an Ali-owned product
decision, complete all independent preparation and present that one decision
before implementation.

## MODEL-ROUTING CALIBRATION — active through 2026-09-19

At the end of each completed Tier 1 or material Tier 2 task, append one row to
`operations/model-routing-calibration-2026-09.md`. Record the actual model/effort,
route reason, time band, task-specific usage only when available, first-pass
result, material corrections or detours and whether a cheaper route was likely.
Exclude simple questions, one-step maintenance and waiting. Do not infer task
cost from account-wide usage. Review after 12–20 comparable real tasks; do not
create synthetic benchmark work merely to fill the table.
