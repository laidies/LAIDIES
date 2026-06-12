# lAIdies Member Directory Design

## Goal

Build a community directory that helps corporate women find each other by background, AI journey stage, tools, struggles, support needs, and help offered.

The directory should feel useful before it feels cute. The cute layer is the 90s trading-card treatment, school-photo laser backgrounds, and optional Y2K yearbook photo edits.

## Member Experience

The page should ask for only the information that makes the directory valuable:

- Name as shown.
- Role, team, or short work description.
- Location or time zone.
- LinkedIn or public link.
- AI journey status, selected from low-pressure responses such as:
  - "I have no idea what I am doing, but I am having fun."
  - "I am so lost, please send help."
  - "I have opened the tool twice and deserve credit."
  - "I am trying things when work gives me a reason."
  - "I cannot believe it took me so long to start. I am making real progress."
  - "I am building workflows and becoming pleasantly annoying about it."
  - "I have been doing this for a while, and I am here to help."
- Tools being used or tested.
- What she is struggling with.
- What she wants to learn next.
- Where she can offer help.
- What support would be useful.
- Whether she is open to being contacted through the approved community channel.
- Photo upload, or a no-face alternative such as a favourite 90s/Y2K character, item, singer, actor, or classic school-photo laser background.
- Profile visibility preference.
- Optional feature opt-in.
- Optional AI-edited Y2K yearbook photo interest.

## Directory Navigation

The live directory should support quick filters:

- AI journey status.
- Tools: ChatGPT, Claude, Gemini, Copilot, Midjourney, Perplexity, Notion AI, Canva AI, etc.
- Needs help with: prompting, workflow design, confidence, executive messaging, tool selection, automation, image generation, analysis, leadership buy-in.
- Can help with: writing, strategy, analytics, operations, change management, comms, PM, leadership, training, finance, marketing, legal-safe review.
- Location or time zone.
- Open to connect.
- Featured member.

Search should scan name, role, tools, needs, and help offered.

## Card Design

Member cards should look like 90s trading cards with lAIdies polish:

- Laser or holographic school-picture backgrounds.
- Strong border and sticker-like shadow.
- Photo or avatar panel.
- Name, role, AI journey stage, and 2-3 useful tags.
- Optional "Open to connect" badge.
- Optional "Featured lAIdy" badge after human approval.

Cards should never expose private fields. The public card should only use fields the member approved.

## Photo And Avatar Rules

Members should not feel pressured to use a face photo.

Offer these options:

- Upload a photo.
- Use a favourite 90s/Y2K character, singer, actor, item, or vibe as inspiration.
- Use a classic school-photo laser backdrop with no face image.
- Decide later.

Do not publish copyrighted character images without permission. The safe version is an inspired avatar or text-based card background, not a direct image of a copyrighted character.

## Y2K Yearbook AI Edit

This should be optional and consent-led.

Recommended workflow:

1. Member uploads a photo and checks the Y2K yearbook interest box.
2. The system creates an AI-edited version privately.
3. The member or Ali reviews the edited version.
4. Nothing is published until the member has approved the final image.

The style prompt should aim for:

> Early-2000s corporate yearbook portrait, glossy flash photography, soft glam, laser school-photo backdrop, playful but professional, polished lighting, not a caricature.

Optional style ingredients:

- Roll-on glitter, glossy lip shine, butterfly clips, or Claire's-style accessories.
- Bright Y2K blazer or power jacket.
- Newsboy hat, layered preppy polos, lace-trim tank, hip belt, or low-rise denim as era cues.
- Early-2000s trucker-hat energy without readable logos.
- Dance Mix CD cover shoot, glitter pen, flip phone, Caboodles, or mall-photo lighting.
- Practical Magic softness: candlelit, sisterly, intuitive, but still professional.

Avoid changing protected traits, body shape, age, or professional identity. This should be a light era-styling edit, not a transformation into a different person.

## Backend Needed Before Launch

The live version needs:

- Private form intake with file upload.
- Member database.
- Consent fields stored with every record.
- Public/private field mapping.
- Admin review before publishing.
- Image storage.
- Optional AI image edit queue.
- Member approval field for AI-edited images.
- Abuse/report mechanism once profiles are public.

Good first stack:

- Tally or Airtable Form for intake.
- Airtable as the member database.
- Make or Zapier for draft generation.
- Manual approval before website publishing.

## AI Support

AI can help Ali/Savina by drafting:

- A private member summary.
- A public card summary.
- Connection tags.
- Possible member matches.
- A spotlight draft if the member opted in.
- A short message asking for missing info.

AI should not publish profiles, infer private attributes, or expose member details that were not approved for public sharing.

## Community Trading Card Pack

The website should replace static image dumps with a growing card pack.

Each newsletter image can become a collectible card:

- Issue number.
- Card title.
- Related skill or lesson.
- "Earned by" action.
- Image from the episode.

Possible member unlocks:

- Set up a profile.
- Post in Ask the Room.
- Reply to another member with a useful example.
- Complete the weekly try-on.
- Share a prompt before-and-after.
- Submit a reference to the Burn Book.
- Help another member get unstuck.

At launch, the card pack can be a visual preview only.

Recommended MVP:

1. Member creates a profile.
2. Member completes a listed unlock task.
3. Member claims the card on the honor system through a lightweight form.
4. Ali/Savina approve it.
5. The earned card is manually added to the member profile card or directory record.

This does not require a public login system on day one. It can work with Airtable, Tally, or the chosen community platform as the private source of truth.

To associate the claim with the right person without login, the claim form needs one stable member identifier:

- Email address used for the member profile.
- LinkedIn URL used on the member profile.
- A private member code sent after profile setup.
- A prefilled claim link sent by email after profile setup.

Recommended no-login flow:

1. Member creates a profile with email and optional LinkedIn.
2. Ali/Savina or automation sends a "claim cards" link to that email.
3. The claim form asks: email, card being claimed, and a checkbox saying "I completed this action."
4. Airtable/automation matches the email to the member profile record.
5. The card is added to that member profile after optional review.

This keeps the game low-friction and trust-based, while still giving the system enough information to know whose profile should receive the card.

A real login or member account system becomes useful when members should be able to:

- See their own card collection automatically.
- Unlock cards without manual review.
- Track points or badges.
- Prevent duplicate unlocks.
- Keep private/public card settings.
- Carry their collection between the website and community platform.

Do not build login first. Build the ritual first. If members actually care about collecting cards, then add account-based tracking.

## Fun And Games Hub

The website should have a dedicated Fun & Games area for playful interactive tools. This keeps the useful-but-silly features from feeling scattered, and it should feel like a 90s/Y2K throwback first. AI can appear where it helps, but the games should also cover career, confidence, life, work drama, ambition, and community.

Live or prototype games:

- fAIry Godmother: ask LAIDY for a practical nudge.
- Sign-Off Generator: generate a "Remember, lAIdies" closer.
- Five-Minute Try-On: shuffle a tiny work dare or low-stakes experiment.
- Trading Card Pack: browse episode cards and the actions that unlock them.
- Madame CLAI-O: pull a 90s psychic-hotline-style career/life reading for vibe check, message, and next move.
- Girl Talk Prompt Deck: draw a truth-or-dare-style question for work drama, ambition, confidence, or group-chat honesty.
- Dream Phone: choose a caller card, dial the number on the card, and get a message back from that friend archetype. Include special-card nods like Share a Secret, Speaker Phone, and Mom Says Hang Up.

Madame CLAI-O is the stronger first wrapper for the tarot/fortune idea because it is instantly 90s, funny, and more specific to the brand than a generic tarot reader. Keep the homage broad: psychic hotline, neon phone, cards, career omens, and campy infomercial energy. Do not use Miss Cleo's exact name, likeness, accent, or biography. A paper fortune teller can become a later interaction pattern inside this family: tap a folded corner, reveal a small prompt, then get a next move.

Each game should either:

- make the reader smile enough to click
- offer a tiny career, confidence, life, or work nudge
- teach one small AI/work concept without making the whole thing feel like homework
- help someone take one next action
- feed a useful community prompt
- unlock or connect to a member trading card

Avoid games that are only decorative, but do not make every game about AI. The fun should lower the barrier to action and make the site worth revisiting even when someone is not in a learning mood.
