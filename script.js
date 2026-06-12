const rememberQuotes = [
  "You'll need to pour yourself more than a cup of ambition to keep up in the male-dominated world of AI, but lucky for you, this series comes in small sips.",
  "The Spice Girls did not say \"tell me what you vaguely want, what you sort of generally want.\" And neither should you. Be specific. Be bold. Be David Rose about it.",
  "Dolly did not build Dollywood by waiting for permission. And she definitely did not take a 40-hour course first.",
  "If Sophia Petrillo can tell a story that starts in Sicily and ends with life advice, you can type a question into ChatGPT.",
  "AI is the new power suit. Tailor it, do not let it wear you.",
  "Cher had a closet computer in 1995. You can open the tab.",
  "Regina George confidence is only useful when you have receipts.",
  "A vague prompt is just an MSN away message with a budget.",
  "Dolly gave us 9 to 5. AI gives us a fighting chance at leaving before 7.",
  "If David Rose can be that specific about sweaters, you can be that specific about a stakeholder update.",
  "Do not let a man in a fleece vest be the only person in the room who knows how to use the machine.",
  "The future is not waiting for you to find a free weekend.",
  "Ask better questions. Wear better shoes. Keep your judgment.",
  "A win is a win, even if AI had absolutely nothing to do with it.",
  "If the output has no receipts, it is just body glitter with a font.",
  "Your first prompt can be messy. So was everyone's first AIM screen name.",
  "You are allowed to ask the room before reinventing the wheel in heels.",
  "Your AI skills gap is Carrie Bradshaw's overdraft: manageable at first, quietly catastrophic if you ignore it.",
  "Do not get so busy doing the work that you forget to let the tool help.",
  "If Elle Woods can submit a video essay and win the room, you can ask AI for a better first draft.",
  "If Buffy waited until she felt ready, Sunnydale would have had a very different quarterly outlook.",
  "The AI will not know it is wrong just because it sounds expensive. That part is still your job.",
  "A prompt without context is a tiny backpack purse: cute, nostalgic, and holding almost nothing useful.",
  "You are not behind. You are at the part of the movie where the montage starts.",
  "Bring the question, the messy attempt, and the receipts. The room can work with that.",
  "If the first output is bad, congratulations. You found the fitting room, not the final look.",
  "You can be curious without being available for nonsense. This applies to AI and meetings.",
  "Do not let the machine borrow your judgment and return it with glitter on it.",
  "Small sips. Big moves. Very reasonable shoes optional.",
  "If the model gives you Regina George energy, ask who said it, where it came from, and whether anyone has receipts.",
  "Your standards are not the problem. They are the prompt.",
  "We are trAIlblazers here, not idea thieves. Credit the source, then improve the output.",
];

const tryOnChallenges = [
  "Send the shorter version of the message you have been over-editing.",
  "Ask one specific question instead of waiting for someone to read your mind.",
  "Rename the meeting invite so everyone knows the actual decision.",
  "Give yourself 10 minutes to make the first slide less beige.",
  "Text a work friend the question you are pretending is too obvious to ask.",
  "Write the first sentence of the hard email, then stop making it dramatic.",
  "Delete one apology from a draft before it leaves your laptop.",
  "Ask for the template, example, or old deck instead of rebuilding the mall from scratch.",
  "Block 25 minutes for the task you keep carrying around like a tiny backpack purse.",
  "Write the meeting follow-up in five bullets: decision, owner, date, risk, next step.",
  "Ask AI to rewrite one messy email three ways: direct, warmer, and executive-clean.",
  "Paste a meeting agenda into AI and ask what decision the group is actually avoiding.",
  "Give AI your draft update and ask what a VP will ask next.",
  "Ask AI for five sharper versions of the question you were about to ask.",
  "Paste a policy paragraph into AI and ask for the cocktail-party explanation.",
  "Ask AI to turn your notes into a 150-word update for someone with two minutes and no patience.",
  "Give AI a vague prompt, then give it the David Rose version. Compare the outputs.",
  "Ask AI to find the sentence in your draft that sounds most like a LinkedIn throw pillow.",
  "Ask AI to turn a rambling voice note into a clean action list with owners and dates.",
  "Paste a difficult message into AI and ask for versions that are firm, neutral, and warm-but-not-weird.",
  "Ask AI to make your idea sound boardroom-ready without sanding off the point.",
  "Paste a long thread into AI and ask for the three decisions, two risks, and one person who needs a reply.",
  "Ask AI to turn a messy thought into a one-slide outline: headline, three bullets, and speaker notes.",
  "Give AI a project update and ask what is missing before you send it to leadership.",
  "Ask AI to write a meeting follow-up that separates decisions, owners, deadlines, and open questions.",
  "Paste a draft into AI and ask it to remove apologies, filler, and anything that sounds like you are asking permission to exist.",
  "Ask AI to turn a vague goal into a checklist you could actually do before Friday.",
  "Give AI a stakeholder concern and ask for three replies: calm, concise, and receipts-forward.",
  "Ask AI to summarize one article for your team: why it matters, what changed, and what to watch next.",
  "Paste a messy list of ideas into AI and ask it to sort them into now, later, and absolutely not today.",
];

const fortuneCards = [
  {
    card: "The Butterfly Clip",
    read: "You are overthinking something that only needs one cute, decisive move.",
    message: "The room does not need a ten-point thesis. It needs you to say the thing clearly.",
    move: "Send the shorter version before your brain adds a subplot.",
  },
  {
    card: "The Away Message",
    read: "You are technically available, spiritually buffering.",
    message: "Your calendar is not a personality. Protect one hour like it is your AIM password.",
    move: "Block the time, name the task, and stop apologizing to the air.",
  },
  {
    card: "The Mall Directory",
    read: "You are not lost. You are standing next to the map refusing to admit you need it.",
    message: "Ask for the direction, the example, the template, or the intro. Mystery is not a management style.",
    move: "Ask one specific person one specific question today.",
  },
  {
    card: "The Glitter Gel Pen",
    read: "You want the work to feel more fun because the current version has beige conference-room lighting.",
    message: "Add a hook, a joke, a sharper title, or a visual. Professional does not have to mean flavorless.",
    move: "Change the first line. If the first line gets better, the whole thing wakes up.",
  },
  {
    card: "The Platform Sandal",
    read: "You are ready for a bigger step, but you keep pretending this is about comfort.",
    message: "It is allowed to feel awkward and still be correct. Growth rarely arrives in sensible flats.",
    move: "Make the ask. The wobble is not evidence against you.",
  },
  {
    card: "The Clear Hotline Phone",
    read: "The answer is not hiding. It is ringing loudly on a transparent phone from 1999.",
    message: "Pick up before your brain sends the call to voicemail and calls it strategy.",
    move: "Name the decision, the deadline, and the person who needs to hear it.",
  },
  {
    card: "The Caboodle",
    read: "Your tools are everywhere, and your patience is under a butterfly clip somewhere.",
    message: "The problem is not that you have no resources. The problem is that none of them have a home.",
    move: "Put one prompt, one template, and one useful link in the same place today.",
  },
  {
    card: "The Roll-On Glitter",
    read: "You are trying to make a dull thing delightful, and frankly, correct.",
    message: "A little sparkle is not the opposite of substance. It is how people remember the substance.",
    move: "Add one memorable phrase, example, or visual before you send it.",
  },
  {
    card: "The AIM Door Slam",
    read: "Someone has exited the conversation emotionally, but the window is still open.",
    message: "Do not keep typing into silence. Ask for the decision, the owner, or the next step.",
    move: "Send one clean follow-up with a deadline and no apology confetti.",
  },
  {
    card: "The Burned CD",
    read: "You are curating too many tracks and calling it a plan.",
    message: "Sequencing matters. Put the opener first, the banger second, and the deep cut after they trust you.",
    move: "Reorder the work so the first three points tell the story.",
  },
  {
    card: "The Pink Razr",
    read: "You want to be reachable, but not available to every tiny emergency wearing lip gloss.",
    message: "Access to you is not the same thing as ownership of your attention.",
    move: "Set one boundary in writing before the day gets louder.",
  },
  {
    card: "The Claw Clip",
    read: "You are holding the whole thing together with one plastic hinge and prayer.",
    message: "This is not sustainable just because it has technically worked before.",
    move: "Pick one task to delegate, delete, or turn into a template.",
  },
  {
    card: "The Low-Rise Jeans",
    read: "The current plan is technically on, but nobody should have to live like this.",
    message: "If the process only works when everyone holds their breath, it does not fit.",
    move: "Fix the waistband: scope, timeline, owner, or expectation.",
  },
  {
    card: "The Claire's Receipt",
    read: "Tiny purchases have become a pattern, and the pattern has receipts.",
    message: "The small things are telling you the real story. Listen before it becomes a quarterly issue.",
    move: "Write down the repeat friction and ask what system would prevent it.",
  },
  {
    card: "The Trucker Hat",
    read: "You are trying on an identity before you are ready to admit it looks good.",
    message: "Sometimes the role feels costume-y because it is new, not because it is wrong.",
    move: "Do one thing today as the person who already has the title.",
  },
  {
    card: "The Newsboy Cap",
    read: "You are giving 'casual Friday' to a situation that needs actual editorial judgment.",
    message: "Cute angle, but the story still needs a headline, a point, and a reason to keep reading.",
    move: "Rewrite the title so a busy woman knows why she should care.",
  },
  {
    card: "The Lip Smacker",
    read: "The idea is good, but the delivery needs flavor.",
    message: "Useful does not have to be dry. Dry is how good advice ends up unread in a tab cemetery.",
    move: "Add the analogy that would make your smartest friend laugh and nod.",
  },
  {
    card: "The Mall Fountain",
    read: "You keep tossing wishes into the same water and calling it momentum.",
    message: "A wish is not a plan. A plan has a next action and usually fewer coins.",
    move: "Turn the wish into one sentence that starts with 'Today I will.'",
  },
  {
    card: "The Food Court Table",
    read: "Everyone has opinions, one person has napkins, and somehow this is where clarity happens.",
    message: "Bring the messy version to the table. The polished version is not required for useful feedback.",
    move: "Ask the group for one improvement, not a standing ovation.",
  },
  {
    card: "The Blockbuster Return Slot",
    read: "There is something overdue that you keep pretending is still within the rental period.",
    message: "The late fee is emotional now. Return the thing, close the loop, or ask for more time.",
    move: "Send the status update before someone has to ask.",
  },
  {
    card: "The Lava Lamp",
    read: "The answer is moving slowly, dramatically, and with more mood lighting than necessary.",
    message: "Not every decision gets faster because you stare at it. Some things need time and a container.",
    move: "Set a review date, then stop poking it every twelve minutes.",
  },
  {
    card: "The Tamagotchi",
    read: "A tiny obligation is beeping because you ignored it for too long.",
    message: "Maintenance is not glamorous, but neither is explaining why the whole thing died.",
    move: "Feed the system: update the tracker, reply to the message, or clean the data.",
  },
  {
    card: "The Magic 8 Ball",
    read: "You already know the answer, but you would like a plastic orb to take liability.",
    message: "Outlook good, but only if you stop outsourcing your judgment to anything round and mysterious.",
    move: "Write the recommendation and the reason. Then send it to one reviewer.",
  },
  {
    card: "The Scrunchie",
    read: "You need flexibility, not a full reinvention with a launch plan.",
    message: "Pull the work back, twist once, and make it manageable. Not everything needs a blowout.",
    move: "Create the simpler version that still gets the job done.",
  },
  {
    card: "The Spice Rack",
    read: "You are saying you want flavor, but the prompt is giving plain oatmeal.",
    message: "Specificity is seasoning. Add audience, tone, examples, and what good looks like.",
    move: "Rewrite one vague ask with five concrete details.",
  },
  {
    card: "The Denim Jacket",
    read: "You do not need a new personality. You need one reliable layer.",
    message: "Build a reusable frame for the work you keep doing from scratch.",
    move: "Turn your last good email, prompt, or summary into a template.",
  },
  {
    card: "The Platform Sneaker",
    read: "You want height without admitting you are ambitious. Interesting.",
    message: "Wanting more does not make you difficult. It makes you awake.",
    move: "Say the ambition plainly in one sentence and do not laugh it off.",
  },
  {
    card: "The Yearbook Caption",
    read: "You are worried about how this will look later, which means you care about the story.",
    message: "Good. Now make the caption accurate, not self-deprecating.",
    move: "Describe the win without shrinking it for comfort.",
  },
  {
    card: "The Locker Mirror",
    read: "You are checking everyone else's reaction before checking your own face.",
    message: "External validation is not a project plan. It is lip gloss lighting.",
    move: "Ask yourself what you would recommend if this were your friend's problem.",
  },
  {
    card: "The Glitter Body Spray",
    read: "The room can tell when something is covering up panic with sparkle.",
    message: "Polish is lovely. Clarity is better. Use both, in that order.",
    move: "Cut the decorative paragraph and keep the sentence with the point.",
  },
  {
    card: "The Dance Mix Volume 4",
    read: "You have energy, but it is not yet arranged into a tracklist.",
    message: "Momentum without sequencing becomes noise with a beat.",
    move: "Put the next five tasks in the order they actually need to happen.",
  },
  {
    card: "The Jelly Sandal",
    read: "This looks fun, but there may be a blister by 3 p.m.",
    message: "A shiny opportunity still needs a friction check.",
    move: "Ask what support, scope, and authority come with the yes.",
  },
  {
    card: "The Blue Eyeshadow",
    read: "You are making a bold choice, and part of you knows it.",
    message: "Bold is fine. Just blend the edges so the idea can survive office lighting.",
    move: "Pair the big idea with one practical next step.",
  },
  {
    card: "The VHS Tracking Line",
    read: "The message is almost clear, but the screen keeps wobbling.",
    message: "This needs adjustment, not abandonment.",
    move: "Ask AI or a smart friend: 'What is the clearest version of this?'",
  },
  {
    card: "The Polaroid",
    read: "You are judging the picture before it has had time to develop.",
    message: "Not every first draft is evidence. Some are just chemistry in progress.",
    move: "Wait ten minutes, then edit with taste instead of panic.",
  },
  {
    card: "The Pager",
    read: "Something keeps interrupting you with a code you never agreed to learn.",
    message: "Translate the signal. Is it urgent, important, political, or just loud?",
    move: "Sort the interruption before you respond to it.",
  },
  {
    card: "The Beaded Curtain",
    read: "There is a threshold here, and you are making it more dramatic than it needs to be.",
    message: "Walk through. The beads will make noise. That is their whole job.",
    move: "Take the first visible step and let the drama be decorative.",
  },
  {
    card: "The CD Skip",
    read: "You keep landing on the same part of the problem.",
    message: "That is not a coincidence. That is the scratch.",
    move: "Fix the recurring issue instead of replaying the whole meeting.",
  },
  {
    card: "The Rhinestone Belt",
    read: "You are trying to make structure look optional. It is not.",
    message: "The sparkle works because the belt is holding something together.",
    move: "Add the structure: owner, date, decision, and next step.",
  },
  {
    card: "The Lip Gloss Wand",
    read: "You are one swipe away from making the draft presentable.",
    message: "Do not rebuild the whole thing. Finish the surface pass and move on.",
    move: "Fix the opener, remove one hedge, and send the cleaner version.",
  },
  {
    card: "The Portable CD Player",
    read: "You are trying to move fast while holding something delicate and emotionally important.",
    message: "That is possible, but you need anti-skip protection.",
    move: "Build in one review point before the work goes public.",
  },
  {
    card: "The Charm Bracelet",
    read: "Every little win is starting to add up, even if it jingles when you type.",
    message: "Stop dismissing small progress because it is not a full transformation montage.",
    move: "Write down three things you can do now that felt impossible last month.",
  },
  {
    card: "The Glitter Folder",
    read: "Your receipts exist. They are just not organized enough to defend you yet.",
    message: "A win you cannot find is still a win, but it is less useful in a meeting.",
    move: "Create one brag file and add the last three useful receipts.",
  },
  {
    card: "The Orange Couch",
    read: "The group needs a place to sit with the weird question.",
    message: "You do not have to solve it alone in a hallway monologue.",
    move: "Bring the question to the room with what you tried and what is stuck.",
  },
  {
    card: "The Ceramic Flat Iron",
    read: "You are applying heat to something that only needed a comb.",
    message: "Not every issue needs maximum intensity. Some need a calmer tool.",
    move: "Choose the least dramatic fix that still works.",
  },
  {
    card: "The Mini Backpack",
    read: "You are carrying too much in a bag designed for lip gloss and vibes from 2001.",
    message: "Capacity matters. Stop calling overload a time management issue.",
    move: "Remove one commitment before adding another shiny thing.",
  },
  {
    card: "The Frosted Lipstick",
    read: "The idea is very visible, but the tone may be doing too much.",
    message: "Shine is good. Frostbite is not the goal.",
    move: "Make the message warmer, shorter, and less like it was typed during a weather event.",
  },
  {
    card: "The Group Project Poster",
    read: "You are doing everyone's letters in bubble font again.",
    message: "Being reliable is not the same as volunteering to absorb the entire mess.",
    move: "Ask who owns which piece, by when, in writing.",
  },
  {
    card: "The Scholastic Order Form",
    read: "You want six things, but the budget, time, and attention only cover two.",
    message: "Choose like a woman with standards and a finite backpack.",
    move: "Pick the two highest-value items and circle them in hot pink.",
  },
  {
    card: "The Sequin Tank",
    read: "You are wondering if it is too much. It might be. That may be the point.",
    message: "If the room is too beige, a little shine can be public service.",
    move: "Keep the bold part and cut the part that is just nervous decoration.",
  },
  {
    card: "The Delia's Catalog",
    read: "You have too many options and every one of them is wearing a different tiny tank top.",
    message: "Choice is only powerful once you stop circling everything on the page.",
    move: "Pick one direction, one backup, and one thing you are officially not buying.",
  },
  {
    card: "The AOL Dial-Up Tone",
    read: "The connection is happening, but everyone involved is making alarming noises.",
    message: "Slow does not mean broken. It means the system is trying to connect through seventeen layers of old wiring.",
    move: "Give the process a cleaner input and one minute to load.",
  },
  {
    card: "The Frosted Hair Streaks",
    read: "You are making a small change that everyone is going to notice immediately.",
    message: "That does not make it wrong. It makes it visible.",
    move: "Prepare the one-sentence explanation before you walk into the room.",
  },
  {
    card: "The Trapper Keeper",
    read: "Your brain has tabs, pockets, stickers, and exactly one loose permission slip.",
    message: "Organization is not a moral failing. It is how good ideas survive Tuesdays.",
    move: "Make one home for the notes, links, and decisions before they become hallway folklore.",
  },
  {
    card: "The Bulletin Board Border",
    read: "The content is fine, but the edges are doing absolutely nothing for you.",
    message: "Presentation matters because busy people decide whether to care before they decide whether to agree.",
    move: "Add the headline, the spacing, and the one visual cue that says where to look.",
  },
  {
    card: "The Gel Pen That Ran Out",
    read: "You started with flair and are now writing in emergency pencil.",
    message: "Running out of energy halfway through does not mean the idea was bad. It means the format was too long.",
    move: "Cut the draft by one-third and keep the sentence with the pulse.",
  },
  {
    card: "The Babysitters Club Notebook",
    read: "The group needs roles, not more enthusiasm in matching handwriting.",
    message: "Friendship is lovely. Accountability is how the flyer actually gets printed.",
    move: "Write down who owns the plan, the backup, the message, and the snacks.",
  },
  {
    card: "The Capri Pant",
    read: "This solution is almost full-length but keeps stopping at a confusing place.",
    message: "Half a process can be worse than no process if everyone trips over the missing part.",
    move: "Name what happens before, during, and after the handoff.",
  },
  {
    card: "The Glitter Eyeshadow Palette",
    read: "You are tempted to use every color because every color is technically available.",
    message: "Restraint is not boring. It is why the sparkle lands instead of becoming a craft accident.",
    move: "Choose one main point, one accent, and leave the rest in the palette.",
  },
  {
    card: "The Nokia Brick",
    read: "You are underestimating the plain sturdy thing because it does not look glamorous.",
    message: "Durable beats dramatic when the week is already doing parkour.",
    move: "Use the simple system that survives being dropped.",
  },
  {
    card: "The Lisa Frank Binder",
    read: "Your idea is loud, colorful, and more structured than people expect.",
    message: "Do not flatten it to look serious. Make the structure obvious and let the color do its job.",
    move: "Lead with the practical outcome, then let the personality through.",
  },
  {
    card: "The School Dance Chaperone",
    read: "There is supervision in the room, and everyone is pretending not to notice.",
    message: "A little governance is not the enemy of fun. It is why the lights stay on.",
    move: "Add the review step before the experiment becomes a rumor.",
  },
  {
    card: "The Bonne Bell Rollerball",
    read: "You are trying to make the moment feel effortless, but effort is absolutely visible.",
    message: "That is fine. The goal is not to look untouched by work. The goal is to make the work easier to receive.",
    move: "Smooth the delivery, not the substance.",
  },
  {
    card: "The Magazine Tear-Out",
    read: "Something worth saving is hiding in a page you were about to recycle.",
    message: "Clip the useful part before the whole issue goes into the mental blue bin.",
    move: "Save one line, one example, or one template from today's work.",
  },
  {
    card: "The Inflatable Chair",
    read: "This plan looks fun, but it may slowly deflate while people are sitting on it.",
    message: "If the support is mostly vibes and air, check it before inviting everyone over.",
    move: "Ask what resourcing, ownership, and backup plan actually exist.",
  },
  {
    card: "The Floppy Disk",
    read: "You are trying to save something important in a format that no longer fits the moment.",
    message: "The content may still be good. The delivery needs an upgrade.",
    move: "Move the useful idea into the channel people actually use now.",
  },
  {
    card: "The Butterfly Hair Clamp",
    read: "You are holding back one section and calling the whole hairstyle handled.",
    message: "The visible piece is not the entire problem. Something underneath is still loose.",
    move: "Ask what assumption, dependency, or missing owner is hiding below the top layer.",
  },
  {
    card: "The Sticker Photo Booth",
    read: "You need the same story in four tiny frames, not one chaotic group shot.",
    message: "Sequence creates charm. Without it, everyone is blinking.",
    move: "Break the update into before, problem, change, and next step.",
  },
  {
    card: "The Varsity Jacket",
    read: "You have earned more credibility than you are currently wearing.",
    message: "Stop acting like you snuck onto the team. Your name is on the sleeve.",
    move: "Claim the work clearly: what you built, what changed, and why it matters.",
  },
  {
    card: "The Payphone Quarter",
    read: "You are waiting for someone else to make the call when the money is already in your hand.",
    message: "Permission may not arrive with a dial tone. Sometimes you place the call anyway.",
    move: "Ask for the meeting, the answer, or the decision directly.",
  },
  {
    card: "The Prom Committee Clipboard",
    read: "The theme is cute, but someone still has to order chairs.",
    message: "Vision without logistics is just a poster with glitter glue.",
    move: "Turn the idea into owners, dates, budget, and the one decision needed today.",
  },
  {
    card: "The Tamagotchi Low Battery",
    read: "The thing is not dead, but it is absolutely judging your maintenance habits.",
    message: "You can revive it, but not by admiring the problem from across the room.",
    move: "Do the boring ten-minute upkeep before it becomes an emergency meeting.",
  },
  {
    card: "The Cargo Pocket",
    read: "You have hidden storage, but now nobody can find the important thing.",
    message: "Capacity is useful only when retrieval is not a scavenger hunt.",
    move: "Label the file, the thread, or the decision so Future You does not curse Present You.",
  },
  {
    card: "The Chain Wallet",
    read: "You are attaching yourself to the work so tightly no one else can hold it.",
    message: "Security is good. Bottleneck energy is not.",
    move: "Document the next step so someone competent can help without stealing your whole personality.",
  },
  {
    card: "The Y2K Rhinestone Initial",
    read: "You want your name on the work, but only if it looks perfect.",
    message: "Ownership does not require flawless sparkle. It requires being clear about your contribution.",
    move: "Put your name beside the idea and note what still needs review.",
  },
  {
    card: "The Sleepover Truth Or Dare",
    read: "The room is asking for honesty, but everyone keeps choosing polite.",
    message: "Polite is not the same as useful. The truth can wear pajamas and still be productive.",
    move: "Ask the real question, then give people a safe way to answer it.",
  },
  {
    card: "The Clear Backpack",
    read: "Everything is visible, which is helpful and mildly terrifying.",
    message: "Transparency works best when the contents are organized before everyone can see them.",
    move: "Clean the deck, note the open risks, and then share the status.",
  },
  {
    card: "The Hair Crimper",
    read: "You are adding texture to a message that needed shape first.",
    message: "Style can help, but it cannot rescue a point that has not been formed.",
    move: "Write the one-sentence thesis before you decorate the edges.",
  },
  {
    card: "The Concert Wristband",
    read: "You have access, but you are standing near the back pretending that is enough.",
    message: "Being in the room is step one. Using the room is step two.",
    move: "Ask one question while the people who can answer it are still there.",
  },
  {
    card: "The Claire's Piercing Chair",
    read: "You are about to make a permanent-ish decision in a very public little corner.",
    message: "Impulse is not always wrong, but it does deserve a consent form and aftercare.",
    move: "Pause long enough to check the risk, then decide without making it a saga.",
  },
  {
    card: "The Dry-Erase Locker Board",
    read: "Everyone keeps leaving messages, but nobody is erasing the old ones.",
    message: "A stale note can mislead the whole hallway.",
    move: "Update the status, delete the old ask, and write the current next step.",
  },
  {
    card: "The Glitter Phone Case",
    read: "You are protecting the tool and making it cute, which is honestly efficient.",
    message: "Function and personality are not enemies. The trick is making sure both survive daily use.",
    move: "Keep the useful feature and improve the wrapper people actually touch.",
  },
  {
    card: "The After-School Special",
    read: "This moment has a lesson, but it does not need a dramatic voiceover.",
    message: "Say what happened, what changed, and what you will do differently. Then roll credits.",
    move: "Write the lesson learned in three bullets and spare everyone the moral monologue.",
  },
  {
    card: "The Denim Mini Skirt",
    read: "You are trying to make a short thing carry a lot of weight.",
    message: "Brevity is powerful when the structure is strong. Otherwise it is just cold knees.",
    move: "Keep it short, but add the missing context sentence.",
  },
  {
    card: "The Spice Girls Poster",
    read: "The group works because every person has a different job.",
    message: "Stop asking everyone to be the same kind of useful.",
    move: "Name the roles: who brings context, judgment, execution, review, and nerve.",
  },
  {
    card: "The Dawson's Creek Monologue",
    read: "You have feelings, paragraphs, and possibly a dock.",
    message: "Emotion can clarify the stakes, but the audience still needs the point before sunset.",
    move: "Turn the monologue into one ask and one reason.",
  },
  {
    card: "The Pop-Up Ad",
    read: "Something loud keeps appearing over the work you actually came to do.",
    message: "Not every interruption deserves a click.",
    move: "Close the distraction, write down the real task, and return to the tab that matters.",
  },
  {
    card: "The Glitter Jean Pocket",
    read: "There is a useful little detail hiding in a decorative place.",
    message: "Do not dismiss the tiny clue because it arrived wearing rhinestones.",
    move: "Pull out the detail and ask what it changes about the plan.",
  },
  {
    card: "The First iPod Shuffle",
    read: "You are letting the order choose itself and then acting surprised by the chaos.",
    message: "Random can be fun for music. It is less charming for dependencies.",
    move: "Put the work in sequence before hitting play.",
  },
  {
    card: "The Message Board Thread",
    read: "The answer is in there somewhere, between three tangents and a questionable signature graphic.",
    message: "Community knowledge is useful, but it still needs summarizing.",
    move: "Pull out the question, the best answer, and the open follow-up.",
  },
  {
    card: "The Burned CD Label",
    read: "The content is good, but nobody knows what track they are on.",
    message: "Labels are not bureaucracy. Labels are how people find the banger again.",
    move: "Rename the doc, the meeting, or the thread so the purpose is obvious.",
  },
  {
    card: "The Tiny Purse",
    read: "You are trying to carry a strategic initiative in a bag made for one lip gloss and a house key.",
    message: "The container is too small. The problem is not your packing skills.",
    move: "Ask for the space, time, or people the work actually requires.",
  },
  {
    card: "The Glitter Lava Pen",
    read: "The idea is moving, just very slowly and with dramatic internal weather.",
    message: "Progress can be real before it is fast.",
    move: "Capture the current state and the next visible shift.",
  },
  {
    card: "The Sidekick Keyboard",
    read: "You are one properly typed message away from reducing the chaos.",
    message: "The right words in the right channel can save four meetings and one forehead wrinkle.",
    move: "Send the clarifying note with the decision, owner, date, and ask.",
  },
  {
    card: "The Mall Kiosk Sales Pitch",
    read: "Someone is trying to upsell you on a problem you did not come in to solve.",
    message: "Interesting is not the same as necessary.",
    move: "Say, 'Not today,' and return to the thing you actually came for.",
  },
  {
    card: "The Pink Highlighter",
    read: "The important part is already there. You just have not marked it loudly enough.",
    message: "People cannot act on what they cannot see.",
    move: "Highlight the decision, the risk, and the ask before sending.",
  },
  {
    card: "The Screen Name",
    read: "You are choosing how you want to be known in this room.",
    message: "A little self-definition is allowed. So is changing it when you outgrow the first draft.",
    move: "Write the sentence that explains what you do now, not who you used to be.",
  },
  {
    card: "The Caboodle Mirror",
    read: "The reflection is tiny, but it is enough to fix the lipstick before the meeting.",
    message: "You do not need a full reinvention. You need one honest check before you walk in.",
    move: "Review the draft for tone, clarity, and the one claim that needs receipts.",
  },
  {
    card: "The Mixtape Tracklist",
    read: "You are building a mood, but the order still needs an opening argument.",
    message: "People remember the flow when the flow makes sense.",
    move: "Move the strongest point to the top and let the rest support it.",
  },
  {
    card: "The Keyboard Cover",
    read: "You are protecting yourself from spills, crumbs, and other people's urgent feelings.",
    message: "Boundaries are not cold. They are office supplies for your nervous system.",
    move: "Write the boundary once, save it, and reuse it without apologizing.",
  },
];

const cocktailMenus = {
  cocktail: [
    {
      name: "French 75",
      vibe: "For when you want champagne energy with a little structure.",
      order: "Gin, lemon, simple syrup, and bubbles.",
      note: "Elegant, bright, and very 'I have a hard stop at 7.'",
    },
    {
      name: "Pisco Sour",
      vibe: "For when the menu is boring but you are not.",
      order: "Pisco, lime, simple syrup, egg white, bitters.",
      note: "Silky, tart, dramatic enough to deserve a tiny garnish moment.",
    },
    {
      name: "Gin Sour",
      vibe: "For when you want classic, sharp, and not remotely beige.",
      order: "Gin, lemon, simple syrup, optional egg white.",
      note: "A clean little power suit of a drink.",
    },
    {
      name: "Cosmopolitan",
      vibe: "For when the meeting is over and Carrie Bradshaw can take the wheel.",
      order: "Vodka, cranberry, lime, orange liqueur.",
      note: "Pink, tart, iconic. No notes.",
    },
    {
      name: "Sidecar",
      vibe: "For when you want old-school fabulous without yelling about it.",
      order: "Cognac, orange liqueur, lemon.",
      note: "A tailored blazer in coupe-glass form.",
    },
    {
      name: "Margarita on the Rocks",
      vibe: "For when you want the classic answer and you want it with a salted rim.",
      order: "Tequila, lime, orange liqueur, rocks, salted rim.",
      note: "Crisp, obvious, correct. Sometimes the popular choice earned her seat.",
    },
    {
      name: "Paper Plane",
      vibe: "For when you want something modern-classic and secretly balanced.",
      order: "Bourbon, Aperol, amaro, lemon.",
      note: "Like a status update with an actual point.",
    },
    {
      name: "Aviation",
      vibe: "For when you want a little vintage glamour and a purple wink.",
      order: "Gin, lemon, maraschino, creme de violette.",
      note: "Pretty, floral, and not for people who fear a main character drink.",
    },
    {
      name: "Paloma",
      vibe: "For when you want tequila but also want to remain a person with standards.",
      order: "Tequila, grapefruit, lime, soda.",
      note: "Fresh, unfussy, and better than panic-ordering another vodka soda.",
    },
    {
      name: "Sparkling Rose",
      vibe: "For when the room needs bubbles and absolutely no one needs a speech.",
      order: "A chilled glass of sparkling rose.",
      note: "Pink, easy, and businesswomen's special approved.",
    },
    {
      name: "Yes, Get the Bottle",
      vibe: "For when the table has already done the math and the bottle is the responsible choice.",
      order: "Pick the wine, bubbles, or rose everyone will actually drink.",
      note: "Consensus, but with better glassware.",
    },
    {
      name: "Main Character Spritz",
      vibe: "For when the table needs tequila, bubbles, and a drink with its own entrance.",
      order: "Blanco tequila, Aperol, lemon, simple syrup, rocks, Prosecco, orange zest.",
      note: "Developed exclusively for lAIdies by Ryan C at CHAR No.5. Ask for Ryan and tell him Ali sent you.",
    },
    {
      name: "Maid in Cuba",
      vibe: "For when a mojito and a daiquiri got an awards publicist.",
      order: "Rum, lime, simple syrup, mint, cucumber, absinthe rinse, soda.",
      note: "Bacardi Legacy 2014 global winner. Fresh, clever, and not the obvious order.",
    },
    {
      name: "Pink Me Up",
      vibe: "For when the drink should be pink, smart, and a little unexpected.",
      order: "Rum, tomato, orgeat, lemon, olive brine, basil.",
      note: "Bacardi Legacy 2019 global winner. Smooth, savory, and weird in the best way.",
    },
    {
      name: "Le Latin",
      vibe: "For when citrus wants a French wine subplot.",
      order: "Rum, white wine, lemon, olive brine, simple syrup.",
      note: "Bacardi Legacy 2015 global winner. Bright, salty, elegant, and not trying too hard.",
    },
    {
      name: "Venceremos",
      vibe: "For when tropical needs to stop being predictable.",
      order: "Rum, pineapple, cucumber, lime, coconut, sesame oil.",
      note: "Bacardi Legacy 2016 global winner. A pina colada idea with a sharper passport.",
    },
    {
      name: "Speak Low",
      vibe: "For when the room gets quieter and the drink gets more interesting.",
      order: "Rum, matcha, sherry, yuzu.",
      note: "Bacardi Legacy 2012 global winner. Ceremony, restraint, and main-character taste.",
    },
    {
      name: "Carino",
      vibe: "For when dessert energy grows up and gets a reservation.",
      order: "Aged rum, Greek yogurt, vanilla, lemon, yellow Chartreuse.",
      note: "Bacardi Legacy 2018 global winner. Creamy, bright, and genuinely memorable.",
    },
    {
      name: "Clarita",
      vibe: "For when the after-hours table wants something stirred and lethal-looking.",
      order: "Aged rum, sherry, cacao, absinthe, salt, olive oil.",
      note: "Bacardi Legacy 2017 global winner. Bitter, glossy, and deeply adult.",
    },
    {
      name: "Out of Sight",
      vibe: "For when tropical turns soft, green, and quietly expensive.",
      order: "Rum, pineapple, basil, yogurt, lemon, agave.",
      note: "Bacardi Legacy 2021 global winner. A weird little luxury, in a good way.",
    },
  ],
  spiritFree: [
    {
      name: "Faux French 75",
      vibe: "For champagne energy without the champagne logistics.",
      order: "Lemon, simple syrup, non-alcoholic bubbles, and a twist.",
      note: "Bright, crisp, and still dressed for the calendar invite.",
    },
    {
      name: "No-groni Spritz",
      vibe: "For when you want bitter, glossy, and above the group text drama.",
      order: "Non-alcoholic aperitif, orange, soda, rocks.",
      note: "The main-character glass without the next-day plot hole.",
    },
    {
      name: "Cucumber Spritz",
      vibe: "For when the room needs spa water that got promoted.",
      order: "Cucumber, lime, mint, soda, tiny pinch of salt.",
      note: "Cool, sharp, and very 'I already read the pre-read.'",
    },
    {
      name: "Ginger Mule",
      vibe: "For when you need sparkle with a little backtalk.",
      order: "Ginger beer, lime, mint, crushed ice.",
      note: "Zippy enough to answer the email. Polite enough not to.",
    },
    {
      name: "Coconut Colada",
      vibe: "For when your calendar says quarterly planning but your soul says vacation episode.",
      order: "Coconut, pineapple, lime, crushed ice.",
      note: "A tiny out-of-office reply in a glass.",
    },
    {
      name: "Paloma-ish",
      vibe: "For when grapefruit is doing all the heavy lifting and deserves recognition.",
      order: "Grapefruit, lime, agave, soda, salted rim.",
      note: "Fresh, punchy, and not here for beige beverages.",
    },
    {
      name: "Mint Mojito-ish",
      vibe: "For when you want patio energy without the plot complications.",
      order: "Mint, lime, simple syrup, soda, crushed ice.",
      note: "Clean, sparkly, and emotionally available.",
    },
    {
      name: "Zero Rose Fizz",
      vibe: "For when the table wants pink bubbles and no committee meeting.",
      order: "Alcohol-free rose, soda, raspberry, lemon.",
      note: "Soft launch the sparkle. Keep the standards.",
    },
    {
      name: "Espresso Tonic",
      vibe: "For when happy hour is actually a rebrand of caffeine.",
      order: "Espresso, tonic, orange peel, lots of ice.",
      note: "The 9 to 5 cup of ambition with a better outfit.",
    },
    {
      name: "Pink Lemonade Upgrade",
      vibe: "For when nostalgia deserves a promotion.",
      order: "Lemon, berry syrup, soda, sugared rim.",
      note: "Mall-food-court classic, executive edit.",
    },
    {
      name: "Arnold Palmer, Corporate Goth",
      vibe: "For when iced tea and lemonade came prepared with talking points.",
      order: "Black tea, lemonade, lemon wheel, big ice.",
      note: "Serious enough for notes. Cute enough for a straw.",
    },
    {
      name: "Berry Fizz",
      vibe: "For when the answer is bubbles and a little color theory.",
      order: "Muddled berries, lime, soda, mint.",
      note: "Pretty, useful, and impossible to call boring.",
    },
    {
      name: "Maid in Cuba-ish",
      vibe: "For when you want the award-winner's fresh cucumber-mint energy, zero proof.",
      order: "Lime, mint, cucumber, simple syrup, soda, tiny absinthe-style botanical note.",
      note: "Zero-proof riff on the Bacardi Legacy 2014 global winner.",
    },
    {
      name: "Pink Me Up-ish",
      vibe: "For when the zero-proof choice should still be pink and highly specific.",
      order: "Tomato water, orgeat, lemon, olive brine, basil.",
      note: "Zero-proof riff on the Bacardi Legacy 2019 global winner.",
    },
    {
      name: "Le Latin-ish",
      vibe: "For when citrus needs a salty little wine-bar attitude.",
      order: "Verjus, lemon, olive brine, simple syrup, chilled soda.",
      note: "Zero-proof riff on the Bacardi Legacy 2015 global winner.",
    },
    {
      name: "Venceremos-ish",
      vibe: "For when tropical wants cucumber, sesame, and a little nerve.",
      order: "Pineapple, lime, cucumber, coconut water, toasted sesame.",
      note: "Zero-proof riff on the Bacardi Legacy 2016 global winner.",
    },
    {
      name: "Speak Low-ish",
      vibe: "For when the non-alcoholic drink should still feel like a ceremony.",
      order: "Matcha, yuzu, black tea, demerara, citrus mist.",
      note: "Zero-proof riff on the Bacardi Legacy 2012 global winner.",
    },
    {
      name: "Carino-ish",
      vibe: "For when creamy, bright, and polished is the brief.",
      order: "Greek yogurt, vanilla, lemon, herbal syrup, chilled soda.",
      note: "Zero-proof riff on the Bacardi Legacy 2018 global winner.",
    },
    {
      name: "Clarita-ish",
      vibe: "For when zero proof still wants to sit in the dark corner booth.",
      order: "Oloroso-style tea, cacao, saline, orange oil, bitter botanical syrup.",
      note: "Zero-proof riff on the Bacardi Legacy 2017 global winner.",
    },
    {
      name: "Out of Sight-ish",
      vibe: "For when pineapple and basil need to feel surprisingly grown.",
      order: "Pineapple, basil, lemon, agave, yogurt foam.",
      note: "Zero-proof riff on the Bacardi Legacy 2021 global winner.",
    },
  ],
};

const cocktailWheelLabels = {
  cocktail: [
    "French 75",
    "Pisco Sour",
    "Gin Sour",
    "Cosmo",
    "Sidecar",
    "Margarita",
    "Paper Plane",
    "Aviation",
    "Paloma",
    "Sparkling Rose",
    "Get the Bottle",
    "Main Character Spritz",
    "Maid in Cuba",
    "Pink Me Up",
    "Le Latin",
    "Venceremos",
    "Speak Low",
    "Carino",
    "Clarita",
    "Out of Sight",
  ],
  spiritFree: [
    "Faux French 75",
    "No-groni",
    "Cucumber Spritz",
    "Ginger Mule",
    "Coconut Colada",
    "Paloma-ish",
    "Mojito-ish",
    "Zero Rose Fizz",
    "Espresso Tonic",
    "Pink Lemonade",
    "Arnold Palmer",
    "Berry Fizz",
    "Maid-ish",
    "Pink-ish",
    "Le Latin-ish",
    "Venceremos-ish",
    "Speak Low-ish",
    "Carino-ish",
    "Clarita-ish",
    "Out of Sight-ish",
  ],
};

const cocktailWheelPalette = [
  "#ff2d9b",
  "#12b6c4",
  "#fff25c",
  "#b756d8",
  "#ff8fc8",
  "#ff7f50",
];

const cocktailFortuneFlaps = [
  {
    label: "Bubble",
    description: "sparkly, easy, celebratory",
    count: 6,
    drinks: {
      cocktail: [0, 9, 10, 13, 19],
      spiritFree: [0, 7, 11, 13, 19],
    },
  },
  {
    label: "Citrus",
    description: "bright, tart, fresh",
    count: 6,
    drinks: {
      cocktail: [1, 2, 5, 8, 12, 15],
      spiritFree: [2, 3, 5, 6, 12, 15],
    },
  },
  {
    label: "Classic",
    description: "polished, iconic, not trying too hard",
    count: 7,
    drinks: {
      cocktail: [3, 4, 7, 14, 17],
      spiritFree: [4, 9, 10, 14, 17],
    },
  },
  {
    label: "After Dark",
    description: "bitter, bold, second-shift energy",
    count: 9,
    drinks: {
      cocktail: [6, 11, 16, 18],
      spiritFree: [1, 8, 16, 18],
    },
  },
];

const girlTalkCards = [
  "Truth: what are you calling 'busy' that is actually avoidance in a blazer?",
  "Dare: ask for the thing in one sentence, no apology confetti.",
  "Truth: which meeting could have been a voice note and a lip gloss application?",
  "Dare: send one message that is 30 percent shorter and 80 percent clearer.",
  "Truth: what part of your ambition are you making sound smaller so everyone stays comfortable?",
  "Dare: post the question you think everyone else already knows the answer to.",
  "Truth: who in the room has the context, template, or shortcut you keep pretending you do not need?",
  "Dare: give yourself the title you keep waiting for someone else to hand you.",
];

const dreamPhoneMatches = {
  career: {
    friend: "Mentor",
    answers: [
      "Pick the door with more learning, more room to move, and fewer people who make chaos look like culture.",
      "If the next step scares you and expands your options, it deserves a closer look.",
      "The better move is the one you can explain without shrinking your standards.",
      "Ask what this option gives Future You besides a better title and a new email signature.",
      "If you keep waiting to feel ready, the opportunity will need forwarding instructions.",
      "Name the tradeoff out loud. Mystery makes career decisions look more glamorous than they are.",
      "Choose the path where your judgment gets sharper, not just your calendar gets fuller.",
      "If the role needs you but cannot name the support, that is not a dream. That is a group project.",
      "Do the receipts check: scope, pay, sponsor, learning, exit options. Cute offer letters still need math.",
      "Say yes to growth, not to becoming the emergency contact for a broken system.",
    ],
  },
  drama: {
    friend: "Bestie",
    answers: [
      "Document the facts, remove the adjectives, and do not let someone else's messy behavior become your unpaid internship.",
      "Do not reply while activated. Draft it, walk away, then delete the sentence that sounds like a courtroom monologue.",
      "If the story needs seven paragraphs to explain why it was fine, it probably was not fine.",
      "Send the version that a calm person would be proud of tomorrow morning.",
      "The group chat can hear the spicy version. Work gets the clean facts and the next step.",
      "If someone keeps creating confusion, ask for the decision, owner, and date in writing.",
      "Do not match the energy. Match the record.",
      "Your boundary does not need a dissertation. It needs a sentence and a repeat button.",
      "If everyone is whispering, ask the obvious question in the meeting with a neutral face.",
      "Before you escalate, separate what happened, what changed, and what you need now.",
    ],
  },
  confidence: {
    friend: "Hype",
    answers: [
      "Confidence is not a mood. It is a behavior. Put the sentence in the chat, book the meeting, wear the metaphorical platform sandal.",
      "You are allowed to be new at something and still have standards. Revolutionary, apparently.",
      "Say the thing like you expect to be taken seriously. Let everyone else catch up.",
      "You do not need a personality transplant. You need the first sentence and a calendar invite.",
      "The version of you who already knows how to do this is built by doing this.",
      "Stop making your ask smaller so the room feels taller.",
      "You can be warm and still be unambiguous. Dolly has been trying to tell us.",
      "Act like your idea is allowed to take up space. Because, inconveniently for the doubters, it is.",
      "Nerves are not a stop sign. They are just your body adding unnecessary percussion.",
      "If you would hype a friend for doing this, please stop being weirdly rude to yourself.",
    ],
  },
  ai: {
    friend: "AI Help",
    answers: [
      "Make the tool useful by giving it context, examples, constraints, and your actual standard. Vague in, beige out.",
      "Ask for three versions, then use your taste. The machine drafts; you decide.",
      "If the answer sounds expensive but has no receipts, call it decorative and ask again.",
      "Start with the task, audience, tone, length, and what good looks like. The model is not a mind reader in lip gloss.",
      "Paste the messy version and ask for structure before polish. Sequencing matters, even when the tool is sparkly.",
      "Use AI for the first pass, not the final judgment. Your name is still on the thing.",
      "Ask what is missing, what is risky, and what a skeptical VP would question.",
      "If the output is bland, add constraints. Boring prompts create beige little outfits.",
      "For research, ask for sources, dates, uncertainty, and what changed recently.",
      "When in doubt, ask it to make a checklist. A checklist is just chaos wearing a blazer.",
    ],
  },
  leadership: {
    friend: "Boss",
    answers: [
      "Say the business reason first. The backstory can wait in the lobby with the old magazines.",
      "If you want the room to decide, give them the decision, the tradeoff, and the recommendation.",
      "Executive clean does not mean personality-free. It means the point survived the meeting.",
      "Start with what changed, why it matters, and what you need by Friday.",
      "If the slide cannot answer 'so what?' it is still getting ready in the bathroom.",
      "Put the risk and the ask in the same outfit. Separating them makes everyone work too hard.",
      "Lead with the version your VP can repeat without carrying your whole notebook.",
      "Your idea is not too much. It is under-structured. Give it a spine and a closing line.",
      "If the room needs context, give context. If the room needs a decision, stop touring the mall.",
      "Make the recommendation before someone else makes a worse one with more confidence.",
    ],
  },
  operations: {
    friend: "Operator",
    answers: [
      "Turn the chaos into a repeatable checklist before it becomes everyone's personality.",
      "Name the owner, date, input, output, and receipt. It is not glamorous, which is why it works.",
      "If the process only works when one tired woman remembers everything, the process is broken.",
      "Build the template once. Stop re-living the same tiny office emergency in different lip gloss.",
      "The workflow needs fewer heroic saves and more boring handoffs.",
      "Ask what can be automated, delegated, documented, or deleted. The answer is rarely 'suffer prettier.'",
      "Put the status where people can find it before the follow-up email starts breeding.",
      "A good system should not require psychic powers, group chat archaeology, or one sacred spreadsheet.",
      "If the task repeats, it deserves a recipe. If the recipe repeats, it deserves a tool.",
      "Your calendar is not a project management system. It is just where the evidence goes to panic.",
    ],
  },
  voice: {
    friend: "Comms",
    answers: [
      "Make the sentence sound like you, then make it impossible to misunderstand.",
      "Warm is not vague. Direct is not rude. Beige is not a strategy.",
      "If the message has three apologies before the ask, Cher would absolutely delete two.",
      "Say what happened, what it means, and what you need next. Save the emotional director's cut for the group chat.",
      "The first line should earn its spot. No throat-clearing in platform sandals.",
      "If you are hiding the ask in paragraph four, the reader is not the problem.",
      "Use one clean subject line, one clean ask, and one clean deadline. Revolutionary, apparently.",
      "The tone can be kind and still have a spine.",
      "If you would not say it in the meeting, do not let AI make it sound like you joined a consulting cult.",
      "Make it shorter, clearer, and a little more you. That is the whole makeover montage.",
    ],
  },
  evidence: {
    friend: "Data",
    answers: [
      "Bring the numbers, but also bring the sentence that explains why anyone should care.",
      "A chart without a point is just a very organized screensaver.",
      "Ask what the data proves, what it does not prove, and what would change your mind.",
      "If the metric is doing all the work, make sure it is not lying in a cute font.",
      "Separate signal from noise before the room starts decorating with anecdotes.",
      "Receipts first, interpretation second, dramatic conclusion never.",
      "The evidence needs a source, a date, and a reason it belongs in the conversation.",
      "If you cannot explain the number in plain English, it is not ready for the grown-up table.",
      "Do not let a dashboard become a Burn Book. Use data to clarify, not to gossip with columns.",
      "Good analysis says what matters now and what to do next. Everything else is liner notes.",
    ],
  },
};

const dreamPhoneSpecials = {
  secret: {
    label: "Share a Secret",
    prefix: "Secret:",
    prompt: "Share a Secret is pulled.",
    extra: "The secret under the answer: name the thing everyone is politely stepping around.",
  },
  speaker: {
    label: "Speaker Phone",
    prefix: "Speaker phone:",
    prompt: "Speaker Phone is on. This answer is for the whole room.",
    extra: "Say it in a version the whole room can hear: clear, calm, and impossible to misquote.",
  },
  hangup: {
    label: "Mom Says Hang Up!",
    prefix: "Mom says hang up:",
    prompt: "Mom Says Hang Up is pulled. The spiral is not invited.",
    extra: "End the spiral. One sentence, one next step, then hang up before the overthinking gets a sequel.",
  },
};

const dreamPhoneSecretBadges = {
  8675309: {
    id: "867-club",
    title: "867 Club merit badge",
    sticker: "867",
    baseMessage:
      "867-5309 connected. I like the way you think. You found the secret Dream Phone line and earned the 867 Club merit badge. Open your Clubhouse Pass so the badge can stay pinned to your member card.",
    remix: {
      secret:
        "Secret: the real callback is pattern spotting. You found the hidden number, so your reward is a badge and permission to be a little smug in the group chat.",
      speaker:
        "Speaker phone: 867 Club unlocked. Announce it clearly, avoid singing the hook, and tell the room the remix cards are where the extra drama lives.",
      hangup:
        "Mom says hang up: you got the badge. Do not keep dialing the same joke all afternoon. Pin the sticker, pull a remix card, and move.",
    },
  },
};

const hiddenMeritBadges = {
  "867-club": {
    id: "867-club",
    title: "867 Club merit badge",
    sticker: "867",
    source: "Dream Phone",
    unlockMessage:
      "867 Club unlocked. The Dream Phone recognizes excellent pattern spotting and questionable taste in catchy callbacks.",
  },
  "hotline-regular": {
    id: "hotline-regular",
    title: "Hotline Regular merit badge",
    sticker: "CLAI-O",
    source: "Madame CLAI-O",
    unlockMessage:
      "Hotline Regular unlocked. You have called more times than Cher changed outfits before her driver's test. Madame CLAI-O recognizes your number.",
  },
  "remix-scholar": {
    id: "remix-scholar",
    title: "Remix Scholar merit badge",
    sticker: "REMIX",
    source: "Dream Phone",
    unlockMessage:
      "Remix Scholar unlocked. You pulled every Dream Phone remix card after the call. The answer now has a director's cut, a speakerphone version, and a clean exit.",
  },
  "receipts-drawer": {
    id: "receipts-drawer",
    title: "Receipts Drawer merit badge",
    sticker: "RCPT",
    source: "Reference Closet",
    unlockMessage:
      "Receipts Drawer unlocked. You went looking for the proof instead of trusting the vibe. The closet approves.",
  },
  "try-on-regular": {
    id: "try-on-regular",
    title: "Try-On Regular merit badge",
    sticker: "5MIN",
    source: "Five-Minute Try-On",
    unlockMessage:
      "Try-On Regular unlocked. Five tiny dares later, this is no longer theoretical. Small sips, big moves.",
  },
  "group-chat-regular": {
    id: "group-chat-regular",
    title: "Group Chat Regular merit badge",
    sticker: "CHAT",
    source: "Girl Talk",
    unlockMessage:
      "Group Chat Regular unlocked. You kept drawing cards until the deck started saving you a seat.",
  },
  "coven-reservation": {
    id: "coven-reservation",
    title: "Coven Reservation merit badge",
    sticker: "7PM",
    source: "Businesswomen's Special",
    unlockMessage:
      "Coven Reservation unlocked. You opened every paper-fortune lane and the table is officially ready at 7.",
  },
  "room-first-post": {
    id: "room-first-post",
    title: "Room Key sticker",
    sticker: "KEY",
    source: "Chat Rooms",
    unlockMessage:
      "Room Key unlocked. You posted in a room instead of keeping the good question in your drafts. That counts.",
  },
  "room-tour": {
    id: "room-tour",
    title: "Every Room, No Notes merit badge",
    sticker: "ALL",
    source: "Chat Rooms",
    unlockMessage:
      "Every Room, No Notes unlocked. You posted in every chat room. The ICQ door is open, the buddy list is awake, and your member card has receipts.",
  },
};

const quizStickerAwards = [
  {
    id: "double",
    title: "Caboodle Valedictorian + Receipts Queen",
    sticker: "2X",
    source: "Magazine Quiz",
  },
  {
    id: "receipts",
    title: "Receipts Queen Sticker",
    sticker: "RQ",
    source: "Magazine Quiz",
  },
  {
    id: "caboodle",
    title: "Caboodle Scholar Sticker",
    sticker: "CS",
    source: "Magazine Quiz",
  },
  {
    id: "montage",
    title: "Montage Has Begun Sticker",
    sticker: "MM",
    source: "Magazine Quiz",
  },
  {
    id: "participation",
    title: "Participation Lip Gloss Sticker",
    sticker: "PL",
    source: "Magazine Quiz",
  },
  {
    id: "butterfly",
    title: "Butterfly Clip Incident Sticker",
    sticker: "BC",
    source: "Magazine Quiz",
  },
];

const dreamPhoneSpecialByCaller = {
  mentor: {
    secret: "Mentor lowers her voice: the impressive job is not always the right job. Ask who will actually sponsor you when the novelty wears off.",
    speaker: "Mentor puts it on speaker: pick the move you can explain to Future You without needing a PowerPoint full of excuses.",
    hangup: "Mentor says hang up: stop interviewing the same doubt. Ask one real person for one real read and move.",
  },
  bestie: {
    secret: "Bestie knows the secret: your first draft was for the group chat. Your work reply only needs facts, dates, and one clean ask.",
    speaker: "Bestie hits speaker: everybody breathe. Nobody is sending the spicy paragraph until the adjectives have been removed.",
    hangup: "Bestie says hang up: no more rereading the message like it is the season finale. Send the calm version or leave it alone.",
  },
  boundary: {
    secret: "Boundary whispers: the boundary works better when it is boring. One sentence, no courtroom reenactment.",
    speaker: "Boundary puts it on speaker: available does not mean endlessly available. Say what you can do and when.",
    hangup: "Boundary says hang up: do not negotiate with the part of you trying to be liked by everyone in the building.",
  },
  receipts: {
    secret: "Receipts has the secret: if it was said in a hallway, it belongs in a follow-up note before it becomes folklore.",
    speaker: "Receipts puts it on speaker: decisions need owners, dates, and proof. Cute confusion is still confusion.",
    hangup: "Receipts says hang up: stop arguing with vibes. Ask for the record, then let the record do the talking.",
  },
  hype: {
    secret: "Hype whispers: you are not behind. You are just finally letting the idea be visible.",
    speaker: "Hype puts it on speaker: say the sentence like you expect people to understand why it matters.",
    hangup: "Hype says hang up: stop calling confidence cringe. It is just competence with better posture.",
  },
  steady: {
    secret: "Steady knows: calm is not the same as passive. It is the outfit your judgment wears when the room gets loud.",
    speaker: "Steady puts it on speaker: name the next step, the owner, and the date. Then stop feeding the fog machine.",
    hangup: "Steady says hang up: do not create a second emergency by reacting to the first one in panic lip gloss.",
  },
  strategist: {
    secret: "Strategist whispers: the winning move is probably not louder. It is cleaner, earlier, and backed by one useful receipt.",
    speaker: "Strategist puts it on speaker: if the room needs a decision, do not give them a scenic tour of every possible path.",
    hangup: "Strategist says hang up: stop workshopping the perfect move in private. Test the next useful move in public.",
  },
  bigbro: {
    secret: "Big Bro has a secret: the room is less scary when you remember half of them also Googled the acronym.",
    speaker: "Big Bro puts it on speaker: ask the obvious question. Somebody else is pretending they already know.",
    hangup: "Big Bro says hang up: no more making yourself the joke before anyone else gets a chance to be kind.",
  },
  wildcard: {
    secret: "Wildcard whispers: weird is allowed if it solves the problem. Make the idea specific enough to survive daylight.",
    speaker: "Wildcard puts it on speaker: bring the unexpected option, then explain the practical reason it belongs there.",
    hangup: "Wildcard says hang up: chaos is not a brand strategy. Pick the useful sparkle and leave the rest at Claire's.",
  },
  creative: {
    secret: "Creative knows: the idea is not too much. It just needs a frame, a use case, and a sentence normal people can repeat.",
    speaker: "Creative puts it on speaker: show the before and after. A tiny demo beats a dramatic explanation.",
    hangup: "Creative says hang up: stop polishing the mood board. Ship the rough version that proves the point.",
  },
  research: {
    secret: "Research whispers: the shiny answer is useless without date, source, and what might have changed since.",
    speaker: "Research puts it on speaker: ask what is known, what is assumed, and what would make this answer wrong.",
    hangup: "Research says hang up: stop collecting links like lip gloss. Decide what evidence would actually change the plan.",
  },
  aihelp: {
    secret: "AI Help has the secret: the model is not being difficult. Your prompt may be giving 'read my mind, but professionally.'",
    speaker: "AI Help puts it on speaker: task, context, audience, constraints, examples. That is the outfit. Put the prompt in it.",
    hangup: "AI Help says hang up: do not keep regenerating the same vague prompt and acting betrayed by beige output.",
  },
  boss: {
    secret: "Boss whispers: your recommendation can be warm and still be the recommendation. Stop hiding it in paragraph four.",
    speaker: "Boss puts it on speaker: lead with the business reason, the tradeoff, and what you need from the room.",
    hangup: "Boss says hang up: no more pre-apologizing for having a point. Make it, support it, close it.",
  },
  coach: {
    secret: "Coach knows: the skill is built through practice, not in waiting until you feel like the varsity version of yourself.",
    speaker: "Coach puts it on speaker: try the smaller version today. A tiny win still counts as practice.",
    hangup: "Coach says hang up: stop replaying the old miss. The lesson came through. You can let the scene end.",
  },
  operator: {
    secret: "Operator whispers: if the task lives in one person's memory, it is not a process. It is a hostage situation.",
    speaker: "Operator puts it on speaker: owner, input, output, deadline, receipt. That is the whole choreography.",
    hangup: "Operator says hang up: stop saving the system with personal heroics. Build the boring thing that works.",
  },
  counsel: {
    secret: "Counsel knows: the cleanest answer is often the one with fewer adjectives and a better timeline.",
    speaker: "Counsel puts it on speaker: separate facts, risk, recommendation, and decision needed. No dramatic soundtrack.",
    hangup: "Counsel says hang up: do not keep litigating intent when the action and impact are already on the table.",
  },
  finance: {
    secret: "Finance whispers: if the numbers are doing the persuasion, make sure they are not wearing last season's assumptions.",
    speaker: "Finance puts it on speaker: what changed, what it costs, what it saves, and what happens if nobody moves.",
    hangup: "Finance says hang up: no more spreadsheet fog. One table, one takeaway, one decision.",
  },
  product: {
    secret: "Product knows: the user does not care how hard the backstage was. They care whether the button does the thing.",
    speaker: "Product puts it on speaker: problem, user, moment, expected behavior. Then test the obvious path.",
    hangup: "Product says hang up: stop adding features to avoid fixing the confusing part.",
  },
  comms: {
    secret: "Comms whispers: if it sounds like a consultant trapped in a beige hallway, rewrite it until it sounds like a person.",
    speaker: "Comms puts it on speaker: headline first, ask second, details only where they earn their seat.",
    hangup: "Comms says hang up: no more 'just circling back' if what you mean is 'please decide by Thursday.'",
  },
  data: {
    secret: "Data knows: the chart is not the point. The point is what changed and why anyone should care before lunch.",
    speaker: "Data puts it on speaker: source, date, caveat, takeaway. Otherwise it is just a screensaver with opinions.",
    hangup: "Data says hang up: stop letting one number cosplay as the whole story.",
  },
  founder: {
    secret: "Founder whispers: the scrappy version is allowed to be real if it teaches you what to build next.",
    speaker: "Founder puts it on speaker: name the customer, the problem, the promise, and the smallest proof you can make this week.",
    hangup: "Founder says hang up: stop waiting for the perfect brand reveal. The market cannot react to a secret.",
  },
  sponsor: {
    secret: "Sponsor knows: visibility is not vanity when the right people need to know what you can do.",
    speaker: "Sponsor puts it on speaker: make the win easy to repeat by saying the problem, result, and why it mattered.",
    hangup: "Sponsor says hang up: do not make your work discoverable only by archaeological dig.",
  },
  builder: {
    secret: "Builder whispers: if it keeps repeating, it wants a template. If the template keeps repeating, it wants a tool.",
    speaker: "Builder puts it on speaker: show the workflow, the stuck point, and the part the tool now handles.",
    hangup: "Builder says hang up: stop rebuilding the same thing manually because the first automation feels intimidating.",
  },
  closer: {
    secret: "Closer knows: the last line should tell people exactly what happens next, not wander off in kitten heels.",
    speaker: "Closer puts it on speaker: decision, owner, deadline, next step. Then stop typing.",
    hangup: "Closer says hang up: no more ending with 'thoughts?' when what you need is approval.",
  },
};

const dreamPhoneCallers = {
  mentor: { friend: "Mentor", type: "career" },
  strategist: { friend: "Strategist", type: "career" },
  steady: { friend: "Steady", type: "career" },
  bestie: { friend: "Bestie", type: "drama" },
  boundary: { friend: "Boundary", type: "drama" },
  receipts: { friend: "Receipts", type: "drama" },
  hype: { friend: "Hype", type: "confidence" },
  bigbro: { friend: "Big Bro", type: "confidence" },
  creative: { friend: "Creative", type: "confidence" },
  aihelp: { friend: "AI Help", type: "ai" },
  research: { friend: "Research", type: "ai" },
  wildcard: { friend: "Wildcard", type: "ai" },
  boss: { friend: "Boss", type: "leadership" },
  coach: { friend: "Coach", type: "confidence" },
  operator: { friend: "Operator", type: "operations" },
  counsel: { friend: "Counsel", type: "drama" },
  finance: { friend: "Finance", type: "evidence" },
  product: { friend: "Product", type: "operations" },
  comms: { friend: "Comms", type: "voice" },
  data: { friend: "Data", type: "evidence" },
  founder: { friend: "Founder", type: "leadership" },
  sponsor: { friend: "Sponsor", type: "career" },
  builder: { friend: "Builder", type: "ai" },
  closer: { friend: "Closer", type: "voice" },
};

const dreamPhoneNumbers = {
  5551995: "mentor",
  5551999: "strategist",
  5552001: "bestie",
  5552003: "boundary",
  5552004: "receipts",
  5552007: "hype",
  5552008: "steady",
  5552010: "bigbro",
  5552013: "wildcard",
  5552016: "creative",
  5552024: "research",
  5552026: "aihelp",
  5552027: "boss",
  5552028: "coach",
  5552029: "operator",
  5552030: "counsel",
  5552031: "finance",
  5552032: "product",
  5552033: "comms",
  5552034: "data",
  5552035: "founder",
  5552036: "sponsor",
  5552037: "builder",
  5552038: "closer",
};

const siteData = window.LAIDIES_SITE_DATA || {};
let issueQuizzes = { ...(siteData.quizzes || {}) };
const cardPackData = siteData.cardPacks || { cards: [] };

const laidyModes = {
  dolly: {
    label: "Dolly Energy",
    opener: "Cup of ambition check:",
    nudge: "Be warm, be direct, and do not confuse nervous with unqualified. A woman can be gracious and still ask for the money.",
  },
  miranda: {
    label: "Miranda Polish",
    opener: "Executive read:",
    nudge: "Remove the apology tour. Lead with the business case, not the emotional weather report.",
  },
  elle: {
    label: "Elle Evidence",
    opener: "Pink legal pad version:",
    nudge: "Confidence is cute. Evidence is cuter. Bring the facts, then let the facts wear the heels.",
  },
  cher: {
    label: "Cher Closet Check",
    opener: "Closet computer says:",
    nudge: "This needs a better outfit: goal, context, audience, and the exact response you want.",
  },
  sophia: {
    label: "Sophia Says",
    opener: "Picture it:",
    nudge: "The wise move is usually shorter than the spiral. Say the true thing, then stop decorating it.",
  },
  david: {
    label: "David Specificity",
    opener: "Be very particular, please:",
    nudge: "Vague is how we get beige results. Specific is how we get the good sweater.",
  },
  buffy: {
    label: "Buffy Courage",
    opener: "Slayer briefing:",
    nudge: "You do not need to feel fearless. You need a plan, a stake, and a calendar invite.",
  },
  community: {
    label: "Ask the Room",
    opener: "For the public thread:",
    nudge: "Post the messy version with what you tried, what you need, and where you got stuck. Someone else is already wondering the same thing.",
  },
};

function normalizeLaidyText(text) {
  return String(text || "").trim().replace(/\s+/g, " ");
}

function findLaidyPattern(text, patterns, fallback = "") {
  return patterns.find(({ pattern }) => pattern.test(text))?.label || fallback;
}

function getLaidyTopicType(text) {
  const normalized = text.toLowerCase();
  if (/\b(raise|promotion|salary|pay|compensation|bonus|level|title)\b/.test(normalized)) return "raise";
  if (/\b(deadline|extension|more time|late|delay|delayed|behind|timeline|due)\b/.test(normalized)) return "deadline";
  if (/\b(email|message|reply|respond|slack|teams|note|send|write)\b/.test(normalized)) return "message";
  if (/\b(meeting|agenda|prep|debrief|follow-up|follow up|minutes|talking points)\b/.test(normalized)) return "meeting";
  if (/\b(conflict|pushback|difficult|frustrated|angry|disagree|tension|awkward)\b/.test(normalized)) return "conflict";
  if (/\b(no|boundary|boundaries|too much|capacity|overloaded|overwhelmed|prioritize|priority)\b/.test(normalized)) return "boundary";
  if (/\b(feedback|review|critique|performance|mistake|messed up|error|problem)\b/.test(normalized)) return "feedback";
  if (/\b(ai|chatgpt|claude|gemini|prompt|tool|model|output)\b/.test(normalized)) return "ai";
  if (/\b(nervous|scared|anxious|worried|afraid|confidence|imposter|impostor)\b/.test(normalized)) return "confidence";
  if (/\b(idea|pitch|proposal|approve|approval|buy-in|buy in|stakeholder)\b/.test(normalized)) return "pitch";
  return "general";
}

function getLaidySignals(question) {
  const normalized = question.toLowerCase();
  const audience = findLaidyPattern(normalized, [
    { pattern: /\b(vp|vice president)\b/, label: "your VP" },
    { pattern: /\b(director)\b/, label: "your director" },
    { pattern: /\b(manager|boss|lead)\b/, label: "your manager" },
    { pattern: /\b(team|group)\b/, label: "your team" },
    { pattern: /\b(client|customer)\b/, label: "the client" },
    { pattern: /\b(stakeholder|stakeholders)\b/, label: "the stakeholders" },
    { pattern: /\b(peer|colleague|coworker|co-worker)\b/, label: "your colleague" },
    { pattern: /\b(legal|tax|finance|hr|privacy|security|compliance)\b/, label: "the specialist group" },
  ], "the person who needs to act");

  const need = findLaidyPattern(normalized, [
    { pattern: /\b(more time|extension|delay|delayed|late|deadline)\b/, label: "more time" },
    { pattern: /\b(approve|approval|sign off|sign-off|buy-in|buy in)\b/, label: "approval" },
    { pattern: /\b(reply|respond|answer)\b/, label: "a response" },
    { pattern: /\b(feedback|review|critique)\b/, label: "feedback" },
    { pattern: /\b(no|decline|push back|pushback|boundary)\b/, label: "a boundary" },
    { pattern: /\b(priority|prioritize|capacity|overwhelmed|too much)\b/, label: "prioritization" },
    { pattern: /\b(prompt|ai|chatgpt|claude|gemini|tool|output)\b/, label: "a better AI ask" },
  ], "a clear next step");

  const risk = findLaidyPattern(normalized, [
    { pattern: /\b(vp|director|executive|leadership|board|client|customer)\b/, label: "high-visibility" },
    { pattern: /\b(legal|tax|finance|hr|privacy|security|compliance|policy)\b/, label: "receipts-required" },
    { pattern: /\b(urgent|today|tomorrow|asap|immediately)\b/, label: "time-sensitive" },
  ], "normal-human-work-chaos");

  const tone = findLaidyPattern(normalized, [
    { pattern: /\b(warm|nice|kind|gentle|soft)\b/, label: "warm" },
    { pattern: /\b(firm|direct|clear|executive|professional)\b/, label: "direct" },
    { pattern: /\b(not sounding|without sounding|avoid sounding)\b/, label: "careful" },
  ], "clear");

  return {
    audience,
    need,
    risk,
    tone,
    topicType: getLaidyTopicType(question),
  };
}

function getLaidyModeFrame(modeKey) {
  const frames = {
    dolly: {
      move: "Make it warm, make it clear, and do not apologize for needing the thing.",
      signoff: "Cup of ambition, but with a calendar invite.",
    },
    miranda: {
      move: "Lead with the business point. Feelings can sit in the passenger seat with a seatbelt.",
      signoff: "Executive-clean, no apology tour.",
    },
    elle: {
      move: "Bring the facts in a cute binder. Confidence is better when it has tabs.",
      signoff: "Pink legal pad, real receipts.",
    },
    cher: {
      move: "Give the ask a better outfit: context, audience, constraint, and the exact thing you want.",
      signoff: "Closet computer says the prompt needs tailoring.",
    },
    sophia: {
      move: "Say the true thing, skip the spiral, and eat something with protein after.",
      signoff: "Shorter, wiser, less hallway monologue.",
    },
    david: {
      move: "Be very particular. Vague is how work comes back wearing the wrong sweater.",
      signoff: "Specificity is the whole outfit.",
    },
    buffy: {
      move: "You do not need to feel fearless. You need a plan and the first sentence.",
      signoff: "Slayer briefing, not season-long villain arc.",
    },
    community: {
      move: "Ask the room with enough context that people can actually help.",
      signoff: "Public question, useful answers, no shame spiral.",
    },
  };
  return frames[modeKey] || frames.dolly;
}

function getLaidyAutoMode(topicType) {
  const modes = {
    raise: "dolly",
    deadline: "miranda",
    message: "cher",
    meeting: "miranda",
    conflict: "sophia",
    boundary: "sophia",
    feedback: "elle",
    ai: "david",
    confidence: "buffy",
    pitch: "miranda",
    general: "cher",
  };
  return modes[topicType] || "cher";
}

function getLaidyTopicAdvice(topicType, signals) {
  const advice = {
    raise: {
      read: `This is not a favor request. It is a value conversation with ${signals.audience}.`,
      next: "Build the one-page brag receipt: outcomes, scope, praise, money saved or made, and responsibilities that quietly became yours.",
      line: "Over the past [time period], I have delivered [results] and my scope now includes [expanded work]. I would like to discuss adjusting my compensation/title to reflect that impact. What would you need to see to move this forward?",
    },
    deadline: {
      read: `You need ${signals.need} from ${signals.audience}, and the trick is to make it sound managed, not messy.`,
      next: "Send the note before they have to chase you. Include what changed, what is still on track, the new date, and the tradeoff if the date cannot move.",
      line: "I want to flag this early: [what changed]. I can still deliver [piece] by [date], but I need until [new date] for [reason]. If that timing creates an issue, I can prioritize [option A] and move [option B].",
    },
    message: {
      read: `You are not writing a novel. You are sending ${signals.audience} the clean version of what needs to happen.`,
      next: "Use four pieces: context, ask, deadline, and why it matters. Then stop before the email starts wearing a tiny backpack purse.",
      line: "Quick context: [one sentence]. I need [specific ask] by [date] so we can [business reason]. My recommendation is [recommendation].",
    },
    meeting: {
      read: `This meeting needs a point before it needs more people pretending to be available.`,
      next: "Define the decision, the prep, and what a good outcome looks like. If there is no decision, it may be an email in kitten heels.",
      line: "For this meeting, the decision we need is [decision]. Please review [material] in advance. A good outcome is [outcome], with owners and next steps confirmed before we leave.",
    },
    conflict: {
      read: `There is tension here, but tension is not automatically a fire drill with lip gloss.`,
      next: "Separate facts from feelings, name the impact, and ask for the next workable behavior. Do not litigate the entire group chat.",
      line: "I want to reset on this. The issue I am seeing is [fact/impact]. What I need next is [specific action]. Can we align on that path?",
    },
    boundary: {
      read: `Your capacity is not a community Caboodle where everyone gets to store their loose glitter.`,
      next: "Name the tradeoff. A real boundary gives options instead of silently absorbing the mess.",
      line: "I can take on [option A] by [date], or [option B] by [date], but I cannot do both at the current quality bar. Which should I prioritize?",
    },
    feedback: {
      read: `This needs receipts, not a shame montage.`,
      next: "Ask what good looks like, what needs to change, and what the next check-in should cover. Keep it specific enough to act on.",
      line: "I want to make sure I am addressing this properly. Can you share the specific gap, what good would look like, and the next milestone you want me to hit?",
    },
    ai: {
      read: `The AI is not psychic. It is more like a very fast intern who needs the good gossip.`,
      next: "Give it audience, context, constraints, examples, what good looks like, and what not to include. If the output is beige, the prompt arrived underdressed.",
      line: "I need help with [task]. The audience is [audience]. The context is [context]. The answer should be [tone/format/length]. Do not include [exclusions]. Ask me three questions before drafting.",
    },
    confidence: {
      read: `Nerves are data, not directions. Your inner critic has opened a second tab and it is not helping.`,
      next: "Shrink the task until it has handles: one sentence, one receipt, one next step. Do that before confidence arrives wearing platform sandals.",
      line: "The next useful move is [small action]. I do not need to solve the whole season today; I need to complete this scene.",
    },
    pitch: {
      read: `You have an idea, but ${signals.audience} needs to know what changes, why now, and what you need from them.`,
      next: "Pitch the outcome, not the entire scrapbook. Lead with the problem, the recommendation, the ask, and the risk of doing nothing.",
      line: "I recommend [idea] because [business reason]. The decision I need is [approval/next step]. The risk of waiting is [risk].",
    },
    general: {
      read: `This is currently swirl wearing work clothes.`,
      next: "Turn it into a brief: desired outcome, person who needs to act, blocker, standard for good, and next move by Friday.",
      line: "The outcome I want is [outcome]. The person who needs to act is [person]. The blocker is [blocker]. The next move is [specific action].",
    },
  };
  return advice[topicType] || advice.general;
}

function buildLaidyAdvice(rawQuestion, modeKey) {
  const question = normalizeLaidyText(rawQuestion);

  if (!question) {
    return `Cup of ambition check: Tell me the actual situation first. LAIDY can do many things, but she cannot read a blank text box through a Claire's mood ring.\n\nTry: "I need to ask my VP for more time without sounding chaotic" or "I need to push back on a meeting request without sounding unhelpful."`;
  }

  const signals = getLaidySignals(question);
  const effectiveModeKey = modeKey === "auto" ? getLaidyAutoMode(signals.topicType) : modeKey;
  const mode = laidyModes[effectiveModeKey] || laidyModes.cher;
  const frame = getLaidyModeFrame(effectiveModeKey);
  const topicAdvice = getLaidyTopicAdvice(signals.topicType, signals);
  const contextLine = `I heard: ${signals.need} for ${signals.audience}. Risk level: ${signals.risk}. Tone target: ${signals.tone}.`;

  return `${mode.opener} ${mode.nudge}\n\n${contextLine}\n\nRead: ${topicAdvice.read}\n\nDo this: ${topicAdvice.next} ${frame.move}\n\nTry this line: "${topicAdvice.line}"\n\nCaboodle note: ${frame.signoff}`;
}

function buildLaidyPromptFeedback(rawQuestion) {
  const question = normalizeLaidyText(rawQuestion);
  if (!question) {
    return "Prompt check: blank prompt, blank crystal ball. Add the situation, what you need, who it is for, and what a good answer should include.";
  }

  const normalized = question.toLowerCase();
  const wordCount = question.split(/\s+/).filter(Boolean).length;
  const checks = [
    /\b(need|want|help|write|draft|decide|explain|summarize|compare|plan|ask|respond)\b/.test(normalized),
    /\b(vp|boss|manager|team|client|customer|reader|audience|stakeholder|friend|colleague|director|leadership)\b/.test(normalized),
    wordCount >= 12 || /\b(context|background|because|situation|currently|deadline|meeting|project)\b/.test(normalized),
    /\b(tone|format|length|include|avoid|specific|example|deadline|constraint|do not|don't)\b/.test(normalized),
  ];
  const score = checks.filter(Boolean).length;

  if (score >= 4) {
    return "Prompt check: strong ask. You gave LAIDY enough job, audience, context, and boundaries to work with. The next level is adding an example of what good looks like.";
  }

  if (score >= 2) {
    return "Prompt check: workable, but it could be sharper. Add the audience, the situation, the format you want, and one constraint so the answer does not have to guess.";
  }

  return "Prompt check: this is more mood than mission. Add the task, who it is for, why it matters, what tone/format you want, and what not to include.";
}

const quoteEl = document.querySelector("#rememberQuote");
const quoteButton = document.querySelector("#newQuoteButton");
const copyButton = document.querySelector("#copyQuoteButton");
const copyStatus = document.querySelector("#copyStatus");
const promptEl = document.querySelector("#promptChallenge");
const promptContext = document.querySelector("#promptContext");
const promptButton = document.querySelector("#promptButton");
const fortuneButton = document.querySelector("#fortuneButton");
const fortuneOutput = document.querySelector("#fortuneOutput");
const cocktailSpinButton = document.querySelector("#cocktailSpinButton");
const cocktailWheel = document.querySelector("#cocktailWheel");
const spiritFreeSpinButton = document.querySelector("#spiritFreeSpinButton");
const cocktailOutput = document.querySelector("#cocktailOutput");
const cocktailFortune = document.querySelector("#cocktailFortune");
const cocktailFortuneImage = document.querySelector("[data-fortune-image]");
const cocktailFortuneMode = document.querySelector("#cocktailFortuneMode");
const cocktailFortuneNumber = document.querySelector("#cocktailFortuneNumber");
const cocktailFortuneDrink = document.querySelector("#cocktailFortuneDrink");
const cocktailFortuneFlapButtons = document.querySelectorAll("[data-cocktail-flap]");
const girlTalkButton = document.querySelector("#girlTalkButton");
const girlTalkOutput = document.querySelector("#girlTalkOutput");
const fairyWandLink = document.querySelector(".fairy-wand");
const dreamPhoneNumber = document.querySelector("#dreamPhoneNumber");
const dreamPhoneButton = document.querySelector("#dreamPhoneButton");
const dreamPhoneOutput = document.querySelector("#dreamPhoneOutput");
const dreamPhoneSecretBadge = document.querySelector("#dreamPhoneSecretBadge");
const secretBadgeShelf = document.querySelector("#secretBadgeShelf");
const quizStickerShelf = document.querySelector("#quizStickerShelf");
const dreamPhoneToggle = document.querySelector("#dreamPhoneToggle");
const dreamPhoneGameCard = document.querySelector(".dream-phone-game");
const dreamPhoneCards = document.querySelectorAll("[data-dream-pick]");
const dreamPhoneSpecialCards = document.querySelectorAll("[data-dream-special]");
const dreamPhoneKeypadButtons = document.querySelectorAll("[data-dream-key]");
const copyPlaylistButtons = document.querySelectorAll("[data-copy-playlist]");
const playlistStatus = document.querySelector("#playlistStatus");
const openCardPackButton = document.querySelector("#openCardPackButton");
const resetCardPackButton = document.querySelector("#resetCardPackButton");
const issueList = document.querySelector(".issue-list");
const cardPackStatus = document.querySelector("#cardPackStatus");
const cardPackPulls = document.querySelector("#cardPackPulls");
const cardPackOwnedCount = document.querySelector("#cardPackOwnedCount");
const cardPackMissingCount = document.querySelector("#cardPackMissingCount");
const cardPackIssueSelect = document.querySelector("#cardPackIssueSelect");
const cardPackRail = document.querySelector("[data-card-pack-rail]");
let episodeTradingCards = document.querySelectorAll("[data-pack-card]");
const referenceButtons = document.querySelectorAll("[data-reference-filter]");
const referenceCloseButton = document.querySelector("[data-reference-close]");
const referenceCards = document.querySelectorAll("[data-reference-type]");
const referenceSearch = document.querySelector("#referenceSearch");
const referenceGrid = document.querySelector("#referenceGrid");
const referenceClosetStatus = document.querySelector("#referenceClosetStatus");
const expandableCards = document.querySelectorAll(".glossary-grid article, .profile-grid article, .reference-card");
const glossaryGrid = document.querySelector("#glossaryGrid");
const glossaryCards = document.querySelectorAll("#glossaryGrid article");
const glossarySelect = document.querySelector("#glossarySelect");
const glossaryPrev = document.querySelector("#glossaryPrev");
const glossaryNext = document.querySelector("#glossaryNext");
const glossaryShowAll = document.querySelector("#glossaryShowAll");
const glossaryStatus = document.querySelector("#glossaryStatus");
const laidyQuestion = document.querySelector("#laidyQuestion");
const laidyMode = document.querySelector("#laidyMode");
const laidyAdviceEl = document.querySelector("#laidyAdvice");
const laidyPromptFeedbackText = document.querySelector("#laidyPromptFeedbackText");
const laidyButton = document.querySelector("#laidyButton");
const subscribeForm = document.querySelector(".subscribe-form");
const subscribeStatus = document.querySelector("#subscribeStatus");
const boardForm = document.querySelector("#boardForm");
const boardCategory = document.querySelector("#boardCategory");
const boardName = document.querySelector("#boardName");
const boardTitle = document.querySelector("#boardTitle");
const boardBody = document.querySelector("#boardBody");
const boardStatus = document.querySelector("#boardStatus");
const boardPostsEl = document.querySelector("#boardPosts");
const boardPickButtons = document.querySelectorAll("[data-board-pick]");
const boardCards = document.querySelectorAll("[data-board-card]");
const copyBoardPost = document.querySelector("#copyBoardPost");
const clearBoardPosts = document.querySelector("#clearBoardPosts");
const feedbackForm = document.querySelector("#feedbackForm");
const feedbackStatus = document.querySelector("#feedbackStatus");
const spotlightForm = document.querySelector("#spotlightForm");
const spotlightCopy = document.querySelector("#spotlightCopy");
const spotlightPhotoPreview = document.querySelector("#spotlightPhotoPreview");
const copySpotlightDraft = document.querySelector("#copySpotlightDraft");
const spotlightStatus = document.querySelector("#spotlightStatus");
const featureOptIn = document.querySelector("#featureOptIn");
const featureFields = document.querySelector("#featureFields");
const memberCardPreview = document.querySelector("#memberCardPreview");
const memberCardKicker = document.querySelector("#memberCardKicker");
const memberCardName = document.querySelector("#memberCardName");
const memberCardSummary = document.querySelector("#memberCardSummary");
const memberCardTags = document.querySelector("#memberCardTags");
const cardStyleSelect = document.querySelector("#cardStyle");
const selectedCardStyleNote = document.querySelector("#selectedCardStyleNote");
const directoryFilterButtons = document.querySelectorAll("[data-card-filter]");
const laidiesCardGrid = document.querySelector("#laidiesCardGrid");
const directoryFilterStatus = document.querySelector("#directoryFilterStatus");
const cardApprovalSteps = document.querySelectorAll(".card-approval-steps span");
const quizForm = document.querySelector("#quizForm");
const quizQuestionsEl = document.querySelector("#quizQuestions");
const quizResult = document.querySelector("#quizResult");
const quizResetButton = document.querySelector("#quizResetButton");
const quizRewardTitle = document.querySelector("#quizRewardTitle");
const quizBestScore = document.querySelector("#quizBestScore");
const quizSticker = document.querySelector("#quizSticker");
const quizIssueSelect = document.querySelector("#quizIssueSelect");
const quizIssueLabel = document.querySelector("#quizIssueLabel");
const quizIssueTitle = document.querySelector("#quizIssueTitle");
const quizRereadLink = document.querySelector("#quizRereadLink");
const quizProgressList = document.querySelector("#quizProgressList");
const quizStartPanel = document.querySelector("#quizStartPanel");
const quizIssueShelf = document.querySelector(".quiz-issue-shelf");
const initialQuizIssueCards = Array.from(document.querySelectorAll("[data-quiz-open]"));
const initialQuizIssueOptions = Array.from(quizIssueSelect?.options || []);
const initialQuizIssueKeys = Array.from(
  new Set([
    ...initialQuizIssueCards.map((card) => card.dataset.quizOpen).filter(Boolean),
    ...initialQuizIssueOptions.map((option) => option.value).filter(Boolean),
  ]),
);
const initialQuizIssueMeta = new Map();
initialQuizIssueCards.forEach((card) => {
  initialQuizIssueMeta.set(card.dataset.quizOpen, {
    issueLabel: card.querySelector("span")?.textContent?.trim(),
    title: card.querySelector("strong")?.textContent?.trim(),
    length: card.querySelector("em")?.textContent?.trim(),
  });
});
initialQuizIssueOptions.forEach((option) => {
  const current = initialQuizIssueMeta.get(option.value) || {};
  initialQuizIssueMeta.set(option.value, {
    ...current,
    optionLabel: option.textContent.trim(),
  });
});
let quizIssueCards = initialQuizIssueCards;
const gamePanelDock = document.querySelector("#game-panel-dock");
const gamesGrid = document.querySelector("#gamesGrid");
const gamePanelTriggers = document.querySelectorAll("[data-open-game-panel]");
const gamePanels = document.querySelectorAll("[data-game-panel]");
const siteJumpLinks = document.querySelectorAll("[data-jump-link]");
const funPackToggles = document.querySelectorAll("[data-fun-pack-toggle]");
const funPackLockedButtons = document.querySelectorAll("[data-fun-pack-locked]");
const funPackActivities = document.querySelectorAll("[data-fun-pack-activity]");
const funPackStatus = document.querySelector("[data-fun-pack-status]");
const clubhouseCompact = document.querySelector("[data-clubhouse-compact]");
const clubhouseStateButtons = document.querySelectorAll("[data-clubhouse-state-button]");
const clubhouseStateImages = document.querySelectorAll("[data-clubhouse-image]");
const clubhouseLayerButtons = document.querySelectorAll("[data-clubhouse-open-layer]");
const clubhouseZoneButtons = document.querySelectorAll("[data-clubhouse-zone]");
const clubhouseStickerButtons = document.querySelectorAll("[data-clubhouse-sticker]");
const clubhouseStatus = document.querySelector("[data-clubhouse-status]");
const clubhouseRevealables = document.querySelectorAll(".clubhouse-revealable");
const memberPassEmail = document.querySelector("#memberPassEmail");
const memberPassStatus = document.querySelector("#memberPassStatus");
const memberPassDetail = document.querySelector("#memberPassDetail");
const memberPassConfirmation = document.querySelector("#memberPassConfirmation");
const memberPassConfirmationTitle = document.querySelector("#memberPassConfirmationTitle");
const memberPassConfirmationDetail = document.querySelector("#memberPassConfirmationDetail");
const memberPassNote = document.querySelector("#memberPassNote");
const saveMemberPassButton = document.querySelector("#saveMemberPassButton");
const memberSignOutButton = document.querySelector("#memberSignOutButton");
const memberStartFreshButton = document.querySelector("#memberStartFreshButton");
const memberPassNewsletter = document.querySelector("#memberPassNewsletter");
const memberPassEmailHelp = document.querySelector("#memberPassEmailHelp");
const memberProfileButtons = document.querySelectorAll("[data-member-profile]");
const memberProfileGroups = document.querySelectorAll(".member-profile-group");
const memberPassSteps = document.querySelectorAll("[data-member-pass-step]");
const issueFunPackMeta = {
  issue01: {
    label: "Issue 01",
    title: "Start Here Pack",
    status: "Issue 01 pack loaded: quiz, trading cards, try-on, and printables.",
  },
  issue02: {
    label: "Issue 02",
    title: "Tell Me What You Want",
    status: "Issue 02 pack loaded: quiz, specificity cards, try-on, prompt cheat sheet, and article takeaways.",
  },
};

let lastQuoteIndex = 0;
let lastPromptIndex = 0;
let lastFortuneIndex = 0;
const cocktailSpinState = {
  cocktail: { lastIndex: 0, turns: 0, wheel: cocktailWheel },
  spiritFree: { lastIndex: 0, turns: 0, wheel: cocktailWheel },
};
let activeCocktailType = "cocktail";
window.setActiveCocktailType = function(type) { activeCocktailType = type; };
renderCocktailWheels();
let lastGirlTalkIndex = 0;
let activeDreamPhoneSpecial = "";
let lastDreamPhonePick = "";
let lastDreamPhoneBaseAnswer = "";
let madameClaioCallsThisSession = 0;
let girlTalkDrawsThisSession = 0;
let tryOnShufflesThisSession = 0;
const cocktailFortuneFlapsUsed = new Set();
const dreamPhoneRemixCardsUsed = new Set();
const lastDreamPhoneIndexes = {};
let lastLaidyAdvice = "";
let lastSpotlightDraft = "";
const boardStorageKey = "laidiesBoardPreviewPosts";
const cardCollectionStorageKey = "laidiesCardPackCollection";
const lastCardPackStorageKey = "laidiesLastCardPackPulls";
const quizStorageKey = "laidiesQuizBestScores";
const quizProgressStorageKey = "laidiesQuizProgress";
const secretBadgeStorageKey = "laidiesSecretBadges";
const communityRoomPostStorageKey = "laidiesCommunityRoomPosts";
const memberPassStorageKey = "laidiesMemberPass";
const memberAuthPendingStorageKey = "laidiesMemberAuthPending";
const newsletterSubmittedStorageKey = "laidiesNewsletterSubmitted";
const newsletterSubscribeUrl = "https://buttondown.com/api/emails/embed-subscribe/laidies";
const deviceMemoryFallback = new Map();
let memberAuthConfigured = false;
let memberAuthClient = null;
let memberAuthSession = null;
let memberAuthStatus = "guest";
let memberSyncTimer = null;

function getDeviceMemory() {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch {
    return null;
  }
  return null;
}

function getStoredJson(key, fallbackValue) {
  try {
    const deviceMemory = getDeviceMemory();
    const value = deviceMemory ? deviceMemory.getItem(key) : deviceMemoryFallback.get(key);
    return value ? JSON.parse(value) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function setStoredJson(key, value) {
  const serialized = JSON.stringify(value);
  const deviceMemory = getDeviceMemory();
  try {
    if (deviceMemory) {
      deviceMemory.setItem(key, serialized);
      return;
    }
  } catch {
    // Fall through to memory so the experience keeps working even when storage is blocked.
  }
  deviceMemoryFallback.set(key, serialized);
}

function removeStoredJson(key) {
  const deviceMemory = getDeviceMemory();
  try {
    if (deviceMemory) deviceMemory.removeItem(key);
  } catch {
    // Fallback removal below keeps the current session consistent.
  }
  deviceMemoryFallback.delete(key);
}

function resetMemberPassExperience(status = "Reset complete. Enter an email when you are ready to test again.") {
  removeStoredJson(memberPassStorageKey);
  removeStoredJson(memberAuthPendingStorageKey);
  memberAuthStatus = memberAuthSession?.user ? "signed-in" : "guest";
  if (memberPassEmail) memberPassEmail.value = "";
  if (memberPassNewsletter) memberPassNewsletter.checked = false;
  memberProfileButtons.forEach((button) => button.classList.remove("is-selected"));
  renderMemberPass(status);
}

function consumeMemberPassResetUrl() {
  const searchParams = new URLSearchParams(window.location.search || "");
  if (searchParams.get("reset-pass") !== "1") return false;
  resetMemberPassExperience();
  searchParams.delete("reset-pass");
  const cleanUrl = new URL(window.location.pathname || "/index.html", window.location.origin);
  searchParams.forEach((value, key) => cleanUrl.searchParams.set(key, value));
  cleanUrl.hash = "member-passport";
  if (window.history?.replaceState) window.history.replaceState(null, "", cleanUrl.toString());
  return true;
}

function getMemberPass() {
  const stored = getStoredJson(memberPassStorageKey, {});
  return {
    email: "",
    profile: {},
    newsletterOptIn: false,
    ...stored,
    profile: { ...(stored?.profile || {}) },
  };
}

function getSelectedMemberProfile() {
  const profile = {};
  memberProfileButtons.forEach((button) => {
    if (button.classList.contains("is-selected")) {
      const key = button.dataset.memberProfile;
      const allowsMultiple = button.closest("[data-member-profile-multiple='true']");
      if (allowsMultiple) {
        profile[key] = Array.isArray(profile[key]) ? profile[key] : [];
        profile[key].push(button.dataset.memberProfileValue);
      } else {
        profile[key] = button.dataset.memberProfileValue;
      }
    }
  });
  return profile;
}

function saveMemberPass(update = {}) {
  const current = getMemberPass();
  const next = {
    ...current,
    ...update,
    profile: {
      ...current.profile,
      ...(update.profile || {}),
    },
    updatedAt: new Date().toISOString(),
  };
  setStoredJson(memberPassStorageKey, next);
  return next;
}

function renderMemberProfileButtons(profile = {}) {
  memberProfileButtons.forEach((button) => {
    const value = profile[button.dataset.memberProfile];
    button.classList.toggle(
      "is-selected",
      Array.isArray(value) ? value.includes(button.dataset.memberProfileValue) : value === button.dataset.memberProfileValue,
    );
  });
}

function getMemberRedirectUrl() {
  const url = new URL(window.location.pathname || "/index.html", window.location.origin);
  if (!url.pathname.endsWith(".html")) url.pathname = `${url.pathname.replace(/\/$/, "")}/index.html`;
  url.searchParams.set("member-pass", "1");
  url.hash = "";
  return url.toString();
}

function getLaidiesAssetVersion() {
  const script = Array.from(document.scripts || []).find((item) => item.src?.includes("script.js"));
  if (!script?.src) return "";
  try {
    return new URL(script.src).searchParams.get("v") || "";
  } catch {
    return "";
  }
}

function getMemberCardBuilderUrl() {
  const url = new URL("community/laidy-spotlight.html", window.location.href);
  const version = getLaidiesAssetVersion();
  if (version) url.searchParams.set("v", version);
  url.hash = "spotlight-form-title";
  return url.toString();
}

function openMemberCardBuilder(delay = 0) {
  window.setTimeout(() => {
    window.location.assign(getMemberCardBuilderUrl());
  }, delay);
}

function getMemberAuthUrlParams() {
  const searchParams = new URLSearchParams(window.location.search || "");
  const hashValue = window.location.hash?.startsWith("#") ? window.location.hash.slice(1) : window.location.hash || "";
  const hashQuery = hashValue.includes("?") ? hashValue.slice(hashValue.indexOf("?") + 1) : hashValue;
  const hashParams = new URLSearchParams(hashQuery);
  return {
    accessToken: searchParams.get("access_token") || hashParams.get("access_token"),
    code: searchParams.get("code") || hashParams.get("code"),
    refreshToken: searchParams.get("refresh_token") || hashParams.get("refresh_token"),
    returnToPass: searchParams.get("member-pass") === "1" || hashValue.startsWith("member-passport"),
    type: searchParams.get("type") || hashParams.get("type"),
  };
}

function isMemberAuthReturnUrl() {
  const authParams = getMemberAuthUrlParams();
  return (
    authParams.returnToPass ||
    Boolean(authParams.code) ||
    authParams.type === "magiclink" ||
    authParams.type === "signup" ||
    Boolean(authParams.accessToken) ||
    Boolean(authParams.refreshToken)
  );
}

function normalizeMemberEmail(email = "") {
  return email.trim().toLowerCase();
}

function rememberMemberAuthReturn(email, step = "confirm") {
  setStoredJson(memberAuthPendingStorageKey, {
    email: normalizeMemberEmail(email),
    step,
    sentAt: new Date().toISOString(),
  });
}

function getActiveMemberAuthPending(email = "") {
  const pending = getStoredJson(memberAuthPendingStorageKey, null);
  if (!pending?.sentAt) return false;
  const sentAt = Date.parse(pending.sentAt);
  if (!Number.isFinite(sentAt) || Date.now() - sentAt >= 1000 * 60 * 45) return null;
  const normalizedEmail = normalizeMemberEmail(email);
  if (normalizedEmail && pending.email && pending.email !== normalizedEmail) return null;
  return pending;
}

function shouldReturnToMemberPass() {
  if (window.location.hash === "#member-passport") return false;
  if (isMemberAuthReturnUrl()) return true;
  return Boolean(getActiveMemberAuthPending());
}

function moveToMemberPassAfterAuth({ cleanUrl = false, delay = 500 } = {}) {
  const memberPass = document.querySelector("#member-passport");
  if (!memberPass) return;
  window.setTimeout(() => {
    memberPass.scrollIntoView({ block: "start" });
    if (!cleanUrl) return;
    if (window.history?.replaceState) {
      const cleanUrl = new URL(window.location.pathname || "/index.html", window.location.origin);
      if (!cleanUrl.pathname.endsWith(".html")) cleanUrl.pathname = `${cleanUrl.pathname.replace(/\/$/, "")}/index.html`;
      cleanUrl.hash = "member-passport";
      window.history.replaceState(null, "", cleanUrl.toString());
    } else {
      window.location.hash = "member-passport";
    }
  }, delay);
}

function isMemberAuthConfigured() {
  const config = window.LAIDIES_SUPABASE_CONFIG || {};
  return Boolean(config.url && config.anonKey && config.url.startsWith("https://") && config.anonKey.length > 20);
}

function getSupabaseSafeProfileValue(key, value) {
  const allowedValues = {
    industry: ["tax", "finance", "legal-compliance", "ops-product", "people-hr", "marketing-comms", "founder-consultant"],
    goal: ["learn-basics", "save-time", "write-better", "build-tools", "lead-team", "find-community"],
  };
  const list = allowedValues[key];
  if (!list) return value || null;
  if (Array.isArray(value)) return value.find((item) => list.includes(item)) || null;
  return list.includes(value) ? value : null;
}

function setMemberPassConfirmation(visible, title = "", detail = "") {
  if (!memberPassConfirmation) return;
  memberPassConfirmation.hidden = !visible;
  if (memberPassConfirmationTitle) memberPassConfirmationTitle.textContent = title;
  if (memberPassConfirmationDetail) memberPassConfirmationDetail.textContent = detail;
}

function setMemberPassStepState(activeStep, doneSteps = []) {
  memberPassSteps.forEach((step) => {
    const stepName = step.dataset.memberPassStep;
    const isActive = stepName === activeStep;
    const isDone = doneSteps.includes(stepName);
    step.classList.toggle("is-active", isActive);
    step.classList.toggle("is-done", isDone && !isActive);
  });
}

let memberProfileResponsiveDefaultApplied = false;
function applyMemberProfileResponsiveDefault() {
  if (memberProfileResponsiveDefaultApplied || !memberProfileGroups.length) return;
  const startsCollapsed = typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
  memberProfileGroups.forEach((group) => {
    group.open = !startsCollapsed;
  });
  memberProfileResponsiveDefaultApplied = true;
}

function renderMemberPass(statusOverride = "") {
  if (!memberPassStatus || !memberPassDetail || !memberPassNote) return;
  applyMemberProfileResponsiveDefault();
  const pass = getMemberPass();
  const signedInEmail = memberAuthSession?.user?.email || "";
  const typedEmail = normalizeMemberEmail(memberPassEmail?.value || "");
  const savedEmail = normalizeMemberEmail(pass.email || "");
  const activeEmail = signedInEmail || typedEmail || savedEmail;
  const pendingAuth = getActiveMemberAuthPending(activeEmail);

  if (memberPassEmail && signedInEmail) {
    memberPassEmail.value = signedInEmail;
  } else if (memberPassEmail && !memberPassEmail.value && pass.email) {
    memberPassEmail.value = pass.email;
  }
  if (memberPassNewsletter) memberPassNewsletter.checked = pass.newsletterOptIn === true;
  renderMemberProfileButtons(pass.profile);

  memberAuthConfigured = isMemberAuthConfigured();
  const canSendMagicLink = memberAuthConfigured && !memberAuthSession;
  const isSignedIn = Boolean(memberAuthSession?.user);
  const isLoading = memberAuthStatus === "loading";
  const hasPendingEmail = memberAuthStatus === "confirm-sent" || memberAuthStatus === "link-sent" || Boolean(pendingAuth?.step);
  const pendingStep = hasPendingEmail ? "email" : "";
  const linkSent = isLoading || pendingStep === "email";

  memberPassStatus.closest(".member-pass-panel")?.classList.toggle("is-link-sent", linkSent);
  if (memberPassEmailHelp) memberPassEmailHelp.hidden = pendingStep !== "email";
  if (isLoading) {
    setMemberPassConfirmation(
      true,
      "Sending email...",
      "Hold tight for a moment. If you recently requested a pass email, the service may ask you to wait before another one arrives.",
    );
  } else if (pendingStep === "email") {
    setMemberPassConfirmation(
      true,
      "Clubhouse Pass email sent",
      "Open the newest Clubhouse Pass email from this same browser or computer. It may say confirm signup or sign in; either one should open your Clubhouse Pass.",
    );
  } else {
    setMemberPassConfirmation(false);
  }
  if (memberSignOutButton) memberSignOutButton.hidden = !isSignedIn;
  if (saveMemberPassButton) {
    saveMemberPassButton.disabled = isLoading || pendingStep === "email";
    saveMemberPassButton.textContent = isSignedIn
      ? "Create your lAIdies Card"
      : isLoading
        ? "Sending..."
      : pendingStep === "email"
        ? "Email sent"
          : canSendMagicLink
            ? "Email me my Clubhouse Pass"
            : "Save guest pass";
  }

  if (isSignedIn) {
    setMemberPassStepState("create", ["profile"]);
    memberPassStatus.textContent = "Clubhouse Pass signed in.";
    memberPassDetail.textContent = `Signed in as ${signedInEmail}. Your pass is open, and your next step is building the card people can use to find you.`;
    memberPassNote.textContent = statusOverride || "Next: create your card. LinkedIn handles the actual hello until direct chat exists.";
    return;
  }

  if (isLoading) {
    setMemberPassStepState("profile", []);
    memberPassStatus.textContent = "Sending account email...";
    memberPassDetail.textContent = "The request is going to the Clubhouse email service now. You should see either a confirmation message here or a clear error if another send is temporarily blocked.";
    memberPassNote.textContent = statusOverride || "Do not keep clicking while it is sending.";
    return;
  }

  if (pendingStep === "email") {
    setMemberPassStepState("profile", []);
    memberPassStatus.textContent = "Check your email to open your Clubhouse Pass.";
    memberPassDetail.textContent = `We sent ${pass.email || activeEmail} the Clubhouse Pass email. The subject may say confirm signup or sign in. Open the newest one from this same browser or computer.`;
    memberPassNote.textContent = statusOverride || "If the weekly newsletter box was checked, that preference is saved. The newsletter confirmation waits until your Clubhouse Pass sign-in works.";
    return;
  }

  if (memberAuthConfigured) {
    setMemberPassStepState("profile", []);
    memberPassStatus.textContent = "Create or open your Clubhouse Pass.";
    memberPassDetail.textContent = "Enter your email and choose any profile answers you want. We will send one Clubhouse Pass email.";
    memberPassNote.textContent = statusOverride || "Newsletter signup is optional and will be handled after the pass opens, so your inbox does not get two confirmations at once.";
    return;
  }

  setMemberPassStepState("profile", []);
  memberPassStatus.textContent = pass.email ? "Guest pass ready." : "Create or open your Clubhouse Pass.";
  memberPassDetail.textContent = pass.email
    ? `${pass.email} is ready for Clubhouse Pass sign-in. Open the pass to pin rewards to your member card.`
    : "Badges, stickers, card pulls, and quiz progress belong on your member card. Sign in so the good stuff follows you.";
  memberPassNote.textContent = statusOverride || "Your progress is saved locally. Sign in to keep it across devices and unlock your full Clubhouse Pass.";
}

function submitNewsletterOptIn(email) {
  if (!email || !memberPassNewsletter?.checked || typeof document === "undefined") return;
  const normalizedEmail = email.trim().toLowerCase();
  const submitted = getStoredJson(newsletterSubmittedStorageKey, {});
  if (submitted.email === normalizedEmail) return;
  const iframeName = "laidiesSubscribeFrame";
  let iframe = document.querySelector(`iframe[name="${iframeName}"]`);
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.hidden = true;
    document.body.appendChild(iframe);
  }

  const form = document.createElement("form");
  form.action = newsletterSubscribeUrl;
  form.method = "post";
  form.target = iframeName;
  form.hidden = true;

  const emailInput = document.createElement("input");
  emailInput.name = "email";
  emailInput.value = normalizedEmail;
  form.appendChild(emailInput);
  document.body.appendChild(form);
  form.submit();
  form.remove();
  setStoredJson(newsletterSubmittedStorageKey, {
    email: normalizedEmail,
    submittedAt: new Date().toISOString(),
    source: "member-pass",
  });
}

function getLocalRewardEvents(userId) {
  const events = [];
  const progress = getQuizProgressRecords();
  Object.entries(progress).forEach(([issueKey, record]) => {
    if (!record?.completedAt && !record?.bestScore) return;
    events.push({
      user_id: userId,
      dedupe_key: `quiz-score:${issueKey}`,
      reward_type: "quiz_score",
      issue_key: issueKey,
      title: `${issueKey} quiz score`,
      source: "Magazine Quiz",
      earned_at: record.completedAt || new Date().toISOString(),
      metadata: {
        latestScore: Number(record.latestScore || 0),
        bestScore: Number(record.bestScore || 0),
        maxScore: Number(record.maxScore || 10),
        attempts: Number(record.attempts || 0),
      },
    });
    if (record.stickerTitle) {
      events.push({
        user_id: userId,
        dedupe_key: `quiz-sticker:${issueKey}:${record.stickerTier || "earned"}`,
        reward_type: "quiz_sticker",
        issue_key: issueKey,
        title: record.stickerTitle,
        source: "Magazine Quiz",
        earned_at: record.completedAt || new Date().toISOString(),
        metadata: { stickerTier: record.stickerTier || "" },
      });
    }
  });

  const packCards = getPackCards();
  packCards.forEach((card) => {
    const count = Number(cardCollection[card.id] || 0);
    if (!count) return;
    events.push({
      user_id: userId,
      dedupe_key: `trading-card:${card.id}`,
      reward_type: "trading_card",
      issue_key: card.packIssue || "all",
      title: card.title,
      source: "Trading Card Pack",
      earned_at: new Date().toISOString(),
      metadata: { count, image: card.image, issue: card.issue },
    });
  });

  Object.values(getCommunityRoomPosts()).forEach((roomPost) => {
    if (!roomPost?.roomId) return;
    events.push({
      user_id: userId,
      dedupe_key: `community-room-post:${roomPost.roomId}`,
      reward_type: "community_room_post",
      issue_key: "",
      title: roomPost.roomName || communityChatRooms[roomPost.roomId] || roomPost.roomId,
      source: "Chat Rooms",
      earned_at: roomPost.firstPostedAt || new Date().toISOString(),
      metadata: { roomId: roomPost.roomId },
    });
  });

  Object.values(getSecretBadges()).forEach((badge) => {
    if (!badge?.id) return;
    events.push({
      user_id: userId,
      dedupe_key: `secret-badge:${badge.id}`,
      reward_type: "secret_badge",
      issue_key: "",
      title: badge.title || badge.id,
      source: badge.source || "Clubhouse",
      earned_at: badge.unlockedAt || new Date().toISOString(),
      metadata: { sticker: badge.sticker || "" },
    });
  });
  return events;
}

function getLocalIssueProgress(userId) {
  const progress = getQuizProgressRecords();
  const cards = getPackCards();
  const issues = new Map();

  Object.entries(progress).forEach(([issueKey, record]) => {
    issues.set(issueKey, {
      user_id: userId,
      issue_key: issueKey,
      quiz_latest_score: Number(record.latestScore || 0),
      quiz_best_score: Number(record.bestScore || 0),
      quiz_attempts: Number(record.attempts || 0),
      sticker_title: record.stickerTitle || "",
      sticker_tier: record.stickerTier || "",
      card_count: 0,
      updated_at: new Date().toISOString(),
    });
  });

  cards.forEach((card) => {
    const issueKey = card.packIssue || "all";
    const current = issues.get(issueKey) || {
      user_id: userId,
      issue_key: issueKey,
      quiz_latest_score: 0,
      quiz_best_score: 0,
      quiz_attempts: 0,
      sticker_title: "",
      sticker_tier: "",
      card_count: 0,
      updated_at: new Date().toISOString(),
    };
    current.card_count += Number(cardCollection[card.id] || 0);
    issues.set(issueKey, current);
  });

  return Array.from(issues.values()).filter((item) => item.quiz_attempts || item.card_count);
}

async function mergeSecretBadgesFromAccount(userId) {
  if (!memberAuthClient || !userId) return;
  const { data, error } = await memberAuthClient
    .from("member_reward_events")
    .select("dedupe_key,title,source,earned_at,metadata")
    .eq("user_id", userId)
    .eq("reward_type", "secret_badge");
  if (error) throw error;
  if (!Array.isArray(data) || !data.length) return;

  const badges = getSecretBadges();
  data.forEach((event) => {
    const id = String(event.dedupe_key || "").replace(/^secret-badge:/, "");
    const badge = hiddenMeritBadges[id];
    if (!badge) return;
    badges[id] = {
      id,
      title: event.title || badge.title,
      sticker: event.metadata?.sticker || badge.sticker,
      unlockedAt: event.earned_at || new Date().toISOString(),
      source: event.source || badge.source,
    };
  });
  storeSecretBadges(badges);
  renderSecretBadges();
}

async function mergeQuizStickersFromAccount(userId) {
  if (!memberAuthClient || !userId) return;
  const { data, error } = await memberAuthClient
    .from("member_reward_events")
    .select("dedupe_key,issue_key,title,earned_at,metadata")
    .eq("user_id", userId)
    .eq("reward_type", "quiz_sticker");
  if (error) throw error;
  if (!Array.isArray(data) || !data.length) return;

  const progress = getQuizProgressRecords();
  data.forEach((event) => {
    const issueKey = event.issue_key || String(event.dedupe_key || "").split(":")[1] || "account";
    const tier = event.metadata?.stickerTier || String(event.dedupe_key || "").split(":")[2] || "";
    if (!tier) return;
    const current = progress[issueKey] || {};
    progress[issueKey] = {
      ...current,
      attempts: Number(current.attempts || 0),
      latestScore: Number(current.latestScore || 0),
      bestScore: Number(current.bestScore || 0),
      maxScore: Number(current.maxScore || 10),
      bonusScore: Number(current.bonusScore || 0),
      completedAt: current.completedAt || event.earned_at || new Date().toISOString(),
      stickerTitle: event.title || current.stickerTitle || tier,
      stickerTier: current.stickerTier || tier,
    };
  });
  saveQuizProgressRecords(progress);
  renderQuizStickerShelf();
}

async function mergeCommunityRoomPostsFromAccount(userId) {
  if (!memberAuthClient || !userId) return;
  const { data, error } = await memberAuthClient
    .from("member_reward_events")
    .select("dedupe_key,title,earned_at,metadata")
    .eq("user_id", userId)
    .eq("reward_type", "community_room_post");
  if (error) throw error;
  if (!Array.isArray(data) || !data.length) return;

  const posts = getCommunityRoomPosts();
  data.forEach((event) => {
    const id = event.metadata?.roomId || String(event.dedupe_key || "").replace(/^community-room-post:/, "");
    const roomId = normalizeCommunityRoomId(id);
    if (!communityChatRooms[roomId]) return;
    posts[roomId] = {
      roomId,
      roomName: event.title || communityChatRooms[roomId],
      firstPostedAt: event.earned_at || new Date().toISOString(),
    };
  });
  storeCommunityRoomPosts(posts);

  if (Object.keys(posts).some((roomId) => communityChatRooms[roomId])) {
    unlockSecretBadge("room-first-post", "Chat Rooms");
  }
  if (Object.keys(communityChatRooms).every((roomId) => posts[roomId])) {
    unlockSecretBadge("room-tour", "All Chat Rooms");
  }
}

async function syncMemberRewards(statusCopy = "Member pass synced.") {
  if (!memberAuthClient || !memberAuthSession?.user) return;
  const user = memberAuthSession.user;
  await mergeCommunityRoomPostsFromAccount(user.id);
  await mergeSecretBadgesFromAccount(user.id);
  await mergeQuizStickersFromAccount(user.id);
  const pass = saveMemberPass({
    email: user.email || memberPassEmail?.value.trim() || "",
    profile: getSelectedMemberProfile(),
    newsletterOptIn: Boolean(memberPassNewsletter?.checked),
    mode: "magic-link",
  });

  const newsletterOptedInAt = pass.newsletterOptIn ? new Date().toISOString() : null;
  const profilePayload = {
    id: user.id,
    email: user.email || pass.email,
    industry: getSupabaseSafeProfileValue("industry", pass.profile.industry),
    ai_comfort: pass.profile.aiComfort || null,
    generation: pass.profile.generation || null,
    goal: getSupabaseSafeProfileValue("goal", pass.profile.goals || pass.profile.goal),
    member_card_is_public: false,
    member_card_status: "private",
    newsletter_opt_in: Boolean(pass.newsletterOptIn),
    newsletter_opted_in_at: newsletterOptedInAt,
    updated_at: new Date().toISOString(),
  };

  const { error: profileError } = await memberAuthClient.from("member_profiles").upsert(profilePayload);
  if (profileError) throw profileError;

  const rewards = getLocalRewardEvents(user.id);
  if (rewards.length) {
    const { error: rewardsError } = await memberAuthClient.from("member_reward_events").upsert(rewards, { onConflict: "user_id,dedupe_key" });
    if (rewardsError) throw rewardsError;
  }

  const issueProgress = getLocalIssueProgress(user.id);
  if (issueProgress.length) {
    const { error: progressError } = await memberAuthClient.from("member_issue_progress").upsert(issueProgress, { onConflict: "user_id,issue_key" });
    if (progressError) throw progressError;
  }

  if (pass.newsletterOptIn) submitNewsletterOptIn(pass.email || user.email || "");
  const newsletterCopy = pass.newsletterOptIn ? " Newsletter confirmation may arrive separately after your pass is open." : "";
  renderMemberPass(`${statusCopy}${newsletterCopy}`);
}

function scheduleMemberRewardSync() {
  if (!memberAuthClient || !memberAuthSession?.user) return;
  clearTimeout(memberSyncTimer);
  memberSyncTimer = setTimeout(() => {
    syncMemberRewards().catch((error) => {
      renderMemberPass(`Sync needs attention: ${error.message || "try again."}`);
    });
  }, 450);
}

async function initMemberAuth() {
  if (!memberPassStatus) return;
  memberAuthConfigured = isMemberAuthConfigured();
  const returningToMemberPass = shouldReturnToMemberPass();
  renderMemberPass();
  if (!memberAuthConfigured) return;

  try {
    memberAuthStatus = "loading";
    renderMemberPass("Loading member login...");
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
    const config = window.LAIDIES_SUPABASE_CONFIG;
    memberAuthClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
    const authParams = getMemberAuthUrlParams();
    if (authParams.code) {
      const { data, error } = await memberAuthClient.auth.exchangeCodeForSession(authParams.code);
      if (error) throw error;
      memberAuthSession = data.session || null;
    } else if (authParams.accessToken && authParams.refreshToken) {
      const { data, error } = await memberAuthClient.auth.setSession({
        access_token: authParams.accessToken,
        refresh_token: authParams.refreshToken,
      });
      if (error) throw error;
      memberAuthSession = data.session || null;
    } else {
      const { data, error } = await memberAuthClient.auth.getSession();
      if (error) throw error;
      memberAuthSession = data.session || null;
    }
    if (!memberAuthSession && returningToMemberPass && getActiveMemberAuthPending()?.step === "confirm") {
      memberAuthStatus = "confirm-sent";
    } else {
      memberAuthStatus = memberAuthSession ? "signed-in" : "guest";
    }

    memberAuthClient.auth.onAuthStateChange((_event, session) => {
      memberAuthSession = session || null;
      memberAuthStatus = memberAuthSession ? "signed-in" : "guest";
      renderMemberPass();
      if (memberAuthSession) {
        removeStoredJson(memberAuthPendingStorageKey);
        syncMemberRewards("Signed in. Your stickers, badges, cards, and quiz progress are connected to your Clubhouse Pass.").catch((syncError) => {
          renderMemberPass(`Signed in, but sync needs attention: ${syncError.message || "try again."}`);
        });
      }
    });

    renderMemberPass();
    if (memberAuthSession) {
      removeStoredJson(memberAuthPendingStorageKey);
      await syncMemberRewards("Signed in. Your stickers, badges, cards, and quiz progress are connected to your Clubhouse Pass.");
      if (returningToMemberPass) {
        renderMemberPass("Clubhouse Pass opened. Taking you to your lAIdies Card next.");
        openMemberCardBuilder(450);
        return;
      }
      moveToMemberPassAfterAuth({ cleanUrl: true, delay: 300 });
    } else if (returningToMemberPass) {
      moveToMemberPassAfterAuth({ cleanUrl: false, delay: 300 });
    }
  } catch (error) {
    memberAuthClient = null;
    memberAuthStatus = "guest";
    renderMemberPass(`Clubhouse Pass login needs attention: ${error.message || "check the Supabase settings."}`);
  }
}

saveMemberPassButton?.addEventListener("click", async () => {
  const email = memberPassEmail?.value.trim();
  if (!email || !email.includes("@")) {
    renderMemberPass("Add an email first so we know where to send the Clubhouse Pass email.");
    memberPassEmail?.focus();
    return;
  }
  const normalizedEmail = normalizeMemberEmail(email);
  const pendingAuth = getActiveMemberAuthPending(normalizedEmail);
  if (pendingAuth?.step) {
    renderMemberPass("We already requested a Clubhouse Pass email. Check the newest Clubhouse Pass email before requesting another one.");
    return;
  }

  saveMemberPass({
    email,
    profile: getSelectedMemberProfile(),
    newsletterOptIn: Boolean(memberPassNewsletter?.checked),
    savedAt: new Date().toISOString(),
    mode: memberAuthConfigured ? "magic-link" : "same-browser",
  });

  if (!memberAuthConfigured || !memberAuthClient) {
    renderMemberPass(memberPassNewsletter?.checked ? "Guest pass ready. The standalone newsletter form below is still the live email-only signup until login is configured." : "Guest pass ready. Open Clubhouse Pass to pin rewards to your member card.");
    return;
  }

  if (memberAuthSession?.user) {
    try {
      await syncMemberRewards("Clubhouse Pass opened. Taking you to your lAIdies Card next.");
      submitNewsletterOptIn(email);
      openMemberCardBuilder(150);
    } catch (error) {
      renderMemberPass(`Sync needs attention: ${error.message || "try again."}`);
    }
    return;
  }

  try {
    memberAuthStatus = "loading";
    renderMemberPass("Sending account email...");
    saveMemberPassButton.disabled = true;
    const { error } = await memberAuthClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getMemberRedirectUrl(),
        shouldCreateUser: true,
      },
    });
    if (error) throw error;
    memberAuthStatus = "link-sent";
    rememberMemberAuthReturn(email, "login");
    renderMemberPass("Clubhouse Pass email sent. Open the newest Clubhouse Pass email from this same browser or computer.");
  } catch (error) {
    memberAuthStatus = pendingAuth?.step ? "link-sent" : "guest";
    const authError = error.message || "try again.";
    const friendlyError = /rate limit/i.test(authError)
      ? "The email service is temporarily blocking repeat sends because several were requested close together. Wait a few minutes, then request only one new Clubhouse Pass email."
      : /magic link|otp|smtp|email/i.test(authError)
        ? "The Clubhouse Pass email service needs one setting fixed before it can send. Check the sender, SMTP password, and Resend API key, then try once."
        : authError;
    renderMemberPass(`Could not send account email: ${friendlyError}`);
  } finally {
    if (saveMemberPassButton) saveMemberPassButton.disabled = false;
  }
});

memberSignOutButton?.addEventListener("click", async () => {
  try {
    await memberAuthClient?.auth.signOut();
  } catch {
    // Local UI still returns to guest mode if the network is unavailable.
  }
  memberAuthSession = null;
  memberAuthStatus = "guest";
  removeStoredJson(memberAuthPendingStorageKey);
  renderMemberPass("Signed out. Sign in again to reconnect your Clubhouse Pass rewards.");
});

memberPassNewsletter?.addEventListener("change", () => {
  saveMemberPass({ newsletterOptIn: Boolean(memberPassNewsletter.checked) });
});

memberPassEmail?.addEventListener("input", () => {
  const typedEmail = normalizeMemberEmail(memberPassEmail.value || "");
  const pendingAuth = getActiveMemberAuthPending();
  if (pendingAuth?.email && typedEmail && pendingAuth.email !== typedEmail) {
    removeStoredJson(memberAuthPendingStorageKey);
    memberAuthStatus = memberAuthSession?.user ? "signed-in" : "guest";
  }
  saveMemberPass({ email: memberPassEmail.value });
  renderMemberPass();
});

memberStartFreshButton?.addEventListener("click", () => {
  resetMemberPassExperience("Reset complete. Enter an email when you are ready to test again.");
});

memberProfileButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.memberProfile;
    const wasSelected = button.classList.contains("is-selected");
    const allowsMultiple = button.closest("[data-member-profile-multiple='true']");
    if (allowsMultiple) {
      button.classList.toggle("is-selected");
    } else {
      memberProfileButtons.forEach((item) => {
        if (item.dataset.memberProfile === group) item.classList.remove("is-selected");
      });
      if (!wasSelected) button.classList.add("is-selected");
    }
    saveMemberPass({ profile: getSelectedMemberProfile() });
    renderMemberPass();
    scheduleMemberRewardSync();
    // Progressive disclosure: auto-open next profile group after selection
    if (!allowsMultiple) {
      const currentGroup = button.closest(".member-profile-group");
      const nextGroup = currentGroup?.nextElementSibling;
      if (nextGroup?.tagName === "DETAILS" && !nextGroup.open) {
        setTimeout(() => { currentGroup.open = false; nextGroup.open = true; nextGroup.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 300);
      }
    }
  });
});

renderQuizIssueControls();
renderCardPackIssueOptions();
renderCardPackBinder();
renderEpisodeIssueCards();
if (!consumeMemberPassResetUrl()) renderMemberPass();
initMemberAuth();

let activeQuizKey = quizIssueSelect?.value || Object.keys(issueQuizzes)[0] || "issue01";
let quizIsOpen = false;
let fairyWandTimer = null;
let activeGlossaryIndex = 0;
let referenceClosetOpen = false;

function setActiveJumpLink(sectionId) {
  if (!sectionId) return;
  siteJumpLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.jumpLink === sectionId);
  });
}

function initSiteJumpNav() {
  if (!siteJumpLinks.length) return;
  siteJumpLinks.forEach((link) => {
    link.addEventListener("click", () => setActiveJumpLink(link.dataset.jumpLink));
  });

  const trackedSections = Array.from(siteJumpLinks)
    .map((link) => document.getElementById(link.dataset.jumpLink))
    .filter(Boolean)
    .sort((a, b) => a.offsetTop - b.offsetTop);
  let jumpNavTicking = false;

  const updateActiveJumpLink = () => {
    jumpNavTicking = false;
    const scrollPosition = window.scrollY + Math.min(260, window.innerHeight * 0.36);
    const bottomReached = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
    if (bottomReached && document.getElementById("site-end")) {
      setActiveJumpLink("site-end");
      return;
    }

    const activeSection = trackedSections
      .filter((section) => section.offsetTop <= scrollPosition)
      .at(-1);
    setActiveJumpLink(activeSection?.id || "top");
  };

  const requestJumpNavUpdate = () => {
    if (jumpNavTicking) return;
    jumpNavTicking = true;
    window.requestAnimationFrame(updateActiveJumpLink);
  };

  window.addEventListener("scroll", requestJumpNavUpdate, { passive: true });
  window.addEventListener("resize", requestJumpNavUpdate);
  updateActiveJumpLink();
}

initSiteJumpNav();

function getGamePanelIdFromHash() {
  return window.location.hash ? window.location.hash.replace("#", "") : "";
}

function syncGamePanelTriggers(activePanelId) {
  gamePanelTriggers.forEach((trigger) => {
    const isActive = trigger.dataset.openGamePanel === activePanelId;
    trigger.setAttribute("aria-expanded", String(isActive));
  });
}

function installGamePanelClose(panel) {
  if (panel.querySelector(".game-panel-close")) return;
  const closeButton = document.createElement("button");
  closeButton.className = "game-panel-close";
  closeButton.type = "button";
  closeButton.textContent = "Close this";
  closeButton.addEventListener("click", () => {
    panel.classList.remove("is-open");
    syncGamePanelTriggers("");
    if (window.location.hash === `#${panel.id}`) {
      window.history.replaceState(null, "", "#fun-games");
    }
    document.querySelector("#fun-games")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  panel.prepend(closeButton);
}

function setupGamePanelDock() {
  if (!gamePanelDock) return;
  gamePanels.forEach((panel) => {
    installGamePanelClose(panel);
    gamePanelDock.append(panel);
  });
}

function openGamePanel(panelId, options = {}) {
  const panel = document.getElementById(panelId);
  if (!panel || !panel.matches("[data-game-panel]")) return false;
  revealClubhouseForPanel(panelId);
  gamePanels.forEach((item) => {
    item.classList.toggle("is-open", item === panel);
  });
  syncGamePanelTriggers(panelId);
  if (options.updateHash !== false && window.location.hash !== `#${panelId}`) {
    window.history.pushState(null, "", `#${panelId}`);
  }
  if (options.scroll !== false) {
    (gamePanelDock || panel).scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}

window.openGamePanel = openGamePanel;

setupGamePanelDock();

const clubhouseZoneMessages = {
  "weekly-fun-pack": "<strong>Weekly Fun Packs:</strong> Open the issue pack shelf for the current released activities.",
  "fun-pack-1-6": "<strong>Fun Packs 1-6:</strong> Issues 1 and 2 are available now. More shelf space opens as the season drops.",
  "fun-pack-7-12": "<strong>Fun Packs 7-12:</strong> Reserved for future weekly packs once those issues exist.",
  "fun-pack-13-18": "<strong>Fun Packs 13-18:</strong> Reserved for later archive browsing.",
  "fun-pack-19-24": "<strong>Fun Packs 19-24:</strong> Reserved for the full-season archive.",
  "weekly-jams": "<strong>Weekly Jams:</strong> DJ JAIDY's weekly AI song lives beside the issue packs.",
  "mix-cds": "<strong>Mix CDs:</strong> Open the DJ Booth for playlists, mix CDs, and weekly track slots.",
  psychic: "<strong>Call Psychic Hotline:</strong> Jump to Madame CLAI-O for the crystal-phone reading.",
  "dream-phone": "<strong>Call Dream Phone:</strong> Open the Dream Phone nook and dial a card.",
  "girl-talk": "<strong>Open Girl Talk:</strong> Draw a prompt card from the Girl Talk board.",
  "try-on": "<strong>5min Try-On:</strong> Open the Power Suit Playbook for quick practice prompts.",
  business: "<strong>Businesswomen's Special:</strong> Jump to the paper fortune teller drink picker.",
  fairy: "<strong>Ask fAIry Godmother:</strong> Open LAIDY's advice console.",
};

const clubhouseRevealSelectorsByZone = {
  "weekly-fun-pack": ['[data-clubhouse-layer~="top"]'],
  "fun-pack-1-6": ['[data-clubhouse-layer~="top"]'],
  "fun-pack-7-12": ['[data-clubhouse-layer~="top"]'],
  "fun-pack-13-18": ['[data-clubhouse-layer~="top"]'],
  "fun-pack-19-24": ['[data-clubhouse-layer~="top"]'],
  "weekly-jams": [".games-group-heading--dj", ".house-dj-game"],
  "mix-cds": [".games-group-heading--dj", ".house-dj-game"],
  psychic: ["#madame-claio"],
  "dream-phone": [".dream-phone-game"],
  "girl-talk": [".girl-talk-game"],
  "try-on": [".try-on-game"],
  business: [".cocktail-wheel-game"],
  fairy: [".fairy-game"],
};

const clubhouseRevealSelectorsByPanel = {
  "card-pack": ['[data-clubhouse-layer~="top"]'],
  quiz: ['[data-clubhouse-layer~="top"]'],
  playbook: [".try-on-game"],
  playlist: [".games-group-heading--dj", ".house-dj-game"],
  laidy: [".fairy-game"],
  challenge: [".signoff-game"],
};

const clubhouseRevealSelectorsByHash = {
  "issue-fun-packs": ['[data-clubhouse-layer~="top"]'],
  "madame-claio": ["#madame-claio"],
  "dreamPhoneToggle": [".dream-phone-game"],
  "cocktailWheel": [".cocktail-wheel-game"],
  "dj-booth-section": [".house-dj-game", ".games-group-heading--dj"],
  "girlTalkButton": [".girl-talk-game"],
  "member-passport": [],
  clubhouse: [],
  "fun-games": [],
};

function revealClubhouseSelectors(selectors = []) {
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => item.classList.add("is-clubhouse-revealed"));
  });
}

function revealClubhouseZone(zone) {
  revealClubhouseSelectors(clubhouseRevealSelectorsByZone[zone] || []);
}

function revealClubhouseForPanel(panelId) {
  revealClubhouseSelectors(clubhouseRevealSelectorsByPanel[panelId] || []);
}

function revealClubhouseForHash(hashId) {
  if (!hashId) return false;
  if (clubhouseRevealSelectorsByPanel[hashId]) {
    revealClubhouseForPanel(hashId);
    return true;
  }
  const selectors = clubhouseRevealSelectorsByHash[hashId];
  if (!selectors) return false;
  revealClubhouseSelectors(selectors);
  return selectors.length > 0;
}

function getClubhouseLayerScrollTarget(layer) {
  if (layer === "bottom") {
    return document.querySelector(".games-group-heading--dj") || document.querySelector('[data-clubhouse-layer~="bottom"]');
  }
  return document.querySelector("#issue-fun-packs") || document.querySelector('[data-clubhouse-layer~="top"]');
}

function revealClubhouseLayer(layer, { scroll = true } = {}) {
  if (!layer) return;
  const layersToOpen = layer === "all" ? ["top", "bottom"] : [layer];
  setClubhouseState("open");
  clubhouseRevealables.forEach((item) => {
    const layers = (item.dataset.clubhouseLayer || "").split(/\s+/);
    if (layersToOpen.some((itemLayer) => layers.includes(itemLayer))) item.classList.add("is-clubhouse-revealed");
  });
  if (clubhouseStatus) {
    const statusMessages = {
      top: "<strong>Weekly fun and games open:</strong> Weekly Fun Packs and DJ JAIDY's Weekly Jams are available below.",
      bottom: "<strong>Always-open fun and games open:</strong> Clubhouse classics are available below. The weekly shelf can stay open too.",
      all: "<strong>All fun and games open:</strong> Weekly drops and always-open Clubhouse classics are available below.",
    };
    clubhouseStatus.innerHTML = statusMessages[layer] || statusMessages.all;
  }
  if (scroll) {
    const scrollTarget = getClubhouseLayerScrollTarget(layer);
    window.requestAnimationFrame(() => scrollTarget?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

function setClubhouseState(state) {
  if (!clubhouseCompact) return;
  clubhouseCompact.dataset.state = state;
  clubhouseStateButtons.forEach((button) => {
    const isActive = button.dataset.clubhouseStateButton === state;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  clubhouseStateImages.forEach((image) => {
    image.hidden = image.dataset.clubhouseImage !== state;
  });
  if (clubhouseStatus) {
    clubhouseStatus.innerHTML =
      state === "closed"
        ? "<strong>Closed compact:</strong> Open the pink Clubhouse to pick a weekly pack or permanent room fixture."
        : "<strong>Open Clubhouse:</strong> Pick a shelf, sticker, or room fixture to open the matching activity.";
  }
}

function setActiveClubhouseZone(zone, { reveal = false } = {}) {
  if (!zone) return;
  setClubhouseState("open");
  if (reveal) revealClubhouseZone(zone);
  clubhouseZoneButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.clubhouseZone === zone));
  clubhouseStickerButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.clubhouseSticker === zone));
  if (clubhouseStatus && clubhouseZoneMessages[zone]) clubhouseStatus.innerHTML = clubhouseZoneMessages[zone];
}

function scrollToClubhouseTarget(target) {
  if (!target) return false;
  const targetEl = document.querySelector(target);
  if (!targetEl) return false;
  targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function handleClubhouseRoute(button, event) {
  const zone = button.dataset.clubhouseZone || button.dataset.clubhouseSticker;
  setActiveClubhouseZone(zone, { reveal: true });

  const panelId = button.dataset.openGamePanel;
  if (panelId) {
    event.preventDefault();
    event.stopImmediatePropagation();
    openGamePanel(panelId);
    return;
  }

  if (zone === "weekly-fun-pack" || zone === "fun-pack-1-6") {
    loadIssueFunPack("issue02", { shouldScroll: true });
    return;
  }

  if (button.dataset.clubhouseAction === "dream-phone" && !document.querySelector(".dream-phone-game")?.classList.contains("is-expanded")) {
    setTimeout(() => dreamPhoneToggle?.click(), 60);
    return;
  }

  if (zone === "psychic") {
    scrollToClubhouseTarget(button.dataset.clubhouseTarget);
    setTimeout(() => document.getElementById("fortuneButton")?.click(), 120);
    return;
  }

  if (zone === "business") {
    scrollToClubhouseTarget(button.dataset.clubhouseTarget);
    return;
  }

  scrollToClubhouseTarget(button.dataset.clubhouseTarget);
}

clubhouseStateButtons.forEach((button) => {
  button.addEventListener("click", () => setClubhouseState(button.dataset.clubhouseStateButton || "closed"));
});

clubhouseLayerButtons.forEach((button) => {
  button.addEventListener("click", () => revealClubhouseLayer(button.dataset.clubhouseOpenLayer));
});

[...clubhouseZoneButtons, ...clubhouseStickerButtons].forEach((button) => {
  button.addEventListener("mouseenter", () => setActiveClubhouseZone(button.dataset.clubhouseZone || button.dataset.clubhouseSticker));
  button.addEventListener("focus", () => setActiveClubhouseZone(button.dataset.clubhouseZone || button.dataset.clubhouseSticker));
  button.addEventListener("click", (event) => handleClubhouseRoute(button, event));
});

gamePanelTriggers.forEach((trigger) => {
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", (event) => {
    const panelId = trigger.dataset.openGamePanel;
    if (!panelId) return;
    event.preventDefault();
    if (panelId === "quiz" && trigger.dataset.quizOpen) {
      openQuizIssue(trigger.dataset.quizOpen);
    }
    if (panelId === "card-pack" && trigger.dataset.cardPackOpen && cardPackIssueSelect) {
      const targetOption = Array.from(cardPackIssueSelect.options).find((option) => option.value === trigger.dataset.cardPackOpen);
      if (targetOption) {
        cardPackIssueSelect.value = trigger.dataset.cardPackOpen;
        if (cardPackStatus) {
          cardPackStatus.textContent = `${targetOption.textContent} selected. Open a pack when you are ready for wrapper drama.`;
        }
      }
    }
    openGamePanel(panelId);
  });
});

function openGamePanelFromHash() {
  const panelId = getGamePanelIdFromHash();
  if (!panelId) return;
  const revealed = revealClubhouseForHash(panelId);
  const opened = openGamePanel(panelId, { updateHash: false, scroll: true });
  if (opened) setActiveJumpLink("fun-games");
  if (!opened && revealed) {
    document.getElementById(panelId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveJumpLink("fun-games");
  }
}

window.addEventListener("hashchange", openGamePanelFromHash);
openGamePanelFromHash();

function nextIndex(length, current) {
  if (length < 2) return 0;
  let index = current;
  while (index === current) {
    index = Math.floor(Math.random() * length);
  }
  return index;
}

quoteButton?.addEventListener("click", () => {
  lastQuoteIndex = nextIndex(rememberQuotes.length, lastQuoteIndex);
  quoteEl.textContent = rememberQuotes[lastQuoteIndex];
  copyStatus.textContent = "Fresh sign-off. Very businesswomen's special.";
});

copyButton?.addEventListener("click", async () => {
  const text = `Remember, lAIdies: ${quoteEl.textContent}`;
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Copied. Send it, improve it, make Dolly proud.";
  } catch {
    copyStatus.textContent = "Copy blocked by the browser. Highlight it like it is 2003.";
  }
});

function shuffleTryOnIdea() {
  lastPromptIndex = nextIndex(tryOnChallenges.length, lastPromptIndex);
  promptEl.textContent = tryOnChallenges[lastPromptIndex];
  tryOnShufflesThisSession += 1;
  const unlockMessage = tryOnShufflesThisSession >= 5 ? unlockSecretBadge("try-on-regular", "Five-Minute Try-On") : "";
  if (unlockMessage && promptContext) {
    promptContext.textContent = unlockMessage;
  }
}

window.shuffleTryOnIdea = shuffleTryOnIdea;

function renderFortuneOutput(card) {
  if (!fortuneOutput) return;
  const lines = [
    ["Madame CLAI-O's Reading", ""],
    ["Your card is:", card.card],
    ["Reading:", card.read],
    ["Message:", card.message],
    ["Next move:", card.move],
  ];

  fortuneOutput.replaceChildren();
  lines.forEach(([label, text]) => {
    const line = document.createElement("span");
    line.className = "fortune-line";
    if (!text) line.classList.add("fortune-line--heading");

    const labelEl = document.createElement("strong");
    labelEl.className = "fortune-label";
    labelEl.textContent = label;

    const textEl = document.createElement("span");
    textEl.textContent = text ? ` ${text}` : "";

    line.append(labelEl, textEl);
    fortuneOutput.append(line, document.createTextNode("\n"));
  });
}

fortuneButton?.addEventListener("click", () => {
  lastFortuneIndex = nextIndex(fortuneCards.length, lastFortuneIndex);
  const next = fortuneCards[lastFortuneIndex];
  renderFortuneOutput(next);
  madameClaioCallsThisSession += 1;
  const unlockMessage = madameClaioCallsThisSession >= 5 ? unlockSecretBadge("hotline-regular", "Madame CLAI-O") : "";
  if (unlockMessage && fortuneOutput) {
    const line = document.createElement("span");
    line.className = "fortune-line fortune-line--unlock";
    const labelEl = document.createElement("strong");
    labelEl.className = "fortune-label";
    labelEl.textContent = "Merit badge:";
    const textEl = document.createElement("span");
    textEl.textContent = ` ${unlockMessage}`;
    line.append(labelEl, textEl);
    fortuneOutput.append(document.createTextNode("\n"), line);
  }
});

function getCocktailTypeLabel(type) {
  return type === "spiritFree" ? "Ghostbusters" : "Summon Spirits";
}

function renderCocktailWheels() {
  syncCocktailFortuneMode(activeCocktailType);
}

function syncCocktailFortuneMode(type = "cocktail") {
  activeCocktailType = cocktailMenus[type] ? type : "cocktail";
  cocktailSpinButton?.classList.toggle("is-selected", activeCocktailType === "cocktail");
  spiritFreeSpinButton?.classList.toggle("is-selected", activeCocktailType === "spiritFree");
  if (cocktailFortuneMode) cocktailFortuneMode.textContent = getCocktailTypeLabel(activeCocktailType);
  cocktailFortune?.dataset && (cocktailFortune.dataset.cocktailType = activeCocktailType);
}

function selectCocktailType(type = "cocktail") {
  syncCocktailFortuneMode(type);
  setCocktailFortuneState("closed");
  if (cocktailFortuneImage?.dataset.closedSrc) cocktailFortuneImage.src = cocktailFortuneImage.dataset.closedSrc;
  cocktailWheel?.classList.remove("has-reveal", "is-counting");
  if (cocktailFortuneNumber) cocktailFortuneNumber.textContent = "01";
  if (cocktailFortuneDrink) cocktailFortuneDrink.textContent = "Pick a mood";
  if (!cocktailOutput) return;
  cocktailOutput.replaceChildren();

  const title = document.createElement("strong");
  title.textContent = `${getCocktailTypeLabel(activeCocktailType)} selected.`;

  const prompt = document.createElement("span");
  prompt.textContent = "Pick Bubble, Citrus, Classic, or After Dark to match the drink to the mood.";

  const order = document.createElement("em");
  order.textContent = "Order: pending.";

  const note = document.createElement("span");
  note.textContent = "The fold has the final say.";

  cocktailOutput.append(title, prompt, order, note);
}

function setCocktailFortuneState(state, flapIndex = -1) {
  if (!cocktailFortune) return;
  cocktailFortune.dataset.fortuneState = state;
  cocktailFortuneFlapButtons.forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.cocktailFlap) === flapIndex);
  });
}

function getCocktailFortuneIndex(type, flapIndex) {
  const menu = cocktailMenus[type] || cocktailMenus.cocktail;
  const state = cocktailSpinState[type] || cocktailSpinState.cocktail;
  if (menu.length < 2) return 0;
  const flap = cocktailFortuneFlaps[flapIndex] || cocktailFortuneFlaps[0];
  const options = flap.drinks?.[type] || menu.map((_, index) => index);
  if (!options.length) return nextIndex(menu.length, state.lastIndex);
  let index = options[Math.floor(Math.random() * options.length)];
  if (index === state.lastIndex && options.length > 1) {
    let attempts = 0;
    while (index === state.lastIndex && attempts < 10) {
      index = options[Math.floor(Math.random() * options.length)];
      attempts++;
    }
  }
  return index;
}

function syncCocktailWheelSelection(type) {
  const state = cocktailSpinState[type] || cocktailSpinState.cocktail;
  const menu = cocktailMenus[type] || cocktailMenus.cocktail;
  const drink = menu[state.lastIndex];
  if (!drink) return;
  if (cocktailFortuneNumber) cocktailFortuneNumber.textContent = String(state.lastIndex + 1).padStart(2, "0");
  if (cocktailFortuneDrink) cocktailFortuneDrink.textContent = drink.name;
}

function renderCocktailOutput(drink, index, flapIndex = -1) {
  if (!cocktailOutput || !drink) return;
  const flap = cocktailFortuneFlaps[flapIndex];

  cocktailOutput.replaceChildren();

  const title = document.createElement("strong");
  title.textContent = `${index + 1}. ${drink.name}`;

  const vibe = document.createElement("span");
  vibe.textContent = flap ? `${flap.label}: ${flap.description}. ${drink.vibe}` : drink.vibe;

  const order = document.createElement("em");
  order.textContent = `Order: ${drink.order}`;

  const note = document.createElement("span");
  note.textContent = drink.note;

  cocktailOutput.append(title, vibe, order, note);
}

function spinCocktail(type = activeCocktailType, flapIndex = -1) {
  const menu = cocktailMenus[type] || cocktailMenus.cocktail;
  const state = cocktailSpinState[type] || cocktailSpinState.cocktail;
  const selectedFlap = flapIndex >= 0 ? flapIndex : Math.floor(Math.random() * cocktailFortuneFlaps.length);
  syncCocktailFortuneMode(type);
  setCocktailFortuneState("counting", selectedFlap);
  if (cocktailFortuneImage?.dataset.closedSrc) cocktailFortuneImage.src = cocktailFortuneImage.dataset.closedSrc;
  cocktailWheel?.classList.remove("has-reveal");
  cocktailWheel?.classList.add("is-counting");
  state.lastIndex = flapIndex >= 0 ? getCocktailFortuneIndex(activeCocktailType, selectedFlap) : nextIndex(menu.length, state.lastIndex);
  const next = menu[state.lastIndex];
  state.turns += 1;
  window.setTimeout(() => {
    if (cocktailFortuneImage?.dataset.openSrc) cocktailFortuneImage.src = cocktailFortuneImage.dataset.openSrc;
    cocktailWheel?.classList.remove("is-counting");
    cocktailWheel?.classList.add("has-reveal");
    setCocktailFortuneState("open", selectedFlap);
    syncCocktailWheelSelection(activeCocktailType);
    renderCocktailOutput(next, state.lastIndex, selectedFlap);
  }, 520);
}

window.spinCocktail = spinCocktail;
if (cocktailSpinButton) {
  cocktailSpinButton.onclick = () => selectCocktailType("cocktail");
}
if (spiritFreeSpinButton) {
  spiritFreeSpinButton.onclick = () => selectCocktailType("spiritFree");
}
cocktailFortuneFlapButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const flapIndex = Number(button.dataset.cocktailFlap || 0);
    cocktailFortuneFlapsUsed.add(flapIndex);
    spinCocktail(activeCocktailType, flapIndex);
    const unlockMessage = cocktailFortuneFlapsUsed.size >= cocktailFortuneFlaps.length
      ? unlockSecretBadge("coven-reservation", "Businesswomen's Special")
      : "";
    if (unlockMessage && cocktailOutput) {
      window.setTimeout(() => {
        const badgeLine = document.createElement("span");
        badgeLine.textContent = `Merit badge: ${unlockMessage}`;
        cocktailOutput.append(badgeLine);
      }, 560);
    }
  });
});

girlTalkButton?.addEventListener("click", () => {
  lastGirlTalkIndex = nextIndex(girlTalkCards.length, lastGirlTalkIndex);
  girlTalkDrawsThisSession += 1;
  const unlockMessage = girlTalkDrawsThisSession >= 5 ? unlockSecretBadge("group-chat-regular", "Girl Talk") : "";
  girlTalkOutput.textContent = `${girlTalkCards[lastGirlTalkIndex]}${unlockMessage ? `\n\nMerit badge: ${unlockMessage}` : ""}`;
});

function openLaidyConsole() {
  openGamePanel("laidy");
}

function resetFairyWand() {
  window.clearTimeout(fairyWandTimer);
  fairyWandTimer = null;
  fairyWandLink?.classList.remove("is-waving");
  fairyWandLink?.style.setProperty("--wand-x", "0px");
  fairyWandLink?.style.setProperty("--wand-y", "0px");
  fairyWandLink?.style.setProperty("--wand-tilt", "-3deg");
}

fairyWandLink?.addEventListener("pointermove", (event) => {
  const rect = fairyWandLink.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
  fairyWandLink.style.setProperty("--wand-x", `${x.toFixed(1)}px`);
  fairyWandLink.style.setProperty("--wand-y", `${y.toFixed(1)}px`);
  fairyWandLink.style.setProperty("--wand-tilt", `${(-3 + x * 0.45).toFixed(1)}deg`);
});

fairyWandLink?.addEventListener("pointerenter", (event) => {
  fairyWandLink.classList.add("is-waving");
});

fairyWandLink?.addEventListener("pointerleave", resetFairyWand);

fairyWandLink?.addEventListener("pointerdown", (event) => {
  fairyWandLink.classList.add("is-waving");
});

fairyWandLink?.addEventListener("click", (event) => {
  event.preventDefault();
  openLaidyConsole();
});

function normalizeDreamPhoneNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatDreamPhoneNumber(value) {
  const digits = normalizeDreamPhoneNumber(value).slice(0, 7);
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
}

function setDreamPhoneNumber(value) {
  if (!dreamPhoneNumber) return "";
  const formatted = formatDreamPhoneNumber(value);
  dreamPhoneNumber.value = formatted;
  return formatted;
}

function setDreamPhoneCard(pick) {
  dreamPhoneCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.dreamPick === pick);
  });
}

function setDreamPhoneSpecial(special) {
  activeDreamPhoneSpecial = dreamPhoneSpecials[special] ? special : "";
  dreamPhoneSpecialCards.forEach((card) => {
    card.classList.toggle("is-selected", Boolean(activeDreamPhoneSpecial) && card.dataset.dreamSpecial === activeDreamPhoneSpecial);
  });
}

function getDreamPhoneBaseAnswer(pick) {
  const caller = dreamPhoneCallers[pick] || dreamPhoneCallers.mentor;
  const bank = dreamPhoneMatches[caller.type] || dreamPhoneMatches.career;
  lastDreamPhoneIndexes[pick] = nextIndex(bank.answers.length, lastDreamPhoneIndexes[pick] ?? -1);
  return `${caller.friend} | ${bank.answers[lastDreamPhoneIndexes[pick]]}`;
}

function getDreamPhoneAnswer(pick) {
  lastDreamPhonePick = pick;
  lastDreamPhoneBaseAnswer = getDreamPhoneBaseAnswer(pick);
  setDreamPhoneSpecial("");
  return lastDreamPhoneBaseAnswer;
}

function getSecretBadges() {
  return getStoredJson(secretBadgeStorageKey, {});
}

function storeSecretBadges(badges) {
  setStoredJson(secretBadgeStorageKey, badges);
}

function renderSecretBadges() {
  const badges = getSecretBadges();

  if (dreamPhoneSecretBadge) {
    dreamPhoneSecretBadge.hidden = !badges["867-club"];
    dreamPhoneSecretBadge.classList.toggle("is-unlocked", Boolean(badges["867-club"]));
  }

  if (!secretBadgeShelf) return;
  secretBadgeShelf.replaceChildren();
  Object.values(hiddenMeritBadges).forEach((badge) => {
    const earned = badges[badge.id];
    const item = document.createElement("article");
    item.className = "secret-badge-tile";
    item.classList.toggle("is-earned", Boolean(earned));
    item.classList.toggle("is-locked", !earned);

    const sticker = document.createElement("span");
    sticker.textContent = earned ? badge.sticker : "?";

    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = badge.title;
    const detail = document.createElement("em");
    detail.textContent = earned
      ? `${badge.source} | earned ${new Date(earned.unlockedAt || Date.now()).toLocaleDateString()}`
      : `Locked | ${badge.source}`;

    copy.append(title, detail);
    item.append(sticker, copy);
    secretBadgeShelf.append(item);
  });
}

function renderQuizStickerShelf() {
  if (!quizStickerShelf) return;
  const progress = getQuizProgressRecords();
  const earnedByTier = new Map();
  Object.values(progress).forEach((record) => {
    if (!record?.stickerTier) return;
    earnedByTier.set(record.stickerTier, record);
  });

  quizStickerShelf.replaceChildren();
  quizStickerAwards.forEach((award) => {
    const earned = earnedByTier.get(award.id);
    const item = document.createElement("article");
    item.className = "secret-badge-tile quiz-sticker-tile";
    item.classList.toggle("is-earned", Boolean(earned));
    item.classList.toggle("is-locked", !earned);

    const sticker = document.createElement("span");
    sticker.textContent = earned ? award.sticker : "?";

    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = award.title;
    const detail = document.createElement("em");
    detail.textContent = earned
      ? `${award.source} | earned ${formatQuizProgressDate(earned.completedAt) || "recently"}`
      : `Locked | ${award.source}`;

    copy.append(title, detail);
    item.append(sticker, copy);
    quizStickerShelf.append(item);
  });
}

function renderDreamPhoneSecretBadge() {
  renderSecretBadges();
  renderQuizStickerShelf();
}

function unlockSecretBadge(badgeId, sourceOverride = "") {
  const badge = hiddenMeritBadges[badgeId];
  if (!badge) return "";

  const badges = getSecretBadges();
  if (badges[badge.id]) return "";

  badges[badge.id] = {
    id: badge.id,
    title: badge.title,
    sticker: badge.sticker,
    unlockedAt: new Date().toISOString(),
    source: sourceOverride || badge.source,
  };
  storeSecretBadges(badges);
  renderSecretBadges();
  scheduleMemberRewardSync();
  return badge.unlockMessage;
}

const communityChatRooms = {
  "ask-the-room": "Ask the Room",
  "send-it-energy": "Send It Energy",
  "try-on-debrief": "The Try-On Debrief",
  wins: "Wins of the Week",
  "dear-laidies": "Dear lAIdies",
  "burn-book": "Put It in the Burn Book",
  "mix-cd-exchange": "Mix CD Exchange",
};

const communityRoomAliases = {
  "Ask the Room": "ask-the-room",
  "Send It Energy": "send-it-energy",
  "The Try-On Debrief": "try-on-debrief",
  "Wins of the Week": "wins",
  "Dear lAIdies": "dear-laidies",
  "Put It in the Burn Book": "burn-book",
  "Mix CD Exchange": "mix-cd-exchange",
};

function normalizeCommunityRoomId(room) {
  if (!room) return "";
  const direct = String(room).trim();
  if (communityChatRooms[direct]) return direct;
  if (communityRoomAliases[direct]) return communityRoomAliases[direct];
  return direct
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCommunityRoomPosts() {
  return getStoredJson(communityRoomPostStorageKey, {});
}

function storeCommunityRoomPosts(posts) {
  setStoredJson(communityRoomPostStorageKey, posts);
}

function trackCommunityRoomPost(room) {
  const roomId = normalizeCommunityRoomId(room);
  if (!communityChatRooms[roomId]) return "";

  const posts = getCommunityRoomPosts();
  posts[roomId] = posts[roomId] || {
    roomId,
    roomName: communityChatRooms[roomId],
    firstPostedAt: new Date().toISOString(),
  };
  storeCommunityRoomPosts(posts);

  const messages = [];
  const firstRoomMessage = unlockSecretBadge("room-first-post", communityChatRooms[roomId]);
  if (firstRoomMessage) messages.push(firstRoomMessage);

  const postedRoomCount = Object.keys(communityChatRooms).filter((id) => posts[id]).length;
  if (postedRoomCount === Object.keys(communityChatRooms).length) {
    const allRoomsMessage = unlockSecretBadge("room-tour", "All Chat Rooms");
    if (allRoomsMessage) messages.push(allRoomsMessage);
  }

  return messages.join(" ");
}

function unlockDreamPhoneSecretBadge(dialedNumber) {
  const badge = dreamPhoneSecretBadges[dialedNumber];
  if (!badge) return "";

  unlockSecretBadge(badge.id, "Dream Phone");
  setDreamPhoneSpecial("");
  setDreamPhoneCard("");
  lastDreamPhonePick = "secret-badge";
  lastDreamPhoneBaseAnswer = badge.baseMessage;
  return badge.baseMessage;
}

function getDreamPhoneRemix(specialKey) {
  if (lastDreamPhonePick === "secret-badge" && lastDreamPhoneBaseAnswer) {
    const badge = dreamPhoneSecretBadges[8675309];
    const remix = badge?.remix?.[specialKey];
    if (!remix) return lastDreamPhoneBaseAnswer;
    const special = dreamPhoneSpecials[specialKey];
    return `${special.prefix} ${lastDreamPhoneBaseAnswer}\n${remix}`;
  }

  if (!lastDreamPhoneBaseAnswer) return "";
  const special = dreamPhoneSpecials[specialKey];
  if (!special) return lastDreamPhoneBaseAnswer;
  const callerSpecial = dreamPhoneSpecialByCaller[lastDreamPhonePick]?.[specialKey] || special.extra;
  return `${special.prefix} ${lastDreamPhoneBaseAnswer}\n${callerSpecial}`;
}

dreamPhoneButton?.addEventListener("click", () => {
  const dialedNumber = normalizeDreamPhoneNumber(dreamPhoneNumber?.value);
  const secretBadgeMessage = unlockDreamPhoneSecretBadge(dialedNumber);
  if (secretBadgeMessage) {
    dreamPhoneOutput.textContent = secretBadgeMessage;
    return;
  }

  const pick = dreamPhoneNumbers[dialedNumber];

  if (!dialedNumber) {
    dreamPhoneOutput.textContent = "Dial the number on a caller card. The phone is cute, but it is not psychic.";
    return;
  }

  if (!pick) {
    dreamPhoneOutput.textContent = "Busy signal. That number is not in this Dream Phone deck.";
    return;
  }

  setDreamPhoneCard(pick);
  dreamPhoneOutput.textContent = getDreamPhoneAnswer(pick);
});

dreamPhoneToggle?.addEventListener("click", () => {
  const isOpen = !dreamPhoneGameCard?.classList.contains("is-expanded");
  dreamPhoneGameCard?.classList.toggle("is-expanded", isOpen);
  dreamPhoneToggle.setAttribute("aria-expanded", String(isOpen));
  dreamPhoneToggle.textContent = isOpen ? "Close Dream Phone" : "Open Dream Phone";
  if (isOpen) {
    dreamPhoneGameCard?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => dreamPhoneNumber?.focus(), 260);
  } else {
    document.querySelector(".games-group-heading--permanent")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

function loadIssueFunPack(issueKey, { shouldScroll = false } = {}) {
  const meta = issueFunPackMeta[issueKey] || issueFunPackMeta.issue01;
  const availableActivities = Array.from(funPackActivities).filter((activity) => activity.dataset.funPackIssue === issueKey);
  const hasActivities = availableActivities.length > 0;

  gamesGrid?.classList.toggle("is-issue-pack-open", hasActivities);
  funPackActivities.forEach((activity) => {
    const isActive = activity.dataset.funPackIssue === issueKey;
    activity.hidden = !isActive;
    activity.classList.toggle("is-active-pack-activity", isActive);
  });
  funPackToggles.forEach((item) => {
    const isSelected = item.dataset.funPackToggle === issueKey;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-expanded", String(isSelected && hasActivities));
  });
  if (funPackStatus) {
    funPackStatus.textContent = hasActivities ? meta.status : `${meta.label} is not available yet.`;
  }
  if (shouldScroll) {
    document.querySelector("#issue-fun-packs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

funPackToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    loadIssueFunPack(toggle.dataset.funPackToggle || "issue01", { shouldScroll: true });
  });
});

funPackLockedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const issueKey = button.dataset.funPackLocked || "issue02";
    const meta = issueFunPackMeta[issueKey] || issueFunPackMeta.issue02;
    if (funPackStatus) funPackStatus.textContent = meta.lockedStatus || `${meta.label} is not available yet.`;
  });
});

loadIssueFunPack("issue02");

dreamPhoneCards.forEach((card) => {
  card.addEventListener("click", () => {
    const number = card.dataset.dreamNumber;
    const label = card.querySelector("strong")?.textContent || "This caller";
    const pick = card.dataset.dreamPick;
    setDreamPhoneCard(pick);
    setDreamPhoneNumber(number);
    dreamPhoneOutput.textContent = `Dialed ${label} (${number}).\n${getDreamPhoneAnswer(pick)}`;
  });
});

dreamPhoneSpecialCards.forEach((card) => {
  card.addEventListener("click", () => {
    const special = card.dataset.dreamSpecial;
    if (!lastDreamPhonePick || !lastDreamPhoneBaseAnswer) {
      dreamPhoneOutput.textContent = "Call a number first. Then pull a special card if the answer needs more drama.";
      dreamPhoneNumber?.focus();
      return;
    }
    setDreamPhoneSpecial(special);
    dreamPhoneRemixCardsUsed.add(activeDreamPhoneSpecial);
    const unlockMessage = dreamPhoneRemixCardsUsed.size >= Object.keys(dreamPhoneSpecials).length
      ? unlockSecretBadge("remix-scholar", "Dream Phone")
      : "";
    dreamPhoneOutput.textContent = `${getDreamPhoneRemix(activeDreamPhoneSpecial)}${unlockMessage ? `\n\nMerit badge: ${unlockMessage}` : ""}`;
    dreamPhoneNumber?.focus();
  });
});

dreamPhoneKeypadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.dreamKey;
    const currentDigits = normalizeDreamPhoneNumber(dreamPhoneNumber?.value);
    let nextDigits = currentDigits;

    if (key === "clear") {
      nextDigits = "";
    } else if (key === "back") {
      nextDigits = currentDigits.slice(0, -1);
    } else if (/^\d$/.test(key || "")) {
      nextDigits = `${currentDigits}${key}`.slice(0, 7);
    }

    setDreamPhoneNumber(nextDigits);
    dreamPhoneNumber?.focus();

    if (dreamPhoneOutput && nextDigits.length === 7) {
      dreamPhoneOutput.textContent = "Number is in. Press Dial and prepare to overreact responsibly.";
    }
  });
});

dreamPhoneNumber?.addEventListener("input", () => {
  setDreamPhoneNumber(dreamPhoneNumber.value);
});

dreamPhoneNumber?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    dreamPhoneButton?.click();
  }
});

renderDreamPhoneSecretBadge();

copyPlaylistButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest("[data-playlist-card]");
    const title = card?.querySelector("h3")?.textContent?.trim() || "lAIdies playlist";
    const tracks = Array.from(card?.querySelectorAll("ol li") || []).map((item, index) => `${index + 1}. ${item.textContent.trim()}`);
    const text = [title, "", ...tracks].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      if (playlistStatus) playlistStatus.textContent = `Copied "${title}." Build it in Spotify, Apple Music, or wherever your headphones are already causing trouble.`;
    } catch {
      if (playlistStatus) playlistStatus.textContent = "Copy blocked by the browser. Highlight the track list like it is a LimeWire search result with better judgment.";
    }
  });
});

function getIssueSortNumber(issueKey) {
  const match = String(issueKey || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getIssueOptionLabel(issueKey, quiz) {
  if (quiz?.optionLabel) return quiz.optionLabel;
  const fallback = initialQuizIssueMeta.get(issueKey);
  if (fallback?.optionLabel) return fallback.optionLabel;
  const number = String(getIssueSortNumber(issueKey)).padStart(2, "0");
  const title = fallback?.title || quiz?.rereadLabel?.replace(/^Reread\s+/i, "") || quiz?.title || issueKey;
  return `Issue ${number}: ${title.replace(/^Issue\s+\d+:\s*/i, "")}`;
}

function getVisibleQuizIssueKeys() {
  const keys = initialQuizIssueKeys.length ? initialQuizIssueKeys : Object.keys(issueQuizzes);
  return keys
    .sort((a, b) => getIssueSortNumber(a) - getIssueSortNumber(b));
}

function getQuizLengthLabel(quiz) {
  if (!quiz?.questions?.length) return "10 questions + 2 bonus";
  const mainCount = quiz.questions.filter((question) => !question.bonus).length;
  const bonusCount = quiz.questions.filter((question) => question.bonus).length;
  return bonusCount ? `${mainCount} questions + ${bonusCount} bonus` : `${mainCount} questions`;
}

function createInlineWordmark(useBold = false) {
  const wordmark = document.createElement("span");
  wordmark.className = "wordmark";
  wordmark.setAttribute("aria-label", "lAIdies");

  const lead = document.createElement("span");
  lead.textContent = "l";
  const ai = document.createElement(useBold ? "b" : "strong");
  ai.textContent = "AI";
  const tail = document.createElement("span");
  tail.textContent = "dies";

  wordmark.append(lead, ai, tail);
  return wordmark;
}

function setBrandText(element, text) {
  if (!element) return;
  const useBold = element.tagName === "STRONG";
  const parts = String(text || "").split(/(\b(?:Laidies|lAIdies|LAIDIES)\b)/g);
  element.replaceChildren();
  parts.forEach((part) => {
    if (!part) return;
    if (/^(?:Laidies|lAIdies|LAIDIES)$/.test(part)) {
      element.append(createInlineWordmark(useBold));
    } else {
      element.append(document.createTextNode(part));
    }
  });
}

function getIssueCardTitle(issueKey, quiz) {
  return initialQuizIssueMeta.get(issueKey)?.title || getIssueOptionLabel(issueKey, quiz).replace(/^Issue\s+\d+:\s*/i, "");
}

function createQuizIssueCard(issueKey, quiz) {
  const card = document.createElement("button");
  card.className = "quiz-issue-card";
  card.type = "button";
  card.dataset.quizOpen = issueKey;

  const issueNumber = String(getIssueSortNumber(issueKey)).padStart(2, "0");
  const label = document.createElement("span");
  label.textContent = initialQuizIssueMeta.get(issueKey)?.issueLabel || `Issue ${issueNumber}`;

  const title = document.createElement("strong");
  setBrandText(title, getIssueCardTitle(issueKey, quiz));

  const length = document.createElement("em");
  length.textContent = quiz ? getQuizLengthLabel(quiz) : initialQuizIssueMeta.get(issueKey)?.length || "10 questions + 2 bonus";

  card.append(label, title, length);
  return card;
}

function renderQuizIssueOptions() {
  if (!quizIssueSelect) return;
  const previous = quizIssueSelect.value;
  quizIssueSelect.replaceChildren();
  getVisibleQuizIssueKeys()
    .forEach((issueKey) => {
      const quiz = issueQuizzes[issueKey];
      const option = document.createElement("option");
      option.value = issueKey;
      option.textContent = getIssueOptionLabel(issueKey, quiz);
      quizIssueSelect.appendChild(option);
    });
  if (previous && getVisibleQuizIssueKeys().includes(previous)) {
    quizIssueSelect.value = previous;
  }
}

function bindQuizIssueCards() {
  quizIssueCards.forEach((card) => {
    card.addEventListener("click", () => {
      openQuizIssue(card.dataset.quizOpen);
    });
  });
}

function renderQuizIssueShelf() {
  if (!quizIssueShelf) return;
  const visibleKeys = getVisibleQuizIssueKeys();
  if (!visibleKeys.length) return;
  quizIssueShelf.replaceChildren(...visibleKeys.map((issueKey) => createQuizIssueCard(issueKey, issueQuizzes[issueKey])));
  quizIssueCards = Array.from(quizIssueShelf.querySelectorAll("[data-quiz-open]"));
  bindQuizIssueCards();
}

function renderQuizIssueControls() {
  renderQuizIssueOptions();
  renderQuizIssueShelf();
}

function renderCardPackIssueOptions() {
  if (!cardPackIssueSelect || !cardPackData.cards?.length) return;
  const previous = cardPackIssueSelect.value;
  const issueKeys = Array.from(new Set(cardPackData.cards.map((card) => card.issue))).sort((a, b) => getIssueSortNumber(a) - getIssueSortNumber(b));
  cardPackIssueSelect.replaceChildren();

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All released cards";
  cardPackIssueSelect.appendChild(allOption);

  issueKeys.forEach((issueKey) => {
    const option = document.createElement("option");
    option.value = issueKey;
    option.textContent = `Issue ${String(getIssueSortNumber(issueKey)).padStart(2, "0")} pack`;
    cardPackIssueSelect.appendChild(option);
  });

  if (previous && (previous === "all" || issueKeys.includes(previous))) {
    cardPackIssueSelect.value = previous;
  }
}

function createEpisodeTradingCard(card) {
  const article = document.createElement("article");
  article.className = `episode-trading-card${card.portrait ? " has-portrait-art" : ""}`;
  article.dataset.packCard = card.id;
  article.dataset.packIssue = card.issue;
  article.dataset.packTitle = card.title;

  const inputId = `card-flip-${card.id}`;
  const input = document.createElement("input");
  input.className = "card-flip-toggle";
  input.type = "checkbox";
  input.id = inputId;
  input.setAttribute("aria-label", `Flip ${card.title}`);

  const label = document.createElement("label");
  label.className = "episode-card-inner";
  label.setAttribute("for", inputId);

  const front = document.createElement("div");
  front.className = "episode-card-face episode-card-front";
  const image = document.createElement("img");
  image.src = card.image;
  image.alt = card.alt || `${card.title} trading card`;
  const frontCopy = document.createElement("div");
  const issue = document.createElement("span");
  issue.textContent = card.issueLabel || card.issue;
  const title = document.createElement("h3");
  title.textContent = card.title;
  frontCopy.append(issue, title);
  front.append(image, frontCopy);

  const back = document.createElement("div");
  back.className = "episode-card-face episode-card-back";
  const unlock = document.createElement("span");
  unlock.textContent = "Unlock";
  const unlockTitle = document.createElement("h3");
  unlockTitle.textContent = card.unlockTitle;
  const prompt = document.createElement("p");
  prompt.textContent = card.prompt;
  const reward = document.createElement("p");
  reward.className = "card-reward";
  reward.textContent = card.reward;
  const flipHint = document.createElement("em");
  flipHint.textContent = "Tap to see front";
  back.append(unlock, unlockTitle, prompt, reward, flipHint);

  label.append(front, back);
  article.append(input, label);
  return article;
}

function renderCardPackBinder() {
  if (!cardPackRail || !cardPackData.cards?.length) return;
  cardPackRail.replaceChildren();
  cardPackData.cards.forEach((card) => cardPackRail.appendChild(createEpisodeTradingCard(card)));
  episodeTradingCards = document.querySelectorAll("[data-pack-card]");
}

function createIssueCard(episode, isFeatured) {
  const article = document.createElement("article");
  article.className = `issue-card${isFeatured ? " featured" : ""}`;
  article.dataset.generatedIssueCard = String(episode.number);

  const image = document.createElement("img");
  image.src = episode.heroImage;
  image.alt = "";

  const copy = document.createElement("div");
  const meta = document.createElement("p");
  meta.className = "issue-meta";
  meta.textContent = `Issue #${episode.number}`;

  const title = document.createElement("h3");
  title.textContent = episode.title;

  const description = document.createElement("p");
  description.textContent = episode.oneLineDescription;

  const link = document.createElement("a");
  link.href = episode.issueUrl;
  link.textContent = `Read episode ${episode.number}`;

  copy.append(meta, title, description, link);
  article.append(image, copy);
  return article;
}

function renderEpisodeIssueCards() {
  if (!issueList || !siteData.episodes?.length) return;
  const publishedEpisodes = siteData.episodes
    .filter((episode) => episode.status === "published")
    .sort((a, b) => Number(a.number) - Number(b.number));
  if (!publishedEpisodes.length) return;

  issueList.querySelectorAll(".issue-card:not(.locked)").forEach((card) => card.remove());
  const actLabel = issueList.querySelector(".act-label");
  let insertAfter = actLabel;
  const latestNumber = Math.max(...publishedEpisodes.map((episode) => Number(episode.number)));

  publishedEpisodes.forEach((episode) => {
    const card = createIssueCard(episode, Number(episode.number) === latestNumber);
    if (insertAfter?.nextSibling) {
      issueList.insertBefore(card, insertAfter.nextSibling);
    } else {
      issueList.appendChild(card);
    }
    insertAfter = card;
  });
}

function getQuizBestScores() {
  return getStoredJson(quizStorageKey, {});
}

function saveQuizBestScores(scores) {
  setStoredJson(quizStorageKey, scores);
}

function getQuizProgressRecords() {
  try {
    const stored = getStoredJson(quizProgressStorageKey, {});
    const legacyScores = getQuizBestScores();
    Object.entries(legacyScores).forEach(([issueKey, score]) => {
      if (stored[issueKey]) return;
      stored[issueKey] = {
        attempts: 0,
        latestScore: Number(score || 0),
        bestScore: Number(score || 0),
        maxScore: 10,
        bonusScore: 0,
        completedAt: "",
        stickerTitle: "",
        stickerTier: "",
      };
    });
    return stored;
  } catch {
    return {};
  }
}

function saveQuizProgressRecords(records) {
  setStoredJson(quizProgressStorageKey, records);
}

function formatQuizProgressDate(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
  } catch {
    return "";
  }
}

function getQuizReward(score, maxScore, bonusScore = 0) {
  const totalScore = maxScore + bonusScore;
  const percent = maxScore ? Math.min(score, maxScore) / maxScore : 0;

  if (bonusScore && score >= totalScore) {
    return {
      tier: "double",
      sticker: "2 Sticker Drop",
      title: "Caboodle Valedictorian + Receipts Queen",
      message: "12/10. You get two stickers, one for the quiz and one for reading next week's diary early. Very limited-edition energy.",
    };
  }
  if (score >= maxScore) {
    return {
      tier: "receipts",
      sticker: "Receipts Queen",
      title: "Receipts Queen Sticker",
      message: "Perfect score. You may pass Go, collect zero dollars, and correct one confident wrong answer in the group chat.",
    };
  }
  if (percent >= 0.8) {
    return {
      tier: "caboodle",
      sticker: "Caboodle Scholar",
      title: "Caboodle Scholar Sticker",
      message: "The analogies are landing. A little reread and you are dangerous in the best way.",
    };
  }
  if (percent >= 0.6) {
    return {
      tier: "montage",
      sticker: "Montage Mode",
      title: "Montage Has Begun Sticker",
      message: "Not lost. Just at the part of the movie where the outfit changes and the flashcards come out.",
    };
  }
  if (percent >= 0.4) {
    return {
      tier: "participation",
      sticker: "Participation Lip Gloss",
      title: "Participation Lip Gloss Sticker",
      message: "You showed up. That counts. Now reread the marked sections before this becomes a team-building icebreaker.",
    };
  }
  return {
    tier: "butterfly",
    sticker: "Butterfly Clip Incident",
    title: "Butterfly Clip Incident Sticker",
    message: "Low score, but survivable. You stepped on a butterfly clip in the dark. Reread the issue, shake it off, and retake it.",
  };
}

function syncQuizIssueCards() {
  quizIssueCards.forEach((card) => {
    const quiz = issueQuizzes[card.dataset.quizOpen];
    const countLabel = card.querySelector("em");
    if (quiz && countLabel) {
      countLabel.textContent = getQuizLengthLabel(quiz);
    }
    const isActive = card.dataset.quizOpen === activeQuizKey;
    card.classList.toggle("is-selected", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });
}

function renderQuizProgress() {
  if (!quizRewardTitle || !quizBestScore || !quizSticker) return;
  const quiz = issueQuizzes[activeQuizKey] || issueQuizzes.issue01;
  if (!quiz) return;
  const progress = getQuizProgressRecords();
  const record = progress[activeQuizKey];
  const best = Number(record?.bestScore || getQuizBestScores()[activeQuizKey] || 0);
  const bonusScore = Number(quiz.bonusScore || 0);
  const reward = best > 0 ? getQuizReward(best, quiz.maxScore, bonusScore) : { tier: "empty", sticker: "?", title: "No sticker yet" };

  quizRewardTitle.textContent = reward.title;
  quizBestScore.textContent = best > 0
    ? `Best score: ${best}/${quiz.maxScore}${bonusScore ? ` (+${bonusScore} bonus)` : ""}${record?.attempts ? ` | ${record.attempts} attempt${record.attempts === 1 ? "" : "s"}` : ""}`
    : "Best score: not taken";
  quizSticker.textContent = reward.sticker;
  quizSticker.dataset.stickerTier = reward.tier;
  renderQuizProgressList();
}

function renderQuizProgressList() {
  if (!quizProgressList) return;
  const progress = getQuizProgressRecords();
  const items = getVisibleQuizIssueKeys().map((issueKey) => {
    const quiz = issueQuizzes[issueKey];
    const record = progress[issueKey];
    const best = Number(record?.bestScore || 0);
    const latest = Number(record?.latestScore || 0);
    const maxScore = Number(quiz?.maxScore || record?.maxScore || 10);
    const completed = formatQuizProgressDate(record?.completedAt);

    const card = document.createElement("article");
    card.className = "quiz-progress-item";
    card.classList.toggle("is-complete", Boolean(best));

    const label = document.createElement("span");
    label.textContent = initialQuizIssueMeta.get(issueKey)?.issueLabel || (issueKey === "foundation" ? "Foundation" : `Issue ${String(getIssueSortNumber(issueKey)).padStart(2, "0")}`);

    const title = document.createElement("strong");
    setBrandText(title, getIssueCardTitle(issueKey, quiz));

    const score = document.createElement("em");
    score.textContent = best ? `Latest ${latest}/${maxScore} | Best ${best}/${maxScore}` : "Not started";

    const meta = document.createElement("p");
    meta.textContent = best
      ? `${Number(record?.attempts || 1)} attempt${Number(record?.attempts || 1) === 1 ? "" : "s"}${completed ? ` | completed ${completed}` : ""}${record?.stickerTitle ? ` | ${record.stickerTitle}` : ""}`
      : "Take this quiz to add the score and sticker to your member-card progress.";

    card.append(label, title, score, meta);
    return card;
  });

  quizProgressList.replaceChildren(...items);
}

async function hydrateQuizDataFromFile() {
  if (!initialQuizIssueKeys.length || typeof fetch !== "function") return;
  try {
    const response = await fetch("content/site/quizzes.json?v=issue-02-live-1", { cache: "no-store" });
    if (!response.ok) return;
    const loadedQuizzes = await response.json();
    const visibleKeys = getVisibleQuizIssueKeys();
    const nextQuizzes = { ...issueQuizzes };
    visibleKeys.forEach((issueKey) => {
      if (loadedQuizzes?.[issueKey]) nextQuizzes[issueKey] = loadedQuizzes[issueKey];
    });
    issueQuizzes = nextQuizzes;
    renderQuizIssueControls();
    if (!issueQuizzes[activeQuizKey]) {
      activeQuizKey = visibleKeys.find((issueKey) => issueQuizzes[issueKey]) || activeQuizKey;
    }
    renderQuiz();
    renderQuizProgress();
  } catch {
    renderQuizIssueControls();
  }
}

function renderQuiz() {
  if (!quizQuestionsEl) return;
  const quiz = issueQuizzes[activeQuizKey] || issueQuizzes.issue01;
  if (!quiz) {
    if (quizResult) quizResult.textContent = "Quiz data is not loaded yet.";
    return;
  }

  if (quizIssueLabel) quizIssueLabel.textContent = quiz.label;
  setBrandText(quizIssueTitle, quiz.title);
  if (quizRereadLink) {
    quizRereadLink.href = quiz.rereadUrl;
    setBrandText(quizRereadLink, quiz.rereadLabel);
  }
  if (quizIssueSelect) quizIssueSelect.value = activeQuizKey;
  syncQuizIssueCards();

  if (!quizIsOpen) {
    if (quizForm) quizForm.hidden = true;
    quizQuestionsEl.replaceChildren();
    if (quizResult) quizResult.textContent = "Pick an issue above. The questions stay in the Caboodle until you open them.";
    return;
  }

  if (quizForm) quizForm.hidden = false;
  if (quizStartPanel) quizStartPanel.classList.add("is-open");
  if (quizResult) quizResult.textContent = quiz.intro;
  quizQuestionsEl.replaceChildren();
  quiz.questions.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = `quiz-question${question.bonus ? " is-bonus" : ""}`;
    fieldset.dataset.quizQuestion = question.id;

    const legend = document.createElement("h4");
    legend.textContent = `${index + 1}. ${question.prompt}`;

    const options = document.createElement("div");
    options.className = "quiz-options";

    question.options.forEach((option) => {
      const label = document.createElement("label");
      label.className = "quiz-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `quiz-${question.id}`;
      input.value = option;

      const text = document.createElement("span");
      text.textContent = option;

      label.append(input, text);
      options.appendChild(label);
    });

    fieldset.append(legend, options);
    quizQuestionsEl.appendChild(fieldset);
  });
}

function openQuizIssue(issueKey) {
  if (!issueQuizzes[issueKey]) return;
  activeQuizKey = issueKey;
  quizIsOpen = true;
  quizForm?.reset();
  clearQuizFeedback();
  renderQuiz();
  renderQuizProgress();
}

function clearQuizFeedback() {
  quizQuestionsEl?.querySelectorAll(".quiz-question").forEach((question) => {
    question.classList.remove("is-answered-correct", "is-answered-wrong");
  });
  quizQuestionsEl?.querySelectorAll(".quiz-option").forEach((option) => {
    option.classList.remove("is-correct", "is-wrong");
  });
  quizQuestionsEl?.querySelectorAll(".quiz-explain").forEach((item) => item.remove());
}

function gradeQuiz() {
  const quiz = issueQuizzes[activeQuizKey] || issueQuizzes.issue01;
  if (!quiz) return;
  let score = 0;
  let answered = 0;

  clearQuizFeedback();

  quiz.questions.forEach((question) => {
    const fieldset = quizQuestionsEl?.querySelector(`[data-quiz-question="${question.id}"]`);
    const selected = fieldset?.querySelector(`input[name="quiz-${question.id}"]:checked`);
    if (selected) answered += 1;
  });

  if (answered < quiz.questions.length && quizResult) {
    quizResult.textContent = `You answered ${answered}/${quiz.questions.length}. Finish the page before we hand out stickers. Then the quiz will show what each answer means and where to reread it.`;
    return;
  }

  quiz.questions.forEach((question) => {
    const fieldset = quizQuestionsEl?.querySelector(`[data-quiz-question="${question.id}"]`);
    const selected = fieldset?.querySelector(`input[name="quiz-${question.id}"]:checked`);
    const correctInput = Array.from(fieldset?.querySelectorAll(`input[name="quiz-${question.id}"]`) || []).find((input) => input.value === question.answer);
    const correctOption = correctInput?.closest(".quiz-option");
    const isCorrect = selected?.value === question.answer;

    fieldset?.classList.add(isCorrect ? "is-answered-correct" : "is-answered-wrong");
    if (isCorrect) {
      score += question.points;
      selected.closest(".quiz-option")?.classList.add("is-correct");
    } else {
      selected?.closest(".quiz-option")?.classList.add("is-wrong");
      correctOption?.classList.add("is-correct");
    }

    const explain = document.createElement("div");
    explain.className = "quiz-explain";

    const verdict = document.createElement("strong");
    verdict.textContent = isCorrect ? "Correct." : "Not quite.";

    const correctAnswer = document.createElement("span");
    correctAnswer.className = "quiz-correct-answer";
    correctAnswer.textContent = `Correct answer: ${question.answer}`;

    const meaning = document.createElement("p");
    meaning.textContent = `What it means: ${question.explain}`;

    explain.append(verdict, correctAnswer, meaning);

    if (question.review) {
      const review = document.createElement(question.reviewUrl ? "a" : "span");
      review.className = "quiz-review-link";
      const reviewText = question.review.trim();
      const reviewLocation = reviewText.replace(/^find it in\s*/i, "").replace(/^find it\s*/i, "");
      review.textContent = `Where to find it: ${reviewLocation}`;
      if (question.reviewUrl) review.href = question.reviewUrl;
      explain.appendChild(review);
    }
    fieldset?.appendChild(explain);
  });

  const scores = getQuizBestScores();
  scores[activeQuizKey] = Math.max(Number(scores[activeQuizKey] || 0), score);
  saveQuizBestScores(scores);

  const reward = getQuizReward(score, quiz.maxScore, Number(quiz.bonusScore || 0));
  const progress = getQuizProgressRecords();
  const current = progress[activeQuizKey] || {};
  progress[activeQuizKey] = {
    ...current,
    attempts: Number(current.attempts || 0) + 1,
    latestScore: score,
    bestScore: Math.max(Number(current.bestScore || 0), score),
    maxScore: quiz.maxScore,
    bonusScore: Number(quiz.bonusScore || 0),
    completedAt: new Date().toISOString(),
    stickerTitle: reward.title,
    stickerTier: reward.tier,
  };
  saveQuizProgressRecords(progress);

  if (quizResult) {
    quizResult.textContent = `${score}/${quiz.maxScore}: ${reward.title}. ${reward.message} Open your Clubhouse Pass to pin this to your member card.`;
  }
  renderQuizProgress();
  renderQuizStickerShelf();
  scheduleMemberRewardSync();
}

renderQuiz();
renderQuizProgress();
hydrateQuizDataFromFile();

quizIssueSelect?.addEventListener("change", () => {
  activeQuizKey = quizIssueSelect.value;
  quizIsOpen = true;
  quizForm?.reset();
  clearQuizFeedback();
  renderQuiz();
  renderQuizProgress();
});

quizForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  gradeQuiz();
});

quizResetButton?.addEventListener("click", () => {
  quizForm?.reset();
  clearQuizFeedback();
  if (quizResult) {
    quizResult.textContent = "Retake approved. Magazine quizzes were built for second chances and better pens.";
  }
});

function getStoredCardCollection() {
  return getStoredJson(cardCollectionStorageKey, {});
}

let cardCollection = getStoredCardCollection();

function saveCardCollection() {
  setStoredJson(cardCollectionStorageKey, cardCollection);
}

function getStoredLastPackPulls() {
  return getStoredJson(lastCardPackStorageKey, []);
}

function getPackCards() {
  return Array.from(episodeTradingCards).map((card) => ({
    id: card.dataset.packCard,
    packIssue: card.dataset.packIssue || "all",
    title: card.dataset.packTitle || card.querySelector("h3")?.textContent?.trim() || "Mystery Card",
    issue: card.querySelector(".episode-card-front span")?.textContent?.trim() || "Issue",
    image: card.querySelector(".episode-card-front img")?.getAttribute("src") || "",
    alt: card.querySelector(".episode-card-front img")?.getAttribute("alt") || "",
  }));
}

function getSelectedPackCards() {
  const selectedIssue = cardPackIssueSelect?.value || "all";
  const cards = getPackCards();
  if (selectedIssue === "all") return cards;
  return cards.filter((card) => card.packIssue === selectedIssue);
}

function renderCardPackCollection() {
  const cards = getPackCards();
  const ownedUnique = cards.filter((card) => Number(cardCollection[card.id] || 0) > 0).length;
  const totalOwned = cards.reduce((sum, card) => sum + Number(cardCollection[card.id] || 0), 0);
  const missing = Math.max(cards.length - ownedUnique, 0);

  episodeTradingCards.forEach((card) => {
    const count = Number(cardCollection[card.dataset.packCard] || 0);
    card.classList.toggle("is-owned", count > 0);
    card.classList.toggle("is-missing", count === 0);
    let badge = card.querySelector(".card-count-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "card-count-badge";
      card.appendChild(badge);
    }
    badge.textContent = count > 0 ? `x${count}` : "0";
    badge.setAttribute("aria-label", count > 0 ? `${count} owned` : "Not collected yet");
  });

  if (cardPackOwnedCount) cardPackOwnedCount.textContent = String(totalOwned);
  if (cardPackMissingCount) cardPackMissingCount.textContent = String(missing);
}

function renderEmptyPackPulls() {
  if (!cardPackPulls) return;
  const empty = document.createElement("p");
  empty.className = "pack-empty";
  empty.textContent = "Nothing in the wrapper yet. Open a pack and see what you pulled.";
  cardPackPulls.replaceChildren(empty);
}

function renderPackPulls(pulls) {
  if (!cardPackPulls) return;
  cardPackPulls.replaceChildren();

  if (!pulls.length) {
    renderEmptyPackPulls();
    return;
  }

  pulls.forEach((card) => {
    cardPackPulls.appendChild(createPackPullCard(card));
  });
}

function createPackPullCard(card) {
  const item = document.createElement("article");
  item.className = "pack-pull-card";

  const image = document.createElement("img");
  image.src = card.image;
  image.alt = card.alt || `${card.title} trading card`;

  const copy = document.createElement("div");
  copy.className = "pack-pull-copy";

  const kicker = document.createElement("span");
  kicker.className = "pack-pull-kicker";
  kicker.textContent = card.isDuplicate ? "Duplicate pull" : "New pull";

  const title = document.createElement("strong");
  title.textContent = card.title;

  const count = document.createElement("em");
  count.textContent = `Binder count x${card.count}`;

  copy.append(kicker, title, count);
  item.append(image, copy);
  return item;
}

function openCardPack() {
  const cards = getSelectedPackCards();
  if (!cards.length) return;

  const pulls = Array.from({ length: 3 }, () => cards[Math.floor(Math.random() * cards.length)]);
  const newPulls = [];

  pulls.forEach((card) => {
    const previousCount = Number(cardCollection[card.id] || 0);
    cardCollection[card.id] = previousCount + 1;
    newPulls.push({ ...card, isDuplicate: previousCount > 0, count: cardCollection[card.id] });
  });

  saveCardCollection();
  setStoredJson(lastCardPackStorageKey, newPulls);
  renderCardPackCollection();
  renderPackPulls(newPulls);
  scheduleMemberRewardSync();

  const uniqueTitles = new Set(newPulls.map((card) => card.title));
  const duplicateCopy = newPulls.some((card) => card.isDuplicate)
    ? " Duplicate drama detected. Into the binder it goes."
    : " Fresh stack, no doubles. Into the binder they go.";
  if (cardPackStatus) {
    const selectedLabel = cardPackIssueSelect?.selectedOptions?.[0]?.textContent || "the released";
    cardPackStatus.textContent = `You opened ${selectedLabel} and pulled ${uniqueTitles.size} kind${uniqueTitles.size === 1 ? "" : "s"} of card.${duplicateCopy}`;
  }
}

window.openCardPack = openCardPack;
if (openCardPackButton) {
  openCardPackButton.onclick = openCardPack;
}

resetCardPackButton?.addEventListener("click", () => {
  cardCollection = {};
  saveCardCollection();
  removeStoredJson(lastCardPackStorageKey);
  renderEmptyPackPulls();
  if (cardPackStatus) {
    cardPackStatus.textContent = "Collection reset. The binder is empty and emotionally ready.";
  }
  renderCardPackCollection();
});

cardPackIssueSelect?.addEventListener("change", () => {
  if (cardPackStatus) {
    cardPackStatus.textContent = `${cardPackIssueSelect.selectedOptions[0].textContent} selected. Open a pack when you are ready for wrapper drama.`;
  }
});

renderCardPackCollection();
const storedLastPackPulls = getStoredLastPackPulls();
if (storedLastPackPulls.length) {
  renderPackPulls(storedLastPackPulls);
} else if (cardPackPulls && !cardPackPulls.children.length) {
  renderEmptyPackPulls();
}

function getActiveReferenceFilter() {
  return document.querySelector("[data-reference-filter].is-selected")?.dataset.referenceFilter || "all";
}

function getReferenceFilterLabel(filter) {
  const labels = {
    all: "all drawers",
    screen: "screen references",
    music: "music references",
    people: "people and character references",
    objects: "accessories",
    work: "print and page references",
  };
  return labels[filter] || "the selected drawer";
}

function maybeUnlockReferenceBadge(filter = "", query = "") {
  const normalizedQuery = String(query || "").toLowerCase();
  if (filter !== "work" && !/\b(receipt|receipts|source|sources|proof|verify|verification)\b/.test(normalizedQuery)) return "";
  return unlockSecretBadge("receipts-drawer", "Reference Closet");
}

function updateReferenceCloset() {
  const filter = getActiveReferenceFilter();
  const query = referenceSearch?.value.trim().toLowerCase() || "";
  let visibleCount = 0;

  referenceCards.forEach((card) => {
    const matchesFilter = filter === "all" || card.dataset.referenceType === filter;
    const matchesSearch = !query || card.innerText.toLowerCase().includes(query);
    const isVisible = matchesFilter && matchesSearch;
    card.classList.toggle("is-hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  referenceGrid?.classList.toggle("is-open", referenceClosetOpen);
  if (referenceClosetStatus) {
    const unlockMessage = maybeUnlockReferenceBadge(filter, query);
    referenceClosetStatus.textContent = referenceClosetOpen
      ? `${visibleCount} card${visibleCount === 1 ? "" : "s"} pulled from ${query ? "your search" : getReferenceFilterLabel(filter)}. Click any card for the longer note.${unlockMessage ? ` Merit badge: ${unlockMessage}` : ""}`
      : "Pick a drawer or search the closet. The whole wardrobe stays tucked away until you need it.";
  }
}

referenceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    referenceClosetOpen = true;
    referenceButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    updateReferenceCloset();
  });
});

referenceSearch?.addEventListener("input", () => {
  referenceClosetOpen = true;
  updateReferenceCloset();
});

referenceCloseButton?.addEventListener("click", () => {
  referenceClosetOpen = false;
  if (referenceSearch) referenceSearch.value = "";
  referenceButtons.forEach((item) => item.classList.remove("is-selected"));
  updateReferenceCloset();
});

function renderGlossaryRolodex() {
  if (!glossaryGrid || !glossaryCards.length) return;
  const showAll = glossaryGrid.classList.contains("show-all");

  glossaryCards.forEach((card, index) => {
    const isActive = index === activeGlossaryIndex;
    card.classList.toggle("is-active", isActive);
    if (!showAll) {
      card.classList.toggle("is-expanded", isActive);
      card.setAttribute("aria-expanded", String(isActive));
    }
  });

  if (glossarySelect) glossarySelect.value = String(activeGlossaryIndex);
  if (glossaryShowAll) {
    glossaryShowAll.textContent = showAll ? "Rolodex view" : "Show all";
    glossaryShowAll.setAttribute("aria-expanded", String(showAll));
  }
  if (glossaryStatus) {
    const title = glossaryCards[activeGlossaryIndex]?.querySelector("strong")?.textContent?.trim() || "Glossary";
    glossaryStatus.textContent = showAll
      ? "All glossary cards are out on the desk. Click any card to open or close the longer note."
      : `Showing ${title}. Use the arrows or dropdown to flip the Rolodex.`;
  }
}

if (glossarySelect && glossaryCards.length) {
  glossaryCards.forEach((card, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = card.querySelector("strong")?.textContent?.trim() || `Card ${index + 1}`;
    glossarySelect.append(option);
  });
}

glossarySelect?.addEventListener("change", () => {
  activeGlossaryIndex = Number(glossarySelect.value) || 0;
  glossaryGrid?.classList.remove("show-all");
  renderGlossaryRolodex();
});

glossaryPrev?.addEventListener("click", () => {
  activeGlossaryIndex = (activeGlossaryIndex - 1 + glossaryCards.length) % glossaryCards.length;
  glossaryGrid?.classList.remove("show-all");
  renderGlossaryRolodex();
});

glossaryNext?.addEventListener("click", () => {
  activeGlossaryIndex = (activeGlossaryIndex + 1) % glossaryCards.length;
  glossaryGrid?.classList.remove("show-all");
  renderGlossaryRolodex();
});

glossaryShowAll?.addEventListener("click", () => {
  glossaryGrid?.classList.toggle("show-all");
  renderGlossaryRolodex();
});

renderGlossaryRolodex();
updateReferenceCloset();

expandableCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-expanded", "false");

  const toggleCard = () => {
    const isExpanded = card.classList.toggle("is-expanded");
    card.setAttribute("aria-expanded", String(isExpanded));
  };

  card.addEventListener("click", toggleCard);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
  });
});

renderGlossaryRolodex();

laidyButton?.addEventListener("click", () => {
  const mode = laidyMode?.value || "dolly";
  const cleanedQuestion = laidyQuestion?.value.trim().replace(/\s+/g, " ");
  const next = buildLaidyAdvice(cleanedQuestion, mode);
  const promptFeedback = buildLaidyPromptFeedback(cleanedQuestion);

  if (next === lastLaidyAdvice) {
    laidyAdviceEl.textContent = `${next}\n\nSame advice because LAIDY meant it. Annoying, but efficient.`;
  } else {
    laidyAdviceEl.textContent = next;
  }
  if (laidyPromptFeedbackText) {
    laidyPromptFeedbackText.textContent = promptFeedback;
  }
  lastLaidyAdvice = next;
});

function getBoardPosts() {
  return getStoredJson(boardStorageKey, []);
}

function saveBoardPosts(posts) {
  setStoredJson(boardStorageKey, posts);
}

function formatBoardDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function renderBoardPosts() {
  if (!boardPostsEl) return;
  const posts = getBoardPosts();
  boardPostsEl.replaceChildren();

  if (!posts.length) {
    const empty = document.createElement("p");
    empty.className = "board-empty";
    empty.textContent = "No preview posts yet. Be the first person brave enough to ask the thing everyone else is quietly Googling.";
    boardPostsEl.append(empty);
    return;
  }

  posts.forEach((post) => {
    const article = document.createElement("article");
    article.className = "board-post";

    const meta = document.createElement("div");
    meta.className = "board-post-meta";
    const channel = document.createElement("span");
    channel.textContent = post.category;
    const author = document.createElement("span");
    author.textContent = post.name || "Anonymous lAIdy";
    const time = document.createElement("span");
    time.textContent = formatBoardDate(post.createdAt);
    meta.append(channel, author, time);

    const title = document.createElement("h4");
    title.textContent = post.title;
    const body = document.createElement("p");
    body.textContent = post.body;

    article.append(meta, title, body);
    boardPostsEl.append(article);
  });
}

function setBoardCategory(category) {
  if (boardCategory) boardCategory.value = category;
  boardCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.boardCard === category);
  });
  boardStatus.textContent = `${category} selected. Type the messy version; polish can wait.`;
  document.querySelector("#board-workbench")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildBoardPostText() {
  const category = boardCategory?.value || "Ask the Room";
  const name = boardName?.value.trim() || "Anonymous lAIdy";
  const title = boardTitle?.value.trim() || "Untitled board post";
  const body = boardBody?.value.trim() || "Details coming after one small sip of courage.";
  return `[${category}] ${title}\nFrom: ${name}\n\n${body}`;
}

boardPickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setBoardCategory(button.dataset.boardPick);
  });
});

boardForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = boardTitle?.value.trim();
  const body = boardBody?.value.trim();

  if (!title || !body) {
    boardStatus.textContent = "The room needs a headline and the details. Vague is how we end up carrying the group project.";
    return;
  }

  const posts = getBoardPosts();
  const post = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    category: boardCategory?.value || "Ask the Room",
    name: boardName?.value.trim(),
    title,
    body,
    createdAt: new Date().toISOString(),
  };

  saveBoardPosts([post, ...posts].slice(0, 12));
  renderBoardPosts();
  boardForm.reset();
  if (boardCategory) boardCategory.value = post.category;
  const badgeMessage = trackCommunityRoomPost(post.category);
  boardStatus.textContent = [
    "Posted to the preview board. The public-room version comes after approval and moderation are wired in.",
    badgeMessage,
  ]
    .filter(Boolean)
    .join(" ");
});

copyBoardPost?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildBoardPostText());
    boardStatus.textContent = "Copied. Ready for the real public thread when the room opens.";
  } catch {
    boardStatus.textContent = "Copy blocked by the browser. Highlight it manually, very 2002.";
  }
});

clearBoardPosts?.addEventListener("click", () => {
  removeStoredJson(boardStorageKey);
  renderBoardPosts();
  boardStatus.textContent = "Preview cleared. A clean slate, but with better hair.";
});

function feedbackList(formData, key) {
  const values = formData.getAll(key).filter(Boolean);
  return values.length ? values.join(", ") : "Not selected";
}

feedbackForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(feedbackForm);
  const episode = String(formData.get("episode") || "Not selected").trim();
  const landing = String(formData.get("landing") || "Not selected").trim();
  const bestPart = String(formData.get("bestPart") || "Not selected").trim();
  const notes = String(formData.get("notes") || "No extra notes").trim();
  const contact = String(formData.get("contact") || "No reply requested").trim();

  const body = [
    "lAIdies comment card",
    "",
    `Episode/page: ${episode}`,
    `Quick read: ${landing}`,
    `Would make it better: ${feedbackList(formData, "needs")}`,
    `Best part: ${bestPart || "Not selected"}`,
    `Notes: ${notes || "No extra notes"}`,
    `Contact: ${contact || "No reply requested"}`,
    "",
    "Sent from the lAIdies Comment Card.",
  ].join("\n");

  const mailto = `mailto:wednesday.laidies@gmail.com?subject=${encodeURIComponent(`lAIdies feedback: ${episode}`)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  if (feedbackStatus) {
    feedbackStatus.textContent = "Email draft opened. Hit send there so the comment card actually leaves the building.";
  }
});

subscribeForm?.addEventListener("submit", (event) => {
  const action = subscribeForm.getAttribute("action") || "";
  const isPreview = !action || action === "#";

  if (isPreview) {
    event.preventDefault();
    subscribeStatus.textContent = "Buttondown is not connected yet. Create the newsletter, send the username, and this form can start collecting subscribers.";
    return;
  }

  if (subscribeStatus) {
    subscribeStatus.textContent = "Check your inbox to confirm. You can stay right here: no empty archive detour required.";
    subscribeStatus.classList.add("is-success");
  }
});

const miniSubscribeForm = document.querySelector(".mini-subscribe-form");
const miniSubscribeStatus = document.querySelector("#miniSubscribeStatus");
miniSubscribeForm?.addEventListener("submit", () => {
  if (miniSubscribeStatus) {
    miniSubscribeStatus.textContent = "You\u2019re in! Check your inbox \u2713";
    miniSubscribeStatus.classList.add("is-success");
  }
});

function cleanSpotlightValue(formData, key, fallback = "") {
  return String(formData.get(key) || fallback).trim();
}

function shortValue(value, fallback) {
  const cleaned = String(value || "").trim();
  if (!cleaned) return fallback;
  return cleaned.length > 34 ? `${cleaned.slice(0, 31)}...` : cleaned;
}

const spotlightCardStyles = {
  original: {
    label: "Original photo with simple card frame",
    className: "card-laser",
    styled: false,
    placeholder: "Simple card frame",
  },
  laser: {
    label: "Classic school-photo laser background",
    className: "card-laser",
    styled: true,
    placeholder: "Laser portrait",
  },
  sparkle: {
    label: "Butterfly clips, soft sparkle, and mall-photo background",
    className: "card-sparkle",
    styled: true,
    placeholder: "Soft sparkle avatar",
  },
  holo: {
    label: "Holographic trading-card foil",
    className: "card-holo",
    styled: true,
    placeholder: "Holographic card",
  },
  desk: {
    label: "Caboodles, flip phone, and glitter gel pen desk",
    className: "card-desk",
    styled: true,
    placeholder: "Caboodles desk card",
  },
  closet: {
    label: "Clueless closet computer glow-up",
    className: "card-closet",
    styled: true,
    placeholder: "Closet computer glow",
  },
  press: {
    label: "Pop-star press photo, but make it corporate",
    className: "card-press",
    styled: true,
    placeholder: "Press photo card",
  },
};

const spotlightStyleClasses = Object.values(spotlightCardStyles).map((style) => style.className);
const spotlightSurpriseStyles = ["laser", "sparkle", "holo", "desk", "closet", "press"];
const spotlightSurpriseChoices = {};
let spotlightPhotoObjectUrl = "";

function resolveSpotlightCardStyle(value) {
  const selected = value || "original";
  if (selected === "laidy-surprise" || selected === "claio-surprise") {
    if (!spotlightSurpriseChoices[selected]) {
      const index = Math.floor(Math.random() * spotlightSurpriseStyles.length);
      spotlightSurpriseChoices[selected] = spotlightSurpriseStyles[index];
    }
    return {
      ...spotlightCardStyles[spotlightSurpriseChoices[selected]],
      surpriseLabel: selected === "laidy-surprise" ? "LAIDY picked" : "Mme CLAI-O picked",
    };
  }

  return spotlightCardStyles[selected] || spotlightCardStyles.original;
}

function setSpotlightCardClass(style) {
  if (!memberCardPreview) return;
  memberCardPreview.classList.remove(...spotlightStyleClasses);
  memberCardPreview.classList.add(style.className);
  memberCardPreview.classList.toggle("is-yearbook", style.styled);
}

function updateSpotlightPhotoPreview(formData, style) {
  if (!spotlightPhotoPreview) return;

  const photo = formData.get("photo");
  const avatarVibe = cleanSpotlightValue(formData, "avatarVibe");

  if (photo instanceof File && photo.size) {
    if (spotlightPhotoObjectUrl) URL.revokeObjectURL(spotlightPhotoObjectUrl);
    spotlightPhotoObjectUrl = URL.createObjectURL(photo);
    spotlightPhotoPreview.innerHTML = "";
    const image = document.createElement("img");
    image.src = spotlightPhotoObjectUrl;
    image.alt = "Selected member card photo preview";
    spotlightPhotoPreview.append(image);
    return;
  }

  if (spotlightPhotoObjectUrl) {
    URL.revokeObjectURL(spotlightPhotoObjectUrl);
    spotlightPhotoObjectUrl = "";
  }

  spotlightPhotoPreview.textContent = avatarVibe || style.placeholder || "Photo, avatar, or card-style preview";
}

function updateMemberCardPreview(formData) {
  if (!memberCardPreview) return;

  const name = cleanSpotlightValue(formData, "name", "Your name");
  const role = cleanSpotlightValue(formData, "role", "Corporate woman building AI confidence");
  const journey = cleanSpotlightValue(formData, "journey", "Member Era");
  const tools = cleanSpotlightValue(formData, "tools", "Tools");
  const help = cleanSpotlightValue(formData, "help", "Help offered");
  const selectedStyle = cleanSpotlightValue(formData, "y2kStyle", "original");
  const cardStyle = resolveSpotlightCardStyle(selectedStyle);
  const openToConnect = formData.get("openToConnect") === "on";
  const styleLabel = cardStyle.surpriseLabel ? `${cardStyle.surpriseLabel}: ${cardStyle.label}` : cardStyle.label;

  if (memberCardKicker) memberCardKicker.textContent = journey || "Member Era";
  if (memberCardName) memberCardName.textContent = name;
  if (memberCardSummary) memberCardSummary.textContent = role;
  if (selectedCardStyleNote) {
    selectedCardStyleNote.textContent = `Selected mode: ${styleLabel}.`;
  }
  if (memberCardTags) {
    memberCardTags.replaceChildren();
    [
      shortValue(tools, "Tools"),
      shortValue(help, "Can help"),
      shortValue(styleLabel, "Card mode"),
      openToConnect ? "Open to connect" : "Consent-led",
    ].filter(Boolean).forEach((item) => {
      const tag = document.createElement("span");
      tag.textContent = item;
      memberCardTags.append(tag);
    });
  }

  setSpotlightCardClass(cardStyle);
  updateSpotlightPhotoPreview(formData, cardStyle);
}

function buildSpotlightDraft(formData) {
  const name = cleanSpotlightValue(formData, "name", "This lAIdy");
  const role = cleanSpotlightValue(formData, "role", "a woman building her next chapter");
  const location = cleanSpotlightValue(formData, "location");
  const link = cleanSpotlightValue(formData, "link");
  const avatarVibe = cleanSpotlightValue(formData, "avatarVibe", "photo decision pending");
  const journey = cleanSpotlightValue(formData, "journey", "figuring out where AI fits");
  const tools = cleanSpotlightValue(formData, "tools", "still choosing her tools");
  const struggles = cleanSpotlightValue(formData, "struggles", "getting from interest to a practical next step");
  const learn = cleanSpotlightValue(formData, "learn", "how to use AI with more confidence");
  const help = cleanSpotlightValue(formData, "help", "sharing what she is learning as she goes");
  const helpOther = cleanSpotlightValue(formData, "helpOther");
  const support = cleanSpotlightValue(formData, "support", "examples, encouragement, and practical shortcuts");
  const supportOther = cleanSpotlightValue(formData, "supportOther");
  const energy = cleanSpotlightValue(formData, "energy", "clear receipts and good questions");
  const visibility = cleanSpotlightValue(formData, "visibility", "directory");
  const selectedStyle = cleanSpotlightValue(formData, "y2kStyle", "original");
  const cardStyle = resolveSpotlightCardStyle(selectedStyle);
  const styleLine = cardStyle.surpriseLabel ? `${cardStyle.surpriseLabel}: ${cardStyle.label}` : cardStyle.label;
  const openToConnect = formData.get("openToConnect") === "on";
  const wantsFeature = formData.get("featureOptIn") === "on";
  const proud = cleanSpotlightValue(formData, "proud", "a recent win worth celebrating");
  const excited = cleanSpotlightValue(formData, "excited", "seeing what becomes possible");
  const featureAngle = cleanSpotlightValue(formData, "featureAngle", "her AI journey");

  const locationLine = location ? `\nLocation/time zone: ${location}` : "";
  const linkLine = link ? `\nLink: ${link}` : "";
  const connectionLine = `\nOpen to member connection: ${openToConnect ? "yes, through the LinkedIn or public link she chose to share" : "not selected"}`;
  const helpOtherLine = helpOther ? `\nOther help note: ${helpOther}` : "";
  const supportOtherLine = supportOther ? `\nOther support note: ${supportOther}` : "";
  const photoLine = `\nPhoto/avatar preference: ${avatarVibe}`;
  const cardStyleLine = `\nSelected card mode: ${styleLine}`;
  const approvalLine = `\nApproved preview mode captured: yes\nAutomatic Y2K image generation needed: ${cardStyle.styled ? "yes, generate from selected mode and return final card for member approval" : "no, use original photo/simple frame"}\nFinal generated card approval needed before publishing: yes`;
  const featureBlock = wantsFeature
    ? `\n\nFeature opt-in: yes\nWhat to celebrate: ${proud}\nWhat she is excited about: ${excited}\nFeature angle: ${featureAngle}\n\nDraft feature caption:\nMeet ${name}. She is ${role}, currently ${journey.toLowerCase()}, and she is building AI confidence without pretending the learning curve is glamorous. She is working through ${struggles}, learning ${learn}, and bringing ${energy} to the room. Small sips, big moves.`
    : "\n\nFeature opt-in: no for now. Keep this as a card draft unless she opts in later.";

  return `Member trading card\n${name} is ${role}.${locationLine}\nAI journey: ${journey}\nTools in the rotation: ${tools}\nWorking through: ${struggles}\nHoping to learn: ${learn}\nCan offer help with: ${help}${helpOtherLine}\nWould love support with: ${support}${supportOtherLine}\nCurrent lAIdies energy: ${energy}\nVisibility: ${visibility}${connectionLine}${photoLine}${cardStyleLine}${approvalLine}${linkLine}${featureBlock}`;
}

function updateFeatureFields() {
  if (!featureFields || !featureOptIn) return;
  const isVisible = featureOptIn.checked;
  featureFields.classList.toggle("is-visible", isVisible);
  featureFields.setAttribute("aria-hidden", String(!isVisible));
}

function setCardApprovalStep(activeIndex, doneIndexes = []) {
  cardApprovalSteps.forEach((step, index) => {
    const isActive = index === activeIndex;
    const isDone = doneIndexes.includes(index);
    step.classList.toggle("is-active", isActive);
    step.classList.toggle("is-done", isDone && !isActive);
  });
}

function filterLaidiesCards(filter = "all") {
  const cards = laidiesCardGrid ? Array.from(laidiesCardGrid.querySelectorAll("[data-card-tags]")) : [];
  let visibleCount = 0;
  cards.forEach((card) => {
    const tags = `${card.dataset.cardType || ""} ${card.dataset.cardTags || ""}`.toLowerCase();
    const shouldShow = filter === "all" || tags.split(/\s+/).includes(filter);
    card.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) visibleCount += 1;
  });

  directoryFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.cardFilter === filter);
  });

  if (directoryFilterStatus) {
    const statusByFilter = {
      all: `Showing all ${visibleCount} cards.`,
      stock: `Showing ${visibleCount} stock card${visibleCount === 1 ? "" : "s"}.`,
      member: `Showing ${visibleCount} member card${visibleCount === 1 ? "" : "s"}.`,
      help: `Showing ${visibleCount} card${visibleCount === 1 ? "" : "s"} with help to offer.`,
      progress: `Showing ${visibleCount} card${visibleCount === 1 ? "" : "s"} in progress mode.`,
      connect: `Showing ${visibleCount} card${visibleCount === 1 ? "" : "s"} open to connection.`,
    };
    directoryFilterStatus.textContent = statusByFilter[filter] || `Showing ${visibleCount} cards.`;
  }
}

featureOptIn?.addEventListener("change", updateFeatureFields);
updateFeatureFields();
setCardApprovalStep(0);
filterLaidiesCards("all");

directoryFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterLaidiesCards(button.dataset.cardFilter || "all");
  });
});

spotlightForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(spotlightForm);
  lastSpotlightDraft = buildSpotlightDraft(formData);
  updateMemberCardPreview(formData);

  if (spotlightCopy) spotlightCopy.textContent = lastSpotlightDraft;
  if (spotlightStatus) {
    spotlightStatus.textContent = "Preview approved. In the live flow, the generated card comes back here before anything is published.";
  }
  setCardApprovalStep(2, [0, 1]);
});

function updateSpotlightPreviewFromForm() {
  if (!spotlightForm) return;
  updateMemberCardPreview(new FormData(spotlightForm));
  if (!lastSpotlightDraft) setCardApprovalStep(0);
}

spotlightForm?.addEventListener("input", updateSpotlightPreviewFromForm);
spotlightForm?.addEventListener("change", updateSpotlightPreviewFromForm);
cardStyleSelect?.addEventListener("change", () => {
  if (cardStyleSelect.value === "laidy-surprise" || cardStyleSelect.value === "claio-surprise") {
    delete spotlightSurpriseChoices[cardStyleSelect.value];
  }
  updateSpotlightPreviewFromForm();
});

copySpotlightDraft?.addEventListener("click", async () => {
  if (!lastSpotlightDraft) {
    spotlightStatus.textContent = "Create a draft first, then copy it.";
    return;
  }

  try {
    await navigator.clipboard.writeText(lastSpotlightDraft);
    spotlightStatus.textContent = "Copied. Share only after final approval. No surprise publishing.";
    setCardApprovalStep(3, [0, 1, 2]);
  } catch {
    spotlightStatus.textContent = "Copy blocked by the browser. Highlight the draft manually.";
  }
});

function renderButterflyClips(container, score) {
  if (!container) return;
  container.replaceChildren();
  for (let index = 0; index < score; index += 1) {
    const clip = document.createElement("img");
    clip.className = "butterfly-clip-token";
    clip.src = "assets/butterfly-clip-rating-token.png";
    clip.alt = "";
    clip.loading = "lazy";
    clip.decoding = "async";
    container.append(clip);
  }
}

const butterflyRatingDescriptions = [
  "Ouch! You stepped on a broken butterfly clip.",
  "One lonely clip, bravely holding up an entire side part.",
  "Two clips. Cute effort, but the bangs are still running the meeting.",
  "Three clips: mall bathroom mirror energy, with potential.",
  "Four clips. We have a look, but it is still held together with hope.",
  "Five clips. Respectable. The answer brought lip gloss and a vague plan.",
  "Six clips. Getting useful, like finding the good scrunchie in your tote.",
  "Seven clips. She has structure, sparkle, and only one questionable sentence.",
  "Eight clips. Very into it. The group chat would ask for the prompt.",
  "Nine clips. Basically main-character hair, minus one strategic sparkle.",
  "WOW almost enough for a full hairstyle.....",
];

function updateButterflyRating(rating, nextValue) {
  const range = rating.querySelector("[data-butterfly-range]");
  const output = rating.querySelector("[data-butterfly-output]");
  const description = rating.querySelector("[data-butterfly-description]");
  const clips = rating.querySelector("[data-butterfly-clips]");
  const buttons = rating.querySelectorAll("[data-butterfly-button]");
  const score = Math.max(0, Math.min(10, Number.parseInt(nextValue, 10) || 0));
  if (range) range.value = String(score);
  if (output) output.textContent = `${score} Butterfly Clip${score === 1 ? "" : "s"}`;
  if (description) description.textContent = butterflyRatingDescriptions[score] || "";
  renderButterflyClips(clips, score);
  buttons.forEach((button) => {
    const isSelected = Number.parseInt(button.dataset.butterflyButton || "0", 10) === score;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

document.querySelectorAll("[data-butterfly-rating]").forEach((rating) => {
  const range = rating.querySelector("[data-butterfly-range]");
  const buttons = rating.querySelectorAll("[data-butterfly-button]");
  updateButterflyRating(rating, range?.value || "5");
  range?.addEventListener("input", () => updateButterflyRating(rating, range.value));
  buttons.forEach((button) => {
    button.addEventListener("click", () => updateButterflyRating(rating, button.dataset.butterflyButton || "0"));
  });
});

renderBoardPosts();
