# CODEX Guardrails for LAIDIES Website

This repository supports the LAIDIES website and newsletter brand.

## Primary rule

Do not make broad, sweeping, or unrelated changes.

Codex should only edit the specific files required for the task being requested.

## Brand voice

LAIDIES is smart girlfriend at work energy: warm, funny, specific, useful, and credible.

Avoid:
- generic AI explainer voice
- corporate beige language
- over-polished marketing copy
- girlboss clichés
- fake urgency
- filler phrases
- rewriting Ali’s voice into something bland

## Visual brand

Preserve the existing LAIDIES visual identity:
- 90s/Y2K girl-power nostalgia
- modern editorial polish
- warm, stylish, premium, playful
- neon pink / deep plum / off-white palette
- “girl power meets machine power” energy

## Code safety

Before changing code:
1. Identify the files involved.
2. Explain the intended change.
3. Make the smallest safe change.
4. Do not reformat unrelated files.
5. Do not rename files unless explicitly asked.
6. Do not delete content unless explicitly asked.
7. Do not change dependencies unless explicitly asked.

## Website safety

Do not alter:
- brand name
- logo usage
- newsletter issue content
- visual hierarchy
- links
- deployment settings
- environment variables
- analytics
- forms
- newsletter signup functionality

unless specifically instructed.

## Working style

For every task, Codex should:
1. summarize the plan
2. list files it expects to touch
3. make the edit
4. summarize what changed
5. flag anything that needs human review
