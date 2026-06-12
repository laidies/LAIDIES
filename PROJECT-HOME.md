# lAIdies Project Home

This is the command center for the lAIdies project.

Use this file first when starting a new Codex thread. The goal is to avoid rereading a giant chat history and to keep the website, newsletter, social, community, images, and operations moving in the same direction.

Mandatory rule for every Codex chat under lAIdies: before implementing any requested change, pass it through the appropriate Agent Council lens in `operations/agents/agent-council-operating-system.md`. Choose the relevant council roles for the surface being changed, use their standards to evaluate the request, then implement only after the recommendation is clear. This applies to all website, design, content, community, growth, monetization, social, and app/product changes.

Visual concept rule: when Ali asks for a visual concept, product-style mockup, scene, hero image, toy/object direction, or other design artifact that should look like a real image, use image generation first. Do not fake image concepts with CSS-drawn shapes, gradients, or placeholder UI art. CSS can lay out approved assets later, but it should not substitute for concept art.

## What lAIdies Is

lAIdies is a weekly AI fluency newsletter and community for busy corporate women. It teaches practical AI confidence through deeply human, funny, useful writing with 90s/Y2K references.

The references are a taste and memory system, not a signal that women need technical ideas made silly. lAIdies assumes readers are smart and capable. The promise is rigorous, useful learning that is also a good time.

The tone is:
- useful first
- funny in a specific way
- warm but not fluffy
- practical, not hypey
- never generic AI voice
- never condescending

## Main Tracks

- Website: `docs/handoffs/website-handoff.md`
- Newsletter: `docs/handoffs/newsletter-handoff.md`
- Social media: `docs/handoffs/social-handoff.md`
- Community: `docs/handoffs/community-handoff.md`
- Images and assets: `docs/handoffs/images-handoff.md`
- Operations and agents: `docs/handoffs/operations-handoff.md`
- Growth/product: `docs/growth/laidies-growth-operating-system.md`
- Agent Council: `operations/agents/agent-council-operating-system.md`
- Reputation/Safety gate: `operations/agents/reputation-safety-gate.md`
- App/product strategy: `docs/product/laidies-app-strategy.md`

## Live Website Files

Do not move these without checking all links:

- `index.html`
- `styles.css`
- `script.js`
- `issues/`
- `community/`
- `assets/`

## Current Priorities

For the latest cross-window handoff, use `docs/handoffs/current-window-handoff-2026-06-07.md`.

See `CURRENT-PRIORITIES.md`.

For the first public launch week, use `operations/launch/website-and-issue-02-launch-checklist.md`.

For the prelaunch site-quality pass, use `operations/agent-council/prelaunch-website-agent-council-review.md`.

For remaining Issue 1 social launch posts, use `social/launch/issue-01-social-launch-plan.md`.

For launch-ready community starter comments, use `operations/community-room-seed-posts.md`.

## Episode Workflow

See `EPISODE-PRODUCTION-CHECKLIST.md`.

## Growth Workflow

Use `docs/growth/laidies-growth-operating-system.md` to keep newsletter, website, social, community, and future paid/product ideas pointed at the same flywheel.

Use `operations/growth/weekly-growth-scorecard-template.md` after each issue to track the audience signals that should shape the next week.

## Agent Council Workflow

Use `operations/agents/` for the recommend-only Agent Council charters, scorecards, decision log, taste benchmark library, and reputation gates.

Do this before editing files, not after. The council step is required even when the requested change sounds straightforward, because visual/design changes can still affect product clarity, taste, reputation, mobile usability, and launch readiness.

The weekly production command creates an issue Agent Council review in `operations/agent-council/`. Treat it as recommendations for Ali approval, not an autonomous publishing system.

## Weekly Command Center

Run `.\scripts\start-weekly-workflow.ps1 XX` for the issue number. It runs the weekly process and opens `operations/weekly-command-center.html`, which links to the production packet, Agent Council review, growth scorecard, website issue, Buttondown draft, social drafts, and community prompt.
