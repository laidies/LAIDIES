# Episode 02 — Tell Me What You Want · paired production master

Status: PRODUCER REPAIR — bounded context, research and wording corrections applied; full revision and admission remain open. The full written edition and tagged narration remain preserved, including outstanding correction targets. No current factual, design, audio or publication approval is implied.

Patron Saint: David Rose — Specificity. Preserve the existing David scene and dense-policy comparison. Episodes 1–3 together govern voice, tone and Rewind reference density. Correct meaning here, then export both editions; shared literal title changes update both without flattening the reading layout or dropping performance cues.

## Export settings
```json
{
  "episode": 2,
  "status": "PRODUCER_REPAIR",
  "shared": {
    "title": "Tell Me What You Want",
    "quality_gain": "32"
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
<title>Episode 02 · {{EP:title}} · LAiDIES · SUNNYVAiLE</title>
<meta name="description" content="The one where she types something vague, gets back the world's most useless paragraph, channels David Rose about specificity, and watches AI produce something she'd actually send to a VP. Prompting + context.">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Jost:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&family=VT323&display=swap" rel="stylesheet">
<script defer src="/content/site/sv-gold-icons.js?v=20260705-1"></script>
<script defer src="/content/site/sv-global-header.js?v=svgh-320-2026-08-04-v2-532de5ac8032"></script>
<script defer src="/content/site/sv-nav-auth.js?v=20260729-1"></script>
<script defer src="/content/site/sunnyvaile-directory.js?v=20260713-1"></script>
<style>
  :root{
    --cream:#fffdfb; --plum:#4b2148; --plum-deep:#3a1838; --ink:#3a1838;
    --pink:#e982ab; --coral:#ec7a78; --tang:#f4a636; --teal:#57b6c0; --sky:#8bbde9; --peri:#b3abe7;
    --gold:#c9a227; --lav:#cabbe8;
    --measure:720px; --wide:840px;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Jost',system-ui,sans-serif;color:#f2eaf3;background:#160f1d;line-height:1.75;font-size:18px;-webkit-font-smoothing:antialiased}
  body::before{content:"";position:fixed;inset:0;z-index:9999;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent 0 2px,rgba(0,0,0,.15) 2px 3px);mix-blend-mode:multiply;opacity:.45}
  .ai{color:inherit;text-transform:none}
  h1,h2,h3{font-weight:800;line-height:1.06;letter-spacing:-.01em}
  h1 .ai,h2 .ai,h3 .ai,.eyebrow .ai,.tv-tags .ai{color:var(--pink)}
  main{max-width:var(--wide);margin:0 auto;padding:0 24px}
  p{max-width:var(--measure);margin:0 auto 20px}
  p strong{font-weight:700;color:#ffffff}
  em{font-style:italic}
  a{color:#8bbde9}
  /* Keep the sky link color for the dark article body only — the light global header needs legible plum. */
  .sv-header nav a, .sv-header .svgh-nav a, .sv-header .brand{color:#4b2148}
  .sv-header .brand .lac{color:#57b6c0}
  .eyebrow{font-size:.74rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase}

  /* Store shelf strip */
  .shelf-strip{background:#111013;color:var(--cream);text-align:center;font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.08em;padding:7px 16px}
  .shelf-strip b{color:var(--teal);font-weight:400}

  /* Cinematic pixel-art hero — the tape's title card, in the world */
  .tv-hero{position:relative;overflow:hidden;padding:118px 24px 88px;text-align:center;color:var(--cream);
    background:linear-gradient(180deg,rgba(14,9,24,.46) 0%,rgba(11,7,18,.72) 66%,rgba(11,7,18,.94) 100%)}
  .tv-hero::after{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent 0 2px,rgba(0,0,0,.16) 2px 4px);mix-blend-mode:multiply}
  .tv-hero>*{position:relative;z-index:2}
  .osd{position:absolute;top:14px;left:18px;right:18px;z-index:3;display:flex;justify-content:space-between;font-family:'VT323',monospace;font-size:1.05rem;color:#7be0d0;letter-spacing:.1em;text-shadow:0 0 8px rgba(87,182,192,.7)}
  .tv-meta{font-family:'VT323',monospace;color:#d9c6f0;font-size:1.12rem;letter-spacing:.13em;margin-bottom:16px;text-shadow:0 1px 8px rgba(0,0,0,.5)}
  .tv-title{font-size:clamp(2.6rem,7vw,4.6rem);color:var(--cream);text-shadow:0 2px 26px rgba(0,0,0,.6), 0 0 46px rgba(139,189,233,.28)}
  .tv-title em{font-style:italic;color:var(--pink)}
  .tv-logline{font-style:italic;font-size:1.16rem;color:rgba(255,253,251,.94);max-width:38ch;margin:20px auto 0;line-height:1.5;text-shadow:0 1px 10px rgba(0,0,0,.6)}
  .tv-tags{display:flex;gap:0;justify-content:center;flex-wrap:wrap;margin-top:26px;font-family:'VT323',monospace;font-size:1.08rem;letter-spacing:.07em;color:#e7dcf5;text-shadow:0 1px 8px rgba(0,0,0,.5)}
  .tv-tags span{padding:0 15px;position:relative}
  .tv-tags span+span::before{content:"·";position:absolute;left:-3px;color:rgba(231,220,245,.5)}
  .tv-tags b{color:#fff;font-weight:700}
  .hero-listen{display:inline-flex;align-items:center;gap:10px;margin-top:28px;font-family:'VT323',monospace;font-size:1.18rem;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;color:#0c1a16;background:#7be0d0;padding:12px 26px;border-radius:10px;box-shadow:0 0 30px -6px rgba(123,224,208,.7);transition:transform .12s}
  .hero-listen:hover{transform:translateY(-1px)}

  /* VHS spine label */
  .spine{max-width:var(--wide);margin:-24px auto 0;position:relative;z-index:2;padding:0 24px}
  .spine-inner{background:var(--cream);border:2px solid var(--plum-deep);border-radius:8px;display:flex;align-items:center;gap:14px;padding:11px 18px;font-family:'VT323',monospace;font-size:1.12rem;letter-spacing:.06em;color:var(--plum-deep);box-shadow:0 14px 30px -18px rgba(58,24,56,.5)}
  .spine-inner .dot{color:var(--coral)}
  .spine-inner .end{margin-left:auto;color:var(--teal)}

  /* Previously on */
  .prev{max-width:var(--measure);margin:40px auto 0;padding:16px 22px;background:rgba(179,171,231,.09);border:1px solid rgba(179,171,231,.38);border-radius:12px;color:#e7dcf5}
  .prev .eyebrow{color:#b3abe7;margin-bottom:8px}
  .prev p{margin:0;max-width:none;font-style:italic;font-size:1.04rem;line-height:1.5;color:#d7cbe9}

  /* Section marker */
  .mark{max-width:var(--measure);margin:64px auto 6px;padding-top:16px;border-top:1px solid rgba(203,184,232,.22)}
  .mark .k{font-family:'VT323',monospace;font-size:1.2rem;letter-spacing:.12em;text-transform:uppercase;color:#7be0d0;margin-bottom:6px;text-shadow:0 0 10px rgba(87,182,192,.4)}
  .mark .k::before{content:"\25B6  ";color:var(--pink)}
  .mark h2{font-size:clamp(1.8rem,4.2vw,2.6rem);color:#fff}
  .mark .sub{margin-top:8px;color:#c3b2d8;font-size:1rem}
  .lead{font-size:1.22rem;color:#fff;font-weight:500}

  /* Establishing broadcast still */
  .still{position:relative;margin:26px auto;max-width:var(--wide);border-radius:12px;overflow:hidden;box-shadow:0 26px 54px -28px rgba(58,24,56,.55)}
  .still img{width:100%;display:block}
  .still::after{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent 0 3px,rgba(0,0,0,.10) 3px 6px)}
  .still .bug{position:absolute;top:12px;right:14px;font-family:'VT323',monospace;font-size:1rem;color:var(--cream);letter-spacing:.1em;text-shadow:0 1px 4px rgba(0,0,0,.7)}
  .still .cap{position:absolute;bottom:0;left:0;right:0;padding:16px 18px 13px;color:var(--cream);background:linear-gradient(0deg,rgba(14,7,16,.86),transparent);font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.05em}

  /* Inline scene film — pixel-art keyframe that plays a short silent loop on scroll */
  .film{position:relative;max-width:var(--wide);margin:30px auto;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:linear-gradient(150deg,#3a1838 0%,#6b2f57 52%,#f4a636 130%);box-shadow:0 30px 64px -30px rgba(58,24,56,.62)}
  /* scene still — a paused broadcast frame (the real video clip swaps in here later) */
  .film .frames{position:absolute;inset:0;z-index:1}
  .film .frames img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  .film .frames img~img{display:none}   /* only the first (poster) frame shows until video exists */
  .film::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent 0 3px,rgba(0,0,0,.12) 3px 6px);mix-blend-mode:multiply}
  .film-bug{position:absolute;top:13px;right:15px;z-index:3;font-family:'VT323',monospace;font-size:1rem;color:var(--cream);letter-spacing:.1em;text-shadow:0 1px 5px rgba(0,0,0,.8)}
  .film-cap{position:absolute;left:0;right:0;bottom:0;z-index:3;padding:32px 20px 14px;color:var(--cream);font-family:'VT323',monospace;font-size:1.08rem;letter-spacing:.04em;background:linear-gradient(0deg,rgba(12,6,14,.9),transparent)}

  /* Pull quote */
  .pull{max-width:var(--measure);margin:52px auto;padding:24px 22px;text-align:center}
  .pull p{font-style:italic;font-size:clamp(1.5rem,3.4vw,2rem);line-height:1.3;color:#fff;margin:0;max-width:none;font-weight:600;text-shadow:0 0 34px rgba(233,130,171,.28)}
  .pull .who{margin-top:12px;font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.08em;color:#7be0d0}

  /* Receipts / stat */
  .receipt{max-width:var(--measure);margin:44px auto;background:#0c1a1e;color:#d6eff1;border:1.5px solid #57b6c0;border-radius:12px;padding:22px 24px;box-shadow:0 0 40px -14px rgba(87,182,192,.5) inset}
  .receipt .h{font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.1em;text-transform:uppercase;color:#7be0d0;margin-bottom:10px}
  .receipt .row{display:flex;gap:20px;align-items:center}
  .receipt .row+.row{margin-top:14px}
  .receipt .num{font-size:2.8rem;font-weight:800;color:#f4a636;line-height:1;flex:none;font-family:'VT323',monospace}
  .receipt .txt{font-size:1rem;line-height:1.5;color:#d6eff1}
  .receipt .src{display:block;margin-top:12px;font-size:.86rem;color:#8fb3b8;line-height:1.45}

  /* Cocktail */
  .cocktail{max-width:var(--measure);margin:52px auto;padding:26px;background:rgba(233,130,171,.09);border:1.5px solid rgba(233,130,171,.55);border-radius:16px;box-shadow:0 0 44px -12px rgba(233,130,171,.35) inset}
  .cocktail .eyebrow{color:#e982ab;margin-bottom:10px}
  .cocktail h3{font-size:1.4rem;color:#fff;margin-bottom:10px}
  .cocktail p{font-style:italic;font-size:1.12rem;color:#f3d9e6;margin:0}

  /* Sign-off + next */
  .signoff{max-width:var(--measure);margin:56px auto 0;text-align:center}
  .signoff .eyebrow{color:#7be0d0;margin-bottom:8px}
  .signoff h2{font-size:clamp(1.7rem,4vw,2.3rem);color:#fff}
  .rooms{font-size:.94rem;color:#b9a8cf;text-align:center;margin-top:16px}
  .next{max-width:var(--measure);margin:40px auto 0;padding:20px 22px;background:rgba(139,189,233,.09);border:1px solid rgba(139,189,233,.4);border-radius:12px;color:#dfecfa}
  .next .eyebrow{color:#8bbde9;margin-bottom:6px}
  .next h3{font-size:1.3rem;margin-bottom:8px;color:#fff}
  .next p{margin:0;max-width:none;font-size:.98rem;color:#cfe0f3}

  /* Field trip */
  .tryon{max-width:var(--measure);margin:48px auto 0;padding:24px 26px;background:rgba(244,166,54,.09);border:1.5px solid rgba(244,166,54,.48);border-radius:16px;color:#f4e6cf}
  .tryon .eyebrow{color:#f4a636;margin-bottom:8px}
  .tryon h3{font-size:1.3rem;color:#fff;margin-bottom:10px}
  .btn{display:inline-block;margin-top:14px;padding:11px 20px;border-radius:10px;background:var(--pink);color:#2a1226;text-decoration:none;font-weight:700;font-size:.95rem}

  /* Study pack — expandable "words, defined" */
  .gloss{max-width:var(--measure);margin:20px auto 0}
  .gloss details{border:1px solid rgba(203,184,232,.28);border-radius:12px;margin-bottom:12px;background:rgba(179,171,231,.05)}
  .gloss summary{list-style:none;cursor:pointer;padding:14px 18px;display:flex;align-items:center;gap:14px}
  .gloss summary::-webkit-details-marker{display:none}
  .gloss .term{font-weight:800;font-size:1.14rem;color:#fff;flex:none}
  .gloss .peek{font-size:.95rem;color:#c3b2d8;flex:1;line-height:1.35}
  .gloss .plus{font-family:'VT323',monospace;font-size:1.5rem;color:#7be0d0;flex:none;transition:transform .15s}
  .gloss details[open] .plus{transform:rotate(45deg)}
  .gloss .def{padding:0 18px 16px;margin:0;max-width:none;color:#e3d9ef;font-size:1rem;line-height:1.6}
  @media(max-width:560px){ .gloss summary{flex-wrap:wrap} .gloss .peek{flex-basis:100%;order:3} }

  /* Watch/Listen CTA */
  .listen-wrap{text-align:center;margin:48px auto}
  .listen{display:inline-flex;align-items:center;gap:12px;font-family:'VT323',monospace;font-size:1.28rem;letter-spacing:.09em;text-transform:uppercase;text-decoration:none;color:var(--plum-deep);background:var(--tang);padding:15px 30px;border-radius:12px;box-shadow:0 14px 30px -14px rgba(244,166,54,.7)}

  /* Cast strip */
  .cast{background:linear-gradient(160deg,#4a3585 0%,#3a1838 72%);color:var(--cream);margin-top:70px;padding:52px 24px}
  .cast-in{max-width:var(--wide);margin:0 auto}
  .cast .eyebrow{color:var(--lav);text-align:center;display:block;margin-bottom:8px}
  .cast h2{text-align:center;color:var(--cream);font-size:clamp(1.6rem,3.6vw,2.2rem);margin-bottom:26px}
  .cast-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .cast-card{text-align:center;text-decoration:none;color:var(--cream)}
  .cast-card img{width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:10px;border:1px solid rgba(201,162,39,.4);box-shadow:0 14px 28px -14px rgba(0,0,0,.6)}
  .cast-portrait-held{width:100%;aspect-ratio:2/3;display:grid;place-items:center;padding:16px;text-align:center;border-radius:10px;color:#fff;font:800 .82rem/1.25 'Jost',sans-serif;letter-spacing:.12em;text-transform:uppercase;background:linear-gradient(145deg,#5f4685 0%,#775596 54%,#c96652 120%);box-shadow:0 14px 28px -14px rgba(0,0,0,.6)}
  .cast-card b{display:block;margin-top:9px;font-size:.92rem}
  .cast-card span{font-family:'VT323',monospace;font-size:.95rem;color:var(--sky);letter-spacing:.03em}

  /* Episode rail */
  .rail{max-width:var(--wide);margin:0 auto;padding:44px 24px 72px}
  .rail .eyebrow{color:#e982ab;text-align:center;display:block;margin-bottom:16px}
  .rail-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
  .rail-btn{text-decoration:none;text-align:center;padding:16px 12px;border-radius:12px;font-weight:700;font-size:.98rem;color:var(--plum-deep)}
  .rail-btn small{display:block;font-weight:500;font-size:.76rem;opacity:.72;margin-top:3px}
  .rb1{background:var(--teal)} .rb2{background:var(--pink)} .rb3{background:var(--peri)} .rb4{background:var(--tang)} .rb5{background:var(--sky)} .rb6{background:var(--coral)}

  @media(max-width:640px){ body{font-size:16.5px} .tv-title{font-size:2.5rem} .cast-grid{grid-template-columns:repeat(2,1fr)} }
</style>
  <link rel="stylesheet" href="/content/issue-feature-v2.css?v=20260724-1">
  <script defer src="/content/issue-feature-v2.js?v=20260724-1"></script>
  <!-- Privacy-friendly analytics by Plausible -->
  <script async src="https://plausible.io/js/pa-J81NKM_EkuSbeYnuNCOTc.js"></script>
  <script>
    window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
    plausible.init()
  </script>
  <!-- Microsoft Clarity (heatmaps + session recordings) -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xnqcp37urd");
  </script>
  <link rel="canonical" href="https://laidies.ai/issues/issue-02" />
  <meta property="og:url" content="https://laidies.ai/issues/issue-02" />
</head>
<body class="issue-feature issue-feature--02">

<!-- Canonical town header (sv-global-header.js rewrites this in place) -->
<header class="sv-header"></header>

<!-- CINEMATIC PIXEL HERO — the tape, paused on its opening frame -->
<header class="tv-hero">
  <div class="osd"><span>❚❚ SP</span><span>S1 · E02</span></div>
  <p class="tv-meta">SEASON 1 · EPISODE 02 · ACT 1: THE AWAKENING</p>
  <h1 class="tv-title">Tell Me What You <em>Want</em></h1>
  <p class="tv-logline">The one where she types something vague, gets back the world's most useless paragraph, channels David Rose about specificity, and watches AI produce something she'd actually send to a VP.</p>
  <div class="tv-tags"><span>LESSON · <b>Prompting is delegation</b></span><span>STARS · <b>David Rose</b></span><span><b>~10 MIN READ</b></span></div>
  <a class="hero-listen" href="/watch.html?ep=02">▶ Listen to this episode</a>
</header>

<div class="spine"><div class="spine-inner">SUNNYVAiLE VIDEO <span class="dot">·</span> S1 E02 <span class="dot">·</span> SP <span class="dot">·</span> ❚❚ <span class="end">BE KIND, REWIND ⟲</span></div></div>

<main>

  <!-- Ep02 dark-VHS port: content COMPLETE (prose from issue-02.html, facts
       verified in episode-02.canon.md). Scene images reference
       ../assets/episodes/ep-02/pixel/ep02-scene-*.png — drop Codex's final
       stills there and the page lights up; until then the .film blocks show
       the gradient placeholder. Not yet linked from the site. -->

  <div class="prev">
    <p class="eyebrow">◀◀ Previously, on L<span class="ai">Ai</span>DIES</p>
    <p>Our heroine stopped feeling behind and finally stopped putting it off — one avoided email, nine seconds flat, and the realization that AI is just the most talented new hire she'll ever manage. She held auditions: one task, all three tools, and picked her favourite.</p>
  </div>

  <div class="mark"><div class="k">Cold open</div></div>
  <figure class="film" aria-label="Scene 01 — the staring contest">
    <div class="frames" data-frames="ep02-scene-01-staring-contest.png"><img src="../assets/episodes/ep-02/comic/ep02-title-card-comic-v2.png" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E02 · SC 01</span>
    <figcaption class="film-cap">9:15 on a Tuesday. Same desk, same you, wildly different results.</figcaption>
  </figure>
  <p class="lead">It's nine-fifteen on a Tuesday, and I am losing a staring contest with a paragraph.</p>
    <figure class="film" aria-label="Scene 01 — the staring contest">
      <div class="frames"><img src="../assets/episodes/ep-02/comic/ep02-01-scene-comic-v1.png" alt="" loading="lazy"></div>
      <span class="film-bug">S1·E02 · SC 01</span>
      <figcaption class="film-cap">9:15 on a Tuesday, losing a staring contest with a paragraph.</figcaption>
    </figure>

  <p>I'd asked one of the AI tools to draft talking points for a meeting, and what it gave back is… technically words: <em>"leverage synergies," "drive alignment," "circle back to maximize stakeholder buy-in."</em> It reads like a motivational poster that went to business school and came back worse.</p>
  <p>And the maddening part? <em>Yesterday, the same tool wrote me a project update for my director that I barely had to touch.</em> Same app. Same me. Same tragic office lighting. One day it reads my mind, and the next it hands me a throw pillow.</p>
  <blockquote class="pull"><p>Why does AI read my mind some days, and completely <em>ignore</em> me on others?</p></blockquote>

  <div class="mark"><div class="k">To town</div><h2>The variable wasn't the tool</h2><div class="sub">Corner table at the Blend &amp; Snap, both drafts side by side.</div></div>
  <p>So I did what I do with any problem I can't out-stubborn at my desk: I took it to town. Corner table at the Blend &amp; Snap, oat latte, KSVL on low. I pulled both drafts back up — the word-salad from that morning, the director update I'd barely touched — and set them side by side. It wasn't the tool that changed between the two. <strong>It was me: what I'd typed to get each one.</strong></p>
  <p>AI can't read your mind. If the important detail is still only in your head, it needs to go into the brief.</p>

  <div class="mark" id="context-explained"><div class="k">The coffee order</div><h2>The brand-new café across town</h2><div class="sub">This week's concept: Context.</div></div>
  <figure class="film" aria-label="Scene 03 — the new café across town">
    <div class="frames" data-frames="ep02-scene-03-new-cafe.png"><img src="../assets/episodes/ep-02/pixel/ep02-scene-03-new-cafe.jpg" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E02 · SC 03</span>
    <figcaption class="film-cap">Say "the usual" to a café that's never met you, and you get a blank look.</figcaption>
  </figure>
  <p>Think about your coffee order. At your regular spot, you barely have to say it — they know your usual, because you built that over a hundred Tuesdays. When the AI doesn't have that context, it's like the brand-new café across town, and if you breeze in and say "the usual," you get a blank look — or a plain drip going cold on the counter, which you can't even be mad about, because you never told the barista what you actually wanted to drink.</p>
  <p>The AI isn't holding out on you. Depending on the tool and your settings, it may have past chats, saved preferences or files you've connected. But that doesn't mean it knows who's reading <em>this</em> summary, what they need to decide, or which deadline matters today. If you leave those details in your head, it may fill the gaps with assumptions that don't fit. So you give it the relevant background. <strong>That's context.</strong> Then you check whether it used that context properly.</p>

  <div class="mark" id="prompt-explained"><div class="k">The lesson</div><h2>Tell me what you want, what you really, really want</h2><div class="sub">This week's concept: the Prompt.</div></div>
  <figure class="film" aria-label="Scene 04 — the Spice Girls">
    <div class="frames" data-frames="ep02-scene-04-spice-girls.png"><img src="../assets/episodes/ep-02/pixel/ep02-scene-04-spice-girls.jpg" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E02 · SC 04</span>
    <figcaption class="film-cap">They weren't gesturing at a vibe. They wanted specifics.</figcaption>
  </figure>
  <p>The Spice Girls had this figured out decades ago. <em>(Wait… decades? Oof. That's a jagged little pill to swallow, but here we are.)</em> <em>"Tell me what you want, what you really, really want."</em> They weren't gesturing at a vibe. They wanted specifics. AI is exactly the same: it'll zig-a-zig-ah all day, but a clearer ask gives it a better chance of producing what you actually need. <strong>That ask is the prompt.</strong></p>

  <div class="mark" id="david-rose-school-of-prompting"><div class="k">Class is in session</div><h2>The David Rose School of Prompting</h2><div class="sub">How to actually fold in the cheese.</div></div>
  <figure class="film" aria-label="Scene 05 — fold in the cheese">
    <div class="frames" data-frames="ep02-scene-05-fold-in-cheese.png"><img src="../assets/episodes/ep-02/comic/ep02-scene-20-fold-in-the-cheese-comic.png" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E02 · SC 05</span>
    <figcaption class="film-cap">"WHAT DOES THAT MEAN?!" — the AI's face, every vague ask.</figcaption>
  </figure>
  <p>Our patron saint this week is David Rose — and yes, we know, he's not exactly from the Rewind Era (1990–2010). But he's so fabulous we made one exception. <em>(In the immortal words of Shakespeare: a Rose by any other name…)</em> If you've seen <em>Schitt's Creek</em>, you know David is pathologically specific — the wine, the sweater, the exact drape of the sweater.</p>
  <p>You remember Moira telling David to "fold in the cheese," and David standing in that kitchen screaming, <strong>"WHAT DOES THAT MEAN?!"</strong> That is your AI, every single time you type <em>"write me an email about the project."</em> It's trying. But you handed it "fold in the cheese" — when what it needed was <em>"scrape the spatula along the bottom of the bowl, lift, turn it over, turn the bowl, and repeat."</em></p>

  <div class="mark"><div class="k">The fix</div><h2>Brief it like a new hire</h2><div class="sub">Prompting isn't technical. It's delegation.</div></div>
  <figure class="film" aria-label="Scene 06 — brief it like a new hire">
    <div class="frames" data-frames="ep02-scene-06-new-hire.png"><img src="../assets/episodes/ep-02/pixel/ep02-scene-06-new-hire.jpg" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E02 · SC 06</span>
    <figcaption class="film-cap">Every question you'd ask handing work to a smart new hire.</figcaption>
  </figure>
  <p>The fix turned out to be something I already knew how to do. I stopped typing <em>at</em> AI like a Google search — three vague words, fingers crossed — and started briefing it like a smart new hire in her first week. Every one of these is a question you already ask when you hand work to a person:</p>
  <ul style="max-width:var(--measure);margin:0 auto 20px;padding-left:1.4em;line-height:1.6;">
    <li><strong>Who's it for?</strong> The audience changes everything.</li>
    <li><strong>What do they care about?</strong> Give it the stakes.</li>
    <li><strong>What's the tone?</strong> Warm, blunt, formal, funny.</li>
    <li><strong>How long?</strong> A line, a paragraph, a page.</li>
    <li><strong>What to leave out?</strong> Boundaries before the draft wanders off.</li>
    <li><strong>Any example to copy?</strong> The strongest move of all.</li>
  </ul>
  <p>If you only ever steal one, steal the last: <strong>show it an example.</strong> Use an example you're allowed to share — an email that landed, a summary that worked — and say "match this structure and tone." If the original contains private details, make a fictional version that shows the same shape. It gives the tool something concrete to aim for.</p>

  <div class="mark"><div class="k">It's Britney, bitch</div><h2>Same task, two asks</h2><div class="sub">The difference is almost rude.</div></div>
  <figure class="film" aria-label="Scene 07 — vague vs specific">
    <div class="frames" data-frames="ep02-scene-07-vague-vs-specific.png"><img src="../assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E02 · SC 07</span>
    <figcaption class="film-cap">One twelve-page policy change. Two asks. Watch what comes back.</figcaption>
  </figure>
  <p>You've got a twelve-page policy change to get in front of six stakeholders before a 2&nbsp;p.m. meeting — and it's <em>dense</em>: regulatory language, cross-references, defined terms nested three deep. Reading it properly is an hour you do not have. So you paste the whole thing into the chat. <strong>This is exactly the kind of job you hand to AI</strong> — not because you can't write a summary, but because you don't have time to <em>read all twelve pages and find what actually matters</em>. The catch: it only works if you ask well.</p>
  <p>The vague ask — <em>"summarize this policy change for my stakeholders"</em> — comes back accurate, thorough, and useless in the two minutes you have. On twelve dense pages it summarizes <em>everything</em>: background, rationale, audit findings, every section, the appendices. It prioritizes nothing and buries the action items, because it doesn't know what matters to <em>you</em>. You still have to do the reading.</p>
  <p>The specific brief — <em>six senior managers, two minutes before a meeting; what's changing, when it takes effect, what teams do differently, any budget impact; cut the backstory; bullets, ~150 words; match last quarter's summary that landed</em> — comes back as a clean exec summary. Before forwarding, check its dates, actions and contractor exception against the original policy. A clear summary makes those details easier to inspect; it does not prove they are right.</p>
  <p><strong>And one line in that summary — <em>full-time teams only, contractors exempt until Q1</em> — is the whole reason you opened AI.</strong> You could have written the summary yourself. What you couldn't do in the twenty minutes before the meeting was read twelve pages of compliance language and catch the contractor carve-out buried inside it. That's not a writing task; it's a <em>reading</em> task — and it's the part AI just did for you, in an output tailored to your instructions.</p>

  <div class="mark"><div class="k">Don't change the station</div><h2>Iterate like you would with a new hire</h2></div>
  <p>And if the first answer isn't quite right? You don't start from scratch — you tell it what's off, exactly like you would with a real new hire. <em>It's calling into the radio and asking for exactly what you want to hear (or finally shelling out twenty bucks at HMV for the CD) — not constantly changing the station, hoping it lands on one playing a track you like.</em></p>

  <div class="mark"><div class="k">The evidence</div><h2>Turns out "soft" was the hard part</h2><div class="sub">So I went looking at the LIBR<span class="ai">Ai</span>RY — the town's reference desk — and there it was.</div></div>
  <figure class="film" aria-label="Scene 09 — the LIBRAiRY">
    <div class="frames" data-frames="ep02-scene-09-libraiy.png"><img src="../assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png" alt="The bright SUNNYVAiLE Library reference desk" loading="lazy"></div>
    <span class="film-bug">S1·E02 · SC 09</span>
    <figcaption class="film-cap">The skills filed under "soft" for a generation are the ones that now win.</figcaption>
  </figure>
  <p>By now a voice in the back of your head might be muttering that briefing, giving context, knowing what to cut — it all sounds a little <em>soft</em> to count as a real skill. Hold that thought.</p>
  <div class="receipt">
    <div class="h">Harvard × BCG · 758 consultants · published 2026</div>
    <div class="row"><span class="num">~25%</span><span class="txt"><strong>faster</strong> — on the tasks that suited AI in the first place ("inside the jagged frontier").</span></div>
    <div class="row"><span class="num">~{{EP:quality_gain}}%</span><span class="txt"><strong>higher-quality</strong> rated output — with the biggest lift going to lower performers.</span></div>
    <div class="row"><span class="num">BUT</span><span class="txt">on a different task, AI users were <strong>less likely to get the answer right</strong>. A polished result still needs your judgment.</span></div>
    <span class="src">Dell'Acqua, McFowland, Mollick et&nbsp;al., <a href="https://doi.org/10.1287/orsc.2025.21838">"Navigating the Jagged Technological Frontier"</a>, published 2026, studying GPT-4 in 2023. Checked 2026-09-06. These are results for the experiment's tasks, not a promise about every job or today's tools.</span>
  </div>
  <p>That study shows why the task and your judgment matter. For the delegation part, I found a separate account from one of its co-authors — <strong>Ethan Mollick, a Wharton professor.</strong> In <a href="https://www.oneusefulthing.org/p/management-as-ai-superpower">a January 2026 essay</a>, he described an executive MBA class building startup prototypes with AI. The students brought experience in defining a problem, explaining what they needed and recognizing when the result was off. His line about <em>that class</em> stayed with me:</p>
  <blockquote class="pull"><p>"The skills that are so often dismissed as <em>'soft'</em> turned out to be the hard ones."</p><div class="who">— Ethan Mollick</div></blockquote>
  <p>That made something click. Communicating clearly. Thinking critically. Reading what a person actually needs. Those got filed under "soft skills" for a generation — the consolation prize. But they are useful here: they help you explain the task, recognize a result that misses the point, and say what needs to change. <strong>And not instead of knowing your subject — on top of it.</strong> If you already write a thoughtful brief and know how to check the work, you have something to bring to this conversation.</p>

  <!-- WRAP -->
  <div class="mark"><div class="k">The takeaway</div><h2>Stop typing at it. Start briefing it.</h2></div>
  <p>A prompt was never code, and you were never behind. You've briefed people your whole career — the smart new hire, the one who needed clearer instructions. This one is just faster, never sleeps, and will absolutely fold the cheese wrong if you don't tell her how. Give it context, give it the brief, and it gives you back something you'd actually use.</p>

  <!-- COCKTAIL -->
  <div class="cocktail">
    <p class="eyebrow">Say it at happy hour</p>
    <h3>"So… what's a prompt, really?"</h3>
    <p>A prompt isn't code. It's a delegation. You're not programming a machine — you're briefing an assistant. And you already know how to brief. This one is just faster, never sleeps, and will absolutely fold the cheese wrong if you don't tell her how.</p>
  </div>

  <!-- SIGN-OFF -->
  <section class="signoff">
    <p class="eyebrow">So remember, ladies…</p>
    <h2>AI can't read your mind — so tell it what you want. Be specific. Be bold. Be David Rose about it.</h2>
  </section>
  <p class="rooms">Got a sharper "remember, ladies" than that one? Take it to one of the <a href="/sorority-house.html"><strong>discussion rooms at Delta LAi Nu</strong></a>. You can explore without a Resident Card; posting uses the room provider's own sign-in. If we feature your line later, the credit stays yours.</p>

  <!-- LISTEN -->
  <div class="listen-wrap"><a class="listen" href="/watch.html?ep=02">▶ Listen to this episode</a></div>

  <!-- NEXT -->
  <div class="next">
    <p class="eyebrow">Next week on L<span class="ai">Ai</span>DIES</p>
    <h3>Episode 03 · The Burn Book Problem</h3>
    <p>The machine hands our heroine a polished, confident answer — with one small detail that could blow up the whole meeting. See you next Wednesday, in SUNNYVAiLE.</p>
  </div>

  <!-- FIELD TRIP -->
  <div class="tryon">
    <p class="eyebrow">Your scene · the try-on</p>
    <h3>Same task, twice</h3>
    <p>Hand one real task to an AI tool <strong>twice</strong>. First the lazy way — three vague words, the way you'd Google it. Then the David Rose way: who it's for, what they care about, the tone, the length, and what to leave out. Put the two answers side by side. The difference isn't the tool getting smarter between tries — <em>it's you getting specific.</em></p>
    <a class="btn" href="../games/fairy-godmother.html">Get your prompt glow-up →</a>
  </div>

  <!-- THE VOCAB — key terms + definitions -->
  <div class="mark" id="vocab"><div class="k">The three words</div><h2>The Vocab</h2><div class="sub">Key terms and their definitions.</div></div>
  <div class="gloss">
    <details open>
      <summary><span class="term">Prompt</span><span class="peek">What you type in — Elle Woods didn't just say "let me in."</span><span class="plus">+</span></summary>
      <p class="def">What you type into the chat box. Remember Elle Woods' Harvard application video? She didn't just say "let me in" — she was specific, personal, tailored to her audience, impossible to ignore. That's a good prompt. Not code, not a spell — you being clear about who it's for, what you need, and what "good" looks like.</p>
    </details>
    <details>
      <summary><span class="term">Context</span><span class="peek">The background that makes it understand <em>your</em> situation — Miranda's cerulean speech.</span><span class="plus">+</span></summary>
      <p class="def">The background information that makes AI understand your situation, not the generic version. Remember Miranda Priestly's cerulean speech? Andy thinks it's just a blue sweater; Miranda traces the exact shade through eight designers and a clearance bin. When you say "this is for senior managers who have two minutes and don't care about the backstory," you've just given AI the cerulean speech. Without context, you get generic blue. With it, cerulean.</p>
    </details>
    <details>
      <summary><span class="term">Token</span><span class="peek">A chunk of text the model reads. More context has a cost.</span><span class="plus">+</span></summary>
      <p class="def">A chunk of text the model processes. You don't need to obsess over tokens yet — just know that more context has a cost and tools have limits. If a chat starts acting forgetful or vague, it may be holding more material than it comfortably can at once.</p>
    </details>
  </div>

</main>

<!-- CAST -->
<section class="cast"><div class="cast-in">
  <span class="eyebrow">The cast of this episode</span>
  <h2>The Patron SA<span class="ai">i</span>NTS in "{{EP:title}}"</h2>
  <div class="cast-grid">
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>David Rose</b><span>Patron of specificity · the prompt</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Miranda Priestly</b><span>The cerulean speech · context</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Elle Woods</b><span>The application video · a good prompt</span></a>
  </div>
</div></section>

<!-- RAIL -->
<div class="rail">
  <span class="eyebrow">Everything in this episode</span>
  <div class="rail-row">
    <a class="rail-btn rb1" href="/watch.html?ep=02">Listen<small>Narration</small></a>
    <a class="rail-btn rb2" href="/blend-snap.html#the-study-pack">Study Pack<small>Availability checked at the café</small></a>
    <a class="rail-btn rb4" href="/radio.html">The Song<small>This week's track</small></a>
    <a class="rail-btn rb6" href="/bronze-aige.html#answers">Cocktail<small>What's a prompt, really?</small></a>
    <a class="rail-btn rb3" href="/sorority-house.html">Rooms<small>See the discussion rooms at Delta LAi Nu</small></a>
    <a class="rail-btn rb5" href="/learn/quiz.html">Quiz<small>Check what you learned</small></a>
  </div>
</div>

<script>
/* Point each Saint portrait at that Saint's bio on the LUMiNAiRY (deep-link ?meet=<slug>) */
(function(){
  function slug(img){ var m=(img&&img.getAttribute('src')||'').match(/\/([a-z-]+)-y2k-stained-glass\.png/i); return m?m[1]:''; }
  function link(s){ return '/luminairy.html?meet='+s+'#mavens'; }
  document.querySelectorAll('.cast-card').forEach(function(a){
    var s=slug(a.querySelector('img')); if(s) a.setAttribute('href', link(s));
  });
})();
</script>
</body>
</html>
```

## Narration
```text
=== ANNOUNCER VOICE ===
[tv announcer] Previously, on ladies: our heroine stopped feeling behind, and finally stopped putting it off — one avoided email, nine seconds flat, and the realization that AI is just the most talented new hire she'll ever manage. [playful] And on this episode: she types something vague into the machine, gets back a paragraph of absolutely nothing... and learns that talking to AI isn't coding — it's delegation. This is Episode Two: {{EP:title}}.
=== HOST VOICE (Jessica) ===

It's nine-fifteen on a Tuesday, and I am losing a staring contest with a paragraph.

I'd asked one of the AI tools to draft talking points for a meeting, and what it gave back is... technically words. [dry] "Leverage synergies." "Drive alignment." "Circle back to maximize stakeholder buy-in." It reads like a motivational poster that went to business school and came back worse.

And the maddening part? Yesterday, the same tool wrote me a project update for my director that I barely had to touch. [thoughtful] Same app. Same me. Same tragic office lighting. One day it reads my mind, and the next it hands me a throw pillow.

[thoughtful] And I couldn't help but wonder... why does AI read my mind some days, and completely ignore me on others?

[warm] Welcome back to ladies — smart, busy women learning AI one Wednesday at a time, from a little internet town called Sunnyvale. Last week, for your try-on, you held auditions: one task, all three tools, just to see how differently they each answer. [dry] So you already know the tool has opinions. This week is your half of the conversation — the ask itself. Because the tool is only one part of what shapes the answer.

So I did what I do with any problem I can't out-stubborn at my desk: I took it to town. [warm] Corner table at the Blend and Snap, oat latte, K-S-V-L on low. And I pulled them both back up — the word-salad talking points from that morning, and the director update I'd barely had to touch the day before — and set them side by side. [pointed] It wasn't the tool that changed between the two. It was me: what I'd typed to get each one. Because here's the punchline, and it took me an embarrassingly long time to see it: AI can't read your mind. What's in your head stays in your head... until you type it out.

And that word everyone throws around — prompt? [dry] The computer nerds didn't even invent it. They lifted it from the theater kids. [beat] The two lunch tables that never once overlapped — and the AV club quietly swiped 'prompt' right off the drama club.

Think about your coffee order. At your regular spot, you barely have to say it — [warm] they know your usual, because you built that over a hundred Tuesdays. [dry] When the AI doesn't have that context, it's like the brand-new café across town, and if you breeze in and say "the usual," you get a blank look — or a plain drip going cold on the counter, which you can't even be mad about, because you never told the barista what you actually wanted to drink. [pointed] And the AI isn't holding out on you. Depending on the tool and your settings, it may have past chats, saved preferences or files you've connected. But that doesn't mean it knows who's reading this summary, what they need to decide, or which deadline matters today. Leave those details in your head and it may fill the gaps with assumptions that don't fit. [pointed] Give it the relevant background, tell it what you need, and check what comes back. That's prompting.

[thoughtful] So can it learn your usual, like your regular spot? [warm] Some tools can remember preferences across chats, if those features are available and switched on. Your usual, your voice, the way you like things — that's an episode of its own, and we'll get there. [dry] For today: even a barista who knows your order doesn't know you've brought six people from finance. Give it the details that matter for this task.

The Spice Girls had this figured out decades ago. [dry] (Wait... Decades? Ooff. That is a jagged little pill to swallow, isn't it...) "Tell me what you want, what you really, really want." Those iconic lyrics from the Spice Girls were not gesturing at a vibe. They wanted specifics. [smirk] AI is exactly the same. It will zig-a-zig-ah all day long — but a clearer ask gives it a better chance of producing what you actually need.

Which is why the patron saint of this episode is David Rose. [playful] I know, I know. You're thinking, "But he's not from the nineties, or the two-thousands?" And you're right. But he is so fabulous that we just had to make one exception. In the immortal words of Shakespeare: A Rose by any other name... If you've seen Schitt's Creek, you know David is pathologically specific — the wine, the sweater, the exact drape of the sweater. [dry] And you remember Moira telling him to "fold in the cheese," and him standing in that kitchen screaming, "WHAT DOES THAT MEAN?!" [beat] That is your AI, every single time you type "write me an email about the project." It is trying. But you handed it "fold in the cheese" — when what it needed was "scrape the spatula along the bottom of the bowl, lift, turn it over, turn the bowl, and repeat." [wry] And yes, full confession: I had AI write that cooking description for me, because I do not cook. [playful] (Oh, and P-S-A: if you haven't seen Schitt's Creek, what are you even doing with your life? Get on it!)

Ok, back to what I did. The fix, it turned out, was something I already knew how to do. I stopped typing at AI like a Google search — three vague words, fingers crossed — and I started briefing it like a smart new hire in her first week. [measured] Who is this for? What do they care about? What's the tone? How long? What should it absolutely not include? Have we done one of these before that she can copy from? [pointed] Every one of those is a question you already ask when you hand work to a person. Prompting isn't technical. It's delegation. [warm] I even put those on a card for your study pack — a handful of questions, thirty seconds, and your ask stops being a shrug and starts being an instruction. But if you only ever steal one, steal the last: show it an example. Use an example you're allowed to share — an email that landed, a summary that worked — and say "match this structure and tone." If the original contains private details, make a fictional version that shows the same shape. It gives the tool something concrete to aim for.

[measured] Let me show you, because the difference is almost rude. Say you've got a twelve-page policy change to get in front of a meeting. [dry] The lazy ask — what you'd type without ladies — is just: "summarize this policy change for my stakeholders." And back comes... everything. A wall of text — accurate, thorough, and completely useless in the two minutes you've got. Background, rationale, timelines, exemptions, appendices A through D — all weighted exactly the same, because it can't tell what matters to you from what doesn't. [dry] It's Ross, screaming "PIVOT" — technically a direction, zero help getting the couch up the stairs. You still have to do the reading. [measured] So you try it again — only this time you brief it out loud, the way you'd brief a person. Something like: "Summarize this for six senior managers who have two minutes before a meeting. Tell them what's changing, when it takes effect, what their teams actually do differently, and whether it touches budget. Cut the backstory. Bullets — about a hundred and fifty words. And here's last quarter's summary that landed — match it." [warm] And this time, back comes something you would actually send: a subject line, then a handful of tight bullets, in exactly the shape you asked for. And buried in one of them — a line you would never have caught skimming twelve pages in two minutes: contractors and vendor teams are exempt until the first quarter of the following year — Q-one — so they are on a different clock. [pointed] That one line is the whole reason you opened AI. You could have written the summary yourself — what you could not have done, not in the twenty minutes before the meeting, was read twelve pages of compliance language and catch the one exemption that would have blown the whole thing up. That's not a writing job; it's a reading job — and AI just did it, tailored to exactly what you asked for. [measured] Before forwarding, check the dates, the actions and that exception against the original policy. A clear summary makes those details easier to inspect; it does not prove they are right. [smirk] A full "It's Britney, bitch" moment — that unbothered confidence of asking for exactly what you wanted, and getting exactly what you needed. [measured] And if the first answer isn't quite right? You don't start from scratch — you tell it what's off, exactly like you would with a real new hire. It's calling into the radio and asking for exactly the song you want to hear (or finally shelling out twenty bucks at H-M-V for the CD), not spinning the dial, hoping it lands on one you like.

[pointed] And if a voice in your head is going "briefing, context, knowing what to cut — that sounds a little soft to be a real skill" — hold that thought. [warm] Because later that week I went looking, at the LIBRAiRY in town, the reference desk where you go to actually look things up — and found something worth reading. A study, Harvard and BCG, seven hundred and fifty-eight consultants using GPT-four back in twenty-twenty-three. The published results came out in twenty-twenty-six. On tasks that suited the AI, the people using it worked about twenty-five percent faster and turned out work rated roughly {{EP:quality_gain}} percent higher in quality. [pointed] But on a different task, the AI users were less likely to get the answer right. So the task matters. And so does checking the answer. [warm] For the delegation part, I found a separate account from one of that study's co-authors — Ethan Mollick, a Wharton professor. He described an executive MBA class building startup prototypes with AI. His students already knew how to define a problem, explain what they needed and recognize when the result was off. And his line about that class stayed with me:

=== EXPERT QUOTE — SEPARATE VOICE ===
[measured] The skills that are so often dismissed as soft turned out to be the hard ones.
=== BACK TO HOST (Jessica) ===

[knowing] That made something click. Communicating clearly. Thinking critically. Reading what a person actually needs. Those got filed under "soft skills" for a generation — soft, as in nice-to-have, as in not the real work. [dry] The consolation prize. [warm] But they are useful here. They help you explain the task, recognize a result that misses the point, and say what needs to change. And not instead of knowing your subject — on top of it. [knowing] If you already write a thoughtful brief and know how to check the work, you have something to bring to this conversation.

Which brings me to my favourite part of every episode. We call it the cocktail party explanation — the line you can actually say out loud at happy hour when someone asks, "so, what's a prompt, really?" [deliberate] Here it is: a prompt isn't code. It's a delegation. [dry] You're not programming a machine — you're briefing an assistant. And you already know how to brief. You have been doing it your whole career, for people who needed clearer instructions. This one is just faster, never sleeps, and will absolutely fold the cheese wrong if you don't tell her how.

[warm] Oh — and the first person I tried that line on? A friend who's been "meaning to get to this" for about a year. She got it in one sentence. So on my way out of town, I stopped by the Post Office and mailed her a postcard — the kind you send from a place you actually love — and wrote on the back: [smile] because Sunnyvale is even better with your people in it.

[warm] And... that's the episode. Now — your try-on. Ten minutes, not homework, and everything you need lives at ladies dot A I. That's "ladies" spelled with an i in the middle: L, A, i, D, I, E, S. And if you'd rather read than listen — or you want to see that before-and-after with your own eyes — the whole episode's written up there too, laid out side by side. This week: hand one real task to an AI tool twice. First the lazy way — three vague words, the way you'd Google it. Then the David Rose way: who it's for, what they care about, the tone, the length, and what to leave out. [smile] Put the two answers side by side. The difference isn't the tool getting smarter between tries. It's you getting specific.

[warm] Then, if you're feeling it: grab this week's study pack at the Blend and Snap, take the pop quiz at Sunnyvale High — ten questions, plus two bonus, banking butterfly clips in your closet — and turn on K-S-V-L, ninety-nine point nine, for this week's anthem — do not skip it. It's this week's lesson, in platform sandals. Don't just learn from books; learn from hooks. And if this is your first Wednesday with us, stop by Makeover on Main for your residence card. Two minutes, free, and everything you collect starts counting.

[warm] So remember, ladies: AI can't read your mind — so tell it what you want... what you really, really want. [smirk] See you next Wednesday... in Sunnyvale.

=== ANNOUNCER VOICE ===
[tv announcer] Next time on ladies: the machine hands our heroine a polished, confident answer — with one small detail that could blow up the whole meeting. Come back next week for Episode Three: The Burn Book Problem.
```
