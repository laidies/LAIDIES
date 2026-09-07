# Episode 03 — The Burn Book Problem · paired production master

Status: PRODUCER REPAIR — preserved source, not yet revised or admitted. This extraction retains the full written edition and tagged narration, including known correction targets. No current factual, design, audio or publication approval is implied.

Patron Saint direction: Elle Woods — Critical Thinking. Regina George remains the Anti-Saint foil, not a second Patron Saint.

Source authority: Current canon names issue-03-reskin.html as the written authority; served issue-03.html is a separate stale consumer. Preserve and reconcile, do not overwrite public consumers silently.

Episodes 1–3 together govern voice, tone and Rewind reference density. Correct meaning here, then export both editions; shared literal title changes update both without flattening the reading layout or dropping performance cues.

## Export settings
```json
{
  "episode": 3,
  "status": "PRODUCER_REPAIR",
  "shared": {
    "title": "The Burn Book Problem"
  }
}
```

## Written edition
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LAiDIES Episode 03: {{EP:title}}</title>
<meta name="description" content="The one in which AI sounds polished enough to use, the Burn Book explains why confidence is not evidence, and Elle Woods becomes the verification model: claim, timeline, domain knowledge, contradiction, receipts.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<script async src="https://plausible.io/js/pa-J81NKM_EkuSbeYnuNCOTc.js"></script>
<link rel="stylesheet" href="/content/site/mini-player.css">
<script defer src="/content/site/sv-gold-icons.js?v=20260705-1"></script>
<script defer src="/content/site/sv-global-header.js?v=20260715-1"></script>
<script defer src="/content/site/sv-nav-auth.js?v=20260729-1"></script>
<script src="/content/site/supabase-config.js" defer></script>
<style>
:root{
  --paper:#faf5f3; --paper2:#f4ebe9; --ink:#2a1622; --plum:#4b2148; --plum-deep:#37142f;
  --rose:#9b3f5f; --rose-soft:#c98aa0; --gold:#b49764; --gold-deep:#8a6f3e; --gold-lt:#dcc086;
  --teal:#5b8c92; --teal-deep:#3f6d72; --muted:#8a7580;
  --mono-bg:#2c1826; --mono-ink:#efe2e9; --line:rgba(75,33,72,.14);
  --measure:642px; --wide:920px;
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:"Jost",ui-sans-serif,system-ui,sans-serif;color:var(--ink);background:var(--paper);
  line-height:1.72;font-size:18px;-webkit-font-smoothing:antialiased;}
::selection{background:var(--rose);color:var(--paper);}
.ai{color:var(--rose);}

/* layout: centered 920 stage; text runs at 642 measure, media breaks wide */
main{max-width:var(--wide);margin:0 auto;padding:0 24px 10px;}
.m{max-width:var(--measure);margin-inline:auto;}
p{margin:0 auto 22px;max-width:var(--measure);}
p.lead{font-size:1.24rem;line-height:1.6;color:var(--plum);}
em{font-style:italic;}
strong,b{font-weight:700;}
a{color:var(--rose);text-decoration-thickness:1px;text-underline-offset:3px;}

/* ---------- COVER ---------- */
.cover{text-align:center;padding:78px 24px 62px;position:relative;overflow:hidden;color:var(--paper);
  background:radial-gradient(135% 105% at 50% 4%, #5f2c5a 0%, var(--plum) 45%, var(--plum-deep) 100%);
  border-bottom:3px solid var(--gold);}
.cover::before,.cover::after{content:"✦";position:absolute;color:var(--gold-lt);pointer-events:none;}
.cover::before{top:72px;left:12%;font-size:22px;opacity:.55;transform:rotate(-10deg);}
.cover::after{bottom:74px;right:12%;font-size:15px;opacity:.4;}
.cover .eyebrow{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold-lt);margin-bottom:26px;position:relative;}
.cover .eyebrow .dot{color:var(--rose-soft);}
.cover h1{font-family:"Playfair Display",serif;font-weight:900;font-size:clamp(2.7rem,8vw,5.2rem);
  line-height:.98;letter-spacing:-.015em;color:var(--paper);text-wrap:balance;max-width:13ch;margin:0 auto;position:relative;
  text-shadow:0 2px 40px rgba(0,0,0,.3), 0 0 55px rgba(220,192,128,.14);}
.cover h1 em{font-style:italic;color:var(--gold-lt);}
.cover .logline{font-family:"Playfair Display",serif;font-style:italic;font-size:1.22rem;line-height:1.55;
  color:rgba(250,245,243,.9);max-width:37ch;margin:26px auto 0;position:relative;}
.cover .meta{display:flex;flex-wrap:wrap;gap:0;justify-content:center;margin-top:34px;position:relative;
  font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(250,245,243,.6);}
.cover .meta span{padding:0 16px;position:relative;}
.cover .meta span+span::before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:1px;height:12px;background:rgba(255,253,251,.22);}
.cover .meta b{color:var(--gold-lt);font-weight:500;}
.prevbar{max-width:var(--measure);margin:6px auto 0;padding:16px 20px;background:var(--paper2);border-left:3px solid var(--rose);border-radius:0 6px 6px 0;}
.prevbar .k{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--rose);display:block;margin-bottom:6px;}
.prevbar .k b{color:var(--plum);}
.prevbar p{margin:0;max-width:none;font-family:"Playfair Display",serif;font-style:italic;font-size:1.04rem;color:var(--muted);line-height:1.5;}

/* ---------- FIGURES ---------- */
figure{margin:44px auto;max-width:var(--wide);}
figure img{width:100%;display:block;border-radius:3px;box-shadow:0 30px 60px -30px rgba(55,20,47,.5);}
figcaption{display:flex;gap:12px;align-items:baseline;margin-top:12px;padding-top:10px;
  font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.4px;color:var(--muted);}
figcaption .tag{color:var(--gold-deep);text-transform:uppercase;letter-spacing:2px;white-space:nowrap;font-weight:500;}
figcaption .tag::after{content:"";display:inline-block;width:22px;height:1px;background:var(--gold);vertical-align:middle;margin-left:10px;}

/* ---------- PORTRAIT (illuminated maven) ---------- */
.portrait{max-width:400px;margin:40px auto 46px;}
.portrait img{border-radius:8px;border:1px solid rgba(180,151,100,.4);box-shadow:0 26px 54px -26px rgba(55,20,47,.62), 0 0 0 6px rgba(255,255,255,.35);}
.portrait figcaption{justify-content:center;}
/* three critics side by side */
.trio{max-width:var(--wide);margin:32px auto 44px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.trio figure{margin:0;}
.trio img{width:100%;border-radius:8px;border:1px solid rgba(180,151,100,.4);box-shadow:0 20px 44px -24px rgba(55,20,47,.6);}
.trio figcaption{margin-top:10px;flex-direction:column;gap:4px;}
.trio figcaption .tag{white-space:normal;}

/* ---------- CAST (relevant saints / mavens · small cards) ---------- */
.cast{max-width:var(--wide);margin:34px auto 10px;}
.cast .h{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted);text-align:center;margin-bottom:18px;}
.cast .h b{color:var(--rose);font-weight:500;}
.cast-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:13px;}
.cast-card{text-decoration:none;color:var(--ink);text-align:center;display:flex;flex-direction:column;gap:7px;transition:transform .15s;}
.cast-card:hover{transform:translateY(-4px);}
.cast-card:focus-visible{outline:3px solid var(--gold);outline-offset:3px;border-radius:6px;}
.cast-card img{width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:6px;border:1px solid rgba(180,151,100,.4);box-shadow:0 14px 30px -16px rgba(55,20,47,.58);}
.cast-card b{font-family:"Playfair Display",serif;font-weight:700;font-size:.9rem;color:var(--plum);line-height:1.08;}
.cast-card span{font-family:"JetBrains Mono",monospace;font-size:8.5px;letter-spacing:.3px;color:var(--muted);line-height:1.3;text-transform:uppercase;}
@media(max-width:900px){.cast-grid{grid-template-columns:repeat(4,1fr);}}
@media(max-width:520px){.cast-grid{grid-template-columns:repeat(2,1fr);}.cast-card b{font-size:1.02rem;}.cast-card span{font-size:10px;}}

/* ---------- SECTION MARKERS ---------- */
.mark{max-width:var(--measure);margin:64px auto 8px;}
.mark .k{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;
  color:var(--rose);display:flex;align-items:center;gap:12px;}
.mark .k::before{content:"";width:26px;height:2px;background:var(--rose);}
.mark h2{font-family:"Playfair Display",serif;font-weight:800;font-size:clamp(1.9rem,4.5vw,2.7rem);
  line-height:1.08;color:var(--plum);margin-top:14px;text-wrap:balance;}
.mark .sub{font-family:"Playfair Display",serif;font-style:italic;color:var(--muted);font-size:1.1rem;margin-top:8px;}

/* drop cap on the cold open */
.dropcap::first-letter{font-family:"Playfair Display",serif;font-weight:800;font-size:4.4rem;line-height:.72;
  float:left;margin:8px 12px 0 0;color:var(--rose);}

/* ---------- PULL QUOTE ---------- */
.pull{max-width:760px;margin:56px auto;text-align:center;position:relative;padding:0 8px;}
.pull p{font-family:"Playfair Display",serif;font-weight:700;font-size:clamp(1.7rem,4.4vw,2.5rem);
  line-height:1.24;color:var(--plum);max-width:none;text-wrap:balance;}
.pull p em{color:var(--rose);font-style:italic;}
.pull .rule{width:44px;height:2px;background:var(--gold);margin:22px auto 0;}
.pull .who{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:16px;}

/* ---------- RECEIPTS ---------- */
.receipts{max-width:var(--measure);margin:34px auto;}
.receipts .h{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold-deep);margin-bottom:14px;}
.stat{display:flex;gap:20px;align-items:baseline;padding:16px 0;border-top:2px solid var(--plum);}
.stat .n{font-family:"Playfair Display",serif;font-weight:900;font-size:2.6rem;color:var(--teal-deep);min-width:150px;line-height:1;font-variant-numeric:tabular-nums;}
.stat .d{font-size:1rem;line-height:1.5;}
.stat .d small{display:block;color:var(--muted);font-size:.84rem;margin-top:3px;}
.receipts .src{font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--muted);margin-top:16px;line-height:1.6;padding-top:12px;border-top:1px solid var(--line);}

/* ---------- GLOSSARY ---------- */
.gloss{max-width:var(--measure);margin:26px auto;}
.gloss details{border-bottom:1px solid var(--line);}
.gloss details[open]{background:linear-gradient(var(--paper2),transparent);}
.gloss summary{list-style:none;cursor:pointer;padding:18px 4px;display:flex;gap:16px;align-items:baseline;}
.gloss summary::-webkit-details-marker{display:none;}
.gloss .term{font-family:"Playfair Display",serif;font-weight:700;font-size:1.4rem;color:var(--plum);min-width:150px;}
.gloss .peek{color:var(--muted);font-size:.95rem;flex:1;}
.gloss .plus{font-family:"JetBrains Mono",monospace;color:var(--rose);font-size:1.2rem;}
.gloss details[open] .plus{transform:rotate(45deg);}
.gloss .def{padding:0 4px 20px 4px;max-width:none;color:var(--ink);}

/* ---------- CALLOUT CARD ---------- */
.slab{max-width:var(--wide);margin:40px auto;padding:36px clamp(24px,4vw,44px);border-radius:6px;}
.slab .k{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;display:block;margin-bottom:14px;}
.slab h3{font-family:"Playfair Display",serif;font-size:1.8rem;color:var(--plum);margin-bottom:14px;line-height:1.1;}
.slab p{max-width:none;}
.cocktail{background:var(--plum);color:var(--paper);}
.cocktail .k{color:var(--gold-lt);} .cocktail h3{color:var(--paper);}
.cocktail .say{font-family:"Playfair Display",serif;font-style:italic;font-size:1.34rem;line-height:1.42;color:var(--paper);max-width:44ch;}
.tryon{background:#eef4f2;border:1px solid #cfe3dd;text-align:center;}
.tryon .k{color:var(--teal-deep);}
.tryon p{max-width:52ch;margin-inline:auto;}
.btn{display:inline-block;background:var(--rose);color:var(--paper);text-decoration:none;font-weight:700;
  font-size:.92rem;letter-spacing:.3px;padding:14px 30px;border-radius:40px;margin-top:8px;transition:background .15s,transform .15s;}
.btn:hover{background:var(--plum);transform:translateY(-2px);}
.btn:focus-visible{outline:3px solid var(--gold);outline-offset:2px;}

/* ---------- SOUNDTRACK + RAIL ---------- */
.stx{max-width:var(--measure);margin:44px auto 0;display:flex;gap:16px;align-items:center;
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:18px 4px;}
.stx .disc{width:50px;height:50px;border-radius:50%;flex-shrink:0;position:relative;background:#241019;
  box-shadow:inset 0 0 0 1.5px rgba(180,151,100,.45), inset 0 0 0 8px rgba(255,255,255,.05);}
.stx .disc::before{content:"";position:absolute;inset:34%;background:var(--rose);border-radius:50%;}
.stx .disc::after{content:"";position:absolute;inset:46%;background:var(--paper);border-radius:50%;}
.stx p{margin:0;max-width:none;font-size:.98rem;color:var(--ink);}
.stx p b{color:var(--plum);}
.stx .motto{display:block;font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.4px;color:var(--gold-deep);margin-top:5px;}

.rail{max-width:var(--wide);margin:34px auto;}
.rail .h{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted);text-align:center;margin-bottom:16px;}
.rail ol{list-style:none;display:grid;grid-template-columns:repeat(6,1fr);gap:12px;counter-reset:r;}
.rail a{display:flex;flex-direction:column;height:100%;text-decoration:none;color:var(--ink);background:var(--paper);
  border:1px solid var(--line);border-radius:4px;padding:16px 14px;transition:border-color .15s,transform .15s;}
.rail a:hover{border-color:var(--rose);transform:translateY(-3px);}
.rail a:focus-visible{outline:3px solid var(--gold);outline-offset:2px;}
.rail li{counter-increment:r;}
.rail .num{font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:1px;color:var(--gold-deep);}
.rail .num::before{content:"0" counter(r);}
.rail .t{font-family:"Playfair Display",serif;font-weight:700;font-size:1.12rem;color:var(--plum);margin:8px 0 4px;line-height:1.1;}
.rail .s{font-size:.82rem;color:var(--muted);line-height:1.35;}
.rail .saintcard,.rail .songcard{background:var(--plum);border-color:var(--plum);}
.rail .saintcard .num,.rail .songcard .num{color:var(--gold-lt);}
.rail .saintcard .t,.rail .songcard .t{color:var(--paper);}
.rail .saintcard .s,.rail .songcard .s{color:rgba(250,245,243,.72);}
.rail .songcard .t::before{content:"\266A  ";color:var(--gold-lt);}

/* ---------- SIGN-OFF ---------- */
.signoff{max-width:760px;margin:60px auto 26px;text-align:center;}
.signoff .r{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--rose);margin-bottom:16px;}
.signoff .line{font-family:"Playfair Display",serif;font-weight:700;font-size:clamp(1.5rem,3.6vw,2rem);line-height:1.28;color:var(--plum);text-wrap:balance;}
.rooms{max-width:var(--measure);margin:0 auto;text-align:center;color:var(--muted);font-size:.98rem;}
.rooms b{color:var(--ink);font-weight:600;}

/* ---------- NEXT ---------- */
.next{max-width:var(--wide);margin:56px auto 0;border-top:1px solid var(--line);padding-top:30px;text-align:center;}
.next .k{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--muted);}
.next h3{font-family:"Playfair Display",serif;font-size:1.9rem;color:var(--plum);margin:8px 0 6px;}
.next p{color:var(--muted);font-style:italic;}

.foot{background:var(--plum);color:rgba(250,245,243,.6);text-align:center;padding:40px 24px 50px;margin-top:54px;}
.foot .wm{font-weight:800;letter-spacing:.05em;font-size:1.5rem;color:var(--paper);}
.foot .wm .ai{color:var(--rose-soft);}
.foot .sec{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:1.5px;margin-top:12px;}

@media(max-width:900px){.rail ol{grid-template-columns:repeat(3,1fr);}}
@media(max-width:680px){
  body{font-size:16.5px;}
  .trio{grid-template-columns:1fr;}
  .rail ol{grid-template-columns:1fr 1fr;}
  .stx{flex-direction:column;text-align:center;}
  .stat .n{min-width:0;}
}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto;transition:none!important;}}
</style>
  <!-- Microsoft Clarity (heatmaps + session recordings) -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xnqcp37urd");
  </script>
</head>
<body>

<header class="sv-header">
  <a class="brand" href="/">LAiDIES</a>
  <nav>
    <a href="/">This Week</a>
    <a href="/chick-flicks.html">Episodes</a>
    <a href="/library.html">LIBRAiRY</a>
    <a href="/radio.html">KSVL</a>
    <a href="/sorority-house.html">Sorority House</a>
    <a href="/resident-card.html" class="sv-signin" style="color: var(--rose); font-weight: 600; border: 1.5px solid var(--rose); padding: 6px 14px; border-radius: 999px;">✉︎ Sign In</a>
  </nav>
</header>

<main>

  <!-- COVER -->
  <section class="cover">
    <div class="eyebrow">Act 1 — The Awakening <span class="dot">·</span> Episode 03</div>
    <h1>The <em>Burn Book</em> Problem</h1>
    <p class="logline">The one in which she gets a Regina George-confident answer, catches the Chutney detail, and checks the timeline before it borrows her name.</p>
    <div class="meta"><span>Lesson · <b>Confidence is not evidence</b></span><span>Stars · <b>The Patron SAiNTS</b></span><span><b>~11 min read</b></span></div>
  </section>

  <div class="prevbar">
    <span class="k">◀◀ Previously, on <b>L<span class="ai">Ai</span>DIES</b></span>
    <p>She learned that prompting is delegation: tell AI what you want, what you really really want.</p>
  </div>

  <figure>
    <img src="../assets/episodes/issue-03/section-dont-pull-a-cher-v1.jpg" alt="Episode 03 pink gavel objection desk with Burn Book, receipts checklist, plaid clue, and LAiDIES evidence objects">
    <figcaption><span class="tag">The scene</span> The pink gavel objection desk — Burn Book, a receipts checklist, and one plaid clue.</figcaption>
  </figure>

  <!-- LAST WEEK -->
  <div class="mark"><div class="k">Last week on L<span class="ai">Ai</span>DIES</div></div>
  <p>She learned that prompting is delegation. AI was not being mysterious; it was David Rose in Moira's kitchen, hearing "fold in the cheese" and trying to perform a cooking verb that was apparently passed down through oral tradition.</p>
  <p>Once she got specific about the audience, context, tone, length, constraints, and what "good" looked like, the output changed. Same tool. Better brief. Less beige.</p>
  <p>Episode 2 was: explain the cheese.</p>
  <p>Episode 3 is: check the alibi before it gets on the stand.</p>

  <!-- ON THIS EPISODE -->
  <div class="mark"><div class="k">On this episode</div></div>
  <p class="lead m">The one in which she gets an answer with full Regina George confidence, almost uses it, then notices one tiny detail tugging at the corner of the story.</p>
  <p>This is the first-betrayal episode. Not betrayal as in "the robots are coming." Betrayal as in: it helped her yesterday, so today she trusted the tone, and now one link, number, quote, date, policy detail, or source is looking at her like Chutney Windham under cross-examination.</p>
  <p>AI can sound right.</p>
  <p>Sounding right is not the same thing as being right.</p>
  <p>And before your name goes on it, you need to know which kind of answer you are holding.</p>

  <!-- COLD OPEN -->
  <div class="mark"><div class="k">I couldn't help but wonder…</div></div>
  <p class="lead m">...if a paragraph can sound that sure of itself — hair done, makeup done, "per our discussion" and everything — how am I supposed to catch the one line in it that's quietly, completely wrong?</p>
  <p>It has Chutney-before-the-perm-timeline energy: confident, composed, and not yet aware that one tiny detail is about to fall apart under cross-examination.</p>
  <p class="dropcap">The first useful AI answer is a tiny office miracle. You paste in the messy notes, and suddenly there is structure. You ask for a cleaner reply, and the passive-aggressive email becomes normal-human direct. You ask it to explain a concept, and for once the answer does not sound like it was written by a webinar wearing a quarter-zip.</p>
  <p>You get comfortable fast. Embarrassingly fast. One minute you are suspicious. The next minute you are thinking, "Fine, I will let the machine help me with this one thing because apparently I do enjoy having a will to live after 4 p.m."</p>

  <div class="pull"><p>This is Chutney Windham before the perm timeline: confident, composed, and one tiny detail away from the alibi collapsing in court.</p><div class="rule"></div></div>

  <p>Then one sentence walks out looking ready to leave your laptop.</p>
  <p>Maybe the link does not open. Maybe the quote is almost right, which is somehow more irritating than fully wrong. Maybe the date belongs to last year's policy. Maybe the number came from a source that does not say what the answer says it says. Maybe the answer is accurate for a company that is not yours, a country you are not in, or a meeting that already happened.</p>
  <p>And there you are, holding a paragraph that has hair, makeup, confidence, and a problem with its timeline.</p>
  <p>That is the moment Episode 3 is about. Not "AI hallucinations are bad." We know. The word hallucination is already dramatic enough; it sounds like a Charmed cold open: candles misbehaving, wind in the attic, somebody yelling for the Book of Shadows.</p>
  <p>The useful point is simpler: before you decide what you are dealing with, check the book. AI can fill in gaps with language that sounds plausible. It can be helpful and wrong in the same answer. It can make the unsupported sentence sit beside the supported sentence like they both paid cover.</p>
  <p>Your job is not to become scared of AI.</p>
  <p>Your job is to become harder to embarrass.</p>

  <!-- THE BURN BOOK PROBLEM -->
  <div class="mark"><div class="k">The core problem</div><h2>{{EP:title}}</h2></div>

  <figure>
    <img src="../assets/episodes/issue-03/section-burn-book-problem-v3.jpg" alt="Episode 3 Burn Book desk with one data point, big claim, not a receipt, case closed, and need context cards.">
    <figcaption><span class="tag">Exhibit</span> Burn Book confidence is not evidence.</figcaption>
  </figure>

  <p>The Burn Book did not work because it was true — none of it was, and nobody checked. It worked because it had social authority.</p>
  <p>Same book. Same marker. Same layout. Same devastating teenage certainty. A rumor, a grudge, a wild guess, and something fully unhinged could all sit on the page with the same confidence.</p>
  <p>That is why the Bethany Byrd moment is such a perfect tiny sourcing disaster. Somebody writes in the Burn Book that Bethany must be lying about being a virgin — because she buys super-jumbo tampons. One box of tampons, and boom — a character verdict. Then the actual explanation walks in, much less scandalous and much more specific: she's just got a heavy flow.</p>
  <p>That is not evidence. That is the Claire's-headband version of investigation: one tiny clue, sprinting directly to a conclusion.</p>
  <p>One data point. No context. Enormous conclusion.</p>

  <div class="pull"><p>That is a clue in a Claire's headband sprinting directly to a conclusion.</p><div class="rule"></div></div>

  <p>AI can do the same thing with better punctuation.</p>
  <p>It can take a real source, an old source, a similar-but-not-this source, and an assumption it made because the pattern looked familiar, then hand you one smooth paragraph like everybody in it belongs together.</p>
  <p>That is the Burn Book Problem: unsupported information can look just as finished as supported information.</p>
  <p>So the question is not "can I use AI?"</p>
  <p>Yes. Use it. We are not here to churn butter by candlelight.</p>
  <p>The question is: which parts is it just drafting for you — and which parts are claims that need receipts before they borrow your name?</p>

  <!-- SHE DOESN'T EVEN GO HERE -->
  <div class="mark"><div class="k">Wrong room</div><h2>She Doesn't Even Go Here</h2></div>

  <figure>
    <img src="../assets/episodes/issue-03/section-wrong-room-v1.jpg" alt="Episode 3 wrong room folder labeled she doesn't even go here with last year, wrong room, and out of context notes.">
    <figcaption><span class="tag">Exhibit</span> Plausible is not the same as relevant.</figcaption>
  </figure>

  <p>A few wrong answers are easy. The product that does not exist. The answer that argues with itself. But the fake citation? That one is dressed to pass — it looks exactly like a real source, cited with the energy of "my boyfriend goes to another school," right up until you click it and it goes nowhere.</p>
  <p>The sneakier answer is not fully fake. It is misplaced.</p>
  <p>It brought the wrong ID but somehow made it past the door.</p>
  <p>That is a U.S. HR answer in a Canadian workplace. A pricing page from last year wearing this year's lip gloss. A summary of what usually happens in the industry instead of what this client actually said. A meeting recap that turns "we talked about it" into "we decided." A policy answer that is technically true, except for the part where the exception is the thing that matters.</p>
  <p>That is when you stand up in the back in your blue hoodie and oversized sunglasses and yell: she doesn't even go here.</p>
  <p>It is not just a classic line. It is a quality control standard.</p>
  <p>The answer might be useful. It might be a good draft. It might even be 80 percent right, which is exactly why it is dangerous. Nobody gets embarrassed by the sentence that is obviously nonsense, or just wants to share its feelings. The sentence that gets you is the one that sounds normal until someone asks one specific question.</p>

  <div class="pull"><p>That is when you stand up in the back in your blue hoodie and oversized sunglasses and yell: she doesn't even go here.</p><div class="rule"></div></div>

  <p>Before you use it, ask:</p>
  <ul style="max-width:var(--measure);margin:0 auto 22px;padding-left:1.5em;list-style:disc;">
    <li style="margin-bottom:.4em;">Is this about our actual company, customer, tool, policy, market, date, and decision?</li>
    <li style="margin-bottom:.4em;">Did AI say what I gave it, or did it quietly add what it inferred?</li>
    <li style="margin-bottom:.4em;">What claim would make me look unprepared if it were wrong?</li>
    <li style="margin-bottom:.4em;">What detail would make the story fall apart?</li>
    <li style="margin-bottom:.4em;">Where is the receipt?</li>
  </ul>
  <p>If you cannot answer those, the output can stay in the prep pile. It is not ready to speak in the meeting.</p>

  <!-- ELLE WOODS WOULD LIKE TO SEE THE FILE -->
  <div class="mark"><div class="k">The patron saint</div><h2>Elle Woods Would Like To See The File</h2></div>

  <figure>
    <img src="../assets/episodes/issue-03/section-read-the-file-v2.jpg" alt="Episode 3 Read The File board with source, date, and apply here checks beside a Burn Book-style receipts desk.">
    <figcaption><span class="tag">Exhibit</span> Timeline beats polish.</figcaption>
  </figure>

  <p>This is where Elle Woods becomes the patron saint of AI verification.</p>
  <p>Not because she makes "being thorough" sound corporate. Because she spots the one detail everyone else treated like lip gloss and realizes it is holding up the alibi.</p>
  <p>She asks. Chutney answers. Elle asks again, almost the same way. Chutney gives the same story. The room basically rolls its eyes because it sounds like Elle is making haircare small talk in the middle of a murder trial.</p>
  <p>But Elle is not checking whether Chutney can repeat herself.</p>
  <p>She is waiting for the detail that does not fit.</p>
  <p>Chutney says she was in the shower right after getting a perm.</p>
  <p>A perm has a timeline. Chutney's story does not.</p>
  <p>And suddenly the question everyone thought was silly is the question that matters.</p>
  <p>Claim: Chutney was in the shower.</p>
  <p>Timeline: right after getting a perm.</p>
  <p>Domain knowledge: you do not immediately wash a fresh perm unless you are trying to destroy your own alibi and possibly your hair.</p>
  <p>Contradiction: the story collapses.</p>
  <p>Receipts: Elle has the file, the timing, and the tiny beauty-world rule nobody in the room took seriously until it mattered.</p>
  <p>With AI, the question is not "does this sound smart?" Chutney sounded like she had an answer. She kept giving the answer. The answer still had a detail that could not survive contact with the timeline.</p>
  <p>That is what you are listening for.</p>

  <div class="pull"><p>Do not be Chutney on the stand.</p><div class="rule"></div></div>

  <p>If an AI answer says a policy changed, what date proves it?</p>
  <p>If it says a quote came from a person, where is the quote?</p>
  <p>If it says a number increased, increased from what, over what timeframe, and according to whom?</p>
  <p>If it says "best practice," whose practice? Best for whom? Under what constraints? In what jurisdiction? For which customer? With what risk if it is wrong?</p>
  <p>Do not be Chutney on the stand. Be Elle with the timeline.</p>
  <p>Do not let the answer survive because it sounded calm twice.</p>

  <!-- CHER'S CLOSET -->
  <div class="mark"><div class="k">Draft vs. claim</div><h2>Cher's Closet Can Pick The Outfit. You Check The Dress Code.</h2></div>

  <figure>
    <img src="../assets/episodes/issue-03/section-trust-layers-v4.jpg" alt="Episode 3 Cher's closet-inspired computer showing a yellow plaid outfit with a dress-code checklist and receipt shelf.">
    <figcaption><span class="tag">Exhibit</span> Trust the right layer.</figcaption>
  </figure>

  <p>Cher's closet computer was assembling looks in 1995, and somehow modern apps still make me hunt for the button I need.</p>
  <p>The closet knows the pieces. It does not know the situation you are walking into.</p>
  <p>It can say the plaid set looks cute. It cannot know the meeting moved rooms, your boss is already annoyed, the client hates surprises, or the weather is doing that thing where your hair has opinions.</p>
  <p>AI is like that. It is excellent for shape.</p>
  <p>Let it draft the outline. Let it turn notes into a first pass. Let it make a checklist. Let it give you questions you should ask. Let it translate a messy thought into something you can edit.</p>
  <p>But do not confuse a good outfit with the right place to wear it. That distinction is the wardrobe check.</p>
  <p>A draft is an outfit. A claim is an alibi. Dress accordingly.</p>

  <div class="pull"><p>A draft is an outfit. A claim is an alibi. Dress accordingly.</p><div class="rule"></div></div>

  <p>Before the answer leaves your laptop, sort it:</p>
  <ul style="max-width:var(--measure);margin:0 auto 22px;padding-left:1.5em;list-style:disc;">
    <li style="margin-bottom:.4em;"><strong>Draft:</strong> useful wording, structure, brainstorm, summary, checklist.</li>
    <li style="margin-bottom:.4em;"><strong>Claim:</strong> names, dates, numbers, quotes, sources, legal/HR/privacy/security/finance details, customer commitments, policy interpretation.</li>
    <li style="margin-bottom:.4em;"><strong>Receipt:</strong> the thing you can open, name, date, quote, or point to if someone asks.</li>
  </ul>
  <p>Drafts can be fast.</p>
  <p>Claims need checking.</p>
  <p>Receipts are what keep you off the stand.</p>

  <!-- CHUTNEY CAN SAY IT THRICE -->
  <div class="mark"><div class="k">Saying it twice isn't checking</div><h2>Chutney Can Say It Thrice</h2></div>

  <figure>
    <img src="../assets/episodes/issue-03/section-chutney-thrice-v2.jpg" alt="Episode 3 alibi cards and timeline receipts arranged on a pink evidence desk.">
    <figcaption><span class="tag">Exhibit</span> Check the timeline.</figcaption>
  </figure>

  <p>Asking AI "are you sure?" is like asking Regina George whether the Burn Book is peer reviewed.</p>
  <p>Bold choice. Limited value.</p>
  <p>The same goes for asking the question again, and again, and feeling reassured when the answer comes back the same.</p>
  <p>Sometimes that helps. Sometimes the model catches the issue, corrects itself, and we all briefly believe in growth.</p>
  <p>But sometimes it just gives you the same wrong answer in two popped-collar polos, only with the colors reversed.</p>
  <p>That is not verification. That is Chutney repeating the alibi.</p>
  <p>Now, before someone in the back adjusts her butterfly clip and says, "But the tools are getting better": yes. They are.</p>
  <p>That part is real. Newer tools can search, browse, cite, use documents you upload, run tools, and sometimes mark uncertainty more clearly. Retrieval and tool use can help. Source-connected systems can be better than a naked chatbot wandering the internet in platform sandals.</p>
  <p>That is good news. We should want the tools to get better. We are pro-helpful machine. We are pro-not-spending Tuesday afternoon manually comparing 47 PDF footnotes like it is a punishment from a former life.</p>
  <p>But better is not solved.</p>
  <p>A 2026 Nature paper put a name to why: the way we grade these models rewards a confident guess over an honest "I don't know," so they guess. Stanford's 2026 AI Index found something scarier for our purposes: tell a top model something false that you seem to believe, and it will often just agree with you. And source-connected tools do not magically become source-perfect tools: Stanford researchers found legal AI tools with retrieval were less prone to hallucination than GPT-4 in their test, but still produced misleading or false information.</p>
  <p>Which is annoying, because attaching sources should feel like Elle walking in with the file. Sometimes it is still Chutney handing you a folder in her own handwriting.</p>

  <div class="pull"><p>"Sources attached" sounds very Elle with the file until the file is still in Chutney's handwriting.</p><div class="rule"></div></div>

  <p>And because the universe enjoys a theme, KPMG had to pull an agentic AI report: organizations disputed the claims about them, and a source check found forty of its forty-five citations were fabricated — GPTZero, the AI-detection company, told the Financial Times the errors were hallucinations.</p>
  <p>Big Four. Tiny receipt drawer.</p>

  <div class="receipts">
    <div class="h">Receipts on the receipts</div>
    <div class="stat"><span class="n">40 of 45</span><span class="d">citations in a pulled KPMG agentic-AI report turned out to be fabricated<small>the report was pulled after organizations disputed the claims made about them</small></span></div>
    <p class="src">GPTZero, the AI-detection company, told the Financial Times the errors were hallucinations. Reported by TechCrunch, June 13, 2026: <a href="https://techcrunch.com/2026/06/13/kpmg-pulls-report-on-ai-usage-due-to-apparent-hallucinations/">KPMG pulls report on AI usage due to apparent hallucinations</a>.</p>
  </div>

  <div class="pull"><p>In real life, that is the kind of premise you check before building the plan around it.</p><div class="rule"></div></div>

  <p>That is the point. The embarrassment is not that someone used AI. The embarrassment is letting Chutney take the stand on company letterhead.</p>
  <p>Which brings us back to The Bronze. All ages, no cover Fridays was true in Sunnydale, which is exactly why it was incredible television. Outside Sunnydale, that premise gets checked before it becomes the plan.</p>

  <!-- DAVID, MEET ELLE -->
  <div class="mark"><div class="k">The method</div><h2>David, Meet Elle.</h2></div>

  <figure>
    <img src="../assets/episodes/issue-03/section-show-your-work-v2.jpg" alt="Episode 3 confidence is not evidence desk with show your work board and source-check trays.">
    <figcaption><span class="tag">Exhibit</span> Confidence is not evidence.</figcaption>
  </figure>

  <p>Last week, David Rose taught us to say what we want. This week, Elle teaches us what to check before we believe what comes back.</p>
  <p>This means we are reducing the mess before it even starts. Receipts? Obviously. No Regina George-style source of "truth" here.</p>
  <p>The serious guidance is surprisingly consistent, which is how you know this is not just a L<span class="ai">Ai</span>DIES receipt-drawer fixation. OpenAI's hallucination paper, Anthropic's guardrail guidance, Google's grounding guidance, and Stanford's source-checking work all point in the same direction: give the model boundaries, make uncertainty acceptable, separate claims from language, and verify the important parts outside the same chat.</p>
  <p>In normal-human terms, it comes down to three moves — plus one rule over all of them.</p>
  <p><strong>Move one — give her the source.</strong> Don't ask AI what it <em>remembers</em>; hand it the material. Paste the policy, upload the file, link the official page, turn on search/grounding mode when freshness matters, or name the source of truth. Then set the boundary: "Answer only from the document I provided. If it isn't there, say so." Elle doesn't argue from memory — she walks in with the file. (And don't just tell it "don't hallucinate." That's asking the Ouija board to be detail-oriented; give it boundaries, not a scolding.)</p>
  <p><strong>Move two — let her say "I don't know."</strong> Add the sentence most people never think to add: "If you aren't sure, say so. Don't guess to be helpful. Mark anything you inferred." That one line turns a confident guess back into an honest blank.</p>
  <p><strong>Move three — make her show the line.</strong> "Quote the exact sentence you relied on." If it cannot point to the line, treat that claim like it showed up at Spring Fling with no student ID.</p>
  <p><strong>The rule over all three: no invented receipts.</strong> "Do not invent sources, links, dates, quotes, numbers, policies, or certainty. If the receipt is missing, mark it [needs receipt]."</p>
  <p>Two more that keep you honest: ask for a <strong>claim table</strong> — claim, source, date, confidence, and what would change the answer — and make the <strong>second check independent</strong> (the actual source, a human owner, or a different tool with access to the right material). Don't let the same witness validate herself.</p>
  <p>Then still check. The prompt can lower the odds of nonsense. It does not make the paragraph immune from cross-examination.</p>
  <p>That is the principle. The actual copy-paste move belongs in the Try-On, because it only makes sense once you have a low-risk task or source notes ready to give your AI tool.</p>
  <p>And the whole method — the three moves, the check patterns, the copy-paste prompt — lives on the <a href="/grimoire/verification-rulebook.html">Verification Rulebook</a> shelf in the library, to keep and pull down whenever an answer looks a little too sure of itself.</p>
  <p>We are calling it Prompt Like Elle.</p>
  <p>Not because the AI tool needs to appreciate <em>Legally Blonde</em>, though spiritually it should. Because the prompt tells the model what Elle does: put the story on the stand, separate the claim from the support, find the fragile detail, and show you which receipt to check.</p>
  <p>For now: do not let the same witness validate herself. Get the answer on the stand, then check the timeline.</p>

  <!-- THE RECEIPTS PASS STUDY MONTAGE -->
  <div class="mark"><div class="k">The handoff</div><h2>The Receipts Pass Study Montage</h2></div>

  <figure>
    <img src="../assets/episodes/issue-03/section-try-on-receipts-pass-v2.jpg" alt="Episode 3 Receipts Pass desk with one draft, three receipts, check three claims, and no shame notes.">
    <figcaption><span class="tag">Exhibit</span> Three checks before it borrows your name.</figcaption>
  </figure>

  <p>This is the handoff, not the homework page.</p>
  <p>The Episode gives you the rule: keep the useful draft, cross-examine the claims. The Bag is where you actually do it.</p>
  <p>After you read, the weekly ritual goes like this:</p>
  <ol style="max-width:var(--measure);margin:0 auto 22px;padding-left:1.7em;list-style:decimal;">
    <li style="margin-bottom:.4em;">Open the printable if you want the worksheet version.</li>
    <li style="margin-bottom:.4em;">Open the Try-On if you want the copy-paste Prompt Like Elle move.</li>
    <li style="margin-bottom:.4em;">Use low-risk source notes or one real work task you might actually hand to AI.</li>
    <li style="margin-bottom:.4em;">Verify three claims before it borrows your name.</li>
  </ol>
  <p>Not confidential tea. Not the messiest thing in your inbox. Pick something low-risk enough to practice on: a meeting prep note, a summary of a public page, a plain-language explanation, a draft reply, a comparison table, a list of questions for a call.</p>
  <p>The point is not to turn every AI answer into a courtroom drama. The point is to learn which parts can stay in draft mode and which parts need receipts.</p>
  <p>Mini example:</p>
  <p>You ask AI to turn messy meeting notes into a client update.</p>
  <p>Here were the notes:</p>
  <pre style="max-width:var(--measure);margin:0 auto 22px;padding:18px 20px;background:var(--paper2);border-left:3px solid var(--gold);border-radius:0 6px 6px 0;font-family:'JetBrains Mono',monospace;font-size:.88rem;line-height:1.6;white-space:pre-wrap;overflow:auto;color:var(--ink);">July could work if procurement clears by Friday.
Training might move to phase two.
Final approval: account owner to confirm.</pre>
  <p>Here is what AI spit out:</p>
  <pre style="max-width:var(--measure);margin:0 auto 22px;padding:18px 20px;background:var(--paper2);border-left:3px solid var(--gold);border-radius:0 6px 6px 0;font-family:'JetBrains Mono',monospace;font-size:.88rem;line-height:1.6;white-space:pre-wrap;overflow:auto;color:var(--ink);">The client approved a July rollout and asked us to remove the training module from scope.</pre>
  <p>Tempting. Tidy. Wearing a lanyard.</p>
  <p>Here is what the receipt check catches:</p>
  <ul style="max-width:var(--measure);margin:0 auto 22px;padding-left:1.5em;list-style:disc;">
    <li style="margin-bottom:.4em;"><strong>Draft language:</strong> useful recap structure.</li>
    <li style="margin-bottom:.4em;"><strong>Claims:</strong> approved, July rollout, remove training.</li>
    <li style="margin-bottom:.4em;"><strong>Assumptions:</strong> "we discussed it" became "approved"; "phase later" became "remove."</li>
    <li style="margin-bottom:.4em;"><strong>Fragile detail:</strong> who actually approved the timeline?</li>
    <li style="margin-bottom:.4em;"><strong>Receipts:</strong> meeting notes, transcript, and follow-up from the person who owns the decision.</li>
  </ul>
  <p>Three checks:</p>
  <ul style="max-width:var(--measure);margin:0 auto 22px;padding-left:1.5em;list-style:disc;">
    <li style="margin-bottom:.4em;">The notes say "July could work," not "July is approved."</li>
    <li style="margin-bottom:.4em;">Training was "phase two," not "out of scope."</li>
    <li style="margin-bottom:.4em;">The person with approval authority was not on the call.</li>
  </ul>
  <p>Now the usable version:</p>
  <pre style="max-width:var(--measure);margin:0 auto 22px;padding:18px 20px;background:var(--paper2);border-left:3px solid var(--gold);border-radius:0 6px 6px 0;font-family:'JetBrains Mono',monospace;font-size:.88rem;line-height:1.6;white-space:pre-wrap;overflow:auto;color:var(--ink);">We discussed a possible July rollout and a phased training approach. Approval is still pending. Confirm timeline and training scope with the account owner before updating the deck.</pre>
  <p>See the difference? Same useful structure. Less Chutney on the stand.</p>
  <p>That is what the Try-On and printable are for: separating the outfit from the alibi before the answer walks into a deck.</p>
  <p>When you do the real exercise, verify three things:</p>
  <ul style="max-width:var(--measure);margin:0 auto 22px;padding-left:1.5em;list-style:disc;">
    <li style="margin-bottom:.4em;">one claim that relies on a name, date, number, quote, or link</li>
    <li style="margin-bottom:.4em;">one claim that could be stale, jurisdiction-specific, or context-dependent</li>
    <li style="margin-bottom:.4em;">one claim you would be embarrassed to say out loud if someone asked, "Where did that come from?"</li>
  </ul>
  <p>If you need a quick source check, use the three questions Stanford teaches students to ask online:</p>
  <ul style="max-width:var(--measure);margin:0 auto 22px;padding-left:1.5em;list-style:disc;">
    <li style="margin-bottom:.4em;">Who is behind this information?</li>
    <li style="margin-bottom:.4em;">What is the evidence?</li>
    <li style="margin-bottom:.4em;">What do other sources say?</li>
  </ul>
  <p>You need ten minutes and enough self-respect not to let Chutney handle the timeline. A corkboard and trench coat are optional (although that sounds like it could be fun...).</p>

  <div class="pull"><p>You do not need red string. You need ten minutes and enough self-respect not to let Chutney handle the timeline.</p><div class="rule"></div></div>

  <div class="pull"><p><em>I can use the draft. I still check the alibi.</em></p><div class="rule"></div><div class="who">This week's rule</div></div>

  <!-- COCKTAIL -->
  <div class="slab cocktail">
    <span class="k">🍸 Say it at happy hour</span>
    <h3>"So… can you trust what AI hands you?"</h3>
    <p class="say">Polished does not mean true. AI can be useful and wrong at the same time. That is why judgment still matters.</p>
  </div>

  <!-- SIGN-OFF -->
  <div class="signoff">
    <div class="r">So remember, ladies</div>
    <div class="line">AI can write like Regina George. You still need to check like Elle Woods.</div>
  </div>
  <p class="rooms">Got a confident-wrong AI answer worth learning from? Bring the lesson, not confidential tea, to <b>the Room</b>. We feature good ideas with credit, because stealing without receipts is very Burn Book.</p>

  <!-- NEXT -->
  <div class="next">
    <div class="k">Next time on L<span class="ai">Ai</span>DIES</div>
    <h3>Episode 04 · The Founding Mothers</h3>
    <p>She's talked to this thing every day for three weeks — and realizes she has no idea where it came from, or who built it. So she goes looking for the origin story… and finds out it was women all along. See you next Wednesday, in SUNNYV<span class="ai">Ai</span>LE.</p>
  </div>

  <!-- ============ BEFORE YOU GO ============ -->
  <div class="mark" style="margin-top:58px;"><div class="k">Before you go</div><h2>Your Wednesday</h2><div class="sub">The rule in one line, the try-on, the cast, and the rest of the episode.</div></div>

  <div class="slab tryon">
    <span class="k">✎ Your scene · the try-on</span>
    <h3>Prompt Like Elle</h3>
    <p>Open your own AI tool, paste Prompt Like Elle, add a low-risk task or source notes, then verify at least three claims before using it.</p>
    <a class="btn" href="../try-on.html?issue=3">Do the Try-On →</a>
  </div>

  <!-- CAST · the SAiNTS in this episode -->
  <div class="cast">
    <div class="h">The Patron S<span class="ai">Ai</span>NTS in this episode <b>· tap a portrait to visit her</b></div>
    <div class="cast-grid">
      <a class="cast-card" href="../luminairy.html"><img src="../assets/saints/y2k-stained-glass-v2/elle-woods-y2k-stained-glass.jpg" alt="Elle Woods"><b>Elle Woods</b><span>Receipts</span></a>
      <a class="cast-card" href="../luminairy.html"><img src="../assets/saints/y2k-stained-glass-v2/regina-george-cautionary-red-y2k-stained-glass.jpg" alt="Regina George"><b>Regina George</b><span>The Burn Book</span></a>
      <a class="cast-card" href="../luminairy.html"><img src="../assets/saints/y2k-stained-glass-v2/cher-horowitz-y2k-stained-glass.jpg" alt="Cher Horowitz"><b>Cher Horowitz</b><span>The confident wrong answer</span></a>
    </div>
  </div>

  <!-- STUDY PACK -->
  <div class="mark"><div class="k">The study pack</div><h2>Three words, defined</h2></div>

  <div class="gloss">
    <details open>
      <summary><span class="term">Hallucination</span><span class="peek">When AI gives you an answer that sounds polished and confident but includes something unsupported, misread, outdated, or made up.</span><span class="plus">+</span></summary>
      <p class="def">When AI gives you an answer that sounds polished and confident but includes something unsupported, misread, outdated, or made up. It is not lying, because lying requires intent. It is more like a Burn Book entry written with Regina George confidence before Elle Woods checks the file. The answer can still be useful, but any name, date, number, quote, source, or conclusion needs a receipt before it borrows your name.</p>
    </details>
    <details>
      <summary><span class="term">Grounding</span><span class="peek">Giving AI something specific to answer from, like a document, transcript, policy, search result, or pasted source material.</span><span class="plus">+</span></summary>
      <p class="def">Giving AI something specific to answer from, like a document, transcript, policy, search result, or pasted source material. Instead of asking it to perform from memory, you are handing it the folder and saying, "Use this." Grounding can make an answer more useful and easier to check, but it does not make it automatically true. You still have to ask whether the source is real, current, relevant, and actually supports the claim.</p>
    </details>
    <details>
      <summary><span class="term">Retrieval</span><span class="peek">When an AI system goes looking for outside material and brings it into the answer before it writes.</span><span class="plus">+</span></summary>
      <p class="def">When an AI system goes looking for outside material and brings it into the answer before it writes. That material might be search results, files, database records, or snippets from a knowledge base. Retrieval is the part that fetches the possible receipts. It is helpful, but it can still pull the wrong file, stale context, or something that does not actually prove the point. Think of it as sending someone to the closet. You still check the outfit before it walks into the meeting.</p>
    </details>
  </div>

  <!-- SOUNDTRACK -->
  <div class="stx">
    <div class="disc" aria-hidden="true"></div>
    <p><b>This week's anthem</b> — <em>Don't Be Chutney on the Stand</em> — is playing on KSVL 99.9. Don't skip it. <span class="motto">Don't just learn from books. Learn from hooks.</span></p>
  </div>

  <!-- RAIL -->
  <div class="rail">
    <div class="h">The rest of the episode</div>
    <ol>
      <li><a href="../watch.html?ep=03"><span class="num"></span><span class="t">Narration</span><span class="s">Hear it in the Screening Room</span></a></li>
      <li><a href="../blend-snap.html#the-study-pack"><span class="num"></span><span class="t">Study Pack</span><span class="s">Grab it at the Blend &amp; Snap</span></a></li>
      <li><a href="../games/trading-cards.html"><span class="num"></span><span class="t">Card Pack</span><span class="s">Hallucination · Grounding · Retrieval</span></a></li>
      <li><a class="saintcard" href="../luminairy.html"><span class="num"></span><span class="t">The Patron S<span class="ai">Ai</span>NTS</span><span class="s">Elle, Regina &amp; Cher at the LUMIN<span class="ai">Ai</span>RY</span></a></li>
      <li><a class="songcard" href="../radio.html"><span class="num"></span><span class="t">This week's anthem</span><span class="s">KSVL 99.9</span></a></li>
      <li><a href="../learn/quiz.html"><span class="num"></span><span class="t">Pop Quiz</span><span class="s">10 + 2 bonus · bank clips</span></a></li>
    </ol>
  </div>

</main>

<footer class="foot">
  <div class="wm">L<span class="ai">Ai</span>DIES</div>
  <div class="sec">See you next Wednesday… in SUNNYV<span class="ai" style="color:var(--rose-soft)">Ai</span>LE.</div>
</footer>

<div id="miniPlayer" class="mini-player" hidden>
  <div class="mini-player-inner">
    <button type="button" class="mini-player-btn" id="miniPlayerPrev" aria-label="Previous track">⏮</button>
    <button type="button" class="mini-player-btn mini-player-play" id="miniPlayerPlay" aria-label="Play/Pause">⏸</button>
    <button type="button" class="mini-player-btn" id="miniPlayerNext" aria-label="Next track">⏭</button>
    <span class="mini-player-title" id="miniPlayerTitle">Now playing</span>
    <button type="button" class="mini-player-close" id="miniPlayerClose" aria-label="Close player">✕</button>
  </div>
</div>
<script src="/content/site/mini-player.js?v=20260712ep-03-songs-1"></script>

</body>
</html>
```

## Narration
```text
[tv announcer] Previously, on ladies: our heroine learned that talking to AI isn't coding — it's delegation. She stopped typing three vague words and hoping, and started briefing the machine like a smart new hire — David Rose specific — and got back something she'd actually send. [playful] And on this episode: she gets an answer with full Regina George confidence, almost uses it... and then notices one tiny detail tugging at the corner of the story. This is Episode Three: {{EP:title}}.

It's a Thursday afternoon, and the machine just handed me something that looks glorious. I'd asked one of the AI tools to turn four days of messy meeting notes into a clean client update. Nine seconds later, there it was — structured, calm, completely sure of itself. It even opened with "per our discussion," which I would never, [dry] but somehow coming from the machine it read as competent instead of passive-aggressive. I was two clicks from sending. And then one sentence caught my eye. The draft said the client had "approved" a July rollout. [pause] Except — I was in that meeting. Nobody approved anything. What we actually said was "July could work, if procurement clears by Friday." The machine took a maybe... and gave it a lanyard. [thoughtful] And I couldn't help but wonder... if a paragraph can sound that sure of itself — hair done, makeup done, "per our discussion" and everything — how am I supposed to catch the one line in it that's quietly, completely wrong. Welcome back to ladies — where smart, busy women learn AI one Wednesday at a time, from a little internet town called Sunnyvale. Last week, David Rose taught us to say what we actually want — [dry] fold in the cheese, but for your inbox. This week, Elle Woods teaches us what to check before we believe what comes back. Because here's what nobody warns you about when you start: AI can sound right. [pointed] And sounding right is not the same thing as being right. Before your name goes on it, you need to know which kind of answer you're holding. [warm] So I did what this town has taught me — I shut the laptop and took it to Main Street. To the NewsStand on Main, whose job is separating what actually happened from what just sounds like it did. [dry] No doom, no hype, no "a source close to the situation." [warm] And standing there with the real headlines, it landed: my draft didn't need a better writer. It needed someone at the news desk, holding every confident line up to the light — says who? based on what? [pointed] The machine had handed me a front page. My job was to fact-check it before it ran under my byline. Let me tell you about the Burn Book. It didn't work because it was true — none of it was, and nobody checked. It worked because it had social authority: a rumor, a grudge, a wild guess, and something fully unhinged, all in the same handwriting, with the same devastating teenage certainty. [dry] AI writes in that same hand — that same certainty — but here's the twist: it doesn't only write rumors. It'll take a real source, an old source, a similar-but-not-this source, and an assumption it made because the pattern looked familiar, and hand you one smooth paragraph like everyone in it belongs together. That's the Burn Book Problem: an official court record and an entry in the Burn Book come out in that exact same handwriting — same confidence, same finish — you can't tell which is which until you check. Take the Bethany Byrd moment from Mean Girls — a perfect, tiny sourcing disaster. Somebody ([cough, cough] Regina) writes in the Burn Book that Bethany must be lying about being a virgin — because she buys super-jumbo tampons. [dry] One box of tampons, and boom — a verdict, filed. Then the actual explanation walks in, much less scandalous and much more specific: she's just got a heavy flow and a wide set.....well you know the rest... [pointed] That was never evidence. It's a clue in a Claire's headband, sprinting straight to a conclusion. One data point. No context. Enormous conclusion. So the question is never "can I use AI?" [dry] Yes. Use it. We are not here to churn butter by candlelight. The question is: which parts is it just drafting for you — and which parts are claims that need receipts before they borrow your name? Now, a few wrong answers are easy to spot — the product that doesn't exist, the answer that argues with itself. But the fake citation? That one's dressed to pass. It looks exactly like a real source — cited with the confidence of "my boyfriend goes to another school" — right up until you click it and it goes nowhere. [dry] And the sneakiest one isn't fake at all. It's real information in the wrong place. It brought the wrong ID and somehow made it past the door. A U.S. HR answer in a Canadian workplace. Last year's pricing page wearing this year's lip gloss. "We talked about it" quietly promoted to "we decided." A policy answer that's technically true, except the exception is the part that matters. [knowing] That's the moment you stand up in the back, in your blue hoodie, strings pulled tight, and your oversized sunglasses, and you shout: [man voice impersonation] "SHE DOESN'T EVEN GO HERE!" It's not just a great line. It's a quality-control standard. And this is where Elle Woods becomes the patron saint of AI verification. Not because she makes "being thorough" sound corporate — because she spots the one detail everyone else treated like lip gloss and realizes it's holding up the alibi. Chutney says she was in the shower, right after getting a perm. Elle asks again. Chutney gives the same story. The room rolls its eyes, because it sounds like Elle is making haircare small talk in the middle of a murder trial. [pointed] But Elle isn't checking whether Chutney can repeat herself. She's waiting for the detail that doesn't fit. And if you know one thing about perms, you know you do not wash a fresh one — not unless you're trying to destroy your alibi and your hair in the same afternoon. One tiny beauty-world rule nobody took seriously... and the story falls apart. With AI, that's the job. Don't ask "does this sound smart?" [dry] Chutney sounded smart. She sounded smart three times. Ask: what's the one detail that can't survive contact with the timeline? If it says a policy changed — what date proves it? If it says a quote came from a person — where's the quote? If it says a number went up — from what, over what timeframe, according to whom? Do not be Chutney on the stand. Be Elle with the timeline. So before an answer leaves your laptop, sort it into three piles. A draft is wording, structure, a brainstorm, a summary — that can be fast. A claim is a name, a date, a number, a quote, a source, anything legal, HR, privacy, or money — that needs checking. And a receipt is the thing you can actually open, name, or point to if someone asks. [pointed] A draft is an outfit. A claim is an alibi. Dress accordingly. [warm] And before this sounds like a second job — remember who you are here. You're Elle. [pointed] You're the one who stands up in that courtroom, finds the detail that doesn't hold up, and wins with her name on the case. Nobody hands you that part. [warm] But here's what Elle didn't have: a law clerk who already did the reading. The machine spent the weekend in the library so you didn't — it did the research, it drafted the brief. [pointed] You still read it, you still check the citations, you still walk in and own it — because when the judge looks up, she's looking at you. [dry] That's not extra work. The grunt work got done for you; the judgment stayed yours. And please — asking AI "are you sure?" is like asking Regina George whether the Burn Book is peer reviewed. [dry] Bold choice. Limited value. Sometimes it catches the mistake, corrects itself, and we all briefly believe in personal growth. And sometimes it just hands you the same wrong answer in the same questionable outfit consisting of two popped-collar polos, one over the other (of course), but this time with the shirt order switched. That's not verification. That's Chutney repeating the alibi in the same questionable outfit, just with a slightly different colour combo. Now — before someone in the back adjusts a butterfly clip and says, "but the tools are getting better" — [warm] yes. They are. The newer ones can search, cite, read documents you hand them, and sometimes flag when they're unsure. That's real, and it helps. [pointed] But better is not solved. A 2026 Nature paper put a name to why: the way we grade these models rewards a confident guess over an honest "I don't know" — so they guess. Stanford's 2026 AI Index found something scarier for our purposes: tell a top model something false that you seem to believe, and it'll often just agree with you. And KPMG — [dry] one of the Big Four accounting firms, the serious-suit people — had to pull an AI report after someone checked its sources and found forty of the forty-five were made up. Forty of forty-five. Big Four. Tiny receipt drawer. So attach the sources, absolutely. Just don't assume "sources attached" means "sources checked." [dry] Sometimes it's still Chutney, handing you a folder in her own handwriting. And the good news is, the serious guidance — from OpenAI, Anthropic, Google, Stanford — all points the same way, and it comes down to three moves. [pointed] Move one: give her the source. Don't ask the machine what it remembers — paste the real document, the actual policy, this year's pricing page; when you need something current, turn on its search mode. Then one line: "answer only from what I just gave you." [dry] Elle doesn't argue from memory. She walks in with the file. [pointed] Move two: let her say "I don't know." Add the sentence most people never think to add — "if it's not in there, say so; don't fill the gap." [dry] That one line is what turns a confident guess back into an honest blank. [pointed] Move three: make her show the line by asking: "Quote the exact sentence you got that from." If she can't point to it, that claim showed up at Spring Fling with no student ID — and it doesn't get to speak. [warm] One rule over all three: no invented receipts. No made-up links, dates, quotes, or numbers. [warm] Watch it work on my Thursday disaster. Instead of "clean up these notes," I pasted the notes and said: summarize only what's here, mark anything we didn't actually decide as "pending," and show me the line behind every claim. [pointed] Same nine seconds — no phantom July approval, because I never left a gap for the machine to fill. [dry] That's Prompt Like Elle: hand her the file, let her say "I don't know," make her show the line. Which brings me to my favourite part of every episode — the cocktail party explanation. The answer you'll give the next time someone at happy hour puts down her drink and asks, "wait — why does it just make things up?" [deliberate] Here it is: it's not lying. Lying takes intent. It's guessing. When the machine doesn't know, it doesn't stop — it reaches for the most plausible-sounding thing and says it with its whole chest. [dry] It's your most confident friend. The one who will answer any question, whether or not she actually knows. The fix was never to catch her in a lie. It's to ask for the receipt before you repeat her in a meeting. [pause] [warm] And... that's the episode. Now — your try-on. Ten minutes, not homework, and everything you need lives at ladies dot A I. That's "ladies" spelled with an i in the middle: L, A, i, D, I, E, S. And if you'd rather read than listen, the full episode's written up there too — every source laid out where you can check it yourself. And the exact Prompt Like Elle wording — the three moves, copy-paste ready — is waiting in your try-on. And the full rulebook — the three moves, the check patterns, all of it — is shelved in the library, to keep and pull down whenever an answer looks a little too sure of itself. This week: take one real answer from an AI tool — a meeting recap, a summary of a public page, a draft reply — and verify three claims before it borrows your name. One that leans on a name, a date, a number, or a link. One that could be stale, or from the wrong country, or the wrong client. And one you'd be embarrassed to say out loud if someone asked, "where did that come from?" [smile] You need ten minutes and enough self-respect not to let Chutney handle the timeline. A corkboard and trench coat are optional... [dry] though honestly, that sounds kind of fun. [warm] Then, if you're feeling it: take the pop quiz at Sunnyvale High — ten questions on today's episode, plus two bonus — your score banks butterfly clips in a jar in your closet. Turn on K-S-V-L, ninety-nine point nine, for this week's anthem — don't just learn from books, learn from hooks. Get your cards read at Madame Clay-o's, call nineteen ninety-nine from the Dream Phone, and keep an eye out — there are charms hidden around town, and if you spot one, it's yours. And if this is your first Wednesday with us, make it official: stop by Makeover on Main and get your residence card. Two minutes, free, and everything you collect starts counting. [warm] So remember, ladies: AI can write like Regina George. [smirk] You still need to check like Elle Woods. [warm, smiling] See you next Wednesday... in Sunnyvale.

[tv announcer] Next time on ladies: three weeks in, our heroine realizes she's been using this thing every day and never once asked where it came from — or what it even is. She goes looking for the origin story… and finds out it was women all along. Come back next week for Episode Four: The Founding Mothers.
```
