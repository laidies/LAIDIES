# lAIdies Production Gap Audit

This audit lists what is already available in the `LAIDIES` workspace, what is referenced by the legacy agent but not currently available here, and what still needs to be built to support a consistent, deeply human lAIdies production workflow.

## Available In This Workspace

### Brand And Strategy

- `WEBSITE-BRIEF.md`
- `DESIGN-RECOVERY.md`
- `LAUNCH-NOTES.md`
- `REFERENCE-CLOSET.md`
- `LAIDIES-PRODUCTION-AGENT.md`

These are enough to understand the brand, season arc, visual direction, community concept, and current production workflow.

### Website

- `index.html`
- `styles.css`
- `script.js`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `community/*.html`
- `assets/*`

The current website can publish issues, show community sections, accept newsletter signup via Buttondown endpoint, and preview member profiles.

### Episode Source System

- `content/EPISODE-SCHEMA.md`
- `content/episodes/issue-01.json`
- `content/episodes/issue-02.json`
- `content/episodes/issue-template.json`
- `content/episode-index.json`
- `scripts/build-episode-assets.js`
- `social/episodes/issue-01-instagram-kit.md`
- `social/episodes/issue-02-instagram-kit.md`

This gives us a starting source-of-truth model so episode metadata can drive Instagram kits and future automation.

### Instagram And Community Ops

- `INSTAGRAM-STRATEGY.md`
- `INSTAGRAM-CONTENT-BANK.md`
- `AI-COMMUNITY-OPS-PLAN.md`
- `COMMUNITY-SUBSCRIBE-SETUP.md`
- `SPOTLIGHT-AUTOMATION-PLAN.md`
- `LADIES_OF_LAIDIES_PROFILE_TEMPLATE.md`

These cover low-lift Instagram execution, community prompts, member profiles, and AI-assisted comment operations.

## Known External Files Referenced By The Legacy Agent

The legacy agent referenced these files outside the current workspace:

- `C:\Users\alieakin\OneDrive - amazon.com\Documents\lAIdies_agent.md`
- `C:\Users\alieakin\OneDrive - amazon.com\ali_writing_style_reference.md`
- `C:\Users\alieakin\OneDrive - amazon.com\lAIdies_series_reference_bank.md`
- `C:\Users\alieakin\OneDrive - amazon.com\Ali's AI Vault\dashboard.html`
- `C:\Users\alieakin\OneDrive - amazon.com\Ali's AI Vault\dashboard-data.js`
- `C:\Users\alieakin\OneDrive - amazon.com\Documents\lAIdies_images\`
- `C:\Users\alieakin\OneDrive - amazon.com\Documents\lAIdies_01_Newsletter.html`
- `C:\Users\alieakin\OneDrive - amazon.com\Documents\lAIdies_02_Newsletter.html`
- `C:\Users\alieakin\OneDrive - amazon.com\Documents\lAIdies_02_draft.md`

The old agent itself was found previously, but the dedicated writing style guide, full series reference bank, and AI Vault dashboard files are not currently available inside the `LAIDIES` workspace.

## Missing Or Not Yet Confirmed

### 1. Ali Writing Style Reference

Status: missing from workspace.

Why it matters: the old agent says this is "law." The current repo has strong voice rules, but not a full writing-style reference with examples of Ali's actual language, rhythm, edits, and anti-patterns.

Needed file:

- `ali_writing_style_reference.md`

Recommended action:

- Copy it into this repo as `brand/ali-writing-style-reference.md`, or grant read access so it can be imported.

### 2. Full Series Reference Bank

Status: partial only.

Current file:

- `REFERENCE-CLOSET.md`

Missing likely file:

- `lAIdies_series_reference_bank.md`

Why it matters: `REFERENCE-CLOSET.md` is useful, but the legacy agent expected a broader bank of used references, banked sign-offs, tone reminders, and future reference ideas.

Recommended action:

- Copy/import the full bank into `brand/series-reference-bank.md`.
- Keep `REFERENCE-CLOSET.md` as the public/simple working version or merge them.

### 3. Canonical Issue Body Source

Status: incomplete.

Current state:

- Issue 1 and Issue 2 exist as HTML pages.
- Issue metadata exists in JSON.
- The full article body is not stored in clean Markdown or structured content inside the repo.

Why it matters: editing future issues in giant HTML files creates duplication and makes it harder to generate newsletter, web, social, and community outputs from the same source.

Recommended action:

- Add `content/issues/issue-XX.md` or `content/issues/issue-XX.json` for full article text.
- Generate website/newsletter outputs from that source over time.

### 4. Website Archive Automation

Status: not built.

Current state:

- `content/episode-index.json` is generated.
- `index.html` issue cards are still manually edited.

Recommended action:

- Either keep manual cards for now, or build a small script to update the homepage archive from `content/episode-index.json`.

### 5. Newsletter Email Template

Status: not built in the current repo.

Current state:

- Website issue HTML exists.
- Buttondown setup notes exist.
- A short email format is described, but no reusable email template exists.

Recommended action:

- Create `email/buttondown-issue-template.md`.
- Generate a weekly email draft from each episode source package.

### 6. LinkedIn Per-Issue Generator

Status: not built.

Current state:

- The old agent describes LinkedIn post rules.
- Issue-specific Instagram kits are generated.
- LinkedIn posts are not generated from episode JSON yet.

Recommended action:

- Extend `scripts/build-episode-assets.js` to generate `social/episodes/issue-XX-linkedin.md`.

### 7. Canva/Design Templates

Status: not present.

Current state:

- Instagram strategy describes Canva templates to create.
- No local Canva template exports, screenshot references, or style samples exist in the repo.

Recommended action:

- Create 6 Canva templates:
  - Reel cover
  - carousel cover
  - carousel body
  - Story poll
  - episode drop
  - member profile CTA
- Export sample PNGs into `assets/social-templates/` for reference.

### 8. Image Prompt Library Per Issue

Status: partial.

Current state:

- Assets exist.
- Some legacy image prompt docs are outside the workspace.
- No current per-issue image prompt source lives in `content/episodes/`.

Recommended action:

- Add image prompt fields to each issue JSON or create `content/episodes/issue-XX-image-prompts.md`.

### 9. Community Backend

Status: planned, not fully live.

Current state:

- Hyvor pages exist with website ID `15519`.
- Member profile form is a local preview.
- AI community ops plan exists.

Still needed:

- Confirm Hyvor settings and moderation policy.
- Connect member profiles to Tally/Airtable/another backend.
- Decide which comments require login vs name-only posting.
- Build the AI-assisted private review queue later.

### 10. Analytics And Feedback Loop

Status: not built.

Current state:

- Strategy says what to track.
- No dashboard or weekly scorecard exists in this repo.

Recommended action:

- Create `analytics/WEEKLY-SCORECARD.md`.
- Track Reels views, shares, saves, follows, Story replies, profile submissions, newsletter subscribers, and community comments.

## What We Can Successfully Do Now

With the current workspace, Codex can:

- continue developing the website
- update community pages
- generate episode-specific Instagram kits from episode metadata
- create new issue metadata files
- update launch and strategy docs
- write social copy in the established lAIdies voice rules
- preserve the recovered strategy
- build the next automation scripts inside the repo

## What Would Improve Quality Most

Priority order:

1. Import Ali's writing style reference.
2. Import the full lAIdies series reference bank.
3. Add clean Markdown/source-body files for each issue.
4. Add a generated Buttondown email draft.
5. Add a generated LinkedIn draft.
6. Add Canva/social template references.
7. Connect member profiles to a real backend.
8. Build a weekly analytics scorecard.

## Minimal Next Build

The smallest next build that reduces duplication:

1. Create `content/issues/issue-03.md` from the next newsletter draft.
2. Create `content/episodes/issue-03.json`.
3. Extend `scripts/build-episode-assets.js` to also generate:
   - Buttondown email draft
   - LinkedIn post draft
   - community prompts
4. Keep website HTML manual for one more issue.
5. Automate homepage/archive after the issue flow is stable.
