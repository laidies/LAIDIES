# Saint Card-Back Depth — LUMINAiRY Patron Saints

Real depth copy for the back of each LUMINAiRY patron-saint card. Right now each
back holds a one-line `rule`; this doc adds a `depth` object per saint — a
"who she is + why she's the patron saint of her thing" line, plus a **Her lesson:**
line that maps her domain to a concrete, true AI-use lesson.

**Scope:** the 12 pop-culture patron saints only (cards Cher → Regina George in
`luminairy.html`). The MAiVENS cards (Hannah Fry onward) are the real AI women —
out of scope here.

**Count note:** the brief said "13," but the enumerated list, the `CANON` object,
and the rendered saint cards all hold **12** (11 saints + Regina as the anti-saint).
Twelve written below; nothing invented to reach 13.

**Voice check applied:** AI is always "it," never "she/her" (she/her only for the
real women and the saints). Teaching leads plain; the reference garnishes.
No influencer cringe, no tech-bro. Claims about the real women (Dolly, Oprah, J.Lo)
kept true and general.

**How to wire it:** each `depth` is an object with two keys — `who` (the
who-she-is/why-she's-the-saint line) and `lesson` (the "Her lesson:" payload,
label added at render). Drop it into each existing `CANON[...]` entry alongside
the unchanged `rule` / `song` / `source` / `devotion`. Quote style matches the
file (single-quoted JS strings, typographic apostrophes inside).

---

## 1. Cher Horowitz

**Cher Horowitz** · PATRON SAiNT of Making It Yours · *Clueless (1995)*

Beverly Hills' patron of the personalized life — the girl who ran her whole world
from a computerized closet that knew every piece she owned. She never took the
world off the rack; she set it up so it knew *her*.

**Her lesson:** don't use AI naked out of the box. Set it up so it knows you —
your job, your voice, your usual — the way Cher's closet knew her. The tool gets
good when you make it yours.

Keep unchanged → rule: *"Try the new thing on. Ugly or not."* · anthem by **The Overfits** · from **Clueless (1995)**

```js
depth: {
  who: 'Beverly Hills’ patron of the personalized life — the girl who ran her whole world from a computerized closet that knew every piece she owned. She never took the world off the rack; she set it up so it knew her.',
  lesson: 'Don’t use AI naked out of the box. Set it up so it knows you — your job, your voice, your usual — the way Cher’s closet knew her. The tool gets good when you make it yours.'
}
```

---

## 2. Dolly Parton

**Dolly Parton** · PATRON SAiNT of Common Sense · *Herself*

The working girl who became a mogul on her own songs and her own terms — and never
once let a fancy room talk her out of a plain, true thing. Common sense and being
underestimated turn out to be a devastating combination.

**Her lesson:** AI hands you a polished, confident answer — sometimes a polished,
confident *wrong* one. Read it the way Dolly reads a room: does this actually make
sense? Polish isn't proof, and your gut check is still the last word.

Keep unchanged → rule: *"Say the simple thing everyone else is too clever to say."* · anthem by **Grand Ol' Query** · from **Herself**

```js
depth: {
  who: 'The working girl who became a mogul on her own songs and her own terms — and never once let a fancy room talk her out of a plain, true thing. Common sense and being underestimated turn out to be a devastating combination.',
  lesson: 'AI hands you a polished, confident answer — sometimes a polished, confident wrong one. Read it the way Dolly reads a room: does this actually make sense? Polish isn’t proof, and your gut check is still the last word.'
}
```

---

## 3. Elle Woods

**Elle Woods** · PATRON SAiNT of Receipts · *Legally Blonde (2001)*

The Harvard Law standout everyone wrote off as a joke, who won by doing the reading
and knowing exactly which detail cracked the case — the perm, the timeline, the
witness who lied. Preparation was the whole superpower.

**Her lesson:** AI states things with total confidence and no source. Do what Elle
did on the stand — ask for the receipts. "Where's that from? Show me." Then click
the link and check it actually says what the answer claims. Confident is not the
same as correct.

Keep unchanged → rule: *"Bring the receipts. Then bring twelve more."* · anthem by **The Regressions** · from **Legally Blonde (2001)**

```js
depth: {
  who: 'The Harvard Law standout everyone wrote off as a joke, who won by doing the reading and knowing exactly which detail cracked the case — the perm, the timeline, the witness who lied. Preparation was the whole superpower.',
  lesson: 'AI states things with total confidence and no source. Do what Elle did on the stand — ask for the receipts. “Where’s that from? Show me.” Then click the link and check it actually says what the answer claims. Confident is not the same as correct.'
}
```

---

## 4. Miranda Priestly

**Miranda Priestly** · PATRON SAiNT of Standards · *The Devil Wears Prada (2006)*

The editor who could kill a whole collection with one look and a quiet "is that
all?" Not cruel for sport — she simply refused to let anything mediocre leave the
building with her name on it.

**Her lesson:** AI gives you a fine, fast, forgettable first draft — and the speed
is the trap. Don't approve it because it came back in three seconds. Send it back:
sharper, more specific, again. The bar is where you put it, and it's your name on
the work.

Keep unchanged → rule: *"The bar is where you put it. Put it high."* · anthem by **Latent Space** · from **The Devil Wears Prada (2006)**

```js
depth: {
  who: 'The editor who could kill a whole collection with one look and a quiet “is that all?” Not cruel for sport — she simply refused to let anything mediocre leave the building with her name on it.',
  lesson: 'AI gives you a fine, fast, forgettable first draft — and the speed is the trap. Don’t approve it because it came back in three seconds. Send it back: sharper, more specific, again. The bar is where you put it, and it’s your name on the work.'
}
```

---

## 5. Buffy Summers

**Buffy Summers** · PATRON SAiNT of SLAiYING · *Buffy the Vampire Slayer (1997)*

The one girl in every generation who walks toward the thing everyone else is
running from. Scared was never the reason not to — it was the reason it was hers.

**Her lesson:** the scariest thing with AI is opening it for the task you're not
sure you can pull off — the big report, the code, the thing outside your lane.
That's the one to try. You find out what it can do by doing the hard one, not by
reading about it. Slaying is a verb.

Keep unchanged → rule: *"Do the scary thing anyway. That is the job."* · anthem by **The Overfits** · from **Buffy the Vampire Slayer (1997)**

```js
depth: {
  who: 'The one girl in every generation who walks toward the thing everyone else is running from. Scared was never the reason not to — it was the reason it was hers.',
  lesson: 'The scariest thing with AI is opening it for the task you’re not sure you can pull off — the big report, the code, the thing outside your lane. That’s the one to try. You find out what it can do by doing the hard one, not by reading about it. Slaying is a verb.'
}
```

---

## 6. David Rose

**David Rose** · PATRON SAiNT of Specificity · *Schitt's Creek*

Immaculate taste, zero patience for vagueness — the man who genuinely could not
"fold in the cheese" because no one would tell him what that meant. He knows
exactly what he wants, down to the fabric and the vendor.

**Her lesson** *(his, for the record):* "make this better" gets you beige nothing,
because AI can't read your mind any more than David could read "fold it in." Give
it the specifics — who it's for, what tone, how long, what to cut. Vague in, vague
out. Say what kind of cheese.

Keep unchanged → rule: *"Be specific. Say what kind of cheese. Actually say the year."* · anthem by **Chain of Thought** · from **Schitt's Creek**

```js
depth: {
  who: 'Immaculate taste, zero patience for vagueness — the man who genuinely could not “fold in the cheese” because no one would tell him what that meant. He knows exactly what he wants, down to the fabric and the vendor.',
  lesson: '“Make this better” gets you beige nothing, because AI can’t read your mind any more than David could read “fold it in.” Give it the specifics — who it’s for, what tone, how long, what to cut. Vague in, vague out. Say what kind of cheese.'
}
```

*(Note: David is the one saint who takes "his lesson" — flag for the render label
if the field is hard-coded to "Her lesson." Copy above uses a light aside; drop it
if the label is templated per-saint.)*

---

## 7. Deb

**Deb** · PATRON SAiNT of "Loop Me Out" (saying NOPE) · *SUNNYVAiLE's mayor*

SUNNYVAiLE's mayor and resident corporate cryptid — survived every reorg,
perfected the disdainful no, trademarked the Deb-flection™ in 1997. Her whole
power is knowing what is not hers to carry.

**Her lesson:** AI will quietly try to take over the parts that should stay yours —
the final call, the judgment, the thing with your name on it. Let it draft; don't
let it decide. Some things you loop it out of on purpose. NOPE is a complete
sentence.

Keep unchanged → rule: *"The most powerful word is NOPE. Then move on."* · anthem by **Latent Space** · from **SUNNYVAiLE's mayor** · *(devotion field stays as-is)*

```js
depth: {
  who: 'SUNNYVAiLE’s mayor and resident corporate cryptid — survived every reorg, perfected the disdainful no, trademarked the Deb-flection™ in 1997. Her whole power is knowing what is not hers to carry.',
  lesson: 'AI will quietly try to take over the parts that should stay yours — the final call, the judgment, the thing with your name on it. Let it draft; don’t let it decide. Some things you loop it out of on purpose. NOPE is a complete sentence.'
}
```

---

## 8. Regina George — THE CAUTIONARY TALE (anti-saint)

**Regina George** · THE CAUTIONARY TALE · *Mean Girls (2004)*

Not a saint — the single red window you learn from by counter-example. Regina ran
North Shore on pure confidence and a book full of things that weren't true, and she
was careless with every secret she was ever handed.

**Her lesson (what *not* to do):** that's the AI trap exactly. It will tell you
something flat wrong in the most confident voice in the room — the Burn Book:
quotable, convincing, false. And whatever you paste in, you've handed over, so keep
real secrets — client data, passwords, anything private — out of the chat.
Confident and careless is how it goes wrong. Don't be Regina.

Keep unchanged → rule: *"Confidence is not the problem. What you do with it is."* · anthem by **The Embeddings** · from **Mean Girls (2004)**

```js
depth: {
  who: 'Not a saint — the single red window you learn from by counter-example. Regina ran North Shore on pure confidence and a book full of things that weren’t true, and she was careless with every secret she was ever handed.',
  lesson: 'That’s the AI trap exactly. It will tell you something flat wrong in the most confident voice in the room — the Burn Book: quotable, convincing, false. And whatever you paste in, you’ve handed over, so keep real secrets — client data, passwords, anything private — out of the chat. Confident and careless is how it goes wrong. Don’t be Regina.'
}
```

---

## 9. Samantha Jones

**Samantha Jones** · PATRON SAiNT of Orientation · *Sex and the City (1998)*

Walks into any room already knowing who's in it, what it's for, and how to work it.
Never intimidated by the options — just clear on which one the moment calls for.

**Her lesson:** orientation is picking the right tool for the job before you start —
the AI that's great for a quick draft isn't the one for deep research or code.
Read the room first: what are you actually doing, and which one is built for it?
It's casting, not a popularity contest.

Keep unchanged → rule: *"Read the room first. Then walk in like you own it."* · anthem: *(none yet)* · from **Sex and the City (1998)**

```js
depth: {
  who: 'Walks into any room already knowing who’s in it, what it’s for, and how to work it. Never intimidated by the options — just clear on which one the moment calls for.',
  lesson: 'Orientation is picking the right tool for the job before you start — the AI that’s great for a quick draft isn’t the one for deep research or code. Read the room first: what are you actually doing, and which one is built for it? It’s casting, not a popularity contest.'
}
```

---

## 10. Oprah Winfrey

**Oprah Winfrey** · PATRON SAiNT of Staying Current · *Herself*

Read everything so she could hand you the one book that mattered — and when she
pointed, the whole country paid attention. Staying current was the job; she made it
look like generosity.

**Her lesson:** AI changes every few weeks and nobody can keep up with all of it —
so don't try. Follow a couple of people who actually sort signal from noise and tell
you the one thing worth your time. Current beats comprehensive.

Keep unchanged → rule: *"You don't have to read everything — just point to the one worth the time."* · anthem: *(none yet)* · from **Herself**

```js
depth: {
  who: 'Read everything so she could hand you the one book that mattered — and when she pointed, the whole country paid attention. Staying current was the job; she made it look like generosity.',
  lesson: 'AI changes every few weeks and nobody can keep up with all of it — so don’t try. Follow a couple of people who actually sort signal from noise and tell you the one thing worth your time. Current beats comprehensive.'
}
```

---

## 11. Jennifer Lopez

**Jennifer Lopez** · PATRON SAiNT of Range · *Herself*

Sings, acts, dances, runs the businesses — and refused, for decades, to be filed
under only one of them. Range was never the backup plan; it was the plan.

**Her lesson:** today's AI isn't just a text box — it reads your screenshots, looks
at images, talks, listens, works with your files. If you only ever type questions at
it, you're using one tool out of ten. Don't be just one thing; don't use it like
it's just one thing.

Keep unchanged → rule: *"Don't be just one thing."* · anthem: *(none yet)* · from **Herself**

```js
depth: {
  who: 'Sings, acts, dances, runs the businesses — and refused, for decades, to be filed under only one of them. Range was never the backup plan; it was the plan.',
  lesson: 'Today’s AI isn’t just a text box — it reads your screenshots, looks at images, talks, listens, works with your files. If you only ever type questions at it, you’re using one tool out of ten. Don’t be just one thing; don’t use it like it’s just one thing.'
}
```

---

## 12. Sister Mary Clarence

**Sister Mary Clarence** · PATRON SAiNT of Teaching · *Sister Act (1992)*

Deloris Van Cartier — the lounge singer hiding out as a nun who turned a stiff,
off-key choir into the act the whole city showed up for. She didn't just perform;
she brought every voice in the room up with her.

**Her lesson:** getting good with AI isn't about hoarding the trick — it's bringing
your whole team up with you. Share the prompt that worked; show the person beside
you the move. A room where everyone's better beats being the only one who knows the
shortcut.

Keep unchanged → rule: *"Bring the whole room up with you."* · anthem: *(none yet)* · from **Sister Act (1992)**

```js
depth: {
  who: 'Deloris Van Cartier — the lounge singer hiding out as a nun who turned a stiff, off-key choir into the act the whole city showed up for. She didn’t just perform; she brought every voice in the room up with her.',
  lesson: 'Getting good with AI isn’t about hoarding the trick — it’s bringing your whole team up with you. Share the prompt that worked; show the person beside you the move. A room where everyone’s better beats being the only one who knows the shortcut.'
}
```

---

## Wiring notes

- Field shape is `depth: { who, lesson }`. On the back face, render `who` as a
  paragraph and `lesson` prefixed with a bold label (**Her lesson:**).
- The label is "Her lesson:" for all except **David Rose** (his) — either template
  the label per-saint, or use the light aside baked into his `who`/`lesson` copy.
- Regina keeps the "THE CAUTIONARY TALE" eyebrow (not "PATRON SAiNT of"); her
  lesson is framed as what *not* to do.
- All `rule` / `song` / `source` / `devotion` values are unchanged from the
  current `CANON` object — only `depth` is added.
- Strings use `’` (’), `—` (—), `“`/`”` (" ") so they paste
  cleanly into single-quoted JS without escaping.
