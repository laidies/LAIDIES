# LAIDIES Website Launch Notes

## Website Structure

- `index.html`: homepage, real issue archive, community callout, weekly modules, Buttondown subscribe form.
- `issues/issue-01.html`: hosted full HTML for Issue #1, "On Wednesdays We Use AI."
- `issues/issue-02.html`: hosted full HTML for Issue #2, "Tell Me What You Want."
- `assets/`: copied brand logo and issue images used by the homepage and social previews.
- `community/laidy-spotlight.html`: member profile intake with optional future-feature consent.
- `WEBSITE-BRIEF.md`: source website brief for brand, season structure, pages, and success metrics.
- `REFERENCE-CLOSET.md`: working reference library for future issues and community requests.
- `AI-COMMUNITY-OPS-PLAN.md`: plan for AI-assisted comment triage, reply drafting, moderation review, member matching, and newsletter/content mining.
- `INSTAGRAM-STRATEGY.md`: low-lift Instagram growth strategy for a side-project schedule.
- `INSTAGRAM-CONTENT-BANK.md`: ready-to-use Reels, carousels, Stories, hooks, captions, and beginner posting instructions.
- `LAIDIES-PRODUCTION-AGENT.md`: updated production-agent instructions replacing the old newsletter-only Claude Code workflow.
- `content/episodes/issue-XX.json`: reusable episode source packages.
- `social/episodes/issue-XX-instagram-kit.md`: generated episode-specific Instagram kits.
- `scripts/build-episode-assets.js`: builds social kits and `content/episode-index.json` from episode source files.

## Recommended Publishing Flow

1. Draft or update the episode.
2. Fill `content/episodes/issue-XX.json` with the reusable episode package.
3. Save the public issue HTML under `issues/issue-XX.html`.
4. Run `node scripts/build-episode-assets.js`.
5. Review the generated Instagram kit in `social/episodes/`.
6. Add or update the homepage/archive card in `index.html`.
7. Share the issue URL on LinkedIn instead of pasting the full HTML newsletter.
8. Use a short Buttondown email that links to the issue page.
9. Post or schedule the generated Instagram Reel, carousel, and Story prompts.

## Community Chat Options

- Discord: best if you want casual channels, office hours, and prompt-sharing threads.
- Circle: best if you want a more polished paid or member community later.
- Geneva: best if the vibe should feel social and less technical.
- Slack: best if the audience is already workplace-oriented, but it can feel too worklike.

Start with one public call to action: "Ask your AI question where everyone can learn." Do not route learning questions to email by default. Use a public Instagram thread/comment strategy first, then move to Discord, Geneva, or Circle once there is enough volume to justify a full chat space.

Recommended public channels:

- `Ask the Room`: AI questions and troubleshooting.
- `Send It Energy`: prompts, workflows, and small wins.
- `The Try-On Debrief`: what someone tested with AI that week, what worked, what failed, and what they learned.
- `Wins of the Week`: celebration that does not have to be AI-related.
- `Dear lAIdies`: non-AI advice from the community, including work, confidence, messaging, and office-politics questions.
- `Put It in the Burn Book`: 90s/Y2K reference requests for future issues.
- `The Receipts`: studies, links, screenshots, and useful examples.

## Weekly Sections To Rotate

- Drink of the week
- Tool shelf
- Prompt to try
- AI term in plain English
- Reader question
- Women in AI spotlight
- Tiny workflow upgrade
- Link worth reading

## Engagement Mechanics

- "Remember, lAIdies:" generator: gives readers a reason to click, copy, submit, and share.
- The lAIdies Challenge: turns the sign-off into public user-generated content and gives readers credit.
- The Power Suit Playbook: quick weekly prompts, ratings, and shareable micro-actions between full issues.
- Lipstick rating scale: makes tool evaluation feel branded instead of technical.
- Instagram loop: ask readers to tag `@we.are.laidies` when they try a prompt, submit a sign-off, or rate an AI output.
- Instagram content system: use Reels for discovery, carousels for saves/shares, and Stories for replies, polls, links, and community rituals.
- The lAIdies Room: pushes questions, wins, reference requests, and receipts into public threads so readers can learn from each other. Member profiles capture who is in the room, where they are in their AI journey, what tools they are trying, what they are struggling with, where they need support, and where they can help others. Future features are opt-in, not assumed.
- Reference Closet: keeps the 90s/Y2K canon from getting stale and gives readers a way to shape future issues.
- LAIDY: a lightweight on-site character/concierge that gives funny branded nudges without imitating any specific copyrighted character.
- AI community ops assistant: private triage, summaries, tags, and reply drafts for Ali/Savina. Human approval stays required for public replies.

Brand rule: every interactive feature should either help a woman try AI in under ten minutes, give her a line worth sharing, or make her feel like she is part of the group chat.

## LinkedIn Preview Notes

The homepage includes Open Graph metadata so social platforms have a title, description, URL, and image to preview. It currently points to `assets/ugh-as-if.png`, which is more LinkedIn-friendly than the SVG placeholder.

## Instagram Launch Notes

Use `INSTAGRAM-STRATEGY.md` and `INSTAGRAM-CONTENT-BANK.md` as the operating system for `@we.are.laidies`.

Recommended side-project cadence:

- 3 Reels per week.
- 2 carousels per week.
- 3 Story days per week.
- 1 weekly community prompt.

If the week is chaotic, post one Reel, one carousel, reshare both to Stories, and ask one poll.

## Newsletter Sending Setup

Recommended path: use the site as the branded front door and use a lightweight email service provider behind it. The provider should handle the subscriber list, unsubscribe links, deliverability, and sending; the website should only collect the email address and send it to that provider.

Full setup details are in `COMMUNITY-SUBSCRIBE-SETUP.md`.

Best fit for lAIdies right now: Buttondown. The homepage form is currently pointed at the `laidies` Buttondown publication. Before launch, confirm the publication exists, accepts subscribers, and uses the intended sender details. If the list gets bigger or needs richer automations later, MailerLite is the next likely option.

Launch steps:

1. Create the email provider account and publication/list.
2. Add the sender name as `lAIdies` and connect the reply/from email.
3. Set the Buttondown publication description to: `AI fluency for women with full calendars, high standards, and no patience for beige tech explanations.`
4. Set the Buttondown publication/newsletter name to `lAIdies` so confirmation emails do not display `LAIDIES`.
5. Add the lAIdies icon, pink tint color, and custom confirmation/welcome copy from `email/buttondown/transactional-email-templates.md`.
6. Paste or import the existing HTML issue as a test send.
7. Confirm the current Buttondown subscribe endpoint in `index.html`.
8. Send a test to Gmail, Outlook, and mobile before sending to the full list.

Do not use personal Gmail or manual BCC for the real newsletter. It creates deliverability, unsubscribe, privacy, and scaling problems exactly when the brand starts working.

## Brief-Driven Next Builds

- Create dedicated `episodes.html` once the homepage gets too long.
- Add previous/next navigation to the standalone issue HTML pages.
- Build a real `glossary.html` as terms accumulate.
- Build `squad.html` closer to Act 4, with downloadable persona templates.
- Confirm Buttondown signup works end to end on the live GitHub Pages URL.
- Connect member profiles to a private backend such as Tally, Airtable, or another form/database tool before treating submissions as real.
- Start with manual AI-assisted comment triage, then connect Hyvor webhooks to a private review queue once the room has enough activity.
- Add real public comments/community platform once Instagram threads are not enough.
