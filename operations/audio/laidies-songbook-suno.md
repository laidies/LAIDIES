# LAiDIES Songbook — Suno lyrics + style prompts

**Purpose:** the canonical text of every LAiDIES song. Most of these existed *only*
as finished `.mp3` files in `content/music/` — the lyrics lived nowhere. This file
is the source of truth so a lost drive can't erase them, and so we can regenerate,
cover, or reprise any track exactly.

**Preserve the phonetic spellings.** Intentional Suno-safe respellings ("reed it,"
"red the episode," "why two kay," "Eye-Tee," "Mary Clarence") are kept as-is because
they produced the takes we shipped. Don't "correct" them.

---

## The saint-song engine (how these are written)

Reverse-engineered from the four Ali flagged as favorites (David, Miranda, Blend &
Snap, the anthems). Every good one runs this engine:

1. **Hook = the lesson + the saint's name, chanted, with an echo answer.**
   - "be specific like **David**! *(like David!)*"
   - "standards like **Miranda** *(that's all)*"
   - "down at the **Blend & Snap** *(the blend and snap!)*"
2. **Verses teach one concrete AI mechanic** through the character — never
   abstract uplift. David = vague prompt → disaster. Miranda = fast ≠ good, check
   the invented numbers. Each saint owns *one specific AI truth*.
3. **Catchphrases yes, plot no.** Miranda's is stuffed with "florals? for spring?"
   and "the cerulean." "Don't sing about the movie" means don't *narrate the plot*
   (no Reno, no mob) — iconic lines are welcome as texture.
4. **Genre is characterization.** Icy synth-pop *because* Miranda's icy; nervy
   new-wave *because* David's nervy; gospel *because* Deloris builds a choir.
5. **Bridge lands the thesis dry, not cheesy.** David: "garbage in, a garbage
   gown." Miranda: "the standard isn't cruelty — it's the care."
6. **Outro = a spoken character-signature button.** David: "there. was that…
   specific? …yes." Miranda: "…fix it. (that's all.)"

Each saint = **her character + her one AI truth, fused.** See
`operations/saint-card-back-depth.md` for every saint's canonical AI lesson.

---

## Band credits (see `bands-roster-canon`)

| Song | Band | Genre |
|---|---|---|
| David Rose | **Chain of Thought** | nervy new-wave / Talking Heads |
| Miranda Priestly | **Latent Space** | icy 80s synth-pop |
| Deb (Loop Me Out) | **Latent Space** | cold synth-pop, heavy auto-tune |
| Down at the Blend & Snap | **The Recalls** | mid-2000s acoustic pop-R&B shuffle |
| Sister Mary Clarence (Deloris) | **Ground Truth** *(proposed — gospel)* | 90s gospel choir |

---

# ============================================================
# SAiNT SONGS
# ============================================================

## David Rose — PATRON SAiNT of Specificity
**Band:** Chain of Thought · **Status:** SHIPPED (`saint-david-rose.mp3`)
**AI truth:** vague in, vague out — say exactly what you want.

**Style (Suno):**
```
Late-70s/80s new wave, Talking Heads style, jittery funk-guitar stabs, hyperactive busy bassline, angular off-kilter rhythm, nervous twitchy female vocal half-spoken and yelping, art-punk energy, ~120 BPM, anxious and danceable, quirky and tight
```

**Lyrics:**
```
[Intro]
(twitchy guitar stab... bass fidget)
just— just fold it in! — fold WHAT in?!

[Verse 1]
You said "make it better" and you walked away,
(walked away!)
came back to a disaster, now you've got nothing to say,
(nothing to say!)
the tool's not bein' difficult, it isn't bein' rude —
it just does not know what "better" means to YOU!

[Pre-Chorus]
"fix it!" "make it nice!" "you know the thing I mean!" — (I don't!)
the vaguest little ask gets the saddest little scene —

[Chorus]
be specific like David! (like David!)
say exactly what you want or you're not gonna make it! (gonna make it!)
"fold in the cheese" means nothing on its own —
tell it how, tell it why, or you're foldin' all alone!
be specific like David! — spell the whole thing out!
(that's— that's what it's all about!)

[Verse 2]
Tone and the audience, the format and the length,
(the length!)
the thing you're really after, that's where it finds its strength,
(its strength!)
not "professional" — professional for WHO?
the instruction is the difference, it was never the tool!

[Pre-Chorus]
eyebrow up, he's gonna tell you it's a no,
a lazy little prompt is a beige little show —

[Chorus]
be specific like David! (like David!)
say exactly what you want or you're not gonna make it! (gonna make it!)
"fold in the cheese" means nothing on its own —
tell it how, tell it why, or you're foldin' all alone!
be specific like David! — spell the whole thing out!
(that's— that's what it's all about!)

[Bridge]
(spoken, flustered, building)
"ew" is what you get when the ask is unclear —
garbage in, a garbage gown, oh dear, oh dear —
don't you be betrayed when "make it good" goes wrong...
(you never! said! what! good! was!) — all along! — GO!

[Chorus]
be specific like David! (like David!)
say exactly what you want or you're not gonna make it! (gonna make it!)
"fold in the cheese" means nothing on its own —
tell it how, tell it why, or you're foldin' all alone!
be specific like David! — spell the whole thing out!
(that's— that's what it's all about!)

[Outro]
(twitchy guitar out)
there. was that... specific?
...yes.
(fold it in!)
```

---

## Miranda Priestly — PATRON SAiNT of Standards
**Band:** Latent Space · **Status:** SHIPPED (`saint-miranda-priestly.mp3`)
**AI truth:** don't approve the fast, fine first draft — raise the bar, check the invented details.

**Style (Suno):**
```
80s synth-pop, Eurythmics Sweet Dreams style, cold hypnotic synth-bass ostinato, icy drum-machine pulse, controlled detached female alto delivered like edicts, austere and commanding, ~125 BPM, regal and a little menacing, glossy minimal production
```

**Lyrics:**
```
[Intro]
(synth-bass pulse... cold)
...that's all.

[Verse 1]
You brought the first draft in and you called the whole thing done,
it came back fast — but fast and good are never quite the same one,
beige little nothing in a beige little frame,
"it's finished" isn't the answer to the question, all the same...

[Pre-Chorus]
look again. look closer. is it actually right? —
the hands, the invented numbers, the thing that's not quite right...

[Chorus]
standards like Miranda — that's all, that's all,
florals? for spring? — you'll do better than that, after all,
raise it, redo it, it isn't done, it's near,
standards like Miranda, oh, make it crystal clear...
(that's all.)

[Verse 2]
You think the cerulean was random? nothing here's by chance,
every choice was chosen — that's the difference, that's the dance,
don't approve it 'cause it's quick, don't approve it 'cause you're tired,
"good enough" is how the beige little nothing gets admired...

[Pre-Chorus]
a clean delivery is not a clean result —
check it like a cover, not a thing you throw in a vault...

[Chorus]
standards like Miranda — that's all, that's all,
florals? for spring? — you'll do better than that, after all,
raise it, redo it, it isn't done, it's near,
standards like Miranda, oh, make it crystal clear...
(that's all.)

[Bridge]
(spoken, glacial, over the pulse)
by all means... move at a glacial pace...
or look again, and put the right thing in its place...
the standard isn't cruelty — it's the care...
you don't ship the beige... and pretend it isn't there...

[Chorus]
standards like Miranda — that's all, that's all,
florals? for spring? — you'll do better than that, after all,
raise it, redo it, it isn't done, it's near,
standards like Miranda, oh, make it crystal clear...
(that's all.)

[Outro]
(synth-bass fades, cold)
...details of your incompetence do not interest me.
...fix it.
(that's all.)
```

---

## Sister Mary Clarence (Deloris) — PATRON SAiNT of Teaching
**Band:** The Embeddings *(R&B/soul family — closest to 60s Motown; a band can carry
multiple songs, so no new band needed)*
**Status:** SHIPPED — `saint-sister-mary-clarence.mp3` + `ksvl-transitions/dj-sunnyv-intro-saint-sister-mary-clarence.mp3`, wired into `ksvl-player.js` (PATRON SAiNTS mix). Produced in Suno via 2-part Extend. Portrait exists.
**AI truth:** help others and bring them along — share what you learn, teach it
forward, the whole community levels up. Community over solo.

**Genre ruling (hard-won):** Sister Act's real sound is **1960s Motown / girl-group
pop** ("I Will Follow Him," "My Guy," "Hail Holy Queen" flipping from hymn to a bop)
— up-tempo and catchy, NOT gospel, NOT country, NOT a ballad. Earlier gospel and
"When You Believe" ballad drafts were rejected: slow, boring, country-tinged, and
Suno kept adding crowd cheering. Character = fused with the lesson: she takes a flat,
scared choir and gets them ALL singing = bring everyone along.

**Style (Suno):**
```
Opens A CAPPELLA — traditional hymnal choir, slow free-tempo church hymn, no instruments, no beat, no clapping — THEN the full band kicks in: 1960s Motown girl-group pop, Sister Act "I Will Follow Him" style, up-tempo and catchy, hand-claps, tambourine, driving backbeat, bright electric piano and horns, big sassy lead with a full choir of backing sisters, key-change lift into the final chorus, ~130 bpm from the drop, POP and Motown NOT gospel NOT country NOT a ballad, clean studio recording, no audience, no crowd noise, no applause
```

**PRODUCTION — build in two pieces (Suno won't hold a cappella then switch tempo in one gen):**
1. Generate ONLY the hymn intro as its own clip — lyrics = just the 4 hymn lines;
   style = `a cappella traditional hymnal choir, slow, free tempo, no instruments, no beat, no percussion, reverberant church, sustained`.
2. **Extend / Continue** from that clip; paste from `[Pre-Verse 1]` on with the Motown
   style prompt. The band enters out of the a cappella. (Single-gen inline tags keep
   dropping the beat right after "Maria" — the split is the reliable fix.)

**Note on the hymn intro:** Ali's final uses the traditional "Hail Holy Queen"
wording, generated as its own a cappella clip (Extend then Get Whole Song). If Suno's
copyright filter flags it again, swap in an original hymn ("Rise... oh sisters... lift
your voice on high... / alone no more... / let the lonely and the trembling come... /
and the many shall sing as one...") — same job, unflaggable.

**Lyrics (FINAL — Ali 2026-07-15):**
```
[Intro — A CAPPELLA hymnal choir, slow, free tempo, NO instruments, NO drums, NO beat, NO claps, reverberant church]
Hail... Holy... Queen... en-throned a-bove...
Ohhhh Ma-reeee-ahhhh...
Hail... Mo-ther of mer-cy... and of love...
Ohhhh Ma-reeee-ahhhh...

[Pivot — full band SLAMS in: drums, hand-claps, tambourine, tempo snaps up]
Sal-vay (sal-vay!) sal-vay! (sal-vay!) sal-vay Re-gee-nahhhh — whoo!

[Verse 1]
(Motown groove, dry and sassy, fast)
Miss Mary Clarence got a choir that could not hold a note,
scared little sisters in the back with a whisper in their throat —
she said "I'm not gonna sing it FOR you — no, that ain't the plan,
you gon' sing it with me, then you teach the next one how you can!"

[Pre-Chorus]
(claps building)
'cause one little voice can only carry so far —
but a whole choir together, — you hear how big we are —
(here we go!)

[Chorus]
Come on — bring her along! (bring her along!)
don't leave a single sister in the back singin' wrong! (singin' wrong!)
what you learn, you teach — that's how we get STRONG —
it's a SISTER ACT, baby — everybody sing along!
(na-na-na — bring her along!)
(na-na-na — bring her along!)

[Verse 2]
One nun learns the harmony, she turns and teaches three,
by Sunday mornin' it's the loudest chorus singin' all in key —
somebody said "too loud in here!" — well baby, that's the point, my dear —
the more of us who know the words, the more the world's gonna HEAR!

[Pre-Chorus]
(claps building)
'cause one little voice can only carry so far —
but a whole choir together,  you hear how big we are —
(here we go!)

[Chorus]
Come on — bring her along! (bring her along!)
don't leave a single sister in the back singin' wrong! (singin' wrong!)
what you learn, you teach  — that's how we get STRONG —
it's a SISTER ACT, baby — everybody sing along!
(na-na-na — bring her along!)
(na-na-na — bring her along!)

[Bridge]
(spoken, bossy-warm, groove never stops)
uh-uh — I don't wanna hear "but then everybody'll be as good as me."
GOOD. That's a brand new day, baby!
Sopranos? — (ooh!) — altos? — (ahh!) —
take it UP — (KEY CHANGE!)

[Final Chorus]
(key up, biggest, still driving)
Come on — bring her along! (bring her along!)
don't leave a single sister in the back singin' wrong! (singin' wrong!)
what you learn, you teach — that's how we get STRONG —
it's a SISTER ACT, baby — everybody sing along!
(na-na-na — bring her along!)
(na-na-na — bring her along!)

[Outro — full choir, big finish]
...alone, she was just Deloris.
(sing, sister, sing!)
together? honey... that's a sister act.
(ain't nobody actin'!)
Sal-ve! (sal-ve!) Sal-ve! (sal-ve!)
Sal-vay.. Re-geeeeee-naaaaaah!
(big band hit)
(Choir together)
RE-GEEEEEEE-NAHHHHHHHHHHH [-END]
```

---

## Samantha Jones — PATRON SAiNT of Orientation
**Band:** The Bots *(provisional — town's dance/club act; confirm)*
**Status:** SHIPPED — `saint-samantha-jones.mp3`, wired into `ksvl-player.js` (saints mix). ⚠️ DJ radio intro still owed (no `intro` field yet — add `dj-sunnyv-intro-saint-samantha-jones.mp3` when recorded).
**AI truth:** size up the tools before you start and pick the right one for the job —
the quick-draft one isn't the deep-research one. It's casting, not a popularity
contest. Rule: *"Read the room first. Then walk in like you own it."*

**Comedic engine:** Samantha sizes up the room and picks exactly who she wants →
picking the right *tool* the way she picks the right *man*. Double-entendre runs the
whole song ("the fast little fling for a laugh, or the pro who's gonna stay").

**Style (Suno):**
```
late-90s / Y2K sassy diva dance-pop, Cher "Believe" / Whitney "It's Not Right But It's Okay" (Thunderpuss) / Kylie Minogue energy, punchy four-on-the-floor, BIG catchy euphoric SUNG chorus with a strong vocal hook, bright pumping synths and bass, confident sultry female diva lead, ~128 bpm, driving and infectious — catchy pop NOT hypnotic groove, euphoric drop on the chorus, clean studio recording, no crowd cheering, no applause
```

**Lyrics (FINAL — Ali 2026-07-16):**
```
[Intro]
(club track, four-on-the-floor kicks in, filtered groove)
(spoken, low and confident)
Honey... I've been in every room in this town.
I know exactly which one you want.

[Verse 1]
(sultry, cool, talky over the groove)
She walks in the party and she scans the whole floor,
she's not takin' the first thing that comes through the door —
the loudest, the flashiest, the one with all the hype? —
darling, "everybody's got one" don't mean it's your type —

[Pre-Chorus]
(filter opening up, build)
so read the room, baby — what's the play? (what's the play?)
the fast little fling for a laugh — or the pro who's gonna stay? —
(here comes the drop)

[Chorus]
(the drop — big catchy sung chorus)
Size 'em up like Samantha! (like Samantha!)
you don't take what's popular — you take what's LEGIT! (legit!)
read the room, know the job, and you commit —
it ain't about the hype, honey... it's about the FIT!
Size 'em up like Samantha! (like Samantha!)

[Post-Chorus — big hook, all voices]
(size 'em up!) oh-oh-oh! (size 'em up!) oh-oh-oh!
find the one that FITS — the best one for the job, that's it!
(oh-oh-oh... oh-oh-oh...)

[Verse 2]
One's a quick little fling — good for a draft and a laugh,
one's in it for the long haul — the research, the math,
one will look at your pictures, one will hear you all night —
you don't take the first, sugar... you take the one that's RIGHT —

[Pre-Chorus]
so read the room, baby — what's the play? (what's the play?)
the fast little fling for a laugh — or the pro who's gonna stay? —
(here comes the drop)

[Chorus]
Size 'em up like Samantha! (like Samantha!)
you don't take what's popular — you take what's LEGIT! (legit!)
read the room, know the job, and you commit —
it ain't about the hype, honey... it's about the FIT!
Size 'em up like Samantha! (like Samantha!)

[Post-Chorus — big hook, all voices]
(size 'em up!) oh-oh-oh! (size 'em up!) oh-oh-oh!
find the one that FITS — the best one for the job, that's it!
(oh-oh-oh... oh-oh-oh...)

[Bridge]
(spoken, filthy-confident, over the groove)
Sweetheart, I don't do "whatever everybody else is using."
I find out what I need... and I go get exactly that.
The trick was never having the most of them.
It's knowing which one... for which... occasion.
(a beat)
...I have never once been disappointed.
(drop back in!)

[Final Chorus]
(biggest, filter wide open)
Size 'em up like Samantha! (like Samantha!)
you don't take what's popular — you take what's LEGIT! (legit!)
read the room, know the job, and you commit —
it ain't about the hype, honey... it's about the FIT!
Size 'em up like Samantha! (like Samantha!)

[Post-Chorus — big hook, all voices]
(size 'em up!) oh-oh-oh! (size 'em up!) oh-oh-oh!
find the one that FITS — the best one for the job, that's it!
(oh-oh-oh... oh-oh-oh...)

[Outro]
(club groove, spoken, fading out)
...auditions are over, darling.
I know exactly who I'm takin' home.
(size 'em up.)
Samantha.
```

---

## Deb — PATRON SAiNT of "Loop Me Out"
**Band:** Latent Space · **Status:** SHIPPED, LOCKED (`saint-deb.mp3`)
Full locked lyrics + production notes live in memory `deb-loop-me-out-song-locked`.
Paste them here on next edit so this songbook is complete.

---

# ============================================================
# TOWN / GAME SONGS
# ============================================================

## Down at the Blend & Snap
**Band:** The Recalls · **Status:** SHIPPED (`the-laidies-down-at-the-blend-and-snap.mp3`
— filename is a historical artifact; artist is **The Recalls**)
**What it teaches:** the Wednesday study ritual — read it once, then go make it stick.

**Style (Suno):**
```
mid 2000s acoustic pop r b Pop, Dance-Pop, R&B, Adult Contemporary these words style stripped back and intimate prominent acoustic guitar riff hand claps and finger snaps driving the rhythm warm close female vocal light funk shuffle groove uncluttered with space 97 bpm feel good and infectious flowing conversational melody
```

**Lyrics:**
```
[Intro]
(bright guitar-riff hook, funk shuffle)
oh-oh... the Blend & Snap...

[Verse 1 — fast, talky, tumbling]
grabbed my study pack and my jelly shoes and I'm out the door,
red the episode earlier but  now I'm back for more,
'cause reeding it once is a start, but I wanted it to stick,
so I'm down at the café gonna study it quick —
foam-heart latte, try-on's up, cheat sheet's in my lap,
highlighters poppin' and my favourite blend's on tap
girls are already there, I got 12 butterfly clips in my hair
cuz its Wednesday, skip the study session (don't you dare!)

[Pre-Chorus]
(whoa-oh...) reed it, repeat it,
(whoa-oh...) study 'til I've got it —

[Chorus]
down at the Blend & Snap,   (the blend and snap!),
down at the Blend & Snap —
one more cup and the lesson clicks,
down at the Blend & Snap!
reed it, study it, try it and it sticks —
down at the Blend & Snap!

[Verse 2 — fast, talky]
she explains the tricky part, I explain the rest,
we're all friends here, we just came to test,
trade a little gossip,  trade a little smart,
bit a caffeine and a chapter and we're off to a start —
Elle Woods does the bend and snap, we do the blend and snap,
one more sip, one more reed, and we've got it in the bag,
quiz is up the road at the High but hey — we're prepared,
'cause it's Wednesday, and you know we're always there —

[Pre-Chorus]
(whoa-oh...) reed it, repeat it,
(whoa-oh...) study 'til I've got it —

[Chorus]
down at the Blend & Snap, (blend and snap!),
down at the Blend & Snap —
one more cup and the lesson clicks,
down at the Blend & Snap!
reed it, study it, try it and it sticks —
down at the Blend & Snap!

[Bridge]
(strip back, guitar + claps)
couldn't quite get it when I red it on my own,
but a coffee and the girls and it clicks, and now I know —
one more cup, one more pass, watch it fall in place —
walk into that quiz with a smile on my face —
(guitar riff kicks back in!)

[Chorus]
down at the Blend & Snap, (the blend and snap!),
down at the Blend & Snap —
one more cup and the lesson clicks,
down at the Blend & Snap!
reed it, study it, try it and it sticks —
down at the Blend & Snap!

[Outro]
(sudden bright ending, like the original)
down at the Blend & Snap... and it clicks!
```

---

## Still to transcribe into this songbook
These shipped but their lyrics are still **mp3-only** — capture them here when handy
so nothing is a lost drive away from gone:
- SUNNYVAiLE Town Anthem · Wednesday Anthem (THE LAiDIES)
- Saint songs: Cher, Buffy, Dolly, Elle, Regina
- Game/town songs: Businesswomen's Special, Dream Phone, Girl Talk, Mme CLAi-O,
  Ask LAiDY, Debs Tomorrow Problem, episode Wednesday Anthems (weeks 01–04)

## Owed saint songs (not yet written)
- **Oprah** (Staying Current) — run the engine
- **Bette Midler** (Range/Multimodal, "The Triple Threat") — LOCKED cast, funny triple-threat; run the engine
- **Betty White** (new saint #12, "It's never too late / any age") — LOCKED cast; run the engine
- **Jessica Fletcher** (proposed — "the follow-up question / interrogate the answer") — TBD
- Samantha ✅ SHIPPED · Deloris ✅ SHIPPED
