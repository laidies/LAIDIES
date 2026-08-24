/* ============================================================================
   Dream Phone — Just Call voice bundles (Path B)
   ---------------------------------------------------------------------------
   Dedicated data file so the caller copy lives OUT of the shared script.js
   (no site-wide cache-buster churn). The Just Call dialer in dream-phone.html
   reads window.dreamPhoneBundles.

   Unit: 1 bundle = 1 base `output` + its own `secret` / `speaker` / `hangup`,
   all riffing the same `object`. 3 bundles per caller. Verbatim content —
   do not paraphrase or re-punctuate. Canadian English as written.
   ========================================================================== */
window.dreamPhoneBundles = {
  // ===================== DRAMA BANK =====================
  receipts: [
    {
      object: `ICQ chat log`,
      output: `ICQ went "uh-oh" the second a message landed, then kept it forever whether you wanted the receipt or not. Be the one who still has the history — when someone swears they never agreed to the 14th, the uh-oh already logged it.`,
      secret: `Receipts has the secret: the log doesn't care who's senior or who said it loudest, only who typed what, when. Keep it quietly, and the calmest person in the room ends up with the only copy that matches the timestamps.`,
      speaker: `Receipts puts it on speaker: drop the actual line in, timestamp and all. "Here's the 2:14 message" lands harder than ten people remembering 2:14 ten different ways.`,
      hangup: `Receipts says hang up: you're drafting a paragraph to win what one scroll-up already settled. Screenshot the line and let it argue for you.`,
    },
    {
      object: `Yearbook caption`,
      output: `A yearbook caption prints once, misspelled name and all, no reissue. Say it out loud before it's bound — "deadline's the 24th, wait, the 14th" — the date you'd skim right past is the one you trip on out loud.`,
      secret: `Receipts has the secret: the caption's set in the page long before anyone notices the typo. Check the name, the number, the date while it's still pencil, not after the books are handed out.`,
      speaker: `Receipts puts it on speaker: before it's bound, get the proof to the people whose names are in it. The misspelling nobody flags in the draft is the one three of them spot the second they see their own line.`,
      hangup: `Receipts says hang up: the books are printed and in the hallway. Stop rereading the caption you can't change and go get the next one right.`,
    },
    {
      object: `Sticker photo booth`,
      output: `The photo booth printed all four frames in the order they happened, no swapping the one where you looked surprised. Keep the strip — when the story gets retold flattering, the sequence shows what actually went down.`,
      secret: `Receipts has the secret: the booth fires four shots on its own timer and waits for nobody. Capture it as it happens, because there's no "hold on, again" once the flash starts.`,
      speaker: `Receipts puts it on speaker: tape the strip up where the whole group can see it. A sequence on the wall settles the retelling without you having to say a word.`,
      hangup: `Receipts says hang up: the strip's developed and the order's fixed. Quit holding it to the light hoping frame three rearranges itself.`,
    },
  ],
  boundary: [
    {
      object: `Low-rise jeans`,
      output: `Low-rise jeans with a one-inch zipper never asked permission before introducing your thong to the whole food court. You don't owe anyone the full reveal — cover what's yours and stop calling exposure a trend.`,
      secret: `Boundary whispers: the zipper that won't stay up isn't a flaw to push through, it's the fit telling you the truth. If the role only works when you hold your breath, it was never cut for you.`,
      speaker: `Boundary puts it on speaker: say the inseam out loud — "I can do X, not Y." A clear hemline reads better than something riding up all day that everyone's politely ignoring.`,
      hangup: `Boundary says hang up: stop tugging the waistband in the mirror hoping it sits right this time. Take them off and put on the pair you can actually move in.`,
    },
    {
      object: `Caboodle`,
      output: `A Caboodle had a latch and tiers for a reason: the lift-out tray was for sharing, the bottom compartment snapped shut and stayed yours. Decide what's lift-out before you hand the whole case over.`,
      secret: `Boundary whispers: the best stuff lived in the bottom tray nobody saw, and the case still closed clean. You can keep things to yourself and not owe a tour of the lower compartment.`,
      speaker: `Boundary puts it on speaker: show people the top tray — what you're glad to share — and let the latch speak for the rest. "Here's what's open, here's what's not" is a full answer.`,
      hangup: `Boundary says hang up: the case is full and the lid's fighting you. Snap it shut on what you've got instead of forcing one more thing in to be accommodating.`,
    },
    {
      object: `Beaded curtain`,
      output: `A beaded curtain isn't a door, it's a vibe — people push straight through it clacking and call it an entrance. If your no is made of beads, hang an actual door.`,
      secret: `Boundary whispers: a beaded curtain only ever suggested privacy; everyone could still see the shape of what was behind it. A boundary you're hinting at isn't set yet — say the sentence, don't drape it.`,
      speaker: `Boundary puts it on speaker: one clear "that doesn't work for me" lands better than a curtain of soft maybes nobody can find the edge of. Quit rattling and shut the actual door.`,
      hangup: `Boundary says hang up: you keep parting the same strands hoping the conversation ends on its own. Step through and let it clack shut behind you.`,
    },
  ],
  bestie: [
    {
      object: `Tamagotchi`,
      output: `A Tamagotchi beeps because it wants something, and feeding it is rarely the same as feeding the reply-all. The urge to fire back is the beep — take a snack and a lap before you mistake it for an emergency.`,
      secret: `Bestie knows the secret: the beep gets louder the more you stare at it, and quieter the second you walk away. Put the phone face-down for ten minutes; the panic was the noise, not the news.`,
      speaker: `Bestie puts it on speaker: read the spicy draft to me first, out loud, in your real voice. You'll hear the line that needs to come out before anyone else has to.`,
      hangup: `Bestie says hang up: it beeped, you panicked, you survived. Don't answer a tiny obligation with a five-alarm reply-all — feed it tomorrow and go to bed.`,
    },
    {
      object: `Etch A Sketch`,
      output: `An Etch A Sketch let you shake the angry draft into silver dust and start the line clean. Write it hot if you need to, shake it, and send the calm one nobody has to forgive you for tomorrow.`,
      secret: `Bestie knows the secret: the dials only move one direction at a time, which is why the furious version always comes out as jagged little stairs. If the draft looks like a seismograph, shake it and redraw.`,
      speaker: `Bestie puts it on speaker: hold the rough sketch up to the group before it's permanent — half the time someone says "maybe not in writing," and that's a free shake.`,
      hangup: `Bestie says hang up: stop adding detail to a picture you already know you're going to erase. Flip it over, shake it twice, walk away.`,
    },
    {
      object: `Diary with the tiny gold lock`,
      output: `A diary had a tiny gold lock because the unhinged version was always meant to stay in there. Pour the spicy take onto that page; the email leaves with just the facts and one ask.`,
      secret: `Bestie knows the secret: the lock was flimsy and that was fine, because the point was never security — it was a place to be a person before you had to be professional. Give the rant a home that isn't the send field.`,
      speaker: `Bestie puts it on speaker: the diary page is yours; the version you'd read out loud to the room is the one that gets sent. If you'd lock it away, don't paste it.`,
      hangup: `Bestie says hang up: you've written three pages and the situation needs three sentences. Close the diary, copy nothing from it, send the clean line.`,
    },
  ],
  counsel: [
    {
      object: `Two popped collars`,
      output: `Two polos, both collars popped — at some point a layer stops being an outfit and starts being a second opinion nobody asked for. Send the one-collar version: fact, risk, recommendation, done.`,
      secret: `Counsel knows the secret: the second collar never added information, only bulk. The clause you keep adding "for context" is the second polo — peel it off and the look gets sharper.`,
      speaker: `Counsel puts it on speaker: say the one-collar version to the room and watch how fast they follow. People mistake more fabric for more authority; it's usually just warmer.`,
      hangup: `Counsel says hang up: you're popping a third collar now. Stop layering caveats onto a point that was finished two collars ago.`,
    },
    {
      object: `Delia's catalog`,
      output: `Nobody read Delia's cover to cover; you dog-eared the three pages you'd actually wear. Give them the dog-eared version — one direction, one backup, skip the catalogue.`,
      secret: `Counsel knows the secret: the magic was never the hundred pages, it was knowing which three to fold the corner on. Do the folding before the meeting so they don't have to flip through your whole brain.`,
      speaker: `Counsel puts it on speaker: hand the room the dog-eared pages, not the spine. "Here are the two we'd actually order" moves faster than a page-by-page tour.`,
      hangup: `Counsel says hang up: you've shown them every page twice and the order form's still blank. Pick the two, send it, recycle the rest.`,
    },
    {
      object: `The CD skip`,
      output: `A CD stuck on the same scratched second isn't adding meaning, it's just landing on the same note. You've made the point about what they meant; the action and the impact already landed.`,
      secret: `Counsel knows the secret: the skip isn't the song, it's the scratch — and replaying it won't smooth it out. Note the recommendation once and lift the needle off intent.`,
      speaker: `Counsel puts it on speaker: name the facts, the risk, and the call out loud, in that order, then let it run. A clean track doesn't need you nudging the disc.`,
      hangup: `Counsel says hang up: the CD's skipping on "but did they mean to" again. The action and the impact are on the table — let the meeting end.`,
    },
  ],
  // ===================== CAREER BANK =====================
  mentor: [
    {
      object: `Class ring`,
      output: `A class ring looked huge and important the year you ordered it, and most people never wore it again. Pick the move you'll still want on your hand in ten years, not the one that's flashy at the assembly.`,
      secret: `Mentor lowers her voice: everyone picked the ring by the stone size, then learned the band is what you live with. The title is the stone; ask who's actually going to back you when the shine wears off.`,
      speaker: `Mentor puts it on speaker: say the choice out loud to someone who knew you before the offer. If you can't explain why it's right without listing the perks, it might be the stone talking.`,
      hangup: `Mentor says hang up: you've turned the same ring catalogue over six times. Ask one person who's worn it what it's actually like, then decide.`,
    },
    {
      object: `Choose Your Own Adventure book`,
      output: `A Choose Your Own Adventure book let you keep a finger in the last page in case the choice went bad. Make the move you'd make without the finger holding your place — the safety flip is how you end up living someone else's chapter.`,
      secret: `Mentor lowers her voice: the kids who got the good endings stopped peeking ahead and just committed to a path. Quit reading both futures at once; pick the page and turn it.`,
      speaker: `Mentor puts it on speaker: tell a real person which page you're turning to. Said out loud, the "safe" choice you were defaulting to usually reveals itself as the boring one.`,
      hangup: `Mentor says hang up: you're flipping between page 40 and page 86 for the tenth time. Both are still there tomorrow — make the read and stop interviewing the doubt.`,
    },
    {
      object: `Time capsule`,
      output: `A time capsule is a bet on what Future You will be glad you saved, not what looked cool to bury today. Choose the move that holds up when it's dug back up, not the one that's loud right now.`,
      secret: `Mentor lowers her voice: half of what went in those capsules was trends nobody could explain a decade later. Don't bury a career choice you'll have to apologize to yourself for unearthing.`,
      speaker: `Mentor puts it on speaker: describe the decision as if you're explaining it to the person who opens the capsule. If it needs a paragraph of excuses, it's the wrong thing to seal in.`,
      hangup: `Mentor says hang up: you can plan the capsule forever or you can bury it. Pick what Future You roots for and close the lid.`,
    },
  ],
  strategist: [
    {
      object: `Dance Mix CD tracklist`,
      output: `A Dance Mix CD lived or died on track order — opener to get them in, banger second, deep cut once they trust you. Lead with the move that earns the room, not the one you're proudest of building.`,
      secret: `Strategist whispers: the pros front-loaded the hit because nobody waits through six slow tracks to reach your genius. Open on the strongest move; the rest is sequencing.`,
      speaker: `Strategist puts it on speaker: share the first three tracks of the plan and stop. If track one lands, you've got the floor for the rest.`,
      hangup: `Strategist says hang up: you've reordered the tracklist nine times in private. Burn the disc, hand it over, and let the room dance to a real version.`,
    },
    {
      object: `Sample sale`,
      output: `A sample sale rewarded the woman who got there early and moved decisively, not the one who circled the racks weighing every option. The clean early grab beats the perfect late one that's already gone.`,
      secret: `Strategist whispers: the good pieces were gone in the first twenty minutes, claimed by people who decided in the aisle. Make the call while the move is still on the rack.`,
      speaker: `Strategist puts it on speaker: announce what you're grabbing instead of narrating every rack you considered. The room doesn't need the scenic tour, it needs your pick.`,
      hangup: `Strategist says hang up: you're still holding three things in the fitting room while the line builds. Decide, grab, go — the sale doesn't wait for a perfect answer.`,
    },
    {
      object: `Pink highlighter`,
      output: `A pink highlighter only works if you mark one line; coat the whole page and you've highlighted nothing. Mark the single decision that's actually needed and let the rest stay quiet.`,
      secret: `Strategist whispers: the page already has the answer on it — your job is to make the one line impossible to skim past, not to color everything urgent.`,
      speaker: `Strategist puts it on speaker: read out only the highlighted line. "Here's the one decision" cuts faster than walking them through every paragraph you considered.`,
      hangup: `Strategist says hang up: you've highlighted the whole memo neon. Pick the one sentence that needs a yes and stop coloring.`,
    },
  ],
  steady: [
    {
      object: `Snow globe`,
      output: `A snow globe doesn't clear faster because you keep shaking it — the scene shows up once everything settles. Let the flurry land before you call the next move; panic just stirs the glitter back up.`,
      secret: `Steady knows the secret: the calm version of you was always in there, just buried under the swirl. Set the globe down for a beat and the figures come back into view.`,
      speaker: `Steady puts it on speaker: name what you can already see through the snow — the next step, the owner, the date. Saying the settled part out loud stops the room shaking the globe.`,
      hangup: `Steady says hang up: you keep picking it up to check if it's cleared, which is what keeps it cloudy. Put it down, walk off, look again when it's still.`,
    },
    {
      object: `Anti-skip Discman`,
      output: `A Discman with anti-skip continued through the bumps because it buffered a few seconds ahead instead of reacting to every jostle. Hold a little steadiness in reserve so one rough moment doesn't make the whole thing stutter.`,
      secret: `Steady knows the secret: the protection wasn't magic, it was reading ahead. Keep a calm buffer on hand and the loud meeting can't knock the track off.`,
      speaker: `Steady puts it on speaker: when the room jostles, say the steady line — "same plan, here's the next step." A level voice is the anti-skip the whole table borrows.`,
      hangup: `Steady says hang up: you're about to react to one bump like the disc's ruined. It isn't — the buffer's holding, let it continue.`,
    },
    {
      object: `Mood ring`,
      output: `A mood ring only ever reported that you were Activated; it never once recommended forwarding that to the whole team. Let the color settle back to normal before you decide anything's an emergency.`,
      secret: `Steady knows the secret: the ring read your hand temperature, not the actual situation. The "everything's on fire" feeling is body heat — check the real stakes before you sound the alarm.`,
      speaker: `Steady puts it on speaker: tell the room the temperature, not the panic. "Running warm, not urgent" keeps everyone from matching a color that's about to change anyway.`,
      hangup: `Steady says hang up: you're acting on a reading that's already fading from black back to blue. Don't create a second emergency reacting to the first in panic lip gloss.`,
    },
  ],
  sponsor: [
    {
      object: `Glitter brag folder`,
      output: `A glitter folder was where you filed the work you were proud of so it didn't end up crumpled at the bottom of the bag. A win you can't find is a win you can't be sponsored for — give it a folder.`,
      secret: `Sponsor knows the secret: the folder wasn't bragging, it was retrieval. When the right person asks what you've done, you want the page in hand, not a memory and a shrug.`,
      speaker: `Sponsor puts it on speaker: hand someone the folder and say the win plainly — the problem, the result, why it mattered. Made easy to repeat, your work travels to rooms you're not in.`,
      hangup: `Sponsor says hang up: the win's real but it's loose-leaf in the chaos. File it now, while you remember the numbers, before it's archaeology.`,
    },
    {
      object: `Bedazzler`,
      output: `A Bedazzler put your initials on the denim so there was no question whose jacket it was. Put your name on the work the same way — clearly enough that no one has to ask who did it.`,
      secret: `Sponsor knows the secret: the rhinestones didn't need to be perfect, they needed to be yours. Claim the contribution out loud; underdone credit fades faster than overdone sparkle.`,
      speaker: `Sponsor puts it on speaker: say "that was my piece" in the room where it counts. Quiet ownership reads as no ownership when the credit gets handed out.`,
      hangup: `Sponsor says hang up: you finished the jacket and left it blank to seem humble. Stud your initials on it and stop hoping someone guesses.`,
    },
    {
      object: `Morning announcements`,
      output: `The morning announcements existed so the whole building heard the thing once, instead of it living in one classroom. If only your manager knows what you shipped, it isn't announced — it's a rumor.`,
      secret: `Sponsor knows the secret: the news that traveled was the news someone read over the PA, not the news whispered in homeroom. Get your win into a channel that reaches past your own row.`,
      speaker: `Sponsor puts it on speaker: literally say it where the room hears — the result and the why, in one clean sentence built to be repeated.`,
      hangup: `Sponsor says hang up: the win's been sitting in your homeroom for a month. Read it into the announcements and let the building carry it.`,
    },
  ],
  // ===================== CONFIDENCE BANK =====================
  hype: [
    {
      object: `Platform sneakers`,
      output: `Platform sneakers gave you the height without pretending you'd grown — you just stopped shrinking. Stand at the ambition out loud; the lift was always allowed.`,
      secret: `Hype whispers: the platform felt wobbly for exactly one day, then it was just how tall you were. The new level isn't fake, it's new — give it a week before you call it too much.`,
      speaker: `Hype puts it on speaker: say the sentence at full height, like you expect them to get why it matters. Mumbling it from the flats undersells a thing you can clearly do.`,
      hangup: `Hype says hang up: you keep checking if the platforms are "too much." They're the right height — walk in them.`,
    },
    {
      object: `Glitter roll-on`,
      output: `Glitter roll-on wasn't the outfit, it was the reason people remembered the outfit. A little shine on the work isn't unserious — it's how the substance gets noticed.`,
      secret: `Hype whispers: the glitter went exactly where you wanted eyes to land. Put the shimmer on the line that matters and watch the room look right at it.`,
      speaker: `Hype puts it on speaker: deliver the win with the sparkle on, not buried in a monotone. The same fact lands twice as hard when you sound like you believe it.`,
      hangup: `Hype says hang up: stop wiping the shimmer off to seem more serious. Serious and memorable aren't enemies — leave it on and send it.`,
    },
    {
      object: `Karaoke machine`,
      output: `A karaoke machine rewards commitment, not pitch — the room roots for the woman who sells it and winces for the one apologizing into the mic. Sing the idea like you mean it; the conviction carries the note.`,
      secret: `Hype whispers: nobody remembers whether you hit every note, only whether you went for it. Commit to the bit and the room forgives the cracks.`,
      speaker: `Hype puts it on speaker: grab the mic and say it like the chorus, not the disclaimer. Confidence on the delivery is most of the performance.`,
      hangup: `Hype says hang up: you're three verses in still saying "I'm not really a singer." Drop the apology and finish the song.`,
    },
  ],
  bigbro: [
    {
      object: `Cliffs Notes`,
      output: `Cliffs Notes existed because half the class hadn't finished the reading either and everyone was bluffing the discussion. Ask the plain question; you're not the only one who skimmed.`,
      secret: `Big Bro has a secret: the kids quoting the themes loudest were usually quoting the yellow booklet, not the book. The acronym intimidating you is someone else's Cliffs Notes too.`,
      speaker: `Big Bro puts it on speaker: ask the obvious thing in the meeting, plainly. You'll watch three people exhale because they didn't read it either.`,
      hangup: `Big Bro says hang up: you've reread the summary four times trying to fake fluency. Just ask what the term means and move — bluffing is more work than asking.`,
    },
    {
      object: `Magic Eye poster`,
      output: `A Magic Eye poster had a whole crowd nodding "oh yeah, a sailboat" while half of them saw nothing but static. Say you can't see it yet — someone next to you is faking the sailboat too.`,
      secret: `Big Bro has a secret: the people who saw it fastest were the ones who admitted they couldn't, so somebody showed them how to unfocus. Asking is how you actually see the picture.`,
      speaker: `Big Bro puts it on speaker: in the room, say "I'm not seeing the sailboat yet — walk me through it." Naming the blur gives everyone else permission to stop squinting in silence.`,
      hangup: `Big Bro says hang up: you've been staring at static nodding along for ten minutes. Admit you don't see it and let someone point — that's the whole trick.`,
    },
    {
      object: `NO FEAR tee`,
      output: `A NO FEAR tee said the brave thing across your chest before you'd worked up to saying it out loud. Wear the question into the room; asking it is the bold move, not the dumb one.`,
      secret: `Big Bro has a secret: everyone owned that shirt and nobody was actually fearless — the slogan was practice. Say the scary question and the nerve grows into the tee.`,
      speaker: `Big Bro puts it on speaker: ask the bold question at full volume instead of pre-shrinking it. The room respects the woman who says it plainly, not the one who jokes it away first.`,
      hangup: `Big Bro says hang up: you're rehearsing a self-deprecating intro for a perfectly fine question. Drop it — no making yourself the joke before anyone gets a chance to be kind.`,
    },
  ],
  creative: [
    {
      object: `Lite-Brite`,
      output: `A Lite-Brite was just loose pegs in a dark box until you put them through the template and turned the light on. Your idea isn't too much — it needs the frame that lets people see the picture lit up.`,
      secret: `Creative knows the secret: the pegs were never the problem, the missing template was. Give the idea a use case and a sentence normal people can repeat, and the picture appears.`,
      speaker: `Creative puts it on speaker: don't describe the pegs, switch the thing on. A lit picture explains itself faster than you listing colors in a dark room.`,
      hangup: `Creative says hang up: you're sorting pegs by shade instead of plugging them in. Put them through the frame, hit the light, show somebody.`,
    },
    {
      object: `Polaroid`,
      output: `A Polaroid handed you proof in sixty seconds — grainy, imperfect, but there. Show the rough before-and-after now; a real picture beats a perfect one you're still describing.`,
      secret: `Creative knows the secret: nobody waited for studio quality, they waited for the image to develop and then believed it. A quick visible result is more convincing than a polished promise.`,
      speaker: `Creative puts it on speaker: hold up the before and the after side by side. "Here's the thing working" lands harder than a dramatic explanation of how it will.`,
      hangup: `Creative says hang up: you're shaking the photo a fourth time hoping it sharpens. It's clear enough to prove the point — show it and ship.`,
    },
    {
      object: `Spirograph`,
      output: `A Spirograph made a gorgeous design only after a few rough, wobbly first loops — and you needed those to see if the gear held. The messy first pass isn't failure, it's the proof the pattern works.`,
      secret: `Creative knows the secret: the wobble told you which gear and which hole, which is information you only get by drawing the bad loop. Run the rough version to learn what the clean one needs.`,
      speaker: `Creative puts it on speaker: show the wobbly first loop and say what it taught you. "Rough, but here's the pattern" invites help; a blank page invites nothing.`,
      hangup: `Creative says hang up: you're refusing to draw until the gears are perfect. Make the wobbly loop — it's the only way the real design starts.`,
    },
  ],
  coach: [
    {
      object: `Skip-It`,
      output: `A Skip-It counted every rotation on that little dial, so even a clumsy session put real numbers up. Do the small rep today; the counter doesn't care if it was graceful, only that it turned.`,
      secret: `Coach knows the secret: the kids with the high counts weren't talented, they just skipped daily and let the dial add up. Practice is the whole mechanism — show up and let it tick.`,
      speaker: `Coach puts it on speaker: say today's tiny number out loud and own it. "I did the small version" counts as practice, and saying it makes tomorrow's rep likelier.`,
      hangup: `Coach says hang up: you're waiting to feel athletic before you start skipping. The dial only moves when your foot does — one rotation now beats a perfect plan later.`,
    },
    {
      object: `Mavis Beacon Teaches Typing`,
      output: `Mavis Beacon didn't expect you to type fast on day one — she gave you "asdf jkl;" until your fingers knew it without looking. The skill comes from the boring reps, not from waiting to feel ready.`,
      secret: `Coach knows the secret: the speed showed up quietly, weeks after the drills stopped feeling like progress. Trust the unglamorous practice; the fluency is being built while you're bored.`,
      speaker: `Coach puts it on speaker: tell someone you're "still on the drills" without shame. Naming the practice phase out loud keeps you in it instead of quitting before the speed arrives.`,
      hangup: `Coach says hang up: you're refusing to type until you can do it without looking down. That's backwards — do the slow reps now and the looking-up comes free later.`,
    },
    {
      object: `After-School Special`,
      output: `An After-School Special always wrapped with the lesson learned and then let the credits roll. Take what the miss taught you and stop running the episode again.`,
      secret: `Coach knows the secret: the lesson lands in one scene, not in replaying the whole sad montage. You already absorbed it — you don't owe the moment a director's cut.`,
      speaker: `Coach puts it on speaker: say the lesson in one line — "here's what I'd do differently" — and let that be the closing scene. Spoken once, it's learned; rehearsed forever, it's a rerun.`,
      hangup: `Coach says hang up: you're cueing the painful episode for the fifth time tonight. The lesson came through clearly — roll the credits and let the scene end.`,
    },
  ],
  // ===================== AI BANK =====================
  aihelp: [
    {
      object: `Spice rack`,
      output: `A spice rack does nothing for the dish if you never reach for it — plain input cooks plain oatmeal. Specificity is the seasoning: add the audience, the tone, the example, and what "good" tastes like.`,
      secret: `AI Help has the secret: the model isn't bland on purpose, it's cooking exactly the nothing you handed it. Open the rack and actually season the ask.`,
      speaker: `AI Help puts it on speaker: read your prompt out loud and listen for the missing spices. If it's just "make it good," you've handed over salt-free everything.`,
      hangup: `AI Help says hang up: you've regenerated the same unseasoned prompt six times waiting for flavor. Add the spices once instead of reheating the oatmeal.`,
    },
    {
      object: `Cher's closet outfit-matcher`,
      output: `Cher's closet computer didn't just say "wear clothes" — it knew the pieces, the occasion, the match, and the call it was helping her make. The model works the same: give it the context before you ask it to pick.`,
      secret: `AI Help has the secret: the software looked magic because the inputs were thorough — every item logged, every event tagged. Feed the prompt that much context and it dresses the answer right.`,
      speaker: `AI Help puts it on speaker: say the occasion out loud — "this is for that audience, this tone, this constraint." Named, the tool stops guessing and starts matching.`,
      hangup: `AI Help says hang up: you're mad it picked the wrong outfit from "make me look professional." Tell it the event, then let it choose.`,
    },
    {
      object: `Easy-Bake Oven`,
      output: `An Easy-Bake Oven gave you back exactly the sad little packet you put in — light bulb heat can't fix a bad mix. Vague in, beige out; the fix is a better mix, not another bake.`,
      secret: `AI Help has the secret: kids blamed the oven when the packet was the problem. The model's "result" is your prompt baked — improve the mix before you blame the heat.`,
      speaker: `AI Help puts it on speaker: describe the cake you actually want before you press start. "Make dessert" and "make this specific thing" come out of the same little oven very differently.`,
      hangup: `AI Help says hang up: you've baked the same flavorless packet four times expecting cake. Change the mix once.`,
    },
  ],
  research: [
    {
      object: `Encarta CD-ROM`,
      output: `Encarta felt like the whole world on one disc, but the disc had a year stamped on it and stopped knowing anything after that. A confident answer with no date is last year's CD insisting it's current.`,
      secret: `Research whispers: the smart kids checked the edition before quoting it, because the '95 disc didn't know what happened in '98. Ask what date the answer is frozen at before you trust it.`,
      speaker: `Research puts it on speaker: say the source and the date out loud with the finding. "According to this, as of this year" is the difference between research and a vibe.`,
      hangup: `Research says hang up: you're citing the shiny answer without checking which edition it's from. Find the date, find the source, then decide if it still holds.`,
    },
    {
      object: `Chain email`,
      output: `A chain email swore it was true, urgent, and verified — "forward to ten people" — and sourced none of it. Confident and anonymous is how bad information travels; ask who actually said it before you pass it on.`,
      secret: `Research whispers: the all-caps urgency was doing the persuading because the facts couldn't. When an answer pressures you to act fast and skip the source, that's the tell.`,
      speaker: `Research puts it on speaker: before the room forwards the claim, ask out loud where it came from. One "who's the source?" stops a chain that ten reply-alls would've spread.`,
      hangup: `Research says hang up: you're about to forward something because it sounds right and arrived confident. Don't — find the original or let it die in your inbox.`,
    },
    {
      object: `Note cards`,
      output: `The research project that actually worked had a source on every note card, so the bibliography wrote itself. Collect the proof as you go, not the links — one sourced card beats a folder of someday-useful tabs.`,
      secret: `Research whispers: the A wasn't the stack of cards, it was that each one named where it came from. Write the source on the card now or you'll have facts you can't stand behind later.`,
      speaker: `Research puts it on speaker: when you share the finding, read the card — claim plus where it's from. A takeaway with its source attached is one nobody can wave away.`,
      hangup: `Research says hang up: you've got forty tabs open and not one noted source. Stop collecting links like lip gloss — decide what evidence would change the plan and card that.`,
    },
  ],
  wildcard: [
    {
      object: `Scented markers`,
      output: `A scented marker's whole pitch was to get you huffing grape instead of drawing with it. Fun was never the assignment — cap the demo and do the actual work the marker's for.`,
      secret: `Wildcard whispers: the novelty smell wore off in a week and you were left with a marker that either wrote or didn't. Keep the weird idea only if it still works once it stops being exciting.`,
      speaker: `Wildcard puts it on speaker: pitch the unexpected option and the practical reason it belongs, not just the cool smell. "Weird, but here's what it solves" is how it survives the room.`,
      hangup: `Wildcard says hang up: you're three markers deep sniffing instead of drawing. Pick the one that actually writes and make the thing.`,
    },
    {
      object: `Lip Smackers`,
      output: `Lip Smackers smelled exactly like Dr Pepper and that never once made them a drink. Tempting isn't the same as useful — wanting the shiny option doesn't mean it solves the problem.`,
      secret: `Wildcard whispers: you knew it wasn't soda, you just liked that it smelled like it. Be honest about which ideas you love because they're fun versus which ones earn their place.`,
      speaker: `Wildcard puts it on speaker: say why the fun option works, out loud, before you commit to it. If the only argument is "but it's delicious," it's a lip gloss, not a plan.`,
      hangup: `Wildcard says hang up: you're about to act on something because it's tempting, not because it works. Set it down — smelling like a snack isn't being one.`,
    },
    {
      object: `Magic 8 Ball`,
      output: `A Magic 8 Ball gave you a confident "Reply hazy, try again" and zero accountability for it. A vague idea with a mysterious delivery still has to survive daylight — pin it down before you bet on it.`,
      secret: `Wildcard whispers: people shook the 8 Ball to outsource a call they already half-knew. Don't dress an unformed idea as fate — make it specific enough to defend in the meeting.`,
      speaker: `Wildcard puts it on speaker: turn the hazy hunch into one concrete sentence before you say it to the room. "Outlook good" isn't a proposal; the specific version is.`,
      hangup: `Wildcard says hang up: you keep reshaking the same foggy idea hoping it firms up. It won't on its own — write the clear version or let it go.`,
    },
  ],
  builder: [
    {
      object: `Label maker`,
      output: `A label maker meant you printed "PERMISSION SLIPS" once and stuck it on, instead of relettering the bin every week. If you're handwriting the same thing on repeat, it wants a label, not your patience.`,
      secret: `Builder whispers: the satisfying part wasn't the printing, it was never having to think about that drawer again. Make the template once and buy back every future version of the task.`,
      speaker: `Builder puts it on speaker: show the thing you keep redoing and say "this gets a label." Naming the repeat is the first step to never doing it by hand again.`,
      hangup: `Builder says hang up: you're rewriting the same header on the tenth document. Print the label, stick it, stop.`,
    },
    {
      object: `Friendship bracelet loom`,
      output: `A bracelet loom set the pattern once and then the same pattern came out every time, no re-counting threads per bracelet. When a template keeps repeating, it's asking for a loom — a tool that runs the pattern for you.`,
      secret: `Builder whispers: the loom kids made twenty bracelets while the hand-knotters made three. Once the pattern's proven, the move is to mechanize it, not to keep tying.`,
      speaker: `Builder puts it on speaker: show the workflow, the stuck point, and the part the tool now runs. A demo of the loom doing the knots convinces faster than describing the knots.`,
      hangup: `Builder says hang up: you're hand-tying the same pattern for the fiftieth time because setting up the loom feels intimidating. Set it up once — the fifty-first is free.`,
    },
    {
      object: `Photocopier`,
      output: `Somebody figured out the copier so the whole class didn't hand-copy the study guide — one original, thirty copies, done. If you're recreating the same thing from scratch each time, you're hand-copying what the machine could run off.`,
      secret: `Builder whispers: the kid at the copier looked lazy and finished first. Build the original well once, then let the copies do the volume.`,
      speaker: `Builder puts it on speaker: hold up the master and say "this is the one we copy from now." A shared original ends thirty people quietly redoing the same page.`,
      hangup: `Builder says hang up: you're handwriting copy number twelve. Make a clean master, hit the button, walk away.`,
    },
  ],
  // ===================== LEADERSHIP BANK =====================
  boss: [
    {
      object: `Desk nameplate`,
      output: `A nameplate on the desk didn't apologize for being there — it just said whose call this was. Put your recommendation where your name is: out front, not buried in paragraph four.`,
      secret: `Boss whispers: the plate was warm wood and brass and still completely unambiguous about authority. You can be kind and be the decision-maker — the two were never opposites.`,
      speaker: `Boss puts it on speaker: lead with the business reason, the tradeoff, and what you need from the room. Said first, your point reads as a position; said last, it reads as a hope.`,
      hangup: `Boss says hang up: you've written three softening sentences before the actual ask. Cut them — the nameplate doesn't preface itself with "sorry to be a bother."`,
    },
    {
      object: `Red pen`,
      output: `A red pen made the call visible — circled, marked, no guessing what the teacher actually thought. Make your recommendation in red: clear enough that nobody has to decode where you land.`,
      secret: `Boss whispers: the red wasn't unkind, it was legible. Hedged feedback in faint pencil helps no one — say what you'd change and why.`,
      speaker: `Boss puts it on speaker: state the mark out loud — "here's my recommendation, here's the reason." A circled answer ends the meeting faster than a margin full of maybes.`,
      hangup: `Boss says hang up: you're writing "just a thought!" next to a real correction. Make the mark in red and own it.`,
    },
    {
      object: `"Is that your final answer"`,
      output: `The show made you commit — "is that your final answer?" — because a locked-in answer is worth more than ten you're still hedging. Give the room the locked-in version, not the survey of every option you considered.`,
      secret: `Boss whispers: the contestants who won stopped polling the audience and committed. At some point the recommendation is yours to lock — make it the final answer.`,
      speaker: `Boss puts it on speaker: say "this is my recommendation" and stop there. Tacking on "but I could be wrong" unlocks the answer you just locked.`,
      hangup: `Boss says hang up: you keep reopening a decision you already made to seem open-minded. Lock it — final answer, support it, close it.`,
    },
  ],
  founder: [
    {
      object: `Lemonade stand`,
      output: `A lemonade stand didn't wait for a storefront — a card table and a sign taught you fast whether anyone would actually stop. Ship the scrappy version; the corner tells you more than the business plan does.`,
      secret: `Founder whispers: the kids who learned the most had a wobbly table out by noon, not a perfect one by never. The rough stand is real research as long as someone walks past it.`,
      speaker: `Founder puts it on speaker: name the customer, the problem, the promise, and the smallest proof you can stand up this week. Said plainly, the stand goes from idea to open.`,
      hangup: `Founder says hang up: you're designing the perfect stand in the garage where no one can buy from it. Drag the table to the curb and pour a cup.`,
    },
    {
      object: `Mall kiosk`,
      output: `A mall kiosk tested the whole business from a cart in the walkway before anyone signed a store lease. Put the offer where people already are and watch if they stop — that's the proof a pitch deck can't give you.`,
      secret: `Founder whispers: the cart was cheap on purpose, because the point was the foot traffic's reaction, not the fixtures. Test the promise small before you build the storefront around it.`,
      speaker: `Founder puts it on speaker: say the one-line pitch to actual passersby and read their faces. A real "no thanks" teaches you more than a room of polite nods.`,
      hangup: `Founder says hang up: you're refining the cart instead of rolling it out. The market can't react to a secret — open the kiosk.`,
    },
    {
      object: `Demo tape`,
      output: `A demo tape was rough on purpose — you sent it to find out if anyone wanted the sound, not to sound finished. Send the rough cut; the reactions tell you what the real version should be.`,
      secret: `Founder whispers: the bands who made it mailed the imperfect tape early instead of polishing it into a drawer. The scrappy recording is allowed to be real if it teaches you the next track.`,
      speaker: `Founder puts it on speaker: show the rough cut for real listeners and ask what landed. "Here's the demo, what do you think" beats describing a song nobody's heard.`,
      hangup: `Founder says hang up: you've re-recorded the demo eight times and mailed it zero. Send the rough one and let the response write version two.`,
    },
  ],
  // ===================== OPERATIONS BANK =====================
  operator: [
    {
      object: `Trapper Keeper`,
      output: `A Trapper Keeper kept every subject in its labeled folder so nothing depended on remembering where you shoved it. A process that lives in one person's head isn't organized, it's a hostage — give it folders.`,
      secret: `Operator whispers: the kid with the Trapper Keeper never lost the worksheet, not because she was smarter, but because the system held it. Build the holder so the task doesn't ride on anyone's memory.`,
      speaker: `Operator puts it on speaker: name the folders out loud — owner, input, output, deadline, receipt. Spoken, the choreography stops being "ask Karen" and starts being a process.`,
      hangup: `Operator says hang up: the whole thing works only because you remember it, which means it breaks the day you're out. Write it into folders before it takes a sick day.`,
    },
    {
      object: `Hall monitor sash`,
      output: `A hall monitor sash made it obvious who was responsible for the hallway — no sash, no clarity, just kids wandering. Pin the owner on the task the same way; "someone will handle it" means no one will.`,
      secret: `Operator whispers: the hallway ran because one named person wore the sash, not because everyone vaguely cared. Assign the sash and the wandering stops.`,
      speaker: `Operator puts it on speaker: say who's wearing the sash for this — by name, out loud. An owner named in the room is an owner; an owner implied is a gap.`,
      hangup: `Operator says hang up: you're hoping the hallway monitors itself. It won't — hand someone the sash and let them own it.`,
    },
    {
      object: `Substitute's lesson plan`,
      output: `A good substitute plan let a total stranger run the class because every step was written down. Document the task so the boring written version works without you in the room — that's the build, not the heroics.`,
      secret: `Operator whispers: the teachers who never got frantic calls on a sick day were the ones who wrote the plan a stranger could follow. The unglamorous documentation is what buys you a day off.`,
      speaker: `Operator puts it on speaker: walk someone through the plan and watch where they get stuck — that's the step you forgot to write. Run it out loud before you rely on it.`,
      hangup: `Operator says hang up: you're about to save the day with personal heroics again. Write the plan a sub could run and stop being the only one who can teach the class.`,
    },
  ],
  product: [
    {
      object: `The Clapper`,
      output: `The Clapper had one job and a slogan to match — clap, the lamp goes on. The user doesn't care about the circuitry; they care that the clap does the thing, every time.`,
      secret: `Product knows the secret: the Clapper sold because it was dead simple, not because it was clever inside. Judge the work by whether the obvious action gets the obvious result.`,
      speaker: `Product puts it on speaker: state it as problem, user, moment, expected behavior — "she claps, the light comes on." Said that way, the gap between promise and reality gets loud.`,
      hangup: `Product says hang up: you're explaining the wiring to someone whose clap didn't turn on the light. Fix the clap-to-light path before you describe the engineering.`,
    },
    {
      object: `Furby`,
      output: `A Furby had a dozen features and most kids couldn't figure out how to make it do the one thing they wanted. Piling on functions doesn't make a product better — it buries the button that mattered.`,
      secret: `Product knows the secret: nobody read the Furby manual, they just wanted it to talk back on command. Every extra feature is one more thing standing between the user and the point.`,
      speaker: `Product puts it on speaker: name the one job people actually want, out loud, and check if it's easy. If the headline feature needs a manual, the feature count is the problem.`,
      hangup: `Product says hang up: you're adding a new Furby mode to avoid fixing the confusing one. Stop — cut a feature, clarify the main thing.`,
    },
    {
      object: `Blinking VCR 12:00`,
      output: `Half the VCRs in the country blinked 12:00 forever because the one setup step was too confusing to bother with. The flashing clock is your confusing feature — nobody's using it, they're just living around it.`,
      secret: `Product knows the secret: people didn't hate the clock, they couldn't find the setting, so they tuned it out. The thing users silently ignore is usually the thing that's too hard, not unimportant.`,
      speaker: `Product puts it on speaker: point at the blinking 12:00 and ask why no one's set it. Naming the ignored feature out loud surfaces the confusion everyone's been politely tolerating.`,
      hangup: `Product says hang up: you're adding a second clock instead of making the first one settable. Fix the step that makes it blink and the 12:00 stops.`,
    },
  ],
  // ===================== VOICE BANK =====================
  comms: [
    {
      object: `AIM away message`,
      output: `An AIM away message that said "brb" told no one when you'd be back or what you were doing. "Just circling back" is a brb — say the actual thing: what you need and by when.`,
      secret: `Comms whispers: the good away messages told people something real; the lazy ones just announced you were vague. Write the version that says where you went, not that you left.`,
      speaker: `Comms puts it on speaker: read the message out loud and hear if a person wrote it. If it sounds like a status nobody can act on, rewrite it until it sounds like you talking.`,
      hangup: `Comms says hang up: you're about to send "just following up!" for the third time. Say "I need a decision by Thursday" — the away message wasn't a substitute for the actual message.`,
    },
    {
      object: `Beeper code`,
      output: `A beeper code made the other person decode "143" before they knew what you meant — cute between friends, useless at work. Stop sending the code; send the words. Headline first, then the ask.`,
      secret: `Comms whispers: the codes worked only because both people had already agreed what they meant. At work nobody has your codebook — say the plain message instead of the number.`,
      speaker: `Comms puts it on speaker: lead with the headline, then the ask, then details only where they earn a seat. A clear message doesn't make the room translate it.`,
      hangup: `Comms says hang up: you've sent three cryptic pings hoping they'll read your mind. Drop the code and type the sentence.`,
    },
    {
      object: `Mad Libs`,
      output: `Mad Libs sounded official and meant nothing — fill the corporate blanks with any noun and it reads like every beige memo. If your message is "leverage synergies going forward," you've written a Mad Lib. Say the real thing.`,
      secret: `Comms whispers: the comedy was that the structure stayed identical no matter the words, which is exactly the problem with consultant-speak. Strip the template and write what you actually mean.`,
      speaker: `Comms puts it on speaker: read it aloud and notice where the nouns are interchangeable. Anywhere you could swap in a random word and lose nothing is a blank to cut.`,
      hangup: `Comms says hang up: you're filling in jargon blanks to sound senior. Delete the Mad Lib and tell them the one real thing.`,
    },
  ],
  closer: [
    {
      object: `Drive-thru window`,
      output: `A drive-thru window worked because you placed the order, confirmed it, and pulled forward — it didn't end with "anyway, thoughts?" Close the same way: state the decision and move the line.`,
      secret: `Closer knows the secret: the speaker box read your order back so there was no ambiguity at the window. End with the confirmed order — decision, owner, deadline — not an open question.`,
      speaker: `Closer puts it on speaker: say it like the confirm — "so that's the decision, you own it, due Friday." Read back, it's locked; left open, it's a car idling at the menu.`,
      hangup: `Closer says hang up: you've reached the window and you're still browsing the menu out loud. Place the order, confirm it, pull forward.`,
    },
    {
      object: `End credits`,
      output: `End credits told you the movie was over — house lights, names rolling, time to go. Give the message an ending that signals done: the next step, not a wistful fade to "let me know."`,
      secret: `Closer knows the secret: a film without credits just leaves the audience sitting in the dark unsure if it's over. Your last line is the credits — make it clearly the end with a clear next move.`,
      speaker: `Closer puts it on speaker: say the closing line like the credits rolling — decision, owner, deadline, next step, then quiet. Trailing off keeps everyone in their seats.`,
      hangup: `Closer says hang up: you keep adding one more scene after the story's done. Roll the credits — say what's next and stop typing.`,
    },
    {
      object: `Sign-here X`,
      output: `The little X on a form told you exactly where to sign — no hunting, no "wherever feels right." End with the X: the one clear action you need, not a vague invitation to react.`,
      secret: `Closer knows the secret: the X existed because a blank page gets you a blank back. Point to the exact line you need signed — approve, decline, decide — and people do it.`,
      speaker: `Closer puts it on speaker: name the action like the X — "I need your approval on this by end of day." A specific ask gets a specific answer; "thoughts?" gets a shrug.`,
      hangup: `Closer says hang up: you ended with "thoughts?" when what you need is a signature. Draw the X and ask for the yes.`,
    },
  ],
  // ===================== EVIDENCE BANK =====================
  finance: [
    {
      object: `Calculator watch`,
      output: `A calculator watch looked impressive and the buttons were too tiny to actually compute anything under pressure. A number that can't be checked isn't persuasive — make the math big enough to read and verify.`,
      secret: `Finance whispers: the watch was for looking precise, not being precise. If your figure only works when nobody zooms in, it's a calculator watch — redo it where the buttons are real.`,
      speaker: `Finance puts it on speaker: state what changed, what it costs, what it saves, and what happens if nobody moves. Four clear numbers beat one tiny impressive-looking total.`,
      hangup: `Finance says hang up: you're flashing a precise-looking number you can't actually defend. Take it off the wrist and work it where it can be checked.`,
    },
    {
      object: `The Price Is Right`,
      output: `On the show, the closest bid won, but the bids that blew it were the ones anchored to an old price. If your numbers are persuading the room, check they're not priced to last season's assumptions.`,
      secret: `Finance whispers: the sharp players updated the value in their head before bidding instead of guessing from memory. Re-price the assumptions before you put the figure on stage.`,
      speaker: `Finance puts it on speaker: say the number and what it's based on. "This assumes X, as of now" lets the room catch a stale price before it costs you the showcase.`,
      hangup: `Finance says hang up: you're bidding last year's price with total confidence. Update the assumption, then make the call.`,
    },
    {
      object: `Layaway`,
      output: `Layaway showed you the real cost — the total, the weekly payment, and what you walked away with if you stopped. Show the money the same way: the cost, the savings, and what it means to do nothing.`,
      secret: `Finance whispers: layaway was honest because it spelled out the full price up front, not just the cute weekly number. Put the whole cost on the table, not the comfortable installment.`,
      speaker: `Finance puts it on speaker: lay out one table — what it costs, what it saves, what nobody-moves looks like. One clear table with one takeaway ends the spreadsheet fog.`,
      hangup: `Finance says hang up: you're showing the small weekly number and hiding the total. Put the real cost up and let the decision be honest.`,
    },
  ],
  data: [
    {
      object: `Flying-toasters screensaver`,
      output: `Flying toasters looked busy and meant absolutely nothing — motion is not information. A chart with no takeaway is a screensaver with opinions; say what changed and why anyone should care before lunch.`,
      secret: `Data knows the secret: the screensaver only kicked in when nothing was actually happening. A dashboard that's all animation and no answer is the same idle screen — give it a point.`,
      speaker: `Data puts it on speaker: skip the pretty chart and say the takeaway out loud — "this went up, here's why it matters." If you can't say it in a sentence, it's toasters.`,
      hangup: `Data says hang up: you're polishing the visuals on a slide that doesn't conclude anything. Stop animating and write the one line it's supposed to prove.`,
    },
    {
      object: `Connect-the-dots`,
      output: `A connect-the-dots was nonsense until you drew every line — one dot told you nothing about the picture. One number isn't the story; show the dots in order so the shape actually appears.`,
      secret: `Data knows the secret: people who skipped to dot fifteen drew the wrong animal. The single impressive stat is one dot — connect it to the rest before you announce what it is.`,
      speaker: `Data puts it on speaker: walk the dots in sequence — source, date, caveat, takeaway. Said in order, the picture's obvious; one number alone, everyone guesses a different animal.`,
      hangup: `Data says hang up: you're holding up dot number one like it's the whole drawing. Connect it or don't claim the picture.`,
    },
    {
      object: `Nielsen ratings box`,
      output: `A Nielsen box in a few thousand homes claimed to speak for the whole country — useful, but only if you remembered it was a sample. Don't let one number cosplay as everyone; say what it represents and what it doesn't.`,
      secret: `Data knows the secret: the ratings were powerful because people stated the sample size and the margin, not despite it. Name the caveat and the number gets more trustworthy, not less.`,
      speaker: `Data puts it on speaker: give the source, the date, the caveat, the takeaway. "This is the sample, here's what it suggests" is honest data; the bare number is a guess in a suit.`,
      hangup: `Data says hang up: you're reporting a few thousand homes as the whole nation. Add the caveat or stop letting the one box speak for everyone.`,
    },
  ],
  // ===================== DEB (hidden, *67-gated) =====================
  deb: [
    {
      object: `Newspaper word search`,
      output: `You dialed Deb. Deb saw your name, let it ring, and went back to the word search she's been working on since the Tuesday meeting. "Not in my job description" — and nobody's ever been able to prove what is.`,
      secret: `Deb's secret: she circled FUNGIBLE twelve minutes ago and has not looked up since. Whatever you need, it is page six of the Lifestyle section's problem now.`,
      speaker: `Deb puts it on speaker by accident, you hear pencil scratching and a long sip of coffee, then: "...is someone there?" She knew. She's already back to the puzzle.`,
      hangup: `Deb says hang up: she's found PARADIGM, SYNERGY, and OFFSITE in the grid and considers that her contribution for the quarter. Click.`,
    },
    {
      object: `Jammed printer`,
      output: `Deb answered, said "oh, that's printing weird again," and walked away from the machine mid-job like she does every time. The printer is your problem now. Deb has gone to lunch. It's 10:40 a.m.`,
      secret: `Deb's secret: she knows exactly which tray it is. She has always known. Telling you would set a precedent, and precedents lead to people expecting things.`,
      speaker: `Deb puts it on speaker so the whole floor can hear her not fix it: "yeah, IT's aware." IT is not aware. IT has been not-aware since 2019.`,
      hangup: `Deb says hang up: there's a flashing orange light and a line forming and Deb is already three hallways away. You will never catch her. No one ever has.`,
    },
    {
      object: `The *67 static`,
      output: `You blocked your number and Deb actually picked up — then the second she clarified it was a work question, the line "went bad." *kssssht* "...you're breaking up... *kssht* ...losing you—" It's a landline, Deb. The call quality is fine.`,
      secret: `Deb's secret: the static is her mouth. She's been doing the fake-bad-connection bit since the fax era and it has carried her through four reorgs untouched.`,
      speaker: `Deb puts it on speaker and the static gets worse, somehow, which is impressive for a sound a person is making with her own face. "*kssht* ...can you email me—" You can't. She knows.`,
      hangup: `Deb says hang up: "—going through a tunnel—" She's at her desk. She has not moved. The tunnel is conceptual. Click.`,
    },
  ],
};
