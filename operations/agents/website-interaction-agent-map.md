# Website Interaction Agent Map

Use this map to confirm that every live or staged reader interaction has a section agent owner.

## Homepage And Issue Flow

| Website interaction | Location | Owner agent | Notes |
| --- | --- | --- | --- |
| Current issue / episode archive cards | `index.html#episodes` | Episode Archive / Current Issue Agent | Owns release gating so scheduled issues do not look published. |
| Issue pages | `issues/issue-XX.html` | Editor-in-Chief Agent + Episode Archive / Current Issue Agent | Editorial quality plus navigation/release state. |
| Newsletter signup | `index.html#signup` | Newsletter Signup Agent | Owns Buttondown path and subscription friction. |

## Learning Interactions

| Website interaction | Location | Owner agent | Notes |
| --- | --- | --- | --- |
| Magazine Quiz | `index.html#quiz` | Quiz Agent | Issue-specific confidence checks and scoring copy. |
| Trading Card Pack | `index.html#card-pack` | Card Pack Agent | Prompt cards, collection behavior, issue-specific cards. |
| Glossary Rolodex | `index.html#glossary` | Glossary / Reference Closet Agent | Term navigation and show-all behavior. |
| Reference Closet | `index.html#reference-closet` | Glossary / Reference Closet Agent | Search, drawer filters, canon freshness. |
| Hot Goss | `index.html#hot-goss` | Hot Goss Agent | Website-only AI news, receipts, and concept connection. |

## Fun & Games Interactions

| Website interaction | Location | Owner agent | Notes |
| --- | --- | --- | --- |
| fAIry Godmother / Ask LAIDY | `index.html#laidy` | fAIry Godmother / LAIDY Agent | Advice console, energy modes, safe boundaries. |
| Mme CLAI-O | Fun & Games card | Mme CLAI-O Agent | Gold-standard card/read/message/move copy. |
| Dream Phone | Fun & Games card | Dream Phone Agent | Role-based caller advice, special cards, dialer. |
| Businesswomen's Special fortune teller | Fun & Games card | Businesswomen's Special Agent | Paper fortune-teller drink ritual with Proof Positive and Zero Proof lanes, mood flap reveal, result clarity, and no drinking-pressure framing. |
| Girl Talk Prompt Deck | Fun & Games card | Girl Talk Prompt Deck Agent | Work drama/confidence prompt cards. |
| Five-Minute Try-On | `index.html#playbook` | Five-Minute Try-On Agent | Small work dares and issue concept reinforcement. |
| Sign-Off Generator | `index.html#challenge` | Sign-Off Generator Agent | Closers, copy action, community submissions. |
| DJ JAIDY | `index.html#house-dj` | DJ JAIDY Agent | Weekly AI song drops and House DJ identity. |
| Playlists / Mix CD booth | `index.html#playlist` | Playlist / Mix CD Agent | Starter playlists, copy track list, Spotify links, mix submissions. |

## Community Interactions

| Website interaction | Location | Owner agent | Notes |
| --- | --- | --- | --- |
| Community room links | `index.html#community-board` | Community Room Agent | Participation paths and weekly room clarity. |
| Ask the Room | `community/ask-the-room.html` | Community Room Agent | Hyvor room prompt and safety. |
| Send-It Energy | `community/send-it-energy.html` | Community Room Agent | Wins and encouragement. |
| Try-On Debrief | `community/try-on-debrief.html` | Community Room Agent + Five-Minute Try-On Agent | Issue Try-On reflection. |
| Wins | `community/wins.html` | Community Room Agent | Useful community proof. |
| Dear lAIdies | `community/dear-laidies.html` | Community Room Agent | Questions and advice boundaries. |
| Burn Book | `community/burn-book.html` | Community Room Agent + Chief Technical Accuracy Agent | Wrong AI answers and verification receipts. |
| Mix CD Exchange | `community/mix-cd-exchange.html` | Playlist / Mix CD Agent + DJ JAIDY Agent | Member mixes and song requests. |
| Comment Card | `community/comment-card.html` | Comment Card / Feedback Agent | Reader feedback intake and product signal. |
| Member directory / build your card | `community/laidy-spotlight.html` | Member Card Agent | Consent, card preview, image workflow promise, founder reward shelf, and weekly reward/sticker/badge updates. |
| Clubhouse Pass / reward sync | `index.html#member-passport` | Member Card Agent + Data Stewardship & Privacy Agent | Email auth, local-only versus signed-in persistence, reward sync, post-confirm card-builder path, and launch-grade email delivery. |
| Chat Room Digest | `community/chat-room-digest.html` | Chat Room Digest Agent | Answered/tips/unanswered/repeated/needs-receipts queues. |

## Audit Rule

When a new website interaction is added, update:

- `operations/agents/agent-charters.md`
- `operations/agents/weekly-agent-council-template.md`
- `scripts/run-weekly-production.js`
- this map

If the new interaction collects user data, routes community content, gives advice, or creates public visibility, run the Reputation/Safety Gate before launch.

Weekly Command Center must also surface any interaction that creates recurring work for Ali, including reward shelf updates, per-issue Fun Pack loading, new canon intake, Member Pass setup, and handover/context health.
