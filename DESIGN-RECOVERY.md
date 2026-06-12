# lAIdies Website Design Recovery

This note reconstructs the website design conversation from the files currently in the project folder.

## What Survived

- The website source files are present:
  - `index.html`
  - `styles.css`
  - `script.js`
  - `issues/issue-01.html`
  - `issues/issue-02.html`
  - community pages under `community/`
  - branded assets under `assets/`
- The planning docs are present:
  - `WEBSITE-BRIEF.md`
  - `LAUNCH-NOTES.md`
  - `COMMUNITY-SUBSCRIBE-SETUP.md`
  - `REFERENCE-CLOSET.md`
  - `SPOTLIGHT-AUTOMATION-PLAN.md`

## Design Direction

The site is designed as an editorial magazine and community front door for lAIdies, not a standard blog.

Core feel:

- 90s and early-2000s girl-power references
- polished professional energy
- funny, warm, smart, and useful
- mobile-first for LinkedIn and Instagram traffic
- branded enough to feel memorable, but still easy to read

Visual system:

- Hot pink neon accent: `#ff2d9b`
- Deep mocha text and header/footer: `#100805`
- Warm blush page background: `#fff8fc`
- Support colors include teal, coral, plum, and gold
- Script-style lAIdies wordmark with the `AI` emphasized
- Dark sticky header with pink dot/doodle texture
- Editorial issue cards, section bands, branded community panels, and recurring interactive modules

## Current Homepage Structure

The homepage includes:

- sticky header navigation
- hero with logo, tagline, issue CTAs, and editorial image
- 24-episode season overview
- issue archive with Issues 1 and 2 live
- locked cards for upcoming episodes
- community board called "The lAIdies Room"
- member profile intake for the community directory, with optional feature consent
- AI community ops plan for comment triage, reply drafts, moderation review, member matching, and content mining
- episode source files and generator for keeping website, newsletter, and Instagram content aligned
- recurring engagement modules
- Ask LAIDY interaction
- Buttondown subscribe form wired to the `laidies` publication
- social and launch hooks

## Content Arc

The season is structured as 24 weekly episodes in 4 acts:

- Act 1: The Awakening, Issues 1-6
- Act 2: The Montage, Issues 7-12
- Act 3: The Glow-Up, Issues 13-18
- Act 4: The Squad, Issues 19-24

The current published issue pages are:

- Issue 1: "On Wednesdays We Use AI"
- Issue 2: "Tell Me What You Want"

## Community Direction

The community concept is "The lAIdies Room": public prompts and questions where readers can learn from each other, plus member profiles so women can find each other by journey stage, tools, struggles, support needs, and places they can help.

Recommended channels:

- Ask the Room
- Send It Energy
- The Try-On Debrief
- Wins of the Week
- Dear lAIdies
- Put It in the Burn Book
- The Receipts

Private submissions are reserved for Laidy Spotlight until Ali edits and approves them.

Member profile intake:

- name, role, location/time zone, public link, and optional photo
- AI journey stage
- tools being used or tested
- current struggles
- what the member wants to learn next
- where the member can offer help
- what kind of support would be useful
- profile visibility preference
- optional opt-in for future lAIdies feature consideration

AI community ops:

- use AI privately to summarize new comments and unanswered questions
- draft suggested replies in the lAIdies voice
- tag comments by theme, support need, moderation risk, and future content potential
- flag sensitive or high-stakes comments for human review
- suggest member matches based on profiles and posts
- keep Ali/Savina as the approval layer for all public replies

Episode production system:

- legacy Claude Code agent was found at `C:\Users\alieakin\OneDrive - amazon.com\Documents\lAIdies_agent.md`
- updated production-agent instructions now live in `LAIDIES-PRODUCTION-AGENT.md`
- each issue gets a reusable source package in `content/episodes/issue-XX.json`
- `scripts/build-episode-assets.js` generates `content/episode-index.json` and `social/episodes/issue-XX-instagram-kit.md`
- evergreen Instagram ideas stay in `INSTAGRAM-CONTENT-BANK.md`; episode-specific content comes from the generated kits

## Next Website Steps

Most likely next builds:

1. Confirm the Buttondown `laidies` publication is live and accepting subscribers.
2. Add previous and next navigation to each issue page.
3. Create `episodes.html` once the homepage gets too long.
4. Create `glossary.html` as terms accumulate.
5. Create `squad.html` closer to Act 4.
6. Connect member profiles and Laidy Spotlight opt-in to a private form backend with photo upload.
7. Start manual AI-assisted comment triage, then connect Hyvor webhooks to a private review queue once public threads are active.
8. Eventually automate homepage/archive cards from `content/episode-index.json` so the website uses the same source as social planning.

## Recovery Fix Applied

During recovery, Issue 2 still pointed at a missing `lAIdies_images/` folder. The image paths in `issues/issue-02.html` were updated to use the existing files in `assets/`.

Verified locally:

- homepage renders with no broken images
- Issue 2 renders with all images
- LAIDY advice interaction works
- Laidy Spotlight preview interaction works
- local href/src check passes

## Important Note

The original chat is not currently visible in the Codex thread list, but the project files and planning docs contain enough information to continue the website design work from here.
