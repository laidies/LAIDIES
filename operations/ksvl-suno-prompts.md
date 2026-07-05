# KSVL Radio · Prompt Pack
**For "Tune In Live" mode — jingles + commercials + DJ SunnyV transitions.**

## Production pipeline — locked 2026-07-01

- **JINGLES → Suno.** Sung station IDs, musical hooks, weather stings. Suno's home turf.
- **COMMERCIALS → ElevenLabs.** Every commercial is preceded by a UNIVERSAL announcer intro ("And now a word from [store]…") voiced by DJ SunnyV, then the spot itself is read in the store's own voice. Two separate ElevenLabs generations spliced at production time.
- **DJ SunnyV TRANSITIONS → ElevenLabs.** Spoken transitions in DJ SunnyV's voice. No announcer intro needed — she IS the announcer.

**Why this split:** Suno wants to sing. Spoken-word ads come out sing-song-y. ElevenLabs gives clean reads and voice-cloneable character options. Suno stays where it shines — the jingles.

**File destinations:**
- Jingles → `content/music/ksvl-jingles/`
- Announcer intros → `content/music/ksvl-spots/intros/`
- Commercials → `content/music/ksvl-spots/`
- DJ transitions → `content/music/ksvl-transitions/`

---

## LAiDIES voice register — locked

Every spot must clear these before it's Suno-ready:

- **Specificity is intimacy.** Name the drink, the shelf, the barrette, the saint. Never "our items" or "our offerings." Say "Cucumber Melon body spray," "Hannah Fry's table," "three concepts and five vocab words."
- **Warm + dry, not bright + selly.** No exclamation-point energy. No "come on down!" No "your one-stop shop." Small-town confidence, not corporate cheer.
- **The joke is felt, not annotated.** Don't explain the Y2K reference. Drop it and move on. If it lands, it lands.
- **No PA-cliché filler.** Kill phrases like "we're glad you're here," "come on in," "we'll remember you." They read as stock ad, not LAiDIES.
- **Trust the listener.** She got the reference. She got the joke. She knows what a Study Pack is.
- **Building canon > building copy.** Each spot has to feel like the *actual building* speaking — the Post Office sounds like a postmistress, the BRONZE AiGE sounds like the bar owner, the Mall sounds like a compressed mall PA.
- **Wednesday is the rhythm.** Anything time-locked should say Wednesday, not "weekly" or "regularly."

---

---

## JINGLES (Suno)

Sung station IDs and musical stings. 3–10 seconds each. These live on rotation between segments — they're the STATION identity, not ads.

### J1 · KSVL Station ID — "K-S-V-L, SUNNYVAiLE's Own"

**Filename:** `jingle-ksvl-station-id.mp3`
**Length:** ~6 sec

**STYLE (Suno):**
```
1990s AM radio station jingle, tight female vocal harmony trio, upbeat brass hits, cheerful major key, brief and punchy, sung station ID with brass sting at end
```

**LYRICS (Suno):**
```
K! S! V! L!
SUNNYVAiLE's own!
Ninety-nine point nine!
KSVL!
```

---

### J2 · KSVL Wednesday Jingle — "Wednesday on KSVL"

**Filename:** `jingle-ksvl-wednesday.mp3`
**Length:** ~8 sec

**STYLE (Suno):**
```
90s radio station jingle, sung female harmony group, warm brass and organ, cheerful mid-tempo, sung refrain, brief musical wash
```

**LYRICS (Suno):**
```
It's Wed-nes-day…
on K-S-V-L…
SUNNYVAiLE's own!
Every Wednesday, we do AI!
```

---

### J3 · KSVL Signature Sting — "You're on KSVL"

**Filename:** `jingle-ksvl-sting.mp3`
**Length:** ~4 sec

**STYLE (Suno):**
```
1990s radio station short sting, sung female duet, warm brass hit, cheerful punchy, brief transitional bumper
```

**LYRICS (Suno):**
```
You're on…
K-S-V-L!
```

---

### J4 · KSVL Weather Jingle — pre-weather bumper

**Filename:** `jingle-ksvl-weather.mp3`
**Length:** ~5 sec

**STYLE (Suno):**
```
90s AM radio weather-report jingle, cheerful sung group, keyboard flourish, bright chords, brief bumper leading into a weather report
```

**LYRICS (Suno):**
```
SUNNYVAiLE… weather…
on K-S-V-L!
```

---

### J5 · KSVL Traffic Jingle — pre-traffic bumper

**Filename:** `jingle-ksvl-traffic.mp3`
**Length:** ~5 sec

**STYLE (Suno):**
```
90s AM radio traffic-report jingle, cheerful urgent brass sting, sung female voice tag, brief punchy bumper
```

**LYRICS (Suno):**
```
SUNNYVAiLE… traffic!
K-S-V-L!
```

---

### J6 · KSVL Signoff — "Goodnight from KSVL"

**Filename:** `jingle-ksvl-signoff.mp3`
**Length:** ~8 sec

**STYLE (Suno):**
```
90s late-night radio station signoff jingle, warm sung female voice, soft piano and choir wash, gentle bittersweet major-to-relative-minor, station closing feel
```

**LYRICS (Suno):**
```
Good-night from…
K-S-V-L…
SUNNYVAiLE's own…
See you Wed-nes-day…
```

---

## ANNOUNCER INTROS (ElevenLabs · DJ SunnyV voice)

Each commercial gets a universal-format intro voiced by DJ SunnyV, spliced in front of the ElevenLabs-rendered spot at production time. Same voice across all 10 → the pattern IS the joke ("and now a word from…" becomes a rhythmic recurring beat in the rotation).

**ElevenLabs voice:** DJ SunnyV clone. Warm, small-town, easy, slight smile.

**Filename pattern:** `intro-<store-slug>.mp3` (e.g., `intro-blend-and-snap.mp3`)

**Read direction:** natural pacing, no performance, no wink. Read it like she's just moving to the next thing.

```
1.  intro-deb-psa.mp3           →  "And now, a word from Mayor Deb."
2.  intro-blend-and-snap.mp3    →  "And now, a word from the Blend and Snap."
3.  intro-bronze-aige.mp3       →  "And now, a word from the BRONZE AiGE."
4.  intro-mme-claio.mp3         →  "And now, a word from Mme CLAi-O."
5.  intro-luminairy.mp3        →  "And now, a word from the LUMINAiRY."
6.  intro-post-office.mp3       →  "And now, a word from the SUNNYVAiLE Post Office."
7.  intro-delta-lai-nu.mp3      →  "And now, a word from Delta LAi Nu."
8.  intro-mall-claires.mp3      →  "And now, a word from the Mall."
9.  intro-sunnyvaile-high.mp3   →  "And now, a word from SUNNYVAiLE High."
10. intro-chick-flicks.mp3      →  "And now, a word from the Chick Flicks."
11. intro-fairy-godmother.mp3   →  "And now, a word from the FAiRY Godmother."
```

---

## COMMERCIALS (ElevenLabs)

Each spot is preceded by its **Announcer intro** (from the list above) at production time. Below is the character voice for each store, delivery direction, and the paste-ready ElevenLabs read with brand-Ai names spelled phonetically. No music, no sound cues in the read — those get added in post if at all.

### 1 · The Deb PSA — "State of the Town, Address One"

**Filename:** `spot-deb-psa.mp3`

**Voice:** Deb — the same voice as her saint song. Deadpan, weary, flat mid-40s female. Voice-clone from her song if possible, otherwise pick a monotone female (try "Rachel" with Stability 80+, Style 0).

**Delivery:** No performance. She's reading because they made her. Long pauses between sentences. Read it like she's been handed a script she didn't write.

**Read:**
> They told me I couldn't go home until I addressed you all.
>
> So here it is.
>
> For the love of god, someone else run for mayor.
>
> Loop me out.
>
> Deb out.

---

### 2 · The Blend & Snap — "Class notes drop with your cortado"

**Filename:** `spot-blend-and-snap.mp3`

**Voice:** Warm barista, mid-30s female, slight morning-shift alertness. Try "Bella" (Stability 50, Style 25).

**Delivery:** Reads it like she knows you're coming in. Not selly. Small confident smile.

**Read:**
> Wednesday. Class notes drop with your cortado.
>
> At the Blend and Snap. Number 8 Main. Three concepts, five vocab words, one prompt to try before the pop quiz down the street.
>
> Same barista. Same paper cup. She knows how you take it.
>
> Bring the Study Pack. Read it here. Test yourself at school.

---

### 3 · The BRONZE AiGE — "The Coven has a reservation"

**Filename:** `spot-bronze-aige.mp3`

**Voice:** Sardonic bar owner, late-30s to 40s female, dry warmth. Try "Domi" or "Sarah" (Stability 45, Style 30).

**Delivery:** Reads it from behind the bar. Confident, no pitch, no smile in the voice but a smile behind it.

**Read:**
> The BRONZE age. Number 5 Main.
>
> Happy hour at four. The Coven has a reservation — Hannah Fry, the whole table. The women actually running things in A.I. right now. They sit in the corner. You can too.
>
> Main Character Spritz. The pink one. Yes, we know. That's the point.
>
> The Ladies on stage at eight. Show up early or don't. The band knows.
>
> Come sit down. The chair is warmer than it looks.

*(A.I. as "ay-eye" — say it as letters, not "eh." "The Ladies" is the band name — pronounce as "the LAY-dees.")*

---

### 4 · Mme CLAi-O — "You already know"

**Filename:** `spot-mme-claio.mp3`

**Voice:** Sultry Eastern European female accent, slight cigarette rasp, late-90s TV psychic hotline register. Try "Grace" or browse Voice Library for "Russian female" or "Eastern European female" (Stability 55, Style 40).

**Delivery:** Slow. Every sentence a small pause. Not performative — she knows you already believe.

**Read:**
> Something is on your mind. It's why you're listening.
>
> Come see me. Twenty dollars. One card. I read it. I tell you what it says. I tell you your move.
>
> I don't tell you what to feel. That part is yours.
>
> Number 6 Main. Walk-ins. Cash preferred.
>
> Madame Clay-oh sees everything you already know.

---

### 5 · The LUMINAiRY — "Light a candle for who's next"

**Filename:** `spot-luminairy.mp3`

**Voice:** Same DJ SunnyV voice you used for the announcer intros. Reverent register — quieter, slower, no smile.

**Delivery:** Reverent but warm. Reads it like she's the guide at a small gallery, walking you wing to wing.

**Read:**
> The LUMINAiRY. Lantern Hill. Open dawn to dusk.
>
> Three wings. Same glow.
>
> The PATRON SAiNTS. Cher. Elle Woods. Deb. The ones who taught us how to walk into a room and stay in it.
>
> The MAiVENS. Hannah Fry. Fei-Fei Li. Timnit Gebru. The ones who can explain the room.
>
> The TRAiLBLAZERS. Mira. Daniela. Fidji. The ones building the room next.
>
> Light a candle for the woman you're trying to be by Wednesday.
>
> The LUMINAiRY. Come see who lights the way.

*(Fei-Fei Li as "fay-fay lee." Timnit Gebru as "TIM-nit GEB-roo." Mira as "MEER-ah." Fidji as "FEE-jee.")*

---

### 6 · The SUNNYVAiLE Post Office — "You've got mail"

**Filename:** `spot-post-office.mp3`

**Voice:** Warm mid-40s postmistress, small-town municipal register. Try "Charlotte" or "Alice" (Stability 60, Style 20).

**Delivery:** Real postmistress reading the sign at the counter. Even, warm, no irony. Lands the final line as the AOL callback — small pause before it, quoted delivery.

**Read:**
> The Sunnyvale Post Office. Civic Square, right next to Town Hall.
>
> Where you get your mail, from Sunnyvale!
>
> Send a friend a note. A trading card she's been trying to unwrap. A charm you doubled up on. A Hall Pass — because you know she's having a week.
>
> Bring it to the counter with her name. We take it from there.
>
> Visit us, and somewhere in Sunnyvale, an inbox lights up.
>
> The Sunnyvale Post Office. You've got mail!

---

### 7 · Delta LAi Nu — "The couches remember you"

**Filename:** `spot-delta-lai-nu.mp3`

**Voice:** Girlish conspiratorial female, sleepover-across-the-pillow register, 20s. Try "Bella" (Stability 40, Style 45) or browse for "young female conversational."

**Delivery:** Half a whisper. Like she's telling you a secret from the other end of a landline. Close-mic warmth, not baby-voice.

**Read:**
> Delta Lie NEW. Wisteria Lane. Pink door, second story. Look for the porch light.
>
> Come chat with the rest of us. Share a win. Ask for advice. Gossip in the Burn Book.
>
> ICQ walked so our chat rooms could run.
>
> Girl Talk lives here too — truth or dare. Truth stays in the room. Dare gets posted to Dare Reports by Sunday, or you spend a Hall Pass. Everyone gets one a month.
>
> Bring your Residence Card. Door won't open otherwise.
>
> The pretzels are in the cabinet where they've always been. The couches remember you.

---

### 8 · The Mall · CLAiRE'S Doorbusters

**Filename:** `spot-mall-claires.mp3`

**Voice:** Peak Y2K mall PA — cheerful compressed female voice through a tinny mall speaker. Try "Nicole" or "Rachel" with Stability 50, Style 45. Add a slight compression/EQ in post to fake the mall-speaker filter.

**Delivery:** Bright, brisk, upbeat. Reading a real mall PA — not commenting on being one.

**Read:**
> Attention Sunnyvale shoppers.
>
> Weekend at the Mall. Number 4 Main. Center Court.
>
> At Claire's — butterfly clips three for five. Mood rings. Snap barrettes. Cucumber Melon body spray — somehow still stocked.
>
> Everything you never needed. Half off.
>
> Wear it out of the store. It follows you to your Residence Card.
>
> The Mall closes at nine. Food Court is open till ten.
>
> Thank you for shopping at Sunnyvale Center Court.

---

### 9 · SUNNYVAiLE High — "Pop Quiz Wednesday"

**Filename:** `spot-sunnyvaile-high.mp3`

**Voice:** Deadpan vice-principal, mid-50s female, flat authority. Try "Rachel" or "Grace" (Stability 80, Style 0). Add slight reverb in post to fake the hallway PA.

**Delivery:** No music. No inflection. Bored authority. Every sentence a full stop.

**Read:**
> Attention residents.
>
> Pop Quiz Wednesday at Sunnyvale High. On this week's 101 class and the episode.
>
> Study Pack is at the Blend and Snap. Number 8 Main. Read it before you show up.
>
> Bring a pen.
>
> That is all.

---

### 10 · The Chick Flicks — "Be Kind Rewind"

**Filename:** `spot-chick-flicks.mp3`

**Voice:** Bored twenty-something video-store clerk, female (or male if a fit). Casual small-town flat delivery. Try "Bella" or "Elli" with Stability 65, Style 10.

**Delivery:** She's reading it because someone told her to. Not selling anything. Reads "We know when you don't" like a statement of fact, not a threat.

**Read:**
> The Chick Flicks. Number 7 Main.
>
> This week's episode plays on the counter T.V. all day. Rent the tape. Watch it Friday.
>
> New releases up front. Staff picks handwritten on index cards, taped to the shelf. Ali's picks are in the sticker section — three deep.
>
> Late fees are real. Return by Sunday.
>
> Be Kind. Rewind. We know when you don't.
>
> The Chick Flicks. Every episode is an aisle.

*(T.V. as letters — "tee-vee.")*

---

### 11 · The FAiRY Godmother's House — "She grants wishes"

**Filename:** `spot-fairy-godmother.mp3`

**Voice:** FAiRY Godmother herself. Warm, ageless, whimsical without being saccharine — storybook-narrator quality with a quiet wink underneath. Try "Grace" or "Alice," or browse Voice Library for "storyteller female" / "warm mature female" (Stability 55, Style 30).

**Delivery:** Slow. Reading a fairy tale to a child — but the child is you, and you're 34. Give each sentence a beat.

**Read:**
> The FAiRY Godmother's House. Willow Lane. Look for the thatched roof and the roses climbing the wall.
>
> Ask Lady lives here. She grants wishes.
>
> Bring her the question you're afraid to ask out loud. She'll answer it. She'll help you word it. She's kind — even when the question isn't.
>
> Three wishes per visit. Come by tomorrow for three more.
>
> The kettle's on. The cookies are real.

*(Ask LAiDY reads as "Ask Lady" — pronounce the second word as a single syllable, LAY-dee.)*

---

## DJ SunnyV TRANSITIONS (ElevenLabs)

Same DJ SunnyV voice as the announcer intros. Spoken transitions between segments. No announcer intro — she is the announcer.

### T1 · The Signature Open

**Filename:** `dj-jaidy-signature-open.mp3`

**Delivery:** Warm, easy, slight smile. Reads like she's taking over from a jingle.

**Read:**
> K-S-V-L, ninety-nine point nine, filed from Sunnyvale. I'm DJ Jaydee.
>
> You made it to Wednesday. Let me take it from here.

*(K-S-V-L as spelled-out letters. Sunny-Vee for SunnyV.)*

---

### T2 · The SUNNYVAiLE Weather Report

**Filename:** `dj-jaidy-weather.mp3`

**Delivery:** Cheerful, brisk, weather-lady over-production. Slight smile.

**Read:**
> Sunnyvale weather. Partly cloudy, extremely mid-90s.
>
> Chance of Y2K memory triggering later this afternoon. Bring a Discman if you go out.
>
> High of remember when. Low of you had to be there.

---

### T3 · The Time-Check

**Filename:** `dj-jaidy-time-check.mp3`

**Delivery:** Quiet, warm, small-town landmark tour. Slower pace than the other transitions.

**Read:**
> It's Wednesday in Sunnyvale. Somewhere on Main Street a Study Pack is being picked up. Somewhere on Lantern Hill a light is coming on. Somewhere in Deb's office a printer is still jammed.
>
> Coming up on the hour.

---

### T4 · The Traffic Report

**Filename:** `dj-jaidy-traffic-report.mp3`

**Delivery:** Urgent helicopter-view voice for the first line, then deflates. Beat of silence, then flat delivery of the rest.

**Read:**
> Sunnyvale traffic report.
>
> ...
>
> No traffic.
>
> Small town. Nobody's going anywhere. Move on.

*(The "..." is a full beat of dead air — either leave it in the ElevenLabs read as a pause, or splice it in post.)*

---

### T5 · The Signoff

**Filename:** `dj-jaidy-signoff.mp3`

**Delivery:** Warm, sincere, late-night station feel. Slight bittersweet warmth at the end.

**Read:**
> This has been K-S-V-L. Filed from Sunnyvale.
>
> Thank you for tuning in. Deb has requested I stop announcing her role at the end of the broadcast, so I won't.
>
> Take care of each other. See you Wednesday.

---

## Production shortcut — batch by voice (ElevenLabs)

Group by character voice to minimize voice-clone / voice-pick work in ElevenLabs:

- **DJ SunnyV** (warm small-town DJ) → all 10 announcer intros + all 5 DJ transitions + LUMINAiRY spot (reverent register)
- **Deb** (deadpan flat weary) → PSA spot only. Voice matches her saint song performer.
- **Mme CLAi-O** (Eastern European sultry) → her own spot only
- **Warm barista** → Blend & Snap
- **Postmistress mid-40s** → Post Office
- **Sardonic bar owner** → BRONZE AiGE
- **Sleepover conspiratorial** → Delta LAi Nu (Girl Talk)
- **Compressed cheerful mall PA** → CLAiRE'S / SUNNYVAiLE Center Court
- **Vice-principal deadpan** → SUNNYVAiLE High
- **Bored video-store clerk** → Chick Flicks

## Suno batching — jingles

Six jingles (J1–J6) all use the same 90s AM radio station-jingle idiom. Batch in one Suno session with the same sung female group / brass style dialed in, then just swap lyrics between generations. If Suno wants to make them "songs," add "brief 5-second station bumper" to the style prompt.

## When they land

Drop each `.mp3` into `content/music/ksvl-spots/`. When all are in, I'll:
1. Register them in `ksvl-player.js` INTERSTITIALS pool
2. Enable the "TUNE IN LIVE" mode with rotation (song → transition → song → commercial → song → transition → ...)
3. Add a "TUNE IN LIVE" button on `radio.html` above the Mix CDs rack

**Ready to generate.**
