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

## Bette Midler — PATRON SAiNT of Range ("The Triple Threat")
**Band:** The Ensembles *(NEW band, locked 2026-07-16 — ML "ensemble methods"
(many models combined) + the Broadway "ensemble"/big-cast showstopper; album
**"Wisdom of the Crowd."** Can carry future cabaret/showstopper saints.)*
**Status:** SHIPPED — `saint-bette-midler.mp3` + `ksvl-transitions/dj-sunnyv-intro-saint-bette-midler.mp3` (DJ intro), wired into `ksvl-player.js` (saints mix).
**AI truth (Range/Multimodal):** it's not just a text box — show it pictures, talk to
it, hand it your files, let it see your screen. Use every mode. Don't be just one
thing; don't use it like it's just one thing.

**Comedic engine:** The Divine Miss M is the brassy maximalist who refuses to be ONE
thing (torch songs AND comedy AND Broadway AND movies). "Why be one thing when you
can be the whole show?" = use every mode. **Bold, recognizable Bette references woven
in, Miranda-style** (Ali: keep them landing, not buried):
- Wind Beneath My Wings — "Did you ever know..." (intro) + "wind beneath your wings" (outro, flipped: the tools lift you, YOU still fly)
- First Wives Club — "don't get mad, get everything" (doubles as the lesson)
- Hocus Pocus — "put a spell on you," "not some hocus pocus," "spells you learn to wield," "Sisters"
- Beaches — "sang you to tears in a beach chair"
- Down and Out in Beverly Hills — "feeling down and out" (outro)

**Suno gotchas learned here:**
- **"Bette" → sung "Bet"** (spelled "Bet" in lyrics or Suno says "Betty"). Canon name stays "Bette Midler."
- **Year "nineteen ninety-three" spelled out → BLOCKED** as a "producer tag." Write digits (`1993` / `'93`); Suno still sings "ninety-three."
- If "Divine Miss M" ever trips the artist filter, swap to `'cause a diva worth her feathers don't do "one thing," no-no-NO!`

**Style (Suno):**
```
big brassy Broadway showstopper / cabaret, Divine Miss M style, blaring horn section, vaudeville razzle-dazzle, torchy sultry piano intro that SLAMS into an up-tempo brass belter, big campy belting female diva lead with grand spoken asides, showgirl kick-line energy, key-change lift into the final chorus, theatrical and maximalist, clean studio recording, no audience, no crowd cheering, no applause
```

**Lyrics (FINAL — Ali 2026-07-16):**
```
[Intro]
(lone piano, torchy and sultry — a wink)
Did you ever know... you've been usin' just a sliver...
(brass sting)
oh, honey — let me show you what this thing can DELIVER.

[Verse 1]
(brass SLAMS in — big showstopper, up-tempo, camp)
You been typin' little questions like that's all the thing can do,
one little box, one little word — darling, that is not the view —
it can look, it can listen, it'll read your whole dang file,
so why you sippin' water when its an open bar my child?

[Pre-Chorus]
(horns building)
don't get mad — get EVERYTHING! (get everything!)
'cause a one-trick pony, darling... never was my thing! —
(here we go!)

[Chorus]
Do it ALL like Bet! (like Bet!)
why be one little thing when you could be the whole damn SHOW? (the whole show!)
show it, sing it, say it, send it — use it head to toe,
'cause the Divine Miss M does not do "one thing," no-no-NO!
Do it ALL like Bet! (like Bet!)
(the works, darling... the WORKS.)

[Verse 2]
(the concrete mechanic, camp)
Snap it a photo, reed it out loud, hand it the whole shebang,
sing to it, cry to it, laugh to it — it'll harmonize and hang —
it's not some hocus pocus, sugar — just spells you learn to wield,
one voice types... but the diva? — honey, she works the whole FIELD —

[Pre-Chorus]
(horns building)
don't get mad — get EVERYTHING! (get everything!)
'cause a one-trick pony, darling... never was my thing! —
(here we go!)

[Chorus]
Do it ALL like Bet! (like Bet!)
why be one little thing when you could be the whole damn SHOW? (the whole show!)
show it, sing it, say it, send it — use it head to toe,
'cause the Divine Miss M does not do "one thing," no-no-NO!
Do it ALL like Bet! (like Bet!)
(the works, darling... the WORKS.)

[Bridge]
(spoken, camp-grand, over vamping brass)
Amateurs pick one little trick and think that's how you get SEEN —
but darling, I put a spell on you way back in 1993 —
sang you to tears in a beach chair, then made you laugh in the very same SCENE —
'cause I never did just ONE thing, honey... I did everything IN BETWEEN.
(a beat)
...now — Sisters — take it HOME —

[Final Chorus]
(key up, biggest brass, showgirl kick-line)
Do it ALL like Bet! (like Bet!)
why be one little thing when you could be the whole damn SHOW? (the whole show!)
show it, sing it, say it, send it — use it head to toe,
'cause the Divine Miss M does not do "one thing," no-no-NO!
Do it ALL like Bet! (like Bet!)
(the works, darling... the WORKS.)

[Outro]
(brass swells, then softens for the wink)
feeling down and out? well let me tell you...
you were never just a text box, sugar...
and neither... was I.
so use 'em ALL — every tool you got — let 'em be the wind beneath your wings —
(but darling... YOU'RE still the one that flies.)
Do it ALL... like BET!
(the WORKS!)
```

---

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

**Lyrics (FINAL v2 — Ali 2026-07-16):** adds "Oh Happy Day" tags throughout, and
tweaked chorus/pre-chorus. **DO NOT "fix" the hymn line "Founding Mother of lace and
of love" — it is a deliberate EASTER EGG:** "lace... of love" = **Ada Love-lace**, the
founding mother of programming, hidden inside the traditional hymn's "Mother of mercy
and of love." Never annotate it in live/site copy (no-meta rule) — it's for the ones
who catch it.
```
[Intro — A CAPPELLA hymnal choir, slow, free tempo, NO instruments, NO drums, NO beat, NO claps, reverberant church]
Hail... Holy... Queen... en-throned a-bove...
Ohhhh Ma-reeee-ahhhh...
Founding  Mo-ther of lace  and of love...
Ohhhh Ma-reeee-ahhhh...

[Pivot — full band SLAMS in: drums, hand-claps, tambourine, tempo snaps up]
Sal-vay (sal-vay!) sal-vay! (sal-vay!) sal-vay Re-gee-nahhhh — whoo! (oh happy day!, oh happy day!, oh happy day!)

[Verse 1]
(Motown groove, dry and sassy, fast)
Miss Mary Clarence got a choir that could not hold a note,
scared little sisters in the back with a whisper in their throat —
she said "I'm not gonna sing it FOR you — no, that ain't the plan,
you gon' sing it with me, then you teach the next one how you can!"

[Pre-Chorus]
(claps building)
'cause one little voice can only carry so far —
but a whole choir baby, now you hear how big we are —
(here we go!)

[Chorus]
Come on — bring her along! (bring her along!)
don't leave a single sister in the back singin' wrong! (singin' wrong!)
what you learn, you teach — that's how we get STRONG —
it's a SISTER ACT, baby — everybody sing along!
na-na-na — oh happy day!
na-na-na — Sal-vay!

[Verse 2]
One nun learns the harmony, she turns around and teaches three,
by Sunday mornin' it's the loudest chorus singin' all in key —
somebody said "too loud in here!" — well baby, that's the point, my dear —
the more of us who know the words, the more the world's gonna HEAR!

[Pre-Chorus]
(claps building)
'cause one little voice can only carry so far —
but a whole choir  baby,  now you hear how big we are —
(here we go!)

[Chorus]
Come on — bring her along! (bring her along!)
don't leave a single sister in the back singin' wrong! (singin' wrong!)
what you learn, you teach  — that's how we get STRONG —
it's a SISTER ACT, baby — everybody sing along!
na-na-na — oh happy day!
na-na-na — Sal-vay!

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
na-na-na — oh happy day!
na-na-na — Sal-vay!

[Outro — full choir, big finish]
...alone, she was just Deloris.
(sing, sister, sing!)
together? honey... that's a sister act.
(oh happy day!!)
Sal-ve! (sal-ve!) Sal-ve! (sal-ve!)
Sal-vay.. Re-geeeeee-naaaaaah!
(bring her along!)
(oh happy day!)
(Choir together)
RE-GEEEEEEE-NAHHHHHHHHHHH
OH HAPPY DAY!  [-END]
```

---

## Samantha Jones — PATRON SAiNT of Orientation
**Band:** The Bots *(town's dance/club act)*
**Status:** SHIPPED — `saint-samantha-jones.mp3` + `ksvl-transitions/dj-sunnyv-intro-saint-samantha-jones.mp3` (DJ intro), wired into `ksvl-player.js` (saints mix).
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

## The Golden Girls — PATRON SAiNT of Never Too Late
**Band:** The Diffusions *(NEW band, LOCKED 2026-07-16 — "diffusion models" (AI image
generation, which works by *denoising*) + disco shimmer/mirror-ball; 7" single
**"Denoise the Dance Floor."** The town's only disco act so far — one track is fine
(cf. Chain of Thought = David only).)*
**Status:** SHIPPED — `saint-golden-girls.mp3` + `ksvl-transitions/dj-sunnyv-intro-saint-golden-girls.mp3` (DJ intro), wired into `ksvl-player.js` (saints mix). ⚠️ group portrait still owed.
**Saint note:** the roster's FIRST **collective/group saint** — the four Golden Girls
as ONE patron saint (intentional exception, like Regina's anti-saint). Replaced the
earlier "Betty White solo" idea (Betty is Rose, one of the four). See [[saint-roster-rethink-2026-07]].
**AI truth:** it's never too late — at ANY age the whole new world (AI included) is
yours; don't count yourself out, dive all the way in, and you can be GREAT at it.
(Encompassing — NOT just "try it once.")
**Comedic engine:** all four personas — Sophia savage/morbid, Blanche vamp, Dorothy
deadpan, Rose (Betty) sweet-dim. Hook = "be a golden girl" (theme phrase, not "like [Name]").

**Style (Suno):**
```
1970s feel-good disco, four-on-the-floor kick, funky bassline, lush strings, wah guitar, bright horns, warm sassy female lead with spoken savage asides, group singalong backing vocals, euphoric and catchy, ~118 bpm, glamorous and fun — NOT country, NO acoustic guitar or twang, NOT doo-wop, clean studio recording, no crowd cheering, no applause
```

**Lyrics (FINAL — Ali 2026-07-16):** every line rhymes; "88" as digits + "lie-ve"
phonetic are Suno-safe spellings — don't "fix" them.
```
[Intro]
(disco strings swell, four-on-the-floor kicks in)
(spoken, Sophia-savage, over the groove)
Picture it:
YOU....
TONIGHT.  — too scared to even START.
oh, sit down, sweetheart... let's have ourselves a little heart-to-HEART.

[Verse 1]
(disco groove, sassy)
There's a lanai in Miami where the lights stay on all night,
four "old" broads the world wrote off — still fabulous, still bright —
Dorothy with the zingers, Blanche with a brand-new man,
Rose lost in St. Olaf... and Sophia — with a PLAN —

[Pre-Chorus]
they said "ladies, you're finished — go and REST!" — (oh, please!)
so they poured a little wine... and they got DRESSED — (lookin' their BEST!)

[Chorus]
Be a GOLDEN girl! (golden girl!)
past your prime? oh please — give it a WHIRL! (a whirl!)
the ones who never quit are the ones still havin' a BALL —
this whole new world is yours, doll — so go HAVE it all!
(be a golden girl!)

[Verse 2]
So the whole world went and changed, and you're sayin' "not for me" —
well those four would slap that silly right outta your mouth with their TEA —
they didn't sit on the sidelines, sugar — no, they were GREAT —
they owned every minute they got... and proved it's never too LATE —

[Pre-Chorus]
they said "ladies, you're finished — go and REST!" — (oh, please!)
so they poured a little wine... and they got DRESSED — (lookin' their BEST!)

[Chorus]
Be a GOLDEN girl! (golden girl!)
past your prime? oh please — give it a WHIRL! (a whirl!)
the ones who never quit are the ones still havin' a BALL —
this whole new world is yours, doll — so go HAVE it all!
(be a golden girl!)

[Bridge]
(spoken, Sophia over the vamp — sweet then morbid)
You're too old? Ha! Picture THIS: I'm older than the hills,
still sharp, still savage, still runnin' up the bills —
that thing you keep avoidin'? — quit stallin', take the DIVE,
I'm long gone now, darlin'... but YOU are still alive —
Now — get UP!
(disco SLAMS back in)

[Final Chorus]
(biggest, strings soaring, everybody)
Be a GOLDEN girl! (golden girl!)
past your prime? oh please — give it a WHIRL! (a whirl!)
the ones who never quit are the ones still havin' a BALL —
this whole new world is yours, doll — so go HAVE it all!
(never too late to be great...)
be a golden girl!

[Outro]
(disco fades, warm, spoken)
four girls the world called "finished" — well, look at 'em GO,
the best in the room at 88, hostin' a lie-ve SHOW —
so pull up a chair, sugar — there's cheesecake on the PLATE,
and bein' a golden girl, honey? — means it's never too LATE to be GREAT.
(be a golden girl!)
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

## SUNNYVAiLE Town Anthem  (THE LAiDIES)
**Status:** SHIPPED (`content/music/sunnyvaile-town-anthem.mp3`) — Ali LOVES this one.
**What it is:** the town's identity anthem — "you're not behind, you're home." Soft piano build → big anthemic key-change; Clueless "now get in, loser… we're learning AI" bridge. Keep the phonetic "Sunny-Vale."
**Lyrics:**
```
[Intro] (soft piano, building) ooh... Sunny-Vale...
[Verse 1] you nod in the meeting like you read the thing, / but you're winging it hard every time the words "AI" ring — / they buried it in buzzwords, made it sound so tall — / honey, you've broken ceilings... what's another wall?
[Pre-Chorus] but you were never slow, girl — you were never the last, / you just needed a room that moves as smart and as fast — / so come on...
[Chorus] welcome to Sunny-Vale — you're not behind, you're home! / a hundred clever women, and you're never on your own! / the 90s shaped us — and AI's shaping now, / you don't chase the future here, we'll show you how! / oh, Sunny-Vale... your people are here... / ohhh-oh-oh, Sunny-Vale...
[Verse 2] you don't need a hoodie or a start-up name, / full calendar, high standard — you were built for this game, / Clay-oh's in the window, the Bronze Age plays, / pull up a chair, babe — we've been saving your place...
[Pre-Chorus] 'cause you were never slow, girl — you were never the last, / on Wednesdays we do AI and we're having a blast — / so come on...
[Chorus] (repeat)
[Bridge] (stripped, vocal + piano, build) no more figuring it out at eleven at night, alone... / no more pretending you've got it — these are your own... / (drums swell) now get in, loser... we're learning... AI...!
[Final Chorus] (KEY CHANGE, biggest) (repeat chorus)
[Outro] (big, fading) you're not behind... you're home... ohhh-oh-oh, Sunny-Vale...
```

## Wednesday Anthem  (THE LAiDIES)
**Status:** SHIPPED (mp3). The ONE fixed weekly-ritual song ([[wednesday-anthem-canon]]) — distinct from the episode song. A walk-through of the whole town's Wednesday. Fast cascading piano; super-catchy "it's Wednesday in Sunny-Vale and we run everything" hook.
**Lyrics (canonical — Ali's version 2026-07-17; keep phonetic spellings "reed", "WHENS-day", "Sunny-Vale", "Clay-oh", "Delta Lai Nuu"):**
```
[Intro]
(cold open — fast cascading piano riff alone, no vocal)

[Verse 1]
(strong drum beat)
you've got mail — it's Wednesday, the Drop is on its way,
swing by the NewsStand, reed the stories of the day,
then it's straight to the Chick Flicks, grab the latest episode,
the sun is shining bright, the town's awake, and the day is gonna roll...

[Pre-Chorus]
here it comes, here it comes —
the best day of the week —
(lift up...)

[Chorus]
oh-oh — it's WHENS-day! — in Sunny-Vale!
where the smart girls meet, it's a hump day treat!
clock the middle of the week and let the whole town sing —
it's Wednesday in Sunny-Vale and we run everything!

[Verse 2]
grab a coffee at the Blend & Snap and study for a while,
then it's the high school for the quiz — yeah,  you did it with a smile,
flip the radio on, there's a brand-new song to hear,
KSVL's got it spinning and the chorus is so clear...

[Bridge of errands]
run around the town now — see Clay-oh read your cards,
call the Dream Phone on the corner when the question's getting hard,
ask the FAiRY Godmother, get a glow-up for your day,
get a Makeover on Main and walk out all the way!

[Chorus]
oh-oh — it's WEDNES-day! — in Sunny-Vale!
where the smart girls meet, and it's a hump day treat!
clock the middle of the week and let the whole town sing —
it's Wednesday in Sunny-Vale and we run everything!

[Verse 3]
four o'clock at Bronze Age and the Businesswomen's pour,
meet the girls for happy hour, then the band comes on for more,
stay for the live show, dance until it's late,
then it's back to Delta Lai Nuu to celebrate...

[Bridge — night, big build]
chatting with the LAiDIES, playing Girl Talk 'til we're done,
truth or dare under the neon light, Wednesday's number one —
(drums + harmonies swell)
the whole town glowing from the morning to the night —
it's Wednesday in Sunny-Vale and everything's alright!

[Final Chorus — biggest]
oh-oh — it's WEDNES-day! — in Sunny-Vale!
where the smart girls meet, and it's a hump day treat!
clock the middle of the week and let the whole town sing —
it's Wednesday in Sunny-Vale and we run everything!
(piano riff returns, soaring)

[Outro]
(piano winding down)
neon's off now... town's asleep...
see you next Wednesday... for another midweek treat...
```

---

## Episode Intro Theme  (THE LAiDIES) — top of every episode
**Status:** SHIPPED — `content/music/sunnyvaile-episode-intro.mp3` (~29s, Ali approved 2026-07-17).
A blend of the Town + Wednesday anthem choruses on the anthem tune. Style = short cold-open-to-hook
Y2K empowerment pop.
**Lyrics (FINAL — Ali 2026-07-17):**
```
[Intro — anthem tune (Cover), ~25s]
welcome to Sunny-Vale — you're not behind, you're home!
so many clever women, and you're never on your own!
the 90s shaped us — and AI's shaping now,
you don't chase the future here, we'll show you how!
(oh-oh —) it's Wednesday! — in Sunny-Vale!
ohhh-ohhhh-ohhhh sunny-vale.
```

## Episode Outro Theme  (THE LAiDIES) — closing credits
**Status:** SHIPPED — `content/music/sunnyvaile-episode-outro.mp3` (~25s). Warm wind-down; lands on
the locked sign-off ([[episode-audio-format]]).
**Lyrics (FINAL — Ali 2026-07-17):**
```
[Outro — warm wind-down, piano + soft synth]
that's a wrap on Wednesday, the lights go low,
you got your one good thing, now away you go —
the neon's all off now... the town's asleep...
see you next Wednesday... for another midweek treat...
yeahhhhhh  in sunny-vale.
```

## Still to transcribe into this songbook
These shipped but their lyrics are still **mp3-only** — capture them here when handy
so nothing is a lost drive away from gone:
- Saint songs: Cher, Buffy, Dolly, Elle, Regina
- Game/town songs: Businesswomen's Special, Dream Phone, Girl Talk, Mme CLAi-O,
  Ask LAiDY, Debs Tomorrow Problem, episode Wednesday Anthems (weeks 01–04)

## Owed saint songs (not yet written)
- **Oprah** (Staying Current) — run the engine
- **Jessica Fletcher** (proposed — "the follow-up question / interrogate the answer") — TBD
- SHIPPED ✅: Deloris · Samantha · Bette · The Golden Girls (Betty White idea → collective Golden Girls saint)
